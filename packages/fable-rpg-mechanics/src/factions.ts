/**
 * The Four Factions - Lesser Arcana as Political/Creative Powers
 * 
 * Each suit of the Minor Arcana is a faction you can join, ally with, or oppose.
 * They have territory in the Cathedral, NPCs, quests, and unique abilities.
 * 
 * This continues the work of Crowley, Fortune, Case - the Minor Arcana as daily life.
 */

export interface Faction {
  id: string;
  name: string;
  suit: 'wands' | 'cups' | 'swords' | 'disks';
  element: string;
  domain: string;
  headquarters: string; // Location in Cathedral
  philosophy: string;
  allies: string[];
  rivals: string[];
  leader: FactionLeader; // The King of the suit
  council: FactionCouncil; // Queen, Knight, Page
  ranks: FactionRank[];
  abilities: FactionAbility[];
  quests: FactionQuest[];
  territories: string[];
  resources: string[];
  traditions: string[]; // Real lineage connections
}

export interface FactionLeader {
  title: string;
  name: string;
  arcana: string; // e.g., "King of Wands"
  personality: string;
  goals: string[];
  dialogue: DialogueBranch[];
}

export interface FactionCouncil {
  queen: CouncilMember;
  knight: CouncilMember;
  page: CouncilMember;
}

export interface CouncilMember {
  title: string;
  name: string;
  arcana: string;
  role: string;
  personality: string;
  teachesAbility: string;
  dialogue: DialogueBranch[];
}

export interface FactionRank {
  level: number;
  title: string;
  requirements: {
    reputation: number;
    questsCompleted: number;
    skillLevel?: number;
  };
  benefits: string[];
  unlocks: string[];
}

export interface FactionAbility {
  id: string;
  name: string;
  element: string;
  description: string;
  rank: number; // Required faction rank
  effect: AbilityEffect;
  cooldown?: number;
  cost?: { type: string; amount: number };
}

export interface AbilityEffect {
  type: 'creative' | 'combat' | 'social' | 'exploration' | 'pathworking';
  stats?: Partial<Record<string, number>>;
  unlocks?: string[];
  special?: string;
}

export interface FactionQuest {
  id: string;
  name: string;
  giver: string; // NPC who gives it
  type: 'initiation' | 'rank' | 'story' | 'daily' | 'rivalry';
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  choices?: QuestChoice[];
  rivalFaction?: string; // If this quest conflicts with another faction
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'collect' | 'create' | 'explore' | 'defeat' | 'talk' | 'pathwork';
  target: string;
  amount?: number;
  optional?: boolean;
}

export interface QuestReward {
  reputation: number;
  experience: number;
  items?: string[];
  abilities?: string[];
  unlocks?: string[];
  alignment?: { light?: number; shadow?: number };
}

export interface QuestChoice {
  id: string;
  description: string;
  consequences: {
    reputation: { [factionId: string]: number };
    alignment?: { light?: number; shadow?: number };
    unlocks?: string[];
  };
}

export interface DialogueBranch {
  id: string;
  condition?: string;
  text: string;
  responses: DialogueResponse[];
}

export interface DialogueResponse {
  text: string;
  effect?: {
    reputation?: number;
    alignment?: { light?: number; shadow?: number };
    unlocks?: string[];
    nextDialogue?: string;
  };
}

// =============================================================================
// THE FOUR FACTIONS
// =============================================================================

