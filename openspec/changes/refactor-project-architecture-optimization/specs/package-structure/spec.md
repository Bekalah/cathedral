## MODIFIED Requirements

### Requirement: Package Structure Standardization

All packages in the monorepo SHALL follow a consistent naming convention and directory structure aligned with OpenSpec master version 1.0.

#### Scenario: Package Naming Convention

- **WHEN** a new package is created
- **THEN** it SHALL use kebab-case naming (e.g., `cosmogenesis-learning-engine`)
- **AND** SHALL match one of the core capability boundaries defined in OpenSpec

#### Scenario: Package Directory Structure

- **WHEN** a package is structured
- **THEN** it SHALL have consistent directories: `src/`, `tests/`, `docs/`, `package.json`
- **AND** SHALL follow the component ownership registry

## MODIFIED Requirements

### Requirement: Monorepo Configuration

The turbo.json and pnpm-workspace.yaml SHALL be optimized for performance and maintainability.

#### Scenario: Build Pipeline Optimization

- **WHEN** turbo.json is configured
- **THEN** it SHALL enable proper caching and parallelization
- **AND** SHALL define clear task dependencies
- **AND** SHALL support all supported runtimes (Node.js, Python, Godot)

#### Scenario: Dependency Management

- **WHEN** pnpm-workspace.yaml is configured
- **THEN** it SHALL properly declare all workspace packages
- **AND** SHALL prevent circular dependencies
- **AND** SHALL optimize installation performance

## ADDED Requirements

### Requirement: Package Consolidation

Duplicate or redundant packages SHALL be consolidated to reduce maintenance overhead.

#### Scenario: Duplicate Package Identification

- **WHEN** packages with overlapping functionality are identified
- **THEN** they SHALL be merged into a single package
- **OR** SHALL be clearly differentiated by scope

#### Scenario: Migration Path

- **WHEN** packages are consolidated
- **THEN** migration guides SHALL be provided
- **AND** backward compatibility SHALL be maintained where possible