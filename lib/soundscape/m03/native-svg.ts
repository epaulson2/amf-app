// M03 native static figures. Pure string builders: deterministic SVG, no React, no JS in the output, no audio, no interaction.
// Geometry comes from lib/soundscape/m02/keyboard-geometry.ts (unit-tested). Notes/times come from the lesson fixtures at build time.
import { buildKeyboard, BLACK_WIDTH, nameOf, type Keyboard, type Letter } from '../m02/keyboard-geometry'

export type Tone = 'lower' | 'upper' | 'shared' | 'home' | 'plain'
export type Mark = { tone: Tone; label?: string }
export type Ctx = { uid: string; print: boolean }
export type Part = { w: number; h: number; body: string; xc?: (midi: number) => number; keyTop?: number; keyBottom?: number }

export const KW = 52, KH = 176, BH = 106, PAD = 6
export const INK = '#3e2241', WINE = '#6d326e', MUTED = '#786a75', AMBER = '#c8811f', TEAL = '#3f9b92', PLUM = '#7a4a8c'
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
export const nm = (midi: number) => nameOf(midi) as string

export function txt(x: number, y: number, s: string, o: { size?: number; weight?: number | string; anchor?: 'start' | 'middle' | 'end'; fill?: string; italic?: boolean; sans?: boolean; ls?: number; halo?: boolean } = {}) {
  const f = o.sans ? "ui-sans-serif, system-ui, 'Segoe UI', sans-serif" : "Georgia, 'Times New Roman', serif"
  return `<text x="${x}" y="${y}" font-family="${f}" font-size="${o.size ?? 16}" font-weight="${o.weight ?? 400}" text-anchor="${o.anchor ?? 'start'}" fill="${o.fill ?? INK}"${o.italic ? ' font-style="italic"' : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.halo ? ' stroke="#f9f5ed" stroke-width="3.4" stroke-linejoin="round" paint-order="stroke fill"' : ''}>${esc(s)}</text>`
}
/** Greedy word-wrap into <text> lines (monospace-free estimate: 0.5em average glyph). */
export function para(x: number, y: number, s: string, maxW: number, o: Parameters<typeof txt>[3] & { lh?: number } = {}) {
  const size = o.size ?? 15, per = Math.max(8, Math.floor(maxW / (size * 0.58))), words = s.split(/\s+/), lines: string[] = []
  let cur = ''
  for (const w of words) { if ((cur + ' ' + w).trim().length > per) { lines.push(cur); cur = w } else cur = (cur + ' ' + w).trim() }
  if (cur) lines.push(cur)
  return { svg: lines.map((l, i) => txt(x, y + i * (o.lh ?? size * 1.45), l, { halo: true, ...o })).join(''), h: lines.length * (o.lh ?? size * 1.45) }
}

export function defs(c: Ctx) {
  if (c.print) return ''
  const u = c.uid
  return `<defs>
<linearGradient id="${u}-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset=".78" stop-color="#f7efe2"/><stop offset="1" stop-color="#eadfcd"/></linearGradient>
<linearGradient id="${u}-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2a4d"/><stop offset=".85" stop-color="#2a1630"/><stop offset="1" stop-color="#3a2140"/></linearGradient>
<radialGradient id="${u}-home" cx=".5" cy=".82" r=".75"><stop offset="0" stop-color="#ffd98a"/><stop offset=".55" stop-color="#f6b94f"/><stop offset="1" stop-color="#f3a53a" stop-opacity=".92"/></radialGradient>
<radialGradient id="${u}-lower" cx=".5" cy=".82" r=".75"><stop offset="0" stop-color="#ffe0a6"/><stop offset="1" stop-color="#f3b25a"/></radialGradient>
<radialGradient id="${u}-upper" cx=".5" cy=".82" r=".75"><stop offset="0" stop-color="#bfe7e2"/><stop offset="1" stop-color="#8fcdc6"/></radialGradient>
<linearGradient id="${u}-shared" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6c46a"/><stop offset=".5" stop-color="#efe6c4"/><stop offset="1" stop-color="#8fcdc6"/></linearGradient>
<filter id="${u}-glow" x="-40%" y="-20%" width="180%" height="150%"><feGaussianBlur stdDeviation="9"/></filter>
</defs>`
}
const toneFill = (c: Ctx, t: Tone) => c.print ? (t === 'plain' ? '#fff' : '#e8e0ea') : `url(#${c.uid}-${t})`
const toneStroke = (t: Tone) => t === 'upper' ? TEAL : t === 'shared' ? PLUM : AMBER

