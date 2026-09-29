// Standard Path — Sprint 1 — Day Content
// No JSX. Pure TypeScript data module.

export interface DayContent {
  day: number
  title: string
  duration: string // e.g. "30min"
  concept: string
  learnHref: string
  drills: string[]
  integration?: string
  exitCheck?: string
  readinessGate?: string[]
}

export const DAYS: DayContent[] = [
  {
    day: 1,
    title: 'The New Lens',
    duration: '30min',
    concept:
      "Musical Universe vocabulary does not replace what you know — it names it precisely. Orbit is not a new skill; it is a name for the harmonic role you already navigate intuitively.",
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Play a C major triad on strings 1-2-3 (open position or barre). Point to each note and say "this is the [root/third/fifth]."',
      'Now say "this is the [Root/Third/Fifth] Orbit." Play the triad again and try to say Orbit identity without pausing.',
      'Play a G major triad the same way: name each note\'s Orbit before moving on.',
    ],
    integration:
      'Play one chord you know well. Name all three Orbit positions without looking anything up.',
  },

  {
    day: 2,
    title: 'Orbit Call on C Major',
    duration: '35min',
    concept:
      'Every note in a triad has exactly one Orbit identity: Root (you are the root), Third (you are the third), or Fifth (you are the fifth). The skill is instant recognition.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Play C major closed triad on string set 1-2-3. Name top note Orbit: Fifth (G is fifth of C). Middle note: Root (C). Bottom: Third (E).',
      'Invert: move to next inversion, name each note\'s Orbit again.',
      'Do all 3 inversions in order, naming every note\'s Orbit identity before moving on.',
    ],
    exitCheck: 'Can I name Orbit identity for any note in C major triad without pausing?',
  },

  {
    day: 3,
    title: 'Root Orbit, All String Sets',
    duration: '35min',
    concept:
      'Root Orbit means you are the root — the Constellation builds up from you. Systematically find Root Orbit positions for D across all 4 string sets.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'On string set 1-2-3: find D note on string 1, 2, or 3 and build a D major triad with D on top (Root Orbit on top). Name aloud: "Root Orbit on top."',
      'On string set 2-3-4: same process — D on top, build D major triad, name it.',
      'On string set 3-4-5: same.',
      'On string set 4-5-6: same.',
      'Now find D on the BOTTOM of the triad on each string set. Name: "Root Orbit on bottom."',
    ],
  },

  {
    day: 4,
    title: 'Third Orbit, All String Sets',
    duration: '35min',
    concept:
      'Third Orbit means you are the third — the chord root is a major or minor third below you (depending on chord quality). For D major: the Third is F#.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Find F# on top on string set 1-2-3. Build D major triad beneath it. Name: "Third Orbit on top."',
      'Repeat on string sets 2-3-4, 3-4-5, and 4-5-6.',
      'Find F# on the BOTTOM of each string set (Third Orbit on bass — first inversion in classical terms).',
      'Contrast sound: play Root Orbit on top, then Third Orbit on top. Notice the difference in colour.',
    ],
  },

  {
    day: 5,
    title: 'Fifth Orbit, All String Sets',
    duration: '35min',
    concept:
      'Fifth Orbit means you are the fifth — the root is a perfect fifth below you. For D major: the Fifth is A.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Find A on top for D major triad on string set 1-2-3. Build the triad. Name: "Fifth Orbit on top."',
      'Repeat on string sets 2-3-4, 3-4-5, and 4-5-6.',
      'Find A on the BOTTOM of each string set (second inversion — notice the open, less-anchored sound).',
      'Play all three Orbits-on-top back to back: Root on top → Third on top → Fifth on top. Hear the register differences.',
    ],
  },

  {
    day: 6,
    title: 'Random Orbit Call',
    duration: '35min',
    concept:
      'The skill goal is automatic — you should be able to name the Orbit of any note in a triad while playing, without pausing.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Use a D major triad. Play a random note within the chord. Say its Orbit before the note decays. Do 20 reps in a row.',
      'Switch to G major. Same drill: 20 random note + Orbit calls.',
      'Switch to A major. 20 reps.',
      'Mix D, G, A (I-IV-V). 20 reps across all three.',
      'Play a simple I-IV-V progression and narrate the Orbit of the top note throughout.',
    ],
    exitCheck: 'Can I name top-note Orbit on any I, IV, or V chord within 2 seconds?',
  },

  {
    day: 7,
    title: 'Week 1 Check-In',
    duration: '30min',
    concept:
      'Check-in is not a test — it is a calibration. Where you are slow is where the next week targets.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Play C, G, D, F, A, E chords in random order. For each, name Root/Third/Fifth Orbit for the top note before moving to the next.',
      'Target: all 6 correct with no more than a 2-second pause each.',
      'Play a chord progression you know well. Play it through and narrate top-note Orbits throughout.',
    ],
    exitCheck: 'Am I faster than I was on Day 2? Where am I slowest?',
  },

  {
    day: 8,
    title: 'Segment L in Scale Runs',
    duration: '35min',
    concept:
      'You already play diatonic L segments — they appear wherever you ascend two whole steps in a row (pattern: 0-2-4). In major scale, diatonic L appears at degrees 1-2-3, 4-5-6, and 5-6-7. Note: pentatonic has its own L type (0-3 semitones, a minor third, 2 notes) — a different shape sharing the same name, introduced in Sprint 2.',
    learnHref: '/musical-universe/learn#segment-types',
    drills: [
      'Play G major scale on string 1 (one string). Identify all 3-note groups that form an L segment (0-2-4 semitone pattern). Name each one aloud: "L."',
      'Play the same scale on string 3. Identify and name all L segments.',
      'Play an E minor pentatonic run. Find all L patterns and name them as you go.',
    ],
  },

  {
    day: 9,
    title: 'Segment M in Minor Patterns',
    duration: '35min',
    concept:
      'M segment (0-2-3) appears wherever whole step + half step occurs. In major scale: at degrees 2-3-4 and 6-7-8. In natural minor: at degrees 1-2-3.',
    learnHref: '/musical-universe/learn#segment-types',
    drills: [
      'Play A natural minor scale on string 2. Find all M segments (W-H patterns). Name each one aloud: "M."',
      'Play a minor lick you know. Name every M you can identify in it.',
      'Contrast M vs L: play them alternately on one string and feel the difference — L opens up, M steps down.',
    ],
  },

  {
    day: 10,
    title: 'Segments P and S',
    duration: '35min',
    concept:
      'P (0-1-3) starts with a half step — it is the chromatic approach feel. S (0-2) is just one whole step — the pentatonic skip. Both are shorter and feel rhythmically distinct.',
    learnHref: '/musical-universe/learn#segment-types',
    drills: [
      'Play chromatic approach licks you know. Identify P shapes: H then W. Name each one aloud.',
      'Play pentatonic skips — those are S segments. Name each one aloud.',
      'Find 3 P segments in a blues phrase you know. Name them.',
      'Find 3 S segments in a pentatonic run. Name them.',
    ],
  },

  {
    day: 11,
    title: 'Segment Chain Reading',
    duration: '40min',
    concept:
      'A scale passage is a chain of segments. G major ascending on one string produces the chain L-M-P-L-L-M (six overlapping 3-note groups across one octave). Knowing this chain lets you predict the next segment in a run before you play it.',
    learnHref: '/musical-universe/learn#segment-types',
    drills: [
      'Play G major scale on one string ascending. At each note, say the upcoming segment type before playing it. First few times: pause and think.',
      'Goal: no pause — the segment name arrives before the note.',
      'Play descending — name the same chain in reverse.',
      'Play a familiar lick and describe its full segment chain immediately after.',
    ],
  },

  {
    day: 12,
    title: 'Orbit + Segment Together',
    duration: '40min',
    concept:
      'In performance you navigate both simultaneously: Orbit tells you harmonic role, Segment tells you how you are moving. This is the core dual-awareness the Musical Universe is building.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      'Play a simple 4-bar phrase in G major. After each note, name: [Orbit] [Segment going forward]. Example: "Root Orbit → L → Third Orbit → M →..."',
      'Play slowly enough to narrate without gaps.',
      'Repeat the phrase, aiming for no pauses in the narration.',
    ],
    exitCheck: 'Can I narrate Orbit + next Segment for each note in a 4-bar phrase without stopping?',
  },

  {
    day: 13,
    title: 'The Parallel Check',
    duration: '30min',
    concept:
      'Your DADGAD path is in week 2 of Sprint 1, working on single-string scales and segment identification. The vocabulary is identical — L/M/P/S means the same thing in both Galaxies.',
    learnHref: '/musical-universe/learn#parallel-galaxy',
    drills: [
      'Pick up your guitar in DADGAD tuning. Play the D major scale on string 3 (frets 0-2-4-5-7-9-11-12). Name segments as you go: L-M-P-L-L-M.',
      'Now switch back to Standard tuning. Play G major scale on string 2 (same fret pattern, different Galaxy). Name segments: L-M-P-L-L-M.',
      'Notice: same segment chain, different Galaxy. The vocabulary is shared.',
    ],
    exitCheck: 'Does the segment vocabulary feel shared between both Galaxies?',
  },

  {
    day: 14,
    title: 'Sprint 1 Gate',
    duration: '40min',
    concept:
      'Gate criteria define what "ready" means. Clearing all 4 criteria means the vocabulary is automatic enough to build on in Sprint 2.',
    learnHref: '/musical-universe/learn#orbit-system',
    drills: [
      '(1) Orbit speed test: call 10 random notes in the key of G. For each, name its Root/Third/Fifth Orbit within 5 seconds.',
      '(2) Phrase narration: play 4 bars in any major key and narrate the Orbit of the top note throughout without stopping.',
      '(3) Segment ear test: play 10 random 3-note groups and name the segment type for each.',
      '(4) Chain description: play scale runs and describe each as a segment chain. Full ascending octave = L-M-P-L-L-M.',
    ],
    readinessGate: [
      'Given any note and key, can name all 3 Orbit identities in under 5 seconds',
      'Can play a 4-bar phrase in any major key and name top-note Orbit throughout without stopping',
      'Can identify L, M, P, S segments by ear after playing any 3-note group',
      'Can describe a full ascending major scale run as a segment chain (L-M-P-L-L-M)',
    ],
    exitCheck:
      'If not all pass: focus remaining practice on weakest criterion, then advance to Sprint 2 after 7 days regardless.',
  },
]
