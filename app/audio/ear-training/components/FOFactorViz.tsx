'use client'

import type { DiChord } from '@/lib/audio'

interface FOFactorVizProps {
  dichord: DiChord
  mixLevel: number   // 0–10
}

export default function FOFactorViz({ dichord, mixLevel }: FOFactorVizProps) {
  const { foDirection, foLabel, bracket } = dichord

  const lowerActive = foDirection === 'down' || foDirection === 'both'
  const upperActive = foDirection === 'up'  || foDirection === 'both'
  const accentColor = foDirection === 'down' ? '#f59e0b'
    : foDirection === 'up' ? '#38bdf8'
    : '#a78bfa'

  // Shadow note label
  const shadowDesc = foDirection === 'down'
    ? `Adds note at −1 oct below root`
    : foDirection === 'up'
    ? `Adds note at +1 oct above upper`
    : `Adds octave below root + above upper`

  // Arrow opacity reflects mix level
  const arrowOpacity = 0.2 + (mixLevel / 10) * 0.8

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: `1px solid ${accentColor}33` }}>
      <p className="text-sm font-bold mb-4" style={{ color: '#f1f5f9' }}>
        {foDirection === 'down' ? 'Refers Down ↓'
          : foDirection === 'up' ? 'Refers Up ↑'
          : 'Ambiguous ↕ (Both)'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
        {/* Lower note */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="rounded-full font-bold flex items-center justify-center mx-auto mb-1"
            style={{
              width: 44, height: 44,
              background: lowerActive ? `${accentColor}22` : '#1e293b',
              border: `2px solid ${lowerActive ? accentColor : '#334155'}`,
              color: lowerActive ? accentColor : '#475569',
              fontSize: '0.65rem',
            }}
          >
            Root
          </div>
          <span style={{ fontSize: '0.6rem', color: '#475569' }}>Lower</span>
        </div>

        {/* Arrow */}
        <svg width="60" height="44" viewBox="0 0 60 44" style={{ opacity: arrowOpacity, transition: 'opacity 0.3s' }}>
          {foDirection === 'both' ? (
            <>
              <line x1="40" y1="22" x2="12" y2="22" stroke={accentColor} strokeWidth="2" />
              <polygon points="5,22 13,18 13,26" fill={accentColor} />
              <line x1="20" y1="22" x2="48" y2="22" stroke={accentColor} strokeWidth="2" />
              <polygon points="55,22 47,18 47,26" fill={accentColor} />
            </>
          ) : foDirection === 'down' ? (
            <>
              <line x1="40" y1="22" x2="14" y2="22" stroke={accentColor} strokeWidth="2" />
              <polygon points="6,22 15,18 15,26" fill={accentColor} />
            </>
          ) : (
            <>
              <line x1="20" y1="22" x2="46" y2="22" stroke={accentColor} strokeWidth="2" />
              <polygon points="54,22 45,18 45,26" fill={accentColor} />
            </>
          )}
        </svg>

        {/* Upper note */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="rounded-full font-bold flex items-center justify-center mx-auto mb-1"
            style={{
              width: 44, height: 44,
              background: upperActive ? `${accentColor}22` : '#1e293b',
              border: `2px solid ${upperActive ? accentColor : '#334155'}`,
              color: upperActive ? accentColor : '#475569',
              fontSize: '0.65rem',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            +{bracket}st
          </div>
          <span style={{ fontSize: '0.6rem', color: '#475569' }}>Upper</span>
        </div>
      </div>

      <p className="text-xs mb-1" style={{ color: '#475569', lineHeight: 1.5 }}>{foLabel}</p>
      <p className="text-xs" style={{ color: '#334155', lineHeight: 1.4 }}>
        {mixLevel <= 2 ? 'Shadow note off — both notes balanced'
          : mixLevel >= 8 ? `Shadow note prominent — ${shadowDesc}`
          : shadowDesc}
      </p>
    </div>
  )
}
