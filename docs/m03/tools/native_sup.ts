import { svg, html, fig, keyboard, hops, stack, para, txt, heading, INK, WINE, MUTED, PAD, nmm, registry, type Ctx, type Mark } from './native_core'
import { INTERVALS, type IntervalRecord } from '../../../lib/soundscape/resources/palette'
import atlas from '../../../lib/soundscape/resources/atlas.json'
import { readFileSync } from 'node:fs'

const strip = (n: string) => n.replace(/\d/g, '')
const SRC = 'lib/soundscape/resources/interval-data.json + atlas.json (13 cards / 13 chapters)'
const LROUTE = '/curriculum/soundscape-path/resources/interval-palette'
const LET: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }
const letterNum = (n: string) => LET[n[0]] + 7 * Number(n.match(/\d/)![0])
const span = (r: IntervalRecord) => letterNum(r.upperName) - letterNum(r.lowerName) + 1
export const family = (semis: number) => semis <= 3 ? 'a' : semis <= 7 ? 'b' : 'c'
const IV4 = INTERVALS.find(i => i.semitones === 4)!, IV5 = INTERVALS.find(i => i.semitones === 5)!, IV6 = INTERVALS.find(i => i.semitones === 6)!

/** One interval card plate: keyboard C..C, lower/upper keys, numbered semitone hops, names and counts from the Atlas record. */
function card(c: Ctx, r: IntervalRecord, scale = 1) {
  const white = (m: number) => [0, 2, 4, 5, 7, 9, 11].includes(m % 12)
  const marks: Record<number, Mark> = {}
  if (r.semitones === 0) marks[r.lowerMidi] = { tone: 'home', label: strip(r.lowerName) }
  else { marks[r.lowerMidi] = { tone: 'lower', label: strip(r.lowerName) }; if (white(r.upperMidi)) marks[r.upperMidi] = { tone: 'upper', label: strip(r.upperName) } }
  const head = `${r.id} · ${r.abbr}`
  const k = keyboard(c, { whites: 8, cMidi: 60, scale, letters: 'none', groups: false, marks }, 0, 56)
  let body = txt(PAD, 24, r.name, { size: 26, weight: 400, fill: '#4c2748' }) + txt(PAD, 44, head, { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.4 }) + k.body
  let h = 56 + k.h
  if (!white(r.upperMidi) && r.semitones > 0) body += `<circle cx="${k.xc!(r.upperMidi)}" cy="${k.keyTop! + 16}" r="9" fill="none" stroke="#3f9b92" stroke-width="3"/>` + txt(k.xc!(r.upperMidi), k.keyTop! + 46, strip(r.upperName), { size: 12, weight: 700, anchor: 'middle', fill: '#fff' })
  if (r.semitones > 0) { const y = k.keyBottom! + 14, p = hops(c, k, r.lowerMidi, r.upperMidi, y, { total: `${r.semitones} semitones` }); body += p.svg; h = y + p.h } else { body += txt(k.w / 2, k.keyBottom! + 30, '0 semitones: the same key', { size: 17, weight: 700, anchor: 'middle', fill: WINE }); h = k.keyBottom! + 40 }
  const line = `${strip(r.lowerName)} + ${strip(r.upperName)}` + (r.altSpelling ? `   (also spelled ${strip(r.altSpelling.lower)} + ${strip(r.altSpelling.upper)})` : '') + `   ·   ${span(r)} letter name${span(r) === 1 ? '' : 's'}`
  body += txt(PAD, h + 18, line, { size: 14.5, fill: '#5c465b', sans: true }); h += 30
  return { w: k.w, h, body, k }
}

