
// Supplied Batch 2 artwork (ChatGPT-authored review candidates, not approved final art). Original PNGs are served unchanged:
// no recolouring, no opaque backing, transparency preserved. Phone PNG below the breakpoint, desktop PNG above, one <picture>.
// Own instrument only: nothing here plays sound.
export type ArtStem =
  | 'W2-2A-P01_three_changes_practice' | 'W2-2B-01_three_motion_families' | 'W2-2B-02_contrary_tritone' | 'W2-2B-03_similar_minor_third'
  | 'W2-2B-04a_only_upper_rises' | 'W2-2B-04b_only_lower_falls' | 'W2-2B-04c_only_lower_rises' | 'W2-2B-04d_both_move_apart' | 'W2-2B-04e_both_rise'
  | 'W2-2B-P01_two_voice_conversation_practice'

// [desktop w, h, phone w, h] read from the PNG headers (IHDR) of the pulled files.
const DIMS: Record<ArtStem, [number, number, number, number]> = {
  'W2-2A-P01_three_changes_practice': [1160, 880, 720, 1200],
  'W2-2B-01_three_motion_families': [1340, 410, 740, 1210],
  'W2-2B-02_contrary_tritone': [1260, 500, 720, 855],
  'W2-2B-03_similar_minor_third': [1260, 500, 720, 855],
  'W2-2B-04a_only_upper_rises': [1250, 390, 720, 820],
  'W2-2B-04b_only_lower_falls': [1250, 390, 720, 820],
  'W2-2B-04c_only_lower_rises': [1250, 390, 720, 820],
  'W2-2B-04d_both_move_apart': [1250, 390, 720, 820],
  'W2-2B-04e_both_rise': [1250, 390, 720, 820],
  'W2-2B-P01_two_voice_conversation_practice': [1250, 800, 720, 1040],
}
export const ART_BREAKPOINT = 700

export function Art({ stem, alt, lazy = true }: { stem: ArtStem; alt: string; lazy?: boolean }) {
  const [dw, dh, pw, ph] = DIMS[stem]
  const dir = `/w2/batch2/${stem}`
  return (
    <picture className="w2-art-pic">
      <source media={`(max-width: ${ART_BREAKPOINT}px)`} srcSet={`${dir}.phone.png`} width={pw} height={ph} />
      <img src={`${dir}.desktop.png`} width={dw} height={dh} alt={alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" data-w2-art={stem} />
    </picture>
  )
}
