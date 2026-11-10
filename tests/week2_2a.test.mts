// Lesson 2A (production) targeted checks: source truth for figures and worksheet, no audio, six doors, order rules.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { LESSON_2A_PAIRS, M, noteName, letterCount, semitones, intervalName, changeFacts } from '../lib/soundscape/week2/lesson2a-facts'
import { LESSON_2A_STEPS } from '../lib/soundscape/course-nav'

const lesson = readFileSync('components/soundscape/week2/m04/Lesson2A.tsx', 'utf8')
const sheet = readFileSync('components/soundscape/week2/m04/PracticeSheet.tsx', 'utf8')

test('2A interval facts match the V2 fixed-facts table', () => {
  const want = [['C4', 'E4', 3, 4, 'major third'], ['E4', 'G4', 3, 3, 'minor third'], ['C4', 'F4', 4, 5, 'perfect fourth'], ['B3', 'E4', 4, 5, 'perfect fourth'], ['D4', 'E4', 2, 2, 'major second']]
  assert.deepEqual(LESSON_2A_PAIRS.map(([a, b]) => [noteName(a), noteName(b), letterCount(a, b), semitones(a, b), intervalName(a, b)]), want)
  assert.equal(M.B3, 59)
})
test('the three single changes: one voice holds, the other moves', () => {
  assert.deepEqual(changeFacts.map(c => [c.moved, c.dir, c.by, c.name]), [['upper', 'up', 1, 'perfect fourth'], ['lower', 'down', 1, 'perfect fourth'], ['lower', 'up', 2, 'major second']])
})
test('2A has ten steps and step 9 links the real practice sheet', () => {
  assert.equal(LESSON_2A_STEPS.length, 10)
  assert.match(lesson, /practice-sheet/)
  assert.doesNotMatch(lesson, /not yet built/i)
  assert.match(sheet, /changeFacts/)
})
test('2A has no audio: no player, clip or provider anywhere in the lesson, figures or sheet', () => {
  const diagrams = readFileSync('components/soundscape/week2/m04/Diagrams.tsx', 'utf8')
  for (const src of [lesson, sheet, diagrams]) assert.doesNotMatch(src, /AudioProvider|ClipButton|StopButton|useAudio|<audio|<video|new Audio|AudioContext|aria-pressed|useState|onClick/)
})
test('2A carries all six optional doors and their cultural guards', () => {
  for (const t of ['History Postcard', 'Hear It in Real Music', 'Behind the Sound', 'Ambient Composer', 'Musical Worlds', 'Paint What You Hear']) assert.ok(lesson.includes(t), t)
  assert.match(lesson, /not the origin of all polyphony/)
  assert.match(lesson, /not an imitation of Georgian singing/)
  assert.match(lesson, /no single recording shows every regional style/)
  assert.match(lesson, /Links only\. This course stores no audio/)
})
test('2A ordering: perfect fourth and major second are not named before steps 5-7', () => {
  const body = lesson.split("{ short: LESSON_2A_STEPS[")
  // body[0] is the preamble; body[k] is step k (1-based)
  for (let k = 2; k <= 4; k++) assert.doesNotMatch(body[k], /major third|minor third|perfect fourth|major second/i, `step ${k}`)
  assert.doesNotMatch(body[5], /major second|perfect fourth of/i)
})
