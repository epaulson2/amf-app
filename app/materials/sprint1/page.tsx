'use client'

import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'recreation',
    label: 'Recreations',
    description: 'Clean versions of assets from the original Plogger Method source material.',
    color: '#d6eafc',
    textColor: '#1a5a8a',
    badge: 'Recreation',
  },
  {
    id: 'enhancement',
    label: 'Enhancements',
    description: 'Source assets enriched with cross-system information — Plogger + zone system + fretboard + harmonic movement sequence.',
    color: '#d9f5e4',
    textColor: '#1e6b42',
    badge: 'Enhancement',
  },
  {
    id: 'original',
    label: 'AMF Originals',
    description: 'New assets created to fill gaps that no single source addresses — unique to AMF.',
    color: '#ede9fe',
    textColor: '#4b2d8c',
    badge: 'Original',
  },
]

const ASSETS = [
  {
    id: 'R1',
    category: 'recreation',
    title: '[3] and [4] Focus Card',
    subtitle: 'Sprint 1 gate skill — minor vs. major quality di-chords',
    file: '/assets/sprint1/R1_focus_card_3_4.html',
    priority: 1,
  },
  {
    id: 'R2',
    category: 'recreation',
    title: 'Di-Chord Pictograph Reference',
    subtitle: 'All 11 di-chords — shape, shadow, color',
    file: '/assets/sprint1/R2_pictograph_reference.html',
    priority: 6,
  },
  {
    id: 'R3',
    category: 'recreation',
    title: 'Pulsation Wave Diagram',
    subtitle: 'Three pulsation families — 8Hz / 4Hz / 2Hz',
    file: '/assets/sprint1/R3_pulsation_diagram.html',
    priority: 7,
  },
  {
    id: 'R4',
    category: 'recreation',
    title: 'Di-Chord Sound Factors Reference',
    subtitle: 'All three factors for all 11 di-chords',
    file: '/assets/sprint1/R4_sound_factors_reference.html',
    priority: 10,
  },
  {
    id: 'E1',
    category: 'enhancement',
    title: 'Zone 1 — Guitar Fretboard',
    subtitle: 'Am chord tones across the neck with di-chord labels',
    file: '/assets/sprint1/E1_zone1_guitar_fretboard.html',
    priority: 2,
  },
  {
    id: 'E2',
    category: 'enhancement',
    title: 'Zone 1 — Piano Keyboard',
    subtitle: 'Am chord tones on keys with five-finger position',
    file: '/assets/sprint1/E2_zone1_piano_keyboard.html',
    priority: 3,
  },
  {
    id: 'E3',
    category: 'enhancement',
    title: 'Di-Chord → Root Movement Preview',
    subtitle: 'Plogger-to-Harmony connection — the full movement spine',
    file: '/assets/sprint1/E3_root_movement_preview.html',
    priority: 9,
  },
  {
    id: 'O1',
    category: 'original',
    title: "Ain't No Sunshine — Analysis Sheet",
    subtitle: 'Chord map · root movements · Zone 1 melody · rhythm grid',
    file: '/assets/sprint1/O1_aint_no_sunshine_analysis.html',
    priority: 5,
  },
  {
    id: 'O2',
    category: 'original',
    title: 'Rhythm Code 8-Position Grid Card',
    subtitle: 'Binary grid · stops · anticipations · Longy notation',
    file: '/assets/sprint1/O2_rhythm_grid_card.html',
    priority: 4,
  },
  {
    id: 'O3',
    category: 'original',
    title: 'Hear → Sing → Name Cycle',
    subtitle: 'The AMF di-chord practice method visualized',
    file: '/assets/sprint1/O3_hear_sing_name_cycle.html',
    priority: 8,
  },
  {
    id: 'O4',
    category: 'original',
    title: 'Sprint 1 Daily Session Map',
    subtitle: 'Five-section 60-minute session at a glance',
    file: '/assets/sprint1/O4_daily_session_map.html',
    priority: 11,
  },
]

const PRIORITY_LABEL: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Day 1', color: '#922B21', bg: '#fde8e8' },
  2: { label: 'Day 1', color: '#922B21', bg: '#fde8e8' },
  3: { label: 'Day 1', color: '#922B21', bg: '#fde8e8' },
  4: { label: 'Day 1', color: '#922B21', bg: '#fde8e8' },
  5: { label: 'Day 1', color: '#922B21', bg: '#fde8e8' },
  6: { label: 'Week 1', color: '#1e6b42', bg: '#d9f5e4' },
  7: { label: 'Week 1', color: '#1e6b42', bg: '#d9f5e4' },
  8: { label: 'Week 1', color: '#1e6b42', bg: '#d9f5e4' },
  9: { label: 'Week 1', color: '#1e6b42', bg: '#d9f5e4' },
  10: { label: 'Later', color: '#555', bg: '#f0f0f0' },
  11: { label: 'Later', color: '#555', bg: '#f0f0f0' },
}

