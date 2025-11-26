/**
 * ink Narrative Integration
 * 
 * ink is the professional narrative scripting language by inkle,
 * used in 80 Days, Heaven's Vault, Sorcery!, and many AAA games.
 * 
 * This integrates ink with Cathedral's daimon system for
 * Disco Elysium-style internal voices that react to everything.
 */

// Note: In production, use inkjs package
// import { Story } from 'inkjs';

/**
 * Daimon Voice — Like Disco Elysium's skill voices
 * Each daimon (angel/demon pair) can interject during narrative
 */
export interface DaimonVoice {
  id: string;
  name: string;
  type: 'angel' | 'demon';
  // When this voice speaks
  triggers: VoiceTrigger[];
  // How this voice speaks
  personality: VoicePersonality;
  // Current attitude toward player
  attitude: number; // -100 to 100
}

export interface VoiceTrigger {
  condition: string; // ink condition expression
  priority: number; // Higher = more likely to speak
  cooldown: number; // Minimum time between interjections
}

export interface VoicePersonality {
  speakingStyle: string;
  commonPhrases: string[];
  emotionalRange: string[];
  metaphorDomain: string; // e.g., "fire" for Vehuiah
}

/**
 * Narrative State — Syncs with ink story state
 */
export interface NarrativeState {
  currentKnot: string;
  currentStitch: string;
  variables: Record<string, any>;
  visitCounts: Record<string, number>;
  turnsSinceLastChoice: number;
  // Daimon-specific
  activeVoices: DaimonVoice[];
  lastSpeaker: string | null;
  voiceCooldowns: Record<string, number>;
}

/**
 * Choice with Daimon Reactions
 * Like Disco Elysium, each choice can trigger daimon commentary
 */
export interface NarrativeChoice {
  index: number;
  text: string;
  // Daimon reactions to this choice
  angelReaction?: string;
  demonReaction?: string;
  // Effects if chosen
  effects: ChoiceEffects;
  // Requirements to see this choice
  requirements?: ChoiceRequirements;
}

export interface ChoiceEffects {
  angelAttitude?: number;
  demonAttitude?: number;
  factionReputation?: Record<string, number>;
  unlocks?: string[];
  alignment?: 'light' | 'shadow' | 'balance';
}

export interface ChoiceRequirements {
  minAngelAttitude?: number;
  minDemonAttitude?: number;
  requiredUnlocks?: string[];
  requiredFaction?: string;
  requiredArcana?: number[];
}

/**
 * ink Story Manager
 * Handles narrative flow with daimon interjections
 */
export class InkStoryManager {
  private storyContent: string;
  private state: NarrativeState;
  private daimonEngine: any; // DaimonEngine from daimon-system.ts
  
  constructor(inkContent: string, daimonEngine: any) {
    this.storyContent = inkContent;
    this.daimonEngine = daimonEngine;
    this.state = {
      currentKnot: 'start',
      currentStitch: '',
      variables: {},
      visitCounts: {},
      turnsSinceLastChoice: 0,
      activeVoices: [],
      lastSpeaker: null,
      voiceCooldowns: {}
    };
  }
  
  /**
   * Get next content with potential daimon interjections
   */
  getNextContent(): NarrativeContent {
    // In production, this would use inkjs to get actual story content
    // For now, we demonstrate the structure
    
    const mainText = this.getMainText();
    const daimonInterjection = this.checkForInterjection();
    const choices = this.getAvailableChoices();
    
    return {
      mainText,
      daimonInterjection,
      choices,
      canContinue: choices.length === 0 && this.hasMoreContent()
    };
  }
  
