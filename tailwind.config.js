/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        azul: '#211710',
        'azul-suave': '#2E2318',
        dourado: '#C9A24B',
        'dourado-claro': '#E6C879',
        terra: '#B5532A',
        turq: '#2C7DA0',
        cinza: '#E8D8B5',
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        scripture: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(201,162,75,0.45)',
        'glow-sm': '0 0 20px -6px rgba(201,162,75,0.4)',
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
        breathe: {
          '0%, 100%': { transform: 'scale(0.78)' },
          '50%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
        floatGlow: 'floatGlow 4s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
        breathe: 'breathe 11s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