export const FACTION_WANDS: Faction = {
  id: 'guild-of-wands',
  name: 'The Guild of Wands',
  suit: 'wands',
  element: 'Fire',
  domain: 'Will, Inspiration, Initiation, Creative Fire',
  headquarters: 'The Athanor Tower',
  philosophy: 'Creation through will. The fire that transforms. To make is to become.',
  allies: ['guild-of-swords'],
  rivals: ['guild-of-cups'],
  
  leader: {
    title: 'The Salamander King',
    name: 'Ignis Rex',
    arcana: 'King of Wands',
    personality: 'Charismatic, visionary, sometimes reckless. A true believer in creative fire.',
    goals: [
      'Spread the creative fire to all who seek it',
      'Complete the Great Work through will alone',
      'Unite the factions under inspired leadership'
    ],
    dialogue: [
      {
        id: 'first-meeting',
        text: 'Another seeker drawn to the flame. Tell me — do you create to express, or to transform?',
        responses: [
          {
            text: 'To express what burns within me.',
            effect: { reputation: 10, alignment: { light: 5 } }
          },
          {
            text: 'To transform myself and the world.',
            effect: { reputation: 15, alignment: { shadow: 5 } }
          },
          {
            text: 'I don\'t know yet. I\'m still learning.',
            effect: { reputation: 5, nextDialogue: 'teaching' }
          }
        ]
      }
    ]
  },
  
  council: {
    queen: {
      title: 'The Flame Keeper',
      name: 'Vesta',
      arcana: 'Queen of Wands',
      role: 'Keeper of the sacred fire, teacher of sustained will',
      personality: 'Warm, nurturing of talent, fierce protector of the creative spark',
      teachesAbility: 'sustained-flame',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'The fire that burns brightest often burns shortest. I teach the flame that endures.',
          responses: [
            {
              text: 'Teach me to sustain my creative fire.',
              effect: { reputation: 10, unlocks: ['ability-sustained-flame'] }
            }
          ]
        }
      ]
    },
    knight: {
      title: 'The Blazing Sword',
      name: 'Prometheus',
      arcana: 'Knight of Wands',
      role: 'Champion, adventurer, bringer of fire to new places',
      personality: 'Restless, brave, sometimes foolhardy, always moving forward',
      teachesAbility: 'creative-charge',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'Standing still is death. The fire must spread or die. Where shall we take it next?',
          responses: [
            {
              text: 'Into the unknown. Show me the path.',
              effect: { reputation: 15, unlocks: ['quest-fire-spreading'] }
            }
          ]
        }
      ]
    },
    page: {
      title: 'The Spark',
      name: 'Ember',
      arcana: 'Page of Wands',
      role: 'Apprentice, messenger, keeper of new ideas',
      personality: 'Enthusiastic, curious, easily distracted, full of potential',
      teachesAbility: 'spark-of-inspiration',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'Did you see that? I just had the most amazing idea! Want to hear it?',
          responses: [
            {
              text: 'Yes, tell me everything.',
              effect: { reputation: 5, unlocks: ['tutorial-wands'] }
            }
          ]
        }
      ]
    }
  },
  
  ranks: [
    {
      level: 1,
      title: 'Ember',
      requirements: { reputation: 0, questsCompleted: 0 },
      benefits: ['Access to Athanor Tower', 'Basic fire meditation'],
      unlocks: ['area-athanor-tower', 'ability-fire-meditation']
    },
    {
      level: 2,
      title: 'Flame',
      requirements: { reputation: 100, questsCompleted: 3 },
      benefits: ['Fire crafting tools', 'Wands faction gear'],
      unlocks: ['tools-fire-crafting', 'gear-wands-robes']
    },
    {
      level: 3,
      title: 'Blaze',
      requirements: { reputation: 300, questsCompleted: 7 },
      benefits: ['Advanced fire magic', 'Access to inner sanctum'],
      unlocks: ['ability-blaze-form', 'area-inner-sanctum']
    },
    {
      level: 4,
      title: 'Inferno',
      requirements: { reputation: 600, questsCompleted: 12 },
      benefits: ['Master fire abilities', 'Council audience'],
      unlocks: ['ability-inferno-will', 'dialogue-council']
    },
    {
      level: 5,
      title: 'Phoenix',
      requirements: { reputation: 1000, questsCompleted: 20 },
      benefits: ['Rebirth ability', 'Faction leadership path'],
      unlocks: ['ability-phoenix-rebirth', 'quest-succession']
    }
  ],
  
  abilities: [
    {
      id: 'fire-meditation',
      name: 'Fire Meditation',
      element: 'Fire',
      description: 'Focus your will through the element of fire. Increases inspiration.',
      rank: 1,
      effect: { type: 'pathworking', stats: { inspiration: 10 } }
    },
    {
      id: 'spark-of-inspiration',
      name: 'Spark of Inspiration',
      element: 'Fire',
      description: 'Generate a new creative idea. May unlock hidden paths.',
      rank: 1,
      effect: { type: 'creative', special: 'Generate random inspiration from Codex' }
    },
    {
      id: 'sustained-flame',
      name: 'Sustained Flame',
      element: 'Fire',
      description: 'Maintain creative focus for extended periods without burnout.',
      rank: 2,
      effect: { type: 'creative', stats: { endurance: 20, focus: 15 } }
    },
    {
      id: 'creative-charge',
      name: 'Creative Charge',
      element: 'Fire',
      description: 'Rush of creative energy. Complete tasks faster but may miss details.',
      rank: 3,
      effect: { type: 'creative', stats: { speed: 30 }, special: 'Risk of errors' }
    },
    {
      id: 'blaze-form',
      name: 'Blaze Form',
      element: 'Fire',
      description: 'Transform into pure creative fire. Access fire-only areas.',
      rank: 3,
      effect: { type: 'exploration', unlocks: ['fire-passages'] }
    },
    {
      id: 'inferno-will',
      name: 'Inferno Will',
      element: 'Fire',
      description: 'Overwhelming creative force. Can break through blocks.',
      rank: 4,
      effect: { type: 'creative', special: 'Break creative blocks' }
    },
    {
      id: 'phoenix-rebirth',
      name: 'Phoenix Rebirth',
      element: 'Fire',
      description: 'Rise from creative death. Reset a failed project with new vision.',
      rank: 5,
      effect: { type: 'creative', special: 'Reset and transform failed work' }
    }
  ],
  
  quests: [
    {
      id: 'wands-initiation',
      name: 'Trial by Fire',
      giver: 'Page of Wands',
      type: 'initiation',
      description: 'Prove your creative fire by completing a work of pure inspiration.',
      objectives: [
        { id: 'obj-1', description: 'Create something from nothing', type: 'create', target: 'any-artwork' },
        { id: 'obj-2', description: 'Present it to the Guild', type: 'talk', target: 'queen-of-wands' }
      ],
      rewards: {
        reputation: 50,
        experience: 100,
        abilities: ['fire-meditation'],
        unlocks: ['rank-ember']
      }
    },
    {
      id: 'wands-vs-cups',
      name: 'Fire and Water',
      giver: 'Knight of Wands',
      type: 'rivalry',
      description: 'The Guild of Cups claims inspiration comes from feeling, not will. Prove them wrong.',
      objectives: [
        { id: 'obj-1', description: 'Create a work of pure will', type: 'create', target: 'will-artwork' },
        { id: 'obj-2', description: 'Challenge a Cups artisan', type: 'defeat', target: 'cups-artisan' }
      ],
      rewards: {
        reputation: 100,
        experience: 200,
        alignment: { light: -5, shadow: 5 }
      },
      rivalFaction: 'guild-of-cups',
      choices: [
        {
          id: 'choice-1',
          description: 'Destroy their work to prove your point',
          consequences: {
            reputation: { 'guild-of-wands': 50, 'guild-of-cups': -100 },
            alignment: { shadow: 15 }
          }
        },
        {
          id: 'choice-2',
          description: 'Combine your work with theirs, showing both have value',
          consequences: {
            reputation: { 'guild-of-wands': 25, 'guild-of-cups': 25 },
            alignment: { light: 10 }
          }
        }
      ]
    }
  ],
  
  territories: [
    'Athanor Tower',
    'The Forge of Wills',
    'Salamander Gardens',
    'The Inspiration Springs'
  ],
  
  resources: [
    'Creative Fire',
    'Inspiration Crystals',
    'Phoenix Feathers',
    'Salamander Scales'
  ],
  
  traditions: [
    'Crowley - Thelemic Will',
    'Agrippa - Celestial Fire',
    'Steiner - Warmth Ether',
    'Paracelsus - Sulphur Principle'
  ]
};

