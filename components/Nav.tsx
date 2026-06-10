'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/systems', label: 'Systems' },
  { href: '/genre-labs', label: 'Genre Labs' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/materials', label: 'Materials' },
  { href: '/practice', label: 'Practice Plan' },
  { href: '/pedagogy', label: 'Pedagogy' },
  { href: '/technology', label: 'Technology' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      style={{ backgroundColor: '#0f172a' }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span
              className="text-white font-bold text-xl tracking-wide group-hover:opacity-90 transition-opacity"
            >
              AMF
            </span>
            <span
              className="text-slate-400 text-xs font-normal tracking-wide hidden sm:block"
            >
              Adaptive Musician&apos;s Framework
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-amber-400 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                style={isActive(link.href) ? { color: '#d97706' } : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-700 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-amber-400'
                    : 'text-slate-300 hover:text-white'
                }`}
                style={isActive(link.href) ? { color: '#d97706' } : undefined}
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
