/** @type {import('tailwindcss').Config} */
module.exports = {
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
      keyframes: {
        roll: {
          "0%": { transform: "translateX(-100px) rotate(0deg)" },
          "50%": { transform: "translateX(50vw) rotate(180deg)" },
          "100%": { transform: "translateX(100vw) rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        roll: "roll 9s linear forwards",
        "fade-in": "fadeIn 1s ease-in forwards",
      },
    },
  },
  plugins: [],
}
