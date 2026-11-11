import { useId, type ReactNode } from 'react'

// Exact music diagrams for the Week 2 pilot. Every position is computed from MIDI numbers (B3=59, C4=60 ... G4=67), nothing is hand-placed or painted.
// Static server-rendered SVG: no audio, no script. Lower voice = circle, upper voice = square (shape, not colour, carries the meaning).
import type { NoteEvent } from '@/lib/soundscape/fixtures'
import { noteName } from '@/lib/soundscape/week2/lesson2a-facts'
import { identityHex } from '@/lib/soundscape/resources/interval-identity'
export { identityHex }
const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
const BLACK = new Set([1, 3, 6, 8, 10])
const isBlack = (m: number) => BLACK.has(m % 12)

const INK = '#4a3b47'
/** Soft key tint from an identity colour (same hue, light), so a highlighted key stays readable in print. */
const tint = (hex: string) => (hex === '#4a3b47' ? '#fdf1e3' : hex + '33')
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
export function Keys({ from, to, kw = 36, marks = [], letters, hops, under = [], note, title, desc, accent = INK }: {
  from: number; to: number; kw?: number; accent?: string; marks?: Mark[]; letters?: { from: number; to: number }; hops?: number[]; under?: Under[]; note?: string; title: string; desc: string
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
      {whites.map(m => <rect key={m} x={padX + wi.get(m)! * kw} y={top} width={kw} height={kh} fill={markOf.has(m) ? tint(accent) : '#fffdf8'} stroke={INK} strokeWidth={1.2} />)}
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
          els.push(<path key={'h' + i} d={`M${a} ${top - 14} Q${mid} ${top - 52} ${b} ${top - 14}`} fill="none" stroke={accent} strokeWidth={1.8} />)
          els.push(<polygon key={'a' + i} points={`${b},${top - 12} ${b - 4},${top - 20} ${b + 4},${top - 20}`} fill={accent} />)
          els.push(<text key={'c' + i} x={mid} y={top - 34} textAnchor="middle" fontSize={15} fontWeight={700} fontFamily={FONT} fill={INK}>{i}</text>)
        }
        return els
      })()}
      {note && <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={11} fontFamily={FONT} fill={MUTE}>{note}</text>}
    </svg>
  )
}

/** Voices through time. Each panel shows one lower and one upper voice before and after a change, as lines on a ladder of exact pitches. */
export type Panel = { title: string; accent?: string; moves?: { lo?: string; up?: string }; before: { lo: number; up: number }; after: { lo: number; up: number }; labelBefore?: string; labelAfter?: string }
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
            <rect x={x0} y={2} width={pw} height={ph + 4} rx={8} fill="#fffdf8" stroke={p.accent ?? '#e6dccb'} strokeWidth={p.accent ? 2 : 1} />
            <text x={x0 + pw / 2} y={20} textAnchor="middle" fontSize={12} fontWeight={700} fontFamily={FONT} fill={INK}>{p.title}</text>
            {seg(p.before.lo, p.after.lo, 'lower')}
            {seg(p.before.up, p.after.up, 'upper')}
            <Shape voice="lower" x={xa} y={y(p.before.lo)} r={7} /><Shape voice="upper" x={xa} y={y(p.before.up)} r={7} />
            <Shape voice="lower" x={xb} y={y(p.after.lo)} r={7} /><Shape voice="upper" x={xb} y={y(p.after.up)} r={7} />
            <text x={xa - 9} y={y(p.before.lo) + 4} textAnchor="end" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.before.lo)}</text>
            <text x={xa - 9} y={y(p.before.up) + 4} textAnchor="end" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.before.up)}</text>
            <text x={xb + 9} y={y(p.after.lo) + 4} textAnchor="start" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.after.lo)}</text>
            <text x={xb + 9} y={y(p.after.up) + 4} textAnchor="start" fontSize={11} fontFamily={FONT} fill={INK}>{noteName(p.after.up)}</text>
            {p.moves?.up && <text x={(xa + xb) / 2} y={(y(p.before.up) + y(p.after.up)) / 2 - 8} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>{p.moves.up}</text>}
            {p.moves?.lo && <text x={(xa + xb) / 2} y={(y(p.before.lo) + y(p.after.lo)) / 2 + 17} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>{p.moves.lo}</text>}
            {[[p.labelBefore, xa], [p.labelAfter, xb]].map(([l, x], k) => l && <text key={k} x={x as number} textAnchor="middle" fontSize={11} fontFamily={FONT} fontWeight={k === 1 && p.accent ? 700 : 400} fill={k === 1 && p.accent ? INK : MUTE}>{String(l).split(', ').map((t, j) => <tspan key={j} x={x as number} y={ph - 22 + j * 14}>{t}{j === 1 ? ' semitones' : ''}</tspan>)}</text>)}
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

