export type MonthPhase = 'Stabilize' | 'Vary' | 'Adapt'
export type CurriculumSection = 'overview' | 'month-1' | 'month-2' | 'month-3' | 'reference'

export interface SessionPlan {
  type: 'Technique' | 'Application' | 'Integration' | 'Listening'
  focus: string
  instruction: string
  amfSystem: string
  doD: string
}

export interface DayPlan {
  day: number
  week: number
  month: 1 | 2 | 3
  phase: MonthPhase
  focus: string
  guitar: [SessionPlan, SessionPlan, SessionPlan]
  piano: [SessionPlan, SessionPlan, SessionPlan]
  anchorSong: 'Sweet Home Chicago' | 'Blue Monk' | 'The Thrill Is Gone' | null
  historicalRef: {
    artist: string
    track: string
    listenFor: string
  } | null
  // Connection fields — link this day to the rest of the course
  historyUnit: 1 | 2 | 3 | 4 | null
  historyContext: string | null       // specific excerpt or concept from that history unit
  anchorSongFocus: string | null      // what to specifically listen for TODAY in the anchor song
  curriculumSection: CurriculumSection
  amfSystems: string[]                // system slugs active today (e.g. 'blues-root', 'pdc')
}

export const AMF_SYSTEM_LABELS: Record<string, string> = {
  'blues-root': 'Blues Root',
  'pdc': 'PDC',
  'rhythm-cell': 'Rhythm Cell',
  'tps-guitar': 'TPS (Guitar)',
  'tps-piano': 'TPS (Piano)',
  'rxp': 'RXP',
  'shape': 'SHAPE',
  'cas-arc': 'CAS-ARC',
  'pcs': 'PCS',
}

export const HISTORY_UNIT_TITLES: Record<number, string> = {
  1: 'The African Foundation',
  2: 'Music Under Enslavement',
  3: 'The Blues Emerges',
  4: 'The Delta: The Guitar Speaks Alone',
}

