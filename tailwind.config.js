/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        customDark: "#0B0F1A",
        neonLime: "#B6FF3B",
        vibrantOrange: "#FF4D00",
        energyBlue: "#1F6BFF",
        energyYellow: "#FFB000",
      },

      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        jakarta: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      borderRadius: {
        "3xl": "1.5rem",
      },

      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
      },

      scale: {
        105: "1.05",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-in-out",
        "scale-in": "scaleIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
