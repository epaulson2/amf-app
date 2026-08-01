'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTEXTS = [
  {
    id: 'jazz-group',
    label: 'Jazz Ensemble',
    description: 'Playing in a jazz band or combo — others handle bass and rhythm',
  },
  {
    id: 'jazz-trio',
    label: 'Jazz Trio',
    description: 'Guitar/bass/piano or similar — more harmonic responsibility than in a full band',
  },
  {
    id: 'solo-jazz',
    label: 'Solo Jazz Guitar',
    description: 'Self-contained solo playing — bass, chords, and melody all at once',
  },
  {
    id: 'solo-classical',
    label: 'Solo Classical Guitar',
    description: 'Symphonic or classical solo guitar — counterpoint, baroque through modern',
  },
  {
    id: 'accompany',
    label: 'Accompanist',
    description: 'Supporting vocalists or other solo instruments',
  },
  {
    id: 'songwriting',
    label: 'Songwriter / Composer',
    description: 'Writing original music — harmony and voice leading in service of composition',
  },
  {
    id: 'duos',
    label: 'Duos',
    description: 'Guitar paired with one other instrument — shared harmonic responsibility',
  },
  {
    id: 'studio',
    label: 'Studio / Big Band',
    description: 'Session playing, big band charts, reading and adapting quickly',
  },
]

const INTERESTS = [
  {
    id: 'improvising',
    label: 'Improvising',
    description: 'Real-time harmonic choices in the moment — what Greene called "the ultimate goal"',
  },
  {
    id: 'composing',
    label: 'Composing',
    description: 'Building pieces with intention — working out every voice and motion',
  },
  {
    id: 'arranging',
    label: 'Arranging',
    description: 'Taking existing music and reimagining it for guitar',
  },
  {
    id: 'performing',
    label: 'Performing',
    description: 'Polished interpretation and delivery — touch, tone, and expression',
  },
]

const STYLES = [
  {
    id: 'jazz',
    label: 'Primarily jazz',
    description: 'Standards, bebop, chord melody, modern jazz',
  },
  {
    id: 'classical',
    label: 'Classical / baroque',
    description: 'Bach through 20th-century — counterpoint, impressionism, extended techniques',
  },
  {
    id: 'both',
    label: 'Both equally',
    description: 'Greene himself moved freely between all of these',
  },
  {
    id: 'open',
    label: 'Still exploring',
    description: "Not sure yet — show me the full picture",
  },
]

// ─── Study Areas ──────────────────────────────────────────────────────────────

type Pillar = 'foundation' | 'voicing' | 'harmony' | 'applied'

type StudyArea = {
  id: string
  label: string
  pillar: Pillar
  priority: 'universal' | 'core' | 'specialized'
  contexts: string[] | 'all'
  description: string
  firstStep: string
}

