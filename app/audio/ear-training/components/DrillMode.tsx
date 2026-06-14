'use client'

import { useState, useCallback } from 'react'
import { getDiChord, getSprintConfig, useAudioEngine, type Timbre, DEFAULT_MIX } from '@/lib/audio'
import DrillFeedback, { emptyStats, persistStats, type DrillStats } from './DrillFeedback'
import DiChordGrid from './DiChordGrid'

interface DrillModeProps {
  sprint?: number
}

type DrillState = 'idle' | 'playing' | 'awaiting' | 'feedback'

function pickNext(brackets: number[], lastBracket: number | null): number {
  if (brackets.length === 1) return brackets[0]
  const pool = brackets.filter(b => b !== lastBracket)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function DrillMode({ sprint = 1 }: DrillModeProps) {
  const config = getSprintConfig(sprint)
  const { isReady, start, synth } = useAudioEngine()

  const [drillState, setDrillState] = useState<DrillState>('idle')
  const [currentBracket, setCurrentBracket] = useState<number | null>(null)
  const [lastBracket, setLastBracket] = useState<number | null>(null)
  const [stats, setStats] = useState<DrillStats>(emptyStats())
  const [rootMidi] = useState(57)  // A3
  const [isSlow, setIsSlow] = useState(false)
  const [lastResult, setLastResult] = useState<{ correct: boolean; hint: string; correctBracket: number } | null>(null)
  const [currentSprint, setCurrentSprint] = useState(sprint)

  const sprintConfig = getSprintConfig(currentSprint)

  const playDiChord = useCallback(async (bracket: number, slow: boolean) => {
    if (!isReady) await start()
    const dc = getDiChord(bracket)
    // Drill uses pulsation-focused mix by default — pure sine, dry, long sustain
    const drillMix = { pulsation: 8, harmonicity: 0, foFactor: 0 }
    await synth?.play(bracket, slow ? rootMidi - 12 : rootMidi, dc.foDirection, drillMix)
  }, [isReady, start, synth, rootMidi])

  const handleStart = async () => {
    const next = pickNext(sprintConfig.focusBrackets, null)
    setCurrentBracket(next)
    setLastBracket(null)
    setLastResult(null)
    setDrillState('playing')
    setIsSlow(false)
    await playDiChord(next, false)
    setDrillState('awaiting')
  }

  const handleHearAgain = async () => {
    if (!currentBracket) return
    await playDiChord(currentBracket, isSlow)
  }

  const handleSlow = async () => {
    if (!currentBracket) return
    setIsSlow(true)
    await playDiChord(currentBracket, true)
  }

  const handleAnswer = (guessed: number) => {
    if (!currentBracket || drillState !== 'awaiting') return
    synth?.stop()

    const correct = guessed === currentBracket
    const dc = getDiChord(currentBracket)
    const hint = correct
      ? `Yes — ${dc.name}. ${dc.discriminationHint}`
      : dc.discriminationHint

    setLastResult({ correct, hint, correctBracket: currentBracket })
    setLastBracket(currentBracket)

    setStats(prev => {
      const byBracket = { ...prev.byBracket }
      byBracket[currentBracket] = {
        correct: (byBracket[currentBracket]?.correct ?? 0) + (correct ? 1 : 0),
        total: (byBracket[currentBracket]?.total ?? 0) + 1,
      }
      return {
        total: prev.total + 1,
        correct: prev.correct + (correct ? 1 : 0),
        streak: correct ? prev.streak + 1 : 0,
        byBracket,
      }
    })

    setDrillState('feedback')
  }

  const handleNext = async () => {
    const next = pickNext(sprintConfig.focusBrackets, lastBracket)
    setCurrentBracket(next)
    setIsSlow(false)
    setDrillState('playing')
    await playDiChord(next, false)
    setDrillState('awaiting')
  }

  const handleReset = () => {
    synth?.stop()
    persistStats(currentSprint, stats)
    setStats(emptyStats())
    setDrillState('idle')
    setCurrentBracket(null)
    setLastResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Sprint selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>Sprint:</span>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
          <button
            key={s}
            onClick={() => { setCurrentSprint(s); handleReset() }}
            className="rounded-lg px-3 py-1 text-sm font-semibold transition-all"
            style={{
              background: currentSprint === s ? '#7c3aed' : 'rgba(124,58,237,0.1)',
              color: currentSprint === s ? '#fff' : '#a78bfa',
              border: `1px solid ${currentSprint === s ? '#7c3aed' : 'rgba(124,58,237,0.2)'}`,
              cursor: 'pointer',
            }}
          >
            S{s}
          </button>
        ))}
      </div>

      {/* Gate info */}
      <div className="rounded-lg px-4 py-3" style={{ background: '#1e293b' }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#7c3aed' }}>
          Sprint {currentSprint} Gate B
        </p>
        <p className="text-sm" style={{ color: '#cbd5e1' }}>{sprintConfig.gateDescription}</p>
        <p className="text-xs mt-1" style={{ color: '#475569' }}>Focus: {sprintConfig.diChordName}</p>
      </div>

      {/* Stats + feedback */}
      <DrillFeedback stats={stats} lastResult={lastResult} />

      {/* Main drill area */}
      <div className="rounded-xl p-6 text-center" style={{ background: '#1e293b', minHeight: 160 }}>
        {drillState === 'idle' && (
          <div>
            <p className="mb-4" style={{ color: '#94a3b8' }}>
              You&apos;ll hear a di-chord. Identify it by sound alone.
            </p>
            <button
              onClick={handleStart}
              className="rounded-lg px-8 py-3 font-bold text-white transition-all"
              style={{ background: '#7c3aed', cursor: 'pointer', fontSize: '1rem' }}
            >
              Start Drill
            </button>
          </div>
        )}

        {drillState === 'playing' && (
          <p style={{ color: '#64748b', paddingTop: 32 }}>Playing…</p>
        )}

        {drillState === 'awaiting' && (
          <div className="space-y-4">
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Which di-chord was that?</p>
            <DiChordGrid
              selected={-1}
              onSelect={handleAnswer}
              highlightOnly={sprintConfig.focusBrackets}
            />
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handleHearAgain}
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)', cursor: 'pointer' }}
              >
                Hear Again
              </button>
              <button
                onClick={handleSlow}
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)', cursor: 'pointer' }}
              >
                Slow (−1 octave)
              </button>
            </div>
          </div>
        )}

        {drillState === 'feedback' && (
          <div className="space-y-4 pt-2">
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleNext}
                className="rounded-lg px-6 py-2 font-bold text-white"
                style={{ background: '#7c3aed', cursor: 'pointer' }}
              >
                Next →
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: 'transparent', color: '#475569', border: '1px solid #334155', cursor: 'pointer' }}
              >
                End Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
