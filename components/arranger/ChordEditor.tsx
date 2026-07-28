'use client'

import { useState, useCallback } from 'react'
import type { ChordEvent } from '@/lib/arranger'
import { makeChordEvent } from '@/lib/arranger'

interface MeasureChord {
  measure: number
  symbol: string
}

interface ChordEditorProps {
  measureCount: number
  beatsPerMeasure?: number
  initial?: MeasureChord[]
  onChange: (chords: ChordEvent[]) => void
}

const COMMON_CHORDS = ['D', 'G', 'A', 'Em', 'Bm', 'F#m', 'Am', 'C', 'E', 'A7', 'D7', 'G7', 'Dsus2', 'Dsus4']

export default function ChordEditor({ measureCount, beatsPerMeasure = 4, initial = [], onChange }: ChordEditorProps) {
  const [measures, setMeasures] = useState<MeasureChord[]>(() => {
    const init: MeasureChord[] = []
    for (let i = 0; i < measureCount; i++) {
      init.push({ measure: i, symbol: initial[i]?.symbol ?? '' })
    }
    return init
  })
  const [active, setActive] = useState<number | null>(null)

  const update = useCallback((measureIdx: number, symbol: string) => {
    const next = measures.map((m, i) => i === measureIdx ? { ...m, symbol } : m)
    setMeasures(next)

    // Build ChordEvent list, filling blank measures with previous chord
    const events: ChordEvent[] = []
    let lastSymbol = 'D'
    for (let i = 0; i < next.length; i++) {
      const sym = next[i].symbol.trim() || lastSymbol
      lastSymbol = sym
      events.push(makeChordEvent(sym, i * beatsPerMeasure, beatsPerMeasure))
    }
    onChange(events)
  }, [measures, beatsPerMeasure, onChange])

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 8 }}>
        {measures.map((m, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>Bar {i + 1}</div>
            <input
              value={m.symbol}
              onChange={e => update(i, e.target.value)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              placeholder="D"
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '6px 8px', borderRadius: 6, border: '1px solid',
                borderColor: active === i ? '#7c3aed' : '#334155',
                background: '#1e293b', color: '#f1f5f9',
                fontSize: 14, fontWeight: 600, textAlign: 'center',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {active !== null && (
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {COMMON_CHORDS.map(c => (
            <button
              key={c}
              onClick={() => update(active, c)}
              style={{
                padding: '3px 10px', borderRadius: 4, border: '1px solid #334155',
                background: measures[active]?.symbol === c ? '#7c3aed' : '#0f172a',
                color: '#e2e8f0', fontSize: 12, cursor: 'pointer',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
