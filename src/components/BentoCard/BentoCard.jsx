import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChromaLagEffect } from '../ChromaLagEffect/ChromaLagEffect'
import { imageEffectSource, parsePosition } from '../../lib/effectSource'
import { measureOutlinePath } from '../../lib/shapePath'
import { PATH_LENGTH, playStrokeNFade } from '../../lib/strokeNFade'
import { Modal } from '../Modal/Modal'
import { usePingPong } from '../../lib/usePingPong'

gsap.registerPlugin(useGSAP)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The effect canvas fills the card's inner shape. ChromaLagEffect sets its own
// 800/320 aspect ratio and an opaque backdrop inline, so both are overridden
// here — the plain <video>/<img> underneath then shows through until the WebGL
// canvas is ready (and stays as the fallback if WebGL2 is unavailable).
//
// The canvas stops 1px short of the card's edge — where the 1px border is — because the browser
// snaps a WebGL canvas to whole pixels while a card can sit at a fractional position, and the
// canvas would otherwise paint over part of the border (see also .card__ring in index.css).
const EFFECT_STYLE = {
  position: 'absolute',
  inset: 1,
  width: 'calc(100% - 2px)',
  height: 'calc(100% - 2px)',
  aspectRatio: 'auto',
  backgroundColor: 'transparent',
}

// With `inset`, the media is a framed picture instead of filling the card: FRAMED_EFFECT_STYLE fills
// its own box (the 1px border-safe inset above is only for a canvas that reaches the card's edge).
const FRAMED_EFFECT_STYLE = { ...EFFECT_STYLE, inset: 0, width: '100%', height: '100%' }

