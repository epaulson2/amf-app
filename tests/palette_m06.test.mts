import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { INTERVALS, ATLAS } from '../lib/soundscape/resources/palette'
import { INTERVAL_IDENTITY_COLORS_V1 as T, PLOGGER_LENS_V1 as L, hasPlogger, contrast, PAPER } from '../lib/soundscape/resources/interval-identity'
const R = (p: string) => new URL('../' + p, import.meta.url).pathname
const src = (p: string) => readFileSync(R(p), 'utf8')
const page = src('components/soundscape/m06/PaletteLibrary.tsx') + src('app/curriculum/soundscape-path/resources/interval-palette/page.tsx')
const svg = (id: string) => src(`public/soundscape/m05/info/${id}.svg`)

test('13 canonical colours are the single authority: palette.ts derives from them; interval-data.json keeps legacy as provenance', () => {
  assert.equal(INTERVALS.length, 13)
  for (const r of INTERVALS) { assert.equal(r.color.hex, T[r.id].hex); assert.ok(contrast(T[r.id].hex, PAPER) >= 3, r.id) }
  assert.ok(!/#[0-9a-f]{6}/i.test(src('components/soundscape/m06/PaletteLibrary.tsx')), 'no hard-coded hex in the page component')
})
test('13/13 cards, 13/13 chapters with all seven sections, six deeper layers', () => {
  assert.equal(ATLAS.chapters.length, 13); assert.equal(ATLAS.layers.length, 6)
  for (const r of INTERVALS) { assert.equal(r.deep.sections.length, 7); for (const [, v] of r.deep.sections) assert.ok(v.length > 20, r.id); assert.ok(existsSync(R(`public/soundscape/m05/info/IPF-card-${String(r.semitones).padStart(2, '0')}.svg`))); assert.ok(existsSync(R(`public/soundscape/m05/info/IPF-sheet-${String(r.semitones).padStart(2, '0')}.print.svg`))) }
  for (const k of ['ip6-gal', 'ip6-chapter', 'layer-', 'id="studio"', 'id="sources"', 'id="plogger"', 'id="compare"', 'id="map"']) assert.ok(page.includes(k), k)
})
test('11/11 Plogger entries and N/A for 0 and 12', () => {
  assert.equal(Object.keys(L).length, 11); assert.ok(!hasPlogger(0) && !hasPlogger(12))
  for (const n of [0, 12]) assert.match(svg(`IPF-sheet-${String(n).padStart(2, '0')}`), /N\/A/)
  for (let n = 1; n <= 11; n++) assert.match(svg(`IPF-sheet-${String(n).padStart(2, '0')}`), new RegExp(`\\[${n}\\]`))
})
test('spelling and distances: tritone both spellings, C4-B4 = 11 vs B4-C5 = 1', () => {
  const t = svg('IPF-sheet-06'); assert.match(t, /F♯4/); assert.match(t, /G♭4/)
  assert.match(page, /C4 to B4 is 11 semitones/); assert.match(page, /B4 to C5 is a different/)
  assert.equal(INTERVALS[11].upperMidi - INTERVALS[11].lowerMidi, 11)
})
test('redesigned Palette has no audio engine, no music controls, no client music state', () => {
  assert.doesNotMatch(page, /AudioProvider|useAudio|StopButton|NowPlaying|PATCHES|compareEvents|pairEvents|<audio|<video|type="color"|aria-pressed|onClick|useState/)
  assert.match(src('components/soundscape/m06/HashOpen.tsx'), /'use client'/)
  for (const p of ['IPF-card-04', 'IPF-sheet-04', 'IPF-proof-C-map']) assert.doesNotMatch(svg(p), /<script|<audio|\son[a-z]+=/i)
})
test('Week 2 lesson code and the legacy compact palette are untouched; old route anchors preserved', () => {
  assert.match(src('components/soundscape/week2/Lesson2A.tsx'), /CompactPalette/)
  assert.ok(page.includes('id={r.anchor}'))
})

test('M10: learner copy has no implementation jargon, and every Plogger/legend string is clean', async () => {
  const { PLOGGER_LINEAGE } = await import('../lib/soundscape/resources/interval-identity')
  const fs = await import('node:fs')
  const learner = [PLOGGER_LINEAGE, fs.readFileSync('lib/soundscape/m05/info-svg.ts', 'utf8').split('export function legend')[1].split('assembly helpers')[0], JSON.stringify(ATLAS.editorial)].join('\n')
  for (const bad of ['R2_pictograph', 'DiChordPictograph', '.tsx', 'interval-identity.ts', 'Founder-uploaded', 'Older code']) assert.ok(!learner.includes(bad), bad)
})

test('M10 P4: the 13 Batch 2 teaching sheets match canonical data, registry hashes, and are safe', async () => {
  const { createHash } = await import('node:crypto')
  const reg = JSON.parse(src('lib/soundscape/resources/sheets-v2.json'))
  const SH: Record<string, string> = { jagged: 'Jagged', rounded: 'Rounded', straight: 'Straight' }, DR: Record<string, string> = { F: 'Fundamental', both: 'Both', O: 'Octave' }, FL: Record<string, string> = { dark: 'Dense', light: 'Open', neutral: 'Midtone', half: 'Hatched' }
  assert.equal(Object.keys(reg).length, 13)
  for (const r of INTERVALS) {
    const nn = String(r.semitones).padStart(2, '0'), D = 'public/soundscape/resources/interval-palette/sheets-v2'
    for (const v of ['desktop', 'mobile']) {
      const png = readFileSync(R(`${D}/png/IPF-sheet-${nn}.${v}.png`)), sv = readFileSync(R(`${D}/svg/IPF-sheet-${nn}.${v}.svg`), 'utf8')
      assert.equal(createHash('sha256').update(png).digest('hex'), reg[nn][v].png_sha256, `${nn} ${v} png hash`)
      assert.equal(createHash('sha256').update(sv).digest('hex'), reg[nn][v].svg_sha256, `${nn} ${v} svg hash`)
      assert.doesNotMatch(sv, /<script|<foreignObject|\son[a-z]+=|href="https?:|url\(https?:/i, `${nn} ${v} svg safety`)
      const t = sv.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
      assert.ok(t.includes(r.upperName.replace(/\s.*$/, '')), `${nn} ${v} upper note ${r.upperName}`)
      assert.ok(t.includes(`${r.semitones} semitone`), `${nn} ${v} semitone count`)
      if (hasPlogger(r.semitones)) { const e = L[r.semitones]; assert.ok(t.includes(`Shape: ${SH[e.shape]}`) && t.includes(`Direction: ${DR[e.dir]}`) && t.includes(`Fill: ${FL[e.fill]}`), `${nn} ${v} plogger`) }
      else assert.ok(/N\/A at this boundary/.test(t), `${nn} ${v} N/A`)
      assert.ok(sv.toUpperCase().includes(T[r.id].hex.toUpperCase()), `${nn} identity colour`)
    }
  }
  assert.ok(/C4\s+to\s+D♭4/.test(readFileSync(R('public/soundscape/resources/interval-palette/sheets-v2/svg/IPF-sheet-01.desktop.svg'), 'utf8')), 'IP-01 stays C4 to D♭4')
})
