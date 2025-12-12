# @cathedral/package-template

[![npm version](https://badge.fury.io/js/@cathedral%2F{{PACKAGE_NAME}}.svg)](https://badge.fury.io/js/@cathedral%2F{{PACKAGE_NAME}})
[![GitHub Package](https://img.shields.io/badge/GitHub-Package-blue.svg)](https://github.com/cathedral-real/cathedral-real/packages)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-007ACC.svg)](https://www.typescriptlang.org/)
[![Trauma-Safe](https://img.shields.io/badge/Trauma--Safe-Validated-00A86B.svg)](https://github.com/cathedral-real/cathedral-real/blob/main/docs/TRAUMA_SAFETY.md)

{{PACKAGE_DESCRIPTION}}

## Overview

{{OVERVIEW_TEXT}}

## Installation

### NPM Registry
```bash
npm install @cathedral/{{PACKAGE_NAME}}
```

### GitHub Packages Registry
```bash
npm install @cathedral/{{PACKAGE_NAME}} --registry=https://npm.pkg.github.com/
```

### PNPM (Recommended)
```bash
pnpm add @cathedral/{{PACKAGE_NAME}}
```

## Quick Start

```typescript
import { {{MAIN_EXPORT}} } from '@cathedral/{{PACKAGE_NAME}}';

// Basic usage example
const {{LOWER_PACKAGE_NAME}} = new {{MAIN_EXPORT}}({
  // configuration options
});

{{USAGE_EXAMPLE}}
```

## API Reference

### Main Classes and Functions

{{API_DOCUMENTATION}}

### Configuration Options

{{CONFIGURATION_OPTIONS}}

## Package Dependencies

This package integrates with other Cathedral packages:

{{DEPENDENCY_LIST}}

### Core Dependencies
- `@cathedral/types` - Type definitions for Cathedral ecosystem
- `@cathedral/sacred-geometry-core` - Sacred geometry utilities

### Optional Dependencies
{{OPTIONAL_DEPENDENCIES}}

## Integration Examples

### With Sacred Geometry Core
```typescript
import { SacredGeometryCore } from '@cathedral/sacred-geometry-core';
import { {{MAIN_EXPORT}} } from '@cathedral/{{PACKAGE_NAME}}';

const sacred = new SacredGeometryCore();
const {{LOWER_PACKAGE_NAME}} = new {{MAIN_EXPORT}}({
  geometry: sacred,
  // other options
});
```

### With Three.js Engine
```typescript
import { ThreeEngine } from '@cathedral/three-engine';
import { {{MAIN_EXPORT}} } from '@cathedral/{{PACKAGE_NAME}}';

const engine = new ThreeEngine();
const {{LOWER_PACKAGE_NAME}} = new {{MAIN_EXPORT}}({
  renderer: engine,
  // other options
});
```

{{ADDITIONAL_INTEGRATION_EXAMPLES}}

## Development

### Building
```bash
pnpm build
```

### Testing
```bash
pnpm test
```

### Linting
```bash
pnpm lint
```

### Type Checking
```bash
pnpm type-check
```

### Validation
```bash
pnpm validate
```

## Architecture

### Cathedral Design Patterns

This package follows Cathedral design principles:

1. **Trauma-Aware Design**: All interfaces and workflows are designed to be accessible and safe
2. **REGISTRY-Driven Architecture**: Configuration and data are driven by the Cathedral REGISTRY system
3. **Sacred Geometry Integration**: Built-in support for sacred geometry calculations and patterns
4. **Non-Clinical Framing**: User-facing elements avoid therapeutic or clinical language
5. **Creative-First Approach**: Designed for creative workflows and artistic expression

### Package Structure
```
src/
├── {{LOWER_PACKAGE_NAME}}.ts      # Main implementation
├── types/                         # TypeScript definitions
├── config/                        # Configuration schemas
├── utils/                         # Utility functions
└── index.ts                       # Main export
```

### Data Flow

```mermaid
graph TD
    A[User Input] --> B[{{MAIN_EXPORT}}]
    B --> C[Sacred Geometry Core]
    B --> D[Type Definitions]
    B --> E[Output Generation]
```

## Safety and Ethics

### Trauma-Safe Design
This package implements trauma-safe design principles:
- No triggering language or patterns
- Accessible user interfaces
- Clear, non-judgmental feedback
- Support for user preferences and accessibility needs

### Ethical Considerations
- No data collection without explicit consent
- Privacy-first architecture
- Transparent processing and workflows
- Support for creative expression without judgment

## Contributing

Please read our [Contributing Guidelines](https://github.com/cathedral-real/cathedral-real/blob/main/docs/CONTRIBUTING.md) before contributing to this package.

### Development Setup
```bash
git clone https://github.com/cathedral-real/cathedral-real.git
cd cathedral-real
pnpm install
pnpm dev:build
```

### Code Standards
- TypeScript strict mode required
- ESLint and Prettier configuration enforced
- Comprehensive test coverage required
- Documentation for all public APIs
- Trauma-safe language guidelines followed

## License

This package is part of the Cathedral Real project. See the main project [LICENSE](https://github.com/cathedral-real/cathedral-real/blob/main/LICENSE) file for details.

## Support

- **Documentation**: [Cathedral Real Docs](https://github.com/cathedral-real/cathedral-real/tree/main/docs)
- **Issues**: [GitHub Issues](https://github.com/cathedral-real/cathedral-real/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cathedral-real/cathedral-real/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Related Packages

### Cathedral Core
- [@cathedral/types](https://www.npmjs.com/package/@cathedral/types) - Type definitions
- [@cathedral/sacred-geometry-core](https://www.npmjs.com/package/@cathedral/sacred-geometry-core) - Sacred geometry utilities
- [@cathedral/three-engine](https://www.npmjs.com/package/@cathedral/three-engine) - Three.js integration

### Applications
- [@cathedral/cathedral-web-app](https://www.npmjs.com/package/@cathedral/cathedral-web-app) - Main web application
- [@cathedral/cathedral-hall-of-ateliers](https://www.npmjs.com/package/@cathedral/hall-of-ateliers) - Atelier system

### Specialized Tools
- [@cathedral/stone-grimoire](https://www.npmjs.com/package/@cathedral/stone-grimoire) - Content management
- [@cathedral/cosmogenesis](https://www.npmjs.com/package/@cathedral/cosmogenesis) - Universe generation

---

**Note**: This package is designed for creative and artistic expression. All interfaces and workflows are built with trauma-aware design principles and non-clinical framing. See our [Trauma Safety Guidelines](https://github.com/cathedral-real/cathedral-real/blob/main/docs/TRAUMA_SAFETY.md) for more information.