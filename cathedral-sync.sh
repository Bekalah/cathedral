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
