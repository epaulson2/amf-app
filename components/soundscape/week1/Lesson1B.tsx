'use client'
import Link from 'next/link'
import { createContext, useContext, useState, type ReactNode } from 'react'
import LessonShell from '../LessonShell'
import Md from '../Md'
import { ClipButton, NowPlaying, StopButton, useAudio } from '../AudioProvider'
import { copy, field, all } from '@/lib/soundscape/week1/content'
import { B01, B02, B03, B04, B04_HOPS, B05, B06 } from '@/lib/soundscape/week1/fixtures'
import { midiToName } from '@/lib/soundscape/midi'
import Fig from './Fig'
import { M1BV1, M1BV2, M1BV3 } from '../visual/Week1Moments'
import { Checks, Paras, Recap } from './Teach'
import { T } from '@/lib/soundscape/week1/teaching'
import Keys, { type Mark } from './Keys'
import { lessonDoors } from './Doors'
import { BlankLines } from '../ViewMode'

const L = '1B' as const
// The Paint card names the ending, so it stays closed until the learner has revealed the possible ending.
const Revealed = createContext<{ rev: boolean; setRev: (v: boolean) => void }>({ rev: false, setRev: () => {} })
function RevealProvider({ children }: { children: ReactNode }) {
  const [rev, setRev] = useState(false)
  return <Revealed.Provider value={{ rev, setRev }}>{children}</Revealed.Provider>
}
function PaintGate({ children }: { children: ReactNode }) {
  const { rev } = useContext(Revealed)
  return rev ? <>{children}</> : <p className="m-0 sp-muted">This card opens after you reveal a possible ending in section 1.</p>
}
function PaintTitle({ title }: { title: string }) {
  return useContext(Revealed).rev ? <>{title}</> : <>Opens after the possible ending is revealed</>
}
const c = (s: string, l: string, n = 0) => copy(L, s, l, n)
const quoted = (v: string) => [...v.matchAll(/"([^"]+)"/g)].map(m => m[1])
const ticks = (v: string) => [...v.matchAll(/`([^`]+)`/g)].map(m => m[1])

function Choices({ options, label }: { options: string[]; label: string }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2 my-3">
      {options.map(o => <button key={o} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
    </div>
  )
}

function HalfWhole({ q, answer, help }: { q: string; answer: string; help: string }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div className="mb-3">
      <p className="font-semibold m-0">{q}</p>
      <div role="group" aria-label={q} className="flex flex-wrap gap-2 my-2">
        {['Half step', 'Whole step'].map(o => <button key={o} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
      </div>
      {sel && <p role="status" className="m-0">{sel === answer ? '' : 'Not quite, and you can try again. '}{help}</p>}
    </div>
  )
}

function Unfinished() {
  const [played, setPlayed] = useState(false)
  const { rev, setRev } = useContext(Revealed)
  return (
    <div>
      <p className="sp-prose">{c('1', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="b01" label={ticks(field(L, '1', 'Button', 0))[0]} events={B01} status="Now playing seven rising notes over the low C. The melody will stop without an ending." onPlayed={() => setPlayed(true)} />
        <StopButton />
      </div>
      <NowPlaying />
      {!rev && <p className="text-sm sp-muted">If you cannot play sound, choose “Reveal a possible ending” to read the notes.</p>}
      {played && (
        <>
          <p className="sp-prose"><strong>{c('1', 'After playback prompt')}</strong></p>
          <Choices label="How does it feel?" options={ticks(field(L, '1', 'Options'))} />
          <Fig file="W1-03_two-endings_learner.svg" caption="The same rising path twice; the last two beats are left open." />
        </>
      )}
      <p className="sp-prose">{c('1', 'Next')}</p>
      <button type="button" className="sp-btn" aria-expanded={rev} onClick={() => setRev(true)}>{ticks(field(L, '1', 'Button', 1))[0] ?? 'Reveal a possible ending'}</button>
      {rev && (
        <div className="mt-3">
          <p className="sp-callout max-w-2xl">{c('1', 'After reveal copy')}</p>
          <div className="flex flex-wrap gap-3 mb-2">
            <ClipButton id="b02" label="Hear it with the ending" events={B02} status="Now playing the same seven notes and then C above them" />
          </div>
          <details className="mt-2"><summary className="cursor-pointer min-h-[44px] flex items-center font-medium">Note list (text version)</summary>
            <p className="m-0">C3 held underneath. Then C4, D4, E4, F4, G4, A4, B4, and finally C5 (MIDI 60, 62, 64, 65, 67, 69, 71, 72).</p>
          </details>
        </div>
      )}
    </div>
  )
}

// Teaching that names the melody's ending opens once the learner asks for it (a plain button, no sound needed).
function NeutralPath() {
  const { rev } = useContext(Revealed)
  return <M1BV3 revealed={rev} />
}

function Gate({ children }: { children: ReactNode }) {
  const { rev, setRev } = useContext(Revealed)
  if (rev) return <>{children}</>
  return (
    <div className="sp-callout max-w-2xl">
      <p className="m-0">This part uses the ending of the melody you are about to hear, so it opens when you ask to reveal a possible ending. You can do that right now, with sound on or off.</p>
      <button type="button" className="sp-btn mt-3" onClick={() => setRev(true)}>Reveal a possible ending</button>
    </div>
  )
}

const SCALE_MIDI = [60, 62, 64, 65, 67, 69, 71, 72]

function SemitoneTeaching() {
  const s = T.b_semi
  const clips = [B03, B04, B05, B06]
  return (
    <div>
      <Paras paras={s.paras} />
      <M1BV1 />
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Guided examples</h3>
      <ol className="list-none p-0 space-y-3 max-w-2xl">
        {s.examples.map(([k, t], i) => (
          <li key={k} className="sp-card p-3">
            <p className="m-0"><strong>{k}.</strong> {t}</p>
            <div className="mt-2"><ClipButton id={`ex${k}`} label={`Hear example ${k}`} events={clips[i]} status={`Now playing example ${k}`} ghost /></div>
          </li>
        ))}
      </ol>
      <NowPlaying />
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Check your understanding</h3>
      <Checks items={s.checks} />
    </div>
  )
}

function ScaleTeaching() {
  const a = useAudio()
  const [row, setRow] = useState<number | null>(null)
  const rows = T.b_scale.table.map((t, i) => {
    const m = t.match(/^(\w)→(\w) (whole|half) \((\d+)/)!
    return { i, from: m[1], to: m[2], kind: m[3], semis: m[4] }
  })
  const marks: Record<number, Mark> = row === null ? {} : { [SCALE_MIDI[row]]: 'on', [SCALE_MIDI[row + 1]]: 'on' }
  const labels = row === null ? {} : { [SCALE_MIDI[row]]: midiToName(SCALE_MIDI[row]), [SCALE_MIDI[row + 1]]: midiToName(SCALE_MIDI[row + 1]) }
  return (
    <div>
      <Paras paras={T.b_scale.paras} />
      <M1BV2 />
      <table className="w-full max-w-xl text-left border-collapse my-4">
        <caption className="text-left font-semibold mb-2">C major, step by step</caption>
        <thead><tr className="border-b border-slate-300"><th className="py-1 pr-3">Step</th><th className="py-1 pr-3">Size</th><th className="py-1 pr-3">Semitones</th><th className="py-1"><span className="sp-sr-only">Hear it</span></th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.i} className="border-b border-slate-200">
              <td className="py-1 pr-3">{r.from} → {r.to}</td>
              <td className="py-1 pr-3">{r.kind}</td>
              <td className="py-1 pr-3">{r.semis}</td>
              <td className="py-1"><button type="button" className="sp-btn sp-btn--ghost" aria-pressed={row === r.i} onClick={() => { setRow(r.i); a.play(`row${r.i}`, [{ midi: SCALE_MIDI[r.i], start: 0, dur: 0.6, role: 'melody' }, { midi: SCALE_MIDI[r.i + 1], start: 0.75, dur: 0.6, role: 'melody' }], `Now playing ${r.from} then ${r.to}: ${r.kind} step`) }}>Hear and show {r.from}→{r.to}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Keys lo={60} hi={72} title="Keyboard from C4 to C5. The two keys of the chosen step are outlined." showNames labels={labels} marks={marks} />
      <NowPlaying />
      <h3 className="text-lg font-semibold text-slate-900 mt-4">Build and explain</h3>
      <Checks items={T.b_scale.checks} />
    </div>
  )
}

function EndingTeaching() {
  return (
    <div>
      <Paras paras={T.b_end.paras} />
    </div>
  )
}

function Distances() {
  const a = useAudio()
  const [hopsShown, setHopsShown] = useState(false)
  const [cmp, setCmp] = useState<'CD' | 'EF' | 'BC' | null>(null)
  const [semi, setSemi] = useState(false)
  const [whole, setWhole] = useState(false)
  const cmpMarks: Record<string, Record<number, Mark>> = {
    CD: { 60: 'on', 61: 'passed', 62: 'on' }, EF: { 64: 'on', 65: 'on' }, BC: { 71: 'on', 72: 'on' },
  }
  const marks: Record<number, Mark> = cmp ? cmpMarks[cmp] : semi ? { 60: 'on', 61: 'on' } : whole ? { 60: 'on', 61: 'passed', 62: 'on' } : {}
  const labels: Record<number, string> = {}
  for (const m of Object.keys(marks)) labels[+m] = midiToName(+m)
  const checks = quoted(field(L, '2', 'Check (not a gate)'))
  const subs = all(L, '2', 'Subhead')
  const copies = all(L, '2', 'Copy')
  const ex = all(L, '2', 'Visible example')
  return (
    <div>
      <p className="sp-prose"><Md>{c('2', 'Body')}</Md></p>
      <h3 className="text-xl font-semibold text-slate-900 mt-6">{subs[0]}</h3>
      <p className="font-semibold m-0">{ex[0]}</p>
      <p className="sp-prose"><Md>{copies[0]}</Md></p>
      <div className="flex flex-wrap gap-3 mb-3">
        <ClipButton id="b03" label="Hear one semitone" events={B03} status="Now playing C then C♯: one semitone" onPlayed={() => { setSemi(true); setWhole(false); setCmp(null) }} />
        <StopButton />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mt-6">{subs[1]}</h3>
      <p className="font-semibold m-0">{ex[1]}</p>
      <p className="sp-prose"><Md>{copies[1]}</Md></p>
      <div className="flex flex-wrap gap-3 mb-3">
        <ClipButton id="b04" label="Hear one whole step" events={B04} status="Now playing C then D: one whole step" onPlayed={() => { setWhole(true); setSemi(false); setCmp(null) }} />
        <ClipButton id="b04h" label="Count the two hops" events={B04_HOPS} status="Now playing C, C♯, D: two hops" onPlayed={() => { setHopsShown(true); setWhole(true); setSemi(false); setCmp(null) }} ghost />
      </div>
      {hopsShown && <p className="text-sm sp-muted">Two hops: C to C♯, then C♯ to D.</p>}
      <h3 className="text-xl font-semibold text-slate-900 mt-6">{subs[2]}</h3>
      <p className="sp-prose"><Md>{copies[2]}</Md></p>
      <div className="flex flex-wrap gap-3 mb-3">
        <ClipButton id="eF" label="Compare E–F" events={B05} status="Now playing E then F" onPlayed={() => { setCmp('EF'); setSemi(false); setWhole(false) }} ghost />
        <ClipButton id="cD" label="Compare C–D" events={B04} status="Now playing C then D" onPlayed={() => { setCmp('CD'); setSemi(false); setWhole(false) }} ghost />
        <ClipButton id="bC" label="Compare B–C" events={B06} status="Now playing B then C" onPlayed={() => { setCmp('BC'); setSemi(false); setWhole(false) }} ghost />
      </div>
      <NowPlaying />
      <Keys lo={60} hi={72} title="Keyboard from C4 to C5. The keys you just heard are outlined." showNames labels={labels} marks={marks} onKey={m => a.play(`k${m}`, [{ midi: m, start: 0, dur: 1, role: 'melody' }], `Now playing ${midiToName(m)}`)} />
      <Fig file="W1-07_semitones-and-whole-steps_learner.svg" />
      <div className="sp-card p-4 max-w-2xl mt-4">
        <HalfWhole q="C to D: half or whole?" answer="Whole step" help={checks[0]} />
        <HalfWhole q="E to F: half or whole?" answer="Half step" help={checks[1]} />
      </div>
      <p className="sp-callout max-w-2xl mt-4"><strong>1 semitone = 1 neighboring key · 1 whole step = 2 semitones · 12 semitones = 1 octave</strong></p>
      <p className="text-sm sp-muted"><Md>{c('2', 'Scientific scope')}</Md></p>
    </div>
  )
}

function Scale() {
  const a = useAudio()
  const [dist, setDist] = useState(false)
  const [built, setBuilt] = useState<number[]>([60])
  const [msg, setMsg] = useState('')
  const scale = [60, 62, 64, 65, 67, 69, 71, 72]
  const wh = ['W', 'W', 'H', 'W', 'W', 'W', 'H']
  const next = scale[built.length]
  const marks: Record<number, Mark> = Object.fromEntries(built.map(m => [m, 'on' as const]))
  const labels = Object.fromEntries(built.map(m => [m, midiToName(m)]))
  const place = (m: number) => {
    a.play(`s${m}`, [{ midi: m, start: 0, dur: 0.9, role: 'melody' }], `Now playing ${midiToName(m)}`)
    if (next === undefined) return
    const here = built[built.length - 1]
    if (m === next) { setBuilt(b => [...b, m]); setMsg('') }
    else setMsg(`That pitch is ${Math.abs(m - here)} semitones away. Try ${next - here} instead.`)
  }
  const strip = wh.map((w, i) => (built.length > i + 1 ? w : '·'))
  return (
    <div>
      <p className="sp-prose">{c('3', 'Body')}</p>
      <p className="font-semibold text-lg" aria-label="C D E F G A B C">{c('3', 'One-row notation')}</p>
      <button type="button" className="sp-btn" aria-expanded={dist} onClick={() => setDist(true)}>Reveal the distances</button>
      {dist && (
        <div className="mt-3">
          <p className="font-semibold text-lg m-0">{field(L, '3', 'Second row (after clicking `Reveal the distances`)').replace(/`/g, '')}</p>
          <p className="sp-callout max-w-2xl">{c('3', 'Copy after reveal')}</p>
          <Fig file="W1-07_semitones-and-whole-steps_instructor.svg" caption="The finished pattern, C major: W W H W W W H." />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 mt-6">Try placing the next note</h3>
      <Keys lo={60} hi={72} title="Keyboard from C4 to C5. Choose the next note of the C major scale." showNames={false} labels={labels} marks={marks} onKey={place} />
      <p className="m-0 mt-2" aria-live="polite">Steps so far: {strip.join(' ')} {msg}</p>
      <p className="text-sm sp-muted">There is no score and nothing here blocks the lesson. <button type="button" className="underline" onClick={() => { setBuilt([60]); setMsg('') }}>Start over</button></p>
      <p className="sp-prose"><strong><Md>{c('3', 'Close')}</Md></strong></p>
    </div>
  )
}

