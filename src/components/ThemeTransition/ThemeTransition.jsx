import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { CHROMA_FRAMES, CHROMA_LEAD_IN_MS, CHROMA_SPECTRUM } from '../../lib/chromaWipeFrames'
import { setThemeRunner } from '../../lib/themeSwitch'

gsap.registerPlugin(useGSAP)

const GRID = 3
const CELLS = GRID * GRID

// The first frame where every cell has appeared: the page is fully covered, so this is
// when the theme changes underneath.
const COVERED_FRAME = CHROMA_FRAMES.find((frame) => frame.states.every((s) => s >= 0))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Plays the chroma wipe over the whole page when the colour theme changes. The page is
// split into a 3 x 3 grid of cells (each a ninth of the viewport); each cell appears at its
// own moment as a solid block, steps through the 16-step spectrum (Kelex tokens, see
// lib/chromaWipeFrames.js), and then
// clears. The theme flips once every cell is showing, so the old theme is what you see in
// cells that haven't appeared yet and the new one is what's revealed as cells clear.
// Cells are solid blocks, as in the original; the last spectrum entry (the text colour)
// is where a cell clears instead of staying on screen.
export function ThemeTransition({ children }) {
  const rootRef = useRef(null)
  const cells = useRef([])

  useGSAP(
    () => {
      let timeline = null
      const hideAll = () => cells.current.forEach((el) => el && (el.style.display = 'none'))

      function applyFrame(frame) {
        for (let i = 0; i < CELLS; i++) {
          const state = frame.states[i]
          const el = cells.current[i]
          if (!el) continue
          if (state < 0 || state >= CHROMA_SPECTRUM.length - 1) {
            el.style.display = 'none'
          } else {
            el.style.display = 'block'
            el.style.backgroundColor = CHROMA_SPECTRUM[state]
          }
        }
      }

      setThemeRunner((apply) => {
        timeline?.kill()
        hideAll()
        if (prefersReducedMotion()) {
          apply()
          return
        }
        timeline = gsap.timeline({ onComplete: hideAll })
        for (const frame of CHROMA_FRAMES) {
          timeline.call(applyFrame, [frame], Math.max(0, frame.at - CHROMA_LEAD_IN_MS) / 1000)
        }
        timeline.call(apply, [], Math.max(0, COVERED_FRAME.at - CHROMA_LEAD_IN_MS) / 1000)
      })

      return () => {
        setThemeRunner(null)
        timeline?.kill()
      }
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="theme-transition">
      {children}
      <div className="theme-transition__cells" aria-hidden="true">
        {Array.from({ length: CELLS }, (_, i) => (
          <span key={i} ref={(el) => { cells.current[i] = el }} className="theme-transition__cell" />
        ))}
      </div>
    </div>
  )
}

export default ThemeTransition
