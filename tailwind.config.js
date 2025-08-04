/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'paxeer-blue': '#35b7ff',
        'paxeer-green': '#74f05a',
        'paxeer-black': '#000000',
        'paxeer-white': '#ffffff',
      },
    },
  },
  plugins: [],
}