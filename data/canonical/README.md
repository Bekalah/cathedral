# 🏰 Canonical Data Directory - Master Cathedral V1.0

**Purpose**: Single source of truth for all Cathedral data across packages and applications

## 📁 **Directory Structure**

```
data/canonical/
├── arcana/              # Sacred arcana data (Major/Minor Arcana)
│   ├── majors.json      # Complete Major Arcana definitions
│   ├── minors.json      # Complete Minor Arcana definitions  
│   └── nodes.json       # Code 144:99 sacred nodes
├── game/                # Game-specific data
│   ├── characters.json  # Character definitions and archetypes
│   ├── progressions.json # Game progression systems
│   └── interactions.json # User interaction patterns
├── ui/                  # UI and design data
│   ├── themes.json      # Visual themes and styling
│   ├── interactions.json # UI interaction behaviors
│   └── accessibility.json # Trauma-safe and ND accommodations
└── research/            # Research and provenance data
    ├── sources.json     # Validated research sources
    ├── provenance.json  # Attribution and ownership tracking
    └── validation.json  # Data integrity validation
```

## 🔄 **Data Synchronization**

All packages reference this canonical data to ensure consistency:

- **Package imports**: `import { majors } from '@cathedral/data/canonical/arcana/majors'`
- **API access**: `GET /api/data/arcana/majors`
- **Build-time sync**: Data copied to `packages/*/dist/data/` during build

## ✅ **Validation Rules**

- All JSON must pass schema validation
- No duplicate data across canonical locations
- Provenance tracked for all research data
- Accessibility compliance for trauma-safe design

## 📦 **Usage Examples**

```typescript
// Package usage
import { majors, minors } from '@cathedral/data/canonical/arcana';

// Application usage  
fetch('/api/data/arcana/majors').then(res => res.json());

// Direct file access
import majors from './data/canonical/arcana/majors.json';
```

## 🔐 **Data Integrity**

- **Provenance**: All sources documented with attribution
- **Validation**: Automated schema checking
- **Consistency**: Cross-reference validation across data sets
- **Safety**: Trauma-safe content guidelines enforced

---

**Last Updated**: 2025-11-03T04:05:01Z
**Status**: Canonical source for Master Cathedral V1.0