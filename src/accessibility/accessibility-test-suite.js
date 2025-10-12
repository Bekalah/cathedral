/*
 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 * 
 * Cathedral of Circuits - Advanced Accessibility Testing Suite
 */

class AccessibilityTestSuite {
    constructor() {
        this.testResults = [];
        this.violations = [];
        this.recommendations = [];
    }
    
    async runFullAccessibilityAudit() {
        console.log('🔍 Starting Cathedral of Circuits Accessibility Audit...');
        
        // Run all test categories
        await this.testKeyboardNavigation();
        await this.testScreenReaderCompatibility();
        await this.testColorContrastCompliance();
        await this.testFocusManagement();
        await this.testARIAImplementation();
        await this.testTimingAndMotion();
        await this.testLanguageSupport();
        await this.testAssistiveTechCompatibility();
        await this.testNeurodivergentFeatures();
        await this.testTraumaInformedDesign();
        
        this.generateAccessibilityReport();
        return this.testResults;
    }
    
    async testKeyboardNavigation() {
        console.log('⌨️ Testing keyboard navigation...');
        
        const focusableElements = this.getAllFocusableElements();
        const tabOrder = [];
        
        // Test tab navigation
        for (let element of focusableElements) {
            element.focus();
            tabOrder.push({
                element: element.tagName + (element.id ? '#' + element.id : ''),
                tabIndex: element.tabIndex,
                visible: this.isElementVisible(element),
                hasOutline: this.hasFocusOutline(element)
            });
        }
        
        // Check for keyboard traps
        const hasKeyboardTrap = this.detectKeyboardTrap();
        
        // Check skip links
        const skipLinks = this.testSkipLinks();
        
        this.testResults.push({
            category: 'Keyboard Navigation',
            score: this.calculateKeyboardScore(tabOrder, hasKeyboardTrap, skipLinks),
            details: {
                focusableElements: focusableElements.length,
                tabOrder,
                hasKeyboardTrap,
                skipLinks
            }
        });
    }
    
    async testScreenReaderCompatibility() {
        console.log('🔊 Testing screen reader compatibility...');
        
        const ariaLabels = document.querySelectorAll('[aria-label]');
        const ariaDescribedBy = document.querySelectorAll('[aria-describedby]');
        const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="complementary"], [role="contentinfo"]');
        const headingStructure = this.analyzeHeadingStructure();
        const altTexts = this.analyzeAltTexts();
        const liveRegions = document.querySelectorAll('[aria-live]');
        
