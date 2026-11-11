import { Keys, Voices, PathsGap, Moments, identityHex, type Panel } from './Diagrams'
import { Fig, Grid, Legend } from './parts'
import { FIVE_CASES, M, noteName } from '@/lib/soundscape/week2/lesson2a-facts'

// Lesson 2B figures. Every pitch and size comes from lesson2a-facts (the V2 five locked cases). Own instrument only: nothing plays.
const P = (title: string, lo: number, up: number, lo2: number, up2: number, a?: string, b?: string, extra: Partial<Panel> = {}): Panel => ({ title, before: { lo, up }, after: { lo: lo2, up: up2 }, labelBefore: a, labelAfter: b, ...extra })
const C = FIVE_CASES
const label = (c: (typeof C)[number]) => `${c.name}, ${c.semis}`

/** Step 2: the two things to look at. No pitches, no answers. */
export const s2 = () => (
  <Fig cap="Two views of the same music: the gap between the notes at one moment (vertical), and each voice's path from moment to moment (horizontal)."><PathsGap title="Two voices as paths through time" desc="Two lines move left to right through time. The upper line is drawn with a square, the lower with a circle. A vertical double arrow between the lines is labelled vertical interval: the distance at one moment. A horizontal arrow beneath is labelled horizontal motion: each voice from one moment to the next. No notes or sizes are shown." /></Fig>
)

/** Step 3: directions only. No sizes, no motion names. */
export const s3 = () => (
  <Fig cap="Two journeys, both from C4 + E4. The lines show direction only.">
    <Grid>
      <Voices panels={[P('Journey 1', M.C4, M.E4, M.B3, M.F4)]} title="Journey 1: lower down, upper up" desc="Both voices start together on C4 and E4. The lower voice goes down to B3. The upper voice goes up to F4. Direction only." />
      <Voices panels={[P('Journey 2', M.C4, M.E4, M.D4, M.F4)]} title="Journey 2: lower up, upper up" desc="Both voices start together on C4 and E4. The lower voice goes up to D4. The upper voice goes up to F4. Direction only." />
    </Grid>
    <Legend />
  </Fig>
)

/** Step 4: the three families, notes only (no interval sizes). */
export const s4 = () => (
  <Fig cap="The three families, each from C4 + E4: oblique (one holds), contrary (opposite directions), similar (same direction).">
    <Grid>
      <Voices panels={[P('Oblique', M.C4, M.E4, M.C4, M.F4, undefined, undefined, { moves: { lo: 'holds', up: '+1' } })]} title="Oblique motion" desc="Lower voice holds C4 as a flat line. Upper voice rises from E4 to F4." />
      <Voices panels={[P('Contrary', M.C4, M.E4, M.B3, M.F4, undefined, undefined, { moves: { lo: '−1', up: '+1' } })]} title="Contrary motion" desc="Lower voice falls from C4 to B3. Upper voice rises from E4 to F4. Opposite directions." />
      <Voices panels={[P('Similar', M.C4, M.E4, M.D4, M.F4, undefined, undefined, { moves: { lo: '+2', up: '+1' } })]} title="Similar motion" desc="Lower voice rises two semitones from C4 to D4. Upper voice rises one semitone from E4 to F4. Same direction, unequal amounts." />
    </Grid>
    <Legend />
  </Fig>
)

/** Step 5: B3-F4 (five letters, six hops) beside C4-F#4 (four letters, six hops). */
export const s5 = () => (
  <Fig cap="Same size, different spelling. B3 to F4: five letters, six semitone moves. C4 to F♯4: four letters, six semitone moves.">
    <Grid>
      <Keys from={59} to={65} kw={40} accent={identityHex(6)} marks={[{ midi: 59, voice: 'lower', label: 'B3' }, { midi: 65, voice: 'upper', label: 'F4' }]} letters={{ from: 59, to: 65 }} hops={[59, 60, 61, 62, 63, 64, 65]} title="B3 to F4: five letters, six semitones" desc="White keys B3, C4, D4, E4, F4 numbered 1 to 5 beneath. Six semitone moves counted above, from zero on B3 to six on F4. A diminished fifth." />
      <Keys from={60} to={67} kw={36} accent={identityHex(6)} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 66, voice: 'upper', label: 'F♯4' }]} letters={{ from: 60, to: 65 }} hops={[60, 61, 62, 63, 64, 65, 66]} title="C4 to F sharp 4: four letters, six semitones" desc="White keys C4, D4, E4, F4 numbered 1 to 4 beneath. Six semitone moves counted above, from zero on C4 to six on F sharp 4. An augmented fourth." />
    </Grid>
    <Legend />
  </Fig>
)

