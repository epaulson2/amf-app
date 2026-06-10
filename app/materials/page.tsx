'use client'

import { useState } from 'react'
import Link from 'next/link'

type ItemType = 'sheet' | 'companion' | 'infographic' | 'pdf' | 'workbook'

interface MaterialItem {
  title: string
  type: ItemType
  html?: string
  pdf?: string
}

interface Module {
  id: string
  label: string
  items: MaterialItem[]
}

interface System {
  id: string
  label: string
  description: string
  color: string
  textColor: string
  modules: Module[]
  bundlePdf?: string
}

const TYPE_LABELS: Record<ItemType, string> = {
  sheet: 'Cheat Sheet',
  companion: 'Companion',
  infographic: 'Infographic',
  pdf: 'PDF Bundle',
  workbook: 'Workbook',
}

const TYPE_COLORS: Record<ItemType, string> = {
  sheet: '#1a5a8a',
  companion: '#1e6b42',
  infographic: '#4b2d8c',
  pdf: '#7a5200',
  workbook: '#8a1a1a',
}

const TYPE_BG: Record<ItemType, string> = {
  sheet: '#d6eafc',
  companion: '#d9f5e4',
  infographic: '#ede9fe',
  pdf: '#fef3d0',
  workbook: '#fce8e8',
}

