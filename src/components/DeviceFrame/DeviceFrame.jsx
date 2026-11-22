// A picture or GIF shown on a phone: a dark bezel with rounded corners, a dynamic-island pill and the
// picture filling the screen. Sized by its width (default 16rem) and centered; the screen takes the
// picture's own proportions, `ratio` being [w, h] in pixels of the file. Styles: .device-frame* in
// site-nav.css. Click opens the picture larger in the lightbox (ZoomButton). For a ProjectSplit
// `{ component }` entry.
import { ZoomButton } from '../ZoomButton/ZoomButton'

export function DeviceFrame({ src, alt = '', ratio = [1179, 2556], width = '16rem' }) {
  const frame = (
    <div className="device-frame" style={{ '--device-w': width }}>
      <div className="device-frame__body">
        <span className="device-frame__island" aria-hidden="true" />
        <img
          className="device-frame__screen"
          src={src}
          alt={alt}
          width={ratio[0]}
          height={ratio[1]}
          style={{ aspectRatio: `${ratio[0]} / ${ratio[1]}` }}
        />
      </div>
    </div>
  )
  return <ZoomButton src={src} alt={alt}>{frame}</ZoomButton>
}

export default DeviceFrame
