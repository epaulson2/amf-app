// Shared build core for M05 native figures. Run via: node --experimental-strip-types --no-warnings --import ./tests/register.mjs docs/m05/tools/build_native.mts
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { wrap, keyboard, hops, heading, para, txt, stack, PAD, WINE, INK, MUTED, type Ctx, type KbOpts, type Mark } from '../../../lib/soundscape/m03/native-svg'
export * from '../../../lib/soundscape/m03/native-svg'

export const ROOT = '/home/elderle/amf-work/amf-ajourne-m05/'
export const OUT = ROOT + 'public/soundscape/m05/native/'
const REG = ROOT + 'docs/m05/native_registry.json'
export type Built = { title: string; desc: string; w: number; h: number; body: string }
export type Meta = { group: string; ids?: string[]; art?: string; kind?: string; source: string; teach?: string; variantOf?: string }
const reg: Record<string, any> = existsSync(REG) ? JSON.parse(readFileSync(REG, 'utf8')) : {}
const sha = (b: string) => createHash('sha256').update(b).digest('hex')

export function svg(id: string, meta: Meta, build: (c: Ctx) => Built) {
  const files: string[] = []; let desc = '', title = '', size: number[] = []
  for (const print of [false, true]) {
    const c: Ctx = { uid: id.replace(/\W/g, '') + (print ? 'p' : ''), print }, b = build(c)
    const s = wrap(id, b.title, b.desc, b.w, b.h, b.body, c), f = `${id}${print ? '.print' : ''}.svg`
    writeFileSync(OUT + f, s); files.push('public/soundscape/m05/native/' + f)
    if (!print) { desc = b.desc; title = b.title; size = [Math.ceil(b.w), Math.ceil(b.h)] }
    reg[id] = { ...(reg[id] ?? {}), sha256_screen: print ? reg[id]?.sha256_screen : sha(s) }
  }
  reg[id] = { id, type: 'NATIVE-SVG', title, desc, size, files, ...meta, status: 'NATIVE READY' }
  console.log('svg ', id.padEnd(14), size.join('x'))
}
export function html(id: string, meta: Meta, title: string, bodyHtml: string, desc: string) {
  const css = `:root{--ink:#3e2241;--wine:#6d326e;--paper:#f9f5ed}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:#5c465b;font:17px/1.65 Georgia,'Times New Roman',serif}main{max-width:760px;margin:0 auto;padding:28px 20px 48px}h1{font-weight:400;font-size:34px;line-height:1.12;color:#4c2748;letter-spacing:-.02em;margin:0 0 6px}h2{font-size:19px;color:#4c2748;margin:26px 0 6px}.eyebrow{font:700 11px ui-sans-serif,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a3778f;margin:0}table{border-collapse:collapse;width:100%;font:14px/1.4 ui-sans-serif,system-ui,sans-serif}th,td{border:1px solid #d9c9d1;padding:7px 9px;text-align:left}th{background:#f0e4ea;color:#4c2748}.card{border-left:3px solid #e9ae7c;background:linear-gradient(90deg,rgba(254,232,204,.45),rgba(254,232,204,0));padding:12px 16px;margin:14px 0}ol,ul{padding-left:1.2em}li{margin:.35em 0}a{color:#6d326e}small,.muted{color:#786a75;font:13.5px/1.5 ui-sans-serif,system-ui,sans-serif}img{max-width:100%;height:auto}@media print{body{background:#fff;font-size:12pt}.noprint{display:none}main{padding:0}}`
  const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${css}</style></head><body><main>${bodyHtml}</main></body></html>\n`
  writeFileSync(OUT + id + '.html', doc)
  reg[id] = { id, type: 'NATIVE-HTML', title, desc, files: ['public/soundscape/m05/native/' + id + '.html'], ...meta, status: 'NATIVE READY', sha256: sha(doc) }
  console.log('html', id.padEnd(14))
}
export const registry = reg
export const save = () => writeFileSync(REG, JSON.stringify(reg, null, 1))

/** One labelled keyboard figure: optional heading, keyboard, optional semitone hops, optional caption. */
export function fig(c: Ctx, o: { head?: string; kb: KbOpts; hop?: [number, number]; hopTone?: string; hopTotal?: string; caption?: string; captionGap?: number; extra?: (k: ReturnType<typeof keyboard>) => string }) {
  const hh = o.head ? 26 : 0, k = keyboard(c, o.kb, 0, hh)
  let body = (o.head ? heading(PAD, 18, o.head.toUpperCase(), k.w - 2 * PAD) : '') + k.body, h = hh + k.h
  if (o.hop) { const y = k.keyBottom! + 14, p = hops(c, k, o.hop[0], o.hop[1], y, { tone: o.hopTone, total: o.hopTotal }); body += p.svg; h = y + p.h }
  if (o.extra) body += o.extra(k)
  if (o.caption) { const gap = o.captionGap ?? 22, p = para(PAD, h + gap, o.caption, k.w - 2 * PAD, { size: 15, fill: '#5c465b' }); body += p.svg; h += gap + p.h }
  return { w: k.w, h: h + 8, body }
}
/** A row of mini keyboards, one per stage, for two-note (lower+upper) sequences. */
export function pairs(c: Ctx, stages: { lower: number; upper: number; label: string }[], o: { scale?: number; gapX?: number; head?: string } = {}) {
  const s = o.scale ?? .5, gx = o.gapX ?? 44, parts = stages.map((st, i) => {
    const marks: Record<number, Mark> = { [st.lower]: { tone: 'lower', label: undefined }, [st.upper]: { tone: 'upper' } }
    const k = keyboard(c, { start: 'B', whites: 5, cMidi: 48, marks: { [st.lower]: { tone: 'lower', label: nmm(st.lower) }, [st.upper]: { tone: 'upper', label: nmm(st.upper) } }, scale: s }, 0, 30)
    return { k, st, i }
  })
  const kw = parts[0].k.w; let x = 0, body = ''
  if (o.head) body += heading(0, 14, o.head.toUpperCase())
  for (const { k, st, i } of parts) {
    body += `<g transform="translate(${x} 0)">${k.body}${txt(kw / 2, 30 + k.h + 24, st.label, { size: Math.min(17, (kw * 1.75) / Math.max(1, st.label.length)), weight: 700, anchor: 'middle', fill: INK })}${txt(kw / 2, 26, String(i + 1), { size: 13, weight: 700, anchor: 'middle', fill: '#a67664', sans: true })}</g>`
    if (i < parts.length - 1) body += txt(x + kw + gx / 2, 30 + k.h / 2 + 8, '→', { size: 26, anchor: 'middle', fill: WINE })
    x += kw + gx
  }
  return { w: x - gx, h: 30 + parts[0].k.h + 40, body }
}
import { nameOf } from '../../../lib/soundscape/m02/keyboard-geometry'
export const nmm = (m: number) => nameOf(m) as string
export { stack, para, txt, heading, INK, WINE, MUTED, PAD, keyboard, hops }
export type { Ctx, Mark, KbOpts }
