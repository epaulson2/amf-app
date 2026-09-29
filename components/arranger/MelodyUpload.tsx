'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import type { NoteEvent, ChordEvent } from '@/lib/arranger'

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
function midiToNote(midi: number) { return `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}` }

interface UploadResult {
  melody: NoteEvent[]
  chords: ChordEvent[]
  title: string
  tempo: number
}

interface MelodyUploadProps {
  onLoad: (result: UploadResult) => void
  onClose: () => void
}

// Browser-side autocorrelation pitch detection (ScriptProcessorNode context)
function detectPitchBrowser(buffer: Float32Array, sampleRate: number): number {
  const size = buffer.length
  const halfSize = Math.floor(size / 2)
  const minTau = Math.floor(sampleRate / 1200) // max ~1200 Hz
  const maxTau = Math.floor(sampleRate / 60)   // min ~60 Hz

  // Check signal energy first — skip silent frames
  let energy = 0
  for (let i = 0; i < size; i++) energy += buffer[i] * buffer[i]
  if (energy / size < 0.002) return -1

  // Normalized autocorrelation
  let bestTau = -1, bestVal = 0.2 // threshold
  for (let tau = minTau; tau < Math.min(maxTau, halfSize); tau++) {
    let num = 0, d1 = 0, d2 = 0
    for (let i = 0; i < halfSize; i++) {
      num += buffer[i] * buffer[i + tau]
      d1 += buffer[i] * buffer[i]
      d2 += buffer[i + tau] * buffer[i + tau]
    }
    const corr = num / Math.sqrt(d1 * d2 + 1e-10)
    if (corr > bestVal) { bestVal = corr; bestTau = tau }
  }

  if (bestTau === -1) return -1
  const freq = sampleRate / bestTau
  return Math.round(69 + 12 * Math.log2(freq / 440))
}

// Convert recorded (midi, time) pairs to NoteEvent[]
function buildMelodyFromRecording(
  frames: Array<{ midi: number; t: number }>,
  tempo: number,
): NoteEvent[] {
  const bps = tempo / 60
  const notes: NoteEvent[] = []
  let i = 0
  while (i < frames.length) {
    const midi = frames[i].midi
    let j = i + 1
    while (j < frames.length && Math.abs(frames[j].midi - midi) <= 1) j++
    const startSec = frames[i].t
    const endSec = frames[j - 1].t + 0.1 // approx frame duration
    const startBeat = Math.round(startSec * bps * 4) / 4
    const durationBeats = Math.max(0.25, Math.round((endSec - startSec) * bps * 4) / 4)
    if (midi >= 36 && midi <= 88) {
      notes.push({ pitch: midi, startBeat, durationBeats, voice: 'melody' })
    }
    i = j
  }
  return notes
}

