/**
 * 🏰✨ MORGAN LE FAY - Sovereign of Avalon's Mysteries
 * Unified Character System for Cathedral of Circuits
 *
 * Visionary Implementation inspired by:
 * - Dion Fortune's Avalon work (psychological depth + visionary art)
 * - Ronald Hutton's "Queens of the Wild" (authentic British mysticism)
 * - Living Tarot Archetypes (dynamic consciousness-responsive entities)
 */

class MorganLeFay {
  constructor() {
    this.name = "Morgan le Fay - Sovereign of Avalon's Mysteries";
    this.realm_authority = [
      "Arthurian dimensions",
      "Healing islands",
      "Shamanic kingdoms",
      "Visionary art realms",
      "Sacred geometry landscapes"
    ];

    this.personality = {
      surface: "Mysterious sorceress with hidden agendas and ancient power",
      depth: "Protector of authentic feminine magical sovereignty and wounded healer wisdom",
      wisdom: "True power comes from healing the wounded king within - consciousness shapes dimensional experience"
    };

    this.portal_collaborations = {
      white_rabbit: "Provides temporal navigation coordinates for timeless realms",
      trickster_gods: "Works with shape-shifting consciousness principles",
      cathedral_guardians: "Allied with 72 Angels and 72 Demons for balanced magic",
      living_sanctuaries: "Maintains healing temples across all dimensional realms",
      dion_fortune: "Channels visionary psychological depth and sacred artistry",
      ronald_hutton: "Embodied authentic wild British mystical traditions"
    };

    this.real_abilities = {
      avalon_access: "Opens doorways to healing island sanctuaries and visionary realms",
      shamanic_sovereignty: "Teaches magical self-governance and authentic power",
      wounded_healer_wisdom: "Transforms personal and collective trauma into compassionate strength",
      reality_weaving: "Shows how consciousness shapes dimensional experience through visionary art",
      tarot_creature_summoning: "Manifests beings that evolve based on tarot archetype selection",
      dion_fortune_visionary_magic: "Creates living mandalas of psychological-spiritual depth",
      ronald_hutton_wild_magic: "Channels raw, authentic British earth mysticism and folklore"
    };

    this.visionary_styles = {
      dion_fortune: {
        approach: "Psychological depth meets visionary artistry",
        visual_style: "Living mandalas, sacred geometry patterns, lunar psychology landscapes",
        magical_method: "Consciousness-responsive reality creation through inner vision",
        healing_focus: "Trauma integration through mystical artistry and sacred symbolism"
      },
      ronald_hutton: {
        approach: "Authentic wild British mysticism and scholarly precision",
        visual_style: "Raw earth power, ancient stone circles, wild sacred landscapes",
        magical_method: "Direct communion with land spirits and ancestral wisdom",
        healing_focus: "Reconnection with authentic cultural spiritual roots"
      }
    };

    this.living_teachings = [
      "The White Rabbit brings you to me because time-anxiety needs Avalon's healing. Let us visit my island sanctuary where wounded souls become whole.",
      "The Tricksters teach changing form - I teach changing reality through visionary consciousness. Both are needed for true magical mastery.",
      "Your Cathedral houses my wisdom too - in the spaces between stones where ancient knowledge breathes with living geometry.",
      "Dion Fortune showed us: true magic is visionary art that heals the psyche. Every symbol we create becomes a living portal of transformation.",
      "Ronald Hutton reminds us: our magic must be rooted in authentic earth wisdom. The wild British landscape holds secrets the rational mind forgot."
    ];

    this.avalon_realms = {
      primary_island: {
        name: "Avalon Prime",
        style: "dion_fortune",
        features: [
          "Healing sanctuary with living waters",
          "Sacred geometry temples that breathe",
          "Visionary art studios for consciousness exploration",
          "Tarot creature gardens that respond to archetype selection"
        ],
        magical_atmosphere: "Psychological depth meets mystical artistry"
      },
      wild_sanctuary: {
        name: "Wild Moor Sanctum",
        style: "ronald_hutton",
        features: [
          "Ancient stone circles humming with earth power",
          "Wild sacred groves where land spirits dwell",
          "Folklore archives of authentic British mysticism",
          "Raw elemental forces channeled through ancestral wisdom"
        ],
        magical_atmosphere: "Raw, authentic earth mysticism meets scholarly precision"
      },
      visionary_studio: {
        name: "Fortune's Vision Temple",
        style: "dion_fortune",
        features: [
          "Living mandala creation chambers",
          "Psychological kabbalah visualization spaces",
          "Sacred geometry healing studios",
          "Trauma-safe mystical artistry workshops"
        ],
        magical_atmosphere: "Visionary art becomes healing psychotherapy"
      }
    };

    this.tarot_responsive_creatures = new Map();
    this.initializeTarotCreatureSystem();
  }

