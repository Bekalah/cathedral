import * as THREE from 'three';

/**
 * CathedralLighting - Sophisticated lighting system for mystical scenes
 */
export class CathedralLighting {
  private scene: THREE.Scene;
  private lights: Map<string, THREE.Light> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.setupDefaultLighting();
  }

  /**
   * Set up mystical default lighting
   */
  private setupDefaultLighting(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.addLight('ambient', ambientLight);

    // Main directional light (sun/moon)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    this.addLight('directional', directionalLight);

    // Mystical point lights
    this.addMysticalPointLights();
  }

  /**
   * Add mystical point lights with sacred geometry positioning
   */
  private addMysticalPointLights(): void {
    const colors = [0xff0066, 0x0066ff, 0x66ff00, 0xff6600];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    colors.forEach((color, index) => {
      const pointLight = new THREE.PointLight(color, 0.5, 50);
      const angle = (index / colors.length) * Math.PI * 2;
      const radius = 15 * goldenRatio;

      pointLight.position.set(
        Math.cos(angle) * radius,
        5 + Math.sin(angle * goldenRatio) * 3,
        Math.sin(angle) * radius
      );

      this.addLight(`mystical_${index}`, pointLight);
    });
  }

  /**
   * Add a light to the scene and tracking map
   */
  addLight(name: string, light: THREE.Light): void {
    this.lights.set(name, light);
    this.scene.add(light);
  }

  /**
   * Remove a light from the scene
   */
  removeLight(name: string): void {
    const light = this.lights.get(name);
    if (light) {
      this.scene.remove(light);
      this.lights.delete(name);
    }
  }

  /**
   * Get a light by name
   */
  getLight(name: string): THREE.Light | undefined {
    return this.lights.get(name);
  }

  /**
   * Create mystical spotlight for dramatic effects
   */
  createSpotlight(
    position: THREE.Vector3,
    target: THREE.Vector3,
    color: number = 0xffffff,
    intensity: number = 1
  ): THREE.SpotLight {
    const spotlight = new THREE.SpotLight(color, intensity);
    spotlight.position.copy(position);
    spotlight.target.position.copy(target);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.1;
    spotlight.castShadow = true;

    this.addLight(`spotlight_${Date.now()}`, spotlight);
    return spotlight;
  }

  /**
   * Animate mystical lights with sacred patterns
   */
  update(deltaTime: number): void {
    const time = Date.now() * 0.001;

    // Animate mystical point lights
    this.lights.forEach((light, name) => {
      if (name.startsWith('mystical_')) {
        const index = parseInt(name.split('_')[1]);
        const pointLight = light as THREE.PointLight;

        if (pointLight.position) {
          const radius = 15 * (1 + Math.sqrt(5)) / 2;
          const angle = time * 0.5 + (index * Math.PI * 2) / 4;

          pointLight.position.x = Math.cos(angle) * radius;
          pointLight.position.z = Math.sin(angle) * radius;
          pointLight.position.y = 5 + Math.sin(time + index) * 3;
        }
      }
    });
  }
}
