import * as THREE from 'three';

/**
 * 3D Vector interface
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D Vector interface
 */
export interface Vector2D {
  x: number;
  y: number;
}

/**
 * 3x3 Matrix interface
 */
export interface Matrix3D {
  m11: number; m12: number; m13: number;
  m21: number; m22: number; m23: number;
  m31: number; m32: number; m33: number;
}

/**
 * 4x4 Matrix interface
 */
export interface Matrix4D {
  m11: number; m12: number; m13: number; m14: number;
  m21: number; m22: number; m23: number; m24: number;
  m31: number; m32: number; m33: number; m34: number;
  m41: number; m42: number; m43: number; m44: number;
}

/**
 * 3D Bounding box
 */
export interface BoundingBox3D {
  min: Vector3D;
  max: Vector3D;
}

/**
 * 3D Bounding sphere
 */
export interface BoundingSphere3D {
  center: Vector3D;
  radius: number;
}

/**
 * Geometric primitive types
 */
export type GeometricPrimitive =
  | 'point'
  | 'line'
  | 'triangle'
  | 'quad'
  | 'polygon'
  | 'circle'
  | 'sphere'
  | 'cube'
  | 'cylinder'
  | 'cone'
  | 'torus'
  | 'plane';

/**
 * Sacred geometry types
 */
export type SacredGeometryType =
  | 'platonic'
  | 'archimedean'
  | 'flower-of-life'
  | 'metatron-cube'
  | 'sri-yantra'
  | 'merkaba'
  | 'kabbalah-tree'
  | 'chakra-system'
  | 'golden-spiral'
  | 'fibonacci-sequence';

/**
 * Fractal types
 */
export type FractalType =
  | 'mandelbrot'
  | 'julia'
  | 'sierpinski'
  | 'koch'
  | 'dragon'
  | 'burning-ship'
  | 'newton'
  | 'lyapunov'
  | 'barnsley-fern'
  | 'cantor-dust';

/**
 * Curve types
 */
export type CurveType =
  | 'line'
  | 'bezier'
  | 'catmull-rom'
  | 'bspline'
  | 'nurbs'
  | 'hermite'
  | 'cardinal'
  | 'linear'
  | 'quadratic'
  | 'cubic';

/**
 * Surface types
 */
export type SurfaceType =
  | 'plane'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'torus'
  | 'bezier-surface'
  | 'nurbs-surface'
  | 'heightmap'
  | 'parametric'
  | 'implicit';

/**
 * Mesh topology types
 */
export type MeshTopology =
  | 'triangle-list'
  | 'triangle-strip'
  | 'line-list'
  | 'line-strip'
  | 'point-list';

/**
 * Vertex attribute types
 */
export type VertexAttributeType =
  | 'position'
  | 'normal'
  | 'tangent'
  | 'bitangent'
  | 'texcoord'
  | 'color'
  | 'bone-indices'
  | 'bone-weights'
  | 'custom';

/**
 * Geometry data structure
 */
export interface GeometryData {
  vertices: Vector3D[];
  normals?: Vector3D[];
  tangents?: Vector3D[];
  bitangents?: Vector3D[];
  texCoords?: Vector2D[];
  colors?: Vector3D[];
  indices?: number[];
  topology: MeshTopology;
}

/**
 * Vertex buffer layout
 */
export interface VertexBufferLayout {
  attributes: {
    type: VertexAttributeType;
    size: number;
    normalized?: boolean;
    stride?: number;
    offset?: number;
  }[];
  vertexSize: number;
}

/**
 * Index buffer configuration
 */
export interface IndexBufferConfig {
  type: 'uint8' | 'uint16' | 'uint32';
  count: number;
  topology: MeshTopology;
}

/**
 * Geometry generation parameters
 */
export interface GeometryGenerationParams {
  primitive: GeometricPrimitive;
  size?: number;
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  segments?: number;
  rings?: number;
  thetaStart?: number;
  thetaLength?: number;
  phiStart?: number;
  phiLength?: number;
  detail?: number;
  subdivisions?: number;
}

/**
 * Sacred geometry generation parameters
 */
export interface SacredGeometryParams {
  type: SacredGeometryType;
  size: number;
  iterations?: number;
  layers?: number;
  goldenRatio?: boolean;
  fibonacci?: boolean;
  symmetry?: number;
  center?: Vector3D;
  rotation?: Vector3D;
  scale?: Vector3D;
}

/**
 * Fractal generation parameters
 */
export interface FractalGenerationParams {
  type: FractalType;
  width: number;
  height: number;
  iterations: number;
  bounds?: { min: Vector2D; max: Vector2D };
  escapeRadius?: number;
  juliaConstant?: { real: number; imag: number };
  colorPalette?: string[];
  smoothColoring?: boolean;
}

/**
 * Curve generation parameters
 */
export interface CurveGenerationParams {
  type: CurveType;
  points: Vector3D[];
  segments?: number;
  tension?: number;
  closed?: boolean;
  alpha?: number;
  degree?: number;
}

/**
 * Surface generation parameters
 */
