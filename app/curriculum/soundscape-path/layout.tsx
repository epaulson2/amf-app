import './soundscape.css'
import './m04.css'
import { ajourneScript } from './fonts'
import CourseContentsNav from '@/components/soundscape/m04/CourseContentsNav'

export default function SoundscapeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`sp-root ${ajourneScript.variable}`}>
      <div className="m4-shell">
        <aside className="m4-shell__side"><CourseContentsNav /></aside>
        <div className="m4-shell__main">{children}</div>
      </div>
    </div>
  )
}
