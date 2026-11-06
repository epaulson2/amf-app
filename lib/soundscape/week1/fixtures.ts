// Week 1 audio fixtures. Exact pitches and times from the lesson contracts (A-01..A-06, B-01..B-07, C-01..C-05).
// C3 = MIDI 48, C4 = 60, A4 = 440 Hz, 12-tone equal temperament. Single plain sine voice, no detune.
import { midiToName } from '../midi'
import type { NoteEvent, Patch } from '../fixtures'

const n = (name: string): number => {
  const m = name.match(/^([A-G])(♯|#)?(-?\d)$/)
  if (!m) throw new Error(name)
  return ({ C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 } as Record<string, number>)[m[1]] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12
}
export const N = n

// Conservative envelope: ~80 ms in, ~250 ms out (contract: 50-200 ms fades, no clicks).
export const LESSON_PATCH: Patch = { id: 'plain', harmonics: [1], lowpassHz: null, attack: 0.08, release: 0.25 }

const drone = (dur: number): NoteEvent => ({ midi: n('C3'), start: 0, dur, role: 'drone' })
const up = (name: string, start: number, dur: number): NoteEvent => ({ midi: n(name), start, dur, role: 'melody' })

// ---- Lesson 1A
export const A01 = [drone(15)]
export const visitor = (midi: number): NoteEvent[] => [drone(6), { midi, start: 1, dur: 3.5, role: 'melody' }]
export const A02 = { E: visitor(n('E4')), G: visitor(n('G4')), D: visitor(n('D4')) }
export const A03_NOTES = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'].map(n)
export const A05_LISTEN: NoteEvent[] = [drone(8), up('E4', 1, 3)] // E over C3; the upper note stops, the drone continues

// ---- Lesson 1B: seven rising notes, 700 ms apart, ~550 ms gates, over a C3 drone
const SCALE = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
const scaleEvents = SCALE.map((x, i) => up(x, i * 0.7, 0.55))
const B_DRONE = 4.2 + 0.55 + 2.5 // after B4 ends: 2.5 s of listener space, then release
export const B01: NoteEvent[] = [drone(B_DRONE), ...scaleEvents]
export const B02: NoteEvent[] = [drone(B_DRONE), ...scaleEvents, up('C5', 4.9, 0.9)]
export const B03 = [up('C4', 0, 0.65), up('C♯4', 0.8, 0.65)]
export const B04 = [up('C4', 0, 0.65), up('D4', 0.8, 0.65)]
export const B04_HOPS = [up('C4', 0, 0.55), up('C♯4', 0.7, 0.55), up('D4', 1.4, 0.65)]
export const B05 = [up('E4', 0, 0.65), up('F4', 0.8, 0.65)]
export const B06 = [up('B4', 0, 0.65), up('C5', 0.8, 0.65)]
export const B07 = { arrive: B02, hover: B01 }

// ---- Lesson 1C
export const C01: NoteEvent[] = [drone(12), up('E4', 2, 2), up('G4', 5, 2), up('D4', 9, 2)]
export const C02: NoteEvent[] = [drone(12), up('E4', 2, 4)]
export const C03: NoteEvent[] = [drone(12), up('E4', 7, 4)]
const C04_COMMON = [up('E4', 8, 4), up('G4', 15, 4), up('D4', 23, 4), up('B4', 29, 3)]
export const C04: NoteEvent[] = [drone(36), ...C04_COMMON, up('C5', 33, 2.8)]
export const C05: NoteEvent[] = [drone(36), ...C04_COMMON]
export const solo = (events: NoteEvent[], which: 'foundation' | 'upper') => events.filter(e => (which === 'foundation') === (e.role === 'drone'))

export const text = (events: NoteEvent[]) => events.map(e => `${midiToName(e.midi)} ${e.start}–${+(e.start + e.dur).toFixed(2)} s`).join(', ')
