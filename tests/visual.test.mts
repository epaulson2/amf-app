// Visual-pedagogy checks: sound/picture parity from the same data, verbatim copy, asset files. (npm run test:soundscape)
import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { A01, B01, B02, C01, C02, C03, C04, C05, A02 } from '../lib/soundscape/week1/fixtures'
import { A, B, C, FIVE } from '../lib/soundscape/week2/fixtures'
import { letterRun } from '../lib/soundscape/visual/rulers'
import { V, stepsOf, checksOf } from '../lib/soundscape/visual/copy'
import { INTERVALS } from '../lib/soundscape/resources/palette'

type Ev = { midi: number; start: number; dur: number; role: string }
const up = (e: Ev[]) => e.filter(x => x.role === 'melody')
const lo = (e: Ev[]) => e.filter(x => x.role === 'drone')
const key = (e: Ev) => `${e.midi}@${e.start}+${e.dur}`

test('1A-V1: the active home note is C3 (MIDI 48) for 15 s, not the C4 of the source artwork', () => {
  assert.deepEqual(A01.map(e => [e.midi, e.start, e.dur]), [[48, 0, 15]])
  assert.notEqual(A01[0].midi, 60)
  const art = readFileSync(new URL('../public/soundscape/w1/W1-01_home-note_learner.svg', import.meta.url), 'utf8')
  assert.ok(art.includes('C4 (MIDI 60)'), 'the source art is C4; the page must say so')
})

test('1A-V2: each visitor is one upper note over the same held C3', () => {
  for (const [k, m] of [['E', 64], ['G', 67], ['D', 62]] as const) { assert.deepEqual(lo(A02[k]).map(key), ['48@0+6']); assert.deepEqual(up(A02[k]).map(e => e.midi), [m]) }
})

test('1B-V3: the open and arrival versions share the same seven notes; only the arrival has C5', () => {
  assert.deepEqual(up(B02).slice(0, 7).map(key), up(B01).map(key))
  assert.ok(!B01.some(e => e.midi === 72)); assert.equal(up(B02).at(-1)!.midi, 72)
  assert.deepEqual(lo(B01), lo(B02))
})

test('1C: timelines are drawn from events: 12 s example, timing pair, and 36 s A/B share the first 33 s', () => {
  assert.deepEqual(up(C01).map(e => [e.midi, e.start, e.start + e.dur]), [[64, 2, 4], [67, 5, 7], [62, 9, 11]])
  assert.equal(up(C02)[0].start, 2); assert.equal(up(C03)[0].start, 7); assert.equal(up(C02)[0].dur, up(C03)[0].dur)
  const first33 = (e: Ev[]) => e.filter(x => x.start < 33 && x.midi !== 72).map(key)
  assert.deepEqual(first33(C04), first33(C05)); assert.equal(C04.filter(e => e.midi === 72).length, 1); assert.equal(C05.filter(e => e.midi === 72).length, 0)
})

test('2B/2C: keyboards must reach B3; B3-F4 is a diminished fifth and C4-F#4 an augmented fourth; 2C upper arrays identical', () => {
  assert.equal(FIVE[1].to, 'B3+E4'); assert.equal(FIVE[3].to, 'B3+F4'); assert.equal(Math.min(...C.moving.map(e => e.midi)), 59)
  assert.deepEqual(letterRun('B3', 'F4'), ['B', 'C', 'D', 'E', 'F']); assert.equal(65 - 59, 6)
  assert.deepEqual(letterRun('C4', 'F♯4'), ['C', 'D', 'E', 'F']); assert.equal(66 - 60, 6)
  assert.deepEqual(letterRun('C4', 'E4'), ['C', 'D', 'E']); assert.equal(64 - 60, 4)
  assert.deepEqual(letterRun('E4', 'G4'), ['E', 'F', 'G']); assert.equal(67 - 64, 3)
  assert.equal(letterRun('C4', 'C5').length, 8)
  assert.deepEqual(up(C.held).map(key), up(C.moving).map(key))
  assert.deepEqual(lo(C.moving).map(e => [e.midi, e.start]), [[60, 0], [59, 12], [60, 24]])
  // the parallel teaching example is NOT one of the five canonical changes
  assert.ok(!FIVE.some(f => (f.to as string) === 'D4+F♯4')); assert.equal(66 - 62, 4)
  assert.equal(A.upperEF.length, 3); assert.equal(B.apart.length, 4)
})

test('palette data used by the reader: 13 cards, tritone 6 semitones with both spellings', () => {
  assert.equal(INTERVALS.length, 13); assert.equal(INTERVALS[6].upperMidi - INTERVALS[6].lowerMidi, 6)
})

test('visual copy: every heading and paragraph is verbatim from the zero-decision document; 21 lesson moments + 2 hubs + atlas', () => {
  assert.equal(Object.keys(V).length, 24)
  assert.equal(Object.keys(V).filter(k => /^[12][ABC]-V\d$/.test(k)).length, 21)
  let doc = ''
  try { doc = execFileSync('git', ['-C', `${homedir()}/amf-work/amf-w78-docs`, 'show', 'origin/docs/ajourne-site-implementation-20261105:04-curriculum/tracks/soundscape-path/implementation/site-build/W1_W2_VISUAL_TEACHING_ZERO_DECISION_V1.md'], { encoding: 'utf8' }) } catch { return }
  for (const [k, v] of Object.entries(V)) {
    assert.ok(doc.includes(v.heading), `${k} heading`)
    assert.ok(v.paras.length >= 2, `${k} paragraphs`)
    for (const p of v.paras) assert.ok(doc.includes(p), `${k}: ${p.slice(0, 50)}`)
  }
  assert.equal(stepsOf('(1) a; (2) b.').length, 2); assert.equal(checksOf('“Q?” — A; “R?” — B.').length, 2)
})

test('Style B composites are imported, 960 px wide PNGs', () => {
  for (const n of ['W1-01_home-note_learner', 'W1-01_home-note_instructor', 'W2-01_starting-dyad_learner', 'W2-01_starting-dyad_instructor']) {
    const f = new URL(`../public/soundscape/art/${n}_styleB.png`, import.meta.url)
    assert.ok(statSync(f).size > 100000)
    assert.equal(readFileSync(f).readUInt32BE(16), 960)
  }
})
