import Link from 'next/link'

const SECTIONS = [
  {
    href: '/musical-universe/learn',
    label: 'Learn',
    title: 'Learn the System',
    body: 'The conceptual framework behind the Musical Universe: how to think about the fretboard as navigable space, not memorized patterns.',
    accent: '#7c3aed',
  },
  {
    href: '/musical-universe/resources/dadgad',
    label: 'Resources',
    title: 'DADGAD Tuning Reference Guide',
    body: 'String geometry, diatonic and pentatonic cycle corrections, and complete closed-triad shapes across all four string groups, for D major and D minor in every inversion.',
    accent: '#4f46e5',
  },
  {
    href: '/musical-universe/practice/dadgad/sprint-1',
    label: 'Practice',
    title: 'DADGAD Sprint 1: The New Galaxy',
    body: 'Physical orientation in DADGAD: find any note on any string, play a D major scale in two positions, and name degrees 1, 4 and 5 in the first 7 frets.',
    accent: '#0891b2',
  },
]

export default function MusicalUniversePage() {
  return (
    <div>
      <div className="py-14 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Musical Universe</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            A way of seeing the fretboard as space you can navigate. Start with the concepts, then use the
            DADGAD reference and the first practice sprint.
          </p>
        </div>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(90deg,#7c3aed 0%,#4f46e5 50%,#0891b2 100%)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-5">
          {SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow border-l-4"
              style={{ borderLeftColor: s.accent }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: s.accent }}>{s.label}</p>
              <h2 className="text-xl font-extrabold text-slate-900 mb-2">{s.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
