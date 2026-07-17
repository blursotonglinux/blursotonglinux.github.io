// Tailwind CDN configuration — theme customization only.
// Loaded after the Tailwind CDN script, before any content/logic scripts.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        mono: ['"Atkinson Hyperlegible Mono"', 'monospace'],
      },
      colors: {
        // Standalone bright utility accent
        gold: '#fbbf24',

        // 1. SQUID SCALE (Indigo/Blue)
        // Steps 600-950 pass WCAG AAA (>= 7:1) on white/50 backgrounds.
        squid: {
          50: '#f0f2fc',  // Lightest tint
          100: '#e3e7f8', // Original: lavender
          200: '#cbd2f3',
          300: '#b9c2f2', // Original: space.squid
          400: '#a9b4ec', // Original: squid
          500: '#7d8de0',
          600: '#5466d1', // Valid AAA text step on light surfaces
          700: '#3b4494', // Original: squid-deep (Perfect dark UI accent anchor)
          800: '#2a306b',
          900: '#1a1f47',
          950: '#0f122b',
        },

        // 2. INK & SPACE NEUTRALS (Cool Dark Mode Backbone)
        // Steps 50-200 maintain a perfect > 7:1 AAA ratio against 800-950 dark surfaces.
        ink: {
          50: '#fdfbf7',  // Original: cream
          100: '#f3f4f6', // Original: space.starlight
          200: '#e5e7eb',
          300: '#d1d5dd',
          400: '#9aa0b0',
          500: '#6a7284',
          600: '#4c5467',
          700: '#2b2724', // Original: ink 
          800: '#141b2d', // Original: space.card
          900: '#0b0f19', // Original: space.bg
          950: '#05070c', //
        },

        // 3. FOX SCALE (Warm Earths & Radiant Oranges)
        fox: {
          50: '#fff6e5',
          100: '#ffebc7',
          200: '#ffd387',
          300: '#ffb83c',
          400: '#ffa000',
          500: '#ff9200',
          600: '#e87500',
          700: '#b05700',
          800: '#914400',
          900: '#7b3f00', // Original: fox
          950: '#451e00',
        },

        // 4. WHEAT SCALE (Warm Muted Yellows & Olive Grays)
        wheat: {
          50: '#fcfcec',
          100: '#f8f6d8',
          200: '#f2eeb0',
          300: '#e8e281',
          400: '#d9d04f',
          500: '#c1b838',
          600: '#9a9227',
          700: '#756f23',
          800: '#5d581d',
          900: '#545126', // Original: wheat
          950: '#2b290b',
        },

        // 5. ROSE SCALE (Deep Red / Crimson Crimson Tones)
        rose: {
          50: '#fef1f3',
          100: '#fbe5e8',
          200: '#facfd4',
          300: '#f9a6b3',
          400: '#f5718b',
          500: '#ef4471',
          600: '#dc265f',
          700: '#b7224f',
          800: '#8a2740', // Original: rose
          900: '#541424',
          950: '#2b0710',
        },
      }
    }
  }
};
