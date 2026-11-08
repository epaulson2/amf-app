# M09 — Interval Palette illustrated cards (13 PNG)

Source ZIP `Ajourne_Interval_Palette_COMPLETE_13_Cards.zip` sha256 `1514970adbc44374a4a7831c6d916099a2a0fdde752f0426e9d4424030104812` (verified). All 13 PNG hashes, sizes and RGBA/alpha verified against the manifest (alpha min 0, max 255).

Originals are stored verbatim in `public/soundscape/resources/interval-palette/illustrated-v2/IP-XX.png`. Mapping is by canonical record id (`r.id`), not list offset.

## Accuracy audit
The generated keyboards and staves of IP-00–09 were not musically reliable: black keys were misplaced (e.g. a black key right of E4, C4 flanked by black keys on both sides in IP-07) and staff noteheads sat on wrong lines (e.g. C4 on the G line). IP-01 also read C4 + C♯4 for a minor second. Corrected derivatives (`corrected/IP-00..09.png`, built by `scripts/m09/correct.mjs`) replace only the keyboard, the staff notes/labels and, in IP-01, the spelling line: exact C4–C5 keyboard, highlighted keys in the Palette identity hue, notes on correct lines with accidentals (C4–D♭4 for the minor second, F♯4 for the tritone). Painted title, pills, ribbons and colours are untouched and alpha is identical to the source. IP-10–12 are native and verified correct.

| id | interval | semitones | px | served | original sha | served sha |
|---|---|---|---|---|---|---|
| IP-00 | Perfect Unison | 0 | 1122×1402 | corrected derivative | `42bc62064bbfaaaa…` | `47eb1092abd830a3…` |
| IP-01 | Minor Second | 1 | 1122×1402 | corrected derivative | `cd5deb386144831a…` | `6d05757c63440dc0…` |
| IP-02 | Major Second | 2 | 1122×1402 | corrected derivative | `bfd7975def26b486…` | `513fa5e947717b92…` |
| IP-03 | Minor Third | 3 | 1122×1402 | corrected derivative | `d63c2d6cb0bdecda…` | `0509504df8ea90eb…` |
| IP-04 | Major Third | 4 | 1122×1402 | corrected derivative | `55e3c7d4c45645b4…` | `fd3d0c289d04812a…` |
| IP-05 | Perfect Fourth | 5 | 1122×1402 | corrected derivative | `0d79e7b9e18bf612…` | `2ff6c0201993dc52…` |
| IP-06 | Tritone | 6 | 1122×1402 | corrected derivative | `26a23edd3e421dc3…` | `34cba6d89066593a…` |
| IP-07 | Perfect Fifth | 7 | 1122×1402 | corrected derivative | `f3157cc6d74475a6…` | `449476d0172b6a2d…` |
| IP-08 | Minor Sixth | 8 | 1122×1402 | corrected derivative | `c035e154ade90bea…` | `c9429d7e13e7d66b…` |
| IP-09 | Major Sixth | 9 | 1122×1402 | corrected derivative | `4a8049e476a98daf…` | `34e30af319e6e315…` |
| IP-10 | Minor Seventh | 10 | 2440×3060 | original verbatim | `33a6796dc8be2538…` | `33a6796dc8be2538…` |
| IP-11 | Major Seventh | 11 | 2440×3060 | original verbatim | `bf30b49c5585ddf9…` | `bf30b49c5585ddf9…` |
| IP-12 | Perfect Octave | 12 | 2440×3060 | original verbatim | `40269829897cb835…` | `40269829897cb835…` |

Known limits: the corrected line in IP-01 uses a system italic serif rather than the painted face; thin plate seams may be visible beside the replaced keyboard; IP-10–12 are visibly lighter and flatter than the painted 00–09 (a real style mismatch, reported not hidden).

Before/after screenshots: `before/`, `after/`. Checks: palette_m06 tests 6/6, `tsc` clean, `next build` OK, 13/13 images load at 320/390/768/1280/1440 with zero horizontal overflow, 13/13 full-size links return image/png, `/_next/image` serves WebP.
