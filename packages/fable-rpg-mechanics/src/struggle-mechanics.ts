/**
 * Struggle Mechanics
 * 
 * Integrating the creative perfectionist experience with chronic pain and PTSD
 * into the game system as enemies, boons, and witch mods.
 * 
 * This represents the real struggle of:
 * - Perfectionistic creative brain wanting to perfect everything
 * - Chronic pain affecting creative flow
 * - PTSD/survival brain interrupting creative communication
 * - Constant research drive
 * - Need for beautiful details
 * 
 * @package @cathedral/fable-rpg-mechanics
 */

export interface StruggleEnemy {
  id: string;
  name: string;
  description: string;
  type: 'perfectionism' | 'pain' | 'survival' | 'research-loop';
  effects: {
    creativeFlow: number; // -100 to 100
    clarity: number; // -100 to 100
    energy: number; // -100 to 100
    progress: number; // -100 to 100
  };
  appearance: {
    visual: string;
    sound: string;
    fractal: string; // Fractal pattern representing this struggle
  };
  dialogue: string[];
  defeatConditions: string[];
  transformsInto?: string; // What it becomes when overcome
}

export interface CreativeBoon {
  id: string;
  name: string;
  description: string;
  type: 'flow-state' | 'breakthrough' | 'gentle-progress' | 'community-support';
  effects: {
    creativeFlow: number;
    clarity: number;
    energy: number;
    progress: number;
  };
  appearance: {
    visual: string;
    sound: string;
    fractal: string; // Fractal pattern representing this support
  };
  duration: number; // In minutes
  activationConditions: string[];
}

export interface WitchMod {
  id: string;
  name: string;
  description: string;
  type: 'fractal-art' | 'fractal-sound' | 'chapel-sanctuary' | 'research-organizer';
  fractalTech: {
    pattern: string; // Fractal pattern type
    parameters: { [key: string]: number };
    visual: boolean;
    audio: boolean;
  };
  effects: {
    soothes: string[]; // What struggles it helps with
    enhances: string[]; // What it enhances
    creates: string[]; // What it creates
  };
  usage: {
    activation: string;
    duration: number;
    cooldown: number;
  };
}

/**
 * Struggle Enemies - Internal challenges
 */
export const STRUGGLE_ENEMIES: StruggleEnemy[] = [
  {
    id: 'perfectionism-demon',
    name: 'The Perfectionism Demon',
    description: 'Demands everything be perfect before it can be shared. Blocks progress with endless revisions.',
    type: 'perfectionism',
    effects: {
      creativeFlow: -50,
      clarity: -30,
      energy: -40,
      progress: -70
    },
    appearance: {
      visual: 'A shimmering, ever-shifting form that never settles',
      sound: 'Whispering "not good enough" in multiple voices',
      fractal: 'Mandelbrot set with infinite detail, never complete'
    },
    dialogue: [
      'This needs one more revision...',
      'It\'s not perfect yet, you can\'t share it.',
      'Everyone will see the flaws.',
      'Just one more detail...'
    ],
    defeatConditions: [
      'Accept "good enough"',
      'Share work in progress',
      'Focus on progress over perfection',
      'Get community feedback'
    ],
    transformsInto: 'quality-craftsperson'
  },
  {
    id: 'pain-fog',
    name: 'The Pain Fog',
    description: 'Chronic pain creates a fog that slows creative thinking and reduces clarity.',
    type: 'pain',
    effects: {
      creativeFlow: -60,
      clarity: -80,
      energy: -90,
      progress: -50
    },
    appearance: {
      visual: 'Thick, shifting fog that obscures vision',
      sound: 'Muffled, distant sounds',
      fractal: 'Fractal noise with high frequency interference'
    },
    dialogue: [
      'Everything feels distant...',
      'I can\'t think clearly...',
      'The pain is too much...',
      'I need to rest but I want to create...'
    ],
    defeatConditions: [
      'Gentle pacing',
      'Rest breaks',
      'Pain management',
      'Self-compassion'
    ],
    transformsInto: 'resilience-wisdom'
  },
  {
    id: 'survival-brain',
    name: 'The Survival Brain',
    description: 'PTSD survival responses interrupt creative flow with fear and hypervigilance.',
    type: 'survival',
    effects: {
      creativeFlow: -70,
      clarity: -50,
      energy: -60,
      progress: -40
    },
    appearance: {
      visual: 'Sharp, angular forms that startle and interrupt',
      sound: 'Sudden, jarring sounds',
      fractal: 'Fractal with sudden breaks and discontinuities'
    },
    dialogue: [
      'Is this safe?',
      'What if something goes wrong?',
      'I need to be ready for danger...',
      'I can\'t relax enough to create...'
    ],
    defeatConditions: [
      'Create safe space',
      'Grounding techniques',
      'Trauma-informed support',
      'Gradual exposure'
    ],
    transformsInto: 'safety-wisdom'
  },
  {
    id: 'research-loop',
    name: 'The Research Loop',
    description: 'Traps you in endless research instead of creating. "Just one more source..."',
    type: 'research-loop',
    effects: {
      creativeFlow: -30,
      clarity: -20,
      energy: -30,
      progress: -80
    },
    appearance: {
      visual: 'Spiraling paths that loop back on themselves',
      sound: 'Repetitive, circular melodies',
      fractal: 'Spiral fractal that never reaches center'
    },
    dialogue: [
      'Just one more article...',
      'I need to understand everything first...',
      'What if I\'m missing something important?',
      'Let me check one more source...'
    ],
    defeatConditions: [
      'Set research time limits',
      'Start creating with what you know',
      'Research as you go',
      'Accept incomplete knowledge'
    ],
    transformsInto: 'research-master'
  }
];

