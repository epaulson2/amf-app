import type { ReactNode } from 'react'

export const DOOR_KINDS = [
  { id: 'history-postcard', title: 'History Postcard', blurb: 'Meet a musician, idea or moment in history that helps explain how people have understood music.', mark: 'H' },
  { id: 'behind-the-sound', title: 'Behind the Sound', blurb: 'Explore why notes blend, shimmer, clash or seem to pull somewhere—using acoustics and listening, without pretending every feeling has one physical cause.', mark: 'S' },
  { id: 'ambient-composers-notebook', title: "Ambient Composer's Notebook", blurb: 'Try a small creative insight for spacious, luminous electronic music that builds an atmosphere and can also tell a story.', mark: 'N' },
  { id: 'hear-it-in-real-music', title: 'Hear It in Real Music', blurb: 'Listen to actual musicians using an idea in a real composition or performance, with a short cue for what to notice.', mark: 'R' },
  { id: 'musical-worlds', title: 'Musical Worlds', blurb: 'Discover how another musical tradition approaches a related question on its own terms, with cultural context and a performance to hear.', mark: 'W' },
  { id: 'paint-what-you-hear', title: 'Paint What You Hear', blurb: 'Translate a musical experience into color, line, gesture, texture or space. Draw or paint how the sound feels to you, then listen again and notice what changed.', mark: 'P' },
] as const
export type DoorKind = (typeof DOOR_KINDS)[number]['id']

/** One optional drawer. Native <details>: keyboard and screen-reader operable, independent of its siblings. */
export function DiscoveryDoor({ kind, children, defaultOpen = false, title }: { kind: DoorKind; children?: ReactNode; defaultOpen?: boolean; title?: ReactNode }) {
  const k = DOOR_KINDS.find(d => d.id === kind)!
  return (
    <details className="sp-door" data-door={kind} open={defaultOpen || undefined}>
      <summary>
        <span aria-hidden="true" className="inline-flex items-center justify-center w-8 h-8 rounded border border-slate-300 text-sm font-bold text-slate-700 bg-slate-50 shrink-0">{k.mark}</span>
        <span>
          <span className="block font-semibold text-slate-900">{k.title}</span>
          <span className="block text-sm sp-muted leading-snug pr-6">{title ?? k.blurb}</span>
        </span>
      </summary>
      <div className="sp-door-body pt-3 text-base">{children ?? <p className="sp-muted m-0">The full card for this lesson arrives with the lesson page.</p>}</div>
    </details>
  )
}

/** The six doors, each with its own content slot. Invitations, never required to proceed. */
export function DiscoveryDoors({ content = {}, titles = {}, titleNodes = {} }: { content?: Partial<Record<DoorKind, ReactNode>>; titles?: Partial<Record<DoorKind, string | undefined>>; titleNodes?: Partial<Record<DoorKind, ReactNode>> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 items-start">
      {DOOR_KINDS.map(d => <DiscoveryDoor key={d.id} kind={d.id} title={titleNodes[d.id] ?? titles[d.id]}>{content[d.id]}</DiscoveryDoor>)}
    </div>
  )
}
