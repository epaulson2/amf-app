'use client'

import { DICHORDS, PULSATION_FAMILIES } from '@/lib/audio'
import PictographGlyph, { getGlyphColor, GLYPH_COLORS, NEUTRAL_COLOR } from '../ear-training/components/PictographGlyph'

const DISPLAY_GROUPS = [
  { key: 'dissonant' as const, label: 'Dissonant', hz: '8 Hz', headerColor: '#b91c1c', brackets: [1, 2, 6, 11]    },
  { key: 'modal'     as const, label: 'Modal',     hz: '4 Hz', headerColor: '#6d28d9', brackets: [3, 4, 8, 9, 10] },
  { key: 'perfect'   as const, label: 'Perfect',   hz: '2 Hz', headerColor: '#15803d', brackets: [5, 7]            },
]

const FO_LABEL: Record<string, string> = { down: '← Fundamental', up: 'Octave →', both: '← Both →' }
const SPRINT1 = new Set([3, 4])

export default function PictographsPage() {
  return (
    <main style={{ background: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-6">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#7c3aed,#a78bfa)', borderRadius: 2, marginBottom: 20 }} />
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#7c3aed' }}>
            AMF Audio Lab · Reference
          </p>
          <h1 className="font-bold" style={{ color: '#f1f5f9', fontSize: '1.8rem', lineHeight: 1.2 }}>
            Di-Chord Pictograph System
          </h1>
          <p className="mt-2" style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: 560 }}>
            Each glyph encodes all three Plogger sound factors simultaneously.
            Bracket shape = pulsation · Shadow direction = F/O factor · Color = harmonicity.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: 'Bracket Shape — Pulsation',
              items: [
                { label: 'Jagged / serrated', sub: 'Dissonant · 8 Hz', color: '#b91c1c' },
                { label: 'Smooth / rounded', sub: 'Modal · 4 Hz',      color: '#6d28d9' },
                { label: 'Straight edges',   sub: 'Perfect · 2 Hz',    color: '#15803d' },
              ],
            },
            {
              title: 'Shadow Direction — F/O Factor',
              items: [
                { label: '← Shadow left',  sub: 'Fundamental-referring', color: '#94a3b8' },
                { label: '→ Shadow right', sub: 'Octave-referring',       color: '#94a3b8' },
                { label: '↔ Both sides',   sub: '[6] Tritone',            color: '#94a3b8' },
              ],
            },
            {
              title: 'Color — Harmonicity',
              items: [
                { label: 'Light shade',   sub: 'Harmonic · open · bright',      color: '#c4b5fd' },
                { label: 'Dark shade',    sub: 'Non-harmonic · closed · dense',  color: '#6d28d9' },
                { label: 'Neutral gray',  sub: '[6] Tritone · equidistant',      color: '#94a3b8' },
              ],
            },
          ].map(col => (
            <div key={col.title}
              className="rounded-xl p-4"
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#64748b' }}>
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span style={{ color: item.color, fontSize: '0.65rem', marginTop: 2, fontWeight: 700 }}>●</span>
                    <div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</div>
                      <div style={{ color: '#475569', fontSize: '0.65rem' }}>{item.sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* All 11 glyphs — grouped by family */}
        {DISPLAY_GROUPS.map(group => (
          <div key={group.key}>
            {/* Family header */}
            <div className="flex items-center gap-3 rounded-lg px-4 py-2 mb-6"
              style={{ background: group.headerColor }}>
              <span className="text-sm font-bold tracking-widest uppercase text-white">
                {group.label}
              </span>
              <span className="text-sm italic text-white/70">{group.hz} pulsation</span>
              <span className="ml-auto text-sm font-mono text-white/80">
                {group.brackets.map(b => `[${b}]`).join('  ')}
              </span>
            </div>

            {/* Glyph cards */}
            <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${group.brackets.length}, 1fr)` }}>
              {group.brackets.map(b => {
                const dc = DICHORDS.find(d => d.bracket === b)!
                const color = getGlyphColor(dc)
                const isFocus = SPRINT1.has(b)

                return (
                  <div key={b}
                    className="rounded-xl flex flex-col items-center"
                    style={{
                      background: '#1e293b',
                      border: `${isFocus ? 2.5 : 1}px solid ${isFocus ? '#F1C40F55' : `${color}33`}`,
                      padding: '28px 16px 20px',
                      position: 'relative',
                    }}
                  >
                    {isFocus && (
                      <span style={{
                        position: 'absolute', top: 8, right: 10,
                        fontSize: '0.75rem', color: '#F1C40F',
                      }}>★ Sprint 1</span>
                    )}

                    {/* Large pictograph glyph */}
                    <div style={{ marginBottom: 20 }}>
                      <PictographGlyph dc={dc} size={160} shadow />
                    </div>

                    {/* Name + semitones */}
                    <p className="font-bold text-center mb-1" style={{ color: '#f1f5f9', fontSize: '0.9rem' }}>
                      {dc.name}
                    </p>
                    <p style={{ color: '#475569', fontSize: '0.7rem', marginBottom: 14 }}>
                      {dc.semitones} semitone{dc.semitones !== 1 ? 's' : ''}
                    </p>

                    {/* Three factors */}
                    <div className="w-full space-y-2">
                      <FactorRow
                        label="Pulsation"
                        value={`${dc.pulsationHz} Hz · ${dc.pulsationFamily}`}
                        color={PULSATION_FAMILIES[dc.pulsationFamily].color}
                      />
                      <FactorRow
                        label="F/O"
                        value={FO_LABEL[dc.foDirection]}
                        color={color}
                      />
                      <FactorRow
                        label="Harmonicity"
                        value={dc.isHarmonic
                          ? `Harmonic · ${dc.harmonicity}`
                          : dc.bracket === 6 ? 'Neutral'
                          : `Non-harmonic · ${dc.harmonicity}`}
                        color={color}
                      />
                    </div>

                    {/* Feel */}
                    <p className="mt-3 text-center" style={{
                      color: '#475569', fontSize: '0.65rem', fontStyle: 'italic', lineHeight: 1.4,
                    }}>
                      "{dc.feel}"
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Quick-reference strip — all 11 small glyphs in order */}
        <div className="rounded-xl p-6" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#64748b' }}>
            All 11 Di-Chords · In Order
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            {DICHORDS.map(dc => (
              <div key={dc.bracket} className="flex flex-col items-center gap-2">
                <PictographGlyph dc={dc} size={72} shadow />
                <span style={{ color: '#475569', fontSize: '0.6rem', fontStyle: 'italic', textAlign: 'center' }}>
                  {dc.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}

function FactorRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded px-2 py-1"
      style={{ background: 'rgba(15,23,42,0.5)' }}>
      <span style={{ color: '#475569', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
        {label}
      </span>
      <span style={{ color, fontSize: '0.65rem', fontWeight: 600, textAlign: 'right' }}>
        {value}
      </span>
    </div>
  )
}
