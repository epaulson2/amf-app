'use client'

export const dynamic = 'force-dynamic'

import { useState, useCallback, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { STYLE_PRESETS } from '@/lib/arranger/presets'
import nextDynamic from 'next/dynamic'
import { DADGAD, STANDARD, SAMPLE_MELODIES, makeChordEvent } from '@/lib/arranger'
import type { Tuning, ChordEvent, Arrangement, ArrangementMode, NoteEvent, VoiceType, OverlayType } from '@/lib/arranger'
import ChordEditor from '@/components/arranger/ChordEditor'
import { parseAbc } from '@/lib/arranger/abc-parser'
import { saveArrangement, loadAll } from '@/lib/arranger/library'
import type { SavedArrangement } from '@/lib/arranger/library'
import OverlayControls from '@/components/arranger/OverlayControls'
import type { BeatCoords } from '@/components/arranger/VexFlowScore'

void makeChordEvent

const VexFlowScore = nextDynamic(() => import('@/components/arranger/VexFlowScore'), { ssr: false })
const ScoreOverlay = nextDynamic(() => import('@/components/arranger/ScoreOverlay'), { ssr: false })
const AiCollaborator = nextDynamic(() => import('@/components/arranger/AiCollaborator'), { ssr: false })
const MelodyUpload = nextDynamic(() => import('@/components/arranger/MelodyUpload'), { ssr: false })
const TonePlayer = nextDynamic(() => import('@/components/arranger/TonePlayer'), { ssr: false })

const DROP_D: Tuning = { name: 'Drop D', strings: [38, 45, 50, 55, 59, 62], maxFret: 19 }
const OPEN_G: Tuning = { name: 'Open G', strings: [38, 43, 50, 55, 59, 62], maxFret: 19 }

const TUNINGS: Record<string, Tuning> = {
  DADGAD,
  Standard: STANDARD,
  'Drop D': DROP_D,
  'Open G': OPEN_G,
}

const VOICE_CONFIG: { value: VoiceType; label: string; color: string }[] = [
  { value: 'melody', label: 'Melody', color: '#38bdf8' },
  { value: 'bass',   label: 'Bass',   color: '#4ade80' },
  { value: 'inner',  label: 'Inner',  color: '#fbbf24' },
  { value: 'drone',  label: 'Drone',  color: '#c084fc' },
]

const ALL_VOICES = new Set<VoiceType>(['melody', 'bass', 'inner', 'drone'])

const DEFAULT_ABC = `X:1
T:My Melody
M:4/4
L:1/8
Q:1/4=100
K:G
"G"GABG "Em"EFGE|"C"CDEF "D"DEFG|"G"G4 z4|]`

const ARRANGEMENT_MODES: { value: ArrangementMode; label: string; color: string; group: 'chord' | 'cp' }[] = [
  { value: 'simple',            label: 'Melody + Bass', color: '#0891b2', group: 'chord' },
  { value: 'drone',             label: '+ Drone',        color: '#7c3aed', group: 'chord' },
  { value: 'harmonic',          label: '+ Inner',        color: '#d97706', group: 'chord' },
  { value: 'voice-led',         label: 'Full Texture',   color: '#16a34a', group: 'chord' },
  { value: 'first-species',     label: '1st Species',    color: '#0891b2', group: 'cp'    },
  { value: 'second-species',    label: '2nd Species',    color: '#16a34a', group: 'cp'    },
  { value: 'free-counterpoint', label: 'Free CP',        color: '#7c3aed', group: 'cp'    },
  { value: 'imitation',         label: 'Imitation',      color: '#d97706', group: 'cp'    },
]

type SampleKey = keyof typeof SAMPLE_MELODIES | 'custom' | 'loaded'

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
function midiToName(p: number) { return `${NOTE_NAMES[p % 12]}${Math.floor(p / 12) - 1}` }

function SearchParamsReader({
  setAutoTopic,
  setSelectedModes,
}: {
  setAutoTopic: (t: string) => void
  setSelectedModes: React.Dispatch<React.SetStateAction<Set<ArrangementMode>>>
}) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const topic = searchParams.get('topic')
    const presetId = searchParams.get('preset')
    if (topic) setAutoTopic(topic)
    if (presetId) {
      const preset = STYLE_PRESETS.find(p => p.id === presetId)
      if (preset) setSelectedModes(new Set([preset.preferredMode as ArrangementMode]))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default function ArrangerPage() {
  const [tuningKey, setTuningKey] = useState<string>('DADGAD')
  const [sampleKey, setSampleKey] = useState<SampleKey>('danny-boy')
  const [chords, setChords] = useState<ChordEvent[]>(() => SAMPLE_MELODIES['danny-boy'].chords)
  const [abcText, setAbcText] = useState<string>(DEFAULT_ABC)
  const [abcError, setAbcError] = useState<string | null>(null)
  const [selectedModes, setSelectedModes] = useState<Set<ArrangementMode>>(new Set(['simple', 'harmonic']))
  const [arrangements, setArrangements] = useState<Arrangement[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeArrangement, setActiveArrangement] = useState<number>(0)
  const [selectedVoices, setSelectedVoices] = useState<Set<VoiceType>>(new Set(ALL_VOICES))
  const [savedConfirm, setSavedConfirm] = useState(false)
  const [activeOverlays, setActiveOverlays] = useState<Set<OverlayType>>(new Set())
  const [showUpload, setShowUpload] = useState(false)
  const [loadedMelody, setLoadedMelody] = useState<NoteEvent[]>([])
  const [melodyLabel, setMelodyLabel] = useState<string>('Danny Boy')
  const [libraryItems, setLibraryItems] = useState<SavedArrangement[]>([])
  const [melodyOpen, setMelodyOpen] = useState(false)
  const [melodyQuery, setMelodyQuery] = useState('')
  const [autoTopic, setAutoTopic] = useState<string | null>(null)
  const [pencilMode, setPencilMode] = useState(false)
  const [beatCoords, setBeatCoords] = useState<BeatCoords[]>([])
  const [scoreHeight, setScoreHeight] = useState(300)
  const [isPlaying, setIsPlaying] = useState(false)
  const scoreContainerRef = useRef<HTMLDivElement>(null)
  const [scoreContainerWidth, setScoreContainerWidth] = useState(600)

  useEffect(() => {
    if (typeof window !== 'undefined') setLibraryItems(loadAll())
  }, [])

  useEffect(() => {
    const el = scoreContainerRef.current
    if (!el) return
    const obs = new ResizeObserver(() => setScoreContainerWidth(el.offsetWidth))
    obs.observe(el)
    setScoreContainerWidth(el.offsetWidth)
    return () => obs.disconnect()
  }, [])

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
        if (saved.abcText) {
          setSampleKey('custom'); setAbcText(saved.abcText); setMelodyLabel(saved.title)
        } else if (saved.melody.length > 0) {
          setSampleKey('loaded'); setLoadedMelody(saved.melody); setMelodyLabel(saved.title)
        }
      } catch { /* ignore */ }
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

  const handleSampleChange = useCallback((key: SampleKey, label?: string) => {
    setSampleKey(key)
    setArrangements([])
    setAbcError(null)
    if (key !== 'custom' && key !== 'loaded') {
      const s = SAMPLE_MELODIES[key as keyof typeof SAMPLE_MELODIES]
      setChords(s.chords)
      setMelodyLabel(s.label)
    } else if (label) {
      setMelodyLabel(label)
    }
  }, [])

  const handleLoadLibraryItem = useCallback((saved: SavedArrangement) => {
    setTuningKey(saved.tuningKey)
    setChords(saved.chords)
    setArrangements([saved.arrangement])
    setActiveArrangement(0)
    setMelodyOpen(false)
    setMelodyQuery('')
    if (saved.abcText) {
      setSampleKey('custom'); setAbcText(saved.abcText); setMelodyLabel(saved.title)
    } else if (saved.melody.length > 0) {
      setSampleKey('loaded'); setLoadedMelody(saved.melody); setMelodyLabel(saved.title)
    }
  }, [])

  const toggleMode = useCallback((mode: ArrangementMode) => {
    setSelectedModes(prev => {
      const next = new Set(prev)
      if (next.has(mode)) { if (next.size > 1) next.delete(mode) } else next.add(mode)
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

    setLoading(true); setError(null); setAbcError(null); setArrangements([])

    if (sampleKey === 'custom') {
      try {
        const parsed = await parseAbc(abcText)
        melody = parsed.melody
        requestChords = parsed.chords.length > 0 ? parsed.chords : chords
        title = parsed.title; tempo = parsed.tempo; timeSignature = parsed.timeSignature
      } catch (e) {
        setAbcError(e instanceof Error ? e.message : 'Failed to parse ABC')
        setLoading(false)
        return
      }
    } else if (sampleKey === 'loaded') {
      melody = loadedMelody
      title = melodyLabel
    } else {
      const sample = SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES]
      melody = sample.melody; title = sample.label
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
  }, [sampleKey, tuningKey, chords, abcText, selectedModes, loadedMelody, melodyLabel])

  const handleSave = useCallback(() => {
    const arr = arrangements[activeArrangement]
    if (!arr) return
    saveArrangement({
      title: `${arr.title} — ${arr.mode}`,
      folder: arr.title || 'Untitled',
      arrangement: arr,
      melody: sampleKey === 'loaded' ? loadedMelody : sampleKey !== 'custom' ? (SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES]?.melody ?? []) : [],
      chords,
      tuningKey,
      abcText: sampleKey === 'custom' ? abcText : undefined,
    })
    setSavedConfirm(true)
    setTimeout(() => setSavedConfirm(false), 2000)
  }, [arrangements, activeArrangement, sampleKey, chords, tuningKey, abcText, loadedMelody])

  const toggleOverlay = useCallback((type: OverlayType) => {
    setActiveOverlays(prev => {
      const next = new Set(prev)
      next.has(type) ? next.delete(type) : next.add(type)
      return next
    })
  }, [])

  const activeArr = arrangements[activeArrangement] ?? null
  const sample = sampleKey !== 'custom' && sampleKey !== 'loaded' ? SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES] : null
  const measureCount = sample ? Math.max(...sample.chords.map(c => Math.ceil((c.startBeat + c.durationBeats) / 4))) : 8
  const tuningStrings = TUNINGS[tuningKey].strings.slice().reverse().map(midiToName).join(' – ')
  const chordModes = ARRANGEMENT_MODES.filter(m => m.group === 'chord')
  const cpModes = ARRANGEMENT_MODES.filter(m => m.group === 'cp')

  const currentMelody = sampleKey === 'loaded'
    ? loadedMelody
    : sampleKey !== 'custom'
      ? (SAMPLE_MELODIES[sampleKey as keyof typeof SAMPLE_MELODIES]?.melody ?? [])
      : []

  return (
    <main style={{ background: '#0a0f1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh' }}>
      <Suspense fallback={null}>
        <SearchParamsReader setAutoTopic={setAutoTopic} setSelectedModes={setSelectedModes} />
      </Suspense>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1e293b', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 3, height: 22, background: 'linear-gradient(180deg,#7c3aed,#0891b2)', borderRadius: 2 }} />
          <span style={{ color: '#475569', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 6 }}>AMF</span>
          <span style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 700 }}>Fingerstyle Arranger</span>
        </div>
        <a href="/arranger/library" style={{ fontSize: 12, color: '#7c3aed', fontWeight: 600, textDecoration: 'none', padding: '4px 11px', border: '1px solid #2d1b69', borderRadius: 6, background: '#1a0d40' }}>
          Library →
        </a>
      </div>

      {/* Three-column body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR — controls */}
        <div style={{ width: 240, flexShrink: 0, borderRight: '1px solid #1e293b', overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Melody selector */}
          <div style={{ position: 'relative' }}>
            <Label>Melody</Label>
            <div style={{ display: 'flex', gap: 5 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <button
                  onClick={() => { setMelodyOpen(o => !o); setMelodyQuery('') }}
                  style={{ width: '100%', padding: '6px 9px', borderRadius: 5, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 11, fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{melodyLabel}</span>
                  <span style={{ fontSize: 9, color: '#475569', marginLeft: 5 }}>{melodyOpen ? '▲' : '▼'}</span>
                </button>

                {melodyOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: '#1e293b', border: '1px solid #334155', borderRadius: 6, marginTop: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', maxHeight: 260, overflowY: 'auto' }}>
                    <div style={{ padding: '5px 7px', borderBottom: '1px solid #334155' }}>
                      <input autoFocus value={melodyQuery} onChange={e => setMelodyQuery(e.target.value)} placeholder="Search…" style={{ width: '100%', boxSizing: 'border-box', padding: '4px 7px', borderRadius: 4, background: '#0f172a', border: '1px solid #334155', color: '#f1f5f9', fontSize: 11, outline: 'none' }} />
                    </div>
                    {(() => {
                      const q = melodyQuery.toLowerCase()
                      const samples = Object.entries(SAMPLE_MELODIES).filter(([, s]) => s.label.toLowerCase().includes(q))
                      const saved = libraryItems.filter(a => a.title.toLowerCase().includes(q))
                      return (
                        <>
                          {samples.length > 0 && (
                            <div>
                              <div style={{ padding: '4px 9px 2px', fontSize: 9, color: '#475569', fontWeight: 700, letterSpacing: '0.08em' }}>SAMPLES</div>
                              {samples.map(([key, s]) => (
                                <button key={key} onClick={() => { handleSampleChange(key as SampleKey); setMelodyOpen(false); setMelodyQuery('') }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 11px', background: sampleKey === key ? '#4c1d9522' : 'transparent', color: sampleKey === key ? '#c4b5fd' : '#e2e8f0', fontSize: 11, fontWeight: sampleKey === key ? 700 : 400, cursor: 'pointer', border: 'none' }}>
                                  {s.label}
                                </button>
                              ))}
                            </div>
                          )}
                          {saved.length > 0 && (
                            <div>
                              <div style={{ padding: '4px 9px 2px', fontSize: 9, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', borderTop: samples.length > 0 ? '1px solid #334155' : undefined }}>LIBRARY</div>
                              {saved.map(item => (
                                <button key={item.id} onClick={() => handleLoadLibraryItem(item)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 11px', background: 'transparent', color: '#e2e8f0', fontSize: 11, cursor: 'pointer', border: 'none' }}>
                                  {item.title}<span style={{ marginLeft: 5, fontSize: 10, color: '#475569' }}>{item.tuningKey}</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {samples.length === 0 && saved.length === 0 && <div style={{ padding: '10px', fontSize: 11, color: '#475569', textAlign: 'center' }}>No results</div>}
                          <div style={{ borderTop: '1px solid #334155' }}>
                            <button onClick={() => { handleSampleChange('custom', 'Custom (ABC)'); setMelodyOpen(false); setMelodyQuery('') }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 11px', background: sampleKey === 'custom' ? '#78350f22' : 'transparent', color: sampleKey === 'custom' ? '#fbbf24' : '#94a3b8', fontSize: 11, cursor: 'pointer', border: 'none', fontWeight: 600 }}>
                              + Custom (ABC)
                            </button>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>
              <button title="Upload audio, MIDI, or ABC" onClick={() => setShowUpload(true)} style={{ padding: '6px 9px', borderRadius: 5, border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>↑</button>
            </div>

            {sampleKey === 'custom' && (
              <div style={{ marginTop: 7 }}>
                <textarea value={abcText} onChange={e => setAbcText(e.target.value)} rows={6} spellCheck={false} style={{ width: '100%', boxSizing: 'border-box', padding: 7, borderRadius: 5, background: '#0a0f1a', color: '#94a3b8', border: `1px solid ${abcError ? '#dc2626' : '#334155'}`, fontFamily: 'monospace', fontSize: 10, resize: 'vertical' }} />
                {abcError && <div style={{ fontSize: 10, color: '#f87171', marginTop: 2 }}>{abcError}</div>}
              </div>
            )}
          </div>

          {/* Texture */}
          <div>
            <Label>Texture</Label>
            <div style={{ fontSize: 9, color: '#334155', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>CHORD-FIRST</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 8 }}>
              {chordModes.map(m => <ModeChip key={m.value} mode={m} active={selectedModes.has(m.value)} onClick={() => toggleMode(m.value)} />)}
            </div>
            <div style={{ fontSize: 9, color: '#334155', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 4 }}>COUNTERPOINT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {cpModes.map(m => <ModeChip key={m.value} mode={m} active={selectedModes.has(m.value)} onClick={() => toggleMode(m.value)} />)}
            </div>
          </div>

          {/* Chords */}
          <div>
            <Label>Chords</Label>
            {sample ? (
              <ChordEditor measureCount={measureCount} beatsPerMeasure={4} initial={sample.chords.map((c, i) => ({ measure: i, symbol: c.symbol }))} onChange={setChords} />
            ) : (
              <div style={{ fontSize: 10, color: '#475569', lineHeight: 1.5 }}>Extracted from ABC notation.</div>
            )}
          </div>

          {/* Generate */}
          <button onClick={handleGenerate} disabled={loading} style={{ padding: '9px 0', borderRadius: 6, border: 'none', background: loading ? '#334155' : 'linear-gradient(135deg,#7c3aed,#0891b2)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Generating…' : `Generate (${selectedModes.size})`}
          </button>

          {error && <div style={{ padding: 8, borderRadius: 5, background: '#450a0a', color: '#fca5a5', fontSize: 10 }}>{error}</div>}
        </div>

        {/* CENTER — score canvas */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid #1e293b' }}>

          {/* Score toolbar */}
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', flexShrink: 0, background: '#0d1524' }}>

            {/* Tuning pills */}
            <div style={{ display: 'flex', gap: 4, marginRight: 4 }}>
              {Object.keys(TUNINGS).map(name => (
                <button key={name} onClick={() => setTuningKey(name)} style={{ padding: '3px 9px', borderRadius: 5, border: `1px solid ${tuningKey === name ? '#0891b2' : '#334155'}`, background: tuningKey === name ? '#0891b222' : 'transparent', color: tuningKey === name ? '#38bdf8' : '#64748b', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                  {name}
                </button>
              ))}
            </div>

            <div style={{ width: 1, height: 16, background: '#1e293b', flexShrink: 0 }} />

            {/* Voice toggles */}
            {VOICE_CONFIG.map(v => (
              <button key={v.value} onClick={() => toggleVoice(v.value)} style={{ padding: '2px 8px', borderRadius: 4, border: `1px solid ${selectedVoices.has(v.value) ? v.color : '#334155'}`, background: selectedVoices.has(v.value) ? `${v.color}22` : 'transparent', color: selectedVoices.has(v.value) ? v.color : '#475569', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                {v.label}
              </button>
            ))}

            <div style={{ width: 1, height: 16, background: '#1e293b', flexShrink: 0 }} />

            <OverlayControls active={activeOverlays} onToggle={toggleOverlay} hasArrangement={!!activeArr} />

            <div style={{ width: 1, height: 16, background: '#1e293b', flexShrink: 0 }} />

            {/* Pencil mode */}
            <button onClick={() => setPencilMode(p => !p)} title="Edit notes by clicking on the score" style={{ padding: '3px 9px', borderRadius: 5, border: `1px solid ${pencilMode ? '#f59e0b' : '#334155'}`, background: pencilMode ? '#78350f33' : 'transparent', color: pencilMode ? '#fbbf24' : '#64748b', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
              ✎ Edit
            </button>

            {/* Play */}
            <TonePlayer arrangement={activeArr} onPlayStateChange={setIsPlaying} />

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
              {/* Arrangement tabs */}
              {arrangements.length > 1 && arrangements.map((arr, i) => {
                const mode = ARRANGEMENT_MODES.find(m => m.value === arr.mode)
                return (
                  <button key={i} onClick={() => setActiveArrangement(i)} style={{ padding: '3px 9px', borderRadius: 4, border: `1px solid ${activeArrangement === i ? (mode?.color ?? '#7c3aed') : '#334155'}`, background: activeArrangement === i ? `${mode?.color ?? '#7c3aed'}22` : 'transparent', color: '#f1f5f9', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                    {mode?.label ?? arr.mode}
                  </button>
                )
              })}

              {activeArr && (
                <>
                  <div style={{ padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 700, background: activeArr.playabilityScore >= 0.9 ? '#14532d' : '#713f12', color: activeArr.playabilityScore >= 0.9 ? '#86efac' : '#fde68a' }}>
                    {Math.round(activeArr.playabilityScore * 100)}%
                  </div>
                  <button onClick={handleSave} style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #334155', background: savedConfirm ? '#14532d' : '#1e293b', color: savedConfirm ? '#86efac' : '#94a3b8', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>
                    {savedConfirm ? '✓ Saved' : 'Save'}
                  </button>
                  <button onClick={() => window.print()} style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>PDF</button>
                </>
              )}
            </div>
          </div>

          {/* Tuning string display */}
          <div style={{ padding: '3px 14px', borderBottom: '1px solid #1e293b', fontSize: 10, color: '#334155', letterSpacing: '0.05em', flexShrink: 0 }}>
            {TUNINGS[tuningKey].name}: {tuningStrings}
          </div>

          {/* Score area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
            <div ref={scoreContainerRef} style={{ position: 'relative', minHeight: scoreHeight }}>
              <VexFlowScore
                arrangement={activeArr}
                tuning={TUNINGS[tuningKey]}
                selectedVoices={selectedVoices}
                activeOverlays={activeOverlays}
                pencilMode={pencilMode}
                isPlaying={isPlaying}
                onCoordsReady={setBeatCoords}
                onHeightChange={setScoreHeight}
              />
              <ScoreOverlay
                coords={beatCoords}
                arrangement={activeArr}
                activeOverlays={activeOverlays}
                containerWidth={scoreContainerWidth}
                containerHeight={scoreHeight}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — AI Collaborator */}
        <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e293b', background: '#0d1524', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Collaborator</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            <AiCollaborator
              arrangement={activeArr}
              melody={currentMelody}
              chords={chords}
              tuning={TUNINGS[tuningKey]}
              autoTopic={autoTopic ?? undefined}
              onArrangementUpdate={(updated) => {
                const next = [...arrangements]
                next[activeArrangement] = updated
                setArrangements(next)
              }}
            />
          </div>
        </div>
      </div>

      {showUpload && (
        <MelodyUpload
          onClose={() => setShowUpload(false)}
          onLoad={({ melody, chords: uploadedChords, title }) => {
            setShowUpload(false)
            setSampleKey('loaded')
            setLoadedMelody(melody)
            setMelodyLabel(title)
            if (uploadedChords.length > 0) setChords(uploadedChords)
            setArrangements([])
            setMelodyOpen(false)
          }}
        />
      )}
    </main>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 6 }}>{children}</div>
}

function ModeChip({ mode, active, onClick }: { mode: { value: string; label: string; color: string }; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: '3px 8px', borderRadius: 4, border: '1px solid', borderColor: active ? mode.color : '#334155', background: active ? `${mode.color}22` : 'transparent', color: active ? mode.color : '#475569', fontSize: 10, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
      {mode.label}
    </button>
  )
}
