import type { Metadata } from 'next'
import Link from 'next/link'
import { BASE } from '@/lib/soundscape/course'
import { Scene, Wrap, Row, Figure, ArtOnly, Lead, Crumbs, HOME_CRUMB, CourseReturn } from '@/components/soundscape/m04/kit'
import { DOOR_KINDS } from '@/components/soundscape/DiscoveryDoor'

export const metadata: Metadata = {
  title: 'How We Learn — Ajourné into Music',
  description: 'The learning philosophy behind Ajourné into Music: music as relationships, an ear and a keyboard that learn together, and small choices that become your own music.',
}

export default function HowItWorks() {
  return (
    <Scene>
      <Wrap>
        <Crumbs trail={[HOME_CRUMB, { label: 'How We Learn' }]} aside={<Link href={BASE} className="m4-crumbs__back">← Ajourné Home</Link>} />

        <header className="m4-hero">
          <Row figure={<Figure id="A04-native" art="M02:G01-B-concentric-home" mode="overlay" sq caption="One note becomes home; the others arrange themselves around it." />}>
            <p className="m4-eyebrow">How we learn</p>
            <h1 style={{ fontSize: 'clamp(34px, 4.4vw, 60px)' }}>Discover music by understanding <em>how its parts belong together</em></h1>
            <p>Music isn’t just a collection of notes, scales and chords to memorize. It’s a living conversation between sounds: one note begins to feel like home, another takes us somewhere new; one voice holds a familiar place while another moves; two different harmonies can share a note and still tell different stories.</p>
            <p>Ajourné begins with those relationships. We start with something small enough to hear and imagine, follow it on the keyboard, give it an accurate musical name, and learn what we can do with it. Rather than separating theory from creativity, we let understanding grow out of the music you’re making.</p>
            <p>You don’t need to arrive knowing how to read a score or play a piece. You bring something useful from the beginning: your capacity to notice, wonder, remember and make choices.</p>
            <ul className="m4-cta">
              <li><Link className="m4-btn" href={`${BASE}/week-1`}>Begin Week 1 — Finding Home</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={BASE}>Return to Ajourné Home</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/journey`}>See the course journey</Link></li>
            </ul>
          </Row>
        </header>

        <section className="m4-section" aria-labelledby="ear-h">
          <Row flip figure={<Figure id="A03-native" art="M02:G02-ACCENT-keyboard-light" caption="Find the pattern, then find the notes." />}>
            <p className="m4-eyebrow">Ear, imagination and hands</p>
            <h2 id="ear-h">Your ear, your imagination and your hands learn together</h2>
            <p>You might first notice that a sound feels like a point of rest or that a little melody seems to rise. That observation matters. We’ll help you test it by playing the notes, finding their positions on your instrument and seeing what actually changed.</p>
            <p>Then we add the musical vocabulary: <strong>pitch</strong>, <strong>interval</strong>, <strong>tonal center</strong>, <strong>melody</strong>, <strong>harmony</strong>. Not as a list of definitions to recite, but as names for patterns you can already begin to recognize. We return to these patterns from different angles until they become available to you naturally when you play.</p>
            <p>A picture can give shape to an idea; a keyboard can give it exact notes; your ears can tell you what it becomes in sound. Each way of understanding supports the others.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="rel-h">
          <Row figure={<Figure id="C01-native" art="C01" caption="One voice holds; another comes and goes." />}>
            <p className="m4-eyebrow">Small ideas, large possibilities</p>
            <h2 id="rel-h">Learn one relationship. Discover what it can become.</h2>
            <p>A musical idea doesn’t need to be large to be powerful. Two notes can show a distance. One note staying while another moves can begin a harmony. A little pattern can return and become a motif. Move just one note, or leave a longer silence, and you’ve made a meaningful compositional choice.</p>
            <p>Our lessons build carefully from these small discoveries. We explain a concept, trace a real musical example, and invite you to explore the same relationship on your own keyboard. Then we ask a more interesting question: <strong>what could you make from it?</strong></p>
            <p>This is structured learning with room for imagination. The fundamentals are real and systematic. The music you make with them is yours.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="map-h">
          <Row flip figure={<Figure id="F04-native" art="M02:G03-B-shared-worlds" mode="overlay" caption="Two situations, and the one note they share." />}>
            <p className="m4-eyebrow">The map and the territory</p>
            <h2 id="map-h">See the music as a journey, without mistaking the map for the territory</h2>
            <p>We use translucent illustrations, pathways, overlapping fields and little musical worlds because relationships are often easier to understand when you can see them. A familiar note can become a point of reference. A moving melody can become a journey. Shared notes can appear as connected spaces.</p>
            <p>But our artwork is never a replacement for musical facts. Accurate keys, note names and distances are shown clearly alongside it. When we’re learning an interval, we can count the precise keys. When we’re exploring how the sound feels, there is room for different interpretations. Both precision and imagination belong in the same lesson.</p>
            <p>Look at the image, read its musical story, find the actual notes, and see what you discover when you play them.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="choose-h">
          <Row figure={<Figure id="A08-native" art="A08" caption="The same start, two different places to stop." />}>
            <p className="m4-eyebrow">Notice and choose</p>
            <h2 id="choose-h">Become a musician who can notice, and choose</h2>
            <p>We aren’t trying to turn everyone into someone who performs the same exercise in the same way. We want you to recognize possibilities. Why did that note feel like a return? What stayed constant while the harmony changed? How could a small melody become more expressive if you held one note longer, changed one interval or let silence speak?</p>
            <p>The goal is an increasingly connected musical understanding: hearing a pattern, understanding its parts and making an intentional contribution of your own. Sometimes the best choice is adding a sound. Sometimes it’s letting one stay. Sometimes it’s leaving space.</p>
            <p>A learner who can hear and make those choices is already thinking like a musician.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="world-h">
          <Row flip figure={<ArtOnly art="X03" />}>
            <p className="m4-eyebrow">Beyond the notes</p>
            <h2 id="world-h">Music is bigger than any one set of notes</h2>
            <p>Every musical relationship lives inside a much wider human story. Musical traditions have developed different ways to shape melody, rhythm, texture, memory and meaning. Composers and performers have explored these possibilities across centuries and cultures, and art and science offer other valuable ways to pay attention.</p>
            <p>That’s why every lesson offers <strong>six optional doors</strong>: {DOOR_KINDS.map((d, i) => <span key={d.id}>{i > 0 ? (i === DOOR_KINDS.length - 1 ? ', and ' : ', ') : ''}{d.title.toLowerCase()}</span>)}. They’re invitations to connect your discoveries to other musical experiences. They are not detours you must complete, and they never replace the lessons or hide essential definitions.</p>
            <p>You can follow the main path at your own pace and open whichever doors stir your curiosity.</p>
          </Row>
        </section>

        <section className="m4-section" aria-labelledby="begin-h">
          <Row figure={<Figure id="S06-native" art="S06" caption="Find a note, travel, add a voice." />}>
            <p className="m4-eyebrow">Where to begin</p>
            <h2 id="begin-h">Your own little musical world begins with one note</h2>
            <p>In Week 1 you’ll find a note, follow it across the keyboard and hear how it relates to another moving voice. In Week 2, those relationships will become clearer through intervals, shared notes and the ways voices travel together.</p>
            <p>We will take one understandable step at a time. You can revisit a step, wander into an optional musical story, or sit with an idea at your keyboard before moving on. By the end you won’t only know more musical words. You’ll have heard and made the relationships they describe.</p>
            <ul className="m4-cta">
              <li><Link className="m4-btn" href={`${BASE}/week-1`}>Begin Week 1 — Finding Home</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={BASE}>Return to Ajourné Home</Link></li>
              <li><Link className="m4-btn m4-btn--ghost" href={`${BASE}/journey`}>See the course journey</Link></li>
            </ul>
            <div className="m4-need"><b>What you’ll need</b>A keyboard, piano, synth or MIDI keyboard you can play. Choose a comfortable volume and a sound you enjoy. Everything else is explained when you need it. Recordings mentioned in the optional doors are ordinary credited links.</div>
          </Row>
        </section>

        <CourseReturn items={[{ href: BASE, label: 'Ajourné Home' }, { href: `${BASE}/journey`, label: 'The journey' }, { href: `${BASE}/week-1`, label: 'Week 1' }]} />
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}
