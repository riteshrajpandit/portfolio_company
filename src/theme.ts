import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
        body: { value: "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }
      },
      colors: {
        // Baby blue as primary
        primary: {
          50: { value: "#e8f1f8" },
          100: { value: "#ddeaf5" },
          200: { value: "#b8d4ea" },
          300: { value: "#1b75bb" },
          400: { value: "#1869a8" },
          500: { value: "#165e96" }, // Main baby blue
          600: { value: "#14588c" },
          700: { value: "#104670" },
          800: { value: "#0c3554" },
          900: { value: "#092941" },
          950: { value: "#000d14" }
        },
        // Accent color (coral/warm orange that complements baby blue)
        accent: {
          50: { value: "#fff5f0" },
          100: { value: "#ffe6d6" },
          200: { value: "#ffd4b3" },
          300: { value: "#ffb380" },
          400: { value: "#ff9246" },
          500: { value: "#ff7a1a" }, // Main accent
          600: { value: "#e65a00" },
          700: { value: "#b34600" },
          800: { value: "#803300" },
          900: { value: "#4d1f00" },
          950: { value: "#331500" }
        },
        // Neutral grays
        neutral: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
          950: { value: "#020617" }
        }
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
        "7xl": { value: "4.5rem" }
      },
      shadows: {
        sm: { value: "0 1px 2px 0 rgba(0, 115, 230, 0.05)" },
        md: { value: "0 4px 6px -1px rgba(0, 115, 230, 0.1), 0 2px 4px -1px rgba(0, 115, 230, 0.06)" },
        lg: { value: "0 10px 15px -3px rgba(0, 115, 230, 0.1), 0 4px 6px -2px rgba(0, 115, 230, 0.05)" },
        xl: { value: "0 20px 25px -5px rgba(0, 115, 230, 0.1), 0 10px 10px -5px rgba(0, 115, 230, 0.04)" },
        glass: { value: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }
      }
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "white" },
        },
        card: {
          DEFAULT: { value: "rgba(255, 255, 255, 0.8)" },
        },
        text: {
          DEFAULT: { value: "{colors.neutral.900}" },
        },
        muted: {
          DEFAULT: { value: "{colors.neutral.600}" },
        },
        border: {
          DEFAULT: { value: "rgba(203, 213, 225, 0.4)" },
        },
        "primary.text": {
          DEFAULT: { value: "{colors.primary.600}" },
        },
        "card.bg": {
          DEFAULT: { value: "rgba(255, 255, 255, 0.9)" },
        },
        "glass.bg": {
          DEFAULT: { value: "rgba(255, 255, 255, 0.25)" },
        },
        "surface": {
          DEFAULT: { value: "{colors.neutral.50}" },
        }
      },
    },
  },
  globalCss: {
    "html, body": {
      fontFamily: "Urbanist, sans-serif",
      scrollBehavior: "smooth",
      bg: "bg",
      color: "text",
    },
    "*": {
      scrollbarWidth: "none",
      scrollbarColor: "transparent transparent",
    },
    "*::-webkit-scrollbar": {
      width: "0px",
      background: "transparent",
    },
    "*::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "transparent",
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
