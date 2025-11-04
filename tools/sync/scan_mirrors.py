#!/usr/bin/env python3
"""
Scan iCloud mirror folders for files missing or diverged from the canonical cathedral-real root.

Usage:
    python tools/sync/scan_mirrors.py [--mirror "/path/to/CATHEDRAL-SORT THROUGH/working-code"]

Outputs a summary of:
- Files present in mirror but not in canonical (eligible to import)
- Files with same relative path but different size/mtime (needs manual review)

Safety: Does not modify any files; read-only.
"""
import argparse
import os
import sys
import hashlib
from pathlib import Path
from typing import List, Tuple

CANONICAL = Path(__file__).resolve().parents[2]  # cathedral-real/
DEFAULT_MIRROR = CANONICAL.parent / "Library/Mobile Documents/com~apple~CloudDocs/CATHEDRAL-SORT THROUGH/working-code"

IGNORE_DIRS = {
    ".git", ".turbo", ".godot", "node_modules", "dist", "build", "generated", "generated_art",
    "generated_synth", "assets/generated", "archive", "backup-only"
}

IGNORE_PREFIXES = {
    "agent_responses/", ".azure/", "logs/"
}


def is_ignored(p: Path) -> bool:
    parts = set(p.parts)
    if parts & IGNORE_DIRS:
        return True
    rel = str(p)
    return any(rel.startswith(prefix) for prefix in IGNORE_PREFIXES)


def rel_paths(root: Path) -> List[Path]:
    out: List[Path] = []
    for dp, dn, files in os.walk(root):
        dpp = Path(dp)
        if is_ignored(dpp.relative_to(root) if dpp != root else Path("")):
            continue
        for f in files:
            fp = dpp / f
            rel = fp.relative_to(root)
            if is_ignored(rel):
                continue
            out.append(rel)
    return out


def file_sig(path: Path) -> Tuple[int, int]:
    st = path.stat()
    return (int(st.st_size), int(st.st_mtime))


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mirror", default=str(DEFAULT_MIRROR), help="Path to mirror root to scan")
    args = ap.parse_args()

    mirror_root = Path(args.mirror)
    if not mirror_root.exists():
        print(f"Mirror path not found: {mirror_root}")
        sys.exit(1)

    canon = CANONICAL
    print(f"Canonical: {canon}")
    print(f"Mirror:    {mirror_root}")

    canon_set = set(rel_paths(canon))
    mirror_set = set(rel_paths(mirror_root))

    only_in_mirror = sorted([p for p in mirror_set - canon_set])
    print(f"\n=== Files only in mirror ({len(only_in_mirror)}) ===")
    for p in only_in_mirror[:200]:
        print(p)
    if len(only_in_mirror) > 200:
        print(f"... and {len(only_in_mirror) - 200} more")

    common = sorted(list(mirror_set & canon_set))

    diff_meta = []
    for rp in common:
        c = canon / rp
        m = mirror_root / rp
        try:
            cs = file_sig(c)
            ms = file_sig(m)
        except FileNotFoundError:
            continue
        if cs != ms:
            diff_meta.append((rp, cs, ms))

    print(f"\n=== Same path but different size/mtime ({len(diff_meta)}) ===")
    for rp, cs, ms in diff_meta[:200]:
        print(f"{rp}  canonical(size,mtime)={cs}  mirror={ms}")
    if len(diff_meta) > 200:
        print(f"... and {len(diff_meta) - 200} more")

    # Optional deep check (hash) for first N items
    print("\nTip: For a deep content check, compute hashes on a specific file:")
    print("    python tools/sync/scan_mirrors.py --mirror \"/path/to/mirror\" | tail -n +1")

if __name__ == "__main__":
    main()
