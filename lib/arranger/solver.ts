import type { NoteEvent, GuitarNote, FretPosition, Tuning, VoiceType } from './types'
import { getPitchPositions, shiftCost } from './fretboard'

// String index ranges per voice (for DADGAD and Standard 6-string)
// String 0 = lowest, 5 = highest
const VOICE_STRING_PREFS: Record<VoiceType, number[]> = {
  bass:   [0, 1],     // lowest two strings
  drone:  [1, 2, 3],  // mid-low strings (open only)
  inner:  [2, 3],     // middle strings
  melody: [4, 5],     // highest two strings
}

interface SolvedNote extends NoteEvent {
  string: number
  fret: number
  solved: boolean
}

// At each beat position, track which strings are occupied
type OccupancyMap = Map<number, Set<number>>

function beatKey(startBeat: number): number {
  return Math.round(startBeat * 4) // quantize to 16th notes
}

function markOccupied(map: OccupancyMap, note: NoteEvent, string: number) {
  // Mark the string as occupied for the duration of this note
  const steps = Math.max(1, Math.round(note.durationBeats * 4))
  const start = beatKey(note.startBeat)
  for (let i = 0; i < steps; i++) {
    const key = start + i
    if (!map.has(key)) map.set(key, new Set())
    map.get(key)!.add(string)
  }
}

function isOccupied(map: OccupancyMap, note: NoteEvent, string: number): boolean {
  const steps = Math.max(1, Math.round(note.durationBeats * 4))
  const start = beatKey(note.startBeat)
  for (let i = 0; i < steps; i++) {
    if (map.get(start + i)?.has(string)) return true
  }
  return false
}

function scorePosition(
  pos: FretPosition,
  prev: FretPosition | null,
  preferredStrings: number[],
): number {
  let cost = 0

  // Open string bonus
  if (pos.fret === 0) cost -= 3

  // Preferred string closeness
  const minStrDist = Math.min(...preferredStrings.map(s => Math.abs(s - pos.string)))
  cost += minStrDist * 2

  // Position shift penalty
  cost += shiftCost(prev, pos)

  return cost
}

function solveVoiceGroup(
  notes: NoteEvent[],
  voice: VoiceType,
  tuning: Tuning,
  occupied: OccupancyMap,
  openOnly: boolean = false,
): SolvedNote[] {
  const prefs = VOICE_STRING_PREFS[voice] ?? [2, 3]
  const sorted = [...notes].sort((a, b) => a.startBeat - b.startBeat)

  let prevPosition: FretPosition | null = null
  const result: SolvedNote[] = []

  for (const note of sorted) {
    let candidates = getPitchPositions(note.pitch, tuning)
      .filter(p => !isOccupied(occupied, note, p.string))

    if (openOnly) {
      candidates = candidates.filter(p => p.fret === 0)
    }

    if (candidates.length === 0) {
      // Unsolvable — skip (reduces playabilityScore)
      result.push({ ...note, string: -1, fret: -1, solved: false })
      continue
    }

    // Score and pick best
    const scored = candidates.map(p => ({ p, score: scorePosition(p, prevPosition, prefs) }))
    scored.sort((a, b) => a.score - b.score)
    const best = scored[0].p

    markOccupied(occupied, note, best.string)
    prevPosition = best

    result.push({ ...note, string: best.string, fret: best.fret, solved: true })
  }

  return result
}

export function solveArrangement(voices: NoteEvent[], tuning: Tuning): { guitarNotes: GuitarNote[]; playabilityScore: number } {
  const occupied: OccupancyMap = new Map()
  const allSolved: SolvedNote[] = []

  // Solve in priority order: melody → bass → inner → drone
  const voiceOrder: VoiceType[] = ['melody', 'bass', 'inner', 'drone']

  for (const voice of voiceOrder) {
    const group = voices.filter(n => n.voice === voice)
    if (group.length === 0) continue

    const isOpenOnly = voice === 'drone'
    const solved = solveVoiceGroup(group, voice, tuning, occupied, isOpenOnly)
    allSolved.push(...solved)
  }

  const solvedNotes = allSolved.filter(n => n.solved)
  const playabilityScore = allSolved.length > 0 ? solvedNotes.length / allSolved.length : 1

  const guitarNotes: GuitarNote[] = solvedNotes.map(({ solved: _, ...n }) => n as GuitarNote)

  return { guitarNotes, playabilityScore }
}
