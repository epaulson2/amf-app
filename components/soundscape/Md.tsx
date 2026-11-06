import type { ReactNode } from 'react'

/** Minimal inline markdown for approved copy: **bold** and *italic* only. */
export default function Md({ children }: { children: string }) {
  const parts: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0, m: RegExpExecArray | null, i = 0
  while ((m = re.exec(children))) {
    if (m.index > last) parts.push(children.slice(last, m.index))
    parts.push(m[1] ? <strong key={i++}>{m[1]}</strong> : <em key={i++}>{m[2]}</em>)
    last = re.lastIndex
  }
  parts.push(children.slice(last))
  return <>{parts}</>
}
