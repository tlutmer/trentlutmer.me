import { Fragment, useEffect, useRef, useState } from 'react'

const EMAIL = 'hello.tlutmer@gmail.com'

// Contact links, in order. External ones open in a new tab; the email isn't a link at all — it's a
// button that copies the address to the clipboard (see CopyEmail).
const LINKS = [
  {
    label: 'Resume',
    href: 'https://www.dropbox.com/scl/fi/b7o1ecgt0ve6y0kc5ppzd/trentlutmer-s-resume-26.pdf?rlkey=dfzdv3k8anvrtwoi001oadopx&st=p5jft09z&dl=0',
  },
  { label: 'Github', href: 'https://github.com/tlutmer' },
  { label: 'Email', copy: EMAIL },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tlutmer' },
]

// Copies the address to the clipboard instead of opening a mail client. The label says "Copied" for
// a couple of seconds, and a polite live region says the same to a screen reader; if the browser
// refuses (no clipboard access), it shows the address so it can be copied by hand.
function CopyEmail({ label, address }) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    let next = 'copied'
    try {
      await navigator.clipboard.writeText(address)
    } catch {
      next = 'failed'
    }
    setStatus(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('idle'), next === 'copied' ? 2000 : 6000)
  }

  return (
    <>
      <button type="button" className="about__link" onClick={copy}>
        {status === 'copied' ? 'Copied' : status === 'failed' ? address : label}
        {status === 'idle' && <span className="sr-only"> (copies the address to the clipboard)</span>}
      </button>
      <span className="sr-only" role="status">
        {status === 'copied' && `${address} copied to the clipboard`}
        {status === 'failed' && `Couldn't copy. The address is ${address}`}
      </span>
    </>
  )
}

// Resume ✦ Github ✦ Email ✦ LinkedIn, set like the nav's "Work ✦ Info" but as a label (12.8px,
// `.type--label`) in the page's own text colour (see `.about__links` in site-nav.css). Sits under
// the Info page's heading.
export function ContactLinks() {
  return (
    <nav aria-label="Contact" className="type type--label about__links">
      {LINKS.map(({ label, href, copy }, i) => (
        <Fragment key={label}>
          {i > 0 && (
            <span className="about__links-sep" aria-hidden="true">
              ✦
            </span>
          )}
          {copy ? (
            <CopyEmail label={label} address={copy} />
          ) : (
            <a href={href} className="about__link" target="_blank" rel="noreferrer" tabIndex={0}>
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </Fragment>
      ))}
    </nav>
  )
}

export default ContactLinks
