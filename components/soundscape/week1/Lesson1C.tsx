'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { ClipButton, NowPlaying, StopButton } from '../AudioProvider'
import { BlankLines } from '../ViewMode'
import { copy, field, all, stepsOf } from '@/lib/soundscape/week1/content'
import { C01, C02, C03, C04, C05, solo, text } from '@/lib/soundscape/week1/fixtures'
import Fig from './Fig'
import { Checks, Paras, Recap, Steps } from './Teach'
import { T } from '@/lib/soundscape/week1/teaching'
import Keys from './Keys'
import { lessonDoors } from './Doors'

const L = '1C' as const
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)
const ticks = (v: string) => [...v.matchAll(/`([^`]+)`/g)].map(m => m[1])

function Choices({ options, label, feedback }: { options: string[]; label: string; feedback?: Record<string, string> }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2 my-3">
        {options.map(o => <button key={o} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
      </div>
      {sel && feedback?.[sel] && <p role="status" className="sp-callout max-w-2xl">{feedback[sel]}</p>}
    </div>
  )
}

function Voices() {
  const [heard, setHeard] = useState(false)
  const answer = field(L, '1', 'Learning check').match(/answer `([^`]+)`/)?.[1] ?? ''
  const opts = ticks(field(L, '1', 'Learning check').split('answer')[0]).slice(1)
  const bodies = all(L, '1', 'Body')
  return (
    <div>
      <p className="sp-prose"><Md>{bodies[0]}</Md></p>
      <p className="sp-prose"><Md>{bodies[1]}</Md></p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c01" label="Hear the two voices" events={C01} status="Now playing both voices: a held low C and an upper line" onPlayed={() => setHeard(true)} />
        <ClipButton id="c01f" label="Hear only the foundation" events={solo(C01, 'foundation')} status="Now playing only the foundation, the held low C" ghost />
        <ClipButton id="c01u" label="Hear only the upper voice" events={solo(C01, 'upper')} status="Now playing only the upper voice" ghost />
        <StopButton />
      </div>
      <NowPlaying />
      {heard && <p className="sp-prose"><strong>{c('1', 'After playback')}</strong></p>}
      <Fig file="SYS-04_voice-path-chart_learner.svg" caption="Two named voices over time: one held, one moving." />
      <p className="sp-callout max-w-2xl"><Md>{c('1', 'Theory note')}</Md></p>
      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-8">{T.c_nvhc.h2}</h3>
      <Paras paras={T.c_nvhc.paras} />
      <table className="w-full max-w-2xl text-left border-collapse my-4">
        <caption className="text-left font-semibold mb-2">Four different ideas</caption>
        <thead><tr className="border-b border-slate-300"><th className="py-1 pr-3">Term</th><th className="py-1">What it means, with an example</th></tr></thead>
        <tbody>{T.c_nvhc.table.map(([k, v]) => <tr key={k} className="border-b border-slate-200 align-top"><th scope="row" className="py-2 pr-3">{k}</th><td className="py-2">{v}</td></tr>)}</tbody>
      </table>
      <Checks items={T.c_nvhc.checks} />
      <div className="sp-card p-4 max-w-2xl">
        <p className="font-semibold m-0">Which voice stayed?</p>
        <Choices label="Which voice stayed?" options={opts} feedback={{ [opts[0]]: answer, [opts[1]]: `Try again: ${answer}`, [opts[2]]: `Try again: ${answer}` }} />
      </div>
    </div>
  )
}

