import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMarkdownSection, getMarkdownSections } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

const FILE = '04-curriculum/semester-1/progress-tracker.md'

const SECTIONS = [
  { slug: 'mastery', title: 'Mastery Levels', prev: null, next: 'weekly' },
  { slug: 'weekly', title: 'Weekly Sprint Logs', prev: 'mastery', next: 'checkpoints' },
  { slug: 'checkpoints', title: 'Monthly Checkpoints', prev: 'weekly', next: null },
]

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.slug }))
}

async function getSectionContent(slug: string): Promise<string> {
  switch (slug) {
    case 'mastery':
      return getMarkdownSection(FILE, null, ['Monthly Checkpoints', 'Weekly Sprint Logs'])
    case 'weekly':
      return getMarkdownSection(FILE, 'Weekly Sprint Logs', ['Spaced Repetition'])
    case 'checkpoints':
      return getMarkdownSections(FILE, [
        { from: 'Monthly Checkpoints', stop: ['Weekly Sprint Logs'] },
        { from: 'Spaced Repetition Schedule', stop: [] },
      ])
    default:
      return ''
  }
}

export default async function ProgressSectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section: sectionSlug } = await params
  const sectionIndex = SECTIONS.findIndex((s) => s.slug === sectionSlug)
  if (sectionIndex === -1) notFound()

  const section = SECTIONS[sectionIndex]
  const prevSection = section.prev ? SECTIONS.find((s) => s.slug === section.prev) ?? null : null
  const nextSection = section.next ? SECTIONS.find((s) => s.slug === section.next) ?? null : null

  const content = await getSectionContent(sectionSlug)

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
            <Link href="/curriculum/semester-1/progress" className="hover:text-amber-400 transition-colors">Progress Tracker</Link>
            {' / '}
            <span className="text-slate-300">{section.title}</span>
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-4">
            {SECTIONS.map((s) => (
              <Link key={s.slug} href={`/curriculum/semester-1/progress/${s.slug}`}>
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: s.slug === sectionSlug ? '28px' : '10px',
                    height: '10px',
                    backgroundColor: s.slug === sectionSlug ? '#d97706' : '#334155',
                  }}
                  title={s.title}
                />
              </Link>
            ))}
          </div>

          <h1 className="text-white text-3xl sm:text-4xl font-bold">{section.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <MarkdownContent source={content} />
      </div>

      {/* Prev / Next nav */}
      <div className="border-t" style={{ borderColor: '#e2e8f0', backgroundColor: '#fff' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between gap-4">
          {prevSection ? (
            <Link
              href={`/curriculum/semester-1/progress/${prevSection.slug}`}
              className="flex-1 group flex items-center gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all"
              style={{ borderColor: '#e2e8f0' }}
            >
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Previous</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{prevSection.title}</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/curriculum/semester-1/progress"
              className="flex-1 group flex items-center gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all"
              style={{ borderColor: '#e2e8f0' }}
            >
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Back to</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Progress Tracker Home</p>
              </div>
            </Link>
          )}

          {nextSection ? (
            <Link
              href={`/curriculum/semester-1/progress/${nextSection.slug}`}
              className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all text-right"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Next</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{nextSection.title}</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/curriculum/semester-1/progress"
              className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border hover:border-slate-300 transition-all text-right"
              style={{ borderColor: '#e2e8f0' }}
            >
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Tracker complete</p>
                <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Back to Progress Tracker Home</p>
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
