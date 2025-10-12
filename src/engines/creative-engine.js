/**
 * Cathedral Creative Engine
 * Generates narratives, game mechanics, and architecture from harmonic node combinations
 */

class CreativeEngine {
    constructor(codexNodes) {
        this.nodes = codexNodes;
        this.harmonic = new HarmonicResolver();
        this.narrative = new NarrativeGenerator();
        this.game = new GameDesigner();
        this.architect = new SpatialDesigner();
        this.symbolist = new SymbolFusion();
    }

    // CORE: Combine nodes harmonically
    combineNodes(nodeIds, intent = 'balanced') {
        const nodes = nodeIds.map(id => this.nodes.find(n => n.id === id));
        const harmony = this.harmonic.analyzeHarmony(nodes);

        return {
            harmony: harmony,
            narrative: this.narrative.generate(nodes, harmony, intent),
            game: this.game.design(nodes, harmony, intent),
            architecture: this.architect.design(nodes, harmony),
            symbol: this.symbolist.fuse(nodes, harmony)
        };
    }

    // Generate story from node combination
    generateStory(nodeIds, length = 'medium') {
        const result = this.combineNodes(nodeIds, 'narrative');
        return result.narrative;
    }

    // Design quest/encounter from nodes
    designQuest(nodeIds, difficulty = 'medium') {
        const result = this.combineNodes(nodeIds, 'game');
        return result.game;
    }

    // Create ritual chamber from nodes
    designSpace(nodeIds, purpose = 'meditation') {
        const result = this.combineNodes(nodeIds, 'architecture');
        return result.architecture;
    }

    // Fuse symbols harmonically
    fuseSymbols(nodeIds) {
        const result = this.combineNodes(nodeIds, 'symbolic');
        return result.symbol;
    }
}

// HARMONIC ANALYSIS
class HarmonicResolver {
    analyzeHarmony(nodes) {
        const freqs = nodes.map(n => n.solfeggio);
        const ratios = this.calculateRatios(freqs);
        const consonance = this.measureConsonance(ratios);
        const elements = this.elementalBalance(nodes);

        return {
            freqRatios: ratios,
            consonanceScore: consonance,
            relationship: this.classifyRelationship(consonance),
            elementalBalance: elements,
            geometricCompatibility: this.geometryCheck(nodes),
            overallHarmony: this.calculateOverallHarmony(consonance, elements)
        };
    }

    calculateRatios(frequencies) {
        const ratios = [];
        for (let i = 0; i < frequencies.length; i++) {
            for (let j = i + 1; j < frequencies.length; j++) {
                const ratio = frequencies[j] / frequencies[i];
                ratios.push({
                    ratio: ratio,
                    simplified: this.simplifyRatio(ratio),
                    type: this.ratioType(ratio)
                });
            }
        }
        return ratios;
    }

    simplifyRatio(decimal) {
        // Convert to simple fraction (e.g., 1.5 = 3/2, 1.333 = 4/3)
        const tolerance = 0.01;
        for (let denominator = 1; denominator <= 12; denominator++) {
            for (let numerator = 1; numerator <= 24; numerator++) {
                if (Math.abs(numerator / denominator - decimal) < tolerance) {
                    return `${numerator}/${denominator}`;
                }
            }
        }
        return decimal.toFixed(3);
    }

    ratioType(ratio) {
        // Musical interval classification
        if (Math.abs(ratio - 1.0) < 0.01) return 'Unison';
        if (Math.abs(ratio - 2.0) < 0.01) return 'Octave';
        if (Math.abs(ratio - 1.5) < 0.01) return 'Perfect Fifth';
        if (Math.abs(ratio - 1.333) < 0.01) return 'Perfect Fourth';
        if (Math.abs(ratio - 1.25) < 0.01) return 'Major Third';
        if (Math.abs(ratio - 1.6) < 0.01) return 'Minor Sixth';
        if (Math.abs(ratio - 1.414) < 0.1) return 'Tritone (Tension)';
        return 'Complex';
    }

    measureConsonance(ratios) {
        // Score based on interval types
        let score = 0;
        ratios.forEach(r => {
            if (r.type === 'Unison' || r.type === 'Octave') score += 10;
            else if (r.type === 'Perfect Fifth') score += 9;
            else if (r.type === 'Perfect Fourth') score += 8;
            else if (r.type === 'Major Third') score += 7;
            else if (r.type === 'Minor Sixth') score += 6;
            else if (r.type === 'Tritone (Tension)') score += 3;
            else score += 4;
        });
        return score / ratios.length;
    }