        this.testResults.push({
            category: 'Screen Reader Compatibility',
            score: this.calculateScreenReaderScore(ariaLabels, landmarks, headingStructure, altTexts),
            details: {
                ariaLabels: ariaLabels.length,
                ariaDescribedBy: ariaDescribedBy.length,
                landmarks: landmarks.length,
                headingStructure,
                altTexts,
                liveRegions: liveRegions.length
            }
        });
    }
    
    async testColorContrastCompliance() {
        console.log('🎨 Testing color contrast compliance...');
        
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button, label');
        const contrastResults = [];
        
        for (let element of textElements) {
            if (element.textContent.trim()) {
                const contrast = this.calculateContrastRatio(element);
                contrastResults.push({
                    element: element.tagName,
                    contrast: contrast.ratio,
                    passes: contrast.passes,
                    level: contrast.level
                });
            }
        }
        
        const averageContrast = contrastResults.reduce((sum, result) => sum + result.contrast, 0) / contrastResults.length;
        const passingElements = contrastResults.filter(result => result.passes).length;
        
        this.testResults.push({
            category: 'Color Contrast',
            score: (passingElements / contrastResults.length) * 100,
            details: {
                totalElements: contrastResults.length,
                passingElements,
                averageContrast,
                minimumContrast: Math.min(...contrastResults.map(r => r.contrast)),
                contrastResults: contrastResults.slice(0, 10) // Sample for report
            }
        });
    }
    
    async testFocusManagement() {
        console.log('🎯 Testing focus management...');
        
        const modals = document.querySelectorAll('[role="dialog"], [aria-modal="true"]');
        const focusTraps = [];
        
        for (let modal of modals) {
            const hasFocusTrap = this.testFocusTrap(modal);
            focusTraps.push({
                modal: modal.id || modal.className,
                hasFocusTrap
            });
        }
        
        const visibleFocusIndicators = this.testVisibleFocusIndicators();
        const logicalFocusOrder = this.testLogicalFocusOrder();
        
        this.testResults.push({
            category: 'Focus Management',
            score: this.calculateFocusScore(focusTraps, visibleFocusIndicators, logicalFocusOrder),
            details: {
                modals: modals.length,
                focusTraps,
                visibleFocusIndicators,
                logicalFocusOrder
            }
        });
    }
    
    async testARIAImplementation() {
        console.log('🏷️ Testing ARIA implementation...');
        
        const ariaErrors = this.validateARIA();
        const roleUsage = this.analyzeRoleUsage();
        const stateProperties = this.analyzeStateProperties();
        
        this.testResults.push({
            category: 'ARIA Implementation',
            score: this.calculateARIAScore(ariaErrors, roleUsage, stateProperties),
            details: {
                ariaErrors,
                roleUsage,
                stateProperties
            }
        });
    }
    
    async testTimingAndMotion() {
        console.log('⏱️ Testing timing and motion...');
        
        const animations = this.analyzeAnimations();
        const autoplayMedia = document.querySelectorAll('video[autoplay], audio[autoplay]');
        const timeoutElements = this.findTimeoutElements();
        const reducedMotionSupport = this.testReducedMotionSupport();
        
        this.testResults.push({
            category: 'Timing and Motion',
            score: this.calculateTimingMotionScore(animations, autoplayMedia, reducedMotionSupport),
            details: {
                animations,
                autoplayMedia: autoplayMedia.length,
                timeoutElements,
                reducedMotionSupport
            }
        });
    }
    
    async testLanguageSupport() {
        console.log('🌍 Testing language support...');
        
        const langAttribute = document.documentElement.lang;
        const langElements = document.querySelectorAll('[lang]');
        const textDirection = document.documentElement.dir;
        const translationSupport = this.testTranslationSupport();
        
        this.testResults.push({
            category: 'Language Support',
            score: this.calculateLanguageScore(langAttribute, langElements, translationSupport),
            details: {
                documentLanguage: langAttribute,
                languageElements: langElements.length,
                textDirection,
                translationSupport
            }
        });
    }
    
    async testNeurodivergentFeatures() {
        console.log('🧠 Testing neurodivergent support features...');
        
        const focusMode = this.testFocusMode();
        const calmMode = this.testCalmMode();
        const memorySupport = this.testMemorySupport();
        const processingTimeSupport = this.testProcessingTimeSupport();
        const overwhelmPrevention = this.testOverwhelmPrevention();
        
        this.testResults.push({
            category: 'Neurodivergent Support',
            score: this.calculateNeurodivergentScore(focusMode, calmMode, memorySupport),
            details: {
                focusMode,
                calmMode,
                memorySupport,
                processingTimeSupport,
                overwhelmPrevention
            }
        });
    }
    
    async testTraumaInformedDesign() {
        console.log('🛡️ Testing trauma-informed design...');
        
        const emergencyPause = this.testEmergencyPause();
        const consentFramework = this.testConsentFramework();
        const safetyTools = this.testSafetyTools();
        const warningSystem = this.testWarningSystem();
        const boundaryRespect = this.testBoundaryRespect();
        
        this.testResults.push({
            category: 'Trauma-Informed Design',
            score: this.calculateTraumaInformedScore(emergencyPause, consentFramework, safetyTools),
            details: {
                emergencyPause,
                consentFramework,
                safetyTools,
                warningSystem,
                boundaryRespect
            }
        });
    }
    
    // Helper methods for testing
    getAllFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]'
        ];
        
        return Array.from(document.querySelectorAll(focusableSelectors.join(', ')))
            .filter(element => this.isElementVisible(element));
    }
    
    isElementVisible(element) {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && 
               style.visibility !== 'hidden' && 
               style.opacity !== '0' &&
               element.offsetWidth > 0 && 
               element.offsetHeight > 0;
    }
    
    calculateContrastRatio(element) {
        const style = window.getComputedStyle(element);
        const bgColor = this.parseColor(style.backgroundColor);
        const textColor = this.parseColor(style.color);
        
        const ratio = this.getContrastRatio(textColor, bgColor);
        const fontSize = parseFloat(style.fontSize);
        const fontWeight = style.fontWeight;
        
        // WCAG contrast requirements
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || fontWeight >= 700));
        const passesAA = isLargeText ? ratio >= 3 : ratio >= 4.5;
        const passesAAA = isLargeText ? ratio >= 4.5 : ratio >= 7;
        
        return {
            ratio,
            passes: passesAA,
            level: passesAAA ? 'AAA' : passesAA ? 'AA' : 'Fail'
        };
    }
    
    analyzeHeadingStructure() {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const structure = headings.map(h => ({
            level: parseInt(h.tagName[1]),
            text: h.textContent.trim().substring(0, 50),
            hasId: !!h.id
        }));
        
        // Check for proper hierarchy
        let properHierarchy = true;
        for (let i = 1; i < structure.length; i++) {
            if (structure[i].level > structure[i-1].level + 1) {
                properHierarchy = false;
                break;
            }
        }
        
        return {
            headings: structure,
            count: headings.length,
            hasH1: headings.some(h => h.tagName === 'H1'),
            properHierarchy
        };
    }
    
    testEmergencyPause() {
        const emergencyButton = document.getElementById('emergency-pause');
        return {
            exists: !!emergencyButton,
            visible: emergencyButton ? this.isElementVisible(emergencyButton) : false,
            accessible: emergencyButton ? !!emergencyButton.getAttribute('aria-label') : false,
            keyboardShortcut: this.testEmergencyKeyboardShortcut()
        };
    }
    
    testFocusMode() {
        return {
            available: document.documentElement.classList.contains('focus-mode') || 
                      !!document.querySelector('[data-focus-mode]'),
            toggleExists: !!document.querySelector('[data-toggle="focus-mode"]')
        };
    }
    
    testCalmMode() {
        return {
            available: document.documentElement.classList.contains('calm-mode') || 
                      !!document.querySelector('[data-calm-mode]'),
            toggleExists: !!document.querySelector('[data-toggle="calm-mode"]')
        };
    }
    
    generateAccessibilityReport() {
        const overallScore = this.testResults.reduce((sum, result) => sum + result.score, 0) / this.testResults.length;
        
        const report = {
            timestamp: new Date().toISOString(),
            overallScore: Math.round(overallScore),
            level: this.getComplianceLevel(overallScore),
            testResults: this.testResults,
            recommendations: this.generateRecommendations()
        };
        
        console.log('📊 Accessibility Audit Complete');
        console.log(`Overall Score: ${report.overallScore}/100 (${report.level})`);
        console.table(this.testResults.map(r => ({
            Category: r.category,
            Score: Math.round(r.score)
        })));
        
        if (this.recommendations.length > 0) {
            console.log('💡 Recommendations:');
            this.recommendations.forEach((rec, i) => {
                console.log(`${i + 1}. ${rec}`);
            });
        }
        
        return report;
    }
    
    getComplianceLevel(score) {
        if (score >= 95) return 'Excellent (AAA+)';
        if (score >= 85) return 'Very Good (AAA)';
        if (score >= 75) return 'Good (AA+)';
        if (score >= 65) return 'Acceptable (AA)';
        if (score >= 50) return 'Needs Improvement (A)';
        return 'Critical Issues (Below A)';
    }
    
    generateRecommendations() {
        const recommendations = [];
        
        this.testResults.forEach(result => {
            if (result.score < 80) {
                switch (result.category) {
                    case 'Keyboard Navigation':
                        recommendations.push('Improve keyboard navigation by ensuring all interactive elements are focusable and have visible focus indicators');
                        break;
                    case 'Screen Reader Compatibility':
                        recommendations.push('Add more ARIA labels and ensure proper heading structure for screen reader users');
                        break;
                    case 'Color Contrast':
                        recommendations.push('Increase color contrast ratios to meet WCAG AA standards');
                        break;
                    case 'Trauma-Informed Design':
                        recommendations.push('Enhance trauma-informed features like emergency pause and consent frameworks');
                        break;
                    // Add more recommendations as needed
                }
            }
        });
        
        this.recommendations = recommendations;
        return recommendations;
    }
    
    // Additional helper methods would go here...
    // This is a comprehensive foundation for accessibility testing
}

// Auto-run accessibility tests in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (window.confirm('Run accessibility audit?')) {
                const testSuite = new AccessibilityTestSuite();
                testSuite.runFullAccessibilityAudit();
                window.accessibilityTestSuite = testSuite;
            }
        }, 2000);
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityTestSuite;
}