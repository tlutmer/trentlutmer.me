import { PaddedPicture } from '../components/PaddedPicture/PaddedPicture'
import { P, Paragraphs } from '../components/CaseStudy/CaseStudy'
import { ProjectSplit } from '../components/ProjectSplit/ProjectSplit'
import { Typography } from '../components/Typography/Typography'

// Ported from trentlutmer.me (docs/hp-dc.html): the same copy in the same order, set in v4's
// ProjectSplit layout. The source page's hero picture (001) leads; the looping screen recordings
// from public/media/hp-dc follow, then the rest of the source page's pictures (002–006). The source
// had no alt text; these are written from the pictures (the GIFs by the tab each one shows).
const SHOT = (n) => `/media/hp-dc/hp-dc-00${n}.jpg`

// A picture shown smaller inside a black card (PaddedPicture): the card keeps the picture's proportions.
// `size` is the file's own [w, h] when it differs from the card's `ratio` (the recordings cropped to the
// app window, 1428×1080, in a 16:9 card).
const padded = (src, ratio, alt, padding = '3rem', size = ratio) => ({
  component: <PaddedPicture src={src} size={size} ratio={ratio} alt={alt} padding={padding} />,
})

const MEDIA = [
  {
    image: SHOT(1),
    ratio: [2880, 2048],
    alt: 'HP Display Center in its dark theme on the Display tab: brightness, contrast, sharpness and black stretch controls, beside a list of five connected HP monitors, over a beach wallpaper.',
  },
  { image: '/media/hp-dc/HP_Display_1080p_loop.gif', ratio: [1428, 1080], alt: 'A screen recording of the HP Display Center Display tab.' },
  padded('/media/hp-dc/HP_Color_1080p_loop.gif', [1920, 1080], 'A screen recording of the HP Display Center Color tab.', '3rem', [1428, 1080]),
  padded('/media/hp-dc/HP_Input_1080p_loop.gif', [1920, 1080], 'A screen recording of the HP Display Center Input tab.', '3rem', [1428, 1080]),
  padded('/media/hp-dc/HP_View_1080p_loop.gif', [1920, 1080], 'A screen recording of the HP Display Center View tab.'),
  padded('/media/hp-dc/HP_AudioCamera_1080p_loop.gif', [1920, 1080], 'A screen recording of the HP Display Center audio and camera settings.', '3rem', [1428, 1080]),
  padded(SHOT(2), [2880, 2048], 'HP Display Center, dark theme, Input tab: input source choices, resolution and refresh rate, and speaker volume with a mute toggle.'),
  padded(SHOT(3), [2880, 2048], 'HP Display Center, dark theme, View tab: pivot options at 0, 90, 180 and 270 degrees, and a grid of desktop partition layouts.'),
  {
    image: SHOT(4),
    ratio: [2880, 2048],
    alt: 'HP Display Center in its light theme on the Color tab: color presets, RGB gain sliders and a color calibration panel, over a mountain wallpaper.',
  },
  {
    image: SHOT(5),
    ratio: [2880, 2048],
    alt: 'HP Display Center, light theme, View tab: pivot options and eight desktop partition layouts.',
  },
  padded(SHOT(6), [2880, 2048], 'HP Display Center, light theme, Display tab: brightness, contrast, sharpness and black stretch controls.', '0'),
]

export function HpDisplayCenter() {
  return (
    <ProjectSplit
      title="HP Display Center"
      readTime="30 second read"
      lead="Restricted by physical switches, I designed tools to help users configure their display, keyboard, and mice settings and increase productivity."
      info={[
        {
          label: 'Download',
          value: (
            <a
              href="https://www.microsoft.com/en-us/p/hp-display-center/9nt6fq9kqf90?activetab=pivot:overviewtab"
              target="_blank"
              rel="noreferrer"
              className="about__inline-link"
              tabIndex={0}
            >
              Download for Windows 10 →<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ),
        },
      ]}
      media={MEDIA}
    >
      <Typography as="h2" variant="header-3">
        Productivity booster
      </Typography>
      <Paragraphs>
        <P>
          An application that provides users control of their viewing experience. With HPDC, you can
          configure your brightness, contrast, color preferences, resolution, and desktop partitions for
          your monitor. HPDC boosts your productivity painlessly.
        </P>
      </Paragraphs>
    </ProjectSplit>
  )
}

export default HpDisplayCenter
