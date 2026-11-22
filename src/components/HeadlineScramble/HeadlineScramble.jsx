import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Every heading inside the current page's <main>: when it scrolls into view, its own text
// flickers through random Hangul syllables, then locks in one character at a time (in a random
// order) until the real text is back. Opt a heading out with `data-no-scramble`.
const HEADING_SELECTOR = '#main-content :is(h1, h2, h3, h4, h5, h6)'
// The precomposed Hangul syllable block (가 through 힣) — every code point in it is a complete,
// renderable character, so a random pick from the range never lands on an orphaned jamo.
const HANGUL_START = 0xac00
const HANGUL_END = 0xd7a3
const TICK_MS = 80
const DURATION_MS = 2400
const STAGGER_MS = 64
const MAX_STAGGER_STEPS = 3

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const randomGlyph = () =>
  String.fromCodePoint(HANGUL_START + Math.floor(Math.random() * (HANGUL_END - HANGUL_START + 1)))

const splitGraphemes = (text) =>
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), (s) => s.segment)
    : Array.from(text)

function shuffled(count) {
  const indexes = Array.from({ length: count }, (_, i) => i)
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indexes[i], indexes[j]] = [indexes[j], indexes[i]]
  }
  return indexes
}

function isEligible(heading) {
  if (!heading.textContent?.trim()) return false
  if (heading.matches('[hidden], [aria-hidden="true"], [data-no-scramble]')) return false
  if (heading.closest('[hidden], dialog, [aria-hidden="true"], [data-no-scramble]')) return false
  const style = getComputedStyle(heading)
  return style.display !== 'none' && style.visibility !== 'hidden'
}

// Scrambles `heading`'s own text in place and returns a function that stops it, snapping
// immediately to the real text (used for cleanup on unmount or route change). Writes to each text
// node's own `nodeValue` rather than the heading's `textContent`, so any element in between —
// a <br>, say — is left alone instead of being flattened away.
function scramble(heading) {
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, {
    // Text inside a [data-no-scramble] element (the name's chroma wipe) stays as it is.
    acceptNode: (n) =>
      n.parentElement?.closest('[data-no-scramble]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  })
  const textNodes = []
  let node
  while ((node = walker.nextNode())) {
    if (node.nodeValue) textNodes.push(node)
  }
  if (!textNodes.length) return () => {}

  const finalValues = textNodes.map((n) => n.nodeValue)
  const graphemesPerNode = finalValues.map(splitGraphemes)
  const flat = []
  graphemesPerNode.forEach((graphemes, nodeIndex) => {
    graphemes.forEach((character) => flat.push({ nodeIndex, character }))
  })
  const revealOrder = shuffled(flat.length).filter((index) => !/\s/u.test(flat[index].character))
  if (!revealOrder.length) return () => {}

  const totalTicks = Math.max(1, Math.round(DURATION_MS / TICK_MS))
  const perTick = Math.max(1, Math.ceil(revealOrder.length / totalTicks))
  const locked = new Set()
  let cursor = 0

  const restore = () => textNodes.forEach((n, i) => (n.nodeValue = finalValues[i]))

  const render = () => {
    let flatIndex = 0
    graphemesPerNode.forEach((graphemes, nodeIndex) => {
      let value = ''
      for (const character of graphemes) {
        value += /\s/u.test(character) || locked.has(flatIndex) ? character : randomGlyph()
        flatIndex += 1
      }
      textNodes[nodeIndex].nodeValue = value
    })
  }

  const interval = window.setInterval(() => {
    for (let i = 0; i < perTick && cursor < revealOrder.length; i++, cursor++) {
      locked.add(revealOrder[cursor])
    }
    render()
    if (locked.size >= revealOrder.length) {
      window.clearInterval(interval)
      restore()
    }
  }, TICK_MS)

  return () => {
    window.clearInterval(interval)
    restore()
  }
}

export function HeadlineScramble() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return undefined
    if (prefersReducedMotion()) return undefined

    const stops = new Set()
    const timeouts = new Set()
    const seen = new WeakSet()

    const reveal = (heading) => {
      if (seen.has(heading) || prefersReducedMotion() || !isEligible(heading)) return
      seen.add(heading)
      stops.add(scramble(heading))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            observer.unobserve(entry.target)
            const timeout = window.setTimeout(() => {
              timeouts.delete(timeout)
              reveal(entry.target)
            }, Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS)
            timeouts.add(timeout)
          })
      },
      { rootMargin: '0px 0px -8%' },
    )

    document.querySelectorAll(HEADING_SELECTOR).forEach((heading) => {
      if (isEligible(heading)) observer.observe(heading)
    })

    return () => {
      observer.disconnect()
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
      timeouts.clear()
      stops.forEach((stop) => stop())
      stops.clear()
    }
  }, [pathname])

  return null
}

export default HeadlineScramble
