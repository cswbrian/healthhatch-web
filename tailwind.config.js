/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './static/**/*.html',
    './public/**/*.html',
  ],
  safelist: [
    'bg-brand-cream',
    // Pattern to match all brand color variations (covers text-, bg-, border-, hover: variants)
    {
      pattern: /(text|bg|border|hover:text|hover:bg)-brand-(green|orange|yellow|cream|gold|board|advisor)(-(light|lighter))?/,
    },
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          DEFAULT: '#2d5016',
          light: '#a8d5a3',
          lighter: '#e8f5e6',
        },
        'brand-orange': {
          DEFAULT: '#f97316',
          light: '#fb923c',
        },
        'brand-yellow': {
          DEFAULT: '#fdc92d',
          light: '#fde68a',
        },
        'brand-cream': '#f4f1e9',
        'brand-gold': '#b8860b',
        'brand-board': '#006f40',
        'brand-advisor': '#f84d11',
      },
      fontFamily: {
        sans: ['Unbounded', 'system-ui', 'sans-serif'],
        chinese: ['Huninn', 'Unbounded', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

