import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { LESSONS } from '@/lib/soundscape/m04/lessons'
import { artSrc } from './kit'

/** Lesson cards: painted thumbnail (decorative), title, summary, ordinary link. */
export function LessonCards({ week }: { week?: 1 | 2 }) {
  return (
    <ul className="m4-cards">
      {LESSONS.filter(l => !week || l.week === week).map(l => (
        <li key={l.id}>
          <div className="m4-card">
            <div className="m4-thumb"><img src={artSrc(l.art)} alt="" aria-hidden="true" loading="lazy" /></div>
            <p className="m4-eyebrow">Week {l.week} · Lesson {l.id}</p>
            <h3><Link href={`${BASE}/${l.route}`} style={{ textDecoration: 'none' }}>{l.title}</Link></h3>
            <p style={{ fontSize: 16, lineHeight: 1.55, margin: '0 0 10px' }}>{l.blurb}</p>
            <p style={{ margin: 0 }}><Link className="m4-btn m4-btn--ghost" href={`${BASE}/${l.route}`}>Open Lesson {l.id}</Link></p>
          </div>
        </li>
      ))}
    </ul>
  )
}
