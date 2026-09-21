import { ProjectPage } from './ProjectPage'

// Ported from v2. v2's page also had two empty placeholder cards and Lorem-ipsum
// captions under the un-captioned ones (its ProjectShowcase falls back to Lorem);
// those placeholders aren't carried over.
export function Kelex() {
  return (
    <ProjectPage
      slug="kelex"
      heading="Kelex Design System"
      cards={[
        {
          image: '/images/kelex/kelex-header.jpg',
          fit: 'contain',
          // Literal #232426, not a theme token — it has to match the logo image's own
          // background in every theme (same reasoning as v2).
          fill: '#232426',
          copy: 'The Kelex Design System is a futuristic user interface (FUI).',
        },
        {
          video: '/video/kelex-highlight.mp4',
          copy: "Kelex is a collection of design tokens, reusable components, and layout patterns. It's organized around the belief that digital tools should feel as deliberate and reliable as the work they support. It's made for dark interfaces, dense information, and people who want their tools to keep up with them.",
        },
        { image: '/images/kelex/kelex-ui.jpg' },
        {
          image: '/images/kelex/Lumex.jpg',
          ratio: [2400, 1560],
          alt: 'The Kelex management control panel on a tablet: a directory of six personnel listings in cyan on dark grey, against an orange background.',
        },
        {
          image: '/images/kelex/Terminal.jpg',
          ratio: [2400, 1551],
          alt: "A laptop showing the Kelex design system's readme in a terminal-style window with file tabs, against a blue background.",
        },
        {
          image: '/images/kelex/Inventory.jpg',
          ratio: [2400, 1350],
          alt: 'An inventory of Kelex components on dark grey: tags, checkboxes, radio buttons, progress bars, buttons, a keypad, a modal, tabs and toggles.',
        },
        {
          image: '/images/kelex/Examples.jpg',
          ratio: [2400, 1728],
          alt: 'Four Kelex interfaces on devices: a laptop with the readme, a tablet with the control panel, a phone music player and a monitor showing a spacecraft telemetry display.',
        },
      ]}
    />
  )
}

export default Kelex
