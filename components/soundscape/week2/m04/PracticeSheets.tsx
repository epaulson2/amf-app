import { Keys, BlankLanes } from './Diagrams'
import { M } from '@/lib/soundscape/week2/lesson2a-facts'

// Printable, answer-free worksheets for 2B and 2C. Static, no script, no audio. Prompts and blanks only; the lessons hold every answer.
const Line = ({ w = '10em' }: { w?: string }) => <span style={{ display: 'inline-block', minWidth: w, borderBottom: '1.5px solid #4a3b47' }}>&nbsp;</span>

export function Sheet2B() {
  return (
    <div className="w2-sheet">
      <p className="noprint">Lesson 2B practice sheet. To print it, use your browser&apos;s Print command. It makes no sound: you play on your own keyboard or synth.</p>
      <h1>Lesson 2B practice sheet: draw a conversation</h1>
      <p>Your name or date (optional): <Line w="12em" /></p>
      <h2>1. Your starting pair</h2>
      <p>Begin with <strong>C4 + E4</strong>. Move only one voice first, then let the other respond.</p>
      <Keys from={M.C4} to={M.G4} kw={40} marks={[{ midi: M.C4, voice: 'lower', label: 'C4' }, { midi: M.E4, voice: 'upper', label: 'E4' }]} title="Reference keyboard, C4 to G4" desc="White keys from C4 up to G4. C4 is marked with a circle as the lower voice and E4 with a square as the upper voice." />
      <p style={{ fontSize: 14 }}>Circle = lower voice. Square = upper voice.</p>
      <h2>2. Draw your path (15 to 20 seconds)</h2>
      <p>Write a note name in each box for each moment. Draw each voice as a line through time. Write the interval size between the lanes.</p>
      <BlankLanes cols={6} title="Blank two-lane path sheet" desc="An upper lane and a lower lane, each divided into six moments, with blank boxes for note names. Nothing is filled in." />
      <p>Interval size at each moment: <Line w="3em" /> <Line w="3em" /> <Line w="3em" /> <Line w="3em" /> <Line w="3em" /> <Line w="3em" /></p>
      <h2>3. Name each move</h2>
      {[1, 2, 3, 4, 5].map(n => (
        <div className="w2-card" key={n}>
          <h3>Move {n}</h3>
          <div className="w2-fill"><label>Which voice moved?<span className="line" /></label><label>Direction and distance<span className="line" /></label><label>Motion word<span className="line" /></label><label>Interval reached<span className="line" /></label></div>
        </div>
      ))}
      <h2>4. Change just one move</h2>
      <p>Which move did you change? <Line w="14em" /> What happened to the story? <Line w="18em" /></p>
      <h2>5. Reflect</h2>
      <p>Which voice made the biggest change? <Line w="18em" /></p>
      <p>Can you hear each line as a melody of its own? <Line w="16em" /></p>
    </div>
  )
}

export function Sheet2C() {
  return (
    <div className="w2-sheet">
      <p className="noprint">Lesson 2C planning and path sheet. To print it, use your browser&apos;s Print command. It makes no sound: you play on your own keyboard or synth.</p>
      <h1>Lesson 2C sheet: plan and draw your two sketches</h1>
      <p>Your name or date (optional): <Line w="12em" /></p>
      <h2>1. Plan your miniature</h2>
      <p>My upper melody is <Line w="14em" /> (two or three notes, with note names).</p>
      <p>In version one, the lower voice <Line w="22em" /></p>
      <p>In version two, the lower voice <Line w="22em" /></p>
      <h2>2. Version one: draw the two paths (about 30 to 45 seconds)</h2>
      <BlankLanes seconds={45} title="Blank two-voice planning lanes, version one" desc="An upper lane and a lower lane over a 45 second time axis, divided into 5 second boxes for note names. Nothing is filled in." />
      <h2>3. Version two: draw the two paths</h2>
      <BlankLanes seconds={45} title="Blank two-voice planning lanes, version two" desc="An upper lane and a lower lane over a 45 second time axis, divided into 5 second boxes for note names. Nothing is filled in." />
      <h2>4. Name one thing you can name</h2>
      <p>One interval or motion in my sketches: <Line w="20em" /> at about <Line w="4em" /> seconds.</p>
      <h2>5. Choose by intention</h2>
      <p>The atmosphere or story I want to share is <Line w="18em" />, so I chose version <Line w="3em" /> because <Line w="14em" />.</p>
    </div>
  )
}
