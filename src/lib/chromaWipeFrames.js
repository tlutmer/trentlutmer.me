// The chroma wipe's timing, unchanged from the original: a 3 x 3 grid of cells (row-major).
// Each cell appears at its own source frame (APPEARANCE_FRAMES) and from then on steps
// through a 16-entry palette one entry per source frame until it reaches the last.
// A frame's `states` are the cells' palette indices (-1 = not appeared yet), `at` is
// milliseconds. Shared by everything that plays the effect.
const APPEARANCE_FRAMES = [19, 22, 24, 17, 20, 23, 16, 18, 21]
const SOURCE_FRAMES = [
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]
const FRAME_TIMES = [
  500, 530, 570, 600, 630, 670, 700, 730, 770, 800, 830, 870, 900, 930, 970, 1000, 1030, 1070, 1100,
  1130, 1170, 1200, 1230, 1270,
]

export const CHROMA_FRAMES = SOURCE_FRAMES.map((sourceFrame, i) => ({
  at: FRAME_TIMES[i],
  states: APPEARANCE_FRAMES.map((appearance) =>
    sourceFrame < appearance ? -1 : Math.min(sourceFrame - appearance, 15),
  ),
}))

// The original's timeline opens with 500ms of nothing before its first cell. On a hover or
// a click that reads as lag, so the motion starts at its first real frame. Set to 0 to
// play it with the original's lead-in.
export const CHROMA_LEAD_IN_MS = 500

// The 16-step spectrum. The original walks dark red -> orange -> yellow -> green -> cyan ->
// blue -> purple -> magenta -> pink; here each step is the nearest Kelex Design System token
// on that path (tokens.css), so the effect uses Kelex colours only. The last entry is the
// text/foreground colour.
export const CHROMA_SPECTRUM = [
  'var(--red-900)',
  'var(--red-700)',
  'var(--red-300)',
  'var(--orange-400)',
  'var(--orange-300)',
  'var(--yellow-300)',
  'var(--yellow-200)',
  'var(--green-200)',
  'var(--green-300)',
  'var(--cyan-300)',
  'var(--blue-300)',
  'var(--purple-300)',
  'var(--magenta-400)',
  'var(--magenta-300)',
  'var(--magenta-200)',
  'currentColor',
]
