// M03 targeted checks: static-lesson policy, factual claims, art integrity, crosswalk coverage. (not a regression suite)
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { INTERVALS } from '../lib/soundscape/resources/palette'
import atlas from '../lib/soundscape/resources/atlas.json'
import { register } from 'node:module'
register('./ts-hooks.mjs', import.meta.url)
const J = (p: string) => JSON.parse(readFileSync(p, 'utf8'))
const nat = J('docs/m03/native_registry.json'), art = J('docs/m03/art_registry.json'), cw = J('docs/m03/crosswalk.json'), led = J('docs/m03/ledger.json')
const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex')

test('native figures: every file exists, has title + desc + print variant, and is fully static (no script, handler or animation)', () => {
  let svgs = 0
  for (const [k, v] of Object.entries<any>(nat)) for (const f of v.files) {
    assert.ok(existsSync(f), `${k}: ${f} missing`)
    if (f.endsWith('.svg')) {
      svgs++; const s = readFileSync(f, 'utf8')
      assert.ok(s.includes('<title') && s.includes('<desc'), `${f} lacks title/desc`)
      assert.ok(!/<script|\son[a-z]+=|<animate|<set |<foreignObject/.test(s), `${f} is not static`)
    }
  }
  for (const k of Object.keys(nat)) if (nat[k].type === 'NATIVE-SVG') assert.ok(nat[k].files.some((f: string) => f.endsWith('.print.svg')), `${k} lacks print variant`)
  assert.ok(svgs >= 100, 'expected 100+ svg files, got ' + svgs)
})
test('HTML sheets are static: no script, no event handlers, no audio, no form controls', () => {
  for (const [k, v] of Object.entries<any>(nat)) for (const f of v.files) if (f.endsWith('.html')) { const s = readFileSync(f, 'utf8'); assert.ok(!/<script|\son[a-z]+=|<audio|<video|<button|<input|<select/.test(s), `${k} is interactive`) }
})
test('review pages and the Fig module contain no client JS, handlers or audio', () => {
  for (const f of ['components/soundscape/m03/Fig.tsx', 'app/curriculum/soundscape-path/m03-preview/[group]/page.tsx', 'app/curriculum/soundscape-path/m03-preview/contact/[group]/page.tsx']) { const s = readFileSync(f, 'utf8'); assert.ok(!/use client|onClick|useState|<audio|AudioContext|<button/.test(s), f) }
})
test('art: every raw file matches its recorded hash, none is the private reference, every alpha border is 0, cost = ledger', () => {
  const REF = 'a5346fa879c0480a802fa7a2364ba16b39e7a7a1ccc35f37010cffd4a8e130ab'
  for (const [k, v] of Object.entries<any>(art)) { assert.equal(sha(v.raw), v.raw_sha256, k); assert.notEqual(v.raw_sha256, REF); assert.equal(sha(v.png), v.alpha.png_sha256, k + ' png'); assert.equal(v.alpha.alpha_border_max, 0, k + ' border alpha'); assert.ok(existsSync(v.webp), k) }
  const regCost = Object.values<any>(art).reduce((n, v) => n + (v.cost_usd || 0), 0), billed = led.calls.reduce((n: number, c: any) => n + (c.cost_usd || 0), 0)
  assert.ok(billed >= regCost - 1e-9 && billed - regCost < 0.2, `ledger ${billed} vs registered ${regCost}`)  // difference = the replaced B01 call, disclosed
})
test('crosswalk: all 96 candidate IDs classified; produced items point at real files; deferred ones carry a reason', () => {
  const ids = Object.values<any>(cw.ids); assert.equal(ids.length, 96)
  for (const i of ids) {
    if (['DEFER', 'SOURCE-GATED', 'CONSOLIDATED'].includes(i.class)) { assert.ok(i.reason.length > 10, i.id); continue }
    assert.ok(i.native.length || i.art.length, i.id + ' has nothing')
    for (const n of i.native) assert.ok(nat[n], `${i.id}: native ${n}`)
    for (const a of i.art) if (a && !a.startsWith('M02:')) assert.ok(art[a], `${i.id}: art ${a}`)
  }
  assert.deepEqual(ids.filter(i => i.class === 'DEFER').map(i => i.id).sort(), ['E05', 'S01', 'S02', 'S04'])
})
test('Atlas facts: 13 cards and 13 chapters preserved; semitone counts equal the MIDI difference; plates exist for all 13', () => {
  assert.equal(INTERVALS.length, 13); assert.equal(atlas.chapters.length, 13)
  for (const r of INTERVALS) { assert.equal(r.upperMidi - r.lowerMidi, r.semitones, r.id); assert.ok(nat[`T07-IP-${String(r.semitones).padStart(2, '0')}`] && nat[`T08-IP-${String(r.semitones).padStart(2, '0')}`]) }
})
test('lesson facts: shared-note figure and answer-neutral 1B page', () => {
  const f04 = readFileSync('public/soundscape/m03/native/F04-native.svg', 'utf8'); assert.match(f04, /only here/); assert.equal((f04.match(/>shared</g) || []).length, 1)
  const early = readFileSync('public/soundscape/m03/native/B01-early.svg', 'utf8'); assert.ok(!/higher C|C5/i.test(early), 'B01-early must not reveal the higher C')
  const asc = readFileSync('public/soundscape/m03/native/B11-native.svg', 'utf8'); assert.match(asc, /F♯/)
})
test('M02 approved art is reused, not regenerated', () => { for (const a of ['G01-B-concentric-home', 'G02-ACCENT-keyboard-light', 'G03-B-shared-worlds', 'A-corner-atmosphere']) assert.ok(existsSync(`public/soundscape/m02/art/${a}.webp`)); assert.ok(!art['G01'] && !art['G03']) })
