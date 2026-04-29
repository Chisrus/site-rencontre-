/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: "#FAF9F6",
        cream: "#F5F3EE",
        ivory: "#FEFDFB",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E7C68B",
          dark: "#A6853A",
        },
        charcoal: "#1C1C1E",
        muted: "#6B6B6F",
        "text-soft": "#9A9A9E",
        rose: {
          accent: "#C8A2C8",
          deep: "#9B2242",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'luxury': '0 4px 20px rgba(28, 28, 30, 0.06)',
        'luxury-lg': '0 12px 40px rgba(28, 28, 30, 0.08)',
        'luxury-xl': '0 20px 60px rgba(28, 28, 30, 0.1)',
        'gold': '0 8px 30px rgba(201, 168, 76, 0.15)',
        'gold-lg': '0 12px 36px rgba(201, 168, 76, 0.25)',
      },
    },
  },
  plugins: [],
}
