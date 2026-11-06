'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { Aside, ChoiceCheck, Recap } from './Teach'
import { doorsFrom } from './Doors'
import { drawers } from '@/lib/soundscape/week1/content'
import { G1, G2, G3, G4, G5, G6, G7, ReflectChoices } from './kb/Graphics'
import * as T from '@/lib/soundscape/week1/lesson1a-copy'

const Paras = ({ p }: { p: string[] }) => <div className="sp-prose">{p.map(x => <p key={x.slice(0, 30)}><Md>{x}</Md></p>)}</div>
const DRONE_A = 'https://www.youtube.com/watch?v=N5LqCQHQCGc'
const DRONE_B = 'https://www.youtube.com/watch?v=hhPX4n8rPIU'

function Journey() {
  const steps = [['Find C', 'Use the black keys to find your first named note.'], ['Travel from C to C', 'Learn the white keys and play up and back.'], ['Discover home', 'Stop in different places and notice how it feels.']]
  return (
    <div id="journey" className="scroll-mt-24 mb-8">
      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-0">Today&apos;s journey</h3>
      <ol className="list-none p-0 grid gap-3 sm:grid-cols-3 mt-2" aria-label="Today's journey">
        {steps.map(([t, d], i) => (
          <li key={t} className="sp-card p-4"><p className="sp-eyebrow m-0">Step {i + 1}</p><p className="font-semibold text-slate-900 m-0">{t}</p><p className="text-base sp-muted m-0">{d}</p></li>
        ))}
      </ol>
    </div>
  )
}

function Try({ children }: { children: string }) {
  return <Aside label="Try it on your keyboard">{children}</Aside>
}

function Stage1() {
  return (
    <div>
      <Journey />
      <Paras p={T.S1.p} />
      <G1 />
      <Try>Play one white key near the middle of your keyboard. Then play a key to its right, then a key to its left.</Try>
      <p className="sp-prose"><strong>What changed: how high or low it sounded, or how hard you pressed?</strong></p>
    </div>
  )
}
function Stage2() {
  return (
    <div>
      <Paras p={T.S2.p} />
      <G2 />
      <Try>{"If you can, find three Cs on your real keyboard and play each one. Which is higher, and which is lower? You don't need any numbers."}</Try>
    </div>
  )
}
function Stage3() {
  return (
    <div>
      <Paras p={T.S3.p} />
      <G3 />
      <Try>Travel slowly to the right from C to the next C, saying each name as you play it. Then play back down: C, B, A, G, F, E, D, C. One finger is absolutely fine.</Try>
      <ChoiceCheck q="How many different letter names did we pass before C repeated?" choices={['5', '6', '7', '8']} correct="7" correctText="Seven: C, D, E, F, G, A, B. Then C came back, a little higher. The second C is not a second kind of note." incorrectText="Count the names again: C, D, E, F, G, A, B. That's seven different letters before C comes round again. The second C is the same note name, higher." />
    </div>
  )
}
function Stage4() {
  return (
    <div>
      <Paras p={T.S4.p} />
      <G4 />
      <Try>Play the lower C, then the higher C, then the lower C again. You can hum or sweep your hand upward as you listen.</Try>
    </div>
  )
}
function Stage5() {
  return (
    <div>
      <Paras p={T.S5.p} />
      <G5 />
      <p className="sp-prose"><strong>{T.S5.q}</strong></p>
      <ReflectChoices label="Does the final C feel like a return?" options={['It feels like a return', 'It feels different to me', 'Not sure']} />
    </div>
  )
}
function Stage6() {
  return (
    <div>
      <Paras p={T.S6.p} />
      <G6 />
      <Try>Play the same four notes, C D E G, and end once on D and once on C. Then try ending on E, and on B. Notice your reaction each time.</Try>
    </div>
  )
}
function Stage7() {
  return (
    <div>
      <Paras p={T.S7.p} />
      <div className="grid gap-4 md:grid-cols-2 my-4">
        <div className="sp-card p-4">
          <p className="sp-eyebrow m-0">Option A</p>
          <p className="font-semibold m-0">Hold C on your own keyboard</p>
          <p className="m-0">Hold C on your own synth, or use a sustain, latch or pad sound if your instrument has one, and play the other white keys over it. No special feature is needed: a held finger works.</p>
        </div>
        <div className="sp-card p-4">
          <p className="sp-eyebrow m-0">Option B</p>
          <p className="font-semibold m-0">Open a C drone on YouTube</p>
          <p className="m-0 text-base">Plays on YouTube, in a new tab. The video listed as “C Drone For Musical Practice &amp; Meditation” by Tunes &amp; Tools - Jon Antonsson. Nothing plays on this page.</p>
          <p className="mt-2"><a href={DRONE_A} target="_blank" rel="noopener noreferrer" className="sp-btn">Open a C drone on YouTube<span className="sp-sr-only"> (opens in a new tab)</span> ↗</a></p>
          <p className="m-0 text-sm sp-muted">A softer, more atmospheric option, listed as “C Major Pad” by Vishal Bhojane: <a href={DRONE_B} target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color: '#b45309' }}>open on YouTube<span className="sp-sr-only"> (opens in a new tab)</span> ↗</a>. It is a pad in C major, so it may sound fuller than a single note. Videos can change or disappear; if one does, hold C yourself.</p>
        </div>
      </div>
      <Try>Keep C sounding softly. Play D, E, F, G, A and B one at a time, pausing to return to C. Then try a short three-note idea while C sounds. When you play your own C against the drone, it may feel especially settled.</Try>
      <p className="sp-prose"><strong>Which notes felt like stepping away? Which sounded comfortable with C? Does C feel easier to recognize now?</strong> Whatever you hear is a good answer.</p>
    </div>
  )
}
function Stage8() {
  const [note, setNote] = useState('')
  return (
    <div>
      <Paras p={T.S8.p} />
      <G7 />
      <ReflectChoices label="Which ending do you prefer today?" options={['Ending on C', 'Finishing somewhere else', 'Both, for different reasons']} />
      <label htmlFor="story-note" className="block font-semibold mt-4">A few words about your idea (optional)</label>
      <textarea id="story-note" className="sp-field mt-1" value={note} onChange={e => setNote(e.target.value)} />
      <p className="text-sm sp-muted m-0">This stays in your browser and is gone when you refresh. Nothing is saved or sent.</p>
      <p className="mt-4 flex flex-wrap gap-4 sp-noprint">
        <Link className="sp-btn" href="/curriculum/soundscape-path/week-1/lesson-1b">Continue to Lesson 1B</Link>
        <Link className="sp-btn sp-btn--ghost" href="/curriculum/soundscape-path/week-1">Back to Week 1</Link>
      </p>
    </div>
  )
}

