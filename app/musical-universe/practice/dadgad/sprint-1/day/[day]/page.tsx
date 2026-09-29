import Link from "next/link";
import { notFound } from "next/navigation";
import { DAYS, DayContent } from "../../content";

export function generateStaticParams() {
  return Array.from({ length: 14 }, (_, i) => ({ day: String(i + 1) }));
}

interface PageProps {
  params: Promise<{ day: string }>;
}

export default async function DadgadDayPage({ params }: PageProps) {
  const { day } = await params;
  const dayNum = parseInt(day, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 14) notFound();

  const data: DayContent | undefined = DAYS.find((d) => d.day === dayNum);
  if (!data) notFound();

  const prevDay = dayNum > 1 ? DAYS.find((d) => d.day === dayNum - 1) : null;
  const nextDay = dayNum < 14 ? DAYS.find((d) => d.day === dayNum + 1) : null;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/musical-universe" className="hover:text-violet-400 transition-colors">
            Musical Universe
          </Link>
          <span>/</span>
          <Link href="/musical-universe/practice/dadgad" className="hover:text-violet-400 transition-colors">
            DADGAD Path
          </Link>
          <span>/</span>
          <Link href="/musical-universe/practice/dadgad/sprint-1" className="hover:text-violet-400 transition-colors">
            Sprint 1
          </Link>
          <span>/</span>
          <span className="text-slate-300">Day {dayNum}</span>
        </nav>

        {/* Day Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-violet-400 bg-violet-400/10 border border-violet-400/30 px-2 py-1 rounded">
              DAY {dayNum} OF 14
            </span>
            <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">
              Sprint 1: The New Galaxy
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">{data.title}</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="font-mono">{data.totalMinutes} min</span>
            <span className="text-slate-600">·</span>
            <span>Total session time</span>
          </div>
        </header>

        {/* Concept Callout */}
        <section className="border border-violet-500/40 bg-violet-500/5 rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">Core Concept</span>
          </div>
          <h2 className="text-lg font-semibold text-violet-100">{data.concept.heading}</h2>
          <p className="text-slate-300 leading-relaxed text-sm">{data.concept.body}</p>
          <Link
            href={data.concept.learnHref}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 hover:text-violet-300 transition-colors mt-1"
          >
            <span>{data.concept.learnLabel}</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Recap */}
        {data.recap && (
          <div className="flex gap-3 items-start bg-slate-900/60 border border-slate-700/50 rounded-lg px-4 py-3">
            <div className="mt-0.5 w-1 h-full min-h-[1rem] bg-slate-600 rounded-full flex-shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-mono text-slate-500 mr-1">Yesterday:</span>
              {data.recap}
            </p>
          </div>
        )}

        {/* Warmup */}
        <section className="bg-slate-900 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">Warmup</h2>
            <span className="font-mono text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
              {data.warmup.duration}
            </span>
          </div>
          <ol className="space-y-2.5">
            {data.warmup.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                <span className="font-mono text-violet-500 flex-shrink-0 w-5 text-right">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Main Practice */}
        <section className="bg-slate-900 border border-violet-500/20 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-white">{data.mainPractice.heading}</h2>
              <p className="font-mono text-xs text-violet-400 uppercase tracking-widest">Main Practice</p>
            </div>
            <span className="font-mono text-xs text-slate-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
              {data.mainPractice.duration}
            </span>
          </div>
          <ol className="space-y-4">
            {data.mainPractice.steps.map((step, i) => (
              <li key={i} className="flex gap-4 leading-relaxed">
                <span className="font-mono text-xs text-violet-400 flex-shrink-0 w-5 text-right mt-0.5 pt-px">
                  {i + 1}.
                </span>
                <p className="text-sm text-slate-200">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Integration */}
        <section className="bg-slate-900 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">Integration</h2>
            <span className="font-mono text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
              {data.integration.duration}
            </span>
          </div>
          <ol className="space-y-2.5">
            {data.integration.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                <span className="font-mono text-violet-500 flex-shrink-0 w-5 text-right">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Exit Check */}
        <section className="space-y-3">
          <h2 className="font-mono text-xs text-slate-500 uppercase tracking-widest">Exit Check</h2>
          <div className="space-y-2">
            {data.exitCheck.map((q, i) => (
              <label
                key={i}
                className="flex items-start gap-3 bg-slate-900/50 rounded-lg px-4 py-3 cursor-default"
              >
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border border-slate-600 bg-slate-800 flex items-center justify-center">
                  <span className="block w-2 h-2 rounded-sm bg-transparent" />
                </span>
                <span className="text-sm text-slate-300 leading-snug">{q}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-slate-600 font-mono pl-1">
            Mark each yes in your practice log — these are not tracked here.
          </p>
        </section>

        {/* Sprint Gate (day 14 only) */}
        {data.readinessGate && (
          <section className="border border-amber-500/40 bg-amber-500/5 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">Sprint 1 Readiness Gate</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear all four criteria to advance to Sprint 2. If you miss one or more, extend Sprint 1 by up to
              7 days focusing specifically on weak areas, then advance regardless. An honest measurement now
              prevents stacking difficulty on a shaky base.
            </p>
            <ul className="space-y-3 mt-2">
              {data.readinessGate.map((criterion, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded border border-amber-500/40 bg-amber-500/10 flex items-center justify-center font-mono text-xs text-amber-400">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-200 leading-snug">{criterion}</span>
                </li>
              ))}
            </ul>
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-lg px-4 py-3 mt-2">
              <p className="text-xs text-slate-400">
                <span className="text-amber-400 font-mono mr-1">Advance:</span>
                All 4 gates cleared — move to Sprint 2.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                <span className="text-slate-400 font-mono mr-1">Extend:</span>
                Miss any gate — note the weak area, drill it for up to 7 additional days, then advance to Sprint 2.
              </p>
            </div>
          </section>
        )}

        {/* Prev / Next Navigation */}
        <nav className="flex items-stretch gap-3 pt-2">
          {/* Prev */}
          {dayNum === 1 ? (
            <Link
              href="/musical-universe/practice/dadgad/sprint-1"
              className="flex-1 flex flex-col gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-4 transition-colors group"
            >
              <span className="font-mono text-xs text-slate-600 group-hover:text-slate-500 transition-colors">
                Back
              </span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                Sprint Overview
              </span>
            </Link>
          ) : prevDay ? (
            <Link
              href={`/musical-universe/practice/dadgad/sprint-1/day/${prevDay.day}`}
              className="flex-1 flex flex-col gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/50 rounded-xl px-4 py-4 transition-colors group"
            >
              <span className="font-mono text-xs text-slate-600 group-hover:text-slate-500 transition-colors">
                Day {prevDay.day}
              </span>
              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                {prevDay.title}
              </span>
            </Link>
          ) : null}

          {/* Next */}
          {dayNum === 14 ? (
            <Link
              href="/musical-universe/practice/dadgad/sprint-2"
              className="flex-1 flex flex-col gap-1 items-end text-right bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/30 rounded-xl px-4 py-4 transition-colors group"
            >
              <span className="font-mono text-xs text-violet-500 group-hover:text-violet-400 transition-colors">
                Next
              </span>
              <span className="text-sm text-violet-200 group-hover:text-white transition-colors">
                {data.nextTitle}
              </span>
            </Link>
          ) : nextDay ? (
            <Link
              href={`/musical-universe/practice/dadgad/sprint-1/day/${nextDay.day}`}
              className="flex-1 flex flex-col gap-1 items-end text-right bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/30 rounded-xl px-4 py-4 transition-colors group"
            >
              <span className="font-mono text-xs text-violet-500 group-hover:text-violet-400 transition-colors">
                Day {nextDay.day}
              </span>
              <span className="text-sm text-violet-200 group-hover:text-white transition-colors">
                {nextDay.title}
              </span>
            </Link>
          ) : null}
        </nav>

      </div>
    </div>
  );
}
