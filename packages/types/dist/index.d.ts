/**
 * @cathedral/types
 * Shared TypeScript type definitions for Cathedral monorepo
 */
export interface CathedralNode {
    id: string;
    name: string;
    type: 'arcana' | 'angel' | 'demon' | 'sacred-geometry' | 'codex';
    metadata?: Record<string, unknown>;
}
export interface SacredGeometry {
    id: string;
    pattern: 'flower-of-life' | 'metatrons-cube' | 'vesica-piscis' | 'golden-spiral';
    dimensions: number;
    coordinates?: number[][];
}
export interface ArcanaCard {
    id: string;
    number: number;
    name: string;
    divineAspect?: string;
    shadowAspect?: string;
    harmonyForm?: string;
    keywords: string[];
    upright: string[];
    reversed: string[];
}
export interface CodexEntry {
    node: number;
    title: string;
    description: string;
    connections: number[];
    sources?: string[];
}
export interface BuildConfig {
    target: string;
    minify: boolean;
    sourcemap: boolean;
}
export interface PackageMetadata {
    name: string;
    version: string;
    role: string;
    features: string[];
}
export type * from './arcana';
export type * from './codex';
//# sourceMappingURL=index.d.ts.map