const SYSTEMS: System[] = [
  {
    id: 'amf',
    label: 'Melodic Framework',
    description: 'The Aesthetic Melody Framework — emotional zones, scale degree stability, chord tone relationships, and tension planning.',
    color: '#d6eafc',
    textColor: '#1a5a8a',
    bundlePdf: '/amf_complete_materials.zip',
    modules: [
      {
        id: 'mod-a', label: 'Module A — The Emotional Map',
        items: [
          { title: 'Sheet 1A: Emotional Map of Melody', type: 'sheet', html: '/melody_sheet_v3.html', pdf: '/melody_sheet_v3.pdf' },
          { title: 'Sheet 1B: How to Read the Emotional Map', type: 'companion', html: '/melody_sheet_1b.html', pdf: '/melody_sheet_1b.pdf' },
          { title: 'Module 1 PDF (1A + 1B)', type: 'pdf', pdf: '/emotional_map_module1.pdf' },
          { title: 'Infographic: The 4 Emotional Zones', type: 'infographic', html: '/infographic_a4_zones.html', pdf: '/infographic_a4_zones.pdf' },
        ],
      },
      {
        id: 'mod-b', label: 'Module B — Scale Degree Reference',
        items: [
          { title: 'Sheet 2A: Scale Degree Reference', type: 'sheet', html: '/melody_sheet_2a.html', pdf: '/melody_sheet_2a.pdf' },
          { title: 'Sheet 2B: Why the Stability Order Matters', type: 'companion', html: '/melody_sheet_2b.html', pdf: '/melody_sheet_2b.pdf' },
          { title: 'Module 2 PDF (2A + 2B)', type: 'pdf', pdf: '/emotional_map_module2.pdf' },
          { title: 'Infographic: The Stability Ladder', type: 'infographic', html: '/infographic_b4_ladder.html', pdf: '/infographic_b4_ladder.pdf' },
        ],
      },
      {
        id: 'mod-c', label: 'Module C — Chord Tones vs Non-Chord Tones',
        items: [
          { title: 'Sheet 3A: Chord Tone vs Non-Chord Tone', type: 'sheet', html: '/melody_sheet_3a.html', pdf: '/melody_sheet_3a.pdf' },
          { title: 'Sheet 3B: Non-Chord Tone Survival Guide', type: 'companion', html: '/melody_sheet_3b.html', pdf: '/melody_sheet_3b.pdf' },
          { title: 'Module 3 PDF (3A + 3B)', type: 'pdf', pdf: '/emotional_map_module3.pdf' },
          { title: 'Infographic: Chord Tones vs Non-Chord Tones', type: 'infographic', html: '/infographic_c4_chord_tones.html', pdf: '/infographic_c4_chord_tones.pdf' },
        ],
      },
      {
        id: 'mod-d', label: 'Module D — Context Changes Everything',
        items: [
          { title: 'Sheet 4A: Context Changes Everything', type: 'sheet', html: '/melody_sheet_4a.html', pdf: '/melody_sheet_4a.pdf' },
          { title: 'Sheet 4B: Important Melody Notes Checklist', type: 'companion', html: '/melody_sheet_4b.html', pdf: '/melody_sheet_4b.pdf' },
          { title: 'Module 4 PDF (4A + 4B)', type: 'pdf', pdf: '/emotional_map_module4.pdf' },
          { title: 'Infographic: Same Note, Different Chord', type: 'infographic', html: '/infographic_d4_context.html', pdf: '/infographic_d4_context.pdf' },
        ],
      },
      {
        id: 'mod-e', label: 'Module E — Chord Change Behaviors',
        items: [
          { title: 'Sheet 5A: Four Chord-Change Behaviors', type: 'sheet', html: '/melody_sheet_5a.html', pdf: '/melody_sheet_5a.pdf' },
          { title: 'Sheet 5B: Chord Change Pillar Notes', type: 'companion', html: '/melody_sheet_5b.html', pdf: '/melody_sheet_5b.pdf' },
          { title: 'Module 5 PDF (5A + 5B)', type: 'pdf', pdf: '/emotional_map_module5.pdf' },
          { title: 'Infographic: Melody at Chord Changes', type: 'infographic', html: '/infographic_e4_chord_changes.html', pdf: '/infographic_e4_chord_changes.pdf' },
        ],
      },
      {
        id: 'mod-f', label: 'Module F — Sweet vs Bitter Balance',
        items: [
          { title: 'Sheet 6A: Sweet vs Bitter Balance Sheet', type: 'sheet', html: '/melody_sheet_6a.html', pdf: '/melody_sheet_6a.pdf' },
          { title: 'Module 6 PDF', type: 'pdf', pdf: '/emotional_map_module6.pdf' },
          { title: 'Infographic: Tension Curve', type: 'infographic', html: '/infographic_f3_tension_curve.html', pdf: '/infographic_f3_tension_curve.pdf' },
        ],
      },
      {
        id: 'mod-g', label: 'Module G — Section Tension Planner',
        items: [
          { title: 'Sheet 7A: Section Tension Planner', type: 'sheet', html: '/melody_sheet_7a.html', pdf: '/melody_sheet_7a.pdf' },
          { title: 'Module 7 PDF', type: 'pdf', pdf: '/emotional_map_module7.pdf' },
        ],
      },
      {
        id: 'mod-h', label: 'Module H — Melody Revision Checklist',
        items: [
          { title: 'Sheet 8A: Melody Revision Checklist', type: 'sheet', html: '/melody_sheet_8a.html', pdf: '/melody_sheet_8a.pdf' },
          { title: 'Module 8 PDF', type: 'pdf', pdf: '/emotional_map_module8.pdf' },
        ],
      },
      {
        id: 'mod-infographics', label: 'Standalone Infographics',
        items: [
          { title: 'Full Color Poster', type: 'infographic', html: '/infographic_i1_poster.html', pdf: '/infographic_i1_poster.pdf' },
          { title: 'Scale Degree Stability Ladder', type: 'infographic', html: '/infographic_i2_ladder.html', pdf: '/infographic_i2_ladder.pdf' },
          { title: 'Chord Tones vs Non-Chord Tones (Poster)', type: 'infographic', html: '/infographic_i3_chord_tones.html', pdf: '/infographic_i3_chord_tones.pdf' },
          { title: 'Same Note, Different Chord (Poster)', type: 'infographic', html: '/infographic_i4_context.html', pdf: '/infographic_i4_context.pdf' },
          { title: 'How Melody Behaves at Chord Changes', type: 'infographic', html: '/infographic_i5_chord_changes.html', pdf: '/infographic_i5_chord_changes.pdf' },
          { title: 'Tension Curve — Verse / Chorus / Bridge', type: 'infographic', html: '/infographic_i6_tension_curve.html', pdf: '/infographic_i6_tension_curve.pdf' },
          { title: 'The 4 Non-Chord Tone Types', type: 'infographic', html: '/infographic_i7_nct_types.html', pdf: '/infographic_i7_nct_types.pdf' },
          { title: 'Sweet Home Chicago — Melody Analysis', type: 'infographic', html: '/infographic_i8_sweet_home_chicago.html', pdf: '/infographic_i8_sweet_home_chicago.pdf' },
        ],
      },
      {
        id: 'mod-practice', label: 'Practice & Study',
        items: [
          { title: '90-Day Practice Plan', type: 'sheet', html: '/practice_plan.html', pdf: '/amf_practice_plan.pdf' },
          { title: 'AMF 90-Day Workbook', type: 'workbook', html: '/amf_workbook.html', pdf: '/amf_workbook.pdf' },
        ],
      },
    ],
  },
  {
    id: 'harmony',
    label: 'Harmony OS',
    description: 'Functional harmony — intervals, scales, chords, the 251, secondary dominants, tritone substitution, and modal interchange.',
    color: '#fef3d0',
    textColor: '#7a5200',
    modules: [
      {
        id: 'h-mod1', label: 'Module 1 — Intervals',
        items: [
          { title: 'Sheet 1A: The 12 Intervals', type: 'sheet', html: '/harmony_sheet_1a.html', pdf: '/harmony_sheet_1a.pdf' },
          { title: 'Sheet 1B: Interval Quality System', type: 'companion', html: '/harmony_sheet_1b.html', pdf: '/harmony_sheet_1b.pdf' },
          { title: 'Infographic: Quality Progression Diagram', type: 'infographic', html: '/harmony_infographic_1_quality.html', pdf: '/harmony_infographic_1_quality.pdf' },
        ],
      },
      {
        id: 'h-mod2', label: 'Module 2 — Scales',
        items: [
          { title: 'Sheet 2A: Major Scale Builder', type: 'sheet', html: '/harmony_sheet_2a.html', pdf: '/harmony_sheet_2a.pdf' },
          { title: 'Sheet 2B: The Three Minor Scales', type: 'companion', html: '/harmony_sheet_2b.html', pdf: '/harmony_sheet_2b.pdf' },
          { title: 'Infographic: Circle of Fifths', type: 'infographic', html: '/harmony_infographic_2_circle.html', pdf: '/harmony_infographic_2_circle.pdf' },
        ],
      },
      {
        id: 'h-mod3', label: 'Module 3 — Chords: Building Blocks',
        items: [
          { title: 'Sheet 3A: Triad Types', type: 'sheet', html: '/harmony_sheet_3a.html', pdf: '/harmony_sheet_3a.pdf' },
          { title: 'Sheet 3B: 7th & 6th Chords', type: 'companion', html: '/harmony_sheet_3b.html', pdf: '/harmony_sheet_3b.pdf' },
          { title: 'Infographic: Building Chords from Stacked Thirds', type: 'infographic', html: '/harmony_infographic_3_chord_builder.html', pdf: '/harmony_infographic_3_chord_builder.pdf' },
        ],
      },
      {
        id: 'h-mod4', label: 'Module 4 — Inversions',
        items: [
          { title: 'Sheet 4A: Chord Inversions', type: 'sheet', html: '/harmony_sheet_4a.html', pdf: '/harmony_sheet_4a.pdf' },
          { title: 'Infographic: Inversions in Practice', type: 'infographic', html: '/harmony_infographic_4_inversions.html', pdf: '/harmony_infographic_4_inversions.pdf' },
        ],
      },
      {
        id: 'h-mod5', label: 'Module 5 — Functional Harmony',
        items: [
          { title: 'Sheet 5A: Color System + Diatonic Chords', type: 'sheet', html: '/harmony_sheet_5a.html', pdf: '/harmony_sheet_5a.pdf' },
          { title: 'Sheet 5B: Chord Function & Cadences', type: 'companion', html: '/harmony_sheet_5b.html', pdf: '/harmony_sheet_5b.pdf' },
          { title: 'Infographic: The Functional Flow of Harmony', type: 'infographic', html: '/harmony_infographic_5_functional_flow.html', pdf: '/harmony_infographic_5_functional_flow.pdf' },
        ],
      },
      {
        id: 'h-mod6', label: 'Module 6 — The 251 & Secondary Dominants',
        items: [
          { title: 'Sheet 6A: Secondary Dominants', type: 'sheet', html: '/harmony_sheet_6a.html', pdf: '/harmony_sheet_6a.pdf' },
          { title: 'Sheet 6B: Cycle 5 & The ii-V-I', type: 'companion', html: '/harmony_sheet_6b.html', pdf: '/harmony_sheet_6b.pdf' },
          { title: 'Infographic: The ii-V-I Explained', type: 'infographic', html: '/harmony_infographic_6_251.html', pdf: '/harmony_infographic_6_251.pdf' },
        ],
      },
      {
        id: 'h-mod7', label: 'Module 7 — Diminished & Tritone Sub',
        items: [
          { title: 'Sheet 7A: Passing Diminished Chords', type: 'sheet', html: '/harmony_sheet_7a.html', pdf: '/harmony_sheet_7a.pdf' },
          { title: 'Sheet 7B: Tritone Substitution', type: 'companion', html: '/harmony_sheet_7b.html', pdf: '/harmony_sheet_7b.pdf' },
          { title: 'Infographic: Tritone Symmetry', type: 'infographic', html: '/harmony_infographic_7_tritone.html', pdf: '/harmony_infographic_7_tritone.pdf' },
        ],
      },
      {
        id: 'h-mod8', label: 'Module 8 — Modal Interchange',
        items: [
          { title: 'Sheet 8A: Parallel Minor Modal Interchange', type: 'sheet', html: '/harmony_sheet_8a.html', pdf: '/harmony_sheet_8a.pdf' },
          { title: 'Sheet 8B: Exotic Mode Borrowing', type: 'companion', html: '/harmony_sheet_8b.html', pdf: '/harmony_sheet_8b.pdf' },
          { title: 'Infographic: The Darkness Hierarchy', type: 'infographic', html: '/harmony_infographic_8_darkness.html', pdf: '/harmony_infographic_8_darkness.pdf' },
        ],
      },
      {
        id: 'h-standalone', label: 'Standalone Infographics',
        items: [
          { title: 'The Harmonic Acquisition Model', type: 'infographic', html: '/harmony_infographic_ham.html', pdf: '/harmony_infographic_ham.pdf' },
          { title: 'Only 3 Unique Dim7 Chords', type: 'infographic', html: '/harmony_infographic_dim7_symmetry.html', pdf: '/harmony_infographic_dim7_symmetry.pdf' },
          { title: 'The Backdoor ii-V vs Standard ii-V', type: 'infographic', html: '/harmony_infographic_backdoor.html', pdf: '/harmony_infographic_backdoor.pdf' },
          { title: 'The Harmony OS Color System in Action', type: 'infographic', html: '/harmony_infographic_colors.html', pdf: '/harmony_infographic_colors.pdf' },
          { title: 'Dominant Suspensions (F/G = G9sus4)', type: 'infographic', html: '/harmony_infographic_sus.html', pdf: '/harmony_infographic_sus.pdf' },
        ],
      },
    ],
  },
  {
    id: 'voicings',
    label: 'Voicings OS',
    description: 'How to express chords beautifully — tensions, left hand straddles, position theory, guide tones, grace notes, and modal interchange voicings.',
    color: '#d9f5e4',
    textColor: '#1e6b42',
    modules: [
      {
        id: 'v-moda', label: 'Module VA — The Foundation',
        items: [
          { title: 'Sheet VA1: What is a Voicing + Tensions', type: 'sheet', html: '/voicing_sheet_va1.html', pdf: '/voicing_sheet_va1.pdf' },
          { title: 'Sheet VA2: Left Hand Straddles', type: 'companion', html: '/voicing_sheet_va2.html', pdf: '/voicing_sheet_va2.pdf' },
          { title: 'Infographic: Tensions at a Glance', type: 'infographic', html: '/voicing_infographic_va.html', pdf: '/voicing_infographic_va.pdf' },
        ],
      },
      {
        id: 'v-modb', label: 'Module VB — The Diatonic Tension System',
        items: [
          { title: 'Sheet VB1: The Whole-Step Rule', type: 'sheet', html: '/voicing_sheet_vb1.html', pdf: '/voicing_sheet_vb1.pdf' },
          { title: 'Sheet VB2: Diatonic Tension Chart — C Major', type: 'companion', html: '/voicing_sheet_vb2.html', pdf: '/voicing_sheet_vb2.pdf' },
          { title: 'Infographic: Diatonic Tensions Visual Map', type: 'infographic', html: '/voicing_infographic_vb.html', pdf: '/voicing_infographic_vb.pdf' },
        ],
      },
      {
        id: 'v-modc', label: 'Module VC — Position Theory & Voice Leading',
        items: [
          { title: 'Sheet VC1: Position Theory', type: 'sheet', html: '/voicing_sheet_vc1.html', pdf: '/voicing_sheet_vc1.pdf' },
          { title: 'Sheet VC2: Guide Tone System', type: 'companion', html: '/voicing_sheet_vc2.html', pdf: '/voicing_sheet_vc2.pdf' },
          { title: 'Infographic: Position Theory Through Cycle 5', type: 'infographic', html: '/voicing_infographic_vc.html', pdf: '/voicing_infographic_vc.pdf' },
        ],
      },
      {
        id: 'v-modd', label: 'Module VD — Expression',
        items: [
          { title: 'Sheet VD1: Grace Notes', type: 'sheet', html: '/voicing_sheet_vd1.html', pdf: '/voicing_sheet_vd1.pdf' },
          { title: 'Sheet VD2: +1 Voicings Decision Tree', type: 'companion', html: '/voicing_sheet_vd2.html', pdf: '/voicing_sheet_vd2.pdf' },
          { title: 'Infographic: The Texture Spectrum', type: 'infographic', html: '/voicing_infographic_vd.html', pdf: '/voicing_infographic_vd.pdf' },
        ],
      },
      {
        id: 'v-mode', label: 'Module VE — Modal Interchange Tensions',
        items: [
          { title: 'Sheet VE1: Modal Interchange Tension System', type: 'sheet', html: '/voicing_sheet_ve1.html', pdf: '/voicing_sheet_ve1.pdf' },
        ],
      },
    ],
  },
]

