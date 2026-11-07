// M07 Week 2 asset catalogue: 48 native SVG masters (each built for screen / narrow / print) from the 50-row audit.
// Every note and time comes from week2/fixtures.ts; every hue from identityHex(); every Plogger glyph from PLOGGER_LENS_V1 via the M05 chip.
import type { NoteEvent } from '../fixtures'
import { A, B, C, FIVE, M } from '../week2/fixtures'
import { INTERVAL_IDENTITY_COLORS_V1, IDENTITY_VERSION, PLOGGER_LENS_V1 } from '../resources/interval-identity'
import {
  type Ctx, type Block, type KMark, WIN, IV, GRID, SOFT, KEYFACE, RESTINK, INK, WINE, LABEL_INK, noteName, ivl, pairText, txt, para, identityHex, tint,
  glyph, head, note, col, twoUp, badge, keyboard, bracket, hopRow, lanes, laneGeom, stagePath, moveFigure, chip, panel, legend, BY, W_IN,
} from './kit'

export type Disp = 'REUSE' | 'REVISE' | 'REPLACE' | 'CREATE' | 'DERIVE'
export type Group = 'shared' | 'hub' | '2A' | '2B' | '2C'
export type Built = { title: string; desc: string; blocks: Block[]; gap?: number }
export type Asset = {
  id: string; row: string; group: Group; disp: Disp; title: string; steps: string[]; state: 'N' | 'I' | 'N+I'
  alt: string; teaches: string; howToRead: string; sources: string[]; semis: number[]; plogger: number[]; forbid: string[]
  limits?: string; kind: 'figure' | 'worksheet' | 'reference'
  build: (c: Ctx) => Built
}

// ---------------------------------------------------------------- fixture-derived facts
const pairAt = (ev: NoteEvent[], t: number): [number, number] | null => {
  const lo = ev.find(e => e.role === 'drone' && e.start <= t && t < e.start + e.dur), hi = ev.find(e => e.role === 'melody' && e.start <= t && t < e.start + e.dur)
  return lo && hi ? [lo.midi, hi.midi] : null
}
const stages2 = (ev: NoteEvent[]): [[number, number], [number, number]] => [pairAt(ev, 1)!, pairAt(ev, 3)!]
const [ST_B1, ST_B2, ST_B3, ST_B4, ST_B5] = FIVE.map(f => stages2(f.events as unknown as NoteEvent[]))
const PATH: [number, number][] = [0, 1, 2, 3].map(i => pairAt(B.path, i * 2.5 + 1)!)
const toBand = (ev: NoteEvent[]) => ev.filter(e => e.role === 'melody').map(e => { const p = pairAt(ev, e.start + 0.1)!; return { from: e.start, to: e.start + e.dur, semis: p[1] - p[0] } })
const laneSpecs = (ev: NoteEvent[], nameU = 'Upper voice', nameL = 'Lower voice') => [
  { name: nameU, voice: 'upper' as const, events: ev.filter(e => e.role === 'melody') },
  { name: nameL, voice: 'lower' as const, events: ev.filter(e => e.role === 'drone') },
]
const nm = noteName
const sem = (n: number) => `${n} semitone${n === 1 ? '' : 's'}`
const NAMES = ['major third', 'minor third', 'perfect fourth', 'major second', 'diminished', 'tritone', 'M3', 'm3', 'P4', 'M2', 'd5']
const MOTION = ['oblique', 'contrary', 'similar', 'parallel']
const VOICES = 'Filled circle = lower voice; light square = upper voice; dashed shape = where a voice started.'

// ---------------------------------------------------------------- shared small blocks
export function voiceKey(c: Ctx, W: number, ghost = false): Block {
  const items: [string, string, boolean][] = [['lower', 'lower voice', false], ['upper', 'upper voice', false]]
  if (ghost) { items.push(['lower', 'dashed: where it started', true]) }
  let x = 6, g = ''
  items.forEach(([v, label, gh]) => { g += glyph(c, v as 'lower' | 'upper', x + 8, 13, 8, gh) + txt(x + 24, 18, label, { size: 13, fill: '#4a3a4a', sans: true }); x += 24 + label.length * 6.9 + 18 })
  return { w: W, h: 28, body: g }
}
const sub = (c: Ctx, s: string, W?: number): Block => note(c, s, { size: 15, weight: 700, fill: INK, w: W })
const rule = (c: Ctx): Block => ({ w: c.W, h: 2, body: `<path d="M0 1 H${W_IN(c)}" stroke="${SOFT}" stroke-width="1.5"/>` })
const pill = (c: Ctx, x: number, y: number, w: number, label: string, o: { stroke?: string; fill?: string } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${o.fill ?? KEYFACE}" stroke="${o.stroke ?? GRID}" stroke-width="1.6"/>` + txt(x + w / 2, y + 20, label, { size: 13.5, weight: 600, anchor: 'middle', fill: INK, sans: true })
const ARR = (x: number, y: number, len: number, col = INK) => `<path d="M${x} ${y} h${len} M${x + len - 8} ${y - 6} l8 6 l-8 6" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`

export const ASSETS: Asset[] = []
const add = (a: Asset) => { ASSETS.push(a) }

// ================================================================= SHARED
add({
  id: 'A-02', row: 'A-02', group: 'shared', disp: 'DERIVE', kind: 'reference', title: 'The thirteen interval identity colours',
  steps: ['H'], state: 'I', semis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], plogger: [], forbid: [],
  alt: 'Thirteen colour swatches, one for each interval from unison (0 semitones) to octave (12), each with its name and number.',
  teaches: 'The thirteen identity colours of the Interval Palette, each next to the name and semitone count it belongs to. The colour is an agreed artistic label for a pair of notes, never a property of sound.',
  howToRead: 'This is the key to every colour in Week 2. Read across a row: colour, number of semitones, then the interval name. A colour is always printed beside its name, so it never has to be guessed, and it is attached to the pair of notes, not to a voice. Compare with the live Palette page; the values are imported from the same file.',
  sources: ['lib/soundscape/resources/interval-identity.ts (INTERVAL_IDENTITY_COLORS_V1, identityHex)', 'lib/soundscape/resources/palette.ts (INTERVALS names)'],
  limits: 'Reference sheet. Do not place before the learner has met the named intervals.',
  build(c) {
    const rows = Array.from({ length: 13 }, (_, s) => s)
    const cell = (s: number, w: number): Block => {
      const r = BY(s), id = `IP-${String(s).padStart(2, '0')}`
      const hex = INTERVAL_IDENTITY_COLORS_V1[id].hex
      const t = para(70, 18, `${s} · ${r.name}`, w - 76, { size: 14.5, weight: 700, fill: INK, sans: true, lh: 18 })
      return { w, h: Math.max(40, t.h + 24), body: `<rect x="0" y="2" width="56" height="34" rx="8" fill="${identityHex(s)}"/>` + t.svg + txt(70, 18 + t.h + 2, `${INTERVAL_IDENTITY_COLORS_V1[id].accent} · ${hex}`, { size: 12.5, fill: RESTINK, sans: true }) }
    }
    const colW = c.narrow ? W_IN(c) : (W_IN(c) - 24) / 2
    const left = col(rows.slice(0, 7).map(s => cell(s, colW)), 6), right = col(rows.slice(7).map(s => cell(s, colW)), 6)
    const grid: Block = c.narrow ? col([...rows.map(s => cell(s, colW))], 6) : { w: c.W, h: Math.max(left.h, right.h), body: left.body + `<g transform="translate(${colW + 24} 0)">${right.body}</g>` }
    return {
      title: `The thirteen interval identity colours, Palette version ${IDENTITY_VERSION}`,
      desc: 'Thirteen swatches in order from 0 to 12 semitones. ' + rows.map(s => `${s}: ${BY(s).name}, ${identityHex(s)}`).join('; ') + '. The colours are an agreed artistic label for a pair of notes, not a property of sound.',
      blocks: [head(c, 'Shared · colour key', 'Thirteen colours, one for each interval'), grid, note(c, `Palette identity colours, version ${IDENTITY_VERSION}. An agreed artistic label that always travels with a name and a number. It marks a pair of notes, never a voice.`, { size: 13.5, fill: RESTINK })],
    }
  },
})

