# Cathedral Real Package Publishing Guide

## 🎨 About Cathedral

Cathedral Real is a **Magnum Opus v1 Cosmos Builder** - a serious creative OS + fable-style RPG framework driven by REGISTRY data, concrete tools, and verified references. This is a **fictional/creative work** designed for entertainment and creative exploration.

## 🛡️ Trauma-Safe Design Philosophy

All Cathedral packages follow trauma-aware design principles:
- No autoplay or forced animations
- Gentle defaults with user control
- Motion sensitivity options
- Clear exit mechanisms
- Undo/redo functionality
- Energy-aware interfaces

## 📦 Dual Registry Support

Cathedral packages are available through both NPM and GitHub Packages registries for maximum flexibility and reliability.

### Registry Configuration

#### NPM Registry (Primary)
```bash
# Standard installation
npm install @cathedral/package-name
```

#### GitHub Packages (Secondary/Backup)
```bash
# GitHub Packages installation
npm install @cathedral/package-name --registry=https://npm.pkg.github.com/
```

### Authentication Setup

#### For GitHub Packages

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with `read:packages` and `write:packages` permissions
   - Copy the token (you'll only see it once)

2. **Configure Authentication:**

   **Option A: Environment Variable (Recommended)**
   ```bash
   export GITHUB_PACKAGES_TOKEN=ghp_your_token_here
   ```

   **Option B: .npmrc file**
   ```bash
   //npm.pkg.github.com/:_authToken=ghp_your_token_here
   ```

3. **Test Authentication:**
   ```bash
   npm ping --registry=https://npm.pkg.github.com/
   ```

### Package Installation Examples

```bash
# Install from default registry (NPM)
npm install @cathedral/types @cathedral/three-engine

# Install from GitHub Packages
npm install @cathedral/types @cathedral/three-engine --registry=https://npm.pkg.github.com/

# Install specific version
npm install @cathedral/types@1.0.0

# Install with workspace support
pnpm add @cathedral/types -w
```

### CI/CD Integration

#### GitHub Actions Example

```yaml
name: Publish Packages

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          
      - name: Setup GitHub Packages
        run: |
          echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_PACKAGES_TOKEN }}" >> ~/.npmrc
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build packages
        run: npm run build
        
      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          
      - name: Publish to GitHub Packages
        run: npm publish --registry=https://npm.pkg.github.com/
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_PACKAGES_TOKEN }}
```

### Publishing Process

1. **Version Management:**
   - Uses semantic-release for automatic versioning
   - Conventional commits for changelog generation
   - Automatic GitHub release creation

2. **Publishing Workflow:**
   ```bash
   # Install semantic-release dependencies
   npm install -g @semantic-release/cli
   
   # Run release (triggered on main branch commits)
   npm run release
   ```

3. **Manual Publishing (if needed):**
   ```bash
   # Build all packages
   npm run build
   
   # Publish to NPM
   npm publish packages/*/
   
   # Publish to GitHub Packages
   npm publish packages/*/ --registry=https://npm.pkg.github.com/
   ```

### Package Structure

All Cathedral packages follow this structure:

```typescript
// Example: @cathedral/types
export interface CathedralPackage {
  name: string;
  version: string;
  description: string;
  traumaSafe: boolean;
  sacredGeometry: boolean;
}
```

### Development Setup

1. **Clone and Setup:**
   ```bash
   git clone https://github.com/your-org/cathedral-real.git
   cd cathedral-real
   npm install
   ```

2. **Configure Registry:**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Add your GitHub token
   echo "GITHUB_PACKAGES_TOKEN=ghp_your_token" >> .env
   ```

3. **Development Commands:**
   ```bash
   # Build all packages
   npm run build
   
   # Run tests
   npm run test
   
   # Lint all packages
   npm run lint
   
   # Type check all packages
   npm run type-check
   ```

### Available Packages

Core Cathedral packages:

- **[@cathedral/types](packages/types/)** - TypeScript type definitions
- **[@cathedral/three-engine](packages/three-engine/)** - Three.js wrapper for 3D visualizations
- **[@cathedral/sacred-geometry-core](packages/sacred-geometry-core/)** - Sacred geometry algorithms
- **[@cathedral/hall-of-ateliers](packages/hall-of-ateliers/)** - Creative collaboration tools
- **[@cathedral/stone-grimoire](packages/stone-grimoire/)** - Body and archive systems
- **[@cathedral/cosmogenesis](packages/cosmogenesis/)** - Cosmos topology visualization
- **[@cathedral/cathedral-web-app](packages/cathedral-web-app/)** - Main web application

### Support and Community

- **Issues:** Report bugs on GitHub Issues
- **Discussions:** Join our GitHub Discussions for community support
- **Contributing:** See CONTRIBUTING.md for development guidelines
- **Documentation:** Full API docs available at our GitHub Pages site

### License

All Cathedral packages are released under the CC0-1.0 license (public domain).

---

## ⚡ Quick Start

```bash
# Install a Cathedral package
npm install @cathedral/types

# Use in your TypeScript project
import { CathedralPackage } from '@cathedral/types';

const myPackage: CathedralPackage = {
  name: 'my-creation',
  version: '1.0.0',
  description: 'A trauma-safe, sacred-geometry inspired creation',
  traumaSafe: true,
  sacredGeometry: true
};
```

Welcome to the Cathedral of Circuits - where creativity meets cosmic architecture! 🕍✨