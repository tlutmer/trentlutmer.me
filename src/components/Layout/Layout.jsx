import { Outlet, useLocation } from 'react-router-dom'
import { HeadlineScramble } from '../HeadlineScramble/HeadlineScramble'
import { CoffeePill } from '../CoffeePill/CoffeePill'
import { PageTransition } from '../PageTransition/PageTransition'
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

// The coffee pill shows only on the Work (home) and Info pages, not on the project pages.
const COFFEE_PILL_PATHS = ['/', '/about']

// The nav is part of the layout, not of each page: it stays mounted across navigation
// (so its theme dial and hover state carry over) while only the page below it
// transitions. The coffee pill floats above the page, also outside the transition.
export function Layout() {
  const { pathname } = useLocation()
  const showCoffee = COFFEE_PILL_PATHS.includes(pathname.replace(/\/+$/, '') || '/')
  return (
    <>
      <ThemeTransition />
      <HeadlineScramble />
      <a className="skip-link" href="#main-content" onClick={skipToContent} tabIndex={0}>
        Skip to content
      </a>
      <SiteNav />
      <PageTransition>
        <Outlet />
      </PageTransition>
      {showCoffee && <CoffeePill />}
    </>
  )
}

export default Layout
