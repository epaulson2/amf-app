// Week 2 Batch 2 supplied artwork: exact files, hashes, alpha, headers, and where each image may appear.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'

const DIR = 'public/w2/batch2'
const sums = readFileSync('docs/w2-pilot/batch2-SHA256SUMS.txt', 'utf8').trim().split('\n').map(l => l.split(/\s+/) as [string, string])
const read = (p: string) => readFileSync(p, 'utf8')

test('exactly the 20 supplied PNGs, byte-identical to the verified pull', () => {
  const files = readdirSync(DIR).sort()
  assert.equal(files.length, 20)
  assert.equal(sums.length, 20)
  for (const [h, n] of sums) assert.equal(createHash('sha256').update(readFileSync(`${DIR}/${n}`)).digest('hex'), h, n)
  assert.ok(!files.some(f => /contact|Contact|\.zip|\.svg/i.test(f)), 'no contact sheet, ZIP or SVG on the site')
})

test('every PNG is RGBA (colour type 6) with IHDR dims equal to the Art DIMS table', () => {
  const art = read('components/soundscape/week2/m04/Art.tsx')
  for (const [, n] of sums) {
    const b = readFileSync(`${DIR}/${n}`)
    assert.equal(b.subarray(1, 4).toString(), 'PNG')
    assert.equal(b[25], 6, `${n} must keep its alpha channel`)
    const stem = n.replace(/\.(desktop|phone)\.png$/, '')
    const m = art.match(new RegExp(`'${stem}': \\[(\\d+), (\\d+), (\\d+), (\\d+)\\]`))
    assert.ok(m, `${stem} in DIMS`)
    const [w, h] = [b.readUInt32BE(16), b.readUInt32BE(20)]
    const want = n.includes('.desktop.') ? [+m[1], +m[2]] : [+m[3], +m[4]]
    assert.deepEqual([w, h], want, n)
  }
})

test('placement: 2A step 9, 2B steps 4/5/6/8/10 and the 2B sheet; the five 04 files only behind a reveal; 2C unchanged', () => {
  const a = read('components/soundscape/week2/m04/Lesson2A.tsx')
  const b = read('components/soundscape/week2/m04/Lesson2B.tsx')
  const f = read('components/soundscape/week2/m04/figures2b.tsx')
  const sheets = read('components/soundscape/week2/m04/PracticeSheets.tsx')
  assert.match(a, /W2-2A-P01_three_changes_practice/)
  for (const k of ['a01', 'a02', 'a03', 'a04set', 'aP01']) assert.match(b, new RegExp(`F\\.${k} `))
  assert.match(sheets, /W2-2B-P01_two_voice_conversation_practice/)
  assert.doesNotMatch(b, /W2-2B-04/, 'no 04 image named directly in the lesson body')
  assert.equal((f.match(/<ArtReveal n=\{\d\}/g) || []).length, 5, 'five separate reveals')
  assert.equal((f.match(/<Art stem="W2-2B-04/g) || []).length, 0, 'no unrevealed 04 image')
  assert.doesNotMatch(read('components/soundscape/week2/m04/Lesson2C.tsx') + read('components/soundscape/week2/m04/figures2c.tsx'), /batch2|W2-2B|Art\b/)
})

test('no audio, no contact sheet, picture/source selection', () => {
  const art = read('components/soundscape/week2/m04/Art.tsx') + read('components/soundscape/week2/m04/ArtReveal.tsx')
  assert.doesNotMatch(art, /<audio|<video|AudioProvider|ClipButton|Contact_Sheet/)
  assert.match(art, /<picture/); assert.match(art, /<source media/)
})
