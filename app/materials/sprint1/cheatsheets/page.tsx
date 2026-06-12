'use client'

const BC = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 text-slate-800">{children}</code>
)

function Asset({ file, title, height = 480 }: { file: string; title: string; height?: number }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100" style={{ background: '#f8fafc' }}>
        <span className="text-xs font-bold text-slate-600">{title}</span>
        <a href={`/assets/sprint1/${file}`} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Open full ↗</a>
      </div>
      <iframe src={`/assets/sprint1/${file}`} className="w-full border-none" style={{ height }} title={title} />
    </div>
  )
}

const DICHORD_DATA = [
  { bracket: '[1]', name: 'Minor 2nd', semi: 1, pulsation: '8 Hz', harmonicity: 'Very low', feel: 'Harsh, biting, maximum tension', color: '#922B21' },
  { bracket: '[2]', name: 'Major 2nd', semi: 2, pulsation: '8 Hz', harmonicity: 'Low', feel: 'Buzzy, energetic, wants to move', color: '#922B21' },
  { bracket: '[3]', name: 'Minor 3rd', semi: 3, pulsation: '4 Hz', harmonicity: 'Medium', feel: 'Warm, shadowed — the minor sound', color: '#5B2C6F', sprint1: true },
  { bracket: '[4]', name: 'Major 3rd', semi: 4, pulsation: '4 Hz', harmonicity: 'Med-high', feel: 'Bright, warm — the major sound', color: '#5B2C6F', sprint1: true },
  { bracket: '[5]', name: 'Perfect 4th', semi: 5, pulsation: '2 Hz', harmonicity: 'High', feel: 'Open, reaching, suspended', color: '#1E8449' },
  { bracket: '[6]', name: 'Tritone', semi: 6, pulsation: '8 Hz', harmonicity: 'Very low', feel: 'Maximum harmonic tension — must resolve', color: '#922B21' },
  { bracket: '[7]', name: 'Perfect 5th', semi: 7, pulsation: '2 Hz', harmonicity: 'High', feel: 'Hollow, stable, farthest stable reach', color: '#1E8449' },
  { bracket: '[8]', name: 'Minor 6th', semi: 8, pulsation: '4 Hz', harmonicity: 'Medium', feel: 'Dark, tender — minor from below', color: '#5B2C6F' },
  { bracket: '[9]', name: 'Major 6th', semi: 9, pulsation: '4 Hz', harmonicity: 'Med-high', feel: 'Bright, lifting — emotional openness', color: '#5B2C6F' },
  { bracket: '[10]', name: 'Minor 7th', semi: 10, pulsation: '4 Hz', harmonicity: 'Med-low', feel: 'Incomplete, longing — wants to resolve', color: '#5B2C6F' },
  { bracket: '[11]', name: 'Major 7th', semi: 11, pulsation: '8 Hz', harmonicity: 'Low', feel: 'Bright tension — close to octave, unresolved', color: '#922B21' },
]

function CheatCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: color + '40' }}>
      <div className="px-5 py-3" style={{ background: color, color: 'white' }}>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      <div className="p-5 bg-white">
        {children}
      </div>
    </div>
  )
}

