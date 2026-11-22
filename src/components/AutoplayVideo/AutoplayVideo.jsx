import { useState } from 'react'
import { useKeepPlaying } from '../../lib/useKeepPlaying'

// A GIF replacement: a muted, always-autoplaying, always-looping video (no controls).
export function AutoplayVideo({ src, className, width, height, label, ...rest }) {
  const [el, setEl] = useState(null)
  useKeepPlaying(el)
  return (
    <video
      ref={setEl}
      className={className}
      src={src}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      {...rest}
    />
  )
}

export default AutoplayVideo
