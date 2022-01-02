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
        "danger": "#dc2626",
        "success": "#16a34a",
        "info": "#1976d2",
        "warning": "#fbbf24",
      }
    },
  },
  plugins: [],
};