export type KbOpts = { topPad?: number; start?: Letter; whites: number; cMidi?: number; marks?: Record<number, Mark>; letters?: 'all' | 'c' | 'none'; groups?: boolean; scale?: number; labelNaturals?: boolean }
/** One keyboard drawing at (x0,y0). Returns SVG plus a map from MIDI to key-centre x for hop rulers. */
export function keyboard(c: Ctx, o: KbOpts, x0 = 0, y0 = 0): Part & { kb: Keyboard } {
  const kb = buildKeyboard(o.start ?? 'C', o.whites, o.cMidi ?? 60), s = o.scale ?? 1, marks = o.marks ?? {}, TOP = o.groups ? 38 : (o.topPad ?? 8)
  const xw = (k: number) => x0 + (PAD + k * KW) * s
  let g = ''
  if (o.groups) kb.groups.forEach(gr => {
    const bs = gr.blacks, a = xw(bs[0].x), b = xw(bs[bs.length - 1].x + BLACK_WIDTH)
    g += `<path d="M${a} ${y0 + (TOP - 8) * s} v${-8 * s} h${b - a} v${8 * s}" fill="none" stroke="#a3778f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` + txt((a + b) / 2, y0 + (TOP - 22) * s, String(gr.size), { size: 19 * s, weight: 700, anchor: 'middle', fill: WINE })
  })
  const top = y0 + TOP * s
  for (const k of kb.whites) {
    const m = marks[k.midi], t: Tone = m?.tone ?? 'plain'
    if (m && !c.print) g += `<rect x="${xw(k.x) + 2 * s}" y="${top + (KH - 70) * s}" width="${(KW - 4) * s}" height="${86 * s}" rx="${22 * s}" fill="${t === 'upper' ? '#8fcdc6' : t === 'shared' ? '#c9a6d8' : '#f6b94f'}" opacity=".5" filter="url(#${c.uid}-glow)"/>`
    g += `<rect x="${xw(k.x) + s}" y="${top}" width="${(KW - 2) * s}" height="${KH * s}" rx="${7 * s}" fill="${m ? toneFill(c, t) : (c.print ? '#fff' : `url(#${c.uid}-w)`)}" stroke="${m ? toneStroke(t) : '#bfa8b3'}" stroke-width="${(m ? 2.6 : 1.4) * s}"/>`
  }
  for (const b of kb.blacks) {
    const m = marks[b.midi], t: Tone | null = m ? m.tone : null
    const fill = m ? (c.print ? '#e8e0ea' : `url(#${c.uid}-${t})`) : (c.print ? '#4a2a4d' : `url(#${c.uid}-b)`)
    g += `<rect x="${xw(b.x)}" y="${top - s}" width="${b.w * KW * s}" height="${BH * s}" rx="${5 * s}" fill="${fill}"${m ? ` stroke="${toneStroke(t!)}" stroke-width="${3 * s}"` : ''}/>`
    if (m?.label) g += txt(xw(b.x + b.w / 2), top + (BH - 12) * s, m.label, { size: 15 * s, weight: 700, anchor: 'middle', fill: '#3e2241' })
  }
  for (const k of kb.whites) {
    const m = marks[k.midi], lab = m?.label ?? (o.letters === 'all' ? k.letter : (o.letters === 'c' && k.letter === 'C' ? 'C' : ''))
    if (!lab) continue
    g += txt(xw(k.x + .5), top + (KH - 14) * s, lab, { size: (m ? 26 : 18) * s, weight: m ? 700 : 500, anchor: 'middle', fill: m ? '#4c2346' : '#8a6f85' })
  }
  const xc = (midi: number) => {
    const w = kb.whites.find(k => k.midi === midi); if (w) return xw(w.x + .5)
    const b = kb.blacks.find(k => k.midi === midi); if (b) return xw(b.x + b.w / 2)
    throw new Error('midi ' + midi + ' not on this keyboard window')
  }
  const w = (kb.width * KW + PAD * 2) * s
  return { kb, w, h: TOP * s + KH * s + 10 * s, body: g, xc, keyTop: top, keyBottom: top + KH * s }
}

/** Semitone hops under a keyboard: one arc per adjacent chromatic key between `from` and `to`, numbered 1..n, with a total label. */
export function hops(c: Ctx, kb: Part & { kb: Keyboard }, from: number, to: number, y: number, o: { size?: number; tone?: string; total?: string } = {}) {
  const lo = Math.min(from, to), hi = Math.max(from, to); let g = ''
  const col = o.tone ?? WINE
  for (let m = lo; m < hi; m++) {
    const a = kb.xc!(m), b = kb.xc!(m + 1), mid = (a + b) / 2, r = (b - a) / 2
    g += `<path d="M${a} ${y} q${r} ${r * 1.7} ${b - a} 0" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>` + `<path d="M${b - 5} ${y + 2} l5 -7 l2 8" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    g += txt(mid, y + r * 1.7 * 0.5 + 22, String(m - lo + 1), { size: o.size ?? 15, weight: 700, anchor: 'middle', fill: col, sans: true })
  }
  const a = kb.xc!(lo), b = kb.xc!(hi), tot = hi - lo
  g += `<path d="M${a} ${y + 54} h${b - a}" stroke="${col}" stroke-width="1.4" stroke-dasharray="4 4"/>` + txt(Math.min(Math.max((a + b) / 2, 6 + (o.total ?? 'xxxxxxxxxxxx').length * 4.7), kb.w - 6 - (o.total ?? 'xxxxxxxxxxxx').length * 4.7), y + 76, o.total ?? `${tot} semitone${tot === 1 ? '' : 's'}`, { size: 17, weight: 700, anchor: 'middle', fill: col })
  return { svg: g, h: 84 }
}

export type Ev = { midi: number; start: number; dur: number }
export type Lane = { name: string; tone: 'lower' | 'upper'; events: Ev[]; rests?: string }
/** Time strip: one lane per voice, bars to scale, note letters on bars, tick every `tick` seconds, optional "rests" note in the empty parts. */
export function lanes(c: Ctx, ls: Lane[], total: number, o: { w?: number; tick?: number; x0?: number; y0?: number; names?: boolean } = {}): Part {
  const w = o.w ?? 640, x0 = (o.x0 ?? 0) + 118, pw = w - 118 - 14, laneH = 46, gap = 12, y0 = (o.y0 ?? 0) + 8, tk = o.tick ?? (total > 20 ? 6 : total > 8 ? 2 : 1)
  const X = (t: number) => x0 + (t / total) * pw
  let g = ''
  ls.forEach((l, i) => {
    const y = y0 + i * (laneH + gap)
    g += `<rect x="${x0}" y="${y}" width="${pw}" height="${laneH}" rx="8" fill="${c.print ? '#fff' : '#fffaf3'}" stroke="#e5d6dc" stroke-width="1"/>` + txt((o.x0 ?? 0) + 6, y + laneH / 2 + 5, l.name, { size: 13.5, weight: 600, fill: l.tone === 'lower' ? '#7a4a12' : '#1f5c56', sans: true, halo: true })
    for (const e of l.events) {
      const a = X(e.start), b = X(e.start + e.dur)
      g += `<rect x="${a}" y="${y + 6}" width="${b - a}" height="${laneH - 12}" rx="7" fill="${c.print ? (l.tone === 'lower' ? '#f1dfc0' : '#d5ece9') : (l.tone === 'lower' ? '#f3b25a' : '#8fcdc6')}" stroke="${l.tone === 'lower' ? AMBER : TEAL}" stroke-width="1.6"/>`
      if (b - a > 22) g += txt((a + b) / 2, y + laneH / 2 + 7, nm(e.midi), { size: 19, weight: 700, anchor: 'middle', fill: '#4c2346' })
    }
    if (l.rests) {   // dashed outline + label in every silent gap of this lane (gaps >= 0.9 s, including before the first and after the last event)
      const ev = [...l.events].sort((a, b) => a.start - b.start); let t = 0; const gaps: [number, number][] = []
      for (const e of ev) { if (e.start - t >= 0.9) gaps.push([t, e.start]); t = Math.max(t, e.start + e.dur) }
      if (total - t >= 0.9) gaps.push([t, total])
      for (const [a0, b0] of gaps) { const a = X(a0), b = X(b0); g += `<rect x="${a + 2}" y="${y + 6}" width="${b - a - 4}" height="${laneH - 12}" rx="7" fill="none" stroke="#a3778f" stroke-width="1.3" stroke-dasharray="5 4"/>` + (b - a > 40 ? txt((a + b) / 2, y + laneH / 2 + 5, l.rests, { size: 12.5, anchor: 'middle', fill: MUTED, italic: true, sans: true }) : '') }
    }
  })
  const ay = y0 + ls.length * (laneH + gap) + 4
  g += `<path d="M${x0} ${ay} h${pw}" stroke="#a3778f" stroke-width="1.4"/>`
  for (let t = 0; t <= total + 1e-9; t += tk) g += `<path d="M${X(t)} ${ay} v6" stroke="#a3778f"/>` + txt(X(t), ay + 22, `${+t.toFixed(1)}`, { size: 12, anchor: 'middle', fill: MUTED, sans: true, halo: true })
  g += txt(x0 + pw, ay + 40, 'seconds', { size: 12, anchor: 'end', fill: MUTED, sans: true, italic: true, halo: true })
  return { w, h: ay + 48 - (o.y0 ?? 0), body: g }
}

/** Wrap parts into a standalone, accessible SVG document. */
export function wrap(id: string, title: string, desc: string, w: number, h: number, body: string, c: Ctx) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(w)} ${Math.ceil(h)}" width="${Math.ceil(w)}" height="${Math.ceil(h)}" role="img" aria-labelledby="${id}-t ${id}-d">` +
    `<title id="${id}-t">${esc(title)}</title><desc id="${id}-d">${esc(desc)}</desc>${defs(c)}${c.print ? '<rect width="100%" height="100%" fill="#fff"/>' : ''}${body}</svg>\n`
}
export const stack = (parts: { body: string; h: number }[], gap = 18) => { let y = 0, body = ''; for (const p of parts) { body += `<g transform="translate(0 ${y})">${p.body}</g>`; y += p.h + gap } return { body, h: y - gap } }
export const heading = (x: number, y: number, s: string, maxW = 1e9) => txt(x, y, s, { size: Math.min(13, Math.max(8, maxW / (s.length * 0.82))), weight: 700, fill: '#a67664', sans: true, ls: 1.2, halo: true })
