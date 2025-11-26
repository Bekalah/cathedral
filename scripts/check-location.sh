#!/bin/bash

# Cathedral Repository Navigation Script
# Automatically redirects to main repository if in research folder

echo "🏛️ Cathedral Repository Navigation Check"
echo "========================================"

CURRENT_DIR=$(pwd)
MAIN_REPO="/Users/rebeccalemke/cathedral"
RESEARCH_REPO="/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/cathedral-research"

# Check current location
if [[ "$CURRENT_DIR" == *"cathedral-research"* ]]; then
    echo "⚠️  WARNING: You are in the RESEARCH ARCHIVE"
    echo "📍 Current location: $CURRENT_DIR"
    echo ""
    echo "🎯 Main repository is at: $MAIN_REPO"
    echo ""
    echo "Would you like to navigate to the main repository? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "🚀 Navigating to main repository..."
        cd "$MAIN_REPO" || exit 1
        echo "✅ Now in main repository: $(pwd)"
        echo ""
        echo "📦 Available packages:"
        ls packages/ 2>/dev/null || echo "   No packages directory found"
        echo ""
        echo "🔧 Quick start commands:"
        echo "   pnpm install       # Install dependencies"
        echo "   pnpm run dev       # Start development"
        echo "   pnpm run build     # Build all packages"
    else
        echo "⚠️  Remember: This is the research archive"
        echo "📖 See REDIRECT_TO_MAIN.md for full instructions"
    fi
    
elif [[ "$CURRENT_DIR" == *"cathedral"* ]] && [[ "$CURRENT_DIR" != *"cathedral-research"* ]]; then
    echo "✅ CORRECT: You are in the main repository"
    echo "📍 Current location: $CURRENT_DIR"
    echo ""
    echo "📦 Available packages:"
    ls packages/ 2>/dev/null || echo "   No packages directory found"
    echo ""
    echo "🏗️  Trinity Architecture Status:"
    
    # Check for core packages
    if [ -d "packages/circuitum99" ]; then
        echo "   ✅ Soul (Circuitum99) - Available"
    else
        echo "   ❌ Soul (Circuitum99) - Missing"
    fi
    
    if [ -d "packages/stone-grimoire" ]; then
        echo "   ✅ Body (Stone Grimoire) - Available"
    else
        echo "   ❌ Body (Stone Grimoire) - Missing"
    fi
    
    if [ -d "packages/cosmogenesis-learning-engine" ]; then
        echo "   ✅ Spirit (Cosmogenesis) - Available"
    else
        echo "   ❌ Spirit (Cosmogenesis) - Missing"
    fi
    
    if [ -d "packages/tesseract-bridge" ]; then
        echo "   ✅ Integration (Tesseract Bridge) - Available"
    else
        echo "   ❌ Integration (Tesseract Bridge) - Missing"
    fi
    
    echo ""
    echo "🔧 Development commands:"
    echo "   pnpm run dev       # Start development"
    echo "   pnpm run build     # Build all packages"
    echo "   pnpm run test      # Run tests"
    
else
    echo "❓ Unknown location: $CURRENT_DIR"
    echo ""
    echo "🎯 Main Cathedral repository: $MAIN_REPO"
    echo "📚 Research archive: $RESEARCH_REPO"
    echo ""
    echo "Navigate to one of these locations to continue development."
fi

echo ""
echo "📖 For detailed instructions, see:"
echo "   Main repo: DEVELOPMENT_GUIDE.md"
echo "   Research:  REDIRECT_TO_MAIN.md"