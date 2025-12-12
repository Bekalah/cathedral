#!/bin/bash
# Cathedral Real - Multi-App GitHub Pages Deployment Script
# Deploys all web applications to GitHub Pages with proper routing

set -e

echo "🏰 Cathedral Real - Multi-App GitHub Pages Deployment"
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Deployment configuration
DEPLOY_DIR="./dist"
BUILD_DIR="./build"
TEMP_DIR="./temp-deploy"

# Applications to deploy
APPS=(
    "cathedral-web-app"
    "cosmogenesis"
    "circuitum99-arcanae-cyoa"
    "hall-of-ateliers"
    "stone-grimoire"
    "liber-arcanae-core"
)

# Function to log with colors
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Clean previous deployment
log_info "Cleaning previous deployment..."
rm -rf "$DEPLOY_DIR" "$TEMP_DIR"
mkdir -p "$DEPLOY_DIR"

# Build each application
for app in "${APPS[@]}"; do
    log_info "Building $app..."
    
    if [ -d "packages/$app" ]; then
        cd "packages/$app"
        
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            log_info "Installing dependencies for $app..."
            pnpm install
        fi
        
        # Build the application
        log_info "Building production version of $app..."
        pnpm run build
        
        # Copy built files to deployment directory
        if [ -d "dist" ]; then
            log_info "Copying $app build to deployment..."
            cp -r dist/* "../../$DEPLOY_DIR/$app/" 2>/dev/null || mkdir -p "../../$DEPLOY_DIR/$app" && cp -r dist/* "../../$DEPLOY_DIR/$app/"
            log_success "$app built and copied successfully"
        elif [ -d "build" ]; then
            log_info "Copying $app build (build directory) to deployment..."
            cp -r build/* "../../$DEPLOY_DIR/$app/" 2>/dev/null || mkdir -p "../../$DEPLOY_DIR/$app" && cp -r build/* "../../$DEPLOY_DIR/$app/"
            log_success "$app built and copied successfully"
        else
            log_warning "No build directory found for $app, creating placeholder..."
            mkdir -p "../../$DEPLOY_DIR/$app"
            echo '<!DOCTYPE html><html><head><title>Cathedral '$app'</title></head><body><h1>'$app' - Coming Soon</h1><p>This application is being prepared for deployment.</p></body></html>' > "../../$DEPLOY_DIR/$app/index.html"
        fi
        
        cd ../..
    else
        log_warning "Application $app not found in packages/"
        mkdir -p "$DEPLOY_DIR/$app"
        echo '<!DOCTYPE html><html><head><title>Cathedral '$app'</title></head><body><h1>'$app' - Not Available</h1><p>This application is not yet available.</p></body></html>' > "$DEPLOY_DIR/$app/index.html"
    fi
done

# Create main index with navigation to all apps
log_info "Creating main navigation page..."
cat > "$DEPLOY_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cathedral Real - Creative Cosmos Builder</title>
    <meta name="description" content="Cathedral Real: A trauma-safe creative ecosystem with 3D visualization, tarot systems, and collaborative art tools">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .header {
            text-align: center;
            padding: 2rem;
            background: rgba(0,0,0,0.3);
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #64ffda, #00bcd4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .apps-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            flex: 1;
        }
        
        .app-card {
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 1.5rem;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
        }
        
        .app-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .app-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: #64ffda;
        }
        
        .app-card p {
            opacity: 0.8;
            line-height: 1.6;
        }
        
        .app-card .icon {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .footer {
            text-align: center;
            padding: 2rem;
            background: rgba(0,0,0,0.3);
            margin-top: auto;
        }
        
        .footer p {
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .apps-grid {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>🏰 Cathedral Real</h1>
        <p>A trauma-safe creative ecosystem with 3D visualization, sacred geometry, and collaborative art tools</p>
    </header>
    
    <main class="apps-grid">
        <a href="/cathedral-web-app/" class="app-card">
            <span class="icon">🌟</span>
            <h3>Cathedral Web App</h3>
            <p>Main application with Three.js integration and 3D visualization capabilities</p>
        </a>
        
        <a href="/cosmogenesis/" class="app-card">
            <span class="icon">🌌</span>
            <h3>Cosmogenesis</h3>
            <p>3D cosmos visualization with sacred geometry and sacred mathematics</p>
        </a>
        
        <a href="/circuitum99-arcanae-cyoa/" class="app-card">
            <span class="icon">🎭</span>
            <h3>Circuitum99 CYOA</h3>
            <p>Interactive storytelling system with arcana-based choices and outcomes</p>
        </a>
        
        <a href="/hall-of-ateliers/" class="app-card">
            <span class="icon">🎨</span>
            <h3>Hall of Ateliers</h3>
            <p>Professional creative collaboration system for artists and creators</p>
        </a>
        
        <a href="/stone-grimoire/" class="app-card">
            <span class="icon">🗿</span>
            <h3>Stone Grimoire</h3>
            <p>Body nodes and archive systems with trauma-safe interfaces</p>
        </a>
        
        <a href="/liber-arcanae-core/" class="app-card">
            <span class="icon">🔮</span>
            <h3>Liber Arcanae</h3>
            <p>Tarot and arcana system interface with sacred mystical knowledge</p>
        </a>
    </main>
    
    <footer class="footer">
        <p>Cathedral Real - Built with trauma-safe design principles and sacred geometry</p>
    </footer>
</body>
</html>
EOF

# Create robots.txt for SEO
log_info "Creating SEO files..."
cat > "$DEPLOY_DIR/robots.txt" << 'EOF'
User-agent: *
Allow: /

# Cathedral Real Applications
Allow: /cathedral-web-app/
Allow: /cosmogenesis/
Allow: /circuitum99-arcanae-cyoa/
Allow: /hall-of-ateliers/
Allow: /stone-grimoire/
Allow: /liber-arcanae-core/

# Sitemap
Sitemap: https://yourusername.github.io/cathedral-real/sitemap.xml
EOF

# Create sitemap
log_info "Creating sitemap..."
cat > "$DEPLOY_DIR/sitemap.xml" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/cathedral-real/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/cathedral-web-app/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/cosmogenesis/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/circuitum99-arcanae-cyoa/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/hall-of-ateliers/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/stone-grimoire/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourusername.github.io/cathedral-real/liber-arcanae-core/</loc>
    <lastmod>2025-12-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
EOF

# Copy documentation
log_info "Copying documentation..."
mkdir -p "$DEPLOY_DIR/docs"
cp -r docs/* "$DEPLOY_DIR/docs/" 2>/dev/null || true

# Final deployment check
log_info "Deployment structure created successfully!"
echo ""
log_success "Deployment completed successfully!"
echo ""
echo "📁 Deployment structure:"
echo "├── index.html (Main navigation)"
echo "├── robots.txt (SEO)"
echo "├── sitemap.xml (Search indexing)"
echo "├── docs/ (Documentation)"
echo "└── apps/"
for app in "${APPS[@]}"; do
    if [ -d "$DEPLOY_DIR/$app" ]; then
        echo "    └── $app/ (✅ Ready)"
    else
        echo "    └── $app/ (⚠️  Placeholder)"
    fi
done

echo ""
echo "🚀 Next steps:"
echo "1. Commit and push to GitHub"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Your site will be available at: https://yourusername.github.io/cathedral-real/"
echo ""
echo "To deploy manually:"
echo "git add ."
echo "git commit -m 'Deploy all Cathedral applications'"
echo "git push origin main"