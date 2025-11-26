#!/bin/bash
# 🏰 Cathedral - FREE Monitoring & Analytics
# Check status of all deployed platforms

set -e

echo "🏰 Cathedral Deployment Monitor"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to check URL status
check_url() {
    local name=$1
    local url=$2
    local response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✓${NC} $name: ${GREEN}ONLINE${NC} ($url)"
    elif [ "$response" = "301" ] || [ "$response" = "302" ]; then
        echo -e "${YELLOW}↗${NC} $name: ${YELLOW}REDIRECT${NC} ($response) ($url)"
    elif [ "$response" = "000" ]; then
        echo -e "${YELLOW}?${NC} $name: ${YELLOW}NOT CONFIGURED${NC} ($url)"
    else
        echo -e "${RED}✗${NC} $name: ${RED}ERROR${NC} ($response) ($url)"
    fi
}

echo "📊 Platform Status"
echo "==================="
echo ""

# GitHub Pages
check_url "GitHub Pages" "https://bekalah.github.io/cathedral/"

# Vercel
check_url "Vercel" "https://cathedral.vercel.app/"

# Cloudflare Pages
check_url "Cloudflare" "https://cathedral.pages.dev/"

# Render
check_url "Render" "https://cathedral-web.onrender.com/"

# Fly.io
check_url "Fly.io" "https://cathedral.fly.dev/"

echo ""
echo "📈 FREE Tier Usage Estimates"
echo "============================="
echo ""
echo "GitHub Pages:"
echo "  - Bandwidth: Unlimited (public repos)"
echo "  - Builds: Unlimited"
echo ""
echo "Vercel:"
echo "  - Bandwidth: 100GB/month FREE"
echo "  - Serverless: 100GB-hours FREE"
echo "  - Builds: 6,000 minutes FREE"
echo ""
echo "Cloudflare Pages:"
echo "  - Bandwidth: UNLIMITED"
echo "  - Builds: 500/month"
echo "  - Workers: 100,000 requests/day"
echo ""
echo "Render:"
echo "  - Compute: 750 hours/month"
echo "  - Bandwidth: 100GB outbound"
echo "  - Builds: Unlimited"
echo ""
echo "Fly.io:"
echo "  - VMs: 3 shared (256MB)"
echo "  - Bandwidth: 160GB outbound"
echo "  - Storage: 3GB persistent"
echo ""

echo "🔗 Quick Links"
echo "=============="
echo ""
echo "GitHub Actions: https://github.com/Bekalah/cathedral/actions"
echo "Vercel Dashboard: https://vercel.com/dashboard"
echo "Cloudflare Dashboard: https://dash.cloudflare.com"
echo "Render Dashboard: https://dashboard.render.com"
echo "Fly.io Dashboard: https://fly.io/dashboard"
echo ""

echo "📊 GitHub Actions Status"
echo "========================"
echo ""

# Check GitHub Actions status
if command -v gh &> /dev/null; then
    echo "Recent workflow runs:"
    gh run list --limit 5 2>/dev/null || echo "Run 'gh auth login' to see workflow status"
else
    echo "Install GitHub CLI (gh) to see workflow status"
    echo "Or visit: https://github.com/Bekalah/cathedral/actions"
fi

echo ""
echo "============================================"
echo "All platforms are FREE - \$0.00/month"
echo "============================================"

