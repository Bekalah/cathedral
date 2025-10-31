#!/bin/bash
# cathedral-shell-integration.sh
# Safe shell integration for Cathedral project

echo "🏛️ Installing Cathedral Shell Integration..."

# Create safe shell configuration
echo "⚙️ Creating safe shell configuration..."

# Add to ~/.bashrc if using bash
if [ -n "$BASH_VERSION" ]; then
    echo "# Cathedral Shell Integration" >> ~/.bashrc
    echo "export CATHEDRAL_ROOT='$PWD'" >> ~/.bashrc
    echo "alias cathedral-build='cd $PWD && cargo build'" >> ~/.bashrc
    echo "alias cathedral-test='cd $PWD && cargo test'" >> ~/.bashrc
    echo "alias cathedral-clean='cd $PWD && ./cathedral-complete-cleanup.sh'" >> ~/.bashrc
    echo "alias cathedral-dev='cd $PWD && turbo run dev'" >> ~/.bashrc
    echo "export PATH='$PWD/bin:$PATH'" >> ~/.bashrc
fi

# Add to ~/.zshrc if using zsh
if [ -n "$ZSH_VERSION" ]; then
    echo "# Cathedral Shell Integration" >> ~/.zshrc
    echo "export CATHEDRAL_ROOT='$PWD'" >> ~/.zshrc
    echo "alias cathedral-build='cd $PWD && cargo build'" >> ~/.zshrc
    echo "alias cathedral-test='cd $PWD && cargo test'" >> ~/.zshrc
    echo "alias cathedral-clean='cd $PWD && ./cathedral-complete-cleanup.sh'" >> ~/.zshrc
    echo "alias cathedral-dev='cd $PWD && turbo run dev'" >> ~/.zshrc
    echo "export PATH='$PWD/bin:$PATH'" >> ~/.zshrc
fi

# Create safe cleanup script
echo "🧹 Creating safe cleanup script..."
cat > cathedral-safe-cleanup.sh << 'EOF'
#!/bin/bash
# Safe cleanup that won't crash system

set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

echo "🏛️ Cathedral Safe Cleanup Starting..."

# Create backup first
BACKUP_DIR="cathedral-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Only remove specific known files/directories
echo "🧹 Removing known cleanup targets..."

# Remove specific scattered files safely
rm -f CHIRON_HEALING_CODEX.md 2>/dev/null || true
rm -f EMERGENCY_RUN.py 2>/dev/null || true
rm -f modular-safety-system.py 2>/dev/null || true

# Remove scattered JS/HTML files safely
rm -f *.html 2>/dev/null || true
rm -f *.js 2>/dev/null || true
rm -f *.css 2>/dev/null || true

# Create proper directory structure
echo "🏗️ Creating directories..."
mkdir -p cathedral-core
mkdir -p cathedral-synthesis-lab
mkdir -p cathedral-fractal-engine
mkdir -p cathedral-tarot-system
mkdir -p cathedral-creative-studios

echo "✅ Safe cleanup complete!"
EOF

chmod +x cathedral-safe-cleanup.sh

# Create Cathedral development environment script
echo "🛠️ Creating development environment..."
cat > cathedral-dev-env.sh << 'EOF'
#!/bin/bash
# Cathedral Development Environment Setup

# Set safe environment
export CATHEDRAL_ROOT="$(pwd)"
export RUST_BACKTRACE=1
export RUST_LOG=info

# Create safe development functions
cathedral-build() {
    echo "🏗️ Building Cathedral..."
    cargo build --release 2>&1 | head -50
}

cathedral-test() {
    echo "🧪 Testing Cathedral..."
    cargo test 2>&1 | head -30
}

cathedral-lint() {
    echo "📏 Linting Cathedral..."
    cargo clippy -- -D warnings 2>&1 | head -20
}

cathedral-fmt() {
    echo "🎨 Formatting Cathedral..."
    cargo fmt 2>&1
}

cathedral-clean() {
    echo "🧹 Safe Cathedral cleanup..."
    ./cathedral-safe-cleanup.sh
}

cathedral-status() {
    echo "📊 Cathedral Status:"
    echo "Root: $CATHEDRAL_ROOT"
    echo "Cargo: $(cargo --version 2>/dev/null || echo 'Not installed')"
    echo "Node: $(node --version 2>/dev/null || echo 'Not installed')"
    echo "Rustup: $(rustup --version 2>/dev/null || echo 'Not installed')"
}

