// Core teaching copy added by the Week 1 remediation. Source (literal, extracted by script):
// epaulson2/AMF docs/ajourne-site-implementation-20261105,
// 04-curriculum/tracks/soundscape-path/implementation/week-01/WEEK_01_TEACHING_DEPTH_REMEDIATION_V1.md
import data from './teaching.json'

export type Check = { q: string; correct: string }
export type Section = { h2: string; paras: string[] }

export const T = data as unknown as {
  hub: { paras: string[]; journey: { id: string; title: string; text: string }[]; can: string; how: string }
  a_pre: Section & { mini: string }
  a_tonal: Section & { compare: string; check: { q: string; choices: string[]; correct: string; incorrect: string } }
  a_map: Section & { walk: string[]; checks: { q: string; answer: string }[] }
  a_rel: Section & { bridge: string; recap: string }
  b_intro: Section
  b_semi: Section & { examples: [string, string][]; checks: Check[] }
  b_scale: Section & { table: string[]; checks: Check[] }
  b_end: Section & { recap: string }
  c_intro: Section
  c_nvhc: Section & { table: [string, string][]; checks: Check[] }
  c_time: Section & { checks: Check[] }
  c_compose: Section & { steps: string[] }
  c_recap: { paras: string[] }
}
