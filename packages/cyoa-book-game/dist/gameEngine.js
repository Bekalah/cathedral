import { GAME_SCENES } from './scenes';
import { REAL_OBJECTS, REAL_BOOKS } from './realObjects';
export class CathedralGameEngine {
    constructor() {
        this.listeners = [];
        this.gameState = this.createInitialState();
    }
    createInitialState() {
        return {
            currentScene: 'start',
            inventory: [],
            visitedScenes: [],
            gameFlags: {},
            playerStats: {
                wisdom: 0,
                courage: 0,
                compassion: 0,
                knowledge: 0,
                experience: 0
            },
            realObjects: []
        };
    }
    getGameState() {
        return { ...this.gameState };
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.getGameState()));
    }
    makeChoice(choiceId) {
        const currentScene = GAME_SCENES[this.gameState.currentScene];
        if (!currentScene)
            return false;
        const choice = currentScene.choices.find(c => c.id === choiceId);
        if (!choice)
            return false;
        // Apply choice effects
        if (choice.effects) {
            this.applyStatEffects(choice.effects);
        }
        // Set game flags if needed
        if (choice.consequences) {
            choice.consequences.forEach(flag => {
                this.gameState.gameFlags[flag] = true;
            });
        }
        // Move to next scene
        const nextScene = GAME_SCENES[choice.targetScene];
        if (nextScene) {
            this.gameState.currentScene = choice.targetScene;
            if (!this.gameState.visitedScenes.includes(choice.targetScene)) {
                this.gameState.visitedScenes.push(choice.targetScene);
            }
            // Handle real world connections
            this.discoverRealObjects(nextScene);
            this.notifyListeners();
            return true;
        }
        return false;
    }
    applyStatEffects(effects) {
        Object.keys(effects).forEach(stat => {
            const key = stat;
            if (key in this.gameState.playerStats) {
                this.gameState.playerStats[key] += effects[key] || 0;
            }
        });
    }
    discoverRealObjects(scene) {
        if (scene.realWorldConnections) {
            scene.realWorldConnections.forEach(objectId => {
                if (!this.gameState.realObjects.find(obj => obj.id === objectId)) {
                    const realObject = REAL_OBJECTS[objectId];
                    if (realObject) {
                        this.gameState.realObjects.push(realObject);
                    }
                }
            });
        }
    }
    getCurrentScene() {
        return GAME_SCENES[this.gameState.currentScene] || null;
    }
    getAvailableChoices() {
        const scene = this.getCurrentScene();
        return scene ? scene.choices : [];
    }
    getRealObjectConnections() {
        return this.gameState.realObjects;
    }
    getPlayerStats() {
        return { ...this.gameState.playerStats };
    }
    canAccessChoice(choiceId) {
        const scene = this.getCurrentScene();
        if (!scene)
            return false;
        const choice = scene.choices.find(c => c.id === choiceId);
        if (!choice)
            return false;
        // Check requirements
        if (choice.requirements) {
            return choice.requirements.every(req => this.gameState.gameFlags[req]);
        }
        return true;
    }
    addToInventory(object) {
        this.gameState.inventory.push(object);
        this.notifyListeners();
    }
    hasVisitedScene(sceneId) {
        return this.gameState.visitedScenes.includes(sceneId);
    }
    getGameProgress() {
        const totalScenes = Object.keys(GAME_SCENES).length;
        const totalObjects = Object.keys(REAL_OBJECTS).length;
        // Calculate level based on experience
        const level = Math.floor(this.gameState.playerStats.experience / 100) + 1;
        return {
            scenesVisited: this.gameState.visitedScenes.length,
            totalScenes,
            objectsDiscovered: this.gameState.realObjects.length,
            totalObjects,
            level
        };
    }
    resetGame() {
        this.gameState = this.createInitialState();
        this.notifyListeners();
    }
    saveGame() {
        return btoa(JSON.stringify(this.gameState));
    }
    loadGame(saveData) {
        try {
            const state = JSON.parse(atob(saveData));
            this.gameState = state;
            this.notifyListeners();
            return true;
        }
        catch (error) {
            console.error('Failed to load game:', error);
            return false;
        }
    }
    getConnectedBooks() {
        return this.gameState.realObjects
            .filter(obj => obj.type === 'book' || REAL_BOOKS[obj.id])
            .map(obj => ({
            book: REAL_BOOKS[obj.id],
            connection: obj.gameConnection,
            discoveredInScene: this.gameState.visitedScenes.find(sceneId => GAME_SCENES[sceneId]?.realWorldConnections?.includes(obj.id))
        }));
    }
    getConnectedArtworks() {
        return this.gameState.realObjects.filter(obj => obj.type === 'artwork');
    }
    getConnectedPlaces() {
        return this.gameState.realObjects.filter(obj => obj.type === 'place');
    }
    getConnectedArtifacts() {
        return this.gameState.realObjects.filter(obj => obj.type === 'artifact');
    }
}
//# sourceMappingURL=gameEngine.js.map