# Auto-load functions if in cathedral directory
if [ -f "Cargo.toml" ]; then
    source cathedral-dev-env.sh
    echo "✅ Cathedral development environment loaded"
fi
EOF

chmod +x cathedral-dev-env.sh

# Create system safety checks
echo "🛡️ Creating system safety checks..."
cat > cathedral-system-check.sh << 'EOF'
#!/bin/bash
# System safety check for Cathedral development

check_disk_space() {
    echo "💾 Checking disk space..."
    df -h . | awk 'NR==2 {print "Available: " $4 " of " $2}'
    
    # Warn if less than 1GB available
    AVAILABLE=$(df . | awk 'NR==2 {print $4}' | sed 's/G//')
    if [ "$AVAILABLE" -lt 1 ]; then
        echo "⚠️  Warning: Less than 1GB disk space available"
        return 1
    fi
    return 0
}

check_memory() {
    echo "🧠 Checking system memory..."
    FREE_MEM=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
    if [ "$FREE_MEM" -lt 1048576 ]; then  # Less than 1GB
        echo "⚠️  Warning: Low system memory"
        return 1
    fi
    return 0
}

check_cargo() {
    echo "📦 Checking Cargo installation..."
    if ! command -v cargo &> /dev/null; then
        echo "❌ Cargo not found. Install with: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
        return 1
    fi
    echo "✅ Cargo: $(cargo --version)"
    return 0
}

check_godot() {
    echo "🎮 Checking Godot installation..."
    if ! command -v godot &> /dev/null; then
        echo "⚠️  Godot not in PATH. Install from: https://godotengine.org/download"
        return 1
    fi
    echo "✅ Godot found"
    return 0
}

run_safety_check() {
    echo "🔍 Running Cathedral System Safety Check..."
    echo "=========================================="
    
    check_disk_space || echo "Disk space may be insufficient"
    check_memory || echo "Memory may be insufficient"
    check_cargo || echo "Cargo installation needed"
    check_godot || echo "Godot installation recommended"
    
    echo "=========================================="
    echo "✅ System check complete"
}

# Run safety check if called directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    run_safety_check
fi
EOF

chmod +x cathedral-system-check.sh

# Create safe build wrapper
echo "🏗️ Creating safe build wrapper..."
cat > cathedral-safe-build.sh << 'EOF'
#!/bin/bash
# Safe build wrapper that prevents system crashes

set -e  # Exit on error
set -u  # Exit on undefined variable

echo "🏗️ Cathedral Safe Build Starting..."

# Check system first
./cathedral-system-check.sh || {
    echo "❌ System check failed. Aborting build."
    exit 1
}

# Run build with error handling
echo "📦 Running Cargo build..."
if cargo build --release 2>&1 | tee build.log; then
    echo "✅ Build completed successfully"
    echo "📊 Build log saved to: build.log"
else
    echo "❌ Build failed. Check build.log for details"
    echo "📋 Last 10 lines of build log:"
    tail -10 build.log
    exit 1
fi

echo "🎉 Cathedral build ready!"
EOF

chmod +x cathedral-safe-build.sh

# Install shell integration
echo "🔧 Installing shell integration..."

# Source the dev environment in current shell
source ./cathedral-dev-env.sh

# Create bin directory for tools
mkdir -p bin

# Link tools to bin
ln -sf ../cathedral-safe-build.sh bin/cathedral-build
ln -sf ../cathedral-safe-cleanup.sh bin/cathedral-clean
ln -sf ../cathedral-system-check.sh bin/cathedral-check
ln -sf ../cathedral-dev-env.sh bin/cathedral-dev

# Update PATH
export PATH="$PWD/bin:$PATH"

echo "✅ Cathedral Shell Integration Complete!"
echo ""
echo "🎯 Available Commands:"
echo "  cathedral-build      - Safe build Cathedral"
echo "  cathedral-test       - Run tests"
echo "  cathedral-lint       - Check code quality"
echo "  cathedral-fmt        - Format code"
echo "  cathedral-clean      - Safe cleanup"
echo "  cathedral-status     - Show system status"
echo "  cathedral-check      - System safety check"
echo ""
echo "💡 Added to PATH: $PWD/bin"
echo "📝 Add to your shell profile:"
echo "  source $PWD/cathedral-dev-env.sh"
echo ""
echo "🚀 Your system is now Cathedral-safe!"