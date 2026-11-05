/** Outbound link to third-party audio or reading. Never hosted, embedded, scraped or autoplayed here. */
export default function ExternalLinkCard({ title, href, credit, note }: { title: string; href: string; credit: string; note?: string }) {
  return (
    <div className="sp-card p-4">
      <p className="font-semibold text-slate-900 m-0">{title}</p>
      <p className="text-sm sp-muted m-0 mt-1">Source: {credit}</p>
      <p className="text-sm sp-muted m-0 mt-1">{note ?? 'Opens on the publisher’s own site in a new tab. Not hosted or played here, and the publisher’s terms apply.'}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-medium" style={{ color: '#b45309' }}>
        Open on the publisher’s site<span className="sp-sr-only"> (opens in a new tab)</span> ↗
      </a>
    </div>
  )
}
