// Typography.jsx
// Kelex Design System — Typography component
// Fetched from Figma styles: "Plex Mono/*" text styles
//
// Scale (from Figma) — the sizes live in index.css, one `.type--<variant>` class each:
//   label     12.8px  weight 400  — UI labels, captions
//   paragraph 16px    weight 400  — body text
//   header-3  20.8px  weight 400
//   header-2  24px    weight 400
//   header-1  32px    weight 400
//   subtitle-3 36px   weight 400
//   subtitle-2 44px   weight 400  (Figma label: "48")
//   subtitle-1 64px   weight 400
//   title-3   86px    weight 400
//   title-2   96px    weight 400
//   title-1   130px   weight 400
//   display-2 172px   weight 400  (Figma label: "174")
//   display-1 258px   weight 400
//
// All styles use IBM Plex Mono, line-height INTRINSIC (~1.3x size)

const TAG_MAP = {
  'label':      'span',
  'paragraph':  'p',
  'header-3':   'h3',
  'header-2':   'h2',
  'header-1':   'h1',
  'subtitle-3': 'h3',
  'subtitle-2': 'h2',
  'subtitle-1': 'h1',
  'title-3':    'h1',
  'title-2':    'h1',
  'title-1':    'h1',
  'display-2':  'h1',
  'display-1':  'h1',
}

export function Typography({ variant = 'paragraph', as, children, className = '' }) {
  const Tag = as ?? TAG_MAP[variant] ?? 'span'

  return <Tag className={['type', `type--${variant}`, className].filter(Boolean).join(' ')}>{children}</Tag>
}

export default Typography
