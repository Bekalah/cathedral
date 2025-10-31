import * as THREE from 'three';

/**
 * Vector3D - 3D vector interface
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Matrix3D - 3x3 matrix interface
 */
export interface Matrix3D {
  m11: number; m12: number; m13: number;
  m21: number; m22: number; m23: number;
  m31: number; m32: number; m33: number;
}

/**
 * BoundingBox3D - 3D bounding box
 */
export interface BoundingBox3D {
  min: Vector3D;
  max: Vector3D;
}

/**
 * GeometryUtils - Utility functions for 3D geometry and mathematics
 */
export class GeometryUtils {
  private static readonly EPSILON = 1e-10;

  /**
   * Vector operations
   */
  static vector = {
    /**
     * Add two vectors
     */
    add: (a: Vector3D, b: Vector3D): Vector3D => ({
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    }),

    /**
     * Subtract two vectors
     */
    subtract: (a: Vector3D, b: Vector3D): Vector3D => ({
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z
    }),

    /**
     * Multiply vector by scalar
     */
    multiply: (v: Vector3D, scalar: number): Vector3D => ({
      x: v.x * scalar,
      y: v.y * scalar,
      z: v.z * scalar
    }),

    /**
     * Divide vector by scalar
     */
    divide: (v: Vector3D, scalar: number): Vector3D => ({
      x: v.x / scalar,
      y: v.y / scalar,
      z: v.z / scalar
    }),

    /**
     * Calculate dot product
     */
    dot: (a: Vector3D, b: Vector3D): number =>
      a.x * b.x + a.y * b.y + a.z * b.z,

    /**
     * Calculate cross product
     */
    cross: (a: Vector3D, b: Vector3D): Vector3D => ({
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    }),

    /**
     * Calculate vector magnitude
     */
    magnitude: (v: Vector3D): number =>
      Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z),

    /**
     * Calculate vector magnitude squared
     */
    magnitudeSquared: (v: Vector3D): number =>
      v.x * v.x + v.y * v.y + v.z * v.z,

    /**
     * Normalize vector
     */
    normalize: (v: Vector3D): Vector3D => {
      const mag = this.vector.magnitude(v);
      if (mag < this.EPSILON) return { x: 0, y: 0, z: 0 };
      return this.vector.divide(v, mag);
    },

    /**
     * Calculate distance between two points
     */
    distance: (a: Vector3D, b: Vector3D): number =>
      this.vector.magnitude(this.vector.subtract(a, b)),

    /**
     * Linear interpolation between two vectors
     */
    lerp: (a: Vector3D, b: Vector3D, t: number): Vector3D => ({
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t
    }),

    /**
     * Convert THREE.Vector3 to Vector3D
     */
    fromThree: (v: THREE.Vector3): Vector3D => ({ x: v.x, y: v.y, z: v.z }),

