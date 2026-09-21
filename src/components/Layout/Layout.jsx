import { Outlet } from 'react-router-dom'
import { PageTransition } from '../PageTransition/PageTransition'
import { SiteFooter } from '../SiteFooter/SiteFooter'
import { SiteNav } from '../SiteNav/SiteNav'
import { ThemeTransition } from '../ThemeTransition/ThemeTransition'

// The skip link jumps to the page's <main>, which takes focus (it isn't focusable by default, so
// it gets tabindex -1 first) so the next Tab starts inside the page instead of back in the nav.
function skipToContent(event) {
  const main = document.getElementById('main-content')
  if (!main) return
  event.preventDefault()
  main.setAttribute('tabindex', '-1')
  main.focus()
  main.scrollIntoView()
}

// The nav is part of the layout, not of each page: it stays mounted across navigation
// (so its theme dial and hover state carry over) while only the page below it
// transitions. The footer follows the page, also outside the transition. All of it sits inside
// ThemeTransition, which plays over the whole page when the colour theme changes.
export function Layout() {
  return (
    <ThemeTransition>
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>
      <div className="site-shell">
        <SiteNav />
      </div>
      <PageTransition>
        <Outlet />
      </PageTransition>
      <SiteFooter />
    </ThemeTransition>
  )
}

export default Layout
