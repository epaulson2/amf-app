// Week 1 targeted checks: npm run test:soundscape
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { drawers, copyOf } from '../lib/soundscape/week1/content'
import * as F from '../lib/soundscape/week1/fixtures'
import { isBlackKey, midiToName } from '../lib/soundscape/midi'
import { buildSchedule } from '../lib/soundscape/audio'

const DOCS = `${homedir()}/amf-work/amf-w78-docs/04-curriculum/tracks/soundscape-path/implementation/week-01`
const pcs = (e: { midi: number; start: number; dur: number }[]) => e.map(x => [x.midi, x.start, x.dur].join(':'))

test('note mapping: C3=48 C4=60 C#4=61 D4=62 E4=64 F4=65 G4=67 A4=69 B4=71 C5=72', () => {
  assert.deepEqual(['C3', 'C4', 'C♯4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'].map(F.N), [48, 60, 61, 62, 64, 65, 67, 69, 71, 72])
  assert.deepEqual([48, 60, 61, 72].map(midiToName), ['C3', 'C4', 'C♯4', 'C5'])
})

test('keyboard geometry: semitones, whole/half steps, W W H W W W H, black-key groups', () => {
  const scale = [60, 62, 64, 65, 67, 69, 71, 72]
  assert.deepEqual(scale.slice(1).map((m, i) => (m - scale[i] === 2 ? 'W' : m - scale[i] === 1 ? 'H' : '?')), ['W', 'W', 'H', 'W', 'W', 'W', 'H'])
  assert.equal(61 - 60, 1); assert.equal(62 - 60, 2); assert.equal(65 - 64, 1); assert.equal(72 - 71, 1); assert.equal(72 - 60, 12)
  assert.ok(isBlackKey(61) && !isBlackKey(64) && !isBlackKey(65) && !isBlackKey(71) && !isBlackKey(72))
  const blacks = Array.from({ length: 25 }, (_, i) => 48 + i).filter(isBlackKey)
  assert.equal(blacks.length, 10) // two octaves: 5 black keys each
  const keys = Array.from({ length: 25 }, (_, i) => 48 + i)
  assert.equal(keys.length - 1, 24) // C3..C5 spans 24 semitones
})

test('1A: visitors are single upper notes over one held C3', () => {
  for (const [k, midi] of [['E', 64], ['G', 67], ['D', 62]] as const) {
    const ev = F.A02[k]
    assert.equal(ev.filter(e => e.role === 'drone').length, 1)
    assert.deepEqual(ev.filter(e => e.role !== 'drone').map(e => e.midi), [midi])
    assert.equal(ev[0].midi, 48)
  }
  assert.deepEqual(F.A03_NOTES, [60, 62, 64, 65, 67, 69, 71])
  assert.equal(F.A01.length, 1) // a single note, never a chord
  assert.ok(F.A01[0].dur <= 15)
})

test('1B: unfinished and arrival versions share an identical prefix; C5 only in arrival', () => {
  const up = (e: typeof F.B01) => e.filter(x => x.role !== 'drone')
  assert.deepEqual(up(F.B01).map(e => e.midi), [60, 62, 64, 65, 67, 69, 71])
  assert.deepEqual(pcs(up(F.B02).slice(0, 7)), pcs(up(F.B01)))
  assert.deepEqual(F.B01.filter(e => e.role === 'drone'), F.B02.filter(e => e.role === 'drone'))
  assert.equal(F.B02.at(-1)!.midi, 72)
  assert.ok(!F.B01.some(e => e.midi === 72))
  const gaps = up(F.B01).slice(1).map((e, i) => +(e.start - up(F.B01)[i].start).toFixed(3))
  assert.deepEqual(gaps, [0.7, 0.7, 0.7, 0.7, 0.7, 0.7])
  assert.ok(F.B01[0].dur - (up(F.B01).at(-1)!.start + up(F.B01).at(-1)!.dur) >= 2.5 - 1e-9) // 2.5 s listener space
  assert.equal(F.B03.map(e => e.midi).join(), '60,61'); assert.equal(F.B04.map(e => e.midi).join(), '60,62')
  assert.equal(F.B04_HOPS.map(e => e.midi).join(), '60,61,62'); assert.equal(F.B05.map(e => e.midi).join(), '64,65'); assert.equal(F.B06.map(e => e.midi).join(), '71,72')
})

