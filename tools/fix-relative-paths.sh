#!/usr/bin/env bash
set -euo pipefail

# 0) Where your static site lives (defaults to repository root)
ROOT_DIR="${ROOT_DIR:-.}"
if [ "${1-}" != "" ]; then
  ROOT_DIR="$1"
fi
export ROOT_DIR

python <<'PY'
import os
import re
import sys
from pathlib import Path

root = Path(os.environ["ROOT_DIR"]).resolve()
if not root.exists():
    sys.exit(f"Root directory {root} not found")

patterns = [
    (".html", re.compile(r"\b(src|href)\s*=\s*(['\"])\/(?!\/)"), r"\1=\2./"),
    (".css", re.compile(r"url\(\s*(['\"]?)\/(?!\/)"), r"url(\1./"),
    (".js", re.compile(r"\b(fetch|Request|import)\(\s*(['\"])\/(?!\/)"), r"\1(\2./"),
]

for suffix, regex, repl in patterns:
    for path in root.rglob(f"*{suffix}"):
        if not path.is_file():
            continue
        original = path.read_text(encoding="utf-8")
        updated = regex.sub(repl, original)
        if updated != original:
            backup = path.with_suffix(path.suffix + ".bak")
            backup.write_text(original, encoding="utf-8")
            path.write_text(updated, encoding="utf-8")

print(f"✅ Rewrote absolute paths under {root}")
print("   Backups created as *.bak next to each file.")
print("   To review changes: git diff")
PY
