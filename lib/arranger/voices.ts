import type { NoteEvent, ChordEvent, Tuning, MidiPitch, ArrangementMode } from './types'
import {
  rootInRegister, fifthInRegister, chordToneClasses,
  chordTonesNearMidi, isChordTone, chordAtBeat,
} from './theory'

// ── Bass voice ──────────────────────────────────────────────────────────────
// Register: MIDI 36-52 (C2-E3)
const BASS_MIN = 36
const BASS_MAX = 52

export function generateBass(chords: ChordEvent[], timeSignature: [number, number]): NoteEvent[] {
  const notes: NoteEvent[] = []
  const beatsPerMeasure = timeSignature[0]

  for (let i = 0; i < chords.length; i++) {
    const chord = chords[i]
    const nextChord = chords[i + 1] ?? null
    const root = rootInRegister(chord.symbol, BASS_MIN, BASS_MAX)
    const fifth = fifthInRegister(chord.symbol, BASS_MIN, BASS_MAX)
    const beats = chord.durationBeats

    if (beats <= 1) {
      notes.push({ pitch: root, startBeat: chord.startBeat, durationBeats: 1, voice: 'bass' })
    } else if (beats === 2) {
      notes.push({ pitch: root, startBeat: chord.startBeat, durationBeats: 2, voice: 'bass' })
    } else if (beats === 3) {
      notes.push({ pitch: root, startBeat: chord.startBeat, durationBeats: 2, voice: 'bass' })
      notes.push({ pitch: fifth, startBeat: chord.startBeat + 2, durationBeats: 1, voice: 'bass' })
    } else {
      // 4 beats: root on 1, fifth (or approach) on 3
      notes.push({ pitch: root, startBeat: chord.startBeat, durationBeats: 2, voice: 'bass' })

      // On beat 3: fifth, or approach tone toward next root
      if (nextChord) {
        const nextRoot = rootInRegister(nextChord.symbol, BASS_MIN, BASS_MAX)
        const approach = approachTone(fifth, nextRoot)
        notes.push({ pitch: approach, startBeat: chord.startBeat + 2, durationBeats: 1, voice: 'bass' })
        notes.push({ pitch: approach + (nextRoot > approach ? 1 : -1), startBeat: chord.startBeat + 3, durationBeats: 1, voice: 'bass' })
      } else {
        notes.push({ pitch: fifth, startBeat: chord.startBeat + 2, durationBeats: 2, voice: 'bass' })
      }
    }
  }

  return notes
}

// Find a passing/approach tone between two pitches
function approachTone(from: MidiPitch, to: MidiPitch): MidiPitch {
  if (Math.abs(to - from) <= 2) return from
  return to > from ? to - 2 : to + 2
}

// ── Drone voice (DADGAD speciality) ─────────────────────────────────────────
// Only produces notes on open strings that are chord tones

export function generateDrone(chords: ChordEvent[], tuning: Tuning): NoteEvent[] {
  const notes: NoteEvent[] = []
  const openPitchClasses = tuning.strings.map(p => p % 12)

  for (const chord of chords) {
    const tonePCs = chordToneClasses(chord.symbol)
    for (let s = 0; s < tuning.strings.length; s++) {
      const openPC = openPitchClasses[s]
      if (tonePCs.includes(openPC)) {
        const openMidi = tuning.strings[s]
        // Only use mid-register drones (not bass strings when bass voice covers them)
        if (openMidi >= 48) {
          notes.push({
            pitch: openMidi,
            startBeat: chord.startBeat,
            durationBeats: chord.durationBeats,
            voice: 'drone',
          })
        }
      }
    }
  }

  return notes
}

// ── Inner voice ──────────────────────────────────────────────────────────────
// Register: MIDI 52-69 (E3-A4), between bass and melody
const INNER_MIN = 52
const INNER_MAX = 69

export function generateInnerVoice(melody: NoteEvent[], chords: ChordEvent[]): NoteEvent[] {
  const notes: NoteEvent[] = []
  let prevPitch: MidiPitch | null = null

  for (const chord of chords) {
    // Get chord tones in inner voice register
    const candidates = chordTonesNearMidi(chord.symbol, 60, 10)
      .filter(p => p >= INNER_MIN && p <= INNER_MAX)

    if (candidates.length === 0) {
      prevPitch = null
      continue
    }

    // Prefer common tone retention
    let chosen: MidiPitch
    if (prevPitch !== null && candidates.includes(prevPitch)) {
      chosen = prevPitch
    } else if (prevPitch !== null) {
      // Pick closest chord tone to previous pitch
      chosen = candidates.reduce((best, c) =>
        Math.abs(c - prevPitch!) < Math.abs(best - prevPitch!) ? c : best
      )
    } else {
      // Prefer third of chord (index 1 in candidate list)
      chosen = candidates[1] ?? candidates[0]
    }

    // Make sure inner voice is below the melody at this point
    const melodyAtBeat = melody.find(n => n.startBeat <= chord.startBeat && n.startBeat + n.durationBeats > chord.startBeat)
    if (melodyAtBeat && chosen >= melodyAtBeat.pitch) {
      chosen = chosen - 12
    }

    if (chosen >= INNER_MIN) {
      notes.push({
        pitch: chosen,
        startBeat: chord.startBeat,
        durationBeats: chord.durationBeats,
        voice: 'inner',
      })
      prevPitch = chosen
    }
  }

  return notes
}

// ── Voice selector by mode ───────────────────────────────────────────────────

export function buildVoices(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
  mode: ArrangementMode,
  timeSignature: [number, number],
): NoteEvent[] {
  const bass = generateBass(chords, timeSignature)

  switch (mode) {
    case 'simple':
      return [...melody, ...bass]

    case 'drone': {
      const drones = generateDrone(chords, tuning)
      return [...melody, ...bass, ...drones]
    }

    case 'harmonic': {
      const inner = generateInnerVoice(melody, chords)
      return [...melody, ...bass, ...inner]
    }

    case 'voice-led': {
      const inner = generateInnerVoice(melody, chords)
      const drones = generateDrone(chords, tuning)
      return [...melody, ...bass, ...inner, ...drones]
    }

    default:
      return [...melody, ...bass]
  }
}
