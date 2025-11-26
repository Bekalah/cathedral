/**
 * The Daimon System
 * 
 * 72 Shem Angels + 72 Goetia Demons = 144 Spirits
 * Each player has a daimon (angel/demon pair) that:
 * - Shifts based on chapter (1-33)
 * - Changes attitude based on choices (light/shadow/balance)
 * - Helps across all modes (game, design, professional)
 * - Is connected to their chosen arcana
 * 
 * This continues the work of Agrippa, Dee, and the grimoire tradition.
 */

export interface ShemAngel {
  number: number; // 1-72
  name: string;
  hebrewName: string;
  meaning: string;
  quality: string;
  zodiacDegrees: [number, number]; // Start and end degrees
  zodiacSign: string;
  element: string;
  planet: string;
  // Creative applications
  creativeHelp: string[];
  designAesthetic: string;
  professionalSkill: string;
  // Correspondences
  psalm: string;
  color: string;
  incense: string;
  // Dialogue
  greetingLight: string; // When player is on light path
  greetingShadow: string; // When player is on shadow path
  greetingBalance: string; // When player is balanced
  advice: string[];
}

export interface GoetiaDemon {
  number: number; // 1-72
  name: string;
  rank: 'King' | 'Duke' | 'Prince' | 'Marquis' | 'President' | 'Earl' | 'Knight';
  legions: number;
  appearance: string;
  abilities: string[];
  // Creative applications
  creativeHelp: string[];
  designAesthetic: string;
  professionalSkill: string;
  // Correspondences
  element: string;
  planet: string;
  direction: string;
  // Dialogue
  greetingLight: string;
  greetingShadow: string;
  greetingBalance: string;
  advice: string[];
}

export interface DaimonPair {
  number: number; // 1-72
  angel: ShemAngel;
  demon: GoetiaDemon;
  // Which arcana this pair is primary for
  primaryArcana: number[]; // Major Arcana numbers
  // Chapter range where this pair is active
  activeChapters: number[];
  // Combined creative guidance
  unifiedPurpose: string;
  fusionAbility: string; // What happens when both aspects work together
}

export interface PlayerDaimon {
  currentPair: DaimonPair;
  angelAttitude: number; // -100 to 100 (negative = displeased, positive = pleased)
  demonAttitude: number; // -100 to 100
  dominantAspect: 'angel' | 'demon' | 'unified';
  // History
  choiceHistory: DaimonChoice[];
  adviceGiven: string[];
  // Current state
  currentMode: 'game' | 'design' | 'professional';
  lastInteraction: Date;
}

export interface DaimonChoice {
  chapter: number;
  choice: string;
  alignment: 'light' | 'shadow' | 'balance';
  angelReaction: string;
  demonReaction: string;
  attitudeChange: { angel: number; demon: number };
}

// =============================================================================
// THE 72 SHEM ANGELS (First 12 as example - full 72 in data file)
// =============================================================================

export const SHEM_ANGELS: ShemAngel[] = [
  {
    number: 1,
    name: 'Vehuiah',
    hebrewName: 'והו',
    meaning: 'God Elevated Above All Things',
    quality: 'Will, new beginnings, transformation',
    zodiacDegrees: [0, 5],
    zodiacSign: 'Aries',
    element: 'Fire',
    planet: 'Uranus/Neptune',
    creativeHelp: [
      'Starting new projects',
      'Breaking creative blocks',
      'Finding courage to begin',
      'Transforming old work into new'
    ],
    designAesthetic: 'Bold beginnings, fresh starts, clean slates',
    professionalSkill: 'Project initiation, leadership, innovation',
    psalm: 'Psalm 3:3',
    color: 'Bright Red',
    incense: 'Dragon\'s Blood',
    greetingLight: 'You stand at the threshold of creation. Your will is pure. Begin.',
    greetingShadow: 'Even in darkness, the spark of beginning waits. Will you ignite it?',
    greetingBalance: 'The first step contains all steps. You understand this. Walk.',
    advice: [
      'Begin before you feel ready',
      'The first mark on blank canvas is the hardest and least important',
      'Will precedes ability',
      'Transform fear into fuel'
    ]
  },
  {
    number: 2,
    name: 'Jeliel',
    hebrewName: 'ילי',
    meaning: 'God Who Helps',
    quality: 'Love, wisdom, fertility of ideas',
    zodiacDegrees: [5, 10],
    zodiacSign: 'Aries',
    element: 'Fire',
    planet: 'Saturn/Uranus',
    creativeHelp: [
      'Collaboration',
      'Finding creative partners',
      'Nurturing ideas to fruition',
      'Building creative relationships'
    ],
    designAesthetic: 'Harmony, partnership, complementary elements',
    professionalSkill: 'Team building, mentorship, collaborative leadership',
    psalm: 'Psalm 22:19',
    color: 'Rose Pink',
    incense: 'Rose',
    greetingLight: 'Love multiplies creation. Who will you create with?',
    greetingShadow: 'Even alone, you carry the seeds of partnership within.',
    greetingBalance: 'The lover and the beloved are one. Create from this knowing.',
    advice: [
      'Two visions combined exceed both',
      'Seek those whose weaknesses are your strengths',
      'Creation is relationship',
      'The work needs witnesses'
    ]
  },
  {
    number: 3,
    name: 'Sitael',
    hebrewName: 'סיט',
    meaning: 'God, Hope of All Creatures',
    quality: 'Construction, building, architecture',
    zodiacDegrees: [10, 15],
    zodiacSign: 'Aries',
    element: 'Fire',
    planet: 'Jupiter/Saturn',
    creativeHelp: [
      'Building structures',
      'Creating frameworks',
      'Architectural thinking',
      'Constructing lasting works'
    ],
    designAesthetic: 'Structural integrity, sacred architecture, lasting forms',
    professionalSkill: 'Project architecture, systems design, building teams',
    psalm: 'Psalm 91:2',
    color: 'Golden Yellow',
    incense: 'Frankincense',
    greetingLight: 'You build temples in the world. Each creation is sacred architecture.',
    greetingShadow: 'Even ruins contain the memory of structure. Rebuild.',
    greetingBalance: 'The builder and the building are one. Construct yourself.',
    advice: [
      'Strong foundations permit tall structures',
      'Every cathedral began with one stone',
      'Build for those who come after',
      'Structure liberates creativity'
    ]
  },
  // ... continue for all 72 angels
  // The full dataset will be in data/shem-angels.json
];

