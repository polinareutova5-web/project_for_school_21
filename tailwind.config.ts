import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-display)', 'Inter', 'Arial', 'sans-serif']
      },
      colors: {
        school: {
          purple: '#7B2FF7',
          blue: '#2563EB',
          sky: '#22D3EE',
          teal: '#14B8A6',
          green: '#22C55E'
        }
      },
      backgroundImage: {
        brand: 'linear-gradient(110deg, #7B2FF7 0%, #2563EB 28%, #22D3EE 55%, #14B8A6 75%, #22C55E 100%)'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.10)'
      }
    }
  },
  plugins: []
};

export default config;
