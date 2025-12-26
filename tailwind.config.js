/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "app-bg": {
          light: "#f8fafc",
          dark: "#0f172a",
        },
        "card-bg": {
          light: "#ffffff",
          dark: "#1e293b",
        },
        "card-hover": {
          light: "#f1f5f9",
          dark: "#334155",
        },
      },
      fontFamily: {
        tibetan: [
          "TibetanChogyalUnicode-170221",
          "TibetanChogyalUnicode-ID",
          "TibetanChogyalUnicode",
          "TibetanMachineUnicode",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
