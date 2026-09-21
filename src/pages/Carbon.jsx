import { Bullets, Facts, Figure as CaseFigure, Hero, P, Paragraphs, Section } from '../components/CaseStudy/CaseStudy'
import { ProjectNav } from './ProjectPage'

// Ported from trentlutmer.me (docs/ibm-carbon.html): the same copy in the same order, set in
// v4's structure — the shared 800px column, Kelex type (IBM Plex Mono via Typography), themed
// colours, and outlined cards for every image (see components/CaseStudy). Each card keeps its
// image's own proportions (w x h, in pixels of the original), so nothing is cropped.

const Figure = ({ image }) => <CaseFigure image={IMAGES[image]} />

const IMAGES = {
  library: { src: '/images/carbon/015-carbon.jpg', w: 2880, h: 2048, alt: 'A diagram of the Carbon for IBM Products library: a core surrounded by rings of IBM business units, beside a short description of the platform.' },
  modals: { src: '/images/carbon/002-carbon.jpg', w: 4096, h: 3027, alt: 'The About modal in four versions: light and dark themes, with and without scrolling content.' },
  bases: { src: '/images/carbon/003-carbon.jpg', w: 3744, h: 3027, alt: 'The About modal broken down in Figma into its bases and items, laid out as a grid of variants.' },
  variants: { src: '/images/carbon/004-carbon.jpg', w: 4099, h: 1817, alt: 'Figma frames for the About modal, its items and its bases.' },
  properties: { src: '/images/carbon/007-carbon.gif', w: 800, h: 533, alt: 'A screen recording of the About modal in Figma with its properties panel open.' },
  usage: { src: '/images/carbon/005-carbon.jpg', w: 16396, h: 5600, alt: 'Figma library analytics for the Grey 10 and Grey 100 kits, with a chart of usage over time.' },
  publishing: { src: '/images/carbon/006-carbon.jpg', w: 4105, h: 922, alt: 'A chat message reading "Publishing library", with a row of emoji reactions.' },
  rebuilt: { src: '/images/carbon/013-carbon.jpg', w: 4099, h: 2607, alt: 'The rebuilt About modal in Figma: its base and item parts laid out side by side.' },
  props: { src: '/images/carbon/014-carbon.gif', w: 800, h: 533, alt: 'A screen recording of the About modal in Figma as its size, theme, footer and scroll properties change.' },
  reopenDark: { src: '/images/carbon/011-carbon.gif', w: 800, h: 533, alt: 'A screen recording of a button reopening the About modal in the dark theme.' },
  reopenLight: { src: '/images/carbon/012-carbon.gif', w: 800, h: 533, alt: 'A screen recording of a button reopening the About modal in the light theme with all its properties set.' },
  announcement: { src: '/images/carbon/009-carbon.jpg', w: 4096, h: 2101, alt: 'A chat announcement, "Carbon for IBM Products Figma Kit out now!", with a preview of the Gray 10 kit.' },
  thanks: { src: '/images/carbon/010-carbon.jpg', w: 4105, h: 922, alt: 'A chat message thanking everyone who helped create and review the Figma kit, with emoji reactions.' },
}

