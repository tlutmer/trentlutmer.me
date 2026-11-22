import { P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { PaddedPicture } from '../components/PaddedPicture/PaddedPicture'
import { DeviceFrame } from '../components/DeviceFrame/DeviceFrame'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

// Ported from v2. v2's page also had two empty placeholder cards and Lorem-ipsum
// captions under the un-captioned ones (its ProjectShowcase falls back to Lorem);
// those placeholders aren't carried over.
export function Kelex() {
  return (
    <ProjectSplit
      title="Kelex Design System"
      info={[
        {
          label: 'About',
          value: 'A futuristic user interface (FUI) — design tokens, reusable components, and layout patterns for dark, dense interfaces.',
        },
        // Hidden for now: the "See it live" link to kelex.tech.
        //{
        //  label: 'See it live',
        //  value: (
        //    <a href="https://www.kelex.tech/" target="_blank" rel="noreferrer" className="about__inline-link" tabIndex={0}>
        //      kelex.tech<span className="sr-only"> (opens in a new tab)</span>
        //    </a>
        //  ),
        //},
      ]}
      media={[
        {
          image: '/media/kelex/kelex-header.jpg',
          fit: 'contain',
          // The 'logo' fill is a literal #232426, not a theme token — it has to match the logo
          // image's own background in every theme (same reasoning as v2).
          fill: 'logo',
        },
        { video: '/media/kelex/kelex-highlight.mp4' },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-toggles-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="Kelex toggles responding to the mouse."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-button-states-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="Kelex button states responding to the mouse."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-card-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="A Kelex card responding to the mouse."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-checkboxes-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="Kelex checkboxes responding to the mouse."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-radio-buttons-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="Kelex radio buttons responding to the mouse."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-components-side-navigation-mouse-1024p30.gif"
              ratio={[1820, 1024]}
              size={[1820, 1024]}
              padding="0"
              width="50%"
              alt="Kelex side navigation responding to the mouse."
            />
          ),
        },
        { image: '/media/kelex/kelex-tile-rings.gif', ratio: [898, 412], alt: 'Kelex tile rings animation.' },
        { image: '/media/kelex/kelex-terminal_1024p30.gif', ratio: [1304, 1024], alt: 'The Kelex terminal animating.' },
        {
          component: (
            <DeviceFrame
              src="/media/kelex/kelex-audio-player.gif"
              ratio={[824, 1850]}
              alt="The Kelex audio player animating, shown on a phone."
            />
          ),
        },
        {
          component: (
            <PaddedPicture
              src="/media/kelex/kelex-weather-glitch.gif"
              size={[1024, 576]}
              alt="A Kelex weather display glitching."
            />
          ),
        },
      ]}
    >
      <Paragraphs>
        <P>The Kelex Design System is a futuristic user interface (FUI).</P>
        <P>
          Kelex is a collection of design tokens, reusable components, and layout patterns. It's organized
          around the belief that digital tools should feel as deliberate and reliable as the work they
          support. It's made for dark interfaces, dense information, and people who want their tools to
          keep up with them.
        </P>
      </Paragraphs>
    </ProjectSplit>
  )
}

export default Kelex
