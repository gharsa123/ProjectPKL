/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #34D5F4 33%, #1865A6 62%)',
        'custom-gradient1': 'linear-gradient(to right, #34D5F4 33%, #1865A6 62%)',
        'custom-gray': 'rgba(209, 209, 209, 0.8)',
        'custom-gradient2' : 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
        'custom-gradient3' : 'linear-gradient(to left, #00c6fb 0%, #005bea 100%)'
      },
      colors: {
        'custom-cyan': '#63D1D1',
      },
      opacity: {
        '35': '0.35',
      },
      animation: {
        'rotate-360': 'rotate360 1s linear infinite',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
