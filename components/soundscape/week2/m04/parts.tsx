import type { ReactNode } from 'react'
import { Try, Reading } from '../../m04/kit'

export const Check = ({ items }: { items: [string, string][] }) => (
  <Try label="Check yourself">
    <ul>{items.map(([q, a]) => <li key={q}><em>{q}</em> {a}</li>)}</ul>
  </Try>
)
export const Wrapup = ({ recap, bridge }: { recap: ReactNode; bridge: ReactNode }) => (
  <>
    <Reading label="Recap"><p>{recap}</p></Reading>
    <p className="m4-notice"><strong>Next.</strong> {bridge}</p>
  </>
)
export const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
export const doorBox = (kind: string, children: ReactNode) => <div className="m4-stepdoors" key={kind}><p>Optional side door · {kind}. Never required.</p>{children}</div>
/** Responsive table: a grid on wide screens, stacked cards on phones. */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  const cols = { ['--cols' as string]: head.length } as React.CSSProperties
  return (
    <div className="w2-table w2-table--n" role="table" style={cols}>
      <div role="row" className="w2-tr w2-th">{head.map(h => <span role="columnheader" key={h}>{h.replace(/\*\*/g, '')}</span>)}</div>
      {rows.map((r, i) => <div role="row" className="w2-tr" key={i}>{r.map((c, j) => <span role="cell" data-h={head[j].replace(/\*\*/g, '')} key={j}>{c.replace(/\*\*/g, '')}</span>)}</div>)}
    </div>
  )
}

export const Fig = ({ children, cap }: { children: ReactNode; cap: ReactNode }) => <figure className="w2-fig">{children}<figcaption className="m4-cap">{cap}</figcaption></figure>
export const Legend = () => <p className="w2-legend"><span className="w2-key w2-key--lo" aria-hidden="true" /> circle = lower voice · <span className="w2-key w2-key--up" aria-hidden="true" /> square = upper voice. Border and key colours name the interval (the Interval Palette colours); the numbers and names always say it too.</p>
export const Grid = ({ children }: { children: ReactNode }) => <div className="w2-grid">{children}</div>
