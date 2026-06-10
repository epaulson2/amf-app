'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function pathToContext(path: string): string {
  if (path === '/') return 'AMF home page / overview'
  if (path.match(/\/day\/(\d+)/)) {
    const day = path.match(/\/day\/(\d+)/)![1]
    return `Day ${day} practice page`
  }
  if (path.match(/\/week\/(\d+)/)) return `Week ${path.match(/\/week\/(\d+)/)![1]} overview`
  if (path.match(/\/history\/unit-(\d+)/)) return `History Unit ${path.match(/\/history\/unit-(\d+)/)![1]}`
  if (path.includes('/history')) return 'Historical curriculum course home'
  if (path.includes('/core/month-1')) return 'Core Curriculum: Month 1 Stabilize'
  if (path.includes('/core/month-2')) return 'Core Curriculum: Month 2 Vary'
  if (path.includes('/core/month-3')) return 'Core Curriculum: Month 3 Adapt'
  if (path.includes('/core/overview')) return 'Core Curriculum overview'
  if (path.includes('/core')) return 'Core Curriculum hub'
  if (path.includes('/guitar')) return 'Guitar Track'
  if (path.includes('/piano')) return 'Piano Track'
  if (path.includes('/progress')) return 'Progress Tracker'
  if (path.includes('/songs')) return 'Anchor Songs / Lead Sheets'
  if (path.includes('/systems/')) {
    const slug = path.split('/systems/')[1].split('/')[0]
    return `AMF System: ${slug}`
  }
  if (path.includes('/genre-labs/')) {
    const slug = path.split('/genre-labs/')[1]
    return `Genre Lab: ${slug}`
  }
  if (path.includes('/curriculum')) return 'Curriculum section'
  return path
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const pathname = usePathname()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return

    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setStreaming(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages([...next, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.map(m => ({ role: m.role, content: m.content })),
          pageContext: pathToContext(pathname),
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: `Error: ${err.error ?? 'Something went wrong'}` }
          return copy
        })
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: full }
          return copy
        })
      }
    } catch {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: 'Connection error — please try again.' }
        return copy
      })
    } finally {
      setStreaming(false)
    }
  }, [input, messages, streaming, pathname])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const SUGGESTED = [
    'What is PDC?',
    'How do I practice call-and-response?',
    'Why does the blues scale sound "blue"?',
    'What TPS color fits a IV chord?',
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: open ? '#334155' : '#0f172a' }}
        aria-label="AMF Tutor chat"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width: 'min(420px, calc(100vw - 32px))',
            height: 'min(580px, calc(100vh - 160px))',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#0f172a' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-white font-semibold text-sm">AMF Tutor</span>
              <span className="text-slate-400 text-xs">· Powered by Claude</span>
            </div>
            <button onClick={() => setMessages([])} className="text-slate-400 hover:text-white text-xs transition-colors">
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ backgroundColor: '#f8f7f4' }}>
            {messages.length === 0 && (
              <div>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                  Ask me anything about AMF — practice technique, music theory, history, or what something means.
                </p>
                <div className="space-y-2">
                  {SUGGESTED.map(q => (
                    <button key={q} onClick={() => { setInput(q); inputRef.current?.focus() }}
                      className="w-full text-left text-sm px-3 py-2.5 rounded-xl border bg-white hover:border-amber-400 hover:text-amber-700 transition-all"
                      style={{ borderColor: '#e2e8f0', color: '#1e293b' }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={msg.role === 'user'
                    ? { backgroundColor: '#0f172a', color: '#fff', borderBottomRightRadius: '4px' }
                    : { backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderBottomLeftRadius: '4px' }
                  }
                >
                  {msg.role === 'assistant' && msg.content === '' && streaming
                    ? <TypingDots />
                    : msg.content
                  }
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t flex items-end gap-2 flex-shrink-0" style={{ borderColor: '#e2e8f0', backgroundColor: '#fff' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about AMF, technique, history…"
              rows={1}
              disabled={streaming}
              className="flex-1 resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                borderColor: '#e2e8f0',
                maxHeight: '120px',
                lineHeight: '1.5',
              }}
              onInput={e => {
                const el = e.currentTarget
                el.style.height = 'auto'
                el.style.height = Math.min(el.scrollHeight, 120) + 'px'
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || streaming}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                backgroundColor: input.trim() && !streaming ? '#d97706' : '#e2e8f0',
                color: input.trim() && !streaming ? '#fff' : '#94a3b8',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
