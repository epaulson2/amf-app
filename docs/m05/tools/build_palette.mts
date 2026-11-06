// M05 native Interval Palette figures. Deterministic SVG from lib/soundscape/resources/interval-data.json. No audio, no script, no interaction.
// Run: node --experimental-strip-types --no-warnings --import ./tests/register.mjs docs/m05/tools/build_palette.mts
import { svg, keyboard, hops, stack, para, txt, heading, INK, WINE, MUTED, PAD, lanes, registry, save, type Ctx, type Mark } from './native_core'
import { INTERVALS, type IntervalRecord } from '../../../lib/soundscape/resources/palette'

const strip = (n: string) => n.replace(/\d/g, '')
const LET: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }
const letterNum = (n: string) => LET[n[0]] + 7 * Number(n.match(/\d/)![0])
const span = (r: IntervalRecord) => letterNum(r.upperName) - letterNum(r.lowerName) + 1
const BY = (s: number) => INTERVALS.find(i => i.semitones === s)!
const SRC = 'lib/soundscape/resources/interval-data.json (IP-00…IP-12, C4 = MIDI 60, 12-TET)'
const ORD = ['', 'unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave']
const G = 'IPALETTE'

const isWhite = (m: number) => [0, 2, 4, 5, 7, 9, 11].includes(((m % 12) + 12) % 12)
/** Marks for one interval on a C-window keyboard. Black keys are drawn as real highlighted black keys. */
function marksFor(r: IntervalRecord, lowerTone: Mark['tone'] = 'lower'): Record<number, Mark> {
  if (r.semitones === 0) return { [r.lowerMidi]: { tone: 'home', label: strip(r.lowerName) } }
  return { [r.lowerMidi]: { tone: lowerTone, label: strip(r.lowerName) }, [r.upperMidi]: { tone: 'upper', label: strip(r.upperName) } }
}
const kbOf = (c: Ctx, marks: Record<number, Mark>, scale = 1, y = 0, cMidi = 60, letters: 'all' | 'c' | 'none' = 'none') => keyboard(c, { whites: 8, cMidi, scale, letters, marks }, 0, y)
const caption = (x: number, y: number, s: string, w: number, size = 14.5) => para(x, y, s, w, { size, fill: '#5c465b', sans: true })

/** Card plate: heading, keyboard C4..C5, numbered semitone hops, the written name and letter count. */
function plate(c: Ctx, r: IntervalRecord) {
  const k = kbOf(c, marksFor(r), 1, 56)
  let body = txt(PAD, 26, r.name, { size: 27, fill: '#4c2748' }) + txt(PAD, 46, `${r.id} · ${r.abbr} · ${r.semitones} SEMITONE${r.semitones === 1 ? '' : 'S'}`, { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.4 }) + k.body
  let h = 56 + k.h
  if (r.semitones > 0) { const y = k.keyBottom! + 14, p = hops(c, k, r.lowerMidi, r.upperMidi, y, { total: `${r.semitones} semitone${r.semitones === 1 ? '' : 's'}` }); body += p.svg; h = y + p.h }
  else { body += txt(k.w / 2, k.keyBottom! + 34, '0 semitones: the same key', { size: 17, weight: 700, anchor: 'middle', fill: WINE }); h = k.keyBottom! + 50 }
  const lines = [`${strip(r.lowerName)}4 to ${strip(r.upperName)}${r.upperName.match(/\d/)![0]}` + ` · ${span(r)} letter name${span(r) === 1 ? '' : 's'} counted inclusively`]
  if (r.altSpelling) lines.push(`Same key, other spelling: ${strip(r.altSpelling.lower)}4 to ${strip(r.altSpelling.upper)}4 is a ${r.altSpelling.name.toLowerCase()}`)
  lines.forEach((l, i) => { body += txt(PAD, h + 20 + i * 20, l, { size: 14.5, fill: '#5c465b', sans: true }) }); h += 14 + lines.length * 22
  return { w: k.w, h, body }
}
for (const r of INTERVALS) {
  const idn = 10 + r.semitones, id = `IPV-${idn}-native`
  svg(id, { group: G, ids: [`IPV-${idn}`, r.id], art: `IPV-${idn}`, source: SRC, teach: `${r.name}: ${r.lowerName}–${r.upperName}, ${r.semitones} semitones.` }, c => {
    const p = plate(c, r)
    const desc = `A piano keyboard from C4 to C5 with ${r.semitones === 0 ? 'C4 highlighted (both notes are the same key)' : `${r.lowerName} and ${r.upperName} highlighted`}. ${r.name}, ${r.abbr}: ${r.semitones} semitones, counted as ${r.semitones} one-key hops${r.altSpelling ? `; the same key can also be written ${r.altSpelling.upper} as a ${r.altSpelling.name.toLowerCase()}` : ''}.`
    return { title: `${r.name} (${r.abbr}) on the keyboard`, desc, w: p.w, h: p.h, body: p.body }
  })
}

