import type { NoteEvent, ChordEvent, Tuning } from '../types'
import type { MelodyAnalysis } from './cantus'
import { isConsonant } from './rules'
import { generateFirstSpecies } from './first-species'

function transposeAndDelay(notes: NoteEvent[], semitones: number, delay: number): NoteEvent[] {
  return notes.map(n => ({
    ...n,
    pitch: n.pitch + semitones,
    startBeat: n.startBeat + delay,
    voice: 'inner' as const,
  }))
}

function isValid(imitation: NoteEvent[], melody: NoteEvent[]): boolean {
  for (const im of imitation) {
    if (im.pitch < 45 || im.pitch > 76) return false
    const mel = melody.find(m => m.startBeat <= im.startBeat && m.startBeat + m.durationBeats > im.startBeat)
    if (mel && !isConsonant(im.pitch, mel.pitch)) return false
  }
  return true
}

export function generateImitation(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
  analysis: MelodyAnalysis,
): NoteEvent[] {
  const { basicIdea, beatsPerMeasure } = analysis
  if (basicIdea.length === 0) return generateFirstSpecies(melody, chords, tuning)

  const DELAYS = [1, 2, beatsPerMeasure]
  const TRANSPOSITIONS = [-7, -5, -4, -3]

  let bestImitation: NoteEvent[] | null = null
  for (const delay of DELAYS) {
    for (const semitones of TRANSPOSITIONS) {
      const attempt = transposeAndDelay(basicIdea, semitones, delay)
      if (isValid(attempt, melody)) { bestImitation = attempt; break }
    }
    if (bestImitation) break
  }

  if (!bestImitation) return generateFirstSpecies(melody, chords, tuning)

  const imitationEnd = Math.max(...bestImitation.map(n => n.startBeat + n.durationBeats))
  const remainingMelody = melody.filter(n => n.startBeat >= imitationEnd)
  const remainingChords = chords.filter(c => c.startBeat + c.durationBeats > imitationEnd)
  const bass = generateFirstSpecies(remainingMelody, remainingChords, tuning)

  return [...bestImitation, ...bass]
}
