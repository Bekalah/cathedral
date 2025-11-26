/**
 * spacing
 * 
 * @package @cathedral/japanese-design-system
 */
/**
 * Japanese Spacing System (Ma)
 * 
 * Ma (間) - the concept of negative space in Japanese design
 * Generous spacing creates breathing room and clarity
 */

import { japaneseSpacing } from './tokens';

export const ma = japaneseSpacing.ma;

export const japaneseLayout = {
  // Container padding
  containerPadding: {
    sm: ma.base,
    md: ma.medium,
    lg: ma.large,
    xl: ma.xlarge,
  },
  
  // Section spacing
  sectionSpacing: {
    sm: ma.large,
    md: ma.xlarge,
    lg: ma.xxlarge,
  },
  
  // Component spacing
  componentGap: {
    tight: ma.tiny,
    normal: ma.small,
    relaxed: ma.base,
    loose: ma.medium,
  },
} as const;
