import Link from 'next/link'
import { getMarkdownContent } from '@/lib/content'
import MarkdownContent from '@/components/MarkdownContent'

function Semester1Hero() {
  return (
    <div
      className="rounded-2xl border-2 p-6 sm:p-8 mb-12 relative overflow-hidden"
      style={{ borderColor: '#d97706', backgroundColor: '#0f172a' }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          backgroundColor: '#d97706',
          filter: 'blur(60px)',
          transform: 'translate(25%, -50%)',
        }}
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#d97706' }}>
          Now Open
        </p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
          Semester 1 — The 12-Bar Laboratory
        </h2>
        <p className="text-slate-300 text-sm mb-5">
          Master the 12-bar blues form across guitar and piano. Three months of structured daily
          practice building from stability to variation to full adaptation.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs mb-6">
          <span>12 weeks</span>
          <span className="hidden sm:inline">·</span>
          <span>78 practice days</span>
          <span className="hidden sm:inline">·</span>
          <span>2 instruments</span>
          <span className="hidden sm:inline">·</span>
          <span>~90 min/day</span>
        </div>
        <Link
          href="/curriculum/semester-1"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: '#d97706', color: '#fff' }}
        >
          Start Semester 1 →
        </Link>
      </div>
    </div>
  )
}

const semester1Docs = [
  {
    slug: 'core-curriculum',
    title: 'Core Curriculum',
    description: 'The 12-week core curriculum for all instruments — practice structures, weekly goals, and skill targets.',
  },
  {
    slug: 'guitar-track',
    title: 'Guitar Track',
    description: 'Instrument-specific curriculum for guitarists in Semester 1.',
  },
  {
    slug: 'piano-track',
    title: 'Piano Track',
    description: 'Instrument-specific curriculum for pianists in Semester 1.',
  },
  {
    slug: 'progress-tracker',
    title: 'Progress Tracker',
    description: 'Track your mastery milestones and skill checkpoints across the semester.',
  },
]

export default async function CurriculumPage() {
  const { content } = await getMarkdownContent('04-curriculum/overview.md')

  return (
    <div>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">Framework</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Curriculum</h1>
          <p className="text-slate-300 mt-2">Structured practice programs for applying AMF in real time.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Semester 1 hero — prominent entry point */}
        <Semester1Hero />

        <div className="max-w-3xl">
          <MarkdownContent source={content} />
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Semester 1 — Reference Docs</h2>
          <p className="text-slate-600 mb-6 text-sm">The 12-Bar Laboratory — structured practice around the 12-bar blues.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {semester1Docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/curriculum/semester-1/${doc.slug}`}
                className="block bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <h3
                  className="font-semibold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors"
                >
                  {doc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{doc.description}</p>
                <span
                  className="inline-block mt-3 text-sm font-medium"
                  style={{ color: '#d97706' }}
                >
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
