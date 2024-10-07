import { colorsConfig } from "./src/styles/config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: colorsConfig,
    extend: {
      borderRadius: {
        DEFAULT: '12px',
      }
    },
  },
  plugins: [],
};
export default config;