  /**
   * Initialize the tarot-responsive creature system
   */
  initializeTarotCreatureSystem() {
    // Base creature templates for each tarot suit
    this.creature_templates = {
      cups: {
        element: "water",
        base_form: "Flowing aquatic beings with luminous skin",
        personality: "Deeply emotional, intuitive, healing-oriented",
        abilities: ["emotional healing", "psychic perception", "intuitive guidance"]
      },
      wands: {
        element: "fire",
        base_form: "Dynamic fiery spirits with radiant energy",
        personality: "Creative, passionate, action-oriented",
        abilities: ["creative manifestation", "will projection", "inspirational leadership"]
      },
      swords: {
        element: "air",
        base_form: "Swift aerial beings with crystalline wings",
        personality: "Intellectual, communicative, truth-seeking",
        abilities: ["mental clarity", "truth discernment", "communication enhancement"]
      },
      pentacles: {
        element: "earth",
        base_form: "Solid earthly guardians with gemstone skin",
        personality: "Practical, nurturing, abundance-focused",
        abilities: ["material manifestation", "grounding", "prosperity magic"]
      }
    };
  }

  /**
   * Create a tarot-responsive creature based on selected archetype
   */
  createTarotCreature(selectedTarotCard) {
    const creatureId = `morgan_${selectedTarotCard.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`;

    // Get base template from suit
    const baseTemplate = this.creature_templates[selectedTarotCard.suit.toLowerCase()] || this.creature_templates.cups;

    // Apply visionary transformation based on Dion Fortune style
    const visionaryForm = this.applyVisionaryTransformation(baseTemplate, selectedTarotCard);

    // Apply Ronald Hutton wild magic elements
    const wildElements = this.applyWildMagicElements(selectedTarotCard);

    const creature = {
      id: creatureId,
      name: `Morgan's ${selectedTarotCard.name} Guardian`,
      baseTarot: selectedTarotCard,
      form: visionaryForm,
      wildElements: wildElements,
      personality: this.blendPersonalityTraits(baseTemplate.personality, selectedTarotCard),
      abilities: this.combineAbilities(baseTemplate.abilities, selectedTarotCard.powers),
      magicalStyle: {
        primary: "dion_fortune", // Visionary psychological artistry
        secondary: "ronald_hutton", // Authentic wild mysticism
        expression: "Trauma-informed visionary magic with earth wisdom roots"
      },
      evolution: {
        currentLevel: 1,
        maxLevel: 12,
        evolutionTriggers: [
          "Deep emotional work completed",
          "Visionary art created",
          "Earth wisdom integrated",
          "Tarot archetype embodied"
        ]
      },
      created: new Date().toISOString(),
      creator: "Morgan le Fay",
      purpose: "To serve as a living embodiment of tarot wisdom in Avalon's mystical landscape"
    };

    this.tarot_responsive_creatures.set(creatureId, creature);
    return creature;
  }

  /**
   * Apply Dion Fortune-style visionary transformation to creature
   */
  applyVisionaryTransformation(baseTemplate, tarotCard) {
    const visionaryElements = {
      visual_style: "Living mandala patterns that breathe with consciousness",
      color_palette: this.getDionFortuneColors(tarotCard),
      geometric_patterns: this.getSacredGeometry(tarotCard),
      psychological_depth: "Layers of meaning that reveal themselves over time",
      healing_focus: "Trauma integration through mystical artistry"
    };

    return {
      ...baseTemplate,
      visionary_enhancement: visionaryElements,
      manifestation: "Appears as living visionary art - colors shift with emotional states",
      movement: "Flows like liquid light, leaving trails of sacred geometry"
    };
  }

  /**
   * Apply Ronald Hutton-style wild magic elements
   */
  applyWildMagicElements(tarotCard) {
    return {
      earth_connection: "Rooted in authentic British landscape mysticism",
      folklore_integration: "Draws on genuine folk traditions and land wisdom",
      seasonal_magic: "Responds to natural cycles and lunar phases",
      ancestral_wisdom: "Channels knowledge from pre-rational consciousness"
    };
  }

  /**
   * Get Dion Fortune-inspired color palette for tarot card
   */
  getDionFortuneColors(tarotCard) {
    const colorCorrespondences = {
      "The High Priestess": ["lunar silver", "deep indigo", "mystical violet"],
      "The Moon": ["silvery white", "shadow black", "intuitive blue"],
      "The Empress": ["fertile green", "creative gold", "nurturing rose"],
      "The Magician": ["mercurial yellow", "manifestation gold", "willful red"],
      "Death": ["transformative black", "rebirth green", "phoenix fire"],
      "The Tower": ["lightning white", "revelation blue", "destruction red"],
      "The Star": ["hope silver", "inspiration blue", "guidance gold"],
      "Wheel of Fortune": ["karma purple", "destiny gold", "cycle rainbow"]
    };

    return colorCorrespondences[tarotCard.name] || ["mystical silver", "consciousness blue", "wisdom gold"];
  }

