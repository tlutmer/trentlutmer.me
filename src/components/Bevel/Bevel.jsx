// Bevel.jsx
// Kelex Design System — Bevel component
// Decorative chamfered corner bracket strip (8px wide)
// Used by Button, Card, Menu, etc. to create notched/chamfered corner edges
//
// Structure (responsive):
//   The 8×8 triangle notch is a fixed-size SVG.
//   The vertical line and horizontal connector are CSS elements that scale
//   to fill the parent height (or a fixed height if provided).
//
// Left bevel (top-left notch):
//   [8×8 notch] → [vertical line ↕] → [horizontal connector ─]
//
// Right bevel (bottom-right notch):
//   [horizontal connector ─] → [vertical line ↕] → [8×8 notch]
//
// Three visual variants:
//   "primary"  → filled triangle + solid rectangle
//   "tertiary" → stroked diagonal + 1px border lines
//   "flat"     → straight vertical line, no notch (used for disabled states)
//
// `stroke` (primary only) adds a 1px outline in `strokeColor` around the
// same perimeter the fill already traces — for panel-style components
// (Card, Modal, SideNavigation) that need a visible edge distinct from
// their fill color. Button/Avatar don't pass this — their border color
// equals their fill color, so a drawn stroke wouldn't be visible anyway.

const NOTCH = 8

export function Bevel({ side = 'left', height, variant = 'primary', stroke = false, strokeColor, className = '' }) {
  const isLeft = side === 'left'
  const resolvedStroke = strokeColor ?? 'var(--grey-100, #ffffff)'

  // Container style — fixed height or stretch to fill parent
  // Supports --bevel-color CSS custom property for state-coupled color changes
  // (set on a parent element; falls back to inherited currentColor)
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: NOTCH,
    flexShrink: 0,
    color: 'var(--bevel-color, currentColor)',
    ...(height != null ? { height } : { alignSelf: 'stretch' }),
  }

  // ── Flat (no notch) ──
  // Straight vertical border line spanning full height
  if (variant === 'flat') {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          ...containerStyle,
          alignItems: isLeft ? 'flex-start' : 'flex-end',
        }}
      >
        <div
          style={{
            flex: '1 0 0',
            minHeight: 0,
            ...(isLeft
              ? { borderLeft: '1px solid currentColor' }
              : { borderRight: '1px solid currentColor' }),
          }}
        />
      </div>
    )
  }

  // 8×8 notch SVG — same diagonal for both sides, different fill triangles
  const isTertiary = variant === 'tertiary'
  const isFilledStroke = variant === 'primary' && stroke
  const notchSvg = (
    <svg
      width={NOTCH}
      height={NOTCH}
      viewBox={`0 0 ${NOTCH} ${NOTCH}`}
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {isTertiary ? (
        <path
          d="M8,0 L0,8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      ) : (
        <>
          <path
            d={isLeft ? 'M8,0 L8,8 L0,8 Z' : 'M0,0 L8,0 L0,8 Z'}
            fill="currentColor"
          />
          {isFilledStroke && (
            <path d="M8,0 L0,8" fill="none" stroke={resolvedStroke} strokeWidth="1" />
          )}
        </>
      )}
    </svg>
  )

  if (variant !== 'tertiary' && !isFilledStroke) {
    // ── Primary (filled, no outline) ──
    // Notch triangle + solid fill rectangle
    return (
      <div className={className} aria-hidden="true" style={containerStyle}>
        {isLeft && notchSvg}
        <div style={{ flex: '1 0 0', minHeight: 0, backgroundColor: 'currentColor' }} />
        {!isLeft && notchSvg}
      </div>
    )
  }

  // ── Tertiary (stroked, no fill) or Primary+stroke (filled AND outlined) ──
  // Same 3-segment perimeter trace (notch diagonal, vertical edge, horizontal
  // connector) either way; the filled variant additionally paints each
  // segment's background and draws the diagonal/vertical border in
  // `strokeColor` instead of currentColor (currentColor here is the fill).
  //
  // The horizontal connector (bottom for left, top for right) closes the
  // plain, non-chamfered corner where this bevel meets the panel's own
  // top/bottom border, drawn in the same color as that border (`strokeColor`,
  // grey-100) so the two segments read as one continuous line. Using the
  // grey-100 *token* rather than a literal hex means it's automatically
  // theme-correct — its resolved color flips between light and dark theme
  // along with every other grey-100 reference.
  const lineColor = isTertiary ? 'currentColor' : resolvedStroke
  const fillStyle = isFilledStroke ? { backgroundColor: 'currentColor' } : {}
  // The vertical edge is a content-less flex child aligned to one side, so without an explicit
  // width it collapses to its 1px border and its fill never paints — the bevel strip then reads as
  // the page behind it instead of the panel's colour. `width: 100%` makes it the full 8px.
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        ...containerStyle,
        alignItems: isLeft ? 'flex-start' : 'flex-end',
      }}
    >
      {isLeft && notchSvg}
      {!isLeft && (
        <div style={{ width: '100%', borderTop: `1px solid ${lineColor}`, ...fillStyle }} />
      )}
      <div
        style={{
          flex: '1 0 0',
          minHeight: 0,
          width: '100%',
          ...fillStyle,
          ...(isLeft
            ? { borderLeft: `1px solid ${lineColor}` }
            : { borderRight: `1px solid ${lineColor}` }),
        }}
      />
      {isLeft && (
        <div style={{ width: '100%', borderBottom: `1px solid ${lineColor}`, ...fillStyle }} />
      )}
      {!isLeft && notchSvg}
    </div>
  )
}

export default Bevel
