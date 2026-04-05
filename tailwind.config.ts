import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0d0f14", 2: "#111318", 3: "#161921" },
        green: { DEFAULT: "#b8f542", dim: "rgba(184,245,66,0.12)", glow: "rgba(184,245,66,0.06)" },
        teal: { DEFAULT: "#4ecdc4", dim: "rgba(78,205,196,0.12)" },
        txt: { DEFAULT: "#e8eaf0", 2: "#8b8fa8", 3: "#555870" },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderColor: {
        base: "rgba(255,255,255,0.08)",
        hover: "rgba(184,245,66,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
