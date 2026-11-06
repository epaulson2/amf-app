// M05 information-first figures. Pure string builders: deterministic static SVG. No script, no audio, no interaction.
// Every hex and every Plogger value is imported from resources/interval-identity.ts (one source). Notes/semitones come from interval-data.json.
import { buildKeyboard, BLACK_WIDTH } from '../m02/keyboard-geometry'
import { txt, para, esc, INK, WINE, MUTED, PAD, type Ctx } from '../m03/native-svg'
import { INTERVALS, type IntervalRecord } from '../resources/palette'
import { identityHex, tint, hasPlogger, PLOGGER_LENS_V1, PLOGGER_LINEAGE, SHAPE_LABEL, SHAPE_SHORT, DIR_LABEL, DIR_SHORT, FILL_LABEL, FILL_SHORT, ploggerDiff, LABEL_INK, type PloggerEntry } from '../resources/interval-identity'

export { INTERVALS, identityHex, PAD, INK, WINE, MUTED, LABEL_INK }
export type Block = { w: number; h: number; body: string }
const SANS = true
export const strip = (n: string) => n.replace(/\d/g, '')
export const BY = (s: number) => INTERVALS.find(i => i.semitones === s)!
export const hexOf = (r: IntervalRecord) => identityHex(r.semitones)
const PLUM = LABEL_INK
export const midiName = (m: number) => { const n = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'][((m % 12) + 12) % 12]; return `${n}${Math.floor(m / 12) - 1}` }
const LET: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }
const letterNum = (n: string) => LET[n[0]] + 7 * Number(n.match(/\d/)![0])
export const letterSpan = (r: IntervalRecord) => letterNum(r.upperName) - letterNum(r.lowerName) + 1
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`
export const semis = (n: number) => plural(n, 'semitone')
export const abbrShort = (r: IntervalRecord) => r.abbr.includes('/') ? r.abbr.split('/')[0] : r.abbr
const upperLabel = (r: IntervalRecord) => r.altSpelling ? `${r.upperName} = ${r.altSpelling.upper}` : r.upperName

// ---------------------------------------------------------------- keyboard
export type KMark = { midi: number; label: string; hex: string }
export type KOpts = { cMidi?: number; rootNeutral?: boolean }
/** Keyboard with callouts above marked keys. Unmarked keys stay plain with letters; marked keys take their exact identity hue. */
export function kbd(c: Ctx, W: number, marks: KMark[], o: KOpts = {}) {
  const cM = o.cMidi ?? 60, k = buildKeyboard('C', 8, cM), ww = (W - 2 * PAD) / 8, wh = Math.round(Math.min(150, Math.max(84, ww * 1.9))), bh = Math.round(wh * 0.62)
  const X = (u: number) => PAD + u * ww, byMidi = new Map(marks.map(m => [m.midi, m]))
  const cx = (midi: number) => { const w = k.whites.find(q => q.midi === midi); if (w) return X(w.x + .5); const b = k.blacks.find(q => q.midi === midi); if (b) return X(b.x + b.w / 2); throw new Error('midi not on window: ' + midi) }
  const pwOf = (m: KMark) => Math.max(34, m.label.length * 8.3 + 14), sorted = [...marks].sort((a, b) => cx(a.midi) - cx(b.midi))
  const lastRight: number[] = [], tierOf = new Map<number, number>()
  for (const m of sorted) { const left = cx(m.midi) - pwOf(m) / 2; let t = lastRight.findIndex(r => left >= r + 4); if (t < 0) { t = lastRight.length; lastRight.push(0) } lastRight[t] = cx(m.midi) + pwOf(m) / 2; tierOf.set(m.midi, t) }
  const tiers = Math.max(1, lastRight.length), TH = 25, top = 14 + tiers * TH + 6
  let g = ''
  for (const w of k.whites) {
    const m = byMidi.get(w.midi)
    g += `<rect x="${X(w.x) + 1}" y="${top}" width="${ww - 2}" height="${wh}" rx="6" fill="${m ? (c.print ? '#f2eef0' : tint(m.hex, .34)) : (c.print ? '#fff' : '#fffdf8')}" stroke="${m ? m.hex : '#bfa8b3'}" stroke-width="${m ? 3.2 : 1.3}"/>`
    g += txt(X(w.x + .5), top + wh - 10, w.letter, { size: Math.max(12, ww * .27), weight: m ? 700 : 500, anchor: 'middle', fill: m ? PLUM : '#7d6477', sans: SANS })
  }
  for (const b of k.blacks) {
    const m = byMidi.get(b.midi)
    g += `<rect x="${X(b.x)}" y="${top - 1}" width="${b.w * ww}" height="${bh}" rx="4" fill="${m ? m.hex : '#3a2140'}" stroke="${m ? '#2a1630' : '#2a1630'}" stroke-width="${m ? 2.4 : 1}"/>`
    if (m) g += `<rect x="${X(b.x) + 3}" y="${top + bh - 12}" width="${b.w * ww - 6}" height="5" rx="2.5" fill="#fffaf3" opacity=".85"/>`
  }
  for (const m of marks) {  // root/endpoint marker dot on white keys; callout pill above every marked key
    const x = cx(m.midi), isBlack = k.blacks.some(q => q.midi === m.midi), t = tierOf.get(m.midi)!
    if (!isBlack) g += `<circle cx="${x}" cy="${top + wh - 40}" r="${Math.min(10, ww * .24)}" fill="${m.hex}" stroke="#fffaf3" stroke-width="2"/>`
    const pw = pwOf(m), py = 4 + (tiers - 1 - t) * TH
    g += `<path d="M${x} ${py + 21} V${top + (isBlack ? 2 : 4)}" stroke="${m.hex}" stroke-width="2"/>`
    g += `<rect x="${Math.min(Math.max(x - pw / 2, 1), W - pw - 1)}" y="${py}" width="${pw}" height="21" rx="10.5" fill="${c.print ? '#fff' : tint(m.hex, .22)}" stroke="${m.hex}" stroke-width="2"/>`
    g += txt(Math.min(Math.max(x, pw / 2 + 1), W - pw / 2 - 1), py + 15, m.label, { size: 13, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
  }
  return { w: W, h: top + wh + 8, body: g, cx, top, keyBottom: top + wh }
}

/** Numbered semitone hops between two keys, then a total. */
export function hopRow(c: Ctx, cx: (m: number) => number, lo: number, hi: number, y: number, hex: string, W: number, label?: string): Block {
  let g = ''
  for (let m = lo; m < hi; m++) {
    const a = cx(m), b = cx(m + 1), r = (b - a) / 2
    g += `<path d="M${a} ${y} q${r} ${Math.min(r * 1.7, 22)} ${b - a} 0" fill="none" stroke="${hex}" stroke-width="2.4" stroke-linecap="round"/>`
    g += txt((a + b) / 2, y + Math.min(r * 1.7, 22) * .5 + 19, String(m - lo + 1), { size: 13, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
  }
  const a = cx(lo), b = cx(hi), t = label ?? semis(hi - lo)
  g += `<path d="M${a} ${y + 46} V${y + 52} H${b} V${y + 46}" fill="none" stroke="${hex}" stroke-width="2"/>`
  const half = t.length * 4.9
  g += txt(Math.min(Math.max((a + b) / 2, PAD + half), W - PAD - half), y + 72, t, { size: 16, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
  return { w: W, h: 82, body: g }
}

// ---------------------------------------------------------------- melodic / harmonic strips
function lane(c: Ctx, x: number, y: number, w: number, label: string, blocks: { from: number; to: number; name: string }[], hex: string) {
  let g = txt(x, y + 21, label, { size: 12.5, weight: 600, fill: PLUM, sans: SANS })
  const lx = x + 62, lw = w - 62
  g += `<rect x="${lx}" y="${y}" width="${lw}" height="32" rx="8" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#e5d6dc"/>`
  blocks.forEach(b => {
    const a = lx + b.from * lw + 2, bw = (b.to - b.from) * lw - 4
    g += `<rect x="${a}" y="${y + 4}" width="${bw}" height="24" rx="6" fill="${c.print ? '#f2eef0' : tint(hex, .34)}" stroke="${hex}" stroke-width="2"/>` + txt(a + bw / 2, y + 21, b.name, { size: 14, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
  })
  return g
}
/** One melodic strip (notes one after another) and one harmonic strip (the same two notes at once). W is the width of ONE strip. */
export function strip2(c: Ctx, W: number, r: IntervalRecord, hex: string): { mel: Block; har: Block } {
  const lo = r.lowerName, up = r.upperName
  const mk = (title: string, sub: string, lo1: [number, number], up1: [number, number]) => {
    let g = txt(0, 12, title, { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 })
    g += lane(c, 0, 24, W, `lower`, [{ from: lo1[0], to: lo1[1], name: lo }], hex) + lane(c, 0, 62, W, `upper`, [{ from: up1[0], to: up1[1], name: up }], hex)
    g += `<path d="M62 106 H${W - 4}" stroke="#a3778f" stroke-width="1.4"/><path d="M${W - 10} 102 l7 4 l-7 4" fill="none" stroke="#a3778f" stroke-width="1.4"/>` + txt(W, 124, 'time', { size: 12, anchor: 'end', fill: MUTED, sans: SANS, italic: true })
    g += txt(0, 124, sub, { size: 12.5, fill: '#5c465b', sans: SANS })
    return { w: W, h: 132, body: g }
  }
  return { mel: mk('MELODIC · ONE AFTER ANOTHER', `${lo} first, then ${up}`, [0, .5], [.5, 1]), har: mk('HARMONIC · TOGETHER', `${lo} and ${up} at once`, [0, 1], [0, 1]) }
}

// ---------------------------------------------------------------- Plogger glyph and panel
const contourPath = (shape: PloggerEntry['shape'], w: number, h: number) => {
  if (shape === 'straight') return `M3 8 H${w - 3} V${h - 8} H3 Z`
  if (shape === 'jagged') {
    const n = 8, t: string[] = [], b: string[] = []
    for (let i = 0; i <= n; i++) { const x = (i * w) / n; t.push(`${x} ${i % 2 ? 2 : 12}`); b.push(`${x} ${i % 2 ? h - 2 : h - 12}`) }
    return `M${t.join(' L')} L${b.reverse().join(' L')} Z`
  }
  let d = `M0 10`
  for (let i = 0; i < 4; i++) d += ` Q${(i + .5) * w / 4} ${i % 2 ? 19 : 1} ${(i + 1) * w / 4} 10`
  d += ` L${w} ${h - 10}`
  for (let i = 3; i >= 0; i--) d += ` Q${(i + .5) * w / 4} ${i % 2 ? h - 19 : h - 1} ${i * w / 4} ${h - 10}`
  return d + ' Z'
}
export const CHIP_W = 92, CHIP_H = 58
/** Monochrome Plogger chip: contour = family (A), side shadow = fundamental/octave (B), fill = harmonicity (C). Never the identity hue. `n` = bracket, null = boundary N/A. */
export function chip(c: Ctx, x: number, y: number, n: number | null, sc = 1, uid = ''): string {
  const w = CHIP_W, h = CHIP_H
  if (n === null || !hasPlogger(n)) return `<g transform="translate(${x} ${y}) scale(${sc})"><rect x="12" y="6" width="${w}" height="${h - 12}" rx="8" fill="none" stroke="#8a7a86" stroke-width="2" stroke-dasharray="6 5"/>${txt(12 + w / 2, h / 2 + 5, 'N/A', { size: 16, weight: 700, anchor: 'middle', fill: '#6b5a68', sans: SANS })}</g>`
  const e = PLOGGER_LENS_V1[n], d = contourPath(e.shape, w, h), id = `${c.uid}-cl${uid}${n}`
  let g = `<g transform="translate(${x} ${y}) scale(${sc})">`
  const sh = (dx: number) => `<path d="${d}" transform="translate(${12 + dx} 0)" fill="#5c465b" opacity=".5"/>`
  if (e.dir === 'F') g += sh(-9); else if (e.dir === 'O') g += sh(9); else g += sh(-9) + sh(9)
  g += `<g transform="translate(12 0)"><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>`
  const fill = e.fill === 'dark' ? PLUM : e.fill === 'neutral' ? '#c4b6bf' : '#fffdf8'
  g += `<path d="${d}" fill="${c.print && e.fill === 'light' ? '#fff' : fill}"/>`
  if (e.fill === 'half') { let s = ''; for (let i = -h; i < w + h; i += 7) s += `<path d="M${i} ${h + 2} L${i + h + 2} -2" stroke="${PLUM}" stroke-width="2.6"/>`; g += `<g clip-path="url(#${id})">${s}</g>` }
  if (e.fill === 'neutral') { let s = ''; for (let yy = 14; yy < h - 8; yy += 11) for (let xx = 10; xx < w - 4; xx += 11) s += `<circle cx="${xx + (yy % 2 ? 5 : 0)}" cy="${yy}" r="2" fill="#6b5a68"/>`; g += `<g clip-path="url(#${id})">${s}</g>` }
  g += `<path d="${d}" fill="none" stroke="${PLUM}" stroke-width="2.4" stroke-linejoin="round"/>`
  if (e.fill === 'half' || e.fill === 'neutral') g += `<rect x="${w / 2 - 19}" y="${h / 2 - 10}" width="38" height="21" rx="10" fill="#fffaf3" stroke="${PLUM}" stroke-width="1.4"/>`
  g += txt(w / 2, h / 2 + 6, `[${n}]`, { size: 17, weight: 700, anchor: 'middle', fill: e.fill === 'dark' ? '#fffaf3' : PLUM, sans: SANS })
  return g + '</g></g>'
}
export const CHIP_BOX = { w: CHIP_W + 24, h: CHIP_H }

/** The three-factor panel for one interval: chip plus A/B/C rows in words. */
export function panel(c: Ctx, W: number, r: IntervalRecord, uid = ''): Block {
  const n = r.semitones, hasP = hasPlogger(n)
  let g = txt(0, 12, `PLOGGER LENS · ${hasP ? `[${n}]` : 'N/A'} · ${abbrShort(r)}`, { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 })
  g += chip(c, 0, 22, hasP ? n : null, 1, uid)
  const vertical = W < 300, tx = vertical ? 0 : CHIP_BOX.w + 14, tw = vertical ? W : Math.max(110, W - tx)
  let y = vertical ? 22 + CHIP_H + 22 : 38
  const rows = hasP ? [['A', 'Shape', SHAPE_LABEL[PLOGGER_LENS_V1[n].shape]], ['B', 'Shadow', DIR_LABEL[PLOGGER_LENS_V1[n].dir]], ['C', 'Fill', FILL_LABEL[PLOGGER_LENS_V1[n].fill]]]
    : [['A', 'Shape', 'N/A, reference boundary'], ['B', 'Shadow', 'N/A, reference boundary'], ['C', 'Fill', 'N/A, reference boundary']]
  for (const [k, nm, v] of rows) { const p = para(tx, y, `${k} ${nm}: ${v}`, tw, { size: 13, fill: '#4a3a4a', sans: SANS, lh: 17 }); g += p.svg; y += p.h + 5 }
  const h = vertical ? y - 4 : Math.max(22 + CHIP_H + 8, y - 20)
  if (!hasP) { const p = para(0, 22 + CHIP_H + 20, `Plogger [1]–[11] model: N/A (boundary/reference). ${n === 0 ? 'Unison' : 'Octave'} has no original di-chord.`, W, { size: 12.5, fill: '#6b5a68', sans: SANS, lh: 16 }); g += p.svg; return { w: W, h: 22 + CHIP_H + 20 + p.h + 2, body: g } }
  return { w: W, h, body: g }
}

/** Full legend for all three factors. Present on every interval sheet. */
export function legend(c: Ctx, W: number): Block {
  let g = txt(0, 12, 'HOW TO READ THE THREE PLOGGER MARKS', { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 }), y = 32
  for (const s of [
    'A Shape (outline): jagged = dissonant family · rounded = modal family · straight = perfect-group family. A family label, not a measured sound wave.',
    'B Shadow (side): ← Fundamental [1]–[5] · ↔ Both [6] · → Octave [7]–[11]. Always paired with its arrow.',
    'C Fill (inside): dense/dark = non-harmonic · open/light = harmonic · midtone dotted = neutral [6] · hatched = false-harmonic [9].',
    `A historic teaching lens (${PLOGGER_LINEAGE}), not acoustic law. The identity colour is a separate, artistic label.`,
  ]) { const p = para(0, y, s, W, { size: 12.5, fill: '#4a3a4a', sans: SANS, lh: 16.5 }); g += p.svg; y += p.h + 5 }
  return { w: W, h: y, body: g }
}

// ---------------------------------------------------------------- assembly helpers
export function colStack(blocks: Block[], gap = 20) { let y = 0, body = ''; for (const b of blocks) { body += `<g transform="translate(0 ${y})">${b.body}</g>`; y += b.h + gap } return { body, h: Math.max(0, y - gap) } }
export function row(blocks: Block[], gap = 24) { let x = 0, body = '', h = 0; for (const b of blocks) { body += `<g transform="translate(${x} 0)">${b.body}</g>`; x += b.w + gap; h = Math.max(h, b.h) } return { body, w: x - gap, h } }
/** Identity header: colour stripe, name, codes. */
export function header(c: Ctx, W: number, r: IntervalRecord, extra?: string): Block {
  const hex = hexOf(r), n = r.semitones, size = W < 500 ? 25 : 30
  let g = `<rect x="0" y="4" width="10" height="${extra ? 84 : 66}" rx="5" fill="${hex}"/>`
  g += txt(24, 32, r.name, { size, fill: PLUM })
  g += txt(24, 54, `${r.id} · ${r.abbr} · ${semis(n).toUpperCase()}${hasPlogger(n) ? ` · PLOGGER [${n}]` : ''}`, { size: 12, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.2 })
  g += txt(24, 76, `${r.lowerName} → ${upperLabel(r)} · MIDI ${r.lowerMidi} → ${r.upperMidi}`, { size: 14.5, fill: '#4a3a4a', sans: SANS })
  if (extra) g += txt(24, 96, extra, { size: 12.5, fill: '#6b5a68', sans: SANS })
  return { w: W, h: extra ? 100 : 84, body: g }
}

/** Neighbour lines: what stays and what changes against the next lower and next higher interval. */
export function neighbours(c: Ctx, W: number, r: IntervalRecord): Block {
  const out: string[] = []
  const line = (o: IntervalRecord, dirWord: string) => {
    const d = ploggerDiff(r.semitones, o.semitones), delta = Math.abs(o.semitones - r.semitones)
    const move = r.semitones === 0 && dirWord === 'higher' ? `upper note C4→${o.upperName}` : `upper note ${r.upperName}→${o.upperName}`
    const p = d ? `Plogger: A ${d.shape ? 'same' : 'changes'}, B ${d.dir ? 'same' : 'changes'}, C ${d.fill ? 'same' : 'changes'}.` : 'Plogger: N/A at a boundary.'
    return `Next ${dirWord}: ${o.name} (${o.abbr}, ${semis(o.semitones)}). Root C4 stays; ${move}, ${delta === 1 ? 'one key apart' : `${delta} keys apart`}. ${p}`
  }
  if (r.semitones > 0) out.push(line(BY(r.semitones - 1), 'lower'))
  if (r.semitones < 12) out.push(line(BY(r.semitones + 1), 'higher'))
  let g = txt(0, 12, 'WHAT STAYS, WHAT CHANGES (NEIGHBOURS)', { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 }), y = 32
  for (const s of out) { const p = para(0, y, s, W, { size: 13, fill: '#4a3a4a', sans: SANS, lh: 17 }); g += p.svg; y += p.h + 6 }
  return { w: W, h: y, body: g }
}

/** One complete interval sheet (card-level information architecture, full size). W 720 desktop, 360 phone. */
export function sheet(c: Ctx, r: IntervalRecord, W: number): { w: number; h: number; body: string; desc: string } {
  const hex = hexOf(r), n = r.semitones, wide = W >= 600, iw = W - 2 * PAD
  const marks: KMark[] = n === 0 ? [{ midi: 60, label: 'C4 · both notes', hex }] : [{ midi: r.lowerMidi, label: `${r.lowerName} start`, hex }, { midi: r.upperMidi, label: `${upperLabel(r)} end`, hex }]
  const k = kbd(c, W, marks)
  const kbBlock: Block = { w: W, h: k.h, body: k.body }
  const hopsB: Block = n === 0 ? { w: W, h: 36, body: txt(W / 2, 22, '0 semitones: one key, played twice', { size: 16, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS }) } : hopRow(c, k.cx, r.lowerMidi, r.upperMidi, 8, hex, W)
  const sw = wide ? (iw - 24) / 2 : iw, st = strip2(c, sw, r, hex)
  const strips: Block = wide ? row([st.mel, st.har], 24) : colStack([st.mel, st.har], 14) as unknown as Block
  const pw = wide ? 330 : iw, pn = panel(c, pw, r), lg = legend(c, wide ? iw - pw - 24 : iw)
  const mid: Block = wide ? row([pn, lg], 24) : colStack([pn, lg], 18) as unknown as Block
  const spelled = [`${letterSpan(r)} letter name${letterSpan(r) === 1 ? '' : 's'} counted inclusively (${r.lowerName[0]} to ${r.upperName[0]})`]
  if (r.altSpelling) spelled.push(`same key, other spelling: ${r.lowerName} to ${r.altSpelling.upper} is a ${r.altSpelling.name.toLowerCase()}`)
  const hdr = header(c, W, r, spelled.join(' · ').length < 70 || wide ? spelled.join(' · ') : spelled[0])
  const nb = neighbours(c, iw, r)
  const how = para(0, 14, n === 0 ? 'How to read: one key is highlighted because both notes are the same pitch. Melodic: the same C twice, one after the other. Harmonic: one C, doubled. Distance: zero keys.'
    : `How to read: find ${r.lowerName} on your keyboard, then count ${n} keys up, white and black, to ${r.upperName}. The numbered arcs are those hops. Top left shows the two notes one after another, top right the same two notes together.`, iw, { size: 13.5, fill: '#4a3a4a', sans: SANS, lh: 18 })
  const parts: Block[] = [hdr, kbBlock, hopsB, strips, mid, nb, { w: iw, h: how.h + 8, body: how.svg }]
  const s = colStack(parts, 16)
  const desc = n === 0 ? `Perfect unison, C4 with C4, zero semitones. One key highlighted on a keyboard from C4 to C5. Two time strips show the same note one after another and at once. Plogger is not applicable at the boundary.`
    : `${r.name}, ${r.abbr}: ${r.lowerName} to ${upperLabel(r)}, ${semis(n)}. A keyboard from C4 to C5 with both keys highlighted in this interval's identity colour and ${n} numbered semitone hops. Two time strips show the notes one after another and together. ${hasPlogger(n) ? `Plogger [${n}] lens: ${SHAPE_LABEL[PLOGGER_LENS_V1[n].shape]}, ${DIR_LABEL[PLOGGER_LENS_V1[n].dir]}, ${FILL_LABEL[PLOGGER_LENS_V1[n].fill]}.` : 'Plogger is not applicable at the boundary.'}`
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc }
}

