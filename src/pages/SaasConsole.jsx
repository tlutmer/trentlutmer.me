import { CaseText, Metrics, P } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

// From content/ibm-mcsp-iam/ibm-mcsp-iam-case-study.md: a two-sentence summary is the visible text, and the
// full narrative sits behind the "Read full case study" disclosure, as on the
// Federal Regulations and Carbon pages. The pictures sit on the right in reading order.

const IMAGES = {
  intro: { src: '/images/mcsp-iam/001-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person at a laptop, connected by lines and nodes to a browser window, a server, a phone and a settings gear.' },
  console: { src: '/images/mcsp-iam/002-iam.jpg', w: 2880, h: 2048, alt: 'The IBM SaaS Console on a laptop: an Access management page with a list of users, and a user\'s details open in a panel over it, showing their assigned roles.' },
  login: { src: '/images/mcsp-iam/008-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person standing between a "Log in to IBM" form and a role picker, with cloud provider logos around them.' },
  access: { src: '/images/mcsp-iam/005-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person surrounded by orbiting people, a laptop with a shield, a server stack and an identity badge.' },
  roles: { src: '/images/mcsp-iam/006-iam.jpg', w: 2880, h: 2048, alt: 'An illustration of a person giving a thumbs up, surrounded by six people, some marked as added, approved or blocked.' },
}

export function SaasConsole() {
  return (
    <ProjectSplit
      title="Multi-Cloud SaaS Platform"
      media={[IMAGES.intro, IMAGES.console, IMAGES.login, IMAGES.access, IMAGES.roles]}
    >
      <P>
        IBM’s Multi-cloud SaaS Platform gives administrators one place to manage accounts, subscriptions, identity,
        and access across IBM products. I led the research and design, to consolidate the eight experiences into a
        singular cohesive product.
      </P>
      <Metrics
        items={[
          { value: '60%', label: 'Less product development time' },
          { value: '5×', label: 'Faster go-to-market deliverables' },
          { value: '8×', label: 'Fewer redundant teams and projects' },
          { value: '20', label: 'IBM SaaS products adopted or queued' },
        ]}
      />
      <hr className="case__rule" />
      <CaseText>
        <P>
          Marcus, an IT administrator at a midsize manufacturer, has a new engineer starting Monday. All she needs
          is access to the tools her team already uses. Marcus opens the first of eight admin consoles and starts
          working down the list: an invite here, a role request there, a terminal window for the permissions that
          can only be drawn by command line. By lunch he has filed approval requests in four different systems and
          granted nothing yet. He types carefully — last quarter, one mistyped role took three days to unwind.
          Somewhere between console five and six, he stops being sure which permissions he’s already requested.
        </P>
        <P>
          Marcus’s employer, like 90 percent of large firms, runs products across multiple clouds — IBM, AWS, Azure,
          Google. The Multi-cloud SaaS Platform (MCSP) is IBM’s answer to what that does to administration: one
          platform where companies manage their accounts, subscriptions, billing, identity, access, and single
          sign-on, with common tools underneath to speed up product development. The urgency was set in May 2022,
          when IBM and AWS signed a Strategic Collaboration Agreement — IBM customers could now buy IBM SaaS products
          and host them on AWS. More clouds, more marketplaces, more subscriptions: the administrative sprawl was
          about to multiply. I was the product designer responsible for researching and defining MCSP’s identity and
          access management.
        </P>
        <P>
          The team assembled around the problem was itself a coordination exercise: designers, product managers,
          developers, architects, and content designers spread across six time zones. My research surfaced the two
          problems above quickly — the 8+ systems, the CLI-drawn boundaries — but agreeing on what to do about them
          was slower. The systems we were consolidating had overlapping features and their own opinions about how
          identity should work. For weeks, the team circled the same conversations about goals and outcomes without
          landing.
        </P>
        <P>
          The fix for a team that couldn’t stop talking past each other turned out to be a meeting where nobody
          talked. I proposed a silent working session: everyone writing, in parallel, what we knew, what we didn’t,
          how admins did this today, and how we expected it to work tomorrow. Without the loudest voice setting the
          frame, the overlaps became visible on the board. I consolidated the insights, shared them back, and the
          plan that had eluded us for weeks fell out in one session: Phase 1 would be identity management — users and
          user groups — plus role-based access controls, built as microservices so each IBM product could adopt
          exactly the pieces it needed.
        </P>
        <P>
          The building was less tidy. Our first major iteration mirrored parts of another IBM product, hoping to move
          faster on proven patterns — but when we walked it through with the team, very few of those parts meant
          anything in MCSP’s context. Expecting that, I had already started a Plan B: identity flows mapped straight
          from the architecture documents — inviting, adding, viewing, editing, and removing users. Wireframes went
          in front of colleagues, and their feedback named the real monster: scale and visibility. “I can’t tell who
          is receiving permission and what they will get.” Access management — the who-gets-what-on-which-scope
          problem, spanning accounts, subscriptions, instances, users, groups, and service IDs — drove most of our
          twelve-plus major iterations. It also produced the project’s hardest disagreement: my design manager
          proposed four sequential dropdowns for granting access; I proposed Carbon’s Add/Select component, which
          showed the whole grant visually before you committed to it. We debated for months. The decision went to the
          dropdowns. It wasn’t my favorite outcome — but I documented my alternative and kept it in the file for the
          day the question reopens, and we moved forward together into the final Figma components with visual design.
        </P>
        <P>
          Marcus’s Monday now starts in one place: invite the engineer, assign her group, grant the group its access —
          one platform, one flow, no terminal window. The beta shipped in June 2024, eighteen months after the
          January 2023 start. Six IBM SaaS products adopted it, with fourteen more in the queue; the shared framework
          cuts product development time by 60 percent, go-to-market deliverables move five times faster, and
          redundant teams and projects fell eightfold. SSO, federated identity, and just-in-time provisioning are
          next. The platform’s real product was never the screens — it was one answer to the three questions every
          system had been asking separately: who are you, are you allowed here, and what can you do?
        </P>
      </CaseText>
    </ProjectSplit>
  )
}

export default SaasConsole
