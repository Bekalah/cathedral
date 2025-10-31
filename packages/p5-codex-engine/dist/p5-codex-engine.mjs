import * as i from "p5";
class d {
  constructor(e) {
    this.p5Instance = null, this.codexNodes = [], this.arcanaeData = /* @__PURE__ */ new Map(), this.datasetConnections = /* @__PURE__ */ new Map(), this.sacredGeometry = {}, this.initializeSacredGeometry(), this.initializeArcanaeData(), this.initializeDatasetConnections(), e && this.mount(e);
  }
  /**
   * Mount p5.js sketch to DOM element
   */
  mount(e) {
    const t = document.getElementById(e);
    if (!t) {
      console.warn(`Container ${e} not found`);
      return;
    }
    const o = (a) => {
      a.setup = () => this.setup(a), a.draw = () => this.draw(a), a.mousePressed = () => this.mousePressed(a), a.keyPressed = () => this.keyPressed(a);
    };
    this.p5Instance = new i(o, t);
  }
  /**
   * Initialize with Codex 144:99 sacred geometry patterns
   */
  initializeSacredGeometry() {
    this.sacredGeometry = {
      goldenRatio: 1.618033988749895,
      fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      vesicaPiscis: { ratio: Math.sqrt(3) / 2 },
      platonic: {
        tetrahedron: { vertices: 4, edges: 6, faces: 4 },
        hexahedron: { vertices: 8, edges: 12, faces: 6 },
        octahedron: { vertices: 6, edges: 12, faces: 8 },
        dodecahedron: { vertices: 20, edges: 30, faces: 12 },
        icosahedron: { vertices: 12, edges: 30, faces: 20 }
      }
    };
  }
  /**
   * Initialize Liber Arcanae modular data
   */
  initializeArcanaeData() {
    [
      {
        name: "The Fool",
        element: "air",
        colors: ["#FFE4B5", "#F0E68C", "#DDA0DD"],
        symbols: ["infinity", "spiral", "void"],
        geometry: "point",
        frequency_range: [174, 285]
      },
      {
        name: "The Magician",
        element: "mercury",
        colors: ["#FF6347", "#FFD700", "#8A2BE2"],
        symbols: ["vesica_piscis", "octagram", "caduceus"],
        geometry: "line",
        frequency_range: [285, 396]
      },
      {
        name: "High Priestess",
        element: "water",
        colors: ["#4169E1", "#8FBC8F", "#DDA0DD"],
        symbols: ["crescent", "pillars", "veil"],
        geometry: "triangle",
        frequency_range: [396, 417]
      }
      // Add all 22 Major Arcana...
    ].forEach((t) => {
      this.arcanaeData.set(t.name, t);
    });
  }
  /**
   * Initialize real dataset connections for professional tools
   */
  initializeDatasetConnections() {
    this.datasetConnections.set("nasa-imagery", {
      source: "NASA Image and Video Library",
      type: "nasa",
      endpoint: "https://images-api.nasa.gov/search",
      live: !0
    }), this.datasetConnections.set("weather-patterns", {
      source: "OpenWeather API",
      type: "weather",
      endpoint: "https://api.openweathermap.org/data/2.5",
      live: !0
    }), this.datasetConnections.set("music-theory", {
      source: "FreeMusicAPI",
      type: "music",
      endpoint: "https://freemusicapi.com",
      live: !1
    }), this.datasetConnections.set("art-collections", {
      source: "Metropolitan Museum API",
      type: "art",
      endpoint: "https://collectionapi.metmuseum.org/public/collection/v1",
      live: !0
    });
  }
  /**
   * P5.js setup function with Codex 144:99 initialization
   */
  setup(e) {
    e.createCanvas(800, 600, e.WEBGL).parent("p5-container"), e.colorMode(e.HSB, 360, 100, 100, 100), e.background(0, 0, 10), this.generateCodexNodes(e), console.log("🎨 P5 Codex Engine initialized with 144:99 sacred mathematics");
  }
  /**
   * Generate 144 sacred nodes in geometric patterns
   */
  generateCodexNodes(e) {
    this.codexNodes = [];
    for (let t = 0; t < 144; t++) {
      const o = t * this.sacredGeometry.goldenRatio * Math.PI * 2, a = Math.sqrt(t) * 20, n = {
        id: t + 1,
        frequency: 174 + t * 3.14159,
        // Hz progression
        geometry: this.getGeometryType(t),
        crystal: this.getCrystalType(t),
        guardian: this.getGuardianType(t),
        coordinates: {
          x: Math.cos(o) * a,
          y: Math.sin(o) * a,
          z: Math.sin(t * 0.1) * 50
        },
        fusion_kink: {
          enabled: !0,
          resonance: t % 99 / 99
        }
      };
      this.codexNodes.push(n);
    }
  }
  /**
   * Main drawing loop with sacred geometry visualization
   */
  draw(e) {
    e.background(0, 0, 10, 20), e.push(), e.translate(0, 0, -200), e.rotateY(e.frameCount * 0.01), e.rotateX(e.frameCount * 5e-3), this.drawCodexNodes(e), this.drawSacredConnections(e), this.drawFibonacciSpiral(e), e.pop(), this.drawCodexInterface(e);
  }
  /**
   * Draw the 144 Codex nodes with Arcanae colors
   */
  drawCodexNodes(e) {
    this.codexNodes.forEach((t, o) => {
      e.push(), e.translate(t.coordinates.x, t.coordinates.y, t.coordinates.z || 0);
      const a = (t.frequency + e.frameCount) % 360, n = 70 + Math.sin(e.frameCount * 0.01 + o) * 30, s = 80 + Math.cos(e.frameCount * 0.02 + o) * 20;
      e.fill(a, n, s, 70), e.noStroke();
      const r = 5 + t.fusion_kink.resonance * 10;
      switch (t.geometry) {
        case "tetrahedron":
          this.drawTetrahedron(e, r);
          break;
        case "octahedron":
          this.drawOctahedron(e, r);
          break;
        case "icosahedron":
          this.drawIcosahedron(e, r);
          break;
        default:
          e.sphere(r);
      }
      e.pop();
    });
  }
  /**
   * Draw sacred connections between nodes
   */
  drawSacredConnections(e) {
    e.stroke(200, 50, 80, 30), e.strokeWeight(1);
    for (let t = 0; t < this.codexNodes.length - 8; t++) {
      const o = this.codexNodes[t], a = this.codexNodes[t + 8];
      o && a && e.line(
        o.coordinates.x,
        o.coordinates.y,
        o.coordinates.z || 0,
        a.coordinates.x,
        a.coordinates.y,
        a.coordinates.z || 0
      );
    }
  }
  /**
   * Draw Fibonacci spiral overlay
   */
  drawFibonacciSpiral(e) {
    e.push(), e.rotateZ(e.frameCount * 1e-3), e.noFill(), e.stroke(45, 80, 90, 50), e.strokeWeight(2), e.beginShape();
    for (let t = 0; t < 300; t++) {
      const o = t * 0.2, a = t * 2;
      e.vertex(
        Math.cos(o) * a,
        Math.sin(o) * a
      );
    }
    e.endShape(), e.pop();
  }
  /**
   * Draw real-time Codex interface with dataset integration
   */
  drawCodexInterface(e) {
    e.camera();
    const t = this.codexNodes[e.frameCount % 144];
    t && (e.fill(0, 0, 100, 90), e.textAlign(e.LEFT), e.textSize(14), e.text(`Node ${t.id}: ${t.crystal}`, 20, 30), e.text(`Frequency: ${t.frequency.toFixed(2)} Hz`, 20, 50), e.text(`Geometry: ${t.geometry}`, 20, 70), e.text(`Guardian: ${t.guardian}`, 20, 90));
  }
  /**
   * Geometry generators for sacred shapes
   */
  drawTetrahedron(e, t) {
    e.beginShape(e.TRIANGLES), e.endShape();
  }
  drawOctahedron(e, t) {
    e.beginShape(e.TRIANGLES), e.endShape();
  }
  drawIcosahedron(e, t) {
    e.beginShape(e.TRIANGLES), e.endShape();
  }
  /**
   * Interactive controls
   */
  mousePressed(e) {
    const t = Array.from(this.arcanaeData.keys()), o = t[Math.floor(Math.random() * t.length)];
    this.activateArcanaeMode(o);
  }
  keyPressed(e) {
    (e.key === "s" || e.key === "S") && e.save("codex-144-99-art-" + Date.now() + ".png");
  }
  /**
   * Dataset integration methods
   */
  async connectToDataset(e, t) {
    const o = this.datasetConnections.get(e);
    if (!o || !o.live)
      return console.warn(`Dataset ${e} not available or not live`), null;
    try {
      let a = o.endpoint;
      t && (a += `?q=${encodeURIComponent(t)}`);
      const s = await (await fetch(a)).json();
      return console.log(`📡 Connected to ${o.source}:`, s), s;
    } catch (a) {
      return console.error(`Failed to connect to ${e}:`, a), null;
    }
  }
  /**
   * Activate specific Arcanae visualization mode
   */
  activateArcanaeMode(e) {
    const t = this.arcanaeData.get(e);
    if (!t) {
      console.warn(`Arcana ${e} not found`);
      return;
    }
    console.log(`🃏 Activating ${e} mode with colors:`, t.colors), this.codexNodes.forEach((o, a) => {
      a % 22 === 0 && (o.frequency = t.frequency_range[0] + (t.frequency_range[1] - t.frequency_range[0]) * (a / 144));
    });
  }
  /**
   * Export current state for game/art tools
   */
  exportForGameEngine() {
    return {
      timestamp: Date.now(),
      codex_version: "144:99",
      nodes: this.codexNodes.map((e) => ({
        id: e.id,
        position: e.coordinates,
        frequency: e.frequency,
        type: e.geometry,
        resonance: e.fusion_kink.resonance
      })),
      sacred_geometry: this.sacredGeometry,
      active_datasets: Array.from(this.datasetConnections.keys())
    };
  }
  /**
   * Utility methods for node classification
   */
  getGeometryType(e) {
    const t = ["tetrahedron", "hexahedron", "octahedron", "dodecahedron", "icosahedron"];
    return t[e % t.length];
  }
  getCrystalType(e) {
    const t = [
      "Amethyst",
      "Clear Quartz",
      "Rose Quartz",
      "Citrine",
      "Black Tourmaline",
      "Selenite",
      "Labradorite",
      "Moldavite",
      "Herkimer Diamond"
    ];
    return t[e % t.length];
  }
  getGuardianType(e) {
    const t = [
      "Seraph",
      "Cherub",
      "Throne",
      "Dominion",
      "Virtue",
      "Power",
      "Principality",
      "Archangel",
      "Angel"
    ];
    return t[e % t.length];
  }
  /**
   * Cleanup
   */
  destroy() {
    this.p5Instance && (this.p5Instance.remove(), this.p5Instance = null);
  }
}
export {
  d as P5CodexEngine,
  d as default
};
