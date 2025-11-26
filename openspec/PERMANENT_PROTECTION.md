# 🔒 PERMANENT PROTECTION

**This project has permanent protections against being flattened, spammed, or degraded.**

---

## Protection Layers

### 1. Pre-Commit Hook (`.husky/pre-commit`)

Every commit is checked for:
- ❌ Emoji in UI components
- ❌ Console injection spam
- ❌ Echo scripts in package.json
- ❌ npm commands (we use pnpm only)

**Cannot be bypassed without removing the hook file.**

### 2. Design Quality Boundary (`openspec/DESIGN_QUALITY_BOUNDARY.md`)

Enforces:
- No cartoon gradients
- No pill buttons
- No card grids
- No ALL CAPS screaming
- Approved color palette only
- Approved typography only

### 3. Integrity Protection (`openspec/INTEGRITY_PROTECTION.md`)

Enforces:
- Real implementations (no stubs)
- Accurate documentation
- Consistent versions
- No placeholder content

### 4. Validation Scripts

```bash
pnpm run validate:integrity  # Check all packages
pnpm run check:design        # Check visual design
pnpm run protect:all         # Run all protections
```

---

## What Gets Blocked

### Commits are BLOCKED if they contain:

1. **Emoji in UI** — `🎮 Begin Game` → BLOCKED
2. **Console spam** — `oo_cm()`, `oo_tr()` → BLOCKED
3. **Echo scripts** — `"build": "echo Building..."` → BLOCKED
4. **npm commands** — `npm install` → WARNING

### Pull Requests are BLOCKED if they contain:

1. **Stub packages** — Empty src/index.ts
2. **Placeholder text** — TODO, TBD, Lorem ipsum
3. **Wrong versions** — Mismatched Node/pnpm versions
4. **Missing metadata** — No author, no description

---

## How to Bypass (Emergency Only)

If you absolutely must bypass:

```bash
git commit --no-verify -m "Emergency: reason"
```

**But know that:**
- This is logged
- It will be reviewed
- You better have a good reason

---

## Why This Exists

This project was nearly destroyed by:
- AI tools generating spam code
- Generic "helpful" changes that flattened the design
- Placeholder content presented as real
- Console injection from debugging tools
- npm/yarn confusion

**Never again.**

The Cathedral is a sacred space. These protections keep it that way.

---

## Maintaining Protection

### Adding New Rules

Edit `.husky/pre-commit` to add new checks.

### Updating Standards

Edit `openspec/DESIGN_QUALITY_BOUNDARY.md` or `openspec/INTEGRITY_PROTECTION.md`.

### Running Manually

```bash
# Check everything
pnpm run protect:all

# Fix what can be fixed automatically
pnpm run fix:integrity

# Clean up junk
pnpm run cleanup:junk
```

---

*The Cathedral stands. The walls hold.*