export interface SurfaceGenerationParams {
  type: SurfaceType;
  uSegments?: number;
  vSegments?: number;
  uSize?: number;
  vSize?: number;
  heightmap?: number[][];
  equation?: string;
  parameters?: { [key: string]: number };
}

/**
 * Mesh optimization settings
 */
export interface MeshOptimizationSettings {
  removeDuplicates?: boolean;
  mergeVertices?: boolean;
  calculateNormals?: boolean;
  calculateTangents?: boolean;
  generateUVs?: boolean;
  weldThreshold?: number;
  decimationTarget?: number;
  simplify?: boolean;
}

/**
 * Geometry analysis results
 */
export interface GeometryAnalysis {
  vertexCount: number;
  triangleCount: number;
  edgeCount: number;
  boundingBox: BoundingBox3D;
  boundingSphere: BoundingSphere3D;
  surfaceArea: number;
  volume: number;
  genus?: number;
  eulerCharacteristic?: number;
  manifold?: boolean;
  watertight?: boolean;
}

/**
 * Intersection test results
 */
export interface IntersectionResult {
  intersects: boolean;
  distance?: number;
  point?: Vector3D;
  normal?: Vector3D;
  barycentric?: Vector3D;
  triangleIndex?: number;
}

/**
 * Ray casting configuration
 */
export interface RaycastConfig {
  origin: Vector3D;
  direction: Vector3D;
  maxDistance?: number;
  cullBackFaces?: boolean;
  testBothSides?: boolean;
}

/**
 * Collision detection configuration
 */
export interface CollisionConfig {
  method: 'aabb' | 'obb' | 'sphere' | 'gjk' | 'sat';
  tolerance?: number;
  maxIterations?: number;
}

/**
 * Mesh subdivision parameters
 */
export interface SubdivisionParams {
  algorithm: 'loop' | 'catmull-clark' | 'sqrt3' | 'butterfly' | 'linear';
  iterations: number;
  preserveNormals?: boolean;
  preserveUVs?: boolean;
  preserveColors?: boolean;
}

/**
 * Procedural generation parameters
 */
export interface ProceduralGenerationParams {
  seed?: number;
  octaves?: number;
  frequency?: number;
  amplitude?: number;
  persistence?: number;
  lacunarity?: number;
  offset?: Vector3D;
  scale?: Vector3D;
}

/**
 * Animation curve types
 */
export type AnimationCurveType =
  | 'linear'
  | 'smooth'
  | 'step'
  | 'bezier'
  | 'hermite'
  | 'catmull-rom'
  | 'cubic-spline';

/**
 * Keyframe interpolation modes
 */
export type KeyframeInterpolation =
  | 'constant'
  | 'linear'
  | 'cubic'
  | 'hermite'
  | 'bezier';

/**
 * Animation track configuration
 */
export interface AnimationTrackConfig {
  target: string;
  property: string;
  curveType: AnimationCurveType;
  interpolation: KeyframeInterpolation;
  preInfinity: 'constant' | 'linear' | 'cycle' | 'cycle-offset' | 'oscillate';
  postInfinity: 'constant' | 'linear' | 'cycle' | 'cycle-offset' | 'oscillate';
}

/**
 * Geometry transformation types
 */
export type TransformationType =
  | 'translate'
  | 'rotate'
  | 'scale'
  | 'shear'
  | 'reflect'
  | 'project'
  | 'warp'
  | 'twist'
  | 'bend'
  | 'taper';

/**
 * Coordinate system types
 */
export type CoordinateSystem =
  | 'cartesian'
  | 'spherical'
  | 'cylindrical'
  | 'polar'
  | 'barycentric'
  | 'homogeneous';

/**
 * Geometry validation results
 */
export interface GeometryValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  degenerateTriangles: number;
  duplicateVertices: number;
  nonManifoldEdges: number;
  boundaryEdges: number;
}

/**
 * Performance metrics for geometry operations
 */
export interface GeometryPerformanceMetrics {
  operationTime: number;
  memoryUsage: number;
  triangleCount: number;
  vertexCount: number;
  drawCalls: number;
  textureMemory: number;
}

/**
 * Export format types
 */
export type ExportFormat =
  | 'obj'
  | 'stl'
  | 'ply'
  | 'gltf'
  | 'glb'
  | 'dae'
  | '3ds'
  | 'fbx'
  | 'json'
  | 'binary';

/**
 * Import configuration
 */
export interface ImportConfig {
  format: ExportFormat;
  mergeVertices?: boolean;
  generateNormals?: boolean;
  generateUVs?: boolean;
  centerGeometry?: boolean;
  scale?: number;
  flipNormals?: boolean;
  flipUVs?: boolean;
}

/**
 * Export configuration
 */
export interface ExportConfig {
  format: ExportFormat;
  includeNormals?: boolean;
  includeUVs?: boolean;
  includeColors?: boolean;
  includeMaterials?: boolean;
  includeAnimations?: boolean;
  compression?: boolean;
  precision?: number;
}

/**
 * Geometry processing pipeline
 */
