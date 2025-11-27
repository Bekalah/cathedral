#!/bin/bash
# Enterprise Package Upgrade Script
# Upgrades all packages to enterprise standards

set -e

echo "🏛️ Cathedral Enterprise Package Upgrade"
echo "========================================"

# Function to upgrade a package.json
upgrade_package() {
    local pkg_file="$1"
    local pkg_dir=$(dirname "$pkg_file")
    local pkg_name=$(basename "$pkg_dir")
    
    echo "📦 Upgrading: $pkg_name"
    
    # Check if package.json exists and is valid JSON
    if [ ! -f "$pkg_file" ]; then
        echo "  ⚠️  Package.json not found, skipping"
        return
    fi
    
    # Use node to safely update package.json
    node <<EOF
const fs = require('fs');
const path = require('path');

const pkgFile = '$pkg_file';
const pkgDir = '$pkg_dir';
const pkgName = '$pkg_name';

try {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
    
    // Update license
    if (!pkg.license || pkg.license !== 'CC0-1.0') {
        pkg.license = 'CC0-1.0';
    }
    
    // Add repository if missing
    if (!pkg.repository) {
        pkg.repository = {
            type: 'git',
            url: 'https://github.com/Bekalah/cathedral.git',
            directory: pkgDir.replace(process.cwd() + '/', '')
        };
    }
    
    // Add homepage if missing
    if (!pkg.homepage) {
        const relativePath = pkgDir.replace(process.cwd() + '/', '');
        pkg.homepage = \`https://bekalah.github.io/cathedral/\${relativePath}\`;
    }
    
    // Add author if missing
    if (!pkg.author) {
        pkg.author = 'Rebecca Respawn';
    }
    
    // Ensure version exists
    if (!pkg.version) {
        pkg.version = '1.0.0';
    }
    
    // Write back
    fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n');
    console.log('  ✅ Updated:', pkgName);
} catch (error) {
    console.error('  ❌ Error updating', pkgName, ':', error.message);
}
EOF
}

# Find all package.json files
echo "🔍 Finding all package.json files..."
find packages apps -name "package.json" -type f | while read pkg_file; do
    upgrade_package "$pkg_file"
done

echo ""
echo "✅ Enterprise package upgrade complete!"
echo ""
echo "Summary:"
echo "- All packages updated to CC0-1.0 license"
echo "- Repository links added"
echo "- Homepage links added"
echo "- Author information standardized"

