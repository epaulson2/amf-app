// Targeted P00 checks: node --experimental-strip-types --test tests/soundscape.test.mts
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { midiToName, midiToHz, isBlackKey } from '../lib/soundscape/midi'
import { W7A, PATCHES, ENTRY_DEMO, noteList, PROVENANCE } from '../lib/soundscape/fixtures'
import { buildSchedule, MASTER_GAIN } from '../lib/soundscape/audio'
import { WEEKS, LESSON_SLUGS, WEEK_SLUGS } from '../lib/soundscape/course'

test('C4 = 60 and octave names come from MIDI', () => {
  assert.deepEqual([48, 60, 65, 66, 72, 77].map(midiToName), ['C3', 'C4', 'F4', 'F♯4', 'C5', 'F5'])
  assert.ok(Math.abs(midiToHz(69) - 440) < 1e-9)
  assert.ok(Math.abs(midiToHz(60) - 261.6256) < 1e-3)
  assert.deepEqual([60, 61, 62, 63, 64, 65, 66].map(isBlackKey), [false, true, false, true, false, false, true])
})

test('imported fixture is byte-identical to the asset commit and 7A matches the approved facts', () => {
  const buf = readFileSync(new URL('../lib/soundscape/source/w78_data_v1.json', import.meta.url))
  assert.equal(createHash('sha256').update(buf).digest('hex'), 'bc43b91c3e1e81bb7681041768988acf295b3436b5a9fbc079953e0df5b8dd6a')
  assert.equal(PROVENANCE.commit, 'bcc467c')
  const mel = (v: typeof W7A.A) => v.filter(e => e.role !== 'drone')
  assert.deepEqual(mel(W7A.A).map(e => e.midi), [60, 62, 64, 65, 67, 65, 64, 60])
  assert.deepEqual(mel(W7A.B).map(e => e.midi), [60, 62, 64, 66, 67, 66, 64, 60])
  const diff = mel(W7A.A).filter((e, i) => e.midi !== mel(W7A.B)[i].midi)
  assert.deepEqual(diff.map(e => [e.midi, e.start]), [[65, 4.5], [65, 8.5]])
  assert.deepEqual([W7A.drone.midi, W7A.drone.start, W7A.drone.dur], [48, 0, 16])
  assert.equal(W7A.facts['C4_to_F4'], 5)
  assert.equal(W7A.facts['C4_to_F#4'], 6)
  assert.equal(W7A.facts['F4_to_F#4'], 1)
})

test('patches: rich is harmonics 1-6 of the same fundamental, no detune', () => {
  assert.deepEqual(PATCHES.plain.harmonics, [1])
  assert.deepEqual(PATCHES.rich.harmonics, [1, 0.5, 0.33, 0.25, 0.2, 0.17])
  assert.equal(PATCHES.rich.lowpassHz, 2500)
  assert.ok(!/detune|sawtooth/i.test(readFileSync(new URL('../lib/soundscape/audio.ts', import.meta.url), 'utf8').replace(/no detune[^\n]*/i, '')))
})

test('schedule: frequencies, timing, tails and safe level', () => {
  const s = buildSchedule(W7A.A, PATCHES.plain)
  const f4 = s.filter(n => n.midi === 65)
  assert.equal(f4.length, 2)
  assert.ok(Math.abs(f4[0].hz - 349.2282) < 1e-3)
  assert.deepEqual(f4.map(n => n.start), [4.5, 8.5])
  assert.equal(f4[0].releaseStart, 7)
  assert.ok(s.every(n => n.end > n.releaseStart && n.attackEnd >= n.start && n.peak > 0 && n.peak <= 1))
  assert.ok(MASTER_GAIN <= 0.25)
  const b = buildSchedule(W7A.B, PATCHES.plain).filter(n => n.midi === 66)
  assert.ok(Math.abs(b[0].hz - 369.9944) < 1e-3)
})

test('entry demo: C3 held, E4 or G4 enters', () => {
  assert.deepEqual(ENTRY_DEMO.visitorE.map(e => e.midi), [48, 64])
  assert.deepEqual(ENTRY_DEMO.visitorG.map(e => e.midi), [48, 67])
  assert.ok(noteList(ENTRY_DEMO.home)[0].startsWith('C3 (MIDI 48)'))
})

test('routing: 8 weeks, 24 lessons, Weeks 5-6 described, no invented links', () => {
  assert.equal(WEEK_SLUGS.length, 8)
  assert.equal(LESSON_SLUGS.length, 24)
  assert.ok(LESSON_SLUGS.some(l => l.week === 'week-7' && l.lesson === 'lesson-7a'))
  assert.equal(WEEKS[4].title, 'Traveling Through Harmony')
  assert.equal(WEEKS[5].title, 'The Art of Arrangement')
  for (const f of ['journey', 'how-it-works', 'resources'].map(p => `../app/curriculum/soundscape-path/${p}/page.tsx`)) {
    const t = readFileSync(new URL(f, import.meta.url), 'utf8')
    assert.ok(!/href=\{?[`'"][^`'"]*(week-[3-8]|lesson-[3-8])/.test(t), `${f} must not link to unbuilt weeks or lessons`)
  }
})
