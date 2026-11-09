import { getImageProps } from 'next/image'
import type { IntervalRecord } from '@/lib/soundscape/resources/palette'
import { PLOGGER_LENS_V1, SHAPE_LABEL, DIR_LABEL, FILL_LABEL, hasPlogger } from '@/lib/soundscape/resources/interval-identity'
import reg from '@/lib/soundscape/resources/sheets-v2.json'

const DIR = '/soundscape/resources/interval-palette/sheets-v2'
type V = { w: number; h: number }
const R = reg as Record<string, { desktop: V; mobile: V }>
const nn = (r: IntervalRecord) => String(r.semitones).padStart(2, '0')

/** Canonical alt text, built from the interval record and Plogger lens rather than from the painted pixels. */
export function sheetAlt(r: IntervalRecord) {
  const p = hasPlogger(r.semitones) ? `Plogger lens: ${SHAPE_LABEL[PLOGGER_LENS_V1[r.semitones].shape]}, ${DIR_LABEL[PLOGGER_LENS_V1[r.semitones].dir]}, ${FILL_LABEL[PLOGGER_LENS_V1[r.semitones].fill]}.` : 'Plogger is not applicable at this boundary interval.'
  return `${r.name} teaching sheet: ${r.lowerName} to ${r.upperName}, ${r.semitones} semitone${r.semitones === 1 ? '' : 's'}. A keyboard from C4 to C5 with both notes marked, a chromatic-distance ruler, the same two notes on a treble staff, and melodic and harmonic strips. ${p}`
}

/** Batch 2 teaching sheet (M10 P4): desktop PNG on wide screens, phone PNG at 620px and below, the validated print SVG on paper.
 *  The painted-text exports are rasterised with the design fonts, so the PNG is what is displayed; the editable SVG is offered as source. */
export default function PaletteSheet({ r, printSrc }: { r: IntervalRecord; printSrc: string }) {
  const e = R[nn(r)]
  if (!e) return null
  const d = getImageProps({ src: `${DIR}/png/IPF-sheet-${nn(r)}.desktop.png`, alt: sheetAlt(r), width: e.desktop.w, height: e.desktop.h, quality: 90, sizes: '(max-width: 1100px) 92vw, 720px' })
  const m = getImageProps({ src: `${DIR}/png/IPF-sheet-${nn(r)}.mobile.png`, alt: '', width: e.mobile.w, height: e.mobile.h, quality: 90, sizes: '92vw' })
  return (
    <figure className="ip6-fig ip6-sheet">
      <picture>
        <source media="print" srcSet={printSrc} />
        <source media="(max-width: 620px)" srcSet={m.props.srcSet} sizes="92vw" />
        <img {...d.props} loading="lazy" decoding="async" style={{ width: '100%', height: 'auto' }} />
      </picture>
      <figcaption className="ip6-small">
        <a href={`${DIR}/png/IPF-sheet-${nn(r)}.desktop.png`} target="_blank" rel="noopener noreferrer">Full-size sheet ({e.desktop.w}×{e.desktop.h} PNG) ↗</a>
        {' · '}
        <a href={`${DIR}/png/IPF-sheet-${nn(r)}.mobile.png`} target="_blank" rel="noopener noreferrer">Phone version ↗</a>
        {' · '}
        <a href={`${DIR}/svg/IPF-sheet-${nn(r)}.desktop.svg`} target="_blank" rel="noopener noreferrer">Editable SVG source ↗</a>
      </figcaption>
    </figure>
  )
}
