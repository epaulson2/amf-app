import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { INTERVALS } from '../lib/soundscape/resources/palette'
import { INTERVAL_IDENTITY_COLORS_V1 as T, PLOGGER_LENS_V1 as L, hasPlogger, contrast, PAPER, tint, LABEL_INK } from '../lib/soundscape/resources/interval-identity'
const R = (p: string) => new URL('../' + p, import.meta.url).pathname
const reg = JSON.parse(readFileSync(R('docs/m05/info_registry.json'), 'utf8'))
const plain = (t: string) => t.replace(/<\/text>\s*<text[^>]*>/g, ' ').replace(/<[^>]+>/g, '')
const svgOf = (id: string, print = false) => readFileSync(R(`public/soundscape/m05/info/${id}${print ? '.print' : ''}.svg`), 'utf8')

test('13/13 canonical identity hexes, exactly the standard, one source, old candidates preserved in data', () => {
  const std: Record<string, string> = { 'IP-00': '#76848C', 'IP-01': '#C25562', 'IP-02': '#C17D41', 'IP-03': '#8964A4', 'IP-04': '#AB812D', 'IP-05': '#4F816B', 'IP-06': '#5366A0', 'IP-07': '#347B97', 'IP-08': '#A95E86', 'IP-09': '#B47752', 'IP-10': '#367C79', 'IP-11': '#7978B3', 'IP-12': '#89845D' }
  assert.equal(Object.keys(T).length, 13)
  for (const r of INTERVALS) { assert.equal(T[r.id].hex, std[r.id], r.id); assert.equal(r.color.hex.toUpperCase(), T[r.id].previousHex.toUpperCase(), 'interval-data.json untouched ' + r.id) }
  assert.equal(new Set(Object.values(T).map(v => v.hex)).size, 13)
})
test('no figure or builder hard-codes an identity hex outside the token file', () => {
  const src = readFileSync(R('lib/soundscape/m05/info-svg.ts'), 'utf8') + readFileSync(R('docs/m05/tools/build_info.mts'), 'utf8')
  for (const v of Object.values(T)) assert.ok(!src.toLowerCase().includes(v.hex.toLowerCase()), v.hex)
})
test('contrast: accents >= 3:1 on paper, label ink >= 4.5:1 on every tint used', () => {
  for (const [id, v] of Object.entries(T)) { assert.ok(contrast(v.hex, PAPER) >= 3, id); assert.ok(contrast(LABEL_INK, tint(v.hex, .34)) >= 4.5, id); assert.ok(contrast(LABEL_INK, tint(v.hex, .22)) >= 4.5, id) }
})
test('Plogger lens: exactly 11 entries equal to the archived printed original; 0 and 12 are N/A', () => {
  const exp = ['jagged F dark', 'jagged F light', 'rounded F dark', 'rounded F light', 'straight F dark', 'straight both neutral', 'straight O light', 'rounded O dark', 'rounded O half', 'jagged O light', 'jagged O dark']
  for (let n = 1; n <= 11; n++) assert.equal(`${L[n].shape} ${L[n].dir} ${L[n].fill}`, exp[n - 1], `[${n}]`)
  assert.equal(Object.keys(L).length, 11); assert.ok(!hasPlogger(0) && !hasPlogger(12))
  for (const n of [0, 12]) { const t = svgOf(`IPF-sheet-${String(n).padStart(2, '0')}`); assert.match(t, /N\/A/); assert.doesNotMatch(t, /\[0\]|\[12\]/) }
})
test('every interval sheet and card shows exact note pair, semitone count, its own hex, three-factor legend, melodic and harmonic strips', () => {
  for (const r of INTERVALS) {
    const nn = String(r.semitones).padStart(2, '0'), s = svgOf(`IPF-sheet-${nn}`), n = svgOf(`IPF-sheet-${nn}-narrow`), c = svgOf(`IPF-card-${nn}`)
    for (const t of [s, n]) { assert.ok(t.includes(T[r.id].hex), 'hex ' + r.id); assert.match(t, /HOW TO READ THE THREE PLOGGER MARKS/); assert.match(t, /MELODIC/); assert.match(t, /HARMONIC/); assert.ok(t.includes(r.name)) }
    assert.ok(s.includes(`${r.semitones} semitone`) || r.semitones === 0, 'count ' + r.id)
    assert.ok(c.includes(T[r.id].hex) && c.includes(r.upperName.split('=')[0]), 'card ' + r.id)
    assert.match(reg[`IPF-sheet-${nn}`].desc, new RegExp(`(${r.semitones}|zero) semitone`)); assert.ok(reg[`IPF-sheet-${nn}`].ids.includes(`IPV-${10 + r.semitones}`))
  }
})
test('tritone shown with both spellings; C4 to B4 = 11 distinct from B4 to C5 = 1; inversion sums to 12', () => {
  const t = svgOf('IPF-sheet-06'); assert.match(t, /F♯4/); assert.match(t, /G♭4/); assert.match(t, /diminished fifth/i)
  const m = plain(svgOf('IPF-proof-C-map')); assert.match(m, /C4 to B4 is 11 semitones/); assert.match(m, /B4 to C5 is a different step of 1 semitone/)
  const iv = svgOf('IPF-invert'); for (const [a, b] of [[3, 9], [4, 8], [5, 7]]) assert.match(iv, new RegExp(`${a} \\+ ${b} = 12`))
  assert.match(svgOf('IPF-proof-B-p4-tt-p5'), /A4\/d5/)
})
test('proofs answer stayed/changed in the picture: m3 vs M3 and P4/tt/P5 tables', () => {
  const a = svgOf('IPF-proof-A-m3-M3'); assert.match(a, /WHAT STAYED, WHAT CHANGED/); assert.match(a, /\+1 semitone/); assert.ok(a.includes(T['IP-03'].hex) && a.includes(T['IP-04'].hex))
  const b = svgOf('IPF-proof-B-p4-tt-p5'); for (const h of ['IP-05', 'IP-06', 'IP-07']) assert.ok(b.includes(T[h].hex)); assert.match(b, /← F/); assert.match(b, /↔ both/); assert.match(b, /→ O/)
})
test('map marks all 13 pitches with their own colours and the 0 and 12 chips are N/A', () => {
  const m = svgOf('IPF-proof-C-map'); for (const v of Object.values(T)) assert.ok(m.includes(v.hex), v.hex); assert.equal((m.match(/N\/A/g) ?? []).length >= 2, true)
})
test('every info figure: screen + print SVG, title, desc, static; no audio, script or handlers; no art embedded as measure', () => {
  assert.ok(Object.keys(reg).length >= 61)
  for (const [id, e] of Object.entries<any>(reg)) for (const f of e.files) { const t = readFileSync(R(f), 'utf8'); assert.match(t, /<title/); assert.match(t, /<desc/); assert.doesNotMatch(t, /<script|\son[a-z]+=|<audio|<video|<image|<foreignObject|href=/i, id + f) }
})
test('review pages exist, art accents are aria-hidden, reference image not in bundle, no new paid art', () => {
  for (const p of ['info-proofs', 'info-intervals', 'info-cards', 'info-compare', 'info-tokens']) { const t = readFileSync(R(`public/soundscape/m05/sheets/${p}.html`), 'utf8'); assert.doesNotMatch(t, /<script/i); for (const m of t.matchAll(/<img class="accent"[^>]*>/g)) assert.match(m[0], /aria-hidden="true"/) }
  const walk = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(d + '/' + e.name) : [d + '/' + e.name])
  assert.ok(!walk(R('public')).some(f => /APPROVED_ART_DIRECTION_REFERENCE/i.test(f)))
  const ledger = JSON.parse(readFileSync(R('docs/m05/ledger.json'), 'utf8')); assert.equal(ledger.calls.length, 21)
})
