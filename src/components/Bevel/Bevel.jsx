// Bevel.jsx
// Ported from the Kelex Design System's Bevel component (the styles are in index.css, `.bevel*`)
// Decorative chamfered corner bracket strip (8px wide)
// Used by Modal (and, in the design system, Button, Card, Menu, etc.) to create notched/chamfered corner edges
//
// Structure (responsive):
//   The 8×8 triangle notch is a fixed-size SVG.
//   The vertical line and horizontal connector are CSS elements that scale
//   to fill the parent height.
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
// `stroke` (primary only) adds a 1px outline (--bevel-stroke, grey-100 by default) around the
// same perimeter the fill already traces — for panel-style components (Card, Modal,
// SideNavigation) that need a visible edge distinct from their fill color.
//
// Colour comes from --bevel-color (set on a parent) or the inherited text colour.

const NOTCH = 8

export function Bevel({ side = 'left', variant = 'primary', stroke = false, className = '' }) {
  const isLeft = side === 'left'
  const isTertiary = variant === 'tertiary'
  const isFilledStroke = variant === 'primary' && stroke
  const isOutlined = isTertiary || isFilledStroke

  const modifier = variant === 'flat' ? 'bevel--flat' : isOutlined ? `bevel--outlined ${isTertiary ? 'bevel--tertiary' : 'bevel--filled'}` : 'bevel--primary'
  const classes = ['bevel', `bevel--${side}`, modifier, className].filter(Boolean).join(' ')

  // ── Flat (no notch): a straight vertical border line spanning the full height
  if (variant === 'flat') {
    return (
      <div className={classes} aria-hidden="true">
        <div className="bevel__line" />
      </div>
    )
  }

  // 8×8 notch SVG — the same diagonal for both sides, different fill triangles
  const notch = (
    <svg
      className="bevel__notch"
      width={NOTCH}
      height={NOTCH}
      viewBox={`0 0 ${NOTCH} ${NOTCH}`}
      aria-hidden="true"
    >
      {!isTertiary && <path className="bevel__notch-fill" d={isLeft ? 'M8,0 L8,8 L0,8 Z' : 'M0,0 L8,0 L0,8 Z'} />}
      {isOutlined && <path className="bevel__notch-line" d="M8,0 L0,8" />}
    </svg>
  )

  // ── Primary (filled, no outline): the notch triangle and a solid fill rectangle
  if (!isOutlined) {
    return (
      <div className={classes} aria-hidden="true">
        {isLeft && notch}
        <div className="bevel__fill" />
        {!isLeft && notch}
      </div>
    )
  }

  // ── Tertiary (stroked, no fill) or Primary + stroke (filled AND outlined) ──
  // The same 3-segment perimeter trace either way: the notch diagonal, the vertical edge and the
  // horizontal connector (bottom for left, top for right), which closes the plain, non-chamfered
  // corner where this bevel meets the panel's own top or bottom border, in the same colour as that
  // border so the two read as one continuous line.
  return (
    <div className={classes} aria-hidden="true">
      {isLeft && notch}
      {!isLeft && <div className="bevel__connector" />}
      <div className="bevel__edge" />
      {isLeft && <div className="bevel__connector" />}
      {!isLeft && notch}
    </div>
  )
}

export default Bevel