export function buildSup() {
  // ---- T07: 13 card plates, T08: 13 chapter openers ----
  if (INTERVALS.length !== 13 || atlas.chapters.length !== 13) throw new Error('Atlas must keep 13 cards and 13 chapters')
  for (const r of INTERVALS) {
    const n = String(r.semitones).padStart(2, '0')
    svg(`T07-IP-${n}`, { group: 'SUP', art: `T07${family(r.semitones)}`, source: SRC, teach: `Atlas card ${r.id}: ${r.name}` }, c => { const p = card(c, r); return { title: `${r.name}: ${r.semitones} semitones`, desc: `${r.name} (${r.abbr}), ${strip(r.lowerName)} and ${strip(r.upperName)}, ${r.semitones} semitones apart, ${span(r)} letter names.`, w: p.w, h: p.h, body: p.body } })
    const ch = atlas.chapters.find(x => x.id === r.id)!
    svg(`T08-IP-${n}`, { group: 'SUP', art: `T08${family(r.semitones)}`, source: SRC, teach: `Atlas chapter opening ${r.id}` }, c => ({ title: `Atlas chapter ${r.id}: ${r.name}`, desc: `Chapter opening for ${ch.name}: ${r.semitones} semitones, ${strip(r.lowerName)} to ${strip(r.upperName)}.`, w: 960, h: 220,
      body: txt(0, 40, `${r.id} · ${r.abbr}`, { size: 14, weight: 700, fill: '#a67664', sans: true, ls: 2 }) + txt(0, 110, ch.name, { size: 56, weight: 400, fill: '#4c2748' }) + txt(0, 150, `${strip(r.lowerName)} to ${strip(r.upperName)}  ·  ${r.semitones} semitone${r.semitones === 1 ? '' : 's'}`, { size: 22, fill: '#8a6f85' }) + txt(0, 190, 'Full chapter below. The painted shapes are decoration, not a measurement.', { size: 14, italic: true, fill: MUTED, sans: true }) }))
  }
  // ---- T01 ----
  svg('T01-native', { group: 'SUP', art: 'D03', source: SRC + ' (card ' + IV4.id + ')', teach: 'how to read one interval card' }, c => {
    const p = card(c, IV4, 1.05); let ny = p.h + 22, notes = ''; for (const t of ['1  The name and its short code.', '2  The two notes: lower first, then upper.', '3  The keyboard: the lower key and the upper key, joined by numbered hops.', '4  The count: how many semitones apart.']) { const q = para(PAD, ny, t, p.w - 2 * PAD, { size: 15, fill: '#5c465b' }); notes += q.svg; ny += q.h + 6 }
    return { title: 'How to read an interval card', desc: `Example card: ${IV4.name}, ${strip(IV4.lowerName)} and ${strip(IV4.upperName)}, ${IV4.semitones} semitones. Numbered notes: 1 the name, 2 the two notes, 3 the keyboard with hops, 4 the semitone count.`, w: p.w, h: ny + 6, body: p.body + notes }
  })
  svg('D08-native', { group: '2A', art: 'D03', source: SRC, teach: 'first use of the Interval Palette: one example card; all 13 cards and 13 chapters remain' }, c => {
    const p = card(c, IV4, 1.05), t = txt(PAD, p.h + 22, `The Interval Palette keeps all ${INTERVALS.length} cards and ${atlas.chapters.length} deep chapters. This is one of them.`, { size: 14, italic: true, fill: MUTED, sans: true })
    return { title: 'A first Interval Palette card', desc: `${IV4.name}: ${strip(IV4.lowerName)} and ${strip(IV4.upperName)}, ${IV4.semitones} semitones. The palette holds 13 cards and 13 chapters.`, w: Math.max(p.w, 560), h: p.h + 34, body: p.body + t }
  })
  svg('T04-native', { group: 'SUP', art: 'D03', source: 'lib/soundscape/week2/fixtures.ts + keyboard geometry', teach: 'letter names versus semitone hops' }, c => {
    const a = fig(c, { head: 'C to E', kb: { whites: 3, scale: 1.1, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, hop: [60, 64], hopTotal: '4 semitones', caption: 'Letters: C D E = 3 names. Keys: 4 semitones.' })
    const b = fig(c, { head: 'B to F', kb: { start: 'B', whites: 5, cMidi: 48, scale: .9, letters: 'all', groups: false, marks: { 59: { tone: 'lower', label: 'B' }, 65: { tone: 'upper', label: 'F' } } }, hop: [59, 65], hopTotal: '6 semitones', caption: 'Letters: B C D E F = 5 names. Keys: 6 semitones.' })
    return { title: 'Letters versus semitone hops', desc: 'C to E uses three letter names (C D E) but spans four semitones. B to F uses five letter names (B C D E F) but spans six semitones.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  svg('T05-native', { group: 'SUP', art: 'E03', source: 'lesson: lib/soundscape/week2/fixtures.ts (B3-F4 = 6); Atlas: ' + IV6.id, teach: 'tritone lens: the lesson example and the Atlas card, kept separate' }, c => {
    const a = fig(c, { head: 'LESSON EXAMPLE: B TO F', kb: { start: 'B', whites: 5, cMidi: 48, scale: .9, letters: 'all', groups: false, marks: { 59: { tone: 'lower', label: 'B' }, 65: { tone: 'upper', label: 'F' } } }, hop: [59, 65], hopTotal: '6 semitones' })
    const b = card(c, IV6, .78), t = txt(0, 14, 'ATLAS CARD (A SEPARATE EXAMPLE)', { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.2 })
    return { title: 'The tritone lens', desc: `Left: B to F from the Week 2 lesson, six semitones. Right: the Atlas card ${IV6.name}, ${strip(IV6.lowerName)} and ${strip(IV6.upperName)}, six semitones. They are separate examples.`, w: a.w + b.w + 40, h: Math.max(a.h, b.h + 18), body: a.body + `<g transform="translate(${a.w + 40} 0)">${t}<g transform="translate(0 18)">${b.body}</g></g>` }
  })
  // ---- T09 ruler + sheets ----
  svg('T09-ruler', { group: 'SUP', source: SRC, teach: 'print-friendly semitone ruler C to C' }, c => {
    const k = keyboard(c, { whites: 8, cMidi: 60, scale: .95, letters: 'all', groups: false, marks: { 60: { tone: 'home', label: 'C' }, 72: { tone: 'home', label: 'C' } } }, 0, 6), y = k.keyBottom! + 12
    const p = hops(c, k, 60, 72, y, { total: '12 semitones = one octave', size: 13 })
    return { title: 'Semitone ruler: C to C', desc: 'Eight white keys C to the next C with twelve numbered semitone hops across the black and white keys: one octave.', w: k.w, h: y + p.h + 8, body: k.body + p.svg }
  })
  html('T09-printable', { group: 'SUP', source: SRC, teach: 'printable interval reference, all 13 cards' }, 'Interval reference (printable)',
    `<p class="eyebrow">Ajourné into Music · Week 2</p><h1>Interval reference</h1><p>Every interval counted two ways: by letter names, and by semitones (keys, black and white). Play each pair on your own keyboard.</p><img src="T09-ruler.svg" alt="Semitone ruler from C to the next C: twelve numbered hops, one octave."><table><thead><tr><th>Card</th><th>Name</th><th>Code</th><th>Notes</th><th>Semitones</th><th>Letter names</th></tr></thead><tbody>${INTERVALS.map(r => `<tr><td>${r.id}</td><td><a href="${LROUTE}#${r.anchor}">${r.name}</a></td><td>${r.abbr}</td><td>${strip(r.lowerName)} + ${strip(r.upperName)}${r.altSpelling ? ` (or ${strip(r.altSpelling.lower)} + ${strip(r.altSpelling.upper)})` : ''}</td><td>${r.semitones}</td><td>${span(r)}</td></tr>`).join('')}</tbody></table><p class="muted">Counting: one semitone is the very next key, white or black. Letter names are counted inclusively (C to E is C D E = 3). No colour or shape carries meaning here.</p>`,
    'Table of all thirteen intervals with notes, semitone counts and letter-name counts, plus a C-to-C semitone ruler.')
  html('T10-practice', { group: 'SUP', art: 'D03', source: SRC + ' (' + IV4.id + ', ' + IV5.id + ')', teach: 'practice one interval on your own keys, then compare another' }, 'Practice: one interval, physical keys',
    `<p class="eyebrow">Practice sheet</p><h1>One interval on your own keyboard</h1><div class="card"><strong>Today's interval: ${IV4.name}</strong> (${IV4.semitones} semitones): ${strip(IV4.lowerName)} + ${strip(IV4.upperName)}.</div><ol><li>Find ${strip(IV4.lowerName)} (the white key just left of a group of two black keys) and play it.</li><li>Count ${IV4.semitones} keys up, black and white, one at a time. Say the count out loud.</li><li>Land on ${strip(IV4.upperName)}. Play both notes together.</li></ol><h2>Compare another</h2><p>${IV5.name} (${IV5.semitones} semitones): ${strip(IV5.lowerName)} + ${strip(IV5.upperName)}. Play it the same way. What is different about how the top note sits above ${strip(IV5.lowerName)}?</p><p>Your words: ______________________________________________</p><p class="muted">The website does not play sound or check answers. Your keyboard is the instrument.</p>`,
    'A practice sheet for one interval and one comparison, using the learner’s own keyboard.')
  html('T06-atlas-key', { group: 'SUP', source: SRC, teach: 'Atlas reading key with ordinary links to all 13 chapters' }, 'How to read the Interval Atlas',
    `<p class="eyebrow">Interval Atlas</p><h1>Reading key</h1><p>Each card shows two notes (lower, upper), a keyboard with numbered semitone hops, and the count. Painted colour and shape are decoration; the numbers on the keys are the measurement.</p><h2>The thirteen cards and chapters</h2><ol>${INTERVALS.map(r => `<li><a href="${LROUTE}#${r.anchor}">${r.name}</a> · ${r.semitones} semitone${r.semitones === 1 ? '' : 's'}</li>`).join('')}</ol><p class="muted">Range shown: C to the next C. Nothing on this page plays sound.</p>`,
    'Reading key and ordinary links to all thirteen interval cards and chapters.')
  // ---- S12 legend, S05 setup, S03/S08 sheets ----
  svg('S12-native', { group: 'SUP', source: 'semantics used in the Week 1-2 figures', teach: 'how to read our pictures' }, c => {
    const rows: [string, string, string][] = [
      ['glow', 'A glowing centre is the note chosen as home in that exercise.', `<circle cx="30" cy="26" r="14" fill="${c.print ? '#ddd' : '#f6b94f'}" stroke="#c8811f" stroke-width="2"/>`],
      ['ribbon', 'A separate ribbon or bar is a distinct voice (a line of notes).', `<rect x="6" y="14" width="48" height="24" rx="12" fill="${c.print ? '#eee' : '#8fcdc6'}" stroke="#3f9b92" stroke-width="2"/>`],
      ['overlap', 'Where two shapes overlap, that is what the two situations share.', `<circle cx="22" cy="26" r="16" fill="none" stroke="#c8811f" stroke-width="2.2"/><circle cx="38" cy="26" r="16" fill="none" stroke="#3f9b92" stroke-width="2.2"/>`],
      ['solid / dotted', 'Solid means sounding. Dotted or dashed means resting or optional.', `<path d="M4 20 h52" stroke="#6d326e" stroke-width="3"/><path d="M4 34 h52" stroke="#6d326e" stroke-width="3" stroke-dasharray="3 6" stroke-linecap="round"/>`],
      ['numbers', 'Numbers on the keys or timelines are the measurement. Trust those.', `<path d="M6 36 h48 M6 30 v12 M18 32 v8 M30 30 v12 M42 32 v8 M54 30 v12" stroke="#6d326e" stroke-width="2"/>`],
    ]
    const body = rows.map(([t, d, ico], i) => { const y = i * 80; return `<g transform="translate(0 ${y})">${ico}</g>${txt(86, y + 12, t.toUpperCase(), { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.4 })}${para(86, y + 32, d, 460, { size: 15.5, fill: '#5c465b' }).svg}` }).join('')
    return { title: 'How to read our pictures', desc: 'Five symbols: a glow marks the chosen home note; a ribbon is a voice; overlap is what is shared; solid is sounding and dotted is rest or optional; numbers on keys and timelines are the measurement. The size and colour of painted shapes are decoration only.', w: 560, h: 5 * 80 + 34, body: body + txt(0, 5 * 80 + 20, 'The size and colour of painted shapes are decoration, never a measurement.', { size: 14, italic: true, fill: MUTED, sans: true }) }
  })
  svg('S05-native', { group: 'SUP', source: 'keyboard geometry', teach: 'set up your own keyboard: gentle sound, comfortable volume' }, c => {
    const k = fig(c, { head: 'YOUR KEYBOARD: LEFT IS LOWER, RIGHT IS HIGHER', kb: { topPad: 40, whites: 10, scale: .9, letters: 'none', groups: true, marks: {} }, extra: kk => txt(kk.xc!(60), kk.keyBottom! + 24, '← lower', { size: 14, anchor: 'middle', fill: MUTED, italic: true }) + txt(kk.xc!(76), kk.keyBottom! + 24, 'higher →', { size: 14, anchor: 'middle', fill: MUTED, italic: true }) })
    const knob = `<circle cx="40" cy="40" r="26" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#a3778f" stroke-width="2.4"/><path d="M40 40 L52 22" stroke="#6d326e" stroke-width="3.4" stroke-linecap="round"/>` + [-50, -20, 10, 40, 70].map(a => { const t = (a - 90) * Math.PI / 180; return `<path d="M${40 + 31 * Math.cos(t)} ${40 + 31 * Math.sin(t)} L${40 + 37 * Math.cos(t)} ${40 + 37 * Math.sin(t)}" stroke="#a3778f" stroke-width="2"/>` }).join('')
    const steps = ['1  Choose a gentle sound: a piano, a soft electric piano or a warm pad.', '2  Start with a comfortable, quiet volume. You can turn it up later.', '3  Notice the black keys: groups of two, then three. They are your map.'].map((t, i) => txt(100, 36 + i * 28, t, { size: 15.5, fill: '#5c465b' })).join('')
    const s = stack([k, { body: `<g>${knob}</g>${steps}`, h: 112 }], 14)
    return { title: 'Set up your own keyboard', desc: 'A drawing of a keyboard with black keys in groups of two, then three, then two; left is lower and right is higher. A generic volume knob and three steps: choose a gentle sound, set a comfortable volume, notice the black-key groups.', w: Math.max(k.w, 640), h: s.h, body: s.body }
  })
  html('S03-native', { group: 'SUP', source: 'static pathway (no interactive UI)', teach: 'how learning works: explain, see, play, notice, create' }, 'How learning works here',
    `<p class="eyebrow">Ajourné into Music</p><h1>How learning works here</h1><ol><li><strong>Read</strong> a short, plain explanation.</li><li><strong>See</strong> the picture and learn how to read it.</li><li><strong>Play</strong> it on your own keyboard. The website never plays sound for you.</li><li><strong>Notice</strong> what you hear and what changed.</li><li><strong>Create</strong> something small of your own.</li></ol><p class="muted">Pages are paged with ordinary Next and Previous links. There is nothing to click to reveal an answer.</p>`, 'Five static steps: read, see, play on your own keyboard, notice, create.')
  html('S08-native', { group: 'SUP', source: 'static navigation + legend', teach: 'lesson progress and picture legend' }, 'Lesson progress and picture legend',
    `<p class="eyebrow">Lesson navigation</p><h1>Step 3 of 7</h1><p>Use <a href="#prev">← Previous</a> and <a href="#next">Next →</a> to move between steps, or <a href="#week">Back to the week</a>. Progress is only a page count: nothing is scored or saved.</p><h2>How to read our pictures</h2><img src="S12-native.svg" alt="Legend: glow is the chosen home note, ribbon is a voice, overlap is what is shared, solid is sounding and dotted is rest or optional, numbers are the measurement.">`, 'Static page-count and Next/Previous pattern with the picture legend.')
  // ---- X07 six identities ----
  svg('X07-native', { group: 'SUP', source: 'drawer names in lib/soundscape/week1/lesson-1a.json (identical across all six lessons)', teach: 'the six enrichment categories' }, c => {
    const d = JSON.parse(readFileSync('lib/soundscape/week1/lesson-1a.json', 'utf8')).drawers as { id: string; head: string }[]
    const names = d.map(x => x.head.split(/\s[—–·-]\s/)[1].trim()); if (names.length !== 6) throw new Error('need exactly six drawers')
    const ink = c.print ? '#444' : '#6d326e', glow = c.print ? '#eee' : '#fbe0b0'
    const icons = [
      `<rect x="8" y="14" width="64" height="44" rx="6" fill="${glow}" stroke="${ink}" stroke-width="2.4"/><rect x="50" y="20" width="16" height="14" rx="2" fill="none" stroke="${ink}" stroke-width="2"/><path d="M14 42 h32 M14 50 h24" stroke="${ink}" stroke-width="2"/>`,
      `<circle cx="40" cy="36" r="8" fill="${glow}" stroke="${ink}" stroke-width="2.4"/><circle cx="40" cy="36" r="18" fill="none" stroke="${ink}" stroke-width="2"/><circle cx="40" cy="36" r="28" fill="none" stroke="${ink}" stroke-width="1.6"/>`,
      `<rect x="14" y="8" width="52" height="56" rx="5" fill="${glow}" stroke="${ink}" stroke-width="2.4"/><path d="M26 22 h30 M26 32 h30 M26 42 h22" stroke="${ink}" stroke-width="2"/><circle cx="14" cy="20" r="2.4" fill="${ink}"/><circle cx="14" cy="36" r="2.4" fill="${ink}"/><circle cx="14" cy="52" r="2.4" fill="${ink}"/>`,
      `<circle cx="22" cy="36" r="8" fill="${glow}" stroke="${ink}" stroke-width="2.4"/><path d="M38 24 q10 12 0 24 M48 16 q16 20 0 40 M58 8 q22 28 0 56" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`,
      `<circle cx="40" cy="36" r="28" fill="${glow}" stroke="${ink}" stroke-width="2.4"/><ellipse cx="40" cy="36" rx="12" ry="28" fill="none" stroke="${ink}" stroke-width="1.8"/><path d="M12 36 h56 M17 22 h46 M17 50 h46" stroke="${ink}" stroke-width="1.8"/>`,
      `<circle cx="30" cy="30" r="18" fill="none" stroke="#c8811f" stroke-width="2.4"/><circle cx="50" cy="30" r="18" fill="none" stroke="#3f9b92" stroke-width="2.4"/><circle cx="40" cy="48" r="18" fill="none" stroke="#7a4a8c" stroke-width="2.4"/>`]
    const body = names.map((n, i) => { const x = (i % 3) * 214, y = Math.floor(i / 3) * 128; const w = para(0, 0, n, 170, { size: 16, weight: 600 }); return `<g transform="translate(${x} ${y})"><g transform="translate(60 0)">${icons[i]}</g>${txt(100, 98, n, { size: Math.min(16, 190 / (n.length * .52)), weight: 600, anchor: 'middle' })}</g>` }).join('')
    return { title: 'Six enrichment categories', desc: `The six categories in every lesson: ${names.join(', ')}. Each has a simple icon and its name written in text.`, w: 640, h: 254, body }
  })
  // ---- X08 research navigation ----
  const LES = [['1A', 'week-1/lesson-1a', 'week1/lesson-1a'], ['1B', 'week-1/lesson-1b', 'week1/lesson-1b'], ['1C', 'week-1/lesson-1c', 'week1/lesson-1c'], ['2A', 'week-2/lesson-2a', 'week2/lesson-2a'], ['2B', 'week-2/lesson-2b', 'week2/lesson-2b'], ['2C', 'week-2/lesson-2c', 'week2/lesson-2c']]
  const dr = LES.map(([l, r, f]) => ({ l, r, d: (JSON.parse(readFileSync(`lib/soundscape/${f}.json`, 'utf8')).drawers as { head: string; fields: [string, string][] }[]).map(x => ({ cat: x.head.split(/\s[—–·-]\s/)[1].trim(), title: x.fields.find(f => f[0] === 'Title')![1].replace(/`/g, '') })) }))
  html('X08-native', { group: 'SUP', source: 'drawer titles in the six lesson JSON files (36 total)', teach: 'optional research navigation: 6 categories x 6 lessons' }, 'Optional reading: all 36 topics',
    `<p class="eyebrow">Optional reading</p><h1>Six topics in every lesson</h1><p>Each lesson keeps six researched side-topics. None is required, and none replaces the lesson. They are ordinary links.</p>${dr.map(x => `<h2>Lesson ${x.l}</h2><ul>${x.d.map(t => `<li><strong>${t.cat}:</strong> <a href="/curriculum/soundscape-path/${x.r}">${t.title}</a></li>`).join('')}</ul>`).join('')}<p class="muted">${dr.reduce((n, x) => n + x.d.length, 0)} topics in total.</p>`, 'All thirty-six optional topics (six per lesson) with ordinary links to their lessons.')
}
export const SUP_FAMILY = family
