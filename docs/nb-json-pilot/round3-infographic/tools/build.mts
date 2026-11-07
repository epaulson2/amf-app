// Builds the unified 2A infographic: model art (B3.png) + exact native SVG text/keys/hop arcs. Colours come from identityHex().
import { identityHex, INK, WINE, PAPER } from '../../../../lib/soundscape/m07/kit.ts'
import sharp from 'sharp'
import fs from 'node:fs'
const R = 'docs/nb-json-pilot/round3-infographic'
const jpg = await sharp(`${R}/raw/B3.png`).resize(1200).jpeg({ quality: 90 }).toBuffer()
const ART = 'data:image/jpeg;base64,' + jpg.toString('base64')
const SERIF = "Georgia,'Times New Roman',serif", SANS = "system-ui,'Segoe UI',Helvetica,Arial,sans-serif"
const T = (x: number, y: number, s: string, o: { size?: number; w?: number; fill?: string; anchor?: string; ff?: string; italic?: boolean } = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.ff ?? SANS}" font-size="${o.size ?? 22}" font-weight="${o.w ?? 400}" fill="${o.fill ?? INK}" text-anchor="${o.anchor ?? 'start'}"${o.italic ? ' font-style="italic"' : ''}>${s}</text>`
type P = { name: string; kind: 'w' | 'b'; pos: number }  // pos in units of key width from keyboard left edge (white centre = i+.5, black centre = boundary)
function panel(o: { semis: number; lo: string; hi: string; whites: string[]; blacks: [string, number][]; path: P[]; ends: [number, number]; name: string; abbr: string; letters: string[]; lines: [string, boolean?][]; x0: number }) {
  const hex = identityHex(o.semis), w = 104, ky = 395, kh = 136, bh = 82, bw = 62, x0 = o.x0
  let g = `<defs><radialGradient id="f${o.semis}"><stop offset="0" stop-color="${PAPER}" stop-opacity=".95"/><stop offset=".72" stop-color="${PAPER}" stop-opacity=".88"/><stop offset="1" stop-color="${PAPER}" stop-opacity="0"/></radialGradient></defs>`
  g += `<ellipse cx="${x0 + 2 * w}" cy="468" rx="${2 * w + 60}" ry="150" fill="url(#f${o.semis})"/><ellipse cx="${x0 + 2 * w}" cy="650" rx="${2 * w + 52}" ry="112" fill="url(#f${o.semis})"/>`
  // name pill
  g += `<rect x="${x0 - 34}" y="212" width="${4 * w + 68}" height="56" rx="28" fill="${PAPER}" stroke="${hex}" stroke-width="4"/><circle cx="${x0 - 8}" cy="240" r="11" fill="${hex}"/>`
  g += T(x0 + 12, 248, `${o.lo} → ${o.hi} · ${o.name} (${o.abbr})`, { size: 21, w: 700, ff: SANS })
  // keyboard
  o.whites.forEach((n, i) => {
    const hit = n === o.lo || n === o.hi
    g += `<rect x="${x0 + i * w}" y="${ky}" width="${w}" height="${kh}" rx="6" fill="${hit ? hex : '#fffdf8'}" fill-opacity="${hit ? .34 : 1}" stroke="${hit ? hex : '#9a8798'}" stroke-width="${hit ? 4 : 1.6}"/>`
    g += T(x0 + i * w + w / 2, ky + kh - 14, n, { size: 24, w: hit ? 800 : 500, anchor: 'middle', fill: hit ? INK : '#6b5a68' })
  })
  o.blacks.forEach(([n, b]) => { g += `<rect x="${x0 + b * w - bw / 2}" y="${ky}" width="${bw}" height="${bh}" rx="5" fill="${INK}"/>` + T(x0 + b * w, ky + bh - 14, n, { size: 22, w: 600, anchor: 'middle', fill: '#fffdf8' }) })
  // hop path
  const X = (p: P) => x0 + p.pos * w, ay = ky - 10, pk = 30
  o.path.forEach((p, i) => {
    const hit = i === 0 || i === o.path.length - 1
    g += `<circle cx="${X(p)}" cy="${ay}" r="${hit ? 9 : 6}" fill="${hit ? hex : PAPER}" stroke="${hex}" stroke-width="3.5"/>`
    if (i) { const a = X(o.path[i - 1]), b = X(p), m = (a + b) / 2; g += `<path d="M${a} ${ay} Q${m} ${ay - 2 * pk} ${b} ${ay}" fill="none" stroke="${hex}" stroke-width="4" stroke-linecap="round"/>` + T(m, ay - pk - 6, String(i), { size: 22, w: 800, anchor: 'middle' }) }
  })
  // total bracket
  const a = X(o.path[0]), b = X(o.path[o.path.length - 1]), by = 314
  g += `<path d="M${a} ${by + 12} V${by} H${b} V${by + 12}" fill="none" stroke="${INK}" stroke-width="3"/>` + T((a + b) / 2, by - 10, `${o.semis} semitones`, { size: 26, w: 800, anchor: 'middle', fill: INK })
  // letters + explanation
  const lx = x0 + 2 * w
  g += T(lx, 574, o.letters.join(' – ') + ' = 3 letters', { size: 26, w: 800, anchor: 'middle', ff: SERIF })
  o.lines.forEach(([s, bold], i) => { g += T(lx, 616 + i * 34, s, { size: 23, w: bold ? 800 : 500, anchor: 'middle' }) })
  g += `<rect x="${lx - 150}" y="${616 + o.lines.length * 34 - 14}" width="300" height="6" rx="3" fill="${hex}"/>`
  return g
}
const L = panel({ semis: 4, lo: 'C4', hi: 'E4', x0: 100, name: 'MAJOR THIRD', abbr: 'M3', letters: ['C', 'D', 'E'],
  whites: ['C4', 'D4', 'E4', 'F4'], blacks: [['C♯', 1], ['D♯', 2]],
  path: [{ name: 'C4', kind: 'w', pos: .5 }, { name: 'C♯', kind: 'b', pos: 1 }, { name: 'D4', kind: 'w', pos: 1.5 }, { name: 'D♯', kind: 'b', pos: 2 }, { name: 'E4', kind: 'w', pos: 2.5 }],
  lines: [['so it is a third.'], ['Count every key, black too:'], ['4 hops = 4 semitones', true], ['wider → MAJOR third']] })