  /**
   * Check if a daimon wants to interject
   * Like Disco Elysium's skill checks that comment on the situation
   */
  private checkForInterjection(): DaimonInterjection | null {
    const daimonState = this.daimonEngine.getState();
    const pair = this.daimonEngine.getCurrentPair();
    
    // Determine which aspect is more likely to speak
    const angelChance = (daimonState.angelAttitude + 100) / 200;
    const demonChance = (daimonState.demonAttitude + 100) / 200;
    
    // Random check (in production, would be more sophisticated)
    const roll = Math.random();
    
    if (roll < angelChance * 0.3) {
      // Angel speaks
      return {
        speaker: pair.angel.name,
        type: 'angel',
        text: this.generateAngelComment(pair.angel),
        attitude: daimonState.angelAttitude > 0 ? 'supportive' : 'concerned'
      };
    } else if (roll < (angelChance + demonChance) * 0.3) {
      // Demon speaks
      return {
        speaker: pair.demon.name,
        type: 'demon',
        text: this.generateDemonComment(pair.demon),
        attitude: daimonState.demonAttitude > 0 ? 'pleased' : 'disappointed'
      };
    }
    
    return null;
  }
  
  private generateAngelComment(angel: any): string {
    // In production, would use Ollama for dynamic generation
    // For now, use pre-written responses
    const comments = [
      `${angel.name}: "${angel.advice[0]}"`,
      `${angel.name} whispers: "Consider the light path here."`,
      `${angel.name}: "Your ${angel.quality} serves you well."`,
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  }
  
  private generateDemonComment(demon: any): string {
    const comments = [
      `${demon.name}: "${demon.advice[0]}"`,
      `${demon.name} suggests: "There is power in the shadows."`,
      `${demon.name}: "Your ${demon.abilities[0]} grows stronger."`,
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  }
  
  /**
   * Make a choice and process effects
   */
  makeChoice(choiceIndex: number): ChoiceResult {
    const choices = this.getAvailableChoices();
    const choice = choices[choiceIndex];
    
    if (!choice) {
      throw new Error(`Invalid choice index: ${choiceIndex}`);
    }
    
    // Apply effects
    if (choice.effects.angelAttitude) {
      // Update daimon engine
    }
    if (choice.effects.demonAttitude) {
      // Update daimon engine
    }
    
    // Get daimon reactions
    const angelReaction = choice.angelReaction || this.getAngelReactionToChoice(choice);
    const demonReaction = choice.demonReaction || this.getDemonReactionToChoice(choice);
    
    return {
      chosenText: choice.text,
      angelReaction,
      demonReaction,
      effects: choice.effects,
      nextContent: this.getNextContent()
    };
  }
  
  private getAngelReactionToChoice(choice: NarrativeChoice): string {
    const pair = this.daimonEngine.getCurrentPair();
    
    if (choice.effects.alignment === 'light') {
      return `${pair.angel.name} is pleased.`;
    } else if (choice.effects.alignment === 'shadow') {
      return `${pair.angel.name} watches with concern.`;
    } else {
      return `${pair.angel.name} nods thoughtfully.`;
    }
  }
  
  private getDemonReactionToChoice(choice: NarrativeChoice): string {
    const pair = this.daimonEngine.getCurrentPair();
    
    if (choice.effects.alignment === 'shadow') {
      return `${pair.demon.name} approves.`;
    } else if (choice.effects.alignment === 'light') {
      return `${pair.demon.name} observes silently.`;
    } else {
      return `${pair.demon.name} acknowledges the wisdom of balance.`;
    }
  }
  
  // Placeholder methods — would use inkjs in production
  private getMainText(): string {
    return "The story continues...";
  }
  
  private getAvailableChoices(): NarrativeChoice[] {
    return [];
  }
  
  private hasMoreContent(): boolean {
    return true;
  }
}

export interface NarrativeContent {
  mainText: string;
  daimonInterjection: DaimonInterjection | null;
  choices: NarrativeChoice[];
  canContinue: boolean;
}

export interface DaimonInterjection {
  speaker: string;
  type: 'angel' | 'demon';
  text: string;
  attitude: 'supportive' | 'concerned' | 'pleased' | 'disappointed' | 'neutral';
}

export interface ChoiceResult {
  chosenText: string;
  angelReaction: string;
  demonReaction: string;
  effects: ChoiceEffects;
  nextContent: NarrativeContent;
}

// =============================================================================
// SAMPLE INK CONTENT
// =============================================================================

/**
 * Example ink script demonstrating daimon integration
 * This would be in a .ink file, compiled to JSON
 */
export const SAMPLE_INK_CONTENT = `
// Cathedral Chapter 1: The Threshold
// Demonstrates daimon voice integration

VAR angel_attitude = 50
VAR demon_attitude = 50
VAR current_arcana = 0
VAR chapter = 1

=== start ===
You stand at the threshold of the Cathedral.

The great doors are open. Beyond them, darkness and light interweave.

Within you, two voices stir.

+ [Step forward with confidence]
    ~ angel_attitude += 5
    You stride through the doors.
    
    VEHUIAH: "Courage. The first step is always the hardest."
    
    -> first_chamber
    
+ [Pause and observe]
    ~ angel_attitude += 2
    ~ demon_attitude += 2
    You take a moment to study the threshold.
    
    VEHUIAH: "Wisdom in patience."
    BAEL: "And in watching."
    
    -> first_chamber
    
+ [Slip through the shadows]
    ~ demon_attitude += 5
    You move along the edges, unseen.
    
    BAEL: "Good. In shadow, you are most powerful."
    
    -> first_chamber

=== first_chamber ===
The first chamber opens before you.

{ angel_attitude > demon_attitude:
    Light seems to gather around you.
    VEHUIAH: "The Cathedral recognizes your intent."
- else:
    Shadows cling to your form like a cloak.
    BAEL: "You move as one of us now."
}

A figure stands in the center of the room.

+ [Approach openly]
    -> meet_figure_light
+ [Circle around to observe]
    -> meet_figure_balance
+ [Remain hidden and watch]
    -> meet_figure_shadow

=== meet_figure_light ===
~ angel_attitude += 10
You approach the figure directly.

VEHUIAH: "Honesty. A virtue."

The figure turns. It wears the face of the Magician.

"Welcome, seeker. You come with open heart."

-> chapter_1_continue

=== meet_figure_balance ===
~ angel_attitude += 5
~ demon_attitude += 5
You circle the chamber, taking in all details.

VEHUIAH: "Thorough."
BAEL: "Cautious."

The figure turns, having sensed you.

"Welcome, seeker. You come with open eyes."

-> chapter_1_continue

=== meet_figure_shadow ===
~ demon_attitude += 10
You remain in shadow, observing.

BAEL: "Patience. Power."

The figure speaks without turning.

"I know you are there, seeker. You come with hidden purpose."

-> chapter_1_continue

=== chapter_1_continue ===
The Magician gestures to the chamber around you.

"This is where all paths begin. The Fool's journey starts here."

{ current_arcana == 0:
    "You are The Fool, are you not? The one who leaps."
}

"Choose your first lesson."

+ [Teach me of Will] -> lesson_will
+ [Teach me of Wisdom] -> lesson_wisdom
+ [Teach me of Balance] -> lesson_balance

=== lesson_will ===
~ angel_attitude += 10
"Will is the fire that transforms."

VEHUIAH: "This is my domain. Listen well."

The Magician raises one hand to the sky, one to the earth.

"As above, so below. Your will bridges the worlds."

-> end_chapter_1

=== lesson_wisdom ===
~ angel_attitude += 5
~ demon_attitude += 5
"Wisdom is knowing when to act and when to wait."

VEHUIAH: "Light reveals."
BAEL: "Shadow conceals."

The Magician nods.

"Both are needed. This is wisdom."

-> end_chapter_1

=== lesson_balance ===
~ demon_attitude += 10
"Balance is the hardest path."

BAEL: "And the most powerful."

The Magician studies you.

"You seek to walk between. Few succeed."

-> end_chapter_1

=== end_chapter_1 ===
The Magician steps aside, revealing a door.

"Chapter One is complete. The Cathedral awaits."

{ angel_attitude > 60:
    VEHUIAH: "You have done well. I am pleased to guide you further."
}
{ demon_attitude > 60:
    BAEL: "You show promise. The shadows will serve you."
}
{ angel_attitude > 40 && angel_attitude < 60 && demon_attitude > 40 && demon_attitude < 60:
    VEHUIAH: "Balance."
    BAEL: "Balance."
    Both voices speak as one: "The hardest and truest path."
}

-> END
`;

// =============================================================================
// EXPORTS
// =============================================================================

export function createStoryManager(inkContent: string, daimonEngine: any): InkStoryManager {
  return new InkStoryManager(inkContent, daimonEngine);
}

