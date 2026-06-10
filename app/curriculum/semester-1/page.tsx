'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { curriculum, getWeek } from '@/lib/curriculum-data'
import type { DayPlan } from '@/lib/curriculum-data'

const MONTHS = [
  { id: 1, label: 'Month 1: Stabilize', weeks: [1, 2, 3, 4] },
  { id: 2, label: 'Month 2: Vary', weeks: [5, 6, 7, 8] },
  { id: 3, label: 'Month 3: Adapt', weeks: [9, 10, 11, 12] },
]

function getWeekDays(weekNum: number): DayPlan[] {
  return curriculum.filter((d) => d.week === weekNum)
}

function getWeekTheme(weekNum: number): string {
  const days = getWeekDays(weekNum)
  if (days.length === 0) return ''
  return days[0].focus
}

function getWeekDayRange(weekNum: number): { start: number; end: number } {
  const days = getWeekDays(weekNum).map((d) => d.day).sort((a, b) => a - b)
  if (days.length === 0) return { start: 0, end: 0 }
  return { start: days[0], end: days[days.length - 1] }
}

export default function Semester1Page() {
  const [activeMonth, setActiveMonth] = useState(1)
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())

  useEffect(() => {
    const done = new Set<number>()
    for (let n = 1; n <= 78; n++) {
      if (localStorage.getItem(`amf_done_day_${n}`)) done.add(n)
    }
    setCompletedDays(done)
  }, [])

  const totalDays = 78
  const progressPct = Math.round((completedDays.size / totalDays) * 100)

  const activeMonthData = MONTHS.find((m) => m.id === activeMonth)!

  return (
    <div style={{ backgroundColor: '#f8f7f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-slate-400 text-sm mb-2">
            <Link href="/curriculum" className="hover:text-amber-400 transition-colors">
              Curriculum
            </Link>{' '}
            / Semester 1
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
            Semester 1 — The 12-Bar Laboratory
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-300 text-sm">
            <span>12 weeks</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span>78 practice days</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span>3 anchor songs</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span>2 instruments</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span>~90 min/day</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Course sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            { href: '/curriculum/semester-1/core', label: 'Core Curriculum', sub: '5 sections', icon: '📋' },
            { href: '/curriculum/semester-1/history', label: 'History', sub: '4 units', icon: '🏛️' },
            { href: '/curriculum/semester-1/guitar', label: 'Guitar Track', sub: '4 sections', icon: '🎸' },
            { href: '/curriculum/semester-1/piano', label: 'Piano Track', sub: '4 sections', icon: '🎹' },
            { href: '/curriculum/semester-1/progress', label: 'Progress', sub: '3 sections', icon: '📈' },
            { href: '/curriculum/semester-1/songs', label: 'Anchor Songs', sub: 'Lead sheets', icon: '🎵' },
          ].map(({ href, label, sub, icon }) => (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl border text-center text-sm font-medium transition-all hover:border-amber-400 hover:bg-white bg-white"
              style={{ borderColor: '#e2e8f0', color: '#1e293b' }}>
              <span className="text-xl">{icon}</span>
              <span className="font-semibold">{label}</span>
              <span className="text-xs text-slate-400">{sub}</span>
            </Link>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Your progress
            </span>
            <span className="text-sm text-slate-500">
              {completedDays.size} / {totalDays} days ({progressPct}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                backgroundColor: progressPct === 100 ? '#16a34a' : '#d97706',
              }}
            />
          </div>
        </div>

        {/* Month tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {MONTHS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMonth(m.id)}
              className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                activeMonth === m.id
                  ? { backgroundColor: '#d97706', color: '#fff' }
                  : { backgroundColor: '#e2e8f0', color: '#475569' }
              }
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Week grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {activeMonthData.weeks.map((weekNum) => {
            const days = getWeekDays(weekNum)
            const theme = getWeekTheme(weekNum)
            const { start, end } = getWeekDayRange(weekNum)

            if (days.length === 0) return null

            return (
              <div
                key={weekNum}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Week header */}
                <div
                  className="px-4 py-3 border-b border-slate-100"
                  style={{ backgroundColor: '#0f172a' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm">
                      Week {weekNum}
                    </span>
                    <span className="text-slate-400 text-xs">
                      Days {start}–{end + 1}
                    </span>
                  </div>
                  {theme && (
                    <p className="text-slate-300 text-xs mt-1 line-clamp-1">
                      {theme}
                    </p>
                  )}
                </div>

                {/* Day links */}
                <div className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {days
                      .sort((a, b) => a.day - b.day)
                      .map((d) => {
                        const done = completedDays.has(d.day)
                        return (
                          <Link
                            key={d.day}
                            href={`/curriculum/semester-1/day/${d.day}`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all border"
                            style={
                              done
                                ? {
                                    backgroundColor: '#f0fdf4',
                                    borderColor: '#86efac',
                                    color: '#16a34a',
                                  }
                                : {
                                    backgroundColor: '#f8f7f4',
                                    borderColor: '#e2e8f0',
                                    color: '#1e293b',
                                  }
                            }
                            title={d.focus}
                          >
                            {done && (
                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            Day {d.day}
                          </Link>
                        )
                      })}

                    {/* Free play day */}
                    <span
                      className="px-3 py-1.5 rounded-md text-sm border"
                      style={{
                        backgroundColor: '#fef3c7',
                        borderColor: '#fde68a',
                        color: '#92400e',
                      }}
                    >
                      Free Play ↺
                    </span>
                  </div>
                </div>

                {/* Week link */}
                <div className="px-4 pb-3">
                  <Link
                    href={`/curriculum/semester-1/week/${weekNum}`}
                    className="text-xs font-medium transition-colors hover:underline"
                    style={{ color: '#d97706' }}
                  >
                    View week overview →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
