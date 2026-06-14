'use client'

import { DICHORDS, PULSATION_FAMILIES, type DiChord } from '@/lib/audio'

interface DiChordGridProps {
  selected: number
  onSelect: (bracket: number) => void
  highlightOnly?: number[]  // if set, only show these brackets (drill mode)
}

export default function DiChordGrid({ selected, onSelect, highlightOnly }: DiChordGridProps) {
  const families = Object.entries(PULSATION_FAMILIES) as [
    keyof typeof PULSATION_FAMILIES,
    typeof PULSATION_FAMILIES[keyof typeof PULSATION_FAMILIES]
  ][]

  return (
    <div className="space-y-3">
      {families.map(([key, family]) => {
        const brackets = family.brackets.filter(b =>
          !highlightOnly || highlightOnly.includes(b)
        )
        if (brackets.length === 0) return null

        return (
          <div key={key}>
            <p className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: family.color }}>
              {family.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {brackets.map(b => {
                const dc: DiChord = DICHORDS.find(d => d.bracket === b)!
                const isSelected = selected === b
                const isAvailable = !highlightOnly || highlightOnly.includes(b)
                return (
                  <button
                    key={b}
                    onClick={() => isAvailable && onSelect(b)}
                    disabled={!isAvailable}
                    title={dc.name}
                    className="rounded-lg font-bold transition-all"
                    style={{
                      width: 56,
                      height: 56,
                      background: isSelected ? family.color : family.bgColor,
                      color: isSelected ? '#fff' : family.color,
                      border: `2px solid ${isSelected ? family.color : `${family.color}55`}`,
                      cursor: isAvailable ? 'pointer' : 'default',
                      opacity: isAvailable ? 1 : 0.3,
                      fontSize: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: 800 }}>[{b}]</span>
                    <span style={{ fontSize: '0.6rem', opacity: 0.85, textAlign: 'center', lineHeight: 1.2 }}>
                      {dc.name.split(' ').slice(-1)[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
