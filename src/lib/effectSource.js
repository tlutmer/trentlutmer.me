// Sources for ChromaLagEffect (components/ChromaLagEffect). The effect takes videos itself; for an
// image card this builds the same "descriptor" the effect accepts: it composes the picture onto a
// canvas at the card's size, exactly as the plain <img> would show it (object-fit and
// object-position), on the card's fill colour when there is one (so `contain` letterbox bars keep
// their colour instead of going black).

// CSS object-position ("50% 85%", "center", "left top") -> fractions 0..1 along each axis.
export function parsePosition(value = 'center') {
  const axis = (token, keywords) => {
    if (token in keywords) return keywords[token]
    const n = parseFloat(token)
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n / 100)) : 0.5
  }
  const [a = 'center', b = 'center'] = String(value).trim().split(/\s+/)
  const vertical = { top: 0, center: 0.5, bottom: 1 }
  const horizontal = { left: 0, center: 0.5, right: 1 }
  // "top" or "bottom" written first (or alone) is the vertical keyword.
  if (a in vertical && a !== 'center' && !(b in vertical && b !== 'center')) {
    return { x: axis(b, horizontal), y: axis(a, vertical) }
  }
  return { x: axis(a, horizontal), y: axis(b, vertical) }
}

// Resolves once the image has loaded (a lazy image may not have started yet).
function whenLoaded(img) {
  if (img.complete && img.naturalWidth > 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    img.addEventListener('load', resolve, { once: true })
    img.addEventListener('error', () => reject(new Error('Card image failed to load')), { once: true })
  })
}

export function imageEffectSource(img, { fit = 'cover', position = { x: 0.5, y: 0.5 }, fill } = {}) {
  return {
    ready: () => whenLoaded(img),
    render: ({ width, height }) => {
      if (!img.complete || img.naturalWidth === 0) return null
      const frame = document.createElement('canvas')
      frame.width = width
      frame.height = height
      const ctx = frame.getContext('2d')
      if (!ctx) return frame
      if (fill) {
        ctx.fillStyle = fill
        ctx.fillRect(0, 0, width, height)
      }
      const scale =
        fit === 'contain'
          ? Math.min(width / img.naturalWidth, height / img.naturalHeight)
          : Math.max(width / img.naturalWidth, height / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.drawImage(img, (width - w) * position.x, (height - h) * position.y, w, h)
      return frame
    },
  }
}
