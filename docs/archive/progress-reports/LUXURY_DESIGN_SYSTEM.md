# Luxury Minimalist Design System

## Philosophy

**Make complex work look simple and feel fluid.**

Inspired by:
- **Luxury Fashion**: Dior, Chanel, Miss Soho - elegant, classic, refined
- **Apple Design**: Clean, minimal, fluid interactions
- **Apple Glass**: Glass morphism, sophisticated transparency
- **Balance**: Complex functionality presented simply

## Design Principles

1. **Minimalism**: Remove everything unnecessary
2. **Fluidity**: Every interaction feels smooth and effortless
3. **Elegance**: Sophisticated, not flashy
4. **Balance**: Visual harmony and proportion
5. **Clarity**: Complex systems made simple to understand

## Usage

### CSS Variables

```css
.my-element {
  color: var(--luxury-black);
  background: var(--luxury-white);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-base);
  transition: var(--transition-base);
}
```

### Utility Classes

```html
<div class="luxury-container">
  <div class="luxury-card">
    <h1 class="luxury-heading">Title</h1>
    <p class="luxury-body">Content</p>
    <button class="luxury-button luxury-button-primary">Action</button>
  </div>
</div>
```

### Glass Morphism (Apple Glass style)

```html
<div class="luxury-glass">
  <!-- Glass panel content -->
</div>
```

### React Components

```tsx
import { LuxuryButton, LuxuryCard, GlassPanel } from '@cathedral/japanese-design-system';

<LuxuryCard variant="glass">
  <LuxuryButton variant="primary">Click</LuxuryButton>
</LuxuryCard>
```

## Color Palette

- **Neutrals**: White, off-white, cream, grays, charcoal, black
- **Accents**: Gold, platinum, rose gold, silver
- **Brand**: Navy, burgundy, emerald

## Spacing

Generous spacing for breathing room:
- xs: 4px
- sm: 8px
- base: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px
- 3xl: 96px
- 4xl: 128px

## Typography

- **Serif**: Cormorant Garamond (headings) - luxury fashion elegance
- **Sans**: SF Pro Display (body) - Apple clarity
- **Mono**: SF Mono (code/data) - technical precision

## Animations

- **Fluid**: Smooth, Apple-like transitions
- **Spring**: Natural, bouncy feel
- **Glass**: Reveal effects for glass morphism
- **Float**: Gentle, elegant movement

## Your Existing Themes

**All your existing themes and content are preserved.**

This design system is an **enhancement layer** - use it when you want to add luxury minimalist aesthetic to specific elements. Your existing styles remain unchanged.

---

**Status**: ✅ Ready to use  
**Repository**: https://github.com/Bekalah/cathedral