// ---------------------------------------------------------------- compact card
export function card(c: Ctx, r: IntervalRecord): { w: number; h: number; body: string; desc: string } {
  const W = 300, hex = hexOf(r), n = r.semitones, iw = W - 2 * PAD
  const marks: KMark[] = n === 0 ? [{ midi: 60, label: 'C4', hex }] : [{ midi: r.lowerMidi, label: 'C4', hex }, { midi: r.upperMidi, label: upperLabel(r).replace(/ = .*/, ''), hex }]
  const k = kbd(c, W, marks)
  let g = `<rect x="0" y="0" width="${W}" height="8" rx="4" fill="${hex}"/>` + txt(PAD, 36, r.name, { size: 21, fill: PLUM }) + txt(PAD, 56, `${r.id} · ${r.abbr} · ${semis(n).toUpperCase()}`, { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 })
  g += txt(PAD, 76, `${r.lowerName} → ${upperLabel(r)}`, { size: 14.5, fill: '#4a3a4a', sans: SANS })
  g += `<g transform="translate(0 84)">${k.body}</g>`
  let y = 84 + k.h + 6
  const hasP = hasPlogger(n), e = hasP ? PLOGGER_LENS_V1[n] : null
  g += chip(c, 0, y, hasP ? n : null, .86, 'c')
  const lines = e ? [`A ${SHAPE_SHORT[e.shape]}`, `B ${DIR_SHORT[e.dir]}`, `C ${FILL_SHORT[e.fill]}`] : ['A N/A', 'B N/A', 'C N/A']
  lines.forEach((l, i) => { g += txt(112, y + 17 + i * 17, l, { size: 13, weight: 600, fill: '#4a3a4a', sans: SANS }) })
  y += 56
  g += txt(PAD, y + 10, hasP ? 'Plogger lens: A shape · B shadow · C fill' : 'Plogger [1]–[11]: N/A (boundary)', { size: 11.5, fill: '#6b5a68', sans: SANS })
  const desc = `Card for ${r.name} (${r.abbr}), ${semis(n)}, ${r.lowerName} to ${upperLabel(r)}, with a mini keyboard and the three Plogger marks${hasP ? ` [${n}]` : ' (not applicable at the boundary)'}.`
  return { w: W, h: y + 22, body: g, desc }
}

