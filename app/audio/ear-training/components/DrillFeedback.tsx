'use client'

import { useEffect, useState } from 'react'

export interface DrillStats {
  total: number
  correct: number
  streak: number
  byBracket: Record<number, { correct: number; total: number }>
}

interface DrillFeedbackProps {
  stats: DrillStats
  lastResult: { correct: boolean; hint: string; correctBracket: number } | null
}

export function emptyStats(): DrillStats {
  return { total: 0, correct: 0, streak: 0, byBracket: {} }
}

export function persistStats(sprint: number, stats: DrillStats) {
  try {
    const key = `amf-drill-sprint-${sprint}`
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push({ date: new Date().toISOString(), ...stats })
    localStorage.setItem(key, JSON.stringify(existing.slice(-30)))
  } catch {}
}

export default function DrillFeedback({ stats, lastResult }: DrillFeedbackProps) {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null

  return (
    <div className="space-y-3">
      {/* Live stats bar */}
      <div className="flex items-center gap-4 rounded-lg px-4 py-3" style={{ background: '#1e293b' }}>
        <div className="text-center">
          <div className="font-bold text-lg" style={{ color: '#f1f5f9' }}>
            {accuracy !== null ? `${accuracy}%` : '—'}
          </div>
          <div className="text-xs" style={{ color: '#64748b' }}>Accuracy</div>
        </div>
        <div style={{ width: 1, height: 32, background: '#334155' }} />
        <div className="text-center">
          <div className="font-bold text-lg" style={{ color: '#f59e0b' }}>{stats.streak}</div>
          <div className="text-xs" style={{ color: '#64748b' }}>Streak</div>
        </div>
        <div style={{ width: 1, height: 32, background: '#334155' }} />
        <div className="text-center">
          <div className="font-bold text-lg" style={{ color: '#f1f5f9' }}>{stats.total}</div>
          <div className="text-xs" style={{ color: '#64748b' }}>Answered</div>
        </div>
        {stats.total >= 10 && accuracy !== null && (
          <>
            <div style={{ width: 1, height: 32, background: '#334155' }} />
            <div className="flex-1">
              <div style={{ height: 6, background: '#0f172a', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${accuracy}%`,
                    background: accuracy >= 80 ? '#16a34a' : accuracy >= 60 ? '#d97706' : '#dc2626',
                    borderRadius: 3,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Last result feedback */}
      {lastResult && (
        <div
          className="rounded-lg px-4 py-3"
          style={{
            background: lastResult.correct ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)',
            border: `1px solid ${lastResult.correct ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.3)'}`,
          }}
        >
          <p className="font-bold text-sm mb-1" style={{ color: lastResult.correct ? '#4ade80' : '#f87171' }}>
            {lastResult.correct ? `✓ Correct — [{lastResult.correctBracket}]` : `✗ That was [${lastResult.correctBracket}]`}
          </p>
          <p className="text-sm" style={{ color: '#94a3b8', lineHeight: 1.5 }}>
            {lastResult.hint}
          </p>
        </div>
      )}
    </div>
  )
}
