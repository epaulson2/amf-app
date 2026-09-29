import type { NoteEvent } from '@/lib/arranger/types'

function readVarLen(buf: Buffer, pos: number): { value: number; bytesRead: number } {
  let value = 0
  let bytesRead = 0
  let byte: number
  do {
    byte = buf[pos + bytesRead]
    value = (value << 7) | (byte & 0x7f)
    bytesRead++
  } while (byte & 0x80 && bytesRead < 4)
  return { value, bytesRead }
}

interface RawNote {
  pitch: number
  startTick: number
  durationTicks: number
  channel: number
}

function parseTrack(buf: Buffer, start: number, length: number): {
  notes: RawNote[]
  tempoUs: number
  name: string
} {
  const end = start + length
  let pos = start
  let absTick = 0
  let runningStatus = 0
  let tempoUs = 500000
  let name = ''

  const activeNotes = new Map<number, { tick: number; channel: number }>()
  const notes: RawNote[] = []

  while (pos < end) {
    const delta = readVarLen(buf, pos)
    pos += delta.bytesRead
    absTick += delta.value

    let status = buf[pos]

    if (status === 0xff) {
      // Meta event
      pos++
      const metaType = buf[pos++]
      const lenInfo = readVarLen(buf, pos)
      pos += lenInfo.bytesRead
      const dataLen = lenInfo.value

      if (metaType === 0x51 && dataLen === 3) {
        tempoUs = (buf[pos] << 16) | (buf[pos + 1] << 8) | buf[pos + 2]
      } else if (metaType === 0x03) {
        name = buf.subarray(pos, pos + dataLen).toString('ascii')
      }
      pos += dataLen
      continue
    }

    if (status === 0xf0 || status === 0xf7) {
      // SysEx
      pos++
      const lenInfo = readVarLen(buf, pos)
      pos += lenInfo.bytesRead + lenInfo.value
      continue
    }

    // MIDI channel event
    if (status & 0x80) {
      runningStatus = status
      pos++
    } else {
      status = runningStatus
      // don't advance pos — data byte follows
    }

    const type = (status >> 4) & 0xf
    const channel = status & 0xf

    switch (type) {
      case 0x9: {
        const pitch = buf[pos++]
        const velocity = buf[pos++]
        if (velocity > 0) {
          activeNotes.set(pitch * 16 + channel, { tick: absTick, channel })
        } else {
          // velocity 0 = note off
          const key = pitch * 16 + channel
          const on = activeNotes.get(key)
          if (on) {
            notes.push({ pitch, startTick: on.tick, durationTicks: absTick - on.tick, channel })
            activeNotes.delete(key)
          }
        }
        break
      }
      case 0x8: {
        const pitch = buf[pos++]
        pos++ // velocity
        const key = pitch * 16 + channel
        const on = activeNotes.get(key)
        if (on) {
          notes.push({ pitch, startTick: on.tick, durationTicks: absTick - on.tick, channel })
          activeNotes.delete(key)
        }
        break
      }
      case 0xa: pos += 2; break // aftertouch
      case 0xb: pos += 2; break // control change
      case 0xc: pos += 1; break // program change
      case 0xd: pos += 1; break // channel pressure
      case 0xe: pos += 2; break // pitch bend
      default: pos += 1; break
    }
  }

  return { notes, tempoUs, name }
}

export function parseMidi(
  buffer: Buffer,
  trackIndex?: number,
): { melody: NoteEvent[]; tempo: number; title: string; error?: string } {
  if (buffer.length < 14) return { melody: [], tempo: 120, title: '', error: 'File too small to be a MIDI file' }
  if (buffer.toString('ascii', 0, 4) !== 'MThd') return { melody: [], tempo: 120, title: '', error: 'Not a valid MIDI file' }

  const numTracks = buffer.readUInt16BE(10)
  const division = buffer.readUInt16BE(12)

  if (division & 0x8000) return { melody: [], tempo: 120, title: '', error: 'SMPTE time code MIDI not supported' }

  let pos = 14
  const tracks: Array<{ notes: RawNote[]; tempoUs: number; name: string }> = []

  for (let t = 0; t < numTracks && pos < buffer.length; t++) {
    if (buffer.toString('ascii', pos, pos + 4) !== 'MTrk') { pos += 4; continue }
    const trackLen = buffer.readUInt32BE(pos + 4)
    pos += 8
    tracks.push(parseTrack(buffer, pos, trackLen))
    pos += trackLen
  }

  // Find global tempo from any track
  let globalTempoUs = 500000
  for (const t of tracks) {
    if (t.tempoUs !== 500000) { globalTempoUs = t.tempoUs; break }
  }
  const tempo = Math.round(60_000_000 / globalTempoUs)

  // Find title from track 0 meta or first named track
  let title = tracks[0]?.name || tracks.find(t => t.name)?.name || 'Uploaded MIDI'

  // Pick track with most notes
  let chosenIdx = 0
  if (trackIndex !== undefined) {
    chosenIdx = Math.min(trackIndex, tracks.length - 1)
  } else {
    let maxNotes = 0
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].notes.length > maxNotes) { maxNotes = tracks[i].notes.length; chosenIdx = i }
    }
  }

  const chosen = tracks[chosenIdx]
  if (!chosen || chosen.notes.length === 0) {
    return { melody: [], tempo, title, error: 'No note events found in MIDI file' }
  }

  const melody: NoteEvent[] = chosen.notes
    .sort((a, b) => a.startTick - b.startTick)
    .map(n => ({
      pitch: n.pitch,
      startBeat: n.startTick / division,
      durationBeats: Math.max(n.durationTicks / division, 0.125),
      voice: 'melody' as const,
    }))

  return { melody, tempo, title }
}
