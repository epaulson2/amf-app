'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { loadAll, deleteArrangement, searchArrangements, getFolders } from '@/lib/arranger/library'
import type { SavedArrangement } from '@/lib/arranger/library'
import Link from 'next/link'

const MODE_COLORS: Record<string, string> = {
  'simple': '#0891b2', 'drone': '#7c3aed', 'harmonic': '#d97706', 'voice-led': '#16a34a',
  'first-species': '#0891b2', 'second-species': '#16a34a', 'free-counterpoint': '#7c3aed', 'imitation': '#d97706',
}

export default function LibraryPage() {
  const router = useRouter()
  const [all, setAll] = useState<SavedArrangement[]>([])
  const [query, setQuery] = useState('')
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set())

  useEffect(() => {
    const items = loadAll()
    setAll(items)
    setOpenFolders(new Set(getFolders()))
  }, [])

  const filtered = query.trim() ? searchArrangements(query) : all
  const folders = [...new Set(filtered.map(a => a.folder))].sort()

  const handleLoad = useCallback((saved: SavedArrangement) => {
    sessionStorage.setItem('amf-load-arrangement', JSON.stringify(saved))
    router.push('/arranger')
  }, [router])

  const handleDelete = useCallback((id: string) => {
    deleteArrangement(id)
    setAll(loadAll())
  }, [])

  const toggleFolder = (folder: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev)
      next.has(folder) ? next.delete(folder) : next.add(folder)
      return next
    })
  }

  return (
    <main style={{ background: '#0f172a', minHeight: '100vh' }}>
      <div style={{ borderBottom: '1px solid #1e293b' }}>
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-8">
          <div style={{ height: 3, background: 'linear-gradient(90deg,#7c3aed,#0891b2,#16a34a,#d97706)', borderRadius: 2, marginBottom: 28 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#7c3aed', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                AMF Fingerstyle Arranger
              </p>
              <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>
                Arrangement Library
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                {all.length} saved arrangement{all.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link
              href="/arranger"
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              ← Back to Arranger
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <input
          type="text"
          placeholder="Search by title or folder…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 8,
            background: '#1e293b', border: '1px solid #334155',
            color: '#f1f5f9', fontSize: 14, marginBottom: 24, boxSizing: 'border-box',
          }}
        />

        {all.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎸</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>No arrangements yet</div>
            <div style={{ fontSize: 14 }}>Generate an arrangement and click Save to store it here.</div>
          </div>
        )}

        {folders.map(folder => (
          <div key={folder} style={{ marginBottom: 24 }}>
            <button
              onClick={() => toggleFolder(folder)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '8px 12px', borderRadius: 8, border: '1px solid #1e293b',
                background: '#1e293b', color: '#94a3b8', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 10 }}>{openFolders.has(folder) ? '▼' : '▶'}</span>
              {folder}
              <span style={{ fontSize: 11, color: '#475569', fontWeight: 400, marginLeft: 'auto' }}>
                {filtered.filter(a => a.folder === folder).length} arrangement{filtered.filter(a => a.folder === folder).length !== 1 ? 's' : ''}
              </span>
            </button>

            {openFolders.has(folder) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.filter(a => a.folder === folder).map(saved => (
                  <div
                    key={saved.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 8, border: '1px solid #1e293b',
                      background: '#0f1629',
                    }}
                  >
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: MODE_COLORS[saved.arrangement?.mode ?? ''] ?? '#7c3aed',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                        {saved.title}
                      </div>
                      <div style={{ color: '#475569', fontSize: 11 }}>
                        {saved.tuningKey} · {new Date(saved.savedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleLoad(saved)}
                      style={{
                        padding: '6px 14px', borderRadius: 6, border: '1px solid #334155',
                        background: '#1e293b', color: '#f1f5f9', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(saved.id)}
                      style={{
                        padding: '6px 10px', borderRadius: 6, border: '1px solid #450a0a',
                        background: '#2d0a0a', color: '#f87171', fontSize: 12, cursor: 'pointer',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
