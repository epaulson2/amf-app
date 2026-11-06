'use client'
import { useState } from 'react'
import VisualTeachingBlock from './VisualTeachingBlock'
import EventTimeline from './EventTimeline'
import FitKeys from './FitKeys'
import { tracksOf } from './shared'
import { ClipButton, NowPlaying, StopButton } from '../AudioProvider'
import { B01, C01, C02, C03, C04, C05, solo } from '@/lib/soundscape/week1/fixtures'
import { midiToName } from '@/lib/soundscape/midi'
import type { Mark } from '../week1/Keys'
import Fig from '../week1/Fig'

const SRC1 = 'Atmosphere and exact geometry are kept apart: the painted paper is decoration, the lines and keys are drawn from the same data as the sound.'

// ---------- 1B-V1: half and whole steps
export function M1BV1() {
  const walk = ['C4 → C♯4: hop 1', 'C♯4 → D4: hop 2, so C4 to D4 is one whole step', 'E4 → F4: one hop, a half step', 'B4 → C5: one hop, a half step']
  return (
    <VisualTeachingBlock
      id="v-1b-1" k="1B-V1"
      steps={walk}
      figure={step => {
        const marks: Record<number, Mark> = {}
        const labels: Record<number, string> = {}
        const put = (ms: number[], pass: number[] = []) => { for (const m of pass) marks[m] = 'passed'; for (const m of ms) { marks[m] = 'on'; labels[m] = midiToName(m) } }
        if (step === 0) put([60, 61])
        if (step === 1) put([60, 62], [61])
        if (step === 2) put([64, 65])
        if (step === 3) put([71, 72])
        return <FitKeys lo={60} hi={72} title="Keyboard from C4 to C5 with the keys of this step outlined" showNames labels={labels} marks={marks} />
      }}
      legend="Each neighbouring key, black or white, is one semitone. Outlined keys are the ends of the step; a dashed key is passed on the way."
      readAloud="C4 to C♯4 is 1 semitone. C4 to D4 is 2 semitones (passing C♯4): one whole step. E4 to F4 is 1 semitone. B4 to C5 is 1 semitone."
      sourceNote={SRC1}
    />
  )
}

// ---------- 1B-V2: the major-scale route
const SCALE = [60, 62, 64, 65, 67, 69, 71, 72]
const NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
export function M1BV2() {
  const [cover, setCover] = useState(false)
  const steps = SCALE.slice(0, 7).map((m, i) => `${NAMES[i]} → ${NAMES[i + 1]}: ${SCALE[i + 1] - m === 2 ? 'whole step, 2 semitones' : 'half step, 1 semitone'}`)
  return (
    <VisualTeachingBlock
      id="v-1b-2" k="1B-V2"
      steps={steps}
      figure={step => {
        const marks: Record<number, Mark> = {}
        const labels: Record<number, string> = {}
        if (step >= 0) { marks[SCALE[step]] = 'on'; marks[SCALE[step + 1]] = 'on'; labels[SCALE[step]] = midiToName(SCALE[step]); labels[SCALE[step + 1]] = midiToName(SCALE[step + 1]) }
        return (
          <>
            <FitKeys lo={60} hi={72} title="Keyboard from C4 to C5 with the current step of the C-major route outlined" showNames labels={labels} marks={marks} />
            <ol className="list-none p-0 m-0 mt-3 flex flex-wrap gap-1" aria-label="The seven steps">
              {SCALE.slice(0, 7).map((m, i) => {
                const w = SCALE[i + 1] - m === 2
                return <li key={i} className={`text-center rounded border-2 px-2 py-1 min-w-[3.4rem] ${step === i ? 'border-amber-700 bg-amber-50' : 'border-slate-300 bg-white'}`}><span className="block text-xs sp-muted">{NAMES[i]}→{NAMES[i + 1]}</span><span className="font-semibold">{cover ? '?' : w ? 'W' : 'H'}</span><span className="block text-xs sp-muted">{cover ? '' : w ? '2' : '1'}</span></li>
              })}
            </ol>
          </>
        )
      }}
      legend="**W** = whole step (two semitones). **H** = half step (one). The colours of the boxes carry no feeling; letters and numbers carry the meaning."
      extra={<button type="button" className="sp-btn sp-btn--ghost mt-3" aria-pressed={cover} onClick={() => setCover(v => !v)}>{cover ? 'Show the W and H labels' : 'Cover the W and H labels'}</button>}
      readAloud="C to D 2, D to E 2, E to F 1, F to G 2, G to A 2, A to B 2, B to C 1: W W H W W W H."
      sourceNote={SRC1}
    />
  )
}

