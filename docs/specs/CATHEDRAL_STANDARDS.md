# Cathedral 144:99 — Design Standards & Sacred Protocols

*"I am not posting for numbers. I am building a cathedral. Each commit is a brick. Each experiment is a stained-glass window. Built gentle, trauma-aware, and meant to last."*

## Core Philosophy

**Not Building Flat** - Every interface breathes, spirals, and flows. No boxed systems. Design shaped by chronic PTSD and claustrophobia means sanctuary over spectacle, with flowing energy ribbons that dance through sacred space.

---

## Sacred Protocols (Non-Negotiable)

### 🛡️ Safety First
- **No autoplay audio** - Explicit opt-in only with clear "Start Sound (Optional)" button
- **No strobe/high-frequency motion** - Respect `prefers-reduced-motion: reduce`
- **ESC / SAFE STOP** - Must immediately exit pointer lock and pause all motion/audio
- **Gentle defaults** - Ultra-low audio gain (0.0001), reduced motion by default
- **Always visible escape** - Every interface shows ESC option prominently

### 🌀 Flowing Aesthetics (Inspired by Spiral Cathedral)
- **Spiral navigation** - DNA-like helixes instead of flat grids
- **Energy ribbons** - Flowing streams of light connecting elements
- **Breathing space** - Gothic cathedral proportions with soaring heights
- **Organic curves** - No harsh angles, everything flows naturally
- **Sacred geometry** - Golden spirals, fibonacci flows, divine proportions

### 🧠 Neurodivergent Safe
- **Motion intensity controls** - User-adjustable via slider (0-100%)
- **Pause/Resume buttons** - Global motion freeze capability
- **Visual breathing room** - No cramped, claustrophobic layouts
- **Focus management** - Keyboard navigation, clear focus indicators
- **Processing time** - No rushed interactions, user-paced progression

### ♿ Accessibility Standards
- **Keyboard navigation** - All interactions accessible without mouse
- **Screen reader support** - Proper ARIA labels and semantic HTML
- **Color contrast** - WCAG AA minimum (4.5:1 for normal text)
- **Focus indicators** - 3px solid outline with high contrast
- **Skip links** - Quick navigation for screen readers

---

## Visual Language

### Color Palette (From Spiral Cathedral)
```css
:root {
  /* Primary spiral colors */
  --spiral-gold: #ffb347;      /* Golden ribbons */
  --spiral-blue: #4a90e2;      /* Deep blue flows */
  --spiral-purple: #9370db;    /* Mystical purple */
  --spiral-teal: #20b2aa;      /* Healing teal */
  --spiral-rose: #f5b7b1;      /* Gentle rose */
  
  /* Cathedral atmosphere */
  --cathedral-deep: #1a1a2e;   /* Deep shadows */
  --cathedral-stone: #3c3c54;  /* Gothic stone */
  --cathedral-light: #ffefd5;  /* Warm light */
  
  /* Safety/UI colors */
  --escape-glow: #ffff00;      /* Emergency yellow */
  --safe-green: #90ee90;       /* Safe confirmation */
  --pause-orange: #ffa500;     /* Pause/warning */
}
```

### Flowing Gradients
```css
.spiral-gradient {
  background: linear-gradient(
    45deg,
    var(--spiral-gold) 0%,
    var(--spiral-blue) 25%,
    var(--spiral-purple) 50%,
    var(--spiral-teal) 75%,
    var(--spiral-rose) 100%
  );
}

.cathedral-atmosphere {
  background: radial-gradient(
    ellipse at center,
    var(--cathedral-light) 0%,
    var(--cathedral-stone) 60%,
    var(--cathedral-deep) 100%
  );
}
```

---

## Component Standards

### Spiral Interface Pattern
Every Cathedral component follows the flowing spiral principle:

