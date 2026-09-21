import { gsap } from 'gsap'

// "Stroke n' fade": a 1px outline draws itself around a shape while the shape's
// fill fades in, then the outline drops away. The dash keyframes and timings are
// the original effect's, unchanged — the path is normalised to pathLength 256, so
// the same keyframes drive a stroke of any length (the original was a 64px square;
// here it's whatever a card's outline measures).
//
// `at` is milliseconds; the dash is `length` long and starts `start` along the path.
const DASH_KEYFRAMES = [
  { at: 70, start: 64, length: 0 },
  { at: 100, start: 88, length: 33 },
  { at: 130, start: 107, length: 58 },
  { at: 170, start: 123, length: 79 },
  { at: 200, start: 136, length: 99 },
  { at: 230, start: 149, length: 115 },
  { at: 270, start: 160, length: 130 },
  { at: 300, start: 170, length: 144 },
  { at: 330, start: 180, length: 155 },
  { at: 370, start: 188, length: 167 },
  { at: 400, start: 195, length: 178 },
  { at: 430, start: 202, length: 187 },
  { at: 470, start: 209, length: 195 },
  { at: 500, start: 215, length: 203 },
  { at: 530, start: 220, length: 210 },
  { at: 570, start: 225, length: 217 },
  { at: 600, start: 229, length: 222 },
  { at: 630, start: 233, length: 228 },
  { at: 670, start: 237, length: 232 },
  { at: 700, start: 240, length: 237 },
  { at: 730, start: 243, length: 240 },
  { at: 770, start: 246, length: 243 },
  { at: 800, start: 248, length: 247 },
  { at: 830, start: 250, length: 249 },
  { at: 870, start: 252, length: 250 },
  { at: 900, start: 252, length: 250 },
]

const SETTLED_AT = 1070 // ms — the stroke is gone, the fill fully in
const PATH_LENGTH = 256

// Builds (and plays) the timeline.
//   stroke : the <path> being drawn        fill : the element whose opacity fades in
//   frame  : the card's permanent outline, which takes over from the stroke
// The stroke and the permanent outline trace the same line, so the hand-off at
// SETTLED_AT is seamless.
export function playStrokeNFade({ stroke, fill, frame, onComplete }) {
  const first = DASH_KEYFRAMES[0]
  const timeline = gsap.timeline({ onComplete })

  timeline.set(fill, { opacity: 0 }, 0)
  timeline.set(frame, { opacity: 0 }, 0)
  timeline.set(
    stroke,
    {
      opacity: 1,
      strokeDasharray: `${first.length} ${PATH_LENGTH - first.length}`,
      strokeDashoffset: -first.start,
    },
    first.at / 1000,
  )

  for (let i = 1; i < DASH_KEYFRAMES.length; i += 1) {
    const previous = DASH_KEYFRAMES[i - 1]
    const keyframe = DASH_KEYFRAMES[i]
    timeline.to(
      stroke,
      {
        strokeDasharray: `${keyframe.length} ${PATH_LENGTH - keyframe.length}`,
        strokeDashoffset: -keyframe.start,
        duration: (keyframe.at - previous.at) / 1000,
        ease: 'none',
      },
      previous.at / 1000,
    )
  }

  timeline.to(fill, { opacity: 1, duration: 0.67, ease: 'none' }, 0.4)
  timeline.set(stroke, { opacity: 0 }, SETTLED_AT / 1000)
  timeline.set(frame, { opacity: 1 }, SETTLED_AT / 1000)

  return timeline
}

export { PATH_LENGTH }
