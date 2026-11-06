import { useId } from 'react'
import { type Keyboard as KB, type White, BLACK_WIDTH, cKeys, nameOf } from '@/lib/soundscape/m02/keyboard-geometry'

// Native, deterministic keyboard illustration. Geometry comes from keyboard-geometry.ts (unit-tested); nothing is hand-placed.
// The site makes no sound: this is a drawing of the learner's own instrument.
export type Mark = { tone: 'held' | 'moving' | 'shared' | 'home'; label?: string }

const KW = 52          // white key width (viewBox px)
const KH = 176         // white key height
const BH = 106         // black key height
const TOP = 40         // room above for the group brackets
const PAD = 6

type Props = {
  kb: KB
  title: string
  desc: string
  /** Glow every C (the learner has asked to see the answer, or the step already taught it). */
  revealC?: boolean
  /** Print the letter on these white keys: 'all' | 'c' | 'none' */
  letters?: 'all' | 'c' | 'none'
  /** Draw the "2" / "3" group brackets above the black keys. */
  groups?: boolean
  marks?: Record<number, Mark>
  className?: string
}

export default function Keyboard({ kb, title, desc, revealC = false, letters = 'none', groups = true, marks = {}, className }: Props) {
  const uid = useId().replace(/:/g, '')
  const w = kb.width * KW + PAD * 2
  const h = TOP + KH + 22
  const cs = new Set(cKeys(kb).map(k => k.midi))
  const toneFill = (t: Mark['tone']) => `url(#${uid}-${t})`
  const label = (k: White) => {
    const m = marks[k.midi]
    if (m?.label) return m.label
    if (letters === 'all') return k.letter
    if (letters === 'c' && cs.has(k.midi)) return 'C'
    if (revealC && cs.has(k.midi)) return 'C'
    return ''
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <defs>
        <linearGradient id={`${uid}-white`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffdf8" /><stop offset=".78" stopColor="#f7efe2" /><stop offset="1" stopColor="#eadfcd" /></linearGradient>
        <linearGradient id={`${uid}-black`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4a2a4d" /><stop offset=".85" stopColor="#2a1630" /><stop offset="1" stopColor="#3a2140" /></linearGradient>
        <radialGradient id={`${uid}-home`} cx=".5" cy=".82" r=".75"><stop offset="0" stopColor="#ffd98a" /><stop offset=".55" stopColor="#f6b94f" /><stop offset="1" stopColor="#f3a53a" stopOpacity=".92" /></radialGradient>
        <linearGradient id={`${uid}-shared`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f6c46a" /><stop offset=".5" stopColor="#efe6c4" /><stop offset="1" stopColor="#8fcdc6" /></linearGradient>
        <radialGradient id={`${uid}-held`} cx=".5" cy=".82" r=".75"><stop offset="0" stopColor="#ffe0a6" /><stop offset="1" stopColor="#f3b25a" /></radialGradient>
        <radialGradient id={`${uid}-moving`} cx=".5" cy=".82" r=".75"><stop offset="0" stopColor="#bfe7e2" /><stop offset="1" stopColor="#8fcdc6" /></radialGradient>
        <filter id={`${uid}-glow`} x="-40%" y="-20%" width="180%" height="150%"><feGaussianBlur stdDeviation="9" /></filter>
        <filter id={`${uid}-soft`} x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#6d326e" floodOpacity=".16" /></filter>
      </defs>

      {/* group brackets: the "two, then three" landmark */}
      {groups && kb.groups.map((g, i) => {
        const bs = g.blacks
        const x1 = PAD + bs[0].x * KW, x2 = PAD + (bs[bs.length - 1].x + BLACK_WIDTH) * KW
        return (
          <g key={i} aria-hidden="true">
            <path d={`M${x1} ${TOP - 8} v-8 h${x2 - x1} v8`} fill="none" stroke="#a3778f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x={(x1 + x2) / 2} y={TOP - 22} textAnchor="middle" fontSize="19" fontWeight="700" fill="#6d326e" style={{ fontFamily: 'Georgia, serif' }}>{g.size}</text>
          </g>
        )
      })}

      <g filter={`url(#${uid}-soft)`}>
        {kb.whites.map(k => {
          const m = marks[k.midi]
          const home = revealC && cs.has(k.midi)
          const tone = m?.tone ?? (home ? 'home' : null)
          return (
            <g key={k.index}>
              {tone && <rect x={PAD + k.x * KW + 2} y={TOP + KH - 70} width={KW - 4} height={86} rx="22" fill={tone === 'moving' ? '#8fcdc6' : tone === 'shared' ? '#c9a6d8' : '#f6b94f'} opacity=".55" filter={`url(#${uid}-glow)`} />}
              <rect x={PAD + k.x * KW + 1} y={TOP} width={KW - 2} height={KH} rx="7" fill={tone ? toneFill(tone) : `url(#${uid}-white)`} stroke="#bfa8b3" strokeWidth="1.4" />
              {tone && <rect x={PAD + k.x * KW + 1} y={TOP} width={KW - 2} height={KH} rx="7" fill="none" stroke={tone === 'moving' ? '#3f9b92' : tone === 'shared' ? '#7a4a8c' : '#c8811f'} strokeWidth="2.6" />}
            </g>
          )
        })}
      </g>
      {kb.blacks.map((b, i) => (
        <g key={i}>
          <rect x={PAD + b.x * KW} y={TOP - 1} width={b.w * KW} height={BH} rx="5" fill={`url(#${uid}-black)`} />
          <rect x={PAD + b.x * KW + 3} y={TOP + 3} width={b.w * KW - 6} height="9" rx="3" fill="#ffffff" opacity=".13" />
        </g>
      ))}
      {kb.whites.map(k => {
        const t = label(k)
        if (!t) return null
        const m = marks[k.midi]
        const strong = !!m || (revealC && cs.has(k.midi))
        return (
          <g key={`l${k.index}`}>
            {m?.tone === 'moving' && <path d={`M${PAD + (k.x + .5) * KW} ${TOP + KH - 62} l12 12 l-12 12 l-12 -12 z`} fill="#fff" opacity=".7" />}
            {m && m.tone === 'shared' && <g aria-hidden="true"><circle cx={PAD + (k.x + .5) * KW - 6} cy={TOP + KH - 50} r="10" fill="#f6c46a" opacity=".85" stroke="#7a4a8c" strokeWidth="1.6" /><circle cx={PAD + (k.x + .5) * KW + 6} cy={TOP + KH - 50} r="10" fill="#8fcdc6" opacity=".85" stroke="#7a4a8c" strokeWidth="1.6" /></g>}
            {m && m.tone !== 'moving' && m.tone !== 'shared' && <circle cx={PAD + (k.x + .5) * KW} cy={TOP + KH - 50} r="12" fill="#fff" opacity=".7" />}
            <text x={PAD + (k.x + .5) * KW} y={TOP + KH - 14} textAnchor="middle" fontSize={strong ? 26 : 18} fontWeight={strong ? 700 : 500} fill={strong ? '#4c2346' : '#8a6f85'} style={{ fontFamily: 'Georgia, serif' }}>{t}</text>
          </g>
        )
      })}
      {/* invisible, screen-reader-friendly list of what is drawn */}
      <text x="-9999" y="-9999" aria-hidden="true">{kb.whites.map(k => nameOf(k.midi)).join(' ')}</text>
    </svg>
  )
}
