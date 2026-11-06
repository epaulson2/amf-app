import type { Metadata } from 'next'
import './m02.css'
import FindC from '@/components/soundscape/m02/FindC'
import HomeField from '@/components/soundscape/m02/HomeField'
import SharedWorlds from '@/components/soundscape/m02/SharedWorlds'

export const metadata: Metadata = { title: 'M02 pilot preview — Ajourné into Music', robots: { index: false, follow: false } }

type SP = Promise<{ [k: string]: string | string[] | undefined }>
const STEPS = [
  { id: 'step-1', n: 1, name: 'Find C' },
  { id: 'step-2', n: 2, name: 'C as home' },
  { id: 'step-3', n: 3, name: 'Shared worlds' },
]
const Dots = ({ at }: { at: number }) => (
  <ol className="aj-dots" aria-label={`Step ${at} of 3`}>{STEPS.map(s => <li key={s.id} aria-current={s.n === at ? 'step' : undefined} />)}</ol>
)

// Isolated M02 pilot. Not a lesson, not linked from the site, not deployed. ?state=shown pre-reveals each control (used for screenshots).
export default async function M02Preview({ searchParams }: { searchParams: SP }) {
  const q = await searchParams
  const shown = q.state === 'shown'
  return (
    <div className="aj-scene">
      <img className="aj-atmos aj-atmos--tl" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" width={1376} height={768} />
      <img className="aj-atmos aj-atmos--br" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" width={1376} height={768} />
      <div className="aj-wrap">
        <p className="aj-banner"><b>M02 pilot · preview only</b><span>Isolated branch · not deployed · the real lesson pages are unchanged</span></p>
        <header className="aj-hero">
          <p className="aj-eyebrow">Ajourné into Music · illustrated lesson steps</p>
          <h1>Three steps, <em>drawn into the page</em></h1>
          <p className="aj-lead">The artwork here is painted light only. Every note name, key and shared-note fact is real text or drawing built from the lesson data, so it stays sharp, correct and readable by a screen reader.</p>
          <ul className="aj-chips">{STEPS.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.n} · {s.name}</a></li>)}</ul>
        </header>

        <section id="step-1" className="aj-step" aria-labelledby="step-1-h">
          <div className="aj-grid aj-grid--figure-right">
            <div className="aj-text">
              <p className="aj-eyebrow">Lesson 1A · early</p>
              <h2 id="step-1-h">Find C on your keyboard</h2>
              <p className="aj-sub">Two black keys point the way</p>
              <p className="aj-lead">Look at your keyboard. Some keys are white and some are black, and the black keys are not spread out evenly. They come in small groups: <strong>two together</strong>, then <strong>three together</strong>, then two again. That repeating pattern is a map you can use anywhere on the keyboard.</p>
              <div className="aj-how">
                <ol>
                  <li>Find a group of <strong>two</strong> black keys. In the picture these are the ones under the bracket marked 2.</li>
                  <li>Slide your finger down to the white key <strong>just to the left</strong> of that pair. That key is called <strong>C</strong>.</li>
                  <li>Move along to the next pair of two black keys. The white key just left of it is another C, higher than the first.</li>
                </ol>
              </div>
              <div className="aj-try"><b>Try it on your keyboard</b><p>Find three different Cs on your own keyboard and play each one. Which is lowest, and which is highest? You do not need any numbers.</p></div>
              <p className="aj-notice">What did you look at to find C: the black keys or the white keys?</p>
              <p className="aj-caveat">Where C sits on a particular keyboard varies, and that is fine: the pattern is what matters, not the position.</p>
            </div>
            <FindC initialReveal={shown} />
          </div>
          <nav className="aj-nav" aria-label="Step navigation"><span className="aj-count">Step 1 of 3</span><Dots at={1} /><a className="primary" href="#step-2">Next →</a></nav>
        </section>

        <section id="step-2" className="aj-step" aria-labelledby="step-2-h">
          <div className="aj-grid aj-grid--figure-left">
            <div className="aj-text">
              <p className="aj-eyebrow">Lesson 1A · after you can find C</p>
              <h2 id="step-2-h">C as home</h2>
              <p className="aj-sub">A note we choose to come back to</p>
              <p className="aj-lead">On this journey we have chosen <strong>C</strong> as our <strong>home note</strong>: the sound we return to. In music, that feeling of a resting point is called a <strong>tonal center</strong>. Home is a relationship, not a secret property of C. Another piece could choose a different note as home.</p>
              <div className="aj-how">
                <p>The glowing <strong>C</strong> in the middle is home. The six notes around it are the other white keys on your path from C up to the next C: <strong>D, E, F, G, A, B</strong>. Press <em>Trace the journey</em> to follow the path out from C, through each note, and back home.</p>
              </div>
              <div className="aj-try"><b>Try it on your keyboard</b><p>Play C, D, E, F, G, A, B, then C again, one white key at a time. Then play C D E F G and stop on G. Play it again, and this time end on C. Notice what each stopping place feels like to you. There is no right answer.</p></div>
              <p className="aj-notice">Does ending on C feel different from stopping on G?</p>
              <p className="aj-caveat">One C held by itself does not make a chord or prove a key. It is simply the place we have decided to measure from today.</p>
            </div>
            <HomeField initialTrace={shown} />
          </div>
          <nav className="aj-nav" aria-label="Step navigation"><a href="#step-1">← Back</a><Dots at={2} /><a className="primary" href="#step-3">Next →</a></nav>
        </section>

        <section id="step-3" className="aj-step" aria-labelledby="step-3-h">
          <div className="aj-grid aj-grid--figure-right">
            <div className="aj-text">
              <p className="aj-eyebrow">Week 2 · Lesson 2C (pilot example)</p>
              <h2 id="step-3-h">Same melody, different support</h2>
              <p className="aj-sub">What two situations share, and where they differ</p>
              <p className="aj-lead">In Lesson 2C one short melody, <strong>E, then F, then E</strong>, is played twice. Both times the upper voice does exactly the same thing. Only the lower voice is different: in the first situation it <strong>holds on C</strong> the whole way; in the second it <strong>moves down to B</strong> and back to C.</p>
              <div className="aj-how">
                <p>Each glowing circle is one situation. At the moment the melody sits on <strong>F</strong>, the left situation sounds <strong>C and F</strong>, and the right situation sounds <strong>B and F</strong>. The place where the circles overlap holds what both share: just <strong>one note, F</strong>. Each circle also has a note of its own: C only on the left, B only on the right. On the keyboard, F is five steps above C and six steps above B (count every key, black and white).</p>
              </div>
              <div className="aj-try"><b>Try it on your keyboard</b><p>Play C and F together, then B and F together, keeping F the same. Only the lower note moved. What changed in how the F sits on top?</p></div>
              <p className="aj-notice">Is the F the same note in both? What happened around it?</p>
              <p className="aj-caveat">This is a Week 2 idea: it assumes you already know two voices can sound together. It is not part of Lesson 1A.</p>
            </div>
            <SharedWorlds initialOpen={shown} />
          </div>
          <nav className="aj-nav" aria-label="Step navigation"><a href="#step-2">← Back</a><Dots at={3} /><span className="aj-count">Pilot end</span></nav>
        </section>

        <footer className="aj-prov" aria-labelledby="prov-h">
          <h2 id="prov-h">How this page is built</h2>
          <ul>
            <li><strong>A · atmosphere:</strong> CSS cream wash plus one generated art-only corner piece (used twice), fading across the whole page.</li>
            <li><strong>B · art:</strong> three generated, text-free illustrations on transparent backgrounds, each fading to nothing at its edges. Nothing is a pasted rectangle.</li>
            <li><strong>C · facts:</strong> keyboards, letters, orbs, path and shared-note labels are native SVG/HTML. The shared notes are computed from the Lesson 2C audio fixtures, never typed.</li>
            <li><strong>D · teaching:</strong> the prose, the on-your-keyboard tries and the questions. This site makes no sound.</li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
