// Original Web Audio synthesis for lesson examples. Sound starts only from a user click.
// No samples, no third-party audio, no network. Pure scheduling is separated from the browser
// API so it can be tested without audio hardware.
import { midiToHz } from './midi'
import type { NoteEvent, Patch } from './fixtures'

export const MASTER_GAIN = 0.18 // deliberately quiet; the learner raises their own volume
export const STOP_FADE_S = 0.04

export type ScheduledNote = { hz: number; midi: number; start: number; attackEnd: number; releaseStart: number; end: number; peak: number }

export function buildSchedule(events: NoteEvent[], patch: Patch): ScheduledNote[] {
  const sum = patch.harmonics.reduce((a, b) => a + b, 0)
  return events.map(e => {
    const attackEnd = e.start + Math.min(patch.attack, e.dur / 2)
    const end = e.start + e.dur + patch.release
    return {
      hz: midiToHz(e.midi),
      midi: e.midi,
      start: e.start,
      attackEnd,
      releaseStart: e.start + e.dur,
      end,
      peak: (e.role === 'drone' ? 0.7 : 1) / Math.max(1, sum * 0.6) / Math.sqrt(Math.max(1, events.filter(x => x.start < e.start + e.dur && x.start + x.dur > e.start).length)),
    }
  })
}

export function sequenceLength(events: NoteEvent[], patch: Patch): number {
  return Math.max(...buildSchedule(events, patch).map(n => n.end))
}

type Handle = { stop: () => void }

export function playSequence(events: NoteEvent[], patch: Patch, onEnded: () => void): Handle {
  const Ctor: typeof AudioContext | undefined =
    typeof window !== 'undefined' ? window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext : undefined
  if (!Ctor) throw new Error('Web Audio is not available in this browser')
  const ctx = new Ctor()
  const master = ctx.createGain()
  master.gain.value = MASTER_GAIN
  master.connect(ctx.destination)
  let tail: AudioNode = master
  if (patch.lowpassHz) {
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = patch.lowpassHz
    lp.connect(master)
    tail = lp
  }
  const t0 = ctx.currentTime + 0.06
  const oscs: OscillatorNode[] = []
  const sched = buildSchedule(events, patch)
  // sine partials are the imaginary terms of a PeriodicWave
  const periodic = ctx.createPeriodicWave(new Float32Array(patch.harmonics.length + 1), new Float32Array([0, ...patch.harmonics]))
  for (const n of sched) {
    const osc = ctx.createOscillator()
    osc.setPeriodicWave(periodic)
    osc.frequency.value = n.hz // fundamental equals the MIDI pitch exactly: no detune
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t0 + n.start)
    g.gain.linearRampToValueAtTime(n.peak, t0 + n.attackEnd)
    g.gain.setValueAtTime(n.peak, t0 + n.releaseStart)
    g.gain.linearRampToValueAtTime(0, t0 + n.end)
    osc.connect(g).connect(tail)
    osc.start(t0 + n.start)
    osc.stop(t0 + n.end + 0.05)
    oscs.push(osc)
  }
  const total = Math.max(...sched.map(n => n.end))
  let done = false
  const finish = () => {
    if (done) return
    done = true
    window.clearTimeout(timer)
    for (const o of oscs) {
      try { o.disconnect() } catch { /* already disconnected */ }
    }
    master.disconnect()
    void ctx.close().catch(() => undefined)
    onEnded()
  }
  const timer = window.setTimeout(finish, (total + 0.3) * 1000)
  return {
    stop() {
      if (done) return
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + STOP_FADE_S)
      for (const o of oscs) {
        try { o.stop(now + STOP_FADE_S + 0.01) } catch { /* not started or already stopped */ }
      }
      window.setTimeout(finish, (STOP_FADE_S + 0.05) * 1000)
    },
  }
}
