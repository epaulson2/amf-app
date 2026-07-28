import type { MidiPitch, Tuning, FretPosition } from './types'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function pitchName(midi: MidiPitch): string {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}

export function midiFromName(note: string, octave: number): MidiPitch {
  const NOTE_MIDI: Record<string, number> = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
  }
  return (octave + 1) * 12 + (NOTE_MIDI[note] ?? 0)
}

export function getPitchPositions(pitch: MidiPitch, tuning: Tuning): FretPosition[] {
  const positions: FretPosition[] = []
  for (let s = 0; s < tuning.strings.length; s++) {
    const fret = pitch - tuning.strings[s]
    if (fret >= 0 && fret <= tuning.maxFret) {
      positions.push({ string: s, fret, pitch })
    }
  }
  return positions
}

export function getOpenStringPositions(tuning: Tuning): FretPosition[] {
  return tuning.strings.map((pitch, s) => ({ string: s, fret: 0, pitch }))
}

// Returns all pitches playable on a given string
export function getStringPitches(stringIdx: number, tuning: Tuning): MidiPitch[] {
  const open = tuning.strings[stringIdx]
  return Array.from({ length: tuning.maxFret + 1 }, (_, fret) => open + fret)
}

// Alphatex uses string numbering 1=highest, so invert
export function toAlphaTabString(stringIdx: number, tuning: Tuning): number {
  return tuning.strings.length - stringIdx
}

// Hand span cost: penalty for fret distance between two positions
export function shiftCost(prev: FretPosition | null, next: FretPosition): number {
  if (next.fret === 0) return 0   // open string always free
  if (!prev || prev.fret === 0) return 0
  return Math.abs(next.fret - prev.fret) * 1.5
}