// =============================================================================
// THE 72 GOETIA DEMONS (First 12 as example - full 72 in data file)
// =============================================================================

export const GOETIA_DEMONS: GoetiaDemon[] = [
  {
    number: 1,
    name: 'Bael',
    rank: 'King',
    legions: 66,
    appearance: 'A creature with three heads: a toad, a man, and a cat',
    abilities: [
      'Grants invisibility',
      'Imparts wisdom',
      'Makes one eloquent'
    ],
    creativeHelp: [
      'Working unseen (flow state)',
      'Finding wisdom in strange places',
      'Speaking truth that lands'
    ],
    designAesthetic: 'Hidden depths, revealed slowly, layered meaning',
    professionalSkill: 'Working without recognition, strategic invisibility',
    element: 'Fire',
    planet: 'Sun',
    direction: 'East',
    greetingLight: 'You seek to work unseen? Wisdom comes to those who don\'t need credit.',
    greetingShadow: 'In shadow, you are most powerful. Create where no one watches.',
    greetingBalance: 'Visible and invisible, known and unknown. You contain both.',
    advice: [
      'The best work is done when no one is watching',
      'Invisibility is freedom',
      'Wisdom speaks through strange mouths',
      'Power doesn\'t need recognition'
    ]
  },
  {
    number: 2,
    name: 'Agares',
    rank: 'Duke',
    legions: 31,
    appearance: 'An old man riding a crocodile, carrying a hawk',
    abilities: [
      'Teaches all languages',
      'Causes earthquakes',
      'Brings back runaways'
    ],
    creativeHelp: [
      'Learning new creative languages',
      'Shaking up stale work',
      'Recovering lost inspiration'
    ],
    designAesthetic: 'Communication across barriers, translation, bridging',
    professionalSkill: 'Cross-cultural communication, language learning, recovery',
    element: 'Earth',
    planet: 'Venus',
    direction: 'East',
    greetingLight: 'Language is the bridge between minds. I teach you to cross.',
    greetingShadow: 'Shake the foundations. What falls was never stable.',
    greetingBalance: 'Speak and shake. Communicate and transform.',
    advice: [
      'Every creative field has its own language',
      'Sometimes you must destroy to communicate',
      'What runs away can be called back',
      'Old wisdom rides strange beasts'
    ]
  },
  {
    number: 3,
    name: 'Vassago',
    rank: 'Prince',
    legions: 26,
    appearance: 'Similar to Agares, of good nature',
    abilities: [
      'Discovers hidden things',
      'Reveals past and future',
      'Finds what is lost'
    ],
    creativeHelp: [
      'Finding hidden connections',
      'Discovering lost techniques',
      'Seeing what others miss'
    ],
    designAesthetic: 'Discovery, revelation, hidden patterns made visible',
    professionalSkill: 'Research, investigation, finding lost knowledge',
    element: 'Water',
    planet: 'Jupiter',
    direction: 'East',
    greetingLight: 'What is hidden wishes to be found. I show you where to look.',
    greetingShadow: 'In darkness, hidden things glow. Your shadow-sight is keen.',
    greetingBalance: 'Past and future meet in your present seeing. Look.',
    advice: [
      'The answer is already there, waiting',
      'Lost things want to be found',
      'The future is hidden in the present',
      'Good nature finds good things'
    ]
  },
  // ... continue for all 72 demons
  // The full dataset will be in data/goetia-demons.json
];