export default function Lesson1A() {
  const d = doorsFrom(drawers('1A') as never, '/soundscape/w1/pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf')
  return (
    <LessonShell
      eyebrow="WEEK 1 · LESSON 1 OF 3"
      title={T.H1}
      intro={
        <div className="space-y-3">
          <p className="m-0 text-lg">{T.DECK}</p>
          <p className="m-0">{T.SETUP}</p>
          <p className="m-0 text-sm">About 20–30 minutes, at your own pace. Everything works with this page muted: you make every sound on your own keyboard.</p>
        </div>
      }
      heroCtas={<><a href="#find-c" className="sp-btn">Find your first C</a><a href="#journey" className="sp-btn sp-btn--ghost" style={{ color: '#fff', borderColor: '#fff' }}>See today’s journey</a></>}
      blocks={[
        { id: 'note', heading: T.S1.h, body: <Stage1 /> },
        { id: 'find-c', heading: T.S2.h, body: <Stage2 /> },
        { id: 'names', heading: T.S3.h, body: <Stage3 /> },
        { id: 'octave', heading: T.S4.h, body: <Stage4 /> },
        { id: 'journey-up', heading: T.S5.h, body: <Stage5 /> },
        { id: 'home', heading: T.S6.h, body: <Stage6 /> },
        { id: 'drone', heading: T.S7.h, body: <Stage7 /> },
        { id: 'story', heading: T.S8.h, body: <Stage8 /> },
        { id: 'recap', heading: 'Recap', body: <Recap title="Today's words">{T.RECAP.map(r => r.replace(/^(\w[\w\s]*?) = /, '**$1** = '))}</Recap> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={d.content}
      doorTitles={d.titles}
      prev={{ href: '/curriculum/soundscape-path/week-1', label: 'Week 1' }}
      next={{ href: '/curriculum/soundscape-path/week-1/lesson-1b', label: 'Lesson 1B' }}
    />
  )
}
