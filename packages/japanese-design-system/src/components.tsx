/**
 * Luxury Minimalist Design Components
 * 
 * High-end components that make complexity feel simple:
 * - Clean, minimal interfaces
 * - Fluid animations
 * - Glass morphism effects
 * - Apple-like elegance
 * - Luxury fashion brand sophistication
 */

import React from 'react';
import { 
  luxuryColors, 
  luxurySpacing, 
  luxuryShadows, 
  luxuryBorders, 
  luxuryTransitions,
  luxuryTypography,
  glassMorphism
} from './tokens';

export interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'base' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  variant = 'primary',
  size = 'base',
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: luxuryTypography.fontFamilies.sans,
    fontWeight: luxuryTypography.fontWeights.medium,
    letterSpacing: luxuryTypography.letterSpacing.normal,
    border: 'none',
    borderRadius: luxuryBorders.radius.base,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: luxuryTransitions.base,
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'none',
  };

  const sizeStyles = {
    sm: {
      padding: `${luxurySpacing.sm} ${luxurySpacing.base}`,
      fontSize: luxuryTypography.fontSizes.sm,
    },
    base: {
      padding: `${luxurySpacing.base} ${luxurySpacing.lg}`,
      fontSize: luxuryTypography.fontSizes.base,
    },
    lg: {
      padding: `${luxurySpacing.lg} ${luxurySpacing.xl}`,
      fontSize: luxuryTypography.fontSizes.lg,
    },
  };

  const variantStyles = {
    primary: {
      background: luxuryColors.black,
      color: luxuryColors.white,
      boxShadow: luxuryShadows.base,
    },
    secondary: {
      background: 'transparent',
      color: luxuryColors.black,
      border: `${luxuryBorders.width.base} solid ${luxuryColors.black}`,
    },
    ghost: {
      background: 'transparent',
      color: luxuryColors.charcoal,
    },
    glass: {
      ...glassMorphism.light,
      color: luxuryColors.black,
      backdropFilter: glassMorphism.light.backdropFilter,
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = luxuryShadows.md;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = variant === 'primary' ? luxuryShadows.base : 'none';
        }
      }}
    >
      {children}
    </button>
  );
};

export interface LuxuryCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  className?: string;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: luxuryBorders.radius.lg,
    padding: luxurySpacing.xl,
    transition: luxuryTransitions.base,
  };

  const variantStyles = {
    default: {
      background: luxuryColors.white,
      boxShadow: luxuryShadows.base,
      border: `${luxuryBorders.width.thin} solid ${luxuryColors.gray}`,
    },
    glass: {
      ...glassMorphism.light,
      backdropFilter: glassMorphism.light.backdropFilter,
    },
    elevated: {
      background: luxuryColors.white,
      boxShadow: luxuryShadows.lg,
    },
  };

  const styles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <div 
      style={styles} 
      className={className}
      onMouseEnter={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = luxuryShadows.md;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.boxShadow = luxuryShadows.base;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
};

export interface LuxuryContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const LuxuryContainer: React.FC<LuxuryContainerProps> = ({
  children,
  maxWidth = 'lg',
  className = '',
}) => {
  const maxWidths = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  };

  const styles: React.CSSProperties = {
    maxWidth: maxWidths[maxWidth],
    margin: '0 auto',
    padding: `0 ${luxurySpacing.lg}`,
    width: '100%',
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};

// Glass morphism panel (Apple Glass style)
export interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'colored';
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'light',
  className = '',
}) => {
  const glassStyles = {
    light: glassMorphism.light,
    dark: glassMorphism.dark,
    colored: glassMorphism.colored,
  };

  const styles: React.CSSProperties = {
    ...glassStyles[variant],
    borderRadius: luxuryBorders.radius.lg,
    padding: luxurySpacing.xl,
    backdropFilter: glassStyles[variant].backdropFilter,
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};
