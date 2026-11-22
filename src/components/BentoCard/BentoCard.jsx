import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChromaLagEffect } from '../ChromaLagEffect/ChromaLagEffect'
import { imageEffectSource, parsePosition } from '../../lib/effectSource'
import { measureOutlinePath } from '../../lib/shapePath'
import { Modal } from '../Modal/Modal'
import { usePingPong } from '../../lib/usePingPong'
import { useKeepPlaying } from '../../lib/useKeepPlaying'
import { videoFor } from '../../lib/gifVideo'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The classes that place a picture in its card (`.card__media--pos-*` in index.css) — the
// object-positions the site uses; anything else falls back to the centre.
const POSITION_CLASSES = {
  '50% 20%': 'card__media--pos-50-20',
  '50% 35%': 'card__media--pos-50-35',
  '50% 91%': 'card__media--pos-50-91',
  '42% 40%': 'card__media--pos-42-40',
}

// The drawn outline is normalised to this length (its `pathLength`), so the CSS keyframes that draw it
// (card-reveal-draw in index.css) fit an outline of any size.
const PATH_LENGTH = 256

// How long the reveal runs, in ms (its CSS animations are 1070ms); a fallback in case the animation's
// end event never arrives (a hidden tab, say).
const REVEAL_MS = 1500

