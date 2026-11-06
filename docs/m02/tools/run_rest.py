import gen
from run_g01 import COMMON
R = gen.W + '/public/soundscape/m02/raw/'
gen.generate('G01-B-v2', "A single luminous concentric field, perfectly centered, painted like glowing watercolor and light: a bright warm amber and gold core at the exact center that bleeds a soft radiant glow outward, "
  "surrounded by organic, slightly irregular, translucent rings and petal-like ripples in iridescent teal, lavender and rose that overlap and blend into one another with visible watercolor pigment variation and soft light flares. "
  "More luminous, more organic and more hand-painted than a geometric diagram; the rings are soft and uneven, not perfectly mechanical. The center remains the clear brightest focal point, and the outer area fades into pure white. "
  "Do not draw any small orbs, dots, or circles with letters; only the field itself. " + COMMON, R + 'G01-B-v2.png', aspect='1:1')
gen.generate('G03-B-v1', "Two large translucent circular fields of light placed side by side on a horizontal axis, overlapping in the middle. The LEFT field is warm: amber, gold and peach watercolor with fine concentric ripple lines. "
  "The RIGHT field is cool: teal and lavender watercolor with its own fine concentric ripple lines. Where the two fields overlap there is a clearly distinct, softly glowing lens-shaped region of blended luminous white-gold light, "
  "visibly different in color from either field alone. The overlap lens must be roughly one quarter of each circle's width, with calm uncluttered space inside it and inside each exclusive crescent (so labels can be placed later). "
  "The two fields look like two different worlds that share one region. Organic soft feathered edges that dissolve into the white. Wide horizontal composition. " + COMMON, R + 'G03-B-v1.png', aspect='16:9')
gen.generate('G02-ACCENT-v1', "A long, narrow horizontal band of soft light accents, to sit BEHIND a keyboard: gentle sweeping luminous ribbons, delicate thin arcs and a scattering of tiny glowing motes in warm amber, lavender and teal, "
  "denser at the middle and dissolving completely into white toward the left and right ends and toward the top and bottom edges. Airy and tactile, like light through watercolor paper; nothing solid or heavy in the center so it never hides objects placed on it. " + COMMON, R + 'G02-ACCENT-v1.png', aspect='21:9')
gen.generate('A-CORNER-v1', "A page-corner atmospheric flourish for a light website background: flowing organic watercolor ribbons, soft ripple arcs and gentle concentric echoes sweeping in from the TOP-LEFT corner only, in peach, lavender, teal and a touch of amber, "
  "fading out softly toward the center, with the large remaining area of the canvas (at least 60 percent) left pure empty white. Purely decorative atmosphere, carrying no meaning. " + COMMON, R + 'A-CORNER-v1.png', aspect='16:9')
