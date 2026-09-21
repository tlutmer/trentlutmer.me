import { BentoCard } from '../BentoCard/BentoCard'
import { Typography } from '../Typography/Typography'

// Building blocks for the long-form case-study pages (Carbon, IBM SaaS Console), so they share
// one layout: the 800px column, Kelex type (IBM Plex Mono via Typography), themed colours, and
// an outlined card for every image. Styles: the `.case__*` rules in site-nav.css.

// One image in an outlined card at the image's own aspect ratio, so nothing is cropped. `image`
// is { src, w, h, alt } (w x h in pixels of the original). The card is a plain rectangle (no
// generated mask) and opens the picture full page in the Modal when clicked.
export function Figure({ image }) {
  const { src, w, h, alt } = image
  return (
    <div className="project-media">
      <BentoCard
        plain
        lightbox
        shapeVars={{ aspectRatio: `${w} / ${h}` }}
        image={src}
        alt={alt}
      />
    </div>
  )
}

export function Bullets({ items }) {
  return (
    <ul className="case__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

// A run of paragraphs and bullet lists, spaced as one block.
export function Paragraphs({ children }) {
  return <div className="case__text">{children}</div>
}

export function P({ children }) {
  return (
    <Typography variant="paragraph" className="work-project__copy">
      {children}
    </Typography>
  )
}

// A section's small label above its heading.
export function SectionHead({ subhead, title }) {
  return (
    <div className="case__head">
      <Typography variant="label" className="case__subhead">
        {subhead}
      </Typography>
      <Typography as="h2" variant="header-2">
        {title}
      </Typography>
    </div>
  )
}

export function Section({ subhead, title, children }) {
  return (
    <div className="case__section">
      <SectionHead subhead={subhead} title={title} />
      <Paragraphs>{children}</Paragraphs>
    </div>
  )
}

export function Hero({ title, readTime, lead }) {
  return (
    <div className="case__hero">
      <Typography as="h1" variant="header-1">
        {title}
      </Typography>
      {readTime && (
        <Typography variant="label" className="case__subhead">
          {readTime}
        </Typography>
      )}
      <Typography as="p" variant="header-3" className="case__lead">
        {lead}
      </Typography>
    </div>
  )
}

// Two or three short bulleted lists side by side (stacked on a phone):
// groups = [{ title, items }].
export function Facts({ groups }) {
  return (
    <div className="case__facts" style={{ '--cols': groups.length }}>
      {groups.map((group) => (
        <div key={group.title} className="case__fact">
          <Typography as="h2" variant="header-3">
            {group.title}
          </Typography>
          <Bullets items={group.items} />
        </div>
      ))}
    </div>
  )
}
