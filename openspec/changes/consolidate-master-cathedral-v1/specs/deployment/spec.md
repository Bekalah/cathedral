## ADDED Requirements

### Requirement: Unified Build Commands

The Cathedral deployment system SHALL provide single commands that build for all platforms simultaneously.

#### Scenario: Single build command
- **WHEN** `pnpm run build:all` executes successfully
- **THEN** all applications, packages, and Godot games are built and ready for deployment

#### Scenario: Platform-specific deployment
- **WHEN** `pnpm run deploy:vercel` executes
- **THEN** the latest build deploys to Vercel with proper optimization

### Requirement: Free Tier Optimization

The deployment system SHALL optimize for maximum efficiency within free hosting tier limits.

#### Scenario: GitHub Pages optimization
- **WHEN** apps/web exports to static files
- **THEN** GitHub Pages receives optimized static assets under size limits

#### Scenario: Vercel optimization
- **WHEN** Next.js builds for production
- **THEN** Vercel deployment uses optimal edge regions and caching

#### Scenario: Cloudflare Pages optimization
- **WHEN** static files deploy to Cloudflare
- **THEN** Edge network provides global CDN acceleration

## MODIFIED Requirements

### Requirement: Multi-Platform Deployment

The deployment system SHALL support unified deployment across GitHub Pages, Vercel, and Cloudflare Pages with consistent build outputs.

**Previous Behavior:**
- Separate build processes for each platform
- Conflicting deployment configurations
- Inconsistent build artifacts

**New Behavior:**
- Single build process creates platform-specific artifacts
- Unified deployment configurations
- Consistent build outputs with platform optimization

#### Scenario: Consistent deployment pipeline
- **WHEN** all platforms use the same build artifacts
- **THEN** deployment behavior is predictable across all services

#### Scenario: Optimized Godot web export
- **WHEN** Godot games export to WebAssembly
- **THEN** web applications can embed games seamlessly

## REMOVED Requirements

### Requirement: Platform-Specific Build Scripts

The deployment system SHALL NOT maintain separate build processes for each platform.

**Reason**: Multiple build processes create inconsistency and maintenance burden
**Migration**: Single build process generates all necessary artifacts for each platform

#### Scenario: Reduced configuration complexity
- **WHEN** deployment configs are unified
- **THEN** developers maintain single source of truth for deployment behavior