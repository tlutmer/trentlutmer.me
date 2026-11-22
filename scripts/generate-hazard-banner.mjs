// Writes public/media/ztc/ibm-ns1-ztc-hazard-banner.svg: a sci-fi "STATUS: PENDING / ON DECK / CODE: 010" hazard
// banner (recreated from a supplied reference image reading "CONDITION: RED / EMERGENCY /
// CODE: 102" — the wording here is Zero Trust Connect's own, a project on deck rather than live),
// as a generated vector asset instead of a traced
// raster copy — crisp at any size, and its geometry (stripe angle, chevron mirror, text repeats)
// is exact/reproducible rather than eyeballed. Run `npm run hazard-banner` again only after
// changing the design or the colours below, and commit the result.
import { writeFileSync } from 'node:fs'

// Colours sampled from the reference: a near-black warm ground, an amber stripe/text colour and a
// red border — all literals (not Kelex tokens): the banner is its own fixed graphic, styled the
// same in every site theme, like the Kelex logo card's fill (see --card-fill-logo in index.css).
const BG = '#0c0301'
const AMBER = '#eeab3d'
const AMBER_DIM = '#3a2308'
const RED = '#c93524'

// The whole banner, in its own coordinate space (roughly the "wide" bento card's own 2:1 shape, so
// little of it is cropped away by object-fit: cover at its actual display size).
const W = 900
const H = 440
const BAND_H = 132 // top/bottom stripe bands
const STRIPE = 34 // one diagonal stripe's period (dark + amber)
const RIB = 4 // the horizontal "ribbing" inside each amber stripe

// One label block: STATUS: PENDING / ON DECK / CODE: 010, centred at (cx, cy).
function block(cx, cy) {
  return `
  <text x="${cx}" y="${cy - 34}" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-weight="700" font-size="16" letter-spacing="2" fill="${AMBER}">STATUS: PENDING</text>
  <text x="${cx}" y="${cy + 20}" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-weight="700" font-size="56" letter-spacing="4" fill="${AMBER}">ON DECK</text>
  <text x="${cx}" y="${cy + 58}" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-weight="700" font-size="16" letter-spacing="2" fill="${AMBER}">CODE: 010</text>`
}

const REPEATS = 2
const midY = H / 2
const blocks = Array.from({ length: REPEATS }, (_, i) => block(((i + 0.5) * W) / REPEATS, midY)).join('')

// One stripe band, its chevron apex at the centre: the right half is the left half mirrored
// (transform="translate(W,0) scale(-1,1)"), so the two meet exactly at the midline — a true
// reflection needs no seam arithmetic. `y` is the band's own top edge.
function band(y) {
  return `
  <g>
    <clipPath id="band-clip-${y}"><rect x="0" y="${y}" width="${W}" height="${BAND_H}" /></clipPath>
    <g clip-path="url(#band-clip-${y})">
      <rect x="0" y="${y}" width="${W / 2}" height="${BAND_H}" fill="url(#stripes)" />
      <rect x="0" y="${y}" width="${W / 2}" height="${BAND_H}" fill="url(#stripes)" transform="translate(${W},0) scale(-1,1)" />
    </g>
  </g>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Status pending, on deck, code 010">
  <defs>
    <pattern id="rib" width="${RIB}" height="${RIB}" patternUnits="userSpaceOnUse">
      <rect width="${RIB}" height="${RIB}" fill="${AMBER}" />
      <rect width="${RIB}" height="1" fill="${AMBER_DIM}" />
    </pattern>
    <pattern id="stripes" width="${STRIPE}" height="${STRIPE}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="${STRIPE}" height="${STRIPE}" fill="${BG}" />
      <rect width="${STRIPE / 2}" height="${STRIPE}" fill="url(#rib)" />
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}" />
  ${band(0)}
  ${band(H - BAND_H)}

  <rect x="6" y="${BAND_H + 6}" width="${W - 12}" height="${H - 2 * BAND_H - 12}" rx="10" fill="${BG}" stroke="${RED}" stroke-width="3" />
  <g>
    <clipPath id="text-clip"><rect x="6" y="${BAND_H + 6}" width="${W - 12}" height="${H - 2 * BAND_H - 12}" rx="10" /></clipPath>
    <g clip-path="url(#text-clip)">${blocks}</g>
  </g>
</svg>
`

writeFileSync('public/media/ztc/ibm-ns1-ztc-hazard-banner.svg', svg)
console.log('wrote public/media/ztc/ibm-ns1-ztc-hazard-banner.svg')
