import Link from 'next/link'

export const metadata = {
  title: 'AMF — 90-Day Practice Plan',
  description: 'A 10–20 minute daily practice plan to make the Emotional Map of Melody instinctual — 3 phases, 90 days, ears-first.',
}

export default function PracticePage() {
  return (
    <div>
      {/* Hero */}
      <div className="py-14 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#7a9bd4' }}>
            Aesthetic Melody Framework · Practice Curriculum
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 uppercase">
            90-Day Practice Plan
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
            10–20 minutes a day to make the Emotional Map of Melody an instinctual part of your playing and composing. Three phases, ears-first drills, one anchor song.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/amf_practice_plan.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-colors"
              style={{ backgroundColor: '#d97706', color: '#fff' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            <a
              href="/practice_plan.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Full Page
            </a>
          </div>
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#5aacdf 0%,#7dc48a 25%,#F29B38 55%,#8A6BC8 80%,#c9a630 100%)' }} />

      {/* Phase overview */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Daily structure */}
        <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: '#0f172a' }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#7a9bd4' }}>
            The Daily Structure — Every Session
          </p>
          <div className="flex flex-col gap-4">
            {[
              { min: '2 min', name: 'The Ladder Warmup', desc: 'Sing DO–SO–MI–LA–RE–TI–FA over a drone. Forward once, backward once. Opens every session for all 90 days.' },
              { min: '12–15 min', name: "Today's Drill", desc: 'The weekly focus exercise — rotates each week across 12 weeks of content.' },
              { min: '3 min', name: 'Song Moment', desc: 'Apply today\'s concept to Sweet Home Chicago or a song you\'re writing. This is what converts knowledge into reflex.' },
            ].map((step) => (
              <div key={step.name} className="flex gap-4 items-start">
                <span
                  className="text-xs font-bold px-3 py-1 rounded shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', minWidth: 64, textAlign: 'center' }}
                >
                  {step.min}
                </span>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">{step.name}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three phases */}
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#94a3b8' }}>
          The Three Phases
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              phase: 'Phase 1', days: 'Days 1–30', name: 'Inner Ear',
              color: '#d6eafc', nameColor: '#1a5a8a', tagColor: '#3a7ab8',
              goal: 'Sing the stability ladder without thinking. Label any note\'s zone over a static chord in under 3 seconds.',
            },
            {
              phase: 'Phase 2', days: 'Days 31–60', name: 'Chord Context',
              color: '#fef3d0', nameColor: '#7a5200', tagColor: '#a07020',
              goal: 'Hear chord tones vs. non-chord tones. Track zone shifts as chords move. Context becomes automatic.',
            },
            {
              phase: 'Phase 3', days: 'Days 61–90', name: 'Composition',
              color: '#d9f5e4', nameColor: '#1e6b42', tagColor: '#2e8050',
              goal: 'Plan tension arcs. Balance zone ratios. Revise melodies. Compose a full song using the complete framework.',
            },
          ].map((p) => (
            <div key={p.phase} className="rounded-xl p-5" style={{ backgroundColor: p.color }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: p.tagColor }}>{p.phase} · {p.days}</p>
              <h3 className="text-xl font-black uppercase mb-2" style={{ color: p.nameColor }}>{p.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#333' }}>{p.goal}</p>
            </div>
          ))}
        </div>

        {/* Week-by-week summary */}
        <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#94a3b8' }}>
          Week-by-Week Summary
        </h2>
        <div className="flex flex-col gap-2 mb-10">
          {[
            { wk: 'Week 1', phase: 1, title: 'The Stability Ladder', desc: 'Memorize and sing DO–SO–MI–LA–RE–TI–FA as a physical, singable sequence.' },
            { wk: 'Week 2', phase: 1, title: 'Zone Fluency', desc: 'Label, substitute, and target zones in real melodies. Draw the zone map from memory.' },
            { wk: 'Week 3', phase: 1, title: 'Scale Degree Keywords', desc: 'One note per day — build the emotional vocabulary for all 7 scale degrees.' },
            { wk: 'Week 4', phase: 1, title: 'Phase 1 Integration', desc: 'Combine stability + zones + keywords. Full Sweet Home Chicago verse map.' },
            { wk: 'Week 5', phase: 2, title: 'Chord Tone Ear Training', desc: 'Instantly identify whether a note belongs to the current chord.' },
            { wk: 'Week 6', phase: 2, title: 'Context Shifting', desc: 'The same note over different chords = different zones. Track the shift in real time.' },
            { wk: 'Week 7', phase: 2, title: 'Non-Chord Tone Types', desc: 'Passing, Neighbor, Anticipation, Suspension — identify and use each intentionally.' },
            { wk: 'Week 8', phase: 2, title: 'Chord Change Behaviors', desc: 'Stay Sweet, Turn Tense, Float Free, Sink Deeper — compose for each behavior.' },
            { wk: 'Week 9', phase: 3, title: 'Sweet vs Bitter Balance', desc: 'Score your phrases. Compose to hit specific zone ratios for each song section.' },
            { wk: 'Week 10', phase: 3, title: 'Tension Arc Planning', desc: 'Map the emotional arc before writing a single note. Build the bridge on purpose.' },
            { wk: 'Week 11', phase: 3, title: 'The Revision Checklist', desc: 'Run the 8-step audit on your melodies and published songs. Fix red flags.' },
            { wk: 'Week 12', phase: 3, title: 'Full Song + Final Assessment', desc: 'Compose the 90-Day Song. Pass the Instinct Test. The framework becomes the ear.' },
          ].map((w) => (
            <div
              key={w.wk}
              className="flex gap-4 items-start p-4 rounded-lg border"
              style={{ borderColor: '#f0f0f0', backgroundColor: '#fafafa' }}
            >
              <div className="shrink-0">
                <span
                  className="inline-block text-xs font-bold px-2 py-1 rounded"
                  style={{
                    backgroundColor: w.phase === 1 ? '#d6eafc' : w.phase === 2 ? '#fef3d0' : '#d9f5e4',
                    color: w.phase === 1 ? '#1a5a8a' : w.phase === 2 ? '#7a5200' : '#1e6b42',
                  }}
                >
                  {w.wk}
                </span>
              </div>
              <div>
                <div className="font-bold text-sm text-slate-800 mb-0.5">{w.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#0f172a' }}>
          <h3 className="text-white font-black text-lg uppercase tracking-wide mb-2">Ready to start?</h3>
          <p className="text-slate-400 text-sm mb-5">Download the full PDF with all 4 pages, day-by-day drills, and milestone checkpoints.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/amf_practice_plan.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#d97706', color: '#fff' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF — Free
            </a>
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }}
            >
              Explore Full Curriculum
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
