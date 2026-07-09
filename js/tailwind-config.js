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
        // Universal palette: squid mascot colours as primary accent,
        // Little Prince book imagery as secondary accents, one dark
        // "deep space" hero section, everything else in light tones.
        cream: '#FDFBF7',
        lavender: '#EDEFFB',
        ink: '#2B2724',
        squid: '#A9B4EC',
        'squid-deep': '#3B4494',
        wheat: '#545126', // originally #5C4A0D
        fox: '#7B3F00', // originally #7A3B14
        rose: '#8A2740', 
        space: {
          bg: '#0B0F19',
          card: '#141B2D',
          gold: '#FBBF24',
          starlight: '#F3F4F6',
          squid: '#B9C2F2',
        }
      }
    }
  }
};
