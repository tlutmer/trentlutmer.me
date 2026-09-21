import { generateShape } from './randomShape'

// The six cells of the bento grid, with the smallest box each can ever be in --k
// units across the desktop, tablet and phone layouts (see the note in index.css):
//   wide  (a, f) : >= 600 x 347   — phones: full width at 16:10 (--k = width / 600)
//   tall  (b)    : >= 347 x 694   — two cells high on desktop/tablet, 3:4 on phones
//   large (c)    : >= 600 x 600
//   small (d, e) : >= 347 x 347
// and the smallest --k there is: on a 320px phone the bento is 208px wide, and
// --k = 208 / 600.
const CELLS = {
  a: { w: 600, h: 347 },
  b: { w: 347, h: 694 },
  c: { w: 600, h: 600 },
  d: { w: 347, h: 347 },
  e: { w: 347, h: 347 },
  f: { w: 600, h: 347 },
}
const K_MIN = 0.34

// A generated outline for each cell (a–f), following the same rules as every other
// card: 0.5rem chamfers and notch depth, one or two cut corners, at most three
// notches. Seeded, so a page keeps the same outlines on reload.
export function bentoShapes(seed) {
  return Object.fromEntries(
    Object.entries(CELLS).map(([id, box], i) => [
      id,
      generateShape(seed + i * 7919, { ...box, kMin: K_MIN }),
    ]),
  )
}
