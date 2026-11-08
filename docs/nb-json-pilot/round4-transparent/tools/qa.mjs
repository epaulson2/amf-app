import sharp from 'sharp'
const R = 'docs/nb-json-pilot/round4-transparent', out = {}
for (const f of ['source/art.alpha.png', 'final/infographic.desktop.transparent.png', 'final/infographic.phone.transparent.png']) {
  const { data, info } = await sharp(`${R}/${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height, A = (x, y) => data[(y * W + x) * 4 + 3]
  let mn = 255, mx = 0, nz = 0, border = 0
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const a = A(x, y); mn = Math.min(mn, a); mx = Math.max(mx, a); if (a) nz++; if (x < 4 || y < 4 || x >= W - 4 || y >= H - 4) border = Math.max(border, a) }
  out[f] = { size: `${W}x${H}`, alphaMin: mn, alphaMax: mx, corners: [A(0, 0), A(W - 1, 0), A(0, H - 1), A(W - 1, H - 1)], borderMaxAlpha: border, nonzeroPct: +(100 * nz / (W * H)).toFixed(1), channels: info.channels }
}
console.log(JSON.stringify(out, null, 1))
