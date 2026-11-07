// M07 Week 2 graphics kit. Pure string builders (deterministic static SVG: no script, audio or interaction).
// Single authority for colour: every interval hue comes from identityHex() and every Plogger glyph from PLOGGER_LENS_V1 (via the M05 chip/panel/legend).
// Voices are NEVER coloured. Lower voice = filled dark circle, upper voice = light square with dark outline. Hue belongs to the two-note relationship.
import { buildKeyboard, BLACK_WIDTH, type Keyboard, type Letter } from '../m02/keyboard-geometry'
import { txt, para, esc, INK, WINE, MUTED } from '../m03/native-svg'
import { identityHex, tint, PAPER, LABEL_INK } from '../resources/interval-identity'
import { chip, panel, legend, midiName, BY, type Block } from '../m05/info-svg'

export { txt, para, esc, INK, WINE, MUTED, identityHex, tint, PAPER, LABEL_INK, chip, panel, legend, midiName, BY }
export type { Block }
export type Variant = 'screen' | 'narrow' | 'print'
export type Ctx = { uid: string; print: boolean; W: number; narrow: boolean; variant: Variant }
export const WIDTH: Record<Variant, number> = { screen: 760, narrow: 360, print: 760 }
export const ctxFor = (variant: Variant, uid: string): Ctx => ({ uid, print: variant === 'print', W: WIDTH[variant], narrow: variant === 'narrow', variant })

export const GRID = '#9a8798', SOFT = '#e5d6dc', KEYFACE = '#fffdf8', RESTINK = '#6b5a68'
export type Voice = 'lower' | 'upper'

// ---------------------------------------------------------------- note facts
const LETTER_IDX: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }
export const noteName = (m: number) => midiName(m)
const letterNum = (m: number) => { const n = midiName(m); return LETTER_IDX[n[0]] + 7 * Number(n.match(/\d/)![0]) }
/** Week 2 vocabulary. Anything not listed here is not named in Week 2 figures. */
export const IV: Record<number, { name: string; abbr: string }> = {
  2: { name: 'major second', abbr: 'M2' }, 3: { name: 'minor third', abbr: 'm3' }, 4: { name: 'major third', abbr: 'M3' },
  5: { name: 'perfect fourth', abbr: 'P4' }, 6: { name: 'diminished fifth', abbr: 'd5' },
}
export type Pair = { lo: number; hi: number }
export function ivl(lo: number, hi: number, override?: { name: string; abbr: string }) {
  const semis = hi - lo, letters = letterNum(hi) - letterNum(lo) + 1
  const w = override ?? IV[semis]
  if (!w) throw new Error(`interval ${semis} not in the Week 2 vocabulary`)
  return { semis, letters, name: w.name, abbr: w.abbr, hex: identityHex(semis), pair: `${noteName(lo)} + ${noteName(hi)}` }
}
export const pairText = (lo: number, hi: number) => `${noteName(lo)} + ${noteName(hi)}`

// ---------------------------------------------------------------- small drawing atoms
const FOOT = 12
export const fs = (c: Ctx, base: number) => Math.max(FOOT, base)
/** Voice glyph. lower = filled dark circle, upper = light square with dark outline. ghost = dashed outline (where a voice started). */
export function glyph(c: Ctx, voice: Voice, x: number, y: number, r: number, ghost = false) {
  if (voice === 'lower') return ghost
    ? `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="3.5 3"/>`
    : `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" stroke="${KEYFACE}" stroke-width="2"/>`
  return ghost
    ? `<rect x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" rx="3" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="3.5 3"/>`
    : `<rect x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" rx="3" fill="${KEYFACE}" stroke="${INK}" stroke-width="3"/>`
}
export const swatch = (c: Ctx, x: number, y: number, w: number, h: number, hex: string) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(4, h / 2)}" fill="${hex}"/>`
export const hline = (x1: number, x2: number, y: number, col = SOFT, w = 1) => `<path d="M${x1} ${y} H${x2}" stroke="${col}" stroke-width="${w}"/>`

