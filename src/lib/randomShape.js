// Random chamfered-and-notched card outlines as responsive clip-paths — every card
// on every page gets its outline from here.
//
//   corners : one corner is cut at 45°, or two — and two are always on opposite
//             corners (top-left + bottom-right, or top-right + bottom-left)
//   notches : indentations with 45° sides — at most one on each side, and at most
//             three per card in all
//
// Every chamfer and every notch depth is exactly 0.5rem (8px at the default
// root size), so all the diagonals are 45° with 8px legs. What varies is which
// corners are cut, which sides get a notch, and the notches' inner lengths and
// positions.
//
// A notch's inner length is in "design px" multiplied by --k (one design px at the
// card's current size); its position along the edge is a percentage of the edge, so
// it holds its proportional place as the card resizes. Placement is planned against
// the smallest box the card can ever be in --k units (`w` x `h`) and the smallest
// --k it can have (`kMin`): larger cards only add slack, so nothing can collide.
// kMin matters because the 0.5rem legs are a fixed 8px — at small --k they are
// "longer" in --k units (8 / kMin), so the plan reserves that much room.
//
// Two polygons come back: the outline and the same shape inset by 1px (a miter
// offset), which layered draw a crisp 1px stroke.

const DEFAULT_W = 347
const DEFAULT_H = 463 // 3:4 — Coffee's cards
const DEFAULT_K_MIN = 0.6 // Coffee: a 208px-wide card at its narrowest is 208 / 347
const REM = 16 // design px per rem, for resolving geometry
const LEG = 0.5 // rem — chamfer size and notch depth
const LEG_PX = LEG * REM
const MARGIN = 16 // min clear space (--k units) between notches / a notch and a chamfer
const MAX_NOTCHES = 3 // per card, in all

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const fmt = (n) => String(Math.round(n * 100) / 100)

// An axis coordinate: 's' from the start edge, 'e' from the end edge, 'm' at a %
// of the axis. Each carries a length in --k units and/or in rem.
const S = (v = 0, rem = 0) => ({ t: 's', v, rem })
const E = (v = 0, rem = 0) => ({ t: 'e', v, rem })
const M = (p, o, rem = 0) => ({ t: 'm', p, o, rem })

function resolve(a, len) {
  if (a.t === 's') return a.v + a.rem * REM
  if (a.t === 'e') return len - (a.v + a.rem * REM)
  return (a.p / 100) * len + a.o + a.rem * REM
}

function expr(a, px = 0) {
  const sign = a.t === 'e' ? -1 : 1
  let out = a.t === 'e' ? '100%' : a.t === 'm' ? `${fmt(a.p)}%` : ''
  const add = (val, unit) => {
    if (Math.abs(val) < 0.005) return
    const txt = unit === 'k' ? `${fmt(Math.abs(val))} * var(--k)` : `${fmt(Math.abs(val))}${unit}`
    out = out ? `${out} ${val < 0 ? '-' : '+'} ${txt}` : val < 0 ? `-${txt}` : txt
  }
  add(a.t === 'm' ? a.o : sign * a.v, 'k')
  add(a.t === 'm' ? a.rem : sign * a.rem, 'rem')
  add(px, 'px')
  if (!out) return '0'
  return /^[\d.]+(%|rem|px)$/.test(out) ? out : `calc(${out})`
}

// Miter-offset a polygon inward by d (screen coords, y down).
export function insetPolygon(pts, d) {
  const n = pts.length
  let area = 0
  for (let i = 0; i < n; i++) {
    const p = pts[i]
    const q = pts[(i + 1) % n]
    area += p[0] * q[1] - q[0] * p[1]
  }
  const sign = area > 0 ? 1 : -1
  const normal = (a, b) => {
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy)
    return sign > 0 ? [-dy / len, dx / len] : [dy / len, -dx / len]
  }
  return pts.map((p, i) => {
    const n1 = normal(pts[(i - 1 + n) % n], p)
    const n2 = normal(p, pts[(i + 1) % n])
    const k = d / (1 + n1[0] * n2[0] + n1[1] * n2[1])
    return [(n1[0] + n2[0]) * k, (n1[1] + n2[1]) * k]
  })
}

// 1–3 notches in all, each on a different side (so never more than one per side).
function pickNotchCounts(rand) {
  const r = rand()
  const total = r < 0.25 ? 1 : r < 0.65 ? 2 : MAX_NOTCHES
  const sides = ['top', 'right', 'bottom', 'left']
  for (let i = sides.length - 1; i > 0; i--) { // shuffle
    const j = Math.floor(rand() * (i + 1))
    ;[sides[i], sides[j]] = [sides[j], sides[i]]
  }
  const counts = { top: 0, right: 0, bottom: 0, left: 0 }
  sides.slice(0, total).forEach((side) => { counts[side] = 1 })
  return counts
}

// One corner to cut, or two on opposite corners: TL + BR, or TR + BL.
function pickCorners(rand) {
  const cut = [false, false, false, false] // TL TR BR BL
  if (rand() < 0.35) {
    cut[Math.floor(rand() * 4)] = true
  } else {
    const [a, b] = rand() < 0.5 ? [0, 2] : [1, 3]
    cut[a] = true
    cut[b] = true
  }
  return cut
}

