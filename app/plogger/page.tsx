'use client'

import { useState } from 'react'
import DiChordPictograph, { DiChordBadge } from '@/app/DiChordPictograph'
import PulsationViz from '@/app/audio/ear-training/components/PulsationViz'
import FOFactorViz from '@/app/audio/ear-training/components/FOFactorViz'
import HarmonicityViz from '@/app/audio/ear-training/components/HarmonicityViz'
import { DICHORDS } from '@/lib/audio'

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-slate-800 mb-3 mt-12 border-b border-slate-200 pb-2 scroll-mt-24">{children}</h2>
)

const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-bold text-slate-700 mb-2 mt-8 scroll-mt-24">{children}</h3>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-700 leading-relaxed mb-4">{children}</p>
)

const BC = ({ children }: { children: React.ReactNode }) => {
  const text = String(children)
  const match = text.match(/^\[(\d+)\]$/)
  if (match) return <DiChordBadge n={parseInt(match[1], 10)} />
  return <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
}

// ── Sonic Property Explorers ─────────────────────────────────────────────────

const PLOG_GROUPS = [
  { label: 'Dissonant', hz: '8 Hz', color: '#dc2626', brackets: [1, 2, 10, 11] },
  { label: 'Modal',     hz: '4 Hz', color: '#7c3aed', brackets: [3, 4, 8, 9]   },
  { label: 'Perfect',   hz: '2 Hz', color: '#16a34a', brackets: [5, 6, 7]       },
]

