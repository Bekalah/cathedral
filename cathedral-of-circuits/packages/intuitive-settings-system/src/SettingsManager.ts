/**
 * IntuitiveSettingsManager - Research-Based Settings System
 * Inspired by Figma, Framer, and modern design app UX patterns
 * Provides smooth, contextual settings with live preview
 */

export interface SettingCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  settings: Setting[];
}

export interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'boolean' | 'number' | 'select' | 'color' | 'range' | 'text';
  value: any;
  defaultValue: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  category: string;
  affects: string[];
  preview: boolean;
}

export interface SettingsState {
  categories: Record<string, SettingCategory>;
  values: Record<string, any>;
  history: Array<{ settingId: string; oldValue: any; newValue: any; timestamp: number }>;
  previewMode: boolean;
  searchQuery: string;
}

export class IntuitiveSettingsManager {
  private state: SettingsState;
  private listeners: Map<string, Set<(value: any) => void>> = new Map();
  private previewTimeouts: Map<string, number> = new Map();

  constructor() {
    this.state = {
      categories: {},
      values: {},
      history: [],
      previewMode: false,
      searchQuery: ''
    };

    this.initializeDefaultSettings();
  }

  /**
   * Initialize default settings based on research from successful design apps
   */
  private initializeDefaultSettings(): void {
    const categories: Record<string, SettingCategory> = {
      appearance: {
        id: 'appearance',
        name: 'Appearance',
        icon: '🎨',
        description: 'Visual styling and theme settings',
        settings: [
          {
            id: 'theme',
            name: 'Theme',
            description: 'Choose your preferred color scheme',
            type: 'select',
            value: 'sacred-light',
            defaultValue: 'sacred-light',
            options: [
              { label: 'Sacred Light', value: 'sacred-light' },
              { label: 'Sacred Dark', value: 'sacred-dark' },
              { label: 'Mystical', value: 'mystical' },
              { label: 'High Contrast', value: 'high-contrast' }
            ],
            category: 'appearance',
            affects: ['ui-colors', 'background', 'text-contrast'],
            preview: true
          },
          {
            id: 'primary-color',
            name: 'Primary Color',
            description: 'Main accent color for the interface',
            type: 'color',
            value: '#50C878',
            defaultValue: '#50C878',
            category: 'appearance',
            affects: ['buttons', 'links', 'highlights'],
            preview: true
          },
          {
            id: 'font-size',
            name: 'Font Size',
            description: 'Base font size for the interface',
            type: 'range',
            value: 16,
            defaultValue: 16,
            min: 12,
            max: 24,
            step: 1,
            unit: 'px',
            category: 'appearance',
            affects: ['all-text', 'spacing', 'components'],
            preview: true
          }
        ]
      },

      gameplay: {
        id: 'gameplay',
        name: 'Gameplay',
        icon: '🎮',
        description: 'Movement, interaction, and game mechanics',
        settings: [
          {
            id: 'movement-sensitivity',
            name: 'Movement Sensitivity',
            description: 'How responsive movement controls feel',
            type: 'range',
            value: 1.0,
            defaultValue: 1.0,
            min: 0.5,
            max: 2.0,
            step: 0.1,
            unit: 'x',
            category: 'gameplay',
            affects: ['character-movement', 'camera-smoothness'],
            preview: true
          },
          {
            id: 'dash-enabled',
            name: 'Enable Dash',
            description: 'Allow quick dash movement (Hades-style)',
            type: 'boolean',
            value: true,
            defaultValue: true,
            category: 'gameplay',
            affects: ['movement-system', 'combat', 'exploration'],
            preview: false
          },
          {
            id: 'auto-save',
            name: 'Auto Save',
            description: 'Automatically save progress',
            type: 'boolean',
            value: true,
            defaultValue: true,
            category: 'gameplay',
            affects: ['progress-persistence', 'checkpoint-system'],
            preview: false
          }
        ]
      },

      mystical: {
        id: 'mystical',
        name: 'Mystical',
        icon: '🔮',
        description: 'Sacred geometry and spiritual settings',
        settings: [
          {
            id: 'sacred-geometry-enabled',
            name: 'Sacred Geometry Overlay',
            description: 'Show golden ratio and fibonacci grids',
            type: 'boolean',
            value: false,
            defaultValue: false,
            category: 'mystical',
            affects: ['visual-design', 'layout-guides', 'mathematical-precision'],
            preview: true
          },
          {
            id: 'chakra-visualization',
            name: 'Chakra Visualization',
            description: 'Display chakra energy centers and flows',
            type: 'select',
            value: 'subtle',
            defaultValue: 'subtle',
            options: [
              { label: 'Off', value: 'off' },
              { label: 'Subtle', value: 'subtle' },
              { label: 'Prominent', value: 'prominent' },
              { label: 'Educational', value: 'educational' }
            ],
            category: 'mystical',
            affects: ['energy-visualization', 'meditation-mode', 'learning-experience'],
            preview: true
          },
          {
            id: 'fusion-kink-intensity',
            name: 'Fusion Kink Intensity',
            description: 'Level of sacred intimacy mechanics',
            type: 'range',
            value: 0.7,
            defaultValue: 0.7,
            min: 0.0,
            max: 1.0,
            step: 0.1,
            unit: '',
            category: 'mystical',
            affects: ['interaction-depth', 'connection-mechanics', 'sacred-experience'],
            preview: true
          }
        ]
      },

      performance: {
        id: 'performance',
        name: 'Performance',
        icon: '⚡',
        description: 'Graphics, audio, and system optimization',
        settings: [
          {
            id: 'graphics-quality',
            name: 'Graphics Quality',
            description: 'Visual fidelity and effects level',
            type: 'select',
            value: 'high',
            defaultValue: 'high',
            options: [
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
              { label: 'Ultra', value: 'ultra' }
            ],
            category: 'performance',
            affects: ['rendering', 'effects', 'textures', 'frame-rate'],
            preview: true
          },
          {
            id: 'target-fps',
            name: 'Target Frame Rate',
            description: 'Desired frames per second',
            type: 'select',
            value: 60,
            defaultValue: 60,
            options: [
              { label: '30 FPS', value: 30 },
              { label: '60 FPS', value: 60 },
              { label: '120 FPS', value: 120 },
              { label: 'Unlimited', value: 0 }
            ],
            category: 'performance',
            affects: ['animation-smoothness', 'power-consumption', 'responsiveness'],
            preview: false
          },
          {
            id: 'audio-quality',
            name: 'Audio Quality',
            description: 'Sound fidelity and spatial audio',
            type: 'select',
            value: 'high',
            defaultValue: 'high',
            options: [
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' }
            ],
            category: 'performance',
            affects: ['sound-fidelity', 'file-sizes', 'processing-load'],
            preview: false
          }
        ]
      },

      accessibility: {
        id: 'accessibility',
        name: 'Accessibility',
        icon: '♿',
        description: 'Inclusive design and assistance features',
        settings: [
          {
            id: 'high-contrast',
            name: 'High Contrast Mode',
            description: 'Enhanced contrast for better visibility',
            type: 'boolean',
            value: false,
            defaultValue: false,
            category: 'accessibility',
            affects: ['color-scheme', 'text-readability', 'visual-clarity'],
            preview: true
          },
          {
            id: 'large-text',
            name: 'Large Text',
            description: 'Increase text size for better readability',
            type: 'boolean',
            value: false,
            defaultValue: false,
            category: 'accessibility',
            affects: ['font-sizes', 'spacing', 'layout'],
            preview: true
          },
          {
            id: 'reduce-motion',
            name: 'Reduce Motion',
            description: 'Minimize animations and transitions',
            type: 'boolean',
            value: false,
            defaultValue: false,
            category: 'accessibility',
            affects: ['animations', 'transitions', 'visual-effects'],
            preview: true
          },
          {
            id: 'screen-reader',
            name: 'Screen Reader Support',
            description: 'Enhanced support for assistive technologies',
            type: 'boolean',
            value: true,
            defaultValue: true,
            category: 'accessibility',
            affects: ['aria-labels', 'semantic-markup', 'keyboard-navigation'],
            preview: false
          }
        ]
      }
    };

    this.state.categories = categories;

    // Initialize values with defaults
    Object.values(categories).forEach(category => {
      category.settings.forEach(setting => {
        this.state.values[setting.id] = setting.value;
      });
    });
  }