// Notches for one edge of length `len`, between corner chamfers of ca and cb
// design px. Returns [{ c, L }] ascending along the edge (c = center, L = inner
// length). The notch's full width is L + 2 legs.
function placeNotches(rand, len, ca, cb, count, leg) {
  const from = ca + MARGIN
  const span = len - cb - MARGIN - from
  let items = Array.from({ length: count }, () => {
    const L = (count === 2 ? 24 : 28) + Math.round(rand() * (count === 2 ? 70 : 130))
    return { L, T: L + 2 * leg }
  })
  while (items.length && items.reduce((s, i) => s + i.T, 0) + (items.length - 1) * MARGIN > span) {
    items = items.slice(0, -1)
  }
  if (!items.length) return []
  const free = span - items.reduce((s, i) => s + i.T, 0) - (items.length - 1) * MARGIN
  const cuts = [rand(), rand()].sort((a, b) => a - b)
  const before = items.length === 2 ? cuts[0] * free : rand() * free
  const between = items.length === 2 ? (cuts[1] - cuts[0]) * free : 0
  let cursor = from + before
  return items.map((it, i) => {
    const c = cursor + it.T / 2
    cursor += it.T + MARGIN + (i === 0 ? between : 0)
    return { c, L: it.L }
  })
}

// Decides which corners are cut and where the notches go (see the note at the top).
// Split from generateShape() so the rules can be checked directly.
export function planShape(seed, { w: W = DEFAULT_W, h: H = DEFAULT_H, kMin = DEFAULT_K_MIN } = {}) {
  const rand = rng(seed)
  const leg = LEG_PX / kMin // the 0.5rem leg, in --k units at the smallest --k
  let cut // which corners are chamfered: TL TR BR BL
  let notches
  // Re-roll if the space forced notches out and the card ended up with none.
  for (let attempt = 0; attempt < 50; attempt++) {
    cut = pickCorners(rand)
    const [tl, tr, br, bl] = cut.map((c) => (c ? leg : 0))
    const n = pickNotchCounts(rand)
    notches = {
      top: placeNotches(rand, W, tl, tr, n.top, leg),
      right: placeNotches(rand, H, tr, br, n.right, leg),
      bottom: placeNotches(rand, W, bl, br, n.bottom, leg),
      left: placeNotches(rand, H, tl, bl, n.left, leg),
    }
    if (Object.values(notches).reduce((sum, a) => sum + a.length, 0) >= 1) break
  }
  return { cut, notches, W, H }
}

// `h` is the card's minimum design height in --k units: width / --k is always
// >= 347, so a card of aspect ratio a is always >= 347 / a tall (463 for 3:4,
// 195 for 16:9). Pass it so features are planned inside the smallest box.
export function generateShape(seed, size) {
  const { cut, notches, W, H } = planShape(seed, size)
  const [tl, tr, br, bl] = cut
  const pts = [] // each: [xAnchor, yAnchor]
  const push = (x, y) => pts.push([x, y])
  const D = LEG // rem

  // clockwise from the top-left
  if (tl) { push(S(), S(0, D)); push(S(0, D), S()) } else push(S(), S())
  for (const { c, L } of notches.top) {
    const p = (c / W) * 100
    push(M(p, -L / 2, -D), S())
    push(M(p, -L / 2), S(0, D))
    push(M(p, L / 2), S(0, D))
    push(M(p, L / 2, D), S())
  }
  if (tr) { push(E(0, D), S()); push(E(), S(0, D)) } else push(E(), S())
  for (const { c, L } of notches.right) {
    const p = (c / H) * 100
    push(E(), M(p, -L / 2, -D))
    push(E(0, D), M(p, -L / 2))
    push(E(0, D), M(p, L / 2))
    push(E(), M(p, L / 2, D))
  }
  if (br) { push(E(), E(0, D)); push(E(0, D), E()) } else push(E(), E())
  for (const { c, L } of [...notches.bottom].reverse()) {
    const p = (c / W) * 100
    push(M(p, L / 2, D), E())
    push(M(p, L / 2), E(0, D))
    push(M(p, -L / 2), E(0, D))
    push(M(p, -L / 2, -D), E())
  }
  if (bl) { push(S(0, D), E()); push(S(), E(0, D)) } else push(S(), E())
  for (const { c, L } of [...notches.left].reverse()) {
    const p = (c / H) * 100
    push(S(), M(p, L / 2, D))
    push(S(0, D), M(p, L / 2))
    push(S(0, D), M(p, -L / 2))
    push(S(), M(p, -L / 2, -D))
  }

  const resolved = pts.map(([x, y]) => [resolve(x, W), resolve(y, H)])
  const off = insetPolygon(resolved, 1)
  const outer = pts.map(([x, y]) => `${expr(x)} ${expr(y)}`).join(', ')
  const inner = pts.map(([x, y], i) => `${expr(x, off[i][0])} ${expr(y, off[i][1])}`).join(', ')
  // The border as one polygon: the outline, then — through a zero-width seam from its first
  // vertex — the inset outline walked the other way round, which cuts it out (nonzero winding).
  const outerPts = outer.split(', ')
  const innerPts = inner.split(', ')
  const ring = [...outerPts, outerPts[0], innerPts[0], ...innerPts.slice(1).reverse(), innerPts[0]]
  return {
    '--shape': `polygon(${outer})`,
    '--shape-inner': `polygon(${inner})`,
    '--shape-ring': `polygon(${ring.join(', ')})`,
  }
}
