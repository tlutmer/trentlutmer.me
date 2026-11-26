import { P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'

// Media: every example in
// public/media/kelor/ (stills 4096x2306, animated GIFs 718x404 and the 1024x576 sheet — all 16:9).
export function Kelor() {
  return (
    <ProjectSplit
      title="Kelor"
      info={[
        {
          label: 'About',
          value: 'A generative branding tool made in tandem with Kelex — animation and graphics for the Kelex brand, built to be reused.',
        },
      ]}
      media={[
        { image: '/media/kelor/kelor-sheet-1024-30.gif', ratio: [1024, 576], alt: 'A sheet of Kelor animation and graphic outputs.' },
        { image: '/media/kelor/kelor-lightning-147571971-169-huecycle+shrink.gif', ratio: [718, 404], alt: 'A Kelor lightning visual example.' },
        { image: '/media/kelor/kelor-1.png', ratio: [4096, 2306], alt: 'A Kelor example visualization.' },
        { image: '/media/kelor/kelor-2.png', ratio: [4096, 2306], alt: 'A Kelor example visualization.' },
        { image: '/media/kelor/kelor-3.png', ratio: [4096, 2306], alt: 'A Kelor example visualization.' },
        { image: '/media/kelor/kelor-attractor-1178582736-169.png', ratio: [4096, 2306], alt: 'A Kelor attractor visual example.' },
        { image: '/media/kelor/kelor-auroraribbon-882506573-169-neonpulse+swarm.gif', ratio: [718, 404], alt: 'A Kelor auroraribbon visual example.' },
        { image: '/media/kelor/kelor-bifurcation-1993764542-169-scanline+pulse.gif', ratio: [718, 404], alt: 'A Kelor bifurcation visual example.' },
        { image: '/media/kelor/kelor-boids-1325974094-169.png', ratio: [4096, 2306], alt: 'A Kelor boids visual example.' },
        { image: '/media/kelor/kelor-bubblechamber-1436338155-169-breathe+flow.gif', ratio: [718, 404], alt: 'A Kelor bubblechamber visual example.' },
        { image: '/media/kelor/kelor-bubblechamber-1436338155-169-scatter.gif', ratio: [718, 404], alt: 'A Kelor bubblechamber visual example.' },
        { image: '/media/kelor/kelor-bubblechamber-1436338155-169-wave.gif', ratio: [718, 404], alt: 'A Kelor bubblechamber visual example.' },
        { image: '/media/kelor/kelor-chladni-373824446-169-shuffle.gif', ratio: [718, 404], alt: 'A Kelor chladni visual example.' },
        { image: '/media/kelor/kelor-clouds-432967350-169-glitch.gif', ratio: [718, 404], alt: 'A Kelor clouds visual example.' },
        { image: '/media/kelor/kelor-dotmatrix-2124294267-169-typewriter.gif', ratio: [718, 404], alt: 'A Kelor dotmatrix visual example.' },
        { image: '/media/kelor/kelor-dryingcracks-2044697622-169.png', ratio: [4096, 2306], alt: 'A Kelor dryingcracks visual example.' },
        { image: '/media/kelor/kelor-harmonics-1866608357-169.png', ratio: [4096, 2306], alt: 'A Kelor harmonics visual example.' },
        { image: '/media/kelor/kelor-hexgrid-1759775467-169-shuffle.gif', ratio: [718, 404], alt: 'A Kelor hexgrid visual example.' },
        { image: '/media/kelor/kelor-lavalamp-1672858674-169-holoshimmer.gif', ratio: [718, 404], alt: 'A Kelor lavalamp visual example.' },
        { image: '/media/kelor/kelor-nbody-4883-169-scatter.gif', ratio: [718, 404], alt: 'A Kelor nbody visual example.' },
        { image: '/media/kelor/kelor-r1z0-interference-501280397-40111.png', ratio: [4096, 2306], alt: 'A Kelor interference visual example.' },
        { image: '/media/kelor/kelor-trigrid-2081463587-169-conveyor.gif', ratio: [718, 404], alt: 'A Kelor trigrid visual example.' },
        { image: '/media/kelor/kelor-waveform-1328406174-169-conveyor.gif', ratio: [718, 404], alt: 'A Kelor waveform visual example.' },
        { image: '/media/kelor/kelor-wavepacket-672942602-169-wave.gif', ratio: [718, 404], alt: 'A Kelor wavepacket visual example.' },
      ]}
    >
      <Paragraphs>
        <P>
          Kelor generates the animation and graphics for the Kelex brand. I built it for Kelex
          specifically, but it's a tool I can reuse: a way to turn a visual language into motion and
          imagery on demand. What's on this page is a showcase of the outputs I've made with it.
        </P>
      </Paragraphs>
    </ProjectSplit>
  )
}

export default Kelor
