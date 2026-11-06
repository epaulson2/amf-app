'use client'
import { useState } from 'react'
import FitKeys from './FitKeys'
import TwoRulers, { type RulerPair } from './TwoRulers'
import { NowPlaying, StopButton, useAudio } from '../AudioProvider'
import { INTERVALS, type IntervalRecord } from '@/lib/soundscape/resources/palette'
import { pairEvents } from '@/lib/soundscape/week2/fixtures'
import { midiToName } from '@/lib/soundscape/midi'
import Md from '../Md'

export type ReaderItem = { rec: IntervalRecord; lower?: number; upper?: number }

/** Select an interval card and read it: exact pair on a keyboard, both rulers, name, sound together and as a melody. */
export default function PaletteReader({ items, withTritoneLens = false }: { items: ReaderItem[]; withTritoneLens?: boolean }) {
  const a = useAudio()
  const [i, setI] = useState(0)
  const it = items[i]
  const lower = it.lower ?? it.rec.lowerMidi, upper = it.upper ?? it.rec.upperMidi
  const lowerName = it.lower ? midiToName(it.lower) : it.rec.lowerName
  const upperName = it.upper ? midiToName(it.upper) : it.rec.upperName
  const pair: RulerPair = { id: it.rec.id, label: it.rec.name, lowerMidi: lower, upperMidi: upper, lowerName, upperName, intervalName: `${it.rec.name.toLowerCase()}` }
  const lens: RulerPair[] = [
    { id: 'd5', label: 'B3–F4', lowerMidi: 59, upperMidi: 65, lowerName: 'B3', upperName: 'F4', intervalName: 'diminished fifth' },
    { id: 'a4', label: 'C4–F♯4', lowerMidi: 60, upperMidi: 66, lowerName: 'C4', upperName: 'F♯4', intervalName: 'augmented fourth' },
  ]
  const isTritone = it.rec.semitones === 6
  return (
    <div className="sp-card p-3 sm:p-4" data-reader>
      <div role="group" aria-label="Choose an interval card" className="flex flex-wrap gap-2 mb-3">
        {items.map((x, k) => <button key={x.rec.id + k} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={k === i} onClick={() => setI(k)}>{x.rec.name} · {x.rec.semitones}</button>)}
      </div>
      <FitKeys lo={Math.min(lower, upper) - 1} hi={Math.max(lower, upper) + 1} title={`Keyboard with ${lowerName} and ${upperName} outlined: ${it.rec.semitones} semitones apart`} showNames labels={{ [lower]: lowerName, [upper]: upperName }} marks={{ [lower]: 'on', [upper]: 'on' }} />
      <div className="mt-3"><TwoRulers pairs={[pair]} initial={0} /></div>
      <div className="flex flex-wrap gap-2 mt-3">
        <button type="button" className="sp-btn" onClick={() => a.play('rd-t', pairEvents(lower, upper, 'together'), `Now playing ${lowerName} and ${upperName} together`)}>Hear together</button>
        <button type="button" className="sp-btn sp-btn--ghost" onClick={() => a.play('rd-m', pairEvents(lower, upper, 'up'), `Now playing ${lowerName} then ${upperName}`)}>Hear as a melody</button>
        <StopButton />
      </div>
      <NowPlaying />
      <p className="m-0 mt-2 text-sm sp-muted">Colour band: <strong>{it.rec.color.name}</strong>, a personal suggestion, never a fact about the sound. The measurable parts are the note pair and its {it.rec.semitones} semitones.</p>
      {withTritoneLens && isTritone && (
        <div className="mt-4">
          <p className="font-semibold m-0"><Md>{'The same six semitones, two written names'}</Md></p>
          <TwoRulers pairs={lens} mode="choose" />
        </div>
      )}
    </div>
  )
}

export const FEATURED = (): ReaderItem[] => {
  const R = (id: string) => INTERVALS.find(x => x.id === id)!
  return [{ rec: R('IP-04'), lower: 60, upper: 64 }, { rec: R('IP-05'), lower: 60, upper: 65 }, { rec: R('IP-02'), lower: 62, upper: 64 }, { rec: R('IP-03'), lower: 64, upper: 67 }]
}
export const ALL = (): ReaderItem[] => INTERVALS.map(rec => ({ rec }))
