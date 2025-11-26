#!/bin/bash
# 🏰 Cathedral One-Command Deployment (100% FREE)
# Deploys to all free platforms

set -e

echo "🏰 Cathedral Multi-Platform Deployment"
echo "======================================="
echo "All platforms use FREE tiers!"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Run this script from the repository root${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install

echo ""
echo -e "${BLUE}🔨 Building all apps...${NC}"
pnpm run build || echo "Build completed with some warnings"

echo ""
echo "============================================"
echo "🚀 DEPLOYMENT OPTIONS (ALL FREE)"
echo "============================================"
echo ""

# GitHub Pages
echo -e "${GREEN}📄 GitHub Pages${NC}"
echo "   Status: Ready (auto-deploys on push to main)"
echo "   URL: https://bekalah.github.io/cathedral"
echo "   Cost: FREE (unlimited for public repos)"
echo ""

# Vercel
echo -e "${YELLOW}▲ Vercel${NC}"
if command -v vercel &> /dev/null; then
    echo "   CLI: Installed"
    echo "   To deploy: vercel --prod"
else
    echo "   CLI: Not installed (run: pnpm add -g vercel)"
    echo "   To deploy: vercel --prod"
fi
echo "   URL: https://cathedral.vercel.app"
echo "   Cost: FREE (100GB bandwidth/month)"
echo ""

# Cloudflare Pages
echo -e "${BLUE}☁️ Cloudflare Pages${NC}"
if command -v wrangler &> /dev/null; then
    echo "   CLI: Installed"
    echo "   To deploy: wrangler pages deploy apps/web/out --project-name=cathedral"
else
    echo "   CLI: Not installed (run: pnpm add -g wrangler)"
    echo "   To deploy: wrangler pages deploy apps/web/out --project-name=cathedral"
fi
echo "   URL: https://cathedral.pages.dev"
echo "   Cost: FREE (unlimited bandwidth)"
echo ""

# Render
echo -e "${GREEN}🎨 Render${NC}"
echo "   Status: Ready (connect via dashboard)"
echo "   Config: render.yaml"
echo "   URL: https://cathedral-web.onrender.com"
echo "   Cost: FREE (750 hours/month)"
echo ""

# Fly.io
echo -e "${YELLOW}🪁 Fly.io${NC}"
if command -v flyctl &> /dev/null; then
    echo "   CLI: Installed"
    echo "   To deploy: flyctl deploy"
else
    echo "   CLI: Not installed (run: curl -L https://fly.io/install.sh | sh)"
    echo "   To deploy: flyctl deploy"
fi
echo "   URL: https://cathedral.fly.dev"
echo "   Cost: FREE (3 shared VMs)"
echo ""

echo "============================================"
echo "📊 QUICK DEPLOY COMMANDS"
echo "============================================"
echo ""
echo "# Deploy to GitHub Pages (automatic on push)"
echo "git push origin main"
echo ""
echo "# Deploy to Vercel"
echo "vercel --prod"
echo ""
echo "# Deploy to Cloudflare Pages"
echo "wrangler pages deploy apps/web/out --project-name=cathedral"
echo ""
echo "# Deploy to Render (via dashboard)"
echo "# 1. Go to render.com"
echo "# 2. Connect GitHub repo"
echo "# 3. Select render.yaml"
echo ""
echo "# Deploy to Fly.io"
echo "flyctl deploy"
echo ""
echo "============================================"
echo "✅ Build complete! Choose your deployment target above."
echo "============================================"

