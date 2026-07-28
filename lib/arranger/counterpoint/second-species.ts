import type { NoteEvent, ChordEvent, Tuning } from '../types'
import { isConsonant, hasParallelPerfect, pcToMidiInRange, BASS_MIN, BASS_MAX, scoreBassCandidate } from './rules'

function chordAtBeat(beat: number, chords: ChordEvent[]): ChordEvent | null {
  return chords.find(c => beat >= c.startBeat && beat < c.startBeat + c.durationBeats) ?? null
}

function pickStrongBeat(
  note: NoteEvent,
  chords: ChordEvent[],
  prevBass: number | null,
  prevMelody: number | null,
  openStrings: number[],
): number | null {
  const chord = chordAtBeat(note.startBeat, chords)
  if (!chord) return null
  const candidates = chord.tones.flatMap(pc => pcToMidiInRange(pc, BASS_MIN, BASS_MAX))
  let valid = candidates.filter(c => isConsonant(c, note.pitch) && c < note.pitch)
  if (prevBass !== null && prevMelody !== null) {
    valid = valid.filter(c => !hasParallelPerfect(prevMelody, note.pitch, prevBass, c))
  }
  if (valid.length === 0) valid = candidates.filter(c => c < note.pitch)
  if (valid.length === 0) return null
  const scored = valid.map(c => ({ pitch: c, score: scoreBassCandidate(c, note.pitch, prevBass, openStrings) }))
  scored.sort((a, b) => b.score - a.score)
  return scored[0].pitch
}

export function generateSecondSpecies(
  melody: NoteEvent[],
  chords: ChordEvent[],
  tuning: Tuning,
): NoteEvent[] {
  const openStrings = tuning.strings
  const result: NoteEvent[] = []
  let prevBass: number | null = null
  let prevMelody: number | null = null
  const sorted = [...melody].sort((a, b) => a.startBeat - b.startBeat)

  for (let i = 0; i < sorted.length; i++) {
    const note = sorted[i]
    const halfDur = note.durationBeats / 2

    if (halfDur < 0.25) {
      // Too short to subdivide — 1st species fallback
      const strong = pickStrongBeat(note, chords, prevBass, prevMelody, openStrings)
      if (strong !== null) {
        result.push({ pitch: strong, startBeat: note.startBeat, durationBeats: note.durationBeats, voice: 'bass' })
        prevBass = strong
      }
      prevMelody = note.pitch
      continue
    }

    const strong = pickStrongBeat(note, chords, prevBass, prevMelody, openStrings)
    if (strong === null) { prevMelody = note.pitch; continue }

    result.push({ pitch: strong, startBeat: note.startBeat, durationBeats: halfDur, voice: 'bass' })

    // Weak beat: passing tone toward next strong beat note
    const nextNote = sorted[i + 1]
    let weakPitch = strong
    if (nextNote) {
      const nextStrong = pickStrongBeat(nextNote, chords, strong, nextNote.pitch, openStrings)
      if (nextStrong !== null && Math.abs(strong - nextStrong) > 1) {
        weakPitch = strong + Math.sign(nextStrong - strong)
      }
    }
    result.push({ pitch: weakPitch, startBeat: note.startBeat + halfDur, durationBeats: halfDur, voice: 'bass' })

    prevBass = weakPitch
    prevMelody = note.pitch
  }

  return result
}
