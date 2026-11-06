'use client'
import { useState } from 'react'
import VisualTeachingBlock from './VisualTeachingBlock'
import EventTimeline from './EventTimeline'
import MotionPanel from './MotionPanel'
import TwoRulers, { type RulerPair } from './TwoRulers'
import FitKeys from './FitKeys'
import PaletteReader, { ALL, FEATURED } from './PaletteReader'
import { tracksOf } from './shared'
import Fig from '../week1/Fig'
import { ClipButton, NowPlaying, StopButton } from '../AudioProvider'
import { A, B, C, FIVE } from '@/lib/soundscape/week2/fixtures'
import { solo } from '@/lib/soundscape/week1/fixtures'

const SRC = 'The timeline, rulers and arrows are drawn from the same events and MIDI numbers the audio uses; painted paper is decoration only.'
const p = (lower: number, upper: number) => ({ lower, upper })

const RP = (id: string, label: string, lo: number, hi: number, ln: string, un: string, name: string): RulerPair => ({ id, label, lowerMidi: lo, upperMidi: hi, lowerName: ln, upperName: un, intervalName: name })
export const PAIRS_2A: RulerPair[] = [RP('CE', 'C–E', 60, 64, 'C4', 'E4', 'major third'), RP('EG', 'E–G', 64, 67, 'E4', 'G4', 'minor third'), RP('CF', 'C–F', 60, 65, 'C4', 'F4', 'perfect fourth'), RP('DE', 'D–E', 62, 64, 'D4', 'E4', 'major second')]

export function M2AV1() {
  return (
    <VisualTeachingBlock
      id="v-2a-1" k="2A-V1"
      art={{ src: '/soundscape/art/W2-01_starting-dyad_learner_styleB.png', alt: 'The original starting-dyad artwork on painted paper: a lower C4 line with a circle and an upper E4 dashed line with a square, both held across four beats.', caption: 'Original Style B artwork: C4 below, E4 above, both held. The exact chart below is drawn from the sound itself.' }}
      steps={['Find the lower C4 (circle)', 'Find the upper E4 (square)', 'Notice they overlap: two parts sounding at once', 'Count the semitones between them: four, a major third']}
      figure={step => (
        <>
          <EventTimeline title="C4 below and E4 above, both held for 4 seconds" total={4} tracks={tracksOf(A.together, { lower: 'Lower voice', upper: 'Upper voice' })} emphasis={(e, t) => (step === 0 && t.role === 'lower') || (step === 1 && t.role === 'upper') || step === 2} />
          {step >= 3 && <div className="mt-3"><FitKeys lo={59} hi={65} title="Keyboard with C4 and E4 outlined: four semitones apart" showNames labels={{ 60: 'C4', 64: 'E4' }} marks={{ 60: 'on', 61: 'passed', 62: 'passed', 63: 'passed', 64: 'on' }} /></div>}
        </>
      )}
      legend="Circle = lower voice. Square = upper voice. A dashed key is passed on the way from C4 to E4."
      extra={<div className="mt-3"><div className="flex flex-wrap gap-3"><ClipButton id="v2a1-l" label="Hear C alone" events={A.C} status="Now playing C4 alone" ghost /><ClipButton id="v2a1-u" label="Hear E alone" events={A.E} status="Now playing E4 alone" ghost /><ClipButton id="v2a1-b" label="Hear both" events={A.together} status="Now playing C4 and E4 together" /><StopButton /></div><NowPlaying /></div>}
      readAloud="C4 (MIDI 60) and E4 (MIDI 64) both sound from 0 to 4 seconds. Their distance is four semitones: a major third."
      sourceNote={SRC}
    />
  )
}

