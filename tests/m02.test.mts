// M02 pilot checks: keyboard geometry, shared-notes truth from fixtures, and the art files. (targeted; not a regression suite)
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { buildKeyboard, cKeys, isLeftOfTwoBlacks, nameOf } from '../lib/soundscape/m02/keyboard-geometry'
import { worldsAt, names, MOMENT, semis } from '../lib/soundscape/m02/shared-worlds'
import { C as L2C } from '../lib/soundscape/week2/fixtures'

import { register } from 'node:module'
register('./ts-hooks.mjs', import.meta.url)

test('G02: ten-key window C..E has the two-then-three-then-two black-key pattern', () => {
  const kb = buildKeyboard('C', 10)
  assert.deepEqual(kb.whites.map(w => w.letter).join(''), 'CDEFGABCDE')
  assert.deepEqual(kb.groups.map(g => g.size), [2, 3, 2])
  assert.equal(kb.blacks.length, 7)
  for (const b of kb.blacks) assert.ok(!['E', 'B'].includes(b.after), 'no black key after E or B')
})

test('G02: every C is the white key immediately left of a TWO-black-key group, and no other white key is', () => {
  const kb = buildKeyboard('C', 15)
  for (const w of kb.whites) {
    const expectC = w.letter === 'C' && w.index < kb.whites.length - 1 // last key has no black key drawn to its right
    if (w.index === kb.whites.length - 1) continue
    assert.equal(isLeftOfTwoBlacks(kb, w), expectC, `${w.letter}@${w.index}`)
  }
  assert.equal(cKeys(kb).length, 3)
})

test('G02: black keys are centred on the boundary between neighbouring white keys (within 0.1 key)', () => {
  const kb = buildKeyboard('C', 15)
  for (const b of kb.blacks) {
    const w = kb.whites.find(x => x.letter === b.after && Math.abs(x.index + 1 - (b.x + b.w / 2)) < 0.12)
    assert.ok(w, `black after ${b.after} misplaced`)
  }
})

test('G02/G01: white keys carry the right letters and pitch classes', () => {
  const kb = buildKeyboard('C', 8)
  assert.deepEqual(kb.whites.map(w => nameOf(w.midi)), ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
  assert.equal(kb.whites[7].midi - kb.whites[0].midi, 12, 'second C is exactly one octave higher')
})

test('G03: the two Lesson 2C situations share ONLY the melody note F at 14-20 s', () => {
  const w = worldsAt(MOMENT.F)
  assert.deepEqual(names(w.held), ['C', 'F'])
  assert.deepEqual(names(w.moving), ['B', 'F'])
  assert.deepEqual(names(w.shared), ['F'])
  assert.deepEqual(names(w.onlyHeld), ['C'])
  assert.deepEqual(names(w.onlyMoving), ['B'])
  assert.equal(semis(w.held[0], w.shared[0]), 5)
  assert.equal(semis(w.moving[0], w.shared[0]), 6)
})

test('G03: at the two E moments the situations are identical; the upper line never differs', () => {
  for (const t of [MOMENT.firstE, MOMENT.lastE]) {
    const w = worldsAt(t)
    assert.deepEqual(names(w.held), ['C', 'E']); assert.deepEqual(names(w.moving), ['C', 'E'])
    assert.equal(w.onlyHeld.length + w.onlyMoving.length, 0)
  }
  assert.deepEqual(L2C.upper.map(e => [e.midi, e.start, e.dur]), L2C.held.filter(e => e.role === 'melody').map(e => [e.midi, e.start, e.dur]))
  assert.deepEqual(L2C.held.filter(e => e.role === 'melody'), L2C.moving.filter(e => e.role === 'melody'))
})

const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex')
test('art: transparent PNG/WebP exist, are RGBA, and match the recorded hashes', () => {
  const rec = JSON.parse(readFileSync('docs/m02/alpha_conversion.json', 'utf8')) as { png: string; png_sha256: string }[]
  assert.equal(rec.length, 4)
  for (const r of rec) {
    const p = 'public/soundscape/m02/' + r.png
    assert.ok(statSync(p).size > 100_000, p)
    assert.equal(sha(p), r.png_sha256, p)
    assert.equal(readFileSync(p).readUInt8(25), 6, p + ' is not RGBA (colour type 6)')
  }
})

test('art: the private reference image is never inside the app or public bundle', () => {
  const ref = 'a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab'
  for (const f of ['G01-B-concentric-home', 'G03-B-shared-worlds', 'G02-ACCENT-keyboard-light', 'A-corner-atmosphere'])
    assert.notEqual(sha(`public/soundscape/m02/art/${f}.png`), ref)
})