// ---------------------------------------------------------------- comparisons
const ROWMAIN = 25
/** Comparison of several intervals that share the C4 root: shared keyboard, span bars, +n differences, panels and a same/changes table. */
export function compare(c: Ctx, W: number, rs: IntervalRecord[], head: string, sub: string): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD
  const marks: KMark[] = [{ midi: 60, label: 'C4 · stays', hex: PLUM }, ...rs.map(r => ({ midi: r.upperMidi, label: `${r.altSpelling ? `${r.upperName}=${r.altSpelling.upper}` : r.upperName} ${abbrShort(r)}`, hex: hexOf(r) }))]
  const k = kbd(c, W, marks)
  const kbBlock: Block = { w: W, h: k.h, body: k.body }
  let bars = '', y = 4
  for (const r of rs) {
    const a = k.cx(60), b = k.cx(r.upperMidi), hex = hexOf(r)
    bars += `<path d="M${a} ${y + 4} V${y + 12} H${b} V${y + 4}" fill="none" stroke="${hex}" stroke-width="3"/>`
    bars += txt(a, y + 30, `${r.abbr} · ${semis(r.semitones)}`, { size: 14.5, weight: 700, fill: PLUM, sans: SANS }); y += 38
  }
  const diffs = rs.slice(1).map((r, i) => ({ from: rs[i], to: r, d: r.upperMidi - rs[i].upperMidi }))
  const dp = para(0, y + 18, diffs.map(d => `${abbrShort(d.from)} → ${abbrShort(d.to)}: ${d.d > 0 ? '+' : ''}${d.d} semitone${Math.abs(d.d) === 1 ? '' : 's'} on the upper note`).join(' · '), iw, { size: 13.5, weight: 700, fill: WINE, sans: SANS, lh: 18 }); bars += dp.svg; y += dp.h + 16
  const bar: Block = { w: W, h: y, body: bars }
  // panels in columns
  const cols = W >= 700 ? rs.length : 1, pw = Math.floor((iw - (cols - 1) * 20) / cols)
  const pans = rs.map((r, i) => panel(c, cols > 1 ? pw : iw, r, 'p' + i))
  const panelBlock: Block = cols > 1 ? row(pans, 20) : colStack(pans, 14) as unknown as Block
  // table
  const lw = W >= 700 ? 130 : 70, rw = W >= 700 ? 100 : 66, cw = (iw - lw - rw) / rs.length, fs = W >= 700 ? 14 : 12
  const val = (r: IntervalRecord, f: string) => {
    const e = hasPlogger(r.semitones) ? PLOGGER_LENS_V1[r.semitones] : null
    switch (f) { case 'lo': return r.lowerName; case 'up': return upperLabel(r).replace(/ = .*/, ''); case 'st': return String(r.semitones)
      case 'A': return e ? SHAPE_SHORT[e.shape] : 'N/A'; case 'B': return e ? DIR_SHORT[e.dir] : 'N/A'; default: return e ? FILL_SHORT[e.fill] : 'N/A' }
  }
  const rowsT: [string, string][] = [['lo', 'Root'], ['up', 'Upper note'], ['st', 'Semitones'], ['A', 'A Shape'], ['B', 'B Shadow'], ['C', 'C Fill']]
  let t = '', ty = 0; const RH = 26
  t += txt(0, ty + 14, 'WHAT STAYED, WHAT CHANGED', { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 }); ty += 22
  rs.forEach((r, i) => { t += `<rect x="${lw + i * cw + 3}" y="${ty}" width="${cw - 6}" height="5" rx="2.5" fill="${hexOf(r)}"/>` + txt(lw + i * cw + cw / 2, ty + 22, abbrShort(r), { size: fs, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS }) })
  t += txt(lw + rs.length * cw + rw / 2, ty + 22, 'result', { size: fs - 1, weight: 700, anchor: 'middle', fill: '#8a5a66', sans: SANS }); ty += 30
  for (const [f, name] of rowsT) {
    const vals = rs.map(r => val(r, f)), same = vals.every(v => v === vals[0])
    t += `<path d="M0 ${ty} H${iw}" stroke="#e6dccb"/>` + txt(0, ty + 18, name, { size: fs, weight: 600, fill: '#4a3a4a', sans: SANS })
    vals.forEach((v, i) => { t += txt(lw + i * cw + cw / 2, ty + 18, v, { size: fs, fill: PLUM, anchor: 'middle', sans: SANS, weight: same ? 400 : 700 }) })
    t += same ? txt(lw + rs.length * cw + rw / 2, ty + 18, '= same', { size: fs, anchor: 'middle', fill: '#6b5a68', sans: SANS }) : `<rect x="${lw + rs.length * cw + 4}" y="${ty + 3}" width="${rw - 8}" height="20" rx="10" fill="${c.print ? '#fff' : '#f3e1e0'}" stroke="${WINE}" stroke-width="1.6"/>` + txt(lw + rs.length * cw + rw / 2, ty + 18, W >= 700 ? 'Δ changes' : 'changes', { size: fs - 2, weight: 700, anchor: 'middle', fill: WINE, sans: SANS })
    ty += RH
  }
  t += `<path d="M0 ${ty} H${iw}" stroke="#e6dccb"/>`
  const table: Block = { w: iw, h: ty + 6, body: t }
  const lg = legend(c, iw)
  const spell = rs.find(r => r.altSpelling)
  const notes = spell ? para(0, 14, `The tritone is ${semis(spell.semitones)}. Written ${spell.upperName.replace(/\d/, '')} above C it is an augmented fourth (A4); written ${spell.altSpelling!.upper.replace(/\d/, '')} it is a diminished fifth (d5). Same key, two correct names.`, iw, { size: 13.5, fill: '#4a3a4a', sans: SANS, lh: 18 }) : null
  const subP = para(0, 46, sub, iw, { size: 13.5, fill: '#4a3a4a', sans: SANS, lh: 18 })
  const parts: Block[] = [{ w: W, h: 36 + subP.h, body: txt(0, 24, head, { size: W < 500 ? 21 : 28, fill: PLUM }) + subP.svg.replace(/y="46"/, 'y="46"') }, kbBlock, bar, panelBlock, table]
  if (notes) parts.push({ w: iw, h: notes.h + 8, body: notes.svg })
  parts.push(lg)
  const s = colStack(parts, 18)
  const desc = `${head}. A keyboard from C4 to C5 with C4 as the shared root and the upper notes ${rs.map(r => `${upperLabel(r)} (${r.abbr}, ${semis(r.semitones)})`).join(', ')} each in its own identity colour. A table lists what stayed (root C4) and what changed (upper note, semitone count, and the Plogger shape, shadow and fill where they apply).`
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc }
}

