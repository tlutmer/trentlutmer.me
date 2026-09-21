import { Figure as CaseFigure, Hero, P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { ProjectNav } from './ProjectPage'

// Ported from trentlutmer.me (docs/coachteach.html): the same copy and the same six photos in the
// same order, set in v4's structure — the shared 800px column, Kelex type, themed colours, and a
// plain card for every photo that opens in the lightbox (see components/CaseStudy). Each card
// keeps its photo's own proportions (w x h, in pixels of the file), so nothing is cropped.
const IMAGES = {
  spring2025Team: { src: '/images/coachteach/spring-2025-team.jpg', w: 2400, h: 1350, alt: 'Spring 2025 cohort team photo' },
  spring2025: { src: '/images/coachteach/spring-2025.jpg', w: 2400, h: 1350, alt: 'Spring 2025 class in session' },
  spring2024Team: { src: '/images/coachteach/spring-2024-team.jpg', w: 1600, h: 1200, alt: 'Spring 2024 cohort team photo' },
  spring2024: { src: '/images/coachteach/spring-2024.jpg', w: 2400, h: 1350, alt: 'Spring 2024 class in session' },
  fall2023Team: { src: '/images/coachteach/fall-2023-team.jpg', w: 1080, h: 1080, alt: 'Fall 2023 cohort team photo' },
  fall2023: { src: '/images/coachteach/fall-2023.jpg', w: 2400, h: 1350, alt: 'Fall 2023 class in session' },
}

const Figure = ({ image }) => <CaseFigure image={IMAGES[image]} />

export function CoachingTeaching() {
  return (
    <main id="main-content">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content project">
          <Hero title="Coaching and teaching" lead="Teaching and coaching university students" />

          <Paragraphs>
            <P>
              Over the years, I've spent time with the University of Texas and Colorado State
              University teaching and coaching advanced design thinking classes.
            </P>
          </Paragraphs>

          <Figure image="spring2025Team" />
          <Figure image="spring2025" />
          <Figure image="spring2024Team" />
          <Figure image="spring2024" />
          <Figure image="fall2023Team" />
          <Figure image="fall2023" />

          <ProjectNav currentSlug="coaching" />
        </div>
      </div>
    </main>
  )
}

export default CoachingTeaching
