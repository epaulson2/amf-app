'use client'
import { useState } from 'react'
import Keyboard from './Keyboard'
import { buildKeyboard } from '@/lib/soundscape/m02/keyboard-geometry'

const KB = buildKeyboard('C', 10)

/** G02: find C from the two-black-key landmark. Default = unlabelled; the learner may reveal the answer. */
export default function FindC({ initialReveal = false }: { initialReveal?: boolean }) {
  const [reveal, setReveal] = useState(initialReveal)
  return (
    <figure className="aj-fig aj-find" aria-labelledby="aj-find-cap">
      <div className="aj-find__stage">
        {/* B: optional soft light accent. Art only, behind the keys, never masking them. */}
        <img className="aj-find__accent" src="/soundscape/m02/art/G02-ACCENT-keyboard-light.webp" alt="" aria-hidden="true" width={1584} height={672} />
        <Keyboard
          kb={KB} revealC={reveal} letters={reveal ? 'all' : 'none'} className="aj-kb"
          title="A piano keyboard with ten white keys. The black keys come in a group of two, then a group of three, then a group of two."
          desc={reveal
            ? 'The two white keys marked C are each directly to the left of a group of two black keys.'
            : 'Black keys are grouped by brackets marked 2, 3 and 2. Find the white key just left of a group of two.'}
        />
      </div>
      <div className="aj-find__controls">
        <button type="button" className="aj-btn" aria-pressed={reveal} onClick={() => setReveal(r => !r)}>{reveal ? 'Hide the Cs' : 'Reveal the Cs'}</button>
        <p className="aj-live" role="status">{reveal ? 'Each C is the white key directly to the left of a group of two black keys.' : 'Try to find a C first, then check.'}</p>
      </div>
      <figcaption id="aj-find-cap" className="aj-legend">A drawing of a keyboard, not a keyboard: it makes no sound. Play the real one.</figcaption>
    </figure>
  )
}
