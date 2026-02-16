/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#0b1220", // каалаган кара түс
        "energy-blue": "#1f6bff",
        "vibrant-orange": "#ff4d00",
        "neon-lime": "#b7ff00",
      },
    },
  },
  plugins: [],
};
