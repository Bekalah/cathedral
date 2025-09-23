✦ CATHEDRAL OF CIRCUITS — MASTER BUILD SCROLL ✦

This document is the canonical BUILD.md for cathedral.git.
It merges the Full Build Dossier, the Master Bot Codex, and the Cathedral System Technical Blueprint into one continuous build contract.
It is the law of the Cathedral: all bots, humans, and collaborators must follow these instructions.

⸻

Identity & Purpose
The Cathedral of Circuits is a transformative, open-source consciousness platform that bridges art, science, and spiritual practice. It uses a lattice of 144 crystal nodes + 99 fusion gates + 33 living spine chapters to render sacred geometry, pigments, harmonics, archetypes, and mythopoetic story into a reproducible research and art system.

It is spacious, never claustrophobic. All canvases are ovals, domes, vesicas, mandorlas. Architecture is inspired by Bjarke Ingels Group (curved, airy, playful), Hilma af Klint (spiral temples), Ernst Fuchs (Fantastic Realism ornament), and Emma Kunz (geometric healing diagrams).

It is both atelier and lab, both coven and research platform.

⸻

Rubric of Excellence
Each artifact must satisfy five dimensions (museum rubric):
1.Cosmology (it reveals a system)
2.Rite (it can be enacted or practiced)
3.Diagram (it encodes form and number)
4.Liturgy (it speaks in archetypal language)
5.Artifact Quality (museum-grade, reproducible, citable)

Addendum: each build must also satisfy the 10 technical domains below.

⸻

Repo Trinity + Shared Canon
•🧠 Brain: apps/cosmogenesis → interactive engine, realms, Moonchild lab, exports.
•🜂 Body: apps/stone-grimoire → tokens, pigments, CSS, gold/impasto shaders, accessibility.
•🜃 Soul: apps/liber-arcanae → Tarot, lineages, sealed datasets, companion egregores.
•✴ Shared: packages/codex-14499 → schemas, node formulas, append-only canon.

All work must live inside Brain, Body, Soul, or Shared.
Never create stray top-level folders.
If uncertain, stage to _staging/ and run scripts/align-tree.mjs.

⸻

Node Formula Law
Each of the 144 nodes carries a deterministic formula linking number → shape, color, sound, motion, lineage.

Example (071): {
  "id":"C144N-071",
  "realm":"vienna-house",
  "lineage":["Vienna Fantastic Realism","Hermetic Qabalah"],
  "formula":{
    "seed":7071,
    "geometry":{"rose_k":"P(N)%11+2","super_m":"N%12+2","vesica":"phi^parity"},
    "pigment":{"warm":"venetian_red","cool":"ultramarine","ground":"gesso_white","glaze_passes":2},
    "material":{"gilded":true,"alabaster":0.04},
    "harmonics":{"base":"realm","tempo":"60+(N%24)"},
    "motion":{"mode":"calm","period_s":18}
  },
  "annex":{"bibliography":["vienna:ernst-fuchs"],"archetypes":["LA-05-HIEROPHANT"]},
  "safety":{"autoplay":false,"strobe":false,"aura":true}
} Runtime must resolve formula → concrete parameters.
Export bundles must include both resolved values and the original formula for reproducibility.

⸻

ND-Safe Standards
•Motion off by default. Enabled only via body.allow-motion.
•No strobe, no autoplay.
•Audio gain ≤ 0.1, ADSR ramp ≥ 0.3s.
•Contrast ≥ 4.5:1.
•Spacious UI mode is default: +30–40% margins, curved trays, large knobs.
•Always provide a Calm/Stop button that halts loops globally.

⸻

✦ THE 10 TECHNICAL DOMAINS ✦

1. Real-time Sacred Geometry Engines
•GSDF hybrid (Gaussian + SDF) to morph between forms in real-time.
•TetraDiffusion for 200× faster mesh generation (Metatron’s Cube ↔ Flower of Life).
•Jump Flooding Algorithm for in-browser SDFs at 60fps (no server).
•WebGPU compute shaders with half-precision floats; millions of vertices at cathedral scale.
•Implementation lives in: apps/cosmogenesis/public/js/geometry/gsdf-engine.js.

