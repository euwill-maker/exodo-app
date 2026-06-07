/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: '#0D1B2A',
        'azul-suave': '#15263b',
        dourado: '#D4AF37',
        'dourado-claro': '#F0D77B',
        cinza: '#EAEAEA',
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(212,175,55,0.45)',
        'glow-sm': '0 0 20px -6px rgba(212,175,55,0.4)',
        sos: '0 10px 40px -6px rgba(220,38,38,0.55)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220,38,38,0.5)' },
          '50%': { boxShadow: '0 0 0 14px rgba(220,38,38,0)' },
        },
        floatGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
        floatGlow: 'floatGlow 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
