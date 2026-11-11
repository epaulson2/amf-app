'use client'
import { useId, useState } from 'react'
import { Art, type ArtStem } from './Art'

// One example behind its own explicit reveal. The image is not mounted (so not requested) until the learner opens it.
export function ArtReveal({ n, label, stem, alt }: { n: number; label: string; stem: ArtStem; alt: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="w2-reveal">
      <button type="button" className="w2-reveal-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
        {open ? `Hide example ${n}` : `Show example ${n}`}<span className="w2-reveal-sub"> · {label}</span>
      </button>
      <div id={id} role="region" aria-label={`Example ${n}`} hidden={!open}>{open ? <Art stem={stem} alt={alt} lazy={false} /> : null}</div>
    </div>
  )
}