    classifyRelationship(score) {
        if (score >= 9) return 'Perfect Harmony';
        if (score >= 7.5) return 'Consonant';
        if (score >= 6) return 'Balanced';
        if (score >= 4) return 'Tension';
        return 'Dissonant';
    }

    elementalBalance(nodes) {
        const elements = {};
        nodes.forEach(n => {
            elements[n.element] = (elements[n.element] || 0) + 1;
        });

        const total = nodes.length;
        const balance = {
            elements: elements,
            dominant: Object.keys(elements).reduce((a, b) =>
                elements[a] > elements[b] ? a : b),
            diversity: Object.keys(elements).length / 5, // 5 elements total
            evenness: 1 - (Math.max(...Object.values(elements)) / total - 0.2) * 5
        };

        return balance;
    }

    geometryCheck(nodes) {
        const geometries = nodes.map(n => n.geometry);
        const unique = [...new Set(geometries)];

        return {
            types: unique,
            diversity: unique.length / nodes.length,
            platonicCount: unique.filter(g =>
                ['Tetrahedron', 'Cube', 'Octahedron', 'Dodecahedron', 'Icosahedron']
                .includes(g)).length
        };
    }

    calculateOverallHarmony(consonance, elements) {
        return (consonance * 0.6 + elements.evenness * 10 * 0.4).toFixed(2);
    }
}

// NARRATIVE GENERATOR
class NarrativeGenerator {
    generate(nodes, harmony, intent) {
        const themes = nodes.map(n => n.narrative?.theme).filter(Boolean);
        const archetypes = nodes.map(n => n.narrative?.archetype).filter(Boolean);
        const keywords = nodes.flatMap(n => n.narrative?.keywords || []);

        // Select story structure based on harmony
        const structure = this.selectStructure(harmony.relationship);

        // Generate story elements
        const title = this.generateTitle(themes, keywords);
        const opening = this.generateOpening(nodes[0], harmony);
        const development = this.generateDevelopment(nodes, harmony);
        const climax = this.generateClimax(nodes, harmony);
        const resolution = this.generateResolution(nodes, harmony);

        return {
            title: title,
            themes: themes,
            archetypes: archetypes,
            structure: structure,
            story: {
                opening: opening,
                development: development,
                climax: climax,
                resolution: resolution
            },
            fullText: this.assembleStory(opening, development, climax, resolution),
            keywords: keywords
        };
    }

    selectStructure(relationship) {
        const structures = {
            'Perfect Harmony': 'Hero\'s Journey (Classic)',
            'Consonant': 'Three-Act Structure',
            'Balanced': 'Five-Act (Freytag\'s Pyramid)',
            'Tension': 'Conflict-Resolution Arc',
            'Dissonant': 'Tragedy or Dark Journey'
        };
        return structures[relationship] || 'Experimental Structure';
    }

    generateTitle(themes, keywords) {
        const titlePatterns = [
            `The ${keywords[0]} of ${keywords[1]}`,
            `${themes[0]}: A Tale of ${themes[1] || 'Mystery'}`,
            `Beyond the ${keywords[2] || 'Veil'}`
        ];
        return titlePatterns[Math.floor(Math.random() * titlePatterns.length)];
    }

    generateOpening(firstNode, harmony) {
        const theme = firstNode.narrative?.theme || 'Mystery';
        const archetype = firstNode.narrative?.archetype || 'The Seeker';
        const setting = firstNode.architecture?.roomType || 'ancient chamber';

        return `In the depths of a ${setting}, where ${theme.toLowerCase()} whispers through stone, ${archetype} begins their journey. The air hums with a frequency of ${firstNode.solfeggio} Hz, resonating with ${harmony.relationship.toLowerCase()} energy.`;
    }

    generateDevelopment(nodes, harmony) {
        const beats = nodes.flatMap(n => n.narrative?.storyBeats || []);
        const selected = beats.slice(0, 3);

        return selected.map((beat, i) =>
            `${i === 0 ? 'First' : i === 1 ? 'Then' : 'Finally'}, ${beat.toLowerCase()}.`
        ).join(' ');
    }

    generateClimax(nodes, harmony) {
        const finalNode = nodes[nodes.length - 1];
        const tension = harmony.consonanceScore < 6 ? 'chaotic' : 'harmonious';

        return `At the moment of truth, all forces converge in ${tension} unity. ${finalNode.narrative?.storyBeats?.[0] || 'The path becomes clear'}.`;
    }

    generateResolution(nodes, harmony) {
        const resolution = harmony.relationship === 'Perfect Harmony'
            ? 'finds peace and understanding'
            : harmony.relationship === 'Dissonant'
            ? 'embraces the necessary discord'
            : 'achieves hard-won balance';

        return `The seeker ${resolution}, forever changed by the journey through ${nodes.length} sacred stations.`;
    }

