## 1. Analysis and Preparation

- [ ] 1.1 Inventory all current packages and identify duplicates
- [ ] 1.2 Map all import dependencies across the codebase
- [ ] 1.3 Document current deployment configurations
- [ ] 1.4 Create backup procedures and rollback strategy
- [ ] 1.5 Set up monitoring for build/deployment health

## 2. Package Consolidation

- [ ] 2.1 Merge `external/codex-144-99/` into `packages/codex-144-99/`
- [ ] 2.2 Merge `external/liber-arcanae/` into `packages/liber-arcanae/`
- [ ] 2.3 Consolidate similar apps (tarot-arena + liber-arcanae-tarot)
- [ ] 2.4 Update all import references across codebase
- [ ] 2.5 Remove duplicate directories
- [ ] 2.6 Validate package.json files for consistency

## 3. Data Centralization

- [ ] 3.1 Create `data/canonical/` directory structure
- [ ] 3.2 Consolidate all arcana data into single sources
- [ ] 3.3 Move game data from scattered locations to `data/game/`
- [ ] 3.4 Create data synchronization scripts
- [ ] 3.5 Update all packages to use canonical data sources
- [ ] 3.6 Add data validation pipeline

## 4. Godot 4.5 + Rust Optimization

- [ ] 4.1 Create unified `packages/godot-bridge/`
- [ ] 4.2 Optimize Rust bindings in `engine/godot-rust/`
- [ ] 4.3 Implement WebAssembly export pipeline
- [ ] 4.4 Create game viewer component for web integration
- [ ] 4.5 Add Godot export commands to turbo.json
- [ ] 4.6 Test Godot-Web communication bridge

## 5. Deployment Unification

- [ ] 5.1 Create unified deployment configurations
- [ ] 5.2 Add single build commands for all platforms
- [ ] 5.3 Optimize Cloudflare Pages deployment
- [ ] 5.4 Update Vercel configuration for consistency
- [ ] 5.5 Enhance GitHub Pages workflow
- [ ] 5.6 Add deployment health checks

## 6. OpenSpec Integration

- [ ] 6.1 Update repository structure specification
- [ ] 6.2 Add deployment specification for unified configs
- [ ] 6.3 Update data management capabilities
- [ ] 6.4 Add Godot integration specifications
- [ ] 6.5 Run OpenSpec validation on all changes
- [ ] 6.6 Update AGENTS.md if needed

## 7. Performance Optimization

- [ ] 7.1 Audit and optimize bundle sizes
- [ ] 7.2 Improve Turbo cache utilization
- [ ] 7.3 Optimize dependency graph
- [ ] 7.4 Reduce duplicate dependencies
- [ ] 7.5 Benchmark build times before/after

## 8. Testing and Validation

- [ ] 8.1 Test all apps individually
- [ ] 8.2 Validate cross-package functionality
- [ ] 8.3 Test deployments on all platforms
- [ ] 8.4 Performance testing and optimization
- [ ] 8.5 User acceptance testing for key workflows

## 9. Documentation and Cleanup

- [ ] 9.1 Update README files and architecture docs
- [ ] 9.2 Create migration guide for developers
- [ ] 9.3 Clean up old files and directories
- [ ] 9.4 Update deployment documentation
- [ ] 9.5 Add performance improvement metrics

## 10. Final Deployment

- [ ] 10.1 Deploy consolidated master cathedral
- [ ] 10.2 Verify all platforms work correctly
- [ ] 10.3 Monitor deployment health
- [ ] 10.4 Archive this change in OpenSpec
- [ ] 10.5 Celebrate the successful V1.0 consolidation! 🎉