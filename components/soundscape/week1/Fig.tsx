import { W1_ALT } from '@/lib/soundscape/week1/assets'
import { W2_ALT } from '@/lib/soundscape/week2/assets'
import { PROVENANCE } from '@/lib/soundscape/fixtures'

/**
 * Imported original AMF diagram (deterministic SVG), alt text from the asset's own description.
 * mode 'plain' = inline (scrolls sideways on phones); 'details' = tucked behind "Open the original illustration";
 * 'fit' = visible from tablet width up, behind a disclosure on phones. Primary teaching graphics are drawn fit-first elsewhere.
 */
export default function Fig({ file, caption, folder = 'w1', mode = 'details' }: { file: string; caption?: string; folder?: 'w1' | 'w2' | 'resources'; mode?: 'plain' | 'details' | 'fit' }) {
  const alt = (folder === 'w1' ? W1_ALT : W2_ALT)[file]
  if (!alt) throw new Error(`no alt text for ${file}`)
  const fig = (
    <figure className="m-0 my-4 sp-card p-3">
      <div className="sp-fig-scroll" tabIndex={0} role="group" aria-label={`${alt.split('.')[0]} (scrolls sideways on narrow screens)`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/soundscape/${folder}/${file}`} alt={alt} className="w-full h-auto block" />
      </div>
      <figcaption className="text-sm sp-muted mt-2">{caption ? `${caption} ` : ''}Original AMF graphic, rendered from data. Source: {PROVENANCE.repo} @ {PROVENANCE.commit}.</figcaption>
    </figure>
  )
  if (mode === 'plain') return fig
  const summary = `Open the original illustration${caption ? `: ${caption.split('.')[0]}` : ''}`
  const details = (
    <details className="my-3 sp-noprint"><summary className="cursor-pointer min-h-[44px] flex items-center font-medium">{summary}</summary>{fig}</details>
  )
  if (mode === 'fit') return <><div className="hidden sm:block">{fig}</div><div className="sm:hidden">{details}</div></>
  return details
}
