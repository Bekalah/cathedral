import * as THREE from 'three';

/**
 * MysticalMaterials - Advanced material system for esoteric rendering
 */
export class MysticalMaterials {
  private materials: Map<string, THREE.Material> = new Map();

  /**
   * Create mystical aura material with energy field effects
   */
  createAuraMaterial(config: AuraConfig): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color;
      uniform float intensity;
      uniform float opacity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        float alpha = fresnel * pulse * opacity * intensity;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(config.color || 0x00ffff) },
        intensity: { value: config.intensity || 1.0 },
        opacity: { value: config.opacity || 0.3 }
      },
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Create sacred geometry material with golden ratio patterns
   */
  createSacredGeometryMaterial(): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.1,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
  }

  /**
   * Create crystal material with refractive properties
   */
  createCrystalMaterial(color: THREE.Color = new THREE.Color(0x88ccff)): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.9,
      thickness: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
      ior: 1.5
    });
  }

  /**
   * Create energy field material with animated patterns
   */
  createEnergyFieldMaterial(): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;

      varying vec2 vUv;
      varying vec3 vPosition;

      // Noise function
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      void main() {
        vec3 pos = vPosition * 0.5;
        float n = noise(pos + time * 0.5);

        float wave = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time * 0.7) * 0.5 + 0.5;
        float pattern = n * wave;

        vec3 color = mix(color1, color2, pattern);
        float alpha = pattern * 0.6;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0066ff) },
        color2: { value: new THREE.Color(0xff6600) }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Create holographic material with rainbow effects
   */
  createHolographicMaterial(): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;

      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);

        float hue = fresnel + time * 0.1;
        vec3 color = hsv2rgb(vec3(hue, 0.8, 1.0));

        gl_FragColor = vec4(color, fresnel * 0.5);
      }
    `;

    // HSV to RGB conversion function
    const hsv2rgb = `
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: hsv2rgb + fragmentShader,
      uniforms: {
        time: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }

  /**
   * Create mystical smoke/fog material
   */
  createMysticalSmokeMaterial(): THREE.ShaderMaterial {
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
      uniform vec3 color;

      varying vec3 vPosition;
      varying vec2 vUv;

      // Simple noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        float n1 = noise(vUv * 5.0 + time * 0.3);
        float n2 = noise(vUv * 7.0 - time * 0.2);
        float pattern = n1 * n2;

        float alpha = pattern * 0.3;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x888888) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Update animated materials
   */
  update(deltaTime: number): void {
    this.materials.forEach((material, name) => {
      if (material instanceof THREE.ShaderMaterial && material.uniforms.time) {
        material.uniforms.time.value += deltaTime;
      }
    });
  }

  /**
   * Get material by name
   */
  getMaterial(name: string): THREE.Material | undefined {
    return this.materials.get(name);
  }

  /**
   * Store material for updates
   */
  registerMaterial(name: string, material: THREE.Material): void {
    this.materials.set(name, material);
  }
}

// Configuration interfaces
export interface AuraConfig {
  color?: THREE.Color | string | number;
  opacity?: number;
  intensity?: number;
  radius?: number;
  segments?: number;
}
