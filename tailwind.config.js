/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: '#F5F3F1',
          100: '#EBE7E3',
          200: '#D5CDC7',
          300: '#BDB1A7',
          400: '#8E7F73',
          500: '#5C4E43',
          600: '#463B33',
          700: '#342C26',
          800: '#2A2421', // Primary Brand Dark
          900: '#1D1917',
          950: '#120F0E',
        },
        linen: {
          50: '#FFFFFF',
          100: '#FAF8F5', // Soft Warm Background
          200: '#F4EFEA',
          300: '#ECE4DC',
          400: '#DFD4C8',
          500: '#CFBFB0',
        },
        brass: {
          50: '#FAF5EE',
          100: '#F3E8D7',
          200: '#E5CCA9',
          300: '#D5AF79',
          400: '#BA8D4E',
          500: '#A67C52', // Warm Artisanal Accent
          600: '#8D643B',
          700: '#724E2B',
        },
        sand: {
          50: '#FDFCFB',
          100: '#F7F5F2',
          200: '#EAE5DF', // Soft Neutral Border
          300: '#DBD4CB',
          400: '#B8ADA0',
          500: '#94887A',
        },
        forest: {
          50: '#F0F7F2',
          500: '#2E6F40', // Success green
          700: '#1F4B2B',
        },
        terracotta: {
          50: '#FDF3F2',
          500: '#A62B2B', // Error red
          700: '#7A1F1F',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(42, 36, 33, 0.04)',
        card: '0 4px 20px rgba(42, 36, 33, 0.06)',
        elevated: '0 12px 36px rgba(42, 36, 33, 0.10)',
        drawer: '-4px 0 30px rgba(42, 36, 33, 0.15)',
      },
    },
  },
  plugins: [],
};
