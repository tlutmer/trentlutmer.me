import { BentoCard } from '../BentoCard/BentoCard'
import { Typography } from '../Typography/Typography'

// A full-width project page: the content in the left third (the title block, an optional info list,
// then the page's children — its copy) and all the media in the right two-thirds, stacked. Stacks to
// one column below 48rem.
//
// `media`: one entry per picture, video or live component, in reading order. An entry is either
//   { video, pingPong? }                          — a video, 16:9
//   { image, ratio?, fill?, fit?, alt? }          — a picture; `ratio` is [w, h] in pixels
//   { src, w, h, alt }                            — a picture at its own proportions (the CaseStudy IMAGES shape)
//   any entry can also set `width` (a CSS length or %, e.g. '70%') to show smaller, centered in the column
//   { component, ratio? }                         — a live React component instead of a picture/video,
//                                                    for a design-system entry that's better shown running
//                                                    than screenshotted; `ratio` sizes it like a picture
//                                                    ([w, h]), else it sizes to its own content
// `info`: [{ label, value }] — `value` is a string or a React node.
// Styles: .project-split__* in site-nav.css.
function mediaProps(item) {
  if (item.src) return { image: item.src, size: [item.w, item.h], alt: item.alt }
  return {
    image: item.image,
    video: item.video,
    pingPong: item.pingPong,
    size: item.ratio,
    fill: item.fill,
    fit: item.fit,
    alt: item.alt,
  }
}

// The left column stays in view while the pictures scroll past it (wide screens only); pass `sticky={false}` to opt out.
export function ProjectSplit({ title, readTime, lead, info = [], media = [], sticky = true, children }) {
  return (
    <main id="main-content" className="project-split project-split--home-width page--full">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <div className="project-split__layout">
            <div className={sticky ? 'project-split__content project-split__content--sticky' : 'project-split__content'}>
              <div className="project-split__hero">
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

              {info.length > 0 && (
                <dl className="project-split__info">
                  {info.map(({ label, value }) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {children}
            </div>

            <div className="project-split__media">
              {media.map((item, i) => (
                <div
                  key={i}
                  className="project-media"
                  style={item.width ? { '--media-w': item.width } : undefined}
                >
                  {item.component ? (
                    <div
                      className="project-media__component"
                      style={item.ratio ? { aspectRatio: `${item.ratio[0]} / ${item.ratio[1]}` } : undefined}
                    >
                      {item.component}
                    </div>
                  ) : (
                    <BentoCard plain lightbox {...mediaProps(item)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectSplit
