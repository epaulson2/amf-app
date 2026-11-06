import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../m03.css'
import { Fig, load } from '@/components/soundscape/m03/Fig'

export const metadata: Metadata = { title: 'M03 asset review — Ajourné into Music', robots: { index: false, follow: false } }

export async function generateStaticParams() { return Object.keys(load().groups).map(group => ({ group })) }

export default async function M03Group({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params
  const cw = load(), g = cw.groups[group]
  if (!g) notFound()
  const items = g.ids.map(i => cw.ids[i]).filter(Boolean)
  const shown = items.filter(i => i.render.length)
  return (
    <div className="m3">
      <img className="m3-atmos m3-atmos--tl" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" />
      <img className="m3-atmos m3-atmos--br" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" />
      <div className="m3-wrap">
        <p className="m3-banner"><b>M03 asset review · static</b><span>Isolated branch · not deployed · no sound, toggles or reveals: all playing is on your own keyboard</span></p>
        <header className="m3-hero">
          <p className="m3-eyebrow">Ajourné into Music · M03 assets</p>
          <h1>{g.title}</h1>
          <p className="m3-lead">{g.blurb} {shown.length} figures with artwork or native diagrams, {items.length - shown.length} further catalogue entries are recorded in the crosswalk.</p>
        </header>
        <section className="m3-sheet" aria-labelledby="sheet-h">
          <h2 id="sheet-h">Contact sheet</h2>
          <ul className="m3-grid">
            {shown.map(i => (
              <li key={i.id}><a className="m3-card" href={`#fig-${i.id}`} aria-label={`${i.id}: ${i.title}`}>
                <Fig r={i.render[0]} thumb alt={`${i.title}`} />
                <p className="m3-id">{i.id}</p><p className="m3-ttl">{i.title}</p><span className="m3-cls">{i.class}</span>
              </a></li>
            ))}
          </ul>
        </section>
        {shown.map((i, n) => (
          <section key={i.id} id={`fig-${i.id}`} className="m3-step" aria-labelledby={`h-${i.id}`}>
            <div className={`m3-cols${n % 2 ? ' m3-cols--flip' : ''}`}>
              <div className="m3-text">
                <p className="m3-eyebrow">{i.id} · {i.placement ?? g.title}</p>
                <h2 id={`h-${i.id}`}>{i.title}</h2>
                {i.objective && <p className="m3-lead">{i.objective}</p>}
                {i.how_to_read && <p className="m3-how"><strong>How to read it.</strong> {i.how_to_read}</p>}
                {i.keyboard_action && <div className="m3-try"><b>Try it on your own keyboard</b><p>{i.keyboard_action}</p></div>}
                {i.guard && <p className="m3-guard">{i.guard}</p>}
              </div>
              <div>{i.render.map((r, k) => <Fig key={k} r={r} alt={i.title} />)}</div>
            </div>
          </section>
        ))}
        <section className="m3-step" aria-labelledby="rest-h"><h2 id="rest-h">Catalogue entries without a figure here</h2>
          <ul>{items.filter(i => !i.render.length).map(i => <li key={i.id}><strong>{i.id}</strong> {i.title}: <em>{i.class}</em>. {i.reason}</li>)}</ul></section>
      </div>
    </div>
  )
}
