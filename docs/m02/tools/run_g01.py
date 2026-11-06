import gen
COMMON = ("Use the attached reference image ONLY for its art direction: luminous, translucent watercolor-and-light rendering, glowing concentric rings, overlapping petal and lens forms, "
 "iridescent glassy depth, soft grain. Palette: warm amber and gold, soft teal, soft lavender, a little rose. "
 "The artwork sits isolated on a PURE WHITE (#ffffff) background with generous empty white margins on every side, and its outer edges dissolve smoothly and softly into the white. "
 "STRICTLY NO text, NO letters, NO numbers, NO musical notation, NO piano keys, NO borders, NO frame, NO card, NO UI, NO cast shadow, NO paper texture, NO background tint.")
P = ("A single circular concentric field, perfectly centered: a radiant warm amber and gold glowing core at the exact center, surrounded by five or six expanding translucent rings "
 "in alternating teal and lavender, with eight soft overlapping petal-shaped lens forms radiating outward from the core like a luminous flower. "
 "The center is clearly the brightest and most important point; the surrounding rings are calmer and cooler. Leave the ring zone at about two thirds radius visually uncluttered. "
 "Do not draw any small orbs, dots, or circles with letters; only the field itself. ")
gen.generate('G01-B-v1', P + COMMON, gen.W + '/public/soundscape/m02/raw/G01-B-v1.png', aspect='1:1')
