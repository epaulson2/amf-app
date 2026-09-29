import Link from 'next/link'

const SPRINT_DATA = [
  { n: 1,  phase: 'Foundation',  label: 'Orientation',               status: 'complete' },
  { n: 2,  phase: 'Foundation',  label: 'Perfect 4th',               status: 'next'     },
  { n: 3,  phase: 'Foundation',  label: 'Perfect 5th',               status: 'pending'  },
  { n: 4,  phase: 'Foundation',  label: 'Major 2nd',                 status: 'pending'  },
  { n: 5,  phase: 'Development', label: 'Minor 3rd',                 status: 'pending'  },
  { n: 6,  phase: 'Development', label: 'Major 6th',                 status: 'pending'  },
  { n: 7,  phase: 'Development', label: 'Major 3rd',                 status: 'pending'  },
  { n: 8,  phase: 'Development', label: 'Tritone',                   status: 'pending'  },
  { n: 9,  phase: 'Integration', label: 'Review + Classical',        status: 'pending'  },
  { n: 10, phase: 'Integration', label: 'Advanced Voicings',         status: 'pending'  },
  { n: 11, phase: 'Integration', label: 'Heptachord Shift',          status: 'pending'  },
  { n: 12, phase: 'Integration', label: 'Transposition + Synthesis', status: 'pending'  },
]

const PHASE_META: Record<string, { color: string; bg: string; border: string }> = {
  Foundation:  { color: '#1E8449', bg: '#f0fdf4', border: '#bbf7d0' },
  Development: { color: '#1a5a8a', bg: '#eff6ff', border: '#bfdbfe' },
  Integration: { color: '#5B2C6F', bg: '#faf5ff', border: '#e9d5ff' },
}

