'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type NavLink = { href: string; label: string; match?: (p: string) => boolean }

const PRIMARY: NavLink[] = [
  { href: '/musical-universe', label: 'Musical Universe' },
  { href: '/',                 label: 'Sprints', match: p => p === '/' || p.startsWith('/sprints') },
  { href: '/plogger',          label: 'Plogger' },
  { href: '/audio',            label: 'Audio Lab' },
  { href: '/arranger',         label: 'Arranger' },
  { href: '/curriculum',       label: 'Curriculum' },
]

const MORE: NavLink[] = [
  { href: '/ted-greene',  label: 'Ted Greene' },
  { href: '/genre-labs',  label: 'Genre Labs' },
  { href: '/systems',     label: 'Systems' },
  { href: '/materials',   label: 'Materials' },
  { href: '/pedagogy',    label: 'Pedagogy' },
  { href: '/technology',  label: 'Technology' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  function isActive({ href, match }: NavLink) {
    if (match) return match(pathname)
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const isMoreActive = MORE.some(l => pathname.startsWith(l.href))

  return (
    <nav style={{ backgroundColor: '#0f172a' }} className="sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group shrink-0 mr-4">
            <span className="text-white font-bold text-lg tracking-wide group-hover:opacity-90 transition-opacity">AMF</span>
            <span className="text-slate-500 text-xs tracking-wide hidden sm:block">Adaptable Musician&apos;s Framework</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {PRIMARY.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(link)
                    ? 'bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={isActive(link) ? { color: '#d97706' } : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative ml-0.5">
              <button
                onClick={() => setMoreOpen(o => !o)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                  isMoreActive || moreOpen
                    ? 'bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={isMoreActive || moreOpen ? { color: '#d97706' } : undefined}
              >
                More
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-slate-700 shadow-xl z-20 overflow-hidden py-1"
                    style={{ background: '#1e293b' }}
                  >
                    {MORE.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname.startsWith(link.href)
                            ? 'bg-white/5'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                        style={pathname.startsWith(link.href) ? { color: '#d97706' } : undefined}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 rounded"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-700 py-2 pb-3">
            <p className="px-4 pt-1 pb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Main</p>
            {PRIMARY.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link) ? 'text-amber-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-4 pt-3 pb-2 text-xs font-bold uppercase tracking-widest text-slate-500">More</p>
            {MORE.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href) ? 'text-amber-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
