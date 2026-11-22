import { BentoCard } from '../components/BentoCard/BentoCard'
import { Hero } from '../components/Hero/Hero'
import { Typography } from '../components/Typography/Typography'

// Full width (`.page--full`): the bento runs edge to edge; nav and footer follow (see site-nav.css).
export function Home() {
  return (
    <main id="main-content" className="home page--full">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <Hero contact={false} />

          {/* Personal work: Kelex (large), then Fartlek and Kelor (small) stacked beside it —
              both sized like the Work page's small cells. */}
          <Typography as="h3" variant="header-3" className="bento-section-title">
            Personal work
          </Typography>
          <div className="bento-wrap">
            <div className="bento-featured">
              <BentoCard
                area="c"
                shape="work-c"
                to="/kelex-design-system"
                title="Kelex Design System"
                tag="Side project"
                image="/media/kelex/kelex-bento-1024p30.gif"
                alt="An animated bento of Kelex interface components on dark grey."
                crt={false}
              />
              <BentoCard
                area="d"
                shape="work-d"
                to="/fartlek"
                title="Fartlek"
                tag="Side project"
                video="/media/fartlek/fartlek-timer.mp4"
                crt={false}
              />
              <BentoCard
                area="e"
                shape="work-e"
                to="/kelor"
                title="Kelor App"
                tag="Side project"
                image="/media/kelor/kelor-lightning-147571971-169-huecycle+shrink.gif"
                alt="A lightning bolt animation cycling through hues, made in Kelor."
                crt={false}
              />
            </div>
          </div>

          {/* Professional work: a 3-column grid (see .bento-more), six cards in reading order. */}
          <Typography as="h3" variant="header-3" className="bento-section-title">
            Professional work
          </Typography>
          <div className="bento-wrap">
            <div className="bento-more">
              {/* Hidden for now (no page yet): the Zero Trust Connect card.
              <BentoCard
                area="i"
                shape="work-i"
                title="Zero Trust Connect"
                tag="IBM"
                image="/media/ztc/ibm-ns1-ztc-hazard-banner.svg"
                alt="A repeating hazard-stripe banner reading Status: Pending, On Deck, Code: 010."
                crt={false}
              />
              */}
              {/* Hidden for now (no page yet): the NS1 PLG trial card.
              <BentoCard
                area="o"
                shape="work-o"
                title="NS1 PLG trial"
                tag="IBM"
                image="/media/ztc/ibm-ns1-ztc-hazard-banner.svg"
                alt="A repeating hazard-stripe banner reading Status: Pending, On Deck, Code: 010."
                crt={false}
              />
              */}
              <BentoCard
                area="k"
                shape="work-k"
                to="/ibm-mcsp"
                title="Multi-Cloud SaaS Platform"
                tag="IBM"
                image="/media/mcsp-iam/MCSP_Users_1080p_loop.gif"
                alt="A screen recording of the Multi-Cloud SaaS Platform Users page in IBM's Access management."
                crt={false}
              />
              <BentoCard
                area="l"
                shape="work-l"
                to="/carbon-libraries"
                title="Carbon Libraries"
                tag="IBM"
                image="/media/carbon/ibm-carbon-library-001.jpg"
                alt="Carbon for IBM Products components in a light and a dark theme: a card, status icons, a toolbar and a side navigation."
                crt={false}
              />
              <BentoCard
                area="j"
                shape="work-j"
                to="/hp-display-center"
                title="HP Display Center"
                tag="HP"
                image="/media/hp-dc/HP_Display_1080p_loop.gif"
                alt="A screen recording of the HP Display Center Display tab."
                crt={false}
              />
              <BentoCard
                area="m"
                shape="work-m"
                to="/federal-regulations"
                title="Federal Regulations"
                tag="FiscalNote"
                image="/media/fedregs/FedRegs_CommentThemes_1080p_loop.gif"
                alt="A screen recording of the Federal Regulations comment themes view."
                crt={false}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
