# Cathedral Build System Documentation

## Overview

The Cathedral Build System is a high-performance, Turbo-powered monorepo build system optimized for the 131+ packages in the Cathedral Real ecosystem. This system provides consistent, fast, and reliable builds across all packages while maintaining developer-friendly workflows.

## Architecture

### Core Components

- **Turbo**: High-performance monorepo build orchestrator
- **pnpm**: Efficient package manager with workspace support
- **TypeScript**: Standardized TypeScript compilation
- **Vitest**: Unified testing framework
- **ESLint + Prettier**: Code quality and formatting

### Build Pipeline

```
📦 Monorepo Root
├── 🏗️ Turbo Orchestration (turbo.json)
├── 📋 Root Scripts (package.json)
├── 🔧 Package Scripts (packages/*/package.json)
└── 🧪 Testing & Validation
```

## Quick Start

### Prerequisites

- **Node.js**: >= 18.17.0
- **pnpm**: >= 8.15.0

### Installation

```bash
# Install dependencies
pnpm install

# Run initial build
pnpm run build

# Start development
pnpm run dev:all
```

## Core Commands

### Build Operations

```bash
# Build all packages (parallel execution)
pnpm run build

# Build specific packages
turbo run build --filter="package-name"

# Performance-optimized build
pnpm run build:perf

# CI build (no cache, high concurrency)
pnpm run build:ci
```

### Development Commands

```bash
# Start all packages in development mode
pnpm run dev:all

# Development mode for specific package
turbo run dev --filter="package-name"

# Watch mode for TypeScript compilation
turbo run dev --parallel
```

### Testing Commands

```bash
# Run all tests
pnpm run test

# Watch mode for tests
turbo run test --watch

# Coverage reports
turbo run test:coverage

# CI testing (no cache, high concurrency)
pnpm run test:ci
```

### Code Quality

```bash
# Lint all packages
pnpm run lint

# Auto-fix linting issues
pnpm run lint:fix

# Format code
pnpm run format

# Type checking
turbo run type-check
```

### Utility Commands

```bash
# Clean all build artifacts
pnpm run clean:all

# Dependency management
pnpm run deps:update
pnpm run deps:audit
pnpm run deps:check

# Validation (type-check + lint + test)
pnpm run validate

# Full CI validation
pnpm run validate:ci
```

## Performance Optimizations

### Turbo Configuration

- **Parallel Execution**: Up to 12 concurrent builds
- **Smart Caching**: 7-day cache retention
- **Dependency Graph**: Automatic dependency resolution
- **Performance Monitoring**: Build time tracking

### Optimization Features

| Feature | Description | Impact |
|---------|-------------|---------|
| Parallel Builds | 12 concurrent package builds | ~60% faster |
| Smart Caching | Content-based caching | ~80% faster rebuilds |
| Dependency Graph | Automatic dependency resolution | ~40% faster |
| Incremental Builds | Only changed packages | ~90% faster |

### Performance Targets

- **Full Build**: < 5 minutes (target: 3-4 minutes)
- **Incremental Build**: < 30 seconds
- **Test Suite**: < 2 minutes
- **Type Checking**: < 1 minute

## Package Standards

### Required Scripts

Every package must include these standardized scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/**/*.{ts,tsx,js,jsx} --max-warnings=0",
    "lint:fix": "eslint src/**/*.{ts,tsx,js,jsx} --fix",
    "type-check": "tsc --noEmit",
    "clean": "rimraf dist build",
    "validate": "npm run type-check && npm run lint && npm run test"
  }
}
```

### Required Dev Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.6.2",
    "tsx": "^4.19.1",
    "vitest": "^2.1.1",
    "eslint": "^9.11.1",
    "prettier": "^3.3.3",
    "rimraf": "^6.0.1",
    "@typescript-eslint/eslint-plugin": "^8.6.0",
    "@typescript-eslint/parser": "^8.6.0"
  }
}
```

## Workflow Patterns

### Development Workflow

1. **Local Development**:
   ```bash
   pnpm run dev:all  # Start all packages
   ```

2. **Single Package Development**:
   ```bash
   turbo run dev --filter="package-name"
   ```

3. **Testing Changes**:
   ```bash
   pnpm run validate  # Full validation
   ```

### Continuous Integration

```yaml
# .github/workflows/build.yml
name: Build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run build:ci
      - run: pnpm run validate:ci
```

### Release Workflow

```bash
# 1. Build and validate
pnpm run validate:ci

# 2. Run benchmarks
pnpm run benchmark

# 3. Create release
changeset publish
```

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear all caches and rebuild
pnpm run clean:all
pnpm install
pnpm run build
```

#### Dependency Issues

```bash
# Audit and fix dependencies
pnpm run deps:audit
pnpm install --fix-lockfile
```

#### Performance Issues

```bash
# Check build performance
turbo run build --profile

# Clear Turbo cache
rm -rf node_modules/.turbo
```

### Performance Monitoring

```bash
# Enable Turbo profiling
turbo run build --profile --no-cache

# View detailed logs
turbo run build --verbosity=2
```

## Best Practices

### Package Development

1. **Use Standard Scripts**: Always use the standardized build scripts
2. **Type Safety**: Maintain strict TypeScript configuration
3. **Testing**: Include unit tests for all packages
4. **Documentation**: Keep package documentation updated

### Build Optimization

1. **Dependency Management**: Keep dependencies minimal and up-to-date
2. **Build Outputs**: Use consistent output directories (`dist/`, `build/`)
3. **Caching**: Leverage Turbo's caching for faster rebuilds
4. **Parallel Execution**: Use parallel builds when possible

### Code Quality

1. **ESLint**: Follow Cathedral coding standards
2. **Prettier**: Consistent code formatting
3. **TypeScript**: Strict type checking enabled
4. **Testing**: Comprehensive test coverage

## Cathedral-Specific Features

### Sacred Mathematics Validation

```bash
# Validate sacred geometry implementations
turbo run validate:sacred-math
```

### Trauma Safety Validation

```bash
# Validate trauma-safe UI patterns
turbo run validate:trauma-safety
```

### Integration Validation

```bash
# Validate package integrations
turbo run validate:integration
```

### Ownership Validation

```bash
# Validate package ownership
turbo run validate:ownership
```

## Monitoring and Metrics

### Build Metrics

- **Build Time**: Target < 5 minutes for full build
- **Cache Hit Rate**: Target > 80% for incremental builds
- **Test Coverage**: Target > 80% coverage
- **Bundle Size**: Monitor output sizes

### Performance Dashboard

```bash
# Generate performance report
turbo run build --profile --no-cache > build-report.txt
```

## Support and Maintenance

### Regular Maintenance

1. **Weekly**: Update dependencies (`pnpm run deps:update`)
2. **Monthly**: Audit security (`pnpm run deps:audit`)
3. **Quarterly**: Review and optimize build performance

### Getting Help

- **Documentation**: This guide and package-specific docs
- **Issues**: GitHub Issues for bug reports
- **Performance**: Use Turbo profiling for performance issues

---

**Last Updated**: December 4, 2025  
**Version**: 1.0.0  
**Maintainer**: Cathedral Build System Team