import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'

export const metadata: Metadata = { title: 'How We Learn — Ajourné into Music' }

const SECTIONS: { h: string; p: string[]; extra?: string }[] = [
  { h: 'First, hear what the idea does', p: ['Imagine hearing two notes that feel different when played over the same held tone. Before we explain anything, you notice the change. You might call one sound open, close, bright, quiet, uncertain or something entirely your own.', 'Then we look at the notes themselves. Where are they on a keyboard? How many semitones separate them? Do they form a major third, a fifth or something else? Those are questions with musical answers—and names worth learning.', 'At the end, you use the same relationship to make an original musical choice. The theory doesn’t interrupt the creative experience. It makes the experience easier to recognize, repeat and transform.'], extra: 'A major third is more than a definition. C to E is a major third: a span of four semitones on the standard keyboard. We’ll hear it, locate it, sing or imagine it, and choose how it contributes to a phrase. Later, we’ll connect it to chords and harmony.' },
  { h: 'Your internal keyboard will grow with you', p: ['At first, a keyboard is simply a row of unfamiliar keys. But its pattern repeats. A group of two black keys gives you a landmark for finding C; the neighboring keys help you measure semitones and whole steps; a leap from C to E can become a recognizable distance.', 'We’ll look, trace, sketch, imagine and verify those relationships. Over time, you’ll begin to recognize the shape of a note movement before you play it—or notice two musical voices moving in different directions at once.', 'The idea comes partly from Marianne Ploger’s keyboard-visualization work. We’ve adapted it to a sound-first creative path with room for visual, auditory and tactile approaches. You don’t need to form vivid pictures in your head to participate.'] },
  { h: 'Knowledge grows in circles, not boxes', p: ['A concept might appear first as a sound, then as a named idea, then as a tool in a new piece. That’s why we return to musical relationships more than once.', 'The first week introduces notes, keyboard geography and the sound of arrival. A later lesson brings those same notes into a pair of moving voices. Later still, we discover how a held melody note changes its role when the harmony changes beneath it.', 'Each return adds another layer of understanding. You’ll learn the conventional terms, but you won’t have to put your creativity on hold until every term feels familiar.'] },
  { h: 'What happens inside a lesson?', p: ['Each lesson centers on one musical discovery. You’ll hear a short example, imagine or predict something, compare versions, learn the relevant theory, and try a small experiment in your own instrument or DAW.', 'There will often be a little keyboard map, a short reflection, and optional links to real performances. Some days you may spend more time composing than reading. That’s fine. The learning becomes real when you can carry it into a sound you care about.'] },
  { h: 'Your curiosity can take a side path', p: ['Music belongs to history, culture, science and personal imagination as much as it belongs to theory. If something fascinates you, open a History Postcard, Behind the Sound explanation, Ambient Composer’s Notebook, Real Music example, Musical Worlds story or Paint What You Hear prompt.', 'These are invitations, not extra lessons you must finish. Sometimes one interesting connection changes how you hear the whole exercise.'] },
  { h: 'The point is more freedom', p: ['We’ll help you name the notes, measure the intervals, understand the harmonies and recognize how a musical idea develops. But you still decide how the piece should feel and where it should go.', 'A beautifully placed silence can be a complete idea. A simple two-note phrase can be an expressive choice. Understanding music gives you more options—not an obligation to use all of them.'] },
]

export default function HowItWorks() {
  return (
    <div>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-2">The approach</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">How we&apos;ll learn music together</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mb-0">By hearing, discovering, naming and creating—until the theory becomes part of the music you imagine.</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {SECTIONS.map(s => (
          <section key={s.h} className="mb-10">
            <h2 className="sp-editorial-heading text-2xl text-slate-900">{s.h}</h2>
            <div className="sp-prose mt-3">{s.p.map(t => <p key={t}>{t}</p>)}</div>
            {s.extra && <p className="sp-callout max-w-2xl">{s.extra}</p>}
          </section>
        ))}
        <p className="sp-prose sp-muted">Listen · Imagine · Locate · Understand · Create · Return</p>
        <p><Link href={`${BASE}/journey`} className="sp-btn">View the eight-week journey</Link></p>
      </div>
    </div>
  )
}