export const curriculum: DayPlan[] = [

  // ─────────────────────────────────────────────────────────────────
  // MONTH 1 — STABILIZE
  // Anchor song: Sweet Home Chicago (E guitar / Bb piano)
  // ─────────────────────────────────────────────────────────────────

  // ── WEEK 1: Blues Root & 12-Bar Form ──────────────────────────────

  {
    day: 1, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Count the 12-bar form',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Cross Road Blues',
      listenFor: 'Call-and-response between guitar and vocal',
    },
    historyUnit: 1,
    historyContext: 'In West African performance traditions, call-and-response is not a musical device — it is a social structure. The call creates a question that is incomplete without its response. This is the grammar of the blues.',
    anchorSongFocus: 'Find where Johnson\'s guitar enters after his vocal phrase. Count the bars of silence before the response. That space IS the call-and-response — your practice today is learning to feel that structure.',
    curriculumSection: 'month-1',
    amfSystems: ['blues-root', 'pdc'],
    guitar: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'E root note, low string', instruction: 'Play open E on beat 1 of each chord change', doD: 'Root on every change, 2 clean choruses' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Name chord aloud as it arrives', instruction: 'Speak I–IV–V labels while playing root notes', doD: '4 choruses, no wrong labels' },
      { type: 'Listening', amfSystem: 'Blues Root', focus: 'Listen — Sweet Home Chicago', instruction: 'Hear how Johnson names each phrase with space', doD: 'Identify 3 silent gaps where guitar response lands' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'Bb root LH, beat 1 only', instruction: 'LH Bb on every beat 1, count bars aloud', doD: 'Steady LH root, 2 choruses without losing count' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Identify I–IV–V chord roles', instruction: 'Say chord function aloud as each arrives', doD: 'All 12 chord changes named correctly' },
      { type: 'Listening', amfSystem: 'Blues Root', focus: 'Listen — Sweet Home Chicago', instruction: 'Feel where the IV chord lifts and the V resolves', doD: 'Sing Bb–Eb–F roots along with the recording' },
    ],
  },

  {
    day: 2, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Root on every change',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Come On In My Kitchen',
      listenFor: 'Thumb-bass pattern landing on the beat',
    },
    historyUnit: 1,
    historyContext: 'When Robert Johnson plays his alternating bass thumb, he creates one rhythmic cycle. His melody above is a second cycle. The groove lives in their relationship — this is Delta blues polyrhythm compressed into one pair of hands.',
    anchorSongFocus: 'Listen only to Johnson\'s bass thumb — the low string pulse. Count how many beats it stays steady before the chord changes at bar 5. That constant cycle IS the root you are practicing today.',
    curriculumSection: 'month-1',
    amfSystems: ['blues-root', 'rhythm-cell'],
    guitar: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'E, A, B roots — three strings', instruction: 'Find I–IV–V roots on low strings; no chords yet', doD: 'Hit correct root, no hesitation, 3 choruses' },
      { type: 'Application', amfSystem: 'Rhythm Cells', focus: 'Quarter-note pulse, steady', instruction: 'Four roots per bar at 65 BPM with metronome', doD: 'Pulse stays locked — no rushing in bar 3' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Roots with pulse, full form', instruction: 'Combine root navigation and steady quarter pulse', doD: '2 choruses clean at 65 BPM' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'Bb, Eb, F roots — LH only', instruction: 'Play each root in sequence I–IV–V on the keyboard', doD: 'Locate all three without looking, 2 choruses' },
      { type: 'Application', amfSystem: 'Rhythm Cells', focus: 'Quarter-note pulse, LH', instruction: 'Four LH roots per bar at 65 BPM', doD: 'Tempo steady — no drift between bars 8 and 9' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'LH roots + pulse, full form', instruction: 'Combine root navigation and steady pulse in Bb', doD: '2 clean choruses at 65 BPM with metronome' },
    ],
  },

  {
    day: 3, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Call-and-response spaces',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Preachin\' Blues (Up jumped the Devil)',
      listenFor: 'The silence between phrases — count how long each rest lasts',
    },
    historyUnit: 2,
    historyContext: 'The field holler called into open air and waited. It did not resolve — it presented and let the air carry it. When Johnson\'s guitar answers between vocal lines, he is doing exactly what the holler did: the guitar became the other voice in the conversation.',
    anchorSongFocus: 'After each vocal line, count the silence before the guitar responds. How long does Johnson wait? Does the silence feel musical or like a mistake? Your practice today is to hold that same quality of intentional space.',
    curriculumSection: 'month-1',
    amfSystems: ['blues-root', 'pdc'],
    guitar: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'Play 2 bars, rest 2 bars', instruction: 'Root pattern 2 bars, complete silence 2 bars', doD: 'Silence feels intentional, not like a mistake' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Diagnose: when does the music breathe?', instruction: 'Find the natural gap in bars 3–4 of each phrase', doD: 'Place 3 deliberate silences in one chorus' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Phrase-space-phrase pattern', instruction: 'Root-phrase, rest, root-phrase — feel the exchange', doD: '4 choruses with clear call-and-response shape' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'Blues Root', focus: 'Play 2 bars, rest 2 bars, LH', instruction: 'LH roots 2 bars, hands off keys for 2 bars', doD: 'Rest is clean — no accidental notes' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Spot the response window in the form', instruction: 'Identify bars 3–4 as the natural breathing space', doD: 'Mark 3 response windows in one chorus' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'LH call-response in Bb form', instruction: 'Phrase-space-phrase, steady pulse underneath', doD: '2 choruses feeling musical, not mechanical' },
    ],
  },

  {
    day: 4, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Steady pulse with metronome',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Love In Vain',
      listenFor: 'How the tempo holds even in emotional passages — no rushing',
    },
    historyUnit: 1,
    historyContext: 'Blues "feel" is not imprecision — it is deliberate rhythmic placement inherited from a tradition where the relationship between cycles was the whole point. Your metronome trains awareness of the grid so you can lean against it intentionally, not accidentally.',
    anchorSongFocus: 'Tap your foot with Johnson\'s recording. Notice where his melody lands relative to your foot. That slight "behind the beat" quality — he is not rushing, he is choosing where to place the note. That is RXP. Your metronome today builds the grid that makes that choice meaningful.',
    curriculumSection: 'month-1',
    amfSystems: ['rhythm-cell', 'blues-root'],
    guitar: [
      { type: 'Technique', amfSystem: 'Rhythm Cells', focus: 'Muted downstrokes, quarter pulse', instruction: 'Muted strums on all 4 beats at 60 BPM — no chord yet', doD: 'Lock with metronome for 4 full choruses' },
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Roots on beat 1, mutes on 2–3–4', instruction: 'Open root on 1, muted click on 2, 3, 4', doD: 'Form stays correct while pulse locks' },
      { type: 'Integration', amfSystem: 'Rhythm Cells', focus: 'Pulse holds through the turnaround', instruction: 'Bars 9–12 are the hardest — keep the click', doD: 'Turnaround clean at 60 BPM, 3 times in a row' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'Rhythm Cells', focus: 'LH quarter notes, 4 beats per bar', instruction: 'Four LH root notes per bar, metronome at 60', doD: 'No rushing — consistent dynamic on all 4 beats' },
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Accent beat 1, softer on 2–3–4', instruction: 'Play beat 1 slightly stronger — feel the pulse anchor', doD: '4 choruses with audible beat 1 emphasis' },
      { type: 'Integration', amfSystem: 'Rhythm Cells', focus: 'Pulse through turnaround, Bb form', instruction: 'Lock metronome through all 12 bars, no hesitation', doD: '3 clean choruses at 60 BPM' },
    ],
  },

  {
    day: 5, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Play along with recording',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Sweet Home Chicago',
      listenFor: 'Guitar in relation to vocal — who leads, who responds?',
    },
    historyUnit: 2,
    historyContext: 'Playing along with a recording is exactly how Delta blues was transmitted — not from sheet music but from listening. Robert Johnson learned by listening to Son House. You are learning by listening to Robert Johnson. This is the tradition.',
    anchorSongFocus: 'Play along on roots only. Feel where you lose the form — that\'s information. The IV chord at bar 5 should feel like a lift. Where do you arrive early? Where do you hesitate? That is your diagnostic for Week 2.',
    curriculumSection: 'month-1',
    amfSystems: ['blues-root', 'pdc'],
    guitar: [
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Track the form while listening', instruction: 'Play along to recording — roots only, stay in form', doD: 'Complete song without losing place once' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Find your entry point', instruction: 'Start on bar 1 — feel where the I chord is', doD: 'Enter on the right beat in 3 consecutive tries' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Roots + pulse, full song', instruction: 'Quarter-note roots through whole song with recording', doD: 'Reach the end feeling the groove, not just counting' },
    ],
    piano: [
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Track Bb form with recording', instruction: 'LH roots along to Sweet Home Chicago, Bb key', doD: 'Full song without losing the form' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Find bar 1 by ear, not counting', instruction: 'Feel the I chord arrival — enter without counting in', doD: 'Enter correctly from cold start, 3 tries' },
      { type: 'Integration', amfSystem: 'Rhythm Cells', focus: 'Pulse with recording, Bb', instruction: 'Four LH roots per bar, full song, feel the pocket', doD: 'Stay in the groove — no tempo drift' },
    ],
  },

  {
    day: 6, week: 1, month: 1, phase: 'Stabilize',
    focus: 'Week 1 baseline recording',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Robert Johnson',
      track: 'Dead Shrimp Blues',
      listenFor: 'Simplicity as a complete statement — nothing wasted',
    },
    historyUnit: 2,
    historyContext: 'The griot\'s function was to make the invisible visible, the present moment speak to those who came before and after. Your recording is your first act in that same tradition — making your musical thinking audible and documentable. The recording cannot lie.',
    anchorSongFocus: 'Before recording, listen one final time. You are recording a response to what Johnson built. How much of that conversation can you hold? Pulse, form, three deliberate spaces. Nothing more is required today.',
    curriculumSection: 'month-1',
    amfSystems: ['blues-root', 'pdc'],
    guitar: [
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Review all week 1 material', instruction: 'Run roots and pulse, 4 choruses, no stopping', doD: 'All 4 choruses solid — ready to record' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Choose one clear intention', instruction: 'Decide: pulse only, or roots + call-response?', doD: 'Intention stated before pressing record' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Record Week 1 baseline', instruction: 'One take — pulse, root navigation, 3 deliberate spaces', doD: 'Recording exists; listen back and note one improvement' },
    ],
    piano: [
      { type: 'Application', amfSystem: 'Blues Root', focus: 'Review week 1 material', instruction: 'LH roots + pulse, 4 choruses smooth', doD: 'Form confident — no hesitation at changes' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Set one intention for recording', instruction: 'Say aloud what you will do before you start', doD: 'Intention matches what the recording shows' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Record Week 1 baseline', instruction: 'LH roots, Bb form, 3 call-response spaces minimum', doD: 'Recording exists; write one sentence of diagnosis' },
    ],
  },

  // ── WEEK 2: TPS Major Triad + Muddy Waters ──────────────────────────

  {
    day: 7, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Introduce major triad shape',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'Mannish Boy',
      listenFor: 'How a single riff repeats with increasing harmonic weight',
    },
    historyUnit: 3,
    historyContext: 'The AAB verse has three lines — and three lines times 4 bars = 12 bars. The form IS the poem. When you play a major triad over the I chord, you are harmonizing the "call" — the opening statement of the verse.',
    anchorSongFocus: 'Track the three-part verse in Sweet Home Chicago: first A line → guitar responds. Second A line → guitar responds. B line ("to my sweet home Chicago") → turnaround. Your major triad today goes in those guitar-response bars.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano', 'blues-root'],
    guitar: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'E major triad, root position', instruction: 'Play E-G#-B on strings 4-3-2, slow and clean', doD: 'Clean triad sound — all 3 notes ring, no buzz' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Triad over I chord, 4 bars', instruction: 'Arpeggiate E major triad over bars 1–4 only', doD: 'Triad sounds like support, not solo' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Root on 1, triad fill in bar 3–4', instruction: 'Root beats 1-2, triad arpeggio in the call-back gap', doD: '2 choruses with triad fills in natural gaps' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'Bb major triad RH, root position', instruction: 'RH Bb-D-F, close voicing, middle register', doD: 'All 3 notes even volume, 10 clean repetitions' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Triad over I chord with LH root', instruction: 'LH Bb root + RH Bb triad together, bars 1–4', doD: 'Hands coordinate — roots and triad land together' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'LH root + RH triad over I, 2 choruses', instruction: 'Play I chord only with two-hand texture, full form', doD: '2 choruses — triad on I, roots only on IV and V' },
    ],
  },

  {
    day: 8, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Triad as support over I chord',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'Hoochie Coochie Man',
      listenFor: 'Guitar texture behind the vocal — heavy but not busy, supporting not competing',
    },
    historyUnit: 3,
    historyContext: 'In solo Delta blues, the guitar played bass AND harmony AND melody simultaneously because there was no one else. Your triad voicings ARE the harmony voice — the one that Johnson\'s alternating bass made room for.',
    anchorSongFocus: 'Listen to how Johnson\'s texture changes on the I chord vs. the IV chord. He doesn\'t just play a different note — the harmonic flavor changes. Your major triad gives you that same color-switching control.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano'],
    guitar: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'E major triad — three inversions', instruction: 'Root pos, 1st inversion, 2nd inversion — each clean', doD: 'Move between inversions without losing the notes' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Choose which inversion sits best', instruction: 'Play same bar with all 3 inversions — pick the warmest', doD: 'Identify your preferred voicing and explain why' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'E triad support, bars 1–4 only', instruction: 'Full 12-bar form — triad texture on I, root only elsewhere', doD: '3 choruses — clearly different texture on I vs IV vs V' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'Bb major triad — two voicings', instruction: 'Close voicing vs. spread voicing (root-5th-3rd)', doD: '5 of each voicing, even tone, no stumbling' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Triad supports — what color does it add?', instruction: 'Play close voicing then spread — hear the difference', doD: 'Name which voicing feels warmer and which feels wider' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Two-hand texture on I chord', instruction: 'LH root + RH triad (your chosen voicing), 3 choruses', doD: '3 choruses solid — change voicing once per chorus' },
    ],
  },

  {
    day: 9, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Navigate I to IV with triads',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'Long Distance Call',
      listenFor: 'How the IV chord lifts the energy — the harmonic stakes rising',
    },
    historyUnit: 3,
    historyContext: 'The IV chord in bar 5 raised the harmonic stakes — it is the second A line, the echo that deepens the call. In harmonic terms, moving to the IV creates a lift while staying in the same key. Your triad change tracks that lift.',
    anchorSongFocus: 'Feel the IV chord lift at bar 5 in Sweet Home Chicago. Johnson\'s guitar texture shifts there — can you hear what changes? That harmonic movement is what your triad change is tracking. The new triad should feel like an arrival.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano'],
    guitar: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'A major triad shape (IV over E blues)', instruction: 'A-C#-E on strings 5-4-3, root position, clean', doD: 'A triad clean — all strings sound, no buzz' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Switch E triad → A triad at bar 5', instruction: 'Change triad at the IV chord — feel the arrival', doD: 'Change lands on beat 1 of bar 5, not after' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'I and IV triads, bars 1–8', instruction: 'Bars 1–4 E triad, bars 5–8 A triad, roots bars 9–12', doD: '3 choruses — IV arrival feels like a lift' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'Eb major triad RH (IV over Bb blues)', instruction: 'RH Eb-G-Bb, close voicing, locate cleanly', doD: 'Eb triad found immediately without searching' },
      { type: 'Application', amfSystem: 'TPS', focus: 'Switch Bb → Eb triad at bar 5', instruction: 'RH changes from Bb to Eb on beat 1 of bar 5', doD: 'Change lands on the downbeat, no hesitation' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'I and IV triads, bars 1–8', instruction: 'LH root + RH triad — I bars 1–4, IV bars 5–8', doD: '3 choruses — IV feels like a harmonic shift' },
    ],
  },

  {
    day: 10, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Navigate IV to V — the turnaround',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'Rolling Stone',
      listenFor: 'V chord tension pulling inevitably back toward I — the form completing itself',
    },
    historyUnit: 3,
    historyContext: 'The V chord at bar 9 is the crisis before the resolution. In the AAB verse it is the B line — the response that completes the argument. The turnaround at bars 11-12 is the emotional resolution that drives the form back to begin again.',
    anchorSongFocus: 'Find Johnson\'s turnaround lick at bars 11-12 of Sweet Home Chicago. It creates V-chord tension and releases it back to I. That resolution feeling — your B triad today creates the same harmonic arc.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano'],
    guitar: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'B major triad (V over E blues)', instruction: 'B-D#-F# on strings 5-4-3, locate cleanly', doD: 'B triad found without searching, 5 clean hits' },
      { type: 'Application', amfSystem: 'TPS', focus: 'V triad feels tense — lean into it', instruction: 'Play B triad — hold it, feel the pull back to E', doD: 'Resolution to I feels like relief, not just a chord change' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'Full I–IV–V triad navigation', instruction: 'Triad on each chord, follow the 12-bar form fully', doD: '2 choruses — all 3 chords textured with triads' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'F major triad RH (V over Bb blues)', instruction: 'RH F-A-C, close voicing, middle register', doD: 'F triad clean and immediate — no searching' },
      { type: 'Application', amfSystem: 'TPS', focus: 'V triad creates tension before I', instruction: 'Play F triad slowly — feel the pull back to Bb', doD: 'Describe the feeling of V→I movement in one word' },
      { type: 'Integration', amfSystem: 'Blues Root', focus: 'All three triads — full 12-bar form', instruction: 'LH roots + RH triads, change on each chord, Bb blues', doD: '2 choruses — all 12 changes textured' },
    ],
  },

  {
    day: 11, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Full I–IV–V triad fluency',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'I\'m Ready',
      listenFor: 'Guitar stabs landing between vocal phrases — support that serves the song',
    },
    historyUnit: 3,
    historyContext: 'The alternating bass thumb solved a structural problem: when blues became solo music, the bass had to come along. Your thumb IS the bass player. Your fingers ARE the harmony player. Two voices in ten fingers — the same solution Delta musicians found in acoustic necessity.',
    anchorSongFocus: 'Isolate Johnson\'s two voices in Sweet Home Chicago: bass thumb (low string pulse, steady) and melody fingers (response phrases). Can you hear them separately? That independence is what your triad practice is building toward.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano', 'blues-root'],
    guitar: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'All three triads, faster transitions', instruction: 'Move E→A→B→A→E with no pause between chords', doD: 'Changes land on the downbeat — no catchup' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Triad as background — not the melody', instruction: 'Play triads softer — they support, not lead', doD: 'Someone could sing over your texture comfortably' },
      { type: 'Integration', amfSystem: 'TPS', focus: 'Triad + root + pulse — full texture', instruction: 'Root on 1, pulse cells, triad fills in gaps, full form', doD: '2 choruses — three AMF elements coordinated' },
    ],
    piano: [
      { type: 'Technique', amfSystem: 'TPS', focus: 'Bb→Eb→F triads, no pause', instruction: 'RH moves through all three without stopping to search', doD: 'Full I-IV-V triad sequence 4 times, clean' },
      { type: 'Application', amfSystem: 'PDC', focus: 'Triads as support — lighter touch', instruction: 'RH softer than LH — triads color, roots ground', doD: 'Balance audible — LH stronger than RH' },
      { type: 'Integration', amfSystem: 'TPS', focus: 'LH root + RH triad, full Bb blues', instruction: 'Full 12-bar with two-hand texture, smooth changes', doD: '2 choruses — form, roots, triads all coordinated' },
    ],
  },

  {
    day: 12, week: 2, month: 1, phase: 'Stabilize',
    focus: 'Week 2 checkpoint recording',
    anchorSong: 'Sweet Home Chicago',
    historicalRef: {
      artist: 'Muddy Waters',
      track: 'Trouble No More',
      listenFor: 'Guitar fills between verses — how much space they leave, how clearly they speak',
    },
    historyUnit: 3,
    historyContext: '"Sweet Home Chicago" demonstrates everything in two weeks of work: AAB structure with guitar responding between vocal lines, alternating bass thumb, the 12-bar form as emotional arc. Playing it is participating in a 200-year-old musical conversation.',
    anchorSongFocus: 'Full diagnostic listen before recording. Track: form (did you count it?), bass thumb (steady?), response fills (did they answer the voice?), turnaround (did it resolve?). This is your Week 2 self-evaluation.',
    curriculumSection: 'month-1',
    amfSystems: ['tps-guitar', 'tps-piano', 'pdc'],
    guitar: [
      { type: 'Application', amfSystem: 'TPS', focus: 'Review weeks 1–2 material', instruction: 'Run roots → triads → call-response — all in sequence', doD: 'All week 1–2 content accessible without stopping' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Choose one clear intention', instruction: 'Decide: pure pulse, triad support, or call-response', doD: 'Intention stated aloud before pressing record' },
      { type: 'Integration', amfSystem: 'TPS', focus: 'Record Week 2 checkpoint', instruction: 'Triad support + 2 call-response spaces, one take', doD: 'Recording exists; listen back and note one improvement' },
    ],
    piano: [
      { type: 'Application', amfSystem: 'TPS', focus: 'Review weeks 1–2 material', instruction: 'LH roots → two-hand triads → call-response', doD: 'All week 1–2 content smooth, no hesitation' },
      { type: 'Technique', amfSystem: 'PDC', focus: 'Choose one intention for recording', instruction: 'State role aloud: support, call-response, or pulse', doD: 'Intention clear before the recording starts' },
      { type: 'Integration', amfSystem: 'TPS', focus: 'Record Week 2 checkpoint', instruction: 'LH root + RH triad, 2 response spaces, one take', doD: 'Recording exists; write one sentence of diagnosis' },
    ],
  },

]

export function getDay(n: number): DayPlan | undefined {
  return curriculum.find(d => d.day === n)
}

export function getWeek(w: number): DayPlan[] {
  return curriculum.filter(d => d.week === w)
}

export function getMonth(m: number): DayPlan[] {
  return curriculum.filter(d => d.month === m)
}

export const TOTAL_DAYS = 78
export const WEEKS_POPULATED = 2