function Endings() {
  const [plays, setPlays] = useState<Record<string, boolean>>({})
  const both = plays.arrive && plays.hover
  const [blind, setBlind] = useState(false)
  const label = (x: string) => (blind ? (x === 'arrive' ? 'Version 1' : 'Version 2') : x === 'arrive' ? 'Listen: Arrive' : 'Listen: Hover')
  return (
    <div>
      <p className="sp-prose">{c('4', 'Body')}</p>
      <div className="flex flex-wrap gap-3 mb-2">
        <ClipButton id="arrive" label={label('arrive')} events={B02} status={blind ? 'Now playing version 1' : 'Now playing the Arrive ending'} onPlayed={() => setPlays(p => ({ ...p, arrive: true }))} />
        <ClipButton id="hover" label={label('hover')} events={B01} status={blind ? 'Now playing version 2' : 'Now playing the Hover ending'} onPlayed={() => setPlays(p => ({ ...p, hover: true }))} />
        <StopButton />
      </div>
      <NowPlaying />
      {both && (
        <>
          <p className="sp-callout max-w-2xl">{c('4', 'Copy after first pair')}</p>
          <p className="sp-prose"><strong>{c('4', 'Prompt')}</strong></p>
          <Choices label="Your preference" options={ticks(field(L, '4', 'Interaction')).slice(0, 3)} />
          <label className="inline-flex items-center gap-2 min-h-[44px]"><input type="checkbox" checked={blind} onChange={e => setBlind(e.target.checked)} /> Replay without labels</label>
          <Fig file="W1-03_two-endings_instructor.svg" caption="Both endings, now with their notes." />
          <p className="sp-prose"><Md>{c('4', 'Micro theory after ear comparison')}</Md></p>
        </>
      )}
    </div>
  )
}

