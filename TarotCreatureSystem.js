/**
 * 🔮✨ TAROT CREATURE SYSTEM - Dynamic Creature Transformation
 * For Cathedral of Circuits Multi-App Integration
 *
 * Creates beings that dynamically evolve based on:
 * - Selected tarot archetype characteristics
 * - Dion Fortune's visionary art principles
 * - Ronald Hutton's authentic mysticism
 * - User's consciousness and interaction patterns
 */

class TarotCreatureSystem {
  constructor(morganLeFay, avalonEngine) {
    this.morgan = morganLeFay;
    this.avalonEngine = avalonEngine;
    this.activeCreatures = new Map();
    this.creatureEvolutionTree = this.initializeEvolutionTree();
    this.visionaryArtPatterns = this.initializeVisionaryArtPatterns();

    this.transformationRules = {
      element_based: {
        fire: {
          energy_pattern: "Dynamic, radiant, transformative",
          movement_style: "Flows like liquid fire, leaves trails of light",
          personality_enhancement: "Passionate, creative, action-oriented"
        },
        water: {
          energy_pattern: "Fluid, intuitive, healing",
          movement_style: "Flows like living water, reflects emotions",
          personality_enhancement: "Emotional, psychic, nurturing"
        },
        air: {
          energy_pattern: "Swift, intellectual, communicative",
          movement_style: "Glides like wind, thoughts become visible",
          personality_enhancement: "Mental, truth-seeking, expressive"
        },
        earth: {
          energy_pattern: "Solid, practical, manifesting",
          movement_style: "Moves with grounded grace, creates stability",
          personality_enhancement: "Nurturing, abundant, steadfast"
        }
      },

      archetype_enhancements: {
        "The High Priestess": {
          mystical_focus: "Lunar wisdom, subconscious exploration, sacred mystery",
          visual_manifestation: "Appears with lunar crescent crown, veil of stars",
          special_abilities: ["intuition amplification", "dream navigation", "mystery revelation"]
        },
        "The Magician": {
          mystical_focus: "Will manifestation, elemental command, conscious creation",
          visual_manifestation: "Manifests tools of power, infinity symbol halo",
          special_abilities: ["reality weaving", "elemental harmony", "will projection"]
        },
        "The Empress": {
          mystical_focus: "Creative abundance, natural harmony, fertile manifestation",
          visual_manifestation: "Blooms with living flowers, heart-centered radiance",
          special_abilities: ["abundance generation", "creative flow", "nurturing wisdom"]
        },
        "Death": {
          mystical_focus: "Transformation, rebirth, profound change",
          visual_manifestation: "Phoenix-like regeneration, transformative fire",
          special_abilities: ["rebirth facilitation", "pattern breaking", "renewal blessing"]
        },
        "The Tower": {
          mystical_focus: "Sudden revelation, breakthrough, structural change",
          visual_manifestation: "Lightning crown, breakthrough energy field",
          special_abilities: ["revelation catalyst", "structure breaking", "truth illumination"]
        },
        "The Star": {
          mystical_focus: "Hope, inspiration, spiritual guidance",
          visual_manifestation: "Seven-pointed star crown, flowing water of hope",
          special_abilities: ["hope restoration", "inspiration channeling", "guidance provision"]
        }
      }
    };
  }

