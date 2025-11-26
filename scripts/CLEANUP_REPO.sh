#!/bin/bash
# Cathedral Repository Cleanup Script
# Organizes the chaos into proper structure

set -e

echo "🏰 CATHEDRAL REPOSITORY CLEANUP"
echo "================================"
echo ""

# Create organized directory structure
echo "📁 Creating organized directories..."
mkdir -p archive/{old-html,old-scripts,patches,temp-files}
mkdir -p docs/{guides,specs,agent-docs,development}
mkdir -p tools/{automation,deployment,testing}
mkdir -p assets/{audio,visual,data}

echo "✅ Directories created"
echo ""

# Move loose HTML files
echo "🌐 Organizing HTML files..."
find . -maxdepth 1 -type f -name "*.html" -exec mv {} archive/old-html/ \; 2>/dev/null || true

# Move loose CSS files
echo "🎨 Organizing CSS files..."
find . -maxdepth 1 -type f -name "*.css" -exec mv {} archive/old-html/ \; 2>/dev/null || true

# Move loose JS files (except config files)
echo "⚡ Organizing standalone JS files..."
find . -maxdepth 1 -type f -name "*.js" ! -name "*.config.js" -exec mv {} archive/old-html/ \; 2>/dev/null || true

# Move patch files
echo "🔧 Organizing patch files..."
find . -maxdepth 1 -type f -name "*.patch" -exec mv {} archive/patches/ \; 2>/dev/null || true

# Move temp files
echo "🗑️  Organizing temp files..."
find . -maxdepth 1 -type f -name "_tmp_*" -exec mv {} archive/temp-files/ \; 2>/dev/null || true
find . -maxdepth 1 -type f -name "*.log" ! -name "agent_loop.log" -exec mv {} archive/temp-files/ \; 2>/dev/null || true

# Organize markdown docs by category
echo "📝 Organizing documentation..."

# Agent-related docs
for file in AGENT_*.md DUAL_AGENT_*.md FULL_CONTEXT_FOR_AGENTS.md MASTER_PROJECT_CONTEXT.md; do
    [ -f "$file" ] && mv "$file" docs/agent-docs/ 2>/dev/null || true
done

# Development guides
for file in ACCESSIBILITY_*.md GODOT_*.md DEPLOYMENT_*.md; do
    [ -f "$file" ] && mv "$file" docs/development/ 2>/dev/null || true
done

# Specs and architecture
for file in CATHEDRAL_*.md *_ARCHITECTURE.md *_SPEC.md *_DESIGN.md; do
    [ -f "$file" ] && mv "$file" docs/specs/ 2>/dev/null || true
done

# Move automation scripts to tools
echo "🤖 Organizing automation scripts..."
for script in add_*.sh AUTOMATE_*.sh RUN_*.sh GENERATE_*.sh QUICK_START*.sh *_automation*.sh; do
    [ -f "$script" ] && mv "$script" tools/automation/ 2>/dev/null || true
done

# Move agent scripts specifically
mv agent_status.sh tools/automation/ 2>/dev/null || true
mv update_agent_context*.py tools/automation/ 2>/dev/null || true

# Move test/deployment scripts
for script in deploy*.sh test*.sh build*.sh; do
    [ -f "$script" ] && mv "$script" tools/deployment/ 2>/dev/null || true
done

# Create a manifest of what was moved
echo ""
echo "📋 Creating cleanup manifest..."
cat > CLEANUP_MANIFEST.md << 'EOF'
# Repository Cleanup Manifest

Generated: $(date)

## Directory Structure Created

```
cathedral-real/
├── archive/
│   ├── old-html/        # Legacy HTML/CSS/JS demos
│   ├── old-scripts/     # Obsolete scripts
│   ├── patches/         # Git patches
│   └── temp-files/      # Temporary/log files
├── docs/
│   ├── agent-docs/      # Agent context and coordination
│   ├── development/     # Development guides
│   ├── guides/          # User guides
│   └── specs/           # Architecture and specifications
├── tools/
│   ├── automation/      # Automation scripts
│   ├── deployment/      # Deployment tools
│   └── testing/         # Test utilities
└── assets/
    ├── audio/           # Audio resources
    ├── visual/          # Visual assets
    └── data/            # Data files
```

## What Was Moved

### Archive
- Legacy HTML/CSS/JS files (arcana-alumni-gallery.html, etc.)
- Patch files (*.patch)
- Temp files (_tmp_*, old logs)

### Documentation
- Agent documentation → docs/agent-docs/
- Development guides → docs/development/
- Specifications → docs/specs/

### Tools
- Automation scripts → tools/automation/
- Deployment scripts → tools/deployment/
- Agent management tools → tools/automation/

## Still at Root Level (Important Files)

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml
- .env, .env.example
- .gitignore
- README.md
- LICENSE
- NOTICE

## Next Steps

1. Review archived files - delete if truly obsolete
2. Update documentation to reflect new structure
3. Update import paths if needed
4. Commit organized structure
5. Update .gitignore to prevent future clutter
EOF

echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  - HTML/CSS/JS files → archive/old-html/"
echo "  - Documentation → docs/"
echo "  - Scripts → tools/"
echo "  - Temp files → archive/temp-files/"
echo ""
echo "📋 See CLEANUP_MANIFEST.md for details"
echo ""
echo "⚠️  Review the archive/ directory and delete what you don't need"
echo "✅ Essential root files (package.json, etc.) remain in place"
