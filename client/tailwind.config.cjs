/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    scale: {
      'mobile': '400px'
    },
    extend: {},
  },
  plugins: [],
}