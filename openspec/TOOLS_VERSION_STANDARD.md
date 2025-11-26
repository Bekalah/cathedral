# Tools Version Standard - OpenSpec

**Status**: REQUIRED  
**Enforcement**: MANDATORY  
**Last Updated**: 2025-11-26

## Standard Versions

All tools MUST use these exact versions:

### Core Tools
- **Node.js**: `20.18.0` (LTS)
- **pnpm**: `8.15.0`
- **Turbo**: `2.0.0`
- **TypeScript**: `5.6.0`
- **Rust**: `stable` (latest stable)

### Package Managers
- **JavaScript/TypeScript**: pnpm only (npm FORBIDDEN)
- **Rust**: Cargo (native Rust package manager)

## Enforcement

### Configuration Files
- ✅ `.nvmrc` - Node.js version
- ✅ `package.json` - packageManager and engines
- ✅ `turbo.json` - packageManager enforcement
- ✅ `.npmrc` - pnpm-only configuration

### All package.json Files
Every package.json MUST have:
```json
{
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=20.18.0",
    "pnpm": ">=8.15.0"
  }
}
```

### TypeScript
All TypeScript projects MUST use:
```json
{
  "devDependencies": {
    "typescript": "5.6.0"
  }
}
```

## Custom Tools

### Cathedral CLI
- **Location**: `packages/cathedral-cli/`
- **Version**: 1.0.0
- **Type**: Node.js CLI tool
- **Package Manager**: pnpm

### Cathedral Tools
- **Location**: `packages/cathedral-tools/`
- **Version**: 1.0.0
- **Type**: Utility package
- **Package Manager**: pnpm

### Cathedral Plugin System
- **Location**: `packages/cathedral-plugin-system/`
- **Version**: 1.0.0
- **Type**: Plugin framework
- **Package Manager**: pnpm

### Rust Tools
- **Location**: `rust-engines/`
- **Type**: Rust workspace
- **Package Manager**: Cargo
- **Framework**: Dioxus (free, open-source)

## Commands

```bash
# Review all tools and versions
pnpm run review:tools

# Standardize all tool versions
pnpm run standardize:tools

# Audit tool versions
pnpm run audit:tools
```

## Violations

If tools don't match standard versions:
- CI/CD will fail
- Pre-commit hooks will reject
- Build system will error

**This standard is permanent and non-negotiable.**