/** Figure heading: small kicker + serif title, wrapped to the width. */
export function head(c: Ctx, kicker: string, title: string): Block {
  const k = para(0, 13, kicker.toUpperCase(), c.W, { size: 12, weight: 700, fill: '#8a5a66', sans: true, ls: 1.1, lh: 16 })
  const t = para(0, 13 + k.h + 8, title, c.W - 4, { size: c.narrow ? 19 : 22, weight: 600, fill: LABEL_INK, lh: c.narrow ? 24 : 28 })
  return { w: c.W, h: 13 + k.h + 8 + t.h - 8, body: k.svg + t.svg }
}
export function note(c: Ctx, text: string, o: { size?: number; fill?: string; italic?: boolean; w?: number; x?: number; weight?: number } = {}): Block {
  const p = para(o.x ?? 0, 14, text, o.w ?? c.W, { size: o.size ?? 14, fill: o.fill ?? '#4a3a4a', sans: true, lh: (o.size ?? 14) * 1.4, italic: o.italic, weight: o.weight })
  return { w: c.W, h: p.h + 6, body: p.svg }
}
export const col = (blocks: Block[], gap = 16): Block => {
  let y = 0, body = ''
  for (const b of blocks) { body += `<g transform="translate(0 ${y})">${b.body}</g>`; y += b.h + gap }
  return { w: Math.max(0, ...blocks.map(b => b.w)), h: Math.max(0, y - gap), body }
}
/** Two blocks side by side on the wide variants, stacked on the narrow one. Each block is built by `make(width)`. */
export function twoUp(c: Ctx, make: (w: number) => Block[], gap = 28): Block {
  if (c.narrow) return col(make(c.W), 22)
  const w = (c.W - gap) / 2, [a, b] = make(w)
  return { w: c.W, h: Math.max(a.h, b.h), body: `${a.body}<g transform="translate(${w + gap} 0)">${b.body}</g>` }
}
/** Pad a block's content inside a width (centered) */
export const inset = (b: Block, x: number): Block => ({ w: b.w + 2 * x, h: b.h, body: `<g transform="translate(${x} 0)">${b.body}</g>` })

// ---------------------------------------------------------------- pair badge
export function badge(c: Ctx, W: number, p: Pair, o: { named?: boolean; label?: string; override?: { name: string; abbr: string } } = {}): Block {
  const named = o.named !== false
  if (!named) {
    return { w: W, h: 44, body: `<rect x="0" y="4" width="8" height="36" rx="4" fill="${GRID}"/>` + txt(18, 20, pairText(p.lo, p.hi), { size: 17, weight: 700, fill: INK, sans: true }) + txt(18, 38, o.label ?? 'two notes, not yet named', { size: 13, fill: RESTINK, sans: true }) }
  }
  const v = ivl(p.lo, p.hi, o.override)
  const line1 = `${v.name} · ${v.abbr}`
  const l2 = `${v.pair} · ${v.semis} semitones · ${v.letters} letters`
  const fit = para(18, 20, line1, W - 20, { size: 17, weight: 700, fill: INK, sans: true, lh: 20 })
  const fit2 = para(18, 20 + fit.h + 4, o.label ?? l2, W - 20, { size: 13, fill: '#4a3a4a', sans: true, lh: 17 })
  const h = Math.max(44, 12 + fit.h + fit2.h + 8)
  return { w: W, h, body: `<rect x="0" y="4" width="8" height="${h - 8}" rx="4" fill="${v.hex}"/>` + fit.svg + fit2.svg }
}