  /**
   * Get setting value with live preview support
   */
  getSetting(settingId: string): any {
    return this.state.values[settingId];
  }

  /**
   * Set setting value with smooth transition and preview support
   */
  setSetting(settingId: string, value: any, preview: boolean = false): boolean {
    const setting = this.findSetting(settingId);
    if (!setting) return false;

    // Validate value based on type
    if (!this.validateSettingValue(setting, value)) {
      return false;
    }

    const oldValue = this.state.values[settingId];

    if (preview) {
      // Set preview value temporarily
      this.state.values[settingId] = value;
      this.notifyListeners(settingId, value);

      // Reset to old value after preview duration
      const timeoutId = window.setTimeout(() => {
        this.state.values[settingId] = oldValue;
        this.notifyListeners(settingId, oldValue);
        this.previewTimeouts.delete(settingId);
      }, 3000);

      this.previewTimeouts.set(settingId, timeoutId);
      return true;
    } else {
      // Clear any existing preview timeout
      const existingTimeout = this.previewTimeouts.get(settingId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        this.previewTimeouts.delete(settingId);
      }

      // Set permanent value
      this.state.values[settingId] = value;

      // Add to history
      this.state.history.push({
        settingId,
        oldValue,
        newValue: value,
        timestamp: Date.now()
      });

      // Keep only recent history
      if (this.state.history.length > 100) {
        this.state.history.shift();
      }

      this.notifyListeners(settingId, value);
      this.applySettingEffects(setting, value);
      return true;
    }
  }

