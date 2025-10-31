/**
 * ModRegistry - Non-destructive modding system for Cathedral of Circuits
 * Maintains canonical story integrity while allowing generative creativity
 */

import { EventEmitter } from 'events';

export interface ModMetadata {
  modId: string;
  displayName: string;
  author: string;
  version: string;
  description: string;
  tarotCard: string;
  canonicalStory: CanonicalStory;
  bundleMeta?: BundleMetadata;
  permissions: {
    allowModdersToExtend: boolean;
    allowReuseOfAssets: boolean;
  };
  provenance: {
    sourceRepo?: string;
    license: string;
  };
}

export interface CanonicalStory {
  storyId: string;
  title: string;
  loreText: string;
  author: string;
  hash: string;
  immutable: boolean;
  editPolicy: {
    canEdit: string[];
    requireApproval: boolean;
  };
  versions: Array<{
    versionId: string;
    timestamp: string;
    hash: string;
    text: string;
    approvedBy?: string;
    bundleId?: string;
  }>;
}

export interface BundleMetadata {
  bundleId: string;
  parentStoryId?: string;
  parentStoryHash?: string;
  proposedStoryDelta?: string;
  status: 'proposed' | 'staged' | 'consecrated' | 'forked';
  author: string;
  approvals: Array<{
    user: string;
    role: string;
    time: string;
    decision: string;
  }>;
  forkOf?: string;
  permissions: {
    allowReuse: boolean;
  };
  provenance: {
    prompt?: string;
    seed: number;
    model: string;
    lora?: string;
    timestamp: string;
    hash: string;
  };
}

export interface StoryProposal {
  proposalId: string;
  parentStoryId: string;
  proposedText: string;
  actorId: string;
  bundleId: string;
  status: 'pending' | 'approved' | 'rejected' | 'applied';
  approvals: Array<{
    user: string;
    time: string;
  }>;
  timestamp: string;
}

export class ModRegistry extends EventEmitter {
  private mods: Map<string, ModMetadata> = new Map();
  private enabledMods: Map<string, boolean> = new Map();
  private ledger: Array<any> = [];
  private proposals: Map<string, StoryProposal> = new Map();
  private ledgerPath: string = 'user://mod_ledger.json';
  private proposalsPath: string = 'user://story_proposals.json';

  constructor() {
    super();
    this.loadLedger();
    this.loadProposals();
  }

  /**
   * Register a new character mod
   */
  registerCharacter(modId: string, meta: ModMetadata): void {
    // Validate required fields
    if (!meta.canonicalStory || !meta.tarotCard) {
      throw new Error(`Invalid mod metadata for ${modId}: missing canonical story or tarot card`);
    }

    this.mods.set(modId, meta);
    this.enabledMods.set(modId, false);

    this.recordLedger({
      action: 'register',
      modId: modId,
      timestamp: new Date().toISOString(),
      meta: meta
    });

    this.emit('modRegistered', modId, meta);
  }

  /**
   * Enable a mod for use in the cathedral
   */
  enableMod(modId: string): boolean {
    const mod = this.mods.get(modId);
    if (!mod) return false;

    if (this.enabledMods.get(modId)) return true;

    // Perform compatibility checks
    if (!this.validateModCompatibility(mod)) {
      throw new Error(`Mod ${modId} is not compatible with current cathedral version`);
    }

    this.enabledMods.set(modId, true);

    this.recordLedger({
      action: 'enable',
      modId: modId,
      timestamp: new Date().toISOString()
    });

    this.emit('modEnabled', modId);
    return true;
  }

  /**
   * Disable a mod
   */
  disableMod(modId: string): boolean {
    if (!this.enabledMods.get(modId)) return true;

    this.enabledMods.set(modId, false);

    this.recordLedger({
      action: 'disable',
      modId: modId,
      timestamp: new Date().toISOString()
    });

    this.emit('modDisabled', modId);
    return true;
  }

  /**
   * Remove a mod completely
   */
  removeMod(modId: string): boolean {
    if (!this.mods.has(modId)) return false;

    this.mods.delete(modId);
    this.enabledMods.delete(modId);

    this.recordLedger({
      action: 'remove',
      modId: modId,
      timestamp: new Date().toISOString()
    });

    this.emit('modRemoved', modId);
    return true;
  }

  /**
   * Get all registered mods
   */
  listMods(): Array<{ modId: string; meta: ModMetadata; enabled: boolean }> {
    const result: Array<{ modId: string; meta: ModMetadata; enabled: boolean }> = [];

    for (const [modId, meta] of this.mods) {
      result.push({
        modId,
        meta,
        enabled: this.enabledMods.get(modId) || false
      });
    }

    return result;
  }

  /**
   * Get specific mod metadata
   */
  getMod(modId: string): ModMetadata | undefined {
    return this.mods.get(modId);
  }