export default function MelodyUpload({ onLoad, onClose }: MelodyUploadProps) {
  const [tab, setTab] = useState<'file' | 'mic'>('file')

  // File upload state
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [preview, setPreview] = useState<UploadResult | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mic state
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  const [micPreview, setMicPreview] = useState<UploadResult | null>(null)
  const [liveNote, setLiveNote] = useState<string>('')
  const hasMicSupport = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia

  // Mic refs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioCtxRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const streamRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processorRef = useRef<any>(null)
  const framesRef = useRef<Array<{ midi: number; t: number }>>([])
  const startTimeRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      stopMic()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose])

  // ── File upload ──────────────────────────────────────────────

  const handleFile = useCallback((f: File) => {
    setFile(f); setFileError(null); setPreview(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleUpload = useCallback(async () => {
    if (!file) return
    setUploading(true); setFileError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/arrange/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.error && (!data.melody || data.melody.length === 0)) { setFileError(data.error); return }
      setPreview({ melody: data.melody, chords: data.chords ?? [], title: data.title || file.name, tempo: data.tempo ?? 120 })
      if (data.error) setFileError(data.error)
    } catch (e) {
      setFileError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [file])

  // ── Mic recording ────────────────────────────────────────────

  const stopMic = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    if (processorRef.current) { try { processorRef.current.disconnect() } catch { /* ok */ } processorRef.current = null }
    if (streamRef.current) { streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop()); streamRef.current = null }
    if (audioCtxRef.current) { try { audioCtxRef.current.close() } catch { /* ok */ } audioCtxRef.current = null }
    setRecording(false)
  }, [])

  const startRecording = useCallback(async () => {
    setMicError(null); setMicPreview(null); setLiveNote('')
    framesRef.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContext = (window as any).AudioContext ?? (window as any).webkitAudioContext
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      const source = ctx.createMediaStreamSource(stream)
      // ScriptProcessorNode is deprecated but universally supported.
      // AudioWorklet would be the modern approach.
      const processor = ctx.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor

      startTimeRef.current = ctx.currentTime
      setElapsed(0)
      setRecording(true)

      timerRef.current = setInterval(() => {
        setElapsed(Math.floor(ctx.currentTime - startTimeRef.current))
      }, 500)

      processor.onaudioprocess = (e: AudioProcessingEvent) => {
        const buf = e.inputBuffer.getChannelData(0)
        const midi = detectPitchBrowser(buf, ctx.sampleRate)
        const t = ctx.currentTime - startTimeRef.current
        if (midi >= 36 && midi <= 88) {
          framesRef.current.push({ midi, t })
          setLiveNote(midiToNote(midi))
        }
      }

      source.connect(processor)
      processor.connect(ctx.destination)
    } catch (e) {
      setMicError(e instanceof Error ? e.message : 'Could not access microphone')
      stopMic()
    }
  }, [stopMic])

  const stopAndAnalyze = useCallback(() => {
    stopMic()
    const frames = framesRef.current
    if (frames.length < 3) {
      setMicError('Not enough notes detected. Play a clear single-note melody and try again.')
      return
    }
    const tempo = 80
    const melody = buildMelodyFromRecording(frames, tempo)
    setMicPreview({ melody, chords: [], title: 'Recorded Melody', tempo })
  }, [stopMic])

  // ── Shared preview card ───────────────────────────────────────

  const PreviewCard = ({ result, onReset }: { result: UploadResult; onReset: () => void }) => (
    <div>
      <div style={{ marginBottom: 14, padding: '12px 14px', borderRadius: 8, background: '#0f2910', border: '1px solid #166534' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#86efac', marginBottom: 3 }}>✓ {result.title}</div>
        <div style={{ fontSize: 12, color: '#4ade80' }}>{result.melody.length} notes · {result.tempo} bpm</div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 7 }}>FIRST 8 NOTES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {result.melody.slice(0, 8).map((n, i) => (
            <div key={i} style={{ padding: '3px 9px', borderRadius: 4, background: '#1e3a5f', border: '1px solid #1e4080', fontSize: 11, color: '#93c5fd' }}>
              {midiToNote(n.pitch)}
              <span style={{ color: '#475569', marginLeft: 4 }}>b{n.startBeat.toFixed(1)}</span>
            </div>
          ))}
          {result.melody.length > 8 && (
            <div style={{ padding: '3px 9px', borderRadius: 4, background: '#1e293b', fontSize: 11, color: '#475569' }}>+{result.melody.length - 8} more</div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onLoad(result)}
          style={{ flex: 1, padding: '10px 0', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg,#7c3aed,#0891b2)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
        >
          Load into Arranger
        </button>
        <button onClick={onReset} style={{ padding: '10px 14px', borderRadius: 7, border: '1px solid #334155', background: 'transparent', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>
          Try again
        </button>
      </div>
    </div>
  )

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: 480, background: '#1e293b', borderRadius: 10, padding: 24, border: '1px solid #334155', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9' }}>Import Melody</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', fontSize: 20, cursor: 'pointer', padding: '4px 8px' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 18, borderBottom: '1px solid #334155' }}>
          {(['file', 'mic'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '7px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                color: tab === t ? '#7c3aed' : '#475569',
                borderBottom: tab === t ? '2px solid #7c3aed' : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {t === 'file' ? '⬆ File' : '🎙 Record'}
            </button>
          ))}
        </div>

        {/* FILE TAB */}
        {tab === 'file' && (
          preview ? (
            <PreviewCard result={preview} onReset={() => { setPreview(null); setFile(null); setFileError(null) }} />
          ) : (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                  height: 150, borderRadius: 8, cursor: 'pointer',
                  border: `2px dashed ${dragging ? '#7c3aed' : file ? '#16a34a' : '#334155'}`,
                  background: dragging ? '#2d1b6922' : '#0f172a',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 8, transition: 'border-color 0.15s',
                }}
              >
                <div style={{ fontSize: 28 }}>{file ? '🎵' : '⬆️'}</div>
                {file ? (
                  <>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#86efac' }}>{file.name}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{(file.size / 1024).toFixed(0)} KB</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>Drop audio, MIDI, or ABC here</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>or click to browse</div>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept=".mp3,.wav,.m4a,.ogg,.flac,.mid,.midi,.abc,.pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              <div style={{ marginTop: 8, fontSize: 11, color: '#475569', textAlign: 'center' }}>
                Audio (mp3/wav/m4a/ogg) · MIDI (.mid) · ABC notation (.abc)
              </div>
              {fileError && <div style={{ marginTop: 10, padding: '9px 12px', borderRadius: 6, background: '#450a0a', color: '#fca5a5', fontSize: 12, lineHeight: 1.5 }}>{fileError}</div>}
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                {file && !uploading && (
                  <button onClick={handleUpload} style={{ flex: 1, padding: '10px 0', borderRadius: 7, border: 'none', background: 'linear-gradient(135deg,#7c3aed,#0891b2)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                    Analyze &amp; Extract Melody
                  </button>
                )}
                {uploading && <div style={{ flex: 1, padding: '10px 0', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Analyzing… (audio may take a moment)</div>}
                {!file && <button onClick={() => fileInputRef.current?.click()} style={{ flex: 1, padding: '10px 0', borderRadius: 7, border: '1px solid #334155', background: '#0f172a', color: '#94a3b8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Browse Files</button>}
                <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: 7, border: '1px solid #334155', background: 'transparent', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              </div>
            </>
          )
        )}

        {/* MIC TAB */}
        {tab === 'mic' && (
          !hasMicSupport ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: '#475569', fontSize: 13 }}>
              Microphone access is not available in this browser.
            </div>
          ) : micPreview ? (
            <PreviewCard result={micPreview} onReset={() => { setMicPreview(null); setMicError(null); setElapsed(0); setLiveNote('') }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0' }}>
              {/* Live pitch display */}
              <div style={{
                width: 140, height: 140, borderRadius: '50%',
                border: `3px solid ${recording ? '#dc2626' : '#334155'}`,
                background: recording ? '#450a0a22' : '#0f172a',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                transition: 'border-color 0.2s, background 0.2s',
              }}>
                {recording ? (
                  <>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#f87171', fontFamily: 'monospace' }}>
                      {liveNote || '—'}
                    </div>
                    <div style={{ fontSize: 13, color: '#dc2626', fontFamily: 'monospace', fontWeight: 700 }}>{fmt(elapsed)}</div>
                    <div style={{ fontSize: 10, color: '#7f1d1d' }}>● REC</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 32 }}>🎙</div>
                    <div style={{ fontSize: 11, color: '#475569', textAlign: 'center', lineHeight: 1.4 }}>Play single<br />notes clearly</div>
                  </>
                )}
              </div>

              {micError && (
                <div style={{ padding: '9px 12px', borderRadius: 6, background: '#450a0a', color: '#fca5a5', fontSize: 12, lineHeight: 1.5, width: '100%' }}>
                  {micError}
                </div>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                {!recording ? (
                  <button
                    onClick={startRecording}
                    style={{ padding: '10px 28px', borderRadius: 7, border: 'none', background: '#dc2626', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                  >
                    ● Record
                  </button>
                ) : (
                  <button
                    onClick={stopAndAnalyze}
                    style={{ padding: '10px 28px', borderRadius: 7, border: 'none', background: '#1e293b', border2: '1px solid #dc2626', color: '#f87171', fontSize: 13, fontWeight: 700, cursor: 'pointer' } as React.CSSProperties}
                  >
                    ⏹ Stop
                  </button>
                )}
                <button onClick={onClose} style={{ padding: '10px 16px', borderRadius: 7, border: '1px solid #334155', background: 'transparent', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              </div>

              <div style={{ fontSize: 11, color: '#334155', textAlign: 'center', lineHeight: 1.6 }}>
                Play one note at a time — single melody line only.<br />
                Assumes 80 bpm. Adjust tempo in the arranger after loading.
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
