/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tk: {
          primary: '#00bcd4',
          secondary: '#0097a7',
          dark: '#1a1a1a',
          darker: '#0d0d0d',
          light: '#f5f5f5',
          gray: '#b3b3b3',
          border: 'rgba(0, 188, 212, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
