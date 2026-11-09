import { useId, type ReactNode } from 'react'

// Exact music diagrams for the Week 2 pilot. Every position is computed from MIDI numbers (B3=59, C4=60 ... G4=67), nothing is hand-placed or painted.
// Static server-rendered SVG: no audio, no script. Lower voice = circle, upper voice = square (shape, not colour, carries the meaning).
const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
const BLACK = new Set([1, 3, 6, 8, 10])
export const noteName = (m: number) => `${NAMES[m % 12]}${Math.floor(m / 12) - 1}`
const isBlack = (m: number) => BLACK.has(m % 12)

const INK = '#4a3b47'
const MUTE = '#6f5f6c'
const LOW = '#7a4f6d'
const UP = '#b25f2d'
const FONT = 'ui-sans-serif,system-ui,sans-serif'

export type Mark = { midi: number; label?: string; voice?: 'lower' | 'upper' }
export type Under = { midi: number; text: string }

function Shape({ voice, x, y, r = 9 }: { voice: 'lower' | 'upper'; x: number; y: number; r?: number }) {
  return voice === 'lower'
    ? <circle cx={x} cy={y} r={r} fill={LOW} stroke="#fff" strokeWidth={1.5} />
    : <rect x={x - r} y={y - r} width={2 * r} height={2 * r} rx={2} fill={UP} stroke="#fff" strokeWidth={1.5} />
}

/** A keyboard span from midi `from` to `to` inclusive (both must be white keys). Optional marks, letter-count numbers, semitone hops and size labels. */
export function Keys({ from, to, kw = 36, marks = [], letters, hops, under = [], note, title, desc }: {
  from: number; to: number; kw?: number; marks?: Mark[]; letters?: { from: number; to: number }; hops?: number[]; under?: Under[]; note?: string; title: string; desc: string
}) {
  const uid = useId()
  const whites: number[] = []
  for (let m = from; m <= to; m++) if (!isBlack(m)) whites.push(m)
  const wi = new Map(whites.map((m, i) => [m, i]))
  const kh = 118
  const bh = 72
  const bw = Math.round(kw * 0.6)
  const padX = 6
  const top = hops ? 70 : 24
  const W = whites.length * kw + padX * 2
  const cx = (m: number) => isBlack(m) ? padX + (wi.get(m - 1)! + 1) * kw : padX + wi.get(m)! * kw + kw / 2
  const keyTop = (m: number) => top + (isBlack(m) ? 0 : 0)
  const H = top + kh + 78
  const markOf = new Map(marks.map(k => [k.midi, k]))
  const letterNums = new Map<number, number>()
  if (letters) { let n = 1; for (const m of whites) if (m >= letters.from && m <= letters.to) letterNums.set(m, n++) }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: W * 1.5, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      {whites.map(m => <rect key={m} x={padX + wi.get(m)! * kw} y={top} width={kw} height={kh} fill={markOf.has(m) ? '#fdf1e3' : '#fffdf8'} stroke={INK} strokeWidth={1.2} />)}
      {Array.from({ length: to - from + 1 }, (_, i) => from + i).filter(isBlack).map(m => <rect key={m} x={cx(m) - bw / 2} y={top} width={bw} height={bh} fill={markOf.has(m) ? '#8a5a2b' : INK} stroke={INK} rx={2} />)}
      {whites.map(m => <text key={'n' + m} x={cx(m)} y={top + kh - 8} textAnchor="middle" fontSize={Math.max(10, kw * 0.34)} fontFamily={FONT} fill={MUTE}>{NAMES[m % 12]}</text>)}
      {marks.map(k => k.voice && <g key={'s' + k.midi}><Shape voice={k.voice} x={cx(k.midi)} y={isBlack(k.midi) ? top + bh - 14 : top + kh - 34} /></g>)}
      {marks.filter(k => k.label).map(k => <text key={'l' + k.midi} x={cx(k.midi)} y={top + kh + 22} textAnchor="middle" fontSize={14} fontWeight={700} fontFamily={FONT} fill={INK}>{k.label}</text>)}
      {[...letterNums].map(([m, n]) => <text key={'ln' + m} x={cx(m)} y={top + kh + 46} textAnchor="middle" fontSize={20} fontWeight={700} fontFamily={FONT} fill={INK}>{n}</text>)}
      {under.map(u => <text key={'u' + u.midi} x={cx(u.midi)} y={top + kh + 66} textAnchor="middle" fontSize={12} fontFamily={FONT} fill={MUTE}>{u.text}</text>)}
      {hops && (() => {
        const els: ReactNode[] = []
        els.push(<text key="z" x={cx(hops[0])} y={top - 8} textAnchor="middle" fontSize={14} fontWeight={700} fontFamily={FONT} fill={MUTE}>0</text>)
        for (let i = 1; i < hops.length; i++) {
          const a = cx(hops[i - 1]); const b = cx(hops[i]); const mid = (a + b) / 2
          els.push(<path key={'h' + i} d={`M${a} ${top - 14} Q${mid} ${top - 52} ${b} ${top - 14}`} fill="none" stroke={INK} strokeWidth={1.6} />)
          els.push(<polygon key={'a' + i} points={`${b},${top - 12} ${b - 4},${top - 20} ${b + 4},${top - 20}`} fill={INK} />)
          els.push(<text key={'c' + i} x={mid} y={top - 34} textAnchor="middle" fontSize={15} fontWeight={700} fontFamily={FONT} fill={INK}>{i}</text>)
        }
        return els
      })()}
      {note && <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={11} fontFamily={FONT} fill={MUTE}>{note}</text>}
    </svg>
  )
}

