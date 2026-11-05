import './soundscape.css'

export default function SoundscapeLayout({ children }: { children: React.ReactNode }) {
  // The AMF Nav, footer and global CSS come from the root layout; this only scopes course tokens.
  return <div className="sp-root">{children}</div>
}
