'use client'
import { useState } from 'react'
import { isBlackKey, midiToName } from '@/lib/soundscape/midi'
import { NUMBER, letterRun } from '@/lib/soundscape/visual/rulers'

export type RulerPair = { id: string; label: string; lowerMidi: number; upperMidi: number; lowerName: string; upperName: string; intervalName: string }

/** Two rulers for one pair: letter positions (inclusive count) and neighbouring-key hops (count starts at zero). */
export default function TwoRulers({ pairs, mode = 'both', initial = 0, index, onIndex }: { pairs: RulerPair[]; mode?: 'both' | 'choose'; initial?: number; index?: number; onIndex?: (i: number) => void }) {
  const [own, setOwn] = useState(initial)
  const i = index ?? own
  const setI = (k: number) => { setOwn(k); onIndex?.(k) }
  const [show, setShow] = useState<'both' | 'letters' | 'hops'>('both')
  const p = pairs[i]
  const letters = letterRun(p.lowerName, p.upperName)
  const hops = p.upperMidi - p.lowerMidi
  const chromatic = Array.from({ length: hops + 1 }, (_, k) => (k === 0 ? p.lowerName : k === hops ? p.upperName : midiToName(p.lowerMidi + k)))
  return (
    <div className="sp-card p-4" data-rulers={p.id}>
      {pairs.length > 1 && (
        <div role="group" aria-label="Choose a pair" className="flex flex-wrap gap-2 mb-3">
          {pairs.map((x, k) => <button key={x.id} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={k === i} onClick={() => setI(k)}>{x.label}</button>)}
        </div>
      )}
      {mode === 'choose' && (
        <div role="group" aria-label="Which ruler" className="flex flex-wrap gap-2 mb-3">
          {(['both', 'letters', 'hops'] as const).map(m => <button key={m} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={show === m} onClick={() => setShow(m)}>{m === 'both' ? 'Show both rulers' : m === 'letters' ? 'Show letter count' : 'Show chromatic size'}</button>)}
        </div>
      )}
      {(show === 'both' || show === 'letters') && (
        <div>
          <p className="font-semibold m-0">Ruler 1 — note letters, counting both ends</p>
          <ol className="list-none p-0 m-0 mt-1 flex flex-wrap gap-1" aria-label="Letter positions">
            {letters.map((l, k) => (
              <li key={k} className="text-center"><span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 rounded border-2 border-slate-700 bg-white font-semibold">{l}</span><span className="block text-xs sp-muted">{k + 1}</span></li>
            ))}
          </ol>
          <p className="m-0 mt-1 text-sm">{letters.join('–')}: <strong>{letters.length} letter positions</strong>, so a <strong>{NUMBER[letters.length] ?? letters.length}</strong>.</p>
        </div>
      )}
      {(show === 'both' || show === 'hops') && (
        <div className="mt-3">
          <p className="font-semibold m-0">Ruler 2 — neighbouring keys, count starts at zero</p>
          <ol className="list-none p-0 m-0 mt-1 flex flex-wrap gap-1" aria-label="Chromatic hops">
            {chromatic.map((n, k) => {
              const dark = isBlackKey(p.lowerMidi + k)
              return <li key={k} className="text-center"><span className={`inline-flex items-center justify-center min-w-[2.5rem] h-10 px-1 rounded border-2 border-slate-700 text-sm font-semibold ${dark ? 'bg-slate-900 text-white' : 'bg-white'}`}>{n}</span><span className="block text-xs sp-muted">{k}</span></li>
            })}
          </ol>
          <p className="m-0 mt-1 text-sm"><strong>{hops} semitone steps</strong>. The starting note is zero; black keys count too.</p>
        </div>
      )}
      <p className="m-0 mt-3 sp-callout"><strong>{p.lowerName}–{p.upperName}: {p.intervalName}.</strong> {letters.length} letters name the number; {hops} semitones help fix the quality.</p>
    </div>
  )
}
