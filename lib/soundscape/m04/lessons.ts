// The six open lessons, with the art that introduces each (reused M02/M03 pieces; thumbnails introduce, they never replace teaching).
export const LESSONS = [
  { id: '1A', week: 1, route: 'week-1/lesson-1a', title: 'A Note Becomes a Landscape', art: 'M02:G01-B-concentric-home', blurb: 'Find C on any keyboard, learn the seven letter names and the octave, and hear why a note can feel like home. Then keep one note steady and let others visit it.' },
  { id: '1B', week: 1, route: 'week-1/lesson-1b', title: 'Stop Before the Ending', art: 'B01', blurb: 'Measure the smallest steps on the keyboard, follow the whole-step and half-step pattern of C major, and try one journey two ways: an open ending and an arrival.' },
  { id: '1C', week: 1, route: 'week-1/lesson-1c', title: 'My First Intentional Soundscape', art: 'C01', blurb: 'Learn how one voice can stay while another moves, how timing, silence and variation shape a piece, and make a tiny two-voice piece of your own.' },
  { id: '2A', week: 2, route: 'week-2/lesson-2a', title: 'Hold One Voice, Let the Other Explore', art: 'D03', blurb: 'Meet the pair of notes called a dyad, count the distance between two notes in semitones, and discover what changes when one voice holds still.' },
  { id: '2B', week: 2, route: 'week-2/lesson-2b', title: 'What Happens When Both Voices Move?', art: 'E03', blurb: 'See five ways one starting pair can change, and learn to tell apart oblique, contrary and similar motion.' },
  { id: '2C', week: 2, route: 'week-2/lesson-2c', title: 'Compose with Only Two Voices', art: 'F01', blurb: 'Keep one melody exactly the same, change what sits beneath it, and learn what the two versions share and where they differ.' },
] as const
export type LessonInfo = (typeof LESSONS)[number]
