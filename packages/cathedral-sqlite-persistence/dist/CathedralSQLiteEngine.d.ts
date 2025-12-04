/**
 * Cathedral SQLite Persistence Engine
 *
 * Robust SQLite database integration for the Cathedral Professional Design Suite
 * with Node.js v25 support, featuring automatic saving, transaction handling,
 * and crash recovery mechanisms to prevent data loss.
 *
 * Features:
 * - Persistent design project storage
 * - Auto-save with transaction integrity
 * - Crash recovery and data validation
 * - Professional-grade data consistency
 * - Real-time collaboration data sync
 * - Sacred geometry and design element persistence
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 * @license CC0 - Your Original Work
 */
import { EventEmitter } from 'events';
import * as z from 'zod';
export declare const DesignElementSchema: any;
export declare const WorkspaceSchema: any;
export declare const VersionSchema: any;
export declare const CollaborationSessionSchema: any;
export type DesignElement = z.infer<typeof DesignElementSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Version = z.infer<typeof VersionSchema>;
export type CollaborationSession = z.infer<typeof CollaborationSessionSchema>;
export declare class CathedralSQLiteEngine extends EventEmitter {
    private db;
    private autoSaveTimers;
    private transactionQueue;
    private isProcessingTransactions;
    private backupInterval;
    private dataDirectory;
    constructor(dbPath?: string);
    /**
     * Setup database schema and indexes
     */
    private setupDatabase;
    private createTables;
    private createIndexes;
    private createTriggers;
    /**
     * Initialize auto-save system
     */
    private initializeAutoSave;
    /**
     * Initialize backup system
     */
    private initializeBackupSystem;
    /**
     * Create a new workspace
     */
    createWorkspace(workspace: Omit<Workspace, 'created_at' | 'updated_at'>): Promise<string>;
    /**
     * Save design element with transaction
     */
    saveDesignElement(element: Omit<DesignElement, 'created_at' | 'updated_at'>): Promise<void>;
    /**
     * Auto-save functionality
     */
    private isAutoSaveEnabled;
    private queueAutoSave;
    private processTransactionQueue;
    private performAutoSave;
    /**
     * Get all design elements for a workspace
     */
    getDesignElements(workspaceId: string): DesignElement[];
    /**
     * Get workspace by ID
     */
    getWorkspace(id: string): Workspace | null;
    /**
     * Create version/backup
     */
    createVersion(workspaceId: string, label: string, description?: string, createdBy?: string): Promise<string>;
    /**
     * Validate data integrity
     */
    private validateDataIntegrity;
    /**
     * Calculate quality score for elements
     */
    private calculateQualityScore;
    /**
     * Recovery from crash
     */
    recoverFromCrash(workspaceId: string): Promise<{
        recovered: boolean;
        lastCheckpoint?: any;
        elements?: DesignElement[];
    }>;
    /**
     * Create database backup
     */
    createBackup(): void;
    /**
     * Get auto-save history for workspace
     */
    getAutoSaveHistory(workspaceId: string, limit?: number): any[];
    /**
     * Cleanup old auto-save history
     */
    cleanupOldAutoSaves(olderThanDays?: number): void;
    /**
     * Graceful shutdown
     */
    shutdown(): void;
    /**
     * Get database statistics
     */
    getStats(): any;
    private getDatabaseSize;
}
export declare const cathedralSQLiteEngine: CathedralSQLiteEngine;
export default cathedralSQLiteEngine;
