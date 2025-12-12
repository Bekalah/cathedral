# Cathedral Real - Vite Setup Guide

*Comprehensive guide for Vite development in the Cathedral Real monorepo*
*Version: 1.0.0 | Last Updated: December 5, 2025*

## Overview

The Cathedral Real monorepo uses **Vite 5.0.0** as its primary build tool for web applications, integrated with a sophisticated **Turbo v2.3.0** orchestration system. This guide covers the complete Vite setup, configuration, and workflow for the 132+ packages in the monorepo.

## Architecture Summary

```
🏛️ Cathedral Real Monorepo (132 packages)
├── 📦 Package Manager: pnpm 8.15.0
├── 🔧 Build Orchestration: Turbo v2.3.0
├── ⚡ Web Build Tool: Vite 5.0.0
├── 🎯 Framework: React 18.3.1 + TypeScript 5.6.2
├── 🌐 Deployment: Render + GitLab CI/CD + Cloudflare
└── 🧪 Testing: Vitest 2.1.1 + ESLint 9.11.1
```

## Current Vite Configuration Analysis

### Primary Vite Package: Cataract Book Scanner

**Package:** [`packages/cataract-book-scanner`](packages/cataract-book-scanner/package.json:1)
- **Vite Version:** 5.0.0
- **React Plugin:** @vitejs/plugin-react 4.0.0
- **Node Engine:** >=20.18.0
- **Package Manager:** pnpm >=8.0.0

#### Key Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "scan": "node dist/scanner/main.js",
  "extract": "node dist/extractor/archetype-miner.js",
  "integrate": "node dist/integrator/cathedral-integrator.js",
  "full-pipeline": "pnpm run scan && pnpm run extract && pnpm run integrate"
}
```

#### Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.181.0",
    "framer-motion": "^11.0.0",
    "konva": "^9.0.0",
    "fabric": "^6.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

## Turbo Integration

### Turbo Configuration ([`turbo.json`](turbo.json:1))

The monorepo uses Turbo v2.3.0 with sophisticated performance optimization:

```json
{
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "lib/**", "build/**", "coverage/**"],
      "cache": true,
      "env": ["NODE_ENV", "CI", "VERCEL_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    }
  },
  "perf": {
    "targetBuildTime": 300000,
    "maxConcurrency": 12,
    "memoryLimit": "2GB",
    "cacheTimeoutMs": 604800000
  }
}
```

### Root Package Scripts ([`package.json`](package.json:1))

```json
{
  "scripts": {
    "turbo": "turbo",
    "build": "turbo run build",
    "dev": "turbo run dev",
    "dev:all": "turbo run dev --parallel",
    "build:perf": "turbo run build --performance",
    "build:ci": "turbo run build --concurrency=8 --no-cache"
  }
}
```

## Development Workflow

### 1. Environment Setup

#### Prerequisites
- **Node.js:** >=20.18.0
- **pnpm:** >=8.15.0
- **Git** with proper SSH/HTTPS configuration

#### Installation
```bash
# Clone repository
git clone https://github.com/cathedral-real/cathedral-real.git
cd cathedral-real

# Install pnpm if not available
npm install -g pnpm@8.15.0

# Install dependencies
pnpm install

# Verify installation
pnpm run validate
```

### 2. Package-Specific Development

#### Cataract Book Scanner (Primary Vite App)
```bash
# Navigate to package
cd packages/cataract-book-scanner

# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Full scanning pipeline
pnpm run full-pipeline
```

#### Other Web Applications
```bash
# Hall of Ateliers (3D visualization)
cd packages/hall-of-ateliers
pnpm run dev

# Cathedral Logo System
cd packages/cathedral-logo-system
pnpm run dev
```

### 3. Monorepo-Wide Development

#### Parallel Development
```bash
# Start all development servers
pnpm run dev:all

# Build all packages
pnpm run build

# Run tests across all packages
pnpm run test

# Lint all packages
pnpm run lint
```

#### Selective Development
```bash
# Build only specific package types
turbo run build --filter="@cathedral/web-*"

# Development for specific package
turbo run dev --filter="cataract-book-scanner"

