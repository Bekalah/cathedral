/**
 * McQueen Design Tokens
 * 
 * John Dee's Monas Hieroglyphica meets Alexander McQueen's dark depths
 * 
 * This is not cute. This is not cartoon. This is not flat.
 * This is mathematically precise, emotionally intense, deeply weird, and REAL.
 */

// =============================================================================
// COLOR SYSTEM — Deep, complex, never flat
// =============================================================================

export const colors = {
  // Primary — The void and the light
  obsidian: '#0A0A0A',        // Deep black with warmth
  void: '#050508',             // True dark, almost purple
  burnishedGold: '#8B7355',    // Aged gold, museum quality
  champagne: '#F5F0E6',        // Warm off-white, like old paper
  
  // Accents — Complex, layered
  deepViolet: '#1A0A1F',       // Shadow purple, McQueen darkness
  bloodAmber: '#6B3A2A',       // Warm dark red, dried blood
  verdigris: '#2A4A4A',        // Aged copper green, patina
  bone: '#E8E0D5',             // Organic white, skeletal
  
  // Metals — Tarnished, not shiny
  tarnishedSilver: '#7A7A7A',  // Not chrome, aged
  ancientGold: '#9A8A6A',      // Museum gold, historical
  copperDark: '#5A3A2A',       // Deep copper, alchemical
  iron: '#3A3A3A',             // Forge black, worked metal
  
  // Glass — Translucent layers
  cathedralGlass: 'rgba(245, 240, 230, 0.03)',
  smokeGlass: 'rgba(10, 10, 10, 0.7)',
  amberGlass: 'rgba(139, 115, 85, 0.1)',
  
  // Elemental — From the Monas
  fire: '#8B3A1A',             // Deep ember, not orange
  water: '#1A3A4A',            // Ocean depth, not blue
  air: '#4A4A5A',              // Storm gray, not sky
  earth: '#3A2A1A',            // Rich soil, not brown
  spirit: '#F5F0E6',           // Light itself
  
  // Forbidden — NEVER use these
  // neonAnything: 'NO',
  // brightPrimary: 'NO',
  // cartoonGradient: 'NO',
  // flatWhite: 'NO',
  // flatBlack: 'NO',
} as const;

// =============================================================================
// TYPOGRAPHY — Theatrical, historical, precise
// =============================================================================

export const typography = {
  // Font families
  fontDisplay: "'Bodoni Moda', 'Didot', serif",
  fontBody: "'Cormorant Garamond', 'Garamond', serif",
  fontUi: "'DM Sans', 'Helvetica Neue', sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
  
  // Display — For titles, ceremonial text
  display: {
    fontFamily: "'Bodoni Moda', serif",
    fontWeight: 500,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  },
  
  // Body — For reading, historical feel
  body: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: 1.6,
  },
  
  // UI — Minimal, functional
  ui: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: 1.4,
  },
  
  // Scale — Mathematical progression
  scale: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4.5rem',  // 72px
    '5xl': '6rem',    // 96px
  },
} as const;

// =============================================================================
// SPACING — Golden ratio based
// =============================================================================

const PHI = 1.618033988749895;

export const spacing = {
  // Base unit
  unit: 8,
  
  // Scale (golden ratio progression)
  xs: '0.25rem',      // 4px
  sm: '0.5rem',       // 8px
  md: '1rem',         // 16px
  lg: '1.618rem',     // ~26px (φ)
  xl: '2.618rem',     // ~42px (φ²)
  '2xl': '4.236rem',  // ~68px (φ³)
  '3xl': '6.854rem',  // ~110px (φ⁴)
  '4xl': '11.09rem',  // ~177px (φ⁵)
  
  // Golden ratio helper
  phi: PHI,
  phiInverse: 1 / PHI, // 0.618...
} as const;

// =============================================================================
// MOTION — Organic, never mechanical
// =============================================================================

export const motion = {
  // Durations
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '400ms',
    slow: '800ms',
    glacial: '1600ms',
    reveal: '2400ms',
  },
  
  // Easing — organic curves
  easing: {
    // Standard movements
    out: 'cubic-bezier(0.22, 1, 0.36, 1)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    
    // Special movements
    reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',      // Things appearing
    settle: 'cubic-bezier(0.33, 1, 0.68, 1)',     // Coming to rest
    breathe: 'cubic-bezier(0.45, 0, 0.55, 1)',   // Subtle pulse
    
    // FORBIDDEN
    // bounce: 'NO - never bouncy',
    // elastic: 'NO - never springy',
    // linear: 'NO - never mechanical',
  },
  
  // Keyframe presets
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    reveal: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    breathe: {
      '0%, 100%': { opacity: 0.8 },
      '50%': { opacity: 1 },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },
} as const;