// ---------- 1B-V3: open path versus arrival (answer-neutral until the learner reveals)
export function M1BV3({ revealed }: { revealed: boolean }) {
  const ev = B01
  const tracks = tracksOf(ev, { lower: 'Low C3', relabel: e => (revealed || e.role === 'drone' ? undefined : '·') })
  const withC5 = revealed ? [...tracks.map(t => (t.id === 'upper' ? { ...t, events: [...t.events, { midi: 72, start: 4.9, dur: 0.9, emph: true }] } : t))] : tracks
  return (
    <VisualTeachingBlock
      id="v-1b-3" k="1B-V3"
      steps={revealed ? ['Find the seven shared notes', 'Find the low C3 that stays underneath', 'Read the listening space after the last shared note', 'Read the added final C5 above B4'] : ['Find the seven shared notes', 'Find the low C3 that stays underneath', 'Read the listening space after the last shared note']}
      figure={step => (
        <EventTimeline title={revealed ? 'Seven shared notes over a low C3, with the possible arrival on C5' : 'Seven shared notes over a low C3; the ending is not shown yet'} total={7.25}
          tracks={withC5} hideNames={false}
          shade={step === 2 || (!revealed && step < 0) ? [{ from: 4.75, to: 7.25, label: 'listening space' }] : step === 0 ? [{ from: 0, to: 4.75, label: 'shared notes' }] : []}
          emphasis={(e, t) => (step === 1 && t.role === 'lower') || (revealed && step === 3 && e.midi === 72)} />
      )}
      legend={revealed ? 'The dashed squares are the melody; the long bar is the low C3. After you asked to reveal, the final C5 is outlined: B4 to C5 is one semitone.' : 'Dots are neutral on purpose: read the shape first. The ending appears when you ask for it.'}
      readAloud={revealed ? 'Over a held C3, C4 D4 E4 F4 G4 A4 B4 sound 0.7 seconds apart. In the arrival version C5 follows B4 at 4.9 seconds; in the open version nothing follows.' : 'Over a held C3, seven rising notes sound 0.7 seconds apart, then there is listening space. Reveal to read the rest.'}
      hideParas={p => !revealed && /C5/.test(p)}
      sourceNote={SRC1}
    />
  )
}

// ---------- 1C-V1: voice horizontally, harmony vertically
export function M1CV1() {
  const w = ['Read left to right: time passes', 'Trace the lower line: C3 holds for 12 seconds', 'Trace the upper line: E4, then G4, then D4', 'Stop at 6 seconds: C3 and G4 sound together, one moment of harmony']
  return (
    <VisualTeachingBlock
      id="v-1c-1" k="1C-V1"
      steps={w}
      figure={step => (
        <EventTimeline title="The 12-second two-voice example drawn from its own events" total={12}
          tracks={tracksOf(C01, { lower: 'Foundation', upper: 'Upper voice' })}
          marker={step === 3 ? { t: 6, label: 'C3 + G4 together' } : undefined}
          emphasis={(e, t) => (step === 1 && t.role === 'lower') || (step === 2 && t.role === 'upper')} />
      )}
      legend="The thin schematic sheet (SYS-04) shows two beats only. This chart is drawn from the exact events of the audio example below."
      extra={<div className="mt-3"><div className="flex flex-wrap gap-3"><ClipButton id="v1c1-b" label="Hear both voices" events={C01} status="Now playing both voices" /><ClipButton id="v1c1-l" label="Foundation only" events={solo(C01, 'foundation')} status="Now playing only the foundation" ghost /><ClipButton id="v1c1-u" label="Upper voice only" events={solo(C01, 'upper')} status="Now playing only the upper voice" ghost /><StopButton /></div><NowPlaying /></div>}
      inspect={{ folder: 'w1', file: 'SYS-04_voice-path-chart_learner.svg', label: 'Open the original two-beat schematic (SYS-04)' }}
      readAloud="C3 holds 0 to 12 seconds. E4 plays 2 to 4, G4 plays 5 to 7, D4 plays 9 to 11."
      sourceNote={SRC1}
    />
  )
}

