'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SUBNAV = [
  { href: '/ted-greene', label: 'Overview', exact: true },
  { href: '/ted-greene/assessment', label: 'Assessment' },
  { href: '/ted-greene/stage/1', label: 'Stage 1 — Fingerboard' },
]

export default function TedGreeneLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <nav style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: '#0f172a',
        position: 'sticky',
        top: 56,
        zIndex: 30,
      }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-1 h-10">
          {SUBNAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#d97706' : '#94a3b8',
                  padding: '0 10px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: active ? '2px solid #d97706' : '2px solid transparent',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
      {children}
    </div>
  )
}
