'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { DADGAD, STANDARD, SAMPLE_MELODIES, makeChordEvent } from '@/lib/arranger'
import type { Tuning, ChordEvent, Arrangement, ArrangementMode, NoteEvent, VoiceType } from '@/lib/arranger'
import ChordEditor from '@/components/arranger/ChordEditor'
import { parseAbc } from '@/lib/arranger/abc-parser'
import { toAlphaTex } from '@/lib/arranger'
import { saveArrangement } from '@/lib/arranger/library'
import type { SavedArrangement } from '@/lib/arranger/library'

const AlphaTabViewer = dynamic(() => import('@/components/arranger/AlphaTabViewer'), { ssr: false })
const AiCollaborator = dynamic(() => import('@/components/arranger/AiCollaborator'), { ssr: false })

const TUNINGS: Record<string, Tuning> = { DADGAD, Standard: STANDARD }

const VOICE_CONFIG: { value: VoiceType; label: string; color: string }[] = [
  { value: 'melody', label: 'Melody',  color: '#0891b2' },
  { value: 'bass',   label: 'Bass',    color: '#16a34a' },
  { value: 'inner',  label: 'Inner',   color: '#d97706' },
  { value: 'drone',  label: 'Drone',   color: '#7c3aed' },
]

const ALL_VOICES = new Set<VoiceType>(['melody', 'bass', 'inner', 'drone'])

const DEFAULT_ABC = `X:1
T:My Melody
M:4/4
L:1/8
Q:1/4=100
K:G
"G"GABG "Em"EFGE|"C"CDEF "D"DEFG|"G"G4 z4|]`

const CHORD_MODES: { value: ArrangementMode; label: string; description: string; color: string }[] = [
  { value: 'simple',    label: 'Melody + Bass',            description: 'Sparse, clear texture',            color: '#0891b2' },
  { value: 'drone',     label: 'Melody + Drone + Bass',    description: 'Open strings ring through',        color: '#7c3aed' },
  { value: 'harmonic',  label: 'Melody + Bass + Inner',    description: 'Three-voice chord texture',        color: '#d97706' },
  { value: 'voice-led', label: 'Full Texture',             description: 'All voices, smooth voice-leading', color: '#16a34a' },
]

const COUNTERPOINT_MODES: { value: ArrangementMode; label: string; description: string; color: string }[] = [
  { value: 'first-species',    label: '1st Species',        description: 'One bass note per melody — always consonant',       color: '#0891b2' },
  { value: 'second-species',   label: '2nd Species',        description: 'Two bass notes per melody — passing tones',         color: '#16a34a' },
  { value: 'free-counterpoint',label: 'Free Counterpoint',  description: 'Form-aware mix of species with cadence suspensions', color: '#7c3aed' },
  { value: 'imitation',        label: 'Imitation',          description: 'Inner voice echoes the melody motif at a delay',    color: '#d97706' },
]

const ALL_MODES = [...CHORD_MODES, ...COUNTERPOINT_MODES]

type SampleKey = keyof typeof SAMPLE_MELODIES | 'custom'

