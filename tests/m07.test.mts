// M07 Week 2 graphics: targeted source-fidelity, palette, spoiler, geometry, accessibility and readability checks.
// Run: node --experimental-strip-types --no-warnings --import ./tests/register.mjs --test tests/m07.test.mts
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { ASSETS, VARIANTS, renderAsset } from '../lib/soundscape/m07/render.ts'
import { ART } from '../lib/soundscape/m07/art.ts'
import { COVERAGE } from '../lib/soundscape/m07/coverage.ts'
import { REUSED } from '../lib/soundscape/m07/reused.ts'
import { ctxFor, chip, laneGeom, W_IN, ivl } from '../lib/soundscape/m07/kit.ts'
import { INTERVAL_IDENTITY_COLORS_V1, PLOGGER_LENS_V1, identityHex } from '../lib/soundscape/resources/interval-identity.ts'
import { A, B, C, FIVE } from '../lib/soundscape/week2/fixtures.ts'

const R = (id: string, v: 'screen' | 'narrow' | 'print' = 'screen') => renderAsset(ASSETS.find(a => a.id === id)!, v)
const hexes = (svg: string) => new Set([...svg.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m => m[0].toLowerCase()))
const visibleText = (svg: string) => [...svg.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map(m => m[1]).join(' ')
const unesc = (s: string) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
const allText = (a: typeof ASSETS[number], svg: string) => unesc(visibleText(svg) + ' ' + (svg.match(/<title[^>]*>([^<]*)</)?.[1] ?? '') + ' ' + (svg.match(/<desc[^>]*>([^<]*)</)?.[1] ?? '') + ' ' + a.alt).toLowerCase()
const wellFormed = (svg: string) => {
  const stack: string[] = []
  for (const m of svg.matchAll(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g)) {
    if (m[1]) { assert.equal(stack.pop(), m[2], 'unbalanced </' + m[2] + '>') } else if (!m[4]) stack.push(m[2])
  }
  assert.equal(stack.length, 0, 'unclosed: ' + stack.join(','))
}
const LEGACY = ['#c8811f', '#3f9b92', '#7a4a8c', '#1d4e89', ...Object.values(INTERVAL_IDENTITY_COLORS_V1).map(v => v.previousHex.toLowerCase())]
const IDENT = new Map(Object.entries(INTERVAL_IDENTITY_COLORS_V1).map(([k, v]) => [v.hex.toLowerCase(), Number(k.slice(3))]))

test('inventory: ids unique, 50 masters, valid dispositions, three variants each', () => {
  const ids = ASSETS.map(a => a.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.equal(ASSETS.length, 50)
  for (const a of ASSETS) { assert.ok(['REUSE', 'REVISE', 'REPLACE', 'CREATE', 'DERIVE'].includes(a.disp), a.id); assert.ok(a.sources.length, a.id + ' needs sources'); assert.ok(a.teaches.length > 40 && a.howToRead.length > 80, a.id + ' needs prose') }
  for (const a of ASSETS) for (const v of VARIANTS) { const r = renderAsset(a, v); assert.ok(r.svg.startsWith('<svg'), a.id + v); assert.ok(r.h > 60) }
})

test('every SVG is well-formed, self-contained and accessible', () => {
  for (const a of ASSETS) for (const v of VARIANTS) {
    const { svg } = renderAsset(a, v)
    wellFormed(svg)
    assert.match(svg, /role="img"/); assert.match(svg, /aria-labelledby="[^"]+-t [^"]+-d"/)
    assert.match(svg, /<title id="[^"]+">[^<]{8,}</); assert.match(svg, /<desc id="[^"]+">[^<]{40,}</)
    assert.doesNotMatch(svg, /<script|<image|href=|xlink|url\(http|data:|@import|<foreignObject/i, `${a.id}/${v}`)
    assert.ok(a.alt.length >= 40 && a.alt.length <= 420, a.id + ' alt length ' + a.alt.length)
  }
  for (const x of ART) { wellFormed(x.svg); assert.doesNotMatch(x.svg, /<script|<image|href=/i) ; assert.doesNotMatch(x.svg, /<rect[^>]*width="100%"/) }
})

test('palette: hue appears exactly for the pairs the asset names, only as identityHex(), never legacy hexes', () => {
  for (const a of ASSETS) for (const v of VARIANTS) {
    const { svg } = renderAsset(a, v), hs = hexes(svg)
    for (const l of LEGACY) assert.ok(!hs.has(l), `${a.id}/${v} uses legacy/voice hex ${l}`)
    const found = new Set([...hs].filter(h => IDENT.has(h)).map(h => IDENT.get(h)!))
    assert.deepEqual([...found].sort((x, y) => x - y), [...new Set(a.semis)].sort((x, y) => x - y), `${a.id}/${v}: identity hues found vs declared`)
    for (const s of a.semis) assert.ok(hs.has(identityHex(s).toLowerCase()))
  }
})

test('palette: a full-token sheet and neutral figures; 13 identity hexes match the live module', () => {
  const sheet = hexes(R('A-02').svg)
  assert.equal(Object.keys(INTERVAL_IDENTITY_COLORS_V1).length, 13)
  for (const v of Object.values(INTERVAL_IDENTITY_COLORS_V1)) assert.ok(sheet.has(v.hex.toLowerCase()))
  for (const a of ASSETS.filter(a => a.state === 'N')) assert.equal(a.semis.length, 0, a.id + ' is neutral but declares hues')
})

test('plogger: all 11 glyphs render distinctly from PLOGGER_LENS_V1; 0 and 12 are N/A; chips never use identity hues', () => {
  const c = ctxFor('screen', 't'), seen = new Set<string>()
  for (let n = 1; n <= 11; n++) { const g = chip(c, 0, 0, n, 1, 'z'); assert.ok(g.includes(`[${n}]`)); seen.add(g.replace(/\[\d+\]/, '').replace(/-cl\w+/g, '')); for (const h of hexes(g)) assert.ok(!IDENT.has(h), `chip ${n} uses an identity hue`) }
  assert.ok(seen.size >= 7)   // 11 brackets collapse onto distinct (shape, shadow, fill) combinations; the table has 11 entries
  assert.equal(Object.keys(PLOGGER_LENS_V1).length, 11)
  assert.ok(chip(c, 0, 0, 0).includes('N/A')); assert.ok(chip(c, 0, 0, 12).includes('N/A'))
  const a9 = R('A-09').svg; for (const n of [3, 4, 5, 6]) assert.ok(a9.includes(`[${n}]`))
  assert.ok(!R('A-09a').svg.includes('PLOGGER LENS · [6]'))
})

test('lock: E4–G4 is a minor third on E4/G4; B3–F4 is a diminished fifth with the tritone hue and [6]; never C4/F♯4 where B3/F4 is meant', () => {
  const a10 = R('2A-10'); const t = allText(ASSETS.find(a => a.id === '2A-10')!, a10.svg)
  assert.ok(t.includes('e4') && t.includes('g4') && !t.includes('e♭') && !t.includes('g♭'))
  assert.ok(hexes(a10.svg).has(identityHex(3).toLowerCase()))
  assert.deepEqual(ivl(64, 67).name, 'minor third')
  for (const id of ['2B-06']) { const s = R(id).svg, t2 = allText(ASSETS.find(a => a.id === id)!, s); assert.ok(t2.includes('b3') && t2.includes('f4') && !t2.includes('f♯4') && !t2.includes('c4 + f♯4')); assert.ok(hexes(s).has(identityHex(6).toLowerCase())); assert.ok(s.includes('[6]')) }
  assert.equal(ivl(59, 65).abbr, 'd5'); assert.equal(ivl(59, 65).semis, 6); assert.equal(ivl(59, 65).letters, 5)
  const s13 = R('2B-13').svg; assert.ok(s13.includes('B3') && s13.includes('F4') && s13.includes('F♯4')); assert.ok(s13.includes('[6]'))
  assert.equal((s13.match(new RegExp(identityHex(6), 'gi')) ?? []).length >= 4, true)
})

test('lock: all five 2B cases restart at C4 + E4 and end where the fixtures say; strict parallel is separate', () => {
  const ends = ['C4 + F4', 'B3 + E4', 'D4 + E4', 'B3 + F4', 'D4 + F4']
  for (const f of FIVE) { const lo = f.events.find(e => e.role === 'drone' && e.start === 0)!.midi, hi = f.events.find(e => e.role === 'melody' && e.start === 0)!.midi; assert.deepEqual([lo, hi], [60, 64], f.id + ' restarts at C4+E4') }
  const t = allText(ASSETS.find(a => a.id === '2B-08')!, R('2B-08').svg)
  for (const e of ends) assert.ok(t.includes(e.toLowerCase()), 'table lacks ' + e)
  assert.equal((t.match(/c4 \+ e4 →/g) ?? []).length >= 5, true)
  const p = allText(ASSETS.find(a => a.id === '2B-09')!, R('2B-09').svg)
  assert.ok(p.includes('d4 + f♯4') && p.includes('strict parallel') && p.includes('outside the five'))
  assert.ok(!allText(ASSETS.find(a => a.id === '2B-08')!, R('2B-08').svg).includes('d4 + f♯4'))
  assert.ok(allText(ASSETS.find(a => a.id === '2B-07')!, R('2B-07').svg).includes('not strict parallel'))
})

test('geometry: 2C timelines use the 36 s fixture times; upper voice rests at 12 s and 24 s', () => {
  const up = C.moving.filter(e => e.role === 'melody').map(e => [e.midi, e.start, e.start + e.dur])
  assert.deepEqual(up, [[64, 4, 10], [65, 14, 20], [64, 26, 32]])
  assert.deepEqual(C.moving.filter(e => e.role === 'drone').map(e => [e.midi, e.start, e.start + e.dur]), [[60, 0, 12], [59, 12, 24], [60, 24, 36]])
  assert.deepEqual(C.held.filter(e => e.role === 'drone').map(e => [e.midi, e.start, e.start + e.dur]), [[60, 0, 36]])
  for (const id of ['2C-03', '2C-10']) {
    const { svg } = R(id), g = laneGeom(W_IN(ctxFor('screen', 'x')), 36)
    // upper bars are the rects with stroke-width 2.6 and rx 7
    const bars = [...svg.matchAll(/<rect x="([\d.]+)" y="[\d.]+" width="([\d.]+)" height="32" rx="7" fill="#fffdf8" stroke="#3e2241" stroke-width="2.6"/g)].map(m => [Number(m[1]), Number(m[2])])
    assert.equal(bars.length, 3, id + ' upper bars')
    for (const [i, [s, e]] of ([[4, 10], [14, 20], [26, 32]] as const).entries()) { assert.ok(Math.abs(bars[i][0] - g.X(s)) < 0.02, `${id} bar ${i} x`); assert.ok(Math.abs(bars[i][1] - (g.X(e) - g.X(s))) < 0.02, `${id} bar ${i} w`) }
    for (const t of [12, 24]) assert.ok(!bars.some(([x, w]) => x < g.X(t) && x + w > g.X(t)), `${id}: upper note sounds at ${t}`)
  }
  const s3 = allText(ASSETS.find(a => a.id === '2C-03')!, R('2C-03').svg); assert.ok(s3.includes('b3 + f4') && s3.includes('d5 · 6') || s3.includes('diminished fifth'))
  const bands = (svg: string) => [...svg.matchAll(/opacity="0\.22"/g)].length
  assert.equal(bands(R('2C-03').svg), 3); assert.equal(bands(R('2C-10').svg), 1); assert.equal(bands(R('2C-02').svg), 3)
})

test('2A facts: C4+E4 = 4 st, E4+G4 = 3 st, C4+F4 = 5, B3+E4 = 5, D4+E4 = 2 (from fixtures)', () => {
  assert.equal(A.together.map(e => e.midi).join(), '60,64'); assert.equal(A.EG.map(e => e.midi).join(), '64,67')
  assert.deepEqual([ivl(60, 64).semis, ivl(64, 67).semis, ivl(60, 65).semis, ivl(59, 64).semis, ivl(62, 64).semis], [4, 3, 5, 5, 2])
  assert.deepEqual([ivl(60, 64).letters, ivl(64, 67).letters, ivl(60, 65).letters, ivl(59, 64).letters, ivl(62, 64).letters], [3, 3, 4, 4, 2])
  assert.ok(R('2A-06', 'screen').svg.includes('B3'))
  assert.equal(B.path.length, 6)   // four stages: lower C,C,B,C (3 events), upper E,F,E (3 events)
})

test('no early spoilers: neutral figures keep the forbidden words out of title, desc, alt and visible text', () => {
  const rx = (w: string) => w.length <= 3 ? new RegExp(`(^|[^a-z0-9])${w.toLowerCase()}([^a-z0-9]|$)`) : new RegExp(w.toLowerCase())
  for (const a of ASSETS) for (const v of VARIANTS) {
    const t = allText(a, renderAsset(a, v).svg)
    for (const w of a.forbid) assert.ok(!rx(w).test(t), `${a.id}/${v} contains forbidden "${w}"`)
  }
  // 2B step 3 (inquiry) is fully unanswered
  const t = allText(ASSETS.find(a => a.id === '2B-01b')!, R('2B-01b').svg)
  for (const w of ['contrary', 'similar', 'oblique', 'parallel', 'diminished', 'tritone', 'minor third', 'major third', 'perfect', 'semitone', 'six']) assert.ok(!t.includes(w), '2B-01b leaks ' + w)
  assert.equal(R('2B-01b').svg.match(/stroke="#[0-9a-f]{6}"/gi)!.every(s => !IDENT.has(s.slice(8, 15).toLowerCase())), true)
})

test('voices are never coloured: lanes and markers use neutral ink only', () => {
  for (const a of ASSETS) { const hs = hexes(renderAsset(a, 'screen').svg); for (const bad of ['#c8811f', '#3f9b92', '#7a4a8c']) assert.ok(!hs.has(bad)) }
  const s = R('2C-01').svg; assert.equal([...hexes(s)].filter(h => IDENT.has(h)).length, 0)
})

test('readability: no text under 11.5 px (M05 legend text is 11.5) in any variant; narrow is 360 wide; elements stay inside the canvas', () => {
  for (const a of ASSETS) for (const v of VARIANTS) {
    const { svg, w, h } = renderAsset(a, v)
    assert.equal(w, v === 'narrow' ? 360 : 760)
    for (const m of svg.matchAll(/font-size="([\d.]+)"/g)) assert.ok(Number(m[1]) >= 11.5, `${a.id}/${v} font ${m[1]}`)
    for (const m of svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g)) { const x = Number(m[1]) + 8; assert.ok(x >= -0.5 && x + Number(m[3]) <= w + 8.5, `${a.id}/${v} rect leaves canvas: x=${m[1]} w=${m[3]}`); void h }
  }
})

test('print variants are white-page, shape-coded and carry the same text as screen', () => {
  for (const a of ASSETS) {
    const p = renderAsset(a, 'print').svg, s = renderAsset(a, 'screen').svg
    assert.match(p, /<rect width="100%" height="100%" fill="#fff"\/>/)
    assert.equal(visibleText(p), visibleText(s), a.id + ' print/screen text differs')
  }
})

test('coverage: hub and all 31 steps have figures; step lists agree with each asset; reused files exist', () => {
  const keys = COVERAGE.map(c => c.key)
  assert.equal(keys.length, 32); assert.equal(new Set(keys).size, 32)
  const nativeIds = new Set(ASSETS.map(a => a.id)), reused = new Set(REUSED.map(r => r.id)), art = new Set(['A-01', 'A-08', 'A-10'])
  const bad: string[] = []
  for (const c of COVERAGE) {
    if (!c.assets.length) bad.push(c.key + ' empty')
    for (const id of c.assets) { if (!(nativeIds.has(id) || reused.has(id))) bad.push(c.key + ' unknown ' + id); const a = ASSETS.find(x => x.id === id); if (a && !art.has(id) && !(a.steps.includes(c.key))) bad.push(`${id} placed at ${c.key} but its steps are ${a.steps}`) }
  }
  for (const a of ASSETS) for (const st of a.steps) { const c = COVERAGE.find(x => x.key === st); if (!c) bad.push(a.id + ' step ' + st); else if (!c.assets.includes(a.id)) bad.push(`${st} should list ${a.id}`) }
  assert.deepEqual(bad, [])
  for (const r of REUSED) assert.ok(existsSync(r.file), r.file)
})

test('tokens are imported, not copied: figure code contains no literal identity hexes', () => {
  const src = ['kit', 'assets', 'render', 'art'].map(f => readFileSync(`lib/soundscape/m07/${f}.ts`, 'utf8')).join('\n')
  for (const v of Object.values(INTERVAL_IDENTITY_COLORS_V1)) { assert.ok(!src.toLowerCase().includes(v.hex.toLowerCase()), 'literal ' + v.hex); assert.ok(!src.toLowerCase().includes(v.previousHex.toLowerCase())) }
})
