#!/bin/bash
# cathedral-one-command-update.sh
# Complete Replit setup and update in ONE command
# No external dependencies - pure Cathedral system

echo "🏛️ CATHEDRAL ONE-COMMAND UPDATE"
echo "================================"
echo "🚀 Complete Replit integration without external tools"
echo ""

# Check if we're in the right directory
if [ ! -f "replit-auto-setup.sh" ]; then
    echo "❌ Not in Cathedral root directory"
    echo "💡 Run this from: /Users/rebeccalemke/cathedral-real"
    exit 1
fi

# Step 1: Run the auto setup if needed
if [ ! -d "bin" ] || [ ! -f "sync-all.sh" ]; then
    echo "⚙️ Step 1: Running Cathedral auto-setup..."
    ./replit-auto-setup.sh
fi

# Step 2: Update shell integration
echo "🔧 Step 2: Updating shell integration..."
./cathedral-shell-integration.sh

# Step 3: Build the Rust sync tool if needed
echo "🔨 Step 3: Building Rust sync tool..."
cd cathedral-rust-sync
if [ ! -f "target/release/cathedral-rust-sync" ]; then
    cargo build --release
fi
cd ..

# Step 4: Sync everything to GitHub
echo "📤 Step 4: Syncing all work to GitHub..."
./sync-all.sh

# Step 5: Show final status
echo ""
echo "✅ Step 5: Cathedral Status"
echo "==========================="
./bin/cathedral-status

# Step 6: Create Replit-ready startup
echo ""
echo "🔧 Step 6: Creating Replit startup command..."
cat > REPLIT_COMMAND.txt << 'EOF'
# Copy this command to Replit console for instant setup:
cathedral-one-command-update.sh
EOF

echo ""
echo "🎉 CATHEDRAL ONE-COMMAND UPDATE COMPLETE!"
echo "=========================================="
echo ""
echo "✅ Everything is now ready in Replit!"
echo ""
echo "🔗 GitHub Repository: https://github.com/bekalah/cathedral"
echo "🆔 Session ID: cathedral-rust-magnus-opus-2025"
echo ""
echo "💡 Available Commands:"
echo "   🏛️ cathedral-sync        - Sync all work to GitHub"
echo "   🔄 cathedral-quick       - Quick sync to GitHub" 
echo "   📊 cathedral-status      - Show system status"
echo "   🎴 cathedral-tarot       - Tarot system work"
echo "   🎵 cathedral-audio       - Audio system work"
echo "   💼 cathedral-business    - Business work"
echo "   🎨 cathedral-design      - Design system work"
echo ""
echo "🔄 Replit Session Commands:"
echo "   ./cathedral-one-command-update.sh    - One command complete setup"
echo "   ./replit-auto-setup.sh               - Auto-setup new work"
echo "   ./cathedral-shell-integration.sh     - Update shell integration"
echo ""
echo "🚀 No external dependencies required!"
echo "🎯 All tools are Cathedral-native!"