// ---------- 1C-V2: timing
export function M1CV2() {
  const w = ['Both examples hold C3 for 12 seconds', 'Early version: E4 enters at 2 seconds', 'Delayed version: E4 enters at 7 seconds', 'Same pitch, same 4-second length: only the start moved']
  return (
    <VisualTeachingBlock
      id="v-1c-2" k="1C-V2"
      steps={w}
      figure={step => (
        <div className="space-y-4">
          <div><p className="font-semibold m-0">Early entrance</p><EventTimeline title="Early entrance: E4 begins at 2 seconds" total={12} tracks={tracksOf(C02)} marker={step === 1 || step === 3 ? { t: 2, label: 'enters at 2 s' } : undefined} emphasis={(e, t) => step === 3 && t.role === 'upper'} /></div>
          <div><p className="font-semibold m-0">Delayed entrance</p><EventTimeline title="Delayed entrance: E4 begins at 7 seconds" total={12} tracks={tracksOf(C03)} marker={step === 2 || step === 3 ? { t: 7, label: 'enters at 7 s' } : undefined} emphasis={(e, t) => step === 3 && t.role === 'upper'} /></div>
        </div>
      )}
      legend="Same pitch (E4), same length (4 s), same low C3. Only the horizontal position of the upper bar changes."
      extra={<div className="mt-3"><div className="flex flex-wrap gap-3"><ClipButton id="v1c2-e" label="Hear the early entrance" events={C02} status="Now playing the early entrance" /><ClipButton id="v1c2-d" label="Hear the delayed entrance" events={C03} status="Now playing the delayed entrance" /><StopButton /></div><NowPlaying /></div>}
      readAloud="Both: C3 held 0 to 12 seconds. Early: E4 from 2 to 6 seconds. Delayed: E4 from 7 to 11 seconds."
      sourceNote={SRC1}
    />
  )
}

// ---------- 1C-V3: two 36-second outcomes, one common path
export function M1CV3() {
  const [rev, setRev] = useState(false)
  const relabel = (e: { midi: number }) => (e.midi === 72 && !rev ? 'final event' : undefined)
  const w = ['Find the shared path: the first 33 seconds match', 'The foundation C3 holds for all 36 seconds', 'Read the one different event at the end']
  return (
    <VisualTeachingBlock
      id="v-1c-3" k="1C-V3"
      steps={w}
      figure={step => (
        <div className="space-y-4">
          <div><p className="font-semibold m-0">Landing version</p><EventTimeline title="Landing version over 36 seconds" total={36} tracks={tracksOf(C04, { relabel })} shade={step === 0 ? [{ from: 0, to: 33, label: 'identical for 33 s' }] : []} emphasis={(e, t) => (step === 1 && t.role === 'lower') || (step === 2 && e.midi === 72)} /></div>
          <div><p className="font-semibold m-0">Open version</p><EventTimeline title="Open version over 36 seconds" total={36} tracks={tracksOf(C05)} shade={step === 0 ? [{ from: 0, to: 33, label: 'identical for 33 s' }] : []} emphasis={(e, t) => step === 1 && t.role === 'lower'} /></div>
        </div>
      )}
      legend="Both charts are drawn from the exact events of the two audio examples. The landing version adds one upper event (C5, 33 to 35.8 s)."
      extra={<div className="mt-3"><div className="flex flex-wrap gap-3"><button type="button" className="sp-btn sp-btn--ghost" aria-pressed={rev} onClick={() => setRev(v => !v)}>{rev ? 'Hide the final note name' : 'Reveal the final note name'}</button><ClipButton id="v1c3-a" label="Hear the landing version" events={C04} status="Now playing the landing version" /><ClipButton id="v1c3-o" label="Hear the open version" events={C05} status="Now playing the open version" /><StopButton /></div><NowPlaying /></div>}
      readAloud="Both versions: C3 held 0 to 36 seconds; upper E4 8 to 12, G4 15 to 19, D4 23 to 27, B4 29 to 32. The landing version adds C5 from 33 to 35.8 seconds."
      sourceNote={SRC1}
    />
  )
}

// ---------- 1C-V4: the personal atlas
export function M1CV4() {
  const [demo, setDemo] = useState(false)
  return (
    <VisualTeachingBlock
      id="v-1c-4" k="1C-V4"
      steps={['Notice the factual note positions', 'Begin with your foundation and moving line', 'Mark the moment the upper voice changed']}
      figure={() => (
        <div className="space-y-3">
          <Fig folder="w1" file="W1-04_personal-tonal-atlas-worksheet_learner.svg" mode="fit" caption="Your atlas: the circle of note positions is fact; the boxes beside it are yours." />
          <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={demo} onClick={() => setDemo(v => !v)}>{demo ? 'Reset to a blank grid' : 'Show a demonstration of the structure'}</button>
          <EventTimeline title={demo ? 'Demonstration: a held C3 and an upper line' : 'A blank grid to draw your own foundation and moving line'} total={12} tracks={tracksOf(C01, { lower: 'Foundation', upper: 'Upper voice' })} blank={!demo} />
        </div>
      )}
      legend="The demonstration shows the structure only (a held line and a moving line). It contains no feelings: those are yours to add."
      extra={<p className="mt-2 sp-noprint"><a className="font-medium" style={{ color: '#b45309' }} href="/soundscape/w1/pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf">Print the blank atlas (PDF)</a></p>}
      sourceNote="The blank worksheet and demonstration are original AMF graphics."
    />
  )
}
