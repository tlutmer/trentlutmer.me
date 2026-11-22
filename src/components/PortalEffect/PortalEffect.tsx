'use client'

// Requires: react, gsap, @gsap/react

import { useGSAP } from '@gsap/react'
import { useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'

gsap.registerPlugin(useGSAP)

export type PortalEffectProps = {
  className?: string
  style?: CSSProperties
}

type PortalOpacity = 0 | 0.05 | 1

type PortalOpacityKeyframe = {
  at: number
  opacity: PortalOpacity
}

export const portalSizes = [20, 30, 36, 40, 44, 48, 52, 54, 56, 58, 60, 60, 62, 62, 64] as const
const portalOuterTimes = [
  430, 470, 500, 530, 570, 600, 630, 670, 700, 730, 770, 800, 830, 870, 900,
] as const
export const portalMiddleTimes = [
  700, 730, 770, 800, 830, 870, 900, 930, 970, 1000, 1030, 1070, 1100, 1130, 1170,
] as const
const portalInnerTimes = [
  970, 1000, 1030, 1070, 1100, 1130, 1170, 1200, 1230, 1270, 1300, 1330, 1370, 1400, 1430,
] as const
const portalInnerOpacityKeyframes: readonly PortalOpacityKeyframe[] = [
  { at: 930, opacity: 0 },
  { at: 970, opacity: 0.05 },
  { at: 1600, opacity: 1 },
]

function portalGeometry(size: number): {
  x: number
  y: number
  width: number
  height: number
} {
  return {
    x: 144 - size / 2,
    y: 32 - size / 2,
    width: size,
    height: size,
  }
}

export function PortalEffect({ className, style }: PortalEffectProps) {
  const outerRef = useRef<SVGRectElement>(null)
  const middleRef = useRef<SVGRectElement>(null)
  const innerRef = useRef<SVGRectElement>(null)

  useGSAP(() => {
    const outerLayer = outerRef.current
    const middleLayer = middleRef.current
    const innerLayer = innerRef.current

    if (!outerLayer || !middleLayer || !innerLayer) {
      return
    }

    const firstGeometry = portalGeometry(portalSizes[0])
    const settledGeometry = portalGeometry(portalSizes.at(-1)!)
    const firstVisibleInnerOpacity = portalInnerOpacityKeyframes[1]!
    const finalInnerOpacity = portalInnerOpacityKeyframes.at(-1)!
    const layerTimelines = [
      { element: outerLayer, times: portalOuterTimes, opacity: 1 },
      { element: middleLayer, times: portalMiddleTimes, opacity: 1 },
      {
        element: innerLayer,
        times: portalInnerTimes,
        opacity: firstVisibleInnerOpacity.opacity,
      },
    ]
    const timeline = gsap.timeline({ paused: true })

    layerTimelines.forEach(({ element, times, opacity }) => {
      timeline.set(
        element,
        {
          attr: firstGeometry,
          display: '',
          opacity,
        },
        times[0] / 1000,
      )

      for (let sampleIndex = 1; sampleIndex < portalSizes.length; sampleIndex += 1) {
        const previousAt = times[sampleIndex - 1]!
        const at = times[sampleIndex]!

        timeline.to(
          element,
          {
            attr: portalGeometry(portalSizes[sampleIndex]!),
            duration: (at - previousAt) / 1000,
            ease: 'none',
          },
          previousAt / 1000,
        )
      }
    })

    timeline.set(
      innerLayer,
      { opacity: portalInnerOpacityKeyframes[0]!.opacity },
      portalInnerOpacityKeyframes[0]!.at / 1000,
    )
    timeline.set(
      innerLayer,
      { opacity: firstVisibleInnerOpacity.opacity },
      firstVisibleInnerOpacity.at / 1000,
    )
    timeline.to(
      innerLayer,
      {
        opacity: finalInnerOpacity.opacity,
        duration: (finalInnerOpacity.at - firstVisibleInnerOpacity.at) / 1000,
        ease: 'none',
      },
      firstVisibleInnerOpacity.at / 1000,
    )

    function renderStart(): void {
      const layers = [outerLayer, middleLayer, innerLayer]

      layers.forEach((layer) => {
        gsap.set(layer, {
          attr: settledGeometry,
          display: 'none',
          opacity: 0,
        })
      })
    }

    timeline.pause(0, true)
    renderStart()
    timeline.restart(true, false)

    return () => {
      timeline.kill()
    }
  })

  return (
    <svg
      aria-hidden="true"
      className={className}
      height={64}
      shapeRendering="crispEdges"
      style={{ color: '#c9c9cb', display: 'block', ...style }}
      viewBox="0 0 288 64"
      width={288}
    >
      <rect
        data-portal-layer="outer"
        fill="#303030"
        height={64}
        opacity={1}
        ref={outerRef}
        style={{ display: 'none' }}
        width={64}
        x={112}
        y={0}
      />
      <rect
        data-portal-layer="middle"
        fill="#6e6e6e"
        height={64}
        opacity={1}
        ref={middleRef}
        style={{ display: 'none' }}
        width={64}
        x={112}
        y={0}
      />
      <rect
        data-portal-layer="inner"
        fill="currentColor"
        height={64}
        opacity={1}
        ref={innerRef}
        style={{ display: 'none' }}
        width={64}
        x={112}
        y={0}
      />
    </svg>
  )
}
