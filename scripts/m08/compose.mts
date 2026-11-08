// M08 composer: model art (white -> true alpha) + exact M07 native figure, one transparent foreground per variant. Usage: compose.mts ID...|all
import sharp from 'sharp'
import fs from 'node:fs'
import { ASSETS } from '../../lib/soundscape/m07/render.ts'
import { ctxFor, col, note, PAPER, type Variant } from '../../lib/soundscape/m07/kit.ts'
import { wrap } from '../../lib/soundscape/m03/native-svg.ts'
const D = 'docs/m08'
const man = Object.fromEntries(JSON.parse(fs.readFileSync(`${D}/manifest.in.json`, 'utf8')).map((o: any) => [o.id, o]))
const ids = process.argv.slice(2).filter(a => a !== 'all'); const all = process.argv.includes('all')
const todo = ASSETS.filter(a => (all || ids.includes(a.id)) && fs.existsSync(`${D}/art/${a.id}.raw.png`))
type Art = { buf: Buffer; W: number; H: number; rect: [number, number, number, number] }
async function loadArt(id: string): Promise<Art> {
  const f = `${D}/art/${id}.alpha.png`, meta = `${D}/art/${id}.rect.json`
  const { data, info } = await sharp(`${D}/art/${id}.raw.png`).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const sc = 1200 / info.width, W = 1200, H = Math.round(info.height * sc)
  const out = Buffer.alloc(info.width * info.height * 4), floor = 0.035
  for (let i = 0, p = 0; i < info.width * info.height; i++, p += 4) {
    const m = Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]); let a = (255 - m) / 255; a = a < floor ? 0 : Math.min(1, ((a - floor) / (1 - floor)) * 1.08)
    if (!a) continue
    for (let c = 0; c < 3; c++) out[p + c] = Math.max(0, Math.min(255, Math.round((data[i * 3 + c] - 255 * (1 - a)) / a))); out[p + 3] = Math.round(a * 255)
  }
  const png = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).resize(W, H).png().toBuffer()
  fs.writeFileSync(f, await sharp(png).png({ compressionLevel: 9 }).toBuffer())
  // clearing: largest empty blob via chamfer distance transform at 1/4 res, then grow a rectangle from its centre
  const B = Math.round(info.width / 300), w = Math.floor(info.width / B), h = Math.floor(info.height / B)
  const mnA = new Uint8Array(w * h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let mn = 255; for (let dy = 0; dy < B; dy++) for (let dx = 0; dx < B; dx++) { const i = ((y * B + dy) * info.width + x * B + dx) * 3; mn = Math.min(mn, data[i], data[i + 1], data[i + 2]) } mnA[y * w + x] = mn }
  const Q = B * (1200 / info.width)  // block -> 1200-space px
  let x0 = 0, y0 = 0, x1 = 0, y1 = 0, best = 0
  for (const EMP of [210, 195, 180, 165]) {
    const empty = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) empty[i] = mnA[i] >= EMP ? 1 : 0
    const outside = new Uint8Array(w * h), st: number[] = []
    for (let x = 0; x < w; x++) { st.push(x, (h - 1) * w + x) } for (let y = 0; y < h; y++) { st.push(y * w, y * w + w - 1) }
    while (st.length) { const i = st.pop()!; if (outside[i] || !empty[i]) continue; outside[i] = 1; const x = i % w, y = (i / w) | 0; if (x > 0) st.push(i - 1); if (x < w - 1) st.push(i + 1); if (y > 0) st.push(i - w); if (y < h - 1) st.push(i + w) }
    const dt = new Float32Array(w * h); for (let i = 0; i < w * h; i++) dt[i] = empty[i] && !outside[i] ? 1e3 : 0
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x; dt[i] = Math.min(dt[i], dt[i - 1] + 1, dt[i - w] + 1, dt[i - w - 1] + 1.4, dt[i - w + 1] + 1.4) }
    for (let y = h - 2; y > 0; y--) for (let x = w - 2; x > 0; x--) { const i = y * w + x; dt[i] = Math.min(dt[i], dt[i + 1] + 1, dt[i + w] + 1, dt[i + w + 1] + 1.4, dt[i + w - 1] + 1.4) }
    let bi = 0; best = -1; for (let i = 0; i < w * h; i++) if (dt[i] > best) { best = dt[i]; bi = i }
    x0 = bi % w; y0 = (bi / w) | 0; x1 = x0; y1 = y0
    const ok = (x: number, y: number) => empty[y * w + x] && !outside[y * w + x]
    const side = (f: (k: number) => boolean, a: number, b: number) => { for (let k = a; k <= b; k++) if (!f(k)) return false; return true }
    let grew = true
    while (grew) { grew = false
      if (x0 > 1 && side(y => ok(x0 - 1, y), y0, y1)) { x0--; grew = true }
      if (x1 < w - 2 && side(y => ok(x1 + 1, y), y0, y1)) { x1++; grew = true }
      if (y0 > 1 && side(x => ok(x, y0 - 1), x0, x1)) { y0--; grew = true }
      if (y1 < h - 2 && side(x => ok(x, y1 + 1), x0, x1)) { y1++; grew = true } }
    // phase 2: push each side outward through soft glow until it meets the strong wall (dark ornament)
    const darkFrac = (f: (k: number) => number, a: number, b: number) => { let d = 0; for (let k = a; k <= b; k++) if (f(k) < 170) d++; return d / (b - a + 1) }
    grew = true
    while (grew) { grew = false
      if (x0 > 2 && darkFrac(y => mnA[y * w + x0 - 1], y0, y1) < 0.03) { x0--; grew = true }
      if (x1 < w - 3 && darkFrac(y => mnA[y * w + x1 + 1], y0, y1) < 0.03) { x1++; grew = true }
      if (y0 > 2 && darkFrac(x => mnA[(y0 - 1) * w + x], x0, x1) < 0.03) { y0--; grew = true }
      if (y1 < h - 3 && darkFrac(x => mnA[(y1 + 1) * w + x], x0, x1) < 0.03) { y1++; grew = true } }
    if ((x1 - x0) / w >= 0.4 && (y1 - y0) / h >= 0.4) break
  }
  const inset = 2  // shrink so the rim stays outside the figure
  const rect: [number, number, number, number] = [Math.max(8, Math.round((x0 + inset) * Q)), Math.max(8, Math.round((y0 + inset) * Q)), Math.min(W - 8, Math.round((x1 - inset + 1) * Q)), Math.min(H - 8, Math.round((y1 - inset + 1) * Q))]
  fs.writeFileSync(meta, JSON.stringify({ rect, W, H, dtMax: best * Q, clearW: +((rect[2]-rect[0])/W).toFixed(2), clearH: +((rect[3]-rect[1])/H).toFixed(2) }))
  return { buf: png, W, H, rect }
}
// native figure: M07 builder + "How to read" prose, no opaque card, no page fill
function native(a: (typeof ASSETS)[number], v: Variant) {
  const uid = `m08-${a.id.toLowerCase()}-${v}`, c = ctxFor(v, uid), built = a.build(c)
  const blocks = [...built.blocks, note(c, 'How to read this graphic: ' + a.howToRead, { size: c.narrow ? 13 : 14.5, fill: '#4a3a4a', w: c.W - 16 })]
  const body = col(blocks, built.gap ?? 16), w = c.W, h = Math.ceil(body.h + 20)
  let svg = wrap(uid, built.title, built.desc, w, h, `<g transform="translate(8 8)">${body.body}</g>`, { uid, print: c.print })
  svg = svg.replace('<rect width="100%" height="100%" fill="#fff"/>', '')
  svg = svg.replace(/<rect ([^>]*?)fill="#fffaf3"([^>]*?)\/>/g, (_m, p1, p2) => `<rect ${p1}fill="none"${p2.replace(/stroke="[^"]*"/, 'stroke="none"')}/>`)
  const inner = svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>')).replace(/<title[\s\S]*?<\/title>|<desc[\s\S]*?<\/desc>/g, '')
  return { inner, w, h, title: built.title, desc: built.desc, c }
}
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// mirror-tiled band: resize when the needed length is close to the source length, otherwise tile the band with alternating flips (no stretch streaks)
async function band(img: Buffer, sw: number, sh: number, k: number, horizontal: boolean, L: number) {
  const tw = horizontal ? Math.max(1, Math.round(sw * k)) : Math.max(1, Math.round(sw * k)), th = Math.max(1, Math.round(sh * k))
  const unit = await sharp(img).resize(tw, th, { fit: 'fill' }).png().toBuffer()
  const len = horizontal ? tw : th
  if (L / len > 0.8 && L / len < 1.25) return sharp(unit).resize(horizontal ? L : tw, horizontal ? th : L, { fit: 'fill' }).png().toBuffer()
  const flip = await (horizontal ? sharp(unit).flop() : sharp(unit).flip()).png().toBuffer()
  const n = Math.ceil(L / len) + 1, comp: any[] = []; let pos = -Math.round(((n * len) - L) / 2)
  for (let i = 0; i < n; i++) { comp.push({ input: i % 2 ? flip : unit, left: horizontal ? pos + i * len : 0, top: horizontal ? 0 : pos + i * len }) }
  const W = horizontal ? L : tw, H = horizontal ? th : L
  // composite onto a canvas offset so negative positions crop correctly
  const big = await sharp({ create: { width: horizontal ? n * len : tw, height: horizontal ? th : n * len, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(comp.map((c, i) => ({ input: c.input, left: horizontal ? i * len : 0, top: horizontal ? 0 : i * len }))).png().toBuffer()
  const off = Math.round((n * len - L) / 2)
  return sharp(big).extract({ left: horizontal ? off : 0, top: horizontal ? 0 : off, width: W, height: H }).png().toBuffer()
}
async function frame(art: Art, cw: number, ch: number, k: number) {
  const [x0, y0, x1, y1] = art.rect, ml = Math.round(x0 * k), mr = Math.round((art.W - x1) * k), mt = Math.round(y0 * k), mb = Math.round((art.H - y1) * k)
  const OW = ml + cw + mr, OH = mt + ch + mb
  const cut = (l: number, t: number, w: number, h: number) => sharp(art.buf).extract({ left: l, top: t, width: w, height: h }).png().toBuffer()
  const sc = async (l: number, t: number, w: number, h: number, tw: number, th: number) => sharp(await cut(l, t, w, h)).resize(Math.max(1, tw), Math.max(1, th), { fit: 'fill' }).png().toBuffer()
  const comp: any[] = [
    { input: await sc(0, 0, x0, y0, ml, mt), left: 0, top: 0 }, { input: await sc(x1, 0, art.W - x1, y0, mr, mt), left: ml + cw, top: 0 },
    { input: await sc(0, y1, x0, art.H - y1, ml, mb), left: 0, top: mt + ch }, { input: await sc(x1, y1, art.W - x1, art.H - y1, mr, mb), left: ml + cw, top: mt + ch },
    { input: await band(await cut(x0, 0, x1 - x0, y0), x1 - x0, y0, k, true, cw), left: ml, top: 0 }, { input: await band(await cut(x0, y1, x1 - x0, art.H - y1), x1 - x0, art.H - y1, k, true, cw), left: ml, top: mt + ch },
    { input: await band(await cut(0, y0, x0, y1 - y0), x0, y1 - y0, k, false, ch), left: 0, top: mt }, { input: await band(await cut(x1, y0, art.W - x1, y1 - y0), art.W - x1, y1 - y0, k, false, ch), left: ml + cw, top: mt }]
  const png = await sharp({ create: { width: OW, height: OH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(comp).png().toBuffer()
  // hard guarantee: transparent perimeter (fade the outer 10 px to alpha 0)
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let y = 0; y < OH; y++) for (let x = 0; x < OW; x++) { const d = Math.min(x, y, OW - 1 - x, OH - 1 - y); if (d < 10) { const i = (y * OW + x) * 4 + 3; data[i] = d < 4 ? 0 : Math.round(data[i] * (d - 3) / 7) } }
  const png2 = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer()
  return { png: png2, OW, OH, ml, mt }
}
for (const a of todo) {
  const art = await loadArt(a.id); fs.mkdirSync(`${D}/assets/${a.id}`, { recursive: true })
  for (const v of ['screen', 'narrow', 'print'] as Variant[]) {
    const n = native(a, v), pad = v === 'narrow' ? 14 : 26
    const cw = n.w + 2 * pad, ch = n.h + 2 * pad, k = Math.min(1.6, Math.max(0.3, cw / (art.rect[2] - art.rect[0]))), f = await frame(art, cw, ch, k)
    const webp = (await sharp(f.png).webp({ quality: 88, alphaQuality: 100 }).toBuffer()).toString('base64')
    const plate = v === 'print' ? '#ffffff' : PAPER, id = `${a.id}-${v}`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f.OW} ${f.OH}" width="${f.OW}" height="${f.OH}" role="img" aria-label="${esc(n.desc)}"><title>${esc(a.title)}</title><defs><filter id="bl-${id}" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="${v === 'narrow' ? 10 : 22}"/></filter></defs><image href="data:image/webp;base64,${webp}" x="0" y="0" width="${f.OW}" height="${f.OH}"/><rect x="${f.ml}" y="${f.mt}" width="${cw}" height="${ch}" rx="${Math.min(40, cw / 12)}" fill="${plate}" fill-opacity=".4" filter="url(#bl-${id})"/><svg x="${f.ml + pad}" y="${f.mt + pad}" width="${n.w}" height="${n.h}" viewBox="0 0 ${n.w} ${n.h}">${n.inner}</svg></svg>\n`
    const name = v === 'screen' ? 'desktop' : v === 'narrow' ? 'phone' : 'print'
    fs.writeFileSync(`${D}/assets/${a.id}/${a.id}.${name}.svg`, svg)
  }
  console.log(a.id, 'rect', art.rect.join(','), 'art', art.W + 'x' + art.H)
}
