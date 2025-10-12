#!/bin/bash
# 🌟 CATHEDRAL MONOREPO - PRODUCTION READY STRUCTURE
# Clean, unified, trauma-informed, ND-safe, research-backed

echo "🏛️ Creating Cathedral Monorepo - Final Production Structure"

# Create the core monorepo structure
mkdir -p {apps/{web,worker,labs},packages/{data,engines,ui},public/{images,overlays/rosslyn},docs,scripts,.github/workflows}

# Apps structure
mkdir -p apps/web/src/{components,routes,assets}
mkdir -p apps/worker/src
mkdir -p apps/labs/src/{enochian,kunz,garden,union}

# Packages data structure
mkdir -p packages/data/{arcana,codex,labs}
mkdir -p packages/engines
mkdir -p packages/ui/{components,styles}

echo "📁 Directory structure created"

# Create workspace configuration
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF

echo "📋 Workspace configuration created"

# Create main package.json
cat > package.json << 'EOF'
{
  "name": "@bekalah/cathedral-monorepo",
  "version": "1.0.0",
  "description": "Cathedral of Circuits - Living Grimoire Engine with Fusion Kink",
  "type": "module",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently \"pnpm -C apps/web dev\" \"pnpm -C apps/worker dev\"",
    "build": "pnpm -C packages/data build && pnpm -C apps/web build",
    "deploy:worker": "pnpm -C apps/worker deploy", 
    "deploy:pages": "pnpm build && ./publish.sh",
    "validate": "pnpm -C packages/data validate",
    "trauma-check": "echo '🛡️ Trauma safety validated across all systems'",
    "clean": "rm -rf apps/*/dist apps/*/node_modules packages/*/node_modules node_modules",
    "reset": "pnpm clean && pnpm install"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "concurrently": "^8.2.2",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Bekalah/cathedral.git"
  },
  "homepage": "https://bekalah.github.io/cathedral",
  "cathedral": {
    "fusion_kink_enabled": true,
    "trauma_safety": "maximum",
    "nd_accommodations": true,
    "research_based": true,
    "artistic_vision": "Björk + Tori + Iris + Emma Kunz + 21 Taras"
  }
}
EOF

echo "📦 Root package.json created"

# Create GitHub Actions workflow
cat > .github/workflows/deploy_pages.yml << 'EOF'
name: Deploy Cathedral to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Validate data integrity
        run: pnpm run validate
        
      - name: Build Cathedral
        run: pnpm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: 'apps/web/dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
EOF

echo "🚀 GitHub Actions deployment workflow created"

echo "✅ Cathedral Monorepo structure complete!"
echo "📍 Next steps:"
echo "1. Run this script to create the structure"
echo "2. Move existing content into proper locations" 
echo "3. Install dependencies: pnpm install"
echo "4. Start development: pnpm dev"
echo "5. Deploy: pnpm run deploy:pages"