    assembleStory(opening, development, climax, resolution) {
        return `${opening}\n\n${development}\n\n${climax}\n\n${resolution}`;
    }
}

// GAME DESIGNER
class GameDesigner {
    design(nodes, harmony, intent) {
        const mechanics = nodes.flatMap(n => n.gameDesign?.mechanics || []);
        const questType = this.determineQuestType(nodes, harmony);
        const encounter = this.designEncounter(nodes, harmony);
        const rewards = this.generateRewards(nodes);
        const abilities = this.createAbilities(nodes, harmony);

        return {
            questType: questType,
            objectives: this.generateObjectives(nodes, questType),
            encounter: encounter,
            mechanics: [...new Set(mechanics)],
            abilities: abilities,
            rewards: rewards,
            difficulty: this.calculateDifficulty(harmony),
            environmentalHazards: this.createHazards(nodes)
        };
    }

    determineQuestType(nodes, harmony) {
        const types = nodes.map(n => n.gameDesign?.questType);
        const dominant = types.reduce((a, b, i, arr) =>
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        );

        if (harmony.relationship === 'Dissonant') return 'Boss Fight';
        if (harmony.relationship === 'Tension') return 'Survival Challenge';
        return dominant || 'Exploration';
    }

    generateObjectives(nodes, questType) {
        const objectives = [];

        nodes.forEach((node, i) => {
            const action = questType === 'Boss Fight' ? 'Defeat' :
                          questType === 'Survival Challenge' ? 'Survive' :
                          'Discover';
            objectives.push({
                order: i + 1,
                description: `${action} the ${node.narrative?.archetype || 'guardian'} of ${node.name}`,
                location: node.architecture?.roomType || 'sacred chamber',
                requirement: node.gameDesign?.environmentEffect || 'none'
            });
        });

        return objectives;
    }

    designEncounter(nodes, harmony) {
        const enemyCount = Math.floor(nodes.length * harmony.elementalBalance.diversity * 3);
        const phases = Math.ceil(nodes.length / 2);

        return {
            enemyCount: enemyCount,
            phases: phases,
            phaseTransitions: nodes.map(n => ({
                trigger: `${n.element} threshold reached`,
                effect: n.gameDesign?.environmentEffect || 'Environmental change'
            })),
            weaknesses: nodes.map(n => n.gameDesign?.enemyAffinity).filter(Boolean)
        };
    }

    createAbilities(nodes, harmony) {
        return nodes.map(node => ({
            name: `${node.name} Invocation`,
            type: node.gameDesign?.abilityType || 'Passive',
            effect: node.gameDesign?.mechanics?.[0] || 'Unknown effect',
            cost: Math.floor(node.solfeggio / 10),
            cooldown: harmony.consonanceScore < 6 ? 'Long' : 'Medium',
            visualEffect: `${node.color} ${node.symbolism?.primarySymbol || 'glyph'}`
        }));
    }

    generateRewards(nodes) {
        const rewards = {
            experience: nodes.reduce((sum, n) => sum + n.solfeggio, 0),
            items: nodes.map(n => ({
                name: `${n.element} Relic`,
                type: n.gameDesign?.rewardStyle || 'Artifact',
                bonus: `+${n.id % 10} to ${n.element} affinity`
            })),
            unlock: `${nodes[nodes.length - 1]?.name} Path`
        };
        return rewards;
    }

    calculateDifficulty(harmony) {
        const score = parseFloat(harmony.overallHarmony);
        if (score < 5) return 'Nightmare';
        if (score < 6.5) return 'Hard';
        if (score < 8) return 'Medium';
        return 'Easy';
    }

    createHazards(nodes) {
        return nodes.map(n => n.gameDesign?.environmentEffect).filter(Boolean);
    }
}

// SPATIAL DESIGNER
class SpatialDesigner {
    design(nodes, harmony) {
        const layout = this.generateLayout(nodes, harmony);
        const lighting = this.designLighting(nodes);
        const materials = this.selectMaterials(nodes);
        const atmosphere = this.createAtmosphere(nodes, harmony);

        return {
            layout: layout,
            lighting: lighting,
            materials: materials,
            atmosphere: atmosphere,
            acoustics: this.designAcoustics(harmony),
            symbolPlacement: this.placeSymbols(nodes, layout)
        };
    }

