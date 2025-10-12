/*
 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 * 
 * Cathedral of Circuits - Universal Accessibility Engine
 * Core accessibility and internationalization system
 */

class UniversalAccessibilityEngine {
    constructor() {
        this.currentLanguage = 'en';
        this.accessibilitySettings = {};
        this.translations = {};
        this.assistiveTechSupport = {};
        
        this.init();
    }
    
    async init() {
        // Detect user preferences
        await this.detectUserPreferences();
        
        // Load translations
        await this.loadTranslations();
        
        // Initialize accessibility features
        this.initializeAccessibilityFeatures();
        
        // Setup assistive technology support
        this.setupAssistiveTechSupport();
        
        // Apply user settings
        this.applyAccessibilitySettings();
    }
    
    async detectUserPreferences() {
        // Language detection
        this.currentLanguage = 
            localStorage.getItem('cathedral-language') ||
            navigator.language.split('-')[0] ||
            'en';
            
        // Accessibility preference detection
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        this.accessibilitySettings = {
            language: this.currentLanguage,
            reducedMotion: prefersReducedMotion,
            highContrast: prefersHighContrast,
            colorScheme: prefersColorScheme,
            fontSize: localStorage.getItem('cathedral-font-size') || 'medium',
            screenReaderMode: this.detectScreenReader(),
            focusMode: false,
            calmMode: false,
            ...JSON.parse(localStorage.getItem('cathedral-accessibility') || '{}')
        };
    }
    
    detectScreenReader() {
        // Basic screen reader detection
        return (
            navigator.userAgent.includes('NVDA') ||
            navigator.userAgent.includes('JAWS') ||
            navigator.userAgent.includes('VoiceOver') ||
            window.speechSynthesis ||
            document.querySelector('[role="application"]')
        );
    }
    
    async loadTranslations() {
        const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'zh-CN', 'ja', 'ko', 'ar', 'hi'];
        
        if (!supportedLocales.includes(this.currentLanguage)) {
            this.currentLanguage = 'en'; // Fallback
        }
        
