import { svg, fig, pairs, keyboard, hops, lanes, stack, para, txt, heading, INK, WINE, MUTED, PAD, nmm, type Ctx, type Mark } from './native_core'
import { A, B, C as L2C, FIVE } from '../../../lib/soundscape/week2/fixtures'
import type { NoteEvent } from '../../../lib/soundscape/fixtures'
import { INTERVALS } from '../../../lib/soundscape/resources/palette'
import { worldsAt, MOMENT } from '../../../lib/soundscape/m02/shared-worlds'

const SRC = 'lib/soundscape/week2/fixtures.ts'
type Pair = { lower: number; upper: number }
const at = (ev: NoteEvent[], role: 'drone' | 'melody', t: number) => ev.find(e => e.role === role && e.start <= t && t < e.start + e.dur)!.midi
export const pairAt = (ev: NoteEvent[], t: number): Pair => ({ lower: at(ev, 'drone', t), upper: at(ev, 'melody', t) })
const lab = (p: Pair) => `${nmm(p.lower)} + ${nmm(p.upper)}`
const stage = (p: Pair, label?: string) => ({ lower: p.lower, upper: p.upper, label: label ?? lab(p) })
const mv = (a: Pair, b: Pair) => { const w = (d: number, n: string) => d === 0 ? `${n} stays` : `${n} ${d > 0 ? 'rises' : 'falls'} ${Math.abs(d)}`; return `${w(b.lower - a.lower, 'lower')} · ${w(b.upper - a.upper, 'upper')}` }
const ivName = (semis: number) => INTERVALS.find(i => i.semitones === semis)!.name
const row = (c: Ctx, head: string, ev: NoteEvent[], times: number[], note?: string) => {
  const ps = times.map(t => pairAt(ev, t)), p = pairs(c, ps.map(x => stage(x)), { head })
  const cap = note ?? ps.slice(1).map((x, i) => mv(ps[i], x)).join('   |   ')
  const t = para(0, p.h + 12, cap, Math.max(p.w, 300), { size: 14, fill: '#5c465b', italic: true })
  return { w: p.w, h: p.h + 12 + t.h + 4, body: p.body + t.svg }
}
const wrapRows = (rows: { w: number; h: number; body: string }[], gap = 22) => { const s = stack(rows, gap); return { w: Math.max(...rows.map(r => r.w)), h: s.h, body: s.body } }
const ends = (ev: NoteEvent[]) => [pairAt(ev, 1), pairAt(ev, 4)]

