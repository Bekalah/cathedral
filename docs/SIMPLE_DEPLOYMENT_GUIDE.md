# 🏛️ Simple Self-Hosted Deployment - Cathedral Real

## 🎯 **Easiest Deployment Options**

Instead of complex self-hosted solutions, here are **super simple** alternatives that require **zero server management**:

### **Option 1: Railway (Easiest)**
- **Setup Time**: 5 minutes
- **Cost**: Free tier available
- **Management**: Zero server management needed
- **Setup**: Just connect GitHub repo

### **Option 2: Render (User-Friendly)**
- **Setup Time**: 10 minutes
- **Cost**: Free tier (750 hours/month)
- **Management**: Simple web dashboard
- **Setup**: Point and click deployment

## 🚀 **Railway Deployment (Recommended)**

### **Step 1: Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"

### **Step 2: Deploy Each App**
1. **cataract-book-scanner**:
   - Create new project
   - Connect cathedral-real repo
   - Select `packages/cataract-book-scanner` folder
   - Build command: `pnpm install && pnpm run build`
   - Deploy!

2. **hall-of-ateliers**:
   - Repeat same process
   - Select `packages/hall-of-ateliers` folder

3. **cathedral-logo-system**:
   - Repeat same process
   - Select `packages/cathedral-logo-system` folder

### **Step 3: Custom Domains**
1. In each project settings
2. Add custom domain
3. Point your DNS to Railway
4. SSL automatically handled!

**Total Time**: 15 minutes
**Cost**: Free (with paid upgrade for custom domains)

## 🎨 **Render Deployment (Alternative)**

### **Step 1: Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"

### **Step 2: Deploy Each Service**
1. **cataract-book-scanner**:
   - Connect cathedral-real repository
   - Root directory: `packages/cataract-book-scanner`
   - Build command: `pnpm install && pnpm run build`
   - Start command: `pnpm run preview`

2. **hall-of-ateliers**:
   - Same process, different root directory

3. **cathedral-logo-system**:
   - Same process, different root directory

### **Step 3: Custom Domains**
1. In service settings
2. Add custom domain
3. Update DNS records
4. Automatic SSL!

**Total Time**: 20 minutes
**Cost**: Free (750 hours/month)

## 📋 **Automated Setup Scripts**

### **Railway Deployment Script**
```bash
#!/bin/bash
# Simple Railway deployment script

echo "🏛️ Cathedral Real - Railway Deployment"
echo "========================================"

# Deploy each application
APPS=(
    "cataract-book-scanner:packages/cataract-book-scanner"
    "hall-of-ateliers:packages/hall-of-ateliers"
    "cathedral-logo-system:packages/cathedral-logo-system"
)

for app_config in "${APPS[@]}"; do
    IFS=':' read -r app_name path <<< "$app_config"
    echo "📦 Preparing $app_name..."
    
    cd "$path"
    pnpm install
    pnpm run build
    cd ../..
    
    echo "✅ $app_name ready for Railway deployment!"
done

echo "🎉 All apps ready! Deploy via Railway dashboard:"
echo "1. Go to railway.app"
echo "2. Create new project for each app"
echo "3. Connect this repository"
echo "4. Select the app folder"
echo "5. Deploy automatically!"
```

### **Render Deployment Script**
```bash
#!/bin/bash
# Simple Render deployment script

echo "🏛️ Cathedral Real - Render Deployment"
echo "======================================"

# Update render.yaml for each app
cat > render-app1.yaml << EOF
services:
  - type: web
    name: cataract-book-scanner
    env: node
    buildCommand: cd packages/cataract-book-scanner && pnpm install && pnpm run build
    startCommand: cd packages/cataract-book-scanner && pnpm run preview
    envVars:
      - key: NODE_ENV
        value: production
EOF

cat > render-app2.yaml << EOF
services:
  - type: web
    name: hall-of-ateliers
    env: node
    buildCommand: cd packages/hall-of-ateliers && pnpm install && pnpm run build
    startCommand: cd packages/hall-of-ateliers && pnpm run preview
    envVars:
      - key: NODE_ENV
        value: production
EOF

cat > render-app3.yaml << EOF
services:
  - type: web
    name: cathedral-logo-system
    env: node
    buildCommand: cd packages/cathedral-logo-system && pnpm install && pnpm run build
    startCommand: cd packages/cathedral-logo-system && pnpm run preview
    envVars:
      - key: NODE_ENV
        value: production
EOF

echo "✅ Render configuration files created!"
echo "📁 Upload these to each Render service:"
echo "   - render-app1.yaml → cataract-book-scanner"
echo "   - render-app2.yaml → hall-of-ateliers"
echo "   - render-app3.yaml → cathedral-logo-system"
```

## 🔧 **Quick Setup Commands**

### **For Railway**
```bash
# Run the Railway deployment script
chmod +x scripts/railway-deploy.sh
./scripts/railway-deploy.sh

# Then manually:
# 1. Go to railway.app
# 2. Create 3 new projects
# 3. Connect GitHub repo for each
# 4. Select app folder
# 5. Deploy!
```

### **For Render**
```bash
# Run the Render deployment script
chmod +x scripts/render-deploy.sh
./scripts/render-deploy.sh

# Then manually:
# 1. Go to render.com
# 2. Create 3 web services
# 3. Connect GitHub repo for each
# 4. Use created configuration files
# 5. Deploy!
```

## 💰 **Cost Comparison**

| Platform | Free Tier | Custom Domain | SSL | Setup Time |
|----------|-----------|---------------|-----|------------|
| **Railway** | Generous | $5/month | ✅ Automatic | 5 min |
| **Render** | 750 hours | $7/month | ✅ Automatic | 10 min |
| **GitHub Pages** | Unlimited | Free | ✅ Automatic | 2 min |
| **Vercel** | 100GB | Free | ✅ Automatic | 5 min |
| **Coolify** | Server costs | Free | Manual setup | 2+ hours |

## 🎯 **Recommended Simple Architecture**

### **Primary: GitHub Pages (Static Sites)**
- **For**: Documentation, landing pages, static React apps
- **Cost**: $0 (unlimited)
- **Setup**: Just push to `gh-pages` branch

### **Secondary: Railway (Full Apps)**
- **For**: Interactive applications, APIs, full-stack apps
- **Cost**: $0-5/month (depending on usage)
- **Setup**: Connect GitHub repo

### **Backup: Render (Enterprise)**
- **For**: Complex deployments, databases
- **Cost**: $0-7/month (depending on usage)
- **Setup**: Web dashboard configuration

## 🔗 **Domain Strategy**

Instead of complex DNS management, use platform-provided domains:

- **GitHub Pages**: `your-username.github.io/cathedral-real`
- **Railway**: `app-name.railway.app`
- **Render**: `app-name.onrender.com`
- **Custom Domain**: Point to any platform (optional)

## 🎉 **Zero-Complexity Benefits**

✅ **No server management**
✅ **No SSL certificates to worry about**
✅ **No Docker containers to maintain**
✅ **No database setup required**
✅ **Automatic deployments from Git**
✅ **Built-in monitoring and logs**
✅ **Free tier for most use cases**

## 📚 **Next Steps**

1. **Choose your platform**: Railway (easiest) or Render (most features)
2. **Run setup scripts**: `scripts/railway-deploy.sh` or `scripts/render-deploy.sh`
3. **Deploy via web dashboard**: Simple point-and-click
4. **Add custom domains**: Optional, easy configuration
5. **Enjoy**: Your apps are live with zero maintenance!

This approach gives you **all the benefits of self-hosting** without any of the complexity!