import * as THREE from 'three';

/**
 * ShaderConfig - Configuration for shader creation
 */
export interface ShaderConfig {
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: { [key: string]: THREE.IUniform };
  defines?: { [key: string]: string };
  precision?: 'lowp' | 'mediump' | 'highp';
}

/**
 * ShaderLibrary - Collection of pre-built shaders
 */
export interface ShaderLibrary {
  vertex: { [name: string]: string };
  fragment: { [name: string]: string };
}

/**
 * ShaderCompilationResult - Result of shader compilation
 */
export interface ShaderCompilationResult {
  success: boolean;
  shader?: THREE.Shader;
  error?: string;
  warnings?: string[];
}

/**
 * ShaderUtils - Utility functions for shader management and creation
 */
export class ShaderUtils {
  private static shaderLibrary: ShaderLibrary = {
    vertex: {},
    fragment: {}
  };

  private static shaderCache: Map<string, THREE.ShaderMaterial> = new Map();

  /**
   * Register shader in library
   */
  static registerShader(type: 'vertex' | 'fragment', name: string, source: string): void {
    this.shaderLibrary[type][name] = source;
  }

  /**
   * Get shader from library
   */
  static getShader(type: 'vertex' | 'fragment', name: string): string | null {
    return this.shaderLibrary[type][name] || null;
  }

