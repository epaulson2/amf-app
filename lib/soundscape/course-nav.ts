// Canonical, source-controlled structure of the Ajourné course navigation. The lesson components and the contents tree both import these.
import { WEEKS, BASE } from './course'

export const LESSON_1A_STEPS = [
  'Set up your keyboard', 'A note, and what a sound has', 'Find C', 'Seven names, one path', 'The octave', 'There and back',
  'What makes a note feel like home?', 'A note stays, another visits', 'Hear it, imagine it, find it', 'Make a tiny melody', 'Paint what you hear', 'Recap and print',
]
export const LESSON_1B_STEPS = [
  'A journey that stops', 'One possible ending', 'Not all steps are the same size', 'Two semitones make a whole step', 'Close on the page, measured on the keys', 'The secret pattern of the major scale',
  'Two endings, two stories', 'Compose with an unfinished thought', 'Recap and print',
]
export const LESSON_1C_STEPS = [
  'Two voices can become one world', 'Where the voices sit on the keyboard', 'One voice alone, then both together', 'When a note enters', 'Silence changes the story',
  'One atmosphere, two stories', 'Make a place, let something happen', 'Give your musical idea a map', 'Recap, and what comes next',
]

export const LESSON_2A_STEPS = [
  'Where we are', 'Two notes, two voices', 'How far apart? Count the letters', 'Count the semitones', 'Two counts, one name: major and minor',
  'One stays, one moves: the upper voice', 'The foundation can travel', 'Three changes, one beginning', 'Make three little changes', 'What you learned, and what comes next',
]

export type TreeLesson = { id: string; title: string; href: string; steps?: readonly string[]; note?: string }
export type TreeWeek = { n: number; title: string; href: string; lessons: TreeLesson[]; note?: string }

/** Weeks 1 has the new step-by-step lessons. Lesson 2A is the new step-by-step lesson; 2B and 2C are still the existing live versions (links only). Weeks 3-8 are not published. */
export const TREE_WEEKS: TreeWeek[] = [
  { n: 1, title: WEEKS[0].title, href: `${BASE}/week-1`, lessons: [
    { id: '1A', title: 'A Note Becomes a Landscape', href: `${BASE}/week-1/lesson-1a`, steps: LESSON_1A_STEPS },
    { id: '1B', title: 'Stop Before the Ending', href: `${BASE}/week-1/lesson-1b`, steps: LESSON_1B_STEPS },
    { id: '1C', title: 'My First Intentional Soundscape', href: `${BASE}/week-1/lesson-1c`, steps: LESSON_1C_STEPS },
  ] },
  { n: 2, title: WEEKS[1].title, href: `${BASE}/week-2`, note: '2A new; 2B, 2C existing', lessons: [
    { id: '2A', title: 'Hold One Voice, Let the Other Explore', href: `${BASE}/week-2/lesson-2a`, steps: LESSON_2A_STEPS },
    { id: '2B', title: 'What Happens When Both Voices Move?', href: `${BASE}/week-2/lesson-2b` },
    { id: '2C', title: 'Compose with Only Two Voices', href: `${BASE}/week-2/lesson-2c` },
  ] },
]
export const FUTURE_WEEKS = WEEKS.slice(2).map(w => ({ n: w.n, title: w.title }))
