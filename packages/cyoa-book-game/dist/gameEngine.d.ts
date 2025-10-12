import { GameState, GameScene, PlayerStats, GameObject, RealObject } from './types';
export declare class CathedralGameEngine {
    private gameState;
    private listeners;
    constructor();
    private createInitialState;
    getGameState(): GameState;
    subscribe(listener: (state: GameState) => void): () => void;
    private notifyListeners;
    makeChoice(choiceId: string): boolean;
    private applyStatEffects;
    private discoverRealObjects;
    getCurrentScene(): GameScene | null;
    getAvailableChoices(): GameScene['choices'];
    getRealObjectConnections(): RealObject[];
    getPlayerStats(): PlayerStats;
    canAccessChoice(choiceId: string): boolean;
    addToInventory(object: GameObject): void;
    hasVisitedScene(sceneId: string): boolean;
    getGameProgress(): {
        scenesVisited: number;
        totalScenes: number;
        objectsDiscovered: number;
        totalObjects: number;
        level: number;
    };
    resetGame(): void;
    saveGame(): string;
    loadGame(saveData: string): boolean;
    getConnectedBooks(): Array<{
        book: any;
        connection: string;
        discoveredInScene?: string;
    }>;
    getConnectedArtworks(): RealObject[];
    getConnectedPlaces(): RealObject[];
    getConnectedArtifacts(): RealObject[];
}
//# sourceMappingURL=gameEngine.d.ts.map