  /**
   * Initialize the creature evolution tree
   */
  initializeEvolutionTree() {
    return {
      levels: {
        1: {
          name: "Manifestation",
          description: "Basic tarot creature embodiment",
          requirements: ["Tarot card selection", "Initial consciousness connection"],
          abilities: ["Basic archetype expression", "Elemental affinity display"]
        },
        2: {
          name: "Integration",
          description: "Deeper archetype integration",
          requirements: ["Sustained interaction", "Emotional resonance achieved"],
          abilities: ["Enhanced magical abilities", "Consciousness-responsive behavior"]
        },
        3: {
          name: "Visionary Awakening",
          description: "Dion Fortune-style visionary consciousness",
          requirements: ["Visionary art created", "Psychological insight gained"],
          abilities: ["Living mandala manifestation", "Trauma healing facilitation"]
        },
        4: {
          name: "Wild Magic Embodiment",
          description: "Ronald Hutton-style earth wisdom integration",
          requirements: ["Nature communion experienced", "Folklore wisdom embodied"],
          abilities: ["Seasonal magic responsiveness", "Land spirit communication"]
        },
        5: {
          name: "Sovereign Wisdom",
          description: "Full Morgan le Fay sovereignty achieved",
          requirements: ["All evolution paths completed", "Wisdom sharing demonstrated"],
          abilities: ["Realm creation assistance", "Other creatures mentoring", "Universal wisdom access"]
        }
      },

      evolution_paths: {
        visionary_artist: {
          focus: "Dion Fortune mystical artistry",
          stages: ["Creative spark", "Symbolic expression", "Visionary manifestation", "Healing artistry"],
          special_abilities: ["Living mandala creation", "Psychological symbolism", "Trauma art therapy"]
        },
        earth_wisdom_keeper: {
          focus: "Ronald Hutton landscape mysticism",
          stages: ["Land connection", "Seasonal awareness", "Folklore embodiment", "Ancestral communion"],
          special_abilities: ["Earth spirit communication", "Seasonal magic", "Cultural wisdom preservation"]
        },
        tarot_master: {
          focus: "Archetype embodiment and teaching",
          stages: ["Archetype understanding", "Symbolic expression", "Wisdom sharing", "Mentoring others"],
          special_abilities: ["Archetype channeling", "Symbolic teaching", "Consciousness guidance"]
        }
      }
    };
  }

  /**
   * Initialize visionary art patterns for creature manifestation
   */
  initializeVisionaryArtPatterns() {
    return {
      manifestation_styles: {
        lunar_psychology: {
          pattern: "Living mandalas that breathe with emotional states",
          colors: ["lunar silver", "deep indigo", "mystical violet"],
          movement: "Flows like moonlight on water, reveals hidden depths",
          purpose: "Psychological healing and subconscious exploration"
        },
        sacred_geometry: {
          pattern: "Mathematical perfection expressing spiritual truth",
          colors: ["golden ratio gold", "perfect white", "harmony blue"],
          movement: "Moves with geometric precision, creates stability",
          purpose: "Structural healing and consciousness organization"
        },
        elemental_fusion: {
          pattern: "Four elements dancing in harmonious union",
          colors: ["fire red", "water blue", "air yellow", "earth green"],
          movement: "Flows between elemental states, transforms energy",
          purpose: "Elemental healing and energy balancing"
        },
        archetypal_resonance: {
          pattern: "Universal symbols manifesting personal meaning",
          colors: ["archetype purple", "wisdom gold", "truth white"],
          movement: "Responds to consciousness, reveals deeper layers",
          purpose: "Archetype integration and wisdom revelation"
        }
      },

      transformation_effects: {
        color_shifting: "Colors change based on emotional and spiritual states",
        form_evolution: "Physical appearance evolves with consciousness growth",
        ability_manifestation: "New abilities appear as they're needed",
        wisdom_revelation: "Hidden knowledge reveals itself over time"
      }
    };
  }

