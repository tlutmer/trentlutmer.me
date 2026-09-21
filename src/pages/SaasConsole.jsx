import { Bullets, Facts, Figure as CaseFigure, Hero, P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { ProjectNav } from './ProjectPage'

// Ported from trentlutmer.me (docs/ibm-mcspiam.html): the same copy in the same order, set in
// v4's structure — the shared 800px column, Kelex type (IBM Plex Mono via Typography), themed
// colours, and outlined cards for every image (see components/CaseStudy).

const IMAGES = {
  intro: { src: '/images/mcsp-iam/001-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person at a laptop, connected by lines and nodes to a browser window, a server, a phone and a settings gear.' },
  console: { src: '/images/mcsp-iam/002-iam.jpg', w: 2880, h: 2048, alt: 'The IBM SaaS Console on a laptop: an Access management page with a list of users, and a user\'s details open in a panel over it, showing their assigned roles.' },
  login: { src: '/images/mcsp-iam/008-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person standing between a "Log in to IBM" form and a role picker, with cloud provider logos around them.' },
  access: { src: '/images/mcsp-iam/005-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person surrounded by orbiting people, a laptop with a shield, a server stack and an identity badge.' },
  roles: { src: '/images/mcsp-iam/006-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person giving a thumbs up, surrounded by six people, some marked as added, approved or blocked.' },
}

const Figure = ({ image }) => <CaseFigure image={IMAGES[image]} />

export function SaasConsole() {
  return (
    <main id="main-content">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content project">
          <Hero
            title="IBM Multi-Cloud SaaS Platform: Identity & Access Management"
            readTime="1 min read"
            lead="Overwhelmed by too many tools, I designed an IAM experience for single too focused on security and efficiency."
          />

          <Facts
            groups={[
              { title: 'My role', items: ['Reserach', 'UX'] },
              { title: 'Team', items: ['Rami', 'Kidus', 'Garrett', 'Jim'] },
              {
                title: 'Impact',
                items: [
                  '60% saved development time',
                  '5X go-to-market speed',
                  'Integrated across 20 IBM SaaS products',
                ],
              },
            ]}
          />

          <Figure image="intro" />

          <Paragraphs>
            <P>
              The Multi-cloud SaaS Platform (MCSP) aims to unify its administrative features. Users can
              manage accounts, subscriptions, billing, identity, access, and single sign-on through MCSP.
            </P>
            <P>
              As the product designer, I had to research and define IAM features for MCSP. I worked with
              designers, product managers, developers, architects, and content designers across six time
              zones.
            </P>
          </Paragraphs>

          <Figure image="console" />

          <Paragraphs>
            <P>
              Today System and IT administrators use 8+ systems to buy and manage their IBM SaaS
              subscriptions. Managing clear IAM boundaries in a CLI is manual. It leads to redundancy,
              errors, and excessive approvals.
            </P>
            <P>
              Simply put, who is this person? Are they allowed here? What are they allowed to do? Let’s
              ensure the right people have the right things for the right reasons.
            </P>
          </Paragraphs>

          <Figure image="login" />

          <Paragraphs>
            <P>
              The task was to create an experience for IT and System admins. It must let them identify,
              authenticate, and authorize any resource or entity, securely and efficiently, on a single
              platform. This included a focus on enhancing the onboarding experience and increasing
              adoption rates.
            </P>
          </Paragraphs>

          <Figure image="access" />

          <Paragraphs>
            <P>
              There are three parts to granting secure access to an organization’s resources, identity,
              authorization, and authentication. For us, the first phase only included identity and
              authorization.
            </P>
            <Bullets
              items={[
                'Identity management – A user list with the ability to add, edit, view, and remove users.',
                'Authorization (Access) management – Role-based Access Controls (RBAC) so they can manage their scope (an account, subscription, or instance) and entities (a user, user group, and service ID).',
              ]}
            />
          </Paragraphs>

          <Figure image="roles" />

          <Paragraphs>
            <Bullets
              items={[
                'Phase 1 released with six IBM SaaS products and Phase 2 planned for fourteen more.',
                'I worked with designers, product managers, developers, architects, and content designers across six time zones.',
                'The framework saves development time by 60%.',
                'Go-to-market deliverables increase speed by five times.',
              ]}
            />
            <P>
              Our next challenge lay in providing seamless and controlled access to this workforce. This
              includes Single Sign-On (SSO), Federated Identity, (IdP configuration), and Just-in-Time
              (JIT) Provisioning.
            </P>
          </Paragraphs>

          <ProjectNav currentSlug="saas-console" />
        </div>
      </div>
    </main>
  )
}

export default SaasConsole
