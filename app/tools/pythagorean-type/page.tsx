'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'

const SEQ_LETTER = ['F','C','G','D','A','E','B']
const SEQ_SOL    = ['fa','doh','sol','re','la','mi','ri']

type Mode = 'letter' | 'sol' | 'reverse-letter' | 'reverse-sol'

const MODES: { id: Mode; label: string; target: string[] }[] = [
  { id: 'letter',         label: 'Letters →',         target: SEQ_LETTER },
  { id: 'sol',            label: 'Solfège →',          target: SEQ_SOL },
  { id: 'reverse-letter', label: 'Letters ← (rev)',    target: [...SEQ_LETTER].reverse() },
  { id: 'reverse-sol',    label: 'Solfège ← (rev)',    target: [...SEQ_SOL].reverse() },
]

function getBest(mode: Mode): number | null {
  try { const v = localStorage.getItem(`pyth-type-best-${mode}`); return v ? parseFloat(v) : null } catch { return null }
}
function setBest(mode: Mode, t: number) {
  try { localStorage.setItem(`pyth-type-best-${mode}`, String(t)) } catch { /* noop */ }
}

export default function TypePage() {
  const [mode, setMode]         = useState<Mode>('letter')
  const [input, setInput]       = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime]   = useState<number | null>(null)
  const [newBest, setNewBest]   = useState(false)
  const [best, setBestState]    = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const target = MODES.find(m => m.id === mode)!.target

  useEffect(() => {
    setBestState(getBest(mode))
  }, [mode])

  const reset = useCallback(() => {
    setInput(''); setStartTime(null); setEndTime(null); setNewBest(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const tokens = input.trim() === '' ? [] : input.trim().split(/\s+/)
  const completed = tokens.filter((t, i) => t.toLowerCase() === target[i]?.toLowerCase()).length

  const handleChange = useCallback((val: string) => {
    if (endTime) return
    if (!startTime && val.trim()) setStartTime(Date.now())
    setInput(val)

    const toks = val.trim().split(/\s+/)
    const allCorrect = toks.length >= 7 &&
      toks.slice(0, 7).every((t, i) => t.toLowerCase() === target[i].toLowerCase())

    if (allCorrect) {
      const now = Date.now()
      setEndTime(now)
      if (startTime) {
        const elapsed = (now - startTime) / 1000
        const prev = getBest(mode)
        if (!prev || elapsed < prev) {
          setBest(mode, elapsed)
          setBestState(elapsed)
          setNewBest(true)
        }
      }
    }
  }, [endTime, startTime, target, mode])

  const elapsed = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(2) : null

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between"
           style={{ background: '#0f172a' }}>
        <div className="flex items-center gap-3">
          <Link href="/tools" className="text-slate-500 hover:text-white text-xs transition-colors">← Tools</Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-bold text-slate-400">Sequence Typer</span>
        </div>
        {best && (
          <span className="text-xs text-slate-500">Best: <span className="text-amber-400 font-bold">{best.toFixed(2)}s</span></span>
        )}
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">

        {/* Mode tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {MODES.map(m => (
            <button key={m.id}
              onClick={() => { setMode(m.id as Mode); reset() }}
              className="text-xs px-3 py-1.5 rounded-full font-bold transition-colors"
              style={{
                background: mode === m.id ? '#7c3aed' : '#1e293b',
                color: mode === m.id ? 'white' : '#64748b',
                border: `1px solid ${mode === m.id ? '#7c3aed' : '#334155'}`,
              }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Prompt */}
        <div className="mb-6 text-center">
          <p className="text-slate-500 text-xs mb-2">
            Type all 7 {mode.includes('sol') ? 'solfège syllables' : 'letter names'} separated by spaces
            {mode.includes('reverse') ? ' — in reverse order' : ''}
          </p>
          <p className="text-slate-700 text-xs italic">
            {mode.includes('reverse')
              ? (mode.includes('sol') ? 'ri mi la re sol doh fa' : 'B E A D G C F')
              : (mode.includes('sol') ? 'fa doh sol re la mi ri' : 'F C G D A E B')}
          </p>
        </div>

        {/* Done banner */}
        {endTime && (
          <div className="rounded-2xl border border-emerald-700 p-6 mb-6 text-center"
               style={{ background: 'rgba(16,185,129,0.08)' }}>
            <div className="text-4xl mb-2">{newBest ? '🏆' : '✅'}</div>
            <p className="font-extrabold text-xl text-white mb-1">{elapsed}s</p>
            {newBest && <p className="text-emerald-400 text-sm font-bold">New personal best!</p>}
            <button onClick={reset}
              className="mt-4 px-5 py-2 rounded-xl font-bold text-sm text-white"
              style={{ background: '#7c3aed' }}>
              Try Again
            </button>
          </div>
        )}

        {/* Input */}
        {!endTime && (
          <div className="relative">
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={e => handleChange(e.target.value)}
              placeholder={mode.includes('sol') ? 'fa doh sol ...' : 'F C G ...'}
              className="w-full rounded-xl px-4 py-4 text-lg font-bold text-white outline-none
                         border transition-colors tracking-wide"
              style={{
                background: '#0f172a',
                border: '2px solid #334155',
                caretColor: '#a78bfa',
              }}
              onFocus={e => e.target.style.borderColor = '#7c3aed'}
              onBlur={e => e.target.style.borderColor = '#334155'}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}

        {/* Token feedback */}
        {!endTime && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {target.map((t, i) => {
              const typed = tokens[i]?.toLowerCase()
              const correct = typed === t.toLowerCase()
              const active  = i === tokens.length - 1 && !correct && tokens.length > 0
              const filled  = i < tokens.length
              return (
                <div key={t} className="flex flex-col items-center gap-0.5">
                  <div className="text-xs font-bold rounded-lg px-2.5 py-1.5"
                       style={{
                         background: correct ? 'rgba(16,185,129,0.2)' : active ? 'rgba(239,68,68,0.15)' : filled ? 'rgba(239,68,68,0.15)' : '#1e293b',
                         color: correct ? '#34d399' : active ? '#f87171' : filled ? '#f87171' : '#475569',
                         border: `1px solid ${correct ? '#059669' : active ? '#ef4444' : filled ? '#ef4444' : '#334155'}`,
                       }}>
                    {typed || t}
                  </div>
                  <span className="text-slate-700 text-xs">#{i + 1}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Progress */}
        {startTime && !endTime && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 transition-all duration-200 rounded-full"
                   style={{ width: `${(completed / 7) * 100}%` }} />
            </div>
            <span className="text-xs text-slate-600">{completed}/7</span>
          </div>
        )}

        {/* Timer */}
        {startTime && !endTime && (
          <ElapsedTimer startTime={startTime} />
        )}

        {/* Reference */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">
            The Sequence (hidden in practice)
          </p>
          <div className="flex gap-2 flex-wrap opacity-30 hover:opacity-100 transition-opacity">
            {SEQ_LETTER.map((l, i) => (
              <div key={l} className="text-center px-2 py-1.5 rounded-lg border border-slate-800"
                   style={{ minWidth: 36, background: '#0f172a' }}>
                <div className="text-sm font-bold text-white">{l}</div>
                <div className="text-xs text-slate-500">{SEQ_SOL[i]}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-700 mt-1">Hover to reveal</p>
        </div>

      </div>
    </div>
  )
}

function ElapsedTimer({ startTime }: { startTime: number }) {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 100)
    return () => clearInterval(id)
  }, [])
  const s = ((Date.now() - startTime) / 1000).toFixed(1)
  return <p className="text-xs text-slate-700 mt-2 text-right">{s}s</p>
}