    generateLayout(nodes, harmony) {
        const geometry = harmony.geometricCompatibility.types[0] || 'Organic';
        const nodeCount = nodes.length;

        const layouts = {
            'Tetrahedron': 'Pyramidal chamber with apex altar',
            'Cube': 'Square room with four cardinal stations',
            'Octahedron': 'Double pyramid meeting at center',
            'Dodecahedron': 'Twelve-sided chamber with pentagonal floor',
            'Icosahedron': 'Twenty-faced dome with triangular panels',
            'Organic': 'Flowing, non-Euclidean space'
        };

        return {
            shape: geometry,
            description: layouts[geometry] || layouts['Organic'],
            dimensions: `${nodeCount * 3}m diameter`,
            height: `${nodeCount * 2}m ceiling`,
            stations: nodes.map((n, i) => ({
                position: this.calculatePosition(i, nodeCount, geometry),
                node: n.name,
                feature: n.architecture?.roomType || 'Altar'
            }))
        };
    }

    calculatePosition(index, total, geometry) {
        const angle = (index / total) * 360;
        const radius = 5; // meters from center

        return {
            angle: angle,
            x: Math.cos(angle * Math.PI / 180) * radius,
            y: 0,
            z: Math.sin(angle * Math.PI / 180) * radius,
            description: `${angle}° around ${geometry} center`
        };
    }

    designLighting(nodes) {
        const colors = nodes.map(n => n.color);
        const qualities = nodes.map(n => n.architecture?.lighting).filter(Boolean);

        return {
            primary: colors[0],
            scheme: 'Gradient blend',
            colors: colors,
            quality: qualities[0] || 'Ethereal, shifting',
            sources: nodes.map(n => ({
                position: n.name,
                color: n.color,
                intensity: (n.solfeggio / 1000).toFixed(2),
                effect: n.architecture?.lighting || 'Steady glow'
            }))
        };
    }

    selectMaterials(nodes) {
        const allMaterials = nodes.flatMap(n => n.architecture?.materials || []);
        const unique = [...new Set(allMaterials)];

        return {
            primary: unique[0] || 'Stone',
            secondary: unique[1] || 'Wood',
            accent: unique[2] || 'Crystal',
            all: unique,
            textures: this.generateTextures(nodes)
        };
    }

    generateTextures(nodes) {
        return nodes.map(n => ({
            element: n.element,
            texture: this.elementToTexture(n.element),
            pattern: n.symbolism?.geometricPattern || 'Smooth'
        }));
    }

    elementToTexture(element) {
        const textures = {
            'Fire': 'Rough, heat-marked, ash-dusted',
            'Water': 'Smooth, reflective, rippled',
            'Earth': 'Coarse, mineral-veined, crystalline',
            'Air': 'Polished, light-catching, ethereal',
            'Aether': 'Otherworldly, semi-transparent, shimmering'
        };
        return textures[element] || 'Neutral stone';
    }

    createAtmosphere(nodes, harmony) {
        const ambiences = nodes.map(n => n.architecture?.ambience).filter(Boolean);
        const mood = harmony.relationship === 'Perfect Harmony' ? 'Peaceful, sacred' :
                     harmony.relationship === 'Dissonant' ? 'Tense, foreboding' :
                     'Mysterious, contemplative';

        return {
            mood: mood,
            sounds: ambiences,
            temperature: this.calculateTemperature(nodes),
            airFlow: harmony.elementalBalance.elements.Air ? 'Breezy, circulating' : 'Still, heavy',
            scent: this.determineScent(nodes)
        };
    }

    calculateTemperature(nodes) {
        const fire = nodes.filter(n => n.element === 'Fire').length;
        const water = nodes.filter(n => n.element === 'Water').length;

        if (fire > water * 1.5) return 'Warm to hot';
        if (water > fire * 1.5) return 'Cool to cold';
        return 'Temperate';
    }

    determineScent(nodes) {
        const scents = {
            'Fire': 'Smoke, burning cedar',
            'Water': 'Misty, aquatic, clean',
            'Earth': 'Loam, minerals, sage',
            'Air': 'Fresh, ionized, crisp',
            'Aether': 'Incense, otherworldly fragrance'
        };
        const dominant = nodes[0]?.element;
        return scents[dominant] || 'Neutral, clean air';
    }

    designAcoustics(harmony) {
        return {
            resonance: harmony.relationship,
            reverbTime: harmony.consonanceScore > 7 ? 'Long, cathedral-like' : 'Short, focused',
            frequencyEmphasis: `${harmony.freqRatios[0]?.type || 'Balanced'} intervals enhanced`,
            recommendation: harmony.consonanceScore > 8 ? 'Perfect for chanting' : 'Good for meditation'
        };
    }