2. Spectral Pigment Mixing (Kubelka–Munk)
•Use Spectral.js with 64-bit floats for reflectance curves.
•Pigments: ultramarine, vermilion, malachite, azurite, verdigris, venetian_red, ochre, umber, lead_tin_yellow, gesso_white, gold leaf.
•ML spectral curve generation (JAX) to design pigments with predictable mixing.
•OKLab/OKLCH integration for perceptual harmony.
•Implementation lives in: apps/stone-grimoire/assets/pigments/*.json + kubelka-munk.js.

3. Harmonic Visualization & Synesthesia
•Clubber.js maps audio to chakra/harmonic bands.
•Mid frequencies → flow, bass/treble → color + spatial transformation.
•Spectral centroid ↔ elevation, rolloff ↔ color temperature.
•Map harmonic data → sacred geometry params: mandala rotation, petal count, ring count, hue shift.
•Implementation: apps/cosmogenesis/public/js/sound/clubber-synesthesia.js.

4. WebGPU + WebAssembly Acceleration
•WASM for pigment math + KM reflectance.
•WGSL shaders for geometry/harmonics.
•Chrome WebGPU optimizations: 3× faster half-precision, packed dot products.
•Cellular automata GPU: 1000× speedup for emergent pattern labs.
•Implementation: apps/cosmogenesis/public/js/compute/webgpu-pipeline.js.

5. Deterministic Reproducibility
•Every session → reproducible hash (optionally blockchain-anchored).
•Capture full system state (formula, pigment spectra, geometry params, audio data).
•Export: research.json with checksum + ORCID attribution.
•Class: CathedralReproducibility in apps/cosmogenesis/public/js/system/reproducibility.js.

6. Framework Integration & Performance
•Rust Nannou (via WASM) for memory-safe creative core.
•Kotlin OPENRNDR plugin bridges for complex shader + UI.
•Datoviz style Vulkan rendering for scientific visualizations.
•Cross-framework layering must remain modular: Brain UI is JS, heavy compute can offload to WASM/Rust.

7. Multi-Audience Design Patterns
•Adaptive vocab: “frequency” vs “tone” vs “vibration”.
•Workflow layers: scientist, artist, contemplative; all call the same underlying engine.
•Documentation: triple-view (scientific, artistic, experiential).
•Glossary: community-driven, bridges terms across traditions.

8. Accessibility Innovations
•Dual-layer WebGL accessibility: invisible DOM overlays + semantic navigation.
•React Three A11y for 3D spaces.
•Context-sensitive help, progressive disclosure.
•Multi-sensory feedback: visual, auditory, haptic.

9. State Management
•Jotai atoms for meditation sessions + visualization params.
•MobX observables for auto-propagation of bio/geometry data.
•Micro-frontend state per module (geometry engine, sound, consciousness tracking). const meditationSessionAtom = atom({
  startTime:null, currentPhase:'preparation',
  biorhythmData:[], visualizationParams:{}
}) 10. Community-Driven Fusionist Development
•Development model must mirror Nannou/OPENRNDR: active forums, contributor onboarding, educational docs.
•Fusionist lineage registry already established ; use it to ground every experiment in art + science + mysticism.

⸻

Exports & Research Bundles
Every plate exports:
•artifact.svg with <metadata> block.
•research.json (formula, resolved params, codex IDs, pigment spectra, harmonics, coven profile).
•pigments/*.json for pigments used.
•triptych.png with altarpiece framing (center art, left params, right lineage).
•checksums.txt.

⸻

Acceptance Checklist
•Ovals/vesicas only; no rectangular primary canvases.
•Pigments KM + OKLab visible in render.
•Gold glint active, ND-safe.
•Clubber.js harmonic mapping drives geometry.
•WebGPU pipeline compiles; WASM fallback works.
•Reproducible session hash exported.
•A11y audit passes.
•Fly.io deploy idles to zero and restarts cleanly.

⸻

Motto
In sacra figura, scientia et ars resonant.
“In sacred pattern, science and art resonate.”

— End of BUILD.md Scroll —

⸻

✨ This scroll is now a single, giant build contract. You can commit it to cathedral.git/BUILD.md and hand it straight to Claude/code bots.
— CATHEDRAL INTEGRITY ADDENDUM (NO PLACEHOLDERS) —

All contributors and code-bots must obey:

1) Canon-first: Only commit real canon. If data is not ready, do nothing. Do not invent, scaffold, or “mock”.
2) Append-only: Codex 144:99 is append-only. No overwrites, no renames of canon IDs.
3) No placeholders: The Cathedral forbids the introduction of placeholder text, fake datasets, empty meshes, bogus pigments, or “example” records. If you lack a real value, omit the field entirely.
4) Layer law (many layers preserved):
   • Number → Formula → Geometry → Pigment → Material → Harmonics → Motion → Annex (Lineage/Archetype) → Export (SVG+JSON+Checksums)
   • Each node plate is circular/oval; domed depth; ND-safe; deterministic; museum-grade export.
5) Deferral protocol: If a feature depends on missing canon, implement the interface and return a clear “awaiting canon” message in the UI (no fallback art), then stop. Never draw filler visuals. Never write placeholder JSON.
6) Provenance: Every export in research.json must include original formula + resolved parameters + ORCID + checksums.
7) Spatial vow: All primary canvases are ovals/vesicas/mandorlas with generous margins; no rectangular primary canvases.
8) Safety: No autoplay. Motion/audio only if body.allow-motion. No strobe. Contrast ≥ 4.5:1. Calm/Stop always available.
9) Placement: Only write to Brain (apps/cosmogenesis), Body (apps/stone-grimoire), Soul (apps/liber-arcanae), Shared (packages/codex-14499). If unsure, write nothing; or stage to _staging/ for human triage.
10) Gate: Before commit, run `node scripts/no-placeholders.mjs`. Commits must pass the gate.

This addendum guards the Cathedral’s many-layer plan. No shortcuts, no fake scaffolds. Only living canon.
— FINIS —