// ---------------------------------------------------------------- keyboard
export type KMark = { midi: number; voice: Voice; hex?: string; ghost?: boolean; label?: string }
export type KArrow = { from: number; to: number; voice: Voice; label?: string }
export type KOpts = { start: Letter; whites: number; cMidi: number; marks?: KMark[]; arrows?: KArrow[]; labels?: 'all' | 'c'; maxH?: number; tags?: boolean; hide?: number[]; top?: number }
export const WIN = {
  B3_G4: { start: 'B' as Letter, whites: 6, cMidi: 48 },
  B3_C5: { start: 'B' as Letter, whites: 9, cMidi: 48 },
  C4_C5: { start: 'C' as Letter, whites: 8, cMidi: 60 },
  C4_G4: { start: 'C' as Letter, whites: 5, cMidi: 60 },
  C4_A4: { start: 'C' as Letter, whites: 6, cMidi: 60 },
  C3_C5: { start: 'C' as Letter, whites: 15, cMidi: 48 },
}
export type KB = Block & { xc: (m: number) => number; top: number; kh: number; kw: number; kb: Keyboard; bottom: number; has: (m: number) => boolean }
export function keyboard(c: Ctx, W: number, o: KOpts): KB {
  const kb = buildKeyboard(o.start, o.whites, o.cMidi), pad = 8, kw = (W - 2 * pad) / o.whites
  const kh = Math.max(66, Math.min(Math.round(kw * 3.2), o.maxH ?? 150)), bh = Math.round(kh * 0.62)
  const arrows = o.arrows ?? [], marks = o.marks ?? []
  const top = o.top ?? (arrows.length ? 64 : 16)
  const X = (u: number) => pad + u * kw
  const real = (m: number) => marks.find(k => k.midi === m && !k.ghost)
  const ghost = (m: number) => marks.find(k => k.midi === m && k.ghost)
  const mode = o.labels === 'c' || (o.labels === 'all' && kw < 27) ? 'c' : 'all'
  let g = ''
  for (const k of kb.whites) {
    const m = real(k.midi)
    const fill = m ? (m.hex ? tint(m.hex, c.print ? 0.24 : 0.34, KEYFACE) : '#efe9df') : KEYFACE
    g += `<rect x="${X(k.x) + 0.5}" y="${top}" width="${kw - 1}" height="${kh}" rx="6" fill="${fill}" stroke="${m?.hex ?? (m ? INK : GRID)}" stroke-width="${m ? 3 : 1.4}"/>`
  }
  for (const b of kb.blacks) {
    const m = real(b.midi)
    g += `<rect x="${X(b.x)}" y="${top - 1}" width="${b.w * kw}" height="${bh}" rx="4" fill="${m?.hex ? tint(m.hex, 0.55, '#2a1630') : '#3a2140'}" stroke="${m?.hex ?? '#2a1630'}" stroke-width="${m ? 3 : 1}"/>`
  }
  const lab = Math.max(12, Math.min(15, kw * 0.3))
  const cyOf = (white: boolean) => white ? top + Math.min(bh + 16, kh - 34) : top + bh * 0.62
  const xc = (midi: number) => {
    const w = kb.whites.find(k => k.midi === midi); if (w) return X(w.x + 0.5)
    const b = kb.blacks.find(k => k.midi === midi); if (b) return X(b.x + b.w / 2)
    throw new Error('midi ' + midi + ' is not on this keyboard window')
  }
  const has = (m: number) => kb.whites.some(k => k.midi === m) || kb.blacks.some(k => k.midi === m)
  for (const k of kb.whites) {
    const m = real(k.midi), gh = ghost(k.midi)
    const show = m || gh || mode === 'all' || (mode === 'c' && k.letter === 'C')
    if (show && !o.hide?.includes(k.midi)) g += txt(X(k.x + 0.5), top + kh - 9, noteName(k.midi), { size: m ? Math.max(15, lab) : lab, weight: m ? 700 : 500, anchor: 'middle', fill: m ? INK : RESTINK, sans: true })
  }
  const r = Math.max(8, Math.min(12, kw * 0.26))
  for (const m of marks) {
    const white = kb.whites.some(k => k.midi === m.midi)
    g += glyph(c, m.voice, xc(m.midi), cyOf(white), r, !!m.ghost)
  }
  // arrows (one curved arrow per moving voice, above the keys)
  arrows.forEach(a => {
    const x1 = xc(a.from), x2 = xc(a.to), y0 = top - 8, h = a.voice === 'upper' ? 40 : 22, cx = (x1 + x2) / 2, cy = y0 - 2 * h
    const dx = x2 - cx, dy = y0 - cy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
    g += glyph(c, a.voice, x1, y0, 5.5)
    g += `<path d="M${x1} ${y0} Q${cx} ${cy} ${x2 - ux * 2} ${y0 - uy * 2}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`
    g += `<path d="M${x2} ${y0} l${-ux * 9 - uy * 5} ${-uy * 9 + ux * 5} M${x2} ${y0} l${-ux * 9 + uy * 5} ${-uy * 9 - ux * 5}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`
    if (a.label) g += txt(cx, y0 - h - 6, a.label, { size: 13, weight: 700, anchor: 'middle', fill: INK, sans: true, halo: true })
  })
  let h = top + kh + 8
  // tags for black-key marks (their names do not fit on the key face)
  if (o.tags !== false) {
    for (const m of marks) if (!m.ghost && kb.blacks.some(b => b.midi === m.midi)) {
      const nameStr = noteName(m.midi), x = xc(m.midi), w = nameStr.length * 9 + 14
      g += `<rect x="${x - w / 2}" y="${h}" width="${w}" height="22" rx="11" fill="${KEYFACE}" stroke="${m.hex ?? INK}" stroke-width="2"/>` + txt(x, h + 16, nameStr, { size: 14, weight: 700, anchor: 'middle', fill: INK, sans: true })
      h += 26
    }
  }
  return { w: W, h, body: g, xc, top, kh, kw, kb, bottom: top + kh, has }
}

