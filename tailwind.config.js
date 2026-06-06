/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#A8D5BA',
        'soft-green': '#DFF3E3',
        'cream': '#FFF6DA',
        'pastel-orange': '#F6B26B',
        'text-dark': '#2F3A32',
        'text-muted': '#6B756D',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Baloo 2', 'Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