const STUDY_AREAS: StudyArea[] = [
  // Universal — checked for ALL goals in Greene's 1976 matrix
  {
    id: 'basic-tonality',
    label: 'Basic Concepts of Tonality',
    pillar: 'foundation',
    priority: 'universal',
    contexts: 'all',
    description:
      'Chord construction, key relationships, diatonic function. The foundational rules of tonal harmony. Greene checked this for every single musical goal in his 1976 matrix — no exceptions.',
    firstStep: 'Fundamentals — Chord Construction (Formulas) + Chord Construction Quiz',
  },
  {
    id: 'v-system',
    label: 'V-System (Systematic Inversions)',
    pillar: 'voicing',
    priority: 'universal',
    contexts: 'all',
    description:
      "Greene's taxonomy of all four-note chords into 14 voicing groups (V-1 through V-14). The universal map of every chord shape on the neck. Greene called this \"Systematic Inversions\" in 1976 — checked for ALL goals. Without this, you know what chord to play but not where to find it in the moment.",
    firstStep: 'V-System — start with James Hober\'s 29-document structured explication',
  },
  {
    id: 'ear-training',
    label: 'Ear Training',
    pillar: 'foundation',
    priority: 'universal',
    contexts: 'all',
    description:
      'Interval recognition, chord quality recognition, voice movement detection. Checked for ALL goals. Runs alongside every other study area from day one — not a separate phase.',
    firstStep: 'The "for taping" method: record rhythm tracks and comp over them. Start this immediately.',
  },
  {
    id: 'mental-practice',
    label: 'Mental Practice',
    pillar: 'foundation',
    priority: 'universal',
    contexts: 'all',
    description:
      'Silent fingerboard visualization, audiation of progressions, slow-motion internal replay. Checked for ALL goals. How the V-System becomes intuitive rather than looked up.',
    firstStep: 'Practice chord shapes and voicings away from the guitar — mental visualization daily.',
  },
  {
    id: 'rhythmic-development',
    label: 'Rhythmic Transitions',
    pillar: 'foundation',
    priority: 'universal',
    contexts: 'all',
    description:
      'Fluency across rhythmic feels: sustained vs. active comping, rubato vs. in-tempo, metric displacement. Checked for ALL goals. Develops naturally through the "for taping" practice method.',
    firstStep: 'Record rhythm tracks and practice comping over them with sustained tones first, then rhythmic variations.',
  },

  // Jazz-specific
  {
    id: 'jazz-tonality',
    label: 'Jazz Harmonic Grammar',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['jazz-group', 'jazz-trio', 'solo-jazz', 'accompany', 'studio'],
    description:
      'II-V-I, tritone substitution, back-cycling, chord extensions, secondary dominants. The harmonic vocabulary of jazz — how tensions want to resolve, how substitutions work, what drives the ear forward.',
    firstStep: 'Harmony & Theory — Chord Progressions (diatonic, secondary dominant, tritone substitution)',
  },
  {
    id: 'comping',
    label: 'Comping Technique',
    pillar: 'applied',
    priority: 'core',
    contexts: ['jazz-group', 'jazz-trio', 'accompany'],
    description:
      "Rhythmic and harmonic accompaniment over jazz standards. Greene's comping sheets are organized by standard song and V-System group — once you learn V-1 voicings, you immediately comp 'Autumn Leaves' using only V-1 on the top 4 strings.",
    firstStep: 'Comping section — pick one standard, learn V-1 voicings for it on one string set.',
  },

  // Classical/baroque
  {
    id: 'baroque-tonality',
    label: 'Baroque Tonality',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['solo-classical', 'accompany', 'duos'],
    description:
      "The harmonic language of Bach and the Baroque era: cycle-of-4ths progressions, characteristic bass movement, pedal points, diatonic inversions. Greene taught this as an improvisation grammar — the goal is to think and hear in it in real time, not to reproduce notation.",
    firstStep: 'Baroque — Baroque Practice Program (1975), then 1-to-1 counterpoint types',
  },
  {
    id: 'counterpoint',
    label: 'Counterpoint (Moving Voices)',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['solo-classical', 'solo-jazz', 'songwriting', 'duos'],
    description:
      'In Greene\'s framework, counterpoint is one of harmony\'s tools — not a separate discipline. "The addition of moving voices" was how he described it in Musical Priorities. Taught through baroque study but applied across all styles.',
    firstStep: "Baroque — 1-to-1 and 2-to-1 counterpoint. Read Musical Priorities (1976) for framing.",
  },

  // Both / most contexts
  {
    id: '20th-century-modern',
    label: '20th Century Modern Techniques',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['solo-classical', 'solo-jazz', 'songwriting', 'duos', 'jazz-trio'],
    description:
      "Triads & bass in contrary motion, modern counterpoint, 20th-century diatonic contrary patterns. Greene placed this in the \"Modern\" section of his 1976 matrix — distinct from baroque but equally studied. Not a Baroque extension — a parallel track.",
    firstStep: 'Baroque section — Modern Counterpoint Studies (1978), 20th Century Diatonic Contrary Patterns (1979)',
  },
  {
    id: 'impressionism',
    label: 'Impressionism & Extended Harmony',
    pillar: 'harmony',
    priority: 'specialized',
    contexts: ['solo-classical', 'solo-jazz', 'songwriting'],
    description:
      'Whole-tone systems, parallel voicing, chromatic harmony influenced by Ravel and Debussy. Greene heard the connection between impressionism and jazz harmony clearly — both resist strong resolution.',
    firstStep: 'Harmony & Theory — Impressionism material',
  },
  {
    id: 'modal-harmony',
    label: 'Modal Harmony',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['solo-jazz', 'songwriting', 'duos', 'accompany', 'jazz-trio'],
    description:
      'Dorian, Aeolian, Mixolydian, Lydian as harmonic environments — not just "which scale over which chord" but understanding the characteristic progressions and tensions within each mode.',
    firstStep: 'Fundamentals — Dorian Tonality (1986), Aeolian Flavors, Mixolydian Chord Progressions for Taping',
  },
  {
    id: 'tonality-transitions',
    label: 'Tonality Transitions',
    pillar: 'harmony',
    priority: 'specialized',
    contexts: ['solo-classical', 'solo-jazz', 'songwriting', 'duos', 'accompany'],
    description:
      'Moving between tonal systems within a piece — from baroque to jazz to modal to impressionist without the seam feeling jarring. This is the advanced integration of all harmonic study. Greene listed it for most musical goals.',
    firstStep: 'Requires solid ground in at least two tonal systems. Harmony & Theory — Tonality material.',
  },
  {
    id: 'chord-melody',
    label: 'Chord Melody & Arrangement',
    pillar: 'applied',
    priority: 'core',
    contexts: ['solo-jazz', 'solo-classical', 'songwriting'],
    description:
      "Presenting melody with full harmonic accompaniment as a single guitarist. Greene's Arrangements section contains his complete solo guitar arrangements — study them as models for how voicing and melody interact.",
    firstStep: "From Students — My Notes on Ted Greene (Tomás Campbell). Then Arrangements section for models.",
  },
  {
    id: 'modulation',
    label: 'Modulation Techniques',
    pillar: 'harmony',
    priority: 'core',
    contexts: ['solo-classical', 'solo-jazz', 'songwriting', 'duos', 'accompany', 'jazz-trio'],
    description:
      'Moving between keys: diatonic pivot, chromatic, enharmonic, and abrupt modulation. Covered in both Harmony & Theory and the Baroque sections — the two treatments complement each other.',
    firstStep: 'Harmony & Theory — Modulation section. Baroque — Secondary chord "openers" and modulation schemes.',
  },
]

