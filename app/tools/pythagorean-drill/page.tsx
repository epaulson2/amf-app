'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

const SEQ = [
  { pos: 1, letter: 'F', sol: 'fa'  },
  { pos: 2, letter: 'C', sol: 'doh' },
  { pos: 3, letter: 'G', sol: 'sol' },
  { pos: 4, letter: 'D', sol: 're'  },
  { pos: 5, letter: 'A', sol: 'la'  },
  { pos: 6, letter: 'E', sol: 'mi'  },
  { pos: 7, letter: 'B', sol: 'ri'  },
]

type QType = 'next' | 'prev' | 'pos-to-letter' | 'letter-to-pos' | 'letter-to-sol' | 'sol-to-letter'

const Q_LABELS: Record<QType, string> = {
  'next':           'Next in sequence →',
  'prev':           '← Previous in sequence',
  'pos-to-letter':  'Position → Note',
  'letter-to-pos':  'Note → Position',
  'letter-to-sol':  'Note → Solfège',
  'sol-to-letter':  'Solfège → Note',
}

interface Question {
  type: QType
  prompt: string
  hint: string
  correct: string
  options: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function wrongOptions(correct: string, pool: string[], count = 3): string[] {
  const others = shuffle(pool.filter(x => x !== correct))
  return others.slice(0, count)
}

function makeQuestion(type: QType, idx: number): Question {
  const node = SEQ[idx]
  const letterPool = SEQ.map(n => n.letter)
  const solPool    = SEQ.map(n => n.sol)
  const posPool    = SEQ.map(n => String(n.pos))

  switch (type) {
    case 'next': {
      const next = SEQ[(idx + 1) % 7]
      const correct = next.letter
      const opts = shuffle([correct, ...wrongOptions(correct, letterPool)])
      return { type, prompt: node.letter, hint: 'What note comes next in the sequence?', correct, options: opts }
    }
    case 'prev': {
      const prev = SEQ[(idx + 6) % 7]
      const correct = prev.letter
      const opts = shuffle([correct, ...wrongOptions(correct, letterPool)])
      return { type, prompt: node.letter, hint: 'What note comes before this one?', correct, options: opts }
    }
    case 'pos-to-letter': {
      const correct = node.letter
      const opts = shuffle([correct, ...wrongOptions(correct, letterPool)])
      return { type, prompt: String(node.pos), hint: 'Which note sits at this position?', correct, options: opts }
    }
    case 'letter-to-pos': {
      const correct = String(node.pos)
      const opts = shuffle([correct, ...wrongOptions(correct, posPool)])
      return { type, prompt: node.letter, hint: 'What position number is this note?', correct, options: opts }
    }
    case 'letter-to-sol': {
      const correct = node.sol
      const opts = shuffle([correct, ...wrongOptions(correct, solPool)])
      return { type, prompt: node.letter, hint: 'What is the solfège syllable?', correct, options: opts }
    }
    case 'sol-to-letter': {
      const correct = node.letter
      const opts = shuffle([correct, ...wrongOptions(correct, letterPool)])
      return { type, prompt: node.sol, hint: 'Which letter note is this solfège?', correct, options: opts }
    }
  }
}

const ALL_TYPES: QType[] = ['next', 'prev', 'pos-to-letter', 'letter-to-pos', 'letter-to-sol', 'sol-to-letter']

function generateSession(count = 21): Question[] {
  const qs: Question[] = []
  // weights per question slot (higher = appears more)
  const weights = new Array(ALL_TYPES.length).fill(1)

  for (let i = 0; i < count; i++) {
    // weighted pick of type
    const totalW = weights.reduce((a, b) => a + b, 0)
    let r = Math.random() * totalW
    let typeIdx = 0
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j]
      if (r <= 0) { typeIdx = j; break }
    }
    const type = ALL_TYPES[typeIdx]
    const seqIdx = Math.floor(Math.random() * 7)
    qs.push(makeQuestion(type, seqIdx))
  }
  return qs
}

const TOTAL = 21

