import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'

export const metadata: Metadata = { title: 'Week 1: Finding Home — Ajourné into Music' }

const w = WEEKS[0]
const LESSONS = [
  { id: '1a', label: 'Lesson 1 of 3', title: 'A Note Becomes a Landscape' },
  { id: '1b', label: 'Lesson 2 of 3', title: 'Stop Before the Ending' },
  { id: '1c', label: 'Lesson 3 of 3', title: 'My First Intentional Soundscape' },
]

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
        <p className="sp-prose"><strong>Create:</strong> {w.creation}</p>
        <ol className="list-none p-0 grid gap-4 sm:grid-cols-3 mt-6">
          {LESSONS.map(l => (
            <li key={l.id} className="sp-card p-5">
              <p className="sp-eyebrow m-0">{l.label}</p>
              <h2 className="sp-editorial-title font-medium text-xl text-slate-900 mt-1 mb-3">{l.title}</h2>
              <Link href={`${BASE}/week-1/lesson-${l.id}`} className="sp-btn">Open lesson {l.id.toUpperCase()}</Link>
            </li>
          ))}
        </ol>
        <p className="mt-8"><Link href={`${BASE}/journey`} className="font-medium" style={{ color: '#b45309' }}>← The eight-week journey</Link></p>
      </div>
    </div>
  )
}