// IPV-04 What is an interval? C4 -> E4 as the one beginner example.
svg('IPV-04-native', { group: G, ids: ['IPV-04'], art: 'IPV-04', source: SRC, teach: 'Interval = distance between two pitches; worked example C4→E4 = 4 semitones.' }, c => {
  const r = BY(4), k = kbOf(c, marksFor(r), 1, 12), y = k.keyBottom! + 14, p = hops(c, k, 60, 64, y, { total: '4 semitones: C to E' })
  const t = para(PAD, y + p.h + 22, 'An interval measures the distance between two notes. Count every key, white and black, from C up to E: four hops.', k.w - 2 * PAD, { size: 15, fill: '#5c465b', sans: true })
  return { title: 'Interval example: C4 to E4', desc: 'A keyboard from C4 to C5 with C4 and E4 highlighted and four numbered semitone hops between them: C to C-sharp, to D, to D-sharp, to E. The distance, four semitones, is the interval.', w: k.w, h: y + p.h + 22 + t.h + 6, body: k.body + p.svg + t.svg }
})

// IPV-05 Melodic versus harmonic: the SAME pair C4+E4.
svg('IPV-05-native', { group: G, ids: ['IPV-05'], art: 'IPV-05', source: SRC, teach: 'Same two notes, played one after another (melodic) or together (harmonic).' }, c => {
  const W = 640
  const mel = lanes(c, [{ name: 'Lower note', tone: 'lower', events: [{ midi: 60, start: 0, dur: 2 }] }, { name: 'Upper note', tone: 'upper', events: [{ midi: 64, start: 2, dur: 2 }] }], 4, { w: W, tick: 1, y0: 26 })
  const har = lanes(c, [{ name: 'Lower note', tone: 'lower', events: [{ midi: 60, start: 0, dur: 4 }] }, { name: 'Upper note', tone: 'upper', events: [{ midi: 64, start: 0, dur: 4 }] }], 4, { w: W, tick: 1, y0: 26 })
  const s = stack([{ body: heading(0, 14, 'ONE AFTER ANOTHER · MELODIC (C4 THEN E4)') + mel.body, h: mel.h + 26 }, { body: heading(0, 14, 'TOGETHER · HARMONIC (C4 WITH E4)') + har.body, h: har.h + 26 }], 22)
  return { title: 'The same two notes, melodic and harmonic', desc: 'Two time strips for the same notes, C4 and E4. In the first strip C4 sounds during seconds 0 to 2 and then E4 during seconds 2 to 4, one after another. In the second both notes last the whole 4 seconds, together. The distance is four semitones in both.', w: W, h: s.h, body: s.body }
})

// IPV-06 Keyboard orientation: black-key groups and why C→D crosses a black key but E→F does not.
svg('IPV-06-native', { group: G, ids: ['IPV-06'], art: 'IPV-06', source: SRC, teach: 'Letter names vs semitones; two-then-three black keys; C→D = 2 semitones, E→F = 1.' }, c => {
  const mk = (a: number, b: number): Record<number, Mark> => ({ [a]: { tone: 'lower', label: ['C', 'D', 'E', 'F'][[60, 62, 64, 65].indexOf(a)] }, [b]: { tone: 'upper', label: ['C', 'D', 'E', 'F'][[60, 62, 64, 65].indexOf(b)] } })
  const k1 = keyboard(c, { whites: 8, cMidi: 60, letters: 'all', groups: true, marks: mk(60, 62) }, 0, 0); const y1 = k1.keyBottom! + 14, h1 = hops(c, k1, 60, 62, y1, { total: 'C to D: 2 semitones (a black key sits between)' })
  const k2 = keyboard(c, { whites: 8, cMidi: 60, letters: 'all', groups: false, marks: mk(64, 65) }, 0, 0)
  const s = stack([{ body: k1.body + h1.svg, h: y1 + h1.h }, { body: k2.body + hops(c, k2, 64, 65, k2.keyBottom! + 14, { total: 'E to F: 1 semitone (no black key between)' }).svg, h: k2.keyBottom! + 14 + 84 }], 24)
  return { title: 'Reading the keyboard: white-key neighbours are not always one semitone', desc: 'A keyboard from C4 to C5 showing black keys in groups of two then three. C to D spans two semitones because C-sharp sits between them. E to F spans only one semitone because there is no black key between E and F.', w: k1.w, h: s.h, body: s.body }
})

