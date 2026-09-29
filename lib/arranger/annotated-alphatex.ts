import type { Arrangement, GuitarNote, Tuning } from './types'
import type { AnnotationSet, BeatAnnotation, OverlayType } from './annotations'
import { toAlphaTex } from './alphatex'
import { pitchName, toAlphaTabString } from './fretboard'

const DURATION_MAP: Array<[number, string, boolean]> = [
  [4, '1', false], [3, '2', true], [2, '2', false],
  [1.5, '4', true], [1, '4', false], [0.75, '8', true],
  [0.5, '8', false], [0.25, '16', false],
]

function durationParts(beats: number): [string, boolean] {
  return DURATION_MAP.reduce((b, item) =>
    Math.abs(item[0] - beats) < Math.abs(b[0] - beats) ? item : b
  ).slice(1) as [string, boolean]
}

function beatTex(notes: GuitarNote[], tuning: Tuning, label?: string): string {
  const maxDuration = Math.max(...notes.map(n => n.durationBeats))
  const [dur, dotted] = durationParts(maxDuration)
  const dot = dotted ? ' {d}' : ''
  const ch = label ? ` {ch "${label}"}` : ''

  if (notes.length === 1) {
    const n = notes[0]
    const s = toAlphaTabString(n.string, tuning)
    return `${n.fret}.${s} .${dur}${dot}${ch}`
  }

  const parts = notes.map(n => `${n.fret}.${toAlphaTabString(n.string, tuning)}`)
  return `(${parts.join(' ')}) .${dur}${dot}${ch}`
}

function restTex(beats: number): string {
  const [dur, dotted] = durationParts(beats)
  return `r .${dur}${dotted ? ' {d}' : ''}`
}

function tuningHeader(tuning: Tuning): string {
  return '(' + [...tuning.strings].reverse().map(midi => pitchName(midi).toLowerCase()).join(' ') + ')'
}

function groupByBeat(notes: GuitarNote[]): Map<number, GuitarNote[]> {
  const map = new Map<number, GuitarNote[]>()
  for (const note of notes) {
    const key = Math.round(note.startBeat * 4)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(note)
  }
  return map
}

function fillMeasureAnnotated(
  beatMap: Map<number, GuitarNote[]>,
  measureStart16th: number,
  measureLength16th: number,
  tuning: Tuning,
  labelMap: Map<number, string>,
): string[] {
  const tokens: string[] = []
  let cursor = measureStart16th
  const measureEnd = measureStart16th + measureLength16th

  const keys = [...beatMap.keys()]
    .filter(k => k >= measureStart16th && k < measureEnd)
    .sort((a, b) => a - b)

  for (const key of keys) {
    if (key < cursor) continue

    if (key > cursor) {
      tokens.push(restTex((key - cursor) / 4))
    }

    const notes = beatMap.get(key)!
    const label = labelMap.get(key)
    tokens.push(beatTex(notes, tuning, label))

    const advance = Math.max(...notes.map(n => n.durationBeats))
    cursor = key + Math.round(advance * 4)
  }

  if (cursor < measureEnd) {
    tokens.push(restTex((measureEnd - cursor) / 4))
  }

  return tokens
}

function buildLabel(ann: BeatAnnotation, active: Set<OverlayType>): string {
  const parts: string[] = []
  if (active.has('orbits') && ann.orbit) parts.push(ann.orbit)
  if (active.has('dichords') && ann.dichord) parts.push(ann.dichord)
  if (active.has('species') && ann.species) parts.push(ann.species)
  if (active.has('cadences') && ann.cadence) parts.push(ann.cadence)
  return parts.join('|')
}

export function toAnnotatedAlphaTex(
  arrangement: Arrangement,
  annotations: AnnotationSet,
  activeOverlays: Set<OverlayType>,
): string {
  if (annotations.beats.length === 0 || activeOverlays.size === 0) {
    return toAlphaTex(arrangement)
  }

  const labelMap = new Map<number, string>()
  for (const ann of annotations.beats) {
    const key = Math.round(ann.startBeat * 4)
    const label = buildLabel(ann, activeOverlays)
    if (label) labelMap.set(key, label)
  }

  const { tuning, title, tempo, timeSignature, guitarNotes } = arrangement
  const [beatsPerMeasure] = timeSignature
  const measure16ths = beatsPerMeasure * 4
  const safeTitle = title.replace(/[^\x00-\x7F]/g, '-')

  const lines: string[] = [
    `\\title "${safeTitle}"`,
    `\\tempo ${tempo}`,
    `\\track "Guitar"`,
    `\\tuning ${tuningHeader(tuning)}`,
    '',
  ]

  const beatMap = groupByBeat(guitarNotes)

  const lastNote = guitarNotes.reduce((max, n) =>
    n.startBeat + n.durationBeats > max.startBeat + max.durationBeats ? n : max,
    guitarNotes[0]
  )
  const totalBeats = lastNote ? lastNote.startBeat + lastNote.durationBeats : 0
  const totalMeasures = Math.ceil(totalBeats / beatsPerMeasure)

  for (let m = 0; m < totalMeasures; m++) {
    const tokens = fillMeasureAnnotated(beatMap, m * measure16ths, measure16ths, tuning, labelMap)
    lines.push(tokens.join(' ') + ' |')
  }

  return lines.join('\n')
}
