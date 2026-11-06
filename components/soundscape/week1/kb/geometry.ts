export const NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const whiteName = (start: string, i: number) => NAMES[(NAMES.indexOf(start) + i) % 7]
/** A black key sits between two white keys except between E and F, and between B and C. */
export const hasBlackAfter = (name: string) => name !== 'E' && name !== 'B'
/** Which white-key indexes have a black key to their right, for a run of `whites` keys starting on `start`. */
export function blackAfterIndexes(start: string, whites: number): number[] {
  return Array.from({ length: whites - 1 }, (_, i) => i).filter(i => hasBlackAfter(whiteName(start, i)))
}
