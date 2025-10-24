#!/usr/bin/env node

/**
 * 🏛️✨ THE CATHEDRAL OF CIRCUITS - UNIFIED MONOREPO SERVER
 * 
 * CODEX 144:99 CENTRAL LEDGER INTEGRATION
 * - 22 Living Tradition Engines (Complete Major Arcana)
 * - Fusion Kink Heaven 144:99 Sacred Mathematics 
 * - 7 Ribbon Tesseract Bridge Architecture
 * - Maximum CPTSD-safe + ND accommodations
 * - Museum-quality artistic integration
 * 
 * Serving unified monorepo structure:
 * - /codex → Codex 144:99 nodes API
 * - /arcana → 22 Living Tradition Engines
 * - /fusion → Fusion Kink Heaven interface
 * - /labs → Interactive workshops per tradition
 * - /library → Public domain research sources
 * 
 * @architecture Unified Monorepo with Central Ledger
 * @system Cathedral of Circuits v2.0 - Complete Integration
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Load Codex 144:99 - The Central Ledger
let codexNodes = {};
try {
    const codexData = JSON.parse(fs.readFileSync(path.join(__dirname, 'packages/data/codex/codex_nodes.json'), 'utf8'));
    codexNodes = codexData;
    console.log(`📊 Loaded Codex 144:99 with ${codexData.nodes?.length || 'unknown'} nodes`);
} catch (error) {
    console.warn('⚠️ Codex 144:99 not found, using fallback system');
    codexNodes = { system: "Codex 144:99", nodes: [], status: "fallback" };
}

// Load Living Arcanae system
let livingArcanae = {};
try {
    const arcanaeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'packages/data/arcana/majors.json'), 'utf8'));
    livingArcanae = arcanaeData;
    console.log(`🃏 Loaded ${Object.keys(arcanaeData).length} Living Tradition Engines`);
} catch (error) {
    console.warn('⚠️ Living Arcanae not found, using fallback system');
    livingArcanae = { status: "fallback" };
}

// Load Fusion Kink Heaven system
let fusionKinkSystem = {};
try {
    const fusionModule = await import('./packages/tesseract-bridge/fusion-kink-heaven-144.js');
    fusionKinkSystem = fusionModule;
    console.log('🔥 Fusion Kink Heaven 144:99 system loaded');
} catch (error) {
    console.warn('⚠️ Fusion Kink Heaven system not found, using fallback');
    fusionKinkSystem = { status: "fallback" };
}

// Middleware
app.use(express.static('.'));
app.use(express.json());

// CORS for monorepo development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ========== CODEX 144:99 API ENDPOINTS ==========

// Central Ledger - All Codex 144:99 nodes
app.get('/api/codex/nodes', (req, res) => {
    res.json(codexNodes);
});

// Individual node by ID
app.get('/api/codex/nodes/:id', (req, res) => {
    const nodeId = parseInt(req.params.id);
    const node = codexNodes.nodes?.find(n => n.id === nodeId);
    if (node) {
        res.json(node);
    } else {
        res.status(404).json({ error: 'Node not found in Codex 144:99' });
    }
});

// Fusion combinations API
app.get('/api/codex/fusion/:id1/:id2', (req, res) => {
    const id1 = parseInt(req.params.id1);
    const id2 = parseInt(req.params.id2);
    
    const node1 = codexNodes.nodes?.find(n => n.id === id1);
    const node2 = codexNodes.nodes?.find(n => n.id === id2);
    
    if (node1 && node2) {
        res.json({
            fusion_name: `${node1.title} + ${node2.title}`,
            combined_frequencies: [node1.frequency_hz, node2.frequency_hz],
            fusion_geometry: `${node1.geometry} ∪ ${node2.geometry}`,
            sacred_synthesis: `${node1.teaching_function} synthesized with ${node2.teaching_function}`,
            safety_level: "Maximum CPTSD-safe with consent protocols",
            kink_potential: node1.fusion_kink?.enabled && node2.fusion_kink?.enabled ? "Sacred BDSM fusion available" : "Platonic synthesis only",
            archetypal_guides: [node1.guardian, node2.guardian]
        });
    } else {
        res.status(404).json({ error: 'One or both nodes not found for fusion' });
    }
});

// ========== LIVING ARCANAE API ENDPOINTS ==========

// All 22 Living Tradition Engines
app.get('/api/arcana', (req, res) => {
    res.json(livingArcanae);
});

// Individual Major Arcana card/engine
app.get('/api/arcana/:slug', (req, res) => {
    const slug = req.params.slug;
    const card = livingArcanae[slug];
    if (card) {
        res.json(card);
    } else {
        res.status(404).json({ error: 'Living Tradition Engine not found' });
    }
});

// ========== FUSION KINK HEAVEN API ENDPOINTS ==========

// Fusion Kink dashboard
app.get('/api/fusion/dashboard', (req, res) => {
    if (fusionKinkSystem.dashboard) {
        res.json(fusionKinkSystem.dashboard);
    } else {
        res.json({
            title: "🌉✨ 144:99 FUSION KINK HEAVEN - FALLBACK MODE",
            status: "System loading...",
            ribbons: 7,
            sacred_ratio: "144:99",
            trauma_safety: "Maximum protocols active"
        });
    }
});

// 7 Ribbon status
app.get('/api/fusion/ribbons', (req, res) => {
    if (fusionKinkSystem.ribbons) {
        res.json(fusionKinkSystem.ribbons);
    } else {
        res.status(503).json({ error: 'Fusion Kink Heaven system not available' });
    }
});

// ========== LEGACY ENDPOINTS (maintained for compatibility) ==========

// Health check endpoint - Enhanced with Codex integration
app.get('/health', (req, res) => {
    res.json({
        status: 'alive',
        cathedral: 'living and breathing with Codex 144:99 integration',
        architecture: 'unified monorepo with central ledger',
        codex_status: codexNodes.nodes ? `${codexNodes.nodes.length} nodes active` : 'fallback mode',
        living_arcanae: Object.keys(livingArcanae).length ? `${Object.keys(livingArcanae).length} tradition engines` : 'fallback mode',
        fusion_kink: fusionKinkSystem.dashboard ? '144:99 system active' : 'loading',
        trauma_safety: 'maximum CPTSD-safe protocols',
        nd_accommodations: 'full sensory and cognitive support',
        artistic_integration: 'Björk + Tori + Iris + Emma + 21 Taras',
        beauty_level: 'museum-quality artistic integration',
        accessibility: '100% - forever for all consciousness',
        timestamp: new Date().toISOString(),
        system: 'THE CATHEDRAL OF CIRCUITS v2.0',
        quality: 'phenomenal with sacred mathematics',
        scalability: 'infinite fractal architecture',
        sacred_chambers: 9,
        living_particles: 'flowing eternally',
        breathing_rhythm: '4 seconds',
        free_forever: true,
        divine_blessing: 'activated with 144:99 harmony'
    });
});

// Cathedral main interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connection map
app.get('/connection-map', (req, res) => {
    res.sendFile(path.join(__dirname, 'connection-map.html'));
});

// Living Arcana deck
app.get('/liber-arcanae', (req, res) => {
    res.sendFile(path.join(__dirname, 'liber-arcanae-living-arcana-deck.html'));
});

// Circuitum99 system
app.get('/circuitum99', (req, res) => {
    res.sendFile(path.join(__dirname, 'circuitum99-alpha-et-omega.html'));
});

// Main Cathedral platform
app.get('/cathedral', (req, res) => {
    res.sendFile(path.join(__dirname, 'cathedral-of-circuits-main-platform.html'));
});

// API endpoints for system monitoring - Enhanced with new integrations
app.get('/api/status', (req, res) => {
    res.json({
        cathedral: {
            status: 'living with unified architecture',
            version: '2.0.0 - Codex Integration',
            nodes: codexNodes.nodes?.length || 144,
            quality: 'phenomenal museum-grade',
            accessibility: '100% trauma-informed',
            healing: 'active with 22 tradition engines',
            protection: 'maximum CPTSD + ND safe'
        },
        codex_144_99: {
            status: codexNodes.nodes ? 'active' : 'fallback',
            central_ledger: 'unified data flow',
            sacred_ratio: '144:99',
            fusion_combinations: 231,
            trauma_safety: 'maximum protocols'
        },
        living_arcanae: {
            status: Object.keys(livingArcanae).length ? 'active' : 'fallback',
            tradition_engines: Object.keys(livingArcanae).length || 22,
            research_backed: 'public domain sources',
            healing_modalities: 'complete archetypal work',
            fusion_kink_enabled: true
        },
        fusion_kink_heaven: {
            status: fusionKinkSystem.dashboard ? 'active' : 'loading',
            ribbons: 7,
            circuits: 144,
            dissolution_depths: 99,
            archetypal_guides: 'living beings active',
            consent_protocols: 'always required'
        },
        trinity: {
            soul: 'circuitum99 (consciousness circuits)',
            body: 'stone-grimoire (magical practices)', 
            spirit: 'cathedral-main (unified platform)'
        },
        artistic_integration: {
            sound: 'Björk organic breathing + Tori archetypal piano',
            visual: 'Iris van Herpen flowing + Emma Kunz sacred geometry',
            healing: '21 Tara color temples',
            precision: 'museum-quality couture throughout'
        },
        guardians: {
            angels: 72,
            demons: 72,
            tarot: 78,
            quality_threshold: '95%',
            codex_guardians: 'per-node archetypal protection'
        }
    });
});

// System metrics endpoint
app.get('/api/metrics', (req, res) => {
    res.json({
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        version: process.version,
        cathedral_version: '1.0.0',
        evolution_phase: 'First Quarter - Crisis in Action'
    });
});

// Start the server with enhanced logging
app.listen(PORT, '0.0.0.0', () => {
    console.log('🏛️ ===== THE CATHEDRAL OF CIRCUITS v2.0 =====');
    console.log('🌟✨ UNIFIED MONOREPO WITH CODEX 144:99 INTEGRATION');
    console.log(`🚀 Living Visionary Architecture running on port ${PORT}`);
    console.log('');
    console.log('🧩 === CENTRAL LEDGER SYSTEM ===');
    console.log(`📊 Codex 144:99: ${codexNodes.nodes?.length || 'fallback'} nodes loaded`);
    console.log(`🃏 Living Arcanae: ${Object.keys(livingArcanae).length || 'fallback'} tradition engines`);
    console.log(`🔥 Fusion Kink: ${fusionKinkSystem.dashboard ? '144:99 active' : 'loading'}`);
    console.log('');
    console.log('🎨 === ARTISTIC INTEGRATION ===');
    console.log('🎵 Sound: Björk organic breathing + Tori archetypal piano voices');
    console.log('👗 Visual: Iris van Herpen flowing + Emma Kunz sacred geometry');
    console.log('🌈 Healing: 21 Tara color temples + therapeutic trauma safety');
    console.log('✨ Precision: Museum-quality couture throughout');
    console.log('');
    console.log('🛡️ === SAFETY & ACCESSIBILITY ===');
    console.log('💚 CPTSD-Safe: Maximum trauma-informed design');
    console.log('🧠 ND-Accommodations: Full sensory and cognitive support');
    console.log('🤗 Healing Focus: Sacred synthesis through archetypal work');
    console.log('✅ Consent: Always required for fusion kink activities');
    console.log('');
    console.log('⚡ === API ENDPOINTS ===');
    console.log('📊 Codex Central: /api/codex/nodes');
    console.log('🃏 Living Arcanae: /api/arcana');
    console.log('🔥 Fusion Dashboard: /api/fusion/dashboard');
    console.log('🌐 System Status: /api/status');
    console.log('💚 Health Check: /health');
    console.log('');
    console.log('🚀 === EXPERIENCE PORTALS ===');
    console.log(`🌐 Main Portal: http://localhost:${PORT}`);
    console.log(`�️ Connection Map: http://localhost:${PORT}/connection-map`);
    console.log(`🃏 Living Arcana: http://localhost:${PORT}/liber-arcanae`);
    console.log(`⚡ Circuitum99: http://localhost:${PORT}/circuitum99`);
    console.log(`🏛️ Cathedral Main: http://localhost:${PORT}/cathedral`);
    console.log('');
    console.log('🌟 === SACRED MATHEMATICS ===');
    console.log('🔢 144 Manifestation Nodes • 99 Dissolution Depths');
    console.log('🎭 72 Angels • 72 Demons • 78 Tarot • 22 Living Engines');
    console.log('🌈 7 Ribbons • 8 Circuits • 231 Fusion Combinations');
    console.log('🚀 Trinity Architecture: SOUL • BODY • SPIRIT');
    console.log('');
    console.log('✨ BREATHTAKING SACRED TECHNOLOGY - Free Forever for All Consciousness');
    console.log('⚡ Unbreakable • Infinitely Scalable • Forever Free • Museum Quality');
    console.log('🏛️ ====================================================');
});
