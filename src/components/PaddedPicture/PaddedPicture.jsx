// A picture or GIF shown smaller inside a box the size of the picture cards beside it (16:9 by
// default): the same outline and fill, with padding around the picture. `padding` is a CSS length
// (default 3rem); `width` (optional) sets the picture's width as a share of the box, e.g. '50%'; `ratio` is the box's [w, h], and `size` the picture's own [w, h] in pixels.
// Click opens it larger in the lightbox (ZoomButton). For a ProjectSplit `{ component }` entry. Styles: .padded-picture* in site-nav.css.
import { ZoomButton } from '../ZoomButton/ZoomButton'

export function PaddedPicture({ src, alt = '', size, ratio = [16, 9], padding = '3rem', width }) {
  const box = (
    <div
      className="padded-picture"
      data-sized={width ? '' : undefined}
      style={{ aspectRatio: `${ratio[0]} / ${ratio[1]}`, '--padded-picture-pad': padding, ...(width ? { '--padded-picture-w': width } : {}) }}
    >
      <img
        className="padded-picture__media"
        src={src}
        alt={alt}
        width={size?.[0]}
        height={size?.[1]}
      />
    </div>
  )
  return <ZoomButton src={src} alt={alt}>{box}</ZoomButton>
}

export default PaddedPicture
