'use client'

import type { DiChord, PulsationFamily, FODirection } from '@/lib/audio'

// ── EMM color scheme ──────────────────────────────────────────────────────────
export const GLYPH_COLORS: Record<PulsationFamily, { harmonic: string; nonHarmonic: string }> = {
  dissonant: { harmonic: '#fca5a5', nonHarmonic: '#b91c1c' },
  modal:     { harmonic: '#c4b5fd', nonHarmonic: '#6d28d9' },
  perfect:   { harmonic: '#86efac', nonHarmonic: '#15803d' },
}
export const NEUTRAL_COLOR = '#94a3b8'

const SHADOW_COLORS: Record<PulsationFamily, string> = {
  dissonant: 'rgba(220,38,38,0.85)',
  modal:     'rgba(124,58,237,0.85)',
  perfect:   'rgba(22,163,74,0.85)',
}
const NEUTRAL_SHADOW = 'rgba(148,163,184,0.75)'

export function getGlyphColor(dc: DiChord): string {
  if (dc.bracket === 6) return NEUTRAL_COLOR
  return dc.isHarmonic
    ? GLYPH_COLORS[dc.pulsationFamily].harmonic
    : GLYPH_COLORS[dc.pulsationFamily].nonHarmonic
}

function getDropShadow(foDir: FODirection, sc: string): string {
  if (foDir === 'down') return `drop-shadow(-10px 5px 9px ${sc})`
  if (foDir === 'up')   return `drop-shadow(10px 5px 9px ${sc})`
  return `drop-shadow(-9px 4px 8px ${sc}) drop-shadow(9px 4px 8px ${sc})`
}

// ── SVG bracket shapes ────────────────────────────────────────────────────────
// ViewBox 0 0 100 70 — inner edges x=33 (left), x=67 (right); top y=8, bottom y=62

function StraightBrackets({ color, sw }: { color: string; sw: number }) {
  return (
    <>
      <path d="M 33,8 L 14,8 L 14,62 L 33,62"
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M 67,8 L 86,8 L 86,62 L 67,62"
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="square" strokeLinejoin="miter" />
    </>
  )
}

function SmoothBrackets({ color, sw }: { color: string; sw: number }) {
  return (
    <>
      <path d="M 33,8 Q 13,8 13,26 L 13,44 Q 13,62 33,62"
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 67,8 Q 87,8 87,26 L 87,44 Q 87,62 67,62"
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

function JaggedBrackets({ color, sw }: { color: string; sw: number }) {
  const L = "33,8 24,4 18,12 14,8 10,18 18,26 10,34 18,42 10,50 14,62 18,66 24,58 33,62"
  const R = "67,8 76,4 82,12 86,8 90,18 82,26 90,34 82,42 90,50 86,62 82,66 76,58 67,62"
  return (
    <>
      <polyline points={L}
        fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="miter" strokeLinecap="square" />
      <polyline points={R}
        fill="none" stroke={color} strokeWidth={sw} strokeLinejoin="miter" strokeLinecap="square" />
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
interface Props {
  dc: DiChord
  /** Rendered SVG width in px (height scales proportionally at 70% of width) */
  size?: number
  /** Whether to show the directional drop-shadow */
  shadow?: boolean
  /** Override stroke width */
  strokeWidth?: number
}

export default function PictographGlyph({ dc, size = 100, shadow = true, strokeWidth }: Props) {
  const color   = getGlyphColor(dc)
  const sc      = dc.bracket === 6 ? NEUTRAL_SHADOW : SHADOW_COLORS[dc.pulsationFamily]
  const filter  = shadow ? getDropShadow(dc.foDirection, sc) : undefined
  const sw      = strokeWidth ?? (size >= 140 ? 3.2 : 2.8)
  const h       = Math.round(size * 0.7)
  const fontSize = dc.bracket >= 10 ? Math.round(size * 0.22) : Math.round(size * 0.28)
  const textY   = dc.bracket >= 10 ? Math.round(h * 0.66) : Math.round(h * 0.69)

  return (
    <svg width={size} height={h} viewBox="0 0 100 70"
      style={{ display: 'block', filter, overflow: 'visible' }}>
      {dc.pulsationFamily === 'dissonant' && <JaggedBrackets color={color} sw={sw} />}
      {dc.pulsationFamily === 'modal'     && <SmoothBrackets color={color} sw={sw} />}
      {dc.pulsationFamily === 'perfect'   && <StraightBrackets color={color} sw={sw} />}
      <text
        x="50" y={textY}
        textAnchor="middle"
        fill={color}
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="'Courier New', Courier, monospace"
        style={{ userSelect: 'none' }}
      >
        {dc.bracket}
      </text>
    </svg>
  )
}
