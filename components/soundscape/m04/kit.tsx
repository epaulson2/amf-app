import Link from 'next/link'
import type { ReactNode } from 'react'
import figures from '@/lib/soundscape/m04/figures.json'

// Static illustrated-lesson kit. Server components only: no state, no audio, no scripts, no toggles. Navigation is ordinary links and anchors.
const FIG = figures as Record<string, { title: string; desc: string }>
const NATIVE = '/soundscape/m03/native/'
export const artSrc = (a: string) => (a.startsWith('M02:') ? `/soundscape/m02/art/${a.slice(4)}.webp` : `/soundscape/m03/art/${a}.webp`)

export function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="m4">
      <img className="m4-atmos m4-atmos--tl" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" width={1376} height={768} />
      <img className="m4-atmos m4-atmos--br" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" width={1376} height={768} loading="lazy" />
      {children}
    </div>
  )
}
export const Wrap = ({ children, narrow }: { children: ReactNode; narrow?: boolean }) => <div className={`m4-wrap${narrow ? ' m4-narrow' : ''}`}>{children}</div>

/** Painted art (decorative, aria-hidden) behind an exact native SVG. All facts and the text equivalent live in the SVG. */
export function Figure({ id, art, mode = 'behind', sq, caption, alt }: { id: string; art?: string; mode?: 'behind' | 'overlay'; sq?: boolean; caption?: ReactNode; alt?: string }) {
  const f = FIG[id]
  if (!f) throw new Error('unknown figure ' + id)
  const a = art ? <img className="m4-art" src={artSrc(art)} alt="" aria-hidden="true" loading="lazy" /> : null
  const n = <img className="m4-native" src={`${NATIVE}${id}.svg`} alt={alt ?? f.desc} loading="lazy" decoding="async" />
  const body = mode === 'overlay' ? <div className={`m4-fig m4-fig--overlay${sq ? ' m4-fig--sq' : ''}`}><div className="m4-stage">{a}{n}</div></div> : <div className="m4-fig">{a}{n}</div>
  return (
    <figure style={{ margin: 0 }}>
      {body}
      <figcaption className="m4-cap">{caption}{caption ? ' ' : ''}<a href={`${NATIVE}${id}.print.svg`}>Print-friendly version</a></figcaption>
    </figure>
  )
}
/** Art alone (for atmosphere/hero pieces that carry no facts). Decorative. */
export function ArtOnly({ art, className = '' }: { art: string; className?: string }) {
  return <div className={`m4-fig m4-fig--art ${className}`}><img className="m4-art" src={artSrc(art)} alt="" aria-hidden="true" loading="lazy" /></div>
}

export function Row({ figure, flip, wide, children }: { figure?: ReactNode; flip?: boolean; wide?: boolean; children: ReactNode }) {
  return <div className={`m4-row${flip ? ' m4-row--flip' : ''}${wide || !figure ? ' m4-row--wide' : ''}`}><div className="m4-text">{children}</div>{figure && <div className="m4-figcol">{figure}</div>}</div>
}
export const Lead = ({ children }: { children: ReactNode }) => <p className="m4-lead">{children}</p>
export const Reading = ({ children, label = 'How to read this picture' }: { children: ReactNode; label?: string }) => <div className="m4-reading"><span className="m4-label">{label}</span>{children}</div>
export const Worked = ({ children, label = 'A worked example' }: { children: ReactNode; label?: string }) => <div className="m4-worked"><span className="m4-label">{label}</span>{children}</div>
export const Try = ({ children, label = 'On your own keyboard' }: { children: ReactNode; label?: string }) => <div className="m4-try"><span className="m4-label">{label}</span>{children}</div>
export const Notice = ({ children }: { children: ReactNode }) => <p className="m4-notice">{children}</p>
export const Caveat = ({ children }: { children: ReactNode }) => <p className="m4-caveat">{children}</p>
/** Optional reading: a native <details>. It never hides required teaching or an answer; it only holds extra depth. */
export const Aside = ({ title, children }: { title: string; children: ReactNode }) => <details className="m4-aside"><summary>{title}</summary><div>{children}</div></details>

export function Step({ id, n, total, eyebrow, title, sub, prev, next, children }: { id: string; n: number; total: number; eyebrow?: string; title: ReactNode; sub?: string; prev?: { href: string; label: string }; next?: { href: string; label: string }; children: ReactNode }) {
  return (
    <section id={id} className="m4-step" aria-labelledby={`${id}-h`}>
      <p className="m4-eyebrow">{eyebrow ?? 'Step'} · <span className="m4-count">Step {n} of {total}</span></p>
      <h2 id={`${id}-h`}>{title}</h2>
      {sub && <p className="m4-sub">{sub}</p>}
      {children}
      <nav className="m4-nav" aria-label={`Step ${n} navigation`}>
        {prev ? <Link href={prev.href} scroll>← {prev.label}</Link> : <span />}
        {next ? <Link href={next.href} className="is-primary" scroll>{next.label} →</Link> : <span />}
      </nav>
    </section>
  )
}

