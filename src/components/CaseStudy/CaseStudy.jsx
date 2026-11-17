import { useId, useState } from 'react'
import { BentoCard } from '../BentoCard/BentoCard'
import { Typography } from '../Typography/Typography'

// Building blocks for the long-form pages (the project pages and the Writing page): paragraphs,
// lists, facts and section headings, in Kelex type (IBM Plex Mono via Typography). Styles: the
// `.case__*` rules in site-nav.css.

// One image in an outlined card at the image's own aspect ratio, so nothing is cropped. `image`
// is { src, w, h, alt } (w x h in pixels of the original). The card is a plain rectangle (no
// generated mask) and opens the picture in the Modal when clicked. An optional `caption` sits
// underneath, in the same 16px inset as the copy.
export function Figure({ image, caption }) {
  const { src, w, h, alt } = image
  const card = (
    <div className="project-media">
      <BentoCard plain lightbox size={[w, h]} image={src} alt={alt} />
    </div>
  )
  if (!caption) return card
  return (
    <figure className="case__figure">
      {card}
      <figcaption className="case__caption">{caption}</figcaption>
    </figure>
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

// The headline results under a project's summary, in a two-column grid: items = [{ value, label }].
export function Metrics({ items }) {
  return (
    <dl className="case__metrics">
      {items.map(({ value, label }) => (
        <div key={label} className="case__metric">
          <dt className="type type--label case__metric-label">{label}</dt>
          <dd className="type type--subtitle-3 case__metric-value">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

// A section's small label above its heading (the label is optional).
export function SectionHead({ subhead, title }) {
  return (
    <div className="case__head">
      {subhead && (
        <Typography variant="label" className="case__subhead">
          {subhead}
        </Typography>
      )}
      <Typography as="h2" variant="header-2">
        {title}
      </Typography>
    </div>
  )
}

export function Section({ id, subhead, title, children }) {
  return (
    <div className="case__section" id={id}>
      <SectionHead subhead={subhead} title={title} />
      <Paragraphs>{children}</Paragraphs>
    </div>
  )
}

export function Hero({ id, title, readTime, lead }) {
  return (
    <div className="case__hero" id={id}>
      <Typography as="h1" variant="header-1">
        {title}
      </Typography>
      {readTime && (
        <Typography variant="label" className="case__subhead">
          {readTime}
        </Typography>
      )}
      {lead && (
        <Typography as="p" variant="header-3" className="case__lead">
          {lead}
        </Typography>
      )}
    </div>
  )
}

// Two or three short bulleted lists side by side (stacked on a phone):
// groups = [{ title, items }].
export function Facts({ groups }) {
  return (
    <div className="case__facts" data-cols={groups.length}>
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

// The full case study, hidden until the reader asks for it. The button is the disclosure: it
// shows and hides the body and says so with aria-expanded.
export function CaseText({ children }) {
  const [open, setOpen] = useState(false)
  const bodyId = useId()
  return (
    <div className="case__disclosure">
      <button
        type="button"
        className="about__link case__toggle"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Hide full case study' : 'Read full case study'}
        <svg className="case__caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.25" fill="none" />
        </svg>
      </button>
      <div id={bodyId} className="case__disclosure-body" hidden={!open}>
        <Paragraphs>{children}</Paragraphs>
      </div>
    </div>
  )
}
