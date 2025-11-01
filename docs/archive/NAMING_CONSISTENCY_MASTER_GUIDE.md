# 🏷️ CATHEDRAL NAMING CONSISTENCY MASTER GUIDE
## Common Naming Issues & Correction Protocols

### 🎯 **THE CORE PROBLEM**
When working with sacred technology systems, you need **multiple naming conventions** for different contexts:
- **GitHub Repository Names** (technical constraints)
- **Sacred/Mystical Titles** (spiritual significance)  
- **Package Directory Names** (development organization)
- **Display Names** (user-facing)
- **API/File References** (code integration)

---

## 📊 **CURRENT NAMING MATRIX - VERIFIED CORRECT**

| **System** | **Repository** | **Sacred Title** | **Package** | **Display** | **Status** |
|------------|---------------|------------------|-------------|-------------|------------|
| Angels/Demons | `codex-14499` | `Codex 144:99` | `codex-144` | `CODEX 144` | ✅ Correct |
| Living Tarot | `liber-arcanae` | `LIBER ARCANAE` | `liber-arcanae` | `Living Arcana Deck` | ✅ Correct |
| Archive System | `stone-grimoire` | `STONE-GRIMOIRE` | `stone-grimoire` | `Stone Grimoire` | ✅ Correct |
| Book System | `circuitum99` | `CIRCUITUM99: ALPHA ET OMEGA` | `circuitum99` | `Circuitum99` | ✅ Correct |
| Integration | `tesseract-bridge` | `TESSERACT BRIDGE` | `tesseract-bridge` | `Tesseract Bridge` | ✅ Correct |
| Extended Universe | `magical-mystery-house` | `MAGICAL MYSTERY HOUSE` | `magical-mystery-house` | `Mystery House` | ✅ Correct |
| World Builder | `cosmogenesis-learning-engine` | `COSMOGENESIS LEARNING ENGINE` | `cosmogenesis` | `Cosmogenesis` | ⚠️ Shortened |

---

## 🚨 **COMMON NAMING PITFALLS & SOLUTIONS**

### **1. Repository vs Sacred Name Confusion**
❌ **WRONG**: Using `codex-144` as repository name  
✅ **RIGHT**: Repository is `codex-14499`, sacred system is `Codex 144:99`

**Why**: GitHub repos need unique identifiers, but spiritual systems need meaningful ratios.

### **2. Hyphen vs Underscore vs Space Inconsistency**
❌ **WRONG**: Mixing `stone_grimoire`, `stone-grimoire`, `Stone Grimoire` randomly  
✅ **RIGHT**: 
- **Repository**: `stone-grimoire` (kebab-case)
- **Package**: `stone-grimoire` (kebab-case)  
- **Sacred Title**: `STONE-GRIMOIRE` (caps with hyphens)
- **Display**: `Stone Grimoire` (title case with spaces)

### **3. Shortened vs Full Names in Different Contexts**
❌ **WRONG**: Using `mystery-house` when full name is `magical-mystery-house`  
✅ **RIGHT**: Always use full repository name in technical contexts, short names only for display

### **4. Sacred Number Integration Errors**
❌ **WRONG**: Using `144` in repository names (causes confusion with old `1499` typo)  
✅ **RIGHT**: Repository uses `14499`, sacred math uses `144:99` ratio

---

## 🔧 **CORRECTION PROTOCOLS**

### **Protocol 1: Repository Reference Audit**
```bash
# Search for incorrect repository references
grep -r "codex-144[^9]" .  # Should be codex-14499
grep -r "mystery-house[^$]" .  # Should specify magical-mystery-house
grep -r "cosmogenesis[^-]" .  # Should specify cosmogenesis-learning-engine
```

### **Protocol 2: Sacred Number Validation**
```bash
# Check for old typos
grep -r "1499[^9]" .  # Should be 14499 or 144:99
grep -r "codex.*1499[^9]" .  # Legacy typo pattern
```

### **Protocol 3: Cross-System Reference Check**
```bash
# Verify consistent naming across integration points
grep -r "packages/.*/" . | grep -v "packages/codex-144"  # Should use codex-144 for package
grep -r "repo clone.*/" . | grep -v "codex-14499"  # Should use codex-14499 for repo
```

---

## 📋 **NAMING RULES BY CONTEXT**

