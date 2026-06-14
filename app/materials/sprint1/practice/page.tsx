'use client'

import { useState } from 'react'
import { TextbookContent, TOC as TEXTBOOK_TOC } from '../textbook/page'
import DiChordPictograph from '@/app/DiChordPictograph'

const BC = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
)

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-slate-800 mb-3 mt-12 border-b border-slate-200 pb-2 scroll-mt-24">{children}</h2>
)

const H3 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-base font-bold text-slate-700 mb-2 mt-6 scroll-mt-24">{children}</h3>
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

// ── block color system ───────────────────────────────────────────────────────
const BLOCK_COLORS = {
  b1: { bg: '#fdf4ff', border: '#e9d5ff', text: '#6b21a8', accent: '#7C3AED', label: 'Block 1 — Combined Learning', time: '30 min' },
  b2: { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412', accent: '#EA580C', label: 'Block 2 — Guitar Application', time: '60 min' },
  b3: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', accent: '#2563EB', label: 'Block 3 — Piano Application', time: '60 min' },
}

const SYNTH = { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', accent: '#16a34a' }

const WEEK_COLORS = {
  1: { bg: '#dbeafe', border: '#93c5fd', text: '#1e3a8a', label: 'Week 1 — First Contact' },
  2: { bg: '#dcfce7', border: '#86efac', text: '#14532d', label: 'Week 2 — Building Ears' },
  3: { bg: '#fef3c7', border: '#fcd34d', text: '#78350f', label: 'Week 3 — Consolidation' },
  4: { bg: '#f3e8ff', border: '#c084fc', text: '#581c87', label: 'Week 4 — Gate Approach' },
}

// ── shared components ────────────────────────────────────────────────────────

function WeekBanner({ week }: { week: 1 | 2 | 3 | 4 }) {
  const c = WEEK_COLORS[week]
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-xl mb-2 mt-14" style={{ background: c.bg, border: `2px solid ${c.border}` }}>
      <span className="text-xl font-black" style={{ color: c.text }}>{c.label}</span>
    </div>
  )
}

function BlockHeader({ block }: { block: keyof typeof BLOCK_COLORS }) {
  const c = BLOCK_COLORS[block]
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg mt-8 mb-4" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.accent }} />
        <span className="text-sm font-extrabold" style={{ color: c.text }}>{c.label}</span>
      </div>
      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: c.border, color: c.text }}>{c.time}</span>
    </div>
  )
}

function SynthEndcap({ instrument }: { instrument: string }) {
  return (
    <div className="mt-6 p-4 rounded-xl border" style={{ background: SYNTH.bg, borderColor: SYNTH.border }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: SYNTH.accent }} />
        <span className="text-sm font-extrabold" style={{ color: SYNTH.text }}>The Synthesizer — 8 min (final 8 min of this block)</span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: SYNTH.text }}>
        All four chambers simultaneously on {instrument} — melody + harmony + voicings + rhythm at once. This is a <strong>performance section</strong>, not a practice section. Play it like someone is listening. Full attention, full commitment. No stopping.
      </p>
    </div>
  )
}

// ── TOC ──────────────────────────────────────────────────────────────────────

