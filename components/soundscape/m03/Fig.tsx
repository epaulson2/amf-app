import { readFileSync } from 'node:fs'

export type Render = { native: string | null; art?: string; mode?: 'behind' | 'overlay'; sq?: boolean; html?: boolean }
export type Item = { id: string; title: string; class: string; status: string; placement?: string; objective?: string; how_to_read?: string; keyboard_action?: string; guard?: string; render: Render[]; reason?: string }
export type Crosswalk = { groups: Record<string, { title: string; blurb: string; ids: string[] }>; ids: Record<string, Item> }
export const NAT = '/soundscape/m03/native/'
const artSrc = (a: string) => (a.startsWith('M02:') ? `/soundscape/m02/art/${a.slice(4)}.webp` : `/soundscape/m03/art/${a}.webp`)

export const load = (): Crosswalk => JSON.parse(readFileSync(process.cwd() + '/docs/m03/crosswalk.json', 'utf8'))

export function Fig({ r, thumb, alt }: { r: Render; thumb?: boolean; alt: string }) {
  if (!r.native) { const a = r.art ? <img className="m3-art-only" src={artSrc(r.art)} alt={alt} /> : null; return thumb ? <div className="m3-thumb">{a}</div> : <figure className="m3-fig">{a}</figure> }
  if (r.html) return thumb ? <p className="m3-badge">Sheet: {r.native}.html</p> : <iframe className="m3-frame" src={`${NAT}${r.native}.html`} title={alt} sandbox="" loading="lazy" />
  const art = r.art ? <img className="m3-art" src={artSrc(r.art)} alt="" aria-hidden="true" /> : null
  const nat = <img className="m3-native" src={`${NAT}${r.native}.svg`} alt={alt} />
  if (!thumb && r.mode === 'overlay') return <div className={`m3-fig m3-fig--overlay${r.sq ? ' m3-sq' : ''}`}><div className="m3-stage">{art}{nat}</div></div>
  return thumb ? <div className="m3-thumb">{art}{nat}</div> : <figure className="m3-fig">{art}{nat}</figure>
}

