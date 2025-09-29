/**
 * CATHEDRAL EXTERNAL REPOSITORY CONNECTOR
 * Links the main Cathedral deployment to separate specialized repositories
 */

class ExternalRepositoryConnector {
    constructor() {
        this.externalSystems = {
            stoneGrimoire: {
                name: 'Stone Grimoire',
                description: 'BODY System - Sacred Archive & Chapel Navigation',
                url: 'https://bekalah.github.io/stone-grimoire',
                repo: 'https://github.com/Bekalah/stone-grimoire',
                type: 'BODY_SYSTEM',
                features: [
                    '8 octagram halls with sacred geometry',
                    '144 folios system', 
                    'Alchemy and Angels 72 integration',
                    'Trauma-safe archetypal exploration'
                ],
                status: 'ACTIVE_SEPARATE_DEPLOYMENT'
            },
            
            cosmogenesisEngine: {
                name: 'Cosmogenesis Learning Engine',
                description: 'SPIRIT System - THE BRAIN - Four Worlds Architecture',
                url: 'https://bekalah.github.io/cosmogenesis-learning-engine', // When extracted
                repo: 'https://github.com/Bekalah/cosmogenesis-learning-engine', // When created
                type: 'SPIRIT_SYSTEM',
                features: [
                    'Four Worlds consciousness navigation',
                    'Sacred learning spiral system',
                    '8 circuit brain expanded to 144 nodes',
                    'Primary Codex 144:99 hosting platform'
                ],
                status: 'PLANNED_EXTRACTION_FROM_CATHEDRAL'
            },
            
            booksCollection: {
                name: 'BOOKS Collection',
                description: 'Documentation Hub & Integration Reports',
                url: 'https://bekalah.github.io/BOOKS',
                repo: 'https://github.com/Bekalah/BOOKS', 
                type: 'DOCUMENTATION_HUB',
                features: [
                    'Cathedral integration synthesis',
                    'Repository consolidation documentation',
                    'Architectural guides and reports'
                ],
                status: 'ACTIVE_SEPARATE_DEPLOYMENT'
            }
        };
        
        // Return links back to Cathedral
        this.cathedralHub = {
            name: 'Cathedral of Circuits',
            url: 'https://bekalah.github.io/cathedral',
            description: 'Navigation hub and book game system',
            return_message: 'Return to Cathedral Trinity Navigation'
        };
    }
    
    // Open external system in new window/tab
    openExternalSystem(systemKey) {
        const system = this.externalSystems[systemKey];
        if (!system) {
            return { error: `System ${systemKey} not found` };
        }
        
        // Preserve Cathedral session by opening in new window
        if (typeof window !== 'undefined') {
            window.open(system.url, '_blank', 'noopener,noreferrer');
        }
        
        return {
            action: 'EXTERNAL_NAVIGATION',
            system: system.name,
            url: system.url,
            preservation: 'Cathedral session maintained in original window',
            message: `Opening ${system.name} in new window...`
        };
    }
    
    // Get all external system info
    getExternalSystems() {
        return this.externalSystems;
    }
    
    // Generate navigation UI data
    generateNavigationUI() {
        return {
            title: 'Cathedral Trinity System Navigation',
            hub: 'Cathedral (this deployment)',
            external_systems: Object.keys(this.externalSystems).map(key => ({
                key,
                ...this.externalSystems[key],
                action: 'click to open in new window'
            })),
            strategy: 'Each system maintains independence while linked through Cathedral navigation'
        };
    }
    
    // Add return-to-cathedral links for other repos
    generateReturnLinks() {
        return {
            html: `<a href="${this.cathedralHub.url}" target="_cathedral">🏛️ ${this.cathedralHub.return_message}</a>`,
            javascript: `window.open('${this.cathedralHub.url}', 'cathedral');`,
            metadata: {
                canonical: this.cathedralHub.url,
                description: this.cathedralHub.description
            }
        };
    }
    
    // Integration status
    getIntegrationStatus() {
        return {
            strategy: 'EXTERNAL_LINKING_ARCHITECTURE',
            cathedral_role: 'NAVIGATION_HUB_AND_BOOK_GAME_SYSTEM',
            publishing_benefits: [
                'No monorepo publishing complexity',
                'Independent development cycles',
                'Separate deployment pipelines', 
                'Unified user experience through navigation'
            ],
            user_experience: 'Seamless navigation between specialized applications',
            preservation: 'Cathedral session maintained during external navigation'
        };
    }
}

// Export for Cathedral integration
export { ExternalRepositoryConnector };

// Initialize external connector
console.log('🔗 EXTERNAL REPOSITORY CONNECTOR: Linking Cathedral to specialized systems');
console.log('🌐 Navigation preserves Cathedral session while accessing external repos');
console.log('📦 Publishing pains eliminated through independent repository architecture');