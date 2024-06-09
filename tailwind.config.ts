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
        pale: "#FFE897",
        brownish: "#826754"
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
      boxShadow: {
        custom: '0px 8px 40px #4232347D', // Custom shadow
      },
      borderRadius: {
        '36': '36px',
        '20': '20px',
      },
      minHeight: {
        'screen-80': '80vh', // 90% of the viewport height
      },
    },
  },
  plugins: [],
};
export default config;