/** Bracket under a keyboard joining two keys; hue only when `hex` is given (the pair has been named). */
export function bracket(c: Ctx, W: number, x1: number, x2: number, y: number, hex: string | null, label: string): Block {
  const col = hex ?? GRID
  const t = para(0, 0, label, W - 24, { size: 14, weight: 700, fill: INK, sans: true, lh: 18, anchor: 'middle' })
  const cx = Math.min(Math.max((x1 + x2) / 2, 12 + W * 0.18), W - 12 - W * 0.18)
  const lines = para(cx, y + 33, label, Math.min(W - 24, 300), { size: 14, weight: 700, fill: INK, sans: true, lh: 18, anchor: 'middle' })
  void t
  return { w: W, h: y + 33 + lines.h + 2, body: `<path d="M${x1} ${y} v9 H${x2} v-9" fill="none" stroke="${col}" stroke-width="${hex ? 4 : 2.5}" stroke-linecap="round" stroke-linejoin="round"/>` + (hex ? `<circle cx="${(x1 + x2) / 2}" cy="${y + 9}" r="0" fill="${col}"/>` : '') + lines.svg }
}

/** Semitone hop arcs under a keyboard from `lo` up to `hi` (black keys included). Neutral ink by default. */
export function hopRow(c: Ctx, k: KB, lo: number, hi: number, y: number, hex: string | null, totalLabel: string): Block {
  const col = hex ?? WINE
  let g = ''
  for (let m = lo; m < hi; m++) {
    const a = k.xc(m), b = k.xc(m + 1), r = (b - a) / 2
    g += `<path d="M${a} ${y} q${r} ${Math.min(22, r * 1.5)} ${b - a} 0" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`
    g += txt((a + b) / 2, y + Math.min(22, r * 1.5) * 0.5 + 19, String(m - lo + 1), { size: 13, weight: 700, anchor: 'middle', fill: INK, sans: true })
  }
  const a = k.xc(lo), b = k.xc(hi)
  const p = para(Math.min(Math.max((a + b) / 2, c.W * 0.3), c.W * 0.7), y + 56, totalLabel, Math.min(c.W - 16, 340), { size: 14, weight: 700, fill: INK, sans: true, anchor: 'middle', lh: 18 })
  g += `<path d="M${a} ${y + 34} h${b - a}" stroke="${col}" stroke-width="2" stroke-dasharray="4 4"/>` + p.svg
  return { w: c.W, h: y + 56 + p.h, body: g }
}

