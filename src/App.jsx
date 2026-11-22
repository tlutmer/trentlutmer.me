import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { About } from './pages/About'
import { Carbon } from './pages/Carbon'
import { CoachingTeaching } from './pages/CoachingTeaching'
import { FederalRegs } from './pages/FederalRegs'
import { FederalRegsTest } from './pages/FederalRegsTest'
import { Layout } from './components/Layout/Layout'
import { Fartlek } from './pages/Fartlek'
import { Home } from './pages/Home'
import { HpDisplayCenter } from './pages/HpDisplayCenter'
import { Kelor } from './pages/Kelor'
import { Kelex } from './pages/Kelex'
import { SaasConsole } from './pages/SaasConsole'
import { Writing } from './pages/Writing'

// What the browser tab (and a screen reader) calls every page — one fixed title, not one per page.
const SITE_TITLE = 'Trent Lutmer | Portfolio'

// On every route change: name the page in the document title, and start it at the top.
// React Router doesn't reset scroll on navigation — without this you'd land on the next page still
// scrolled down to wherever you clicked from. It also doesn't move focus, so a keyboard or screen
// reader user would be left on the link they used, on a page that's gone; the new page's <h1>
// (or its <main>) takes focus instead, which has it announced. Not on the first load, where the
// browser has already done all this. (A page compares its path with the last one, not "is this the
// first run", because React's dev StrictMode runs effects twice on mount.)
function RouteChange() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  useEffect(() => {
    document.title = SITE_TITLE
    window.scrollTo(0, 0)
    if (previous.current === pathname) return
    previous.current = pathname
    const target = document.querySelector('#main-content h1') ?? document.getElementById('main-content')
    if (!target) return
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [pathname])
  return null
}

// Every page v4 shows; anything else falls back to Home.
// /job-hunt is linked only from its card on the Info page (About) — not the nav or the footer.
export function App() {
  return (
    <>
      <RouteChange />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/carbon-libraries" element={<Carbon />} />
          <Route path="/coaching-and-teaching" element={<CoachingTeaching />} />
          <Route path="/fartlek" element={<Fartlek />} />
          <Route path="/federal-regulations" element={<FederalRegs />} />
          <Route path="/federal-regulations-test" element={<FederalRegsTest />} />
          <Route path="/hp-display-center" element={<HpDisplayCenter />} />
          <Route path="/ibm-mcsp" element={<SaasConsole />} />
          <Route path="/ibm-saas-console" element={<Navigate to="/ibm-mcsp" replace />} />
          <Route path="/job-hunt" element={<Writing />} />
          <Route path="/kelor" element={<Kelor />} />
          <Route path="/kelex-design-system" element={<Kelex />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
