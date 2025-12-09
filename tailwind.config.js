/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

