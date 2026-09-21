import { insetPolygon } from './randomShape'

// Splits on `sep` only at parenthesis depth 0 (calc() contains spaces and commas).
function splitTop(str, sep) {
  const parts = []
  let depth = 0
  let cur = ''
  for (const ch of str) {
    if (ch === '(') depth += 1
    if (ch === ')') depth -= 1
    if (ch === sep && depth === 0) {
      parts.push(cur)
      cur = ''
    } else cur += ch
  }
  parts.push(cur)
  return parts.filter((p) => p !== '')
}

// An SVG path that traces a card's outline at its current size.
//
// A card's silhouette is a CSS clip-path polygon whose vertices are calc()
// expressions in %, rem and --k — resolvable only by the browser's layout. So
// this lets the browser do it: drop a zero-size probe at each vertex (left/top
// set to the vertex's own expressions, inside the card, whose padding box is the
// clip-path's reference box) and read back where it landed. The polygon is then
// inset by half a pixel, so a 1px stroke along it sits exactly on the card's
// permanent outline (which is the band between the outer shape and the shape
// inset 1px).
export function measureOutlinePath(card) {
  const value = getComputedStyle(card).getPropertyValue('--shape').replace(/\s+/g, ' ').trim()
  if (!value.startsWith('polygon(')) return null

  const args = value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
  const vertices = splitTop(args, ',').map((v) => splitTop(v.trim(), ' '))

  const box = card.getBoundingClientRect()
  const probes = vertices.map(([x, y]) => {
    const probe = document.createElement('span')
    probe.style.cssText = `position:absolute;left:${x};top:${y};width:0;height:0;visibility:hidden;pointer-events:none`
    return probe
  })
  const fragment = document.createDocumentFragment()
  probes.forEach((probe) => fragment.appendChild(probe))
  card.appendChild(fragment)
  const points = probes.map((probe) => {
    const r = probe.getBoundingClientRect()
    return [r.left - box.left, r.top - box.top]
  })
  probes.forEach((probe) => probe.remove())

  const off = insetPolygon(points, 0.5)
  const d =
    points
      .map(([x, y], i) => `${i ? 'L' : 'M'}${(x + off[i][0]).toFixed(2)} ${(y + off[i][1]).toFixed(2)}`)
      .join('') + 'Z'
  return { d, width: box.width, height: box.height }
}
