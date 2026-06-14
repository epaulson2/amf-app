'use client'

import { useState } from 'react'
import DiChordPictograph from '@/app/DiChordPictograph'

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-slate-800 mb-3 mt-12 border-b border-slate-200 pb-2 scroll-mt-24">{children}</h2>
)

const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-bold text-slate-700 mb-2 mt-8 scroll-mt-24">{children}</h3>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-700 leading-relaxed mb-4">{children}</p>
)

const BC = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
)

const tocEntries = [
  { id: 'intro', label: 'Introduction' },
  { id: 'architecture', label: 'System Architecture' },
  { id: 'ch1', label: 'Ch.1 — Three Stages of Learning' },
  { id: 'ch2', label: 'Ch.2 — Three Causes of Error' },
  { id: 'ch3', label: 'Ch.3 — Keyboard Visualization' },
  { id: 'ch4', label: 'Ch.4 — Longy Rhythms' },
  { id: 'ch5', label: 'Ch.5 — Lap Map' },
  { id: 'ch6', label: 'Ch.6 — Pythagorean Ordering' },
  { id: 'ch7', label: 'Ch.7 — Interval Spelling (Keyboard)' },
  { id: 'ch8', label: 'Ch.8 — Interval Spelling (Staff)' },
  { id: 'ch9', label: 'Ch.9 — Di-Chord Numbers' },
  { id: 'ch10', label: 'Ch.10 — Sonic Properties Overview' },
  { id: 'ch11', label: 'Ch.11 — Interference Pulsation' },
  { id: 'ch12-14', label: 'Ch.12–14 — F/O Factor, Harmonicity & Review' },
  { id: 'ch15', label: 'Ch.15 — Di-Chords in Melodic Contexts' },
  { id: 'ch16', label: 'Ch.16 — The Tracking Page' },
  { id: 'ch17', label: 'Ch.17 — Tri-Chord Formation' },
  { id: 'ch18', label: 'Ch.18 — Tetrachord Formation' },
  { id: 'ch19', label: 'Ch.19 — Diatonic Modes' },
  { id: 'ch20', label: 'Ch.20 — Heptachord Formation' },
  { id: 'ch21', label: 'Ch.21 — Triads & Inversions' },
  { id: 'ch22', label: 'Ch.22 — Four Functional 7th Chords' },
  { id: 'ch23', label: 'Ch.23 — Scale Degree Harmonization' },
  { id: 'ch24', label: 'Ch.24 — Heptachord Shift' },
  { id: 'ch25', label: 'Ch.25 — Transposition' },
  { id: 'app-b', label: 'Appendix B — Overtone Series' },
  { id: 'app-c', label: 'Appendix C — House Plan' },
  { id: 'exercises', label: 'Essential Exercises' },
  { id: 'melody', label: 'Melody Chamber' },
  { id: 'harmony', label: 'Harmony Chamber' },
  { id: 'voicings', label: 'Voicings Chamber' },
  { id: 'rhythm', label: 'Rhythm Chamber' },
  { id: 'synthesizer', label: 'The Synthesizer' },
  { id: 'sprint-map', label: '12-Sprint Map' },
  { id: 'guitar', label: 'Guitar Technique' },
  { id: 'piano', label: 'Piano Technique' },
  { id: 'repertoire', label: 'Repertoire' },
]

