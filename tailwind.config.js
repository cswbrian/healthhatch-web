/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './static/**/*.html',
    './public/**/*.html',
  ],
  safelist: [
    // Pattern to match all brand color variations (covers text-, bg-, border-, hover: variants)
    {
      pattern: /(text|bg|border|hover:text|hover:bg)-brand-(green|orange|yellow)(-(light|lighter))?/,
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
          light: '#fde68a',
        },
      },
      fontFamily: {
        sans: ['Unbounded', 'system-ui', 'sans-serif'],
        chinese: ['Huninn', 'Unbounded', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

