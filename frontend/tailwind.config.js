/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0bb1e1',
          50: '#FDF2F2',
          100: '#FADADD',
          200: '#F5A8B0',
          300: '#E8748B',
          400: '#D44B6B',
          500: '#0bb1e1',
          600: '#7A1616',
          700: '#611010',
          800: '#4A0B0B',
          900: '#330606',
        },
        gold: {
          DEFAULT: '#C8972A',
          light: '#E8B84B',
          dark: '#A07820',
        },
        dark: '#1a1a1a',
        cream: '#FAF7F0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(139,26,26,0.9) 0%, rgba(26,26,26,0.8) 100%)",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