function Time() {
  const bodies = all(L, '2', 'Body')
  const [cmp, setCmp] = useState(0)
  const terms = [...field(L, '2', 'Key terms inline').matchAll(/`([^`]+)`:\s*"([^"]+)"/g)]
  return (
    <div>
      <p className="sp-prose"><Md>{bodies[0]}</Md></p>
      <p className="sp-prose"><Md>{bodies[1]}</Md></p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c02" label="Hear an early entrance" events={C02} status="Now playing: the upper note enters early" onPlayed={() => setCmp(v => v | 1)} />
        <ClipButton id="c03" label="Hear a delayed entrance" events={C03} status="Now playing: the same upper note enters late" onPlayed={() => setCmp(v => v | 2)} />
        <StopButton />
      </div>
      <NowPlaying />
      {cmp === 3 && <p className="sp-callout max-w-2xl">{c('2', 'After compare')}</p>}
      <h3 className="sp-editorial-title text-xl font-medium text-slate-900 mt-8">{T.c_time.h2}</h3>
      <Paras paras={T.c_time.paras} />
      <Checks items={T.c_time.checks} />
      <dl className="grid gap-2 sm:grid-cols-2 mt-4 max-w-3xl">
        {terms.map(t => <div key={t[1]} className="sp-card p-3"><dt className="font-semibold">{t[1]}</dt><dd className="m-0 text-base">{t[2]}</dd></div>)}
      </dl>
    </div>
  )
}

function Example() {
  const [plays, setPlays] = useState<Record<string, boolean>>({})
  const [voices, setVoices] = useState(false)
  const [heard, setHeard] = useState(false)
  const resp = ticks(field(L, '3', 'Three selectable non-scored responses'))
  return (
    <div>
      <p className="sp-prose">{c('3', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c04" label="Hear the landing version" events={C04} status="Now playing the 36-second landing version" onPlayed={() => { setPlays(p => ({ ...p, a: true })); setHeard(true) }} />
        <ClipButton id="c05" label="Hear the open version" events={C05} status="Now playing the 36-second open version" onPlayed={() => { setPlays(p => ({ ...p, b: true })); setHeard(true) }} />
        <StopButton />
      </div>
      <NowPlaying />
      {plays.a && plays.b && (
        <>
          <p className="sp-callout max-w-2xl">{c('3', 'After compare')}</p>
          <Choices label="Your response" options={resp} />
        </>
      )}
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={voices} onClick={() => setVoices(v => !v)}>{voices ? 'Hide the voices' : 'Show the voices on the keyboard'}</button>
      {voices && (
        <div className="mt-3">
          <Keys lo={48} hi={72} title="Keyboard from C3 to C5 with the foundation C3 and the upper notes D4, E4, G4, B4 and C5 marked" showNames={false}
            labels={{ 48: 'C3', 62: 'D4', 64: 'E4', 67: 'G4', 71: 'B4', 72: 'C5' }} marks={{ 48: 'on', 62: 'on', 64: 'on', 67: 'on', 71: 'on', 72: 'on' }} />
          <p className="sp-prose"><strong>Foundation:</strong> C3, held. <strong>Upper voice:</strong> E4, G4, D4, B4, and C5 in the landing version only.</p>
          <details><summary className="cursor-pointer min-h-[44px] flex items-center font-medium">Note and timing list (text version)</summary>
            <p className="m-0"><strong>Landing version:</strong> {text(C04)}.</p>
            <p className="m-0"><strong>Open version:</strong> {text(C05)}.</p>
          </details>
        </div>
      )}
      {!heard && <p className="text-sm sp-muted mt-3">If you cannot play sound, open “Show the voices on the keyboard” to read the notes.</p>}
    </div>
  )
}

function ComposeTeaching() {
  return (
    <div>
      <Paras paras={T.c_compose.paras} />
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Your studio sequence</h3>
      <Steps items={T.c_compose.steps} />
    </div>
  )
}

function Compose() {
  const steps = stepsOf(field(L, '4', 'Five on-page creative steps with verbatim labels and text'))
  const [have, setHave] = useState(false)
  const bodies = all(L, '4', 'Body')
  return (
    <div>
      <p className="sp-prose">{bodies[0]}</p>
      <ol className="sp-prose pl-5 list-decimal">{steps.map(s => <li key={s.title}><strong>{s.title}</strong> — {s.text}</li>)}</ol>
      <p className="sp-prose">{c('4', 'Studio prompt')}</p>
      <p className="sp-prose">{c('4', 'Creative freedom reminder')}</p>
      <div className="flex flex-wrap gap-4 items-center my-3">
        <a className="sp-btn sp-btn--ghost" href="/soundscape/w1/pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf">Download my tonal atlas (PDF)</a>
        <label className="inline-flex items-center gap-2 min-h-[44px]"><input type="checkbox" checked={have} onChange={e => setHave(e.target.checked)} /> I have a sketch</label>
      </div>
      <label htmlFor="changed-1c" className="block font-semibold">How did the music change?</label>
      <textarea id="changed-1c" className="sp-field mt-1" />
      <p className="text-sm sp-muted m-0">This stays in your browser and is cleared when you refresh. Nothing is uploaded.</p>
    </div>
  )
}

function Map() {
  const [done, setDone] = useState(false)
  const changed = ticks(field(L, '5', 'Teacher mini-check').split('`What changed?`')[1] ?? '')
  const journal = field(L, '5', 'Optional journal input').replace(/`/g, '')
  return (
    <div>
      <p className="sp-prose">{c('5', 'Body')}</p>
      <Fig file="W1-04_personal-tonal-atlas-worksheet_learner.svg" caption="Your atlas is yours to fill in." />
      <p className="sp-prose">{c('5', 'Keyboard bridge')}</p>
      <div className="sp-card p-4 max-w-2xl">
        <p className="font-semibold m-0">What changed?</p>
        <Choices label="What changed?" options={changed} />
        <p className="m-0 text-base">{journal}</p>
      </div>
      <p className="sp-prose mt-4"><strong>{c('5', 'Reflection')}</strong></p>
      <BlankLines n={3} />
      <button type="button" className="sp-btn" aria-pressed={done} onClick={() => setDone(true)}>{c('5', 'CTA')}</button>
      <p className="text-sm sp-muted">This only marks your place on this page. It stays in your browser; nothing is saved, sent or scored.</p>
      {done && <p role="status" className="sp-callout max-w-2xl">{c('6', 'Celebratory line')}</p>}
    </div>
  )
}