// ─── Result Generation ────────────────────────────────────────────────────────

function generateResults(contexts: string[], interests: string[], style: string) {
  const universal = STUDY_AREAS.filter((a) => a.contexts === 'all')

  const matched = STUDY_AREAS.filter((a) => a.contexts !== 'all')
    .map((a) => {
      const aCtx = a.contexts as string[]
      const count = contexts.filter((c) => aCtx.includes(c)).length
      return { area: a, count }
    })
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .map(({ area }) => area)

  const jazzCtx = ['jazz-group', 'jazz-trio', 'solo-jazz', 'studio']
  const classCtx = ['solo-classical', 'duos']
  const hasJazz = contexts.some((c) => jazzCtx.includes(c)) || style === 'jazz' || style === 'both'
  const hasClassical = contexts.some((c) => classCtx.includes(c)) || style === 'classical' || style === 'both'
  const isImproviser = interests.includes('improvising')

  const firstSteps = [
    'Stage 1 — Fingerboard: Know every note name in every position. Greene taught 5 overlapping areas of the neck, not CAGED positions.',
    'Stage 2 — Chord Construction: Know every chord quality formula (maj7, m7, dom7, m7b5, dim7). Build from any root. No chart dependency.',
    'Stage 3 — String Transference: Move the same voicing across all three string sets (top 4, middle 4, bottom 4).',
  ]

  if (hasJazz && hasClassical) {
    firstSteps.push('V-System — V-1 and V-2 first. These unlock both comping and early baroque application.')
    firstSteps.push('Harmony Foundations — Diatonic progressions, II-V-I, secondary dominants. Build grammar before specializing.')
  } else if (hasClassical) {
    firstSteps.push('V-System — V-1 and V-2. Voicing navigation is required before baroque work is possible.')
    firstSteps.push('Baroque Entry — Baroque Practice Program (1975), then 1-to-1 counterpoint, then bass harmonization.')
  } else if (hasJazz) {
    firstSteps.push('V-System — V-1 and V-2, then immediately apply by comping standards using only those voicings.')
    firstSteps.push('Jazz Harmony — II-V-I, diatonic harmony, tritone substitution. The jazz harmonic grammar.')
  } else {
    firstSteps.push('V-System — V-1 through V-6 are the core voicing vocabulary.')
    firstSteps.push('Harmony — Diatonic progressions, progressions by type, modulation basics.')
  }

  if (isImproviser) {
    firstSteps.push(
      'Ear Training (ongoing) — The "for taping" method starts now. Record tracks, comp over them. Improvisation readiness is built one honest listen at a time.',
    )
  }

  let profileLabel = 'General musicianship'
  if (hasJazz && hasClassical) profileLabel = 'Jazz + Classical — full Greene path'
  else if (hasClassical) profileLabel = 'Classical / solo guitar path'
  else if (hasJazz) profileLabel = 'Jazz guitar path'

  return { universal, matched, firstSteps, profileLabel }
}

