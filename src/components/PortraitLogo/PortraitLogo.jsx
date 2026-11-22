import { LOGO_VIEWBOX, LOGO_PATH, LOGO_FAINT, LOGO_ALT_PATH, LOGO_ALT_FAINT } from './logoMark.js'

// The nav's logo mark (it replaced the pixel portrait): big blocks in an inline SVG in `currentColor`, so
// it takes the colour of its container and follows the colour theme.
// `glitched` draws the shifted version of the blocks that the nav's hover wipe swaps to.
export function PortraitLogo({ className = '', glitched = false }) {
  const path = glitched ? LOGO_ALT_PATH : LOGO_PATH
  const faint = glitched ? LOGO_ALT_FAINT : LOGO_FAINT
  return (
    <svg
      className={className}
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
      {faint.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" opacity="0.4" />
      ))}
    </svg>
  )
}

export default PortraitLogo
