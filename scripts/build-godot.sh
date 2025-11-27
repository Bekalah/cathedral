#!/bin/bash
# Build script for Godot 4.5 + Rust integration

set -e

echo "🎮 Building Godot 4.5 + Rust Game Engine..."

# Build Rust engines first
if [ -d "rust-engines" ]; then
  echo "🔨 Building Rust engines..."
  cd rust-engines
  cargo build --workspace --release
  cd ..
  
  echo "✅ Rust engines built successfully"
  
  # Copy Rust libraries to Godot project
  if [ -d "godot" ]; then
    echo "📦 Copying Rust libraries to Godot project..."
    mkdir -p godot/libs
    
    # Copy built libraries
    find rust-engines/target/release -name "*.dylib" -o -name "*.so" -o -name "*.dll" | while read lib; do
      cp "$lib" godot/libs/ 2>/dev/null || true
    done
    
    echo "✅ Rust libraries copied to Godot"
  fi
else
  echo "⚠️  rust-engines directory not found, skipping Rust build"
fi

# Export Godot project (if Godot is available)
if command -v godot &> /dev/null; then
  echo "🎮 Exporting Godot project..."
  cd godot
  
  # Check if project.godot exists
  if [ -f "project.godot" ]; then
    echo "✅ Godot project found"
    echo "   Run 'godot --path . --export-release' to export"
  else
    echo "⚠️  project.godot not found"
  fi
  
  cd ..
else
  echo "⚠️  Godot not found in PATH"
  echo "   Install Godot 4.5 and add to PATH, or run manually:"
  echo "   cd godot && godot --path ."
fi

echo "✅ Godot + Rust build process completed"

