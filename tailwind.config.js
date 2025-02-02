/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          base: "#1A1A1A",
          muted: "#AEAEAE",
          accent: "#3182CE",
          primary: "#c5bebe",
        },

        background: {
          primary: "#0D0C0F",
          base: "#0D0C0F",
          elevated: "#1A161F",
          surface: "#FFFFFF",
          subtle: "#F7FAFC",
          accent: "#E2E8F0",
          active: "#FF2222",
          muted: "#302a37",
        },
      },
      keyframes: {
        zoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        zoom: "zoom 1s infinite alternate",
      },
    },
  },
  plugins: [],
};
