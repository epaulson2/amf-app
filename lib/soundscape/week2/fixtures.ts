// Week 2 audio fixtures: exact pitches and times from the lesson contracts (2A-01..08, 2B-01..06, 2C-A/B/C).
// C4 = 60, B3 = 59, D4 = 62, E4 = 64, F4 = 65, G4 = 67. Lower voice = role 'drone', upper voice = role 'melody',
// so the solo helper isolates either line. A voice that does not change is ONE continuous event (never re-triggered).
import type { NoteEvent } from '../fixtures'

export const M = { B3: 59, C4: 60, D4: 62, E4: 64, F4: 65, G4: 67, Fs4: 66 } as const

type Pair = [number, number] // [lower, upper]

/** Build two voices from successive pairs; equal consecutive pitches merge into a single sustained event. */
export function path(steps: Pair[], stepDur: number, end = steps.length * stepDur): NoteEvent[] {
  const out: NoteEvent[] = []
  for (const [vi, role] of [[0, 'drone'], [1, 'melody']] as const) {
    let startIdx = 0
    for (let i = 1; i <= steps.length; i++) {
      if (i === steps.length || steps[i][vi] !== steps[startIdx][vi]) {
        out.push({ midi: steps[startIdx][vi], start: startIdx * stepDur, dur: (i === steps.length ? end : i * stepDur) - startIdx * stepDur, role })
        startIdx = i
      }
    }
  }
  return out
}

const note = (midi: number, start: number, dur: number, role: 'drone' | 'melody'): NoteEvent => ({ midi, start, dur, role })

// ---- 2A
export const A = {
  C: [note(M.C4, 0, 3, 'drone')],
  E: [note(M.E4, 0, 3, 'melody')],
  together: [note(M.C4, 0, 4, 'drone'), note(M.E4, 0, 4, 'melody')],
  upperEF: path([[M.C4, M.E4], [M.C4, M.F4]], 2.5, 5),
  lowerCB: path([[M.C4, M.E4], [M.B3, M.E4]], 2.5, 5),
  lowerCD: path([[M.C4, M.E4], [M.D4, M.E4]], 2.5, 5),
  EG: [note(M.E4, 0, 3, 'drone'), note(M.G4, 0, 3, 'melody')],
}
// ---- 2B: all five start from C4+E4, change at 2.5 s, end 5.5 s
const T = (to: Pair) => path([[M.C4, M.E4], to], 2.5, 5.5)
export const B = {
  upperRises: T([M.C4, M.F4]),
  lowerFalls: T([M.B3, M.E4]),
  lowerRises: T([M.D4, M.E4]),
  apart: T([M.B3, M.F4]),
  climb: T([M.D4, M.F4]),
  path: path([[M.C4, M.E4], [M.C4, M.F4], [M.B3, M.F4], [M.C4, M.E4]], 2.5, 10),
}
export const FIVE = [
  { id: 'B1', label: 'Only upper rises', events: B.upperRises, from: 'C4+E4', to: 'C4+F4', motion: 'Oblique', interval: 'perfect fourth', semis: 5 },
  { id: 'B2', label: 'Only lower falls', events: B.lowerFalls, from: 'C4+E4', to: 'B3+E4', motion: 'Oblique', interval: 'perfect fourth', semis: 5 },
  { id: 'B3', label: 'Only lower rises', events: B.lowerRises, from: 'C4+E4', to: 'D4+E4', motion: 'Oblique', interval: 'major second', semis: 2 },
  { id: 'B4', label: 'Both move apart', events: B.apart, from: 'C4+E4', to: 'B3+F4', motion: 'Contrary', interval: 'diminished fifth (tritone)', semis: 6 },
  { id: 'B5', label: 'Both rise', events: B.climb, from: 'C4+E4', to: 'D4+F4', motion: 'Similar', interval: 'minor third', semis: 3 },
] as const

// ---- 2C: 36 s, identical upper line; only the lower line differs
const UPPER: NoteEvent[] = [note(M.E4, 4, 6, 'melody'), note(M.F4, 14, 6, 'melody'), note(M.E4, 26, 6, 'melody')]
export const C = {
  held: [note(M.C4, 0, 36, 'drone'), ...UPPER],
  moving: [note(M.C4, 0, 12, 'drone'), note(M.B3, 12, 12, 'drone'), note(M.C4, 24, 12, 'drone'), ...UPPER],
  dialogue: path([[M.C4, M.E4], [M.C4, M.F4], [M.B3, M.F4], [M.C4, M.E4]], 2),
  upper: UPPER,
}

// ---- interval palette audio
export type PairEvents = (lowerMidi: number, upperMidi: number, mode: 'together' | 'up' | 'down') => NoteEvent[]
export const pairEvents: PairEvents = (lo, hi, mode) => {
  if (mode === 'together') return [note(lo, 0, 2, 'drone'), note(hi, 0, 2, 'melody')]
  if (mode === 'up') return [note(lo, 0, 0.9, 'drone'), note(hi, 1.05, 0.9, 'melody')]
  return [note(hi, 0, 0.9, 'melody'), note(lo, 1.05, 0.9, 'drone')]
}
export const compareEvents = (a: [number, number], b: [number, number]): NoteEvent[] => [
  ...pairEvents(a[0], a[1], 'together'),
  ...pairEvents(b[0], b[1], 'together').map(e => ({ ...e, start: e.start + 2.6 })),
]
