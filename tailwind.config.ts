import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        'global-container': 'min(90%, 1200px)',
      },
      colors: {
        'light-blue': '#a1d4e0',
        'dark-blue': '#5287c3',
      },
    },
  },
  plugins: [],
}
export default config
