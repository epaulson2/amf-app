'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { BlankLines } from '../ViewMode'
import { Aside, Checks, Paras, Recap, Steps } from '../week1/Teach'
import Fig from '../week1/Fig'
import { M2AV1, M2AV2, M2AV3, M2AV4 } from '../visual/Week2Moments'
import { CompactPalette } from '../resources/Palette'
import { doorsFrom } from '../week1/Doors'
import { ClipButton, NowPlaying, PairKeys, StopButton, TraceHops, Choice } from './Parts'
import { W2, copy, all, field, ticks, quoted, drawers } from '@/lib/soundscape/week2/content'
import { A, M } from '@/lib/soundscape/week2/fixtures'
import { solo } from '@/lib/soundscape/week1/fixtures'

const L = '2A' as const
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)

function HearTeaching() {
  return (
    <div>
      <Paras paras={W2.a_hear.paras} />
      <M2AV1 />
      <Aside label="Guided demonstration">{W2.a_hear.guided}</Aside>
      <Checks items={W2.a_hear.checks} />
    </div>
  )
}

function Meet() {
  const [together, setTogether] = useState(false)
  const [notes, setNotes] = useState(false)
  const [heard, setHeard] = useState(false)
  const shown = notes || together
  return (
    <div>
      <p className="sp-prose">{c('A', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="a1" label="Hear C alone" events={A.C} status="Now playing C4 alone: the lower voice" onPlayed={() => setHeard(true)} />
        <ClipButton id="a2" label="Hear E alone" events={A.E} status="Now playing E4 alone: the upper voice" onPlayed={() => setHeard(true)} />
        <ClipButton id="a3" label="Hear C and E together" events={A.together} status="Now playing C4 and E4 together: a major third" onPlayed={() => { setTogether(true); setHeard(true) }} />
        <StopButton />
      </div>
      <NowPlaying />
      {together && <p className="sp-callout max-w-2xl"><Md>{c('A', 'After paired playback')}</Md></p>}
      <p className="sp-prose"><strong>{c('A', 'Reflection')}</strong></p>
      <p className="sp-prose sp-muted">{c('A', 'Visible pedagogical note')}</p>
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={shown} onClick={() => setNotes(v => !v)}>{shown ? 'Notes shown' : 'Show the notes'}</button>
      {!heard && !shown && <p className="text-sm sp-muted mt-2">If you cannot play sound, choose “Show the notes”: the lower voice is C4 and the upper voice is E4.</p>}
      {shown && <Fig folder="w2" file="W2-01_starting-dyad_instructor.svg" caption="C4 below, E4 above: two voices, four semitones apart." />}
      {!shown && <Fig folder="w2" file="W2-01_starting-dyad_learner.svg" />}
    </div>
  )
}

function Distance() {
  const t = W2.a_interval
  const [pair, setPair] = useState<'CE' | 'EG' | null>(null)
  const summaries = ticks(field(L, 'B', 'Inline summary'))
  const p = pair === 'EG' ? [M.E4, M.G4] : [M.C4, M.E4]
  return (
    <div>
      <p className="sp-prose"><Md>{c('B', 'Copy', 0)}</Md></p>
      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-6">{t.h2}</h3>
      <Paras paras={t.paras.slice(0, 4)} />
      <table className="w-full max-w-2xl text-left border-collapse my-4">
        <caption className="text-left font-semibold mb-2">Worked comparison</caption>
        <thead><tr className="border-b border-slate-300"><th className="py-1">Pair</th></tr></thead>
        <tbody>{t.worked.map(w => <tr key={w} className="border-b border-slate-200"><td className="py-2"><Md>{w}</Md></td></tr>)}</tbody>
      </table>
      <Paras paras={t.paras.slice(4)} />
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Step by step</h3>
      <Steps items={t.steps} />
      <M2AV2 />
      <Checks items={t.checks} />

      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-8">{c('B', 'Step 1 heading', 0)}</h3>
      <p className="sp-prose"><Md>{c('B', 'Copy', 1)}</Md></p>
      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-4">{c('B', 'Step 2 heading', 0)}</h3>
      <p className="sp-prose"><Md>{c('B', 'Copy', 2)}</Md></p>
      <TraceHops from={M.C4} to={M.E4} events={A.together} />
      <p className="sp-prose"><Md>{c('B', 'Compare')}</Md></p>
      <div className="flex flex-wrap gap-3 mb-2">
        <button type="button" className="sp-btn" aria-pressed={pair === 'CE'} onClick={() => setPair('CE')}>Build C–E</button>
        <button type="button" className="sp-btn" aria-pressed={pair === 'EG'} onClick={() => setPair('EG')}>Build E–G</button>
        <ClipButton id="diff" label="Hear the difference" events={[...A.together, ...A.EG.map(e => ({ ...e, start: e.start + 4.6 }))]} status="Now playing C4 with E4, then E4 with G4" ghost />
        <StopButton />
      </div>
      <NowPlaying />
      {pair && <PairKeys lower={p[0]} upper={p[1]} title={`Keyboard with ${pair === 'CE' ? 'C4 and E4' : 'E4 and G4'} outlined`} />}
      <ul className="list-none p-0 sp-prose">{summaries.map(s => <li key={s} className="font-semibold">{s}</li>)}</ul>
      <p className="sp-prose sp-muted">{c('B', 'Accessible definition')}</p>
      <Choice field={field(L, 'B', 'Non-graded question')} answer="4" />
    </div>
  )
}

function PaletteTeaching() {
  return (
    <div>
      <Paras paras={W2.a_palette.paras} />
      <Aside label="Worked listening cue">{W2.a_palette.cue}</Aside>
      <M2AV4 />
    </div>
  )
}

function PaletteBlock() {
  const ctx = c('palette', 'Small context note (exact)')
  const after = c('palette', 'After trying one (exact)')
  return (
    <div>
      <p className="sp-prose">{c('palette', 'Intro (exact)')}</p>
      <CompactPalette afterTry={after} />
      <p className="sp-prose sp-muted mt-4">{ctx}</p>
    </div>
  )
}

function Upper() {
  const [heard, setHeard] = useState(false)
  const [rev, setRev] = useState(false)
  const notation = ticks(field(L, 'C', 'Notation'))
  return (
    <div>
      <p className="sp-prose">{c('C', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c-up" label="Hear upper E move to F" events={A.upperEF} status="Now playing C4 held while the upper voice moves from E4 to F4" onPlayed={() => setHeard(true)} />
        <ClipButton id="c-ce" label="Replay C–E" events={A.together} status="Now playing C4 and E4 together" ghost />
        <ClipButton id="c-cf" label="Hear C–F" events={[{ midi: M.C4, start: 0, dur: 3, role: 'drone' }, { midi: M.F4, start: 0, dur: 3, role: 'melody' }]} status="Now playing C4 and F4 together" ghost />
        <StopButton />
      </div>
      <NowPlaying />
      {!heard && <p className="text-sm sp-muted">If you cannot play sound, reveal the answer below.</p>}
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the answer' : 'Reveal the answer in text'}</button>
      {(heard || rev) && (
        <div className="mt-3">
          <p className="sp-callout max-w-2xl"><Md>{c('C', 'After listening')}</Md></p>
          <p className="font-semibold">{notation[0]} <span className="sp-muted font-normal">·</span> {notation[1]}</p>
          <Fig folder="w2" file="W2-02_dyad-transformations_instructor.svg" caption="The five transformations; the first panel is this one." />
        </div>
      )}
      <p className="sp-prose mt-4">{c('C', 'Prompt')}</p>
    </div>
  )
}

function Lower() {
  const [r1, setR1] = useState(false)
  const [r2, setR2] = useState(false)
  const [both, setBoth] = useState(false)
  const n1 = ticks(field(L, 'D', 'Comparison 1 reveal'))[0], n2 = ticks(field(L, 'D', 'Comparison 2 reveal'))[0]
  const t1 = quoted(field(L, 'D', 'Comparison 1 reveal'))[0], t2 = quoted(field(L, 'D', 'Comparison 2 reveal'))[0]
  return (
    <div>
      <p className="sp-prose">{c('D', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="d1" label="Hear lower C move to B" events={A.lowerCB} status="Now playing E4 held while the lower voice moves from C4 down to B3" onPlayed={() => { setR1(true); setBoth(true) }} />
        <ClipButton id="d2" label="Hear lower C move up to D" events={A.lowerCD} status="Now playing E4 held while the lower voice moves from C4 up to D4" onPlayed={() => { setR2(true); setBoth(true) }} />
        <StopButton />
      </div>
      <NowPlaying />
      <div className="flex flex-wrap gap-3">
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => { setR1(true); setR2(true); setBoth(true) }}>Reveal both in text</button>
      </div>
      {r1 && <div className="mt-3"><p className="font-semibold m-0">{n1}</p><p className="sp-callout max-w-2xl"><Md>{t1}</Md></p></div>}
      {r2 && <div className="mt-3"><p className="font-semibold m-0">{n2}</p><p className="sp-callout max-w-2xl"><Md>{t2}</Md></p></div>}
      {both && <p className="sp-prose"><strong><Md>{c('D', 'Summary')}</Md></strong></p>}
      <Choice field={field(L, 'D', 'Non-graded check')} answer="Lower" />
    </div>
  )
}

function KeyboardLanguage() {
  const [labels, setLabels] = useState(true)
  const [dist, setDist] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('E', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-3">
        <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={labels} onClick={() => setLabels(v => !v)}>{labels ? 'Hide labels' : 'Show the keyboard'}</button>
        <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={dist} onClick={() => setDist(v => !v)}>Reveal the distance</button>
      </div>
      <PairKeys lower={M.C4} upper={dist ? M.F4 : M.E4} title="Keyboard with the lower C4 and the upper note outlined" names={labels} />
      {dist && <p role="status" className="sp-callout max-w-2xl"><Md>{`C4 to E4: four semitones, a major third. When E rises to F, the pair becomes C4 to F4: five semitones, a perfect fourth.`}</Md></p>}
      <p className="sp-prose sp-muted">{c('E', 'Small Ploger-informed cue')}</p>
      <Fig folder="w2" file="W2-06_two-lines-on-one-keyboard_learner.svg" />
    </div>
  )
}

function Studio() {
  const [done, setDone] = useState(false)
  const steps = ticks(field(L, 'F', 'Steps'))
  return (
    <div>
      <p className="sp-prose">{c('F', 'Copy')}</p>
      <ul className="sp-prose pl-5 list-disc">{steps.map(s => <li key={s}>{s}</li>)}</ul>
      <p className="sp-prose">{c('F', 'Assignment')}</p>
      <p className="sp-prose sp-muted">{c('F', 'What to keep')}</p>
      <button type="button" className="sp-btn" aria-pressed={done} onClick={() => setDone(true)}>{ticks(field(L, 'F', 'Completion CTA'))[0]}</button>
      <p className="text-sm sp-muted">This only marks your place on this page. Nothing is saved or sent.</p>
      {done && <p role="status" className="sp-prose mt-3"><em>{c('F', 'Closing')}</em></p>}
      <BlankLines n={2} />
      <p className="mt-4 flex flex-wrap gap-4 sp-noprint">
        <Link className="sp-btn" href="/curriculum/soundscape-path/week-2/lesson-2b">Continue to Lesson 2B</Link>
        <a className="sp-btn sp-btn--ghost" href="/soundscape/w2/pdf/W2-02_dyad-transformations_blank.pdf">Download the practice sheet (PDF)</a>
      </p>
    </div>
  )
}

function Choice2() {
  return (
    <div>
      <Paras paras={W2.a_choice.paras} />
    </div>
  )
}

export default function Lesson2A() {
  const d = doorsFrom(drawers(L) as never, '/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf')
  void solo; void all; void BlankLines
  return (
    <LessonShell
      audio
      eyebrow={c('Hero', 'Eyebrow')}
      title={c('Hero', 'H1')}
      intro={
        <div className="space-y-2">
          <p className="m-0 text-lg">{c('Hero', 'Deck')}</p>
          <p className="m-0 text-sm">{c('Hero', 'Estimated time')}</p>
          <p className="m-0"><strong>What you’ll learn.</strong> {c('Hero', "What You'll Learn")}</p>
          <p className="m-0 italic">{c('Hero', 'Recap line')}</p>
        </div>
      }
      heroCtas={<a href="#hear" className="sp-btn">Hear two voices</a>}
      blocks={[
        { id: 'hear', heading: W2.a_hear.h2, body: <HearTeaching /> },
        { id: 'meet', heading: c('A', 'H2'), body: <Meet /> },
        { id: 'distance', heading: c('B', 'H2'), body: <Distance /> },
        { id: 'palette-teach', heading: W2.a_palette.h2, body: <PaletteTeaching /> },
        { id: 'palette', heading: c('palette', 'H2 — exact learner copy'), body: <PaletteBlock /> },
        { id: 'upper', heading: c('C', 'H2'), body: <Upper /> },
        { id: 'oblique', heading: W2.a_oblique.h2, body: <div><Paras paras={W2.a_oblique.paras} /><Checks items={W2.a_oblique.checks} /></div> },
        { id: 'lower', heading: c('D', 'H2'), body: <Lower /> },
        { id: 'bass', heading: W2.a_bass.h2, body: <div><Paras paras={W2.a_bass.paras} /><M2AV3 /><Aside label="Worked three-way comparison">{W2.a_bass.worked}</Aside><Checks items={W2.a_bass.checks} /></div> },
        { id: 'keyboard', heading: c('E', 'H2'), body: <KeyboardLanguage /> },
        { id: 'choice', heading: W2.a_choice.h2, body: <Choice2 /> },
        { id: 'studio', heading: c('F', 'H2'), body: <Studio /> },
        { id: 'recap', heading: 'Recap', body: <Recap title="What you learned today">{W2.a_choice.recap}</Recap> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={d.content}
      doorTitles={d.titles}
      prev={{ href: '/curriculum/soundscape-path/week-2', label: 'Week 2' }}
      next={{ href: '/curriculum/soundscape-path/week-2/lesson-2b', label: 'Lesson 2B' }}
    />
  )
}
