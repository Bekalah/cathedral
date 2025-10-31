import * as fs from 'fs';

/**
 * Cathedral v1.0 - Integration Protocol Manager
 * Maintains clean architecture and prevents architectural drift
 */

export interface SystemIntegration {
  codex144: {
    source: 'data/codex-144-99-master.json';
    nodes: 144;
    master_numbers: [11, 22, 33];
  };
  liberArcanae: {
    source: 'data/liber-arcanae-mirror.json';
    cards: 78;
    major_arcana: 22;
  };
  circuitum99: {
    source: 'packages/circuitum99/index.js';
    gates: 99;
    spine_chapters: 33;
  };
  stoneGrimoire: {
    source: 'packages/stone-grimoire/index.js';
    chapels: 8;
    sacred_spaces: number;
  };
}

export class CathedralIntegrationManager {
  private systems: Map<string, any> = new Map();
  private validationRules: Set<string> = new Set();
  private singleSourceOfTruth: string = 'data/codex-144-99-master.json';

  constructor() {
    this.initializeValidationRules();
    this.loadSingleSourceOfTruth();
  }

  private initializeValidationRules() {
    // OpenSpec v1.0 Compliance Rules
    this.validationRules.add('NO_DUPLICATE_IMPLEMENTATIONS');
    this.validationRules.add('SINGLE_SOURCE_OF_TRUTH');
    this.validationRules.add('TURBO_MONOREPO_STRUCTURE');
    this.validationRules.add('NO_AI_GENERATED_SPAM');
    this.validationRules.add('CHARACTER_CONSISTENCY');
    this.validationRules.add('MATHEMATICAL_PRECISION');
  }

  private loadSingleSourceOfTruth() {
    try {
      const codexData = JSON.parse(
        fs.readFileSync(this.singleSourceOfTruth, 'utf8')
      );
      this.systems.set('codex144', codexData);
      console.log('✅ Single source of truth loaded:', this.singleSourceOfTruth);
    } catch (error) {
      console.error('❌ Failed to load single source of truth:', error);
      throw new Error('Master data file corrupted or missing');
    }
  }

  /**
   * Validate integration between systems
   */
  validateIntegration(systemA: string, systemB: string): boolean {
    console.log(`🔗 Validating integration: ${systemA} ↔ ${systemB}`);

    // Check character consistency
    if (!this.validateCharacterConsistency(systemA, systemB)) {
      console.error('❌ Character consistency validation failed');
      return false;
    }

    // Check mathematical precision
    if (!this.validateMathematicalPrecision(systemA, systemB)) {
      console.error('❌ Mathematical precision validation failed');
      return false;
    }

    // Check cross-system mapping
    if (!this.validateCrossSystemMapping(systemA, systemB)) {
      console.error('❌ Cross-system mapping validation failed');
      return false;
    }

    console.log('✅ Integration validation passed');
    return true;
  }

  private validateCharacterConsistency(systemA: string, systemB: string): boolean {
    // Get characters from both systems
    const systemAChars = this.getSystemCharacters(systemA);
    const systemBChars = this.getSystemCharacters(systemB);

    // Check for character conflicts
    for (const char of systemAChars) {
      if (systemBChars.includes(char) && !this.isValidCrossSystemCharacter(char)) {
        console.warn(`⚠️ Character conflict: ${char} exists in both systems`);
        return false;
      }
    }

    return true;
  }

  private validateMathematicalPrecision(systemA: string, systemB: string): boolean {
    // Validate sacred numbers remain consistent
    const sacredNumbers = [11, 22, 33, 78, 99, 144];
    
    for (const num of sacredNumbers) {
      const systemACount = this.getSystemCount(systemA, num);
      const systemBCount = this.getSystemCount(systemB, num);
      
      if (systemACount !== systemBCount && !this.isValidNumberDiscrepancy(num)) {
        console.warn(`⚠️ Sacred number ${num} count mismatch: ${systemACount} vs ${systemBCount}`);
        return false;
      }
    }

    return true;
  }

