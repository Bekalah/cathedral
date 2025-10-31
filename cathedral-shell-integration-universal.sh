#!/bin/bash
# cathedral-shell-integration-universal.sh
# Universal shell integration for both bash and zsh

echo "🔧 Integrating Cathedral commands into shell (Universal)..."

# Detect shell and set profile appropriately
SHELL_PROFILE=""
SHELL_TYPE=""
if [ -n "$BASH_VERSION" ]; then
    SHELL_TYPE="bash"
    SHELL_PROFILE="$HOME/.bashrc"
    echo "📝 Adding to bash profile: ~/.bashrc"
elif [ -n "$ZSH_VERSION" ]; then
    SHELL_TYPE="zsh"
    SHELL_PROFILE="$HOME/.zshrc"
    echo "📝 Adding to zsh profile: ~/.zshrc"
else
    echo "⚠️  Unknown shell type"
    SHELL_TYPE="bash"
    SHELL_PROFILE="$HOME/.bashrc"
fi

if [ -n "$SHELL_PROFILE" ]; then
    # Add Cathedral integration to shell profile
    cat >> "$SHELL_PROFILE" << EOF

# Cathedral System Integration - Rebecca's Unified Arts-Science Work
export CATHEDRAL_ROOT="$(pwd)"
export CATHEDRAL_SESSION_ID="cathedral-rust-magnus-opus-2025"
export CATHEDRAL_GITHUB_REPO="https://github.com/bekalah/cathedral"

# Cathedral Commands
alias cathedral-sync='cd $(pwd) && ./sync-all.sh'
alias cathedral-quick='cd $(pwd) && ./quick-sync.sh'
alias cathedral-setup='cd $(pwd) && ./replit-auto-setup.sh'
alias cathedral-status='echo "🏛️ Cathedral Status:" && echo "Session: \$CATHEDRAL_SESSION_ID" && echo "Repo: \$CATHEDRAL_GITHUB_REPO" && echo "Directory: \$CATHEDRAL_ROOT"'

# Cathedral Unified Arts-Science Commands
alias cathedral-tarot='cd tarot-system/72-degrees-hermann-haindl && echo "🎴 Working on Hermann Haindl 72-degree ceremonial system"'
alias cathedral-circuit='cd circuitum99/33-living-chapters && echo "🔄 Working on Circuitum99 33 living chapters"'
alias cathedral-audio='cd audio-system/vst3-strudel-integration && echo "🎵 Working on VST3/Strudel audio integration"'
alias cathedral-mystical='cd mystical-system/alpha-omega-arcanae && echo "⚡ Working on Alpha Omega arcanae system"'
alias cathedral-art='cd mystical-system/alpha-omega-arcanae && echo "🎨 Working on unified art and mystical practices"'
alias cathedral-science='cd mystical-system/alpha-omega-arcanae && echo "🔬 Working on sacred science and patterns"'
alias cathedral-music='cd audio-system/vst3-strudel-integration && echo "🎼 Working on mystical music and sound design"'
alias cathedral-game='cd game-system/fool-respawn-gate && echo "🎮 Working on The Fool card game"'
alias cathedral-design='cd design-system/affinity-designer-2 && echo "🎨 Working on sacred design patterns"'
alias cathedral-ritual='cd mystical-system/alpha-omega-arcanae && echo "✨ Working on ceremonial rituals and practices"'

# Path integration
export PATH="$(pwd)/bin:$(pwd):\$PATH"

EOF
    
    echo "✅ Shell profile updated with Cathedral integration"
else
    echo "⚠️  Could not detect shell profile location"
fi

# Create bin directory for executables
mkdir -p bin

# Create comprehensive bin scripts
cat > bin/cathedral-music << 'EOF'
#!/bin/bash
echo "🎼 Cathedral Music - Mystical Sound Design"
echo "=========================================="
cd audio-system/vst3-strudel-integration && echo "🎵 Working on VST3/Strudel audio integration"
pwd
EOF

cat > bin/cathedral-art << 'EOF'
#!/bin/bash
echo "🎨 Cathedral Art - Unified Practices"
echo "===================================="
cd mystical-system/alpha-omega-arcanae && echo "🎨 Working on unified art and mystical practices"
pwd
EOF

cat > bin/cathedral-science << 'EOF'
#!/bin/bash
echo "🔬 Cathedral Science - Sacred Patterns"
echo "====================================="
cd mystical-system/alpha-omega-arcanae && echo "🔬 Working on sacred science and patterns"
pwd
EOF

cat > bin/cathedral-ritual << 'EOF'
#!/bin/bash
echo "✨ Cathedral Ritual - Ceremonial Practices"
echo "========================================="
cd mystical-system/alpha-omega-arcanae && echo "✨ Working on ceremonial rituals and practices"
pwd
EOF

cat > bin/cathedral-mystical << 'EOF'
#!/bin/bash
echo "⚡ Cathedral Mystical - Alpha Omega Arcanae"
echo "==========================================="
cd mystical-system/alpha-omega-arcanae && echo "⚡ Working on Alpha Omega arcanae system"
pwd
EOF

# Make all bin scripts executable
chmod +x bin/*

# Update PATH for current session
export PATH="$(pwd)/bin:$(pwd):$PATH"

# Source the shell profile to load commands immediately
if [ -n "$SHELL_PROFILE" ] && [ -f "$SHELL_PROFILE" ]; then
    echo "🔄 Loading shell configuration..."
    if [ "$SHELL_TYPE" = "bash" ]; then
        source "$SHELL_PROFILE" 2>/dev/null || true
    elif [ "$SHELL_TYPE" = "zsh" ]; then
        source "$SHELL_PROFILE" 2>/dev/null || true
    fi
fi

echo ""
echo "🎉 UNIVERSAL SHELL INTEGRATION COMPLETE!"
echo "========================================="
echo ""
echo "✅ Cathedral commands now available:"
echo "   🏛️ cathedral-sync        - Sync all work to GitHub"
echo "   🔄 cathedral-quick       - Quick sync to GitHub" 
echo "   ⚙️ cathedral-setup       - Run auto-setup"
echo "   📊 cathedral-status      - Show system status"
echo ""
echo "✅ Unified Arts-Science commands:"
echo "   🎴 cathedral-tarot       - Hermann Haindl 72-degree ceremonial system"
echo "   🔄 cathedral-circuit     - Circuitum99 33 living chapters"
echo "   🎵 cathedral-audio       - VST3/Strudel audio integration"
echo "   ⚡ cathedral-mystical    - Alpha Omega arcanae system"
echo "   🎨 cathedral-art         - Unified art and mystical practices"
echo "   🔬 cathedral-science     - Sacred science and patterns"
echo "   🎼 cathedral-music       - Mystical music and sound design"
echo "   🎮 cathedral-game        - The Fool card game"
echo "   🎨 cathedral-design      - Sacred design patterns"
echo "   ✨ cathedral-ritual      - Ceremonial rituals and practices"
echo ""
echo "💡 Commands work from anywhere in your system!"
echo "💡 Shell integration is permanent - survives reboots"
echo "🔗 Connected to: https://github.com/bekalah/cathedral"
echo ""
echo "🔧 Shell type: $SHELL_TYPE"
echo "📝 Profile: $SHELL_PROFILE"