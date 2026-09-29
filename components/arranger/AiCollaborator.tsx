'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Arrangement, NoteEvent, ChordEvent, Tuning } from '@/lib/arranger'

// ── Types ────────────────────────────────────────────────────────────────────

interface AiMessage {
  role: 'user' | 'assistant'
  content: string
  techniqueName?: string
  amfVocabulary?: string
  listenFor?: string
}

interface TutorLesson {
  techniqueTitle: string
  amfConcepts: string[]
  intro: string
  steps: Array<{ title: string; body: string }>
  question: string
  listenFor: string
}

interface TutorMessage {
  role: 'user' | 'assistant'
  content: string
}

interface AiCollaboratorProps {
  arrangement: Arrangement | null
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
  onArrangementUpdate: (arr: Arrangement) => void
  autoTopic?: string
}

const QUICK_TOPICS = [
  '1st Species Counterpoint', '2nd Species Counterpoint', 'Suspensions',
  'Imitation', 'Open String Drones', 'Voice Leading', 'Period Form', 'Passing Tones',
]

// ── Tab bar ──────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: 'assist' | 'tutor'; onChange: (t: 'assist' | 'tutor') => void }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
      {(['assist', 'tutor'] as const).map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: '4px 14px', borderRadius: 20, border: '1px solid',
          borderColor: active === t ? '#7c3aed' : '#334155',
          background: active === t ? '#4c1d9522' : 'transparent',
          color: active === t ? '#c4b5fd' : '#475569',
          fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize',
        }}>
          {t === 'assist' ? 'Assist' : '🎓 Tutor'}
        </button>
      ))}
    </div>
  )
}

// ── ASSIST tab ───────────────────────────────────────────────────────────────

