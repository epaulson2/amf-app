import type { GuitarNote, Tuning, Arrangement } from './types'
import { pitchName, toAlphaTabString } from './fretboard'

// [beats, durationNumber, isDotted]
const DURATION_MAP: Array<[number, string, boolean]> = [
  [4,    '1',  false],
  [3,    '2',  true],
  [2,    '2',  false],
  [1.5,  '4',  true],
  [1,    '4',  false],
  [0.75, '8',  true],
  [0.5,  '8',  false],
  [0.25, '16', false],
]

function durationParts(beats: number): [string, boolean] {
  const best = DURATION_MAP.reduce((b, item) =>
    Math.abs(item[0] - beats) < Math.abs(b[0] - beats) ? item : b
  )
  return [best[1], best[2]]
}

// Group notes by beat position (quantized to 16th notes)
function groupByBeat(notes: GuitarNote[]): Map<number, GuitarNote[]> {
  const map = new Map<number, GuitarNote[]>()
  for (const note of notes) {
    const key = Math.round(note.startBeat * 4)
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(note)
  }
  return map
}

// alphaTab v1.8 format: notes-first, then .duration, then {d} for dotted
function beatTex(notes: GuitarNote[], tuning: Tuning): string {
  const maxDuration = Math.max(...notes.map(n => n.durationBeats))
  const [dur, dotted] = durationParts(maxDuration)
  const dot = dotted ? ' {d}' : ''

  if (notes.length === 1) {
    const n = notes[0]
    const s = toAlphaTabString(n.string, tuning)
    return `${n.fret}.${s} .${dur}${dot}`
  }

  const parts = notes.map(n => `${n.fret}.${toAlphaTabString(n.string, tuning)}`)
  return `(${parts.join(' ')}) .${dur}${dot}`
}

function restTex(beats: number): string {
  const [dur, dotted] = durationParts(beats)
  return `r .${dur}${dotted ? ' {d}' : ''}`
}

// alphaTab \tuning expects (string1_highest ... string6_lowest) in parentheses
function tuningHeader(tuning: Tuning): string {
  return '(' + [...tuning.strings].reverse().map(midi => pitchName(midi).toLowerCase()).join(' ') + ')'
}

function fillMeasure(
  beatMap: Map<number, GuitarNote[]>,
  measureStart16th: number,
  measureLength16th: number,
  tuning: Tuning,
): string[] {
  const tokens: string[] = []
  let cursor = measureStart16th
  const measureEnd = measureStart16th + measureLength16th

  const keys = [...beatMap.keys()]
    .filter(k => k >= measureStart16th && k < measureEnd)
    .sort((a, b) => a - b)

  for (const key of keys) {
    if (key < cursor) continue  // skip notes overlapping previous note's duration

    if (key > cursor) {
      tokens.push(restTex((key - cursor) / 4))
    }

    const notes = beatMap.get(key)!
    tokens.push(beatTex(notes, tuning))

    const advance = Math.max(...notes.map(n => n.durationBeats))
    cursor = key + Math.round(advance * 4)
  }

  if (cursor < measureEnd) {
    tokens.push(restTex((measureEnd - cursor) / 4))
  }

  return tokens
}

export function toAlphaTex(arrangement: Arrangement): string {
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
    const tokens = fillMeasure(beatMap, m * measure16ths, measure16ths, tuning)
    lines.push(tokens.join(' ') + ' |')
  }

  return lines.join('\n')
}
