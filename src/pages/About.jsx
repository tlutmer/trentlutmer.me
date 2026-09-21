import { BentoCard } from '../components/BentoCard/BentoCard'
import { bentoShapes } from '../lib/bentoShapes'
import { seedFor } from '../lib/seed'
import { Typography } from '../components/Typography/Typography'

// The nav's "Info" link lands here. A heading, then a photo bento on the homepage's grid
// (the same six cells a–f, each with its own generated outline), arranged as
//   d small portrait  a wide (rock spires)
//   c large text      b tall (sushi, framed whole on grey-700 with 1rem at each side)
//   f wide (orbit diagram)  e small (the pug)
// The heading is the intro line (an <h2>; the page's <h1> is the visually hidden "Info"); the text card carries the rest of v2's text cards as paragraphs
// (same copy, same order).
const TEXT = [
  "I've worked at various early-stage companies, start-ups, and enterprises like IBM, Hewlett-Packard, Radar, FiscalNote, and many more.",
  'These days my work focuses on strategy, radical thinking, and systems design. I design by tapping into our shared visceral, innate feelings, challenging assumptions, and grounding ideas in reality — turning intent into lasting, practical outcomes.',
  '감사합니다',
]

const SHAPES = bentoShapes(seedFor('about'))

export function About() {
  return (
    <main id="main-content">
      <h1 className="sr-only">Info</h1>
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <div className="about__card--page">
            <div className="about__body-wrap">
              <Typography variant="header-2">
                Currently residing in Texas, I'm a lead designer and developer with over 15 years of
                experience crafting unique experiences.
              </Typography>
            </div>
          </div>

          <div className="bento-wrap">
            <div className="bento bento--info">
              <BentoCard
                area="d" shapeVars={SHAPES.d}
                image="/images/info/me-portrait.png"
                alt="A pixel-art portrait of Trent wearing round glasses"
                imagePosition="50% 91%"
                className="card--illustration"
              />
              <BentoCard
                area="a"
                shapeVars={SHAPES.a}
                image="/images/info/IMG_2815-wide.jpg"
                alt="Tall granite spires and pine trees under a clear blue sky."
              />
              <BentoCard area="c" shapeVars={SHAPES.c} body={TEXT} />
              <BentoCard
                area="b"
                shapeVars={{ ...SHAPES.b, '--card-fill': 'var(--grey-700, #232426)' }}
                image="/images/info/sushi.jpg"
                alt="A single piece of nigiri topped with green herbs on a green ceramic plate at a sushi counter, with chefs blurred behind it."
                inset="1rem"
                ratio={[1200, 1600]}
              />
              <BentoCard
                area="f"
                shapeVars={SHAPES.f}
                image="/images/info/tile-02.jpg"
                alt="A technical diagram of concentric orbits around a degree scale, with a red dashed trajectory ending at a circled point, a cyan “Lower orbit” label, and notes on payload, fuel, acceleration and exhaustion momentum."
              />
              <BentoCard
                area="e"
                shapeVars={SHAPES.e}
                image="/images/info/IMG_2405.jpg"
                alt="A fawn pug with a black mask lying on the arm of a dark couch, looking at the camera"
                imagePosition="42% 40%"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
