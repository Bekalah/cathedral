# Cathedral of Circuits - Cloudflare Setup Guide

## 🌐 Cloudflare Pages Deployment

### Quick Setup
1. **Connect Repository**: Link your GitHub `cathedral` repo to Cloudflare Pages
2. **Build Settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

### Domain Configuration
- **Production**: `cathedral-of-circuits.pages.dev`
- **Custom Domain**: Configure your own domain in Cloudflare dashboard
- **Lattice Subdomains**:
  - `circuitum99.cathedral-of-circuits.pages.dev`
  - `liber-arcanae.cathedral-of-circuits.pages.dev`
  - `stone-grimoire.cathedral-of-circuits.pages.dev`

### Environment Variables
Set in Cloudflare Pages dashboard:
```
LATTICE_MODE=production
CATHEDRAL_VERSION=1.0.0
JEWEL_INDRA_ACTIVE=true
```

### Analytics & Performance
- **Cloudflare Analytics**: Automatically enabled
- **Web Vitals**: Tracked for professional portfolio
- **CDN**: Global edge caching for fast loading

## 🛠️ Dev Tools Setup

### Required Tools
```bash
# Install Node.js and npm
brew install node

# Install Cloudflare Wrangler CLI
npm install -g @cloudflare/wrangler

# Install project dependencies
npm install
```

### Local Development
```bash
# Start local development server
npm run dev

# Preview production build locally
npm run preview

# Build for production
npm run build
```

### Deployment Commands
```bash
# Deploy to staging
wrangler pages deploy --env staging

# Deploy to production  
npm run deploy
```

## 🔗 Lattice Integration

### Cross-Repository Connections
Each repo in your lattice can be deployed separately but linked through:
- **DNS routing** (subdomains)
- **CORS headers** for cross-origin requests
- **Shared analytics** tracking
- **Unified styling** through CSS variables

### Repository Deployment Status
- ✅ `cathedral` - Main hub (this repo)
- 🔄 `circuitum99` - Needs Cloudflare setup
- 🔄 `liber-arcanae` - Needs Cloudflare setup  
- 🔄 `stone-grimoire` - Needs Cloudflare setup
- 🔄 `tesseract-bridge` - Needs Cloudflare setup
- 🔄 `cosmogenesis-learning-engine` - Needs Cloudflare setup
- 🔄 `magical-mystery-house` - Needs Cloudflare setup

## 📊 Professional Features

### SEO Optimization
- Meta tags configured for professional portfolio
- Open Graph tags for social sharing
- JSON-LD structured data for search engines

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Professional analytics dashboard

### Security
- HTTPS by default
- DDoS protection
- Bot management for professional sites

---

*This setup ensures your Cathedral of Circuits is professionally deployed while maintaining the magical lattice connections between all repositories.*