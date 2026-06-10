import Link from 'next/link'

const SECTIONS = [
  {
    slug: 'mastery',
    title: 'Mastery Levels',
    desc: 'The six AMF mastery levels (Exposure through Integration) and the semester-wide skill tracking table.',
    weeks: 'Framework',
    color: '#1e40af',
  },
  {
    slug: 'weekly',
    title: 'Weekly Sprint Logs',
    desc: 'Week-by-week goals, deliverables, and self-evaluation prompts for all 12 weeks.',
    weeks: 'Weeks 1–12',
    color: '#065f46',
  },
  {
    slug: 'checkpoints',
    title: 'Monthly Checkpoints',
    desc: 'Month 1, 2, and 3 end checkpoints, spaced repetition schedule, and semester completion criteria.',
    weeks: 'End of each month',
    color: '#7c3aed',
  },
]

export default function ProgressTrackerHub() {
  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-3">
            <Link href="/curriculum" className="hover:text-amber-400 transition-colors">Curriculum</Link>
            {' / '}
            <Link href="/curriculum/semester-1" className="hover:text-amber-400 transition-colors">Semester 1</Link>
            {' / '}
            <span className="text-slate-300">Progress Tracker</span>
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-slate-300 text-sm">Mastery levels, weekly sprints, and monthly checkpoints</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <Link key={s.slug} href={`/curriculum/semester-1/progress/${s.slug}`}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: s.color }} />
              <div className="pl-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1 block">{s.weeks}</span>
                <h2 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-slate-700 transition-colors">{s.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-3 inline-block text-sm font-medium" style={{ color: '#d97706' }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
