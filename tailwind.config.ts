import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#003BE2',
          dark: '#002BB0',
          soft: '#E8EEFF',
        },
        accent: {
          DEFAULT: '#D4FB20',
          dark: '#B6D910',
          muted: '#C1E338',
        },
        ink: {
          DEFAULT: '#242528',
          strong: '#040819',
          muted: '#4B4C53',
          faint: '#82868E',
          soft: '#4F4F4F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F5F6',
          soft: '#FAFAFA',
          line: '#E5E6E8',
        },
        highlight: {
          purple: '#7F30F7',
        },
        primary: {
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f9fafb',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
        },
      },
      fontFamily: {
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        sans: ['var(--font-satoshi)', 'Satoshi', 'system-ui', 'sans-serif'],
        logo: ['var(--font-clash)', 'Clash Display', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 12px 40px rgba(4, 8, 25, 0.08)',
        float: '0 20px 50px rgba(4, 8, 25, 0.12)',
      },
      backgroundImage: {
        'brand-grid':
          'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
