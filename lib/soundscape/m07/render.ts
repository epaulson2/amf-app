// Renders an Asset to a standalone, accessible SVG document for one variant.
import { wrap } from '../m03/native-svg'
import { ASSETS, type Asset } from './assets'
import { ctxFor, col, W_IN, type Variant } from './kit'

export const VARIANTS: Variant[] = ['screen', 'narrow', 'print']
export function renderAsset(a: Asset, variant: Variant) {
  const uid = `m07-${a.id.toLowerCase()}-${variant}`
  const c = ctxFor(variant, uid)
  const built = a.build(c)
  const body = col(built.blocks, built.gap ?? 16)
  const w = c.W, h = Math.ceil(body.h + 20)
  const svg = wrap(uid, built.title, built.desc, w, h, `<g transform="translate(8 8)">${body.body}</g>`, { uid, print: c.print })
  return { svg, w, h, title: built.title, desc: built.desc }
}
export { ASSETS, W_IN }
