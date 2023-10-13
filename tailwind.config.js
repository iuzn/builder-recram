/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#F2F6FB',
        primary: '#4AC2BF'
      },
      boxShadow: {
        base: '0px 0px 8px rgba(0, 0, 0, 0.08)'
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif']
      }
    }
  },
  plugins: []
}