function Studio() {
  const [done, setDone] = useState(false)
  return (
    <div>
      <p className="sp-prose">{c('5', 'Body')}</p>
      <p className="sp-prose">{c('5', 'Instructions')}</p>
      <p className="sp-callout max-w-2xl">{c('5', 'Optional creativity hint')}</p>
      <button type="button" className="sp-btn" aria-pressed={done} onClick={() => setDone(true)}>{ticks(field(L, '5', 'Button'))[0]}</button>
      <p className="text-sm sp-muted">This only marks your place on this page. It stays in your browser and nothing is saved or sent.</p>
      {done && <p className="sp-prose" role="status"><em>{c('5', 'Closing copy')}</em></p>}
      <BlankLines n={2} />
      <p className="mt-4 flex flex-wrap gap-4 sp-noprint">
        <Link className="sp-btn" href="/curriculum/soundscape-path/week-1/lesson-1c">Continue to Lesson 1C</Link>
        <a className="sp-btn sp-btn--ghost" href="#endings">Replay my comparisons</a>
      </p>
      <p><a href="/soundscape/w1/pdf/W1-03_two-endings_blank.pdf" className="font-medium" style={{ color: '#b45309' }}>Download practice sheet: two endings (PDF)</a> · <a href="/soundscape/w1/pdf/W1-07_semitones-and-whole-steps_blank.pdf" className="font-medium" style={{ color: '#b45309' }}>Download practice sheet: semitones and whole steps (PDF)</a></p>
    </div>
  )
}

