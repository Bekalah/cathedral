/**
 * animations
 * 
 * @package @cathedral/japanese-design-system
 */
/**
 * Luxury Fluid Animations
 * 
 * Elegant, fluid animations that make complex interactions feel simple:
 * - Apple-like spring animations
 * - Smooth, refined transitions
 * - Glass morphism effects
 * - Luxury brand sophistication
 */

import { luxuryTransitions } from './tokens';

export const luxuryAnimations = {
  // Smooth fade
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: luxuryTransitions.base,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Fluid slide (like Apple interfaces)
  slideIn: {
    from: (direction: 'left' | 'right' | 'up' | 'down' = 'left') => ({
      transform: direction === 'left' ? 'translateX(-20px)' :
                 direction === 'right' ? 'translateX(20px)' :
                 direction === 'up' ? 'translateY(-20px)' :
                 'translateY(20px)',
      opacity: 0,
    }),
    to: {
      transform: 'translateX(0) translateY(0)',
      opacity: 1,
    },
    duration: luxuryTransitions.base,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Apple-like spring
  spring: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    duration: luxuryTransitions.spring,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Gentle float (luxury brand elegance)
  float: {
    keyframes: [
      { transform: 'translateY(0px)', offset: 0 },
      { transform: 'translateY(-8px)', offset: 0.5 },
      { transform: 'translateY(0px)', offset: 1 },
    ],
    duration: '4s',
    iterationCount: 'infinite',
    easing: 'ease-in-out',
  },
  
  // Glass morphism reveal
  glassReveal: {
    from: { 
      backdropFilter: 'blur(0px)',
      opacity: 0,
    },
    to: { 
      backdropFilter: 'blur(20px) saturate(180%)',
      opacity: 1,
    },
    duration: luxuryTransitions.slow,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Smooth scale (for modals, cards)
  scaleIn: {
    from: { 
      transform: 'scale(0.9)',
      opacity: 0,
    },
    to: { 
      transform: 'scale(1)',
      opacity: 1,
    },
    duration: luxuryTransitions.base,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
