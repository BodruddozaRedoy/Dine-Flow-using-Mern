/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: "class", // Use 'class' strategy for dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
        protest: ["Protest Revolution", "serif"],
      },
      animation: {
        "spin-slow": "spin 7s linear infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#ea6a12",
          secondary: "#fadfcb",
          accent: "#009420",
          neutral: "#291c10",
          "base-100": "#ffeff7",
          info: "#00a3ff",
          success: "#009f42",
          warning: "#cea300",
          error: "#ff316f",
          "text-content": "#a1a4a1",
          "--rounded-btn": "0.5rem",
        },
      },
      {
        myThemeDark: {
          primary: "#ea6a12",
          secondary: "#47341a",
          accent: "#005f13",
          neutral: "#1b1b1b",
          "base-100": "#181818",
          info: "#0094ff",
          success: "#007f33",
          warning: "#aa8c00",
          error: "#ff1c4d",
          "text-content": "#d1d1d1",
          "--rounded-btn": "0.5rem",
        },
      },
    ],
  },
};