const Rr = panel({ semis: 3, lo: 'E4', hi: 'G4', x0: 100, name: 'MINOR THIRD', abbr: 'm3', letters: ['E', 'F', 'G'],
  whites: ['E4', 'F4', 'G4', 'A4'], blacks: [['F♯', 2], ['G♯', 3]],
  path: [{ name: 'E4', kind: 'w', pos: .5 }, { name: 'F4', kind: 'w', pos: 1.5 }, { name: 'F♯', kind: 'b', pos: 2 }, { name: 'G4', kind: 'w', pos: 2.5 }],
  lines: [['so it is a third.'], ['Count every key, black too:'], ['3 hops = 3 semitones', true], ['narrower → MINOR third']] })
const soft = (id: string) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${PAPER}" stop-opacity=".92"/><stop offset="1" stop-color="${PAPER}" stop-opacity="0"/></radialGradient></defs>`
const title = (x: number, y: number, anchor: string, big: number) => soft('tt') + `<ellipse cx="${x}" cy="${y - 6}" rx="${anchor === 'middle' ? 330 : 250}" ry="86" fill="url(#tt)"/>` +
  T(x, y, 'Same letters, different size', { size: big, w: 700, anchor, ff: SERIF }) + T(x, y + 44, 'Major third vs. minor third', { size: 30, w: 500, anchor, fill: WINE })
const sum = (x: number, y: number) => soft('ss') + `<ellipse cx="${x}" cy="${y - 4}" rx="340" ry="74" fill="url(#ss)"/>` +
  T(x, y - 8, 'Both are thirds: 3 letters each.', { size: 26, w: 700, anchor: 'middle', ff: SERIF }) +
  T(x, y + 32, '4 semitones is wider (M3); 3 is narrower (m3).', { size: 24, w: 500, anchor: 'middle' })
const alt = 'Infographic. Left: C4 to E4, letters C, D, E make a third; four hops across C, C sharp, D, D sharp, E equal four semitones, a major third (M3), amber. Right: E4 to G4, letters E, F, G make a third; three hops across E, F, F sharp, G equal three semitones, a minor third (m3), violet. Same interval number, different size.'
const img = (x: number, y: number, w: number, h: number) => `<image href="${ART}" x="${x}" y="${y}" width="${w}" height="${h}"/>`
// desktop 1200x896
const desk = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 896" width="1200" height="896" role="img" aria-label="${alt}"><title>Same letters, different size: major vs minor third</title>${img(0, 0, 1200, 896)}${title(600, 120, 'middle', 54)}<g>${L}</g><g transform="translate(600 0)">${Rr}</g>${sum(600, 800)}</svg>`
// phone: left panel (art y0-780) + right panel (art y150-780) + summary strip
const clipL = `<svg x="0" y="0" width="600" height="780" viewBox="0 0 600 780">${img(0, 0, 1200, 896)}${title(330, 112, 'middle', 40).replace(/rx="\d+"/, 'rx="270"')}${L}</svg>`
const clipR = `<svg x="0" y="780" width="600" height="630" viewBox="0 150 600 630">${img(-600, 0, 1200, 896)}${Rr}</svg>`
const fade = `<defs><linearGradient id="sm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${PAPER}" stop-opacity="0"/><stop offset="1" stop-color="${PAPER}"/></linearGradient><linearGradient id="sn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${PAPER}" stop-opacity="0"/><stop offset="1" stop-color="${PAPER}"/></linearGradient></defs><rect x="0" y="744" width="600" height="36" fill="url(#sm)"/><rect x="0" y="780" width="600" height="36" fill="url(#sn)"/>`
const strip = `<svg x="0" y="1410" width="600" height="150" viewBox="300 730 600 150">${img(0, 0, 1200, 896)}${sum(600, 800).replace(/rx="340"/, 'rx="300"')}</svg>`
const phone = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1560" width="600" height="1560" role="img" aria-label="${alt}"><title>Same letters, different size: major vs minor third</title><rect width="600" height="1560" fill="${PAPER}"/>${clipL}${clipR}${fade}${strip}</svg>`
fs.mkdirSync(`${R}/source`, { recursive: true })
fs.writeFileSync(`${R}/source/infographic.desktop.svg`, desk); fs.writeFileSync(`${R}/source/infographic.phone.svg`, phone)
fs.writeFileSync(`${R}/source/art.B3.jpg`, jpg)
console.log('ok', desk.length, phone.length)