export function Carbon() {
  return (
    <main id="main-content">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content project">
          <Hero
            title="Carbon for IBM Products Figma Library Kit"
            readTime="3 min read"
            lead="I built new Carbon for IBM Products design components to prevent misalignment across our site, code, and library."
          />

          <Facts
            groups={[
              { title: 'Team', items: ['Laura', 'Meme', 'Cate', 'Nina'] },
              {
                title: 'Impact',
                items: [
                  '77% adoption rate',
                  '47% efficiency front-end dev savings',
                  '34% saved in maintenance costs',
                  '80% decrease in component efficiency',
                ],
              },
            ]}
          />

          <Section subhead="Business goal" title="Why it matters">
              <P>
                Using the Carbon for IBM Products’ goals and opportunities, we met to align on timelines
                and scope.
              </P>
              <Bullets
                items={[
                  "Increase adoption to boost the Carbon Design System's presence across IBM",
                  'Promote migration for designers moving to Figma who want to design right away',
                  'Seamless collaboration to ease the hand-off between designers and developers',
                  'One-in-the-same to align the code, website, and libraries to look and feel identical',
                ]}
              />
            </Section>

          <Figure image="library" />

          <Section subhead="Discovery" title="From the get-go">
              <P>
                For this case study, I’ll focus on one of the four components I built — the ‘About modal’.
              </P>
              <P>
                I started by digging into the component and identifying the modal's key differences
                across Sketch design file, the Pattern Asset Library site, and the code. This proved
                trickier than expected. Each place contradicted each other and was inconsistent making it
                difficult to know the source of truth. I reached out to a designer and developer to
                understand the about modal’s true visual form. Once aligned and approved by others, I
                opened Figma and began to build.
              </P>
              <P>
                From all the discussions, I wrote out a small list of to-dos so the designer can choose
                from the 28 variants for their product.
              </P>
            </Section>

          <Figure image="modals" />

          <Section subhead="Understand" title="Breaking it down to build it up">
              <P>
                In Figma, I broke the component down to its ‘base’ parts, which includes the logo, links,
                legal content, and scroll overlay. Finally, I combined them into their frame with the
                different variants. With a few tweaks, feedback, and a link to their documentation and
                code, I finished. Additionally, I added descriptions and links to the Carbon for IBM
                Products site.
              </P>
            </Section>

          <Figure image="bases" />

          <Paragraphs>
            <P>
              Within the first week, I completed the initial version, including 28 versions of the About
              modal. This felt wrong, so I attended a critique with fellow Figma experts to better
              understand Figma’s variant feature and learn to use it more efficiently. I separated the
              theme, margin, and footer variants, and used a new gradient token. Afterward, I pushed for a
              final review to be merged and published.
            </P>
            <P>
              Note: Around this time, the Carbon team announced v11. A huge accomplishment for IBM and the
              Carbon team.
            </P>
          </Paragraphs>

          <Figure image="variants" />

          <Paragraphs>
            <P>
              The Carbon 10 Grey 10 kit was published on Figma on April 1, and the Grey 100 kit on April
              27. Over the next week, we fixed many bugs, continued critiques, and made minor changes. We
              had 74 teams use the Grey 10 and Grey 100 themes after the first 60 days.
            </P>
          </Paragraphs>

          <Figure image="properties" />
          <Figure image="usage" />
          <Figure image="publishing" />

          <Section subhead="Ideate and test" title="New and improved Figma">
              <P>
                Everything was going well until Figma’s annual conference, Config 2022. A bunch of new
                features were announced but what stuck out was ‘Component properties’. This was a
                brilliant feature that provides adjustments to create variations and instances of a
                component. Sounds great in theory but I needed to revisit the About modal in hopes it
                could improve the component efficiency.
              </P>
              <P>Before we move on, I want to recap the last few months:</P>
              <Bullets
                items={[
                  'Carbon v11 release — March 2022',
                  'Carbon for IBM Products v10 release — April 2022 (this project)',
                  'Figma ‘Component properties’ release — May 2022',
                ]}
              />
              <P>
                With all of this happening, I reconvened with the team and began to plan the next
                iteration. With Carbon 11, Figma’s Component properties feature, and team feedback, I
                created another plan.
              </P>
              <P>
                I began by swapping libraries and changing tokens. A deceiving and tedious task to find
                the wrong color token and swap it with the correct one. Next, I broke the About modal into
                ‘base’ and item’ parts. Separating them made it easier to adjust the About modal for the
                other themes and future versions. Finally, I added component properties: size, theme,
                footer, and scroll. These make it easier to switch between the 28 different variants based
                on the designer’s requirements.
              </P>
            </Section>

          <Figure image="rebuilt" />

          <Paragraphs>
            <P>Finally, I completed the new Carbon 10 version of the component.</P>
            <Bullets
              items={[
                'The number of variants decreased from 28 to 4',
                'The file size down from 0.82G to 0.06G',
                'The number of layers from 419,975 layers to 9,216',
                '140 teams use the Grey 10 and Grey 100 themes after the first 30 days',
              ]}
            />
            <P>And I was even able to decrease the each aspect using Carbon 11.</P>
            <Bullets
              items={[
                'Decreased the file size from 0.06G to 0.01G',
                'Decreased the number of layers from 9,216 to 932.',
                '49 teams use the Grey 10 and Grey 100 themes after the first 60 days',
              ]}
            />
          </Paragraphs>

          <Figure image="props" />
          <Figure image="reopenDark" />
          <Figure image="reopenLight" />

          <Section subhead="Outcome" title="Publishing the library">
              <P>
                On Oct 27th, we published the Carbon 11 kit. Over the next week, we fixed many bugs,
                continued critiques, and made minor changes. Demonstrations of the new components, Figma
                features, and usage began shortly. I hosted team meetings to showcase the additions to
                promote migration for designers moving to Figma.
              </P>
              <P>
                Carbon is vital to IBM, and we continue increasing adoption across the company. Building
                this system helps center the team around creating incredible experiences for our products.
                We are bettering ourselves to iterate quicker and more innovative. We'll continue to
                repeat and ensure we meet the highest standards.
              </P>
              <P>
                Read more on the{' '}
                <a
                  href="https://www.carbondesignsystem.com"
                  target="_blank"
                  rel="noreferrer"
                  className="about__inline-link"
                >
                  Carbon Design System
                </a>{' '}
                website.
              </P>
            </Section>

          <Figure image="announcement" />
          <Figure image="thanks" />

          <ProjectNav currentSlug="carbon" />
        </div>
      </div>
    </main>
  )
}

export default Carbon
