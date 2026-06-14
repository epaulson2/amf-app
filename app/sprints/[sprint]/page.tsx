import Link from 'next/link'
import { notFound } from 'next/navigation'

type Doc = {
  id: string
  title: string
  desc: string
  icon: string
  viewHref: string
  pdfHref: string | null
  pdfFilename: string | null
}

type SprintDetail = {
  phase: string
  phaseColor: string
  phaseBg: string
  status: string
  label: string
  diChord: string | null
  diChordLabel: string | null
  plogger: string
  anchorSong: string
  anchorSongArtist: string
  anchorKey: string
  gateA: string
  gateB: string
  docs: Doc[]
  assetsHref: string | null
  assetsLabel: string | null
}

const SPRINT_DETAILS: Record<number, SprintDetail> = {
  1: {
    phase: 'Foundation',
    phaseColor: '#1E8449',
    phaseBg: '#d9f5e4',
    status: 'complete',
    label: 'Orientation',
    diChord: null,
    diChordLabel: null,
    plogger: 'Ch.1–3',
    anchorSong: "Ain't No Sunshine",
    anchorSongArtist: 'Bill Withers',
    anchorKey: 'A minor',
    gateA: '[3]/[4] discrimination — 10/10 correct identification + sing either from any given pitch',
    gateB: "Ain't No Sunshine on both instruments, all the way through, no stops, recognizable at musical tempo",
    docs: [
      {
        id: 'textbook',
        title: 'Mini-Textbook',
        desc: 'Musical OS introduction, all four chambers, the di-chord system, Zone 1 melody. 6 parts, 28-day reading schedule.',
        icon: '📖',
        viewHref: '/materials/sprint1/textbook',
        pdfHref: '/sprint1_textbook.pdf',
        pdfFilename: 'sprint1_textbook.pdf',
      },
      {
        id: 'practice',
        title: 'Practice Plan + Workbook',
        desc: '28-day session plan — 3 blocks per session (Combined Learning + Guitar + Piano), 2.5 hrs/day, plus 7 workbook fill-in pages.',
        icon: '📅',
        viewHref: '/materials/sprint1/practice',
        pdfHref: '/sprint1_practice.pdf',
        pdfFilename: 'sprint1_practice.pdf',
      },
      {
        id: 'cheatsheets',
        title: 'Cheat Sheets',
        desc: '12 quick-reference cards — di-chords, zones, rhythm grid, mastery stages, and sprint gates.',
        icon: '📋',
        viewHref: '/materials/sprint1/cheatsheets',
        pdfHref: null,
        pdfFilename: null,
      },
    ],
    assetsHref: '/materials/sprint1',
    assetsLabel: '11 visual reference assets — pictographs, fretboard maps, rhythm grid, and more',
  },
  2: {
    phase: 'Foundation',
    phaseColor: '#1E8449',
    phaseBg: '#d9f5e4',
    status: 'next',
    label: 'Perfect 4th',
    diChord: '[5]',
    diChordLabel: 'Perfect 4th',
    plogger: 'Ch.3 (complete) + Ch.4',
    anchorSong: 'Stand By Me',
    anchorSongArtist: 'Ben E. King',
    anchorKey: 'A major',
    gateA: 'Sing and play [5] from any 3 starting notes; identify I→IV vs V→I by ear in real music',
    gateB: 'Stand By Me on both instruments at musical tempo, chord changes clean, no stops',
    docs: [],
    assetsHref: null,
    assetsLabel: null,
  },
}