export default function Sprint1AssetsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState<string | null>(null)

  const filtered = activeCategory
    ? ASSETS.filter(a => a.category === activeCategory)
    : ASSETS

  const fullscreenAsset = fullscreen ? ASSETS.find(a => a.id === fullscreen) : null

  return (
    <div>
      {/* Hero */}
      <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7a9bd4' }}>
            Sprint 1 · Visual Assets
          </p>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-3 uppercase">
            Sprint 1 Assets
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
            11 reference assets for Sprint 1 — di-chord ear training, Zone 1 fretboard and keyboard maps, rhythm grid, and anchor song analysis. Organized by build priority.
          </p>
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 35%,#1E8449 65%,#1a5a8a 100%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all border"
            style={{
              background: activeCategory === null ? '#0f172a' : '#fff',
              color: activeCategory === null ? '#fff' : '#555',
              borderColor: activeCategory === null ? '#0f172a' : '#e2e8f0',
            }}
          >
            All 11 Assets
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className="px-4 py-2 rounded-lg text-sm font-bold transition-all border"
              style={{
                background: activeCategory === cat.id ? cat.color : '#fff',
                color: activeCategory === cat.id ? cat.textColor : '#555',
                borderColor: activeCategory === cat.id ? cat.textColor : '#e2e8f0',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category description */}
        {activeCategory && (() => {
          const cat = CATEGORIES.find(c => c.id === activeCategory)!
          return (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: cat.color, color: cat.textColor }}>
              {cat.description}
            </div>
          )
        })()}

        {/* Asset grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered
            .sort((a, b) => a.priority - b.priority)
            .map(asset => {
              const cat = CATEGORIES.find(c => c.id === asset.category)!
              const pri = PRIORITY_LABEL[asset.priority]
              return (
                <div
                  key={asset.id}
                  className="border border-slate-200 rounded-xl overflow-hidden flex flex-col"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: cat.color, color: cat.textColor }}
                      >
                        {asset.id}
                      </span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ background: pri.bg, color: pri.color }}
                      >
                        {pri.label}
                      </span>
                    </div>
                    <a
                      href={asset.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      Open ↗
                    </a>
                  </div>

                  {/* Iframe preview — click to fullscreen */}
                  <div
                    className="relative bg-white cursor-pointer overflow-hidden"
                    style={{ height: 220 }}
                    onClick={() => setFullscreen(asset.id)}
                    title="Click to expand"
                  >
                    <iframe
                      src={asset.file}
                      className="absolute top-0 left-0 border-none pointer-events-none"
                      style={{
                        width: '200%',
                        height: '200%',
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                      }}
                      title={asset.title}
                    />
                    {/* Expand hint overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(15,23,42,0.35)' }}
                    >
                      <span className="text-white text-sm font-bold px-3 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        Click to expand
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 flex-1 flex flex-col justify-between" style={{ background: '#fafafa' }}>
                    <div>
                      <p className="font-bold text-sm text-slate-800 leading-tight">{asset.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{asset.subtitle}</p>
                    </div>
                    <button
                      onClick={() => setFullscreen(asset.id)}
                      className="mt-3 w-full py-1.5 rounded-lg text-xs font-bold transition-colors"
                      style={{ background: cat.color, color: cat.textColor }}
                    >
                      Full View
                    </button>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Priority legend */}
        <div className="mt-10 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 text-xs">
          <span className="font-bold text-slate-600">Build Priority:</span>
          <span className="px-2 py-0.5 rounded font-semibold" style={{ background: '#fde8e8', color: '#922B21' }}>Day 1 — needed before first practice session</span>
          <span className="px-2 py-0.5 rounded font-semibold" style={{ background: '#d9f5e4', color: '#1e6b42' }}>Week 1 — build alongside</span>
          <span className="px-2 py-0.5 rounded font-semibold" style={{ background: '#f0f0f0', color: '#555' }}>Later — completes the set</span>
        </div>

      </div>

      {/* Fullscreen modal */}
      {fullscreenAsset && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(15,23,42,0.92)' }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{
                  background: CATEGORIES.find(c => c.id === fullscreenAsset.category)!.color,
                  color: CATEGORIES.find(c => c.id === fullscreenAsset.category)!.textColor,
                }}
              >
                {fullscreenAsset.id}
              </span>
              <span className="text-white font-bold text-sm">{fullscreenAsset.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={fullscreenAsset.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                Open in new tab ↗
              </a>
              <button
                onClick={() => setFullscreen(null)}
                className="text-slate-400 hover:text-white transition-colors text-lg font-bold ml-2"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Fullscreen iframe */}
          <div className="flex-1 bg-white">
            <iframe
              src={fullscreenAsset.file}
              className="w-full h-full border-none"
              title={fullscreenAsset.title}
            />
          </div>

          {/* Modal footer — prev/next */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-slate-700">
            <button
              onClick={() => {
                const sorted = ASSETS.sort((a, b) => a.priority - b.priority)
                const idx = sorted.findIndex(a => a.id === fullscreen)
                if (idx > 0) setFullscreen(sorted[idx - 1].id)
              }}
              className="text-slate-300 hover:text-white text-sm font-semibold transition-colors"
            >
              ← Previous
            </button>
            <span className="text-slate-500 text-xs">
              {ASSETS.sort((a, b) => a.priority - b.priority).findIndex(a => a.id === fullscreen) + 1} of {ASSETS.length}
            </span>
            <button
              onClick={() => {
                const sorted = ASSETS.sort((a, b) => a.priority - b.priority)
                const idx = sorted.findIndex(a => a.id === fullscreen)
                if (idx < sorted.length - 1) setFullscreen(sorted[idx + 1].id)
              }}
              className="text-slate-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
