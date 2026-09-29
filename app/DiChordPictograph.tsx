'use client'

import { DICHORDS, getDiChord, PULSATION_FAMILIES } from '@/lib/audio'
import PictographGlyph, { getGlyphColor } from './audio/ear-training/components/PictographGlyph'

const DISPLAY_GROUPS = [
  { key: 'dissonant' as const, label: 'Dissonant', hz: '8 Hz', headerColor: '#b91c1c', brackets: [1, 2, 6, 11]    },
  { key: 'modal'     as const, label: 'Modal',     hz: '4 Hz', headerColor: '#6d28d9', brackets: [3, 4, 8, 9, 10] },
  { key: 'perfect'   as const, label: 'Perfect',   hz: '2 Hz', headerColor: '#15803d', brackets: [5, 7]            },
]

const FO_LABEL: Record<string, string> = {
  down: '← Fundamental',
  up: 'Octave →',
  both: '← Both →',
}

const SPRINT1 = new Set([3, 4])

function Tile({ bracket, compact }: { bracket: number; compact: boolean }) {
  const dc = getDiChord(bracket)
  const color = getGlyphColor(dc)
  const isSprint1 = SPRINT1.has(bracket)
  const glyphSize = compact ? 72 : 110

  return (
    <div
      style={{
        position: 'relative',
        background: '#0f172a',
        border: `${isSprint1 ? 2 : 1}px solid ${isSprint1 ? '#F1C40F55' : `${color}33`}`,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: compact ? '14px 8px 10px' : '20px 12px 14px',
        width: compact ? 100 : 140,
        flexShrink: 0,
      }}
    >
      {isSprint1 && (
        <span style={{
          position: 'absolute', top: 5, right: 8,
          fontSize: '0.6rem', color: '#F1C40F', fontWeight: 700,
        }}>★ S1</span>
      )}

      <PictographGlyph dc={dc} size={glyphSize} shadow />

      <p style={{
        color: '#f1f5f9',
        fontSize: compact ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 1.3,
      }}>
        {dc.name}
      </p>

      {!compact && (
        <>
          <p style={{ color: '#475569', fontSize: '0.6rem', marginTop: 3, textAlign: 'center' }}>
            {dc.semitones} st
          </p>
          <div style={{
            marginTop: 8,
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 6,
            padding: '4px 6px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ color: '#475569', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>F/O</span>
              <span style={{ color, fontSize: '0.58rem', fontWeight: 600 }}>{FO_LABEL[dc.foDirection]}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#475569', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Feel</span>
              <span style={{ color: '#94a3b8', fontSize: '0.58rem', fontStyle: 'italic', textAlign: 'right', maxWidth: 70 }}>{dc.feel}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function DiChordBadge({ n }: { n: number }) {
  let dc
  try { dc = getDiChord(n) } catch { /* not a valid di-chord */ }
  if (!dc) return <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">[{n}]</code>
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      margin: '0 2px',
      padding: '1px 4px 1px 2px',
      background: 'rgba(15,23,42,0.06)',
      borderRadius: 5,
    }}>
      <PictographGlyph dc={dc} size={28} shadow />
    </span>
  )
}

export default function DiChordPictograph({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        borderBottom: '2px solid #1e293b',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', letterSpacing: '0.02em' }}>
          Di-Chord Pictograph System — All 11 Di-Chords
        </h2>
        <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 4 }}>
          Bracket shape = pulsation &nbsp;·&nbsp; Shadow direction = F/O factor &nbsp;·&nbsp; Color shade = harmonicity
        </p>
      </div>

      {/* Families */}
      {DISPLAY_GROUPS.map(group => (
        <div key={group.key} style={{ marginBottom: '1.5rem' }}>
          {/* Family header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: group.headerColor,
            borderRadius: '6px 6px 0 0',
            padding: '6px 14px',
            marginBottom: 10,
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff' }}>
              {group.label}
            </span>
            <span style={{ fontSize: '0.68rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)' }}>
              {group.hz} pulsation
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)' }}>
              {group.brackets.map(b => `[${b}]`).join('  ')}
            </span>
          </div>

          {/* Tiles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 8 : 12 }}>
            {group.brackets.map(b => (
              <Tile key={b} bracket={b} compact={compact} />
            ))}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: '12px 16px',
        marginTop: 4,
        background: '#f8fafc',
      }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>
          Visual Factor Reference
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontSize: '0.65rem' }}>
          <div>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 6 }}>Factor 1 — Shape (Brackets)</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, color: '#334155' }}>
              <li><strong>Jagged/serrated</strong> — Dissonant · 8 Hz</li>
              <li><strong>Smooth/rounded</strong> — Modal · 4 Hz</li>
              <li><strong>Straight/right-angle</strong> — Perfect · 2 Hz</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 6 }}>Factor 2 — Shadow Direction</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, color: '#334155' }}>
              <li><strong>← Shadow left</strong> — Fundamental-referring</li>
              <li><strong>→ Shadow right</strong> — Octave-referring</li>
              <li><strong>↔ Both sides</strong> — Equidistant · [6] Tritone</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: 6 }}>Factor 3 — Color (Harmonicity)</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li style={{ color: '#334155' }}><strong style={{ color: '#fca5a5' }}>Light shade</strong> — Harmonic · open</li>
              <li style={{ color: '#334155' }}><strong style={{ color: '#b91c1c' }}>Dark shade</strong> — Non-harmonic · dense</li>
              <li style={{ color: '#334155' }}><strong style={{ color: '#94a3b8' }}>Neutral gray</strong> — Tritone [6]</li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: 10, paddingTop: 8, borderTop: '1px dashed #e2e8f0', fontSize: '0.6rem', color: '#64748b' }}>
          <strong style={{ color: '#F1C40F' }}>★ Sprint 1 Focus</strong> — Di-chords [3] and [4] are the primary learning targets for Sprint 1. Gold border identifies them throughout course materials.
        </p>
      </div>
    </div>
  )
}
