import type { NoteEvent, ChordEvent, Tuning } from '../types'
import type { MelodyAnalysis } from './cantus'
import { generateFirstSpecies } from './first-species'
import { generateSecondSpecies } from './second-species'
import { generateFourthSpecies } from './fourth-species'

function melodySlice(melody: NoteEvent[], start: number, end: number): NoteEvent[] {
  return melody.filter(n => n.startBeat >= start && n.startBeat < end)
}

function chordsSlice(chords: ChordEvent[], start: number, end: number): ChordEvent[] {
  return chords.filter(c => c.startBeat < end && c.startBeat + c.durationBeats > start)
}

export function generateFreeCounterpoint(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
  analysis: MelodyAnalysis,
): NoteEvent[] {
  const { phrases, beatsPerMeasure } = analysis
  const suspensions = generateFourthSpecies(melody, chords, analysis)
  const suspendedBeats = new Set(suspensions.map(n => n.startBeat))
  const result: NoteEvent[] = []

  for (const phrase of phrases) {
    const { start, end } = phrase
    const midpoint = start + (end - start) / 2

    // First half: 1st species (stable)
    const s1melody = melodySlice(melody, start, midpoint)
    const s1chords = chordsSlice(chords, start, midpoint)
    result.push(...generateFirstSpecies(s1melody, s1chords, tuning))

    // Second half (excl. last measure): 2nd species
    const s2melody = melodySlice(melody, midpoint, end - beatsPerMeasure)
      .filter(n => !suspendedBeats.has(n.startBeat) && !suspendedBeats.has(n.startBeat - 1))
    if (s2melody.length > 0) {
      const s2chords = chordsSlice(chords, midpoint, end)
      result.push(...generateSecondSpecies(s2melody, s2chords, tuning))
    }

    // Last measure before cadence: 1st species approach
    const preMelody = melodySlice(melody, end - beatsPerMeasure, end)
      .filter(n => !suspendedBeats.has(n.startBeat))
    if (preMelody.length > 0) {
      const preChords = chordsSlice(chords, end - beatsPerMeasure, end)
      result.push(...generateFirstSpecies(preMelody, preChords, tuning))
    }
  }

  // Overlay suspensions (take priority at their beats)
  result.push(...suspensions)

  // Deduplicate — suspensions win
  const byBeat = new Map<number, NoteEvent>()
  for (const n of result) {
    if (!byBeat.has(n.startBeat)) byBeat.set(n.startBeat, n)
  }
  for (const n of suspensions) {
    byBeat.set(n.startBeat, n)
  }

  return [...byBeat.values()].sort((a, b) => a.startBeat - b.startBeat)
}
