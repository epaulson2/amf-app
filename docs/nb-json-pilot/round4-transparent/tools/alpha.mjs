// white -> true alpha (unmultiply against pure white), faint-haze floor, soft edge. Writes full + phone (bridge-cleared) versions.
import sharp from 'sharp'
const R = 'docs/nb-json-pilot/round4-transparent'
const { data, info } = await sharp(`${R}/raw/B4.png`).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height, out = Buffer.alloc(W * H * 4)
const floor = 0.035
for (let i = 0, p = 0; i < W * H; i++, p += 4) {
  const m = Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2])
  let a = (255 - m) / 255; a = a < floor ? 0 : Math.min(1, ((a - floor) / (1 - floor)) * 1.08)
  if (a === 0) continue
  for (let c = 0; c < 3; c++) out[p + c] = Math.max(0, Math.min(255, Math.round((data[i * 3 + c] - 255 * (1 - a)) / a)))
  out[p + 3] = Math.round(a * 255)
}
const sc = W / 1200
const save = (buf, f) => sharp(buf, { raw: { width: W, height: H, channels: 4 } }).resize(1200).png({ compressionLevel: 9 }).toFile(f)
await save(out, `${R}/source/art.alpha.png`)
const b2 = Buffer.from(out)
for (let y = 0; y < H; y++) for (let x = Math.round(552 * sc); x < Math.round(648 * sc); x++) b2[(y * W + x) * 4 + 3] = 0
await save(b2, `${R}/source/art.alpha.nobridge.png`)
console.log(W, H)
