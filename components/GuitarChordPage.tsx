'use client'

/**
 * GuitarChordPage
 *
 * Full TPS guitar chord reference page.
 * Provides a 12-root selector and displays all TPS colors for the selected root.
 *
 * This is a client component because it holds state (the selected root).
 */

import React, { useState } from 'react'
import TpsGuitarColorGrid from './TpsGuitarColorGrid'
import { ALL_ROOTS, RootName } from '@/lib/tps-guitar-data'

// Enharmonic display labels for the root buttons
const ROOT_DISPLAY: Record<RootName, string> = {
  C: 'C',
  'C#': 'C# / D♭',
  D: 'D',
  Eb: 'E♭ / D#',
  E: 'E',
  F: 'F',
  'F#': 'F# / G♭',
  G: 'G',
  Ab: 'A♭ / G#',
  A: 'A',
  Bb: 'B♭ / A#',
  B: 'B',
}

// Guitar-friendly keys highlighted (natural roots most common on guitar)
const GUITAR_FRIENDLY: Set<RootName> = new Set(['E', 'A', 'D', 'G', 'C', 'B', 'F'])

export default function GuitarChordPage() {
  const [selectedRoot, setSelectedRoot] = useState<RootName>('E')

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-stone-900">TPS Guitar Chord Reference</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Movable triad shapes on the G-B-e string set. Each color is a TPS placement — the same
          physical shape produces the same harmonic quality at every fret. Select a root to see all
          colors.
        </p>
        <p className="text-xs text-stone-400 italic">
          Shape · Placement · Spacing · Purpose
        </p>
      </header>

      {/* Root selector */}
      <section aria-label="Select root note">
        <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3 text-center">
          Root Note
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {ALL_ROOTS.map((root) => {
            const isSelected = root === selectedRoot
            const isFriendly = GUITAR_FRIENDLY.has(root)
            return (
              <button
                key={root}
                onClick={() => setSelectedRoot(root)}
                aria-pressed={isSelected}
                className={[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  'border focus:outline-none focus:ring-2 focus:ring-amber-400',
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                    : isFriendly
                      ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                      : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100',
                ].join(' ')}
              >
                <span className="block leading-tight">{ROOT_DISPLAY[root]}</span>
              </button>
            )
          })}
        </div>
        <p className="text-center text-xs text-stone-400 mt-2">
          Highlighted roots are especially common in guitar-friendly keys.
        </p>
      </section>

      {/* Color grid */}
      <TpsGuitarColorGrid root={selectedRoot} />

      {/* Footer reference */}
      <footer className="border-t border-stone-200 pt-6 text-xs text-stone-400 space-y-1">
        <p>
          <strong className="text-stone-500">String set:</strong> G-B-e (top three strings). Low
          strings E, A, D are muted — the floor is supplied by a bassist, backing track, or your
          thumb.
        </p>
        <p>
          <strong className="text-stone-500">Movable advantage:</strong> Every shape here is
          movable. The same finger pattern produces the same color relationship at every fret — only
          the root changes.
        </p>
        <p>
          <strong className="text-stone-500">Three inversions:</strong> Each atom has root, first,
          and second inversions. The data here uses root position for atoms, and the most
          guitar-practical inversion for placement colors.
        </p>
      </footer>
    </div>
  )
}
