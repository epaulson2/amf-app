'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'

export type View = 'learner' | 'reveal' | 'blank'
const Ctx = createContext<View>('learner')

/** Wraps a lesson: learner (answers hidden), reveal (answers shown) or blank (print worksheet). */
export function ViewModeProvider({ children, initial = 'learner' }: { children: ReactNode; initial?: View }) {
  const [view, setView] = useState<View>(initial)
  const opts: { id: View; label: string }[] = [
    { id: 'learner', label: 'Learner view' },
    { id: 'reveal', label: 'Reveal answers' },
    { id: 'blank', label: 'Blank worksheet (print)' },
  ]
  return (
    <Ctx.Provider value={view}>
      <div className="sp-lesson" data-view={view}>
        <fieldset className="sp-noprint mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <legend className="sp-sr-only">View mode</legend>
          {opts.map(o => (
            <label key={o.id} className="inline-flex items-center gap-2 min-h-[44px] cursor-pointer">
              <input type="radio" name="sp-view" checked={view === o.id} onChange={() => setView(o.id)} />
              {o.label}
            </label>
          ))}
          {view === 'blank' && (
            <button type="button" className="sp-btn sp-btn--ghost" onClick={() => window.print()}>Print this page</button>
          )}
        </fieldset>
        {children}
      </div>
    </Ctx.Provider>
  )
}

export function useView(): View {
  return useContext(Ctx)
}

/** Hidden until the learner chooses to reveal it (or the page is in reveal mode). Never gated on audio. */
export function AnswerReveal({ label = 'Reveal', children }: { label?: string; children: ReactNode }) {
  const view = useView()
  const [open, setOpen] = useState(false)
  const shown = view === 'reveal' || open
  return (
    <div className="sp-answer my-3">
      <button type="button" className="sp-btn sp-btn--ghost" aria-expanded={shown} onClick={() => setOpen(o => !o)} disabled={view === 'reveal'}>
        {shown ? 'Hide' : label}
      </button>
      {shown && <div className="sp-callout mt-3" role="region" aria-label={label}>{children}</div>}
    </div>
  )
}

/** Shown only in the printable blank view: writing lines for the learner's own answers. */
export function BlankLines({ n = 3, label }: { n?: number; label?: string }) {
  return (
    <div className="sp-blank" aria-hidden="true">
      {label && <p className="text-sm sp-muted m-0">{label}</p>}
      {Array.from({ length: n }, (_, i) => <span key={i} className="sp-blank-line" />)}
    </div>
  )
}
