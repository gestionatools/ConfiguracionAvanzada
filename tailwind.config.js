/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        nucleo: {
          50:  '#E8F5FC',
          100: '#C5E4F6',
          200: '#92CAEC',
          500: '#1B77B0',
          600: '#1565A0',
          700: '#0D4A7A',
          800: '#07304F',
          900: '#031E33',
        },
        teal: {
          400: '#26C6DA',
          500: '#00ACC1',
          600: '#0097A7',
        },
      },
    },
  },
  plugins: [],
}