// =============================================================================
// DAIMON PAIRS (Angel + Demon combinations)
// =============================================================================

export function createDaimonPair(number: number): DaimonPair {
  const angel = SHEM_ANGELS.find(a => a.number === number);
  const demon = GOETIA_DEMONS.find(d => d.number === number);
  
  if (!angel || !demon) {
    throw new Error(`Daimon pair ${number} not found`);
  }
  
  // Map pairs to arcana (3-4 pairs per arcana)
  const arcanaMapping: Record<number, number[]> = {
    1: [0], // Vehuiah/Bael → The Fool
    2: [0, 6], // Jeliel/Agares → The Fool, The Lovers
    3: [1], // Sitael/Vassago → The Magician
    4: [1], // Elemiah/Samigina → The Magician
    5: [2], // Mahasiah/Marbas → High Priestess
    // ... continue mapping
  };
  
  // Map pairs to chapters (roughly 2-3 pairs per chapter)
  const chapterMapping: Record<number, number[]> = {
    1: [1, 2],
    2: [1, 2],
    3: [3, 4],
    4: [3, 4],
    5: [5, 6],
    // ... continue mapping
  };
  
  return {
    number,
    angel,
    demon,
    primaryArcana: arcanaMapping[number] || [],
    activeChapters: chapterMapping[number] || [],
    unifiedPurpose: `${angel.quality} through ${demon.abilities[0]}`,
    fusionAbility: `When ${angel.name} and ${demon.name} work together: ${angel.creativeHelp[0]} + ${demon.creativeHelp[0]}`
  };
}

// =============================================================================
// DAIMON ENGINE
// =============================================================================

export class DaimonEngine {
  private playerDaimon: PlayerDaimon;
  private allPairs: DaimonPair[];
  
  constructor(startingArcana: number, startingChapter: number = 1) {
    // Create all 72 pairs
    this.allPairs = [];
    for (let i = 1; i <= Math.min(SHEM_ANGELS.length, GOETIA_DEMONS.length); i++) {
      try {
        this.allPairs.push(createDaimonPair(i));
      } catch (e) {
        // Skip if pair not fully defined yet
      }
    }
    
    // Find starting pair based on arcana and chapter
    const startingPair = this.findPairForContext(startingArcana, startingChapter);
    
    this.playerDaimon = {
      currentPair: startingPair,
      angelAttitude: 50, // Neutral start
      demonAttitude: 50,
      dominantAspect: 'unified',
      choiceHistory: [],
      adviceGiven: [],
      currentMode: 'game',
      lastInteraction: new Date()
    };
  }
  
  /**
   * Find the appropriate daimon pair for current context
   */
  private findPairForContext(arcana: number, chapter: number): DaimonPair {
    // First try to find pair that matches both arcana and chapter
    let pair = this.allPairs.find(p => 
      p.primaryArcana.includes(arcana) && p.activeChapters.includes(chapter)
    );
    
    // If not found, prioritize chapter
    if (!pair) {
      pair = this.allPairs.find(p => p.activeChapters.includes(chapter));
    }
    
    // If still not found, use first pair
    if (!pair) {
      pair = this.allPairs[0];
    }
    
    return pair;
  }
  
  /**
   * Process a player choice and update daimon attitudes
   */
  processChoice(choice: string, alignment: 'light' | 'shadow' | 'balance', chapter: number): DaimonChoice {
    const pair = this.playerDaimon.currentPair;
    
    // Calculate attitude changes based on alignment
    let angelChange = 0;
    let demonChange = 0;
    let angelReaction = '';
    let demonReaction = '';
    
    switch (alignment) {
      case 'light':
        angelChange = 10;
        demonChange = -5;
        angelReaction = `${pair.angel.name} is pleased. "${pair.angel.advice[0]}"`;
        demonReaction = `${pair.demon.name} observes silently.`;
        break;
      case 'shadow':
        angelChange = -5;
        demonChange = 10;
        angelReaction = `${pair.angel.name} watches with concern.`;
        demonReaction = `${pair.demon.name} approves. "${pair.demon.advice[0]}"`;
        break;
      case 'balance':
        angelChange = 5;
        demonChange = 5;
        angelReaction = `${pair.angel.name} nods. "Wisdom in the middle way."`;
        demonReaction = `${pair.demon.name} acknowledges. "Balance has its own power."`;
        break;
    }
    
    // Apply changes
    this.playerDaimon.angelAttitude = Math.max(-100, Math.min(100,
      this.playerDaimon.angelAttitude + angelChange
    ));
    this.playerDaimon.demonAttitude = Math.max(-100, Math.min(100,
      this.playerDaimon.demonAttitude + demonChange
    ));
    
    // Update dominant aspect
    const diff = this.playerDaimon.angelAttitude - this.playerDaimon.demonAttitude;
    if (diff > 20) {
      this.playerDaimon.dominantAspect = 'angel';
    } else if (diff < -20) {
      this.playerDaimon.dominantAspect = 'demon';
    } else {
      this.playerDaimon.dominantAspect = 'unified';
    }
    
    const daimonChoice: DaimonChoice = {
      chapter,
      choice,
      alignment,
      angelReaction,
      demonReaction,
      attitudeChange: { angel: angelChange, demon: demonChange }
    };
    
    this.playerDaimon.choiceHistory.push(daimonChoice);
    
    return daimonChoice;
  }
  
