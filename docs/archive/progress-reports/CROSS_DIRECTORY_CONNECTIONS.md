# 🔗 Cross-Directory Connections

**Version:** 1.0.0  
**Purpose:** Clear map of how everything connects across directories

---

## 📦 Package → Package Connections

### **Core Trinity**
```
circuitum99/ (Soul)
    ↕
stone-grimoire/ (Body)
    ↕
cosmogenesis-learning-engine/ (Spirit/Brain)
```

### **Sacred Knowledge**
```
codex-144-99/
    ↕
liber-arcanae/
    ↕
circuitum99/
```

### **Creative Systems**
```
violet-flame-transmutation/
    ↕
game-music-integration/
    ↕
fractal-sound-game-bridge/
    ↕
professional-design-suite/
```

---

## 📱 App → Package Connections

### **Main Web App**
```
apps/web/
    → packages/codex-144-99/
    → packages/liber-arcanae/
    → packages/circuitum99/
    → packages/magical-mystery-house/
    → packages/shared/
```

### **Synth Lab**
```
apps/synth-lab/
    → packages/synth/
    → packages/shared/
```

### **Tarot Arena**
```
apps/tarot-arena/
    → packages/liber-arcanae/
    → packages/codex-144-99/
    → packages/shared/
```

---

## 🗂️ Data → Package Connections

```
data/codex-144-expanded.json
    → packages/codex-144-99/

data/complete-arcana-profiles.json
    → packages/liber-arcanae/

data/research-sources.json
    → packages/codex-144-99/
    → packages/liber-arcanae/
```

---

## 🖼️ Assets → Package Connections

```
assets/magical-mystery-house/
    → packages/magical-mystery-house/

assets/art/
    → packages/art-generation-node/
    → packages/visionary-art-colors/
    → packages/visionary-art-textures/

assets/audio/
    → packages/synth/
    → packages/game-music-integration/
```

---

## 🎮 Game → Package Connections

```
godot/
    → packages/tesseract-bridge/
    → packages/codex-144-99/
    → packages/liber-arcanae/

rust-engines/
    → packages/tesseract-bridge/
```

---

## 🔄 Import Paths

All packages use workspace imports:

```typescript
// In apps/web/package.json
"dependencies": {
  "@cathedral/codex-144-99": "workspace:*",
  "@cathedral/liber-arcanae": "workspace:*",
  "@cathedral/shared": "workspace:*"
}
```

TypeScript paths configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@cathedral/codex-144-99": ["packages/codex-144-99/src"],
      "@cathedral/liber-arcanae": ["packages/liber-arcanae/src"],
      "@cathedral/shared": ["packages/shared/src"]
    }
  }
}
```

---

## 📍 File Path Connections

### **Magical Mystery House Assets**
```
packages/magical-mystery-house/src/asset-manifest.ts
    → assets/magical-mystery-house/**/*.{jpg,png,webp}
```

### **Codex 144:99 Data**
```
packages/codex-144-99/src/
    → data/codex-144-expanded.json
```

### **Liber Arcanae Data**
```
packages/liber-arcanae/src/
    → data/complete-arcana-profiles.json
```

---

## 🚀 Build Connections

TurboRepo handles build dependencies:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

This means:
- `apps/web` depends on `packages/codex-144-99`, `packages/liber-arcanae`, etc.
- All packages build before apps
- Changes propagate automatically

---

## 🔍 How to Verify Connections

1. **Check package.json dependencies:**
   ```bash
   cat packages/codex-144-99/package.json | grep dependencies
   ```

2. **Check TypeScript paths:**
   ```bash
   cat tsconfig.json | grep paths
   ```

3. **Check TurboRepo pipeline:**
   ```bash
   cat turbo.json | grep dependsOn
   ```

4. **Check workspace config:**
   ```bash
   cat pnpm-workspace.yaml
   ```

---

**Status:** All connections documented and verified!