// IPV-07 / IPV-30: the thirteen landmarks on an exact 0-12 ruler. Wide plus narrow list.
const rulerWide = (c: Ctx, full: boolean) => {
  const W = full ? 1040 : 920, x0 = 40, pw = W - 80, X = (s: number) => x0 + (s / 12) * pw, y = full ? 150 : 100
  let b = heading(PAD, 20, 'THIRTEEN LANDMARKS · SEMITONES ABOVE C4 (EQUAL-TEMPERED)') + `<path d="M${x0} ${y} H${x0 + pw}" stroke="#a3778f" stroke-width="2"/>`
  INTERVALS.forEach(r => {
    const up = full && r.semitones % 2 === 1, x = X(r.semitones), dir = up ? -1 : 1
    b += `<circle cx="${x}" cy="${y}" r="9" fill="${c.print ? '#fff' : '#f6b94f'}" stroke="${WINE}" stroke-width="2"/>` + txt(x, y + 4.5, String(r.semitones), { size: 11, weight: 700, anchor: 'middle', fill: INK, sans: true })
    const ty = y + dir * 30
    b += txt(x, ty + (up ? 0 : 6), r.abbr.includes('/') ? 'A4/d5' : r.abbr, { size: 17, weight: 700, anchor: 'middle', fill: '#4c2346' })
    if (full) b += txt(x, ty + dir * 18 + (up ? -2 : 6), r.name.replace('Perfect ', 'P. ').replace('Minor ', 'min. ').replace('Major ', 'maj. '), { size: 11, anchor: 'middle', fill: MUTED, sans: true, halo: true }) + txt(x, ty + dir * 34 + (up ? -4 : 8), `${strip(r.lowerName)}–${strip(r.altSpelling ? r.upperName + '/' + r.altSpelling.upper : r.upperName)}`.replace(/(\D)4/g, '$1'), { size: 11, anchor: 'middle', fill: '#8a6f85', sans: true, halo: true })
  })
  return { w: W, h: full ? 250 : 150, body: b }
}
svg('IPV-07-native', { group: G, ids: ['IPV-07'], art: 'IPV-07', source: SRC, teach: 'Increasing measured distance, 0–12 semitones; not an order of tension.' }, c => { const p = rulerWide(c, false); return { title: 'Thirteen intervals on a 0 to 12 semitone ruler', desc: 'A ruler from 0 to 12 semitones above C4 with thirteen marked landmarks in order: P1, m2, M2, m3, M3, P4, A4 or d5, P5, m6, M6, m7, M7, P8. The ruler shows measured distance only.', ...p } })
svg('IPV-30-native', { group: G, ids: ['IPV-30'], art: 'IPV-30', source: SRC, teach: 'The thirteen landmarks with names and note pairs, exact positions.' }, c => { const p = rulerWide(c, true); return { title: 'The thirteen interval landmarks with note pairs', desc: 'A 0 to 12 semitone ruler with each landmark named and paired with its notes above C4, from the perfect unison C to C through the tritone C to F-sharp or G-flat up to the perfect octave C to C. Positions are exact semitone counts.', ...p } })
svg('IPV-30-narrow', { group: G, ids: ['IPV-30'], art: 'IPV-30', source: SRC, teach: 'Narrow vertical list of the thirteen landmarks for phones.', kind: 'responsive variant' }, c => {
  const row = 34; let b = heading(PAD, 18, 'THIRTEEN LANDMARKS · SEMITONES ABOVE C4', 330)
  INTERVALS.forEach((r, i) => { const y = 38 + i * row; b += `<circle cx="22" cy="${y + 8}" r="12" fill="${c.print ? '#fff' : '#f6b94f'}" stroke="${WINE}" stroke-width="2"/>` + txt(22, y + 13, String(r.semitones), { size: 13, weight: 700, anchor: 'middle', fill: INK, sans: true }) + txt(50, y + 13, `${r.abbr} · ${r.name}`, { size: 15, weight: 600, fill: '#4c2346', sans: true }) + txt(330, y + 13, `${strip(r.lowerName)}–${strip(r.upperName)}${r.altSpelling ? ` / ${strip(r.altSpelling.upper)}` : ''}`, { size: 15, anchor: 'end', fill: '#6a5668', sans: true }) })
  return { title: 'Thirteen interval landmarks (list)', desc: 'The thirteen intervals from 0 to 12 semitones above C4, listed with abbreviation, name and note pair.', w: 346, h: 46 + 13 * row, body: b }
})

