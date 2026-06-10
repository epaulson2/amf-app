'use client'

import { useEffect, useRef } from 'react'
import abcjs from 'abcjs'
import { getLeadSheet } from '@/lib/lead-sheets'

interface Props {
  slug: string
  showContext?: boolean
}

export function LeadSheet({ slug, showContext = false }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const sheet = getLeadSheet(slug)

  useEffect(() => {
    if (divRef.current && sheet) {
      abcjs.renderAbc(divRef.current, sheet.notation, {
        responsive: 'resize',
        scale: 1.2,
        staffwidth: 700,
        paddingright: 20,
        paddingleft: 0,
      })
    }
  }, [sheet])

  if (!sheet) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Lead sheet not found for slug: <code>{slug}</code>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-zinc-200 pb-4">
        <h2 className="text-2xl font-bold text-zinc-900">{sheet.title}</h2>
        <p className="text-zinc-500 mt-0.5">{sheet.artist}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
            <span className="font-medium">Key:</span> {sheet.key}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
            <span className="font-medium">Form:</span> {sheet.form}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
            <span className="font-medium">Tempo:</span> {sheet.tempo}
          </span>
        </div>
      </div>

      {/* ABC notation rendered by abcjs */}
      <div
        ref={divRef}
        className="rounded-lg bg-white p-4 ring-1 ring-zinc-200 overflow-x-auto"
      />

      {/* AMF context note */}
      {showContext && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-sm font-semibold text-amber-800 mb-1">AMF Training Focus</p>
          <p className="text-sm text-amber-700">{sheet.amfContext}</p>
        </div>
      )}
    </div>
  )
}
