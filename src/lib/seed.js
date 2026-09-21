// A stable per-page seed, so each page's cards keep the same generated outlines on reload.
export const seedFor = (slug) => [...slug].reduce((n, ch) => n * 31 + ch.charCodeAt(0), 7) >>> 0