export const FACTION_CUPS: Faction = {
  id: 'guild-of-cups',
  name: 'The Guild of Cups',
  suit: 'cups',
  element: 'Water',
  domain: 'Emotion, Intuition, Dreams, Healing',
  headquarters: 'The Temple of Tides',
  philosophy: 'Creation through feeling. The water that heals. To feel is to know.',
  allies: ['guild-of-disks'],
  rivals: ['guild-of-wands'],
  
  leader: {
    title: 'The Undine Queen',
    name: 'Thalassa',
    arcana: 'King of Cups',
    personality: 'Deeply feeling, wise in emotional matters, sometimes overwhelmed by others\' pain.',
    goals: [
      'Heal the wounded through creative expression',
      'Preserve the dream archives',
      'Teach emotional intelligence through art'
    ],
    dialogue: [
      {
        id: 'first-meeting',
        text: 'I sense... pain in you. Old pain. The kind that drives creation. Would you like to transform it?',
        responses: [
          {
            text: 'Yes. I want to heal through making.',
            effect: { reputation: 15, alignment: { light: 10 } }
          },
          {
            text: 'I use my pain. It fuels me.',
            effect: { reputation: 10, alignment: { shadow: 5 } }
          },
          {
            text: 'I\'m not ready to talk about it.',
            effect: { reputation: 5, nextDialogue: 'patience' }
          }
        ]
      }
    ]
  },
  
  council: {
    queen: {
      title: 'The Dream Keeper',
      name: 'Morphea',
      arcana: 'Queen of Cups',
      role: 'Guardian of the dream archives, teacher of intuition',
      personality: 'Otherworldly, speaks in metaphors, sees through surfaces',
      teachesAbility: 'dream-weaving',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'Your dreams speak louder than your words. Shall I teach you to listen?',
          responses: [
            {
              text: 'Teach me to understand my dreams.',
              effect: { reputation: 10, unlocks: ['ability-dream-weaving'] }
            }
          ]
        }
      ]
    },
    knight: {
      title: 'The Tide Rider',
      name: 'Nereus',
      arcana: 'Knight of Cups',
      role: 'Romantic, quester, seeker of the Grail',
      personality: 'Idealistic, sometimes naive, always seeking the perfect expression',
      teachesAbility: 'emotional-surge',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'I seek the perfect creation — the one that captures everything. Will you help me find it?',
          responses: [
            {
              text: 'The quest is the creation. Let\'s search together.',
              effect: { reputation: 15, unlocks: ['quest-grail-seeking'] }
            }
          ]
        }
      ]
    },
    page: {
      title: 'The Wellspring',
      name: 'Fonte',
      arcana: 'Page of Cups',
      role: 'Apprentice, sensitive, keeper of first feelings',
      personality: 'Sensitive, imaginative, easily hurt, deeply creative',
      teachesAbility: 'emotional-sensing',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'I made this for you. I don\'t know why. I just felt like you needed it.',
          responses: [
            {
              text: 'Thank you. It\'s beautiful.',
              effect: { reputation: 10, unlocks: ['tutorial-cups'] }
            }
          ]
        }
      ]
    }
  },
  
  ranks: [
    {
      level: 1,
      title: 'Droplet',
      requirements: { reputation: 0, questsCompleted: 0 },
      benefits: ['Access to Temple of Tides', 'Basic water meditation'],
      unlocks: ['area-temple-tides', 'ability-water-meditation']
    },
    {
      level: 2,
      title: 'Stream',
      requirements: { reputation: 100, questsCompleted: 3 },
      benefits: ['Healing tools', 'Cups faction gear'],
      unlocks: ['tools-healing', 'gear-cups-robes']
    },
    {
      level: 3,
      title: 'River',
      requirements: { reputation: 300, questsCompleted: 7 },
      benefits: ['Dream walking', 'Access to dream archives'],
      unlocks: ['ability-dream-walk', 'area-dream-archives']
    },
    {
      level: 4,
      title: 'Ocean',
      requirements: { reputation: 600, questsCompleted: 12 },
      benefits: ['Deep healing', 'Council audience'],
      unlocks: ['ability-deep-healing', 'dialogue-council']
    },
    {
      level: 5,
      title: 'Abyss',
      requirements: { reputation: 1000, questsCompleted: 20 },
      benefits: ['Collective unconscious access', 'Faction leadership path'],
      unlocks: ['ability-abyss-diving', 'quest-succession']
    }
  ],
  
  abilities: [
    {
      id: 'water-meditation',
      name: 'Water Meditation',
      element: 'Water',
      description: 'Flow with your emotions. Increases intuition and healing.',
      rank: 1,
      effect: { type: 'pathworking', stats: { intuition: 10, healing: 5 } }
    },
    {
      id: 'emotional-sensing',
      name: 'Emotional Sensing',
      element: 'Water',
      description: 'Feel the emotional content of art and spaces.',
      rank: 1,
      effect: { type: 'exploration', special: 'Reveal hidden emotional layers' }
    },
    {
      id: 'dream-weaving',
      name: 'Dream Weaving',
      element: 'Water',
      description: 'Create art from dream imagery. Access dream archives.',
      rank: 2,
      effect: { type: 'creative', unlocks: ['dream-imagery'] }
    },
    {
      id: 'emotional-surge',
      name: 'Emotional Surge',
      element: 'Water',
      description: 'Channel powerful emotion into creation. Intense but draining.',
      rank: 3,
      effect: { type: 'creative', stats: { intensity: 30 }, cost: { type: 'energy', amount: 20 } }
    },
    {
      id: 'deep-healing',
      name: 'Deep Healing',
      element: 'Water',
      description: 'Heal emotional wounds through creative expression.',
      rank: 4,
      effect: { type: 'social', special: 'Heal trauma through art' }
    },
    {
      id: 'abyss-diving',
      name: 'Abyss Diving',
      element: 'Water',
      description: 'Access the collective unconscious. Retrieve universal symbols.',
      rank: 5,
      effect: { type: 'pathworking', unlocks: ['collective-unconscious'] }
    }
  ],
  
  quests: [
    {
      id: 'cups-initiation',
      name: 'The First Tear',
      giver: 'Page of Cups',
      type: 'initiation',
      description: 'Create something from genuine emotion — not performance, but truth.',
      objectives: [
        { id: 'obj-1', description: 'Create art from real feeling', type: 'create', target: 'emotional-artwork' },
        { id: 'obj-2', description: 'Share it vulnerably', type: 'talk', target: 'queen-of-cups' }
      ],
      rewards: {
        reputation: 50,
        experience: 100,
        abilities: ['water-meditation'],
        unlocks: ['rank-droplet']
      }
    }
  ],
  
  territories: [
    'Temple of Tides',
    'The Dream Archives',
    'Healing Springs',
    'The Grail Chamber'
  ],
  
  resources: [
    'Dream Essence',
    'Healing Waters',
    'Emotional Crystals',
    'Undine Scales'
  ],
  
  traditions: [
    'Dion Fortune - Sea Priestess',
    'Jung - Collective Unconscious',
    'Fortune - Avalon Realms',
    'Paracelsus - Mercury Principle'
  ]
};

