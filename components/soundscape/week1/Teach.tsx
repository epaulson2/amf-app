'use client'
import { useState, type ReactNode } from 'react'
import Md from '../Md'

/** Short teaching passages: 1-3 paragraphs, always visible, never behind audio or a drawer. */
export function Paras({ paras }: { paras: string[] }) {
  return <div className="sp-prose">{paras.map(p => <p key={p.slice(0, 40)}><Md>{p}</Md></p>)}</div>
}

export function Aside({ label, children }: { label?: string; children: ReactNode }) {
  return <div className="sp-callout max-w-2xl my-3">{label && <p className="font-semibold m-0 text-sm uppercase tracking-wide sp-muted">{label}</p>}<p className="m-0"><Md>{children as string}</Md></p></div>
}

/** A short, non-scored check with explanation. Retry any time; nothing is recorded. */
export function ChoiceCheck({ q, choices, correct, correctText, incorrectText }: { q: string; choices: string[]; correct: string; correctText: string; incorrectText: string }) {
  const [sel, setSel] = useState<string | null>(null)
  return (
    <div className="sp-card p-4 max-w-2xl my-4">
      <p className="font-semibold m-0">{q}</p>
      <div role="group" aria-label={q} className="flex flex-wrap gap-2 my-3">
        {choices.map(o => <button key={o} type="button" className="sp-btn sp-btn--ghost sp-choice" aria-pressed={sel === o} onClick={() => setSel(o)}>{o}</button>)}
      </div>
      {sel && <p role="status" className="sp-callout m-0">{sel === correct ? correctText : incorrectText}</p>}
      <p className="text-sm sp-muted m-0 mt-2">Not scored. Choose again whenever you like.</p>
    </div>
  )
}

/** Think first, then check: the explanation is one click away and works with sound off. */
export function ThinkThenCheck({ q, a, label = 'Show the explanation' }: { q: string; a: string; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sp-card p-4 max-w-2xl my-3">
      <p className="font-semibold m-0">{q}</p>
      <button type="button" className="sp-btn sp-btn--ghost mt-2" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? 'Hide' : label}</button>
      {open && <p role="status" className="sp-callout mt-3 mb-0"><Md>{a}</Md></p>}
    </div>
  )
}

export function Checks({ items, label }: { items: { q: string; correct: string }[]; label?: string }) {
  return <>{items.map(i => <ThinkThenCheck key={i.q} q={i.q} a={i.correct} label={label} />)}</>
}

export function Recap({ children, title = 'Recap' }: { children: string | string[]; title?: string }) {
  const ps = Array.isArray(children) ? children : [children]
  return (
    <aside className="sp-card p-5 max-w-2xl" aria-label={title}>
      <p className="sp-eyebrow m-0 mb-2">{title}</p>
      {ps.map(p => <p key={p.slice(0, 30)} className="m-0 mb-2"><Md>{p}</Md></p>)}
    </aside>
  )
}

export function Steps({ items }: { items: string[] }) {
  return <ol className="sp-prose pl-5 list-decimal">{items.map(s => <li key={s}><Md>{s}</Md></li>)}</ol>
}
