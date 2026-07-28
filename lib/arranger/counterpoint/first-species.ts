import type { NoteEvent, ChordEvent, Tuning } from '../types'
import { isConsonant, hasParallelPerfect, pcToMidiInRange, BASS_MIN, BASS_MAX, scoreBassCandidate } from './rules'

function chordAtBeat(beat: number, chords: ChordEvent[]): ChordEvent | null {
  return chords.find(c => beat >= c.startBeat && beat < c.startBeat + c.durationBeats) ?? null
}

export function generateFirstSpecies(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
): NoteEvent[] {
  const openStrings = tuning.strings
  const result: NoteEvent[] = []
  let prevBass: number | null = null
  let prevMelody: number | null = null

  const sorted = [...melody].sort((a, b) => a.startBeat - b.startBeat)

  for (const note of sorted) {
    const chord = chordAtBeat(note.startBeat, chords)
    if (!chord) continue

    const candidates = chord.tones.flatMap(pc => pcToMidiInRange(pc, BASS_MIN, BASS_MAX))
    let valid = candidates.filter(c => isConsonant(c, note.pitch) && c < note.pitch)

    if (prevBass !== null && prevMelody !== null) {
      valid = valid.filter(c => !hasParallelPerfect(prevMelody!, note.pitch, prevBass!, c))
    }

    if (valid.length === 0) {
      valid = candidates.filter(c => c < note.pitch)
    }
    if (valid.length === 0) continue

    const scored = valid.map(c => ({
      pitch: c,
      score: scoreBassCandidate(c, note.pitch, prevBass, openStrings),
    }))
    scored.sort((a, b) => b.score - a.score)
    const best = scored[0].pitch

    result.push({ pitch: best, startBeat: note.startBeat, durationBeats: note.durationBeats, voice: 'bass' })
    prevBass = best
    prevMelody = note.pitch
  }

  return result
}
