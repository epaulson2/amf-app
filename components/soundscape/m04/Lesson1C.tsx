import { Stepper, Row, Figure, Lead, Reading, Worked, Try, Notice, Caveat, Aside, type StepSpec } from './kit'
import { buildDoors } from './doors'
import { BASE } from '@/lib/soundscape/course'
import { LESSON_1C_STEPS } from '@/lib/soundscape/course-nav'

const W1 = '/soundscape/w1/'
export const PATH_1C = `${BASE}/week-1/lesson-1c`
export { LESSON_1C_STEPS }
const S = LESSON_1C_STEPS
const { door, DoorMap } = buildDoors('1C', PATH_1C, { 'history-postcard': 1, 'behind-the-sound': 2, 'hear-it-in-real-music': 3, 'musical-worlds': 4, 'ambient-composers-notebook': 6, 'paint-what-you-hear': 8 })

const steps: StepSpec[] = [
  { short: S[0], sub: 'A held voice and a visiting voice', body: (
    <>
      <Row figure={<Figure id="C01-native" art="C01" caption="One voice holds C; three visiting notes come and go." />}>
        <Lead>A place. A visitor. A moment of change. You already have enough to begin telling a musical story.</Lead>
        <p>Week 1 began with one note we chose as a reference. Then we saw how another note relates to it, and how a melody can suggest an arrival or an open question. Today we connect those ideas across time. A piece does not need hundreds of notes to have structure: one line can stay steady while another enters, moves and leaves.</p>
        <p>We will keep four ideas apart. A <strong>note</strong> is one pitch at a moment. A <strong>voice</strong> is a line with a role as time moves forward. It does not have to be sung: a synthesizer pad can be a voice, and so can a melody played on a piano or flute. <strong>Harmony</strong> is the relationship among pitches sounding at the same time, and it can exist with only two pitches. A <strong>chord</strong> is one named kind of harmonic structure, and we will build them later.</p>
        <Reading>
          <p>A twelve-second timeline with a long bar and short bars. The long bar on the lower line is C, held for the whole twelve seconds: that is the foundation voice. The short bars on the upper line are the visitors: E from 2 to 4 seconds, G from 5 to 7 and D from 9 to 11. The painting behind it is a feeling, not a measurement. Only the bars and the numbers on the time scale tell you when things sound.</p>
        </Reading>
        <Worked>
          <p>Read straight down from the number 3 on the time scale. The lower bar is there: C is sounding. The upper bar is there too: E is sounding. At that moment two pitches coexist, a held C and an E above it. That relationship is harmony. Read down from 4.5: C is still sounding, and nothing is above it. Read down from 6: the visitor is now G.</p>
        </Worked>
        <Try>
          <ol>
            <li>Choose a soft sustained sound. Hold a low C, using a sustain pedal, a latch button or a pad sound if you have one.</li>
            <li>Play E above it, let it go, then G, then D, returning to the held C between them, as in the picture.</li>
            <li>If you cannot hold a note, play C, then E, and imagine the C still sounding beneath it.</li>
          </ol>
        </Try>
        <Notice>Which part stayed? Which part traveled? When the moving note changed, did the combination change with it?</Notice>
        <Caveat>A single held C is not a C-major chord and does not prove a key. Two voices already make harmony, long before three-note chords.</Caveat>
      </Row>
      {door(['history-postcard'])}
    </>
  ) },
  { short: S[1], sub: 'Lower voice, upper voice', body: (
    <>
      <Row figure={<Figure id="C03-native" art="C02" caption="Lower voice C (amber); upper voice E, G and D (teal)." />}>
        <Lead>Now find the same two voices on your own keyboard, so the picture becomes something your hands know.</Lead>
        <p>On a keyboard, lower pitches are to the left and higher pitches are to the right. Our foundation voice is a low C. Our visiting notes, E, G and D, sit further to the right, higher than the C. Two voices can overlap in time and still be easy to tell apart, because each has its own role and its own place on the keys.</p>
        <Reading>
          <p>A long stretch of white keys. The far-left highlighted C, in amber, is the lower voice. The highlighted D, E and G further right, in teal, are the upper voice. Amber marks the foundation and teal marks the visitors, but the letters carry the meaning too, so nothing depends on colour alone.</p>
        </Reading>
        <Worked>
          <p>Start at the amber C. Count right until you reach the teal keys: they are well above it. The upper notes are not part of the foundation: they travel above it, and each one is a separate event in time.</p>
        </Worked>
        <Try>
          <ol>
            <li>Find the low C on your keyboard, then find the D, E and G that sit higher, up near the middle.</li>
            <li>Play the low C. Then, above it, play E, then G, then D.</li>
            <li>Say aloud which hand or which part is the foundation and which is the visitor.</li>
          </ol>
        </Try>
        <Caveat>Your keyboard may not be big enough to put these exactly where the picture does, and that is fine. What matters is that the foundation sits lower than the visitors.</Caveat>
      </Row>
      {door(['behind-the-sound'])}
    </>
  ) },
  { short: S[2], sub: 'Hearing what each voice contributes', body: (
    <>
      <Row figure={<Figure id="C06-native" art="C02" caption="Foundation only, upper notes only, both together." />}>
        <Lead>One line gives you a stable reference. The other gives the sound movement. Together they make a relationship that neither line makes alone.</Lead>
        <p>You can learn a great deal by taking the two voices apart and putting them back together. Play the foundation by itself. Then play only the upper notes. Then play both. Each version is the same material seen from a different angle, and the third one is the one that holds a relationship.</p>
        <Reading>
          <p>Three timelines of twelve seconds, stacked. The first shows only the lower bar, the foundation. The second shows only the upper bars, E, G and D, with gaps between them. The third shows both together. All three use exactly the same events, so what you see in the third is simply the first two combined. Nothing is hidden behind a control.</p>
        </Reading>
        <Worked>
          <p>Look at the second timeline. Between the E and the G there is a gap from 4 to 5 seconds: the upper voice is silent there. In the third timeline, the same gap is still there, but the lower bar fills it. The foundation keeps the music alive while the upper voice rests.</p>
        </Worked>
        <Try>
          <ol>
            <li>Play only the foundation C, long and steady.</li>
            <li>Play only the upper notes: E, pause, G, pause, D.</li>
            <li>Play both together. What does the foundation give the upper notes that they did not have alone?</li>
          </ol>
        </Try>
        <Notice>A voice is a line followed through time. Where was the second voice a part of the sound, and where was it only a gap?</Notice>
      </Row>
      {door(['hear-it-in-real-music'])}
    </>
  ) },
  { short: S[3], sub: 'Time is a musical material', body: (
    <>
      <Row figure={<Figure id="C04-native" art="C04" caption="The same note, entering early and entering late." />}>
        <Lead>Music is not only <em>which</em> notes you choose. It is also <em>when</em> they appear, how long they stay, and the spaces you leave between them.</Lead>
        <p>A note’s <strong>duration</strong>, how long it lasts, is part of its identity in a piece. A note that enters immediately can feel different from the very same note entering after a long wait. A <strong>rest</strong> is a planned pause in a part. In a real synthesizer a long reverb tail can still be audible after a note has stopped, and that is worth listening to, rather than assuming silence always means a perfectly silent recording.</p>
        <Reading>
          <p>Two twelve-second timelines. In both, the lower C is held for the whole twelve seconds. In the first, the upper E enters at 2 seconds and lasts until 6. In the second, the same E enters at 7 seconds and lasts until 11. The dashed boxes mark where the upper voice is resting. Only the time of the entrance changes: the pitch, the length and the held C are all identical.</p>
        </Reading>
        <Worked>
          <p>In the first timeline, the upper voice has a short rest at the start (0 to 2 seconds), then plays E for four seconds, then rests again until the end. In the second, it rests for seven seconds, plays E for four, then rests for one. Same E, different shape. The notes did not need to change to give the moment a different character.</p>
        </Worked>
        <Try>
          <ol>
            <li>Hold C. Play E almost at once, hold it, then let it go while C continues.</li>
            <li>Hold C again, but wait a long time before the E arrives. Listen to how the waiting changes the moment.</li>
            <li>Do not change anything else between the two: same sound, same volume, same E.</li>
          </ol>
        </Try>
        <Notice>Timing alone can change a phrase’s shape. You do not need new chords or a more complicated melody to make something feel different.</Notice>
        <Aside title="Key words for time">
          <p><strong>Duration</strong>: how long a sound continues. <strong>Rest or silence</strong>: a moment when a voice makes no new sound. <strong>Repetition</strong>: an idea returning recognizably. <strong>Variation</strong>: an idea returning with a purposeful change. <strong>Form</strong>: the larger organisation of musical events over time.</p>
        </Aside>
      </Row>
      {door(['musical-worlds'])}
    </>
  ) },
  { short: S[4], sub: 'The spaces between the notes', body: (
    <>
      <Row flip figure={<Figure id="C08-native" art="C08" caption="Silence in the upper voice, with the foundation still sounding." />}>
        <Lead>A silence is not an empty space where nothing is happening. It is a choice, and it changes how everything around it feels.</Lead>
        <p>A repeated idea can make music recognizable. A changed note, a new entrance or a silence can turn repetition into <strong>variation</strong>. Even a short piece can have a beginning, a meaningful change and an intentional ending. You do not need three formal sections or a dramatic plot. A single pause placed on purpose can be the most musical thing in a sketch.</p>
        <Reading>
          <p>The same twelve-second example with the gaps marked. The upper voice rests from 0 to 2 seconds, from 4 to 5, from 7 to 9 and from 11 to 12, each shown as a dashed box labelled “rest”. The lower C keeps sounding throughout. The painting shows three separate brushstrokes with clear space between them, to suggest notes with room around them.</p>
        </Reading>
        <Try>
          <ol>
            <li>Play a short idea of three notes, with one pause in the middle. Count the pause quietly.</li>
            <li>Play the same idea again with no pause. Notice how the pacing feels different.</li>
            <li>Leave one longer gap than feels comfortable, and then play. Does the next note feel different?</li>
          </ol>
        </Try>
        <Notice>What did the silence do? Did it make the next note feel more important, or more surprising, or more peaceful?</Notice>
      </Row>
    </>
  ) },
  { short: S[5], sub: 'The same material, two different endings', body: (
    <>
      <Row figure={<Figure id="C07-native" art="C07" caption="Thirty-six seconds; only the second adds a higher C at the end." />}>
        <Lead>Here is one simple sketch: the lower voice stays still while a few upper notes enter and depart. Near the end, the music can choose a landing, or leave its last thought open.</Lead>
        <p>Both versions share a held lower C for all thirty-six seconds and the same four upper notes. They differ only in how they finish. Because the shared part is unchanged, you can listen, or read, for the ending alone. Neither version is correct. The only question is which one feels more like the music you want to make today.</p>
        <Reading>
          <p>Two thirty-six-second timelines, the first with five bars on the upper line and the second with six. In both, the lower C lasts the whole time, and the upper notes are E from 8 to 12 seconds, G from 15 to 19, D from 23 to 27 and B from 29 to 32. Only the second timeline adds one more upper bar at the end: a higher C from 33 to 35.8 seconds. That extra bar is the only difference.</p>
        </Reading>
        <Worked>
          <p>Compare the right-hand ends of the two timelines. In the first, the last upper note, B, finishes at 32 seconds and the upper voice then rests while C continues underneath. In the second, B finishes at 32 and, after a short gap, the higher C arrives at 33 and sounds almost to the end. The note that changed between the two versions is the last one.</p>
        </Worked>
        <Try>
          <ol>
            <li>Hold C. Play E, G, D, B, spacing them as the timeline shows, with plenty of silence between.</li>
            <li>For the first ending, let B go and just leave the C beneath. Notice how it feels to stop there.</li>
            <li>For the second, play B, then after a moment, play the higher C. Compare the two feelings.</li>
          </ol>
        </Try>
        <Notice>Which ending fits the atmosphere you want to create today: the arrival, the openness, or something of your own?</Notice>
      </Row>
      {door(['ambient-composers-notebook'])}
    </>
  ) },
  { short: S[6], sub: 'Your first intentional soundscape', body: (
    <>
      <Row figure={<Figure id="C09-native" art="C08" caption="Five boxes to plan your piece; print it if you like." />}>
        <Lead>Open your favourite synthesizer or music software. Choose a soft sustained note: start with C if you like, because you already know that sound.</Lead>
        <p>Use your own synth or DAW. Begin with one low note you can sustain comfortably. It does not have to be C if another note suits your idea. Add a second voice above it that uses only two or three notes. Give yourself time to hear each new note against the foundation rather than filling every space. Keep as much else identical as you can, so you can tell which choice changed the music.</p>
        <Reading>
          <p>Five numbered boxes in a row: set a scene, imagine a visitor, leave some room, change something, choose an ending. Each has blank lines for you to write on. Below them, a keyboard lettered C to C reminds you of the notes you already know. It is a planning sheet, not a test.</p>
        </Reading>
        <Try label="Make a place, let something happen">
          <ol>
            <li><strong>Set the scene.</strong> Let your foundation note establish a musical place.</li>
            <li><strong>Imagine a visitor.</strong> Before pressing a key, imagine, hum or gesture toward your next note. Then find it on the instrument.</li>
            <li><strong>Leave room.</strong> Allow at least one moment where the upper voice rests or waits. Do not fill every second.</li>
            <li><strong>Make one change.</strong> Try repeating a note, changing its length, or moving it to another pitch. Listen for what that does.</li>
            <li><strong>Choose an ending.</strong> Return to your first pitch, let the moving voice fade first, or leave the phrase unfinished.</li>
          </ol>
        </Try>
        <p>Aim for a miniature of about thirty to forty-five seconds. If a shorter piece feels complete, keep it. What matters is that you can hear a beginning, some intentional development, and an ending, or a deliberately open one. You may change the sound, filters or reverb after listening to the basic pitches: the texture is part of your voice as a composer.</p>
        <Caveat>Your sketch stays on your own instrument and device; nothing here asks you to upload anything. Print <a href={`${W1}pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf`}>the personal tonal atlas worksheet (PDF)</a> if you would like a page to work on.</Caveat>
      </Row>
    </>
  ) },
  { short: S[7], sub: 'Draw it, then find it on the keys', body: (
    <>
      <Row flip figure={<Figure id="C10-native" art="C10" caption="Which line stayed? Which line changed?" />}>
        <Lead>Draw a tiny picture of your soundscape. Mark your foundation, two notes that mattered, and the place where the music changed or went quiet.</Lead>
        <p>Add your own words or colours if they help you remember how the music felt to you. There is no fixed colour for any note, and no emotion map to match. Then bring the picture back to the keyboard: where were those notes? Try seeing their places in your mind before you look at the real keys, check them, and listen again without watching the screen.</p>
        <Reading>
          <p>The twelve-second example once more, as a map of what to look for in your own piece. The lower line stayed on C the whole time. The upper line changed: E, then G, then D. Look for the same two things in yours: which line stayed, and which line changed. The painting behind it is atmosphere; the bars are the facts.</p>
        </Reading>
        <Try label="Map it and check it">
          <ol>
            <li>Choose one note of your piece and name it. Is it in the lower voice or the upper?</li>
            <li>Point to one change: was it pitch, timing, silence, sound colour or something else?</li>
            <li>Complete the sentence: “I imagined ___, I changed ___, and the result ___.”</li>
          </ol>
        </Try>
        <Notice>Which note or silence shaped your piece most? Could you recreate that choice tomorrow?</Notice>
        <Caveat>If you made something complex, wonderful. Focus on one concrete choice (a note, an entrance, a length) rather than simplifying your work.</Caveat>
      </Row>
      {door(['paint-what-you-hear'])}
    </>
  ) },
  { short: S[8], sub: 'What you can do now, and what comes next', body: (
    <>
      <Row figure={<Figure id="S06-native" art="S06" caption="Week 1: find C, travel, add a voice." />}>
        <Lead>You have listened, imagined, measured and made music. That is a foundation worth returning to.</Lead>
        <p>A note is one named pitch; a voice is a line through time. Harmony describes simultaneous pitch relationships, and a chord is only one particular grouping of pitches, not the only kind of harmony. Duration, rests, repetition, variation and form help music become a deliberate journey. You now have a first soundscape and a way to explain some of your musical choices.</p>
        <Reading label="What the picture shows">
          <p>The three steps of Week 1 in order: find C, travel along the keys, add a voice. Below them, a keyboard with both Cs highlighted, each the white key just left of a group of two black keys.</p>
        </Reading>
        <Notice>This week, one voice mostly stayed while the other explored. Soon we will give both lines a path of their own. Two notes can approach, separate, travel together or move in opposite directions, and their changing distance becomes a new musical language. For now, take your sketch with you.</Notice>
        <p>Next: <a href={`${BASE}/week-1`}>return to the Week 1 overview</a>. Print-ready sheets: <a href={`${W1}pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf`}>personal tonal atlas worksheet (PDF)</a> and the <a href="/soundscape/m03/native/C10-native.print.svg">ink-light soundscape map</a>.</p>
      </Row>
      <DoorMap />
    </>
  ) },
]

export default function Lesson1C({ step }: { step: number | 'all' }) {
  return (
    <Stepper
      basePath={PATH_1C}
      lessonCode="1C"
      eyebrow="Week 1 · Lesson 3 of 3"
      title={<>My First <em>Intentional Soundscape</em></>}
      deck={<p style={{ margin: 0 }}>A place. A visitor. A moment of change. You already have enough to begin telling a musical story. In this lesson you will see how a held voice and a moving voice make harmony, why timing and silence matter, and how to turn a small improvisation into a deliberate piece.</p>}
      meta={<p className="m4-sub" style={{ marginTop: 14 }}>About 30–40 minutes at your own pace · You have found a home note and an open ending; now you will use them · Nine short steps</p>}
      steps={steps}
      current={step}
      prevLesson={{ href: `${BASE}/week-1`, label: 'Week 1' }}
      nextLesson={{ href: `${BASE}/week-1`, label: 'Finish Week 1' }}
    />
  )
}
