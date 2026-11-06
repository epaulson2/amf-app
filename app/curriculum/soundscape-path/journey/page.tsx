import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'

export const metadata: Metadata = { title: 'Your Eight-Week Journey — Ajourné into Music' }

const MONTHS = [
  { eyebrow: 'Month One · Weeks 1–4', intro: 'Begin with the smallest musical choices: one note, two notes, moving voices and the harmonies that emerge between them.', close: "By the end of the first movement, you'll have a clearer sense of how notes relate and how those relationships become expressive choices.", weeks: WEEKS.slice(0, 4) },
  { eyebrow: 'Month Two · Weeks 5–8', intro: 'Now we begin connecting ideas over time: harmonic paths, independent parts, changing tonal color and a complete original piece.', close: "The goal isn't to follow a formula for a beautiful piece. It's to learn enough musical language that you can hear more possibilities and choose among them with confidence.", weeks: WEEKS.slice(4) },
]

export default function Journey() {
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">The first two months</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">From one note to your own musical world</h1>
          <p className="text-slate-300 mt-3 max-w-2xl">Eight weeks of listening, learning and creating. Each discovery becomes something you can hear—and something you can use.</p>
          <p className="text-slate-300 max-w-2xl mb-0">The two-month path has two movements. First we discover musical relationships. Then we learn to shape them into a larger journey.</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <p className="sp-callout max-w-2xl m-0"><span className="sp-status mr-2">Preview</span>Week 1 is open. Each later week will link to its own page as its lessons are completed and checked.</p>
        {MONTHS.map(m => (
          <section key={m.eyebrow} aria-label={m.eyebrow}>
            <p className="sp-eyebrow m-0">{m.eyebrow}</p>
            <p className="sp-prose mt-2">{m.intro}</p>
            <ol className="list-none p-0 space-y-4">
              {m.weeks.map(w => (
                <li key={w.n} className="sp-card p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h2 className="sp-editorial-heading text-xl text-slate-900 m-0"><span className="sp-muted text-base font-medium mr-2">Week {w.n}</span>{w.title}</h2>
                    {w.n === 1 ? <Link href={`${BASE}/week-1`} className="sp-btn">Open Week 1</Link> : <span className="sp-status">Lesson pages in preparation</span>}
                  </div>
                  <p className="text-base mt-2 mb-1">{w.learning}</p>
                  <p className="text-base sp-muted m-0"><strong className="text-slate-800">Create:</strong> {w.creation}</p>
                </li>
              ))}
            </ol>
            <p className="sp-prose sp-muted">{m.close}</p>
          </section>
        ))}
        <section>
          <h2 className="sp-editorial-heading text-2xl text-slate-900">A path, not a finish line</h2>
          <p className="sp-prose mt-2">You can revisit a week, pause to make more music, or explore a deeper question when curiosity takes you there. Each step is meant to become part of your musical practice long after the lesson ends.</p>
          <p><Link href={`${BASE}/how-it-works`} className="sp-btn sp-btn--ghost">See how we learn</Link></p>
        </section>
        <p className="text-sm sp-muted border-t border-slate-200 pt-6">Ajourné into Music · An AMF introductory creative-music track</p>
      </div>
    </div>
  )
}
