'use client'

import { useEffect } from 'react'
import { DICHORDS, PULSATION_FAMILIES, type DiChord, type PulsationFamily, type FODirection } from '@/lib/audio'

// ── Print-safe colors (visible on white, no dark backgrounds) ─────────────────
const COLORS: Record<PulsationFamily, { harmonic: string; nonHarmonic: string; shadow: string; border: string }> = {
  dissonant: { harmonic: '#dc2626', nonHarmonic: '#7f1d1d', shadow: 'rgba(185,28,28,0.45)', border: '#fca5a5' },
  modal:     { harmonic: '#7c3aed', nonHarmonic: '#4c1d95', shadow: 'rgba(109,40,217,0.45)', border: '#c4b5fd' },
  perfect:   { harmonic: '#15803d', nonHarmonic: '#14532d', shadow: 'rgba(21,128,61,0.45)',  border: '#86efac' },
}
const NEUTRAL = { color: '#64748b', shadow: 'rgba(100,116,139,0.4)' }

function getColor(dc: DiChord): string {
  if (dc.bracket === 6) return NEUTRAL.color
  return dc.isHarmonic ? COLORS[dc.pulsationFamily].harmonic : COLORS[dc.pulsationFamily].nonHarmonic
}

function getShadow(foDir: FODirection, sc: string): string {
  if (foDir === 'down') return `drop-shadow(-8px 4px 6px ${sc})`
  if (foDir === 'up')   return `drop-shadow(8px 4px 6px ${sc})`
  return `drop-shadow(-7px 3px 5px ${sc}) drop-shadow(7px 3px 5px ${sc})`
}

// ── SVG bracket shapes (reused from PictographGlyph, print colors) ────────────
function Glyph({ dc, size = 80, sw = 2.6 }: { dc: DiChord; size?: number; sw?: number }) {
  const color = getColor(dc)
  const sc    = dc.bracket === 6 ? NEUTRAL.shadow : COLORS[dc.pulsationFamily].shadow
  const h     = Math.round(size * 0.7)
  const filter = getShadow(dc.foDirection, sc)
  const fontSize = dc.bracket >= 10 ? Math.round(size * 0.22) : Math.round(size * 0.28)
  const textY    = dc.bracket >= 10 ? Math.round(h * 0.66)    : Math.round(h * 0.69)

  const L = dc.pulsationFamily === 'dissonant'
    ? "33,8 24,4 18,12 14,8 10,18 18,26 10,34 18,42 10,50 14,62 18,66 24,58 33,62"
    : undefined
  const R = dc.pulsationFamily === 'dissonant'
    ? "67,8 76,4 82,12 86,8 90,18 82,26 90,34 82,42 90,50 86,62 82,66 76,58 67,62"
    : undefined

  return (
    <svg width={size} height={h} viewBox="0 0 100 70"
      style={{ display: 'block', filter, overflow: 'visible' }}>
      {dc.pulsationFamily === 'perfect' && (
        <>
          <path d="M 33,8 L 14,8 L 14,62 L 33,62" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
          <path d="M 67,8 L 86,8 L 86,62 L 67,62" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
        </>
      )}
      {dc.pulsationFamily === 'modal' && (
        <>
          <path d="M 33,8 Q 13,8 13,26 L 13,44 Q 13,62 33,62" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 67,8 Q 87,8 87,26 L 87,44 Q 87,62 67,62" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {dc.pulsationFamily === 'dissonant' && (
        <>
          <polyline points={L!} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="miter" strokeLinecap="square" />
          <polyline points={R!} fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="miter" strokeLinecap="square" />
        </>
      )}
      <text x="50" y={textY} textAnchor="middle" fill={color}
        fontSize={fontSize} fontWeight="800" fontFamily="'Courier New', Courier, monospace"
        style={{ userSelect: 'none' }}>
        {dc.bracket}
      </text>
    </svg>
  )
}

