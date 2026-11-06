import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { W2 } from '@/lib/soundscape/week2/content'
import Md from '@/components/soundscape/Md'

export const metadata: Metadata = { title: 'Week 2: Two Notes Become Two Voices — Ajourné into Music' }

export default function Week2() {
  const h = W2.hub
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">Week 2</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">{h.title}</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mb-0">{h.deck}</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <section aria-labelledby="w2-welcome">
          <h2 id="w2-welcome" className="sp-editorial-heading text-2xl text-slate-900">Welcome to Week 2</h2>
          <div className="sp-prose">{h.welcome.map(p => <p key={p.slice(0, 40)}><Md>{p}</Md></p>)}</div>
        </section>
        <section aria-labelledby="w2-map" className="mt-12">
          <h2 id="w2-map" className="sp-editorial-heading text-2xl text-slate-900">A map of this week&apos;s musical language</h2>
          <p className="sp-prose"><Md>{h.map}</Md></p>
          <p className="sp-callout max-w-2xl"><Md>{h.mini}</Md></p>
        </section>
        <section aria-labelledby="w2-lessons" className="mt-12">
          <h2 id="w2-lessons" className="sp-editorial-heading text-2xl text-slate-900">Three lessons that connect</h2>
          <ol className="list-none p-0 grid gap-4 md:grid-cols-3 mt-4">
            {h.lessons.map((l, i) => (
              <li key={l.id} className="sp-card p-5 flex flex-col">
                <p className="sp-eyebrow m-0">Lesson {i + 1} of 3</p>
                <h3 className="sp-editorial-title font-medium text-xl text-slate-900 mt-1 mb-2">{l.id} — {l.title}</h3>
                <p className="text-base m-0 mb-4 flex-1">{l.text}</p>
                <Link href={`${BASE}/week-2/lesson-${l.id.toLowerCase()}`} className="sp-btn self-start">Open lesson {l.id}</Link>
              </li>
            ))}
          </ol>
        </section>
        <section aria-labelledby="w2-can" className="mt-12">
          <h2 id="w2-can" className="sp-editorial-heading text-2xl text-slate-900">What you&apos;ll be able to explain and do</h2>
          <p className="sp-prose"><Md>{h.can}</Md></p>
        </section>
        <section aria-labelledby="w2-how" className="mt-12">
          <h2 id="w2-how" className="sp-editorial-heading text-2xl text-slate-900">How to learn here</h2>
          <p className="sp-callout max-w-2xl"><Md>{h.how}</Md></p>
          <p className="mt-4"><Link href={`${BASE}/resources/interval-palette`} className="sp-btn sp-btn--ghost">Open the Interval Palette</Link></p>
        </section>
        <p className="mt-10 flex flex-wrap gap-6"><Link href={`${BASE}/week-1`} className="font-medium" style={{ color: '#b45309' }}>← Week 1</Link><Link href={`${BASE}/journey`} className="font-medium" style={{ color: '#b45309' }}>The eight-week journey</Link></p>
      </div>
    </div>
  )
}
