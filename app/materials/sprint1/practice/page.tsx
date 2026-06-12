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

const SECTION_COLORS = {
  s1: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', label: 'S1 — Plogger Foundation' },
  s2: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', label: 'S2 — Integrated Work' },
  s3: { bg: '#fffbeb', border: '#fde68a', text: '#92400e', label: 'S3 — Song Work' },
  s4: { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8', label: 'S4 — Free Play' },
  s5: { bg: '#f0fdfa', border: '#99f6e4', text: '#115e59', label: 'S5 — The Synthesizer' },
}

function SectionHeader({ section, week, time }: { section: keyof typeof SECTION_COLORS; week: number; time: string }) {
  const c = SECTION_COLORS[section]
  return (
    <div className="flex items-center gap-3 flex-wrap px-4 py-3 rounded-lg mb-4 mt-10" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.text }}>{c.label}</span>
      <span className="text-xs text-slate-500">Week {week}</span>
      <span className="ml-auto text-xs font-mono text-slate-500">{time}</span>
    </div>
  )
}

const WEEK_COLORS = {
  1: { bg: '#dbeafe', border: '#93c5fd', text: '#1e3a8a', label: 'Week 1 — First Contact' },
  2: { bg: '#dcfce7', border: '#86efac', text: '#14532d', label: 'Week 2 — Building Ears' },
  3: { bg: '#fef3c7', border: '#fcd34d', text: '#78350f', label: 'Week 3 — Consolidation' },
  4: { bg: '#f3e8ff', border: '#c084fc', text: '#581c87', label: 'Week 4 — Gate Approach' },
}

function WeekBanner({ week }: { week: 1 | 2 | 3 | 4 }) {
  const c = WEEK_COLORS[week]
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl mb-2 mt-14" style={{ background: c.bg, border: `2px solid ${c.border}` }}>
      <span className="text-xl font-black" style={{ color: c.text }}>{c.label}</span>
    </div>
  )
}

const PLAN_TOC = [
  { id: 'how-to-use', label: 'How to Use' },
  { id: 'daily-template', label: 'Daily Session Template' },
  { id: 'week1', label: 'Week 1 — First Contact' },
  { id: 'w1s1', label: '· S1 Plogger' },
  { id: 'w1s2', label: '· S2 Integrated' },
  { id: 'w1s3', label: '· S3 Song Work' },
  { id: 'w1s4', label: '· S4 Free Play' },
  { id: 'w1s5', label: '· S5 Synthesizer' },
  { id: 'week2', label: 'Week 2 — Building Ears' },
  { id: 'w2s1', label: '· S1 Plogger' },
  { id: 'w2s2', label: '· S2 Integrated' },
  { id: 'w2s3', label: '· S3 Song Work' },
  { id: 'w2s4', label: '· S4 Free Play' },
  { id: 'w2s5', label: '· S5 Synthesizer' },
  { id: 'week3', label: 'Week 3 — Consolidation' },
  { id: 'w3s1', label: '· S1 Plogger' },
  { id: 'w3s2', label: '· S2 Integrated' },
  { id: 'w3s3', label: '· S3 Song Work' },
  { id: 'w3s4', label: '· S4 Free Play' },
  { id: 'w3s5', label: '· S5 Synthesizer' },
  { id: 'week4', label: 'Week 4 — Gate Approach' },
  { id: 'w4s1', label: '· S1 Plogger' },
  { id: 'w4s2', label: '· S2 Integrated' },
  { id: 'w4s3', label: '· S3 Song Work' },
  { id: 'w4s4', label: '· S4 Free Play' },
  { id: 'w4s5', label: '· S5 Synthesizer' },
  { id: 'flexible', label: 'When to Advance' },
  { id: 'exit', label: 'Exit Assessment' },
]

const WORKBOOK_TOC = [
  { id: 'wb-intro', label: 'About the Workbook' },
  { id: 'wb1', label: 'Page 1 — Tracking Page' },
  { id: 'wb2', label: 'Page 2 — Ear Log' },
  { id: 'wb3', label: 'Page 3 — Guitar Map' },
  { id: 'wb4', label: 'Page 4 — Piano Map' },
  { id: 'wb5', label: 'Page 5 — Chord Map' },
  { id: 'wb6', label: 'Page 6 — Rhythm Grid' },
  { id: 'wb7', label: 'Page 7 — Self-Assessment' },
]

