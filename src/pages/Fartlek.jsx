import { ProjectPage } from './ProjectPage'

// Ported from v2. (v2's first card also stacked face-shot.png under the timer
// video; the video covers it completely at 16:9, so only the video is used.)
export function Fartlek() {
  return (
    <ProjectPage
      slug="fartlek"
      heading="Fartlek"
      cards={[
        {
          video: '/video/fartlek-timer.mp4',
          copy: 'A minimal interval timer for set-based tasks.',
        },
        {
          video: '/video/fartlek-web.mp4',
          pingPong: true,
          copy: [
            "Sci-fi segment clock — three concentric rings: sets outside, work in the middle, rest inside. Each segment is one configured unit; spent segments go dark as you go, and the active phase's ring lights up in the set's color while the others recede.",
          ],
        },
        {
          video: '/video/fartlek.mp4',
          copy: (
            <>
              Visit{' '}
              <a href="https://www.fartlek.xyz/" target="_blank" rel="noreferrer" className="about__inline-link">
                fartlek.xyz
              </a>{' '}
              or get for{' '}
              {/* Placeholder destinations — swap for the real store listings once they're up. */}
              <a href="#" className="about__inline-link">
                Android
              </a>{' '}
              and{' '}
              <a href="#" className="about__inline-link">
                iOS
              </a>
              .
            </>
          ),
        },
      ]}
    />
  )
}

export default Fartlek
