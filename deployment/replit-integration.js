#!/usr/bin/env node
/**
 * 🔗 REPLIT INTEGRATION & ONLINE/OFFLINE SYNC
 * Master Cathedral V1.0 - Seamless Replit Connection
 * 
 * This script connects the consolidated offline repository with Replit work
 * and ensures proper sync with bekah.github.io/cathedral
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const REPLIT_CONFIG = {
  // Replit project configuration
  replitProject: "master-cathedral-repo-v1",
  mainRepo: "Bekalah/cathedral",
  offlineRepo: "master-cathedral-offline",
  
  // Online cathedral configuration
  githubPages: "https://bekalah.github.io/cathedral",
  mainRepoUrl: "https://github.com/Bekalah/cathedral.git",
  
  // Sync configuration
  sync: {
    autoSync: true,
    biDirectional: true,
    exclude: [
      "node_modules/",
      ".git/",
      "external-backup-*/",
      "dist/",
      "build/",
      ".turbo/"
    ]
  },
  
  // Turbo/OpenSpec integration
  turbo: {
    replitTasks: ["dev", "build", "test", "deploy"],
    openspec: true,
    parallel: true
  }
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m'    // Red
  }
  const reset = '\x1b[0m'
  const timestamp = new Date().toISOString()
  console.log(`${colors[type]}[${timestamp}] ${message}${reset}`)
}

function createReplitConfiguration() {
  log('Creating Replit integration configuration...', 'info')
  
  // Create .replit file for proper Replit setup
  const replitConfig = `# Replit Configuration for Master Cathedral V1.0
# Connection to bekah.github.io/cathedral and offline development

run = "pnpm run dev --parallel"
hidden = ".config, .config.*, .env"
modules = ["nodejs-20", "npm-8", "web"]

[gitHubImport]
requiredFiles = [".replit", "replit.nix"]

[nix]
channel = "stable-21.11"

[deployment]
build = ["pnpm run build:all"]
deploymentTarget = "static"
publicDir = "apps/web/out"

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx,*.mjs,*.cjs}"
syntax = "javascript"

[languages.javascript.languageServer]
start = ["typescript-language-server", "--stdio"]

[cDeployment]
build = ["pnpm run build"]
deploymentTarget = "static"

[deployment.encryptedEnv]
NUXT_SECRET = "env:NUXT_SECRET"
GITHUB_TOKEN = "env:GITHUB_TOKEN"
VERCEL_TOKEN = "env:VERCEL_TOKEN"

[deployment]
from = "apps/web/out"
to = "/"
deploymentTarget = "static"
publicDir = "apps/web/out"
`

  fs.writeFileSync('.replit', replitConfig)
  log('Created .replit configuration', 'success')
  
  // Create replit.nix for Nix environment
  const replitNix = `{ pkgs }: {
  deps = [
    pkgs.nodejs-20
    pkgs.npm-8
    pkgs.yarn
    pkgs.replitPackages.jest
    pkgs.replitPackages.typescript
    pkgs.git
    pkgs.rustup
    pkgs.cargo
  ];
}`
  
  fs.writeFileSync('replit.nix', replitNix)
  log('Created replit.nix environment', 'success')
}

