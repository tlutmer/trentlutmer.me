import { P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

export function Fartlek() {
  return (
    <ProjectSplit
      title="Fartlek"
      lead="Swedish for “speed play.”"
      info={[
        { label: 'About', value: 'An interval timer for cross-country-style training: sets of work and rest, with a sci-fi segment clock for the same sets.' },
        {
          label: 'Get it',
          value: (
            <a href="https://www.fartlek.xyz/" target="_blank" rel="noreferrer" className="about__inline-link" tabIndex={0}>
              fartlek.xyz<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ),
        },
      ]}
      media={[
        { video: '/media/fartlek/fartlek-timer.mp4' },
        { video: '/media/fartlek/fartlek-web.mp4', pingPong: true },
        { video: '/media/fartlek/fartlek.mp4' },
      ]}
    >
      <Paragraphs>
        <P>
          Fartlek is Swedish for “speed play.” It's a cross-country training
          method where you mix hard efforts and easy recovery in repeated intervals, instead of holding
          one steady pace.
        </P>
        <P>
          Fartlek the app is a minimal interval timer that supports that kind of workout. Set how long you
          work, how long you rest and how many times to repeat, and it keeps count so you can keep running.
        </P>
        <P>
          Sci-fi segment clock — three concentric rings: sets outside, work in the middle, rest inside.
          Each segment is one configured unit; spent segments go dark as you go, and the active phase's
          ring lights up in the set's color while the others recede.
        </P>
        <P>
          Visit{' '}
          <a href="https://www.fartlek.xyz/" target="_blank" rel="noreferrer" className="about__inline-link" tabIndex={0}>
            fartlek.xyz<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
          {/* Android and iOS store links are hidden until the real listings are up. */}
        </P>
      </Paragraphs>
    </ProjectSplit>
  )
}

export default Fartlek
