const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        danger: "#e60000",
        success: "#16a34a",
        info: "#0070f3",
        warning: "#f5a623",
      }
    },
  },
  plugins: [],
};
