import { useEffect } from 'react'

// Reverse-seek rate. Video decoders aren't built for arbitrary seeks at a high
// frequency — seeking on every animation frame (~60/s) causes flashing (the
// decoder can't keep decoding/painting fresh frames that fast for an ordinary
// web-encoded mp4). This throttles it to a rate that stays smooth in practice.
const REVERSE_STEPS_PER_SECOND = 12
const REVERSE_STEP_INTERVAL = 1000 / REVERSE_STEPS_PER_SECOND

// Ported from v2's PingPongVideo: plays a video forward, then reverses back to
// the start, then repeats — forever. Video elements can't play backward
// natively (a negative playbackRate isn't supported in any current browser), so
// only the reverse leg is faked, by throttled manual seeking; forward playback is
// the browser's own native decode. The element must NOT have `loop` set.
export function usePingPong(video, enabled) {
  useEffect(() => {
    if (!video || !enabled) return undefined

    let rafId = null
    let lastStepTime = 0

    function reverseStep(timestamp) {
      if (timestamp - lastStepTime < REVERSE_STEP_INTERVAL) {
        rafId = requestAnimationFrame(reverseStep)
        return
      }
      lastStepTime = timestamp

      const next = video.currentTime - REVERSE_STEP_INTERVAL / 1000
      if (next <= 0) {
        video.currentTime = 0
        // Wait for the seek to actually land before resuming forward playback —
        // calling .play() in the same tick as the seek gets silently dropped in
        // some browsers, which made the cycle play once and then stop.
        video.addEventListener('seeked', () => video.play().catch(() => {}), { once: true })
        return
      }
      video.currentTime = next
      rafId = requestAnimationFrame(reverseStep)
    }

    function handleEnded() {
      lastStepTime = 0
      rafId = requestAnimationFrame(reverseStep)
    }

    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('ended', handleEnded)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [video, enabled])
}
