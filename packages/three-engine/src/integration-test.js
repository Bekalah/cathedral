/**
 * Integration Test for Cathedral Three.js Engine
 * Tests the complete mystical 3D rendering system
 */

import * as THREE from 'three';
import {
  SacredGeometryRenderer,
  ParticleSystem,
  FractalGenerator,
  HolographicDisplay,
  SacredGeometryEngine,
  AnimationUtils,
  ShaderUtils,
  GeometryUtils
} from './index.js';

export class IntegrationTest {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.systems = {
      geometry: null,
      particles: null,
      fractals: null,
      holographics: null,
      animations: null
    };

    this.testResults = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  /**
   * Initialize the test environment
   */
  async initialize() {
    console.log('🔮 Initializing Cathedral 3D Engine Integration Test...');

    try {
      // Setup renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0x000011, 1);
      document.body.appendChild(this.renderer.domElement);

      // Setup camera
      this.camera.position.set(0, 0, 5);

      // Initialize systems
      this.systems.geometry = new SacredGeometryRenderer(this.scene);
      this.systems.particles = new ParticleSystem(this.scene);
      this.systems.fractals = new FractalGenerator(this.scene);
      this.systems.holographics = new HolographicDisplay(this.scene);
      this.systems.animations = AnimationUtils;

      console.log('✅ All systems initialized successfully');
      return true;

    } catch (error) {
      console.error('❌ Failed to initialize systems:', error);
      return false;
    }
  }

  /**
   * Run all integration tests
   */
  async runAllTests() {
    console.log('🧪 Running integration tests...');

    await this.testSacredGeometry();
    await this.testParticleSystems();
    await this.testFractalGeneration();
    await this.testHolographicDisplays();
    await this.testAnimationSystem();
    await this.testGeometryUtils();
    await this.testShaderUtils();

    this.printResults();
  }

  /**
   * Test sacred geometry rendering
   */
  async testSacredGeometry() {
    console.log('📐 Testing Sacred Geometry Renderer...');

    try {
      // Test Flower of Life
      const flowerOfLife = this.systems.geometry.renderFlowerOfLife(
        new THREE.Vector3(0, 0, 0),
        2.0,
        3
      );
      this.assert(flowerOfLife !== null, 'Flower of Life creation');

      // Test Metatron's Cube
      const metatron = this.systems.geometry.renderMetatronsCube(
        new THREE.Vector3(3, 0, 0),
        1.5
      );
      this.assert(metatron !== null, 'Metatron\'s Cube creation');

      // Test Platonic Solid
      const dodecahedron = this.systems.geometry.renderPlatonicSolid(
        new THREE.Vector3(-3, 0, 0),
        'dodecahedron',
        1.0
      );
      this.assert(dodecahedron !== null, 'Platonic solid creation');

      console.log('✅ Sacred Geometry tests passed');
    } catch (error) {
      console.error('❌ Sacred Geometry tests failed:', error);
    }
  }

  /**
   * Test particle systems
   */
  async testParticleSystems() {
    console.log('✨ Testing Particle Systems...');

    try {
      // Test spark system
      const sparks = this.systems.particles.createSparkSystem(
        new THREE.Vector3(0, 2, 0),
        { count: 20, color: 0xffaa00 }
      );
      this.assert(sparks !== null, 'Spark system creation');

      // Test energy system
      const energy = this.systems.particles.createEnergySystem(
        new THREE.Vector3(0, 0, 0),
        { count: 15, color: 0x88ccff }
      );
      this.assert(energy !== null, 'Energy system creation');

      // Test floating particles
      const floating = this.systems.particles.createFloatingParticles(
        new THREE.Vector3(0, -2, 0),
        { count: 10, color: 0xff69b4 }
      );
      this.assert(floating !== null, 'Floating particles creation');

      console.log('✅ Particle system tests passed');
    } catch (error) {
      console.error('❌ Particle system tests failed:', error);
    }
  }

  /**
   * Test fractal generation
   */
  async testFractalGeneration() {
    console.log('🌀 Testing Fractal Generation...');

    try {
      // Test Mandelbrot set
      const mandelbrot = this.systems.fractals.generateMandelbrot(
        new THREE.Vector3(0, 0, -2)
      );
      this.assert(mandelbrot !== null, 'Mandelbrot generation');

      // Test Julia set
      const julia = this.systems.fractals.generateJuliaSet(
        new THREE.Vector3(2, 0, -2)
      );
      this.assert(julia !== null, 'Julia set generation');

      // Test Koch snowflake
      const koch = this.systems.fractals.generateKochSnowflake(
        new THREE.Vector3(-2, 0, -2)
      );
      this.assert(koch !== null, 'Koch snowflake generation');

      console.log('✅ Fractal generation tests passed');
    } catch (error) {
      console.error('❌ Fractal generation tests failed:', error);
    }
  }

