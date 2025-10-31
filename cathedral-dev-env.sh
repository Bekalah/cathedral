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
