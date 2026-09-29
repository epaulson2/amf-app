'use client'

import type { BeatCoords } from './VexFlowScore'
import type { Arrangement, OverlayType } from '@/lib/arranger'

interface ScoreOverlayProps {
  coords: BeatCoords[]
  arrangement: Arrangement | null
  activeOverlays: Set<OverlayType>
  containerWidth: number
  containerHeight: number
}

const INTERVAL_NAMES: Record<number, string> = {
  0: '8', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: '#4', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7',
}

function orbitLabel(pitchClass: number, chordTones: number[]): string {
  const pc = ((pitchClass % 12) + 12) % 12
  if (pc === ((chordTones[0] ?? -1 + 12) % 12)) return 'R'
  if (pc === ((chordTones[1] ?? -1 + 12) % 12)) return '3'
  if (pc === ((chordTones[2] ?? -1 + 12) % 12)) return '5'
  return 'N'
}

export default function ScoreOverlay({ coords, arrangement, activeOverlays, containerWidth, containerHeight }: ScoreOverlayProps) {
  if (!arrangement || activeOverlays.size === 0 || coords.length === 0) return null

  const elements: React.ReactNode[] = []

  for (const coord of coords) {
    const measure = arrangement.measures[coord.measureIndex]
    if (!measure) continue
    const chord = measure.chord
    const beatStart = measure.startBeat + coord.beatInMeasure

    const notesAtBeat = arrangement.guitarNotes.filter(
      n => Math.abs(n.startBeat - beatStart) < 0.1
    )
    const melodyNote = notesAtBeat.find(n => n.voice === 'melody')
    const bassNote = notesAtBeat.find(n => n.voice === 'bass')

    const key = `${coord.measureIndex}-${coord.beatInMeasure}`

    // Orbits
    if (activeOverlays.has('orbits') && chord && melodyNote) {
      const label = orbitLabel(melodyNote.pitch, chord.tones)
      elements.push(
        <text key={`orbit-m-${key}`} x={coord.x} y={coord.y - 8}
          textAnchor="middle" fontSize={9} fill="#38bdf8" fontWeight="bold">
          {label}
        </text>
      )
    }
    if (activeOverlays.has('orbits') && chord && bassNote) {
      const label = orbitLabel(bassNote.pitch, chord.tones)
      elements.push(
        <text key={`orbit-b-${key}`} x={coord.x + 8} y={coord.y - 8}
          textAnchor="middle" fontSize={9} fill="#4ade80" fontWeight="bold">
          {label}
        </text>
      )
    }

    // Di-chords
    if (activeOverlays.has('dichords') && melodyNote && bassNote) {
      const semitones = ((melodyNote.pitch - bassNote.pitch) % 12 + 12) % 12
      const label = INTERVAL_NAMES[semitones] ?? '?'
      elements.push(
        <text key={`dichord-${key}`} x={coord.x} y={coord.y + 130}
          textAnchor="middle" fontSize={10} fill="#fbbf24" fontWeight="bold">
          {label}
        </text>
      )
    }

    // Species
    if (activeOverlays.has('species') && melodyNote && chord) {
      const isChordTone = chord.tones.includes(melodyNote.pitch % 12)
      const isStrong = coord.beatInMeasure % 2 === 0
      const label = isChordTone ? (isStrong ? '1:1' : 'CT') : 'PT'
      elements.push(
        <text key={`species-${key}`} x={coord.x} y={coord.y + 145}
          textAnchor="middle" fontSize={9} fill="#c084fc">
          {label}
        </text>
      )
    }
  }

  // Cadences — mark last beat of every 4th measure
  if (activeOverlays.has('cadences')) {
    const byMeasure = new Map<number, BeatCoords[]>()
    for (const c of coords) {
      if (!byMeasure.has(c.measureIndex)) byMeasure.set(c.measureIndex, [])
      byMeasure.get(c.measureIndex)!.push(c)
    }
    for (const [mIdx, mCoords] of byMeasure) {
      if ((mIdx + 1) % 4 === 0) {
        const last = mCoords[mCoords.length - 1]
        if (last) {
          elements.push(
            <g key={`cad-${mIdx}`}>
              <line x1={last.x - 10} y1={last.y - 18} x2={last.x + last.width} y2={last.y - 18}
                stroke="#4ade80" strokeWidth={1.5} />
              <line x1={last.x - 10} y1={last.y - 22} x2={last.x - 10} y2={last.y - 14}
                stroke="#4ade80" strokeWidth={1.5} />
              <line x1={last.x + last.width} y1={last.y - 22} x2={last.x + last.width} y2={last.y - 14}
                stroke="#4ade80" strokeWidth={1.5} />
              <text x={(last.x + last.x + last.width) / 2} y={last.y - 24}
                textAnchor="middle" fontSize={9} fill="#4ade80" fontWeight="bold">PAC</text>
            </g>
          )
        }
      }
    }
  }

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
      width={containerWidth}
      height={containerHeight}
    >
      {elements}
    </svg>
  )
}
