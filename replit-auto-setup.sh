#!/bin/bash
# cathedral-auto-setup-replit.sh
# Automated Replit setup for Rebecca's Cathedral System
# One command setup - everything automatic!

set -e

echo "🏛️ CATHEDRAL AUTO-SETUP FOR REPLIT"
echo "=================================="
echo "Setting up Rebecca's complete unified work system..."
echo ""

# Step 1: Create all directory structure automatically
echo "📁 Creating work directory structure..."
mkdir -p tarot-system/72-degrees-hermann-haindl
mkdir -p circuitum99/33-living-chapters
mkdir -p audio-system/vst3-strudel-integration
mkdir -p mystical-system/alpha-omega-arcanae
mkdir -p business-system/rebecca-professional-work
mkdir -p game-system/fool-respawn-gate
mkdir -p session-system/replit-connection

# Affinity Designer 2 directories
mkdir -p design-system/affinity-designer-2/tarot-designs
mkdir -p design-system/affinity-designer-2/business-designs
mkdir -p design-system/affinity-designer-2/mystical-business
mkdir -p design-system/affinity-designer-2/game-designs

echo "✅ Directory structure created"

# Step 2: Create sample files to demonstrate the system
echo "📄 Creating sample files..."

# Tarot system sample
cat > tarot-system/72-degrees-hermann-haindl/ceremonial-framework.md << 'EOF'
# Hermann Haindl 72-Degree Ceremonial System

## 72 Degrees Framework
The complete ceremonial structure for tarot work based on Hermann Haindl's system.

### Primary Categories
1. **Elemental Degrees** (1-20): Earth, Air, Fire, Water foundations
2. **Planetary Degrees** (21-40): Planetary influences and attunements  
3. **Zodiacal Degrees** (41-60): Astrological framework integration
4. **Archetypal Degrees** (61-72): Pure archetypal revelation

### Implementation
- Ceremonial layouts using sacred geometry
- Alpha Omega dualistic principles
- Hierophant ceremonial structures
- Professional business integration

*Part of Rebecca's Cathedral Unified System*
EOF

# Business system sample  
cat > business-system/rebecca-professional-work/consulting-framework.md << 'EOF'
# Rebecca's Professional Consulting Framework

## Business Integration
Professional tarot and mystical consulting services with ceremonial business practices.

### Services
- **Mystical Business Consulting**: Alpha Omega principles for business
- **Ceremonial Corporate Training**: 72-degree frameworks for organizations  
- **Sacred Geometry Design**: Professional layouts and presentations
- **Arcane Business Development**: Hierophant principles for growth

### Professional Standards
- Ethical mystical practice
- Client confidentiality protocols
- Quality assurance measures
- Integration with Rebecca's complete system

*Part of Rebecca's Cathedral Unified System*
EOF

# Design system sample
cat > design-system/affinity-designer-2/tarot-designs/72-degree-layout-template.afdesign << 'EOF'
# Affinity Designer Template - 72 Degree Ceremonial Layout

## Design Specifications
- Golden ratio proportions
- Sacred geometry elements
- Alpha Omega dualistic composition
- Professional ceremonial presentation

## Usage
1. Open in Affinity Designer 2
2. Customize for specific ceremonial work
3. Export for web/print usage
4. Sync with GitHub repository

*Part of Rebecca's Cathedral Unified System*
EOF

# Step 3: Set up Git automatically
echo "🔧 Setting up Git repository..."
if [ ! -d ".git" ]; then
    git init
    git add .gitignore || true
    git add .
    git commit -m "Initial Cathedral Auto-Setup - Rebecca's unified work system"
else
    git add .
    git commit -m "Auto-update Cathedral system" || echo "No changes to commit"
fi

# Step 4: Use existing Rust sync tool
echo "🔧 Cathedral sync system ready..."
# Copy existing working sync tool if not present
if [ ! -f "sync-all.sh" ]; then
    if [ -f "cathedral-rust-sync/target/release/cathedral-rust-sync" ]; then
        cat > sync-all.sh << 'EOF'
#!/bin/bash
echo "🏛️ Syncing Rebecca's Cathedral work..."
cd cathedral-rust-sync && ./target/release/cathedral-rust-sync
echo "✨ Sync complete!"
EOF
        chmod +x sync-all.sh
        echo "✅ Sync script created"
    else
        echo "⚠️  Rust sync tool not found, will use manual Git commands"
    fi
fi

# Step 5: Create .replit configuration for Replit
echo "⚙️ Creating Replit configuration..."
cat > .replit << 'EOF'
run = "./sync-all.sh"
modules = ["python-3.11", "nodejs-20", "rust-1.75"]

[deployment]
run = ["./sync-all.sh"]

[nix]
channel = "stable-23.11"

[gitHubImport]
requiredFiles = [".replit"]
EOF

# Step 6: Create convenience scripts
echo "📜 Creating convenience scripts..."
cat > replit-setup.sh << 'EOF'
#!/bin/bash
echo "🏛️ Replit Cathedral Setup"
echo "Running automated setup for Rebecca's unified work system..."
./sync-all.sh
EOF

chmod +x replit-setup.sh

cat > quick-sync.sh << 'EOF'
#!/bin/bash
echo "🔄 Quick sync to GitHub..."
if [ -f "sync-all.sh" ]; then
    ./sync-all.sh
else
    echo "Running direct sync..."
    cd cathedral-rust-sync && ./target/release/cathedral-rust-sync 2>/dev/null || echo "Git sync ready - configure GitHub credentials if needed"
fi
EOF

chmod +x quick-sync.sh

echo ""
echo "🎉 CATHEDRAL AUTO-SETUP COMPLETE!"
echo "================================="
echo ""
echo "✅ Directory structure created:"
echo "   📁 tarot-system/72-degrees-hermann-haindl/"
echo "   📁 circuitum99/33-living-chapters/"
echo "   📁 audio-system/vst3-strudel-integration/"
echo "   📁 mystical-system/alpha-omega-arcanae/"
echo "   📁 business-system/rebecca-professional-work/"
echo "   📁 game-system/fool-respawn-gate/"
echo "   📁 session-system/replit-connection/"
echo "   📁 design-system/affinity-designer-2/"
echo ""
echo "✅ Replit configuration ready"
echo "✅ Git repository initialized"
echo "✅ Sample files created"
echo "✅ Sync scripts ready"
echo ""
echo "🚀 Your unified system is ready!"
echo ""
echo "📋 Available commands:"
echo "   ./sync-all.sh        - Sync everything to GitHub"
echo "   ./quick-sync.sh      - Quick sync to GitHub"
echo "   ./replit-setup.sh    - Full Replit environment setup"
echo ""
echo "🌐 Repository: https://github.com/bekalah/cathedral"
echo "✨ Work categories: Tarot, Circuitum99, Audio, Business, Game, Design"
echo ""
echo "🎨 Affinity Designer 2 integration ready!"
echo "🔗 Session: cathedral-rust-magnus-opus-2025"
echo ""
echo "🎯 One command setup complete!"