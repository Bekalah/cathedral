# 🏛️ Cathedral ND-Safe Production Standards

## ⚠️ MANDATORY STANDARDS FOR ALL COMPONENTS ⚠️

These standards MUST be applied to every public and private facing interface in the Cathedral system. No exceptions.

---

## 🧠 ND-SAFE & TRAUMA-AWARE REQUIREMENTS

### Motion & Animation Safety:
- ✅ **No Autoplay**: Nothing starts without explicit user gesture
- ✅ **Escape Behavior**: ESC key always returns to safe state
- ✅ **Intensity Controls**: User adjustable motion/effects intensity
- ✅ **Pause/Resume**: Global pause button accessible everywhere
- ✅ **prefers-reduced-motion**: CSS media query respected
- ✅ **Gentle Defaults**: Low intensity starting values (30% max)

### Sensory Safety:
- ✅ **No Strobe Effects**: Frame rate limited, no rapid flashing
- ✅ **Audio Opt-In**: Explicit "Start Sound" button required
- ✅ **Volume Safety**: Ultra-low starting volumes with user control
- ✅ **Visual Overwhelm Protection**: Particle counts capped by default

### Cognitive Load Management:
- ✅ **Clear Instructions**: Simple, trauma-informed language
- ✅ **Safety Exits**: Multiple ways to stop/escape experiences
- ✅ **Progress Control**: User controls pacing, no forced sequences
- ✅ **Context Preservation**: Return to known safe states

---

## 🔧 TECHNICAL PERFORMANCE STANDARDS

### Shader Safety:
```glsl
// ❌ NEVER use vUv with primitive geometry
varying vec2 vUv; // UNSAFE with Octahedron/Tetrahedron

// ✅ ALWAYS use position/normal based calculations
varying vec3 vWorldPos;
varying vec3 vNormal;
```

### Instance Optimization:
```javascript
// ❌ NEVER clone materials per mesh
for (let i = 0; i < 144; i++) {
  const material = baseMaterial.clone(); // EXPENSIVE
}

// ✅ ALWAYS use InstancedMesh with shared material
const instancedMesh = new THREE.InstancedMesh(geometry, material, 144);
```

### Particle Limits:
- **Desktop**: Max 2000 particles
- **Mobile**: Max 500 particles  
- **Low Power Mode**: Max 200 particles
- **Always**: GPU particle systems for >1000

### Memory Management:
- Dispose geometries and materials on cleanup
- Use `setUsage(THREE.DynamicDrawUsage)` for animated instances
- Cap `devicePixelRatio` to 2.0 maximum
- Implement object pooling for frequently created/destroyed objects

---

## ♿ ACCESSIBILITY REQUIREMENTS

### Keyboard Navigation:
```html
<!-- ✅ All interactive elements must be keyboard accessible -->
<button tabindex="0" aria-label="Start Cathedral Experience">
  ENTER CATHEDRAL
</button>

<!-- ✅ Focus indicators required -->
<style>
button:focus { 
  outline: 3px solid rgba(148,0,211,0.3); 
  outline-offset: 2px; 
}
</style>
```

### Screen Reader Support:
```html
<!-- ✅ Semantic HTML structure -->
<main role="main">
  <section aria-labelledby="controls-heading">
    <h2 id="controls-heading">Cathedral Controls</h2>
    <div role="group" aria-label="Navigation controls">
      <!-- controls here -->
    </div>
  </section>
</main>

<!-- ✅ Hidden decorative elements -->
<div class="particle-system" aria-hidden="true"></div>
```

### Visual Accessibility:
- **Color Contrast**: Minimum 4.5:1 ratio for text
- **Focus Indicators**: 3px outline minimum
- **Text Scaling**: Support up to 200% zoom
- **Alternative Text**: All visual information has text equivalent

---

## 📱 RESPONSIVE & MOBILE STANDARDS

### Touch Interactions:
```javascript
// ✅ Touch-friendly hit targets (44px minimum)
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

// ✅ Pointer event handling
element.addEventListener('pointerdown', handleInteraction);
```

