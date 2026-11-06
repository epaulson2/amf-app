import { midiToName } from '@/lib/soundscape/midi'

export type TLEvent = { midi: number; start: number; dur: number; label?: string; hidden?: boolean; emph?: boolean }
export type TLTrack = { id: string; label: string; role: 'lower' | 'upper'; events: TLEvent[] }
export type Shade = { from: number; to: number; label: string }

const W = 320, LEFT = 40, RIGHT = 312

/**
 * Pitch (up) against time (right), drawn from the same event arrays the audio plays.
 * Lower voice = thick solid bar with a circle; upper voice = dashed bar with a square. Heights are proportional to MIDI pitch.
 * Fits a 320px page: the viewBox is 320 wide and scales down with its container (no sideways scrolling).
 */
export default function EventTimeline({ tracks, total, title, marker, shade = [], hideNames = false, emphasis, blank = false }: {
  tracks: TLTrack[]; total: number; title: string
  marker?: { t: number; label: string }; shade?: Shade[]; hideNames?: boolean; emphasis?: (e: TLEvent, track: TLTrack) => boolean; blank?: boolean
}) {
  const evs = tracks.flatMap(t => t.events.filter(e => !e.hidden).map(e => ({ e, t })))
  const mids = [...new Set(tracks.flatMap(t => t.events.map(e => e.midi)))].sort((a, b) => a - b)
  const lo = mids[0], hi = mids[mids.length - 1]
  const range = Math.max(1, hi - lo)
  const u = Math.max(10, Math.min(22, 170 / range))
  const top = marker ? 34 : 24
  const Y = (m: number) => top + (hi - m) * u
  const plotH = range * u
  const H = top + plotH + 44
  const X = (t: number) => LEFT + (t / total) * (RIGHT - LEFT)
  const step = total <= 8 ? 1 : total <= 20 ? 2 : total <= 40 ? 4 : 10
  const ticks: number[] = []
  for (let t = 0; t <= total + 1e-9; t += step) ticks.push(+t.toFixed(2))
  const desc = blank ? `A blank grid: time runs left to right across ${total} seconds, pitch rises upward.` : evs
    .sort((a, b) => a.e.start - b.e.start)
    .map(({ e, t }) => `${t.label}: ${e.label ?? midiToName(e.midi)} from ${e.start} to ${+(e.start + e.dur).toFixed(2)} seconds`).join('; ')
  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="sp-diagram" role="img" aria-label={title} style={{ maxWidth: 720 }}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {shade.map(s => (
          <g key={s.label}>
            <rect x={X(s.from)} y={top - 14} width={X(s.to) - X(s.from)} height={plotH + 28} fill="#9aaeb1" opacity={0.18} />
            <text x={(X(s.from) + X(s.to)) / 2} y={top - 3} textAnchor="middle" fontSize={13} fill="#1e293b" fontWeight={600}>{s.label}</text>
          </g>
        ))}
        {mids.map(m => (
          <g key={m}>
            <line x1={LEFT} x2={RIGHT} y1={Y(m)} y2={Y(m)} stroke="#cbd5e1" strokeWidth={1} />
            {!blank && <text x={LEFT - 6} y={Y(m) + 4} textAnchor="end" fontSize={13} fill="#475569">{midiToName(m)}</text>}
          </g>
        ))}
        {ticks.map(t => (
          <g key={t}>
            <line x1={X(t)} x2={X(t)} y1={top - 6} y2={top + plotH + 6} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="2 4" />
            <text x={X(t)} y={top + plotH + 22} textAnchor="middle" fontSize={13} fill="#475569">{t}s</text>
          </g>
        ))}
        {marker && (
          <g>
            <line x1={X(marker.t)} x2={X(marker.t)} y1={top - 8} y2={top + plotH + 6} stroke="#b45309" strokeWidth={2} strokeDasharray="5 3" />
            <text x={X(marker.t)} y={12} textAnchor="middle" fontSize={13} fontWeight={700} fill="#b45309">{marker.label}</text>
          </g>
        )}
        {!blank && evs.map(({ e, t }, i) => {
          const y = Y(e.midi), x1 = X(e.start), x2 = X(e.start + e.dur)
          const lower = t.role === 'lower'
          const emph = e.emph || emphasis?.(e, t)
          return (
            <g key={i} data-midi={e.midi} data-start={e.start} data-track={t.id}>
              {emph && <rect x={x1 - 3} y={y - 9} width={x2 - x1 + 6} height={18} rx={4} fill="#fffbeb" stroke="#b45309" strokeWidth={1.5} />}
              <line x1={x1} x2={x2} y1={y} y2={y} stroke={lower ? '#0f172a' : '#1a5a8a'} strokeWidth={lower ? 6 : 5} strokeDasharray={lower ? undefined : '9 4'} />
              {lower ? <circle cx={x1} cy={y} r={6} fill="#0f172a" /> : <rect x={x1 - 5} y={y - 5} width={10} height={10} fill="#1a5a8a" />}
              {!hideNames && <text x={x1 > RIGHT - 44 ? x2 : x1 + 2} textAnchor={x1 > RIGHT - 44 ? 'end' : 'start'} y={y - 10} fontSize={13} fontWeight={700} fill="#1e293b">{e.label ?? midiToName(e.midi)}</text>}
            </g>
          )
        })}
      </svg>
      <figcaption className="text-sm sp-muted mt-1">Lower voice: thick solid bar and circle. Upper voice: dashed bar and square. Time runs left to right; higher pitches sit higher.{blank ? ' This grid is blank on purpose.' : ''}</figcaption>
    </figure>
  )
}