export default function Sprint1CheatsheetsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#0f172a' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">Sprint 1 — Orientation</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Cheat Sheets</h1>
          <p className="text-lg text-slate-300 max-w-2xl">Quick-reference cards for every Sprint 1 concept. Keep these visible during practice — print, bookmark, or open on a second screen.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6)' }} />
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Card 1: Di-Chord Quick Reference */}
        <CheatCard title="All 11 Di-Chords — Quick Reference" color="#0f172a">
          <p className="text-sm text-slate-600 mb-4">The complete di-chord system. Sprint 1 focuses on <BC>[3]</BC> and <BC>[4]</BC> (highlighted). Three pulsation classes: <span className="font-bold" style={{ color: '#922B21' }}>Dissonant (8 Hz)</span> · <span className="font-bold" style={{ color: '#5B2C6F' }}>Modal (4 Hz)</span> · <span className="font-bold" style={{ color: '#1E8449' }}>Perfect (2 Hz)</span></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="py-2 px-2 text-left text-slate-700">Bracket</th>
                  <th className="py-2 px-2 text-left text-slate-700">Interval</th>
                  <th className="py-2 px-2 text-center text-slate-700">Semi</th>
                  <th className="py-2 px-2 text-center text-slate-700">Pulsation</th>
                  <th className="py-2 px-2 text-center text-slate-700">Harmonicity</th>
                  <th className="py-2 px-2 text-left text-slate-700">Perceptual Feel</th>
                </tr>
              </thead>
              <tbody>
                {DICHORD_DATA.map(d => (
                  <tr key={d.bracket} className={`border-b border-slate-100 ${d.sprint1 ? 'bg-amber-50 font-medium' : ''}`}>
                    <td className="py-1.5 px-2 font-mono font-bold" style={{ color: d.color }}>{d.bracket}</td>
                    <td className="py-1.5 px-2">{d.name}</td>
                    <td className="py-1.5 px-2 text-center text-slate-500">{d.semi}</td>
                    <td className="py-1.5 px-2 text-center" style={{ color: d.color }}>{d.pulsation}</td>
                    <td className="py-1.5 px-2 text-center text-slate-600">{d.harmonicity}</td>
                    <td className="py-1.5 px-2 text-xs text-slate-600">{d.feel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CheatCard>

        {/* Card 2: [3] vs [4] Focus */}
        <CheatCard title="Sprint 1 Focus: [3] vs. [4]" color="#5B2C6F">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 rounded-lg border-2 border-purple-200 bg-purple-50">
              <p className="text-lg font-black text-purple-900 mb-2"><BC>[3]</BC> — Minor Third</p>
              <ul className="text-sm text-purple-900 space-y-1">
                <li><strong>Pulsation:</strong> 4 Hz (modal — smooth, flowing)</li>
                <li><strong>F/O Factor:</strong> Refers down (shadow left)</li>
                <li><strong>Harmonicity:</strong> Non-harmonic (dark, closed)</li>
                <li><strong>Feel:</strong> Warm but shadowed. Notes attract. Minor chords sound minor because of <BC>[3]</BC> between root and third.</li>
                <li><strong>At the piano:</strong> A + C (3 semitones)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-2 border-amber-200 bg-amber-50">
              <p className="text-lg font-black text-amber-900 mb-2"><BC>[4]</BC> — Major Third</p>
              <ul className="text-sm text-amber-900 space-y-1">
                <li><strong>Pulsation:</strong> 4 Hz (modal — same as [3])</li>
                <li><strong>F/O Factor:</strong> Refers down (shadow left — same)</li>
                <li><strong>Harmonicity:</strong> Harmonic (light, open)</li>
                <li><strong>Feel:</strong> Bright and warm. Notes push apart. Major chords sound major because of <BC>[4]</BC> between root and third.</li>
                <li><strong>At the piano:</strong> A + C# (4 semitones)</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700">
            <strong>The only difference:</strong> <BC>[3]</BC> and <BC>[4]</BC> are twins in two of three properties (same pulsation, same shadow direction). The only difference is harmonicity — closed vs. open, dark vs. light. Learn to hear this one distinction and you can tell major from minor by ear, instantly, forever.
          </div>
          <div className="mt-6">
            <Asset file="R1_focus_card_3_4.html" title="R1 — [3]/[4] Focus Card" height={380} />
          </div>
        </CheatCard>

        {/* Card 3: Three Sound Factors */}
        <CheatCard title="The Three Sound Factors" color="#1a5a8a">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm font-black text-red-900 mb-1">1. Pulsation</p>
              <p className="text-xs text-red-800">The beating/flickering when two notes sound together. Fast = tense. Slow = stable.</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><span className="font-bold" style={{ color: '#922B21' }}>8 Hz (Dissonant):</span> [1] [2] [6] [10] [11]</p>
                <p><span className="font-bold" style={{ color: '#5B2C6F' }}>4 Hz (Modal):</span> [3] [4] [8] [9]</p>
                <p><span className="font-bold" style={{ color: '#1E8449' }}>2 Hz (Perfect):</span> [5] [7]</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm font-black text-blue-900 mb-1">2. F/O Factor (Shadow)</p>
              <p className="text-xs text-blue-800">Direction the interval &ldquo;refers&rdquo; — toward the fundamental or toward the octave.</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Refers DOWN ↓:</strong> [1]–[5]</p>
                <p><strong>Refers BOTH ↕:</strong> [6]</p>
                <p><strong>Refers UP ↑:</strong> [7]–[11]</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-black text-green-900 mb-1">3. Harmonicity (Color)</p>
              <p className="text-xs text-green-800">How fused the two notes sound. Harmonic = blend into one. Non-harmonic = stay separate.</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Harmonic (open):</strong> [2] [4] [7] [9] [10]</p>
                <p><strong>Non-harmonic (closed):</strong> [1] [3] [5] [8] [11]</p>
                <p><strong>Neutral:</strong> [6]</p>
              </div>
            </div>
          </div>
          <Asset file="R4_sound_factors_reference.html" title="R4 — Di-Chord Sound Factors Reference" height={500} />
          <div className="mt-6">
            <Asset file="R3_pulsation_diagram.html" title="R3 — Pulsation Wave Diagram" height={400} />
          </div>
        </CheatCard>

        {/* Card 4: Pictograph */}
        <CheatCard title="The Di-Chord Pictograph" color="#0f172a">
          <p className="text-sm text-slate-600 mb-4">Each di-chord has a unique visual glyph encoding all three sound factors. <strong>Shape</strong> = pulsation class. <strong>Shadow direction</strong> = F/O factor. <strong>Fill color</strong> = harmonicity.</p>
          <Asset file="R2_pictograph_reference.html" title="R2 — Full Pictograph Reference" height={600} />
        </CheatCard>

        {/* Card 5: Hear → Sing → Name */}
        <CheatCard title="The Hear → Sing → Name Workflow" color="#dc2626">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200 text-center">
              <p className="text-3xl font-black text-red-900">1</p>
              <p className="text-sm font-bold text-red-800">HEAR</p>
              <p className="text-xs text-red-700 mt-1">Let the interval ring for 3–5 seconds. Receive the sound quality before doing anything. Do not analyze.</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 border-2 border-amber-200 text-center">
              <p className="text-3xl font-black text-amber-900">2</p>
              <p className="text-sm font-bold text-amber-800">SING</p>
              <p className="text-xs text-amber-700 mt-1">Reproduce the interval with your voice. Quiet humming is fine. Your voice encodes the sound differently than your hands.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200 text-center">
              <p className="text-3xl font-black text-green-900">3</p>
              <p className="text-sm font-bold text-green-800">NAME</p>
              <p className="text-xs text-green-700 mt-1">Now identify it: &ldquo;[3]&rdquo; or &ldquo;[4].&rdquo; The name follows the perception. Never name before hearing.</p>
            </div>
          </div>
          <Asset file="O3_hear_sing_name_cycle.html" title="O3 — Hear → Sing → Name Cycle" height={380} />
        </CheatCard>

        {/* Card 6: Zone 1 Maps */}
        <CheatCard title="Zone 1 — Chord Tones on Both Instruments" color="#166534">
          <p className="text-sm text-slate-600 mb-4">Zone 1 = the root, third, and fifth of the current chord. The most stable, resolved melodic choices. Sprint 1 lives entirely in Zone 1.</p>
          <div className="mb-6 overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="py-2 px-3 text-left text-slate-700">Chord</th>
                  <th className="py-2 px-3 text-left text-slate-700">Root</th>
                  <th className="py-2 px-3 text-left text-slate-700">Third</th>
                  <th className="py-2 px-3 text-left text-slate-700">Fifth</th>
                  <th className="py-2 px-3 text-left text-slate-700">Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 px-3 font-bold">Am</td><td className="py-2 px-3">A</td><td className="py-2 px-3">C <span className="text-xs text-slate-400">(<BC>[3]</BC>)</span></td><td className="py-2 px-3">E <span className="text-xs text-slate-400">(<BC>[7]</BC>)</span></td><td className="py-2 px-3 text-sm text-purple-700">Minor</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 px-3 font-bold">G</td><td className="py-2 px-3">G</td><td className="py-2 px-3">B <span className="text-xs text-slate-400">(<BC>[4]</BC>)</span></td><td className="py-2 px-3">D <span className="text-xs text-slate-400">(<BC>[7]</BC>)</span></td><td className="py-2 px-3 text-sm text-amber-700">Major</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 px-3 font-bold">Em</td><td className="py-2 px-3">E</td><td className="py-2 px-3">G <span className="text-xs text-slate-400">(<BC>[3]</BC>)</span></td><td className="py-2 px-3">B <span className="text-xs text-slate-400">(<BC>[7]</BC>)</span></td><td className="py-2 px-3 text-sm text-purple-700">Minor</td></tr>
                <tr><td className="py-2 px-3 font-bold">Dm</td><td className="py-2 px-3">D</td><td className="py-2 px-3">F <span className="text-xs text-slate-400">(<BC>[3]</BC>)</span></td><td className="py-2 px-3">A <span className="text-xs text-slate-400">(<BC>[7]</BC>)</span></td><td className="py-2 px-3 text-sm text-purple-700">Minor</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mb-4"><strong>Notice:</strong> Minor chords have <BC>[3]</BC> from root to third (dark, closed). Major chords have <BC>[4]</BC> (bright, open). The fifth is always <BC>[7]</BC> (stable).</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Asset file="E1_zone1_guitar_fretboard.html" title="E1 — Zone 1 Guitar Fretboard" height={480} />
            <Asset file="E2_zone1_piano_keyboard.html" title="E2 — Zone 1 Piano Keyboard" height={400} />
          </div>
        </CheatCard>

        {/* Card 7: Root Movement Preview */}
        <CheatCard title="Root Movement — Di-Chord at the Harmony Level" color="#92400e">
          <p className="text-sm text-slate-600 mb-4">The same di-chord vocabulary that describes melodic intervals also describes how chord roots move. This is the founding insight of AMF: the Musical OS and the Harmony Chamber are the same ear at different magnification.</p>
          <div className="mb-6 overflow-x-auto">
            <table className="text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="py-2 px-3 text-left text-slate-700">Movement</th>
                  <th className="py-2 px-3 text-left text-slate-700">Di-Chord</th>
                  <th className="py-2 px-3 text-left text-slate-700">Feel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100"><td className="py-2 px-3">Am → G</td><td className="py-2 px-3 font-mono"><BC>[2]</BC> step down</td><td className="py-2 px-3 text-xs text-slate-600">Small step — tension builder</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 px-3">G → Em</td><td className="py-2 px-3 font-mono"><BC>[3]</BC> minor 3rd down</td><td className="py-2 px-3 text-xs text-slate-600">Darkening — the minor shift</td></tr>
                <tr className="border-b border-slate-100"><td className="py-2 px-3">Em → Am</td><td className="py-2 px-3 font-mono"><BC>[5]</BC> perfect 4th up</td><td className="py-2 px-3 text-xs text-slate-600">Resolution — returning home</td></tr>
                <tr><td className="py-2 px-3">G → Am</td><td className="py-2 px-3 font-mono"><BC>[2]</BC> step up</td><td className="py-2 px-3 text-xs text-slate-600">Small lift back to tonic</td></tr>
              </tbody>
            </table>
          </div>
          <Asset file="E3_root_movement_preview.html" title="E3 — Di-Chord → Root Movement Preview" height={400} />
        </CheatCard>

        {/* Card 8: 8-Position Rhythm Grid */}
        <CheatCard title="The 8-Position Rhythm Grid" color="#1e3a8a">
          <p className="text-sm text-slate-600 mb-4">Every measure divided into 8 equal positions. Position 1 = beat one (strongest). Position 5 = beat three (second strongest). The grid is binary: each position is either active (sound) or inactive (silence).</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs">
              <p className="font-bold text-blue-900 mb-1">Basic Groove</p>
              <p className="font-mono text-blue-800">X · · · X · · ·</p>
              <p className="text-blue-700 mt-1">Positions 1 and 5 only. The skeleton.</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs">
              <p className="font-bold text-blue-900 mb-1">Down-Down-Up</p>
              <p className="font-mono text-blue-800">X · · · X x · ·</p>
              <p className="text-blue-700 mt-1">Add light upstroke on 6 (Week 3).</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs">
              <p className="font-bold text-blue-900 mb-1">Anticipation</p>
              <p className="font-mono text-blue-800">· · · · X · · X</p>
              <p className="text-blue-700 mt-1">Position 1 moves to position 8 of previous measure. Forward momentum.</p>
            </div>
          </div>
          <Asset file="O2_rhythm_grid_card.html" title="O2 — 8-Position Rhythm Grid" height={580} />
        </CheatCard>

        {/* Card 9: Daily Session Map */}
        <CheatCard title="Daily Session — 60 Minutes, 5 Sections" color="#115e59">
          <div className="space-y-2 mb-6">
            {[
              { section: 'S1', name: 'Plogger Foundation', time: '10 min', desc: 'Di-chord ear training: [3] vs [4], Hear→Sing→Name', color: '#1e40af' },
              { section: 'S2', name: 'Integrated Work', time: '18 min', desc: 'Zone 1 on both instruments + rhythm grid', color: '#166534' },
              { section: 'S3', name: 'Song Work', time: '14 min', desc: "Ain't No Sunshine — chords, melody, feel", color: '#92400e' },
              { section: 'S4', name: 'Free Play', time: '10 min', desc: 'Zone 1 improvisation — ear-led, stay in zone', color: '#6b21a8' },
              { section: 'S5', name: 'The Synthesizer', time: '8 min', desc: 'All four chambers simultaneously — integration', color: '#115e59' },
            ].map(s => (
              <div key={s.section} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: s.color + '30', background: s.color + '08' }}>
                <span className="text-xs font-black px-2 py-1 rounded text-white" style={{ background: s.color }}>{s.section}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold" style={{ color: s.color }}>{s.name}</span>
                  <span className="text-xs text-slate-500 ml-2">{s.desc}</span>
                </div>
                <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{s.time}</span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-6">
            <strong>Order matters.</strong> S1 primes the ear → S2 connects ear to hands → S3 puts it in the song → S4 lets you own it → S5 integrates everything. Do not skip or reorder.
          </div>
          <Asset file="O4_daily_session_map.html" title="O4 — Sprint 1 Daily Session Map" height={420} />
        </CheatCard>

        {/* Card 10: Ain't No Sunshine */}
        <CheatCard title="Anchor Song: Ain't No Sunshine" color="#78350f">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm font-bold text-amber-900 mb-2">Why This Song</p>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Minor quality — Zone 1 over Am reinforces <BC>[3]</BC></li>
                <li>• Simple 3-chord structure (Am, G, Em)</li>
                <li>• Accessible on both guitar and piano</li>
                <li>• Iconic stop-time &ldquo;I know&rdquo; section</li>
                <li>• Unambiguous minor feel</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-sm font-bold text-slate-700 mb-2">Key: A Minor</p>
              <div className="text-xs text-slate-600 space-y-1">
                <p><strong>Verse:</strong> Am → Am → G → Em → Am → Am → G → Am</p>
                <p><strong>&ldquo;I know&rdquo;:</strong> Am (stop-time, ~26 repetitions)</p>
                <p><strong>Piano Zone 1:</strong> Am=A-C-E, G=G-B-D, Em=E-G-B</p>
                <p><strong>Guitar:</strong> Open position Am, G, Em shapes</p>
              </div>
            </div>
          </div>
          <Asset file="O1_aint_no_sunshine_analysis.html" title="O1 — Ain't No Sunshine Analysis Sheet" height={700} />
        </CheatCard>

        {/* Card 11: Three Stages + Three Errors */}
        <CheatCard title="The Three Stages & Three Causes of Error" color="#6b21a8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm font-black text-purple-900 mb-1">Stage 1 — Discovering</p>
              <p className="text-xs text-purple-800">First contact. Errors expected. Do not stop at errors — they are the curriculum. Move with curiosity.</p>
              <p className="text-xs text-purple-600 mt-2 italic">&ldquo;Sculptor roughing out stone.&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm font-black text-purple-900 mb-1">Stage 2 — Consolidating</p>
              <p className="text-xs text-purple-800">Slow, deliberate, errors systematically removed. The longest stage. &ldquo;I can do it slowly&rdquo; = Stage 2. This is not the gate.</p>
              <p className="text-xs text-purple-600 mt-2 italic">&ldquo;The waiting room.&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="text-sm font-black text-purple-900 mb-1">Stage 3 — Fluent</p>
              <p className="text-xs text-purple-800">Automatic, at performance speed, without conscious attention. Correct on both instruments, in 3+ keys, by ear in real time. This IS the gate.</p>
              <p className="text-xs text-purple-600 mt-2 italic">&ldquo;The framework disappears.&rdquo;</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs">
              <span className="font-bold text-red-900">REACTION</span> <span className="text-red-700">— Sudden freeze, zoom-in, memory slip. Cure: Eagle Vision — expand awareness to include ALL parameters. Be in the overview.</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
              <span className="font-bold text-amber-900">ANTICIPATION</span> <span className="text-amber-700">— Wrong without noticing. Mind disengages from senses. Cure: Lead with the sensory modality appropriate to the task.</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs">
              <span className="font-bold text-blue-900">LOOKING BACK</span> <span className="text-blue-700">— Judging during performance. The coach jumped in the pool. Cure: &ldquo;Coach out!&rdquo; Trust your inner athlete. Reflect AFTER, not during.</span>
            </div>
          </div>
        </CheatCard>

        {/* Card 12: Mastery Gates */}
        <CheatCard title="Sprint 1 Mastery Gates" color="#dc2626">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border-2 border-blue-300 bg-blue-50">
              <p className="text-sm font-black text-blue-900 mb-2">Gate B — Plogger [3]/[4]</p>
              <ul className="text-xs text-blue-800 space-y-1.5">
                <li><strong>Trial 1:</strong> 10 random [3]/[4] from different roots → 10/10</li>
                <li><strong>Trial 2:</strong> Sing [3] from 5 pitches → 4/5 within half step</li>
                <li><strong>Trial 3:</strong> Sing [4] from 5 pitches → 4/5 within half step</li>
                <li><strong>Trial 4:</strong> Real-time ID in melody → 10/10</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border-2 border-amber-300 bg-amber-50">
              <p className="text-sm font-black text-amber-900 mb-2">Performance Gate — Ain&rsquo;t No Sunshine</p>
              <ul className="text-xs text-amber-800 space-y-1.5">
                <li><strong>Test 1:</strong> Guitar — start to finish, no stops, recognizable</li>
                <li><strong>Test 2:</strong> Piano — same standard</li>
                <li><strong>Test 3:</strong> Sing root of each chord while playing</li>
                <li><strong>Test 4:</strong> Identify Zone 1 melody notes by ear → 3/4</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-red-700 font-bold mt-4 text-center">Both gates must clear in the same session, without warm-up, on the same day.</p>
        </CheatCard>

      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-10 mt-8 border-t border-slate-200">
        <p className="text-xs text-slate-400">Adaptable Musician&rsquo;s Framework — Sprint 1 Cheat Sheets</p>
        <p className="text-xs text-slate-400 mt-1">
          See also: <a href="/materials/sprint1/textbook" className="underline hover:text-slate-600">Mini-Textbook</a> · <a href="/materials/sprint1/practice" className="underline hover:text-slate-600">Practice Plan &amp; Workbook</a> · <a href="/materials/sprint1" className="underline hover:text-slate-600">Asset Gallery</a>
        </p>
      </footer>

      <style>{`
        @media print {
          footer { display: none !important; }
          section[style*="0f172a"] { background: white !important; color: black !important; }
          section[style*="0f172a"] * { color: black !important; }
          iframe { border: 1px solid #ccc; }
          .rounded-xl { break-inside: avoid; }
        }
      `}</style>
    </main>
  )
}
