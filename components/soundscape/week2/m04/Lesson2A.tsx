import type { ReactNode } from 'react'
import { Stepper, Row, Lead, Reading, Try, Notice, Caveat, Aside, type StepSpec } from '../../m04/kit'
import { BASE } from '@/lib/soundscape/course'
import { Keys, Voices, TwoVoices, identityHex } from './Diagrams'

// Lesson 2A (production). Copy is W2_FINAL_CONTENT_LESSON_2A_MANUSCRIPT_V2 (2026-11-07), learner copy only.
// Own instrument only: nothing here plays sound. Exact diagrams are generated from MIDI numbers (see Diagrams.tsx). No raster art.
export const LESSON_PATH = `${BASE}/week-2/lesson-2a`
import { LESSON_2A_STEPS } from '@/lib/soundscape/course-nav'
export { LESSON_2A_STEPS }

const Fig = ({ children, cap }: { children: ReactNode; cap: ReactNode }) => <figure className="w2-fig">{children}<figcaption className="m4-cap">{cap}</figcaption></figure>
const Legend = () => <p className="w2-legend"><span className="w2-key w2-key--lo" aria-hidden="true" /> circle = lower voice · <span className="w2-key w2-key--up" aria-hidden="true" /> square = upper voice</p>
const Check = ({ items }: { items: [string, string][] }) => (
  <Try label="Check yourself">
    <ul>{items.map(([q, a]) => <li key={q}><em>{q}</em> {a}</li>)}</ul>
  </Try>
)
const Wrapup = ({ recap, bridge }: { recap: string; bridge: string }) => (
  <>
    <Reading label="Recap"><p>{recap}</p></Reading>
    <p className="m4-notice"><strong>Next.</strong> {bridge}</p>
  </>
)
const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
const doorBox = (kind: string, children: ReactNode) => <div className="m4-stepdoors"><p>Optional side door · {kind}. Never required.</p>{children}</div>
const Grid = ({ children }: { children: ReactNode }) => <div className="w2-grid">{children}</div>

const P = (title: string, lo: number, up: number, lo2: number, up2: number, a: string, b: string) => ({ title, before: { lo, up }, after: { lo: lo2, up: up2 }, labelBefore: a, labelAfter: b, accent: identityHex(up2 - lo2) })

