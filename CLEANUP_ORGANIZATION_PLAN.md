# Cathedral of Circuits - Cleanup & Organization Plan

## Current Situation Analysis

Based on your description, it appears you have multiple repository instances and cleanup attempts scattered across different locations:

### Repository Instances Found:
1. **Main Repository**: `/Users/rebeccalemke/cathedral-real` (current working directory)
2. **External Repositories**: Cloned from bekalah GitHub account
3. **Mentioned Repositories** (status unknown):
   - `cathedral-research`
   - `cathedral-1` (codespaces backup)
   - `cathedral-cleanup`
   - `liber-arcanae-game`
   - `cathedral-workspace` (code.workspace)

## Immediate Consolidation Strategy

### Phase 1: Repository Inventory & Analysis
1. **Identify All Repository Locations**
   - Map all mentioned repositories
   - Determine which contains the most current/complete code
   - Identify duplicate files and conflicting versions

2. **Code Content Comparison**
   - Compare package.json versions across repositories
   - Identify the most recent changes
   - Map out which repository has the most complete OpenSpec compliance

### Phase 2: Consolidation Decision Tree

#### Decision: Which Repository is Primary?
Based on file timestamps and content:
- **Primary**: Current working directory (most recent GitHub Actions fixes)
- **Secondary**: External repositories (for comparison)
- **Archived**: Any older cleanup attempts

#### Decision: Package Integration Strategy
1. **Keep only one version** of each package
2. **Merge incomplete packages** into complete ones
3. **Archive cleanup attempts** that didn't work

### Phase 3: Systematic Cleanup

#### Immediate Actions:
1. **Backup Current State**: 
   ```bash
   # Create backup of current working directory
   cp -r /Users/rebeccalemke/cathedral-real /Users/rebeccalemke/cathedral-real-backup-$(date +%Y%m%d)
   ```

2. **Identify Duplicate Packages**:
   - Map all package.json files across repositories
   - Identify duplicates by package name
   - Determine which version is most complete

3. **Version Standardization**:
   - All packages → version 2.0.0 (current master version)
   - Remove abandoned packages
   - Update workspace configurations

#### Package Consolidation Priority:
1. **High Priority**: Core packages (`@cathedral/*`, `@bekalah/*`)
2. **Medium Priority**: App packages (`apps/*`)
3. **Low Priority**: Cleanup/backup packages

### Phase 4: OpenSpec Compliance Restoration

#### Create Missing Delta Specifications:
For each package that changed during cleanup attempts:
```markdown
## ADDED Requirements
### Requirement: Repository Consolidation
The system SHALL maintain consistency after cleanup

#### Scenario: Package cleanup
- **WHEN** repositories are consolidated
- **THEN** all packages SHALL maintain version 2.0.0
- **AND** SHALL preserve OpenSpec specifications
```

#### Change Log for Cleanup:
```markdown
# Cathedral of Circuits - Cleanup Log v2.0.0
Date: 2025-10-31
Agent: Roo (Architectural Analysis)
Action: Consolidated multiple repository instances into single working directory

## Changes Made:
- Consolidated cathedral-research, cathedral-1, cathedral-cleanup, liber-arcanae-game
- Standardized all package versions to 2.0.0
- Fixed GitHub Actions workflows
- Updated OpenSpec specifications
- Archived cleanup attempts
```

## Emergency Response Plan

### If Repositories Are Lost/Corrupted:
1. **Use Current Directory**: Primary working repository
2. **External Clones**: Fallback for comparison
3. **GitHub History**: Check bekalah/cathedral for any pushed changes

### If Package Conflicts Occur:
1. **Standardize to 2.0.0**: Master version across all packages
2. **Remove Duplicates**: Keep only complete versions
3. **Update References**: Fix import paths and dependencies

## Implementation Commands

### Repository Backup:
```bash
# Backup current state
tar -czf cathedral-backup-$(date +%Y%m%d).tar.gz /Users/rebeccalemke/cathedral-real

# Find other cathedral directories
find /Users/rebeccalemke -name "*cathedral*" -type d
```

### Package Version Standardization:
```bash
# Find all package.json files
find . -name "package.json" -exec grep -l "version" {} \;

# Update versions to 2.0.0
# (Will need manual review for conflicts)
```

### GitHub Actions Testing:
```bash
# Test workflow locally (if possible)
# Or push to test branch and monitor
```

## Success Criteria

1. **Single Working Repository**: All code in one location
2. **Consistent Versions**: All packages at 2.0.0
3. **Working GitHub Actions**: Deployments succeed
4. **OpenSpec Compliance**: All changes properly tracked
5. **No Duplicates**: Clean package structure
6. **Replit Ready**: Ready for Replit transition

## Next Steps

1. **Immediate**: Identify all mentioned repositories
2. **Hour 1**: Consolidate into single working directory  
3. **Hour 2**: Standardize versions and fix conflicts
4. **Hour 3**: Test GitHub Actions and deployment
5. **Day 1**: Complete OpenSpec compliance restoration

Would you like me to start by identifying and mapping out all the repositories you mentioned?