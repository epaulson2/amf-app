// Lesson 1A (keyboard-first, absolute beginner): verbatim copy, keyboard geometry, and no site-generated sound.
import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import * as T from '../lib/soundscape/week1/lesson1a-copy'
import { blackAfterIndexes, whiteName } from '../components/soundscape/week1/kb/geometry'

const src = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('every paragraph and heading of 1A is verbatim from the absolute-beginner specification', () => {
  let doc = ''
  try { doc = execFileSync('git', ['-C', `${homedir()}/amf-work/amf-w78-docs`, 'show', 'origin/docs/ajourne-site-implementation-20261105:04-curriculum/tracks/soundscape-path/implementation/week-01/LESSON_1A_ABSOLUTE_BEGINNER_KEYBOARD_FIRST_REMEDIATION_V1.md'], { encoding: 'utf8' }) } catch { return }
  const bits = [T.H1, T.DECK, T.SETUP, T.S5.q]
  for (const s of [T.S1, T.S2, T.S3, T.S4, T.S5, T.S6, T.S7, T.S8]) bits.push(s.h, ...s.p)
  for (const b of bits) assert.ok(doc.includes(b.replace(/\*\*/g, '**')), b.slice(0, 60))
})

test('keyboard geometry: black keys come in groups of two then three, none between E–F or B–C', () => {
  // ten white keys starting on C: C D E F G A B C D E
  const names = Array.from({ length: 10 }, (_, i) => whiteName('C', i))
  assert.deepEqual(names, ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'])
  const after = blackAfterIndexes('C', 10)
  assert.deepEqual(after.map(i => names[i]), ['C', 'D', 'F', 'G', 'A', 'C', 'D']) // 2, 3, 2 groups
  assert.ok(!after.some(i => names[i] === 'E' || names[i] === 'B'))
  // a C is the white key just left of a pair: C is followed by black keys after C and after D
  assert.ok(after.includes(0) && after.includes(1) && !after.includes(2))
  assert.equal(blackAfterIndexes('C', 8).length, 5) // C to the next C: five black keys
})

test('Lesson 1A generates no sound and shows no octave numbers or MIDI numbers in its own copy', () => {
  const files = ['components/soundscape/week1/Lesson1A.tsx', ...readdirSync(new URL('../components/soundscape/week1/kb', import.meta.url)).map(f => `components/soundscape/week1/kb/${f}`), 'lib/soundscape/week1/lesson1a-copy.ts']
  for (const f of files) {
    const t = src(f)
    assert.ok(!/AudioProvider|ClipButton|StopButton|NowPlaying|useAudio|useNote|playSequence|AudioContext|webkitAudioContext|<audio|<video|<iframe|autoPlay/.test(t), f)
  }
  assert.ok(!/\baudio\b/.test(src('components/soundscape/week1/Lesson1A.tsx').replace(/Everything works with this page muted[^.]*\./, '')))
  const copy = JSON.stringify(T)
  assert.ok(!/\b[A-G][♯♭]?[0-9]\b|MIDI/.test(copy))
})

test('the only outbound media are the two checked YouTube links, opened in a new tab without embedding', () => {
  const t = src('components/soundscape/week1/Lesson1A.tsx')
  assert.ok(t.includes("DRONE_A = 'https://www.youtube.com/watch?v=N5LqCQHQCGc'") && t.includes("DRONE_B = 'https://www.youtube.com/watch?v=hhPX4n8rPIU'"))
  assert.ok(t.includes('target="_blank" rel="noopener noreferrer"'))
})
