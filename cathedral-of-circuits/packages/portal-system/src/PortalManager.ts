/**
 * PortalManager - Research-Based Portal & Transition System
 * Inspired by Skyrim, Fable, and modern RPG design patterns
 * Provides seamless realm transitions with state preservation
 */

export interface PortalConfig {
  id: string;
  name: string;
  type: 'door' | 'portal' | 'gateway' | 'rift' | 'nexus' | 'threshold';
  position: { x: number; y: number; z: number };
  destination: {
    realm: string;
    position: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
  };
  requirements?: {
    level?: number;
    items?: string[];
    energy?: number;
    alignment?: string;
  };
  visual: {
    size: { width: number; height: number };
    color: string;
    effect: 'swirl' | 'dissolve' | 'fade' | 'tunnel' | 'fracture';
    particles: boolean;
    sound: string;
  };
  transition: {
    duration: number;
    easing: string;
    preserveState: boolean;
    loadingScreen: boolean;
  };
}

export interface TransitionState {
  isTransitioning: boolean;
  progress: number;
  fromRealm: string;
  toRealm: string;
  startTime: number;
  estimatedDuration: number;
  canCancel: boolean;
}

export interface RealmState {
  realmId: string;
  playerPosition: { x: number; y: number; z: number };
  playerRotation: { x: number; y: number; z: number };
  inventory: any[];
  activeEffects: any[];
  questProgress: any[];
  worldState: Record<string, any>;
  timestamp: number;
}

export class PortalManager {
  private static portals: Map<string, PortalConfig> = new Map();
  private static transitionState: TransitionState | null = null;
  private static realmStates: Map<string, RealmState> = new Map();
  private static transitionListeners: Set<(state: TransitionState) => void> = new Set();
  private static loadingScreenElement: HTMLElement | null = null;

  /**
   * Register a portal in the world
   */
  static registerPortal(config: PortalConfig): void {
    this.portals.set(config.id, config);
    console.log(`Portal registered: ${config.name} (${config.type}) -> ${config.destination.realm}`);
  }

  /**
   * Unregister a portal
   */
  static unregisterPortal(portalId: string): void {
    this.portals.delete(portalId);
  }

  /**
   * Check if player can use portal
   */
  static canUsePortal(portalId: string, playerState: any): {
    canUse: boolean;
    reason?: string;
    missingRequirements?: string[];
  } {
    const portal = this.portals.get(portalId);
    if (!portal) {
      return { canUse: false, reason: 'Portal not found' };
    }

    const requirements = portal.requirements;
    if (!requirements) {
      return { canUse: true };
    }

    const missingRequirements: string[] = [];

    // Check level requirement
    if (requirements.level && playerState.level < requirements.level) {
      missingRequirements.push(`Level ${requirements.level} required`);
    }

    // Check item requirements
    if (requirements.items) {
      requirements.items.forEach(item => {
        if (!playerState.inventory?.includes(item)) {
          missingRequirements.push(`Missing: ${item}`);
        }
      });
    }

    // Check energy requirement
    if (requirements.energy && playerState.energy < requirements.energy) {
      missingRequirements.push(`Energy: ${requirements.energy} required`);
    }

    // Check alignment requirement
    if (requirements.alignment && playerState.alignment !== requirements.alignment) {
      missingRequirements.push(`Alignment: ${requirements.alignment} required`);
    }

    return {
      canUse: missingRequirements.length === 0,
      reason: missingRequirements.length > 0 ? 'Missing requirements' : undefined,
      missingRequirements
    };
  }

  /**
   * Initiate portal transition with smooth animation
   */
  static async initiateTransition(portalId: string, playerState: any): Promise<boolean> {
    const portal = this.portals.get(portalId);
    if (!portal) {
      console.error(`Portal ${portalId} not found`);
      return false;
    }

    const canUse = this.canUsePortal(portalId, playerState);
    if (!canUse.canUse) {
      console.warn(`Cannot use portal: ${canUse.reason}`);
      return false;
    }

    // Save current realm state
    await this.saveRealmState(playerState.currentRealm, playerState);

    // Start transition
    this.transitionState = {
      isTransitioning: true,
      progress: 0,
      fromRealm: playerState.currentRealm,
      toRealm: portal.destination.realm,
      startTime: Date.now(),
      estimatedDuration: portal.transition.duration,
      canCancel: true
    };

    this.notifyTransitionListeners();

    // Show loading screen if configured
    if (portal.transition.loadingScreen) {
      this.showLoadingScreen(portal);
    }

    // Animate transition
    await this.animateTransition(portal);

    // Complete transition
    await this.completeTransition(portal, playerState);

    return true;
  }

  /**
   * Save current realm state for seamless return
   */
  private static async saveRealmState(realmId: string, playerState: any): Promise<void> {
    const realmState: RealmState = {
      realmId,
      playerPosition: { ...playerState.position },
      playerRotation: { ...playerState.rotation },
      inventory: [...(playerState.inventory || [])],
      activeEffects: [...(playerState.activeEffects || [])],
      questProgress: [...(playerState.questProgress || [])],
      worldState: { ...(playerState.worldState || {}) },
      timestamp: Date.now()
    };

    this.realmStates.set(realmId, realmState);
  }