// One outlined card. Its silhouette is a clip-path from the outline named by `shape` — a class in
// shapes.css (`.shape-work-a`), generated from lib/randomShape.js by scripts/generate-shapes.mjs:
// `.card__frame` is the outline shape, `.card__inner` the same shape inset 1px, so the two layered
// read as a 1px stroke. `area` (a–h) only places the card in the bento grid.
//
// Media (both fill the shape edge to edge), and both are re-drawn on top by ChromaLagEffect
// through the CRT smear; hovering the card "locks" the picture in (activates cell 0):
// - `video`: plays natively. `pingPong` plays it forward then in reverse instead of looping.
// - `image`: a still picture (an animated GIF keeps animating). `fit` is 'cover' (default)
//   or 'contain'; `imagePosition` is where it sits (see POSITION_CLASSES).
// The effect only runs while the card is near the viewport (each one is a WebGL context).
//
// Reveal: each card starts hidden and, the first time it scrolls into view, plays
// the "stroke n' fade" motion — its outline draws itself around its own
// silhouette while the card fades in. Once only. It is all CSS, keyed on the card's data-reveal
// (pending → revealing → done); the outline's path is measured here (lib/shapePath.js). With
// reduced motion (or no IntersectionObserver) cards are simply visible.
//
// `to` makes the whole card a router link (its picture, if any, is then decorative: the title is
// the link's name). `body` (a string, or an array of paragraphs; a React node, or an array mixing
// strings and nodes, is rendered as it is — for a heading, a list or links) is text centered in
// the card, for text-only cards; the card can grow taller than its cell's shape to fit it (see the
// sizer below). A card with no `title`/`body` shows no text (and is hidden from assistive tech if
// it also has no media).
//
// `fill` swaps the card's fill for 'logo' (a literal that matches the Kelex logo image) or 'panel'
// (grey-700) — see .card--fill-* in index.css.
//
// `framed` + `size` frame the picture instead of filling the card with it: the media is a box as
// wide as the card less 1rem on each side, at the picture's own proportions (`size`: [w, h], in
// pixels of the file), centred vertically — the whole picture, uncropped, with the card's fill
// around it. The effect runs on the picture only.
//
// Project pages use two more modes (Home and Info use neither):
// - `plain`: a plain rectangle — no generated silhouette — and the picture is shown as it is,
//   without the ChromaLagEffect CRT smear. It fades in on scroll instead of drawing its outline.
//   Give it `size` ([w, h]) and the card takes its picture's own proportions (the picture's width
//   and height attributes size it); otherwise it is 16:9.
// - `lightbox`: the card is a button that opens its image/video in the Modal, at 80% of the
//   page; clicking outside the Modal closes it.
//
// `crt` (default on) is the ChromaLagEffect smear itself — off shows the picture or video as it
// is, still inside its generated silhouette with the hover-lock and reveal draw untouched.
export function BentoCard({
  area,
  shape,
  title,
  tag,
  video: videoProp,
  pingPong = false,
  image: imageProp,
  alt = '',
  fit = 'cover',
  imagePosition = 'center',
  fill,
  to,
  body,
  plain = false,
  lightbox = false,
  framed = false,
  crt = true,
  size,
  className = '',
}) {
  // A GIF that now ships as an MP4 plays through the video path below, always on and looping.
  const converted = videoFor(imageProp)
  const image = converted ? undefined : imageProp
  const video = videoProp ?? converted
  const effect = useRef(null)
  const [videoEl, setVideoEl] = useState(null)
  useKeepPlaying(converted ? videoEl : null)
  const [imgEl, setImgEl] = useState(null)
  usePingPong(videoEl, pingPong)

  const rootRef = useRef(null)
  const frameRef = useRef(null)
  const innerRef = useRef(null)
  const svgRef = useRef(null)
  const strokeRef = useRef(null)
  const canAnimate = !prefersReducedMotion && typeof IntersectionObserver !== 'undefined'
  const [inView, setInView] = useState(false)
  const [phase, setPhase] = useState(canAnimate ? 'pending' : 'done')
  const revealed = phase === 'done'
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

  // Start the reveal the first time the card is (mostly) on screen: measure its outline, then let the
  // CSS play it. A card with no outline to draw (a plain one) is simply shown.
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

  useEffect(() => {
    if (!inView || phase !== 'pending') return
    const outline = measureOutlinePath(rootRef.current)
    if (!outline) {
      setPhase('done')
      return
    }
    svgRef.current.setAttribute('viewBox', `0 0 ${outline.width} ${outline.height}`)
    strokeRef.current.setAttribute('d', outline.d)
    setPhase('revealing')
  }, [inView, phase])

  useEffect(() => {
    if (phase !== 'revealing') return undefined
    const id = setTimeout(() => setPhase('done'), REVEAL_MS)
    return () => clearTimeout(id)
  }, [phase])

  const isGif = Boolean(image) && /\.gif(\?|$)/i.test(image)
  const imageSource = useMemo(
    () =>
      imgEl && !plain && crt
        ? imageEffectSource(imgEl, { fit, position: parsePosition(imagePosition) })
        : null,
    [imgEl, fit, imagePosition, plain, crt],
  )

  // A GIF's frames only reach the effect if it re-reads the picture as it plays.
  useEffect(() => {
    if (!isGif || !near || !imgEl || prefersReducedMotion || plain || !crt) return undefined
    const id = setInterval(() => effect.current?.refresh(), 1000 / 20)
    return () => clearInterval(id)
  }, [isGif, near, imgEl, plain, crt])

  const hasMedia = Boolean(video || image)
  const natural = Boolean(size) && !framed
  const Media = framed ? 'div' : Fragment
  const mediaProps = framed ? { className: 'card__media-box' } : {}
  const effectClass = framed ? 'card__effect card__effect--framed' : 'card__effect'
  const mediaClass = ['card__media', fit === 'contain' && 'card__media--contain', POSITION_CLASSES[imagePosition]]
    .filter(Boolean)
    .join(' ')
  // A linked card is named by its title; its picture is decoration there.
  const imageAlt = to && title ? '' : alt
  const hasText = Boolean(title || tag)
  const hasBody = Boolean(body)
  const paragraphs = hasBody ? [].concat(body) : []
  const bodyContent = paragraphs.map((part, i) =>
    typeof part === 'string' ? <p key={part}>{part}</p> : <Fragment key={i}>{part}</Fragment>,
  )
  const canZoom = lightbox && hasMedia && !to
  const Root = to ? Link : canZoom ? 'button' : 'article'
  const rootProps = to
    ? { to, tabIndex: 0 }
    : canZoom
      ? {
          type: 'button',
          onClick: () => setLightboxOpen(true),
          'aria-haspopup': 'dialog',
          'aria-label': alt ? `View larger: ${alt}` : 'View larger',
        }
      : { 'aria-hidden': hasText || hasMedia || hasBody ? undefined : 'true' }
  const classes = [
    'card',
    area && `card--${area}`,
    shape && `shape-${shape}`,
    hasMedia && 'card--media',
    hasBody && 'card--text',
    to && 'card--link',
    canZoom && 'card--zoom',
    plain && 'card--plain',
    natural && 'card--natural',
    framed && 'card--framed',
    fill && `card--fill-${fill}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <Root
        {...rootProps}
        ref={rootRef}
        data-reveal={phase}
        className={classes}
        onPointerEnter={() => effect.current?.activateCell(0)}
        onPointerLeave={() => effect.current?.deactivateCell(0)}
      >
        <div className="card__frame" ref={frameRef} aria-hidden="true" />
        <div className="card__inner" ref={innerRef}>
          <Media {...mediaProps}>
            {video && (
              <video
                ref={setVideoEl}
                className={mediaClass}
                src={video}
                autoPlay={converted ? true : !prefersReducedMotion}
                muted
                loop={!pingPong}
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            )}
            {video && videoEl && near && !prefersReducedMotion && !plain && crt && (
              <ChromaLagEffect ref={effect} source={videoEl} fit={fit} className={effectClass} />
            )}
            {image && (
              <img
                ref={setImgEl}
                className={mediaClass}
                src={image}
                alt={imageAlt}
                width={size?.[0]}
                height={size?.[1]}
                loading={near ? 'eager' : 'lazy'}
                decoding="async"
              />
            )}
            {image && imageSource && near && !prefersReducedMotion && !plain && crt && (
              <ChromaLagEffect ref={effect} source={imageSource} className={effectClass} />
            )}
          </Media>
          {hasBody && <div className="card__body">{bodyContent}</div>}
          {hasText && (
            <div className="card__text">
              <div className="card__caption">
                {title && <h2 className="card__title">{title}</h2>}
                {tag && <p className="card__tag">{tag}</p>}
              </div>
            </div>
          )}
        </div>
        {hasBody && (
          <div className="card__sizer" aria-hidden="true">
            {bodyContent}
          </div>
        )}
        {shape && !plain && <div className="card__ring" aria-hidden="true" />}
        {!revealed && (
          <svg ref={svgRef} className="card__stroke" aria-hidden="true">
            <path
              ref={strokeRef}
              onAnimationEnd={() => setPhase('done')}
              fill="none"
              pathLength={PATH_LENGTH}
              stroke="currentColor"
              strokeWidth={1}
              strokeLinejoin="miter"
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
          portal
        >
          {image ? (
            <img src={image} alt={alt} className="lightbox__media" />
          ) : (
            <video src={video} className="lightbox__media" autoPlay muted loop playsInline controls={!converted} />
          )}
        </Modal>
      )}
    </>
  )
}

export default BentoCard
