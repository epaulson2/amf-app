import { isBlackKey, midiToName } from '@/lib/soundscape/midi'

export type KeyMark = { midi: number; label?: string }

/** Chromatic keyboard from C4 (MIDI 60) up. Every key is one semitone; marks use shape + text, not colour alone. */
export default function PitchKeyboard({ lo = 60, hi = 72, marks = [], title, showNames = true }: { lo?: number; hi?: number; marks?: KeyMark[]; title: string; showNames?: boolean }) {
  const whites: number[] = []
  for (let m = lo; m <= hi; m++) if (!isBlackKey(m)) whites.push(m)
  const kw = 40, wh = 120, bh = 74
  const W = whites.length * kw
  const markOf = (m: number) => marks.find(k => k.midi === m)
  const xOf = (m: number) => {
    const idx = whites.indexOf(m)
    return idx * kw
  }
  const desc = marks.length
    ? `Keyboard from ${midiToName(lo)} to ${midiToName(hi)}. Marked: ${marks.map(k => `${midiToName(k.midi)} (MIDI ${k.midi})`).join(', ')}.`
    : `Keyboard from ${midiToName(lo)} to ${midiToName(hi)}.`
  return (
    <figure className="m-0">
      <svg className="sp-diagram" viewBox={`0 0 ${W} ${wh + 44}`} role="img" aria-label={title} style={{ maxWidth: 640 }}>
        <title>{title}</title>
        <desc>{desc}</desc>
        {whites.map(m => (
          <g key={m} data-midi={m}>
            <rect x={xOf(m)} y={2} width={kw} height={wh} fill="#fff" stroke="#0f172a" strokeWidth={1.5} />
            {markOf(m) && <rect x={xOf(m) + 3} y={wh - 34} width={kw - 6} height={30} rx={4} fill="#fffbeb" stroke="#b45309" strokeWidth={2} />}
            {showNames && <text x={xOf(m) + kw / 2} y={wh - 12} textAnchor="middle" fontSize={12} fill="#1e293b">{midiToName(m)}</text>}
          </g>
        ))}
        {Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter(isBlackKey).map(m => {
          const x = xOf(m - 1) + kw - 12
          const mk = markOf(m)
          return (
            <g key={m} data-midi={m}>
              <rect x={x} y={2} width={24} height={bh} rx={2} fill={mk ? '#b45309' : '#0f172a'} stroke="#0f172a" strokeWidth={1.5} />
              {mk && <circle cx={x + 12} cy={bh - 12} r={5} fill="#fff" />}
            </g>
          )
        })}
        {marks.map(k => {
          const black = isBlackKey(k.midi)
          const cx = black ? xOf(k.midi - 1) + kw : xOf(k.midi) + kw / 2
          return <text key={k.midi} x={cx} y={black ? wh + 40 : wh + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0f172a">{k.label ?? midiToName(k.midi)}</text>
        })}
      </svg>
      <figcaption className="sp-sr-only">{desc}</figcaption>
      <div className="sp-sr-only"><table>
        <caption>Key table for {title}</caption>
        <thead><tr><th>Note</th><th>MIDI</th><th>Semitones above {midiToName(lo)}</th></tr></thead>
        <tbody>{Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).map(m => <tr key={m}><td>{midiToName(m)}{markOf(m) ? ' (marked)' : ''}</td><td>{m}</td><td>{m - lo}</td></tr>)}</tbody>
      </table></div>
    </figure>
  )
}
