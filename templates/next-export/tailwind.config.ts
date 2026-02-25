import type { Config } from "tailwindcss";

// Note: The exporter dynamically overwrites this file with project-specific colors.
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
