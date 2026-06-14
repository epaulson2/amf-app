'use client'

import type { DiChord } from '@/lib/audio'

interface PulsationVizProps {
  dichord: DiChord
}

// Pre-computed SVG path for a sine wave spanning 800 units wide, 60 units tall
function sinePath(width: number, amplitude: number, cycles: number): string {
  const points: string[] = []
  for (let x = 0; x <= width; x += 4) {
    const y = amplitude + amplitude * Math.sin((x / width) * cycles * Math.PI * 2)
    points.push(x === 0 ? `M ${x},${y}` : `L ${x},${y}`)
  }
  return points.join(' ')
}

const WAVE_PATH = sinePath(400, 30, 3)
// Double the path side-by-side for seamless loop
const DOUBLE_PATH = WAVE_PATH + ' ' + sinePath(400, 30, 3).replace(/M/, 'L').replace(/(\d+),/g, (_, n) => `${Number(n) + 400},`)

const SPEED_LABELS: Record<number, string> = {
  8: 'Fast — Dissonant',
  4: 'Medium — Modal',
  2: 'Slow — Perfect',
}

export default function PulsationViz({ dichord }: PulsationVizProps) {
  const duration = dichord.pulsationHz === 8 ? 0.8 : dichord.pulsationHz === 4 ? 1.6 : 3.2

  const familyColors: Record<string, string> = {
    dissonant: '#dc2626',
    modal: '#7c3aed',
    perfect: '#16a34a',
  }
  const color = familyColors[dichord.pulsationFamily]

  return (
    <div className="rounded-xl p-4" style={{ background: '#0f172a', border: `1px solid ${color}33` }}>
      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>
        Pulsation
      </p>
      <p className="text-sm font-bold mb-3" style={{ color: '#f1f5f9' }}>
        {dichord.pulsationHz} Hz — {SPEED_LABELS[dichord.pulsationHz]}
      </p>

      {/* Animated wave */}
      <div style={{ overflow: 'hidden', borderRadius: 6, height: 64, background: `${color}11`, position: 'relative' }}>
        <svg
          width="800"
          height="64"
          viewBox="0 0 800 64"
          style={{
            position: 'absolute',
            left: 0,
            top: 2,
            animation: `wave-scroll ${duration}s linear infinite`,
          }}
        >
          <path
            d={`M 0,32 ${sinePath(800, 26, 6).replace('M 0,30', '').replace(/M \d+,\d+ /, '')}`}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, #0f172a 0%, transparent 15%, transparent 85%, #0f172a 100%)`
        }} />
      </div>

      <p className="text-xs mt-2" style={{ color: '#64748b' }}>
        {dichord.feel}
      </p>
    </div>
  )
}
