import type { ReactNode } from 'react'

/** Quiet-paper illustration frame (original Style B grammar): a warm wash, a number, a title. Decoration only. */
export default function Frame({ n, title, children, caption }: { n: number; title: string; children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="sp-kbframe my-6 rounded-2xl border p-3 sm:p-5" data-graphic={`G${n}`} style={{ borderColor: '#d9cfb8' }}>
      <p className="sp-eyebrow m-0 mb-1">Illustration {n}</p>
      <figcaption className="sp-editorial-title text-xl font-medium text-slate-900 mb-3">{title}</figcaption>
      {children}
      {caption && <div className="text-sm sp-muted mt-3">{caption}</div>}
    </figure>
  )
}
