/**
 * animations
 * 
 * @package @cathedral/3d-environments
 */
/**
 * Master Art Animations
 * 
 * Fluid, beautiful animations based on golden ratio and sacred geometry
 */

import { SACRED_MATH, goldenEasing } from '@cathedral/master-art-principles';

export interface AnimationConfig {
  duration: number;
  easing: (t: number) => number;
  loop: boolean;
  delay?: number;
}

/**
 * Golden Ratio Animation
 * 
 * Smooth, natural motion using golden ratio timing
 */
export function goldenAnimation(
  from: number,
  to: number,
  duration: number = 2000,
  callback: (value: number) => void
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let startTime: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = goldenEasing(progress);
    
    const value = from + (to - from) * eased;
    callback(value);

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  return {
    start: () => {
      startTime = null;
      animationId = requestAnimationFrame(animate);
    },
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}

/**
 * Spiral Animation
 * 
 * Motion following fibonacci spiral
 */
export function spiralAnimation(
  center: { x: number; y: number },
  radius: number,
  turns: number,
  duration: number = 3000,
  callback: (position: { x: number; y: number }) => void
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let startTime: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = goldenEasing(progress);

    const angle = eased * turns * SACRED_MATH.TAU;
    const currentRadius = radius * Math.sqrt(eased);
    
    callback({
      x: center.x + currentRadius * Math.cos(angle),
      y: center.y + currentRadius * Math.sin(angle),
    });

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  return {
    start: () => {
      startTime = null;
      animationId = requestAnimationFrame(animate);
    },
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}

/**
 * Float Animation
 * 
 * Gentle floating motion
 */
export function floatAnimation(
  baseY: number,
  amplitude: number,
  frequency: number = 0.001,
  callback: (y: number) => void
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let startTime: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    
    const y = baseY + amplitude * Math.sin(elapsed * frequency);
    callback(y);

    animationId = requestAnimationFrame(animate);
  };

  return {
    start: () => {
      startTime = null;
      animationId = requestAnimationFrame(animate);
    },
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}

/**
 * Fade Animation
 * 
 * Smooth opacity transition
 */
export function fadeAnimation(
  from: number,
  to: number,
  duration: number = 1000,
  callback: (opacity: number) => void
): { start: () => void; stop: () => void } {
  return goldenAnimation(from, to, duration, callback);
}
