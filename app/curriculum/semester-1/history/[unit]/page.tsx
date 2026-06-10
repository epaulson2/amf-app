import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

const UNITS = [
  {
    slug: 'unit-1',
    num: 1,
    title: 'The African Foundation',
    weeks: 'Weeks 1–2',
    file: '04-curriculum/semester-1/history/unit-1.md',
    color: '#7c3aed',
  },
  {
    slug: 'unit-2',
    num: 2,
    title: 'Music Under Enslavement',
    weeks: 'Weeks 1–2 (continued)',
    file: '04-curriculum/semester-1/history/unit-2.md',
    color: '#b45309',
  },
  {
    slug: 'unit-3',
    num: 3,
    title: 'The Blues Emerges',
    weeks: 'Weeks 3–4',
    file: '04-curriculum/semester-1/history/unit-3.md',
    color: '#065f46',
  },
  {
    slug: 'unit-4',
    num: 4,
    title: 'The Delta: The Guitar Speaks Alone',
    weeks: 'Weeks 5–8',
    file: '04-curriculum/semester-1/history/unit-4.md',
    color: '#991b1b',
  },
]

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.slug }))
}

export default async function HistoryUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>
}) {
  const { unit: unitSlug } = await params
  const unitIndex = UNITS.findIndex((u) => u.slug === unitSlug)
  if (unitIndex === -1) notFound()

  const unit = UNITS[unitIndex]
  const prev = unitIndex > 0 ? UNITS[unitIndex - 1] : null
  const next = unitIndex < UNITS.length - 1 ? UNITS[unitIndex + 1] : null

  const { content } = await getMarkdownContent(unit.file)

  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-400 text-sm mb-3">
            <Link href="/curriculum" className="hover:text-amber-400 transition-colors">Curriculum</Link>
            {' / '}
            <Link href="/curriculum/semester-1" className="hover:text-amber-400 transition-colors">Semester 1</Link>
            {' / '}
            <Link href="/curriculum/semester-1/history" className="hover:text-amber-400 transition-colors">History</Link>
            {' / '}
            <span className="text-slate-300">Unit {unit.num}</span>
          </p>

          {/* Unit progress dots */}
          <div className="flex items-center gap-2 mb-4">
            {UNITS.map((u) => (
              <Link key={u.slug} href={`/curriculum/semester-1/history/${u.slug}`}>
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: u.slug === unitSlug ? '28px' : '10px',
                    height: '10px',
                    backgroundColor: u.slug === unitSlug ? unit.color : '#334155',
                  }}
                  title={`Unit ${u.num}: ${u.title}`}
                />
              </Link>
            ))}
          </div>

          <span
            className="text-xs font-semibold uppercase tracking-wider mb-2 block"
            style={{ color: unit.color }}
          >
            Unit {unit.num} · {unit.weeks}
          </span>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">{unit.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>

      {/* Prev / Next nav */}
      <div
        className="border-t"
        style={{ borderColor: '#e2e8f0', backgroundColor: '#fff' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/curriculum/semester-1/history/${prev.slug}`}
              className="flex-1 group flex items-center gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all"
              style={{ borderColor: '#e2e8f0' }}
            >
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Previous</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  Unit {prev.num}: {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href="/curriculum/semester-1/history"
              className="flex-1 group flex items-center gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all"
              style={{ borderColor: '#e2e8f0' }}
            >
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Back to</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  History Course Home
                </p>
              </div>
            </Link>
          )}

          {next ? (
            <Link
              href={`/curriculum/semester-1/history/${next.slug}`}
              className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all text-right"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Next</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  Unit {next.num}: {next.title}
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/curriculum/semester-1/history"
              className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all text-right"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Course complete</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  Back to History Home
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