// One outlined card. The silhouette is a clip-path from `shapeVars` (custom properties
// from generateShape(), lib/randomShape.js): `.card__frame` is the outline shape,
// `.card__inner` the same shape inset 1px, so the two layered read as a 1px stroke.
// `area` (a–f) only places the card in the bento grid.
//
// Media (both fill the shape edge to edge), and both are re-drawn on top by ChromaLagEffect
// through the CRT smear; hovering the card "locks" the picture in (activates cell 0):
// - `video`: plays natively. `pingPong` plays it forward then in reverse instead of looping.
// - `image`: a still picture (an animated GIF keeps animating). `fit` is 'cover' (default)
//   or 'contain'; `imagePosition` is the CSS object-position.
// The effect only runs while the card is near the viewport (each one is a WebGL context).
//
// Reveal: each card starts hidden and, the first time it scrolls into view, plays
// the "stroke n' fade" motion — its outline draws itself around its own
// silhouette while the card fades in (see lib/strokeNFade.js). Once only. With
// reduced motion (or no IntersectionObserver) cards are simply visible.
//
// `to` makes the whole card a router link. `body` (a string, or an array of
// paragraphs; a React node, or an array mixing strings and nodes, is rendered as it is — for a
// heading, a list or links) is text centered in the card, for text-only cards; the card can grow
// taller than its cell's shape to fit it (see the sizer below). A card with no `title`/`body` shows no
// text (and is hidden from assistive tech if it also has no media).
//
// `inset` + `ratio` frame the picture instead of filling the card with it: the media is a box as
// wide as the card less `inset` (a CSS length) on the left and right, at the picture's own
// proportions (`ratio`: [w, h]), centred vertically — the whole picture, uncropped, with the card's
// fill (--card-fill in `shapeVars`) around it. The effect runs on the picture only.
//
// Project pages use two more modes (Home and Info use neither):
// - `plain`: a plain rectangle — no generated silhouette, so `shapeVars` only needs the
//   `--card-fill` / aspect-ratio bits — and the picture is shown as it is, without the
//   ChromaLagEffect CRT smear. It fades in on scroll instead of drawing its outline.
// - `lightbox`: the card is a button that opens its image/video in the Modal, at 66% of the
//   page; clicking outside the Modal closes it.
export function BentoCard({
  area,
  title,
  video,
  pingPong = false,
  image,
  alt = '',
  fit = 'cover',
  imagePosition = 'center',
  shapeVars,
  to,
  body,
  plain = false,
  lightbox = false,
  inset,
  ratio,
  className = '',
}) {
  const effect = useRef(null)
  const [videoEl, setVideoEl] = useState(null)
  const [imgEl, setImgEl] = useState(null)
  usePingPong(videoEl, pingPong)

  const rootRef = useRef(null)
  const frameRef = useRef(null)
  const innerRef = useRef(null)
  const svgRef = useRef(null)
  const strokeRef = useRef(null)
  const canAnimate = !prefersReducedMotion && typeof IntersectionObserver !== 'undefined'
  const [inView, setInView] = useState(false)
  const [revealed, setRevealed] = useState(!canAnimate)
  const [near, setNear] = useState(!canAnimate)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Mount the effect only while the card is within about a screen of the viewport.
  useEffect(() => {
    if (!canAnimate || !rootRef.current) return undefined
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: '50% 0px',
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [canAnimate])

  // Start the reveal the first time the card is (mostly) on screen.
  useEffect(() => {
    if (revealed || inView || !rootRef.current) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [revealed, inView])

  useGSAP(
    () => {
      if (!inView || revealed) return undefined
      const outline = measureOutlinePath(rootRef.current)
      if (!outline) {
        setRevealed(true)
        return undefined
      }
      svgRef.current.setAttribute('viewBox', `0 0 ${outline.width} ${outline.height}`)
      strokeRef.current.setAttribute('d', outline.d)
      const timeline = playStrokeNFade({
        stroke: strokeRef.current,
        fill: innerRef.current,
        frame: frameRef.current,
        onComplete: () => {
          gsap.set([frameRef.current, innerRef.current], { clearProps: 'opacity' })
          setRevealed(true)
        },
      })
      return () => timeline.kill()
    },
    { dependencies: [inView], scope: rootRef },
  )

  const isGif = Boolean(image) && /\.gif(\?|$)/i.test(image)
  const imageFill = shapeVars?.['--card-fill']
  const imageSource = useMemo(
    () =>
      imgEl && !plain
        ? imageEffectSource(imgEl, { fit, position: parsePosition(imagePosition), fill: imageFill })
        : null,
    [imgEl, fit, imagePosition, imageFill, plain],
  )

  // A GIF's frames only reach the effect if it re-reads the picture as it plays.
  useEffect(() => {
    if (!isGif || !near || !imgEl || prefersReducedMotion || plain) return undefined
    const id = setInterval(() => effect.current?.refresh(), 1000 / 20)
    return () => clearInterval(id)
  }, [isGif, near, imgEl, plain])

  const hasMedia = Boolean(video || image)
  const framed = Boolean(inset && ratio)
  const Media = framed ? 'div' : Fragment
  const mediaProps = framed
    ? { className: 'card__media-box', style: { left: inset, right: inset, aspectRatio: `${ratio[0]} / ${ratio[1]}` } }
    : {}
  const effectStyle = framed ? FRAMED_EFFECT_STYLE : EFFECT_STYLE
  const hasText = Boolean(title)
  const hasBody = Boolean(body)
  const paragraphs = hasBody ? [].concat(body) : []
  const bodyContent = paragraphs.map((part, i) =>
    typeof part === 'string' ? <p key={part}>{part}</p> : <Fragment key={i}>{part}</Fragment>,
  )
  const canZoom = lightbox && hasMedia && !to
  const Root = to ? Link : canZoom ? 'button' : 'article'
  const rootProps = to
    ? { to }
    : canZoom
      ? {
          type: 'button',
          onClick: () => setLightboxOpen(true),
          'aria-haspopup': 'dialog',
          'aria-label': alt ? `View larger: ${alt}` : 'View larger',
        }
      : { 'aria-hidden': hasText || hasMedia || hasBody ? undefined : 'true' }

  return (
    <>
      <Root
        {...rootProps}
        ref={rootRef}
        data-reveal={revealed ? 'done' : 'pending'}
        className={`card${area ? ` card--${area}` : ''}${hasMedia ? ' card--media' : ''}${hasBody ? ' card--text' : ''}${to ? ' card--link' : ''}${canZoom ? ' card--zoom' : ''}${plain ? ' card--plain' : ''}${className ? ` ${className}` : ''}`}
        style={shapeVars}
        onPointerEnter={() => effect.current?.activateCell(0)}
        onPointerLeave={() => effect.current?.deactivateCell(0)}
      >
        <div className="card__frame" ref={frameRef} aria-hidden="true" />
        <div className="card__inner" ref={innerRef}>
          <Media {...mediaProps}>
            {video && (
              <video
                ref={setVideoEl}
                className="card__media"
                src={video}
                autoPlay={!prefersReducedMotion}
                muted
                loop={!pingPong}
                playsInline
                preload="metadata"
                aria-hidden="true"
                style={{ objectFit: fit }}
              />
            )}
            {video && videoEl && near && !prefersReducedMotion && !plain && (
              <ChromaLagEffect ref={effect} source={videoEl} fit={fit} style={effectStyle} />
            )}
            {image && (
              <img
                ref={setImgEl}
                className="card__media"
                src={image}
                alt={alt}
                loading={near ? 'eager' : 'lazy'}
                decoding="async"
                style={{ objectFit: fit, objectPosition: imagePosition }}
              />
            )}
            {image && imageSource && near && !prefersReducedMotion && !plain && (
              <ChromaLagEffect ref={effect} source={imageSource} style={effectStyle} />
            )}
          </Media>
          {hasBody && (
            <div className="card__body">{bodyContent}</div>
          )}
          {hasText && (
            <div className="card__text">
              {title && <h3 className="card__title">{title}</h3>}
            </div>
          )}
        </div>
        {hasBody && (
          <div className="card__sizer" aria-hidden="true">
            {bodyContent}
          </div>
        )}
        {shapeVars?.['--shape-ring'] && <div className="card__ring" aria-hidden="true" />}
        {!revealed && (
          <svg ref={svgRef} className="card__stroke" aria-hidden="true">
            <path
              ref={strokeRef}
              fill="none"
              pathLength={PATH_LENGTH}
              stroke="currentColor"
              strokeWidth={1}
              strokeLinejoin="miter"
              style={{ opacity: 0 }}
            />
          </svg>
        )}
      </Root>
      {/* A sibling of Root, not a child: a portal's React events still bubble through the tree, so
          inside the button a click on the modal would re-trigger the card's own onClick. */}
      {canZoom && (
        <Modal
          size="lightbox"
          open={lightboxOpen}
          title={alt || (image ? 'Image' : 'Video')}
          onClose={() => setLightboxOpen(false)}
        >
          {image ? (
            <img src={image} alt={alt} className="h-full w-full object-contain" />
          ) : (
            <video
              src={video}
              className="h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default BentoCard
