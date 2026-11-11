// Source of truth for every note, letter count and semitone count shown in Lesson 2A figures and the practice sheet.
// Mirrors the V2 manuscript "Fixed facts" table (MIDI: B3 59, C4 60, D4 62, E4 64, F4 65, G4 67). Pure data, no audio.
const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
export const noteName = (m: number) => `${NAMES[m % 12]}${Math.floor(m / 12) - 1}`
const LETTER_INDEX = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
/** Letters from the lower to the higher white-key note, counting both ends (C4 to E4 = 3). */
export const letterCount = (a: number, b: number) => (Math.floor(b / 12) * 7 + LETTER_INDEX[b % 12]) - (Math.floor(a / 12) * 7 + LETTER_INDEX[a % 12]) + 1
export const semitones = (a: number, b: number) => b - a
const QUALITY: Record<string, string> = { '2:2': 'major second', '3:3': 'minor third', '3:4': 'major third', '4:5': 'perfect fourth', '5:6': 'diminished fifth', '4:6': 'augmented fourth' }
export const intervalName = (a: number, b: number) => QUALITY[`${letterCount(a, b)}:${semitones(a, b)}`]
export const M = { Fs4: 66, B3: 59, C4: 60, D4: 62, E4: 64, F4: 65, G4: 67 } as const
/** The five intervals and the start pair of the lesson. */
export const LESSON_2A_PAIRS = [[M.C4, M.E4], [M.E4, M.G4], [M.C4, M.F4], [M.B3, M.E4], [M.D4, M.E4]] as const
export const START = { lo: M.C4, up: M.E4 }
/** The three single changes from C4 + E4. `moved` is the voice that moves; the other holds. */
export const CHANGES = [
  { id: 1, text: 'Hold C4. Change E4 to F4.', lo: M.C4, up: M.F4, moved: 'upper' },
  { id: 2, text: 'Hold E4. Change C4 to B3.', lo: M.B3, up: M.E4, moved: 'lower' },
  { id: 3, text: 'Hold E4. Change C4 to D4.', lo: M.D4, up: M.E4, moved: 'lower' },
] as const
export const changeFacts = CHANGES.map(c => {
  const shift = c.moved === 'upper' ? c.up - START.up : c.lo - START.lo
  return { ...c, semis: semitones(c.lo, c.up), letters: letterCount(c.lo, c.up), name: intervalName(c.lo, c.up), dir: shift > 0 ? 'up' : 'down', by: Math.abs(shift) }
})

/** The five locked 2B cases, derived from the V2 table. Each restarts from C4 + E4. */
const sign = (n: number) => (n > 0 ? 1 : n < 0 ? -1 : 0)
export const FIVE_CASES = [
  { id: 'B1', lo2: M.C4, up2: M.F4 }, { id: 'B2', lo2: M.B3, up2: M.E4 }, { id: 'B3', lo2: M.D4, up2: M.E4 },
  { id: 'B4', lo2: M.B3, up2: M.F4 }, { id: 'B5', lo2: M.D4, up2: M.F4 },
].map(c => {
  const dl = c.lo2 - START.lo, du = c.up2 - START.up
  const motion = dl === 0 || du === 0 ? 'oblique' : sign(dl) !== sign(du) ? 'contrary' : 'similar'
  return { ...c, dl, du, motion, letters: letterCount(c.lo2, c.up2), semis: semitones(c.lo2, c.up2), name: intervalName(c.lo2, c.up2) }
})
