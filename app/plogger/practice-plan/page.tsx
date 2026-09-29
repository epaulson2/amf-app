'use client'

import Link from 'next/link'

const TRACKS = {
  M: { label: 'Mental Framework', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  R: { label: 'Rhythm',           color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
  G: { label: 'Geography',        color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  D: { label: 'Di-Chord',         color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  S: { label: 'Structure',        color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
} as const

type TrackKey = keyof typeof TRACKS

function TrackBadge({ t }: { t: TrackKey }) {
  const m = TRACKS[t]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border"
      style={{ background: m.bg, color: m.color, borderColor: m.border }}
    >
      {t} · {m.label}
    </span>
  )
}

function BookRef({ id, label }: { id: string; label: string }) {
  return (
    <Link
      href={`/plogger#${id}`}
      className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded border transition-colors hover:opacity-80"
      style={{ background: '#eef2ff', color: '#4f46e5', borderColor: '#c7d2fe' }}
      target="_blank"
    >
      ↗ {label}
    </Link>
  )
}

interface SessionItem {
  time: string
  label: string
  ref?: { id: string; label: string }
}

interface Gate {
  name: string
  criterion: string
}

interface Phase {
  n: number
  id: string
  title: string
  subtitle: string
  tracks: TrackKey[]
  am: SessionItem[]
  pm: SessionItem[]
  gates: Gate[]
  unlocks: string
}

const PHASES: Phase[] = [
  {
    n: 0,
    id: 'phase-0',
    title: 'Orientation',
    subtitle: 'Build the learning framework, internalize the keyboard, start rhythm — all before touching a single pitch concept',
    tracks: ['M', 'R', 'G'],
    am: [
      {
        time: '10 min',
        label: 'Read Ch.1 — Three Stages of Learning. The framework applies immediately. Before every exercise in every future session, consciously label which stage you are entering.',
        ref: { id: 'ch1', label: 'Ch.1' },
      },
      {
        time: '10 min',
        label: 'Read Ch.2 — Three Causes of Error. Identify which error type interrupted you during the Ch.1 reading. Eagle Vision, sensory lead, Coach Out — internalize all three.',
        ref: { id: 'ch2', label: 'Ch.2' },
      },
      {
        time: '10 min',
        label: 'Keyboard visualization (Ch.3) — eyes closed, locate any named key. Build the internal map: white keys first, then black key groupings (2+3). Do not look down.',
        ref: { id: 'ch3', label: 'Ch.3' },
      },
    ],
    pm: [
      {
        time: '10 min',
        label: 'Longy rhythms introduction (Ch.4) — speak 2-beat and 3-beat Longy patterns out loud at 60 bpm. No instrument needed. Focus on clarity of articulation, not speed.',
        ref: { id: 'ch4', label: 'Ch.4' },
      },
      {
        time: '15 min',
        label: 'Lap Map (Ch.5) Ex.5-1 through 5-3 — tap 2-beat, 3-beat, 4-beat patterns at 60 bpm. One hand marks the beat grouping, the other subdivides. Do not count aloud.',
        ref: { id: 'ch5', label: 'Ch.5 Ex.5-1–5-3' },
      },
      {
        time: '5 min',
        label: 'Dual-task combine: speak Longy syllables for a simple rhythm while tapping the Lap Map simultaneously. This combined practice pattern will be used forever.',
      },
    ],
    gates: [
      { name: 'Speed', criterion: 'Locate and name any chromatic key (white or black) in under 2 seconds, cold — no counting from C.' },
      { name: '12-Key', criterion: 'Find every pitch class on the keyboard in a single pass without hesitation or backtracking.' },
      { name: 'Dual-Task', criterion: 'Tap the 2-beat Lap Map and speak Longy rhythms simultaneously for 1 full minute, both stable, neither breaking the other.' },
      { name: 'Cold Start', criterion: 'Sit down and begin Lap Map tapping immediately at 60 bpm. No counting-in, no warm-up measure — instant groove.' },
    ],
    unlocks: 'Phase 1 — Ch.6 Pythagorean ordering + Ch.9 Di-Chord numbers open simultaneously',
  },
  {
    n: 1,
    id: 'phase-1',
    title: 'Core Vocabulary',
    subtitle: 'Pythagorean ordering and di-chord numbers — the two pillars that every subsequent chapter rests on',
    tracks: ['M', 'R', 'G', 'D'],
    am: [
      {
        time: '5 min',
        label: 'Pythagorean ordering (Ch.6) Ex.6-1 — recite ascending: F C G D A E B (fa do sol re la mi si). Letters first, then solfège. Cold start, out loud. This becomes a permanent daily habit.',
        ref: { id: 'ch6', label: 'Ch.6 Ex.6-1–6-3' },
      },
      {
        time: '5 min',
        label: 'Pythagorean descending (Ch.6) Ex.6-5 — B E A D G C F (si mi la re sol do fa). Same standard: cold, out loud, no looking.',
        ref: { id: 'ch6', label: 'Ch.6 Ex.6-5' },
      },
      {
        time: '20 min',
        label: 'Di-chord calculation (Ch.9) Ex.9-1 and 9-2 — count semitones between given note pairs. Verify every pair + its inversion = 12. Internalize the Inversion Law before moving to Ex.9-3.',
        ref: { id: 'ch9', label: 'Ch.9 Ex.9-1–9-2' },
      },
    ],
    pm: [
      {
        time: '5 min',
        label: 'Pythagorean recitation again — spaced from AM. Both directions, letters only first, then solfège only. The spacing between AM and PM accelerates consolidation.',
      },
      {
        time: '15 min',
        label: 'Di-chord flashcards (Ch.9) Ex.9-4 — for any two keys played at the keyboard, give the bracket number instantly. Work toward 5 seconds per pair across all 11 di-chords.',
        ref: { id: 'ch9', label: 'Ch.9 Ex.9-4–9-5' },
      },
      {
        time: '5 min',
        label: 'Interval name mapping (Ch.9) Ex.9-5 — match bracket numbers to ordinal names: [3] → minor 3rd, [7] → perfect 5th, etc. Under 5 seconds per item is the target.',
        ref: { id: 'ch9', label: 'Ch.9 Ex.9-6' },
      },
      {
        time: '5 min',
        label: 'Lap Map + Longy (Ch.5) Ex.5-4 through 5-7 — add 5-beat and 6-beat meter patterns. Stay at 60 bpm.',
        ref: { id: 'ch5', label: 'Ch.5 Ex.5-4–5-7' },
      },
    ],
    gates: [
      { name: 'Speed', criterion: 'State the di-chord number for any two keyboard keys in under 5 seconds, cold — no calculating, the number arrives.' },
      { name: '12-Key', criterion: 'Complete di-chord + inversion for all 12 chromatic starting notes without hesitation. Every sum = 12.' },
      { name: 'Dual-Task', criterion: 'Name di-chord numbers for random keyboard pairs called out by another person (or randomized) while tapping the 4-beat Lap Map continuously.' },
      { name: 'Cold Start', criterion: 'Recite full Pythagorean ordering — ascending + descending, letters + solfège — immediately on request, anywhere, no preparation.' },
    ],
    unlocks: 'Phase 2 — Sonic Properties (Ch.10–14) and Structure Track (Ch.17–18) both unlock simultaneously',
  },
  {
    n: 2,
    id: 'phase-2',
    title: 'Sonic Properties',
    subtitle: 'The three acoustic dimensions of every di-chord — pulsation, F/O direction, harmonicity — the intellectual core of the method',
    tracks: ['M', 'R', 'G', 'D', 'S'],
    am: [
      {
        time: '5 min',
        label: 'Pulsation families overview (Ch.10) — read the three-factor overview. Use the interactive Di-Chord Explorer on the plogger page to see all three properties update as you select each di-chord.',
        ref: { id: 'ch10', label: 'Ch.10' },
      },
      {
        time: '5 min',
        label: 'Pulsation speaking (Ch.11) Ex.11-2 — at 60 bpm: subdivide into 2 equal parts (perfect) and 8 equal parts (dissonant). Speak "1-perfect, 1-2-3-4-dissonant" alternating. Instant association is the goal.',
        ref: { id: 'ch11', label: 'Ch.11 Ex.11-2' },
      },
      {
        time: '10 min',
        label: 'Pulsation listening (Ch.11) Ex.11-3, 11-5, 11-7 — at the keyboard, work through comparison pair sets (perfect/dissonant, dissonant/modal, modal/perfect). Check off each of the 12 pairs per exercise.',
        ref: { id: 'ch11', label: 'Ch.11 Ex.11-3–11-7' },
      },
      {
        time: '10 min',
        label: 'Tri-chord formation (Ch.17) — identify and spell all 4 triad types by di-chord profile: major [7/4], minor [7/3], diminished [6/3], augmented [8/4]. All 12 roots.',
        ref: { id: 'ch17', label: 'Ch.17' },
      },
    ],
    pm: [
      {
        time: '5 min',
        label: 'Lap Map + Longy (Ch.5) Ex.5-8 through 5-11 — add 7-beat and mixed meter patterns. Maintain at 60 bpm.',
        ref: { id: 'ch5', label: 'Ch.5 Ex.5-8–5-11' },
      },
      {
        time: '5 min',
        label: 'F/O Factor (Ch.12) — memorize the direction rule: [1]–[5] refer down (lower note = acoustic root), [6] neutral, [7]–[11] refer up (upper note = root). Quiz any di-chord cold.',
        ref: { id: 'ch12-14', label: 'Ch.12' },
      },
      {
        time: '5 min',
        label: 'Harmonicity (Ch.13) — harmonic ([2],[4],[7],[9],[10]) vs. non-harmonic ([1],[3],[5],[8],[11]) vs. neutral ([6]). Green ornament / red ornament. Drill until instant.',
        ref: { id: 'ch12-14', label: 'Ch.13' },
      },
      {
        time: '5 min',
        label: 'Complete di-chord table (Ch.14) Ex.14-1 — fill all three columns (pulsation, F/O, harmonicity) from memory for all 11 di-chords. Draw the pictograph from memory (Ex.14-2).',
        ref: { id: 'ch12-14', label: 'Ch.14 Ex.14-1–14-2' },
      },
      {
        time: '10 min',
        label: 'Tetrachord formation (Ch.18) — spell major and minor tetrachords (lower 4 notes of a heptachord) from any root across all 12 keys.',
        ref: { id: 'ch18', label: 'Ch.18' },
      },
    ],
    gates: [
      { name: 'Speed', criterion: 'Classify any di-chord by all three properties (pulsation family, F/O direction, harmonic/non-harmonic) in under 10 seconds, cold.' },
      { name: '12-Key', criterion: 'Complete the three-column di-chord reference table from memory for all 11 di-chords. Draw the complete pictograph from memory (Ex.14-2) — all three factors encoded correctly.' },
      { name: 'Dual-Task', criterion: 'Name all three properties of a di-chord played at the keyboard while maintaining Lap Map tapping. Both stable simultaneously.' },
      { name: 'Cold Start', criterion: 'Draw or recite the complete pulsation/F/O/harmonicity profile for any di-chord immediately on request, anywhere.' },
    ],
    unlocks: 'Phase 3 — Melodic Integration (Ch.15–16) + Modes and Heptachords (Ch.19–20)',
  },
  {
    n: 3,
    id: 'phase-3',
    title: 'Melodic Integration',
    subtitle: 'Apply sonic properties to real melodic motion — the Tracking Page goes live, di-chords become a real-time perceptual overlay',
    tracks: ['M', 'R', 'G', 'D', 'S'],
    am: [
      {
        time: '5 min',
        label: 'Gesture types (Ch.15) — four types based on harmonicity + direction: Open (harmonic, ascending), Closed (non-harmonic, ascending), Strong (harmonic, descending), Weak (non-harmonic, descending), Neutral ([6]). Drill cold.',
        ref: { id: 'ch15', label: 'Ch.15' },
      },
      {
        time: '15 min',
        label: 'Gesture analysis (Ch.15) Ex.15-1, 15-2, 15-4 — label secondary di-chords and gesture type for each melodic leap in written examples. Work toward naming gesture type of any di-chord in 5 seconds.',
        ref: { id: 'ch15', label: 'Ch.15 Ex.15-1–15-5' },
      },
      {
        time: '10 min',
        label: 'Mode ordering (Ch.19) — Pythagorean brightness sequence: Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian. Same recitation habit as Pythagorean ordering in Ph.1.',
        ref: { id: 'ch19', label: 'Ch.19' },
      },
    ],
    pm: [
      {
        time: '5 min',
        label: 'Lap Map maintenance — rotate through all 11 meter patterns. Pick one unfamiliar pattern each session. Cold start every time.',
      },
      {
        time: '15 min',
        label: 'Tracking Page (Ch.16) — track secondary di-chords (melodic intervals) and primary di-chords (scale degree from tonic) simultaneously in real time through a melody. Start with a melody you already know by heart.',
        ref: { id: 'ch16', label: 'Ch.16' },
      },
      {
        time: '10 min',
        label: 'Heptachord formation (Ch.20) — spell the major heptachord from all 12 roots. Name the primary di-chord for each scale degree: doh=[0], re=[2], mi=[4], fa=[5], sol=[7], la=[9], si=[11].',
        ref: { id: 'ch20', label: 'Ch.20' },
      },
    ],
    gates: [
      { name: 'Speed', criterion: 'Name the gesture type (Open/Closed/Strong/Weak/Neutral) for any di-chord, ascending or descending, in under 5 seconds, cold.' },
      { name: '12-Key', criterion: 'Track secondary di-chords in real time through a short melody beginning on each of the 12 chromatic pitch classes — no slowing down, no pausing.' },
      { name: 'Dual-Task', criterion: 'Maintain Lap Map while tracking both primary and secondary di-chords through a melody simultaneously — all three layers stable.' },
      { name: 'Cold Start', criterion: 'State the primary di-chord of any scale degree immediately. Example asked cold: "Primary di-chord of scale degree 6?" → instant: "[9]"' },
    ],
    unlocks: 'Phase 4 — Harmonic Structures: triads (Ch.21), 7th chords (Ch.22), harmonization (Ch.23), transposition (Ch.25)',
  },
  {
    n: 4,
    id: 'phase-4',
    title: 'Harmonic Structures',
    subtitle: 'Full chord analysis — inversions, 7th chords, scale-degree harmonization, and transposition across all clefs',
    tracks: ['M', 'R', 'G', 'D', 'S'],
    am: [
      {
        time: '5 min',
        label: 'Clef reading (Ch.8) — draw all 8 clefs from memory (Ex.8-1). Use the odd/even shortcut: both notes on lines or both on spaces = odd interval; one on each = even interval.',
        ref: { id: 'ch8', label: 'Ch.8 Ex.8-1–8-6' },
      },
      {
        time: '10 min',
        label: 'Triads and inversions (Ch.21) — Boulanger/Ploger chord exercise: play any triad, name notes bottom-up then top-down, name di-chords top-down. Repeat from all 12 roots for major and minor.',
        ref: { id: 'ch21', label: 'Ch.21' },
      },
      {
        time: '15 min',
        label: '7th chord analysis (Ch.22) Ex.22-1 and 22-2 — Dom7, Min7, Half-dim, Fully-dim across all 12 roots × all 4 inversions. Use the inversion tables in Ch.22 to verify top-down di-chord profiles.',
        ref: { id: 'ch22', label: 'Ch.22 Ex.22-1–22-2' },
      },
    ],
    pm: [
      {
        time: '5 min',
        label: 'Lap Map + Pythagorean recitation — maintenance. Both cold start. No skipping these even at Phase 4.',
      },
      {
        time: '15 min',
        label: 'Scale degree harmonization (Ch.23) Ex.23-5 — work through the 10 sequences in the major heptachord. Begin with 2–3 sequences per session. Goal: each sequence in all 12 keys before the gate clears.',
        ref: { id: 'ch23', label: 'Ch.23 Ex.23-5' },
      },
      {
        time: '10 min',
        label: 'Transposition (Ch.25) Ex.25-1 and 25-2 — transpose Yankee Doodle and A Tisket A Tasket using the correct clef and key signature without calculation. Bass clarinet, horn in F, trumpet in D as transposing instruments.',
        ref: { id: 'ch25', label: 'Ch.25 Ex.25-1–25-2' },
      },
    ],
    gates: [
      { name: 'Speed', criterion: 'Name the root, quality, and inversion of any 7th chord in any voicing in under 10 seconds, cold.' },
      { name: '12-Key', criterion: 'Complete the Boulanger/Ploger chord exercise for all 4 chord types × all 12 chromatic roots × all 4 inversions. No hesitations anywhere in the sequence.' },
      { name: 'Dual-Task', criterion: 'Harmonize a Ch.23 melody sequence while tapping the Lap Map. Chord names, di-chord profiles, and rhythm all stable simultaneously.' },
      { name: 'Cold Start', criterion: 'Begin any Ch.23 harmonization sequence on any starting note immediately — correct soprano scale degree, Roman numeral, and di-chord profile — no preparation.' },
    ],
    unlocks: 'Phase 5 — Integration: all tracks merge into real music analysis and performance',
  },
  {
    n: 5,
    id: 'phase-5',
    title: 'Integration',
    subtitle: 'All tracks converge — the Plogger lens becomes a permanent real-time overlay on every piece of music you play or hear',
    tracks: ['M', 'R', 'G', 'D', 'S'],
    am: [
      {
        time: '5 min',
        label: 'Maintenance rotation — one cold-start item from each earlier track. Spot-check any gate criterion from Phases 1–4. If any item slips under the gate, that track needs attention before music work.',
      },
      {
        time: '25 min',
        label: 'Real music analysis — take any piece you are studying. Label: secondary di-chords for every melodic leap, gesture types, primary di-chords for every harmonic moment, chord roots and inversions. Ch.16 Tracking Page is the constant mental overlay.',
        ref: { id: 'ch16', label: 'Ch.16' },
      },
    ],
    pm: [
      {
        time: '5 min',
        label: 'Lap Map — permanent cold-start opener for every PM session. It is never finished, never optional.',
      },
      {
        time: '25 min',
        label: 'Performance application — play the same piece from AM. Execute the full analysis in real time without stopping. The goal: the di-chord fingerprint of every interval arrives before or as it sounds — not after. The analysis and the music are one thing.',
      },
    ],
    gates: [
      {
        name: 'Ongoing',
        criterion: 'There are no advancement gates in Phase 5. This is the permanent practice state. The only ongoing metric: can you play and analyze in real time simultaneously — without the analysis breaking the performance, and without the performance breaking the analysis? That dual-presence is Stage 3 across the entire system.',
      },
    ],
    unlocks: 'This is the destination. All AMF chambers — Melody, Harmony, Voicings, Rhythm — now have a functioning Musical OS underneath them.',
  },
]

export default function PloggerPracticePlanPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div className="bg-slate-900 text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/plogger" className="text-slate-400 hover:text-white text-sm mb-4 inline-block transition-colors">
            ← Plogger Method Book
          </Link>
          <h1 className="text-3xl font-bold mb-2">Parallel-Track Practice Plan</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            A mastery-gated, progression-based system for the Plogger method.
            Two 30-minute sessions per day — AM analytical, PM perceptual.
            Advancement is triggered by passing four fluency tests, never by calendar time.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* ── Approach Summary ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-sky-50 border border-sky-200 rounded p-4">
            <p className="font-semibold text-sky-900 text-sm mb-1">2 × 30-minute sessions daily</p>
            <p className="text-sky-700 text-xs leading-relaxed">AM is analytical and declarative. PM is perceptual and motor. The gap between them lets ear-training consolidate. Never go past 90 min in one sitting.</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded p-4">
            <p className="font-semibold text-purple-900 text-sm mb-1">5 parallel tracks</p>
            <p className="text-purple-700 text-xs leading-relaxed">Mental, Rhythm, Geography, Di-Chord, Structure — each advances independently when its own gates clear. Tracks M and R run forever from Day 1.</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded p-4">
            <p className="font-semibold text-amber-900 text-sm mb-1">4-test mastery gate</p>
            <p className="text-amber-700 text-xs leading-relaxed">Speed + 12-Key + Dual-Task + Cold Start. All four must pass before advancing any track. You self-administer. No teacher needed to know when to move on.</p>
          </div>
        </div>

        {/* ── Track Legend ── */}
        <div className="mb-10">
          <h2 className="text-base font-bold text-slate-800 mb-3 uppercase tracking-wide text-xs">Five Tracks</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {(Object.entries(TRACKS) as [TrackKey, typeof TRACKS[TrackKey]][]).map(([key, m]) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium"
                style={{ background: m.bg, color: m.color, borderColor: m.border }}
              >
                <span className="font-bold">{key}</span>
                <span>{m.label}</span>
              </span>
            ))}
          </div>
          <p className="text-slate-500 text-xs">
            M and R are active from Day 1 and never stop. G unlocks after Phase 0. D unlocks after G clears Ch.3. S unlocks after D clears Ch.9. At peak you run all five simultaneously.
          </p>
        </div>

        {/* ── Mastery Gate Reference ── */}
        <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-12">
          <h2 className="font-bold text-amber-900 text-sm mb-3">Mastery Gate Tests — applies to every phase transition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {[
              ['Speed', 'The target item answered in under 10 seconds, cold — no warm-up, no calculating aloud.'],
              ['12-Key', 'The exercise completed from all 12 chromatic starting pitches without a single hesitation.'],
              ['Dual-Task', 'The exercise performed while simultaneously tapping the Lap Map. Both layers stable.'],
              ['Cold Start', 'Walk away 24 hours. Begin immediately next session without re-studying. No = consolidating. Yes = automatic.'],
            ].map(([name, desc]) => (
              <div key={name} className="flex gap-3">
                <span className="text-amber-700 font-bold text-xs w-20 shrink-0 pt-0.5">{name}</span>
                <span className="text-amber-800 text-xs leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Phase Navigation ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {PHASES.map(p => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              Phase {p.n} — {p.title}
            </a>
          ))}
        </div>

        {/* ── Phases ── */}
        {PHASES.map(p => (
          <section key={p.id} id={p.id} className="mb-16 scroll-mt-6">

            {/* Phase header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                P{p.n}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{p.title}</h2>
                <p className="text-slate-500 text-sm mt-0.5 leading-relaxed max-w-xl">{p.subtitle}</p>
              </div>
            </div>

            {/* Active tracks */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tracks.map(t => <TrackBadge key={t} t={t} />)}
            </div>

            {/* AM / PM sessions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

              {/* AM */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <div className="bg-sky-50 border-b border-sky-100 px-4 py-2.5">
                  <p className="font-semibold text-sky-900 text-sm">AM Session · 30 minutes</p>
                  <p className="text-sky-600 text-xs">Analytical · declarative · cognitive</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {p.am.map((item, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-mono text-slate-400">{item.time}</span>
                        {item.ref && <BookRef id={item.ref.id} label={item.ref.label} />}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PM */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2.5">
                  <p className="font-semibold text-indigo-900 text-sm">PM Session · 30 minutes</p>
                  <p className="text-indigo-600 text-xs">Perceptual · motor · kinesthetic</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {p.pm.map((item, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-mono text-slate-400">{item.time}</span>
                        {item.ref && <BookRef id={item.ref.id} label={item.ref.label} />}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mastery gates */}
            <div className="bg-slate-900 rounded-lg p-5 mb-3">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
                Mastery Gates — all four must pass to advance
              </p>
              <div className="space-y-3">
                {p.gates.map((g, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-amber-400 font-bold text-xs w-22 shrink-0 pt-0.5 w-20">{g.name}</span>
                    <p className="text-slate-300 text-sm leading-relaxed">{g.criterion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlocks */}
            <div className={`flex items-start gap-2 text-sm rounded px-4 py-2.5 border ${
              p.n < 5
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-slate-600 bg-slate-50 border-slate-200'
            }`}>
              {p.n < 5 && <span className="font-bold shrink-0">Unlocks →</span>}
              <span className="leading-relaxed">{p.unlocks}</span>
            </div>

          </section>
        ))}

        {/* ── Footer ── */}
        <div className="border-t border-slate-200 pt-8 flex items-center justify-between">
          <Link href="/plogger" className="text-indigo-600 hover:text-indigo-800 text-sm transition-colors">
            ← Plogger Method Book
          </Link>
          <p className="text-slate-400 text-xs">
            Book references (↗) open the relevant chapter in the Plogger digital book
          </p>
        </div>

      </div>
    </main>
  )
}