export function M2AV2() {
  const [i, setI] = useState(0)
  return (
    <VisualTeachingBlock
      id="v-2a-2" k="2A-V2"
      steps={['Count the letters from C to E: three positions', 'Count the hops from zero: four semitone steps', 'Switch to E–G: still three letters, only three hops', 'Compare C–F: four letters, five hops']}
      figure={() => <TwoRulers pairs={PAIRS_2A} index={i} onIndex={setI} />}
      legend="Ruler 1 counts note letters including both ends. Ruler 2 counts neighbouring keys starting at zero; dark chips are black keys."
      extra={<div className="flex flex-wrap gap-2 mt-3 sp-noprint"><button type="button" className="sp-btn sp-btn--ghost" onClick={() => setI(0)}>Show C–E</button><button type="button" className="sp-btn sp-btn--ghost" onClick={() => setI(1)}>Show E–G</button><button type="button" className="sp-btn sp-btn--ghost" onClick={() => setI(2)}>Show C–F</button></div>}
      readAloud="C to E: letters C, D, E (three positions: a third); hops C to C♯, D, D♯, E (four semitones): a major third. E to G: letters E, F, G (a third); three semitones: a minor third."
      sourceNote={SRC}
    />
  )
}

export function M2AV3() {
  const cases = [
    { t: 'Upper rises', b: p(60, 64), a: p(60, 65), k: 'Oblique', ib: 'major third, 4', ia: 'perfect fourth, 5', ev: A.upperEF, id: 'u' },
    { t: 'Lower falls', b: p(60, 64), a: p(59, 64), k: 'Oblique', ib: 'major third, 4', ia: 'perfect fourth, 5', ev: A.lowerCB, id: 'f' },
    { t: 'Lower rises', b: p(60, 64), a: p(62, 64), k: 'Oblique', ib: 'major third, 4', ia: 'major second, 2', ev: A.lowerCD, id: 'r' },
  ]
  return (
    <VisualTeachingBlock
      id="v-2a-3" k="2A-V3"
      steps={['Find the common start: C4+E4 in every panel', 'Panel 1: C4 holds, E4 rises 1', 'Panel 2: E4 holds, C4 falls 1 (to B3)', 'Panel 3: E4 holds, C4 rises 2 (to D4)']}
      figure={step => (
        <div className="grid gap-3 md:grid-cols-3">
          {cases.map((c, k) => (
            <div key={c.id} className={step === k + 1 || step === 0 ? 'ring-2 ring-amber-600 rounded' : ''}>
              <MotionPanel title={c.t} before={c.b} after={c.a} kind={c.k} intervalBefore={c.ib} intervalAfter={c.ia} />
              <div className="mt-2"><ClipButton id={`v2a3-${c.id}`} label={`Hear: ${c.t.toLowerCase()}`} events={c.ev} status={`Now playing: ${c.t.toLowerCase()}, starting fresh from C4 and E4`} ghost /></div>
            </div>
          ))}
        </div>
      )}
      legend="Circle = lower voice, square = upper voice. A solid filled node is the start, the hollow node is the next moment, the arrow shows what that voice does, and numbers show semitones moved."
      extra={<><div className="mt-3"><StopButton /></div><NowPlaying /></>}
      readAloud="From C4+E4: (1) C holds, E rises one semitone to F: C4+F4. (2) E holds, C falls one semitone to B3: B3+E4. (3) E holds, C rises two semitones to D4: D4+E4."
      sourceNote={SRC}
      inspect={{ folder: 'w2', file: 'W2-02_dyad-transformations_instructor.svg', label: 'Open the original five-case sheet (W2-02)' }}
    />
  )
}

export function M2AV4() {
  return (
    <VisualTeachingBlock
      id="v-2a-4" k="2A-V4"
      steps={['Choose the major third card and find C4 and E4 on the keyboard', 'Count the four neighbouring-key steps to confirm', 'Hear it together, then as a melody', 'Switch to C–F and compare']}
      figure={() => <PaletteReader items={FEATURED()} />}
      legend="Colour is a personal suggestion. Note names, spelling and the semitone count are the measurable facts."
      sourceNote={SRC}
    />
  )
}

