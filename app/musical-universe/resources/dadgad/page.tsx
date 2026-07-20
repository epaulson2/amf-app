import Link from 'next/link'

// ─── Chord diagram data types ────────────────────────────────────────────────

interface ChordShape {
  label: string
  frets: number[]       // one per string, low to high within the group
  tones: ('R' | '3' | 'b3' | '5')[]
  pitches: string
  noteLabel: string     // e.g. "R — 3 — 5"
  openNote?: string     // note if open strings used
}

interface StringGroup {
  id: string
  strings: string       // e.g. "6-5-4"
  notes: string         // e.g. "D-A-D"
  intervals: string
  intervalNote?: string
  major: ChordShape[]
  minor: ChordShape[]
}

// ─── All chord data ──────────────────────────────────────────────────────────

const stringGroups: StringGroup[] = [
  {
    id: 'sg-654',
    strings: '6-5-4',
    notes: 'D-A-D',
    intervals: 'P5 → P4',
    intervalNote: 'String 6→5 is a Perfect 5th (7 semitones) — unusual crossing',
    major: [
      { label: 'Root position',  frets: [12, 9, 7],  tones: ['R', '3',  '5'],  pitches: 'D3-F#3-A3', noteLabel: 'R — 3 — 5' },
      { label: '1st inversion',  frets: [4,  0, 0],  tones: ['3', '5',  'R'],  pitches: 'F#2-A2-D3', noteLabel: '3 — 5 — R', openNote: 'open strings' },
      { label: '2nd inversion',  frets: [7,  5, 4],  tones: ['5', 'R',  '3'],  pitches: 'A2-D3-F#3', noteLabel: '5 — R — 3' },
    ],
    minor: [
      { label: 'Root position',  frets: [12, 8, 7],  tones: ['R', 'b3', '5'],  pitches: 'D3-F3-A3',  noteLabel: 'R — b3 — 5' },
      { label: '1st inversion',  frets: [3,  0, 0],  tones: ['b3','5',  'R'],  pitches: 'F2-A2-D3',  noteLabel: 'b3 — 5 — R', openNote: 'open strings' },
      { label: '2nd inversion',  frets: [7,  5, 3],  tones: ['5', 'R',  'b3'], pitches: 'A2-D3-F3',  noteLabel: '5 — R — b3' },
    ],
  },
  {
    id: 'sg-543',
    strings: '5-4-3',
    notes: 'A-D-G',
    intervals: 'P4 → P4',
    intervalNote: 'Equal P4 intervals — same as Standard tuning',
    major: [
      { label: 'Root position',  frets: [5,  4,  2],  tones: ['R', '3',  '5'],  pitches: 'D3-F#3-A3', noteLabel: 'R — 3 — 5' },
      { label: '1st inversion',  frets: [9,  7,  7],  tones: ['3', '5',  'R'],  pitches: 'F#3-A3-D4', noteLabel: '3 — 5 — R' },
      { label: '2nd inversion',  frets: [12, 12, 11], tones: ['5', 'R',  '3'],  pitches: 'A3-D4-F#4', noteLabel: '5 — R — 3' },
    ],
    minor: [
      { label: 'Root position',  frets: [5,  3,  2],  tones: ['R', 'b3', '5'],  pitches: 'D3-F3-A3',  noteLabel: 'R — b3 — 5' },
      { label: '1st inversion',  frets: [8,  7,  7],  tones: ['b3','5',  'R'],  pitches: 'F3-A3-D4',  noteLabel: 'b3 — 5 — R' },
      { label: '2nd inversion',  frets: [12, 12, 10], tones: ['5', 'R',  'b3'], pitches: 'A3-D4-F4',  noteLabel: '5 — R — b3' },
    ],
  },
  {
    id: 'sg-432',
    strings: '4-3-2',
    notes: 'D-G-A',
    intervals: 'P4 → M2',
    intervalNote: 'String 3→2 is a Major 2nd (2 semitones) — unusual crossing',
    major: [
      { label: 'Root position',  frets: [12, 11, 12], tones: ['R', '3',  '5'],  pitches: 'D4-F#4-A4', noteLabel: 'R — 3 — 5' },
      { label: '1st inversion',  frets: [4,  2,  5],  tones: ['3', '5',  'R'],  pitches: 'F#3-A3-D4', noteLabel: '3 — 5 — R' },
      { label: '2nd inversion',  frets: [7,  7,  9],  tones: ['5', 'R',  '3'],  pitches: 'A3-D4-F#4', noteLabel: '5 — R — 3' },
    ],
    minor: [
      { label: 'Root position',  frets: [12, 10, 12], tones: ['R', 'b3', '5'],  pitches: 'D4-F4-A4',  noteLabel: 'R — b3 — 5' },
      { label: '1st inversion',  frets: [3,  2,  5],  tones: ['b3','5',  'R'],  pitches: 'F3-A3-D4',  noteLabel: 'b3 — 5 — R' },
      { label: '2nd inversion',  frets: [7,  7,  8],  tones: ['5', 'R',  'b3'], pitches: 'A3-D4-F4',  noteLabel: '5 — R — b3' },
    ],
  },
  {
    id: 'sg-321',
    strings: '3-2-1',
    notes: 'G-A-D',
    intervals: 'M2 → P4',
    intervalNote: 'String 3→2 is a Major 2nd (2 semitones) — unusual crossing',
    major: [
      { label: 'Root position',  frets: [7,  9,  7],  tones: ['R', '3',  '5'],  pitches: 'D4-F#4-A4', noteLabel: 'R — 3 — 5' },
      { label: '1st inversion',  frets: [11, 12, 12], tones: ['3', '5',  'R'],  pitches: 'F#4-A4-D5', noteLabel: '3 — 5 — R' },
      { label: '2nd inversion',  frets: [2,  5,  4],  tones: ['5', 'R',  '3'],  pitches: 'A3-D4-F#4', noteLabel: '5 — R — 3' },
    ],
    minor: [
      { label: 'Root position',  frets: [7,  8,  7],  tones: ['R', 'b3', '5'],  pitches: 'D4-F4-A4',  noteLabel: 'R — b3 — 5' },
      { label: '1st inversion',  frets: [10, 12, 12], tones: ['b3','5',  'R'],  pitches: 'F4-A4-D5',  noteLabel: 'b3 — 5 — R' },
      { label: '2nd inversion',  frets: [2,  5,  3],  tones: ['5', 'R',  'b3'], pitches: 'A3-D4-F4',  noteLabel: '5 — R — b3' },
    ],
  },
]

