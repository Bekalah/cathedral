# Rust Compilation Note (For Next Session)

## Issue
The `cathedral-core` Rust library needs `libclang` to compile the GDNative bindings for Godot.

## Status
- ✅ Rust toolchain installed
- ✅ `clang` and `libclang` system packages installed
- ⚠️ Need to configure `LIBCLANG_PATH` environment variable correctly

## To Fix Later (When Not Worried About Credits)

### Option 1: Set LIBCLANG_PATH
```bash
export LIBCLANG_PATH=$(find /nix/store -name "libclang.so*" | head -1 | xargs dirname)
cd rust-engines/cathedral-core
cargo build --release
```

### Option 2: Use GDExtension Instead of GDNative
- GDNative (0.11) is older and requires bindgen/libclang
- GDExtension (newer) is easier to compile
- Consider upgrading to `godot-rust` crate version 0.1+ (GDExtension)

### Compiled Library Location
Once compiled, copy to:
```
cp rust-engines/target/release/libcathedral_core.so godot-cathedral/bin/
```

## Current Workaround
The web platform works perfectly without the Rust bridge. The Godot integration can be completed in a future session when you have time.

All your data is safe:
- ✅ 255 engines consolidated
- ✅ 1,511 data files organized
- ✅ TAROT_MASTER_DATASET.json loaded in web platform
- ✅ circuitum99-nodes.json accessible
- ✅ OpenSpec palette implemented
