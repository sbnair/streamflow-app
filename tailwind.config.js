module.exports = {
  purge:  ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