# Test specific package
turbo run test --filter="hall-of-ateliers"
```

## Build Configuration

### TypeScript Integration

All Vite packages use **TypeScript 5.6.2** with consistent configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "skipLibCheck": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Vite Configuration Patterns

While no explicit `vite.config.ts` files were found, the standard pattern is:

```typescript
// packages/cataract-book-scanner/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@cathedral': resolve(__dirname, '../..')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
});
```

## Deployment Architecture

### Multiple Platform Support

#### Render Deployment
- **Primary Platform:** Render.com for web applications
- **Free Tier:** Optimized for <512MB RAM, <750 hours/month
- **Services:** Multiple microservices architecture

```yaml
# Render service configuration
services:
  - type: web
    name: cathedral-web-apps
    env: node
    plan: free
    buildCommand: |
      npm install -g pnpm@8.15.0
      pnpm install --frozen-lockfile
      pnpm run build:web
    startCommand: |
      cd packages/cataract-book-scanner
      pnpm run preview --port $PORT --host 0.0.0.0
```

#### GitLab CI/CD Integration
- **Repository:** GitLab for enterprise security
- **Pipeline:** Multi-stage build and deployment
- **Security:** SAST, DAST, dependency scanning

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - test
  - build
  - deploy

validate:
  stage: validate
  script:
    - pnpm run type-check
    - pnpm run lint

build:
  stage: build
  script:
    - pnpm run build
  artifacts:
    paths:
      - "packages/*/dist/"
```

#### Cloudflare Integration
- **CDN:** Cloudflare Pages for static assets
- **Workers:** Serverless functions for API endpoints
- **Edge:** Global distribution

### Deployment Scripts

#### Automated Deployment
```bash
# Render deployment
./scripts/deploy-render.sh

# Vercel deployment
./scripts/deploy-vercel.sh

# GitLab CI/CD
git push origin main  # Triggers pipeline
```

## Quality Assurance

### Code Quality Standards

#### ESLint Configuration ([`.eslintrc.js`](.eslintrc.js:1))
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // Cathedral-specific trauma-aware rules
    'no-autoplay': 'error',
    'no-flicker': 'error',
    'prefer-gentle-animations': 'warn',
  }
};
```

#### TypeScript Validation
```bash
# Type checking
turbo run type-check

