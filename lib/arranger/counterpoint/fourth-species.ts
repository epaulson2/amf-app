import type { NoteEvent, ChordEvent } from '../types'
import type { MelodyAnalysis } from './cantus'
import { isConsonant, resolvesSuspension, pcToMidiInRange, BASS_MIN, BASS_MAX } from './rules'

function chordAtBeat(beat: number, chords: ChordEvent[]): ChordEvent | null {
  return chords.find(c => beat >= c.startBeat && beat < c.startBeat + c.durationBeats) ?? null
}

interface SuspensionSite {
  prepBeat: number
  suspBeat: number
  resBeat: number
  pitch: number
  resPitch: number
}

function findSuspensions(analysis: MelodyAnalysis, chords: ChordEvent[]): SuspensionSite[] {
  const sites: SuspensionSite[] = []
  const { phrases, beatsPerMeasure } = analysis

  for (const phrase of phrases) {
    if (phrase.cadence === 'none') continue
    const suspBeat = phrase.end - beatsPerMeasure
    const prepBeat = suspBeat - 1
    const resBeat = suspBeat + 1
    if (prepBeat < 0) continue

    const prepChord = chordAtBeat(prepBeat, chords)
    const suspChord = chordAtBeat(suspBeat, chords)
    const resChord = chordAtBeat(resBeat, chords)
    if (!prepChord || !suspChord || !resChord) continue

    // Try chord tones consonant with prep chord as suspension candidates
    const prepCandidates = prepChord.tones.flatMap(pc => pcToMidiInRange(pc, BASS_MIN, BASS_MAX))
    let found = false
    for (const pitch of prepCandidates) {
      if (!isConsonant(pitch, prepChord.tones[0] + Math.floor(pitch / 12) * 12)) continue
      // Must be dissonant with suspension chord on the strong beat
      const suspConsonant = suspChord.tones.some(pc =>
        pcToMidiInRange(pc, BASS_MIN, BASS_MAX).some(sp => isConsonant(pitch, sp) && Math.abs(pitch - sp) < 13)
      )
      if (suspConsonant) continue

      // Find a resolution: step down into res chord
      for (const resPc of resChord.tones) {
        for (const resPitch of pcToMidiInRange(resPc, BASS_MIN, BASS_MAX)) {
          if (resolvesSuspension(pitch, resPitch)) {
            sites.push({ prepBeat, suspBeat, resBeat, pitch, resPitch })
            found = true
            break
          }
        }
        if (found) break
      }
      if (found) break
    }
  }
  return sites
}

export function generateFourthSpecies(
  _melody: NoteEvent[],
  chords: ChordEvent[],
  analysis: MelodyAnalysis,
): NoteEvent[] {
  const sites = findSuspensions(analysis, chords)
  const result: NoteEvent[] = []
  for (const site of sites) {
    result.push({ pitch: site.pitch, startBeat: site.prepBeat, durationBeats: 2, voice: 'bass', tie: true })
    result.push({ pitch: site.resPitch, startBeat: site.resBeat, durationBeats: 1, voice: 'bass' })
  }
  return result
}