export function buildW2() {
  // ---------- hub ----------
  svg('S07-native', { group: 'W2HUB', art: 'S07', source: SRC, teach: 'Week 2 roadmap: pair, interval, movement, changed support' }, c => {
    const labels = ['A pair', 'The interval', 'Movement', 'Changed support']
    const pills = labels.map((s, i) => { const x = i * 168; return `<rect x="${x}" y="44" width="150" height="48" rx="24" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d9a86a" stroke-width="1.6"/>${txt(x + 75, 74, s, { size: 16.5, weight: 600, anchor: 'middle' })}` + (i < 3 ? txt(x + 159, 74, '→', { size: 20, anchor: 'middle', fill: WINE }) : '') }).join('')
    return { title: 'Two Voices: Week 2 roadmap', desc: 'Heading Two Voices, then a four-step roadmap: a pair, the interval, movement, changed support.', w: 654, h: 100, body: txt(0, 30, 'Two Voices', { size: 30, weight: 400, fill: '#4c2748' }) + pills }
  })
  // ---------- 2A ----------
  svg('D01-native', { group: '2A', art: 'D01', source: SRC + ' (A.together)', teach: 'a dyad: two notes at once, lower voice and upper voice' }, c => {
    const f = fig(c, { kb: { start: 'B', whites: 5, cMidi: 48, scale: 1.1, letters: 'none', marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, extra: k => txt(k.xc!(60), k.keyBottom! + 24, 'lower voice', { size: 14, anchor: 'middle', fill: '#7a4a12', sans: true }) + txt(k.xc!(64), k.keyBottom! + 24, 'upper voice', { size: 14, anchor: 'middle', fill: '#1f5c56', sans: true }), caption: 'A dyad is two notes sounding together: C below, E above. Play C alone, E alone, then both.', captionGap: 46 })
    return { title: 'C and E together: a dyad', desc: 'Five white keys B C D E F. C is highlighted as the lower voice and E as the upper voice.', ...f }
  })
  svg('D02-native', { group: '2A', art: 'D01', source: SRC, teach: 'find the two keys, C and E' }, c => {
    const f = fig(c, { kb: { whites: 3, scale: 1.3, letters: 'none', marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, caption: 'C and E: two keys with one white key between them.' })
    return { title: 'The two keys: C and E', desc: 'Three white keys C D E with C and E highlighted and D between them.', ...f }
  })
  svg('D03-native', { group: '2A', art: 'D03', source: SRC + ' (A.together); names from lib/soundscape/resources/interval-data.json', teach: 'count four neighbouring-key hops from C to E' }, c => {
    const f = fig(c, { kb: { whites: 3, scale: 1.25, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, hop: [60, 64], hopTotal: `4 semitones: a ${ivName(4).toLowerCase()}`, caption: 'Count the keys: C to C♯ is 1, to D is 2, to D♯ is 3, to E is 4. Black keys count too.' })
    return { title: 'C to E is four semitones', desc: 'Three white keys with the two black keys between them. Four numbered hops carry C to E through C sharp, D and D sharp. Four semitones, a major third.', ...f }
  })
  svg('D04-native', { group: '2A', art: 'D03', source: SRC + ' (A.together, A.upperEF)', teach: 'C–E (4) compared with C–F (5)' }, c => {
    const a = fig(c, { head: 'C to E', kb: { whites: 3, scale: 1.1, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, hop: [60, 64], hopTotal: `4 · ${ivName(4).toLowerCase()}` })
    const b = fig(c, { head: 'C to F', kb: { whites: 4, scale: 1.1, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 65: { tone: 'upper', label: 'F' } } }, hop: [60, 65], hopTotal: `5 · ${ivName(5).toLowerCase()}` })
    return { title: 'C to E compared with C to F', desc: 'Left: C to E counts four semitones, a major third. Right: C to F counts five semitones, a perfect fourth.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  svg('D05-native', { group: '2A', art: 'D05', source: SRC + ' (A.upperEF)', teach: 'hold the lower C, move the upper E to F' }, c => {
    const r = row(c, 'LOWER C STAYS · UPPER MOVES UP', A.upperEF, [1, 4]); return { title: 'Hold C, move E up to F', desc: 'Two keyboards: C and E, then C and F. The lower C stays; the upper voice rises one semitone from E to F.', ...r }
  })
  svg('D06-native', { group: '2A', art: 'D05', variantOf: 'D05', source: SRC + ' (A.lowerCB, A.lowerCD)', teach: 'hold the upper E, move the lower C' }, c => {
    const r1 = row(c, 'LOWER C FALLS TO B', A.lowerCB, [1, 4]), r2 = row(c, 'LOWER C RISES TO D', A.lowerCD, [1, 4]); const w = wrapRows([r1, r2]); return { title: 'Hold E, move the lower C', desc: 'Two examples. First C and E become B and E: the lower voice falls one semitone. Second C and E become D and E: the lower voice rises two semitones. The upper E stays.', ...w }
  })
  svg('D07-native', { group: '2A', art: 'D07', source: SRC + ' (A.upperEF: lower C 0-5 s; upper E 0-2.5, F 2.5-5)', teach: 'two voices across time' }, c => {
    const l = lanes(c, [{ name: 'Lower voice', tone: 'lower', events: A.upperEF.filter(e => e.role === 'drone') }, { name: 'Upper voice', tone: 'upper', events: A.upperEF.filter(e => e.role === 'melody') }], 5, { w: 660, tick: 1 })
    return { title: 'Two voices across five seconds', desc: 'Lower voice: C for the whole five seconds. Upper voice: E from 0 to 2.5 seconds, then F from 2.5 to 5.', ...l }
  })
  svg('D09-native', { group: '2A', art: 'D05', source: SRC + ' (A.upperEF, A.lowerCB, A.lowerCD)', teach: 'try three dyads' }, c => {
    const rs = [['TRY 1: UPPER E TO F', A.upperEF], ['TRY 2: LOWER C TO B', A.lowerCB], ['TRY 3: LOWER C TO D', A.lowerCD]].map(([h, e]) => row(c, h as string, e as NoteEvent[], [1, 4])); return { title: 'Try three dyads', desc: 'Three practice pairs, each starting from C and E: upper E to F, lower C to B, lower C to D.', ...wrapRows(rs) }
  })
  svg('D10-native', { group: '2A', art: 'D07', source: SRC, teach: '2A recap: from interval to motion' }, c => {
    const a = fig(c, { head: 'C+E is 4 · C+F is 5', kb: { whites: 4, scale: .8, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' }, 65: { tone: 'upper', label: 'F' } } } })
    const r = row(c, 'THEN ONE VOICE MOVES', A.upperEF, [1, 4]); const s = stack([a, r], 18); return { title: 'Lesson 2A recap', desc: 'An interval is counted in semitones: C to E is four, C to F is five. Then one voice moves while the other stays: C and E become C and F.', w: Math.max(a.w, r.w), h: s.h, body: s.body }
  })
  // ---------- 2B ----------
  const five = (i: number) => ({ f: FIVE[i], a: pairAt(FIVE[i].events, 1), b: pairAt(FIVE[i].events, 4) })
  svg('E01-native', { group: '2B', art: 'E01', source: SRC + ' (FIVE)', teach: 'one beginning, five endings, three kinds of motion' }, c => {
    const p = pairs(c, [0, 1, 2, 3, 4].map(i => stage(five(i).b, `B${i + 1}: ${lab(five(i).b)}`)), { head: `EVERY EXAMPLE STARTS ${lab(five(0).a)}`, scale: .42, gapX: 14 })
    const t = para(0, p.h + 12, 'Five examples, three kinds of motion: oblique (B1, B2, B3), contrary (B4), similar (B5).', p.w, { size: 14.5, fill: '#5c465b' }); return { title: 'One beginning, five changes', desc: 'Five endings that all start from C and E: C and F, B and E, D and E, B and F, D and F. They show three kinds of motion: oblique, contrary and similar.', w: p.w, h: p.h + 12 + t.h + 6, body: p.body + t.svg }
  })
  svg('E02-native', { group: '2B', art: 'E02', source: SRC + ' (FIVE B1, B2, B3)', teach: 'oblique motion: one voice holds, the other moves' }, c => {
    const rs = [0, 1, 2].map(i => { const x = five(i); return row(c, `B${i + 1}: ${x.f.label.toUpperCase()}`, x.f.events, [1, 4]) }); return { title: 'Oblique motion: one voice holds', desc: 'Three examples where one voice stays and the other moves: upper E up to F; lower C down to B; lower C up to D.', ...wrapRows(rs) }
  })
  svg('E03-native', { group: '2B', art: 'E03', source: SRC + ' (FIVE B4: C+E to B+F, B-F = 6 semitones)', teach: 'contrary motion: the voices move apart' }, c => {
    const x = five(3), r = row(c, 'B4: BOTH VOICES MOVE APART', x.f.events, [1, 4])
    const h = fig(c, { kb: { start: 'B', whites: 5, cMidi: 48, scale: .9, letters: 'all', groups: false, marks: { 59: { tone: 'lower', label: 'B' }, 65: { tone: 'upper', label: 'F' } } }, hop: [59, 65], hopTotal: `${x.f.semis} semitones`, caption: `B to F spans ${x.f.semis} semitones: a ${x.f.interval}.` })
    const s = stack([r, h], 18); return { title: 'Contrary motion: moving apart', desc: 'C and E become B and F: the lower voice falls and the upper voice rises. B to F is six semitones, a diminished fifth (tritone).', w: Math.max(r.w, h.w), h: s.h, body: s.body }
  })
  svg('E04-native', { group: '2B', art: 'E04', source: SRC + ' (FIVE B5: C+E to D+F; D-F = 3 semitones)', teach: 'similar motion: both voices rise' }, c => {
    const x = five(4), r = row(c, 'B5: BOTH VOICES RISE', x.f.events, [1, 4])
    const h = fig(c, { kb: { start: 'C', whites: 4, scale: .9, letters: 'all', groups: false, marks: { 62: { tone: 'lower', label: 'D' }, 65: { tone: 'upper', label: 'F' } } }, hop: [62, 65], hopTotal: '3 semitones', caption: `D to F spans 3 semitones: a ${ivName(3).toLowerCase()}.` })
    const s = stack([r, h], 18); return { title: 'Similar motion: rising together', desc: 'C and E become D and F: the lower voice rises two semitones and the upper voice rises one. D to F is three semitones, a minor third.', w: Math.max(r.w, h.w), h: s.h, body: s.body }
  })
  svg('E07-native', { group: '2B', art: 'E01', source: SRC + ' (FIVE: all five examples; E06 consolidated here)', teach: 'full gallery of the five source examples', ids: ['E06'] }, c => {
    const fam = ['oblique', 'oblique', 'oblique', 'contrary', 'similar']
    const rs = [0, 1, 2, 3, 4].map(i => { const x = five(i); return row(c, `B${i + 1} · ${fam[i].toUpperCase()}`, x.f.events, [1, 4], `${mv(x.a, x.b)}   |   ends ${x.f.semis} semitones apart (${x.f.interval})`) })
    return { title: 'All five examples, three kinds of motion', desc: 'Five rows, each from C and E: B1 upper rises (oblique), B2 lower falls (oblique), B3 lower rises (oblique), B4 both move apart (contrary), B5 both rise (similar).', ...wrapRows(rs, 16) }
  })
  svg('E08-native', { group: '2B', art: 'E03', source: SRC + ' (FIVE B4, B3-to-F4 = 6)', teach: 'B to F: five letter names, six semitones' }, c => {
    const f = fig(c, { kb: { start: 'B', whites: 5, cMidi: 48, scale: 1.1, letters: 'all', groups: false, marks: { 59: { tone: 'lower', label: 'B' }, 65: { tone: 'upper', label: 'F' } } }, hop: [59, 65], hopTotal: '6 semitones', caption: 'B to F is a diminished fifth, also called a tritone. Count letters: B C D E F is five letter names. Count keys: six semitones. The two counts differ on purpose.' })
    return { title: 'B to F: the tritone lens', desc: 'Five white keys B C D E F. B and F are highlighted; six numbered hops cross the black keys between them. Five letter names, six semitones: a diminished fifth, also called a tritone.', ...f }
  })
  const Bp = [0, 2.5, 5, 7.5].map(t => pairAt(B.path, t + 1))
  svg('E09-native', { group: '2B', art: 'E09', source: SRC + ' (B.path: four 2.5 s stages)', teach: 'C+E, C+F, B+F, C+E' }, c => {
    const p = pairs(c, Bp.map((x, i) => stage(x, `${lab(x)}`)), { head: 'FOUR STAGES, 2.5 SECONDS EACH' }); const t = para(0, p.h + 12, Bp.slice(1).map((x, i) => mv(Bp[i], x)).join('   |   '), p.w, { size: 13.5, fill: '#5c465b', italic: true }); return { title: 'A conversation in four stages', desc: 'Four keyboards in order: C and E, C and F, B and F, then back to C and E. Each stage lasts two and a half seconds.', w: p.w, h: p.h + 12 + t.h + 4, body: p.body + t.svg }
  })
  svg('E10-native', { group: '2B', art: 'E09', source: SRC + ' (B.path: moments at 0, 2.5, 5, 7.5 s; ends 10 s)', teach: 'four moments on a measured timeline' }, c => {
    const l = lanes(c, [{ name: 'Lower voice', tone: 'lower', events: B.path.filter(e => e.role === 'drone') }, { name: 'Upper voice', tone: 'upper', events: B.path.filter(e => e.role === 'melody') }], 10, { w: 660, tick: 2.5 })
    return { title: 'Four moments on a timeline', desc: 'Ten-second timeline. Lower voice: C 0 to 5, B 5 to 7.5, C 7.5 to 10. Upper voice: E 0 to 2.5, F 2.5 to 7.5, E 7.5 to 10.', ...l }
  })
  svg('E11-native', { group: '2B', art: 'E09', source: SRC + ' (B.path) + blank sketch lines', teach: 'compose a two-voice conversation' }, c => {
    const p = pairs(c, Bp.map(x => stage(x)), { head: 'EXAMPLE: C+E, C+F, B+F, C+E', scale: .4, gapX: 30 })
    const blank = [0, 1].map(i => `<rect x="118" y="${i * 58}" width="528" height="46" rx="8" fill="none" stroke="#d9c9d1" stroke-width="1.6" stroke-dasharray="6 5"/>${txt(6, i * 58 + 29, i ? 'Your lower voice' : 'Your upper voice', { size: 13.5, weight: 600, fill: i ? '#7a4a12' : '#1f5c56', sans: true })}`).join('') + [0, 1, 2, 3].map(i => `<path d="M${118 + i * 132} 118 v8" stroke="#a3778f"/>`).join('')
    const s = stack([p, { body: heading(0, 12, 'YOUR TWO VOICES (BLANK, FOR PRINTING)') + `<g transform="translate(0 22)">${blank}</g>`, h: 150 }], 14); return { title: 'Compose a two-voice conversation', desc: 'An example of four stages (C and E, C and F, B and F, C and E), then two blank dashed lanes for your own lower and upper voices to sketch.', w: 660, h: s.h, body: s.body }
  })
  // ---------- 2C ----------
  const l2c = (c: Ctx, ev: NoteEvent[], rests?: string, w = 660) => lanes(c, [{ name: 'Lower voice', tone: 'lower', events: ev.filter(e => e.role === 'drone') }, { name: 'Upper voice', tone: 'upper', events: ev.filter(e => e.role === 'melody'), rests }], 36, { w, tick: 6 })
  svg('F01-native', { group: '2C', art: 'F01', source: SRC + ' (C.held / C.moving: upper E 4-10, F 14-20, E 26-32; lower C 0-36 vs C 0-12, B 12-24, C 24-36)', teach: 'the same upper melody over two different lower voices' }, c => {
    const a = l2c(c, L2C.held), b = l2c(c, L2C.moving)
    const s = stack([{ body: heading(0, 12, 'SITUATION 1: LOWER VOICE HOLDS C') + `<g transform="translate(0 18)">${a.body}</g>`, h: a.h + 18 }, { body: heading(0, 12, 'SITUATION 2: LOWER VOICE MOVES C, B, C') + `<g transform="translate(0 18)">${b.body}</g>`, h: b.h + 18 }], 12)
    return { title: 'Same upper melody, two foundations', desc: 'Two 36-second timelines with the identical upper line E (4 to 10), F (14 to 20), E (26 to 32). In situation 1 the lower voice holds C throughout. In situation 2 it plays C for 0 to 12, B for 12 to 24 and C for 24 to 36.', w: 660, h: s.h, body: s.body }
  })
  svg('F02-native', { group: '2C', art: 'F02', variantOf: 'F01', source: SRC + ' (C.held)', teach: 'C stays present while E, F, E visit and leave' }, c => {
    const l = l2c(c, L2C.held, 'rest'), cap = para(0, 8, 'The lower C is held for all 36 seconds. The upper voice visits E (4-10 s), F (14-20 s) and E (26-32 s), then leaves each time. C to E is 4 semitones; C to F is 5.', 640, { size: 14.5, fill: '#5c465b' })
    const s = stack([{ body: l.body, h: l.h }, { body: cap.svg, h: cap.h + 8 }], 8); return { title: 'Held C beneath the same melody', desc: 'A 36-second timeline: the lower voice holds C throughout; the upper voice plays E from 4 to 10, F from 14 to 20, E from 26 to 32, with rests between.', w: 660, h: s.h, body: s.body }
  })
  svg('F03-native', { group: '2C', art: 'F03', variantOf: 'F01', source: SRC + ' (C.moving)', teach: 'the supporting line moves under the same melody' }, c => {
    const l = l2c(c, L2C.moving, 'rest'), cap = para(0, 8, 'The upper melody E, F, E is exactly the same. The lower voice moves: C (0-12 s), B (12-24 s), C (24-36 s). At the F moment the pair is B + F, six semitones apart.', 640, { size: 14.5, fill: '#5c465b' })
    const s = stack([{ body: l.body, h: l.h }, { body: cap.svg, h: cap.h + 8 }], 8); return { title: 'The supporting landscape begins to move', desc: 'A 36-second timeline: the lower voice plays C from 0 to 12, B from 12 to 24, C from 24 to 36, under the same upper E, F, E.', w: 660, h: s.h, body: s.body }
  })
  svg('F04-native', { group: '2C', art: 'G03', source: 'lib/soundscape/m02/shared-worlds.ts computed from ' + SRC + ' (at 14-20 s)', teach: 'shared note F; only-here notes C and B', kind: 'overlay-on-M02-art' }, c => {
    const w = worldsAt(MOMENT.F), pos = [[357, 384, w.onlyHeld[0], 'only here'], [688, 384, w.shared[0], 'shared'], [1018, 384, w.onlyMoving[0], 'only here']] as const
    const body = pos.map(([x, y, m, s], i) => `<circle cx="${x}" cy="${y}" r="${i === 1 ? 56 : 48}" fill="${c.print ? '#fff' : 'rgba(255,251,244,.9)'}" stroke="${i === 1 ? '#c8811f' : i ? TEAL2 : '#d99a45'}" stroke-width="${i === 1 ? 5 : 3}"/>${txt(x, y + 16, nmm(m), { size: 50, weight: 700, anchor: 'middle' })}${txt(x, y + 90, s, { size: 20, weight: 700, anchor: 'middle', fill: '#6e5263', sans: true, ls: 1.5 })}`).join('')
    return { title: 'Shared and only-here notes at the F moment', desc: `Labels over the two overlapping fields. Left: ${nmm(w.onlyHeld[0])}, only in situation 1. Centre overlap: ${nmm(w.shared[0])}, shared by both. Right: ${nmm(w.onlyMoving[0])}, only in situation 2.`, w: 1376, h: 768, body }
  })
  svg('F05-native', { group: '2C', art: 'F01', source: SRC, teach: 'what objectively changes versus how it felt to you' }, c => {
    const L = para(0, 40, 'What changes? The upper melody E, F, E is exactly the same in both. Only the lower voice differs: C held, or C then B then C. At the F moment the pairs are C + F and B + F.', 300, { size: 15, fill: '#5c465b' })
    const R = para(332, 40, 'How did that feel to you? There is no right answer. Notice what you hear around the F in each version, and describe it in your own words.', 300, { size: 15, fill: '#5c465b', italic: true })
    const h = Math.max(L.h, R.h) + 52
    return { title: 'Objective change versus personal response', desc: 'Two columns. Left, what changes: the upper melody is identical, only the lower voice differs. Right, an open question: how did that feel to you? No right answer.', w: 640, h, body: `<rect x="0" y="0" width="312" height="${h}" rx="14" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d9a86a" stroke-width="1.6"/><rect x="332" y="0" width="308" height="${h}" rx="14" fill="none" stroke="#bd9baf" stroke-width="1.6" stroke-dasharray="7 6"/>${txt(14, 24, 'WHAT CHANGES (FACT)', { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.4 })}${txt(346, 24, 'YOUR RESPONSE (OPEN)', { size: 12, weight: 700, fill: '#a67664', sans: true, ls: 1.4 })}<g transform="translate(14 0)">${L.svg}</g><g transform="translate(14 0)">${R.svg}</g>` }
  })
  svg('F06-native', { group: '2C', art: 'F01', variantOf: 'F01', source: SRC, teach: 'the two versions aligned in time, with the F moment marked' }, c => {
    const a = l2c(c, L2C.held, 'rest'), b = l2c(c, L2C.moving, 'rest'), X = (t: number) => 118 + (t / 36) * (660 - 118 - 14)
    const band = (h: number) => `<rect x="${X(14)}" y="0" width="${X(20) - X(14)}" height="${h}" fill="${c.print ? '#eee' : 'rgba(200,129,31,.12)'}" stroke="#c8811f" stroke-width="1" stroke-dasharray="4 4"/>`
    const s = stack([{ body: heading(0, 12, 'HELD') + `<g transform="translate(0 18)">${band(a.h - 12)}${a.body}</g>`, h: a.h + 18 }, { body: heading(0, 12, 'MOVING') + `<g transform="translate(0 18)">${band(b.h - 12)}${b.body}</g>`, h: b.h + 18 }, { body: txt(X(17), 14, 'F moment, 14-20 s', { size: 13, anchor: 'middle', fill: '#7a4a12', sans: true, weight: 700 }), h: 22 }], 10)
    return { title: 'Two versions aligned in time', desc: 'Two registered 36-second timelines with the same upper line and a shaded band over 14 to 20 seconds, the F moment. Empty upper-voice parts are marked as rests while the lower voice may still sound.', w: 660, h: s.h, body: s.body }
  })
  svg('F07-native', { group: '2C', art: 'G03', source: SRC + ' (C4-F4 = 5, B3-F4 = 6)', teach: 'C–F is 5 semitones, B–F is 6' }, c => {
    const a = fig(c, { head: 'C to F: 5', kb: { start: 'B', whites: 5, cMidi: 48, scale: .85, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 65: { tone: 'upper', label: 'F' } } }, hop: [60, 65], hopTotal: '5 semitones', caption: `C to F: a ${ivName(5).toLowerCase()}.` })
    const b = fig(c, { head: 'B to F: 6', kb: { start: 'B', whites: 5, cMidi: 48, scale: .85, letters: 'all', groups: false, marks: { 59: { tone: 'lower', label: 'B' }, 65: { tone: 'upper', label: 'F' } } }, hop: [59, 65], hopTotal: '6 semitones', caption: 'B to F: a diminished fifth (tritone).' })
    return { title: 'C to F versus B to F', desc: 'Left: C to F is five semitones, a perfect fourth. Right: B to F is six semitones, a diminished fifth or tritone. The melody note F is the same in both.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  svg('F08-native', { group: '2C', art: 'F08', source: SRC + ' (C.dialogue: four 2 s stages)', teach: 'optional practice path: a two-voice dialogue' }, c => {
    const ps = [1, 3, 5, 7].map(t => pairAt(L2C.dialogue, t)), p = pairs(c, ps.map(x => stage(x)), { head: 'OPTIONAL PRACTICE PATH, FOUR 2-SECOND STAGES' }); const t = para(0, p.h + 12, 'Play the four states in order. Then change one note or one pause to write your own reply.', p.w, { size: 14.5, fill: '#5c465b', italic: true })
    return { title: 'A two-voice dialogue (optional practice path)', desc: 'Four keyboards in order: C and E, C and F, B and F, C and E, two seconds each. An optional path to play and then change.', w: p.w, h: p.h + 12 + t.h + 4, body: p.body + t.svg }
  })
  svg('F09-native', { group: '2C', art: 'F01', variantOf: 'F01', source: SRC + ' (C.held, C.moving at 7, 17, 29 s)', teach: 'one melody in two contexts' }, c => {
    const r = (h: string, ev: NoteEvent[]) => { const ps = [MOMENT.firstE, MOMENT.F, MOMENT.lastE].map(t => pairAt(ev, t)), p = pairs(c, ps.map((x, i) => stage(x, lab(x))), { head: h, scale: .42, gapX: 26 }); return p }
    const a = r('SITUATION 1: LOWER HOLDS C', L2C.held), b = r('SITUATION 2: LOWER MOVES C, B, C', L2C.moving); const s = stack([a, b], 14)
    return { title: 'One melody in two contexts', desc: 'Three moments of the melody, E then F then E, in each situation. Upper notes are identical. Lower voice: situation 1 is C, C, C; situation 2 is C, B, C.', w: Math.max(a.w, b.w), h: s.h, body: s.body }
  })
  svg('F10-native', { group: '2C', art: 'F10', source: SRC, teach: 'Week 2 recap: three anchors' }, c => {
    const a = fig(c, { head: '1 · A DISTANCE: C TO E = 4', kb: { whites: 3, scale: .8, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 64: { tone: 'upper', label: 'E' } } }, hop: [60, 64] })
    const b = row(c, '2 · A MOTION: C+E, C+F, B+F, C+E', B.path, [1, 3.5, 6, 8.5], 'one voice, then both, then back')
    const w = worldsAt(MOMENT.F), cmp = fig(c, { head: '3 · A SHARED NOTE: F', kb: { start: 'B', whites: 5, cMidi: 48, scale: .7, letters: 'none', groups: false, marks: { [w.onlyHeld[0]]: { tone: 'lower', label: nmm(w.onlyHeld[0]) }, [w.onlyMoving[0]]: { tone: 'upper', label: nmm(w.onlyMoving[0]) }, [w.shared[0]]: { tone: 'shared', label: nmm(w.shared[0]) } } }, caption: 'C + F and B + F share only F.' })
    const s = stack([a, b, cmp], 20); return { title: 'Week 2 recap: three anchors', desc: 'Three small panels: C to E is four semitones; a four-stage motion C+E, C+F, B+F, C+E; and two situations sharing only the note F.', w: Math.max(a.w, b.w, cmp.w), h: s.h, body: s.body }
  })
}
const TEAL2 = '#3f9b92'