# Strict type checking
tsc --noEmit --strict
```

### Testing Framework

#### Vitest Configuration
- **Version:** 2.1.1
- **Coverage:** Integrated with Turbo caching
- **Parallel:** Optimized for monorepo

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Performance Optimization

### Turbo Cache Configuration

#### Remote Cache
```json
{
  "remoteCache": {
    "enabled": true,
    "signature": true
  }
}
```

#### Local Optimization
```json
{
  "experimentalSpeedups": {
    "cache": {
      "compressionLevel": 6,
      "cacheKeyFormat": "contentHash",
      "incrementalFingerprinting": true
    },
    "execution": {
      "parallelism": "auto",
      "workerPool": "dynamic",
      "dependencyAnalysis": "static"
    }
  }
}
```

### Build Performance Targets

```json
{
  "perf": {
    "targetBuildTime": 300000,    // 5 minutes
    "maxConcurrency": 12,         // CPU cores
    "memoryLimit": "2GB",         // RAM limit
    "cacheTimeoutMs": 604800000   // 7 days
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear all caches
turbo run clean
pnpm store prune

# Rebuild from scratch
pnpm install
turbo run build
```

#### 2. Development Server Issues
```bash
# Port conflicts
pnpm run dev --port 5174

# Memory issues
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run dev
```

#### 3. Dependency Resolution
```bash
# Update dependencies
pnpm update -r

# Check for outdated packages
pnpm outdated -r

# Audit security
pnpm audit -r
```

#### 4. Turbo Cache Issues
```bash
# Clear Turbo cache
rm -rf node_modules/.cache
rm -rf .turbo

# Force rebuild
turbo run build --force
```

### Debug Mode

#### Verbose Logging
```bash
# Enable debug mode
DEBUG=turbo:*
turbo run build

# Vite debug
VITE_DEBUG=true
pnpm run dev
```

#### Performance Monitoring
```bash
# Build performance analysis
turbo run build --profile

# Bundle analysis
pnpm run build --analyze
```

### Memory Management

#### Environment Variables
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Optimize for low-memory environments
export NODE_OPTIONS="--max-old-space-size=2048"
```

#### Build Optimization
```bash
# Incremental builds
turbo run build --cache

# Parallel builds with memory limits
turbo run build --concurrency=4
```

## Package Ecosystem

### Web Applications (Vite-enabled)

| Package | Framework | Status | Purpose |
|---------|-----------|--------|---------|
| `cataract-book-scanner` | React + Vite | ✅ Active | Book scanning & archetype extraction |
| `hall-of-ateliers` | React + Three.js | ✅ Active | 3D visualization & creative tools |
| `cathedral-logo-system` | React + Three.js | ✅ Active | Logo design & branding system |

### Development Tools

| Package | Purpose | Integration |
|---------|---------|-------------|
| `art-engine-core` | Creative engine | Vite-compatible |
| `sacred-geometry-core` | Mathematical computations | Library package |
| `game-design-core` | Game development tools | Build system |

## Best Practices

### 1. Code Organization
```typescript
// Standard file structure
src/
├── components/     # React components
├── utils/         # Utility functions
├── hooks/         # Custom React hooks
├── types/         # TypeScript definitions
└── styles/        # CSS/styling
```

### 2. Import Patterns
```typescript
// Use path aliases
import { Component } from '@/components/Component';
import { utility } from '@cathedral/shared';

// Type imports
import type { User } from '@/types/User';
```

### 3. Performance Optimization
```typescript
// Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

// Memoization
const MemoizedComponent = memo(Component);

// Bundle optimization
import { chunk } from 'lodash-es';
```

### 4. Error Handling
```typescript
// Error boundaries
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Cathedral Error:', error, errorInfo);
  }
}
```

## Migration to GitLab

### Current Status
- **Repository Migration:** Planned for GitLab enterprise
- **CI/CD Pipeline:** Ready for GitLab CI/CD
- **Security:** Enterprise-grade security scanning
- **Cost Optimization:** $1,188/month for GitLab Ultimate

### Migration Steps
1. **Repository Setup**
   ```bash
   # Create GitLab repository
   git remote add gitlab https://gitlab.com/cathedral-real/cathedral-real.git
   git push gitlab main
   ```

2. **CI/CD Configuration**
   ```yaml
   # .gitlab-ci.yml (already prepared)
   include:
     - template: Security/SAST.gitlab-ci.yml
     - template: Security/Dependency-Scanning.gitlab-ci.yml
   ```

3. **Environment Variables**
   ```bash
   # GitLab CI/CD variables
   RENDER_API_TOKEN=your_token
   CLOUDFLARE_API_TOKEN=your_token
   NPM_TOKEN=your_token
   ```

## Security Considerations

### Dependency Security
```bash
# Security audit
pnpm audit -r

# Fix vulnerabilities
pnpm audit --fix

# CI security scanning
turbo run quality:security
```

### Code Security
- **No hardcoded secrets** in source code
- **Environment variables** for sensitive data
- **Dependency scanning** in CI/CD
- **SAST integration** with GitLab

## Conclusion

The Cathedral Real monorepo implements a sophisticated Vite-based development ecosystem optimized for:

- **Performance:** Turbo caching with 5-minute build targets
- **Scalability:** 132+ packages with parallel processing
- **Quality:** Integrated testing and linting
- **Deployment:** Multi-platform deployment (Render, GitLab, Cloudflare)
- **Security:** Enterprise-grade security scanning

This setup provides a production-ready foundation for scalable web application development while maintaining code quality and deployment automation.

---

*For more information, see:*
- [`docs/build-system.md`](docs/build-system.md) - Build system documentation
- [`docs/QUALITY_ASSURANCE.md`](docs/QUALITY_ASSURANCE.md) - Quality assurance guidelines
- [`BUILD_OPTIMIZATION_SUMMARY.md`](BUILD_OPTIMIZATION_SUMMARY.md) - Performance optimization details