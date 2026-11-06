import type { ReactNode } from 'react'
import { hasBlackAfter, whiteName } from './geometry'

/**
 * A drawn piano keyboard for teaching: accurate black-key groups (two, then three; none between E–F or B–C),
 * white keys wider than black. It is a picture, not an instrument: it never makes sound and has no key handlers.
 */
export type Tone = 'spot' | 'home' | 'away' | 'soft' | 'ring'
export type KeyState = { label?: string; tone?: Tone; badge?: string }
export type Geo = { x: (i: number) => number; cx: (i: number) => number; kw: number; top: number; bottom: number; n: number }


const FILL: Record<Tone, string> = { spot: '#fde68a', home: '#fcd9a3', away: '#e3ecee', soft: '#fff3cf', ring: '#fffdf8' }
const STROKE: Record<Tone, string> = { spot: '#b45309', home: '#b45309', away: '#5f7f84', soft: '#d6a756', ring: '#b45309' }

export default function KeyboardArt({ start = 'C', whites, states = {}, showNames = false, title, desc, overlay, kw = 40, h = 150, fontSize = 17, topPad = 6, bottomPad = 38 }: {
  start?: string; whites: number; states?: Record<number, KeyState>; showNames?: boolean; title: string; desc: string
  overlay?: (g: Geo) => ReactNode; kw?: number; h?: number; fontSize?: number; topPad?: number; bottomPad?: number
}) {
  const W = whites * kw + 4
  const top = topPad, bottom = top + h
  const g: Geo = { x: i => 2 + i * kw, cx: i => 2 + i * kw + kw / 2, kw, top, bottom, n: whites }
  const bw = kw * 0.58, bh = h * 0.62
  return (
    <svg viewBox={`0 0 ${W} ${bottom + bottomPad}`} className="sp-diagram" role="img" aria-label={title} style={{ maxWidth: Math.max(360, W) }}>
      <title>{title}</title>
      <desc>{desc}</desc>
      {Array.from({ length: whites }, (_, i) => {
        const st = states[i]
        const nm = whiteName(start, i)
        const label = st?.label ?? (showNames ? nm : undefined)
        return (
          <g key={i} data-white={nm} data-index={i}>
            <rect x={g.x(i)} y={top} width={kw} height={h} rx={4} fill={st?.tone ? FILL[st.tone] : '#fffdf8'} stroke={st?.tone ? STROKE[st.tone] : '#94a3b8'} strokeWidth={st?.tone ? 2.5 : 1.2} />
          </g>
        )
      })}
      {Array.from({ length: whites - 1 }, (_, i) => hasBlackAfter(whiteName(start, i)) ? (
        <rect key={`b${i}`} data-black={`after-${whiteName(start, i)}`} x={g.x(i + 1) - bw / 2} y={top} width={bw} height={bh} rx={3} fill="#1e293b" stroke="#0f172a" strokeWidth={1} />
      ) : null)}
      {Array.from({ length: whites }, (_, i) => {
        const st = states[i]
        const nm = whiteName(start, i)
        const label = st?.label ?? (showNames ? nm : undefined)
        return (
          <g key={`l${i}`}>
            {label && (
              <g>
                <rect x={g.cx(i) - Math.max(13, label.length * 5.5)} y={bottom - 34} width={Math.max(26, label.length * 11)} height={26} rx={13} fill="#ffffff" stroke={st?.tone ? STROKE[st.tone] : '#94a3b8'} strokeWidth={1.5} />
                <text x={g.cx(i)} y={bottom - 15} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill="#1e293b">{label}</text>
              </g>
            )}
            {st?.badge && <text x={g.cx(i)} y={bottom + 24} textAnchor="middle" fontSize={14} fontWeight={600} fill="#475569">{st.badge}</text>}
          </g>
        )
      })}
      {overlay?.(g)}
    </svg>
  )
}
