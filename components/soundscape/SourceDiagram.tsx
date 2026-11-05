import { PROVENANCE } from '@/lib/soundscape/fixtures'

/** An original AMF diagram imported from the asset repository, with alt text and provenance. */
export default function SourceDiagram({ file, narrowFile, alt, caption }: { file: string; narrowFile?: string; alt: string; caption: string }) {
  return (
    <figure className="m-0 sp-card p-3">
      <picture>
        {narrowFile && <source media="(max-width: 640px)" srcSet={`/soundscape/${narrowFile}`} />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/soundscape/${file}`} alt={alt} className="w-full h-auto block" />
      </picture>
      <figcaption className="text-sm sp-muted mt-2">
        {caption} <span className="block">Original AMF graphic, rendered from data. Source: {PROVENANCE.repo} @ {PROVENANCE.commit} ({PROVENANCE.branch}).</span>
      </figcaption>
    </figure>
  )
}
