import Link from 'next/link'

const sprints = [
  {
    number: 1,
    title: 'The New Galaxy',
    duration: '2 weeks',
    topics: 'Physical orientation, string names, degree 1/4/5 locations, segment types',
    href: '/musical-universe/practice/dadgad/sprint-1',
    status: 'active' as const,
  },
  {
    number: 2,
    title: 'Segment Fluency',
    duration: '2 weeks',
    topics: 'L/M/P/S across all strings, two-string combinations',
    href: null,
    status: 'upcoming' as const,
  },
  {
    number: 3,
    title: 'First Constellations',
    duration: '3 weeks',
    topics: 'Closed triads on string set 1-2-3, all inversions, major + minor',
    href: null,
    status: 'upcoming' as const,
  },
  {
    number: 4,
    title: 'All String Sets',
    duration: '3 weeks',
    topics: 'Triads on string sets 2-3-4, 3-4-5, 4-5-6 + integration',
    href: null,
    status: 'upcoming' as const,
  },
  {
    number: 5,
    title: 'Orbit Identity',
    duration: '2 weeks',
    topics: 'Root/Third/Fifth recognition from any position',
    href: null,
    status: 'upcoming' as const,
  },
  {
    number: 6,
    title: 'Voice Leading',
    duration: '2 weeks',
    topics: 'Anchor types, I-IV-V with shared and resolving anchors',
    href: null,
    status: 'upcoming' as const,
  },
  {
    number: 7,
    title: 'Open Voicings',
    duration: '2 weeks',
    topics: 'Drop-2 principle, open-string Constellations',
    href: null,
    status: 'upcoming' as const,
  },
]

export default function DADGADPracticePath() {
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
          <div className="flex items-center gap-3 mt-4 mb-3">
            <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
              DADGAD Path
            </h1>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-5">
            D–A–D–G–A–D. A new Galaxy with its own geometry. Your music theory
            is intact — only the fretboard map is different. Build fluency
            independently, not as a transfer from Standard, across 7 sprints
            from first touch to triad and voice-leading mastery.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-900 text-violet-200">
              7 Sprints
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-700 text-slate-300">
              ~16 weeks total
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-900 text-emerald-300">
              Sprint 1 active
            </span>
          </div>
        </div>
      </div>

      <div
        className="h-1"
        style={{
          background:
            'linear-gradient(90deg,#7c3aed 0%,#8b5cf6 50%,#a78bfa 100%)',
        }}
      />

      {/* Path description */}
      <div
        className="border-b border-slate-200 py-5 px-4 sm:px-6"
        style={{ background: '#f8fafc' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-xl border border-violet-200 p-4"
            style={{ background: '#f5f3ff' }}
          >
            <p className="font-bold text-sm text-violet-800 mb-2">
              What this path covers
            </p>
            <p className="text-xs text-violet-700 leading-relaxed">
              This is a new Galaxy. Even with solid music theory, the physical
              geometry of DADGAD needs independent fluency — not a transfer from
              Standard. Sprints 1–2 build the physical foundation: string names,
              degree locations, and the four segment types. Sprints 3–4 grow
              your Constellation vocabulary across all string sets. Sprints 5–7
              develop Orbit recognition, voice leading with open-string anchors,
              and DADGAD&apos;s native open-voicing language.
            </p>
          </div>
        </div>
      </div>

      {/* Sprint timeline */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Sprint Timeline
          </h2>
          <span className="text-xs text-slate-400">~16 weeks to triad + voice-leading mastery</span>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px"
            style={{ background: 'linear-gradient(180deg,#7c3aed 0%,#e2e8f0 25%)' }}
            aria-hidden="true"
          />

          <div className="space-y-4">
            {sprints.map((sprint) => {
              const isActive = sprint.status === 'active'

              const cardInner = (
                <div
                  className={[
                    'ml-16 rounded-2xl border p-5 transition-all',
                    isActive
                      ? 'border-violet-400 shadow-md shadow-violet-100'
                      : 'border-slate-200',
                  ].join(' ')}
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)'
                      : '#fafafa',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={[
                            'text-xs font-bold uppercase tracking-wider',
                            isActive ? 'text-violet-600' : 'text-slate-400',
                          ].join(' ')}
                        >
                          Sprint {sprint.number}
                        </span>
                        <span
                          className={[
                            'text-xs px-2 py-0.5 rounded-full font-semibold',
                            isActive
                              ? 'bg-violet-100 text-violet-700'
                              : 'bg-slate-100 text-slate-400',
                          ].join(' ')}
                        >
                          {sprint.duration}
                        </span>
                        {isActive && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                            Current
                          </span>
                        )}
                      </div>

                      <h3
                        className={[
                          'font-extrabold text-base mb-1.5',
                          isActive ? 'text-slate-900' : 'text-slate-400',
                        ].join(' ')}
                      >
                        {sprint.title}
                      </h3>

                      <p
                        className={[
                          'text-xs leading-relaxed',
                          isActive ? 'text-slate-600' : 'text-slate-400',
                        ].join(' ')}
                      >
                        {sprint.topics}
                      </p>
                    </div>

                    {isActive && (
                      <span
                        className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl text-white"
                        style={{ background: '#7c3aed' }}
                      >
                        Start →
                      </span>
                    )}

                    {!isActive && (
                      <span className="shrink-0 text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              )

              return (
                <div key={sprint.number} className="relative flex items-start">
                  {/* Node dot */}
                  <div
                    className={[
                      'relative z-10 w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-extrabold text-sm',
                      isActive
                        ? 'text-white shadow-lg shadow-violet-200'
                        : 'text-slate-400 bg-white border-2 border-slate-200',
                    ].join(' ')}
                    style={isActive ? { background: '#7c3aed' } : {}}
                  >
                    {sprint.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    {isActive && sprint.href ? (
                      <Link href={sprint.href} className="block hover:opacity-90 transition-opacity">
                        {cardInner}
                      </Link>
                    ) : (
                      cardInner
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-2xl border-2 border-violet-300 p-6 text-center"
          style={{
            background: 'linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)',
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-2">
            Ready to begin?
          </p>
          <h3 className="text-xl font-extrabold text-violet-900 mb-3">
            Start with Sprint 1 — The New Galaxy
          </h3>
          <p className="text-sm text-violet-700 mb-5 max-w-md mx-auto">
            Physical orientation, string names, degree 1/4/5 locations, and
            the four segment types. Two weeks to a solid foundation.
          </p>
          <Link
            href="/musical-universe/practice/dadgad/sprint-1"
            className="inline-block font-bold text-sm px-6 py-3 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ background: '#7c3aed' }}
          >
            Begin Sprint 1 →
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-10 border-t border-slate-200">
          <Link
            href="/musical-universe/practice"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Practice Paths
          </Link>
          <Link
            href="/musical-universe/practice/standard"
            className="sm:ml-auto text-sm font-semibold hover:opacity-80 transition-opacity px-5 py-2.5 rounded-xl text-white"
            style={{ background: '#4f46e5' }}
          >
            Standard Path →
          </Link>
        </div>
      </div>
    </div>
  )
}
