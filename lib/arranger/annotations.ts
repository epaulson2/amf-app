import type { Arrangement, GuitarNote, Measure, ChordEvent } from './types'
import { CP_MODES } from './types'

export type OverlayType = 'orbits' | 'dichords' | 'cadences' | 'species'

export interface BeatAnnotation {
  startBeat: number
  measure: number
  beat: number
  orbit?: string
  dichord?: string
  species?: string
  cadence?: string
}

export interface AnnotationSet {
  beats: BeatAnnotation[]
  overlays: Set<OverlayType>
}

const SEMITONE_TO_INTERVAL: Record<number, string> = {
  0: '8', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: '#4', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7',
}

function getOrbit(notePc: number, chord: ChordEvent | null): string {
  if (!chord || chord.tones.length === 0) return 'N'
  if (notePc === chord.tones[0]) return 'R'
  if (chord.tones[1] !== undefined && notePc === chord.tones[1]) return '3'
  if (chord.tones[2] !== undefined && notePc === chord.tones[2]) return '5'
  return 'N'
}

function chordAtBeat(measures: Measure[], beat: number): ChordEvent | null {
  for (const m of measures) {
    if (beat >= m.startBeat && beat < m.startBeat + m.beats) return m.chord
  }
  return null
}

export function computeAnnotations(
  arrangement: Arrangement,
  activeOverlays: Set<OverlayType>,
): AnnotationSet {
  if (activeOverlays.size === 0) return { beats: [], overlays: activeOverlays }

  const { guitarNotes, measures, mode } = arrangement
  const [beatsPerMeasure] = arrangement.timeSignature
  const isCP = CP_MODES.has(mode as Parameters<typeof CP_MODES.has>[0])

  const beatMap = new Map<number, GuitarNote[]>()
  for (const note of guitarNotes) {
    const key = Math.round(note.startBeat * 4) / 4
    if (!beatMap.has(key)) beatMap.set(key, [])
    beatMap.get(key)!.push(note)
  }

  const beats: BeatAnnotation[] = []

  for (const [beatPos, notes] of beatMap) {
    const chord = chordAtBeat(measures, beatPos)
    let measureNum = 1
    let beatInMeasure = 1

    for (const m of measures) {
      if (beatPos >= m.startBeat && beatPos < m.startBeat + m.beats) {
        measureNum = m.number
        beatInMeasure = Math.floor(beatPos - m.startBeat) + 1
        break
      }
    }

    const ann: BeatAnnotation = { startBeat: beatPos, measure: measureNum, beat: beatInMeasure }

    if (activeOverlays.has('orbits')) {
      const melody = notes.find(n => n.voice === 'melody')
      const bass = notes.find(n => n.voice === 'bass')
      const parts: string[] = []
      if (melody) parts.push(`M:${getOrbit(melody.pitch % 12, chord)}`)
      if (bass) parts.push(`B:${getOrbit(bass.pitch % 12, chord)}`)
      if (parts.length > 0) ann.orbit = parts.join(' ')
    }

    if (activeOverlays.has('dichords')) {
      const melody = notes.find(n => n.voice === 'melody')
      const bass = notes.find(n => n.voice === 'bass')
      if (melody && bass) {
        const semitones = ((melody.pitch - bass.pitch) % 12 + 12) % 12
        ann.dichord = SEMITONE_TO_INTERVAL[semitones]
      }
    }

    if (activeOverlays.has('species') && isCP) {
      const melody = notes.find(n => n.voice === 'melody')
      if (melody && chord) {
        const isChordTone = chord.tones.includes(melody.pitch % 12)
        if (mode === 'first-species') {
          ann.species = isChordTone ? '1:1' : 'N'
        } else if (mode === 'second-species') {
          ann.species = !isChordTone ? 'PT' : 'CT'
        } else {
          ann.species = isChordTone ? 'CT' : 'NCT'
        }
      }
    }

    if (activeOverlays.has('cadences') && isCP) {
      const isPhraseLast = measureNum > 0 && measureNum % 4 === 0 && beatInMeasure === beatsPerMeasure
      if (isPhraseLast) ann.cadence = 'PAC'
    }

    if (ann.orbit || ann.dichord || ann.species || ann.cadence) {
      beats.push(ann)
    }
  }

  beats.sort((a, b) => a.startBeat - b.startBeat)
  return { beats, overlays: activeOverlays }
}