export default async function SprintHubPage({
  params,
}: {
  params: Promise<{ sprint: string }>
}) {
  const { sprint: sprintParam } = await params
  const n = parseInt(sprintParam, 10)

  if (isNaN(n) || n < 1 || n > 12) notFound()

  const sprint = SPRINT_DETAILS[n]

  // Sprints that exist in the map but have no content yet
  const isBuilt = sprint && sprint.docs.length > 0

  const phaseColor = sprint?.phaseColor ?? '#64748b'
  const phaseBg = sprint?.phaseBg ?? '#f1f5f9'
  const phase = sprint?.phase ?? (n <= 4 ? 'Foundation' : n <= 8 ? 'Development' : 'Integration')

  return (
    <div>
      {/* Header */}
      <div className="py-12 px-4 sm:px-6" style={{ background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
            ← All Sprints
          </Link>
          <div className="flex items-center gap-3 mt-5 mb-2 flex-wrap">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: phaseBg, color: phaseColor }}
            >
              {phase} Phase
            </span>
            {sprint && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={
                  sprint.status === 'complete' ? { background: '#14532d', color: '#86efac' } :
                  sprint.status === 'next'     ? { background: '#78350f', color: '#fde68a' } :
                                                 { background: '#1e293b', color: '#94a3b8' }
                }
              >
                {sprint.status === 'complete' ? 'Complete' : sprint.status === 'next' ? 'Next Up' : 'Upcoming'}
              </span>
            )}
          </div>
          <h1 className="text-white text-4xl font-extrabold tracking-tight">
            Sprint {n}{sprint ? ` — ${sprint.label}` : ''}
          </h1>

          {sprint && (
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-slate-300">
              <span>
                <span className="text-slate-500 mr-1">Plogger:</span>
                {sprint.plogger}
              </span>
              <span>
                <span className="text-slate-500 mr-1">Anchor song:</span>
                {sprint.anchorSong}
                {sprint.anchorSongArtist && ` — ${sprint.anchorSongArtist}`}
                {sprint.anchorKey && `, ${sprint.anchorKey}`}
              </span>
              {sprint.diChord && (
                <span>
                  <span className="text-slate-500 mr-1">Di-chord:</span>
                  <span className="font-mono">{sprint.diChord}</span>
                  {sprint.diChordLabel && ` (${sprint.diChordLabel})`}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 35%,#1E8449 65%,#1a5a8a 100%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {!isBuilt ? (
          /* Coming soon state */
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎵</p>
            <h2 className="text-xl font-extrabold text-slate-700 mb-2">Sprint {n} is coming soon</h2>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
              {sprint
                ? `This sprint covers ${sprint.label}${sprint.diChord ? ` (di-chord ${sprint.diChord})` : ''}. Content will be available once Sprint ${n - 1} is mastered.`
                : 'Content for this sprint will be published as earlier sprints are completed.'}
            </p>
            <Link href="/" className="inline-block font-semibold text-sm hover:underline" style={{ color: '#d97706' }}>
              ← Back to Dashboard
            </Link>
          </div>
        ) : (
          <>
            {/* Documents */}
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {sprint.docs.map(doc => (
                <div
                  key={doc.id}
                  className="rounded-xl border border-slate-200 p-5 flex flex-col"
                  style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
                >
                  <div className="text-2xl mb-3">{doc.icon}</div>
                  <h3 className="font-extrabold text-slate-800 text-sm mb-1">{doc.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-5">{doc.desc}</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={doc.viewHref}
                      className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                      style={{ background: '#0f172a' }}
                    >
                      View on site →
                    </Link>
                    {doc.pdfHref ? (
                      <a
                        href={doc.pdfHref}
                        download={doc.pdfFilename ?? undefined}
                        className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-bold border border-slate-200 hover:border-slate-400 text-slate-600 transition-colors"
                      >
                        Download PDF ↓
                      </a>
                    ) : (
                      <span className="w-full py-2.5 px-4 rounded-lg text-center text-xs text-slate-400 border border-dashed border-slate-200">
                        PDF coming soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Assets */}
            {sprint.assetsHref && (
              <div className="mb-12">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Visual Assets</h2>
                <Link
                  href={sprint.assetsHref}
                  className="flex items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-slate-400 transition-all group"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Sprint {n} Asset Gallery</p>
                    {sprint.assetsLabel && (
                      <p className="text-xs text-slate-500 mt-0.5">{sprint.assetsLabel}</p>
                    )}
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-700 text-lg transition-colors">→</span>
                </Link>
              </div>
            )}

            {/* Mastery gates */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Mastery Gates</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-blue-100" style={{ background: '#eff6ff' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#1a5a8a' }}>
                    Gate A — Ear
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{sprint.gateA}</p>
                </div>
                <div className="p-5 rounded-xl border border-green-100" style={{ background: '#f0fdf4' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#1E8449' }}>
                    Gate B — Performance
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{sprint.gateB}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                Both gates must be met on guitar and piano, in at least 3 keys, at musical tempo, without hesitation — before advancing to the next sprint.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
