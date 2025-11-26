# Luxury Metallics Shader Library

High-end metallic shader library inspired by Tiffany & Co, luxury watchmakers, and high-end fashion brands. Museum-quality PBR materials with master art principles.

## Features

- **Tiffany & Co Materials**: Iconic blue, sterling silver, gold, rose gold, platinum, diamond
- **Luxury Metals**: 18k golds (yellow, white, rose, green), platinum, palladium, sterling silver
- **Precious Gems**: Diamond, sapphire, ruby, emerald with accurate IOR values
- **Three.js Integration**: Complete PBR material system
- **Babylon.js Integration**: Full PBR support
- **Sacred Geometry Patterns**: Pentagram, octagon, fibonacci spiral, floral, geometric
- **Master Art Principles**: Golden ratio proportions, sacred mathematics

## Installation

```bash
pnpm add @cathedral/luxury-metallics-shaders
```

## Usage

### Three.js

```typescript
import { createTiffanyThreeMaterial } from '@cathedral/luxury-metallics-shaders';

// Create Tiffany blue material
const tiffanyBlue = createTiffanyThreeMaterial('blue');

// Create luxury gold material
const gold = createLuxuryMetalThreeMaterial('yellowGold');

// Create golden ratio metallic
const goldenMetallic = createGoldenRatioMetallic('#D4AF37');
```

### Babylon.js

```typescript
import { createTiffanyBabylonMaterial } from '@cathedral/luxury-metallics-shaders';

// Create Tiffany platinum material
const platinum = createTiffanyBabylonMaterial('platinum', scene);

// Create luxury rose gold
const roseGold = createLuxuryMetalBabylonMaterial('roseGold', scene);
```

### Shader Presets

```typescript
import { getShaderPreset } from '@cathedral/luxury-metallics-shaders';

// Jewelry preset
const engagementRing = getShaderPreset('jewelry', 'engagementRing');

// Watch preset
const rolex = getShaderPreset('watch', 'rolex');

// Fashion preset
const tiffany = getShaderPreset('fashion', 'tiffany');
```

### Patterns

```typescript
import { createPentagramPattern, createFibonacciSpiralPattern } from '@cathedral/luxury-metallics-shaders';

// Create pentagram pattern
const pentagram = createPentagramPattern(50);

// Create fibonacci spiral
const spiral = createFibonacciSpiralPattern(5, 1);
```

## Materials

### Tiffany & Co
- **Tiffany Blue**: Iconic signature color (#0ABAB5)
- **Sterling Silver**: High reflectivity, premium finish
- **Gold**: Classic 18k yellow gold
- **Rose Gold**: Elegant rose gold
- **Platinum**: Highest quality platinum
- **Diamond**: Perfect diamond with IOR 2.42

### Luxury Metals
- **Yellow Gold (18k)**: Classic gold
- **White Gold (18k)**: Elegant white gold
- **Rose Gold (18k)**: Warm rose gold
- **Green Gold (18k)**: Unique green gold
- **Platinum**: Premium platinum
- **Palladium**: Alternative platinum
- **Sterling Silver**: Classic silver
- **Fine Silver (999)**: Pure silver
- **Oxidized Silver**: Aged silver

### Precious Gems
- **Diamond**: IOR 2.42, perfect clarity
- **Sapphire**: IOR 1.77, deep blue
- **Ruby**: IOR 1.77, vibrant red
- **Emerald**: IOR 1.58, rich green

## Master Art Principles

All materials use:
- **Golden Ratio**: Proportions based on phi (1.618...)
- **Sacred Geometry**: Pentagram, octagon, fibonacci patterns
- **Museum Quality**: Accurate IOR values, realistic PBR properties
- **Luxury Standards**: High reflectivity, premium finishes

## License

CC0-1.0 (Public Domain)

