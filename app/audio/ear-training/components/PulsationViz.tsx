'use client'

import type { DiChord } from '@/lib/audio'

interface PulsationVizProps {
  dichord: DiChord
  mixLevel: number   // 0–10
}

function sinePath(width: number, amplitude: number, cycles: number): string {
  const pts: string[] = []
  for (let x = 0; x <= width; x += 4) {
    const y = amplitude + amplitude * Math.sin((x / width) * cycles * Math.PI * 2)
    pts.push(x === 0 ? `M ${x},${y}` : `L ${x},${y}`)
  }
  return pts.join(' ')
}

const SPEED_LABELS: Record<number, string> = {
  8: 'Fast — Dissonant',
  4: 'Medium — Modal',
  2: 'Slow — Perfect',
}

export default function PulsationViz({ dichord, mixLevel }: PulsationVizProps) {
  const duration = dichord.pulsationHz === 8 ? 0.8 : dichord.pulsationHz === 4 ? 1.6 : 3.2
  const familyColors: Record<string, string> = {
    dissonant: '#dc2626',
    modal: '#7c3aed',
    perfect: '#16a34a',
  }
  const color = familyColors[dichord.pulsationFamily]
  // Opacity reflects mix level — dimmed when pulsation is suppressed
  const waveOpacity = 0.25 + (mixLevel / 10) * 0.75

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: `1px solid ${color}33` }}>
      <p className="text-sm font-bold mb-3" style={{ color: '#f1f5f9' }}>
        {dichord.pulsationHz} Hz — {SPEED_LABELS[dichord.pulsationHz]}
      </p>

      <div style={{ overflow: 'hidden', borderRadius: 6, height: 64, background: `${color}11`, position: 'relative' }}>
        <svg
          width="800"
          height="64"
          viewBox="0 0 800 64"
          style={{
            position: 'absolute',
            left: 0,
            top: 2,
            opacity: waveOpacity,
            animation: `wave-scroll ${duration}s linear infinite`,
            transition: 'opacity 0.3s',
          }}
        >
          <path
            d={sinePath(800, 26, 6)}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, #0f172a 0%, transparent 15%, transparent 85%, #0f172a 100%)`
        }} />
      </div>

      <p className="text-xs mt-2" style={{ color: '#475569' }}>
        {mixLevel <= 3
          ? 'Masked — beating washes out in reverb'
          : mixLevel >= 8
          ? 'Exposed — beating accumulates clearly'
          : dichord.feel}
      </p>
    </div>
  )
}