/** Step 6, first figure: the lesson's case B5, +2 and +1, sizes 4 to 3. */
export const s6a = () => {
  const c = C[4]
  return (
    <Fig cap="Similar motion: the lower voice rises two semitones, the upper one. The interval narrows from 4 to 3."><Voices panels={[P('C4 + E4 → ' + noteName(c.lo2) + ' + ' + noteName(c.up2), M.C4, M.E4, c.lo2, c.up2, 'major third, 4', label(c), { accent: identityHex(c.semis), moves: { lo: '+2', up: '+1' } })]} title="Similar motion: C4 + E4 to D4 + F4" desc="Lower voice rises two semitones from C4 to D4. Upper voice rises one semitone from E4 to F4. The interval narrows from a major third of four semitones to a minor third of three." /></Fig>
  )
}
/** Step 6, second figure: clearly NOT one of the five. */
export const s6b = () => (
  <Fig cap="Illustration only, not one of the five changes: both voices rise by two semitones, so the interval keeps its size (4 and 4). That is parallel in this course."><Voices panels={[P('Illustration: parallel', M.C4, M.E4, M.D4, M.Fs4, 'major third, 4', 'major third, 4', { accent: identityHex(4), moves: { lo: '+2', up: '+2' } })]} title="Parallel illustration: C4 + E4 to D4 + F sharp 4" desc="Illustration, not one of the lesson's five changes. Lower voice rises two semitones from C4 to D4. Upper voice rises two semitones from E4 to F sharp 4. The interval stays a major third of four semitones." /></Fig>
)

/** Step 8: five panels, one per locked case. */
const MOVE = (d: number) => (d === 0 ? 'holds' : d > 0 ? `+${d}` : `−${-d}`)
export const s8 = () => (
  <Fig cap="The five locked changes, each from C4 + E4: which voice moved, which way, how far, and the interval reached.">
    <Grid>
      {C.map((c, i) => (
        <Voices key={c.id} panels={[P(`${i + 1} · ${c.motion[0].toUpperCase()}${c.motion.slice(1)}`, M.C4, M.E4, c.lo2, c.up2, 'major third, 4', label(c), { accent: identityHex(c.semis), moves: { lo: MOVE(c.dl), up: MOVE(c.du) } })]} title={`Change ${i + 1}: ${c.motion}`} desc={`From C4 and E4. Lower voice ${c.dl === 0 ? 'holds' : `moves ${c.dl > 0 ? 'up' : 'down'} ${Math.abs(c.dl)} semitone${Math.abs(c.dl) > 1 ? 's' : ''} to ${noteName(c.lo2)}`}. Upper voice ${c.du === 0 ? 'holds' : `moves ${c.du > 0 ? 'up' : 'down'} ${Math.abs(c.du)} semitone${Math.abs(c.du) > 1 ? 's' : ''} to ${noteName(c.up2)}`}. ${c.motion[0].toUpperCase()}${c.motion.slice(1)} motion. Result ${noteName(c.lo2)} + ${noteName(c.up2)}: ${c.letters} letters, ${c.semis} semitones, ${c.name}.`} />
      ))}
    </Grid>
    <Legend />
  </Fig>
)

/** Step 10: the example path, four moments joined by three arrows. */
export const s10 = () => (
  <Fig cap="A short two-voice path: four moments, three moves. The intervals go 4, 5, 6, 4."><Moments moments={[{ lo: M.C4, up: M.E4, size: 4, name: 'major third' }, { lo: M.C4, up: M.F4, size: 5, name: 'perfect fourth' }, { lo: M.B3, up: M.F4, size: 6, name: 'diminished fifth' }, { lo: M.C4, up: M.E4, size: 4, name: 'major third' }]} arrows={['oblique / upper rises', 'oblique / lower falls', 'contrary / converging']} title="Example path: C4 + E4, C4 + F4, B3 + F4, C4 + E4" desc="Four moments. First C4 and E4, a major third of four semitones. Then the upper voice rises to F4 while the lower holds C4: oblique motion, a perfect fourth of five. Then the lower voice falls to B3 while the upper holds F4: oblique motion, a diminished fifth of six. Then the lower voice rises to C4 and the upper falls to E4, toward each other: contrary motion, converging, a major third of four." /></Fig>
)