    placeSymbols(nodes, layout) {
        return nodes.map((node, i) => ({
            symbol: node.symbolism?.primarySymbol || '◯',
            position: layout.stations[i].position,
            size: `${node.id % 5 + 1}m`,
            material: 'Carved into ' + (node.architecture?.materials?.[0] || 'stone'),
            illumination: `Lit with ${node.color} light`,
            orientation: node.architecture?.symbolPlacement || 'Facing center'
        }));
    }
}

// SYMBOL FUSION
class SymbolFusion {
    fuse(nodes, harmony) {
        const symbols = nodes.map(n => n.symbolism?.primarySymbol).filter(Boolean);
        const colors = nodes.map(n => n.color);
        const patterns = nodes.map(n => n.symbolism?.geometricPattern).filter(Boolean);

        return {
            fusedSymbol: this.createFusedSymbol(symbols, harmony),
            colorScheme: this.blendColors(colors, harmony),
            pattern: this.mergePatterns(patterns),
            meaning: this.interpretFusion(nodes, harmony),
            svgCode: this.generateSVG(nodes, harmony)
        };
    }

    createFusedSymbol(symbols, harmony) {
        const relationship = harmony.relationship;

        if (relationship === 'Perfect Harmony') {
            return `⟨${symbols.join('')}⟩ (Unified Mandala)`;
        } else if (relationship === 'Dissonant') {
            return `⟨${symbols.join('⚡')}⟩ (Conflicting Duality)`;
        } else {
            return `⟨${symbols.join('∴')}⟩ (Balanced Triad)`;
        }
    }

    blendColors(colors, harmony) {
        // Average RGB values for harmonic blend
        const rgbs = colors.map(c => this.hexToRgb(c));
        const avg = {
            r: Math.floor(rgbs.reduce((s, c) => s + c.r, 0) / rgbs.length),
            g: Math.floor(rgbs.reduce((s, c) => s + c.g, 0) / rgbs.length),
            b: Math.floor(rgbs.reduce((s, c) => s + c.b, 0) / rgbs.length)
        };

        const blended = this.rgbToHex(avg.r, avg.g, avg.b);

        return {
            original: colors,
            blended: blended,
            gradient: `linear-gradient(${colors.join(', ')})`,
            harmonic: harmony.relationship === 'Perfect Harmony' ? 'Seamless transition' : 'Vibrant contrast'
        };
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    mergePatterns(patterns) {
        const unique = [...new Set(patterns)];
        return {
            individual: unique,
            merged: unique.join(' interwoven with '),
            complexity: unique.length > 2 ? 'Highly intricate' : 'Clean, focused'
        };
    }

    interpretFusion(nodes, harmony) {
        const themes = nodes.map(n => n.narrative?.theme).join(', ');
        return {
            synthesis: `The fusion of ${nodes.length} archetypes creates: ${themes}`,
            harmonicMeaning: `This ${harmony.relationship.toLowerCase()} combination suggests ${this.getHarmonicMessage(harmony.relationship)}`,
            usage: `Use for ${this.suggestUsage(harmony)}`
        };
    }

    getHarmonicMessage(relationship) {
        const messages = {
            'Perfect Harmony': 'divine unity and transcendent synthesis',
            'Consonant': 'cooperative balance and mutual enhancement',
            'Balanced': 'dynamic equilibrium and creative tension',
            'Tension': 'transformative conflict and necessary opposition',
            'Dissonant': 'revolutionary change and breaking of boundaries'
        };
        return messages[relationship] || 'mysterious significance';
    }

    suggestUsage(harmony) {
        const score = parseFloat(harmony.overallHarmony);
        if (score > 8) return 'Healing rituals, meditation, sacred ceremonies';
        if (score > 6) return 'Creative work, problem-solving, balanced manifestation';
        if (score > 4) return 'Shadow work, transformation, challenging growth';
        return 'Alchemical transmutation, boundary dissolution';
    }

    generateSVG(nodes, harmony) {
        const symbols = nodes.map(n => n.symbolism?.primarySymbol || '◯');
        const colors = nodes.map(n => n.color);

        // Simple SVG template
        return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fusion-gradient">
      ${colors.map((c, i) => `<stop offset="${i / colors.length * 100}%" stop-color="${c}" />`).join('\n      ')}
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#fusion-gradient)" opacity="0.8"/>
  <text x="100" y="110" text-anchor="middle" font-size="48" fill="white">
    ${symbols.join('')}
  </text>
</svg>`;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CreativeEngine, HarmonicResolver, NarrativeGenerator, GameDesigner, SpatialDesigner, SymbolFusion };
}