function PloggerContent() {
  return (
    <div className="prose-custom">

      {/* ── INTRODUCTION ── */}
      <H2 id="intro">Introduction</H2>
      <P>
        The <strong>Plogger Method</strong> is the foundational pedagogical system developed by{' '}
        <strong>Marianne Ploger</strong> at the <strong>Blair School of Music, Vanderbilt University</strong>.
        It is the Musical Operating System of the Adaptable Musician&apos;s Framework (AMF) — the layer on which
        all chamber work (Melody, Harmony, Voicings, Rhythm) and synthesizer work rest. The method&apos;s lineage
        descends directly from <strong>Nadia Boulanger</strong> through Ploger, and the textbook carries a
        foreword by <strong>Charles Rochester Young</strong>.
      </P>
      <P>
        This reference synthesizes the complete three-book system — Textbook, Practice Manual, and Workbook —
        into a single navigable document for AMF practitioners.
      </P>

      <H3>Six Core Philosophical Premises</H3>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">1. &ldquo;Ear training is a false notion.&rdquo;</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Train the mind, not the ear. The ear is a latent genie — always present, always receiving.
            The bottleneck is <em>conscious direction</em>. The work is mental, not auditory.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">2. Critical thought speed.</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Music must be spoken — internally and externally — at the speed a listener&apos;s mind can follow.
            Fluency is measured in real-time processing, not accuracy at slow speed.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">3. 92% absolute fluency standard.</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            J.S. Bach operated at approximately 99%. At 92% fluency, multiple musical parts can be tracked
            simultaneously. Below this threshold, one part consumes all available attention.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">4. Build from the smallest elements.</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            12 pitch classes → di-chords (2-note relationships) → tri-chords → tetrachords → heptachords.
            Every complex structure is assembled from mastered atomic units.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">5. &ldquo;There is little theory here.&rdquo;</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            The Plogger Method presents <em>facts about the environment of musical pitch and rhythm</em> —
            not music theory as conventionally taught. Acoustic and perceptual reality, not convention.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
          <p className="font-semibold text-blue-900 mb-1">6. You are only as good as your weakest link.</p>
          <p className="text-slate-700 text-sm leading-relaxed">
            Knowledge applied in real time is the challenge — not knowing facts in isolation.
            Every skill must be available at performance speed, under performance conditions.
          </p>
        </div>
      </div>

      {/* ── SYSTEM ARCHITECTURE ── */}
      <H2 id="architecture">System Architecture</H2>
      <P>
        The <strong>Adaptable Musician&apos;s Framework (AMF)</strong> is the overall system name. Its layers:
      </P>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Layer</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">OS</td>
              <td className="border border-slate-300 px-3 py-2">Musical OS</td>
              <td className="border border-slate-300 px-3 py-2">Plogger Method — foundational layer</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">Chamber 1</td>
              <td className="border border-slate-300 px-3 py-2">Melody Chamber</td>
              <td className="border border-slate-300 px-3 py-2">Melodic fluency, tracking, sight-reading</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">Chamber 2</td>
              <td className="border border-slate-300 px-3 py-2">Harmony Chamber</td>
              <td className="border border-slate-300 px-3 py-2">Harmonic language, chord function, progressions</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">Chamber 3</td>
              <td className="border border-slate-300 px-3 py-2">Voicings Chamber</td>
              <td className="border border-slate-300 px-3 py-2">Chord voicing, voice leading, realization</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">Chamber 4</td>
              <td className="border border-slate-300 px-3 py-2">Rhythm Chamber</td>
              <td className="border border-slate-300 px-3 py-2">Groove, feel, rhythmic fluency</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">Apex</td>
              <td className="border border-slate-300 px-3 py-2">The Synthesizer</td>
              <td className="border border-slate-300 px-3 py-2">Convergence — all chambers integrated in real music</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
        <p className="text-amber-900 font-semibold text-sm">Note: Pitch Class Set Theory</p>
        <p className="text-amber-800 text-sm mt-1">
          Pitch class set theory has been <strong>removed entirely</strong> from the AMF system.
          It is not referenced in any chamber or in the Plogger OS layer.
        </p>
      </div>

      <H3>Three Books</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1">
        <li><strong>Textbook</strong> — Core concepts, explanations, and chapter content</li>
        <li><strong>Practice Manual</strong> — Structured daily exercises and protocols</li>
        <li><strong>Workbook</strong> — Written exercises and ear training drills</li>
      </ul>

      <H3>Four Practice Sections (Daily Session Structure)</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Section</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Section 1</td>
              <td className="border border-slate-300 px-3 py-2">Plogger</td>
              <td className="border border-slate-300 px-3 py-2">~12 min</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Section 2</td>
              <td className="border border-slate-300 px-3 py-2">Integrated Work</td>
              <td className="border border-slate-300 px-3 py-2">~20 min</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Section 3</td>
              <td className="border border-slate-300 px-3 py-2">Song Learning</td>
              <td className="border border-slate-300 px-3 py-2">~15 min</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Section 4</td>
              <td className="border border-slate-300 px-3 py-2">Jamming</td>
              <td className="border border-slate-300 px-3 py-2">~13 min</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Core Pedagogical Principles</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
        <li><strong>Hear/Sing Before You Play</strong> — Audiation precedes physical execution at every stage</li>
        <li><strong>Few exercises, multi-layered</strong> — Deep fluency in a small set beats shallow exposure to many</li>
        <li><strong>Plogger as dual presence</strong> — The method functions as both content and the lens through which all content is perceived</li>
        <li><strong>Three Stages labeling</strong> — Every practice activity is explicitly tagged as Stage 1, 2, or 3</li>
        <li><strong>Anchor song thread</strong> — A single song is learned across all chambers simultaneously</li>
        <li><strong>Genre-agnostic</strong> — The system applies equally to classical, jazz, folk, pop, and all other genres</li>
      </ul>

      {/* ── CH.1 ── */}
      <H2 id="ch1">Ch.1 — Three Stages of Learning</H2>
      <P>
        All skill acquisition proceeds through three distinct stages. Conflating them — performing Stage 2
        behavior during Stage 3, or skipping Stage 2 entirely — is the single most common cause of
        permanent plateaus.
      </P>

      <H3>Stage 1 — Roughing In</H3>
      <P>
        First contact with new material. Errors are normal and expected — do not stop to correct them.
        The sculptor analogy: you are roughing out the shape in stone. Stopping at every chip to polish
        destroys the work before it has a form.
      </P>
      <div className="bg-red-50 border-l-4 border-red-400 pl-4 py-3 rounded-r mb-4">
        <p className="font-semibold text-red-900 text-sm">Failure modes</p>
        <ul className="list-disc pl-5 text-sm text-red-800 mt-1 space-y-1">
          <li>Stopping at every error to correct it (this is Stage 2 behavior)</li>
          <li>Trying to play slowly and perfectly on first contact</li>
        </ul>
      </div>

      <H3>Stage 2 — Perfecting</H3>
      <P>
        Slow, deliberate, systematic removal of errors. This is where the actual sculpting of accuracy
        happens — one phrase, one measure, one beat at a time. Stage 2 requires patience and a willingness
        to be genuinely slow.
      </P>
      <div className="bg-red-50 border-l-4 border-red-400 pl-4 py-3 rounded-r mb-4">
        <p className="font-semibold text-red-900 text-sm">Failure modes</p>
        <ul className="list-disc pl-5 text-sm text-red-800 mt-1 space-y-1">
          <li>Never leaving Stage 2 — perfecting indefinitely without pushing to automaticity</li>
          <li>Stage 2 behavior during Stage 3 (slowing down, stopping, self-correcting mid-performance)</li>
        </ul>
      </div>

      <H3>Stage 3 — Achieving Fluency</H3>
      <P>
        The skill is automatic, performed at performance speed, without conscious attention to individual
        components. Fluency is not speed — it is the <em>absence of conscious effort</em> at performance
        speed. This is the target state for every Plogger exercise.
      </P>
      <div className="bg-red-50 border-l-4 border-red-400 pl-4 py-3 rounded-r mb-4">
        <p className="font-semibold text-red-900 text-sm">Failure mode</p>
        <p className="text-sm text-red-800 mt-1">Never pushing to automaticity — living permanently in Stage 2.</p>
      </div>

      <H3>Four Learning Principles</H3>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
        <li>Always know which stage you are in</li>
        <li>Never mix stage behaviors</li>
        <li>Set an achievable goal and perform it the first time without any errors (Stage 3)</li>
        <li>Measure progress by fluency, not by accuracy at slow speed</li>
      </ol>

      <H3>CRITICAL: Breaking Down at the Top of the Perfecting Phase</H3>
      <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mb-6">
        <P>
          A sudden <em>worse</em> performance after extended Stage 2 work is <strong>not failure</strong>.
          It is the neurological signal that automaticity is imminent. The skill is transitioning from
          conscious to unconscious processing — and during that handoff, conscious control briefly loses
          its grip before the automatic system takes over.
        </P>
        <P>
          <strong>Bike analogy:</strong> The moment before you stop consciously balancing and the bike
          starts balancing itself — you wobble. That wobble is the transition, not a regression.
          &ldquo;Let the bike take you.&rdquo; Do not grab back for conscious control. Push through.
        </P>
      </div>

      {/* ── CH.2 ── */}
      <H2 id="ch2">Ch.2 — Three Causes of Error</H2>
      <P>
        Every performance error has a specific Symptom, Cause, and Cure. The framework applies equally
        in practice and in performance. Diagnosing correctly is prerequisite to curing.
      </P>

      <H3>Error 1 — Reaction</H3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-24">Symptom</td>
              <td className="border border-slate-300 px-3 py-2">Freeze, zoom-in (tunnel vision), memory slip, sudden lock-up mid-performance</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cause</td>
              <td className="border border-slate-300 px-3 py-2">Limbic fight-or-flight response. The body perceives threat (real or imagined) and hijacks cognitive resources.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cure</td>
              <td className="border border-slate-300 px-3 py-2">
                <strong>Eagle Vision</strong> — Rise far above the situation. See everything from a high altitude: all parameters, all musical threads, all relationships. &ldquo;Know your domain, accept with equanimity, expect the unexpected with joy and delight.&rdquo; Eagle Vision is a trained perceptual posture, not a metaphor — it must be practiced.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Error 2 — Anticipation</H3>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-24">Symptom</td>
              <td className="border border-slate-300 px-3 py-2">Playing wrong without noticing. The mind is elsewhere while the body continues on autopilot.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Subtypes</td>
              <td className="border border-slate-300 px-3 py-2">
                <strong>Malevolent anticipation:</strong> paranoia or arrogance about what is coming next — the mind leaps ahead in fear or confidence and disengages from the present.<br />
                <strong>Benevolent anticipation:</strong> pleasant daydreaming, drifting into reverie, losing track of the music while the body plays on.
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cause</td>
              <td className="border border-slate-300 px-3 py-2">The mind disengages from external sensory modalities and substitutes internal narrative.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cure</td>
              <td className="border border-slate-300 px-3 py-2"><strong>&ldquo;Lead with the sensory modality appropriate to the task.&rdquo;</strong> In ear training: lead with your ears. In sight-reading: lead with your eyes. In keyboard playing: lead with tactile/kinesthetic sensation. Always the <em>external</em> modality, not the internal narrative.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Error 3 — Looking Back</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-24">Symptom</td>
              <td className="border border-slate-300 px-3 py-2">Looking backward with inner critical commentary. &ldquo;That was wrong. Why did I do that? I always mess up here.&rdquo; Performance deteriorates as attention is split between present and past.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Analogy</td>
              <td className="border border-slate-300 px-3 py-2"><strong>Swimmer/Coach:</strong> You are simultaneously the swimmer in the water AND the coach on the deck. The swimmer performs; the coach observes and evaluates. During performance, you are BOTH — but the coach must be silent while swimming. You cannot coach yourself mid-stroke.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cause</td>
              <td className="border border-slate-300 px-3 py-2">Judging during performance rather than after. The coach climbs into the pool.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cure (3 steps)</td>
              <td className="border border-slate-300 px-3 py-2">
                <ol className="list-decimal pl-4 space-y-1">
                  <li><strong>Before:</strong> Prepare fully. Know exactly what you intend.</li>
                  <li><strong>During:</strong> &ldquo;Coach out!&rdquo; — Imagine the coach being sucked backward out of the pool and vanishing behind you. Swimmer only.</li>
                  <li><strong>After:</strong> Coach returns. Reflect, review, diagnose, prescribe.</li>
                </ol>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── CH.3 ── */}
      <H2 id="ch3">Ch.3 — Keyboard Visualization</H2>
      <P>
        <strong>&ldquo;The thinking tool of the musician.&rdquo;</strong> The keyboard is not merely an instrument — it is
        a spatial map of pitch relationships. 12 equally spaced semitones, the same 12-note pattern
        repeated 7.5 times across 88 keys. White keys form the diatonic collection; black keys form
        the pentatonic collection.
      </P>

      <H3>Tracking — The Most Crucial Skill</H3>
      <P>
        The most crucial skill in all of music is accurately comprehending the distances between pitches —
        while they are happening in real time. The keyboard and staff serve as <strong>maps</strong>.
        &ldquo;The challenge for musicians is for our conscious minds to keep up with our ears.&rdquo;
      </P>

      <H3>Note Naming — Bilingual System</H3>
      <P>
        Every pitch has two names: a <strong>letter name</strong> and a <strong>fixed solfège name</strong>.
        Both must be equally fluent. Fixed-do solfège:
      </P>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Letter</th>
              <th className="border border-slate-300 px-3 py-2">C</th>
              <th className="border border-slate-300 px-3 py-2">D</th>
              <th className="border border-slate-300 px-3 py-2">E</th>
              <th className="border border-slate-300 px-3 py-2">F</th>
              <th className="border border-slate-300 px-3 py-2">G</th>
              <th className="border border-slate-300 px-3 py-2">A</th>
              <th className="border border-slate-300 px-3 py-2">B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Solfège</td>
              <td className="border border-slate-300 px-3 py-2">doh</td>
              <td className="border border-slate-300 px-3 py-2">re</td>
              <td className="border border-slate-300 px-3 py-2">mi</td>
              <td className="border border-slate-300 px-3 py-2">fa</td>
              <td className="border border-slate-300 px-3 py-2">sol</td>
              <td className="border border-slate-300 px-3 py-2">la</td>
              <td className="border border-slate-300 px-3 py-2">si</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Black-Key Landmark Method</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2 text-sm">
        <li><strong>Two black keys:</strong> doh (C) is to the left, re (D) is between them, mi (E) is to the right</li>
        <li><strong>Three black keys:</strong> fa (F) is to the left, sol and la fill the middle gaps, si (B) is to the right</li>
        <li><strong>Enharmonic pairs:</strong> <BC>mi# = fa</BC>, <BC>si# = doh</BC>, <BC>fab = mi</BC>, <BC>dohb = si</BC></li>
      </ul>

      <H3>Pythagorean Note Frequency</H3>
      <P>
        Natural notes (no accidental) occur in the following order from most to least common in tonal music:
        <strong> fa — doh — sol — re — la — mi — si</strong> (F C G D A E B).
        This ordering is the Pythagorean sequence of descending perfect fifths and becomes central in Ch.6.
      </P>

      <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-6">
        <p className="font-semibold text-slate-800 text-sm mb-1">Disorientation is expected.</p>
        <p className="text-slate-700 text-sm">
          When first visualizing the keyboard mentally, confusion and spatial uncertainty are normal.
          You are activating and wiring neural regions that have never been deliberately used in this way.
          This is not a sign of poor aptitude — it is the experience of neurological construction.
        </p>
      </div>

      <H3>Physical Drawing Exercise</H3>
      <P>
        Draw the keyboard at accurate proportions: <BC>¾&quot; / 22mm</BC> per white key,{' '}
        <BC>3¾&quot; / 90mm</BC> tall, <BC>2&quot; / 50mm</BC> black keys. The act of drawing to scale
        builds spatial accuracy in the mental map.
      </P>

      <H3>Exercises (3-1 through 3-11)</H3>
      <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>3-1 Note names — name every key on a printed keyboard</li>
        <li>3-2 Drawing — draw keyboard at scale from memory</li>
        <li>3-3 Exploring — play and name every key on a physical keyboard</li>
        <li>3-4 Eyes-closed — identify notes by touch on physical keyboard</li>
        <li>3-5 Tracking — teacher or partner plays; student names in real time</li>
        <li>3-6 Solfège flashcards — letter name → solfège and reverse</li>
        <li>3-7 Mapping — map solfège and letters onto drawn keyboard</li>
        <li>3-8 Letter names — spell all 12 chromatic notes in both naming systems</li>
        <li>3-9/3-10 Quizzes — timed identification drills</li>
        <li>3-11 Imagined keyboard — visualize keyboard with eyes closed and navigate it mentally</li>
      </ol>

      <div className="bg-green-50 border-l-4 border-green-500 pl-4 py-3 rounded-r mb-6">
        <p className="font-semibold text-green-900 text-sm">Goal state</p>
        <p className="text-green-800 text-sm mt-1">
          Name any pitch instantly (&lt;1 second) in solfège and letter name. Navigate a physical or
          imagined keyboard with eyes closed. This is a <strong>permanent installation tool</strong> —
          active throughout all subsequent chapters.
        </p>
      </div>

      {/* ── CH.4 ── */}
      <H2 id="ch4">Ch.4 — Longy Rhythms</H2>
      <P>
        A syllabic rhythm encoding system developed by <strong>Emile-Joseph Longy</strong> (French
        clarinetist, 1860–1915). Each rhythmic subdivision is assigned a spoken syllable that maps
        directly to the felt rhythmic position. The system makes rhythm <em>speakable</em> and therefore
        auditable in real time.
      </P>

      <H3>Syllable Table</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left">Note Value</th>
              <th className="border border-slate-300 px-3 py-2 text-left">Syllable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Quarter note</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">ta</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Two eighth notes</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">ta-te</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Four sixteenth notes</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">ta-fe-te-fe</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Compound (triplet)</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">ta-ki-da</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Chart Structure</H3>
      <P>
        The Longy chart uses 2ⁿ permutations for each n-beat division:
        2-beat = 4 rows, 3-beat = 8 rows, 4-beat = 16 rows, 5-beat = 32 rows, 6-beat = 64 rows.
        Each row represents one unique permutation of subdivisions within that beat count.
      </P>

      <H3>How to Read the Chart</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2 text-sm">
        <li>Speak the syllable on every subdivision that falls on a note</li>
        <li><strong>THINK (not speak) dots</strong> — dotted notes and rests are internalized, not spoken</li>
        <li>Progress through ALL lines without stopping or pausing between them — the pulse never stops</li>
        <li><strong>Whisper technique:</strong> when tempted to speak a syllable prematurely over a dot, whisper the number instead of speaking it — this breaks the habit without stopping flow</li>
      </ul>

      <H3>Integration with Ch.5</H3>
      <P>
        Ch.4 (Longy) + Ch.5 (Lap Map) = the complete rhythm system. Longy answers &ldquo;what rhythm is this?&rdquo;
        The Lap Map / Rhythm Code answers &ldquo;does it groove?&rdquo; Both must be used together.
      </P>

      {/* ── CH.5 ── */}
      <H2 id="ch5">Ch.5 — Lap Map</H2>
      <P>
        <strong>Primary purpose: rhythm internalization and groove.</strong> The Lap Map is first a
        kinesthetic tool. Keyboard connection and pitch tracking are secondary applications.
        Derived from Robert Starer&apos;s <em>Rhythmic Training</em> (1969), expanded by Ploger.
      </P>

      <H3>Physical Structure</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2 text-sm">
        <li><strong>Left leg = ALL strong beats</strong></li>
        <li><strong>Right leg = ALL weak beats</strong></li>
        <li>Darkness gradient toward the hip = stronger beats within that category</li>
      </ul>

      <H3>Three-Element Integration</H3>
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <p className="text-blue-900 font-semibold text-sm mb-2">All three elements simultaneously — never sequentially:</p>
        <ol className="list-decimal pl-5 text-sm text-blue-800 space-y-1">
          <li><strong>Auditory</strong> — Speaking the beat numbers aloud</li>
          <li><strong>Kinesthetic</strong> — Tapping the lap pattern physically</li>
          <li><strong>Visual</strong> — Imagining ALL beat numbers simultaneously as a map in the mind</li>
        </ol>
        <p className="text-blue-800 text-sm mt-3 italic">
          &ldquo;You must develop a strong imagination of the lap patterns.&rdquo;
        </p>
      </div>

      <H3>Tempo Requirement</H3>
      <P>
        Minimum <BC>q = 120 BPM</BC>. Practicing below this speed actively inhibits groove development.
        The kinesthetic experience of groove requires sufficient tempo for the physical swing/momentum
        to be felt in the body.
      </P>

      <H3>Beat Patterns (Exercises 5-1 through 5-11)</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Exercise</th>
              <th className="border border-slate-300 px-3 py-2">Pattern</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['5-1', '2-beat'],
              ['5-2', '3-beat'],
              ['5-3', '4-beat'],
              ['5-4', '5-beat (2+3)'],
              ['5-5', '5-beat (3+2)'],
              ['5-6', '6-beat (3+3)'],
              ['5-7', '6-beat (2+2+2)'],
              ['5-8', '7-beat (3+2+2)'],
              ['5-9', '7-beat (2+2+3)'],
              ['5-10', '7-beat (2+3+2)'],
              ['5-11', 'Mixed meter review'],
            ].map(([ex, pat], i) => (
              <tr key={ex} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2 font-mono">{ex}</td>
                <td className="border border-slate-300 px-3 py-2">{pat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Three-Step Exercise Sequence</H3>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2 text-sm">
        <li><strong>Establish groove</strong> — tap the lap map at tempo until the body has internalized the beat grouping</li>
        <li><strong>Improvise counted rhythms</strong> — freely invent rhythms using Longy syllables while maintaining the lap map</li>
        <li><strong>Perform Longy with lap map</strong> — read printed Longy exercises while tapping the appropriate lap pattern simultaneously</li>
      </ol>

      <div className="bg-green-50 border-l-4 border-green-500 pl-4 py-3 rounded-r mb-6">
        <p className="text-green-900 text-sm">
          The Lap Map is a <strong>permanent practice tool</strong>, not a beginner exercise.
          It is active in every practice session at every level of advancement.
          Error-free small goals: &ldquo;Set an achievable goal and perform it the first time without any errors.&rdquo;
        </p>
      </div>

      {/* ── CH.6 ── */}
      <H2 id="ch6">Ch.6 — Pythagorean Ordering</H2>
      <P>
        The seven natural notes ordered by ascending perfect fifths:
        <strong> F — C — G — D — A — E — B</strong>.
        Left = flattest, Right = sharpest. Adjacent notes share 6 of 7 diatonic scale notes,
        differing by exactly one pitch (one &ldquo;slot&rdquo; on the circle of fifths).
      </P>

      <H3>Mode Ordering by Brightness</H3>
      <P>
        The same left-to-right sequence governs modal brightness — each step right adds one sharp
        (or removes one flat), making the mode one degree brighter:
      </P>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Position</th>
              <th className="border border-slate-300 px-3 py-2">Mode</th>
              <th className="border border-slate-300 px-3 py-2">Character</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1 (flattest)', 'Lydian', 'Brightest'],
              ['2', 'Ionian (Major)', 'Bright'],
              ['3', 'Mixolydian', 'Slightly darker'],
              ['4', 'Dorian', 'Neutral–dark'],
              ['5', 'Aeolian (Natural Minor)', 'Dark'],
              ['6', 'Phrygian', 'Very dark'],
              ['7 (sharpest)', 'Locrian', 'Darkest'],
            ].map(([pos, mode, char], i) => (
              <tr key={mode} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">{pos}</td>
                <td className="border border-slate-300 px-3 py-2 font-semibold">{mode}</td>
                <td className="border border-slate-300 px-3 py-2">{char}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Exercises</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>6-1</strong> Ascending Part I — name ALL notes in Pythagorean order ascending</li>
        <li><strong>6-2</strong> Part II — play continuously in 16th notes, speaking solfège AND letters simultaneously</li>
        <li><strong>6-3</strong> Part III — speak only on accented beats while playing continuously</li>
        <li><strong>6-4</strong> Memorizing — recite the ordering over AT LEAST THREE DAYS in spare moments</li>
        <li><strong>6-5</strong> Descending — same as 6-1 through 6-3 in reverse order (B–E–A–D–G–C–F)</li>
      </ul>

      <div className="bg-green-50 border-l-4 border-green-500 pl-4 py-3 rounded-r mb-6">
        <p className="text-green-800 text-sm">
          <strong>Installation habit:</strong> Recite the Pythagorean ordering daily in spare moments —
          both ascending and descending, both letter names and solfège — indefinitely. This ordering
          must become as automatic as the alphabet.
        </p>
      </div>

      {/* ── CH.7 ── */}
      <H2 id="ch7">Ch.7 — Interval Spelling (Keyboard)</H2>
      <P>
        Ordinal interval names describe the diatonic distance between two pitches.
        Adjacent diatonic notes = 2nd. One note skipped = 3rd. Two notes skipped = 4th, and so on.
      </P>

      <H3>Keyboard Calculation Method</H3>
      <P>
        Count from the bottom note (= 1) upward on <strong>white keys only</strong> to the top note.
        The final count is the interval name.
      </P>
      <div className="bg-slate-50 rounded p-4 mb-4 font-mono text-sm">
        <p>re → fa: re(1) mi(2) fa(3) = <strong>3rd</strong></p>
        <p>re → sol: re(1) mi(2) fa(3) sol(4) = <strong>4th</strong></p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 pl-4 py-3 rounded-r mb-6">
        <p className="text-amber-900 text-sm font-semibold">Critical context</p>
        <p className="text-amber-800 text-sm mt-1">
          Ordinal interval names (2nd, 3rd, 4th…) form the diatonic vocabulary that bridges to
          di-chord numbers [1]–[11]. Ordinal names will be superseded by cardinal di-chord numbers
          as the primary tracking vocabulary. Both systems must be fluent.
        </p>
      </div>

      <H3>Exercises</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>7-1</strong> Locating and Naming Diatonic Intervals — given pairs of notes, name the interval</li>
        <li><strong>7-2</strong> Identifying — 30 given note pairs to identify by ordinal name</li>
      </ul>

      {/* ── CH.8 ── */}
      <H2 id="ch8">Ch.8 — Interval Spelling (Staff)</H2>
      <P>
        The musical staff was designed for the human voice. Without a clef, the five-line staff
        encompasses a range of a 9th; one ledger line above extends it to a 10th — the comfortable
        singing range for most voice types.
      </P>

      <H3>Three Clef Types</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>C-Clef</strong> — designates C4 (middle C)</li>
        <li><strong>F-Clef</strong> — designates F3</li>
        <li><strong>G-Clef</strong> — designates G4</li>
      </ul>

      <H3>All 8 Clefs</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Clef Name</th>
              <th className="border border-slate-300 px-3 py-2">Type</th>
              <th className="border border-slate-300 px-3 py-2">Position</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Soprano', 'C', 'Bottom line'],
              ['Mezzo-Soprano', 'C', 'Next-to-bottom line'],
              ['Alto', 'C', 'Middle line'],
              ['Tenor', 'C', 'Next-to-top line'],
              ['Baritone-C', 'C', 'Top line'],
              ['Bass', 'F', '1st ledger line above staff'],
              ['Baritone-F', 'F', 'Top line'],
              ['Treble', 'G', '1st ledger line below staff'],
            ].map(([name, type, pos], i) => (
              <tr key={name} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2 font-semibold">{name}</td>
                <td className="border border-slate-300 px-3 py-2">{type}</td>
                <td className="border border-slate-300 px-3 py-2">{pos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-3 rounded-r mb-4">
        <p className="text-blue-900 text-sm font-semibold">Rule: Clef position vs. vocal range</p>
        <p className="text-blue-800 text-sm mt-1">
          Clef sign placed <strong>higher</strong> on the staff → vocal range is <strong>lower</strong>.
          The clef designates where the reference pitch falls, pulling the entire usable range in the opposite direction.
        </p>
      </div>

      <H3>Odd/Even Shortcut</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>Both notes on lines OR both on spaces = <strong>ODD interval</strong> (3rd, 5th, 7th, unison)</li>
        <li>One note on a line + one note on a space = <strong>EVEN interval</strong> (2nd, 4th, 6th, octave)</li>
      </ul>

      <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mb-6">
        <p className="text-yellow-900 font-semibold text-sm">CRITICAL: Di-chord tracking is the primary reading mode</p>
        <p className="text-yellow-800 text-sm mt-1">
          &ldquo;Once you know your starting note, always read by tracking di-chords.&rdquo; Interval names are a bridge;
          di-chord numbers are the destination. Melodies starting on different scale degrees create the
          experience of different modes before those modes are formally named.
        </p>
      </div>

      <H3>Exercises (8-1 through 8-6)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>8-1</strong> Drawing clefs — draw all 8 clefs from memory</li>
        <li><strong>8-2</strong> Finding clef from pitch — given a note and its name, which clef places it correctly?</li>
        <li><strong>8-3</strong> Finding mode — given a melodic excerpt, identify what mode it implies</li>
        <li><strong>8-4</strong> Treble clef relationships — map all note names in treble clef</li>
        <li><strong>8-5</strong> Identifying intervals — name intervals in given musical examples</li>
        <li><strong>8-6</strong> Writing intervals — write a given interval above or below a given note</li>
      </ul>

      {/* ── CH.9 ── */}
      <H2 id="ch9">Ch.9 — Di-Chord Numbers</H2>
      <P>
        The di-chord number is the count of semitones between two pitch classes, measured from zero.
        Written with brackets: <BC>[1]</BC>, <BC>[2]</BC>, <BC>[3]</BC>… through <BC>[11]</BC>.
        This is the central measurement unit of the entire Plogger system.
      </P>

      <H3>Cardinal vs. Ordinal Distinction</H3>
      <P>
        <strong>Ordinal numbers</strong> (2nd, 3rd, 4th) describe rank or position in a sequence.
        <strong> Cardinal numbers</strong> describe actual quantity — like an odometer reading semitones.
        The same diatonic ordinal name can correspond to multiple di-chord numbers:
      </P>
      <div className="bg-slate-50 rounded p-4 mb-6 font-mono text-sm space-y-1">
        <p>fa → la = 3rd ordinal AND [4] cardinal (4 semitones)</p>
        <p>mi → sol = 3rd ordinal BUT [3] cardinal (3 semitones)</p>
        <p className="text-red-700 font-semibold mt-2">Same diatonic interval ≠ same di-chord</p>
      </div>

      <H3>Staff Hides Di-Chord Identity</H3>
      <P>
        The same staff position can represent entirely different di-chords depending on the clef.
        Staff notation encodes ordinal (diatonic) distance, not cardinal (semitone) distance.
        This is why di-chord numbers must be calculated, not read directly from staff position.
      </P>

      <H3>Inversion Law</H3>
      <P>
        Any di-chord plus its inversion equals 12. To find the inversion of any di-chord, subtract from 12:
      </P>
      <div className="bg-slate-50 rounded p-4 mb-6 font-mono text-sm space-y-1">
        <p>[3] + [9] = 12 &nbsp;&nbsp; (minor 3rd inverts to major 6th)</p>
        <p>[5] + [7] = 12 &nbsp;&nbsp; (perfect 4th inverts to perfect 5th)</p>
        <p>[1] + [11] = 12 &nbsp; (minor 2nd inverts to major 7th)</p>
        <p>[6] + [6] = 12 &nbsp;&nbsp; (tritone inverts to itself)</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-3 rounded-r mb-6">
        <p className="text-blue-800 text-sm italic">
          &ldquo;Knowing the di-chord you are about to play tells you a lot about the meaning of a given moment
          in music.&rdquo; — Marianne Ploger
        </p>
      </div>

      <H3>Exercises</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>9-1</strong> Calculating Part I — calculate di-chord numbers for 5 given pitch pairs</li>
        <li><strong>9-2</strong> Calculating Part II — 5 pairs + their inversions; discover that every sum = 12</li>
      </ul>

      {/* ── CH.10 ── */}
      <H2 id="ch10">Ch.10 — Sonic Properties Overview</H2>
      <P>
        Each di-chord is <em>multidimensional</em> and often seemingly paradoxical. Context dramatically
        affects perception. To hear a di-chord accurately requires simultaneously tracking three
        independent acoustic properties.
      </P>

      <H3>The Three Sound Factors</H3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">1. Interference Pulsation</p>
          <p className="text-slate-600 text-sm">The rhythmic beating rate created by two simultaneous pitches. Dissonant/Modal/Perfect.</p>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">2. Fundamental/Octave (F/O) Factor</p>
          <p className="text-slate-600 text-sm">Which pitch functions as the acoustic &ldquo;root&rdquo; — the note whose overtone series contains the other note.</p>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">3. Harmonicity</p>
          <p className="text-slate-600 text-sm">Whether the upper note appears in the overtone series of the lower note (harmonic) or not (non-harmonic).</p>
        </div>
      </div>

      <H3>The Di-Chord Pictograph</H3>
      <P>
        A visual encoding tool for all 11 di-chords. Each pictograph encodes all three sound factors
        simultaneously in a single stylized image:
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>Shape/outline</strong> (jagged / rounded / straight) = Pulsation category</li>
        <li><strong>Shadow direction</strong> (left / right / both) = F/O Factor direction</li>
        <li><strong>Color</strong> (dark / light) = Harmonicity (non-harmonic / harmonic)</li>
      </ul>

      <div className="my-8"><DiChordPictograph /></div>

      <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
        <p className="text-amber-900 text-sm">
          <strong>&ldquo;Ignoring one factor allows the ear to confuse it with another.&rdquo;</strong> All three factors
          must be held simultaneously in conscious awareness when listening to or singing any di-chord.
        </p>
      </div>

      {/* ── CH.11 ── */}
      <H2 id="ch11">Ch.11 — Interference Pulsation</H2>
      <P>
        When two pitches sound simultaneously, their sound waves interfere and create rhythmic beating
        at a specific rate. This pulsation is an objective acoustic phenomenon — not a metaphor.
        It organizes all 11 di-chords into three perceptual categories.
      </P>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="font-semibold text-red-800 text-sm mb-1">DISSONANT — 8 Hz (fast, urgent)</p>
          <p className="text-red-700 text-sm">Di-chords: [1], [2], [10], [11]</p>
          <p className="text-red-600 text-xs mt-1">Traditional: 2nds and 7ths</p>
          <p className="text-red-600 text-xs">Pictograph: jagged outline</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded p-4">
          <p className="font-semibold text-purple-800 text-sm mb-1">MODAL — 4 Hz (smooth, &ldquo;wobbly&rdquo;)</p>
          <p className="text-purple-700 text-sm">Di-chords: [3], [4], [8], [9]</p>
          <p className="text-purple-600 text-xs mt-1">Traditional: 3rds and 6ths</p>
          <p className="text-purple-600 text-xs">Pictograph: smooth / wavy outline</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="font-semibold text-green-800 text-sm mb-1">PERFECT — 2 Hz (flat, stolid)</p>
          <p className="text-green-700 text-sm">Di-chords: [5], [6], [7]</p>
          <p className="text-green-600 text-xs mt-1">Traditional: 4ths and 5ths</p>
          <p className="text-green-600 text-xs">Pictograph: straight outline</p>
        </div>
      </div>

      <H3>Complete Pulsation Table</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Di-Chord</th>
              <th className="border border-slate-300 px-3 py-2">Semitones</th>
              <th className="border border-slate-300 px-3 py-2">Traditional Name</th>
              <th className="border border-slate-300 px-3 py-2">Pulsation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', '1', 'minor 2nd', 'Dissonant (8 Hz)'],
              ['[2]', '2', 'major 2nd', 'Dissonant (8 Hz)'],
              ['[3]', '3', 'minor 3rd', 'Modal (4 Hz)'],
              ['[4]', '4', 'major 3rd', 'Modal (4 Hz)'],
              ['[5]', '5', 'perfect 4th', 'Perfect (2 Hz)'],
              ['[6]', '6', 'aug 4th / dim 5th', 'Perfect (2 Hz)'],
              ['[7]', '7', 'perfect 5th', 'Perfect (2 Hz)'],
              ['[8]', '8', 'minor 6th', 'Modal (4 Hz)'],
              ['[9]', '9', 'major 6th', 'Modal (4 Hz)'],
              ['[10]', '10', 'minor 7th', 'Dissonant (8 Hz)'],
              ['[11]', '11', 'major 7th', 'Dissonant (8 Hz)'],
            ].map(([dc, st, name, puls], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-3 py-2">{st}</td>
                <td className="border border-slate-300 px-3 py-2">{name}</td>
                <td className="border border-slate-300 px-3 py-2">{puls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded p-4 mb-6">
        <p className="text-slate-700 text-sm font-semibold mb-1">Palindromic pattern</p>
        <p className="text-slate-600 text-sm font-mono">D–D–M–M–P–P–P–M–M–D–D</p>
        <p className="text-slate-600 text-sm mt-1">Symmetric around [6] (the tritone). This symmetry is not a convention — it reflects the acoustic structure of equal temperament.</p>
      </div>

      <H3>Exercise 11-1</H3>
      <P>
        Draw the pictograph. First: write the words &ldquo;Dissonant,&rdquo; &ldquo;Modal,&rdquo; and &ldquo;Perfect&rdquo; in
        jagged, wavy, and straight lettering respectively. Then: draw the pulsation outline shape
        for each of the 11 di-chords from memory.
      </P>

      {/* ── CH.12-14 ── */}
      <H2 id="ch12-14">Ch.12–14 — F/O Factor, Harmonicity &amp; Review</H2>

      <H3>Fundamental/Octave (F/O) Factor</H3>
      <P>
        Every two-note combination has an acoustic &ldquo;root&rdquo; — the note whose overtone series
        contains the other note, causing it to function as the fundamental. Di-chords [1]–[5] refer
        <strong> DOWN</strong> (the lower note is the acoustic root). Di-chord [6] is neutral (both
        directions). Di-chords [7]–[11] refer <strong>UP</strong> (the upper note functions as root,
        pulling the lower note upward toward it).
      </P>

      <div className="bg-slate-50 rounded p-4 mb-4 font-mono text-sm">
        <p>[1]–[5] → refer DOWN &nbsp;&nbsp; (lower note = acoustic root)</p>
        <p>[6] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ neutral (both) &nbsp;(the tritone)</p>
        <p>[7]–[11] → refer UP &nbsp;&nbsp;&nbsp; (upper note = acoustic root)</p>
      </div>

      <H3>Harmonicity</H3>
      <P>
        Whether the upper note appears in the natural overtone series of the lower note:
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>Harmonic:</strong> [2], [4], [7], [9], [10] — upper note IS in overtone series → open, transparent quality</li>
        <li><strong>Non-harmonic:</strong> [1], [3], [5], [8], [11] — upper note is NOT → closed, opaque quality</li>
        <li><strong>Neutral:</strong> [6] — tritone, acoustically ambiguous</li>
      </ul>

      <div className="bg-emerald-50 border-l-4 border-emerald-500 pl-4 py-3 rounded-r mb-6">
        <p className="text-emerald-900 text-sm font-semibold">Green ornament / Red ornament analogy</p>
        <p className="text-emerald-800 text-sm mt-1">
          Imagine a Christmas tree. Green ornaments (harmonic di-chords) blend with the tree — open,
          transparent, consonant with the acoustic context. Red ornaments (non-harmonic) contrast
          sharply — closed, opaque, standing apart from the overtone environment.
        </p>
      </div>

      <H3>Animal Analogy for Identification</H3>
      <P>
        When identifying a di-chord, proceed from general to specific:
      </P>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>Category first</strong> (species class) — Dissonant / Modal / Perfect?</li>
        <li><strong>Direction</strong> (subspecies) — Does it refer up or down?</li>
        <li><strong>Harmonicity</strong> (genus) — Harmonic (open) or non-harmonic (closed)?</li>
      </ol>

      <H3>Major vs. Minor — Acoustic Explanation</H3>
      <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <p className="text-blue-900 text-sm">
          <strong>[4] major 3rd</strong> = harmonic + open + alkaline → <em>major feels expanding</em><br />
          <strong>[3] minor 3rd</strong> = non-harmonic + closed + acidic → <em>minor feels contracting</em>
        </p>
        <p className="text-blue-800 text-sm mt-2 italic">
          &ldquo;This is physics, not convention.&rdquo; The major/minor distinction is grounded in the
          acoustic reality of the overtone series, not in cultural agreement about emotional meaning.
        </p>
      </div>

      <H3>Triad Di-Chord Profiles</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Triad Type</th>
              <th className="border border-slate-300 px-3 py-2">Di-Chord Profile</th>
              <th className="border border-slate-300 px-3 py-2">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Major</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[7/4]</td>
              <td className="border border-slate-300 px-3 py-2">Open, bright — both intervals harmonic or modal-harmonic</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[7/3]</td>
              <td className="border border-slate-300 px-3 py-2">Closed, dark — non-harmonic [3] creates introspection</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[6/3]</td>
              <td className="border border-slate-300 px-3 py-2">Harsh, tart — tritone creates maximum ambiguity</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Augmented</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[8/4]</td>
              <td className="border border-slate-300 px-3 py-2">All-modal, mysterious — neither resolves nor grounds</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Complete Di-Chord Reference Table</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-2">DC</th>
              <th className="border border-slate-300 px-2 py-2">Semitones</th>
              <th className="border border-slate-300 px-2 py-2">Traditional</th>
              <th className="border border-slate-300 px-2 py-2">Pulsation</th>
              <th className="border border-slate-300 px-2 py-2">Harmonicity</th>
              <th className="border border-slate-300 px-2 py-2">F/O Direction</th>
              <th className="border border-slate-300 px-2 py-2">Character</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', '1', 'minor 2nd', 'Dissonant (8Hz)', 'Non-harmonic', 'Refers down', 'Extremely tense, urgent'],
              ['[2]', '2', 'major 2nd', 'Dissonant (8Hz)', 'Harmonic', 'Refers down', 'Tense but open'],
              ['[3]', '3', 'minor 3rd', 'Modal (4Hz)', 'Non-harmonic', 'Refers down', 'Closed, contracting, acidic, poignant'],
              ['[4]', '4', 'major 3rd', 'Modal (4Hz)', 'Harmonic', 'Refers down', 'Open, warm, expanding, alkaline'],
              ['[5]', '5', 'perfect 4th', 'Perfect (2Hz)', 'Non-harmonic', 'Refers down', 'Suspended, hanging, unresolved'],
              ['[6]', '6', 'aug 4th / dim 5th', 'Perfect (2Hz)', 'Neutral', 'Both (neutral)', 'Frozen, ambiguous, static, split'],
              ['[7]', '7', 'perfect 5th', 'Perfect (2Hz)', 'Harmonic', 'Refers up', 'Most open, stable, balanced — home'],
              ['[8]', '8', 'minor 6th', 'Modal (4Hz)', 'Non-harmonic', 'Refers up', 'Closed, dark, inward'],
              ['[9]', '9', 'major 6th', 'Modal (4Hz)', 'False-harmonic*', 'Refers up', 'Warm, open, upward reaching'],
              ['[10]', '10', 'minor 7th', 'Dissonant (8Hz)', 'Harmonic', 'Refers up', 'Tense upward pull — dominant feeling'],
              ['[11]', '11', 'major 7th', 'Dissonant (8Hz)', 'Non-harmonic', 'Refers up', 'Extremely tense, leading-tone pull'],
            ].map(([dc, st, trad, puls, harm, fo, char], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-2 py-1.5 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-2 py-1.5">{st}</td>
                <td className="border border-slate-300 px-2 py-1.5">{trad}</td>
                <td className="border border-slate-300 px-2 py-1.5">{puls}</td>
                <td className="border border-slate-300 px-2 py-1.5">{harm}</td>
                <td className="border border-slate-300 px-2 py-1.5">{fo}</td>
                <td className="border border-slate-300 px-2 py-1.5 italic">{char}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-slate-500 text-xs mb-4">
        * [9] major 6th is &ldquo;false-harmonic&rdquo; — acoustically appears harmonic but behaves non-harmonically in context due to its inversion relationship with [3].
      </p>

      <div className="my-8"><DiChordPictograph /></div>

      <H3>Key Exercises (Ch.12–14)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>12-1</strong> Draw pictograph — jagged/wavy/straight outlines for each di-chord</li>
        <li><strong>12-2</strong> Listening — identify di-chords by ear across all three factors</li>
        <li><strong>13-1</strong> Spelling major triads — across all 12 pitch classes</li>
        <li><strong>13-2</strong> Dominant 7ths — spell and identify by ear</li>
        <li><strong>13-3</strong> Dominant 9ths — spell and identify</li>
        <li><strong>13-4</strong> Major 6th fluency — sing [9] in all contexts</li>
        <li><strong>13-5</strong> Draw pictograph progressively with F/O shadow added</li>
        <li><strong>14-1</strong> Complete di-chord table from memory — all three factors for all 11 di-chords</li>
        <li><strong>14-2</strong> Draw complete pictograph from memory — final form with all three factors encoded</li>
      </ul>

      {/* ── CH.15 ── */}
      <H2 id="ch15">Ch.15 — Di-Chords in Melodic Contexts</H2>
      <P>
        All three sound factors apply equally to <strong>horizontal (melodic)</strong> di-chords as to
        vertical (harmonic) ones. A melodic leap of a [4] has the same acoustic identity as a harmonic
        [4] — open, warm, alkaline, referring down. The context differs; the di-chord properties do not.
      </P>

      <H3>Key Distinction: Secondary vs. Primary Di-Chord</H3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 border border-orange-200 rounded p-4">
          <p className="font-semibold text-orange-900 text-sm mb-1">Secondary Di-Chord</p>
          <p className="text-orange-800 text-sm">Semitones between <em>adjacent notes</em> in a melody. The melodic step. Tells you the character of the motion between pitches.</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded p-4">
          <p className="font-semibold text-teal-900 text-sm mb-1">Primary Di-Chord</p>
          <p className="text-teal-800 text-sm">Semitones from each note to the <em>tonic</em>. The scale degree function. Tells you the harmonic weight and tonal function of each pitch.</p>
        </div>
      </div>
      <P>Both are tracked <em>simultaneously</em> in Ch.16. Ch.15 introduces each in isolation first.</P>

      <H3>Gut / Heart / Head</H3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="font-semibold text-red-900 text-sm">GUT — Dissonant [1][2][10][11]</p>
          <p className="text-red-700 text-xs mt-1">Physicality, transition, visceral momentum. The body responds before the mind processes.</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded p-3">
          <p className="font-semibold text-purple-900 text-sm">HEART — Modal [3][4][8][9]</p>
          <p className="text-purple-700 text-xs mt-1">Emotions, fluidity, expressiveness. The domain of melody and emotional color.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <p className="font-semibold text-blue-900 text-sm">HEAD — Perfect [5][6][7]</p>
          <p className="text-blue-700 text-xs mt-1">Intellect, structure, architectural weight. Frames harmonic space.</p>
        </div>
      </div>

      <H3>Four Gesture Types</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Gesture</th>
              <th className="border border-slate-300 px-3 py-2">Condition</th>
              <th className="border border-slate-300 px-3 py-2">Direction</th>
              <th className="border border-slate-300 px-3 py-2">Character</th>
              <th className="border border-slate-300 px-3 py-2">Clock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold text-green-800">Open</td>
              <td className="border border-slate-300 px-3 py-2">Harmonic + ascending</td>
              <td className="border border-slate-300 px-3 py-2">↗ straight up-right</td>
              <td className="border border-slate-300 px-3 py-2">Upper note open-ended, floating, opposing gravity</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">6→3→12 (CCW)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold text-blue-800">Closed</td>
              <td className="border border-slate-300 px-3 py-2">Non-harmonic + ascending</td>
              <td className="border border-slate-300 px-3 py-2">↗ over-arched</td>
              <td className="border border-slate-300 px-3 py-2">Upper note STRONGER, pulled downward, caps off a thought</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">9→12→3 (CW)</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold text-amber-800">Strong</td>
              <td className="border border-slate-300 px-3 py-2">Harmonic + descending</td>
              <td className="border border-slate-300 px-3 py-2">↘ straight down</td>
              <td className="border border-slate-300 px-3 py-2">Grounded finality, the final word of a conclusive statement</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">12→9→6 (CCW)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold text-purple-800">Weak</td>
              <td className="border border-slate-300 px-3 py-2">Non-harmonic + descending</td>
              <td className="border border-slate-300 px-3 py-2">↘ under-arched</td>
              <td className="border border-slate-300 px-3 py-2">Paradoxically seems to RISE despite going down — end of a question</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">3→6→9 (CW)</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold text-slate-600">Neutral</td>
              <td className="border border-slate-300 px-3 py-2">[6] either direction</td>
              <td className="border border-slate-300 px-3 py-2">—</td>
              <td className="border border-slate-300 px-3 py-2">Devoid of movement gesture, claw-like, frozen</td>
              <td className="border border-slate-300 px-3 py-2">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Clock Face Metaphor</H3>
      <P>
        Each gesture traces a path on an imaginary clock face. Counter-clockwise (CCW) paths carry
        energy upward and outward. Clockwise (CW) paths curve inward and downward. The direction of
        travel on the clock encodes the energetic quality of the interval, which the performer
        translates into a physical, sonic, and expressive gesture.
      </P>

      <H3>Tuning Insight</H3>
      <P>
        For an ascending non-harmonic interval (Closed gesture): imagine the <em>lower</em> note is
        an overtone of the upper note. This reframes the acoustic relationship and allows more accurate
        intonation — the lower note naturally seeks the tuning position that &ldquo;belongs to&rdquo; the upper
        note&apos;s overtone series.
      </P>

      <H3>Expressiveness</H3>
      <P>
        &ldquo;Visualize the keyboard and mentally track while observing secondary di-chord numbers in real time.&rdquo;
        The goal is to incorporate the <em>character</em> of each gesture into the actual sound — to play
        Open intervals with an upward-floating quality, Closed with a capping-off quality, etc.
      </P>

      <H3>Key Exercises (Ch.15)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>15-1 / 15-12</strong> Analyze a melody — label secondary di-chords and gesture types for each note</li>
        <li><strong>15-2</strong> Matching — match di-chords to gesture types</li>
        <li><strong>15-3</strong> Complete gesture table from memory</li>
        <li><strong>15-4</strong> Classifying — classify given intervals by gesture type</li>
        <li><strong>15-5</strong> Tracking gestures — track secondary di-chords in real-time while listening</li>
        <li><strong>15-7</strong> Singing alternating intervals — all 7 modes, all interval sizes</li>
        <li><strong>15-8</strong> Alternating thirds with accidentals</li>
        <li><strong>15-10 / 15-11</strong> Playing melodic gestures — incorporate gesture quality into performance at keyboard</li>
      </ul>

      {/* ── CH.16 ── */}
      <H2 id="ch16">Ch.16 — The Tracking Page</H2>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 pl-4 py-3 rounded-r mb-6">
        <p className="text-indigo-900 text-sm italic">
          &ldquo;Next to visualizing the keyboard, The Tracking Page is the most important means of developing fluency.&rdquo;
        </p>
        <p className="text-indigo-700 text-xs mt-1">— Marianne Ploger</p>
      </div>

      <H3>What It Is</H3>
      <P>
        A single physical page (p.153 in the textbook) containing 10 melodic lines, each exploring
        a specific interval range. No clef is printed — the mode is determined by the weekly assignment.
      </P>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Line</th>
              <th className="border border-slate-300 px-3 py-2">Content</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Seconds'],
              ['2', 'Thirds'],
              ['3', 'Fourths'],
              ['4', 'Fifths'],
              ['5', 'Fourths — varied'],
              ['6', 'Fifths — varied'],
              ['7', 'Sixths'],
              ['8', 'Sixths — varied'],
              ['9', 'Sevenths'],
              ['10', 'Sevenths — varied'],
            ].map(([line, content], i) => (
              <tr key={line} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">Line {line}</td>
                <td className="border border-slate-300 px-3 py-2">{content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Seven Modes</H3>
      <P>
        The same 10 lines are performed in each of the 7 modes by starting on a different pitch:
      </P>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Day</th>
              <th className="border border-slate-300 px-3 py-2">Mode</th>
              <th className="border border-slate-300 px-3 py-2">Start Note</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Monday', 'Aeolian', 'la'],
              ['Tuesday', 'Phrygian', 'mi'],
              ['Wednesday', 'Locrian', 'si'],
              ['Thursday', 'Lydian', 'fa'],
              ['Friday', 'Ionian', 'doh'],
              ['Saturday', 'Mixolydian', 'sol'],
              ['Sunday', 'Dorian', 're'],
            ].map(([day, mode, note], i) => (
              <tr key={day} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">{day}</td>
                <td className="border border-slate-300 px-3 py-2 font-semibold">{mode}</td>
                <td className="border border-slate-300 px-3 py-2 font-mono">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>The Six Tracking Protocols</H3>
      <P>
        Each line is performed in 6 sequential protocols. Target speed: <BC>144 BPM</BC>.
        Below 144 = Stage 2. At 144 = Stage 3. <strong>Never go slower hoping for fewer errors.</strong>
      </P>

      <div className="space-y-4 mb-8">
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 1 — Solfège with Fill-In Notes</p>
          <p className="text-slate-700 text-sm mb-2">
            Speak the solfège syllable of each written note. For intervals larger than a 2nd, fill in
            all adjacent notes between them (spoken, not played). Fill-in note values by interval:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-slate-200">
              <thead><tr className="bg-slate-50">
                <th className="border border-slate-200 px-2 py-1">Interval</th>
                <th className="border border-slate-200 px-2 py-1">Fill-in note value</th>
              </tr></thead>
              <tbody>
                {[
                  ['2nd', 'Quarter notes'],
                  ['3rd', '8th notes'],
                  ['4th', '8th-note triplets'],
                  ['5th', '16th notes'],
                  ['6th', '16th-note quintuplets'],
                  ['7th', '16th-note sextuplets'],
                ].map(([int, val]) => (
                  <tr key={int}>
                    <td className="border border-slate-200 px-2 py-1">{int}</td>
                    <td className="border border-slate-200 px-2 py-1">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-red-700 text-xs mt-2 font-semibold">NEVER skip fill-in notes.</p>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 2 — Secondary Di-Chord Numbers (then Gesture Names)</p>
          <p className="text-slate-700 text-sm">
            Speak the secondary di-chord number for each note (semitones from the previous note).
            Begin with &ldquo;0&rdquo; for the first note. Then repeat, speaking the gesture name (Open / Closed /
            Strong / Weak / Neutral) instead. Note: <BC>7</BC> is abbreviated &ldquo;sev&rdquo; and{' '}
            <BC>11</BC> is abbreviated &ldquo;lev&rdquo; to prevent syllable-timing confusion.
          </p>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 3 — Primary Di-Chord Numbers</p>
          <p className="text-slate-700 text-sm">
            Speak the primary di-chord number for each note (semitones from the tonic to that note).
            First note and last note both = <BC>0</BC> (tonic).
          </p>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 4 — SING Primary Di-Chord Numbers</p>
          <p className="text-slate-700 text-sm">
            Sing the primary di-chord number on pitch while playing the tonic drone at the keyboard.
            &ldquo;Gusto and forthrightness.&rdquo; Before each pitch, visualize the Di-Chord Pictograph
            for that primary di-chord. This is the first step to involve singing.
          </p>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 5 — Sing Secondary Di-Chord Numbers + Gesture Names</p>
          <p className="text-slate-700 text-sm mb-2">
            <strong>5A:</strong> Sing the secondary di-chord number for each note while playing the tonic drone.
            Visualize the pictograph for each secondary di-chord before singing it.
          </p>
          <p className="text-slate-700 text-sm">
            <strong>5B:</strong> Sing the gesture name for each note. Incorporate the actual <em>character</em> of
            each gesture into the singing — open intervals should sound floating, closed intervals capping,
            strong intervals grounded, weak intervals question-like.
          </p>
        </div>

        <div className="border border-slate-200 rounded p-4 bg-indigo-50 border-indigo-200">
          <p className="font-semibold text-indigo-900 text-sm mb-2">Step 6 — Sing Solfège (Full Integration)</p>
          <p className="text-indigo-800 text-sm">
            Sing solfège while playing the tonic drone, including all fill-in notes (same fill-in note
            values as Step 1). &ldquo;All of this information — pitches, relationships between consecutive
            pitches, and relationships to the perceived tonic — is present and accessible.&rdquo;
            This is the target state: all layers simultaneously active while singing naturally.
          </p>
        </div>
      </div>

      <H3>Reading by Di-Chord vs. Rote</H3>
      <P>
        Rote reading: &ldquo;push the right buttons.&rdquo; The notes are correct but the music is absent.
        Di-chord reading: access <em>what happens between the notes</em> — where expression, affect,
        and meaning are found. The Tracking Page trains the latter.
      </P>

      <H3>Progress Tracking</H3>
      <div className="bg-slate-50 rounded p-4 mb-6">
        <p className="text-slate-700 text-sm">
          7 modes × 6 protocols × 10 lines = <strong>420 checkboxes</strong> per cycle.<br />
          One line in one mode at fluency ≈ <strong>5–7 minutes</strong>.<br />
          One full mode day (10 lines × 6 protocols) ≈ 50–70 minutes at fluency.
        </p>
      </div>

      <H3>Key Exercises (Ch.16)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>16-1</strong> Tracking Page Analysis — analyze a single line for both primary and secondary di-chords before performing it</li>
        <li><strong>16-2</strong> Performing Analyzed Excerpts — perform a pre-analyzed excerpt using all 6 protocols</li>
        <li><strong>16-3</strong> Compose a Tracking Line — write 28–32 notes using only 2nds and 3rds; no clef, no key signature, no time signature; this line becomes your personal tracking material</li>
      </ul>

      {/* ── CH.17 ── */}
      <H2 id="ch17">Ch.17 — Tri-Chord Formation Using 2nds</H2>
      <P>
        When we hear three simultaneous notes, the brain relates <em>each</em> upper note to the
        lowest note (the fundamental). Tri-chords are named using the <strong>primary di-chords
        from the fundamental</strong> — not the secondary di-chord between the two upper notes.
      </P>
      <P>
        <strong>Naming fraction [X/Y]:</strong> X = primary di-chord from fundamental to <em>top</em> note.
        Y = primary di-chord from fundamental to <em>middle</em> note. The secondary di-chord between the
        upper notes is NOT used in naming.
      </P>
      <P>
        Example: doh-mi-sol → doh to sol = <BC>7</BC>, doh to mi = <BC>4</BC> → named <BC>[7/4]</BC>.
      </P>

      <H3>Four Tri-Chord Types</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Building Pattern</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Solfège Example</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono"><BC>[4/2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">0, up<BC>[2]</BC>, up<BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">fa-sol-la</td>
              <td className="border border-slate-300 px-3 py-2">Open, expansive, biscuit-like. Two dissonant + one modal di-chord, all harmonic.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono"><BC>[2/1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">0, up<BC>[1]</BC>, up<BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">doh-re♭-mi♭</td>
              <td className="border border-slate-300 px-3 py-2">Crunchy. Three dissonant di-chords, two non-harmonic. Maximum dissonance.</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono"><BC>[3/2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">0, up<BC>[2]</BC>, up<BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">doh-re-mi♭</td>
              <td className="border border-slate-300 px-3 py-2">Major/minor threshold. Whole tone first, then semitone. Appears in Dorian/Aeolian tetrachords.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono"><BC>[3/1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">0, up<BC>[1]</BC>, up<BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">doh-re♭-mi♭♭</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian flavor. Semitone first, then whole tone.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Naming Rule &amp; Stencil Concept</H3>
      <P>
        ALWAYS use consecutive syllable names. This may require double flats (♭♭) or double sharps (𝄪).
        The &ldquo;stencil&rdquo; concept: these patterns can be transposed to any starting note — internalize
        each type as a physical and perceptual stencil that you place at will.
      </P>

      <H3>Key Exercises (Ch.17)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>17-1</strong> Fill in table of all four tri-chord types</li>
        <li><strong>17-2</strong> Crunchy <BC>[2/1]</BC> Part I — chromatic ascent</li>
        <li><strong>17-3</strong> Crunchy <BC>[2/1]</BC> Part II — speak black/white pattern</li>
        <li><strong>17-4</strong> <BC>[4/2]</BC> exploration</li>
        <li><strong>17-5 through 17-10</strong> Spelling and playing all four types through all positions</li>
      </ul>

      {/* ── CH.18 ── */}
      <H2 id="ch18">Ch.18 — Tetrachord Formation: Ionian, Dorian, Phrygian, Lydian</H2>
      <P>
        A tetrachord is four notes spanning a 4th from lowest to highest. There are exactly four diatonic
        tetrachord types. Physical technique: index, middle, ring, pinky — one per note. Move all four
        fingers up one semitone at a time to explore chromatically.
      </P>

      <H3>Four Tetrachord Types</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">White-Key Model</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Secondary Pattern</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Primary Pattern</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Sound</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td>
              <td className="border border-slate-300 px-3 py-2">doh-re-mi-fa (C)</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,2,1]</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,4,5]</td>
              <td className="border border-slate-300 px-3 py-2">Bright, major — whole-whole-semi</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td>
              <td className="border border-slate-300 px-3 py-2">re-mi-fa-sol (D)</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,1,2]</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,3,5]</td>
              <td className="border border-slate-300 px-3 py-2">Balanced — whole-semi-whole</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2">mi-fa-sol-la (E)</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,1,2,2]</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,1,3,5]</td>
              <td className="border border-slate-300 px-3 py-2">Dark, Spanish — semi-whole-whole</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td>
              <td className="border border-slate-300 px-3 py-2">fa-sol-la-si (F)</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,2,2]</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">[0,2,4,6]</td>
              <td className="border border-slate-300 px-3 py-2">Floating, all whole tones — spans aug 4th <BC>[6]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Key Synthesis Insight</H3>
      <P>
        &ldquo;Two Ionian tetrachords separated by a <BC>[2]</BC>&rdquo; = the major scale. The same logic applies
        to all seven modes. Naming rule: each note must be a different consecutive syllable (same as tri-chords).
        Pure modes use two identical tetrachords; mixed modes combine two different tetrachords.
      </P>

      <H3>Key Exercises (Ch.18)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>18-1 through 18-3</strong> Chromatic exploration of all four types</li>
        <li><strong>18-4 through 18-5</strong> Naming and fill-in-the-blanks</li>
        <li><strong>18-6</strong> Correcting note names (wrong syllable sequences)</li>
        <li><strong>18-7</strong> Modelling Dorian, Phrygian, and Lydian</li>
        <li><strong>18-8</strong> Spelling table — all 21 starting notes × all four types, done away from piano using keyboard visualization only</li>
      </ul>

      {/* ── CH.19 ── */}
      <H2 id="ch19">Ch.19 — The Diatonic Modes</H2>
      <P>
        Ploger&apos;s thesis: emotional associations of modes are <strong>not subjective</strong> — they arise from the
        harmonicity/non-harmonicity of primary di-chords. Di-chord analysis provides an objective basis for
        modal affect.
      </P>

      <H3>White-Key Correspondences</H3>
      <P>
        C/doh = Ionian, D/re = Dorian, E/mi = Phrygian, F/fa = Lydian, G/sol = Mixolydian,
        A/la = Aeolian, B/si = Locrian.
      </P>

      <H3>Ploger Ordering (Brightest to Darkest)</H3>
      <P>
        Lydian → Ionian → Mixolydian → Dorian → Aeolian → Phrygian → Locrian.
        Adjacent modes differ by exactly one scale degree.
      </P>

      <H3>Di-Chord Profiles from Tonic</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">1̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">2̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7̂</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">6</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">11</td>
              <td className="border border-slate-300 px-3 py-2">Brightest — raised 4̂ (<BC>6</BC>)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">11</td>
              <td className="border border-slate-300 px-3 py-2">Major scale</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">10</td>
              <td className="border border-slate-300 px-3 py-2">Major, flat 7̂ — blues/rock</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
              <td className="border border-slate-300 px-3 py-2">Minor, raised 6̂ — balanced pivot</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">8</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
              <td className="border border-slate-300 px-3 py-2">Natural minor</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">1</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">8</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
              <td className="border border-slate-300 px-3 py-2">Minor, flat 2̂ — Spanish/dark</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">1</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono bg-amber-50">6</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">8</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
              <td className="border border-slate-300 px-3 py-2">Darkest — diminished 5̂ (<BC>6</BC>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Open/Major vs. Closed/Minor Split</H3>
      <P>
        The first three modes (Lydian, Ionian, Mixolydian) contain <BC>[2]</BC>, <BC>[4]</BC>, and <BC>[9]</BC> →
        open/major character. The last three (Aeolian, Phrygian, Locrian) contain <BC>[3]</BC> and <BC>[8]</BC> →
        contracted/minor character. Dorian is the musical tipping point — the most balanced mode.
      </P>

      <H3>Tonocentric Model &amp; Scale Degree Tendencies</H3>
      <P>
        Degrees above tonic (2̂, 3̂, 4̂) are marked (+) and tend <strong>downward</strong>. Degrees below the
        nearest tonic (5̂, 6̂, 7̂) are marked (−) and tend <strong>upward</strong>. There are 42 secondary
        di-chords but only 6 primary — the mind attends to primaries for efficiency.
      </P>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li>2̂ = dissonant / tends down</li>
        <li>3̂ = modal / tends down</li>
        <li>4̂ = perfect / tends down</li>
        <li>5̂ = perfect / tends up</li>
        <li>6̂ = modal / tends up</li>
        <li>7̂ = dissonant / tends up</li>
      </ul>

      <H3>Tetrachordal Construction of Modes</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Tetrachord I (lower)</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Tetrachord II (upper)</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td>
              <td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td>
              <td className="border border-slate-300 px-3 py-2">Pure</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td>
              <td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td>
              <td className="border border-slate-300 px-3 py-2">Pure</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Pure</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td>
              <td className="border border-slate-300 px-3 py-2">Lydian [2,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td>
              <td className="border border-slate-300 px-3 py-2">Mixed</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td>
              <td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td>
              <td className="border border-slate-300 px-3 py-2">Mixed</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Mixed ⚠️</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Lydian [2,2,2]</td>
              <td className="border border-slate-300 px-3 py-2">Mixed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-6 text-sm text-amber-900">
        ⚠️ Aeolian = Dorian (I) + Phrygian (II) — NOT Phrygian + Dorian. Locrian = Phrygian (I) + Lydian (II).
      </div>

      <H3>Eight Rules of Aural Perception of the Modes</H3>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2 text-sm">
        <li><strong>Final rule:</strong> The first heard pitch acts as tonic — the mind holds it as a reference.</li>
        <li><strong>All seven must be present:</strong> Remove one pitch → ambiguous (each mode shares 6 of its 7 notes with at least one other mode).</li>
        <li><strong>Primary di-chords dominate:</strong> The six di-chords between tonic and each non-tonic pitch largely determine modal character.</li>
        <li><strong>Secondary di-chords are subordinate:</strong> 42 secondary vs. 6 primary — the mind attends to primaries for efficiency.</li>
        <li><strong>Two dissonant, two modal, two perfect:</strong> Every mode has 2̂ and 7̂ as dissonant; 3̂ and 6̂ as modal; 4̂ and 5̂ as perfect.</li>
        <li><strong>No more than a 4th from tonic:</strong> Each non-tonic note relates to the <em>nearest</em> tonic pitch class.</li>
        <li><strong>Harmonicity determines mode character:</strong> The H/NH quality of each primary di-chord has a profound effect on perceived mode.</li>
        <li><strong>Most positive affect = most harmonic di-chords.</strong></li>
      </ol>

      <H3>Harmonicity Table by Mode</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">2̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7̂</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold"># Harmonic</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold"># Non-Harmonic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">5</td>
              <td className="border border-slate-300 px-3 py-2 text-center">1</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">2</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td>
              <td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">1</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6 text-sm text-blue-900">
        <strong>Counterintuitive insight:</strong> Mixolydian has the MOST harmonic di-chords (5) because its
        flat 7̂ = <BC>[10]</BC> (harmonic), while Ionian&apos;s natural 7̂ = <BC>[11]</BC> (non-harmonic). The
        &ldquo;bluesy&rdquo; Mixolydian is the most harmonically open mode.
      </div>

      <H3>Key Exercises (Ch.19)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>19-4</strong> List all modes in Ploger ordering (brightest to darkest)</li>
        <li><strong>19-5 through 19-8</strong> Scale degree properties across all modes</li>
        <li><strong>19-9 through 19-12</strong> Mode pictographs — visual representations of di-chord profiles</li>
        <li><strong>19-13 through 19-15</strong> Comparing modes and identifying tetrachords within each mode</li>
      </ul>

      {/* ── CH.20 ── */}
      <H2 id="ch20">Ch.20 — Heptachord Formation</H2>
      <P>
        <strong>Heptachord vs. Scale:</strong> A scale is a linear C→C sequence. A heptachord is the same
        seven-note collection perceived as a cognitive entity centered on its tonic. Fingering uses ring,
        middle, index, and pinky — NOT thumbs.
      </P>

      <H3>Two Arrangements</H3>
      <P>
        <strong>Disjunct:</strong> LH = Tonic–Subdominant (1̂ to 4̂); RH = Dominant–Tonic (5̂ to 1̂ above).
        Pinkies play tonic one octave apart. Spans an octave.
      </P>
      <P>
        <strong>Conjunct (Ploger&apos;s preferred):</strong> LH = Dominant–Tonic (5̂ pinky → 1̂ index);
        RH = Tonic–Subdominant (1̂ index → 4̂ pinky). Both INDEX FINGERS overlap on TONIC at unison.
        Spans a 7th. The symmetry around the tonic enables faster orientation.
      </P>

      <H3>Conjunct Finger-to-Degree Mapping (Constant in Any Mode)</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Fingers</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Scale Degrees</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Degree Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Both index fingers</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">1̂ (Tonic)</td>
              <td className="border border-slate-300 px-3 py-2">Tonic</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Both middle fingers</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">2̂ (RH) and 7̂ (LH)</td>
              <td className="border border-slate-300 px-3 py-2">Dissonant degrees</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Both ring fingers</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">3̂ (RH) and 6̂ (LH)</td>
              <td className="border border-slate-300 px-3 py-2">Modal degrees</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Both pinkies</td>
              <td className="border border-slate-300 px-3 py-2 font-mono">4̂ (RH) and 5̂ (LH)</td>
              <td className="border border-slate-300 px-3 py-2">Perfect degrees</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Why this matters: ring fingers always hold the modal degrees. The RH ring finger plays 3̂ — if it
        plays <BC>[3]</BC> it signals minor; if it plays <BC>[4]</BC> it signals major.
      </P>

      <H3>Conjunct Tetrachord Assignments by Mode</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Left Hand (5̂→1̂)</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Right Hand (1̂→4̂)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian — pure</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian — pure</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian — pure</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian</td>
              <td className="border border-slate-300 px-3 py-2">Lydian — mixed</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian</td>
              <td className="border border-slate-300 px-3 py-2">Ionian — mixed</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian</td>
              <td className="border border-slate-300 px-3 py-2">Dorian — mixed</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td>
              <td className="border border-slate-300 px-3 py-2">Lydian</td>
              <td className="border border-slate-300 px-3 py-2">Phrygian — mixed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Mode Modulation (Ex. 20-6)</H3>
      <P>
        One-note alteration while keeping the tonic = a new mode, same tonic. Rules: both index fingers
        stay fixed on tonic. Move any OTHER finger up or down one semitone → new mode. Example: Lydian
        (fa#) → move RH pinky from fa# down to fa → Ionian. This is the physical and sensory foundation
        for Heptachord Shift (Ch.24).
      </P>

      <H3>Key Exercises (Ch.20)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>20-1 through 20-5</strong> Conjunct and disjunct heptachord formation, all seven modes</li>
        <li><strong>20-6</strong> Mode Modulation — single-finger alterations to shift between modes at same tonic</li>
      </ul>

      {/* ── CH.21 ── */}
      <H2 id="ch21">Ch.21 — Triads and Their Inversions</H2>
      <P>
        Triads are named by the PRIMARY di-chords from the bass/root to each upper note.
      </P>

      <H3>Root Position Triad Profiles</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Triad</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Di-Chord Profile</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Character</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Major <BC>[7/4]</BC></td>
              <td className="border border-slate-300 px-3 py-2"><BC>[7]</BC> perfect harmonic + <BC>[4]</BC> modal harmonic</td>
              <td className="border border-slate-300 px-3 py-2">Open, expanding, alkaline — both primary di-chords harmonic</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor <BC>[7/3]</BC></td>
              <td className="border border-slate-300 px-3 py-2"><BC>[7]</BC> perfect harmonic + <BC>[3]</BC> modal NON-harmonic</td>
              <td className="border border-slate-300 px-3 py-2">Closed, contracting, acidic; poignancy from <BC>[3]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Diminished <BC>[6/3]</BC></td>
              <td className="border border-slate-300 px-3 py-2"><BC>[6]</BC> dim NON-harmonic + <BC>[3]</BC> modal NON-harmonic</td>
              <td className="border border-slate-300 px-3 py-2">Harsh, tart — <BC>[6]</BC> &ldquo;frozen&rdquo;; only triad where 5th is non-harmonic</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Augmented <BC>[8/4]</BC></td>
              <td className="border border-slate-300 px-3 py-2"><BC>[8]</BC> aug NON-harmonic + <BC>[4]</BC> modal harmonic</td>
              <td className="border border-slate-300 px-3 py-2">All-modal, mysterious; both primary di-chords have 4Hz pulsation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Inversions — Key Insight</H3>
      <P>
        The primary di-chords from the ROOT stay the same across all inversions. However, the secondary
        di-chord (between 3rd and 5th) changes — and the di-chords measured from the BASS change completely
        with each inversion, giving each inversion a completely different sonic identity.
      </P>
      <P>
        <strong>Open vs. Closed Position:</strong> Closed = root-3rd-5th stacked bottom-up (less than an
        octave). Open = root-5th-3rd bottom-up (more than an octave). The secondary di-chord in open position
        is the inversion of the closed secondary.
      </P>

      <H3>Figured Bass Di-Chord Reference</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Figure</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Di-Chord Range</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td><td className="border border-slate-300 px-3 py-2"><BC>[1]</BC> or <BC>[2]</BC></td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td><td className="border border-slate-300 px-3 py-2"><BC>[3]</BC> or <BC>[4]</BC></td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td><td className="border border-slate-300 px-3 py-2"><BC>[5]</BC> or <BC>[6]</BC></td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td><td className="border border-slate-300 px-3 py-2"><BC>[7]</BC> or <BC>[6]</BC></td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 text-center font-mono">6</td><td className="border border-slate-300 px-3 py-2"><BC>[8]</BC> or <BC>[9]</BC></td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td><td className="border border-slate-300 px-3 py-2"><BC>[10]</BC> or <BC>[11]</BC></td></tr>
          </tbody>
        </table>
      </div>

      <H3>Boulanger/Ploger Chord Exercise</H3>
      <P>
        Play a chord, name every note bottom-to-top AND top-to-bottom in solfège, name every di-chord.
        Repeat for 1st and 2nd inversion. Then start on each of the 12 chromatic pitches, ascending and
        descending. This exercise trains comprehensive chord recognition across all positions and all keys.
      </P>

      <H3>Key Exercises (Ch.21)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>21-1</strong> Triads and melodic gestures — 9 questions per triad type</li>
        <li><strong>21-2</strong> Inversions fill-in table</li>
        <li><strong>21-3</strong> Boulanger/Ploger Chord Exercise — all 12 pitches ascending and descending, both major and minor</li>
      </ul>

      {/* ── CH.22 ── */}
      <H2 id="ch22">Ch.22 — Four Functional 7th Chords</H2>

      <H3>Construction</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Triad</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">7th Quality</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Common Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th / V7</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th (ø7)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th (°7)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Root Position Di-Chord Profiles (7/5/3)</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Type</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Root</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7th</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">0</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded p-3 mb-6 text-sm text-slate-700">
        <strong>Fully-Diminished symmetry:</strong> All adjacent intervals are <BC>[3]</BC> — di-chords
        [0,3,6,9] repeat identically in all inversions. It is impossible to tell inversion by ear in isolation.
      </div>

      <H3>Rules for Finding Chord Roots</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Position</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Figured Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Root Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Triad root pos.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5/3</td>
              <td className="border border-slate-300 px-3 py-2">Bass note</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Triad 1st inv.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6/3</td>
              <td className="border border-slate-300 px-3 py-2">6th above bass</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Triad 2nd inv.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6/4</td>
              <td className="border border-slate-300 px-3 py-2">Bass note (cadential)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">7th root pos.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7/5/3</td>
              <td className="border border-slate-300 px-3 py-2">Bass note</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">7th 1st inv.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6/5/3</td>
              <td className="border border-slate-300 px-3 py-2">6th above bass</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">7th 2nd inv.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6/4/3</td>
              <td className="border border-slate-300 px-3 py-2">4th above bass</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">7th 3rd inv.</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6/4/2</td>
              <td className="border border-slate-300 px-3 py-2">2nd above bass</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── CH.23 ── */}
      <H2 id="ch23">Ch.23 — Scale Degree Harmonization in the Major Heptachord</H2>
      <P>
        For each scale degree there is a diatonic triad. Triad qualities are consistent across ALL major
        keys — learning by scale degree creates a universal template. Roman numeral notation:
        Major = uppercase (I, IV, V), Minor = lowercase (ii, iii, vi), Diminished = lowercase + degree
        symbol (vii°).
      </P>

      <H3>Diatonic Triad Reference</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Roman Numeral</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Triad Type</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Root</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5th</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">I</td>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2 text-center">1̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5̂</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">ii</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">6̂</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">iii</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">IV</td>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">6̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">1̂</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">V</td>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2̂</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">vi</td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2 text-center">6̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">1̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3̂</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono font-bold">vii°</td>
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">2̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4̂</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Functional 7th Chords in the Major Heptachord</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>V7</strong> — Dominant 7th on 5̂</li>
        <li><strong>ii7, iii7, vi7</strong> — Minor 7ths on 2̂, 3̂, 6̂</li>
        <li><strong>viiø</strong> — Half-Diminished on 7̂</li>
      </ul>

      <H3>Ch.6 Connection — Pythagorean Ordering</H3>
      <P>
        The Pythagorean ordering F-C-G-D-A-E-B maps to scale degrees 4̂-1̂-5̂-2̂-6̂-3̂-7̂ and naturally
        groups triad qualities: major triads (I, IV, V) fall on C, F, G — the center notes of the series;
        minor triads fall on D, E, A — the flanking notes; and vii° falls on B — the outer edge.
      </P>

      <H3>Bach Chorale 6-Step Protocol (target: 72 bpm)</H3>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2 text-sm">
        <li><strong>Step 1</strong> — Name all notes (Bass, Soprano, Alto, Tenor) in solfège at 144 bpm</li>
        <li><strong>Step 2</strong> — Name bass note + diatonic interval from bass for each voice at 144 bpm</li>
        <li><strong>Step 3</strong> — State bass note + root name at 144 bpm</li>
        <li><strong>Step 4</strong> — Root + inversion figured bass at 72 bpm</li>
        <li><strong>Step 5</strong> — Root&apos;s Roman numeral function at 72 bpm</li>
        <li><strong>Step 6</strong> — Function + inversion together at 72 bpm</li>
      </ol>

      <H3>Key Exercises (Ch.23)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>23-1 through 23-4</strong> Diatonic triads — identification and spelling</li>
        <li><strong>23-5</strong> 10 Chord Sequences — soprano scale degrees and Roman numeral harmonies in all keys</li>
        <li><strong>23-6</strong> Bach Chorale analysis using 6-Step Protocol</li>
      </ul>

      {/* ── CH.24 ── */}
      <H2 id="ch24">Ch.24 — Heptachord Shift</H2>
      <P>
        One chromatic alteration = an immediate shift to a new heptachord. The shift is instant — at the
        moment the accidental sounds. No cadence or preparation is required.
      </P>

      <H3>Three Heptachord Types</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>Major [I]</strong></li>
        <li><strong>Melodic minor [i△]</strong></li>
        <li><strong>Harmonic minor [i▽]</strong></li>
      </ul>
      <P>
        <em>&ldquo;Ur&rdquo;</em> (from German: &ldquo;origin&rdquo;) = the original/source heptachord from
        which shifts radiate.
      </P>

      <H3>First-Generation Shifts from Major [I]</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Alteration</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Becomes Degree</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">New Heptachord</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">#4̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
              <td className="border border-slate-300 px-3 py-2">[V] dominant major</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">♭7̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4̂</td>
              <td className="border border-slate-300 px-3 py-2">[IV] subdominant major</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">#5̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
              <td className="border border-slate-300 px-3 py-2">[vi▽] relative harmonic minor</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">#1̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7̂</td>
              <td className="border border-slate-300 px-3 py-2">[ii△] supertonic melodic minor</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">♭3̂</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3̂</td>
              <td className="border border-slate-300 px-3 py-2">[i△] parallel melodic minor</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 rounded p-3 mb-4 text-sm text-slate-700">
        <strong>C major worked example:</strong> Raise F→F# = G major [V]. Lower B→B♭ = F major [IV].
        Raise G→G# = A harmonic minor [vi▽]. Raise C→C# = D melodic minor [ii△]. Lower E→E♭ = C melodic
        minor [i△].
      </div>

      <H3>First-Generation Shifts from Melodic Minor [i△]</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>#3̂ → [I] parallel major</li>
        <li>♭6̂ → [i▽] parallel harmonic minor</li>
        <li>♭7̂ → [♭VII] relative major (NOTE: NOT traditional ♭III)</li>
      </ul>

      <H3>First-Generation Shifts from Harmonic Minor [i▽]</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li>#6̂ → [i△] parallel melodic minor</li>
        <li>♭7̂ → [III] relative major</li>
      </ul>

      <H3>Special Heptachord Signals</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>Augmented 2nd</strong> — exists ONLY in harmonic minor (between 6̂ and 7̂) → implies harmonic minor</li>
        <li><strong>Diminished 4th</strong> — exists in BOTH harmonic and melodic minor (between 7̂ and 3̂) → implies a minor heptachord</li>
      </ul>

      <H3>Heptachord House Plan</H3>
      <P>
        Appendix C contains a 14-room floor plan representing all heptachords through the second generation.
        The UR (C major) sits at the structural center. Bach&apos;s tonal practice typically stayed within
        this house plan.
      </P>
      <P>
        For improvisation: &ldquo;You can learn to know where you are at every moment in your listening,
        playing, and improvising — real-time modulation.&rdquo;
      </P>

      {/* ── CH.25 ── */}
      <H2 id="ch25">Ch.25 — Transposition</H2>
      <P>
        Core method: imagine the music written in a <em>different clef</em> with an <em>altered key
        signature</em>. Notes stay on the same lines and spaces — only the clef symbol and key signature
        change. No need to calculate an interval for every individual note.
      </P>
      <P>
        Example: <em>Old Hundredth</em> in G major (treble clef). To play up a minor 3rd (B♭ major):
        read as if in bass clef with two flats added to the original one sharp = two flats total.
      </P>

      <H3>Transposition Reference Table (from Treble Clef)</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Direction</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Interval</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-Chord</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Clef to Use</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Key Sig Alteration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Mezzo-Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+6#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Mezzo-Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+1♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Bass</td>
              <td className="border border-slate-300 px-3 py-2">+4#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Bass</td>
              <td className="border border-slate-300 px-3 py-2">+3♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Alto</td>
              <td className="border border-slate-300 px-3 py-2">+2#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Alto</td>
              <td className="border border-slate-300 px-3 py-2">+5♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Tenor</td>
              <td className="border border-slate-300 px-3 py-2">+5#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Tenor</td>
              <td className="border border-slate-300 px-3 py-2">+2♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+3#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+4♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Baritone</td>
              <td className="border border-slate-300 px-3 py-2">+1#</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Baritone</td>
              <td className="border border-slate-300 px-3 py-2">+6♭</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded p-3 mb-6 text-sm text-slate-700">
        Only intervals <BC>[1]</BC>–<BC>[6]</BC> are listed. For <BC>[7]</BC>–<BC>[11]</BC> use their
        inversions. The sum of accidentals for inversionally related di-chords always equals 7.
      </div>

      <H3>Transposing Instruments</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Key</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Written vs. Sounding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">B♭</td>
              <td className="border border-slate-300 px-3 py-2">Written is a whole tone HIGHER than sounding</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">D</td>
              <td className="border border-slate-300 px-3 py-2">Written is a whole tone LOWER than sounding</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">A</td>
              <td className="border border-slate-300 px-3 py-2">Written is a minor 3rd HIGHER (or major 6th LOWER)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">E♭</td>
              <td className="border border-slate-300 px-3 py-2">Written is a minor 3rd LOWER (or major 6th HIGHER)</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">F</td>
              <td className="border border-slate-300 px-3 py-2">Written is a perfect 4th LOWER (or perfect 5th HIGHER)</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">G</td>
              <td className="border border-slate-300 px-3 py-2">Written is a perfect 5th LOWER (or perfect 4th HIGHER)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        B♭ clarinet example: plays written C → sounds concert B♭. To transpose for concert pitch reading:
        use tenor clef + add two flats.
      </P>
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6 text-sm text-blue-900">
        <strong>Mastery note:</strong> &ldquo;Mastering transposition is a test of genuine musical understanding.
        Motor memory cannot transpose — if you learned a piece by fingers alone, playing it in another key
        feels completely foreign.&rdquo;
      </div>

      <H3>Key Exercises (Ch.25)</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1 text-sm">
        <li><strong>25-1</strong> Transposing <em>Yankee Doodle</em> — 10 questions</li>
        <li><strong>25-2</strong> Transposing <em>A Tisket A Tasket</em> — 13 starting notes</li>
      </ul>

      {/* ── APPENDIX B ── */}
      <H2 id="app-b">Appendix B — The Overtone/Harmonic Series</H2>
      <P>
        The physical basis for why di-chord harmonicity works. Harmonic di-chords are harmonic because
        their upper notes appear early in the overtone series of the lower note — they are &ldquo;already
        in the family.&rdquo;
      </P>

      <H3>First 7 Partials</H3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Partial</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Name</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-Chord</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">1</td>
              <td className="border border-slate-300 px-3 py-2">Fundamental</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Base vibration; string vibrating in one part</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">2</td>
              <td className="border border-slate-300 px-3 py-2">Octave</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2">String divides in half; 2:1 ratio</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">3</td>
              <td className="border border-slate-300 px-3 py-2">Fifth</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[7]</BC></td>
              <td className="border border-slate-300 px-3 py-2">String divides into 3 parts; 3:1 ratio to fundamental</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">4</td>
              <td className="border border-slate-300 px-3 py-2">Super Octave</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2">String divides into 4 parts</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">5</td>
              <td className="border border-slate-300 px-3 py-2">Major Third</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2">String divides into 5 parts; 5:4 ratio to Super Octave</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">6</td>
              <td className="border border-slate-300 px-3 py-2">Super Fifth</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[7]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Octave of the Fifth</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">7</td>
              <td className="border border-slate-300 px-3 py-2">Minor Seventh</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[10]</BC></td>
              <td className="border border-slate-300 px-3 py-2">String divides into 7 parts; controversial whether 7:4 or 5:9</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Harmonic Ratios from the Series</H3>
      <P>
        Ratio of partial 5 to partial 3 = 5:3 = major 6th <BC>[9]</BC>.
      </P>

      <H3>What is NOT in the Overtone Series</H3>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2 text-sm">
        <li>
          <strong>Perfect 4th <BC>[5]</BC></strong> — Does NOT exist naturally. Artificially derived as
          the distance from the 5th to the Super Octave (3rd to 4th partial), ratio 4:3. This is why{' '}
          <BC>[5]</BC> is non-harmonic despite being called &ldquo;perfect.&rdquo;
        </li>
        <li>
          <strong>Minor 3rd <BC>[3]</BC></strong> — NOT in series → non-harmonic ✓
        </li>
        <li>
          <strong>Minor 6th <BC>[8]</BC></strong> — NOT in series → non-harmonic ✓
        </li>
        <li>
          <strong>Augmented 4th <BC>[6]</BC></strong> — IS in the series but sounds flat relative to
          equal temperament.
        </li>
      </ul>

      <H3>Terminology</H3>
      <P>
        &ldquo;Harmonics&rdquo; = frequency ratios. &ldquo;Overtones&rdquo; = divisions of a vibrating
        string or air column. &ldquo;Partials&rdquo; = most precise term (includes the fundamental itself).
      </P>

      {/* ── APPENDIX C ── */}
      <H2 id="app-c">Appendix C — The Ploger Heptachord Shift House Plan</H2>
      <P>
        A conceptual floor plan with 14 rooms representing all heptachords through the second generation.
        The original heptachord (UR) = C major sits at the structural center.
      </P>

      <H3>14 Rooms (Using C Major as UR)</H3>
      <P>
        <strong>First-generation rooms:</strong> G major [V], F major [IV], A harmonic minor [vi▽],
        D melodic minor [ii△], C melodic minor [i△].
      </P>
      <P>
        <strong>Second-generation rooms:</strong> D major, B♭ major, g melodic minor, d harmonic minor,
        f melodic minor, e harmonic minor, a melodic minor, E♭ major, and others derived from
        first-generation shifts.
      </P>

      <H3>How to Use the House Plan</H3>
      <P>
        Each arrow between rooms shows the triggering chromatic alteration. Double-headed arrows indicate
        reversible shifts. Bach typically wrote within these 14 rooms.
      </P>
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6 text-sm text-blue-900">
        <strong>For AMF improvisers:</strong> This diagram is the endgame — the complete map of where you
        can go from any tonal center and how to get there with a single chromatic step.
      </div>

      {/* ── ESSENTIAL EXERCISES ── */}
      <H2 id="exercises">Essential Plogger Exercises — Practice Plan</H2>
      <P>
        The following exercises are the highest-leverage items across the full three-book system.
        Sprint eligibility is noted for AMF curriculum sequencing.
      </P>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-3 text-sm">
        <li>
          <strong>Keyboard Visualization</strong> — Eyes-closed note naming (Ch.3). Foundational; begin
          Sprint 1+. The prerequisite for all other work.
        </li>
        <li>
          <strong>Longy Rhythms</strong> — Clap + speak rhythmic patterns (Ch.4). Foundational; begin
          Sprint 1+.
        </li>
        <li>
          <strong>Lap Map Drills</strong> — Solfège + di-chord mapping on lap (Ch.5). Begin Sprint 3+.
        </li>
        <li>
          <strong>Boulanger/Ploger Chord Exercise</strong> — Name all notes and di-chords in every
          inversion across all 12 pitches (Ch.21–22). Begin Sprint 9+.
        </li>
        <li>
          <strong>Tracking Page Protocol</strong> (Ch.16) — Steps 1–2 from Sprint 1; full 7-step
          integration by Sprint 12.
        </li>
        <li>
          <strong>Conjunct Mode Modulation</strong> — Single-finger heptachord modulation at keyboard
          (Ch.20, Ex.20-6). Begin Sprint 9+.
        </li>
        <li>
          <strong>Bach Chorale Heptachord Analysis</strong> — 6-Step Protocol applied to Bach chorales
          (Ch.24). Begin Sprint 11+.
        </li>
        <li>
          <strong>10 Chord Sequences in All Keys</strong> — Soprano scale degrees + Roman numerals in
          all 12 keys (Ch.23, Ex.23-5). Begin Sprint 10+.
        </li>
      </ol>

      {/* ── MELODY CHAMBER ── */}
      <section id="melody">
        <H2 id="melody">Melody Chamber</H2>
        <P>Source: Emotional Map of Melody (EMM) + original AMF extraction. The Melody Chamber maps every scale degree to a stability zone. The zone system aligns directly with di-chord harmonicity — Zone 1 notes are harmonic di-chords from the tonic, Zone 3 notes are non-harmonic or suspended.</P>

        <H3>Four Zones (Scale Degree Stability Ladder)</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Zone</th>
              <th className="px-3 py-2 text-left">Notes</th>
              <th className="px-3 py-2 text-left">Plogger Equivalent</th>
              <th className="px-3 py-2 text-left">Character</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2 font-bold text-green-700">Zone 1 (Sweet)</td><td className="px-3 py-2">1&#x0302;, 3&#x0302;, 5&#x0302;</td><td className="px-3 py-2"><BC>[0]</BC> <BC>[4]</BC> <BC>[7]</BC> — Harmonic</td><td className="px-3 py-2">Stable, resolved, home</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2 font-bold text-yellow-700">Zone 2 (Bitter)</td><td className="px-3 py-2">7&#x0302;, 2&#x0302;</td><td className="px-3 py-2"><BC>[11]</BC> <BC>[2]</BC> — Dissonant</td><td className="px-3 py-2">Mild tension, close to home</td></tr>
              <tr className="bg-white"><td className="px-3 py-2 font-bold text-orange-700">Zone 3 (Tense)</td><td className="px-3 py-2">4&#x0302;</td><td className="px-3 py-2"><BC>[5]</BC> — Perfect (suspended)</td><td className="px-3 py-2">Active tension, wants resolution</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2 font-bold text-purple-700">Zone 4 (Wildcard)</td><td className="px-3 py-2">6&#x0302; (LA)</td><td className="px-3 py-2"><BC>[9]</BC> — Modal harmonic</td><td className="px-3 py-2">Context-dependent — sweet or tense</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Two Questions</H3>
        <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
          <li>Is this note stable or unstable over the current chord?</li>
          <li>Is this the right amount of tension for this moment in the song?</li>
        </ol>

        <H3>Four Chord-Change Behaviors</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li><strong>Stay Sweet:</strong> Zone 1 note stays Zone 1 after chord change &#8594; continuity</li>
          <li><strong>Turn Tense:</strong> Zone 1 note becomes Zone 3 after chord change &#8594; surprise tension</li>
          <li><strong>Float Free:</strong> Move to 7&#x0302; or 2&#x0302; (Zone 2) that floats above most chords</li>
          <li><strong>Sink Deeper:</strong> Step into deeper tension zone across the chord change</li>
        </ul>

        <H3>5 Key Notes Framework</H3>
        <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>First Note</strong> — establishes zone immediately</li>
          <li><strong>Last Note</strong> — resolved (Z1) = closed phrase; open (Z2/3) = continuation needed</li>
          <li><strong>Highest Note</strong> — the peak of the arc (usually most tense)</li>
          <li><strong>Longest Note</strong> — duration amplifies whatever zone it occupies</li>
          <li><strong>Note on Beat 1</strong> — rhythmically strongest position</li>
        </ol>

        <H3>Pillar Notes + Backbone Notes</H3>
        <P>Pillars: structural chord tones defining the phrase framework. Backbone: stepwise connectors between pillars. Process: plan pillars &#8594; fill in backbone &#8594; ornament.</P>

        <H3>Tiny Tension Arc (The Hook Engine)</H3>
        <div className="my-4 p-4 rounded-xl bg-slate-800 text-white font-mono text-center text-lg tracking-widest">
          Z1 &#8594; Z1 &#8594; Z2 &#8594; Z1
        </div>
        <P>Two stable notes + one tension note + resolution = fundamental hook DNA.</P>

        <H3>Duration Amplifies Zone</H3>
        <P>Long note in Z3 = much more tension than short note in Z3. Long note in Z1 = deep resolution. Duration is a tension multiplier.</P>

        <H3>Zone Distribution Ratios by Section</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Section</th>
              <th className="px-3 py-2 text-center">Z1</th>
              <th className="px-3 py-2 text-center">Z2</th>
              <th className="px-3 py-2 text-center">Z3</th>
              <th className="px-3 py-2 text-center">Z4</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">Verse</td><td className="px-3 py-2 text-center">50%</td><td className="px-3 py-2 text-center">30%</td><td className="px-3 py-2 text-center">15%</td><td className="px-3 py-2 text-center">5%</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Chorus</td><td className="px-3 py-2 text-center">60%</td><td className="px-3 py-2 text-center">25%</td><td className="px-3 py-2 text-center">10%</td><td className="px-3 py-2 text-center">5%</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Bridge</td><td className="px-3 py-2 text-center">20%</td><td className="px-3 py-2 text-center">25%</td><td className="px-3 py-2 text-center">30%</td><td className="px-3 py-2 text-center">25%</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Pre-chorus</td><td className="px-3 py-2 text-center" colSpan={4}>Gradient between Bridge and Chorus</td></tr>
            </tbody>
          </table>
        </div>

        <H3>LA (6&#x0302;) as Emotional Wildcard</H3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
          <li>Over major chords: floaty, dreamy, bittersweet</li>
          <li>Over minor chords: brighter, more open</li>
          <li>Context-dependent — can serve either tension or release</li>
        </ul>

        <H3>8-Step Melody Audit</H3>
        <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
          <li>First note — what zone?</li>
          <li>Last note — resolved or open?</li>
          <li>Highest note — intentional peak?</li>
          <li>Longest note — right zone for the moment?</li>
          <li>Beat 1 notes throughout — serving the harmony?</li>
          <li>Zone distribution by section — match target ratios?</li>
          <li>Tension arcs — do phrases build and release?</li>
          <li>Chord-Change Behaviors — are changes doing anything melodically interesting?</li>
        </ol>

        <H3>Timed Mastery Benchmarks</H3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
          <li>Name a note&apos;s zone over a static chord: &lt;3 seconds</li>
          <li>Track zone shifts as chords move: real-time (no delay)</li>
          <li>Map zones of an 8-bar melody by ear: &lt;30 seconds</li>
        </ul>
      </section>

      {/* ── HARMONY CHAMBER ── */}
      <section id="harmony">
        <H2 id="harmony">Harmony Chamber</H2>
        <P>Source: Original AMF + classical theory + Plogger Ch.19&#8211;24.</P>

        <div className="my-4 p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500">
          <p className="font-semibold text-amber-900 mb-1">&#9888;&#65039; Reminder</p>
          <p className="text-slate-700 text-sm">ii-V-I is a DRILL VEHICLE, not the harmonic spine. The full 12+2 progression set is the harmonic spine. Never let any sprint collapse into ii-V-I focus.</p>
        </div>

        <H3>The 12+2 Core Progressions Spine</H3>

        <p className="text-sm font-semibold text-slate-600 mb-2 mt-4">Diatonic (9)</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Progression</th>
              <th className="px-3 py-2 text-left">Character</th>
              <th className="px-3 py-2 text-left">Sprint</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">1</td><td className="px-3 py-2">I-IV-V-I</td><td className="px-3 py-2">Fundamental cadence — universal</td><td className="px-3 py-2">Sprint 2</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">2</td><td className="px-3 py-2">I-V-vi-IV</td><td className="px-3 py-2">&ldquo;Four chord song&rdquo; — pop universal</td><td className="px-3 py-2">Sprint 2</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">3</td><td className="px-3 py-2">12-Bar Blues</td><td className="px-3 py-2">Blues — tension arc</td><td className="px-3 py-2">Sprint 3</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">4</td><td className="px-3 py-2">ii-V-I</td><td className="px-3 py-2">Jazz fundamental</td><td className="px-3 py-2">Sprint 4</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">5</td><td className="px-3 py-2">I-vi-IV-V</td><td className="px-3 py-2">&ldquo;50s progression&rdquo;</td><td className="px-3 py-2">Sprint 4</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">6</td><td className="px-3 py-2">vi-IV-I-V</td><td className="px-3 py-2">Minor-feels-major</td><td className="px-3 py-2">Sprint 5</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">7</td><td className="px-3 py-2">I-IV-I-V</td><td className="px-3 py-2">Gospel/soul</td><td className="px-3 py-2">Sprint 5</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">8</td><td className="px-3 py-2">Modal Vamp</td><td className="px-3 py-2">Static mode groove (Dorian, Mixolydian)</td><td className="px-3 py-2">Sprint 6</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">9</td><td className="px-3 py-2">Circle of Fifths descent</td><td className="px-3 py-2">Full diatonic cycle</td><td className="px-3 py-2">Sprint 6</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm font-semibold text-slate-600 mb-2 mt-4">Non-Diatonic (3)</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Progression</th>
              <th className="px-3 py-2 text-left">Character</th>
              <th className="px-3 py-2 text-left">Sprint</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">10</td><td className="px-3 py-2">i-IV-i-V (harmonic minor)</td><td className="px-3 py-2">Raised 7&#x0302; &#8594; major IV in minor</td><td className="px-3 py-2">Sprint 7</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">11</td><td className="px-3 py-2">Andalusian Cadence: i-&#x266D;VII-&#x266D;VI-V</td><td className="px-3 py-2">Phrygian flavor, Spanish</td><td className="px-3 py-2">Sprint 7</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">12</td><td className="px-3 py-2">Minor ii-V-i (&#x00F8;7 - V7alt - i)</td><td className="px-3 py-2">Jazz minor</td><td className="px-3 py-2">Sprint 8</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm font-semibold text-slate-600 mb-2 mt-4">Classical Additions (2)</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Progression</th>
              <th className="px-3 py-2 text-left">Character</th>
              <th className="px-3 py-2 text-left">Sprint</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">13</td><td className="px-3 py-2">Classical cadence with voice leading</td><td className="px-3 py-2">Strict 4-part I-IV-V-I</td><td className="px-3 py-2">Sprint 9</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">14</td><td className="px-3 py-2">Neapolitan/&#x266D;II: I-&#x266D;II-V-I</td><td className="px-3 py-2">Chromatic surprise, Romantic</td><td className="px-3 py-2">Sprint 9</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Non-Diatonic Note Callout</H3>
        <div className="my-4 p-4 rounded-xl bg-purple-50 border-l-4 border-purple-500">
          <p className="font-semibold text-purple-900 mb-1">Non-Diatonic Note</p>
          <p className="text-slate-700 text-sm">Whenever a non-diatonic note or progression appears: identify what it is, explain why it sounds that way in di-chord terms (which di-chord number changes), and connect it to the Heptachord Shift concept from Ch.24. Non-diatonic notes borrow from parallel modes or alter existing scale degrees — the di-chord number shifts accordingly.</p>
        </div>

        <H3>Four-Dimension Framework</H3>
        <P>Every harmonic moment has 4 dimensions:</P>
        <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>Root motion</strong> — bass movement (step, leap, fifth, chromatic)</li>
          <li><strong>Chord quality</strong> — via di-chords (major <BC>[4][3]</BC>, minor <BC>[3][4]</BC>, dom7 <BC>[4][3][3]</BC>, etc.)</li>
          <li><strong>Voicing</strong> — which notes, which register, which hand</li>
          <li><strong>Rhythm</strong> — when the change occurs (harmonic rhythm)</li>
        </ol>

        <H3>Harmonic Rhythm</H3>
        <P>How often chords change = primary driver of energy. Fast harmonic rhythm = propulsion, urgency. Slow harmonic rhythm = spaciousness, groove. Harmonic rhythm is an independent compositional parameter — separate from melody rhythm and drum groove.</P>
      </section>

      {/* ── VOICINGS CHAMBER ── */}
      <section id="voicings">
        <H2 id="voicings">Voicings Chamber</H2>
        <P>Source: Original AMF + Plogger Ch.20&#8211;22 + piano/guitar technique research. Secondary: The Beato Book 2.3.</P>

        <H3>Core Voicing Principles</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li><strong>Voice leading:</strong> smallest possible interval movement between chord changes</li>
          <li><strong>Common tones:</strong> hold shared notes in place across chord changes</li>
          <li><strong>Open vs. closed:</strong> open/spread voicings = larger intervals, orchestral feel; closed/within-octave = dense, intimate</li>
          <li><strong>Register:</strong> bass voice below middle C; melody always in highest voice</li>
        </ul>

        <H3>Voicing Types</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Instrument</th>
              <th className="px-3 py-2 text-left">Sprint</th>
              <th className="px-3 py-2 text-left">Beato Reference</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">Root position triads</td><td className="px-3 py-2">1-3-5</td><td className="px-3 py-2">Both</td><td className="px-3 py-2">Sprint 1</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Triad inversions</td><td className="px-3 py-2">1st and 2nd inversion</td><td className="px-3 py-2">Both</td><td className="px-3 py-2">Sprint 1</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Triad shapes by stringset</td><td className="px-3 py-2">All inversions, all 4 stringsets</td><td className="px-3 py-2">Guitar</td><td className="px-3 py-2">Sprint 4</td><td className="px-3 py-2">pp.93&#8211;100</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Shell voicings</td><td className="px-3 py-2">Root + 3rd + 7th (no 5th)</td><td className="px-3 py-2">Piano</td><td className="px-3 py-2">Sprint 6</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Drop-2 voicings</td><td className="px-3 py-2">2nd voice from top dropped an octave</td><td className="px-3 py-2">Piano/Guitar</td><td className="px-3 py-2">Sprint 7</td><td className="px-3 py-2">pp.101&#8211;115</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Quartal voicings (3-part)</td><td className="px-3 py-2">Stacked perfect fourths, 3 voices</td><td className="px-3 py-2">Guitar</td><td className="px-3 py-2">Sprint 8</td><td className="px-3 py-2">pp.215&#8211;219</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Open voicings</td><td className="px-3 py-2">Root in bass, spread across register</td><td className="px-3 py-2">Both</td><td className="px-3 py-2">Sprint 8</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Rootless voicings Type A</td><td className="px-3 py-2">3-5-7-9</td><td className="px-3 py-2">Piano</td><td className="px-3 py-2">Sprint 10</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Rootless voicings Type B</td><td className="px-3 py-2">7-9-3-5</td><td className="px-3 py-2">Piano</td><td className="px-3 py-2">Sprint 10</td><td className="px-3 py-2">&#8212;</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Extended voicings</td><td className="px-3 py-2">Add 9ths, 11ths, 13ths</td><td className="px-3 py-2">Both</td><td className="px-3 py-2">Sprint 11</td><td className="px-3 py-2">pp.268&#8211;271</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Guitar-Specific: CAGED System</H3>
        <P>All major chords expressed in 5 shapes (C, A, G, E, D forms) across the neck. CAGED + triad inversions on all string sets = complete guitar voicing vocabulary. Each CAGED position interlocks with adjacent positions — mastering the connection points is the key skill.</P>

        <H3>Di-Chord Analysis of Voicings</H3>
        <P>Every voicing is a stack of di-chords. Closed voicings with <BC>[1]</BC> <BC>[2]</BC> intervals = dissonant/tense. Spread voicings with <BC>[4]</BC> <BC>[7]</BC> intervals = open/balanced. Inversions shift which di-chords occupy the primary (lowest) register, changing the overall color even though the chord label is identical.</P>
      </section>

      {/* ── RHYTHM CHAMBER ── */}
      <section id="rhythm">
        <H2 id="rhythm">Rhythm Chamber</H2>
        <P>Source: The Rhythm Code by Tamas Bodzsar + Plogger Longy Rhythms (Ch.4).</P>

        <H3>Fundamental Principle</H3>
        <div className="my-4 p-4 rounded-xl bg-slate-800 text-white font-mono text-center text-lg tracking-widest">
          Rhythm = starting points, NOT duration values.
        </div>
        <P>The Rhythm Code teaches rhythm as a map of when notes start — not how long they last. Duration emerges from the next starting point. This reframe unlocks groove immediately.</P>

        <H3>Binary Grid</H3>
        <P>8 positions per measure in 4/4. Each position corresponds to: Beat 1, and-of-1, Beat 2, and-of-2, Beat 3, and-of-3, Beat 4, and-of-4. Positions are numbered 1&#8211;8. All rhythmic decisions are choosing which positions to activate.</P>

        <H3>Stops = Landing Points</H3>
        <P>The last note before a rest is a <strong>stop</strong>. Stops are the most important notes rhythmically — they define the rhythmic shape of a phrase. Where you land matters more than where you start.</P>

        <H3>Anticipations</H3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>Regular anticipation:</strong> note starts 1/8th note early (anticipates the beat)</li>
          <li><strong>Quarter-note anticipation:</strong> note starts 1/4 note early — ONLY valid from Beat 4</li>
        </ul>

        <H3>Son Clave</H3>
        <P>5-note, 2-measure rhythmic pattern. The rhythmic backbone of Afro-Cuban and much contemporary groove music. Two orientations:</P>
        <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>3-2 orientation:</strong> 3 notes in bar 1, 2 notes in bar 2</li>
          <li><strong>2-3 orientation:</strong> 2 notes in bar 1, 3 notes in bar 2</li>
        </ul>

        <H3>Rhythm Code Map</H3>
        <P>16-position guide (2 measures &#215; 8 positions). Positions are classified as Strong (safe landing/start points), Medium (usable with care), or Avoid (rhythmically awkward without specific intent). The map guides groove decisions before any notation is involved.</P>

        <H3>4-Step Groove Development</H3>
        <ol className="list-decimal list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>Start boring</strong> — quarter notes only, all 4 beats</li>
          <li><strong>Add anticipations</strong> — shift selected notes 1/8 early</li>
          <li><strong>Add stops</strong> — insert rests to create landing shapes</li>
          <li><strong>Sync with clave</strong> — align groove pattern to son clave skeleton</li>
        </ol>

        <H3>Longy + Rhythm Code Integration</H3>
        <P>Longy Rhythms (Plogger Ch.4) = notation level: &ldquo;what rhythm is this?&rdquo; — reading, speaking, and clapping rhythmic patterns from notation. Rhythm Code = groove level: &ldquo;does it feel good?&rdquo; — the starting-point map, anticipations, stops, clave. Both are present from Sprint 1 in separate roles and reinforce each other as fluency builds.</P>
      </section>

      {/* ── THE SYNTHESIZER ── */}
      <section id="synthesizer">
        <H2 id="synthesizer">The Synthesizer</H2>
        <P>The Synthesizer is where the four chambers combine into complete musical events. It is not a fifth chamber — it is the integration layer where Melody + Harmony + Voicings + Rhythm operate simultaneously.</P>

        <H3>Cross-Chamber Work Types</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li><strong>Melody + Harmony:</strong> zone tracking through chord changes — same melody note, different zone as chord moves beneath it</li>
          <li><strong>Voicings + Melody:</strong> voicing choices that support, contrast, or frame the melody voice</li>
          <li><strong>Rhythm + Harmony:</strong> groove patterns vs. harmonic rhythm — do they align or create polyrhythmic tension?</li>
          <li><strong>All Four:</strong> complete arrangements where all chambers are active and responsive to each other</li>
        </ul>

        <H3>The &ldquo;Framework Disappears&rdquo; Goal</H3>
        <div className="my-4 p-4 rounded-xl bg-green-50 border-l-4 border-green-500">
          <p className="font-semibold text-green-900 mb-1">Ultimate Destination</p>
          <p className="text-slate-700 text-sm">The learner no longer thinks in terms of chambers or systems. They just make music. The framework has been internalized so thoroughly it becomes invisible. Explicitly stated as the system goal in the final Synthesizer chapters.</p>
        </div>

        <H3>Classical Intuition Thread</H3>
        <P>Running through Synthesizer chapters. Builds toward classical harmonic sensibility integrated into personal style. The goal is not &ldquo;learn classical&rdquo; but integrate classical harmonic thinking into fluid improvisation.</P>

        <p className="text-sm font-semibold text-slate-600 mb-2 mt-2">Listening references:</p>
        <ul className="list-disc list-inside space-y-1 mb-4 text-slate-700">
          <li><strong>Piano:</strong> Chilly Gonzales, Brad Mehldau (After Bach), Tigran Hamasyan, Nils Frahm, V&#237;kingur &#211;lafsson</li>
          <li><strong>Guitar:</strong> Sergio Assad, Andy McKee</li>
        </ul>
      </section>

      {/* ── 12-SPRINT MAP ── */}
      <section id="sprint-map">
        <H2 id="sprint-map">12-Sprint Map</H2>

        <H3>User Profile</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Dimension</th>
              <th className="px-3 py-2 text-left">Guitar</th>
              <th className="px-3 py-2 text-left">Piano</th>
              <th className="px-3 py-2 text-left">Theory</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2 font-semibold">Level</td><td className="px-3 py-2">Returning Intermediate</td><td className="px-3 py-2">Advanced Beginner</td><td className="px-3 py-2">Intermediate knowledge</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2 font-semibold">Background</td><td className="px-3 py-2">Played heavily in high school, 20-year gap</td><td className="px-3 py-2">Some playing, knows inversions + voice economy</td><td className="px-3 py-2">&ldquo;Knows more than he can execute&rdquo;</td></tr>
              <tr className="bg-white"><td className="px-3 py-2 font-semibold">Strengths</td><td className="px-3 py-2">Fretboard knowledge, barre chords, chord theory</td><td className="px-3 py-2">Already applies voice economy, knows inversions</td><td className="px-3 py-2">Knows modes, diatonic harmony, intervals</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2 font-semibold">Needs</td><td className="px-3 py-2">Rebuild muscle memory, fluency, Travis picking</td><td className="px-3 py-2">Build technique foundation, LH independence</td><td className="px-3 py-2">Reframe in Plogger language</td></tr>
            </tbody>
          </table>
        </div>

        <H3>12-Sprint Anchor Song Map</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Sprint</th>
              <th className="px-3 py-2 text-left">Month</th>
              <th className="px-3 py-2 text-left">Anchor Song</th>
              <th className="px-3 py-2 text-left">Artist</th>
              <th className="px-3 py-2 text-left">Key/Mode</th>
              <th className="px-3 py-2 text-left">Primary Chord Color</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">1</td><td className="px-3 py-2">1</td><td className="px-3 py-2">Ain&apos;t No Sunshine</td><td className="px-3 py-2">Bill Withers</td><td className="px-3 py-2">A minor</td><td className="px-3 py-2">i-IV-i (minor feel)</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">2</td><td className="px-3 py-2">2</td><td className="px-3 py-2">Autumn Leaves</td><td className="px-3 py-2">Jazz standard</td><td className="px-3 py-2">G major / E minor</td><td className="px-3 py-2">ii-V-I + minor ii-V-i</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">3</td><td className="px-3 py-2">3</td><td className="px-3 py-2">The Girl from Ipanema</td><td className="px-3 py-2">Jobim</td><td className="px-3 py-2">F major</td><td className="px-3 py-2">Ionian + chromatic shifts</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">4</td><td className="px-3 py-2">4</td><td className="px-3 py-2">Superstition</td><td className="px-3 py-2">Stevie Wonder</td><td className="px-3 py-2">Eb Dorian</td><td className="px-3 py-2">Modal vamp, Dorian</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">5</td><td className="px-3 py-2">5</td><td className="px-3 py-2">What&apos;s Going On</td><td className="px-3 py-2">Marvin Gaye</td><td className="px-3 py-2">Eb major</td><td className="px-3 py-2">Modal soul</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">6</td><td className="px-3 py-2">6</td><td className="px-3 py-2">Hallelujah</td><td className="px-3 py-2">Leonard Cohen</td><td className="px-3 py-2">C major</td><td className="px-3 py-2">I-V-vi-IV, gospel</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">7</td><td className="px-3 py-2">7</td><td className="px-3 py-2">Summertime</td><td className="px-3 py-2">Gershwin</td><td className="px-3 py-2">B minor / D major</td><td className="px-3 py-2">Dorian + harmonic minor</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">8</td><td className="px-3 py-2">8</td><td className="px-3 py-2">My Funny Valentine</td><td className="px-3 py-2">Rodgers &amp; Hart</td><td className="px-3 py-2">C minor</td><td className="px-3 py-2">Chromatic descending bass</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">9</td><td className="px-3 py-2">9</td><td className="px-3 py-2">Just the Two of Us</td><td className="px-3 py-2">Withers/Washington</td><td className="px-3 py-2">B major</td><td className="px-3 py-2">ii-V-I jazz-pop hybrid</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">10</td><td className="px-3 py-2">10</td><td className="px-3 py-2">Watermelon Man</td><td className="px-3 py-2">Herbie Hancock</td><td className="px-3 py-2">F</td><td className="px-3 py-2">Blues + Mixolydian</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">11</td><td className="px-3 py-2">11</td><td className="px-3 py-2">Blackbird</td><td className="px-3 py-2">The Beatles</td><td className="px-3 py-2">G major</td><td className="px-3 py-2">Fingerpicking, chromatic</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">12</td><td className="px-3 py-2">12</td><td className="px-3 py-2">I Will Always Love You</td><td className="px-3 py-2">Houston/Parton</td><td className="px-3 py-2">Ab major</td><td className="px-3 py-2">I-IV-V power ballad</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Plogger Chapter Progression by Sprint</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Sprint</th>
              <th className="px-3 py-2 text-left">Plogger Chapters</th>
              <th className="px-3 py-2 text-left">Key New Concept</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">1</td><td className="px-3 py-2">Ch.1, Ch.2, Ch.3 (start)</td><td className="px-3 py-2">Three Stages, Three Causes, Keyboard Viz intro</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">2</td><td className="px-3 py-2">Ch.3 (complete), Ch.4</td><td className="px-3 py-2">Keyboard Viz mastery, Longy Rhythms full</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">3</td><td className="px-3 py-2">Ch.5, Ch.6</td><td className="px-3 py-2">Lap Map, Pythagorean Ordering</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">4</td><td className="px-3 py-2">Ch.7, Ch.8, Ch.9 (start)</td><td className="px-3 py-2">Interval Spelling, Di-Chord Numbers intro</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">5</td><td className="px-3 py-2">Ch.9 (complete), Ch.10, Ch.11</td><td className="px-3 py-2">Di-Chord system complete, Pulsation</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">6</td><td className="px-3 py-2">Ch.12, Ch.13, Ch.14</td><td className="px-3 py-2">F/O Factor, Harmonicity, Di-Chord Review</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">7</td><td className="px-3 py-2">Ch.15, Ch.16 (Steps 1&#8211;3)</td><td className="px-3 py-2">Melodic Gestures, Tracking Page intro</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">8</td><td className="px-3 py-2">Ch.17, Ch.18, Ch.16 (Steps 4&#8211;5)</td><td className="px-3 py-2">Tri-Chords, Tetrachords, Tracking Page deep</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">9</td><td className="px-3 py-2">Ch.19, Ch.20</td><td className="px-3 py-2">Diatonic Modes, Heptachord Formation</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">10</td><td className="px-3 py-2">Ch.21, Ch.22</td><td className="px-3 py-2">Triads+Inversions, Four 7th Chords</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">11</td><td className="px-3 py-2">Ch.23, Ch.24, Ch.16 (all 7 steps)</td><td className="px-3 py-2">Scale Degree Harmonization, Heptachord Shift</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">12</td><td className="px-3 py-2">Ch.25, Full Review</td><td className="px-3 py-2">Transposition, Complete Tracking Page</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Milestone Checkpoints</H3>

        <div className="space-y-4 mb-6">
          <div className="bg-green-50 border-l-4 border-green-500 pl-4 py-3 rounded-r">
            <p className="font-semibold text-green-900 mb-1">Month 1</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Play &ldquo;Ain&apos;t No Sunshine&rdquo; on both instruments</li>
              <li>Instantly name major vs. minor quality by ear (<BC>[4]</BC> vs <BC>[3]</BC>)</li>
              <li>Know all Keyboard Visualization landmarks</li>
              <li>Understand Three Stages and Three Causes</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r">
            <p className="font-semibold text-blue-900 mb-1">Month 3</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Play first 3 anchor songs comfortably on both instruments</li>
              <li>Name any di-chord <BC>[1]</BC>&#8211;<BC>[7]</BC> by ear</li>
              <li>Improvise over A minor pentatonic on both instruments</li>
              <li>Lap Map fluent (any tetrachord from any note)</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 pl-4 py-3 rounded-r">
            <p className="font-semibold text-purple-900 mb-1">Month 6</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Play first 6 anchor songs from memory</li>
              <li>Identify all 11 di-chords by ear</li>
              <li>Shell voicing ii-V-I in 5 keys (piano)</li>
              <li>Travis picking at 80 BPM on 4-chord loop (guitar)</li>
              <li>Tracking Page Steps 1&#8211;2 fluent at 120+ BPM</li>
            </ul>
          </div>

          <div className="bg-slate-800 border-l-4 border-slate-500 pl-4 py-3 rounded-r">
            <p className="font-semibold text-white mb-1">Month 12</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
              <li>All 12 anchor songs from memory at tempo in front of someone without stopping</li>
              <li>Identify Heptachord Shifts in real music</li>
              <li>Improvise over any of 12 core progressions on both instruments</li>
              <li>Tracking Page all 7 steps at 144/72 BPM</li>
              <li>Name any scale degree&apos;s di-chord profile instantly in any mode</li>
            </ul>
          </div>
        </div>

        <H3>Three Definitions of Done</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Definition</th>
              <th className="px-3 py-2 text-left">Criteria</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2 font-semibold">Mastery</td><td className="px-3 py-2">9/10 correct, no hesitation, at target speed (144 BPM melody / 72 BPM chords)</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2 font-semibold">Progressive</td><td className="px-3 py-2">Measurable improvement from start to end of sprint</td></tr>
              <tr className="bg-white"><td className="px-3 py-2 font-semibold">Performance Ready</td><td className="px-3 py-2">Complete song from memory, at tempo, in front of someone, without stopping</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── GUITAR TECHNIQUE ── */}
      <section id="guitar">
        <H2 id="guitar">Guitar Technique</H2>
        <P><strong>User Level: Returning Intermediate.</strong> Sprint 1 = reconnection and rebuilding, NOT basics. Expect Reaction errors (fluency lost, not knowledge lost). Muscle memory returns faster than for a true beginner.</P>

        <H3>Core Guitar Technical Principles</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li>Thumb independence must be automatic before fingers are added</li>
          <li><strong>Right-hand position:</strong> sweet spot = 1&rdquo; behind sound hole (toward bridge = bright/percussive, toward neck = warm/dark)</li>
          <li><strong>Tone production:</strong> on acoustic every nuance matters — right-hand position, nail/flesh ratio, angle all contribute</li>
          <li>Chord transitions always timed to metronome — never stop to &ldquo;get it right&rdquo;</li>
          <li><strong>Nail/flesh ratio:</strong> 60/40 nail-to-flesh = all-purpose tone</li>
          <li><strong>Barre chords:</strong> roll index to bony side, thumb behind middle finger</li>
        </ul>

        <H3>Technical Progression by Sprint</H3>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 1&#8211;3 (Reconnection)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Posture reset, open chord shapes</li>
              <li>Alternating bass (thumb on strings 4&#8211;5&#8211;6 only)</li>
              <li>Basic fingerpicking p-i-m, p-i-m-a arpeggio</li>
              <li>Reactivating barre chords E/A-form at 50 BPM</li>
              <li>Tone production awareness</li>
              <li>A minor pentatonic box 1</li>
              <li>Strumming D-DU-UDU</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 4&#8211;6 (Intermediate)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Travis picking: Stage 1 (thumb only) &#8594; Stage 2 (add index beats 2+4) &#8594; Stage 3 (full syncopated treble)</li>
              <li>CAGED system (all 5 positions G major, then A major)</li>
              <li>Barre chord fluency all 12 keys</li>
              <li>Chord inversions — triads on strings 1-2-3</li>
              <li>Legato hammer-ons/pull-offs</li>
              <li>Connect 5 pentatonic boxes</li>
              <li>Strumming dynamics — right-hand control only</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 7&#8211;9 (Intermediate-Advanced)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Travis picking melodic variations</li>
              <li>CAGED fluent in 6+ keys</li>
              <li>Voice-leading between chord shapes</li>
              <li>Chord melody</li>
              <li>3-notes-per-string scales</li>
              <li>Hybrid picking</li>
              <li>Fingerstyle arrangement building</li>
              <li>Crosspicking introduction</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 10&#8211;12 (Integration)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Sight-reading</li>
              <li>CAGED all 12 keys</li>
              <li>Full solo arrangement building</li>
              <li>Improvisation vocabulary development</li>
              <li>Fretboard mastery — all notes, all strings</li>
            </ul>
          </div>
        </div>

        <H3>Essential Guitar Exercise Types</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Exercise Type</th>
              <th className="px-3 py-2 text-left">What It Trains</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">Alternating bass only (no fingers)</td><td className="px-3 py-2">Thumb independence</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">p-i-m-a arpeggio on 4-chord loop</td><td className="px-3 py-2">Fingerpicking coordination</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Chord transitions timed to metronome</td><td className="px-3 py-2">Muscle memory, tempo</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Di-chord naming while playing chord</td><td className="px-3 py-2">Plogger integration</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">CAGED shape navigation</td><td className="px-3 py-2">Fretboard fluency</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Sing root before playing chord change</td><td className="px-3 py-2">Audiation/ear training</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Improv prompt over anchor song vamp</td><td className="px-3 py-2">Creative + technical integration</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PIANO TECHNIQUE ── */}
      <section id="piano">
        <H2 id="piano">Piano Technique</H2>
        <P><strong>User Level: Advanced Beginner.</strong> Already knows chord shapes, inversions, voice economy. Needs: technique foundation, LH independence, scale/heptachord fluency at speed.</P>

        <H3>Core Piano Technical Principles</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li>No Hanon — heptachord conjunct formation replaces it</li>
          <li>Tension check every session (wrists free, shoulders dropped, arms loose)</li>
          <li>Scales via Plogger conjunct arrangement (not traditional fingering)</li>
          <li>LH and RH separately when learning anything new</li>
          <li>Sing every note during heptachord practice</li>
          <li>Legato pedaling (not direct): play note &#8594; immediately depress pedal &#8594; release with each harmony change</li>
          <li>Improvisation from Sprint 2, not Sprint 9</li>
        </ul>

        <H3>Technical Progression by Sprint</H3>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 1&#8211;3 (Foundation)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Hand position setup</li>
              <li>Conjunct heptachord formation — A minor and C major first</li>
              <li>Di-chord to finger mapping</li>
              <li>Chord transitions Am-Dm-E7 / C-F-G using inversions</li>
              <li>LH patterns: single bass &#8594; blocked chords &#8594; simple Alberti (root-5th-3rd-5th)</li>
              <li>Two-hand coordination</li>
              <li>Ear training at keyboard</li>
              <li>Improvisation Stage 1: chord tone soloing over Am drone (from Sprint 2)</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 4&#8211;6 (Early Intermediate)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>All 12 major heptachords conjunct both hands</li>
              <li>Harmonic and melodic minor in primary keys</li>
              <li>Arpeggios — major/minor triads all inversions in circle of 5ths outward</li>
              <li>Shell voicings ii-V-I in 5 keys</li>
              <li>Alberti bass under RH melody</li>
              <li>Legato pedaling</li>
              <li>Hand independence: LH quarters under RH eighths</li>
              <li>Tracking Page Steps 1&#8211;2 at keyboard</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 7&#8211;9 (Intermediate)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>All 7 modes conjunct beginning in C and A</li>
              <li>All 7 modes in all 12 roots</li>
              <li>Arpeggios all chord types 2 octaves</li>
              <li>Shell voicings all 12 keys</li>
              <li>Walking bass</li>
              <li>Drop-2 voicings</li>
              <li>Bach Two-Part Inventions</li>
              <li>Tracking Page Steps 3&#8211;5</li>
              <li>Improvisation Stages 2&#8211;3: pentatonic &#8594; blues &#8594; mode-matched</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-semibold text-slate-800 mb-2">Sprints 10&#8211;12 (Intermediate-Advanced)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>Rootless voicings Type A (3-5-7-9) and Type B (7-9-3-5)</li>
              <li>Stride bass (simplified: root on 1, chord on 2-3-4)</li>
              <li>Complex hand independence</li>
              <li>Burgm&#252;ller op.100 etudes (NO Hanon, NO Czerny)</li>
              <li>Sight-reading Grade 3&#8211;4</li>
              <li>Improvisation Stages 4&#8211;6: approach notes, enclosures, lick vocabulary all 12 keys</li>
              <li>Full song performance (one classical + one jazz standard)</li>
            </ul>
          </div>
        </div>

        <H3>Essential Piano Exercise Types</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">Exercise Type</th>
              <th className="px-3 py-2 text-left">What It Trains</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">Conjunct heptachord formation</td><td className="px-3 py-2">Plogger + scale + finger mapping + ear</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Chord transitions with inversions timed</td><td className="px-3 py-2">Voice economy, muscle memory</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">LH pattern + RH chord simultaneously</td><td className="px-3 py-2">Hand independence</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Di-chord naming while playing chord</td><td className="px-3 py-2">Plogger integration</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Shell voicing ii-V-I</td><td className="px-3 py-2">Harmonic realization</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Tracking Page steps</td><td className="px-3 py-2">Real-time analysis fluency</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">Chord tone improv over drone</td><td className="px-3 py-2">Audiation + improvisation</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">Sing each heptachord note before playing</td><td className="px-3 py-2">Ear training + audiation</td></tr>
            </tbody>
          </table>
        </div>

        <H3>Adult Learner Specifics</H3>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li>Motor pattern rewiring is harder than for children — isolation before combination always</li>
          <li>Tension accumulates faster — constant tension check especially during chord work</li>
          <li>Adults grasp &ldquo;why&rdquo; faster — always explain the musical reason behind each exercise</li>
          <li>Adults demotivate without visible progress — explicit milestone markers every sprint</li>
          <li>Hand independence is the biggest challenge — expect months 1&#8211;4 to feel awkward</li>
        </ul>
      </section>

      {/* ── REPERTOIRE ── */}
      <section id="repertoire">
        <H2 id="repertoire">Repertoire</H2>

        <H3>20-Song Repertoire</H3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-slate-800 text-white">
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Song</th>
              <th className="px-3 py-2 text-left">Artist</th>
              <th className="px-3 py-2 text-left">Key</th>
              <th className="px-3 py-2 text-left">Primary Harmony</th>
              <th className="px-3 py-2 text-left">Sprint</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-white"><td className="px-3 py-2">1</td><td className="px-3 py-2">Ain&apos;t No Sunshine</td><td className="px-3 py-2">Bill Withers</td><td className="px-3 py-2">A minor</td><td className="px-3 py-2">i-IV-i, harmonic minor feel</td><td className="px-3 py-2">Sprint 1</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">2</td><td className="px-3 py-2">Autumn Leaves</td><td className="px-3 py-2">Jazz standard</td><td className="px-3 py-2">G / E minor</td><td className="px-3 py-2">ii-V-I + minor ii-V-i</td><td className="px-3 py-2">Sprint 2</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">3</td><td className="px-3 py-2">The Girl from Ipanema</td><td className="px-3 py-2">Jobim</td><td className="px-3 py-2">F major</td><td className="px-3 py-2">Ionian + chromatic shifts</td><td className="px-3 py-2">Sprint 3</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">4</td><td className="px-3 py-2">Superstition</td><td className="px-3 py-2">Stevie Wonder</td><td className="px-3 py-2">Eb Dorian</td><td className="px-3 py-2">Dorian modal vamp</td><td className="px-3 py-2">Sprint 4</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">5</td><td className="px-3 py-2">What&apos;s Going On</td><td className="px-3 py-2">Marvin Gaye</td><td className="px-3 py-2">Eb</td><td className="px-3 py-2">Modal soul harmony</td><td className="px-3 py-2">Sprint 5</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">6</td><td className="px-3 py-2">Hallelujah</td><td className="px-3 py-2">Leonard Cohen</td><td className="px-3 py-2">C</td><td className="px-3 py-2">I-V-vi-IV, gospel feel</td><td className="px-3 py-2">Sprint 6</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">7</td><td className="px-3 py-2">Summertime</td><td className="px-3 py-2">Gershwin</td><td className="px-3 py-2">B minor</td><td className="px-3 py-2">Dorian + harmonic minor</td><td className="px-3 py-2">Sprint 7</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">8</td><td className="px-3 py-2">My Funny Valentine</td><td className="px-3 py-2">Rodgers &amp; Hart</td><td className="px-3 py-2">C minor</td><td className="px-3 py-2">Chromatic descending bass</td><td className="px-3 py-2">Sprint 8</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">9</td><td className="px-3 py-2">Just the Two of Us</td><td className="px-3 py-2">Withers/Washington</td><td className="px-3 py-2">B major</td><td className="px-3 py-2">ii-V-I jazz-pop hybrid</td><td className="px-3 py-2">Sprint 9</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">10</td><td className="px-3 py-2">Watermelon Man</td><td className="px-3 py-2">Herbie Hancock</td><td className="px-3 py-2">F</td><td className="px-3 py-2">Blues + Mixolydian</td><td className="px-3 py-2">Sprint 10</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">11</td><td className="px-3 py-2">Blackbird</td><td className="px-3 py-2">The Beatles</td><td className="px-3 py-2">G</td><td className="px-3 py-2">Fingerpicking, chromatic bass</td><td className="px-3 py-2">Sprint 11</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">12</td><td className="px-3 py-2">I Will Always Love You</td><td className="px-3 py-2">Houston/Parton</td><td className="px-3 py-2">Ab</td><td className="px-3 py-2">I-IV-V power ballad</td><td className="px-3 py-2">Sprint 12</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">13</td><td className="px-3 py-2">Under the Bridge</td><td className="px-3 py-2">RHCP</td><td className="px-3 py-2">E major</td><td className="px-3 py-2">Lydian &#8594; various</td><td className="px-3 py-2">Textbook Ch.13</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">14</td><td className="px-3 py-2">Don&apos;t Know Why</td><td className="px-3 py-2">Norah Jones</td><td className="px-3 py-2">Bb</td><td className="px-3 py-2">Jazz-pop ii-V-I</td><td className="px-3 py-2">Textbook Ch.14</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">15</td><td className="px-3 py-2">Feeling Good</td><td className="px-3 py-2">Nina Simone</td><td className="px-3 py-2">D minor</td><td className="px-3 py-2">Modal minor</td><td className="px-3 py-2">Textbook Ch.15</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">16</td><td className="px-3 py-2">Yesterday</td><td className="px-3 py-2">The Beatles</td><td className="px-3 py-2">F major</td><td className="px-3 py-2">Non-diatonic chromatic</td><td className="px-3 py-2">Textbook Ch.16</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">17</td><td className="px-3 py-2">High and Dry</td><td className="px-3 py-2">Radiohead</td><td className="px-3 py-2">A major</td><td className="px-3 py-2">Indie harmonic language</td><td className="px-3 py-2">Textbook Ch.17</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">18</td><td className="px-3 py-2">Fly Me to the Moon</td><td className="px-3 py-2">Bart Howard</td><td className="px-3 py-2">C</td><td className="px-3 py-2">ii-V-I jazz standard</td><td className="px-3 py-2">Textbook Ch.18</td></tr>
              <tr className="bg-white"><td className="px-3 py-2">19</td><td className="px-3 py-2">Stand by Me</td><td className="px-3 py-2">Ben E. King</td><td className="px-3 py-2">A</td><td className="px-3 py-2">I-vi-IV-V classic</td><td className="px-3 py-2">Workshop</td></tr>
              <tr className="bg-slate-50"><td className="px-3 py-2">20</td><td className="px-3 py-2">La Vie en Rose</td><td className="px-3 py-2">&#201;dith Piaf</td><td className="px-3 py-2">C</td><td className="px-3 py-2">French chanson, chromatic</td><td className="px-3 py-2">Workshop</td></tr>
            </tbody>
          </table>
        </div>

        <P><strong>Oddball deep cuts for later exploration:</strong> Corcovado, Nature Boy, Mercy Street, Suzanne, Misty, Scarborough Fair, Lean on Me.</P>
      </section>

    </div>
  )
}

export default function PloggerPage() {
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { font-size: 11pt; }
          h2 { page-break-after: avoid; }
          table { page-break-inside: avoid; }
        }
      `}</style>

      {/* Hero Header */}
      <div className="bg-[#0f172a] text-white py-10 px-6 no-print">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Plogger Method — Complete Reference</h1>
          <p className="text-slate-400 text-sm">
            Marianne Ploger &middot; Blair School of Music &middot; Vanderbilt University &middot; Musical OS of the AMF
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => window.print()}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition-colors"
            >
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Rainbow Rule */}
      <div
        className="h-1 w-full no-print"
        style={{
          background: 'linear-gradient(90deg, #922B21, #5B2C6F, #1E8449, #1a5a8a)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-8">

        {/* Desktop Sidebar TOC */}
        <aside className="hidden lg:block w-[220px] flex-shrink-0 no-print">
          <div className="sticky top-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Contents</p>
            <nav className="space-y-0.5 max-h-[80vh] overflow-y-auto pr-2">
              {tocEntries.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2 py-1 rounded transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile TOC Toggle */}
        <div className="lg:hidden w-full mb-4 no-print">
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="w-full text-left text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded transition-colors"
          >
            {tocOpen ? '▲ Hide Contents' : '▼ Show Contents'}
          </button>
          {tocOpen && (
            <nav className="mt-2 bg-white border border-slate-200 rounded shadow-sm p-3 grid grid-cols-2 gap-x-4 gap-y-0.5">
              {tocEntries.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setTocOpen(false)}
                  className="block text-xs text-slate-600 hover:text-slate-900 py-0.5"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <PloggerContent />
        </main>
      </div>
    </>
  )
}