export default function ArrangerPage() {
  const [tuningKey, setTuningKey]       = useState<string>('DADGAD')
  const [sampleKey, setSampleKey]       = useState<SampleKey>('danny-boy')
  const [chords, setChords]             = useState<ChordEvent[]>(() =>
    SAMPLE_MELODIES['danny-boy'].chords
  )
  const [abcText, setAbcText]           = useState<string>(DEFAULT_ABC)
  const [abcError, setAbcError]         = useState<string | null>(null)
  const [selectedModes, setSelectedModes] = useState<Set<ArrangementMode>>(
    new Set(['simple', 'drone', 'harmonic'])
  )
  const [arrangements, setArrangements] = useState<Arrangement[]>([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [activeArrangement, setActiveArrangement] = useState<number>(0)
  const [selectedVoices, setSelectedVoices] = useState<Set<VoiceType>>(new Set(ALL_VOICES))
  const [savedConfirm, setSavedConfirm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const pending = sessionStorage.getItem('amf-load-arrangement')
    if (pending) {
      sessionStorage.removeItem('amf-load-arrangement')
      try {
        const saved = JSON.parse(pending) as SavedArrangement
        setTuningKey(saved.tuningKey)
        setChords(saved.chords)
        setArrangements([saved.arrangement])
        setActiveArrangement(0)
        if (saved.abcText) { setSampleKey('custom'); setAbcText(saved.abcText) }
      } catch { /* ignore malformed entry */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleVoice = useCallback((v: VoiceType) => {
    setSelectedVoices(prev => {
      if (prev.has(v) && prev.size === 1) return prev
      const next = new Set(prev)
      next.has(v) ? next.delete(v) : next.add(v)
      return next
    })
  }, [])

  const handleSampleChange = useCallback((key: SampleKey) => {
    setSampleKey(key)
    setArrangements([])
    setAbcError(null)
    if (key !== 'custom') {
      setChords(SAMPLE_MELODIES[key as keyof typeof SAMPLE_MELODIES].chords)
    }
  }, [])

  const toggleMode = useCallback((mode: ArrangementMode) => {
    setSelectedModes(prev => {
      const next = new Set(prev)
      if (next.has(mode)) { if (next.size > 1) next.delete(mode) }
      else next.add(mode)
      return next
    })
  }, [])

  const handleGenerate = useCallback(async () => {
    const tuning = TUNINGS[tuningKey]
    let melody: NoteEvent[]
    let requestChords = chords
    let title = 'Arrangement'
    let tempo = 84
    let timeSignature: [number, number] = [4, 4]

    setLoading(true)
    setError(null)
    setAbcError(null)
    setArrangements([])

    if (sampleKey === 'custom') {
      try {
        const parsed = await parseAbc(abcText)
        melody = parsed.melody
        requestChords = parsed.chords.length > 0 ? parsed.chords : chords
        title = parsed.title
        tempo = parsed.tempo
        timeSignature = parsed.timeSignature
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to parse ABC'
        setAbcError(msg)
        setLoading(false)
        return
      }
    } else {
      const sample = SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES]
      melody = sample.melody
      title = sample.label
    }

    try {
      const res = await fetch('/api/arrange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ melody, chords: requestChords, tuning, modes: [...selectedModes], title, tempo, timeSignature }),
      })

      const data = await res.json()
      if (data.error) { setError(data.error); return }

      setArrangements(data.arrangements ?? [])
      setActiveArrangement(0)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }, [sampleKey, tuningKey, chords, abcText, selectedModes])

  const handleSave = useCallback(() => {
    const arr = arrangements[activeArrangement]
    if (!arr) return
    const folder = arr.title || 'Untitled'
    saveArrangement({
      title: `${arr.title} — ${arr.mode}`,
      folder,
      arrangement: arr,
      melody: sampleKey !== 'custom'
        ? SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES].melody
        : [],
      chords,
      tuningKey,
      abcText: sampleKey === 'custom' ? abcText : undefined,
    })
    setSavedConfirm(true)
    setTimeout(() => setSavedConfirm(false), 2000)
  }, [arrangements, activeArrangement, sampleKey, chords, tuningKey, abcText])

  const handlePrint = useCallback(() => window.print(), [])

  const activeArr = arrangements[activeArrangement]
  const filteredAlphaTex = activeArr
    ? toAlphaTex({
        ...activeArr,
        guitarNotes: activeArr.guitarNotes.filter(n => selectedVoices.has(n.voice)),
      })
    : ''

  const sample = sampleKey !== 'custom' ? SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES] : null
  const measureCount = sample ? Math.max(...sample.chords.map(c => Math.ceil((c.startBeat + c.durationBeats) / 4))) : 8

  return (
    <main style={{ background: '#0f172a', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ borderBottom: '1px solid #1e293b' }}>
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-8">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#7c3aed,#0891b2,#16a34a,#d97706)', borderRadius: 2, marginBottom: 28 }} />
          <p style={{ color: '#7c3aed', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            AMF Fingerstyle Arranger
          </p>
          <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
            Fingerstyle Guitar Arranger
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 560 }}>
            Musical-voice arrangement + tuning-aware fretboard solver. Choose a melody, set chords, pick a texture — get playable DADGAD or Standard notation.
          </p>
          <div style={{ marginTop: 12 }}>
            <a href="/arranger/library" style={{ fontSize: 13, color: '#7c3aed', fontWeight: 600, textDecoration: 'none' }}>
              📚 View Library →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

          {/* Left column: controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Melody selector */}
            <Section title="Melody">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(SAMPLE_MELODIES).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => handleSampleChange(key as SampleKey)}
                    style={{
                      padding: '8px 16px', borderRadius: 8, border: '1px solid',
                      borderColor: sampleKey === key ? '#7c3aed' : '#334155',
                      background: sampleKey === key ? '#4c1d95' : '#1e293b',
                      color: '#f1f5f9', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  onClick={() => handleSampleChange('custom')}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid',
                    borderColor: sampleKey === 'custom' ? '#7c3aed' : '#334155',
                    background: sampleKey === 'custom' ? '#4c1d95' : '#1e293b',
                    color: '#f1f5f9', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Custom (ABC)
                </button>
              </div>
              {sampleKey === 'custom' && (
                <div style={{ marginTop: 12 }}>
                  <textarea
                    value={abcText}
                    onChange={e => setAbcText(e.target.value)}
                    rows={8}
                    spellCheck={false}
                    style={{
                      width: '100%', padding: 10, borderRadius: 6,
                      background: '#0a0f1a', color: '#94a3b8',
                      border: `1px solid ${abcError ? '#dc2626' : '#334155'}`,
                      fontFamily: 'monospace', fontSize: 12, resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                  {abcError && (
                    <div style={{ marginTop: 6, fontSize: 12, color: '#f87171' }}>{abcError}</div>
                  )}
                  <div style={{ marginTop: 4, fontSize: 11, color: '#475569' }}>
                    Paste ABC notation. Add chord symbols like <code style={{ color: '#94a3b8' }}>&quot;Am&quot;</code> above notes.
                  </div>
                </div>
              )}
            </Section>

            {/* Tuning selector */}
            <Section title="Tuning">
              <div style={{ display: 'flex', gap: 8 }}>
                {Object.keys(TUNINGS).map(name => (
                  <button
                    key={name}
                    onClick={() => setTuningKey(name)}
                    style={{
                      padding: '8px 20px', borderRadius: 8, border: '1px solid',
                      borderColor: tuningKey === name ? '#0891b2' : '#334155',
                      background: tuningKey === name ? '#164e63' : '#1e293b',
                      color: '#f1f5f9', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#475569' }}>
                {TUNINGS[tuningKey].strings
                  .slice().reverse()
                  .map(p => {
                    const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
                    const oct = Math.floor(p / 12) - 1
                    return `${notes[p % 12]}${oct}`
                  }).join(' – ')}
              </div>
            </Section>

            {/* Arrangement modes */}
            <Section title="Texture">
              <div style={{ marginBottom: 8, fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.1em' }}>CHORD-FIRST</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {CHORD_MODES.map(m => (
                  <button
                    key={m.value}
                    onClick={() => toggleMode(m.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 8, border: '1px solid',
                      borderColor: selectedModes.has(m.value) ? m.color : '#334155',
                      background: selectedModes.has(m.value) ? `${m.color}22` : '#1e293b',
                      color: '#f1f5f9', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedModes.has(m.value) ? m.color : '#334155', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{m.description}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: 8, fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.1em' }}>COUNTERPOINT</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {COUNTERPOINT_MODES.map(m => (
                  <button
                    key={m.value}
                    onClick={() => toggleMode(m.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', borderRadius: 8, border: '1px solid',
                      borderColor: selectedModes.has(m.value) ? m.color : '#334155',
                      background: selectedModes.has(m.value) ? `${m.color}22` : '#1e293b',
                      color: '#f1f5f9', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedModes.has(m.value) ? m.color : '#334155', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{m.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                padding: '12px 24px', borderRadius: 10, border: 'none',
                background: loading ? '#334155' : 'linear-gradient(135deg, #7c3aed, #0891b2)',
                color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              {loading ? 'Generating…' : `Generate ${selectedModes.size} Arrangement${selectedModes.size !== 1 ? 's' : ''}`}
            </button>

            {error && (
              <div style={{ padding: 12, borderRadius: 8, background: '#450a0a', color: '#fca5a5', fontSize: 13 }}>
                {error}
              </div>
            )}
          </div>

          {/* Right column: chord editor */}
          {sample ? (
            <Section title={`Chords — ${sample.label}`}>
              <ChordEditor
                measureCount={measureCount}
                beatsPerMeasure={4}
                initial={sample.chords.map((c, i) => ({ measure: i, symbol: c.symbol }))}
                onChange={setChords}
              />
              <div style={{ marginTop: 12, fontSize: 11, color: '#475569' }}>
                Click a bar to edit. Blank bars inherit the previous chord.
              </div>
            </Section>
          ) : (
            <Section title="Chords">
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                Chords will be extracted from your ABC notation.<br />
                Add chord symbols above notes like{' '}
                <code style={{ background: '#0f172a', padding: '1px 4px', borderRadius: 3, color: '#94a3b8' }}>&quot;G&quot;GABG</code>
              </div>
            </Section>
          )}
        </div>

        {/* Results */}
        {arrangements.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={{ height: 1, background: '#1e293b', marginBottom: 32 }} />

            {/* Tab selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {arrangements.map((arr, i) => {
                const mode = ALL_MODES.find(m => m.value === arr.mode)
                return (
                  <button
                    key={i}
                    onClick={() => setActiveArrangement(i)}
                    style={{
                      padding: '8px 16px', borderRadius: 8, border: '1px solid',
                      borderColor: activeArrangement === i ? (mode?.color ?? '#7c3aed') : '#334155',
                      background: activeArrangement === i ? `${mode?.color ?? '#7c3aed'}22` : '#1e293b',
                      color: '#f1f5f9', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {mode?.label ?? arr.mode}
                  </button>
                )
              })}
            </div>

            {/* Active arrangement */}
            {arrangements[activeArrangement] && (
              <div>
                {/* Playability badge + action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                    background: arrangements[activeArrangement].playabilityScore >= 0.9 ? '#14532d' : '#713f12',
                    color: arrangements[activeArrangement].playabilityScore >= 0.9 ? '#86efac' : '#fde68a',
                  }}>
                    {Math.round(arrangements[activeArrangement].playabilityScore * 100)}% playable
                  </div>
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    Tuning: {arrangements[activeArrangement].tuning.name}
                  </span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                    <button
                      onClick={handleSave}
                      style={{
                        padding: '4px 12px', borderRadius: 6, border: '1px solid #334155',
                        background: savedConfirm ? '#14532d' : '#1e293b',
                        color: savedConfirm ? '#86efac' : '#94a3b8',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {savedConfirm ? '✓ Saved' : 'Save'}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="no-print"
                      style={{
                        padding: '4px 12px', borderRadius: 6, border: '1px solid #334155',
                        background: '#1e293b', color: '#94a3b8', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Print / PDF
                    </button>
                  </div>
                </div>

                {/* Voice layer toggles */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {VOICE_CONFIG.map(v => (
                    <button
                      key={v.value}
                      onClick={() => toggleVoice(v.value)}
                      style={{
                        padding: '5px 14px', borderRadius: 6, border: '1px solid',
                        borderColor: selectedVoices.has(v.value) ? v.color : '#334155',
                        background: selectedVoices.has(v.value) ? `${v.color}22` : '#1e293b',
                        color: selectedVoices.has(v.value) ? v.color : '#475569',
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                <AlphaTabViewer
                  alphaTex={filteredAlphaTex}
                  height={500}
                  enablePlayer
                />

                {/* AlphaTex debug view */}
                <details style={{ marginTop: 16 }}>
                  <summary style={{ fontSize: 12, color: '#475569', cursor: 'pointer' }}>
                    View AlphaTex source
                  </summary>
                  <pre style={{
                    marginTop: 8, padding: 12, borderRadius: 8, background: '#0a0f1a',
                    color: '#64748b', fontSize: 11, overflowX: 'auto',
                    border: '1px solid #1e293b',
                  }}>
                    {filteredAlphaTex}
                  </pre>
                </details>

                {/* AI Collaborator */}
                <div style={{ marginTop: 24, border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{
                    padding: '10px 16px', background: '#0f1629',
                    borderBottom: '1px solid #1e293b',
                    fontSize: 12, fontWeight: 700, color: '#7c3aed',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    🤖 AI Collaborator
                  </div>
                  <div style={{ padding: 16 }}>
                    <AiCollaborator
                      arrangement={arrangements[activeArrangement] ?? null}
                      melody={sampleKey !== 'custom'
                        ? (SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES]?.melody ?? [])
                        : []}
                      chords={chords}
                      tuning={TUNINGS[tuningKey]}
                      onArrangementUpdate={(updated) => {
                        const next = [...arrangements]
                        next[activeArrangement] = updated
                        setArrangements(next)
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: '#475569', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}
