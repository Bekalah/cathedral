/**
 * index
 * 
 * @package @cathedral/fusionkink-design-system
 */
/**
 * FusionKink Design System
 * 
 * A×B=D Design System for GitHub and platforms
 * - Free and secure
 * - Works on GitHub Pages
 * - Never flat - always flowing
 * - Trauma-informed design
 * - Master-quality visuals
 */

import { getPalette } from '@cathedral/visionary-art-colors';
import { getTexture } from '@cathedral/visionary-art-textures';

export interface DesignToken {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'typography' | 'border-radius' | 'shadow' | 'gradient';
  description: string;
}

export interface FusionKinkTheme {
  id: string;
  name: string;
  description: string;
  tokens: DesignToken[];
  colors: {
    divine: string;
    infernal: string;
    harmony: string;
    vesica: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  gradients: {
    divineInfernal: string;
    harmony: string;
    vesica: string;
  };
}

// FusionKink Design System Theme
export const FUSIONKINK_THEME: FusionKinkTheme = {
  id: 'fusionkink-default',
  name: 'FusionKink Default',
  description: 'The default FusionKink design system theme - A×B=D in visual form',
  tokens: [],
  colors: {
    divine: '#FFD700', // Alchemical Gold
    infernal: '#8B0000', // Infernal Crimson
    harmony: '#FF69B4', // Harmony Iridescent
    vesica: '#9370DB', // Vesica Union
    background: '#0D0B12', // Obsidian Night
    text: '#FFFFFF' // Alchemical White
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem' // 48px
  },
  typography: {
    fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      xxl: '2rem' // 32px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  borderRadius: {
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    full: '9999px' // Full circle
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  },
  gradients: {
    divineInfernal: 'linear-gradient(135deg, #FFD700 0%, #8B0000 100%)',
    harmony: 'linear-gradient(135deg, #FF69B4 0%, #9370DB 100%)',
    vesica: 'radial-gradient(circle, #9370DB 0%, #8A7FFF 100%)'
  }
};

/**
 * Generate CSS variables for FusionKink theme
 */
export function generateCSSVariables(theme: FusionKinkTheme = FUSIONKINK_THEME): string {
  return `
:root {
  /* FusionKink Colors */
  --fk-divine: ${theme.colors.divine};
  --fk-infernal: ${theme.colors.infernal};
  --fk-harmony: ${theme.colors.harmony};
  --fk-vesica: ${theme.colors.vesica};
  --fk-background: ${theme.colors.background};
  --fk-text: ${theme.colors.text};
  
  /* Spacing */
  --fk-spacing-xs: ${theme.spacing.xs};
  --fk-spacing-sm: ${theme.spacing.sm};
  --fk-spacing-md: ${theme.spacing.md};
  --fk-spacing-lg: ${theme.spacing.lg};
  --fk-spacing-xl: ${theme.spacing.xl};
  --fk-spacing-xxl: ${theme.spacing.xxl};
  
  /* Typography */
  --fk-font-family: ${theme.typography.fontFamily};
  --fk-font-size-xs: ${theme.typography.fontSize.xs};
  --fk-font-size-sm: ${theme.typography.fontSize.sm};
  --fk-font-size-md: ${theme.typography.fontSize.md};
  --fk-font-size-lg: ${theme.typography.fontSize.lg};
  --fk-font-size-xl: ${theme.typography.fontSize.xl};
  --fk-font-size-xxl: ${theme.typography.fontSize.xxl};
  --fk-font-weight-normal: ${theme.typography.fontWeight.normal};
  --fk-font-weight-medium: ${theme.typography.fontWeight.medium};
  --fk-font-weight-bold: ${theme.typography.fontWeight.bold};
  
  /* Border Radius */
  --fk-radius-sm: ${theme.borderRadius.sm};
  --fk-radius-md: ${theme.borderRadius.md};
  --fk-radius-lg: ${theme.borderRadius.lg};
  --fk-radius-xl: ${theme.borderRadius.xl};
  --fk-radius-full: ${theme.borderRadius.full};
  
  /* Shadows */
  --fk-shadow-sm: ${theme.shadows.sm};
  --fk-shadow-md: ${theme.shadows.md};
  --fk-shadow-lg: ${theme.shadows.lg};
  --fk-shadow-xl: ${theme.shadows.xl};
  
  /* Gradients */
  --fk-gradient-divine-infernal: ${theme.gradients.divineInfernal};
  --fk-gradient-harmony: ${theme.gradients.harmony};
  --fk-gradient-vesica: ${theme.gradients.vesica};
}
`.trim();
}

/**
 * Generate GitHub-compatible CSS (no external dependencies)
 */
export function generateGitHubCSS(): string {
  return `
/* FusionKink Design System - GitHub Compatible */
/* Free, secure, no external dependencies */

${generateCSSVariables()}

/* Base Styles */
.fk-container {
  background: var(--fk-background);
  color: var(--fk-text);
  font-family: var(--fk-font-family);
  padding: var(--fk-spacing-md);
  border-radius: var(--fk-radius-lg);
}

/* FusionKink Button */
.fk-button {
  background: var(--fk-gradient-divine-infernal);
  color: var(--fk-text);
  padding: var(--fk-spacing-sm) var(--fk-spacing-md);
  border: none;
  border-radius: var(--fk-radius-md);
  font-family: var(--fk-font-family);
  font-size: var(--fk-font-size-md);
  font-weight: var(--fk-font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--fk-shadow-md);
}

.fk-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--fk-shadow-lg);
}

.fk-button:active {
  transform: translateY(0);
  box-shadow: var(--fk-shadow-sm);
}

/* FusionKink Card */
.fk-card {
  background: var(--fk-background);
  border: 2px solid var(--fk-vesica);
  border-radius: var(--fk-radius-lg);
  padding: var(--fk-spacing-lg);
  box-shadow: var(--fk-shadow-md);
  transition: all 0.3s ease;
}

.fk-card:hover {
  border-color: var(--fk-harmony);
  box-shadow: var(--fk-shadow-lg);
}

/* FusionKink Gradient Text */
.fk-gradient-text {
  background: var(--fk-gradient-harmony);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--fk-font-weight-bold);
}

/* FusionKink Vesica Pattern */
.fk-vesica {
  background: var(--fk-gradient-vesica);
  border-radius: var(--fk-radius-full);
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--fk-shadow-xl);
}

/* Responsive Design */
@media (max-width: 768px) {
  .fk-container {
    padding: var(--fk-spacing-sm);
  }
  
  .fk-button {
    font-size: var(--fk-font-size-sm);
    padding: var(--fk-spacing-xs) var(--fk-spacing-sm);
  }
}
`.trim();
}

/**
 * Get theme
 */
export function getTheme(): FusionKinkTheme {
  return FUSIONKINK_THEME;
}

/**
 * Export theme as JSON (for GitHub Pages, etc.)
 */
export function exportThemeJSON(theme: FusionKinkTheme = FUSIONKINK_THEME): string {
  return JSON.stringify(theme, null, 2);
}