// ---------------------------------------------------------------- timelines
export type Ev = { midi: number; start: number; dur: number }
export type LaneSpec = { name: string; voice: Voice; events: Ev[] }
export type Band = { from: number; to: number; semis: number }
export const laneGeom = (W: number, total: number) => { const g = W < 520 ? 0 : 136; return { px: g, pw: W - g - 10, X: (t: number) => g + (t / total) * (W - g - 10) } }
export function lanes(c: Ctx, W: number, ls: LaneSpec[], total: number, o: { unit?: string; tick?: number; bands?: Band[]; marks?: { t: number; label: string }[]; short?: boolean } = {}): Block {
  const narrow = W < 520, gutter = narrow ? 0 : 136, px = gutter, pw = W - gutter - 10
  const laneH = 44, gap = narrow ? 30 : 12, top = (o.bands?.length || o.marks?.length) ? 30 : 8
  const X = (t: number) => px + (t / total) * pw
  let g = ''
  const laneY = (i: number) => top + i * (laneH + gap) + (narrow ? 16 : 0)
  // bands (hue belongs to the two-note relationship, drawn across both lanes)
  const yEnd = laneY(ls.length - 1) + laneH
  for (const b of o.bands ?? []) {
    const v = IV[b.semis], hex = identityHex(b.semis)
    g += `<rect x="${X(b.from)}" y="${top - 6}" width="${X(b.to) - X(b.from)}" height="${yEnd - top + 12}" rx="6" fill="${hex}" opacity="${c.print ? 0.2 : 0.22}"/>`
    g += `<path d="M${X(b.from)} ${top - 6} V${yEnd + 6} M${X(b.to)} ${top - 6} V${yEnd + 6}" stroke="${hex}" stroke-width="2.5"/>`
    g += txt((X(b.from) + X(b.to)) / 2, top - 10, `${v.abbr} · ${b.semis}`, { size: 12.5, weight: 700, anchor: 'middle', fill: INK, sans: true, halo: true })
  }
  ls.forEach((l, i) => {
    const y = laneY(i)
    g += narrow ? txt(px + 18, y - 6, l.name, { size: 13, weight: 700, fill: INK, sans: true, halo: true }) : glyph(c, l.voice, 12, y + laneH / 2, 6) + txt(26, y + laneH / 2 + 5, l.name, { size: 14, weight: 700, fill: INK, sans: true })
    if (narrow) g += glyph(c, l.voice, px + 7, y - 11, 5)
    g += `<rect x="${px}" y="${y}" width="${pw}" height="${laneH}" rx="8" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="${SOFT}" stroke-width="1.2"/>`
    const ev = [...l.events].sort((a, b) => a.start - b.start); let t = 0; const rests: [number, number][] = []
    for (const e of ev) { if (e.start - t > 1e-9) rests.push([t, e.start]); t = Math.max(t, e.start + e.dur) }
    if (total - t > 1e-9) rests.push([t, total])
    for (const [a0, b0] of rests) {
      const a = X(a0), b = X(b0)
      g += `<rect x="${a + 2}" y="${y + 7}" width="${Math.max(2, b - a - 4)}" height="${laneH - 14}" rx="6" fill="none" stroke="${GRID}" stroke-width="1.4" stroke-dasharray="5 4"/>`
      if (b - a > 44) g += txt((a + b) / 2, y + laneH / 2 + 4.5, 'rest', { size: 12, anchor: 'middle', fill: RESTINK, italic: true, sans: true })
    }
    for (const e of l.events) {
      const a = X(e.start), b = X(e.start + e.dur)
      g += `<rect x="${a}" y="${y + 6}" width="${b - a}" height="${laneH - 12}" rx="7" fill="${l.voice === 'lower' ? '#ece5d9' : KEYFACE}" stroke="${INK}" stroke-width="${l.voice === 'lower' ? 1.8 : 2.6}"/>`
      if (b - a > 40) g += glyph(c, l.voice, a + 13, y + laneH / 2, 4.6) + txt((a + b) / 2 + 6, y + laneH / 2 + 6, noteName(e.midi), { size: 16, weight: 700, anchor: 'middle', fill: INK, sans: true })
      else if (b - a > 20) g += txt((a + b) / 2, y + laneH / 2 + 6, noteName(e.midi), { size: 14, weight: 700, anchor: 'middle', fill: INK, sans: true })
    }
  })
  for (const m of o.marks ?? []) {
    g += `<path d="M${X(m.t)} ${top - 2} V${yEnd + 8}" stroke="${INK}" stroke-width="2" stroke-dasharray="3 4"/>` + txt(X(m.t), top - 14, m.label, { size: 12.5, weight: 700, anchor: 'middle', fill: INK, sans: true, halo: true })
  }
  const ay = yEnd + 14
  g += `<path d="M${px} ${ay} h${pw}" stroke="${GRID}" stroke-width="1.5"/>`
  const tk = o.tick ?? (total > 40 ? 5 : total > 20 ? 6 : 1)
  for (let t = 0; t <= total + 1e-9; t += tk) g += `<path d="M${X(t)} ${ay} v6" stroke="${GRID}" stroke-width="1.5"/>` + txt(X(t), ay + 22, String(+t.toFixed(1)), { size: 12, anchor: 'middle', fill: RESTINK, sans: true, halo: true })
  g += txt(px + pw, ay + 40, o.unit ?? 'seconds', { size: 12, anchor: 'end', fill: RESTINK, italic: true, sans: true })
  return { w: W, h: ay + 46, body: g }
}

