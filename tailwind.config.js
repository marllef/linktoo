module.exports = {
  content: ["./src/**/*.{html,ts,js,tsx}"],
  theme: {
    extend: {
      colors: {},
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
};
