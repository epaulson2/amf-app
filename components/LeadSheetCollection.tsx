'use client'

import { useState } from 'react'
import { LeadSheet } from './LeadSheet'
import { leadSheets } from '@/lib/lead-sheets'

export function LeadSheetCollection() {
  const [activeSlug, setActiveSlug] = useState(leadSheets[0].slug)

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl bg-zinc-100 p-1" role="tablist">
        {leadSheets.map((sheet) => (
          <button
            key={sheet.slug}
            role="tab"
            aria-selected={activeSlug === sheet.slug}
            onClick={() => setActiveSlug(sheet.slug)}
            className={[
              'flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeSlug === sheet.slug
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700',
            ].join(' ')}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      {/* Active lead sheet */}
      <div role="tabpanel">
        <LeadSheet key={activeSlug} slug={activeSlug} showContext />
      </div>
    </div>
  )
}
