'use client'

import type { DiChord, Timbre } from '@/lib/audio'
import PulsationViz from './PulsationViz'
import HarmonicityViz from './HarmonicityViz'
import FOFactorViz from './FOFactorViz'

interface FactorPanelsProps {
  dichord: DiChord
  timbre: Timbre
  onTimbreChange: (t: Timbre) => void
}

export default function FactorPanels({ dichord, timbre, onTimbreChange }: FactorPanelsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <PulsationViz dichord={dichord} />
      <HarmonicityViz dichord={dichord} timbre={timbre} onTimbreChange={onTimbreChange} />
      <FOFactorViz dichord={dichord} />
    </div>
  )
}