// ─── Dot color by chord tone ─────────────────────────────────────────────────
function dotColor(tone: ChordShape['tones'][number]): string {
  if (tone === 'R')  return '#10b981'  // emerald
  if (tone === '5')  return '#8b5cf6'  // violet
  return '#f59e0b'                     // amber — 3rd or b3rd
}

// ─── Inline chord box SVG ────────────────────────────────────────────────────
// 3 strings, 5 visible frets, dots placed relative to displayed window
function ChordBox({ shape }: { shape: ChordShape }) {
  const W = 100
  const H = 110
  const nutY = 18
  const stringSpacing = 22
  const fretSpacing = 18
  const numStrings = 3
  const numFrets = 5

  const hasFret0 = shape.frets.includes(0)
  const nonZeroFrets = shape.frets.filter(f => f > 0)
  const minFret = nonZeroFrets.length > 0 ? Math.min(...nonZeroFrets) : 1
  // window start: for open strings show from fret 0; otherwise start 1 below min
  const windowStart = hasFret0 ? 0 : Math.max(1, minFret - 1)
  const showNut = windowStart === 0

  // x coords for 3 strings
  const sx = (i: number) => 18 + i * stringSpacing  // i=0 is lowest string in group
  // y coord for a fret within the window
  const fy = (fret: number) => {
    if (fret === 0) return nutY - 9  // open circle above nut
    return nutY + (fret - windowStart) * fretSpacing
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display: 'block' }} aria-label={`${shape.label} chord diagram`}>
      {/* Nut or position indicator */}
      {showNut ? (
        <rect x="14" y={nutY - 2} width={(numStrings - 1) * stringSpacing + 4} height={4} rx="1" fill="#e2e8f0" />
      ) : (
        <text x="14" y={nutY - 3} fontSize="8" fill="#94a3b8" fontFamily="monospace">fr.{windowStart}</text>
      )}

      {/* Fret lines */}
      {Array.from({ length: numFrets + 1 }, (_, fi) => (
        <line
          key={fi}
          x1={sx(0)} y1={nutY + fi * fretSpacing}
          x2={sx(numStrings - 1)} y2={nutY + fi * fretSpacing}
          stroke="#334155" strokeWidth={fi === 0 && showNut ? 0 : 1}
        />
      ))}

      {/* String lines */}
      {Array.from({ length: numStrings }, (_, si) => (
        <line
          key={si}
          x1={sx(si)} y1={nutY}
          x2={sx(si)} y2={nutY + numFrets * fretSpacing}
          stroke="#475569" strokeWidth="1.2"
        />
      ))}

      {/* Dots */}
      {shape.frets.map((fret, si) => {
        const cx = sx(si)
        const cy = fret === 0
          ? nutY - 8
          : nutY + (fret - windowStart) * fretSpacing - fretSpacing / 2
        const color = dotColor(shape.tones[si])
        return fret === 0 ? (
          <circle key={si} cx={cx} cy={cy} r="5" fill="none" stroke={color} strokeWidth="1.5" />
        ) : (
          <circle key={si} cx={cx} cy={cy} r="6.5" fill={color} opacity="0.92" />
        )
      })}

      {/* Tone labels below dots */}
      {shape.frets.map((fret, si) => {
        const cx = sx(si)
        const cy = fret === 0
          ? nutY - 8
          : nutY + (fret - windowStart) * fretSpacing - fretSpacing / 2
        return (
          <text key={si} x={cx} y={cy + 4} textAnchor="middle" fontSize="6.5" fill="white" fontWeight="700" fontFamily="monospace">
            {shape.tones[si]}
          </text>
        )
      })}

      {/* Fret number labels above each dot (show actual fret) */}
      {shape.frets.map((fret, si) => {
        if (fret === 0) return null
        const cx = sx(si)
        const cy = nutY + (fret - windowStart) * fretSpacing - fretSpacing / 2
        return (
          <text key={si} x={cx + 10} y={cy - 4} fontSize="7" fill="#64748b" fontFamily="monospace">{fret}</text>
        )
      })}

      {/* Pitch labels at bottom */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="monospace">
        {shape.pitches}
      </text>
    </svg>
  )
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-14">
      <h2
        className="text-2xl font-extrabold mb-6 pb-3 border-b"
        style={{ color: '#a78bfa', borderColor: '#7c3aed44' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DADGADGuidePage() {
  const tocItems: [string, string][] = [
    ['#string-map',       'String Map'],
    ['#diatonic-cycle',   'Diatonic Cycle'],
    ['#pentatonic-cycle', 'Pentatonic Cycle'],
    ['#closed-triads',    'Closed Triads'],
  ]

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="py-16 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/musical-universe"
            className="text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{ color: '#64748b' }}
          >
            ← Musical Universe
          </Link>
          <p className="text-xs font-bold tracking-widest uppercase mt-4 mb-3" style={{ color: '#a78bfa' }}>
            AMF · Guitar Navigation System · Resources
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            DADGAD Tuning
            <br />
            <span
              className="inline-block mt-1"
              style={{
                background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 50%,#0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Reference Guide
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mt-4">
            String geometry, diatonic &amp; pentatonic cycle corrections, and
            complete closed-triad shapes across all four string groups — for D
            major and D minor in every inversion.
          </p>
        </div>
      </div>

      {/* Gradient rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 50%,#0891b2 100%)' }} />

      {/* ── Sticky TOC ───────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b py-3 px-4 sm:px-6"
        style={{ background: '#0f172a', borderColor: '#1e293b' }}
      >
        <div className="max-w-3xl mx-auto flex flex-wrap gap-x-5 gap-y-1 items-center">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>Contents</span>
          {tocItems.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm transition-colors hover:underline"
              style={{ color: '#a78bfa' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

          {/* Navigation Framework */}
          <div className="mb-10 rounded-2xl border border-violet-200 p-6" style={{ background: '#faf5ff' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#5b21b6' }}>Navigation Framework</p>
            <h2 className="text-lg font-extrabold mb-3" style={{ color: '#4c1d95' }}>The DADGAD Pair System</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              DADGAD string intervals are not uniform (P5-P4-P4-M2-P4 from string 6 to 1), so the segment cycle breaks at three distinct crossings rather than just one (as in Standard). The Pair System gives these crossings names and reveals the hidden symmetry: three string families, each sharing the same open-string pitch class.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { pair: 'Bass pair', strings: 'Strings 6–5', interval: 'D→A · P5 (7 st)', note: 'Unique crossing — Bass pair needs its own scale pattern, distinct from the P4 pairs.', color: '#1a5a8a', bg: '#eff6ff' },
                { pair: 'Core pair', strings: 'Strings 4–3', interval: 'D→G · P4 (5 st)', note: 'Standard crossing — segment cycle runs normally across this pair.', color: '#1E8449', bg: '#f0fdf4' },
                { pair: 'Treble pair', strings: 'Strings 2–1', interval: 'A→D · P4 (5 st)', note: 'Standard crossing — segment cycle runs normally across this pair.', color: '#5b21b6', bg: '#faf5ff' },
              ].map(p => (
                <div key={p.pair} className="rounded-xl border p-4" style={{ background: p.bg, borderColor: p.color + '33' }}>
                  <p className="font-bold text-xs mb-0.5" style={{ color: p.color }}>{p.pair}</p>
                  <p className="text-xs font-semibold text-slate-700 mb-0.5">{p.strings} — {p.interval}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.note}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 p-4" style={{ background: '#f8fafc' }}>
              <p className="font-bold text-xs text-slate-700 mb-2">String Families</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div>
                  <span className="font-semibold text-slate-800">D-family — </span>
                  <span className="text-slate-500">Strings 6, 4, 1 (all open D). Same scale pattern on each string.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">A-family — </span>
                  <span className="text-slate-500">Strings 5, 2 (both open A). Same scale pattern on each string.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">G-singleton — </span>
                  <span className="text-slate-500">String 3 (open G). One-note bridge between Core and Treble pairs.</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">D Dorian ascending: <span className="font-mono font-bold text-slate-700">4-3-4-1-3-1</span> notes per string (D-family · A-family · D-family · G-singleton · A-family · D-family arrival).</p>
            </div>
          </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section id="string-map" title="DADGAD String Map">
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            DADGAD is a Dsus2 open tuning. Strings 6, 2, and 1 are each lowered
            2 semitones from Standard (E→D, B→A, e→d). This creates two
            non-standard string crossings that affect all positional shapes.
          </p>

          {/* SVG String Map */}
          <div
            className="rounded-2xl border p-6 mb-6"
            style={{ background: '#1e293b', borderColor: '#334155' }}
          >
            <svg viewBox="0 0 580 220" className="w-full" aria-label="DADGAD string map">
              <defs>
                <marker id="arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <polygon points="0 0, 7 2.5, 0 5" fill="#64748b" />
                </marker>
              </defs>

              {/* Column positions */}
              {/* String cols: 6→1 at x = 60,140,220,300,380,460 */}
              {/* Gap labels at midpoints */}

              {/* String number row */}
              {['6','5','4','3','2','1'].map((n, i) => (
                <text key={n} x={60 + i * 80} y={22} textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="monospace">str {n}</text>
              ))}

              {/* Open note circles */}
              {[
                { note: 'D', role: 'Root',    color: '#10b981' },
                { note: 'A', role: 'Fifth',   color: '#8b5cf6' },
                { note: 'D', role: 'Root',    color: '#10b981' },
                { note: 'G', role: 'neutral', color: '#64748b' },
                { note: 'A', role: 'Fifth',   color: '#8b5cf6' },
                { note: 'D', role: 'Root',    color: '#10b981' },
              ].map((s, i) => (
                <g key={i}>
                  <circle cx={60 + i * 80} cy={62} r={22} fill={s.color} fillOpacity="0.15" stroke={s.color} strokeWidth="1.5" />
                  <text x={60 + i * 80} y={57} textAnchor="middle" fontSize="18" fontWeight="800" fill={s.color} fontFamily="monospace">{s.note}</text>
                  <text x={60 + i * 80} y={75} textAnchor="middle" fontSize="8" fill={s.color} fontFamily="sans-serif">{s.role}</text>
                </g>
              ))}

              {/* Interval arrows between adjacent strings */}
              {[
                { label: '7 sem', sub: 'P5', color: '#f97316', unusual: true },
                { label: '5 sem', sub: 'P4', color: '#64748b', unusual: false },
                { label: '5 sem', sub: 'P4', color: '#64748b', unusual: false },
                { label: '2 sem', sub: 'M2', color: '#f97316', unusual: true },
                { label: '5 sem', sub: 'P4', color: '#64748b', unusual: false },
              ].map((gap, i) => {
                const x1 = 60 + i * 80 + 26
                const x2 = 60 + (i + 1) * 80 - 26
                const mid = (x1 + x2) / 2
                return (
                  <g key={i}>
                    <line x1={x1} y1={62} x2={x2} y2={62} stroke={gap.color} strokeWidth={gap.unusual ? 2 : 1} markerEnd="url(#arr)" strokeDasharray={gap.unusual ? undefined : '3 2'} />
                    <text x={mid} y={50} textAnchor="middle" fontSize="9" fontWeight={gap.unusual ? '700' : '400'} fill={gap.color} fontFamily="monospace">{gap.label}</text>
                    <text x={mid} y={43} textAnchor="middle" fontSize="8" fill={gap.color} fontFamily="sans-serif">{gap.sub}</text>
                  </g>
                )
              })}

              {/* "Lowered 2 sem" markers for strings 6, 2, 1 */}
              {[0, 4, 5].map(i => (
                <g key={i}>
                  <text x={60 + i * 80} y={106} textAnchor="middle" fontSize="8" fill="#f97316" fontFamily="sans-serif">↓2 from std</text>
                </g>
              ))}

              {/* Legend */}
              <circle cx={60} cy={145} r={7} fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
              <text x={72} y={149} fontSize="10" fill="#10b981" fontFamily="sans-serif">Root (D) — strings 6, 4, 1</text>

              <circle cx={60} cy={165} r={7} fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="1.5" />
              <text x={72} y={169} fontSize="10" fill="#8b5cf6" fontFamily="sans-serif">Fifth (A) — strings 5, 2</text>

              <circle cx={60} cy={185} r={7} fill="#64748b" fillOpacity="0.2" stroke="#64748b" strokeWidth="1.5" />
              <text x={72} y={189} fontSize="10" fill="#64748b" fontFamily="sans-serif">Neutral (G) — string 3</text>

              <line x1={300} y1={138} x2={320} y2={138} stroke="#f97316" strokeWidth="2" />
              <text x={326} y={142} fontSize="10" fill="#f97316" fontFamily="sans-serif">Unusual crossing (correction required)</text>

              <line x1={300} y1={158} x2={320} y2={158} stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
              <text x={326} y={162} fontSize="10" fill="#64748b" fontFamily="sans-serif">Standard P4 crossing</text>
            </svg>
          </div>

          {/* Summary table */}
          <div
            className="rounded-xl border overflow-hidden text-sm"
            style={{ borderColor: '#334155' }}
          >
            <div className="grid grid-cols-5 text-xs font-bold uppercase tracking-wider px-4 py-2" style={{ background: '#1e293b', color: '#64748b' }}>
              <span>Strings</span><span>Interval</span><span>Semitones</span><span>vs Standard</span><span>Correction</span>
            </div>
            {[
              ['6 → 5', 'P5', '7',  'Standard is P4 (5)', 'Start 2 frets LOWER', true],
              ['5 → 4', 'P4', '5',  'Same as standard',   'None', false],
              ['4 → 3', 'P4', '5',  'Same as standard',   'None', false],
              ['3 → 2', 'M2', '2',  'Standard is P4 (5)', 'Start 3 frets HIGHER', true],
              ['2 → 1', 'P4', '5',  'Standard B→M3 (4)',  'None (vs std M3: +1)', false],
            ].map(([strings, interval, semi, vs, correction, unusual], i) => (
              <div
                key={i}
                className="grid grid-cols-5 px-4 py-2.5 text-xs border-t"
                style={{ borderColor: '#1e293b', background: i % 2 ? '#0f172a' : '#131c2e' }}
              >
                <span className="font-mono font-bold text-white">{String(strings)}</span>
                <span className={unusual ? 'font-bold' : ''} style={{ color: unusual ? '#f97316' : '#94a3b8' }}>{String(interval)}</span>
                <span style={{ color: '#94a3b8' }}>{String(semi)}</span>
                <span className="text-slate-500 text-xs">{String(vs)}</span>
                <span className={unusual ? 'font-semibold' : 'text-slate-500'} style={{ color: unusual ? '#f97316' : undefined }}>{String(correction)}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section id="diatonic-cycle" title="Diatonic Cycle in DADGAD">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            On equal-interval strings the diatonic cycle runs:
            <span className="font-mono font-bold ml-2 text-emerald-400">L1–L2–L3</span>
            <span className="mx-2 text-orange-400 font-bold">↑1 fret</span>
            <span className="font-mono font-bold text-violet-400">P1–P2–M1–M2</span>
            (repeating). The <span className="text-orange-400 font-semibold">↑</span> is a
            one-fret shift UP at the L→P seam (Phrygian shift). In DADGAD, two
            non-standard crossings add positional corrections on top of this.
          </p>

          {/* Crossing correction callouts */}
          <div className="space-y-3 mb-6">
            <div
              className="rounded-xl border-l-4 px-5 py-4 text-sm"
              style={{ background: '#1e293b', borderColor: '#f97316' }}
            >
              <p className="font-bold text-orange-400 text-xs uppercase tracking-wider mb-1">Crossing 6 → 5 (P5, +7 sem)</p>
              <p className="text-slate-300 leading-relaxed">
                A P5 is 2 semitones <em>wider</em> than P4. When moving to the next string
                up, start the new shape <strong className="text-orange-300">2 frets LOWER</strong> than
                a P4 crossing would place it.
              </p>
            </div>
            <div
              className="rounded-xl border-l-4 px-5 py-4 text-sm"
              style={{ background: '#1e293b', borderColor: '#f97316' }}
            >
              <p className="font-bold text-orange-400 text-xs uppercase tracking-wider mb-1">Crossing 3 → 2 (M2, +2 sem)</p>
              <p className="text-slate-300 leading-relaxed">
                A M2 is 3 semitones <em>narrower</em> than P4. When moving to the next string
                up, start the new shape <strong className="text-orange-300">3 frets HIGHER</strong> than
                a P4 crossing would place it.
              </p>
            </div>
          </div>

          {/* Mode entry table */}
          <div
            className="rounded-2xl border overflow-hidden mb-6"
            style={{ background: '#1e293b', borderColor: '#334155' }}
          >
            <div className="px-5 py-3 border-b" style={{ borderColor: '#334155', background: '#162032' }}>
              <p className="text-sm font-bold text-white">Mode Entry Points — Diatonic Cycle</p>
              <p className="text-xs text-slate-400 mt-0.5">Which cycle position holds the mode root (in D)</p>
            </div>

            {/* Cycle sequence visual */}
            <div className="px-5 py-4 border-b" style={{ borderColor: '#334155' }}>
              <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
                {[
                  { pos: 'L1', mode: 'Mixolydian', color: '#a78bfa' },
                  { pos: 'L2', mode: 'Ionian',     color: '#10b981', home: true },
                  { pos: 'L3', mode: 'Lydian',      color: '#a78bfa' },
                ].map(({ pos, mode, color, home }) => (
                  <span
                    key={pos}
                    className="rounded px-2 py-1 text-xs font-bold"
                    style={{ background: home ? '#065f46' : '#1e3a5f', color: home ? '#34d399' : color }}
                  >
                    {pos} = {mode}{home ? ' ★' : ''}
                  </span>
                ))}
                <span className="text-orange-400 font-bold px-1">↑+1</span>
                {[
                  { pos: 'P1', mode: 'Locrian',  color: '#f87171' },
                  { pos: 'P2', mode: 'Phrygian', color: '#fb923c' },
                  { pos: 'M1', mode: 'Aeolian',  color: '#60a5fa' },
                  { pos: 'M2', mode: 'Dorian',   color: '#a78bfa' },
                ].map(({ pos, mode, color }) => (
                  <span
                    key={pos}
                    className="rounded px-2 py-1 text-xs font-bold"
                    style={{ background: '#1e293b', color, border: '1px solid #334155' }}
                  >
                    {pos} = {mode}
                  </span>
                ))}
              </div>
              <p className="text-xs text-emerald-400 mt-3">
                <span className="font-bold">★ D is the natural home key of DADGAD.</span>{' '}
                Strings 6, 4, 2, 1 all carry D or A (root / fifth). Ionian (major) enters at
                L2 — so on string 6 open (D, the root) you are already at the L2 position of
                the cycle. No positional shift needed to start in D major.
              </p>
            </div>

            {/* String-by-string correction table */}
            <div className="px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">String crossing corrections (applied on top of Phrygian shift)</p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="font-mono w-16 text-orange-400 font-bold shrink-0">6 → 5</span>
                  <span>Shift DOWN 2 frets (P5 is 2 wider than P4)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono w-16 text-slate-400 shrink-0">5 → 4</span>
                  <span>No correction (P4 = standard)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono w-16 text-slate-400 shrink-0">4 → 3</span>
                  <span>No correction (P4 = standard)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono w-16 text-orange-400 font-bold shrink-0">3 → 2</span>
                  <span>Shift UP 3 frets (M2 is 3 narrower than P4)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono w-16 text-slate-400 shrink-0">2 → 1</span>
                  <span>No correction (P4 = standard, unlike std tuning M3)</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section id="pentatonic-cycle" title="Pentatonic Cycle in DADGAD">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            The pentatonic cycle uses two shapes: <span className="font-mono font-bold text-violet-400">S = 0-2</span> (whole step, 2 notes)
            and <span className="font-mono font-bold text-emerald-400">L = 0-3</span> (minor third, 2 notes). The cycle runs:
          </p>

          <div
            className="rounded-xl border px-5 py-4 mb-6 text-center"
            style={{ background: '#1e293b', borderColor: '#334155' }}
          >
            <p className="font-mono text-base font-bold tracking-wide">
              <span className="text-violet-400">S1 — S2 — S3</span>
              <span className="text-orange-400 mx-3">↓ –1 fret</span>
              <span className="text-emerald-400">L1 — L2</span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              The <span className="text-orange-400 font-semibold">↓</span> is a one-fret shift
              <strong className="text-orange-300"> BACK</strong> at the S→L seam. Opposite direction from the diatonic shift.
            </p>
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <span className="font-mono font-bold text-violet-400 text-sm">S3</span>
                <p className="text-xs text-slate-400 mt-1">Major pentatonic</p>
              </div>
              <div className="text-center">
                <span className="font-mono font-bold text-emerald-400 text-sm">L2</span>
                <p className="text-xs text-slate-400 mt-1">Minor pentatonic</p>
              </div>
            </div>
          </div>

          {/* DADGAD corrections same as diatonic */}
          <div className="space-y-3 mb-6">
            <div
              className="rounded-xl border-l-4 px-5 py-3 text-sm"
              style={{ background: '#1e293b', borderColor: '#f97316' }}
            >
              <p className="font-bold text-orange-400 text-xs uppercase tracking-wider mb-1">Crossing 6 → 5 (P5)</p>
              <p className="text-slate-300">Start next pentatonic shape <strong className="text-orange-300">2 frets LOWER</strong>.</p>
            </div>
            <div
              className="rounded-xl border-l-4 px-5 py-3 text-sm"
              style={{ background: '#1e293b', borderColor: '#f97316' }}
            >
              <p className="font-bold text-orange-400 text-xs uppercase tracking-wider mb-1">Crossing 3 → 2 (M2)</p>
              <p className="text-slate-300">Start next pentatonic shape <strong className="text-orange-300">3 frets HIGHER</strong>.</p>
            </div>
          </div>

          {/* D pentatonic info */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: '#1e293b', borderColor: '#334155' }}
          >
            <div className="px-5 py-3 border-b" style={{ borderColor: '#334155', background: '#162032' }}>
              <p className="text-sm font-bold text-white">D Pentatonic in DADGAD</p>
            </div>
            <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="font-bold text-emerald-400 mb-1 text-xs uppercase tracking-wider">D Major Pentatonic</p>
                <p className="font-mono text-white mb-2">D — E — F# — A — B</p>
                <p className="text-xs text-slate-400">
                  Enters at <span className="font-mono text-violet-400">S3</span> of the cycle.
                  Open strings D (str 6, 4, 1) and A (str 5, 2) are already in the scale —
                  giving you 5 open-string scale tones with no fretting.
                </p>
              </div>
              <div>
                <p className="font-bold text-violet-400 mb-1 text-xs uppercase tracking-wider">D Minor Pentatonic</p>
                <p className="font-mono text-white mb-2">D — F — G — A — C</p>
                <p className="text-xs text-slate-400">
                  Enters at <span className="font-mono text-emerald-400">L2</span> of the cycle.
                  Relative to D major pentatonic, this is the same set of 5 shapes shifted by
                  3 semitones (enharmonic with F# minor pentatonic: F#–A–B–C#–E).
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section id="closed-triads" title="Closed Triads by String Group">
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            D major and D minor closed triads in all 3 inversions across the 4 adjacent string groups.
            Diagrams show actual fret numbers; position marker shown when above fret 0.
          </p>

          {/* Dot color legend */}
          <div className="flex flex-wrap gap-4 text-xs mb-8">
            {[
              { color: '#10b981', label: 'Root (R)' },
              { color: '#f59e0b', label: 'Third (3 / b3)' },
              { color: '#8b5cf6', label: 'Fifth (5)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-slate-400">{label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: '#10b981', background: 'transparent' }} />
              <span className="text-slate-400">Open string (circle = no fret press)</span>
            </div>
          </div>

          <div className="space-y-12">
            {stringGroups.map(group => (
              <div
                key={group.id}
                className="rounded-2xl border overflow-hidden"
                style={{ background: '#1e293b', borderColor: '#334155' }}
              >
                {/* Group header */}
                <div
                  className="px-5 py-4 border-b"
                  style={{ background: '#0f172a', borderColor: '#334155' }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-lg font-extrabold text-white font-mono">
                      Strings {group.strings}
                    </h3>
                    <span className="text-base font-bold" style={{ color: '#a78bfa' }}>
                      {group.notes}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: group.intervalNote?.includes('unusual') ? '#f97316' : '#64748b' }}
                    >
                      {group.intervals}
                    </span>
                  </div>
                  {group.intervalNote && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: group.intervalNote.includes('unusual') ? '#fb923c' : '#64748b' }}
                    >
                      {group.intervalNote}
                    </p>
                  )}
                </div>

                {/* Major / Minor columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: '#334155' }}>
                  {[
                    { label: 'D Major', shapes: group.major, accent: '#10b981' },
                    { label: 'D Minor', shapes: group.minor, accent: '#8b5cf6' },
                  ].map(({ label, shapes, accent }) => (
                    <div key={label} className="px-5 py-5">
                      <p className="text-sm font-extrabold mb-4" style={{ color: accent }}>
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {shapes.map(shape => (
                          <div
                            key={shape.label}
                            className="rounded-xl p-3 flex flex-col items-center"
                            style={{ background: '#0a0f1e', minWidth: 110 }}
                          >
                            <p className="text-xs text-slate-400 mb-2 text-center leading-tight">{shape.label}</p>
                            <ChordBox shape={shape} />
                            <p className="text-xs font-mono mt-2 text-center" style={{ color: '#94a3b8' }}>
                              {shape.noteLabel}
                            </p>
                            {shape.openNote && (
                              <p className="text-xs mt-1" style={{ color: '#fbbf24' }}>
                                ★ {shape.openNote}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div
            className="rounded-xl border mt-10 px-5 py-4 text-xs leading-relaxed"
            style={{ background: '#1e293b', borderColor: '#334155', color: '#94a3b8' }}
          >
            <strong className="text-slate-300">Transposing these shapes:</strong> All shapes shown
            in D. To transpose to another root, shift all fret numbers up or down by the
            corresponding semitone distance. Note: fret 0 = open string — open strings
            cannot be shifted without retuning. Shapes marked <span style={{ color: '#fbbf24' }}>★ open strings</span> require
            retuning or a different voicing when transposing.
          </div>
        </Section>

        {/* ── Bottom nav ───────────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row gap-4 pt-8 border-t"
          style={{ borderColor: '#1e293b' }}
        >
          <Link
            href="/musical-universe"
            className="text-sm transition-colors hover:underline"
            style={{ color: '#64748b' }}
          >
            ← Back to Musical Universe
          </Link>
          <div className="sm:ml-auto flex items-center gap-3">
            <span className="text-sm text-slate-600">Standard Guide</span>
            <span
              className="text-xs rounded-full px-3 py-1 font-semibold"
              style={{ background: '#1e293b', color: '#475569' }}
            >
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
