import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'
import { T } from '@/lib/soundscape/week1/teaching'
import { Paras } from '@/components/soundscape/week1/Teach'
import Md from '@/components/soundscape/Md'
import { RoadmapW1 } from '@/components/soundscape/visual/Roadmaps'

export const metadata: Metadata = { title: 'Week 1: Finding Home — Ajourné into Music' }

const w = WEEKS[0]

export default function Week1() {
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">Week {w.n}</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">{w.title}</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mb-0">{w.learning}</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <section aria-labelledby="w1-intro">
          <h2 id="w1-intro" className="sp-editorial-heading text-2xl text-slate-900">Finding Home: How Notes Become Music</h2>
          <Paras paras={T.hub.paras} />
        </section>

        <RoadmapW1 />

        <section aria-labelledby="w1-journey" className="mt-12">
          <h2 id="w1-journey" className="sp-editorial-heading text-2xl text-slate-900">A guided three-part journey</h2>
          <ol className="list-none p-0 grid gap-4 md:grid-cols-3 mt-4">
            {T.hub.journey.map((l, i) => (
              <li key={l.id} className="sp-card p-5 flex flex-col">
                <p className="sp-eyebrow m-0">Lesson {i + 1} of 3</p>
                <h3 className="sp-editorial-title font-medium text-xl text-slate-900 mt-1 mb-2">{l.id.toUpperCase()} — {l.title}</h3>
                <p className="text-base m-0 mb-4 flex-1">{l.text}</p>
                <Link href={`${BASE}/week-1/lesson-${l.id.toLowerCase()}`} className="sp-btn self-start">Open lesson {l.id}</Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="w1-can" className="mt-12">
          <h2 id="w1-can" className="sp-editorial-heading text-2xl text-slate-900">What you&apos;ll be able to do</h2>
          <p className="sp-prose"><Md>{T.hub.can}</Md></p>
          <p className="sp-prose"><strong>Create:</strong> {w.creation}</p>
        </section>

        <section aria-labelledby="w1-how" className="mt-12">
          <h2 id="w1-how" className="sp-editorial-heading text-2xl text-slate-900">How to learn here</h2>
          <p className="sp-callout max-w-2xl"><Md>{T.hub.how}</Md></p>
        </section>

        <p className="mt-10"><Link href={`${BASE}/journey`} className="font-medium" style={{ color: '#b45309' }}>← The eight-week journey</Link></p>
      </div>
    </div>
  )
}
