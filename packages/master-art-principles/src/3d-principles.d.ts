/**
 * 3d-principles
 *
 * @package @cathedral/master-art-principles
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate 3D rendering principles
 *
 * Creative use: 3D apps, visual apps, game apps, art apps
 */
/**
 * 3D Master Art Principles
 *
 * Principles for beautiful 3D environments and animations
 */
import * as THREE from 'three';
export interface CameraSettings {
    position: {
        x: number;
        y: number;
        z: number;
    };
    target: {
        x: number;
        y: number;
        z: number;
    };
    fov: number;
    near: number;
    far: number;
}
export interface LightingSettings {
    ambient: {
        color: number;
        intensity: number;
    };
    directional: {
        color: number;
        intensity: number;
        position: {
            x: number;
            y: number;
            z: number;
        };
    };
    point: {
        color: number;
        intensity: number;
        position: {
            x: number;
            y: number;
            z: number;
        };
        distance: number;
    }[];
}
/**
 * Golden Ratio Camera Setup
 *
 * Camera positioned using golden ratio for natural beauty
 */
export declare function goldenCamera(sceneSize: number, height?: number): CameraSettings;
/**
 * Master Art Lighting
 *
 * Lighting based on classical painting techniques
 */
export declare function masterLighting(sceneSize?: number): LightingSettings;
/**
 * Create Golden Ratio Scene
 */
export declare function createGoldenScene(renderer: THREE.WebGLRenderer, width: number, height: number): {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    lighting: LightingSettings;
};
/**
 * Create Sacred Geometry Mesh
 */
export declare function createSacredGeometryMesh(type: 'vesica' | 'pentagram' | 'octagon' | 'spiral', size?: number): THREE.BufferGeometry;
/**
 * Golden Ratio Animation Easing
 *
 * Smooth, natural animation curves
 */
export declare function goldenEasing(t: number): number;
/**
 * Create Fluid Animation
 *
 * Smooth, flowing animation based on golden ratio
 */
export declare function createFluidAnimation(duration: number | undefined, callback: (progress: number) => void): {
    start: () => void;
    stop: () => void;
};
//# sourceMappingURL=3d-principles.d.ts.map