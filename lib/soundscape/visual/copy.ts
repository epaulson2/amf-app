// Literal learner-facing graphic-teaching copy. Source (epaulson2/AMF, docs/ajourne-site-implementation-20261105):
// site-build/W1_W2_VISUAL_TEACHING_ZERO_DECISION_V1.md, extracted by script into visual-copy.json.
import data from './visual-copy.json'

export type VKey = keyof typeof data
type Raw = { title: string; heading: string; paras: string[]; steps?: string; check?: string; studio?: string; guide?: string; bridge?: string; placement?: string }
export const V = data as unknown as Record<string, Raw>

/** "(1) a; (2) b" -> ["a", "b"] */
export function stepsOf(raw?: string): string[] {
  if (!raw) return []
  return raw.split(/\(\d\)\s*/).map(s => s.trim().replace(/[;.]+$/, '')).filter(Boolean)
}
/** “Question” — answer; “Question” — answer. */
export function checksOf(raw?: string): { q: string; correct: string }[] {
  if (!raw) return []
  return [...raw.matchAll(/“([^”]+)”\s*—\s*([^;]+?)(?=;\s*“|\.\s*Feedback|\.?$)/g)].map(m => ({ q: m[1], correct: m[2].trim().replace(/\.$/, '') + '.' }))
}
export function studioOf(raw?: string): string {
  if (!raw) return ''
  return raw.match(/“([^”]+)”/)?.[1] ?? ''
}
