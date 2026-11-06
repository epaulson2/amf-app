'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { ClipButton, NowPlaying, StopButton, useAudio, useNote } from '../AudioProvider'
import { BlankLines } from '../ViewMode'
import { copy, field, stepsOf, all } from '@/lib/soundscape/week1/content'
import { A01, A02, A03_NOTES, A05_LISTEN, visitor } from '@/lib/soundscape/week1/fixtures'
import { midiToName } from '@/lib/soundscape/midi'
import Fig from './Fig'
import Keys from './Keys'
import { lessonDoors } from './Doors'

const L = '1A' as const
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)
const letter = (m: number) => midiToName(m).replace(/\d/, '')

function Listen() {
  const [played, setPlayed] = useState(false)
  return (
    <div>
      <p className="sp-prose"><Md>{c('1', 'Body')}</Md></p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="home" label={c('1', 'Audio control label')} events={A01} status="Now playing C, the home note" onPlayed={() => setPlayed(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      {played && (
        <>
          <p className="sp-callout max-w-2xl">{c('1', 'Audio caption (shown after playback begins or completes)')}</p>
          <Fig file="W1-01_home-note_learner.svg" />
        </>
      )}
      <p className="sp-prose mt-4"><strong>{c('1', 'Reflection prompt')}</strong></p>
      <label className="sp-sr-only" htmlFor="reflect-1">{c('1', 'Reflection prompt')}</label>
      <textarea id="reflect-1" className="sp-field" placeholder={c('1', 'Reflection text box placeholder')} />
      <p className="sp-prose sp-muted mt-2">{c('1', 'Instruction below reflection')}</p>
      <BlankLines n={2} />
    </div>
  )
}

function Visitors() {
  const a = useAudio()
  const [heard, setHeard] = useState(0)
  const [more, setMore] = useState(false)
  const said = (l: string) => `Now playing C with ${l}`
  return (
    <div>
      <p className="sp-prose">{c('2', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="vE" label="Hear E" events={A02.E} status={said('E')} onPlayed={() => setHeard(h => h + 1)} />
        <ClipButton id="vG" label="Hear G" events={A02.G} status={said('G')} onPlayed={() => setHeard(h => h + 1)} />
        <ClipButton id="vD" label="Hear D" events={A02.D} status={said('D')} onPlayed={() => setHeard(h => h + 1)} />
        <StopButton />
      </div>
      <NowPlaying />
      {heard > 0 && (
        <>
          <p className="sp-callout max-w-2xl">{c('2', 'After first visitor')}</p>
          <p className="sp-prose"><strong>{c('2', 'Comparison prompt')}</strong></p>
          <Fig file="W1-02_exploration-map_learner.svg" />
        </>
      )}
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={more} onClick={() => setMore(m => !m)}>Try another note</button>
      {more && (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose one upper note to hear above the C">
          {A03_NOTES.map((m, i) => (
            <button
              key={m} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={a.playing === `v${m}`}
              onClick={() => { a.play(`v${m}`, visitor(m), said(letter(m))); setHeard(h => h + 1) }}
            >
              {heard > 0 ? midiToName(m) : `Note ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Keyboard() {
  const play = useNote()
  const [landmarks, setLandmarks] = useState(false)
  const [names, setNames] = useState(true)
  const [pick, setPick] = useState<number[]>([])
  const [shown, setShown] = useState(false)
  const cs = [48, 60, 72]
  const marks = landmarks ? Object.fromEntries(cs.map(m => [m, 'on' as const])) : {}
  const labels = landmarks ? Object.fromEntries(cs.map(m => [m, midiToName(m)])) : {}
  const both = pick.length === 2 && pick.every(m => m % 12 === 0)
  const [yes, help] = [...field(L, '3', 'Visible check').matchAll(/"([^"]+)"/g)].map(m => m[1])
  const onKey = (m: number) => {
    play(m, `Now playing ${midiToName(m)}`)
    setPick(p => (p.includes(m) ? p.filter(x => x !== m) : p.length >= 2 ? [m] : [...p, m]))
    setShown(false)
  }
  return (
    <div>
      <p className="sp-prose">{all(L, '3', 'Body')[0]}</p>
      <h3 className="text-xl font-semibold text-slate-900 mt-6">{c('3', 'Subheading', 0)}</h3>
      <p className="sp-prose">{all(L, '3', 'Body')[1]}</p>
      <div className="flex flex-wrap gap-3 my-3">
        <button type="button" className="sp-btn" aria-pressed={landmarks} onClick={() => setLandmarks(v => !v)}>{landmarks ? 'Hide C landmarks' : 'Show C landmarks'}</button>
        <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={!names} onClick={() => setNames(v => !v)}>{names ? 'Hide note names' : 'Show note names'}</button>
        <StopButton />
      </div>
      <Keys lo={48} hi={72} title="Keyboard from C3 to C5. Choose keys to hear them." showNames={names} labels={labels} marks={marks} selected={pick} onKey={onKey} />
      <NowPlaying />
      <p className="text-sm sp-muted">Black keys come in groups of two and three. Every neighbouring key, black or white, is one semitone.</p>
      <h3 className="text-xl font-semibold text-slate-900 mt-6">{c('3', 'Subheading', 1)}</h3>
      <p className="sp-prose">{all(L, '3', 'Body')[2]}</p>
      <p className="sp-prose"><strong>{c('3', 'Try-it')}</strong></p>
      <div className="sp-card p-4 max-w-2xl">
        <p className="font-semibold m-0">Find two Cs</p>
        <p className="text-sm sp-muted m-0">Choose two keys on the keyboard above.</p>
        <button type="button" className="sp-btn sp-btn--ghost mt-2" disabled={pick.length !== 2} onClick={() => setShown(true)}>Check my two keys</button>
        {shown && (
          <p role="status" className="sp-callout mt-3 mb-0">
            {both ? `${Math.abs(pick[0] - pick[1]) === 12 ? yes : 'Yes—both notes are C, two octaves apart.'} You chose ${pick.map(midiToName).join(' and ')}.` : help}
          </p>
        )}
      </div>
    </div>
  )
}

function Carry() {
  const [rev, setRev] = useState(false)
  const steps = stepsOf(field(L, '4', '5-step component W1-08 (exact visible stage text)'))
  return (
    <div>
      <p className="sp-prose">{c('4', 'Body')}</p>
      <ol className="sp-prose pl-5 list-decimal">{steps.map(s => <li key={s.title}><strong>{s.title}</strong> — {s.text}</li>)}</ol>
      <Fig file="W1-08_look-draw-hide-imagine-reveal_learner.svg" />
      <button type="button" className="sp-btn" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the map' : 'Reveal the map'}</button>
      {rev && (
        <div className="mt-3">
          <Keys lo={60} hi={72} title="Keyboard from C4 to C5 with E4 marked" showNames labels={{ 64: 'E4' }} marks={{ 64: 'on' }} />
          <p className="text-sm sp-muted">E is the white key two keys to the right of C, with one black key between them.</p>
        </div>
      )}
    </div>
  )
}

function HearImagine() {
  const names = [...field(L, '5', 'Step controls').matchAll(/`([^`]+)`/g)].map(m => m[1])
  const [i, setI] = useState(0)
  const done = i >= names.length - 1
  return (
    <div>
      <p className="sp-prose">{c('5', 'Body')}</p>
      <ol className="flex flex-wrap gap-2 list-none p-0 my-3" aria-label="Steps">
        {names.map((n, k) => <li key={n} className={`sp-status ${k === i ? 'sp-choice' : ''}`} aria-current={k === i ? 'step' : undefined} style={k === i ? { background: '#0f172a', color: '#fff' } : undefined}>{k + 1}. {n}</li>)}
      </ol>
      <div className="flex flex-wrap gap-3 mb-2">
        {i === 0 && <ClipButton id="listenE" label="Play E above the home sound" events={A05_LISTEN} status="Now playing C with E; the E will stop and the C will continue" />}
        {i === 0 && <StopButton />}
        {!done && <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setI(i + 1)}>Next step: {names[i + 1]}</button>}
        {i > 0 && <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setI(i - 1)}>Back</button>}
      </div>
      <NowPlaying />
      {done && <p className="sp-callout max-w-2xl">{c('5', 'Reveal')}</p>}
      <p className="sp-prose sp-muted">{c('5', 'Fallback')}</p>
      <Fig file="W1-05_hear-imagine-sing-find-card_learner.svg" />
    </div>
  )
}

function Make() {
  const [made, setMade] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('6', 'Body')}</p>
      <p className="sp-prose">{c('6', 'Instructions')}</p>
      <p className="sp-callout max-w-2xl">{c('6', 'Composer hint')}</p>
      <button type="button" className="sp-btn" aria-pressed={made} onClick={() => setMade(true)}>{c('6', 'Primary CTA')}</button>
      <div className="mt-4">
        <label htmlFor="changed-1a" className="block font-semibold">What changed the feeling most?</label>
        <textarea id="changed-1a" className="sp-field mt-1" />
        <p className="text-sm sp-muted m-0">This stays in your browser and is cleared when you refresh.</p>
      </div>
      {made && <p className="sp-prose mt-4" role="status"><em>{c('6', 'End copy')}</em></p>}
      <p className="mt-4 flex flex-wrap gap-4 sp-noprint">
        <Link className="sp-btn" href="/curriculum/soundscape-path/week-1/lesson-1b">Continue to Lesson 1B</Link>
        <a className="sp-btn sp-btn--ghost" href="#keyboard">Review the keyboard</a>
      </p>
      <p><a href="/soundscape/w1/pdf/W1-06_keyboard-map_blank.pdf" className="font-medium" style={{ color: '#b45309' }}>Download the practice sheet (PDF)</a></p>
    </div>
  )
}

export default function Lesson1A() {
  const d = lessonDoors(L)
  return (
    <LessonShell
      audio
      eyebrow={c('0', 'Eyebrow')}
      title={c('0', 'H1')}
      intro={
        <div className="space-y-2">
          <p className="m-0 text-lg">{c('0', 'Deck')}</p>
          <p className="m-0 text-sm">{c('0', 'Estimated time')}</p>
          <p className="m-0"><strong>What you’ll learn.</strong> {c('0', "What You'll Learn")}</p>
          <p className="m-0">{c('0', 'Artistic intention')}</p>
        </div>
      }
      heroCtas={<><a href="#listen" className="sp-btn">Begin with Sound</a><a href="#keyboard" className="sp-btn sp-btn--ghost" style={{ color: '#fff', borderColor: '#fff' }}>Explore the Keyboard</a></>}
      blocks={[
        { id: 'listen', heading: c('1', 'H2'), body: <Listen /> },
        { id: 'visitor', heading: c('2', 'H2'), body: <Visitors /> },
        { id: 'keyboard', heading: c('3', 'H2'), body: <Keyboard /> },
        { id: 'carry', heading: c('4', 'H2'), body: <Carry /> },
        { id: 'hear', heading: c('5', 'H2'), body: <HearImagine /> },
        { id: 'make', heading: c('6', 'H2'), body: <Make /> },
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