export default function HomePage() {
  const complete  = SPRINT_DATA.filter(s => s.status === 'complete').length
  const next      = SPRINT_DATA.filter(s => s.status === 'next').length

  return (
    <div>

      {/* ── Hero ── */}
      <div style={{ background: '#0f172a' }} className="py-10 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7a9bd4' }}>
            Adaptable Musician&apos;s Framework
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
            Mission Control
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            Every tool, path, and resource. Choose your entry point.
          </p>
        </div>
      </div>

      <div className="h-0.5" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 25%,#1E8449 60%,#1a5a8a 100%)' }} />

      {/* ── Primary hub cards ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Musical Universe */}
          <div className="rounded-2xl border border-violet-200 p-6" style={{ background: 'linear-gradient(135deg,#f5f3ff,#ede9fe)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7c3aed' }}>Fretboard Navigation</p>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: '#5b21b6' }}>
              <Link href="/musical-universe" className="hover:underline">Musical Universe →</Link>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Orbit system, segment cycles, Emotional Coordinates. Standard + DADGAD in parallel from day one.
            </p>
            <div className="space-y-1.5">
              <Link href="/musical-universe/learn" className="block text-xs font-semibold text-violet-700 hover:text-violet-900">Learn the System →</Link>
              <Link href="/musical-universe/practice" className="block text-xs font-semibold text-violet-700 hover:text-violet-900">Practice Path →</Link>
              <Link href="/musical-universe/resources/dadgad" className="block text-xs font-semibold text-violet-700 hover:text-violet-900">DADGAD Reference Guide →</Link>
            </div>
          </div>

          {/* Plogger */}
          <div className="rounded-2xl border border-indigo-200 p-6" style={{ background: 'linear-gradient(135deg,#eef2ff,#e0e7ff)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#4338ca' }}>Acoustic Foundation</p>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: '#3730a3' }}>
              <Link href="/plogger" className="hover:underline">Plogger →</Link>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Di-chord harmonicity, pulsation, F/O factor. The perceptual OS under everything else.
            </p>
            <div className="space-y-1.5">
              <Link href="/plogger" className="block text-xs font-semibold text-indigo-700 hover:text-indigo-900">Method Book →</Link>
              <Link href="/plogger/practice-plan" className="block text-xs font-semibold text-indigo-700 hover:text-indigo-900">Practice Plan →</Link>
              <Link href="/audio/pictographs" className="block text-xs font-semibold text-indigo-700 hover:text-indigo-900">Di-Chord Pictographs →</Link>
              <a href="/plogger-book.pdf" download="The Plogger Method.pdf" className="block text-xs font-semibold text-indigo-700 hover:text-indigo-900">Download Ebook (PDF) ↓</a>
            </div>
          </div>

          {/* Audio Lab */}
          <div className="rounded-2xl border border-cyan-200 p-6" style={{ background: 'linear-gradient(135deg,#ecfeff,#cffafe)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0e7490' }}>Active Listening</p>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: '#0e7490' }}>
              <Link href="/audio" className="hover:underline">Audio Lab →</Link>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Ear training, interval recognition, jam tracks, and rhythm tools.
            </p>
            <div className="space-y-1.5">
              <Link href="/audio/ear-training" className="block text-xs font-semibold text-cyan-700 hover:text-cyan-900">Ear Training →</Link>
              <Link href="/audio/interval" className="block text-xs font-semibold text-cyan-700 hover:text-cyan-900">Interval Explorer →</Link>
              <Link href="/audio/jam-tracks" className="block text-xs font-semibold text-cyan-700 hover:text-cyan-900">Jam Tracks →</Link>
              <Link href="/audio/rhythm" className="block text-xs font-semibold text-cyan-700 hover:text-cyan-900">Rhythm Lab →</Link>
            </div>
          </div>

          {/* Curriculum */}
          <div className="rounded-2xl border border-emerald-200 p-6" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#065f46' }}>Structured Learning</p>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: '#065f46' }}>
              <Link href="/curriculum" className="hover:underline">Curriculum →</Link>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Semester-based learning. Guitar, piano, music history, and theory in coordinated daily sessions.
            </p>
            <div className="space-y-1.5">
              <Link href="/curriculum/semester-1" className="block text-xs font-semibold text-emerald-700 hover:text-emerald-900">Semester 1 →</Link>
              <Link href="/curriculum/semester-1/guitar" className="block text-xs font-semibold text-emerald-700 hover:text-emerald-900">Guitar Track →</Link>
              <Link href="/curriculum/semester-1/piano" className="block text-xs font-semibold text-emerald-700 hover:text-emerald-900">Piano Track →</Link>
            </div>
          </div>

          {/* Genre Labs */}
          <div className="rounded-2xl border border-rose-200 p-6" style={{ background: 'linear-gradient(135deg,#fff1f2,#ffe4e6)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#9f1239' }}>Applied Study</p>
            <h2 className="font-extrabold text-lg mb-2" style={{ color: '#9f1239' }}>
              <Link href="/genre-labs" className="hover:underline">Genre Labs →</Link>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Genre-specific deep dives. Theory and technique applied through the lens of real music.
            </p>
            <div className="space-y-1.5">
              <Link href="/systems" className="block text-xs font-semibold text-rose-700 hover:text-rose-900">Systems →</Link>
              <Link href="/materials" className="block text-xs font-semibold text-rose-700 hover:text-rose-900">Materials →</Link>
            </div>
          </div>

          {/* Reference */}
          <div className="rounded-2xl border border-slate-200 p-6" style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 text-slate-500">Reference</p>
            <h2 className="font-extrabold text-lg mb-2 text-slate-700">Docs &amp; Reference</h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Pedagogy, technology, and supplementary documentation.
            </p>
            <div className="space-y-1.5">
              <Link href="/pedagogy" className="block text-xs font-semibold text-slate-600 hover:text-slate-900">Pedagogy →</Link>
              <Link href="/technology" className="block text-xs font-semibold text-slate-600 hover:text-slate-900">Technology →</Link>
              <Link href="/archive" className="block text-xs font-semibold text-slate-600 hover:text-slate-900">Archive →</Link>
            </div>
          </div>

          {/* Tools Hub */}
          <div className="rounded-2xl border border-violet-800 p-6 sm:col-span-2 lg:col-span-3"
               style={{ background: 'linear-gradient(135deg,#1e1035,#0f172a)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#a78bfa' }}>Interactive Practice</p>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-lg mb-1 text-white">
                  <Link href="/tools" className="hover:underline">All Tools →</Link>
                </h2>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  Every interactive drill, explorer, and lab in one hub. New: Pythagorean Sequence Drill.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: '/tools/pythagorean-drill', label: 'Pythagorean Drill', badge: true },
                  { href: '/audio/ear-training',      label: 'Ear Training' },
                  { href: '/audio/rhythm',             label: 'Rhythm Lab' },
                  { href: '/arranger',                 label: 'Arranger' },
                  { href: '/connections',              label: 'Artist Map' },
                ].map(t => (
                  <Link key={t.href} href={t.href}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-700
                                   text-violet-300 hover:bg-violet-800 transition-colors relative"
                        style={{ background: 'rgba(109,40,217,0.15)' }}>
                    {t.label}
                    {t.badge && (
                      <span className="ml-1.5 text-[10px] font-bold text-amber-400">NEW</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Sprint Journey ── */}
      <div className="border-t border-slate-200 py-10 px-4 sm:px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800">The 12-Sprint Journey</h2>
              <p className="text-sm text-slate-500">Mastery-gated · Guitar + piano · All four chambers from Sprint 1</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {complete} complete
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {next} next
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                {12 - complete - next} upcoming
              </span>
            </div>
          </div>

          {(['Foundation', 'Development', 'Integration'] as const).map(phase => {
            const meta = PHASE_META[phase]
            const sprints = SPRINT_DATA.filter(s => s.phase === phase)
            return (
              <div key={phase} className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: meta.color }}>{phase}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {sprints.map(sprint => {
                    const clickable = sprint.status !== 'pending'
                    const inner = (
                      <div
                        className={`rounded-xl border p-3 h-full transition-all ${
                          sprint.status === 'complete' ? 'border-green-200 hover:border-green-400' :
                          sprint.status === 'next'     ? 'border-amber-200 hover:border-amber-400' :
                                                         'border-slate-200 opacity-50'
                        }`}
                        style={{ background: sprint.status === 'pending' ? '#f8fafc' : meta.bg }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg font-extrabold" style={{ color: meta.color }}>{sprint.n}</span>
                          {sprint.status !== 'pending' && (
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={
                              sprint.status === 'complete'
                                ? { background: '#dcfce7', color: '#15803d' }
                                : { background: '#fef3c7', color: '#b45309' }
                            }>
                              {sprint.status === 'complete' ? '✓' : 'Next'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-slate-700 leading-snug">{sprint.label}</p>
                      </div>
                    )
                    return clickable ? (
                      <Link key={sprint.n} href={`/sprints/${sprint.n}`} className="block">{inner}</Link>
                    ) : (
                      <div key={sprint.n}>{inner}</div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Four Chambers ── */}
      <div className="border-t border-slate-200 py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-base font-extrabold text-slate-800 mb-1">Four Chambers</h2>
          <p className="text-sm text-slate-500 mb-5">All four run in parallel from Sprint 1 — no sequential prerequisites.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'Melody',   desc: '4 zones · tension arc · chord-change behaviors', color: '#1a5a8a', bg: '#eff6ff' },
              { name: 'Harmony',  desc: '14 root movements · 12+2 progressions',           color: '#922B21', bg: '#fff1f2' },
              { name: 'Voicings', desc: 'Shell · Drop 2 · quartal · CAGED · rootless',     color: '#1E8449', bg: '#f0fdf4' },
              { name: 'Rhythm',   desc: '8-position grid · son clave · Longy rhythms',     color: '#5B2C6F', bg: '#faf5ff' },
            ].map(c => (
              <div key={c.name} className="rounded-xl p-4 border border-slate-200" style={{ background: c.bg }}>
                <p className="font-extrabold text-sm mb-1" style={{ color: c.color }}>{c.name}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
