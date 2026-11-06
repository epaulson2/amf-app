const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const NUMBER = ['', 'unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave']

/** Note letters from the lower note to the upper note, counting both ends (C4 to E4: C D E). */
export function letterRun(lowerName: string, upperName: string): string[] {
  const a = LETTERS.indexOf(lowerName[0]), b = LETTERS.indexOf(upperName[0])
  const n = ((b - a + 7) % 7) + 1
  const span = lowerName === upperName ? 1 : n === 1 ? 8 : n
  return Array.from({ length: span }, (_, i) => LETTERS[(a + i) % 7])
}
