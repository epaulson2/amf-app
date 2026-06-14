'use client'

import type { DiChord } from '@/lib/audio'

interface HarmonicityVizProps {
  dichord: DiChord
  mixLevel: number  // 0–10 from harmonicity dimmer
}

const LEVEL_LABELS: Record<string, string> = {
  'very-low': 'Very Low',
  'low':      'Low',
  'med-low':  'Med-Low',
  'medium':   'Medium',
  'med-high': 'Med-High',
  'high':     'High',
}

const ORDER_LABELS = ['', 'Clean', 'Clean', 'Mild', 'Rich', 'Very Rich']

export default function HarmonicityViz({ dichord, mixLevel }: HarmonicityVizProps) {
  const score = dichord.harmonicityScore
  const colorLabel = dichord.isHarmonic
    ? 'Harmonic (open/light)'
    : dichord.bracket === 6 ? 'Neutral' : 'Non-harmonic (closed/dark)'

  const order = 1 + Math.round((mixLevel / 10) * 4)

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: '1px solid rgba(148,163,184,0.15)' }}>
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#94a3b8' }}>
        Harmonicity
      </p>
      <p className="text-sm font-bold mb-3" style={{ color: '#f1f5f9' }}>
        {LEVEL_LABELS[dichord.harmonicity]} — {colorLabel}
      </p>

      {/* Di-chord inherent harmonicity bar */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <div style={{
          height: 16, borderRadius: 8,
          background: 'linear-gradient(90deg, #1e1e2e 0%, #312e81 20%, #4f46e5 40%, #7c3aed 60%, #a78bfa 80%, #ddd6fe 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', top: -4,
          left: `${score}%`, transform: 'translateX(-50%)',
          width: 4, height: 24,
          background: '#f1f5f9', borderRadius: 2,
          boxShadow: '0 0 6px rgba(241,245,249,0.5)',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Closed / Dark</span>
          <span style={{ fontSize: '0.65rem', color: '#475569' }}>Open / Light</span>
        </div>
      </div>

      {/* Chebyshev richness indicator */}
      <div className="mt-3">
        <p className="text-xs mb-2" style={{ color: '#64748b' }}>
          Richness added — Chebyshev order {order}
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(o => (
            <div
              key={o}
              className="flex-1 rounded py-1 text-center"
              style={{
                background: o <= order ? 'rgba(124,58,237,0.25)' : 'rgba(124,58,237,0.06)',
                border: `1px solid ${o <= order ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.1)'}`,
                fontSize: '0.65rem',
                color: o <= order ? '#a78bfa' : '#334155',
                transition: 'all 0.15s',
              }}
            >
              {o}
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: '#475569', lineHeight: 1.4 }}>
          {order === 1
            ? 'Clean — instrument timbre unchanged'
            : `${ORDER_LABELS[order]} — adds harmonic ${order > 3 ? 'saturation' : 'color'} on top of instrument`}
        </p>
      </div>
    </div>
  )
}