export default function MaterialsPage() {
  const [activeSystem, setActiveSystem] = useState('amf')
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({})

  const system = SYSTEMS.find(s => s.id === activeSystem)!

  function toggleModule(id: string) {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function isOpen(id: string) {
    return openModules[id] !== false // default open
  }

  return (
    <div>
      {/* Hero */}
      <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7a9bd4' }}>
            Reference Library
          </p>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-3 uppercase">
            Materials
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
            Cheat sheets, companion guides, infographics, and practice materials for the Melodic Framework, Harmony OS, and Voicings OS. Every file is available to view online or download as a PDF.
          </p>
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#5aacdf 0%,#7dc48a 25%,#F29B38 55%,#8A6BC8 80%,#c9a630 100%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* System tabs */}
        <div className="flex gap-0 mb-8 rounded-xl overflow-hidden border border-slate-200" style={{ maxWidth: 640 }}>
          {SYSTEMS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSystem(s.id)}
              className="flex-1 py-3 px-4 text-sm font-bold transition-all"
              style={{
                background: activeSystem === s.id ? s.color : '#f8f9fc',
                color: activeSystem === s.id ? s.textColor : '#888',
                borderRight: '1px solid #e2e8f0',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* System description + bundle download */}
        <div className="flex items-start justify-between gap-6 mb-8 p-5 rounded-xl" style={{ background: system.color }}>
          <p className="text-sm leading-relaxed flex-1" style={{ color: system.textColor }}>
            {system.description}
          </p>
          {system.bundlePdf && (
            <a
              href={system.bundlePdf}
              download
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: system.textColor }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download All
            </a>
          )}
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-3">
          {system.modules.map(mod => (
            <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden">

              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors hover:bg-slate-50"
                style={{ background: isOpen(mod.id) ? '#f8f9fc' : '#fff' }}
              >
                <span className="font-bold text-sm" style={{ color: '#0f172a' }}>{mod.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{mod.items.length} item{mod.items.length !== 1 ? 's' : ''}</span>
                  <svg
                    className="w-4 h-4 text-slate-400 transition-transform"
                    style={{ transform: isOpen(mod.id) ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Items */}
              {isOpen(mod.id) && (
                <div className="divide-y divide-slate-100">
                  {mod.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-3 bg-white">
                      {/* Type badge */}
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: TYPE_BG[item.type], color: TYPE_COLORS[item.type] }}
                      >
                        {TYPE_LABELS[item.type]}
                      </span>

                      {/* Title */}
                      <span className="flex-1 text-sm text-slate-700">{item.title}</span>

                      {/* Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {item.html && (
                          <a
                            href={item.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold px-3 py-1.5 rounded border transition-colors hover:bg-slate-50"
                            style={{ borderColor: '#e2e8f0', color: '#475569' }}
                          >
                            View
                          </a>
                        )}
                        {item.pdf && (
                          <a
                            href={item.pdf}
                            download
                            className="text-xs font-bold px-3 py-1.5 rounded text-white transition-opacity hover:opacity-90"
                            style={{ background: system.textColor }}
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Practice plan link for AMF */}
        {activeSystem === 'amf' && (
          <div className="mt-8 p-5 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-sm text-slate-800 mb-1">90-Day Practice Plan</p>
              <p className="text-xs text-slate-500">A structured daily practice guide to make the AMF instinctual.</p>
            </div>
            <Link
              href="/practice"
              className="shrink-0 text-sm font-bold px-4 py-2 rounded-lg text-white"
              style={{ background: '#1a5a8a' }}
            >
              View Plan →
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
