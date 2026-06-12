'use client'

import { useState } from 'react'

const BC = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
)

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-slate-800 mb-3 mt-12 border-b border-slate-200 pb-2 scroll-mt-24">{children}</h2>
)

const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-bold text-slate-700 mb-2 mt-8 scroll-mt-24">{children}</h3>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-700 leading-relaxed mb-4">{children}</p>
)

function Asset({ file, title, height = 480 }: { file: string; title: string; height?: number }) {
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100" style={{ background: '#f8fafc' }}>
        <span className="text-xs font-bold text-slate-600">{title}</span>
        <a href={`/assets/sprint1/${file}`} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Open full ↗</a>
      </div>
      <iframe src={`/assets/sprint1/${file}`} className="w-full border-none" style={{ height }} title={title} />
    </div>
  )
}

function SourceReadings({ items }: { items: Array<{ source: string; location: string; topic: string }> }) {
  return (
    <div className="my-8 p-5 rounded-xl border border-amber-200 bg-amber-50">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">📖 Source Readings</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm flex flex-wrap gap-2 items-baseline">
            <span className="font-bold text-slate-800">{item.source}</span>
            <span className="font-mono text-xs text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">{item.location}</span>
            <span className="text-slate-600">{item.topic}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const TOC = [
  { id: 'intro', label: 'Introduction' },
  { id: 'source-readings', label: 'Source Readings' },
  { id: 'reading-schedule', label: 'Daily Reading Schedule' },
  { id: 'part1', label: 'Part 1 — Musical OS' },
  { id: 'dichord', label: '· What a Di-Chord Is' },
  { id: 'sound-factors', label: '· The Three Sound Factors' },
  { id: 'sprint1-focus', label: '· [3] and [4] Focus' },
  { id: 'pictograph', label: '· The Pictograph System' },
  { id: 'tracking-page', label: '· The Tracking Page' },
  { id: 'part2', label: 'Part 2 — Melody: Zone 1' },
  { id: 'zone-system', label: '· Zone System' },
  { id: 'zone1-detail', label: '· Zone 1 in Detail' },
  { id: 'gesture', label: '· Melodic Gesture' },
  { id: 'pitch-first', label: '· Pitch Before Rhythm' },
  { id: 'part3', label: 'Part 3 — Harmony' },
  { id: 'harmonic-function', label: '· Harmonic Function' },
  { id: 'minor-keys', label: '· Minor Keys & ANS' },
  { id: 'root-movement', label: '· Root Movement' },
  { id: 'fourteen-movements', label: '· 14-Movement Preview' },
  { id: 'part4', label: 'Part 4 — Voicings' },
  { id: 'two-instruments', label: '· Two Instruments' },
  { id: 'guitar', label: '· Guitar Shapes' },
  { id: 'piano', label: '· Piano Five-Finger' },
  { id: 'parallel', label: '· Parallel Practice' },
  { id: 'part5', label: 'Part 5 — Rhythm' },
  { id: 'grid', label: '· The Binary Grid' },
  { id: 'longy', label: '· Longy' },
  { id: 'ans-rhythm', label: '· ANS Rhythm' },
  { id: 'part6', label: 'Part 6 — Anchor Song' },
  { id: 'closing', label: 'Closing' },
  { id: 'appendix', label: 'Appendix' },
]

export default function TextbookPage() {
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <div>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          iframe { page-break-inside: avoid; }
          h2, h3 { page-break-after: avoid; }
        }
      `}</style>

      {/* Hero */}
      <div className="py-12 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#7a9bd4' }}>
            Sprint 1 · Mini-Textbook
          </p>
          <h1 className="text-white text-4xl font-extrabold tracking-tight mb-3 uppercase">
            The Sprint 1 Mini-Textbook
          </h1>
          <p className="text-slate-300 text-base leading-relaxed max-w-2xl mb-5">
            The Plogger Method · Zone 1 · Rhythm Code · Harmonic Movement — the WHY behind Sprint 1.
          </p>
          <div className="flex flex-wrap gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg text-sm font-bold text-white border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Print ↓
            </button>
            <a href="/materials/sprint1/practice" className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 border border-slate-600 hover:border-slate-400 transition-colors">
              Practice Plan →
            </a>
            <a href="/materials/sprint1/cheatsheets" className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 border border-slate-600 hover:border-slate-400 transition-colors">
              Cheatsheets →
            </a>
          </div>
        </div>
      </div>

      {/* Rainbow rule */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg,#922B21 0%,#5B2C6F 35%,#1E8449 65%,#1a5a8a 100%)' }} />

      {/* Mobile TOC toggle */}
      <div className="lg:hidden border-b border-slate-200 no-print">
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-slate-700"
        >
          <span>Table of Contents</span>
          <span>{tocOpen ? '▲' : '▼'}</span>
        </button>
        {tocOpen && (
          <nav className="px-4 pb-4 grid grid-cols-2 gap-1">
            {TOC.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setTocOpen(false)}
                className="text-xs text-slate-600 hover:text-slate-900 py-1 truncate"
              >{item.label}</a>
            ))}
          </nav>
        )}
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">

          {/* Sticky TOC — desktop */}
          <nav className="hidden lg:block sticky top-6 self-start no-print" style={{ maxHeight: 'calc(100vh - 3rem)', overflowY: 'auto' }}>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Contents</p>
            <ul className="space-y-0.5">
              {TOC.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`}
                    className="block text-xs text-slate-500 hover:text-slate-900 py-0.5 transition-colors leading-snug"
                  >{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <article>

            {/* Intro */}
            <section id="intro">
              <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
                <strong className="text-slate-800">Sprint 1 — Orientation: Di-Chord Ears Open</strong>
                {' '}· Anchor Song: Ain't No Sunshine (Bill Withers) · Document type: Conceptual reference — the WHY. The companion practice plan is separate.
              </div>

              <H2 id="intro">Introduction: What This Sprint Is About</H2>
              <P>Sprint 1 has no harmonic gate. That is its defining feature, and understanding why that is the case is the first thing you need to understand about this entire system.</P>
              <P>Every other sprint in the AMF asks you to own something specific — a di-chord root movement, heard and playable by ear in three or more keys, at musical tempo, on both instruments, without hesitation. That is the gate. Sprint 1 does not set that gate because you are not ready to use it yet. Not because the material is beneath you — you know what a chord is, you know what an interval is — but because you do not yet have the perceptual language to build the habit in the right direction. Sprint 1&apos;s job is to establish that language.</P>
              <P>What &quot;no harmonic gate&quot; means in practice is this: Sprint 1 ends when your ears have opened to the di-chord system at its most fundamental level. Specifically, when you can reliably distinguish <BC>[3]</BC> from <BC>[4]</BC> — the minor third from the major third — by sound alone, without an instrument, without notation, just by listening. That is the Sprint 1 gate, and it is a real gate. It sounds simple. It is not trivial. Reaching Stage 3 on this distinction — always correct at tempo without conscious attention — is a genuine achievement for an adult brain that has spent decades hearing music without this vocabulary.</P>
              <P>The system you are entering is called the Plogger Method, and it forms the Musical OS of the AMF — the perceptual infrastructure that everything else builds on. The Plogger Method is not music theory in the conventional sense. It is not a system for reading notation, or for knowing chord names, or for analyzing harmonic progressions. It is a system for training your conscious mind to hear what your ears are already perceiving. That distinction matters enormously. Plogger wrote: &quot;The ear needs no training. It is the mind that requires training to become aware of what the ear is hearing at the speed that the ear is hearing it.&quot; Sprint 1 is the beginning of that training.</P>
              <P>The anchor song for this sprint is &quot;Ain&apos;t No Sunshine&quot; by Bill Withers, recorded in 1971. It was chosen for three reasons that line up precisely with what Sprint 1 needs to establish. First, it is in A minor — which means you will be living inside a minor sound world for the entire sprint, and that minor quality is exactly what <BC>[3]</BC> versus <BC>[4]</BC> is all about. Second, it is a three-chord song with a simple, clear harmonic structure that will let you focus your attention on sound quality rather than navigating complexity. Third, it grooves in a way that makes you want to play it again. This matters more than it sounds — you will play this song dozens of times before the sprint is done, and it needs to be worth that.</P>
              <P>By the end of Sprint 1, you will be able to do five things that you cannot fully do right now. You will be able to hear a major third and a minor third and know immediately which is which. You will be able to locate Zone 1 — the chord tones — of any chord on both instruments. You will understand the difference between a chord&apos;s name and a chord&apos;s function. You will have a working feel for the 8-position rhythmic grid and what it means for a song to groove. And you will be able to play &quot;Ain&apos;t No Sunshine&quot; in a simplified but musical form on both guitar and piano. Not perfectly. Musically.</P>
            </section>

            {/* Source Readings */}
            <section id="source-readings">
              <H2 id="source-readings">Source Readings for Sprint 1</H2>
              <P>Before or alongside working through this textbook, read the following sections in the original source materials. The AMF content assumes familiarity with these chapters — they are the foundation this sprint is built on. Page numbers refer to the physical book.</P>

              <div className="space-y-4 my-6">

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white" style={{background:'#0f172a'}}>
                    Plogger Method — <span className="font-normal opacity-80">Primary source for the Musical OS</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-40">Chapter / Pages</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">What to read</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-32">Relevant to</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Ch.3 — p.31', 'Keyboard Visualization — how to build and use the mental keyboard', 'Part 1'],
                        ['Ch.4 — p.51', 'Longy Rhythms — ta and ta-te, the foundational syllabic rhythm system', 'Part 5'],
                        ['Ch.5 — p.61', 'The Lap Map — physical groove embodiment paired with Longy', 'Part 5'],
                        ['Ch.9 — p.101', 'Di-Chord Numbers — the cardinal semitone system and bracket notation', 'Part 1'],
                        ['Ch.10 — p.110', 'The Sonic Properties of Di-Chords — overview of all three factors', 'Part 1'],
                        ['Ch.11 — p.112', 'Interference Pulsation — 8Hz/4Hz/2Hz categories, wave shapes', 'Part 1'],
                        ['Ch.12–14 — p.121–135', 'F/O Factor, Harmonicity, and complete di-chord review table', 'Part 1'],
                        ['Ch.15 — p.140', 'Di-Chords in Melodic Contexts — gestural quality and expressiveness', 'Part 2'],
                        ['Ch.16 — p.151 (incl. p.153)', 'The Tracking Page — all 6 protocols; use p.153 directly in practice', 'Part 1'],
                        ['Ch.20 — p.226', 'Heptachord Formation — conjunct (five-finger) position setup', 'Part 4'],
                        ['Ch.21 — p.237', 'Triads and Their Inversions — chord structure as di-chord stacks', 'Part 3'],
                      ].map(([loc, desc, rel]) => (
                        <tr key={loc} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-mono text-xs text-amber-800 whitespace-nowrap">{loc}</td>
                          <td className="px-4 py-2 text-slate-700">{desc}</td>
                          <td className="px-4 py-2 text-xs text-slate-400">{rel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white" style={{background:'#1E8449'}}>
                    The Rhythm Code — <span className="font-normal opacity-80">Tamas Bodzsar</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-40">Section</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">What to read</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-32">Relevant to</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Introduction', 'Rhythm as starting points (not durations) — the foundational premise', 'Part 5'],
                        ['Binary Grid chapter', '8-position grid structure, stops, anticipations, on/off notation', 'Part 5'],
                      ].map(([loc, desc, rel]) => (
                        <tr key={loc} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-mono text-xs text-amber-800 whitespace-nowrap">{loc}</td>
                          <td className="px-4 py-2 text-slate-700">{desc}</td>
                          <td className="px-4 py-2 text-xs text-slate-400">{rel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white" style={{background:'#5B2C6F'}}>
                    Emotional Map of Melody — <span className="font-normal opacity-80">Zone system source</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-40">Module</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">What to read</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-32">Relevant to</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Module 1', 'Zone system introduction — four zones, stability ladder, chord-tone vs. non-chord-tone', 'Part 2'],
                      ].map(([loc, desc, rel]) => (
                        <tr key={loc} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-mono text-xs text-amber-800 whitespace-nowrap">{loc}</td>
                          <td className="px-4 py-2 text-slate-700">{desc}</td>
                          <td className="px-4 py-2 text-xs text-slate-400">{rel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white" style={{background:'#1a5a8a'}}>
                    Guitar Theory Course — <span className="font-normal opacity-80">Instrument-specific reference</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-40">Section</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">What to read</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-32">Relevant to</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Open Chords', 'Am, G, Em, Dm fingerings — string-by-string note content, common errors', 'Part 4'],
                      ].map(([loc, desc, rel]) => (
                        <tr key={loc} className="hover:bg-slate-50">
                          <td className="px-4 py-2 font-mono text-xs text-amber-800 whitespace-nowrap">{loc}</td>
                          <td className="px-4 py-2 text-slate-700">{desc}</td>
                          <td className="px-4 py-2 text-xs text-slate-400">{rel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </section>

            {/* Daily Reading Schedule */}
            <section id="reading-schedule">
              <H2 id="reading-schedule">Daily Reading Schedule</H2>
              <P>This textbook is a companion to practice, not a prerequisite. Do not read it cover to cover before starting — the concepts only land after your ear has encountered the sounds they describe. The schedule below tells you exactly what to read before each day&apos;s practice session. Budget 10–20 minutes of reading before your 60-minute session.</P>

              <div className="space-y-6 my-6">

                {/* Week 1 */}
                <div className="rounded-xl border border-blue-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white bg-blue-600">Week 1 — Foundations</div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-blue-50 border-b border-blue-100">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-20">Day</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Textbook Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Source Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-48">Why today</th>
                    </tr></thead>
                    <tbody className="divide-y divide-blue-50">
                      {[
                        ['1', 'Introduction + Source Readings list', 'Plogger Ch.9 (p.101) — Di-Chord Numbers', 'Understand the sprint goal and the bracket system before your first session'],
                        ['2', 'Part 1: What a Di-Chord Is', 'Plogger Ch.3 (p.31) — Keyboard Visualization', 'You heard [3] and [4] yesterday — now understand the system they belong to'],
                        ['3', 'Part 1: The Three Sound Factors', 'Plogger Ch.11 (p.112) — Interference Pulsation', 'You can now attach the pulsation/shadow/color concepts to sounds you\'ve heard'],
                        ['4', 'Part 1: [3] and [4] Focus + Hear→Sing→Name', 'Plogger Ch.12–14 (p.121) — F/O Factor + Harmonicity', 'Deepen the [3] vs. [4] distinction with all three factors now understood'],
                        ['5', 'Part 1: The Pictograph System', '(continue Ch.12–14 if needed)', 'You have 4 days of ear contact — the visual encoding system now has something to encode'],
                        ['6', 'Part 2: Zone System + Zone 1 in Detail', 'Emotional Map Module 1 — Zone introduction', 'S2 instrument work is underway — understand what Zone 1 means for melody'],
                        ['7', 'Part 4: Guitar + Piano shapes', 'Guitar Theory: Open Chords section', 'A week of playing shapes — now understand the di-chord content inside each voicing'],
                      ].map(([day, text, source, why]) => (
                        <tr key={day} className="hover:bg-blue-50/50">
                          <td className="px-4 py-2.5 font-bold text-blue-700">{day}</td>
                          <td className="px-4 py-2.5 text-slate-800">{text}</td>
                          <td className="px-4 py-2.5 text-slate-600 text-xs">{source}</td>
                          <td className="px-4 py-2.5 text-xs text-slate-400 italic">{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Week 2 */}
                <div className="rounded-xl border border-green-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white bg-green-600">Week 2 — Harmony, Rhythm, and the Anchor Song</div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-green-50 border-b border-green-100">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-20">Day</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Textbook Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Source Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-48">Why today</th>
                    </tr></thead>
                    <tbody className="divide-y divide-green-50">
                      {[
                        ['8', 'Part 5: How the Rhythm Code Grid Works', 'Rhythm Code: Introduction + Binary Grid', 'Rhythm work deepens in Week 2 — understand the grid concept now'],
                        ['9', 'Part 5: Longy + Rhythm of Ain\'t No Sunshine', 'Plogger Ch.4 (p.51) — Longy Rhythms', 'Connect the syllable system to the grid before today\'s S2 work'],
                        ['10', 'Part 3: What Harmonic Function Means', 'Plogger Ch.21 (p.237) — Triads and Inversions', 'Enough ear experience to appreciate why function differs from content'],
                        ['11', 'Part 3: Minor Keys + Root Movement', '(continue Ch.21 if needed)', 'You\'re playing Am-G-Em transitions daily — now understand the di-chord root movements'],
                        ['12', 'Part 6: The Anchor Song — full section', 'Plogger Ch.5 (p.61) — The Lap Map', 'Structured song work begins today in S3 — read the full analysis'],
                        ['13', 'Part 3: 14-Movement Vocabulary preview', 'Plogger Ch.16 (p.151) — The Tracking Page', 'See the big picture of where the harmonic system goes after Sprint 1'],
                        ['14', 'Re-read: Part 1 [3] and [4] Focus', 'Plogger p.153 — the Tracking Page itself', 'End of Week 2 — re-read the gate skill section with fresh ears'],
                      ].map(([day, text, source, why]) => (
                        <tr key={day} className="hover:bg-green-50/50">
                          <td className="px-4 py-2.5 font-bold text-green-700">{day}</td>
                          <td className="px-4 py-2.5 text-slate-800">{text}</td>
                          <td className="px-4 py-2.5 text-slate-600 text-xs">{source}</td>
                          <td className="px-4 py-2.5 text-xs text-slate-400 italic">{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Week 3 */}
                <div className="rounded-xl border border-amber-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white bg-amber-600">Week 3 — Deepening and Re-Reading</div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-amber-50 border-b border-amber-100">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-20">Day</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Textbook Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Source Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-48">Why today</th>
                    </tr></thead>
                    <tbody className="divide-y divide-amber-50">
                      {[
                        ['15', 'Re-read: Part 1 Sound Factors — listen for new details', 'Plogger Ch.15 (p.140) — Di-Chords in Melodic Contexts', 'Two weeks in — passages that felt abstract now describe sounds you recognize'],
                        ['16', 'Re-read: Part 2 Zone 1 — focus on gesture recognition', 'Plogger Ch.20 (p.226) — Heptachord Formation', 'Gesture recognition is starting to click — the re-read lands differently now'],
                        ['17', 'Re-read: Part 4 Voicings — notice di-chord relationships in shapes', 'Catch up on any source chapter you skipped', 'You can now hear [3] inside Am on guitar — re-reading confirms what your ear discovered'],
                        ['18', 'Re-read: Part 5 Rhythm + Part 6 Anchor Song', 'Catch up on any source chapter you skipped', 'Song work and rhythm are deepening — the re-read connects concepts you now own'],
                        ['19', 'Part 1: The Tracking Page (if not yet read)', 'Plogger Ch.8 (p.84) — Interval Spelling on Staff', 'Tracking Page protocols 1 and 2 should be in your sessions by now'],
                        ['20', 'Re-read: Part 3 Root Movement', 'Re-read Rhythm Code Binary Grid', 'Root movement recognition is developing — this re-read will feel like a different text'],
                        ['21', 'Free choice — revisit the section that felt least clear', 'Free choice source chapter', 'Trust your instinct on what needs reinforcement before the gate approach'],
                      ].map(([day, text, source, why]) => (
                        <tr key={day} className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-amber-700">{day}</td>
                          <td className="px-4 py-2.5 text-slate-800">{text}</td>
                          <td className="px-4 py-2.5 text-slate-600 text-xs">{source}</td>
                          <td className="px-4 py-2.5 text-xs text-slate-400 italic">{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Week 4 */}
                <div className="rounded-xl border border-purple-200 overflow-hidden">
                  <div className="px-4 py-3 font-bold text-sm text-white bg-purple-600">Week 4 — Gate Approach and Closing</div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-purple-50 border-b border-purple-100">
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-20">Day</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Textbook Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600">Source Reading</th>
                      <th className="text-left px-4 py-2 font-semibold text-slate-600 w-48">Why today</th>
                    </tr></thead>
                    <tbody className="divide-y divide-purple-50">
                      {[
                        ['22', 'Re-read: Part 1 [3] and [4] Focus — this is the gate standard', 'Re-read Plogger Ch.14 (p.135) — complete di-chord review', 'Gate week — know exactly what Stage 3 on [3]/[4] means'],
                        ['23', 'Re-read: Part 6 Anchor Song — what should you be able to do?', 'Re-read Plogger Ch.9 (p.101)', 'Check yourself against the end-of-sprint abilities listed in the textbook'],
                        ['24', 'Re-read: Part 2 Zone 1 — can you locate without hunting?', 'Free choice', 'Zone 1 fluency is part of the gate — honest self-check against the text'],
                        ['25', 'Free choice — weakest area', 'Free choice', 'You know what needs work — use reading time to reinforce it'],
                        ['26', 'Closing: What Owning Sprint 1 Feels Like', 'Re-read Plogger Ch.16 (p.151)', 'Read the closing before your final gate sessions — set the target clearly'],
                        ['27', 'Light review only — no new reading', 'Light review only', 'Focus on practice, not reading — the concepts should be in your body by now'],
                        ['28', 'Sprint 1 exit self-assessment (no reading — reflect)', '—', 'Gate day — everything you\'ve read should be audible, not intellectual'],
                      ].map(([day, text, source, why]) => (
                        <tr key={day} className="hover:bg-purple-50/50">
                          <td className="px-4 py-2.5 font-bold text-purple-700">{day}</td>
                          <td className="px-4 py-2.5 text-slate-800">{text}</td>
                          <td className="px-4 py-2.5 text-slate-600 text-xs">{source}</td>
                          <td className="px-4 py-2.5 text-xs text-slate-400 italic">{why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600 mt-6">
                <strong className="text-slate-800">Reading SOP:</strong> Read the assigned section <em>before</em> your practice session. Budget 10–20 minutes. Week 3+ re-reads will feel faster and land deeper — that is the point. The textbook describes sounds; practicing creates the sounds; re-reading after practicing connects the two. If a section still feels abstract, that is a signal to spend more practice time on that material, not more reading time.
              </div>
            </section>

            {/* Part 1 */}
            <section id="part1">
              <H2 id="part1">Part 1: The Musical OS — How Plogger Works</H2>

              <H3 id="dichord">What a Di-Chord Is</H3>
              <P>The Plogger Method begins with a decision about what to count. Traditional music theory counts intervals ordinally: a second, a third, a fourth. The ordinal system tells you the rank — the position — of the upper note relative to the lower note within a diatonic scale. So a &quot;third&quot; means the upper note is the third degree of a scale starting from the lower note. The problem with this for perceptual training is that ordinal position does not correspond to how the interval sounds. A &quot;third&quot; on the staff can be two different sounds depending on whether it is three or four semitones wide. The staff hides this. Sheet music gives you ordinal information — position — and asks you to infer everything else.</P>
              <P>The di-chord system starts over. A di-chord number is a cardinal count of semitones, written in square brackets: <BC>[1]</BC>, <BC>[2]</BC>, <BC>[3]</BC>, through <BC>[11]</BC>. There are exactly 11 audible interval classes within the octave — not twelve, because the octave itself (<BC>[12]</BC>) sounds like a return to the same note, not a new di-chord. Each bracket number tells you something acoustically specific. It tells you how many semitones apart the two notes are, which determines their interference pulsation rate, which in turn determines a large part of their perceptual character.</P>
              <P>This shift from ordinal to cardinal — from &quot;position in the scale&quot; to &quot;count of semitones&quot; — is not just a different number system. It is a different question. Traditional interval naming asks: where does this note sit in the scale? The di-chord system asks: what do these two notes do to each other when they sound? That is a physical question, and it has a physical answer. The answer is pulsation.</P>
              <P>The inversion law follows directly from the cardinal system. Any di-chord added to its inversion equals twelve, because one octave equals twelve semitones. <BC>[3]</BC> + <BC>[9]</BC> = 12. <BC>[5]</BC> + <BC>[7]</BC> = 12. <BC>[4]</BC> + <BC>[8]</BC> = 12. This is not a memorization trick — it is the arithmetic of the octave. Knowing it means that once you own <BC>[3]</BC> and <BC>[4]</BC> as sounds, you already have a preliminary relationship to <BC>[9]</BC> and <BC>[8]</BC> by inversion, even before you study them directly.</P>

              <div className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="text-left px-4 py-2 border border-slate-200 font-bold">Di-Chord</th>
                      <th className="text-left px-4 py-2 border border-slate-200 font-bold">Semitones</th>
                      <th className="text-left px-4 py-2 border border-slate-200 font-bold">Traditional Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['[1]','1','minor 2nd'],['[2]','2','major 2nd'],['[3]','3','minor 3rd'],['[4]','4','major 3rd'],['[5]','5','perfect 4th'],['[6]','6','tritone (aug 4th / dim 5th)'],['[7]','7','perfect 5th'],['[8]','8','minor 6th'],['[9]','9','major 6th'],['[10]','10','minor 7th'],['[11]','11','major 7th']].map(([dc, st, name]) => (
                      <tr key={dc} className="hover:bg-slate-50">
                        <td className="px-4 py-2 border border-slate-200 font-mono font-bold">{dc}</td>
                        <td className="px-4 py-2 border border-slate-200">{st}</td>
                        <td className="px-4 py-2 border border-slate-200 text-slate-600">{name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>Eleven sounds. Each one a distinct perceptual character. Not positions on a page — sounds in the world.</P>
              <P>The reason the Plogger Method uses the keyboard as its cognitive tool is precisely because the keyboard makes these eleven distances visible. The piano keyboard shows twelve semitones in one octave, repeated across the full instrument. It is the one instrument where semitone count is directly visible as physical distance. When you can visualize a keyboard clearly and fluently, you can count di-chords in your mind without touching an instrument. That mental keyboard is the working surface on which all Plogger exercises run.</P>

              <H3 id="sound-factors">The Three Sound Factors</H3>
              <P>A di-chord is not one-dimensional. Saying that <BC>[3]</BC> is a minor third tells you the semitone count — that is the first dimension. But it does not tell you how the interval feels, what its acoustic behavior is, or how to distinguish it from other intervals in the same neighborhood. For that you need three sound factors, each of which addresses a different physical property of what two simultaneously sounding notes do.</P>
              <P>The three factors are: Interference Pulsation, the F/O Factor, and Harmonicity. Together they give every di-chord a unique identity — no two di-chords share the same combination of all three. This means that if you hold all three factors simultaneously in your awareness, you can identify any di-chord. If you ignore even one of them, you will sometimes confuse di-chords that share the other two.</P>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">Interference Pulsation</h4>
              <P>When two notes of slightly different frequencies sound together, the pressure waves interfere with each other and create a rhythmic beating. You have heard this when a poorly tuned guitar string beats against a reference pitch — that wobbling, pulsing quality is acoustic interference. In di-chords this beating is inherent to the interval itself, not a sign of bad tuning. Two notes a minor third apart will always beat at a specific rate, regardless of how precisely they are tuned within that interval class.</P>
              <P>Plogger identifies three pulsation categories based on rate:</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-2 list-none">
                <li><strong className="text-[#922B21]">Dissonant (8Hz):</strong> Fast, urgent beating. The wave shape is jagged. Di-chords <BC>[1]</BC>, <BC>[2]</BC>, <BC>[10]</BC>, and <BC>[11]</BC> all fall here — the minor and major seconds and their inversions. At 8Hz you are hearing the interference wave cycle roughly eight times per second, which is fast enough to create an urgent, restless quality. These di-chords demand movement.</li>
                <li><strong className="text-[#5B2C6F]">Modal (4Hz):</strong> Smooth, rounded beating. Sometimes described as &quot;wobbly.&quot; Di-chords <BC>[3]</BC>, <BC>[4]</BC>, <BC>[8]</BC>, and <BC>[9]</BC> — the thirds and sixths. Four cycles per second creates a quality that is neither urgent nor stable — it is emotionally active. These are the di-chords of feeling.</li>
                <li><strong className="text-[#1E8449]">Perfect (2Hz):</strong> Slow, flat, almost imperceptible beating. Di-chords <BC>[5]</BC>, <BC>[6]</BC>, and <BC>[7]</BC> — the perfect fourth, tritone, and perfect fifth. Two cycles per second is so slow that the beating almost disappears into a sense of stillness.</li>
              </ul>
              <P>The pulsation pattern across the eleven di-chords is palindromic: Dissonant–Dissonant–Modal–Modal–Perfect–Perfect–Perfect–Modal–Modal–Dissonant–Dissonant. The system is symmetric around <BC>[6]</BC>. This symmetry reflects the physical symmetry of the overtone series.</P>

              <Asset file="R3_pulsation_diagram.html" title="Pulsation Wave Diagram — Three Families" height={400} />

              <h4 className="font-bold text-slate-800 mt-6 mb-2">F/O Factor (Shadow Quality)</h4>
              <P>The F/O Factor describes the gravitational direction of a di-chord: does the upper note refer downward toward the lower note (the Fundamental), or upward toward the octave of the lower note? Di-chords <BC>[1]</BC> through <BC>[5]</BC> all refer down toward the fundamental. Di-chords <BC>[7]</BC> through <BC>[11]</BC> all refer up toward the octave. <BC>[6]</BC>, exactly in the middle, refers both directions simultaneously.</P>
              <P>In the Pictograph system, this factor appears as shadow direction: a shadow cast to the left means the di-chord refers down; a shadow cast to the right means it refers up; <BC>[6]</BC> has shadows on both sides. The F/O factor is what lets you distinguish between di-chords with similar pulsation rates. <BC>[3]</BC> and <BC>[8]</BC> are both modal (4Hz, rounded wave shape), but <BC>[3]</BC> has a left shadow and <BC>[8]</BC> has a right shadow. They feel different not because of their pulsation but because of their gravitational direction.</P>

              <h4 className="font-bold text-slate-800 mt-6 mb-2">Harmonicity (Color Quality)</h4>
              <P>Harmonicity describes whether the upper note of a di-chord belongs to the overtone series of the lower note. <strong>Harmonic di-chords</strong> (<BC>[2]</BC>, <BC>[4]</BC>, <BC>[7]</BC>, <BC>[9]</BC>, <BC>[10]</BC>) sound open, expanding, alkaline — the notes repel each other slightly, like same-polarity magnets, giving them an airy spreading quality. <strong>Non-harmonic di-chords</strong> (<BC>[1]</BC>, <BC>[3]</BC>, <BC>[5]</BC>, <BC>[8]</BC>, <BC>[11]</BC>) sound closed, contracting, acidic — the notes attract each other, giving a compressed dense quality.</P>
              <P><BC>[6]</BC> is exceptional in all three factors. Its pulsation is perfect (2Hz) but it produces a frozen, ambiguous quality rather than the stable open feeling of <BC>[7]</BC>. Its harmonicity is neutral. <BC>[6]</BC> is the outlier of the system.</P>
              <P><BC>[9]</BC> is a special case called false harmonic. It sounds like a harmonic di-chord — open, warm, upward-reaching — but technically the upper note does not fall within the first nine partials of the lower note&apos;s overtone series. The perception and the physics are misaligned.</P>

              <div className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">Di-Chord</th>
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">Pulsation</th>
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">Rate</th>
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">F/O Factor</th>
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">Harmonicity</th>
                      <th className="px-3 py-2 border border-slate-200 text-left font-bold">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['[1]','dissonant','8Hz','fundamental','non-harmonic','dark'],
                      ['[2]','dissonant','8Hz','fundamental','harmonic','light'],
                      ['[3]','modal','4Hz','fundamental','non-harmonic','dark'],
                      ['[4]','modal','4Hz','fundamental','harmonic','light'],
                      ['[5]','perfect','2Hz','fundamental','non-harmonic','dark'],
                      ['[6]','perfect','2Hz','both','neutral','neutral'],
                      ['[7]','perfect','2Hz','octave','harmonic','light'],
                      ['[8]','modal','4Hz','octave','non-harmonic','dark'],
                      ['[9]','modal','4Hz','octave','false-harmonic','light'],
                      ['[10]','dissonant','8Hz','octave','harmonic','light'],
                      ['[11]','dissonant','8Hz','octave','non-harmonic','dark'],
                    ].map(([dc, puls, rate, fo, harm, color]) => (
                      <tr key={dc} className="hover:bg-slate-50">
                        <td className="px-3 py-2 border border-slate-200 font-mono font-bold">{dc}</td>
                        <td className="px-3 py-2 border border-slate-200">{puls}</td>
                        <td className="px-3 py-2 border border-slate-200">{rate}</td>
                        <td className="px-3 py-2 border border-slate-200">{fo}</td>
                        <td className="px-3 py-2 border border-slate-200">{harm}</td>
                        <td className="px-3 py-2 border border-slate-200">{color}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>This table is not something to memorize as a list. It is a description of sounds you will learn to recognize by ear, one di-chord at a time. Sprint 1 gives you two of them — <BC>[3]</BC> and <BC>[4]</BC>. Every subsequent sprint adds one more.</P>

              <Asset file="R4_sound_factors_reference.html" title="Di-Chord Sound Factors Reference — All 11" height={500} />

              <H3 id="sprint1-focus">Sprint 1 Focus: [3] and [4] — The Quality Di-Chords</H3>
              <P>Sprint 1 begins with <BC>[3]</BC> and <BC>[4]</BC> because these two di-chords encode the most fundamental distinction in Western music: minor versus major. When you hear a chord and feel that it is minor — that specific quality of weight and inwardness — what you are hearing is a minor third sitting inside the chord. When you hear a chord as major — that open, bright, resolved quality — you are hearing a major third. The quality question is a <BC>[3]</BC> versus <BC>[4]</BC> question. Everything else in harmony builds from this.</P>
              <P><BC>[3]</BC> — the minor third — is modal (4Hz, rounded wave), refers down toward the fundamental, and is non-harmonic (dark). The non-harmonic quality means the upper note stands apart from the lower note&apos;s overtone family. The notes attract each other. Combined with the 4Hz modal beating, <BC>[3]</BC> has a quality that is both flowing (modal) and slightly closed (non-harmonic, fundamental-referring). This is the sound of minor — perceptually contracted and inward.</P>
              <P><BC>[4]</BC> — the major third — is also modal (4Hz, rounded wave) and also refers down. It shares <BC>[3]</BC>&apos;s pulsation and shadow direction exactly. The only difference is harmonicity: <BC>[4]</BC> is harmonic (light). The upper note falls within the first nine partials of the lower note&apos;s overtone series. The notes repel slightly — open, expanding. This is the sound of major: the same flowing, emotional quality of <BC>[3]</BC>, but acoustically open rather than closed.</P>

              <Asset file="R1_focus_card_3_4.html" title="[3] and [4] Focus Card — Sprint 1 Gate Skill" height={380} />

              <P>The Hear → Sing → Name workflow is the method. First, you hear the di-chord and simply listen — not to analyze, but to receive the sound. Then you sing it, forcing your body to produce the interval rather than just perceive it. Then you name it. Naming is not difficult at this point because you have already heard and produced the interval — the name is just the label for something you already know. Plogger&apos;s sequence ensures that the ear leads and the label follows — never the reverse.</P>

              <Asset file="O3_hear_sing_name_cycle.html" title="Hear → Sing → Name Practice Cycle" height={360} />

              <H3 id="pictograph">The Pictograph System</H3>
              <P>The Plogger Pictograph is a visual encoding of all three sound factors for each di-chord, drawn as a stylized rendering of the bracket number itself. Each di-chord has a visual glyph that encodes its pulsation, F/O factor, and harmonicity simultaneously, using three visual properties:</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-2 list-disc">
                <li><strong>Shape/outline</strong> encodes pulsation. Dissonant di-chords have jagged, angular outlines. Modal di-chords have smooth, rounded, flowing outlines. Perfect di-chords have straight edges.</li>
                <li><strong>Shadow direction</strong> encodes the F/O factor. Fundamental-referring di-chords have their shadow cast to the left. Octave-referring di-chords have their shadow cast to the right. <BC>[6]</BC> has shadows on both sides.</li>
                <li><strong>Color shade</strong> encodes harmonicity. Harmonic di-chords are rendered light — open, bright. Non-harmonic di-chords are rendered dark — dense, closed.</li>
              </ul>
              <P>In practice, when working on Plogger exercises, you visualize the Pictograph before singing or playing a di-chord. This activates the visual-spatial memory of the interval alongside the auditory and motor memory. The three channels reinforce each other. Exercises in Chapters 11, 12, and 13 build the Pictograph progressively: first you draw the pulsation outlines alone, then you add shadow direction, then you add color. By Chapter 14 you can draw the complete Pictograph for all eleven di-chords from memory.</P>

              <Asset file="R2_pictograph_reference.html" title="Di-Chord Pictograph Reference — All 11 Di-Chords" height={600} />

              <H3 id="tracking-page">The Tracking Page</H3>
              <P>The Tracking Page is one of the two most important tools in the entire Plogger Method. Plogger himself writes that &quot;next to visualizing the keyboard, the Tracking Page is the most important means of developing fluency and accuracy in connecting your mind with your ear and your eye.&quot;</P>
              <P>It is a specific page in the Plogger book — page 153 — containing ten melodic lines built around specific di-chord types. No clefs are printed on these lines. You choose a starting note each day, which determines the mode. Seven different starting notes, seven different modes, the same ten melodic lines. One starting note per day of the week.</P>
              <P>Each line is practiced through six protocols, in order. Protocol 1: speak the solfège name of each note. Protocol 2: speak the secondary di-chord number — the di-chord between consecutive notes. Protocol 3: speak the primary di-chord number — the di-chord between each note and the tonic. Protocol 4: sing the primary di-chord number while playing a drone at the keyboard. Protocol 5A: sing the secondary di-chord number while visualizing its Pictograph. Protocol 6: sing the solfège names.</P>
              <P>The full six protocols are not all introduced at once. In Sprint 1, you begin with Protocols 1 and 2. The deeper protocols arrive as your di-chord ear develops through later sprints. By the time you reach Protocol 6 in Sprint 12, you are working the Tracking Page with all six protocols in seven modes simultaneously.</P>
              <P>The reason the Tracking Page works is captured in Plogger&apos;s distinction between reading by rote and reading by di-chord. Reading by rote means identifying individual notes one at a time. Reading by di-chord means accessing the relationships between notes, the intervals of movement, &quot;where expression, affect, and meaning are found.&quot; The Tracking Page trains the latter.</P>

            </section>

            {/* Part 2 */}
            <section id="part2">
              <H2 id="part2">Part 2: Melody — Zone 1</H2>

              <H3 id="zone-system">What the Zone System Is</H3>
              <P>The Melody Chamber of the AMF organizes melodic notes by what they do in relation to the underlying harmony, not by their pitch names or their position in a scale. Every note in a melody is either at home, slightly away from home, significantly away from home, or approaching from outside. The zone system makes this gradient explicit.</P>
              <P>The four zones are:</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-2 list-disc">
                <li><strong>Zone 1:</strong> Chord tones — the root, third, and fifth of the current chord. Maximally stable over that chord because they belong to it.</li>
                <li><strong>Zone 2:</strong> Non-chord tones — the 7th and 2nd scale degrees. One diatonic step away from chord tones; mild tension, close to home. (Enters Sprint 3)</li>
                <li><strong>Zone 3:</strong> Color tones — specifically the fourth scale degree. Stands directly in conflict with the third of the chord; active tension that wants to resolve. (Enters Sprint 5)</li>
                <li><strong>Zone 4:</strong> Approach tones — chromatic notes used to approach chord tones from a half step above or below. (Enters Sprint 7)</li>
              </ul>
              <P>The zones are a spiral thread — Zone 1 enters in Sprint 1 and the system deepens sprint by sprint. You do not learn all four zones in Sprint 1. You establish Zone 1 as a complete, fluent skill before Zone 2 is introduced.</P>

              <H3 id="zone1-detail">Zone 1 in Detail</H3>
              <P>Zone 1 contains exactly three notes for any given chord: the root, the third, and the fifth. These are the building blocks of a triad, and they carry specific functions worth understanding in depth.</P>
              <P><strong>The Root</strong> is home. When a melody lands on the root of the current chord, it is as resolved as it can be. The root is tonic gravity at the melodic level — the note that says &quot;we are here.&quot;</P>
              <P><strong>The Third</strong> is quality. The third of a chord is what determines whether the chord sounds major or minor — whether its quality is <BC>[4]</BC> (major, harmonic, open) or <BC>[3]</BC> (minor, non-harmonic, closed). When Bill Withers sings the minor third of Am, he is not just choosing a stable note — he is voicing the chord&apos;s minor quality through the melody.</P>
              <P><strong>The Fifth</strong> provides stability without direction. The fifth of a chord — a <BC>[7]</BC> di-chord above the root — is stable and open, but it does not carry the same tonal gravity as the root, nor does it color the harmony the way the third does. It sits in the chord calmly, without urgency in either direction.</P>

              <div className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-2 border border-slate-200 text-left font-bold">Chord</th>
                      <th className="px-4 py-2 border border-slate-200 text-left font-bold">Root</th>
                      <th className="px-4 py-2 border border-slate-200 text-left font-bold">Third</th>
                      <th className="px-4 py-2 border border-slate-200 text-left font-bold">Fifth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Am','A','C','E'],['G','G','B','D'],['Em','E','G','B'],['Dm','D','F','A']].map(([chord, root, third, fifth]) => (
                      <tr key={chord} className="hover:bg-slate-50">
                        <td className="px-4 py-2 border border-slate-200 font-bold">{chord}</td>
                        <td className="px-4 py-2 border border-slate-200">{root}</td>
                        <td className="px-4 py-2 border border-slate-200">{third}</td>
                        <td className="px-4 py-2 border border-slate-200">{fifth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Asset file="E1_zone1_guitar_fretboard.html" title="Zone 1 Guitar Fretboard — Am Chord Tones Across the Neck" height={480} />
              <Asset file="E2_zone1_piano_keyboard.html" title="Zone 1 Piano Keyboard — Am Five-Finger Position" height={400} />

              <H3 id="gesture">Melodic Gesture Recognition</H3>
              <P>A melodic gesture is a shaped movement in melody — two notes connected by a specific di-chord interval, carrying a direction and a character. Sprint 1 is exposure to the concept of melodic gesture, not mastery of it. The full gesture vocabulary is a later sprint project, beginning with the Tracking Page&apos;s deep protocols in Sprint 7. What you are doing in Sprint 1 is priming your ear to notice that melody moves by intervals — that a step up from E to G in the Am context is a <BC>[3]</BC> gesture, and that it has a quality you can hear and eventually name.</P>
              <P>The most immediate access to melodic gesture in Sprint 1 is through singing. When you sing the melody of &quot;Ain&apos;t No Sunshine,&quot; you are producing melodic gestures with your voice. The up-step from the root to the third of Am — from A to C — is a <BC>[3]</BC>. The fall from E back down to A — a <BC>[5]</BC> — gives a suspended, hanging quality.</P>

              <H3 id="pitch-first">Pitch Before Rhythm</H3>
              <P>The AMF sequences pitch location before rhythmic complexity for a specific reason. Before you can feel the rhythm of a melody fully, you need to know where the notes live in musical space. If you are spending cognitive attention locating pitches, you cannot also feel the time and groove that the rhythm requires. These are competing cognitive loads. By establishing Zone 1 fluency — by getting to the point where you can locate A, C, and E over Am without conscious searching — you free up attention for rhythm.</P>
            </section>

            {/* Part 3 */}
            <section id="part3">
              <H2 id="part3">Part 3: Harmony — Introduction to Harmonic Function</H2>

              <H3 id="harmonic-function">What Harmonic Function Means</H3>
              <P>There is a crucial difference between knowing what a chord contains and understanding what a chord does. A C major chord contains the notes C, E, and G. But in a piece of music in C major, a C major chord does the job of sounding like home. In a piece in F major, a C major chord does a different job: it sounds like the reach away from home. Same chord. Same notes. Completely different function.</P>
              <P>Traditional theory names three primary functions:</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-2 list-disc">
                <li><strong>Tonic</strong> is home. Maximum stability; the place the music has arrived at or is trying to return to.</li>
                <li><strong>Subdominant</strong> is departure. Creates movement away from home — spacious distance from tonic without urgent tension.</li>
                <li><strong>Dominant</strong> is tension requiring return. Creates the specific tension that the ear resolves by returning to tonic. It is not merely unstable — it is directional.</li>
              </ul>
              <P>The AMF is emphatic on one point about harmonic function: the organizing principle of the system is not ii-V-I. It is not even I-IV-V-I. The organizing principle is a vocabulary of fourteen di-chord root movements — the atomic intervals by which chord roots move from one to the next. Learning <BC>[5]</BC> root movement (the interval between I and IV roots, and between V and I roots) means you have learned the atomic component from which dozens of progressions are assembled. Sprint 2 begins that work. Sprint 1 lays the conceptual groundwork.</P>

              <H3 id="minor-keys">Minor Keys and Ain&apos;t No Sunshine</H3>
              <P>&quot;Ain&apos;t No Sunshine&quot; is in A minor. The song&apos;s three chords and their functions:</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-2 list-disc">
                <li><strong>Am (i)</strong> — Tonic minor. Home. The &quot;I know, I know&quot; sections are built entirely on Am. Minor tonic has a quality of settled melancholy — stability that is also heaviness.</li>
                <li><strong>G (bVII)</strong> — Subtonic. A major chord from the parallel major; creates a momentary brightening before returning to Am. No urgent dominant tension.</li>
                <li><strong>Em (v) or Dm (iv)</strong> — Minor dominant or minor subdominant. Creates gentle motion away from tonic. The emotional character of minor tonic — and this is worth sitting with — is the reason this song works.</li>
              </ul>

              <H3 id="root-movement">Root Movement as Di-Chord — The First Connection</H3>
              <P>The movement between chord roots is a di-chord. The same perceptual vocabulary you are building in the Plogger Method directly describes how harmony moves. When Am resolves to G, the root moves from A down to G — a <BC>[2]</BC> di-chord, the major second, dissonant at 8Hz. When Am moves to Em, the root moves from A down to E — a <BC>[5]</BC> di-chord, perfect fourth, stable at 2Hz. You will not be asked to own these root movements in Sprint 1, but noticing them in the song you are already learning is exactly the right preparation.</P>

              <Asset file="E3_root_movement_preview.html" title="Di-Chord → Root Movement Preview — Plogger to Harmony Bridge" height={380} />

              <H3 id="fourteen-movements">The 14-Movement Vocabulary — A Preview</H3>
              <P>The AMF&apos;s harmonic spine is built from fourteen di-chord root movements, not from chord progressions as memorized units. The sequence of movements, organized by perceptual accessibility, begins with <BC>[5]</BC> (perfect fourth — Sprint 2), then <BC>[7]</BC> (perfect fifth — Sprint 3), <BC>[2]</BC> (major second — Sprint 4), <BC>[3]</BC> (minor third — Sprint 5), <BC>[9]</BC> (major sixth — Sprint 6), <BC>[4]</BC> (major third — Sprint 7), and <BC>[6]</BC> (tritone — Sprint 8). Sprints 9–12 extend into chromatic territory. Each sprint owns one movement deeply before adding another.</P>
              <P>Progressions are not memorized as patterns. They are heard as combinations of owned sounds. This is the difference between learning a sequence and understanding a language. In Sprint 1 you are not yet speaking the language — you are learning your first words.</P>
            </section>

            {/* Part 4 */}
            <section id="part4">
              <H2 id="part4">Part 4: Voicings — Both Instruments, First Shapes</H2>

              <H3 id="two-instruments">Why Two Instruments From Day One</H3>
              <P>The AMF studies guitar and piano simultaneously from the first session of Sprint 1. The piano makes music theory physically visible — on a piano keyboard, the interval structure of a chord is a visible shape. An Am chord on the piano is visibly A-C-E: the A-C span is <BC>[3]</BC>, narrow; the C-E span is <BC>[4]</BC>, slightly wider; the A-E span is <BC>[7]</BC>, the largest. Theory becomes spatial. The guitar makes groove physical — when you strum Am, you feel the chord in your body. Together, they build the complete musician&apos;s apparatus: physical feel and visual-theoretical understanding reinforcing each other.</P>

              <H3 id="guitar">Guitar: Am, G, Em, Dm in Open Position</H3>
              <P><strong>Am:</strong> Middle finger on second fret, fourth string (E → E); ring finger on second fret, third string (G → A); index finger on first fret, second string (B → C). Open fifth string (A) and first string (E) played open. Do not play the sixth string. The di-chord relationship between adjacent strings: string 2 to string 1 (C to E) is a <BC>[4]</BC>. String 3 to string 2 (A to C) is a <BC>[3]</BC>. Playing Am gives you immediate, physical access to both di-chords of Sprint 1.</P>
              <P><strong>G:</strong> Ring finger on third fret, first string (E → G); middle finger on third fret, sixth string (E → G); index finger on second fret, fifth string (A → B). Open D, G, and B strings. The <BC>[4]</BC> from G to B is the quality-determining major third. The <BC>[3]</BC> from B to D is the fifth interval measured as a minor third up from the third.</P>
              <P><strong>Em:</strong> Middle finger on second fret, fifth string (A → B); ring finger on second fret, fourth string (D → E). All remaining strings open. The simplest open chord on guitar. The third of Em is G, a minor third above E — <BC>[3]</BC>. Em is minor because of the <BC>[3]</BC> between E and G.</P>
              <P><strong>Dm:</strong> Index finger on first fret, first string (E → F); middle finger on second fret, third string (G → A); ring finger on third fret, second string (B → D). Open fourth string (D). Do not play strings 5 or 6. Every minor chord contains a <BC>[3]</BC> between its root and third. This is what your ear is learning to recognize as the minor quality sound.</P>

              <Asset file="E1_zone1_guitar_fretboard.html" title="Zone 1 Guitar Fretboard — Open Position Chord Shapes" height={480} />

              <H3 id="piano">Piano: Five-Finger Position</H3>
              <P>The five-finger position — sometimes called the conjunct heptachord position — is the foundational hand position. Both hands meet at the tonic note, each index finger on the same pitch. From there, the right hand extends upward and the left hand extends downward.</P>

              <div className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-2 border border-slate-200 font-bold">Finger</th>
                      <th className="px-4 py-2 border border-slate-200 font-bold">Right Hand</th>
                      <th className="px-4 py-2 border border-slate-200 font-bold">Left Hand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['Index','Tonic (1)','Tonic (1)'],['Middle','2nd degree','7th degree'],['Ring','3rd degree','6th degree'],['Pinky','4th degree','5th degree']].map(([finger, right, left]) => (
                      <tr key={finger} className="hover:bg-slate-50">
                        <td className="px-4 py-2 border border-slate-200 font-medium">{finger}</td>
                        <td className="px-4 py-2 border border-slate-200">{right}</td>
                        <td className="px-4 py-2 border border-slate-200">{left}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <P>The ring finger always plays the third degree of the scale — your weakest non-pinky finger is the finger that determines major or minor quality. In A minor, the right ring finger rests on C — a <BC>[3]</BC> from A. The physical sensation under your ring finger encodes the quality of the mode. For Sprint 1, establish two positions: C major (tonic on middle C) and A minor (tonic on A above middle C).</P>

              <Asset file="E2_zone1_piano_keyboard.html" title="Zone 1 Piano Keyboard — Five-Finger Position" height={400} />

              <H3 id="parallel">Parallel Practice</H3>
              <P>Playing the same chord on both instruments in the same practice session creates a specific kind of learning that neither instrument alone produces. The chord&apos;s di-chord content is the same on both instruments — Am is A-C-E regardless of guitar or keyboard. But the physical experience is completely different. On guitar, Am is a grip. On piano, Am is three keys pressed — a cleaner attack, the chord laid out visually as a span across the keyboard. When you move between the two instruments and find the same <BC>[3]</BC> quality in both, you are reinforcing the di-chord as a perceptual object independent of any physical medium. This is the beginning of genuine musical abstraction.</P>
            </section>

            {/* Part 5 */}
            <section id="part5">
              <H2 id="part5">Part 5: Rhythm — The Binary Grid and Longy</H2>

              <H3 id="grid">How the Rhythm Code Grid Works</H3>
              <P>The Rhythm Code system begins with a foundational claim that departs from conventional rhythm teaching: rhythm is not about duration values. It is about starting points. Instead of asking &quot;how long does this note last,&quot; it asks &quot;which of the eight available positions in this measure does this note start on?&quot; The grid is binary. On or off. Eight positions per measure in 4/4 time, each position representing one eighth note.</P>
              <ul className="text-slate-700 leading-relaxed mb-4 pl-6 space-y-1 list-none">
                {[
                  ['1','Downbeat — beat one, heaviest and most stable'],
                  ['2','"and" of beat one — eighth note upbeat'],
                  ['3','Beat two'],
                  ['4','"and" of beat two'],
                  ['5','Beat three (with position 1 forms the backbeat)'],
                  ['6','"and" of beat three'],
                  ['7','Beat four'],
                  ['8','"and" of beat four — most rhythmically charged; anticipation position'],
                ].map(([pos, desc]) => (
                  <li key={pos} className="flex gap-2">
                    <span className="font-mono font-bold text-slate-800 w-5 shrink-0">{pos}</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              <P><strong>Stops</strong> are the last note before a silence. The stop determines where the rhythmic phrase ends, and where you choose to stop dramatically affects the feel of the music. &quot;Ain&apos;t No Sunshine&quot; is built on stops — abrupt silences that are as musically active as the notes themselves. <strong>Anticipations</strong> are notes that start slightly before the beat they &quot;belong to&quot; — arriving early, creating forward momentum. Position 8 is the primary anticipation position: a note there is arriving one eighth note before the next downbeat.</P>

              <Asset file="O2_rhythm_grid_card.html" title="Rhythm Code 8-Position Grid Card" height={580} />

              <H3 id="longy">Longy: ta and ta-te</H3>
              <P>The Longy system is a syllabic encoding of rhythm. <strong>ta</strong> is a single undivided beat — a quarter note in simple time. <strong>ta-te</strong> is a beat divided into two equal parts — two eighth notes. The syllable carries the duration: you cannot say &quot;ta&quot; too quickly and still produce the correct rhythm, because the physical act of pronouncing the syllable occupies time.</P>
              <P>In Sprint 1 you are working with exactly two Longy patterns: <strong>ta</strong> and <strong>ta-te</strong>. Everything else in the Longy system is built from these two foundations. The Longy system and the Rhythm Code grid operate at different levels and both are necessary. Longy answers: what is this rhythm, and how is it notated? The Rhythm Code answers: does this rhythm feel good, and where does it sit in the groove?</P>

              <H3 id="ans-rhythm">The Rhythm of Ain&apos;t No Sunshine</H3>
              <P>&quot;Ain&apos;t No Sunshine&quot; has one of the most instructive rhythmic structures in the popular song repertoire for a beginning groove study, specifically because of its use of silence. The famous &quot;I know&quot; section — approximately twenty-six repetitions of the phrase &quot;I know&quot; — is rhythmically remarkable. Between each &quot;I know,&quot; there is a rhythmic gap — a stop. The stops are not empty. They are rhythmically active silences. The listener&apos;s ear fills in the beat, continues the pulse internally, and experiences the next &quot;I know&quot; as arriving exactly where it should.</P>
              <P>The song&apos;s overall feel is moderately slow, around 80–90 BPM, in 4/4 time. The basic strumming pattern is built around positions 1 and 5 — downbeats of beats one and three — with anticipations moving chord changes slightly early. The stop-time feel of the &quot;I know&quot; section uses position 1 as the landing point for each phrase, with positions 2–8 silent until the next phrase arrives.</P>
            </section>

            {/* Part 6 */}
            <section id="part6">
              <H2 id="part6">Part 6: The Anchor Song — Ain&apos;t No Sunshine</H2>
              <P>&quot;Ain&apos;t No Sunshine&quot; was written and recorded by Bill Withers in 1971, appearing on his debut album <em>Just As I Am</em>. It runs slightly over two minutes. It was chosen as the Sprint 1 anchor song for four reasons that are worth stating precisely, because understanding why a song was chosen illuminates how to use it.</P>

              <Asset file="O1_aint_no_sunshine_analysis.html" title="Ain't No Sunshine — Complete Analysis Sheet" height={700} />

              <H3>Di-Chord Content in the Melody and Bass</H3>
              <P>The melody sits almost entirely in Zone 1 — chord tones of whatever chord is currently sounding. The primary di-chord movement in the bass is the <BC>[2]</BC> — the whole-step relationship between Am and G. This is a dissonant di-chord (8Hz, jagged wave), which means there is a slightly urgent quality to the Am-G oscillation even though neither chord is what traditional theory would call &quot;dissonant.&quot; The urgency of <BC>[2]</BC> is why the Am-G movement in this song has a restless, aching quality despite the slow tempo.</P>
              <P>The Am-Em movement covers a <BC>[5]</BC> root movement — a perfect fourth downward. The <BC>[5]</BC> di-chord has a perfect pulsation (2Hz, straight wave), which means the movement is acoustically stable — not urgent. This gives the Am-to-minor-third-chord movement a sense of settling deeper into the minor world, not straining against it.</P>

              <H3>Harmonic Function Analysis</H3>
              <P>The song operates in A natural minor / Aeolian mode. What is notable about the harmonic language is its absence of dominant-function tension. There is no E major chord (the actual V chord of A minor, which would contain G-sharp and create strong leading-tone tension). The song never pushes hard toward resolution — it pools in tonic minor, moves briefly outward, and returns. This harmonic restraint is part of what gives the song its emotional texture: resignation without release.</P>

              <H3>Zone 1 Melody in the Song</H3>
              <P>The verse melody centers on A and C — the root and minor third of Am. The phrase &quot;Ain&apos;t no sunshine when she&apos;s gone&quot; moves primarily between A and C with E appearing as a structural articulation. The &quot;I know&quot; section abandons melodic development entirely and becomes a rhythmic incantation on a single pitch — A, the root. A phrase of twenty-six repetitions of &quot;I know&quot; on the tonic root, over the Am chord, is Zone 1 reduced to its simplest element.</P>

              <H3>Why This Song for Sprint 1</H3>
              <P>The case for &quot;Ain&apos;t No Sunshine&quot; as the Sprint 1 anchor song comes down to four properties: it is unambiguously minor (the <BC>[3]</BC>-based quality of the tonic chord is the most prominent di-chord in the song&apos;s harmonic landscape); the harmonic structure is simple enough to absorb with three chords; it grooves in a way that makes repetition pleasurable; and it is worth playing — there is real musical substance here that repays attention over time.</P>

              <H3>What You Should Be Able to Do With This Song by Sprint End</H3>
              <P>You can sit down, without preparation, and play a simplified but musical version of the song on both guitar and piano. Not perfectly. Fluently. You can hear when you arrive at Am that you are home in a minor world. You can hear the <BC>[3]</BC> quality of the minor tonic chord and know what you are hearing. You can feel the stops in the &quot;I know&quot; section as rhythmic events, not as silences waiting to be filled. And you can locate Zone 1 — the A, C, and E of Am — under your fingers on both instruments without hunting.</P>
            </section>

            {/* Closing */}
            <section id="closing">
              <H2 id="closing">Closing: What Owning Sprint 1 Feels Like</H2>
              <P>Stage 3 on the Sprint 1 material is not a checklist state. It is a qualitative shift in how you move through musical experience. When you hear a minor chord — in a song, in a film, in a passing radio advertisement — you will notice a quality. Not think about it. Notice it. The <BC>[3]</BC> character of the minor third will register the way a color registers visually — immediately, without deliberate analysis.</P>
              <P>When you play Am on guitar or piano, you will feel the chord as a sound-object with specific properties, not just as a shape to reproduce. The voicings are not just fingerings — they are clusters of di-chord relationships that you can hear as you play them. The <BC>[3]</BC> between the root and third, the <BC>[7]</BC> between the root and fifth, the <BC>[4]</BC> between the third and fifth. These are not analytical observations you are making during practice. They are acoustic facts that are present in the sound, and your ear has begun to register them.</P>
              <P>The 8-position grid has become the way you hear rhythm, not a concept you apply to rhythm. Stops register as stops — you hear the silence as a rhythmic choice rather than a gap. Anticipations feel like anticipations.</P>
              <P>&quot;Ain&apos;t No Sunshine&quot; can be played without stopping. Not perfectly — mistakes are fine at Stage 3 on a sprint. But without the hesitations and resets that characterize Stage 2. Somewhere in the playing there will be a moment — probably in the &quot;I know&quot; section — where you stop thinking about the song and start hearing it. That moment, when the framework temporarily disappears and you are just playing music, is the north star of the entire AMF. Sprint 1 is not the destination. But it is the first time you will feel the direction.</P>
              <P>When you move to Sprint 2, the <BC>[5]</BC> root movement will not feel like starting over. It will feel like adding one more di-chord to a vocabulary you are already building. Sprint 1 is your first taste of what it means to work toward Stage 3.</P>
            </section>

            {/* Appendix */}
            <section id="appendix">
              <H2 id="appendix">Appendix — Pull-Out Reference Card</H2>
              <P>Keep this reference visible on your practice desk throughout Sprint 1. All three sound factors for all 11 di-chords.</P>
              <Asset file="R4_sound_factors_reference.html" title="Di-Chord Sound Factors Reference — Desk Copy" height={500} />
            </section>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400">
              Adaptable Musician&apos;s Framework — Sprint 1 Mini-Textbook ·{' '}
              <a href="/materials/sprint1" className="hover:text-slate-600">Back to Sprint 1 Assets</a> ·{' '}
              <a href="/materials/sprint1/practice" className="hover:text-slate-600">Practice Plan →</a>
            </div>

          </article>
        </div>
      </div>
    </div>
  )
}
