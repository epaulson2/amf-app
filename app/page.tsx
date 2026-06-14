import Link from 'next/link'

const SPRINT_DATA = [
  { n: 1,  phase: 'Foundation',  diChord: null,  label: 'Orientation',            anchorSong: "Ain't No Sunshine", status: 'complete' },
  { n: 2,  phase: 'Foundation',  diChord: '[5]', label: 'Perfect 4th',            anchorSong: 'Stand By Me',       status: 'next'     },
  { n: 3,  phase: 'Foundation',  diChord: '[7]', label: 'Perfect 5th',            anchorSong: 'TBD',               status: 'pending'  },
  { n: 4,  phase: 'Foundation',  diChord: '[2]', label: 'Major 2nd',              anchorSong: '12-Bar Blues',      status: 'pending'  },
  { n: 5,  phase: 'Development', diChord: '[3]', label: 'Minor 3rd',              anchorSong: 'TBD',               status: 'pending'  },
  { n: 6,  phase: 'Development', diChord: '[9]', label: 'Major 6th',              anchorSong: 'TBD',               status: 'pending'  },
  { n: 7,  phase: 'Development', diChord: '[4]', label: 'Major 3rd',              anchorSong: 'TBD',               status: 'pending'  },
  { n: 8,  phase: 'Development', diChord: '[6]', label: 'Tritone',                anchorSong: 'TBD',               status: 'pending'  },
  { n: 9,  phase: 'Integration', diChord: null,  label: 'Review + Classical',     anchorSong: 'TBD',               status: 'pending'  },
  { n: 10, phase: 'Integration', diChord: null,  label: 'Advanced Voicings',      anchorSong: 'TBD',               status: 'pending'  },
  { n: 11, phase: 'Integration', diChord: null,  label: 'Heptachord Shift',       anchorSong: 'TBD',               status: 'pending'  },
  { n: 12, phase: 'Integration', diChord: null,  label: 'Transposition + Synthesis', anchorSong: 'TBD',            status: 'pending'  },
]

const PHASE_META: Record<string, { color: string; bg: string; sprints: string }> = {
  Foundation:  { color: '#1E8449', bg: '#d9f5e4', sprints: '1–4' },
  Development: { color: '#1a5a8a', bg: '#d6eafc', sprints: '5–8' },
  Integration: { color: '#5B2C6F', bg: '#ede9fe', sprints: '9–12' },
}

export default function DashboardPage() {
  const phases = ['Foundation', 'Development', 'Integration']
  const complete = SPRINT_DATA.filter(s => s.status === 'complete').length
  const inProgress = SPRINT_DATA.filter(s => s.status === 'next').length

  return (
    <div>
      {/* Hero */}
      <div className="py-20 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7a9bd4' }}>
            Adaptable Musician&apos;s Framework
          </p>
          <h1 className="text-white text-5xl sm:text-6xl font-extrabold tracking-tight mb-5">
            Your 12-Sprint Path<br />
            <span style={{ color: '#fbbf24' }}>to Musical Fluency</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Mastery-gated. Guitar and piano simultaneously. All four chambers from day one.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/sprints/1"
              className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: '#1E8449' }}
            >
              Open Sprint 1 →
            </Link>
            <span className="text-slate-400 text-sm italic">&ldquo;The framework disappears.&rdquo;</span>
          </div>
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 35%,#1E8449 65%,#1a5a8a 100%)' }} />

      {/* Progress summary */}
      <div className="bg-slate-50 border-b border-slate-200 py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-5 text-sm">
          <span className="font-bold text-slate-600">Progress:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#16a34a' }} />
            <span className="text-slate-600">{complete} sprint{complete !== 1 ? 's' : ''} complete</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#d97706' }} />
            <span className="text-slate-600">{inProgress} next up</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-slate-600">{12 - complete - inProgress} upcoming</span>
          </span>
        </div>
      </div>

      {/* Sprint grid by phase */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {phases.map(phase => {
          const meta = PHASE_META[phase]
          const sprints = SPRINT_DATA.filter(s => s.phase === phase)
          return (
            <div key={phase}>
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: meta.bg, color: meta.color }}
                >
                  {phase} · Sprints {meta.sprints}
                </span>
                <div className="flex-1 h-px" style={{ background: meta.bg }} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sprints.map(sprint => {
                  const isClickable = sprint.status === 'complete' || sprint.status === 'next'
                  const card = (
                    <div
                      className={`rounded-xl border p-4 h-full transition-all ${
                        sprint.status === 'complete' ? 'border-green-200 hover:border-green-400' :
                        sprint.status === 'next'     ? 'border-amber-200 hover:border-amber-400' :
                                                       'border-slate-200 opacity-55'
                      }`}
                      style={{
                        background:
                          sprint.status === 'complete' ? '#f0fdf4' :
                          sprint.status === 'next'     ? '#fffbeb' :
                                                         '#f8fafc',
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl font-extrabold" style={{ color: meta.color }}>
                          {sprint.n}
                        </span>
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={
                            sprint.status === 'complete' ? { background: '#dcfce7', color: '#15803d' } :
                            sprint.status === 'next'     ? { background: '#fef3c7', color: '#b45309' } :
                                                          { background: '#f1f5f9', color: '#64748b' }
                          }
                        >
                          {sprint.status === 'complete' ? 'Complete' : sprint.status === 'next' ? 'Next' : 'Upcoming'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mb-1 leading-snug">{sprint.label}</p>
                      {sprint.diChord && (
                        <p className="text-xs text-slate-500 font-mono">{sprint.diChord}</p>
                      )}
                      {sprint.anchorSong !== 'TBD' && (
                        <p className="text-xs text-slate-400 mt-1 italic truncate">{sprint.anchorSong}</p>
                      )}
                    </div>
                  )

                  return isClickable ? (
                    <Link key={sprint.n} href={`/sprints/${sprint.n}`} className="block">
                      {card}
                    </Link>
                  ) : (
                    <div key={sprint.n}>{card}</div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Four chambers */}
      <div className="border-t border-slate-200 py-12 px-4 sm:px-6" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-extrabold text-slate-800 mb-1">The Four Chambers</h2>
          <p className="text-sm text-slate-500 mb-6">All four run in parallel from Sprint 1 — no sequential prerequisites.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Melody',   desc: '4 zones · tension arc · chord-change behaviors', color: '#1a5a8a', bg: '#d6eafc' },
              { name: 'Harmony',  desc: '14 root movements · 12+2 progressions',           color: '#922B21', bg: '#fde8e8' },
              { name: 'Voicings', desc: 'Shell · Drop 2 · quartal · CAGED · rootless',     color: '#1E8449', bg: '#d9f5e4' },
              { name: 'Rhythm',   desc: '8-position grid · son clave · Longy rhythms',     color: '#5B2C6F', bg: '#ede9fe' },
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
