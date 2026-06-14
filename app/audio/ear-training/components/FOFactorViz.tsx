'use client'

import type { DiChord } from '@/lib/audio'

interface FOFactorVizProps {
  dichord: DiChord
}

export default function FOFactorViz({ dichord }: FOFactorVizProps) {
  const { foDirection, foLabel, bracket, name } = dichord

  const lowerActive = foDirection === 'down' || foDirection === 'both'
  const upperActive = foDirection === 'up' || foDirection === 'both'

  const accentColor = foDirection === 'down' ? '#f59e0b'
    : foDirection === 'up' ? '#38bdf8'
    : '#a78bfa'

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: `1px solid ${accentColor}33` }}>
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: accentColor }}>
        F/O Factor
      </p>
      <p className="text-sm font-bold mb-4" style={{ color: '#f1f5f9' }}>
        {foDirection === 'down' ? 'Refers Down ↓'
          : foDirection === 'up' ? 'Refers Up ↑'
          : 'Ambiguous ↕ (Both)'}
      </p>

      {/* Diagram */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
        {/* Lower note */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="rounded-full font-bold flex items-center justify-center mx-auto mb-1"
            style={{
              width: 48, height: 48,
              background: lowerActive ? `${accentColor}22` : '#1e293b',
              border: `2px solid ${lowerActive ? accentColor : '#334155'}`,
              color: lowerActive ? accentColor : '#475569',
              fontSize: '0.7rem',
            }}
          >
            Root
          </div>
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Lower</span>
        </div>

        {/* Arrow SVG */}
        <svg width="60" height="48" viewBox="0 0 60 48">
          {foDirection === 'both' ? (
            <>
              {/* Left arrow */}
              <line x1="40" y1="24" x2="10" y2="24" stroke={accentColor} strokeWidth="2" />
              <polygon points="6,24 14,20 14,28" fill={accentColor} />
              {/* Right arrow */}
              <line x1="20" y1="24" x2="50" y2="24" stroke={accentColor} strokeWidth="2" />
              <polygon points="54,24 46,20 46,28" fill={accentColor} />
            </>
          ) : foDirection === 'down' ? (
            <>
              <line x1="40" y1="24" x2="14" y2="24" stroke={accentColor} strokeWidth="2" />
              <polygon points="6,24 16,19 16,29" fill={accentColor} />
            </>
          ) : (
            <>
              <line x1="20" y1="24" x2="46" y2="24" stroke={accentColor} strokeWidth="2" />
              <polygon points="54,24 44,19 44,29" fill={accentColor} />
            </>
          )}
        </svg>

        {/* Upper note */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="rounded-full font-bold flex items-center justify-center mx-auto mb-1"
            style={{
              width: 48, height: 48,
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
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Upper</span>
        </div>
      </div>

      <p className="text-xs" style={{ color: '#64748b', lineHeight: 1.5 }}>
        {foLabel}
      </p>
    </div>
  )
}
