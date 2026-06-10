'use client'

/**
 * GuitarChordDiagram
 *
 * Renders a single TPS guitar chord diagram using @tombatossals/react-chords.
 * Looks up the chord shape from tpsGuitarColors by color name and root.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ChordSvg = require('@tombatossals/react-chords/lib/Chord').default as React.ComponentType<{
  chord: unknown
  instrument: unknown
  lite?: boolean
}>

import React from 'react'
import { tpsColorByName, GUITAR_INSTRUMENT } from '@/lib/tps-guitar-data'

interface Props {
  /** TPS color name, e.g. "Major Triad", "Dominant 9" */
  colorName: string
  /** Root note, e.g. "E", "A", "C#" */
  root: string
  /** Show color name label below the diagram */
  showLabel?: boolean
  /** Diagram size */
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'w-20',
  md: 'w-28',
  lg: 'w-40',
}

export default function GuitarChordDiagram({
  colorName,
  root,
  showLabel = true,
  size = 'md',
}: Props) {
  const color = tpsColorByName[colorName]

  if (!color) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-28 h-36 flex items-center justify-center bg-stone-100 rounded text-xs text-stone-400 text-center px-2">
          Unknown color: {colorName}
        </div>
        {showLabel && (
          <span className="text-xs text-stone-400 text-center">{colorName}</span>
        )}
      </div>
    )
  }

  const shape = color.roots[root]

  if (!shape) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-28 h-36 flex items-center justify-center bg-stone-100 rounded text-xs text-stone-400 text-center px-2">
          No shape for {root}
        </div>
        {showLabel && (
          <span className="text-xs text-stone-500 font-medium text-center">{root}</span>
        )}
        {showLabel && (
          <span className="text-xs text-stone-400 text-center leading-tight">{colorName}</span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={SIZE_CLASSES[size]}>
        <ChordSvg chord={shape} instrument={GUITAR_INSTRUMENT} lite={false} />
      </div>
      {showLabel && (
        <div className="text-center">
          <div className="text-sm font-semibold text-stone-800">{root}</div>
          <div className="text-xs text-stone-500 leading-tight max-w-[7rem]">{colorName}</div>
        </div>
      )}
    </div>
  )
}
