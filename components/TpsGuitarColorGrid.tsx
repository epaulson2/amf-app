'use client'

/**
 * TpsGuitarColorGrid
 *
 * Displays all TPS guitar colors as a grid of chord diagrams for a given root.
 * Organized by family: Major, Dominant, Minor, Atoms.
 */

import React from 'react'
import GuitarChordDiagram from './GuitarChordDiagram'
import { tpsGuitarColors, TpsColor } from '@/lib/tps-guitar-data'

interface Props {
  /** Root note to display all colors for, e.g. "A", "C" */
  root: string
}

const FAMILY_LABELS: Record<TpsColor['family'], string> = {
  major: 'Major Family',
  dominant: 'Dominant Family',
  minor: 'Minor Family',
  atom: 'Triad Atoms',
}

const FAMILY_ORDER: TpsColor['family'][] = ['major', 'dominant', 'minor', 'atom']

const FAMILY_ACCENT: Record<TpsColor['family'], string> = {
  major: 'border-amber-300 bg-amber-50',
  dominant: 'border-orange-300 bg-orange-50',
  minor: 'border-blue-300 bg-blue-50',
  atom: 'border-stone-300 bg-stone-50',
}

const FAMILY_HEADING: Record<TpsColor['family'], string> = {
  major: 'text-amber-800',
  dominant: 'text-orange-800',
  minor: 'text-blue-800',
  atom: 'text-stone-700',
}

export default function TpsGuitarColorGrid({ root }: Props) {
  const byFamily = Object.groupBy(tpsGuitarColors, (c) => c.family) as Record<
    TpsColor['family'],
    TpsColor[]
  >

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-stone-900">
          TPS Colors — Root: <span className="text-amber-700">{root}</span>
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          All movable shapes on the G-B-e string set. Unused strings are muted.
        </p>
      </div>

      {FAMILY_ORDER.map((family) => {
        const colors = byFamily[family] ?? []
        if (colors.length === 0) return null

        return (
          <section key={family} className={`rounded-xl border-2 p-5 ${FAMILY_ACCENT[family]}`}>
            <h3 className={`text-base font-semibold mb-4 ${FAMILY_HEADING[family]}`}>
              {FAMILY_LABELS[family]}
            </h3>
            <div className="flex flex-wrap gap-6">
              {colors.map((color) => (
                <div key={color.name} className="flex flex-col items-center">
                  <GuitarChordDiagram
                    colorName={color.name}
                    root={root}
                    showLabel={true}
                    size="md"
                  />
                  <div className="mt-1 text-[10px] text-stone-400 text-center max-w-[7rem]">
                    {color.symbolOverC.replace('C', root)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
