// The coffee status — a small floating card at the bottom middle of the window, on the Work and Info pages only (see Layout.jsx): a label tab
// ("Currently sipping") above a chamfered card with a Hario V60 icon, what is being sipped and where
// it is from. The whole thing links to the coffee. Styles: .coffee-pill* in site-nav.css.
export function CoffeePill() {
  return (
    <a
      className="coffee-pill"
      href="https://www.barrettscoffee.com/products/honduras-gesha-santa-barbara-allan-cobos-copy?variant=47958721200342"
      target="_blank"
      rel="noreferrer"
      tabIndex={0}
      aria-label="Currently sipping: Cauca Sotara from Barrett's (opens in a new tab)"
    >
      <span className="coffee-pill__tag" aria-hidden="true">Currently sipping</span>
      <span className="coffee-pill__card">
        <span className="coffee-pill__inner">
          <span className="coffee-pill__thumb" aria-hidden="true">
            {/* A Hario V60: the cone with its ribs, the rim, the ear handle and the spout. */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5.5h16" />
              <path d="M5 5.5 10 16h4l5-10.5" />
              <path d="M18.6 8h1.4a1.4 1.4 0 0 1 0 2.8h-.9" />
              <path d="M10 16v1.5h4V16" />
              <path d="M8.6 9l2.2 4.5M12 7.5v8M15.4 9l-2.2 4.5" />
              <path d="M12 19.5v1.5" />
            </svg>
          </span>
          <span className="coffee-pill__body">
            <span className="coffee-pill__title">Cauca Sotara</span>
            <span className="coffee-pill__sub">Barrett's Coffee</span>
          </span>
        </span>
      </span>
    </a>
  )
}

export default CoffeePill