  /**
   * Get advice from the daimon for current mode
   */
  getAdvice(mode: 'game' | 'design' | 'professional', context?: string): string {
    this.playerDaimon.currentMode = mode;
    this.playerDaimon.lastInteraction = new Date();
    
    const pair = this.playerDaimon.currentPair;
    const dominant = this.playerDaimon.dominantAspect;
    
    let advice = '';
    
    switch (dominant) {
      case 'angel':
        advice = this.getAngelAdvice(pair.angel, mode, context);
        break;
      case 'demon':
        advice = this.getDemonAdvice(pair.demon, mode, context);
        break;
      case 'unified':
        advice = this.getUnifiedAdvice(pair, mode, context);
        break;
    }
    
    this.playerDaimon.adviceGiven.push(advice);
    return advice;
  }
  
  private getAngelAdvice(angel: ShemAngel, mode: string, context?: string): string {
    switch (mode) {
      case 'game':
        return `${angel.name} speaks: "${angel.advice[Math.floor(Math.random() * angel.advice.length)]}"`;
      case 'design':
        return `${angel.name} guides your design: ${angel.designAesthetic}. ${angel.creativeHelp[0]}.`;
      case 'professional':
        return `${angel.name} advises: Your strength is ${angel.professionalSkill}. ${angel.advice[0]}`;
      default:
        return angel.advice[0];
    }
  }
  
  private getDemonAdvice(demon: GoetiaDemon, mode: string, context?: string): string {
    switch (mode) {
      case 'game':
        return `${demon.name} whispers: "${demon.advice[Math.floor(Math.random() * demon.advice.length)]}"`;
      case 'design':
        return `${demon.name} suggests: ${demon.designAesthetic}. ${demon.creativeHelp[0]}.`;
      case 'professional':
        return `${demon.name} counsels: Your power is ${demon.professionalSkill}. ${demon.advice[0]}`;
      default:
        return demon.advice[0];
    }
  }
  
  private getUnifiedAdvice(pair: DaimonPair, mode: string, context?: string): string {
    return `${pair.angel.name} and ${pair.demon.name} speak as one: ${pair.fusionAbility}`;
  }
  
  /**
   * Get greeting based on current state
   */
  getGreeting(): string {
    const pair = this.playerDaimon.currentPair;
    const dominant = this.playerDaimon.dominantAspect;
    
    // Determine path based on attitude balance
    const angelAtt = this.playerDaimon.angelAttitude;
    const demonAtt = this.playerDaimon.demonAttitude;
    
    if (angelAtt > demonAtt + 10) {
      return `${pair.angel.name}: ${pair.angel.greetingLight}\n${pair.demon.name}: ${pair.demon.greetingLight}`;
    } else if (demonAtt > angelAtt + 10) {
      return `${pair.angel.name}: ${pair.angel.greetingShadow}\n${pair.demon.name}: ${pair.demon.greetingShadow}`;
    } else {
      return `${pair.angel.name}: ${pair.angel.greetingBalance}\n${pair.demon.name}: ${pair.demon.greetingBalance}`;
    }
  }
  
  /**
   * Progress to new chapter (may change active daimon pair)
   */
  progressToChapter(chapter: number, arcana: number): void {
    const newPair = this.findPairForContext(arcana, chapter);
    
    if (newPair.number !== this.playerDaimon.currentPair.number) {
      // Daimon pair is changing
      console.log(`Daimon shifts from ${this.playerDaimon.currentPair.angel.name}/${this.playerDaimon.currentPair.demon.name} to ${newPair.angel.name}/${newPair.demon.name}`);
      this.playerDaimon.currentPair = newPair;
    }
  }
  
  /**
   * Get current daimon state
   */
  getState(): PlayerDaimon {
    return { ...this.playerDaimon };
  }
  
  /**
   * Get current pair
   */
  getCurrentPair(): DaimonPair {
    return this.playerDaimon.currentPair;
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export function createDaimonEngine(arcana: number, chapter: number = 1): DaimonEngine {
  return new DaimonEngine(arcana, chapter);
}

