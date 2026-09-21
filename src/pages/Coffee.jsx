import { BentoCard } from '../components/BentoCard/BentoCard'
import { generateShape } from '../lib/randomShape'
import { Typography } from '../components/Typography/Typography'

const BREW_DETAILS = [
  'Type: Pour-over',
  'Method: 4:6 by Tetsu Kasuya',
  'Device: Hario v60 dripper',
  'Grid size: 450 microns',
  'Paper: CAFEC V60 02 - T-90',
  'Water temperature: 92/197 degrees',
]

const ROASTS = [
  {
    name: 'Equalizer from Corvus Coffee Roasters',
    image: '/images/coffee/2026-crovus-equilizer.png',
  },
  {
    name: 'Echo Gesha from Corvus Coffee Roasters',
    image: '/images/coffee/2026-corvus-echogesha.png',
  },
  { name: 'Fruit Snack Java', image: '/images/coffee/2026-desnudo-fruitsnackjava.png' },
  { name: 'Banko Taratu', image: '/images/coffee/2026-medici-bankotaratu.png' },
  { name: 'Rainforest Alliance', image: '/images/coffee/2026-baretts-rainforestalliance.png' },
  { name: 'Fruity Mazapan Catcurra', image: '/images/coffee/2026-desnudo-fruitymarzipancatcurra.png' },
  { name: 'Sidama Burua Hamasho', image: '/images/coffee/2026-peach-sidamabura.png' },
  { name: 'High Tea Gesha', image: '/images/coffee/2026-desnudo-highteagesha.png' },
]

// Each card gets its own randomly generated outline — varied chamfer sizes and
// notch sizes/lengths, every diagonal at 45° (see lib/randomShape.js). Seeded, so
// the shapes are stable across reloads; change SHAPE_SEED to re-roll them all.
const SHAPE_SEED = 20260921
const SHAPES = ROASTS.map((_, i) => generateShape(SHAPE_SEED + i * 7919))

// The nav's "Currently sipping" link lands here. Same structure as Home — nav,
// a headline block, then a grid of outlined cards — with the roast grid on the
// shared 800px content column.
export function Coffee() {
  return (
    <main id="main-content">
      <div className="site-shell site-shell--body site-shell--end">
        <div className="content">
          <div className="about__card--page">
            <div className="about__body-wrap">
              <Typography variant="header-1">Daily driver</Typography>
              <ul className="about__brew-list">
                {BREW_DETAILS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="roasts-wrap">
            <div className="roasts">
              {ROASTS.map((roast, i) => (
                <BentoCard
                  key={roast.name}
                  shapeVars={SHAPES[i]}
                  title={roast.name}
                  image={roast.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Coffee
