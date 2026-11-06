import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE, WEEKS } from '@/lib/soundscape/course'
import { Scene, Wrap, Row, Figure, Lead, Reading, Caveat, Crumbs, CourseReturn } from '@/components/soundscape/m04/kit'
import { LessonCards } from '@/components/soundscape/m04/Cards'

export const metadata: Metadata = {
  title: 'Ajourné into Music — AMF',
  description: 'Ajourné into Music: a creative journey into the language of music, taught on your own keyboard. A course within the Adaptable Musician’s Framework.',
}

export default function SoundscapeLanding() {
  return (
    <Scene>
      <Wrap>
        <Crumbs trail={[{ label: 'Ajourné Home' }]} aside={<span className="m4-crumbs__links"><Link href={`${BASE}/how-it-works`}>How we learn</Link><Link href={`${BASE}/journey`}>The journey</Link><Link href={`${BASE}/week-1`}>Week 1</Link></span>} />
        <header className="m4-hero">
          <Row figure={<Figure id="A04-native" art="M02:G01-B-concentric-home" mode="overlay" sq caption="One note chosen as home, with the others arranged around it." />}>
            <p className="m4-eyebrow">An AMF learning track · Music, imagination &amp; discovery</p>
            <h1 className="m4-wordmark"><span className="script">Ajourné</span> <span className="rest">into Music</span></h1>
            <p className="m4-sub">Make the music you imagine.</p>
            <Lead>You already know what it feels like to be moved by a sound. What if you could understand what gives it that feeling, and find more ways to create it on purpose?</Lead>
            <p>Ajourné into Music is a creative journey into the language of music. You will learn it on your own keyboard, with beautiful pictures that show how notes relate and clear explanations of what you are looking at. No staff notation, no earlier piano lessons: you start by finding a single key.</p>
            <ul className="m4-cta">
              <li><Link className="m4-btn" href={`${BASE}/week-1/lesson-1a`}>Start Lesson 1A</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/how-it-works`}>How we learn</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/journey`}>The eight-week journey</Link></li>
            </ul>
            <p className="m4-sub" style={{ marginTop: 18, fontSize: 16 }}>Weeks 1 and 2 are open now · Three short lessons a week · Move at your own pace</p>
          </Row>
        </header>

        <section className="m4-section" aria-labelledby="learn-h">
          <p className="m4-eyebrow">What you will learn</p>
          <h2 id="learn-h">Three ideas, drawn so you can see them</h2>
          <Lead>Music is made of relationships between notes. Each picture on this site shows one of those relationships, and each comes with the exact keys behind it.</Lead>
          <Row figure={<Figure id="A05-native" caption="Seven names, then the first one again." />}>
            <h3>A note can be a place</h3>
            <p>When one note is held and everything else is heard against it, that note can feel like home. You will learn to find it on any keyboard, name the white keys, and tell the difference between a note that feels settled and one that feels on its way somewhere.</p>
            <Reading label="What the picture shows"><p>Eight white keys, numbered in order: the seven letter names, then the first one again, one step higher. That is the path you walk in Lesson 1A.</p></Reading>
          </Row>
          <Row flip figure={<Figure id="D03-native" art="D03" caption="Four semitones from C to E." />}>
            <h3>Distance can be measured</h3>
            <p>The space between two notes is something you can count. You will learn the smallest step on a keyboard, how to count between any two keys, and what musicians mean by names like a third or a fifth.</p>
            <Reading label="What the picture shows"><p>The keys between C and E, with each step numbered. The painting is a feeling; the numbered hops are the measurement.</p></Reading>
          </Row>
          <Row figure={<Figure id="C01-native" art="C01" caption="One voice holds; three visitors come and go." />}>
            <h3>Voices can stay, and voices can move</h3>
            <p>A voice is a line you can follow through time. You will hear what happens when one voice holds still while another moves, when both move, and when the same melody sits above different support. By Week 2 you will be able to say exactly what changed and what stayed the same.</p>
            <Reading label="What the picture shows"><p>Two bars along a timeline: a long lower bar for the held note, and short upper bars for the notes that visit it.</p></Reading>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="who-h">
          <p className="m4-eyebrow">Who this is for</p>
          <h2 id="who-h">If you can press a key, you can begin</h2>
          <div className="m4-text" style={{ maxWidth: '40rem' }}>
            <p>This course is for curious beginners, for people who play a little but never learned why things work, and for producers and songwriters who want their instincts to have more possibilities. You do not need to read music. You do not need perfect pitch. You do not need a particular emotional response to a sound: two people can hear the same note and imagine very different things, and both are right.</p>
            <p>What you will learn are the relationships that <em>can</em> be measured, such as which note is higher, how many steps apart two notes are, which note stays and which moves. We keep those apart from what you personally feel, so your imagination and your understanding can work together instead of competing.</p>
          </div>
        </section>

        <section className="m4-section" aria-labelledby="setup-h">
          <p className="m4-eyebrow">Your instrument</p>
          <h2 id="setup-h">The keyboard in front of you is the classroom</h2>
          <Row figure={<Figure id="S05-native" art="M02:G02-ACCENT-keyboard-light" caption="A drawing of a keyboard. Play the real one." />}>
            <p>You will need a keyboard, a synthesizer, a digital piano or a small MIDI keyboard connected to any sound source. It can be a modest 25-key instrument. Choose a gentle sustained sound, such as a piano, a soft electric piano or a warm pad, and keep the volume comfortable.</p>
            <p>Everything you hear is something you made, and everything you learn stays in your hands. The pictures explain what to look for; your instrument is where you try it.</p>
            <Reading label="Your first landmark"><p>Look at the black keys: they come in groups of two, then three. The white key just left of any group of two is C. That single landmark is where Lesson 1A begins.</p></Reading>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="method-h">
          <p className="m4-eyebrow">How each step works</p>
          <h2 id="method-h">Read, see, trace, play, notice, create</h2>
          <p className="m4-lead" style={{ maxWidth: '40rem' }}>Every lesson is made of short steps, each built around one idea. A step follows the same rhythm, so you always know what to do next.</p>
          <ol className="m4-method">
            <li><b>Read</b>A plain explanation of one new idea and its name.</li>
            <li><b>See</b>A painting for the feeling, and a drawing of the exact keys.</li>
            <li><b>Trace</b>We walk through one real example, key by key.</li>
            <li><b>Play</b>You try it on your own keyboard.</li>
            <li><b>Notice</b>A question about what you heard. There is no grade.</li>
            <li><b>Create</b>You make something small of your own.</li>
          </ol>
          <p style={{ marginTop: 18 }}><Link href={`${BASE}/how-it-works`} style={{ fontWeight: 600 }}>More about how we learn →</Link></p>
        </section>

        <section className="m4-section" aria-labelledby="lessons-h">
          <p className="m4-eyebrow">Open now</p>
          <h2 id="lessons-h">Your first six lessons</h2>
          <p className="m4-lead" style={{ maxWidth: '40rem' }}>Start with Lesson 1A and follow the lessons in order. Each one ends with a recap you can print, and six optional side doors into history, science, culture and creative practice.</p>
          <LessonCards />
          <Caveat>Pictures on this site always separate two things: the painting, which shows a feeling, and the drawing with numbers and letters, which shows the facts. If a painted shape ever seems to say something the numbers do not, trust the numbers.</Caveat>
        </section>

        <section className="m4-section" aria-labelledby="shape-h">
          <p className="m4-eyebrow">The path ahead</p>
          <h2 id="shape-h">Eight weeks, from one note to a piece of your own</h2>
          <ol className="m4-weeks">
            {WEEKS.map(w => (
              <li key={w.n} className={w.n <= 2 ? 'on' : undefined}>
                <p className="m4-eyebrow">Week {w.n}</p>
                <p><strong>{w.title}</strong></p>
                <p className="m4-soon">{w.n <= 2 ? <Link href={`${BASE}/week-${w.n}`}>Open now →</Link> : 'In preparation'}</p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 16, maxWidth: '40rem' }}>Eight weeks is a suggested path, not a deadline. Weeks 3 to 8 are still being built, and each will appear here when its lessons are ready. <Link href={`${BASE}/journey`}>See the full journey →</Link></p>
        </section>

        <section className="m4-section" aria-labelledby="res-h">
          <p className="m4-eyebrow">Reference</p>
          <h2 id="res-h">The Interval Palette</h2>
          <p style={{ maxWidth: '40rem' }}>When you are ready for it, the Interval Palette is a reference with thirteen interval cards and thirteen deeper chapters. It is never required reading: it is there when you want to look something up. <Link href={`${BASE}/resources/interval-palette`}>Open the Interval Palette →</Link></p>
        </section>
        <CourseReturn items={[{ href: `${BASE}/how-it-works`, label: 'How we learn' }, { href: `${BASE}/journey`, label: 'The journey' }, { href: `${BASE}/week-1`, label: 'Week 1' }]} />
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}
