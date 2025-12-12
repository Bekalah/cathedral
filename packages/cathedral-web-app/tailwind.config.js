/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cathedral design system colors
        cathedral: {
          primary: '#4A90E2',    // Sacred blue
          secondary: '#7ED321',  // Nature green
          accent: '#F5A623',     // Warm amber
          deep: '#BD10E0',       // Deep purple
          teal: '#50E3C2',       // Soft teal
          sage: '#B8E986',       // Light sage
          ink: '#1a1a1a',        // Primary text
          stone: '#f8f9fa',      // Light background
          gold: '#D4AF37',       // Sacred gold
          silver: '#C0C0C0',     // Sacred silver
        },
        // Sacred geometry inspired colors
        sacred: {
          golden: '#FFD700',
          phi: '#FF6B35',
          fibonacci: '#F7931E',
          fibonacci2: '#FFB366',
          phi2: '#FFB366',
          geometry: '#4ECDC4',
        },
        // Trauma-safe color palette
        safe: {
          gentle: '#E8F4FD',
          calm: '#E8F5E8',
          warm: '#FFF3E0',
          peaceful: '#F3E5F5',
          soothing: '#E0F2F1',
          tranquil: '#F1F8E9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
        sacred: ['Cinzel', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sacred-pulse': 'sacred-pulse 3s ease-in-out infinite',
        'gentle-rotate': 'gentle-rotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(74, 144, 226, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(74, 144, 226, 0.8)' },
        },
        'sacred-pulse': {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'gentle-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      aspectRatio: {
        'sacred': '1.618', // Golden ratio
        'cathedral': '1.455', // Cathedral ratio
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}