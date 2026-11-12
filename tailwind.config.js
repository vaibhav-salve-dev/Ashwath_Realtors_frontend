/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ashwath: {
          obsidian: '#0B0F19',
          deep: '#0F172A',
          navy: '#161F33',
          slate: '#334155',
          gold: '#C5A059',
          goldLight: '#F0DBA5',
          goldDark: '#947128',
          champagne: '#DFC17B',
          bronze: '#B38038',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          line: '#E2E8F0',
          muted: '#64748B',
        },
        brand: {
          dark: '#0B0F19',
          navy: '#0F172A',
          slate: '#1E293B',
          gold: '#C5A059',
          amber: '#DFC17B',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
        'glass-hover': '0 16px 40px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
        'glass-dark': '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
};