/** Voices through time. Each panel shows one lower and one upper voice before and after a change, as lines on a ladder of exact pitches. */
export type Panel = { title: string; before: { lo: number; up: number }; after: { lo: number; up: number }; labelBefore?: string; labelAfter?: string }
export function Voices({ panels, title, desc }: { panels: Panel[]; title: string; desc: string }) {
  const uid = useId()
  const all = panels.flatMap(p => [p.before.lo, p.before.up, p.after.lo, p.after.up])
  const lo = Math.min(...all); const hi = Math.max(...all)
  const rowH = 14; const pw = 190; const gap = 14
  const ph = (hi - lo) * rowH + 104
  const W = panels.length * pw + (panels.length - 1) * gap + 8
  const y = (m: number) => 44 + (hi - m) * rowH
  return (
    <svg viewBox={`0 0 ${W} ${ph + 10}`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: W * 1.6, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      {panels.map((p, i) => {
        const x0 = 4 + i * (pw + gap); const xa = x0 + 46; const xb = x0 + pw - 46
        const seg = (a: number, b: number, voice: 'lower' | 'upper') => <line x1={xa} y1={y(a)} x2={xb} y2={y(b)} stroke={voice === 'lower' ? LOW : UP} strokeWidth={3.5} strokeLinecap="round" />
        return (
          <g key={i}>
            <rect x={x0} y={2} width={pw} height={ph + 4} rx={8} fill="#fffdf8" stroke="#e6dccb" />
            <text x={x0 + pw / 2} y={20} textAnchor="middle" fontSize={12} fontWeight={700} fontFamily={FONT} fill={INK}>{p.title}</text>
            {seg(p.before.lo, p.after.lo, 'lower')}
            {seg(p.before.up, p.after.up, 'upper')}
            <Shape voice="lower" x={xa} y={y(p.before.lo)} r={7} /><Shape voice="upper" x={xa} y={y(p.before.up)} r={7} />
            <Shape voice="lower" x={xb} y={y(p.after.lo)} r={7} /><Shape voice="upper" x={xb} y={y(p.after.up)} r={7} />
            <text x={xa - 9} y={y(p.before.lo) + 4} textAnchor="end" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.before.lo)}</text>
            <text x={xa - 9} y={y(p.before.up) + 4} textAnchor="end" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.before.up)}</text>
            <text x={xb + 9} y={y(p.after.lo) + 4} textAnchor="start" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.after.lo)}</text>
            <text x={xb + 9} y={y(p.after.up) + 4} textAnchor="start" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.after.up)}</text>
            {[[p.labelBefore, xa], [p.labelAfter, xb]].map(([l, x], k) => l && <text key={k} x={x as number} textAnchor="middle" fontSize={11} fontFamily={FONT} fill={MUTE}>{String(l).split(', ').map((t, j) => <tspan key={j} x={x as number} y={ph - 22 + j * 14}>{t}{j === 1 ? ' semitones' : ''}</tspan>)}</text>)}
          </g>
        )
      })}
    </svg>
  )
}

/** Step 2 only: two voices as separate events, then together. Shows nothing about interval size. */
export function TwoVoices({ title, desc }: { title: string; desc: string }) {
  const uid = useId()
  const rows = [
    { label: 'C4 alone', bars: [{ v: 'lower' as const }] },
    { label: 'E4 alone', bars: [{ v: 'upper' as const }] },
    { label: 'Together', bars: [{ v: 'lower' as const }, { v: 'upper' as const }] },
  ]
  const W = 300; const rh = 44
  return (
    <svg viewBox={`0 0 ${W} ${rows.length * rh + 28}`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      <text x={110} y={14} fontSize={11} fontFamily={FONT} fill={MUTE}>time →</text>
      {rows.map((r, i) => {
        const y0 = 28 + i * rh
        return (
          <g key={i}>
            <text x={4} y={y0 + 20} fontSize={13} fontWeight={700} fontFamily={FONT} fill={INK}>{r.label}</text>
            {r.bars.map((b, j) => {
              const y = r.bars.length === 2 ? y0 + 6 + (b.v === 'upper' ? 0 : 14) : y0 + 14
              return <g key={j}><line x1={118} y1={y} x2={290} y2={y} stroke={b.v === 'lower' ? LOW : UP} strokeWidth={4} strokeLinecap="round" /><Shape voice={b.v} x={118} y={y} r={7} /></g>
            })}
          </g>
        )
      })}
    </svg>
  )
}

/** Letter count between two notes, counting both ends (C4 to E4 = 3). White keys only. */
export const letterCount = (a: number, b: number) => {
  const L = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
  const idx = (m: number) => Math.floor(m / 12) * 7 + L[m % 12]
  return idx(b) - idx(a) + 1
}
