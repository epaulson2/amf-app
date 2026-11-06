import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'
import { T } from '@/lib/soundscape/week1/teaching'
import Md from '@/components/soundscape/Md'
import { Scene, Wrap, Row, Figure, Lead, Reading, Caveat, Crumbs, HOME_CRUMB, CourseReturn } from '@/components/soundscape/m04/kit'
import { LessonCards } from '@/components/soundscape/m04/Cards'

export const metadata: Metadata = { title: 'Week 1: Finding Home — Ajourné into Music' }
const w = WEEKS[0]

export default function Week1() {
  return (
    <Scene>
      <Wrap>
        <Crumbs trail={[HOME_CRUMB, { label: 'Week 1' }]} aside={<Link href={BASE} className="m4-crumbs__back">← Ajourné Home</Link>} />
        <header className="m4-hero">
          <Row figure={<Figure id="S06-native" art="S06" caption="Find C, travel, add a voice." />}>
            <p className="m4-eyebrow">Week {w.n}</p>
            <h1>{w.title}</h1>
            <Lead>{w.learning}</Lead>
            <ul className="m4-cta"><li><Link className="m4-btn" href={`${BASE}/week-1/lesson-1a`}>Start Lesson 1A</Link></li><li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/how-it-works`}>How we learn</Link></li></ul>
          </Row>
        </header>

        <section className="m4-section" aria-labelledby="w1-intro">
          <p className="m4-eyebrow">This week</p>
          <h2 id="w1-intro">Finding Home: how notes become music</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>{T.hub.paras.map(p => <p key={p.slice(0, 24)}><Md>{p}</Md></p>)}</div>
          <Reading label="What the picture shows"><p>Three steps in order: find C, travel along the keys, then add a voice. Below them, the keyboard shows two highlighted Cs, each the white key just left of a group of two black keys.</p></Reading>
        </section>

        <section className="m4-section" aria-labelledby="w1-journey">
          <p className="m4-eyebrow">Three lessons</p>
          <h2 id="w1-journey">A guided three-part journey</h2>
          <LessonCards week={1} />
        </section>

        <section className="m4-section" aria-labelledby="w1-can">
          <p className="m4-eyebrow">By the end of the week</p>
          <h2 id="w1-can">What you’ll be able to do</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p><Md>{T.hub.can}</Md></p>
            <p><strong>Create:</strong> {w.creation}</p>
          </div>
        </section>

        <section className="m4-section" aria-labelledby="w1-how">
          <p className="m4-eyebrow">Your keyboard is the classroom</p>
          <h2 id="w1-how">How to learn here</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p>Read the idea, study the picture, follow one real example key by key, then try it yourself on your own keyboard. Return to the explanation whenever you want to make sense of what you heard. Everything you hear comes from your own instrument, so you stay in charge of the sound.</p>
            <p>The six side doors at the end of each lesson are optional. Your music and your reflections stay yours.</p>
          </div>
          <Caveat>You will need a keyboard or synthesizer, a gentle sound and a comfortable volume. A small 25-key controller is plenty.</Caveat>
        </section>
        <CourseReturn items={[{ href: BASE, label: 'Ajourné Home' }, { href: `${BASE}/journey`, label: 'The eight-week journey' }, { href: `${BASE}/how-it-works`, label: 'How we learn' }]} />
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}
