import { svg, fig, pairs, keyboard, hops, lanes, stack, para, txt, heading, INK, WINE, MUTED, PAD, nmm, type Ctx, type Mark } from './native_core'
import * as W1 from '../../../lib/soundscape/week1/fixtures'
import { esc } from '../../../lib/soundscape/m03/native-svg'

const SRC = 'lib/soundscape/week1/fixtures.ts + lib/soundscape/m02/keyboard-geometry.ts'
const home = (label?: string): Mark => ({ tone: 'home', label })
const num = (k: ReturnType<typeof keyboard>, items: [number, string][]) => { const by = new Map<number, string[]>(); items.forEach(([m, s]) => by.set(m, [...(by.get(m) ?? []), s])); return [...by].map(([m, ss]) => txt(k.xc!(m), k.keyTop! - 7, ss.join(','), { size: 14, weight: 700, anchor: 'middle', fill: WINE, sans: true })).join('') }
const ring = (k: ReturnType<typeof keyboard>, m: number) => `<circle cx="${k.xc!(m)}" cy="${k.keyTop! + 16}" r="9" fill="none" stroke="#c8811f" stroke-width="3"/>`
const WH8 = [60, 62, 64, 65, 67, 69, 71, 72]
const pill = (x: number, y: number, w: number, n: number, s: string, c: Ctx) => `<rect x="${x}" y="${y}" width="${w}" height="52" rx="26" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d9a86a" stroke-width="1.6"/><circle cx="${x + 26}" cy="${y + 26}" r="14" fill="${c.print ? '#eee' : '#f6c46a'}"/>${txt(x + 26, y + 32, String(n), { size: 17, weight: 700, anchor: 'middle' })}${txt(x + 50, y + 32, s, { size: 18, weight: 600 })}`

