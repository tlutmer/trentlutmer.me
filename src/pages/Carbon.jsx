import { CaseText, Metrics, P } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

// Ported from trentlutmer.me (docs/ibm-carbon.html): the same copy in the same order, set in v4's
// ProjectSplit layout — text on the left, the pictures on the right in reading order. Each picture
// keeps its own proportions (w x h, in pixels of the original), so nothing is cropped.

const IMAGES = {
  library: { src: '/media/carbon/ibm-carbon-library-015.jpg', w: 2880, h: 2048, alt: 'A diagram of the Carbon for IBM Products library: a core surrounded by rings of IBM business units, beside a short description of the platform.' },
  modals: { src: '/media/carbon/ibm-carbon-library-002.jpg', w: 4096, h: 3027, alt: 'The About modal in four versions: light and dark themes, with and without scrolling content.' },
  bases: { src: '/media/carbon/ibm-carbon-library-003.jpg', w: 3744, h: 3027, alt: 'The About modal broken down in Figma into its bases and items, laid out as a grid of variants.' },
  variants: { src: '/media/carbon/ibm-carbon-library-004.jpg', w: 4099, h: 1817, alt: 'Figma frames for the About modal, its items and its bases.' },
  properties: { src: '/media/carbon/ibm-carbon-library-007.gif', w: 800, h: 533, alt: 'A screen recording of the About modal in Figma with its properties panel open.' },
  mobileDark: { src: '/media/carbon/MobileDark.gif', w: 1152, h: 648, alt: 'A screen recording of the About modal at its mobile size in the dark theme.' },
  mobileLight: { src: '/media/carbon/MobileLight.gif', w: 1152, h: 648, alt: 'A screen recording of the About modal at its mobile size in the light theme.' },
  products: { src: '/media/carbon/Products.gif', w: 1152, h: 648, alt: 'A screen recording of the About modal across IBM products.' },
  smallDark: { src: '/media/carbon/SmallDark.gif', w: 1152, h: 648, alt: 'A screen recording of the About modal at its small size in the dark theme.' },
  smallLight: { src: '/media/carbon/SmallLight.gif', w: 1152, h: 648, alt: 'A screen recording of the About modal at its small size in the light theme.' },
  usage: { src: '/media/carbon/ibm-carbon-library-005.jpg', w: 16396, h: 5600, alt: 'Figma library analytics for the Grey 10 and Grey 100 kits, with a chart of usage over time.' },
  publishing: { src: '/media/carbon/ibm-carbon-library-006.jpg', w: 4105, h: 922, alt: 'A chat message reading "Publishing library", with a row of emoji reactions.' },
  rebuilt: { src: '/media/carbon/ibm-carbon-library-013.jpg', w: 4099, h: 2607, alt: 'The rebuilt About modal in Figma: its base and item parts laid out side by side.' },
  props: { src: '/media/carbon/ibm-carbon-library-014.gif', w: 800, h: 533, alt: 'A screen recording of the About modal in Figma as its size, theme, footer and scroll properties change.' },
  reopenDark: { src: '/media/carbon/ibm-carbon-library-011.gif', w: 800, h: 533, alt: 'A screen recording of a button reopening the About modal in the dark theme.' },
  reopenLight: { src: '/media/carbon/ibm-carbon-library-012.gif', w: 800, h: 533, alt: 'A screen recording of a button reopening the About modal in the light theme with all its properties set.' },
  announcement: { src: '/media/carbon/ibm-carbon-library-009.jpg', w: 4096, h: 2101, alt: 'A chat announcement, "Carbon for IBM Products Figma Kit out now!", with a preview of the Gray 10 kit.' },
  thanks: { src: '/media/carbon/ibm-carbon-library-010.jpg', w: 4105, h: 922, alt: 'A chat message thanking everyone who helped create and review the Figma kit, with emoji reactions.' },
}

