// Builds every M07 Week 2 asset: public/soundscape/m07/{screen,narrow,print}/<id>.svg, art washes, and docs/m07/registry.json.
// Run: node --experimental-strip-types --no-warnings --import ./tests/register.mjs scripts/m07/build.mts
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { ASSETS, VARIANTS, renderAsset } from '../../lib/soundscape/m07/render.ts'
import { ART } from '../../lib/soundscape/m07/art.ts'
import { INTERVAL_IDENTITY_COLORS_V1, IDENTITY_VERSION, PLOGGER_LENS_V1, identityHex } from '../../lib/soundscape/resources/interval-identity.ts'
import { REUSED } from '../../lib/soundscape/m07/reused.ts'

const OUT = 'public/soundscape/m07', DOCS = 'docs/m07'
for (const d of [...VARIANTS.map(v => `${OUT}/${v}`), `${OUT}/art`, DOCS]) mkdirSync(d, { recursive: true })
const sha = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 16)

const assets = ASSETS.map(a => {
  const variants: Record<string, { file: string; w: number; h: number; sha256_16: string }> = {}
  let title = '', desc = ''
  for (const v of VARIANTS) {
    const r = renderAsset(a, v)
    const file = `${OUT}/${v}/${a.id}.svg`
    writeFileSync(file, r.svg)
    variants[v] = { file, w: r.w, h: r.h, sha256_16: sha(r.svg) }
    if (v === 'screen') { title = r.title; desc = r.desc }
  }
  return {
    id: a.id, auditRow: a.row, family: a.group, kind: a.kind, disposition: a.disp, title: a.title, svgTitle: title, state: a.state, steps: a.steps,
    teaches: a.teaches, howToRead: a.howToRead, alt: a.alt, svgDesc: desc,
    tokens: { identityVersion: IDENTITY_VERSION, semitones: a.semis, hex: a.semis.map(s => ({ semitones: s, hex: identityHex(s), id: 'IP-' + String(s).padStart(2, '0') })) },
    plogger: a.plogger.map(n => ({ bracket: n, ...PLOGGER_LENS_V1[n] })),
    forbiddenInNeutralState: a.forbid, sources: a.sources, limits: a.limits ?? null, variants,
    generation: { method: 'deterministic native SVG (lib/soundscape/m07)', modelImage: false, provider: null },
  }
})
const art = ART.map(a => { const file = `${OUT}/art/${a.id}.svg`; writeFileSync(file, a.svg); return { id: a.id, family: a.group, title: a.title, file, w: a.w, h: a.h, sha256_16: sha(a.svg), generation: { method: 'deterministic native SVG painterly wash (lib/soundscape/m07/art.ts)', modelImage: false, provider: null }, meaning: 'atmosphere only; hues carry no interval meaning' } })
const registry = {
  schema: 'm07-week2-registry/1', branch: 'feat/ajourne-m07-week2-graphics-20261107', baseLive: '5bc10a139479900a9ffec5bc2be63496ac2336d8',
  tokenSource: 'lib/soundscape/resources/interval-identity.ts', identityVersion: IDENTITY_VERSION, identityHexes: Object.fromEntries(Object.entries(INTERVAL_IDENTITY_COLORS_V1).map(([k, v]) => [k, v.hex])),
  variants: { screen: 'width 760', narrow: 'width 360 (phones from 320 up)', print: 'width 760, white page, grayscale-safe' },
  counts: { nativeMasters: assets.length, svgFiles: assets.length * 3 + art.length, art: art.length, reusedInPlace: REUSED.length },
  assets, art, reusedInPlace: REUSED, newModelImages: 0,
}
writeFileSync(`${DOCS}/registry.json`, JSON.stringify(registry, null, 1) + '\n')
console.log(JSON.stringify(registry.counts), existsSync(`${DOCS}/registry.json`))