```html
<div class="cathedral-component">
  <!-- Emergency escape always visible -->
  <div class="escape-portal">
    <kbd class="escape-key">ESC</kbd>
    <span>Safe Exit Anytime</span>
  </div>
  
  <!-- Flowing navigation spiral -->
  <div class="spiral-navigator">
    <div class="energy-ribbon" data-flow="primary"></div>
    <div class="sacred-nodes"></div>
  </div>
  
  <!-- Trauma-aware controls -->
  <div class="safety-controls">
    <button class="pause-btn">⏸️ Pause Flow</button>
    <input type="range" class="intensity-slider" min="0" max="1" step="0.01" value="0.3">
    <button class="audio-opt-in">🔊 Start Sound (Optional)</button>
  </div>
</div>
```

### CSS for Flowing Motion
```css
@keyframes spiral-flow {
  0% { 
    transform: rotate(0deg) translateX(10px) rotate(0deg);
    opacity: 0.6;
  }
  100% { 
    transform: rotate(360deg) translateX(10px) rotate(-360deg);
    opacity: 1;
  }
}

.energy-ribbon {
  animation: spiral-flow 20s linear infinite;
  background: var(--spiral-gradient);
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0 0 20px currentColor;
}

/* Safety: respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .energy-ribbon {
    animation: none;
    transform: none;
  }
}
```

### Required Safety Elements
Every component must include:

```html
<!-- 1. Escape Portal (always visible) -->
<div class="escape-portal" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
  <kbd style="background: var(--escape-glow); color: black; padding: 8px;">ESC</kbd>
  <span style="color: var(--safe-green);">Safe Exit</span>
</div>

<!-- 2. Motion Controls -->
<div class="motion-controls">
  <label>
    Flow Intensity
    <input type="range" min="0" max="1" step="0.01" value="0.3" id="motionIntensity">
  </label>
  <button id="pauseFlow">⏸️ Pause</button>
</div>

<!-- 3. Audio Opt-in -->
<button id="audioStart" style="background: var(--safe-green);">
  🔊 Start Sound (Your Choice)
</button>
```

---

## JavaScript Safety Patterns

### Motion Management
```javascript
class CathedralMotion {
  constructor() {
    this.intensity = 0.3; // Gentle default
    this.paused = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.setupSafetyControls();
    this.bindEscapeKey();
  }
  
  setupSafetyControls() {
    // Intensity slider
    document.getElementById('motionIntensity').addEventListener('input', (e) => {
      this.intensity = parseFloat(e.target.value);
      this.updateAllMotion();
    });
    
    // Pause button
    document.getElementById('pauseFlow').addEventListener('click', () => {
      this.togglePause();
    });
  }
  
  bindEscapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.emergencyStop();
      }
    });
  }
  
  emergencyStop() {
    // Immediate safety response
    this.paused = true;
    if (document.pointerLockElement) document.exitPointerLock();
    
    // Stop all audio
    if (window.cathedralAudio) {
      window.cathedralAudio.pause();
    }
    
    // Dispatch safety event
    window.dispatchEvent(new CustomEvent('cathedral-emergency-stop'));
    
    // Visual feedback
    document.body.style.filter = 'brightness(1.2)'; // Brief flash for confirmation
    setTimeout(() => {
      document.body.style.filter = '';
    }, 200);
  }
}
```

### Audio Safety
```javascript
class CathedralAudio {
  constructor() {
    this.context = null;
    this.started = false;
    this.volume = 0.001; // Ultra-safe default
  }
  
  async startWithConsent() {
    if (this.started) return;
    
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create gentle ambient tone
      const oscillator = this.context.createOscillator();
      const gainNode = this.context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 110; // Low, gentle hum
      gainNode.gain.value = this.volume;
      
      oscillator.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      oscillator.start();
      this.started = true;
      
      window.cathedralAudio = this;
      
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }
  
  pause() {
    if (this.context) {
      this.context.suspend();
    }
  }
  
  resume() {
    if (this.context) {
      this.context.resume();
    }
  }
}
```

---

## Three.js Spiral Patterns