// ---------------------------------------------------------------- thirteen-landmark map (wide) and one-page table
export function map(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD
  const marks: KMark[] = INTERVALS.map(r => ({ midi: r.upperMidi, label: W < 500 ? `${strip(upperLabel(r)).replace(/ = .*/, '')}` : `${abbrShort(r)} ${strip(r.upperName)}`, hex: hexOf(r) }))
  const k = kbd(c, W, marks)
  const x0 = 26, pw = iw - 52, X = (s: number) => PAD + x0 + (s / 12) * pw
  let g = txt(0, 14, 'EXACT RULER · SEMITONES ABOVE C4 (0–12)', { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 }) + `<path d="M${X(0)} 54 H${X(12)}" stroke="#a3778f" stroke-width="2"/>`
  INTERVALS.forEach(r => {
    const x = X(r.semitones), hex = hexOf(r), rad = W < 500 ? 11 : 15
    g += `<circle cx="${x}" cy="54" r="${rad}" fill="${c.print ? '#fff' : tint(hex, .34)}" stroke="${hex}" stroke-width="3"/>` + txt(x, 59, String(r.semitones), { size: W < 500 ? 12 : 15, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
    g += txt(x, 54 + rad + 17 + (W < 500 && r.semitones % 2 ? 14 : 0), abbrShort(r), { size: W < 500 ? 12 : 14.5, weight: 700, anchor: 'middle', fill: PLUM, sans: SANS })
    if (W >= 500) {
      g += txt(x, 54 + rad + 36, strip(upperLabel(r)).replace(/ = .*/, ''), { size: 12.5, anchor: 'middle', fill: '#4a3a4a', sans: SANS })
      g += chip(c, x - 28, 54 + rad + 46, hasPlogger(r.semitones) ? r.semitones : null, .52, 'm')
    }
  })
  const gy = W >= 500 ? 190 : 132
  const note = para(0, gy, (W < 500 ? 'Plogger marks for each interval are on the one-page table. ' : 'Chips under the ruler are the Plogger [n] marks; 0 and 12 are N/A boundaries. ') + 'C4 to B4 is 11 semitones. B4 to C5 is a different step of 1 semitone. Colours are artistic labels; the numbers and notes are the measure.', iw, { size: 13, fill: '#4a3a4a', sans: SANS, lh: 17 })
  const ruler: Block = { w: W, h: gy + note.h + 6, body: g + note.svg }
  const lg = legend(c, iw), s = colStack([{ w: W, h: k.h, body: k.body }, ruler, lg], 16)
  const desc = `A keyboard from C4 to C5 with all thirteen pitches marked, each in its own fixed identity colour, above an exact ruler from 0 to 12 semitones: ${INTERVALS.map(r => `${r.abbr} ${r.semitones}`).join(', ')}. Plogger marks apply to 1 through 11; 0 and 12 are boundaries.`
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc }
}

/** One-page table: a row per interval with swatch, name, notes, semitones and the three Plogger marks. */
export function onepage(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD, wide = W >= 600, RH = wide ? 52 : 50
  let g = txt(0, 16, wide ? 'THIRTEEN INTERVALS · C4 TO EACH NOTE' : 'THIRTEEN INTERVALS FROM C4', { size: 11.5, weight: 700, fill: '#8a5a66', sans: SANS, ls: 1.1 })
  const y0 = 30
  if (wide) g += txt(22, y0 + 14, 'interval', { size: 11, weight: 700, fill: '#8a5a66', sans: SANS }) + txt(250, y0 + 14, 'notes', { size: 11, weight: 700, fill: '#8a5a66', sans: SANS }) + txt(375, y0 + 14, 'semitones', { size: 11, weight: 700, fill: '#8a5a66', sans: SANS }) + txt(465, y0 + 14, 'Plogger A · B · C', { size: 11, weight: 700, fill: '#8a5a66', sans: SANS })
  const ys = wide ? y0 + 22 : y0 + 6
  INTERVALS.forEach((r, i) => {
    const y = ys + i * RH, hex = hexOf(r), n = r.semitones, e = hasPlogger(n) ? PLOGGER_LENS_V1[n] : null
    g += `<path d="M0 ${y} H${iw}" stroke="#e6dccb"/><rect x="0" y="${y + 6}" width="9" height="${RH - 12}" rx="4.5" fill="${hex}"/>`
    if (wide) {
      g += txt(22, y + 30, `${r.name}`, { size: 17, fill: PLUM }) + txt(22 + 0, y + 45, `${r.abbr}`, { size: 12, weight: 700, fill: '#8a5a66', sans: SANS })
      g += txt(250, y + 31, `${r.lowerName} → ${upperLabel(r)}`, { size: 14, fill: '#4a3a4a', sans: SANS }) + txt(375, y + 32, String(n), { size: 20, weight: 700, fill: PLUM, sans: SANS })
      g += chip(c, 455, y + 2, e ? n : null, .8, 'o') + txt(552, y + 30, e ? `${SHAPE_SHORT[e.shape]} · ${DIR_SHORT[e.dir]} · ${FILL_SHORT[e.fill]}` : 'N/A (boundary)', { size: 12.5, fill: '#4a3a4a', sans: SANS })
    } else {
      g += txt(20, y + 22, r.name, { size: 16, fill: PLUM }) + txt(20, y + 40, `${r.abbr} · ${n} · ${r.lowerName} → ${upperLabel(r)}`, { size: 12.5, fill: '#4a3a4a', sans: SANS })
      g += chip(c, iw - 82, y + 3, e ? n : null, .66, 'o')
    }
  })
  const end = ys + 13 * RH, lg = legend(c, iw)
  g += `<path d="M0 ${end} H${iw}" stroke="#e6dccb"/><g transform="translate(0 ${end + 14})">${lg.body}</g>`
  return { w: W, h: end + 14 + lg.h + 12, body: `<g transform="translate(${PAD} 4)">${g}</g>`, desc: `A one-page table of the thirteen intervals from C4: each row has its identity colour, name, abbreviation, note pair, semitone count and its three Plogger marks (shape, shadow, fill), with N/A for the unison and the octave.` }
}

// ---------------------------------------------------------------- Plogger chart (all 11 glyphs + two N/A boundaries)
export function ploggerChart(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD, cols = W >= 700 ? 4 : 2, cw = Math.floor(iw / cols), RH = 118
  let g = txt(0, 14, `PLOGGER LENS · [1]–[11] · ${PLOGGER_LINEAGE.toUpperCase().slice(0, 52)}…`, { size: 11, weight: 700, fill: '#8a5a66', sans: SANS, ls: .8 })
  const items = INTERVALS
  items.forEach((r, i) => {
    const col = i % cols, rw = Math.floor(i / cols), x = col * cw, y = 30 + rw * RH, n = r.semitones, e = hasPlogger(n) ? PLOGGER_LENS_V1[n] : null
    g += `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${cw - 10}" height="${RH - 10}" rx="10" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#e6dccb"/><rect x="0" y="0" width="7" height="${RH - 10}" rx="3.5" fill="${hexOf(r)}"/>`
    g += txt(16, 20, `${r.abbr} · ${n}`, { size: 14, weight: 700, fill: PLUM, sans: SANS }) + chip(c, 8, 28, e ? n : null, .8, 'g')
    const tx = 104, ln = e ? [SHAPE_SHORT[e.shape], DIR_SHORT[e.dir], FILL_SHORT[e.fill]] : ['N/A', 'N/A', 'N/A']
    ln.forEach((l, k) => { g += txt(tx, 46 + k * 16, `${'ABC'[k]} ${l}`, { size: 12.5, fill: '#4a3a4a', sans: SANS }) })
    g += '</g>'
  })
  const end = 30 + Math.ceil(items.length / cols) * RH, lg = legend(c, iw)
  g += `<g transform="translate(0 ${end})">${lg.body}</g>`
  return { w: W, h: end + lg.h + 14, body: `<g transform="translate(${PAD} 4)">${g}</g>`, desc: 'A chart of all thirteen intervals showing the historic Plogger three-factor glyph for [1] to [11] and N/A for the unison and octave, each with its shape, shadow and fill named, and a legend.' }
}

// ---------------------------------------------------------------- inversion and register
export function invert(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD, wide = W >= 700, hw = wide ? Math.floor((iw - 40) / 2) : iw
  const pairs: [number, number][] = [[3, 9], [4, 8], [5, 7]]
  const blocks: Block[] = pairs.map(([a, b]) => {
    const A = BY(a), B = BY(b)
    const k1 = kbd(c, hw, [{ midi: A.lowerMidi, label: A.lowerName, hex: hexOf(A) }, { midi: A.upperMidi, label: upperLabel(A), hex: hexOf(A) }])
    const k2 = kbd(c, hw, [{ midi: A.upperMidi, label: A.upperName + ' ↑', hex: hexOf(B) }, { midi: A.lowerMidi + 12, label: 'C5', hex: hexOf(B) }])
    const t1: Block = { w: hw, h: k1.h + 52, body: txt(0, 16, `${A.name} · ${A.abbr} · ${a}`, { size: 15, weight: 700, fill: PLUM, sans: SANS }) + `<g transform="translate(0 22)">${k1.body}</g>` }
    const t2: Block = { w: hw, h: k2.h + 52, body: txt(0, 16, `${B.name} · ${B.abbr} · ${b}`, { size: 15, weight: 700, fill: PLUM, sans: SANS }) + `<g transform="translate(0 22)">${k2.body}</g>` }
    const r1 = wide ? row([t1, t2], 40) : colStack([t1, t2], 10)
    const h = r1.h + 36
    return { w: iw, h, body: `<rect x="0" y="0" width="7" height="${h - 8}" rx="3.5" fill="${hexOf(A)}"/><g transform="translate(14 0)">${r1.body}</g>` + txt(14, r1.h + 22, `${a} + ${b} = 12 semitones · interval numbers ${A.abbr[1]} + ${B.abbr[1]} = 9 · move the lower note up an octave`, { size: 13.5, weight: 700, fill: WINE, sans: SANS }) }
  })
  const head: Block = { w: iw, h: 42, body: txt(0, 24, 'Inversion: the lower note moves up an octave', { size: W < 500 ? 20 : 26, fill: PLUM }) }
  const s = colStack([head, ...blocks], 16)
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc: 'Three inversion pairs on a keyboard from C4 to C5, each interval in its own identity colour. Minor third (3) becomes major sixth (9); major third (4) becomes minor sixth (8); perfect fourth (5) becomes perfect fifth (7). Each pair adds to 12 semitones and the interval numbers add to 9.' }
}
export function register(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const iw = W - 2 * PAD, wide = W >= 700, hw = wide ? Math.floor((iw - 40) / 3) : iw, P5 = BY(7), hex = hexOf(P5)
  const regs = [{ c0: 36, t: 'low register' }, { c0: 60, t: 'middle register' }, { c0: 84, t: 'high register' }]
  const bl: Block[] = regs.map(rg => { const k = kbd(c, hw, [{ midi: rg.c0, label: midiName(rg.c0), hex }, { midi: rg.c0 + 7, label: midiName(rg.c0 + 7), hex }], { cMidi: rg.c0 }); return { w: hw, h: k.h + 30, body: txt(0, 16, rg.t, { size: 15, weight: 700, fill: PLUM, sans: SANS }) + `<g transform="translate(0 22)">${k.body}</g>` } })
  const r1 = wide ? row(bl, 20) : colStack(bl, 12)
  const p = para(0, 14, 'The same perfect fifth: 7 semitones in every register. How blended or rough it sounds also depends on register, instrument, tuning and context, so the key pattern alone cannot rank intervals.', iw, { size: 14, fill: '#4a3a4a', sans: SANS, lh: 19 })
  const s = colStack([{ w: iw, h: 40, body: txt(0, 24, 'The same interval in three registers', { size: W < 500 ? 20 : 26, fill: PLUM }) }, { w: iw, h: r1.h, body: r1.body }, { w: iw, h: p.h + 4, body: p.svg }], 16)
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc: 'Three keyboards, each showing a perfect fifth of 7 semitones in its identity colour: C2 to G2 (low), C4 to G4 (middle) and C6 to G6 (high). The distance is identical; how it sounds depends on register, instrument and context.' }
}

