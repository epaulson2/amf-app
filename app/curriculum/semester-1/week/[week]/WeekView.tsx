'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { DayPlan } from '@/lib/curriculum-data'

const SESSION_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Technique: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  Application: { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  Integration: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  Listening: { bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
}

function sessionColors(type: string) {
  return SESSION_TYPE_COLORS[type] ?? { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' }
}

interface WeekViewProps {
  weekNum: number
  days: DayPlan[]
}

export default function WeekView({ weekNum, days }: WeekViewProps) {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())

  useEffect(() => {
    const done = new Set<number>()
    days.forEach((d) => {
      if (localStorage.getItem(`amf_done_day_${d.day}`)) done.add(d.day)
    })
    setCompletedDays(done)
  }, [days])

  const sorted = [...days].sort((a, b) => a.day - b.day)
  const firstDay = sorted[0]

  // Collect unique historical refs across the week
  const historicalRefs = sorted
    .filter((d) => d.historicalRef)
    .map((d) => d.historicalRef!)

  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">
            <Link href="/curriculum" className="hover:text-amber-400 transition-colors">
              Curriculum
            </Link>{' '}
            /{' '}
            <Link
              href="/curriculum/semester-1"
              className="hover:text-amber-400 transition-colors"
            >
              Semester 1
            </Link>{' '}
            / Week {weekNum}
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
            Week {weekNum}
          </h1>
          {firstDay && (
            <p className="text-slate-300 text-sm">
              Month {firstDay.month} — {firstDay.phase}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-slate-400 text-sm">
              {completedDays.size}/{days.length} days complete
            </span>
            <div className="flex-1 max-w-xs bg-slate-700 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${(completedDays.size / days.length) * 100}%`,
                  backgroundColor: '#d97706',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Historical references for the week */}
        {historicalRefs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              This Week&apos;s Historical References
            </h2>
            <div className="flex flex-wrap gap-3">
              {historicalRefs.map((ref, i) => {
                const ytQuery = encodeURIComponent(`${ref.artist} ${ref.track}`)
                return (
                  <a
                    key={i}
                    href={`https://www.youtube.com/results?search_query=${ytQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 border border-slate-700 hover:border-amber-500 transition-all"
                    style={{ backgroundColor: '#1e293b' }}
                  >
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#d97706' }}>
                        {ref.artist}
                      </p>
                      <p className="text-white text-sm font-medium">{ref.track}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Day cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {sorted.map((d) => {
            const isDone = completedDays.has(d.day)
            const guitarPreview = d.guitar.slice(0, 2)
            const pianoPreview = d.piano.slice(0, 2)

            return (
              <Link
                key={d.day}
                href={`/curriculum/semester-1/day/${d.day}`}
                className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition-all overflow-hidden group"
                style={{
                  borderColor: isDone ? '#86efac' : '#e2e8f0',
                }}
              >
                {/* Card header */}
                <div
                  className="px-4 py-3 flex items-center justify-between border-b"
                  style={{
                    backgroundColor: isDone ? '#f0fdf4' : '#f8f7f4',
                    borderColor: isDone ? '#bbf7d0' : '#e2e8f0',
                  }}
                >
                  <div className="flex items-center gap-2">
                    {isDone && (
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-bold text-slate-800 text-sm">Day {d.day}</span>
                  </div>
                  {d.anchorSong && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' }}
                    >
                      🎵 Anchor
                    </span>
                  )}
                </div>

                {/* Focus */}
                <div className="px-4 pt-3 pb-2">
                  <p className="text-slate-800 font-medium text-sm leading-snug mb-3 group-hover:text-amber-700 transition-colors">
                    {d.focus}
                  </p>

                  {/* Session previews */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                        Guitar
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {guitarPreview.map((s, i) => {
                          const c = sessionColors(s.type)
                          return (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                            >
                              {s.type}
                            </span>
                          )
                        })}
                        {d.guitar.length > 2 && (
                          <span className="text-xs text-slate-400">+{d.guitar.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                        Piano
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pianoPreview.map((s, i) => {
                          const c = sessionColors(s.type)
                          return (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                            >
                              {s.type}
                            </span>
                          )
                        })}
                        {d.piano.length > 2 && (
                          <span className="text-xs text-slate-400">+{d.piano.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-3 pt-1">
                  <span
                    className="text-xs font-medium transition-colors"
                    style={{ color: '#d97706' }}
                  >
                    Start day →
                  </span>
                </div>
              </Link>
            )
          })}

          {/* Free play card */}
          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}
          >
            <p className="font-bold text-amber-900 text-sm mb-1">Free Play Day ↺</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              No structured sessions — revisit what challenged you this week, improvise freely, or play
              just for fun. Let the concepts breathe.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {weekNum > 1 ? (
            <Link
              href={`/curriculum/semester-1/week/${weekNum - 1}`}
              className="text-sm font-medium hover:underline transition-colors"
              style={{ color: '#d97706' }}
            >
              ← Week {weekNum - 1}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/curriculum/semester-1"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            Semester overview
          </Link>
          {weekNum < 12 ? (
            <Link
              href={`/curriculum/semester-1/week/${weekNum + 1}`}
              className="text-sm font-medium hover:underline transition-colors"
              style={{ color: '#d97706' }}
            >
              Week {weekNum + 1} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}
