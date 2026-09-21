import { useState } from 'react'
import { switchTheme } from '../../lib/themeSwitch'

// Four-circle Venn diagram, top right of the nav — one circle per colour
// theme (see the [data-color-theme] rules in site-nav.css). Click one to
// switch to that theme immediately; the pick is remembered across pages and
// reloads. Keep the ids in sync with the inline snippet in index.html, which
// sets the same attribute before React mounts (no flash of the wrong theme).
//
// The change itself goes through switchTheme (lib/themeSwitch.js), so the page-wide
// transition in ThemeTransition can cover the page before the new theme appears.
const CIRCLES = [
  { id: 'grey', label: 'Grey' },
  { id: 'cyan', label: 'Cyan' },
  { id: 'magenta', label: 'Magenta' },
  { id: 'yellow', label: 'Yellow' },
]
const DEFAULT_THEME = 'grey'
const STORAGE_KEY = 'color-theme'

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

  function handleSelect(id) {
    if (id === theme) return
    setStoredTheme(id)
    setTheme(id)
    switchTheme(id)
  }

  return (
    <div className="theme-dial" role="group" aria-label="Set site theme">
      {CIRCLES.map((circle) => (
        <button
          key={circle.id}
          type="button"
          className={`theme-dial__circle theme-dial__circle--${circle.id}${
            circle.id === theme ? ' theme-dial__circle--active' : ''
          }`}
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