  /**
   * Create a story proposal for canonical story changes
   */
  createStoryProposal(
    parentStoryId: string,
    proposedText: string,
    actorId: string,
    bundleId: string
  ): StoryProposal {
    const proposal: StoryProposal = {
      proposalId: `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      parentStoryId,
      proposedText,
      actorId,
      bundleId,
      status: 'pending',
      approvals: [],
      timestamp: new Date().toISOString()
    };

    this.proposals.set(proposal.proposalId, proposal);
    this.saveProposals();

    this.recordLedger({
      action: 'story_proposal_created',
      proposalId: proposal.proposalId,
      parentStoryId,
      actorId,
      timestamp: new Date().toISOString()
    });

    this.emit('storyProposalCreated', proposal);
    return proposal;
  }

  /**
   * Approve a story proposal
   */
  approveStoryProposal(proposalId: string, approverId: string): boolean {
    const proposal = this.proposals.get(proposalId);
    if (!proposal || proposal.status !== 'pending') return false;

    proposal.approvals.push({
      user: approverId,
      time: new Date().toISOString()
    });

    // Check if approval threshold is met
    const parentStory = this.findStoryById(proposal.parentStoryId);
    if (parentStory && this.checkApprovalThreshold(proposal, parentStory)) {
      proposal.status = 'approved';
      this.applyStoryProposal(proposal, approverId);
    }

    this.saveProposals();

    this.recordLedger({
      action: 'story_proposal_approved',
      proposalId,
      approverId,
      timestamp: new Date().toISOString()
    });

    this.emit('storyProposalApproved', proposal);
    return true;
  }

  /**
   * Apply an approved story proposal to create new canonical version
   */
  private applyStoryProposal(proposal: StoryProposal, finalApproverId: string): void {
    const parentStory = this.findStoryById(proposal.parentStoryId);
    if (!parentStory) return;

    // Create new version
    const newVersion = {
      versionId: `v${parentStory.versions.length + 1}`,
      timestamp: new Date().toISOString(),
      hash: this.hashString(proposal.proposedText + Date.now().toString()),
      text: proposal.proposedText,
      approvedBy: finalApproverId,
      bundleId: proposal.bundleId
    };

    parentStory.versions.push(newVersion);
    parentStory.hash = newVersion.hash;

    this.recordLedger({
      action: 'story_version_created',
      storyId: proposal.parentStoryId,
      versionId: newVersion.versionId,
      approvedBy: finalApproverId,
      bundleId: proposal.bundleId,
      timestamp: new Date().toISOString()
    });

    this.emit('storyVersionCreated', parentStory, newVersion);
  }

  /**
   * Check if proposal has sufficient approvals
   */
  private checkApprovalThreshold(proposal: StoryProposal, story: CanonicalStory): boolean {
    if (!story.editPolicy.requireApproval) return true;

    const authorApproval = proposal.approvals.some(a => a.user === story.author);
    if (authorApproval) return true;

    // Count unique approvers by role
    const approversByRole = new Map<string, Set<string>>();
    proposal.approvals.forEach(approval => {
      if (!approversByRole.has(approval.user)) {
        approversByRole.set(approval.user, new Set());
      }
      // In a real implementation, you'd check user roles
      approversByRole.get(approval.user)!.add('curator');
    });

    // Require at least 2 curator approvals for non-author changes
    const curatorCount = Array.from(approversByRole.values())
      .filter(roles => roles.has('curator')).length;

    return curatorCount >= 2;
  }

  /**
   * Find story by ID across all mods
   */
  private findStoryById(storyId: string): CanonicalStory | undefined {
    for (const mod of this.mods.values()) {
      if (mod.canonicalStory.storyId === storyId) {
        return mod.canonicalStory;
      }
    }
    return undefined;
  }

  /**
   * Validate mod compatibility
   */
  private validateModCompatibility(mod: ModMetadata): boolean {
    // Check version compatibility
    if (mod.compat?.gameVersion) {
      const currentVersion = 'circuitum99-1.4'; // This would come from your game config
      if (mod.compat.gameVersion !== currentVersion) {
        return false;
      }
    }

    // Check for conflicting mod IDs
    if (this.hasConflictingMod(mod.modId)) {
      return false;
    }

    return true;
  }

  /**
   * Check for conflicting mods
   */
  private hasConflictingMod(modId: string): boolean {
    // Check for mods that might conflict
    const conflicts: Record<string, string[]> = {
      'luxcrux/ann_abyss.v1': ['other/ann_abyss.*'],
      'bekalah/magician.v1': ['other/magician.*']
    };

    const conflictingPatterns = conflicts[modId] || [];
    for (const pattern of conflictingPatterns) {
      for (const existingModId of this.mods.keys()) {
        if (this.matchesPattern(existingModId, pattern)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Simple pattern matching for conflicts
   */
  private matchesPattern(modId: string, pattern: string): boolean {
    const regex = new RegExp(pattern.replace('*', '.*'));
    return regex.test(modId);
  }

  /**
   * Record action in ledger
   */
  private recordLedger(entry: any): void {
    this.ledger.push(entry);
    this.saveLedger();
  }

  /**
   * Save ledger to disk
   */
  private saveLedger(): void {
    // In a real implementation, this would save to a file
    // For now, we'll just keep it in memory
  }

  /**
   * Load ledger from disk
   */
  private loadLedger(): void {
    // In a real implementation, this would load from a file
    this.ledger = [];
  }

  /**
   * Save proposals to disk
   */
  private saveProposals(): void {
    // In a real implementation, this would save to a file
  }

  /**
   * Load proposals from disk
   */
  private loadProposals(): void {
    // In a real implementation, this would load from a file
    this.proposals.clear();
  }

  /**
   * Simple hash function for content
   */
  private hashString(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Get all story proposals
   */
  getStoryProposals(): StoryProposal[] {
    return Array.from(this.proposals.values());
  }

  /**
   * Get proposals for specific story
   */
  getProposalsForStory(storyId: string): StoryProposal[] {
    return Array.from(this.proposals.values())
      .filter(p => p.parentStoryId === storyId);
  }

  /**
   * Get ledger entries
   */
  getLedger(): any[] {
    return [...this.ledger];
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.removeAllListeners();
    this.saveLedger();
    this.saveProposals();
  }
}

export default ModRegistry;
