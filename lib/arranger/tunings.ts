import type { Tuning } from './types'

// MIDI pitches: C4 = 60, A4 = 69
// String 0 = lowest physical string

export const DADGAD: Tuning = {
  name: 'DADGAD',
  strings: [
    38, // D2 — string 6 (lowest)
    45, // A2 — string 5
    50, // D3 — string 4
    55, // G3 — string 3
    57, // A3 — string 2
    62, // D4 — string 1 (highest)
  ],
  maxFret: 19,
}

export const STANDARD: Tuning = {
  name: 'Standard',
  strings: [
    40, // E2 — string 6
    45, // A2 — string 5
    50, // D3 — string 4
    55, // G3 — string 3
    59, // B3 — string 2
    64, // E4 — string 1
  ],
  maxFret: 19,
}

// DADGAD open strings as a Set for quick drone lookup
export const DADGAD_OPEN_PITCHES: Set<number> = new Set(
  DADGAD.strings.map(p => p % 12)  // pitch classes: D=2, A=9, G=7
)

export const TUNING_PRESETS: Record<string, Tuning> = {
  DADGAD,
  Standard: STANDARD,
}

export function parseTuning(name: string, noteNames: string[]): Tuning {
  const NOTE_MIDI: Record<string, number> = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
  }
  const strings = noteNames.map(s => {
    const octave = parseInt(s.slice(-1))
    const note = s.slice(0, -1)
    return (octave + 1) * 12 + NOTE_MIDI[note]
  })
  return { name, strings, maxFret: 19 }
}
