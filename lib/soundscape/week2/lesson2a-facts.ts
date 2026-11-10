// Source of truth for every note, letter count and semitone count shown in Lesson 2A figures and the practice sheet.
// Mirrors the V2 manuscript "Fixed facts" table (MIDI: B3 59, C4 60, D4 62, E4 64, F4 65, G4 67). Pure data, no audio.
const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
export const noteName = (m: number) => `${NAMES[m % 12]}${Math.floor(m / 12) - 1}`
const LETTER_INDEX = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
/** Letters from the lower to the higher white-key note, counting both ends (C4 to E4 = 3). */
export const letterCount = (a: number, b: number) => (Math.floor(b / 12) * 7 + LETTER_INDEX[b % 12]) - (Math.floor(a / 12) * 7 + LETTER_INDEX[a % 12]) + 1
export const semitones = (a: number, b: number) => b - a
const QUALITY: Record<string, string> = { '2:2': 'major second', '3:3': 'minor third', '3:4': 'major third', '4:5': 'perfect fourth' }
export const intervalName = (a: number, b: number) => QUALITY[`${letterCount(a, b)}:${semitones(a, b)}`]
export const M = { B3: 59, C4: 60, D4: 62, E4: 64, F4: 65, G4: 67 } as const
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
