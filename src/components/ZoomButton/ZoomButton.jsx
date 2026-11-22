// Wraps a picture so a click opens it larger in the lightbox Modal (the same one BentoCard's
// `lightbox` uses). For the project-page `{ component }` entries (PaddedPicture, DeviceFrame) that
// BentoCard can't wrap. `src` is the file shown in the lightbox; `alt` names the button and dialog.
// Styles: .card--zoom (button reset, zoom-in cursor) and .zoom-button in index.css.
import { useState } from 'react'
import { Modal } from '../Modal/Modal'

export function ZoomButton({ src, alt = '', children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className="card--zoom zoom-button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={alt ? `View larger: ${alt}` : 'View larger'}
      >
        {children}
      </button>
      {/* A sibling of the button, not a child: a portal's React events bubble through the tree. */}
      <Modal size="lightbox" open={open} title={alt || 'Image'} onClose={() => setOpen(false)} portal>
        <img src={src} alt={alt} className="lightbox__media" />
      </Modal>
    </>
  )
}

export default ZoomButton