function createOnlineOfflineSync() {
  log('Setting up online/offline repository sync...', 'info')
  
  // Create sync configuration
  const syncConfig = {
    version: "1.0.0",
    description: "Online/Offline sync configuration for Master Cathedral",
    
    repositories: {
      offline: {
        path: ".",
        type: "local",
        branch: "main"
      },
      online: {
        url: "https://github.com/Bekalah/cathedral.git",
        type: "remote",
        branch: "main"
      },
      replit: {
        project: REPLIT_CONFIG.replitProject,
        type: "replit"
      }
    },
    
    syncRules: {
      autoMerge: true,
      conflictResolution: "offline-wins",
      excludePatterns: REPLIT_CONFIG.sync.exclude
    },
    
    deployment: {
      githubPages: REPLIT_CONFIG.githubPages,
      autoDeploy: true,
      branches: ["main"]
    }
  }
  
  fs.writeFileSync('deployment/sync-config.json', JSON.stringify(syncConfig, null, 2))
  log('Created sync configuration', 'success')
  
  // Create sync script
  const syncScript = `#!/bin/bash
# 🔄 Online/Offline Sync Script

set -e

echo "🔗 Master Cathedral V1.0 - Online/Offline Sync"

# Function to sync with online repository
sync_with_online() {
    echo "📡 Syncing with online repository..."
    
    # Add remote if not exists
    git remote | grep -q "upstream" || git remote add upstream https://github.com/Bekalah/cathedral.git
    
    # Fetch latest changes
    git fetch upstream
    
    # Merge changes if needed
    if git merge-base --is-ancestor HEAD upstream/main; then
        echo "✅ Already up to date with online repository"
    else
        echo "🔄 Merging changes from online repository..."
        git merge upstream/main --no-edit
    fi
}

# Function to sync with Replit
sync_with_replit() {
    echo "🤖 Syncing with Replit project..."
    
    # Export environment for Replit
    export REPLIT_PROJECT=${REPLIT_CONFIG.replitProject}
    export REPL_ID=\$(printenv REPL_ID)
    export REPL_NAME=\$(printenv REPL_NAME)
    
    # Run Replit sync if available
    if command -v replit-sync > /dev/null 2>&1; then
        replit-sync --project $REPLIT_CONFIG.replitProject
    else
        echo "⚠️ Replit sync not available, skipping..."
    fi
}

# Function to deploy to GitHub Pages
deploy_to_pages() {
    echo "🌐 Deploying to GitHub Pages..."
    
    # Build the site
    pnpm run build:all
    
    # Deploy to GitHub Pages
    pnpm run deploy:github
    
    echo "✅ Deployed to: ${REPLIT_CONFIG.githubPages}"
}

# Parse command line arguments
case "$1" in
    "sync-online")
        sync_with_online
        ;;
    "sync-replit")
        sync_with_replit
        ;;
    "deploy")
        deploy_to_pages
        ;;
    "full-sync")
        sync_with_online
        sync_with_replit
        deploy_to_pages
        ;;
    *)
        echo "Usage: $0 {sync-online|sync-replit|deploy|full-sync}"
        echo ""
        echo "Commands:"
        echo "  sync-online  - Sync with online GitHub repository"
        echo "  sync-replit  - Sync with Replit project"
        echo "  deploy       - Deploy to GitHub Pages"
        echo "  full-sync    - Complete sync cycle"
        exit 1
        ;;
esac
`

  fs.writeFileSync('scripts/sync-online-offline.sh', syncScript)
  execSync('chmod +x scripts/sync-online-offline.sh')
  log('Created online/offline sync script', 'success')
}

function updatePackageJsonForOnlineConnection() {
  log('Updating package.json for online connection...', 'info')
  
  // Read current package.json
  const packageJsonPath = 'package.json'
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  // Add Replit-specific scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    // Replit integration
    "replit:sync": "./scripts/sync-online-offline.sh sync-replit",
    "online:sync": "./scripts/sync-online-offline.sh sync-online", 
    "full:sync": "./scripts/sync-online-offline.sh full-sync",
    "deploy:pages": "pnpm run build:all && ./scripts/sync-online-offline.sh deploy",
    
    // OpenSpec integration with online
    "openspec:replit": "openspec list --json | jq '.'",
    "openspec:online": "openspec sync --remote upstream",
    
    // Turbo tasks for online development
    "turbo:replit": "turbo run dev --filter=./apps/* --filter=./packages/* --parallel",
    "build:replit": "turbo run build --filter=./apps/* --filter=./packages/*"
  }
  
  // Update repository information
  packageJson.repository = {
    type: "git",
    url: "https://github.com/Bekalah/cathedral.git"
  }
  
  packageJson.homepage = "https://bekalah.github.io/cathedral"
  packageJson.bugs = {
    url: "https://github.com/Bekalah/cathedral/issues"
  }
  
  // Add Replit metadata
  packageJson.cathedral = {
    ...packageJson.cathedral,
    replit_integration: {
      enabled: true,
      project: REPLIT_CONFIG.replitProject,
      auto_sync: true
    },
    online_connection: {
      github_pages: REPLIT_CONFIG.githubPages,
      sync_enabled: true,
      bi_directional: true
    }
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  log('Updated package.json with online connection scripts', 'success')
}

