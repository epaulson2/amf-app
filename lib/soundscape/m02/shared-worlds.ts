// G03 source data, derived at call time from the Lesson 2C audio fixtures (lib/soundscape/week2/fixtures.ts, object `C`).
// Nothing here is typed in by hand: the note sets are whatever the fixtures sound at a given second.
import { C as L2C } from '../week2/fixtures'
import type { NoteEvent } from '../fixtures'
import { nameOf } from './keyboard-geometry'

export const sounding = (events: NoteEvent[], t: number) => events.filter(e => e.start <= t && t < e.start + e.dur)

export type World = { held: number[]; moving: number[]; shared: number[]; onlyHeld: number[]; onlyMoving: number[] }

/** The two Lesson 2C situations (same upper line; lower line held on C vs. moving C→B→C) at second `t`. */
export function worldsAt(t: number): World {
  const held = sounding(L2C.held, t).map(e => e.midi).sort((a, b) => a - b)
  const moving = sounding(L2C.moving, t).map(e => e.midi).sort((a, b) => a - b)
  return {
    held, moving,
    shared: held.filter(m => moving.includes(m)),
    onlyHeld: held.filter(m => !moving.includes(m)),
    onlyMoving: moving.filter(m => !held.includes(m)),
  }
}
/** Seconds inside the first E, the F, and the last E of the shared upper line. */
export const MOMENT = { firstE: 7, F: 17, lastE: 29 } as const
export const names = (ms: number[]) => ms.map(nameOf)
/** Semitone distance from a lower note to the melody note, from the same fixtures. */
export const semis = (lower: number, upper: number) => upper - lower
