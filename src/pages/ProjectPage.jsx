import { Link, useNavigate } from 'react-router-dom'
import { BentoCard } from '../components/BentoCard/BentoCard'
import { Typography } from '../components/Typography/Typography'

// Every project page v4 has so far, so "Next project" has somewhere else to go.
const PROJECT_PAGES = [
  { slug: 'kelex', to: '/kelex' },
  { slug: 'fartlek', to: '/fartlek' },
  { slug: 'carbon', to: '/carbon' },
  { slug: 'saas-console', to: '/ibm-saas-console' },
  { slug: 'coaching', to: '/coaching-and-teaching' },
]

// Back to Work on the left, a random *other* project page on the right —
// shared by every project page (ported from v2's ProjectShowcase).
export function ProjectNav({ currentSlug }) {
  const navigate = useNavigate()

  function goToRandomProject() {
    const others = PROJECT_PAGES.filter((page) => page.slug !== currentSlug)
    const next = others[Math.floor(Math.random() * others.length)]
    navigate(next.to)
  }

  return (
    <div className="project-nav">
      <Link to="/" className="project-nav__link">
        Back to work page
      </Link>
      <button type="button" className="project-nav__link" onClick={goToRandomProject}>
        Next project
      </button>
    </div>
  )
}

// `copy` is a single paragraph — a string, or a React node for inline links
// mixed into the sentence — or a bullet list (string[]); falsy renders nothing.
function CardCopy({ copy }) {
  if (!copy) return null
  if (Array.isArray(copy)) {
    return (
      <ul className="work-project__list">
        {copy.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    )
  }
  return (
    <Typography variant="paragraph" className="work-project__copy">
      {copy}
    </Typography>
  )
}

// v2's project page — heading, then a stack of media cards each with its copy,
// then Back / Next — in v4's structure: the shared 800px content column and
// outlined cards. The cards are plain rectangles (no generated chamfer/notch mask) and open
// their picture full page in the Modal when clicked.
//
// `cards`: [{ image?, video?, pingPong?, fit?, fill?, ratio?, alt?, copy? }] — `fill` pins the
// card's background (visible as letterbox bars when fit is 'contain'); by default it
// follows the theme. Cards are 16:9 unless `ratio: [w, h]` gives the picture's own proportions.
export function ProjectPage({ slug, heading, cards }) {
  return (
    <main id="main-content">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content project">
          <Typography as="h1" variant="header-1">
            {heading}
          </Typography>

          {cards.map((card, i) => (
            <div key={`${slug}-${i}`} className="project__item">
              <div className="project-media">
                <BentoCard
                  plain
                  lightbox
                  shapeVars={{
                    ...(card.fill && { '--card-fill': card.fill }),
                    ...(card.ratio && { aspectRatio: `${card.ratio[0]} / ${card.ratio[1]}` }),
                  }}
                  image={card.image}
                  video={card.video}
                  pingPong={card.pingPong}
                  fit={card.fit}
                  alt={card.alt}
                />
              </div>
              <CardCopy copy={card.copy} />
            </div>
          ))}

          <ProjectNav currentSlug={slug} />
        </div>
      </div>
    </main>
  )
}

export default ProjectPage
