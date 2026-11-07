// white-to-alpha extraction (unmultiply against pure white). Usage: node alpha.mjs in.png out.png
import sharp from 'sharp'
const [i, o] = process.argv.slice(2)
const { data, info } = await sharp(i).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const out = Buffer.alloc(data.length)
for (let p = 0; p < data.length; p += 4) {
  const m = Math.min(data[p], data[p + 1], data[p + 2]); let a = (255 - m) / 255; a = Math.min(1, a * 1.12)   // gentle gain keeps pale washes visible
  if (a < 0.015) { out[p + 3] = 0; continue }
  for (let c = 0; c < 3; c++) out[p + c] = Math.max(0, Math.min(255, Math.round((data[p + c] - 255 * (1 - a)) / a)))
  out[p + 3] = Math.round(a * 255)
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).resize(1600).png({ compressionLevel: 9 }).toFile(o)
console.log(o, info.width + 'x' + info.height)