const PLAN_TOC = [
  { id: 'how-to-use', label: 'How to Use' },
  { id: 'daily-template', label: 'Daily Session' },
  { id: 'week1', label: 'Week 1 — First Contact' },
  { id: 'w1-b1', label: '· Combined Learning' },
  { id: 'w1-b2', label: '· Guitar Application' },
  { id: 'w1-b3', label: '· Piano Application' },
  { id: 'week2', label: 'Week 2 — Building Ears' },
  { id: 'w2-b1', label: '· Combined Learning' },
  { id: 'w2-b2', label: '· Guitar Application' },
  { id: 'w2-b3', label: '· Piano Application' },
  { id: 'week3', label: 'Week 3 — Consolidation' },
  { id: 'w3-b1', label: '· Combined Learning' },
  { id: 'w3-b2', label: '· Guitar Application' },
  { id: 'w3-b3', label: '· Piano Application' },
  { id: 'week4', label: 'Week 4 — Gate Approach' },
  { id: 'w4-b1', label: '· Combined Learning' },
  { id: 'w4-b2', label: '· Guitar Application' },
  { id: 'w4-b3', label: '· Piano Application' },
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

// ── practice plan content ────────────────────────────────────────────────────

function PracticePlanContent() {
  return (
    <div>
      {/* How to Use */}
      <H2 id="how-to-use">How to Use This Document</H2>
      <P>This document drives your daily practice. The textbook explains why every element exists. This document tells you <strong>what to do today</strong>.</P>
      <P><strong>Before your first session on any new concept:</strong> read the corresponding textbook section. You need the why before the what makes full sense. But do not let reading substitute for practice. The textbook is reference. This document is your operating manual.</P>
      <P><strong>The structure:</strong> Three blocks, every day. Combined Learning is always first — it sets up both instrument sessions. Guitar and Piano Application blocks can be done in either order. Total time: approximately 2.5 hours. The timing is a guide — go slightly long on a block that is producing results, slightly short on one that is not, but complete all three every session.</P>
      <div className="my-6 p-5 rounded-xl border border-amber-200 bg-amber-50">
        <p className="text-sm text-amber-900"><strong>Stage labels appear throughout.</strong> Stage 1 means errors are expected and correct. Stage 2 means sometimes right. Stage 3 — which the gate requires — means always right at tempo without conscious attention. &ldquo;I can do it slowly&rdquo; is Stage 2. Do not mistake it for Stage 3.</p>
      </div>

      {/* Daily Session Template */}
      <H2 id="daily-template">The Daily Session — Sprint 1 Template</H2>
      <P>Every session follows this three-block structure. Combined is always first. Application blocks run in either order.</P>
      <Asset file="O4_daily_session_map.html" title="O4 — Sprint 1 Daily Session Map" height={430} />

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="text-left py-2 px-3 font-bold text-slate-700">Block</th>
              <th className="text-left py-2 px-3 font-bold text-slate-700">Time</th>
              <th className="text-left py-2 px-3 font-bold text-slate-700">Sprint 1 Purpose</th>
            </tr>
          </thead>
          <tbody>
            {([
              { name: 'Block 1 — Combined Learning', time: '30 min', purpose: 'Ear training, keyboard visualization, rhythm grid, anchor song listening — piano as the conceptual vehicle. Always first.', color: BLOCK_COLORS.b1.text },
              { name: 'Block 2 — Guitar Application', time: '60 min', purpose: 'Apply the day\'s concepts on guitar: Zone 1, chords, Ain\'t No Sunshine, free play. Ends with The Synthesizer (8 min).', color: BLOCK_COLORS.b2.text },
              { name: 'Block 3 — Piano Application', time: '60 min', purpose: 'Same structure as Block 2 but on piano. Either block can go before the other. Ends with The Synthesizer (8 min).', color: BLOCK_COLORS.b3.text },
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

      <P><strong>The Combined block runs first every day without exception.</strong> It primes the ear and sets the conceptual frame for both instrument sessions. Guitar and Piano Application blocks each end with The Synthesizer — 8 minutes where all four chambers run simultaneously. That is not a drill; it is performance.</P>

      <Asset file="O3_hear_sing_name_cycle.html" title="O3 — Hear → Sing → Name Cycle (reference for every Combined block)" height={380} />

      <div className="my-6 p-4 rounded-lg border border-slate-200 bg-slate-50">
        <p className="text-sm font-bold text-slate-700 mb-2">Rules for every block, every session:</p>
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

      {/* W1 B1 */}
      <BlockHeader block="b1" />
      <div id="w1-b1" className="scroll-mt-24" />
      <P><strong>Objective:</strong> First contact with <BC>[3]</BC> and <BC>[4]</BC> as distinct sounds. Establish the Hear→Sing→Name workflow. Use the piano to see the intervals.</P>

      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card" height={380} />
      <Asset file="O3_hear_sing_name_cycle.html" title="O3 — Hear → Sing → Name Cycle" height={380} />

      <H3>Ear Training — 10 min</H3>
      <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700 mb-6">
        <li>Sit at the piano. Play <strong>A and C</strong> together. Let them ring for five seconds. Do not name it yet. Just receive the sound — feel the closed, slightly heavy quality. That is <BC>[3]</BC>.</li>
        <li>Now play <strong>A and C#</strong> together. Slightly more open, less contracted. That is <BC>[4]</BC>.</li>
        <li>Alternate back and forth five times, pausing five seconds on each. You are learning to recognize these sounds the way you learn to recognize two different voices.</li>
        <li><strong>Singing step:</strong> Play A alone. Sing C above it — the <BC>[3]</BC> above A. Find it by feel, reaching upward until the interval feels contracted and minor.</li>
        <li>Play A alone again. Sing C# above it — the <BC>[4]</BC>. Slightly more open, brighter.</li>
        <li><strong>Last 2 min:</strong> Alternate randomly. Play A, then play either C or C#. Identify <BC>[3]</BC> or <BC>[4]</BC> by sound alone. Then sing the interval back. Then name it.</li>
      </ol>

      <H3>Keyboard Visualization — 10 min</H3>
      <P>The piano makes intervals <em>visible</em>. Use this to build a spatial map of <BC>[3]</BC> and <BC>[4]</BC>.</P>
      <P>Play <BC>[3]</BC> (A–C) and look at the distance: one white key between them (B). Now play <BC>[4]</BC> (A–C#): same white key count, but C# is black. The visual difference corresponds to the sound difference. Play both three times each. Let the visual and the sound link up.</P>
      <P>Then: move to a different starting note (try D). Play <BC>[3]</BC> above D: D and F (three semitones). Play <BC>[4]</BC> above D: D and F#. Same visual logic in a new location. Repeat from one more starting note of your choice.</P>

      <H3>Rhythm — 5 min</H3>
      <P>Tap or clap positions 1 through 8 on a table. Say &ldquo;1-2-3-4-5-6-7-8&rdquo; aloud with each tap. Do this for 2 minutes. Then: tap only positions 1 and 5 — the other six are silent. Feel the gap between them. This is the skeleton of 4/4 time.</P>

      <H3>Listen — 5 min</H3>
      <P>Put on Ain&rsquo;t No Sunshine by Bill Withers. Do not analyze. Do not follow chords. Just listen and feel the song. One pass, beginning to end. Notice what it feels like when the chord changes. You are not labeling anything yet — you are just receiving the song.</P>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-lg border border-green-200 bg-green-50">
          <p className="text-xs font-bold text-green-800 mb-1">What &ldquo;good&rdquo; looks like</p>
          <p className="text-sm text-green-900">You are wrong on [3] vs [4] sometimes. You can sing both intervals imprecisely but recognizably. The keyboard visualization starts to feel spatial. The 8-position grid is awkward but countable.</p>
        </div>
        <div className="p-4 rounded-lg border border-red-200 bg-red-50">
          <p className="text-xs font-bold text-red-800 mb-1">What &ldquo;stuck&rdquo; looks like</p>
          <p className="text-sm text-red-900">You skip the hearing step and go straight to analyzing note names. Or you sing but do not listen to whether the interval quality matches. If you catch yourself skipping the five-second pause, slow down. The pause is the practice.</p>
        </div>
      </div>

      {/* W1 B2 */}
      <BlockHeader block="b2" />
      <div id="w1-b2" className="scroll-mt-24" />
      <P><strong>Objective:</strong> First contact with Zone 1 on the fretboard. Learn Am, G, Em chord shapes. Play them in the song context — simplified, no tempo pressure.</P>

      <H3>Zone 1 on Guitar — 10 min</H3>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <P>Zone 1 for Am contains three notes: A (root), C (third), E (fifth). Using the E1 map: string 5 open = A, string 4 fret 2 = E, string 3 fret 2 = A, string 2 fret 1 = C, string 1 open = E. Do not play string 6.</P>
      <P>Play each string individually. Name the note. Then sing the di-chord interval between A and C (<BC>[3]</BC>). You just heard <BC>[3]</BC> in the Combined block — now feel it on the instrument.</P>

      <H3>Chords — 12 min</H3>
      <P>Learn Am (your home chord), G major (the first departure), Em (the second departure). All three live in the key of A minor.</P>
      <P>Practice each shape until you can press it down cleanly. Then practice the transition: Am to G, over and over, until your hand can find both shapes without pausing. Finger memory is built by repetition at slow tempo, not by thinking harder.</P>
      <P>Play Am → G → Em → Am in sequence, one chord per measure, as slowly as needed. One strum per chord — let it ring for the full measure.</P>

      <H3>Anchor Song — 20 min</H3>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine Analysis Sheet" height={700} />
      <P>Play Ain&rsquo;t No Sunshine using your Am-G-Em chords. No strumming pattern — just one chord per measure, let it ring. Do not stop when you make a mistake. When the chord change is wrong, fix it on the next measure and keep going.</P>
      <P><strong>Sing the root note of whatever chord you are playing.</strong> Am → hum A. G → hum G. Em → hum E. This connects harmony to melody in your ear.</P>

      <H3>Free Play — 10 min</H3>
      <P>Improvise using only Zone 1 notes: A, C, and E, anywhere on the guitar. Strum Am and pick individual notes from Zone 1. There is no melody to learn — you are exploring the space. The only rule: stay in Zone 1. If you play a note that sounds outside, notice it and return.</P>

      <SynthEndcap instrument="guitar" />

      {/* W1 B3 */}
      <BlockHeader block="b3" />
      <div id="w1-b3" className="scroll-mt-24" />
      <P><strong>Objective:</strong> First contact with Zone 1 on the keyboard. Learn Am, G, Em as root position triads. Feel the song&rsquo;s harmonic motion under your hands.</P>

      <H3>Zone 1 on Piano — 10 min</H3>
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
      <P>A is in the lower half of the keyboard (between G and B, white keys). C is easy — immediately left of the two black keys. E is two white keys right of C. Play A-C-E as a block chord with your right hand. Then play each note individually and sing it.</P>
      <P>Play the Zone 1 sequence: A-C-E ascending, then E-C-A descending. Sing each note as you play it. Connect what you see on the keyboard to what you heard in the Combined block.</P>

      <H3>Chords — 12 min</H3>
      <P><strong>Right hand:</strong> Am root position triad (A-C-E), then G (G-B-D), then Em (E-G-B). Play each chord with right hand, three notes together. Slow transitions — Am to G to Em and back. Notice how the notes shift each time.</P>
      <P><strong>Left hand:</strong> Play the root note only — A when Am, G when G, E when Em. Left hand plays root on beat one; right hand holds the chord. This is your basic piano texture for Song Work.</P>

      <H3>Anchor Song — 20 min</H3>
      <P>Play Ain&rsquo;t No Sunshine on piano. Left hand: root note on beat one (A for Am, G for G, E for Em). Right hand: the corresponding root position triad, held for the measure.</P>
      <P>One chord per measure. No tempo pressure. Sing the root (same as guitar block — this is the same song, same exercise, different instrument). When a chord change feels uncertain, practice just that pair in isolation until it becomes physical memory.</P>

      <H3>Free Play — 10 min</H3>
      <P>Left hand holds A (or plays A as a pulse). Right hand moves between A, C, and E freely — any pattern, any order. Sing along with whatever note your right hand is playing. This is ear-led exploration, not exercise execution.</P>

      <SynthEndcap instrument="piano" />

      {/* ===== WEEK 2 ===== */}
      <WeekBanner week={2} />
      <div id="week2" className="scroll-mt-24" />
      <P><strong>Theme:</strong> <BC>[3]</BC> and <BC>[4]</BC> becoming reliable. Ain&rsquo;t No Sunshine starting to feel like music, not exercises.</P>
      <P><strong>What to expect:</strong> By the end of Week 2 you should be getting <BC>[3]</BC> vs. <BC>[4]</BC> right most of the time (15/20 or better on the tracking log). Chord changes should happen without stopping. The 8-position grid should be physically internalized.</P>

      {/* W2 B1 */}
      <BlockHeader block="b1" />
      <div id="w2-b1" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Formalize ear training with 20-trial tracking. Add pictograph work. Begin mapping the Ain&rsquo;t No Sunshine groove to the rhythm grid.</P>

      <H3>Ear Log — 10 min</H3>
      <P>Open Workbook Page 2 (Di-Chord Ear Log). Run 20 formal trials: each trial, play two notes simultaneously — either A and C (<BC>[3]</BC>) or A and C# (<BC>[4]</BC>). Choose randomly. Hear it for three seconds before naming. Record correct or incorrect.</P>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (keep visible)" height={380} />

      <div className="my-6 p-4 rounded-lg bg-slate-50 border border-slate-200">
        <p className="text-sm font-bold text-slate-700 mb-2">What the scores mean:</p>
        <ul className="space-y-1 text-sm text-slate-600">
          <li><strong>10/20 or below:</strong> You are guessing. Take five full seconds to hear before naming.</li>
          <li><strong>11–14/20:</strong> Beginning to hear. Normal Stage 2 for early Week 2.</li>
          <li><strong>15–18/20:</strong> Good progress. Stage 2 solidifying.</li>
          <li><strong>19–20/20:</strong> Stage 3 approaching. Run three days in a row at 19–20 before trusting it.</li>
        </ul>
      </div>

      <H3>Keyboard Visualization + Pictograph — 10 min</H3>
      <div className="my-8"><DiChordPictograph /></div>
      <P>Play <BC>[3]</BC> and <BC>[4]</BC> from three different starting notes on piano. Before playing each interval, name it. Then verify by playing. Connect the quality (closed/dark for <BC>[3]</BC>, open/bright for <BC>[4]</BC>) to the physical key span.</P>
      <P><strong>Adding the pictograph:</strong> After the keyboard work, spend 2 minutes on the R2 pictograph. Draw the glyph for <BC>[3]</BC>: rounded outline, shadow left, filled dark (non-harmonic, closed). Then <BC>[4]</BC>: same outline and shadow, but light (harmonic, open). The only visual difference is the fill color — just like the sound difference is small but real.</P>
      <P><strong>Pull character listening:</strong> Play <BC>[3]</BC> and hold it. Listen past the direction — notice the quality of the pull. It is a <em>steady weight</em>: the notes attract each other across a non-harmonic gap, dense and inward, without acoustic reason to resolve except sheer gravitational pressure. Now play <BC>[4]</BC>. Same direction (fundamental), same 4Hz rate. But the pull quality shifts to <em>deep gravity</em> — the harmonic bond gives the interval a sense of acoustic belonging rather than mere attraction. Train yourself to feel both: where the pull goes, and how it feels to go there. Direction comes quickly; pull texture takes the whole sprint.</P>

      <H3>Rhythm — 5 min</H3>
      <P>The groove from Ain&rsquo;t No Sunshine runs on positions 1 and 5 — beat one and beat three. Play Am on guitar (or piano) and strike on position 1 and again on position 5. Count 1-2-3-4-5-6-7-8 internally. Land cleanly on each. Then: play the &ldquo;I know&rdquo; section — position 1 only, hold for the full measure, silence until the next &ldquo;I know.&rdquo;</P>

      <H3>Listen + Name — 5 min</H3>
      <P>Put on Ain&rsquo;t No Sunshine again. This time: try to name each chord change as it happens. You are not expected to be correct — you are training your ear to look for the harmonic event. When a chord change occurs, say a word: &ldquo;Am... G... Em...&rdquo; If you cannot name it, just say &ldquo;change.&rdquo; The noticing is the exercise.</P>

      {/* W2 B2 */}
      <BlockHeader block="b2" />
      <div id="w2-b2" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Zone 1 in multiple positions on the neck. Add a basic strumming groove. Begin playing along with the recording.</P>

      <H3>Zone 1 — Expanded — 10 min</H3>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <P>Find A, C, E beyond just the Am chord shape. String 6 fret 5 = A. String 4 open = D (not Zone 1), but string 4 fret 2 = E. String 3 fret 5 = C. Play each new location, name it, then sing the <BC>[3]</BC> between A and C to confirm the relationship. You are building a spatial map of Zone 1 across the whole neck.</P>

      <H3>Chords + Groove — 12 min</H3>
      <P><strong>Basic strumming pattern:</strong> Down strums on positions 1 and 5 — beat one and beat three. Two downstrokes per measure. This is the skeleton of almost every 4/4 groove. The chord change should happen before the strum — have your hand already in shape before position 1 arrives.</P>
      <P>Play Am → G → Em → Am loop with this pattern. Days 1–2: guitar only. Days 3–5: add in playing along with the recording — when you lose your place, do not restart. Wait, find beat one, and re-enter. Losing your place and re-entering is more valuable than stopping to restart cleanly.</P>

      <H3>Anchor Song — 20 min</H3>
      <P>Play along with the Bill Withers recording. Chords + groove. When a chord comes that you do not know, strum Am to hold your place. After the song, note the one chord change that felt most uncertain. Practice just that pair for 3 minutes.</P>

      <H3>Free Play — 10 min</H3>
      <P>Zone 1 improv over the Am-G vamp. This week: <strong>when the chord changes to G, move to G&rsquo;s Zone 1 notes (G-B-D).</strong> Let the chord change guide your melody. Sing every note you play on the guitar. If the voice and the instrument diverge, you will hear it — that gap is the ear training.</P>

      <SynthEndcap instrument="guitar" />

      {/* W2 B3 */}
      <BlockHeader block="b3" />
      <div id="w2-b3" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Zone 1 in two octaves on piano. Left hand + right hand working together. Song with melody emerging.</P>

      <H3>Zone 1 — Expanded — 10 min</H3>
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
      <P>Find Zone 1 notes (A, C, E) in two octave ranges — once in the lower-middle register, once in the higher register. Play A-C-E in the low octave with your left hand, then A-C-E in the high octave with your right. Same notes, different register, same minor quality.</P>
      <P>Play Am as a chord on both instruments simultaneously (if possible) — or alternate: guitar Am chord, then piano Am chord, two seconds apart. Listen to the total sound. The di-chord relationships are the same regardless of instrument.</P>

      <H3>Chords + Melody — 12 min</H3>
      <P>Left hand: root note on beat one (A for Am, G for G, E for Em). Right hand: Zone 1 of the current chord — play the top note of the chord (C for Am, B for G, B for Em). One note at a time from the right hand, matching each chord.</P>

      <div className="my-6 overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead><tr className="border-b-2 border-slate-300"><th className="py-2 px-3 text-left text-slate-700">Chord</th><th className="py-2 px-3 text-left text-slate-700">LH root</th><th className="py-2 px-3 text-left text-slate-700">Zone 1 (RH)</th></tr></thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="py-2 px-3">Am</td><td className="py-2 px-3">A</td><td className="py-2 px-3">A – C – E</td></tr>
            <tr className="border-b border-slate-100"><td className="py-2 px-3">G</td><td className="py-2 px-3">G</td><td className="py-2 px-3">G – B – D</td></tr>
            <tr><td className="py-2 px-3">Em</td><td className="py-2 px-3">E</td><td className="py-2 px-3">E – G – B</td></tr>
          </tbody>
        </table>
      </div>

      <H3>Anchor Song — 20 min</H3>
      <P>Left hand plays the root on beat one. Right hand plays one or two Zone 1 notes — not a full chord, just the top note of each chord. Play the song start to finish without stopping. When a chord change is wrong, keep the pulse alive and correct on the next arrival. After playing, name the chord change that felt most uncertain and practice it in isolation.</P>

      <H3>Free Play — 10 min</H3>
      <P>Zone 1 melody over Am-G chord changes on piano. When G arrives, move to G-B-D. Sing every note your right hand plays. Let the chord change pull your melody toward it — you do not need to think about which note to play if you are listening.</P>

      <SynthEndcap instrument="piano" />

      {/* ===== WEEK 3 ===== */}
      <WeekBanner week={3} />
      <div id="week3" className="scroll-mt-24" />
      <P><strong>Theme:</strong> Stage 2 solidifying toward Stage 3. <BC>[3]</BC>/<BC>[4]</BC> discrimination should be 18/20 or better. Ain&rsquo;t No Sunshine should be playable on both instruments in simplified form.</P>
      <P><strong>What to expect:</strong> This week the work gets harder because the standards go up. Week 1 asked for first contact. Week 2 asked for progress. Week 3 asks for <strong>consistency</strong>.</P>

      {/* W3 B1 */}
      <BlockHeader block="b1" />
      <div id="w3-b1" className="scroll-mt-24" />
      <P><strong>Objective:</strong> <BC>[3]</BC> and <BC>[4]</BC> in melodic context — inside a major scale, and both directions. Start stress-testing toward Stage 3.</P>

      <H3>Ear Training — 10 min</H3>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card" height={380} />
      <P>Play C major on piano: C-D-E-F-G-A-B-C. Play C and E together — that is <BC>[4]</BC>. Play E and G — that is <BC>[3]</BC>. The major triad contains both: <BC>[4]</BC> from root to 3rd, <BC>[3]</BC> from 3rd to 5th. Am is the inverse order: <BC>[3]</BC> from root to 3rd, <BC>[4]</BC> from 3rd to 5th.</P>
      <P>Run 20 trials from five different starting notes — not just A. Expand the roots: C, D, G, and two of your choice. <strong>Week 3 target: 18/20.</strong> If you are below 15, spend 8 of 10 minutes on pure listening without naming, and run only 10 trials.</P>

      <H3>Keyboard Visualization — 10 min</H3>
      <P>Play a note on piano — any white key. Sing the <BC>[4]</BC> above it. Play and check. Now sing the <BC>[3]</BC> above the same note. Play and check. Do this from five different starting notes.</P>
      <P>Then reverse: play a note. Sing the <BC>[3]</BC> <em>below</em> it, then the <BC>[4]</BC> below it. The interval below is a different direction but the same quality. Playing both directions is what earns Stage 3.</P>

      <H3>Rhythm — 5 min</H3>
      <P>Tap the full Ain&rsquo;t No Sunshine groove — not just positions 1 and 5, but also the forward strum you will add in Guitar Block this week. Then tap the &ldquo;I know&rdquo; stop-time section: position 1 only, long silence, repeat 26 times. Feel the groove as a shape rather than a count.</P>

      <H3>Listen + Analyze — 5 min</H3>
      <P>Listen to Ain&rsquo;t No Sunshine. This time: try to identify one moment where the melody moves by a <BC>[3]</BC> or <BC>[4]</BC>. You are not counting semitones — you are listening for the rounded, smooth character that both intervals share compared to the step-like <BC>[2]</BC>. When you find a candidate, play the passage back from memory on piano. Even approximately is fine.</P>

      {/* W3 B2 */}
      <BlockHeader block="b2" />
      <div id="w3-b2" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Zone 1 in multiple positions across the neck. Add the forward strum. Full song without stopping.</P>

      <H3>Zone 1 — Multiple Positions — 10 min</H3>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <P>Find Zone 1 notes (A, C, E) in at least three positions on the neck — not just the Am open chord. A at string 6 fret 5. C at string 5 fret 3. E at string 4 open and string 1 open. String 6 fret 12 = E (octave above open). Move between positions without looking if you can.</P>

      <H3>Chords + Forward Strum — 12 min</H3>
      <P>Add a light upstroke on position 6: <strong>down-down-up</strong> (positions 1, 5, 6). This creates forward momentum — beat three pushes slightly into beat four.</P>
      <ul className="list-disc pl-6 text-sm text-slate-700 mb-4 space-y-1">
        <li>Position 1: down strum (strong)</li>
        <li>Position 5: down strum (medium)</li>
        <li>Position 6: up strum (light — just brush the top two or three strings)</li>
      </ul>
      <P>Play the entire song with this pattern without stopping. When you make a mistake, keep the pulse alive and re-enter.</P>

      <H3>Anchor Song — 20 min</H3>
      <P>Full performance pass on guitar. Chord changes clean, groove feeling, start to finish with no complete stops. Then: note where the song felt alive — where the framework disappeared and you were just playing. That moment is the north star. Chase it next session.</P>

      <H3>Free Play — 10 min</H3>
      <P>Zone 1 in multiple positions. Let phrases breathe — you do not have to play every position. Space is part of the language. Find one melody line that actually sounds good to you, then repeat it in a different position. Notice how the same phrase sounds slightly different at a different register.</P>

      <SynthEndcap instrument="guitar" />

      {/* W3 B3 */}
      <BlockHeader block="b3" />
      <div id="w3-b3" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Zone 1 across all octaves. Left hand chord + right hand melody together. Full song without stopping.</P>

      <H3>Zone 1 — Across Octaves — 10 min</H3>
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
      <P>Play Zone 1 melodies starting from any A, C, or E on the keyboard — choose any octave. The minor quality of <BC>[3]</BC> between A and C sounds the same whether you are in the bass octave or the treble. Move between octaves freely. Sing what you play.</P>

      <H3>Chord + Melody Together — 12 min</H3>
      <P>Left hand plays Am block chord (A-C-E, or root + fifth if the full triad is hard). Right hand plays Zone 1 melody — a single note at a time. Move the right hand while left hand holds the chord. Then change to G: left hand G-B-D, right hand moves in G-B-D territory. Do not think about which note to play. Let the chord suggest the note.</P>

      <H3>Anchor Song — 20 min</H3>
      <P>Left hand: root on beat one. Right hand: one Zone 1 note per chord. Play the song from start to finish without stopping. Then play it again with no agenda — just play the song and see what happens. After two passes, note where you felt the music most. Write it in your workbook.</P>

      <H3>Free Play — 10 min</H3>
      <P>Zone 1 across all octaves on piano. Let dynamics guide your note choices — high octaves for brightness, low for weight. Find a phrase that moves you emotionally (even a little) and play it again. Repetition with feeling is how Zone 1 becomes vocabulary.</P>

      <SynthEndcap instrument="piano" />

      {/* ===== WEEK 4 ===== */}
      <WeekBanner week={4} />
      <div id="week4" className="scroll-mt-24" />
      <P><strong>Theme:</strong> Are you ready? Honest self-assessment toward Stage 3. This week stress-tests what you think you own.</P>
      <P><strong>What to expect:</strong> Week 4 is not a harder practice week — it is an <strong>honest</strong> practice week. You are doing the things you have been doing, but in new contexts, under mild pressure, and in a different key. Genuine Stage 3 means it works anywhere.</P>

      {/* W4 B1 */}
      <BlockHeader block="b1" />
      <div id="w4-b1" className="scroll-mt-24" />
      <P><strong>Objective:</strong> <BC>[3]</BC> and <BC>[4]</BC> in random musical context — real-time identification in unfamiliar music. Target: 19–20/20 on the log.</P>

      <H3>Ear Stress Test — 10 min</H3>
      <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card (gate standard)" height={380} />
      <P>Put on a song you do not know well. Listen for 30 seconds. Can you identify any moment where the melody moves by a <BC>[3]</BC> or <BC>[4]</BC>? You are not counting semitones — you are listening for the quality: smooth, rounded, neither step-like nor wide. When you find a candidate, play the interval on piano to confirm.</P>
      <P>After 6 minutes of active listening, run your 20-trial discrimination log. <strong>Week 4 target: 19–20/20.</strong></P>
      <div className="my-4 p-4 rounded-lg border border-purple-200 bg-purple-50 text-sm text-purple-900">
        <strong>Why this matters:</strong> Stage 3 means &ldquo;can be identified by ear in a song in real time, without preparation.&rdquo; If you can only identify <BC>[3]</BC> and <BC>[4]</BC> in a controlled piano exercise, that is Stage 2.
      </div>

      <H3>Keyboard / Transposition — 10 min</H3>
      <P>Play <BC>[3]</BC> and <BC>[4]</BC> from starting notes you have not used much: D, F, B. For each: play the interval, sing it, name it. Then play the minor triad from D: D-F-A. Confirm that <BC>[3]</BC> (D to F) sounds the same as it does from A. The interval quality is fixed regardless of starting note. That is what &ldquo;owning&rdquo; an interval means.</P>

      <H3>Rhythm — 5 min</H3>
      <P>Improvise a new groove using the 8-position grid. Choose any combination of active positions. Play it on guitar or tap it out. Does it feel like a groove? Can you anticipate position 1 of the next measure from position 8 of the current one? Experiment with where the anticipation creates energy versus where it disrupts it.</P>

      <H3>Listen + Analyze — 5 min</H3>
      <P>Ain&rsquo;t No Sunshine one last time, but name every chord change in real time. Am-G-Em-Am. The &ldquo;I know&rdquo; section is all Am. When the song ends, say the complete progression from memory without playing it. If you cannot, play it once more and try again.</P>

      {/* W4 B2 */}
      <BlockHeader block="b2" />
      <div id="w4-b2" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Transpose to Dm on guitar. Perform Ain&rsquo;t No Sunshine. Free play in an unfamiliar key.</P>

      <H3>Zone 1 — New Key — 10 min</H3>
      <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
      <P><strong>Dm Zone 1:</strong> D (root), F (third), A (fifth). On guitar: open 4th string = D (root), 1st fret 1st string = F (third), 2nd fret 3rd string = A (fifth, also 5th string open). Find D, F, A on the neck. Confirm the <BC>[3]</BC> between D and F — it sounds minor, same quality as A to C. Transposing puts the skill back to Stage 2 temporarily. How quickly does it stabilize?</P>

      <H3>Chords + Groove in Dm — 12 min</H3>
      <P>Dm chord open position: string 4 open (D), string 3 fret 2 (A), string 2 fret 3 (F), string 1 fret 1 (F). Add C major and Am. Play a Dm → C → Am loop — the D minor equivalent of Am-G-Em. Same groove, new key.</P>

      <H3>Anchor Song — Performance — 20 min</H3>
      <P>Perform Ain&rsquo;t No Sunshine on guitar as if someone is listening. Full song, correct chords, recognizable groove, no stopping for mistakes. Play it once with full intention. Then: play it a second time — this time chase the moment where the framework disappears. After both passes, note whether the second felt more alive than the first.</P>

      <H3>Free Play — 10 min</H3>
      <P>Choose a minor key that is neither Am nor Dm. E minor, B minor, C minor — any of them. Find the root, third, and fifth by interval (the minor third is <BC>[3]</BC> — three semitones above the root). Once you have Zone 1, improvise freely. You will be slow. That is correct. If Zone 1 stabilizes within 5 minutes, you are genuinely close to Stage 3.</P>

      <SynthEndcap instrument="guitar" />

      {/* W4 B3 */}
      <BlockHeader block="b3" />
      <div id="w4-b3" className="scroll-mt-24" />
      <P><strong>Objective:</strong> Transpose to Dm on piano. Perform Ain&rsquo;t No Sunshine. Free play in an unfamiliar key.</P>

      <H3>Zone 1 — New Key — 10 min</H3>
      <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
      <P><strong>Dm Zone 1:</strong> D-F-A as a block chord. D is two white keys above C. F is two above D. A is two above G. Play D-F-A with your right hand. Sing the <BC>[3]</BC> between D and F — confirm it sounds minor. Then play D and F together on piano and confirm visually: one white key between them (E), same span as A-C. Same interval, new location.</P>

      <H3>Chords + Triads in Dm — 12 min</H3>
      <P>Dm triad root position: D-F-A. C major: C-E-G. Am: A-C-E. Play Dm → C → Am loop on piano. Left hand root, right hand triad. Slow to fast — find the speed where you still feel confident, then push slightly past it. New keys stabilize through repetition, not thinking.</P>

      <H3>Anchor Song — Performance — 20 min</H3>
      <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine (synthesis reference)" height={700} />
      <P>Perform Ain&rsquo;t No Sunshine on piano as if someone is listening. Left hand roots, right hand Zone 1 melody or simplified chord. Start to finish, no complete stops, correct harmonic motion, alive. After the performance, note where you felt the song versus where you were executing. The gap between feeling and executing is what the rest of the sprint is closing.</P>

      <H3>Free Play — 10 min</H3>
      <P>Same as guitar block — choose a third minor key, not Am or Dm. Find Zone 1 by interval on piano. Improvise freely. Sing what you play. If you lose your place in the harmony, return to the root and rebuild. No stopping — the return-to-root is a musical gesture, not a failure.</P>

      <SynthEndcap instrument="piano" />

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
          <p className="text-slate-600">The problem is almost certainly in the hearing step — you are naming before you have truly heard. Fix: extend the listening pause to ten seconds before naming.</p>
        </div>
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm">
          <p className="font-bold text-slate-700 mb-1">Ain&rsquo;t No Sunshine still stopping on chord changes?</p>
          <p className="text-slate-600">The chord shapes are not ready before the change arrives. Fix: practice the specific change in isolation (Am→G loop) until it takes less than one beat to arrive.</p>
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

      <H3>Gate A — Plogger <BC>[3]</BC>/<BC>[4]</BC> Mastery</H3>
      <P><strong>Trial set 1 — Discrimination (10 trials):</strong> Random mix of <BC>[3]</BC> and <BC>[4]</BC> from different roots. Name each after hearing. Required: <strong>10/10.</strong></P>
      <P><strong>Trial set 2 — Singing <BC>[3]</BC> from 5 pitches:</strong> From each pitch, sing the minor third above. Within a half step without a reference instrument. <strong>4/5 required.</strong></P>
      <P><strong>Trial set 3 — Singing <BC>[4]</BC> from 5 pitches:</strong> Same exercise, major third. <strong>4/5 required.</strong></P>
      <P><strong>Trial set 4 — Real-time identification (10 trials):</strong> A short melody is played. After each step, identify <BC>[3]</BC>, <BC>[4]</BC>, or &ldquo;other.&rdquo; Required: <strong>10/10</strong> on intervals that contain <BC>[3]</BC> or <BC>[4]</BC>.</P>

      <H3>Gate B — Performance: Ain&rsquo;t No Sunshine</H3>
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
        <p className="text-sm font-bold text-teal-900">Sprint 1 is complete when: Gate A passes AND all four performance tests pass, in the same session, without warm-up. On the same day.</p>
        <p className="text-sm text-teal-800 mt-2">When both gates are clear: you are ready for <strong>Sprint 2 — The Resolution: <BC>[5]</BC></strong>.</p>
      </div>
    </div>
  )
}

// ── workbook content (unchanged) ─────────────────────────────────────────────

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
      <P><strong>Purpose:</strong> Formal 20-trial discrimination tracking. Run once per Combined block from Week 2 onward.</P>
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

      <H3>Synthesizer Skills</H3>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse border border-slate-300">
          <thead>
            <tr style={{ background: SYNTH.bg }}>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Skill</th>
              <th className="border border-slate-300 py-1.5 px-2 text-center w-24">Stage</th>
              <th className="border border-slate-300 py-1.5 px-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Synthesizer on guitar: all 4 chambers 8 min without stopping',
              'Synthesizer on piano: all 4 chambers 8 min without stopping',
              'Unscaffolded synthesis: no preset loop, free music for 8 min',
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
          <p className="text-sm font-bold text-blue-900 mb-2">Gate A (Plogger <BC>[3]</BC>/<BC>[4]</BC>)</p>
          <div className="flex flex-wrap gap-2">
            {['NOT READY', 'STAGE 2 WORK', 'CLOSE TO READY', 'READY TO ATTEMPT'].map(s => (
              <span key={s} className="text-xs px-2 py-1 rounded border border-blue-200 bg-white text-blue-800">{s}</span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-lg border-2 border-amber-300 bg-amber-50">
          <p className="text-sm font-bold text-amber-900 mb-2">Gate B (Ain&rsquo;t No Sunshine)</p>
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

// ── page component ───────────────────────────────────────────────────────────

export default function Sprint1PracticePage() {
  const [tab, setTab] = useState<'plan' | 'workbook' | 'textbook'>('plan')

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Sprint 1 — Orientation</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Practice Plan &amp; Workbook</h1>
          <p className="text-lg text-slate-300 max-w-2xl">What to do today. Three blocks, every session. Combined is always first. The textbook explains why. This tells you how.</p>
          <div className="flex items-center gap-3 mt-6 text-sm text-slate-400">
            <span>2.5 hrs/day</span>
            <span className="text-slate-600">|</span>
            <span>3 blocks daily</span>
            <span className="text-slate-600">|</span>
            <span>4 weeks + exit gate</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #7C3AED, #EA580C, #2563EB, #16a34a)' }} />
      </section>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex gap-2 border-b border-slate-200">
          {([['plan', 'Practice Plan'], ['workbook', 'Workbook'], ['textbook', 'Mini-Textbook']] as const).map(([key, label]) => (
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
          <TOCNav items={tab === 'plan' ? PLAN_TOC : tab === 'workbook' ? WORKBOOK_TOC : TEXTBOOK_TOC} />
          <article className="prose-slate max-w-none">
            {tab === 'plan' ? <PracticePlanContent /> : tab === 'workbook' ? <WorkbookContent /> : <TextbookContent />}
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
