'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// Warm paper header, matching the Ajourné course tokens (paper / ink / wine / amber).
const ON_STYLE = { color: '#6d326e', background: 'rgba(242,173,69,0.26)', boxShadow: 'inset 0 0 0 1px rgba(242,173,69,0.6)' } as const
const OFF_CLS = 'text-[#4a2f4d] hover:text-[#6d326e] hover:bg-[#6d326e]/[0.07]'
const FOCUS = 'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#e5a764]'
const AJOURNE = '/curriculum/soundscape-path'
type NavLink = { href: string; label: string; match?: (p: string) => boolean }

const PRIMARY: NavLink[] = [
  { href: '/musical-universe', label: 'Musical Universe' },
  { href: '/',                 label: 'Sprints', match: p => p === '/' || p.startsWith('/sprints') },
  { href: '/plogger',          label: 'Plogger' },
  { href: '/audio',            label: 'Audio Lab' },
  { href: '/arranger',         label: 'Arranger' },
  { href: '/curriculum/soundscape-path', label: 'Ajourné', match: p => p.startsWith(AJOURNE) },
  { href: '/curriculum',       label: 'Curriculum', match: p => p.startsWith('/curriculum') && !p.startsWith(AJOURNE) },
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
    <nav
      style={{ background: 'linear-gradient(#fffaf3, #f9f5ed)', boxShadow: '0 1px 0 #e6dccb, 0 2px 14px rgba(109,50,110,0.08)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className={`flex flex-col leading-tight group shrink-0 mr-4 rounded ${FOCUS}`}>
            <span className="font-bold text-lg tracking-wide group-hover:opacity-80 transition-opacity" style={{ color: '#6d326e' }}>AMF</span>
            <span className="text-xs tracking-wide hidden xl:block" style={{ color: '#7a6579' }}>Adaptable Musician&apos;s Framework</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {PRIMARY.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 xl:px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${FOCUS} ${
                  isActive(link) ? '' : OFF_CLS
                }`}
                style={isActive(link) ? ON_STYLE : undefined}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative ml-0.5">
              <button
                onClick={() => setMoreOpen(o => !o)}
                className={`px-2.5 xl:px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1 ${FOCUS} ${
                  isMoreActive || moreOpen ? '' : OFF_CLS
                }`}
                style={isMoreActive || moreOpen ? ON_STYLE : undefined}
                aria-expanded={moreOpen}
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
                    className="absolute right-0 top-full mt-1 w-44 rounded-xl border shadow-xl z-20 overflow-hidden py-1"
                    style={{ background: '#fffaf3', borderColor: '#e6dccb', boxShadow: '0 10px 28px rgba(62,34,65,0.16)' }}
                  >
                    {MORE.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${FOCUS} ${
                          pathname.startsWith(link.href) ? '' : OFF_CLS
                        }`}
                        style={pathname.startsWith(link.href) ? ON_STYLE : undefined}
                        aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Below lg the Ajourné link stays visible beside the menu button */}
          <div className="lg:hidden flex items-center gap-1 ml-auto">
            <Link
              href="/curriculum/soundscape-path"
              className={`px-3 py-2 rounded text-sm font-semibold whitespace-nowrap ${FOCUS} ${pathname.startsWith(AJOURNE) ? '' : OFF_CLS}`}
              style={pathname.startsWith(AJOURNE) ? ON_STYLE : { background: 'rgba(242,173,69,0.14)' }}
              aria-current={pathname.startsWith(AJOURNE) ? 'true' : undefined}
            >
              Ajourné
            </Link>
          <button
            className={`p-2 rounded ${OFF_CLS} ${FOCUS}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t py-2 pb-3" style={{ borderColor: '#e6dccb' }}>
            <p className="px-4 pt-1 pb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#855086' }}>Main</p>
            {PRIMARY.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block mx-2 px-3 py-2.5 rounded text-sm font-medium transition-colors ${FOCUS} ${
                  isActive(link) ? '' : OFF_CLS
                }`}
                style={isActive(link) ? ON_STYLE : undefined}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-4 pt-3 pb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#855086' }}>More</p>
            {MORE.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block mx-2 px-3 py-2.5 rounded text-sm font-medium transition-colors ${FOCUS} ${
                  pathname.startsWith(link.href) ? '' : OFF_CLS
                }`}
                style={pathname.startsWith(link.href) ? ON_STYLE : undefined}
                aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
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