export const FACTION_SWORDS: Faction = {
  id: 'guild-of-swords',
  name: 'The Guild of Swords',
  suit: 'swords',
  element: 'Air',
  domain: 'Intellect, Communication, Truth, Analysis',
  headquarters: 'The Tower of Winds',
  philosophy: 'Creation through clarity. The mind that cuts. To think is to create.',
  allies: ['guild-of-wands'],
  rivals: ['guild-of-disks'],
  
  leader: {
    title: 'The Sylph Lord',
    name: 'Zephyrus',
    arcana: 'King of Swords',
    personality: 'Brilliant, cold, just, sometimes cruel in pursuit of truth.',
    goals: [
      'Preserve and expand knowledge',
      'Cut through illusion to truth',
      'Create perfect systems of understanding'
    ],
    dialogue: [
      {
        id: 'first-meeting',
        text: 'Sentiment clouds judgment. Tell me — can you think without feeling?',
        responses: [
          {
            text: 'I can analyze objectively when needed.',
            effect: { reputation: 15, alignment: { light: -5 } }
          },
          {
            text: 'Feeling informs thinking. They work together.',
            effect: { reputation: 5, alignment: { light: 5 } }
          },
          {
            text: 'I\'m still learning to separate them.',
            effect: { reputation: 10, nextDialogue: 'teaching' }
          }
        ]
      }
    ]
  },
  
  council: {
    queen: {
      title: 'The Truth Seer',
      name: 'Veritas',
      arcana: 'Queen of Swords',
      role: 'Judge, truth-speaker, cutter of illusion',
      personality: 'Perceptive, honest to the point of pain, secretly grieving',
      teachesAbility: 'truth-sight',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'I will never lie to you. Can you handle truth without comfort?',
          responses: [
            {
              text: 'Yes. Teach me to see clearly.',
              effect: { reputation: 10, unlocks: ['ability-truth-sight'] }
            }
          ]
        }
      ]
    },
    knight: {
      title: 'The Storm Rider',
      name: 'Boreas',
      arcana: 'Knight of Swords',
      role: 'Champion of ideas, debater, intellectual warrior',
      personality: 'Aggressive, quick-thinking, sometimes reckless with words',
      teachesAbility: 'mental-strike',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'Ideas are weapons. The right word at the right time can change everything. Ready to fight?',
          responses: [
            {
              text: 'Arm me with knowledge.',
              effect: { reputation: 15, unlocks: ['quest-idea-battle'] }
            }
          ]
        }
      ]
    },
    page: {
      title: 'The Curious Wind',
      name: 'Notus',
      arcana: 'Page of Swords',
      role: 'Apprentice, spy, gatherer of information',
      personality: 'Curious, clever, sometimes too clever, always watching',
      teachesAbility: 'quick-study',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'I know things. I watch. I listen. Want to know what I\'ve learned about you?',
          responses: [
            {
              text: 'Tell me. I want to understand myself.',
              effect: { reputation: 5, unlocks: ['tutorial-swords'] }
            }
          ]
        }
      ]
    }
  },
  
  ranks: [
    {
      level: 1,
      title: 'Breeze',
      requirements: { reputation: 0, questsCompleted: 0 },
      benefits: ['Access to Tower of Winds', 'Basic air meditation'],
      unlocks: ['area-tower-winds', 'ability-air-meditation']
    },
    {
      level: 2,
      title: 'Gust',
      requirements: { reputation: 100, questsCompleted: 3 },
      benefits: ['Analysis tools', 'Swords faction gear'],
      unlocks: ['tools-analysis', 'gear-swords-robes']
    },
    {
      level: 3,
      title: 'Wind',
      requirements: { reputation: 300, questsCompleted: 7 },
      benefits: ['Truth sight', 'Access to library'],
      unlocks: ['ability-truth-sight', 'area-great-library']
    },
    {
      level: 4,
      title: 'Storm',
      requirements: { reputation: 600, questsCompleted: 12 },
      benefits: ['Mental mastery', 'Council audience'],
      unlocks: ['ability-mental-mastery', 'dialogue-council']
    },
    {
      level: 5,
      title: 'Hurricane',
      requirements: { reputation: 1000, questsCompleted: 20 },
      benefits: ['Perfect clarity', 'Faction leadership path'],
      unlocks: ['ability-perfect-clarity', 'quest-succession']
    }
  ],
  
  abilities: [
    {
      id: 'air-meditation',
      name: 'Air Meditation',
      element: 'Air',
      description: 'Clear your mind. Increases analysis and communication.',
      rank: 1,
      effect: { type: 'pathworking', stats: { analysis: 10, communication: 5 } }
    },
    {
      id: 'quick-study',
      name: 'Quick Study',
      element: 'Air',
      description: 'Rapidly absorb information. Learn techniques faster.',
      rank: 1,
      effect: { type: 'creative', stats: { learning: 20 } }
    },
    {
      id: 'truth-sight',
      name: 'Truth Sight',
      element: 'Air',
      description: 'See through illusion and deception. Reveal hidden meanings.',
      rank: 2,
      effect: { type: 'exploration', special: 'Reveal hidden truths' }
    },
    {
      id: 'mental-strike',
      name: 'Mental Strike',
      element: 'Air',
      description: 'Cut through creative blocks with pure logic.',
      rank: 3,
      effect: { type: 'creative', special: 'Break logical blocks' }
    },
    {
      id: 'mental-mastery',
      name: 'Mental Mastery',
      element: 'Air',
      description: 'Perfect focus. Ignore distractions completely.',
      rank: 4,
      effect: { type: 'creative', stats: { focus: 50 } }
    },
    {
      id: 'perfect-clarity',
      name: 'Perfect Clarity',
      element: 'Air',
      description: 'See all connections. Understand any system.',
      rank: 5,
      effect: { type: 'exploration', unlocks: ['all-connections'] }
    }
  ],
  
  quests: [
    {
      id: 'swords-initiation',
      name: 'The First Cut',
      giver: 'Page of Swords',
      type: 'initiation',
      description: 'Demonstrate clear thinking by solving a creative problem.',
      objectives: [
        { id: 'obj-1', description: 'Analyze a complex artwork', type: 'explore', target: 'any-artwork' },
        { id: 'obj-2', description: 'Present your analysis', type: 'talk', target: 'queen-of-swords' }
      ],
      rewards: {
        reputation: 50,
        experience: 100,
        abilities: ['air-meditation'],
        unlocks: ['rank-breeze']
      }
    }
  ],
  
  territories: [
    'Tower of Winds',
    'The Great Library',
    'Hall of Debates',
    'The Truth Chamber'
  ],
  
  resources: [
    'Pure Thought',
    'Truth Crystals',
    'Sylph Feathers',
    'Wind Essence'
  ],
  
  traditions: [
    'John Dee - Mathematical Magic',
    'Agrippa - Intellectual Magic',
    'Case - Cube of Space',
    'Paracelsus - Salt Principle'
  ]
};