/** 2B step 2: a schematic (no pitches, no answers) of the two things to look at: vertical interval and horizontal motion. */
export function PathsGap({ title, desc }: { title: string; desc: string }) {
  const uid = useId()
  return (
    <svg viewBox="0 0 320 170" role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: 520, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      <path d="M40 60 L110 60 L200 38 L280 38" fill="none" stroke={UP} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 118 L110 118 L200 130 L280 108" fill="none" stroke={LOW} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <Shape voice="upper" x={40} y={60} r={8} /><Shape voice="lower" x={40} y={118} r={8} />
      <line x1={64} y1={66} x2={64} y2={112} stroke={INK} strokeWidth={1.5} /><polygon points="64,66 60,74 68,74" fill={INK} /><polygon points="64,112 60,104 68,104" fill={INK} />
      <text x={72} y={93} fontSize={12} fontWeight={700} fontFamily={FONT} fill={INK}>vertical interval</text>
      <text x={72} y={107} fontSize={10.5} fontFamily={FONT} fill={MUTE}>distance at one moment</text>
      <line x1={120} y1={152} x2={280} y2={152} stroke={INK} strokeWidth={1.5} /><polygon points="280,152 272,148 272,156" fill={INK} />
      <text x={120} y={166} fontSize={12} fontWeight={700} fontFamily={FONT} fill={INK}>horizontal motion: each voice, moment to moment</text>
      <text x={40} y={22} fontSize={11} fontFamily={FONT} fill={MUTE}>upper voice (square)</text>
      <text x={200} y={146} fontSize={11} fontFamily={FONT} fill={MUTE} textAnchor="middle" />
    </svg>
  )
}

export type Moment = { lo: number; up: number; size: number; name: string }
/** 2B step 10: moments joined by arrows. Both voices drawn as paths through time on an exact pitch ladder. */
export function Moments({ moments, arrows, title, desc }: { moments: Moment[]; arrows: string[]; title: string; desc: string }) {
  const uid = useId()
  const all = moments.flatMap(m => [m.lo, m.up]); const lo = Math.min(...all); const hi = Math.max(...all)
  const n = moments.length; const gap = 72; const x0 = 42; const W = x0 * 2 + gap * (n - 1)
  const rowH = 17; const top = 52; const y = (m: number) => top + (hi - m) * rowH
  const H = top + (hi - lo) * rowH + 96
  const line = (key: 'lo' | 'up', col: string) => <polyline points={moments.map((m, i) => `${x0 + i * gap},${y(m[key])}`).join(' ')} fill="none" stroke={col} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: W * 1.7, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      {arrows.map((a, i) => <text key={'a' + i} x={x0 + i * gap + gap / 2} y={16} textAnchor="middle" fontSize={10.5} fontWeight={700} fontFamily={FONT} fill={INK}>{a.split(' / ').map((t, j) => <tspan key={j} x={x0 + i * gap + gap / 2} y={16 + j * 12}>{t}</tspan>)}</text>)}
      {line('up', UP)}{line('lo', LOW)}
      {moments.map((m, i) => {
        const cx = x0 + i * gap; const col = identityHex(m.size)
        return (
          <g key={i}>
            <Shape voice="upper" x={cx} y={y(m.up)} r={7} /><Shape voice="lower" x={cx} y={y(m.lo)} r={7} />
            <text x={cx} y={y(m.up) - 11} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>{noteName(m.up)}</text>
            <text x={cx} y={y(m.lo) + 22} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>{noteName(m.lo)}</text>
            <rect x={cx - 33} y={H - 54} width={66} height={46} rx={8} fill={col + '2e'} stroke={col} strokeWidth={2} />
            <text x={cx} y={H - 36} textAnchor="middle" fontSize={15} fontWeight={700} fontFamily={FONT} fill={INK}>{m.size}</text>
            {m.name.split(' ').map((t, j) => <text key={j} x={cx} y={H - 23 + j * 11} textAnchor="middle" fontSize={9.5} fontFamily={FONT} fill={INK}>{t}</text>)}
          </g>
        )
      })}
    </svg>
  )
}

