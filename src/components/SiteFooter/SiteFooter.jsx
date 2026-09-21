import { Fragment } from 'react'
import { COFFEE_STATUS } from '../../lib/coffeeStatus'

// Contact links, in order. External ones open in a new tab; the email is a mailto: link.
const LINKS = [
  {
    label: 'Resume',
    href: 'https://www.dropbox.com/scl/fi/b7o1ecgt0ve6y0kc5ppzd/trentlutmer-s-resume-26.pdf?rlkey=dfzdv3k8anvrtwoi001oadopx&st=p5jft09z&dl=0',
  },
  { label: 'Github', href: 'https://github.com/tlutmer' },
  { label: 'Email', href: 'mailto:hello.tlutmer@gmail.com', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tlutmer' },
]

// The site's footer — the nav's own layout (see SiteNav.jsx): the same `.site-shell` column, the
// same `.work-links` bar and the same `.site-header__top-row` grid. The copyright is in the first
// column, under the name. The links are in the second, under "Currently sipping" and starting on
// the same left edge, set like the nav's "Work ✦ Info" (the same link and ✦ styles). That column
// is as wide as its content, so a hidden copy of the roast line keeps it the nav's width.
export function SiteFooter() {
  return (
    <div className="site-shell">
      <footer className="work-links site-footer">
        <div className="site-header__top-row">
          <div className="site-footer__links-col">
            <nav className="site-header__logo-words site-footer__links" aria-label="Contact">
              {LINKS.map(({ label, href, external = true }, i) => (
                <Fragment key={label}>
                  {i > 0 && (
                    <span className="site-header__logo-sep" aria-hidden="true">
                      ✦
                    </span>
                  )}
                  <a
                    href={href}
                    className="site-header__logo-word"
                    {...(external && { target: '_blank', rel: 'noreferrer' })}
                  >
                    {label}
                  </a>
                </Fragment>
              ))}
            </nav>
            <span className="site-footer__sizer" aria-hidden="true">
              {COFFEE_STATUS.detail}
            </span>
          </div>
          <p className="site-footer__copy">© 2026 Trent Lutmer</p>
        </div>
      </footer>
    </div>
  )
}

export default SiteFooter
