'use client'
import Link from 'next/link'
import { useState } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { BlankLines } from '../ViewMode'
import { Checks, ChoiceCheck, Paras, Recap, Steps } from '../week1/Teach'
import Fig from '../week1/Fig'
import { doorsFrom } from '../week1/Doors'
import { ClipButton, NowPlaying, PairKeys, StopButton } from './Parts'
import { W2, copy, field, ticks, quoted, drawers } from '@/lib/soundscape/week2/content'
import { C, M } from '@/lib/soundscape/week2/fixtures'
import { solo } from '@/lib/soundscape/week1/fixtures'

const L = '2C' as const
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)
const BASE = '/curriculum/soundscape-path'

function HearLines() {
  return (
    <div>
      <p className="sp-prose">{c('A', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="a-low" label="Hear the lower voice" events={solo(C.held, 'foundation')} status="Now playing the lower voice: C4, held for 36 seconds" />
        <ClipButton id="a-up" label="Hear the upper voice" events={solo(C.held, 'upper')} status="Now playing the upper voice: E4, then F4, then E4" />
        <ClipButton id="a-both" label="Hear both voices" events={C.held} status="Now playing both voices: held C4 below, E4 F4 E4 above" />
        <StopButton />
      </div>
      <NowPlaying />
      <p className="sp-prose"><strong>{c('A', 'Reflection')}</strong></p>
      <p className="sp-callout max-w-2xl"><Md>{c('A', 'Theory callout')}</Md></p>
      <Fig folder="w2" file="W2-04_blank-two-voice-path_learner.svg" caption="A blank two-line path: one row of pitches for each voice, time to the right." />
    </div>
  )
}

function Quiet() {
  const [heard, setHeard] = useState(false)
  const [rev, setRev] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('B', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="b-quiet" label="Hear the quiet version" events={C.held} status="Now playing the quiet version: C4 held, upper E4 then F4 then E4" onPlayed={() => setHeard(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the answer' : 'Reveal the answer in text'}</button>
      {(heard || rev) && (
        <div className="mt-3">
          <p className="font-semibold">{ticks(field(L, 'B', 'Post-play reveal'))[0]}</p>
          <p className="sp-prose"><Md>{c('B', 'Body')}</Md></p>
        </div>
      )}
      <p className="sp-prose">{c('B', 'Prompt')}</p>
      <p className="sp-prose sp-muted">{c('B', 'Creative note')}</p>
    </div>
  )
}

function Moving() {
  const [heard, setHeard] = useState(false)
  const [rev, setRev] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('C', 'Copy')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="c-move" label="Hear the moving-foundation version" events={C.moving} status="Now playing the moving-foundation version: the lower line goes C4, B3, C4 under the same upper melody" onPlayed={() => setHeard(true)} />
        <ClipButton id="c-q" label="Replay the quiet version" events={C.held} status="Now playing the quiet version" ghost />
        <ClipButton id="c-m" label="Replay the moving version" events={C.moving} status="Now playing the moving version" ghost />
        <ClipButton id="c-lo" label="Hear only the changing lower voice" events={solo(C.moving, 'foundation')} status="Now playing only the changing lower voice: C4, B3, C4" ghost />
        <StopButton />
      </div>
      <NowPlaying />
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the answer' : 'Reveal the answer in text'}</button>
      {(heard || rev) && (
        <div className="mt-3">
          <p className="sp-callout max-w-2xl"><Md>{c('C', 'After play')}</Md></p>
          <PairKeys lower={M.B3} upper={M.F4} title="Keyboard with B3 and F4 outlined: the diminished fifth, six semitones" />
        </div>
      )}
      <p className="sp-prose mt-3">{c('C', 'Prompt')}</p>
    </div>
  )
}

const TABLE = {
  quiet: [['4–10 s', 'C4 + E4', 'major third', 4], ['14–20 s', 'C4 + F4', 'perfect fourth', 5], ['26–32 s', 'C4 + E4', 'major third', 4]],
  moving: [['4–10 s', 'C4 + E4', 'major third', 4], ['14–20 s', 'B3 + F4', 'diminished fifth (tritone)', 6], ['26–32 s', 'C4 + E4', 'major third', 4]],
} as const

function Describe() {
  const [view, setView] = useState<'paths' | 'interval'>('paths')
  const [dialog, setDialog] = useState(false)
  const raw = field(L, 'D', 'Mini knowledge checks (all optional, non-gated)').split('\n').filter(l => l.startsWith('- '))
  const checks = raw.map(l => {
    const q = quoted(l)[0]
    const ch = [...l.matchAll(/`([^`]+)`(\s*\(correct\))?/g)].map(m => ({ t: m[1], ok: !!m[2] }))
    return { q, choices: ch.map(x => x.t), answer: ch.find(x => x.ok)!.t }
  })
  const fb = c('D', 'Feedback')
  return (
    <div>
      <p className="sp-prose"><Md>{c('D', 'Teaching copy')}</Md></p>
      <p className="sp-prose"><Md>{c('D', 'Body')}</Md></p>
      <div className="flex flex-wrap gap-3 my-3">
        <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={view === 'paths'} onClick={() => setView('paths')}>See the separate paths</button>
        <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={view === 'interval'} onClick={() => setView('interval')}>Show the interval at this moment</button>
      </div>
      {view === 'paths' ? (
        <table className="w-full max-w-3xl text-left border-collapse my-3">
          <caption className="text-left font-semibold mb-2">The two voices as separate lines (seconds)</caption>
          <thead><tr className="border-b border-slate-300"><th className="py-1 pr-3">Voice</th><th className="py-1 pr-3">Quiet version</th><th className="py-1">Moving-foundation version</th></tr></thead>
          <tbody>
            <tr className="border-b border-slate-200 align-top"><th scope="row" className="py-2 pr-3 font-medium">Lower</th><td className="py-2 pr-3">C4, 0–36</td><td className="py-2">C4 0–12, B3 12–24, C4 24–36</td></tr>
            <tr className="border-b border-slate-200 align-top"><th scope="row" className="py-2 pr-3 font-medium">Upper (identical)</th><td className="py-2 pr-3" colSpan={2}>E4 4–10, F4 14–20, E4 26–32</td></tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full max-w-3xl text-left border-collapse my-3">
          <caption className="text-left font-semibold mb-2">The interval whenever the upper voice sounds</caption>
          <thead><tr className="border-b border-slate-300"><th className="py-1 pr-3">When</th><th className="py-1 pr-3">Quiet version</th><th className="py-1">Moving-foundation version</th></tr></thead>
          <tbody>{TABLE.quiet.map((r, i) => <tr key={r[0]} className="border-b border-slate-200"><th scope="row" className="py-2 pr-3 font-medium">{r[0]}</th><td className="py-2 pr-3">{r[1]}: {r[2]}, {r[3]}</td><td className="py-2">{TABLE.moving[i][1]}: {TABLE.moving[i][2]}, {TABLE.moving[i][3]}</td></tr>)}</tbody>
        </table>
      )}
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="d-dlg" label="Hear the short dialogue (optional)" events={C.dialogue} status="Now playing a short two-line dialogue: C4+E4, C4+F4, B3+F4, C4+E4" onPlayed={() => setDialog(true)} ghost />
        <StopButton />
      </div>
      {dialog && <p role="status" className="sp-callout max-w-2xl">C4+E4 (major third, 4) → C4+F4 (perfect fourth, 5) → B3+F4 (diminished fifth, 6) → C4+E4 (major third, 4).</p>}
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Check your understanding (optional)</h3>
      {checks.map(k => <ChoiceCheck key={k.q} q={k.q} choices={k.choices} correct={k.answer} correctText={fb} incorrectText={`Not quite, and you can choose again. ${fb}`} />)}
    </div>
  )
}

function Imagine() {
  const [labels, setLabels] = useState(true)
  return (
    <div>
      <p className="sp-prose">{c('E', 'Copy')}</p>
      <p className="sp-prose">{c('E', 'Practice cue')}</p>
      <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={labels} onClick={() => setLabels(v => !v)}>{labels ? 'Hide labels' : 'Show labels'}</button>
      <PairKeys lower={M.C4} upper={M.E4} title="Keyboard with the lower C4 and the upper E4 outlined" names={labels} />
      <Fig folder="w2" file="W2-06_two-lines-on-one-keyboard_learner.svg" />
    </div>
  )
}

function Studio() {
  const [done, setDone] = useState(false)
  const raw = field(L, 'F', 'Five instructions (on-screen exact)')
  const items = [...raw.matchAll(/\d+\.\s*`([^`]+)`\s*—\s*"([^"]+)"/g)].map(m => `**${m[1]}.** ${m[2]}`)
  return (
    <div>
      <p className="sp-prose">{c('F', 'Copy')}</p>
      <Steps items={items} />
      <p className="sp-prose">{c('F', 'Timing')}</p>
      <p className="mt-2 sp-noprint"><a className="sp-btn sp-btn--ghost" href="/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf">Download the two-voice path sheet (PDF)</a></p>
      <label htmlFor="reflect-2c" className="block font-semibold mt-3">{ticks(field(L, 'F', 'Local-only optional reflection'))[0]}</label>
      <textarea id="reflect-2c" className="sp-field mt-1" />
      <p className="text-sm sp-muted m-0">{c('F', 'Privacy note')} This reflection stays in your browser and is cleared when you refresh.</p>
      <p className="mt-3"><button type="button" className="sp-btn" aria-pressed={done} onClick={() => setDone(true)}>{ticks(field(L, 'F', 'Completion CTA'))[0]}</button></p>
      {done && <p role="status" className="sp-prose"><em>{c('F', 'Final sentence')}</em></p>}
      <BlankLines n={2} />
    </div>
  )
}

function Week3() {
  return (
    <div>
      <p className="sp-prose">{c('G', 'Copy')}</p>
      <p className="mt-4 sp-noprint"><Link className="sp-btn" href={`${BASE}/week-2`}>Return to Week 2</Link></p>
    </div>
  )
}

export default function Lesson2C() {
  const d = doorsFrom(drawers(L) as never, '/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf')
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
          <p className="m-0 italic">{c('Hero', 'Previously')}</p>
        </div>
      }
      heroCtas={<a href="#learn" className="sp-btn">Hear a two-voice miniature</a>}
      blocks={[
        { id: 'learn', heading: W2.c_learn.h2, body: <Paras paras={W2.c_learn.paras} /> },
        { id: 'lines', heading: c('A', 'H2'), body: <HearLines /> },
        { id: 'interval', heading: W2.c_line.h2, body: <div><Paras paras={W2.c_line.paras} /><Checks items={W2.c_line.checks} /></div> },
        { id: 'quiet', heading: c('B', 'H2'), body: <Quiet /> },
        { id: 'support', heading: W2.c_support.h2, body: <div><Paras paras={W2.c_support.paras} /><p className="sp-callout max-w-2xl"><Md>{W2.c_support.worked}</Md></p><Checks items={W2.c_support.checks} /></div> },
        { id: 'moving', heading: c('C', 'H2'), body: <Moving /> },
        { id: 'describe', heading: c('D', 'H2'), body: <Describe /> },
        { id: 'words', heading: W2.c_describe.h2, body: <div><Paras paras={W2.c_describe.paras} /><Checks items={W2.c_describe.checks} /><p className="sp-callout max-w-2xl"><Md>{c('ref', 'Learner-facing copy')}</Md></p><Link className="sp-btn" href={`${BASE}/resources/interval-palette`}>Explore the Interval Atlas</Link></div> },
        { id: 'imagine', heading: c('E', 'H2'), body: <Imagine /> },
        { id: 'miniature', heading: W2.c_miniature.h2, body: <div><Paras paras={W2.c_miniature.paras} /><h3 className="text-lg font-semibold text-slate-900 mt-4">Your composer plan</h3><Steps items={W2.c_miniature.steps} /></div> },
        { id: 'studio', heading: c('F', 'H2'), body: <Studio /> },
        { id: 'recap', heading: 'Recap and Week 3 bridge', body: <Recap title="What you learned today">{W2.c_miniature.recap}</Recap> },
        { id: 'week3', heading: c('G', 'H2'), body: <Week3 /> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={d.content}
      doorTitles={d.titles}
      prev={{ href: `${BASE}/week-2/lesson-2b`, label: 'Lesson 2B' }}
      next={{ href: `${BASE}/week-2`, label: 'Week 2 overview' }}
    />
  )
}
