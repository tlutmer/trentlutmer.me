import { useState } from 'react'
import { switchTheme } from '../../lib/themeSwitch'

// The theme switcher: four square petals tiled into one diamond (no hub: they meet at a thin gap),
// one per colour theme, in the order grey, cyan, magenta, yellow going clockwise from the top (see
// the [data-color-theme] rules in site-nav.css). The current theme is always at the top: picking
// another theme turns the whole diamond until that theme's petal is on top. Each petal is a real
// <button>. The pick is remembered across pages and reloads. Keep the ids in sync with the inline
// snippet in index.html, which sets the same attribute before React mounts (no flash of the wrong theme).
//
// The change itself goes through switchTheme (lib/themeSwitch.js), which plays the page-wide
// transition (ThemeTransition) and applies the theme when it covers the page.
const CIRCLES = [
  { id: 'grey', label: 'Grey' },
  { id: 'cyan', label: 'Cyan' },
  { id: 'magenta', label: 'Magenta' },
  { id: 'yellow', label: 'Yellow' },
]
const DEFAULT_THEME = 'grey'
const STORAGE_KEY = 'color-theme'
const indexOf = (id) => CIRCLES.findIndex((c) => c.id === id)
// Each petal's place in the 2x2 grid (grid-template-areas names in site-nav.css), clockwise from
// top-left: tl, tr, br, bl. The container's constant 45deg rotation (plus the turn below) carries
// tl to the top, tr to the right, br to the bottom and bl to the left — see the comment on .theme-dial.
const SLOT = ['tl', 'tr', 'br', 'bl']

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return CIRCLES.some((c) => c.id === stored) ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore (private browsing, storage disabled, etc.) — the theme still
    // applies for the current page, it just won't carry over.
  }
}

export function ThemeDial() {
  const [theme, setTheme] = useState(getStoredTheme)
  // The diamond's turn in degrees: it starts with the stored theme on top. A pick turns it the short
  // way round to the new theme's dot: a step forward (counter-clockwise), or a step back (clockwise).
  // Themes two steps apart are opposite, so either way is the same distance.
  const [turn, setTurn] = useState(() => -90 * indexOf(getStoredTheme()))

  function handleSelect(id) {
    if (id === theme) return
    let steps = (indexOf(id) - indexOf(theme) + CIRCLES.length) % CIRCLES.length
    if (steps === CIRCLES.length - 1) steps = -1
    setStoredTheme(id)
    setTheme(id)
    setTurn((t) => t - 90 * steps)
    switchTheme(id)
  }

  return (
    <div
      className="theme-dial"
      role="group"
      aria-label="Set site theme"
      style={{ transform: `rotate(${45 + turn}deg)` }}
    >
      {/* Announces the chosen theme to screen readers. */}
      <span className="sr-only" role="status">
        Theme: {CIRCLES.find((c) => c.id === theme).label}
      </span>
      {CIRCLES.map((circle, i) => (
        <button
          key={circle.id}
          type="button"
          className={`theme-dial__dot theme-dial__dot--${circle.id}`}
          style={{ gridArea: SLOT[i] }}
          aria-pressed={circle.id === theme}
          aria-label={`Set ${circle.label.toLowerCase()} theme`}
          title={circle.label}
          onClick={() => handleSelect(circle.id)}
        />
      ))}
    </div>
  )
}

export default ThemeDial