export function M2BV1() {
  const k = [
    { t: 'Oblique', sub: 'C holds, E rises', b: p(60, 64), a: p(60, 65), ib: 'major third, 4', ia: 'perfect fourth, 5' },
    { t: 'Contrary', sub: 'C falls, E rises', b: p(60, 64), a: p(59, 65), ib: 'major third, 4', ia: 'diminished fifth, 6' },
    { t: 'Similar', sub: 'both rise, by 2 and 1', b: p(60, 64), a: p(62, 65), ib: 'major third, 4', ia: 'minor third, 3' },
    { t: 'Parallel', sub: 'both rise by 2 (teaching example)', b: p(60, 64), a: p(62, 66), ib: 'major third, 4', ia: 'major third, 4' },
  ]
  return (
    <VisualTeachingBlock
      id="v-2b-1" k="2B-V1"
      steps={['Oblique: one voice holds', 'Contrary: the arrows point opposite ways', 'Similar: both rise, but by different amounts', 'Parallel: both rise by the same amount, so the interval is kept']}
      figure={step => (
        <div className="grid gap-3 sm:grid-cols-2">
          {k.map((x, i) => (
            <div key={x.t} className={step === i ? 'ring-2 ring-amber-600 rounded' : ''}>
              <MotionPanel title={`${x.t}: ${x.sub}`} before={x.b} after={x.a} kind={x.t} intervalBefore={x.ib} intervalAfter={x.ia} />
            </div>
          ))}
        </div>
      )}
      legend="The fourth panel (D4+F♯4) is an explanatory example, not one of the five canonical changes. Similar and parallel differ only in whether the distance moved is equal."
      extra={<><div className="flex flex-wrap gap-3 mt-3"><ClipButton id="v2b1-o" label="Hear oblique" events={B.upperRises} status="Now playing oblique motion" ghost /><ClipButton id="v2b1-c" label="Hear contrary" events={B.apart} status="Now playing contrary motion" ghost /><ClipButton id="v2b1-s" label="Hear similar" events={B.climb} status="Now playing similar motion" ghost /><StopButton /></div><NowPlaying /></>}
      inspect={{ folder: 'w2', file: 'W2-03_motion-types_instructor.svg', label: 'Open the original motion-types sheet (W2-03)' }}
      readAloud="Oblique C4+E4 to C4+F4. Contrary C4+E4 to B3+F4. Similar C4+E4 to D4+F4 (lower +2, upper +1). Parallel, as an example: C4+E4 to D4+F♯4 (both +2, major third kept)."
      sourceNote={SRC}
    />
  )
}

export function M2BV2() {
  const steps = FIVE.map((f, i) => `Case ${i + 1}: ${f.label.toLowerCase()}, ${f.from} to ${f.to}, ${f.interval}`)
  const pr = (s: string) => { const [l, u] = s.split('+'); const m = (n: string) => ({ C4: 60, B3: 59, D4: 62, E4: 64, F4: 65 } as Record<string, number>)[n]; return p(m(l), m(u)) }
  return (
    <VisualTeachingBlock
      id="v-2b-2" k="2B-V2"
      steps={steps}
      figure={step => (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FIVE.map((f, i) => (
            <div key={f.id} className={step === i ? 'ring-2 ring-amber-600 rounded' : ''}>
              <MotionPanel title={`${i + 1}. ${f.label}`} before={pr(f.from)} after={pr(f.to)} kind={f.motion} intervalBefore="major third, 4" intervalAfter={`${f.interval}, ${f.semis}`} />
              <div className="mt-2"><ClipButton id={`v2b2-${f.id}`} label={`Hear case ${i + 1}`} events={f.events as never} status={`Now playing case ${i + 1}: ${f.label.toLowerCase()}, starting fresh from C4+E4`} ghost /></div>
            </div>
          ))}
        </div>
      )}
      legend="Every panel starts from the same C4+E4 and resets before each case. Read order: starting pair, lower voice, upper voice, ending pair, interval name."
      extra={<><div className="mt-3"><StopButton /></div><NowPlaying /></>}
      inspect={{ folder: 'w2', file: 'W2-02_dyad-transformations_instructor.svg', label: 'Open the original five-case sheet (W2-02)' }}
      readAloud="From C4+E4: C4+F4 (oblique, perfect fourth, 5); B3+E4 (oblique, perfect fourth, 5); D4+E4 (oblique, major second, 2); B3+F4 (contrary, diminished fifth, 6); D4+F4 (similar, minor third, 3)."
      sourceNote={SRC}
    />
  )
}