export default function PythagoreanDrillPage() {
  const [questions]  = useState<Question[]>(() => generateSession(TOTAL))
  const [current, setCurrent]     = useState(0)
  const [selected, setSelected]   = useState<string | null>(null)
  const [results, setResults]     = useState<boolean[]>([])
  const [times, setTimes]         = useState<number[]>([])
  const [streak, setStreak]       = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [phase, setPhase]         = useState<'drill' | 'done'>('drill')
  const questionStart = useRef(Date.now())

  useEffect(() => { questionStart.current = Date.now() }, [current])

  const advance = useCallback(() => {
    setSelected(null)
    if (current + 1 >= TOTAL) {
      setPhase('done')
    } else {
      setCurrent(c => c + 1)
    }
  }, [current])

  const handleAnswer = useCallback((opt: string) => {
    if (selected !== null) return
    const elapsed = Date.now() - questionStart.current
    const correct = opt === questions[current].correct
    setSelected(opt)
    setResults(r => [...r, correct])
    setTimes(t => [...t, elapsed])
    setStreak(s => {
      const next = correct ? s + 1 : 0
      setBestStreak(b => Math.max(b, next))
      return next
    })
    setTimeout(advance, correct ? 500 : 900)
  }, [selected, current, questions, advance])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== 'drill' || selected !== null) return
      const keys: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3 }
      if (e.key in keys) {
        const opt = questions[current]?.options[keys[e.key]]
        if (opt) handleAnswer(opt)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, selected, current, questions, handleAnswer])

  const correctCount = results.filter(Boolean).length
  const accuracy = results.length ? Math.round((correctCount / results.length) * 100) : 0
  const avgTime = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length / 100) / 10 : 0

  if (phase === 'done') {
    const grade = accuracy >= 90 ? '🔥 Excellent' : accuracy >= 70 ? '✓ Good' : '📖 Keep drilling'
    return (
      <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}
           className="flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md w-full rounded-2xl border border-slate-700 p-8 text-center"
             style={{ background: '#0f172a' }}>
          <div className="text-5xl mb-4">{accuracy >= 90 ? '🎯' : accuracy >= 70 ? '⚡' : '🎹'}</div>
          <h2 className="text-2xl font-extrabold text-white mb-1">Session Complete</h2>
          <p className="text-slate-400 text-sm mb-8">{grade}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 80 ? '#10b981' : '#f59e0b' },
              { label: 'Best Streak', value: String(bestStreak), color: '#8b5cf6' },
              { label: 'Avg Speed', value: `${avgTime}s`, color: '#06b6d4' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 border border-slate-700" style={{ background: '#1e293b' }}>
                <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-colors"
              style={{ background: '#7c3aed' }}>
              Drill Again
            </button>
            <Link href="/tools"
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors">
              All Tools
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">The Sequence</p>
            <div className="flex gap-2 flex-wrap">
              {SEQ.map(n => (
                <div key={n.letter} className="rounded-lg px-3 py-2 text-center border border-slate-700"
                     style={{ background: '#1e293b', minWidth: 44 }}>
                  <div className="text-base font-extrabold text-white">{n.letter}</div>
                  <div className="text-xs text-slate-500">{n.sol}</div>
                  <div className="text-xs text-slate-600">#{n.pos}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = current / TOTAL

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>

      {/* Header bar */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between"
           style={{ background: '#0f172a' }}>
        <div className="flex items-center gap-3">
          <Link href="/tools" className="text-slate-500 hover:text-white text-xs transition-colors">← Tools</Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs font-bold text-slate-400">Pythagorean Sequence Drill</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-amber-400 font-bold">⚡ {streak}</span>
          <span className="text-slate-400">{accuracy}% acc</span>
          <span className="text-slate-500">{current}/{TOTAL}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div className="h-full bg-violet-600 transition-all duration-300"
             style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Main drill area */}
      <div className="flex flex-col items-center justify-center px-4 py-12 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-sm">

          {/* Question type badge */}
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
              {Q_LABELS[q.type]}
            </span>
          </div>

          {/* Prompt */}
          <div className="text-center mb-3">
            <div className="text-6xl font-extrabold text-white tracking-tight mb-2
                            leading-none"
                 style={{ fontVariantNumeric: 'tabular-nums' }}>
              {q.prompt}
            </div>
            <p className="text-slate-500 text-sm">{q.hint}</p>
          </div>

          {/* Answer grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {q.options.map((opt, i) => {
              const isSelected = selected === opt
              const isCorrect  = opt === q.correct
              let bg = '#1e293b'
              let border = '#334155'
              let textColor = 'white'

              if (selected !== null) {
                if (isCorrect) { bg = 'rgba(16,185,129,0.18)'; border = '#10b981'; textColor = '#6ee7b7' }
                else if (isSelected && !isCorrect) { bg = 'rgba(239,68,68,0.18)'; border = '#ef4444'; textColor = '#fca5a5' }
                else { textColor = '#475569' }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={selected !== null}
                  className="rounded-xl py-5 font-extrabold text-xl transition-all duration-150
                             hover:scale-[1.02] active:scale-[0.98] disabled:cursor-default"
                  style={{ background: bg, border: `2px solid ${border}`, color: textColor }}>
                  <span className="text-xs text-slate-600 mr-1">{i + 1}</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-xs text-slate-700 mt-5">Press 1–4 to answer</p>
        </div>
      </div>

      {/* Sequence reference strip */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 px-4 py-2
                      overflow-x-auto"
           style={{ background: 'rgba(9,14,30,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="flex gap-2 justify-center min-w-max mx-auto">
          {SEQ.map((n, i) => {
            const isPast = results.length > 0 // just show all dimly
            return (
              <div key={n.letter}
                   className="text-center px-2 py-1 rounded-lg"
                   style={{ minWidth: 36, opacity: 0.45 }}>
                <div className="text-sm font-bold text-white">{n.letter}</div>
                <div className="text-xs text-slate-500">{n.sol}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
