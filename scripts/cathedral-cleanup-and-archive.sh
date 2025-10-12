#!/bin/bash

# 🏰 CATHEDRAL OF CIRCUITS - Complete File Cleanup and Archive System
# Fixes naming confusion and archives incorrectly named files

set -e  # Exit on any error

echo "🏰 CATHEDRAL OF CIRCUITS - File Cleanup System"
echo "=============================================="

# Create archive directory structure
echo "📁 Creating archive structure..."
mkdir -p archive/deprecated-names
mkdir -p archive/old-versions
mkdir -p archive/backup-$(date +%Y%m%d)

# Current working directory
CATHEDRAL_DIR="/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral"
cd "$CATHEDRAL_DIR"

echo "📂 Current directory: $(pwd)"

# Function to safely move files
move_to_archive() {
    local file="$1"
    local reason="$2"
    if [ -f "$file" ]; then
        echo "📦 Archiving: $file ($reason)"
        mv "$file" "archive/deprecated-names/"
        echo "✅ Moved: $file -> archive/deprecated-names/"
    else
        echo "⚠️  File not found: $file"
    fi
}

# Function to rename files
rename_file() {
    local old_name="$1"
    local new_name="$2"
    if [ -f "$old_name" ]; then
        echo "🔄 Renaming: $old_name -> $new_name"
        cp "$old_name" "$new_name"
        move_to_archive "$old_name" "renamed to $new_name"
    else
        echo "⚠️  Source file not found: $old_name"
    fi
}

echo ""
echo "🚨 PHASE 1: Archive Incorrectly Named Files"
echo "==========================================="

# Archive files with wrong names
echo "Archiving COSMOGENESIS files (should be CATHEDRAL OF CIRCUITS)..."
if [ -f "cosmogenesis-nova-elegantia-complete.html" ]; then
    echo "📦 Processing cosmogenesis-nova-elegantia-complete.html"
    cp "cosmogenesis-nova-elegantia-complete.html" "cathedral-of-circuits-main-platform.html"
    move_to_archive "cosmogenesis-nova-elegantia-complete.html" "wrong name - should be CATHEDRAL OF CIRCUITS"
fi

if [ -f "cosmogenesis-engine-complete.html" ]; then
    echo "📦 Processing cosmogenesis-engine-complete.html" 
    cp "cosmogenesis-engine-complete.html" "cathedral-of-circuits-engine.html"
    move_to_archive "cosmogenesis-engine-complete.html" "wrong name - should be CATHEDRAL OF CIRCUITS"
fi

echo "Archiving LUMINA files (should be LIBER ARCANAE)..."
if [ -f "lumina-keys-complete.html" ]; then
    echo "📦 Processing lumina-keys-complete.html"
    cp "lumina-keys-complete.html" "liber-arcanae-living-arcana-deck.html"
    move_to_archive "lumina-keys-complete.html" "wrong name - should be LIBER ARCANAE"
fi

echo ""
echo "🔍 PHASE 2: Check for Other Misnamed Files"
echo "=========================================="

# Look for other potentially misnamed files
echo "Scanning for other files that might need renaming..."

# Find files that might contain wrong names in content
echo "📄 Files that might contain deprecated names:"
grep -l "COSMOGENESIS\|LUMIN\|CLAVIS" *.html *.md *.js 2>/dev/null || echo "No deprecated names found in content."

echo ""
echo "📊 PHASE 3: Summary Report"
echo "========================="

echo "✅ Archived files:"
ls -la archive/deprecated-names/ 2>/dev/null || echo "No files archived yet."

echo ""
echo "✅ Current CATHEDRAL OF CIRCUITS files:"
echo "🏰 Main Platform: cathedral-of-circuits-main-platform.html"
echo "🃏 LIBER ARCANAE: liber-arcanae-living-arcana-deck.html" 
echo "📚 CIRCUITUM99: (to be created/found)"

echo ""
echo "🎯 PHASE 4: Verification"
echo "======================="

# Verify correct files exist
if [ -f "cathedral-of-circuits-main-platform.html" ]; then
    echo "✅ Main platform file exists"
else
    echo "❌ Main platform file missing"
fi

if [ -f "liber-arcanae-living-arcana-deck.html" ]; then
    echo "✅ LIBER ARCANAE file exists"
else
    echo "❌ LIBER ARCANAE file missing"
fi

echo ""
echo "🏰 CATHEDRAL OF CIRCUITS File Cleanup Complete!"
echo "All deprecated names archived to: archive/deprecated-names/"
echo "Correct business identity files created with proper naming."