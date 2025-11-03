#!/usr/bin/env python3
"""
Ingest external sources defined in external/import_map.json.
- Downloads online sources into external/snapshots/<date>/
- Copies offline files into external/offline/... without overwriting by default
- Writes a .provenance.json next to each imported file

Run locally where the offline paths are accessible.
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path

try:
    import requests  # type: ignore
except Exception:
    requests = None

ROOT = Path(__file__).resolve().parents[2]
MAP_PATH = ROOT / "external" / "import_map.json"
SNAP_ROOT = ROOT / "external" / "snapshots"


def sha256_bytes(data: bytes) -> str:
    h = hashlib.sha256()
    h.update(data)
    return h.hexdigest()


def ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def write_provenance(target_file: Path, source: str, source_type: str, digest: str) -> None:
    prov = {
        "source": source,
        "type": source_type,
        "sha256": digest,
        "imported_at": dt.datetime.utcnow().isoformat() + "Z",
    }
    with open(target_file.with_suffix(target_file.suffix + ".provenance.json"), "w", encoding="utf-8") as f:
        json.dump(prov, f, indent=2)


def download_url(url: str, out_dir: Path, name: str = "index.html") -> Path:
    if requests is None:
        raise RuntimeError("requests not installed; pip install requests")
    ensure_dir(out_dir)
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    data = resp.content
    out_file = out_dir / name
    out_file.write_bytes(data)
    write_provenance(out_file, url, "online", sha256_bytes(data))
    return out_file


def copy_offline(source: Path, target: Path) -> list[Path]:
    ensure_dir(target)
    written = []
    if source.is_file():
        data = source.read_bytes()
        dest = target / source.name
        if not dest.exists():
            dest.write_bytes(data)
            write_provenance(dest, str(source), "offline", sha256_bytes(data))
            written.append(dest)
        return written

    for root, dirs, files in os.walk(source):
        # Skip .git and node_modules by default
        if ".git" in dirs:
            dirs.remove(".git")
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        base = Path(root)
        rel = base.relative_to(source)
        dest_dir = target / rel
        ensure_dir(dest_dir)
        for fn in files:
            src_file = base / fn
            dest_file = dest_dir / fn
            if dest_file.exists():
                continue
            data = src_file.read_bytes()
            dest_file.write_bytes(data)
            write_provenance(dest_file, str(src_file), "offline", sha256_bytes(data))
            written.append(dest_file)
    return written


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--no-online", action="store_true", help="Skip online retrieval")
    parser.add_argument("--no-offline", action="store_true", help="Skip offline copy")
    args = parser.parse_args()

    with open(MAP_PATH, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    today = dt.datetime.utcnow().strftime("%Y-%m-%d")
    snap_dir = SNAP_ROOT / today

    if not args.no_online:
        online = cfg.get("online", {})
        if online.get("github_pages", {}).get("enabled"):
            url = online["github_pages"]["url"]
            download_url(url, snap_dir, name="github_pages_main.html")
        if online.get("replit", {}).get("enabled") and online["replit"].get("url"):
            url = online["replit"]["url"]
            download_url(url, snap_dir, name="replit_main.html")

    if not args.no_offline:
        for entry in cfg.get("offline", {}).get("paths", []):
            src = Path(entry["source"]).expanduser()
            tgt = ROOT / entry["target"]
            if not src.exists():
                print(f"[warn] offline path missing: {src}")
                continue
            print(f"[copy] {src} -> {tgt}")
            copy_offline(src, tgt)

    print("done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
