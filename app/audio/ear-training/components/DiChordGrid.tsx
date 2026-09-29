'use client'

import { DICHORDS, type DiChord } from '@/lib/audio'
import PictographGlyph, { getGlyphColor } from './PictographGlyph'

// ── Display grouping (per R2 reference) ───────────────────────────────────────
const DISPLAY_GROUPS = [
  { label: 'Dissonant', hz: '8 Hz', headerColor: '#b91c1c', brackets: [1, 2, 6, 11]    },
  { label: 'Modal',     hz: '4 Hz', headerColor: '#6d28d9', brackets: [3, 4, 8, 9, 10] },
  { label: 'Perfect',   hz: '2 Hz', headerColor: '#15803d', brackets: [5, 7]            },
]

const SPRINT1 = new Set([3, 4])

interface DiChordGridProps {
  selected: number
  onSelect: (bracket: number) => void
  highlightOnly?: number[]
}

export default function DiChordGrid({ selected, onSelect, highlightOnly }: DiChordGridProps) {
  return (
    <div className="space-y-5">
      {DISPLAY_GROUPS.map(group => {
        const brackets = group.brackets.filter(b =>
          !highlightOnly || highlightOnly.includes(b)
        )
        if (brackets.length === 0) return null

        return (
          <div key={group.label}>
            <div className="flex items-center gap-2 rounded-t px-3 py-1.5 mb-3"
              style={{ background: group.headerColor }}>
              <span className="text-xs font-bold tracking-widest uppercase text-white">
                {group.label}
              </span>
              <span className="text-xs italic text-white/70">{group.hz} pulsation</span>
              <span className="ml-auto text-xs font-mono text-white/80">
                {brackets.map(b => `[${b}]`).join(' ')}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {brackets.map(b => {
                const dc = DICHORDS.find(d => d.bracket === b)!
                const isSelected = selected === b
                const isAvailable = !highlightOnly || highlightOnly.includes(b)
                const isFocus = SPRINT1.has(b)
                const color = getGlyphColor(dc)

                return (
                  <button
                    key={b}
                    onClick={() => isAvailable && onSelect(b)}
                    disabled={!isAvailable}
                    title={`[${b}] ${dc.name} — ${dc.feel}`}
                    style={{
                      position: 'relative',
                      background: isSelected ? `${color}12` : 'rgba(15,23,42,0.8)',
                      border: `${isFocus ? 2.5 : 1.5}px solid ${
                        isSelected ? color : isFocus ? '#F1C40F77' : `${color}44`
                      }`,
                      boxShadow: isSelected ? `0 0 18px ${color}2e` : 'none',
                      borderRadius: 10,
                      cursor: isAvailable ? 'pointer' : 'default',
                      opacity: isAvailable ? 1 : 0.25,
                      padding: '14px 6px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s',
                      minWidth: 112,
                    }}
                  >
                    {isFocus && (
                      <span style={{
                        position: 'absolute', top: 4, right: 7,
                        fontSize: '0.65rem', color: '#F1C40F',
                      }}>★</span>
                    )}

                    <PictographGlyph dc={dc} strokeWidth={isSelected ? 3.5 : 2.8} />

                    <span style={{
                      fontSize: '0.58rem',
                      fontStyle: 'italic',
                      color: isSelected ? color : `${color}99`,
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}>
                      {dc.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
