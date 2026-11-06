import { Stepper, Row, Figure, Lead, Reading, Worked, Try, Notice, Caveat, Aside, type StepSpec } from './kit'
import Link from 'next/link'
import { DiscoveryDoor, DOOR_KINDS, type DoorKind } from '../DiscoveryDoor'
import { lessonDoors } from '../week1/Doors'
import { BASE } from '@/lib/soundscape/course'
import { LESSON_1A_STEPS } from '@/lib/soundscape/course-nav'

const W1 = '/soundscape/w1/'
const PATH = `${BASE}/week-1/lesson-1a`
export { LESSON_1A_STEPS }
const STEPS = LESSON_1A_STEPS
// Where each of the six original research doors lives. Every door keeps its full original body and source links.
const DOOR_STEP: Record<DoorKind, number> = { 'history-postcard': 4, 'behind-the-sound': 5, 'musical-worlds': 7, 'ambient-composers-notebook': 8, 'hear-it-in-real-music': 8, 'paint-what-you-hear': 11 }
const D = lessonDoors('1A')
const door = (kinds: DoorKind[]) => (
  <div className="m4-stepdoors" key={kinds.join()}>
    <p>Optional side door{kinds.length > 1 ? 's' : ''} for this step. Never required.</p>
    {kinds.map(k => <div id={`door-${k}`} key={k}><DiscoveryDoor kind={k} title={D.titles[k]}>{D.content[k]}</DiscoveryDoor></div>)}
  </div>
)
function DoorMap() {
  return (
    <div className="m4-stepdoors">
      <h3>The six optional side doors</h3>
      <p>Each one opens where it belongs in the lesson. They are invitations, not homework.</p>
      <ul style={{ paddingLeft: '1.2em', maxWidth: '38rem' }}>
        {DOOR_KINDS.map(k => <li key={k.id}><Link href={`${PATH}?step=${DOOR_STEP[k.id]}#door-${k.id}`}><strong>{k.title}</strong>: {D.titles[k.id]}</Link> <span style={{ color: '#6f5f6c' }}>(step {DOOR_STEP[k.id]})</span></li>)}
      </ul>
    </div>
  )
}