add({
  id: 'A-03', row: 'A-03', group: 'shared', disp: 'DERIVE', kind: 'reference', title: 'The Week 2 keyboard window, B3 to C5',
  steps: ['2A:1', '2A:7', '2A:9', '2B:3', '2C:7'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone'],
  alt: 'A keyboard drawn from B3 to C5 with nine white keys and five black keys, every white key labelled with its letter and octave number.',
  teaches: 'The keyboard window Week 2 uses. It starts on B3, so the note just below C4 is on the picture, and every key is named with its octave number.',
  howToRead: 'Find C4, the white key just left of the group of two black keys in the middle of this window. B3 is the white key immediately to its left. The small numbers above the black keys count each group (two, then three). Every white key carries its octave number, so C4 and C5 are different keys.',
  sources: ['lib/soundscape/m02/keyboard-geometry.ts buildKeyboard(start B, cMidi 48)', 'replaces public/soundscape/w2/W2-06_two-lines-on-one-keyboard_*.svg (no B3)'],
  build(c) {
    const k = keyboard(c, W_IN(c), { ...WIN.B3_C5, labels: 'all', top: 30 })
    const groups = k.kb.groups.map(g => { const xs = g.blacks.map(b => k.xc(b.midi)); const a = Math.min(...xs), z = Math.max(...xs); return `<path d="M${a - 6} ${k.top - 6} v-6 h${z - a + 12} v6" fill="none" stroke="#a3778f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` + txt((a + z) / 2, k.top - 18, String(g.size), { size: 15, weight: 700, anchor: 'middle', fill: WINE, sans: true }) }).join('')
    const kb: Block = { w: k.w, h: k.h, body: k.body + groups }
    return {
      title: 'The Week 2 keyboard window, B3 to C5',
      desc: `A piano keyboard from B3 to C5: ${k.kb.whites.length} white keys (${k.kb.whites.map(w => nm(w.midi)).join(', ')}) and ${k.kb.blacks.length} black keys in a group of two and a group of three. No notes are marked.`,
      blocks: [head(c, 'Shared · keyboard', 'Nine white keys, from B3 to C5'), kb, note(c, 'B3 is the white key just left of C4. The numbers above the black keys count each group.', { size: 14 })],
    }
  },
})

add({
  id: 'A-04', row: 'A-04', group: 'shared', disp: 'DERIVE', kind: 'figure', title: 'Reading a two-lane timeline',
  steps: ['2A:2', '2B:2', '2C:1', '2C:7'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone'],
  alt: 'A made-up two-lane timeline over four stages: the lower lane holds C4, the upper lane plays E4, rests, then F4. A dashed line marks one moment.',
  teaches: 'How a lane works: each voice has its own row, bars are notes, dashed boxes are rests, and one vertical slice is a single moment of two notes together.',
  howToRead: 'The top lane is the upper voice and the bottom lane is the lower voice. A solid bar is a note sounding for as long as the bar is wide; a dashed box is a rest. The dashed vertical line cuts through both lanes at one moment, and the two notes it crosses are the pair sounding together. This pattern is made up to show how to read a lane; it is not a Week 2 exercise.',
  sources: ['lib/soundscape/m03/native-svg.ts lanes() idea, rebuilt in m07/kit.ts lanes()', 'old W2/SYS-04, SYS-09 (reveal and seconds removed)'],
  build(c) {
    const ev: NoteEvent[] = [{ midi: M.C4, start: 0, dur: 4, role: 'drone' }, { midi: M.E4, start: 0, dur: 1, role: 'melody' }, { midi: M.F4, start: 2, dur: 2, role: 'melody' }]
    const L = lanes(c, W_IN(c), laneSpecs(ev), 4, { unit: 'stages', tick: 1, marks: [{ t: 3, label: 'one moment' }] })
    return {
      title: 'Reading a two-lane timeline',
      desc: 'A made-up reading example over four stages. Upper lane: E4 from 0 to 1, a rest from 1 to 2, F4 from 2 to 4. Lower lane: C4 from 0 to 4. A dashed vertical line at stage 3 crosses F4 above C4.',
      blocks: [head(c, 'Shared · timeline', 'Each voice gets its own lane'), voiceKey(c, W_IN(c)), L, note(c, 'Made-up pattern, only to show how a lane reads. Not a Week 2 exercise.', { size: 13.5, fill: RESTINK })],
    }
  },
})

add({
  id: 'A-05', row: 'A-05', group: 'shared', disp: 'DERIVE', kind: 'figure', title: 'Counting letters is not counting semitones',
  steps: ['2A:3', '2A:4'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION],
  alt: 'The keyboard from C4 to G4 twice. Above, the keys C, D and E are numbered 1, 2, 3. Below, four numbered hops run from C4 to E4 across the black keys.',
  teaches: 'Two different counts for the same two notes: three letters (C, D, E) and four semitone hops from C4 to E4. The black keys count as hops but not as letters.',
  howToRead: 'In the first keyboard the numbers sit only on lettered white keys, C then D then E. In the second keyboard each arc is one hop to the very next key, black or white, from C4 up to E4. Same two notes, two separate rulers, two different numbers.',
  sources: ['M03N/T04-native.svg left half (the B to F half belongs to 2B)', 'lib/soundscape/m03/native-svg.ts hops() idea, rebuilt as kit hopRow()'],
  build(c) {
    const W = W_IN(c), mk: KMark[] = [{ midi: M.C4, voice: 'lower' }, { midi: M.E4, voice: 'upper' }]
    const k1 = keyboard(c, W, { ...WIN.C4_G4, marks: mk, labels: 'all', top: 40 })
    const badges = [M.C4, 62, M.E4].map((m, i) => `<circle cx="${k1.xc(m)}" cy="16" r="13" fill="${KEYFACE}" stroke="${INK}" stroke-width="2.2"/>` + txt(k1.xc(m), 22, String(i + 1), { size: 16, weight: 700, anchor: 'middle', fill: INK, sans: true })).join('')
    const k2 = keyboard(c, W, { ...WIN.C4_G4, marks: mk, labels: 'all', top: 12 })
    const h2 = hopRow(c, k2, M.C4, M.E4, k2.bottom + 12, null, '4 semitone hops')
    return {
      title: 'Counting letters is not counting semitones',
      desc: 'Two copies of the keyboard from C4 to G4. First copy: C4 (lower voice) and E4 (upper voice) are marked; the keys C, D and E carry the numbers 1, 2 and 3. Second copy: four numbered hops, C4 to C♯4 to D4 to D♯4 to E4, include the two black keys. Three letters, four semitones.',
      blocks: [head(c, 'Shared · two counts', 'Letters and semitones are different counts'), sub(c, 'Count the letters: C D E'), { w: W, h: k1.h, body: k1.body + badges }, sub(c, 'Count the hops: every key, black ones too'), { w: W, h: Math.max(k2.h, h2.h) + 6, body: k2.body + h2.body }],
      gap: 10,
    }
  },
})

add({
  id: 'A-06', row: 'A-06', group: 'shared', disp: 'DERIVE', kind: 'figure', title: 'Four motion glyphs',
  steps: ['2B:7', '2B:11'], state: 'N', semis: [], plogger: [], forbid: NAMES.filter(n => !['M3'].includes(n)),
  alt: 'Four small two-line sketches: one line rises while the other stays level; the lines move away from or toward each other; both rise by different amounts; both rise by the same amount.',
  teaches: 'The four movement words as pure arrows, with no pitch names: one voice holds, voices go opposite ways, voices go the same way by different amounts, and the strict parallel case of equal amounts.',
  howToRead: 'In each sketch the filled circle is the lower voice and the square is the upper voice, moving left to right. Watch the arrows: level or rising, opposite directions, same direction. The last sketch has two equal brackets to show that the distance travelled is the same.',
  sources: ['public/soundscape/w2/SYS-05_motion-glyph-library_source.svg (concept)', 'M03N/E02, E03, E04'],
  build(c) {
    const tw = c.narrow ? W_IN(c) : (W_IN(c) - 20) / 2, th = 158, TH = th + 58
    const tile = (label: string, def: string, du: number, dl: number, eq = false): Block => {
      const x0 = 38, x1 = tw - 46, yu = 66, yl = 112
      let g = `<rect x="0" y="0" width="${tw}" height="${TH}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${SOFT}" stroke-width="1.5"/>` + txt(14, 26, label, { size: 15, weight: 700, fill: INK, sans: true })
      for (const [v, y0, d] of [['upper', yu, du], ['lower', yl, dl]] as const) {
        const y1 = y0 + d
        g += (() => { const L = Math.hypot(x1 - x0, d), ux = (x1 - x0) / L, uy = d / L, hx = (a: number) => (-ux * Math.cos(a) + uy * Math.sin(a)) * 11, hy = (a: number) => (-uy * Math.cos(a) - ux * Math.sin(a)) * 11; return `<path d="M${x0} ${y0} L${x1} ${y1} M${x1} ${y1} l${hx(0.5)} ${hy(0.5)} M${x1} ${y1} l${hx(-0.5)} ${hy(-0.5)}" stroke="${INK}" stroke-width="3" stroke-linecap="round" fill="none"/>` })() + glyph(c, v, x0, y0, 7)
      }
      if (eq) g += `<path d="M${x1 + 12} ${yu} V${yu + du} M${x1 + 12} ${yl} V${yl + dl}" stroke="${GRID}" stroke-width="2.4" stroke-dasharray="2 4"/>`
      const p = para(14, th + 14, def, tw - 28, { size: 13.5, fill: '#4a3a4a', sans: true, lh: 17.5 })
      return { w: tw, h: TH, body: g + p.svg }
    }
    const t = [
      tile('Oblique', 'One voice holds; the other moves.', -30, 0),
      tile('Contrary', 'The voices go opposite ways, apart or together.', -26, 26),
      tile('Similar', 'Both go the same way, by different amounts.', -34, -16),
      tile('Strict parallel', 'Same way, same number of semitones.', -24, -24, true),
    ]
    const grid: Block = c.narrow ? col(t, 14) : { w: c.W, h: TH * 2 + 20, body: t.map((b, i) => `<g transform="translate(${(i % 2) * (tw + 20)} ${Math.floor(i / 2) * (TH + 20)})">${b.body}</g>`).join('') }
    return {
      title: 'Four motion glyphs',
      desc: 'Four tiles. Oblique: the lower circle stays level while the upper square rises. Contrary: the lower circle falls while the upper square rises. Similar: both rise, the lower by more than the upper. Strict parallel: both rise by the same amount, shown with two equal dotted brackets. No pitch names are shown.',
      blocks: [head(c, 'Shared · movement words', 'Four ways two voices can travel'), grid, note(c, 'Circle = lower voice, square = upper voice. Arrows only; the exact notes are on the lesson pictures.', { size: 13.5, fill: RESTINK })],
    }
  },
})

add({
  id: 'A-07', row: 'A-07', group: 'shared', disp: 'DERIVE', kind: 'figure', title: 'What stayed, what changed',
  steps: ['2B:10', '2B:11', '2C:5'], state: 'I', semis: [4, 5, 6], plogger: [], forbid: [],
  alt: 'Two rows. Upper voice changes from E4 to F4 while the lower C4 stays: a major third becomes a perfect fourth. Lower voice changes from C4 to B3 while the upper F4 stays: a perfect fourth becomes a diminished fifth.',
  teaches: 'A change in a pair can be described by saying which voice stayed and which moved. The interval changes only because one voice did.',
  howToRead: 'Each row has three parts: the start pair, what stayed and what changed, and the end pair. The colour bar on each pair names that pair, not either voice. Read left to right, then check that the voice that stayed has the same note on both sides.',
  sources: ['M03N/D10, F07 (concept)', 'week2/fixtures.ts B.path'],
  build(c) {
    const W = W_IN(c)
    const row = (a: [number, number], b: [number, number], stayed: string, changed: string): Block => {
      const bw = c.narrow ? W : (W - 60) / 2
      const ba = badge(c, bw, { lo: a[0], hi: a[1] }), bb = badge(c, bw, { lo: b[0], hi: b[1] })
      const mid = col([note(c, `Stayed: ${stayed}`, { size: 14, weight: 700 }), note(c, `Changed: ${changed}`, { size: 14 })], 0)
      if (c.narrow) return col([ba, mid, bb], 8)
      const h = Math.max(ba.h, bb.h)
      return { w: W, h, body: ba.body + ARR(bw + 12, h / 2, 36) + `<g transform="translate(${bw + 60} 0)">${bb.body}</g>` + '' + `<g transform="translate(0 ${h + 2})">${mid.body}</g>`, } as Block
    }
    const r1 = row([M.C4, M.E4], [M.C4, M.F4], 'lower voice, C4', 'upper voice, E4 to F4'), r2 = row([M.C4, M.F4], [M.B3, M.F4], 'upper voice, F4', 'lower voice, C4 to B3')
    const fix = (b: Block) => c.narrow ? b : { ...b, h: b.h + 56 }
    return {
      title: 'What stayed, what changed',
      desc: 'Row one: C4 + E4, a major third of 4 semitones, becomes C4 + F4, a perfect fourth of 5 semitones. The lower voice C4 stayed; the upper voice moved from E4 to F4. Row two: C4 + F4 becomes B3 + F4, a diminished fifth of 6 semitones. The upper voice F4 stayed; the lower voice moved from C4 to B3.',
      blocks: [head(c, 'Shared · compare two pairs', 'Which voice stayed, which one changed'), fix(r1), rule(c), fix(r2)], gap: 14,
    }
  },
})

const plog = (id: string, list: number[], steps: string[], title: string, kick: string) => add({
  id, row: 'A-09', group: 'shared', disp: 'REUSE', kind: 'reference', title,
  steps, state: 'I', semis: list, plogger: list, forbid: list.includes(6) ? [] : ['diminished', 'tritone'],
  alt: `Plogger chips for brackets ${list.join(', ')}, each beside its identity colour, with the three-factor legend below.`,
  teaches: `The historic Plogger lens for ${list.map(n => `${BY(n).name.toLowerCase()} [${n}]`).join(', ')}: contour is the family, shadow direction is fundamental or octave, fill is harmonicity. It is a separate label from the identity colour.`,
  howToRead: 'Each chip has three separate marks: the outline shape, a shadow to the left, right or both sides, and the fill. The coloured bar beside it is the interval identity colour, which is a different label. The legend underneath states every mark in words and names the printed source this lens comes from.',
  sources: ['lib/soundscape/resources/interval-identity.ts PLOGGER_LENS_V1', 'lib/soundscape/m05/info-svg.ts chip(), panel(), legend() (reused unchanged)', 'public/soundscape/m05/info/IPF-plogger-chart.svg (full chart, linked)'],
  limits: 'A historic teaching lens, not acoustic law. [6] follows the printed original; older code disputes its shape family. Never use on motion figures.',
  build(c) {
    const tw = c.narrow ? W_IN(c) : (W_IN(c) - 24) / 2
    const cell = (n: number): Block => { const p = panel(c, tw, BY(n), `m07${n}`); return { w: tw, h: p.h + 30, body: swatchLine(c, n, tw) + `<g transform="translate(0 28)">${p.body}</g>` } }
    const swatchLine = (cc: Ctx, n: number, w: number) => `<rect x="0" y="4" width="${w}" height="8" rx="4" fill="${identityHex(n)}"/>` + txt(0, 26, `Identity colour: ${BY(n).name}`, { size: 12.5, fill: RESTINK, sans: true })
    const cells = list.map(cell)
    const grid: Block = c.narrow ? col(cells, 18) : (() => { const h1 = Math.max(cells[0].h, cells[1]?.h ?? 0), h2 = Math.max(cells[2]?.h ?? 0, cells[3]?.h ?? 0); return { w: c.W, h: h1 + (h2 ? 18 + h2 : 0), body: cells.map((b, i) => `<g transform="translate(${(i % 2) * (tw + 24)} ${i < 2 ? 0 : h1 + 18})">${b.body}</g>`).join('') } })()
    return {
      title,
      desc: `Plogger chips for ${list.map(n => `[${n}] ${BY(n).name.toLowerCase()}`).join(', ')}, each beside the pair\'s identity colour bar, followed by the three-factor legend: shape is the family, shadow is fundamental or octave, fill is harmonicity.`,
      blocks: [head(c, kick, 'Three marks, separate from the colour'), grid, legend(c, W_IN(c))], gap: 18,
    }
  },
})
plog('A-09', [3, 4, 5, 6], ['2B:5', '2B:6', '2C:5'], 'Plogger lens for the four named pairs', 'Shared · historic Plogger lens')
plog('A-09a', [3, 4, 5], ['2A:5', '2A:6'], 'Plogger lens for the 2A pairs', 'Shared · historic Plogger lens, 2A subset')

add({
  id: 'A-11', row: 'A-11 (added)', group: 'shared', disp: 'DERIVE', kind: 'reference', title: 'Pair badges used in Week 2',
  steps: ['2B:5', '2B:6'], state: 'I', semis: [2, 3, 4, 5, 6], plogger: [], forbid: [],
  alt: 'Seven pair badges, each a colour bar with the interval name, the two notes with octave numbers, the semitone count and the letter count.',
  teaches: 'The one badge every named pair in Week 2 uses: colour bar, interval name, the two actual notes, semitones and letters. The same badge appears in every lesson.',
  howToRead: 'Read each badge from the top: interval name and short symbol, then the two notes with their octave numbers, then the two counts. The colour bar belongs to the whole pair. Two badges can share a colour (C4 + F4 and B3 + E4 are both perfect fourths), because colour follows the interval, not the notes.',
  sources: ['lib/soundscape/m05/info-svg.ts header() idea', 'week2/fixtures.ts pairs'],
  build(c) {
    const W = W_IN(c), bw = c.narrow ? W : (W - 24) / 2
    const list: [number, number][] = [[M.C4, M.E4], [M.E4, M.G4], [M.C4, M.F4], [M.B3, M.E4], [M.D4, M.E4], [M.B3, M.F4], [M.D4, M.F4]]
    const bs = list.map(p => badge(c, bw, { lo: p[0], hi: p[1] }))
    const grid: Block = c.narrow ? col(bs, 12) : (() => { let y = 0, body = ''; for (let i = 0; i < bs.length; i += 2) { const h = Math.max(bs[i].h, bs[i + 1]?.h ?? 0); body += `<g transform="translate(0 ${y})">${bs[i].body}</g>` + (bs[i + 1] ? `<g transform="translate(${bw + 24} ${y})">${bs[i + 1].body}</g>` : ''); y += h + 12 } return { w: c.W, h: y - 12, body } })()
    return {
      title: 'Pair badges used in Week 2',
      desc: 'Badges: ' + list.map(p => { const v = ivl(p[0], p[1]); return `${v.pair}, ${v.name}, ${v.semis} semitones, ${v.letters} letters` }).join('; ') + '.',
      blocks: [head(c, 'Shared · pair badge', 'One badge for every named pair'), grid],
    }
  },
})

add({
  id: 'A-12', row: 'A-12 (added)', group: 'shared', disp: 'REVISE', kind: 'reference', title: 'How to read our pictures',
  steps: ['H', '2A:5'], state: 'N+I', semis: [3, 4], plogger: [], forbid: [...NAMES, ...MOTION],
  alt: 'A legend of the marks used in Week 2 pictures: lower voice circle, upper voice square, dashed start shape, solid note bar, dashed rest, colour bar, hop numbers, Plogger chip, and note names with octave numbers.',
  teaches: 'The marks every Week 2 picture uses, including the rule that colour belongs to a pair of notes, not to a voice, and that shape tells the voices apart.',
  howToRead: 'Read this once before the lessons. The two voices are told apart by shape (circle and square), so the picture still works in black and white. Colour appears only after a pair has been named, as a bar that belongs to the two notes together.',
  sources: ['M03N/S12-native.svg (revised: two lines added, colour rule)', 'lib/soundscape/m05/info-svg.ts legend() wording'],
  build(c) {
    const W = W_IN(c), tw = W - 60
    const row = (icon: string, t: string): Block => { const p = para(52, 18, t, tw, { size: 14, fill: '#2f2230', sans: true, lh: 18 }); return { w: W, h: Math.max(34, p.h + 8), body: icon + p.svg } }
    const barIcon = (fill: string, dashed = false) => `<rect x="2" y="6" width="38" height="22" rx="7" fill="${dashed ? 'none' : fill}" stroke="${dashed ? GRID : INK}" stroke-width="${dashed ? 1.6 : 2}" ${dashed ? 'stroke-dasharray="5 4"' : ''}/>`
    const items: [string, string][] = [
      [glyph(c, 'lower', 20, 17, 9), 'Filled circle: the lower voice.'],
      [glyph(c, 'upper', 20, 17, 9), 'Light square with a dark outline: the upper voice.'],
      [glyph(c, 'lower', 20, 17, 9, true), 'Dashed shape: where a voice started before it moved.'],
      [barIcon('#ece5d9'), 'Solid bar: a note sounding, as wide as it lasts.'],
      [barIcon('', true), 'Dashed box: a rest, which is silence in that voice.'],
      [`<rect x="2" y="2" width="9" height="30" rx="4" fill="${identityHex(4)}"/><rect x="16" y="2" width="9" height="30" rx="4" fill="${identityHex(3)}"/>`, 'Colour bar: names one pair of notes. Colour belongs to the pair, never to a voice.'],
      [txt(20, 24, '1 2 3', { size: 14, weight: 700, anchor: 'middle', fill: INK, sans: true }), 'Numbers on arcs: semitone hops, counting every key, black ones too.'],
      [chip(c, -6, 0, 5, 0.5, 'k'), 'Plogger chip: a separate historic lens (outline, shadow, fill). It is not the colour.'],
      [txt(20, 24, 'B3', { size: 15, weight: 700, anchor: 'middle', fill: INK, sans: true }), 'Note names keep their octave number: B3 and B4 are different keys.'],
    ]
    return {
      title: 'How to read our pictures',
      desc: 'A legend. ' + items.map(i => i[1]).join(' '),
      blocks: [head(c, 'Shared · legend', 'How to read our pictures'), ...items.map(([i, t]) => row(i, t))], gap: 4,
    }
  },
})

// ================================================================= HUB
add({
  id: 'H-01', row: 'H-01', group: 'hub', disp: 'CREATE', kind: 'figure', title: 'The Week 2 path: three lessons',
  steps: ['H'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone'],
  alt: 'Three connected steps: 2A one voice moves, 2B both voices move, 2C two short compositions.',
  teaches: 'The order of the week: first one voice moves, then both voices move, then two short sketches put the ideas to work.',
  howToRead: 'Follow the arrows from left to right (top to bottom on a phone). Each box names the lesson and what you do in it. The boxes do not give away the vocabulary; it is introduced in the lessons themselves.',
  sources: ['W2_FINAL_CONTENT_HUB_MANUSCRIPT_V2 (map of the week)'],
  build(c) {
    const W = W_IN(c), items: [string, string, string][] = [['2A', 'One voice moves', 'Count a distance, then move one note.'], ['2B', 'Both voices move', 'Five changes from the same two notes.'], ['2C', 'Two short sketches', 'The same melody over two lower lines.']]
    const bw = c.narrow ? W : (W - 2 * 44) / 3
    const box = (a: [string, string, string], w: number): Block => { const p = para(14, 66, a[2], w - 28, { size: 13.5, fill: '#4a3a4a', sans: true, lh: 17.5 }); const h = 70 + p.h; return { w, h, body: `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="14" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.8"/>` + txt(14, 28, `Lesson ${a[0]}`, { size: 12, weight: 700, fill: '#8a5a66', sans: true, ls: 1 }) + txt(14, 52, a[1], { size: 18, weight: 600, fill: LABEL_INK }) + p.svg } }
    const bs = items.map(a => box(a, bw))
    if (c.narrow) { let y = 0, body = ''; bs.forEach((b, i) => { body += `<g transform="translate(0 ${y})">${b.body}</g>`; y += b.h; if (i < 2) { body += `<path d="M${W / 2} ${y + 4} v22 M${W / 2 - 7} ${y + 19} l7 8 l7 -8" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`; y += 32 } }); return build('H-01', { w: W, h: y, body }) }
    const h = Math.max(...bs.map(b => b.h))
    return build('H-01', { w: W, h, body: bs.map((b, i) => `<g transform="translate(${i * (bw + 44)} 0)">${b.body}</g>` + (i < 2 ? ARR(i * (bw + 44) + bw + 8, h / 2, 28) : '')).join('') })
    function build(_: string, blk: Block): Built { return { title: 'The Week 2 path: three lessons', desc: 'Three boxes joined by arrows: Lesson 2A, one voice moves; Lesson 2B, both voices move; Lesson 2C, two short sketches.', blocks: [head(c, 'Week 2 hub', 'Three lessons, one idea at a time'), blk] } }
  },
})

add({
  id: 'H-02', row: 'H-02', group: 'hub', disp: 'CREATE', kind: 'figure', title: 'Week 1 used C3; Week 2 starts at C4',
  steps: ['H', '2A:1'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION],
  alt: 'A keyboard from C3 to C5 with C3 and C4 marked, one octave apart, and a label saying these are two different keys.',
  teaches: 'Week 1 started on C3 and Week 2 starts on C4. They are different keys, one octave apart, and not the same pitch.',
  howToRead: 'Find the two marked C keys: C3 on the left, C4 in the middle. Each C is the white key just left of a group of two black keys. The bracket joins them; it is a comparison between two registers, not an interval you will study this week.',
  sources: ['lib/soundscape/m02/keyboard-geometry.ts buildKeyboard(C, 15, 48)', 'Week 1 W1-06 (style only)'],
  build(c) {
    const W = W_IN(c), k = keyboard(c, W, { ...WIN.C3_C5, labels: 'c', marks: [{ midi: 48, voice: 'lower' }, { midi: 60, voice: 'lower' }], maxH: 130 })
    const br = bracket(c, W, k.xc(48), k.xc(60), k.bottom + 14, null, 'C3 and C4: two different keys, one octave apart')
    return { title: 'Week 1 used C3; Week 2 starts at C4', desc: 'A keyboard from C3 to C5. C3 and C4 are each marked with a filled circle. A neutral bracket joins them: two different keys one octave apart. Not a Week 2 interval.', blocks: [head(c, 'Week 2 hub', 'Week 1 started on C3. Week 2 starts on C4.'), { w: W, h: Math.max(k.h, br.h) + 6, body: k.body + br.body }, note(c, 'Week 1: C3 · Week 2: C4. Same letter, a different key.', { size: 14 })] }
  },
})

add({
  id: 'H-03', row: 'H-03', group: 'hub', disp: 'CREATE', kind: 'figure', title: 'From a note to harmony',
  steps: ['H'], state: 'N+I', semis: [4], plogger: [], forbid: [],
  alt: 'A chain of five ideas: pitch, interval, voice, motion, harmony, with one worked example: C4 and E4 form a major third.',
  teaches: 'How the week\'s ideas build on each other: a note, two notes (an interval), a line of notes (a voice), a change between pairs (motion), and what the pairs make together (harmony).',
  howToRead: 'Read down the chain. Each box adds one idea to the one above it. The worked example beside "interval" uses C4 and E4 and carries the only colour on the page, because it is the only pair that is named here.',
  sources: ['W2_FINAL_CONTENT_HUB_MANUSCRIPT_V2', 'lib/soundscape/resources/interval-identity.ts (M3 hue via kit badge)'],
  build(c) {
    const W = W_IN(c), items: [string, string][] = [['Pitch', 'One note, like C4.'], ['Interval', 'Two notes: count the letters, then the semitones.'], ['Voice', 'One line of notes over time.'], ['Motion', 'How the voices change from one pair to the next.'], ['Harmony', 'What the pairs make when they sound together.']]
    let y = 0, g = ''
    items.forEach(([t, d], i) => {
      const bw = W - 8, p = para(18, 52, d, bw - 36, { size: 14, fill: '#4a3a4a', sans: true, lh: 18 }); let h = 56 + p.h
      let extra = ''
      if (t === 'Interval') { const b = badge(c, bw - 36, { lo: M.C4, hi: M.E4 }); extra = `<g transform="translate(18 ${h - 4})">${b.body}</g>`; h += b.h + 4 }
      g += `<g transform="translate(4 ${y})"><rect x="1" y="1" width="${bw - 2}" height="${h - 2}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.6"/>` + txt(18, 31, `${i + 1} · ${t}`, { size: 18, weight: 600, fill: LABEL_INK }) + p.svg + extra + '</g>'
      y += h
      if (i < items.length - 1) { g += `<path d="M${W / 2} ${y + 2} v14 M${W / 2 - 7} ${y + 10} l7 8 l7 -8" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`; y += 22 }
    })
    return { title: 'From a note to harmony', desc: 'Five boxes in a chain: 1 Pitch, 2 Interval (worked example: C4 + E4, a major third, 4 semitones, 3 letters), 3 Voice, 4 Motion, 5 Harmony.', blocks: [head(c, 'Week 2 hub', 'How the week builds'), { w: W, h: y, body: g }] }
  },
})

add({
  id: 'H-04', row: 'H-04', group: 'hub', disp: 'DERIVE', kind: 'figure', title: 'Three lessons in miniature',
  steps: ['H'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION],
  alt: 'Three small tiles: a keyboard with one voice moving (2A), a keyboard with both voices moving (2B), and a two-lane timeline with a resting upper voice (2C).',
  teaches: 'A glimpse of what each lesson looks like on the page: one moving voice, two moving voices, and a timeline with rests.',
  howToRead: 'Each tile is a tiny version of a picture you will meet in that lesson. Only the shapes matter here: circles and squares are the lower and upper voice, dashed shapes show where a voice started, and the dashed boxes in the third tile are rests.',
  sources: ['miniatures of 2A-05, 2B-07 and 2C-01 built from the same kit functions', 'week2/fixtures.ts'],
  build(c) {
    const W = W_IN(c), tw = c.narrow ? W : (W - 36) / 3
    const tile = (label: string, inner: (w: number) => Block): Block => { const b = inner(tw - 20); return { w: tw, h: b.h + 56, body: `<rect x="1" y="1" width="${tw - 2}" height="${b.h + 52}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.6"/>` + txt(14, 26, label, { size: 15, weight: 700, fill: INK, sans: true }) + `<g transform="translate(10 40)">${b.body}</g>` } }
    const t1 = tile('Lesson 2A', w => moveFigure(c, w, { from: [M.C4, M.E4], to: [M.C4, M.F4], arrowLabels: false }))
    const t2 = tile('Lesson 2B', w => moveFigure(c, w, { from: [M.C4, M.E4], to: [M.D4, M.F4], arrowLabels: false }))
    const t3 = tile('Lesson 2C', w => { const l = lanes(c, w, laneSpecs(C.held), 36, { tick: 12, unit: 'seconds' }); return l })
    const tiles = [t1, t2, t3]
    const grid: Block = c.narrow ? col(tiles, 14) : { w: c.W, h: Math.max(...tiles.map(t => t.h)), body: tiles.map((t, i) => `<g transform="translate(${i * (tw + 18)} 0)">${t.body}</g>`).join('') }
    return { title: 'Three lessons in miniature', desc: 'Tile 2A: a keyboard, lower C4 held and upper E4 moving to F4. Tile 2B: a keyboard, lower C4 moving to D4 and upper E4 moving to F4. Tile 2C: a 36-second two-lane timeline with the upper voice resting between three short notes. No interval names are given.', blocks: [head(c, 'Week 2 hub', 'What each lesson looks like'), grid, voiceKey(c, W, true)] }
  },
})

// ================================================================= LESSON 2A
const AG = (ev: NoteEvent[]): [number, number] => pairAt(ev, 0.5)!   // [lower, upper] from the fixture
const P_CE = AG(A.together), P_EG = AG(A.EG)
const marksPair = (p: [number, number], hex?: string): KMark[] => [{ midi: p[0], voice: 'lower', hex }, { midi: p[1], voice: 'upper', hex }]
const hueOf = (p: [number, number]) => identityHex(p[1] - p[0])

add({
  id: '2A-01', row: '2A-01', group: '2A', disp: 'REVISE', kind: 'figure', title: 'Two notes, two voices: C4 and E4',
  steps: ['2A:2'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone', 'hop', 'third'],
  alt: 'A keyboard from C4 to C5. C4 is marked with a filled circle as the lower voice and E4 with a square as the upper voice. Three prompts say to play C4 alone, E4 alone, then both.',
  teaches: 'Two notes can be two voices: a lower one and an upper one. You play C4, then E4, then both together, on your own keyboard.',
  howToRead: 'Find C4 (the circle) and E4 (the square) on the keyboard. The three prompts underneath are things to do on your own keyboard: play the lower note, play the upper note, then play both. The picture does not name the pair yet; that comes later in the lesson.',
  sources: ['M03N/D01-native.svg, D02-native.svg (geometry)', 'week2/fixtures.ts A.together (C4 = 60, E4 = 64)'],
  build(c) {
    const W = W_IN(c), k = keyboard(c, W, { ...WIN.C4_C5, marks: marksPair(P_CE), labels: 'all' })
    const labels = ['Play C4 alone', 'Play E4 alone', 'Play both together'], pw = c.narrow ? W : (W - 24) / 3
    const pills = c.narrow ? labels.map((l, i) => pill(c, 0, i * 38, W, `${i + 1}. ${l}`)).join('') : labels.map((l, i) => pill(c, i * (pw + 12), 0, pw, `${i + 1}. ${l}`)).join('')
    return { title: 'Two notes, two voices: C4 and E4', desc: `A keyboard from C4 to C5. ${nm(P_CE[0])} is marked with a filled circle (lower voice) and ${nm(P_CE[1])} with a light square (upper voice). Three prompts: play C4 alone, play E4 alone, play both together. No interval name is given.`, blocks: [head(c, 'Lesson 2A · step 2', 'Two notes, two voices'), voiceKey(c, W), k, { w: W, h: c.narrow ? 110 : 34, body: pills }, note(c, 'These are actions for your own keyboard.', { size: 13.5, fill: RESTINK })] }
  },
})

add({
  id: '2A-02', row: '2A-02', group: '2A', disp: 'CREATE', kind: 'figure', title: 'Count the letters: C D E and E F G',
  steps: ['2A:3'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone', 'hop'],
  alt: 'Two keyboards from C4 to G4. On the first, keys C, D, E carry the numbers 1, 2, 3 with C4 and E4 marked. On the second, keys E, F, G carry 1, 2, 3 with E4 and G4 marked.',
  teaches: 'Counting letters, first and last included: C to E is three letters, and E to G is also three letters. At this point no semitones are counted.',
  howToRead: 'The numbers sit on lettered keys only. Start at the lower note and count 1 on it, then each lettered key up to the upper note. Both pairs end on 3 even though the notes are different; the next step counts something else.',
  sources: ['M03N/D02-native.svg (geometry)', 'week2/fixtures.ts A.together, A.EG'],
  build(c) {
    const W = W_IN(c)
    const strip = (p: [number, number], keys: number[]): Block => {
      const k = keyboard(c, W, { ...WIN.C4_G4, marks: marksPair(p), labels: 'all', top: 40 })
      const b = keys.map((m, i) => `<circle cx="${k.xc(m)}" cy="16" r="13" fill="${KEYFACE}" stroke="${INK}" stroke-width="2.2"/>` + txt(k.xc(m), 22, String(i + 1), { size: 16, weight: 700, anchor: 'middle', fill: INK, sans: true })).join('')
      return { w: W, h: k.h, body: k.body + b }
    }
    return { title: 'Count the letters: C D E and E F G', desc: 'Two keyboards from C4 to G4. First: C4 lower voice and E4 upper voice, with the letters C, D, E numbered 1, 2, 3. Second: E4 lower voice and G4 upper voice, with E, F, G numbered 1, 2, 3. Letters only.', blocks: [head(c, 'Lesson 2A · step 3', 'Count the letters, first and last included'), voiceKey(c, W), sub(c, 'C → E: C, D, E'), strip(P_CE, [M.C4, M.D4, M.E4]), sub(c, 'E → G: E, F, G'), strip(P_EG, [M.E4, M.F4, M.G4])], gap: 10 }
  },
})

add({
  id: '2A-03', row: '2A-03', group: '2A', disp: 'DERIVE', kind: 'figure', title: 'Count the semitones: every key counts',
  steps: ['2A:4'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION],
  alt: 'Two keyboards from C4 to G4. Four numbered hops lead from C4 to E4 across C-sharp and D-sharp. Three numbered hops lead from E4 to G4 across F and F-sharp.',
  teaches: 'Semitones count every key, black or white. C4 to E4 is four hops and E4 to G4 is three hops, although both span three letters.',
  howToRead: 'Each arc is one hop to the very next key, whatever its colour. Count the arcs from the lower note to the upper note; the last number is the total. The two totals differ (4 and 3) even though both pairs span the letters C D E and E F G.',
  sources: ['M03N/D03-native.svg (first half only)', 'week2/fixtures.ts A.together, A.EG', 'lib/soundscape/m05/info-svg.ts hopRow() idea'],
  build(c) {
    const W = W_IN(c)
    const one = (p: [number, number]): Block => { const k = keyboard(c, W, { ...WIN.C4_G4, marks: marksPair(p), labels: 'all', top: 12 }); const h = hopRow(c, k, p[0], p[1], k.bottom + 12, null, sem(p[1] - p[0])); return { w: W, h: Math.max(k.h, h.h) + 4, body: k.body + h.body } }
    return { title: 'Count the semitones: every key counts', desc: `Two keyboards from C4 to G4. ${pairText(...P_CE)}: ${sem(P_CE[1] - P_CE[0])}, numbered hops 1 to 4 across the black keys. ${pairText(...P_EG)}: ${sem(P_EG[1] - P_EG[0])}, numbered hops 1 to 3. Quality words are not used yet.`, blocks: [head(c, 'Lesson 2A · step 4', 'Count the semitones: every key, black ones too'), voiceKey(c, W), sub(c, 'C4 → E4'), one(P_CE), sub(c, 'E4 → G4'), one(P_EG)], gap: 8 }
  },
})

add({
  id: '2A-04', row: '2A-04', group: '2A', disp: 'CREATE', kind: 'figure', title: 'Same letters, different size: major and minor third',
  steps: ['2A:5'], state: 'I', semis: [4, 3], plogger: [], forbid: [],
  alt: 'Two keyboards from C4 to G4. C4 and E4 are highlighted in the major third colour with four semitones. E4 and G4 are highlighted in the minor third colour with three semitones.',
  teaches: 'Two thirds, three letters each, but four semitones (major third) against three (minor third). E4 and G4 are an actual minor third with its own colour, not the Palette\'s C4 and E♭4.',
  howToRead: 'The coloured bracket under each keyboard names the pair. The bar on the badge uses the same colour as the keys, because the colour belongs to the pair of notes. The two colours differ because the semitone counts differ, even though both pairs span three letters.',
  sources: ['M05 IPF-intro-04 (style)', 'lib/soundscape/m05/info-svg.ts BY(3), BY(4) names', 'week2/fixtures.ts A.together, A.EG', 'does not reuse the Palette C4 + E♭4 note spelling'],
  build(c) {
    const W = W_IN(c)
    const one = (p: [number, number]): Block => {
      const v = ivl(p[0], p[1]), k = keyboard(c, W, { ...WIN.C4_G4, marks: marksPair(p, hueOf(p)), labels: 'all', top: 12 })
      const br = bracket(c, W, k.xc(p[0]), k.xc(p[1]), k.bottom + 8, v.hex, `${v.name} · ${v.abbr}`)
      const bd = badge(c, W, { lo: p[0], hi: p[1] })
      return col([{ w: W, h: Math.max(k.h, br.h) + 2, body: k.body + br.body }, bd], 6)
    }
    return { title: 'Same letters, different size: major and minor third', desc: `Keyboard one: ${pairText(...P_CE)}, a major third, ${sem(4)}, three letters, in the major third colour ${hueOf(P_CE)}. Keyboard two: ${pairText(...P_EG)}, a minor third, ${sem(3)}, three letters, in the minor third colour ${hueOf(P_EG)}.`, blocks: [head(c, 'Lesson 2A · step 5', 'Two counts, one name'), voiceKey(c, W), one(P_CE), rule(c), one(P_EG)], gap: 12 }
  },
})

const moveDesc = (from: [number, number], to: [number, number]) => `Start ${pairText(...from)}, end ${pairText(...to)}. ` + (['lower', 'upper'] as const).map((v, i) => to[i] === from[i] ? `The ${v} voice holds ${nm(from[i])}.` : `The ${v} voice moves from ${nm(from[i])} to ${nm(to[i])}, ${to[i] > from[i] ? 'up' : 'down'} ${sem(Math.abs(to[i] - from[i]))}.`).join(' ')
const badgePair = (c: Ctx, W: number, a: [number, number], b: [number, number], named = true): Block => {
  const bw = c.narrow ? W : (W - 56) / 2, ba = badge(c, bw, { lo: a[0], hi: a[1] }, { named }), bb = badge(c, bw, { lo: b[0], hi: b[1] }, { named })
  if (c.narrow) return col([note(c, 'Start', { size: 12.5, fill: RESTINK, weight: 700 }), ba, note(c, 'End', { size: 12.5, fill: RESTINK, weight: 700 }), bb], 4)
  const h = Math.max(ba.h, bb.h)
  return { w: W, h, body: ba.body + ARR(bw + 10, h / 2, 34) + `<g transform="translate(${bw + 56} 0)">${bb.body}</g>` }
}

add({
  id: '2A-05', row: '2A-05', group: '2A', disp: 'REVISE', kind: 'figure', title: 'One voice moves: a major third becomes a perfect fourth',
  steps: ['2A:6'], state: 'I', semis: [4, 5], plogger: [], forbid: ['contrary', 'similar', 'parallel', 'diminished', 'tritone'],
  alt: 'A keyboard from B3 to G4. The lower voice holds C4. The upper voice moves up from E4 to F4 and the pair changes from a major third of 4 semitones to a perfect fourth of 5.',
  teaches: 'When only the upper voice moves up by one semitone, the interval grows from a major third (4 semitones) to a perfect fourth (5). The lower voice stays on C4.',
  howToRead: 'The dashed square is where the upper voice started (E4) and the arrow shows its single step to F4. The lower voice, the circle on C4, does not move. The keys are coloured for the pair where you finish, and the two badges name the start and the end.',
  sources: ['M03N/D05-native.svg (facts, octaves added)', 'week2/fixtures.ts A.upperEF', 'replaces W2-02_dyad-transformations case 1'],
  build(c) {
    const W = W_IN(c), f = pairAt(A.upperEF, 1)!, t = pairAt(A.upperEF, 3)!
    const m = moveFigure(c, W, { from: f, to: t, hues: { from: f[1] - f[0], to: t[1] - t[0] } })
    return { title: 'One voice moves: a major third becomes a perfect fourth', desc: moveDesc(f, t) + ` The pair changes from a major third (${sem(4)}) to a perfect fourth (${sem(5)}).`, blocks: [head(c, 'Lesson 2A · step 6', 'One stays, one moves'), voiceKey(c, W, true), m, badgePair(c, W, f, t)], gap: 12 }
  },
})

add({
  id: '2A-06', row: '2A-06', group: '2A', disp: 'REVISE', kind: 'figure', title: 'The foundation can travel',
  steps: ['2A:7'], state: 'I', semis: [4, 5, 2], plogger: [], forbid: ['contrary', 'similar', 'parallel', 'diminished', 'tritone'],
  alt: 'Two keyboards from B3 to G4. First, the lower voice falls from C4 to B3 while the upper E4 holds: a major third becomes a perfect fourth. Second, the lower voice rises from C4 to D4 while E4 holds: a major third becomes a major second.',
  teaches: 'The lower voice can move too. C4 down to B3 under E4 makes a perfect fourth (5 semitones); C4 up to D4 makes a major second (2 semitones).',
  howToRead: 'Each keyboard starts from the same pair, C4 and E4, shown by dashed marks. Read the arrow above the keys to see which way the lower voice went and by how much, then read the badges for the new pair. The keyboard starts at B3, so the key just below C4 is on the picture.',
  sources: ['M03N/D06-native.svg (octaves, B3 window, hue)', 'week2/fixtures.ts A.lowerCB, A.lowerCD', 'replaces W2-06_two-lines-on-one-keyboard (no B3)'],
  build(c) {
    const W = W_IN(c)
    const panel1 = (ev: NoteEvent[]): Block => { const f = pairAt(ev, 1)!, t = pairAt(ev, 3)!; return col([moveFigure(c, W, { from: f, to: t, hues: { to: t[1] - t[0] } }), badgePair(c, W, f, t)], 10) }
    const a = pairAt(A.lowerCB, 1)!, b = pairAt(A.lowerCB, 3)!, d = pairAt(A.lowerCD, 3)!
    return { title: 'The foundation can travel', desc: moveDesc(a, b) + ` Result: a perfect fourth, ${sem(5)}. Second panel: ` + moveDesc(a, d) + ` Result: a major second, ${sem(2)}.`, blocks: [head(c, 'Lesson 2A · step 7', 'The foundation can travel'), voiceKey(c, W, true), sub(c, 'Lower voice falls'), panel1(A.lowerCB), rule(c), sub(c, 'Lower voice rises'), panel1(A.lowerCD)], gap: 10 }
  },
})

add({
  id: '2A-07', row: '2A-07', group: '2A', disp: 'DERIVE', kind: 'figure', title: 'Three changes from one beginning',
  steps: ['2A:8', '2A:10'], state: 'I', semis: [4, 5, 2], plogger: [], forbid: ['contrary', 'similar', 'parallel', 'diminished', 'tritone'],
  alt: 'A table of three changes that all start from C4 + E4, a major third: upper voice up one gives C4 + F4; lower voice down one gives B3 + E4; lower voice up two gives D4 + E4.',
  teaches: 'One beginning, three small changes, three different results: perfect fourth, perfect fourth, major second. The summary the lesson ends on.',
  howToRead: 'Each card names the change in words, then lists the start pair and the end pair with their colour bars. Compare the end swatches: the first two changes land on the same colour, because both give 5 semitones, even though different notes moved.',
  sources: ['M03N/D09-native.svg, D10-native.svg (recap form)', 'week2/fixtures.ts A.upperEF, A.lowerCB, A.lowerCD'],
  build(c) {
    const W = W_IN(c), s = AG(A.together)
    const card = (label: string, ev: NoteEvent[]): Block => {
      const t = pairAt(ev, 3)!, v0 = ivl(...s), v1 = ivl(...t), line = (p: [number, number], v: ReturnType<typeof ivl>, y: number) => `<rect x="0" y="${y}" width="9" height="30" rx="4" fill="${v.hex}"/>` + txt(20, y + 14, `${pairText(...p)} · ${v.abbr}`, { size: 15, weight: 700, fill: INK, sans: true }) + txt(20, y + 29, `${v.name}, ${sem(v.semis)}`, { size: 13, fill: RESTINK, sans: true })
      return { w: W, h: 124, body: `<rect x="1" y="1" width="${W - 2}" height="122" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/>` + txt(14, 26, label, { size: 15.5, weight: 700, fill: LABEL_INK }) + `<g transform="translate(14 38)">${line(s, v0, 0)}</g><g transform="translate(${c.narrow ? 14 : W / 2} ${c.narrow ? 76 : 38})">${line(t, v1, 0)}</g>` }
    }
    const cards = [card('1 · Upper voice up one semitone', A.upperEF), card('2 · Lower voice down one semitone', A.lowerCB), card('3 · Lower voice up two semitones', A.lowerCD)]
    const hh = c.narrow ? 124 : 90
    const fix = (b: Block): Block => c.narrow ? b : { ...b, h: hh, body: b.body.replace(/height="122"/, `height="${hh - 2}"`) }
    return { title: 'Three changes from one beginning', desc: 'All three start from C4 + E4, a major third of 4 semitones. Change 1, upper voice up one semitone: C4 + F4, a perfect fourth of 5 semitones. Change 2, lower voice down one semitone: B3 + E4, a perfect fourth of 5 semitones. Change 3, lower voice up two semitones: D4 + E4, a major second of 2 semitones.', blocks: [head(c, 'Lesson 2A · steps 8 and 10', 'One beginning, three changes'), ...cards.map(fix)], gap: 10 }
  },
})

add({
  id: '2A-08', row: '2A-08', group: '2A', disp: 'REVISE', kind: 'worksheet', title: 'Your keyboard sheet: build, then change',
  steps: ['2A:9'], state: 'I', semis: [5], plogger: [], forbid: [],
  alt: 'A printable worksheet: blanks to build a major third and a minor third on your keyboard, and a table of three changes from C4 + E4 with one worked row.',
  teaches: 'A paper companion for working at your own keyboard: write down the notes and counts for a major third, a minor third and three changes. Nothing is scored.',
  howToRead: 'Work on your own keyboard and write what you find on the lines. The first change row is already filled in as an example with its colour bar. The printed version carries the same words and lines in black and white; there is no check button and no score.',
  sources: ['M03N/D09-native.svg', 'public/soundscape/w2/W2-04_blank-two-voice-path_blank.svg (blank-line form)', 'week2/fixtures.ts A.upperEF'],
  build(c) {
    const W = W_IN(c), line = (x: number, y: number, w: number) => `<path d="M${x} ${y} H${x + w}" stroke="${INK}" stroke-width="1.6"/>`
    const f = (label: string, y: number, n: number): string => { const w = c.narrow ? W - 8 : (W - 40) / n, x = (i: number) => c.narrow ? 0 : i * (w + 14); const names = ['Lower note', 'Upper note', 'Letters', 'Semitones'].slice(0, n); return names.map((nmx, i) => txt(x(i), y + 12 + (c.narrow ? i * 40 : 0), nmx, { size: 13, fill: RESTINK, sans: true }) + line(x(i), y + 36 + (c.narrow ? i * 40 : 0), c.narrow ? 150 : w)).join('') + txt(0, y - 14, label, { size: 15, weight: 700, fill: INK, sans: true }) }
    const q = c.narrow ? 200 : 66
    let g = f('Build a major third', 22, 4)
    g += `<g transform="translate(0 ${q + 40})">${f('Build a minor third', 22, 4)}</g>`
    let y = (q + 40) * 2 + 20
    g += txt(0, y, 'Three changes from C4 + E4', { size: 15, weight: 700, fill: INK, sans: true }); y += 14
    const ex = pairAt(A.upperEF, 3)!, v = ivl(...ex)
    const rows: [string, string | null][] = [['Upper voice up 1', `${pairText(...ex)} · ${v.abbr} · 4 letters · ${sem(5)}`], ['Lower voice down 1', null], ['Lower voice up 2', null]]
    rows.forEach(([lbl, filled]) => { const rh = c.narrow ? 74 : 46; g += `<rect x="0" y="${y}" width="${W - 8}" height="${rh}" rx="10" fill="none" stroke="${GRID}" stroke-width="1.5"/>` + txt(12, y + 20, lbl, { size: 14, weight: 700, fill: INK, sans: true }) + (filled ? `<rect x="${c.narrow ? 12 : 190}" y="${y + (c.narrow ? 32 : 12)}" width="8" height="24" rx="4" fill="${v.hex}"/>` + txt(c.narrow ? 28 : 206, y + (c.narrow ? 50 : 30), filled, { size: 13.5, fill: INK, sans: true }) + txt(W - 14, y + 20, 'example', { size: 12, anchor: 'end', italic: true, fill: RESTINK, sans: true }) : line(c.narrow ? 12 : 190, y + (c.narrow ? 54 : 32), W - (c.narrow ? 36 : 210)) + txt(c.narrow ? 12 : 190, y + (c.narrow ? 44 : 22), 'New pair, letters, semitones', { size: 12, fill: RESTINK, sans: true })); y += rh + 10 })
    return { title: 'Your keyboard sheet: build, then change', desc: 'A worksheet with blank lines. Build a major third: lower note, upper note, letters, semitones. Build a minor third: the same four blanks. Three changes from C4 + E4: upper voice up 1 (worked example: C4 + F4, perfect fourth, 4 letters, 5 semitones), lower voice down 1 (blank), lower voice up 2 (blank).', blocks: [head(c, 'Lesson 2A · step 9', 'Your keyboard sheet'), { w: W, h: y + 6, body: g }, note(c, 'Do this on your own keyboard. Nothing here is scored or sent anywhere.', { size: 13.5, fill: RESTINK })], gap: 8 }
  },
})

add({
  id: '2A-09', row: '2A-09 (N derivative of IPF-intro-05)', group: '2A', disp: 'DERIVE', kind: 'figure', title: 'One after another, and together',
  steps: ['2A:2'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone', 'third'],
  alt: 'Two rows. In the first, C4 then E4 are played one after the other. In the second, C4 and E4 are played together, E4 above C4.',
  teaches: 'Two notes can be played one after another or at the same time. Together, the lower note sits under the upper note.',
  howToRead: 'In the first row, read left to right: the lower note first, then the upper note. In the second row the two notes share one slot: the square (upper) sits above the circle (lower) because they sound at the same moment. Try both on your own keyboard.',
  sources: ['public/soundscape/m05/info/IPF-intro-05.svg (reused later, at step 5, for the named version)', 'lib/soundscape/m05/info-svg.ts strip2() idea (neutral derivative: no hue, no name)'],
  build(c) {
    const W = W_IN(c), bw = 120, bh = 40
    const slot = (x: number, y: number, p: number, v: 'lower' | 'upper') => `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" fill="${v === 'lower' ? '#ece5d9' : KEYFACE}" stroke="${INK}" stroke-width="${v === 'lower' ? 1.8 : 2.6}"/>` + glyph(c, v, x + 18, y + bh / 2, 6) + txt(x + bw / 2 + 8, y + bh / 2 + 6, nm(p), { size: 17, weight: 700, anchor: 'middle', fill: INK, sans: true })
    const g1 = txt(0, 20, 'One after another', { size: 15, weight: 700, fill: INK, sans: true }) + slot(0, 32, P_CE[0], 'lower') + ARR(bw + 14, 52, 36) + slot(bw + 62, 32, P_CE[1], 'upper') + txt(0, 92, 'Play C4, then E4.', { size: 13.5, fill: RESTINK, sans: true })
    const g2 = txt(0, 20, 'Together', { size: 15, weight: 700, fill: INK, sans: true }) + slot(0, 32, P_CE[1], 'upper') + slot(0, 32 + bh + 6, P_CE[0], 'lower') + txt(bw + 20, 76, 'Play both at once.', { size: 13.5, fill: RESTINK, sans: true })
    const w1 = { w: W, h: 104, body: g1 }, w2 = { w: W, h: 116, body: g2 }
    return { title: 'One after another, and together', desc: 'Row one: C4 (lower voice, circle) then E4 (upper voice, square), one after the other. Row two: E4 above C4 in one slot, played together. No interval name is shown.', blocks: [head(c, 'Lesson 2A · step 2', 'Two ways to play the same two notes'), voiceKey(c, W), w1, w2], gap: 6 }
  },
})

add({
  id: '2A-10', row: '2A-10', group: '2A', disp: 'DERIVE', kind: 'figure', title: 'The foundation moves: E4 and G4, a minor third',
  steps: ['2A:5'], state: 'I', semis: [3], plogger: [], forbid: ['E♭', 'Eb', 'contrary', 'similar', 'parallel'],
  alt: 'A keyboard from C4 to G4. E4 is the lower voice and G4 the upper voice, both highlighted in the minor third colour, with three numbered hops from E4 to G4.',
  teaches: 'A third does not have to start on C. E4 to G4 spans three letters and three semitones: a minor third, in the minor third colour.',
  howToRead: 'Count the three arcs from E4 up to G4 (E to F, F to F♯, F♯ to G). The keys and the bracket share the minor third colour because that colour belongs to the pair, wherever it sits on the keyboard. The pair is E4 and G4, not C4 and E♭4.',
  sources: ['M03N/D03-native.svg (second half)', 'week2/fixtures.ts A.EG (E4 = 64, G4 = 67)', 'lib/soundscape/m05/info-svg.ts hopRow() idea', 'does not copy the Palette C4 + E♭4 spelling'],
  build(c) {
    const W = W_IN(c), v = ivl(...P_EG), k = keyboard(c, W, { ...WIN.C4_G4, marks: marksPair(P_EG, v.hex), labels: 'all', top: 12 })
    const h = hopRow(c, k, P_EG[0], P_EG[1], k.bottom + 10, v.hex, `${sem(v.semis)} · ${v.name}`)
    return { title: 'The foundation moves: E4 and G4, a minor third', desc: `Keyboard C4 to G4. ${nm(P_EG[0])} lower voice and ${nm(P_EG[1])} upper voice in the minor third colour ${v.hex}. Three numbered hops: E4 to F4, F4 to F♯4, F♯4 to G4. ${v.letters} letters, ${sem(v.semis)}: a minor third.`, blocks: [head(c, 'Lesson 2A · step 5', 'The same idea starting on E4'), voiceKey(c, W), { w: W, h: Math.max(k.h, h.h) + 4, body: k.body + h.body }, badge(c, W, { lo: P_EG[0], hi: P_EG[1] })], gap: 10 }
  },
})

// ================================================================= LESSON 2B
const caseBuild = (c: Ctx, W: number, st: [[number, number], [number, number]], hues: boolean, extra?: { win?: typeof WIN.B3_G4; to?: [number, number]; arrowLabels?: boolean }) => {
  const [f, t] = st
  return moveFigure(c, W, { from: f, to: extra?.to ?? t, hues: hues ? { to: t[1] - t[0] } : undefined, arrowLabels: extra?.arrowLabels, win: extra?.win })
}
const NEUTRAL_2B = [...NAMES, 'semitone', 'six']

add({
  id: '2B-01a', row: '2B-01 (step 2 master)', group: '2B', disp: 'REPLACE', kind: 'figure', title: 'Two paths through time',
  steps: ['2B:1', '2B:2'], state: 'N', semis: [], plogger: [], forbid: [...NEUTRAL_2B, ...MOTION],
  alt: 'Two lines drawn across two stages. The lower line stays on C4. The upper line goes from E4 at stage 1 to F4 at stage 2. A vertical gap at each stage joins the two notes.',
  teaches: 'Each voice has its own path across time (horizontal), and at any one stage the two notes make a gap (vertical). Two directions to look in: along a path, and between the voices.',
  howToRead: 'Read each line from left to right: that is a voice\'s path. Then look straight up at one stage: the vertical gap there is the two notes at that moment. The picture gives only note names and stages. It does not name the pair or the movement; the lesson does that next.',
  sources: ['public/soundscape/w2/SYS-04_voice-path-chart_learner.svg (grammar only; its learner version hid beat 2)', 'week2/fixtures.ts B.upperRises', 'replaces SYS-04'],
  build(c) {
    const W = W_IN(c), s = stages2(B.upperRises as unknown as NoteEvent[])
    const sp = stagePath(c, W, s)
    return { title: 'Two paths through time', desc: `Two stages. Stage 1: ${pairText(...s[0])}. Stage 2: ${pairText(...s[1])}. The lower voice holds ${nm(s[0][0])}. The upper voice goes from ${nm(s[0][1])} to ${nm(s[1][1])}. No interval or movement names are given.`, blocks: [head(c, 'Lesson 2B · step 2', 'Every voice has a path'), voiceKey(c, W), sp, note(c, 'Along a line: one voice over time. Up a stage: the two notes at one moment.', { size: 14 })], gap: 10 }
  },
})

add({
  id: '2B-01b', row: '2B-01 (step 3 master)', group: '2B', disp: 'REPLACE', kind: 'figure', title: 'Before we name it: two journeys',
  steps: ['2B:3'], state: 'N', semis: [], plogger: [], forbid: [...NEUTRAL_2B, ...MOTION, 'up 1', 'down 1', 'up 2'],
  alt: 'Two keyboards from B3 to G4, each starting from C4 and E4. Journey 1: the lower voice moves from C4 to B3 and the upper from E4 to F4. Journey 2: the lower moves from C4 to D4 and the upper from E4 to F4.',
  teaches: 'Two journeys from the same two notes. Compare them: in each, one voice does something different. The picture shows only the notes and the arrows, so you can decide what you notice before it is named.',
  howToRead: 'Each keyboard starts from the dashed shapes on C4 and E4 and ends on the solid shapes. Follow the arrows and compare the two journeys with your eyes and, if you like, with your own keyboard. There are no labels on the endings: that is deliberate, and the next step supplies the names.',
  sources: ['M03N/E01 idea (art E01 dropped: wrong ribbon count)', 'week2/fixtures.ts B.lowerFalls... see FIVE B2/B4, B3/B5 endings', 'replaces SYS-04 learner'],
  limits: 'Inquiry figure: must not carry result labels, sizes, hue or movement words in the picture, title, description or alt.',
  build(c) {
    const W = W_IN(c), j1 = [[M.C4, M.E4], [M.B3, M.F4]] as [[number, number], [number, number]], j2 = [[M.C4, M.E4], [M.D4, M.F4]] as [[number, number], [number, number]]
    const mk = (s: [[number, number], [number, number]]) => moveFigure(c, W, { from: s[0], to: s[1], arrowLabels: false })
    return { title: 'Before we name it: two journeys', desc: `Journey 1: ${pairText(...j1[0])} to ${pairText(...j1[1])}. Journey 2: ${pairText(...j2[0])} to ${pairText(...j2[1])}. Arrows show which way each voice goes. Nothing is named or counted.`, blocks: [head(c, 'Lesson 2B · step 3', 'Two journeys from the same start'), voiceKey(c, W, true), sub(c, 'Journey 1'), mk(j1), sub(c, 'Journey 2'), mk(j2)], gap: 10 }
  },
})

add({
  id: '2B-02', row: '2B-02', group: '2B', disp: 'DERIVE', kind: 'figure', title: 'Three families of motion, with exact examples',
  steps: ['2B:4'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, 'diminished', 'tritone', 'parallel'],
  alt: 'Four small keyboards: oblique (only the upper voice moves), contrary apart, contrary together, and similar. Each starts from two notes and shows an arrow for every voice that moves.',
  teaches: 'The three families of motion as exact keyboard examples: oblique, contrary (both apart and together) and similar. The narrower word "parallel" comes later, in step 6.',
  howToRead: 'Each tile is one example with its definition above it. The dashed shapes are where each voice started and the arrows show where it goes. Contrary covers two examples, moving apart and moving together. Match what the arrows do to the words, not the other way round.',
  sources: ['M03N/E02, E03, E04', 'public/soundscape/w2/SYS-05_motion-glyph-library_source.svg (the strict parallel glyph moves to A-06 and 2B-09)', 'week2/fixtures.ts B.upperRises, B.apart, B.path stage 3→4, B.climb'],
  build(c) {
    const W = W_IN(c), tw = c.narrow ? W : (W - 20) / 2
    const tile = (label: string, def: string, f: [number, number], t: [number, number], tag?: string): Block => {
      const m = moveFigure(c, tw - 16, { from: f, to: t }), p = para(8, 40, def, tw - 16, { size: 13.5, fill: '#4a3a4a', sans: true, lh: 17.5 })
      const h = 40 + p.h + 8 + m.h + 8
      return { w: tw, h, body: `<rect x="1" y="1" width="${tw - 2}" height="${h - 2}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/>` + txt(8, 24, label, { size: 15.5, weight: 700, fill: LABEL_INK }) + (tag ? txt(tw - 10, 24, tag, { size: 12, italic: true, anchor: 'end', fill: RESTINK, sans: true }) : '') + p.svg + `<g transform="translate(8 ${40 + p.h + 8})">${m.body}</g>` }
    }
    const f1 = ST_B1, f4 = ST_B4, f5 = ST_B5
    const tiles = [
      tile('Oblique', 'One voice holds while the other moves.', f1[0], f1[1]),
      tile('Contrary, apart', 'The voices move in opposite directions: away from each other.', f4[0], f4[1]),
      tile('Contrary, together', 'The voices move in opposite directions: toward each other.', PATH[2], PATH[3]),
      tile('Similar', 'Both voices move the same way, perhaps by different amounts.', f5[0], f5[1]),
    ]
    const rowsH: number[] = []
    for (let i = 0; i < tiles.length; i += 2) rowsH.push(Math.max(tiles[i].h, tiles[i + 1]?.h ?? 0))
    const grid: Block = c.narrow ? col(tiles, 12) : { w: c.W, h: rowsH.reduce((a, b) => a + b + 12, -12), body: tiles.map((t, i) => `<g transform="translate(${(i % 2) * (tw + 20)} ${rowsH.slice(0, Math.floor(i / 2)).reduce((a, b) => a + b + 12, 0)})">${t.body}</g>`).join('') }
    return { title: 'Kinds of motion, with exact examples', desc: 'Four keyboards from B3 to G4. Oblique: C4 + E4 to C4 + F4. Contrary, apart: C4 + E4 to B3 + F4. Contrary, together: B3 + F4 to C4 + E4. Similar: C4 + E4 to D4 + F4. Notes and arrows only; no interval names.', blocks: [head(c, 'Lesson 2B · step 4', 'Three families of motion, exactly'), voiceKey(c, W, true), grid], gap: 12 }
  },
})

const single = (id: string, row: string, idx: number, title: string, motion: string, label: string, alt: string, teaches: string, how: string, srcCase: string) => add({
  id, row, group: '2B', disp: 'REVISE', kind: 'figure', title, steps: ['2B:4', '2B:8'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, 'contrary', 'similar', 'parallel', 'semitone'].filter(w => w !== motion.toLowerCase()),
  alt, teaches, howToRead: how, sources: [`M03N/E02-native.svg panel ${srcCase}`, `week2/fixtures.ts FIVE[${idx}] (${FIVE[idx].id})`],
  build(c) {
    const W = W_IN(c), s = [ST_B1, ST_B2, ST_B3][idx], m = moveFigure(c, W, { from: s[0], to: s[1], arrowLabels: false })
    return { title, desc: moveDesc(s[0], s[1]).replace(/, (up|down) \d+ semitones?/g, '') + ` ${motion} motion: one voice holds while the other moves.`, blocks: [head(c, 'Lesson 2B · step 4', `${label}`), voiceKey(c, W, true), m], gap: 10 }
  },
})
single('2B-03', '2B-03', 0, 'Change 1: only the upper voice rises', 'Oblique', 'Only the upper voice moves', 'A keyboard from B3 to G4. The lower voice holds C4; the upper voice moves from E4 up to F4.', 'The first of the five changes: C4 holds while E4 rises to F4. One voice holds and one moves, which is oblique motion.', 'The dashed square is where the upper voice began, on E4, and the arrow takes it to F4. The circle on C4 does not move. The page does not yet say what pair this makes; you will name it later, from the same picture.', 'B1')
single('2B-04', '2B-04', 1, 'Change 2: only the lower voice falls', 'Oblique', 'Only the lower voice falls', 'A keyboard from B3 to G4. The upper voice holds E4; the lower voice moves from C4 down to B3.', 'The second of the five changes: E4 holds while C4 falls to B3. One voice holds, one moves, so this is also oblique.', 'The dashed circle on C4 is where the lower voice began; the arrow takes it left to B3. The square on E4 stays. The keyboard starts at B3, so the new low note is on the picture.', 'B2')
single('2B-05', '2B-05', 2, 'Change 3: only the lower voice rises', 'Oblique', 'Only the lower voice rises', 'A keyboard from B3 to G4. The upper voice holds E4; the lower voice moves from C4 up to D4.', 'The third of the five changes: E4 holds while C4 rises to D4. Again one voice holds and one moves, oblique motion, but the lower voice now moves up.', 'The dashed circle on C4 is the start; the arrow takes the lower voice right to D4, one key below the held E4. Compare with change 2: same voice moving, the other direction.', 'B3')

add({
  id: '2B-06', row: '2B-06', group: '2B', disp: 'REVISE', kind: 'figure', title: 'Change 4: moving apart, B3 and F4, a diminished fifth',
  steps: ['2B:5', '2B:8'], state: 'I', semis: [6], plogger: [6], forbid: ['C4 + F♯4', 'C4–F♯4'],
  alt: 'A keyboard from B3 to G4. The lower voice falls from C4 to B3 and the upper rises from E4 to F4. The new pair, B3 and F4, is a diminished fifth: five letters, six semitones, in the tritone colour with Plogger bracket 6.',
  teaches: 'Moving apart: both voices go in opposite directions, C4 down to B3 and E4 up to F4. The new pair B3 + F4 spans five letters and six semitones: a diminished fifth, shown in the tritone colour with its Plogger chip.',
  howToRead: 'The arrows above the keys show the two voices leaving C4 and E4 in opposite directions. The keys B3 and F4 are tinted with the tritone colour, and the six numbered arcs count every key from B3 to F4. The chip is a separate historic lens, not the colour. These are B3 and F4, not the C4 and F♯4 on the Palette card.',
  sources: ['M03N/E03-native.svg, E08-native.svg (facts)', 'week2/fixtures.ts B.apart (B3 = 59, F4 = 65)', 'lib/soundscape/m05/info-svg.ts panel()/chip() for [6]', 'link: live Palette #ip-06'],
  limits: 'Plogger [6] follows the printed original; shape family is disputed in older code. See A-09 legend.',
  build(c) {
    const W = W_IN(c), [f, t] = ST_B4, v = ivl(t[0], t[1]), m = moveFigure(c, W, { from: f, to: t, hues: { to: v.semis } })
    const k = keyboard(c, W, { ...WIN.B3_G4, marks: marksPair(t, v.hex), labels: 'all', top: 12 })
    const hr = hopRow(c, k, t[0], t[1], k.bottom + 10, v.hex, `${sem(v.semis)} · ${v.letters} letters`)
    const pn = panel(c, Math.min(W, 340), BY(6), 'b4')
    return { title: 'Change 4: moving apart, B3 and F4, a diminished fifth', desc: moveDesc(f, t) + ` The new pair ${v.pair} spans ${v.letters} letters and ${sem(v.semis)}: a diminished fifth, in the tritone colour ${v.hex}, Plogger bracket [6] (straight contour, shadow on both sides, midtone dotted fill).`, blocks: [head(c, 'Lesson 2B · step 5', 'Moving apart: B3 and F4'), voiceKey(c, W, true), m, sub(c, 'Count it: B3 to F4'), { w: W, h: Math.max(k.h, hr.h) + 4, body: k.body + hr.body }, badge(c, W, { lo: t[0], hi: t[1] }), pn], gap: 10 }
  },
})

add({
  id: '2B-07', row: '2B-07', group: '2B', disp: 'REVISE', kind: 'figure', title: 'Change 5: both rise, a major third becomes a minor third',
  steps: ['2B:6', '2B:8'], state: 'I', semis: [4, 3], plogger: [], forbid: [],
  alt: 'A keyboard from B3 to G4. The lower voice rises from C4 to D4 and the upper from E4 to F4. The pair changes from a major third of 4 semitones to a minor third of 3. This is similar motion, not strict parallel.',
  teaches: 'Similar motion: both voices rise, the lower by 2 semitones and the upper by 1. Because the distances differ, the interval shrinks from a major third to a minor third, so this is similar and not strict parallel in this course.',
  howToRead: 'Two arrows go the same way but are not the same size: the lower voice steps over a black key (up 2) and the upper takes one step (up 1). That difference is why the pair changes size. The end keys carry the minor third colour.',
  sources: ['M03N/E04-native.svg', 'week2/fixtures.ts B.climb'],
  build(c) {
    const W = W_IN(c), [f, t] = ST_B5, m = moveFigure(c, W, { from: f, to: t, hues: { to: t[1] - t[0] } })
    return { title: 'Change 5: both rise, a major third becomes a minor third', desc: moveDesc(f, t) + ' Similar motion, not strict parallel in this course. The pair changes from a major third (4 semitones) to a minor third (3 semitones).', blocks: [head(c, 'Lesson 2B · step 6', 'Moving together: similar motion'), voiceKey(c, W, true), m, badgePair(c, W, f, t)], gap: 10 }
  },
})

add({
  id: '2B-08', row: '2B-08', group: '2B', disp: 'REVISE', kind: 'figure', title: 'The five changes, all from C4 + E4',
  steps: ['2B:8', '2B:9', '2B:11'], state: 'I', semis: [5, 2, 6, 3], plogger: [], forbid: [],
  alt: 'A table of five changes, each starting from C4 + E4: only the upper rises gives a perfect fourth; only the lower falls gives a perfect fourth; only the lower rises gives a major second; moving apart gives a diminished fifth; both rising gives a minor third.',
  teaches: 'All five changes side by side, each restarting from the same C4 + E4: which voice moves, the new pair, its interval and its semitone count.',
  howToRead: 'Every row begins from C4 and E4 again; the changes do not chain. Read across: the change in words, the motion word, the end pair, then the interval with its colour. Rows 1 and 2 share a colour because they give the same interval size.',
  sources: ['M03N/E07-native.svg (single 316 × 1182 column; replaced by this landscape table, stacked narrow variant and print table)', 'week2/fixtures.ts FIVE'],
  build(c) {
    const W = W_IN(c)
    const rows = FIVE.map((f, i) => ({ f, st: [ST_B1, ST_B2, ST_B3, ST_B4, ST_B5][i] }))
    const row = (r: { f: typeof FIVE[number]; st: [[number, number], [number, number]] }, i: number): Block => {
      const t = r.st[1], v = ivl(t[0], t[1])
      const a = para(0, 18, `${i + 1} · ${r.f.label}`, c.narrow ? W - 24 : 250, { size: 15, weight: 700, fill: INK, sans: true, lh: 19 })
      const b = `${r.f.motion} motion · ${pairText(...r.st[0])} → ${pairText(...t)}`
      if (c.narrow) {
        const p = para(12, 18 + a.h + 2, b, W - 24, { size: 13.5, fill: '#4a3a4a', sans: true, lh: 17 })
        const y = 18 + a.h + p.h + 12
        return { w: W, h: y + 38, body: `<rect x="1" y="1" width="${W - 2}" height="${y + 36}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/><g transform="translate(12 0)">${a.svg}</g>` + p.svg + `<rect x="12" y="${y}" width="9" height="28" rx="4" fill="${v.hex}"/>` + txt(28, y + 13, `${v.name} · ${v.abbr}`, { size: 14.5, weight: 700, fill: INK, sans: true }) + txt(28, y + 28, sem(v.semis), { size: 13, fill: RESTINK, sans: true }) }
      }
      return { w: W, h: 58, body: `<rect x="1" y="1" width="${W - 2}" height="56" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/><g transform="translate(14 8)">${a.svg}</g>` + txt(262, 24, `${r.f.motion} motion`, { size: 14, weight: 700, fill: '#4a3a4a', sans: true }) + txt(262, 44, `${pairText(...r.st[0])} → ${pairText(...t)}`, { size: 14, fill: '#4a3a4a', sans: true }) + `<rect x="${W - 232}" y="14" width="9" height="30" rx="4" fill="${v.hex}"/>` + txt(W - 216, 28, `${v.name} · ${v.abbr}`, { size: 14.5, weight: 700, fill: INK, sans: true }) + txt(W - 216, 44, sem(v.semis), { size: 13, fill: RESTINK, sans: true }) }
    }
    return { title: 'The five changes, all from C4 + E4', desc: 'Five rows, each starting from C4 + E4. ' + rows.map((r, i) => { const t = r.st[1], v = ivl(t[0], t[1]); return `${i + 1}, ${r.f.label}, ${r.f.motion} motion: ${pairText(...t)}, ${v.name}, ${sem(v.semis)}.` }).join(' '), blocks: [head(c, 'Lesson 2B · steps 8, 9 and 11', 'Five changes, one beginning'), ...rows.map(row)], gap: 8 }
  },
})

add({
  id: '2B-09', row: '2B-09', group: '2B', disp: 'CREATE', kind: 'figure', title: 'Similar, and strict parallel',
  steps: ['2B:6'], state: 'I', semis: [4, 3], plogger: [], forbid: [],
  alt: 'Two keyboards from B3 to G4. On the left, C4 + E4 to D4 + F4, similar motion, a major third becoming a minor third. On the right, C4 + E4 to D4 + F♯4, both voices up two semitones and the major third kept: strict parallel, outside the five main changes.',
  teaches: 'Same direction is not always strict parallel. In the course vocabulary strict parallel needs equal distances and an unchanged interval size. Some books use the word "parallel" more widely; both uses are respectable.',
  howToRead: 'The top keyboard is change 5 of the lesson: the two arrows are different sizes and the interval shrinks. The lower keyboard is the strict case, outside the five changes: both arrows are the same size and the end pair is a major third again. Compare the two arrow pairs and the two end colours.',
  sources: ['M03N/E04-native.svg, E10-native.svg (idea)', 'week2/fixtures.ts B.climb, M.Fs4'],
  build(c) {
    const W = W_IN(c), [f, t] = ST_B5, par: [number, number] = [M.D4, M.Fs4]
    const one = (to: [number, number]) => col([moveFigure(c, W, { from: f, to, hues: { to: to[1] - to[0] } }), badgePair(c, W, f, to)], 8)
    return { title: 'Similar, and strict parallel', desc: 'Panel one, similar motion: ' + moveDesc(f, t) + ' Major third to minor third. Panel two, strict parallel, outside the five main changes: ' + moveDesc(f, par) + ' Major third to major third.', blocks: [head(c, 'Lesson 2B · step 6', 'Similar, and the narrower word "parallel"'), voiceKey(c, W, true), sub(c, 'Similar: the distances differ, the interval changes'), one(t), rule(c), sub(c, 'Strict parallel: equal distances, the interval is kept (outside the five changes)'), one(par)], gap: 10 }
  },
})

add({
  id: '2B-10', row: '2B-10', group: '2B', disp: 'REVISE', kind: 'figure', title: 'A two-voice path in four stages',
  steps: ['2B:10'], state: 'I', semis: [4, 5, 6], plogger: [], forbid: ['seconds', ' sec'],
  alt: 'A path over four stages. Stage 1: C4 + E4, major third. Stage 2: C4 + F4, perfect fourth. Stage 3: B3 + F4, diminished fifth. Stage 4: C4 + E4, major third. The lower voice holds, falls, then rises; the upper voice rises, holds, then falls.',
  teaches: 'A short path through four stages that uses the lesson\'s changes in a row. Each stage has its own pair and colour, and the path ends where it began.',
  howToRead: 'Read left to right, stage by stage. Each vertical coloured bar joins the two notes of that stage and names its interval underneath; the lines show how each voice travels between stages. Stages are steps in order, with no clock, so take as long as you like at each.',
  sources: ['M03N/E11-native.svg (re-timed to stages)', 'week2/fixtures.ts B.path', 'old W2-04, SYS-09 (blank form is 2B-10b)'],
  build(c) {
    const W = W_IN(c), hues = PATH.map(p => p[1] - p[0]), labels = PATH.map(p => ivl(p[0], p[1]).abbr + ' · ' + (p[1] - p[0]))
    const sp = stagePath(c, W, PATH, { hues, labels })
    return { title: 'A two-voice path in four stages', desc: 'Four stages. ' + PATH.map((p, i) => { const v = ivl(p[0], p[1]); return `Stage ${i + 1}: ${v.pair}, ${v.name}, ${sem(v.semis)}.` }).join(' ') + ' Stages are steps in order, with no clock.', blocks: [head(c, 'Lesson 2B · step 10', 'A path of four stages'), voiceKey(c, W), sp, note(c, 'Stages are steps in order, with no clock. Colour bars name each stage\'s pair.', { size: 13.5, fill: RESTINK })], gap: 10 }
  },
})

add({
  id: '2B-10b', row: '2B-10 (blank sheet)', group: '2B', disp: 'REVISE', kind: 'worksheet', title: 'Your two-voice path sheet',
  steps: ['2B:10'], state: 'N', semis: [], plogger: [], forbid: [...NAMES],
  alt: 'A blank worksheet with four stage columns and two rows for the upper and lower voice, plus a row for the interval at each stage.',
  teaches: 'A paper sheet for drawing your own four-stage path: write the upper and lower note at each stage, then the interval you find.',
  howToRead: 'Each column is one stage. Write the upper note in the top box and the lower note in the lower box, then work out the letters and semitones in the bottom box using your own keyboard. Join the boxes with lines to draw each voice\'s path. Nothing is scored.',
  sources: ['public/soundscape/w2/W2-04_blank-two-voice-path_blank.svg', 'public/soundscape/w2/SYS-09_two-voice-timeline_blank.svg', 'concept only; rebuilt with stages and the lane grammar'],
  build(c) {
    const W = W_IN(c), n = 4, gx = c.narrow ? 70 : 118, cw = (W - gx - 4) / n, rows = ['Upper voice', 'Lower voice', 'Interval']
    let g = '', y0 = 28
    for (let i = 0; i < n; i++) g += txt(gx + i * cw + cw / 2, y0 - 8, `stage ${i + 1}`, { size: 12.5, weight: 700, anchor: 'middle', fill: RESTINK, sans: true })
    rows.forEach((r, ri) => {
      const y = y0 + ri * 62
      g += (c.narrow ? para(0, y + 24, r, gx - 6, { size: 13, weight: 700, fill: INK, sans: true, lh: 15 }).svg : txt(0, y + 30, r, { size: 14, weight: 700, fill: INK, sans: true }))
      for (let i = 0; i < n; i++) g += `<rect x="${gx + i * cw + 3}" y="${y}" width="${cw - 6}" height="50" rx="9" fill="none" stroke="${GRID}" stroke-width="1.6"/>`
      if (ri < 2) g += glyph(c, ri === 0 ? 'upper' : 'lower', gx - 12, y + 25, 5)
    })
    return { title: 'Your two-voice path sheet', desc: 'A blank sheet with four stage columns and three rows: upper voice, lower voice, interval. Boxes are empty for the learner to fill in.', blocks: [head(c, 'Lesson 2B · step 10', 'Draw your own path'), { w: W, h: y0 + 3 * 62, body: g }, note(c, 'Write the notes and the interval at each stage, then join the boxes to draw each voice\'s path.', { size: 13.5, fill: RESTINK })], gap: 8 }
  },
})

const e11 = (named: boolean) => add({
  id: named ? '2B-11' : '2B-11n', row: '2B-11', group: '2B', disp: 'REVISE', kind: 'figure', title: named ? 'Contrary motion, together: B3 + F4 to C4 + E4' : 'Contrary motion, together: the voices move toward each other',
  steps: named ? ['2B:10'] : ['2B:4'], state: named ? 'I' : 'N', semis: named ? [6, 4] : [], plogger: [], forbid: named ? [] : [...NAMES, 'semitone', 'six', 'similar', 'parallel'],
  alt: named ? 'A keyboard from B3 to G4. The lower voice rises from B3 to C4 and the upper falls from F4 to E4, moving toward each other. The pair changes from a diminished fifth of 6 semitones to a major third of 4.' : 'A keyboard from B3 to G4. The lower voice rises from B3 to C4 and the upper voice falls from F4 to E4: the two voices move toward each other.',
  teaches: named ? 'Contrary motion can also go together: the lower voice rises one semitone and the upper falls one, closing the gap from a diminished fifth to a major third.' : 'Contrary motion also covers voices that move toward each other: the lower voice rises and the upper voice falls, and the gap between them closes.',
  howToRead: named ? 'This is the closing move of the four-stage path, drawn on the keyboard. The dashed shapes are B3 and F4; the arrows go toward each other and meet around C4 and E4, where the major third colour appears on the keys.' : 'The dashed shapes are where the voices started, on B3 and F4. The arrows go toward each other and end on C4 and E4. The picture shows the movement only; nothing is named or counted, and no colour is used.',
  sources: ['M03N/E09-native.svg (the "2.5 seconds" label removed)', 'week2/fixtures.ts B.path stage 3 to 4'],
  build(c) {
    const W = W_IN(c), f = PATH[2], t = PATH[3], m = moveFigure(c, W, { from: f, to: t, hues: named ? { to: t[1] - t[0] } : undefined, arrowLabels: named })
    return { title: named ? 'Contrary motion, together: B3 + F4 to C4 + E4' : 'Contrary motion, together: the voices move toward each other', desc: named ? moveDesc(f, t) + ' The voices move toward each other: contrary motion, together. Diminished fifth (6 semitones) to major third (4 semitones).' : moveDesc(f, t).replace(/, (up|down) \d+ semitones?/g, '') + ' The voices move toward each other.', blocks: [head(c, named ? 'Lesson 2B · step 10' : 'Lesson 2B · step 4', named ? 'Contrary motion that closes the gap' : 'Contrary motion, toward each other'), voiceKey(c, W, true), m, ...(named ? [badgePair(c, W, f, t)] : [])], gap: 10 }
  },
})
e11(false)
e11(true)

add({
  id: '2B-12', row: '2B-12', group: '2B', disp: 'CREATE', kind: 'figure', title: 'Two kinds of words: along a path, up a stage',
  steps: ['2B:7', '2B:9'], state: 'N+I', semis: [5], plogger: [], forbid: [],
  alt: 'A two-stage path: the lower voice holds C4, the upper rises from E4 to F4. A horizontal arrow marks the upper path across time. A vertical bracket at stage 2 marks the interval, a perfect fourth, at that one moment.',
  teaches: 'Movement words (oblique, contrary, similar, parallel) describe what voices do between stages, along the path. Interval words (the names of intervals) describe a pair of notes at a single stage, up the page.',
  howToRead: 'Follow the upper line left to right: that horizontal direction is movement. Then look straight up the page at stage 2: that vertical gap, the only coloured part, is the interval. One kind of word is about travelling, the other about distance at one moment.',
  sources: ['concept new; kit stagePath()', 'week2/fixtures.ts B.upperRises'],
  build(c) {
    const W = W_IN(c), s = stages2(B.upperRises as unknown as NoteEvent[]), sp = stagePath(c, W, s, { hues: [null, s[1][1] - s[1][0]] })
    const v = ivl(s[1][0], s[1][1])
    const t1 = para(0, 14, 'Movement words: what each voice does from one stage to the next, along a path.', W, { size: 14, fill: '#4a3a4a', sans: true, lh: 18 })
    const t2 = para(0, 14, `Interval words: the pair at one stage, ${v.pair}, a ${v.name}.`, W, { size: 14, fill: '#4a3a4a', sans: true, lh: 18 })
    return { title: 'Two kinds of words: along a path, up a stage', desc: `Two stages. Lower voice holds ${nm(s[0][0])}; upper voice goes from ${nm(s[0][1])} to ${nm(s[1][1])}. Along the path: movement words. At stage 2, ${v.pair}: a ${v.name}, ${sem(v.semis)}, in the perfect fourth colour. Interval words describe the pair at a single stage.`, blocks: [head(c, 'Lesson 2B · steps 7 and 9', 'Two kinds of words'), voiceKey(c, W), sp, { w: W, h: t1.h + 4, body: t1.svg }, { w: W, h: t2.h + 4, body: t2.svg }], gap: 8 }
  },
})

add({
  id: '2B-13', row: '2B-13 (added)', group: '2B', disp: 'REVISE', kind: 'figure', title: 'The tritone family: B3–F4 beside the Palette card C4–F♯4',
  steps: ['2B:5'], state: 'I', semis: [6], plogger: [6], forbid: [],
  alt: 'Two keyboards, both in the tritone colour with Plogger bracket 6. First, B3 and F4 from the lesson: five letters, six semitones, a diminished fifth. Second, C4 and F♯4 from the Palette card: four letters, six semitones, written as an augmented fourth.',
  teaches: 'Two different pairs, one tritone colour and one chip. B3–F4 (five letters) and C4–F♯4 (four letters) are both six semitones. The lesson uses B3–F4; the Palette card draws C4–F♯4. They are separate examples of the same family.',
  howToRead: 'Compare the two keyboards. The key colour and the chip are identical because both pairs are six semitones. The note names differ because the pairs sit in different places and are spelled with different letters. The Palette page (card 6) shows the second; this lesson works with the first.',
  sources: ['M03N/T05-native.svg (octaves, hue and chip added)', 'lib/soundscape/resources/interval-data.json IP-06 (C4 + F♯4; alternate spelling C4 + G♭4)', 'lib/soundscape/m05/info-svg.ts chip()/panel()', 'link: live Palette #ip-06'],
  build(c) {
    const W = W_IN(c), hex = identityHex(6)
    const one = (lo: number, hi: number, win: typeof WIN.B3_G4, label: string): Block => {
      const k = keyboard(c, W, { ...win, marks: [{ midi: lo, voice: 'lower', hex }, { midi: hi, voice: 'upper', hex }], labels: 'all', top: 12 })
      const br = bracket(c, W, k.xc(lo), k.xc(hi), k.h + 2, hex, label)
      return { w: W, h: Math.max(k.h, br.h) + 2, body: k.body + br.body }
    }
    const pn = panel(c, Math.min(W, 340), BY(6), 'b13')
    return { title: 'The tritone family: B3–F4 beside the Palette card C4–F♯4', desc: `Keyboard one, from the lesson: B3 and F4, five letters, six semitones, a diminished fifth, tritone colour ${hex}. Keyboard two, from the Palette card: C4 and F♯4, four letters, six semitones, written as an augmented fourth, the same tritone colour. Same colour and same Plogger bracket [6].`, blocks: [head(c, 'Lesson 2B · step 5', 'Same family, two different pairs'), voiceKey(c, W), sub(c, 'In this lesson: B3 + F4'), one(M.B3, M.F4, WIN.B3_G4, 'B3 + F4 · diminished fifth · 5 letters · 6 semitones'), rule(c), sub(c, 'On the Palette card: C4 + F♯4'), one(M.C4, M.Fs4, WIN.C4_G4, 'C4 + F♯4 · augmented fourth · 4 letters · 6 semitones'), pn, note(c, 'See Palette card 6 (#ip-06) on the live Interval Palette page.', { size: 13, fill: RESTINK })], gap: 10 }
  },
})

// ================================================================= LESSON 2C
const HELD = C.held as NoteEvent[], MOVING = C.moving as NoteEvent[]
const bandsOf = toBand
const stepsOf = (ev: NoteEvent[]) => `Upper voice: ${ev.filter(e => e.role === 'melody').map(e => `${nm(e.midi)} ${e.start} to ${e.start + e.dur} s`).join(', ')} (rests in between). Lower voice: ${ev.filter(e => e.role === 'drone').map(e => `${nm(e.midi)} ${e.start} to ${e.start + e.dur} s`).join(', ')}.`
const timeline = (c: Ctx, W: number, ev: NoteEvent[], o: { bands?: boolean; marks?: boolean; only?: number }, nameU = 'Upper voice', nameL = 'Lower voice') =>
  lanes(c, W, laneSpecs(ev, nameU, nameL), 36, { tick: 6, bands: o.bands ? (o.only != null ? bandsOf(ev).filter((_, i) => i === o.only) : bandsOf(ev)) : undefined, marks: o.marks ? [{ t: 12, label: '12 s' }, { t: 24, label: '24 s' }] : undefined })

add({
  id: '2C-01', row: '2C-01', group: '2C', disp: 'REVISE', kind: 'figure', title: 'Two 36-second sketches: same upper line, different lower line',
  steps: ['2C:1', '2C:3'], state: 'N', semis: [], plogger: [], forbid: [...NAMES, ...MOTION, 'semitone'],
  alt: 'Two 36-second timelines. In both, the upper voice plays E4 from 4 to 10 seconds, F4 from 14 to 20 and E4 from 26 to 32, resting in between. In Version A the lower voice holds C4 throughout. In Version B the lower voice plays C4 to 12 seconds, B3 from 12 to 24, then C4 again.',
  teaches: 'Two sketches of the same melody over different lower lines. The upper line is identical in both; only the lower voice differs.',
  howToRead: 'Each timeline is 36 seconds wide. Upper lane first, lower lane below. Solid bars are notes, dashed boxes are rests. Compare the two upper lanes: they match exactly. Then compare the two lower lanes: Version A holds one note, Version B changes it twice.',
  sources: ['M03N/F01-native.svg', 'week2/fixtures.ts C.held, C.moving (upper at 4–10, 14–20, 26–32)'],
  build(c) {
    const W = W_IN(c)
    return { title: 'Two 36-second sketches: same upper line, different lower line', desc: `Version A. ${stepsOf(HELD)} Version B. ${stepsOf(MOVING)} The upper voice is identical in both versions.`, blocks: [head(c, 'Lesson 2C · steps 1 and 3', 'Same melody, different lower line'), voiceKey(c, W), sub(c, 'Version A'), timeline(c, W, HELD, {}), sub(c, 'Version B'), timeline(c, W, MOVING, {})], gap: 10 }
  },
})

add({
  id: '2C-02', row: '2C-02', group: '2C', disp: 'REVISE', kind: 'figure', title: 'Version A: one voice holds the landscape',
  steps: ['2C:3'], state: 'I', semis: [4, 5], plogger: [], forbid: ['diminished', 'tritone'],
  alt: 'A 36-second timeline. The lower voice holds C4 the whole time. The upper voice plays E4 from 4 to 10 seconds, F4 from 14 to 20, E4 from 26 to 32, resting in between. The pairs sounding are a major third, a perfect fourth, then a major third.',
  teaches: 'With a held lower note, the pair changes only when the upper voice moves: C4 + E4 (major third), C4 + F4 (perfect fourth), then C4 + E4 again.',
  howToRead: 'Colour bands appear only while both voices sound; where the upper voice rests there is no pair, so there is no colour. Read the band labels left to right: M3 for 4 semitones, P4 for 5, M3 again. The lower voice is the same note under all three.',
  sources: ['M03N/F02-native.svg (bar positions verified exact)', 'week2/fixtures.ts C.held'],
  build(c) {
    const W = W_IN(c), pairs = bandsOf(HELD).map(b => { const p = pairAt(HELD, b.from + 0.1)!; return `${b.from} to ${b.to} s: ${pairText(...p)}, ${ivl(...p).name}` }).join('; ')
    return { title: 'Version A: one voice holds the landscape', desc: stepsOf(HELD) + ` Sounding pairs: ${pairs}. Colour bands mark only the times when both voices sound.`, blocks: [head(c, 'Lesson 2C · step 3', 'Version A: the lower voice holds'), voiceKey(c, W), timeline(c, W, HELD, { bands: true }), note(c, 'Colour appears only while both voices sound. At rests there is no pair, so no colour.', { size: 13.5, fill: RESTINK })], gap: 10 }
  },
})

add({
  id: '2C-03', row: '2C-03', group: '2C', disp: 'REVISE', kind: 'figure', title: 'Version B: the landscape begins to travel',
  steps: ['2C:4'], state: 'I', semis: [4, 6], plogger: [], forbid: [],
  alt: 'A 36-second timeline. The lower voice plays C4 to 12 seconds, B3 from 12 to 24, then C4. The upper voice plays E4 from 4 to 10, F4 from 14 to 20, E4 from 26 to 32. The lower changes at 12 and 24 seconds happen while the upper voice rests. The pairs sounding are a major third, B3 + F4 a diminished fifth, then a major third.',
  teaches: 'When the lower voice moves under the same melody, one moment changes: from 14 to 20 seconds the pair is B3 + F4, a diminished fifth, instead of C4 + F4.',
  howToRead: 'The dashed lines at 12 and 24 seconds mark where the lower voice changes. At both moments the upper lane is a dashed rest, so no pair changes at that instant. The F4 only sounds from 14 to 20 seconds, over B3, and that band carries the tritone colour.',
  sources: ['M03N/F03-native.svg (positions verified exact)', 'week2/fixtures.ts C.moving (B3 = 59)'],
  build(c) {
    const W = W_IN(c)
    return { title: 'Version B: the landscape begins to travel', desc: stepsOf(MOVING) + ' The lower voice changes at 12 and 24 seconds while the upper voice rests. From 14 to 20 seconds the sounding pair is B3 + F4, a diminished fifth of 6 semitones, in the tritone colour.', blocks: [head(c, 'Lesson 2C · step 4', 'Version B: the lower voice travels'), voiceKey(c, W), timeline(c, W, MOVING, { bands: true, marks: true }), note(c, 'The lower voice changes at 12 s and 24 s, while the upper voice is resting.', { size: 13.5, fill: RESTINK })], gap: 10 }
  },
})

add({
  id: '2C-04', row: '2C-04', group: '2C', disp: 'REVISE', kind: 'figure', title: 'Same melody, one moment different: A above B',
  steps: ['2C:5'], state: 'I', semis: [4, 5, 6], plogger: [], forbid: [],
  alt: 'Versions A and B on one shared 36-second time scale. The upper voices are identical. A dashed outline marks 14 to 20 seconds, the only time the pair differs: C4 + F4 in A, B3 + F4 in B.',
  teaches: 'Stack the two versions and look: the upper line and the first and last pairs are identical. Only from 14 to 20 seconds does the lower voice change what the pair is.',
  howToRead: 'Both timelines share one time scale so a vertical line crosses both at the same moment. The dashed outline covers 14 to 20 seconds. Inside it the two bands have different colours; outside it they match.',
  sources: ['M03N/F06-native.svg', 'week2/fixtures.ts C.held, C.moving'],
  build(c) {
    const W = W_IN(c), a = timeline(c, W, HELD, { bands: true }), b = timeline(c, W, MOVING, { bands: true }), g = laneGeom(W, 36)
    const heightA = a.h + 30, total = heightA + 34 + b.h
    const outline = `<rect x="${g.X(14) - 5}" y="22" width="${g.X(20) - g.X(14) + 10}" height="${total - 22}" rx="10" fill="none" stroke="${INK}" stroke-width="2.6" stroke-dasharray="7 5"/>` + txt((g.X(14) + g.X(20)) / 2, 15, 'the only difference', { size: 12.5, weight: 700, anchor: 'middle', fill: INK, sans: true })
    return { title: 'Same melody, one moment different: A above B', desc: 'Versions A and B on a shared 36-second scale. Upper voices are identical. A dashed outline marks 14 to 20 seconds. In A the pair is C4 + F4, a perfect fourth of 5 semitones; in B it is B3 + F4, a diminished fifth of 6. The first and last pairs, C4 + E4, are identical.', blocks: [head(c, 'Lesson 2C · step 5', 'Look at both together'), voiceKey(c, W), { w: W, h: total + 6, body: outline + `<g transform="translate(0 30)">${txt(0, 12, 'Version A', { size: 14.5, weight: 700, fill: INK, sans: true })}<g transform="translate(0 8)">${a.body}</g></g><g transform="translate(0 ${heightA + 26})">${txt(0, 12, 'Version B', { size: 14.5, weight: 700, fill: INK, sans: true })}<g transform="translate(0 8)">${b.body}</g></g>` }], gap: 10, } as Built
  },
})

add({
  id: '2C-05', row: '2C-05', group: '2C', disp: 'DERIVE', kind: 'figure', title: 'Three snapshots: what stayed, what changed',
  steps: ['2C:5', '2C:6'], state: 'I', semis: [4, 5, 6], plogger: [], forbid: [],
  alt: 'Three snapshots, each with Version A above Version B. At 4 to 10 seconds both are C4 + E4, a major third. At 14 to 20 seconds A is C4 + F4, a perfect fourth, and B is B3 + F4, a diminished fifth. At 26 to 32 seconds both are C4 + E4 again.',
  teaches: 'Three moments side by side. In two of them the two versions have the same pair; in exactly one, the middle, they differ.',
  howToRead: 'Read each column as one moment. The two badges in a column are the pair in Version A and the pair in Version B at that moment. Compare across the row: same, different, same. The middle column also gives the semitone count: 5 against 6.',
  sources: ['M03N/F07-native.svg (extended with the two major third snapshots)', 'week2/fixtures.ts C.held, C.moving'],
  build(c) {
    const W = W_IN(c), times = [[4, 10], [14, 20], [26, 32]] as const, tw = c.narrow ? W : (W - 28) / 3
    const colB = (t: readonly [number, number]): Block => {
      const a = pairAt(HELD, t[0] + 0.1)!, b = pairAt(MOVING, t[0] + 0.1)!, same = a[0] === b[0]
      const ba = badge(c, tw - 4, { lo: a[0], hi: a[1] }), bb = badge(c, tw - 4, { lo: b[0], hi: b[1] })
      const body = txt(2, 20, `${t[0]} to ${t[1]} seconds`, { size: 15, weight: 700, fill: LABEL_INK }) + txt(2, 46, 'Version A', { size: 12.5, fill: RESTINK, sans: true, weight: 700 }) + `<g transform="translate(2 52)">${ba.body}</g>` + txt(2, 52 + ba.h + 22, 'Version B', { size: 12.5, fill: RESTINK, sans: true, weight: 700 }) + `<g transform="translate(2 ${52 + ba.h + 28})">${bb.body}</g>` + txt(2, 52 + ba.h + 28 + bb.h + 20, same ? 'The same pair' : 'Different pairs', { size: 13.5, italic: true, fill: INK, sans: true })
      return { w: tw, h: 52 + ba.h + 28 + bb.h + 42, body: `<rect x="0" y="0" width="${tw}" height="${52 + ba.h + 28 + bb.h + 40}" rx="12" fill="none" stroke="${same ? SOFT : INK}" stroke-width="${same ? 1.4 : 2.6}" ${same ? '' : 'stroke-dasharray="7 5"'}/><g transform="translate(8 6)">${body}</g>` }
    }
    const cs = times.map(colB)
    const grid: Block = c.narrow ? col(cs, 10) : { w: c.W, h: Math.max(...cs.map(x => x.h)), body: cs.map((x, i) => `<g transform="translate(${i * (tw + 14)} 0)">${x.body}</g>`).join('') }
    return { title: 'Three snapshots: what stayed, what changed', desc: 'Snapshot 4 to 10 s: A and B both C4 + E4, major third, 4 semitones. Snapshot 14 to 20 s: A C4 + F4, perfect fourth, 5 semitones; B B3 + F4, diminished fifth, 6 semitones. Snapshot 26 to 32 s: both C4 + E4 again.', blocks: [head(c, 'Lesson 2C · steps 5 and 6', 'Three moments, two versions'), grid] }
  },
})

add({
  id: '2C-06', row: '2C-06', group: '2C', disp: 'CREATE', kind: 'figure', title: 'Four words: voice, vertical interval, voice leading, counterpoint',
  steps: ['2C:2', '2C:6'], state: 'N+I', semis: [4], plogger: [], forbid: [],
  alt: 'Four cards with small diagrams: a voice is one line of notes over time; a vertical interval is the distance between two notes sounding together; voice leading is how each voice moves from one pair to the next; counterpoint is two or more independent lines sounding together.',
  teaches: 'Four words for the week\'s ideas, each with a small picture: one line, the gap between two notes at one moment, how lines travel between moments, and independent lines together.',
  howToRead: 'Each card gives the word, its meaning in one sentence, and a tiny picture built from the same marks as the rest of Week 2. The vertical interval card carries the only colour: C4 + E4, the major third from lesson 2A.',
  sources: ['concept new', 'kit glyph(), badge()'],
  build(c) {
    const W = W_IN(c), tw = c.narrow ? W : (W - 20) / 2
    const card = (word: string, def: string, pic: (w: number) => Block): Block => {
      const p = para(14, 44, def, tw - 28, { size: 13.5, fill: '#4a3a4a', sans: true, lh: 17.5 }), pb = pic(tw - 28), h = 44 + p.h + 10 + pb.h + 12
      return { w: tw, h, body: `<rect x="1" y="1" width="${tw - 2}" height="${h - 2}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/>` + txt(14, 28, word, { size: 17, weight: 600, fill: LABEL_INK }) + p.svg + `<g transform="translate(14 ${44 + p.h + 10})">${pb.body}</g>` }
    }
    const lineP = (w: number): Block => ({ w, h: 40, body: `<path d="M8 28 L${w * 0.3} 12 L${w * 0.55} 22 L${w - 10} 8" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>` + [8, w * 0.3, w * 0.55, w - 10].map((x, i) => glyph(c, 'upper', x, [28, 12, 22, 8][i], 5)).join('') })
    const vertP = (w: number): Block => { const b = badge(c, w, { lo: M.C4, hi: M.E4 }); return { w, h: b.h, body: b.body } }
    const leadP = (w: number): Block => ({ w, h: 44, body: glyph(c, 'upper', 14, 30, 6, true) + ARR(26, 30, w * 0.4 - 26) + glyph(c, 'upper', w * 0.4 + 10, 12, 6) + glyph(c, 'lower', w * 0.6, 32, 6, true) + ARR(w * 0.6 + 12, 32, w * 0.35 - 12) + glyph(c, 'lower', w - 10, 32, 6) })
    const counterP = (w: number): Block => ({ w, h: 44, body: `<path d="M8 12 L${w * 0.4} 12 L${w * 0.7} 6 L${w - 8} 12" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M8 34 L${w * 0.35} 38 L${w * 0.65} 30 L${w - 8} 34" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round" opacity=".6"/>` + glyph(c, 'upper', 8, 12, 5) + glyph(c, 'lower', 8, 34, 5) })
    const cards = [card('Voice', 'One line of notes over time.', lineP), card('Vertical interval', 'The distance between two notes sounding together.', vertP), card('Voice leading', 'How each voice moves from one pair of notes to the next.', leadP), card('Counterpoint', 'Two or more independent lines sounding together.', counterP)]
    const hh = [Math.max(cards[0].h, cards[1].h), Math.max(cards[2].h, cards[3].h)]
    const grid: Block = c.narrow ? col(cards, 12) : { w: c.W, h: hh[0] + 14 + hh[1], body: cards.map((b, i) => `<g transform="translate(${(i % 2) * (tw + 20)} ${i < 2 ? 0 : hh[0] + 14})">${b.body}</g>`).join('') }
    return { title: 'Four words: voice, vertical interval, voice leading, counterpoint', desc: 'Four cards. Voice: one line of notes over time. Vertical interval: the distance between two notes sounding together; example C4 + E4, a major third of 4 semitones. Voice leading: how each voice moves from one pair to the next. Counterpoint: two or more independent lines sounding together.', blocks: [head(c, 'Lesson 2C · step 2', 'Four words for this lesson'), grid] }
  },
})

add({
  id: '2C-07', row: '2C-07', group: '2C', disp: 'REVISE', kind: 'worksheet', title: 'Plan your miniature: two blank timelines',
  steps: ['2C:8', '2C:9'], state: 'N', semis: [], plogger: [], forbid: [...NAMES],
  alt: 'A worksheet with two blank timelines from 0 to 45 seconds, each with an upper and a lower lane, and three lines to complete the sentence plan.',
  teaches: 'A paper planning sheet for your own two sketches: draw where each voice sounds and rests, write note names, and finish three plan sentences.',
  howToRead: 'Each blank timeline runs from 0 to 45 seconds with a tick every 5. The upper lane is for your melody and the lower lane is for the line beneath. Draw bars for notes and leave gaps for rests, writing note names inside. Then complete the three sentences at the bottom. Nothing is scored or sent anywhere.',
  sources: ['public/soundscape/w2/SYS-09_two-voice-timeline_blank.svg', 'public/soundscape/w2/W2-04_blank-two-voice-path_blank.svg (concept)', '2C manuscript step 8 production note (0–45 s)'],
  build(c) {
    const W = W_IN(c), g = laneGeom(W, 45)
    const one = (label: string): Block => {
      const gutter = g.px, X = g.X, laneH = 44, y0 = 24
      let s = txt(0, 14, label, { size: 15, weight: 700, fill: INK, sans: true })
      ;['Upper voice', 'Lower voice'].forEach((n, i) => {
        const y = y0 + i * (laneH + (c.narrow ? 24 : 10)) + (c.narrow ? 14 : 0)
        s += c.narrow ? txt(0, y - 5, n, { size: 13, weight: 700, fill: INK, sans: true }) : txt(4, y + 28, n, { size: 14, weight: 700, fill: INK, sans: true })
        s += `<rect x="${gutter}" y="${y}" width="${W - gutter - 10}" height="${laneH}" rx="8" fill="none" stroke="${GRID}" stroke-width="1.6"/>`
      })
      const ay = y0 + 2 * (laneH + (c.narrow ? 24 : 10)) + (c.narrow ? 14 : 0) + 2
      s += `<path d="M${gutter} ${ay} h${W - gutter - 10}" stroke="${GRID}" stroke-width="1.5"/>`
      for (let t = 0; t <= 45; t += 5) s += `<path d="M${X(t)} ${ay} v6" stroke="${GRID}" stroke-width="1.5"/>` + txt(X(t), ay + 22, String(t), { size: 12, anchor: 'middle', fill: RESTINK, sans: true })
      s += txt(W - 10, ay + 38, 'seconds', { size: 12, anchor: 'end', italic: true, fill: RESTINK, sans: true })
      return { w: W, h: ay + 46, body: s }
    }
    const lines = ['My upper melody is', 'In version one, the lower voice', 'In version two, the lower voice'].map((t, i) => txt(0, 18 + i * 40, t, { size: 14, fill: INK, sans: true }) + `<path d="M${c.narrow ? 0 : 230} ${c.narrow ? 18 + i * 40 + 22 : 18 + i * 40} H${W - 12}" stroke="${INK}" stroke-width="1.5"/>`).join('')
    return { title: 'Plan your miniature: two blank timelines', desc: 'A worksheet. Two blank timelines from 0 to 45 seconds with an upper lane and a lower lane, and three plan sentences with blank lines: my upper melody is, in version one the lower voice, in version two the lower voice.', blocks: [head(c, 'Lesson 2C · steps 7 to 9', 'Plan your two sketches'), one('Version one: the lower voice holds'), one('Version two: the lower voice changes'), { w: W, h: 124, body: lines }, note(c, 'Use note names. This sheet is for you; it is not submitted anywhere.', { size: 13.5, fill: RESTINK })], gap: 10 }
  },
})

add({
  id: '2C-08', row: '2C-08', group: '2C', disp: 'REVISE', kind: 'figure', title: 'What changes, and your response',
  steps: ['2C:9'], state: 'I', semis: [5, 6], plogger: [], forbid: [],
  alt: 'Two panels. Left: what changes, from 14 to 20 seconds, Version A is C4 + F4, a perfect fourth, and Version B is B3 + F4, a diminished fifth. Right: your response, blank lines to finish the sentence: I kept something the same, I moved something, the result felt something.',
  teaches: 'Separate what the notes did (a fact) from what you make of it (your response). The facts are shown; the response is yours and has no correct answer.',
  howToRead: 'The left panel states what changed, with the pairs and their colour bars. The right panel is empty on purpose: complete the sentence in your own words. There is no right feeling to write.',
  sources: ['M03N/F05-native.svg', 'week2/fixtures.ts C.held, C.moving'],
  build(c) {
    const W = W_IN(c)
    const left = (w: number): Block => { const a = pairAt(HELD, 15)!, b = pairAt(MOVING, 15)!, ba = badge(c, w - 8, { lo: a[0], hi: a[1] }), bb = badge(c, w - 8, { lo: b[0], hi: b[1] }); return col([note(c, 'What changes (fact)', { size: 15, weight: 700, fill: INK, w }), note(c, 'From 14 to 20 seconds:', { size: 13.5, w }), note(c, 'Version A', { size: 12.5, fill: RESTINK, weight: 700, w }), ba, note(c, 'Version B', { size: 12.5, fill: RESTINK, weight: 700, w }), bb], 6) }
    const right = (w: number): Block => { let g = txt(0, 20, 'Your response (open)', { size: 15, weight: 700, fill: INK, sans: true }); ;['I kept', 'I moved', 'The result felt'].forEach((t, i) => { g += txt(0, 62 + i * 46, t, { size: 14, fill: INK, sans: true }) + `<path d="M${t.length * 7.6 + 10} ${62 + i * 46} H${w - 6}" stroke="${INK}" stroke-width="1.5"/>` }); return { w, h: 62 + 3 * 46, body: g } }
    return { title: 'What changes, and your response', desc: 'Left panel, what changes, 14 to 20 seconds: Version A is C4 + F4, a perfect fourth of 5 semitones; Version B is B3 + F4, a diminished fifth of 6 semitones. Right panel, your response: blank lines for I kept, I moved, the result felt.', blocks: [head(c, 'Lesson 2C · step 9', 'What changed, and what you make of it'), twoUp(c, w => [left(w), right(w)]), note(c, 'There is no correct feeling to write. Your music stays in your own studio.', { size: 13.5, fill: RESTINK })], gap: 12 }
  },
})

add({
  id: '2C-09', row: '2C-09', group: '2C', disp: 'REVISE', kind: 'figure', title: 'Week 2 in three anchors',
  steps: ['2C:10'], state: 'I', semis: [4, 5, 6], plogger: [], forbid: ['week 3', 'phrase'],
  alt: 'Three cards: an interval is two notes together, counted in letters and semitones, example C4 + E4; motion is how two voices change, oblique, contrary or similar; two lines can make changing harmony, example C4 + F4 against B3 + F4.',
  teaches: 'The whole week in three sentences: an interval is a pair counted two ways; motion is what two voices do between pairs; two lines are enough to make changing harmony.',
  howToRead: 'Each card is one idea with one example from the week. Read them as a chain: first the pair, then the movement between pairs, then how a different lower line changes the harmony under the same melody. The picture ends here; Week 3 is introduced in text only.',
  sources: ['M03N/F10-native.svg (676 × 758, 8 px text: rebuilt for 12 px minimum)', 'week2/fixtures.ts'],
  build(c) {
    const W = W_IN(c)
    const card = (n: string, t: string, d: string, ex: Block): Block => { const p = para(14, 52, d, W - 28, { size: 14, fill: '#4a3a4a', sans: true, lh: 18 }), h = 52 + p.h + 8 + ex.h + 12; return { w: W, h, body: `<rect x="1" y="1" width="${W - 2}" height="${h - 2}" rx="12" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${GRID}" stroke-width="1.5"/>` + txt(14, 30, `${n} · ${t}`, { size: 17, weight: 600, fill: LABEL_INK }) + p.svg + `<g transform="translate(14 ${52 + p.h + 8})">${ex.body}</g>` } }
    const bw = W - 28, e3a = badge(c, c.narrow ? bw : (bw - 20) / 2, { lo: M.C4, hi: M.F4 }), e3b = badge(c, c.narrow ? bw : (bw - 20) / 2, { lo: M.B3, hi: M.F4 })
    const ex3: Block = c.narrow ? col([e3a, e3b], 8) : { w: bw, h: Math.max(e3a.h, e3b.h), body: e3a.body + `<g transform="translate(${(bw - 20) / 2 + 20} 0)">${e3b.body}</g>` }
    const mo = note(c, 'Oblique: one holds. Contrary: opposite ways. Similar: the same way.', { size: 14, weight: 700, fill: INK, w: bw })
    return { title: 'Week 2 in three anchors', desc: 'Three cards. 1 An interval: two notes together, counted in letters and semitones, example C4 + E4, a major third. 2 Motion: how two voices change between pairs: oblique, contrary, similar. 3 Two lines can make changing harmony: C4 + F4, a perfect fourth, against B3 + F4, a diminished fifth, under the same upper note.', blocks: [head(c, 'Lesson 2C · step 10', 'Week 2 in three ideas'), card('1', 'An interval is a pair', 'Two notes together, counted in letters and in semitones.', badge(c, bw, { lo: M.C4, hi: M.E4 })), card('2', 'Motion is what voices do', 'How two voices change from one pair to the next.', mo), card('3', 'Two lines can change the harmony', 'Under the same upper note, a different lower note makes a different pair.', ex3)], gap: 10 }
  },
})

add({
  id: '2C-10', row: '2C-10', group: '2C', disp: 'DERIVE', kind: 'figure', title: 'The truth check: the lower voice moves while the upper rests',
  steps: ['2C:4', '2C:5', '2C:6'], state: 'I', semis: [6], plogger: [], forbid: [],
  alt: 'Version B timeline with dashed markers at 12 and 24 seconds, where the lower voice changes. The upper voice is resting at both markers. F4 sounds only from 14 to 20 seconds, over B3, forming a diminished fifth.',
  teaches: 'A check on the sketch: the lower voice changes at 12 and 24 seconds, but the upper voice is resting then, so F4 is never sounding when the lower note changes. F4 appears only from 14 to 20 seconds, over B3.',
  howToRead: 'Look at the two dashed markers. At each, the upper lane is a dashed rest box: no upper note is sounding. Then find the one band, 14 to 20 seconds, where F4 sits over B3. Nothing sounds as F4 over C4 in this version.',
  sources: ['M03N/F06-native.svg + overlay', 'week2/fixtures.ts C.moving'],
  build(c) {
    const W = W_IN(c), t = timeline(c, W, MOVING, { bands: true, marks: true, only: 1 })
    return { title: 'The truth check: the lower voice moves while the upper rests', desc: stepsOf(MOVING) + ' Dashed markers at 12 and 24 seconds: the upper voice is resting at both. F4 sounds only from 14 to 20 seconds, over B3: B3 + F4, a diminished fifth, 6 semitones, in the tritone colour.', blocks: [head(c, 'Lesson 2C · steps 4 to 6', 'Check: when does the lower voice change?'), voiceKey(c, W), t, note(c, 'At 12 s and 24 s the upper voice rests. F4 sounds only from 14 s to 20 s, over B3.', { size: 13.5, fill: RESTINK })], gap: 10 }
  },
})

export const byId = (id: string) => ASSETS.find(a => a.id === id)!
void [IDENTITY_VERSION, PLOGGER_LENS_V1, tint, WINE, LABEL_INK, KEYFACE, RESTINK, chip, legend, stagePath, caseBuild, SOFT, W_IN]
