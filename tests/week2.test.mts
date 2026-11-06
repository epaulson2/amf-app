// Week 2 targeted checks (run with: npm run test:soundscape)
import test from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { homedir } from 'node:os'
import { A, B, C, FIVE, M, path } from '../lib/soundscape/week2/fixtures'
import { INTERVALS } from '../lib/soundscape/resources/palette'
import { W2, drawers } from '../lib/soundscape/week2/content'
import { copyOf } from '../lib/soundscape/week1/content'
import teaching from '../lib/soundscape/week2/teaching.json'
import atlas from '../lib/soundscape/resources/atlas.json'
import { midiToName } from '../lib/soundscape/midi'

type Ev = { midi: number; start: number; dur: number; role: string }
const upper = (e: Ev[]) => e.filter(x => x.role === 'melody')
const lower = (e: Ev[]) => e.filter(x => x.role === 'drone')
const ends = (e: { start: number; dur: number }) => +(e.start + e.dur).toFixed(2)

test('pitches: B3=59, C4=60, D4=62, E4=64, F4=65, G4=67 and names', () => {
  assert.deepEqual([M.B3, M.C4, M.D4, M.E4, M.F4, M.G4], [59, 60, 62, 64, 65, 67])
  assert.equal(midiToName(59), 'B3') // downward B, not B4
})

test('2A: oblique examples hold one voice continuously and move the other at 2.5 s', () => {
  assert.deepEqual(lower(A.upperEF).map(e => [e.midi, e.start, ends(e)]), [[60, 0, 5]])
  assert.deepEqual(upper(A.upperEF).map(e => [e.midi, e.start, ends(e)]), [[64, 0, 2.5], [65, 2.5, 5]])
  assert.deepEqual(upper(A.lowerCB).map(e => [e.midi, e.start, ends(e)]), [[64, 0, 5]])
  assert.deepEqual(lower(A.lowerCB).map(e => [e.midi, e.start, ends(e)]), [[60, 0, 2.5], [59, 2.5, 5]])
  assert.deepEqual(lower(A.lowerCD).map(e => e.midi), [60, 62])
  assert.deepEqual([A.EG[0].midi, A.EG[1].midi], [64, 67])
})

test('2B: five transformations all start from C4+E4 and give the specified intervals', () => {
  const expect = [[65 - 60, 65, 60], [64 - 59, 64, 59], [64 - 62, 64, 62], [65 - 59, 65, 59], [65 - 62, 65, 62]]
  const data = [B.upperRises, B.lowerFalls, B.lowerRises, B.apart, B.climb]
  data.forEach((ev, i) => {
    const first = [lower(ev)[0].midi, upper(ev)[0].midi]
    assert.deepEqual(first, [60, 64], `case ${i} must start from C4+E4`)
    const lastL = lower(ev).at(-1)!.midi, lastU = upper(ev).at(-1)!.midi
    assert.deepEqual([lastU - lastL, lastU, lastL], expect[i])
    assert.equal(Math.max(...ev.map(ends)), 5.5)
  })
  assert.deepEqual(FIVE.map(f => f.semis), [5, 5, 2, 6, 3])
  assert.equal(FIVE[3].interval.includes('diminished fifth'), true)
  assert.deepEqual(path([[60, 64], [60, 65], [59, 65], [60, 64]], 2.5, 10).filter(e => e.role === 'drone').map(e => [e.midi, e.start, ends(e)]), [[60, 0, 5], [59, 5, 7.5], [60, 7.5, 10]])
})

test('2C: both 36 s versions share the identical upper line; only the lower changes at 12 s and 24 s; never more than two notes', () => {
  assert.deepEqual(upper(C.held), upper(C.moving))
  assert.deepEqual(upper(C.held).map(e => [e.midi, e.start, ends(e)]), [[64, 4, 10], [65, 14, 20], [64, 26, 32]])
  assert.deepEqual(lower(C.held).map(e => [e.midi, e.start, ends(e)]), [[60, 0, 36]])
  assert.deepEqual(lower(C.moving).map(e => [e.midi, e.start, ends(e)]), [[60, 0, 12], [59, 12, 24], [60, 24, 36]])
  for (const v of [C.held, C.moving]) for (let t = 0; t < 36; t += 0.25) assert.ok(v.filter(e => e.start <= t && t < ends(e)).length <= 2)
  // B3 under F4 is six semitones: a diminished fifth
  assert.equal(65 - 59, 6)
})

test('palette: 13 unique records 0..12 from C4 with exact spelling; tritone has both spellings; inversions sum to 12', () => {
  assert.equal(INTERVALS.length, 13)
  assert.deepEqual(INTERVALS.map(i => i.semitones), Array.from({ length: 13 }, (_, i) => i))
  for (const i of INTERVALS) { assert.equal(i.lowerMidi, 60); assert.equal(i.upperMidi, 60 + i.semitones); assert.equal(i.anchor, `ip-${String(i.semitones).padStart(2, '0')}`) }
  assert.deepEqual(INTERVALS.map(i => i.upperName), ['C4', 'D♭4', 'D4', 'E♭4', 'E4', 'F4', 'F♯4', 'G4', 'A♭4', 'A4', 'B♭4', 'B4', 'C5'])
  assert.equal(INTERVALS[6].altSpelling?.name, 'Diminished fifth'); assert.equal(INTERVALS[6].altSpelling?.upper, 'G♭4'); assert.equal(INTERVALS[6].altSpelling?.midi, 66)
  assert.equal(INTERVALS[6].upperMidi, INTERVALS[6].altSpelling?.midi)
  for (const i of INTERVALS) assert.equal(i.semitones + INTERVALS.find(x => x.id === (data(i.id)))!.semitones, 12)
  function data(id: string) { return INTERVALS.find(x => x.id === id)!.semitones === 6 ? id : INTERVALS.find(x => x.semitones === 12 - INTERVALS.find(y => y.id === id)!.semitones)!.id }
  for (const i of INTERVALS) { assert.equal(i.deep.sections.length, 7); assert.ok(i.deep.sections.every(([, t]) => t && t.length > 20), i.id) }
  assert.equal(atlas.layers.length, 6)
})

test('copy is verbatim from the Week 2 source documents', () => {
  const show = (p: string) => execFileSync('git', ['-C', `${homedir()}/amf-work/amf-w78-docs`, 'show', `origin/docs/ajourne-site-implementation-20261105:04-curriculum/tracks/soundscape-path/implementation/${p}`], { encoding: 'utf8' })
  const strings: string[] = []
  const walk = (v: unknown) => { if (typeof v === 'string') strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk) }
  walk(teaching)
  const addendum = show('week-02/WEEK_02_INSTRUCTIONAL_DEPTH_AND_IMPLEMENTATION_ADDENDUM_V1.md')
  assert.deepEqual(strings.filter(s => s.length > 12 && !addendum.includes(s)), [])
  for (const [id, f] of [['2A', 'A'], ['2B', 'B'], ['2C', 'C']] as const) {
    const doc = show(`week-02/LESSON_${id}_ZERO_DECISION.md`).replaceAll('\\`', '`')
    for (const d of drawers(id as never)) for (const [, v] of d.fields) { const s = copyOf(v); assert.ok(!s || doc.includes(s), `${id} ${d.id}: ${s.slice(0, 50)}`) }
    void f
  }
  const atl = show('resources/interval-palette/DEEP_ATLAS_CONTENT_V1.md')
  for (const i of INTERVALS) for (const [, t] of i.deep.sections) assert.ok(atl.includes(t), `${i.id}: ${t.slice(0, 50)}`)
  assert.ok(W2.hub.welcome.length === 4)
})
