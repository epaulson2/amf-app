'use client'

import type { MelodyAnalysis } from '@/lib/arranger/counterpoint/cantus'

const CADENCE_COLORS: Record<string, string> = {
  'PAC': '#16a34a', 'IAC': '#0891b2', 'HC': '#d97706', 'DC': '#7c3aed', 'none': '#334155',
}

const FORM_DESCRIPTIONS: Record<string, string> = {
  'period': 'Period — antecedent (HC) + consequent (PAC). Classic question-and-answer.',
  'sentence': 'Sentence — basic idea × 2 (presentation) then continuation → cadence.',
  'binary': 'Binary — two contrasting sections.',
  'through-composed': 'Through-composed — continuous development, no repeated sections.',
  'unknown': 'Form undetermined (melody may be too short or irregular).',
}

export default function FormAnalysis({ analysis }: { analysis: MelodyAnalysis | null }) {
  if (!analysis) return null
  const { form, phrases, harmonicRhythm, basicIdea } = analysis

  return (
    <div style={{ marginTop: 20, padding: 16, background: '#0f1629', borderRadius: 8, border: '1px solid #1e293b' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 12 }}>
        Form Analysis
      </div>

      <div style={{ marginBottom: 12 }}>
        <span style={{ background: '#4c1d95', color: '#c4b5fd', padding: '2px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
          {form.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        <p style={{ marginTop: 6, fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 0 }}>
          {FORM_DESCRIPTIONS[form]}
        </p>
      </div>

      {phrases.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>Phrases</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {phrases.map((phrase, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', minWidth: 90 }}>
                  {i === 0 && phrases.length === 2 ? 'Antecedent' :
                   i === 1 && phrases.length === 2 ? 'Consequent' : `Phrase ${i + 1}`}
                </div>
                <div style={{ fontSize: 11, color: '#475569' }}>beats {phrase.start}–{phrase.end}</div>
                {phrase.cadence !== 'none' && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: CADENCE_COLORS[phrase.cadence],
                    background: `${CADENCE_COLORS[phrase.cadence]}22`,
                    padding: '1px 6px', borderRadius: 3,
                  }}>
                    {phrase.cadence}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ fontSize: 11, color: '#475569' }}>
        Harmonic rhythm: <span style={{ color: '#94a3b8', fontWeight: 600 }}>{harmonicRhythm}</span>
        {' · '}
        Basic idea: <span style={{ color: '#94a3b8', fontWeight: 600 }}>{basicIdea.length} notes</span>
      </div>
    </div>
  )
}
