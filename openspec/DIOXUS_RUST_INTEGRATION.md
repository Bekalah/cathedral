# Dioxus Rust Integration - OpenSpec

**Status**: ACTIVE  
**Framework**: Dioxus (Free, Open Source)  
**Package Manager**: Cargo (Rust native)  
**Integration**: pnpm workspace

## Overview

Cathedral uses **Dioxus** for Rust development - a free, open-source framework for building cross-platform applications with Rust.

### Why Dioxus?

1. **Free**: Completely open-source, no paid dependencies
2. **Fast**: Rust performance with React-like developer experience
3. **Cross-platform**: Web, desktop, mobile from one codebase
4. **Secure**: Rust's memory safety guarantees
5. **Modern**: React-like component model

## Structure

```
rust-engines/
├── Cargo.toml          # Workspace configuration
├── package.json        # pnpm integration
├── dioxus-cathedral/   # Main Dioxus app
│   ├── Cargo.toml
│   ├── Dioxus.toml
│   └── src/
│       └── main.rs
└── cathedral-rust-core/ # Core Rust library
    ├── Cargo.toml
    └── src/
        └── lib.rs
```

## Commands

### pnpm Commands (Integrated)
```bash
# Build Rust
pnpm run rust:build

# Develop Rust (watch mode)
pnpm run rust:dev

# Test Rust
pnpm run rust:test

# Check Rust
pnpm run rust:check

# Dioxus development server
pnpm run dioxus:dev

# Dioxus production build
pnpm run dioxus:build
```

### Cargo Commands (Direct)
```bash
cd rust-engines

# Build
cargo build --release

# Run
cargo run --bin dioxus-cathedral

# Test
cargo test

# Check
cargo check
```

### Dioxus CLI Commands
```bash
cd rust-engines/dioxus-cathedral

# Development server
dx serve

# Production build
dx build --release

# Desktop app
dx bundle
```

## Integration with pnpm

- Rust workspace has `package.json` for pnpm integration
- Turbo.json includes Rust build tasks
- All Rust commands accessible via pnpm scripts
- No npm dependencies - pure Rust + Dioxus

## WebAssembly Integration

Dioxus compiles to WebAssembly for web deployment:
- Can be embedded in Next.js/React apps
- Can be used in Node.js via WASM
- Full Rust performance in browser

## Security

- **Rust**: Memory-safe by default
- **Dioxus**: Open-source, audited
- **No npm**: Uses Cargo (Rust's package manager)
- **Free**: No paid dependencies

## Status

✅ Rust workspace created  
✅ Dioxus app scaffolded  
✅ pnpm integration complete  
✅ Turbo.json updated  
✅ OpenSpec documented  

---

**Framework**: Dioxus (Free, Open Source)  
**Language**: Rust  
**Package Manager**: Cargo + pnpm integration  
**Status**: ✅ Ready for development

