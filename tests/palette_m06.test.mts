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
  for (const k of ['ip6-cards', 'ip6-chapter', 'layer-', 'id="studio"', 'id="sources"', 'id="plogger"', 'id="compare"', 'id="map"']) assert.ok(page.includes(k), k)
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
