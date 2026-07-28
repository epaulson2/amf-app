'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Arrangement, NoteEvent, ChordEvent, Tuning } from '@/lib/arranger'

interface AiMessage {
  role: 'user' | 'assistant'
  content: string
  techniqueName?: string
  amfVocabulary?: string
  listenFor?: string
}

interface AiCollaboratorProps {
  arrangement: Arrangement | null
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuning: Tuning
  onArrangementUpdate: (arr: Arrangement) => void
}

export default function AiCollaborator({
  arrangement,
  melody,
  chords,
  tuning,
  onArrangementUpdate,
}: AiCollaboratorProps) {
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startRecording = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SRClass = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SRClass) return
    const recognition = new SRClass()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript ?? ''
      setInput(transcript)
    }
    recognition.onerror = () => setIsRecording(false)
    recognition.onend = () => setIsRecording(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }, [])

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
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }])
        return
      }
      if (data.arrangement) onArrangementUpdate(data.arrangement)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.explanation,
        techniqueName: data.techniqueName,
        amfVocabulary: data.amfVocabulary,
        listenFor: data.listenFor,
      }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Request failed. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }, [input, arrangement, melody, chords, tuning, onArrangementUpdate, loading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
  }

  if (!arrangement) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#475569' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
        <div style={{ fontSize: 13 }}>Generate an arrangement to start the AI conversation.</div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 360 }}>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 320, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 8 }}>
        {messages.length === 0 && (
          <div style={{ padding: '8px 0', color: '#475569', fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: '#94a3b8' }}>AI Collaborator ready.</strong> Try:
            <ul style={{ marginTop: 6, paddingLeft: 16, color: '#64748b' }}>
              <li>&quot;Add more dissonance in the bass&quot;</li>
              <li>&quot;Simplify — just melody and bass&quot;</li>
              <li>&quot;Add a suspension at the cadence&quot;</li>
              <li>&quot;More open strings, Bensusan style&quot;</li>
            </ul>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' ? (
              <div style={{ color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>
                You: {msg.content}
              </div>
            ) : (
              <div style={{ background: '#0f1629', border: '1px solid #1e293b', borderRadius: 8, padding: 12 }}>
                {msg.techniqueName && (
                  <div style={{ marginBottom: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: '#4c1d95', color: '#c4b5fd', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                      {msg.techniqueName}
                    </span>
                    {msg.amfVocabulary && (
                      <span style={{ background: '#164e63', color: '#67e8f9', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                        AMF: {msg.amfVocabulary}
                      </span>
                    )}
                  </div>
                )}
                <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{msg.content}</div>
                {msg.listenFor && (
                  <div style={{ marginTop: 8, padding: '6px 10px', background: '#0d2337', borderRadius: 4, fontSize: 12, color: '#7dd3fc' }}>
                    👂 Listen for: {msg.listenFor}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && <div style={{ color: '#475569', fontSize: 13 }}>Thinking…</div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ borderTop: '1px solid #1e293b', paddingTop: 12, marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe a change… (Enter to send)"
            rows={2}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: 8,
              background: '#1e293b', border: '1px solid #334155',
              color: '#f1f5f9', fontSize: 13, resize: 'none', fontFamily: 'inherit',
            }}
          />
          {hasSpeechSupport && (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              title={isRecording ? 'Stop recording' : 'Speak your instruction'}
              style={{
                padding: '8px 12px', borderRadius: 8,
                border: `1px solid ${isRecording ? '#dc2626' : '#334155'}`,
                background: isRecording ? '#450a0a' : '#1e293b',
                color: isRecording ? '#f87171' : '#94a3b8',
                cursor: 'pointer', fontSize: 18,
              }}
            >
              {isRecording ? '⏹' : '🎙'}
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            style={{
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: (!input.trim() || loading) ? '#334155' : 'linear-gradient(135deg,#7c3aed,#0891b2)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
            }}
          >
            Send
          </button>
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: '#334155' }}>Shift+Enter for new line · Enter to send</div>
      </div>
    </div>
  )
}