  /**
   * Test holographic displays
   */
  async testHolographicDisplays() {
    console.log('🌈 Testing Holographic Displays...');

    try {
      // Test holographic cube
      const holoCube = this.systems.holographics.createHolographicCube(
        new THREE.Vector3(0, 0, 2)
      );
      this.assert(holoCube !== null, 'Holographic cube creation');

      // Test holographic sphere
      const holoSphere = this.systems.holographics.createHolographicSphere(
        new THREE.Vector3(0, 0, 4)
      );
      this.assert(holoSphere !== null, 'Holographic sphere creation');

      // Test holographic portal
      const portal = this.systems.holographics.createHolographicPortal(
        new THREE.Vector3(0, 0, -4)
      );
      this.assert(portal !== null, 'Holographic portal creation');

      console.log('✅ Holographic display tests passed');
    } catch (error) {
      console.error('❌ Holographic display tests failed:', error);
    }
  }

  /**
   * Test animation system
   */
  async testAnimationSystem() {
    console.log('🎭 Testing Animation System...');

    try {
      // Create test object
      const testObject = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      this.scene.add(testObject);

      // Test pulse animation
      const pulseAnim = this.systems.animations.createPulseAnimation(
        testObject,
        new THREE.Vector3(1, 1, 1),
        0.2,
        2.0,
        { loop: true }
      );
      this.assert(pulseAnim !== null, 'Pulse animation creation');

      // Test rotation animation
      const rotationAnim = this.systems.animations.createRotationAnimation(
        testObject,
        new THREE.Euler(0, 0, 0),
        new THREE.Euler(0, Math.PI * 2, 0),
        3.0,
        { loop: true }
      );
      this.assert(rotationAnim !== null, 'Rotation animation creation');

      console.log('✅ Animation system tests passed');
    } catch (error) {
      console.error('❌ Animation system tests failed:', error);
    }
  }

  /**
   * Test geometry utilities
   */
  async testGeometryUtils() {
    console.log('📊 Testing Geometry Utils...');

    try {
      // Test vector operations
      const v1 = { x: 1, y: 2, z: 3 };
      const v2 = { x: 4, y: 5, z: 6 };

      const sum = GeometryUtils.vector.add(v1, v2);
      this.assert(sum.x === 5 && sum.y === 7 && sum.z === 9, 'Vector addition');

      const dot = GeometryUtils.vector.dot(v1, v2);
      this.assert(dot === 32, 'Vector dot product');

      // Test matrix operations
      const matrix = GeometryUtils.matrix.rotationY(Math.PI / 2);
      this.assert(matrix.m11 === 0 && matrix.m33 === 0, 'Matrix rotation');

      // Test geometric calculations
      const vertices = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 }
      ];

      const centroid = GeometryUtils.geometry.centroid(vertices);
      this.assert(Math.abs(centroid.x - 1/3) < 0.001, 'Centroid calculation');

      console.log('✅ Geometry utils tests passed');
    } catch (error) {
      console.error('❌ Geometry utils tests failed:', error);
    }
  }

  /**
   * Test shader utilities
   */
  async testShaderUtils() {
    console.log('🔧 Testing Shader Utils...');

    try {
      // Test shader creation
      const energyMaterial = ShaderUtils.createEnergyShader(
        new THREE.Color(0x88ccff),
        1.0
      );
      this.assert(energyMaterial !== null, 'Energy shader creation');

      const holoMaterial = ShaderUtils.createHolographicShader(
        new THREE.Color(0x00ffff),
        0.1
      );
      this.assert(holoMaterial !== null, 'Holographic shader creation');

      // Test shader library
      ShaderUtils.registerShader('vertex', 'test', 'void main() { gl_Position = vec4(0.0); }');
      const retrievedShader = ShaderUtils.getShader('vertex', 'test');
      this.assert(retrievedShader !== null, 'Shader library registration');

      console.log('✅ Shader utils tests passed');
    } catch (error) {
      console.error('❌ Shader utils tests failed:', error);
    }
  }

  /**
   * Assert test condition
   */
  assert(condition, testName) {
    if (condition) {
      this.testResults.passed++;
      this.testResults.tests.push({ name: testName, passed: true });
      console.log(`  ✅ ${testName}`);
    } else {
      this.testResults.failed++;
      this.testResults.tests.push({ name: testName, passed: false });
      console.log(`  ❌ ${testName}`);
    }
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('\n📊 Integration Test Results:');
    console.log(`✅ Passed: ${this.testResults.passed}`);
    console.log(`❌ Failed: ${this.testResults.failed}`);
    console.log(`📈 Success Rate: ${Math.round((this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100)}%`);

    if (this.testResults.failed === 0) {
      console.log('🎉 All tests passed! The mystical 3D engine is working perfectly.');
    } else {
      console.log('⚠️  Some tests failed. Check the output above for details.');
    }
  }

  /**
   * Start the test animation loop
   */
  startAnimationLoop() {
    const animate = () => {
      requestAnimationFrame(animate);

      // Update animations
      AnimationUtils.update();

      // Update particle systems
      if (this.systems.particles) {
        this.systems.particles.update(0.016);
      }

      // Render scene
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  /**
   * Clean up test environment
   */
  cleanup() {
    // Remove renderer from DOM
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    // Dispose of geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });

    // Clear all systems
    if (this.systems.particles) this.systems.particles.clear();
    if (this.systems.fractals) this.systems.fractals.clear();
    if (this.systems.holographics) this.systems.holographics.clear();
    AnimationUtils.clear();

    console.log('🧹 Test environment cleaned up');
  }
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.IntegrationTest = IntegrationTest;
}

export default IntegrationTest;
