export function detectPitches(
  samples: Float32Array,
  sampleRate: number,
  frameSize = 2048,
  hopSize = 512,
  threshold = 0.15,
): Array<{ midi: number; startSample: number; durationSamples: number }> {
  const halfFrame = Math.floor(frameSize / 2)
  const frames: Array<{ midi: number; start: number }> = []

  for (let offset = 0; offset + frameSize <= samples.length; offset += hopSize) {
    const frame = samples.subarray(offset, offset + frameSize)

    // YIN difference function
    const diff = new Float32Array(halfFrame)
    for (let tau = 1; tau < halfFrame; tau++) {
      let sum = 0
      for (let j = 0; j < halfFrame; j++) {
        const delta = frame[j] - frame[j + tau]
        sum += delta * delta
      }
      diff[tau] = sum
    }

    // Cumulative mean normalized difference
    const cmndf = new Float32Array(halfFrame)
    cmndf[0] = 1
    let runningSum = 0
    for (let tau = 1; tau < halfFrame; tau++) {
      runningSum += diff[tau]
      cmndf[tau] = runningSum === 0 ? 0 : diff[tau] * tau / runningSum
    }

    // Find first minimum below threshold
    let bestTau = -1
    for (let tau = 2; tau < halfFrame - 1; tau++) {
      if (cmndf[tau] < threshold && cmndf[tau] < cmndf[tau + 1]) {
        bestTau = tau
        break
      }
    }

    let midi = -1
    if (bestTau > 0) {
      // Parabolic interpolation
      const prev = cmndf[bestTau - 1]
      const curr = cmndf[bestTau]
      const next = cmndf[bestTau + 1]
      const denom = prev - 2 * curr + next
      const tauPrecise = denom === 0 ? bestTau : bestTau + 0.5 * (prev - next) / denom

      const freq = sampleRate / tauPrecise
      if (freq > 60 && freq < 4000) {
        midi = Math.round(69 + 12 * Math.log2(freq / 440))
      }
    }

    frames.push({ midi, start: offset })
  }

  // Group consecutive frames with same pitch (within ±1 semitone)
  const notes: Array<{ midi: number; startSample: number; durationSamples: number }> = []
  let i = 0
  while (i < frames.length) {
    const { midi, start } = frames[i]
    if (midi < 0) { i++; continue }

    let j = i + 1
    while (j < frames.length && frames[j].midi >= 0 && Math.abs(frames[j].midi - midi) <= 1) {
      j++
    }

    const durationSamples = (j < frames.length ? frames[j].start : samples.length) - start
    // Require at least 2 frames
    if (j - i >= 2) {
      const roundedMidi = Math.round(
        frames.slice(i, j).reduce((s, f) => s + f.midi, 0) / (j - i)
      )
      notes.push({ midi: roundedMidi, startSample: start, durationSamples })
    }
    i = j
  }

  return notes
}
