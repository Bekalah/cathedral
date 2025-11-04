#!/usr/bin/env bash
set -euo pipefail

# Build Rust GDExtension and copy the library into the Godot project bin folder.
ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
CRATE_DIR="$(cd "$(dirname "$0")" && pwd)"
GODOT_BIN_DIR="$ROOT_DIR/godot-project/bin"

cargo build --release --manifest-path "$CRATE_DIR/Cargo.toml"

case "$(uname -s)" in
  Darwin)
    SRC="$CRATE_DIR/target/release/libcathedral_godot_rust.dylib"
    DEST="$GODOT_BIN_DIR/libcathedral_godot_rust.dylib"
    ;;
  Linux)
    SRC="$CRATE_DIR/target/release/libcathedral_godot_rust.so"
    DEST="$GODOT_BIN_DIR/libcathedral_godot_rust.so"
    ;;
  MINGW*|MSYS*|CYGWIN*)
    SRC="$CRATE_DIR/target/release/cathedral_godot_rust.dll"
    DEST="$GODOT_BIN_DIR/cathedral_godot_rust.dll"
    ;;
  *)
    echo "Unsupported OS" >&2
    exit 1
    ;;
 esac

mkdir -p "$GODOT_BIN_DIR"
cp -vf "$SRC" "$DEST"
echo "Copied $SRC -> $DEST"