/**
 * Creative Boons - Supports and breakthroughs
 */
export const CREATIVE_BOONS: CreativeBoon[] = [
  {
    id: 'flow-state',
    name: 'Flow State',
    description: 'Perfect creative clarity where everything connects and flows effortlessly.',
    type: 'flow-state',
    effects: {
      creativeFlow: 100,
      clarity: 90,
      energy: 80,
      progress: 100
    },
    appearance: {
      visual: 'Smooth, flowing patterns that connect seamlessly',
      sound: 'Harmonious, flowing music',
      fractal: 'Smooth, continuous fractal curves'
    },
    duration: 60, // 60 minutes
    activationConditions: [
      'Deep focus',
      'Clear intention',
      'Safe environment',
      'Adequate energy'
    ]
  },
  {
    id: 'breakthrough',
    name: 'Breakthrough',
    description: 'Sudden insight that connects everything and opens new possibilities.',
    type: 'breakthrough',
    effects: {
      creativeFlow: 80,
      clarity: 100,
      energy: 70,
      progress: 90
    },
    appearance: {
      visual: 'Sudden burst of light connecting multiple points',
      sound: 'Harmonic resolution',
      fractal: 'Fractal with sudden new pattern emergence'
    },
    duration: 30,
    activationConditions: [
      'Persistent work',
      'Rest periods',
      'Cross-domain thinking',
      'Community input'
    ]
  },
  {
    id: 'gentle-progress',
    name: 'Gentle Progress',
    description: 'Small, sustainable steps that add up to significant progress over time.',
    type: 'gentle-progress',
    effects: {
      creativeFlow: 40,
      clarity: 50,
      energy: 60,
      progress: 50
    },
    appearance: {
      visual: 'Gentle, incremental growth patterns',
      sound: 'Soft, steady rhythm',
      fractal: 'Fractal with gradual, gentle expansion'
    },
    duration: 120,
    activationConditions: [
      'Self-compassion',
      'Realistic pacing',
      'Small goals',
      'Celebration of progress'
    ]
  },
  {
    id: 'community-support',
    name: 'Community Support',
    description: 'Connection with others who understand and support your creative journey.',
    type: 'community-support',
    effects: {
      creativeFlow: 50,
      clarity: 40,
      energy: 70,
      progress: 60
    },
    appearance: {
      visual: 'Interconnected nodes supporting each other',
      sound: 'Harmonious voices in chorus',
      fractal: 'Fractal with multiple connected centers'
    },
    duration: 180,
    activationConditions: [
      'Reach out',
      'Share work',
      'Ask for help',
      'Offer support'
    ]
  }
];

/**
 * Witch Mods - Fractal tools for creation
 */
