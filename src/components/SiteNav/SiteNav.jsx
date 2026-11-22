import { Link, NavLink } from 'react-router-dom'
import { ChromaWipeSwap } from '../ChromaWipeSwap/ChromaWipeSwap'
import { PortraitLogo } from '../PortraitLogo/PortraitLogo'
import { ThemeDial } from '../ThemeDial/ThemeDial'

function logoWordClass({ isActive }) {
  return `site-header__logo-word${isActive ? ' site-header__logo-word--selected' : ''}`
}

// The site's top nav — a full-width bar (see .work-links), its content the same 800px column as
// everything else on the page (.content). Left: the portrait (home link). Right: the page links, then the theme dial.
// (The name is in the home page's hero; the coffee status is a floating pill, see CoffeePill.) A plain header: sits at the top of the page in normal
// flow (not pinned/sticky) with no scroll-triggered styling.
export function SiteNav() {
  return (
    <nav className="work-links" aria-label="Primary">
      <div className="site-header__top-row">
        <div className="content site-header__row">
          <div className="site-header__left">
            {/* The pixel portrait: links to the home (Work) page and follows the colour theme. */}
            <Link to="/" className="site-header__portrait" aria-label="Trent Lutmer, home" tabIndex={0}>
              {/* Hover glitches the mark itself, the blocks slide out of place through cyan, magenta and yellow, the same wipe as the name in the hero. */}
              <ChromaWipeSwap text={<PortraitLogo />} alt={<PortraitLogo glitched />} label="Trent Lutmer" />
            </Link>
          </div>
          <div className="site-header__right">
            <span className="site-header__logo-words">
              <NavLink to="/" end className={logoWordClass} tabIndex={0}>Work</NavLink>
              <span className="site-header__logo-sep" aria-hidden="true">✦</span>
              <NavLink to="/about" className={logoWordClass} tabIndex={0}>Info</NavLink>
            </span>
            <ThemeDial />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default SiteNav
