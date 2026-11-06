import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../../m03.css'
import { Fig, load } from '@/components/soundscape/m03/Fig'

export const metadata: Metadata = { title: 'M03 contact sheet — Ajourné into Music', robots: { index: false, follow: false } }
export default async function Contact({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params
  const cw = load(), g = cw.groups[group]
  if (!g) notFound()
  const items = g.ids.map(i => cw.ids[i]).filter(Boolean)
  const shown = items.filter(i => i.render.length)
  return (
    <div className="m3">
      <img className="m3-atmos m3-atmos--tl" src="/soundscape/m02/art/A-corner-atmosphere.webp" alt="" aria-hidden="true" />
      <div className="m3-wrap">
        <header className="m3-hero"><p className="m3-eyebrow">M03 contact sheet</p><h1>{g.title}</h1><p className="m3-lead">{shown.length} figures. Each tile is the art with its native diagram over it, labelled with its catalogue ID. Static: nothing here plays sound or reveals anything.</p></header>
        <ul className="m3-grid m3-grid--big">
          {shown.map(i => (
            <li key={i.id}><div className="m3-card"><Fig r={i.render[0]} thumb alt={i.title} /><p className="m3-id">{i.id}</p><p className="m3-ttl">{i.title}</p><span className="m3-cls">{i.status}</span></div></li>
          ))}
        </ul>
        {items.some(i => !i.render.length) && <p className="m3-guard">Not produced as figures: {items.filter(i => !i.render.length).map(i => `${i.id} (${i.class.toLowerCase()})`).join(', ')}. See the crosswalk for reasons.</p>}
      </div>
    </div>
  )
}
