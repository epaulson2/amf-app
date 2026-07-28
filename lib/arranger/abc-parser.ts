import type { NoteEvent, ChordEvent } from './types'
import { makeChordEvent } from './theory'

const DIATONIC = [0, 2, 4, 5, 7, 9, 11] // C D E F G A B semitones from C
const STEP_FROM_LETTER: Record<string, number> = {
  c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6,
}
const ACC_SEMITONE: Record<string, number> = { sharp: 1, flat: -1, natural: 0 }

function abcPitchToMidi(
  pitch: number,
  noteAccidental: string | undefined,
  keySigShifts: Map<number, number>,
): number {
  const step = ((pitch % 7) + 7) % 7
  const octaveOffset = Math.floor(pitch / 7) * 12
  let semitone = DIATONIC[step]
  if (noteAccidental !== undefined) {
    semitone += ACC_SEMITONE[noteAccidental] ?? 0
  } else if (keySigShifts.has(step)) {
    semitone += keySigShifts.get(step)!
  }
  return 60 + octaveOffset + semitone
}

export interface AbcParseResult {
  melody: NoteEvent[]
  chords: ChordEvent[]
  title: string
  tempo: number
  timeSignature: [number, number]
}

export async function parseAbc(abcText: string): Promise<AbcParseResult> {
  const abcjs = await import('abcjs')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tunes: any[] = (abcjs as any).parseOnly(abcText)
  const tune = tunes[0]
  if (!tune) throw new Error('No tune found in ABC text')

  const title: string = tune.metaText?.title ?? 'Untitled'
  const tempo: number = typeof tune.getBpm === 'function' ? tune.getBpm() : 120

  let beatsPerMeasure = 4
  if (typeof tune.getMeter === 'function') {
    const m = tune.getMeter()
    if (m?.type === 'specified' && m.value?.[0]) {
      beatsPerMeasure = Number(m.value[0].num) || 4
    }
  }
  const timeSignature: [number, number] = [beatsPerMeasure, 4]

  // Key signature → per-step semitone shifts
  const keySigShifts = new Map<number, number>()
  if (typeof tune.getKeySignature === 'function') {
    const ks = tune.getKeySignature()
    for (const { acc, note } of ks?.accidentals ?? []) {
      const step = STEP_FROM_LETTER[note.toLowerCase()]
      if (step !== undefined) keySigShifts.set(step, ACC_SEMITONE[acc] ?? 0)
    }
  }

  const melody: NoteEvent[] = []
  const pendingChords: { symbol: string; startBeat: number }[] = []
  let currentBeat = 0

  for (const line of tune.lines ?? []) {
    for (const staff of line.staff ?? []) {
      for (const voice of staff.voices ?? []) {
        for (const item of voice) {
          if (item.el_type !== 'note') continue

          const durationBeats = (item.duration ?? 0) * beatsPerMeasure

          // Chord annotation on this note
          if (Array.isArray(item.chord) && item.chord.length > 0) {
            pendingChords.push({ symbol: item.chord[0].name, startBeat: currentBeat })
          }

          if (!item.rest && Array.isArray(item.pitches) && item.pitches.length > 0) {
            const p = item.pitches[0]
            const midi = abcPitchToMidi(p.pitch, p.accidental, keySigShifts)
            melody.push({
              pitch: midi,
              startBeat: currentBeat,
              durationBeats,
              voice: 'melody',
              tie: p.startTie ? true : undefined,
            })
          }

          currentBeat += durationBeats
        }
      }
    }
  }

  const totalBeats = currentBeat
  const chords: ChordEvent[] = pendingChords.map((pc, i) => {
    const endBeat = i < pendingChords.length - 1 ? pendingChords[i + 1].startBeat : totalBeats
    return makeChordEvent(pc.symbol, pc.startBeat, Math.max(endBeat - pc.startBeat, 1))
  })

  return { melody, chords, title, tempo, timeSignature }
}
