'use client'
import { useState, type ReactNode } from 'react'
import Md from '../Md'
import { ThinkThenCheck } from '../week1/Teach'
import Fig from '../week1/Fig'
import { PROVENANCE } from '@/lib/soundscape/fixtures'
import { V, checksOf, stepsOf, studioOf } from '@/lib/soundscape/visual/copy'

/**
 * A graphic that teaches: heading, the picture first, then how to read it, a guided walk that highlights the
 * picture step by step, a reasoned check, a studio transfer, and honest source labelling.
 * `figure(step)` receives the active step (-1 = none) so the picture can highlight the exact notes being discussed.
 */
export default function VisualTeachingBlock({ id, k, figure, legend, steps, extra, art, inspect, sourceNote, readAloud, hideParas }: {
  id: string; k: string; figure: (step: number) => ReactNode; legend?: string
  steps?: string[]; extra?: ReactNode
  art?: { src: string; alt: string; caption: string }
  inspect?: { folder: 'w1' | 'w2'; file: string; label: string }
  sourceNote: string; readAloud?: string
  /** Paragraphs that would give away a hidden answer stay out of the page until the learner asks for it. */
  hideParas?: (p: string) => boolean
}) {
  const v = V[k]
  const list = steps ?? stepsOf(v.steps)
  const [step, setStep] = useState(-1)
  const checks = checksOf(v.check)
  const studio = studioOf(v.studio)
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="sp-vtb my-8 scroll-mt-24" data-visual={k}>
      <h3 id={`${id}-h`} className="sp-editorial-title text-2xl font-medium text-slate-900 mt-0">{v.heading}</h3>
      <div className="sp-card p-3 sm:p-4 mt-3">
        {art && (
          <figure className="m-0 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={art.src} alt={art.alt} className="w-full h-auto block rounded" loading="lazy" />
            <figcaption className="text-sm sp-muted mt-1">{art.caption}</figcaption>
          </figure>
        )}
        {figure(step)}
        {legend && <p className="text-sm sp-muted m-0 mt-2"><Md>{legend}</Md></p>}
      </div>
      <div className="sp-prose mt-4">{v.paras.filter(p => !hideParas?.(p)).map(p => <p key={p.slice(0, 40)}><Md>{p}</Md></p>)}</div>
      {list.length > 0 && (
        <div className="mt-2" role="group" aria-label="Guided walk">
          <h4 className="text-lg font-semibold text-slate-900 m-0">Walk through it</h4>
          <ol className="sp-prose pl-5 list-decimal mt-2">
            {list.map((s, i) => (
              <li key={i} aria-current={step === i ? 'step' : undefined} className={step === i ? 'font-semibold' : undefined}>
                <button type="button" className="text-left underline decoration-dotted min-h-[44px]" onClick={() => setStep(i)}>{s}</button>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-2 sp-noprint">
            <button type="button" className="sp-btn sp-btn--ghost" disabled={step <= 0} onClick={() => setStep(step - 1)}>Previous step</button>
            <button type="button" className="sp-btn sp-btn--ghost" disabled={step >= list.length - 1} onClick={() => setStep(step + 1)}>{step < 0 ? 'Start the walk' : 'Next step'}</button>
            {step >= 0 && <button type="button" className="sp-btn sp-btn--ghost" onClick={() => setStep(-1)}>Clear highlight</button>}
          </div>
          {step >= 0 && <p role="status" className="sp-callout max-w-2xl mt-3 mb-0"><strong>Step {step + 1} of {list.length}.</strong> {list[step]}</p>}
        </div>
      )}
      {extra}
      {readAloud && (
        <details className="mt-3"><summary className="cursor-pointer min-h-[44px] flex items-center font-medium">Read it without the picture</summary><p className="m-0"><Md>{readAloud}</Md></p></details>
      )}
      {checks.length > 0 && (
        <div className="mt-4"><h4 className="text-lg font-semibold text-slate-900 m-0">Check your reading</h4>{checks.map(c => <ThinkThenCheck key={c.q} q={c.q} a={c.correct} />)}</div>
      )}
      {studio && <p className="sp-callout max-w-2xl"><strong>In your studio.</strong> {studio}</p>}
      {inspect && (
        <details className="mt-3 sp-noprint"><summary className="cursor-pointer min-h-[44px] flex items-center font-medium">{inspect.label}</summary><Fig folder={inspect.folder} file={inspect.file} mode="plain" /></details>
      )}
      <p className="text-xs sp-muted m-0 mt-2">{sourceNote} Source files: {PROVENANCE.repo} @ {PROVENANCE.commit}.</p>
    </section>
  )
}