export function Carbon() {
  return (
    <ProjectSplit
      title="Carbon for IBM Products Figma Library Kit"
      media={[
        IMAGES.library,
        IMAGES.modals,
        IMAGES.bases,
        IMAGES.variants,
        IMAGES.properties,
        IMAGES.mobileDark,
        IMAGES.mobileLight,
        IMAGES.products,
        IMAGES.smallDark,
        IMAGES.smallLight,
        IMAGES.usage,
        IMAGES.publishing,
        IMAGES.rebuilt,
        IMAGES.props,
        IMAGES.reopenDark,
        IMAGES.reopenLight,
        IMAGES.announcement,
        IMAGES.thanks,
      ]}
    >
      <P>
        Carbon for IBM Products had three sources of truth that disagreed, so designers left with contradictions. I rebuilt the About modal in Figma as four variants instead of 28, closing the gap across the site, code, and kit.
      </P>
      <Metrics
        items={[
          { value: '77%', label: 'Carbon adoption across IBM' },
          { value: '47%', label: 'Front-end development effort saved' },
          { value: '34%', label: 'Lower maintenance costs' },
          { value: '70+', label: 'Teams on the kit in its first 60 days' },
        ]}
      />
      <hr className="case__rule" />
      <CaseText>
        <P>
          Mara, a product designer on an enterprise cloud team, needs to drop an about modal into her design. She has three tabs open: the guidance website, the Storybook code demo, and the design kit.
        </P>
        <P>
          Three versions of the same component — different footers, different breakpoints, different themes. She checks the documentation to break the tie, and it disagrees with all three.
        </P>
        <P>
          Her deadline doesn't care which one is right. She copies the kit version, hopes it matches what engineering will build, and moves on.
        </P>
        <P>
          The kit in question belongs to the Carbon Design System — IBM's shared collection of components, patterns, guidance, and code, the thing that lets thousands of designers and developers build consistent products without reinventing buttons. Carbon for IBM Products is its extension layer: the components too product-specific for the core system, shared across Cloud Paks, cloud platform, SaaS, and on-premise products.
        </P>
        <P>
          By early 2022 the system had a new problem on top of the old one: IBM design was moving from Sketch to Figma, and no Figma kit existed. The business goals were blunt — push Carbon adoption across IBM toward 100 percent, give migrating designers something they could design with on day one, and make the code, website, and libraries look and feel identical.
        </P>
        <P>
          <strong>Problem:</strong> Carbon for IBM Products had three sources of truth that didn't agree — the guidance website, the Storybook code, and the Sketch kit each described the same components differently.
        </P>
        <P>
          Designers and developers who came looking for certainty left with contradictions, and every team resolved them differently, in private, on deadline.
        </P>
        <P>
          Each private resolution compounded the drift the design system existed to prevent.
        </P>
        <P>
          With IBM's move to Figma, the gap was about to be rebuilt into a new tool — unless the migration became the moment it was closed.
        </P>
        <P>
          <strong>Goals:</strong> Ship a Carbon for IBM Products Figma library — light and dark themes, responsive components — that designers could trust on day one, with the website, code, and kit finally saying the same thing.
        </P>
        <P>
          The working arrangement made it harder than it sounds. The kit was built by a guild — eleven designers, myself included, each borrowed from a product team, each with one to four hours a week to give.
        </P>
        <P>
          Laura, our lead, set an eight-week course to launch in April, with weekly status check-ins. At kickoff we each chose our components; I took the About modal and a few others.
        </P>
        <P>
          My first audit showed why the work mattered: the modal's variants and documentation differed across Sketch, Storybook, and the website, right down to which breakpoints and themes existed. And there was no Figma foundation to stand on — the core Carbon team had only begun their own kit, so beyond borrowed color and typography styles from the IBM Design Language, ours was built from scratch.
        </P>
        <P>
          The pivotal realization came from tracking down the designer who had built the original Sketch component. I'd gone looking for the correct spec; there wasn't one.
        </P>
        <P>
          Together we had to decide it — sizes, themes, footer, scroll behavior — negotiating what the component should be rather than copying what it was. That reframed the whole project: this wasn't a port from Sketch to Figma.
        </P>
        <P>
          It was arbitration. Every contradiction had to be resolved once, in the open, and the kit would become the place the agreement lived.
        </P>
        <P>
          The new truth for the About modal: small and mobile sizes, light and dark themes, scrolling, and one deliberate cut — a singular footer, dropping the versions-and-technologies list the old component carried. My first Figma build honored all of it and still felt wrong: twenty-eight separate versions of one modal.
        </P>
        <P>
          I took it to critique, came back understanding Figma's variants properly, and rebuilt — four variants, the file down from 0.82 GB to 0.06, from nearly 420,000 layers to just over 9,000. Every component shipped with descriptions and links routing designers to the guidance site and developers to the code — certainty built in.
        </P>
        <P>
          The Carbon 10 kits launched that April. Then Carbon 11 arrived, and the guild reconvened in late September to migrate: new spacing, new type and color tokens, Figma booleans.
        </P>
        <P>
          One gradient token shipped with the wrong color and opacity; I wrote it in as a documented exception rather than a silent fix. The file shrank again, to 0.01 GB and 932 layers.
        </P>
        <P>
          Mara's version of that morning now starts and ends in one place: the component in the kit, its documentation and code linked from inside the component itself. Three tabs, one answer.
        </P>
        <P>
          More than 70 teams adopted the Carbon 10 kits in their first 60 days; the Carbon 11 kits drew nearly 50 teams and more than 6,000 component inserts in the same window. Carbon now stands at more than three-quarters adoption across IBM, credited with nearly half of front-end development effort saved and maintenance costs down by roughly a third.
        </P>
        <P>
          The lesson outlasted the kit: a design system isn't the components — it's the agreement about what's true. The kit is just where the agreement lives.
        </P>
      </CaseText>
    </ProjectSplit>
  )
}

export default Carbon