// ─── Styling helpers ──────────────────────────────────────────────────────────

const PILLAR_COLORS: Record<Pillar, string> = {
  foundation: '#0891b2',
  voicing: '#7c3aed',
  harmony: '#d97706',
  applied: '#16a34a',
}

const PILLAR_LABELS: Record<Pillar, string> = {
  foundation: 'Foundation',
  voicing: 'V-System',
  harmony: 'Harmony',
  applied: 'Applied',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SelectCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-xl p-4 transition-all"
      style={{
        background: selected ? 'rgba(217,119,6,0.10)' : '#1e293b',
        border: `1px solid ${selected ? '#d97706' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center"
          style={{
            borderColor: selected ? '#d97706' : '#475569',
            background: selected ? '#d97706' : 'transparent',
          }}
        >
          {selected && (
            <svg className="w-2.5 h-2.5" viewBox="0 0 12 10" fill="none">
              <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: selected ? '#fbbf24' : '#f1f5f9' }}>
            {label}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}

function RadioCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full rounded-xl p-4 transition-all"
      style={{
        background: selected ? 'rgba(217,119,6,0.10)' : '#1e293b',
        border: `1px solid ${selected ? '#d97706' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: selected ? '#d97706' : '#475569' }}
        >
          {selected && (
            <div className="w-2 h-2 rounded-full" style={{ background: '#d97706' }} />
          )}
        </div>
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: selected ? '#fbbf24' : '#f1f5f9' }}>
            {label}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}

function AreaCard({ area }: { area: StudyArea }) {
  const color = PILLAR_COLORS[area.pillar]
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <p className="font-semibold text-sm" style={{ color: '#f1f5f9' }}>
          {area.label}
        </p>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ background: `${color}22`, color }}
        >
          {PILLAR_LABELS[area.pillar]}
        </span>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: '#94a3b8' }}>
        {area.description}
      </p>
      <p className="text-xs font-medium" style={{ color: '#475569' }}>
        Start:{' '}
        <span style={{ color: '#64748b' }}>{area.firstStep}</span>
      </p>
    </div>
  )
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

