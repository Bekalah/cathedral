# Repository Cleanup Manifest

Generated: $(date)

## Directory Structure Created

```
cathedral-real/
├── archive/
│   ├── old-html/        # Legacy HTML/CSS/JS demos
│   ├── old-scripts/     # Obsolete scripts
│   ├── patches/         # Git patches
│   └── temp-files/      # Temporary/log files
├── docs/
│   ├── agent-docs/      # Agent context and coordination
│   ├── development/     # Development guides
│   ├── guides/          # User guides
│   └── specs/           # Architecture and specifications
├── tools/
│   ├── automation/      # Automation scripts
│   ├── deployment/      # Deployment tools
│   └── testing/         # Test utilities
└── assets/
    ├── audio/           # Audio resources
    ├── visual/          # Visual assets
    └── data/            # Data files
```

## What Was Moved

### Archive
- Legacy HTML/CSS/JS files (arcana-alumni-gallery.html, etc.)
- Patch files (*.patch)
- Temp files (_tmp_*, old logs)

### Documentation
- Agent documentation → docs/agent-docs/
- Development guides → docs/development/
- Specifications → docs/specs/

### Tools
- Automation scripts → tools/automation/
- Deployment scripts → tools/deployment/
- Agent management tools → tools/automation/

## Still at Root Level (Important Files)

- package.json
- pnpm-workspace.yaml
- pnpm-lock.yaml
- .env, .env.example
- .gitignore
- README.md
- LICENSE
- NOTICE

## Next Steps

1. Review archived files - delete if truly obsolete
2. Update documentation to reflect new structure
3. Update import paths if needed
4. Commit organized structure
5. Update .gitignore to prevent future clutter