export function M2BV3() {
  const [i, setI] = useState(0)
  const pairs = [RP('d5', 'B3–F4', 59, 65, 'B3', 'F4', 'diminished fifth'), RP('a4', 'C4–F♯4', 60, 66, 'C4', 'F♯4', 'augmented fourth')]
  return (
    <VisualTeachingBlock
      id="v-2b-3" k="2B-V3"
      steps={['B3–F4: count the letters B, C, D, E, F: five, a fifth', 'B3–F4: count the hops: six, one fewer than a perfect fifth, so diminished', 'C4–F♯4: count the letters C, D, E, F: four, a fourth', 'C4–F♯4: count the hops: six, one more than a perfect fourth, so augmented']}
      figure={() => <TwoRulers pairs={pairs} mode="choose" index={i} onIndex={setI} />}
      legend="Both pairs measure six semitones on the keyboard. Their letters, not their semitones, give them different written names."
      extra={<div className="mt-3"><FitKeys lo={59} hi={66} title="Keyboard from B3 to F♯4 with B3, F4 and F♯4 outlined" showNames labels={{ 59: 'B3', 65: 'F4', 66: 'F♯4' }} marks={{ 59: 'on', 65: 'on', 66: 'on' }} /></div>}
      readAloud="B3 to F4: letters B C D E F (five), six semitones: diminished fifth. C4 to F♯4: letters C D E F (four), six semitones: augmented fourth."
      sourceNote={SRC}
    />
  )
}

export function M2CV1() {
  return (
    <VisualTeachingBlock
      id="v-2c-1" k="2C-V1"
      steps={['Read time left to right', 'Upper melody: E4, then F4, then E4', 'Lower voice: C4 holds underneath', 'At 8 seconds: C4 + E4, a major third (4)', 'At 17 seconds: C4 + F4, a perfect fourth (5)']}
      figure={step => (
        <EventTimeline title="A solved example: held C4 under an E4, F4, E4 melody" total={36} tracks={tracksOf(C.held, { lower: 'Lower voice', upper: 'Upper voice' })}
          marker={step === 3 ? { t: 8, label: 'C4+E4 · 4' } : step === 4 ? { t: 17, label: 'C4+F4 · 5' } : undefined}
          emphasis={(e, t) => (step === 1 && t.role === 'upper') || (step === 2 && t.role === 'lower')} />
      )}
      legend="Across the page: each voice through time (horizontal story). At one instant, from lower note to upper note: the interval (vertical story)."
      extra={<><div className="flex flex-wrap gap-3 mt-3"><ClipButton id="v2c1-b" label="Hear both voices" events={C.held} status="Now playing both voices" /><ClipButton id="v2c1-l" label="Lower only" events={solo(C.held, 'foundation')} status="Now playing the lower voice" ghost /><ClipButton id="v2c1-u" label="Upper only" events={solo(C.held, 'upper')} status="Now playing the upper voice" ghost /><StopButton /></div><NowPlaying /><div className="mt-3"><Fig folder="w2" file="W2-04_blank-two-voice-path_learner.svg" mode="fit" caption="The blank two-voice grid you will draw on, once you have read the solved example above." /></div></>}
      readAloud="Lower C4 holds 0 to 36 seconds. Upper E4 4 to 10, F4 14 to 20, E4 26 to 32. Intervals: C4+E4 major third (4), C4+F4 perfect fourth (5)."
      sourceNote={SRC}
    />
  )
}