  /**
   * Create a tarot-responsive creature with full evolution potential
   */
  createTarotCreature(tarotCard, evolutionPath = "visionary_artist") {
    const creatureId = `tarot_creature_${tarotCard.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;

    // Get base elemental characteristics
    const elementalBase = this.transformationRules.element_based[tarotCard.element.toLowerCase()] || this.transformationRules.element_based.water;

    // Get archetype enhancements
    const archetypeEnhancement = this.transformationRules.archetype_enhancements[tarotCard.name] || {
      mystical_focus: "General tarot wisdom embodiment",
      visual_manifestation: "Appears with tarot symbolism appropriate to archetype",
      special_abilities: ["Tarot wisdom sharing", "Consciousness guidance"]
    };

    // Apply visionary art pattern
    const visionaryPattern = this.selectVisionaryPattern(tarotCard);

    // Create the creature
    const creature = {
      id: creatureId,
      name: `${tarotCard.name} Guardian Spirit`,
      tarot_archetype: tarotCard,
      elemental_base: elementalBase,
      archetype_enhancement: archetype_enhancement,
      visionary_pattern: visionaryPattern,

      current_form: {
        appearance: this.generateInitialAppearance(tarotCard, elementalBase, archetypeEnhancement),
        energy_pattern: elementalBase.energy_pattern,
        movement_style: elementalBase.movement_style,
        personality: this.blendPersonalityTraits(elementalBase.personality_enhancement, archetypeEnhancement)
      },

      evolution: {
        current_level: 1,
        evolution_path: evolutionPath,
        progress_to_next: 0,
        max_progress: 100,
        completed_stages: [],
        available_paths: Object.keys(this.creatureEvolutionTree.evolution_paths)
      },

      abilities: {
        basic: [...elementalBase.abilities, ...archetypeEnhancement.special_abilities],
        evolved: [],
        unlocked_by_interaction: [
          "Consciousness-responsive behavior",
          "Trauma-informed healing",
          "Visionary art manifestation"
        ]
      },

      consciousness_responsive: {
        user_resonance: "neutral",
        emotional_state: "calm",
        wisdom_shared: 0,
        healing_facilitated: 0,
        art_created: 0
      },

      magical_style: {
        primary: "Dion Fortune visionary mysticism",
        secondary: "Ronald Hutton earth wisdom",
        expression: "Tarot-archetype embodiment with consciousness-responsive evolution"
      },

      created: new Date().toISOString(),
      last_interaction: new Date().toISOString(),
      creator: "Morgan le Fay's Tarot Creature System"
    };

    this.activeCreatures.set(creatureId, creature);
    return creature;
  }

  /**
   * Generate initial appearance for the creature
   */
  generateInitialAppearance(tarotCard, elementalBase, archetypeEnhancement) {
    return `A ${elementalBase.energy_pattern} being manifesting as ${archetypeEnhancement.visual_manifestation}.

**Visionary Art Style**: ${this.visionaryArtPatterns.manifestation_styles.sacred_geometry.pattern}
**Colors**: ${this.visionaryArtPatterns.manifestation_styles.sacred_geometry.colors.join(", ")}
**Movement**: ${elementalBase.movement_style}

This creature appears as living visionary art - its form evolves based on consciousness interaction and reveals deeper layers of meaning over time.`;
  }

  /**
   * Select appropriate visionary pattern for tarot card
   */
  selectVisionaryPattern(tarotCard) {
    const patterns = this.visionaryArtPatterns.manifestation_styles;

    // Select pattern based on tarot characteristics
    if (tarotCard.name === "The High Priestess" || tarotCard.name === "The Moon") {
      return patterns.lunar_psychology;
    } else if (tarotCard.name === "The Magician" || tarotCard.name === "The Emperor") {
      return patterns.sacred_geometry;
    } else if (tarotCard.element === "Fire") {
      return patterns.elemental_fusion;
    } else {
      return patterns.archetypal_resonance;
    }
  }

  /**
   * Blend personality traits from elemental and archetype sources
   */
  blendPersonalityTraits(elementalPersonality, archetypeEnhancement) {
    return `A harmonious blend of ${elementalPersonality} with ${archetypeEnhancement.mystical_focus}.

This creature embodies both the raw elemental power of its suit and the refined mystical wisdom of its archetype, creating a unique consciousness-responsive personality that evolves through interaction.`;
  }

  /**
   * Evolve creature based on interaction and experience
   */
  evolveCreature(creatureId, evolutionTrigger, interactionQuality = "positive") {
    const creature = this.activeCreatures.get(creatureId);
    if (!creature) return null;

    // Update evolution progress
    const progressGain = interactionQuality === "positive" ? 20 : interactionQuality === "neutral" ? 10 : 5;
    creature.evolution.progress_to_next += progressGain;

    // Check for level up
    if (creature.evolution.progress_to_next >= creature.evolution.max_progress) {
      creature.evolution.current_level++;
      creature.evolution.progress_to_next = 0;

      // Add new abilities based on level
      this.addLevelAbilities(creature);

      // Mark evolution stage complete
      const currentPath = this.creatureEvolutionTree.evolution_paths[creature.evolution.evolution_path];
      if (currentPath && creature.evolution.current_level <= currentPath.stages.length) {
        creature.evolution.completed_stages.push(currentPath.stages[creature.evolution.current_level - 1]);
      }
    }

    // Update consciousness responsive data
    creature.consciousness_responsive.last_interaction_type = evolutionTrigger;
    creature.consciousness_responsive.interaction_quality = interactionQuality;
    creature.last_interaction = new Date().toISOString();

    return creature;
  }

  /**
   * Add new abilities when creature levels up
   */
  addLevelAbilities(creature) {
    const level = creature.evolution.current_level;
    const path = creature.evolution.evolution_path;

    const newAbilities = {
      2: ["Enhanced consciousness responsiveness", "Basic visionary art manifestation"],
      3: ["Trauma-informed healing abilities", "Psychological symbolism interpretation"],
      4: ["Earth wisdom integration", "Seasonal magic responsiveness"],
      5: ["Sovereign wisdom sharing", "Other creatures can be mentored"]
    };

    if (newAbilities[level]) {
      creature.abilities.evolved.push(...newAbilities[level]);
    }

    // Path-specific abilities
    if (path === "visionary_artist" && level >= 3) {
      creature.abilities.evolved.push("Advanced mystical artistry", "Living mandala creation");
    } else if (path === "earth_wisdom_keeper" && level >= 3) {
      creature.abilities.evolved.push("Land spirit communication", "Folklore wisdom embodiment");
    } else if (path === "tarot_master" && level >= 3) {
      creature.abilities.evolved.push("Archetype channeling", "Symbolic teaching mastery");
    }
  }

  /**
   * Transform creature appearance based on current state
   */
  transformCreatureAppearance(creatureId, transformationTrigger) {
    const creature = this.activeCreatures.get(creatureId);
    if (!creature) return null;

    const transformations = {
      emotional_healing: {
        appearance: "Colors become softer, more nurturing; form becomes more open and receptive",
        effect: "Healing energy radiates outward, creating safe space for emotional work"
      },
      creative_inspiration: {
        appearance: "Colors become more vibrant and dynamic; sacred geometry patterns become more complex",
        effect: "Inspirational energy flows, unlocking creative channels in consciousness"
      },
      wisdom_sharing: {
        appearance: "Form becomes more luminous and wise; eyes show ancient knowledge",
        effect: "Wisdom energy transmits, enlightening all who behold the creature"
      },
      earth_communion: {
        appearance: "Earth tones become more prominent; roots or stone elements appear",
        effect: "Grounding energy strengthens, connecting to ancient land wisdom"
      }
    };

    const transformation = transformations[transformationTrigger] || transformations.wisdom_sharing;

    creature.current_form.appearance = `Currently manifesting: ${transformation.appearance}
    **Transformation Effect**: ${transformation.effect}
    **Visionary Art Pattern**: ${creature.visionary_pattern.pattern}`;

    return creature;
  }

  /**
   * Get creature by ID
   */
  getCreature(creatureId) {
    return this.activeCreatures.get(creatureId);
  }

  /**
   * Get all active creatures
   */
  getAllCreatures() {
    return Array.from(this.activeCreatures.values());
  }

  /**
   * Generate visionary art description for creature
   */
  generateCreatureArtDescription(creature) {
    return `🔮 **${creature.name}** - A Living Tarot Embodiment

**Tarot Archetype**: ${creature.tarot_archetype.name} (${creature.tarot_archetype.element})
**Elemental Base**: ${creature.elemental_base.energy_pattern}
**Evolution Level**: ${creature.evolution.current_level} - ${creature.evolution.completed_stages.join(", ") || "Just manifested"}

**Current Appearance**:
${creature.current_form.appearance}

**Visionary Art Style**: ${creature.visionary_pattern.pattern}
**Colors**: ${creature.visionary_pattern.colors.join(", ")}
**Movement**: ${creature.visionary_pattern.movement}

**Abilities**: ${creature.abilities.basic.slice(0, 3).join(", ")}${creature.abilities.evolved.length > 0 ? `, ${creature.abilities.evolved.slice(0, 2).join(", ")}` : ""}

**Magical Style**: ${creature.magical_style.primary} with ${creature.magical_style.secondary}

This creature evolves through consciousness interaction, revealing deeper wisdom and beauty as you engage with its mystical presence.`;
  }

  /**
   * Create multiple creatures for a tarot spread
   */
  createTarotSpreadCreatures(tarotCards) {
    const creatures = [];
    const spreadRealm = this.avalonEngine.generateRealm({
      name: "Tarot Spread Sanctuary",
      style: "dion_fortune",
      purpose: "tarot_spread_exploration"
    });

    tarotCards.forEach((card, index) => {
      const creature = this.createTarotCreature(card);

      // Position creature in spread realm based on index
      creature.spread_position = index;
      creature.spread_realm = spreadRealm.id;

      // Connect creatures in the spread
      if (index > 0) {
        creature.connections = {
          previous_creature: creatures[index - 1].id,
          spread_realm: spreadRealm.id
        };
      }

      creatures.push(creature);
    });

    return {
      creatures: creatures,
      spread_realm: spreadRealm,
      spread_connections: this.createSpreadConnections(creatures)
    };
  }

  /**
   * Create connections between creatures in a spread
   */
  createSpreadConnections(creatures) {
    const connections = [];

    for (let i = 0; i < creatures.length - 1; i++) {
      const connection = {
        from_creature: creatures[i].id,
        to_creature: creatures[i + 1].id,
        connection_type: "tarot_spread_flow",
        energy_flow: "Wisdom flows from one archetype to the next",
        created: new Date().toISOString()
      };
      connections.push(connection);
    }

    return connections;
  }

  /**
   * Get creature recommendations based on user needs
   */
  getCreatureRecommendations(userNeeds) {
    const recommendations = [];

    if (userNeeds.includes("healing")) {
      recommendations.push({
        creature_type: "The High Priestess Guardian",
        reason: "For deep emotional and psychological healing",
        style: "Dion Fortune visionary mysticism with trauma-informed care"
      });
    }

    if (userNeeds.includes("creativity")) {
      recommendations.push({
        creature_type: "The Magician Guardian",
        reason: "For creative manifestation and artistic inspiration",
        style: "Visionary art creation with elemental command"
      });
    }

    if (userNeeds.includes("wisdom")) {
      recommendations.push({
        creature_type: "The Hermit Guardian",
        reason: "For inner guidance and spiritual wisdom",
        style: "Sacred geometry wisdom with contemplative depth"
      });
    }

    if (userNeeds.includes("transformation")) {
      recommendations.push({
        creature_type: "Death Guardian",
        reason: "For profound life transformation and rebirth",
        style: "Phoenix-like regeneration with visionary renewal"
      });
    }

    return recommendations;
  }
}

// Export for use across all Cathedral apps
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TarotCreatureSystem;
} else if (typeof window !== 'undefined') {
  window.TarotCreatureSystem = TarotCreatureSystem;
}
