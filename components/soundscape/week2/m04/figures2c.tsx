import { Timeline, identityHex } from './Diagrams'
import { Fig } from './parts'
import { C } from '@/lib/soundscape/week2/fixtures'
import { intervalName, letterCount, semitones } from '@/lib/soundscape/week2/lesson2a-facts'

// Lesson 2C figures. The events are the 36-second fixtures (data only: the site plays nothing). Interval chips are computed at the midpoint of each upper note.
const lowerOf = (ev: typeof C.held) => ev.filter(e => e.role === 'drone')
const upper = C.upper
const A = lowerOf(C.held)
const B = lowerOf(C.moving)
const names = (lower: typeof A) => upper.map(u => { const lo = lower.find(e => e.start <= u.start + u.dur / 2 && u.start + u.dur / 2 < e.start + e.dur)!; return `${intervalName(lo.midi, u.midi) ?? ''} ${semitones(lo.midi, u.midi)}`.trim() })
const descA = `Time axis from 0 to 36 seconds. Lower voice: C4 for the whole 36 seconds. Upper voice: E4 from 4 to 10 seconds, F4 from 14 to 20, E4 from 26 to 32, resting in between. Where both sound: ${names(A).join('; ')}.`
const descB = `Lower voice: C4 from 0 to 12, B3 from 12 to 24, C4 from 24 to 36. The lower voice changes at 12 and 24 seconds, while the upper voice rests. Where both sound: ${names(B).join('; ')}.`

export const s3 = () => (
  <Fig cap="Version A. The upper voice sounds only in the three windows; the number in each chip is the interval in semitones while both sound."><Timeline upper={upper} variants={[{ label: 'Lower / held C4', events: A }]} title="Version A: C4 held for 36 seconds under E4, F4, E4" desc={descA} /></Fig>
)
export const s4 = () => (
  <Fig cap="Versions A and B share the identical upper line (drawn once). Only the lower line differs. The shaded window, 14 to 20 seconds, is the only moment where the interval differs: 5 in A, 6 in B."><Timeline upper={upper} variants={[{ label: 'A: lower / held', events: A }, { label: 'B: lower / moving', events: B }]} window={{ from: 14, to: 20, label: 'differs here' }} title="Versions A and B compared on one 36-second axis" desc={`${descA} ${descB} The two versions differ only from 14 to 20 seconds, where the interval is ${semitones(60, 65)} in version A and ${semitones(59, 65)} in version B.`} /></Fig>
)

/** Step 6: two vocabularies side by side (interval words vs movement words). HTML so it prints and reflows. */
export const s6 = () => (
  <div className="w2-vocab" role="group" aria-label="Two vocabularies">
    <div>
      <h4>Interval words</h4>
      <p>Name the pair <strong>at one moment</strong>.</p>
      <ul>
        <li style={{ borderColor: identityHex(4) }}>major third · 4</li>
        <li style={{ borderColor: identityHex(5) }}>perfect fourth · 5</li>
        <li style={{ borderColor: identityHex(6) }}>diminished fifth · 6</li>
      </ul>
    </div>
    <div className="w2-vocab__arrow" aria-hidden="true">⇄</div>
    <div>
      <h4>Movement words</h4>
      <p>Name the change <strong>between moments</strong>.</p>
      <ul>
        <li>oblique: one voice holds</li>
        <li>contrary: opposite directions</li>
        <li>similar: same direction</li>
      </ul>
    </div>
  </div>
)

export const sheetLink = () => (
  <p className="m4-notice">Prefer paper? <a href="/curriculum/soundscape-path/week-2/lesson-2c/practice-sheet">Open the printable planning and path sheet</a>. It makes no sound and has no answers on it.</p>
)
void letterCount