### **GitHub Repository Names** (External Identity)
- Must be **unique** across GitHub
- Use **kebab-case** (`my-repo-name`)
- Can include **numbers** for uniqueness (`codex-14499`)
- Should be **memorable** and **professional**

### **Sacred/Mystical Titles** (Spiritual Significance)  
- Use **CAPS** for power (`CIRCUITUM99: ALPHA ET OMEGA`)
- Include **sacred ratios** (`144:99`)
- Preserve **mystical meaning** over technical constraints
- Can use **colons, spaces, symbols**

### **Package Directory Names** (Development Organization)
- Use **kebab-case** for consistency (`packages/codex-144/`)
- Should be **shorter** than repository names
- Must be **filesystem-safe** (no colons, special chars)
- Should **group related** functionality

### **Display Names** (User Interface)
- Use **Title Case** (`Stone Grimoire`)
- Should be **readable** and **approachable**
- Can be **abbreviated** for space (`Mystery House`)
- Should **match user expectations**

### **API/File References** (Code Integration)
- Use **exact package names** in code
- Use **exact repository names** for cloning
- Use **consistent casing** throughout system
- Should **validate** against master registry

---

## 🔍 **AUDIT CHECKLIST**

### **Before Every Commit:**
- [ ] Repository references use full names (`magical-mystery-house` not `mystery-house`)
- [ ] Sacred numbers use correct format (`144:99` not `1499` or `144`)
- [ ] Package references match directory structure
- [ ] Clone commands use correct repository names
- [ ] Display names are user-friendly and consistent

### **System Integration Points:**
- [ ] `wrangler.toml` routing matches repository names
- [ ] `trinity-architecture.json` uses proper package paths
- [ ] `tesseract-bridge.js` loads correct endpoints
- [ ] Documentation files use consistent naming
- [ ] Cross-references between systems are accurate

### **Sacred Mathematics Validation:**
- [ ] All `144` references relate to lattice/codex system
- [ ] All `99` references relate to gates/circuitum system  
- [ ] All `72` references relate to angels/demons
- [ ] All `33` references relate to spine/vertebrae
- [ ] Ratios preserved as `144:99` not corrupted to `1499`

---

## 🛠️ **AUTOMATED CORRECTION SCRIPT**

```bash
#!/bin/bash
# cathedral-naming-audit.sh

echo "🏷️ Cathedral Naming Consistency Audit"

# Check for old typos
echo "🔍 Checking for legacy typos..."
find . -name "*.md" -o -name "*.json" -o -name "*.js" | xargs grep -l "1499[^9]" && echo "❌ Found legacy 1499 typo!"

# Verify repository naming consistency  
echo "🔍 Checking repository references..."
find . -name "*.md" | xargs grep -l "codex-144[^9]" && echo "⚠️ Found shortened codex reference - should be codex-14499 for repo"

# Check sacred number format
echo "🔍 Validating sacred mathematics..."
find . -name "*.json" | xargs grep -L "144:99\|144.*99" && echo "✅ Sacred ratios properly formatted"

# Verify package consistency
echo "🔍 Checking package structure..."
ls packages/ | while read pkg; do
  if ! grep -r "packages/$pkg" . >/dev/null; then
    echo "⚠️ Package $pkg not referenced in system"
  fi
done

echo "✅ Naming audit complete!"
```

---

## 📚 **MASTER REFERENCE TABLE**

### **When To Use Which Name:**

| **Context** | **codex-14499** | **Codex 144:99** | **codex-144** | **CODEX 144** |
|-------------|-----------------|------------------|---------------|---------------|
| `git clone` | ✅ Use | ❌ Never | ❌ Never | ❌ Never |
| Sacred docs | ❌ Never | ✅ Use | ❌ Rarely | ✅ Use |
| Package path | ❌ Never | ❌ Never | ✅ Use | ❌ Never |
| User display | ❌ Never | ✅ Use | ❌ Never | ✅ Use |
| API endpoints | ❌ Never | ❌ Never | ✅ Use | ❌ Never |
| Documentation | ✅ For repos | ✅ For concepts | ✅ For code | ✅ For titles |

---

*This guide prevents naming confusion across your sacred technology ecosystem while maintaining both technical functionality and mystical significance.* 🏰✨