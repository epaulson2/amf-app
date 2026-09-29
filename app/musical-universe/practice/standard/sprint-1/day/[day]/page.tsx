import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DAYS, type DayContent } from '../../content'

// ── Static params ──────────────────────────────────────────────────────────
export function generateStaticParams() {
  return DAYS.map((d) => ({ day: String(d.day) }))
}

// ── Small layout primitives ────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
      {children}
    </p>
  )
}

function Block({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-700 p-5 space-y-3 ${className}`}
      style={{ background: '#1e293b' }}
    >
      <SectionLabel>{label}</SectionLabel>
      {children}
    </section>
  )
}

function DrillItem({ text, index }: { text: string; index: number }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-indigo-900/60 border border-indigo-700 flex items-center justify-center text-xs font-bold text-indigo-300">
        {index + 1}
      </span>
      <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
    </div>
  )
}

// ── Page component ─────────────────────────────────────────────────────────

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params
  const dayNum = parseInt(day, 10)
  const data: DayContent | undefined = DAYS.find((d) => d.day === dayNum)

  if (!data) {
    notFound()
  }

  const prevDay = dayNum > 1 ? dayNum - 1 : null
  const nextDay = dayNum < 14 ? dayNum + 1 : null
  const prevData = prevDay ? DAYS.find((d) => d.day === prevDay) : null
  const isGate = dayNum === 14

  // Warmup is always the first drill item; main practice is the rest
  const warmupDrills = data.drills.slice(0, 1)
  const mainDrills = data.drills.slice(1)

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>

      {/* ── Hero header ── */}
      <div
        className="px-4 sm:px-6 pt-10 pb-8 border-b border-slate-800"
        style={{
          background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link
              href="/musical-universe/practice/standard"
              className="hover:text-indigo-300 transition-colors"
            >
              Standard Path
            </Link>
            <span>/</span>
            <Link
              href="/musical-universe/practice/standard/sprint-1"
              className="hover:text-indigo-300 transition-colors"
            >
              Sprint 1
            </Link>
            <span>/</span>
            <span className="text-slate-300">Day {dayNum}</span>
          </nav>

          {/* Day badge + title */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: '#312e81', color: '#a5b4fc', border: '1px solid #4338ca' }}
            >
              Day {dayNum}
            </span>
            <span className="text-xs font-semibold text-slate-500">{data.duration}</span>
            {isGate && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 uppercase tracking-wider">
                Sprint Gate
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {data.title}
          </h1>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* Concept callout */}
        <div
          className="rounded-2xl border-l-4 border-indigo-500 p-5"
          style={{ background: '#1e1b4b', borderColor: 'oklch(0.55 0.22 264)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Today's concept
          </p>
          <p className="text-slate-200 text-sm leading-relaxed">{data.concept}</p>
          <Link
            href={data.learnHref}
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-indigo-300 hover:text-indigo-100 transition-colors"
          >
            Learn page reference →
          </Link>
        </div>

        {/* Recap (days 2+) */}
        {prevData && (
          <div
            className="rounded-xl border border-slate-700 px-4 py-3 flex items-start gap-3"
            style={{ background: '#1a1a2e' }}
          >
            <span className="text-indigo-500 text-lg shrink-0 mt-0.5">↩</span>
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-0.5">
                Day {prevDay} recap — {prevData.title}
              </p>
              {prevData.exitCheck ? (
                <p className="text-xs text-slate-500 leading-relaxed">{prevData.exitCheck}</p>
              ) : (
                <p className="text-xs text-slate-500 leading-relaxed">
                  {prevData.drills[prevData.drills.length - 1]}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Warmup */}
        <Block label="Warmup">
          {warmupDrills.map((drill, i) => (
            <DrillItem key={i} text={drill} index={i} />
          ))}
        </Block>

        {/* Main practice */}
        {mainDrills.length > 0 && (
          <Block label="Main practice">
            {mainDrills.map((drill, i) => (
              <DrillItem key={i} text={drill} index={i} />
            ))}
          </Block>
        )}

        {/* Integration (day 1 only) */}
        {data.integration && (
          <Block label="Integration">
            <p className="text-sm text-slate-300 leading-relaxed">{data.integration}</p>
          </Block>
        )}

        {/* Exit check */}
        {data.exitCheck && !isGate && (
          <div
            className="rounded-xl border border-indigo-800 p-4 flex gap-3 items-start"
            style={{ background: '#1e1b4b' }}
          >
            <span className="text-indigo-400 text-base shrink-0 mt-0.5">◈</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                Exit check
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">{data.exitCheck}</p>
            </div>
          </div>
        )}

        {/* Sprint Gate section (day 14 only) */}
        {isGate && data.readinessGate && (
          <div className="rounded-2xl border-2 border-emerald-700 overflow-hidden">
            <div
              className="px-6 py-4 border-b border-emerald-800"
              style={{ background: '#052e16' }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Readiness Gate — All 4 must pass
              </p>
              <p className="text-sm font-semibold text-emerald-200">
                You advance to Sprint 2 when all four are solid
              </p>
            </div>

            <div className="px-6 py-5 space-y-4" style={{ background: '#0a1a0e' }}>
              {data.readinessGate.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="shrink-0 w-5 h-5 rounded-md border-2 border-emerald-600 mt-0.5" />
                  <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div
              className="px-6 py-3 border-t border-emerald-900 text-xs text-emerald-400 leading-relaxed"
              style={{ background: '#052e16' }}
            >
              {data.exitCheck}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 mt-2 border-t border-slate-800"
        >
          {prevDay ? (
            <Link
              href={`/musical-universe/practice/standard/sprint-1/day/${prevDay}`}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Day {prevDay}
            </Link>
          ) : (
            <Link
              href="/musical-universe/practice/standard/sprint-1"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              ← Sprint 1 overview
            </Link>
          )}

          {nextDay ? (
            <Link
              href={`/musical-universe/practice/standard/sprint-1/day/${nextDay}`}
              className="sm:ml-auto text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-80"
              style={{ background: '#4f46e5' }}
            >
              Day {nextDay} →
            </Link>
          ) : (
            <Link
              href="/musical-universe/practice/standard/sprint-1"
              className="sm:ml-auto text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-80"
              style={{ background: '#065f46' }}
            >
              Complete — Sprint 1 overview →
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
