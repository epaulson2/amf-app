import { Stepper, Row, Figure, Lead, Reading, Worked, Try, Notice, Caveat, Aside, type StepSpec } from './kit'
import { buildDoors } from './doors'
import { BASE } from '@/lib/soundscape/course'
import { LESSON_1B_STEPS } from '@/lib/soundscape/course-nav'

const W1 = '/soundscape/w1/'
export const PATH_1B = `${BASE}/week-1/lesson-1b`
export { LESSON_1B_STEPS }
const S = LESSON_1B_STEPS
const { door, DoorMap } = buildDoors('1B', PATH_1B, { 'history-postcard': 3, 'musical-worlds': 6, 'behind-the-sound': 7, 'hear-it-in-real-music': 7, 'ambient-composers-notebook': 8, 'paint-what-you-hear': 8 })

const steps: StepSpec[] = [
  { short: S[0], sub: 'Before you learn any names: just listen with your own keyboard', body: (
    <>
      <Row figure={<Figure id="B01-early" art="B01" caption="Seven notes, one at a time, and then the path stops." />}>
        <Lead>Last time you made one note into a musical home. Now let us see what happens when a melody travels away from it.</Lead>
        <p>A <strong>melody</strong> is a line of pitches heard one after another. When one pitch follows another, your ear starts to notice a path: climbing, falling, repeating, hesitating or returning. We can describe a path in two useful ways. We can use our ears to notice where it seems to be heading, and we can use the keyboard to name the notes and measure the spaces between them. Neither approach replaces the other.</p>
        <p>In this first step you will use only your ears. You do not need to name anything yet. Play seven notes rising, one at a time, and notice what you want to happen when they stop.</p>
        <Reading>
          <p>Seven white keys are numbered 1 to 7 and lettered C D E F G A B. That is the whole journey so far: it stops on the seventh note. The painting shows two journeys leaving one warm root, and only your own ears can say whether the path feels finished. Its shapes are a feeling, not a measurement.</p>
        </Reading>
        <Try label="On your own keyboard">
          <ol>
            <li>Choose your gentle sound and a comfortable volume. Find C: the white key just left of a group of two black keys.</li>
            <li>Play the white keys going up, one at a time, slowly: C D E F G A B. Hold the last note for a moment, then stop.</li>
            <li>Stay quiet for a few seconds. Does your imagination want another sound? If it does, try to hear it silently before you touch the keyboard.</li>
          </ol>
        </Try>
        <Notice>Does this feel finished to you? You might imagine another note, or you might like the open ending, or you might not be sure. All three are good answers. There is nothing here to get right.</Notice>
        <Caveat>On the next page we look at one possible ending. Take your time with this step first. What you heard is the point of the lesson.</Caveat>
      </Row>
    </>
  ) },
  { short: S[1], sub: 'One answer to the question you just asked yourself', body: (
    <>
      <Row figure={<Figure id="B06-native" art="B05" caption="Eight keys: the seven names, then the next C." />}>
        <Lead>Here is what one possible ending looks like. You traveled C, D, E, F, G, A, B, and then reached the next C.</Lead>
        <p>In a clearly established C-major setting, that final B often makes C feel close, and landing on C can feel like an arrival. But the choice is yours: a melody can also leave B hanging on purpose, and a listener is never wrong for enjoying an open ending. What matters is that you can now name one reason an ending might feel expected, and then decide what you want.</p>
        <Reading>
          <p>Eight white keys are numbered 1 to 8 and lettered C D E F G A B C. The first seven are exactly the keys you just played. The eighth is the next C, one octave higher, and it is the only new key. The painted petals suggest a garland of notes; their sizes are decoration, not distances.</p>
        </Reading>
        <Worked>
          <p>Start where you started before: C at number 1. Play up to B at number 7 and notice where you stopped last time. Now press number 8, the C. Same seven notes, one more key. That single extra note is the whole difference between the two endings we will compare later.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play C D E F G A B again, and stop on B. Listen to how it feels to stop there.</li>
            <li>Play C D E F G A B C, and stop on the higher C. Listen again.</li>
            <li>Which stopping place feels more at rest? Is it the same for you as you expected?</li>
          </ol>
        </Try>
        <Notice>If you did not feel a difference, that is fine. Keep listening as we learn what the keyboard can tell us about why some people do.</Notice>
      </Row>
    </>
  ) },
  { short: S[2], sub: 'Measuring the smallest step', body: (
    <>
      <Row figure={<Figure id="B02-native" art="B05" caption="E–F and B–C are neighbours; C–C♯ is a white key and a black one." />}>
        <Lead>Two pitches can be close together or far apart. The musical distance between them is called an <strong>interval</strong>. On a piano keyboard there is one simple way to measure it: count keys.</Lead>
        <p>A <strong>semitone</strong>, also called a <strong>half step</strong>, is the distance from one key to its nearest neighbour, whether that neighbour is white or black. From C up to the black key right next to it, C♯, is one semitone. Be careful with one thing: moving from one white key to the next white key is <em>not always</em> the same size. E and F have no black key between them, and neither do B and the next C. So E to F and B to C are each one semitone, even though both keys are white.</p>
        <Reading>
          <p>Three small pieces of keyboard, each marked 1 semitone. Left: E to F, two white keys with no black key between them. Middle: B to C, the same. Right: C to C♯, a white key and the black key right beside it, with a ring on the black key. The numbered arc under each pair counts the single hop.</p>
        </Reading>
        <Worked>
          <p>Take the right-hand piece. Put your finger on C. The very next key to the right is the black key C♯. You moved to the nearest neighbouring key, so you moved one semitone. Now take the left-hand piece: put your finger on E. The nearest neighbouring key to the right is F, a white key. Also one semitone.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play C, then the black key right next to it. Count one neighbouring move.</li>
            <li>Play E, then F. The white keys touch, so that is also one semitone.</li>
            <li>Play B, then the next C. Another one.</li>
          </ol>
        </Try>
        <Caveat>A half <em>step</em> is a distance between pitches. A half <em>note</em> is a length of time. They are different ideas that share a word.</Caveat>
      </Row>
      {door(['history-postcard'])}
    </>
  ) },
  { short: S[3], sub: 'Two neighbouring moves', body: (
    <>
      <Row figure={<Figure id="B03-native" art="B05" caption="Two semitones make one whole step." />}>
        <Lead>If one move to the neighbouring key is a semitone, what is a bigger step?</Lead>
        <p>A <strong>whole step</strong> is two semitones. From C to D, you pass the black key C♯ between them: C → C♯ → D. That is two neighbouring moves, one whole step, even though a two-note melody that plays only C and D never sounds the black key in between. The distance is in the keys you pass, not only in the notes you play.</p>
        <Reading>
          <p>Left: C to D, with two numbered hops through the black key C♯ and the total labelled “2 semitones = 1 whole step”. Right: E to F♯, passing through F, also two semitones. Black keys count as keys, so the hops include them.</p>
        </Reading>
        <Worked>
          <p>Put a finger on C. Count neighbouring keys to the right: C♯ is 1, D is 2. You landed on D after two moves: one whole step. Now do the same from E: F is 1, F♯ is 2. Again a whole step, this time ending on a black key.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play C and D. Then play C, C♯, D slowly, to hear the two small steps inside the one big one.</li>
            <li>Find another whole step: any two keys with exactly one key between them.</li>
          </ol>
        </Try>
      </Row>
      <Row flip figure={<Figure id="B04-native" art="B05" caption="One white-key move, two real distances." />}>
        <h3>One white-key move, two real distances</h3>
        <p>Because the black-key pattern is uneven, the same “next white key” can be a different size. C to D crosses a black key, so it is two semitones. E to F does not, so it is one. That is why we measure with real neighbouring keys and not just by counting letters.</p>
        <Reading>
          <p>Two keyboard pieces side by side. Left: C to D, 2 semitones, with a black key between. Right: E to F, 1 semitone, with none. Each is one white-key move, but the numbered hops show different distances.</p>
        </Reading>
        <Try>
          <ol>
            <li>Play C then D, and E then F. Both are one white key to the next. Which feels like the bigger step?</li>
            <li>Say it in words: “C to D is a ___ step. E to F is a ___ step.”</li>
          </ol>
        </Try>
        <p className="m4-notice">C to D is a whole step (C → C♯ → D contains two neighbouring moves). E to F is a half step: they are already neighbouring keys.</p>
        <Aside title="Optional scope note: what these counts assume">
          <p>The counts here are for the standard twelve-tone equal-tempered keyboard, which is what nearly every keyboard and synthesizer uses. Other tuning systems and microtonal traditions divide the octave differently. They are explored elsewhere and are not flattened into white-key labels. On this keyboard, twelve semitones make one octave: the distance from one C to the next.</p>
        </Aside>
        <div className="m4-caveat" style={{ marginTop: 14 }}>Print-friendly practice sheet: <a href={`${W1}pdf/W1-07_semitones-and-whole-steps_blank.pdf`}>semitones and whole steps (PDF)</a>.</div>
      </Row>
    </>
  ) },
  { short: S[4], sub: 'The painting is a feeling; the numbered hops are the measurement', body: (
    <>
      <Row figure={<Figure id="B09-native" art="B09" caption="C to C♯ is 1; C to D is 2." />}>
        <Lead>Two notes can feel close together on the page, in a painting or in your imagination, and still be measured very differently on the keys.</Lead>
        <p>This picture is a reminder of how to read every picture in this course. The painted glows and the soft arc connecting them are atmosphere: they say “these two notes are related” and nothing more. They do not show how far apart the notes are. The numbers on the real keys do.</p>
        <Reading>
          <p>Two small keyboards. Left: C to C♯, one numbered hop, 1 semitone. Right: C to D, two numbered hops, 2 semitones. The painting behind them is the same kind of shape in both, even though the distances differ. That is the point: shape is feeling, numbers are measurement.</p>
        </Reading>
        <Worked>
          <p>Imagine drawing a bridge between two notes. A short bridge does not mean a small interval, and a long one does not mean a large one. To know the size, count keys: C to C♯ is one move, C to D is two.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play two neighbouring keys, then a whole step. Listen for how the relationship changes between them.</li>
            <li>Say which distance felt more “open”. Then count it on the keys. Does your count match what you expected?</li>
          </ol>
        </Try>
        <Notice>You are learning to hold two things at once: what you hear and feel, and what you can count.</Notice>
      </Row>
    </>
  ) },
  { short: S[5], sub: 'A pattern of distances, not a set of white keys', body: (
    <>
      <Row figure={<Figure id="B05-native" art="B05" caption="Whole, whole, half, whole, whole, whole, half." />}>
        <Lead>A <strong>scale</strong> is an organised collection of pitches. You do not have to play it straight up and down: it is more like a set of pathways than a fixed tune.</Lead>
        <p>One familiar scale is the <strong>major scale</strong>. Its rising pattern, in standard Western tuning, is <strong>whole, whole, half, whole, whole, whole, half</strong>, often written W–W–H–W–W–W–H. Start on C and follow it: a whole step to D, another to E, a half step to F, then whole steps to G, A and B, and a final half step to the next C. You have built C–D–E–F–G–A–B–C.</p>
        <p>Every one of those notes is a white key, but that is a <em>result</em> of starting the pattern on C. It is not a rule that major scales use only white keys. The important thing is the pattern of distances.</p>
        <Reading>
          <p>Eight white keys C to C, with a curved arc between each pair of neighbouring scale notes. Each arc is labelled W for a whole step (2 semitones) or H for a half step (1): W W H W W W H. The two half steps fall where there is no black key: E to F and B to C. The garland of petals in the painting is decoration. Only the W and H labels and the numbers are measurements.</p>
        </Reading>
        <Worked>
          <p>Follow the arcs. C to D: W (the arc spans a black key). D to E: W. E to F: H (no black key between them). F to G, G to A, A to B: W each. B to C: H. Count the semitones: 2 + 2 + 1 + 2 + 2 + 2 + 1 = 12, one full octave.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play the scale slowly and say each step aloud: whole, whole, half, whole, whole, whole, half.</li>
            <li>Feel the two half steps: they are the two places with no black key between white keys.</li>
            <li>If you are on E in C major, what step reaches the next note? (A half step, to F.) After B? (A half step, to C.)</li>
          </ol>
        </Try>
        <Aside title="Optional: the same pattern starts anywhere">
          <Figure id="B11-native" art="B05" caption="The same pattern from G." />
          <p>The pattern travels. Start on G and follow W–W–H–W–W–W–H, and you need one black key, F♯, as the seventh note. The pattern is the point; the starting note can change.</p>
        </Aside>
      </Row>
      {door(['musical-worlds'])}
    </>
  ) },
  { short: S[6], sub: 'The same beginning, two different last events', body: (
    <>
      <Row figure={<Figure id="B01-pair" art="B01" caption="Both endings share C D E F G A B; only one adds the higher C." />}>
        <Lead>Here are two phrases that begin with exactly the same notes. The difference is what happens at the end.</Lead>
        <p>One ending reaches a note that can feel like home. The other stops and leaves room for a thought that has not finished. You do not need to prefer the arrival. Because the shared part is unchanged, you can notice how the last event alone changes the journey.</p>
        <Reading>
          <p>Two keyboards. Ending 1 plays C D E F G A B and stops on B. Ending 2 plays the same seven notes and then adds the higher C, which is highlighted as home. The sentence underneath says it plainly: both share C D E F G A B, and only the second adds the higher C.</p>
        </Reading>
        <h3>Why an ending can feel like an arrival</h3>
        <p>In the C-major scale, B is a half step below the next C. That makes B a <strong>leading tone</strong> in this context: it often points toward C. <strong>Resolution</strong> is an arrival that follows an expectation, while openness, sometimes called suspension, keeps the expectation available. You can choose either one. B does not always have to resolve to C.</p>
        <Try>
          <ol>
            <li>Play the shared seven notes, then stop on B. Notice the open ending.</li>
            <li>Play the same seven notes and finish on the higher C. Notice the arrival.</li>
            <li>Play both again without looking at the picture. Which one fits an atmosphere or story you might want to create? Why?</li>
          </ol>
        </Try>
        <Notice>Neither ending is the correct one. You can like the arrival, like the openness, or want both for different reasons.</Notice>
        <Caveat>Be careful not to mix up two different things. Notes that clash or shimmer when sounded together are an acoustic effect. The sense of expectation when one note follows another, like B then C, is a feeling built from the melody and its setting.</Caveat>
      </Row>
      {door(['behind-the-sound', 'hear-it-in-real-music'])}
    </>
  ) },
  { short: S[7], sub: 'Make two endings of your own', body: (
    <>
      <Row flip figure={<Figure id="B10-native" art="B10" caption="Same opening, different endings: an example, not the answer." />}>
        <Lead>In your synth or music software, make two short versions of the same melodic idea. Keep the beginning identical.</Lead>
        <p>In one version, let your final note feel like an arrival. In the other, stop, sustain or fade before that arrival. You do not have to use all eight notes: even a three-note phrase can contain a meaningful expectation.</p>
        <Reading>
          <p>Two keyboards sharing the opening C D E. One ends on G, the other ends back on C. These are practice patterns for you to try, not a recording of anything. Your own two endings can be completely different.</p>
        </Reading>
        <Try label="Make your own arrival and open ending">
          <ol>
            <li>Choose a short opening: three or four notes.</li>
            <li>Make one ending that lands somewhere that feels settled.</li>
            <li>Make another ending that stops, sustains or fades before that arrival. Try lengthening the last note, or adding a moment of silence before the arrival.</li>
            <li>Listen to both without watching the piano roll. Which says more about the atmosphere or story you want?</li>
          </ol>
        </Try>
        <p>Today you learned that notes have measurable distances, scales have recognisable patterns, and musical endings are choices. Tomorrow’s piece does not have to resolve just because theory tells you where resolution is possible.</p>
        <Caveat>Your sketches stay on your own instrument and device; nothing here asks you to upload anything.</Caveat>
      </Row>
      {door(['ambient-composers-notebook', 'paint-what-you-hear'])}
    </>
  ) },
  { short: S[8], sub: 'Lesson 1B on one page', body: (
    <>
      <Row figure={<Figure id="B05-native" art="B05" caption="The pattern to keep: W W H W W W H." />}>
        <Lead>You can now measure a sound and recognise a scale. Here is the whole lesson in a few lines.</Lead>
        <h3>Today’s words</h3>
        <ul style={{ paddingLeft: '1.2em', maxWidth: '38rem' }}>
          <li><strong>Interval</strong> = the distance between two notes.</li>
          <li><strong>Semitone (half step)</strong> = one move to the nearest neighbouring key, white or black.</li>
          <li><strong>Whole step</strong> = two semitones.</li>
          <li><strong>Major scale</strong> = the pattern W–W–H–W–W–W–H. From C it uses only white keys; from other notes it may need black ones.</li>
          <li><strong>Leading tone</strong> = the note a half step below home (B in C major) that often points toward it.</li>
          <li><strong>Resolution</strong> = an arrival that follows an expectation. <strong>Openness</strong> keeps the expectation available.</li>
        </ul>
        <Notice>Next time you will use a held note and a moving one together, and shape them into your first small piece.</Notice>
        <p>Print-ready: <a href={`${W1}pdf/W1-07_semitones-and-whole-steps_blank.pdf`}>semitones and whole steps (PDF)</a> and <a href={`${W1}pdf/W1-03_two-endings_blank.pdf`}>two endings (PDF)</a>, and the <a href="/soundscape/m03/native/B05-native.print.svg">ink-light scale figure</a>.</p>
      </Row>
      <DoorMap />
    </>
  ) },
]

export default function Lesson1B({ step }: { step: number | 'all' }) {
  return (
    <Stepper
      basePath={PATH_1B}
      lessonCode="1B"
      eyebrow="Week 1 · Lesson 2 of 3"
      title={<>Stop Before <em>the Ending</em></>}
      deck={<p style={{ margin: 0 }}>Music can make you expect a note that has not been played. What happens if the composer chooses not to give it to you? In this lesson you will measure the smallest steps on a keyboard, build the C-major scale, and compare two different endings.</p>}
      meta={<p className="m4-sub" style={{ marginTop: 14 }}>About 30–40 minutes at your own pace · Last time you made one note into a home; now a melody travels away from it · Nine short steps</p>}
      steps={steps}
      current={step}
      prevLesson={{ href: `${BASE}/week-1`, label: 'Week 1' }}
      nextLesson={{ href: `${BASE}/week-1/lesson-1c`, label: 'Lesson 1C' }}
    />
  )
}
