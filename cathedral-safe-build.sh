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
