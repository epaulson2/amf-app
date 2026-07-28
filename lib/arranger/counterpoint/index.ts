import type { NoteEvent, ChordEvent, Tuning, ArrangementMode } from '../types'
import { analyzeMelody } from './cantus'
import { generateFirstSpecies } from './first-species'
import { generateSecondSpecies } from './second-species'
import { generateFreeCounterpoint } from './free'
import { generateImitation } from './imitation'

export function generateCounterpoint(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
  mode: ArrangementMode,
  timeSignature: [number, number],
): NoteEvent[] {
  const melodyNotes = melody.map(n => ({ ...n, voice: 'melody' as const }))
  const analysis = analyzeMelody(melody, chords, timeSignature)
  let accompaniment: NoteEvent[] = []

  switch (mode) {
    case 'first-species':
      accompaniment = generateFirstSpecies(melody, chords, tuning)
      break
    case 'second-species':
      accompaniment = generateSecondSpecies(melody, chords, tuning)
      break
    case 'free-counterpoint':
      accompaniment = generateFreeCounterpoint(melody, chords, tuning, analysis)
      break
    case 'imitation':
      accompaniment = generateImitation(melody, chords, tuning, analysis)
      break
    default:
      accompaniment = generateFirstSpecies(melody, chords, tuning)
  }

  return [...melodyNotes, ...accompaniment]
}