const steps: StepSpec[] = [
    { short: STEPS[0], sub: 'Before the first note', body: (
      <>
        <Row figure={<Figure id="S05-native" art="M02:G02-ACCENT-keyboard-light" caption="A drawing of a keyboard. Play the real one." />}>
          <Lead>Everything you hear in this lesson comes from your own instrument, so you stay in charge of what you hear. These pages explain, show and guide; your keyboard is where it happens.</Lead>
          <p>Sit at your keyboard or synthesizer. Choose a simple, gentle sound: a piano, a soft electric piano or a warm pad, if you have one. Start with a comfortable volume, quiet enough that you can hear small differences. If your keyboard has a way to hold a note (a sustain pedal, a latch button or a pad sound that keeps going), find it now, because we will use it later in the lesson.</p>
          <Reading label="How to read this picture">
            <p>The drawing shows the keys of a keyboard from the top. Left is lower and right is higher; we will come back to that in a moment. Notice the black keys: they sit in groups of two, then three, then two. Brackets above the picture count each group. A small round knob stands for your volume control; yours will look different, and that is fine.</p>
          </Reading>
          <Try label="Set up">
            <ol>
              <li>Choose a gentle sound.</li>
              <li>Set a comfortable, quiet volume. You can turn it up later.</li>
              <li>Look at your keys and find a group of two black keys and a group of three. You are about to use that pattern as a map.</li>
            </ol>
          </Try>
          <Caveat>Not every keyboard has the same number of keys or the same layout of controls. Everything in this lesson works on any keyboard, including a small 25-key controller.</Caveat>
        </Row>
      </>
    ) },
    { short: STEPS[1], sub: 'One sound, three different things to notice', body: (
      <>
        <Row figure={<Figure id="A01-native" art="A01" caption="One held note, painted as a single glow." />}>
          <Lead>Press one white key gently and hold it. You have just made a <strong>note</strong>.</Lead>
          <p>A note is a single musical sound that you can name, find again and use. When you hold a key down, the sound keeps going, and that steady presence is something we will use all lesson long: a sound that stays, and a place that slowly forms around it.</p>
          <Reading>
            <p>The glowing point at the centre of the painting is that one held sound. The long, soft veil passing through it stands for the way the sound keeps going while your finger stays down. There is only one glow because there is only one note. The painting is a feeling, not a measurement: how big the glow is says nothing about how high or loud the note is.</p>
            <p>Below it, the keyboard drawing shows a single key pressed, with no letter on it yet. Names arrive in the next step.</p>
          </Reading>
          <Worked>
            <p>Press a key near the middle of your keyboard and hold it. The picture has one glow and one pressed key. If you pressed a second key at the same time, the picture would need a second glow. That is how we will read every picture in this course: each glow is one sound.</p>
          </Worked>
        </Row>
        <Row flip figure={<Figure id="A02-native" art="A01" caption="Pitch is which key; loudness is how hard." />}>
          <h3>Pitch, loudness and tone colour are three different things</h3>
          <p><strong>Pitch</strong> is how high or low a sound is. Keys to the right sound higher and keys to the left sound lower. <strong>Loudness</strong> is how strongly you play: pressing harder, or turning the volume up, makes the same key louder, not higher. A third quality is the sound itself. Play the same key on a piano and then on a flute or a warm pad: the pitch stays the same, but the sound changes. That quality is called <strong>timbre</strong>, or tone colour. It is why a piano and a flute playing the same note are easy to tell apart.</p>
          <Reading>
            <p>The upper part of the figure shows pitch: two neighbouring white keys with “lower” to the left and “higher” to the right. The lower part shows loudness: the same key twice, once played softly (a small ripple) and once played harder (a large ripple). The two ideas are drawn in two different places on purpose, so we do not mix them up.</p>
          </Reading>
          <Try>
            <ol>
              <li>Play a white key near the middle. Then play the key just to its right, then one to its left. Which direction sounds higher?</li>
              <li>Play one key softly, then the same key harder. The pitch is the same; only the loudness changed.</li>
              <li>Switch to a different sound on your keyboard and play the same key again. What stayed the same, and what changed?</li>
            </ol>
          </Try>
          <Notice>Which of the three, pitch, loudness or tone colour, changed each time? What would you say this sound looks like, or feels like? Your ears and imagination get to decide.</Notice>
        </Row>
      </>
    ) },
    { short: STEPS[2], sub: 'The black keys are a map', body: (
      <>
        <Row figure={<Figure id="A03-native" art="M02:G02-ACCENT-keyboard-light" caption="Both highlighted keys are C." />}>
          <Lead>A keyboard looks like a long row of similar keys until you notice that the black ones are not spread evenly. They come in small groups, and that pattern is a map you can use anywhere on the keyboard.</Lead>
          <p>Look along your keyboard. The black keys come <strong>two together</strong>, then <strong>three together</strong>, then two again, over and over. Find any group of two black keys. The white key immediately to the <strong>left</strong> of that pair is called <strong>C</strong>. Find the next group of two and the white key to its left is another C, a little higher.</p>
          <Reading>
            <p>The brackets above the picture are numbered 2, 3, 2: the sizes of the black-key groups you can see. Two white keys are glowing and lettered C. Each is directly to the left of a group of two. The small arrows underneath point to them.</p>
            <p>Notice the gaps too: there is no black key between E and F, or between B and C. That missing black key is part of the pattern.</p>
          </Reading>
          <Worked>
            <p>Start at the left of the picture. The first group is two black keys. Step down to the white key just left of the pair: that is C. Slide right past a group of three, and you reach the next group of two. The key to its left is the next C. We found two Cs without knowing a single other note name.</p>
          </Worked>
          <Try>
            <ol>
              <li>Find a group of two black keys on your own keyboard. Put a finger on the white key just to their left and play it. That is C.</li>
              <li>Find three different Cs, low, middle and high, and play each one.</li>
              <li>Without looking at the picture, point to every C along your keyboard.</li>
            </ol>
          </Try>
          <Notice>What did you look at to find C: the black keys or the white keys?</Notice>
          <Caveat>One of the Cs sits near the middle of most keyboards, and people call it <strong>middle C</strong>. It does not have to be in the exact middle of every synthesizer. You do not need to remember any numbers or read music yet. For now, knowing how to find C is enough.</Caveat>
        </Row>
      </>
    ) },
    { short: STEPS[3], sub: 'Seven names, then C again', body: (
      <>
        <Row figure={<Figure id="A05-native" caption="Eight white keys, seven different names." />}>
          <Lead>Once you can find C, the rest of the white keys fall into place. Only seven letter names are used, and they repeat.</Lead>
          <p>Starting on C, move to the very next white key on the right. It is <strong>D</strong>. Keep moving, one white key at a time: <strong>C – D – E – F – G – A – B</strong>. The next white key is <strong>C again</strong>, a little higher. After B the names begin again, which is why the keyboard needs only seven letters.</p>
          <Reading>
            <p>Eight white keys are numbered 1 to 8 above the picture and lettered C D E F G A B C. The first and last are both C. Read the picture left to right, like a sentence. Again there is no black key between E and F or between B and C.</p>
          </Reading>
          <Worked>
            <p>Play the key numbered 1 (C), then 2 (D), then 3 (E), all the way to 8. Eight keys, but only seven different names: the eighth is the first name coming back round, one step higher.</p>
          </Worked>
          <p>When we use these white keys from one C to the next, and let C feel like the place we begin and end, we are exploring the <strong>C major scale</strong>. The name has two parts: <strong>C</strong> is the home note, and <strong>major</strong> is the name of this particular pattern of notes. We do not need the mathematics of that pattern today. We only need to hear and explore it. Lesson 1B measures the steps exactly.</p>
          <Try>
            <ol>
              <li>Play C D E F G A B C slowly, saying each name aloud as you play it.</li>
              <li>Play it again and feel where the black keys are <em>not</em>: between E and F, and between B and C.</li>
              <li>Count how many different letter names you passed before C came back.</li>
            </ol>
          </Try>
          <p className="m4-notice">Seven: C, D, E, F, G, A, B. Then C came back, a little higher. The second C is not a second kind of note.</p>
        </Row>
        {door(['history-postcard'])}
      </>
    ) },
    { short: STEPS[4], sub: 'Why does C show up again?', body: (
      <>
        <Row figure={<Figure id="A06-native" art="A06" caption="The same name, one octave higher." />}>
          <Lead>The two Cs you played share a name but not a height. One is higher. Why do they get the same name?</Lead>
          <p>The distance from one C to the next C is called an <strong>octave</strong>. Notes an octave apart have a strong family resemblance: it can feel like the same character appearing on a higher floor of the same building. That is why the letter names repeat instead of running on to H, I and J.</p>
          <Reading>
            <p>Two Cs on one keyboard, joined by a dotted arc labelled “one octave up”. The painted spirals stand for the idea of coming round again at a higher level. Their size is not a measurement. The facts are in the keyboard: the left C is lower, the right C is higher, and each is directly to the left of a group of two black keys.</p>
          </Reading>
          <Worked>
            <p>Play the lower C, then the higher C, then the lower again. Same name, different height. You are hearing an octave.</p>
          </Worked>
          <Try>
            <ol>
              <li>Play a C, then the next C above it, then come back down.</li>
              <li>Pick a different pair of Cs on your keyboard and do the same.</li>
            </ol>
          </Try>
          <Notice>In what way do the two Cs feel the same? In what way different?</Notice>
          <Aside title="Optional science and theory: how an octave is measured">
            <p>In standard tuning, the higher C vibrates exactly twice as fast as the lower one. That 2:1 ratio of frequencies is part of why the two notes sound so closely related. Musicians also number octaves (C3, C4, C5 and so on) to tell the Cs apart. Different keyboards and software number them differently, and some call the C near the middle of the keyboard C3 while others call it C4. That is why this course uses letter names and the keyboard pattern, not octave numbers, and why our pictures are checked against real key positions.</p>
            <p>On a keyboard, one octave spans twelve semitones, the smallest steps between neighbouring keys, black and white. We will count them in Lesson 1B.</p>
          </Aside>
        </Row>
        {door(['behind-the-sound'])}
      </>
    ) },
    { short: STEPS[5], sub: 'Practice: up and back', body: (
      <>
        <Row flip figure={<Figure id="A07-native" art="A06" caption="Going up, then coming back down." />}>
          <Lead>Now travel the whole path once going up and once coming back down. It is practice for your fingers, your ears and your sense of where notes live.</Lead>
          <p>Play C D E F G A B C going up, then turn around and come back: C B A G F E D C. Do not hurry. Imagine each note as a step away from where you began, and the last note as a return. One finger is perfectly fine. Learning your way around matters far more than speed.</p>
          <Reading>
            <p>Two copies of the same eight keys. The top copy is numbered 1 to 8 from the left C to the right C: going up, left to right. The bottom copy is numbered 1 to 8 from the right C back to the left C: coming back, right to left.</p>
          </Reading>
          <Try>
            <ol>
              <li>Play the path up and back with one finger, slowly.</li>
              <li>Play it again and name each note aloud.</li>
              <li>Try playing it with your eyes on the picture, then with your eyes on your hands.</li>
            </ol>
          </Try>
          <Notice>Does the final C feel like a return? Or do you hear it differently today? Either answer is a useful observation.</Notice>
        </Row>
      </>
    ) },
    { short: STEPS[6], sub: 'Home, departure and return', body: (
      <>
        <Row figure={<Figure id="A04-native" art="M02:G01-B-concentric-home" mode="overlay" sq caption="C is home in this exercise because we chose it." />}>
          <Lead>Play the path up to D and stop. Then play it again and stop on C. Most people feel a difference at once: one stopping place feels unfinished, the other feels settled. Musicians have careful names for that feeling.</Lead>
          <p>On this journey we have chosen <strong>C</strong> as our <strong>home note</strong>: the sound we return to. Musicians call that sense of a central, resting pitch a <strong>tonal center</strong>. You may also meet the word <strong>tonic</strong> once a scale or key is clearly established. The important idea is <em>relationship</em>: another note can seem to move away from a centre, approach it or return to it, and the same note can play a different role when the music around it changes.</p>
          <Reading>
            <p>The glowing C in the middle is the note we chose as home. Around it, in order, are D E F G A B: the other white keys of our path. The dotted line goes out from C through each note and back home. How far each note sits from the centre is decoration, and so are the rings and colours: they do not measure how far apart notes sound. Only the letters and the order are facts.</p>
          </Reading>
          <Caveat><strong>Two cautions.</strong> First, C is home here because we chose it, not because C is special: another piece could choose a different note. Second, a single held C does not by itself make a chord or prove a key. A held C with an E is two pitches, not a C-major chord. A stronger sense of a tonal center grows from context: melodic patterns, harmony, repeated arrivals and how a piece treats its notes.</Caveat>
        </Row>
        <Row flip figure={<Figure id="A08-native" art="A08" caption="Same start, two stopping places." />}>
          <h3>Two endings: away from home and back</h3>
          <p>Here are two short journeys. Version 1 plays C D E F G and stops on G. Version 2 plays C D E, turns round and comes back D C, and stops on C.</p>
          <Reading>
            <p>Two keyboards. In Version 1 the numbers 1 to 5 run along C D E F G, and the last key, G, is marked as the stopping place. In Version 2 the path C D E D C visits some keys twice, so those keys carry two numbers (1,5 and 2,4). The final C is marked home. This is a practice example, not a recording of anything.</p>
          </Reading>
          <Try>
            <ol>
              <li>Play C D E F G and stop on G. Listen to how it feels to stop there.</li>
              <li>Play C D E D C and stop on C.</li>
              <li>Compare the two stopping places.</li>
            </ol>
          </Try>
          <Notice>Does ending on C feel different from stopping on G? Does it feel the same to you as it might to a friend? Music does not tell everyone to feel the same thing. The point is to notice.</Notice>
        </Row>
        {door(['musical-worlds'])}
      </>
    ) },
    { short: STEPS[7], sub: 'The first glimpse of two notes in relationship', body: (
      <>
        <Row figure={<Figure id="A09-native" art="A09" caption="C stays; one visitor comes and goes." />}>
          <Lead>So far we have played one note at a time. Now we keep one note sounding and let other notes visit it.</Lead>
          <p>Imagine C held softly underneath, like a floor. Play E above it, let it sound, then let it go while the C continues. Our foundation has not moved, but the space around it may feel different. Then try G, then D. That was two simultaneous notes: a held foundation and a moving upper voice. Musicians call this a simple <strong>harmonic relationship</strong>. We will study intervals and chords properly in later lessons. For today you only need to track two things: <strong>which note stays</strong> and <strong>which note changes</strong>.</p>
          <Reading>
            <p>Three timelines of six seconds, one for each example. In each, the lower bar is C, sounding the whole time. The upper bar is one visitor (E, then G, then D in the three examples) sounding from about 1 to 4.5 seconds, with a dashed “rest” before and after it. In the painting, the long golden band stands for the held C, and the three small strands rising from it stand for the visitors. Only the numbers on the timelines are measurements.</p>
          </Reading>
          <Worked>
            <p>Look at the first timeline. C is already there at 0 seconds. E arrives at about 1 second and has gone by about 4.5 seconds, while C is still sounding. The note that stayed is C. The note that changed is the upper one.</p>
          </Worked>
          <Try>
            <ol>
              <li>Hold C softly (a low C, with a sustain pedal, a latch button or a pad sound if you have one, or just keep a finger on it).</li>
              <li>With the other hand play E above it, let it go, then G, then D. Return to the held C between visitors.</li>
              <li>If you cannot hold a note, play C, then E, and imagine the C continuing beneath it.</li>
            </ol>
            <p style={{ fontSize: 15 }}>Optional external drone, opens on YouTube in a new tab, nothing plays on this page: <a href="https://www.youtube.com/watch?v=N5LqCQHQCGc" target="_blank" rel="noopener noreferrer">“C Drone For Musical Practice &amp; Meditation”, Tunes &amp; Tools – Jon Antonsson<span className="m4-sr"> (opens in a new tab)</span> ↗</a>, or a softer pad: <a href="https://www.youtube.com/watch?v=hhPX4n8rPIU" target="_blank" rel="noopener noreferrer">“C Major Pad”, Vishal Bhojane<span className="m4-sr"> (opens in a new tab)</span> ↗</a> (a pad in C major, so it sounds fuller than a single note). Videos can change or disappear; if one does, hold C yourself.</p>
          </Try>
          <Notice>Which visitor changes the atmosphere most for you? Which one sounds most comfortable with C, and which sounds like it is stepping away? Whatever you hear is a good answer.</Notice>
          <Caveat>A held C plus one visitor is two pitches. It is not yet a chord, and it does not prove a key. We keep it simple on purpose.</Caveat>
          <Aside title="Optional: try this idea in your music software">
            <p>In your DAW, make one soft note last 10–15 seconds. Choose a second, higher note that starts a few seconds later. Listen once with it, then replace it with a different higher note, keeping the first note and the sound settings unchanged. Describe what you altered in musical terms: “I kept the foundation but changed the upper pitch.”</p>
          </Aside>
        </Row>
        {door(['ambient-composers-notebook','hear-it-in-real-music'])}
      </>
    ) },
    { short: STEPS[8], sub: 'Carry the map with you', body: (
      <>
        <Row figure={<figure style={{ margin: 0 }}><div className="m4-fig"><img className="m4-native" src={`${W1}W1-08_look-draw-hide-imagine-reveal_learner.svg`} alt="A five-stage card: Look, Draw, Hide, Imagine, then find it on the real keyboard and check." loading="lazy" /></div><figcaption className="m4-cap"><a href={`${W1}pdf/W1-08_look-draw-hide-imagine-reveal_blank.pdf`}>Printable practice sheet (PDF)</a></figcaption></figure>}>
          <Lead>A keyboard is more than a set of buttons. As its pattern becomes familiar, you can start to imagine where a note lives even when the keys are not in front of you.</Lead>
          <p>Like knowing your way around a familiar neighbourhood, this picture helps musical ideas find a place. Here is a way to practise it, in five small stages, on your own keyboard and on paper.</p>
          <Reading>
            <p>The card shows the five stages in order, left to right. You do each one yourself; nothing on the page responds to you.</p>
          </Reading>
          <Try label="Five stages, on your own keyboard">
            <ol>
              <li><strong>Look.</strong> Notice the two black keys and find C.</li>
              <li><strong>Draw.</strong> Sketch one octave on paper, or trace its shape with your finger.</li>
              <li><strong>Hide.</strong> Cover the labels, or look away. Can you still find the same landmarks?</li>
              <li><strong>Imagine.</strong> Picture, gesture or say where E is. It is fine to keep the keyboard visible if you prefer.</li>
              <li><strong>Find it.</strong> Find E on the real keyboard, play it, and compare it with what you imagined.</li>
            </ol>
            <p>There is no score, no speed limit and no penalty. E is the white key two keys to the right of C, with one black key between them.</p>
          </Try>
        </Row>
        <Row flip figure={<figure style={{ margin: 0 }}><div className="m4-fig"><img className="m4-native" src={`${W1}W1-05_hear-imagine-sing-find-card_learner.svg`} alt="A card with four stages: hear a note, imagine it, hum or gesture its height, then find it and check." loading="lazy" /></div><figcaption className="m4-cap"><a href={`${W1}pdf/W1-05_hear-imagine-sing-find-card_blank.pdf`}>Printable card (PDF)</a></figcaption></figure>}>
          <h3>Hear a note before you play it</h3>
          <p>Play E above a held C, or just play E on its own. Now stop. Can you still hear E in your imagination? You can hum it, whistle it, trace its height with your hand, or simply think about it. Then find it on the keyboard and check.</p>
          <Try label="Listen, imagine, hum, find, compare">
            <ol>
              <li><strong>Listen</strong> to a note you play.</li>
              <li><strong>Imagine</strong> it for a few quiet seconds, with the sound stopped.</li>
              <li><strong>Hum or gesture</strong> its height. No microphone, no performance, just you.</li>
              <li><strong>Find it</strong> on the keyboard.</li>
              <li><strong>Compare</strong> what you found with what you imagined.</li>
            </ol>
          </Try>
          <p>The instrument is here to help you check what you imagined, not to grade you. Hearing, humming and finding are skills that grow stronger with practice. If the note is hard to hum, just decide whether it sits higher or lower than the one you heard before, and check by playing it.</p>
        </Row>
      </>
    ) },
    { short: STEPS[9], sub: 'Your first tiny musical story', body: (
      <>
        <Row figure={<Figure id="A10-native" art="A10" caption="An example idea; your notes will differ." />}>
          <Lead>Now use everything: choose notes, leave a pause, keep one sound underneath.</Lead>
          <p>Open your favourite synthesizer or music software. Start with a soft, sustained C. Choose just two or three upper notes you found interesting. Let them enter in whatever order you wish. One might arrive immediately; another might wait. Keep some space in the music.</p>
          <Reading>
            <p>Four boxes and a dashed pause: C, D, E, pause, C. This is an example, not the answer. Below it, a keyboard shows the first three keys. You will choose your own white keys.</p>
          </Reading>
          <Try label="Make a tiny world">
            <ol>
              <li>Choose three or four white keys between this C and the next C and play them in any order. Add a pause.</li>
              <li>End on C. Then play the same idea again and finish somewhere else. Which ending do you prefer today?</li>
              <li>Make a sketch of about 15 to 25 seconds. Before you add at least one note, try to imagine it.</li>
              <li>Try two versions: one where the second voice enters right away, and one where it waits.</li>
              <li>If you like, record your sketch on your own device and listen back without watching the piano roll.</li>
            </ol>
          </Try>
          <p>Notice how much the musical story changes even when the notes stay the same. One voice stayed. Another moved. You gave two sounds a relationship, and gave yourself a new way to tell a story.</p>
          <Caveat>Your sketch stays on your own instrument and device; nothing here asks you to upload anything.</Caveat>
        </Row>
      </>
    ) },
    { short: STEPS[10], sub: 'Sound and picture are old companions', body: (
      <>
        <Row flip figure={<Figure id="A11-native" art="A11" caption="Three empty circles: yours to fill." />}>
          <Lead>After you play a note or a tiny melody, sketch or imagine what the sound resembles.</Lead>
          <p>It might be a colour, a line, a texture or a shape in space. Then play a different note and compare. There is no fixed colour for any note, and no right answer: your own sound-to-colour interpretation is the point. Drawing is another way of listening more closely.</p>
          <Reading>
            <p>Three empty dashed circles labelled sound 1, sound 2 and sound 3, each with blank lines. They are yours to fill. The painting above is just one imagination’s idea of how a sound might look.</p>
          </Reading>
          <Try label="Paint what you hear">
            <ol>
              <li>Play one note and draw or colour whatever it brings to mind.</li>
              <li>Play another note and do it again. Compare the two.</li>
            </ol>
            <p>Print <a href={`${W1}pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf`}>the personal tonal atlas worksheet (PDF)</a> if you would like a page to draw on, and look for the “Paint What You Hear” door below.</p>
          </Try>
        </Row>
        {door(['paint-what-you-hear'])}
      </>
    ) },
    { short: STEPS[11], sub: 'The whole lesson on one page', body: (
      <>
        <Row figure={<Figure id="A12-native" art="M02:G01-B-concentric-home" caption="Recap sheet; print it for your music stand." />}>
          <Lead>Here is Lesson 1A on a single page. Come back to it whenever you want to refresh the map.</Lead>
          <Reading label="What the four panels show">
            <p>Panel 1: the two-then-three black-key pattern with both Cs highlighted. Panel 2: the white keys from one C to the next, an octave. Panel 3: C at the centre with D E F G A B around it, chosen as home in this exercise. Panel 4: a twelve-second timeline where a lower C is held while the upper voice visits E, G and D.</p>
          </Reading>
          <h3>Today’s words</h3>
          <ul style={{ paddingLeft: '1.2em', maxWidth: '38rem' }}>
            <li><strong>Pitch</strong> = how high or low a sound is.</li>
            <li><strong>Timbre</strong> (tone colour) = what makes a piano sound different from a flute on the same pitch.</li>
            <li><strong>C</strong> = the white key just left of a pair of black keys.</li>
            <li><strong>Octave</strong> = the distance from one C to the next higher or lower C.</li>
            <li><strong>Tonal center</strong> = a note that feels like a point of return, here chosen by us. <strong>Tonic</strong> is its name once a key is clear.</li>
            <li><strong>Drone</strong> = a long-held reference note.</li>
          </ul>
          <p>Print-ready sheets: <a href={`${W1}pdf/W1-06_keyboard-map_blank.pdf`}>keyboard map (PDF)</a>, <a href={`${W1}pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf`}>personal tonal atlas worksheet (PDF)</a> and the <a href="/soundscape/m03/native/A12-native.print.svg">ink-light recap sheet</a>.</p>
          <Notice>In the next lesson we measure the smallest steps on the keyboard, follow the whole-step and half-step pattern of C major, and try one journey two ways: an open ending and an arrival.</Notice>
        </Row>
        <DoorMap />
      </>
    ) },
]

export default function Lesson1A({ step }: { step: number | 'all' }) {
  return (
    <Stepper
      basePath={PATH}
      lessonCode="1A"
      eyebrow="Week 1 · Lesson 1 of 3"
      title={<>A Note Becomes <em>a Landscape</em></>}
      deck={<p style={{ margin: 0 }}>A single note can make a place. A second note can change everything about that place. In this lesson you will find your way around a keyboard, learn what a tonal center is, and hear how one steady note changes the notes that visit it.</p>}
      meta={<p className="m4-sub" style={{ marginTop: 14 }}>About 35–45 minutes at your own pace · All you need is a keyboard, your ears and a little curiosity · Twelve short steps</p>}
      steps={steps}
      current={step}
      prevLesson={{ href: `${BASE}/week-1`, label: 'Week 1' }}
      nextLesson={{ href: `${BASE}/week-1/lesson-1b`, label: 'Lesson 1B' }}
    />
  )
}
