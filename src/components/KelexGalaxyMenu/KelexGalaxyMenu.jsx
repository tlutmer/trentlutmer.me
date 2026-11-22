// A live specimen of the Kelex side-navigation menu (Figma node 2010:5312, "_Side navigation
// base"). The spec sheet pins one galaxy to each state for comparison (Andromeda muted, Cartwheel
// disabled-grey, Circinus enabled, Milky Way focused, Sombrero hovered, Triangulum selected); this
// demo instead keeps every item at its real default and takes each name through the three
// interactive states in turn — Hover, then Active (the cyan-filled chamfer `tokens.css` already
// documents as the selected-item marker), then Focus (the outlined bracket) — before handing off to
// the next. Built on the site's own Bevel component, the same as KelexButtonDemo.
// Styles: .kelex-galaxy-menu__* in index.css.
import { useEffect, useRef, useState } from 'react'
import { Bevel } from '../Bevel/Bevel'

const GALAXIES = ['Andromeda', 'Cartwheel', 'Circinus', 'Milky Way', 'Sombrero', 'Triangulum']

// ms spent in each phase of one galaxy's turn, then a quiet gap (all-default) before the next.
const DURATIONS = { hover: 350, active: 550, focus: 550, gap: 300 }
const ORDER = ['hover', 'active', 'focus', 'gap']

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function KelexGalaxyMenu() {
  const [active, setActive] = useState(() => ({ index: 0, phase: prefersReducedMotion ? null : 'hover' }))
  const timer = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    let index = 0
    let step = 0

    const advance = () => {
      step = (step + 1) % ORDER.length
      if (step === 0) index = (index + 1) % GALAXIES.length
      const phase = ORDER[step]
      setActive({ index, phase: phase === 'gap' ? null : phase })
      timer.current = window.setTimeout(advance, DURATIONS[phase])
    }

    setActive({ index, phase: 'hover' })
    timer.current = window.setTimeout(advance, DURATIONS.hover)
    return () => window.clearTimeout(timer.current)
  }, [])

  return (
    <div className="kelex-galaxy-menu-stage">
      <div className="kelex-galaxy-menu">
        <Bevel side="left" variant="tertiary" className="kelex-galaxy-menu__edge" />
        <div className="kelex-galaxy-menu__container">
          <div className="kelex-galaxy-menu__header">Galaxies</div>
          <ul className="kelex-galaxy-menu__list">
            {GALAXIES.map((name, i) => (
              <GalaxyRow key={name} name={name} phase={i === active.index ? active.phase : null} />
            ))}
          </ul>
        </div>
        <Bevel side="right" variant="tertiary" className="kelex-galaxy-menu__edge" />
      </div>
    </div>
  )
}

function GalaxyRow({ name, phase }) {
  if (phase === 'active') {
    return (
      <li className="kelex-galaxy-menu__row kelex-galaxy-menu__row--active">
        <Bevel side="left" variant="primary" className="kelex-galaxy-menu__row-edge" />
        <span className="kelex-galaxy-menu__label">{name}</span>
        <Bevel side="right" variant="primary" className="kelex-galaxy-menu__row-edge" />
      </li>
    )
  }
  if (phase === 'focus') {
    return (
      <li className="kelex-galaxy-menu__row kelex-galaxy-menu__row--focus">
        <Bevel side="left" variant="tertiary" className="kelex-galaxy-menu__row-edge" />
        <span className="kelex-galaxy-menu__label">{name}</span>
        <Bevel side="right" variant="tertiary" className="kelex-galaxy-menu__row-edge" />
      </li>
    )
  }
  return (
    <li className={`kelex-galaxy-menu__row${phase === 'hover' ? ' kelex-galaxy-menu__row--hover' : ''}`}>
      <span className="kelex-galaxy-menu__row-edge" aria-hidden="true" />
      <span className="kelex-galaxy-menu__label">{name}</span>
      <span className="kelex-galaxy-menu__row-edge" aria-hidden="true" />
    </li>
  )
}

export default KelexGalaxyMenu
