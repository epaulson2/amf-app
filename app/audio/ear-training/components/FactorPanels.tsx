'use client'

import type { DiChord, SoundFactorMix } from '@/lib/audio'
import PulsationViz from './PulsationViz'
import HarmonicityViz from './HarmonicityViz'
import FOFactorViz from './FOFactorViz'

interface FactorPanelsProps {
  dichord: DiChord
  mix: SoundFactorMix
}

function MixBadge({ value, color }: { value: number; color: string }) {
  const opacity = 0.3 + (value / 10) * 0.7
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full tabular-nums"
      style={{ background: `${color}22`, color, opacity }}
    >
      {value}/10
    </span>
  )
}

export default function FactorPanels({ dichord, mix }: FactorPanelsProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#334155' }}>
        Factor Visualizations
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold" style={{ color: '#dc2626' }}>Pulsation</span>
            <MixBadge value={mix.pulsation} color="#dc2626" />
          </div>
          <PulsationViz dichord={dichord} mixLevel={mix.pulsation} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold" style={{ color: '#7c3aed' }}>Harmonicity</span>
            <MixBadge value={mix.harmonicity} color="#7c3aed" />
          </div>
          <HarmonicityViz dichord={dichord} mixLevel={mix.harmonicity} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold" style={{ color: '#0891b2' }}>F/O Factor</span>
            <MixBadge value={mix.foFactor} color="#0891b2" />
          </div>
          <FOFactorViz dichord={dichord} mixLevel={mix.foFactor} />
        </div>
      </div>
    </div>
  )
}
