'use client'

import type { Arrangement } from '@/lib/arranger'

interface VexFlowViewerProps {
  arrangement: Arrangement
  onNoteClick?: (note: { voice: string; pitch: number; startBeat: number }) => void
  height?: number
}

// Stub — VexFlow integration planned for Phase 4.
// Will render SVG notation with: color-coded voices, per-note click handlers
// showing di-chord / Orbit / species label, cadence markers, suspension annotations.
export default function VexFlowViewer({ arrangement, height = 400 }: VexFlowViewerProps) {
  return (
    <div style={{
      height, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', background: '#0f1629', borderRadius: 8,
      border: '1px dashed #334155', color: '#475569', gap: 8,
    }}>
      <div style={{ fontSize: 32 }}>🎼</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>VexFlow Viewer</div>
      <div style={{ fontSize: 12, textAlign: 'center', maxWidth: 320, lineHeight: 1.5 }}>
        Interactive notation with clickable notes is coming in Phase 4.
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: '#334155' }}>
        {arrangement.guitarNotes.length} notes · {arrangement.measures.length} measures
      </div>
    </div>
  )
}
