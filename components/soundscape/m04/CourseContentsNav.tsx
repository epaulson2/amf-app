'use client'
// Persistent course contents for every Ajourné route. Pure navigation: no progress, no state saved, no sound.
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { BASE } from '@/lib/soundscape/course'
import { TREE_WEEKS, FUTURE_WEEKS } from '@/lib/soundscape/course-nav'

const TOP = [
  { href: BASE, label: 'Ajourné Introduction' },
  { href: `${BASE}/how-it-works`, label: 'How We Learn' },
  { href: `${BASE}/journey`, label: 'Eight-Week Journey' },
]
const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

function Tree({ stepParam }: { stepParam: string | null }) {
  const path = trim(usePathname() || '')
  const parsed = stepParam === 'all' ? null : Math.max(1, parseInt(stepParam || '1', 10) || 1)
  const activeLesson = TREE_WEEKS.flatMap(w => w.lessons).find(l => l.href === path)?.id ?? null
  const [panel, setPanel] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>(() => (activeLesson ? { [activeLesson]: true } : {}))

  // Opening the active branch on navigation; closing the small-screen panel once a page is chosen.
  useEffect(() => {
    if (activeLesson) setOpen(o => (o[activeLesson] ? o : { ...o, [activeLesson]: true }))
    setPanel(false)
  }, [path, stepParam, activeLesson])

  const cur = (on: boolean) => (on ? ({ 'aria-current': 'page' } as const) : {})

  return (
    <nav className="m4-tree" aria-label="Ajourné course contents" data-open={panel}>
      <button type="button" className="m4-tree__toggle" aria-expanded={panel} aria-controls="m4-tree-panel" onClick={() => setPanel(p => !p)}>
        <span>Course contents</span>
        <span className="m4-tree__chev" aria-hidden="true">{panel ? '▴' : '▾'}</span>
      </button>
      <div id="m4-tree-panel" className="m4-tree__panel">
        <p className="m4-tree__title">Ajourné</p>
        <ul className="m4-tree__list">
          {TOP.map(t => (
            <li key={t.href}><Link href={t.href} className="m4-tree__link" {...cur(path === t.href)}>{t.label}</Link></li>
          ))}
          {TREE_WEEKS.map(w => (
            <li key={w.n} className="m4-tree__week">
              <Link href={w.href} className="m4-tree__link m4-tree__link--week" {...cur(path === w.href)}>
                Week {w.n} <span className="m4-tree__wk">{w.n === 1 ? 'overview' : 'overview'}</span>
              </Link>
              <ul className="m4-tree__list m4-tree__list--in">
                {w.lessons.map(l => {
                  const isOpen = !!open[l.id] && !!l.steps
                  const id = `m4-tree-${l.id}`
                  return (
                    <li key={l.id} className="m4-tree__lesson">
                      <div className="m4-tree__lrow">
                        <Link href={l.steps ? `${l.href}?step=1` : l.href} className="m4-tree__link m4-tree__link--lesson" {...cur(!l.steps && path === l.href)}>
                          <b>{l.id}</b> {l.title}
                          {!l.steps && <span className="m4-tree__tag">existing lesson</span>}
                        </Link>
                        {l.steps && (
                          <button type="button" className="m4-tree__caret" aria-expanded={isOpen} aria-controls={id}
                            aria-label={`${isOpen ? 'Hide' : 'Show'} the steps of Lesson ${l.id}`}
                            onClick={() => setOpen(o => ({ ...o, [l.id]: !o[l.id] }))}>
                            <span aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                          </button>
                        )}
                      </div>
                      {l.steps && (
                        <ol id={id} className="m4-tree__steps" hidden={!isOpen}>
                          {l.steps.map((s, i) => (
                            <li key={s}>
                              <Link href={`${l.href}?step=${i + 1}`} className="m4-tree__link m4-tree__link--step" {...cur(activeLesson === l.id && parsed === i + 1)}>
                                <span className="m4-tree__n">{i + 1}</span> {s}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
          {FUTURE_WEEKS.map(w => (
            <li key={w.n} className="m4-tree__future">
              <span className="m4-tree__link m4-tree__link--off">Week {w.n} <span className="m4-tree__tag">in preparation</span></span>
              <span className="m4-tree__sub">{w.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function WithParams() {
  const sp = useSearchParams()
  return <Tree stepParam={sp.get('step')} />
}

export default function CourseContentsNav() {
  return (
    <Suspense fallback={<Tree stepParam={null} />}>
      <WithParams />
    </Suspense>
  )
}
