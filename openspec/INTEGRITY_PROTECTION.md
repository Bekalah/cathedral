# INTEGRITY PROTECTION SYSTEM

**This protects EVERY tool, app, package, and document from:**
- Documentation that doesn't match code
- Wrong versions
- Made-up/placeholder content
- Spam and artifacts
- Inconsistency across the monorepo

---

## THE PROTECTION RULES

### 1. DOCUMENTATION MUST MATCH CODE

Every package's README must accurately describe what the code actually does.

**Violations:**
- README says "144 nodes" but code only has 50
- README claims features that don't exist
- README describes different API than code exports

**Enforcement:**
- Automated check compares README claims to actual exports
- Package descriptions must match `package.json` description
- Feature lists must have corresponding code

### 2. VERSION CONSISTENCY

All packages must use consistent, real versions.

**Standard Versions:**
```
Node.js: 20.18.0
pnpm: 9.14.2
TypeScript: 5.6.3
Turbo: 2.2.3
```

**Violations:**
- Mixed Node versions across packages
- `"version": "0.0.0"` placeholder versions
- Dependencies with `"*"` or missing versions

### 3. NO MADE-UP CONTENT

**Violations:**
- Placeholder text: `"TODO"`, `"Lorem ipsum"`, `"TBD"`
- Fake data: Empty arrays pretending to be full
- Stub functions that just `console.log`
- Echo scripts (`echo "Building..."`)

**Real Content Only:**
- Actual implementations
- Real data from research
- Working functions

### 4. NO SPAM OR ARTIFACTS

**Violations:**
- Console injection code (`oo_cm`, `oo_tr`, `2184609590`)
- Duplicate files with slight variations
- Empty packages with just `package.json`
- Generated files committed to repo

### 5. CONSISTENT METADATA

Every `package.json` must have:
```json
{
  "name": "@cathedral/package-name",
  "version": "1.0.0",
  "description": "Accurate description of what this does",
  "author": "Rebecca Respawn <bekalah>",
  "license": "CC0-1.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/Bekalah/cathedral.git",
    "directory": "packages/package-name"
  },
  "homepage": "https://bekalah.github.io/cathedral",
  "packageManager": "pnpm@9.14.2",
  "engines": {
    "node": ">=20.18.0",
    "pnpm": ">=9.14.2"
  }
}
```

---

## PROTECTED ARTIFACTS

### Packages (64+)
Every package in `/packages/` is protected:
- Must have real `src/index.ts` with actual exports
- Must have accurate `package.json`
- Must have README that matches reality
- Must build without errors

### Apps (5+)
Every app in `/apps/` is protected:
- Must have working entry point
- Must follow design quality boundary
- Must have accurate description

### Documents
Every markdown file is protected:
- Must describe reality, not aspirations
- Must be updated when code changes
- Must not contain placeholder text

### Data Files
Every JSON/data file is protected:
- Must contain real data
- Must be valid JSON
- Must not be empty or stub

---

## VALIDATION CHECKLIST

Before any commit, validate:

- [ ] All package.json have real versions (not 0.0.0)
- [ ] All package.json have accurate descriptions
- [ ] All README files describe actual functionality
- [ ] No placeholder text (TODO, TBD, Lorem)
- [ ] No console injection spam
- [ ] No echo scripts in build commands
- [ ] No empty src directories
- [ ] All exports actually exist
- [ ] All dependencies are real packages
- [ ] Version numbers are consistent across repo

---

## RECOVERY FROM VIOLATIONS

If violations are found:

1. **Wrong Versions**: Run `scripts/standardize-all-tool-versions.sh`
2. **Made-up Content**: Replace with real implementation or remove
3. **Spam**: Run `scripts/remove-console-injection.sh`
4. **Empty Packages**: Either implement or remove entirely
5. **Mismatched Docs**: Update docs to match reality

---

## THIS IS PERMANENT

This protection system exists because of a catastrophic failure where:
- Documentation claimed features that didn't exist
- Versions were inconsistent and wrong
- Placeholder content was presented as real
- Spam polluted the codebase

**Never again.**

