import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'
import { Scene, Wrap, Lead, Figure } from '@/components/soundscape/m04/kit'

export const metadata: Metadata = { title: 'Your Eight-Week Journey — Ajourné into Music' }

const MONTHS = [
  { eyebrow: 'Month One · Weeks 1–4', intro: 'Begin with the smallest musical choices: one note, two notes, moving voices and the harmonies that emerge between them.', close: "By the end of the first movement, you'll have a clearer sense of how notes relate and how those relationships become expressive choices.", weeks: WEEKS.slice(0, 4) },
  { eyebrow: 'Month Two · Weeks 5–8', intro: 'Now we begin connecting ideas over time: harmonic paths, independent parts, changing tonal color and a complete original piece.', close: "The goal isn't to follow a formula for a beautiful piece. It's to learn enough musical language that you can hear more possibilities and choose among them with confidence.", weeks: WEEKS.slice(4) },
]

export default function Journey() {
  return (
    <Scene>
      <Wrap>
        <header className="m4-hero">
          <p className="m4-eyebrow">The first two months</p>
          <h1>From one note to <em>your own musical world</em></h1>
          <Lead>Eight weeks of listening, learning and creating, all on your own keyboard. Each discovery becomes something you can hear and something you can use.</Lead>
          <p style={{ maxWidth: '40rem' }}>The path has two movements. First we discover musical relationships. Then we learn to shape them into a larger journey.</p>
          <p className="m4-caveat" style={{ maxWidth: '40rem' }}><strong>Weeks 1 and 2 are open.</strong> Weeks 3 to 8 are still being built; each will link to its own page when its lessons are ready.</p>
        </header>
        {MONTHS.map(m => (
          <section key={m.eyebrow} className="m4-section" aria-label={m.eyebrow}>
            <p className="m4-eyebrow">{m.eyebrow}</p>
            <p className="m4-lead" style={{ maxWidth: '40rem' }}>{m.intro}</p>
            <ol className="m4-weeks" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,420px),1fr))' }}>
              {m.weeks.map(w => (
                <li key={w.n} className={w.n <= 2 ? 'on' : undefined}>
                  <p className="m4-eyebrow">Week {w.n}</p>
                  <h2 style={{ fontSize: 28, margin: '6px 0 8px' }}>{w.title}</h2>
                  <p>{w.learning}</p>
                  <p style={{ color: '#6f5f6c' }}><strong>Create:</strong> {w.creation}</p>
                  <p className="m4-soon">{w.n <= 2 ? <Link className="m4-btn" href={`${BASE}/week-${w.n}`}>Open Week {w.n}</Link> : 'Lesson pages in preparation'}</p>
                </li>
              ))}
            </ol>
            <p style={{ maxWidth: '40rem', color: '#6f5f6c' }}>{m.close}</p>
          </section>
        ))}
        <section className="m4-section" aria-labelledby="path-h">
          <h2 id="path-h">A path, not a finish line</h2>
          <p style={{ maxWidth: '40rem' }}>You can revisit a week, pause to make more music, or explore a deeper question when curiosity takes you there. Each step is meant to become part of your musical imagination.</p>
          <ul className="m4-cta"><li><Link className="m4-btn" href={`${BASE}/week-1/lesson-1a`}>Start Lesson 1A</Link></li><li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/how-it-works`}>See how we learn</Link></li></ul>
        </section>
        <p className="m4-foot">Ajourné into Music · An AMF introductory creative-music track</p>
      </Wrap>
    </Scene>
  )
}
