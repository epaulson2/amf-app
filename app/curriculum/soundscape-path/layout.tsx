import './soundscape.css'
import { ajourneScript } from './fonts'

export default function SoundscapeLayout({ children }: { children: React.ReactNode }) {
  // The AMF Nav, footer and global CSS come from the root layout; this only scopes course tokens.
  return <div className={`sp-root ${ajourneScript.variable}`}>{children}</div>
}
