import { ASSETS, renderAsset } from '../../lib/soundscape/m07/render.ts'
import { identityHex } from '../../lib/soundscape/m07/kit.ts'
import { FORMS } from './forms.mts'
import fs from 'node:fs'
const out = ASSETS.map(a => {
  const sem = [...new Set(a.semis)].filter(s => s >= 1 && s <= 12)
  const d = renderAsset(a, 'screen'), ratio = d.w / (d.h + 110)
  const aspect = ratio > 1.9 ? '16:9' : ratio > 1.55 ? '3:2' : ratio > 1.2 ? '4:3' : ratio > 0.9 ? '1:1' : '3:4'
  const useHue = !['2B-07'].includes(a.id) && a.state !== 'N' && sem.length >= 1 && sem.length <= 3
  return { id: a.id, state: a.state, aspect, w: d.w, h: d.h, useHue, group: a.group, title: a.title, steps: a.steps, form: FORMS[a.id] ?? null, semis: sem, hues: useHue ? sem.map(identityHex) : [] }
})
const missing = out.filter(o => !o.form).map(o => o.id); if (missing.length) throw new Error('missing forms ' + missing)
fs.writeFileSync('docs/m08/manifest.in.json', JSON.stringify(out, null, 1)); console.log(out.length, out.filter(o => o.semis.length).length)
