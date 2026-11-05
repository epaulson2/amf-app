// Pitch helpers. Convention: C4 = MIDI 60, A4 = 69 = 440 Hz, 12-tone equal temperament.
const SHARP = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as const

export const C4 = 60

export function midiToName(midi: number): string {
  if (!Number.isInteger(midi) || midi < 0 || midi > 127) throw new RangeError(`not a MIDI note: ${midi}`)
  return `${SHARP[midi % 12]}${Math.floor(midi / 12) - 1}`
}

export function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

export function isBlackKey(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12)
}

export function semitones(from: number, to: number): number {
  return to - from
}
