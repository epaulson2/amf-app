// Week 2 lessons 2B and 2C (production, V2 steps): facts from the V2 tables, fixtures agree, no audio, doors, answer-free sheets.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { FIVE_CASES, M, noteName } from '../lib/soundscape/week2/lesson2a-facts'
import { LESSON_2B_STEPS, LESSON_2C_STEPS } from '../lib/soundscape/course-nav'
import { FIVE, C } from '../lib/soundscape/week2/fixtures'

const rd = (f: string) => readFileSync(f, 'utf8')
const L2B = rd('components/soundscape/week2/m04/Lesson2B.tsx')
const L2C = rd('components/soundscape/week2/m04/Lesson2C.tsx')
const FIG = ['figures2b', 'figures2c', 'Diagrams', 'PracticeSheets', 'parts'].map(n => rd(`components/soundscape/week2/m04/${n}.tsx`)).join('\n')

test('2B five locked cases match the V2 table and the audio-fixture data (data only, no player)', () => {
  assert.deepEqual(FIVE_CASES.map(c => [c.id, noteName(c.lo2), noteName(c.up2), c.letters, c.semis, c.motion, c.name]), [
    ['B1', 'C4', 'F4', 4, 5, 'oblique', 'perfect fourth'], ['B2', 'B3', 'E4', 4, 5, 'oblique', 'perfect fourth'], ['B3', 'D4', 'E4', 2, 2, 'oblique', 'major second'],
    ['B4', 'B3', 'F4', 5, 6, 'contrary', 'diminished fifth'], ['B5', 'D4', 'F4', 3, 3, 'similar', 'minor third']])
  assert.deepEqual(FIVE.map(f => f.semis), FIVE_CASES.map(c => c.semis))
  assert.equal(M.Fs4 - M.C4, 6) // C4 to F-sharp4 is also six semitones: an augmented fourth (four letters), never swapped in for B3-F4
})
test('2C timelines: identical upper line, lower changes at 12 and 24 s inside upper rests, intervals 4,5,4 and 4,6,4', () => {
  const lower = (ev: typeof C.held) => ev.filter(e => e.role === 'drone')
  const up = C.upper
  assert.deepEqual(up.map(e => [e.midi, e.start, e.start + e.dur]), [[64, 4, 10], [65, 14, 20], [64, 26, 32]])
  const at = (ev: typeof C.held, t: number) => ev.find(e => e.start <= t && t < e.start + e.dur)!.midi
  assert.deepEqual(up.map(u => u.midi - at(lower(C.held), u.start + 3)), [4, 5, 4])
  assert.deepEqual(up.map(u => u.midi - at(lower(C.moving), u.start + 3)), [4, 6, 4])
  for (const t of [12, 24]) assert.ok(!up.some(u => u.start <= t && t < u.start + u.dur), `lower changes at ${t}s while upper rests`)
})
test('2B has 11 steps and 2C has 10, each with the V2 wording that carries the founder-approved caveats', () => {
  assert.equal(LESSON_2B_STEPS.length, 11); assert.equal(LESSON_2C_STEPS.length, 10)
  assert.match(L2B, /course convention, not the only correct definition/)
  assert.match(L2B, /augmented fourth/)
  assert.match(L2B, /one of this lesson/)
  assert.match(L2C, /Do not describe the change to B3 as a change in the upper melody/)
})
test('2B/2C and their figures have no audio code', () => {
  for (const src of [L2B, L2C, FIG]) assert.doesNotMatch(src, /AudioProvider|ClipButton|StopButton|useAudio|<audio|<video|new Audio|AudioContext|aria-pressed|useState|onClick/)
})
test('six optional doors in each lesson, cultural guards kept', () => {
  for (const src of [L2B, L2C]) for (const t of ['History Postcard', 'Behind the Sound', 'Ambient Composer', 'Hear It in Real Music', 'Musical Worlds', 'Paint What You Hear']) assert.ok(src.includes(t), t)
  assert.equal((L2B.match(/doorBox\(/g) ?? []).length, 6); assert.equal((L2C.match(/doorBox\(/g) ?? []).length, 6)
})
test('2B steps 2-3 give notes and directions only (no motion names or sizes before step 4/5)', () => {
  const steps = L2B.split('{ short: LESSON_2B_STEPS[')
  for (const k of [2, 3]) assert.doesNotMatch(steps[k], /contrary|similar|diminished|tritone|minor third|six semitones/i, `2B step ${k}`)
})
test('worksheets are answer-free', () => {
  const sheets = rd('components/soundscape/week2/m04/PracticeSheets.tsx')
  assert.doesNotMatch(sheets, /perfect fourth|major second|diminished|minor third|major third/i)
})
