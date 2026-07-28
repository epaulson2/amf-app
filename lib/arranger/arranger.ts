import type {
  ArrangementRequest,
  ArrangementResponse,
  Arrangement,
  ArrangementMode,
  Measure,
  NoteEvent,
  ChordEvent,
} from './types'
import { buildVoices } from './voices'
import { solveArrangement } from './solver'
import { toAlphaTex } from './alphatex'
import { chordAtBeat } from './theory'
import { generateCounterpoint } from './counterpoint/index'
import { CP_MODES } from './types'

const MODE_TITLES: Record<ArrangementMode, string> = {
  'simple':           'Melody + Bass',
  'drone':            'Melody + Drone + Bass',
  'harmonic':         'Melody + Bass + Inner Voice',
  'voice-led':        'Full Texture',
  'first-species':    '1st Species Counterpoint',
  'second-species':   '2nd Species Counterpoint',
  'free-counterpoint':'Free Counterpoint',
  'imitation':        'Imitation',
}

function buildMeasures(
  guitarNotes: ReturnType<typeof solveArrangement>['guitarNotes'],
  chords: ChordEvent[],
  timeSignature: [number, number],
  totalBeats: number,
): Measure[] {
  const [bpm] = timeSignature
  const totalMeasures = Math.ceil(totalBeats / bpm)
  const measures: Measure[] = []

  for (let m = 0; m < totalMeasures; m++) {
    const start = m * bpm
    measures.push({
      number: m + 1,
      startBeat: start,
      beats: bpm,
      chord: chordAtBeat(start, chords),
      notes: guitarNotes.filter(n => n.startBeat >= start && n.startBeat < start + bpm),
    })
  }

  return measures
}

function totalDuration(melody: NoteEvent[]): number {
  return melody.reduce((max, n) => Math.max(max, n.startBeat + n.durationBeats), 0)
}

export function arrange(request: ArrangementRequest): ArrangementResponse {
  const {
    melody,
    chords,
    tuning,
    modes,
    title = 'Arrangement',
    tempo = 120,
    timeSignature = [4, 4],
  } = request

  if (melody.length === 0 || chords.length === 0) {
    return { arrangements: [], error: 'Melody and chords are required' }
  }

  const arrangements: Arrangement[] = []
  const totalBeats = totalDuration(melody)

  for (const mode of modes) {
    const voices = CP_MODES.has(mode)
      ? generateCounterpoint(melody, chords, tuning, mode, timeSignature)
      : buildVoices(melody, chords, tuning, mode, timeSignature)
    const { guitarNotes, playabilityScore } = solveArrangement(voices, tuning)
    const measures = buildMeasures(guitarNotes, chords, timeSignature, totalBeats)

    const arrangement: Arrangement = {
      mode,
      tuning,
      title: `${title} — ${MODE_TITLES[mode]}`,
      tempo,
      timeSignature,
      measures,
      guitarNotes,
      playabilityScore,
      alphatex: '',
    }

    arrangement.alphatex = toAlphaTex(arrangement)
    arrangements.push(arrangement)
  }

  return { arrangements }
}
