#!/bin/bash
echo "🔄 Quick sync to GitHub..."
if [ -f "sync-all.sh" ]; then
    ./sync-all.sh
else
    echo "Running direct sync..."
    cd cathedral-rust-sync && ./target/release/cathedral-rust-sync 2>/dev/null || echo "Git sync ready - configure GitHub credentials if needed"
fi
