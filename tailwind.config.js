/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: '#0D1B2A',
        'azul-suave': '#15263b',
        dourado: '#D4AF37',
        cinza: '#EAEAEA',
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
