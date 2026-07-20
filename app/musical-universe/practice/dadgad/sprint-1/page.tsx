import Link from 'next/link'

const VIOLET = 'oklch(0.65 0.18 280)'

const days: { day: number; title: string }[] = [
  { day: 1,  title: 'Your New Strings' },
  { day: 2,  title: 'Root Everywhere' },
  { day: 3,  title: 'Fifth Everywhere' },
  { day: 4,  title: 'Fourth Everywhere' },
  { day: 5,  title: 'Three Anchors' },
  { day: 6,  title: 'The Open Sound' },
  { day: 7,  title: 'Week 1 Check-In' },
  { day: 8,  title: 'G-Singleton (String 3)' },
  { day: 9,  title: 'D-Family (Strings 1 & 6)' },
  { day: 10, title: 'Segment L' },
  { day: 11, title: 'Segment M' },
  { day: 12, title: 'Segments P & S' },
  { day: 13, title: 'Name As You Play' },
  { day: 14, title: 'Sprint Gate' },
]

const gateItems: string[] = [
  'Can name any note on any string in DADGAD within 3 seconds',
  'Can find degree 1 (D), 4 (G), and 5 (A) on any string in the first 7 frets within 5 seconds',
  'Can play D major scale on strings 1, 3, and 6 without stopping',
  'Can identify segment type (L / M / P / S) when playing a 3-note pattern',
]

function DayCard({ day, title }: { day: number; title: string }) {
  const isCheckIn = day === 7
  const isGate = day === 14
  const accentBorder = isGate
    ? 'border-emerald-500'
    : isCheckIn
    ? 'border-violet-400'
    : 'border-[#1e2a45]'
  const accentBg = isGate
    ? 'bg-emerald-950/60'
    : isCheckIn
    ? 'bg-violet-950/60'
    : 'bg-[#0f1829]'

  return (
    <Link
      href={`/musical-universe/practice/dadgad/sprint-1/day/${day}`}
      className={`group flex flex-col rounded-xl border ${accentBorder} ${accentBg} p-3.5 hover:border-violet-500 hover:bg-[#121e38] transition-all duration-150`}
    >
      <span
        className="text-xs font-bold mb-1"
        style={{ color: isGate ? '#34d399' : isCheckIn ? VIOLET : '#94a3b8' }}
      >
        Day {day}
      </span>
      <span className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
        {title}
      </span>
    </Link>
  )
}

