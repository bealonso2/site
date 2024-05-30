import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
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