function DcSelector({ selected, onSelect }: { selected: number; onSelect: (n: number) => void }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {PLOG_GROUPS.map(g => (
        <div key={g.label} className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold w-28 shrink-0" style={{ color: g.color }}>
            {g.label} {g.hz}
          </span>
          {g.brackets.map(n => (
            <button
              key={n}
              onClick={() => onSelect(n)}
              className="font-mono text-xs px-2 py-0.5 rounded border transition-all"
              style={{
                background: selected === n ? `${g.color}22` : 'rgba(30,41,59,0.8)',
                border: `1px solid ${selected === n ? g.color : `${g.color}44`}`,
                color: selected === n ? g.color : '#94a3b8',
              }}
            >
              [{n}]
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

function SonicPropertyExplorer() {
  const [selected, setSelected] = useState(7)
  const dc = DICHORDS.find(d => d.bracket === selected)!
  return (
    <div className="rounded-xl border border-slate-700 p-4 my-6" style={{ background: '#0f172a' }}>
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
        Interactive Explorer — select any di-chord to see all three sonic properties
      </p>
      <DcSelector selected={selected} onSelect={setSelected} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PulsationViz dichord={dc} mixLevel={7} />
        <FOFactorViz dichord={dc} mixLevel={7} />
        <HarmonicityViz dichord={dc} mixLevel={7} />
      </div>
    </div>
  )
}

function PulsationExplorer() {
  const [selected, setSelected] = useState(1)
  const dc = DICHORDS.find(d => d.bracket === selected)!
  return (
    <div className="rounded-xl border border-slate-700 p-4 my-6" style={{ background: '#0f172a' }}>
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
        Pulsation Visualizer — compare beating rates across families
      </p>
      <DcSelector selected={selected} onSelect={setSelected} />
      <PulsationViz dichord={dc} mixLevel={7} />
    </div>
  )
}

function FoHarmonicityExplorer() {
  const [selected, setSelected] = useState(7)
  const dc = DICHORDS.find(d => d.bracket === selected)!
  return (
    <div className="rounded-xl border border-slate-700 p-4 my-6" style={{ background: '#0f172a' }}>
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
        F/O Factor &amp; Harmonicity Explorer
      </p>
      <DcSelector selected={selected} onSelect={setSelected} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FOFactorViz dichord={dc} mixLevel={7} />
        <HarmonicityViz dichord={dc} mixLevel={7} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

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
  { id: 'ch12', label: 'Ch.12 — Fundamental/Octave Factor' },
  { id: 'ch13-14', label: 'Ch.13 — Harmonicity' },
  { id: 'ch14', label: 'Ch.14 — Properties of Di-Chords: Interference Pulsation' },
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

      {/* ── PRACTICE PLAN BANNER ── */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-indigo-900 text-sm">Parallel-Track Practice Plan</p>
          <p className="text-indigo-700 text-xs mt-0.5">Mastery-gated daily practice across 5 tracks — 2 × 30 min sessions, no time pressure</p>
        </div>
        <a href="/plogger/practice-plan" className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded transition-colors">
          View Plan →
        </a>
      </div>

      {/* ── ACKNOWLEDGEMENTS ── */}
      <H2 id="intro">Acknowledgements</H2>
      <P>
        This is true for all my hundreds of students over the past decades; I would not have been inspired with
        the ideas that became this volume without them. I have been inspired with the ideas in the method by a
        colleague and good friend, and many colleagues and collaborators. Special acknowledgment must go to{' '}
        <strong>Nadia Boulanger</strong>, with whom I studied in Paris and who provided me with a standard of
        solf&egrave;ge to imitate, and to all the former students, colleagues, and collaborators who have
        graciously worked in the testing of these ideas.
      </P>
      <P>
        Special acknowledgments must also go to <strong>Professor Keith Still</strong>, who has been an
        inspirational and educated resource whose encouragement and help resulted in getting the book into print.
      </P>

      {/* ── FOREWORD ── */}
      <H2 id="foreword">Foreword</H2>
      <P>
        I know of only one person who can legitimately proclaim themselves the most global, prominent collector
        and builder of major music schools around the world, with hundreds of thousands of major music students
        around the world in every conceivable country, in the signing of the newest Baltimore Symphony music
        director, and in the latest recordings. Who is it exactly, with all of these credentials? Somewhere,
        finding a student, encouraging young musicians, or listening to an orchestra all are the moments that
        define that person, the musician&apos;s musician. Who else could it be &mdash;{' '}
        <strong>William Foster Walker III</strong>.
      </P>
      <P>
        It is our pleasure to introduce this book as a companion to the instruction he gives his students.
      </P>
      <P>
        <em>&mdash; Charles Anderson Young<br />Associate Dean, B&eacute;lmont-Walker Conservatory</em>
      </P>

      {/* ── INTRODUCTION ── */}
      <H2 id="introduction">Introduction</H2>
      <P>
        Becoming fluent in music is similar to becoming fluent in any language: both require a firmly rooted ear
        along with a systematic approach to master grammar and vocabulary. The fluent musician can immediately
        identify patterns in music, the way a fluent speaker will quickly spot idioms in language. This aptitude,
        however, is not often obtained in music because, as a topic, it is incredibly complex, covering the
        identification and application of all the rules and terms governing music, which must be attained
        fluently if they are to be comprehensible to the listener.
      </P>
      <P>
        Although this process may seem overwhelming at first, in reality learning musical material occurs at its
        most efficient through pattern recognition, where patterns and structures enable you to acquire and use
        musical terminology for the same reasons: to identify patterns and utilize them. We learn language this
        way by identifying words closest to our experience of usage. If we understand a word&apos;s meaning we
        can also understand the structure within which it appears. We learn musical grammar through exposure to
        music itself.
      </P>
      <P>
        I like to say that in music, as perhaps in most things in this world, you are most effective when you
        actually look at what you are working with; that is, you will achieve more or less commensurate success
        depending on how much knowledge you have acquired and retained. From my experience as a musician, teacher
        and arranger over many years, I introduce with great confidence the following method for learning the
        musical vocabulary of the piano. The method achieves a critical speed, namely, that things tend to be
        learned correctly from the beginning and thus retained better over time.
      </P>
      <P>
        The method is based on this idea: above all it accounts for the capacity of the student&apos;s musical
        brain. For example, I have advised 99% of modern musical learners (by whom I mean those who are not
        among the small subset of truly extraordinary musicians) to specifically use syllables alongside notes.
        Without doing so, the non-standard student loses track of what they are learning and becomes confused.
        In short, you can achieve critical speed, and more importantly, you can retain things consistently well,
        only if you rely on systematic methods that your own cognitive apparatus can handle.
      </P>
      <P>
        The approach is not difficult, but it does require the student to work. Every musical exercise in this
        collection can be broken down into a series of smaller chunks that, once mastered individually, can be
        compiled. The reward for following this process is substantial in the long run: once learned, the musical
        vocabulary can be used with more facility than any other method.
      </P>

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
        &ldquo;All real learning happens in the imagination: if it isn&rsquo;t in the imagination, it&rsquo;s
        not learned yet. You can say something, but it doesn&rsquo;t exist for you yet until it&rsquo;s in
        the imagination.&rdquo; — Nadia Boulanger
      </P>

      <H3>Stage 1 — Roughing In</H3>
      <P>
        Once the hand behind the harp sometimes likes to get in the way, you might roughly trouble-free half
        the time. But sometimes lines like this happen easily and are produced without thinking. This is the
        roughing in phase, where the main goal is to handle it. You are becoming comfortable with the material.
        At this stage, you feel it more intuitively.
      </P>

      <H3>Stage 2 — Achieving Fluency</H3>
      <P>
        In the roughing in phase, you will initially spend long segments of your behavior oriented at the
        keyboard and attempting to play something very slowly, with many corrections. You will frequently stop
        to correct things. Sometimes you correct the same mistake two or three times. At the end of the roughing
        in phase, you have the correct materials in place, but performing them is far from second nature.
      </P>
      <P>
        At the fluency stage, you want the material to be able to come out well most of the time. You have the
        material working — it rarely creates problems, and you can play it reliably at a moderate tempo. To be
        fluent, your mental and physical experience during this stage are not like the experience during roughing
        in. Now, you&rsquo;re going in and out of focus during practice because the material is not yet fully
        memorized. The roughing in phase is like scaffolding; now you are beginning to work on the underlying
        structure.
      </P>

      <H3>Stage 3 — Achieving Mastery</H3>
      <P>
        Once you have the fluent stage, you have a pattern of success at the goal. Now, you&rsquo;re seeking to
        get things to the top of your skill level. We are trying to get material to mastery, which requires
        consistently reliable performance at tempo — both up to full speed, and reliably able to slow down. You
        know you are at mastery when performance feels steady — like you can always land the lick or passage
        correctly. At this point, the material is so deeply organized in your mind and body that you could
        perform it with or without thinking about it.
      </P>

      <H3>What Things Go Wrong with Roughing In</H3>
      <P>
        Trying to avoid confusion in the roughing in phase, the student often confuses confidence with mastery.
        There are many specific examples where this confusion leads to bad habits: for example, an athlete who
        might just drop back to the ground-level before a race, having no specific speed-training background is
        practicing getting over the hurdles. They work on hurdle after hurdle, feeling successful on each
        individual try. But if the student is really going to succeed at the goal they need to spend more time
        at the hurdle phase. Any time spent trying to perform fully before the body knows how is counterproductive.
      </P>

      <H3>Mindlessly Bypassing the Perfecting Stage</H3>
      <P>
        We need to see this phase as what it amounts to: practicing being wrong. Yet we cannot afford to be
        wrong so often. The moment we become confused or impatient, we&rsquo;ve begun spending most of our
        time practicing confusion. The only way to spend zero time practicing confusion is to avoid it
        completely. Let me stress this: as a student practicing any skill, you may delight in the feeling of
        &ldquo;figuring it out,&rdquo; but there can be no substitute for training — the student wants to
        practice the entire performance from beginning to end completely in a controlled, reliable way.
      </P>

      <H3>Avoiding the Perfecting Stage Mindlessly</H3>
      <P>
        So it is important to establish what the perfecting stage should look like. This is for musicians of
        all ages. It is a fine thing to have some special moments of inspiration when you play it and it comes
        out well; but those moments should not be the template for your practice. You can be someone who
        specializes in delightful surprises — but that experience is antithetical to the training you need,
        which is orderly accumulation. You may not be able to completely remove this from your practice, but
        make sure all information you use is clearly articulated in sound, not just done by guesswork.
      </P>

      <H3>What We Need</H3>
      <P>
        It occurred to me after studying the problem for many years that there are essentially three components
        of a skill chain, which I discovered by thinking about a cross-section of very successful performing
        musicians. For those studying an instrument, the first component involves building the ability to know
        clearly what you&rsquo;re going to do before you do it.
      </P>
      <P>
        Clearly, what is needed for the roughing in or preparation phase is some reliable form of mental support
        to fill the position of an automatic performing state — and, to be comprehensive, the following
        principles are extremely important:
      </P>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-2">
        <li>Return to the best of your ability; look at the moment you&rsquo;ll be in the appropriate state, and work on the problem.</li>
        <li>Remove yourself from thinking, programming, and judging during an intense time-on-task. Focus your mind within the limits of the task.</li>
        <li>Focus on the time of your ability; know your skill and work on the skill. You do the skill things; ensure the information is ready to be repeated. Stay all-in on your calling.</li>
        <li>Allow the skills, and allow self-observation when noise enters and other stimuli enter to be repeated. Get the information; prepare for the next note — do this ANYTIME you are calling.</li>
      </ol>

      <H3>Mindfully Replacing the Performing State by Performing Plans</H3>
      <P>
        We need to see this phase as what it amounts to: practicing being wrong. Yet we cannot afford to be
        wrong so often. The moment we become confused or impatient, we&rsquo;ve begun spending most of our
        time practicing confusion. The only way to spend zero time practicing confusion is to avoid it completely.
      </P>

      <H3>Breaking Down at the Top of the Performing Phase</H3>
      <P>
        Any time spent trying to perform fully before the body knows how is counterproductive. Make sure all
        information you use is clearly articulated in sound, not just done by guesswork.
      </P>

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

      <H3>The Importance of Visualizing the Keyboard</H3>
      <P>
        The piano/organ keyboard (which I refer to as the thinking mind of the musician) focuses our
        attention as musicians on the location of every harmonic and intervallic event as they are played.
        When in doubt, the keyboard, understood as a tool of spatial organization — organized into
        octave-repeating patterns — will consistently help you understand intervallic and harmonic
        relationships. By using the keyboard as the musician&rsquo;s visual tool, you can analyze harmony,
        rhythm, and color in ways that allow you to identify the relationship between harmony and the
        frequencies of intervals involved.
      </P>
      <P>
        Your capacity to analyze an interval is dependent upon your ability to recognize and understand
        the note names of the keyboard, and to understand the keyboard as a map of pitch space. It&rsquo;s
        important to learn to see the piano as you would see a word in a sentence — a musical sentence is
        no different from an English one in this particular respect, if we see the word inside a sentence,
        we can almost immediately recognize its meaning. Similarly, if we look at a keyboard, we know
        immediately what is meant by the word &ldquo;keyboard&rdquo; when it appears in a musical sentence,
        even if we&rsquo;ve never played it.
      </P>
      <P>
        The capacity to analyze music — whether as a performer, composer, or in any other musical role —
        depends heavily upon a musician&rsquo;s spatial-cognitive ability. Using fixed-pitch resources — an
        instrument played through a fixed intervallic structure — enables you to develop this
        spatial-cognitive ability. The keyboard is unique in its ability to allow you to practice these
        kinds of spatial-cognitive operations because it is a fixed-pitch instrument, and thus the keyboard
        can be seen as an analogy of the musical space of pitches. It&rsquo;s still a fully diatonic map
        with all the possible pitch relationships accessible to the musician — and thus it has certain
        properties of musical relationship that the musician can use to identify, analyze, and communicate
        certain musical events.
      </P>

      <H3>The Keyboard as the Musician&rsquo;s Cognitive Tool</H3>
      <P>
        The musical keyboard is a useful and very accessible musical tool. It can be used more broadly to
        enhance listening. There is a fundamental pitch space you can listen to; that&rsquo;s why it is so useful.
      </P>

      <H3>The Musical Keyboard as a Map of Pitch Space</H3>
      <P>
        Years ago, I concluded in my study that music requires the ability to mentally perceive spatial
        connections between pitches on the keyboard. Similarly, music can be understood, in a sense, as a
        social tool for representing that information.
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2 text-sm">
        <li>The white keys form a certain kind of interval pattern — this pattern is one that repeats.</li>
        <li>The same 12-note pattern of black and white is repeated every octave.</li>
        <li>An octave is a certain distance between a frequency that is repeated every octave.</li>
        <li>The key for black keys that is to the right of the white key is called a higher-than-white note, while the key for black keys to the left is a lower-than-white note.</li>
        <li>The distance between a note and the note at the same pitch up or down one octave — this is an octave.</li>
        <li>This musical relationship enables one to learn where notes are.</li>
      </ul>

      <H3>Imagining the Keyboard</H3>
      <P>
        First, you should be able to create a clear, pleasant imagination of the piano keyboard, one that
        is detailed, permanent, vivid, and easily accessible (without the actual piano present). This is
        the best possible tool for auditory training. You will need to go through several steps before
        this has become second nature for you: for example, you will need to repeatedly tell yourself to
        &ldquo;imagine the keyboard&rdquo; in a variety of ways. Before practice, allow yourself to imagine
        the keyboard as clearly as possible; as you practice, you should actually use the keyboard as a
        visual thinking tool, and be capable of accessing a real image of the keyboard in your mind
        without looking at any visual aids whenever you practice; this will make you a more effective
        learner.
      </P>

      <H3>Labeling the White Keys</H3>
      <P>
        All of the musical notes in the musical system (at least in the Western equal-tempered system) are
        named with letters of the alphabet: A, B, C, D, E, F, G — and then after G, the pattern starts
        over at A again. In the Western musical system, there are only seven base letter names for notes
        because the entire octave space uses only seven distinct pitch classes in the diatonic system;
        these are the seven keys that the keyboard represents in each octave.
      </P>
      <P>
        Placing the name &ldquo;sharp&rdquo; (which is the note one semitone higher) to the right of a
        given key indicates that this piano key is a note that is slightly higher in pitch. Placing the
        name &ldquo;flat&rdquo; (which is the note one semitone lower) to the left of the key indicates
        the note is slightly lower. The key placed further to the right is a higher-pitched note, while
        the key to the left on the keyboard is a lower note.
      </P>

      <H3>Labeling the Black Keys</H3>
      <P>
        There are two basic note names to begin: the name &ldquo;a sharp,&rdquo; or &ldquo;b flat,&rdquo;
        for the black keys, from the lowest to the highest. As you move to the right on the keyboard, the
        notes become sharper (higher); as you move to the left, the notes become flatter (lower).
      </P>
      <P>
        The flat notes also occur on the keyboard in which neighboring pitches provide context: in any
        key, the next key over or the neighboring keys will be at the corresponding natural notes. For
        example: on the keyboard, the D key has as its neighbors both the D# key (which can also be
        called E&#9837;) and the D&#9837; key (which can also be called C#). This means that the key to
        the right of D is a D# while the key to the left of D is a D&#9837;.
      </P>

      <H3>Exercises: Developing Keyboard Visualization</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-1</p>
        <P>
          <strong>Note Names on a Standard Keyboard.</strong> Use a piano keyboard instrument to answer
          the following questions. (You may use the blank staff if needed.)
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>How many notes are there in all?</li>
          <li>Using the black and white keys, label and sort the keys on the keyboard and write them into the answer spaces separately:
            <ul className="list-[lower-alpha] pl-6 mt-1 space-y-1">
              <li>How many natural notes are there?</li>
              <li>How many flat notes are there?</li>
              <li>How many sharp notes are there?</li>
            </ul>
          </li>
          <li>How many notes do not have a single name?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-2</p>
        <P>
          <strong>Drawing the Keyboard, Part I.</strong> Drawing a keyboard will fix its image in your
          imagination more than passively looking at it because you will use two cognitive modalities:
          seeing and doing.
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>From a keyboard that has at least three twelve-key runs, represent this diagram in the final exercise space. Draw at least one complete octave, taking note of which keys are white and which are black.</li>
          <li>Now write the note names for each white key. Cognitive research has repeatedly demonstrated that combining note-name writing with drawing produces a very effective learning activity.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-3</p>
        <P>
          <strong>Drawing the Keyboard, Part II.</strong> Once you&rsquo;ve sketched the keyboard by
          following the steps in the previous exercise, do the following:
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>First follow the steps in the previous exercise from this book.</li>
          <li>Draw the keyboard again, using a more condensed format: draw in a blank space above and focus on drawing at least 14–24 notes wide. Make sure you can draw them as clearly as possible.</li>
          <li>Practice drawing the keyboard without referring to an image or the text. Practice until you can write the names freely without reference, in at least 24-note-wide sections.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-4</p>
        <P>
          <strong>Imagining the Keyboard.</strong>
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>Sitting at a real piano, look at the keys, close your eyes, and imagine the piano keys as clearly as possible. Then open your eyes and compare your imagination to the actual keys. Now try this exercise from the right side of the piano.</li>
          <li>Visualize the piano keys in your mind without looking at any piano. Start from the right side and move your eyes left.</li>
          <li>Practice drawing the keyboard without referring to an image or the text.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-5</p>
        <P>
          <strong>Teaching on a Visualized Keyboard.</strong> Without having a keyboard physically
          nearby, explain to a friend the arrangement of white and black keys, using only your
          visualized keyboard.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-6</p>
        <P>
          <strong>Syllable Flashcards.</strong> Study the following table with the solfège (syllable
          name) on one side and the solfège letter name on the other. Carefully label all the rows to
          complete the table.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700 text-slate-200">
                <th className="border border-slate-600 px-3 py-2 text-left">Solfège Syllable</th>
                <th className="border border-slate-600 px-3 py-2 text-left">Letter Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-slate-300">
                <td className="border border-slate-600 px-3 py-2 italic">(to be completed by student)</td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          Remember: when we refer to notes with accidentals, we add a sharp (<em>di</em>) or a flat
          (<em>lo</em>) after the syllable or solfège name, as with letters: dib, rib, etc.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-7</p>
        <P>
          <strong>Mapping Solfège onto the Keyboard.</strong> On the blank keyboard below, write the
          number that corresponds to the correct solfège syllable.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-8</p>
        <P>
          <strong>Mapping Letter Names onto the Keyboard.</strong> On the blank keyboard below, write
          the number that corresponds to the correct letter name.
        </P>
      </div>

      <H3>Exercises: Developing Note-Naming Fluency at the Keyboard</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-9</p>
        <P>
          <strong>Solfège Options.</strong>
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>
            Complete the solfège table below by writing its corresponding solfège syllables. As you
            complete the table, focus on being as fluent as possible.
            <div className="overflow-x-auto my-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-700 text-slate-200">
                    <th className="border border-slate-600 px-3 py-2 text-left">Solfège</th>
                    <th className="border border-slate-600 px-3 py-2 text-left">Letter Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-slate-300">
                    <td className="border border-slate-600 px-3 py-2 italic">(to be completed by student)</td>
                    <td className="border border-slate-600 px-3 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li>Compare the solfège options at the corresponding highest-score notes.</li>
        </ol>
        <P>
          To switch from solfège (a letter note name) and vice versa, train yourself by double-checking
          using a different solfège program. Practice until you can switch between solfège note names
          and letter note names without looking at your keyboard, smoothly and without requiring any
          additional help.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-10</p>
        <P>
          <strong>Syllable Flashcards.</strong> Study the following table with the solfège note name
          and note name to each side of the table.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-11</p>
        <P>
          <strong>Tracking Written Melodies.</strong> Visualize the melody in real time while speaking
          each measure: keep your visualization of the note names on the keys clear and present, look
          at the melody, and respond.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-12</p>
        <P>
          <strong>Tracking Written Melodies.</strong> (Exercises for tracking note names.)
        </P>
      </div>

      <H3>Exercises: Developing Mode-Naming Fluency at the Keyboard</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-13</p>
        <P>
          <strong>Syllable Flashcards.</strong> Study the following table by writing the solfège
          (syllable) name next to each white note and reading the solfège letter name. As you complete
          the solfège syllable in the table, focus on getting them as fluent as possible.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-14</p>
        <P>
          <strong>Solfège Flashcards.</strong> Once the solfège exercise has been mastered, practice
          the solfège using syllable pattern matching — finding any solfège syllable option and writing
          it. For each item in the table, write the letter name.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700 text-slate-200">
                <th className="border border-slate-600 px-3 py-2 text-left">Solfège</th>
                <th className="border border-slate-600 px-3 py-2 text-left">Letter Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-slate-300">
                <td className="border border-slate-600 px-3 py-2 italic">(to be completed by student)</td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          For example, as you practice solfège, look along a table using: sol in the middle of the
          table; follow the pattern: fa, sol, la, sol. Practice the syllable at your instrument while
          visualizing and mentally tracking each note name — following the keys simultaneously in a
          particular pattern.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-15</p>
        <P>
          <strong>Tracking Written Melodies.</strong> Using this melody, play each measure and respond
          with the note names for all notes: read the notation from the interval — follow the melody,
          keeping your visualization of the note names on the keys clear and present, look at the
          melody, and respond.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-16</p>
        <P>
          <strong>Syllable Flashcards.</strong> Complete the solfège exercise table — all the rows
          with solfège note names for all note names.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-700 text-slate-200">
                <th className="border border-slate-600 px-3 py-2 text-left">Solfège</th>
                <th className="border border-slate-600 px-3 py-2 text-left">Letter Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-slate-300">
                <td className="border border-slate-600 px-3 py-2 italic">(to be completed by student)</td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 3-17</p>
        <P>
          <strong>Mapping Syllables onto the Keyboard.</strong> Sing or bring broad concepts while
          staying within the imagination. Practice aloud at your instrument as a study performance mode.
          Study using broad music across the world — agility and strength is the aim. We need to be
          good at using body format and solfège syllables in a larger format, and to remain in practice
          on this topic. See also the article &ldquo;Naming and Singing Notes&rdquo; (Plogger 2016).
        </P>
      </div>

      {/* ── CH.4 ── */}
      <H2 id="ch4">Ch.4 — Longy Rhythms</H2>
      <P>
        Many of us sing rhythms of music or call by the number without necessary knowledge of the precise
        volume or note values in a dictionary. The patterns, however, are not an indication of any intrinsic
        quality; this is because the method we use tells us whether the interval is deliberately measured.
        Can anyone perform tasks with the same type of systematic measure, just as we can act in a
        non-reliant way? In an ordinary sense, these two qualities are fundamentally different: the first
        is the reliance on number itself; the second is the reliance on method.
      </P>
      <P>
        Our ability to measure and count long rhythms is crucial to music learning. The ability to fluently
        choose rhythms when we are in fluency or freely playing is crucial because actually we are seeking
        to keep ourselves within the flow of music. I describe this experience as a way of learning and
        knowing music through rhythmic counting, and I believe the absence of consistent, reliable rhythm
        patterns is the defining feature of the struggling musician, no matter what instrument or voice.
        A reliable musician can count things in a reliable and systematic way.
      </P>

      <H3>The Lange Rhythm Chart</H3>
      <P>
        Based on the Theories of Émile Jaques-Dalcroze, accompanied the page.
        <br /><em>Émile Lange, 1881–1929</em>
      </P>

      <H3>Two Equal Parts</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-100">
              <th className="border border-slate-600 px-3 py-2 text-left">Division</th>
              <th className="border border-slate-600 px-3 py-2 text-left">Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200">Two Equal Parts</td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2</td>
            </tr>
            <tr className="bg-slate-800/50">
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 →</td>
            </tr>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200">Five Equal Parts</td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4 5</td>
            </tr>
            <tr className="bg-slate-800/50">
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4 5 →</td>
            </tr>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4 5 ←</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Three Equal Parts</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-100">
              <th className="border border-slate-600 px-3 py-2 text-left">Division</th>
              <th className="border border-slate-600 px-3 py-2 text-left">Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200">Three Equal Parts</td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3</td>
            </tr>
            <tr className="bg-slate-800/50">
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 →</td>
            </tr>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 ←</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Four Equal Parts</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800 text-slate-100">
              <th className="border border-slate-600 px-3 py-2 text-left">Division</th>
              <th className="border border-slate-600 px-3 py-2 text-left">Pattern</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200">Four Equal Parts</td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4</td>
            </tr>
            <tr className="bg-slate-800/50">
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4 →</td>
            </tr>
            <tr>
              <td className="border border-slate-700 px-3 py-2 text-slate-200"></td>
              <td className="border border-slate-700 px-3 py-2 font-mono text-slate-200">1 2 3 4 ←</td>
            </tr>
          </tbody>
        </table>
      </div>

      <P>
        Many other rhythm groupings represent alternative groupings rather than entirely analogous
        patterns. Note that numbers represent different lengths of time; they may be divided into
        groups of two, three, and four equal parts.
      </P>
      <P>
        In each instance, the procedure is the same: any beat can be mentally or audibly divided, and
        it can be divided by any number. Treat each beat as if it&apos;s divisible by a whole beat or a
        portion. One beat in a music bar can itself be a multiple of beats: &ldquo;1 and,&rdquo; for example,
        meaning 1 and a half, followed by 2 and a half. This is because of the Émile Lange Rhythm
        Chart pattern.
      </P>

      <H3>Tap the Main Beat</H3>
      <P>
        Starting in the top left column, from top to bottom, you start dividing a beat into two equal
        parts. The beat is always a whole number (like 1). Think of it as &ldquo;1 a,&rdquo; then &ldquo;1 2,&rdquo; etc.
      </P>

      <H3>Speak Each Number on the Beat and at the Same Volume</H3>
      <P>
        Teach your mind to speak each beat on the same pitch level at the same dynamic level, practicing
        clearly speaking each note precisely, allowing you to eliminate in-pitch centers, allowing you
        to clearly and concisely see what you&apos;re doing. As you practice speaking each beat step-by-step
        you will become more fluent in using the approach from the beginning, as you will start learning
        what comes next. As you practice, you will begin to look forward to a point where you will be
        at perfect mastery of all these actions as well: speaking quickly, speaking well, speaking in a
        timely fashion — and reading them from the page while making well-managed and well-timed beats.
      </P>

      <H3>An Accurate and Accelerate-Beat</H3>
      <P>
        Each beat has its own specific note value; just as a &ldquo;long beat&rdquo; note has a certain number
        of beats, and thus an associated note-unit, similarly a rhythmic subdivision is assigned to a
        particular beat, so to start a regular rhythmic subdivision, you need to start at a specific
        note value on each level of the beat you&apos;re on. The fundamental note value provides the highest
        range of beats at the first level, and the following beat-value from the first level provides
        the second beat level.
      </P>
      <P>
        Starting at the top row, 1, 2, 3, and 4 — the entire middle column is a block of 56 notes.
        The notes perform the division permutations. There are two rhythmic units: a note (or a short
        beat) and a longer note (or a long beat). About the block of notes, these two notes each form
        a unit, and each unit has either an equal number of notes (which in music theory is called
        &ldquo;even beat&rdquo;) or an unequal number of notes (which is called &ldquo;odd beat&rdquo;). The whole block
        of even beats produces what we call an &ldquo;even beat,&rdquo; and the whole block of odd beats produces
        what we call an &ldquo;odd beat.&rdquo;
      </P>

      <H3>Maintain the Main Beat, Without Breaks</H3>
      <P>
        The goal is to maintain the pulse throughout each measure in the block of 56 notes — the notes
        perform the division permutations. There are two rhythmic units: a note (or a short beat) and
        a longer beat. About a group of notes that is &ldquo;two-beat,&rdquo; the note means its beat (or &ldquo;time&rdquo;)
        has exactly 2 notes. The note on the first beat is a short note (usually a quarter note), and
        the note on the second beat is a short note (usually a quarter note), and then the note on the
        third beat is a short note (usually a quarter note). So, instead of counting &ldquo;1-2&rdquo; twice, we
        count &ldquo;1-2-3&rdquo; three times. By combining these short/long rhythms into beats per line in a
        music bar, students learn the way rhythm must be counted, and they should always count the unit
        beats of the rhythm when they are being counted from the beginning.
      </P>

      <H3>Exercises: Performing the Lange Rhythm Chart</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 4-1</p>
        <P>Dividing a Beat into Two Equal Parts</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove by using the pattern from the Lange Rhythm Chart. Note: It is set up on the left leg, and keep 2 on the right leg, keeping both left and right in rhythm.</li>
          <li>Divide each beat into two equal parts, counting &ldquo;1-a.&rdquo; Note: It is fine to count &ldquo;1-a&rdquo; as your starting beat; in this case the &ldquo;a&rdquo; represents a short subdivision.</li>
          <li>Keep the main beat going and tap on top of the beat, trying your main beat at top speed; do not fall behind or go too fast.</li>
          <li>Be sure the main beat is without fear of any imbalance so that the performance is accurate and on time. Try to keep the beat going from left leg forward.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 4-2</p>
        <P>Dividing a Beat into Three Equal Parts</P>
        <P>This exercise is quite like the previous exercise, except for the method you&apos;re now using — instead of keeping the tap pattern on the left leg and 2 on the right, here you want the tap pattern to make it clear what meter you&apos;re in.</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove with the tap pattern as illustrated in the Lange Map, from beat 1 on the left leg and 2 on the right. Then tap on top of the left leg as you would be practicing.</li>
          <li>Improve rhythmic accuracy on your lap by improving accuracy while at the same time holding a strong beat, so that when you have performed this groove well, look at this material while you are moving: the rhythm of your feet, and feel looking up and then finding the next position of the instrument, and then back.</li>
          <li>Perform the Lange Rhythm Chart with the 3-beat pattern, and make sure your foot is clearly moving.</li>
          <li>Now perform the 3-beat Lange pattern correctly and keep your foot staying on the beat.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 4-3</p>
        <P>Dividing a Beat into Four Equal Parts</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove of the basic beat pattern as in the previous exercises. Start by sitting on the left leg on beat 1 and 2 on the right leg, keeping the rhythm.</li>
          <li>Improve rhythmic accuracy while at the same time holding a strong beat; maintain well-timed beats by improving the rhythmic accuracy of each tap.</li>
          <li>Perform the Lange Rhythm Chart; even if you have issues with the rhythmic pattern in the previous exercise, continue — try.</li>
          <li>Maintain a pulse throughout each measure consistently; do not allow any other problems to come up.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 4-4</p>
        <P>Dividing a Beat into Four Equal Parts (Advanced Patterns)</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove of the basic beat pattern, using the same starting position as illustrated. Keep beat 1 on the left leg and 2 on the right.</li>
          <li>Improve rhythmic accuracy by improving rhythmic accuracy of each tap.</li>
          <li>Perform the Lange Rhythm Chart with the 4-beat pattern, and make sure your foot is clearly performing the correct rhythmic pattern.</li>
        </ol>
      </div>

      <H3>Lange Rhythm Permutations Quiz</H3>
      <P>When you divide a beat into two parts, there are these different kinds of divisions:</P>
      <ol className="list-alpha pl-6 mb-4 text-slate-300 space-y-1 text-sm" style={{listStyleType: 'lower-alpha'}}>
        <li>What is the division of a beat into two parts?</li>
        <li>What is the division of a beat into three parts?</li>
        <li>What is the division of a beat into four parts?</li>
        <li>What is the division of a beat into five parts?</li>
        <li>What is the relationship between the division of a beat and the number of combinations you notice? Express this mathematically.</li>
      </ol>

      <H3>Seven Pattern Lap Map Three Groupings</H3>
      <P>
        There are two other ways to divide a group of 3:4:3, 5:3, 4, 4, 5 and then: 5:3, 4, 4, 5 and 5:3.
      </P>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-5</p>
        <P>Alternating Seven Patterns</P>
        <P>As you practice, improvising alternating seven patterns, check off each condition after you have been a while doing this week of work and make sure you keep track of how you are doing.</P>
        <p className="text-xs font-semibold text-slate-300 mt-3 mb-1">A: Alternating with one-alternating patterns:</p>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1 font-mono">
          <li>G-8-G-1 → G-4-G-5</li>
          <li>G-4-G → G-8-G-1</li>
          <li>G-1-G → G-4-G-8</li>
          <li>G-8-G-1 → G-4-G-5</li>
        </ul>
        <p className="text-xs font-semibold text-slate-300 mt-3 mb-1">B: Improvise with two alternating patterns:</p>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1 font-mono">
          <li>G-4-G-8 → G-1-G-4 → G-1-G-4</li>
          <li>G-1-G-5 → G-8-G-1 → G-4-G-8</li>
        </ul>
        <p className="text-xs font-semibold text-slate-300 mt-3 mb-1">C: Practice the Lange Rhythm Chart with three-alternating patterns.</p>
      </div>

      {/* ── CH.5 ── */}
      <H2 id="ch5">Ch.5 — Lap Map</H2>

      <H3>Discovering the Lap Map</H3>
      <P>
        Almost sixty years ago I had a chance connection with a Russian teacher, back in those times,
        I had begun teaching at the music academy in California, having a bond relationship with
        colleagues and teachers in California about finding a good, consistent approach to rhythm
        practice. The challenge for students was keeping consistent rhythm, particularly with complex
        syncopations.
      </P>
      <P>
        I discovered that a lot of my students would always have their leg going tapping along. From
        this I took cue — I used Lap Maps to show the location of each beat of the music hierarchy,
        allowing the students to keep their legs in rhythm at the same time.
      </P>
      <P>
        Subsequently, I created a series of Lap Maps to show the location of each beat of the music
        hierarchy. I found it always useful to use a table that follows the numbers in order, always
        following the number in order.
      </P>

      <H3>The Diagram of the Lap Map</H3>
      <P>
        A sequence of key notes corresponding to the hierarchy of the Lap Map is as follows:
      </P>
      <P>
        The right tap (marked on left leg) — this is always the lowest-beat spot. The two lowest
        &ldquo;laps&rdquo; on the left leg and the right leg are the center spots. Each group of numbers is
        an alternating cluster with two taps per leg.
      </P>
      <P>
        Notice that the numbers on the left leg are always on the top position on the left leg; the
        one (1) is on the bottom, always placed lower on the left leg. Also the two (2) is on the
        top right, while the bottom number (4) is lower on the right leg.
      </P>

      <H3>The Basics</H3>
      <P>
        With lap map exercises, you aim to correctly handle complex patterns. Though it can be
        difficult working through all the complexity of those exercises, it may be only partly
        combinations of numbers, tapping on two laps; after you fully master them, allow tapping to
        be as smooth and natural as you can. At the end of any two-number sequence, check in: you
        are making gradual progress and thus practicing in a very productive, steady way. The goal
        of your exercises is that you should practice until you are totally ready. Failure during
        this period is understandable; you should attempt this work seriously even if you fail,
        rather than stopping after several failed attempts.
      </P>

      <H3>Exercises: Performing Lap Map Patterns</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-1</p>
        <P>Dividing a Beat into Two Equal Parts</P>
        <P>
          To become comfortable and fluent with the patterns of two-leg beats, try to keep a
          flowing, manageable rhythm by sending across each lap. Make sure your taps are steady
          and smooth.
        </P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove by using the basic lap map as illustrated. Start beat 1 on the left leg and 2 on the right leg. Taps: two tap taps per leg.</li>
          <li>Improve rhythmic accuracy on your lap, improving rhythmic accuracy while at the same time holding a strong beat; try this exercise until it is perfectly accurate, repeating the process.</li>
          <li>Establish a groove with the basic 2-beat lap map as illustrated, with beat 1 on the left leg and 2 on the right. Make sure you get comfortable enough on the right side before you move forward.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-2</p>
        <P>Dividing a Beat into Three Equal Parts</P>
        <P>
          As before, use the previous lap map exercises, moving your legs from beat 1 on the left
          leg and beat 2 on the right leg. Now, without making errors, start with beat 1 on the
          left lap first.
        </P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove with a 3-beat map — same starting exercises as described above (left first, right second, back to center).</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-3</p>
        <P>Dividing a Beat into Four Equal Parts</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove using the four-beat lap map exercises described above. Starting from the left leg, begin tapping a beat on all four laps.</li>
          <li>Keep the rhythmic groove going throughout the pattern, and try to make sure your foot is keeping the beat in smooth time.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-4</p>
        <P>Dividing a Beat into Five Equal Parts</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Using the 5-beat pattern, establish a groove with the lap map. Start beat 1 on the left leg, then 2 on the right, then 3 on the right, then 4 on the right, then 5 on the right.</li>
          <li>Improve the accuracy of the exercise by maintaining accuracy while at the same time holding a strong beat.</li>
          <li>Improve consistency throughout; do not allow any other issues to come up in the exercise.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-5</p>
        <P>Dividing a Beat into Six Equal Parts</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove of the basic lap map. Starting from beat 1 on the left leg and 2 on the right leg, start with the right.</li>
          <li>Improve rhythmic accuracy on your lap by improving rhythmic accuracy while at the same time keeping a strong beat.</li>
          <li>Practice the lap map with the six-beat pattern, and make sure your foot is properly executing the rhythmic pattern correctly.</li>
          <li>Repeat steps 1–3 for the six-beat pattern correctly and keep your foot staying on the beat.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-6</p>
        <P>Dividing a Beat into Six Equal Parts (continued)</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove of the basic beat pattern as in the previous exercises. Starting from the left leg, start alternating; then perform the 6-beat Lange pattern, and make sure your foot is clearly moving.</li>
          <li>Perform the Lange Rhythm Chart; keep your foot clearly performing the correct rhythmic pattern.</li>
          <li>Perform the Lap Map pattern to clearly keep your foot in place.</li>
          <li>Repeat steps 1–3 correctly and keep your foot staying on the beat.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-7</p>
        <P>Dividing a Beat into Seven Equal Parts</P>
        <P>
          In every practice, your performance should take about 100+ while staying and working from
          within the group, as the group is programmed in 5-0 set; while the performance here is
          always from left to right. A further number on the counting goes left to right; so the
          group always ends 3, 4 on the right leg, and then starts at 5, and to the right again.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-8</p>
        <P>2-3-2 Lap Map Pattern</P>
        <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1 mt-2">
          <li>Establish a groove with the basics using the beats 1 and 2 on the left leg and right leg. Taps: basic alternating.</li>
          <li>Improve rhythmic accuracy on the beat; gradually become more comfortable with the beats per step.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 5-9</p>
        <P>Alternating Seven Patterns</P>
        <P>
          As you practice, improvising alternating seven patterns, check off each condition after
          you have been practicing this week of work and make sure you keep track of how you are
          doing.
        </P>
      </div>

      <H3>Lange Rhythm Permutations Quiz</H3>
      <ol className="list-decimal pl-6 mb-4 text-slate-300 space-y-1 text-sm">
        <li>When the beat is divided into two parts, how many different permutations are there?</li>
        <li>When the beat is divided into three parts, how many different permutations are there?</li>
        <li>When the beat is divided into four parts, how many different permutations are there?</li>
        <li>When the beat is divided into two parts, how many different permutations are there?</li>
        <li>What is the relationship between the division of a beat and the number of different permutations that are possible? Express this mathematically.</li>
        <li>To check that your formula works correctly, calculate the number of beat divisions for the four-beat base two — then run the results through the Lange Rhythm Chart to confirm. How many different 4-beat group permutations are there?</li>
        <li>Calculate the result of your calculations with the number of combinations you have in the Lange Rhythm Chart. Are your results correct?</li>
      </ol>

      <H3>Looking Back</H3>
      <P>
        (See Chapter 5 conclusion — the Lap Map approach consolidates rhythmic fluency by
        externalizing the beat hierarchy onto the body, allowing the musician to maintain an
        internal sense of pulse while simultaneously reading or performing.)
      </P>

      {/* ── CH.6 ── */}
      <H2 id="ch6">Ch.6 — Pythagorean Ordering of Fifths</H2>
      <P>
        The Pythagorean ordering of fifths is fundamental to the understanding of music theory.
        Committing this pattern to memory will eventually become one of those skills that you can
        apply to music without conscious thought, and it will help if you think of it as a mnemonic.
        I believe this is one of the most important aspects of this book, and one whose systematic
        understanding enables you to develop your musical intuition in a broad way, to improve your
        understanding of music theory.
      </P>
      <P>
        This section of the textbook is dedicated to strategies to help you recall and memorize
        musical material that has been presented previously. Rather than summarizing what&rsquo;s
        been covered, however, the goal in this section is to help you to reinforce your memory by
        the exercises provided in this chapter. You must practice this material consistently until
        you are able to memorize it fluently, rather than requiring any visual cues. To practice
        this material in any consistent context, use the following exercises.
      </P>
      <P>
        For a more thorough exploration of the Pythagorean ordering, see the article &ldquo;The
        Perfect 5th Rule in Music&rdquo; (Plogger 2016).
      </P>

      <H3>Exercises: Programming the Pythagorean Ordering</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 6-1</p>
        <P>
          Tracking on a piano keyboard with the palm of your right hand, name each note in the
          Pythagorean ordering as you trace a very clear, slightly diagonal line across the keyboard
          in a circular spiral that keeps on returning to a note an octave lower as you go. Do not
          go off the edge of the keyboard; this pattern will always be on the white notes only.
        </P>
        <P>
          Try to perform this exercise with a slight musical feeling; the goal of this exercise is
          twofold: first, you aim to become comfortably familiar with each note name, and second,
          you wish to become familiar with the feeling of the Pythagorean ordering, which has a
          specific musical sense of progression. Make sure you are saying both solf&egrave;ge and
          English note names faster.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 6-2</p>
        <P>
          Now perform this exercise in the middle; try to perform the same sequence without any
          strong sense of pitch direction, but do keep the rhythm and tempo very clearly. In this
          exercise, the same keys are performed, but there will be a few that are harder to find.
          In this second exercise, the starting note may not always be the same.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 6-3</p>
        <P>
          Practice this exercise in reverse; by this way, you are actually listening to both notes
          simultaneously. In this exercise, the same keys are performed, but this time you&rsquo;ll
          practice by playing the exercise in both directions simultaneously.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 6-4</p>
        <P>
          Practice saying the syllables of the Pythagorean ordering quickly and without hesitation.
          Practice occasionally if you get stuck; keep your mind focused on the sequence and the
          notes used. Make them an image in your long-term memory. Remember to practice with both
          solf&egrave;ge and begin this sequence.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 6-5</p>
        <P>
          Once you&rsquo;ve mastered the practice here, execute again but now from the base
          starting note and going downwards. Practice from the descending Pythagorean ordering
          beginning with d and ending with b.
        </P>
      </div>

      {/* ── CH.7 ── */}
      <H2 id="ch7">Ch.7 — Internal Spelling at the Keyboard</H2>

      <H3>Ordinal Interval Names</H3>
      <P>
        The five-chord interval (which I refer to in the context of describing the distance between
        notes) uses common names for describing the distance between notes. The names used for
        interval names of a 5th across between notes are very common in describing the distance
        between a note and its neighbor (which forms the interval). The intervals are named after
        the number of notes included in the spanning interval. For example, the distance between a
        C and a G — including C, D, E, F, G — is a 5th, because there are five notes in the span.
        Similarly, a diatonic scale side (like C-D-E-F-G-A-B-C) spells out 8 notes from C to the
        next C — and that interval, known as an octave (&ldquo;octave&rdquo; from the Latin for 8),
        spans 8 notes in the diatonic scale.
      </P>
      <P>
        As far as up or fa, you can also get that down as fa to. By the above example, then, you
        can play the same from fa down to do in a 5th.
      </P>
      <P>
        Notice that the two notes in the above diagram — fa and do (above and below) are the same
        musical letter; they are the same note, one octave apart, and in the above example,
        &ldquo;fa&rdquo; stands in the top (highest pitch) while &ldquo;do&rdquo; (in the above
        example) stands in the lowest (lowest pitch). To move from a note above and drop two tones
        to a note below is to make a 3rd-down movement.
      </P>

      <H3>Exercises: Locating and Naming Diatonic Intervals</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 7-1</p>
        <P>
          Using your keyboard and piano, complete each of the following intervals by doing this
          (is a 2nd, 3rd, 4th, 5th, 6th, 7th, or 8th):
        </P>
        <ol className="list-decimal pl-6 mt-2 space-y-1 text-slate-300 text-sm">
          <li>Write out all the possible 2nds that can be formed using the white keys.</li>
          <li>How many diatonic 2nds are there?</li>
          <li>Write out all the possible 3rds that can be formed using the white keys.</li>
          <li>How many diatonic 3rds are there?</li>
          <li>Write out all the possible 4ths that can be formed using the white keys.</li>
          <li>How many diatonic 4ths are there?</li>
          <li>Write out all the possible 5ths that can be formed using the white keys.</li>
          <li>How many diatonic 5ths are there?</li>
          <li>Write out all the possible 6ths that can be formed using the white keys.</li>
          <li>How many diatonic 6ths are there?</li>
          <li>Write out all the possible 7ths that can be formed using the white keys.</li>
          <li>How many diatonic 7ths are there?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 7-2</p>
        <P>
          Using your keyboard (or the keyboard diagram), determine each of the following intervals
          (is a 2nd, 3rd, 4th, 5th, 6th, 7th, or 8th), and write your answers below:
        </P>
        <ol className="list-decimal pl-6 mt-2 space-y-1 text-slate-300 text-sm">
          <li>sol up to mi = ?</li>
          <li>do up to mi = ?</li>
          <li>fa down to sol = ?</li>
          <li>doh down to sol = ?</li>
          <li>la up to sol = ?</li>
          <li>mi up to doh = ?</li>
          <li>sol up to doh = ?</li>
          <li>lo up to mi = ?</li>
          <li>fa up to mi = ?</li>
          <li>di down to fa = ?</li>
          <li>fa down to di = ?</li>
          <li>doh down to lo = ?</li>
          <li>sol up to lo = ?</li>
          <li>fa up to doh = ?</li>
        </ol>
        <P>Additional interval identification items:</P>
        <ul className="list-none pl-6 mt-1 space-y-1 text-slate-300 text-sm">
          <li>a: sol up to mi = ?</li>
          <li>b: doh down to sol = ?</li>
        </ul>
      </div>

      {/* ── CH.8 ── */}
      <H2 id="ch8">Ch.8 — A Special Spelling of Staff</H2>

      <H3>Vocal Ranges and the Five-Line Musical Staff</H3>
      <P>
        The five-line musical staff represents the range of the human voice. The staff begins in
        the center and spreads upward and downward from the center line (the top) and the bottom
        line, covering the &ldquo;vocal range&rdquo; — that is, the full range of the human voice.
      </P>
      <P>
        Any 5th built above a B&#9837; above middle C, or more specifically the distance of a 5th
        interval, will be comprehended by most, not anyone using one voice; this is because the
        method we are applying here is specifically created for you to practice it best on these
        note intervals. In other words, a melodic chord is built upon two notes of a similar
        distance, and by the following examples, the interval is used to identify some notes of
        an instrument.
      </P>

      <H3>The Three Types of Clef</H3>
      <P>
        The clef sign is a symbol indicating the location of a specific pitch on the musical staff.
        It is placed at the beginning of each musical line to indicate which notes are positioned
        on which lines and spaces of the staff.
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>The <strong>C-Clef</strong> designates the location of the note C (middle C) as the note on a middle-line or specific line of the staff on which middle C is located.</li>
        <li>The <strong>G-Clef</strong> designates the location of the note G on the staff — it is placed on the second line up from the bottom.</li>
        <li>The <strong>F-Clef</strong> designates the location of the note F on the staff — specifically between the two dots of the F-clef symbol, which is placed on the fourth line up from the bottom.</li>
      </ul>

      <H3>The C-Clef</H3>
      <P>
        The C-clef identifies the location of middle C on the staff, and may be placed on any line
        of the five-line musical staff. The typical positions of the C-clef are:
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>Soprano Clef</strong>: Middle C is on the first (bottom) line.</li>
        <li><strong>Mezzo-Soprano Clef</strong>: Middle C is on the second line from the bottom.</li>
        <li><strong>Alto Clef</strong>: Middle C is on the third (middle) line.</li>
        <li><strong>Tenor Clef</strong>: Middle C is on the fourth line from the bottom.</li>
        <li><strong>Baritone Clef</strong>: Middle C is placed on the fifth (top) line.</li>
      </ul>

      <H3>The G-Clef</H3>
      <P>
        Observe that in this clef, G is placed higher on the staff (in the vocal range) because the
        notes of this clef have a higher average range than the other clefs. The G-Clef is placed on
        two of the line clef positions:
      </P>
      <P>
        In the soprano G-Clef, the G-line is between the third line and second line from the bottom
        (Middle C on the top line).
      </P>
      <P>The vocal range includes: Soprano Clef, Mezzo-Soprano Clef, Alto Clef.</P>
      <P>
        Note however, in this clef, the vocal range also includes the Tenor Clef; but it reads one
        octave higher than it appears.
      </P>
      <P>
        Once the pair passed centuries, the G-clef has had only one G-clef in use or selected (at
        least by those who play piano), through one octave higher, though not for the tenor voice in
        any clef; the tenor clef, however, is the most commonly employed of the vocal clefs.
      </P>
      <P><strong>Treble Clef</strong>: The treble clef is placed on the second line from the bottom.</P>

      <H3>The F-Clef</H3>
      <P>
        The F-clef labels the location of F on the staff, and the placement (the two dots) identifies
        the location of the note F on the staff. It is found on two of the line clef positions:
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>In <strong>Baritone C-Clef</strong>, middle C is located on the fourth line up from the bottom.</li>
        <li>In <strong>Bass F-Clef</strong>, middle C is placed three lines up from the bottom.</li>
      </ul>

      <H3>Middle C on the Clefs</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>In <strong>Treble C-clef</strong>: middle C is on the third line from the bottom (or below the staff on the ledger lines).</li>
        <li>In <strong>Tenor C-clef</strong>: middle C is on the second line from the bottom.</li>
        <li>In <strong>Bass C-clef</strong>: middle C is on the first line from below the staff.</li>
      </ul>

      <H3>Knowing How Musical Intervals Span the Staff</H3>
      <P>
        Knowing this information is valuable for obtaining the true note value of the music on the
        keyboard. For example, the first note and the second note of any staff melody forms a certain
        interval across the staff. This interval spans from one note name on one side of the staff to
        the next note name (which in music is called a &ldquo;melodic interval&rdquo; on the page). When you
        know these intervals you can learn how many notes span a given interval on the staff.
      </P>
      <P>
        The staff maps out the intervals on the note in a specific, particular pattern — for each
        note on any of these positions, it indicates what the note value is (staff position) in much
        the same way. The note values indicate whether the pitch is going up or down by indicating
        its specific position above or below the ledger lines.
      </P>
      <P>
        A pair of these musical staves notes as they relate to the note staff shows that the notes
        on a staff move from the bottom to the top of a page. Note the note staff moves upward; when
        the note moves from the bottom to the top of the page, the notes move upward. When the note
        moves from the right side of the note staff to the left side, the notes tend to move downward.
        So the staff is not a linear thing — its design is more like a road, in that as you travel
        left to right on the page, the notes rise, and as you travel right to left the notes drop.
      </P>
      <P>
        A useful thing to remember is that the notes in the same staff itself are in the same staff
        position, which means they are the same note if they are a given note with the same note. So
        if two notes have the same position on the two staff, they are both exactly the same note. If
        they are in the same position and the same note, it means they are in the same position in
        the staff, but are of very different pitches.
      </P>

      <H3>Exercises: Using Clefs</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-1</p>
        <P>
          <strong>Drawing Clefs.</strong> Practice drawing each of the following clefs. Then, use
          the blank staff to practice drawing a clef.
        </P>
        <ul className="list-disc pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>Alto (C-Clef)</li>
          <li>Tenor (C-Clef)</li>
          <li>Baritone (C-Clef)</li>
          <li>Soprano (C-Clef)</li>
          <li>Mezzo-Soprano (C-Clef)</li>
        </ul>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-2</p>
        <P>
          <strong>Create a Starting Pitch, Find the Clef.</strong> Practice drawing the following
          schedule. If you do not know the clef, do not mark any notes or use a note drawing to
          indicate they&rsquo;re in the same position as the clef drawn before. Always write the
          name of the note underneath the note or before as indicated.
        </P>
        <P>Clef positions to practice: Alto, Tenor, Baritone, Soprano, Mezzo-Soprano.</P>
        <p className="text-slate-200 font-semibold text-sm mt-3 mb-1">Yankee Doodle</p>
        <P>Practice the familiar melody &ldquo;Yankee Doodle&rdquo; starting on the note mi.</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-2 text-sm">
          <li>&ldquo;Yankee Doodle&rdquo; starting on the note <em>mi</em>: (a) Which clef is used? (b) What mode is it? (c) Sing &ldquo;Yankee Doodle&rdquo; in the clef/mode.</li>
          <li>&ldquo;Yankee Doodle&rdquo; starting on the note <em>la</em>: (a) Which clef is used? (b) What mode is it? (c) Sing &ldquo;Yankee Doodle&rdquo; in this clef/mode.</li>
          <li>&ldquo;Yankee Doodle&rdquo; starting on the note <em>sol</em>: (a) Which clef is used? (b) What mode is it? (c) Sing &ldquo;Yankee Doodle&rdquo; in this clef/mode.</li>
          <li>&ldquo;Yankee Doodle&rdquo; starting on the note <em>sol</em> (second time): (a) Which clef is used? (b) What mode is it? (c) Sing &ldquo;Yankee Doodle&rdquo; in this clef/mode.</li>
        </ol>
        <p className="text-slate-200 font-semibold text-sm mt-3 mb-1">Row, Row, Row Your Boat</p>
        <ol className="list-decimal pl-6 text-slate-300 space-y-2 text-sm">
          <li>&ldquo;Row, Row, Row Your Boat&rdquo; starting on the note <em>mi</em>: (a) Which clef is used? (b) What mode is it? (c) Sing in this clef/mode.</li>
          <li>&ldquo;Row, Row, Row Your Boat&rdquo; starting on the note <em>fi</em>: (a) Which clef is used? (b) What mode is it? (c) Sing in this clef/mode.</li>
          <li>&ldquo;Row, Row, Row Your Boat&rdquo; starting on the note <em>mi</em> (second time): (a) Which clef is used? (b) What mode is it? (c) Sing in this clef/mode.</li>
        </ol>
        <p className="text-slate-200 font-semibold text-sm mt-3 mb-1">A Tisket A Tasket</p>
        <ol start={8} className="list-decimal pl-6 text-slate-300 space-y-2 text-sm">
          <li>&ldquo;A Tisket A Tasket&rdquo; starting on the note <em>mi</em>: (a) Which clef is used? (b) What mode is it? (c) Sing in the clef/mode.</li>
          <li>&ldquo;A Tisket A Tasket&rdquo; starting on the note <em>la</em>: (a) Which clef is used? (b) What mode is it? (c) Sing in this clef/mode.</li>
          <li>&ldquo;A Tisket A Tasket&rdquo; starting on the note <em>fi</em>: (a) Which clef is used? (b) What mode is it? (c) Sing in this clef/mode.</li>
          <li>&ldquo;A Tisket A Tasket&rdquo; starting on the note <em>mi</em>: (a) Which clef is used?</li>
          <li>Sing &ldquo;A Tisket A Tasket&rdquo; in this clef/mode.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-3</p>
        <P>
          <strong>Given the Starting Note of the Melody.</strong> You&rsquo;ve practiced the starting
          notes from the note <em>mi</em> to the note <em>fa</em>. The clef is visible above the melody.
        </P>
        <p className="text-slate-200 font-semibold text-sm mt-3 mb-1">Yankee Doodle — where is the clef, what are the notes of the melody?</p>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm">
          <li>&ldquo;Yankee Doodle&rdquo; in the alto clef: what is the starting note? (write the name)</li>
          <li>&ldquo;Yankee Doodle&rdquo; in the mezzo-soprano clef: what is the starting note?</li>
          <li>&ldquo;Yankee Doodle&rdquo; in the tenor clef: what is the starting note?</li>
          <li>&ldquo;Yankee Doodle&rdquo; in the baritone clef: what is the starting note?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-4</p>
        <P>
          <strong>Treble Clef in Relation to Other Clefs.</strong> Now the goal is to be able to
          identify the clef by looking at the starting note of the melody, specifically for the clef
          used below.
        </P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>With the alto clef, read <em>sol</em>, then _____ from treble.</li>
          <li>With the baritone clef, read <em>sol</em>, then _____ from treble.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-5</p>
        <P>
          <strong>Tracking Ascending Diatonic Intervals.</strong> To become familiar with ascending
          diatonic intervals while increasing your interval reading fluency on the staff, focus first
          on identifying smaller intervals, and then gradually proceed to larger ones. When working
          with intervals, focus on the melodic direction as follows, alternating each such pair of
          intervals in the pair then proceeding on to the next.
        </P>
        <P>
          In practicing alternating, focus on alternating two specific intervals as follows, alternating
          each such pair of intervals in the pair then proceeding on to the next. The following Lap Map
          Pattern represents these in turn; as you progress, make sure you keep notes of the melodic
          shape, and track the notes as you proceed through each sequence.
        </P>
        <P>
          For this, you will need to divide the four-beat per line time into the Lange-time interval,
          keeping the four-beat divisions throughout the sequence. You can continue to practice
          alternating this pattern, taking the Lange, however, up to any interval sequence, and then
          alternating with the following pairs.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-6</p>
        <P>
          <strong>Tracking Descending Diatonic Intervals.</strong> Take the previous exercise. For a
          descending interval, take each note, write each note as well, alternating with the descending
          pattern below each note interval. As you complete the following descending interval exercise,
          make sure you are performing the bass.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-7</p>
        <P>
          <strong>Tracking Ascending Diatonic Intervals (Part 2).</strong> For this, you will need to
          divide the four-beat per measure time by the Lange-time note; keep these divisions and mark
          the notes every four beats.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-8</p>
        <P>
          <strong>Tracking Descending Diatonic Intervals (Part 2).</strong> Additional musical notation
          exercises.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-9</p>
        <P>
          <strong>The 5-Note Row Exercise.</strong> This exercise will consist of 5 notes found at an
          octave (including diatonic thirds and 4ths); next, practice tracking each of the entire five
          notes separately in random order (including doubles and 4ths) in random order, and then
          repeat. To create a new note, write each of the entire four notes separately.
        </P>
        <P>
          For example, consider solfège-like solfège, help along as a guide a, b, c, d, let&rsquo;s
          start that up in the middle. Note the following: you should first speak the syllable for the
          first note in the middle (4) of the sequence, followed by the syllable for the next note (2)
          of the sequence, and back again as a word, such as <em>sol, la, mi, fa, mi</em>.
        </P>
        <P>
          Practice the syllable at your instrument, checking each note as you go. Follow each note&rsquo;s
          syllable value: <em>do, re, mi, fa, sol</em>. Mi&hellip;
        </P>
        <P>Notes of the diatonic scale for reference: doh — re — mi — fa — sol — la — ti — doh.</P>
        <P>
          This exercise should only be completed when you are able to completely write every note
          (including doubles and fourths) randomly without repeating any of them. Practice each of those
          notes once in a random order, once in a particular random order, and then go from there to the
          next note. Practice each of those notes from the first note, and up and down each octave.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 8-10</p>
        <P>
          <strong>The 5-Note Row Exercise (continued).</strong> Take the previous exercise found in the
          previous exercises; take each note, write each note, and then alternate the whole pattern,
          alternating from beginning to end, until you can randomly move through them without repeating any.
        </P>
        <P>
          Practice singing each syllable as fluently — keep track of all as you go.
        </P>
      </div>

      {/* ── CH.9 ── */}
      <H2 id="ch9">Ch.9 — Di-Chord Numbers</H2>

      <H3>Numbering Di-Chords</H3>
      <P>
        Saying that an interval is a 3rd gives us some information about the interval, but it does not tell
        us what the precise distance is between two notes; this is like learning that a creature is a mammal
        but not knowing whether it is a tiger or a house cat. To have the next level of knowledge about an
        interval, we would need its di-chord number or a word like &ldquo;major,&rdquo; &ldquo;minor,&rdquo;
        &ldquo;augmented,&rdquo; or &ldquo;diminished;&rdquo; from this we could know exactly how many
        semitones are between the bottom and the top notes.
      </P>
      <P>
        The term <em>di-chord number</em> refers to the number of semitones between any two pitch classes.
        To determine the di-chord number of two notes, count the number of semitones between the notes.
        Because you are counting the distance as you move by semitone, you must always start counting at
        zero. Think of it this way — to calculate how far you drive, your car&rsquo;s odometer has to start
        on zero, not on any other number.
      </P>
      <P>
        Note that this is different from how we calculated diatonic interval names; the diatonic interval
        vocabulary (&ldquo;2nd,&rdquo; &ldquo;3rd,&rdquo; etc.) uses the language of ordinal numbers.
        <em> Ordinal</em> means that the numbers are indicating rank or position — remember that intervals
        are determined according to the diatonic relationship between two notes rather than the number of
        semitones between them.
      </P>
      <P>
        When naming intervals in the last two chapters, we used ordinal numbers (2nd, 3rd, 4th, etc.). The
        vocabulary of di-chords uses cardinal numbers (1, 2, 3, etc.). When writing di-chord numbers, use
        brackets around them to distinguish them from other types of numbers — <BC>[1]</BC>, <BC>[2]</BC>,{' '}
        <BC>[3]</BC>, etc.
      </P>
      <P>
        For example, <em>fa</em> to <em>la</em> is a di-chord <BC>[4]</BC> because there are four semitones
        between <em>fa</em> and <em>la</em>, but we can also see that it is a 3rd because it skips over one
        note (sol).
      </P>
      <P>
        <em>Mi</em> to <em>sol</em> is a di-chord <BC>[3]</BC> because there are only three semitones
        between <em>mi</em> and <em>sol</em>. But, what is the diatonic interval? <em>Mi–fa–sol</em> skips
        over only one note, so <em>mi</em> to <em>sol</em> is a 3rd.
      </P>
      <P>
        Notice that <em>fa</em> to <em>la</em>, a di-chord <BC>[4]</BC>, and <em>mi</em> to <em>sol</em>, a
        di-chord <BC>[3]</BC>, are both 3rds. This difference can be indicated by using the terms{' '}
        <em>major 3rd</em> to describe the di-chord <BC>[4]</BC> from <em>fa</em> to <em>la</em> and{' '}
        <em>minor 3rd</em> to describe the di-chord <BC>[3]</BC> from <em>mi</em> to <em>sol</em>. Here,
        major means larger; the major 3rd is one semitone larger than the minor or &ldquo;smaller&rdquo; 3rd.
      </P>
      <P>
        Each di-chord number is associated with a common traditional interval name, like <em>minor 3rd</em>{' '}
        or <em>major 3rd</em>, etc. Each di-chord number also has an uncommon interval name, like{' '}
        <em>augmented 2nd</em> or <em>diminished 4th</em>, etc. Common names are those found in the
        diatonic scale, and uncommon names are those found in chromatically altered scales.
      </P>
      <P>
        Notice that notes on the staff only give us ordinal information (3rd, 4th, etc.) but do not tell us
        directly what kind of interval it is (major or minor 3rd). For instance, both of the following
        examples are 3rds; however, if you check at the keyboard, you will see that the first is a di-chord{' '}
        <BC>[3]</BC>, and the second is a di-chord <BC>[4]</BC>.
      </P>
      <P>
        Furthermore, the di-chord formed between the same two lines on the staff can be different with
        different clefs. Two notes that appear a 3rd apart in the same location on the staff can be
        different di-chords, depending on which clef is being used.
      </P>
      <P>
        Using keyboard visualization and the counting method described earlier in the chapter, you can see
        that <em>la</em> up to <em>doh</em> and <em>doh</em> up to <em>mi</em> are both 3rds. However, if
        you count the number of semitones between <em>la</em> and <em>doh</em>, you will find that there are
        three; if you count the number of semitones between <em>doh</em> and <em>mi</em>, you will find that
        there are four. This is important because pitch pairs that are three semitones apart feel and mean
        something completely different than pitch pairs with fewer or more semitones between them. If you
        keep track of where you are in pitch space, using the keyboard, you will always know whether the 3rd
        you are about to play is three or four semitones.
      </P>
      <P>
        Knowing the di-chord you are about to play tells you a lot about the meaning of a given moment in
        music, giving you access to new levels of expressivity in playing.
      </P>
      <P>
        Using this knowledge in real time to heighten your consciousness of music and to communicate musical
        meaning more effectively (and affectively) requires fluency in two skill sets. You have to become a
        great tracker with the keyboard, so you know which di-chords you are playing. If you always know
        what di-chord you are playing, singing, hearing, reading, or writing, you know its characteristics
        and can use that information to help you. Therefore, your tracking to help you connect with music,
        you must develop an immediate knowledge of the properties of the 11 di-chords. This chapter of the
        workbook will help you become comfortable using di-chord numbers and &ldquo;program in&rdquo;
        relevant information about the di-chords so that when you are tracking, you are also gaining insight
        into the affect and meaning of the music you are hearing or performing.
      </P>

      <H3>Exercises: Di-Chord Number Calculation</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-1</p>
        <P>Write the di-chord number corresponding to each pair of notes:</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li><em>sol</em> up to <em>ti</em></li>
          <li><em>ti</em> up to <em>fa</em></li>
          <li><em>fa</em> down to <em>re</em></li>
          <li><em>doh</em> up to <em>sol mi</em></li>
          <li><em>la</em> down to <em>fa</em></li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-2</p>
        <P>
          Write the di-chord number corresponding to each pair of notes. Underneath each pair, write the
          sum of the two di-chord numbers.
        </P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-3 text-sm mt-2">
          <li>
            <em>la</em> up to <em>si</em> ___&nbsp;&nbsp;&nbsp;
            <em>ti</em> up to <em>fa</em> ___&nbsp;&nbsp;&nbsp;
            Sum: ___
          </li>
          <li>
            <em>mi</em> down to <em>doh</em> ___&nbsp;&nbsp;&nbsp;
            <em>doh</em> down to <em>mi</em> ___&nbsp;&nbsp;&nbsp;
            Sum: ___
          </li>
          <li>
            <em>sol</em> down to <em>mi</em> ___&nbsp;&nbsp;&nbsp;
            <em>mi</em> down to <em>sol</em> ___&nbsp;&nbsp;&nbsp;
            Sum: ___
          </li>
          <li>
            <em>re</em> up to <em>la</em> ___&nbsp;&nbsp;&nbsp;
            <em>la</em> up to <em>re</em> ___&nbsp;&nbsp;&nbsp;
            Sum: ___
          </li>
          <li>
            <em>mi</em> up to <em>fa</em> ___&nbsp;&nbsp;&nbsp;
            <em>fa</em> up to <em>mi</em> ___&nbsp;&nbsp;&nbsp;
            Sum: ___
          </li>
        </ol>
        <P>
          What pattern do you notice in your answers? The sum always equals 12. In each example, the second
          pair of notes is the inversion of the first pair of notes. The inversion of any di-chord can be
          obtained by subtracting the di-chord from the number 12. Remember that there are 12 semitones in
          an octave.
        </P>
      </div>

      <H3>Di-Chord Numbers and Ordinal Interval Names</H3>
      <P>
        The table below shows the correspondences between di-chord numbers and the common and uncommon
        interval names. Remember that although there are multiple interval names for each di-chord number,
        the most common names are the intervals that occur in the diatonic scale.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-Chord Number</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Common Interval Name</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Uncommon Interval Name</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]',  'minor 2nd',      'chromatic half-step'],
              ['[2]',  'major 2nd',      'diminished 3rd'],
              ['[3]',  'minor 3rd',      'augmented 2nd'],
              ['[4]',  'major 3rd',      'diminished 4th'],
              ['[5]',  'perfect 4th',    '—'],
              ['[6]',  'augmented 4th',  'diminished 5th'],
              ['[6]',  'diminished 5th', 'augmented 4th'],
              ['[7]',  'perfect 5th',    '—'],
              ['[8]',  'minor 6th',      'augmented 5th'],
              ['[9]',  'major 6th',      'diminished 7th'],
              ['[10]', 'minor 7th',      'augmented 6th'],
              ['[11]', 'major 7th',      'diminished 8ve'],
            ].map(([dc, common, uncommon], i) => (
              <tr key={`${dc}-${i}`} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-3 py-2">{common}</td>
                <td className="border border-slate-300 px-3 py-2 text-slate-500">{uncommon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>Notice that by common interval names:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><BC>[1]</BC> and <BC>[2]</BC> are 2nds</li>
        <li><BC>[3]</BC> and <BC>[4]</BC> are 3rds</li>
        <li><BC>[8]</BC> and <BC>[9]</BC> are 6ths</li>
        <li><BC>[10]</BC> and <BC>[11]</BC> are 7ths</li>
        <li><BC>[5]</BC> is a perfect 4th</li>
        <li><BC>[7]</BC> is a perfect 5th</li>
      </ul>
      <P>
        The di-chord <BC>[6]</BC>, which splits the octave exactly in half, can be spelled either as an
        augmented 4th (because it is one semitone larger than the perfect 4th, di-chord <BC>[5]</BC>) or a
        diminished 5th (because it is one semitone smaller than the perfect 5th, di-chord <BC>[7]</BC>).
        For example, <em>sol</em> up to <em>doh#</em> is an augmented 4th (any <em>sol</em> up to any{' '}
        <em>doh</em> will always be some type of 4th). However, <em>sol</em> up to <em>re&#x266D;</em> is a
        diminished 5th (any <em>sol</em> up to any <em>re</em> will always be some type of 5th).
      </P>

      <H3>Exercises: Developing Fluency with Di-Chord Numbers</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-3</p>
        <P>
          At the piano, pick a starting note. Using only white keys, track up a 2nd. Is this a di-chord{' '}
          <BC>[1]</BC> or <BC>[2]</BC>? Is this a major or minor 2nd? Return back to your chosen starting
          note and track down a 2nd. Is this a <BC>[1]</BC> or <BC>[2]</BC>? Is this a major or minor 2nd?
          Speak your answers aloud and in rhythm. For example, if you were to start on <em>doh</em>, you
          would say: &ldquo;<em>Doh</em>, <em>re</em>, [2], major 2nd, (pause), <em>doh</em>, <em>si</em>,
          [1], minor 2nd.&rdquo; Then, move up a 2nd, to <em>re</em>, and perform the same sequence.
        </P>
        <P>
          There are many ways to use this exercise. In one practice session, you might explore only the
          different kinds of 2nds and do this same exercise with each of the seven white notes. On a
          different day, try keeping the same starting note but practicing all types of interval — 2nds
          through 7ths. Be creative in your practicing; the more angles from which you can examine a
          concept, the more deeply you will understand it, and the more easily you can use it to improve
          your music-making!
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-4</p>
        <P>
          Make flashcards with a di-chord number on one side and its corresponding common interval name on
          the other. Quiz yourself by reading the number and answering with the interval name, or by reading
          the interval name and responding with the number. Work to increase your speed until you can
          identify the corresponding name or number at the rate of about one per second. When you have
          mastered the flashcards, move on to the next exercise.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-5</p>
        <P>
          Match the di-chord numbers in the left column to the corresponding traditional interval names in
          the right column by drawing lines between the appropriate di-chord numbers and interval names.
          Remember that you will draw two different lines from di-chord <BC>[6]</BC> because it has two
          different names.
        </P>
        <div className="flex gap-8 mt-3">
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1">Di-Chord Numbers</p>
            <ul className="text-slate-300 text-sm space-y-1 font-mono">
              {['[3]','[2]','[6]','[9]','[1]','[4]','[11]','[5]','[7]','[8]','[10]'].map(n => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1">Interval Names</p>
            <ul className="text-slate-300 text-sm space-y-1">
              {['minor 7th','augmented 4th','major 3rd','minor 3rd','minor 6th','perfect 5th','minor 2nd','major 7th','diminished 5th','major 2nd','major 6th'].map(n => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 9-6</p>
        <P>
          Of all the possible intervals of a 2nd that can be created using only white notes, which are
          major and which are minor? How many are major, and how many are minor? What about for 3rds? Find
          the answers to these questions by completing the following exercises.
        </P>
        <P>Next to each pair of notes, write whether they form a major or minor 2nd, and write the corresponding di-chord number — <BC>[1]</BC> or <BC>[2]</BC>.</P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300">#</th>
                <th className="border border-slate-600 px-3 py-2 text-left text-slate-300">Note Pair</th>
                <th className="border border-slate-600 px-3 py-2 text-left text-slate-300">Answer</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1.', 'doh up to re',  'major 2nd, [2]'],
                ['2.', 're up to mi',   ''],
                ['3.', 'mi up to fa',   ''],
                ['4.', 'fa up to sol',  ''],
                ['5.', 'sol up to la',  ''],
                ['6.', 'la up to si',   ''],
                ['7.', 'si up to doh',  ''],
              ].map(([n, pair, ans], i) => (
                <tr key={n} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400">{n}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-300 italic">{pair}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400">{ans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1 mt-2" start={8}>
          <li>How many 2nds in the diatonic scale are major?</li>
          <li>How many 2nds in the diatonic scale are minor?</li>
        </ol>
        <P>Next to each pair of notes, write whether they form a major or minor 3rd, and write the corresponding di-chord number — <BC>[3]</BC> or <BC>[4]</BC>.</P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300">#</th>
                <th className="border border-slate-600 px-3 py-2 text-left text-slate-300">Note Pair</th>
                <th className="border border-slate-600 px-3 py-2 text-left text-slate-300">Answer</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1.', 'doh up to mi',  'major 3rd, [4]'],
                ['2.', 're up to fa',   ''],
                ['3.', 'mi up to sol',  ''],
                ['4.', 'fa up to la',   ''],
                ['5.', 'sol up to si',  ''],
                ['6.', 'la up to doh',  ''],
                ['7.', 'si up to re',   ''],
              ].map(([n, pair, ans], i) => (
                <tr key={n} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400">{n}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-300 italic">{pair}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400">{ans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1 mt-2" start={8}>
          <li>How many 3rds in the diatonic scale are major?</li>
          <li>How many 3rds in the diatonic scale are minor?</li>
        </ol>
      </div>

      {/* ── CH.10 ── */}
      <H2 id="ch10">Ch.10 — The Sonic Properties of Di-Chords</H2>

      <H3>Sonic Dimensionality</H3>
      <P>
        One of the toughest problems we face in learning to distinguish between the 11 basic di-chords
        is their sonic dimensionality — they are not just rough or smooth, black or white, but are
        multidimensional and often seemingly paradoxical. It is this sonic dimensionality that gives each
        of the 11 di-chords their individual character, and it is the individual character of each
        di-chord that we learn to hear, identify, and use to impart meaning to our music, allowing us to
        better understand and express its communicative nature.
      </P>
      <P>
        Like with any of our friends, each di-chord has specific features that allow us to identify it.
        Also, just like with people, context has a huge effect on how the di-chords act and how we
        perceive them — sometimes even making them quite difficult to recognize. The good news is that,
        while we may have countless friends and acquaintances, there are only 11 di-chords to become
        acquainted with!
      </P>
      <P>
        To distinguish one di-chord from another, our ears must systematically attend to three distinct
        sound factors that I have named:
      </P>
      <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>Interference Pulsation</li>
        <li>Fundamental/Octave Factor</li>
        <li>Harmonicity</li>
      </ol>
      <P>
        To illustrate the combined effect of these three factors on the 11 di-chords I have created the
        Di-Chord Pictograph.
      </P>

      <H3>The Three Sound Factors</H3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">1. Interference Pulsation</p>
          <p className="text-slate-600 text-sm">The rhythmic beating rate created by two simultaneous pitches. Dissonant/Modal/Perfect.</p>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">2. Fundamental/Octave Factor</p>
          <p className="text-slate-600 text-sm">Which pitch functions as the acoustic &ldquo;root&rdquo; — the note whose overtone series contains the other note.</p>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-1">3. Harmonicity</p>
          <p className="text-slate-600 text-sm">Whether the upper note appears in the overtone series of the lower note (harmonic) or not (non-harmonic).</p>
        </div>
      </div>

      <SonicPropertyExplorer />

      <H3>The Di-Chord Pictograph</H3>
      <P>
        The Di-Chord Pictograph consists of 11 numbers, each of which represents one of the 11
        di-chords. Each number has a <em>shape</em>, a <em>shadow</em>, and a <em>color</em>, which
        represent, respectively, the interference pulsation, the fundamental/octave factor, and
        harmonicity. Using the Di-Chord Pictograph as a tool helps the conscious mind comprehend how
        each di-chord can simultaneously possess the three sound factors.
      </P>
      <P>
        Ignoring one factor in a di-chord allows the ear to confuse it with another. For example, if
        you ignore the &ldquo;color,&rdquo; you might confuse di-chords <BC>[3]</BC> and <BC>[4]</BC>;
        if you ignore the &ldquo;shadow,&rdquo; you might confuse di-chords <BC>[3]</BC> and{' '}
        <BC>[8]</BC> or <BC>[2]</BC> and <BC>[10]</BC>.
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li><strong>Shape</strong> = Interference Pulsation</li>
        <li><strong>Shadow</strong> = Fundamental/Octave Factor</li>
        <li><strong>Color</strong> = Harmonicity</li>
      </ul>

      <div className="my-8"><DiChordPictograph /></div>

      {/* ── CH.11 ── */}
      <H2 id="ch11">Ch.11 — Interference Pulsation</H2>
      <P>When we hear any of the 11 di-chords, we can perceive a subtle and even rhythmic pulse that is occurring eight times per second, four times per second, or two times per second (8Hz, 4Hz, or 2Hz). This property of di-chords is called <em>interference pulsation</em>. Observing the interference pulsation of a di-chord allows us to discern the basic category of the di-chord as <em>dissonant</em>, <em>modal</em>, or <em>perfect</em>. The interference pulsation pictograph represents the three types of interference pulsation with jagged, wavy, or straight lines.</P>

      <H3>Dissonant</H3>
      <P>Dissonant di-chords have an interference pulsation of eight pulses per second (8Hz). The dissonant di-chords are [1], [2], [10], and [11] — di-chords that are either a [1] or [2] from the fundamental or any octave above. Notice that the dissonant di-chords are 2nds or 7ths, in traditional terminology. In the Di-Chord Pictograph, all dissonant di-chords are depicted with a jagged-edged line, representing a fast, 8Hz interference pulsation.</P>

      <H3>Modal</H3>
      <P>Modal di-chords have an interference pulsation of four pulses per second (4Hz). The modal di-chords are [3], [4], [8], and [9] — di-chords that are either a [3] or [4] from the fundamental or any octave above. Notice that the modal di-chords are 3rds or 6ths, in traditional terminology. In the Di-Chord Pictograph, all modal di-chords are depicted with a smooth, rounded line, representing a smooth, flowing, or &ldquo;wobbly&rdquo; 4Hz interference pulsation.</P>

      <H3>Perfect</H3>
      <P>Perfect di-chords have an interference pulsation of two pulses per second (2Hz). The perfect di-chords are [5], [6], and [7] — di-chords that are either [5] or [6] from the fundamental or any octave above. Notice that, in traditional terminology, the perfect di-chords are either 4ths or 5ths. In the Di-Chord Pictograph, all perfect di-chords are depicted with straight lines, representing a flat, slow, stolid 2Hz interference pulsation.</P>

      <H3>Dissonant, Modal, or Perfect?</H3>
      <P>Recognizing that a di-chord is dissonant will not help you know which one it is unless you know which of the 11 di-chords are dissonant. The next three chapters will help you memorize information about di-chord properties. Remember, dissonant = 8Hz, modal = 4Hz, and perfect = 2Hz.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left">Di-Chord Number</th>
              <th className="border border-slate-300 px-3 py-2 text-left">Interference Pulsation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', 'dissonant'],
              ['[2]', 'dissonant'],
              ['[3]', 'modal'],
              ['[4]', 'modal'],
              ['[5]', 'perfect'],
              ['[6]', 'perfect'],
              ['[7]', 'perfect'],
              ['[8]', 'modal'],
              ['[9]', 'modal'],
              ['[10]', 'dissonant'],
              ['[11]', 'dissonant'],
            ].map(([dc, puls], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-3 py-2">{puls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PulsationExplorer />

      <H3>Exercises: Getting to Grips with Interference Pulsation</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-1</p>
        <P>The di-chord pictograph is a visual aid for remembering the properties of each di-chord number. In the di-chord pictograph, a number&rsquo;s outline corresponds to its interference pulsation: dissonant di-chords have jagged outlines, modal di-chords have wavy outlines, and perfect di-chords have straight outlines.</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>In the space provided, draw the words &ldquo;Dissonant,&rdquo; &ldquo;Modal,&rdquo; and &ldquo;Perfect&rdquo; using jagged, wavy, and straight lines.</li>
          <li>In the space provided, draw the outline (interference pulsation) for each of the 11 di-chords.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-2</p>
        <P>In this exercise you will practice, for just a minute or two, speaking and naming the rhythms of perfect and dissonant interference pulsation.</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>Set your metronome to 60 bpm and imagine that there is one vertical di-chord on every beat.</li>
          <li>Divide the 60 bpm beat into two and eight equal subdivisions, speaking each beat in order, and using the lap map (see chapter 5, &ldquo;The Lap Map&rdquo;). It will be challenging, at first, to speak the numbers when subdividing into eight equal parts. Try staying light and agile in your voice, making beats 1 and 5 strongest, 3 and 7 the next strongest, and all even-numbered beats quiet. Saying &ldquo;5-6-7-8&rdquo; can be challenging in many languages; if it&rsquo;s too difficult for you, just say &ldquo;1-2-3-4-1-2-3-4.&rdquo;</li>
          <li>Now speak the number of interference pulsations for the first half of the beat and name the interference pulsation on the second half. With each beat, alternate between perfect and dissonant pulsations. The end result should be like this: &ldquo;1-perfect, 1-2-3-4-dissonant, 1-perfect, 1-2-3-4-dissonant, etc.&rdquo;</li>
          <li>Speak both the rhythm and the names while you practice, and improvise changing between dissonant and perfect pulsations. The idea is not to test yourself but rather to form strong associations between the rhythm and the label. To actually use interference pulsation when identifying di-chords, these associations must be instant.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-3</p>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm">
          <li>Set your metronome at 60 bpm and remind yourself of the tempo — you don&rsquo;t need to use it during the exercise, but you should be careful to keep your tempo steady.</li>
          <li>At the piano, start by playing a di-chord [1] in the middle range of the piano. Repeat the di-chord once per second, listening for the interference pulsation of eight pulses per second.</li>
          <li>To hear the interference pulsation more clearly, speak the rhythm while you are playing, and then taper off the speaking while continuing to play so that you are imagining the numbers in rhythm while you play — you should then be able to hear that what you are playing matches up with the rhythm in your mind.</li>
          <li>Now play a di-chord [7], maintaining the same lower note you used for di-chord [1]. Depending on your starting note, you may have to use black notes for either one or both of the upper notes. Repeat this di-chord at the tempo of 60 bpm while listening for two pulses per second.</li>
          <li>Once you feel comfortable with the previous steps, move back and forth between [1] and [7], listening for the rhythmic change. Sometimes it is drawing comparisons that do the most to clarify what we are listening for, so don&rsquo;t spend too much time trying to hear pulsation in a single di-chord — work on comparing one type of interference pulsation with another.</li>
        </ol>
        <P>Below is the complete list of pairs of dissonant and perfect di-chords to compare. Place check marks in the spaces after comparing each set.</P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Pair</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Check</th>
              </tr>
            </thead>
            <tbody>
              {['[1]/[7]','[1]/[5]','[1]/[6]','[2]/[5]','[2]/[7]','[2]/[6]',
                '[10]/[7]','[10]/[5]','[10]/[6]','[11]/[7]','[11]/[5]','[11]/[6]'].map((pair, i) => (
                <tr key={pair} className={i % 2 === 1 ? 'bg-slate-800' : ''}>
                  <td className="border border-slate-600 px-3 py-2 font-mono text-slate-200">{pair}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-4</p>
        <P>Repeat Exercise 11-2 but this time improvising comparisons between dissonant (8 Hz) and modal (4 Hz).</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-5</p>
        <P>Repeat Exercise 11-3 but this time playing, listening to, and comparing dissonant and modal di-chords. Below is the complete list of pairs of dissonant and modal di-chords to compare. Place check marks in the spaces after comparing each set.</P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Pair</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Check</th>
              </tr>
            </thead>
            <tbody>
              {['[1]/[3]','[1]/[4]','[2]/[3]','[2]/[4]','[1]/[8]','[1]/[9]',
                '[2]/[8]','[2]/[9]','[8]/[10]','[8]/[11]','[9]/[10]','[9]/[11]'].map((pair, i) => (
                <tr key={pair} className={i % 2 === 1 ? 'bg-slate-800' : ''}>
                  <td className="border border-slate-600 px-3 py-2 font-mono text-slate-200">{pair}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-6</p>
        <P>Repeat Exercise 11-2 but this time improvising between modal (4 Hz) and perfect (2 Hz).</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-7</p>
        <P>Repeat Exercise 11-3 but this time playing, listening to, and comparing modal and perfect di-chords. Below is the complete list of pairs of modal and perfect di-chords to compare. Place check marks in the spaces after comparing each set.</P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Pair</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Check</th>
              </tr>
            </thead>
            <tbody>
              {['[3]/[5]','[3]/[6]','[3]/[7]','[4]/[5]','[4]/[6]','[4]/[7]',
                '[8]/[5]','[8]/[6]','[8]/[7]','[9]/[5]','[9]/[6]','[9]/[7]'].map((pair, i) => (
                <tr key={pair} className={i % 2 === 1 ? 'bg-slate-800' : ''}>
                  <td className="border border-slate-600 px-3 py-2 font-mono text-slate-200">{pair}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 11-8</p>
        <P>Remember, for you to actually use interference pulsation to identify di-chords, you must be able to immediately recall the associations between each di-chord and its properties. Can you complete this quiz in under 10 seconds?</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>At what rate do perfect di-chords pulse?</li>
          <li>At what rate do dissonant di-chords pulse?</li>
          <li>At what rate do modal di-chords pulse?</li>
          <li>Which di-chords are dissonant?</li>
          <li>Which di-chords are perfect?</li>
          <li>Which di-chords are modal?</li>
          <li>Fill out the table below.</li>
        </ol>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Di-Chord Number</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-left">Interference Pulsation</th>
              </tr>
            </thead>
            <tbody>
              {['[10]','[4]','[7]','[1]','[8]','[5]','[11]','[6]','[3]','[2]','[9]'].map((dc, i) => (
                <tr key={dc} className={i % 2 === 1 ? 'bg-slate-800' : ''}>
                  <td className="border border-slate-600 px-3 py-2 font-mono text-slate-200">{dc}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CH.12 ── */}
      <H2 id="ch12">Chapter Twelve: Properties of Di-Chords: Fundamental/Octave Factor</H2>

      <H3>Referring Up or Down</H3>
      <P>
        In any di-chord, you can hear that its upper note either refers down to its lower note (the
        fundamental) or up to the octave transposition of its lower note (the octave). This phenomenon
        is called the fundamental/octave factor.
      </P>
      <P>
        The fundamental/octave factor allows you to distinguish between di-chords that refer downward
        to the fundamental and those that refer up toward the note one or more octaves above the
        fundamental. This means that after you categorize a di-chord as dissonant, modal, or perfect,
        you can then use the fundamental/octave factor to determine whether a dissonant di-chord is a
        2nd or a 7th, whether a modal di-chord is a 3rd or a 6th, and whether a perfect di-chord is
        a perfect 4th, a perfect 5th, or a di-chord [6].
      </P>
      <P>
        You hear the fundamental/octave factor by listening for whether the upper note of a di-chord
        refers down to its lowest note or up to the octave manifestation of the lowest note.
      </P>
      <P>The following table shows each of the 11 di-chords and whether they refer up or down.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-4 py-2 text-left">Di-Chord Number</th>
              <th className="border border-slate-300 px-4 py-2 text-left">Fundamental/Octave</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', 'refers down'],
              ['[2]', 'refers down'],
              ['[3]', 'refers down'],
              ['[4]', 'refers down'],
              ['[5]', 'refers down'],
              ['[6]', 'refers up or down'],
              ['[7]', 'refers up'],
              ['[8]', 'refers up'],
              ['[9]', 'refers up'],
              ['[10]', 'refers up'],
              ['[11]', 'refers up'],
            ].map(([dc, fo], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-4 py-2 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-4 py-2">{fo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Di-Chord Pictograph Numbers</H3>
      <P>
        As you can see, di-chords [1] through [5] refer down; this is represented on the Di-Chord
        Pictograph by a &ldquo;shadow&rdquo; to the left of each number. Di-chords [7] through [11]
        refer up, and this is represented on the Di-Chord Pictograph by a shadow to the right of each
        number. Di-chord [6] splits the octave directly down the middle and therefore is both referring
        up and referring down.
      </P>
      <P>
        You might notice that, aside from di-chord [6], 2nds, 3rds, and 4ths refer down, while 5ths,
        6ths, and 7ths refer up.
      </P>

      <H3>Exercises: Getting to Grips with Fundamental/Octave Factor</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 12-1</p>
        <P>
          In the space provided, draw the Di-Chord Pictograph with all 11 di-chords. In your drawing
          of the pictograph, illustrate two sound factors—interference pulsation, as indicated by the
          type of outline, and fundamental/octave factor, as indicated by the direction of the shadow.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 12-2</p>
        <P>
          1. At the piano, choose a note to be the fundamental for this exercise.
        </P>
        <P>
          2. Play your chosen note together with the note that is a [1] above it; release the upper
          note quickly while continuing to hold down the lower note. When you release the upper note,
          listen for how it seems to fall back down to the lower note.
        </P>
        <P>
          3. Now, play your chosen fundamental together with the note that is an [11] above it; again,
          release the upper note quickly while continuing to hold down the lower note. Listen and notice
          how this time the upper note seems to be drawn upward by a semitone to the un-played but
          perceptible note that is one octave above the lowest note you are playing.
        </P>
        <P>
          4. Compare the fundamental/octave factors of [1] and [11] using the procedure described,
          specifically listening for whether the upper note refers down or up when it is released.
        </P>
        <P>
          Throughout your practice sessions, compare the following pairs. Notice that the [6] feels
          neither like it refers up nor down—a very different aural experience than [5] and [7], though
          all three of these di-chords have a 2Hz interference pulsation rate. Check off each pair as
          you work your way through the list.
        </P>
        <P>
          <strong>2nds and 7ths:</strong><br />
          [1]/[11] ______ &nbsp; [1]/[10] ______ &nbsp; [2]/[11] ______ &nbsp; [2]/[10] ______
        </P>
        <P>
          <strong>3rds and 6ths:</strong><br />
          [1]/[9] ______ &nbsp; [1]/[8] ______ &nbsp; [4]/[8] ______ &nbsp; [4]/[9] ______
        </P>
        <P>
          <strong>4ths and 5ths:</strong><br />
          [5]/[6]/[7] ______
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 12-3</p>
        <P>
          In the box to the right of each di-chord number, draw an up arrow or a down arrow to
          indicate the direction to which the top note of the di-chord is referring. [6] will have a
          single arrow pointing both up and down.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-4 py-2 text-left text-slate-200">Di-Chord</th>
                <th className="border border-slate-600 px-4 py-2 text-left text-slate-200">Fundamental/Octave Factor</th>
              </tr>
            </thead>
            <tbody>
              {[
                '[5]', '[2]', '[10]', '[11]', '[3]', '[1]', '[6]', '[4]', '[7]', '[8]', '[9]',
              ].map((dc, i) => (
                <tr key={dc} className={i % 2 === 1 ? 'bg-slate-800' : 'bg-slate-850'}>
                  <td className="border border-slate-600 px-4 py-2 font-mono font-bold text-slate-100">{dc}</td>
                  <td className="border border-slate-600 px-4 py-2 text-slate-400">______</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>Answer the following questions:</P>
        <P>1. In which di-chords does the upper note refer up to the octave manifestation of the lower note?</P>
        <P>2. In which di-chords does the upper note refer down to the lower note?</P>
        <P>3. What is extraordinary about the fundamental/octave factor of [6]?</P>
        <P>
          4. To fill out the following table, combine your knowledge of traditional interval names with
          your understanding of the fundamental/octave factor. Draw an up or down arrow in each cell
          to the right of the interval names.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-4 py-2 text-left text-slate-200">Interval Name</th>
                <th className="border border-slate-600 px-4 py-2 text-left text-slate-200">Fundamental/Octave Factor</th>
              </tr>
            </thead>
            <tbody>
              {[
                'minor 2nd',
                'perfect 5th',
                'major 4th',
                'minor 2nd',
                'minor 6th',
                'major 4th',
                'minor 3rd',
                'major 3rd',
                'augmented 4th',
                'perfect 4th',
                'minor 2nd',
                'diminished 5th',
              ].map((name, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-slate-800' : 'bg-slate-850'}>
                  <td className="border border-slate-600 px-4 py-2 text-slate-100">{name}</td>
                  <td className="border border-slate-600 px-4 py-2 text-slate-400">______</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CH.13-14 ── */}
      <H2 id="ch13-14">Ch.13–14 — Harmonicity &amp; Review</H2>

      {/* ── CHAPTER 13: Properties of Di-Chords: Harmonicity ── */}
      <H3>Harmonicity — Harmonic or Non-Harmonic</H3>
      <P>
        Now you can hear whether a di-chord is dissonant, modal, or perfect and whether it refers up
        or down. However, both [1] and [2] are dissonant and look down. Both [8] and [9] are modal
        and look up. How can you distinguish [1] and [2], [8] and [9], or any of the other pairs of
        di-chords that share the first two properties?
      </P>
      <P>
        This is where the third factor comes in&mdash;harmonicity. Any di-chord can be classed as
        being harmonic or non-harmonic. Whether a di-chord is harmonic or non-harmonic depends on
        whether the upper note is in the first nine notes of the overtone series of the lower note.
      </P>
      <P>
        The harmonic di-chords&mdash;[2], [4], [7], [9]**, [10]&mdash;sound open, hollow, and
        expanding, and possess a sort of bland, alkaline &ldquo;flavor&rdquo; for the ear. In
        addition, the two pitches in a harmonic di-chord create an effect in the ear similar to the
        effect of repelling one another, like two magnets of like polarity.
      </P>
      <P>
        On the other hand, non-harmonic di-chords&mdash;[1], [3], [5], [6]*, [8],
        [11]&mdash;sound closed, dense, and contracting, and possess a sharp, acidic &ldquo;flavor&rdquo;
        for the ear. The two pitches in a non-harmonic di-chord create an effect in the ear similar
        to the effect of strongly attracting towards one another, like two magnets of opposite polarity.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Di-Chord</th>
              <th className="border border-slate-300 px-3 py-2">Harmonicity</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', 'non-harmonic'],
              ['[2]', 'harmonic'],
              ['[3]', 'non-harmonic'],
              ['[4]', 'harmonic'],
              ['[5]', 'non-harmonic'],
              ['[6]', '—*'],
              ['[7]', 'harmonic'],
              ['[8]', 'non-harmonic'],
              ['[9]', 'harmonic**'],
              ['[10]', 'harmonic'],
              ['[11]', 'non-harmonic'],
            ].map(([dc, harm], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-1.5 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-3 py-1.5">{harm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        * [6] is a &ldquo;false non-harmonic&rdquo; because the harmonicity is perceived as neutral,
        being neither like harmonic nor non-harmonic di-chords.
      </P>
      <P>
        ** [9] is a &ldquo;false harmonic&rdquo; because, while its harmonicity sounds decidedly
        like the harmonic di-chords, its upper note does not fall within the first nine notes of the
        overtone series of the lower note.
      </P>

      <H3>Di-Chord Pictograph and Harmonicity Colors</H3>
      <P>
        In the Di-Chord Pictograph and in the previous table, harmonic di-chords are depicted as
        light or pale in color, while non-harmonic di-chords are depicted as a vivid or intense dark
        color (while this textbook uses shades of gray, you can draw and color your own pictograph
        using shades of your favorite color).
      </P>

      <FoHarmonicityExplorer />

      <H3>Exercises: The Notes of the Overtone Series</H3>
      <P>
        One way of learning which notes in the overtone series of any given note are perceived as
        harmonic (and thus which specific di-chords are harmonic) is to become fluent in spelling
        dominant ninth chords. The dominant ninth chord contains four of the five notes from the
        overtone series that produce harmonicity. The fifth note that is not included in a dominant
        ninth chord is the false harmonic a [9] (major 6th) above the fundamental. For more detailed
        information on the overtone series, see page 296.
      </P>
      <P>
        The following exercises will help you develop fluency in spelling dominant ninth chords by
        starting with major triads, moving to dominant seventh chords, and finishing with dominant ninths.
      </P>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-1: Spelling Major Triads</p>
        <P>
          1. At the keyboard, or using a visualized keyboard, pick any white note as a starting note
          for this exercise.
        </P>
        <P>
          2. While tracking on your visualized or real keyboard, spell aloud a major triad above
          your starting note&mdash;go up a [7] to the note that is a perfect 5th above the
          fundamental, then come down to the note that is a [4] or major 3rd above the fundamental,
          and finish with the fundamental again.
        </P>
        <P>
          3. When you have completed one triad, move to the next white note. Continue until you have
          spelled major triads for each white note on the keyboard. If you were to start on doh, the
          exercise should go something like this: &ldquo;Doh, sol, mi, doh. Re, la, fae, re. Mi,
          eie.&rdquo; Make sure to spell the triads aloud in a steady rhythm.
        </P>
        <P>
          4. Once you are fluent with the major chords using white keys as fundamentals, practice
          the exercise with black-key notes as well. Remember to practice spelling based on both the
          flat and sharp name for each note. Part of an example could sound like this: &ldquo;Sole,
          rea, rie, sole. Lah, mib, doh, lah.&rdquo; Don&rsquo;t forget about fab/mia and doh/sie!
          Notice patterns; for example, if you can spell doh major (doh mi soh), you can easily
          spell doha major, since each note in that chord simply has a sharp added&mdash;doha, mia, sole.
        </P>
        <P>
          As with all of the exercises in this book, these exercises can and should be varied from
          day to day. One day, you might spell chords in descending order, as suggested in the
          exercise instructions, and the next day, you might try spelling them in ascending order.
          On other days, you might move up or down systematically by any other interval, or you
          might improvise, choosing new fundamentals in real time. For a fun challenge, you can
          spell chords above notes in the 21-note row exercise (p. 100); choose different clefs for
          the 21-note row to mix things up even more!
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-2: Spelling Dominant 7th Chords</p>
        <P>
          Follow the same procedure as in the previous exercise, but spell a dominant 7th chord
          above each note. To spell a dominant 7th, you will need to have a [10] chord above the
          fundamental. Starting on the fundamental, go up to the note a minor 7th above the
          fundamental, come down to the note that is a major 3rd above the fundamental, and then
          come down to the note that is a perfect 5th above the fundamental. Start with the white
          notes. Remember to track using a real or visualized keyboard and spell the chords aloud
          and in rhythm.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-3: Spelling Dominant 9th Chords</p>
        <P>
          Follow the same procedure as in the previous exercise, but add in the dominant ninth,
          which is nominally a major 2nd above the fundamental (the actual distance is an octave
          plus a [2]). So, starting on the fundamental, track up an octave plus a [2] to the note
          a major 2nd and an octave above the fundamental, come down to the note that is a minor
          7th above the fundamental, come down to the note that is a perfect 5th above the
          fundamental, and then come down to the note that is a major 3rd above the fundamental.
          Start on one of the white notes and track along as you speak the solfege syllables in
          rhythm; move to using the black notes as fundamentals when you feel confident to do so.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-4: Developing Fluency with the Major 6th</p>
        <P>
          By learning to spell dominant ninth chords above each note, you have gained familiarity
          with four of the five possible harmonic di-chords above any given note. The final
          harmonic, or &ldquo;false harmonic,&rdquo; di-chord with which you must become familiar
          is the [9]&mdash;a major 6th above the fundamental.
        </P>
        <P>
          Practice spelling major 6ths above each note with a similar procedure to the chord
          spelling exercises above. Start with white keys (Doh, la, doh. Re, si, re. Mi, doha, mi,
          etc.) and then build in the black keys, practicing spelling with both sharp and flat note names.
        </P>
      </div>

      <H3>Exercises: Getting to Grips with Harmonicity</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-5: Drawing the Complete Di-Chord Pictograph</p>
        <P>
          In the space provided, draw the complete Di-Chord Pictograph with all 11 di-chords and
          with all three sound factors illustrated: interference pulsation, as indicated by the
          outline, fundamental/octave factor, as indicated by the direction of shadow, and
          harmonicity, as indicated by color.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-6: Comparing Harmonic to Non-Harmonic</p>
        <P>
          Throughout this exercise, you will be listening to and comparing harmonic di-chords to
          non-harmonic di-chords. In a harmonic di-chord, the upper note will sound like it in some
          way matches the lower note, like a green ornament on a green Christmas tree, but in a
          non-harmonic di-chord, the upper note stands out, like a red ornament in a green Christmas tree.
        </P>
        <P>
          Start by comparing di-chords [3] and [4]. Keep the same bass note. For example, you might
          compare a [3] composed of doh and mib with the [4] composed of doh and mi (natural). Take
          your time and listen for the harmonicity factor. Compare many different pairs of di-chords
          and listen to di-chords throughout the entire range of the piano. Perhaps you might
          compare a single pair of di-chords over many different octaves.
        </P>
        <P>
          Compare the harmonicity factor for the following pairs and place a check mark after you
          have completed each pair:
        </P>
        <ul className="list-disc pl-6 mt-2 text-slate-300 text-sm space-y-1">
          <li>[3]/[4]</li>
          <li>[5]/[7]</li>
          <li>[11]/[10]</li>
          <li>[1]/[2]</li>
          <li>[6]/[9]</li>
          <li>[3]/[6]</li>
          <li>[6]/[7]</li>
          <li>[5]/[6]/[7]</li>
        </ul>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 13-7: Harmonicity Quiz</p>
        <P>1. Circle the harmonic di-chords:</P>
        <p className="font-mono text-slate-300 text-sm mb-3">[1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]  [10]  [11]</p>
        <P>2. What is unique about the harmonicity factor of di-chord [6]?</P>
        <P>3. What is unique about the harmonicity factor of di-chord [9]?</P>
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

      {/* ── CHAPTER 14: Properties of Di-Chords: Interference Pulsation ── */}
      <H2 id="ch14">Chapter Fourteen: Properties of Di-Chords: Interference Pulsation</H2>

      <H3>Interference Pulsation</H3>
      <P>Di-chords are either dissonant, modal, or perfect.</P>
      <P>
        Dissonant di-chords beat at 8 cycles per second, modal di-chords at 4 cycles per second,
        and perfect di-chords at 2.
      </P>

      <H3>Fundamental/Octave Factor</H3>
      <P>The upper note of any di-chord either refers up or refers down.</P>
      <P>
        Does the upper note sound like it is referring down to the bottom note or up to the first
        octave manifestation of the fundamental? Remember, di-chord [6] splits the octave directly
        down the middle and refers up and down by equal amounts.
      </P>

      <H3>Harmonicity</H3>
      <P>Di-chords are either harmonic or non-harmonic.</P>
      <P>
        The top note of a harmonic di-chord falls within the first nine partials of the overtone
        series of the bottom note. Visually, this would be like a green ornament on a green
        Christmas tree.
      </P>
      <P>
        In non-harmonic di-chords, the top note does not fall within the overtone series of the
        bottom note, producing a type of contrast or &ldquo;dissonance.&rdquo; Like a red ornament
        on a green Christmas tree, the upper note of a non-harmonic di-chord stands out more than
        it blends in.
      </P>

      <H3>The Combined Effect of the Three Sound Factors</H3>
      <P>
        Notice that no two di-chords have the same combination of all three factors. This is why
        you need an awareness of all three factors to pinpoint which of the 11 di-chords you are
        hearing. The Di-Chord Pictograph provides a useful visual representation of the 11
        di-chords and the three sound factors.
      </P>
      <P>
        The Di-Chord Pictograph also acts as a metaphor for the linear and non-linear aspects of
        di-chord perception. You can observe linear aspects, such as the palindromic progression
        of interference pulsation:
      </P>
      <p className="text-center font-mono text-slate-600 my-3 text-sm">
        jagged &ndash; rounded &ndash; square &ndash; rounded &ndash; jagged
      </p>
      <P>
        Likewise, the shadows that represent the fundamental/octave factor appear on the left side
        in numbers 1&ndash;6, and on the right side for numbers 6&ndash;11. All linearity ceases
        when you observe the shades of color that illustrate harmonicity because the structure of
        the overtone series is not linear, it is logarithmic (non-linear) and is better represented
        as a spiral (one that doubles its distance from the center with every revolution) rather
        than a straight line (Wilson 1965).
      </P>

      <H3>Di-Chord Identification</H3>
      <P>
        While it may seem difficult to identify each of the three sound factors of di-chords in
        real time, it is no more difficult than identifying an animal&rsquo;s species (reptile,
        mammal, bird), its subspecies (turtle/lizard, whale/horse, owl/hummingbird), and then its
        particular genus (snapping turtle/chameleon, Beluga/Appaloosa, barn owl/ruby-throated).
        Actually, because there are only 11 di-chords, it&rsquo;s far easier than this to identify.
      </P>

      <H3>Review Table: Di-Chord Properties</H3>
      <P>
        The following table lists the 11 di-chords with their common interval names and
        categorization by the three sound factors.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Di-Chord Number</th>
              <th className="border border-slate-300 px-3 py-2">Common Interval Name</th>
              <th className="border border-slate-300 px-3 py-2">Interference Pulsation</th>
              <th className="border border-slate-300 px-3 py-2">Harmonicity</th>
              <th className="border border-slate-300 px-3 py-2">Fundamental/Octave</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['[1]', 'minor 2nd', 'dissonant', 'non-harmonic', 'refers down'],
              ['[2]', 'major 2nd', 'dissonant', 'harmonic', 'refers down'],
              ['[3]', 'minor 3rd', 'modal', 'non-harmonic', 'refers down'],
              ['[4]', 'major 3rd', 'modal', 'harmonic', 'refers down'],
              ['[5]', 'perfect 4th', 'perfect', 'non-harmonic', 'refers down'],
              ['[6]', 'augmented 4th / diminished 5th', 'perfect', '—', '—'],
              ['[7]', 'perfect 5th', 'perfect', 'harmonic', 'refers up'],
              ['[8]', 'minor 6th', 'modal', 'non-harmonic', 'refers up'],
              ['[9]', 'major 6th', 'modal', 'harmonic', 'refers up'],
              ['[10]', 'minor 7th', 'dissonant', 'harmonic', 'refers up'],
              ['[11]', 'major 7th', 'dissonant', 'non-harmonic', 'refers up'],
            ].map(([dc, name, puls, harm, fo], i) => (
              <tr key={dc} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-1.5 font-mono font-bold">{dc}</td>
                <td className="border border-slate-300 px-3 py-1.5">{name}</td>
                <td className="border border-slate-300 px-3 py-1.5">{puls}</td>
                <td className="border border-slate-300 px-3 py-1.5">{harm}</td>
                <td className="border border-slate-300 px-3 py-1.5">{fo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Exercises: Di-Chord Sound Factors</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 14-1</p>
        <P>
          Without referring to the table on the previous page, complete this table from memory.
        </P>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Di-Chord Number</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Common Interval Name</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Interference Pulsation</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Harmonicity</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Fundamental/Octave</th>
              </tr>
            </thead>
            <tbody>
              {['[1]','[2]','[3]','[4]','[5]','[6]','[7]','[8]','[9]','[10]','[11]'].map((dc, i) => (
                <tr key={dc} className={i % 2 === 1 ? 'bg-slate-800' : 'bg-slate-850'}>
                  <td className="border border-slate-600 px-3 py-2 font-mono font-bold text-slate-200">{dc}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 14-2</p>
        <P>
          For each di-chord, list its properties. Then, draw its pictograph in the box provided.
          Remember, a number&rsquo;s outline illustrates its interference pulsation, color
          illustrates its harmonicity, and shadow illustrates its fundamental/octave factor.
          Choose three shades of the same color for this exercise: one dark, one medium, and one
          light. Colored pencils will work best. Use your darkest shade for non-harmonic di-chords
          and your lightest shade for harmonic di-chords; the medium shade will be used to draw
          the shadows on the numbers that indicate the fundamental/octave factor.
        </P>
        <div className="mt-3 space-y-3">
          {['[1]','[2]','[3]','[4]','[5]','[6]','[7]','[8]','[9]','[10]','[11]'].map((dc) => (
            <div key={dc} className="border border-slate-700 rounded p-3 bg-slate-800">
              <p className="font-mono font-bold text-slate-200 mb-1">Di-Chord {dc}:</p>
              <p className="text-slate-400 text-sm">Interference Pulsation: ___________</p>
              <p className="text-slate-400 text-sm">Harmonicity: ___________</p>
              <p className="text-slate-400 text-sm">Fundamental/Octave: ___________</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CH.15 ── */}
      <H2 id="ch15">Chapter Fifteen: Di-Chords in Melodic Contexts</H2>

      <H3>Perception of Di-Chords in Melodic Contexts</H3>
      <P>
        In chapters 10&ndash;14 we covered the three sound factors of di-chords that are played synchronously&mdash;both
        pitches sounding at the same time. However, the three sound factors that affect the synchronous or vertical
        sounding of di-chords also have correlated effects on the non-synchronous or horizontal sounding of di-chords.
      </P>
      <P>
        It is essential that all musicians, including those who play &ldquo;harmony&rdquo; instruments, like piano or guitar,
        understand the melodic characteristics of di-chords. Instruments that are commonly understood to be
        &ldquo;harmony&rdquo; instruments are really playing multiple horizontal lines at once; to play those instruments with
        meaning and expression, it is vital to understand the melodic characteristics of each di-chord in every
        horizontal line.
      </P>

      <H3>Interference Pulsation in Melodic Contexts: Gut, Heart, and Head</H3>

      <H3>Dissonant Di-Chords: The Gut</H3>
      <P>The perceptions elicited from dissonant melodic di-chords are that of:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>gut-centered physicality,</li>
        <li>transition,</li>
        <li>movement between fixed points, and</li>
        <li>connecting words or phrases in speech, like &ldquo;such as,&rdquo; &ldquo;the beautiful&hellip;&rdquo; &ldquo;and then, the fast flowing&hellip;&rdquo; or &ldquo;what if&hellip;?&rdquo;</li>
      </ul>

      <H3>Modal Di-Chords: The Heart</H3>
      <P>The perceptions elicited from modal melodic di-chords are that of:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>heart-centered emotions,</li>
        <li>feelings,</li>
        <li>fluidity,</li>
        <li>grace and ease of movement, and</li>
        <li>words such as &ldquo;love,&rdquo; &ldquo;tenderness,&rdquo; &ldquo;yearning,&rdquo; &ldquo;affection,&rdquo; and &ldquo;grief.&rdquo;</li>
      </ul>

      <H3>Perfect Di-Chords: The Head</H3>
      <P>The perceptions elicited from perfect melodic di-chords are that of:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>head-centered intellect,</li>
        <li>thoughts,</li>
        <li>concepts,</li>
        <li>structures,</li>
        <li>principles, and</li>
        <li>words such as &ldquo;honor,&rdquo; &ldquo;logic,&rdquo; &ldquo;integrity,&rdquo; &ldquo;conceit,&rdquo; and &ldquo;calculating.&rdquo;</li>
      </ul>

      <H3>Fundamental/Octave Factor in Melodic Contexts</H3>
      <P>The effect of fundamental/octave factor in melodic contexts is the same as it is in harmonic contexts:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>For di-chords [1], [2], [3], [4] and [5], the upper note refers down to the lower note.</li>
        <li>For di-chords [7], [8], [9], [10] and [11], the upper note refers up to the nearest octave manifestation of the lower note.</li>
      </ul>

      <H3>Harmonicity in Melodic Contexts: Open, Closed, Strong, and Weak</H3>

      <H3>Ascending Harmonic Di-Chords: Open</H3>
      <P>
        When the two constituent pitches of any of the harmonic di-chords ([2], [4], [7], [9], [10]) are played linearly
        in ascending order, they create a feeling that the upper note is open-ended, eternal, and floating above the lower
        note. The two notes seem to expand apart from one another so that the upper note is seemingly pushed upward into
        space, opposing gravity. The upper note feels natural to sing because it is an overtone of the lower note. In this
        melodic movement, there is a subtle perception of a counter-clockwise gesture that proceeds, if imagined on a clock
        face, from six o&rsquo;clock, through three, and up to twelve o&rsquo;clock. In score analysis, an upward pointing arrow is
        used to indicate any ascending harmonic horizontal di-chord as &ldquo;open.&rdquo;
      </P>

      <H3>Ascending Non-Harmonic Di-Chords: Closed</H3>
      <P>
        When the two constituent pitches of any of the non-harmonic di-chords ([1], [3], [5], [8], [11]) are played
        linearly in ascending order, the upper note is stronger than the lower note, and therefore seems to be pulled
        downward; not in the case of [11], whose tendency is to strongly go to the octave of the lower note. The two
        notes seem to contract, causing the sensation that the upper note &ldquo;caps off,&rdquo; ends, or closes a thought or
        gesture. It is difficult to sing the upper note correctly because it is not an overtone of the lower note; hence,
        there is a preference towards singing the nearest ascending harmonic di-chord. The upper note also tends to be
        difficult to tune because it clashes by a semitone with one or more of the overtones of the lower note; it is
        sung best&mdash;not by imagining that the lower note is an overtone of the upper note, rather the other way
        around. In this melodic movement, there is a subtle perception of a clockwise gesture that proceeds, if imagined
        on a clock face, from nine o&rsquo;clock, through twelve, and ending at three o&rsquo;clock. In score analysis, an
        over-arched arrow is used to indicate any ascending non-harmonic horizontal di-chord as &ldquo;closed.&rdquo;
      </P>

      <H3>Descending Harmonic Di-Chords: Strong</H3>
      <P>
        When the two constituent pitches of any of the harmonic di-chords ([2], [4], [7], [9], [10]) are played linearly
        in descending order, the lower pitch is perceived as the fundamental of the two pitches, which creates a sense of
        grounded finality, like the final word of a conclusive statement. Descending harmonic di-chords can initially be
        difficult to sing because we do not hear the lower note as an overtone of the upper note. To sing the lower note
        correctly, it must be intended, or we will sing the nearest pitch class in the nine lowest partials of the upper
        note. In this melodic movement, there is a subtle perception of a counter-clockwise gesture progressing, if
        imagined on a clock face, from twelve o&rsquo;clock, backward through nine to six o&rsquo;clock. To indicate any descending
        harmonic horizontal di-chord, a downward pointing arrow is used.
      </P>

      <H3>Descending Non-Harmonic Di-Chords: Weak</H3>
      <P>
        When the two constituent pitches of any of the non-harmonic di-chords ([1], [3], [5], [8], [11]) are played
        linearly in descending order, they create a paradoxical gesture that can seem to rise, like the final word in a
        question. The lower note is often found among the nine lowest partials of the upper note, making it relatively
        natural and easy to sing. The paradoxical nature of this gesture occurs because the horizontal motion is moving
        downwards while, at the same time, the lower note contracts back up towards the upper note because it is in the
        overtone series of the upper note. In this melodic movement, there is a subtle perception of a clockwise gesture
        on a clock face, progressing from three o&rsquo;clock, through six, and ending at nine o&rsquo;clock. To indicate any
        descending non-harmonic horizontal di-chord, an under-arched arrow is used.
      </P>

      <H3>Ascending or Descending Di-Chord [6]: Neutral</H3>
      <P>
        This is the only di-chord whose harmonicity factor is neutral, neither seeming harmonic nor non-harmonic. In
        horizontal movement, [6] seems neither open, closed, weak, nor strong, but neutral. By comparing a musical line
        consisting of only di-chords [5], [6] and [7], you can easily perceive the acrid, unblissful quality of [6],
        eliciting in our hand a sort of claw-like gesture, versus the contracting or expanding in the hand, respectively,
        with [5] or [7]. Because [6] is devoid of a movement gesture, I suggest simply identifying it by name as [6].
      </P>

      <H3>Exercises: Melodic Gestures of Di-Chords</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-1</p>
        <P>
          <strong>Analyze a Melody, Part I.</strong> Two melodies are shown below. The first has been analyzed using the
          straight over-arching, and under-arching arrow symbols to illustrate the gesture of each melodic di-chord.
          Using the same arrow symbols, analyze the second melody, placing the appropriate arrows under the appropriate
          di-chords.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-2</p>
        <P>
          <strong>Melodic Gestures and Di-Chords, Part I.</strong> Draw lines from column to column to match the gestures
          with the corresponding melodic di-chord.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="px-3 py-2 text-slate-200">Open</td>
                <td className="px-3 py-2 text-slate-200">Ascending Non-Harmonic</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-200">Closed</td>
                <td className="px-3 py-2 text-slate-200">Descending Harmonic</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-200">Weak</td>
                <td className="px-3 py-2 text-slate-200">Descending Non-Harmonic</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-slate-200">Strong</td>
                <td className="px-3 py-2 text-slate-200">Ascending Harmonic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-3</p>
        <P>
          <strong>Melodic Gestures and Di-Chords, Part II.</strong> In the following table, write in the harmonicity of
          each of the 11 di-chords. Then, write in the gesture name and draw the arrow symbol for both the ascending and
          descending manifestations of each di-chord.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-3 py-2 text-left text-slate-300">Di-Chord</th>
                <th className="px-3 py-2 text-left text-slate-300">Harmonic or Non-Harmonic?</th>
                <th className="px-3 py-2 text-left text-slate-300">Ascending Gesture and Symbol</th>
                <th className="px-3 py-2 text-left text-slate-300">Descending Gesture and Symbol</th>
              </tr>
            </thead>
            <tbody>
              {['[1]','[2]','[3]','[4]','[5]','[6]','[7]','[8]','[9]','[10]','[11]'].map((dc, i) => (
                <tr key={dc} className={i % 2 === 0 ? 'bg-slate-800' : ''}>
                  <td className="px-3 py-2 text-slate-200 font-mono">{dc}</td>
                  <td className="px-3 py-2 text-slate-400"></td>
                  <td className="px-3 py-2 text-slate-400"></td>
                  <td className="px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-4</p>
        <P>
          <strong>Classifying Melodic Di-Chords.</strong> For each of the following di-chords, write whether it is open,
          closed, weak, or strong and draw the corresponding arrow type:
        </P>
        <ol className="list-decimal pl-6 mt-2 text-slate-300 text-sm space-y-1">
          <li>ascending [4]</li>
          <li>ascending [9]</li>
          <li>descending [7]</li>
          <li>ascending [1]</li>
          <li>descending [3]</li>
          <li>ascending [2]</li>
          <li>ascending [5]</li>
          <li>descending [10]</li>
          <li>descending [8]</li>
          <li>ascending [7]</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-5</p>
        <P>
          <strong>Tracking Melodic Gestures.</strong> Develop fluency with the four melodic gestures by using The
          Tracking Page (chapter 16, p. 153) to practice naming open, closed, weak, and strong in real time. It is
          essential that you name the gestures steadily, confidently, in an even rhythm, and at a minimum tempo of
          quarter note = 60 bpm. Set manageable goals for yourself&mdash;perhaps aim for a half a line at a time to
          start with. If you are not yet familiar with The Tracking Page or you find this exercise difficult, you might
          return to this exercise after completing chapter 16.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-6</p>
        <P>
          <strong>Compose a Melody, Part I.</strong> Using the blank staff, choose a clef and a key signature, and then
          create a four-bar melody. Compose the melody in 4/4 meter, using only quarter notes and rests. Use only
          diatonic 2nds ([1] or [2]) and diatonic 4th ([1] or [4]). After you have written the melody, draw arrows
          representing the melodic gestures underneath the staff.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-7</p>
        <P>
          <strong>Singing Alternating Intervals.</strong> Starting on doh, sing alternating diatonic intervals. For
          alternating thirds, you will be singing up a 3rd, down a 2nd, up a 3rd, down a 2nd, etc. Remember to
          visualize the keyboard and track with a relaxed index finger as you sing. First, perform the exercise singing
          the secondary di-chord numbers. Then repeat the exercise, this time singing each gesture name. For example,
          singing secondary di-chord numbers from doh would look like this:
        </P>
        <P>
          [0, 4, 1, 4, 2, 4, 1, 3, 2, 3, 1, 2, 1 / 0, 1, 2, 1, 4, 2, 4, 1, 3, 2, 3, 1, 2, 1]
        </P>
        <P>
          Observe that the number you sing on any given note describes the di-chord formed by that note and the
          preceding note.
        </P>
        <P>Then again, starting on the note doh, sing gesture names:</P>
        <P>
          [open strong closed strong open / strong open closed strong open / weak closed weak closed]
        </P>
        <P>
          After performing this exercise starting on the note doh, begin on each of the white notes of the diatonic
          scale, using only the white notes to perform the exercise in each of the seven modes.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-8</p>
        <P>
          <strong>Alternating Thirds.</strong> The following patterns show alternating thirds. To each of the two-bar
          phrases, add a sharp or flat to any one of the notes, then analyze the gestures by drawing the corresponding
          arrows in the spaces below the music. Notice how altering just one pitch has a profound impact on the
          gestures, and therefore the affect of the surrounding music!
        </P>
        <P>[Four two-bar musical examples provided for analysis]</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-9</p>
        <P>
          <strong>Compose a Melody, Part II.</strong> Using only diatonic 2nds and 3rds, compose a four-bar melody that
          follows the gestures given below the staff. Write one quarter note above each gesture.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-10</p>
        <P><strong>Playing Melodic Gestures, Part I.</strong></P>
        <ol className="list-decimal pl-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Choose a di-chord.</li>
          <li>Starting in the low range of your instrument, play an ascending sequence of that type of melodic di-chord.</li>
          <li>Name (either mentally or aloud, depending on your instrument) the gesture on the off-beats (&ldquo;open&rdquo; if the di-chord is harmonic, &ldquo;closed&rdquo; if it is non-harmonic).</li>
          <li>When you reach the high register of your instrument, play a descending sequence of that type of melodic di-chord. As before, name (mentally or aloud) the gesture on the off-beats (&ldquo;strong&rdquo; if the di-chord is harmonic, &ldquo;weak&rdquo; if it is non-harmonic). It is critical that you are visualizing the keyboard and mentally tracking as you perform this exercise.</li>
          <li>Next, improvise using both the ascending and descending melodic manifestations of the chosen di-chord, but continue using only one type of di-chord. This exercise can be used quite effectively as a long-tone warm-up exercise for instruments whose sounds sustain; try holding each note for two or even four beats and choosing a new di-chord each day.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-11</p>
        <P><strong>Playing Melodic Gestures, Part II.</strong></P>
        <ol className="list-decimal pl-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Expand on the Exercise 15-10 by choosing a pair of di-chords with which to improvise and name gestures. Choose one of the following pairs: [1]/[2], [3]/[4], [5]/[7], [8]/[9], or [10]/[11].</li>
          <li>On the piano or another instrument, improvise in a steady tempo and even rhythm. Use only the two di-chords in your chosen pair, but use them both ascending and descending.</li>
          <li>Continue visualizing the keyboard and track as you play, and name (either mentally or aloud, depending on your instrument) the type of gesture on each off-beat.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 15-12</p>
        <P>
          <strong>Analyze a Melody, Part II.</strong> Developing fluency with the melodic gestures and an awareness of
          them during performance is highly beneficial for achieving both a greater and more reliable level of
          musicality. Choose a melody from a piece you have been practicing and study the melodic gestures. Speak and
          sing the gestures out loud in the tempo and rhythm of the piece. When you go back to playing the melody on
          your instrument, mentally name the gestures as you play them, considering how they relate to the affect of
          the music.
        </P>
      </div>

      {/* ── CH.16 ── */}
      <H2 id="ch16">Ch.16 — The Tracking Page</H2>

      <H3>Introduction</H3>
      <P>
        Next to visualizing the keyboard, The Tracking Page (p. 153) is the most important means of
        developing fluency and accuracy in connecting your mind with your ear and your eye. It is
        helpful to remember that the ear needs no training. It is the mind that requires training to
        become aware of what the ear is hearing at the speed that the ear is hearing it, but the best
        guidance is wasted without faithfully applying what is needed to become skillful—the backing of
        a rigorous attitude. Take J.S. Bach as your example, who, when asked about his prodigious
        talent, was quoted as saying, &ldquo;I was obliged to be industrious. Whoever is equally
        industrious will succeed equally well.&rdquo; (1998)
      </P>

      <H3>Using the Tracking Page</H3>
      <P>
        There are six protocols to be performed for each line of The Tracking Page. These protocols are
        designed to help you master each of the several aspects involved with musical reading and
        comprehension. Generally, you may find that you are weak on one or more of the protocol steps,
        so those steps will need to be strengthened. By performing each step in sequence, you can
        discover points of weakness to strengthen. Master each step before continuing to the next.
        Initially, each protocol may require several minutes, perhaps even half an hour. At this rate,
        the six steps would require about three hours to master. However, this level of weakness in
        skill is extremely rare. Even so, in such a case, the time would be well spent, and fluency
        would be the end result, with the entire sequence requiring little more than six minutes—one
        line per minute.
      </P>
      <P>
        Start by using only the diatonic white-notes. Perform one or more lines per week doing each of
        the six protocols every day, starting on a different note each day. If, for instance, you
        choose line 3 for the week, select a different note for each of the seven days of the week.
        Each day, perform the six protocols in order.
      </P>
      <P>
        By the end of the week, you will have started and ended on each of the seven diatonic notes and
        will have sung each of the seven modes by name by syllable name, primary di-chord number, and
        secondary di-chord number. Remember to incorporate each step into every subsequent step. In the
        final, sixth step of the protocol, all previous steps are incorporated into the performance.
      </P>
      <P>
        <em>Note: This chapter assumes some knowledge of the seven diatonic modes—Ionian, Dorian,
        Phrygian, Lydian, Mixolydian, Aeolian, and Locrian. If you don&apos;t know what the modes are,
        or you find the parts of The Tracking Page that mention modes confusing, then review the later
        chapters on Tetrachords (p. 187) and the Diatonic Modes (p. 198).</em>
      </P>

      <H3>The Tracking Page — Lines</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Line</th>
              <th className="border border-slate-300 px-3 py-2">Interval Content</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Seconds'],
              ['2', 'Thirds'],
              ['3', 'Fourths'],
              ['4', 'Fifths'],
              ['5', 'Fourths'],
              ['6', 'Fifths'],
              ['7', 'Sixths'],
              ['8', 'Sixths'],
              ['9', 'Sevenths'],
              ['10', 'Sevenths'],
            ].map(([line, content], i) => (
              <tr key={line} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">{line}</td>
                <td className="border border-slate-300 px-3 py-2">{content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>The Six Tracking Protocols</H3>
      <P>
        Pick a single line from The Tracking Page and, while tracking on a visualized keyboard,
        perform the six steps, aiming to achieve a tempo of not less than 144 bpm. You will also need
        to pick a starting pitch for the first note, which can be any of the seven diatonic
        pitches—doh, re, mi, fa, sol, la, or si. The note you choose to start on will determine the
        line&apos;s mode and clef.
      </P>

      <div className="space-y-4 mb-8">
        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 1 — Speak Solfège Syllables (with Fill-In Notes)</p>
          <P>
            Name each note in order by its solfège syllable, filling in the notes between adjacent
            notes when the interval is larger than a 2nd. If you are less than fluent at this step,
            improvise an exercise similar to the one written if the exercise contains 2nds, 3rds and
            4ths, improvise using these same intervals, making sure to fill in the notes for intervals
            over a 2nd. <em>Note: Some students will be tempted to skip filling in adjacent note names
            for intervals larger than a 2nd, however, if you are to learn to track di-chords through
            pitch space (rather than name notes by rote), it is essential that you commit to this part
            of the protocol.</em>
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 2 — Speak Secondary Di-Chord Numbers (then Gesture Names)</p>
          <P>
            For each note in order, say the name, at a regular pulse, of the secondary di-chord number
            (the number of semitones between each pair of notes). Start with the number &ldquo;0.&rdquo; Then
            repeat the line but speaking the secondary di-chord gesture (open, closed, weak, strong)
            for each consecutive note. Notice any di-chords that prove problematic for you. Review the
            exact location of these secondary di-chords within the context of the diatonic scale.
            Improvise using the secondary di-chords included in the line. Note that the numbers 7, 11
            and 0 are the only numbers used in the protocols that have two syllables, making them more
            challenging to employ at fast speeds. To facilitate speaking and singing, the numbers 7 and
            11 may be abbreviated to the single syllables &ldquo;sev&rdquo; and &ldquo;lev.&rdquo; Students have preferred
            keeping both syllables in the word &ldquo;ze-ro,&rdquo; perhaps because the combination of these two
            syllables, the first incisive and the other sonorous, emphasizes the definitive, solid
            perception of the tonic.
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 3 — Speak Primary Di-Chord Numbers</p>
          <P>
            For each note in order, name, at a regular pulse, the primary di-chord number (the number
            of semitones between each note and the tonic, which is the first note of the line). The
            first note and the tonic are designated as &ldquo;0.&rdquo; Remember to keep tracking on a visualized
            keyboard!
          </P>
          <P>
            Observe when you cannot easily name a note&apos;s primary di-chord number. Thoroughly review the
            troublesome primary di-chord in the mode corresponding to the one having as its tonic the
            first note in the line chosen for the day. Improvise naming the primary di-chord in the
            mode chosen, preferably using as well the secondary di-chords included in the line chosen.
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 4 — Sing Primary Di-Chord Numbers</p>
          <P>
            Sing the primary di-chord number for each note in order, while playing the tonic pitch (the
            first note of the line) as a drone. The tonic (first and last note) is sung as &ldquo;0.&rdquo;
            Observe whenever you cannot easily sing the correct primary di-chord and practice those
            sections by filling in adjacent pitches for intervals larger than a 2nd. Attend to the
            intonation of each note and sing as though you really mean it—with gusto and
            forthrightness, not in a weak or tentative manner.
          </P>
          <P>
            Remember to visualize the Di-Chord Pictograph (p. 110) before you sing a pitch to ensure
            that you have a clear idea of the sound properties of the di-chords. Improvise by singing
            in the mode you are working in, singing each pitch according to its primary di-chord name
            until you feel fluent and can achieve a tempo of not less than 144 bpm for each pitch in
            the row.
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 5A — Sing Secondary Di-Chord Numbers</p>
          <P>
            For each note in order, while playing the tonic (the first note) on the piano as a drone,
            sing the secondary di-chord number at a regular pulse. The first note is named &ldquo;0&rdquo; when
            sung. Remember to visualize the Di-Chord Pictograph and musical keyboard at all times.
            Improvise by singing each pitch according to its secondary di-chord name in the selected
            mode while playing the tonic drone.
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4">
          <p className="font-semibold text-slate-800 text-sm mb-2">Step 5B — Sing Secondary Di-Chord Gestures</p>
          <P>
            Starting with the number &ldquo;0&rdquo; on the first note of the line, sing the gesture that
            accompanies each secondary di-chord number. Incorporate the character of the gesture into
            your singing.
          </P>
        </div>

        <div className="border border-slate-200 rounded p-4 bg-indigo-50 border-indigo-200">
          <p className="font-semibold text-indigo-900 text-sm mb-2">Step 6 — Sing Solfège Syllables (Full Integration)</p>
          <P>
            For each note in order, play the tonic drone while singing its solfège syllable at a
            regular pulse. Like in step 1, for intervals larger than a 2nd, sing the notes &ldquo;in
            between&rdquo; adjacent notes. By now, this step is probably quite easy; if it is not, you may
            need to review some or all of the preceding steps. Improvise by singing the syllables of
            the mode with the tonic drone. Remember to maintain your awareness of the primary and
            secondary di-chord properties for each subsequent note.
          </P>
          <P>
            The last step, singing solfège, brings us full circle from our first step, speaking
            solfège. With the knowledge gained by examining and performing the line in the different
            steps of the protocol, we now have access to a greater depth and complexity of musical
            meaning than we did at the beginning of the process.
          </P>
        </div>
      </div>

      <H3>The Six Tracking Protocols: Summary</H3>
      <P>
        Pick a single line from The Tracking Page and, while tracking on a visualized keyboard,
        perform the six steps, aiming to achieve a tempo of not less than 144 bpm.
      </P>
      <ol className="list-decimal pl-6 mb-6 text-slate-700 space-y-1">
        <li>Speak the solfège name of each note, filling in adjacent notes for intervals larger than a 2nd.</li>
        <li>Speak a) the secondary di-chord name and b) the secondary di-chord gesture for each consecutive note.</li>
        <li>Speak the primary di-chord name for each consecutive note.</li>
        <li>Sing the primary di-chord name for each consecutive note, while playing a tonic drone at the keyboard.</li>
        <li>Sing the secondary di-chord name for each consecutive note, while playing a tonic drone at the keyboard.</li>
        <li>Sing the solfège name of each note, while playing a tonic drone at the keyboard.</li>
      </ol>

      <H3>Modes and Clefs on the Tracking Page</H3>
      <P>
        The Tracking Page does not include clefs. This means that there is nothing to indicate what
        names you should call any of the notes on the page! Depending on the clef you choose for a
        line, the line can start on any one of the seven diatonic pitches—doh, re, mi, fa, sol, la,
        or si.
      </P>
      <P>
        When you hear and sing the line, you will perceive the first note as the tonic pitch.
        Therefore, the first note of each line determines the diatonic mode of the line. If the first
        note of the line is doh, the line is in the Ionian mode; if the first note is re, the line is
        in the Dorian mode; if the first note is mi, the line is in the Phrygian mode, etc. For more
        information on the diatonic modes, see chapter 19, &ldquo;The Diatonic Modes.&rdquo;
      </P>
      <P>
        These two variables—the clef and the mode—are dependent on each other. When starting a line,
        you or your teacher will choose either a clef or a mode for the line that day. Choosing a clef
        will determine the mode, while choosing a mode will determine the clef.
      </P>

      <H3>Reading by Di-Chord Versus Reading by Rote</H3>
      <P>
        For each of the steps of the protocol, always be clearly visualizing the keyboard and tracking
        on an imagined keyboard with your relaxed right index finger. Although this may be challenging
        at first, it is an essential step in making the transition from reading music by rote to
        reading music by di-chord.
      </P>
      <P>
        When reading music by rote, we read individual pitches. This gives us only the information
        necessary to correctly &ldquo;push the right buttons&rdquo; on our instruments. This is like being able to
        read and pronounce words of a foreign language while not understanding them. A speaker might
        pronounce every word on the page with complete accuracy, but, if the speaker does not
        understand the meaning of the words, his speech will sound strange to the native speaker,
        perhaps sounding flat or conveying an affect mismatched from the expressive content of the
        text.
      </P>
      <P>
        When reading music by di-chord, we get information about which pitches to play, but more
        importantly, we are directly accessing &ldquo;what happens between the notes,&rdquo; where expression,
        affect, and meaning are found. With the knowledge and understanding of the properties of each
        of the 11 di-chords, reading music by di-chord gives an immediate understanding of the range
        of expression suggested by the notes written on the page. As when we read a language in which
        we are fluent, we have immediate access to the meaning of what we are reading. We also have
        the capability to manipulate the sounds we are producing in appropriate ways—that is, in ways
        that are congruent with the meaning that the notes on the page express—even if we are reading
        something for the first time.
      </P>

      <H3>Protocol Example: Line 1, Starting on FA</H3>
      <P>
        In this walk-through example, we will be analyzing and singing Line 1 of The Tracking Page
        starting on fa.
      </P>
      <P>
        <strong>Mode and Clef:</strong> We are starting on the note fa, and the first note of the line
        is located in the bottom space of the staff, which is fa only in the treble clef; therefore,
        we know that we must be reading in the treble clef. As you perform each step of the protocol,
        imagine seeing the appropriate clef at the beginning of the line at all times.
      </P>
      <P>
        <strong>Step 1 — Speaking Solfège Syllables:</strong> Speak the name of the solfège syllables
        of the notes in a brisk, even pace, at a minimum tempo of 60 bpm but aiming to achieve 144
        bpm. Fill in the solfège syllables between the written notes; the written notes in the line
        should be spoken one per beat, regardless of the size of the di-chord. For Line 1 in the
        Lydian mode, we have no need to &ldquo;fill in&rdquo; any solfège syllables because all of the intervals
        in Line 1 are 2nds. Therefore, speak the solfège syllable of each note, one per beat.
      </P>
      <P>
        For intervals greater than a 2nd, we will always fill in the diatonic notes between the two
        pitches with solfège syllables. To do this, you must still name each of the notes on the page
        at the rate of one per beat, meaning that when the interval between notes is larger than a
        2nd, you must speak the solfège syllables that fall between the two notes in a faster rhythm.
      </P>

      <H3>Interval Rhythm Table</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Interval Type</th>
              <th className="border border-slate-300 px-3 py-2">Rhythm</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['2nd', 'quarter notes'],
              ['3rd', '8th notes'],
              ['4th', '8th note triplets'],
              ['5th', '16th notes'],
              ['6th', '16th note quintuplets'],
              ['7th', '16th note sextuples'],
            ].map(([interval, rhythm], i) => (
              <tr key={interval} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">{interval}</td>
                <td className="border border-slate-300 px-3 py-2">{rhythm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Step 2A: Speaking Secondary Di-Chord Numbers</H3>
      <P>
        Starting with the number &ldquo;0&rdquo; on the first note of the line, name each of the secondary
        di-chord numbers in a brisk, even tempo.
      </P>
      <P>
        Secondary di-chord numbers describe the number of semitones between each pair of adjacent
        notes; the number you speak on any given note describes the number of semitones between that
        note and the note that preceded it.
      </P>
      <P>
        It is crucial at this point that you are absolutely clear in your keyboard visualization and
        are tracking with your index finger. Especially in the earlier lines in more familiar clefs,
        you will be tempted to take shortcuts, bypassing the critical step of visualizing and relying
        on earlier rote training to perform certain of the steps on The Tracking Page. However, with
        focused intent and patience, this brain circuitry will be re-wired. As the intervals get
        larger further down in The Tracking Page, and you practice with unfamiliar modes and clefs, it
        will become harder and then impossible to use prior rote learning to perform the lines.
        Therefore, it is suggested that you prioritize keyboard visualization and tracking at each and
        every stage of The Tracking Page Protocol.
      </P>

      <H3>Step 2B: Speaking Secondary Di-Chord Gestures</H3>
      <P>
        Starting with the number &ldquo;0&rdquo; on the first note of the line, name the gesture (open, closed,
        weak, or strong) that accompanies each consecutive secondary di-chord number. For more
        information on the melodic gestures, review chapter 15.
      </P>
      <P>
        Remember to visualize the clef you are using! The gesture name that you speak on any given
        note describes the gesture accompanying the di-chord formed by that note and the note that
        came immediately before.
      </P>

      <H3>Step 3: Speaking Primary Di-Chord Numbers</H3>
      <P>
        Starting with the number &ldquo;0&rdquo; on the first note of the line, name each of the primary
        di-chord numbers at a brisk, even tempo.
      </P>
      <P>
        Primary di-chord numbers describe the number of semitones between each pitch and the perceived
        tonic, which, in this case, is always the first note of the line. The naming of primary
        di-chord numbers is similar to the naming of scale degrees in that the number remains
        consistent in any octave. When a note is lower than the first note of the line, the primary
        di-chord number will be the same as when it is above the first note. In other words, if the
        starting note is fa, every sol will be named as a [2], whether it is a 2nd above the starting
        pitch or a 7th below it; the sol will always be the second degree of the scale and thus,
        primary di-chord [2].
      </P>
      <P>
        Familiarity with the mode in which you are performing is advantageous because the only numbers
        you will be speaking will be the numbers that fit the profile of that mode. When you first
        start working with The Tracking Page, it can be helpful to review the profile of primary
        di-chord numbers in each selected mode so that you can clearly visualize all seven options in
        a given mode (see chapter 19, &ldquo;The Diatonic Modes&rdquo;).
      </P>
      <P>
        Each step in the protocol should integrate with your observations from previous steps and
        augment your awareness of the musical relationships in the line. When speaking primary
        di-chords, for example, maintain an awareness of the solfège syllables and the secondary
        di-chords from the previous step. As you speak primary di-chord number, notice the
        relationships between secondary and primary di-chord numbers.
      </P>
      <P>
        Notice that addition applies when the pitches are going up, and subtraction applies when they
        are going down. When the pitches cross the tonic, this is still true; however, because there
        are 12 pitches in the octave, the addition and subtraction must be done in a base-12
        mathematical system.
      </P>
      <P>
        Thus far, you have spoken the solfège syllables, the secondary di-chords, and the primary
        di-chords of the line. The next three steps cover the same information but are sung rather
        than spoken.
      </P>
      <P>
        To sing through the next three steps, you will need a tonic drone. You can use an electronic
        tuner to provide a constant pitch, or you can play a drone on a piano. If you are using a
        piano, you may want to play the tonic in multiple octaves. You can choose to play the tonic on
        each beat or just a few times per line. Use the piano&apos;s sustain pedal to sustain the sound
        throughout the line. The tonic drone will provide a reference for your intonation as well as
        allowing you to hear the interference pulsation, fundamental/octave factor, and harmonicity of
        the primary di-chords as you sing them.
      </P>

      <H3>Step 4: Singing Primary Di-Chord Numbers</H3>
      <P>
        Sing each note while naming the primary di-chords. Maintain an awareness of the properties of
        the di-chords you are singing by visualizing the pictographs of the primary di-chords.
      </P>

      <H3>Step 5A: Singing Secondary Di-Chord Numbers</H3>
      <P>
        Sing each note while naming the secondary di-chord. Maintain an awareness of the properties
        of the di-chords you are singing by visualizing the di-chord pictographs of the secondary
        di-chords you are naming as you sing.
      </P>

      <H3>Step 5B: Singing Secondary Di-Chord Gestures</H3>
      <P>
        Starting with the number &ldquo;0&rdquo; on the first note of the line, sing the gesture that
        accompanies each secondary di-chord number. Incorporate the character of the gesture into your
        singing.
      </P>

      <H3>Step 6: Singing Solfège Syllables</H3>
      <P>
        Sing each note while naming the solfège syllable.
      </P>
      <P>
        The last step, singing solfège, brings us full circle from our first step, speaking solfège.
        With the knowledge gained by examining and performing the line in the different steps of the
        protocol, we now have access to a greater depth and complexity of musical meaning than we did
        at the beginning of the process. All of this information—the pitches, the relationships
        between consecutive pitches, and the relationships between the pitches and the perceived
        tonic—is present and accessible in any melodic context; therefore, you can approach any
        melodic line with the steps outlined in this chapter.
      </P>

      <H3>Exercises: Understanding and Using The Tracking Page</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 16-1: Tracking Page Analysis</p>
        <P>In the following excerpts of lines from The Tracking Page:</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mb-3">
          <li>answer the questions about the clef, mode, and/or starting pitch of the line;</li>
          <li>draw in the clef of the excerpt;</li>
          <li>write in the secondary di-chord numbers in the spaces directly below the staff;</li>
          <li>draw in the melodic gestures using the four types of arrows; and,</li>
          <li>write in the primary di-chord numbers in the spaces provided underneath the secondary di-chord numbers.</li>
        </ol>
        <P>
          <strong>Example:</strong> This excerpt starts on the note mi. What clef is it in? treble.
          What mode is it in? Phrygian. SDN: 1 4 2 2 4 1 2 1 2 2 1 3 4 1. PDN: 1 7 5 1 7 10 8 7 5 7 8 5 1 9.
        </P>
        <P>
          1. The following excerpt, from line 2, is in the bass clef. What note does it start on?
          What mode is it in?
        </P>
        <P>
          2. The following excerpt, from line 2, starts on the note fa. Notice that the melodic line
          goes below the tonic.
        </P>
        <P>
          3. The following excerpt, from line 3, is in the soprano clef. What note does it start on?
          What mode is it in?
        </P>
        <P>
          4. The following excerpt, identical to the previous, starts on the note re. What clef is it
          in? What mode is it in?
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 16-2: Performing Analyzed Excerpts</p>
        <P>
          Referring back to The Tracking Page, find the corresponding portion of the line from each of
          the four excerpts that you analyzed in Exercise 16-1 and perform the six-step protocol for
          each excerpt. For the purposes of this exercise, practice only the excerpts you have
          analyzed, not the entire lines.
        </P>
        <P>
          After becoming familiar with the protocol in this way, it will be natural to move on to the
          next step of performing the full lines without stopping. This will help you become fluent at
          tracking and naming in real time.
        </P>
        <P>
          At first, performing all of the steps in one session can be challenging. However, as you
          become familiar with the protocol and increasingly fluent in tracking, performing a full line
          of The Tracking Page with all the steps of the protocol will take only 5-7 minutes.
        </P>
        <P>
          Be patient, but also challenge yourself to keep a steady pace and to perform without
          hesitation or error. Remember to avoid the trap of going slower in hopes of success—this
          only encourages more errors. Taking more time between notes creates a vacuum, allowing room
          for error (see chapter 2, &ldquo;The Three Causes of Error&rdquo;). The key to success with The
          Tracking Page is a vivid imagination of the keyboard with the names of the notes written on
          the keys.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 16-3: Compose a Tracking Line</p>
        <P>
          Using only 2nds and 3rds, compose a tracking line similar to the lines on The Tracking Page.
          Remember, do not add a clef, key signature, or time signature, and stay within the range of
          the staff—do not write notes that require ledger lines. Your line should be 28–32 notes
          long. Practice all six steps of the tracking protocol in each of the clefs with your new
          line.
        </P>
      </div>

      <H3>Recording Your Progress</H3>
      <P>
        Regular practice with The Tracking Page will cultivate and improve musical aptitude across the
        board, particularly fluency in reading, transposing, and comprehending music in real time.
        With regular practice, you will only need to spend a few minutes each session focusing on
        tracking.
      </P>
      <P>
        The following table will allow you to record your progress. Check the boxes when you complete
        a step in the protocol for a particular line in a particular mode. After having completed the
        table, you will have sung through all six steps of the protocol for each of the lines on The
        Tracking Page in each of the modes! Ideally, one practice session would include all six steps
        of the protocol for one line in one mode.
      </P>
      <P>
        An excellent way of keeping consistency with this practice is to assign a mode to a day of the
        week:
      </P>
      <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-1">
        <li>Monday — Aeolian</li>
        <li>Tuesday — Phrygian</li>
        <li>Wednesday — Locrian</li>
        <li>Thursday — Lydian</li>
        <li>Friday — Ionian</li>
        <li>Saturday — Mixolydian</li>
        <li>Sunday — Dorian</li>
      </ul>

      <H3>Progress Tracking Table</H3>
      <P>
        A table for recording progress through all six protocol steps for each of The Tracking Page
        lines (1–10) across all seven modes.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2">Mode</th>
              <th className="border border-slate-300 px-3 py-2">Protocol</th>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <th key={n} className="border border-slate-300 px-2 py-2">Line {n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              'Lydian','Ionian','Mixolydian','Dorian','Aeolian','Phrygian','Locrian'
            ].flatMap(mode =>
              [1,2,3,4,5,6].map(proto => ({ mode, proto }))
            ).map(({ mode, proto }, i) => (
              <tr key={`${mode}-${proto}`} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="border border-slate-300 px-3 py-2">{proto === 1 ? mode : ''}</td>
                <td className="border border-slate-300 px-3 py-2">{proto}</td>
                {[1,2,3,4,5,6,7,8,9,10].map(line => (
                  <td key={line} className="border border-slate-300 px-2 py-2 text-center text-slate-400">☐</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CH.17 ── */}
      <H2 id="ch17">Ch.17 — Tri-Chords</H2>

      <H3>Introduction</H3>
      <P>
        In this chapter, you will combine tracking and your knowledge of di-chords to understand
        tri-chord patterns—groups of three notes—and to fluently use these patterns like stencils
        to quickly form tri-chords over any note. This will lead to developing the ability to form
        tetrachords, or four-note groups, over any note, a skill that is essential to mastering not
        only the more familiar major and minor scales but all of the modes. Being able to visualize
        and calculate scale patterns is yet another essential tool for keeping ourselves musically
        oriented, not only within the dimension of pitch space but also within any given tonality.
      </P>

      <H3>Primary Di-Chord Numbers</H3>
      <P>
        In using numbers to refer to di-chords, a single number describes the number of semitones
        comprising a musical interval. However, now we need a way to use numbers to describe groups
        of three notes—tri-chords. When we hear tri-chords, or chords with any number of notes, our
        brains relate each of the upper notes in the chord to the lowest sounding note, called the
        fundamental. The relationship of each upper note to the fundamental seems to be more important
        to our perceptions than the relationship between the upper notes themselves. In essence, the
        brain notices the relationship between the highest and the lowest and between the middle and
        the lowest more vividly than it notices the relationship between the highest and the middle
        notes.
      </P>
      <P>
        Therefore, when we name tri-chords using the number system, the numbers will refer to the
        primary di-chords formed by the fundamental note and each of the upper notes. Let&apos;s look
        at the chord doh-mi-sol:
      </P>
      <P>
        Doh (the fundamental) and sol form a [7]; doh and mi form a [4]. Thus, we call this
        tri-chord a [4/7]. Notice that within this group of three notes there is also a [3] produced
        by the mi and sol; however, this relationship is a secondary di-chord and does not play the
        same kind of role in our perception of the chord as the other two relationships, and so is
        not used in the naming of this tri-chord.
      </P>

      <H3>Forming Tri-Chords with 2nds</H3>
      <P>
        Using only 2nds, or semitones and whole tones, we can form four different types of tri-chord.
        Our starting note will always count as one of the three notes. We can represent the starting
        note with a &ldquo;0,&rdquo; since we have not traversed any distance yet. Then, we might go
        up a [2], a whole tone, landing on the second note of the tri-chord, and then up another [2]
        to land on the third note. We might call this pattern &ldquo;0, [2], [2].&rdquo; Note that
        this is an abstract pattern—we could apply it to any starting note. One tri-chord formed by
        this pattern would be &ldquo;fa, sol, la.&rdquo; Another example would be &ldquo;sib, doh,
        re.&rdquo; This pattern is using secondary di-chord numbers, not primary di-chord numbers,
        to describe a set of notes.
      </P>
      <P>
        If we were to hear all three notes at once, &ldquo;0, up a [2], up a [2]&rdquo; does not
        describe how we are hearing that chord. Remember that in hearing two or more notes, our brains
        relate the upper note or notes to the lowest note in the group. When we are hearing fa, sol,
        and la played all at once, what we are actually hearing are multiple di-chords—the [2] formed
        by fa and sol, the [2] formed by sol and the la, and the [4] formed by fa and the la. The
        brain primarily notices the di-chord between each top note and the lowest note as most
        important. In our current example, this would be the fa to sol and the fa to la, although we
        also hear the di-chord from sol to la. Because of this, we will refer to this tri-chord as a
        [4/2]—from the top down, the la forms a [4] with the lowest note, and the sol forms a [2]
        with the lowest note.
      </P>

      <H3>Exercises: Playing and Spelling Tri-Chords</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-1</p>
        <P>Using only semitones [1] and whole tones [2], what are the different tri-chords that you can make? Fill in the blanks in the table to find all four possibilities:</P>
        <div className="overflow-x-auto my-4"><table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-3 py-2 text-slate-300">Secondary Di-Chords</th>
              <th className="text-left px-3 py-2 text-slate-300">Tri-Chord Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="px-3 py-2 text-slate-200">0, [2], [2]</td>
              <td className="px-3 py-2 text-slate-200">[4/2]</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="px-3 py-2 text-slate-200">0, [1], [1]</td>
              <td className="px-3 py-2 text-slate-400 italic">_______</td>
            </tr>
            <tr className="border-b border-slate-800">
              <td className="px-3 py-2 text-slate-400 italic">_______</td>
              <td className="px-3 py-2 text-slate-200">[3/1]</td>
            </tr>
            <tr>
              <td className="px-3 py-2 text-slate-400 italic">_______</td>
              <td className="px-3 py-2 text-slate-400 italic">_______</td>
            </tr>
          </tbody>
        </table></div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-2</p>
        <P>The [2/1] tri-chord is formed by going up a semitone, or [1], and then going up another semitone. Here are two examples of [2/1] tri-chords.</P>
        <P>Sitting at the piano, find and play every possible manifestation of the [2/1] tri-chord. To play this type of tri-chord, use the index, middle, and ring fingers of your right hand, one finger per note. You can start on any note; once you have played a [2/1], move each of your fingers up by one semitone so that you are forming the [2/1] tri-chord that is transposed exactly a semitone higher than the first one you played. Keep moving up chromatically until you return to the starting note, now one octave higher. Listen to how crunchy this tri-chord is!</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-3</p>
        <P>This exercise is the same as the previous one but with an added step. After you form and play each tri-chord, speak out loud the pattern of black and white notes. For example, if you started on the note re, the exercise would start off like this:</P>
        <P>Play tri-chord. &ldquo;White, black, white.&rdquo;<br />Play tri-chord up a semitone. &ldquo;Black, white, white.&rdquo;<br />Play tri-chord up another semitone. &ldquo;White, white, black.&rdquo;<br />Etc.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-4</p>
        <P>The [4/2] is formed by going up a whole tone, or [2], and then going up another whole tone. Here are two examples of [4/2] tri-chords.</P>
        <P>Repeat the last two exercises but now using the [4/2] tri-chord. Notice how open and expansive this tri-chord feels! Compare it to the crunchy [2/1], which contains three dissonant di-chords, two of which are non-harmonic. The [4/2] contains two dissonant and one modal di-chord, and all three di-chords are harmonic, giving the tri-chord a fluffier quality, more like a biscuit or cake.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-5</p>
        <P>This exercise will be similar to the three previous exercises but with an added step. After forming and playing each tri-chord, speak out loud the names of each of the notes from the bottom up.</P>
        <P>In some cases, this will actually be tricky because to be spelled correctly, each note in these tri-chords must have a specific letter name. In making these tri-chords, we are moving up a 2nd, and then up a 2nd again. In the case of the [4/2], we are moving up a major 2nd, and then up a major 2nd again. Therefore, the [4/2] tri-chord beginning on the note mi is correctly spelled only as &ldquo;mi, fax, solx.&rdquo;</P>
        <P>Spelling this tri-chord as &ldquo;mi, sol#, sol&rdquo; would be incorrect because sol# to sol is not a 2nd!</P>
        <P>So, when naming the notes that constitute tri-chords, each note should be named with a different syllable, and the syllables should be consecutive. This means that you will occasionally need to use &ldquo;double flat&rdquo; (bb) and &ldquo;double sharp&rdquo; (x) names. For example, starting on the note reb, the [4/2] tri-chord would be spelled &ldquo;reb, mib, fax.&rdquo; Remember, double flat indicates that a note is lowered two semitones from its white-key note, and double sharp indicates that it is raised two semitones from its white-key note. For the keys that have two names, including mi/fax, fa/mix, si/dohb, and doh/six, practice naming the tri-chord starting on each of the two names.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-6</p>
        <P>For each of the starting notes given below, form the tri-chord above it using keyboard visualization. Then, write in the names of the members of the tri-chord. Note that each column represents the primary di-chord numbers, which describe how a pitch relates to the bottom or fundamental note.</P>
        <div className="overflow-x-auto my-4"><table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-3 py-2 text-slate-300">Starting Note</th>
              <th className="text-left px-3 py-2 text-slate-300">[0]</th>
              <th className="text-left px-3 py-2 text-slate-300">[2]</th>
              <th className="text-left px-3 py-2 text-slate-300">[4]</th>
            </tr>
          </thead>
          <tbody>
            {['C','C#','Db','D','D#','Db (enharmonic)','E','Eb','E#','F','F#','Bb','G','G#','Gb','A','Ab','A#','B','Bb (enharmonic)','B#'].map((note, i) => (
              <tr key={i} className={i % 2 === 0 ? 'border-b border-slate-800' : 'border-b border-slate-800 bg-slate-800/30'}>
                <td className="px-3 py-2 text-slate-200 font-medium">{note}</td>
                <td className="px-3 py-2 text-slate-400">&nbsp;</td>
                <td className="px-3 py-2 text-slate-400">&nbsp;</td>
                <td className="px-3 py-2 text-slate-400">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-7</p>
        <P>Sitting at the piano, find and play every possible manifestation of the [3/1] Phrygian tri-chord. To play this type of tri-chord, use the index, middle, and ring fingers of your right hand, one finger per note. You can start on any note; once you have played a [3/1], move each of your fingers up by one semitone so that you are forming the [3/1] tri-chord that is transposed exactly one semitone higher than the first tri-chord you played. Keep moving up like this until you return to the starting note, now one octave higher.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-8</p>
        <P>In the following piano diagrams, the fundamental pitch is colored gray. Using a pencil, shade in the two notes above the fundamental that create a [3/1] tri-chord. Then, in the spaces below each image, spell the tri-chord using English letter names. Notice that there are often multiple possibilities for spelling, depending on the note name given to the fundamental. If one of the spellings seems more common than the other, circle the spelling that would be most commonly found. The first two questions have been completed for you as examples. Remember that you may need to use double flats or double sharps.</P>
        <ol className="list-decimal pl-6 space-y-1 text-slate-300 text-sm mt-2">
          <li>(Fundamental: C, D, E♭) — circled spelling: C, D, E♭ — other spelling: B#, C#, D#</li>
          <li>(Fundamental: C#, D, E) — circled spelling: C#, D, E — other spelling: D♭, E♭♭, F♭</li>
          <li>D — [answer space]</li>
          <li>D♭ — E♭ [answer space]</li>
          <li>E — F♭ [answer space]</li>
          <li>F — E# [answer space]</li>
          <li>F# — G♭ [answer space]</li>
          <li>G — [answer space]</li>
          <li>G# — A♭ [answer space]</li>
          <li>A — [answer space]</li>
          <li>A# — B♭ [answer space]</li>
          <li>B — C♭ [answer space]</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-9</p>
        <P>Sitting at the piano, find and play every possible manifestation of the [3/1] Phrygian tri-chord. To play this type of tri-chord, use the index, middle, and ring fingers of your right hand, one finger per note. You can start on any note; once you have played a [3/1], move each of your fingers up by one semitone so that you are forming the [3/1] tri-chord that is transposed exactly one semitone higher than the first tri-chord you played. Keep moving up like this until you return to the starting note, now one octave higher.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 17-10</p>
        <P>In the piano diagrams that follow, the fundamental pitch is colored gray. Using a pencil, shade in the two notes above the fundamental that create a [3/1] tri-chord. Then, in the space below each diagram, spell the tri-chord. Notice that there are often multiple possibilities for spelling, depending on the note name given to the fundamental. If one of the spellings seems more common than the other, circle the spelling that would be most commonly found. The first two questions have been completed for you. Remember that you may need to use double sharps or double flats.</P>
        <ol className="list-decimal pl-6 space-y-1 text-slate-300 text-sm mt-2">
          <li>(Fundamental: C, D♭, E♭) — circled spelling: C, D♭, E♭ — other spelling: B#, C#, D#</li>
          <li>(Fundamental: C#, D, E) — circled spelling: C#, D, E — other spelling: D♭, E♭♭, F♭</li>
          <li>D — [answer space]</li>
          <li>D# — E♭ [answer space]</li>
          <li>E — F♭ [answer space]</li>
          <li>F — E# [answer space]</li>
          <li>F# — G♭ [answer space]</li>
          <li>G — [answer space]</li>
          <li>G# — A♭ [answer space]</li>
          <li>A — [answer space]</li>
          <li>A# — B♭ [answer space]</li>
          <li>B — C♭ [answer space]</li>
        </ol>
      </div>

      <H3>Continuation: The Ionian Scale</H3>
      <P>
        In summary, mastering the seven modes requires mastering the four diatonic tri-chords. The
        Ionian scale is built from these four tri-chord types.
      </P>

      {/* ── CH.18 ── */}
      <H2 id="ch18">Ch.18 — Tetrachord Formation: Ionian, Dorian, Phrygian, and Lydian</H2>

      <H3>The Four Tetrachords</H3>
      <P>
        Tetrachords are groups of four notes that, from the lowest note to the highest note in the tetrachord,
        span a 4th. There are four diatonic tetrachords: Ionian, Dorian, Phrygian, and Lydian.
      </P>
      <P>
        In subsequent chapters, you will learn to simultaneously form and visualize all seven notes of any
        heptachord, but first, in this chapter, you must focus on mastering tetrachords, which are the building
        blocks of heptachords. Each of the seven Western modes can be formed with a combination of one or two of
        the four diatonic tetrachords, and by learning to think fluently in the patterns of these four
        tetrachords, you will gain access to all seven modes.
      </P>

      <H3>The Ionian Tetrachord</H3>
      <P>
        First, consider the C major scale. Place your left-hand pinky on the tonic, doh, and play the notes
        doh, re, mi, and fa — this is an Ionian tetrachord. Next, place your right-hand index finger on the
        note sol. Using the index, middle, ring, and pinky fingers of the right hand, play the notes sol, la,
        ti, and doh — another Ionian tetrachord. You have just formed a major scale, and if you start on any
        of the 12 pitches and follow the same sequence, you will have formed the major scale that begins on the
        lowest note in your formation. Therefore, one way to describe the major scale is to say that it consists
        of two Ionian tetrachords separated by a <BC>[2]</BC>.
      </P>
      <P>
        When you formed the major scale with two Ionian tetrachords, did the tetrachords look similar to each
        other? You may have noticed that each tetrachord was formed using the same pattern of secondary
        di-chords. To find the secondary di-chord pattern for the Ionian tetrachord, use the first four notes
        of the doh major scale:
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <tbody>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-4 py-2 font-mono text-center">doh</td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center">re</td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center">mi</td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center">fa</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center">0</td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-4 py-2 font-mono text-center"><BC>[1]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        So, to form the Ionian tetrachord above any given note, you need to track &ldquo;up a <BC>[2]</BC>, up
        a <BC>[2]</BC>, up a <BC>[1]</BC>.&rdquo; This can be simplified to [0, 2, 2, 1]. You can then deduce
        that the primary di-chord pattern for the Ionian tetrachord is [0, 2, 4, 5]. By practicing this
        formation and exploring the visual patterns of black and white keys, forming the Ionian tetrachord will
        soon feel easy and immediate, and you will be able to visualize and form the tetrachord as a single unit
        rather than using the intermediate step of spelling it out through tracking.
      </P>

      <H3>The Dorian Tetrachord</H3>
      <P>
        To form a Dorian tetrachord, place your left-hand pinky on the note re, and play the notes re, mi, fa,
        and sol with all four fingers of your left hand. You can deduce from these four notes that the secondary
        di-chord pattern for the Dorian tetrachord is [0, 2, 1, 2] and the primary di-chord pattern is
        [0, 2, 3, 5].
      </P>

      <H3>The Phrygian Tetrachord</H3>
      <P>
        To form a Phrygian tetrachord, place your left-hand pinky on the note mi, and play the notes mi, fa,
        sol, and la with all four fingers of your left hand. You can deduce from these four notes that the
        secondary di-chord pattern for the Phrygian tetrachord is [0, 1, 2, 2] and the primary di-chord pattern
        is [0, 1, 3, 5].
      </P>

      <H3>The Lydian Tetrachord</H3>
      <P>
        To form a Lydian tetrachord, place your left-hand pinky on the note fa, and play the notes fa, sol, la,
        and si with all four fingers of your left hand. You can deduce from these four notes that the secondary
        di-chord pattern for the Lydian tetrachord is [0, 2, 2, 2] and the primary di-chord pattern is
        [0, 2, 4, 6].
      </P>

      <H3>Exercises: Ionian Tetrachord Formation</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-1: Ionian Tetrachord Exploration</p>
        <P>
          1. Sitting at the piano, find and play every possible manifestation of the Ionian tetrachord. To play
          tetrachords, use the index, middle, ring, and pinky fingers of your right hand, one finger per note.
          You can start on any note; once you have played an Ionian tetrachord, move each of your fingers up by
          one semitone so that you are forming the tetrachord that is exactly one semitone higher than the first
          one you played. If you have moved each finger up only one semitone, the new tetrachord will maintain
          the &ldquo;0, [2], [2], [1]&rdquo; pattern. Keep moving up chromatically like this until you return
          to your starting note, now one octave higher.
        </P>
        <P>
          2. Repeat step 1, but after you form and play each tetrachord, speak aloud the pattern of black and
          white notes. For example, the tetrachord formed on re would be &ldquo;white, white, black, white.&rdquo;
        </P>
        <P>
          3. Repeat step 1, but after you form and play each tetrachord, speak aloud the solfege names of each
          of the notes from the bottom up. Each note of the tetrachord should have a unique name, and the
          syllables should be consecutive in order.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-2: Naming Ionian Tetrachords</p>
        <P>1. Write out the Ionian tetrachord using primary di-chord numbers.</P>
        <P>2. Write out the Ionian tetrachord using secondary di-chord numbers.</P>
        <P>
          3. Above each of the 21 note classes given in the following table, form an Ionian tetrachord using
          keyboard visualization and the pattern of secondary di-chords. Then write in the letter names of the
          members of the tetrachord in ascending order.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 font-semibold text-center" colSpan={4}>
                  Ionian Pattern: [0] | [2] | [2] | [1]
                </th>
              </tr>
              <tr className="bg-slate-700">
                <th className="border border-slate-600 px-3 py-2 text-slate-300">Starting Note</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[2]</BC></th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[2]</BC></th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[1]</BC></th>
              </tr>
            </thead>
            <tbody>
              {['C','C#','Cb','D','Db','Da','E','Eb','Ea','F','Fa','Fb','G','Ga','Gb','A','Ab','Aa','B','Bb','Ba'].map((note, i) => (
                <tr key={note} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                  <td className="border border-slate-600 px-3 py-2 text-slate-200 font-mono">{note}</td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-3: Fill in the Blanks</p>
        <P>
          In the following table, given a note other than the first note and its primary di-chord, calculate
          the rest of the Ionian tetrachord. Use keyboard visualization to form the tetrachord in your right
          hand and then determine the appropriate note names.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-700">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">0</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[2]</BC></th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[4]</BC></th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center"><BC>[5]</BC></th>
              </tr>
            </thead>
            <tbody>
              {[
                ['', '', 'Ab', ''],
                ['', '', '', 'F'],
                ['', 'A', '', ''],
                ['', 'Fa', '', ''],
                ['', '', 'C', ''],
                ['', '', 'B', ''],
                ['', '', 'A', ''],
                ['', '', '', 'Eb'],
                ['', '', '', 'Aa'],
                ['', '', '', 'Fa'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-slate-600 px-3 py-2 text-center font-mono text-slate-200">
                      {cell || <span className="text-slate-600">___</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-4: Correcting Note Names</p>
        <P>
          The following Ionian tetrachords contain errors in the note names — the patterns are correct, but a
          note has been called by the wrong name. Cross out the incorrect name and write the correct name next
          to it. Note that you should not be changing the pitch itself but only the name by which that pitch is
          called.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-700">
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 1</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 2</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 3</th>
                <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 4</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['A','B','Db','D'],
                ['Fa','Ab','Aa','B'],
                ['Ab','Bb','C','Ca'],
                ['Gb','Ab','Aa','B'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-slate-600 px-3 py-2 text-center font-mono text-slate-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <H3>Exercises: Dorian, Phrygian, and Lydian Tetrachord Formation</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-5: Modelling the Dorian, Phrygian, and Lydian Tetrachords</p>
        <P>
          Models for the Dorian, Phrygian, and Lydian tetrachords can be found on the white keys, starting on
          D, E, and F, respectively — fill out the following tables to find the primary and secondary di-chord
          numbers for these types of tetrachords.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-amber-400 font-semibold" colSpan={4}>DORIAN</th>
              </tr>
              <tr className="bg-slate-700">
                {['D','E','F','G'].map(n => (
                  <th key={n} className="border border-slate-600 px-3 py-2 text-slate-300 text-center font-mono">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-900">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-amber-400 font-semibold" colSpan={4}>PHRYGIAN</th>
              </tr>
              <tr className="bg-slate-700">
                {['E','F','G','A'].map(n => (
                  <th key={n} className="border border-slate-600 px-3 py-2 text-slate-300 text-center font-mono">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-900">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-amber-400 font-semibold" colSpan={4}>LYDIAN</th>
              </tr>
              <tr className="bg-slate-700">
                {['F','G','A','B'].map(n => (
                  <th key={n} className="border border-slate-600 px-3 py-2 text-slate-300 text-center font-mono">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-900">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2 text-slate-200 text-center font-mono">[0]</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
                <td className="border border-slate-600 px-3 py-2 text-slate-400 text-center">___</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-6: Exploring the Dorian, Phrygian, and Lydian Tetrachords, Part I</p>
        <P>
          1. Sitting at the piano, find and play every possible manifestation of the Dorian tetrachord. To play
          the tetrachords, use the index, middle, ring, and pinky fingers of your right hand, one finger per
          note. You can start on any note.
        </P>
        <P>
          2. Once you have played your first Dorian tetrachord, move each of your fingers up by one semitone,
          so that you are forming the tetrachord that is transposed exactly one semitone higher than the
          previous one. If you do this correctly, the new tetrachord should maintain the [0, 2, 1, 2] secondary
          di-chord pattern.
        </P>
        <P>3. Keep moving up chromatically until you return to the starting pitch, now one octave higher.</P>
        <P>
          4. Repeat the previous three steps for the Phrygian and Lydian tetrachords, observing the patterns of
          black and white keys for each type of tetrachord.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-7: Exploring the Dorian, Phrygian, and Lydian Tetrachords, Part II</p>
        <P>
          This is the same as the previous exercise but with an added step. After you form and play each
          tetrachord, speak aloud the solfege names of each of the notes from the lowest pitch up. Remember
          that each note of the tetrachord should be named with a unique solfege syllable, and the syllables
          should be consecutive (e.g., doh re mi fa; sol la si doh, etc.). Repeat this exercise for the
          Dorian, Phrygian, and Lydian tetrachords.
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 18-8: Spelling Tetrachords</p>
        <P>
          In the first row of the following tables, write the primary di-chords of the tetrachord and then
          complete the rest of the tables using English letter names. Complete this section of the workbook
          away from the piano, relying solely on your keyboard visualization and tracking skills. Use your
          index, middle, ring, and pinky fingers to form the tetrachords on your imaginary piano.
        </P>
        <P>
          The tables use each of the 21 note classes as starting notes. Watch out for some of the trickier
          spellings, and remember that whether you start with C, Ca, or Cb, the next three notes of the
          tetrachord must be some kind of D, followed by some kind of E, followed by some kind of F. Whether
          the D, E, and F are natural, flat, sharp, double flat, or double sharp depends on what type of C you
          began with and what tetrachord template you are using (Dorian, Phrygian, or Lydian).
        </P>
        {['DORIAN','PHRYGIAN','LYDIAN'].map(type => (
          <div key={type} className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse border border-slate-600">
              <thead>
                <tr className="bg-slate-800">
                  <th className="border border-slate-600 px-3 py-2 text-amber-400 font-semibold" colSpan={5}>
                    {type} TETRACHORD
                  </th>
                </tr>
                <tr className="bg-slate-700">
                  <th className="border border-slate-600 px-3 py-2 text-slate-300">Starting Note</th>
                  <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 2</th>
                  <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 3</th>
                  <th className="border border-slate-600 px-3 py-2 text-slate-300 text-center">Note 4</th>
                </tr>
              </thead>
              <tbody>
                {['C','Ca','Cb','D','Db','Da','E','Eb','Ea','F','Fa','Fb','G','Ga','Gb','A','Ab','Aa','B','Bb','Ba'].map((note, i) => (
                  <tr key={note} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800'}>
                    <td className="border border-slate-600 px-3 py-2 text-slate-200 font-mono">{note}</td>
                    <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                    <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                    <td className="border border-slate-600 px-3 py-2 text-slate-400"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ── CH.19 ── */}
      <H2 id="ch19">Ch.19 — The Diatonic Modes</H2>

      <H3>Introduction</H3>
      <P>
        Modes continue to be a central resource for musicians in both popular and &ldquo;serious&rdquo; music. Which elements within each mode, if any, might be responsible for associations with specified emotions, moods, or affects? Are these associations purely subjective, or might there be an objective means of understanding how modes elicit feelings and sentiments in our minds? A thorough examination of the di-chords contained in each mode helps us better understand the correspondence between objective fact and the emotional responses so often associated with the diatonic modes.
      </P>

      <H3>Modes in the Diatonic Ordering</H3>
      <P>
        There are seven diatonic Modes: Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian.
      </P>
      <P>
        Each mode is composed of seven diatonic notes that conform to a unique pattern of semitones and whole tones contained in the octave. By starting on each white-key note and moving stepwise up the octave, you can see that different patterns of semitones and whole tones occur in each mode. For example, when using only white-key notes, the Ionian mode begins on doh and ends on the doh an octave higher; however, the Dorian mode, if you use white keys only, begins on re and ends on the re an octave above and has the secondary di-chord pattern of [0, 2, 1, 2, 2, 2, 1, 2].
      </P>
      <P>
        It is helpful when first learning about the modes to study each mode as it occurs naturally on the white keys of the piano. In the following table, the seven white-key notes are listed along with their corresponding modes; that is, with the mode that starts and ends on that note when only white keys are used.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Tonic Pitch</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode Name</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-2">C/doh</td><td className="border border-slate-300 px-3 py-2">Ionian</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2">D/re</td><td className="border border-slate-300 px-3 py-2">Dorian</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2">E/mi</td><td className="border border-slate-300 px-3 py-2">Phrygian</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2">F/fa</td><td className="border border-slate-300 px-3 py-2">Lydian</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2">G/sol</td><td className="border border-slate-300 px-3 py-2">Mixolydian</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2">A/la</td><td className="border border-slate-300 px-3 py-2">Aeolian</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2">B/si</td><td className="border border-slate-300 px-3 py-2">Locrian</td></tr>
          </tbody>
        </table>
      </div>

      <P>
        You will need to memorize the seven mode names and know what diatonic pitch corresponds with each mode.
      </P>

      <H3>The Tonocentric Model</H3>
      <P>
        In the context of a key or a mode, the primary di-chords (di-chords in relation to the tonic pitch) combine to give each scale degree a tendency to refer up or down to the nearest tonic, similar to how the fundamental/octave factor causes the upper note of a di-chord to refer down or up.
      </P>
      <P>
        The pattern of scale degree tendencies resembles a magnetic field in which the tonic is the attractor, in the center: <em>5 &nbsp; 6 &nbsp; 7 &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4</em>. I refer to this model as the Tonocentric Model. The term tonocentric means that the reference tone, or tonic, is in the center, surrounded on either side by radiating dissonant, modal, and perfect heptachord elements.
      </P>
      <P>
        Using this model of scale degree tendencies, each degree refers up or down to the nearest tonic. Degrees 2, 3, and 4 refer down to the nearest tonic and will be represented by the sign (+) because they rest above the nearest tonic; degrees 5, 6, and 7 refer up to the nearest tonic and will be represented by the sign (&minus;) because they rest below the nearest tonic:
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center">1</th>
              <th className="border border-slate-300 px-3 py-2 text-center">2</th>
              <th className="border border-slate-300 px-3 py-2 text-center">3</th>
              <th className="border border-slate-300 px-3 py-2 text-center">4</th>
              <th className="border border-slate-300 px-3 py-2 text-center">5</th>
              <th className="border border-slate-300 px-3 py-2 text-center">6</th>
              <th className="border border-slate-300 px-3 py-2 text-center">7</th>
              <th className="border border-slate-300 px-3 py-2 text-center">1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">T</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">+D</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">+M</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">+P</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">&minus;P</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">&minus;M</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">&minus;D</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">T</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Notice that each mode or heptachord will potentially have two dissonant members, two modal members, and two perfect members.
      </P>
      <P>
        Because dissonant di-chords sound active, on the move, anxious, dynamic, and &ldquo;gut&rdquo;-oriented, degrees 2 and 7 of any mode have this underlying nature, which is why they sound unresolved and wanting to move towards the tonic.
      </P>
      <P>
        Because modal di-chords sound mellifluous, undulating, fluid, emotional, and generally &ldquo;heart&rdquo; oriented, degrees 3 and 6 of any mode will have this basic nature.
      </P>
      <P>
        Perfect di-chords sound stoic, solid, balanced, controlled, somewhat cold, mentally calculating, and generally &ldquo;head&rdquo; oriented, so degrees 4 and 5 of any mode will have this basic nature.
      </P>

      <H3>Summary of Degree Tendencies</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>Degree 2 tends down and is dissonant.</li>
        <li>Degree 3 tends down and is modal.</li>
        <li>Degree 4 tends down and is perfect.</li>
        <li>Degree 5 tends up and is perfect.</li>
        <li>Degree 6 tends up and is modal.</li>
        <li>Degree 7 tends up and is dissonant.</li>
      </ul>
      <P>
        Though it is challenging to do at first, it is important to associate the abstract words&mdash;dissonant, modal, and perfect&mdash;with their affects. Knowing this, you can tell the general character of each degree in any mode, like recognizing the players and their positions in a football game. To know the exact name of the players, you must look and hear more deeply.
      </P>

      <H3>Tetrachordal Construction of Modes</H3>
      <P>
        When listening to modal music, the mind seems naturally inclined towards grouping the members of a mode into two tetrachords, one consisting of scale degrees 1, 2, 3, and 4, and the other consisting of degrees 5, 6, 7, and 1. For the sake of simplicity, we will call these two tetrachords Tetrachord I and Tetrachord II. The difference between the two tetrachords is that Tetrachord I consists of the tonic and three &ldquo;downward tending&rdquo; degrees, and Tetrachord II consists of the tonic and three &ldquo;upward tending&rdquo; degrees.
      </P>
      <P>
        The pulsation of each scale degree progresses through dissonant (D), modal (M), and perfect (P), radiating outward from the tonic (T).
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Tetrachord I (1&ndash;4)</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Tetrachord II (5&ndash;1)</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td><td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td><td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td><td className="border border-slate-300 px-3 py-2">Pure</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td><td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td><td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td><td className="border border-slate-300 px-3 py-2">Pure</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td><td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td><td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td><td className="border border-slate-300 px-3 py-2">Pure</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td><td className="border border-slate-300 px-3 py-2">Lydian [2,2,2]</td><td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td><td className="border border-slate-300 px-3 py-2">Mixed</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td><td className="border border-slate-300 px-3 py-2">Ionian [2,2,1]</td><td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td><td className="border border-slate-300 px-3 py-2">Mixed</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td><td className="border border-slate-300 px-3 py-2">Dorian [2,1,2]</td><td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td><td className="border border-slate-300 px-3 py-2">Mixed</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td><td className="border border-slate-300 px-3 py-2">Phrygian [1,2,2]</td><td className="border border-slate-300 px-3 py-2">Lydian [2,2,2]</td><td className="border border-slate-300 px-3 py-2">Mixed</td></tr>
          </tbody>
        </table>
      </div>

      <P>
        Notice that the first three modes&mdash;Ionian, Dorian, Phrygian&mdash;are made by combining two identical tetrachords; we will say that these are &ldquo;pure&rdquo; modes. The other four modes&mdash;Lydian, Mixolydian, Aeolian, and Locrian&mdash;are made by combining two different tetrachords; we will say that these are &ldquo;mixed&rdquo; modes.
      </P>

      <H3>Modes in the Ploger Ordering</H3>
      <P>
        My ordering of the modes begins on fa and proceeds in fifths through fa&ndash;doh&ndash;sol&ndash;re&ndash;la&ndash;mi&ndash;ri, just like with the Pythagorean ordering of fifths.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">1</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">2</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[11]</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[11]</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[1]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[1]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td><td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td></tr>
          </tbody>
        </table>
      </div>

      <P>
        With this approach, many more of the elegant patterns and symmetries of the modes become apparent. For example, observe that the primary di-chords of neighboring modes differ in only one scale degree! Lydian and Ionian differ only in their 4th degree; Ionian and Mixolydian differ only in their 7th degree; and so on.
      </P>
      <P>
        This ordering is, I maintain, the most natural ordering of the modes because it reveals the degrees of similarity and difference&mdash;modes nearest to one another share the most primary di-chords, and those farthest share the fewest. In other words, the farther apart two modes are from one another, the more dissimilar they are in their primary di-chord composition. Therefore, Lydian and Locrian are the most dissimilar, sharing only the primary di-chord [6].
      </P>
      <P>
        Further, because of the primary di-chords that they contain, the first three modes in the Ploger ordering&mdash;Lydian, Ionian, and Mixolydian&mdash;are of a different sonic nature than the final three&mdash;Aeolian, Phrygian, and Locrian. The Lydian, Ionian, and Mixolydian contain the di-chords [2] (major 2nd), [4] (major 3rd), and [9] (major 6th) which cause these modes to sound generally more open and &ldquo;major.&rdquo; By contrast, the Aeolian, Phrygian, and Locrian modes contain the di-chords [3] (minor 3rd), and [8] (minor 6th), and [10] (minor 7th), causing these modes to sound more contracted, tense, and &ldquo;minor.&rdquo;
      </P>
      <P>
        The Dorian mode, in this ordering, rests exactly in the middle and acts as a type of musical tipping-point, sharing aspects of both the open/major modes and the closed/minor modes, making the Dorian the most balanced mode in this regard.
      </P>
      <P>
        When you look at the modes, and music in general, in the Ploger or Pythagorean ordering it can seem like there is no end to the meaningful patterns there for you to see. For a more extensive exploration of these patterns see my article, <em>Music&rsquo;s DNA: The Perfect Fifth</em> (Ploger 2011).
      </P>

      <H3>Eight Rules That Govern Aural Perception of the Modes</H3>
      <P><strong>Rule 1</strong></P>
      <P>
        Generally, the first heard pitch in a modal melody acts to the ear/mind like the subject of a sentence. The ear seems to grasp the first heard pitch, holding it in mind as a reference pitch, such that a complete musical thought would end by returning to that pitch. Thus, in modal theory, the first note is generally also the same as the last one and is known as the final.
      </P>
      <P><strong>Rule 2</strong></P>
      <P>
        To aurally identify any mode, all seven of the mode&rsquo;s notes must be present. If one note is missing, the mode can have two possible identities because each mode shares six notes with at least one other mode.
      </P>
      <P><strong>Rule 3</strong></P>
      <P>
        The ear/mind most strongly perceives the di-chord formed between the tonic and each of the other six non-tonic notes in the mode. We refer to the di-chords formed between each of the six non-tonic notes and the tonic as primary di-chords. The six primary di-chords in any mode are largely responsible for its general character.
      </P>
      <P><strong>Rule 4</strong></P>
      <P>
        All di-chords formed between non-tonic pitches of a mode, while not insignificant, matter far less to our perceptions than the primary di-chords. Because of this, we refer to the di-chords formed between non-tonic members of a mode as a secondary di-chord. (Our minds probably prefer to attend to primary rather than secondary di-chords because of its desire for efficiency and order&mdash;while there are 42 secondary di-chords in the diatonic scale, there are only six primary ones.)
      </P>
      <P><strong>Rule 5</strong></P>
      <P>
        Of the six primary di-chords in each of the seven modes, two are dissonant, two are modal, and two are perfect. Scale degrees 2 and 7 are dissonant; 3 and 6 are modal; and, 4 and 5 are perfect, which creates a pattern radiating outward from the tonic.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center">5</th>
              <th className="border border-slate-300 px-3 py-2 text-center">6</th>
              <th className="border border-slate-300 px-3 py-2 text-center">7</th>
              <th className="border border-slate-300 px-3 py-2 text-center">1</th>
              <th className="border border-slate-300 px-3 py-2 text-center">2</th>
              <th className="border border-slate-300 px-3 py-2 text-center">3</th>
              <th className="border border-slate-300 px-3 py-2 text-center">4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center">Perfect</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Modal</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Dissonant</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-bold">Tonic</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Dissonant</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Modal</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Perfect</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P><strong>Rule 6</strong></P>
      <P>
        Each of the six non-tonic members of any mode is no more than a 4th from the tonic pitch class. The mind relates each non-tonic note to the closest pitch class manifestation of the tonic. This generates a pattern of degree tendencies in which degrees 2, 3, and 4 refer down, while 5, 6, and 7 refer up to the nearest tonic.
      </P>
      <P><strong>Rule 7</strong></P>
      <P>
        The harmonicity of each primary di-chord of a mode has a profound effect on the character of the mode, which helps us distinguish one mode from another by eye, hand, and ear. The following table shows the harmonicity factor for each scale degree in the seven diatonic modes.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Mode</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">2</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Harmonic</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Non-Harmonic</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Lydian</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td><td className="border border-slate-300 px-3 py-2 text-center">2</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Ionian</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td><td className="border border-slate-300 px-3 py-2 text-center">2</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Mixolydian</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">5</td><td className="border border-slate-300 px-3 py-2 text-center">1</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Dorian</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">4</td><td className="border border-slate-300 px-3 py-2 text-center">2</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Aeolian</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">3</td><td className="border border-slate-300 px-3 py-2 text-center">3</td></tr>
            <tr className="bg-slate-50"><td className="border border-slate-300 px-3 py-2 font-semibold">Phrygian</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">2</td><td className="border border-slate-300 px-3 py-2 text-center">4</td></tr>
            <tr><td className="border border-slate-300 px-3 py-2 font-semibold">Locrian</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-red-600">NH</td><td className="border border-slate-300 px-3 py-2 text-center text-green-700">H</td><td className="border border-slate-300 px-3 py-2 text-center font-bold">1</td><td className="border border-slate-300 px-3 py-2 text-center">5</td></tr>
          </tbody>
        </table>
      </div>
      <P>
        Several remarkable patterns emerge from this table. The modes may be ranked according to the number of harmonic di-chords as follows: Mixolydian has five harmonic di-chords: [2], [4], [7], [9], [10]; Ionian, Lydian, and Dorian have four harmonic di-chords; Aeolian has three; Phrygian has two; and Locrian has only one harmonic di-chord: [10].
      </P>
      <P><strong>Rule 8</strong></P>
      <P>
        The modes associated with the most positive affects are those with the most harmonic di-chords, while those modes associated with the most negative affects are those with the most non-harmonic di-chords. Observe that the most non-harmonic modes are those two in which the tonics are found on the far right side of the Pythagorean Collection (E and B).
      </P>

      <H3>Developing Fluency in the Modes</H3>
      <P>
        Becoming fluent in the modes will be particularly helpful for hearing and understanding a wide variety of music in real time. Most of the music you play is probably in the Ionian mode or Aeolian mode (the Ionian mode is the major scale, while the Aeolian mode is the natural minor scale). However, the other modes are frequently used in diverse musical genres, particularly in jazz, pop, and folk music. Many traditional folk songs from cultures across the globe use modes. As you familiarize yourself with the modes, you will start to recognize them in many places, from Christmas carols to TV theme songs!
      </P>

      <H3>Exercises</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-1</p>
        <P>List the Modes in the Diatonic Ordering. Complete the following table by listing the modes in their diatonic ordering, starting with the Ionian, and fill in the English letter names of the pitches of that mode in ascending order. The Ionian row (C D E _ _ _ _) is provided as an example. Complete the remaining rows for Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-2</p>
        <P>Naming the Modes. Answer the following questions based on the diatonic modes (using only white keys on the piano). Complete this section from memory as a self-quiz. (1) Which mode starts on re? (2) Which mode starts on fa? (3) Which mode starts on si? (4) Which mode starts on doh? (5) Which mode starts on mi? (6) Which mode starts on sol? (7) Which mode starts on la?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-3</p>
        <P>Secondary Di-Chord Patterns in the Seven Modes. In this exercise, you will work with the modes as they occur on the white keys of the piano. Notice that all seven modes contain the same set of secondary di-chords (two [1]s and five [2]s), but because each mode begins on a different pitch, the [1]s and [2]s fall between different scale degrees. Complete the table for all seven modes. The Ionian row is completed as an example: C D E F G A B C with secondary di-chords [0] [2] [2] [1] [2] [2] [2] [1].</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-4</p>
        <P>Listing the Modes in the Ploger Ordering. List the modes according to the Ploger Ordering and write out both the solfege syllables and the primary di-chord numbers that correspond with each degree of the mode. Remember that primary di-chord numbers refer to the di-chord formed by any note and the fundamental, or first scale degree. The Lydian has been completed as an example: fa sol la si doh re mi / [0] [2] [4] [6] [7] [9] [11]. Complete the remaining rows for Ionian, Mixolydian, Dorian, Aeolian, Phrygian, and Locrian.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-5</p>
        <P>Scale Degrees and Interference Pulsation. In any of the diatonic modes, the interference pulsation of the scale degrees will be the same. Using the major scale (Ionian mode) as a model, fill in the table for degrees 1&ndash;7 showing the Primary Di-Chord and Interference Pulsation for each scale degree. Remember that the primary di-chord defines the number of semitones of a scale degree from the tonic beneath.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-6</p>
        <P>Scale Degrees and Fundamental/Octave Factor. In any of the diatonic modes, certain scale degrees will always refer up, and certain scale degrees will always refer down. Complete the table showing the Fundamental/Octave Factor for each scale degree 1&ndash;7.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-7</p>
        <P>Scale Degrees and Harmonicity. The harmonicity of each scale degree will depend on the type of scale. Complete the following table for the major scale (Ionian mode) showing, for each degree 1&ndash;7: the Primary Di-Chord Number, Interval Name, and Harmonicity. It is also important to know how far &lsquo;looking-up&rsquo; scale degrees are below the octave manifestation of the tonic. Answer: (1) What is the di-chord from 7 up to 1? (2) What is the di-chord from 6 up to 1? (3) What is the di-chord from 5 up to 1?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-8</p>
        <P>Ionian Scale Degree Properties Quiz. After you have explored and familiarized yourself with the properties of the scale degrees in the major scale, completing the following table should be a piece of cake! If you find yourself doing a lot of calculation, spend 5&ndash;10 minutes for 3&ndash;4 days in a row reviewing the properties of scale degrees. Complete the table for degrees 1&ndash;7 with columns: Primary Di-Chord, Common Interval Name, Interference Pulsation, Harmonicity, and F/O Factor.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-9</p>
        <P>Diatonic Di-Chords in the Ionian Mode. Use your keyboard visualization skills to answer the following questions using the diatonic scale from doh to doh as a model. (1) How many major 2nds are in the major scale, and between which pairs of degrees? (2) How many minor 2nds, and between which degrees? (3) Total 2nds? (4) How many major 3rds? (5) How many minor 3rds? (6) Total 3rds? (7) How many perfect 4ths? (8) How many augmented 4ths? (9) Total 4ths? (10) How many diminished 5ths? (11) How many perfect 5ths? (12) Total 5ths? (13) How many minor 6ths? (14) How many major 6ths? (15) Total 6ths? (16) How many minor 7ths? (17) How many major 7ths? (18) Total 7ths?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-10</p>
        <P>Mode Pictographs. The primary di-chords of the modes create unique characters and expressive possibilities for each mode. This can be illustrated using di-chord pictographs that show the type of interference pulsation with the outline of the number, the fundamental/octave factor with the number&rsquo;s shadow, and harmonicity with the color of the number (see p. 110 for the Di-Chord Pictograph). For each of the seven modes, draw a di-chord pictograph for each of the primary di-chords in that mode. For example, for the Lydian mode, draw the di-chord pictographs for [2], [4], [6], [7], [9], and [11]. Complete for all seven modes: Lydian, Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-11</p>
        <P>Comparing Modes, Part I. Use the information from the previous two exercises to answer the following questions. (1) Comparing Lydian and Ionian, which scale degree has a different primary di-chord number? (2) Comparing Ionian and Mixolydian? (3) Comparing Mixolydian and Dorian? (4) Comparing Dorian and Aeolian? (5) Comparing Aeolian and Phrygian? (6) Comparing Phrygian and Locrian? (7) Comparing Locrian and Lydian, how many scale degrees have the same primary di-chord numbers (not counting 1)?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-12</p>
        <P>Comparing Modes, Part II. (1) Which mode shares exactly six primary di-chords with the Lydian? (2) Which two modes share exactly six primary di-chords with the Ionian? (3) With the Mixolydian? (4) With the Dorian? (5) With the Aeolian? (6) With the Phrygian? (7) Which mode shares exactly six primary di-chords with the Locrian? (8) Can you find how the modes that share six primary di-chords are related? Is the pattern revealed more clearly with the diatonic ordering or the Ploger ordering?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-13</p>
        <P>Review of Modes, Di-Chords, and Scale Degrees. For each question, circle the tonic notes of the modes that satisfy the condition (choose from F C G D A E B). (1) Modes with di-chord [2] as 2nd degree. (2) Modes with di-chord [1] as 2nd degree. (3) Modes with di-chord [10] as 7th degree. (4) Modes with di-chord [11] as 7th degree. (5) Modes with di-chord [3] as 3rd degree. (6) Modes with di-chord [4] as 3rd degree. (7) Modes with di-chord [9] as 6th degree. (8) Modes with di-chord [8] as 6th degree. (9) Modes with di-chord [5] as 4th degree. (10) Modes with di-chord [6] as 4th degree. (11) Modes with di-chord [7] as 5th degree. (12) Modes with di-chord [6] as 5th degree. (13) How would you describe the patterns that are revealed in this exercise?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-14</p>
        <P>Tetrachords in the Modes, Part I. Recall the four diatonic tetrachords: Ionian, Dorian, Phrygian, and Lydian. Consider each mode as a combination of two tetrachords: Tetrachord I (scale degrees 1, 2, 3, 4 &mdash; tonic to subdominant) and Tetrachord II (scale degrees 5, 6, 7, 1 &mdash; dominant to tonic). Fill out the tables showing the primary di-chords and tetrachord type for each mode. The Ionian mode is completed as an example: Tetrachord I = [0][2][4][5] Ionian; Tetrachord II = [0][2][4][5] Ionian. Complete for Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 19-15</p>
        <P>Tetrachords in the Modes, Part II. (1) Which modes contain the Lydian tetrachord? (2) Which modes contain the Ionian tetrachord? (3) Which modes contain the Dorian tetrachord? (4) Which modes contain the Phrygian tetrachord? (5) Which of the seven diatonic modes are pure modes&mdash;modes constructed using two identical tetrachords? (6) Which of the seven diatonic modes are mixed modes&mdash;modes constructed using two different tetrachords?</P>
      </div>

      {/* ── CH.20 ── */}
      <H2 id="ch20">Ch.20 — Heptachord Formation</H2>

      <H3>An Introduction to Heptachords</H3>
      <P>
        So far, you have used your visualization and tracking skills to form and spell four types of
        tri-chords &#123;1/1&#125;, &#123;4/1&#125;, &#123;1/3&#125;, and &#123;3/1&#125; and four types of tetrachords (Ionian,
        Dorian, Phrygian, and Lydian) above any given note. This chapter advances on this skill further
        so you can form and visually visualize not just four notes at a time, but seven—a complete
        heptachord.
      </P>
      <P>
        With the ability to form and visualize groups of seven notes, not only can you imagine every
        major and minor scale, but each of the modes based on any tonic pitch. This makes complete
        orientation possible in any mode and any key. When you are oriented in a mode or key at any
        given moment, you are aware not only of each of its seven notes but also of the scale degree of
        each note and its relationship to the tonic note. This type of global awareness is essential for
        performing, improvising, and composing.
      </P>
      <P>
        To form a seven-note heptachord, both hands are needed. There are two approaches to forming
        heptachords: the conjunct arrangement and the disjunct arrangement. Both arrangements involve
        the ring, middle, index, and pinky fingers of both hands, but not the thumbs.
      </P>

      <H3>Disjunct Arrangement</H3>
      <P>
        In the disjunct arrangement, the tetrachord beginning on the tonic note is formed with the left
        hand, and the tetrachord beginning on the dominant note is formed with the right hand:
      </P>
      <P>1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7 &nbsp; 1</P>
      <P>
        This arrangement is familiar because it is the arrangement in which we typically play scales,
        from the tonic up an octave and back down again. Notice that in the disjunct arrangement, each
        finger is assigned to a single pitch, but both the left-hand and the right-hand pinkies are
        playing the same note, the tonic, one octave apart.
      </P>

      <H3>Conjunct Arrangement</H3>
      <P>
        The conjunct arrangement, in which the dominant-tonic tetrachord is formed with the left hand,
        and the overlapping tonic-subdominant tetrachord is formed with the right hand, is a more
        compact manifestation of the heptachord.
      </P>
      <P>
        As in the disjunct arrangement, two fingers play the tonic pitch, but unlike the disjunct
        arrangement, these are the overlapping index fingers—the tonic pitch is duplicated at the
        unison. The symmetry of this arrangement in our hands is useful for quick orientation in a
        heptachord, and it is this arrangement that we will be working with primarily.
      </P>
      <P>
        Notice that while the disjunct arrangement spans an octave, from tonic to tonic, the conjunct
        arrangement spans a seventh, from dominant to subdominant. The index fingers of the left and
        right hands overlap on the same note.
      </P>
      <P>
        Sitting at the keyboard, form the doh Ionian heptachord in the conjunct arrangement. Your index
        fingers will be overlapping on the note doh. Moving out from here, the middle finger of your
        right hand rests on re, scale degree 2; the middle finger of your left hand rests on si, scale
        degree 7. Notice that the middle fingers of both the left and right hands rest on the two
        dissonant degrees of the scale—2 and 7. The ring fingers each rest on the two modal degrees of
        the scale, the right-hand ring finger on 3 (mi) and the left-hand ring finger on 6 (la).
        Finally, you can see that scale degrees 4 (fa) and 5 (sol), the two perfect degrees of the
        scale, fall to the right and left pinkies, respectively.
      </P>
      <P>
        Consider this in comparison to the conjunct arrangement, in which the two pinky fingers play
        the tonic in two different octaves, the ring fingers play the dissonant degrees of the scale,
        the middle fingers play the modal degrees, and the index fingers play the perfect degrees.
      </P>

      <H3>Exercises: Constructing Disjunct and Conjunct Heptachords</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-1: Disjunct Construction of Heptachords</p>
        <P>
          Recall that all the modes are constructed from four types of basic tetrachord—Ionian, Dorian,
          Phrygian, and Lydian. Visualize each mode in the disjunct arrangement, and fill in the blanks
          in the following table.
        </P>
        <P>
          This table does not, on its own, give us enough information to form the complete heptachord as
          it does not indicate whether the di-chord between the subdominant and the dominant pitch is a
          [1] or a [2], a major or a minor 2nd. Use keyboard visualization to answer the question: Which
          modes have a di-chord [1] between the subdominant and dominant pitches?
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left px-3 py-2 text-slate-300">Mode (Heptachord)</th>
                <th className="text-left px-3 py-2 text-slate-300">Left Hand: Tonic-Subdominant Tetrachord</th>
                <th className="text-left px-3 py-2 text-slate-300">Right Hand: Dominant-Tonic Tetrachord</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Lydian</td>
                <td className="px-3 py-2">Lydian</td>
                <td className="px-3 py-2">Ionian</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Ionian</td>
                <td className="px-3 py-2">Ionian</td>
                <td className="px-3 py-2">Ionian</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Mixolydian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Dorian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Aeolian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Phrygian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr>
                <td className="px-3 py-2">Locrian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-2: Conjunct Construction of Heptachords</p>
        <P>
          Complete the table, like in Exercise 20-1. However, whereas Exercise 20-1 was organized to
          display disjunct arrangements, this table is organized to display conjunct arrangements—the
          hands forming each tetrachord have switched. Read the column headings very carefully before
          completing the table!
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left px-3 py-2 text-slate-300">Mode (Heptachord)</th>
                <th className="text-left px-3 py-2 text-slate-300">Left Hand: Dominant-Tonic Tetrachord</th>
                <th className="text-left px-3 py-2 text-slate-300">Right Hand: Tonic-Subdominant Tetrachord</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Lydian</td>
                <td className="px-3 py-2">Ionian</td>
                <td className="px-3 py-2">Lydian</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Ionian</td>
                <td className="px-3 py-2">Ionian</td>
                <td className="px-3 py-2">Ionian</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Mixolydian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Dorian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="px-3 py-2">Aeolian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-800">
                <td className="px-3 py-2">Phrygian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
              <tr>
                <td className="px-3 py-2">Locrian</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-3: Scale Degrees in Conjunct Heptachord Construction</p>
        <P>
          The following questions will help to map the correspondence between fingers and scale degrees.
          This information must be memorized and be immediately recallable in order to use conjunct
          formation of heptachords effectively. Answer all questions as they relate to the conjunct
          heptachord formation:
        </P>
        <ol className="list-decimal pl-6 space-y-1 text-slate-200 text-sm mt-2">
          <li>Which fingers play the dissonant degrees of the scale?</li>
          <li>Which fingers play the modal degrees of the scale?</li>
          <li>Which fingers play the perfect degrees of the scale?</li>
          <li>Which fingers play the tonic (first degree) of the scale?</li>
          <li>Which finger of which hand plays scale degree 2?</li>
          <li>Which finger of which hand plays scale degree 7?</li>
          <li>Which finger of which hand plays scale degree 3?</li>
          <li>Which finger of which hand plays scale degree 6?</li>
          <li>Which finger of which hand plays scale degree 4?</li>
          <li>Which finger of which hand plays scale degree 5?</li>
          <li>Which finger of which hand plays scale degree 1?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-4: Conjunct Formation of Modes</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-200 text-sm">
          <li>
            Sitting at the piano, form the conjunct arrangement of the Ionian mode on doh. Recall that
            the tonic pitch is in the middle of this arrangement with both of your index fingers
            overlapping on the tonic. As this is a pure mode, both the left and right hands will be
            forming the same tetrachord, Ionian.
          </li>
          <li>
            Now, by moving in semitones, form the conjunct arrangement of the Ionian mode with each of
            the twelve pitches as the tonic.
          </li>
          <li>
            Next, practice forming the other two pure modes, Dorian and Phrygian, with each of the
            twelve pitches as the tonic.
          </li>
          <li>
            <P>With the same approach, practice forming the four mixed modes: Lydian, Mixolydian, Aeolian, and Locrian. Check that your hands find the correct combination of tetrachords:</P>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>In the Lydian, the left hand is Ionian and the right hand is Lydian.</li>
              <li>In the Mixolydian, the left hand is Dorian and the right hand is Ionian.</li>
              <li>In the Aeolian, the left hand is Phrygian and the right hand is Dorian.</li>
              <li>In the Locrian, the left hand is Lydian and the right hand is Phrygian.</li>
            </ul>
            <P>
              Forming the modes in this way helps the brain conceptualize how and why each of the seven
              modes feels and sounds different from the others—how the tetrachords comprising a mode, and
              thus the di-chords comprising the tetrachords, contribute to the mode&apos;s affect.
            </P>
          </li>
        </ol>
      </div>

      <H3>Mode Modulation</H3>
      <P>
        Simultaneously visualizing all seven notes of a heptachord reveals each of the seven pitch
        options within the heptachord. However, it also reveals the most effective way to move from one
        heptachord to another, by allowing us to see how changing a single note in a heptachord can
        take us to an entirely new mode or key. This change from one mode to another by altering only
        one note is a mode modulation.
      </P>
      <P>
        While sitting at a keyboard, form the conjunct arrangement of the Lydian mode based on the note
        doh. To form the conjunct arrangement of the heptachord, place both index fingers overlapping on
        the tonic, doh. Your left pinky rests on the dominant pitch, sol. From sol to doh in the left
        hand forms an Ionian tetrachord, [0 2 4 5], with the notes sol, la, si, and doh; from doh to
        fa# in the right hand forms a Lydian tetrachord, [0 2 4 6], with the notes doh, re, mi, and fa#.
      </P>
      <P>
        You may have already noticed that this collection of seven notes matches one of the common key
        signatures, sol major, which contains one accidental, fa#. The seven notes in the Lydian mode
        based on doh are the same seven notes in the sol major scale (which we could also call the
        Ionian mode on sol). The difference between the Lydian mode on doh and the sol major scale is
        the tonic pitch—the note the scale begins on. Even though the two scales are made up of the
        same collection notes, they sound very different because the ear relates each of the notes to
        the tonic, and when the tonic is different, we perceive very different relationships—that is, we
        hear a very different set of primary di-chords.
      </P>
      <P>
        Now, if you keep the same tonic pitch, doh, what one scale degree must you raise or lower by a
        semitone to move from the Lydian mode on doh to the Ionian mode on doh? Since you must keep the
        same tonic pitch, you can move any one of your fingers except either index finger. By moving
        your right-hand pinky down one semitone, from fa# to fa, you will form an Ionian heptachord
        with the Ionian tetrachord (sol, la, si, doh) in the left hand and the Ionian tetrachord (doh,
        re, mi, fa) in the right hand. With no accidentals, this collection of seven notes corresponds
        to the doh major scale.
      </P>

      <H3>Exercises: Mode Modulation</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-5: Scale Degree Differences in the Ploger Ordering of Modes</p>
        <P>
          When the modes are in the Ploger ordering (by perfect 5th), only one scale degree differs
          between any two neighboring modes. Circle the one scale degree that is not the same primary
          di-chord in both modes:
        </P>
        <ul className="list-none pl-2 space-y-2 text-slate-200 text-sm mt-2 font-mono">
          <li>Lydian and Ionian: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
          <li>Ionian and Mixolydian: &nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
          <li>Mixolydian and Dorian: &nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
          <li>Dorian and Aeolian: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
          <li>Aeolian and Phrygian: &nbsp;&nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
          <li>Phrygian and Locrian: &nbsp;&nbsp;&nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; 6 &nbsp; 7</li>
        </ul>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 20-6: Mode Modulation</p>
        <P>
          In this exercise, by keeping the same tonic pitch and changing one note at a time (other than
          the tonic), you will become familiar with how modes work in composition. That is, finding the
          pattern of di-chords for any mode starting from any of the twelve pitches.
        </P>
        <ol className="list-decimal pl-6 space-y-2 text-slate-200 text-sm mt-2">
          <li>Form the doh Ionian heptachord at the keyboard. What one scale degree must you raise or lower by a semitone to move from doh Ionian to doh Mixolydian?</li>
          <li>Which major scale shares the same seven notes? (Hint: look at which black-key notes are in the heptachord—what key signature do they correspond to?)</li>
          <li>Now form the doh Mixolydian heptachord at the keyboard. Which single scale degree must you raise or lower by a semitone to move from doh Mixolydian to doh Dorian?</li>
          <li>Which major key shares the same notes?</li>
          <li>Form the doh Dorian heptachord at the keyboard. Which single scale degree must you raise or lower by a semitone to move from doh Dorian to doh Aeolian?</li>
          <li>Which major key signature has the same seven notes?</li>
          <li>Form the doh Aeolian heptachord at the keyboard. Which single scale degree must you raise or lower by a semitone to move from doh Aeolian to doh Phrygian?</li>
          <li>Which major key signature has the same seven notes?</li>
          <li>Form the doh Phrygian heptachord at the keyboard. Which single scale degree must you raise or lower by a semitone to move from doh Phrygian to doh Locrian?</li>
          <li>Which major key signature has the same seven notes?</li>
          <li>What pattern was formed by the key signatures as we changed modes by 5ths?</li>
        </ol>
      </div>

      {/* ── CH.21 ── */}
      <H2 id="ch21">Ch.21 — Triads and Their Inversions: Major, Minor, Diminished, and Augmented</H2>

      <H3>Primary and Secondary Di-Chords</H3>
      <P>
        We will name triads by their primary di-chord numbers, which, in this case, are the di-chords formed
        by each member of the chord and the lowest pitch of that chord. Recall that these are &ldquo;primary&rdquo;
        di-chords because we perceive them first and most strongly. As a rule, any secondary di-chord is of
        less significance to our aural perception of chords than are the primary di-chords because the primary
        di-chord(s) can be stated in any octave above the lowest pitch of the chord without affecting the basic
        identity of the triad.
      </P>

      <H3>Root Position Triads</H3>
      <P>
        Any root position triad, whether major, minor, diminished, or augmented, will possess two primary
        di-chords, one a 5th above the bass and the other a 3rd above the bass.
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>The 5th may be di-chord <BC>[7]</BC>, <BC>[6]</BC> or <BC>[8]</BC>.</li>
        <li>The 3rd may be di-chord <BC>[4]</BC> or <BC>[3]</BC>.</li>
      </ul>
      <P>
        For example, visualizing the keyboard, form a doh major triad with your right hand: doh, mi, sol. The
        5th of the chord, sol, creates a di-chord <BC>[7]</BC> with doh, the fundamental. The 3rd of the chord,
        mi, creates a di-chord <BC>[4]</BC> with doh. Observe that you will be hearing a composite effect of a
        perfect <BC>[7]</BC> and a modal <BC>[4]</BC>; this will be important to perceptually distinguish
        different triads. The following table shows the primary di-chord elements of the four triad types.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Triad Type</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Type of 5th</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Di-Chord of 5th</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Type of 3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Di-Chord of 3rd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Major</td>
              <td className="border border-slate-300 px-3 py-2">Perfect</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[7]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[4]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor</td>
              <td className="border border-slate-300 px-3 py-2">Perfect</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[7]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[3]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Diminished</td>
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Minor</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[3]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Augmented</td>
              <td className="border border-slate-300 px-3 py-2">Augmented</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[8]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Major</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[4]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>The Root Position [7/4] Major Triad</H3>
      <P>
        In the <BC>[7/4]</BC> major triad, the 5th is the perfect and harmonic di-chord <BC>[7]</BC>, and the
        3rd is the modal and harmonic di-chord <BC>[4]</BC>. Because both the primary di-chords are harmonic,
        the sound of the chord is uniquely open, expanding, and alkaline. While exceptionally harmonious, and
        sounding self-contained, complete, and whole, it might also seem bland&mdash;though this is somewhat
        mollified by the undulating motion of the modal <BC>[4]</BC>.
      </P>

      <H3>The Root Position [7/3] Minor Triad</H3>
      <P>
        In the <BC>[7/3]</BC> minor triad, the 5th is the perfect and harmonic di-chord <BC>[7]</BC>, and the
        3rd is the modal and non-harmonic di-chord <BC>[3]</BC>. The non-harmonic di-chord <BC>[3]</BC> renders
        the triad&rsquo;s sound more closed, contracting, and acidic. Because the ear is subconsciously aware
        of the 5th partial of the fundamental&rsquo;s overtone series, which is always a di-chord <BC>[4]</BC>,
        a semitone tension exists between these two pitches, evoking emotional poignancy, vulnerability, or
        tenderness.
      </P>

      <H3>The Root Position [6/3] Diminished Triad</H3>
      <P>
        Both primary di-chords in the diminished triad are non-harmonic, rendering this chord strongly closed,
        contracting, and acidic in sound. Its 5th is diminished, a di-chord <BC>[6]</BC>, which possesses an
        oddly ambivalent nature because its upper note refers both down to the fundamental and up to its octave
        manifestation. As a result, because the <BC>[6]</BC> can sound almost frozen in place, while still
        being non-harmonic, the diminished triad has a harsh and tart sound. It is the only triad whose 5th
        is perfect but non-harmonic.
      </P>

      <H3>The Root Position [8/4] Augmented Triad</H3>
      <P>
        In the <BC>[8/4]</BC> augmented triad, the 5th is the non-harmonic and modal di-chord <BC>[8]</BC>,
        and the 3rd is the modal and harmonic di-chord <BC>[4]</BC>. Notice that both the primary di-chords
        of the augmented triad have a modal interference pulsation of 4Hz, which renders the augmented triad
        uniquely modal in sound.
      </P>
      <P>
        Rarely employed in functional harmony, the augmented triad is most often employed as a &ldquo;color&rdquo;
        chord to enhance mystery or exoticism in later Romantic and Post-Romantic compositions. Discerning the
        augmented triad from other triads is a matter of recognizing it as the only triad with no perfect (2Hz)
        di-chords.
      </P>

      <H3>Inverted Triads</H3>
      <P>
        Any root position triad can be &ldquo;inverted&rdquo; by using a different note of the triad as the
        lowest note. For example, take a doh major triad, consisting of the notes doh, mi, and sol from the
        bottom up. The root is doh, the 3rd is mi, and the 5th is sol. If you were to transpose the lowest
        note, doh, up an octave, then the chord, from the bottom up, would read mi, sol, and doh. This triad
        would be in its first inversion. Notice that the 3rd of the triad, mi, would now be the bass note.
      </P>
      <P>
        Subsequently, if you were to take that first inversion chord and transpose its lowest note, mi, up an
        octave, the chord would then read sol, doh, and mi from the bottom up. This triad would have the 5th,
        sol, as it&rsquo;s bass note, and it would be in second inversion.
      </P>
      <P>
        While the pitch classes of root position, first inversion, and second inversion triads stay the same,
        their primary di-chords (di-chords in relation to the lowest note) differ, which causes each inversion
        to have different sound characteristics. For example, the primary di-chords of a root position major
        triad are <BC>[7]</BC> and <BC>[4]</BC>&mdash;perfect harmonic and modal harmonic&mdash;while the
        primary di-chords of a first inversion major triad are <BC>[8]</BC> and <BC>[3]</BC>&mdash;modal
        non-harmonic and modal non-harmonic. These two forms of the same triad sound very different!
      </P>

      <H3>First Inversion Triads</H3>
      <P>
        First inversion triads are known as &ldquo;6/3&rdquo; because they have two pitch classes above the
        bass&mdash;one a 6th above the bass and the other a 3rd above the bass. The 6th can be a di-chord{' '}
        <BC>[8]</BC> or <BC>[9]</BC> and the 3rd can be a di-chord <BC>[3]</BC> or <BC>[4]</BC>.
      </P>
      <P>
        The following table indicates the di-chords above the bass for each of the four first inversion (6/3)
        chord types. Notice that in first inversion triads, the 3rd of the root position chord is now in the
        bass, the 3rd above the bass is the 5th of the root position chord, and the 6th above the bass is
        the root.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6th</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Part of Chord</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Major</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[8]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[9]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[9]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Augmented</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[8]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Second Inversion Triads</H3>
      <P>
        Second inversion triads are known as &ldquo;6/4&rdquo; because they have two pitch classes above the
        bass&mdash;one a 6th above the bass and the other a 4th above the bass. The 6th can be a di-chord{' '}
        <BC>[8]</BC> or <BC>[9]</BC> and the 4th can be perfect <BC>[5]</BC>, augmented <BC>[6]</BC>, or
        diminished <BC>[4]</BC>.
      </P>
      <P>
        The following table indicates the di-chords above the bass for each of the four first inversion (6/4)
        chord types. Notice that in second inversion triads, the 5th of the root position chord is now in the
        bass, the 4th above the bass is the root, and the 6th above the bass is the 3rd.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6th</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Part of Chord</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Major</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[9]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[8]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[9]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Augmented</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[0]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[8]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Open and Closed Positions</H3>
      <P>
        In any triad, there is a secondary di-chord that is formed by the combination of the 3rd and 5th. When
        the lowest note of the triad is the fundamental pitch (that is, the triad is in root position), the
        next-highest pitch is the 3rd, and the highest pitch is the 5th; we can find the secondary di-chord
        created by the 3rd and 5th by subtracting the primary di-chord number of the 3rd from the primary
        di-chord number of the 5th. In the case of a root position major triad voiced &ldquo;root, 3rd,
        5th,&rdquo; we subtract <BC>[4]</BC>, the primary di-chord number of the 3rd, from <BC>[7]</BC>,
        the primary di-chord number of the 5th, and get <BC>[3]</BC>, the secondary di-chord number created
        by the 3rd and 5th:
      </P>
      <P><BC>[7]</BC> &minus; <BC>[4]</BC> = <BC>[3]</BC></P>
      <P>
        This way of stacking the notes&mdash;root, 3rd, 5th&mdash;is known as closed position. In closed
        position, the major triad in root position contains the primary di-chords <BC>[7]</BC> and <BC>[4]</BC>{' '}
        and the secondary di-chord <BC>[3]</BC>.
      </P>
      <P>
        Now, what if the triad, still in root position, is voiced differently, so that the 3rd of the chord
        is a higher pitch than the 5th of the chord&mdash;from the bottom up, root, then 5th, then 3rd? This
        type of voicing is known as open position. Note that the distance between the top and bottom notes is
        more than an octave, whereas, in closed position, the distance between the top and bottom notes of
        the triad is less than an octave.
      </P>
      <P>
        In open position, the secondary di-chord formed by the 3rd and 5th of the chord will be the inversion
        of the di-chord formed by the 3rd and 5th in closed position. Find the inversion of the secondary
        di-chord number is calculated from the number 12 (the number of notes in an octave):
      </P>
      <P><BC>[12]</BC> &minus; <BC>[3]</BC> = <BC>[9]</BC></P>
      <P>
        Consider the doh major triad as an example. In closed position, the triad, spelled from the bottom up,
        is doh, mi, sol. The primary di-chords in this position are <BC>[7]</BC> (doh to sol) and <BC>[4]</BC>{' '}
        (doh to mi). The secondary di-chord between mi and sol is a <BC>[3]</BC>.
      </P>
      <P>
        In open position, the triad, spelled from the bottom up, is doh, sol, mi. The primary di-chords remain
        the same. However, the secondary di-chord we hear with this voicing is the 3rd from mi up to sol but
        this is the 6th from sol up to mi. Sol up to mi is a di-chord <BC>[9]</BC>, confirming our calculation.
      </P>

      <H3>A Note on Figured Bass</H3>
      <P>
        In figured bass, a traditional harmonic notation system, numbers written below the staff refer to the
        generic interval or intervals that should be played above the bass. For example, a major triad in first
        inversion is indicated with the numbers &ldquo;6,&rdquo; indicating that the harmony contains a note a
        6th and a 3rd above the lowest voice. The octaves in which the 6th and the 3rd will be placed are not
        specified with figured bass. The specific type of interval&mdash;for example, major or minor
        3rd&mdash;is not specified but conforms to the key signature of the piece, unless otherwise indicated.
      </P>
      <P>
        When looking at figured bass, it is helpful to know fluently which di-chords are possible for each of
        the figured bass numbers in the diatonic scale. Remember the basic di-chord correspondences found in
        the following table:
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Figured Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Interval</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Di-Chord Possibilities Above the Bass</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">2</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[1]</BC> or <BC>[2]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">3</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[3]</BC> or <BC>[4]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">4</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[5]</BC> or <BC>[6]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">5</td>
              <td className="border border-slate-300 px-3 py-2">5th</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[7]</BC> or <BC>[6]</BC></td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">6</td>
              <td className="border border-slate-300 px-3 py-2">6th</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[8]</BC> or <BC>[9]</BC></td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 text-center font-mono font-bold">7</td>
              <td className="border border-slate-300 px-3 py-2">7th</td>
              <td className="border border-slate-300 px-3 py-2"><BC>[10]</BC> or <BC>[11]</BC></td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Exercises: Becoming Familiar with Triads and Inversions</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 21-1: Triads and Melodic Gestures</p>
        <P><strong>I. MAJOR TRIAD</strong></P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1 mb-3">
          <li>Sing a melodic ascending major triad in root position with closed voicing using the gesture names open, closed, weak, and strong.</li>
          <li>What are the secondary di-chord numbers in an ascending major triad?</li>
          <li>What are the melodic gestures of an ascending major triad?</li>
          <li>Sing a melodic descending major triad in root position with closed voicing using the gesture names open, closed, weak, and strong.</li>
          <li>What are the secondary di-chords numbers in a descending major triad?</li>
          <li>What are the melodic gestures of a descending major triad?</li>
          <li>Sing the fundamental of a major triad, then up to the 5th, and then down to the 3rd.</li>
          <li>What are the secondary di-chords of this pattern?</li>
          <li>What are the melodic gestures?</li>
        </ol>
        <P><strong>II. MINOR TRIAD</strong></P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1 mb-3">
          <li>Sing an ascending minor triad in root position with closed voicing using the gesture names open, closed, weak, and strong.</li>
          <li>What are the secondary di-chord numbers in an ascending minor triad?</li>
          <li>What are the melodic gestures of an ascending minor triad?</li>
          <li>Sing a descending minor triad in root position with closed voicing and using gesture names.</li>
          <li>What are the secondary di-chords numbers in a descending minor triad?</li>
          <li>What are the melodic gestures of a descending minor triad?</li>
          <li>Sing the fundamental of a minor triad, then up to the 5th, and then down to the 3rd.</li>
          <li>What are the secondary di-chords?</li>
          <li>What are the melodic gestures?</li>
        </ol>
        <P><strong>III. DIMINISHED TRIAD</strong></P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1 mb-3">
          <li>Sing an ascending diminished triad in root position with closed voicing using gesture names.</li>
          <li>What are the secondary di-chord numbers in an ascending diminished triad?</li>
          <li>What are the melodic gestures of an ascending diminished triad?</li>
          <li>Sing a descending diminished triad in root position with closed voicing using gesture names.</li>
          <li>What are the secondary di-chords numbers in a descending diminished triad?</li>
          <li>What are the melodic gestures of a descending diminished triad?</li>
          <li>Sing the fundamental of a diminished triad, then up to the 5th, and then down to the 3rd.</li>
          <li>What are the secondary di-chords?</li>
          <li>What are the melodic gestures?</li>
        </ol>
        <P><strong>IV. AUGMENTED TRIAD</strong></P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-1">
          <li>Sing an ascending augmented triad in root position with closed voicing using the gesture names.</li>
          <li>What are the secondary di-chord numbers in an ascending augmented triad?</li>
          <li>What are the melodic gestures of an ascending augmented triad?</li>
          <li>Sing a descending augmented triad in root position with closed voicing using the gesture names.</li>
          <li>What are the secondary di-chords numbers in a descending augmented triad?</li>
          <li>What are the melodic gestures of a descending augmented triad?</li>
          <li>Sing the fundamental of an augmented triad, then up to the 5th, and then down to the 3rd.</li>
          <li>What are the secondary di-chords?</li>
          <li>What are the melodic gestures?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 21-2: Inversions of Major and Minor Triads</p>
        <P>
          Using di-chord numbers, spell the following triads and their inversions using keyboard visualization
          and pitch tracking skills. The first row has been completed as an example.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-slate-600">
            <thead>
              <tr className="bg-slate-800">
                <th className="border border-slate-600 px-3 py-2 text-left font-semibold text-slate-200">Chord</th>
                <th className="border border-slate-600 px-3 py-2 text-left font-semibold text-slate-200">Figured Bass</th>
                <th className="border border-slate-600 px-3 py-2 text-left font-semibold text-slate-200">Primary Di-Chords</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr>
                <td className="border border-slate-600 px-3 py-2">Root Position Major Triad</td>
                <td className="border border-slate-600 px-3 py-2">5</td>
                <td className="border border-slate-600 px-3 py-2"><BC>[7]</BC></td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2">Root Position Major Triad</td>
                <td className="border border-slate-600 px-3 py-2">3</td>
                <td className="border border-slate-600 px-3 py-2"><BC>[4]</BC></td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-3 py-2">Root Position Minor Triad</td>
                <td className="border border-slate-600 px-3 py-2"></td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2">First Inversion Major Triad</td>
                <td className="border border-slate-600 px-3 py-2"></td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-3 py-2">First Inversion Minor Triad</td>
                <td className="border border-slate-600 px-3 py-2"></td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
              <tr className="bg-slate-800">
                <td className="border border-slate-600 px-3 py-2">Second Inversion Major Triad</td>
                <td className="border border-slate-600 px-3 py-2"></td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-3 py-2">Second Inversion Minor Triad</td>
                <td className="border border-slate-600 px-3 py-2"></td>
                <td className="border border-slate-600 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>What types of interference pulsation are created by each primary di-chord in both the root position major and minor triads?</P>
        <P>What types of interference pulsation are created by each primary di-chord in both the first inversion major and first inversion minor triads?</P>
        <P>What types of interference pulsation are created by each primary di-chord in both the second inversion major and second inversion minor triads?</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 21-3: Boulanger/Ploger Chord Exercise&mdash;Major and Minor Triads</p>
        <P>
          The following is an exercise that Nadia Boulanger asked her students to perform. The goal of the
          exercise is to learn the specific intervals above the bass for each of the possible positions or
          inversions&mdash;root, first, second, third&mdash;for every triad and 7th chord. I have altered her
          exercise to also include spelling the di-chord numbers of each note in relation to the bass.
        </P>
        <ol className="list-decimal pl-6 text-slate-300 text-sm space-y-2">
          <li>
            With the right hand, play a doh major chord in root position and in closed voicing. Correctly name
            each note in order, from the bottom up and then from the top down. Then name the primary di-chord
            of each note, from the top down. For example, this step would be spoken, &ldquo;Doh, mi, sol. Sol,
            mi, doh. [7], [4], [0].&rdquo;
          </li>
          <li>
            Keeping doh as the bass note (not the root), play a major first inversion chord in closed voicing.
            Correctly name each note in order, from the bottom up and from the top down. Then name the primary
            di-chord of each note, from the top down. Observe that the root of the chord is the 6th above
            the bass.
          </li>
          <li>
            Keeping doh as the bass note, play a major second inversion chord in closed voicing. Correctly name
            each note in order, from the bottom up and from the top down. Then name the primary di-chord of
            each note, from the top down. Observe that the root of the chord is the note a 4th higher than
            the bass.
          </li>
          <li>
            Repeat steps 1&ndash;3 starting on each note of the keyboard in ascending chromatic order&mdash;with
            the bass note as doh, re, re#, etc. Then repeat steps 1&ndash;3 in descending chromatic
            order&mdash;doh, si, sib, la, lab, etc.
          </li>
          <li>Repeat steps 1&ndash;4 for a minor triad.</li>
        </ol>
      </div>

      {/* ── CH.22 ── */}
      <H2 id="ch22">Ch.22 — Four Functional 7th Chords</H2>

      <H3>The Four Functional 7th Chords</H3>
      <P>There are four commonly employed 7th chords used in traditional functional harmony. Of these four, two are major-sounding and two are minor-sounding. Major sounding 7th chords may be found in minor heptachords, and vice versa. The two major-sounding 7th chords are the dominant 7th (a major triad with a minor seventh) and the minor 7th (a minor triad with a major seventh); the two minor-sounding 7th chords are the half-diminished 7th (a diminished triad with a minor seventh) and the fully-diminished 7th (a diminished triad with a diminished 7th). The half-diminished 7th is named thus because, while its triad is diminished, its seventh is not; the fully-diminished 7th chord has both a diminished triad and a diminished seventh.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Triad Type</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">7th Type</th>
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
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2">Diminished</td>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Root Position 7th Chords</H3>
      <P>Each 7th chord includes four pitches:</P>
      <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-1">
        <li>the root</li>
        <li>a pitch class that is a 3rd above the root</li>
        <li>a pitch class that is a 5th above the root</li>
        <li>a pitch class that is a 7th above the root</li>
      </ol>
      <P>Because each 7th chord contains pitches that are a 3rd, 5th, and 7th above the bass, the root position 7th chord is known as a &ldquo;7/5/3&rdquo; or simply as a &ldquo;7-chord.&rdquo;</P>
      <P>The four 7th chord types are distinguishable according to the specific di-chords formed with the root:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1">
        <li>The 7th may be either major [11], minor [10], or diminished [9]</li>
        <li>The 5th may be either perfect [7] or diminished [6]</li>
        <li>The 3rd may be either major [4] or minor [3]</li>
      </ul>
      <P>The following table shows the three primary di-chords above and including the root for each of the four common 7th chords. For ease of understanding, the elements of the chords appear in numerical order from smallest to largest.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">7th</th>
            </tr>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Part of Chord</th>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7th</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[10]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Note on the Fully-Diminished 7th</H3>
      <P>The fully-diminished 7th chord has the same di-chords [0,3,6,9] in all inversions because it is comprised of a [3] between the root and 3rd, the 3rd and 5th, and the 5th and 7th, each of these being a minor 3rd. In inversions of the fully-diminished 7th, [3] also exists between the 7th and the root above, but it is not a minor 3rd&mdash;it&rsquo;s an enharmonic augmented 2nd.</P>

      <H3>First Inversion Seventh Chords</H3>
      <P>First inversion seventh chords are known as &ldquo;6/5/3&rdquo; or simply &ldquo;6/5&rdquo; because they have three pitch classes above the bass corresponding to the following three di-chords:</P>
      <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-1">
        <li>a 6th that may be either major [9] or minor [8]</li>
        <li>a 5th that may be either perfect [7] or diminished [6]</li>
        <li>a 3rd that may be either major [4] or minor [3]</li>
      </ol>
      <P>The following table indicates the di-chords above the bass for each of the four first inversion (6/5) chord types. Notice that in 6/5 chords, the 3rd of the root position chord is now in the bass, the 3rd above the bass is the 5th of the root position chord, the 5th above the bass is the 7th of the root position chord and the 6th above the bass is the root.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">5th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6th</th>
            </tr>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Part of Chord</th>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[7]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Note on First Inversion &mdash; Identifying the Root</H3>
      <P>Notice also that the root is easily identifiable as the top note of two adjacent diatonic notes, one a 5th and the other a 6th above the bass&mdash;the note a 6th above the bass is the root. Though not easy to see in the case of the fully-diminished chord, the root (a 6th above the bass) is the top note of an augmented 2nd, even though it is a [3]. You cannot tell the inversion of a fully-diminished when hearing it in isolation.</P>

      <H3>Second Inversion 7th Chords</H3>
      <P>Second inversion 7th chords are called &ldquo;6/4/3&rdquo; or simply &ldquo;4/3&rdquo; because they have three pitch classes corresponding to the following di-chords above the bass:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1">
        <li>a 6th that may be either major [9] or minor [8]</li>
        <li>a 4th that may be either perfect [5] or augmented [6]</li>
        <li>a 3rd that may be either major [4] or minor [3]</li>
      </ul>
      <P>In second inversion chords, using the rule that the root is the top note of the two adjacent pitch classes, the root of the 4/3 chord is the 4th above the bass.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">3rd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6th</th>
            </tr>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Part of Chord</th>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[4]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Third Inversion 7th Chords</H3>
      <P>Third inversion 7th chords are called &ldquo;6/4/2&rdquo; or simply &ldquo;4/2&rdquo; because they have three pitch classes that correspond to the following di-chords above the bass:</P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1">
        <li>a 6th that may be either major [9] or minor [8]</li>
        <li>a 4th that may be either perfect [5] or augmented [6]</li>
        <li>a 2nd that may be either major [2] or augmented [3]</li>
      </ul>
      <P>Using the rule that the root of a 7th chord is the top of two adjacent pitch classes, the root of the 4/2 chord is the 2nd above the bass.</P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Diatonic Interval Above the Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Bass</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">2nd</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">4th</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">6th</th>
            </tr>
            <tr className="bg-slate-50">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Part of Chord</th>
              <td className="border border-slate-300 px-3 py-2 text-center">7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center">Root</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center">5th</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Dominant 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Minor 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-semibold">Half-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[2]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[5]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[8]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-semibold">Fully-Diminished 7th</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[3]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[6]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[9]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Summary: 7th Chord Elements in Inversions</H3>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-1">
        <li>The root is the bass in any root position 7th chord, the 6th above the bass in any 6/5, the 4th above the bass in any 4/3, and the 2nd above the bass in any 4/2.</li>
        <li>The 3rd of the root position chord is the bass in a 6/5, the 6th in a 4/3 and the 4th in a 4/2.</li>
        <li>The 5th of the root position chord becomes the 3rd in a 6/5, the bass in a 4/3, and the 6th in a 4/2.</li>
      </ul>

      <H3>Dominant 7th &mdash; All Inversions</H3>
      <P>The following tables identify the specific di-chords in each root position and inversion chord according to chord type. Di-chord numbers are shown from top down.</P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Position</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-chords (bass&rarr;top)</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Top&rarr;Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Root Position</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [4] [7] [10]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10 / 7 / 4</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">First Inversion (6/5)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [8]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">8 / 6 / 3</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Second Inversion (4/3)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [5] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 5 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Third Inversion (4/2)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [2] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Minor 7th &mdash; All Inversions</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Position</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-chords (bass&rarr;top)</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Top&rarr;Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Root Position</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [7] [10]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10 / 7 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">First Inversion (6/5)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [4] [7] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 7 / 4</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Second Inversion (4/3)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [5] [8]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">8 / 5 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Third Inversion (4/2)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [2] [5] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 5 / 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Half-Diminished 7th &mdash; All Inversions</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Position</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-chords (bass&rarr;top)</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Top&rarr;Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Root Position</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [10]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">10 / 6 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">First Inversion (6/5)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [7] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 7 / 3</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Second Inversion (4/3)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [4] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 4</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Third Inversion (4/2)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [2] [5] [8]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">8 / 5 / 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Fully-Diminished 7th &mdash; All Inversions</H3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Position</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-chords (bass&rarr;top)</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Top&rarr;Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Root Position</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">First Inversion (6/5)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 3</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Second Inversion (4/3)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 3</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Third Inversion (4/2)</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">[0] [3] [6] [9]</td>
              <td className="border border-slate-300 px-3 py-2 text-center font-mono">9 / 6 / 3</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Identifying Roots of Chords</H3>
      <P>A common approach used by music students to visually identify the root of any chord in a score is to juggle its three or four notes around until they form a stack of thirds and then determine its inversion by whether the 3rd, 5th, or 7th is in the bass. Unfortunately, all this takes three, four or more seconds, making the strategy impractical in real time and quite useless in telling us about how the chord actually sounds.</P>
      <P>A far more practical strategy for finding the root and inversion of a chord is to use the methodology suggested in thorough bass practice: identify the intervals above the bass. Doing this determines the primary di-chords that, in turn, determine the sound of the chord.</P>
      <P>Here are seven basic rules that can be easily committed to memory.</P>

      <H3>Roots in Triads</H3>
      <P><strong>1.</strong> The root in any root position (5/3) triad is the note that is the bottom of a 5th and/or the top of a 4th. Of the two primary di-chords, one is perfect and the other is modal; the secondary di-chord between the 3rd and 5th is modal.</P>
      <P><strong>2.</strong> The root in any first inversion triad (6/3) is the note a 6th above the bass. Both primary di-chords are modal; the secondary di-chord is perfect.</P>
      <P><strong>3.</strong> The root in any second inversion triad (6/4) is generally considered the 4th above the bass, however numerous respected theorists (Aldwell, Schachter, Plogger) posit that, while the preceding rule is true for most 6/4 chords, the root is the bass note in a cadential 6/4. Because a 5th above the bass has long been considered a &ldquo;dissonance&rdquo; in counterpoint and in four-part tonal harmony, the upper note of the 4th must be carefully prepared and resolved. This means that the 6/4 chords are employed less frequently than 5/3 and 6/3 chords. Most theorists concur that the root of the neighboring/plagal and passing 6/4 chords is the top of a 4th.</P>

      <H3>Roots in 7th Chords</H3>
      <P><strong>4.</strong> The root in any root position 7th chord (7/5/3) is the bottom of the 7th and/or the top of a 2nd. All 7th chord primary di-chords have one that sets their sound apart from the simpler triads. In this case, the primary di-chords contain all three types of interference patterns: dissonant, perfect and modal.</P>
      <P><strong>5.</strong> The root in any first inversion 7th chord (6/5/3) is the note class a 6th higher than the bass. Notice that the root can be easily spotted as the upper of two neighboring note classes&mdash;notes a diatonic 2nd apart. Here, the note a 6th higher is a diatonic 2nd above the 5th and is, therefore, the root. Notice that the sound of the 6/5/3 will be more modal than the 7/5/3 because the former has two rather than only one primary modal di-chord, making the sound warmer and more emotional in flavor.</P>
      <P><strong>6.</strong> The root in any second inversion 7th chord (6/4/3) is the note class a 4th higher than the bass that is also the note class a diatonic 2nd above the 3rd. The harsh sound of the perfect and non-harmonic 4th allows us to distinguish it from the 6/5/3.</P>
      <P><strong>7.</strong> The root in any third inversion 7th chord (6/4/2) is the note a 2nd higher than the bass.</P>

      <H3>Exercises: Building Fluency with Functional 7th Chords</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 22-1</p>
        <P><strong>Boulanger/Ploger Chord Exercise&mdash;Dominant 7th Chords.</strong></P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-2 text-sm mt-2">
          <li>With the right hand, play a doh dominant root position (7/5/3) chord, in closed voicing. Correctly name each note in order from the bottom up and then from the top down. Then name the primary di-chord of each note, from the top down. For example, this step would be spoken, &ldquo;doh, mi, sol, tib, tib, sol, mi, doh. [10], [7], [4], [0].&rdquo;</li>
          <li>With doh as the bass note, play a dominant first inversion (6/5/3) chord, in closed voicing. Correctly name each note in order from the bottom up and from the top down. Then name the primary di-chord of each note, from the top down. Observe that the root of the chord is the 6th above the bass.</li>
          <li>With doh as the bass note, build up a dominant second inversion (6/4/3) chord, in closed voicing. Correctly name each note in order from the bottom up and from the top down. Then name the primary di-chord of each note, from the top down. Observe that the root of the chord is the 4th higher than the bass.</li>
          <li>With doh as the bass note, play a dominant third inversion (6/4/2) chord, in closed voicing. Correctly name each note in order from the bottom up and from the top down. Then name the primary di-chord of each note, from the top down. Observe that the root of the chord is the 2nd above the bass.</li>
          <li>Repeat steps 1&ndash;4 starting on each note of the keyboard in ascending chromatic order&mdash;with the bass note as dohb, re, reb, etc. Then repeat steps 1&ndash;3 in descending chromatic order&mdash;doh, si, sib, la, lab, etc.</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 22-2</p>
        <P><strong>Boulanger/Ploger Chord Exercise&mdash;Minor, Half-Diminished, Fully-Diminished.</strong> Perform all the steps of the previous exercise but with the following chords in root position (7/5/3), first inversion (6/5/3), second inversion (6/4/3), and third inversion (6/4/2):</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>minor 7th</li>
          <li>half-diminished</li>
          <li>fully-diminished 7th</li>
        </ol>
        <P>For each chord, pay careful attention to the position of the chord&rsquo;s root. In first inversion, it will be the 6th above the bass; in second inversion, it will be the 4th above the bass; and in third inversion, it will be the 2nd above the bass.</P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 22-3</p>
        <P><strong>Bass Notes and Root Notes Quiz.</strong> Use your knowledge of the four functional 7th chords and your visualized keyboard to answer the following questions:</P>
        <ol className="list-decimal pl-6 text-slate-300 space-y-1 text-sm mt-2">
          <li>What is the root of a dominant 7th chord in first inversion that has doh as its bass?</li>
          <li>What is the bass of a dominant 7th chord in first inversion that has re as its root?</li>
          <li>What is the root of a minor 7th chord in first inversion that has mi as its bass?</li>
          <li>What is the bass of a minor 7th chord in first inversion that has fa as its root?</li>
          <li>What is the root of a half-diminished 7th chord in first inversion that has sol as its bass?</li>
          <li>What is the bass of a half-diminished 7th chord in first inversion that has fa as its root?</li>
          <li>What is the root of a fully-diminished 7th chord in first inversion that has si as its bass?</li>
          <li>What is the bass of a fully-diminished 7th chord in first inversion that has doh as its root?</li>
          <li>What is the root of a dominant 7th chord in second inversion that has re as its bass?</li>
          <li>What is the bass of a dominant 7th chord in second inversion that has mi as its root?</li>
          <li>What is the root of a minor 7th chord in second inversion that has fa as its bass?</li>
          <li>What is the bass of a minor 7th chord in second inversion that has sol as its root?</li>
          <li>What is the root of a half-diminished 7th chord in second inversion that has lab as its bass?</li>
          <li>What is the bass of a half-diminished 7th chord in second inversion that has si as its root?</li>
          <li>What is the root of a fully-diminished 7th chord in second inversion that has doh as its bass?</li>
          <li>What is the bass of a fully-diminished 7th chord in second inversion that has re as its root?</li>
          <li>What is the root of a dominant 7th chord in third inversion that has sib as its bass?</li>
          <li>What is the bass of a dominant 7th chord in third inversion that has fa as its root?</li>
          <li>What is the root of a minor 7th chord in third inversion that has sol as its bass?</li>
          <li>What is the bass of a minor 7th chord in third inversion that has la as its root?</li>
          <li>What is the root of a half-diminished 7th chord in third inversion that has sib as its bass?</li>
          <li>What is the bass of a half-diminished 7th chord in third inversion that has doh as its root?</li>
          <li>What is the root of a fully-diminished 7th chord in third inversion that has reb as its bass?</li>
          <li>What is the bass of a fully-diminished 7th chord in third inversion that has mi as its root?</li>
        </ol>
      </div>

      {/* ── CH.23 ── */}
      <H2 id="ch23">Ch.23 — Harmonization</H2>

      <H3>Scale Degree Harmonization in the Major Heptachord</H3>

      <H3>Triads and Scale Degrees</H3>
      <P>
        For each scale degree of the major heptachord, there is a triad that can be built on that scale
        degree. The chord qualities (major, minor, or diminished) of the triads built on each of the degrees
        of the scale will be consistent for all major scales. In this chapter, we will be exploring the
        qualities of the triads built on each degree of the major scale.
      </P>

      <H3>Exercises: Discovering the Triads of the Major Heptachord</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-1</p>
        <P>
          First, practice building triads with scale degrees. By using scale degrees and not specific
          pitches, you are creating templates that can be applied to any key or mode. Complete the table
          by filling in the scale degrees for each triad.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">Root</th>
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">3rd</th>
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">5th</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {[1,2,3,4,5,6,7].map((deg, i) => (
                <tr key={deg} className={i % 2 === 0 ? 'bg-slate-800' : ''}>
                  <td className="px-3 py-2">{deg}</td>
                  <td className="px-3 py-2"></td>
                  <td className="px-3 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-2</p>
        <P>
          1. In the key of doh major, play a tonic drone and sing, using solfege syllables, the melodic
          ascending triad built on scale degree 1 in root position. Referring to the table in the previous
          exercise, we are reminded that this triad is composed of scale degrees 1, 3, and 5. In doh
          major, these notes will be doh, mi, and sol.
        </P>
        <P>
          2. Beginning with the root of the triad as [0], now sing the same triad on primary di-chord
          numbers. In a major key, these numbers are [0] [4] [7]. Observe the quality of the triad. As
          you sing, listen to each primary di-chord created with the tonic drone and listen for the three
          identifying factors: interference pulsation, the fundamental/octave factor, and harmonicity.
        </P>
        <P>
          3. Still in the key of doh major, play the tonic drone and sing on solfege syllables the melodic
          ascending triad built on scale degree 2. In doh major, these notes will be re, fa, and la, with
          the corresponding primary di-chords of [2], [5], and [9]. Observe the three sound factors for
          each of these primary di-chords.
        </P>
        <P>
          4. Continue singing the diatonic triads built on each scale degree, 1–7, in the key of doh major
          over the tonic drone, first singing solfege syllables and then singing primary di-chord numbers
          while observing the sound factors in each triad.
        </P>
      </div>

      <H3>Roman Numerals as Chord Symbols</H3>
      <P>
        In music theory, Roman numerals are conventionally used in harmonic analysis of tonal music because
        the numerals, which correspond to the scale degrees of the root, reflect the hierarchy and
        tendencies of the triads.
      </P>
      <P>
        To indicate that the quality of a chord is major, its Roman numeral is capitalized; for example,
        I, IV, and V.
      </P>
      <P>
        To indicate that the quality of a chord is minor, its Roman numeral is written in lowercase; for
        example, ii, iii, and vi.
      </P>
      <P>
        To indicate that the quality of a chord is diminished, the lowercase version of the Roman numeral
        is followed by the &ldquo;degree&rdquo; symbol; for example, vii°.
      </P>
      <P>
        To indicate that the quality of a chord is augmented, the uppercase version of the Roman numeral
        is followed by the &ldquo;plus&rdquo; symbol; for example, III+. Although there is no augmented
        triad that occurs naturally in the diatonic scale, augmented triads are still occasionally found
        in tonal music.
      </P>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100">
              <th className="px-3 py-2 text-left font-semibold">Roman Numeral</th>
              <th className="px-3 py-2 text-left font-semibold">Triad Type</th>
              <th className="px-3 py-2 text-center font-semibold">Root</th>
              <th className="px-3 py-2 text-center font-semibold">3rd</th>
              <th className="px-3 py-2 text-center font-semibold">5th</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rn: 'I',    type: 'Major',      r: 1, t: 3, f: 5 },
              { rn: 'ii',   type: 'Minor',      r: 2, t: 4, f: 6 },
              { rn: 'iii',  type: 'Minor',      r: 3, t: 5, f: 7 },
              { rn: 'IV',   type: 'Major',      r: 4, t: 6, f: 1 },
              { rn: 'V',    type: 'Major',      r: 5, t: 7, f: 2 },
              { rn: 'vi',   type: 'Minor',      r: 6, t: 1, f: 3 },
              { rn: 'vii°', type: 'Diminished', r: 7, t: 2, f: 4 },
            ].map(({ rn, type, r, t, f }, i) => (
              <tr key={rn} className={i % 2 !== 0 ? 'bg-slate-50' : ''}>
                <td className="px-3 py-2 font-mono font-bold">{rn}</td>
                <td className="px-3 py-2">{type}</td>
                <td className="px-3 py-2 text-center">{r}</td>
                <td className="px-3 py-2 text-center">{t}</td>
                <td className="px-3 py-2 text-center">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Functional 7th Chords in the Major Scale</H3>
      <P>
        In the major heptachord, there are five locations of functional 7th chords. There is a dominant
        7th chord built on scale degree 5, which is written V7; there are three minor 7th chords built on
        scale degrees 2, 3, and 6, written ii7, iii7, and vi7, respectively; and there is a
        half-diminished triad on scale degree 7, written vii°7.
      </P>

      <H3>Exercises: Roman Numerals, Harmonizing, and Analysis</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-3</p>
        <P>
          Without referring to the table on the previous page, complete the following table by writing in
          the triad type and Roman numeral of the triads built on each of the degrees of the major scale.
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">Scale Degree</th>
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">Triad Type</th>
                <th className="px-3 py-2 text-left text-slate-300 font-semibold">Roman Numeral</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {[1,2,3,4,5,6,7].map((deg, i) => (
                <tr key={deg} className={i % 2 === 0 ? 'bg-slate-800' : ''}>
                  <td className="px-3 py-2">{deg}</td>
                  <td className="px-3 py-2"></td>
                  <td className="px-3 py-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-4</p>
        <P>
          Circle the letters and corresponding degrees that have major triads built above them:
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="text-slate-300">
                {['F','C','G','D','A','E','B'].map(l => (
                  <td key={l} className="px-3 py-2 text-center font-mono">{l}</td>
                ))}
              </tr>
              <tr className="text-slate-400">
                {[4,1,5,2,6,3,7].map(d => (
                  <td key={d} className="px-3 py-2 text-center">{d}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          Circle the letters and corresponding degrees that have minor triads built above them:
        </P>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <tbody>
              <tr className="text-slate-300">
                {['F','C','G','D','A','E','B'].map(l => (
                  <td key={l} className="px-3 py-2 text-center font-mono">{l}</td>
                ))}
              </tr>
              <tr className="text-slate-400">
                {[4,1,5,2,6,3,7].map(d => (
                  <td key={d} className="px-3 py-2 text-center">{d}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          Which scale degree did you not circle in either version of this exercise? What type of triad is
          built above this degree?
        </P>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-5</p>
        <P>
          This exercise contains ten chord sequences that will help you to coordinate melody and harmony
          in major heptachords. Each sequence can be played at the keyboard in four parts (SATB) and in
          multiple major keys.
        </P>
        <P>
          The top row of each sequence consists of Arabic numerals, while the bottom row consists of Roman
          numerals. The Arabic numerals represent the scale degrees in the soprano/melody, generally played
          with the pinky of the right hand. Roman numerals represent the triads that will harmonize each
          of the degrees in the soprano. The left hand will play only the root of each triad, and the
          right hand will play the soprano, alto, and tenor parts in closed voicing. The di-chord between
          adjacent parts on the right hand never exceeds a 4th and di-chords between the soprano and
          tenor will never exceed a 6th.
        </P>
        <P>
          To achieve fluency in the shortest time possible, try the following strategy. After selecting a
          major heptachord, review the correspondence between its seven scale degrees and notes on the piano:
        </P>
        <ol className="list-decimal pl-6 mb-4 text-slate-300 space-y-1 text-sm">
          <li>Recite the solfege syllable corresponding to each degree in the soprano part, in order.</li>
          <li>Recite the solfege syllable corresponding to the root of each triad in order.</li>
          <li>Recite the notes that correspond to the root, 3rd, and 5th of each chord.</li>
          <li>For each chord in order, recite the soprano and then the bass note, one chord at a time.</li>
          <li>For each chord in order, play all four parts.</li>
        </ol>
        <P>Sequences 1–4 contain only major triads, while sequences 5–10 contain major and minor triads.</P>
        <div className="space-y-3 mt-4">
          {[
            { n: 1,  soprano: [1,2,3,4,3,2,1,1,7,1],  roman: ['I','V','I','IV','I','V','I','IV','V','I'] },
            { n: 2,  soprano: [1,2,3,4,3,5,5,5],       roman: ['I','V','I','IV','I','I','V','I'] },
            { n: 3,  soprano: [5,4,5,5,5,4,5,5],       roman: ['I','IV','I','V','I','IV','V','I'] },
            { n: 4,  soprano: [3,2,2,3,2,1,1,7,2,1],   roman: ['I','V','V','I','V','I','IV','V','V','I'] },
            { n: 5,  soprano: [1,2,3,4,3,2,2,1],       roman: ['I','V','I','IV','I','ii','V','I'] },
            { n: 6,  soprano: [3,2,1,1,2,1,1],         roman: ['I','V','vi','IV','ii','V','I'] },
            { n: 7,  soprano: [2,2,1,1,4,7,1],         roman: ['vi','V','I','vi','IV','V','I'] },
            { n: 8,  soprano: [3,3,2,2,1,3,1],         roman: ['iii','vi','ii','V','I','IV','I'] },
            { n: 9,  soprano: [1,2,3,2,1,1,7,4],       roman: ['I','V','I','ii','vi','IV','V','vi'] },
            { n: 10, soprano: [3,2,4,3,3,3,2,2,1],     roman: ['I','ii','ii','iii','iii','vi','ii','V','I'] },
          ].map(({ n, soprano, roman }) => (
            <div key={n} className="bg-slate-800 rounded p-3">
              <p className="text-xs font-semibold text-amber-400 mb-2">Sequence {n}</p>
              <div className="overflow-x-auto">
                <table className="text-xs font-mono">
                  <tbody>
                    <tr>
                      <td className="pr-3 text-slate-400 font-semibold">Soprano:</td>
                      {soprano.map((d, i) => (
                        <td key={i} className="px-2 py-1 text-slate-200">{d}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="pr-3 text-slate-400 font-semibold">Roman:</td>
                      {roman.map((r, i) => (
                        <td key={i} className="px-2 py-1 text-amber-300">{r}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 23-6</p>
        <P>
          A tried and true approach to understanding four-part tonal harmony is the study of the chorales
          of J.S. Bach. A reason for studying these mini masterpieces of harmony is that, while they are
          exquisite examples of strict voice leading, they are also rich in the number of heptachords
          visited during their short duration, sometimes shifting four or more times in a single bar.
        </P>
        <P>
          While the chorale melodies are simple, mostly stepwise, and almost completely diatonic to the
          key signature, the chords underneath the melodic surface are anything but obvious. Being able to
          identify a chord by its root and inversion at a glance requires considerable practice; however,
          the amount of practice required is reduced by applying a common sense, systematic approach that
          will make it possible to proceed from one step to the next without a musical breakdown.
        </P>
        <P>
          The following six-step protocol provides a way to go from naming notes in each chord that appear
          in the familiar bass and treble clefs to identifying not only the root of each chord but its
          scale degree function and inversion at 72 bpm (as the notes appear in an open score version that
          employs the bass, soprano, alto and tenor clefs):
        </P>
        <ol className="list-decimal pl-6 mb-4 text-slate-300 space-y-3 text-sm">
          <li>
            Select a single phrase of a chorale. For each chord, in order of appearance, name the notes
            in B-S-A-T (bass, soprano, alto, tenor) order, naming each note as a solfege syllable.
            Practice this step repeatedly for the same phrase until it is effortless for you to envision
            and name each note on the musical keyboard at a rate of 144 bpm.
          </li>
          <li>
            Continuing to use the same phrase, for each chord in order, name the bass note using solfege
            and then name the diatonic intervals that the other notes form with the bass from the top
            down. Name all compound intervals (those over an octave) as simple ones — for example,
            instead of naming the interval as a 9th, name it as a 2nd. Repeat the phrase as needed until
            you can speak each note at the rate of 144 bpm.
          </li>
          <li>
            Using the same phrase, state the bass note name followed by the name of each chord&apos;s
            root in order. Repeat the bass note name if it is the root. Practice until you can name the
            bass and root at 144 bpm.
          </li>
          <li>
            Repeat the same phrase, this time identifying the root note and the inversion of the chord,
            using diatonic interval classes to identify inversions. For example, say, &ldquo;Fa 5/3, Doh
            6/5/3, etc.&rdquo; Repeat as needed until you can name each chord at a rate of 72 bpm.
          </li>
          <li>
            This time, identify the root note&apos;s function (I, ii, iii, IV, etc.) in the current
            heptachord (see chapter 24, &ldquo;Heptachord Shift&rdquo;). You may first wish to practice
            identifying the tonic and heptachord type for the phrase selected, in real time. Repeat the
            same phrase until you can name the root degree at 72 bpm.
          </li>
          <li>
            Finally, identify both the root function and the chord inversion. For example, you might say,
            &ldquo;V 6/3, I 5/3.&rdquo; Repeat until you can say the root and chord inversion at 72 bpm.
          </li>
        </ol>
        <P>
          By working on one phrase (usually about eight chords) per day, you will make considerable
          progress in a matter of a few weeks. Once you begin to feel that your skills are strong when
          using the close score version of the chorales, move to using the open score version. Because you
          will have developed an understanding of Bach&apos;s harmonies after working in the close score,
          you will no longer find it shocking to read the open score version. After a week of practicing
          chord analysis in open score, return to reading any chorale in the close score and you will find
          that your close score analysis has significantly improved!
        </P>
        <P>
          A final thought: To build your skills quicker, you might start by studying chorales with a C
          major key signature. As soon as you feel confident, move to chorales having one sharp or flat,
          then two sharps or flats, then three, etc.
        </P>
      </div>

      {/* ── CH.24 ── */}
      <H2 id="ch24">Ch.24 — Heptachord Shift</H2>

      <H3>Real-Time Perception</H3>
      <P>
        One of the greatest challenges facing us as we become fluent in the tonal language concerns
        modulation. It is an overwhelming subject, rigid yet elusive, that intimidates even the
        stout-hearted. Yet, modulation need not be a daunting enterprise; it can actually be quite simple
        to understand and enjoyable to employ.
      </P>
      <P>
        The method I use to teach modulation, as well as other aspects of musical perception, is what is
        known as real-time perception. Real-time perception means processing and making sense of sensory
        information at the speed at which that information occurs in everyday circumstances. When this
        concept is applied to music, it means being able to know what is happening in music at the moment
        it occurs during performance or listening. This is especially handy when you want to improvise
        because unless you become accustomed to knowing what is happening as it happens, your ability to
        improvise will be hindered.
      </P>
      <P>
        Fortunately, getting a handle on real-time modulation requires only that you know your scales and
        that you memorize a few simple strategies.
      </P>

      <H3>Heptachord Shift</H3>
      <P>
        I call this technique of real-time modulation <strong>Heptachord Shift</strong>. Heptachord Shift
        is based on the fact that we perceive tonal music in structures of seven-note chords, or
        &ldquo;heptachords.&rdquo; There are three tonal heptachords:
      </P>
      <ol className="list-decimal pl-6 mb-4 text-slate-700 space-y-1 text-sm">
        <li>major</li>
        <li>melodic minor</li>
        <li>harmonic minor</li>
      </ol>
      <P>
        These three heptachords correspond to the major, melodic minor (ascending only), and harmonic
        minor scales. However, a scale is but one expression of a heptachord. The notes of a heptachord
        can appear in any order as long as the notes conform to one of the three scales. Further, it
        does not matter if the notes of a heptachord are expressed in the form of chords (vertical
        forms), lines (horizontal forms) or any other variation of the two.
      </P>
      <P>
        What do heptachords have to do with modulation? Modulation occurs when one heptachord shifts or
        transmutes into another. Such a shift takes place at the moment one or more notes of a heptachord
        are chromatically altered. In other words, the moment the note C#, for instance, is introduced in
        the context of a G major heptachord, the heptachord instantly shifts to a D major heptachord. For
        some unknown reason, our ears dismiss or discard the note C at the very same moment that C# is
        introduced. You can prove this for yourself by first playing the notes in G major in any random,
        chaotic order and then throwing in the note C#. The C# will instantly sound like the leading tone
        of D major. The new heptachord is formed as the tonic shifts from the note G to the note D.
      </P>
      <P>
        So, all you have to do is replace C with C#. Common sense. Right? The beauty is that you do not
        have to know anything about conventional harmonic analysis to enact the modulation. You do not
        have to memorize elaborate cadences, nor do you even need a V7 chord.
      </P>
      <P>
        It is true that not all shifts are created equal. There are many ways that C# can be introduced,
        some which have a smoother and more seamless effect than others. These effects are quickly learned
        through experimentation; discovering the possibilities on your own is a lot of fun.
      </P>

      <H3>First Generation Heptachords</H3>
      <P>
        By using the principle of heptachord shift, you can move from one key/heptachord to another by
        changing only one note. A shift of heptachord initiated by changing one note is called a
        <strong> first generation heptachord shift</strong>.
      </P>

      <H3>First Generation Shifts from a Major Heptachord</H3>
      <P>
        When shifting from a major heptachord, you can move to one of five other heptachords by changing
        one note. The table below shows the scale degree that is altered, the scale degree it becomes in
        the new heptachord, and the new heptachord&apos;s relation to the original heptachord.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Scale Degree Alteration</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Scale Degree in New Heptachord</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">New Heptachord</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">#4</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7</td>
              <td className="border border-slate-300 px-3 py-2">[V]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">&#x266D;7</td>
              <td className="border border-slate-300 px-3 py-2 text-center">4</td>
              <td className="border border-slate-300 px-3 py-2">[IV]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">#5</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7</td>
              <td className="border border-slate-300 px-3 py-2">[vi▽]</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2 font-mono">#1</td>
              <td className="border border-slate-300 px-3 py-2 text-center">7</td>
              <td className="border border-slate-300 px-3 py-2">[ii△]</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-mono">&#x266D;3</td>
              <td className="border border-slate-300 px-3 py-2 text-center">3</td>
              <td className="border border-slate-300 px-3 py-2">[i△]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Summary of First Generation Shifts</H3>
      <P>
        In summary, if you were to sharpen scale degree 4 of a major heptachord, then the heptachord
        would shift to the dominant [V] of the original heptachord, with the sharpened fourth degree now
        functioning as the seventh degree.
      </P>
      <P>
        In Heptachord Shift analysis, an upward pointing triangle, △, denotes the melodic minor
        heptachord, while a downward pointing triangle, ▽, denotes the harmonic minor heptachord. So,
        if you were to sharpen scale degree 5 of a major heptachord, then the heptachord would shift to
        the relative harmonic minor [vi▽] of the original heptachord with the sharpened fifth degree now
        functioning as the seventh degree.
      </P>
      <P>
        For a thorough test drive, let&apos;s use C major as our initial major heptachord. We get to G
        major [V] by raising 4, so we raise F to F#; we get to F major [IV] by lowering 7, so we lower B
        to B♭; we get to A harmonic minor [vi▽] by raising 5, so we raise G to G#; we get to D melodic
        minor [ii△] by raising 1, so we raise C to C#; and, we change C major to C melodic minor [i△]
        by lowering 3, so we lower E to E♭.
      </P>

      {/* ── CH.25 ── */}
      <H2 id="ch25">Chapter Twenty-Five: Transposition</H2>

      <H3>Introduction</H3>
      <P>
        By changing clef on the staff, and by adjusting the key signature, you can learn to transpose
        notes at sight. This skill is especially important when reading or writing musical scores that
        employ &ldquo;transposing&rdquo; instruments, such as clarinets in B♭ or A, saxophones in B♭
        or E♭, the French or English horn in F, the trumpet in D, etc.
      </P>

      <H3>Using Clefs to Transpose</H3>
      <P>
        If you are fluent in using all eight clefs, you can transpose at sight by simply imagining that
        the music is written in a different clef with an alteration to the key signature. This may sound
        complicated, but it is a much more efficient way to transpose than thinking up or down an interval
        for every written note. For example, imagine that you are given the melody of Louis
        Bourgeois&rsquo; hymn tune <em>Old Hundredth</em> written in G major using the treble clef.
      </P>
      <P>
        But, you are asked to play the melody up a minor 3rd, in B♭ major; how would you do this? You
        would simply need to read the music as if it were written in the bass clef with two flats in the
        key signature (add three flats to the original key signature of G major).
      </P>
      <P>
        Notice that the notes of the melody are written on the same lines and spaces in both examples!
        In essence, to transpose any music written in the treble clef up by a minor 3rd, read it in the
        bass clef and add three flats to the original key signature.
      </P>
      <P>
        So, there is a particular clef and key signature alteration that will facilitate transposition
        by each interval or di-chord. The following table shows the clefs and key alterations needed to
        transpose from the treble clef up or down a di-chord [1], [2], [3], [4], [5], or [6]. These are
        the only di-chords of transposition you need to know because to transpose by other di-chords you
        can simply use their inversion: transposing up [II] is the same, in terms of note class, as
        transposing down [1], and transposing up [7] is the same, in terms of note class, as transposing
        down [5], and so on.
      </P>

      <H3>Transposition Table: Clef and Key Signature</H3>
      <P>
        Notice that the number of accidentals in the key signature alteration is the same when transposing
        the same di-chord up and down. For instance, when transposing up a major 2nd, add two sharps, and
        when transposing down a major 2nd, add two flats. Notice also that the type of accidental is the
        opposite&mdash;flat versus sharp&mdash;when transposing the same di-chord up and down. Further,
        the sum of accidental alteration for each diatonic interval transposition in a particular direction
        is always equal to seven: two accidentals are required to go up a [2], while five are required to
        go up a [1], and two plus five equals seven.
      </P>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Direction of Transposition</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Interval Class</th>
              <th className="border border-slate-300 px-3 py-2 text-center font-semibold">Di-Chord</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Clef</th>
              <th className="border border-slate-300 px-3 py-2 text-left font-semibold">Key Signature Alteration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Mezzo-Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+6 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Mezzo-Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+1 ♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Bass</td>
              <td className="border border-slate-300 px-3 py-2">+4 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Bass</td>
              <td className="border border-slate-300 px-3 py-2">+1 ♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Alto</td>
              <td className="border border-slate-300 px-3 py-2">+2 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Up</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Alto</td>
              <td className="border border-slate-300 px-3 py-2">+5 ♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[1]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Tenor</td>
              <td className="border border-slate-300 px-3 py-2">+5 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">2nd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[2]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Tenor</td>
              <td className="border border-slate-300 px-3 py-2">+2 ♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[3]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+3 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">3rd</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[4]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Soprano</td>
              <td className="border border-slate-300 px-3 py-2">+1 ♭</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[5]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Baritone</td>
              <td className="border border-slate-300 px-3 py-2">+1 #</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="border border-slate-300 px-3 py-2">Down</td>
              <td className="border border-slate-300 px-3 py-2">4th</td>
              <td className="border border-slate-300 px-3 py-2 text-center"><BC>[6]</BC></td>
              <td className="border border-slate-300 px-3 py-2">Baritone</td>
              <td className="border border-slate-300 px-3 py-2">+6 ♭</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H3>Note on the Transposition Table</H3>
      <P>
        Be aware that the previous table only applies when transposing from the treble clef. If you are
        a keyboardist or an instrumentalist who reads from the bass clef, you should use the same
        principle to make your own table for transposing from the bass clef (or any other clef, for
        that matter).
      </P>

      <H3>Transposed Instruments</H3>
      <P>
        Many wind and brass instruments are transposing, meaning that the notes written on the musical
        staff do not indicate the actual sounding pitch. The pitches played on wind and brass instruments
        are built upon the overtone series of their most basic or core pitch, which is determined by each
        instrument&rsquo;s size and shape.
      </P>
      <P>
        To understand transposing instruments, we can begin by realizing that the core pitch/key is
        indicated in the name of the instrument. The B♭ clarinet has, as its most essential key, the key
        of concert B♭; an A clarinet has, as its most essential key, the key of A; etc. Yet, for
        simplicity&rsquo;s sake, music written in the core key of these instruments is written to appear,
        on the staff, to be in C major. For example, when a B♭ clarinetist plays a written C, they are
        sounding a concert B♭. Similarly, a horn in F has the key of F as its most elemental or essential
        key; therefore, this key is written as C. Understanding the relationship between the sounding
        concert pitch and the note indicated on the staff is of the utmost importance if we are to know
        the concert pitch:
      </P>
      <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2 text-sm">
        <li>On a B♭ instrument, the written note class is a whole tone higher than sounding.</li>
        <li>On a D instrument, the written note class is a whole tone lower than sounding.</li>
        <li>On an A instrument, the written note class is a minor 3rd higher or a major 6th lower than sounding.</li>
        <li>On an E♭ instrument, the written note class is a minor 3rd lower or a major 6th higher than sounding.</li>
        <li>On an F instrument, the written note class is a perfect 4th lower, or a perfect 5th higher than sounding.</li>
        <li>On a G instrument, the written note class is a perfect 5th lower, or a perfect 4th higher than sounding.</li>
      </ul>

      <H3>Becoming Fluent with the Clefs</H3>
      <P>
        Musicians, even professionals, often assume that mastering clefs and transposition is unnecessary.
        However, those who master these concepts become the most literate and intellectually agile members
        of the musical community, being able to move between musical genres, comprehend complex musical
        scores and, more importantly, to grasp timbre differences between keys. Nadia Boulanger could very
        easily test my musical understanding of a composition by asking me to transpose it on the spot. If
        I had learned a piece by motor memory alone, I was unable to transpose, because playing it in
        another key felt completely different in my hands, disrupting my motor memory. However, if I had
        grasped the harmonic and melodic meaning of the piece, I could transpose to a different key with
        considerably less effort, and with far more musicality. Try transposing as much as you can, always
        remembering that, although it might seem extremely challenging, you will find the exercise
        invaluable.
      </P>

      <H3>Exercises: Transposing Using Clefs</H3>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 25-1</p>
        <P>
          Answer the following questions for this excerpt of <em>Yankee Doodle</em> written on the treble
          clef in F major.
        </P>
        <ol className="list-decimal pl-6 mt-2 text-slate-300 space-y-2 text-sm">
          <li>What key would it be in if you transposed it up a major 3rd? What clef would you use to read it transposed up a major 3rd?</li>
          <li>What clef would you use to transpose it down a di-chord [1], and how would you alter the key signature? What would the starting pitch be?</li>
          <li>What key would it be in if you transposed it up a di-chord [2]? What clef would you use to read it transposed up a di-chord [2]?</li>
          <li>What clef would you use to transpose it down a perfect 4th, and how would you alter the key signature? What would the starting pitch be?</li>
          <li>What key would it be in if you transposed it up a di-chord [3]? What clef would you use to read it transposed up a di-chord [3]?</li>
          <li>What clef would you use to transpose it up a minor 2nd, and how would you alter the key signature? What would the starting pitch be?</li>
          <li>If you transposed this excerpt using the tenor clef and added five sharps to the key signature, by what di-chord would you have transposed? What would the starting pitch be?</li>
          <li>If this excerpt was written for clarinet in B♭, what would be the first note&rsquo;s sounding pitch? What clef would you use to read it at the clarinet&rsquo;s sounding pitch?</li>
          <li>If this excerpt were written for horn in F, what would be the first note&rsquo;s sounding pitch? What clef would you use to transpose it at the horn&rsquo;s sounding pitch?</li>
          <li>If this excerpt were written for trumpet in D, what would be the first note&rsquo;s sounding pitch? What clef would you use to transpose to the trumpet&rsquo;s sounding pitch?</li>
        </ol>
      </div>

      <div className="rounded-lg bg-slate-900 border border-slate-700 p-4 my-4">
        <p className="text-xs font-bold text-amber-400 mb-2">Exercise 25-2</p>
        <P>
          On each staff, write the appropriate clef and key signature for the given starting note, making
          sure that the tune, <em>A Tisket A Tasket</em>, always starts on scale degree 5 of a major
          heptachord.
        </P>
        <ul className="list-none pl-2 mt-2 text-slate-300 space-y-1 text-sm">
          <li>Starting Note — G</li>
          <li>Starting Note — A♭</li>
          <li>Starting Note — F♯</li>
          <li>Starting Note — A</li>
          <li>Starting Note — F</li>
          <li>Starting Note — B♭</li>
          <li>Starting Note — E</li>
          <li>Starting Note — B</li>
          <li>Starting Note — E♭</li>
          <li>Starting Note — C</li>
          <li>Starting Note — D</li>
          <li>Starting Note — C♯</li>
          <li>Starting Note — D♭</li>
        </ul>
      </div>

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
