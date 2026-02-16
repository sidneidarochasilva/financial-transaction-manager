/** @type {import('tailwindcss').Config} */
import tokens from './src/design-system/tokens/tokens.json'

// Helper to flatten colors for CSS variables and Tailwind theme
const flattenColors = (colors, prefix = 'color') => {
  const cssVars = {}
  const themeColors = {}

  Object.entries(colors).forEach(([colorName, shades]) => {
    themeColors[colorName] = {}
    Object.entries(shades).forEach(([shade, value]) => {
      const varName = `--${prefix}-${colorName}-${shade}`
      cssVars[varName] = value
      themeColors[colorName][shade] = `var(${varName})`
    })
  })

  return { cssVars, themeColors }
}

const { cssVars, themeColors } = flattenColors(tokens.colors)

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: themeColors,
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Extend other theme properties from tokens if needed
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      spacing: {
        ...tokens.spacing,
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        ':root': cssVars,
      })
    },
  ],
}
