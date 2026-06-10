export interface LeadSheet {
  slug: string
  title: string
  artist: string
  key: string
  form: string
  tempo: string
  amfContext: string
  notation: string
}

// ---------------------------------------------------------------------------
// Sweet Home Chicago — 12-bar blues in E, Chicago shuffle
// ---------------------------------------------------------------------------
const sweetHomeChicagoNotation = `X:1
T:Sweet Home Chicago
C:Robert Johnson
M:4/4
L:1/8
Q:1/4=120
%%MIDI program 25
%%text Shuffle feel — swing the eighth notes
K:E
% --- Chorus 1 ---
|:"E7"E2 ^G2 B2 B2|"E7"B2 A2 ^G2 E2|"E7"^G2 B2 e4|"E7"B3 A ^GE E2|
"A7"A2 c2 e2 e2|"A7"e2 d2 c2 A2|"E7"E2 ^G2 B2 e2|"E7"B3 A ^GE E2|
"B7"B2 ^d2 f2 f2|"A7"A2 c2 e2 e2|"E7"E2 ^G2 B3 ^G|"B7"B,4 B,4:|
% --- Chorus 2 ---
|:"E7"E2 ^G2 B2 B2|"E7"B2 A2 ^G2 E2|"E7"^G2 B2 e4|"E7"B3 A ^GE E2|
"A7"A2 c2 e2 e2|"A7"e2 d2 c2 A2|"E7"E2 ^G2 B2 e2|"E7"B3 A ^GE E2|
"B7"B2 ^d2 f2 f2|"A7"A2 c2 e2 e2|"E7"E2 ^G2 B3 ^G|"B7"B,4 z4:|`

// ---------------------------------------------------------------------------
// Blue Monk — 12-bar jazz-blues in Bb, Thelonious Monk
// ---------------------------------------------------------------------------
const blueMonkNotation = `X:2
T:Blue Monk
C:Thelonious Monk
M:4/4
L:1/8
Q:1/4=120
%%MIDI program 0
%%text Swing feel
K:Bb
% --- Head (A) ---
% Bars 1-4: Bb7
|:"Bb7"_B2 =B2 _B2 F2|"Bb7"_B2 =B2 _B2 F2|"Bb7"_B2 =B2 _B2 c2|"Bb7"d4 z4|
% Bars 5-6: Eb7 | Edim7
"Eb7"_E2 E2 _E2 _B,2|"Eb7"_E2 E2 _E2 _B,2|"Edim7"_E2 =E2 _E2 ^c2|"Bb7/F"F4 z4|
% Bars 9-12: turnaround
"G7"G2 ^F2 G2 _B2|"Cm7"c2 _B2 G2 _E2|"F7"F2 _E2 C2 A,2|"Bb7"_B,4 z4:|
% --- Head (B) — repeat ---
|:"Bb7"_B2 =B2 _B2 F2|"Bb7"_B2 =B2 _B2 F2|"Bb7"_B2 =B2 _B2 c2|"Bb7"d4 z4|
"Eb7"_E2 E2 _E2 _B,2|"Eb7"_E2 E2 _E2 _B,2|"Edim7"_E2 =E2 _E2 ^c2|"Bb7/F"F4 z4|
"G7"G2 ^F2 G2 _B2|"Cm7"c2 _B2 G2 _E2|"Cm7"c2 _B2 G2 _E2|"F7"F6 z2:|`

// ---------------------------------------------------------------------------
// The Thrill Is Gone — 12-bar minor blues in Bm, B.B. King
// ---------------------------------------------------------------------------
const thrillIsGoneNotation = `X:3
T:The Thrill Is Gone
C:Roy Hawkins / Rick Darnell (B.B. King arrangement)
M:4/4
L:1/8
Q:1/4=60
%%MIDI program 27
%%text Slow minor blues — lay back on the feel
K:Bm
% --- Intro lick / Chorus 1 ---
|:"Bm7"f2 e2 d2 B2|"Bm7"f2 e2 d2 B2|"Bm7"d2 B2 A2 F2|"Bm7"B4 z4|
"Em7"e2 d2 B2 G2|"Em7"e2 d2 B2 G2|"Bm7"f2 e2 d2 B2|"Bm7"B4 z4|
"F#7"^f2 e2 ^d2 B2|"Em7"e2 d2 B2 G2|"Bm7"f2 e2 d2 B2|"F#7"^F4 z4:|
% --- Chorus 2 ---
|:"Bm7"f2 e2 d2 B2|"Bm7"f2 e2 d2 B2|"Bm7"B2 A2 F2 D2|"Bm7"B,4 z4|
"Em7"e2 d2 B2 G2|"Em7"e2 d2 B2 G2|"Bm7"f2 e2 d2 B2|"Bm7"B4 z4|
"F#7"^f2 e2 ^d2 B2|"Em7"e2 d2 B2 G2|"Bm7""F#7"B2 ^A2 B2 ^F2|"Bm7"B,6 z2:|`

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export const leadSheets: LeadSheet[] = [
  {
    slug: 'sweet-home-chicago',
    title: 'Sweet Home Chicago',
    artist: 'Robert Johnson',
    key: 'E major',
    form: '12-bar blues (2 choruses)',
    tempo: '120 BPM — shuffle',
    amfContext:
      'Trains the standard I7–IV7–V7 12-bar blues form in E and develops the Chicago shuffle feel that underlies most blues and blues-rock vocabulary.',
    notation: sweetHomeChicagoNotation,
  },
  {
    slug: 'blue-monk',
    title: 'Blue Monk',
    artist: 'Thelonious Monk',
    key: 'Bb major',
    form: '12-bar jazz-blues (head × 2)',
    tempo: '120 BPM — swing',
    amfContext:
      'Introduces jazz-blues harmony (Edim7 substitution, ii–V–I turnarounds) and Monk\'s angular melodic language built from half-step motifs.',
    notation: blueMonkNotation,
  },
  {
    slug: 'thrill-is-gone',
    title: 'The Thrill Is Gone',
    artist: 'B.B. King',
    key: 'B minor',
    form: '12-bar minor blues (2 choruses)',
    tempo: '60 BPM — slow blues',
    amfContext:
      'Develops minor-blues tonality, slow-blues phrasing, and B.B. King\'s signature string-bend vocabulary within a single-position pentatonic framework.',
    notation: thrillIsGoneNotation,
  },
]

export function getLeadSheet(slug: string): LeadSheet | undefined {
  return leadSheets.find((s) => s.slug === slug)
}
