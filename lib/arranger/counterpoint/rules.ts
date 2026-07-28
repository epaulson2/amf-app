const CONSONANT_INTERVALS = new Set([0, 3, 4, 7, 8, 9, 12])

export function intervalClass(pitchA: number, pitchB: number): number {
  return Math.abs(pitchA - pitchB) % 12
}

export function isConsonant(pitchA: number, pitchB: number): boolean {
  const ic = intervalClass(pitchA, pitchB)
  return CONSONANT_INTERVALS.has(ic)
}

export type MotionType = 'contrary' | 'oblique' | 'similar' | 'parallel'

export function motionType(prev1: number, curr1: number, prev2: number, curr2: number): MotionType {
  const dir1 = Math.sign(curr1 - prev1)
  const dir2 = Math.sign(curr2 - prev2)
  if (dir1 === 0 || dir2 === 0) return 'oblique'
  if (dir1 !== dir2) return 'contrary'
  const prevInterval = Math.abs(prev1 - prev2) % 12
  const currInterval = Math.abs(curr1 - curr2) % 12
  return prevInterval === currInterval ? 'parallel' : 'similar'
}

export function hasParallelPerfect(prev1: number, curr1: number, prev2: number, curr2: number): boolean {
  const motion = motionType(prev1, curr1, prev2, curr2)
  if (motion !== 'parallel') return false
  const prevIc = intervalClass(prev1, prev2)
  const currIc = intervalClass(curr1, curr2)
  return (prevIc === 7 || prevIc === 0) && (currIc === 7 || currIc === 0)
}

export function hasVoiceCrossing(upperPitch: number, lowerPitch: number): boolean {
  return upperPitch <= lowerPitch
}

// Expand a pitch class (0-11) to absolute MIDI pitches within a register
export function pcToMidiInRange(pc: number, minMidi: number, maxMidi: number): number[] {
  const results: number[] = []
  for (let octave = 1; octave <= 9; octave++) {
    const midi = octave * 12 + pc
    if (midi >= minMidi && midi <= maxMidi) results.push(midi)
  }
  return results
}

// Bass register: roughly E1 to A3
export const BASS_MIN = 28
export const BASS_MAX = 57

export function resolvesSuspension(suspendedPitch: number, resolutionPitch: number): boolean {
  const diff = suspendedPitch - resolutionPitch
  return diff === 1 || diff === 2
}

export function scoreBassCandidate(
  candidate: number,
  _melody: number,
  prevBass: number | null,
  openStrings: number[],
): number {
  let score = 0
  if (openStrings.includes(candidate)) score += 3
  if (prevBass !== null) {
    const bassDir = Math.sign(candidate - prevBass)
    if (bassDir !== 0) score += 2 // motion preferred over stasis
    const leap = Math.abs(candidate - prevBass)
    if (leap <= 2) score += 1
    if (leap > 7) score -= 2
  }
  return score
}
