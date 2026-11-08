import sharp from 'sharp'
import fs from 'node:fs'
const D = 'docs/m08'
let before = 0, after = 0
for (const id of fs.readdirSync(`${D}/assets`)) for (const f of fs.readdirSync(`${D}/assets/${id}`).filter(x => x.endsWith('.png'))) {
  const p = `${D}/assets/${id}/${f}`, b = fs.readFileSync(p); before += b.length
  const o = await sharp(b).png({ palette: true, quality: 92, effort: 7, dither: 0.6 }).toBuffer(); after += o.length; fs.writeFileSync(p, o)
}
for (const f of fs.readdirSync(`${D}/art`).filter(x => x.endsWith('.raw.png'))) {
  const p = `${D}/art/${f}`; await sharp(p).jpeg({ quality: 93 }).toFile(p.replace('.raw.png', '.raw.jpg')); fs.unlinkSync(p)
}
console.log((before / 1e6).toFixed(0) + 'MB ->', (after / 1e6).toFixed(0) + 'MB')
