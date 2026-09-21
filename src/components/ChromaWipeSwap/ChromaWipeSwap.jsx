import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { CHROMA_FRAMES, CHROMA_LEAD_IN_MS } from '../../lib/chromaWipeFrames'

gsap.registerPlugin(useGSAP)

// The 3 x 3 cells' timing is shared with every other chroma wipe (lib/chromaWipeFrames.js):
// each cell appears at its own frame and from then on steps through a 16-entry palette
// until it reaches the last, `currentColor`. A cell's `state` is its palette index, or -1
// while it hasn't appeared yet.
//
// The original steps through a 16-colour spectrum. Here the 15 steps are Kelex's red-300,
// green-300 and blue-300 cycling — five times over — so each cell flickers red / green /
// blue before settling on the text's own colour. Still 16 entries, so the frame timings
// are untouched.
const ACCENTS = ['var(--red-300)', 'var(--green-300)', 'var(--blue-300)']
const PALETTE = [...Array.from({ length: 15 }, (_, i) => ACCENTS[i % ACCENTS.length]), 'currentColor']
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
// as a cell appears, the incoming text shows through it (via clip-path), tinted with
// that cell's current palette colour, which then walks the spectrum and settles on
// the text's normal colour. Cells not yet appeared still show the outgoing text, so
// the swap sweeps across the name cell by cell in the original's order. The grid is
// laid over the text's own box (each cell a ninth of it), so it scales with the text.
//
// Each language has a full copy — what's left once the motion ends — plus nine
// clipped cell copies. All are decorative; the accessible name is a single
// visually-hidden `text`.
export function ChromaWipeSwap({ text, alt, altLang = 'ko', className = '' }) {
  const rootRef = useRef(null)
  const layers = useRef({ base: {}, cells: { en: [], alt: [] } })
  const target = useRef('en')
  const timeline = useRef(null)

  const { contextSafe } = useGSAP({ scope: rootRef })

  const set = (el, vars) => el && gsap.set(el, vars)

  function showOnly(lang) {
    const { base, cells } = layers.current
    set(base.en, { autoAlpha: lang === 'en' ? 1 : 0 })
    set(base.alt, { autoAlpha: lang === 'alt' ? 1 : 0 })
    for (const list of Object.values(cells)) list.forEach((el) => set(el, { display: 'none' }))
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

    const { base, cells } = layers.current
    const box = rootRef.current.getBoundingClientRect()
    const cellW = box.width / GRID
    const cellH = box.height / GRID

    // Each cell's window onto the text: the ninth of the box it covers.
    const clip = (i) => {
      const col = i % GRID
      const row = Math.floor(i / GRID)
      const top = row * cellH
      const left = col * cellW
      return `inset(${top}px ${box.width - left - cellW}px ${box.height - top - cellH}px ${left}px)`
    }

    // Start from the outgoing text in full, then hand it over to per-cell copies.
    showOnly(outgoing)
    set(base[outgoing], { autoAlpha: 0 })
    for (let i = 0; i < CELLS; i++) {
      set(cells[outgoing][i], { display: 'block', clipPath: clip(i) })
      set(cells[next][i], { display: 'none', clipPath: clip(i) })
    }

    function applyFrame(frame) {
      for (let i = 0; i < CELLS; i++) {
        const state = frame.states[i]
        const incoming = cells[next][i]
        if (state < 0) {
          set(cells[outgoing][i], { display: 'block' })
          set(incoming, { display: 'none' })
        } else {
          set(cells[outgoing][i], { display: 'none' })
          set(incoming, { display: 'block' })
          incoming.style.color = PALETTE[state]
        }
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        cells[next].forEach((el) => { if (el) el.style.color = '' })
        showOnly(next)
      },
    })
    for (const frame of FRAMES) {
      tl.call(applyFrame, [frame], Math.max(0, frame.at - LEAD_IN_MS) / 1000)
    }
    timeline.current = tl
  })

  const cellList = (lang, value) =>
    Array.from({ length: CELLS }, (_, i) => (
      <span
        key={i}
        ref={(el) => { layers.current.cells[lang][i] = el }}
        className="wipe-swap__cell"
        lang={lang === 'alt' ? altLang : undefined}
      >
        {value}
      </span>
    ))

  return (
    <span
      ref={rootRef}
      className={`wipe-swap ${className}`}
      onPointerEnter={() => swapTo('alt')}
      onPointerLeave={() => swapTo('en')}
    >
      <span className="sr-only">{text}</span>
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
