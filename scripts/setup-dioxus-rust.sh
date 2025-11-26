#!/bin/bash
# Setup Dioxus for Rust - Free, Open Source
# Integrates Dioxus with the Cathedral monorepo

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🦀 Setting Up Dioxus for Rust"
echo "============================\n"

# ========================================
# PHASE 1: CREATE RUST WORKSPACE
# ========================================
echo "📦 PHASE 1: Creating Rust Workspace..."

# Create rust-engines directory if it doesn't exist
mkdir -p rust-engines

# Create Cargo.toml workspace
if [ ! -f "rust-engines/Cargo.toml" ]; then
  cat > rust-engines/Cargo.toml << 'EOF'
[workspace]
members = [
  "dioxus-cathedral",
  "cathedral-rust-core",
]
resolver = "2"

[workspace.package]
version = "0.1.0"
edition = "2021"
license = "CC0-1.0"
authors = ["Rebecca Respawn <bekalah>"]

[workspace.dependencies]
# Dioxus - Free, Open Source
dioxus = { version = "0.5", features = ["web", "desktop"] }
dioxus-web = "0.5"
dioxus-desktop = "0.5"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1", features = ["full"] }
EOF
  echo "  ✅ Created rust-engines/Cargo.toml"
fi

# ========================================
# PHASE 2: CREATE DIOXUS CATHEDRAL APP
# ========================================
echo "\n🎨 PHASE 2: Creating Dioxus Cathedral App..."

mkdir -p rust-engines/dioxus-cathedral/src

# Create main Dioxus app
cat > rust-engines/dioxus-cathedral/src/main.rs << 'EOF'
use dioxus::prelude::*;

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        div {
            class: "cathedral-app",
            style: "font-family: system-ui; padding: 2rem;",
            h1 { "🏰 Cathedral - Dioxus Rust App" }
            p { "Free, open-source Rust framework for Cathedral" }
            CathedralGame {}
        }
    }
}

#[component]
fn CathedralGame() -> Element {
    let mut count = use_signal(|| 0);
    
    rsx! {
        div {
            class: "game-interface",
            h2 { "Codex 144:99 Game" }
            p { "Count: {count}" }
            button {
                onclick: move |_| count += 1,
                "Increment"
            }
        }
    }
}
EOF

# Create Cargo.toml for Dioxus app
cat > rust-engines/dioxus-cathedral/Cargo.toml << 'EOF'
[package]
name = "dioxus-cathedral"
version.workspace = true
edition.workspace = true
license.workspace = true
authors.workspace = true

[dependencies]
dioxus = { workspace = true }
dioxus-web = { workspace = true }
serde = { workspace = true }
serde_json = { workspace = true }
EOF

echo "  ✅ Created Dioxus Cathedral app"

# ========================================
# PHASE 3: CREATE RUST CORE PACKAGE
# ========================================
echo "\n🦀 PHASE 3: Creating Rust Core Package..."

mkdir -p rust-engines/cathedral-rust-core/src

