import Link from 'next/link'

const OLD_SECTIONS = [
  {
    href: '/curriculum',
    title: 'Curriculum',
    desc: 'Semester-based curriculum with weekly and daily views — the original AMF learning path.',
  },
  {
    href: '/systems',
    title: 'Systems',
    desc: 'AMF system overviews — Melody OS, Harmony OS, Voicings OS, Rhythm Code.',
  },
  {
    href: '/genre-labs',
    title: 'Genre Labs',
    desc: 'Genre-specific application exercises and examples.',
  },
  {
    href: '/materials',
    title: 'Materials Hub',
    desc: 'Original materials index including the Sprint 1 asset gallery.',
  },
  {
    href: '/practice',
    title: 'Practice Plan',
    desc: 'Original standalone practice plan from the previous learning path.',
  },
  {
    href: '/pedagogy',
    title: 'Pedagogy',
    desc: 'Pedagogical approach and teaching philosophy documentation.',
  },
  {
    href: '/technology',
    title: 'Technology',
    desc: 'Technology documentation for the AMF platform.',
  },
]

export default function ArchivePage() {
  return (
    <div>
      <div className="py-14 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Dashboard
          </Link>
          <p className="text-xs font-bold tracking-widest uppercase mt-6 mb-2" style={{ color: '#7a9bd4' }}>
            Archive
          </p>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-3">
            Previous Learning Path
          </h1>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            These sections were built under an earlier version of the AMF framework. They remain available
            for reference but are not part of the current 12-sprint curriculum.
          </p>
        </div>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 35%,#1E8449 65%,#1a5a8a 100%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4">
          {OLD_SECTIONS.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className="block p-5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all group"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <p className="font-bold text-slate-800 text-sm mb-1">{section.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{section.desc}</p>
              <span className="text-xs font-semibold transition-colors" style={{ color: '#d97706' }}>
                View →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-4 rounded-xl border border-dashed border-slate-300 text-center">
          <p className="text-slate-500 text-sm">
            Looking for the new 12-sprint curriculum?{' '}
            <Link href="/" className="font-semibold hover:underline" style={{ color: '#d97706' }}>
              Go to Dashboard →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
