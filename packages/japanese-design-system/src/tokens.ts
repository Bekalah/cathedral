/**
 * tokens
 * 
 * @package @cathedral/japanese-design-system
 */
/**
 * Luxury Minimalist Design Tokens
 * 
 * High-end aesthetic inspired by:
 * - Luxury fashion (Dior, Chanel, Miss Soho)
 * - Apple / Apple Glass design language
 * - Minimalism that makes complexity feel simple
 * - Fluid, elegant, balanced
 * 
 * Integrated with master art principles:
 * - Golden ratio proportions
 * - Sacred geometry
 * - Museum-quality standards
 */

import { SACRED_MATH, goldenRatio } from '@cathedral/master-art-principles';

export const luxuryColors = {
  // Neutral luxury palette
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  cream: '#F5F5F0',
  lightGray: '#F0F0F0',
  gray: '#E5E5E5',
  mediumGray: '#CCCCCC',
  darkGray: '#999999',
  charcoal: '#666666',
  black: '#1A1A1A',
  deepBlack: '#000000',
  
  // Accent colors (refined, not loud)
  gold: '#D4AF37',      // Luxury gold
  platinum: '#E5E4E2',  // Platinum
  roseGold: '#E8B4B8',  // Rose gold
  silver: '#C0C0C0',    // Silver
  
  // Subtle brand colors
  navy: '#1A1A2E',      // Deep navy
  burgundy: '#722F37',  // Rich burgundy
  emerald: '#50C878',   // Sophisticated green
  
  // Glass morphism
  glassWhite: 'rgba(255, 255, 255, 0.1)',
  glassBlack: 'rgba(0, 0, 0, 0.1)',
  glassBlur: 'rgba(255, 255, 255, 0.05)',
} as const;

export const luxurySpacing = {
  // Generous spacing using golden ratio
  xs: '4px',
  sm: '8px',
  base: '16px',
  md: `${Math.round(16 * SACRED_MATH.PHI_INVERSE * 10) / 10}px`, // ~9.9px, golden ratio
  lg: `${Math.round(16 * SACRED_MATH.PHI)}px`, // ~26px, golden ratio
  xl: `${Math.round(16 * SACRED_MATH.PHI * 2)}px`, // ~52px
  '2xl': `${Math.round(16 * SACRED_MATH.PHI * 4)}px`, // ~103px
  '3xl': `${Math.round(16 * SACRED_MATH.PHI * 6)}px`, // ~155px
  '4xl': `${Math.round(16 * SACRED_MATH.PHI * 8)}px`, // ~207px
} as const;

export const luxuryTypography = {
  fontFamilies: {
    // Luxury serif (for headings)
    serif: '"Cormorant Garamond", "Playfair Display", "EB Garamond", serif',
    // Clean sans (for body)
    sans: '"SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Segoe UI", sans-serif',
    // Monospace (for code/data)
    mono: '"SF Mono", "Monaco", "Menlo", "Consolas", monospace',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
  },
} as const;

export const luxuryShadows = {
  // Subtle, refined shadows
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 2px 8px rgba(0, 0, 0, 0.08)',
  md: '0 4px 16px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
  xl: '0 16px 64px rgba(0, 0, 0, 0.15)',
  // Glass effect
  glass: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
} as const;

export const luxuryBorders = {
  radius: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  width: {
    none: '0',
    thin: '1px',
    base: '2px',
  },
} as const;

export const luxuryTransitions = {
  // Fluid, elegant transitions
  instant: '0ms',
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  verySlow: '600ms cubic-bezier(0.4, 0, 0.2, 1)',
  // Apple-like spring
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const luxuryZIndex = {
  base: 0,
  elevated: 10,
  overlay: 100,
  modal: 200,
  tooltip: 300,
  max: 9999,
} as const;

// Glass morphism effects (Apple Glass style)
export const glassMorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  colored: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(30px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
} as const;