export default function Sprint1Page() {
  const week1 = days.slice(0, 7)
  const week2 = days.slice(7, 14)

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>

      {/* ── Hero ── */}
      <div
        className="px-4 sm:px-6 pt-12 pb-10"
        style={{
          background:
            'linear-gradient(160deg,#0d1426 0%,#111828 60%,#0f0d1f 100%)',
          borderBottom: '1px solid #1a2340',
        }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link
              href="/musical-universe/practice/dadgad"
              className="hover:text-slate-300 transition-colors"
            >
              DADGAD Path
            </Link>
            <span>/</span>
            <span className="text-slate-300 font-medium">Sprint 1</span>
          </nav>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: '#1e1040', color: VIOLET, border: `1px solid ${VIOLET}` }}
            >
              DADGAD
            </span>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#0f1829] text-slate-400 border border-[#1e2a45]">
              Sprint 1 of 4
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            The New Galaxy
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
            Physical orientation in DADGAD. By the end of this sprint you can find any note on any
            string, play a D major scale in two positions, and name degree 1 / 4 / 5 anywhere in
            the first 7 frets without thinking.
          </p>

          {/* Timeline pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0f1829] text-slate-300 border border-[#1e2a45]">
              <span style={{ color: VIOLET }}>◈</span> 14 days
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0f1829] text-slate-300 border border-[#1e2a45]">
              <span style={{ color: VIOLET }}>◈</span> ~35 min / day
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0f1829] text-slate-300 border border-[#1e2a45]">
              <span style={{ color: VIOLET }}>◈</span> Physical orientation only
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* ── What this sprint is NOT ── */}
        <section>
          <div
            className="rounded-xl border p-5"
            style={{ background: '#0d1426', borderColor: '#1e2a45' }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: VIOLET }}
            >
              What this sprint is NOT
            </p>
            <div className="space-y-2">
              {[
                'Not music theory — your theory is already intact and fully applies here.',
                'Not chord shapes — those come in later sprints.',
                'Not a transfer from Standard tuning — treat DADGAD as a new Galaxy with its own geometry, not a dialect of Standard.',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start text-sm text-slate-400">
                  <span className="text-red-400 shrink-0 mt-0.5 font-bold">✕</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-300 mt-4 pt-4 border-t border-[#1e2a45]">
              This sprint is purely the{' '}
              <span className="font-semibold text-white">physical geography</span> of a new Galaxy:
              where the notes live, how the open strings feel, and how to navigate degree landmarks
              without counting from a Standard mental map.
            </p>
          </div>
        </section>

        {/* ── Before you start callout ── */}
        <section>
          <div
            className="rounded-xl border p-4 flex gap-4 items-start"
            style={{ background: '#0c1220', borderColor: '#312e6a' }}
          >
            <span className="text-lg shrink-0 mt-0.5" style={{ color: VIOLET }}>◈</span>
            <div>
              <p className="text-sm font-semibold text-slate-200 mb-1">
                Before starting Day 1
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Read the{' '}
                <span className="font-semibold text-slate-300">Galaxy</span> and{' '}
                <span className="font-semibold text-slate-300">Zoom Hierarchy</span> sections on
                the Learn page so you understand how the Musical Universe map is structured before
                you build your DADGAD layer of it.
              </p>
              <Link
                href="/musical-universe/learn"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                style={{
                  background: '#1e1040',
                  color: VIOLET,
                  border: `1px solid ${VIOLET}`,
                }}
              >
                Go to the Learn page →
              </Link>
            </div>
          </div>
        </section>

        {/* String Families */}
        <section>
          <div
            className="rounded-xl border p-5"
            style={{ background: '#0d1426', borderColor: '#1e2a45' }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: VIOLET }}
            >
              String Families — The Pair System
            </p>
            <p className="text-sm text-slate-400 mb-4">
              DADGAD has three string pairs with different crossing intervals. Knowing which strings share the same open pitch class simplifies scale navigation: each family uses the same fret pattern.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { family: 'D-family', strings: 'Strings 6, 4, 1', open: 'Open D', desc: 'All three open on D. Same scale pattern on each string. Day 9 works these strings.' },
                { family: 'A-family', strings: 'Strings 5, 2', open: 'Open A', desc: 'Both open on A. Same scale pattern on each string. Days 2–4 anchor work includes these.' },
                { family: 'G-singleton', strings: 'String 3', open: 'Open G', desc: 'The lone G string. One-note bridge between Core and Treble pairs. Day 8 focuses here.' },
              ].map(f => (
                <div key={f.family} className="rounded-lg border border-[#1e2a45] p-3" style={{ background: '#0f1829' }}>
                  <p className="text-xs font-bold mb-0.5" style={{ color: VIOLET }}>{f.family}</p>
                  <p className="text-xs text-slate-400">{f.strings} · {f.open}</p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              D Dorian ascending: <span className="font-mono font-bold text-slate-300">4-3-4-1-3-1</span> notes per string. D-family strings contribute 4 notes each; A-family strings 3 notes each; G-singleton 1 note.
            </p>
          </div>
        </section>

        {/* ── 14-day calendar ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            14-Day Calendar
          </h2>

          {/* Week 1 */}
          <div className="mb-2">
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: VIOLET }}
            >
              Week 1 — Note geography
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {week1.slice(0, 4).map((d) => (
                <DayCard key={d.day} day={d.day} title={d.title} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {week1.slice(4).map((d) => (
                <DayCard key={d.day} day={d.day} title={d.title} />
              ))}
            </div>
          </div>

          {/* Week 2 */}
          <div className="mt-6">
            <p
              className="text-xs font-semibold mb-3"
              style={{ color: VIOLET }}
            >
              Week 2 — Scale positions & segment naming
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {week2.slice(0, 4).map((d) => (
                <DayCard key={d.day} day={d.day} title={d.title} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {week2.slice(4).map((d) => (
                <DayCard key={d.day} day={d.day} title={d.title} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Readiness Gate ── */}
        <section>
          <div
            className="rounded-xl border-2 p-6"
            style={{ background: '#061210', borderColor: '#065f46' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: '#064e3b', color: '#34d399' }}
              >
                S2
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Readiness Gate
                </p>
                <p className="text-xs text-slate-500">Pass all four to advance to Sprint 2</p>
              </div>
            </div>

            <ul className="space-y-3 mb-5">
              {gateItems.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-slate-300">
                  <span className="text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="rounded-lg border p-3 text-xs text-slate-400 leading-relaxed"
              style={{ background: '#0a1a18', borderColor: '#064e3b' }}
            >
              <span className="font-semibold text-slate-300">If not all pass after 14 days:</span>{' '}
              extend by up to 7 additional days and repeat the weak days. After the 7-day extension,
              advance to Sprint 2 regardless — the gap will close through repetition in Sprint 2
              context.
            </div>
          </div>
        </section>

        {/* ── Navigation ── */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 mt-2 border-t"
          style={{ borderColor: '#1e2a45' }}
        >
          <Link
            href="/musical-universe/practice/dadgad"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← DADGAD Path
          </Link>
          <Link
            href="/musical-universe/practice/dadgad/sprint-1/day/1"
            className="sm:ml-auto inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-80"
            style={{ background: VIOLET }}
          >
            Start Day 1 →
          </Link>
        </div>

      </div>
    </div>
  )
}
