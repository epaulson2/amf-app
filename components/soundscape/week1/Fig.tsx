import { W1_ALT } from '@/lib/soundscape/week1/assets'
import { W2_ALT } from '@/lib/soundscape/week2/assets'
import { PROVENANCE } from '@/lib/soundscape/fixtures'

/** Imported original AMF diagram (deterministic SVG), alt text from the asset's own description. */
export default function Fig({ file, caption, folder = 'w1' }: { file: string; caption?: string; folder?: 'w1' | 'w2' | 'resources' }) {
  const alt = (folder === 'w1' ? W1_ALT : W2_ALT)[file]
  if (!alt) throw new Error(`no alt text for ${file}`)
  return (
    <figure className="m-0 my-4 sp-card p-3">
      <div className="sp-fig-scroll" tabIndex={0} role="group" aria-label={`${alt.split('.')[0]} (scrolls sideways on narrow screens)`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/soundscape/${folder}/${file}`} alt={alt} className="w-full h-auto block" />
      </div>
      <figcaption className="text-sm sp-muted mt-2">{caption ? `${caption} ` : ''}Original AMF graphic, rendered from data. Source: {PROVENANCE.repo} @ {PROVENANCE.commit}.</figcaption>
    </figure>
  )
}
