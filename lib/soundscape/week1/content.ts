// Literal learner copy for Week 1. Source: epaulson2/AMF, branch docs/ajourne-site-implementation-20261105,
// 04-curriculum/tracks/soundscape-path/implementation/week-01/LESSON_{1A,1B,1C}_ZERO_DECISION.md.
// The JSON files hold those documents' field values verbatim (extracted by script); pages read from them
// so no learner copy is retyped by hand.
import l1a from './lesson-1a.json'
import l1b from './lesson-1b.json'
import l1c from './lesson-1c.json'

type Field = [string, string]
type Lesson = { sections: Record<string, Field[]>; drawers: { id: string; head: string; fields: Field[] }[] }
const LESSONS: Record<'1A' | '1B' | '1C', Lesson> = { '1A': l1a as unknown as Lesson, '1B': l1b as unknown as Lesson, '1C': l1c as unknown as Lesson }

/** The quoted or backticked copy at the start of a field value; trailing implementation notes are dropped. */
export function copyOf(v: string): string {
  const t = v.trim()
  if (t.startsWith('"')) return t.slice(1, t.indexOf('"', 1))
  const b = t.match(/^`([^`]*)`/)
  return b ? b[1] : t
}

/** "1. `Title` — "text"" lines. */
export function stepsOf(v: string): { title: string; text: string }[] {
  return v.split('\n').flatMap(l => {
    const m = l.match(/^\d+\.\s*`([^`]+)`\s*—\s*"([^"]+)"/)
    return m ? [{ title: m[1], text: m[2] }] : []
  })
}

export function field(lesson: keyof typeof LESSONS, sec: string, label: string, nth = 0): string {
  const hits = LESSONS[lesson].sections[sec].filter(([k]) => k === label)
  const hit = hits[nth]
  if (!hit) throw new Error(`missing ${lesson} §${sec} ${label}[${nth}]`)
  return hit[1]
}
export const copy = (l: keyof typeof LESSONS, s: string, label: string, nth = 0) => copyOf(field(l, s, label, nth))

/** Every value of a repeated label, in order. */
export function all(l: keyof typeof LESSONS, s: string, label: string): string[] {
  return LESSONS[l].sections[s].filter(([k]) => k === label).map(([, v]) => copyOf(v))
}

export const drawers = (l: keyof typeof LESSONS) => LESSONS[l].drawers
export const allSectionText = (l: keyof typeof LESSONS) => LESSONS[l]
