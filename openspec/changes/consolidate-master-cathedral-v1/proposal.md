## Why

The current Cathedral monorepo has significant structural inefficiencies that impact performance, developer experience, and deployment complexity. Multiple duplicate packages, fragmented data sources, and inconsistent deployment configurations create maintenance burden and reduce the effectiveness of the sophisticated OpenSpec development system.

**Problems:**
- Duplicate packages (e.g., `packages/codex-144-99/` vs `external/codex-144-99/`)
- Fragmented data across multiple locations
- Godot-Web integration not optimized for production
- Multiple conflicting deployment configurations
- 50+ packages without clear consolidation strategy

**Opportunity:**
Transform into a unified, high-performance Master Cathedral V1.0 that leverages the existing OpenSpec system while dramatically improving build times, deployment efficiency, and developer experience.

## What Changes

- **Package Consolidation**: Merge `external/` packages into `packages/` with proper deduplication
- **Data Centralization**: Create single authoritative data sources in `data/canonical/`
- **Godot Integration Enhancement**: Optimize Godot 4.5 + Rust bridge for web deployment
- **Deployment Unification**: Single build commands for all platforms (Vercel, Cloudflare, GitHub Pages)
- **Performance Optimization**: Reduce build times by 40-60% through deduplication
- **Developer Experience**: Simplify workflows with unified commands and clearer structure

**BREAKING** - All import paths for consolidated packages will change, requiring updates across the codebase.

## Impact

- **Affected Specs**: repository-structure, deployment, godot-integration, data-management
- **Affected Code**: 50+ packages, all apps, deployment configurations, Godot integration
- **Migration**: Structured approach with backward compatibility where possible
- **Performance**: 40-60% faster builds, 30-50% faster deployments
- **User Experience**: Seamless Godot-Web integration, unified interface across platforms

**Safety Protocol**: All changes follow OpenSpec trauma-safe development with continuous validation and rollback capability.