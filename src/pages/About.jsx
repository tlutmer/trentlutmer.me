import { BentoCard } from '../components/BentoCard/BentoCard'
import { Hero } from '../components/Hero/Hero'
import { Typography } from '../components/Typography/Typography'

// The nav's "Info" link lands here. Full width, laid out like the homepage: the intro line is the page's
// <h1> (header-1, a 60rem measure), then a photo bento on the homepage's grid
// (the same six cells a–f, each with its own generated outline), arranged as
//   d small portrait  a wide (rock spires)
//   c large text      b tall (sushi, framed whole on grey-700 with 1rem at each side)
//   f wide (orbit diagram)  e small (the pug)
// The text card carries the rest of v2's text cards as paragraphs
// (same copy, same order).
const TEXT = [
  "I was born in Seoul, South Korea, and adopted. I grew up in Minnesota with a bucket of crayons, Lego, and sci-fi mystery books. I'm fond of baking, hiking, and coffee. After living in six states, I'm now in Austin with my pug, working as a designer at IBM.",
  "I've worked at early-stage companies, start-ups, and enterprises like Hewlett-Packard, Radar, and FiscalNote.",
  'These days my work focuses on strategy, radical thinking, and systems design. I design by tapping into our shared visceral, innate feelings, challenging assumptions, and grounding ideas in reality, turning intent into lasting, practical outcomes.',
  <p lang="ko">감사합니다</p>,
]

export function About() {
  return (
    <main id="main-content" className="about page--full">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <Hero />

          <div className="bento-wrap">
            <div className="bento-12 bento-12--info">
              <BentoCard area="c" shape="about-c" body={TEXT} />
              <BentoCard
                area="b"
                shape="about-b"
                image="/media/info/info-headshot-padded.jpg"
                alt="A black-and-white portrait of Trent in a dark button-up shirt and glasses, looking off to the side with his hands clasped at his wrist."
                imagePosition="50% 20%"
                crt={false}
              />
            </div>
          </div>

          {/* Moved here from the Work page: the writing and the teaching, two small cards. */}
          <Typography as="h3" variant="header-3" className="bento-section-title">
            Writing, coaching, and teaching
          </Typography>
          <div className="bento-wrap">
            <div className="bento-more">
              <BentoCard
                area="j"
                shape="work-j"
                to="/coaching-and-teaching"
                title="Coaching and teaching"
                image="/media/coachteach/coaching-and-teaching-spring-2024.jpg"
                alt="The spring 2024 cohort gathered around a whiteboard as one student points out a note."
                crt={false}
              />
              <BentoCard
                area="n"
                shape="work-n"
                to="/job-hunt"
                title="Design your job hunt"
                image="/media/job-hunt/job-hunt-resume.png"
                alt="A 2011 résumé: a black circle with the initials TL beside the name Trent Lutmer, web and graphic designer, above sections for objective, software proficiencies, extracurricular activities, experience, education and skills."
                crt={false}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
