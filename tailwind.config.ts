import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        "fadeIn-delay-1": "fadeIn 1s ease-in-out 0.75s forwards",
        "fadeIn-delay-2": "fadeIn 1s ease-in-out 0.9s forwards",
        "fadeIn-delay-3": "fadeIn 1s ease-in-out 1.05s forwards",
        "fadeIn-delay-4": "fadeIn 1s ease-in-out 0.65s forwards",
        "fadeIn-delay-5": "fadeIn 1s ease-in-out 1.65s forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["dark", "light"],
    // themes: [
    //   {
    //     mytheme: {
    //       primary: "#211f25",
    //       "primary-content": "#cdcdcf",
    //       secondary: "#211f25",
    //       "secondary-content": "#cdcdcf",
    //       accent: "#211f25",
    //       "accent-content": "#cdcdcf",
    //       neutral: "#211f25",
    //       "neutral-content": "#cdcdcf",
    //       "base-100": "#211f25",
    //       "base-200": "#1b191f",
    //       "base-300": "#161419",
    //       "base-content": "#cdcdcf",
    //       info: "#0000ff",
    //       "info-content": "#c6dbff",
    //       success: "#008001",
    //       "success-content": "#d2e6d0",
    //       warning: "#ffff00",
    //       "warning-content": "#161600",
    //       error: "#ff0000",
    //       "error-content": "#160000",
    //     },
    //   },
    //   "wireframe",
    // ],
  },
  darkMode: "class", // Ensure dark mode is based on class
};
export default config;
