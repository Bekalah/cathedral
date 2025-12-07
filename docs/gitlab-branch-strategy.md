# Cathedral Real - GitLab Branch Strategy & Protection Rules

## Branch Strategy Overview

The Cathedral Real repository follows a GitFlow-inspired branch strategy optimized for the Turbo + pnpm monorepo architecture.

### Primary Branches

#### `main` (Production)
- **Purpose**: Production-ready code
- **Protection Level**: Maximum
- **Deployment**: Auto-deploys to staging, manual approval for production
- **Merge Requirements**:
  - All pipelines must pass
  - Minimum 2 approvals required
  - Code review from maintainers
  - No merge conflicts
  - All CI/CD checks must succeed

#### `develop` (Integration)
- **Purpose**: Integration branch for feature development
- **Protection Level**: High
- **Deployment**: Auto-deploys to staging
- **Merge Requirements**:
  - All pipelines must pass
  - Minimum 1 approval required
  - All CI/CD checks must succeed

### Supporting Branches

#### Feature Branches
**Pattern**: `feature/feature-name`
**Purpose**: Individual feature development
**Lifecycle**: 
- Created from `develop`
- Merged back to `develop` via merge request
- Deleted after merge

#### Release Branches
**Pattern**: `release/v1.2.3`
**Purpose**: Release preparation and testing
**Lifecycle**:
- Created from `develop` 
- Merged to `main` and `develop`
- Maintained until release completion

#### Hotfix Branches
**Pattern**: `hotfix/critical-fix-name`
**Purpose**: Critical production fixes
**Lifecycle**:
- Created from `main`
- Merged to `main` and `develop`
- Deleted after merge

#### Documentation Branches
**Pattern**: `docs/doc-update-name`
**Purpose**: Documentation improvements
**Protection Level**: Medium
- Can be merged without approval if only documentation changes

## Branch Protection Configuration

### Main Branch Protection
```yaml
main:
  # Prevent direct pushes
  push_access_level: no_one
  
  # Merge restrictions
  merge_access_level: maintainer
  
  # Required status checks
  required_status_checks:
    strict: true  # Require up-to-date branch
    checks:
      - validate_repository
      - test:node18
      - test:node20  
      - test:node22
      - build_packages
      - build_health
      - quality_validation
      - security_audit
  
  # Required approvals
  required_approving_review_count: 2
  dismissal_restrictions:
    users: []
    teams: ["maintainers"]
  
  # Code owner approval
  code_owner_approval_required: true
  
  # Restrictions
  push_rules:
    - reject_unsigned_commits: true
    - reject_secrets_commits: true
    - require_linear_history: true
    - max_file_size: 50MB
```

### Develop Branch Protection
```yaml
develop:
  # Prevent direct pushes to main files
  push_access_level: developer
  push_rules:
    - reject_unsigned_commits: true
    - require_linear_history: true
  
  # Merge restrictions
  merge_access_level: maintainer
  
  # Required status checks
  required_status_checks:
    strict: false
    checks:
      - validate_repository
      - test:node18
      - test:node20
      - test:node22
      - build_packages
      - quality_validation
  
  # Required approvals
  required_approving_review_count: 1
```

### Feature Branch Protection
```yaml
feature/*:
  # Allow pushes by feature developers
  push_access_level: developer
  
  # Allow merges
  merge_access_level: developer
  
  # Basic validation
  required_status_checks:
    strict: false
    checks:
      - validate_repository
      - test:node18
  
  # Optional approvals for larger features
  required_approving_review_count: 1
  required_approving_review_count: 0  # For small updates
  
  # Code owner approval for sensitive areas
  code_owner_approval_required:
    - packages/cathedral-architect/
    - packages/cathedral-data-core/
```

## Merge Request (MR) Policies

### MR Templates

#### Standard Feature MR
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Performance testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Tests pass locally
- [ ] TypeScript types updated
```

#### Hotfix MR
```markdown
## Critical Fix
- **Issue**: [Link to issue]
- **Severity**: Critical/High/Medium
- **Impact**: Production users affected
- **Fix Description**: What was changed and why

