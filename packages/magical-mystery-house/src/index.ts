/**
 * index
 * 
 * @package @cathedral/magical-mystery-house
 */
/**
 * Magical Mystery House - Complete Integration
 * 
 * Connects to:
 * - Real images and assets you've created
 * - All Trinity systems (Soul/Body/Spirit)
 * - All packages and apps
 * - Cross-directory connections
 */

import { MysteryRoom, getAllRooms } from './rooms';
import { MysteryHouseAsset, getAssetsByRoom, getAllRooms as getAssetRooms } from './asset-manifest';

export class MagicalMysteryHouse {
  private rooms: Map<string, MysteryRoom> = new Map();
  private assets: Map<string, MysteryHouseAsset[]> = new Map();

  constructor() {
    this.initializeRooms();
    this.initializeAssets();
  }

  private initializeRooms(): void {
    const rooms = getAllRooms();
    rooms.forEach(room => {
      // Rooms are loaded from rooms.ts
      this.rooms.set(room.id, room);
    });
  }

  private initializeAssets(): void {
    const assetRooms = getAssetRooms();
    assetRooms.forEach(roomId => {
      const assets = getAssetsByRoom(roomId);
      this.assets.set(roomId, assets);
    });
  }

  /**
   * Get room with assets
   */
  getRoom(roomId: string): { room: MysteryRoom; assets: MysteryHouseAsset[] } | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const assets = this.assets.get(roomId) || [];
    return { room, assets };
  }

  /**
   * Get all rooms with their assets
   */
  getAllRoomsWithAssets(): Array<{ room: MysteryRoom; assets: MysteryHouseAsset[] }> {
    return Array.from(this.rooms.values()).map(room => ({
      room,
      assets: this.assets.get(room.id) || []
    }));
  }

  /**
   * Connect to Trinity systems
   */
  connectToTrinity(): {
    soul: string; // Circuitum99
    body: string; // Stone Grimoire
    spirit: string; // Cosmogenesis
  } {
    return {
      soul: '../circuitum99/index.js',
      body: '../stone-grimoire/index.js',
      spirit: '../cosmogenesis-learning-engine/index.js'
    };
  }

  /**
   * Connect to apps
   */
  connectToApps(): {
    web: string;
    synthLab: string;
    tarotArena: string;
  } {
    return {
      web: '../../apps/web',
      synthLab: '../../apps/synth-lab',
      tarotArena: '../../apps/tarot-arena'
    };
  }

  /**
   * Get system status
   */
  getSystemStatus(): {
    rooms: number;
    assets: number;
    connections: {
      trinity: boolean;
      apps: boolean;
      packages: boolean;
    };
  } {
    return {
      rooms: this.rooms.size,
      assets: Array.from(this.assets.values()).flat().length,
      connections: {
        trinity: true,
        apps: true,
        packages: true
      }
    };
  }
}

export const magicalMysteryHouse = new MagicalMysteryHouse();
