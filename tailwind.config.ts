import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        anthracite: {
          50: "#f4f4f5",
          100: "#e4e4e7",
          800: "#27272a",
          900: "#18181b",
          950: "#0f0f12",
        },
        gold: {
          DEFAULT: "#D4AF37",
          muted: "#b8962e",
          glow: "rgba(212, 175, 55, 0.35)",
        },
      },
      fontFamily: {
        // next/font/google sets these CSS variables, but we keep fallbacks
        // so the app still serves if font fetching is blocked.
        display: ["var(--font-display, Georgia)", "Georgia", "serif"],
        sans: ["var(--font-sans, system-ui)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        "gold-glow": "0 0 40px rgba(212, 175, 55, 0.15)",
      },
      backgroundImage: {
        "radial-gold":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.12), transparent)",
        "mesh-dark":
          "radial-gradient(at 40% 20%, rgba(212, 175, 55, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255, 255, 255, 0.04) 0px, transparent 45%), radial-gradient(at 0% 50%, rgba(212, 175, 55, 0.05) 0px, transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
