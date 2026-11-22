import { ChromaWipeSwap } from '../ChromaWipeSwap/ChromaWipeSwap'
import { ContactLinks } from '../ContactLinks/ContactLinks'
import { Typography } from '../Typography/Typography'

// The hero block shared by Home and Info: one source, so the two pages can't drift apart.
// `contact` shows the Resume / Github / Email / LinkedIn row (Info only; Home turns it off).
export function Hero({ contact = true }) {
  return (
    <div className="about__card--work">
      <div className="about__body-wrap">
        <Typography as="h1" variant="header-1" className="about__headline">
          <span className="about__headline-line">
            Hey, I'm{' '}
            {/* The name keeps its chroma wipe into Korean on hover; the scramble leaves it alone. */}
            <span className="about__name" data-no-scramble>
              <ChromaWipeSwap text="Trent Lutmer" alt="트랜트 루트머" />
            </span>
            .
          </span>
          <span className="about__headline-line">
            I'm a lead designer and developer with 15+ years of experience.
          </span>
          <span className="about__headline-line">
            Currently helping companies materialize their ideas into lasting, practical outcomes.
          </span>
        </Typography>
        {contact && <ContactLinks />}
      </div>
    </div>
  )
}
