"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { COMMON_ROOTS, type CommonRoot } from "@/lib/tps-piano-data"

// Lazy-load the grid so the heavy keyboard SVG generation is deferred
const TpsPianoColorGrid = dynamic(() => import("@/components/TpsPianoColorGrid"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
      Loading diagrams…
    </div>
  ),
})

// ── Root selector ─────────────────────────────────────────────────────────

interface RootButtonProps {
  root: CommonRoot
  selected: boolean
  onClick: () => void
}

function RootButton({ root, selected, onClick }: RootButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        selected
          ? "bg-blue-700 text-white border-blue-700 shadow-sm"
          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-700",
      ].join(" ")}
    >
      {root}
    </button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────

export default function PianoColorPage() {
  const [root, setRoot] = useState<CommonRoot>("C")

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">TPS Piano Color Reference</h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          All TPS voicing colors for a given root. Left hand (amber) holds the bass note;
          right hand (blue) voices the color triad above. Choose a root to transpose all diagrams.
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
          Core placement
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
          Secondary placement
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" />
          Advanced placement
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#d97706" }} />
          Left hand (bass)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#1e40af" }} />
          Right hand (chord)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: "#7c3aed" }} />
          Root note
        </span>
      </div>

      {/* Root selector */}
      <section>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Root</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select root note">
          {COMMON_ROOTS.map((r) => (
            <RootButton key={r} root={r} selected={root === r} onClick={() => setRoot(r)} />
          ))}
        </div>
      </section>

      {/* Formula reminder */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800">
        <span className="font-semibold">TPS Formula:</span>{" "}
        Shape + Placement + Spacing + Purpose = harmonic color. Left hand holds the root or shell;
        right hand places the color triad above.
      </div>

      {/* Grid of all TPS colors */}
      <TpsPianoColorGrid root={root} />

      {/* Spacing reference */}
      <section className="border-t pt-6">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Piano Register Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {[
            {
              zone: "Low (below C3)",
              rule: "Root, 5ths, octaves only. No closed triads — acoustic mud in ensemble.",
              color: "border-red-200 bg-red-50 text-red-800",
            },
            {
              zone: "Mid (C3–C5)",
              rule: "Shells and careful triads. Leave vocal space. Most functional comping zone.",
              color: "border-amber-200 bg-amber-50 text-amber-800",
            },
            {
              zone: "Upper (above C5)",
              rule: "Color triads, spread triads, shimmer. This is the color and beauty zone.",
              color: "border-green-200 bg-green-50 text-green-800",
            },
          ].map(({ zone, rule, color }) => (
            <div key={zone} className={`rounded-lg border px-3 py-2.5 ${color}`}>
              <p className="font-semibold text-xs mb-0.5">{zone}</p>
              <p className="text-xs leading-relaxed opacity-90">{rule}</p>
            </div>
          ))}
        </div>
      </section>

      {/* First Seven reminder */}
      <section className="border-t pt-6">
        <h2 className="text-base font-semibold text-gray-700 mb-3">The First Seven Placements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-3 py-2 border-b">Placement</th>
                <th className="px-3 py-2 border-b">Example / {root}</th>
                <th className="px-3 py-2 border-b">Intervals</th>
                <th className="px-3 py-2 border-b">Sound</th>
                <th className="px-3 py-2 border-b">Best Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { p: "1 major", intervals: "1 3 5", sound: "Plain major", use: "Clarity, grounding" },
                { p: "3 minor", intervals: "3 5 7", sound: "Maj7 compression", use: "Elegant major color" },
                { p: "5 major", intervals: "5 7 9", sound: "Maj9", use: "Safe sophistication" },
                { p: "5 minor", intervals: "5 b7 9", sound: "Dominant 9", use: "Blues, swing, funk" },
                { p: "b7 major", intervals: "b7 9 11", sound: "Dominant sus", use: "Soulful, gospel, rock" },
                { p: "2 major", intervals: "9 #11 13", sound: "Lydian", use: "Floating, cinematic" },
                { p: "b3 major", intervals: "#9 5 b7", sound: "Blues bite", use: "Grit, dominant tension" },
              ].map((row) => (
                <tr key={row.p} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 font-mono text-xs text-gray-800">{row.p}</td>
                  <td className="px-3 py-2 text-xs text-gray-600">—</td>
                  <td className="px-3 py-2 font-mono text-xs text-blue-700">{row.intervals}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{row.sound}</td>
                  <td className="px-3 py-2 text-xs text-gray-500">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mantra */}
      <blockquote className="border-l-4 border-blue-300 pl-4 py-1 text-sm italic text-gray-500">
        Shape. Placement. Spacing. Purpose. Learn the shape. Place the shape. Open the shape. Hear the color.
        Serve the music.
      </blockquote>
    </div>
  )
}
