// Deterministic piano-key geometry for the M02 pilot. Pure data: no React, no audio, no randomness.
// Every white key is 1 unit wide. Black keys sit on the boundary after C, D, F, G and A (never after E or B),
// which is what produces the repeating "two black keys, then three" landmark.
export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type Letter = (typeof LETTERS)[number]

/** Semitone offset of each white key above C, and the black key (if any) that follows it. */
const WHITE_SEMI: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const BLACK_AFTER: Record<Letter, boolean> = { C: true, D: true, E: false, F: true, G: true, A: true, B: false }
/** Standard keyboards shift the outer black keys slightly off the boundary; G is centred. Fractions of a white key. */
const BLACK_SHIFT: Partial<Record<Letter, number>> = { C: -0.07, D: 0.07, F: -0.09, G: 0, A: 0.09 }
export const BLACK_WIDTH = 0.58

export type White = { kind: 'white'; letter: Letter; midi: number; index: number; x: number; w: 1 }
export type Black = { kind: 'black'; after: Letter; midi: number; x: number; w: number; groupSize: 2 | 3; groupIndex: number }
export type Keyboard = { whites: White[]; blacks: Black[]; width: number; groups: { size: 2 | 3; firstWhite: number; blacks: Black[] }[] }

/** Build `count` white keys starting on `start` in the octave whose C is MIDI `cMidi` (default 60, an internal reference only). */
export function buildKeyboard(start: Letter, count: number, cMidi = 60): Keyboard {
  const first = LETTERS.indexOf(start)
  const whites: White[] = []
  for (let i = 0; i < count; i++) {
    const li = (first + i) % 7
    const octave = Math.floor((first + i) / 7)
    const letter = LETTERS[li]
    whites.push({ kind: 'white', letter, midi: cMidi + octave * 12 + WHITE_SEMI[letter], index: i, x: i, w: 1 })
  }
  const blacks: Black[] = []
  for (let i = 0; i < count - 1; i++) {
    const w = whites[i]
    if (!BLACK_AFTER[w.letter]) continue
    blacks.push({ kind: 'black', after: w.letter, midi: w.midi + 1, x: i + 1 - BLACK_WIDTH / 2 + (BLACK_SHIFT[w.letter] ?? 0), w: BLACK_WIDTH, groupSize: 2, groupIndex: 0 })
  }
  // Group consecutive black keys: a run of black keys is broken by E→F and B→C (no black key).
  const groups: Keyboard['groups'] = []
  let run: Black[] = []
  const flush = () => {
    if (!run.length) return
    const size = run.length as 2 | 3
    run.forEach((b, k) => { b.groupSize = size; b.groupIndex = k })
    groups.push({ size, firstWhite: Math.round(run[0].x + BLACK_WIDTH / 2) - 1, blacks: [...run] })
    run = []
  }
  blacks.forEach((b, k) => {
    const prev = run[run.length - 1]
    if (prev && Math.round(b.x + BLACK_WIDTH / 2) - Math.round(prev.x + BLACK_WIDTH / 2) !== 1) flush()
    run.push(b)
    if (k === blacks.length - 1) flush()
  })
  return { whites, blacks, width: count, groups }
}

/** The white keys that are a C. */
export const cKeys = (kb: Keyboard) => kb.whites.filter(w => w.letter === 'C')

/** True when white key `w` is the one immediately to the LEFT of a group of exactly two black keys. */
export function isLeftOfTwoBlacks(kb: Keyboard, w: White): boolean {
  const after = kb.blacks.find(b => Math.round(b.x + BLACK_WIDTH / 2) === w.index + 1)
  return !!after && after.groupIndex === 0 && after.groupSize === 2
}

/** Pitch name without any octave number, as shown to learners. */
export const nameOf = (midi: number): Letter | `${Letter}♯` => {
  const pc = ((midi % 12) + 12) % 12
  const m: Record<number, Letter | `${Letter}♯`> = { 0: 'C', 1: 'C♯', 2: 'D', 3: 'D♯', 4: 'E', 5: 'F', 6: 'F♯', 7: 'G', 8: 'G♯', 9: 'A', 10: 'A♯', 11: 'B' }
  return m[pc]
}