// =============================================================================
// SHADOWS — Depth without cliché
// =============================================================================

export const shadows = {
  // Subtle depth
  subtle: '0 1px 2px rgba(0, 0, 0, 0.1)',
  
  // Medium depth
  medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
  
  // Deep depth
  deep: '0 12px 40px rgba(0, 0, 0, 0.25)',
  
  // Glow (for luminous elements)
  glowGold: '0 0 40px rgba(139, 115, 85, 0.3)',
  glowViolet: '0 0 40px rgba(26, 10, 31, 0.5)',
  
  // Inner shadows (for depth)
  inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  insetDeep: 'inset 0 4px 12px rgba(0, 0, 0, 0.2)',
  
  // NO drop shadows that look like floating cards
} as const;

// =============================================================================
// BORDERS — Subtle, meaningful
// =============================================================================

export const borders = {
  // Widths
  width: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  
  // Radii — minimal, not pill-shaped
  radius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    // NO: full, pill, rounded-everything
  },
  
  // Styles
  style: {
    subtle: `1px solid rgba(139, 115, 85, 0.2)`,
    medium: `1px solid rgba(139, 115, 85, 0.4)`,
    strong: `2px solid ${colors.burnishedGold}`,
  },
} as const;

// =============================================================================
// LAYOUT — Asymmetric, breathing
// =============================================================================

export const layout = {
  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  },
  
  // Grid
  grid: {
    columns: 12,
    gutter: spacing.lg,
    margin: spacing.xl,
  },
  
  // Aspect ratios (golden ratio based)
  aspectRatio: {
    golden: `${PHI}`,           // 1.618:1
    goldenVertical: `${1/PHI}`, // 1:1.618
    square: '1',
    wide: '1.777',              // 16:9
    ultrawide: '2.35',          // Cinema
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 100,
    modal: 200,
    overlay: 300,
    tooltip: 400,
    notification: 500,
  },
} as const;

// =============================================================================
// GLASS MORPHISM — Cathedral windows, not frosted plastic
// =============================================================================

export const glass = {
  // Light glass (for dark backgrounds)
  light: {
    background: 'rgba(245, 240, 230, 0.03)',
    backdropFilter: 'blur(20px) saturate(150%)',
    border: '1px solid rgba(245, 240, 230, 0.08)',
  },
  
  // Dark glass (for light backgrounds)
  dark: {
    background: 'rgba(10, 10, 10, 0.6)',
    backdropFilter: 'blur(20px) saturate(120%)',
    border: '1px solid rgba(10, 10, 10, 0.2)',
  },
  
  // Amber glass (warm, alchemical)
  amber: {
    background: 'rgba(139, 115, 85, 0.08)',
    backdropFilter: 'blur(16px) saturate(140%)',
    border: '1px solid rgba(139, 115, 85, 0.15)',
  },
  
  // Violet glass (shadow, mysterious)
  violet: {
    background: 'rgba(26, 10, 31, 0.4)',
    backdropFilter: 'blur(24px) saturate(130%)',
    border: '1px solid rgba(26, 10, 31, 0.3)',
  },
} as const;

// =============================================================================
// SACRED GEOMETRY — Dee's precision
// =============================================================================

export const geometry = {
  // Golden ratio
  phi: PHI,
  phiInverse: 1 / PHI,
  
  // Sacred angles
  angles: {
    pentagram: 72,      // 360/5
    hexagram: 60,       // 360/6
    octagram: 45,       // 360/8
    enneagram: 40,      // 360/9
    zodiac: 30,         // 360/12
  },
  
  // Vesica Piscis ratio
  vesicaPiscis: Math.sqrt(3), // ~1.732
  
  // Square root ratios
  sqrt2: Math.sqrt(2),        // ~1.414 (A4 paper)
  sqrt3: Math.sqrt(3),        // ~1.732 (hexagon)
  sqrt5: Math.sqrt(5),        // ~2.236 (pentagon)
  
  // Cathedral ratio (144:99)
  cathedral: 144 / 99,        // ~1.4545
} as const;

// =============================================================================
// EXPORTS
// =============================================================================

export const mcqueenTokens = {
  colors,
  typography,
  spacing,
  motion,
  shadows,
  borders,
  layout,
  glass,
  geometry,
} as const;

export default mcqueenTokens;

