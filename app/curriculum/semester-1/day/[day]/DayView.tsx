'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { DayPlan, SessionPlan } from '@/lib/curriculum-data'
import { AMF_SYSTEM_LABELS, HISTORY_UNIT_TITLES } from '@/lib/curriculum-data'

// ── Session card ─────────────────────────────────────────────────────

const SESSION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Technique:   { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  Application: { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  Integration: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  Listening:   { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
}

function SessionCard({ session, index }: { session: SessionPlan; index: number }) {
  const c = SESSION_COLORS[session.type] ?? { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' }
  return (
    <div className="border rounded-xl p-4 bg-white mb-3" style={{ borderColor: c.border }}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {index + 1} of 3 · 15 min
        </span>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
          {session.type}
        </span>
        <Link href={`/systems/${session.amfSystem.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
          className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 hover:border-amber-400 hover:text-amber-700 transition-colors">
          {session.amfSystem}
        </Link>
      </div>
      <p className="font-semibold text-slate-800 mb-1">{session.focus}</p>
      <p className="text-slate-600 text-sm leading-relaxed mb-3">{session.instruction}</p>
      <div className="flex items-start gap-2 text-sm bg-green-50 border border-green-100 rounded-lg px-3 py-2">
        <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>
        <span className="text-slate-700"><span className="font-semibold text-slate-800">Done when: </span>{session.doD}</span>
      </div>
    </div>
  )
}

// ── Context card ─────────────────────────────────────────────────────

function ContextCard({
  icon, label, linkLabel, href, children
}: {
  icon: string; label: string; linkLabel: string; href: string; children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      </div>
      <div className="flex-1 text-sm text-slate-700 leading-relaxed mb-3">{children}</div>
      <Link href={href} className="text-xs font-semibold transition-colors hover:underline" style={{ color: '#d97706' }}>
        {linkLabel} →
      </Link>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────

interface DayViewProps {
  day: DayPlan
  prevDay: number | null
  nextDay: number | null
}

export default function DayView({ day, prevDay, nextDay }: DayViewProps) {
  const [done, setDone] = useState(false)
  const [activeInstrument, setActiveInstrument] = useState<'guitar' | 'piano'>('guitar')

  useEffect(() => {
    setDone(!!localStorage.getItem(`amf_done_day_${day.day}`))
  }, [day.day])

  function markComplete() {
    localStorage.setItem(`amf_done_day_${day.day}`, '1')
    setDone(true)
  }

  const ytQuery = day.historicalRef
    ? encodeURIComponent(`${day.historicalRef.artist} ${day.historicalRef.track}`)
    : ''

  const PHASE_COLORS: Record<string, string> = {
    Stabilize: '#065f46',
    Vary: '#92400e',
    Adapt: '#7c3aed',
  }
  const phaseColor = PHASE_COLORS[day.phase] ?? '#475569'

  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>

      {/* ── Sticky top nav ───────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-slate-700 px-4 py-3" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="w-28">
            {prevDay ? (
              <Link href={`/curriculum/semester-1/day/${prevDay}`}
                className="text-slate-300 hover:text-amber-400 text-sm transition-colors flex items-center gap-1">
                ← Day {prevDay}
              </Link>
            ) : (
              <Link href="/curriculum/semester-1"
                className="text-slate-400 hover:text-amber-400 text-xs transition-colors">
                ← Semester
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm">Day {day.day}</span>
            <span className="text-slate-500 text-xs">of 78</span>
            {done && <span className="text-green-400 text-xs font-semibold">✓ Done</span>}
          </div>
          <div className="w-28 text-right">
            {nextDay ? (
              <Link href={`/curriculum/semester-1/day/${nextDay}`}
                className="text-slate-300 hover:text-amber-400 text-sm transition-colors flex items-center gap-1 justify-end">
                Day {nextDay} →
              </Link>
            ) : (
              <span className="text-slate-500 text-xs">Last day</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: phaseColor }}>
              {day.phase}
            </span>
            <span className="text-slate-400 text-xs">Month {day.month}</span>
            <span className="text-slate-300 text-xs">·</span>
            <Link href={`/curriculum/semester-1/week/${day.week}`}
              className="text-xs text-slate-400 hover:text-amber-600 transition-colors">
              Week {day.week}
            </Link>
            <span className="text-slate-300 text-xs">·</span>
            <span className="text-xs text-slate-400">Day {day.day}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{day.focus}</h1>
        </div>

        {/* ── Context grid ─────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-3 mb-6">

          {/* History */}
          {day.historyUnit && day.historyContext && (
            <ContextCard
              icon="🏛️"
              label={`History · Unit ${day.historyUnit}`}
              href={`/curriculum/semester-1/history/unit-${day.historyUnit}`}
              linkLabel={HISTORY_UNIT_TITLES[day.historyUnit]}
            >
              <p className="italic text-slate-600 text-xs leading-relaxed line-clamp-4">
                &ldquo;{day.historyContext}&rdquo;
              </p>
            </ContextCard>
          )}

          {/* Anchor song */}
          {day.anchorSong && (
            <ContextCard
              icon="🎵"
              label="Anchor Song"
              href="/curriculum/semester-1/songs"
              linkLabel={day.anchorSong}
            >
              {day.anchorSongFocus ? (
                <p className="text-slate-700 text-xs leading-relaxed">{day.anchorSongFocus}</p>
              ) : (
                <p className="text-slate-500 text-xs">{day.anchorSong}</p>
              )}
              {day.historicalRef && (
                <a href={`https://www.youtube.com/results?search_query=${ytQuery}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium transition-colors"
                  style={{ color: '#d97706' }}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {day.historicalRef.artist} — {day.historicalRef.track}
                </a>
              )}
            </ContextCard>
          )}

          {/* Curriculum */}
          <ContextCard
            icon="📋"
            label="Curriculum"
            href={`/curriculum/semester-1/core/${day.curriculumSection}`}
            linkLabel={`Month ${day.month}: ${day.phase}`}
          >
            <p className="text-slate-700 text-xs leading-relaxed">
              Week {day.week} of Month {day.month}.{' '}
              {day.phase === 'Stabilize' && 'Building stable form, time, and groove.'}
              {day.phase === 'Vary' && 'Changing one element at a time deliberately.'}
              {day.phase === 'Adapt' && 'Real-time decisions guided by PDC.'}
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Day {day.day} of {day.phase === 'Stabilize' ? '26' : day.phase === 'Vary' ? '52' : '78'} in this phase.
            </p>
          </ContextCard>
        </div>

        {/* ── AMF Systems Today ─────────────────────────────────────── */}
        {day.amfSystems.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">AMF Systems Today</p>
            <div className="flex flex-wrap gap-2">
              {day.amfSystems.map(slug => (
                <Link key={slug}
                  href={`/systems/${slug}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium bg-white transition-all hover:border-amber-400 hover:text-amber-700"
                  style={{ borderColor: '#e2e8f0', color: '#1e293b' }}>
                  {AMF_SYSTEM_LABELS[slug] ?? slug}
                  <span className="text-xs text-slate-400">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Practice Plan ─────────────────────────────────────────── */}
        <div className="mb-6">

          {/* Instrument tabs */}
          <div className="flex gap-2 mb-4">
            {(['guitar', 'piano'] as const).map(inst => (
              <button key={inst}
                onClick={() => setActiveInstrument(inst)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all border"
                style={activeInstrument === inst
                  ? { backgroundColor: '#0f172a', color: '#fff', borderColor: '#0f172a' }
                  : { backgroundColor: '#fff', color: '#64748b', borderColor: '#e2e8f0' }
                }>
                <span>{inst === 'guitar' ? '🎸' : '🎹'}</span>
                <span className="capitalize">{inst}</span>
                <span className="text-xs opacity-60">3 × 15 min</span>
              </button>
            ))}
          </div>

          {/* Sessions */}
          <div>
            {activeInstrument === 'guitar'
              ? day.guitar.map((s, i) => <SessionCard key={i} session={s} index={i} />)
              : day.piano.map((s, i) => <SessionCard key={i} session={s} index={i} />)
            }
          </div>
        </div>

        {/* ── Listening reminder ───────────────────────────────────── */}
        {day.historicalRef && (
          <div className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: '#1e293b', borderColor: '#334155' }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Listen Before or After</p>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sm" style={{ color: '#d97706' }}>{day.historicalRef.artist}</p>
                <p className="text-white text-sm mb-1">&ldquo;{day.historicalRef.track}&rdquo;</p>
                <p className="text-slate-400 text-xs">{day.historicalRef.listenFor}</p>
              </div>
              <a href={`https://www.youtube.com/results?search_query=${ytQuery}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                style={{ backgroundColor: '#d97706', color: '#fff' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Watch
              </a>
            </div>
          </div>
        )}

        {/* ── Mark complete ────────────────────────────────────────── */}
        <button onClick={markComplete} disabled={done}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all mb-4"
          style={done
            ? { backgroundColor: '#16a34a', color: '#fff', cursor: 'default' }
            : { backgroundColor: '#d97706', color: '#fff' }
          }>
          {done ? '✓ Day Complete' : 'Mark Day Complete'}
        </button>

        {/* ── Bottom links ─────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <Link href="/curriculum/semester-1"
            className="py-2 rounded-lg border bg-white hover:border-slate-300 transition-colors text-slate-500"
            style={{ borderColor: '#e2e8f0' }}>
            ← Semester
          </Link>
          <Link href={`/curriculum/semester-1/week/${day.week}`}
            className="py-2 rounded-lg border bg-white hover:border-slate-300 transition-colors text-slate-600 font-medium"
            style={{ borderColor: '#e2e8f0' }}>
            Week {day.week}
          </Link>
          {nextDay ? (
            <Link href={`/curriculum/semester-1/day/${nextDay}`}
              className="py-2 rounded-lg border bg-white hover:border-amber-400 transition-colors font-medium"
              style={{ borderColor: '#e2e8f0', color: '#d97706' }}>
              Day {nextDay} →
            </Link>
          ) : (
            <div className="py-2 rounded-lg border bg-white text-slate-300" style={{ borderColor: '#e2e8f0' }}>
              —
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
