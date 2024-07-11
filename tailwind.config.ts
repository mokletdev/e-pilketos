import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        xl: "1332px",
        lg: "821px",
        sm: "480px",
      },
      boxShadow: {
        "shadow-1": "0 1px 3px 0 rgba(166, 175, 195, 0.4)",
        "shadow-2": "0 5px 12px 0 rgba(0, 0, 0, 0.1)",
        "shadow-3": "0 4px 12px 0 rgba(13, 10, 44, 0.06)",
        "shadow-4": "0 10px 15px 0 rgba(5, 13, 29, 0.18)",
        "shadow-5": "0 32px 60px 0 rgba(13, 10, 44, 0.13)",
        "shadow-6": "0 20px 20px 0 rgba(5, 13, 29, 0.2)",
      },
      colors: {
        // base
        "primary-color": "#B6252A",
        "secondary-color": "#ED1E28",
        "primary-text-color": "#111928",
        "secondary-text-color": "#637381",
        // stroke
        stroke: "#DFE4EA",
        // dark
        "dark-1": "#111928",
        "dark-2": "#1F2A37",
        "dark-3": "#374151",
        "dark-4": "#4B5563",
        "dark-5": "#6B7280",
        "dark-6": "#9CA3AF",
        "dark-7": "#D1D5DB",
        "dark-8": "#E5E7EB",
        // red
        "red-dark": "#E10E0E",
        "red-light": "#F56060",
        "red-light-1": "#F23030",
        "red-light-2": "#F89090",
        "red-light-3": "#FBC0C0",
        "red-light-4": "#FDD8D8",
        "red-light-5": "#FEEBEB",
        "red-light-6": "#FEF3F3",
        // gray
        // "gray-1": "#F9FAFB",
        // "gray-2": "#F3F4F6",
        // "gray-3": "#E5E7EB",
        // "gray-4": "#DEE2E6",
      },
    },
    screens: {
      "2xl": "1440px",
      xl: "1332px",
      lg: "821px",
      sm: "480px",
    },
  },
  plugins: [],
};
export default config;
