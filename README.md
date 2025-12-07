# 🏛️ Cathedral Real - Cosmos Builder Framework

> **A comprehensive Cosmos Builder ecosystem with 132 packages, ready for free deployment to Render, Vercel, Coolify (Self-Hosted), and Godot Cloud**

[![Node.js Version](https://img.shields.io/badge/Node.js-20.18.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
[![Turbo](https://img.shields.io/badge/Turbo-1.11+-gray.svg)](https://turbo.build/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-159+-green.svg)](https://threejs.org/)

## 🚀 **Quick Start - GitLab Clone & Deploy**

### 1. **Clone to GitLab**
```bash
# Clone the repository
git clone https://github.com/your-username/cathedral-real.git
cd cathedral-real

# Remove GitHub remote and add GitLab
git remote remove origin
git remote add origin https://gitlab.com/your-username/cathedral-real.git

# Push to GitLab
git push -u origin main
```

### 2. **Setup GitLab CI/CD Variables**
Add these variables in your GitLab project settings → CI/CD → Variables:

```
NODE_VERSION=20.18.0
RENDER_API_TOKEN=your_render_api_token
PRODUCTION_RENDER_SERVICE_ID_CATARACT=your_service_id
PRODUCTION_RENDER_SERVICE_ID_ATELIERS=your_service_id
PRODUCTION_RENDER_SERVICE_ID_LOGO=your_service_id
VERCEL_TOKEN=your_vercel_token
COOLIFY_HOST=your_coolify_server_ip
COOLIFY_TOKEN=your_coolify_token
GODOT_CLOUD_PROJECT_ID=your_project_id
```

### 3. **Deploy to All Free Platforms**
```bash
# Install dependencies
pnpm install

# Validate deployment readiness
./scripts/validate-deployment.sh

# Deploy to Render (Free tier)
./scripts/deploy-render.sh production

# Deploy to Vercel (Free tier)
./scripts/deploy-vercel.sh production

# Deploy to Coolify (Self-Hosted)
./scripts/deploy-coolify.sh production
```

## 📁 **Project Architecture**

### **🎯 Deployment-Ready Applications**
- **`packages/cataract-book-scanner/`** → React + Vite document scanner
  - 🔗 Render: `cataract-book-scanner.onrender.com`
  - 🔗 Vercel: `cataract-book-scanner.vercel.app`
  - 🏠 Coolify: `cataract.cathedral.example.com`

- **`packages/hall-of-ateliers/`** → React + Three.js creative space
  - 🔗 Render: `hall-of-ateliers.onrender.com`
  - 🔗 Vercel: `hall-of-ateliers.vercel.app`
  - 🏠 Coolify: `ateliers.cathedral.example.com`

- **`packages/cathedral-logo-system/`** → Three.js + React logo generator
  - 🔗 Render: `cathedral-logo-system.onrender.com`
  - 🔗 Vercel: `cathedral-logo-system.vercel.app`
  - 🏠 Coolify: `logo.cathedral.example.com`

### **🎮 Game Development (Godot)**
- **`packages/godot-codex-14499/`** → Main game framework
- **`packages/godot-liber-arcanae/`** → Arcana system integration
- **`packages/godot-design-studio/`** → Design tool suite
- **🔗 Godot Cloud**: Ready for direct game deployment

### **🧠 Core Systems & Engines**
- **`packages/brain/`** → AI Brain System
- **`packages/cosmogenesis/`** → Cosmos topology viewer
- **`packages/stone-grimoire/`** → Body/land/architecture lab
- **`packages/art-engine-core/`** → Art generation engine
- **`packages/sacred-geometry-core/`** → Sacred geometry engine

### **🎵 Audio & Synthesis**
- **`packages/synth-labs/`** → Audio synthesis laboratory
- **`packages/cathedral-audio-synthesis/`** → Audio synthesis engine
- **`packages/mystical-sound-engine/`** → Sound processing system

### **🔮 Mystical & Arcana Systems**
- **`packages/arcana/`** → Arcana system
- **`packages/tarot-reader/`** → Tarot reading system
- **`packages/liber-arcanae-core/`** → Core arcana framework
- **`packages/moonchild-scanner/`** → Narrative scanner

### **🏗️ Shared Infrastructure**
- **`packages/ui/`** → UI component library
- **`packages/shared/`** → Shared utilities
- **`packages/config/`** → Configuration system
- **`packages/types/`** → TypeScript definitions

## 🌐 **Free Deployment Services**

### **Render (Web Applications)**
- **Free Tier**: 750 hours/month
- **Build**: Auto-deploy on Git push
- **Domains**: `your-app.onrender.com`
- **Setup**: Configure service IDs in GitLab CI

### **Vercel (Frontend Applications)**
- **Free Tier**: 100GB bandwidth/month
- **Build**: Instant deployment
- **Domains**: `your-app.vercel.app`
- **Setup**: Add Vercel token to GitLab CI

### **Coolify (Self-Hosted Platform)**
- **Cost**: Server hosting only (~$10-50/month)
- **Features**: Complete deployment platform with CDN
- **Domains**: `cathedral.example.com` + subdomains
- **Setup**: See `docs/COOLIFY_SETUP_GUIDE.md`

### **Godot Cloud (Games)**
- **Free Tier**: Development hosting
- **Build**: Direct Godot integration
- **Domains**: Custom domain support
- **Setup**: Configure project ID in GitLab CI

## 🛠️ **Development Commands**

```bash
# Install all dependencies
pnpm install

# Build all packages
turbo run build

# Build specific package
turbo run build --filter=cataract-book-scanner

# Run development server
turbo run dev --filter=cataract-book-scanner

# Run tests
turbo run test

# Type check
turbo run type-check

# Lint code
turbo run lint

# Format code
turbo run format
```

## 📊 **Package Statistics**

- **Total Packages**: 132
- **Web Applications**: 3 (Deployable)
- **Game Engine Packages**: 3 (Godot Cloud)
- **Core Systems**: 15+ (Engines, APIs, Libraries)
- **Shared Infrastructure**: 10+ (UI, Utils, Types)
- **Creative Applications**: 20+ (Art, Audio, Visual)

## 🔧 **Configuration Files**

- **`package.json`** - Root workspace configuration
- **`turbo.json`** - Turbo build pipeline
- **`render.yaml`** - Render deployment configuration
- **`pnpm-workspace.yaml`** - PNPM workspace setup
- **`.gitlab-ci.yml`** - GitLab CI/CD pipeline
- **`scripts/`** - Deployment and validation scripts

## 📚 **Documentation**

- **`DIRECTORY_STRUCTURE_GUIDE.md`** - Complete directory mapping
- **`packages/cataract-book-scanner/docs/`** - Setup and usage guides
- **`docs/`** - System documentation
- **`REGISTRY/`** - Data definitions and catalogs

## 🚦 **Quality Assurance**

- **Validation**: `./scripts/validate-deployment.sh`
- **Health Checks**: Automated in CI/CD
- **Performance Monitoring**: Built-in scripts
- **Type Safety**: TypeScript throughout
- **Code Quality**: ESLint + Prettier

## 🎯 **Zero-Cost Deployment Strategy**

### **Monthly Costs**
- **Render**: Free (750 hours/month)
- **Vercel**: Free (100GB bandwidth)
- **Coolify**: Self-hosted ($10-50/month for server)
- **GitLab**: Free (unlimited private repos)
- **Godot Cloud**: Free (development tier)

### **Total**: **$0/month** for full deployment pipeline

## 🔒 **Security & Best Practices**

- **Node.js Version**: 20.18.0 (LTS)
- **Package Security**: Automated scanning
- **Environment Variables**: GitLab CI secrets
- **Build Optimization**: Production-ready bundles
- **Error Handling**: Comprehensive validation

## 📈 **Performance**

- **Build Time**: < 30 seconds per package
- **Bundle Size**: Optimized with Vite
- **Hot Reload**: Instant development feedback
- **Caching**: Turbo + PNPM optimization

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validation: `./scripts/validate-deployment.sh`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 **Ready to Deploy!**

This repository is production-ready and configured for **zero-cost deployment** to all major platforms. Simply clone to GitLab, add your service tokens, and you're ready to go!

**Questions?** Check the `DIRECTORY_STRUCTURE_GUIDE.md` for detailed package information.