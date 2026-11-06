// Literal Week 2 learner copy. Sources (epaulson2/AMF, docs/ajourne-site-implementation-20261105, implementation/week-02/):
// LESSON_2{A,B,C}_ZERO_DECISION.md (original flow, extracted by script) and
// WEEK_02_INSTRUCTIONAL_DEPTH_AND_IMPLEMENTATION_ADDENDUM_V1.md (core teaching, extracted by script into teaching.json).
import l2a from './lesson-2a.json'
import l2b from './lesson-2b.json'
import l2c from './lesson-2c.json'
import teaching from './teaching.json'
import { copyOf } from '../week1/content'

type Field = [string, string]
type Lesson = { sections: Record<string, Field[]>; drawers: { id: string; head: string; fields: Field[] }[] }
const L = { '2A': l2a as unknown as Lesson, '2B': l2b as unknown as Lesson, '2C': l2c as unknown as Lesson }
export type Id = keyof typeof L

export function field(l: Id, sec: string, label: string, nth = 0): string {
  const hit = L[l].sections[sec].filter(([k]) => k === label)[nth]
  if (!hit) throw new Error(`missing ${l} ${sec} ${label}[${nth}]`)
  return hit[1]
}
export const copy = (l: Id, s: string, label: string, nth = 0) => copyOf(field(l, s, label, nth))
export const all = (l: Id, s: string, label: string) => L[l].sections[s].filter(([k]) => k === label).map(([, v]) => copyOf(v))
export const ticks = (v: string) => [...v.matchAll(/`([^`]+)`/g)].map(m => m[1])
export const quoted = (v: string) => [...v.matchAll(/"([^"]+)"/g)].map(m => m[1])
export const drawers = (l: Id) => L[l].drawers

export type Check = { q: string; correct: string }
export type Sec = { h2: string; paras: string[] }
export const W2 = teaching as unknown as {
  hub: { title: string; deck: string; welcome: string[]; map: string; mini: string; lessons: { id: string; title: string; text: string }[]; can: string; how: string }
  a_hear: Sec & { guided: string; checks: Check[] }
  a_interval: Sec & { worked: string[]; steps: string[]; checks: Check[] }
  a_palette: Sec & { cue: string }
  a_oblique: Sec & { checks: Check[] }
  a_bass: Sec & { worked: string; checks: Check[] }
  a_choice: Sec & { recap: string }
  b_what: Sec
  b_four: Sec & { table: string[]; note: string; understand: string; checks: Check[] }
  b_tritone: Sec & { checks: Check[] }
  b_which: Sec & { checks: Check[] }
  b_compose: Sec & { recap: string }
  c_learn: Sec
  c_line: Sec & { checks: Check[] }
  c_support: Sec & { worked: string; checks: Check[] }
  c_describe: Sec & { checks: Check[] }
  c_miniature: Sec & { steps: string[]; recap: string }
}