### Responsive Breakpoints:
```css
/* Mobile First Approach */
@media (max-width: 768px) {
  .controls { 
    bottom: 10px; 
    left: 10px; 
    right: 10px; 
    width: auto; 
  }
}

@media (max-width: 480px) {
  .node-info { 
    font-size: 14px; 
    padding: 8px 16px; 
  }
}
```

### Performance Scaling:
- **Mobile**: Reduce particle count by 75%
- **Low-end devices**: Disable complex shaders
- **Battery saver mode**: Cap frame rate to 30fps

---

## 🎨 VISUAL DESIGN STANDARDS

### Color Palette (Accessible):
```css
:root {
  --cathedral-gold: #d4af37;     /* Primary - 4.8:1 contrast */
  --mystic-purple: #9370db;      /* Secondary - 4.2:1 contrast */
  --sacred-silver: #c0c0c0;     /* Text - 5.1:1 contrast */
  --deep-void: #0a0514;         /* Background */
  --safety-green: #2ecc71;      /* Success states */
  --warning-amber: #f39c12;     /* Caution states */
}
```

### Typography Hierarchy:
```css
/* Accessible font sizing and spacing */
.cathedral-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: 0.1em;
}

.body-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  line-height: 1.6;
}
```

---

## 🔒 SECURITY & PRIVACY STANDARDS

### Data Protection:
- **No Analytics**: No tracking without explicit consent
- **Local Storage**: Encrypt sensitive data client-side
- **API Security**: Rate limiting and input validation
- **Content Security Policy**: Strict CSP headers

### Safe Content Loading:
```javascript
// ✅ Validate external resources
function loadSafeResource(url) {
  if (!url.startsWith('https://')) {
    throw new Error('Only HTTPS resources allowed');
  }
  // Additional validation...
}
```

---

## 🧪 TESTING REQUIREMENTS

### Automated Testing:
```bash
# Accessibility testing
npm run test:a11y

# Performance testing
npm run test:lighthouse

# Visual regression testing
npm run test:visual

# Cross-browser testing
npm run test:browsers
```

### Manual Testing Checklist:
- [ ] Keyboard-only navigation works
- [ ] Screen reader announces correctly
- [ ] Works with reduced motion enabled
- [ ] Functions at 200% zoom
- [ ] Loads on slow connections (3G)
- [ ] Battery usage acceptable on mobile

---

## 📋 COMPONENT IMPLEMENTATION CHECKLIST

For every Cathedral component, verify:

### Safety & Accessibility:
- [ ] No autoplay anything
- [ ] ESC key safety exit implemented
- [ ] prefers-reduced-motion respected
- [ ] Intensity/pause controls present
- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets 44px minimum

### Performance:
- [ ] Uses InstancedMesh for repeated geometry
- [ ] Shared materials, not cloned
- [ ] Position-based shaders (no vUv reliance)
- [ ] Particle count appropriate for device
- [ ] Memory cleanup on unmount
- [ ] Frame rate capped appropriately

### User Experience:
- [ ] Clear instructions provided
- [ ] Multiple exit strategies
- [ ] Responsive across devices
- [ ] Graceful degradation
- [ ] Error states handled
- [ ] Loading states informative

---

## 🚀 DEPLOYMENT STANDARDS

### Pre-deployment Checklist:
1. **Lighthouse Score**: 90+ in all categories
2. **A11y Audit**: Zero violations
3. **Performance Budget**: <100kb initial JS bundle
4. **Cross-browser**: Chrome, Firefox, Safari, Edge
5. **Mobile Testing**: iOS and Android devices
6. **Stress Testing**: High load scenarios

### Monitoring:
- **Real User Metrics**: Core Web Vitals tracking
- **Error Tracking**: Client-side error monitoring
- **Performance**: Bundle size and load time alerts
- **Accessibility**: Automated a11y regression detection

---

## 📚 REFERENCE IMPLEMENTATIONS

See these files for standard-compliant examples:
- `/packages/holographic-interface/` - Complete accessible 3D interface
- `/packages/stone-grimoire/` - ND-safe art exploration
- `/packages/cosmogenesis-learning-engine/` - Trauma-informed learning
- `/src/accessibility/` - Shared accessibility utilities
- `/src/quality/` - Testing and validation tools

---

**Every Cathedral component must meet these standards. No exceptions.**
**Test thoroughly. Deploy safely. Protect users always.**