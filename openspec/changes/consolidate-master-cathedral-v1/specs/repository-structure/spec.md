## ADDED Requirements

### Requirement: Consolidated Package Architecture

The Cathedral monorepo SHALL provide a unified package structure that eliminates redundancies and optimizes for performance.

#### Scenario: Package deduplication complete
- **WHEN** all external/ packages are merged into packages/ with proper import paths
- **THEN** the codebase has single source of truth for each capability

#### Scenario: Clear separation of concerns
- **WHEN** packages are organized by function (core, game, web, data)
- **THEN** developers can easily locate and modify relevant code

### Requirement: Godot 4.5 + Rust Integration Bridge

The monorepo SHALL provide seamless integration between Godot game engine and web applications.

#### Scenario: Unified Godot bridge
- **WHEN** packages/godot-bridge/ provides TypeScript interfaces for Rust bindings
- **THEN** web applications can communicate with Godot engine through standardized APIs

#### Scenario: WebAssembly deployment
- **WHEN** Godot games can export to WebAssembly and embed in web apps
- **THEN** users can play games directly in the browser without separate installation

## MODIFIED Requirements

### Requirement: Repository Structure

The repository structure SHALL be reorganized to eliminate duplicate packages and create clearer organizational boundaries.

**Previous Structure:**
- Multiple duplicate packages across external/ and packages/
- Scattered data files across various locations
- Inconsistent build configurations

**New Structure:**
```
cathedral-master-v1/
├── packages/           # Single authoritative source
├── apps/              # Unified application interfaces  
├── data/canonical/    # Single data source
├── godot/             # Godot 4.5 integration
├── engine/            # Rust bindings
└── deployment/        # Unified configs
```

#### Scenario: Consolidated packages
- **WHEN** external/codex-144-99/ merges into packages/codex-144-99/
- **THEN** all imports reference the single authoritative source

#### Scenario: Data centralization
- **WHEN** all data moves to data/canonical/ with sync scripts
- **THEN** packages consume consistent, validated data sources

## REMOVED Requirements

### Requirement: Redundant Package Instances

The monorepo SHALL NOT maintain duplicate packages across multiple directories.

**Reason**: Duplicate packages create maintenance burden and dependency conflicts
**Migration**: All code migrated to consolidated locations with updated import paths

#### Scenario: Duplicate removal complete
- **WHEN** external/ directory is removed after migration
- **THEN** no package exists in multiple locations