import type { NoteEvent, ChordEvent } from '../types'

export type CadenceType = 'PAC' | 'IAC' | 'HC' | 'DC' | 'none'
export type FormType = 'period' | 'sentence' | 'binary' | 'through-composed' | 'unknown'
export type HarmonicRhythm = 'slow' | 'medium' | 'fast'

export interface Phrase {
  start: number
  end: number
  cadence: CadenceType
}

export interface MelodyAnalysis {
  pillarNotes: NoteEvent[]
  waypoints: NoteEvent[]
  form: FormType
  phrases: Phrase[]
  basicIdea: NoteEvent[]
  harmonicRhythm: HarmonicRhythm
  totalBeats: number
  beatsPerMeasure: number
}

function chordAtBeat(beat: number, chords: ChordEvent[]): ChordEvent | null {
  return chords.find(c => beat >= c.startBeat && beat < c.startBeat + c.durationBeats) ?? null
}

function detectCadence(
  phraseEnd: number,
  chords: ChordEvent[],
  melody: NoteEvent[],
): CadenceType {
  const preChord = chordAtBeat(phraseEnd - 2, chords)
  const cadChord = chordAtBeat(phraseEnd - 1, chords)
  if (!preChord || !cadChord) return 'none'

  const cadNote = melody.find(n => n.startBeat >= phraseEnd - 1 && n.startBeat < phraseEnd)
  const melodyPc = cadNote ? cadNote.pitch % 12 : -1

  const rootInterval = Math.abs(preChord.tones[0] - cadChord.tones[0]) % 12
  // V→I motion (dominant to tonic): root moves by 5 or 7 semitones
  if (rootInterval === 5 || rootInterval === 7) {
    if (melodyPc === cadChord.tones[0]) return 'PAC'
    return 'IAC'
  }
  // Ends on chord that sounds like dominant (unresolved)
  if (cadNote && preChord.tones[0] === cadChord.tones[0]) return 'HC'

  return 'DC'
}

function findPhraseBoundaries(totalBeats: number, beatsPerMeasure: number): number[] {
  const boundaries: number[] = []
  const phraseLen = beatsPerMeasure * 4
  for (let b = phraseLen; b < totalBeats; b += phraseLen) {
    boundaries.push(b)
  }
  boundaries.push(totalBeats)
  return boundaries
}

export function analyzeMelody(
  melody: NoteEvent[],
  chords: ChordEvent[],
  timeSignature: [number, number],
): MelodyAnalysis {
  const [beatsPerMeasure] = timeSignature
  const totalBeats = melody.reduce((m, n) => Math.max(m, n.startBeat + n.durationBeats), 0)

  const pillarNotes = melody.filter(n => {
    const isDownbeat = n.startBeat % beatsPerMeasure === 0
    const isLong = n.durationBeats >= 1
    return isDownbeat || isLong
  })

  const chordChanges = new Set(chords.map(c => c.startBeat))
  const waypoints = melody.filter(n => chordChanges.has(n.startBeat) || pillarNotes.includes(n))

  const boundaries = findPhraseBoundaries(totalBeats, beatsPerMeasure)
  const phrases: Phrase[] = []
  let prevBound = 0
  for (const bound of boundaries) {
    const cadence = detectCadence(bound, chords, melody)
    phrases.push({ start: prevBound, end: bound, cadence })
    prevBound = bound
  }

  let form: FormType = 'unknown'
  if (phrases.length === 2) {
    const antLen = phrases[0].end - phrases[0].start
    const conLen = phrases[1].end - phrases[1].start
    if (Math.abs(antLen - conLen) < 2) {
      form = (phrases[0].cadence === 'HC' && (phrases[1].cadence === 'PAC' || phrases[1].cadence === 'IAC'))
        ? 'period' : 'sentence'
    }
  } else if (phrases.length >= 3) {
    form = 'binary'
  } else if (phrases.length === 1) {
    form = 'through-composed'
  }

  const basicIdea = melody.filter(n => n.startBeat < beatsPerMeasure * 2)

  const changesPerMeasure = chords.length / Math.max(1, Math.ceil(totalBeats / beatsPerMeasure))
  const harmonicRhythm: HarmonicRhythm = changesPerMeasure > 1.5 ? 'fast' : changesPerMeasure > 0.5 ? 'medium' : 'slow'

  return { pillarNotes, waypoints, form, phrases, basicIdea, harmonicRhythm, totalBeats, beatsPerMeasure }
}
