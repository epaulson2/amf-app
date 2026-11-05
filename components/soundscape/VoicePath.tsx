import { midiToName } from '@/lib/soundscape/midi'
import type { NoteEvent } from '@/lib/soundscape/fixtures'

/** Pitch (up) against time (right). Drone = thick solid bar with circle nodes; melody = dashed bar with square nodes. */
export default function VoicePath({ events, title, lo, hi, total }: { events: NoteEvent[]; title: string; lo?: number; hi?: number; total?: number }) {
  const mids = events.map(e => e.midi)
  const L = (lo ?? Math.min(...mids)) - 1, H = (hi ?? Math.max(...mids)) + 1
  const T = total ?? Math.max(...events.map(e => e.start + e.dur))
  const left = 46, W = 640, row = 14, plotH = (H - L) * row, Hh = plotH + 34
  const X = (t: number) => left + (t / T) * (W - left - 8)
  const Y = (m: number) => 8 + (H - m) * row
  const names = [...new Set(mids)].sort((a, b) => a - b)
  const desc = [...events].sort((a, b) => a.start - b.start).map(e => `${e.role === 'drone' ? 'held' : 'melody'} ${midiToName(e.midi)} ${e.start} to ${+(e.start + e.dur).toFixed(2)} seconds`).join('; ')
  return (
    <figure className="m-0">
      <div className="overflow-x-auto" tabIndex={0} role="group" aria-label={`${title} (scrolls sideways on narrow screens)`}><svg className="sp-diagram" style={{ minWidth: 520, maxWidth: 720 }} viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label={title}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {names.map(m => (
          <g key={m}>
            <line x1={left} x2={W - 8} y1={Y(m)} y2={Y(m)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={left - 6} y={Y(m) + 4} textAnchor="end" fontSize={12} fill="#475569">{midiToName(m)}</text>
          </g>
        ))}
        {events.map((e, i) => e.role === 'drone' ? (
          <g key={i}><line x1={X(e.start)} x2={X(e.start + e.dur)} y1={Y(e.midi)} y2={Y(e.midi)} stroke="#0f172a" strokeWidth={6} /><circle cx={X(e.start)} cy={Y(e.midi)} r={6} fill="#0f172a" /></g>
        ) : (
          <g key={i}><line x1={X(e.start)} x2={X(e.start + e.dur)} y1={Y(e.midi)} y2={Y(e.midi)} stroke="#1a5a8a" strokeWidth={5} strokeDasharray="10 4" /><rect x={X(e.start) - 5} y={Y(e.midi) - 5} width={10} height={10} fill="#1a5a8a" /></g>
        ))}
        {[0, 4, 8, 12, 16].filter(t => t <= T).map(t => <text key={t} x={X(t)} y={plotH + 26} textAnchor="middle" fontSize={12} fill="#475569">{t} s</text>)}
      </svg></div>
      <figcaption className="text-sm sp-muted mt-1">Solid thick bar with circles: held low note. Dashed bar with squares: melody. Pitch rises upward; time runs to the right.</figcaption>
    </figure>
  )
}
