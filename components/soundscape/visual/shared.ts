import type { NoteEvent } from '@/lib/soundscape/fixtures'
import type { TLTrack } from './EventTimeline'

/** Event arrays (the same ones the audio plays) -> timeline tracks. Lower voice = role 'drone', upper = 'melody'. */
export function tracksOf(events: NoteEvent[], opts: { lower?: string; upper?: string; relabel?: (e: NoteEvent) => string | undefined; hide?: (e: NoteEvent) => boolean } = {}): TLTrack[] {
  const mk = (role: 'drone' | 'melody', id: 'lower' | 'upper', label: string): TLTrack => ({
    id, label, role: id,
    events: events.filter(e => e.role === role || (role === 'melody' && e.role === 'pivot')).map(e => ({ midi: e.midi, start: e.start, dur: e.dur, label: opts.relabel?.(e), hidden: opts.hide?.(e) })),
  })
  return [mk('drone', 'lower', opts.lower ?? 'Lower voice'), mk('melody', 'upper', opts.upper ?? 'Upper voice')].filter(t => t.events.length > 0)
}