// Mini keyboard helpers for comparison figures.
function mini(c: Ctx, pairs: { lower: number; ll: string; upper: number; ul: string; tone?: Mark['tone'] }[], o: { cMidi?: number; scale?: number; title?: string; total?: string; note?: string } = {}) {
  const s = o.scale ?? 0.72, k = keyboard(c, { whites: 8, cMidi: o.cMidi ?? 60, scale: s, letters: 'none', marks: Object.fromEntries(pairs.flatMap(p => [[p.lower, { tone: p.tone ?? 'home', label: p.ll }], [p.upper, { tone: 'upper', label: p.ul }]])) }, 0, o.title ? 24 : 0)
  let b = (o.title ? txt(PAD, 16, o.title, { size: 16, weight: 700, fill: '#4c2346' }) : '') + k.body; let h = k.h + (o.title ? 24 : 0)
  const p0 = pairs[0], y = k.keyBottom! + 10; const hp = hops(c, k, p0.lower, p0.upper, y, { size: 13, total: o.total ?? `${Math.abs(p0.upper - p0.lower)} semitone${Math.abs(p0.upper - p0.lower) === 1 ? '' : 's'}` }); b += hp.svg; h = y + hp.h
  return { w: k.w, h, body: b }
}
function diptych(id: string, ids: string[], a: IntervalRecord, b2: IntervalRecord, learn: string) {
  svg(id, { group: G, ids, art: ids[0], source: SRC, teach: `${a.name} (${a.semitones}) versus ${b2.name} (${b2.semitones}).` }, c => {
    const pa = mini(c, [{ lower: a.lowerMidi, ll: strip(a.lowerName), upper: a.upperMidi, ul: strip(a.upperName) }], { title: `${a.name} · ${a.abbr} · ${a.semitones}` })
    const pb = mini(c, [{ lower: b2.lowerMidi, ll: strip(b2.lowerName), upper: b2.upperMidi, ul: strip(b2.upperName) }], { title: `${b2.name} · ${b2.abbr} · ${b2.semitones}` })
    const gap = 36, w = pa.w * 2 + gap, ch = para(PAD, Math.max(pa.h, pb.h) + 26, learn, w - 2 * PAD, { size: 15, fill: '#5c465b', sans: true })
    const body = pa.body + `<g transform="translate(${pa.w + gap} 0)">${pb.body}</g>` + ch.svg
    return { title: `${a.name} compared with ${b2.name}`, desc: `Two keyboards, each from C4 to C5. The first highlights ${a.lowerName} and ${a.upperName}, ${a.semitones} semitone${a.semitones === 1 ? '' : 's'}. The second highlights ${b2.lowerName} and ${b2.upperName}, ${b2.semitones} semitones. The lower note C4 stays; the upper note moves one key.`, w, h: Math.max(pa.h, pb.h) + 26 + ch.h + 6, body }
  })
}
diptych('IPV-23-native', ['IPV-23'], BY(1), BY(2), 'What stayed: C4. What changed: the upper note moved one more key, so one semitone became two.')
diptych('IPV-24-native', ['IPV-24'], BY(3), BY(4), 'What stayed: C4. What changed: E♭ became E, one key higher, so three semitones became four. This single change is what later separates minor and major triads.')
diptych('IPV-26-native', ['IPV-26'], BY(8), BY(9), 'What stayed: C4. What changed: A♭ became A, one key higher, so eight semitones became nine.')
diptych('IPV-27-native', ['IPV-27'], BY(10), BY(11), 'What stayed: C4. What changed: B♭ became B, one key higher, so ten semitones became eleven. C4 to B4 is 11 semitones; the melodic step B4 to C5 is a different, single semitone.')
diptych('IPV-09-native', ['IPV-09'], BY(5), BY(7), 'Reusable layout: one anchor note stays, one measured variable changes, and the semitone difference is printed from the data.')

