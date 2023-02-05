/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        imagePost: '32rem',
      },
      gridTemplateColumns: {
        sm: 'auto 1fr',
        md: 'auto 2fr 1.5fr',
        lg: '0.9fr 2.1fr 1.4fr',
        xl: '1fr 2.4fr 1.6fr',
        tweet: 'auto 1fr',
      },
      boxShadow: {
        border: '0 0 6px 1px rgba(255 255 255 0.2)',
      },
      fontSize: {
        xs: [
          '13px',
          {
            lineHeight: '18px',
          },
        ],
      },
    },
  },
  plugins: [],
}