test('1C: voice roles, early/delayed entrance, and landing/open share the first 33 s', () => {
  assert.deepEqual(F.C01.filter(e => e.role !== 'drone').map(e => [e.midi, e.start, e.start + e.dur]), [[64, 2, 4], [67, 5, 7], [62, 9, 11]])
  assert.deepEqual(F.C01.find(e => e.role === 'drone'), { midi: 48, start: 0, dur: 12, role: 'drone' })
  const a = F.C02.find(e => e.midi === 64)!, b = F.C03.find(e => e.midi === 64)!
  assert.deepEqual([a.start, a.start + a.dur, b.start, b.start + b.dur], [2, 6, 7, 11])
  assert.equal(a.dur, b.dur); assert.deepEqual(F.C02.find(e => e.role === 'drone'), F.C03.find(e => e.role === 'drone'))
  const common = (e: typeof F.C04) => e.filter(x => x.midi !== 72)
  assert.deepEqual(common(F.C04), F.C05)
  assert.ok(F.C05.every(e => e.midi !== 72))
  const c5 = F.C04.find(e => e.midi === 72)!
  assert.deepEqual([c5.start, +(c5.start + c5.dur).toFixed(1)], [33, 35.8])
  assert.equal(F.C04.find(e => e.role === 'drone')!.dur, 36)
  assert.deepEqual(F.solo(F.C01, 'foundation').map(e => e.midi), [48]); assert.equal(F.solo(F.C01, 'upper').length, 3)
})

test('schedule: sine at exact MIDI frequency, no detune, quiet', () => {
  const s = buildSchedule(F.A02.E, F.LESSON_PATCH)
  assert.ok(Math.abs(s.find(n => n.midi === 64)!.hz - 329.6276) < 1e-3)
  assert.ok(Math.abs(s.find(n => n.midi === 48)!.hz - 130.8128) < 1e-3)
  assert.equal(F.LESSON_PATCH.harmonics.length, 1)
})

test('six drawers per lesson, each of the six kinds, with source links safe to open', () => {
  for (const l of ['1A', '1B', '1C'] as const) {
    const d = drawers(l)
    assert.deepEqual(d.map(x => x.id.split('-')[1]), ['HIST', 'SCI', 'AMBIENT', 'REAL', 'WORLD', 'PAINT'])
    for (const x of d) assert.ok(copyOf(x.fields.find(([k]) => k === 'Title')![1]).length > 5)
  }
  const doors = readFileSync(new URL('../components/soundscape/week1/Doors.tsx', import.meta.url), 'utf8')
  assert.ok(doors.includes('target="_blank" rel="noopener noreferrer"'))
  const week1 = ['Lesson1A', 'Lesson1B', 'Lesson1C'].map(f => readFileSync(new URL(`../components/soundscape/week1/${f}.tsx`, import.meta.url), 'utf8')).join('\n')
  assert.ok(!/<iframe|<video|<audio|autoPlay|\.mp3|\.wav|getUserMedia|localStorage|fetch\(/.test(week1))
})

test('1B withholds the C5 answer until reveal', () => {
  const src = readFileSync(new URL('../components/soundscape/week1/Lesson1B.tsx', import.meta.url), 'utf8')
  const unfinished = src.slice(src.indexOf('function Unfinished'), src.indexOf('function Distances'))
  const beforeReveal = unfinished.slice(0, unfinished.indexOf('{rev && ('))
  assert.ok(!/C5|MIDI 72/.test(beforeReveal.replace(/events=\{B0[12]\}/g, '')))
})

test('every extracted learner string is verbatim in the source documents', { skip: !existsSync(DOCS) }, () => {
  for (const l of ['1A', '1B', '1C'] as const) {
    const doc = readFileSync(`${DOCS}/LESSON_${l}_ZERO_DECISION.md`, 'utf8').replaceAll('\\`', '`')
    let n = 0
    for (const d of drawers(l)) for (const [, v] of d.fields) { const s = copyOf(v); if (s) { assert.ok(doc.includes(s), `${l} ${d.id}: ${s.slice(0, 60)}`); n++ } }
    assert.ok(n > 20)
  }
})