  /**
   * Find setting by ID across all categories
   */
  private findSetting(settingId: string): Setting | undefined {
    for (const category of Object.values(this.state.categories)) {
      const setting = category.settings.find(s => s.id === settingId);
      if (setting) return setting;
    }
    return undefined;
  }

  /**
   * Validate setting value based on type constraints
   */
  private validateSettingValue(setting: Setting, value: any): boolean {
    switch (setting.type) {
      case 'boolean':
        return typeof value === 'boolean';

      case 'number':
        return typeof value === 'number' && !isNaN(value);

      case 'range':
        return typeof value === 'number' &&
               value >= (setting.min || -Infinity) &&
               value <= (setting.max || Infinity);

      case 'select':
        return setting.options?.some(opt => opt.value === value) || false;

      case 'color':
        return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);

      case 'text':
        return typeof value === 'string';

      default:
        return false;
    }
  }

  /**
   * Apply effects of setting change to affected systems
   */
  private applySettingEffects(setting: Setting, value: any): void {
    // Apply effects based on what the setting affects
    setting.affects.forEach(affected => {
      switch (affected) {
        case 'ui-colors':
          this.applyColorTheme(value);
          break;
        case 'background':
          this.applyBackgroundChange(value);
          break;
        case 'text-contrast':
          this.applyTextContrast(value);
          break;
        case 'movement-system':
          this.applyMovementSettings(value);
          break;
        case 'rendering':
          this.applyRenderingSettings(value);
          break;
        case 'animations':
          this.applyAnimationSettings(value);
          break;
        default:
          console.log(`Applied setting ${setting.id} to ${affected}`);
      }
    });
  }

  /**
   * Apply color theme changes with smooth transitions
   */
  private applyColorTheme(themeValue: string): void {
    const root = document.documentElement;

    // Smooth CSS custom property transitions
    root.style.setProperty('--theme-transition', 'all 0.5s ease-in-out');

    switch (themeValue) {
      case 'sacred-light':
        root.style.setProperty('--primary-color', '#50C878');
        root.style.setProperty('--background-color', '#FAFAFA');
        root.style.setProperty('--text-color', '#2C3E50');
        break;
      case 'sacred-dark':
        root.style.setProperty('--primary-color', '#64E882');
        root.style.setProperty('--background-color', '#1A1A1A');
        root.style.setProperty('--text-color', '#E0E0E0');
        break;
      case 'mystical':
        root.style.setProperty('--primary-color', '#9966CC');
        root.style.setProperty('--background-color', '#0F0F23');
        root.style.setProperty('--text-color', '#E6E6FA');
        break;
      case 'high-contrast':
        root.style.setProperty('--primary-color', '#FFFF00');
        root.style.setProperty('--background-color', '#000000');
        root.style.setProperty('--text-color', '#FFFFFF');
        break;
    }

    // Reset transition after animation
    setTimeout(() => {
      root.style.removeProperty('--theme-transition');
    }, 500);
  }

  /**
   * Apply background changes
   */
  private applyBackgroundChange(value: any): void {
    document.body.style.backgroundColor = value;
  }

  /**
   * Apply text contrast changes
   */
  private applyTextContrast(value: any): void {
    const contrast = value ? 'high' : 'normal';
    document.documentElement.setAttribute('data-contrast', contrast);
  }

  /**
   * Apply movement system changes
   */
  private applyMovementSettings(value: any): void {
    // This would integrate with the SmoothMovementEngine
    console.log('Movement settings updated:', value);
  }

  /**
   * Apply rendering quality changes
   */
  private applyRenderingSettings(quality: string): void {
    const qualitySettings = {
      low: { shadows: false, effects: false, resolution: 0.5 },
      medium: { shadows: true, effects: false, resolution: 0.75 },
      high: { shadows: true, effects: true, resolution: 1.0 },
      ultra: { shadows: true, effects: true, resolution: 1.5 }
    };

    const settings = qualitySettings[quality as keyof typeof qualitySettings];
    if (settings) {
      // Apply to rendering engine
      console.log('Rendering quality updated:', settings);
    }
  }

  /**
   * Apply animation settings
   */
  private applyAnimationSettings(enabled: boolean): void {
    const animationSetting = enabled ? 'running' : 'paused';
    document.documentElement.style.setProperty('--global-animation-state', animationSetting);
  }

  /**
   * Subscribe to setting changes
   */
  subscribe(settingId: string, callback: (value: any) => void): () => void {
    if (!this.listeners.has(settingId)) {
      this.listeners.set(settingId, new Set());
    }

    this.listeners.get(settingId)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(settingId)?.delete(callback);
    };
  }

  /**
   * Notify listeners of setting changes
   */
  private notifyListeners(settingId: string, value: any): void {
    this.listeners.get(settingId)?.forEach(callback => {
      try {
        callback(value);
      } catch (error) {
        console.error(`Error in setting listener for ${settingId}:`, error);
      }
    });
  }

  /**
   * Get all settings in a category
   */
  getCategorySettings(categoryId: string): Setting[] {
    return this.state.categories[categoryId]?.settings || [];
  }

  /**
   * Get all categories
   */
  getCategories(): SettingCategory[] {
    return Object.values(this.state.categories);
  }

  /**
   * Search settings by query
   */
  searchSettings(query: string): Setting[] {
    if (!query.trim()) return [];

    const results: Setting[] = [];
    const searchTerm = query.toLowerCase();

    Object.values(this.state.categories).forEach(category => {
      category.settings.forEach(setting => {
        if (
          setting.name.toLowerCase().includes(searchTerm) ||
          setting.description.toLowerCase().includes(searchTerm) ||
          category.name.toLowerCase().includes(searchTerm)
        ) {
          results.push(setting);
        }
      });
    });

    return results;
  }

  /**
   * Reset setting to default value
   */
  resetSetting(settingId: string): boolean {
    const setting = this.findSetting(settingId);
    if (!setting) return false;

    return this.setSetting(settingId, setting.defaultValue);
  }

  /**
   * Reset all settings to defaults
   */
  resetAllSettings(): void {
    Object.values(this.state.categories).forEach(category => {
      category.settings.forEach(setting => {
        this.setSetting(setting.id, setting.defaultValue);
      });
    });
  }

  /**
   * Export settings for save game or backup
   */
  exportSettings(): {
    version: string;
    timestamp: number;
    values: Record<string, any>;
    categories: Record<string, SettingCategory>;
  } {
    return {
      version: '1.0.0',
      timestamp: Date.now(),
      values: { ...this.state.values },
      categories: JSON.parse(JSON.stringify(this.state.categories))
    };
  }

  /**
   * Import settings from backup
   */
  importSettings(data: any): boolean {
    try {
      if (data.values) {
        Object.entries(data.values).forEach(([key, value]) => {
          this.setSetting(key, value);
        });
      }
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }

  /**
   * Get settings that affect a specific system
   */
  getSettingsAffecting(system: string): Setting[] {
    const results: Setting[] = [];

    Object.values(this.state.categories).forEach(category => {
      category.settings.forEach(setting => {
        if (setting.affects.includes(system)) {
          results.push(setting);
        }
      });
    });

    return results;
  }

  /**
   * Enable preview mode for live testing
   */
  enablePreviewMode(): void {
    this.state.previewMode = true;
  }

  /**
   * Disable preview mode and apply changes
   */
  disablePreviewMode(): void {
    this.state.previewMode = false;
    // Clear any pending preview timeouts
    this.previewTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.previewTimeouts.clear();
  }

  /**
   * Get current state for debugging
   */
  getDebugInfo(): {
    totalSettings: number;
    categories: number;
    historyLength: number;
    previewMode: boolean;
    activePreviews: number;
    listenersCount: number;
  } {
    return {
      totalSettings: Object.keys(this.state.values).length,
      categories: Object.keys(this.state.categories).length,
      historyLength: this.state.history.length,
      previewMode: this.state.previewMode,
      activePreviews: this.previewTimeouts.size,
      listenersCount: Array.from(this.listeners.values()).reduce((sum, set) => sum + set.size, 0)
    };
  }
}

export default IntuitiveSettingsManager;
