'use client'
import { useState } from 'react'
import { ClipButton, NowPlaying, StopButton, useAudio } from '../AudioProvider'
import Keys from '../week1/Keys'
import { ChoiceCheck } from '../week1/Teach'
import { midiToName } from '@/lib/soundscape/midi'
import type { NoteEvent } from '@/lib/soundscape/fixtures'

export const mc = (field: string) => {
  const q = field.match(/"([^"]+)"/)?.[1] ?? ''
  const choices = [...field.matchAll(/`([^`]+)`/g)].map(m => m[1])
  const correct = field.match(/Correct:\s*"([^"]+)"/)?.[1] ?? ''
  return { q, choices, correct }
}

/** A choice question whose explanation appears after any pick. Not scored, retry any time. */
export function Choice({ field, answer }: { field: string; answer: string }) {
  const { q, choices, correct } = mc(field)
  return <ChoiceCheck q={q} choices={choices} correct={answer} correctText={correct} incorrectText={`Not quite, and you can choose again. ${correct}`} />
}

/** Two voices, one keyboard: marks both notes (lower and upper) with their names. */
export function PairKeys({ lower, upper, title, names = true }: { lower: number; upper: number; title: string; names?: boolean }) {
  const lo = Math.min(lower, upper) - 1, hi = Math.max(lower, upper) + 1
  return <Keys lo={lo} hi={hi} title={title} showNames={names} labels={names ? { [lower]: midiToName(lower), [upper]: midiToName(upper) } : {}} marks={{ [lower]: 'on', [upper]: 'on' }} />
}

/** C to E, one hop at a time, counter starts at zero on C. Silent unless the learner asks to hear it. */
export function TraceHops({ from, to, events }: { from: number; to: number; events: NoteEvent[] }) {
  const [n, setN] = useState(0)
  const total = to - from
  const marks = Object.fromEntries(Array.from({ length: n + 1 }, (_, i) => [from + i, (i === 0 || i === n ? 'on' : 'passed') as 'on' | 'passed']))
  const labels = Object.fromEntries(Array.from({ length: n + 1 }, (_, i) => [from + i, midiToName(from + i)]))
  return (
    <div className="sp-card p-4 max-w-2xl my-4">
      <p className="font-semibold m-0">Trace {midiToName(from)} to {midiToName(to)}</p>
      <Keys lo={from} hi={to} title={`Keyboard from ${midiToName(from)} to ${midiToName(to)}. ${n} hops traced so far.`} showNames labels={labels} marks={marks} />
      <p role="status" className="m-0 mt-2">Count: <strong>{n}</strong> of {total}. {n === 0 ? `We start on ${midiToName(from)}: that is zero.` : `Hop ${n}: ${midiToName(from + n - 1)} → ${midiToName(from + n)}.`}{n === total ? ` ${total} hops. Each neighboring key, black or white, is one semitone.` : ''}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <button type="button" className="sp-btn sp-btn--ghost" disabled={n >= total} onClick={() => setN(n + 1)}>Next hop</button>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setN(0)}>Start again</button>
        <ClipButton id="trace" label="Hear the interval" events={events} status={`Now playing ${midiToName(from)} and ${midiToName(to)} together`} />
      </div>
    </div>
  )
}

/** Plays one clip then the solo of each voice: lower, then upper. */
export function SoloButtons({ prefix, events, lowerLabel, upperLabel, solo }: { prefix: string; events: NoteEvent[]; lowerLabel: string; upperLabel: string; solo: (e: NoteEvent[], w: 'foundation' | 'upper') => NoteEvent[] }) {
  return (
    <>
      <ClipButton id={`${prefix}-l`} label={lowerLabel} events={solo(events, 'foundation')} status="Now playing only the lower voice" ghost />
      <ClipButton id={`${prefix}-u`} label={upperLabel} events={solo(events, 'upper')} status="Now playing only the upper voice" ghost />
    </>
  )
}

export { ClipButton, NowPlaying, StopButton, useAudio }