function AssistTab({ arrangement, melody, chords, tuning, onArrangementUpdate }: AiCollaboratorProps) {
  const [messages, setMessages] = useState<AiMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SRClass = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    setHasSpeechSupport(!!SRClass)
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const startRecording = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SRClass = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SRClass) return
    const recognition = new SRClass()
    recognition.continuous = false; recognition.interimResults = false; recognition.lang = 'en-US'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => setInput(event.results[0]?.[0]?.transcript ?? '')
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start(); setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => { recognitionRef.current?.stop(); setIsRecording(false) }, [])

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || !arrangement || loading) return
    const instruction = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: instruction }])
    setLoading(true)
    try {
      const res = await fetch('/api/arrange/ai-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction, arrangement, melody, chords, tuning }),
      })
      const data = await res.json()
      if (data.error) { setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]); return }
      if (data.arrangement) onArrangementUpdate(data.arrangement)
      setMessages(prev => [...prev, {
        role: 'assistant', content: data.explanation,
        techniqueName: data.techniqueName, amfVocabulary: data.amfVocabulary, listenFor: data.listenFor,
      }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Request failed. Please try again.' }])
    } finally { setLoading(false) }
  }, [input, arrangement, melody, chords, tuning, onArrangementUpdate, loading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  if (!arrangement) {
    return <div style={{ padding: '20px 0', textAlign: 'center', color: '#475569', fontSize: 12 }}>Generate an arrangement to start the AI conversation.</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ color: '#475569', fontSize: 12, lineHeight: 1.6 }}>
            <strong style={{ color: '#94a3b8' }}>Try:</strong>
            <ul style={{ marginTop: 4, paddingLeft: 16, color: '#64748b', fontSize: 11 }}>
              <li>&quot;Add more dissonance in the bass&quot;</li>
              <li>&quot;Add a suspension at the cadence&quot;</li>
              <li>&quot;More open strings, Bensusan style&quot;</li>
            </ul>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' ? (
              <div style={{ color: '#94a3b8', fontSize: 12, fontStyle: 'italic' }}>You: {msg.content}</div>
            ) : (
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 7, padding: 10 }}>
                {msg.techniqueName && (
                  <div style={{ marginBottom: 6, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <span style={{ background: '#4c1d95', color: '#c4b5fd', padding: '1px 7px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{msg.techniqueName}</span>
                    {msg.amfVocabulary && <span style={{ background: '#164e63', color: '#67e8f9', padding: '1px 7px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>AMF: {msg.amfVocabulary}</span>}
                  </div>
                )}
                <div style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.6 }}>{msg.content}</div>
                {msg.listenFor && (
                  <div style={{ marginTop: 6, padding: '5px 8px', background: '#0d2337', borderRadius: 4, fontSize: 11, color: '#7dd3fc' }}>
                    👂 {msg.listenFor}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{ color: '#475569', fontSize: 12 }}>Thinking…</div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ borderTop: '1px solid #1e293b', paddingTop: 10, display: 'flex', gap: 6 }}>
        <textarea
          value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Describe a change… (Enter to send)" rows={2}
          style={{ flex: 1, padding: '7px 10px', borderRadius: 7, background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9', fontSize: 12, resize: 'none', fontFamily: 'inherit' }}
        />
        {hasSpeechSupport && (
          <button onClick={isRecording ? stopRecording : startRecording}
            style={{ padding: '7px 10px', borderRadius: 7, border: `1px solid ${isRecording ? '#dc2626' : '#334155'}`, background: isRecording ? '#450a0a' : '#1e293b', color: isRecording ? '#f87171' : '#94a3b8', cursor: 'pointer', fontSize: 16 }}>
            {isRecording ? '⏹' : '🎙'}
          </button>
        )}
        <button onClick={handleSubmit} disabled={!input.trim() || loading}
          style={{ padding: '7px 14px', borderRadius: 7, border: 'none', background: (!input.trim() || loading) ? '#334155' : 'linear-gradient(135deg,#7c3aed,#0891b2)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer' }}>
          Send
        </button>
      </div>
      <div style={{ fontSize: 10, color: '#334155' }}>Shift+Enter for new line · Enter to send</div>
    </div>
  )
}

// ── TUTOR tab ────────────────────────────────────────────────────────────────

function TutorTab({ onArrangementUpdate, autoTopic }: { onArrangementUpdate: (arr: Arrangement) => void; autoTopic?: string }) {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lesson, setLesson] = useState<TutorLesson | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([])
  const [followUpInput, setFollowUpInput] = useState('')
  const [followUpLoading, setFollowUpLoading] = useState(false)
  const [activeTopic, setActiveTopic] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const autoFiredRef = useRef(false)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [tutorMessages])

  const startLesson = useCallback(async (topicOverride?: string) => {
    const effectiveTopic = topicOverride ?? topic
    if (!effectiveTopic.trim()) return
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/arrange/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: effectiveTopic.trim() }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setLesson({ techniqueTitle: data.techniqueTitle, amfConcepts: data.amfConcepts ?? [], intro: data.intro, steps: data.steps ?? [], question: data.question, listenFor: data.listenFor })
      setCurrentStep(0)
      setTutorMessages([])
      setActiveTopic(effectiveTopic.trim())
      if (data.arrangement) onArrangementUpdate(data.arrangement)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start lesson')
    } finally { setLoading(false) }
  }, [topic, onArrangementUpdate])

  useEffect(() => {
    if (autoTopic && !autoFiredRef.current) {
      autoFiredRef.current = true
      setTopic(autoTopic)
      startLesson(autoTopic)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendFollowUp = useCallback(async () => {
    if (!followUpInput.trim() || followUpLoading || !lesson) return
    const msg = followUpInput.trim()
    setFollowUpInput('')
    const nextMessages: TutorMessage[] = [...tutorMessages, { role: 'user', content: msg }]
    setTutorMessages(nextMessages)
    setFollowUpLoading(true)
    try {
      const res = await fetch('/api/arrange/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: activeTopic, history: nextMessages.slice(0, -1), studentMessage: msg }),
      })
      const data = await res.json()
      if (data.message) {
        setTutorMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      }
    } catch {
      setTutorMessages(prev => [...prev, { role: 'assistant', content: 'Request failed. Try again.' }])
    } finally { setFollowUpLoading(false) }
  }, [followUpInput, followUpLoading, lesson, tutorMessages, activeTopic])

  const reset = () => { setLesson(null); setTopic(''); setTutorMessages([]); setCurrentStep(0); setError(null) }

  if (!lesson) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          value={topic} onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && startLesson()}
          placeholder="What would you like to learn?"
          style={{ padding: '8px 12px', borderRadius: 7, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 13, outline: 'none' }}
        />

        <div>
          <div style={{ fontSize: 10, color: '#334155', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 7 }}>QUICK TOPICS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {QUICK_TOPICS.map(t => (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding: '4px 10px', borderRadius: 5, border: '1px solid #334155',
                background: topic === t ? '#4c1d9522' : 'transparent',
                borderColor: topic === t ? '#7c3aed' : '#334155',
                color: topic === t ? '#c4b5fd' : '#64748b',
                fontSize: 11, cursor: 'pointer',
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && <div style={{ padding: '8px 10px', borderRadius: 6, background: '#450a0a', color: '#fca5a5', fontSize: 11 }}>{error}</div>}

        <button onClick={startLesson} disabled={!topic.trim() || loading} style={{
          padding: '10px 0', borderRadius: 7, border: 'none',
          background: (!topic.trim() || loading) ? '#334155' : 'linear-gradient(135deg,#7c3aed,#0891b2)',
          color: '#fff', fontSize: 13, fontWeight: 700, cursor: (!topic.trim() || loading) ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Preparing lesson…' : 'Start Lesson'}
        </button>

        {loading && (
          <div style={{ fontSize: 11, color: '#475569', textAlign: 'center' }}>
            Claude is composing an example and building your lesson…
          </div>
        )}
      </div>
    )
  }

  const step = lesson.steps[currentStep]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#c4b5fd', marginBottom: 5 }}>{lesson.techniqueTitle}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {lesson.amfConcepts.map(c => (
              <span key={c} style={{ background: '#164e63', color: '#67e8f9', padding: '1px 7px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{c}</span>
            ))}
          </div>
        </div>
        <button onClick={reset} style={{ fontSize: 10, color: '#475569', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          New lesson
        </button>
      </div>

      {/* Intro */}
      <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7, borderLeft: '2px solid #334155', paddingLeft: 10 }}>
        {lesson.intro}
      </div>

      {/* Step navigator */}
      {lesson.steps.length > 0 && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 7, padding: '12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.08em' }}>
              STEP {currentStep + 1} OF {lesson.steps.length}
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0}
                style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #334155', background: 'transparent', color: currentStep === 0 ? '#334155' : '#94a3b8', fontSize: 11, cursor: currentStep === 0 ? 'not-allowed' : 'pointer' }}>
                ←
              </button>
              <button onClick={() => setCurrentStep(s => Math.min(lesson.steps.length - 1, s + 1))} disabled={currentStep === lesson.steps.length - 1}
                style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #334155', background: 'transparent', color: currentStep === lesson.steps.length - 1 ? '#334155' : '#94a3b8', fontSize: 11, cursor: currentStep === lesson.steps.length - 1 ? 'not-allowed' : 'pointer' }}>
                →
              </button>
            </div>
          </div>
          {step && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 5 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7 }}>{step.body}</div>
            </>
          )}
        </div>
      )}

      {/* Listen for */}
      {lesson.listenFor && (
        <div style={{ padding: '8px 12px', background: '#0d2337', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 12, color: '#7dd3fc' }}>
          👂 <strong>Listen for:</strong> {lesson.listenFor}
        </div>
      )}

      {/* Question */}
      {lesson.question && (
        <div style={{ padding: '8px 12px', background: '#1c1408', border: '1px solid #78350f', borderRadius: 6, fontSize: 12, color: '#fcd34d', fontStyle: 'italic' }}>
          💭 {lesson.question}
        </div>
      )}

      {/* Follow-up conversation */}
      <div style={{ borderTop: '1px solid #1e293b', paddingTop: 10 }}>
        <div style={{ fontSize: 10, color: '#334155', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8 }}>ASK YOUR TUTOR</div>

        {tutorMessages.length > 0 && (
          <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
            {tutorMessages.map((m, i) => (
              <div key={i}>
                {m.role === 'user' ? (
                  <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>You: {m.content}</div>
                ) : (
                  <div style={{ fontSize: 11, color: '#cbd5e1', lineHeight: 1.7, background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, padding: '8px 10px' }}>
                    {m.content}
                  </div>
                )}
              </div>
            ))}
            {followUpLoading && <div style={{ fontSize: 11, color: '#475569' }}>Tutor is thinking…</div>}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div style={{ display: 'flex', gap: 6 }}>
          <textarea
            value={followUpInput}
            onChange={e => setFollowUpInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFollowUp() } }}
            placeholder="Ask a question, request a variation…"
            rows={2}
            style={{ flex: 1, padding: '7px 10px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 11, resize: 'none', fontFamily: 'inherit' }}
          />
          <button onClick={sendFollowUp} disabled={!followUpInput.trim() || followUpLoading}
            style={{ padding: '7px 12px', borderRadius: 6, border: 'none', background: (!followUpInput.trim() || followUpLoading) ? '#334155' : 'linear-gradient(135deg,#7c3aed,#0891b2)', color: '#fff', fontSize: 11, fontWeight: 700, cursor: (!followUpInput.trim() || followUpLoading) ? 'not-allowed' : 'pointer' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AiCollaborator(props: AiCollaboratorProps) {
  const [activeTab, setActiveTab] = useState<'assist' | 'tutor'>(() =>
    props.autoTopic ? 'tutor' : 'assist'
  )

  return (
    <div>
      <TabBar active={activeTab} onChange={setActiveTab} />
      {activeTab === 'assist'
        ? <AssistTab {...props} />
        : <TutorTab onArrangementUpdate={props.onArrangementUpdate} autoTopic={props.autoTopic} />
      }
    </div>
  )
}