## Testing
- [ ] Reproduced issue locally
- [ ] Fix validated
- [ ] No regression introduced
- [ ] Smoke tests passed

## Approval
- [ ] Maintainer approval
- [ ] Code review completed
```

### MR Review Process

#### Reviewers Assignment
- **Code Owner Review**: Automatic assignment based on `CODEOWNERS` file
- **Feature-specific Review**: Domain experts for specialized areas
- **Cross-team Review**: For architectural or significant changes

#### Review Checklist
- [ ] Code quality and standards
- [ ] Test coverage and quality
- [ ] Documentation completeness
- [ ] Security considerations
- [ ] Performance impact
- [ ] Breaking change assessment
- [ ] Integration compatibility

#### Review Guidelines
- **Response Time**: 24 hours for initial review
- **Review Size**: Max 400 lines per review session
- **Approval Time**: Maintainer approval within 48 hours
- **Merge Timing**: Merge within 24 hours of approval

## Code Owners Configuration

### CODEOWNERS File
```
# Cathedral Core
/packages/cathedral-architect/ @maintainers @cathedral-core
/packages/cathedral-data-core/ @maintainers @cathedral-core
/packages/cathedral-lightweight-library/ @maintainers @cathedral-core

# Art & Creative Systems
/packages/art-engine-core/ @maintainers @art-team
/packages/art-systems/ @maintainers @art-team
/packages/art-generation-node/ @maintainers @art-team

# Game & Experience Systems  
/packages/cosmogenesis/ @maintainers @game-team
/packages/stone-grimoire-core/ @maintainers @game-team
/packages/avatar-experience-system/ @maintainers @game-team

# Audio & Synthesis
/packages/cathedral-audio-synthesis/ @maintainers @audio-team
/packages/sonic-physics-engine/ @maintainers @audio-team
/packages/synth-labs/ @maintainers @audio-team

# Documentation & Quality
/docs/ @maintainers @docs-team
.github/ @maintainers @devops-team
.gitlab-ci.yml @maintainers @devops-team
vercel.json @maintainers @devops-team
```

## Automated Checks

### Pre-commit Hooks
- TypeScript type checking
- ESLint validation
- Prettier formatting
- Unit test execution
- Security scanning

### CI/CD Pipeline Integration
- Automatic MR creation from push to feature branches
- Pipeline status reporting in MR discussions
- Automated merge when conditions are met
- Rollback triggers on failed deployments

### Quality Gates
- **Minimum Test Coverage**: 80%
- **Code Quality Score**: 85/100
- **Security Scan**: No critical/high vulnerabilities
- **Performance Benchmark**: No degradation >5%
- **Bundle Size**: Max 10% increase

## Deployment Gates

### Staging Deployment
- **Trigger**: Merge to `main` or `develop`
- **Approval**: Automatic
- **Environment**: Staging
- **URL**: https://cathedral-staging.vercel.app

### Production Deployment  
- **Trigger**: Manual approval after staging validation
- **Approval**: Maintainer approval required
- **Environment**: Production
- **URL**: https://cathedralofcircuits.vercel.app
- **Rollback**: Automatic if health checks fail

## Monitoring & Alerts

### Success Metrics
- MR merge rate
- Pipeline success rate
- Deployment frequency
- Mean time to recovery (MTTR)

### Alerting Rules
- Pipeline failure rate >20%
- Production deployment failures
- Security vulnerabilities detected
- Performance regression detected

## Emergency Procedures

### Critical Bug Fix
1. Create hotfix branch from `main`
2. Implement fix with minimal changes
3. Fast-track review process
4. Deploy directly to production
5. Merge back to `main` and `develop`

### Rollback Procedure
1. Identify problematic deployment
2. Trigger rollback via GitLab interface
3. Verify rollback completion
4. Notify team of rollback
5. Document incident and resolution