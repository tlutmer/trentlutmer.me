import { useEffect } from 'react'

// Keeps a muted looping <video> playing like a GIF would: starts it as soon as it can, restarts it
// if the browser pauses it (tab switch, scrolled off-screen and back, power saving), and retries on
// the first touch/click/key for browsers that block autoplay until a gesture. Never gives up.
export function useKeepPlaying(video) {
  useEffect(() => {
    if (!video) return undefined
    video.muted = true
    video.loop = true
    const play = () => {
      const p = video.play()
      if (p && p.catch) p.catch(() => {})
    }
    const onPause = () => {
      if (!document.hidden) play()
    }
    const onVisible = () => {
      if (!document.hidden) play()
    }
    let io = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) play()
      })
      io.observe(video)
    }
    const gesture = ['pointerdown', 'touchstart', 'keydown', 'scroll']
    gesture.forEach((t) => window.addEventListener(t, play, { passive: true }))
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', play)
    document.addEventListener('visibilitychange', onVisible)
    play()
    return () => {
      io?.disconnect()
      gesture.forEach((t) => window.removeEventListener(t, play))
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', play)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [video])
}