export type Lane = { label: string; events: NoteEvent[] }
/** 2C: a time axis with the upper line shared and one or more lower-line variants. Chips carry the size of the interval only where both voices sound. */
export function Timeline({ upper, variants, seconds = 36, window: win, title, desc }: {
  upper: NoteEvent[]; variants: Lane[]; seconds?: number; window?: { from: number; to: number; label: string }; title: string; desc: string
}) {
  const uid = useId()
  const X0 = 58; const PW = 252; const W = X0 + PW + 10; const x = (t: number) => X0 + (t / seconds) * PW
  const rowY = (i: number) => 34 + i * 62
  const H = 34 + (variants.length + 1) * 62 + 24
  const bar = (e: NoteEvent, y: number, voice: 'lower' | 'upper', k: string) => (
    <g key={k}>
      <rect x={x(e.start)} y={y} width={x(e.start + e.dur) - x(e.start)} height={24} rx={5} fill={voice === 'lower' ? LOW : UP} />
      <text x={(x(e.start) + x(e.start + e.dur)) / 2} y={y + 16} textAnchor="middle" fontSize={11} fontWeight={700} fontFamily={FONT} fill="#fff">{noteName(e.midi)}</text>
    </g>
  )
  const lowerAt = (ev: NoteEvent[], t: number) => ev.find(e => e.start <= t && t < e.start + e.dur)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg" style={{ width: '100%', maxWidth: W * 2, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      {win && <g><rect x={x(win.from)} y={14} width={x(win.to) - x(win.from)} height={H - 44} fill="#f4e7c8" opacity={0.7} /><text x={(x(win.from) + x(win.to)) / 2} y={11} textAnchor="middle" fontSize={10} fontFamily={FONT} fontWeight={700} fill={INK}>{win.label}</text></g>}
      <text x={4} y={rowY(0) + 16} fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>Upper</text>
      <line x1={X0} y1={rowY(0) + 12} x2={X0 + PW} y2={rowY(0) + 12} stroke="#d8cdbb" strokeDasharray="3 4" />
      {upper.map((e, i) => bar(e, rowY(0), 'upper', 'u' + i))}
      {variants.map((v, vi) => {
        const y = rowY(vi + 1)
        return (
          <g key={vi}>
            <text x={4} y={y + 16} fontSize={11} fontWeight={700} fontFamily={FONT} fill={INK}>{v.label.split(' / ').map((t, j) => <tspan key={j} x={4} y={y + 14 + j * 12}>{t}</tspan>)}</text>
            <line x1={X0} y1={y + 12} x2={X0 + PW} y2={y + 12} stroke="#d8cdbb" strokeDasharray="3 4" />
            {v.events.map((e, i) => bar(e, y, 'lower', 'l' + vi + i))}
            {upper.map((u, i) => {
              const t = u.start + u.dur / 2; const lo = lowerAt(v.events, t)!; const size = u.midi - lo.midi; const col = identityHex(size); const cx = x(t)
              return <g key={'c' + i}><rect x={cx - 15} y={y + 30} width={30} height={20} rx={6} fill={col + '2e'} stroke={col} strokeWidth={2} /><text x={cx} y={y + 44} textAnchor="middle" fontSize={12} fontWeight={700} fontFamily={FONT} fill={INK}>{size}</text></g>
            })}
          </g>
        )
      })}
      {[0, seconds / 3, (2 * seconds) / 3, seconds].map(t => <g key={t}><line x1={x(t)} y1={H - 22} x2={x(t)} y2={H - 16} stroke={INK} /><text x={x(t)} y={H - 6} textAnchor="middle" fontSize={10} fontFamily={FONT} fill={MUTE}>{Math.round(t)} s</text></g>)}
      <line x1={X0} y1={H - 22} x2={X0 + PW} y2={H - 22} stroke={INK} />
    </svg>
  )
}

/** Blank response lanes for printed worksheets: an upper and a lower lane over `cols` moments or a seconds axis. No answers. */
export function BlankLanes({ cols = 6, seconds, title, desc }: { cols?: number; seconds?: number; title: string; desc: string }) {
  const uid = useId()
  const W = 320; const X0 = 76; const PW = 234; const n = seconds ? Math.floor(seconds / 5) : cols; const cw = PW / n
  return (
    <svg viewBox={`0 0 ${W} 150`} role="img" aria-labelledby={`${uid}t ${uid}d`} className="w2-svg w2-blank" style={{ width: '100%', maxWidth: 640, height: 'auto', display: 'block' }}>
      <title id={`${uid}t`}>{title}</title><desc id={`${uid}d`}>{desc}</desc>
      {[0, 1].map(r => (
        <g key={r}>
          <Shape voice={r === 0 ? 'upper' : 'lower'} x={14} y={36 + r * 50} r={7} />
          <text x={28} y={40 + r * 50} fontSize={11} fontWeight={700} fontFamily={FONT} fill="#000">{r === 0 ? 'Upper' : 'Lower'}</text>
          <rect x={X0} y={18 + r * 50} width={PW} height={36} fill="#fff" stroke="#000" strokeWidth={1.2} />
          {Array.from({ length: n - 1 }, (_, i) => <line key={i} x1={X0 + (i + 1) * cw} y1={18 + r * 50} x2={X0 + (i + 1) * cw} y2={54 + r * 50} stroke="#999" strokeDasharray="2 3" />)}
        </g>
      ))}
      <text x={X0} y={126} fontSize={10} fontFamily={FONT} fill="#000">{seconds ? '0 s' : 'moment 1'}</text>
      <text x={X0 + PW} y={126} textAnchor="end" fontSize={10} fontFamily={FONT} fill="#000">{seconds ? `${seconds} s` : `moment ${cols}`}</text>
      <text x={W / 2} y={142} textAnchor="middle" fontSize={10} fontFamily={FONT} fill="#555">{seconds ? 'Write note names in the boxes. Leave a gap for each rest.' : 'Write each note name in its box. Write the interval size between the lanes.'}</text>
    </svg>
  )
}
