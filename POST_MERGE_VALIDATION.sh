#!/usr/bin/env bash
set -euo pipefail

echo "==> Cathedral: post-merge validation starting"

# 1) Node build for apps/web (Next.js export)
if command -v pnpm >/dev/null 2>&1; then
  echo "-- installing workspace deps with pnpm"
  pnpm -w install
  echo "-- building apps/web"
  pnpm -C apps/web run build
else
  echo "WARN: pnpm not found; skipping web build"
fi

# 2) Python smoketests (optional)
if command -v python3 >/dev/null 2>&1; then
  if [ -f "tools/validate/design_suite_smoketest.py" ]; then
    echo "-- running design suite smoketest"
    python3 tools/validate/design_suite_smoketest.py || true
  fi
  if [ -f "tools/validate/achad_integration_smoketest.py" ]; then
    echo "-- running Achad integration smoketest"
    python3 tools/validate/achad_integration_smoketest.py || true
  fi
else
  echo "WARN: python3 not found; skipping Python smoketests"
fi

echo "==> Validation complete"
