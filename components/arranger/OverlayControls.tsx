'use client'

import type { OverlayType } from '@/lib/arranger'

interface OverlayControlsProps {
  active: Set<OverlayType>
  onToggle: (type: OverlayType) => void
  hasArrangement: boolean
}

const OVERLAYS: { type: OverlayType; label: string; color: string; title: string }[] = [
  { type: 'orbits',   label: 'Orbits',    color: '#0891b2', title: 'Show Root/Third/Fifth labels per voice' },
  { type: 'dichords', label: 'Di-chords', color: '#d97706', title: 'Show interval numbers between melody and bass' },
  { type: 'cadences', label: 'Cadences',  color: '#16a34a', title: 'Mark phrase cadences (PAC/HC)' },
  { type: 'species',  label: 'Species',   color: '#7c3aed', title: 'Show counterpoint species labels (1:1, PT, SUS)' },
]

export default function OverlayControls({ active, onToggle, hasArrangement }: OverlayControlsProps) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap' }}>Overlays:</span>
      {OVERLAYS.map(({ type, label, color, title }) => {
        const isActive = active.has(type)
        const disabled = !hasArrangement
        return (
          <button
            key={type}
            title={title}
            disabled={disabled}
            onClick={() => onToggle(type)}
            style={{
              padding: '3px 10px',
              borderRadius: 12,
              border: `1px solid ${disabled ? '#374151' : isActive ? color : '#374151'}`,
              background: isActive && !disabled ? color + '22' : 'transparent',
              color: disabled ? '#4b5563' : isActive ? color : '#9ca3af',
              fontSize: 11,
              fontWeight: isActive ? 600 : 400,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
