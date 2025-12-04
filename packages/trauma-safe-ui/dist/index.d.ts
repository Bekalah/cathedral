/**
 * 🛡️ Trauma-Safe Creative Interface Templates
 * Neurodivergent-friendly design with gentle defaults and emergency exits
 * Compatible with Hall of Ateliers, Fusion Creative Suite, and Sacred Mathematics
 *
 * Based on trauma-informed design principles and accessibility best practices
 */
export declare const TRAUMA_SAFE_CONSTANTS: {
    PROCESSING_TIME: {
        MINIMAL: number;
        STANDARD: number;
        GENTLE: number;
        EXTENDED: number;
    };
    MOTION_LEVELS: {
        NONE: number;
        REDUCED: number;
        MODERATE: number;
        FULL: number;
    };
    COLOR_INTENSITY: {
        DIMMED: number;
        SOFT: number;
        STANDARD: number;
        BRIGHT: number;
    };
    SOUND_LEVELS: {
        SILENT: number;
        GENTLE: number;
        STANDARD: number;
        FULL: number;
    };
    SAFE_FREQUENCIES: {
        LIBERATION: number;
        CHANGE: number;
        CONNECTION: number;
        TRANSFORMATION: number;
        INTUITION: number;
        SPIRITUAL: number;
        CONSCIOUSNESS: number;
    };
};
export interface TraumaSafeConfig {
    emergencyExits: boolean;
    processingTime: number;
    motionLevel: number;
    colorIntensity: number;
    soundLevel: number;
    frequencyRange: 'safe' | 'full' | 'custom';
    gentleDefaults: boolean;
    keyboardNavigation: boolean;
    screenReader: boolean;
    voiceControl: boolean;
    eyeTracking: boolean;
    processingDelay: number;
    sensoryBreakInterval: number;
}
export declare class TraumaSafeInterface {
    private config;
    private emergencyExitCallbacks;
    private processingTimeouts;
    private sensoryBreakTimer;
    private isActive;
    constructor(config?: Partial<TraumaSafeConfig>);
    private createDefaultConfig;
    private initializeInterface;
    private setupEmergencyExits;
    private createEmergencyExitButton;
    private triggerEmergencyExit;
    private showExitConfirmation;
    private setupSensoryBreaks;
    private triggerSensoryBreak;
    private showSensoryBreakNotification;
    private hideSensoryBreakNotification;
    private setupKeyboardNavigation;
    private handleTabNavigation;
    private handleArrowNavigation;
    private handleActivation;
    private setupScreenReaderSupport;
    registerEmergencyExit(callback: () => void): void;
    processWithDelay<T>(operation: () => Promise<T>): Promise<T>;
    updateConfig(newConfig: Partial<TraumaSafeConfig>): void;
    getConfig(): TraumaSafeConfig;
    isSafeModeActive(): boolean;
    pause(): void;
    resume(): void;
}
export declare class TraumaSafeCreativeTool {
    private interface;
    private toolName;
    constructor(toolName: string, config?: Partial<TraumaSafeConfig>);
    safeCreativeOperation<T>(operation: () => Promise<T>, operationName: string): Promise<T>;
    safeCharacterSelection(characterData: any, onSelect: (character: any) => void): Promise<void>;
    private validateCharacterData;
    safeGeometryGeneration(geometryParams: any, onGenerate: (geometry: any) => void): Promise<void>;
}
export declare class AccessibilityManager {
    private voiceCommands;
    private isVoiceEnabled;
    constructor();
    private initializeVoiceCommands;
    enableVoiceControl(): void;
    disableVoiceControl(): void;
    private setGentleMode;
    private resetToDefaults;
    private triggerSensoryBreak;
    enableHighContrast(): void;
    enableLargeText(): void;
}
export { TraumaSafeInterface, TraumaSafeCreativeTool, AccessibilityManager };
export declare const traumaSafeInterface: TraumaSafeInterface;
export declare const accessibilityManager: AccessibilityManager;
export declare const TRAUMA_SAFE_PRESETS: {
    SENSITIVE: {
        processingTime: number;
        motionLevel: number;
        colorIntensity: number;
        soundLevel: number;
        frequencyRange: string;
        gentleDefaults: boolean;
    };
    STANDARD: {
        processingTime: number;
        motionLevel: number;
        colorIntensity: number;
        soundLevel: number;
        frequencyRange: string;
        gentleDefaults: boolean;
    };
    ADVANCED: {
        processingTime: number;
        motionLevel: number;
        colorIntensity: number;
        soundLevel: number;
        frequencyRange: string;
        gentleDefaults: boolean;
    };
};
declare const _default: {
    interface: TraumaSafeInterface;
    accessibility: AccessibilityManager;
    constants: {
        PROCESSING_TIME: {
            MINIMAL: number;
            STANDARD: number;
            GENTLE: number;
            EXTENDED: number;
        };
        MOTION_LEVELS: {
            NONE: number;
            REDUCED: number;
            MODERATE: number;
            FULL: number;
        };
        COLOR_INTENSITY: {
            DIMMED: number;
            SOFT: number;
            STANDARD: number;
            BRIGHT: number;
        };
        SOUND_LEVELS: {
            SILENT: number;
            GENTLE: number;
            STANDARD: number;
            FULL: number;
        };
        SAFE_FREQUENCIES: {
            LIBERATION: number;
            CHANGE: number;
            CONNECTION: number;
            TRANSFORMATION: number;
            INTUITION: number;
            SPIRITUAL: number;
            CONSCIOUSNESS: number;
        };
    };
    presets: {
        SENSITIVE: {
            processingTime: number;
            motionLevel: number;
            colorIntensity: number;
            soundLevel: number;
            frequencyRange: string;
            gentleDefaults: boolean;
        };
        STANDARD: {
            processingTime: number;
            motionLevel: number;
            colorIntensity: number;
            soundLevel: number;
            frequencyRange: string;
            gentleDefaults: boolean;
        };
        ADVANCED: {
            processingTime: number;
            motionLevel: number;
            colorIntensity: number;
            soundLevel: number;
            frequencyRange: string;
            gentleDefaults: boolean;
        };
    };
};
export default _default;
