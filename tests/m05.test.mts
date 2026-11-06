import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { INTERVALS } from '../lib/soundscape/resources/palette'
const R = (p: string) => new URL('../' + p, import.meta.url).pathname
const reg = JSON.parse(readFileSync(R('docs/m05/native_registry.json'), 'utf8')), art = JSON.parse(readFileSync(R('docs/m05/art_registry.json'), 'utf8')), cw = JSON.parse(readFileSync(R('docs/m05/crosswalk.json'), 'utf8')), der = JSON.parse(readFileSync(R('docs/m05/derived_registry.json'), 'utf8'))
test('13 interval plates map IPV-10..22 to IP-00..12 with exact semitones and no offset confusion', () => {
  assert.equal(INTERVALS.length, 13)
  for (const r of INTERVALS) {
    const id = `IPV-${10 + r.semitones}-native`; assert.ok(reg[id], id); assert.equal(r.upperMidi - r.lowerMidi, r.semitones); assert.equal(r.lowerMidi, 60)
    assert.equal(cw[`IPV-${10 + r.semitones}`].note.includes(r.id), true)
    assert.match(reg[id].desc, new RegExp(`${r.semitones} semitone`)) }
  assert.match(cw['IPV-01'].category, /system/); assert.ok(!cw['IPV-01'].note.includes('IP-01'))
})
test('every native figure has screen + print SVG, title, desc, and is static', () => {
  for (const [id, e] of Object.entries<any>(reg)) { if (e.type !== 'NATIVE-SVG') continue
    for (const f of e.files) { const t = readFileSync(R(f), 'utf8'); assert.ok(existsSync(R(f)), f); assert.match(t, /<title/); assert.match(t, /<desc/); assert.doesNotMatch(t, /<script|\son[a-z]+=|<audio|<video|<animate/i, id) }
    assert.equal(e.files.length, 2, id) } })
test('art is art-only transparent: 21 files, zero alpha border, ledger agrees', () => {
  assert.equal(Object.keys(art).length, 21)
  for (const [id, e] of Object.entries<any>(art)) { assert.equal(e.alpha.alpha_border_max, 0, id); assert.ok(existsSync(R(e.webp))); assert.match(e.full_prompt, /NO text/i) }
  const ledger = JSON.parse(readFileSync(R('docs/m05/ledger.json'), 'utf8')); assert.equal(ledger.calls.length, 21); assert.ok(ledger.calls.reduce((a: number, c: any) => a + c.cost_usd, 0) < ledger.cap_usd)
})
test('derived variants have zero alpha border', () => { for (const [id, e] of Object.entries<any>(der)) assert.equal(e.alpha_border_max, 0, id); assert.equal(Object.keys(der).length, 43) })
test('crosswalk covers IPV-01..35, none missing, IPV-33 deferred', () => { for (let i = 1; i <= 35; i++) assert.ok(cw[`IPV-${String(i).padStart(2, '0')}`], String(i)); assert.equal(cw['IPV-33'].classification, 'DEFER') })
test('tritone: 6 semitones, both spellings, same MIDI', () => { const t = INTERVALS.find(i => i.semitones === 6)!; assert.equal(t.upperMidi, 66); assert.equal(t.altSpelling!.midi, 66); assert.ok(/F♯/.test(t.upperName) && /G♭/.test(t.altSpelling!.upper)) })
test('inversion pairs add to 12', () => { for (const [a, b] of [[3, 9], [4, 8], [5, 7]]) assert.equal(a + b, 12) })
test('private reference image is not in the bundle', () => { const walk = (d: string): string[] => readdirSync(R(d), { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(d + '/' + e.name) : [d + '/' + e.name]); assert.ok(!walk('public/soundscape/m05').some(f => /reference/i.test(f))) })