export const WITCH_MODS: WitchMod[] = [
  {
    id: 'fractal-art-generator',
    name: 'Fractal Art Generator',
    description: 'Generates beautiful fractal patterns that soothe the mind and inspire creativity.',
    type: 'fractal-art',
    fractalTech: {
      pattern: 'mandelbrot-julia-hybrid',
      parameters: {
        iterations: 100,
        zoom: 1.0,
        colorShift: 0.0
      },
      visual: true,
      audio: false
    },
    effects: {
      soothes: ['perfectionism-demon', 'pain-fog', 'survival-brain'],
      enhances: ['flow-state', 'gentle-progress'],
      creates: ['visual-inspiration', 'meditative-state', 'pattern-recognition']
    },
    usage: {
      activation: 'Generate fractal with intention',
      duration: 0, // Instant generation
      cooldown: 0
    }
  },
  {
    id: 'fractal-sound-weaver',
    name: 'Fractal Sound Weaver',
    description: 'Creates fractal-based sound frequencies that help focus and reduce pain.',
    type: 'fractal-sound',
    fractalTech: {
      pattern: 'frequency-fractal',
      parameters: {
        baseFrequency: 528, // Solfeggio frequency
        fractalDepth: 5,
        harmonics: 3
      },
      visual: false,
      audio: true
    },
    effects: {
      soothes: ['pain-fog', 'survival-brain', 'research-loop'],
      enhances: ['flow-state', 'breakthrough'],
      creates: ['audio-focus', 'frequency-healing', 'rhythmic-flow']
    },
    usage: {
      activation: 'Play fractal soundscape',
      duration: 0,
      cooldown: 0
    }
  },
  {
    id: 'chapel-sanctuary',
    name: 'Chapel Sanctuary',
    description: 'A safe, beautiful space for creation, protected from external pressures.',
    type: 'chapel-sanctuary',
    fractalTech: {
      pattern: 'sacred-geometry-fractal',
      parameters: {
        geometry: 'flower-of-life',
        layers: 8,
        rotation: 0
      },
      visual: true,
      audio: true
    },
    effects: {
      soothes: ['survival-brain', 'perfectionism-demon'],
      enhances: ['flow-state', 'gentle-progress', 'community-support'],
      creates: ['safe-space', 'sacred-environment', 'creative-sanctuary']
    },
    usage: {
      activation: 'Enter chapel space',
      duration: 0, // Persistent while active
      cooldown: 0
    }
  },
  {
    id: 'research-organizer',
    name: 'Research Organizer',
    description: 'Helps structure research without falling into endless loops.',
    type: 'research-organizer',
    fractalTech: {
      pattern: 'knowledge-tree-fractal',
      parameters: {
        branches: 7,
        depth: 3,
        connections: 5
      },
      visual: true,
      audio: false
    },
    effects: {
      soothes: ['research-loop'],
      enhances: ['breakthrough', 'gentle-progress'],
      creates: ['organized-knowledge', 'research-limits', 'actionable-insights']
    },
    usage: {
      activation: 'Organize research with time limits',
      duration: 30,
      cooldown: 60
    }
  }
];

/**
 * Get enemy by ID
 */
export function getEnemy(id: string): StruggleEnemy | undefined {
  return STRUGGLE_ENEMIES.find(e => e.id === id);
}

/**
 * Get boon by ID
 */
export function getBoon(id: string): CreativeBoon | undefined {
  return CREATIVE_BOONS.find(b => b.id === id);
}

/**
 * Get witch mod by ID
 */
export function getWitchMod(id: string): WitchMod | undefined {
  return WITCH_MODS.find(m => m.id === id);
}

/**
 * Get enemies by type
 */
export function getEnemiesByType(type: StruggleEnemy['type']): StruggleEnemy[] {
  return STRUGGLE_ENEMIES.filter(e => e.type === type);
}

/**
 * Get boons by type
 */
export function getBoonsByType(type: CreativeBoon['type']): CreativeBoon[] {
  return CREATIVE_BOONS.filter(b => b.type === type);
}

/**
 * Get witch mods by type
 */
export function getWitchModsByType(type: WitchMod['type']): WitchMod[] {
  return WITCH_MODS.filter(m => m.type === type);
}

/**
 * Find which witch mods help with a specific enemy
 */
export function getModsForEnemy(enemyId: string): WitchMod[] {
  return WITCH_MODS.filter(mod => mod.effects.soothes.includes(enemyId));
}

/**
 * Find which boons help with a specific enemy
 */
export function getBoonsForEnemy(enemyId: string): CreativeBoon[] {
  const enemy = getEnemy(enemyId);
  if (!enemy) return [];
  
  // Find boons that counteract enemy effects
  return CREATIVE_BOONS.filter(boon => {
    const netFlow = boon.effects.creativeFlow + enemy.effects.creativeFlow;
    const netClarity = boon.effects.clarity + enemy.effects.clarity;
    return netFlow > 0 || netClarity > 0;
  });
}

