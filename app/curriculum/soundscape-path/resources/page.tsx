import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import hub from '@/lib/soundscape/resources/hub.json'

export const metadata: Metadata = { title: 'Resources Library — Ajourné into Music', description: hub.deck }

const cats = hub.categories.map(([k, v]) => [k, v.split('. Existing')[0].replace(/\.$/, '') + '.'] as const)

export default function Resources() {
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">{hub.eyebrow}</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">{hub.h1}</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mb-0">{hub.deck}</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <p className="sp-prose">{hub.intro}</p>
        <div className="flex flex-wrap gap-3 my-6">
          <Link href={`${BASE}/resources/interval-palette`} className="sp-btn">Jump to the Interval Palette</Link>
          <Link href={`${BASE}/journey`} className="sp-btn sp-btn--ghost">Back to My Journey</Link>
        </div>
        <section aria-labelledby="res-tiles">
          <h2 id="res-tiles" className="sp-editorial-heading text-2xl text-slate-900">Explore Resources</h2>
          <article className="sp-card p-5 max-w-2xl mt-4">
            <p className="sp-eyebrow m-0">{hub.tile.Category}</p>
            <h3 className="sp-editorial-title font-medium text-2xl text-slate-900 mt-1 mb-2">{hub.tile.Title}</h3>
            <p className="m-0 mb-2">{hub.tile.Blurb}</p>
            <p className="text-sm sp-muted m-0 mb-4">{hub.tile.Subline}</p>
            <Link href={`${BASE}/resources/interval-palette`} className="sp-btn">{hub.tile.CTA}</Link>
          </article>
        </section>
        <section aria-labelledby="res-more" className="mt-12">
          <h2 id="res-more" className="sp-editorial-heading text-2xl text-slate-900">Subjects this library is growing toward</h2>
          <p className="sp-prose sp-muted">These are subjects only, not tools you can open yet.</p>
          <ul className="list-none p-0 grid gap-3 sm:grid-cols-2">
            {cats.map(([k, v]) => <li key={k} className="sp-card p-4"><p className="font-semibold m-0">{k}</p><p className="text-base sp-muted m-0">{v}</p></li>)}
          </ul>
        </section>
      </div>
    </div>
  )
}
