// Alpha/transparency QA on every delivered PNG + proof sheets over cream and slate + thumbnails. Usage: node qa.mjs
import sharp from 'sharp'
import fs from 'node:fs'
const D = 'docs/m08', ids = fs.readdirSync(`${D}/assets`).sort()
fs.mkdirSync(`${D}/proof`, { recursive: true }); fs.mkdirSync(`${D}/thumb`, { recursive: true })
const out = {}
const over = async (f, bg, w) => sharp(await sharp(f).resize({ width: w }).toBuffer()).flatten({ background: bg }).jpeg({ quality: 82 }).toBuffer()
for (const id of ids) {
  out[id] = {}
  for (const v of ['desktop', 'phone', 'print']) {
    const f = `${D}/assets/${id}/${id}.${v}.png`; if (!fs.existsSync(f)) { out[id][v] = { missing: true }; continue }
    const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true }), W = info.width, H = info.height
    let mn = 255, mx = 0, nz = 0, perim = 0; const T = 3
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const a = data[(y * W + x) * 4 + 3]; mn = Math.min(mn, a); mx = Math.max(mx, a); if (a) nz++; if (x < T || y < T || x >= W - T || y >= H - T) perim = Math.max(perim, a) }
    out[id][v] = { size: `${W}x${H}`, alphaMin: mn, alphaMax: mx, perimeterMaxAlpha: perim, nonzeroPct: +(100 * nz / (W * H)).toFixed(1), bytes: fs.statSync(f).size, pass: mn === 0 && perim === 0 && mx === 255 }
  }
  const d = `${D}/assets/${id}/${id}.desktop.png`, p = `${D}/assets/${id}/${id}.phone.png`
  const parts = [await over(d, '#F9F5ED', 520), await over(d, '#C9D3E0', 520), await over(p, '#F9F5ED', 220), await over(p, '#C9D3E0', 220)]
  const ms = await Promise.all(parts.map(b => sharp(b).metadata())), Hm = Math.max(...ms.map(m => m.height))
  let x = 0; const comp = parts.map((b, i) => { const o = { input: b, left: x, top: 0 }; x += ms[i].width + 8; return o })
  await sharp({ create: { width: x, height: Hm, channels: 3, background: '#888' } }).composite(comp).jpeg({ quality: 80 }).toFile(`${D}/proof/${id}.proof.jpg`)
  await sharp(await sharp(d).resize({ width: 480 }).toBuffer()).flatten({ background: '#F9F5ED' }).jpeg({ quality: 82 }).toFile(`${D}/thumb/${id}.jpg`)
}
fs.writeFileSync(`${D}/qa.alpha.json`, JSON.stringify(out, null, 1))
const bad = ids.flatMap(i => Object.entries(out[i]).filter(([, v]) => !v.pass).map(([k, v]) => `${i}.${k}: ${JSON.stringify(v)}`))
console.log(ids.length, 'assets; failing:', bad.length); bad.slice(0, 30).forEach(b => console.log(b))
