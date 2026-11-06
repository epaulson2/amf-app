import { midiToName } from '@/lib/soundscape/midi'

export type Pairs = { lower: number; upper: number; lowerName?: string; upperName?: string }

function arrow(ax: number, ay: number, bx: number, by: number, col: string) {
  const ang = Math.atan2(by - ay, bx - ax), L = 10, tx = bx - 11 * Math.cos(ang), ty = by - 11 * Math.sin(ang)
  const p = (d: number) => `${tx - L * Math.cos(ang + d)},${ty - L * Math.sin(ang + d)}`
  return <polygon points={`${tx + 2 * Math.cos(ang)},${ty + 2 * Math.sin(ang)} ${p(0.45)} ${p(-0.45)}`} fill={col} />
}

/** One before-and-after panel for two voices: circle = lower voice, square = upper voice, arrow = what that voice does. */
export default function MotionPanel({ title, before, after, kind, intervalBefore, intervalAfter, headline }: {
  title: string; before: Pairs; after: Pairs; kind: string
  intervalBefore: string; intervalAfter: string; headline?: string
}) {
  const mids = [before.lower, before.upper, after.lower, after.upper]
  const lo = Math.min(...mids) - 1, hi = Math.max(...mids) + 1
  const u = Math.max(14, Math.min(24, 150 / (hi - lo)))
  const Y = (m: number) => 14 + (hi - m) * u
  const H = 14 + (hi - lo) * u + 40
  const x0 = 62, x1 = 168
  const nm = (m: number, n?: string) => n ?? midiToName(m)
  const move = (a: number, b: number) => (a === b ? 'holds' : b > a ? `rises ${b - a}` : `falls ${a - b}`)
  const desc = `${title}. Before: ${nm(before.lower, before.lowerName)} below ${nm(before.upper, before.upperName)}, ${intervalBefore}. Lower voice ${move(before.lower, after.lower)}; upper voice ${move(before.upper, after.upper)}. After: ${nm(after.lower, after.lowerName)} below ${nm(after.upper, after.upperName)}, ${intervalAfter}. ${kind} motion.`
  const voice = (b: number, a: number, lower: boolean, bn?: string, an?: string) => {
    const col = lower ? '#0f172a' : '#1a5a8a'
    const hold = b === a
    return (
      <g>
        <line x1={x0} y1={Y(b)} x2={x1} y2={Y(a)} stroke={col} strokeWidth={4} strokeDasharray={lower ? undefined : '8 4'} />
        {!hold && arrow(x0, Y(b), x1, Y(a), col)}
        {lower ? <circle cx={x0} cy={Y(b)} r={7} fill={col} /> : <rect x={x0 - 6} y={Y(b) - 6} width={12} height={12} fill={col} />}
        {lower ? <circle cx={x1} cy={Y(a)} r={7} fill="#fff" stroke={col} strokeWidth={3} /> : <rect x={x1 - 6} y={Y(a) - 6} width={12} height={12} fill="#fff" stroke={col} strokeWidth={3} />}
        <text x={x0 - 12} y={Y(b) + 4} textAnchor="end" fontSize={13} fontWeight={700} fill="#1e293b">{nm(b, bn)}</text>
        <text x={x1 + 12} y={Y(a) + 4} fontSize={13} fontWeight={700} fill="#1e293b">{nm(a, an)}</text>
        <text x={(x0 + x1) / 2} y={(Y(b) + Y(a)) / 2 - 8} textAnchor="middle" fontSize={12} fill="#475569">{hold ? 'holds' : b < a ? `+${a - b}` : `−${b - a}`}</text>
      </g>
    )
  }
  return (
    <figure className="m-0 sp-card p-3">
      <figcaption className="font-semibold text-slate-900 mb-1">{title}</figcaption>
      <svg viewBox={`0 0 250 ${H}`} className="sp-diagram" role="img" aria-label={desc}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {[before.lower, before.upper, after.lower, after.upper].filter((m, i, a) => a.indexOf(m) === i).map(m => <line key={m} x1={x0 - 6} x2={x1 + 6} y1={Y(m)} y2={Y(m)} stroke="#e2e8f0" />)}
        {voice(before.upper, after.upper, false, before.upperName, after.upperName)}
        {voice(before.lower, after.lower, true, before.lowerName, after.lowerName)}
        <text x={x0} y={H - 22} textAnchor="middle" fontSize={12} fill="#475569">start</text>
        <text x={x1} y={H - 22} textAnchor="middle" fontSize={12} fill="#475569">next</text>
      </svg>
      <p className="m-0 text-sm"><strong>{kind}.</strong> {intervalBefore} → {intervalAfter}.</p>
      {headline && <p className="m-0 text-sm sp-muted">{headline}</p>}
    </figure>
  )
}