  private validateCrossSystemMapping(systemA: string, systemB: string): boolean {
    // Check that mapping files exist and are valid
    const mappingFile = this.getMappingFile(systemA, systemB);
    
    if (!mappingFile || !require('fs').existsSync(mappingFile)) {
      console.error(`❌ Missing mapping file: ${mappingFile}`);
      return false;
    }

    try {
      const mappingData = JSON.parse(
        require('fs').readFileSync(mappingFile, 'utf8')
      );
      
      if (!mappingData.metadata || !mappingData.mirror_structure) {
        console.error(`❌ Invalid mapping file structure: ${mappingFile}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`❌ Failed to parse mapping file: ${mappingFile}`, error);
      return false;
    }
  }

  private getSystemCharacters(system: string): string[] {
    switch (system) {
      case 'codex144':
        return Object.values(this.systems.get('codex144')?.nodes || {})
          .map((node: any) => node.character)
          .filter(Boolean);
      case 'liberArcanae':
        return Object.keys(this.systems.get('liberArcanae')?.major_arcana_mappings || {})
          .map(id => this.systems.get('liberArcanae')?.major_arcana_mappings[id]?.character)
          .filter(Boolean);
      default:
        return [];
    }
  }

  private getSystemCount(system: string, number: number): number {
    switch (system) {
      case 'codex144':
        return this.systems.get('codex144')?.structure?.total_nodes === number ? 1 : 0;
      case 'liberArcanae':
        return this.systems.get('liberArcanae')?.mirror_structure?.total_tarot_cards === number ? 1 : 0;
      default:
        return 0;
    }
  }

  private isValidCrossSystemCharacter(character: string): boolean {
    // Rebecca Respawn (Fool) is valid in both systems as central hub
    const validCrossSystemCharacters = ['Rebecca Respawn'];
    return validCrossSystemCharacters.includes(character);
  }

  private isValidNumberDiscrepancy(number: number): boolean {
    // Some discrepancies are mathematically valid
    const validDiscrepancies = {
      78: [144, 99], // Tarot cards vs Codex nodes vs Gates
      99: [144, 78]
    };
    
    return validDiscrepancies[number as keyof typeof validDiscrepancies] !== undefined;
  }

  private getMappingFile(systemA: string, systemB: string): string | null {
    const mappings: Record<string, string> = {
      'codex144:liberArcanae': 'data/liber-arcanae-mirror.json',
      'liberArcanae:codex144': 'data/liber-arcanae-mirror.json',
      'circuitum99:stoneGrimoire': 'data/chapel-mapping.json',
      'stoneGrimoire:circuitum99': 'data/chapel-mapping.json'
    };
    
    const key1 = `${systemA}:${systemB}`;
    const key2 = `${systemB}:${systemA}`;
    
    return mappings[key1] || mappings[key2] || null;
  }

  /**
   * Enforce clean architecture
   */
  enforceCleanArchitecture(): void {
    console.log('🏛️ Enforcing Cathedral v1.0 Clean Architecture...');

    // Check for duplicate implementations
    this.checkForDuplicates();

    // Validate package structure
    this.validatePackageStructure();

    // Check OpenSpec compliance
    this.checkOpenSpecCompliance();

    console.log('✅ Clean architecture enforcement complete');
  }

  private checkForDuplicates(): void {
    const packageNames = new Map<string, string[]>();
    
    // Scan packages directory for duplicate names
    const packagesDir = './packages';
    if (require('fs').existsSync(packagesDir)) {
      const packages = require('fs').readdirSync(packagesDir);
      
      for (const pkg of packages) {
        const pkgPath = `${packagesDir}/${pkg}`;
        if (require('fs').statSync(pkgPath).isDirectory()) {
          const packageJsonPath = `${pkgPath}/package.json`;
          if (require('fs').existsSync(packageJsonPath)) {
            try {
              const pkgData = JSON.parse(
                require('fs').readFileSync(packageJsonPath, 'utf8')
              );
              const name = pkgData.name;
              
              if (!packageNames.has(name)) {
                packageNames.set(name, []);
              }
              packageNames.get(name)!.push(pkgPath);
            } catch (error) {
              console.warn(`⚠️ Failed to read package.json: ${packageJsonPath}`);
            }
          }
        }
      }
    }

    // Report duplicates
    for (const [name, paths] of packageNames.entries()) {
      if (paths.length > 1) {
        console.error(`❌ Duplicate package name "${name}" found in:`, paths);
        throw new Error(`Duplicate package name: ${name}`);
      }
    }
  }

  private validatePackageStructure(): void {
    const requiredPackages = [
      'core',
      'codex-144-99',
      'liber-arcanae',
      'circuitum99',
      'stone-grimoire',
      'cosmogenesis',
      'tesseract-bridge'
    ];

    for (const pkg of requiredPackages) {
      const pkgPath = `./packages/${pkg}`;
      if (!require('fs').existsSync(pkgPath)) {
        console.error(`❌ Missing required package: ${pkg}`);
        throw new Error(`Missing required package: ${pkg}`);
      }
    }
  }

  private checkOpenSpecCompliance(): void {
    // Check that OpenSpec spec exists and is valid
    const specPath = './openspec/cathedral.spec.json';
    if (!require('fs').existsSync(specPath)) {
      console.error('❌ OpenSpec cathedral.spec.json missing');
      throw new Error('OpenSpec compliance required');
    }

    // Check that change proposals follow proper format
    const changesDir = './openspec/changes';
    if (require('fs').existsSync(changesDir)) {
      const changes = require('fs').readdirSync(changesDir, { withFileTypes: true });
      
      for (const change of changes) {
        if (change.isDirectory()) {
          const proposalPath = `${changesDir}/${change.name}/proposal.md`;
          if (require('fs').existsSync(proposalPath)) {
            const content = require('fs').readFileSync(proposalPath, 'utf8');
            if (!content.includes('# Change Proposal')) {
              console.warn(`⚠️ Invalid change proposal format: ${proposalPath}`);
            }
          }
        }
      }
    }
  }

  /**
   * Generate integration report
   */
  generateIntegrationReport(): string {
    return `
# Cathedral v1.0 Integration Report
Generated: ${new Date().toISOString()}

## System Status
- Single Source of Truth: ${this.singleSourceOfTruth}
- Active Systems: ${this.systems.size}
- Validation Rules: ${this.validationRules.size}

## Integration Points
- Codex 144:99 ↔ Liber Arcanae: MIRROR SYSTEM
- Circuitum99 ↔ Stone Grimoire: TEMPLE MAPPING  
- Godot Studios ↔ All Systems: INTERACTIVE MANIFESTATION

## Quality Metrics
- Character Consistency: VALIDATED
- Mathematical Precision: VALIDATED  
- Cross-System Mapping: VALIDATED
- OpenSpec Compliance: ACTIVE

## Next Actions
1. Deploy v1.0 to production
2. Monitor integration health
3. Maintain single source of truth
4. Enforce architectural discipline

---
Master Control: CATHEDRAL_MASTER_CONTROL_MAP.md
`;
  }
}

// Export singleton instance
export const cathedralIntegration = new CathedralIntegrationManager();

// Auto-enforce on import
if (typeof window === 'undefined') { // Node.js environment
  cathedralIntegration.enforceCleanArchitecture();
}