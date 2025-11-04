CATHEDRAL LIGHT GIT KIT (v1)

Put these files in the root of each repo.
Then do the Setup (2 steps) below.

0) Files to add (exact names)

A) .gitattributes  — LFS for big rasters (safe for all repos)


*.png  filter=lfs diff=lfs merge=lfs -text
*.tif  filter=lfs diff=lfs merge=lfs -text
*.tiff filter=lfs diff=lfs merge=lfs -text
*.exr  filter=lfs diff=lfs merge=lfs -text
*.hdr  filter=lfs diff=lfs merge=lfs -text
*.webp filter=lfs diff=lfs merge=lfs -text

B) .gitignore — pick ONE of these; rename to .gitignore

Option 1 — ART-HEAVY (use for cosmogenesis-learning-engine, magical-mystery-house):

# keep giant masters local; ship runtime builds
assets/figures-src/
*.kra
*.blend
*.procreate

# caches & OS
.DS_Store
Thumbs.db
__pycache__/
*.pyc





Option 2 — LIGHT (use for tesseract-bridge, circuitum99, liber-arcanae, liber-arcanae-game, codex-14499):

.DS_Store
Thumbs.db
__pycache__/
*.pyc


C) core/pull_ids.py — pull canon IDs from Bridge (source of truth)

#!/usr/bin/env python3
import os, sys, json, argparse
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--bridge", default=os.environ.get("BRIDGE","../tesseract-bridge"))
    ap.add_argument("--src", default="registry/ids.json")
    ap.add_argument("--dest", default="core/registry/ids.json")
    args = ap.parse_args()
    src = os.path.join(args.bridge, args.src)
    if not os.path.exists(src): print(f"✗ not found: {src}"); sys.exit(1)
    os.makedirs(os.path.dirname(args.dest), exist_ok=True)
    j = json.load(open(src,"r",encoding="utf-8"))
    out = {"_generated_from":"tesseract-bridge/registry/ids.json","_note":"DO NOT EDIT HERE.", **j}
    json.dump(out, open(args.dest,"w",encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"✓ pulled canon IDs → {args.dest}")
if __name__ == "__main__": main()

D) core/check_ids.py — quick health check (are IDs valid?)

#!/usr/bin/env python3
import os, sys, json, argparse, glob, re
ID_PATTERNS = {
  "nodes": re.compile(r"C144N-\d{3}"),
  "rooms": re.compile(r"\bR\d{3}\b"),
  "chapels": re.compile(r"\bC33-\d{2}\b"),
  "arcana": re.compile(r"\bLA-\d{2}-[A-Z-]+\b"),
  "shem": re.compile(r"\bSHEM-\d{2}\b")
}
SEARCH_GLOBS = ["**/*.json","**/*.md"]
def load_ids(bridge_root):
  p = os.path.join(bridge_root, "registry", "ids.json")
  return json.load(open(p,"r",encoding="utf-8"))
def files(globs):
  out=[]; [out.extend(glob.glob(g, recursive=True)) for g in globs]; return [f for f in out if os.path.isfile(f)]
def main():
  ap=argparse.ArgumentParser()
  ap.add_argument("--bridge", default=os.environ.get("BRIDGE","../tesseract-bridge"))
  args=ap.parse_args()
  ids = load_ids(args.bridge)
  universe = {k:set(ids.get(k,[])) for k in ID_PATTERNS}
  unknown=[]
  for f in files(SEARCH_GLOBS):
    try:
      txt=open(f,"r",encoding="utf-8",errors="ignore").read()
      for kind,pat in ID_PATTERNS.items():
        for m in pat.findall(txt):
          if m not in universe[kind]: unknown.append((f,kind,m))
    except: pass
  if unknown:
    print("✗ unknown IDs:"); [print(f" - {f}: {k} → {v}") for f,k,v in unknown]; sys.exit(1)
  print("✓ IDs consistent with Bridge")
if __name__=="__main__": main()

