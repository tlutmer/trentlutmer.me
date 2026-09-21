import { gsap } from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// The trail effect's frames, unchanged from the original. Each frame is one rectangle
// (`null` = none) and its opacity, in the original's coordinates: the rectangle ends as
// a solid 64 x 64 square at x 112..176, y 0..64. Its right edge grows out toward 176
// while its left edge sweeps in from beyond -18, and its opacity climbs to 1 — a bar
// that trails in and converges on the square. `at` is milliseconds.
const TRAIL_FRAMES = [
  { at: 0, rect: null, opacity: 0 },
  { at: 170, rect: { x: -18, y: 0, width: 158, height: 64 }, opacity: 48 / 255 },
  { at: 200, rect: { x: -18, y: 0, width: 178, height: 64 }, opacity: 48 / 255 },
  { at: 230, rect: { x: -18, y: 0, width: 185, height: 64 }, opacity: 83 / 255 },
  { at: 270, rect: { x: -18, y: 0, width: 188, height: 64 }, opacity: 117 / 255 },
  { at: 300, rect: { x: 38, y: 0, width: 134, height: 64 }, opacity: 151 / 255 },
  { at: 330, rect: { x: 98, y: 0, width: 76, height: 64 }, opacity: 185 / 255 },
  { at: 370, rect: { x: 107, y: 0, width: 67, height: 64 }, opacity: 218 / 255 },
  { at: 400, rect: { x: 109, y: 0, width: 66, height: 64 }, opacity: 1 },
  { at: 430, rect: { x: 109, y: 0, width: 67, height: 64 }, opacity: 1 },
  { at: 470, rect: { x: 110, y: 0, width: 67, height: 64 }, opacity: 1 },
  { at: 500, rect: { x: 110, y: 0, width: 67, height: 64 }, opacity: 1 },
  { at: 530, rect: { x: 111, y: 0, width: 66, height: 64 }, opacity: 1 },
  { at: 570, rect: { x: 112, y: 0, width: 64, height: 64 }, opacity: 1 },
]

const REF_X = 112 // the final square's left edge…
const REF_SIZE = 64 // …and its side: the page is the square, and the rectangles are measured against it

// The original opens with 170ms of nothing before its first rectangle. On a click that
// reads as lag, so the transition starts at its first real frame. Set to 0 to play it
// with the original's lead-in.
const LEAD_IN_MS = 170

const clamp01 = (n) => Math.min(1, Math.max(0, n))
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Plays the trail effect on the page each time the route changes: the new page is the
// "square", so it wipes in from the left, decelerating, while fading from dim to full.
// (The original draws the rectangle as a solid block that ends on a full block — over a
// page that would hide it, so here the rectangle is a window onto the page: a clip-path
// for its edges, and its opacity as the page's.) Only the outlet is wrapped — the nav
// above it stays put — and nothing plays on the first load.
export function PageTransition({ children }) {
  const location = useLocation()
  const ref = useRef(null)
  const previous = useRef(location.pathname)
  const timeline = useRef(null)

  useLayoutEffect(() => {
    if (previous.current === location.pathname) return undefined
    previous.current = location.pathname
    if (prefersReducedMotion()) return undefined

    const el = ref.current
    timeline.current?.kill()

    function applyFrame(frame) {
      if (!frame.rect) {
        gsap.set(el, { opacity: 0, clipPath: 'inset(0 100% 0 100%)' })
        return
      }
      const left = clamp01((frame.rect.x - REF_X) / REF_SIZE)
      const right = clamp01((frame.rect.x + frame.rect.width - REF_X) / REF_SIZE)
      gsap.set(el, {
        opacity: frame.opacity,
        clipPath: `inset(0 ${(1 - right) * 100}% 0 ${left * 100}%)`,
      })
    }

    // Runs in a layout effect, so the new page is hidden before it is ever painted.
    applyFrame(TRAIL_FRAMES[0])
    const tl = gsap.timeline({
      onComplete: () => gsap.set(el, { clearProps: 'opacity,clipPath' }),
    })
    for (const frame of TRAIL_FRAMES.slice(1)) {
      tl.call(applyFrame, [frame], Math.max(0, frame.at - LEAD_IN_MS) / 1000)
    }
    timeline.current = tl

    return () => {
      tl.kill()
      gsap.set(el, { clearProps: 'opacity,clipPath' })
    }
  }, [location.pathname])

  return (
    <div ref={ref} className="page-transition">
      {children}
    </div>
  )
}

export default PageTransition
