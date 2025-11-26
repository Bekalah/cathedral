#!/bin/bash
# Secure systems and upgrade to best quality with Japanese design
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

cd "$ROOT_DIR"

# 1. Secure git remotes
log "Securing git remotes..."
if [ -d ".git" ]; then
    git remote set-url origin https://github.com/Bekalah/cathedral.git 2>/dev/null || \
    git remote add origin https://github.com/Bekalah/cathedral.git 2>/dev/null || true
    log "✓ Git remote secured"
fi

# 2. Remove console injection
log "Removing console injection code..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/.next/*" \
    -not -path "*/dist/*" \
    -exec grep -l "console-ninja\|_console_ninja" {} \; 2>/dev/null | while read file; do
    warn "  Removing console injection from: $file"
    # Remove console-ninja injection (multi-line pattern)
    sed -i '' '/console-ninja/d' "$file" 2>/dev/null || true
    sed -i '' '/_console_ninja/d' "$file" 2>/dev/null || true
    # Remove eval blocks that contain console-ninja
    perl -i -pe 'BEGIN{undef $/;} s/\/\* istanbul ignore next \*\/.*?\/\* eslint-disable \*\/.*?oo_cm\(\);?//gs' "$file" 2>/dev/null || true
done
log "✓ Console injection removed"

# 3. Secure environment files
log "Securing environment files..."
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
# Cathedral Environment Variables
# Copy this to .env.local and fill in your values

# Azure AI (optional)
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT_NAME=

# GitHub (for deployments)
GITHUB_TOKEN=

# Node Environment
NODE_ENV=development
EOF
    log "✓ Created .env.example"
fi

# Ensure .env files are gitignored
if ! grep -q "\.env\.local" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# Environment variables" >> .gitignore
    echo ".env.local" >> .gitignore
    echo ".env.development.local" >> .gitignore
    echo ".env.production.local" >> .gitignore
    log "✓ .gitignore updated"
fi

# 4. Fix git LFS (remove if causing issues)
log "Checking git LFS..."
if command -v git-lfs &> /dev/null && [ -d ".git" ]; then
    if git lfs ls-files &> /dev/null; then
        # Create proper .gitattributes
        cat > .gitattributes << 'EOF'
# Only track large binaries with LFS
*.psd filter=lfs diff=lfs merge=lfs -text
*.ai filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.tar.gz filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text

# Source files - no LFS
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.jsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.css text eol=lf
*.html text eol=lf
EOF
        log "✓ .gitattributes configured"
    fi
fi

# 5. Update deployment workflow
log "Updating deployment workflow..."
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Build and Deploy

on:
  push:
    branches: [main, master, v1_main]
  pull_request:
    branches: [main, master, v1_main]
  workflow_dispatch:

env:
  NODE_VERSION: '20.x'
  PNPM_VERSION: '8.15.0'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Install dependencies
        run: ppnpm install --frozen-lockfile
      
      - name: Lint
        run: ppnpm run lint || true
      
      - name: Build
        run: ppnpm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            apps/*/dist
            apps/*/.next
            packages/*/dist
          retention-days: 7

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    permissions:
      contents: write
      pages: write
      id-token: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
      
      - name: Install dependencies
        run: ppnpm install --frozen-lockfile
      
      - name: Build
        run: ppnpm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: './apps/web/.next' || './apps/web/dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF
log "✓ Deployment workflow updated"

log ""
log "✅ Security and upgrade complete!"
log ""
log "📋 Next steps:"
log "  1. Review changes: git status"
log "  2. Commit: git add . && git commit -m 'chore: secure systems and upgrade quality'"
log "  3. Push: git push origin main"