function Bridge() {
  return (
    <div>
      <p className="sp-prose">{c('6', 'Closing copy')}</p>
      <p className="mt-4 sp-noprint"><Link className="sp-btn" href="/curriculum/soundscape-path/week-2">Preview Week 2</Link> <Link className="sp-btn sp-btn--ghost" href="/curriculum/soundscape-path/week-1">Return to Week 1</Link></p>
    </div>
  )
}

export default function Lesson1C() {
  const d = lessonDoors(L)
  return (
    <LessonShell
      audio
      eyebrow={c('0', 'Eyebrow')}
      title={c('0', 'H1')}
      intro={
        <div className="space-y-2">
          <p className="m-0 text-lg">{c('0', 'Deck')}</p>
          <p className="m-0 text-sm">{c('0', 'Time')}</p>
          <p className="m-0"><strong>What you’ll learn.</strong> {c('0', "What You'll Learn")}</p>
          <p className="m-0 italic">{c('0', 'Previously')}</p>
        </div>
      }
      heroCtas={<a href="#intro" className="sp-btn">{c('0', 'CTA')}</a>}
      blocks={[
        { id: 'intro', heading: T.c_intro.h2, body: <Paras paras={T.c_intro.paras} /> },
        { id: 'voices', heading: c('1', 'H2'), body: <Voices /> },
        { id: 'time', heading: c('2', 'H2'), body: <Time /> },
        { id: 'example', heading: c('3', 'H2'), body: <Example /> },
        { id: 'intention', heading: T.c_compose.h2, body: <ComposeTeaching /> },
        { id: 'compose', heading: c('4', 'H2'), body: <Compose /> },
        { id: 'map', heading: c('5', 'H2'), body: <Map /> },
        { id: 'recap', heading: 'Recap and next steps', body: <Recap title="What you learned today">{T.c_recap.paras}</Recap> },
        { id: 'bridge', heading: c('6', 'H2'), body: <Bridge /> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={d.content}
      doorTitles={d.titles}
      prev={{ href: '/curriculum/soundscape-path/week-1/lesson-1b', label: 'Lesson 1B' }}
      next={{ href: '/curriculum/soundscape-path/week-2', label: 'Week 2' }}
    />
  )
}