export const FACTION_DISKS: Faction = {
  id: 'guild-of-disks',
  name: 'The Guild of Disks',
  suit: 'disks',
  element: 'Earth',
  domain: 'Manifestation, Craft, Material, Completion',
  headquarters: 'The Stone Workshop',
  philosophy: 'Creation through making. The earth that holds. To craft is to complete.',
  allies: ['guild-of-cups'],
  rivals: ['guild-of-swords'],
  
  leader: {
    title: 'The Gnome King',
    name: 'Terrus',
    arcana: 'King of Disks',
    personality: 'Patient, practical, generous, sometimes stubborn.',
    goals: [
      'Build lasting works',
      'Teach sustainable craft',
      'Ground all creativity in material form'
    ],
    dialogue: [
      {
        id: 'first-meeting',
        text: 'Ideas mean nothing until they\'re made. Can you finish what you start?',
        responses: [
          {
            text: 'I complete my work. Always.',
            effect: { reputation: 15, alignment: { light: 5 } }
          },
          {
            text: 'I struggle with completion. Teach me.',
            effect: { reputation: 10, nextDialogue: 'teaching' }
          },
          {
            text: 'The process matters more than the product.',
            effect: { reputation: 5, alignment: { shadow: 5 } }
          }
        ]
      }
    ]
  },
  
  council: {
    queen: {
      title: 'The Earth Mother',
      name: 'Gaia',
      arcana: 'Queen of Disks',
      role: 'Nurturer of growth, teacher of patience',
      personality: 'Abundant, patient, practical, deeply nurturing',
      teachesAbility: 'patient-growth',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'Everything grows in its own time. Can you wait for your work to ripen?',
          responses: [
            {
              text: 'Teach me patience.',
              effect: { reputation: 10, unlocks: ['ability-patient-growth'] }
            }
          ]
        }
      ]
    },
    knight: {
      title: 'The Builder',
      name: 'Fundus',
      arcana: 'Knight of Disks',
      role: 'Steady worker, reliable craftsman',
      personality: 'Methodical, reliable, sometimes slow, always thorough',
      teachesAbility: 'steady-work',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'One stone at a time. That\'s how cathedrals are built. Ready to work?',
          responses: [
            {
              text: 'Show me the method.',
              effect: { reputation: 15, unlocks: ['quest-cathedral-building'] }
            }
          ]
        }
      ]
    },
    page: {
      title: 'The Apprentice',
      name: 'Primus',
      arcana: 'Page of Disks',
      role: 'Student of craft, keeper of tools',
      personality: 'Eager to learn, practical, sometimes clumsy, always trying',
      teachesAbility: 'basic-craft',
      dialogue: [
        {
          id: 'first-meeting',
          text: 'I\'m still learning, but I can show you the basics. Want to make something together?',
          responses: [
            {
              text: 'Yes, let\'s create something real.',
              effect: { reputation: 5, unlocks: ['tutorial-disks'] }
            }
          ]
        }
      ]
    }
  },
  
  ranks: [
    {
      level: 1,
      title: 'Pebble',
      requirements: { reputation: 0, questsCompleted: 0 },
      benefits: ['Access to Stone Workshop', 'Basic earth meditation'],
      unlocks: ['area-stone-workshop', 'ability-earth-meditation']
    },
    {
      level: 2,
      title: 'Stone',
      requirements: { reputation: 100, questsCompleted: 3 },
      benefits: ['Crafting tools', 'Disks faction gear'],
      unlocks: ['tools-crafting', 'gear-disks-robes']
    },
    {
      level: 3,
      title: 'Boulder',
      requirements: { reputation: 300, questsCompleted: 7 },
      benefits: ['Advanced crafting', 'Access to deep workshops'],
      unlocks: ['ability-master-craft', 'area-deep-workshops']
    },
    {
      level: 4,
      title: 'Mountain',
      requirements: { reputation: 600, questsCompleted: 12 },
      benefits: ['Manifestation mastery', 'Council audience'],
      unlocks: ['ability-manifestation', 'dialogue-council']
    },
    {
      level: 5,
      title: 'Bedrock',
      requirements: { reputation: 1000, questsCompleted: 20 },
      benefits: ['Permanent creation', 'Faction leadership path'],
      unlocks: ['ability-permanent-form', 'quest-succession']
    }
  ],
  
  abilities: [
    {
      id: 'earth-meditation',
      name: 'Earth Meditation',
      element: 'Earth',
      description: 'Ground yourself. Increases stability and manifestation.',
      rank: 1,
      effect: { type: 'pathworking', stats: { stability: 10, manifestation: 5 } }
    },
    {
      id: 'basic-craft',
      name: 'Basic Craft',
      element: 'Earth',
      description: 'Fundamental making skills. Create simple objects.',
      rank: 1,
      effect: { type: 'creative', unlocks: ['basic-creation'] }
    },
    {
      id: 'patient-growth',
      name: 'Patient Growth',
      element: 'Earth',
      description: 'Allow work to develop naturally. Improves quality over time.',
      rank: 2,
      effect: { type: 'creative', stats: { quality: 20 } }
    },
    {
      id: 'steady-work',
      name: 'Steady Work',
      element: 'Earth',
      description: 'Maintain consistent progress. Never burn out.',
      rank: 3,
      effect: { type: 'creative', stats: { endurance: 30, consistency: 20 } }
    },
    {
      id: 'master-craft',
      name: 'Master Craft',
      element: 'Earth',
      description: 'Create works of lasting quality. Permanent improvements.',
      rank: 3,
      effect: { type: 'creative', special: 'Create permanent works' }
    },
    {
      id: 'manifestation',
      name: 'Manifestation',
      element: 'Earth',
      description: 'Bring ideas into physical form. Complete materialization.',
      rank: 4,
      effect: { type: 'creative', special: 'Materialize concepts' }
    },
    {
      id: 'permanent-form',
      name: 'Permanent Form',
      element: 'Earth',
      description: 'Create works that last forever. True completion.',
      rank: 5,
      effect: { type: 'creative', special: 'Eternal creation' }
    }
  ],
  
  quests: [
    {
      id: 'disks-initiation',
      name: 'The First Stone',
      giver: 'Page of Disks',
      type: 'initiation',
      description: 'Create something physical. Not an idea — a thing.',
      objectives: [
        { id: 'obj-1', description: 'Craft a physical object', type: 'create', target: 'physical-artwork' },
        { id: 'obj-2', description: 'Present your craft', type: 'talk', target: 'queen-of-disks' }
      ],
      rewards: {
        reputation: 50,
        experience: 100,
        abilities: ['earth-meditation'],
        unlocks: ['rank-pebble']
      }
    }
  ],
  
  territories: [
    'Stone Workshop',
    'The Deep Workshops',
    'Crystal Caves',
    'The Completion Hall'
  ],
  
  resources: [
    'Raw Materials',
    'Crafting Crystals',
    'Gnome Gold',
    'Earth Essence'
  ],
  
  traditions: [
    'Emma Kunz - Geometric Healing',
    'Carrington - Kitchen Alchemy',
    'Medieval Masons - Cathedral Building',
    'Steiner - Earth Forces'
  ]
};

// =============================================================================
// FACTION SYSTEM
// =============================================================================

export const ALL_FACTIONS: Faction[] = [
  FACTION_WANDS,
  FACTION_CUPS,
  FACTION_SWORDS,
  FACTION_DISKS
];

export function getFaction(id: string): Faction | undefined {
  return ALL_FACTIONS.find(f => f.id === id);
}

export function getFactionBySuit(suit: string): Faction | undefined {
  return ALL_FACTIONS.find(f => f.suit === suit);
}

export function getFactionRelationship(faction1: string, faction2: string): 'ally' | 'rival' | 'neutral' {
  const f1 = getFaction(faction1);
  if (!f1) return 'neutral';
  
  if (f1.allies.includes(faction2)) return 'ally';
  if (f1.rivals.includes(faction2)) return 'rival';
  return 'neutral';
}

