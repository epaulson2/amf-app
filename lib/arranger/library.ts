import type { Arrangement, NoteEvent, ChordEvent } from './types'

export interface SavedArrangement {
  id: string
  title: string
  folder: string
  savedAt: string
  arrangement: Arrangement
  melody: NoteEvent[]
  chords: ChordEvent[]
  tuningKey: string
  abcText?: string
}

const KEY = 'amf-arrangements'

function load(): SavedArrangement[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

function persist(items: SavedArrangement[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function saveArrangement(entry: Omit<SavedArrangement, 'id' | 'savedAt'>): SavedArrangement {
  const all = load()
  const saved: SavedArrangement = {
    ...entry,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
  persist([saved, ...all])
  return saved
}

export function loadAll(): SavedArrangement[] {
  return load()
}

export function deleteArrangement(id: string) {
  persist(load().filter(a => a.id !== id))
}

export function getFolders(): string[] {
  const all = load()
  return [...new Set(all.map(a => a.folder))].sort()
}

export function searchArrangements(query: string): SavedArrangement[] {
  if (!query.trim()) return load()
  const q = query.toLowerCase()
  return load().filter(
    a => a.title.toLowerCase().includes(q) || a.folder.toLowerCase().includes(q)
  )
}
