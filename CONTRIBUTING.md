# Contributing to Cathedral

Thank you for your interest in contributing to Cathedral. This document outlines the standards and processes for contributing to this project.

## Code of Conduct

This project maintains a trauma-informed, inclusive environment. All contributors must:

- Treat all participants with respect and dignity
- Use inclusive language
- Accept constructive criticism gracefully
- Focus on what is best for the community

## Quality Standards

### Design Quality Boundary

All visual contributions must adhere to the Design Quality Boundary documented in `openspec/DESIGN_QUALITY_BOUNDARY.md`:

- **No emoji in UI elements**
- **No cartoon gradients** — Use atmospheric depth instead
- **No pill buttons** — Use text links with subtle underlines
- **No card grids** — Use asymmetric, breathing layouts
- **Typography** — Bodoni Moda for display, DM Sans for body
- **Colors** — Obsidian, burnished gold, champagne palette only

### Code Quality

- All packages must have real implementations (no stubs)
- No placeholder content (TODO, TBD, Lorem ipsum)
- Documentation must accurately describe functionality
- All JSON must be valid and non-empty
- TypeScript strict mode enabled

### Integrity Protection

Before submitting:

```bash
pnpm run validate:integrity
pnpm run check:design
```

Both must pass without errors.

## Development Process

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/cathedral.git
cd cathedral
pnpm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Follow the quality standards above.

### 4. Test

```bash
pnpm build
pnpm validate:integrity
pnpm check:design
```

### 5. Commit

Use conventional commits:

```
feat: add new sacred geometry pattern
fix: correct frequency calculation
docs: update codex documentation
style: improve typography spacing
```

### 6. Submit Pull Request

- Describe what changes you made
- Reference any related issues
- Ensure all checks pass

## Package Structure

New packages should follow this structure:

```
packages/your-package/
├── package.json          # With @cathedral/ namespace
├── tsconfig.json         # Extends base config
├── README.md             # Accurate documentation
└── src/
    └── index.ts          # Real exports
```

### package.json Requirements

```json
{
  "name": "@cathedral/your-package",
  "version": "1.0.0",
  "description": "Accurate description of functionality",
  "author": "Your Name",
  "license": "CC0-1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/Bekalah/cathedral.git",
    "directory": "packages/your-package"
  },
  "engines": {
    "node": ">=20.18.0",
    "pnpm": ">=9.14.2"
  }
}
```

## Data Contributions

### Adding Research Data

1. Place in appropriate `data/` subdirectory
2. Use kebab-case filenames
3. Ensure valid JSON
4. Document in `DATA_INVENTORY.md`

### Data Quality

- No empty arrays or objects
- Real, verified information only
- Include source attribution
- Keep largest/most complete version

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

---

*Cathedral is a sacred space. Contribute with intention.*