export function buildW1() {
  // ---------- W1 hub S06 ----------
  svg('S06-native', { group: 'W1HUB', art: 'S06', source: SRC, teach: 'Week 1 roadmap: find C, travel, add a voice' }, c => {
    const k = fig(c, { kb: { whites: 10, scale: .62, letters: 'none', groups: true, marks: { 60: home('C'), 72: home('C') } } })
    const row = pill(0, 0, 214, 1, 'Find C', c) + pill(228, 0, 214, 2, 'Travel', c) + pill(456, 0, 214, 3, 'Add a voice', c) + txt(214 + 7, 32, '→', { size: 22, anchor: 'middle', fill: WINE }) + txt(442 + 7, 32, '→', { size: 22, anchor: 'middle', fill: WINE })
    const s = stack([{ body: row, h: 52 }, { body: k.body, h: k.h }], 22)
    return { title: 'Week 1 roadmap: Find C, Travel, Add a voice', desc: 'Three steps in order: 1 Find C, 2 Travel, 3 Add a voice. Below, a keyboard drawing with brackets over the groups of two, three and two black keys; both Cs are highlighted, each the white key just left of a group of two black keys.', w: Math.max(670, k.w), h: s.h, body: s.body }
  })

  // ---------- 1A ----------
  svg('A01-native', { group: '1A', art: 'A01', source: SRC, teach: 'one sound; not a chord, not a scale' }, c => {
    const f = fig(c, { kb: { whites: 6, letters: 'none', marks: { 64: { tone: 'home' } } }, caption: 'One key. One sound. This is not a chord and not a whole scale: a single note that keeps sounding while you hold it.' })
    return { title: 'One note on a keyboard', desc: 'A short run of six white keys with one key highlighted and no letters. One sound only: not a chord, not a scale.', ...f }
  })
  svg('A02-native', { group: '1A', art: 'A01', source: SRC, teach: 'pitch (which key) versus loudness (how hard)' }, c => {
    const a = fig(c, { head: 'Higher or lower: which key', kb: { topPad: 34, whites: 7, scale: .85, letters: 'none', marks: { 62: { tone: 'lower' }, 64: { tone: 'upper' } } },
      extra: k => txt(k.xc!(60), k.keyTop! - 8, '← lower', { size: 15, anchor: 'middle', fill: MUTED, italic: true }) + txt(k.xc!(71), k.keyTop! - 8, 'higher →', { size: 15, anchor: 'middle', fill: MUTED, italic: true }) })
    const bw = a.w, rings = [18, 30].map((r, i) => `<circle cx="${bw * (.3 + i * .4)}" cy="62" r="${r}" fill="none" stroke="${c.print ? '#6d326e' : '#d99a45'}" stroke-width="${2 + i * 2}"/><circle cx="${bw * (.3 + i * .4)}" cy="62" r="7" fill="${c.print ? '#6d326e' : '#f6b94f'}"/>` + txt(bw * (.3 + i * .4), 118, i ? 'louder' : 'softer', { size: 17, weight: 700, anchor: 'middle' }) + txt(bw * (.3 + i * .4), 138, 'same key', { size: 13, anchor: 'middle', fill: MUTED, italic: true, sans: true })).join('')
    const b = { body: heading(PAD, 14, 'LOUDER OR SOFTER: HOW HARD', bw - 2 * PAD) + rings, h: 150 }
    const note = para(PAD, 12, 'Pitch is where a note lives: right is higher, left is lower. Loudness is how strongly you play it. Pressing the same key harder makes it louder, not higher.', bw - 2 * PAD, { size: 15, fill: '#5c465b' })
    const s = stack([{ body: a.body, h: a.h }, b, { body: note.svg, h: note.h }], 14)
    return { title: 'Pitch versus loudness', desc: 'Top: seven white keys; a key and the key to its right are highlighted, with lower to the left and higher to the right. Bottom: the same key played softer and louder, shown as small and large ripples. Higher or lower depends on which key; louder or softer depends on how hard you press.', w: bw, h: s.h, body: s.body }
  })
  svg('A03-native', { group: '1A', art: 'A03', source: SRC, teach: 'C is the white key just left of a group of two black keys' }, c => {
    const f = fig(c, { kb: { whites: 10, letters: 'none', groups: true, marks: { 60: home('C'), 72: home('C') } }, caption: 'Find a group of two black keys. The white key just to the left of it is C. The next group of two gives you the next C.',
      extra: k => [60, 72].map(m => `<path d="M${k.xc!(m)} ${k.keyBottom! + 16} v-14 m-5 6 l5 -7 l5 7" fill="none" stroke="${WINE}" stroke-width="2.2" stroke-linecap="round"/>`).join('') })
    return { title: 'Finding C from the black keys', desc: 'Ten white keys. Black keys sit in a group of two, then three, then two, marked 2, 3, 2. The white key just left of each group of two is C; both Cs are highlighted.', ...f }
  })
  svg('A04-native', { group: '1A', art: 'G01 (M02 approved art, reused)', source: 'lib/soundscape/week1/lesson1a-copy.ts white-key path C D E F G A B; geometry as M02 HomeField (static)', teach: 'C chosen as home in this exercise; static journey path', kind: 'overlay-on-M02-art' }, c => {
    const R = 330, pt = (i: number) => { const a = ((-90 + i * 60) * Math.PI) / 180; return [500 + R * Math.cos(a), 500 + R * Math.sin(a)] }, v = ['D', 'E', 'F', 'G', 'A', 'B'], P = v.map((_, i) => pt(i))
    const d = `M500 500 L${P[0][0]} ${P[0][1]} ` + P.slice(1).map(p => `A${R} ${R} 0 0 1 ${p[0]} ${p[1]}`).join(' ') + ' L500 500'
    const body = `<path d="${d}" fill="none" stroke="#8f4f8a" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 16" opacity=".8"/>` + v.map((n, i) => `<circle cx="${P[i][0]}" cy="${P[i][1]}" r="54" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d99a45" stroke-width="5"/>` + txt(P[i][0], P[i][1] + 20, n, { size: 56, weight: 700, anchor: 'middle' })).join('') + `<circle cx="500" cy="500" r="78" fill="${c.print ? '#e8e0ea' : '#f6b94f'}" stroke="#c8811f" stroke-width="6"/>` + txt(500, 526, 'C', { size: 92, weight: 700, anchor: 'middle' })
    return { title: 'C as home, with the white-key journey', desc: 'C glows at the centre as the chosen home note in this exercise. Around it, in order: D, E, F, G, A and B. A dotted path goes out from C through each note and back home. Distance from the centre is decoration, not a measurement.', w: 1000, h: 1000, body }
  })
  svg('A03-narrow', { group: '1A', art: 'A03', source: SRC, variantOf: 'A03-native', teach: 'narrow-screen layout of A03' }, c => {
    const f = fig(c, { kb: { whites: 8, scale: 1.15, letters: 'none', groups: true, marks: { 60: home('C'), 72: home('C') } }, caption: 'The white key just left of a group of two black keys is C.' })
    return { title: 'Finding C (narrow layout)', desc: 'Eight white keys with groups of two and three black keys marked; the first and last white keys are C, highlighted.', ...f }
  })
  const seven = (c: Ctx, ms: number[], whites: number, scale: number, o: { path?: [number, string][]; caption?: string; marks?: Record<number, Mark>; arrows?: boolean } = {}) =>
    fig(c, { kb: { topPad: 34, whites, scale, letters: 'all', groups: false, marks: o.marks ?? { 60: home('C'), 72: home('C') } }, caption: o.caption, extra: k => num(k, o.path ?? ms.map((m, i) => [m, String(i + 1)] as [number, string])) })
  svg('A05-native', { group: '1A', art: 'A04', source: SRC, teach: 'seven letter names, then C again, one white key at a time' }, c => {
    const f = seven(c, WH8, 8, 1, { caption: 'C D E F G A B, then C again, a little higher. Notice there is no black key between E and F, or between B and C.' })
    return { title: 'Seven names, then C again', desc: 'Eight white keys numbered 1 to 8 with the letters C D E F G A B C. The first and last are both C. There is no black key between E and F or between B and C.', ...f }
  })
  svg('A05-narrow', { group: '1A', art: 'A04', source: SRC, variantOf: 'A05-native', teach: 'narrow layout of A05' }, c => {
    const f = seven(c, WH8, 8, 1.15, { caption: 'C D E F G A B C: eight white keys, one at a time.' })
    return { title: 'Seven names, then C again (narrow layout)', desc: 'Eight numbered white keys lettered C D E F G A B C.', ...f }
  })
  svg('A07-native', { group: '1A', art: 'A06', variantOf: 'A05', source: SRC, teach: 'up C to C, then back down' }, c => {
    const up = seven(c, WH8, 8, .9, { path: WH8.map((m, i) => [m, String(i + 1)] as [number, string]) })
    const down = seven(c, WH8, 8, .9, { path: [...WH8].reverse().map((m, i) => [m, String(i + 1)] as [number, string]) })
    const s = stack([{ body: heading(PAD, 14, 'GOING UP: LOW C TO HIGH C, LEFT TO RIGHT') + `<g transform="translate(0 22)">${up.body}</g>`, h: up.h + 22 }, { body: heading(PAD, 14, 'COMING BACK: HIGH C TO LOW C, RIGHT TO LEFT') + `<g transform="translate(0 22)">${down.body}</g>`, h: down.h + 22 }], 14)
    return { title: 'Up and back down from C to C', desc: 'Two copies of the same eight white keys. First numbered 1 to 8 from the left C to the right C, going up. Second numbered 1 to 8 from the right C back to the left C, going down.', w: up.w, h: s.h, body: s.body }
  })
  svg('A06-native', { group: '1A', art: 'A06', source: SRC, teach: 'same name, higher: one octave up' }, c => {
    const f = fig(c, { kb: { topPad: 86, whites: 8, scale: .95, letters: 'none', groups: false, marks: { 60: home('C'), 72: home('C') } }, captionGap: 46, caption: 'Both are called C. The second is higher: it is one octave above the first. Play the lower C, then the higher C, then back.',
      extra: k => `<path d="M${k.xc!(60)} ${k.keyTop! - 14} Q${(k.xc!(60) + k.xc!(72)) / 2} ${k.keyTop! - 70} ${k.xc!(72) - 6} ${k.keyTop! - 16}" fill="none" stroke="${WINE}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 7"/>` + txt((k.xc!(60) + k.xc!(72)) / 2, k.keyTop! - 56, 'one octave up', { size: 15, anchor: 'middle', italic: true, fill: WINE }) + txt(k.xc!(60), k.keyBottom! + 20, 'lower C', { size: 14, anchor: 'middle', fill: MUTED, sans: true }) + txt(k.xc!(72), k.keyBottom! + 20, 'higher C', { size: 14, anchor: 'middle', fill: MUTED, sans: true }) })
    return { title: 'Two Cs, one octave apart', desc: 'Eight white keys. The left-most and right-most are both C and highlighted, joined by an arc labelled one octave up. The right one is higher.', ...f }
  })
  svg('A08-native', { group: '1A', art: 'A08', source: SRC + ' (authored practice example, not a lesson recording)', teach: 'same start, two different stopping places' }, c => {
    const mk = (path: number[], stop: number, stopTone: 'home' | 'lower') => seven(c, path, 8, .85, { path: path.map((m, i) => [m, String(i + 1)] as [number, string]),
      marks: Object.fromEntries(path.map(m => [m, { tone: m === stop ? stopTone : 'upper', label: nmm(m) } as Mark])) })
    const a = mk([60, 62, 64, 65, 67], 67, 'lower'), b = mk([60, 62, 64, 62, 60], 60, 'home')
    const s = stack([{ body: heading(PAD, 14, 'VERSION 1: C D E F G, STOP ON G') + `<g transform="translate(0 22)">${a.body}</g>`, h: a.h + 22 }, { body: heading(PAD, 14, 'VERSION 2: C D E D C, STOP ON C') + `<g transform="translate(0 22)">${b.body}</g>`, h: b.h + 22 },
      (() => { const p = para(PAD, 8, 'An authored practice example, not a lesson recording. Play both on your own keyboard and notice how each stopping place feels to you.', a.w - 2 * PAD, { size: 14.5, fill: MUTED, italic: true }); return { body: p.svg, h: p.h + 8 } })()], 12)
    return { title: 'Two endings: away from C and home to C', desc: 'Two keyboards. Version 1 plays the white keys C D E F G in order and stops on G. Version 2 plays C D E D C and stops on C, the home note. Practice example only.', w: a.w, h: s.h, body: s.body }
  })
  svg('A09-native', { group: '1A', art: 'A09', source: 'lib/soundscape/week1/fixtures.ts (A02: C held 6 s; visitor E, G or D from 1 s to 4.5 s)', teach: 'one strand stays (C), another visits' }, c => {
    const rows = (['E', 'G', 'D'] as const).map(k => { const ev = W1.A02[k]; const l = lanes(c, [{ name: 'C (stays)', tone: 'lower', events: ev.filter(e => e.role === 'drone') }, { name: `${k} (visits)`, tone: 'upper', events: ev.filter(e => e.role === 'melody'), rests: 'rest' }], 6, { w: 660, tick: 1 }); return { body: heading(0, 14, `${k} OVER C`) + `<g transform="translate(0 22)">${l.body}</g>`, h: l.h + 22 } })
    const s = stack(rows, 8)
    return { title: 'A note that stays while others visit', desc: 'Three timelines of six seconds. In each, C sounds the whole time on the lower line, while one visiting note (E, then G, then D in the three examples) sounds from about 1 to 4.5 seconds on the upper line.', w: 660, h: s.h, body: s.body }
  })
  svg('A10-native', { group: '1A', art: 'A10', source: 'authored example (C D E, pause, C); not a source fixture', teach: 'your own three or four notes, with a pause' }, c => {
    const chip = (x: number, s: string, tone: 'n' | 'p') => `<rect x="${x}" y="0" width="${tone === 'p' ? 110 : 76}" height="64" rx="16" fill="${tone === 'p' ? 'none' : (c.print ? '#f1dfc0' : '#f8d9a0')}" stroke="${tone === 'p' ? '#a3778f' : '#c8811f'}" stroke-width="2" ${tone === 'p' ? 'stroke-dasharray="6 5"' : ''}/>` + txt(x + (tone === 'p' ? 55 : 38), 41, s, { size: tone === 'p' ? 17 : 28, weight: tone === 'p' ? 400 : 700, anchor: 'middle', italic: tone === 'p', fill: tone === 'p' ? MUTED : INK })
    const row = chip(0, 'C', 'n') + chip(92, 'D', 'n') + chip(184, 'E', 'n') + chip(276, 'pause', 'p') + chip(402, 'C', 'n')
    const k = fig(c, { kb: { whites: 8, scale: .8, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 62: { tone: 'lower', label: 'D' }, 64: { tone: 'lower', label: 'E' } } } })
    const cap = para(PAD, 10, 'Example only: C, D, E, a pause, then C. Choose three or four of your own white keys, leave one pause, then play it again with a different last note.', k.w - 2 * PAD, { size: 15, fill: '#5c465b' })
    const s = stack([{ body: row, h: 64 }, { body: k.body, h: k.h }, { body: cap.svg, h: cap.h }], 14)
    return { title: 'A tiny melody with a pause (example)', desc: 'An example idea in four boxes and a dashed pause: C, D, E, pause, C. A keyboard shows the first three keys. This is an example; learners choose their own notes.', w: Math.max(k.w, 520), h: s.h, body: s.body }
  })
  svg('A11-native', { group: '1A', art: 'A11', source: 'caption only; no fixed pitch=colour legend', teach: 'your own sound-to-colour interpretation' }, c => {
    const dots = [0, 1, 2].map(i => `<circle cx="${110 + i * 220}" cy="70" r="46" fill="none" stroke="#bd9baf" stroke-width="2" stroke-dasharray="7 6"/>` + txt(110 + i * 220, 140, `sound ${i + 1}`, { size: 16, anchor: 'middle', fill: MUTED, italic: true }) + `<path d="M${50 + i * 220} 168 h120 M${50 + i * 220} 190 h120" stroke="#d9c9d1" stroke-width="1.4"/>`).join('')
    return { title: 'Your own sound-to-colour map', desc: 'Three empty dashed circles labelled sound 1, sound 2 and sound 3, each with two blank writing lines. Your own sound-to-colour interpretation: there is no fixed colour for any note.', w: 660, h: 220, body: txt(0, 22, 'Your own sound-to-color interpretation', { size: 20, weight: 700 }) + `<g transform="translate(0 28)">${dots}</g>` }
  })
  svg('A12-native', { group: '1A', art: 'A04', source: SRC, teach: 'Lesson 1A recap sheet' }, c => {
    const a = fig(c, { head: '1 · Find C', kb: { whites: 10, scale: .45, groups: true, marks: { 60: home('C'), 72: home('C') } } })
    const b = fig(c, { head: '2 · C to C: one octave', kb: { whites: 8, scale: .55, letters: 'all', groups: false, marks: { 60: home('C'), 72: home('C') } } })
    const cx = 120, orb = (i: number) => { const t = ((-90 + i * 60) * Math.PI) / 180; return [cx + 64 * Math.cos(t), 116 + 64 * Math.sin(t)] }
    const ctr = heading(0, 14, '3 · C CHOSEN AS HOME', 330) + ['D', 'E', 'F', 'G', 'A', 'B'].map((n, i) => { const [x, y] = orb(i); return `<circle cx="${x}" cy="${y}" r="17" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d99a45" stroke-width="1.6"/>` + txt(x, y + 6, n, { size: 17, weight: 700, anchor: 'middle' }) }).join('') + `<circle cx="${cx}" cy="116" r="26" fill="${c.print ? '#e8e0ea' : '#f6b94f'}" stroke="#c8811f" stroke-width="2"/>` + txt(cx, 126, 'C', { size: 28, weight: 700, anchor: 'middle' }) + txt(cx, 214, 'distance from centre is decoration', { size: 11.5, anchor: 'middle', fill: MUTED, italic: true, sans: true })
    const d = lanes(c, [{ name: 'Lower: C held', tone: 'lower', events: W1.C01.filter(e => e.role === 'drone') }, { name: 'Upper: visits', tone: 'upper', events: W1.C01.filter(e => e.role === 'melody') }], 12, { w: 330, tick: 3 })
    const row1 = `<g>${a.body}</g><g transform="translate(360 0)">${b.body}</g>`, row2 = `<g transform="translate(0 0)">${ctr}</g><g transform="translate(360 0)">${heading(0, 14, '4 · HELD + VISITING (12 s)', 330)}<g transform="translate(0 20)">${d.body}</g></g>`
    const s = stack([{ body: row1, h: Math.max(a.h, b.h) }, { body: row2, h: 226 }], 22)
    return { title: 'Lesson 1A recap', desc: 'Four small panels. 1: the two-then-three black-key pattern with both Cs highlighted. 2: the white keys C to the next C, one octave. 3: C at the centre with D E F G A B around it, chosen as home in this exercise. 4: a twelve-second timeline where the lower C is held while the upper voice visits E, G and D.', w: 700, h: s.h, body: s.body }
  })

  // ---------- 1B ----------
  const b1B = (c: Ctx, whites: number, upto: number, o: { early?: boolean } = {}) => {
    const ms = [60, 62, 64, 65, 67, 69, 71, 72].slice(0, upto)
    return seven(c, ms, whites, 1, { marks: Object.fromEntries(ms.map((m, i) => [m, { tone: i === 7 ? 'home' : 'upper', label: nmm(m) } as Mark])) })
  }
  svg('B01-early', { group: '1B', art: 'B01', source: 'lib/soundscape/week1/fixtures.ts (B01: seven rising notes C D E F G A B)', teach: 'prediction page: answer-neutral', ids: ['B07'] }, c => {
    const f = fig(c, { kb: { topPad: 34, whites: 7, letters: 'all', groups: false, marks: Object.fromEntries([60, 62, 64, 65, 67, 69, 71].map(m => [m, { tone: 'upper', label: nmm(m) } as Mark])) },
      caption: 'Seven notes, one at a time: C D E F G A B. Play them, then stop. How does the last note feel: finished, or still on its way somewhere?', extra: k => num(k, [60, 62, 64, 65, 67, 69, 71].map((m, i) => [m, String(i + 1)] as [number, string])) })
    return { title: 'Seven rising notes, unfinished', desc: 'Seven white keys numbered 1 to 7 with the letters C D E F G A B, played one at a time. The path stops on the seventh note.', ...f }
  })
  svg('B01-pair', { group: '1B', art: 'B01', source: 'lib/soundscape/week1/fixtures.ts (B01 vs B02: B02 adds only the higher C)', teach: 'after the prediction: both endings side by side', ids: ['B08'] }, c => {
    const a = b1B(c, 8, 7), b = b1B(c, 8, 8)
    const s = stack([{ body: heading(PAD, 14, 'ENDING 1: STOP ON B') + `<g transform="translate(0 22)">${a.body}</g>`, h: a.h + 22 }, { body: heading(PAD, 14, 'ENDING 2: ADD THE HIGHER C') + `<g transform="translate(0 22)">${b.body}</g>`, h: b.h + 22 },
      (() => { const p = para(PAD, 8, 'Both share C D E F G A B. Only the second adds the higher C.', a.w - 2 * PAD, { size: 15, weight: 600 }); return { body: p.svg, h: p.h + 8 } })()], 12)
    return { title: 'Same beginning, different last note', desc: 'Two keyboards. Ending 1 plays C D E F G A B and stops on B. Ending 2 plays the same seven notes and then adds the higher C, highlighted as home. Only the second adds the higher C.', w: a.w, h: s.h, body: s.body }
  })
  svg('B02-native', { group: '1B', source: SRC, teach: 'a semitone is the very next key, white or black' }, c => {
    const mk = (start: 'D' | 'A' | 'C', n: number, a: number, b: number, head: string, blackRing?: number) => fig(c, { head, kb: { scale: 1.12, start, whites: n, cMidi: start === 'A' ? 48 : 60, letters: 'all', groups: false, marks: { [a]: { tone: 'lower', label: nmm(a) }, ...(blackRing ? {} : { [b]: { tone: 'upper', label: nmm(b) } }) } }, hop: [a, b], hopTotal: '1 semitone', extra: k => (blackRing ? ring(k, b) : '') })
    const p1 = mk('D', 4, 64, 65, 'E to F: both white', undefined), p2 = mk('A', 4, 59, 60, 'B to C: both white', undefined), p3 = mk('C', 4, 60, 61, 'C to C♯: white, black', 61)
    return { title: 'Where the half steps really are', desc: 'Three keyboard pieces, each one semitone: E to F (two white keys with no black key between them), B to C (also no black key between), and C to C sharp (a white key and the black key right next to it).', w: p1.w + p2.w + p3.w + 40, h: Math.max(p1.h, p2.h, p3.h), body: p1.body + `<g transform="translate(${p1.w + 20} 0)">${p2.body}</g><g transform="translate(${p1.w + p2.w + 40} 0)">${p3.body}</g>` }
  })
  svg('B03-native', { group: '1B', source: SRC, teach: 'a whole step is two semitones' }, c => {
    const a = fig(c, { head: 'C to D, via C♯', kb: { scale: 1.1, whites: 3, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 62: { tone: 'upper', label: 'D' } } }, hop: [60, 62], hopTotal: '2 semitones = 1 whole step', extra: k => ring(k, 61) })
    const b = fig(c, { head: 'E to F♯, via F', kb: { scale: 1.1, start: 'E', whites: 3, cMidi: 60, letters: 'all', groups: false, marks: { 64: { tone: 'lower', label: 'E' } } }, hop: [64, 66], hopTotal: '2 semitones = 1 whole step', extra: k => ring(k, 66) })
    return { title: 'A whole step is two semitones', desc: 'Left: C to D passes through the black key C sharp, two one-semitone hops, a whole step. Right: E to F sharp passes through F, also two semitones.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  svg('B04-native', { group: '1B', source: SRC, teach: 'two white-key moves, two different real distances' }, c => {
    const a = fig(c, { head: 'C to D: 2 semitones', kb: { scale: 1.1, whites: 3, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 62: { tone: 'upper', label: 'D' } } }, hop: [60, 62] })
    const b = fig(c, { head: 'E to F: 1 semitone', kb: { scale: 1.1, start: 'D', whites: 4, cMidi: 60, letters: 'all', groups: false, marks: { 64: { tone: 'lower', label: 'E' }, 65: { tone: 'upper', label: 'F' } } }, hop: [64, 65] })
    return { title: 'One white-key move, two real distances', desc: 'Left: C to D crosses one black key, so it is 2 semitones. Right: E to F has no black key between them, so it is 1 semitone. Each move is one white key, but the distances differ.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  const STEPS = [2, 2, 1, 2, 2, 2, 1]
  const scale = (c: Ctx, whites: number, start: 'C' | 'G', degs: number[], names: string[], sh: number) => {
    const k = keyboard(c, { start, whites, cMidi: 60, letters: 'none', groups: false, marks: Object.fromEntries(degs.filter(m => m % 12 !== 6 && m % 12 !== 1 && m % 12 !== 3 && m % 12 !== 8 && m % 12 !== 10).map((m, i) => [m, { tone: 'upper', label: nameOfMidi(m) } as Mark])) }, 0, 8)
    let g = k.body, y = k.keyBottom! + 14
    degs.slice(0, -1).forEach((m, i) => { const a = k.xc!(m), b = k.xc!(degs[i + 1]), st = STEPS[i], r = (b - a) / 2
      g += `<path d="M${a} ${y} q${r} ${r * 1.5} ${b - a} 0" fill="none" stroke="${st === 1 ? '#a3495c' : WINE}" stroke-width="${st === 1 ? 3.4 : 2.4}" stroke-linecap="round"/>` + txt((a + b) / 2, y + r * .75 + 20, st === 1 ? 'H' : 'W', { size: 16, weight: 700, anchor: 'middle', fill: st === 1 ? '#a3495c' : WINE, sans: true }) + txt((a + b) / 2, y + r * .75 + 38, String(st), { size: 13, anchor: 'middle', fill: MUTED, sans: true }) })
    degs.filter(m => m % 12 === 6 || m % 12 === 1).forEach(m => { g += ring(k, m) + txt(k.xc!(m), k.keyTop! + 46, nameOfMidi(m), { size: 12, weight: 700, anchor: 'middle', fill: '#fff' }) })
    return { k, g, h: y + 90, names }
  }
  const nameOfMidi = (m: number) => nmm(m)
  svg('B05-native', { group: '1B', art: 'B05', source: 'whole-whole-half-whole-whole-whole-half = 2,2,1,2,2,2,1 (lesson 1B formula); keyboard geometry', teach: 'the major scale is a pattern of unequal steps' }, c => {
    const s = scale(c, 8, 'C', WH8, [], 0)
    const f = s.g + txt(PAD, s.h + 4, 'W  W  H  W  W  W  H', { size: 18, weight: 700, fill: WINE, ls: 2 }) + txt(PAD + 190, s.h + 4, '2 2 1 2 2 2 1 semitones', { size: 14, fill: MUTED, sans: true })
    const cap = para(PAD, s.h + 30, 'W = whole step (2 semitones), H = half step (1). The two half steps are E to F and B to C, the places with no black key between.', s.k.w - 2 * PAD, { size: 14.5, fill: '#5c465b' })
    return { title: 'C major: whole, whole, half, whole, whole, whole, half', desc: 'Eight white keys C to C. Arcs between neighbouring scale notes are labelled W for a whole step of 2 semitones or H for a half step of 1: W W H W W W H. The half steps are E to F and B to C.', w: s.k.w, h: s.h + 30 + cap.h + 8, body: f + cap.svg }
  })
  svg('B06-native', { group: '1B', art: 'B05', variantOf: 'A05', source: SRC, teach: 'seven names and the next C' }, c => {
    const f = seven(c, WH8, 8, 1, { caption: 'Seven names: C D E F G A B. The eighth step lands on the next C.' })
    return { title: 'Seven names and the next C', desc: 'Eight white keys numbered 1 to 8 lettered C D E F G A B C; the first and last are both C.', ...f }
  })
  svg('B09-native', { group: '1B', art: 'B09', source: SRC, teach: 'closeness on the page is not measured distance' }, c => {
    const a = fig(c, { head: 'C to C♯: 1 semitone', kb: { scale: 1.1, whites: 3, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' } } }, hop: [60, 61], extra: k => ring(k, 61) })
    const b = fig(c, { head: 'C to D: 2 semitones', kb: { scale: 1.1, whites: 3, letters: 'all', groups: false, marks: { 60: { tone: 'lower', label: 'C' }, 62: { tone: 'upper', label: 'D' } } }, hop: [60, 62], extra: k => ring(k, 61) })
    return { title: 'Closeness versus measured distance', desc: 'Left: C to C sharp is 1 semitone, the very next key. Right: C to D is 2 semitones. The painted arcs are only decoration; the numbered hops on the real keys are the measurement.', w: a.w + b.w + 30, h: Math.max(a.h, b.h), body: a.body + `<g transform="translate(${a.w + 30} 0)">${b.body}</g>` }
  })
  svg('B10-native', { group: '1B', art: 'B10', source: 'authored practice example (stem C D E); not a source fixture', teach: 'same beginning, two endings: yours to compare' }, c => {
    const mk = (path: number[], stop: number, tone: 'home' | 'lower') => seven(c, path, 8, .8, { path: path.map((m, i) => [m, String(i + 1)] as [number, string]), marks: Object.fromEntries(path.map(m => [m, { tone: m === stop ? tone : 'upper', label: nmm(m) } as Mark])) })
    const a = mk([60, 62, 64, 67], 67, 'lower'), b = mk([60, 62, 64, 60], 60, 'home')
    const s = stack([{ body: heading(PAD, 14, 'STEM C D E, THEN G') + `<g transform="translate(0 22)">${a.body}</g>`, h: a.h + 22 }, { body: heading(PAD, 14, 'STEM C D E, THEN C') + `<g transform="translate(0 22)">${b.body}</g>`, h: b.h + 22 }, (() => { const p = para(PAD, 8, 'Authored practice patterns. Make your own two endings on your keyboard and decide which one fits your idea.', a.w - 2 * PAD, { size: 14.5, fill: MUTED, italic: true }); return { body: p.svg, h: p.h + 8 } })()], 12)
    return { title: 'Make an open ending and an arrival', desc: 'Two keyboards sharing the opening C D E: one ends on G, the other ends on C. Authored practice patterns, not a lesson recording.', w: a.w, h: s.h, body: s.body }
  })
  svg('B11-native', { group: '1B', art: 'B05', variantOf: 'B05', source: 'computed and asserted: G A B C D E F♯ G = 2,2,1,2,2,2,1', teach: 'optional: the same pattern starts anywhere' }, c => {
    const g = [67, 69, 71, 72, 74, 76, 78, 79], st = g.slice(1).map((m, i) => m - g[i]); if (st.join() !== STEPS.join()) throw new Error('G major pattern mismatch ' + st.join())
    const s = scale(c, 8, 'G', g, [], 0)
    const cap = para(PAD, s.h + 6, 'Optional enrichment: start on G and follow the same pattern W W H W W W H. The seventh note is the black key F♯. The pattern travels; the starting note changes.', s.k.w - 2 * PAD, { size: 14.5, fill: '#5c465b' })
    return { title: 'The same pattern from G (optional)', desc: 'Eight white keys starting on G. The same whole-whole-half-whole-whole-whole-half arcs, with the seventh note the black key F sharp. Optional enrichment.', w: s.k.w, h: s.h + 6 + cap.h + 8, body: s.g + cap.svg }
  })

  // ---------- 1C ----------
  const split = (ev: typeof W1.C01) => ({ lo: ev.filter(e => e.role === 'drone'), up: ev.filter(e => e.role === 'melody') })
  const twoLane = (c: Ctx, ev: typeof W1.C01, total: number, w = 660, tick?: number, rests?: string) => { const { lo, up } = split(ev); return lanes(c, [{ name: 'Lower voice', tone: 'lower', events: lo }, { name: 'Upper voice', tone: 'upper', events: up, rests }], total, { w, tick }) }
  svg('C01-native', { group: '1C', art: 'C01', source: 'lib/soundscape/week1/fixtures.ts C01: lower C 0-12 s; upper E 2-4, G 5-7, D 9-11', teach: 'a held foundation with visiting upper notes' }, c => {
    const l = twoLane(c, W1.C01, 12, 660, 2)
    return { title: 'A held lower C with three visiting notes', desc: 'Twelve-second timeline. Lower voice: C for the whole 12 seconds. Upper voice: E from 2 to 4 seconds, G from 5 to 7, D from 9 to 11.', ...l }
  })
  svg('C02-native', { group: '1C', art: 'C02', source: 'week1 fixtures C01 + keyboard geometry', teach: 'two voices, two lines of notes' }, c => {
    const l = twoLane(c, W1.C01, 12, 660, 2)
    const k = fig(c, { kb: { whites: 14, cMidi: 48, scale: .62, letters: 'none', groups: false, marks: { 48: { tone: 'lower', label: 'C' }, 62: { tone: 'upper', label: 'D' }, 64: { tone: 'upper', label: 'E' }, 67: { tone: 'upper', label: 'G' } } } })
    const s = stack([{ body: l.body, h: l.h }, { body: heading(0, 12, 'WHERE THE VOICES SIT ON THE KEYBOARD') + `<g transform="translate(0 18)">${k.body}</g>`, h: k.h + 18 }], 12)
    return { title: 'Two distinct voices', desc: 'A timeline of the lower voice holding C while the upper voice plays E, G, D, and below it a keyboard showing the lower C and the upper notes D, E and G further to the right.', w: 660, h: s.h, body: s.body }
  })
  svg('C03-native', { group: '1C', art: 'C02', source: 'week1 fixtures C01 pitches (C lower; E, G, D upper) + keyboard geometry', teach: 'lower voice left, upper voice right' }, c => {
    const f = fig(c, { kb: { whites: 14, cMidi: 48, scale: .62, letters: 'none', groups: false, marks: { 48: { tone: 'lower', label: 'C' }, 62: { tone: 'upper', label: 'D' }, 64: { tone: 'upper', label: 'E' }, 67: { tone: 'upper', label: 'G' } } }, caption: 'Lower voice: C (amber). Upper voice: E, G and D (teal). The upper notes sit to the right, higher than the lower C.' })
    return { title: 'Lower and higher voice positions', desc: 'Fourteen white keys. The lower voice is the highlighted C on the left. The upper voice is the highlighted D, E and G further right.', ...f }
  })
  svg('C04-native', { group: '1C', art: 'C04', source: 'week1 fixtures C02 (E 2-6 s) and C03 (E 7-11 s) over C 0-12 s', teach: 'same note, different entrance' }, c => {
    const a = twoLane(c, W1.C02, 12, 660, 2, 'rest'), b = twoLane(c, W1.C03, 12, 660, 2, 'rest')
    const s = stack([{ body: heading(0, 10, 'EARLY: E ENTERS AT 2 s (2-6 s)') + `<g transform="translate(0 16)">${a.body}</g>`, h: a.h + 16 }, { body: heading(0, 10, 'LATE: E ENTERS AT 7 s (7-11 s)') + `<g transform="translate(0 16)">${b.body}</g>`, h: b.h + 16 }], 10)
    return { title: 'Early versus late entrance', desc: 'Two twelve-second timelines with the lower C held throughout. In the first, the upper E plays from 2 to 6 seconds. In the second, the same E plays from 7 to 11 seconds. Only the entrance time differs.', w: 660, h: s.h, body: s.body }
  })
  svg('C05-native', { group: '1C', art: 'C04', source: 'week1 fixtures C01 start/end times', teach: 'time as a relationship: when notes start and stop' }, c => {
    const l = twoLane(c, W1.C01, 12, 660, 1)
    const cap = para(0, 6, 'Read left to right. The long lower bar is the held C. Each short upper bar starts and stops at its own time: E 2 to 4, G 5 to 7, D 9 to 11 seconds.', 640, { size: 14.5, fill: '#5c465b' })
    const s = stack([{ body: l.body, h: l.h }, { body: cap.svg, h: cap.h }], 8)
    return { title: 'Time as a musical relationship', desc: 'Twelve-second timeline with one-second ticks. Lower C 0 to 12. Upper E 2 to 4, G 5 to 7, D 9 to 11.', w: 660, h: s.h, body: s.body }
  })
  svg('C06-native', { group: '1C', art: 'C02', variantOf: 'C02', source: 'week1 fixtures C01 (solo helper split)', teach: 'foundation alone, upper notes alone, both together' }, c => {
    const { lo, up } = split(W1.C01), mk = (name: string, tone: 'lower' | 'upper', ev: typeof lo, w: number, head: string) => { const l = lanes(c, [{ name, tone, events: ev }], 12, { w, tick: 3 }); return { body: heading(0, 10, head) + `<g transform="translate(0 16)">${l.body}</g>`, h: l.h + 16 } }
    const a = mk('Lower', 'lower', lo, 660, 'FOUNDATION ONLY'), b = mk('Upper', 'upper', up, 660, 'UPPER NOTES ONLY'), t = twoLane(c, W1.C01, 12, 660, 3)
    const s = stack([a, b, { body: heading(0, 10, 'BOTH TOGETHER') + `<g transform="translate(0 16)">${t.body}</g>`, h: t.h + 16 }], 8)
    return { title: 'One voice alone, then both together', desc: 'Three twelve-second timelines using the same events: the lower C alone, the upper notes E, G and D alone, and both together.', w: 660, h: s.h, body: s.body }
  })
  svg('C07-native', { group: '1C', art: 'C07', source: 'week1 fixtures C04 and C05 (36 s; C04 adds upper C 33-35.8 s)', teach: 'same 36 seconds, two endings' }, c => {
    const a = twoLane(c, W1.C05, 36, 660, 6), b = twoLane(c, W1.C04, 36, 660, 6)
    const s = stack([{ body: heading(0, 10, 'ENDING 1: UPPER B AT 29-32 s, THEN SILENCE') + `<g transform="translate(0 16)">${a.body}</g>`, h: a.h + 16 }, { body: heading(0, 10, 'ENDING 2: THE SAME, THEN A HIGHER C AT 33-35.8 s') + `<g transform="translate(0 16)">${b.body}</g>`, h: b.h + 16 }, (() => { const p = para(0, 8, 'Both share the held lower C (0 to 36 s) and the upper E (8-12), G (15-19), D (23-27) and B (29-32). Only the second adds the final higher C.', 640, { size: 14.5, fill: '#5c465b' }); return { body: p.svg, h: p.h + 8 } })()], 10)
    return { title: 'The same 36 seconds, two endings', desc: 'Two 36-second timelines with the same held lower C and the same upper notes E, G, D, B. The second adds one extra upper note, a higher C from 33 to 35.8 seconds.', w: 660, h: s.h, body: s.body }
  })
  svg('C08-native', { group: '1C', art: 'C08', source: 'week1 fixtures C01 (gaps computed from the events)', teach: 'silence is part of the music' }, c => {
    const l = twoLane(c, W1.C01, 12, 660, 1, 'rest')
    return { title: 'Silence as space', desc: 'The twelve-second example with the upper voice resting between its notes: 0 to 2, 4 to 5, 7 to 9 and 11 to 12 seconds, shown as dashed boxes labelled rest, while the lower C keeps sounding.', ...l }
  })
  svg('C09-native', { group: '1C', art: 'C08', source: 'worksheet; notes C D E G from the lessons', teach: 'five-stage worksheet for a two-voice story' }, c => {
    const stages = ['Set a scene', 'Imagine a visitor', 'Leave some room', 'Change something', 'Choose an ending']
    const cells = stages.map((t, i) => { const x = (i % 3) * 222, y = Math.floor(i / 3) * 150; return `<g transform="translate(${x} ${y})"><rect width="206" height="132" rx="14" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#d9a86a" stroke-width="1.6"/><circle cx="24" cy="26" r="13" fill="${c.print ? '#eee' : '#f6c46a'}"/>${txt(24, 32, String(i + 1), { size: 16, weight: 700, anchor: 'middle' })}${txt(46, 32, t, { size: 16, weight: 600 })}<path d="M16 66 h174 M16 92 h174 M16 118 h174" stroke="#e5d6dc" stroke-width="1.4"/></g>` }).join('')
    const k = fig(c, { head: 'Notes you already know', kb: { whites: 8, scale: .62, letters: 'all', groups: false } })
    const s = stack([{ body: cells, h: 282 }, { body: `<g transform="translate(0 0)">${k.body}</g>`, h: k.h }], 14)
    return { title: 'Compose a two-voice story: worksheet', desc: 'Five numbered boxes with writing lines: 1 Set a scene, 2 Imagine a visitor, 3 Leave some room, 4 Change something, 5 Choose an ending. Below, eight white keys lettered C to C for reference.', w: 650, h: s.h, body: s.body }
  })
  svg('C10-native', { group: '1C', art: 'C10', source: 'week1 fixtures C01', teach: 'Week 1 recap: which line stayed, which changed' }, c => {
    const l = twoLane(c, W1.C01, 12, 660, 2)
    const cap = para(0, 6, 'The lower line stayed on C the whole time. The upper line changed: E, G, then D. In Week 2 the lower line will move too.', 640, { size: 15, fill: '#5c465b' })
    const s = stack([{ body: l.body, h: l.h }, { body: cap.svg, h: cap.h }], 8)
    return { title: 'Week 1 soundscape map', desc: 'The twelve-second example: lower C held, upper E, G, D visiting. Caption: the lower line stayed, the upper line changed; Week 2 moves the lower line as well.', w: 660, h: s.h, body: s.body }
  })
}