const steps: StepSpec[] = [
  { short: LESSON_2A_STEPS[0], sub: 'Two notes can make one beautiful sound. But each note can also have a life of its own.', body: (
    <Row wide>
      <Lead>About 30 to 40 minutes, including the time you spend at your keyboard.</Lead>
      <p>Last week you chose a note to be home, and you let another note meet it. You also met the word <strong>voice</strong>: a musical line followed through time. And you met the word <strong>interval</strong>, a distance between notes. This lesson takes those two ideas and gives them exact names.</p>
      <p>By the end of this lesson you will be able to say what an interval is, count and name one on the keyboard, and build a major third and a minor third yourself. You will also be able to say what happens to the interval when one voice holds still and the other moves. You will leave with three tiny sketches of your own.</p>
      <div className="w2-inline"><Fig cap="C3 is the C from last week. This week we use C4, an octave higher: the C nearest the middle of a piano."><Keys from={48} to={64} kw={22} marks={[{ midi: 48, label: 'C3' }, { midi: 60, label: 'C4' }, { midi: 64, label: 'E4' }]} title="Keyboard from C3 to E4 with C3, C4 and E4 labelled" desc="White keys from C3 up to E4. C3 is the lowest labelled key. C4 is the C one octave above it, nearest the middle of a piano. E4 is the second white key above C4." /></Fig></div>
      <Caveat>A small note about register before we start. Last week the note under the E was a C3. This week we use <strong>C4</strong>, the C nearest the middle of a piano, an octave higher. The ideas are the same. We say “C4” so that every note has one exact address.</Caveat>
      <Try label="Before the next step">
        <p><strong>Find C4 and E4.</strong> Put a finger on the C nearest the middle of your keyboard. That is C4. Now count up the white keys, C, D, E, and put another finger on the E. That is E4. You do not need to play anything yet.</p>
      </Try>
      <Wrapup recap="This lesson is about two voices and the distance between them. We use C4 and E4." bridge="We play the two notes alone and then together." />
    </Row>
  ) },
  { short: LESSON_2A_STEPS[1], sub: 'Dyads and voices', body: (
    <Row wide>
      <p>Imagine a low note, C, held steadily, with a higher note, E, entering above it. You hear a combination, but it is made from two separate events. One part might be a warm, sustained pad. The other might be a clear single tone. Together they have a character of their own.</p>
      <p>Two notes sounding together are called a <strong>dyad</strong>. That word describes a two-note combination. It is not a chord. Last week you learned that a single held C is not a C major chord. In the same way, a dyad is only two notes, and a full chord needs more than that.</p>
      <p>When we think about those two notes as parts with their own timing and direction, we call them <strong>voices</strong>. A voice is a musical line through time. It does not have to be someone singing: a piano line or a synth pad can be a voice. We can notice where a voice begins, how long it lasts, where it pauses and where it moves.</p>
      <div className="w2-inline"><Fig cap="Each note is its own line through time. Played together, both lines are still there."><TwoVoices title="C4 alone, E4 alone, then both together" desc="Three rows on a time line. First row: a circle at the start of a line labelled C4 alone. Second row: a square at the start of a line labelled E4 alone. Third row: both lines at once, the circle line below the square line." /></Fig><Legend /><Fig cap="The two keys you will use."><Keys from={60} to={64} kw={48} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 64, voice: 'upper', label: 'E4' }]} title="C4 and E4 on the keyboard" desc="Three white keys, C4, D4 and E4. C4 is marked with a circle as the lower voice. E4 is marked with a square as the upper voice." /></Fig></div>
      <Try>
        <ol>
          <li>Play C4 by itself. This is the lower note.</li>
          <li>Play E4 by itself. This is the higher note.</li>
          <li>Play both together and keep holding them.</li>
        </ol>
        <p>Both notes are still there even if your instrument blends them into one sound. Some instruments make the two feel like one sound, and some keep them apart. Your answer may change from one instrument to another, and that is normal. If you use music software, put the two notes on two separate tracks, so that you can mute either one later.</p>
        <p>Listen first to the lower note inside the pair. Then listen to the upper. Last, listen to the space between them. That is the first skill of the week: hearing the lower part, the upper part and the relationship.</p>
      </Try>
      <Check items={[['What makes this a dyad?', 'Two different pitches sounding together.'], ['What makes the two notes into voices?', 'We can follow the lower part and the upper part separately as time passes.']]} />
      <Wrapup recap="A dyad is two notes sounding together. A voice is a line through time. C4 is the lower voice and E4 the upper." bridge="We start measuring the distance between them." />
    </Row>
  ) },
  { short: LESSON_2A_STEPS[2], sub: 'The interval number', body: (
    <Row wide>
      <p>An <strong>interval</strong> is the distance between two pitches. We give intervals names so we can recognize them, build them, and talk about them. Without names, we could only memorize which keys to press.</p>
      <p>You can experience an interval in two ways. If the two notes sound one after the other, you hear a small melodic movement. If they sound at the same time, you hear a harmonic combination. These are two ways to hear the same distance. They are not two different measurements.</p>
      <p>The name of an interval has two parts. The first part is a number, and it comes from the <strong>letter names</strong> of the notes. The second part is a word, such as <em>major</em>, <em>minor</em> or <em>perfect</em>, which tells us the exact size. We start with the number.</p>
      <p>To find the number, count the note letters from the lower note up to the higher note, and <strong>include both ends</strong>. Start at C and count to E: C is one, D is two, E is three. Three letters, so C4 to E4 is a <strong>third</strong>.</p>
      <div className="w2-inline"><Fig cap="C, D, E: three letters, counting both ends."><Keys from={60} to={64} kw={48} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 64, voice: 'upper', label: 'E4' }]} letters={{ from: 60, to: 64 }} title="Counting letters from C4 to E4" desc="White keys C4, D4 and E4 numbered 1, 2, 3 beneath. C4 is marked with a circle and E4 with a square." /></Fig><Fig cap="E, F, G: three letters again."><Keys from={64} to={67} kw={48} marks={[{ midi: 64, voice: 'lower', label: 'E4' }, { midi: 67, voice: 'upper', label: 'G4' }]} letters={{ from: 64, to: 67 }} title="Counting letters from E4 to G4" desc="White keys E4, F4 and G4 numbered 1, 2, 3 beneath. E4 is marked with a circle and G4 with a square." /></Fig></div>
      <p>That is all the number tells us. It says that the two notes are three letter names apart. It does not yet say how large that distance is on the keyboard. For that, we need a different count, and we do it next.</p>
      <Try>
        <p>Point at C4. Say “C”. Point at D4. Say “D”. Point at E4. Say “E”. You pointed at three white keys, so this is a third. Now try another pair of white keys: E4 up to G4. Say the letters E, F, G. Three letters again, so that is also a third.</p>
      </Try>
      <Check items={[['C to F: how many letters, counting both ends?', 'C, D, E, F is four. We will meet that one soon.'], ['Does counting letters tell us how wide the interval is on the keyboard?', 'Not yet. It gives us the number only.']]} />
      <Wrapup recap="An interval is the distance between two pitches. The interval number counts letter names, including both ends. C to E is a third. E to G is also a third." bridge="We count a second way: in semitones." />
    </Row>
  ) },
  { short: LESSON_2A_STEPS[3], sub: 'The size: start at zero', body: (
    <Row wide>
      <p>A <strong>semitone</strong> is the distance from one key to the very next key on the keyboard, whether that key is black or white. Last week you called this a half step. Now we use it to measure.</p>
      <p>To measure C4 up to E4, move one key at a time and count each move. Do not count the key you start on. Start at zero.</p>
      <p>C to C♯ is one move. C♯ to D is two. D to D♯ is three. D♯ to E is four.</p>
      <p>C4 to E4 is <strong>four semitone steps</strong>. Notice that you touched five keys (C, C♯, D, D♯ and E) but made only four moves. We count the moves, not the keys. If you counted C as “one”, you would end up at five and be wrong.</p>
      <div className="w2-inline"><Fig cap="C4 to E4: four moves. The start is 0. Black keys count."><Keys from={60} to={64} kw={48} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 64, voice: 'upper', label: 'E4' }]} hops={[60, 61, 62, 63, 64]} title="Counting semitone moves from C4 to E4" desc="Arrows hop from key to key, white and black. Start on C4 marked 0. Then C sharp 4 is 1, D4 is 2, D sharp 4 is 3, E4 is 4. Four moves in all." /></Fig></div>
      <p>Now measure E4 up to G4. E to F is one move, the first semitone. F to F♯ is the second semitone step. F♯ to G is the third. E4 to G4 is <strong>three semitone steps</strong>.</p>
      <div className="w2-inline"><Fig cap="E4 to G4: three moves."><Keys from={64} to={67} kw={48} marks={[{ midi: 64, voice: 'lower', label: 'E4' }, { midi: 67, voice: 'upper', label: 'G4' }]} hops={[64, 65, 66, 67]} title="Counting semitone moves from E4 to G4" desc="Arrows hop from key to key. Start on E4 marked 0. Then F4 is 1, F sharp 4 is 2, G4 is 3. Three moves in all." /></Fig></div>
      <Caveat>Be careful with the language here. When we say “the second semitone step” we are counting moves along the keyboard. That “second” has nothing to do with the interval called a second. It is only the second move you made.</Caveat>
      <p>So we have two thirds. C4 to E4 is a third that measures four semitones. E4 to G4 is also a third, and it measures three. The letters say they are both thirds. The semitones say they are different sizes. That is why a name needs two parts.</p>
      <Try>
        <p>Play C4. Now press each key in turn, white and black, up to E4, saying the count as you go: “one, two, three, four”. The last key you press is E4. Then do the same from E4 up to G4: “one, two, three”. The first count ends at four and the second ends at three.</p>
      </Try>
      <Check items={[['How many semitones from C4 to E4?', 'Four. We count the moves, not the keys we touch.'], ['How many from E4 to G4?', 'Three.'], ['Why does the count start at zero?', 'Because the note you start on has not moved yet.']]} />
      <Wrapup recap="Count letters for the number. Count semitone moves for the size. C4 to E4 is a third of four semitones. E4 to G4 is a third of three semitones." bridge="We put the two counts together and give each interval its full name." />
    </Row>
  ) },
  { short: LESSON_2A_STEPS[4], sub: 'Number and quality', body: (
    <Row wide>
      <p>Now we can name both intervals. Take C4 to E4. It is a third by letters, and it measures four semitones. We call a third of <strong>four</strong> semitones a <strong>major third</strong>. Take E4 to G4. It is also a third by letters, but it measures <strong>three</strong> semitones. We call a third of three semitones a <strong>minor third</strong>.</p>
      <p>So the number and the size answer two different questions. The number asks how many letter names apart the notes are. The quality, which is the word <em>major</em> or <em>minor</em> or <em>perfect</em>, asks how large the interval is among the possibilities for that number.</p>
      <p>Here is a rule that will carry you through the whole week. Seconds, thirds, sixths and sevenths each come in two sizes, a wider one called <strong>major</strong> and a narrower one called <strong>minor</strong>. The two sizes differ by exactly one semitone. Fourths and fifths come in a different family. Their usual size is called <strong>perfect</strong>. We will meet a perfect fourth in the next step. You do not need to memorize a table. You only need the idea that the quality tells you the size.</p>
      <div className="w2-inline"><Fig cap="Major third: 3 letters, 4 semitones."><Keys accent={identityHex(4)} from={60} to={64} kw={48} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 64, voice: 'upper', label: 'E4' }]} letters={{ from: 60, to: 64 }} hops={[60, 61, 62, 63, 64]} title="Major third, C4 to E4" desc="C4 to E4. Letters numbered 1, 2, 3 beneath the white keys. Four semitone moves counted above. Labelled major third: three letters, four semitones." /></Fig><Fig cap="Minor third: 3 letters, 3 semitones."><Keys accent={identityHex(3)} from={64} to={67} kw={48} marks={[{ midi: 64, voice: 'lower', label: 'E4' }, { midi: 67, voice: 'upper', label: 'G4' }]} letters={{ from: 64, to: 67 }} hops={[64, 65, 66, 67]} title="Minor third, E4 to G4" desc="E4 to G4. Letters numbered 1, 2, 3 beneath the white keys. Three semitone moves counted above. Labelled minor third: three letters, three semitones." /></Fig><Legend /></div>
      <p>You can already say something exact. C4 to E4 is a major third, three letters, four semitones. E4 to G4 is a minor third, three letters, three semitones. They are the same kind of thing at different sizes, and they differ by one semitone.</p>
      <Try label="Build both on your keyboard">
        <ol>
          <li>Play C4 and E4 together. Count four semitone moves from C to E. This is a major third.</li>
          <li>Play E4 and G4 together. Count three semitone moves from E to G. This is a minor third.</li>
          <li>Compare them. Which is wider? By how many semitones? (The major third is wider, by one.)</li>
        </ol>
        <p>If you like, play each pair one note after the other as well. The count does not change. Whether the notes sound together or in turn, the distance is the same.</p>
      </Try>
      <Check items={[['Why are C4–E4 and E4–G4 both thirds?', 'Each spans three letter names.'], ['Why is one major and the other minor?', 'C4–E4 is four semitones. E4–G4 is three.'], ['Why is C4–F4 not a third?', 'C, D, E, F is four letters, so it is a fourth.']]} />
      <Notice>Optional, not part of the lesson: the Interval Palette is a reference library of thirteen intervals from one note to its octave. The major third has its own entry, <a href={`${BASE}/resources/interval-palette#ip-04`}>Interval Palette, major third</a>. Open it now or later, then come straight back here.</Notice>
      <Wrapup recap="A major third has three letters and four semitones. A minor third has three letters and three semitones. Quality names the size." bridge="We hold the lower note still and let the upper note move." />
    </Row>
  ) },
  { short: LESSON_2A_STEPS[5], sub: 'Oblique motion', body: (
    <Row wide>
      <p>Start again with C4 and E4 sounding together. Keep the lower C4 held. Now move only the upper E to F.</p>
      <p>On a keyboard, E and F are neighbours. There is no black key between them, so this is a move of exactly <strong>one semitone</strong>. The upper voice has moved up by one step, and the lower voice has not moved at all.</p>
      <p>What is the interval now? Count letters from C to F, including both ends: C, D, E, F. Four letters, so it is a <strong>fourth</strong>. Count semitone moves from C to F: C to C♯, C♯ to D, D to D♯, D♯ to E, E to F. Five. A fourth of five semitones is called a <strong>perfect fourth</strong>. This is the family we mentioned in the last step. Fourths of this size are called perfect.</p>
      <p>So the pair has changed from C4 + E4, a major third of four semitones, to C4 + F4, a perfect fourth of five semitones. One voice moved by one semitone, and the interval widened by one.</p>
      <div className="w2-inline"><Fig cap="Lower C4 holds. Upper E4 moves up one semitone to F4."><Voices panels={[P('Upper voice moves', 60, 64, 60, 65, 'major third, 4', 'perfect fourth, 5')]} title="Hold C4, move E4 up to F4" desc="One panel. Before: lower voice C4, upper voice E4, labelled major third, 4 semitones. After: lower voice stays on C4 as a flat line, upper voice rises one semitone to F4, labelled perfect fourth, 5 semitones." /></Fig><Legend /></div>
      <p>There is a name for this kind of movement. When one voice stays on the same pitch and the other moves, that is <strong>oblique motion</strong>. The word <em>oblique</em> means slanted. Picture one line running flat and another line slanting away from it.</p>
      <p>The useful fact here is not that a perfect fourth feels a particular way. It is that one small, deliberate change gave you a new interval that you can name, build again and use in a piece.</p>
      <Try>
        <p>Hold C4 with one hand, or hold it down with a finger. Before you move, try to hear or picture the little rise from E to F. Hum it, or trace it along the keys without pressing. The keyboard can be a ruler for musical distance, even when you are only imagining the next note. Then, with the other hand, play E4 and move to F4. Say aloud which voice moved and which stayed. Then say how many semitones the interval is now. Play C4 + E4 again and compare it with C4 + F4.</p>
      </Try>
      <Check items={[['Which voice moved?', 'The upper voice, E to F.'], ['Which voice stayed?', 'The lower voice, C.'], ['What changed in the interval?', 'It went from a major third (4 semitones) to a perfect fourth (5 semitones).'], ['What is this kind of motion called?', 'Oblique motion: one voice holds and the other moves.']]} />
      <Wrapup recap="Hold C4, move E4 up to F4. The pair goes from a major third to a perfect fourth. This is oblique motion." bridge="We keep the upper note still and move the lower one." />
      {doorBox('History Postcard', <Aside title="Two voices were never just one idea"><p>In medieval European polyphony, one singer could sustain a long note while another line moved around it. Musicians gradually developed different ways to organize those lines, but singing together has never belonged to just one place or century. The interesting idea for us is that two voices can form a changing harmony without becoming one fixed block of notes.</p><p><em>Try:</em> Hold one note while the other slowly travels away.</p><p><em>Read more:</em> <ExtLink href="https://ocw.mit.edu/courses/21m-011-introduction-to-western-music-fall-2024/pages/week-2-recitation-2a-listening-reading-goetjen/">MIT OpenCourseWare, Introduction to Western Music, Week 2 Recitation 2A</ExtLink>.</p><p><em>Note to the reader:</em> This is one specific European example. It is not the origin of all polyphony.</p></Aside>)}
    </Row>
  ) },
  { short: LESSON_2A_STEPS[6], sub: 'Move the lower voice instead', body: (
    <Row wide>
      <p>Now reverse the roles. Go back to C4 and E4, and this time keep the <strong>upper</strong> E4 still while the <strong>lower</strong> note moves.</p>
      <p>First, let the lower C move down one semitone to the B just below it. That is B3. Now the pair is B3 and E4. Count letters from B to E: B, C, D, E. Four letters, a fourth. Count semitones from B3 to E4: B to C is one, C to C♯ is two, C♯ to D is three, D to D♯ is four, D♯ to E is five. Five semitones, a <strong>perfect fourth</strong>.</p>
      <p>Notice something. C4–F4 from the last step and B3–E4 are both perfect fourths of five semitones. They have the same size and the same name, but they use different notes, and you reached them by changing different voices. The interval is the same kind of thing, and the journey was not.</p>
      <p>Next, reset to C4 and E4. Keep E4 held again, but this time move the lower C <strong>up</strong> two semitones to D. That is C4 to D4, skipping the black key C♯. Now the pair is D4 and E4. Count letters from D to E: D, E. Two letters, a <strong>second</strong>. Count semitones: D to D♯ is one, D♯ to E is two. Two semitones, a <strong>major second</strong>. A second of two semitones is the wider kind of second, so it is major. The two voices are now close together.</p>
      <div className="w2-inline"><Fig cap="Upper E4 holds. Lower C4 moves down one semitone to B3, or (after a reset) up two to D4."><Grid><Voices panels={[P('Lower down 1', 60, 64, 59, 64, 'major third, 4', 'perfect fourth, 5')]} title="Hold E4, move C4 down to B3" desc="Before: C4 below E4, major third, 4 semitones. After: upper voice stays on E4 as a flat line, lower voice drops one semitone to B3, perfect fourth, 5 semitones." /><Voices panels={[P('Lower up 2', 60, 64, 62, 64, 'major third, 4', 'major second, 2')]} title="Hold E4, move C4 up to D4" desc="Before: C4 below E4, major third, 4 semitones. After: upper voice stays on E4 as a flat line, lower voice rises two semitones to D4, major second, 2 semitones." /></Grid></Fig><Legend /></div>
      <p>All three changes so far, the upper E to F, the lower C to B, and the lower C to D, are <strong>oblique motion</strong>. In each, one voice holds and the other moves. It does not matter whether the moving voice is the upper one or the lower one.</p>
      <Try label="On your keyboard: reset to C4 + E4 each time">
        <p>This is important, because only then can you hear which change caused which result.</p>
        <ol>
          <li>Hold E4. Move C4 down to B3. Play the new pair. Count five.</li>
          <li>Reset. Hold E4. Move C4 up to D4. Play the new pair. Count two.</li>
          <li>Say, for each: which voice moved, in which direction, and how far?</li>
        </ol>
      </Try>
      <Check items={[['If E holds and C moves down to B, which voice stayed?', 'The upper E4.'], ['Did the interval become a fifth because B is lower?', 'No. B3–E4 is four letters and five semitones: a perfect fourth.'], ['Is moving the lower voice still oblique motion?', 'Yes, because one voice still holds while the other moves.']]} />
      <Wrapup recap="From C4 + E4: upper up one gives C4–F4, perfect fourth. Lower down one gives B3–E4, perfect fourth. Lower up two gives D4–E4, major second." bridge="We line the three changes up together and compare them." />
      {doorBox('Hear It in Real Music', <Aside title="Two independent lines make an atmosphere"><p>These performances are more intricate than our two-note exercise. Listen for a steady support and another voice or line moving against it.</p><ul><li><strong>Arvo Pärt, Spiegel im Spiegel, played by Duo Gazzana.</strong> <ExtLink href="https://ecmrecords.com/duo-gazzana-new-official-video/">Official video announcement from ECM Records</ExtLink>. Listen for an intentionally spare single melody beside a repeating piano accompaniment. It is not a held C and E, but it is a beautiful study in patience and in distinct musical roles.</li><li><strong>Georgian polyphonic singing.</strong> <ExtLink href="https://www.youtube.com/watch?v=rg8xrdbnH8E">Video from UNESCO</ExtLink>. Listen for how a supporting lower part can sit with upper voices that change independently. This is a living singing tradition with its own history. It is not an interval drill.</li></ul><p><em>Transfer:</em> Create one lower part that stays recognizable while an upper part moves.</p><p><em>Rights:</em> Links only. This course stores no audio, screenshots or recordings.</p></Aside>)}
    </Row>
  ) },
  { short: LESSON_2A_STEPS[7], sub: 'One starting pair, three single changes', body: (
    <Row wide>
      <p>Here are all three changes side by side. They all start from exactly the same pair, C4 and E4, and each one changes only a single voice.</p>
      <Grid>
        <Fig cap="Hold C4, E4 up to F4: 5 semitones."><Voices panels={[P('Upper up 1', 60, 64, 60, 65, 'major third, 4', 'perfect fourth, 5')]} title="Change one: upper voice up one" desc="Lower C4 holds. Upper E4 rises to F4. Perfect fourth, 5 semitones." /></Fig>
        <Fig cap="Hold E4, C4 down to B3: 5 semitones."><Voices panels={[P('Lower down 1', 60, 64, 59, 64, 'major third, 4', 'perfect fourth, 5')]} title="Change two: lower voice down one" desc="Upper E4 holds. Lower C4 drops to B3. Perfect fourth, 5 semitones." /></Fig>
        <Fig cap="Hold E4, C4 up to D4: 2 semitones."><Voices panels={[P('Lower up 2', 60, 64, 62, 64, 'major third, 4', 'major second, 2')]} title="Change three: lower voice up two" desc="Upper E4 holds. Lower C4 rises to D4. Major second, 2 semitones." /></Fig>
      </Grid>
      <Legend />
      <div className="w2-table" role="table" aria-label="The three changes">
        <div role="row" className="w2-tr w2-th"><span role="columnheader">Change</span><span role="columnheader">Which voice moves</span><span role="columnheader">New pair</span><span role="columnheader">Letters</span><span role="columnheader">Semitones</span><span role="columnheader">Name</span></div>
        {[['Hold C4, E4 up to F4', 'Upper, up 1', 'C4 + F4', '4', '5', 'perfect fourth'], ['Hold E4, C4 down to B3', 'Lower, down 1', 'B3 + E4', '4', '5', 'perfect fourth'], ['Hold E4, C4 up to D4', 'Lower, up 2', 'D4 + E4', '2', '2', 'major second']].map(r => (
          <div role="row" className="w2-tr" key={r[0]}>{['Change', 'Which voice moves', 'New pair', 'Letters', 'Semitones', 'Name'].map((h, i) => <span role="cell" data-h={h} key={h}>{r[i]}</span>)}</div>
        ))}
      </div>
      <p>When the beginning stays the same, you can tell what each single choice contributes. That is the point of resetting each time. If you changed two things at once, you would not know which one made the difference.</p>
      <p>Read the table by rows, not by columns. In the first row, only the upper voice moves and the interval gets wider by one semitone. In the second row, only the lower voice moves, in the other direction, and the interval also gets wider by one. In the third row, the lower voice moves up two and the interval gets narrower, from four semitones to two. A voice moving up does not always make the interval wider. It depends on which voice moved.</p>
      <Try>
        <p>On a piece of paper, make three small cards, one for each change. Write “from” and “to” on each, using the note names, for example: <em>C4 + E4 → C4 + F4</em>. Then play each one in turn from a fresh C4 + E4, and tick off the four facts on your card: which voice moved, which direction, how many semitones it moved, and the new interval&apos;s name.</p>
      </Try>
      <Check items={[['In which change did the interval get narrower?', 'The third: C4 + E4 to D4 + E4, from four semitones to two.'], ['Do C4–F4 and B3–E4 have the same size?', 'Yes, five semitones each, so both are perfect fourths.'], ['Do they use the same notes?', 'No. One uses C and F, the other uses B and E.']]} />
      <Wrapup recap="One starting pair, three single changes. Two of them end on perfect fourths, one on a major second." bridge="You will make your own versions." />
      {doorBox('Behind the Sound', <Aside title="Why can two pitches seem to blend?"><p>Many pitched sounds contain a lowest tone, called the fundamental, and a series of higher tones called overtones or partials. When two sounds overlap, their overtones can sometimes line up and seem to fuse. Other combinations can feel more separate or rough, especially with rich timbres. The same two notes can behave differently on different synth patches. The interval itself, a major third or a perfect fourth, stays exactly the same even when the texture changes.</p><p><em>Try:</em> Play C4 and E4 on a plain sine-like patch, then on a bright pad. Notice what changes in the blend.</p><p><em>Read more:</em> <ExtLink href="https://openstax.org/books/physics/pages/14-4-sound-interference-and-resonance">OpenStax, Physics, “Sound Interference and Resonance” (section 14.4)</ExtLink>.</p><p><em>Note to the reader:</em> That page explains overtones, harmonics and beats. How “fused” or “rough” two notes feel is a matter of perception that also depends on the sound and the listener, and no single number settles it. A major third does not always beat at a fixed rate and does not always have a fixed mood.</p></Aside>)}
      {doorBox('Ambient Composer’s Notebook', <Aside title="One steady light, one moving light"><p>You do not always need a chord progression to transform an ambient world. Let a soft lower C stay where it is and slowly move an upper voice from E to F. The foundation keeps a sense of place while the upper line changes the view. Then try the opposite: hold a floating upper sound and let the bass shift by one step. Notice how much story a single movement can carry.</p><p><em>Try:</em> Keep the rhythm and the sound patch identical. Change one pitch only.</p></Aside>)}
    </Row>
  ) },
  { short: LESSON_2A_STEPS[8], sub: 'Your own three sketches', body: (
    <Row wide>
      <p>Now it is your turn. Open your own synthesizer or piano roll. Give the lower note and the upper note separate tracks if you can. Record a brief version of C4 with E4.</p>
      <Try label="Three tiny alternatives from that same beginning">
        <ol>
          <li><strong>Hold C4. Change E4 to F4.</strong></li>
          <li><strong>Hold E4. Change C4 to B3.</strong></li>
          <li><strong>Hold E4. Change C4 to D4.</strong></li>
        </ol>
        <p>Each comparison can be only five to ten seconds long. Before you make each change, try hearing the new note in your head. Hum it or point to it on the keyboard first. Then play it and check yourself.</p>
      </Try>
      <p>Listen back to all three. Which would you use in a slow ambient piece? There is no correct answer, and nobody is going to score you. You are free to hear something completely different from the words we use for these intervals.</p>
      <p>Why did we measure all this? When you choose a note for your music, you do not have to guess at its effect. You can find a lower pitch, find a second pitch, and measure the distance. You can then change one note and leave the other alone. The measurement helps you <strong>repeat and describe</strong> a sound. Your ears and your taste choose whether to keep it.</p>
      <Caveat><strong>What to keep.</strong> You can keep three short sketches, and a little two-line drawing if you like. The lesson does not record, upload or grade anything.</Caveat>
      <Try label="Prefer paper?"><p><a href={`${LESSON_PATH}/practice-sheet`}>Open the printable practice sheet</a>. It has your starting pair, three change cards to fill in, and a place to draw the two lines. It makes no sound; you play on your own instrument.</p></Try>
      <Wrapup recap="Three variations from one beginning, made by you." bridge="In the last step, we gather everything together." />
      {doorBox('Musical Worlds', <Aside title="Georgia: a musical conversation above the bass"><p>Georgian polyphonic singing includes several regional traditions that bring distinct vocal parts together. One important approach, associated with the eastern region of Kakheti, is described as polyphonic dialogue over a bass background. The voices do not simply move as identical blocks. Separate lines interact. As you listen, notice whether a lower part seems to continue or return while others make their own turns. This is living music with its own social and historical meaning. It is not a Western counterpoint worksheet, and no single recording shows every regional style.</p><p><em>Listen:</em> <ExtLink href="https://ich.unesco.org/en/video/41554">UNESCO video page</ExtLink> and the <ExtLink href="https://www.youtube.com/watch?v=rg8xrdbnH8E">same video on UNESCO&apos;s channel</ExtLink>. <em>Context:</em> <ExtLink href="https://ich.unesco.org/en/lists?RL=00008">UNESCO lists</ExtLink>.</p><p><em>Try:</em> Record a lower note that stays, then improvise a different upper path against it. This is an original exercise inspired by a broad idea. It is not an imitation of Georgian singing.</p></Aside>)}
      {doorBox('Paint What You Hear', <Aside title="Stillness and movement"><p>Give the lower note a shape or color that can stay. Now draw or paint the upper note as a moving line. Try three versions: one where the upper voice rises, one where the lower voice descends, and one where the two draw closer together. Does the picture help you notice which voice caused the change?</p><p><em>Try:</em> Make a tiny before-and-after picture with paint, pencil, collage or any digital tool. There is no correct color for a perfect fourth.</p><p><em>Privacy:</em> Keep your painting in your own studio. You do not need to upload it.</p></Aside>)}
    </Row>
  ) },
  { short: LESSON_2A_STEPS[9], sub: 'Summary', body: (
    <Row wide>
      <p>A <strong>dyad</strong> is a two-note combination. A <strong>voice</strong> is a musical line through time. An <strong>interval</strong> is the distance between two pitches, whether you hear it one note after another or both at once. Its <strong>number</strong> counts the note letters, including both ends. Its <strong>quality</strong> tells you the exact size: major or minor for seconds and thirds, perfect for fourths and fifths.</p>
      <p>We built four of these on the keyboard. C4 to E4 is a <strong>major third</strong> (three letters, four semitones). E4 to G4 is a <strong>minor third</strong> (three letters, three semitones). C4 to F4 is a <strong>perfect fourth</strong> (four letters, five semitones). D4 to E4 is a <strong>major second</strong> (two letters, two semitones). We also found that B3 to E4 is a perfect fourth too, with different notes.</p>
      <p>When one voice holds and the other moves, that is <strong>oblique motion</strong>. It can be the upper voice or the lower voice that moves.</p>
      <Notice>An interval has a name and a measurable distance. But the way you move into it becomes part of the story.</Notice>
      <p><a href={`${LESSON_PATH}/practice-sheet`}>Open the printable practice sheet</a></p>
      <Lead>Next: Lesson 2B. Last time, one voice stayed. In 2B, both voices are free, and we find the patterns in their journey.</Lead>
    </Row>
  ) },
]

export default function Lesson2A({ step }: { step: number | 'all' }) {
  return (
    <>
      <Stepper
        basePath={LESSON_PATH} eyebrow="Week 2 · Lesson 1 of 3" title="Hold One Voice, Let the Other Explore"
        deck={<>Two notes can make one beautiful sound. But each note can also have a life of its own.</>}
        steps={steps} current={step} lessonCode="2A"
        prevLesson={{ href: `${BASE}/week-2`, label: 'Week 2 overview' }} nextLesson={{ href: `${BASE}/week-2/lesson-2b`, label: 'Lesson 2B' }}
      />
    </>
  )
}