// ---------------------------------------------------------------- stage path (pitch rows × stages)
export function stagePath(c: Ctx, W: number, stages: [number, number][], o: { hues?: (number | null)[]; labels?: string[]; caption?: boolean } = {}): Block {
  const all = stages.flat(), lo = Math.min(...all), hi = Math.max(...all)
  const rowH = 22, gx = c.narrow ? 54 : 70, topPad = 20
  const Y = (m: number) => topPad + (hi - m) * rowH + rowH / 2
  const n = stages.length, X = (i: number) => gx + (n === 1 ? (W - gx) / 2 : 14 + (i * (W - gx - 56)) / (n - 1))
  let g = ''
  for (let m = lo; m <= hi; m++) {
    const used = stages.some(s => s.includes(m))
    g += hline(gx - 6, W - 6, Y(m), used ? '#cdbac3' : SOFT, 1)
    if (used) g += txt(gx - 12, Y(m) + 4.5, noteName(m), { size: 13, weight: 700, anchor: 'end', fill: INK, sans: true })
  }
  for (const v of [0, 1] as const) {
    const pts = stages.map((s, i) => `${X(i)} ${Y(s[v])}`)
    g += `<path d="M${pts.join(' L')}" fill="none" stroke="${INK}" stroke-width="${v === 0 ? 3 : 2.4}" ${v === 1 ? 'stroke-dasharray="1 0"' : ''} stroke-linejoin="round" opacity=".55"/>`
  }
  stages.forEach((s, i) => {
    const hx = o.hues?.[i]
    if (hx != null) g += `<path d="M${X(i)} ${Y(s[0])} V${Y(s[1])}" stroke="${identityHex(hx)}" stroke-width="9" stroke-linecap="round" opacity=".85"/>`
    g += glyph(c, 'lower', X(i), Y(s[0]), 8) + glyph(c, 'upper', X(i), Y(s[1]), 8)
    g += txt(X(i), topPad + (hi - lo + 1) * rowH + 22, `stage ${i + 1}`, { size: 12.5, weight: 700, anchor: 'middle', fill: RESTINK, sans: true })
    if (o.labels?.[i]) g += txt(X(i), topPad + (hi - lo + 1) * rowH + 40, o.labels[i], { size: 13, weight: 700, anchor: 'middle', fill: INK, sans: true })
  })
  return { w: W, h: topPad + (hi - lo + 1) * rowH + (o.labels ? 48 : 30), body: g }
}

// ---------------------------------------------------------------- move figure (the workhorse for Lesson 2A/2B)
export type Move = { from: [number, number]; to: [number, number]; hues?: { from?: number; to?: number }; win?: Pick<KOpts, 'start' | 'whites' | 'cMidi'>; arrowLabels?: boolean; overrideTo?: { name: string; abbr: string } }
const shift = (d: number) => d === 0 ? 'held' : `${d > 0 ? 'up' : 'down'} ${Math.abs(d)}`
/** Keyboard with start pair (dashed shapes) and end pair (solid shapes; hue only if `hues.to` is set), one arrow per moving voice. */
export function moveFigure(c: Ctx, W: number, m: Move): Block {
  const win = m.win ?? WIN.B3_G4
  const marks: KMark[] = []
  const arrows: KArrow[] = []
  ;(['lower', 'upper'] as const).forEach((v, i) => {
    const a = m.from[i], b = m.to[i]
    if (a !== b) { marks.push({ midi: a, voice: v, ghost: true }); arrows.push({ from: a, to: b, voice: v, label: m.arrowLabels === false ? undefined : shift(b - a) }) }
    marks.push({ midi: b, voice: v, hex: m.hues?.to != null ? identityHex(m.hues.to) : undefined })
  })
  // lower voice held shapes: mark both notes at the end; held voice gets the label "held" under the keys
  const k = keyboard(c, W, { ...win, marks, arrows, labels: 'all' })
  const held = (['lower', 'upper'] as const).filter((_, i) => m.from[i] === m.to[i])
  let h = k.h, g = k.body
  const sub = held.length === 1 ? `${held[0]} voice held` : ''
  if (sub) { g += txt(c.W > W ? 8 : 8, h + 14, sub, { size: 13, italic: true, fill: RESTINK, sans: true }); h += 22 }
  return { w: W, h, body: g }
}

/** Standalone page-level frame: kicker/title/body/caption + a minimum bottom margin. Returns svg parts for wrap(). */
export const frame = (c: Ctx, blocks: Block[], gap = 16) => { const b = col(blocks, gap); return { w: c.W, h: b.h + 16, body: `<g transform="translate(8 6)">${b.body}</g>`, innerW: c.W - 16 } }
export const W_IN = (c: Ctx) => c.W - 16
void BLACK_WIDTH
