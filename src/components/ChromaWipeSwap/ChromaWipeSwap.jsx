import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { CHROMA_FRAMES, CHROMA_LEAD_IN_MS } from '../../lib/chromaWipeFrames'

gsap.registerPlugin(useGSAP)

// The 3 x 3 cells' timing is shared with every other chroma wipe (lib/chromaWipeFrames.js):
// each cell appears at its own frame and from then on steps through a 16-entry palette
// until it reaches the last, `currentColor`. A cell's `state` is its palette index, or -1
// while it hasn't appeared yet.
//
// The original steps through a 16-colour spectrum. Here the 15 steps cycle through cyan, magenta and
// yellow (site-nav.css maps `data-tone`, in that order), five times over, so each cell flickers through
// the three theme colours before settling on the text's own colour. Still 16 entries, so the frame timings
// are untouched.
// A palette entry is a `data-tone` (site-nav.css maps it to the colour); the last is the text's own.
const ACCENTS = ['red', 'green', 'blue'] // tone names only; site-nav.css maps them to cyan, magenta and yellow
const PALETTE = [...Array.from({ length: 15 }, (_, i) => ACCENTS[i % ACCENTS.length]), 'done']
const FRAMES = CHROMA_FRAMES
const LEAD_IN_MS = CHROMA_LEAD_IN_MS

const GRID = 3
const CELLS = GRID * GRID

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Swaps `text` for `alt` while hovered, through the chroma wipe.
//
// The original paints its 3 x 3 cells as solid colour blocks that end on a full
// block — over text that would hide it, so here each cell is a small window instead:
// as a cell appears, the incoming text shows through it (each cell's clip-path is a fixed
// ninth of the box, `data-cell` in site-nav.css), tinted with that cell's current palette
// colour (`data-tone`), which then walks the spectrum and settles on the text's normal
// colour. Nothing is written to a `style` attribute: the frames only set data attributes. Cells not yet appeared still show the outgoing text, so
// the swap sweeps across the name cell by cell in the original's order. The grid is
// laid over the text's own box (each cell a ninth of it), so it scales with the text.
//
// Each language has a full copy — what's left once the motion ends — plus nine
// clipped cell copies. All are decorative; the accessible name is a single
// visually-hidden `text`.
// `text` and `alt` can be elements (the nav logo passes the same mark for both, so it glitches in place);
// `label` is then the accessible name.
// `autoMs` runs it on a timer too: every that many ms it wipes to the other text (and back the next tick),
// unless the pointer is over it or the person prefers reduced motion.
export function ChromaWipeSwap({ text, alt, label, altLang = 'ko', autoMs = 0, className = '' }) {
  const rootRef = useRef(null)
  const layers = useRef({ base: {}, cells: { en: [], alt: [] } })
  const target = useRef('en')
  const timeline = useRef(null)

  const { contextSafe } = useGSAP({ scope: rootRef })

  // The resting state: which language shows is the root's data-lang (the CSS in site-nav.css hides
  // the other one); a wipe in progress is the root's data-wiping plus each cell's data-show/-tone.
  function showOnly(lang) {
    const { cells } = layers.current
    const root = rootRef.current
    root.dataset.lang = lang
    root.dataset.size = lang
    delete root.dataset.wiping
    for (const el of [...cells.en, ...cells.alt]) {
      if (!el) continue
      delete el.dataset.show
      delete el.dataset.tone
    }
  }

  const swapTo = contextSafe((next) => {
    if (target.current === next) return
    const outgoing = target.current
    target.current = next
    timeline.current?.kill()

    if (prefersReducedMotion()) {
      showOnly(next)
      return
    }

    const { cells } = layers.current

    // Start from the outgoing text in full, then hand it over to per-cell copies.
    showOnly(outgoing)
    rootRef.current.dataset.wiping = ''
    rootRef.current.dataset.size = next // the box takes the incoming text's width, so what follows it moves along
    for (let i = 0; i < CELLS; i++) cells[outgoing][i].dataset.show = ''

    function applyFrame(frame) {
      for (let i = 0; i < CELLS; i++) {
        const state = frame.states[i]
        const incoming = cells[next][i]
        if (state < 0) {
          cells[outgoing][i].dataset.show = ''
          delete incoming.dataset.show
          delete incoming.dataset.tone
        } else {
          delete cells[outgoing][i].dataset.show
          incoming.dataset.show = ''
          incoming.dataset.tone = PALETTE[state]
        }
      }
    }

    const tl = gsap.timeline({ onComplete: () => showOnly(next) })
    for (const frame of FRAMES) {
      tl.call(applyFrame, [frame], Math.max(0, frame.at - LEAD_IN_MS) / 1000)
    }
    timeline.current = tl
  })

  const hovered = useRef(false)
  useEffect(() => {
    if (!autoMs || prefersReducedMotion()) return undefined
    const id = setInterval(() => {
      if (hovered.current) return
      swapTo(target.current === 'en' ? 'alt' : 'en')
    }, autoMs)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMs])

  const cellList = (lang, value) =>
    Array.from({ length: CELLS }, (_, i) => (
      <span
        key={i}
        ref={(el) => { layers.current.cells[lang][i] = el }}
        className="wipe-swap__cell"
        data-cell={i}
        lang={lang === 'alt' ? altLang : undefined}
      >
        {value}
      </span>
    ))

  return (
    <span
      ref={rootRef}
      data-lang="en"
      data-size="en"
      className={`wipe-swap ${className}`}
      onPointerEnter={() => { hovered.current = true; swapTo('alt') }}
      onPointerLeave={() => { hovered.current = false; swapTo('en') }}
    >
      <span className="sr-only">{label ?? text}</span>
      <span className="wipe-swap__visual" aria-hidden="true">
        <span ref={(el) => { layers.current.base.en = el }} className="wipe-swap__base">
          {text}
        </span>
        <span
          ref={(el) => { layers.current.base.alt = el }}
          className="wipe-swap__base wipe-swap__base--alt"
          lang={altLang}
        >
          {alt}
        </span>
        {cellList('en', text)}
        {cellList('alt', alt)}
      </span>
    </span>
  )
}

export default ChromaWipeSwap
