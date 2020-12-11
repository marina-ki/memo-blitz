// tailwind.config.js
module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // ringWidth: {
      //   DEFAULT: "0px",
      // },
    },
  },
  variants: {
    extend: {
      // textDecoration: ["focus-visible"],
    },
  },
  plugins: [],
  // corePlugins: {
  //   ringWidth: false,
  // },
}
