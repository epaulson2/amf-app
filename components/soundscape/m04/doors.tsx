import Link from 'next/link'
import { DiscoveryDoor, DOOR_KINDS, type DoorKind } from '../DiscoveryDoor'
import { lessonDoors } from '../week1/Doors'

/** The six original research doors of a lesson, each placed in the step it belongs to. Bodies and source links come untouched from the lesson source. */
export function buildDoors(code: '1A' | '1B' | '1C', path: string, where: Record<DoorKind, number>) {
  const D = lessonDoors(code)
  const door = (kinds: DoorKind[]) => (
    <div className="m4-stepdoors" key={kinds.join()}>
      <p>Optional side door{kinds.length > 1 ? 's' : ''} for this step. Never required.</p>
      {kinds.map(k => <div id={`door-${k}`} key={k}><DiscoveryDoor kind={k} title={D.titles[k]}>{D.content[k]}</DiscoveryDoor></div>)}
    </div>
  )
  const DoorMap = () => (
    <div className="m4-stepdoors">
      <h3>The six optional side doors</h3>
      <p>Each one opens where it belongs in the lesson. They are invitations, not homework.</p>
      <ul style={{ paddingLeft: '1.2em', maxWidth: '38rem' }}>
        {DOOR_KINDS.map(k => <li key={k.id}><Link href={`${path}?step=${where[k.id]}#door-${k.id}`}><strong>{k.title}</strong>: {D.titles[k.id]}</Link> <span style={{ color: '#6f5f6c' }}>(step {where[k.id]})</span></li>)}
      </ul>
    </div>
  )
  return { door, DoorMap }
}
