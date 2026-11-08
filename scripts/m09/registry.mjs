import fs from 'node:fs'
import crypto from 'node:crypto'
import sharp from 'sharp'
const D = 'public/soundscape/resources/interval-palette/illustrated-v2'
const man = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')
const reg = {}
for (const c of man.cards) {
  const o = `${D}/${c.id}.png`, k = `${D}/corrected/${c.id}.png`, corrected = fs.existsSync(k)
  const m = await sharp(corrected ? k : o).metadata()
  reg[c.id] = { title: c.title, semitones: c.semitones, w: m.width, h: m.height, corrected, sha256_original: sha(o), manifest_sha256: c.sha256, sha256_served: corrected ? sha(k) : sha(o) }
  if (sha(o) !== c.sha256) throw new Error('hash mismatch ' + c.id)
}
fs.writeFileSync('lib/soundscape/resources/illustrated-v2.json', JSON.stringify(reg, null, 1) + '\n')
console.log(Object.keys(reg).length, 'registered')
