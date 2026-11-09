import Image from 'next/image'
import type { IntervalRecord } from '@/lib/soundscape/resources/palette'
import reg from '@/lib/soundscape/resources/illustrated-v2.json'

const DIR = '/soundscape/resources/interval-palette/illustrated-v2'
type Entry = { w: number; h: number; corrected: boolean; g3?: boolean }
const R = reg as Record<string, Entry>

/** Illustrated card art, mapped by canonical interval record id (never by list offset). Returns the file that is served (musically corrected derivative where one exists). */
export const illustratedSrc = (r: IntervalRecord) => R[r.id] ? `${DIR}/${R[r.id].g3 ? 'g3/' : R[r.id].corrected ? 'corrected/' : ''}${r.id}.png` : null

export default function PaletteIllustratedCard({ r, variant }: { r: IntervalRecord; variant: 'thumb' | 'chapter' }) {
  const e = R[r.id], src = illustratedSrc(r)
  if (!e || !src) return null
  const alt = `${r.name}: ${r.lowerName} up to ${r.upperName}, ${r.semitones} semitone${r.semitones === 1 ? '' : 's'}.`
  if (variant === 'thumb') return <Image className="ip6-thumb" src={src} alt="" aria-hidden="true" width={e.w} height={e.h} quality={75} loading="lazy" sizes="(max-width: 640px) 44vw, 180px" />
  return (
    <figure className={`ip6-ill ip6-ill--${variant}`}>
      <Image src={src} alt={alt} width={e.w} height={e.h} quality={90} loading="lazy"
        sizes="(max-width: 640px) 92vw, 400px" />
      <figcaption><a className="ip6-zoom" href={src} target="_blank" rel="noopener noreferrer">View full-size image ({e.w}×{e.h} PNG, opens one image) ↗</a></figcaption>
    </figure>
  )
}