export function M2CV2() {
  const w = ['The upper melody is identical in both versions', 'Version one: C4 holds the whole time', 'Version two: the lower line goes C4, B3, C4', 'At 17 seconds: C4+F4 (5) in version one, B3+F4 (6) in version two']
  return (
    <VisualTeachingBlock
      id="v-2c-2" k="2C-V2"
      steps={w}
      figure={step => (
        <div className="space-y-4">
          <div><p className="font-semibold m-0">Version one: held foundation</p><EventTimeline title="Version one over 36 seconds: C4 holds under E4 F4 E4" total={36} tracks={tracksOf(C.held)} shade={step === 0 ? [{ from: 4, to: 32, label: 'same upper melody' }] : []} marker={step === 3 ? { t: 17, label: 'C4+F4 · 5' } : undefined} emphasis={(e, t) => step === 1 && t.role === 'lower'} /></div>
          <div><p className="font-semibold m-0">Version two: moving foundation</p><EventTimeline title="Version two over 36 seconds: lower C4 B3 C4 under the same E4 F4 E4" total={36} tracks={tracksOf(C.moving)} shade={step === 0 ? [{ from: 4, to: 32, label: 'same upper melody' }] : []} marker={step === 3 ? { t: 17, label: 'B3+F4 · 6' } : undefined} emphasis={(e, t) => step === 2 && t.role === 'lower'} /></div>
        </div>
      )}
      legend="Both charts come from the exact events of the two audio versions. The upper arrays are identical; only the lower voice differs, at 12 s and 24 s."
      extra={<><div className="flex flex-wrap gap-3 mt-3"><ClipButton id="v2c2-a" label="Hear version one" events={C.held} status="Now playing version one" /><ClipButton id="v2c2-b" label="Hear version two" events={C.moving} status="Now playing version two" /><ClipButton id="v2c2-l" label="Version two, lower voice only" events={solo(C.moving, 'foundation')} status="Now playing the changing lower voice" ghost /><StopButton /></div><NowPlaying /></>}
      readAloud="Both: upper E4 4 to 10, F4 14 to 20, E4 26 to 32. Version one: lower C4 0 to 36. Version two: lower C4 0 to 12, B3 12 to 24, C4 24 to 36."
      sourceNote={SRC}
    />
  )
}

export function M2CV3() {
  const [demo, setDemo] = useState(false)
  return (
    <VisualTeachingBlock
      id="v-2c-3" k="2C-V3"
      steps={['Draw two or three upper note events, in order', 'Draw one long supporting note beneath them (version one)', 'Copy it, and let the lower line move at least once (version two)', 'Mark where the vertical interval changed']}
      figure={() => (
        <div className="space-y-3">
          <button type="button" className="sp-btn sp-btn--ghost" aria-pressed={demo} onClick={() => setDemo(v => !v)}>{demo ? 'Back to the blank grid' : 'Show a tiny solved example'}</button>
          <EventTimeline title={demo ? 'A tiny solved example: C4+E4, C4+F4, B3+F4, C4+E4' : 'A blank two-voice grid to plan your own piece'} total={8} tracks={tracksOf(C.dialogue)} blank={!demo} />
          <Fig folder="w2" file="W2-04_blank-two-voice-path_learner.svg" mode="fit" />
        </div>
      )}
      legend="Height = named pitch. Across = time. A held note is a long horizontal bar. The solved example is only a model: your piece is yours."
      extra={<p className="mt-2 sp-noprint"><a className="font-medium" style={{ color: '#b45309' }} href="/soundscape/w2/pdf/W2-04_blank-two-voice-path_blank.pdf">Print the blank two-voice sheet (PDF)</a></p>}
      sourceNote={SRC}
    />
  )
}

export function MAtlas() {
  return (
    <VisualTeachingBlock
      id="v-atlas" k="ATLAS"
      steps={['Choose a card and find its two notes on the keyboard', 'Count its semitone steps from zero', 'Hear it together, then as a melody', 'Choose the tritone card and read both spellings']}
      figure={() => <PaletteReader items={ALL()} withTritoneLens />}
      legend="Colour is only an artistic prompt. The note pair, the spelling and the semitone number are the measurable facts."
      sourceNote={SRC}
    />
  )
}
