/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        aegis: {
          navy: '#0F172A',
          blue: '#1D4ED8',
          blueDark: '#1E3A8A',
          teal: '#14B8A6',
          bg: '#F8FAFC',
          border: '#E2E8F0',
        },
        status: {
          covered: '#16A34A',
          partial: '#D97706',
          rejected: '#DC2626',
          pending: '#64748B',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
