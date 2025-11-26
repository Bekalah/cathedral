#!/bin/bash
# 🏰 Cathedral - Setup All FREE Deployment Platforms
# One-time setup script for all platforms

set -e

echo "🏰 Cathedral FREE Platform Setup"
echo "================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Run this script from the repository root${NC}"
    exit 1
fi

echo -e "${CYAN}This script will guide you through setting up FREE deployment platforms.${NC}"
echo ""

# ============================================
# 1. GitHub Pages (FREE)
# ============================================
echo -e "${GREEN}📄 GITHUB PAGES SETUP${NC}"
echo "====================="
echo ""
echo "GitHub Pages is FREE for public repositories."
echo ""
echo "Steps:"
echo "1. Go to: https://github.com/Bekalah/cathedral/settings/pages"
echo "2. Under 'Build and deployment':"
echo "   - Source: GitHub Actions"
echo "3. Push to main branch to trigger deployment"
echo ""
echo -e "URL: ${CYAN}https://bekalah.github.io/cathedral${NC}"
echo ""
echo "Press Enter to continue..."
read

# ============================================
# 2. Vercel (FREE)
# ============================================
echo -e "${YELLOW}▲ VERCEL SETUP${NC}"
echo "==============="
echo ""
echo "Vercel FREE tier: 100GB bandwidth/month"
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✓ Vercel CLI installed${NC}"
else
    echo "Installing Vercel CLI..."
    pnpm add -g vercel
fi

echo ""
echo "Steps:"
echo "1. Run: vercel login"
echo "2. Run: vercel link"
echo "3. Run: vercel --prod"
echo ""
echo "Or connect via dashboard:"
echo "1. Go to: https://vercel.com/new"
echo "2. Import GitHub repository: Bekalah/cathedral"
echo "3. Configure:"
echo "   - Root Directory: apps/web"
echo "   - Framework Preset: Next.js"
echo "4. Deploy"
echo ""
echo "Press Enter to continue..."
read

# ============================================
# 3. Cloudflare Pages (FREE)
# ============================================
echo -e "${BLUE}☁️ CLOUDFLARE PAGES SETUP${NC}"
echo "=========================="
echo ""
echo "Cloudflare Pages FREE tier: UNLIMITED bandwidth!"
echo ""

# Check if Wrangler CLI is installed
if command -v wrangler &> /dev/null; then
    echo -e "${GREEN}✓ Wrangler CLI installed${NC}"
else
    echo "Installing Wrangler CLI..."
    pnpm add -g wrangler
fi

echo ""
echo "Steps:"
echo "1. Run: wrangler login"
echo "2. Go to: https://dash.cloudflare.com/?to=/:account/pages"
echo "3. Create a project:"
echo "   - Connect to Git: Bekalah/cathedral"
echo "   - Build command: pnpm install && pnpm run build && cd apps/web && pnpm run export"
echo "   - Build output: apps/web/out"
echo "4. Deploy"
echo ""
echo "Or via CLI:"
echo "wrangler pages deploy apps/web/out --project-name=cathedral"
echo ""
echo "Press Enter to continue..."
read

# ============================================
# 4. Render (FREE)
# ============================================
echo -e "${GREEN}🎨 RENDER SETUP${NC}"
echo "==============="
echo ""
echo "Render FREE tier: 750 hours/month"
echo ""
echo "Steps:"
echo "1. Go to: https://dashboard.render.com/select-repo?type=web"
echo "2. Connect GitHub repository: Bekalah/cathedral"
echo "3. Render will auto-detect render.yaml"
echo "4. Click 'Apply' to create services"
echo ""
echo "Services that will be created:"
echo "  - cathedral-web (Web Service)"
echo "  - cathedral-synth-lab (Static Site)"
echo "  - cathedral-tarot-arena (Static Site)"
echo ""
echo "Press Enter to continue..."
read

# ============================================
# 5. Fly.io (FREE)
# ============================================
echo -e "${YELLOW}🪁 FLY.IO SETUP${NC}"
echo "==============="
echo ""
echo "Fly.io FREE tier: 3 shared VMs"
echo ""

# Check if Fly CLI is installed
if command -v flyctl &> /dev/null; then
    echo -e "${GREEN}✓ Fly CLI installed${NC}"
else
    echo "To install Fly CLI, run:"
    echo "curl -L https://fly.io/install.sh | sh"
fi

echo ""
echo "Steps:"
echo "1. Run: flyctl auth signup (or flyctl auth login)"
echo "2. Run: flyctl launch --no-deploy"
echo "3. Run: flyctl deploy"
echo ""
echo "Press Enter to continue..."
read

# ============================================
# Summary
# ============================================
echo ""
echo "============================================"
echo -e "${GREEN}✅ SETUP COMPLETE${NC}"
echo "============================================"
echo ""
echo "FREE Platforms Ready:"
echo ""
echo "📄 GitHub Pages"
echo "   URL: https://bekalah.github.io/cathedral"
echo "   Cost: FREE (unlimited for public repos)"
echo ""
echo "▲ Vercel"
echo "   URL: https://cathedral.vercel.app"
echo "   Cost: FREE (100GB bandwidth/month)"
echo ""
echo "☁️ Cloudflare Pages"
echo "   URL: https://cathedral.pages.dev"
echo "   Cost: FREE (UNLIMITED bandwidth)"
echo ""
echo "🎨 Render"
echo "   URL: https://cathedral-web.onrender.com"
echo "   Cost: FREE (750 hours/month)"
echo ""
echo "🪁 Fly.io"
echo "   URL: https://cathedral.fly.dev"
echo "   Cost: FREE (3 shared VMs)"
echo ""
echo "============================================"
echo "TOTAL MONTHLY COST: \$0.00"
echo "============================================"
echo ""
echo "To deploy to all platforms:"
echo "  ./scripts/deploy-all-free.sh"
echo ""