        try {
            const [interface_, safety, accessibility, arcana, healing] = await Promise.all([
                fetch(`/locales/${this.currentLanguage}/interface.json`).then(r => r.json()),
                fetch(`/locales/${this.currentLanguage}/safety.json`).then(r => r.json()),
                fetch(`/locales/${this.currentLanguage}/accessibility.json`).then(r => r.json()),
                fetch(`/locales/${this.currentLanguage}/arcana.json`).then(r => r.json()).catch(() => ({})),
                fetch(`/locales/${this.currentLanguage}/healing.json`).then(r => r.json()).catch(() => ({}))
            ]);
            
            this.translations = {
                interface: interface_,
                safety,
                accessibility,
                arcana,
                healing
            };
        } catch (error) {
            console.warn('Translation loading failed, using English fallback:', error);
            // Load English as fallback
            if (this.currentLanguage !== 'en') {
                this.currentLanguage = 'en';
                await this.loadTranslations();
            }
        }
    }
    
    translate(key, category = 'interface', interpolation = {}) {
        const keys = key.split('.');
        let translation = this.translations[category];
        
        for (const k of keys) {
            translation = translation?.[k];
        }
        
        if (!translation) {
            console.warn(`Translation missing: ${category}.${key} for language ${this.currentLanguage}`);
            return key; // Return key as fallback
        }
        
        // Simple interpolation
        let result = translation;
        for (const [placeholder, value] of Object.entries(interpolation)) {
            result = result.replace(`{${placeholder}}`, value);
        }
        
        return result;
    }
    
    initializeAccessibilityFeatures() {
        // Keyboard navigation
        this.initKeyboardNavigation();
        
        // Focus management
        this.initFocusManagement();
        
        // ARIA live regions
        this.initLiveRegions();
        
        // Skip links
        this.initSkipLinks();
        
        // Emergency pause system
        this.initEmergencyPause();
        
        // Memory support
        this.initMemorySupport();
    }
    
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // Escape key for quick exit
            if (e.key === 'Escape') {
                this.handleEscapeKey(e);
            }
            
            // Space/Enter for activation
            if ((e.key === ' ' || e.key === 'Enter') && e.target.hasAttribute('role')) {
                const role = e.target.getAttribute('role');
                if (role === 'button' || role === 'link') {
                    e.target.click();
                    e.preventDefault();
                }
            }
        });
        
        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    initFocusManagement() {
        // Enhanced focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 3px solid #4A90E2 !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 1px #ffffff !important;
            }
            
            .focus-mode *:not(:focus-within) {
                opacity: 0.3;
                transition: opacity 0.3s ease;
            }
            
            .calm-mode {
                animation: none !important;
                transition: none !important;
            }
            
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    initLiveRegions() {
        // Create ARIA live regions for dynamic announcements
        const liveRegions = {
            polite: document.createElement('div'),
            assertive: document.createElement('div'),
            status: document.createElement('div')
        };
        
        liveRegions.polite.setAttribute('aria-live', 'polite');
        liveRegions.polite.setAttribute('aria-atomic', 'true');
        liveRegions.polite.className = 'sr-only';
        
        liveRegions.assertive.setAttribute('aria-live', 'assertive');
        liveRegions.assertive.setAttribute('aria-atomic', 'true');
        liveRegions.assertive.className = 'sr-only';
        
        liveRegions.status.setAttribute('role', 'status');
        liveRegions.status.setAttribute('aria-live', 'polite');
        liveRegions.status.className = 'sr-only';
        
        document.body.appendChild(liveRegions.polite);
        document.body.appendChild(liveRegions.assertive);
        document.body.appendChild(liveRegions.status);
        
        this.liveRegions = liveRegions;
    }
    
    announce(message, priority = 'polite') {
        const region = this.liveRegions[priority] || this.liveRegions.polite;
        region.textContent = '';
        setTimeout(() => {
            region.textContent = message;
        }, 100);
    }
    
    initSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">${this.translate('skipToMain', 'accessibility')}</a>
            <a href="#navigation" class="skip-link">${this.translate('skipToNav', 'accessibility')}</a>
            <a href="#emergency-pause" class="skip-link">Emergency Pause</a>
        `;
        
        const skipLinkStyles = document.createElement('style');
        skipLinkStyles.textContent = `
            .skip-links {
                position: absolute;
                top: -40px;
                left: 6px;
                z-index: 10000;
            }
            
            .skip-link {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }
            
            .skip-link:focus {
                position: static;
                width: auto;
                height: auto;
                background: #000;
                color: #fff;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 4px;
            }
        `;
        
        document.head.appendChild(skipLinkStyles);
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    initEmergencyPause() {
        const emergencyButton = document.createElement('button');
        emergencyButton.id = 'emergency-pause';
        emergencyButton.className = 'emergency-pause-button';
        emergencyButton.textContent = this.translate('pauseButton', 'safety');
        emergencyButton.setAttribute('aria-label', 'Emergency pause - stops all activity immediately');
        
        emergencyButton.addEventListener('click', () => {
            this.emergencyPause();
        });
        
        // Global keyboard shortcut (Ctrl/Cmd + Shift + P)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.emergencyPause();
            }
        });
        
        const emergencyStyles = document.createElement('style');
        emergencyStyles.textContent = `
            .emergency-pause-button {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                background: #d32f2f;
                color: white;
                border: none;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            }
            
            .emergency-pause-button:hover,
            .emergency-pause-button:focus {
                background: #b71c1c;
                outline: 3px solid #fff;
                outline-offset: 2px;
            }
        `;
        
        document.head.appendChild(emergencyStyles);
        document.body.appendChild(emergencyButton);
    }
    
    emergencyPause() {
        // Stop all animations
        const style = document.createElement('style');
        style.id = 'emergency-pause-styles';
        style.textContent = `
            *, *::before, *::after {
                animation-play-state: paused !important;
                transition: none !important;
            }
            
            video, audio {
                pause: true !important;
            }
        `;
        document.head.appendChild(style);
        
        // Pause all videos and audio
        document.querySelectorAll('video, audio').forEach(media => {
            media.pause();
        });
        
        // Show calm space
        this.showCalmSpace();
        
        // Announce pause
        this.announce(this.translate('emergencyPauseActivated', 'safety'), 'assertive');
    }
    
    showCalmSpace() {
        const calmSpace = document.createElement('div');
        calmSpace.className = 'calm-space-overlay';
        calmSpace.setAttribute('role', 'dialog');
        calmSpace.setAttribute('aria-modal', 'true');
        calmSpace.setAttribute('aria-labelledby', 'calm-space-title');
        
        calmSpace.innerHTML = `
            <div class="calm-space-content">
                <h2 id="calm-space-title">${this.translate('calmSpace', 'safety')}</h2>
                <p>${this.translate('safe', 'grounding')}</p>
                <div class="breathing-circle" aria-hidden="true"></div>
                <div class="calm-space-actions">
                    <button class="breathing-exercise">${this.translate('breathingTool', 'safety')}</button>
                    <button class="grounding-exercise">${this.translate('groundingExercise', 'safety')}</button>
                    <button class="resume-activity">Resume Activity</button>
                    <button class="safe-exit">${this.translate('exitButton', 'safety')}</button>
                </div>
            </div>
        `;
        
        // Add calm space styles
        const calmStyles = document.createElement('style');
        calmStyles.textContent = `
            .calm-space-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 50, 100, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10002;
            }
            
            .calm-space-content {
                background: #fff;
                padding: 40px;
                border-radius: 12px;
                text-align: center;
                max-width: 500px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            }
            
            .breathing-circle {
                width: 100px;
                height: 100px;
                border: 3px solid #4A90E2;
                border-radius: 50%;
                margin: 20px auto;
                animation: breathe 6s infinite ease-in-out;
            }
            
            @keyframes breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .calm-space-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: 20px;
            }
            
            .calm-space-actions button {
                padding: 12px 16px;
                border: none;
                border-radius: 6px;
                background: #4A90E2;
                color: white;
                cursor: pointer;
                font-size: 14px;
            }
            
            .calm-space-actions button:hover,
            .calm-space-actions button:focus {
                background: #357abd;
                outline: 2px solid #000;
            }
            
            .safe-exit {
                background: #d32f2f !important;
            }
            
            .safe-exit:hover,
            .safe-exit:focus {
                background: #b71c1c !important;
            }
        `;
        
        document.head.appendChild(calmStyles);
        document.body.appendChild(calmSpace);
        
        // Focus management
        const firstButton = calmSpace.querySelector('button');
        firstButton.focus();
        
        // Event listeners
        calmSpace.querySelector('.resume-activity').addEventListener('click', () => {
            this.resumeActivity();
            document.body.removeChild(calmSpace);
        });
        
        calmSpace.querySelector('.safe-exit').addEventListener('click', () => {
            window.location.href = '/';
        });
        
        calmSpace.querySelector('.breathing-exercise').addEventListener('click', () => {
            this.showBreathingExercise();
        });
        
        calmSpace.querySelector('.grounding-exercise').addEventListener('click', () => {
            this.showGroundingExercise();
        });
    }
    
    resumeActivity() {
        // Remove emergency pause styles
        const pauseStyles = document.getElementById('emergency-pause-styles');
        if (pauseStyles) {
            pauseStyles.remove();
        }
        
        this.announce('Activity resumed', 'polite');
    }
    
    initMemorySupport() {
        // Auto-save user progress and preferences
        setInterval(() => {
            this.saveUserState();
        }, 30000); // Save every 30 seconds
        
        // Helpful reminders without shame
        this.setupHelpfulReminders();
        
        // Never punish for forgetting
        this.setupAmnesiaSupport();
    }
    
    saveUserState() {
        const state = {
            timestamp: Date.now(),
            language: this.currentLanguage,
            accessibilitySettings: this.accessibilitySettings,
            // Add any other relevant state
        };
        
        localStorage.setItem('cathedral-user-state', JSON.stringify(state));
    }
    
    setupHelpfulReminders() {
        // Gentle, non-intrusive reminders
        const reminderInterval = this.accessibilitySettings.reminderFrequency || 1800000; // 30 minutes default
        
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.showHelpfulReminder();
            }
        }, reminderInterval);
    }
    
    showHelpfulReminder() {
        // Show gentle reminder about breaks, saving, etc.
        this.announce(this.translate('breakSuggestion', 'interface'), 'polite');
    }
    
    setupAmnesiaSupport() {
        // Always provide context without judgment
        // Never require remembering previous sessions
        // Always offer helpful orientation
        
        if (!localStorage.getItem('cathedral-returning-user')) {
            this.showWelcomeOrientation();
        } else {
            this.showGentleReorientation();
        }
    }
    
    applyAccessibilitySettings() {
        const settings = this.accessibilitySettings;
        
        // Apply font size
        document.documentElement.style.fontSize = this.getFontSizeValue(settings.fontSize);
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.colorScheme);
        
        // Apply motion preferences
        if (settings.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }
        
        // Apply focus mode
        if (settings.focusMode) {
            document.documentElement.classList.add('focus-mode');
        }
        
        // Apply calm mode
        if (settings.calmMode) {
            document.documentElement.classList.add('calm-mode');
        }
        
        // Apply high contrast
        if (settings.highContrast) {
            document.documentElement.classList.add('high-contrast');
        }
        
        // Screen reader optimizations
        if (settings.screenReaderMode) {
            this.optimizeForScreenReaders();
        }
    }
    
    getFontSizeValue(size) {
        const sizes = {
            small: '14px',
            medium: '16px',
            large: '20px',
            extraLarge: '24px'
        };
        return sizes[size] || '16px';
    }
    
    optimizeForScreenReaders() {
        // Add additional ARIA labels and descriptions
        // Enhance semantic structure
        // Provide more detailed alternative text
        document.documentElement.classList.add('screen-reader-mode');
    }
    
    setupAssistiveTechSupport() {
        // Enhanced keyboard navigation
        this.enhanceKeyboardSupport();
        
        // Voice control support
        this.setupVoiceControl();
        
        // Switch navigation support
        this.setupSwitchNavigation();
        
        // Eye tracking support
        this.setupEyeTrackingSupport();
    }
    
    // Public API methods for changing settings
    setLanguage(languageCode) {
        this.currentLanguage = languageCode;
        localStorage.setItem('cathedral-language', languageCode);
        this.loadTranslations().then(() => {
            this.updateUILanguage();
        });
    }
    
    updateAccessibilitySetting(setting, value) {
        this.accessibilitySettings[setting] = value;
        localStorage.setItem('cathedral-accessibility', JSON.stringify(this.accessibilitySettings));
        this.applyAccessibilitySettings();
    }
    
    toggleFocusMode() {
        this.accessibilitySettings.focusMode = !this.accessibilitySettings.focusMode;
        this.updateAccessibilitySetting('focusMode', this.accessibilitySettings.focusMode);
    }
    
    toggleCalmMode() {
        this.accessibilitySettings.calmMode = !this.accessibilitySettings.calmMode;
        this.updateAccessibilitySetting('calmMode', this.accessibilitySettings.calmMode);
    }
}

// Initialize the accessibility engine when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.accessibilityEngine = new UniversalAccessibilityEngine();
    });
} else {
    window.accessibilityEngine = new UniversalAccessibilityEngine();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalAccessibilityEngine;
}