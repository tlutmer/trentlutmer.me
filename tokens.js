// tokens.js
// KELEX DESIGN SYSTEM — JS Tokens
// Use these in React components, styled-components, or anywhere CSS vars aren't available

export const colors = {
  grey: {
    100: '#ffffff', 200: '#e3e3e5', 300: '#ceced3', 400: '#ababb1',
    500: '#858484', 600: '#706e6e', 700: '#232426', 800: '#151517', 900: '#000000',
  },
  red: {
    100: '#ffded9', 200: '#ffbcb0', 300: '#ff2600', 400: '#e62200',
    500: '#cc1e00', 600: '#bf1d00', 700: '#991700', 800: '#731100', 900: '#590d00',
  },
  orange: {
    100: '#fff2d9', 200: '#ffe3b0', 300: '#ffa600', 400: '#e69500',
    500: '#cc8500', 600: '#bf7d00', 700: '#996400', 800: '#734b00', 900: '#593a00',
  },
  yellow: {
    100: '#fffcd9', 200: '#fff8b0', 300: '#ffea00', 400: '#e6d300',
    500: '#ccbb00', 600: '#bfb000', 700: '#998c00', 800: '#736900', 900: '#595200',
  },
  green: {
    100: '#d9ffec', 200: '#b0ffd8', 300: '#00ff80', 400: '#00e673',
    500: '#00cc66', 600: '#00bf60', 700: '#00994d', 800: '#00733a', 900: '#00592d',
  },
  cyan: {
    100: '#d9fffd', 200: '#b0fffb', 300: '#00fff2', 400: '#00e6da',
    500: '#00ccc2', 600: '#00bfb6', 700: '#009991', 800: '#00736d', 900: '#005955',
  },
  blue: {
    100: '#d9efff', 200: '#b0deff', 300: '#0095ff', 400: '#0086e6',
    500: '#0077cc', 600: '#0070bf', 700: '#005999', 800: '#004373', 900: '#003459',
  },
  purple: {
    100: '#f0d9ff', 200: '#dfb0ff', 300: '#9900ff', 400: '#8a00e6',
    500: '#7a00cc', 600: '#7300bf', 700: '#5c0099', 800: '#450073', 900: '#360059',
  },
  magenta: {
    100: '#ffd6ff', 200: '#ffb0ff', 300: '#ff00ff', 400: '#da00e6',
    500: '#e000cc', 600: '#bf00bf', 700: '#960099', 800: '#6f0073', 900: '#560059',
  },
};

export const typography = {
  fontFamily: {
    mono: '"IBM Plex Mono", monospace',
  },
  fontSize: {
    label:   '12.8px',
    body:    '16px',
    title3:  '86px',
    title2:  '96px',
    display: '258px',
  },
  fontWeight: {
    regular: 400,
    bold:    700,
  },
  lineHeight: {
    tight: 1,
  },
};

export const spacing = {
  0:  '0px',
  40: '40px',
  80: '80px',
};
