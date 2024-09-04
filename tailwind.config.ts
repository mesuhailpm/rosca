import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { transform: 'scale(0.1)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'scale-in': 'scale-in 1s ease-in forwards',
        'fade-in': 'fade-in 3s ease-out forwards',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans'],
        pacifico: ['Caveat', 'cursive'],
        kenia: ['Kenia', 'sans']

      }
    },
  },
  plugins: [],
}
export default config