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
        'shopping-car-heigh': 'calc(100vh - 120px)',
        '18': '74px',
        '128': '32rem',
      },
      colors: {
        'light-blue': '#a1d4e0',
        'dark-blue': '#5287c3',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      aspectRatio: {
        'product-image': '9 / 16',
      },
    },
  },
  plugins: [],
}
export default config