export default function Lesson1B() {
  const d = lessonDoors(L)
  const paint = d.content['paint-what-you-hear']
  return (
    <RevealProvider>
    <LessonShell
      audio
      eyebrow={c('0', 'Eyebrow')}
      title={c('0', 'H1')}
      intro={
        <div className="space-y-2">
          <p className="m-0 text-lg">{c('0', 'Deck')}</p>
          <p className="m-0 text-sm">About 20–25 minutes</p>
          <p className="m-0"><strong>What you’ll learn.</strong> {c('0', "What You'll Learn")}</p>
          <p className="m-0 italic">{c('0', 'Previously')}</p>
        </div>
      }
      heroCtas={<a href="#unfinished" className="sp-btn">Hear the unfinished melody</a>}
      blocks={[
        { id: 'journey', heading: T.b_intro.h2, body: <div><Paras paras={T.b_intro.paras} /><NeutralPath /></div> },
        { id: 'unfinished', heading: c('1', 'H2'), body: <Unfinished /> },
        { id: 'semitones', heading: T.b_semi.h2, body: <Gate><SemitoneTeaching /></Gate> },
        { id: 'distances', heading: c('2', 'H2'), body: <Gate><Distances /></Gate> },
        { id: 'scaleteach', heading: T.b_scale.h2, body: <Gate><ScaleTeaching /></Gate> },
        { id: 'scale', heading: c('3', 'H2'), body: <Gate><Scale /></Gate> },
        { id: 'endings', heading: c('4', 'H2'), body: <Gate><Endings /></Gate> },
        { id: 'arrival', heading: T.b_end.h2, body: <Gate><EndingTeaching /></Gate> },
        { id: 'studio', heading: c('5', 'H2'), body: <Studio /> },
        { id: 'recap', heading: 'Recap', body: <Recap title="What you learned today">{T.b_end.recap}</Recap> },
      ]}
      doorsHeading="Explore a little deeper"
      doorsIntro={null}
      doors={{ ...d.content, 'paint-what-you-hear': <PaintGate>{paint}</PaintGate> }}
      doorTitles={{ ...d.titles, 'paint-what-you-hear': undefined }}
      doorTitleNodes={{ 'paint-what-you-hear': <PaintTitle title={d.titles['paint-what-you-hear']!} /> }}
      prev={{ href: '/curriculum/soundscape-path/week-1/lesson-1a', label: 'Lesson 1A' }}
      next={{ href: '/curriculum/soundscape-path/week-1/lesson-1c', label: 'Lesson 1C' }}
    />
    </RevealProvider>
  )
}
