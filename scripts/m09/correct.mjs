// Builds musically exact corrected derivatives of IP-00..IP-09 (keyboard, staff, IP-01 spelling line).
// Originals stay verbatim in illustrated-v2/; outputs go to illustrated-v2/corrected/.
import sharp from 'sharp'
import fs from 'node:fs'
const DIR = 'public/soundscape/resources/interval-palette/illustrated-v2'
const W = 1122, H = 1402
// semitones above C4; letter-step index (C D E F G A B = 0..6); accidental: -1 flat, +1 sharp, 0 natural
const CARDS = [
  { id: 'IP-00', hue: '#76848C', tgt: { n: 'C4', s: 0, l: 0, acc: 0 } },
  { id: 'IP-01', hue: '#C25562', tgt: { n: 'D♭4', s: 1, l: 1, acc: -1 } },
  { id: 'IP-02', hue: '#C17D41', tgt: { n: 'D4', s: 2, l: 1, acc: 0 } },
  { id: 'IP-03', hue: '#8964A4', tgt: { n: 'E♭4', s: 3, l: 2, acc: -1 } },
  { id: 'IP-04', hue: '#AB812D', tgt: { n: 'E4', s: 4, l: 2, acc: 0 } },
  { id: 'IP-05', hue: '#4F816B', tgt: { n: 'F4', s: 5, l: 3, acc: 0 } },
  { id: 'IP-06', hue: '#5366A0', tgt: { n: 'F♯4', s: 6, l: 3, acc: 1 } },
  { id: 'IP-07', hue: '#347B97', tgt: { n: 'G4', s: 7, l: 4, acc: 0 } },
  { id: 'IP-08', hue: '#A95E86', tgt: { n: 'A♭4', s: 8, l: 5, acc: -1 } },
  { id: 'IP-09', hue: '#B47752', tgt: { n: 'A4', s: 9, l: 5, acc: 0 } },
]
const WHITE_SEMI = [0, 2, 4, 5, 7, 9, 11, 12] // C4..C5
const BLACK = [[1, 1], [2, 3], [4, 6], [5, 8], [6, 10]] // [boundary after white k (1-based), semitone]
const mix = (h, t, k) => { const p = i => parseInt(h.slice(1 + 2 * i, 3 + 2 * i), 16), q = i => parseInt(t.slice(1 + 2 * i, 3 + 2 * i), 16); return '#' + [0, 1, 2].map(i => Math.round(p(i) * (1 - k) + q(i) * k).toString(16).padStart(2, '0')).join('') }
const FONT = `font-family="'Liberation Serif','DejaVu Serif',serif" font-style="italic" font-weight="700"`
const KX = 44, KW = 74.5, KY = 862, KH = 222
const lineY = k => 1128 + 17 * k // k=0 top line (F5) .. 4 bottom (E4)
const stepY = (letter) => 1196 + 17 - letter * 8.5 // C4 ledger (1213) up by half-space per letter
async function median(buf, x0, y0, x1, y1) {
  const { data, info } = await sharp(buf).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).raw().toBuffer({ resolveWithObject: true })
  const c = info.channels, arr = [[], [], []]
  for (let i = 0; i < data.length; i += c) { const lum = (data[i] + data[i + 1] + data[i + 2]) / 3; if (lum > 215 && data[i + 3] > 250) for (let k = 0; k < 3; k++) arr[k].push(data[i + k]) }
  return '#' + arr.map(a => { a.sort((x, y) => x - y); return (a[a.length >> 1] ?? 250).toString(16).padStart(2, '0') }).join('')
}
function keyboard(hue, c4s, tgt) {
  const hl = new Set([0, tgt.s]); let s = ''
  s += `<defs><filter id="sh" x="-5%" y="-5%" width="110%" height="120%"><feDropShadow dx="0" dy="7" stdDeviation="6" flood-color="#2a2030" flood-opacity=".28"/></filter>
<linearGradient id="wk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#ece5d8"/></linearGradient>
<linearGradient id="bk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55555e"/><stop offset="1" stop-color="#26262c"/></linearGradient>
<linearGradient id="hw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(hue, '#ffffff', .55)}"/><stop offset="1" stop-color="${hue}"/></linearGradient>
<linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(hue, '#000000', .1)}"/><stop offset="1" stop-color="${mix(hue, '#000000', .45)}"/></linearGradient></defs>`
  s += `<rect x="${KX - 5}" y="${KY - 4}" width="${KW * 8 + 10}" height="${KH + 10}" rx="18" fill="#e6dfd3" stroke="#b9afa0" stroke-width="1.5" filter="url(#sh)"/>`
  WHITE_SEMI.forEach((sem, i) => {
    const x = KX + i * KW, on = hl.has(sem) && !(sem === 0 && i === 7 && c4s !== 12)
    const on2 = (i === 0 && hl.has(0)) || (sem === tgt.s && !tgt.acc && i === WHITE_SEMI.indexOf(tgt.s) && tgt.s !== 0)
    s += `<path d="M${x} ${KY}h${KW}v${KH - 14}q0 14 -14 14h${-(KW - 28)}q-14 0 -14 -14z" fill="${on2 ? 'url(#hw)' : 'url(#wk)'}" stroke="#a89f90" stroke-width="1.3"/>`
    if (on2) { const nm = i === 0 ? 'C4' : tgt.n; s += `<text x="${x + KW / 2}" y="${KY + KH - 22}" text-anchor="middle" font-size="30" ${FONT} fill="#fff" stroke="${mix(hue, '#000', .5)}" stroke-width="4" paint-order="stroke">${nm}</text>` }
  })
  for (const [b, sem] of BLACK) {
    const cx = KX + b * KW, w = 46, h = 136, on = sem === tgt.s && tgt.acc !== 0
    s += `<rect x="${cx - w / 2}" y="${KY}" width="${w}" height="${h}" rx="5" fill="${on ? 'url(#hb)' : 'url(#bk)'}" stroke="#15151a" stroke-width="1.2"/><rect x="${cx - w / 2 + 5}" y="${KY + 3}" width="7" height="${h - 20}" rx="3" fill="#fff" opacity=".12"/>`
    if (on) s += `<text x="${cx}" y="${KY + h - 20}" text-anchor="middle" font-size="24" ${FONT} fill="#fff">${tgt.n}</text>`
  }
  return s
}
function staff(hue, tgt, ink) {
  const x1 = 300, x2 = 480, y1 = stepY(0), y2 = stepY(tgt.l), r = [x1, x2]
  let s = ''
  for (let k = 0; k < 5; k++) s += `<rect x="215" y="${lineY(k) - 1.2}" width="350" height="2.4" fill="${ink}" opacity=".92"/>`
  s += `<rect x="${x1 - 26}" y="${y1 - 1.2}" width="52" height="2.4" fill="${ink}"/>` // C4 ledger line
  if (tgt.l === 0) {} // unison: both on C4
  const cx = (x1 + x2) / 2
  s += `<path d="M${x1 + 6} ${y1 - 22} Q${cx} 1098 ${x2 - 6} ${y2 - 22}" fill="none" stroke="${ink}" stroke-width="3.4" stroke-linecap="round"/>`
  const head = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="15.5" ry="11.2" transform="rotate(-20 ${x} ${y})" fill="${ink}"/>`
  s += head(x1, y1) + head(x2, y2)
  if (tgt.acc) s += `<text x="${x2 - 40}" y="${y2 + 12}" font-size="44" font-family="'DejaVu Serif','Liberation Serif',serif" fill="${ink}">${tgt.acc < 0 ? '♭' : '♯'}</text>`
  if (tgt.l === 0) {} 
  s += `<text x="${x1}" y="1246" text-anchor="middle" font-size="27" ${FONT} fill="${ink}">C4</text><text x="${x2}" y="1246" text-anchor="middle" font-size="27" ${FONT} fill="${ink}">${tgt.n}</text>`
  return s
}
for (const c of CARDS) {
  const src = `${DIR}/${c.id}.png`, buf = fs.readFileSync(src)
  const kc = await median(buf, 30, 852, 650, 1090), sc = await median(buf, 230, 1092, 565, 1250)
  const ink = mix(c.hue, '#1d1a20', .78)
  const plate = (x, y, w, h, col, blur) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${col}" filter="url(#bl${blur})"/>`
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="bl7" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter></defs>`
  svg += plate(20, 838, 634, 270, kc, 7) + plate(222, 1090, 344, 162, sc, 7)
  if (c.id === 'IP-01') svg += `<rect x="384" y="748" width="360" height="102" rx="10" fill="${await median(buf, 380, 760, 745, 850)}" filter="url(#bl7)"/><text x="562" y="826" text-anchor="middle" font-size="72" font-family="'Liberation Serif','DejaVu Serif',serif" font-style="italic" fill="#2f2b2e">C4 + D♭4</text>`
  svg += keyboard(c.hue, c.tgt.s, c.tgt) + staff(c.hue, c.tgt, ink) + '</svg>'
  const alpha = await sharp(buf).extractChannel(3).toBuffer()
  const rgb = await sharp(buf).composite([{ input: Buffer.from(svg) }]).removeAlpha().toBuffer()
  const out = await sharp(rgb).joinChannel(alpha).png({ compressionLevel: 9 }).toBuffer()
  fs.writeFileSync(`${DIR}/corrected/${c.id}.png`, out)
  console.log(c.id, 'ok', out.length)
}
