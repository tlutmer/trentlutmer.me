import { BentoCard } from '../components/BentoCard/BentoCard'
import { bentoShapes } from '../lib/bentoShapes'
import { seedFor } from '../lib/seed'
import { Typography } from '../components/Typography/Typography'

// v2's Work-page headline (AboutBio), set in Kelex's type scale via Typography
// (header-2 = 24px IBM Plex Mono, an <h2> — the page's <h1> is the visually hidden "Work").
function AboutHeadline() {
  return (
    <div className="about__body-wrap">
      <Typography variant="header-2" className="about__headline">
        I'm a lead product designer, educator, and coach with 15+ years of experience. I help
        companies create experiences that struggle turning good ideas into lasting, practical
        outcomes.
      </Typography>
    </div>
  )
}

const SHAPES = bentoShapes(seedFor('work'))

export function Home() {
  return (
    <main id="main-content" className="home">
      <h1 className="sr-only">Work</h1>
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <div className="about__card--work">
            <AboutHeadline />
          </div>

          <div className="bento-wrap">
            <div className="bento">
              <BentoCard area="a" shapeVars={SHAPES.a} title="Zero Trust Connect" />
              <BentoCard
                area="b"
                shapeVars={SHAPES.b}
                to="/fartlek"
                title="Fartlek"
                video="/video/fartlek-timer.mp4"
              />
              <BentoCard
                area="c"
                shapeVars={SHAPES.c}
                to="/kelex"
                title="Kelex"
                video="/video/kelex-highlight.mp4"
              />
              <BentoCard
                area="d"
                shapeVars={SHAPES.d}
                to="/coaching-and-teaching"
                title="Coaching and teaching"
                image="/images/coachteach/spring-2025-team.jpg"
                alt="The spring 2025 cohort standing at whiteboards covered in sticky notes."
              />
              <BentoCard
                area="e"
                shapeVars={SHAPES.e}
                to="/carbon"
                title="Carbon Libraries"
                image="/images/carbon/001-carbon.jpg"
                alt="Carbon for IBM Products components in a light and a dark theme: a card, status icons, a toolbar and a side navigation."
              />
              <BentoCard
                area="f"
                shapeVars={SHAPES.f}
                to="/ibm-saas-console"
                title="SaaS Console"
                image="/images/mcsp-iam/002-iam.jpg"
                alt="The IBM SaaS Console on a laptop: an Access management page with a list of users, and a user's details open in a panel over it."
                imagePosition="50% 35%"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
