// A live specimen of the three Kelex button types (Primary, Secondary, Tertiary), each looping
// through its own enabled → hover → press states — pulled from the Kelex Figma file's actual tokens
// and, for Primary/Secondary, its own smart-animate motion data (the overshoot on hover, the elastic
// press). Built on the site's own Bevel component (the same one Modal uses): the fill (Primary/
// Secondary) and the outline (Tertiary) both read `currentColor`, so the whole loop is driven by
// animating `color`/`transform`/`box-shadow` on the wrapper — no separate asset or hack needed.
// Styles: .kelex-btn-demo__* in index.css, on the site's own --grey-N and --font-mono tokens, so it
// inverts with the theme like everything else.
import { Bevel } from '../Bevel/Bevel'

const TYPES = [
  { type: 'primary', label: 'Ready' },
  { type: 'secondary', label: 'Set' },
  { type: 'tertiary', label: 'Go' },
]

export function KelexButtonDemo() {
  return (
    <div className="kelex-btn-demo">
      <div className="kelex-btn-demo__row">
        {TYPES.map(({ type, label }) => (
          <KelexButtonSlot key={type} type={type} label={label} />
        ))}
      </div>
    </div>
  )
}

function KelexButtonSlot({ type, label }) {
  const bevelVariant = type === 'tertiary' ? 'tertiary' : 'primary'
  return (
    <div className={`kelex-btn-demo__btn kelex-btn-demo__btn--${type}`}>
      <Bevel side="left" variant={bevelVariant} />
      <div className="kelex-btn-demo__body">
        <span className="kelex-btn-demo__label">{label}</span>
      </div>
      <Bevel side="right" variant={bevelVariant} />
    </div>
  )
}

export default KelexButtonDemo
