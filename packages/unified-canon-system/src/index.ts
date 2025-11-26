/**
 * index
 * 
 * @package @cathedral/unified-canon-system
 */
/**
 * Unified Canon System
 * 
 * Perfects and unifies:
 * - Codex 144:99 (144 nodes)
 * - Liber Arcanae Codex Abyssiae (78 cards)
 * - Circuitum99: Alpha et Omega (33 chapters, 99 gates)
 * - Fable-like RPG mechanics
 * - Real canon and real creative aspects
 * 
 * Never flat - always flowing, trauma-informed design.
 */

import { perfectCodex } from '@cathedral/codex-144-99/complete-codex';
import { getCard, getAllCards } from '@cathedral/liber-arcanae/complete-tarot-system';
import { completeStory } from '@cathedral/circuitum99/complete-story-integration';
import { FableRPGCharacter } from '@cathedral/circuitum99/fable-rpg-mechanics';

export interface UnifiedCanonQuery {
  type: 'node' | 'card' | 'chapter' | 'gate' | 'all';
  id?: number | string;
  query?: string;
}

export interface UnifiedCanonResult {
  nodes: any[];
  cards: any[];
  chapters: any[];
  gates: number[];
  connections: {
    nodeToCard: Map<number, string[]>;
    cardToNode: Map<string, number[]>;
    chapterToNode: Map<number, number[]>;
    nodeToChapter: Map<number, number[]>;
    gateToChapter: Map<number, number>;
    chapterToGate: Map<number, number>;
  };
}

/**
 * Unified Canon System
 * 
 * Perfects all systems and makes them work together
 */
export class UnifiedCanonSystem {
  private character: FableRPGCharacter;

  constructor() {
    this.character = new FableRPGCharacter();
  }

  /**
   * Query unified canon system
   */
  query(query: UnifiedCanonQuery): UnifiedCanonResult {
    let nodes: any[] = [];
    let cards: any[] = [];
    let chapters: any[] = [];
    let gates: number[] = [];

    switch (query.type) {
      case 'node':
        if (typeof query.id === 'number') {
          const perfectNode = perfectCodex.getPerfectNode(query.id);
          nodes = [perfectNode];
          cards = perfectNode.tarot.all.map(id => getCard(id)).filter(Boolean);
          chapters = perfectNode.circuitum.chapters.map(ch => 
            completeStory.getCompleteStoryNode(ch)
          );
          gates = perfectNode.circuitum.gates;
        }
        break;

      case 'card':
        if (typeof query.id === 'string') {
          const card = getCard(query.id);
          if (card) {
            cards = [card];
            nodes = card.correspondences.codexNodes.map(nodeId =>
              perfectCodex.getPerfectNode(nodeId)
            );
            chapters = card.correspondences.circuitumChapters.map(ch =>
              completeStory.getCompleteStoryNode(ch)
            );
            gates = card.correspondences.circuitumChapters; // Chapters map to gates
          }
        }
        break;

      case 'chapter':
        if (typeof query.id === 'number') {
          const storyNode = completeStory.getCompleteStoryNode(query.id);
          chapters = [storyNode];
          nodes = storyNode.codexNodes;
          cards = storyNode.tarotCards;
          gates = storyNode.gates;
        }
        break;

      case 'gate':
        if (typeof query.id === 'number') {
          gates = [query.id];
          // Gate maps to chapter (1-33)
          if (query.id <= 33) {
            const storyNode = completeStory.getCompleteStoryNode(query.id);
            chapters = [storyNode];
            nodes = storyNode.codexNodes;
            cards = storyNode.tarotCards;
          }
        }
        break;

      case 'all':
        if (query.query) {
          // Search all systems
          nodes = perfectCodex.searchNodes(query.query);
          cards = getAllCards().filter(card =>
            card.name.toLowerCase().includes(query.query!.toLowerCase()) ||
            card.narrative.theme.toLowerCase().includes(query.query!.toLowerCase())
          );
          // Search chapters by description
          const allChapters = completeStory.getCompleteStoryPath();
          chapters = allChapters.filter(ch =>
            ch.chapterData.description.toLowerCase().includes(query.query!.toLowerCase())
          );
          gates = chapters.flatMap(ch => ch.gates);
        } else {
          // Get everything
          nodes = perfectCodex.getAllPerfectNodes();
          cards = getAllCards();
          chapters = completeStory.getCompleteStoryPath();
          gates = Array.from({ length: 99 }, (_, i) => i + 1);
        }
        break;
    }

    // Build connection maps
    const connections = this.buildConnectionMaps(nodes, cards, chapters, gates);

    return {
      nodes,
      cards,
      chapters,
      gates,
      connections
    };
  }

  /**
   * Build connection maps
   */
  private buildConnectionMaps(
    nodes: any[],
    cards: any[],
    chapters: any[],
    gates: number[]
  ): UnifiedCanonResult['connections'] {
    const nodeToCard = new Map<number, string[]>();
    const cardToNode = new Map<string, number[]>();
    const chapterToNode = new Map<number, number[]>();
    const nodeToChapter = new Map<number, number[]>();
    const gateToChapter = new Map<number, number>();
    const chapterToGate = new Map<number, number>();

    // Build node ↔ card connections
    nodes.forEach(perfectNode => {
      nodeToCard.set(perfectNode.id, perfectNode.tarot.all);
      perfectNode.tarot.all.forEach(cardId => {
        if (!cardToNode.has(cardId)) {
          cardToNode.set(cardId, []);
        }
        cardToNode.get(cardId)!.push(perfectNode.id);
      });
    });

    // Build chapter ↔ node connections
    chapters.forEach(storyNode => {
      chapterToNode.set(storyNode.chapter, storyNode.codexNodes.map(n => n.id));
      storyNode.codexNodes.forEach(perfectNode => {
        if (!nodeToChapter.has(perfectNode.id)) {
          nodeToChapter.set(perfectNode.id, []);
        }
        nodeToChapter.get(perfectNode.id)!.push(storyNode.chapter);
      });
    });

    // Build gate ↔ chapter connections
    chapters.forEach(storyNode => {
      storyNode.gates.forEach(gate => {
        gateToChapter.set(gate, storyNode.chapter);
        chapterToGate.set(storyNode.chapter, gate);
      });
    });

    return {
      nodeToCard,
      cardToNode,
      chapterToNode,
      nodeToChapter,
      gateToChapter,
      chapterToGate
    };
  }

  /**
   * Get character for Fable RPG
   */
  getCharacter(): FableRPGCharacter {
    return this.character;
  }

  /**
   * Get complete story path
   */
  getCompleteStoryPath(): any[] {
    return completeStory.getCompleteStoryPath();
  }

  /**
   * Get perfect codex
   */
  getPerfectCodex(): typeof perfectCodex {
    return perfectCodex;
  }
}

// Helper function (would be imported)
function getAllCards(): any[] {
  // This would return all 78 cards
  return [];
}

// Singleton instance
export const unifiedCanon = new UnifiedCanonSystem();