function createGitHubActionsForOnlineSync() {
  log('Creating GitHub Actions for online synchronization...', 'info')
  
  // Create GitHub Actions workflow for online/offline sync
  const githubWorkflow = `name: Master Cathedral V1.0 - Online/Offline Sync

on:
  push:
    branches: [ main ]
    paths:
      - 'apps/**'
      - 'packages/**'
      - 'data/**'
      - 'turbo.json'
      - 'package.json'
  pull_request:
    branches: [ main ]
  workflow_dispatch:
    inputs:
      sync_mode:
        description: 'Sync mode'
        required: true
        default: 'full-sync'
        type: choice
        options:
        - full-sync
        - sync-online
        - deploy
      replit_integration:
        description: 'Include Replit sync'
        required: false
        default: false
        type: boolean

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  sync-offline-online:
    runs-on: ubuntu-latest
    env:
      NODE_VERSION: '20'
      PNP_VERSION: '8'
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: \${{ github.ref }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: \${{ env.PNP_VERSION }}
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Validate offline repository
        run: |
          echo "🔍 Validating offline repository structure..."
          pnpm run consolidation:validate
          pnpm run validate:all
      
      - name: Sync with Replit
        if: github.event.inputs.replit_integration == 'true'
        run: |
          echo "🤖 Syncing with Replit project..."
          ./scripts/sync-online-offline.sh sync-replit
      
      - name: Build for deployment
        run: |
          echo "🏗️ Building Master Cathedral V1.0..."
          pnpm run build:all
      
      - name: Deploy to GitHub Pages
        if: github.event.inputs.sync_mode == 'deploy' || github.event.inputs.sync_mode == 'full-sync'
        uses: actions/deploy-pages@v4
        with:
          path: 'apps/web/out'
      
      - name: OpenSpec synchronization
        run: |
          echo "📋 Synchronizing OpenSpec changes..."
          openspec sync --remote upstream
      
      - name: Update online repository
        run: |
          echo "📡 Updating online repository..."
          git push upstream main || echo "No upstream remote configured"
      
      - name: Success notification
        run: |
          echo "✅ Master Cathedral V1.0 online/offline sync completed successfully!"
          echo "🌐 Deployed to: https://bekalah.github.io/cathedral"
      
      - name: Failure notification
        if: failure()
        run: |
          echo "❌ Master Cathedral V1.0 sync failed!"
          echo "🔍 Check logs for details"
          exit 1

  replit-integration:
    runs-on: ubuntu-latest
    if: contains(github.event.head_commit.message, '[replit]')
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: '8'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Replit-specific build
        run: |
          echo "🤖 Building for Replit integration..."
          pnpm run build:replit
      
      - name: Test Replit compatibility
        run: |
          echo "🧪 Testing Replit compatibility..."
          pnpm run test
          pnpm run lint
`
  
  fs.writeFileSync('.github/workflows/online-offline-sync.yml', githubWorkflow)
  log('Created GitHub Actions workflow for online sync', 'success')
}

