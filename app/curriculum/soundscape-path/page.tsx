import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'
import { ENTRY_DEMO, PATCHES } from '@/lib/soundscape/fixtures'
import AudioSequencePlayer from '@/components/soundscape/AudioSequencePlayer'
import { DiscoveryDoors } from '@/components/soundscape/DiscoveryDoor'
import PitchKeyboard from '@/components/soundscape/PitchKeyboard'

export const metadata: Metadata = {
  title: 'Ajourné into Music — AMF',
  description: 'Ajourné into Music: a creative journey into the language of music, a course within the Adaptable Musician’s Framework.',
}

const clips = [
  { id: 'home', label: 'Hear the home note', events: ENTRY_DEMO.home, patch: PATCHES.plain },
  { id: 'e', label: 'Let another note enter', events: ENTRY_DEMO.visitorE, patch: PATCHES.plain },
  { id: 'g', label: 'Try a different visitor', events: ENTRY_DEMO.visitorG, patch: PATCHES.plain },
]

export default function SoundscapeLanding() {
  return (
    <div>
      <section className="sp-hero py-12 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="sp-eyebrow m-0 mb-3">An AMF learning track · Music, imagination &amp; discovery</p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold m-0">Ajourné into Music</h1>
          <p className="text-2xl mt-2 mb-6" style={{ color: '#d97706' }}>Make the music you imagine.</p>
          <div className="text-slate-200 max-w-2xl space-y-4">
            <p>You already know what it feels like to be moved by a sound. What if you could understand what gives it that feeling—and find more ways to create it on purpose?</p>
            <p>Ajourné into Music is a creative journey into the language of music. We&apos;ll listen closely, explore notes and the spaces between them, learn the theory that explains their relationships, and use those discoveries to make original music.</p>
            <p>The instrument is a place to explore. Your ears and imagination help choose the direction.</p>
          </div>
          <p className="text-slate-300 mt-6 mb-5 font-medium">Hear it · See it · Understand it · Make it yours</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`${BASE}/journey`} className="sp-btn">See the eight-week journey</Link>
            <Link href={`${BASE}/how-it-works`} className="sp-btn sp-btn--ghost" style={{ color: '#fff', borderColor: '#fff' }}>How we&apos;ll learn</Link>
          </div>
          <p className="text-slate-300 text-sm mt-5 mb-0">Eight-week introductory path · Three short guided lessons a week · Room to move at your own pace</p>
          <p className="text-slate-300 text-sm mt-2 mb-0"><span className="sp-status">Preview</span> The lesson pages are still being built, so there is no Week 1 link yet.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        <section aria-labelledby="one-note">
          <h2 id="one-note" className="text-2xl font-semibold text-slate-900">Start with one note</h2>
          <div className="sp-prose mt-3">
            <p>Imagine a soft note held in the background—a quiet place to stand. Now let a second note enter. The first sound hasn&apos;t moved, but the atmosphere around it may feel different.</p>
            <p>You don&apos;t need to know the names of the notes yet. Just listen for what changes.</p>
          </div>
          <AudioSequencePlayer title="One note, then a visitor" clips={clips} />
          <p className="sp-callout mt-4 max-w-2xl">Our held note is C. We can give the next note a name too—and learn to see the distance between them. That&apos;s how sound begins to become a musical language.</p>
          <p className="sp-muted mt-3">One note becomes a reference. A second note creates a relationship.</p>
          <p className="sp-prose">Prefer to use your own keyboard? Hold C3 while playing E4, then G4, above it. Listen for how the combination changes.</p>
          <div className="mt-4"><PitchKeyboard title="Keyboard from C4 to C5 with C4, E4 and G4 marked" marks={[{ midi: 60 }, { midi: 64 }, { midi: 67 }]} /></div>
        </section>

        <section aria-labelledby="why">
          <h2 id="why" className="text-2xl font-semibold text-slate-900">Music is more than the notes you play</h2>
          <div className="sp-prose mt-3">
            <p>A melody can sound like a question. A single held note can make a musical place feel stable, mysterious or unfinished. Moving just one note can change an entire harmony. Silence can be as expressive as sound.</p>
            <p>These aren&apos;t mysteries you need to leave unexplored. They&apos;re musical relationships you can learn to hear, understand and use.</p>
            <p>The aim isn&apos;t to replace your instincts with rules. It&apos;s to give your instincts more possibilities.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 mt-4">
            {[['Hear more', 'Notice the patterns, tensions, colors and movements already happening in the music you love.'],
              ['Understand more', 'Learn names, intervals, scales, chords, rhythm and musical structure—and connect those ideas to actual sounds.'],
              ['Create more intentionally', 'Turn musical ideas into choices you can imagine, recreate, vary and develop into pieces of your own.']].map(([t, c]) => (
              <div key={t} className="sp-card p-5"><h3 className="text-lg font-semibold text-slate-900 m-0 mb-1">{t}</h3><p className="text-base sp-muted m-0">{c}</p></div>
            ))}
          </div>
        </section>

        <section aria-labelledby="doors">
          <h2 id="doors" className="text-2xl font-semibold text-slate-900">Follow your curiosity</h2>
          <p className="sp-prose mt-3">Some musical questions deserve another doorway. Every lesson includes little places to explore when you&apos;re curious—but you can always come back to making music.</p>
          <DiscoveryDoors content={{ 'paint-what-you-hear': <p className="m-0">What would our home note look like if it were a place on your canvas? You might paint a quiet wash for the held note, then add one gesture when another note enters. There is no required color or image—what you paint belongs to your own experience. Use your own paint, sketchbook or digital art tools. You never need to upload your artwork.</p> }} />
          <p className="sp-muted mt-4">These are invitations, not extra homework. Open one, open them all, or save them for another day.</p>
        </section>

        <section aria-labelledby="shape">
          <h2 id="shape" className="text-2xl font-semibold text-slate-900">Eight weeks. Two creative movements.</h2>
          <p className="sp-prose mt-3">You&apos;ll begin with one note and gradually build toward an original musical journey of your own.</p>
          <ol className="grid gap-3 sm:grid-cols-2 list-none p-0 mt-4">
            {WEEKS.map(w => (
              <li key={w.n} className="sp-card p-4">
                <p className="sp-eyebrow m-0">Week {w.n}</p>
                <p className="font-semibold text-slate-900 m-0">{w.title}</p>
              </li>
            ))}
          </ol>
          <p className="sp-muted mt-4">Eight weeks is a suggested path, not a deadline. You can take longer, revisit a discovery or make music beyond the lesson at any point.</p>
          <p className="mt-2"><Link href={`${BASE}/journey`} className="font-medium" style={{ color: '#b45309' }}>Explore the full eight-week journey →</Link></p>
        </section>

        <p className="text-sm sp-muted border-t border-slate-200 pt-6">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </div>
    </div>
  )
}
