import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { ATLAS } from '@/lib/soundscape/resources/palette'
import FullPalette from '@/components/soundscape/resources/Palette'
import Md from '@/components/soundscape/Md'

export const metadata: Metadata = { title: 'The Ajourné Interval Palette — Ajourné into Music', description: ATLAS.intro.deck }

export default function IntervalPalettePage() {
  const i = ATLAS.intro
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">{i.eyebrow}</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">The Ajourné Interval Palette and Atlas</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mb-0">{i.deck}</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="sp-prose">{i.para.map(p => <p key={p.slice(0, 30)}>{p}</p>)}</div>
        <p className="sp-callout max-w-2xl"><strong>Read me first.</strong> {i.readme}</p>
        <p className="sp-prose sp-muted"><Md>{i.definitions}</Md></p>
        <nav aria-label="Palette links" className="flex flex-wrap gap-3 my-6 sp-noprint">
          <a className="sp-btn sp-btn--ghost" href="/soundscape/resources/INTERVAL_PALETTE_QUICK_PRINT_V1.pdf">Print the quick chart (PDF)</a>
          <a className="sp-btn sp-btn--ghost" href="/soundscape/resources/INTERVAL_PALETTE_QUICK_PRINT_V1.svg">Quick chart (SVG)</a>
          <Link className="sp-btn sp-btn--ghost" href={`${BASE}/week-2/lesson-2a`}>Back to Lesson 2A</Link>
          <Link className="sp-btn sp-btn--ghost" href={`${BASE}/resources`}>Resources Library</Link>
        </nav>
        <FullPalette />
        <p className="text-sm sp-muted border-t border-slate-200 pt-6 mt-12">{ATLAS.footer}</p>
      </div>
    </div>
  )
}