function TOCNav({ items }: { items: Array<{ id: string; label: string }> }) {
  return (
    <nav className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-4 text-sm">
      <p className="font-bold text-slate-500 uppercase tracking-wider text-xs mb-3">Contents</p>
      <ul className="space-y-1">
        {items.map(i => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={`block py-0.5 transition-colors hover:text-slate-900 ${i.label.startsWith('·') ? 'pl-3 text-xs text-slate-400 hover:text-slate-700' : 'text-slate-600 font-medium'}`}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function PracticePlanContent() {
  return (
    <div>
      {/* How to Use */}
      <H2 id="how-to-use">How to Use This Document</H2>
      <P>This document drives your daily practice. The textbook explains why every element exists. This document tells you <strong>what to do today</strong>.</P>
      <P><strong>Before your first session on any new concept:</strong> read the corresponding textbook section. You need the why before the what makes full sense. But do not let reading substitute for practice. The textbook is reference. This document is your operating manual.</P>
      <P><strong>The structure:</strong> Five sections, every day, same order. Total time: approximately 60 minutes. The timing is a guide — go slightly long on a section that is producing results, go slightly shorter on one that is not, but complete all five every session.</P>
      <div className="my-6 p-5 rounded-xl border border-amber-200 bg-amber-50">
        <p className="text-sm text-amber-900"><strong>Stage labels appear throughout.</strong> When this document says &ldquo;Week 1 is Stage 1 territory,&rdquo; it means errors are expected and correct. Do not stop because you are wrong. Wrong answers are data. Stage 2 means sometimes right. Stage 3 — which the gate requires — means always right at tempo without conscious attention. &ldquo;I can do it slowly&rdquo; is Stage 2. Do not mistake it for Stage 3.</p>
      </div>

      {/* Daily Session Template */}
      <H2 id="daily-template">The Daily Session — Sprint 1 Template</H2>
      <P>Every session follows this structure. The time allocations are specific to Sprint 1.</P>
      <Asset file="O4_daily_session_map.html" title="O4 — Sprint 1 Daily Session Map" height={420} />

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left py-2 px-3 font-bold text-slate-700">Section</th>
              <th className="text-left py-2 px-3 font-bold text-slate-700">Time</th>
              <th className="text-left py-2 px-3 font-bold text-slate-700">Sprint 1 Purpose</th>
            </tr>
          </thead>
          <tbody>
            {([
              { name: 'S1 — Plogger Foundation', time: '10 min', purpose: 'Isolated di-chord ear training: [3] and [4] only, Hear→Sing→Name workflow', color: SECTION_COLORS.s1.text },
              { name: 'S2 — Integrated Work', time: '18 min', purpose: 'Zone 1 location on both instruments + Rhythm Code grid introduction', color: SECTION_COLORS.s2.text },
              { name: 'S3 — Song Work', time: '14 min', purpose: 'Ain\'t No Sunshine — chords, simplified melody, feel the song', color: SECTION_COLORS.s3.text },
              { name: 'S4 — Free Play', time: '10 min', purpose: 'Zone 1 improvisation over Am — ear-led, no rules except stay in zone', color: SECTION_COLORS.s4.text },
              { name: 'S5 — The Synthesizer', time: '8 min', purpose: 'All four chambers simultaneously — melody, harmony, voicings, rhythm at once', color: SECTION_COLORS.s5.text },
            ]).map((row, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2 px-3 font-bold" style={{ color: row.color }}>{row.name}</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">{row.time}</td>
                <td className="py-2 px-3 text-slate-600">{row.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P><strong>The session runs front to back. Do not skip sections and do not reverse the order.</strong> S1 primes the ear. S2 connects ear to hands. S3 puts it in the song. S4 lets you own what you just practiced. S5 integrates everything. Each section feeds the next.</P>

      <Asset file="O3_hear_sing_name_cycle.html" title="O3 — Hear → Sing → Name Cycle (reference for every S1)" height={380} />

      <div className="my-6 p-4 rounded-lg border border-slate-200 bg-slate-50">
        <p className="text-sm font-bold text-slate-700 mb-2">Rules for every section, every session:</p>
        <ul className="space-y-1 text-sm text-slate-600">
          <li>• <strong>Hear it before you play it.</strong> If you are about to play a <BC>[3]</BC>, hear the interval in your head first.</li>
          <li>• <strong>Sing what you play.</strong> Not performance singing — quiet, under your breath is fine. The act of producing an interval with your voice encodes it differently.</li>
          <li>• <strong>Mistakes are data.</strong> Stop at them only long enough to register what went wrong. Then keep going.</li>
        </ul>
      </div>

      {/* ===== WEEK 1 ===== */}
      <WeekBanner week={1} />
      <div id="week1" className="scroll-mt-24" />
      <P><strong>Theme:</strong> Open your ears. Learn the system. First contact with everything.</P>
      <P><strong>What to expect:</strong> This week everything is Stage 1 — Discovering. You will make errors constantly on the di-chord discrimination. Your chord shapes will buzz and mute. You will lose track of the rhythm grid. This is exactly right. Do not rush past Stage 1.</P>
      <div className="my-4 p-4 rounded-lg border border-blue-200 bg-blue-50 text-sm text-blue-900">
        <strong>Before your first session this week:</strong> Read textbook Parts 1 (Musical OS — all of it), 4 (Voicings — guitar and piano sections), and 5 (Rhythm).
      </div>

      {/* W1 S1 */}
      <SectionHeader section="s1" week={1} time="10 min" />
      <div id="w1s1" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> First contact with <BC>[3]</BC> and <BC>[4]</BC> as distinct sounds. Establish the Hear→Sing→Name workflow as a habit.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card" height={380} />
      <Asset file="O3_hear_sing_name_cycle.html" title="O3 — Hear → Sing → Name Cycle" height={380} />

      <P><strong>What <BC>[3]</BC> and <BC>[4]</BC> sound like:</strong></P>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
        <li><BC>[3]</BC> is the minor third. Modal (smooth, flowing, ~4Hz pulsation), refers downward, non-harmonic (dark, closed). The two notes attract each other. Minor chords sound minor because of the <BC>[3]</BC> between root and third.</li>
        <li><BC>[4]</BC> is the major third. Same pulsation and shadow direction as <BC>[3]</BC> — they are twins in two of three properties. The only difference: <BC>[4]</BC> is harmonic (light, open). Notes push slightly apart — expanding. Major chords sound major because of the <BC>[4]</BC>.</li>
      </ul>

      <H3>Step-by-step for Week 1 S1</H3>
      <ol className="list-decimal pl-6 space-y-3 text-sm text-slate-700 mb-6">
        <li>Sit at the piano. Play <strong>A and C</strong> together. Let them ring for five seconds. Do not name it yet. Just receive the sound. Feel the closed, slightly heavy quality. That is <BC>[3]</BC>.</li>
        <li>Now play <strong>A and C#</strong> together. Let it ring for five seconds. Slightly more open, less contracted. That is <BC>[4]</BC>.</li>
        <li>Alternate back and forth five times, pausing five seconds on each. You are learning to recognize these sounds the way you learn to recognize two different voices.</li>
        <li><strong>Singing step:</strong> Play A alone. Sing C above it — the <BC>[3]</BC> above A. Find it by feel, by reaching upward until the interval feels contracted and minor.</li>
        <li>Play A alone again. Sing C# above it — the <BC>[4]</BC>. Slightly more open, brighter. The difference is small — C and C# are a half step apart — but the quality shifts noticeably.</li>
        <li><strong>Last 2 min:</strong> Alternate randomly. Play A, then play either C or C#. Identify <BC>[3]</BC> or <BC>[4]</BC> by sound alone. Then sing the interval back. Then name it. This is the Hear→Sing→Name sequence.</li>
      </ol>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <p className="text-xs font-bold text-green-800 mb-1">What &ldquo;good&rdquo; looks like</p>
          <p className="text-sm text-green-900">You are wrong sometimes. You confuse <BC>[3]</BC> and <BC>[4]</BC> and then hear the difference when you compare. You can sing both intervals imprecisely but recognizably. The workflow feels awkward but executable.</p>
        </div>
        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
          <p className="text-xs font-bold text-red-800 mb-1">What &ldquo;stuck&rdquo; looks like</p>
          <p className="text-sm text-red-900">You skip the hearing step and go straight to analyzing note names. Or you sing but do not listen to whether the interval quality matches. If you catch yourself skipping the five-second pause, slow down. The pause is the practice.</p>
        </div>
      </div>

      {/* W1 S2 */}
      <SectionHeader section="s2" week={1} time="18 min" />
      <div id="w1s2" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Locate Zone 1 notes (A, C, E) on both instruments. Understand the 8-position grid conceptually and feel it physically.</P>

      <H3>Exercise 1: Zone 1 Location (9 min)</H3>
      <P>Zone 1 for Am contains exactly three notes: A (root), C (third), E (fifth). Find these on both guitar and piano, play each one slowly, and sing the di-chord interval between them.</P>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <P><em>On guitar</em> — In the Am chord: string 5 open = A (root), string 4 at 2nd fret = E (fifth), string 3 at 2nd fret = A (root), string 2 at 1st fret = C (third), string 1 open = E (fifth). Do not play string 6.</P>
      <P>Play each string individually. Name the note. Then sing the di-chord interval between A and C (<BC>[3]</BC>), and between A and E (<BC>[7]</BC>). You do not own <BC>[7]</BC> yet — just hear it. The root-to-fifth interval is open and stable. Notice it, label it &ldquo;Zone 1 fifth,&rdquo; and keep moving.</P>

      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
      <P><em>On piano</em> — A is in the lower half of the keyboard (between G and B, white keys). C is easy to find — it is immediately to the left of the group of two black keys. E is two white keys to the right of C. Play A-C-E as a block chord. Then play each note individually and sing it.</P>

      <H3>Exercise 2: The 8-Position Grid (9 min)</H3>
      <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Rhythm Grid" height={580} />
      <P>The Rhythm Code grid divides each measure into 8 equal positions. Position 1 is beat one. Position 5 is beat three. The grid is binary — each position is either active (sound) or inactive (silence).</P>
      <P><strong>Week 1 grid exercise:</strong> Clap or tap positions 1 through 8 slowly. Say &ldquo;1-2-3-4-5-6-7-8&rdquo; aloud with each tap. Do this for 2 minutes.</P>
      <P>Then: tap only positions 1 and 5 — beat one and beat three. The other six positions are silent. Feel the gap. This is the skeleton of 4/4 time. Do this for 2 minutes.</P>
      <P>Then: while tapping 1 and 5, strum an Am chord on guitar (or play Am block chord on piano) on each tap. The strum replaces the clap. You are now playing rhythm in the grid. 5 minutes of this.</P>

      {/* W1 S3 */}
      <SectionHeader section="s3" week={1} time="14 min" />
      <div id="w1s3" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> First contact with Ain&rsquo;t No Sunshine. Learn the chords (Am, G, Em). Play them in sequence. No tempo pressure.</P>
      <P><strong>The three chords:</strong> Am (your home chord), G major (the first departure), Em (the second departure). All three live in the key of A minor. Every note in every chord belongs to Zone 1 of that chord.</P>
      <P><strong>This week&rsquo;s approach:</strong> Learn each chord shape on guitar (open position) and piano (Zone 1 block chord). Then play Am → G → Em → Am in sequence, one chord per measure, as slowly as needed. No strumming pattern — one strum per chord, let it ring for the full measure.</P>
      <P><em>Guitar chord sequence:</em> Am shape → G shape → Em shape → Am shape. The change from Am to G is the hardest (different hand shape). Practice that change in isolation: Am-G-Am-G, one second each, until your hand can find both shapes without looking.</P>
      <P><em>Piano chord sequence:</em> A-C-E block → G-B-D block → E-G-B block → A-C-E block. Right hand plays all three notes at once. Left hand plays the root note (A, G, E, A).</P>

      {/* W1 S4 */}
      <SectionHeader section="s4" week={1} time="10 min" />
      <div id="w1s4" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Zone 1 improvisation over Am — play only A, C, and E in any order.</P>
      <P>On guitar: strum or pick the Am chord and then play individual notes from Zone 1. Move between A, C, and E freely. There is no melody to learn — you are exploring the space.</P>
      <P>On piano: left hand holds down A (or plays A repeatedly as a pulse). Right hand moves between A, C, and E in any pattern. Sing along with whatever note your right hand is playing.</P>
      <P><strong>The only rule:</strong> stay in Zone 1. If you accidentally play a note that is not A, C, or E, notice it (it will sound different — outside the zone) and return. No penalty, no restart. Just return to Zone 1.</P>

      {/* W1 S5 */}
      <SectionHeader section="s5" week={1} time="8 min" />
      <div id="w1s5" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> First attempt at all four chambers simultaneously. It will be messy. That is the point.</P>
      <P>Play the Am → G → Em → Am chord loop on guitar (or piano). While playing:</P>
      <ul className="list-disc pl-6 space-y-1 text-slate-700 mb-4 text-sm">
        <li><strong>Melody (Chamber 1):</strong> Hum the root note of whatever chord you are playing. Am → hum A. G → hum G. Em → hum E.</li>
        <li><strong>Harmony (Chamber 2):</strong> As each chord arrives, say its name: &ldquo;Am... G... Em...&rdquo;</li>
        <li><strong>Voicings (Chamber 3):</strong> Play the chord shapes you have been learning.</li>
        <li><strong>Rhythm (Chamber 4):</strong> Feel the pulse. Position 1 of each measure should feel heavier than the others.</li>
      </ul>
      <P><strong>All four chambers are running at once.</strong> This is The Synthesizer — the moment of integration. It will feel like too much. Run it anyway. Eight minutes. Do not stop.</P>
      <div className="my-4 p-4 rounded-lg border border-teal-200 bg-teal-50 text-sm text-teal-900">
        <strong>What &ldquo;good&rdquo; looks like this week:</strong> You are doing all four things imperfectly at once. Chords buzzy, humming off pitch, rhythm unsteady. This is Stage 1 of synthesis. It is correct.
      </div>

      {/* ===== WEEK 2 ===== */}
      <WeekBanner week={2} />
      <div id="week2" className="scroll-mt-24" />
      <P><strong>Theme:</strong> <BC>[3]</BC> and <BC>[4]</BC> becoming reliable. Ain&rsquo;t No Sunshine starting to feel like music, not exercises.</P>
      <P><strong>What to expect:</strong> By the end of Week 2, you should be getting <BC>[3]</BC> vs. <BC>[4]</BC> right most of the time (15/20 or better on the tracking log). Guitar chord changes should happen without stopping. The 8-position grid should be physically internalized.</P>

      {/* W2 S1 */}
      <SectionHeader section="s1" week={2} time="10 min" />
      <div id="w2s1" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Move from &ldquo;sometimes distinguishing&rdquo; to &ldquo;usually distinguishing&rdquo; <BC>[3]</BC> vs. <BC>[4]</BC>. Run 20 formal trials per session and track your score.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (keep visible)" height={380} />

      <H3>How to run 20 trials (use Workbook Page 2)</H3>
      <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700 mb-6">
        <li>Sit at the piano. Have your workbook open to the Di-Chord Ear Log.</li>
        <li>Each trial: play two notes simultaneously — either A and C (<BC>[3]</BC>) or A and C# (<BC>[4]</BC>). Choose randomly.</li>
        <li>Before naming it: hear it for three seconds. Let the quality register.</li>
        <li>Name it: &ldquo;<BC>[3]</BC>&rdquo; or &ldquo;<BC>[4]</BC>.&rdquo;</li>
        <li>Then look at what you actually played. Record: correct or incorrect.</li>
        <li>Do not adjust your playing to be more &ldquo;fair.&rdquo; 20 trials, not 10 of each.</li>
      </ol>

      <div className="my-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
        <p className="text-sm font-bold text-slate-700 mb-2">What the scores mean:</p>
        <ul className="space-y-1 text-sm text-slate-600">
          <li><strong>10/20 or below:</strong> You are guessing. Take five full seconds to hear before naming.</li>
          <li><strong>11–14/20:</strong> Beginning to hear. Normal Stage 2 for early Week 2.</li>
          <li><strong>15–18/20:</strong> Good progress. Stage 2 solidifying.</li>
          <li><strong>19–20/20:</strong> Stage 3 approaching. Run three days in a row at 19–20 before trusting it.</li>
        </ul>
      </div>

      <Asset file="R2_pictograph_reference.html" title="R2 — Full Pictograph Reference (added this week)" height={600} />
      <P><strong>Adding the Pictograph this week:</strong> After your 20 trials, spend 2 minutes on the Pictograph. Draw the glyph for <BC>[3]</BC>: rounded outline (smooth, modal pulsation), shadow to the left, filled dark (non-harmonic, closed). Then draw the glyph for <BC>[4]</BC>: rounded outline, shadow to the left, but light (harmonic, open). The only difference between the two pictographs is the color.</P>

      {/* W2 S2 */}
      <SectionHeader section="s2" week={2} time="18 min" />
      <div id="w2s2" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Both instruments simultaneously. Zone 1 on guitar while finding the same notes on piano. Begin mapping the Ain&rsquo;t No Sunshine rhythm to the 8-position grid.</P>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />

      <H3>Exercise 1: Zone 1 Across Both Instruments (9 min)</H3>
      <P>Play A on the guitar&rsquo;s open 5th string. While it rings, find A on the piano. Play them at the same time. The note is the same. The instrument is different. The di-chord is neither guitar nor piano — it is the pitch relationship itself.</P>
      <P>After doing A, C, E individually, play the Zone 1 sequence on guitar (A-C-E ascending) and follow with your piano hand one note behind: call-and-response between instruments. Then reverse: piano leads, guitar follows.</P>
      <P>Finally: play Am as a chord on both instruments simultaneously. Listen to the total sound.</P>

      <H3>Exercise 2: Mapping the &ldquo;I Know&rdquo; Section to the Grid (9 min)</H3>
      <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Grid" height={580} />
      <P>Draw eight boxes in a row — your 8-position grid. The &ldquo;I know&rdquo; section: position 1 is active (the &ldquo;I&rdquo; syllable), positions 2–8 are silent, then position 1 of the next measure is active again (&ldquo;know&rdquo;).</P>
      <P>Play Am on guitar or piano. Strike once on position 1. Count silently through 2–8. Land cleanly on position 1 of the next measure.</P>
      <P><strong>Variation:</strong> anticipate position 1 by landing on position 8 of the previous measure. Feel the difference: landing on 1 feels declarative; landing on 8 feels like leaning in — forward momentum.</P>

      {/* W2 S3 */}
      <SectionHeader section="s3" week={2} time="14 min" />
      <div id="w2s3" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Add a basic strumming pattern on guitar. Aim for clean chord changes, two per measure.</P>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine Analysis Sheet" height={700} />

      <P><strong>The basic strumming pattern:</strong> Down strums on positions 1 and 5 — beat one and beat three. Two downstrokes per measure. This is the skeleton of almost every 4/4 groove.</P>
      <P><em>Days 1–2:</em> Guitar only. Am-G-Em loop with down strums on 1 and 5. The chord change should happen before the strum — have your hand already in shape before strumming.</P>
      <P><em>Days 3–4:</em> Play along with a recording. When you lose your place, do not restart — wait, find beat one, and re-enter. Losing your place and re-entering is more valuable than stopping to restart cleanly.</P>
      <P><em>Day 5:</em> Piano only. Left hand plays root note on beat one. Right hand plays Zone 1 of the current chord. Strike and hold. Move to the next chord when the music moves.</P>

      <div className="my-6 overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead><tr className="border-b-2 border-slate-300"><th className="py-2 px-3 text-left text-slate-700">Chord</th><th className="py-2 px-3 text-left text-slate-700">Root (left hand)</th><th className="py-2 px-3 text-left text-slate-700">Zone 1 right hand</th></tr></thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-3">Am</td><td className="py-2 px-3">A</td><td className="py-2 px-3">A – C – E</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-3">G</td><td className="py-2 px-3">G</td><td className="py-2 px-3">G – B – D</td></tr>
            <tr><td className="py-2 px-3">Em</td><td className="py-2 px-3">E</td><td className="py-2 px-3">E – G – B</td></tr>
          </tbody>
        </table>
      </div>

      {/* W2 S4 */}
      <SectionHeader section="s4" week={2} time="10 min" />
      <div id="w2s4" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Zone 1 improvisation over Am-G-Em vamp, with singing.</P>
      <P>Improvise using only Zone 1 notes. But this week, <strong>do not stay on Am&rsquo;s Zone 1 when the chord changes.</strong> When G arrives (G-B-D), move to G&rsquo;s Zone 1 notes. When Em arrives (E-G-B), move to Em&rsquo;s Zone 1.</P>
      <P><strong>Sing what you play.</strong> Every note on the instrument, produce the same pitch with your voice. If they diverge, you will hear it — and that discrepancy is the ear training.</P>

      {/* W2 S5 */}
      <SectionHeader section="s5" week={2} time="8 min" />
      <div id="w2s5" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Synthesis with root movement naming. As each chord arrives, say the root movement from the previous chord.</P>
      <P>The root movements in the Ain&rsquo;t No Sunshine loop:</P>
      <ul className="list-disc pl-6 space-y-1 text-slate-700 mb-4 text-sm">
        <li><strong>Am to G:</strong> root moves A down to G — a <BC>[2]</BC> (whole step down).</li>
        <li><strong>G to Em:</strong> root moves G down to E — a <BC>[3]</BC> (minor third down). You know <BC>[3]</BC>.</li>
        <li><strong>Em to Am:</strong> root moves E up to A — a <BC>[5]</BC> (perfect fourth up).</li>
      </ul>
      <P>You do not own these movements yet. Sprint 1 is orientation. When Am arrives, say &ldquo;Am.&rdquo; When G arrives, say &ldquo;G... that was a step down.&rdquo; Do not stress about being correct — you are noticing, not testing.</P>

      {/* ===== WEEK 3 ===== */}
      <WeekBanner week={3} />
      <div id="week3" className="scroll-mt-24" />
      <P><strong>Theme:</strong> Stage 2 solidifying toward Stage 3. <BC>[3]</BC>/<BC>[4]</BC> discrimination should be 18/20 or better. Ain&rsquo;t No Sunshine should be playable on both instruments in simplified form.</P>
      <P><strong>What to expect:</strong> This week the work gets harder because the standards go up. Week 1 asked for first contact. Week 2 asked for progress. Week 3 asks for <strong>consistency</strong>.</P>

      {/* W3 S1 */}
      <SectionHeader section="s1" week={3} time="10 min" />
      <div id="w3s1" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> <BC>[3]</BC> and <BC>[4]</BC> in melodic context. Find them inside a major scale.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card" height={380} />

      <H3>The <BC>[3]</BC> and <BC>[4]</BC> inside a major scale</H3>
      <P>Play C major on piano: C-D-E-F-G-A-B-C. Play C and E together — that is <BC>[4]</BC> (major third). Play C and Eb — that is <BC>[3]</BC> (minor third).</P>
      <P>Play E and G together (both white keys). That is <BC>[3]</BC>. The major triad contains both: a <BC>[4]</BC> from root to 3rd, and a <BC>[3]</BC> from 3rd to 5th.</P>
      <P><strong>Minor chord inversion:</strong> Am contains <BC>[3]</BC> from root to 3rd (A→C), and <BC>[4]</BC> from 3rd to 5th (C→E). The minor chord is the inversion of the major chord&rsquo;s di-chord order.</P>

      <H3>This week&rsquo;s S1 exercise (7 min)</H3>
      <P>Play a note on piano — any white key. Sing the <BC>[4]</BC> above it. Play and check. Now sing the <BC>[3]</BC> above the same note. Play and check. Do this from five different starting notes.</P>
      <P>Then reverse: play a note. Sing the <BC>[3]</BC> below it, then the <BC>[4]</BC> below it. Check by playing.</P>
      <P><strong>Target: 18/20.</strong> If below 15, spend 8 of 10 minutes on pure listening without naming, and run only 10 trials.</P>

      {/* W3 S2 */}
      <SectionHeader section="s2" week={3} time="18 min" />
      <div id="w3s2" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Both instruments simultaneously — guitar chord while piano melody, or vice versa.</P>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />

      <H3>Exercise 1: Guitar Chord + Piano Melody (9 min)</H3>
      <P>Play Am chord on guitar with your left hand. While it rings, play Zone 1 melody (A-C-E in sequence) with your right hand on piano. You are holding a guitar chord shape with one side of your body and moving through piano melody with the other.</P>
      <P>Change to G → right hand finds G-B-D. Change to Em → right hand finds E-G-B.</P>
      <P>If this physical setup is not possible, alternate: 4 minutes of guitar chord + voice singing Zone 1 melody, then switch to piano chord with melody.</P>

      <H3>Exercise 2: Full Song Integration (9 min)</H3>
      <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Grid" height={580} />
      <P><em>First pass (4 min):</em> Guitar. Chord changes with your Week 2 strumming pattern. No stopping. All the way through verse and &ldquo;I know&rdquo; section.</P>
      <P><em>Second pass (4 min):</em> Piano. Left hand roots, right hand Zone 1 melody. Simplified and real.</P>
      <P><em>One minute between passes:</em> name what felt Stage 2 on guitar, what felt Stage 2 on piano. Write it in your workbook. Those are your drill targets for tomorrow.</P>

      {/* W3 S3 */}
      <SectionHeader section="s3" week={3} time="14 min" />
      <div id="w3s3" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Ain&rsquo;t No Sunshine on both instruments at simplified but playable level. The song should start to feel musical.</P>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine Analysis Sheet" height={700} />

      <P><strong>Guitar — add the forward strum:</strong> a light upstroke on position 6 in addition to downstrokes on 1 and 5. This creates a &ldquo;down-down-up&rdquo; feel:</P>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-1">
        <li>Position 1: down strum (strong)</li>
        <li>Position 5: down strum (medium)</li>
        <li>Position 6: up strum (light — just brush the top two or three strings)</li>
      </ul>
      <P>Play the entire song without stopping. When you make a mistake, keep the pulse alive and re-enter.</P>

      <P><strong>Piano:</strong> Left hand plays root on beat one (possibly beat three). Right hand plays one to two Zone 1 notes — not chords, just the top note of each chord. Play start to finish without stopping.</P>
      <div className="my-4 p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-900">
        <strong>Week 3 standard:</strong> You should be able to play the song on both instruments in a single session with no complete stops. Mistakes are fine. Stopping is not.
      </div>

      {/* W3 S4 */}
      <SectionHeader section="s4" week={3} time="10 min" />
      <div id="w3s4" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Both instruments if possible. Alternate every 2 minutes if not.</P>
      <P>Zone 1 improvisation over the Am-G-Em loop, but this week:</P>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-1">
        <li><strong>Guitar:</strong> find Zone 1 notes in more than one position. A at the 5th fret of the low E string. E at open 1st and 4th strings. C at the 5th fret of the 3rd string.</li>
        <li><strong>Piano:</strong> move Zone 1 notes to a higher octave. Same quality, different register.</li>
      </ul>
      <P>Sing what you play. Track the harmony by ear — let the chord change guide your note choice, not your predetermined plan.</P>

      {/* W3 S5 */}
      <SectionHeader section="s5" week={3} time="8 min" />
      <div id="w3s5" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Full synthesis — all four chambers simultaneously for 8 minutes without interruption.</P>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-1">
        <li><strong>Melody (Chamber 1):</strong> Play Zone 1 notes with one hand (or voice). Improvise from Zone 1 of whatever chord is playing.</li>
        <li><strong>Harmony (Chamber 2):</strong> Name each chord aloud as it arrives. Include root movement if you can hear it.</li>
        <li><strong>Voicings (Chamber 3):</strong> The other hand plays chord shapes.</li>
        <li><strong>Rhythm (Chamber 4):</strong> Feel the 8-position grid. Positions 1 and 5 are the anchors.</li>
      </ul>
      <P>Run 8 minutes. No stopping. The synthesis degrades gracefully; it does not collapse. If you lose the melody, keep the harmony going. If you lose the chord, keep the rhythm.</P>

      {/* ===== WEEK 4 ===== */}
      <WeekBanner week={4} />
      <div id="week4" className="scroll-mt-24" />
      <P><strong>Theme:</strong> Are you ready? Honest self-assessment toward Stage 3. This week stress-tests what you think you own.</P>
      <P><strong>What to expect:</strong> Week 4 is not a harder practice week — it is an <strong>honest</strong> practice week. You are doing the things you have been doing, but in new contexts, under mild pressure, and in a different key. Genuine Stage 3 means it works anywhere.</P>

      {/* W4 S1 */}
      <SectionHeader section="s1" week={4} time="10 min" />
      <div id="w4s1" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> <BC>[3]</BC> and <BC>[4]</BC> in random musical context — active listening in real music.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (gate standard)" height={380} />

      <P><strong>The exercise:</strong> Put on a song you do not know well. Listen for thirty seconds. Can you identify any moment where the melody moves by a minor third (<BC>[3]</BC>) or a major third (<BC>[4]</BC>)?</P>
      <P>You are not counting semitones. You are listening for the quality: the rounded, smooth character of both <BC>[3]</BC> and <BC>[4]</BC> compared to the step-like quality of <BC>[2]</BC> or the wide-open quality of <BC>[7]</BC>.</P>
      <div className="my-4 p-4 rounded-lg border border-purple-200 bg-purple-50 text-sm text-purple-900">
        <strong>Why this matters:</strong> Stage 3 means &ldquo;can be identified by ear in a song in real time, without preparation.&rdquo; This exercise is the Stage 3 stress test. If you can only identify <BC>[3]</BC> and <BC>[4]</BC> in a controlled piano exercise, that is Stage 2.
      </div>
      <P>After 6 minutes of active listening, run your 20-trial discrimination log. <strong>Week 4 target: 19–20/20.</strong></P>

      {/* W4 S2 */}
      <SectionHeader section="s2" week={4} time="18 min" />
      <div id="w4s2" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Transpose. Everything you have done in Am, now try in Dm.</P>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />

      <P><strong>Dm Zone 1:</strong> D (root), F (third), A (fifth)</P>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-1">
        <li><em>Guitar:</em> open 4th string = D (root); 2nd fret 3rd string = A (fifth); 1st fret 1st string = F (third).</li>
        <li><em>Piano:</em> D is two white keys above C. F is two above D. A is four above F. Play D-F-A as a block chord.</li>
      </ul>

      <H3>Exercise 1: Zone 1 in Dm (9 min)</H3>
      <P>Find D, F, A on both instruments. Play D and F together — that is <BC>[3]</BC>, the same minor-third quality, now from D instead of A. Play D and A — that is <BC>[7]</BC>. Sing D-F-A ascending. The minor quality is the same regardless of starting note.</P>

      <H3>Exercise 2: Ain&rsquo;t No Sunshine-style loop in Dm (9 min)</H3>
      <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Grid" height={580} />
      <P>Create a Dm-C-Am loop (equivalent of Am-G-Em in D minor). Play it the same way. Zone 1 improvise over it.</P>
      <P>You will be slow and uncertain in Dm. This is correct. Transposing puts the skill back to Stage 2 temporarily. The question is: how quickly does it stabilize? If you find Zone 1 in Dm within five minutes, you are genuinely close to Stage 3.</P>

      {/* W4 S3 */}
      <SectionHeader section="s3" week={4} time="14 min" />
      <div id="w4s3" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> Perform Ain&rsquo;t No Sunshine. Play it like someone is listening.</P>
      <P><strong>The standard:</strong> Start to finish, no stopping for mistakes, correct chords, recognizable rhythm, present with the music.</P>
      <P>Play it once on guitar. All the way through. Mistakes are survivable — keep the pulse alive. Then play it once on piano. Same standard.</P>
      <P>After each pass, note <strong>where you felt the song</strong>. Not what went wrong technically — where did the framework disappear? Where did you stop thinking and start listening? That moment is the north star.</P>
      <P>If there was no such moment, play a third time on whichever instrument felt closer. Chase the moment where playing becomes music rather than execution.</P>

      {/* W4 S4 */}
      <SectionHeader section="s4" week={4} time="10 min" />
      <div id="w4s4" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> No Am. No familiar key. Pick a different minor key and find Zone 1 from scratch.</P>
      <P>Choose any note that is not A as your tonic. E minor, B minor, C minor, F minor — any of them. Do not choose Dm because you just worked in it during S2.</P>
      <P>Find the root, third, and fifth. The minor third is a <BC>[3]</BC> (three semitones) above the root. The fifth is a <BC>[7]</BC> (seven semitones) above the root. Locate these by interval, not by memorizing note names.</P>
      <P>Once you have Zone 1 in your new key, improvise freely using only those three notes. Listen to the minor quality — <BC>[3]</BC> between root and third — and confirm that it sounds like minor. Same property, new starting point.</P>

      {/* W4 S5 */}
      <SectionHeader section="s5" week={4} time="8 min" />
      <div id="w4s5" className="scroll-mt-24" />
      <P><strong>Objective this week:</strong> The real synthesis. No scaffolding.</P>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine (synthesis reference)" height={700} />
      <P>Do not play the Am loop. Do not play a chord you have rehearsed. Pick up whichever instrument you feel most connected to today, and <strong>play music for 8 minutes</strong>.</P>
      <P>The only constraint: use only what you own. Di-chords you can hear. Zone 1 notes you can locate. Rhythmic feel you have internalized. If you reach for something Stage 2, pull back to something Stage 3.</P>
      <P>All four chambers running. Melody. Harmony. Voicings. Rhythm. Not separately — simultaneously, as they naturally exist in music.</P>
      <P><strong>No stopping. No evaluation during the 8 minutes.</strong> After: sit quietly for 30 seconds and notice what it felt like.</P>

      {/* Flexible Sprint Duration */}
      <H2 id="flexible">Flexible Sprint Duration — When to Advance</H2>
      <P>Sprint 1 typically takes 3 to 5 weeks. Some students clear both gates in 3 weeks. Some take 6. Both are correct outcomes. A student who takes 6 weeks because they genuinely own Stage 3 is doing better than one who moves in 3 weeks with Stage 2 work declared as Stage 3.</P>
      <P><strong>The honest question:</strong> Do not ask &ldquo;have I done the exercises?&rdquo; Ask &ldquo;do I own the skill?&rdquo;</P>

      <H3>Plogger gate self-check</H3>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-2">
        <li>If I am in a coffee shop and a song comes on, can I hear whether the first interval is a <BC>[3]</BC> or <BC>[4]</BC>? Not after concentrating — immediately, automatically?</li>
        <li>If someone plays a minor third on a piano in the next room, do I recognize it?</li>
        <li>Can I sing a <BC>[3]</BC> from any pitch on demand, without a reference instrument?</li>
        <li>Can I draw the Pictograph for <BC>[3]</BC> and <BC>[4]</BC> from memory, including the three visual properties?</li>
      </ul>
      <P>If all four are yes: you are at Stage 3 on the Plogger gate.</P>

      <H3>Performance gate self-check</H3>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-2">
        <li>Can I play Ain&rsquo;t No Sunshine on guitar, start to finish, without stopping, in a way that sounds like the song?</li>
        <li>Can I play it on piano at the same standard?</li>
        <li>Can I sing the root of each chord while playing?</li>
        <li>If someone plays a melody from the song, can I identify the Zone 1 note without preparation?</li>
      </ul>
      <P>If all four are yes: you are at Stage 3 on the performance gate.</P>

      <H3>What to do if you are stuck</H3>
      <div className="space-y-3 my-6">
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm">
          <p className="font-bold text-slate-700 mb-1"><BC>[3]</BC>/<BC>[4]</BC> plateaued at 14–16/20 after three weeks?</p>
          <p className="text-slate-600">The problem is almost certainly in the hearing step — you are naming before you have truly heard. Fix: extend listening pause to ten seconds before naming.</p>
        </div>
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm">
          <p className="font-bold text-slate-700 mb-1">Ain&rsquo;t No Sunshine still stopping on chord changes?</p>
          <p className="text-slate-600">The chord shapes are not ready before the change arrives. Fix: practice changes in isolation without the song (Am to G, G to Em loop) until the change takes less than one beat.</p>
        </div>
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm">
          <p className="font-bold text-slate-700 mb-1">The Synthesizer falls apart?</p>
          <p className="text-slate-600">The problem is not synthesis failure — it is that one component skill is Stage 2 masquerading as Stage 3. Run the self-checks again, honestly.</p>
        </div>
      </div>

      {/* Exit Assessment */}
      <H2 id="exit">Sprint 1 Exit Assessment</H2>
      <P>The gate is two parts. Both must be cleared <strong>in the same session, without warm-up</strong>, to count. &ldquo;I can do it when I practice&rdquo; is Stage 2. The gate is Stage 3: without preparation, first attempt, at musical tempo.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (assessment standard)" height={380} />

      <H3>Gate B — Plogger Chapter 1–3 Mastery</H3>
      <P><strong>Trial set 1 — Discrimination (10 trials):</strong> Random mix of <BC>[3]</BC> and <BC>[4]</BC> from different roots. Name each after hearing. Required: <strong>10/10.</strong></P>
      <P><strong>Trial set 2 — Singing <BC>[3]</BC> from 5 pitches:</strong> From each pitch, sing the minor third above. Accuracy: within a half step without a reference instrument. <strong>4/5 required.</strong></P>
      <P><strong>Trial set 3 — Singing <BC>[4]</BC> from 5 pitches:</strong> Same exercise, major third. <strong>4/5 required.</strong></P>
      <P><strong>Trial set 4 — Real-time identification (10 trials):</strong> A short melody is played. After each step, identify <BC>[3]</BC>, <BC>[4]</BC>, or &ldquo;other.&rdquo; Required: <strong>10/10</strong> on intervals that contain <BC>[3]</BC> or <BC>[4]</BC>.</P>

      <H3>Performance Gate — Ain&rsquo;t No Sunshine</H3>
      <P><strong>Standard:</strong> Simplified but musical. Not performance-ready by professional standard — but recognizable, continuous, and alive.</P>
      <div className="space-y-3 my-6">
        {[
          ['Test 1 — Guitar', 'Play start to finish: correct chords in correct order, recognizable rhythmic feel, no complete stops, including the "I know" section. Pass: someone who knows the song would recognize it.'],
          ['Test 2 — Piano', 'Start to finish: left hand root notes on beat one, right hand Zone 1 notes or simplified melody. Correct changes, no complete stops. Same recognition standard.'],
          ['Test 3 — Root singing', 'Play any chord from the song. While playing, sing the root. Change to the next chord, sing its root. Within a half step. All three chords: Am (A), G (G), Em (E).'],
          ['Test 4 — Ear ID', 'Someone plays a two-note melody fragment from Am. Identify which Zone 1 note it started on: root (A), third (C), or fifth (E). Required: 3 out of 4 correct.'],
        ].map(([title, desc], i) => (
          <div key={i} className="p-4 rounded-lg border border-slate-200 bg-white text-sm">
            <p className="font-bold text-slate-700 mb-1">{title}</p>
            <p className="text-slate-600">{desc}</p>
          </div>
        ))}
      </div>

      <div className="my-8 p-5 rounded-xl border-2 border-teal-300 bg-teal-50">
        <p className="text-sm font-bold text-teal-900">Sprint 1 is complete when: Gate B passes AND all four performance tests pass, in the same session, without warm-up. On the same day.</p>
        <p className="text-sm text-teal-800 mt-2">When both gates are clear: you are ready for <strong>Sprint 2 — The Resolution: <BC>[5]</BC></strong>.</p>
      </div>
    </div>
  )
}

function WorkbookContent() {
  return (
    <div>
      <H2 id="wb-intro">About the Workbook</H2>
      <P>Print these pages or copy them into a practice notebook. Fill them in by hand during and after practice sessions. The physical act of writing reinforces retention.</P>

      {/* Page 1 */}
      <H2 id="wb1">Page 1 — Weekly Tracking Page</H2>
      <P><strong>Purpose:</strong> Log what you hear outside your practice sessions. Di-chords appear in music everywhere. This page trains you to notice them.</P>
      <P><strong>How to use:</strong> Every day, as you go about your life — music in a store, a song in your car, a melody someone hums — listen for <BC>[3]</BC> and <BC>[4]</BC>. When you hear something, log it. Three entries per day is the target. One is fine. Zero means you were not listening outside practice.</P>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 py-2 px-3 text-left">Date</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Song / Source</th>
              <th className="border border-slate-300 py-2 px-3 text-left">What I Heard</th>
              <th className="border border-slate-300 py-2 px-3 text-left">My Bracket Name</th>
              <th className="border border-slate-300 py-2 px-3 text-left">Confidence (1–3)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 14 }, (_, i) => (
              <tr key={i}>
                <td className="border border-slate-200 py-3 px-3">&nbsp;</td>
                <td className="border border-slate-200 py-3 px-3">&nbsp;</td>
                <td className="border border-slate-200 py-3 px-3">&nbsp;</td>
                <td className="border border-slate-200 py-3 px-3">&nbsp;</td>
                <td className="border border-slate-200 py-3 px-3">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500 mb-4"><em>Confidence: 1 = guessing, 2 = pretty sure, 3 = certain. Copy this page for each week.</em></p>

      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
        <p><strong>End of week:</strong> Count your Confidence 3 entries: ___ / ___</p>
        <p>Most frequently heard di-chord this week: [___]</p>
        <p>Hardest to identify this week: [___] — Why? ___</p>
      </div>

      {/* Page 2 */}
      <H2 id="wb2">Page 2 — Di-Chord Ear Log: <BC>[3]</BC> and <BC>[4]</BC></H2>
      <P><strong>Purpose:</strong> Formal 20-trial discrimination tracking. Run once per S1 session from Week 2 onward.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (sidebar reference)" height={380} />

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 py-1.5 px-2 text-center w-12">Trial</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Root Note</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Interval Played</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">My Answer</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center">Correct?</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 20 }, (_, i) => (
              <tr key={i}>
                <td className="border border-slate-200 py-2 px-2 text-center text-xs text-slate-400">{i + 1}</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm">
        <p className="font-bold text-slate-700">SCORE: ___ / 20</p>
        <div className="mt-2 space-y-1 text-slate-600">
          <p>10 or below — Stage 1 (extend listening time)</p>
          <p>11–14 — Stage 1/2 transition</p>
          <p>15–18 — Stage 2 (keep drilling)</p>
          <p>19–20 — Stage 3 approaching (confirm three days in a row)</p>
        </div>
        <p className="mt-3 text-slate-700"><strong>Pattern in errors:</strong> ___</p>
        <p className="text-slate-700"><strong>Rushing the hearing step?</strong> Y / N</p>
      </div>

      {/* Page 3 */}
      <H2 id="wb3">Page 3 — Zone 1 Map: Guitar</H2>
      <P><strong>Purpose:</strong> Know where A, C, and E live on the neck — not just in the Am chord, but across the full fretboard.</P>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard (fill-in template)" height={480} />
      <P>The grid represents the guitar neck, frets 0 (open) through 7. Fill in the blanks, then <strong>circle every A, C, and E</strong> you find. Check your work by playing each location.</P>

      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`         Open   Fret 1   Fret 2   Fret 3   Fret 4   Fret 5   Fret 7
String 6:  E      F       _____     G       _____     A       B
String 5:  A     _____     B        C       _____     D       E
String 4:  D     _____     E        F       _____     G       A
String 3:  G      Ab      _____     A#       B       _____    D
String 2:  B      C       _____     D       _____     E       F#
String 1:  E      F       _____     G       _____     A       B`}</pre>
      </div>

      <P><strong>Zone 1 notes for Am: A, C, E.</strong> Circle every A, C, and E you have filled in.</P>
      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
        <p>A locations (should find 4+): ___</p>
        <p>C locations (should find 3+): ___</p>
        <p>E locations (should find 4+): ___</p>
        <p className="mt-2"><strong>Self-test:</strong> Play Am open chord. Without looking at this page, name the Zone 1 note on each string.</p>
      </div>

      {/* Page 4 */}
      <H2 id="wb4">Page 4 — Zone 1 Map: Piano</H2>
      <P><strong>Purpose:</strong> See Zone 1 notes as visual spans on the keyboard.</P>
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard (fill-in template)" height={400} />

      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`         W  B  W  B  W  W  B  W  B  W  B  W
         |  |  |  |  |  |  |  |  |  |  |  |
         C  Db D  Eb E  F  Gb G  Ab A  Bb B
         |     |     |  |     |     |     |

(W = white key, B = black key)`}</pre>
      </div>

      <P><strong>Zone 1 for Am — circle: A, C, E</strong></P>
      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700">
        <p>Root to 3rd (A to C): ___ semitones — this is a [___]</p>
        <p>3rd to 5th (C to E): ___ semitones — this is a [___]</p>
        <p>Root to 5th (A to E): ___ semitones — this is a [___]</p>
      </div>

      <H3>Zone 1 for G and Em</H3>
      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 space-y-2">
        <p><strong>G:</strong> Root = G. Third = ___ (4 semitones up). Fifth = ___ (7 semitones from G). Zone 1: ___ – ___ – ___</p>
        <p><strong>Em:</strong> Root = E. Third = ___ (3 semitones up). Fifth = ___ (7 semitones from E). Zone 1: ___ – ___ – ___</p>
        <p className="mt-3"><strong>Notice:</strong> Em and Am share two Zone 1 notes. Which ones? ___</p>
        <p><strong>Why does this matter?</strong> When you move from Am to Em, ___ of the melody notes that worked over Am will also work over Em.</p>
      </div>

      {/* Page 5 */}
      <H2 id="wb5">Page 5 — Ain&rsquo;t No Sunshine Chord Map</H2>
      <P><strong>Purpose:</strong> Map the harmonic progression measure by measure, with root movement analysis and Zone 1 melody tracking.</P>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine Analysis (fill-in template)" height={700} />

      <H3>Verse Section — Chord Map</H3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 py-1.5 px-2 text-center w-16">Measure</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Chord</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Root</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Root Movement</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Di-Chord</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Melody Note</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Am', 'A', '(opening)', '—'],
              ['2', 'Am', 'A', 'same chord', '—'],
              ['3', 'G', 'G', 'A down to G', '[2]'],
              ['4', 'Em', 'E', 'G down to E', '___?'],
              ['5', 'Am', 'A', 'E up to A', '___?'],
              ['6', 'Am', 'A', 'same chord', '—'],
              ['7', 'G', 'G', 'A down to G', '[2]'],
              ['8', 'Am', 'A', 'G up to A', '___?'],
            ].map(([m, chord, root, movement, dc], i) => (
              <tr key={i}>
                <td className="border border-slate-200 py-2 px-2 text-center">{m}</td>
                <td className="border border-slate-200 py-2 px-2 font-bold">{chord}</td>
                <td className="border border-slate-200 py-2 px-2">{root}</td>
                <td className="border border-slate-200 py-2 px-2 text-xs">{movement}</td>
                <td className="border border-slate-200 py-2 px-2">{dc}</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>&ldquo;I Know&rdquo; Section — Stop-Time Grid</H3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 py-1.5 px-2 text-center">&ldquo;I know&rdquo; #</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Landing Position</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Chord</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Note I&rsquo;m Singing</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Stop Length</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5,6].map(n => (
              <tr key={n}>
                <td className="border border-slate-200 py-2 px-2 text-center">{n}</td>
                <td className="border border-slate-200 py-2 px-2">{n === 1 ? 'Position 1' : ''}</td>
                <td className="border border-slate-200 py-2 px-2">Am</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
                <td className="border border-slate-200 py-2 px-2">&nbsp;</td>
              </tr>
            ))}
            <tr>
              <td className="border border-slate-200 py-2 px-2 text-center text-xs text-slate-400" colSpan={5}>(... continues ~26 times)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 space-y-1">
        <p>What is the most frequently occurring chord? ___</p>
        <p>What chord creates the most contrast from Am? ___</p>
        <p>Which chord change feels most like &ldquo;moving away from home&rdquo;? ___</p>
      </div>

      <div className="my-4 p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-900">
        <p className="font-bold mb-1">Root movement answers:</p>
        <p>G down to E = 3 semitones = <BC>[3]</BC> (minor third down)</p>
        <p>E up to A = 5 semitones = <BC>[5]</BC> (perfect fourth up — formally Sprint 2)</p>
        <p>G up to A = 2 semitones = <BC>[2]</BC> (whole step up)</p>
      </div>

      {/* Page 6 */}
      <H2 id="wb6">Page 6 — 8-Position Grid: Rhythm Practice</H2>
      <P><strong>Purpose:</strong> Map rhythmic patterns to the grid. Practice the Ain&rsquo;t No Sunshine groove structure.</P>
      <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Grid (reference)" height={580} />

      <P><strong>How to use:</strong> Each row of 8 boxes is one measure. Mark active positions (note or chord strike) with an X. Leave inactive positions blank.</P>

      <H3>Practice 1 — Basic Groove (positions 1 and 5)</H3>
      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`Measure 1: | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
           |   |   |   |   |   |   |   |   |

Measure 2: | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
           |   |   |   |   |   |   |   |   |`}</pre>
      </div>

      <H3>Practice 2 — &ldquo;I Know&rdquo; Stop-Time</H3>
      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`"I":    | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
        |   |   |   |   |   |   |   |   |

"know": | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
        |   |   |   |   |   |   |   |   |`}</pre>
      </div>

      <H3>Practice 3 — Your Own Groove</H3>
      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`My groove: | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
           |   |   |   |   |   |   |   |   |`}</pre>
      </div>
      <P>What does this groove feel like? ___</P>

      <H3>Practice 4 — Anticipation</H3>
      <div className="my-4 p-4 rounded-lg bg-slate-900 text-green-400 font-mono text-xs overflow-x-auto">
        <pre>{`Without anticipation:
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| X |   |   |   | X |   |   |   | | X |   |   |   | X |   |   |   |

With position-1 anticipation:
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|   |   |   |   | X |   |   | X | |   |   |   |   | X |   |   | X |`}</pre>
      </div>
      <P>Play both versions. The difference you feel: ___</P>

      <div className="my-6 p-4 rounded-lg border border-slate-300 bg-slate-100 text-sm text-slate-600">
        <p className="font-bold text-slate-700 mb-1">Answer Key (fold under before practicing)</p>
        <p>Practice 1: X at positions 1 and 5.</p>
        <p>Practice 2: X at position 1 only.</p>
        <p>Practice 4: Without anticipation — X at 1, 5. With anticipation — X at 8 of measure 1, then 5 of measure 2.</p>
      </div>

      {/* Page 7 */}
      <H2 id="wb7">Page 7 — Sprint Exit Self-Assessment</H2>
      <P><strong>Purpose:</strong> Honest self-rating before attempting the formal exit assessment. This page is for you, not for a grade. Inflating your ratings here wastes your own time.</P>

      <H3>Plogger Skills</H3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-slate-300 py-1.5 px-2 text-left">Skill</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center w-24">Stage</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              '[3] discrimination by ear (unknown context)',
              '[4] discrimination by ear (unknown context)',
              'Singing [3] from any pitch on demand',
              'Singing [4] from any pitch on demand',
              'Pictograph of [3]: draw from memory',
              'Pictograph of [4]: draw from memory',
            ].map((s, i) => (
              <tr key={i}><td className="border border-slate-200 py-2 px-2">{s}</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Instrument / Zone Skills</H3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-green-50">
              <th className="border border-slate-300 py-1.5 px-2 text-left">Skill</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center w-24">Stage</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Zone 1 of Am on guitar (multiple positions)',
              'Zone 1 of Am on piano (by interval)',
              'Zone 1 for G on both instruments',
              'Zone 1 for Em on both instruments',
              'Zone 1 in Dm: guitar',
              'Zone 1 in Dm: piano',
            ].map((s, i) => (
              <tr key={i}><td className="border border-slate-200 py-2 px-2">{s}</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Song Skills</H3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-amber-50">
              <th className="border border-slate-300 py-1.5 px-2 text-left">Skill</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center w-24">Stage</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Ain't No Sunshine on guitar: correct chords, no stops",
              "Ain't No Sunshine on piano: correct changes, alive",
              'Singing root of each chord while playing',
              'Identifying Zone 1 notes by ear without prep',
            ].map((s, i) => (
              <tr key={i}><td className="border border-slate-200 py-2 px-2">{s}</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Rhythm Skills</H3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr className="bg-purple-50">
              <th className="border border-slate-300 py-1.5 px-2 text-left">Skill</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center w-24">Stage</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              '8-position grid: feel all 8 without counting',
              'Stops: use silence rhythmically',
              'Anticipations: place on position 8',
              'Longy: "ta" and "ta-te" fluently in rhythm',
            ].map((s, i) => (
              <tr key={i}><td className="border border-slate-200 py-2 px-2">{s}</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td><td className="border border-slate-200 py-2 px-2">&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Overall</H3>
      <div className="my-4 p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 space-y-2">
        <p><strong>One skill furthest from Stage 3:</strong> ___</p>
        <p><strong>One skill that surprised you (better than expected):</strong> ___</p>
        <p><strong>Was there any moment when the framework disappeared — when you were just playing music?</strong> ___</p>
      </div>

      <H3>Final Gate Check</H3>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-blue-300 bg-blue-50">
          <p className="text-sm font-bold text-blue-900 mb-2">Gate B (Plogger <BC>[3]</BC>/<BC>[4]</BC>)</p>
          <div className="flex flex-wrap gap-2">
            {['NOT READY', 'STAGE 2 WORK', 'CLOSE TO READY', 'READY TO ATTEMPT'].map(s => (
              <span key={s} className="text-xs px-2 py-1 rounded border border-blue-200 bg-white text-blue-800">{s}</span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg border-2 border-amber-300 bg-amber-50">
          <p className="text-sm font-bold text-amber-900 mb-2">Performance Gate (Ain&rsquo;t No Sunshine)</p>
          <div className="flex flex-wrap gap-2">
            {['NOT READY', 'STAGE 2 WORK', 'CLOSE TO READY', 'READY TO ATTEMPT'].map(s => (
              <span key={s} className="text-xs px-2 py-1 rounded border border-amber-200 bg-white text-amber-800">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="my-8 p-5 rounded-xl border-2 border-teal-300 bg-teal-50 text-center">
        <p className="text-sm font-bold text-teal-900">Both gates clear in the same session, without warm-up?</p>
        <p className="text-lg font-black text-teal-900 mt-2">Sprint 1 Complete.</p>
        <p className="text-sm text-teal-800 mt-1">You are ready for <strong>Sprint 2 — The Resolution: <BC>[5]</BC></strong></p>
      </div>
    </div>
  )
}

export default function Sprint1PracticePage() {
  const [tab, setTab] = useState<'plan' | 'workbook'>('plan')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Sprint 1 — Orientation</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Practice Plan &amp; Workbook</h1>
          <p className="text-lg text-slate-300 max-w-2xl">What to do today. Five sections, sixty minutes, every session. The textbook explains why. This tells you how.</p>
          <div className="flex items-center gap-3 mt-6 text-sm text-slate-400">
            <span>60 min/session</span>
            <span className="text-slate-600">|</span>
            <span>5 sections daily</span>
            <span className="text-slate-600">|</span>
            <span>4 weeks + exit gate</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6)' }} />
      </section>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex gap-2 border-b border-slate-200">
          {([['plan', 'Practice Plan'], ['workbook', 'Workbook']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors ${tab === key ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          <TOCNav items={tab === 'plan' ? PLAN_TOC : WORKBOOK_TOC} />
          <article className="prose-slate max-w-none">
            {tab === 'plan' ? <PracticePlanContent /> : <WorkbookContent />}
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-10 mt-12 border-t border-slate-200">
        <p className="text-xs text-slate-400">Adaptable Musician&rsquo;s Framework — Sprint 1 Practice Plan + Workbook</p>
        <p className="text-xs text-slate-400 mt-1">Companion document: <a href="/materials/sprint1/textbook" className="underline hover:text-slate-600">Sprint 1 Mini-Textbook</a></p>
      </footer>

      {/* Print CSS */}
      <style>{`
        @media print {
          nav, footer, button { display: none !important; }
          section[style*="0f172a"] { background: white !important; color: black !important; }
          section[style*="0f172a"] * { color: black !important; }
          .lg\\:grid { display: block !important; }
          iframe { border: 1px solid #ccc; }
        }
      `}</style>
    </main>
  )
}