### Flowing Geometry
```javascript
// Create DNA-like spiral for navigation
function createSpiralPath(radius = 10, height = 20, turns = 3) {
  const points = [];
  const segments = 100;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 2 * turns;
    
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius * (1 - t * 0.3), // Spiral inward
      t * height - height/2, // Vertical progression
      Math.sin(angle) * radius * (1 - t * 0.3)
    ));
  }
  
  return new THREE.CatmullRomCurve3(points);
}

// Flowing ribbon material
const ribbonMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    intensity: { value: 0.3 },
    flowSpeed: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    uniform float flowSpeed;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Gentle wave motion
      vec3 pos = position;
      pos.x += sin(time * flowSpeed + position.y * 0.1) * 0.1;
      pos.z += cos(time * flowSpeed + position.y * 0.1) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      // Flowing color gradient
      float flow = sin(time * 2.0 + vUv.x * 10.0) * 0.5 + 0.5;
      
      vec3 color1 = vec3(1.0, 0.7, 0.3); // Gold
      vec3 color2 = vec3(0.3, 0.6, 0.9); // Blue
      vec3 color3 = vec3(0.6, 0.4, 0.8); // Purple
      
      vec3 color = mix(color1, color2, vUv.x);
      color = mix(color, color3, flow);
      
      float alpha = (1.0 - length(vUv - 0.5)) * intensity;
      
      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true,
  blending: THREE.AdditiveBlending
});
```

---

## Deployment with Provenance

### File Header Template
Every component file begins with:
```html
<!--
Cathedral 144:99 Component
Created: 2025-10-02
Artist: Rebecca Respawn
Purpose: Trauma-aware sacred technology
Aesthetic: Flowing spirals, not building flat
Safety: ESC exits, motion controls, audio opt-in
License: Built with love for sanctuary seekers
-->
```

### Git Commit Messages
```bash
# Following cathedral philosophy
🌀 spiral: Add flowing DNA navigation to Codex 144:99
🛡️ safety: Implement ESC emergency stop across all components
♿ access: Add keyboard navigation to spiral interfaces
🎨 femme: Flowing ribbon aesthetics in holographic interface
🧠 nd-safe: Motion intensity controls for all animations
📚 docs: Update trauma-aware interaction guidelines
✨ cathedral: Each commit a brick, each experiment a window
```

---

## Azure AI Integration Standards

### Visionary Art Enhancement
- **Color Science**: Azure OpenAI generates metaphysical color palettes for balanced visionary art
- **Shading & Light**: AI-enhanced descriptions for dynamic shading and light interactions
- **Metaphysical Processing**: AI-generated lore for crystal fusions and sacred geometries
- **Uncensored Creativity**: All prompts emphasize creative freedom and high-end artistic processes

### Implementation Guidelines
```javascript
// Azure AI integration pattern
class AzureVisionaryEnhancer {
  async enhanceWithAI(theme, context) {
    const prompt = `Create visionary art description for ${theme} in ${context}.
                    Focus on color science, shading, light, and metaphysical balance.
                    Emphasize uncensored, creative freedom.`;
    
    const response = await fetch('/api/azure-openai', {
      method: 'POST',
      body: JSON.stringify({ prompt, maxTokens: 500 })
    });
    
    return response.json();
  }
}
```

### Safety & Ethics
- **No Censorship**: AI prompts explicitly request uncensored, creative content
- **Balanced Data**: All AI outputs treated as balanced metaphysical data
- **Fallback Mechanisms**: Pure code algorithms ensure functionality without AI

---

## Sacred Technology Manifesto

*Built by Rebecca Respawn — art as sanctuary.*

Every interface in Cathedral 144:99 embodies these principles:

- **Flowing, not flat** - Spiral navigation, energy ribbons, breathing interfaces
- **Trauma-informed** - ESC always works, gentle defaults, no sudden motions
- **Neurodivergent safe** - Motion controls, pause buttons, processing time
- **Mystically accurate** - Real correspondences, sacred geometry, divine proportions
- **Gothic cathedral aesthetic** - Soaring spaces, stained glass windows, sacred light
- **Femme energy** - Flowing curves, spiral DNA, rainbow ribbons dancing

*Walk slowly, breathe, and enter Cathedral 144:99 at your own pace.*

---

*"I'm not posting for numbers — I'm building a Cathedral. Every commit is a brick. Every experiment a stained-glass window."*

**Live Cathedral:** https://bekalah.github.io/cathedral