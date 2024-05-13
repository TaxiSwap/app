import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '64': '64px',
      },
      lineHeight: {
        '80': '80px',
      },
      fontWeight: {
        heavy: '900',
      },
      colors: {
        "header-yellow": "#FBD922",
        blackish: "#312411",
      },
      fontFamily: {
        sans: [
          "Questrial",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
