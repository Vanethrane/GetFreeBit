import type { Config } from "tailwindcss";
import { siteConfig } from "./src/site.config";

const { colors } = siteConfig;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: colors.ink,
          muted: colors.inkMuted,
        },
        paper: {
          DEFAULT: colors.paper,
          raised: colors.paperRaised,
          line: colors.paperLine,
        },
        voice: {
          DEFAULT: colors.voice,
          dark: colors.voiceDark,
          glow: colors.voiceGlow,
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: `0 18px 40px -28px ${colors.ink}73`,
      },
    },
  },
  plugins: [],
};

export default config;
