'use client'
import Keyboard, { type Mark } from './Keyboard'
import { buildKeyboard, nameOf } from '@/lib/soundscape/m02/keyboard-geometry'
import { MOMENT, names, semis, worldsAt } from '@/lib/soundscape/m02/shared-worlds'
import { C as L2C } from '@/lib/soundscape/week2/fixtures'

// Leading B sits one octave below the C's octave (cMidi 48), so B=59, C=60, F=65: the exact MIDI values in the 2C fixtures.
const KB = buildKeyboard('B', 5, 48)

/** G03: two overlapping situations from Lesson 2C. Every label is computed from the fixtures (lib/soundscape/week2/fixtures.ts). */
export default function SharedWorlds({ initialOpen = false }: { initialOpen?: boolean }) {
  const f = worldsAt(MOMENT.F)
  const e = worldsAt(MOMENT.firstE)
  const [shared] = names(f.shared), [onlyHeld] = names(f.onlyHeld), [onlyMoving] = names(f.onlyMoving)
  const marks: Record<number, Mark> = {}
  f.onlyHeld.forEach(m => { marks[m] = { tone: 'held', label: nameOf(m) } })
  f.onlyMoving.forEach(m => { marks[m] = { tone: 'moving', label: nameOf(m) } })
  f.shared.forEach(m => { marks[m] = { tone: 'shared', label: nameOf(m) } })
  const up = f.shared[0]
const fEv = L2C.upper.find(x => x.midi === up)!
  return (
    <figure className="aj-fig aj-worlds" aria-labelledby="aj-worlds-cap">
      <div className="aj-worlds__heads" aria-hidden="true">
        <p><span className="aj-tag aj-tag--held">Situation 1</span> Lower voice <strong>holds</strong> <span className="aj-nw">on {onlyHeld}</span></p>
        <p><span className="aj-tag aj-tag--moving">Situation 2</span> Lower voice <strong>moves</strong> <span className="aj-nw">to {onlyMoving}</span></p>
      </div>
      <div className="aj-worlds__stage">
        <img className="aj-worlds__art" src="/soundscape/m02/art/G03-B-shared-worlds.webp" alt="" aria-hidden="true" width={1376} height={768} />
        <div className="aj-worlds__label aj-worlds__label--held"><b>{onlyHeld}</b><small>only here</small></div>
        <div className="aj-worlds__label aj-worlds__label--shared"><b>{shared}</b><small>shared</small></div>
        <div className="aj-worlds__label aj-worlds__label--moving"><b>{onlyMoving}</b><small>only here</small></div>
      </div>
      <p className="aj-worlds__sums" role="group" aria-label="The pairs at the moment the melody sits on F">
        <span>{onlyHeld} + {shared}: {shared} is {semis(f.onlyHeld[0], up)} steps above {onlyHeld}</span>
        <span>{onlyMoving} + {shared}: {shared} is {semis(f.onlyMoving[0], up)} steps above {onlyMoving}</span>
      </p>
      <Keyboard
        kb={KB} letters="none" groups={false} marks={marks} className="aj-kb aj-kb--strip aj-kb--short"
        title={`Five white keys, B C D E F. ${onlyHeld} is marked as only in situation 1, ${onlyMoving} as only in situation 2, and ${shared} as shared by both.`}
        desc={`At the moment the melody is on ${shared}: situation 1 sounds ${names(f.held).join(' and ')}; situation 2 sounds ${names(f.moving).join(' and ')}. Shared: ${names(f.shared).join(', ')}.`}
      />
      <details className="aj-more" open={initialOpen}>
        <summary>Show the other moments</summary>
        <p>At the first E and the last E of the melody both situations sound <strong>{names(e.held).join(' + ')}</strong>: the two circles would be the same, with nothing that differs. Only the F moment pulls them apart.</p>
      </details>
      <figcaption id="aj-worlds-cap" className="aj-legend">
        Two situations from Lesson 2C, at the moment the melody sits on {shared} ({fEv.start}–{fEv.start + fEv.dur} seconds into the example). The overlap is the note both share. How big each circle or the overlap is, is decoration, not a measure of how much the sounds blend.
      </figcaption>
    </figure>
  )
}
