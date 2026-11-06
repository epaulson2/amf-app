import { W1_ALT } from '@/lib/soundscape/week1/assets'
import { PROVENANCE } from '@/lib/soundscape/fixtures'

/** Imported original AMF diagram (deterministic SVG), alt text from the asset's own description. */
export default function Fig({ file, caption }: { file: string; caption?: string }) {
  const alt = W1_ALT[file]
  if (!alt) throw new Error(`no alt text for ${file}`)
  return (
    <figure className="m-0 my-4 sp-card p-3">
      <div className="sp-fig-scroll" tabIndex={0} role="group" aria-label={`${alt.split('.')[0]} (scrolls sideways on narrow screens)`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/soundscape/w1/${file}`} alt={alt} className="w-full h-auto block" />
      </div>
      <figcaption className="text-sm sp-muted mt-2">{caption ? `${caption} ` : ''}Original AMF graphic, rendered from data. Source: {PROVENANCE.repo} @ {PROVENANCE.commit}.</figcaption>
    </figure>
  )
}
