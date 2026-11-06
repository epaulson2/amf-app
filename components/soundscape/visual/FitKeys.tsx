'use client'
import Keys, { type Mark } from '../week1/Keys'

/** Keyboard that fits a 320px page: a range wider than one octave stacks into two rows on narrow screens. */
export default function FitKeys({ lo, hi, title, showNames, labels, marks, onKey, selected }: {
  lo: number; hi: number; title: string; showNames: boolean; labels?: Record<number, string>; marks?: Record<number, Mark>
  onKey?: (m: number) => void; selected?: number[]
}) {
  if (hi - lo <= 12) return <Keys lo={lo} hi={hi} title={title} showNames={showNames} labels={labels} marks={marks} onKey={onKey} selected={selected} />
  const mid = lo + 12
  return (
    <>
      <div className="hidden sm:block"><Keys lo={lo} hi={hi} title={title} showNames={showNames} labels={labels} marks={marks} onKey={onKey} selected={selected} /></div>
      <div className="sm:hidden space-y-2">
        <Keys lo={lo} hi={mid} title={`${title} (lower octave)`} showNames={showNames} labels={labels} marks={marks} onKey={onKey} selected={selected} />
        <Keys lo={mid} hi={hi} title={`${title} (upper octave)`} showNames={showNames} labels={labels} marks={marks} onKey={onKey} selected={selected} />
      </div>
    </>
  )
}