export const sheetLink = () => (
  <p className="m4-notice">Prefer paper? <a href="/curriculum/soundscape-path/week-2/lesson-2b/practice-sheet">Open the printable two-lane path sheet</a>. It makes no sound and has no answers on it.</p>
)

// ---- Batch 2 supplied artwork (review candidates, not final approval). Placed where the founder specified. ----
import { Art } from './Art'
import { ArtReveal } from './ArtReveal'
const Pic = ({ children }: { children: React.ReactNode }) => <div className="w2-art">{children}</div>
/** Step 4: the three movement families, after they are introduced. */
export const a01 = () => <Pic><Art stem="W2-2B-01_three_motion_families" alt="Three motion families drawn as two voice paths that all start from C4 and E4. Oblique: C4 holds while E4 rises to F4. Contrary: C4 falls to B3 while E4 rises to F4. Similar: C4 rises to D4 while E4 rises to F4." /></Pic>
/** Step 5: after the contrary motion and six semitones have been explained. */
export const a02 = () => <Pic><Art stem="W2-2B-02_contrary_tritone" alt="Contrary motion. The lower voice falls from C4 to B3, minus one semitone. The upper voice rises from E4 to F4, plus one semitone. The resulting pair B3 and F4 is a diminished fifth, six semitones." /></Pic>
/** Step 6: after similar motion is introduced. */
export const a03 = () => <Pic><Art stem="W2-2B-03_similar_minor_third" alt="Similar motion. The lower voice rises from C4 to D4, plus two semitones. The upper voice rises from E4 to F4, plus one semitone. The resulting pair D4 and F4 is a minor third, three semitones." /></Pic>
/** Step 8: five separate worked examples, each behind its own reveal. Never shown together on load. */
export const a04set = () => (
  <div className="w2-reveals">
    <p className="w2-reveal-lead">Try each change on your own instrument first. Then open its example to check yourself.</p>
    <ArtReveal n={1} label="hold C4, move E4" stem="W2-2B-04a_only_upper_rises" alt="Example 1, only the upper voice rises. C4 holds and E4 rises one semitone to F4. Oblique motion. The pair C4 and F4 is a perfect fourth, five semitones." />
    <ArtReveal n={2} label="hold E4, move C4" stem="W2-2B-04b_only_lower_falls" alt="Example 2, only the lower voice falls. E4 holds and C4 falls one semitone to B3. Oblique motion. The pair B3 and E4 is a perfect fourth, five semitones." />
    <ArtReveal n={3} label="hold E4, move C4" stem="W2-2B-04c_only_lower_rises" alt="Example 3, only the lower voice rises. E4 holds and C4 rises two semitones to D4. Oblique motion. The pair D4 and E4 is a major second, two semitones." />
    <ArtReveal n={4} label="move both voices" stem="W2-2B-04d_both_move_apart" alt="Example 4, both voices move apart. C4 falls one semitone to B3 and E4 rises one semitone to F4. Contrary motion. The pair B3 and F4 is a diminished fifth, six semitones." />
    <ArtReveal n={5} label="move both voices" stem="W2-2B-04e_both_rise" alt="Example 5, both voices rise. C4 rises two semitones to D4 and E4 rises one semitone to F4. Similar motion. The pair D4 and F4 is a minor third, three semitones." />
  </div>
)
/** Step 10: the answer-free two-lane drawing page, shown as a reference for the practice. */
export const aP01 = () => <Pic><Art stem="W2-2B-P01_two_voice_conversation_practice" alt="Practice page: draw a two-voice conversation. Two lanes, upper voice starting on E4 and lower voice starting on C4, over a timeline from 0 to 20 seconds, with empty dashed lines to sketch each voice and a blank line for which voice changed most." /></Pic>
