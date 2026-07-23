/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        spring: {
          green: "#A1CB35",
          greenDark: "#769826",
          yellow: "#FFDE4E",
          orange: "#FF9D4D",
        },
      },
    },
  },
  plugins: [],
};
