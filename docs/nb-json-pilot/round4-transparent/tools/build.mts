// Transparent standalone 2A infographic: model foreground (true alpha PNG) + exact native layer. No page/background layer. Colours via identityHex().
import { identityHex, INK, WINE, PAPER } from '../../../../lib/soundscape/m07/kit.ts'
import fs from 'node:fs'
const R = 'docs/nb-json-pilot/round4-transparent'
const b64 = (f: string) => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64')
const SERIF = "Georgia,'Times New Roman',serif", SANS = "system-ui,'Segoe UI',Helvetica,Arial,sans-serif"
const OFF = 100  // art is placed 100px down on the canvas
const T = (x: number, y: number, s: string, o: { size?: number; w?: number; fill?: string; anchor?: string; ff?: string } = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.ff ?? SANS}" font-size="${o.size ?? 22}" font-weight="${o.w ?? 400}" fill="${o.fill ?? INK}" text-anchor="${o.anchor ?? 'middle'}">${s}</text>`
type D = { semis: number; lo: string; hi: string; whites: string[]; blacks: [string, number][]; path: number[]; name: string; abbr: string; letters: string[]; cx: number; cy: number; rx: number; ry: number; id: string }
function medallion(d: D) {
  const hex = identityHex(d.semis), w = 96, kh = 104, bh = 62, bw = 52, x0 = d.cx - 1.5 * w, ky = d.cy - 22, ay = ky - 12, pk = 26
  let g = `<defs><radialGradient id="pl${d.id}"><stop offset="0" stop-color="${PAPER}" stop-opacity=".93"/><stop offset=".86" stop-color="${PAPER}" stop-opacity=".9"/><stop offset="1" stop-color="${PAPER}" stop-opacity="0"/></radialGradient></defs>`
  g += `<ellipse cx="${d.cx}" cy="${d.cy}" rx="${d.rx}" ry="${d.ry}" fill="url(#pl${d.id})"/>`
  g += T(d.cx, d.cy - 150, `${d.lo} → ${d.hi}`, { size: 27, w: 800, ff: SERIF })
  const X = (p: number) => x0 + p * w, a = X(d.path[0]), b = X(d.path[d.path.length - 1]), by = d.cy - 100
  g += T(d.cx, by - 12, `${d.semis} semitones`, { size: 24, w: 800 })
  g += `<path d="M${a} ${by + 9} V${by} H${b} V${by + 9}" fill="none" stroke="${INK}" stroke-width="3"/>`
  d.whites.forEach((n, i) => { const hit = n === d.lo || n === d.hi
    g += `<rect x="${x0 + i * w}" y="${ky}" width="${w}" height="${kh}" rx="6" fill="${hit ? hex : '#fffdf8'}" fill-opacity="${hit ? .36 : 1}" stroke="${hit ? hex : '#9a8798'}" stroke-width="${hit ? 4 : 1.6}"/>` + T(x0 + i * w + w / 2, ky + kh - 10, n, { size: 22, w: hit ? 800 : 500, fill: hit ? INK : '#6b5a68' }) })
  d.blacks.forEach(([n, p]) => { g += `<rect x="${X(p) - bw / 2}" y="${ky}" width="${bw}" height="${bh}" rx="5" fill="${INK}"/>` + T(X(p), ky + bh - 10, n, { size: 21, w: 600, fill: '#fffdf8' }) })
  d.path.forEach((p, i) => { const hit = i === 0 || i === d.path.length - 1
    g += `<circle cx="${X(p)}" cy="${ay}" r="${hit ? 9 : 6}" fill="${hit ? hex : PAPER}" stroke="${hex}" stroke-width="3.5"/>`
    if (i) { const s = X(d.path[i - 1]), e = X(p), m = (s + e) / 2; g += `<path d="M${s} ${ay} Q${m} ${ay - 2 * pk} ${e} ${ay}" fill="none" stroke="${hex}" stroke-width="4" stroke-linecap="round"/>` + T(m, ay - pk - 8, String(i), { size: 22, w: 800 }) } })
  const ty = d.cy + 345
  g += `<circle cx="${d.cx - 168}" cy="${ty - 8}" r="11" fill="${hex}"/>` + T(d.cx + 8, ty, `${d.name} (${d.abbr})`, { size: 27, w: 800 })
  g += `<rect x="${d.cx - 180}" y="${ty + 12}" width="360" height="5" rx="2.5" fill="${hex}"/>`
  g += T(d.cx, ty + 50, `${d.letters.join(' – ')} = 3 letters → a third`, { size: 24, w: 700, ff: SERIF }) + T(d.cx, ty + 84, `${d.semis} hops, black keys too = ${d.semis} semitones`, { size: 23, w: 500 })
  g += T(d.cx, ty + 118, d.semis === 4 ? 'the wider third' : 'the narrower third', { size: 24, w: 800, fill: WINE })
  return g
}
const Ld: D = { id: 'L', semis: 4, lo: 'C4', hi: 'E4', whites: ['C4', 'D4', 'E4'], blacks: [['C♯', 1], ['D♯', 2]], path: [.5, 1, 1.5, 2, 2.5], name: 'MAJOR THIRD', abbr: 'M3', letters: ['C', 'D', 'E'], cx: 310, cy: 455 + OFF, rx: 156, ry: 168 }
const Rd: D = { id: 'R', semis: 3, lo: 'E4', hi: 'G4', whites: ['E4', 'F4', 'G4'], blacks: [['F♯', 2]], path: [.5, 1.5, 2, 2.5], name: 'MINOR THIRD', abbr: 'm3', letters: ['E', 'F', 'G'], cx: 900, cy: 450 + OFF, rx: 166, ry: 184 }
const sumP = (x: number, y: number) => T(x, y, 'Both are thirds: 3 letters each.', { size: 27, w: 700, ff: SERIF }) + T(x, y + 36, '4 semitones is wider (M3);', { size: 24 }) + T(x, y + 68, '3 semitones is narrower (m3).', { size: 24 })
const sum = (x: number, y: number) => T(x, y, 'Both are thirds: 3 letters each.', { size: 27, w: 700, ff: SERIF }) + T(x, y + 38, '4 semitones is wider (M3); 3 is narrower (m3).', { size: 24 })
const ttl = (x: number, y: number, big: number) => T(x, y, 'Same letters, different size', { size: big, w: 700, ff: SERIF }) + T(x, y + 44, 'Major third vs. minor third', { size: 30, w: 500, fill: WINE })
const alt = 'Transparent infographic. Left: C4 to E4, letters C, D, E make a third; four hops across C, C sharp, D, D sharp, E equal four semitones, a major third (M3), amber. Right: E4 to G4, letters E, F, G make a third; three hops across E, F, F sharp, G equal three semitones, a minor third (m3), violet.'
const ART = b64(`${R}/source/art.alpha.png`), ARTNB = b64(`${R}/source/art.alpha.nobridge.png`)
const H = 1170
const desk = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${H}" width="1200" height="${H}" role="img" aria-label="${alt}"><title>Major third vs minor third (transparent)</title><image href="${ART}" x="0" y="${OFF}" width="1200" height="896"/>${ttl(600, 80, 54)}${medallion(Ld)}${medallion(Rd)}${sum(600, 1090)}</svg>`
const panel = (d: D, y: number) => `<svg x="0" y="${y}" width="540" height="840" viewBox="${d.cx - 270} ${d.cy - 350} 540 840"><use href="#art"/>${medallion(d)}</svg>`
const phone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 1960" width="540" height="1960" role="img" aria-label="${alt}"><title>Major third vs minor third (transparent, phone)</title><defs><image id="art" href="${ARTNB}" x="0" y="${OFF}" width="1200" height="896"/></defs>${ttl(270, 64, 40)}${panel(Ld, 110)}${panel(Rd, 950)}${sumP(270, 1850)}</svg>`
fs.writeFileSync(`${R}/source/infographic.desktop.svg`, desk); fs.writeFileSync(`${R}/source/infographic.phone.svg`, phone)
console.log('ok')
