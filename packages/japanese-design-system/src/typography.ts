/**
 * typography
 * 
 * @package @cathedral/japanese-design-system
 */
/**
 * Japanese Typography System
 * 
 * Typography inspired by Japanese calligraphy and print:
 * - Clear hierarchy
 * - Generous line spacing (ma)
 * - Respectful use of space
 */

import { japaneseTypography, japaneseColors } from './tokens';

export const japaneseTextStyles = {
  // Headings
  h1: {
    fontFamily: japaneseTypography.fontFamilies.serif,
    fontSize: japaneseTypography.fontSizes['4xl'],
    lineHeight: japaneseTypography.lineHeights.tight,
    fontWeight: 700,
    color: japaneseColors.sumi,
    letterSpacing: japaneseTypography.letterSpacing.tight,
  },
  
  h2: {
    fontFamily: japaneseTypography.fontFamilies.serif,
    fontSize: japaneseTypography.fontSizes['3xl'],
    lineHeight: japaneseTypography.lineHeights.tight,
    fontWeight: 600,
    color: japaneseColors.sumi,
    letterSpacing: japaneseTypography.letterSpacing.tight,
  },
  
  h3: {
    fontFamily: japaneseTypography.fontFamilies.serif,
    fontSize: japaneseTypography.fontSizes['2xl'],
    lineHeight: japaneseTypography.lineHeights.normal,
    fontWeight: 600,
    color: japaneseColors.sumi,
  },
  
  // Body text
  body: {
    fontFamily: japaneseTypography.fontFamilies.sans,
    fontSize: japaneseTypography.fontSizes.base,
    lineHeight: japaneseTypography.lineHeights.relaxed,
    color: japaneseColors.sumiLight,
  },
  
  bodyLarge: {
    fontFamily: japaneseTypography.fontFamilies.sans,
    fontSize: japaneseTypography.fontSizes.lg,
    lineHeight: japaneseTypography.lineHeights.relaxed,
    color: japaneseColors.sumiLight,
  },
  
  // Accent text
  accent: {
    fontFamily: japaneseTypography.fontFamilies.serif,
    fontSize: japaneseTypography.fontSizes.base,
    lineHeight: japaneseTypography.lineHeights.normal,
    color: japaneseColors.kinpaku,
    fontWeight: 500,
  },
  
  // Small text
  small: {
    fontFamily: japaneseTypography.fontFamilies.sans,
    fontSize: japaneseTypography.fontSizes.sm,
    lineHeight: japaneseTypography.lineHeights.normal,
    color: japaneseColors.shibui,
  },
  
  // Caption
  caption: {
    fontFamily: japaneseTypography.fontFamilies.sans,
    fontSize: japaneseTypography.fontSizes.xs,
    lineHeight: japaneseTypography.lineHeights.normal,
    color: japaneseColors.shibui,
    letterSpacing: japaneseTypography.letterSpacing.wide,
  },
} as const;