export type StepDef = { id: string; short: string }
/** Lesson frame: light hero, jump-to-step index (ordinary anchors), content, optional doors, lesson prev/next. */
export function LessonFrame({ eyebrow, title, deck, meta, steps, children, doors, after, prev, next }: {
  eyebrow: string; title: ReactNode; deck: ReactNode; meta?: ReactNode; steps: StepDef[]; children: ReactNode; doors?: ReactNode; after?: ReactNode
  prev?: { href: string; label: string }; next?: { href: string; label: string }
}) {
  return (
    <Scene>
      <Wrap>
        <header className="m4-hero">
          <p className="m4-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <div className="m4-lead">{deck}</div>
          {meta}
          <nav aria-label="Steps in this lesson"><ol className="m4-toc">{steps.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.short}</a></li>)}</ol></nav>
        </header>
        {children}
        {doors}
        {after}
        <nav className="m4-nav" aria-label="Lesson navigation" style={{ marginTop: 40 }}>
          {prev ? <Link href={prev.href}>← {prev.label}</Link> : <span />}
          {next ? <Link href={next.href} className="is-primary">{next.label} →</Link> : <span />}
        </nav>
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}

export type StepSpec = { short: string; sub?: string; body: ReactNode }
export const parseStep = (raw: string | string[] | undefined, total: number): number | 'all' => {
  const v = Array.isArray(raw) ? raw[0] : raw
  if (v === 'all') return 'all'
  const n = Number(v)
  return Number.isInteger(n) && n >= 1 && n <= total ? n : 1
}

/** A lesson as a click-through course: the server renders ONE step per URL (?step=N). ?step=all renders every step for printing. */
export function Stepper({ basePath, eyebrow, title, deck, meta, steps, current, prevLesson, nextLesson, lessonCode }: {
  basePath: string; eyebrow: string; title: ReactNode; deck: ReactNode; meta?: ReactNode; steps: StepSpec[]; current: number | 'all'
  prevLesson: { href: string; label: string }; nextLesson: { href: string; label: string }; lessonCode: string
}) {
  const total = steps.length
  const href = (n: number) => `${basePath}?step=${n}#lesson-step`
  const all = current === 'all'
  const cur = all ? 1 : current
  const render = (i: number) => (
    <Step key={i} id={`step-${i + 1}`} n={i + 1} total={total} eyebrow={`Lesson ${lessonCode}`} title={steps[i].short} sub={steps[i].sub}
      prev={i === 0 ? prevLesson : { href: href(i), label: steps[i - 1].short }}
      next={i === total - 1 ? nextLesson : { href: href(i + 2), label: steps[i + 1].short }}>
      {steps[i].body}
    </Step>
  )
  return (
    <Scene>
      <Wrap>
        <header className="m4-hero m4-hero--lesson">
          <p className="m4-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {(cur === 1 || all) && <div className="m4-lead">{deck}</div>}
          {(cur === 1 || all) && meta}
          {!all ? (
            <nav aria-label="Steps in this lesson" className="m4-stepnav">
              <p className="m4-progress" aria-live="polite"><strong>Step {cur} of {total}</strong> · {steps[cur - 1].short}</p>
              <ol className="m4-dots" aria-hidden="true">{steps.map((_, i) => <li key={i} className={i + 1 === cur ? 'on' : i + 1 < cur ? 'done' : undefined} />)}</ol>
              <details className="m4-jump" key={`jump-${cur}`}>
                <summary>Jump to a step</summary>
                <ol className="m4-toc">{steps.map((s, i) => <li key={i}><Link href={href(i + 1)} aria-current={i + 1 === cur ? 'step' : undefined}>{s.short}</Link></li>)}</ol>
              </details>
            </nav>
          ) : (
            <p className="m4-caveat">You are viewing the whole lesson on one page, for printing or reading straight through. <Link href={`${basePath}?step=1`}>Go back to the step-by-step lesson</Link>.</p>
          )}
        </header>
        <div id="lesson-step" tabIndex={-1} className="m4-stepwrap">
          {all ? steps.map((_, i) => render(i)) : render(cur - 1)}
        </div>
        <p className="m4-printlink">{all ? <Link href={`${basePath}?step=1`}>← Back to the step-by-step lesson</Link> : <Link href={`${basePath}?step=all`}>Print or read the whole lesson on one page</Link>}</p>
        <p className="m4-foot">Ajourné into Music · Part of the Adaptable Musician&apos;s Framework</p>
      </Wrap>
    </Scene>
  )
}