function createDevelopmentWorkflow() {
  log('Creating unified development workflow...', 'info')
  
  const workflowDoc = `# 🔄 Master Cathedral V1.0 - Online/Offline Development Workflow

## Overview
This document describes how to seamlessly work with the Master Cathedral V1.0 repository both offline and online, with proper Replit integration.

## Development Modes

### 1. **Offline Development (Current)**
```bash
# Local development
pnpm run dev                    # Start local development servers
pnpm run build:all             # Build everything including Godot
pnpm run consolidation:validate # Validate changes
```

### 2. **Replit Integration**
```bash
# Sync with Replit
pnpm run replit:sync           # Sync with Replit project
pnpm run turbo:replit          # Run Turbo tasks on Replit
pnpm run build:replit          # Build optimized for Replit
```

### 3. **Online Synchronization**
```bash
# Sync with online repository
pnpm run online:sync           # Sync with GitHub
pnpm run deploy:pages          # Deploy to GitHub Pages
pnpm run full:sync             # Complete sync cycle
```

## Key Integration Points

### Replit Connection
- **Project**: \`${REPLIT_CONFIG.replitProject}\`
- **Auto-sync**: Enabled for seamless development
- **Conflict Resolution**: Offline changes take precedence

### Online Repository
- **GitHub**: https://github.com/Bekalah/cathedral
- **GitHub Pages**: https://bekalah.github.io/cathedral
- **Sync**: Bi-directional with automatic conflict resolution

### OpenSpec Integration
- **Local**: OpenSpec changes validated locally
- **Online**: Changes synced to main repository
- **Replit**: OpenSpec compatibility maintained

## Deployment Pipeline

```bash
# Complete deployment workflow
1. pnpm run consolidation:validate  # Validate offline changes
2. pnpm run full:sync               # Sync with Replit and GitHub
3. pnpm run deploy:pages           # Deploy to GitHub Pages
```

## Turbo Integration
- **Local**: \`turbo run dev --parallel\`
- **Replit**: \`pnpm run turbo:replit\`
- **Online**: GitHub Actions handles Turbo builds

## Troubleshooting

### Sync Issues
```bash
# Force re-sync
git remote add upstream https://github.com/Bekalah/cathedral.git
git fetch upstream
git merge upstream/main
```

### Replit Connection
```bash
# Test Replit integration
node deployment/replit-integration.js
```

### OpenSpec Issues
```bash
# Sync OpenSpec changes
openspec sync --remote upstream
openspec validate --strict
```

## Success Criteria
- ✅ Offline development works seamlessly
- ✅ Replit integration connects properly
- ✅ Online repository stays synchronized
- ✅ GitHub Pages deployment works
- ✅ OpenSpec compliance maintained
- ✅ Turbo builds work across all environments
`

  fs.writeFileSync('docs/ONLINE_OFFLINE_WORKFLOW.md', workflowDoc)
  log('Created unified development workflow documentation', 'success')
}

function main() {
  log('🏰 Starting Master Cathedral V1.0 Online/Offline Integration', 'info')
  
  try {
    // Step 1: Create Replit configuration
    createReplitConfiguration()
    
    // Step 2: Set up online/offline sync
    createOnlineOfflineSync()
    
    // Step 3: Update package.json for online connection
    updatePackageJsonForOnlineConnection()
    
    // Step 4: Create GitHub Actions workflow
    createGitHubActionsForOnlineSync()
    
    // Step 5: Create development workflow documentation
    createDevelopmentWorkflow()
    
    log('🎉 Master Cathedral V1.0 Online/Offline Integration Complete!', 'success')
    log('', 'info')
    log('📋 Summary:', 'info')
    log('✅ Replit configuration created (.replit, replit.nix)', 'success')
    log('✅ Online/offline sync system established', 'success')
    log('✅ Package.json updated with sync scripts', 'success')
    log('✅ GitHub Actions workflow for automated sync', 'success')
    log('✅ Development workflow documentation created', 'success')
    log('', 'info')
    log('🚀 Ready for deployment:', 'info')
    log('• Replit: pnpm run replit:sync', 'info')
    log('• Online: pnpm run online:sync', 'info')
    log('• Pages: pnpm run deploy:pages', 'info')
    log('• Full: pnpm run full:sync', 'info')
    
    process.exit(0)
    
  } catch (error) {
    log(`💥 Integration failed: ${error.message}`, 'error')
    console.error(error)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}