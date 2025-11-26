# pnpm-Only Policy - OpenSpec

**Status**: REQUIRED  
**Security Level**: CRITICAL  
**Enforcement**: MANDATORY

## Policy

This repository **MUST** use pnpm only. npm is **FORBIDDEN** for security reasons.

### Why pnpm Only?

1. **Security**: pnpm has better security features than npm
2. **Performance**: pnpm is faster and uses less disk space
3. **Consistency**: Single package manager prevents conflicts
4. **Reliability**: pnpm's strict dependency resolution prevents issues

### Enforcement

- ✅ `.npmrc` enforces pnpm
- ✅ Pre-commit hooks prevent npm files
- ✅ GitHub Actions check for npm usage
- ✅ All scripts use pnpm only
- ✅ All package.json files specify pnpm

### Rules

1. **NEVER** use `npm install`, `npm run`, `npm ci`, `npx`
2. **ALWAYS** use `pnpm install`, `pnpm run`, `pnpm exec`
3. **NEVER** commit `package-lock.json`
4. **ALWAYS** use `pnpm-lock.yaml`

### Violations

If npm is detected:
- Pre-commit hook will reject the commit
- CI/CD will fail
- Scripts will error

### Commands

```bash
# Install dependencies
pnpm install

# Run scripts
pnpm run <script>

# Execute packages
pnpm exec <package>

# Audit
pnpm audit
```

**This policy is permanent and non-negotiable.**
