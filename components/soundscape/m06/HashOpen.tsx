'use client'
import { useEffect } from 'react'

/** Opens the <details> that contains the URL hash target (deep links like #ip-04). Navigation only: no sound, no state shown to the learner. */
export default function HashOpen() {
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(location.hash.slice(1)); if (!id) return
      const el = document.getElementById(id); if (!el) return
      const d = el.closest('details'); if (d && !d.open) d.open = true
      el.scrollIntoView({ block: 'start' })
    }
    go(); window.addEventListener('hashchange', go); return () => window.removeEventListener('hashchange', go)
  }, [])
  return null
}
