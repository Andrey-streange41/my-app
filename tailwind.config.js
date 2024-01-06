const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      color: {
        secondary: "#FFF",
      },
      backgroundColor: {
        primary: "#EBECEE",
        secondary: "#FFF",
        brand: "#766ED3",
      },
      height: {
        header: "84px",
        card: "500px",
      },
      width: {
        sidebar: "84px",
        card: "300px",
      },
    },
  },
  plugins: [],
});
