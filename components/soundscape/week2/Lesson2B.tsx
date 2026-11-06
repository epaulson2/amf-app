'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { BlankLines } from '../ViewMode'
import { Aside, Checks, Paras, Recap } from '../week1/Teach'
import Fig from '../week1/Fig'
import { M2BV1, M2BV2, M2BV3 } from '../visual/Week2Moments'
import EventTimeline from '../visual/EventTimeline'
import { tracksOf } from '../visual/shared'
import { doorsFrom } from '../week1/Doors'
import { ClipButton, NowPlaying, PairKeys, StopButton, Choice } from './Parts'
import { W2, copy, field, ticks, quoted, drawers } from '@/lib/soundscape/week2/content'
import { B, FIVE, M } from '@/lib/soundscape/week2/fixtures'
import { solo } from '@/lib/soundscape/week1/fixtures'
import { ChoiceCheck } from '../week1/Teach'

const L = '2B' as const
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)
const def = (label: string) => ({ term: ticks(field(L, 'B', label))[0], text: quoted(field(L, 'B', label))[0] })
const BASE = '/curriculum/soundscape-path'

function FirstListen() {
  const [heard, setHeard] = useState(false)
  const [paths, setPaths] = useState(false)
  const aloneEvents = [...solo(B.apart, 'foundation'), ...solo(B.apart, 'upper').map(e => ({ ...e, start: e.start + 6.2 }))]
  return (
    <div>
      <p className="sp-prose">{c('A', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="a-apart" label="Hear two voices move apart" events={B.apart} status="Now playing C4 and E4, then both voices change" onPlayed={() => setHeard(true)} />
        <ClipButton id="a-climb" label="Hear two voices climb" events={B.climb} status="Now playing C4 and E4, then both voices change" onPlayed={() => setHeard(true)} />
        <ClipButton id="a-alone" label="Hear each voice alone" events={aloneEvents} status="Now playing the lower voice, then the upper voice, of the first example" ghost onPlayed={() => setHeard(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      {heard && <p className="sp-callout max-w-2xl"><Md>{c('A', 'After listening')}</Md></p>}
      <p className="sp-prose"><strong>{c('A', 'Question')}</strong></p>
      <Choice2 labels={ticks(field(L, 'A', 'Choices')).slice(0, 3)} />
      <button type="button" className="sp-btn" aria-expanded={paths} onClick={() => setPaths(v => !v)}>{paths ? 'Hide the two paths' : 'Reveal the two paths'}</button>
      {paths && <Fig folder="w2" file="W2-02_dyad-transformations_instructor.svg" caption="Both examples start from the same C4 and E4." />}
    </div>
  )
}

function Choice2({ labels }: { labels: string[] }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div role="group" aria-label="What did you hear?" className="flex flex-wrap gap-2 my-3">
      {labels.map(o => <button key={o} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
    </div>
  )
}

function FourWays() {
  const t = W2.b_four
  return (
    <div>
      <Paras paras={t.paras} />
      <table className="w-full max-w-3xl text-left border-collapse my-4">
        <caption className="text-left font-semibold mb-2">Worked examples, all from C4+E4</caption>
        <tbody>{t.table.map(r => <tr key={r} className="border-b border-slate-200"><td className="py-2"><Md>{r}</Md></td></tr>)}</tbody>
      </table>
      <p className="sp-prose sp-muted"><Md>{t.note}</Md></p>
      <M2BV1 />
      <Aside label="Understand it">{t.understand}</Aside>
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Check your understanding</h3>
      <Checks items={t.checks} />
    </div>
  )
}

function Families() {
  const [shown, setShown] = useState<string | null>(null)
  const defs = ['Definition 1', 'Definition 2', 'Definition 3'].map(def)
  return (
    <div>
      <p className="sp-prose">{c('B', 'Body')}</p>
      <dl className="grid gap-3 md:grid-cols-3 my-4">
        {defs.map(d => <div key={d.term} className="sp-card p-4"><dt className="font-semibold">{d.term}</dt><dd className="m-0"><Md>{d.text}</Md></dd></div>)}
      </dl>
      <p className="sp-callout max-w-2xl"><Md>{c('B', 'Nuance card')}</Md></p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="f-ob" label="Compare oblique" events={B.upperRises} status="Now playing oblique motion: C holds while E rises to F" onPlayed={() => setShown('ob')} />
        <ClipButton id="f-co" label="Compare contrary" events={B.apart} status="Now playing contrary motion: C falls to B while E rises to F" onPlayed={() => setShown('co')} />
        <ClipButton id="f-si" label="Compare similar" events={B.climb} status="Now playing similar motion: C rises to D while E rises to F" onPlayed={() => setShown('si')} />
        <StopButton />
      </div>
      <NowPlaying />
      {shown && <Fig folder="w2" file="W2-03_motion-types_instructor.svg" caption="Oblique, contrary and similar, drawn from the same starting pair." />}
      {!shown && <Fig folder="w2" file="W2-03_motion-types_learner.svg" />}
      <p className="sp-prose"><strong>Text version.</strong> {c('B', 'Text fallback')}</p>
      <p className="sp-prose sp-muted">{c('B', 'Painting/tactile alternate')}</p>
    </div>
  )
}

function Contrary() {
  const [heard, setHeard] = useState(false)
  const [rev, setRev] = useState(false)
  const summary = ticks(field(L, 'C', 'Core summary'))[0]
  return (
    <div>
      <p className="sp-prose">{c('C', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c-con" label="Hear contrary motion" events={B.apart} status="Now playing C4 and E4, then C falls to B3 while E rises to F4" onPlayed={() => setHeard(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the answer' : 'Reveal the answer in text'}</button>
      {(heard || rev) && (
        <div className="mt-3">
          <p className="sp-callout max-w-2xl"><Md>{c('C', 'After listening')}</Md></p>
          <p className="sp-prose"><Md>{c('C', 'Keyboard reveal')}</Md></p>
          <p className="font-semibold">{summary}</p>
          <PairKeys lower={M.B3} upper={M.F4} title="Keyboard with B3 and F4 outlined: six semitones apart" />
          <Fig folder="w2" file="W2-06_two-lines-on-one-keyboard_instructor.svg" caption="Two lines on one keyboard, with their distances." />
        </div>
      )}
      <p className="sp-prose mt-4">{c('C', 'Reflect')}</p>
    </div>
  )
}

function Similar() {
  const [heard, setHeard] = useState(false)
  const [rev, setRev] = useState(false)
  const summary = ticks(field(L, 'D', 'Core summary'))[0]
  return (
    <div>
      <p className="sp-prose">{c('D', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="d-sim" label="Hear both voices climb" events={B.climb} status="Now playing C4 and E4, then C rises to D4 while E rises to F4" onPlayed={() => setHeard(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the answer' : 'Reveal the answer in text'}</button>
      {(heard || rev) && (
        <div className="mt-3">
          <p className="sp-callout max-w-2xl"><Md>{c('D', 'After listening')}</Md></p>
          <p className="font-semibold">{summary}</p>
          <p className="sp-prose sp-muted"><Md>{c('D', 'Theory whisper')}</Md></p>
        </div>
      )}
      <p className="sp-prose mt-2">{c('D', 'Prompt')}</p>
    </div>
  )
}

function FiveWays() {
  const [shown, setShown] = useState<Record<string, boolean>>({})
  const checks = ['Knowledge check (not gating)', 'Knowledge check']
  return (
    <div>
      <p className="sp-prose">{c('E', 'Body')}</p>
      <M2BV2 />
      <div className="flex flex-wrap gap-3 mb-2">
        {FIVE.map(f => <ClipButton key={f.id} id={f.id} label={f.label} events={f.events as never} status={`Now playing: ${f.label}, starting from C4 and E4`} onPlayed={() => setShown(s => ({ ...s, [f.id]: true }))} />)}
        <StopButton />
      </div>
      <NowPlaying />
      <div className="flex flex-wrap gap-3 my-2"><button type="button" className="sp-btn sp-btn--ghost" onClick={() => setShown(Object.fromEntries(FIVE.map(f => [f.id, true])))}>Reveal all five in text</button></div>
      <table className="w-full max-w-3xl text-left border-collapse my-3">
        <caption className="text-left font-semibold mb-2">The five changes, each from C4+E4 (a major third, 4 semitones)</caption>
        <thead><tr className="border-b border-slate-300"><th className="py-1 pr-3">Example</th><th className="py-1 pr-3">Becomes</th><th className="py-1 pr-3">Motion</th><th className="py-1">Interval</th></tr></thead>
        <tbody>
          {FIVE.map(f => (
            <tr key={f.id} className="border-b border-slate-200 align-top">
              <th scope="row" className="py-2 pr-3 font-medium">{f.label}</th>
              {shown[f.id] ? <><td className="py-2 pr-3">{f.to}</td><td className="py-2 pr-3">{f.motion}</td><td className="py-2">{f.interval} · {f.semis}</td></> : <td colSpan={3} className="py-2 sp-muted">Listen first, or reveal.</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sp-prose"><strong>{c('E', 'Prompt')}</strong></p>
      <Choice field={field(L, 'E', checks[0])} answer="Contrary" />
      <Choice field={field(L, 'E', checks[1])} answer="They move different distances" />
      {Object.keys(shown).length > 0 && <Fig folder="w2" file="W2-02_dyad-transformations_instructor.svg" caption="All five transformations, with their intervals." />}
    </div>
  )
}

function Path() {
  const [done, setDone] = useState(false)
  const [labels, setLabels] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('F', 'Body')}</p>
      <p className="sp-prose">{c('F', 'Instruction')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="f-path" label="Hear the example path" events={B.path} status="Now playing C4+E4, C4+F4, B3+F4, then C4+E4" />
        <ClipButton id="f-pl" label="Lower voice only" events={solo(B.path, 'foundation')} status="Now playing only the lower voice of the example path" ghost />
        <ClipButton id="f-pu" label="Upper voice only" events={solo(B.path, 'upper')} status="Now playing only the upper voice of the example path" ghost />
        <StopButton />
      </div>
      <NowPlaying />
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={labels} onClick={() => setLabels(v => !v)}>{labels ? 'Hide interval labels' : 'Show interval labels'}</button>
      {labels && <p role="status" className="sp-callout max-w-2xl"><Md>**C4+E4** major third, 4 semitones → **C4+F4** perfect fourth, 5 → **B3+F4** diminished fifth, 6 → **C4+E4** major third, 4.</Md></p>}
      <p className="sp-prose mt-3">{c('F', 'Reflect')}</p>
      <p className="sp-prose">{c('F', 'Assignment')}</p>
      <p className="text-sm sp-muted">{ticks(field(L, 'F', 'Save names in her DAW, optional')).join(' and ')}: names you can use for your own files, if you like. Nothing is uploaded here.</p>
      <button type="button" className="sp-btn" aria-pressed={done} onClick={() => setDone(true)}>{ticks(field(L, 'F', 'CTA'))[0]}</button>
      <p className="text-sm sp-muted">This only marks your place on this page. Nothing is saved or sent.</p>
      {done && <p role="status" className="sp-prose mt-3"><em>{c('F', 'Closing')}</em></p>}
      <BlankLines n={2} />
      <p className="mt-4 flex flex-wrap gap-4 sp-noprint">
        <Link className="sp-btn" href={`${BASE}/week-2/lesson-2c`}>Continue to Lesson 2C</Link>
        <a className="sp-btn sp-btn--ghost" href="/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf">Download the two-voice path sheet (PDF)</a>
      </p>
    </div>
  )
}

export default function Lesson2B() {
  const d = doorsFrom(drawers(L) as never, '/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf')
  void ChoiceCheck
  return (
    <LessonShell
      audio
      eyebrow={c('Hero', 'Eyebrow')}
      title={c('Hero', 'H1')}
      intro={
        <div className="space-y-2">
          <p className="m-0 text-lg">{c('Hero', 'Deck')}</p>
          <p className="m-0 text-sm">{c('Hero', 'Time')}</p>
          <p className="m-0"><strong>What you’ll learn.</strong> {c('Hero', "What You'll Learn")}</p>
          <p className="m-0 italic">{c('Hero', 'Recap')}</p>
        </div>
      }
      heroCtas={<a href="#what" className="sp-btn">Listen to two paths</a>}
      blocks={[
        { id: 'what', heading: W2.b_what.h2, body: <div><Paras paras={W2.b_what.paras} /><EventTimeline title="A preview: two voices travelling through four moments" total={10} tracks={tracksOf(B.path, { lower: 'Lower voice', upper: 'Upper voice' })} /></div> },
        { id: 'watch', heading: c('A', 'H2'), body: <FirstListen /> },
        { id: 'four', heading: W2.b_four.h2, body: <FourWays /> },
        { id: 'families', heading: c('B', 'H2'), body: <Families /> },
        { id: 'contrary', heading: c('C', 'H2'), body: <Contrary /> },
        { id: 'tritone', heading: W2.b_tritone.h2, body: <div><Paras paras={W2.b_tritone.paras} /><M2BV3 /><Checks items={W2.b_tritone.checks} /><p className="sp-callout max-w-2xl"><Md>{c('ref', 'Learner-facing copy')}</Md></p><Link className="sp-btn" href={`${BASE}/resources/interval-palette#ip-06`}>Open the tritone in the Interval Atlas</Link></div> },
        { id: 'similar', heading: c('D', 'H2'), body: <Similar /> },
        { id: 'which', heading: W2.b_which.h2, body: <div><Paras paras={W2.b_which.paras} /><Checks items={W2.b_which.checks} /></div> },
        { id: 'five', heading: c('E', 'H2'), body: <FiveWays /> },
        { id: 'compose', heading: W2.b_compose.h2, body: <Paras paras={W2.b_compose.paras} /> },
        { id: 'path', heading: c('F', 'H2'), body: <Path /> },
        { id: 'recap', heading: 'Recap', body: <Recap title="What you learned today">{W2.b_compose.recap}</Recap> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={d.content}
      doorTitles={d.titles}
      prev={{ href: `${BASE}/week-2/lesson-2a`, label: 'Lesson 2A' }}
      next={{ href: `${BASE}/week-2/lesson-2c`, label: 'Lesson 2C' }}
    />
  )
}
