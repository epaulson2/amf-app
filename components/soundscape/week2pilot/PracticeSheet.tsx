import { Keys, letterCount, noteName } from './Diagrams'

// Lesson 2A practice sheet. Static and print-friendly: no script, no audio. Every note, letter count and semitone count is computed from MIDI numbers.
const START = { lo: 60, up: 64 }
const CHANGES = [
  { id: 1, text: 'Hold C4. Change E4 to F4.', lo: 60, up: 65, moved: 'upper' },
  { id: 2, text: 'Hold E4. Change C4 to B3.', lo: 59, up: 64, moved: 'lower' },
  { id: 3, text: 'Hold E4. Change C4 to D4.', lo: 62, up: 64, moved: 'lower' },
] as const
const NAME: Record<number, string> = { 2: 'major second', 5: 'perfect fourth' }
export const sheetFacts = CHANGES.map(c => {
  const semis = c.up - c.lo
  const from = c.moved === 'upper' ? c.up - START.up : c.lo - START.lo
  return { ...c, semis, letters: letterCount(c.lo, c.up), name: NAME[semis], dir: from > 0 ? 'up' : 'down', by: Math.abs(from) }
})

const Fill = ({ children }: { children: string }) => <label>{children}{children.endsWith("?") ? "" : ":"} <span className="line" /></label>

export default function PracticeSheet() {
  return (
    <div className="w2-sheet">
      <p className="noprint">Lesson 2A practice sheet. To print it, use your browser&apos;s Print command. It makes no sound: all the playing happens on your own keyboard or synth.</p>
      <h1>Lesson 2A practice sheet: three little changes</h1>
      <p>Your name or date (optional): <span style={{ display: 'inline-block', minWidth: '12em', borderBottom: '1.5px solid #4a3b47' }}>&nbsp;</span></p>

      <h2>1. Your starting pair</h2>
      <p>Play <strong>C4</strong> (lower voice) and <strong>E4</strong> (upper voice) together on your own instrument. Use separate tracks if you can. Count the interval: letters C, D, E = 3; semitone moves = 4.</p>
      <Keys from={60} to={67} kw={40} marks={[{ midi: 60, voice: 'lower', label: 'C4' }, { midi: 64, voice: 'upper', label: 'E4' }]} title="Reference keyboard, C4 to G4" desc="White keys from C4 up to G4. C4 is marked with a circle as the lower voice and E4 with a square as the upper voice." />
      <p style={{ fontSize: 14 }}>Circle = lower voice. Square = upper voice. Count semitone moves from zero, not from the key you start on.</p>

      <h2>2. Three single changes. Reset to C4 + E4 before each one.</h2>
      {sheetFacts.map(c => (
        <div className="w2-card" key={c.id}>
          <h3>Change {c.id}: {c.text}</h3>
          <p>From <strong>C4 + E4</strong> to <strong>{noteName(c.lo)} + {noteName(c.up)}</strong>. Before you play it, hum the new note or point to it on the keys.</p>
          <div className="w2-fill">
            <Fill>Which voice moved?</Fill><Fill>Direction</Fill><Fill>Moved by how many semitones?</Fill>
            <Fill>Letters (both ends)</Fill><Fill>Semitone moves</Fill><Fill>Name of the new interval</Fill>
          </div>
        </div>
      ))}

      <h2>3. Draw your two lines</h2>
      <p>Draw how each voice moves through time. Both lines start at their notes. Draw one flat line where a voice holds, and a slanting line where it moves.</p>
      {[1, 2, 3].map(n => (
        <div key={n} className="w2-lines" aria-label={`Drawing area for change ${n}`}>
          <p style={{ margin: '8px 0 0', fontSize: 14 }}><strong>Change {n}</strong></p>
          <div className="row"><span>E4</span><div className="rail" /></div>
          <div className="row"><span>C4</span><div className="rail" /></div>
        </div>
      ))}
      <p style={{ fontSize: 14 }}>The top line is the upper voice and starts on E4. The bottom line is the lower voice and starts on C4. Write the new note name where each line ends.</p>

      <h2>4. Which would you use in a slow ambient piece?</h2>
      <p>Change number <span style={{ display: 'inline-block', minWidth: '3em', borderBottom: '1.5px solid #4a3b47' }}>&nbsp;</span> because <span style={{ display: 'inline-block', minWidth: '16em', borderBottom: '1.5px solid #4a3b47' }}>&nbsp;</span></p>
      <p style={{ fontSize: 14 }}>There is no correct answer. Nobody scores this sheet. Your ears and taste decide.</p>

      <details className="m4-aside noprint">
        <summary>Check your work (answers)</summary>
        <div>
          <ul>
            {sheetFacts.map(c => <li key={c.id}>Change {c.id}: the {c.moved} voice moved {c.dir} {c.by} semitone{c.by > 1 ? 's' : ''}; new pair {noteName(c.lo)} + {noteName(c.up)}; {c.letters} letters, {c.semis} semitones: a {c.name}.</li>)}
          </ul>
        </div>
      </details>
    </div>
  )
}