// IPV-25 four / tritone / five.
svg('IPV-25-native', { group: G, ids: ['IPV-25'], art: 'IPV-25', source: SRC, teach: 'Five, six, seven semitones; tritone spelling.' }, c => {
  const rs = [BY(5), BY(6), BY(7)], ps = rs.map(r => mini(c, [{ lower: r.lowerMidi, ll: 'C', upper: r.upperMidi, ul: r.semitones === 6 ? 'F♯' : strip(r.upperName) }], { title: `${r.name} · ${r.abbr} · ${r.semitones}`, scale: 0.6, total: `${r.semitones} semitones` }))
  const gap = 26, w = ps.reduce((a, p) => a + p.w, 0) + gap * 2; let x = 0, body = ''
  ps.forEach(p => { body += `<g transform="translate(${x} 0)">${p.body}</g>`; x += p.w + gap })
  const h = Math.max(...ps.map(p => p.h)), ch = para(PAD, h + 24, 'The tritone is 6 semitones. Written F♯ above C it is an augmented fourth; written G♭ above C it is a diminished fifth. It is the same key either way.', w - 2 * PAD, { size: 15, fill: '#5c465b', sans: true })
  return { title: 'Perfect fourth, tritone and perfect fifth', desc: 'Three keyboards from C4 to C5 with C4 as the shared lower note and the upper note at F4 (5 semitones, perfect fourth), F-sharp4 (6 semitones, tritone, also written G-flat4) and G4 (7 semitones, perfect fifth).', w, h: h + 24 + ch.h + 6, body: body + ch.svg }
})

// IPV-28 same interval, three registers: structure is identical, perception depends on register and sound.
svg('IPV-28-native', { group: G, ids: ['IPV-28'], art: 'IPV-28', source: SRC, teach: 'One interval, three registers; no universal consonance scale.' }, c => {
  const regs = [{ c0: 36, n: 'C2 + G2', t: 'low register' }, { c0: 60, n: 'C4 + G4', t: 'middle register' }, { c0: 84, n: 'C6 + G6', t: 'high register' }]
  const ps = regs.map(r => mini(c, [{ lower: r.c0, ll: 'C', upper: r.c0 + 7, ul: 'G' }], { cMidi: r.c0, title: `${r.t} · ${r.n}`, scale: 0.6, total: '7 semitones' }))
  const gap = 26, w = ps.reduce((a, p) => a + p.w, 0) + gap * 2; let x = 0, body = ''
  ps.forEach(p => { body += `<g transform="translate(${x} 0)">${p.body}</g>`; x += p.w + gap })
  const h = Math.max(...ps.map(p => p.h)), ch = para(PAD, h + 24, 'The interval is the same, 7 semitones, in every register. How blended or rough it sounds also depends on register, instrument, tuning and context, so the key pattern alone cannot rank intervals from smooth to rough.', w - 2 * PAD, { size: 15, fill: '#5c465b', sans: true })
  return { title: 'The same interval in three registers', desc: 'Three keyboards showing the same perfect fifth, 7 semitones, built from C in a low, a middle and a high register. The distance is identical; the sound you get depends on register and instrument.', w, h: h + 24 + ch.h + 6, body: body + ch.svg }
})

// IPV-29 inversion: sums to 12 semitones, numbers sum to 9.
svg('IPV-29-native', { group: G, ids: ['IPV-29'], art: 'IPV-29', source: SRC, teach: 'Inversion pairs m3↔M6, M3↔m6, P4↔P5: semitones add to 12.' }, c => {
  const rows = [[BY(3), BY(9)], [BY(4), BY(8)], [BY(5), BY(7)]]; const parts = rows.map(([a, b]) => {
    const pa = mini(c, [{ lower: a.lowerMidi, ll: strip(a.lowerName), upper: a.upperMidi, ul: strip(a.upperName) }], { title: `${a.abbr} · ${a.semitones}`, scale: 0.5, total: `${a.semitones}` })
    const pb = mini(c, [{ lower: a.upperMidi, ll: strip(a.upperName), upper: a.lowerMidi + 12, ul: 'C' }], { title: `${b.abbr} · ${b.semitones}`, scale: 0.5, total: `${b.semitones}` })
    const gap = 70, w = pa.w * 2 + gap
    return { w, h: Math.max(pa.h, pb.h), body: pa.body + txt(pa.w + gap / 2, 80, '→', { size: 28, anchor: 'middle', fill: WINE }) + `<g transform="translate(${pa.w + gap} 0)">${pb.body}</g>` + txt(w / 2, Math.max(pa.h, pb.h) + 20, `${a.semitones} + ${b.semitones} = 12 semitones; numbers ${span(a)} + ${span(b)} = 9`, { size: 14, weight: 700, anchor: 'middle', fill: WINE, sans: true }) }
  })
  const s = stack(parts.map(p => ({ body: p.body, h: p.h + 30 })), 18)
  return { title: 'Inversion: moving the lower note up an octave', desc: 'Three pairs. Take the lower note and move it up an octave. A minor third of 3 semitones (C to E-flat) becomes a major sixth of 9 (E-flat to C). A major third of 4 becomes a minor sixth of 8. A perfect fourth of 5 becomes a perfect fifth of 7. Each pair adds to 12 semitones; the interval numbers add to 9.', w: parts[0].w, h: s.h, body: s.body }
})