// ---------------------------------------------------------------- introductory figures, recoloured
export function intro04(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const r = BY(4), hex = hexOf(r), iw = W - 2 * PAD
  const k = kbd(c, W, [{ midi: 60, label: 'C4 start', hex }, { midi: 64, label: 'E4 end', hex }]), h = hopRow(c, k.cx, 60, 64, 8, hex, W, '4 semitones = a major third')
  const t = para(0, 14, 'An interval measures the distance between two notes. Count every key, white and black, from C up to E: four hops. The distance, four semitones, is the interval.', iw, { size: 14, fill: '#4a3a4a', sans: SANS, lh: 19 })
  const s = colStack([{ w: W, h: k.h, body: k.body }, h, { w: iw, h: t.h + 4, body: t.svg }], 14)
  return { w: W, h: s.h + 12, body: `<g transform="translate(${PAD} 4)">${s.body}</g>`, desc: 'A keyboard from C4 to C5 with C4 and E4 highlighted in the major-third identity colour and four numbered semitone hops between them: C to C-sharp, to D, to D-sharp, to E.' }
}
export function intro05(c: Ctx, W: number): { w: number; h: number; body: string; desc: string } {
  const r = BY(4), hex = hexOf(r), iw = W - 2 * PAD, st = strip2(c, W >= 600 ? (iw - 24) / 2 : iw, r, hex)
  const s = W >= 600 ? row([st.mel, st.har], 24) : colStack([st.mel, st.har], 14)
  const t = para(0, 14, 'Same two notes, C4 and E4. Melodic: one after another. Harmonic: together. The distance between the notes does not change; the way they meet in time does.', iw, { size: 14, fill: '#4a3a4a', sans: SANS, lh: 19 })
  const all = colStack([{ w: iw, h: s.h, body: s.body }, { w: iw, h: t.h + 4, body: t.svg }], 14)
  return { w: W, h: all.h + 12, body: `<g transform="translate(${PAD} 4)">${all.body}</g>`, desc: 'Two time strips for the same notes C4 and E4. In the melodic strip C4 sounds first and E4 second. In the harmonic strip both sound together for the whole span.' }
}
