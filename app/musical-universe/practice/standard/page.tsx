import Link from 'next/link'

const SPRINTS = [
  {
    number: 1,
    title: 'Naming What You Know',
    duration: '2 weeks',
    description: 'Orbit identity, segment vocabulary, applying Musical Universe language to existing fluency',
    active: true,
    href: '/musical-universe/practice/standard/sprint-1',
  },
  {
    number: 2,
    title: 'Systematic Coverage',
    duration: '2 weeks',
    description: 'All string sets explicitly, all triad inversions named and catalogued',
    active: false,
    href: null,
  },
  {
    number: 3,
    title: 'Orbit Fluency',
    duration: '2 weeks',
    description: 'Fast Orbit identity anywhere on the neck, 3-second retrieval target',
    active: false,
    href: null,
  },
  {
    number: 4,
    title: 'Voice Leading',
    duration: '2 weeks',
    description: 'Anchor types, I-IV-V movement, smooth position transitions',
    active: false,
    href: null,
  },
  {
    number: 5,
    title: 'Open Voicings',
    duration: '2 weeks',
    description: 'Drop-2 principle, integration with voice leading',
    active: false,
    href: null,
  },
]

export default function StandardPracticePath() {
  return (
    <div>
      {/* Header */}
      <div className="py-14 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <Link
            href="/musical-universe/practice"
            className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Practice Paths
          </Link>
          <div className="mt-4 mb-3">
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
              Standard Tuning Path
            </h1>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-5">
            E–A–D–G–B–E. You already know this tuning — the goal is fluency under the Orbit/Constellation
            framework, systematic coverage of all string sets and inversions, and precise voice leading vocabulary.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-900 text-indigo-200">
              5 Sprints
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-700 text-slate-300">
              2 weeks each
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-700 text-slate-300">
              ~10 weeks total
            </span>
          </div>
        </div>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(90deg,#4f46e5 0%,#6366f1 50%,#818cf8 100%)' }} />

      {/* Sprint list */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Sprint Framework</p>

        <div className="space-y-4">
          {SPRINTS.map((sprint) => {
            const Card = (
              <div
                className={[
                  'rounded-2xl border p-6 flex items-start gap-5 transition-all',
                  sprint.active
                    ? 'border-indigo-300 shadow-md shadow-indigo-100 bg-white hover:shadow-lg hover:shadow-indigo-100'
                    : 'border-slate-200 bg-slate-50 opacity-60',
                ].join(' ')}
              >
                {/* Number badge */}
                <div
                  className="rounded-xl w-12 h-12 flex items-center justify-center shrink-0 font-extrabold text-white text-lg"
                  style={{ background: sprint.active ? '#4f46e5' : '#94a3b8' }}
                >
                  {sprint.number}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2
                      className={[
                        'text-base font-extrabold',
                        sprint.active ? 'text-slate-800' : 'text-slate-500',
                      ].join(' ')}
                    >
                      Sprint {sprint.number} — {sprint.title}
                    </h2>
                    <span
                      className={[
                        'text-xs font-semibold px-2 py-0.5 rounded-full border',
                        sprint.active
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-slate-100 text-slate-400 border-slate-200',
                      ].join(' ')}
                    >
                      {sprint.duration}
                    </span>
                    {sprint.active && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        Active
                      </span>
                    )}
                    {!sprint.active && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p
                    className={[
                      'text-sm leading-relaxed',
                      sprint.active ? 'text-slate-600' : 'text-slate-400',
                    ].join(' ')}
                  >
                    {sprint.description}
                  </p>
                </div>

                {sprint.active && (
                  <div className="shrink-0 self-center">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl text-white"
                      style={{ background: '#4f46e5' }}
                    >
                      Start →
                    </span>
                  </div>
                )}
              </div>
            )

            return sprint.active ? (
              <Link key={sprint.number} href={sprint.href!} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-2xl">
                {Card}
              </Link>
            ) : (
              <div key={sprint.number}>{Card}</div>
            )
          })}
        </div>

        {/* Timeline summary */}
        <div className="mt-10 rounded-2xl border border-slate-200 p-6 bg-slate-50">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Total Timeline</p>
          <div className="flex flex-wrap gap-0 items-center mb-5">
            {SPRINTS.map((sprint, i) => (
              <div key={sprint.number} className="flex items-center">
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white mx-auto mb-1"
                    style={{ background: sprint.active ? '#4f46e5' : '#cbd5e1' }}
                  >
                    {sprint.number}
                  </div>
                  <p
                    className="text-xs font-semibold whitespace-nowrap"
                    style={{ color: sprint.active ? '#4f46e5' : '#94a3b8' }}
                  >
                    S{sprint.number}
                  </p>
                </div>
                {i < SPRINTS.length - 1 && (
                  <div className="w-10 sm:w-16 h-px mx-1 mb-4" style={{ background: '#e2e8f0' }} />
                )}
              </div>
            ))}
            <div className="ml-3 mb-4">
              <span className="text-xs text-slate-400 font-semibold">~10 wks</span>
            </div>
          </div>
          <div className="space-y-1">
            {SPRINTS.map((sprint) => (
              <div key={sprint.number} className="flex gap-3 text-xs text-slate-500">
                <span className="font-bold w-20 shrink-0" style={{ color: sprint.active ? '#4f46e5' : undefined }}>
                  Sprint {sprint.number}
                </span>
                <span className="w-16 shrink-0 text-slate-400">{sprint.duration}</span>
                <span className={sprint.active ? 'text-slate-700 font-medium' : ''}>{sprint.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-10 border-t border-slate-200">
          <Link href="/musical-universe/practice" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            ← Practice Paths
          </Link>
          <Link
            href="/musical-universe/practice/standard/sprint-1"
            className="sm:ml-auto text-sm font-semibold hover:opacity-80 transition-opacity px-5 py-2.5 rounded-xl text-white"
            style={{ background: '#4f46e5' }}
          >
            Begin Sprint 1 →
          </Link>
        </div>
      </div>
    </div>
  )
}