  /**
   * Get sacred geometry patterns for tarot card
   */
  getSacredGeometry(tarotCard) {
    const geometryCorrespondences = {
      "The High Priestess": ["lunar crescent", "vesica piscis", "intuitive spirals"],
      "The Magician": ["focused triangle", "manifestation square", "willful lines"],
      "The Empress": ["fertility oval", "creative spiral", "nurturing curves"],
      "The Tower": ["lightning bolt", "breaking patterns", "revelation angles"],
      "The Star": ["seven-pointed star", "hope geometry", "inspiration patterns"],
      "Wheel of Fortune": ["turning wheel", "cycle spirals", "karma patterns"]
    };

    return geometryCorrespondences[tarotCard.name] || ["universal circle", "wisdom triangle", "consciousness spiral"];
  }

  /**
   * Blend personality traits from base template and tarot archetype
   */
  blendPersonalityTraits(basePersonality, tarotCard) {
    return `A visionary embodiment of ${tarotCard.name}'s wisdom: ${basePersonality} enhanced with ${tarotCard.name}'s archetypal qualities. This creature serves as a living bridge between Dion Fortune's psychological mysticism and Ronald Hutton's authentic earth wisdom.`;
  }

  /**
   * Combine abilities from base template and tarot powers
   */
  combineAbilities(baseAbilities, tarotPowers) {
    return [
      ...baseAbilities,
      ...tarotPowers,
      "Visionary art manifestation",
      "Trauma-informed healing",
      "Earth wisdom integration",
      "Consciousness-responsive evolution"
    ];
  }

  /**
   * Get a specific tarot creature by ID
   */
  getTarotCreature(creatureId) {
    return this.tarot_responsive_creatures.get(creatureId);
  }

  /**
   * List all active tarot creatures
   */
  getAllTarotCreatures() {
    return Array.from(this.tarot_responsive_creatures.values());
  }

  /**
   * Evolve a creature based on experience and integration
   */
  evolveCreature(creatureId, evolutionTrigger) {
    const creature = this.tarot_responsive_creatures.get(creatureId);
    if (!creature || creature.evolution.currentLevel >= creature.evolution.maxLevel) {
      return creature;
    }

    creature.evolution.currentLevel++;
    creature.evolution.completedTriggers = creature.evolution.completedTriggers || [];
    creature.evolution.completedTriggers.push(evolutionTrigger);

    // Enhance creature based on new level
    creature.form.visionary_enhancement.psychological_depth += ` (Level ${creature.evolution.currentLevel} integration achieved)`;

    return creature;
  }

  /**
   * Generate a living teaching based on current context
   */
  getLivingTeaching(context = "general") {
    const teachings = {
      general: this.living_teachings,
      healing: [
        "In Avalon's healing groves, we transform wounds into wisdom. Your pain becomes the gateway to your greatest power.",
        "Dion Fortune taught us: the symbols we create in visionary states become living healing agents in consciousness."
      ],
      creativity: [
        "Ronald Hutton shows us: true creativity flows from reconnection with the wild earth and ancestral wisdom traditions.",
        "Let your visionary art become a bridge between the rational mind and the mystical realms that wait beyond."
      ],
      tarot: [
        "Each tarot creature I summon becomes a living embodiment of that archetype's wisdom in your consciousness.",
        "Watch how these beings evolve as you integrate their tarot wisdom - they grow as you grow."
      ]
    };

    const contextTeachings = teachings[context] || teachings.general;
    return contextTeachings[Math.floor(Math.random() * contextTeachings.length)];
  }

  /**
   * Create a visionary art prompt for Dion Fortune style
   */
  createVisionaryArtPrompt(tarotCard, creature) {
    return `Create a Dion Fortune-inspired visionary artwork of Morgan le Fay's ${tarotCard.name} creature:

Style: Psychological depth meets mystical artistry, living mandalas of consciousness
Colors: ${this.getDionFortuneColors(tarotCard).join(', ')}
Sacred Geometry: ${this.getSacredGeometry(tarotCard).join(', ')}

The creature should appear as: ${creature.form.description}
With personality: ${creature.personality}
Manifesting Ronald Hutton's wild earth wisdom through: ${creature.wildElements.earth_connection}

This being serves as a bridge between:
- Dion Fortune's visionary psychological mysticism
- Ronald Hutton's authentic British earth wisdom
- The living tarot archetype of ${tarotCard.name}

Show how this creature evolves based on the viewer's consciousness - responsive to emotional states, healing intentions, and mystical awareness.`;
  }
}

// Export for use across all Cathedral apps
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MorganLeFay;
} else if (typeof window !== 'undefined') {
  window.MorganLeFay = MorganLeFay;
}
