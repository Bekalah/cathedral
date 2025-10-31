# Cathedral of Circuits - Architectural Analysis & Fixes

## GitHub Actions Workflow Issues Fixed

### Issues Identified:
1. **Version Inconsistencies**: Using different pnpm versions (v2 vs v4)
2. **Path Issues**: Incorrect export paths for Next.js builds
3. **Error Handling**: Missing error handling causing full failures
4. **Dependency Conflicts**: Missing workspace dependencies in CI

### Fixes Applied:

#### `deploy.yml`:
- Updated pnpm/action-setup to v4 with version 8.15.0
- Fixed Next.js export path: `./apps/web/out`
- Added error handling with continue-on-error for non-critical steps
- Simplified build process with cd apps/web && pnpm run build

#### `pages.yml`:
- Similar version consistency fixes
- Added proper workspace dependency installation
- Better error handling for build failures

## Key Architectural Improvements Needed

### 1. Package Structure Consolidation
- Merge duplicate packages: `liber-arcanae-tarot` and `liber-arcanae`
- Standardize package naming with consistent kebab-case
- Update component ownership registry for better boundary enforcement

### 2. Monorepo Configuration
- Update turbo.json for better performance
- Optimize pnpm-workspace.yaml for dependency management
- Implement proper caching strategies

### 3. Build System Optimization
- Bundle size targets: <200KB initial load
- Code splitting implementation
- Asset optimization with modern formats

### 4. Integration Improvements
- Better API standardization across Python, TypeScript, and GDScript
- Improved data validation and integrity checks
- Consistent error handling patterns

## External Repository Analysis
Cloned repositories for comparison:
- `circuitum99` (108MB, 281 files)
- `cosmogenesis-learning-engine` (2MB, 1941 files)
- `liber-arcanae` (477KB, 1548 files)

## Next Steps for Replit Transition
1. Ensure all dependencies are properly configured
2. Migrate to dynamic server-side functionality
3. Implement proper API endpoints
4. Set up database connections if needed

## Deployment Targets
- GitHub Pages: https://bekalah.github.io/cathedral
- Vercel: https://cathedral.vercel.app
- Cloudflare Pages: https://cathedral.pages.dev

## Performance Optimizations
- Core Web Vitals optimization
- Bundle splitting and lazy loading
- Caching strategies for API responses
- Static asset optimization