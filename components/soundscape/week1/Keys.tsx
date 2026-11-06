'use client'
import { useRef, useState } from 'react'
import { isBlackKey, midiToName } from '@/lib/soundscape/midi'

export type Mark = 'on' | 'passed'

/**
 * Chromatic keyboard from MIDI lo..hi (C4 = 60). Every key is a real, keyboard-operable button
 * (one tab stop, arrow keys move between keys, Enter or Space plays). Geometry derives from MIDI only.
 */
export default function Keys({
  lo, hi, title, showNames, labels = {}, marks = {}, onKey, selected = [],
}: {
  lo: number; hi: number; title: string; showNames: boolean
  labels?: Record<number, string>; marks?: Record<number, Mark>; onKey?: (midi: number) => void; selected?: number[]
}) {
  const all = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)
  const whites = all.filter(m => !isBlackKey(m))
  const kw = 40, wh = 118, bh = 72
  const W = whites.length * kw
  const xw = (m: number) => whites.indexOf(m) * kw
  const [focus, setFocus] = useState(lo)
  const refs = useRef<Record<number, SVGGElement | null>>({})
  const go = (m: number) => { if (m >= lo && m <= hi) { setFocus(m); refs.current[m]?.focus() } }

  const key = (m: number) => {
    const black = isBlackKey(m)
    const x = black ? xw(m - 1) + kw - 12 : xw(m)
    const w = black ? 24 : kw, h = black ? bh : wh
    const mk = marks[m]
    const sel = selected.includes(m)
    const fill = sel ? '#fde68a' : mk === 'on' ? (black ? '#b45309' : '#fffbeb') : black ? '#0f172a' : '#fff'
    const label = labels[m] ?? (showNames && !black ? midiToName(m) : undefined)
    return (
      <g
        key={m} data-midi={m} ref={el => { refs.current[m] = el }} role="button" tabIndex={focus === m ? 0 : -1}
        aria-label={`${midiToName(m)}${sel ? ', selected' : ''}`} aria-pressed={onKey ? sel : undefined}
        style={{ cursor: onKey ? 'pointer' : 'default' }}
        onFocus={() => setFocus(m)}
        onClick={() => onKey?.(m)}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(m + 1) }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); go(m - 1) }
          else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onKey?.(m) }
        }}
      >
        <rect x={x} y={2} width={w} height={h} rx={black ? 2 : 0} fill={fill} stroke="#0f172a" strokeWidth={mk === 'passed' ? 1.5 : 1.5} strokeDasharray={mk === 'passed' ? '4 3' : undefined} />
        {mk === 'on' && !black && <rect x={x + 3} y={wh - 36} width={kw - 6} height={32} rx={4} fill="none" stroke="#b45309" strokeWidth={2.5} />}
        {mk === 'on' && black && <circle cx={x + 12} cy={bh - 12} r={5} fill="#fff" />}
        {mk === 'passed' && black && <path d={`M${x + 5} ${bh - 14} h14`} stroke="#fff" strokeWidth={2} />}
        {label && <text x={x + w / 2} y={black ? bh - 10 : wh - 12} textAnchor="middle" fontSize={12} fontWeight={labels[m] ? 700 : 400} fill={black && mk !== 'on' ? '#fff' : '#1e293b'} pointerEvents="none">{label}</text>}
      </g>
    )
  }
  return (
    <svg className="sp-diagram" viewBox={`0 0 ${W} ${wh + 6}`} role="group" aria-label={title} style={{ maxWidth: W > 400 ? 720 : 560 }}>
      {whites.map(key)}
      {all.filter(isBlackKey).map(key)}
    </svg>
  )
}