// IPV-34 naming by letters (Atlas layer B) and IPV-35 added third note (Atlas layer D). Documented extensions of the IPV sequence.
svg('IPV-34-native', { group: G, ids: ['IPV-34'], art: 'IPV-08', source: SRC + '; atlas layer B', teach: 'An interval name comes from letter distance as well as semitones: same key, two spellings.' }, c => {
  const m3 = mini(c, [{ lower: 60, ll: 'C', upper: 63, ul: 'E♭' }], { title: 'C to E♭: a minor third', scale: 0.62, total: '3 semitones' })
  const a2 = mini(c, [{ lower: 60, ll: 'C', upper: 63, ul: 'D♯' }], { title: 'C to D♯: an augmented second', scale: 0.62, total: '3 semitones' })
  const gap = 34, w = m3.w * 2 + gap, ch = para(PAD, Math.max(m3.h, a2.h) + 24, 'Same two keys, 3 semitones. Spelled E♭, the letters C D E make a third (minor third). Spelled D♯, the letters C D make a second (augmented second).', w - 2 * PAD, { size: 15, fill: '#5c465b', sans: true })
  return { title: 'Same key, two interval names', desc: 'Two keyboards with the same two keys highlighted, C4 and the black key above D. First it is spelled E-flat: letters C, D, E make a third, so it is a minor third. Second it is spelled D-sharp: letters C, D make a second, so it is an augmented second. Both are 3 semitones.', w, h: Math.max(m3.h, a2.h) + 24 + ch.h + 6, body: m3.body + `<g transform="translate(${m3.w + gap} 0)">${a2.body}</g>` + ch.svg }
})
svg('IPV-35-native', { group: G, ids: ['IPV-35'], art: 'IPV-08', source: SRC + '; atlas layer D', teach: 'Adding a third note changes the world: dyad C–E versus C–E–G versus C–E♭–G.' }, c => {
  const row = (title: string, ms: [number, string][], sub: string) => { const k = keyboard(c, { whites: 8, cMidi: 60, scale: 0.9, letters: 'none', marks: Object.fromEntries(ms.map(([m, l], i) => [m, { tone: i === 0 ? 'home' : i === 1 ? 'upper' : 'shared', label: l } as Mark])) }, 0, 24); const sp = para(PAD, k.h + 40, sub, k.w - 2 * PAD, { size: 14, fill: '#5c465b', sans: true }); return { w: k.w, h: k.h + 30 + sp.h, body: txt(PAD, 16, title, { size: 16, weight: 700, fill: '#4c2346' }) + k.body + sp.svg } }
  const rs = [row('Two notes: C and E', [[60, 'C'], [64, 'E']], 'a major third with nothing added'), row('Add G: C, E and G', [[60, 'C'], [64, 'E'], [67, 'G']], 'a C-major triad (C to E is 4 semitones, E to G is 3)'), row('Change E to E♭: C, E♭ and G', [[60, 'C'], [63, 'E♭'], [67, 'G']], 'a C-minor triad (C to E♭ is 3 semitones, E♭ to G is 4)')]
  const s = stack(rs, 14)
  return { title: 'Adding a third note changes the whole sound-world', desc: 'Three keyboards from C4. First C and E alone, a major third of 4 semitones. Second C, E and G together, a C-major triad. Third C, E-flat and G, a C-minor triad, where moving one key down changes the quality.', w: rs[0].w, h: s.h, body: s.body }
})
save()
console.log('native figures:', Object.keys(registry).length)
