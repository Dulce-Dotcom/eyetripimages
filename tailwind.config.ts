import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        'sans': ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'deep-blue': '#01019b',
        'magenta': '#cd00ff',
        'dark-grey': '#1B2A41',
        'hypnotic-white': '#F0F8FF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config