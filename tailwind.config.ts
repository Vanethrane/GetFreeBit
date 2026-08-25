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
        signal: {
          DEFAULT: colors.signal,
          dark: colors.signalDark,
          glow: colors.signalGlow,
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: `0 20px 44px -30px color-mix(in srgb, ${colors.ink} 40%, transparent)`,
        "card-hover": `0 22px 48px -28px color-mix(in srgb, ${colors.signal} 22%, ${colors.ink} 18%)`,
      },
    },
  },
  plugins: [],
};

export default config;
