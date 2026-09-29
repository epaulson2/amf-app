export interface ConceptBlock {
  heading: string;
  body: string;
  learnHref: string;
  learnLabel: string;
}

export interface WarmupBlock {
  duration: string;
  steps: string[];
}

export interface MainPracticeBlock {
  duration: string;
  heading: string;
  steps: string[];
}

export interface IntegrationBlock {
  duration: string;
  steps: string[];
}

export interface DayContent {
  day: number;
  title: string;
  totalMinutes: number;
  concept: ConceptBlock;
  recap: string | null;
  warmup: WarmupBlock;
  mainPractice: MainPracticeBlock;
  integration: IntegrationBlock;
  exitCheck: string[];
  readinessGate?: string[];
  nextTitle: string;
}

export const DAYS: DayContent[] = [
  {
    day: 1,
    title: "Your New Strings",
    totalMinutes: 35,
    concept: {
      heading: "DADGAD as a New Galaxy",
      body:
        "DADGAD is not Standard tuning with a few strings dropped — it is a completely different tonal universe with its own harmonic logic. The string layout from low to high is D-A-D-G-A-D, where strings 6, 4, and 1 carry the root (D) and strings 5 and 2 carry the fifth (A). Strings 6 and 1 are each dropped one whole step from Standard (E→D), while string 2 also drops one whole step (B→A). Treat this as a fresh start, not a modification.",
      learnHref: "/musical-universe/learn#zoom-hierarchy",
      learnLabel: "See the Zoom Hierarchy",
    },
    recap: null,
    warmup: {
      duration: "5 min",
      steps: [
        "Shake out your fretting hand — spread fingers wide, then curl into a loose fist, 5 times.",
        "Stretch your thumb across your palm while extending fingers, hold 10 seconds each hand.",
        "Tap each fingertip to your thumb in sequence (index → pinky → pinky → index) 3 times per hand.",
        "Roll your wrists in slow circles, 5 rotations each direction.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "Meeting Your Strings",
      steps: [
        "Connect your tuner and tune each string to DADGAD: string 6 → D2, string 5 → A2, string 4 → D3, string 3 → G3, string 2 → A3, string 1 → D4. Take your time — intonation matters from day one.",
        "Play each string open in order, low to high (6 → 1). Say the note name aloud as it rings: 'D... A... D... G... A... D.' Do this 5 full passes.",
        "Find the octave pairs: pluck string 6 (D2), let it ring, then pluck string 1 (D4). Both are D — hear the octave relationship. Then pluck string 5 (A2) and string 2 (A3). Both are A. Say 'same note, different octave' aloud.",
        "Strum all six strings open with a slow, even downstroke. Let the chord ring for 4 full beats. Notice the suspended, unresolved quality — there is no major or minor third in this chord.",
        "Close your eyes. Randomly touch one string without looking. Before plucking, say its name aloud (guess if you need to). Then pluck to confirm. Do this 10 times across all 6 strings.",
        "Tune check: re-check each string with your tuner after 20 minutes of play. DADGAD can drift as strings stretch into the new tension.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Strum the open DADGAD chord slowly 4 times while naming the notes from low to high aloud: D-A-D-G-A-D.",
        "Write the string layout on a small card (D-A-D-G-A-D) and put it on your music stand for the next 7 days.",
        "Sit quietly with the guitar and pluck each string one more time, just listening. Notice which strings feel familiar and which feel new.",
      ],
    },
    exitCheck: [
      "Can I name all 6 strings in DADGAD order without looking at my notes?",
      "Can I identify which strings are D and which are A by ear?",
      "Do I understand that strings 6 and 1 are both D (and 5 and 2 are both A)?",
      "Did the open chord sound suspended and unresolved to me?",
    ],
    nextTitle: "Root Everywhere",
  },

  {
    day: 2,
    title: "Root Everywhere",
    totalMinutes: 35,
    concept: {
      heading: "Degree 1 (D) Is Your Home Base",
      body:
        "In DADGAD, the note D (degree 1) appears on strings 6, 4, and 1 as open strings, giving you immediate access to the root at zero fret cost. Knowing where D lives on every string across the first 12 frets is the foundation of navigating this tuning fluently. The octave repeats at fret 12, so the pattern from frets 0–12 covers everything you need in standard playing position. Your task today is to internalize D on all 6 strings until it is reflexive.",
      learnHref: "/musical-universe/learn#orbit-system",
      learnLabel: "Explore the Orbit System",
    },
    recap:
      "Yesterday you learned the DADGAD string layout (D-A-D-G-A-D) and heard the open chord's suspended quality.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD — say each string name aloud as you tune it.",
        "Strum the open chord 4 times, letting each ring fully.",
        "Finger-stretch: place all four fingers on adjacent frets of one string, press down gently, then move the shape up 2 frets, then down 2 frets.",
        "Shake out your fretting hand before starting the main drills.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "Finding D on Every String",
      steps: [
        "String 6 (D): D is at fret 0 (open) and fret 12. Play fret 0, say 'D', play fret 12, say 'D'. Do this 5 times. These are the only D notes in the 0–12 range on this string.",
        "String 5 (A): D is at fret 5. Play fret 5, say 'D'. Count from open A (0) up: A→A#→B→C→C#→D = 5 semitones. Play the open string (A), then fret 5 (D), and hear the relationship. 10 repetitions.",
        "String 4 (D): D is at fret 0 (open) and fret 12, same pattern as string 6. Alternate between the two strings on fret 0, then fret 12, noticing the pitch difference (one octave apart).",
        "String 3 (G): D is at fret 7. Play open G, count up 7 semitones to reach D. Play the open G and fret 7 together as a two-note interval. Say 'D' each time you land on fret 7. 10 repetitions.",
        "String 2 (A): D is at fret 3. Open string is A — count up: A→A#→B→C = 3 semitones... wait, A→B♭→B→C→C#→D = that is 5 semitones. Correct fret: fret 5 on string 2 is D. Verify with your tuner. Play it 10 times saying 'D'.",
        "String 1 (D): D is at fret 0 (open) and fret 12, same as strings 6 and 4. Play all three D strings (6, 4, 1) open simultaneously by arpegiating or picking individually. Hear three D's at three different octaves.",
        "Random challenge: close your eyes, pick any string (or have a partner call one), and find a D on that string within 5 seconds. Do 12 rounds across all strings.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Play each D you found today in ascending order, lowest pitch to highest: string 6 fret 0, string 5 fret 5, string 4 fret 0 (one octave up), string 3 fret 7, string 2 fret 5, string 1 fret 0. This is a D major arpeggio spread across the neck.",
        "Strum the open chord and then land on any D anywhere on the neck — feel how landing on D resolves back to home.",
      ],
    },
    exitCheck: [
      "Can I find D on string 5 (fret 5) and string 3 (fret 7) without counting from scratch each time?",
      "Do I understand why strings 6, 4, and 1 all start on D?",
      "Can I find D on any string within 5 seconds during the random challenge?",
      "Am I naming the note aloud as I play it, not just playing mechanically?",
    ],
    nextTitle: "Fifth Everywhere",
  },

  {
    day: 3,
    title: "Fifth Everywhere",
    totalMinutes: 35,
    concept: {
      heading: "Degree 5 (A) Is the Pull Back to Root",
      body:
        "A (degree 5) is the note that creates harmonic tension in relation to D — it wants to resolve back to home. In DADGAD, A appears as open strings 5 and 2, making it immediately available just like D. The interval from D to A is a perfect fifth, one of the highest-harmonicity intervals in music. Knowing A on every string gives you the ability to create tension-and-release patterns anywhere on the neck without leaving first position.",
      learnHref: "/musical-universe/learn#orbit-system",
      learnLabel: "Explore the Orbit System",
    },
    recap:
      "Yesterday you mapped D (degree 1) on every string — today you add A (degree 5), the note that pulls back to it.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Play each open string and name it before moving to the next.",
        "Quickly review yesterday: find D on strings 5 and 3 without hesitation (fret 5 and fret 7).",
        "Slow finger stretch across all four frets, then let go and shake out.",
        "Strum the open chord once and listen for the A notes on strings 5 and 2.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "Finding A on Every String",
      steps: [
        "String 6 (D): A is at fret 5. Open string is D — count up 7 semitones to reach A. Alternatively, remember the 7-fret rule: the fifth of any open string is always 7 frets up on the same string. Play fret 5 on string 6, say 'A', 10 times.",
        "String 5 (A): A is at fret 0 (open) and fret 12. Same logic as the D strings — the open note is A, so fret 0 and fret 12 are your two locations. Play both and say 'A' each time.",
        "String 4 (D): A is at fret 7. Same as string 6: open is D, so 7 frets up = A. Play fret 7 on string 4, confirm with tuner, say 'A', 10 times.",
        "String 3 (G): A is at fret 2. Open is G — count up 2 semitones (G→G#→A). Short reach! This fret 2 will show up everywhere. Play it 10 times, saying 'A'.",
        "String 2 (A): A is at fret 0 (open) and fret 12, same as string 5. Play both positions, alternating, 10 times.",
        "String 1 (D): A is at fret 5. Same as string 6: open is D, 7 frets up = A... but wait, fret 5 from D = A. Count: D→D#→E→F→F#→G = no. Recount: D(0)→E(2)→F(3)→G(5) — that is not A. Correct: D→D#(1)→E(2)→F(3)→F#(4)→G(5)→G#(6)→A(7). So A is at fret 7 on string 1. Verify with tuner. Play it 10 times.",
        "Random challenge: a partner (or timer) calls a string number. Find A on that string within 5 seconds. Do 12 rounds. Say the fret number aloud before playing.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Alternate between D and A on a single string: on string 4, play open (D) then fret 7 (A), back and forth 8 times. Feel the tension-and-return.",
        "Play D on string 6 fret 0, then A on string 5 fret 0 — two open strings, perfect fifth. Let them ring together for 4 beats.",
      ],
    },
    exitCheck: [
      "Can I find A on string 6 (fret 5), string 3 (fret 2), and string 1 (fret 7) without hesitation?",
      "Do I feel the difference in tension when moving from A back to D on the same string?",
      "Can I find A on any string within 5 seconds?",
      "Am I clear that strings 5 and 2 are both open A (like strings 6, 4, 1 are open D)?",
    ],
    nextTitle: "Fourth Everywhere",
  },

  {
    day: 4,
    title: "Fourth Everywhere",
    totalMinutes: 35,
    concept: {
      heading: "Degree 4 (G) Is the Modal Color",
      body:
        "G (degree 4) is the note that gives DADGAD its distinctive modal quality — it is neither major nor minor, but suspended. String 3 is tuned to G, so you always have degree 4 available as an open string. The perfect fourth (D to G) is a stable, consonant interval that creates an open, resolved sound rather than tension. Together with D and A, the G note completes the harmonic skeleton of all DADGAD-based music.",
      learnHref: "/musical-universe/learn#orbit-system",
      learnLabel: "Explore the Orbit System",
    },
    recap:
      "Yesterday you mapped A (degree 5) — the tension note. Today you add G (degree 4), the color note that completes the three-note harmonic skeleton.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD, naming each string. Then do one quick D-location review: find D on strings 5 and 3 from memory.",
        "Do one quick A-location review: find A on strings 6, 3, and 1 from memory.",
        "Slow neck circles to loosen shoulders, then shake out both hands.",
        "Strum the open chord and listen specifically for string 3 (G) in the mix.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "Finding G on Every String",
      steps: [
        "String 6 (D): G is at fret 3. Open is D — count up 5 semitones to reach G (D→D#→E→F→F#→G). Short reach, in the most accessible position. Play fret 3 on string 6, say 'G', 10 times.",
        "String 5 (A): G is at fret 10. Open is A — count up 10 semitones. This is a reach. Verify with tuner. Note: this is near the end of easy first-position playing, but important to know. Play it 5 times, saying 'G'.",
        "String 4 (D): G is at fret 5. Open is D, count up 5 semitones = G. Same interval as string 6, same fret. Play fret 5 on string 4 ten times, saying 'G'. Notice this is in a very natural finger position.",
        "String 3 (G): G is at fret 0 (open) and fret 12. Play open string 3, say 'G'. Then fret 12, say 'G'. This string is your home base for G. 5 reps each.",
        "String 2 (A): G is at fret 8. Open is A — count up 10 semitones... wait: A(0)→A#(1)→B(2)→C(3)→C#(4)→D(5)→D#(6)→E(7)→F(8)→F#(9)→G(10). So G is at fret 10 on string 2. Verify with tuner. Play 5 times.",
        "String 1 (D): G is at fret 3. Same as string 6: open is D, 5 frets up = G. Play fret 3 on string 1, confirm with tuner, say 'G', 10 times.",
        "Three-note sequence: on string 4, play D (open, fret 0), then G (fret 5), then back to D. Then on string 3, play G (open), then find D (fret 7) and A (fret 2) from Day 2 and Day 3. Say each note aloud as you play it.",
        "Random challenge: a string is called out — find G on that string within 5 seconds. Do 10 rounds.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "On string 1, play D (fret 0), then A (fret 7), then G (fret 3) — this is degrees 1, 5, 4. Say the degree numbers aloud. Repeat 5 times.",
        "Play strings 1, 3, and 5 open simultaneously: D, G, A. Let them ring for 8 beats. This is the harmonic skeleton of DADGAD available without any left-hand fingering at all.",
      ],
    },
    exitCheck: [
      "Can I find G on strings 6 and 1 (fret 3) without thinking?",
      "Can I find G on strings 4 and 3 quickly (fret 5 and open)?",
      "Do I feel the difference between G (stable fourth) and A (tense fifth) when played against D?",
      "Can I play D→A→G in sequence on a single string and name each note?",
    ],
    nextTitle: "Three Anchors",
  },

  {
    day: 5,
    title: "Three Anchors",
    totalMinutes: 40,
    concept: {
      heading: "The Harmonic Skeleton: Degrees 1, 4, and 5",
      body:
        "D, G, and A together form the complete harmonic skeleton of DADGAD music. All three are available as open strings (D on strings 6/4/1, G on string 3, A on strings 5/2), meaning you have the entire skeleton available with zero left-hand pressure. The intervals between them — perfect fourth (D to G) and perfect fifth (D to A) — are the two highest-harmonicity intervals in the Plogger system, which is why DADGAD sounds open and resonant even with minimal technique. When you understand this skeleton, chord shapes and melodies become easier to locate because you know what you are reaching toward.",
      learnHref: "/musical-universe/learn#zoom-hierarchy",
      learnLabel: "See the Zoom Hierarchy",
    },
    recap:
      "Over the past three days you mapped D, A, and G on every string individually — today you combine all three and train your navigation between them.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Strum the open chord and identify which strings are D, which are A, and which is G by ear before confirming.",
        "Speed review: call a string, find its D within 3 seconds. Do 6 quick rounds (one per string).",
        "Slow chromatic crawl up string 4: play each fret 0–5 with one finger per fret, then reverse. Loosen up the fretting hand.",
        "Stretch your picking-hand thumb by fanning fingers wide and holding 10 seconds.",
      ],
    },
    mainPractice: {
      duration: "28 min",
      heading: "Navigating D, A, G as a System",
      steps: [
        "On string 1 (open = D): find the nearest A and G without moving your hand from first position. A is at fret 7 (outside first position), G is at fret 3. Play D (open) → G (fret 3) → A (fret 7), then back: A → G → D. Name degrees: '1 → 4 → 5 → 5 → 4 → 1'. 5 slow repetitions.",
        "On string 2 (open = A): find nearest D and G. D is at fret 5 (on string 2). G is at fret 10 (on string 2). Play A (open) → D (fret 5) → G (fret 10). Say '5 → 1 → 4'. This is far up the string — that is fine. 5 reps.",
        "On string 4 (open = D): A is at fret 7, G is at fret 5. Play D (open) → G (fret 5) → A (fret 7) → G → D. Say degrees. Observe that G and A are adjacent here (frets 5 and 7). 5 reps.",
        "Single-string degree drill: use a click at 60bpm. On string 4, play: 1 (open, 4 beats) → 4 (fret 5, 4 beats) → 5 (fret 7, 4 beats) → 1 (open, 4 beats). Stay locked to the click. Do not rush the transitions. 4 full cycles.",
        "Eyes-closed drill: close your eyes, touch any string with your picking hand. Say aloud: what degree is this open string (1, 4, or 5)? Then find the other two degrees on the same string — eyes still closed. Open eyes to confirm. 8 rounds.",
        "Plogger connection: Play D and A together (strings 6 and 5, both open). Notice the interval sounds stable and open — this is a perfect fifth, the second-highest harmonicity pair. Then play D and G (strings 6 open, string 3 open). Also open and stable — perfect fourth. Now play D and A and G all together (strings 6, 5, 3 open). Let ring 8 beats. Describe aloud what you hear.",
        "Cross-string sequence: play D on string 6 (open), then A on string 4 (fret 7), then G on string 1 (fret 3). Go slowly. Then reverse. This moves across the neck instead of along one string. 3 reps.",
      ],
    },
    integration: {
      duration: "7 min",
      steps: [
        "Freely improvise using only D, A, and G across any strings, no click. The only rule: name the degree of each note before you play it ('four... one... five...'). Play for 4 minutes.",
        "Write in your practice log: which of the three anchors is easiest to find? Which is hardest? What will you focus extra time on tomorrow?",
      ],
    },
    exitCheck: [
      "Can I find all three anchor notes on any single string without stopping?",
      "Can I play 1→4→5→1 on string 4 with a click at 60bpm without losing the beat?",
      "In the eyes-closed drill, was I correct more than 6 out of 8 times?",
      "Do D, A, and G feel like a system now, not three separate memory tasks?",
    ],
    nextTitle: "The Open Sound",
  },

  {
    day: 6,
    title: "The Open Sound",
    totalMinutes: 35,
    concept: {
      heading: "Dsus4: Root, Fourth, Fifth — No Third",
      body:
        "The open DADGAD chord is technically a Dsus4 — it contains D (root), G (fourth), and A (fifth), but no third (F# or F). The absence of a third is intentional: without a third, the chord carries no major or minor emotional commitment, leaving it harmonically open and ambiguous. This is the primary reason DADGAD is popular for modal folk, Celtic, and world music styles. Adding a third instantly changes the character — experiment with this today and hear the shift firsthand.",
      learnHref: "/musical-universe/learn#emotional-coordinates",
      learnLabel: "See Emotional Coordinates",
    },
    recap:
      "Yesterday you navigated D, A, and G as a three-note system across strings — today you understand why those three notes, and only those three, create DADGAD's signature open sound.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD and strum the open chord three times with controlled, even downstrokes.",
        "Quick anchor review on string 3: find D (fret 7), A (fret 2), G (open) — say each name before playing. 3 reps.",
        "Wrist circles, 10 per direction, picking hand and fretting hand.",
        "Place your index finger across all 6 strings at fret 2 (a light barre). Strum, then release. This warms up the barre muscle for later use.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "Exploring the Open Chord by Addition and Subtraction",
      steps: [
        "Strum the open DADGAD chord (no fingers on neck). Let it ring for 8 full beats. Count the beats aloud while it decays. Notice the slow decay on the lowest strings versus the fastest decay on the highest.",
        "Add one finger: place your index finger at fret 2 on string 1 (highest string). This adds E (the 9th degree) to the chord. Strum and listen. The chord becomes more 'floating' and ethereal. Let ring 4 beats. Remove finger. Return to open chord. Repeat this add-and-remove 5 times.",
        "Add a different color: place your middle finger at fret 2 on string 2. This adds B (the 6th degree). Strum and let ring 4 beats. Compare to the pure open chord. This gives a slightly brighter, 'add6' quality. Remove, return to open, 5 reps.",
        "Now add the third: place your ring finger at fret 4 on string 2. This adds F# (the major third). Strum. The chord becomes D major. Hear how the ambiguity disappears — it now commits to major. Ring 4 beats. Remove. Open chord. Ring 4 beats. Do this comparison 5 times, naming 'D major' vs 'D sus4' each time.",
        "Try the minor third: place a finger at fret 3 on string 2 (F, the minor third — actually fret 3 = F). Strum. This approximates a D minor quality, though not a clean Dm chord. Hear the minor color. Remove. Return to open. 3 reps.",
        "Drone exercise: while holding down nothing (all open), use your picking thumb to play string 6 (D) in a steady pulse — one pluck per second for 30 seconds. Use your other fingers to softly pluck strings 3 and 1 (G and D) on alternating beats. Hum the root pitch D while playing.",
        "Strum sequence: open chord (4 beats) → add E on string 1 (4 beats) → add B on string 2 (4 beats) → open chord (4 beats). Repeat this 3-chord loop 4 times total.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Strum the open chord one final time and let it fully decay to silence. Listen to the full ring-out without touching the strings.",
        "Say aloud: 'This chord has D, G, and A. It has no third. It is Dsus4.' Then strum once more to close.",
      ],
    },
    exitCheck: [
      "Can I explain in one sentence why DADGAD's open chord has no major or minor quality?",
      "Did I clearly hear the difference when I added F# (major third) vs B (sixth) vs E (ninth)?",
      "Can I locate and add the 9th (E on string 1 fret 2) in under 3 seconds?",
      "Do I understand that 'no third = harmonic ambiguity' is a feature, not a gap?",
    ],
    nextTitle: "Week 1 Check-In",
  },

  {
    day: 7,
    title: "Week 1 Check-In",
    totalMinutes: 30,
    concept: {
      heading: "Self-Assessment Is Part of the Practice",
      body:
        "In musical learning, the ability to accurately assess your own current state is a skill in itself. Today is not a test with passing and failing — it is a calibration. You measure where you are with honest precision, identify the weakest area, and plan how to strengthen it before Sprint 1 ends. The goal is not to be perfect at week one; the goal is to know exactly where you stand so that your next seven days are targeted rather than diffuse.",
      learnHref: "/musical-universe/learn#zoom-hierarchy",
      learnLabel: "See the Zoom Hierarchy",
    },
    recap:
      "This week you learned the DADGAD string layout, mapped degrees 1, 4, and 5 on every string, understood the harmonic skeleton, and explored the open chord's suspended quality.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD without looking at the tuner first — try to tune by ear from memory of yesterday's pitch. Then verify and correct.",
        "Strum the open chord 4 times. Identify the three note-names in the chord (D, G, A) aloud.",
        "Stretch each finger individually: hold each fingertip against your palm for 5 seconds.",
        "Take 3 slow breaths. Today is for measurement, not achievement.",
      ],
    },
    mainPractice: {
      duration: "20 min",
      heading: "Week 1 Calibration Exercises",
      steps: [
        "Random string — D check: have someone call string numbers 1–6 in random order, or use dice/random number. For each string, find a D note within 3 seconds. Do all 6 strings. Record: how many did you find within 3 seconds? Score out of 6.",
        "Random string — A check: same process for A. Find A on each of the 6 strings within 5 seconds. Score out of 6.",
        "Random string — G check: same process for G. Find G on each of the 6 strings within 5 seconds. Score out of 6.",
        "1→4→5→1 with click: set a metronome to 60bpm. On string 4, play D (open, 2 beats) → G (fret 5, 2 beats) → A (fret 7, 2 beats) → D (open, 2 beats). Repeat 4 cycles without stopping. Note: did you stay locked to the click? Y/N.",
        "Open chord knowledge: strum the open chord and answer aloud: What chord quality is it? What notes does it contain? What note would you add to make it D major? What note would you add to make it a D add9?",
        "Fluency sense: play freely for 3 minutes — any notes, any strings, any rhythm. As you play, try to name notes aloud. Notice when you have to stop and think versus when a name comes automatically. This is your current fluency boundary.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Write your three scores (D: __, A: __, G: __) and your click observation in your practice log. Circle the lowest score — that is your focus for the rest of Sprint 1.",
        "Set a specific intention: 'This week I will drill [weakest anchor] for 5 extra minutes each day.' Write it down.",
      ],
    },
    exitCheck: [
      "Can I find D on any string within 3 seconds (target: 5 out of 6)?",
      "Can I find A and G nearly as fast (target: 4 out of 6 within 5 seconds)?",
      "Do the open strings feel like named notes — not just sounds?",
      "Have I identified my weakest anchor note and written a plan to strengthen it?",
    ],
    nextTitle: "Scale on String 3",
  },

  {
    day: 8,
    title: "Scale on String 3",
    totalMinutes: 35,
    concept: {
      heading: "D Major Scale on the D String (String 4)",
      body:
        "The D major scale is the home scale of DADGAD — all its notes belong to this tuning's natural resonances. On string 4 (the middle D string, open = D3), the scale pattern is: fret 0 (D), fret 2 (E), fret 4 (F#), fret 5 (G), fret 7 (A), fret 9 (B), fret 11 (C#), fret 12 (D). The step pattern is W-W-H-W-W-W-H (whole-whole-half-whole-whole-whole-half), which is the defining interval structure of any major scale. Learning this on one string before moving to multi-string patterns is the most direct way to internalize scale physics.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "Last week you mapped three anchor notes (D, A, G) across all strings — today you connect them into a full scale for the first time.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Quick anchor check on string 4: D (open), G (fret 5), A (fret 7). Play each and say its name.",
        "Chromatic crawl: on string 4, play frets 0 through 7 one by one, one finger per fret where possible (shift hand when needed). Ascend then descend.",
        "Stretch the fretting hand: fan all 4 fingers wide, hold 5 seconds, then curl into a fist, hold 5 seconds. Repeat 3 times.",
        "Set your metronome to 50bpm — today's working tempo for the scale drills.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "D Major Scale on One String",
      steps: [
        "Ascending — names first: play the scale ascending on string 4 from fret 0 to fret 12, saying each note name as you play: 'D... E... F#... G... A... B... C#... D.' Go very slowly — accuracy and naming matter more than speed. 3 reps.",
        "Descending — names: play from fret 12 down to fret 0, naming each note: 'D... C#... B... A... G... F#... E... D.' 3 reps.",
        "Degrees ascending: play ascending while naming scale degrees instead of note names: '1... 2... 3... 4... 5... 6... 7... 1.' 3 reps.",
        "Identify the step pattern: play the scale slowly. Between each adjacent pair of notes, say 'whole' or 'half' to describe the interval. The pattern is W-W-H-W-W-W-H: D→E (W), E→F# (W), F#→G (H), G→A (W), A→B (W), B→C# (W), C#→D (H). Confirm each step by checking the fret distance (whole = 2 frets, half = 1 fret).",
        "With click at 60bpm: play the scale ascending and descending as quarter notes (one note per beat). Keep the metronome steady. Your priority: stay in time, even if you need to slow down to 50bpm to do so. 4 complete up-down cycles.",
        "Targeted repetition: identify which note in the scale you are least confident about (most likely F# or C# — they involve the farthest reach). Play just that one note, back and forth to its neighbors, 20 times at 60bpm.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Play the scale one final time, ascending only, at your most comfortable tempo. After the final D at fret 12, let it ring for 4 beats. Then pluck the open D at fret 0 one octave below. Hear the octave resolution.",
        "Connect to anchors: notice that fret 5 (G) and fret 7 (A) are the anchors you already know. Say aloud: 'G is degree 4. A is degree 5. They live right here in the middle of the scale.'",
      ],
    },
    exitCheck: [
      "Can I name every note in the D major scale on string 4 without hesitation?",
      "Can I play the scale ascending at 60bpm without stopping?",
      "Do I know which steps are whole and which are half (W-W-H-W-W-W-H)?",
      "Do I know that G (fret 5) and A (fret 7) are the same anchor notes I already mapped?",
    ],
    nextTitle: "Scales on Strings 1 and 6",
  },

  {
    day: 9,
    title: "Scales on Strings 1 and 6",
    totalMinutes: 35,
    concept: {
      heading: "Same Galaxy, Different Octave Registers",
      body:
        "Strings 1 and 6 are both tuned to D in DADGAD, so the D major scale pattern (frets 0-2-4-5-7-9-11-12) applies identically to both. This is one of DADGAD's unique advantages: you learn one pattern and it transfers to multiple strings. String 6 gives you the lowest register, string 4 the middle register, and string 1 the highest register — the same scale in three different sonic zones. Comparing them directly trains your ear to recognize the scale not by pitch height but by interval logic.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "Yesterday you learned the D major scale on string 4 — today you transfer the exact same fret pattern to strings 6 and 1.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Play the D major scale on string 4 once, ascending, from memory (frets 0-2-4-5-7-9-11-12). Say note names.",
        "Find D, G, A on string 6 from last week: D (open), G (fret 3), A (fret 5). Quick 3-note check.",
        "Find D, G, A on string 1: D (open), G (fret 3), A (fret 7). Quick 3-note check.",
        "Stretch and shake out both hands.",
      ],
    },
    mainPractice: {
      duration: "25 min",
      heading: "D Major Scale on Strings 6 and 1",
      steps: [
        "String 6 — ascending with names: play D major scale on string 6, same fret pattern: 0-2-4-5-7-9-11-12. Say note names: 'D... E... F#... G... A... B... C#... D.' This is the lowest register — let each note ring fully before moving. 3 reps.",
        "String 6 — descending: from fret 12 down to fret 0. Name each note. 3 reps.",
        "String 1 — ascending with names: play D major scale on string 1, same fret pattern: 0-2-4-5-7-9-11-12. This is the highest register. Say note names. 3 reps.",
        "String 1 — descending. 3 reps.",
        "Cross-register comparison: play the scale on string 6 (ascending), immediately followed by string 4 (ascending), immediately followed by string 1 (ascending). No pause between. All three registers back to back. Name degrees (1-2-3-4-5-6-7-1) across all three. This shows the same pitch logic in three tonal colors.",
        "Spot the anchors: on string 6, as you play the scale, call out when you hit the anchors: 'fret 3 = G = degree 4' and 'fret 5 = A = degree 5'. Do the same on string 1 (G = fret 3, A = fret 7). Connect today's scale work to last week's anchor knowledge.",
        "With click at 60bpm: play string 6 scale up and down, then string 1 scale up and down, as quarter notes, without stopping. Aim for 2 full cycles total.",
      ],
    },
    integration: {
      duration: "5 min",
      steps: [
        "Play strings 6, 4, and 1 open simultaneously by lightly rolling your picking thumb across all three D strings. Hear three D's at three octaves. Then play one note from the scale on each string — say, fret 2 (E) on all three. Hear E in three registers.",
        "End with a question to sit with: 'If the pattern is the same on strings 6, 4, and 1, why do they sound so different?' (Answer: register — the same interval logic at different octave heights.)",
      ],
    },
    exitCheck: [
      "Can I play the D major scale on string 6 ascending without stopping?",
      "Can I play the scale on string 1 ascending without stopping?",
      "Do I understand why the fret pattern is identical on strings 1, 4, and 6?",
      "Can I identify G (fret 3) and A (fret 5 or 7 depending on string) within the scale on each string?",
    ],
    nextTitle: "Segment L: Whole + Whole",
  },

  {
    day: 10,
    title: "Segment L: Whole + Whole",
    totalMinutes: 40,
    concept: {
      heading: "The L Segment: Two Whole Steps in a Row",
      body:
        "A segment is a 3-note melodic unit defined by its interval structure. The L segment consists of two consecutive whole steps, spanning 4 semitones from first to last note (fret pattern: 0-2-4). In the D major scale, L segments appear at degrees 1-2-3 (D-E-F#) and degrees 4-5-6 (G-A-B). The L is the most spacious-sounding segment — its two whole steps give it an open, forward-moving quality. Learning to recognize and name the L segment by sound and feel is the first step toward fluid melodic thinking.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "You now have the D major scale on strings 1, 4, and 6 — today you zoom in on the first segment type embedded within that scale.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Play the D major scale on string 4, ascending only, from memory. Say note names.",
        "Identify the first three notes aloud: 'D, E, F# — that is degrees 1, 2, 3.'",
        "Stretch both hands thoroughly — today's drills involve more position shifts.",
        "Set metronome to 55bpm for the main practice.",
      ],
    },
    mainPractice: {
      duration: "28 min",
      heading: "Isolating and Drilling the L Segment",
      steps: [
        "Define L on string 3: play frets 0-2-4 (G-A-B). Say 'L' after playing all three. Hold the last note 2 beats. This is the L segment starting on G. Notice: two whole steps, 4 semitones span. 8 reps.",
        "Find the second L on string 3: play frets 5-7-9 (G-A-B in a higher position? No — fret 5 = A, fret 7 = B, fret 9 = C#). Wait, string 3 is open G. Fret 5 is... G+5 semitones = C. Recount: G(0)→G#(1)→A(2)→A#(3)→B(4)→C(5). So fret 5 = C. In D major, degrees 4-5-6 = G-A-B. On string 3: G is open (fret 0), A is fret 2, B is fret 4 — that is still the first L. For the next L (degrees 1-2-3 starting on D higher up), find D at fret 7: frets 7-9-11 (D-E-F#). Play frets 7-9-11 on string 3. Say 'L'. 8 reps.",
        "String 6 — L segments: frets 0-2-4 (D-E-F#). Say 'L'. Then frets 5-7-9 (G-A-B). Say 'L'. Alternate between the two L segments on string 6, 5 reps each.",
        "Find all L segments on string 3 across the full 0-12 range: starting on fret 0 (G), 2 (A), 4 (B), 7 (D), 9 (E), 11 (F#). Each starting note that belongs to D major and has two whole steps available = L segment. Play each, say 'L' after each.",
        "Sing the L: play frets 0-2-4 on string 4 (D-E-F#) and sing along with each note. You do not need to match pitch perfectly — try to follow the shape of the two whole steps with your voice.",
        "Contrast with the full scale: play the scale on string 4, but when you hit an L segment (degrees 1-2-3 at frets 0-2-4, and degrees 4-5-6 at frets 5-7-9), say 'L' aloud. The scale has two L segments embedded in it.",
        "At 60bpm, alternating L segments: play frets 0-2-4 (L) then immediately 5-7-9 (L) on string 4, in time with the click. Ascend both, then descend both. 4 cycles.",
      ],
    },
    integration: {
      duration: "7 min",
      steps: [
        "Freely play on string 4 and whenever you play three consecutive scale notes that form two whole steps, say 'L' out loud. Do this for 4 minutes without a click.",
        "In your practice log, write the fret positions of every L segment you found today on strings 3 and 4. Check for any you missed.",
      ],
    },
    exitCheck: [
      "Can I immediately say 'L' when I play two consecutive whole steps?",
      "Do I know that L = 0-2-4 fret pattern (2 whole steps, 4 semitones span)?",
      "Can I find L segments starting on any scale degree, not just degree 1?",
      "Can I play alternating L segments at 60bpm without losing the beat?",
    ],
    nextTitle: "Segment M: Whole + Half",
  },

  {
    day: 11,
    title: "Segment M: Whole + Half",
    totalMinutes: 40,
    concept: {
      heading: "The M Segment: Whole Step Then Half Step",
      body:
        "The M segment consists of a whole step followed by a half step, spanning 3 semitones (fret pattern: 0-2-3). It appears in the D major scale at degrees 2-3-4 (E-F#-G) and degrees 6-7-1 (B-C#-D). The M segment has a more compressed, leading sound compared to L — the half step at the end creates a sense of arrival, like a footstep landing. In tonal music, half steps that resolve by step are called leading tones, and M contains exactly that mechanism at its tail.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "Yesterday you learned the L segment (W+W, fret pattern 0-2-4) — today you learn its companion, M (W+H, fret pattern 0-2-3), and contrast the two.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Play the D major scale on string 4, naming notes. When you reach E-F#-G (frets 2-4-5), pause and say 'that is where M will live today.'",
        "Review: play an L segment on string 4 (frets 0-2-4). Say 'L — whole plus whole.' Then do it on string 6.",
        "Light stretching — the M segment uses frets that are one fret closer together than L, so fretting-hand accuracy matters.",
        "Set metronome to 55bpm.",
      ],
    },
    mainPractice: {
      duration: "28 min",
      heading: "Isolating and Drilling the M Segment",
      steps: [
        "Define M on string 4: play frets 2-4-5 (E-F#-G). Say 'M' after all three. Hold the last note 2 beats. This is M starting on E (degree 2). The half step is between F# (fret 4) and G (fret 5) — one fret. 8 reps.",
        "Find the second M on string 4: degrees 6-7-1 = B-C#-D = frets 9-11-12. Play frets 9-11-12. Say 'M'. The half step is between C# (fret 11) and D (fret 12). 8 reps.",
        "String 3 — M segments: on string 3 (open G), the M pattern 0-2-3 gives G-A-A# (not in D major). Find where M occurs in D major on string 3: frets 2-4-5 (A-B-C — wait, G+2=A, G+4=B, G+5=C; but C is not in D major). Find M segments that start on scale tones: degrees 2-3-4 start on E. Find E on string 3: fret 9 (G+9=D... recount: G(0) A(2) B(4) C(5) D(7) E(9)). So frets 9-11-12 on string 3 = E-F#-G. Say 'M'. 8 reps.",
        "L vs M comparison on string 4: play L (frets 0-2-4, D-E-F#), then M (frets 2-4-5, E-F#-G). Notice the shared middle note (F#) and the different endpoints. Say 'L — wider, W+W' and 'M — narrower, W+H'. 5 comparison pairs.",
        "Full scale with segment labels: play the D major scale on string 4 ascending. As you pass through each 3-note group, say the segment type: frets 0-2-4 = L, frets 2-4-5 = M, frets 4-5-7 = ... identify this (F#-G-A = H+W = not L or M, this is a P segment — preview). Skip labeling P for now. Frets 5-7-9 = G-A-B = L. Frets 7-9-11 = A-B-C# = L. Frets 9-11-12 = B-C#-D = M. So the scale ascending contains: L, M, [P], L, L, M. Say this aloud.",
        "Sing M: play frets 2-4-5 on string 4 (E-F#-G) and sing along. Focus on feeling the half step land — it should sound like a footstep arriving home.",
        "At 60bpm: alternate L (frets 0-2-4) and M (frets 2-4-5) on string 4, ascending both, as quarter notes. 4 cycles. The shared F# at fret 4 means your finger stays and you just shift the endpoint.",
      ],
    },
    integration: {
      duration: "7 min",
      steps: [
        "Freely play on strings 3 and 4. Whenever you play a 3-note group that is two whole steps, say 'L.' Whenever it is a whole then a half, say 'M.' Play for 4 minutes.",
        "In your practice log, write: 'L = W+W = 0-2-4. M = W+H = 0-2-3.' Draw the fret dot pattern for each.",
      ],
    },
    exitCheck: [
      "Can I immediately distinguish M from L by sound after playing a 3-note group?",
      "Do I know that M = fret pattern 0-2-3 (whole + half)?",
      "Can I find both M segments in the D major scale on string 4 (frets 2-4-5 and 9-11-12)?",
      "When I play L then M back to back, do I hear the difference — the wider vs narrower span?",
    ],
    nextTitle: "Segments P and S",
  },

  {
    day: 12,
    title: "Segments P and S",
    totalMinutes: 40,
    concept: {
      heading: "P (Half + Whole) and S (Whole Step Alone)",
      body:
        "The P segment starts with a half step and then a whole step, spanning 3 semitones (fret pattern: 0-1-3). In the D major scale, P appears at degrees 3-4-5 (F#-G-A), where the half step F# to G is followed by the whole step G to A. The S segment is simply a pair of two notes spanning a whole step (fret pattern: 0-2) — it is a connecting move, the smallest unit of melodic motion in the segment system. The S segment functions as a bridge between other segments, especially in pentatonic-style movement.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "You have learned L (W+W) and M (W+H) — today you add P (H+W) and S (W alone) to complete the four segment types.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Quick segment review: play an L (frets 0-2-4 on string 4) and say 'L'. Play an M (frets 2-4-5 on string 4) and say 'M'.",
        "Chromatic crawl on string 4: play frets 0 through 5 one at a time, one fret per beat at 60bpm. Descend. This prepares your fingers for the close spacing in P.",
        "Shake out fretting hand and set metronome to 55bpm.",
      ],
    },
    mainPractice: {
      duration: "28 min",
      heading: "Discovering P and S in the D Major Scale",
      steps: [
        "Define P on string 4: play frets 4-5-7 (F#-G-A). Say 'P' after all three. The half step is between F# (fret 4) and G (fret 5) — one fret. The whole step is between G (fret 5) and A (fret 7) — two frets. Pattern: 0-1-3 relative to starting fret. Hold last note 2 beats. 8 reps.",
        "Note the pattern contrast: L = 0-2-4, M = 0-2-3, P = 0-1-3. L and M both start with a whole step. P starts with a half step. Hear the difference: play L then P. L feels 'open'; P feels 'tighter at the start'. 5 comparison pairs.",
        "Find all P segments in D major on string 4: degrees 3-4-5 = F#-G-A = frets 4-5-7. Any other P in the scale? degrees 7-1-2 = C#-D-E = frets 11-12-14... fret 14 is outside the 0-12 range in this exercise. So on string 4 in frets 0-12, there is one P: frets 4-5-7. Play it 10 times, saying 'P'.",
        "Define S on string 4: the S segment is a single whole step — just two notes. Play fret 0 and fret 2 (D-E). Say 'S'. S is not a 3-note group — it is the 2-note building block that can stand alone or connect other segments. Play 5 different S moves on string 4: 0-2, 2-4, 5-7, 7-9, 9-11. Say 'S' after each pair.",
        "Full scale segmentation on string 4 — label every group: ascending frets 0-2-4-5-7-9-11-12. Groups: (0-2-4)=L, (2-4-5)=M, (4-5-7)=P, (5-7-9)=L, (7-9-11)=L, (9-11-12)=M. Say each label as you play. 3 reps.",
        "P on string 3: find F# on string 3 (frets: G+6 semitones = G→G#→A→A#→B→C→C# = wait, that is not F#. G(0) A(2) B(4) so F# is... F# is 11 semitones up from G: F#=fret 11. So P on string 3: frets 11-12-14... fret 14 is off. In the 0-12 range, the only P starting point on string 3 within scale tones is fret 11 going to 12 and then 14 — which is out of range. Alternative: find P starting on other degrees where the pattern fits within 0-12. Degrees 3-4-5 is the primary P. Skip extended string 3 drilling and do extra repetition on string 4 instead.",
        "Chromatic identification drill: play any random 3-note group (or 2-note S) on string 4 at 60bpm, and before moving to the next note, call out its type: L, M, P, or S. Do 10 groups. Focus on the first interval: if it is a half step (1 fret) the group is P; if it is a whole step (2 frets) it is L or M (check the second interval to distinguish).",
      ],
    },
    integration: {
      duration: "7 min",
      steps: [
        "Play through the D major scale on string 4 one time, slowly, labeling every segment group as you go. Say all four types: L, M, P, or S whenever you identify a unit.",
        "In your practice log, write the complete segment map of the D major scale: L-M-P-L-L-M. Note what is missing from this list (S — the S segment functions as a connector and does not appear as a discrete 3-note group within a strict stepwise scale, but appears in pentatonic or skipping motion).",
      ],
    },
    exitCheck: [
      "Can I play P (frets 4-5-7 on string 4) and immediately say 'P — half then whole'?",
      "Do I know what distinguishes P from M? (P starts with a half step; M ends with a half step.)",
      "Do I understand that S is a 2-note whole step connector, not a 3-note group?",
      "Can I label the full scale on string 4 as L-M-P-L-L-M from memory?",
    ],
    nextTitle: "Name As You Play",
  },

  {
    day: 13,
    title: "Name As You Play",
    totalMinutes: 40,
    concept: {
      heading: "Automatic Segment Recognition While Playing",
      body:
        "The full value of segment naming is realized only when it becomes effortless — when you can play and name simultaneously without any lag. This is an auditory and motor skill integration challenge, not a memory task. Today's drills are designed to push the naming to automatic by playing at tempos where you cannot stop to think: you must trust the pattern recognition your hands and ears have built this week. Naming segments while playing is the first form of real-time musical analysis.",
      learnHref: "/musical-universe/learn#segment-types",
      learnLabel: "Explore Segment Types",
    },
    recap:
      "You now know all four segment types — L, M, P, S — embedded in the D major scale. Today you drive them to automatic recognition speed.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD. Quick full-scale run on string 4, naming note names (not segments yet). One pass ascending and descending.",
        "Say the segment map from memory aloud: 'D major scale on string 4: L-M-P-L-L-M.' Do this 3 times without checking notes.",
        "Loosen up: play random notes freely on any strings for 90 seconds with no goal — just warm up the hands.",
        "Set metronome to 40bpm — start slow for the naming drills.",
      ],
    },
    mainPractice: {
      duration: "28 min",
      heading: "Simultaneous Play and Name Drills",
      steps: [
        "Scale + naming at 40bpm: play the D major scale on string 4, ascending. For each 3-note group, say the segment type WHILE playing the third note (not after). Groups: (0-2-4)='L', (2-4-5)='M', (4-5-7)='P', (5-7-9)='L', (7-9-11)='L', (9-11-12)='M'. 5 ascending passes at 40bpm.",
        "Scale + naming at 60bpm: same exercise, faster. If you hesitate or misname, do not stop — keep playing and correct on the next pass. 5 ascending passes at 60bpm.",
        "Descending with names at 40bpm: play the scale down from fret 12 to fret 0 on string 4. Descending segments in reverse: (12-11-9)='M', (11-9-7)='L', (9-7-5)='L', (7-5-4)='P', (5-4-2)='M', (4-2-0)='L'. Say the type as you play the third note in each group. 5 reps.",
        "Two-string narration: play freely on strings 3 and 4, no click. The only rule: every time you play three consecutive notes, you must say the segment type out loud before moving on. If you cannot name it, stop, identify it, then continue. Play for 3 minutes.",
        "Backward scale + naming at 50bpm: play string 4 descending (12 to 0) and name segments as you land on each third note. Challenge: the descending order is M-L-L-P-M-L (reading the ascending L-M-P-L-L-M in reverse). 4 reps.",
        "Free play naming on three strings: expand to strings 1, 3, and 4. Play any melody using only D major scale notes. Name every 3-note group you play. Accept that you will sometimes miss — just keep playing and naming. 4 minutes.",
        "Speed check at 80bpm: attempt the ascending scale + naming drill at 80bpm. This is fast. Do not worry if naming lags — the attempt at speed trains the automatic recognition even when you miss. 3 passes.",
      ],
    },
    integration: {
      duration: "7 min",
      steps: [
        "Play freely on strings 1, 3, 4, and 6 for 5 minutes. Use the open chord, single-string scale fragments, and any combinations. Keep naming segments aloud whenever you play three consecutive notes. Let the naming become a background murmur rather than a deliberate pause.",
        "End by playing the full D major scale on string 4 ascending at whatever tempo feels clean. Say 'L-M-P-L-L-M' in one breath as you play each group.",
      ],
    },
    exitCheck: [
      "Can I name segment types while playing, without stopping to think?",
      "Can I do the ascending scale naming drill at 60bpm without a single hesitation?",
      "When I play freely on two strings, do segment names come to mind automatically (even if imperfect)?",
      "Do I know the descending segment order: M-L-L-P-M-L?",
    ],
    nextTitle: "Sprint 1 Gate",
  },

  {
    day: 14,
    title: "Sprint 1 Gate",
    totalMinutes: 45,
    concept: {
      heading: "The Readiness Gate: Measurement, Not Judgment",
      body:
        "The Sprint 1 gate is a calibration, not a pass/fail exam. If you clear all four criteria, you advance to Sprint 2. If you do not clear one or more, you extend Sprint 1 by up to 7 days focusing specifically on those areas, then advance regardless. The criteria below reflect the minimum fluency needed to build on this foundation in Sprint 2. An honest measurement now prevents stacking difficulty on a shaky base later.",
      learnHref: "/musical-universe/learn#zoom-hierarchy",
      learnLabel: "See the Zoom Hierarchy",
    },
    recap:
      "You have spent 13 days building note knowledge, anchor navigation, scale fluency, and segment recognition — today you measure all of it in one integrated session.",
    warmup: {
      duration: "5 min",
      steps: [
        "Tune to DADGAD, naming each string aloud.",
        "Play the open chord. Say: 'D-G-A. Dsus4. No third.'",
        "Play the D major scale ascending on string 4 from memory, slowly, no tuner reference.",
        "Shake out hands and take 3 slow breaths. Today is a measurement day.",
      ],
    },
    mainPractice: {
      duration: "30 min",
      heading: "Sprint 1 Gate Exercises",
      steps: [
        "Gate 1 — Random note location, all strings: use a timer. Call strings 1–6 in random order (shuffle, or use dice). For each, find D within 3 seconds. Record time. Then reset — find A on each string within 5 seconds. Then G on each string within 5 seconds. Write your hit rates (e.g., D: 5/6 within 3 sec, A: 4/6, G: 5/6). This is your anchor fluency score.",
        "Gate 2 — Scale fluency on three strings: play D major scale ascending on string 6 (frets 0-2-4-5-7-9-11-12) without stopping. Immediately continue to string 4 same pattern without a break. Immediately continue to string 1 same pattern. One continuous run across three strings. If you stop, note where and practice that transition before retrying. You pass Gate 2 when you can do this run with no stops.",
        "Gate 3 — Segment identification, 10 rounds: set metronome to 60bpm. Play any 3-note group from the D major scale (on any D-string), then say its segment type before the next beat. Do 10 groups. Record how many you named correctly without hesitation. Target: 8 out of 10.",
        "Gate 4 — Eyes-closed anchor drill: close your eyes. Touch a random string with your picking hand. Say: (a) the open string name, (b) its degree (1, 4, or 5), (c) where you can find the other two degrees on the same string. Open eyes to confirm. Do 6 strings in random order. Record how many you got fully correct. Target: 4 out of 6 fully correct.",
        "Integrated free play — 10 minutes: play freely using any combination of what you have learned: open chord, scale fragments, anchor navigation, segment naming (out loud when possible). Use strings 1, 3, 4, and 6. No click. Just play with awareness.",
      ],
    },
    integration: {
      duration: "10 min",
      steps: [
        "Review your gate scores. Write them in your practice log: Gate 1 (D/A/G hit rates), Gate 2 (continuous scale run: Y/N), Gate 3 (segment naming: X/10), Gate 4 (eyes-closed: X/6).",
        "Decision: if you cleared all four gates, write 'Advancing to Sprint 2' in your log. If you missed one or more, write the specific weak area and 'Extending Sprint 1, focus: [area].' Either way, note the date.",
        "Close the session by playing the open DADGAD chord and letting it ring to full decay. You have completed Sprint 1.",
      ],
    },
    exitCheck: [
      "Did I complete all four gate exercises with honest self-assessment?",
      "Do I have written scores for each gate criterion?",
      "Have I made a clear advance/extend decision based on actual scores?",
      "Do I know exactly which area to strengthen if extending Sprint 1?",
    ],
    readinessGate: [
      "Can name any note on any string in DADGAD within 3 seconds",
      "Can find degree 1 (D), 4 (G), 5 (A) on any string in frets 0–7 within 5 seconds",
      "Can play D major scale on strings 1, 3, and 6 without pausing",
      "Can identify segment type (L/M/P/S) for any 3-note group played",
    ],
    nextTitle: "Sprint 2",
  },
];