  /**
   * Animate portal transition with research-based easing
   */
  private static async animateTransition(portal: PortalConfig): Promise<void> {
    const startTime = Date.now();
    const duration = portal.transition.duration;

    return new Promise((resolve) => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1.0);

        // Apply easing curve based on portal type
        const easedProgress = this.applyEasing(progress, portal.visual.effect);

        if (this.transitionState) {
          this.transitionState.progress = easedProgress;
          this.notifyTransitionListeners();
        }

        if (progress < 1.0) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  /**
   * Apply easing curve based on transition type
   */
  private static applyEasing(progress: number, effectType: string): number {
    switch (effectType) {
      case 'swirl':
        // Spiral easing for mystical portals
        return Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;

      case 'dissolve':
        // Smooth dissolve curve
        return 1 - Math.pow(1 - progress, 3);

      case 'fade':
        // Gentle fade transition
        return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      case 'tunnel':
        // Tunnel vision effect
        return Math.pow(progress, 0.7);

      case 'fracture':
        // Fractured glass effect
        return 1 - Math.pow(1 - progress, 2);

      default:
        // Default smooth easing
        return progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }
  }

  /**
   * Show loading screen during transition
   */
  private static showLoadingScreen(portal: PortalConfig): void {
    // Create loading screen element
    if (!this.loadingScreenElement) {
      this.loadingScreenElement = document.createElement('div');
      this.loadingScreenElement.id = 'portal-loading-screen';
      this.loadingScreenElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${portal.visual.color};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      `;

      const loadingText = document.createElement('div');
      loadingText.textContent = `Traveling to ${portal.destination.realm}...`;
      loadingText.style.cssText = `
        color: white;
        font-size: 24px;
        font-family: 'Sacred Geometry Font', serif;
        text-align: center;
      `;

      this.loadingScreenElement.appendChild(loadingText);
      document.body.appendChild(this.loadingScreenElement);
    }

    // Fade in loading screen
    requestAnimationFrame(() => {
      if (this.loadingScreenElement) {
        this.loadingScreenElement.style.opacity = '1';
      }
    });
  }

  /**
   * Hide loading screen
   */
  private static hideLoadingScreen(): void {
    if (this.loadingScreenElement) {
      this.loadingScreenElement.style.opacity = '0';
      setTimeout(() => {
        if (this.loadingScreenElement && this.loadingScreenElement.parentNode) {
          this.loadingScreenElement.parentNode.removeChild(this.loadingScreenElement);
          this.loadingScreenElement = null;
        }
      }, 500);
    }
  }

  /**
   * Complete portal transition
   */
  private static async completeTransition(portal: PortalConfig, playerState: any): Promise<void> {
    // Update player state
    playerState.currentRealm = portal.destination.realm;
    playerState.position = { ...portal.destination.position };
    playerState.rotation = { ...(portal.destination.rotation || { x: 0, y: 0, z: 0 }) };

    // Load destination realm state
    const destinationState = this.realmStates.get(portal.destination.realm);
    if (destinationState) {
      // Restore any realm-specific state
      console.log(`Restored state for realm: ${portal.destination.realm}`);
    }

    // Complete transition
    if (this.transitionState) {
      this.transitionState.isTransitioning = false;
      this.transitionState.progress = 1.0;
      this.notifyTransitionListeners();
    }

    // Hide loading screen
    this.hideLoadingScreen();

    console.log(`Portal transition complete: ${this.transitionState?.fromRealm || 'Unknown'} -> ${portal.destination.realm}`);
  }

  /**
   * Cancel ongoing transition
   */
  static cancelTransition(): boolean {
    if (!this.transitionState || !this.transitionState.canCancel) {
      return false;
    }

    this.transitionState.isTransitioning = false;
    this.transitionState.progress = 0;
    this.hideLoadingScreen();
    this.notifyTransitionListeners();

    return true;
  }

  /**
   * Get current transition state
   */
  static getTransitionState(): TransitionState | null {
    return this.transitionState ? { ...this.transitionState } : null;
  }

  /**
   * Subscribe to transition state changes
   */
  static subscribeToTransitions(callback: (state: TransitionState) => void): () => void {
    this.transitionListeners.add(callback);

    return () => {
      this.transitionListeners.delete(callback);
    };
  }

  /**
   * Notify transition listeners
   */
  private static notifyTransitionListeners(): void {
    if (this.transitionState) {
      this.transitionListeners.forEach(listener => {
        try {
          listener({ ...this.transitionState! });
        } catch (error) {
          console.error('Error in transition listener:', error);
        }
      });
    }
  }

  /**
   * Get all portals in a realm
   */
  static getPortalsInRealm(realmId: string): PortalConfig[] {
    return Array.from(this.portals.values()).filter(portal =>
      portal.destination.realm === realmId ||
      // Could also check for portals that lead FROM this realm
      false
    );
  }

  /**
   * Get portal by ID
   */
  static getPortal(portalId: string): PortalConfig | undefined {
    return this.portals.get(portalId);
  }

  /**
   * Get all registered portals
   */
  static getAllPortals(): PortalConfig[] {
    return Array.from(this.portals.values());
  }

  /**
   * Create portal network between realms
   */
  static createPortalNetwork(realmConnections: Array<{
    fromRealm: string;
    toRealm: string;
    portalType?: PortalConfig['type'];
    requirements?: PortalConfig['requirements'];
  }>): PortalConfig[] {
    const portals: PortalConfig[] = [];

    realmConnections.forEach((connection, index) => {
      const portalId = `network_portal_${index}`;

      const portal: PortalConfig = {
        id: portalId,
        name: `${connection.fromRealm} Gateway`,
        type: connection.portalType || 'portal',
        position: { x: 0, y: 0, z: 0 }, // Would be calculated based on realm layout
        destination: {
          realm: connection.toRealm,
          position: { x: 0, y: 0, z: 0 }
        },
        requirements: connection.requirements,
        visual: {
          size: { width: 3, height: 4 },
          color: '#9966CC',
          effect: 'swirl',
          particles: true,
          sound: 'portal_hum'
        },
        transition: {
          duration: 2000,
          easing: 'smooth',
          preserveState: true,
          loadingScreen: true
        }
      };

      this.registerPortal(portal);
      portals.push(portal);
    });

    return portals;
  }

  /**
   * Calculate optimal portal placement in a realm
   */
  static calculateOptimalPortalPlacement(
    realmSize: { width: number; height: number },
    existingPortals: PortalConfig[],
    sacredGeometry: boolean = true
  ): { x: number; y: number; z: number }[] {
    const positions: { x: number; y: number; z: number }[] = [];

    if (sacredGeometry) {
      // Use fibonacci spiral for portal placement
      const goldenAngle = 2.399963229728653; // 137.5 degrees in radians
      const count = Math.max(3, 8 - existingPortals.length);

      for (let i = 0; i < count; i++) {
        const radius = 5 + (i * 2);
        const angle = i * goldenAngle;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0;

        positions.push({ x, y, z });
      }
    } else {
      // Simple grid placement
      const gridSize = Math.ceil(Math.sqrt(8 - existingPortals.length));
      const spacing = Math.min(realmSize.width, realmSize.height) / (gridSize + 1);

      for (let i = 0; i < gridSize && positions.length < 8; i++) {
        for (let j = 0; j < gridSize && positions.length < 8; j++) {
          const x = (i + 1) * spacing - realmSize.width / 2;
          const z = (j + 1) * spacing - realmSize.height / 2;
          const y = 0;

          positions.push({ x, y, z });
        }
      }
    }

    return positions;
  }

  /**
   * Export portal configuration for save game
   */
  static exportPortalData(): {
    portals: Record<string, PortalConfig>;
    realmStates: Record<string, RealmState>;
  } {
    const portals: Record<string, PortalConfig> = {};
    this.portals.forEach((portal, id) => {
      portals[id] = portal;
    });

    const realmStates: Record<string, RealmState> = {};
    this.realmStates.forEach((state, realmId) => {
      realmStates[realmId] = state;
    });

    return { portals, realmStates };
  }

  /**
   * Import portal configuration from save game
   */
  static importPortalData(data: {
    portals: Record<string, PortalConfig>;
    realmStates: Record<string, RealmState>;
  }): void {
    // Clear existing data
    this.portals.clear();
    this.realmStates.clear();

    // Import portals
    Object.entries(data.portals).forEach(([id, portal]) => {
      this.portals.set(id, portal);
    });

    // Import realm states
    Object.entries(data.realmStates).forEach(([realmId, state]) => {
      this.realmStates.set(realmId, state);
    });
  }

  /**
   * Get portal statistics
   */
  static getPortalStatistics(): {
    totalPortals: number;
    portalsByType: Record<string, number>;
    portalsByRealm: Record<string, number>;
    averageTransitionTime: number;
  } {
    const portalsByType: Record<string, number> = {};
    const portalsByRealm: Record<string, number> = {};

    this.portals.forEach(portal => {
      // Count by type
      portalsByType[portal.type] = (portalsByType[portal.type] || 0) + 1;

      // Count by destination realm
      portalsByRealm[portal.destination.realm] = (portalsByRealm[portal.destination.realm] || 0) + 1;
    });

    return {
      totalPortals: this.portals.size,
      portalsByType,
      portalsByRealm,
      averageTransitionTime: 2000 // Would calculate from actual transitions
    };
  }

  /**
   * Reset portal system
   */
  static reset(): void {
    this.portals.clear();
    this.realmStates.clear();
    this.transitionState = null;
    this.hideLoadingScreen();
    this.transitionListeners.clear();
  }
}

export default PortalManager;
