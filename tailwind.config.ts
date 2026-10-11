import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        maroon: {
          50: 'hsl(350 30% 97%)',
          100: 'hsl(350 30% 93%)',
          200: 'hsl(350 35% 85%)',
          300: 'hsl(350 40% 72%)',
          400: 'hsl(350 50% 52%)',
          500: 'hsl(350 60% 38%)',
          600: 'hsl(350 65% 32%)',
          700: 'hsl(350 70% 26%)',
          800: 'hsl(350 72% 20%)',
          900: 'hsl(350 75% 15%)',
          950: 'hsl(350 78% 10%)',
        },
        gold: {
          50: 'hsl(42 40% 96%)',
          100: 'hsl(42 45% 92%)',
          200: 'hsl(42 50% 85%)',
          300: 'hsl(42 55% 76%)',
          400: 'hsl(42 60% 65%)',
          500: 'hsl(42 65% 55%)',
          600: 'hsl(42 60% 45%)',
          700: 'hsl(42 55% 35%)',
          800: 'hsl(42 50% 25%)',
          900: 'hsl(42 45% 18%)',
          950: 'hsl(42 45% 10%)',
        },
        ivory: {
          50: 'hsl(40 33% 98%)',
          100: 'hsl(40 25% 96%)',
          200: 'hsl(40 20% 93%)',
          300: 'hsl(40 15% 88%)',
        },
        sandstone: {
          400: 'hsl(30 30% 70%)',
          500: 'hsl(30 32% 60%)',
          600: 'hsl(30 30% 50%)',
        },
        terracotta: {
          400: 'hsl(18 55% 55%)',
          500: 'hsl(18 60% 47%)',
          600: 'hsl(18 65% 40%)',
        },
        charcoal: {
          700: 'hsl(20 14% 20%)',
          800: 'hsl(20 16% 13%)',
          900: 'hsl(20 20% 9%)',
          950: 'hsl(20 24% 6%)',
        },
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
        '55': '0.55',
        '65': '0.65',
        '85': '0.85',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.1)' },
        },
        'shimmer': {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'scale-in': 'scale-in 0.8s ease-out forwards',
        'slow-zoom': 'slow-zoom 20s ease-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
