import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { ViewModeProvider } from './ViewMode'
import { DiscoveryDoors, type DoorKind } from './DiscoveryDoor'
import { AudioProvider } from './AudioProvider'

export type NavTarget = { href: string; label: string } | null

/** Reusable lesson frame: AMF navy header band, objectives, teaching blocks, six doors, resources, prev/next. */
export default function LessonShell(props: {
  eyebrow: string
  title: string
  intro?: ReactNode
  objectives?: string[]
  blocks: { id: string; heading: string; body: ReactNode }[]
  doors?: Partial<Record<DoorKind, ReactNode>>
  doorTitles?: Partial<Record<DoorKind, string | undefined>>
  doorTitleNodes?: Partial<Record<DoorKind, ReactNode>>
  doorsHeading?: string
  doorsIntro?: string | null
  audio?: boolean
  heroCtas?: ReactNode
  resources?: ReactNode
  prev?: NavTarget
  next?: NavTarget
}) {
  const { eyebrow, title, intro, objectives, blocks, doors, doorTitles, doorTitleNodes, doorsHeading = 'Follow your curiosity', doorsIntro, audio = false, heroCtas, resources, prev = null, next = null } = props
  const Audio = audio ? AudioProvider : Fragment
  return (
    <article>
      <header className="sp-hero py-10 px-4 sm:px-6" style={{ backgroundColor: '#0f172a' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-300 text-sm mb-2">{eyebrow}</p>
          <h1 className="sp-editorial-title text-white text-3xl sm:text-4xl m-0">{title}</h1>
          {intro && <div className="text-slate-300 mt-3 max-w-2xl">{intro}</div>}
          {heroCtas && <div className="mt-5 flex flex-wrap gap-3">{heroCtas}</div>}
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Audio>
        <ViewModeProvider>
          {objectives && objectives.length > 0 && (
            <section aria-labelledby="sp-objectives" className="mb-8">
              <h2 id="sp-objectives" className="text-xl font-semibold text-slate-900">In this lesson</h2>
              <ul className="sp-prose pl-5 list-disc">{objectives.map(o => <li key={o}>{o}</li>)}</ul>
            </section>
          )}
          {blocks.map((b, i) => (
            <section key={b.id} id={b.id} aria-labelledby={`${b.id}-h`} className="mb-10">
              <h2 id={`${b.id}-h`} className="sp-editorial-heading text-2xl text-slate-900 mb-3"><span className="sp-muted text-base font-medium mr-2">{i + 1}</span>{b.heading}</h2>
              {b.body}
            </section>
          ))}
          <section aria-labelledby="sp-doors" className="mt-12 border-t border-slate-200 pt-8">
            <h2 id="sp-doors" className="sp-editorial-heading text-2xl text-slate-900 mb-1">{doorsHeading}</h2>
            {doorsIntro !== null && <p className="sp-prose sp-muted">{doorsIntro ?? 'These are invitations, not extra homework. Open one, open them all, or save them for another day.'}</p>}
            <DiscoveryDoors content={doors} titles={doorTitles} titleNodes={doorTitleNodes} />
          </section>
          {resources && (
            <section aria-labelledby="sp-res" className="mt-10"><h2 id="sp-res" className="text-xl font-semibold text-slate-900">Resources</h2>{resources}</section>
          )}
        </ViewModeProvider>
        </Audio>
        <nav aria-label="Lesson navigation" className="sp-noprint mt-12 flex justify-between gap-4 border-t border-slate-200 pt-6">
          {prev ? <Link href={prev.href} className="font-medium" style={{ color: '#b45309' }}>← {prev.label}</Link> : <span />}
          {next ? <Link href={next.href} className="font-medium" style={{ color: '#b45309' }}>{next.label} →</Link> : <span />}
        </nav>
      </div>
    </article>
  )
}