export interface GeometryProcessingPipeline {
  steps: GeometryProcessingStep[];
  parallel?: boolean;
  cache?: boolean;
  validate?: boolean;
}

/**
 * Individual processing step
 */
export interface GeometryProcessingStep {
  operation: string;
  parameters: { [key: string]: any };
  enabled?: boolean;
  priority?: number;
}

/**
 * Geometry query interface
 */
export interface GeometryQuery {
  type: 'nearest' | 'within-radius' | 'k-nearest' | 'range' | 'intersection';
  parameters: {
    point?: Vector3D;
    radius?: number;
    k?: number;
    bounds?: BoundingBox3D;
    ray?: RaycastConfig;
  };
}

/**
 * Spatial partitioning structures
 */
export interface SpatialStructure {
  type: 'octree' | 'kd-tree' | 'bvh' | 'grid' | 'hash-table';
  maxDepth?: number;
  minCellSize?: number;
  maxObjectsPerCell?: number;
}

/**
 * Level of detail (LOD) configuration
 */
export interface LODConfig {
  distances: number[];
  geometries: THREE.BufferGeometry[];
  hysteresis?: number;
  morphTargets?: boolean;
}

/**
 * Geometry instancing configuration
 */
export interface InstancingConfig {
  count: number;
  positions?: Vector3D[];
  rotations?: Vector3D[];
  scales?: Vector3D[];
  colors?: Vector3D[];
  customAttributes?: Map<string, number[]>;
}

/**
 * Procedural mesh generation
 */
export interface ProceduralMeshConfig {
  generator: 'noise' | 'voronoi' | 'delaunay' | 'poisson-disk' | 'marching-cubes' | 'dual-contouring';
  resolution: Vector3D;
  bounds: BoundingBox3D;
  parameters: { [key: string]: any };
  smoothing?: boolean;
  simplification?: number;
}

/**
 * Mesh repair configuration
 */
export interface MeshRepairConfig {
  removeDegenerates?: boolean;
  fillHoles?: boolean;
  fixNormals?: boolean;
  weldVertices?: boolean;
  removeIsolatedVertices?: boolean;
  fixManifold?: boolean;
  tolerance?: number;
}

/**
 * UV mapping configuration
 */
export interface UVMappingConfig {
  method: 'spherical' | 'cylindrical' | 'planar' | 'cubic' | 'lightmap' | 'smart';
  scale?: Vector2D;
  offset?: Vector2D;
  rotation?: number;
  projectionCenter?: Vector3D;
  projectionDirection?: Vector3D;
}

/**
 * Normal calculation configuration
 */
export interface NormalCalculationConfig {
  method: 'average' | 'angle-weighted' | 'area-weighted' | 'custom';
  creaseAngle?: number;
  smoothGroups?: boolean;
  hardEdges?: number[];
}

/**
 * Tangent space calculation configuration
 */
export interface TangentSpaceConfig {
  method: 'mikktspace' | 'nvidia' | 'amd' | 'custom';
  includeBitangents?: boolean;
  orthogonalize?: boolean;
  regenerateUVs?: boolean;
}

/**
 * Geometry serialization interface
 */
export interface GeometrySerialization {
  exportGeometry(geometry: THREE.BufferGeometry, config: ExportConfig): string | ArrayBuffer;
  importGeometry(data: string | ArrayBuffer, config: ImportConfig): THREE.BufferGeometry;
  exportScene(scene: THREE.Scene, config: ExportConfig): string | ArrayBuffer;
  importScene(data: string | ArrayBuffer, config: ImportConfig): THREE.Scene;
}

/**
 * Geometry compression configuration
 */
export interface GeometryCompressionConfig {
  method: 'draco' | 'meshopt' | 'quantization' | 'deduplication';
  quality?: number;
  quantizationBits?: number;
  compressionLevel?: number;
  preserveTopology?: boolean;
}

/**
 * Batch processing configuration
 */
export interface BatchProcessingConfig {
  inputFiles: string[];
  outputDirectory: string;
  operations: GeometryProcessingStep[];
  parallel: boolean;
  maxConcurrency?: number;
  progressCallback?: (progress: number) => void;
}

/**
 * Real-time geometry modification
 */
export interface RuntimeGeometryConfig {
  dynamicVertices?: boolean;
  dynamicNormals?: boolean;
  dynamicUVs?: boolean;
  updateFrequency?: number;
  morphTargets?: boolean;
  skinning?: boolean;
}

/**
 * Geometry debugging configuration
 */
export interface GeometryDebugConfig {
  showWireframe?: boolean;
  showNormals?: boolean;
  showTangents?: boolean;
  showBoundingBox?: boolean;
  showBoundingSphere?: boolean;
  normalLength?: number;
  tangentLength?: number;
}

/**
 * Performance monitoring configuration
 */
export interface GeometryPerformanceConfig {
  enableMetrics?: boolean;
  trackMemoryUsage?: boolean;
  trackDrawCalls?: boolean;
  trackTriangleCount?: boolean;
  logSlowOperations?: boolean;
  performanceThreshold?: number;
}

// All types and interfaces are already exported above