const STEPS = ['Context', 'Interests', 'Style', 'Results']

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [contexts, setContexts] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [style, setStyle] = useState('')

  function toggleContext(id: string) {
    setContexts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function canAdvance() {
    if (step === 0) return contexts.length > 0
    if (step === 1) return interests.length > 0
    if (step === 2) return style !== ''
    return true
  }

  const results = step === 3 ? generateResults(contexts, interests, style) : null

  return (
    <main>
      {/* Header */}
      <div style={{ background: '#0f172a' }}>
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-8">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#d97706,#b45309)', borderRadius: 2, marginBottom: 28 }} />
          <Link href="/ted-greene" className="text-xs font-bold tracking-widest uppercase mb-2 block hover:opacity-70 transition-opacity" style={{ color: '#d97706' }}>
            Ted Greene System
          </Link>
          <h1 className="font-bold mb-2" style={{ color: '#f1f5f9', fontSize: '2rem', lineHeight: 1.2 }}>
            Student Assessment
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Based on the four questions Greene asked every new student. Answer them to get a
            personalized study map drawn from his 1976 Musical Goals matrix.
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-3xl mx-auto px-6 pb-4">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: i === step ? 'rgba(217,119,6,0.15)' : i < step ? 'rgba(22,163,74,0.12)' : 'rgba(255,255,255,0.04)',
                    color: i === step ? '#fbbf24' : i < step ? '#4ade80' : '#475569',
                  }}
                >
                  {i < step ? (
                    <svg className="w-3 h-3" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span style={{ opacity: 0.7 }}>{i + 1}</span>
                  )}
                  {s}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-4 h-px" style={{ background: i < step ? '#16a34a44' : 'rgba(255,255,255,0.08)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* ── Step 0: Context ── */}
        {step === 0 && (
          <div>
            <h2 className="font-bold mb-1" style={{ color: '#f1f5f9', fontSize: '1.3rem' }}>
              What do you want to do with music?
            </h2>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              Select all that apply — Greene used this to understand what kind of player you wanted to become.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTEXTS.map((c) => (
                <SelectCard
                  key={c.id}
                  label={c.label}
                  description={c.description}
                  selected={contexts.includes(c.id)}
                  onClick={() => toggleContext(c.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Interests ── */}
        {step === 1 && (
          <div>
            <h2 className="font-bold mb-1" style={{ color: '#f1f5f9', fontSize: '1.3rem' }}>
              Which areas interest you most?
            </h2>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              Greene&apos;s fourth question: &ldquo;Are you drawn to improvising, composing, arranging, performing, or interpretation?&rdquo; Select all that apply.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERESTS.map((i) => (
                <SelectCard
                  key={i.id}
                  label={i.label}
                  description={i.description}
                  selected={interests.includes(i.id)}
                  onClick={() => toggleInterest(i.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Style ── */}
        {step === 2 && (
          <div>
            <h2 className="font-bold mb-1" style={{ color: '#f1f5f9', fontSize: '1.3rem' }}>
              Any style focus?
            </h2>
            <p className="mb-6 text-sm" style={{ color: '#64748b' }}>
              Greene&apos;s third question: &ldquo;Do you want to specialize in any particular style?&rdquo; This helps us weight the study areas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STYLES.map((s) => (
                <RadioCard
                  key={s.id}
                  label={s.label}
                  description={s.description}
                  selected={style === s.id}
                  onClick={() => setStyle(s.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === 3 && results && (
          <div>
            <div
              className="rounded-xl p-5 mb-8"
              style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.25)' }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#d97706' }}>
                Your Path
              </p>
              <p className="font-bold text-lg" style={{ color: '#fbbf24' }}>
                {results.profileLabel}
              </p>
              <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                Study map drawn from Greene&apos;s 1976 <em>Musical Goals and Necessary Areas of Study</em> matrix.
              </p>
            </div>

            {/* First steps */}
            <div className="mb-8">
              <h2 className="font-bold mb-4" style={{ color: '#f1f5f9', fontSize: '1.15rem' }}>
                Where to start
              </h2>
              <div className="space-y-3">
                {results.firstSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706' }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Universal areas */}
            <div className="mb-8">
              <h2 className="font-bold mb-1" style={{ color: '#f1f5f9', fontSize: '1.15rem' }}>
                Universal foundation
              </h2>
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                Checked for <em>every</em> musical goal in Greene&apos;s 1976 matrix. These run alongside all other study.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.universal.map((area) => (
                  <AreaCard key={area.id} area={area} />
                ))}
              </div>
            </div>

            {/* Matched areas */}
            {results.matched.length > 0 && (
              <div className="mb-8">
                <h2 className="font-bold mb-1" style={{ color: '#f1f5f9', fontSize: '1.15rem' }}>
                  Recommended for your goals
                </h2>
                <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                  These areas matched your selected musical contexts, sorted by relevance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.matched.map((area) => (
                    <AreaCard key={area.id} area={area} />
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div
              className="rounded-xl p-5 mt-6"
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: '#f1f5f9' }}>
                Go deeper
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/epaulson2/amf-app/blob/main/docs/ted-greene-learning-sequence.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#d97706' }}
                >
                  Full 14-stage learning sequence &rarr;
                </a>
                <a
                  href="https://tedgreene.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: '#64748b' }}
                >
                  tedgreene.com — the complete archive &rarr;
                </a>
              </div>
            </div>

            <button
              onClick={() => { setStep(0); setContexts([]); setInterests([]); setStyle('') }}
              className="mt-6 text-sm hover:opacity-70 transition-opacity"
              style={{ color: '#475569' }}
            >
              Start over
            </button>
          </div>
        )}

        {/* Nav buttons */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-sm px-4 py-2 rounded-lg transition-colors"
              style={{
                background: step === 0 ? 'transparent' : 'rgba(255,255,255,0.06)',
                color: step === 0 ? 'transparent' : '#94a3b8',
                cursor: step === 0 ? 'default' : 'pointer',
              }}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={!canAdvance()}
              className="text-sm px-5 py-2 rounded-lg font-semibold transition-all"
              style={{
                background: canAdvance() ? '#d97706' : 'rgba(255,255,255,0.06)',
                color: canAdvance() ? 'white' : '#475569',
                cursor: canAdvance() ? 'pointer' : 'default',
              }}
            >
              {step === 2 ? 'See my study map' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