// ── Display order ─────────────────────────────────────────────────────────────
const GROUPS = [
  { key: 'dissonant' as PulsationFamily, label: 'Dissonant', hz: '8 Hz', brackets: [1, 2, 6, 11]     },
  { key: 'modal'     as PulsationFamily, label: 'Modal',     hz: '4 Hz', brackets: [3, 4, 8, 9, 10]  },
  { key: 'perfect'   as PulsationFamily, label: 'Perfect',   hz: '2 Hz', brackets: [5, 7]             },
]
const FO_LABEL: Record<string, string> = { down: '← Fund.', up: 'Oct. →', both: '← Both →' }
const SPRINT1 = new Set([3, 4])

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PictographsPrintPage() {
  useEffect(() => {
    document.title = 'AMF Di-Chord Pictograph Reference'
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Print button — hidden when printing */}
      <div className="no-print" style={{
        position: 'fixed', top: 16, right: 16, zIndex: 100,
        display: 'flex', gap: 8,
      }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: '8px 20px', background: '#1e293b', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer',
            fontWeight: 600, fontSize: '0.85rem',
          }}
        >
          ⎙ Print / Save PDF
        </button>
        <a href="/audio/pictographs" style={{
          padding: '8px 16px', background: '#f1f5f9', color: '#475569',
          border: '1px solid #e2e8f0', borderRadius: 6,
          fontWeight: 500, fontSize: '0.85rem', textDecoration: 'none',
          display: 'flex', alignItems: 'center',
        }}>← Back</a>
      </div>

      {/* Sheet */}
      <div style={{
        maxWidth: 900, margin: '0 auto', padding: '32px 40px',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>

        {/* Title */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #1e293b', paddingBottom: 12, marginBottom: 20 }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, color: '#0f172a' }}>
            Di-Chord Pictograph Reference
          </h1>
          <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: 4, marginBottom: 0, fontFamily: 'system-ui, sans-serif' }}>
            Bracket shape = pulsation &nbsp;·&nbsp; Shadow direction = F/O factor &nbsp;·&nbsp; Color shade = harmonicity &nbsp;·&nbsp; ★ = Sprint 1 focus
          </p>
        </div>

        {/* ── All 11 in order — BIG strip at top ─────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 12,
            fontFamily: 'system-ui, sans-serif',
          }}>
            All 11 Di-Chords · In Order · [1] → [11]
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 6, alignItems: 'end' }}>
            {DICHORDS.map(dc => (
              <div key={dc.bracket} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: '1 0 auto' }}>
                {SPRINT1.has(dc.bracket) && (
                  <span style={{ fontSize: '0.55rem', color: '#b45309', fontWeight: 700, fontFamily: 'system-ui, sans-serif' }}>★ S1</span>
                )}
                <Glyph dc={dc} size={72} sw={2.4} />
                <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.6rem', fontFamily: 'system-ui, sans-serif', color: '#334155', fontWeight: 600 }}>
                    {dc.name}
                  </div>
                  <div style={{ fontSize: '0.5rem', fontFamily: 'system-ui, sans-serif', color: '#94a3b8' }}>
                    {dc.semitones} st
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: 20 }} />

        {/* ── Family groups ──────────────────────────────────────────────── */}
        {GROUPS.map(group => {
          const fc = COLORS[group.key]
          return (
            <div key={group.key} style={{ marginBottom: 20 }}>
              {/* Family header — border only, no fill */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                borderLeft: `4px solid ${fc.border}`,
                paddingLeft: 10, marginBottom: 10,
              }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: fc.nonHarmonic,
                  fontFamily: 'system-ui, sans-serif',
                }}>
                  {group.label}
                </span>
                <span style={{ fontSize: '0.6rem', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
                  {group.hz} pulsation
                </span>
                <span style={{
                  marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.6rem', color: '#94a3b8',
                }}>
                  {group.brackets.map(b => `[${b}]`).join('  ')}
                </span>
              </div>

              {/* Tiles — white background, thin border */}
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(group.brackets.length, 5)}, 1fr)`, gap: 8 }}>
                {group.brackets.map(b => {
                  const dc = DICHORDS.find(d => d.bracket === b)!
                  const color = getColor(dc)
                  const isSprint1 = SPRINT1.has(b)
                  return (
                    <div key={b} style={{
                      border: `${isSprint1 ? 2 : 1}px solid ${isSprint1 ? '#b45309' : '#e2e8f0'}`,
                      borderRadius: 6,
                      padding: '12px 8px 10px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      position: 'relative',
                      background: '#fff',
                    }}>
                      {isSprint1 && (
                        <span style={{
                          position: 'absolute', top: 4, right: 7,
                          fontSize: '0.5rem', color: '#b45309', fontWeight: 700,
                          fontFamily: 'system-ui, sans-serif',
                        }}>★ S1</span>
                      )}

                      <Glyph dc={dc} size={80} sw={2.6} />

                      <p style={{
                        margin: '8px 0 0', color: '#0f172a', fontSize: '0.65rem',
                        fontWeight: 700, textAlign: 'center', lineHeight: 1.2,
                        fontFamily: 'system-ui, sans-serif',
                      }}>{dc.name}</p>

                      <p style={{ margin: '2px 0 6px', color: '#94a3b8', fontSize: '0.55rem', fontFamily: 'system-ui, sans-serif' }}>
                        {dc.semitones} semitone{dc.semitones !== 1 ? 's' : ''}
                      </p>

                      {/* Factor rows */}
                      {[
                        { label: 'Pulsation', val: `${dc.pulsationHz} Hz` },
                        { label: 'F/O',       val: FO_LABEL[dc.foDirection] },
                        { label: dc.isHarmonic || dc.bracket === 6 ? 'Harmonic' : 'Non-harmonic',
                          val: dc.bracket === 6 ? 'Neutral' : dc.isHarmonic ? 'Open · light' : 'Closed · dark' },
                      ].map(row => (
                        <div key={row.label} style={{
                          width: '100%', display: 'flex', justifyContent: 'space-between',
                          fontSize: '0.52rem', padding: '1px 4px',
                          fontFamily: 'system-ui, sans-serif',
                          borderTop: '1px dotted #f1f5f9',
                        }}>
                          <span style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{row.label}</span>
                          <span style={{ color, fontWeight: 600 }}>{row.val}</span>
                        </div>
                      ))}

                      <p style={{
                        margin: '6px 0 0', color: '#64748b', fontSize: '0.52rem',
                        fontStyle: 'italic', textAlign: 'center', lineHeight: 1.3,
                        fontFamily: 'system-ui, sans-serif',
                      }}>"{dc.feel}"</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* ── Legend ───────────────────────────────────────────────────── */}
        <div style={{
          border: '1px solid #e2e8f0', borderRadius: 6, padding: '10px 14px',
          marginTop: 8,
        }}>
          <p style={{
            fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 8, paddingBottom: 6,
            borderBottom: '1px solid #f1f5f9', fontFamily: 'system-ui, sans-serif',
          }}>
            Visual Factor Reference
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, fontSize: '0.55rem', fontFamily: 'system-ui, sans-serif' }}>
            {[
              {
                title: 'Factor 1 — Bracket Shape',
                items: [
                  { label: 'Jagged / serrated', sub: 'Dissonant · 8 Hz pulsation', color: '#7f1d1d' },
                  { label: 'Smooth / rounded',  sub: 'Modal · 4 Hz pulsation',     color: '#4c1d95' },
                  { label: 'Straight / square', sub: 'Perfect · 2 Hz pulsation',   color: '#14532d' },
                ],
              },
              {
                title: 'Factor 2 — Shadow Direction',
                items: [
                  { label: '← Shadow left',  sub: 'Fundamental-referring [1]–[5]', color: '#475569' },
                  { label: '→ Shadow right', sub: 'Octave-referring [7]–[11]',     color: '#475569' },
                  { label: '↔ Both sides',   sub: 'Equidistant — [6] Tritone',     color: '#475569' },
                ],
              },
              {
                title: 'Factor 3 — Color Shade',
                items: [
                  { label: 'Lighter shade',  sub: 'Harmonic · open · bright',       color: '#dc2626' },
                  { label: 'Darker shade',   sub: 'Non-harmonic · closed · dense',  color: '#7f1d1d' },
                  { label: 'Neutral gray',   sub: '[6] Tritone · equidistant',       color: '#64748b' },
                ],
              },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, color: '#475569', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {col.title}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {col.items.map(item => (
                    <li key={item.label} style={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                      <span style={{ color: item.color, fontWeight: 700, marginTop: 1 }}>■</span>
                      <div>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{item.label}</span>
                        <span style={{ color: '#94a3b8' }}> — {item.sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{
          marginTop: 12, textAlign: 'center', fontSize: '0.5rem', color: '#cbd5e1',
          fontFamily: 'system-ui, sans-serif',
        }}>
          AMF — Adaptive Musician's Framework · Plogger Pictograph System · amf.elderle.app
        </p>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          @page { margin: 12mm 14mm; size: letter portrait; }
        }
      `}</style>
    </div>
  )
}