    /**
     * Convert Vector3D to THREE.Vector3
     */
    toThree: (v: Vector3D): THREE.Vector3 => new THREE.Vector3(v.x, v.y, v.z)
  };

  /**
   * Matrix operations
   */
  static matrix = {
    /**
     * Create identity matrix
     */
    identity: (): Matrix3D => ({
      m11: 1, m12: 0, m13: 0,
      m21: 0, m22: 1, m23: 0,
      m31: 0, m32: 0, m33: 1
    }),

    /**
     * Multiply two matrices
     */
    multiply: (a: Matrix3D, b: Matrix3D): Matrix3D => ({
      m11: a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31,
      m12: a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32,
      m13: a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33,
      m21: a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31,
      m22: a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32,
      m23: a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33,
      m31: a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31,
      m32: a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32,
      m33: a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33
    }),

    /**
     * Create rotation matrix around X axis
     */
    rotationX: (angle: number): Matrix3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        m11: 1, m12: 0, m13: 0,
        m21: 0, m22: cos, m23: -sin,
        m31: 0, m32: sin, m33: cos
      };
    },

    /**
     * Create rotation matrix around Y axis
     */
    rotationY: (angle: number): Matrix3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        m11: cos, m12: 0, m13: sin,
        m21: 0, m22: 1, m23: 0,
        m31: -sin, m32: 0, m33: cos
      };
    },

    /**
     * Create rotation matrix around Z axis
     */
    rotationZ: (angle: number): Matrix3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        m11: cos, m12: -sin, m13: 0,
        m21: sin, m22: cos, m23: 0,
        m31: 0, m32: 0, m33: 1
      };
    }
  };

  /**
   * Geometric calculations
   */
  static geometry = {
    /**
     * Calculate centroid of points
     */
    centroid: (points: Vector3D[]): Vector3D => {
      const sum = points.reduce(
        (acc, p) => this.vector.add(acc, p),
        { x: 0, y: 0, z: 0 }
      );
      return this.vector.divide(sum, points.length);
    },

    /**
     * Calculate bounding box
     */
    boundingBox: (points: Vector3D[]): BoundingBox3D => {
      let min = { ...points[0] };
      let max = { ...points[0] };

      points.forEach(point => {
        min.x = Math.min(min.x, point.x);
        min.y = Math.min(min.y, point.y);
        min.z = Math.min(min.z, point.z);

        max.x = Math.max(max.x, point.x);
        max.y = Math.max(max.y, point.y);
        max.z = Math.max(max.z, point.z);
      });

      return { min, max };
    },

    /**
     * Calculate bounding sphere
     */
    boundingSphere: (points: Vector3D[]): { center: Vector3D; radius: number } => {
      const center = this.geometry.centroid(points);
      let radius = 0;

      points.forEach(point => {
        const distance = this.vector.distance(center, point);
        radius = Math.max(radius, distance);
      });

      return { center, radius };
    },

    /**
     * Check if point is inside triangle
     */
    pointInTriangle: (point: Vector3D, v1: Vector3D, v2: Vector3D, v3: Vector3D): boolean => {
      // Barycentric coordinate method
      const v1v2 = this.vector.subtract(v2, v1);
      const v1v3 = this.vector.subtract(v3, v1);
      const v1p = this.vector.subtract(point, v1);

      const d00 = this.vector.dot(v1v2, v1v2);
      const d01 = this.vector.dot(v1v2, v1v3);
      const d11 = this.vector.dot(v1v3, v1v3);
      const d20 = this.vector.dot(v1p, v1v2);
      const d21 = this.vector.dot(v1p, v1v3);

      const denom = d00 * d11 - d01 * d01;
      if (Math.abs(denom) < this.EPSILON) return false;

      const v = (d11 * d20 - d01 * d21) / denom;
      const w = (d00 * d21 - d01 * d20) / denom;
      const u = 1 - v - w;

      return u >= 0 && v >= 0 && w >= 0 && u <= 1 && v <= 1 && w <= 1;
    },

    /**
     * Calculate triangle area
     */
    triangleArea: (v1: Vector3D, v2: Vector3D, v3: Vector3D): number => {
      const a = this.vector.distance(v1, v2);
      const b = this.vector.distance(v2, v3);
      const c = this.vector.distance(v3, v1);

      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    },

    /**
     * Calculate mesh volume
     */
    meshVolume: (vertices: Vector3D[], faces: [number, number, number][]): number => {
      let volume = 0;

      faces.forEach(face => {
        const v1 = vertices[face[0]];
        const v2 = vertices[face[1]];
        const v3 = vertices[face[2]];

        // Scalar triple product
        const cross = this.vector.cross(
          this.vector.subtract(v2, v1),
          this.vector.subtract(v3, v1)
        );

        volume += this.vector.dot(v1, cross);
      });

      return Math.abs(volume) / 6;
    },

    /**
     * Calculate mesh surface area
     */
    meshSurfaceArea: (vertices: Vector3D[], faces: [number, number, number][]): number => {
      let area = 0;

      faces.forEach(face => {
        const v1 = vertices[face[0]];
        const v2 = vertices[face[1]];
        const v3 = vertices[face[2]];

        area += this.geometry.triangleArea(v1, v2, v3);
      });

      return area;
    }
  };

  /**
   * Transformation utilities
   */
  static transform = {
    /**
     * Apply matrix transformation to vector
     */
    applyMatrix: (v: Vector3D, matrix: Matrix3D): Vector3D => ({
      x: v.x * matrix.m11 + v.y * matrix.m12 + v.z * matrix.m13,
      y: v.x * matrix.m21 + v.y * matrix.m22 + v.z * matrix.m23,
      z: v.x * matrix.m31 + v.y * matrix.m32 + v.z * matrix.m33
    }),

    /**
     * Create transformation matrix from position, rotation, scale
     */
    createTRSMatrix: (position: Vector3D, rotation: Vector3D, scale: Vector3D): Matrix3D => {
      // Combine translation, rotation, and scale matrices
      const translation = {
        m11: 1, m12: 0, m13: position.x,
        m21: 0, m22: 1, m23: position.y,
        m31: 0, m32: 0, m33: 1
      };

      const rotationX = this.matrix.rotationX(rotation.x);
      const rotationY = this.matrix.rotationY(rotation.y);
      const rotationZ = this.matrix.rotationZ(rotation.z);

      const combinedRotation = this.matrix.multiply(
        this.matrix.multiply(rotationX, rotationY),
        rotationZ
      );

      const scaling = {
        m11: scale.x, m12: 0, m13: 0,
        m21: 0, m22: scale.y, m23: 0,
        m31: 0, m32: 0, m33: scale.z
      };

      // T * R * S
      return this.matrix.multiply(
        this.matrix.multiply(translation, combinedRotation),
        scaling
      );
    },

    /**
     * Apply transformation to array of vertices
     */
    transformVertices: (vertices: Vector3D[], matrix: Matrix3D): Vector3D[] =>
      vertices.map(v => this.transform.applyMatrix(v, matrix))
  };

  /**
   * Intersection calculations
   */
  static intersection = {
    /**
     * Check if ray intersects triangle
     */
    rayTriangle: (rayOrigin: Vector3D, rayDirection: Vector3D, v1: Vector3D, v2: Vector3D, v3: Vector3D): {
      intersects: boolean;
      distance?: number;
      point?: Vector3D;
      barycentric?: Vector3D;
    } => {
      const edge1 = this.vector.subtract(v2, v1);
      const edge2 = this.vector.subtract(v3, v1);

      const h = this.vector.cross(rayDirection, edge2);
      const a = this.vector.dot(edge1, h);

      if (Math.abs(a) < this.EPSILON) {
        return { intersects: false };
      }

      const f = 1.0 / a;
      const s = this.vector.subtract(rayOrigin, v1);
      const u = f * this.vector.dot(s, h);

      if (u < 0.0 || u > 1.0) {
        return { intersects: false };
      }

      const q = this.vector.cross(s, edge1);
      const v = f * this.vector.dot(rayDirection, q);

      if (v < 0.0 || u + v > 1.0) {
        return { intersects: false };
      }

      const t = f * this.vector.dot(edge2, q);

      if (t > this.EPSILON) {
        const point = this.vector.add(rayOrigin, this.vector.multiply(rayDirection, t));
        const barycentric = { x: 1 - u - v, y: u, z: v };

        return {
          intersects: true,
          distance: t,
          point,
          barycentric
        };
      }

      return { intersects: false };
    },

    /**
     * Check if two bounding boxes intersect
     */
    boundingBoxes: (box1: BoundingBox3D, box2: BoundingBox3D): boolean => {
      return !(box1.max.x < box2.min.x || box1.min.x > box2.max.x ||
               box1.max.y < box2.min.y || box1.min.y > box2.max.y ||
               box1.max.z < box2.min.z || box1.min.z > box2.max.z);
    },

    /**
     * Check if point is inside bounding box
     */
    pointInBoundingBox: (point: Vector3D, box: BoundingBox3D): boolean => {
      return point.x >= box.min.x && point.x <= box.max.x &&
             point.y >= box.min.y && point.y <= box.max.y &&
             point.z >= box.min.z && point.z <= box.max.z;
    }
  };

  /**
   * Mathematical utilities
   */
  static math = {
    /**
     * Clamp value between min and max
     */
    clamp: (value: number, min: number, max: number): number =>
      Math.min(Math.max(value, min), max),

    /**
     * Linear interpolation
     */
    lerp: (a: number, b: number, t: number): number =>
      a + (b - a) * t,

    /**
     * Smooth interpolation (smoothstep)
     */
    smoothstep: (edge0: number, edge1: number, x: number): number => {
      const t = this.math.clamp((x - edge0) / (edge1 - edge0), 0, 1);
      return t * t * (3 - 2 * t);
    },

    /**
     * Map value from one range to another
     */
    map: (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number =>
      toMin + (value - fromMin) * (toMax - toMin) / (fromMax - fromMin),

    /**
     * Calculate factorial
     */
    factorial: (n: number): number => {
      if (n <= 1) return 1;
      return n * this.math.factorial(n - 1);
    },

    /**
     * Calculate binomial coefficient (n choose k)
     */
    binomial: (n: number, k: number): number => {
      if (k > n) return 0;
      if (k === 0 || k === n) return 1;

      let result = 1;
      for (let i = 1; i <= k; i++) {
        result = result * (n - i + 1) / i;
      }
      return result;
    },

    /**
     * Solve quadratic equation
     */
    quadratic: (a: number, b: number, c: number): { solutions: number[]; discriminant: number } => {
      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) {
        return { solutions: [], discriminant };
      }

      if (Math.abs(discriminant) < this.EPSILON) {
        return { solutions: [-b / (2 * a)], discriminant };
      }

      const sqrtDisc = Math.sqrt(discriminant);
      return {
        solutions: [
          (-b - sqrtDisc) / (2 * a),
          (-b + sqrtDisc) / (2 * a)
        ],
        discriminant
      };
    }
  };

  /**
   * Curve and surface utilities
   */
  static curves = {
    /**
     * Generate bezier curve points
     */
    bezier: (points: Vector3D[], segments: number = 100): Vector3D[] => {
      const curve: Vector3D[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        curve.push(this.curves.bezierPoint(points, t));
      }

      return curve;
    },

    /**
     * Calculate point on bezier curve
     */
    bezierPoint: (points: Vector3D[], t: number): Vector3D => {
      if (points.length === 1) return points[0];

      const newPoints: Vector3D[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        newPoints.push(this.vector.lerp(points[i], points[i + 1], t));
      }

      return this.curves.bezierPoint(newPoints, t);
    },

    /**
     * Generate catmull-rom spline points
     */
    catmullRom: (points: Vector3D[], segments: number = 100, alpha: number = 0.5): Vector3D[] => {
      if (points.length < 4) return points;

      const curve: Vector3D[] = [];

      for (let i = 0; i < points.length - 3; i++) {
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          curve.push(this.curves.catmullRomPoint(points[i], points[i + 1], points[i + 2], points[i + 3], t, alpha));
        }
      }

      return curve;
    },

    /**
     * Calculate point on catmull-rom spline
     */
    catmullRomPoint: (p0: Vector3D, p1: Vector3D, p2: Vector3D, p3: Vector3D, t: number, alpha: number): Vector3D => {
      const t2 = t * t;
      const t3 = t2 * t;

      const q1 = -alpha * t + 2 * alpha * t2 - alpha * t3;
      const q2 = 1 + (alpha - 3) * t2 + (2 - alpha) * t3;
      const q3 = alpha * t + (3 - 2 * alpha) * t2 + (alpha - 2) * t3;
      const q4 = -alpha * t2 + alpha * t3;

      return {
        x: 0.5 * (p0.x * q1 + p1.x * q2 + p2.x * q3 + p3.x * q4),
        y: 0.5 * (p0.y * q1 + p1.y * q2 + p2.y * q3 + p3.y * q4),
        z: 0.5 * (p0.z * q1 + p1.z * q2 + p2.z * q3 + p3.z * q4)
      };
    }
  };

  /**
   * Coordinate system conversions
   */
  static coordinates = {
    /**
     * Convert cartesian to spherical coordinates
     */
    cartesianToSpherical: (v: Vector3D): { radius: number; theta: number; phi: number } => {
      const radius = this.vector.magnitude(v);
      const theta = Math.atan2(v.z, v.x);
      const phi = Math.acos(this.math.clamp(v.y / radius, -1, 1));

      return { radius, theta, phi };
    },

    /**
     * Convert spherical to cartesian coordinates
     */
    sphericalToCartesian: (radius: number, theta: number, phi: number): Vector3D => ({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    }),

    /**
     * Convert cartesian to cylindrical coordinates
     */
    cartesianToCylindrical: (v: Vector3D): { radius: number; theta: number; y: number } => {
      const radius = Math.sqrt(v.x * v.x + v.z * v.z);
      const theta = Math.atan2(v.z, v.x);
      return { radius, theta, y: v.y };
    },

    /**
     * Convert cylindrical to cartesian coordinates
     */
    cylindricalToCartesian: (radius: number, theta: number, y: number): Vector3D => ({
      x: radius * Math.cos(theta),
      y: y,
      z: radius * Math.sin(theta)
    })
  };

  /**
   * Fractal and procedural generation
   */
  static procedural = {
    /**
     * Generate fractal noise
     */
    fractalNoise: (x: number, y: number, z: number, octaves: number = 4, persistence: number = 0.5): number => {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;

      for (let i = 0; i < octaves; i++) {
        value += this.procedural.noise(x * frequency, y * frequency, z * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }

      return value / maxValue;
    },

    /**
     * Simple 3D noise function
     */
    noise: (x: number, y: number, z: number): number => {
      // Simple hash-based noise
      const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453;
      return (n - Math.floor(n)) * 2 - 1;
    },

    /**
     * Generate heightmap using fractal noise
     */
    generateHeightmap: (width: number, height: number, scale: number = 1.0, octaves: number = 4): number[][] => {
      const heightmap: number[][] = [];

      for (let y = 0; y < height; y++) {
        heightmap[y] = [];
        for (let x = 0; x < width; x++) {
          const nx = (x / width - 0.5) * scale;
          const ny = (y / height - 0.5) * scale;
          heightmap[y][x] = this.procedural.fractalNoise(nx, ny, 0, octaves);
        }
      }

      return heightmap;
    }
  };

  /**
   * Utility functions for THREE.js integration
   */
  static three = {
    /**
     * Convert geometry vertices to Vector3D array
     */
    geometryToVertices: (geometry: THREE.BufferGeometry): Vector3D[] => {
      const positions = geometry.attributes.position;
      const vertices: Vector3D[] = [];

      for (let i = 0; i < positions.count; i++) {
        vertices.push({
          x: positions.getX(i),
          y: positions.getY(i),
          z: positions.getZ(i)
        });
      }

      return vertices;
    },

    /**
     * Create THREE.js geometry from vertices
     */
    verticesToGeometry: (vertices: Vector3D[]): THREE.BufferGeometry => {
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];

      vertices.forEach(v => {
        positions.push(v.x, v.y, v.z);
      });

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      return geometry;
    },

    /**
     * Calculate geometry properties
     */
    geometryProperties: (geometry: THREE.BufferGeometry): {
      vertexCount: number;
      boundingBox: THREE.Box3;
      boundingSphere: THREE.Sphere;
    } => {
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();

      return {
        vertexCount: geometry.attributes.position?.count || 0,
        boundingBox: geometry.boundingBox!,
        boundingSphere: geometry.boundingSphere!
      };
    }
  };
}

export default GeometryUtils;
