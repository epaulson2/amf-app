import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { Scene, Wrap, Row, Figure, Lead, Reading, Worked, Try, Caveat, Notice } from '@/components/soundscape/m04/kit'

export const metadata: Metadata = { title: 'How We Learn — Ajourné into Music', description: 'How an Ajourné lesson works: pictures, exact keys and your own keyboard.' }

export default function HowItWorks() {
  return (
    <Scene>
      <Wrap>
        <header className="m4-hero">
          <p className="m4-eyebrow">The approach</p>
          <h1>How we’ll learn <em>music together</em></h1>
          <Lead>By seeing relationships, naming them and then making them on your own keyboard, until the theory becomes part of the music you imagine.</Lead>
        </header>

        <section className="m4-section" aria-labelledby="inside-h">
          <p className="m4-eyebrow">Inside a lesson</p>
          <h2 id="inside-h">One idea at a time, in the same six moves</h2>
          <Row>
            <p>Each lesson is a short run of steps. A step teaches one idea, and it always moves the same way, so you never have to guess what is expected.</p>
            <ol className="m4-method" style={{ maxWidth: 'none' }}>
              <li><b>Read</b>We name the idea in plain words and connect it to something you already know.</li>
              <li><b>See</b>A painting gives the feeling; a drawing gives the exact keys, notes or timing.</li>
              <li><b>Trace</b>We follow one real example through the drawing, key by key.</li>
              <li><b>Play</b>You try that same example on your own keyboard.</li>
              <li><b>Notice</b>A question about what you heard. It is never graded.</li>
              <li><b>Create</b>You make something small, so the idea becomes yours.</li>
            </ol>
            <p style={{ marginTop: 18 }}>Steps are ordinary page sections. Use Previous and Next, or jump to any step from the list at the top of the lesson. Nothing locks, nothing times out, and nothing is saved or scored, so you can wander back to anything.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="pics-h">
          <p className="m4-eyebrow">Reading our pictures</p>
          <h2 id="pics-h">Two kinds of picture, always kept apart</h2>
          <Row figure={<Figure id="S12-native" art="M02:G01-B-concentric-home" caption="The symbols used in the lessons." />}>
            <p>Every illustration here is built from two layers. The <strong>painting</strong> is atmosphere: soft light, ripples and ribbons that suggest a feeling. The <strong>drawing</strong> on top of it is exact: real keys, real note names, real counts and real times. The painting helps you remember; the drawing tells you the truth.</p>
            <Reading label="The legend">
              <p>A <strong>glow</strong> marks the note chosen as home in that exercise. A separate <strong>ribbon or bar</strong> is a distinct voice, a line of notes you can follow. Where two shapes <strong>overlap</strong>, that is what the two situations share. A <strong>solid</strong> line means sounding; a <strong>dotted</strong> line means resting or optional. And <strong>numbers</strong> on keys or timelines are the measurement.</p>
            </Reading>
            <Caveat>How large a painted ring is, or what colour it is, never measures anything, and no colour means a particular emotion. Where a painting and a number disagree, believe the number.</Caveat>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="inst-h">
          <p className="m4-eyebrow">Your instrument</p>
          <h2 id="inst-h">This site never makes a sound on purpose</h2>
          <Row flip figure={<Figure id="S05-native" art="M02:G02-ACCENT-keyboard-light" caption="Choose a gentle sound and a comfortable volume." />}>
            <p>There is no play button, no virtual keyboard and no audio on these pages. You make every sound yourself, on any keyboard, synthesizer, digital piano or small MIDI keyboard. That keeps you in charge of what you hear and means everything you learn is already in your hands.</p>
            <Worked label="Before your first lesson">
              <p>Sit at your instrument. Choose a simple, sustained sound, such as a piano, a soft electric piano or a warm pad. Set the volume low enough that you can hear small differences. Find a group of two black keys: the white key just left of it is C. That is all the setup you need.</p>
            </Worked>
            <Try label="Try it now"><ol><li>Choose a gentle sound.</li><li>Play any white key and hold it for a moment.</li><li>Play the key just to its right. Which one sounds higher?</li></ol></Try>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="meas-h">
          <p className="m4-eyebrow">Facts and feelings</p>
          <h2 id="meas-h">What can be measured, and what is yours</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p>You can measure which note is higher, how many keys apart two notes are, which note stays and which moves, and how long a sound lasts. Those things are the same for everyone, so we teach them exactly, and we check every picture against the real keys.</p>
            <p>You cannot measure how a sound should feel. Two people can hear the same pair of notes and imagine a quiet room or a wide open sky, and both are right. We never tell you what to feel. We give you the facts, and then ask what you notice.</p>
            <Notice>Whenever a lesson asks how something feels, there is no correct answer, only a useful observation.</Notice>
          </div>
        </section>

        <section className="m4-section" aria-labelledby="doors-h">
          <p className="m4-eyebrow">Side doors</p>
          <h2 id="doors-h">Your curiosity can take a side path</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p>Music belongs to history, culture, science and personal imagination as much as to theory. Every lesson ends with six optional doors: a <strong>History Postcard</strong>, <strong>Behind the Sound</strong>, an <strong>Ambient Composer’s Notebook</strong>, <strong>Hear It in Real Music</strong>, <strong>Musical Worlds</strong> and <strong>Paint What You Hear</strong>. Real recordings are ordinary links to the musicians’ own pages. They open in a new tab and are never played here.</p>
            <p>The doors are invitations, never homework. Skip them all and the lessons still work.</p>
          </div>
        </section>

        <section className="m4-section" aria-labelledby="free-h">
          <p className="m4-eyebrow">Print and access</p>
          <h2 id="free-h">The point is more freedom</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p>We will help you name the notes, measure the intervals and recognize how a musical idea develops. But you still decide how a piece should feel and where it should go. A beautifully placed pause is as musical as any scale.</p>
            <p>Every picture has a text description for screen readers and a plain print-friendly version, and the pages read well on a phone. Each lesson ends with a recap you can print.</p>
          </div>
          <ul className="m4-cta" style={{ marginTop: 22 }}>
            <li><Link className="m4-btn" href={`${BASE}/week-1/lesson-1a`}>Start Lesson 1A</Link></li>
            <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/journey`}>See the eight-week journey</Link></li>
          </ul>
        </section>
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}
