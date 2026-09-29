import Link from 'next/link'

const DAYS = [
  { n: 1,  title: 'The New Lens' },
  { n: 2,  title: 'Orbit Call on C Major' },
  { n: 3,  title: 'Root Orbit, All String Sets' },
  { n: 4,  title: 'Third Orbit, All String Sets' },
  { n: 5,  title: 'Fifth Orbit, All String Sets' },
  { n: 6,  title: 'Random Orbit Call' },
  { n: 7,  title: 'Week 1 Check-In' },
  { n: 8,  title: 'Segment L in Scale Runs' },
  { n: 9,  title: 'Segment M in Minor Patterns' },
  { n: 10, title: 'Segments P & S' },
  { n: 11, title: 'Segment Chain Reading' },
  { n: 12, title: 'Orbit + Segment Together' },
  { n: 13, title: 'The Parallel Check' },
  { n: 14, title: 'Sprint Gate' },
]

const WEEK_1 = DAYS.slice(0, 7)
const WEEK_2 = DAYS.slice(7)

const GATE_ITEMS = [
  'Given any note name, can state all 3 Orbit identities (Root/Third/Fifth) in a given key in under 5 seconds',
  'Can play a 4-bar phrase and name each note\'s Orbit as you go without stopping',
  'Can identify L, M, P, S segments by ear after playing them',
  'Can describe any 5-note scale run as a segment chain',
]

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
      <Link href="/musical-universe/practice/standard" className="hover:text-indigo-300 transition-colors">
        Standard Path
      </Link>
      <span className="text-slate-600">/</span>
      <span className="text-indigo-300">Sprint 1</span>
    </nav>
  )
}

function DayCard({ n, title }: { n: number; title: string }) {
  const isCheckIn = n === 7
  const isGate = n === 14
  const accent = isGate
    ? 'border-indigo-500 bg-indigo-950'
    : isCheckIn
    ? 'border-slate-600 bg-slate-800'
    : 'border-slate-700 bg-slate-800 hover:border-indigo-500'

  return (
    <Link
      href={`/musical-universe/practice/standard/sprint-1/day/${n}`}
      className={`group flex items-start gap-3 rounded-xl border p-4 transition-colors ${accent}`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm ${
          isGate
            ? 'bg-indigo-600 text-white'
            : isCheckIn
            ? 'bg-slate-600 text-slate-300'
            : 'bg-slate-700 text-indigo-300 group-hover:bg-indigo-900'
        }`}
      >
        {n}
      </div>
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold leading-snug ${
            isGate ? 'text-indigo-200' : 'text-slate-200'
          }`}
        >
          {title}
        </p>
        {isCheckIn && (
          <p className="text-xs text-slate-500 mt-0.5">Week 1 review</p>
        )}
        {isGate && (
          <p className="text-xs text-indigo-400 mt-0.5">Readiness assessment</p>
        )}
      </div>
    </Link>
  )
}

export default function Sprint1Page() {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="px-4 sm:px-6 pt-10 pb-8 border-b border-slate-800">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: '#312e81', color: '#a5b4fc' }}
            >
              Sprint 1
            </span>
            <span className="text-xs font-semibold text-slate-500">14 days · ~30 min/day</span>
          </div>

          <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Naming What You Know
          </h1>

          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mb-6">
            Apply Musical Universe vocabulary to your existing fluency. By the end of this sprint
            you can name Root, Third, and Fifth Orbit instantly for any note in a triad, and name
            all 4 segment types in scale runs you already play.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
              14 days
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              ~30 min/day
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Standard Tuning
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Key Framing */}
        <section>
          <div
            className="rounded-2xl border border-indigo-800 p-6"
            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #1e1e2e 100%)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">
              What this sprint actually is
            </p>
            <p className="text-slate-200 text-sm leading-relaxed mb-3">
              You already know this Galaxy physically. The scales, the patterns, the shapes — your
              hands know where to go.
            </p>
            <p className="text-slate-200 text-sm leading-relaxed mb-3">
              This sprint is <strong className="text-indigo-300">not about playing new things</strong>.
              It is about naming what you already do in the Musical Universe language.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              That naming — fast, automatic, reliable — is the skill being built. You are installing
              a vocabulary onto an existing physical library. When the naming becomes instant, your
              ear and your hands start talking to each other in the same language.
            </p>
          </div>
        </section>

        {/* Week 1 Calendar */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-extrabold">Week 1 — Orbit Naming</h2>
            <span className="text-xs text-slate-500 font-mono">Days 1–7</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WEEK_1.map(d => (
              <DayCard key={d.n} n={d.n} title={d.title} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,#4f46e5,transparent)' }} />

        {/* Week 2 Calendar */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-extrabold">Week 2 — Segment Naming</h2>
            <span className="text-xs text-slate-500 font-mono">Days 8–14</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WEEK_2.map(d => (
              <DayCard key={d.n} n={d.n} title={d.title} />
            ))}
          </div>
        </section>

        {/* Readiness Gate */}
        <section>
          <div className="rounded-2xl border border-indigo-700 overflow-hidden">
            <div
              className="px-6 py-4 border-b border-indigo-800"
              style={{ background: '#1e1b4b' }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                Sprint Readiness Gate
              </p>
              <p className="text-sm text-indigo-200 font-semibold">
                You are ready for Sprint 2 when all four are true:
              </p>
            </div>
            <div className="px-6 py-5 space-y-4" style={{ background: '#1a1a2e' }}>
              {GATE_ITEMS.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="shrink-0 w-5 h-5 rounded-md border-2 border-indigo-600 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div
              className="px-6 py-3 border-t border-indigo-900 text-xs text-indigo-400"
              style={{ background: '#1e1b4b' }}
            >
              Day 14 walks you through each check. Do not advance until all four are solid.
            </div>
          </div>
        </section>

        {/* Cross-link to Learn */}
        <section>
          <div
            className="rounded-xl border border-slate-700 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: '#1e293b' }}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-200 mb-1">
                Review Orbit System and Segment Types on the Learn page
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                The definitions you need for this sprint — Root/Third/Fifth Orbit, and Segments L, M, P, S — are all documented on the Learn page with examples.
              </p>
            </div>
            <Link
              href="/musical-universe/learn"
              className="shrink-0 text-xs font-bold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-80 whitespace-nowrap"
              style={{ background: '#4f46e5', color: '#fff' }}
            >
              Go to Learn page →
            </Link>
          </div>
        </section>

        {/* Nav */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800">
          <Link
            href="/musical-universe/practice/standard"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Standard Path
          </Link>
          <Link
            href="/musical-universe/practice/standard/sprint-1/day/1"
            className="sm:ml-auto text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-80"
            style={{ background: '#4f46e5' }}
          >
            Start Day 1 →
          </Link>
        </div>

      </div>
    </div>
  )
}