# Create Rust core library
cat > rust-engines/cathedral-rust-core/src/lib.rs << 'EOF'
// Cathedral Rust Core
// Free, open-source Rust implementation

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CodexNode {
    pub id: u32,
    pub name: String,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ArcanaCard {
    pub id: String,
    pub name: String,
    pub number: u8,
}

pub struct CodexEngine;

impl CodexEngine {
    pub fn new() -> Self {
        Self
    }
    
    pub fn get_node(&self, id: u32) -> Option<CodexNode> {
        // Implementation here
        Some(CodexNode {
            id,
            name: format!("Node {}", id),
            description: "Codex node".to_string(),
        })
    }
}

impl Default for CodexEngine {
    fn default() -> Self {
        Self::new()
    }
}
EOF

# Create Cargo.toml for Rust core
cat > rust-engines/cathedral-rust-core/Cargo.toml << 'EOF'
[package]
name = "cathedral-rust-core"
version.workspace = true
edition.workspace = true
license.workspace = true
authors.workspace = true

[lib]
name = "cathedral_rust_core"
crate-type = ["cdylib", "rlib"]

[dependencies]
serde = { workspace = true, features = ["derive"] }
serde_json = { workspace = true }
EOF

echo "  ✅ Created Rust core package"

# ========================================
# PHASE 4: INTEGRATE WITH PNPM
# ========================================
echo "\n🔗 PHASE 4: Integrating with pnpm..."

# Create package.json for Rust workspace
cat > rust-engines/package.json << 'EOF'
{
  "name": "@cathedral/rust-engines",
  "version": "0.1.0",
  "description": "Rust engines with Dioxus - Free, open source",
  "scripts": {
    "build": "cargo build --release",
    "dev": "cargo watch -x 'run --bin dioxus-cathedral'",
    "test": "cargo test",
    "check": "cargo check",
    "dioxus:dev": "dx serve",
    "dioxus:build": "dx build --release"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Bekalah/cathedral.git",
    "directory": "rust-engines"
  },
  "author": "Rebecca Respawn",
  "license": "CC0-1.0",
  "packageManager": "pnpm@8.15.0"
}
EOF

echo "  ✅ Created package.json for Rust workspace"

# ========================================
# PHASE 5: UPDATE ROOT CONFIGURATION
# ========================================
echo "\n⚙️  PHASE 5: Updating Root Configuration..."

# Add Rust scripts to root package.json
node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts['rust:build'] = 'cd rust-engines && cargo build --release';
pkg.scripts['rust:dev'] = 'cd rust-engines && cargo watch -x run';
pkg.scripts['rust:test'] = 'cd rust-engines && cargo test';
pkg.scripts['rust:check'] = 'cd rust-engines && cargo check';
pkg.scripts['dioxus:dev'] = 'cd rust-engines/dioxus-cathedral && dx serve';
pkg.scripts['dioxus:build'] = 'cd rust-engines/dioxus-cathedral && dx build --release';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Added Rust scripts to root package.json');
NODE_SCRIPT

# ========================================
# PHASE 6: CREATE .gitignore FOR RUST
# ========================================
echo "\n📝 PHASE 6: Updating .gitignore for Rust..."

if ! grep -q "/target" .gitignore 2>/dev/null; then
  cat >> .gitignore << 'EOF'

# Rust
/target
**/target
Cargo.lock
EOF
  echo "  ✅ Added Rust to .gitignore"
fi

# ========================================
# PHASE 7: CREATE DIOXUS CONFIG
# ========================================
echo "\n⚙️  PHASE 7: Creating Dioxus Configuration..."

cat > rust-engines/dioxus-cathedral/Dioxus.toml << 'EOF'
[application]
name = "Cathedral Dioxus App"
default_platform = "web"
out_dir = "dist"

[web.app]
title = "Cathedral - Dioxus"
base_path = "/"

[web.watcher]
watch_path = ["src", "assets"]

[web.resource]
style = []
script = []
EOF

echo "  ✅ Created Dioxus.toml"

# ========================================
# PHASE 8: UPDATE OPENSPEC
# ========================================
echo "\n📚 PHASE 8: Updating OpenSpec..."

mkdir -p openspec

cat >> openspec/AGENTS.md << 'EOF'

## 🦀 Rust & Dioxus Integration

### Rust Workspace
- **Location**: `rust-engines/`
- **Framework**: Dioxus (free, open-source)
- **Package Manager**: Cargo (Rust's native package manager)

### Rust Packages
- `dioxus-cathedral` - Main Dioxus web/desktop app
- `cathedral-rust-core` - Core Rust library

### Commands
```bash
# Build Rust
pnpm run rust:build

# Develop Rust
pnpm run rust:dev

# Dioxus development
pnpm run dioxus:dev

# Dioxus build
pnpm run dioxus:build
```

### Integration
- Rust code compiles to WebAssembly for web
- Can be used in Node.js via WASM
- Dioxus provides React-like UI for Rust
- Free and open-source (no paid dependencies)
EOF

echo "  ✅ Updated OpenSpec"

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Created Rust workspace"
echo "  ✅ Created Dioxus Cathedral app"
echo "  ✅ Created Rust core package"
echo "  ✅ Integrated with pnpm"
echo "  ✅ Updated root configuration"
echo "  ✅ Updated .gitignore"
echo "  ✅ Created Dioxus config"
echo "  ✅ Updated OpenSpec"
echo "\n🦀 Dioxus Rust setup complete!"
echo "\n💡 Next steps:"
echo "   1. Install Rust: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
echo "   2. Install Dioxus CLI: cargo install dioxus-cli"
echo "   3. Run: pnpm run dioxus:dev"

