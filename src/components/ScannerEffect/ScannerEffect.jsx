import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap } from 'gsap'

gsap.registerPlugin(useGSAP)

// Six bands across the whole page, each stepping through 0 / 0.3 / 0.6 / 1 opacity from left to right.
// At the peak the page is covered and `onCovered` runs (the theme changes underneath). Then the bands
// fade out left to right in a gradient tail, so a little colour lingers as the theme settles. `onDone`
// runs once the last band has faded. Timings in ms.
const RAMP_UP = [
  { at: 0, opacities: [0, 0, 0, 0, 0, 0] },
  { at: 130, opacities: [0.3, 0, 0, 0, 0, 0] },
  { at: 230, opacities: [0.3, 0.3, 0, 0, 0, 0] },
  { at: 330, opacities: [0.6, 0.3, 0.3, 0, 0, 0] },
  { at: 430, opacities: [0.6, 0.6, 0.3, 0.3, 0, 0] },
  { at: 530, opacities: [1, 0.6, 0.6, 0.3, 0.3, 0] },
  { at: 630, opacities: [1, 1, 0.6, 0.6, 0.3, 0.3] },
  { at: 730, opacities: [1, 1, 1, 0.6, 0.6, 0.3] },
  { at: 830, opacities: [1, 1, 1, 1, 0.6, 0.6] },
  { at: 930, opacities: [1, 1, 1, 1, 1, 0.6] },
  { at: 1030, opacities: [1, 1, 1, 1, 1, 1] },
]
const PEAK = RAMP_UP[RAMP_UP.length - 1].at
// The tail: each band fades to nothing, staggered left to right.
const TAIL_FADE = 0.5 // s, each band's fade
const TAIL_STAGGER = 0.06 // s between bands

// The theme colours from tokens.css (yellow-300, magenta-300, cyan-300) and black, cycled left to right.
const BAND_COLORS = ['#ffea00', '#ff00ff', '#00fff2', '#000000', '#ffea00', '#ff00ff']

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ScannerEffect({ onCovered, onDone }) {
  const bandsRef = useRef([])

  useGSAP(() => {
    const bands = bandsRef.current

    function applyFrame(frame) {
      for (let index = 0; index < 6; index++) {
        const band = bands[index]
        if (!band) continue
        const opacity = frame.opacities[index]
        gsap.set(band, { display: opacity === 0 ? 'none' : 'block', opacity })
      }
    }

    if (prefersReducedMotion()) {
      onCovered?.()
      onDone?.()
      return
    }

    const timeline = gsap.timeline({ paused: true, onComplete: () => onDone?.() })
    for (const frame of RAMP_UP) {
      timeline.call(applyFrame, [frame], frame.at / 1000)
    }
    timeline.call(() => onCovered?.(), [], PEAK / 1000)
    // The gradient tail: each band fades from full to nothing, a little after the one before it.
    bands.forEach((band, i) => {
      if (!band) return
      timeline.to(band, { opacity: 0, duration: TAIL_FADE, ease: 'power1.in' }, PEAK / 1000 + i * TAIL_STAGGER)
    })
    timeline.set(bands.filter(Boolean), { display: 'none' }, PEAK / 1000 + (bands.length - 1) * TAIL_STAGGER + TAIL_FADE)
    applyFrame(RAMP_UP[0])
    timeline.restart(true, false)

    return () => {
      timeline.kill()
    }
  })

  return (
    <svg
      aria-hidden="true"
      className="scanner-overlay"
      preserveAspectRatio="none"
      viewBox="0 0 6 1"
      shapeRendering="crispEdges"
    >
      <g>
        {BAND_COLORS.map((fill, bandIndex) => (
          <rect
            key={bandIndex}
            data-scanner-band=""
            fill={fill}
            height={1}
            opacity={0}
            ref={(element) => {
              bandsRef.current[bandIndex] = element
            }}
            style={{ display: 'none' }}
            width={1}
            x={bandIndex}
            y={0}
          />
        ))}
      </g>
    </svg>
  )
}

export default ScannerEffect
