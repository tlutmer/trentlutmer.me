// Modal.jsx
// Ported from the Kelex Design System's Modal (Bevel left | header + body + footer | Bevel right),
// with two changes for the portfolio:
//   - a `lightbox` size that is 66% of the viewport's width and height, centred over the dimmed
//     page (the project-page lightbox) — clicking the dimmed page outside it closes it — and
//   - the confirm/cancel footer is replaced by an optional `footer` node (none by default),
//     and the Slot placeholder is gone — `children` is the body.
//
// It renders into document.body, so the page's own transforms (route transitions) can't break its
// `position: fixed`. Escape closes it, focus moves into it and returns to whatever opened it,
// Tab stays inside it, and the page behind doesn't scroll.

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Bevel } from '../Bevel/Bevel'

const SIZE_WIDTHS = {
  small: 240,
  medium: 420,
  large: 600,
}

const FOCUSABLE = 'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

// Close icon — math-multiply / X, as in the design system.
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
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
  className = '',
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const isLightbox = size === 'lightbox'

  useEffect(() => {
    if (!open) return undefined
    const opener = document.activeElement
    const scrollLock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
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
      document.body.style.overflow = scrollLock
      if (opener instanceof HTMLElement) opener.focus()
    }
    // onClose is read through the closure on purpose: re-running this effect on every parent
    // render would steal focus back to the close button.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const width = SIZE_WIDTHS[size] ?? SIZE_WIDTHS.medium

  return createPortal(
    /* Overlay */
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.56)' }}
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
        className={['flex flex-row items-stretch', 'text-grey-100', 'font-mono', className].join(' ')}
        style={{
          ...(isLightbox ? { width: '66vw', height: '66dvh' } : { width }),
          '--bevel-color': 'var(--grey-800, #151517)',
        }}
      >
        <Bevel side="left" variant="primary" stroke className="text-grey-100" />

        {/* Container — top/bottom border completes the outline */}
        <div className="flex flex-col flex-1 min-w-0 bg-grey-800 border-t border-b border-grey-100">
          {/* Header */}
          <div
            className="flex flex-row items-center justify-between gap-4 border-b border-grey-100"
            style={{ padding: '8px 0' }}
          >
            <span className="text-label leading-none text-grey-100 min-w-0 truncate">{title}</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="text-grey-100 hover:text-grey-300 transition-colors cursor-pointer"
              style={{ padding: '4px 8px' }}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Body — the lightbox size gives its content the whole remaining area to fit itself to. */}
          {isLightbox ? (
            <div className="relative flex-1 min-h-0">
              <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '16px 8px' }}>
                {children}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1" style={{ padding: '16px 0' }}>
              <div className="flex-1">{children}</div>
            </div>
          )}

          {footer && (
            <div className="flex flex-row items-center gap-4 border-t border-grey-100" style={{ padding: '8px 0' }}>
              {footer}
            </div>
          )}
        </div>

        <Bevel side="right" variant="primary" stroke className="text-grey-100" />
      </div>
    </div>,
    document.body,
  )
}

export default Modal
