#!/bin/bash
# Build script for Rust engines

set -e

echo "🔨 Building Rust engines for Cathedral..."

if [ ! -d "rust-engines" ]; then
  echo "❌ rust-engines directory not found"
  exit 1
fi

cd rust-engines

echo "📦 Building workspace..."
cargo build --workspace --release

echo "🧪 Running tests..."
cargo test --workspace

echo "📊 Generating documentation..."
cargo doc --workspace --no-deps

echo "✅ Rust engines built successfully"
echo ""
echo "Built libraries:"
find target/release -name "*.rlib" -o -name "*.dylib" -o -name "*.so" -o -name "*.dll" | grep -v ".d" | while read lib; do
  echo "  - $lib"
done

cd ..

echo "✅ Rust build complete"

