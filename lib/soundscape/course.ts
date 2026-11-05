// Eight-week journey: wording is the approved course-entry copy (COURSE_ENTRY_PAGE_COPY_V1.md, sections 3.02 and 3.03).
// Lesson links stay inactive until the lesson pages are built and verified.
export const WEEKS = [
  {
    "n": 1,
    "title": "Finding Home",
    "learning": "Discover how a note becomes a reference. Learn the keyboard, note names, octaves, semitones and the first major scale. Hear the difference between arriving and leaving a phrase open.",
    "creation": "Make a 30–45-second musical atmosphere with a held tone and a moving idea."
  },
  {
    "n": 2,
    "title": "Two Notes Become Two Voices",
    "learning": "Explore musical intervals and their names. Count distances on the keyboard and discover what happens when one voice holds while another moves—or when both move together.",
    "creation": "Compose a small two-voice conversation using only a few notes."
  },
  {
    "n": 3,
    "title": "Melodic Shapes in Conversation",
    "learning": "Turn pitches into gestures, motifs, contours and phrases. Try musical questions and answers, meaningful pauses and an imagined continuation.",
    "creation": "Build a short melodic conversation with a recognizable idea."
  },
  {
    "n": 4,
    "title": "Harmony Emerges from Voices",
    "learning": "Watch a third voice change the whole sound. Learn the foundations of major and minor triads, chord roles, and why the same melody note can feel different over another harmony.",
    "creation": "Make a 60–90-second miniature and compare two harmonized versions."
  },
  {
    "n": 5,
    "title": "Traveling Through Harmony",
    "learning": "Learn how chords share notes and how moving a bass or supporting voice can transform the harmony around a melody.",
    "creation": "Create a short harmonic journey and try another route through the same idea."
  },
  {
    "n": 6,
    "title": "The Art of Arrangement",
    "learning": "Give melody, bass, inner voices and texture different jobs. Explore register, spacing, repeated movement and the power of leaving room.",
    "creation": "Turn a small musical idea into a layered, evolving synth arrangement."
  },
  {
    "n": 7,
    "title": "Changing Musical Worlds",
    "learning": "Hear how one altered note, a new patch or a different register can change an entire atmosphere. Begin exploring tonal colors and modal possibilities.",
    "creation": "Make two related soundscapes that tell different emotional stories."
  },
  {
    "n": 8,
    "title": "Creating the Journey",
    "learning": "Bring together the relationships you've learned: tonal center, melodic shape, intervals, harmony, voices, texture, time and form.",
    "creation": "Complete an original 2–3-minute composition—or a shorter work that truly feels finished—and describe some of your musical choices."
  }
] as const

export const BASE = '/curriculum/soundscape-path'
export const WEEK_SLUGS = WEEKS.map(w => `week-${w.n}`)
export const LESSON_SLUGS = WEEKS.flatMap(w => ['a', 'b', 'c'].map(x => ({ week: `week-${w.n}`, lesson: `lesson-${w.n}${x}` })))
