import type { ReactNode } from 'react'
import Md from '../Md'
import { copyOf, drawers } from '@/lib/soundscape/week1/content'
import { DOOR_KINDS, type DoorKind } from '../DiscoveryDoor'

const KIND_BY_SUFFIX: Record<string, DoorKind> = {
  HIST: 'history-postcard', SCI: 'behind-the-sound', AMBIENT: 'ambient-composers-notebook',
  REAL: 'hear-it-in-real-music', WORLD: 'musical-worlds', PAINT: 'paint-what-you-hear',
}
const PROSE = new Set(['Copy', 'Learner-facing copy', 'Intro', 'Creative connection'])
const LABELLED = new Set(['Try', 'Transfer', 'Listen for'])
const MATERIALS = new Set(['Materials/rights', 'Materials/privacy'])
const LINK_FIELDS = /^(Further reading|Source|Research|Historic context|Reference|Context|Additional listening\/context|Listen|Video|YouTube alternative|Recording \d)$/
// Editorial notes for the implementer, never learner copy.
const SKIP = new Set(['Accuracy', 'Guard', 'Rights', 'Copyright', 'Science guard', 'Attribution/accuracy', 'Title'])

const host = (u: string) => new URL(u).hostname.replace(/^www\./, '')

/** Outbound link(s) with the register's own access qualifications; never hosted, embedded or autoplayed. */
function LinkBlock({ label, value }: { label: string; value: string }) {
  const urls = [...value.matchAll(/https?:\/\/[^\s)`;·,]+/g)].map(m => m[0].replace(/[.]+$/, ''))
  const title = value.match(/^`([^`]+)`/)?.[1]
  const notes = [...value.matchAll(/\(([^)]*)\)/g)].map(m => m[1]).filter(t => !/^https?:/.test(t))
  const heading = /^Recording/.test(label) ? 'Listen' : label
  return (
    <div className="sp-card p-4 my-3">
      {title && <p className="font-semibold text-slate-900 m-0">{title}</p>}
      <p className="text-sm sp-muted m-0 mt-1">{heading}. Opens on the publisher’s own site in a new tab; not hosted or played here.</p>
      <ul className="m-0 mt-2 pl-5 list-disc text-base">
        {urls.map(u => (
          <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" className="font-medium break-all" style={{ color: '#b45309' }}>{host(u)}<span className="sp-sr-only"> (opens in a new tab)</span> ↗</a></li>
        ))}
      </ul>
      {notes.length > 0 && <p className="text-sm sp-muted m-0 mt-2">Note: {notes.join('; ')}.</p>}
    </div>
  )
}

function DrawerBody({ fields, kind }: { fields: [string, string][]; kind: DoorKind }) {
  return (
    <div className="space-y-2">
      {fields.map(([k, v], i) => {
        if (SKIP.has(k)) return null
        if (PROSE.has(k)) return <p key={i} className="m-0"><Md>{copyOf(v)}</Md></p>
        if (LABELLED.has(k)) return <p key={i} className="m-0"><strong>{k}:</strong> <Md>{copyOf(v)}</Md></p>
        if (MATERIALS.has(k)) return <p key={i} className="m-0 text-sm sp-muted">{copyOf(v)}</p>
        if (LINK_FIELDS.test(k)) return <LinkBlock key={i} label={k} value={v} />
        return null
      })}
      {kind === 'paint-what-you-hear' && (
        <p className="m-0"><a href="/soundscape/w1/pdf/W1-04_personal-tonal-atlas-worksheet_blank.pdf" className="font-medium" style={{ color: '#b45309' }}>Optional: download the blank atlas sheet (PDF)</a></p>
      )}
    </div>
  )
}

/** The six exact-copy drawers of one lesson, keyed for LessonShell. */
export function lessonDoors(lesson: '1A' | '1B' | '1C'): { content: Partial<Record<DoorKind, ReactNode>>; titles: Partial<Record<DoorKind, string>> } {
  const content: Partial<Record<DoorKind, ReactNode>> = {}
  const titles: Partial<Record<DoorKind, string>> = {}
  for (const d of drawers(lesson)) {
    const kind = KIND_BY_SUFFIX[d.id.split('-')[1]]
    if (!kind || !DOOR_KINDS.some(k => k.id === kind)) throw new Error(`unknown drawer ${d.id}`)
    titles[kind] = copyOf(d.fields.find(([k]) => k === 'Title')![1])
    content[kind] = <DrawerBody fields={d.fields} kind={kind} />
  }
  return { content, titles }
}
