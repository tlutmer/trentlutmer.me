import { Link, NavLink } from 'react-router-dom'
import { Typography } from '../Typography/Typography'
import { ChromaWipeSwap } from '../ChromaWipeSwap/ChromaWipeSwap'
import { ThemeDial } from '../ThemeDial/ThemeDial'
import { COFFEE_STATUS } from '../../lib/coffeeStatus'

function logoWordClass({ isActive }) {
  return `site-header__logo-word${isActive ? ' site-header__logo-word--selected' : ''}`
}

// The site's top nav — logo + page links on the left, coffee status
// (plain text) centered in the same bar (its text left-aligned within that centered
// block). A plain header: sits at the top of the page in normal flow
// (not pinned/sticky) with no scroll-triggered styling.
export function SiteNav() {
  return (
    <nav className="work-links" aria-label="Primary">
      <div className="site-header__top-row">
        <div className="site-header__logo-link">
          <Link to="/" className="site-header__name-link">
            <ChromaWipeSwap className="site-header__logo-text" text="Trent Lutmer" alt="트랜트 루트머" />
          </Link>
          <span className="site-header__logo-words">
            <NavLink to="/" end className={logoWordClass}>Work</NavLink>
            <span className="site-header__logo-sep" aria-hidden="true">✦</span>
            <NavLink to="/about" className={logoWordClass}>Info</NavLink>
          </span>
        </div>
        <div className="site-header__status">
          <Typography variant="paragraph" className="coffee">
            {COFFEE_STATUS.label}
            <br />
            <span className="coffee__detail">{COFFEE_STATUS.detail}</span>
          </Typography>
        </div>
        <ThemeDial />
      </div>
    </nav>
  )
}

export default SiteNav