  /**
   * Create shader material from config
   */
  static createShaderMaterial(config: ShaderConfig): THREE.ShaderMaterial {
    const cacheKey = this.generateCacheKey(config);

    // Check cache first
    if (this.shaderCache.has(cacheKey)) {
      return this.shaderCache.get(cacheKey)!;
    }

    const vertexShader = config.vertexShader || this.getDefaultVertexShader();
    const fragmentShader = config.fragmentShader || this.getDefaultFragmentShader();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: config.uniforms || {},
      defines: config.defines || {},
      transparent: true,
      side: THREE.DoubleSide
    });

    // Cache the material
    this.shaderCache.set(cacheKey, material);
    return material;
  }

  /**
   * Create shader material from library shaders
   */
  static createShaderMaterialFromLibrary(vertexName: string, fragmentName: string, overrides: Partial<ShaderConfig> = {}): THREE.ShaderMaterial {
    const vertexShader = this.getShader('vertex', vertexName);
    const fragmentShader = this.getShader('fragment', fragmentName);

    if (!vertexShader || !fragmentShader) {
      throw new Error(`Shaders not found: vertex=${vertexName}, fragment=${fragmentName}`);
    }

    return this.createShaderMaterial({
      vertexShader,
      fragmentShader,
      ...overrides
    });
  }

  /**
   * Compile shader with error checking
   */
  static compileShader(gl: WebGLRenderingContext, source: string, type: number): ShaderCompilationResult {
    const shader = gl.createShader(type);

    if (!shader) {
      return { success: false, error: 'Failed to create shader' };
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    const errorLog = gl.getShaderInfoLog(shader);

    if (success) {
      return {
        success: true,
        shader: shader as THREE.Shader,
        warnings: errorLog ? [errorLog] : []
      };
    } else {
      gl.deleteShader(shader);
      return {
        success: false,
        error: errorLog || 'Unknown compilation error'
      };
    }
  }

  /**
   * Create shader program
   */
  static createShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): {
    success: boolean;
    program?: WebGLProgram;
    error?: string;
  } {
    const vertexResult = this.compileShader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragmentResult = this.compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

    if (!vertexResult.success || !fragmentResult.success) {
      return {
        success: false,
        error: `Vertex: ${vertexResult.error}, Fragment: ${fragmentResult.error}`
      };
    }

    const program = gl.createProgram();
    if (!program) {
      return { success: false, error: 'Failed to create program' };
    }

    gl.attachShader(program, vertexResult.shader!);
    gl.attachShader(program, fragmentResult.shader!);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    const errorLog = gl.getProgramInfoLog(program);

    if (success) {
      // Clean up shaders
      gl.deleteShader(vertexResult.shader!);
      gl.deleteShader(fragmentResult.shader!);

      return { success: true, program };
    } else {
      gl.deleteProgram(program);
      return {
        success: false,
        error: errorLog || 'Unknown linking error'
      };
    }
  }

  /**
   * Generate cache key for shader config
   */
  private static generateCacheKey(config: ShaderConfig): string {
    const key = JSON.stringify({
      vertex: config.vertexShader?.substring(0, 100),
      fragment: config.fragmentShader?.substring(0, 100),
      uniforms: Object.keys(config.uniforms || {}),
      defines: config.defines
    });

    return btoa(key).substring(0, 32);
  }

  /**
   * Get default vertex shader
   */
  private static getDefaultVertexShader(): string {
    return `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
  }

  /**
   * Get default fragment shader
   */
  private static getDefaultFragmentShader(): string {
    return `
      uniform vec3 color;
      uniform float opacity;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        gl_FragColor = vec4(color, opacity * fresnel);
      }
    `;
  }

  /**
   * Create mystical energy shader
   */
  static createEnergyShader(color: THREE.Color = new THREE.Color(0x88ccff), intensity: number = 1.0): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;
      uniform float intensity;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Noise function
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);

        // Create energy pattern
        float pattern = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time * 0.7);
        pattern = (pattern + 1.0) * 0.5;

        // Add some turbulence
        float turbulence = noise(vPosition * 2.0 + time * 0.5) * 0.3;

        float alpha = fresnel * pattern * turbulence * intensity;
        vec3 finalColor = baseColor * (0.5 + pattern * 0.5);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: color },
        intensity: { value: intensity }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }

  /**
   * Create holographic shader
   */
  static createHolographicShader(baseColor: THREE.Color = new THREE.Color(0x00ffff), distortion: number = 0.1): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;
      uniform float distortion;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Noise function for distortion
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      // HSV to RGB conversion
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        // Create holographic scanlines
        float scanlines = sin(vUv.y * 50.0 + time * 2.0) * 0.5 + 0.5;

        // Add distortion
        vec2 distortedUv = vUv + vec2(
          noise(vPosition + time * 0.5) * distortion,
          noise(vPosition + time * 0.3) * distortion
        );

        // Create rainbow effect
        float hue = (distortedUv.x + distortedUv.y) * 0.5 + time * 0.1;
        vec3 holoColor = hsv2rgb(vec3(hue, 0.8, 1.0));

        float alpha = fresnel * scanlines * 0.5;
        vec3 finalColor = mix(baseColor, holoColor, fresnel * 0.5);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: baseColor },
        distortion: { value: distortion }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }

  /**
   * Create fractal noise shader
   */
  static createFractalNoiseShader(scale: number = 1.0, octaves: number = 4): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform float scale;
      uniform int octaves;

      varying vec3 vPosition;
      varying vec2 vUv;

      // Fractal noise functions
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;

        for (int i = 0; i < 8; i++) {
          if (i >= octaves) break;
          value += amplitude * noise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }

        return value;
      }

      void main() {
        vec2 p = vUv * scale + time * 0.1;
        float n = fbm(p);

        // Create mystical color palette
        vec3 color = vec3(0.5 + 0.5 * sin(n * 3.14159 + time),
                         0.5 + 0.5 * sin(n * 3.14159 * 2.0 + time * 1.3),
                         0.5 + 0.5 * sin(n * 3.14159 * 3.0 + time * 0.7));

        gl_FragColor = vec4(color, n * 0.8);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        scale: { value: scale },
        octaves: { value: octaves }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }

  /**
   * Create sacred geometry shader
   */
  static createSacredGeometryShader(color: THREE.Color = new THREE.Color(0xffd700)): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Golden ratio and sacred geometry constants
      #define PHI 1.618033988749
      #define TAU 6.28318530718

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        // Create sacred geometry patterns
        float pattern1 = sin(vUv.x * PHI * 10.0 + time) * cos(vUv.y * PHI * 10.0 + time * PHI);
        float pattern2 = sin(length(vUv - 0.5) * 20.0 + time) * 0.5 + 0.5;

        pattern1 = (pattern1 + 1.0) * 0.5;
        float combined = pattern1 * pattern2;

        // Add mystical glow
        float glow = pow(combined, 3.0) * fresnel;

        vec3 finalColor = baseColor * (0.3 + glow * 0.7);
        float alpha = glow * 0.8;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: color }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }

  /**
   * Create particle shader for advanced effects
   */
  static createParticleShader(): THREE.ShaderMaterial {
    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      attribute float alpha;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vAlpha = alpha;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Create circular particles with soft edges
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);

        if (dist > 0.5) discard;

        float alpha = (0.5 - dist) * 2.0;
        alpha = pow(alpha, 2.0);

        gl_FragColor = vec4(vColor, alpha * vAlpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {},
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }

  /**
   * Create wireframe shader with mystical effects
   */
  static createWireframeShader(color: THREE.Color = new THREE.Color(0x88ccff), thickness: number = 0.01): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;
      uniform float thickness;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        // Create animated wireframe pattern
        float wireframe = step(0.5 - thickness, fract(vUv.x * 10.0 + time)) *
                         step(0.5 - thickness, fract(vUv.y * 10.0 + time * 0.7));

        // Add mystical pulsing
        float pulse = sin(time * 2.0) * 0.3 + 0.7;

        vec3 finalColor = baseColor * pulse;
        float alpha = wireframe * 0.8;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: color },
        thickness: { value: thickness }
      },
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false
    });
  }

  /**
   * Create distortion shader for mystical effects
   */
  static createDistortionShader(intensity: number = 0.1): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform float intensity;
      uniform sampler2D texture1;

      varying vec3 vPosition;
      varying vec2 vUv;

      // Noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 distortedUv = vUv;

        // Apply wave distortion
        distortedUv.x += sin(vUv.y * 10.0 + time * 2.0) * intensity * 0.01;
        distortedUv.y += cos(vUv.x * 10.0 + time * 1.5) * intensity * 0.01;

        // Add noise distortion
        vec2 noiseUv = vUv * 5.0 + time * 0.5;
        distortedUv += (noise(noiseUv) - 0.5) * intensity * 0.02;

        vec4 color = texture2D(texture1, distortedUv);

        // Add mystical glow
        float glow = sin(time + length(vUv - 0.5) * 20.0) * 0.5 + 0.5;
        color.rgb += glow * intensity * 0.1;

        gl_FragColor = color;
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        intensity: { value: intensity },
        texture1: { value: null }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }

  /**
   * Update shader uniforms
   */
  static updateShaderUniforms(material: THREE.ShaderMaterial, uniforms: { [key: string]: any }): void {
    Object.keys(uniforms).forEach(key => {
      if (material.uniforms[key]) {
        material.uniforms[key].value = uniforms[key];
      }
    });
  }

  /**
   * Animate shader over time
   */
  static animateShader(material: THREE.ShaderMaterial, deltaTime: number): void {
    if (material.uniforms.time) {
      material.uniforms.time.value += deltaTime;
    }
  }

  /**
   * Clear shader cache
   */
  static clearCache(): void {
    this.shaderCache.clear();
  }

  /**
   * Get cache size
   */
  static getCacheSize(): number {
    return this.shaderCache.size;
  }

  /**
   * Preload common shaders
   */
  static preloadCommonShaders(): void {
    // Register common vertex shaders
    this.registerShader('vertex', 'basic', this.getDefaultVertexShader());
    this.registerShader('vertex', 'particle', `
      attribute float size;
      attribute vec3 color;
      attribute float alpha;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vAlpha = alpha;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `);

    // Register common fragment shaders
    this.registerShader('fragment', 'basic', this.getDefaultFragmentShader());
    this.registerShader('fragment', 'energy', `
      uniform float time;
      uniform vec3 baseColor;
      uniform float intensity;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);

        float pattern = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time * 0.7);
        pattern = (pattern + 1.0) * 0.5;

        float turbulence = noise(vPosition * 2.0 + time * 0.5) * 0.3;
        float alpha = fresnel * pattern * turbulence * intensity;

        vec3 finalColor = baseColor * (0.5 + pattern * 0.5);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `);

    this.registerShader('fragment', 'holographic', `
      uniform float time;
      uniform vec3 baseColor;
      uniform float distortion;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        float scanlines = sin(vUv.y * 50.0 + time * 2.0) * 0.5 + 0.5;

        vec2 distortedUv = vUv + vec2(
          noise(vPosition + time * 0.5) * distortion,
          noise(vPosition + time * 0.3) * distortion
        );

        float hue = (distortedUv.x + distortedUv.y) * 0.5 + time * 0.1;
        vec3 holoColor = hsv2rgb(vec3(hue, 0.8, 1.0));

        float alpha = fresnel * scanlines * 0.5;
        vec3 finalColor = mix(baseColor, holoColor, fresnel * 0.5);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `);
  }
}

export default ShaderUtils;
