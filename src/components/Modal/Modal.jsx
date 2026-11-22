// Modal.jsx
// Ported from the Kelex Design System's Modal (Bevel left | header + body + footer | Bevel right),
// with two changes for the portfolio:
//   - a `lightbox` size that is 80% of the viewport's width and height, centred over the dimmed
//     page (the project-page lightbox) — clicking the dimmed page outside it closes it — and
//   - the confirm/cancel footer is replaced by an optional `footer` node (none by default),
//     and the Slot placeholder is gone — `children` is the body.
//
// Its styles are in index.css (`.modal*`, `.bevel*`).
//
// It renders into document.body, so the page's own transforms (route transitions) can't break its
// `position: fixed`. Escape closes it, focus moves into it and returns to whatever opened it,
// Tab stays inside it, and the page behind doesn't scroll.

import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { Bevel } from '../Bevel/Bevel'
import { portalMiddleTimes, portalSizes } from '../PortalEffect/PortalEffect'

const SIZES = ['small', 'medium', 'large', 'lightbox']

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// With `portal`, the panel is revealed through a centred mask that opens along the portal's size
// and timing curve (PortalEffect's sizes, on a 64-unit square).
const PORTAL_UNIT = 64
// How many times faster than the portal's own timing the modal opens (2 = half the duration).
const PORTAL_SPEED = 2
const portalInset = (size) => `inset(${((1 - size / PORTAL_UNIT) / 2) * 100}%)`

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

// Close icon — math-multiply / X, as in the design system.
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function Modal({
  size = 'medium',
  title = 'Header',
  onClose,
  footer,
  children,
  open = true,
  portal = false,
  className = '',
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const isLightbox = size === 'lightbox'

  // Each opening plays the portal once: the panel is masked to nothing, then opens from the centre.
  useLayoutEffect(() => {
    const panel = dialogRef.current
    if (!open || !portal || prefersReducedMotion || !panel) return undefined

    gsap.set(panel, { clipPath: portalInset(0) })
    const timeline = gsap.timeline({ paused: true })
    portalSizes.forEach((portalSize, i) => {
      timeline.set(panel, { clipPath: portalInset(portalSize) }, portalMiddleTimes[i] / 1000 / PORTAL_SPEED)
    })
    timeline.set(panel, { clipPath: 'none' }, portalMiddleTimes.at(-1) / 1000 / PORTAL_SPEED)
    timeline.play(0)

    return () => {
      timeline.kill()
      panel.style.clipPath = ''
    }
  }, [open, portal])

  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    document.body.classList.add('is-scroll-locked')
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('is-scroll-locked')
      if (opener instanceof HTMLElement) opener.focus()
    }
    // onClose is read through the closure on purpose: re-running this effect on every parent
    // render would steal focus back to the close button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const sizeClass = SIZES.includes(size) ? size : 'medium'

  return createPortal(
    /* Overlay */
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      {/* Modal panel — role="dialog" and aria-modal go here, not on the overlay */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={['modal__panel', `modal__panel--${sizeClass}`, className].filter(Boolean).join(' ')}
      >
        <Bevel side="left" variant="primary" stroke />

        {/* Container — top/bottom border completes the outline */}
        <div className="modal__container">
          {/* Header */}
          <div className="modal__header">
            <span className="modal__title">{title}</span>
            <button ref={closeRef} type="button" onClick={onClose} className="modal__close" aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          {/* Body — the lightbox size gives its content the whole remaining area to fit itself to. */}
          {isLightbox ? (
            <div className="modal__body--fit">
              <div className="modal__fit">{children}</div>
            </div>
          ) : (
            <div className="modal__body">
              <div>{children}</div>
            </div>
          )}

          {footer && <div className="modal__footer">{footer}</div>}
        </div>

        <Bevel side="right" variant="primary" stroke />
      </div>
    </div>,
    document.body,
  )
}

export default Modal
