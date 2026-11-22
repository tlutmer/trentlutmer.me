import { useEffect, useRef, useState } from 'react'
import { ScannerEffect } from '../ScannerEffect/ScannerEffect'
import { setThemeRunner } from '../../lib/themeSwitch'

// Plays the scanner over the whole page when the colour theme changes. The theme changes when the
// bands cover the page; then the scanner clears. A second change during a run starts a fresh one.
export function ThemeTransition() {
  const [run, setRun] = useState(null)
  const count = useRef(0)

  useEffect(() => {
    setThemeRunner((apply) => {
      count.current += 1
      setRun({ key: count.current, apply })
    })
    return () => setThemeRunner(null)
  }, [])

  if (!run) return null
  const { key, apply } = run
  return (
    <ScannerEffect
      key={key}
      onCovered={apply}
      onDone={() => setRun((current) => (current && current.key === key ? null : current))}
    />
  )
}

export default ThemeTransition
