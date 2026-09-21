import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { About } from './pages/About'
import { Carbon } from './pages/Carbon'
import { CoachingTeaching } from './pages/CoachingTeaching'
import { Layout } from './components/Layout/Layout'
import { Fartlek } from './pages/Fartlek'
import { Home } from './pages/Home'
import { Kelex } from './pages/Kelex'
import { SaasConsole } from './pages/SaasConsole'

// React Router doesn't reset scroll on navigation — without this you'd land on
// the next page still scrolled down to wherever you clicked from.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Every page v4 shows so far (pages/Coffee.jsx is built but hidden — no route, no link); anything else falls back to Home.
export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/carbon" element={<Carbon />} />
          <Route path="/coaching-and-teaching" element={<CoachingTeaching />} />
          <Route path="/fartlek" element={<Fartlek />} />
          <Route path="/ibm-saas-console" element={<SaasConsole />} />
          <Route path="/kelex" element={<Kelex />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
