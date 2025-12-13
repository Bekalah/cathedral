#!/bin/bash

# Cathedral Real - Railway Deployment Script
# Prepares your apps for immediate Railway deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "🏛️  CATHEDRAL REAL - RAILWAY DEPLOYMENT"
echo "========================================="
echo -e "${NC}"

echo "📦 Preparing Cathedral Real for Railway deployment..."
echo ""

# 1. Build all applications
echo "🔨 Building all applications..."
pnpm install
pnpm run build

echo "✅ All applications built successfully!"
echo ""

# 2. Create deployment packages for each app
APPS=(
    "cataract-book-scanner:apps/cataract-book-scanner"
    "hall-of-ateliers:apps/hall-of-ateliers"
    "cathedral-logo-system:apps/cathedral-logo-system"
)

echo "📋 Creating deployment packages..."

for app_config in "${APPS[@]}"; do
    IFS=':' read -r app_name path <<< "$app_config"
    
    echo "📦 Preparing $app_name..."
    
    # Create deployment directory
    DEPLOY_DIR="deploy-$app_name"
    mkdir -p "$DEPLOY_DIR"
    
    # Copy built files
    if [ -d "$path/dist" ]; then
        cp -r "$path/dist"/* "$DEPLOY_DIR/"
        
        # Create package.json for Railway
        cat > "$DEPLOY_DIR/package.json" << EOF
{
  "name": "cathedral-$app_name",
  "version": "1.0.0",
  "scripts": {
    "start": "npx serve . -p \\$PORT"
  }
}
EOF
        
        # Create start script
        cat > "$DEPLOY_DIR/start.sh" << EOF
#!/bin/bash
npx serve . -p \$PORT
EOF
        
        chmod +x "$DEPLOY_DIR/start.sh"
        
        echo "✅ $app_name package created in $DEPLOY_DIR/"
    else
        echo "⚠️  No dist folder found for $app_name, skipping..."
    fi
done

echo ""
echo "🎉 DEPLOYMENT PACKAGES READY!"
echo "=============================="
echo ""

# 3. Create deployment instructions
cat > RAILWAY_DEPLOYMENT_GUIDE.md << 'EOF'
# 🚀 Railway Deployment Guide - Cathedral Real

## 📦 Your Apps Are Ready!

All applications have been built and prepared for deployment:

- ✅ **cataract-book-scanner** → `deploy-cataract-book-scanner/`
- ✅ **hall-of-ateliers** → `deploy-hall-of-ateliers/`
- ✅ **cathedral-logo-system** → `deploy-cathedral-logo-system/`

## 🎯 Quick Deployment Steps (5 minutes)

### Step 1: Go to Railway
1. Open [railway.app](https://railway.app)
2. Sign up with GitHub (free)

### Step 2: Deploy Each App
For **each application**, repeat these steps:

#### 🏥 Deploy cataract-book-scanner
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your cathedral-real repository
4. Set **Root Directory**: `deploy-cataract-book-scanner`
5. Click **Deploy Now**!

#### 🏛️ Deploy hall-of-ateliers
1. Click "New Project" again
2. Select "Deploy from GitHub repo"
3. Choose cathedral-real repository
4. Set **Root Directory**: `deploy-hall-of-ateliers`
5. Click **Deploy Now**!

#### 🎨 Deploy cathedral-logo-system
1. Click "New Project" again
2. Select "Deploy from GitHub repo"
3. Choose cathedral-real repository
4. Set **Root Directory**: `deploy-cathedral-logo-system`
5. Click **Deploy Now**!

### Step 3: Your Apps Will Be Live!
Each app will get a unique URL like:
- `cataract-book-scanner-production.railway.app`
- `hall-of-ateliers-production.railway.app`
- `cathedral-logo-system-production.railway.app`

## 🎨 Optional: Custom Domains
1. In each Railway project, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `app.yourdomain.com`)
3. Update your DNS records as instructed
4. SSL certificate will be automatically generated!

## 🔗 Your Final URLs
After deployment, you'll have:
- **GitHub Pages**: `your-username.github.io/cathedral-real`
- **Railway App 1**: `cataract-book-scanner-production.railway.app`
- **Railway App 2**: `hall-of-ateliers-production.railway.app`
- **Railway App 3**: `cathedral-logo-system-production.railway.app`

## 💰 Costs
- **Railway**: Free tier (generous limits)
- **GitHub Pages**: Free (unlimited)
- **Custom domains**: $10/year (optional)

## ✅ Done!
Your Cathedral Real project will be live and accessible to users worldwide!

## 🆘 Need Help?
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

Enjoy your live Cathedral Real applications! 🎉
EOF

echo "📋 Deployment guide created: RAILWAY_DEPLOYMENT_GUIDE.md"
echo ""

# 4. GitHub Pages setup
echo "📚 Setting up GitHub Pages..."

cat > .github/workflows/pages.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        
    - name: Install pnpm
      run: npm install -g pnpm
      
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
EOF

echo "✅ GitHub Pages workflow created"
echo ""

# 5. Final instructions
echo ""
echo -e "${GREEN}🎉 ALL SETUP COMPLETE!"
echo "========================="
echo -e "${NC}"
echo ""
echo "🚀 Next Steps:"
echo "1. 📚 GitHub Pages: Push to main branch (auto-deploys)"
echo "2. 🎯 Railway: Go to railway.app and deploy each app"
echo "3. 🎉 Your Cathedral Real project will be live!"
echo ""
echo "📋 See RAILWAY_DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo -e "${BLUE}Your apps are ready for deployment! 🏛️${NC}"