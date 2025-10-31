#!/bin/bash
# cathedral-simple-setup.sh
# Clean, simple Cathedral setup - one command to rule them all

echo "🏛️ CATHEDRAL SIMPLE SETUP"
echo "========================="
echo "Cleaning up the mess and making everything simple..."
echo ""

# Clean up messy files
echo "🧹 Cleaning up..."
rm -f cathedral-shell-integration-universal.sh
rm -f cathedral-replit-update.sh  
rm -f cathedral-one-command-update.sh
rm -f replit-auto-setup.sh

# Make sure we have the basic directory structure
mkdir -p bin

# Simple sync script
echo "📝 Creating simple sync script..."
cat > cathedral-sync.sh << 'EOF'
#!/bin/bash
echo "🏛️ Cathedral Sync to GitHub"
echo "=========================="
cd cathedral-rust-sync
if [ ! -f "target/release/cathedral-rust-sync" ]; then
    echo "🔨 Building Rust sync tool..."
    cargo build --release
fi
echo "📤 Syncing to GitHub..."
./target/release/cathedral-rust-sync
echo "✅ Sync complete!"
EOF

chmod +x cathedral-sync.sh

# Simple command scripts
echo "📝 Creating simple commands..."
cat > bin/cathedral-music << 'EOF'
#!/bin/bash
echo "🎼 Cathedral Music - Work on mystical sound design"
cd audio-system/vst3-strudel-integration
EOF

cat > bin/cathedral-art << 'EOF'
#!/bin/bash
echo "🎨 Cathedral Art - Work on unified art and practices"
cd mystical-system/alpha-omega-arcanae
EOF

chmod +x bin/*

# Clean VS Code settings
echo "📝 Cleaning VS Code settings..."
cat > .vscode/settings.json << 'EOF'
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "terminal.integrated.env.osx": {
    "PATH": "${workspaceFolder}/bin:${workspaceFolder}:${env:PATH}"
  }
}
EOF

# Final simple instructions
echo ""
echo "✅ SETUP COMPLETE!"
echo "=================="
echo ""
echo "Your clean Cathedral commands:"
echo "  ./cathedral-sync.sh           - Sync to GitHub"
echo "  ./bin/cathedral-music         - Work on music"
echo "  ./bin/cathedral-art           - Work on art"
echo ""
echo "That's it! Simple and clean."