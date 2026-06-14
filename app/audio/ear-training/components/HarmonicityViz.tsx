'use client'

import type { DiChord, Timbre } from '@/lib/audio'

interface HarmonicityVizProps {
  dichord: DiChord
  timbre: Timbre
  onTimbreChange: (t: Timbre) => void
}

const TIMBRES: { value: Timbre; label: string }[] = [
  { value: 'sine',     label: 'Sine' },
  { value: 'triangle', label: 'Triangle' },
  { value: 'sawtooth', label: 'Sawtooth' },
  { value: 'complex',  label: 'Complex' },
]

const LEVEL_LABELS: Record<string, string> = {
  'very-low': 'Very Low',
  'low':      'Low',
  'med-low':  'Med-Low',
  'medium':   'Medium',
  'med-high': 'Med-High',
  'high':     'High',
}

export default function HarmonicityViz({ dichord, timbre, onTimbreChange }: HarmonicityVizProps) {
  const score = dichord.harmonicityScore
  const colorLabel = dichord.isHarmonic ? 'Harmonic (open/light)' : dichord.bracket === 6 ? 'Neutral' : 'Non-harmonic (closed/dark)'

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: '1px solid rgba(148,163,184,0.15)' }}>
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#94a3b8' }}>
        Harmonicity
      </p>
      <p className="text-sm font-bold mb-3" style={{ color: '#f1f5f9' }}>
        {LEVEL_LABELS[dichord.harmonicity]} — {colorLabel}
      </p>

      {/* Gradient bar */}
      <div style={{ position: 'relative', marginBottom: 8 }}>
        <div style={{
          height: 16,
          borderRadius: 8,
          background: 'linear-gradient(90deg, #1e1e2e 0%, #312e81 20%, #4f46e5 40%, #7c3aed 60%, #a78bfa 80%, #ddd6fe 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }} />
        {/* Marker */}
        <div style={{
          position: 'absolute',
          top: -4,
          left: `${score}%`,
          transform: 'translateX(-50%)',
          width: 4,
          height: 24,
          background: '#f1f5f9',
          borderRadius: 2,
          boxShadow: '0 0 6px rgba(241,245,249,0.5)',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Closed / Dark</span>
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Open / Light</span>
        </div>
      </div>

      {/* Timbre slider */}
      <div className="mt-4">
        <p className="text-xs mb-2" style={{ color: '#64748b' }}>
          Timbre — drag toward Sawtooth to hear harmonicity
        </p>
        <div className="flex gap-1">
          {TIMBRES.map(t => (
            <button
              key={t.value}
              onClick={() => onTimbreChange(t.value)}
              className="flex-1 rounded py-1 text-xs font-semibold transition-all"
              style={{
                background: timbre === t.value ? 'rgba(148,163,184,0.2)' : 'transparent',
                color: timbre === t.value ? '#f1f5f9' : '#475569',
                border: `1px solid ${timbre === t.value ? 'rgba(148,163,184,0.3)' : 'rgba(148,163,184,0.1)'}`,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
