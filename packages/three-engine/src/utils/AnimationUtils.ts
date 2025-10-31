import * as THREE from 'three';

/**
 * AnimationConfig - Configuration for animations
 */
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
  loop?: boolean;
  yoyo?: boolean;
  repeat?: number;
}

/**
 * Keyframe - Animation keyframe
 */
export interface Keyframe {
  time: number;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
  color?: THREE.Color;
  opacity?: number;
}

/**
 * AnimationTrack - Track for animating a specific property
 */
export interface AnimationTrack {
  name: string;
  property: string;
  keyframes: Keyframe[];
  interpolation?: 'linear' | 'smooth' | 'step';
}

/**
 * AnimationClip - Complete animation sequence
 */
export interface AnimationClip {
  name: string;
  duration: number;
  tracks: AnimationTrack[];
  config: AnimationConfig;
}

/**
 * AnimationUtils - Utility functions for 3D animations and tweening
 */
export class AnimationUtils {
  private static activeAnimations: Map<string, AnimationInstance> = new Map();
  private static animationClock: THREE.Clock = new THREE.Clock();

  /**
   * Create animation instance
   */
  static createAnimation(target: THREE.Object3D, clip: AnimationClip): AnimationInstance {
    const instance = new AnimationInstance(target, clip);
    this.activeAnimations.set(`${target.uuid}_${clip.name}`, instance);
    return instance;
  }

  /**
   * Play animation by name
   */
  static playAnimation(target: THREE.Object3D, clipName: string): boolean {
    const key = Array.from(this.activeAnimations.keys()).find(k => k.startsWith(target.uuid) && k.endsWith(clipName));
    if (key) {
      const animation = this.activeAnimations.get(key)!;
      animation.play();
      return true;
    }
    return false;
  }

  /**
   * Stop animation by name
   */
  static stopAnimation(target: THREE.Object3D, clipName: string): boolean {
    const key = Array.from(this.activeAnimations.keys()).find(k => k.startsWith(target.uuid) && k.endsWith(clipName));
    if (key) {
      const animation = this.activeAnimations.get(key)!;
      animation.stop();
      return true;
    }
    return false;
  }

  /**
   * Pause animation by name
   */
  static pauseAnimation(target: THREE.Object3D, clipName: string): boolean {
    const key = Array.from(this.activeAnimations.keys()).find(k => k.startsWith(target.uuid) && k.endsWith(clipName));
    if (key) {
      const animation = this.activeAnimations.get(key)!;
      animation.pause();
      return true;
    }
    return false;
  }

  /**
   * Update all active animations
   */
  static update(deltaTime?: number): void {
    const dt = deltaTime || this.animationClock.getDelta();
    const toRemove: string[] = [];

    this.activeAnimations.forEach((animation, key) => {
      if (!animation.update(dt)) {
        toRemove.push(key);
      }
    });

    // Remove completed animations
    toRemove.forEach(key => {
      this.activeAnimations.delete(key);
    });
  }

  /**
   * Clear all animations
   */
  static clear(): void {
    this.activeAnimations.clear();
  }

  /**
   * Get active animation count
   */
  static getActiveCount(): number {
    return this.activeAnimations.size;
  }

  /**
   * Create rotation animation
   */
  static createRotationAnimation(
    target: THREE.Object3D,
    fromRotation: THREE.Euler,
    toRotation: THREE.Euler,
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'rotation',
      duration,
      tracks: [{
        name: 'rotation',
        property: 'rotation',
        keyframes: [
          { time: 0, rotation: fromRotation.clone() },
          { time: duration, rotation: toRotation.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create position animation
   */
  static createPositionAnimation(
    target: THREE.Object3D,
    fromPosition: THREE.Vector3,
    toPosition: THREE.Vector3,
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'position',
      duration,
      tracks: [{
        name: 'position',
        property: 'position',
        keyframes: [
          { time: 0, position: fromPosition.clone() },
          { time: duration, position: toPosition.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create scale animation
   */
  static createScaleAnimation(
    target: THREE.Object3D,
    fromScale: THREE.Vector3,
    toScale: THREE.Vector3,
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'scale',
      duration,
      tracks: [{
        name: 'scale',
        property: 'scale',
        keyframes: [
          { time: 0, scale: fromScale.clone() },
          { time: duration, scale: toScale.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create color animation for materials
   */
  static createColorAnimation(
    material: THREE.Material,
    fromColor: THREE.Color,
    toColor: THREE.Color,
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    // Create a dummy object to animate the material color
    const dummyObject = new THREE.Object3D();
    dummyObject.userData.material = material;

    const clip: AnimationClip = {
      name: 'color',
      duration,
      tracks: [{
        name: 'color',
        property: 'color',
        keyframes: [
          { time: 0, color: fromColor.clone() },
          { time: duration, color: toColor.clone() }
        ],
        interpolation: 'linear'
      }],
      config: { duration, ...config }
    };

    const animation = this.createAnimation(dummyObject, clip);

    // Override update to handle material color
    const originalUpdate = animation.update.bind(animation);
    animation.update = (deltaTime: number) => {
      const completed = originalUpdate(deltaTime);

      // Apply color to material
      if (dummyObject.userData.currentColor) {
        if (material instanceof THREE.MeshBasicMaterial ||
            material instanceof THREE.MeshLambertMaterial ||
            material instanceof THREE.MeshPhongMaterial ||
            material instanceof THREE.MeshStandardMaterial) {
          material.color.copy(dummyObject.userData.currentColor);
        }
      }

      return completed;
    };

    return animation;
  }

  /**
   * Create fade animation for materials
   */
  static createFadeAnimation(
    material: THREE.Material,
    fromOpacity: number,
    toOpacity: number,
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    // Create a dummy object to animate the material opacity
    const dummyObject = new THREE.Object3D();
    dummyObject.userData.material = material;

    const clip: AnimationClip = {
      name: 'fade',
      duration,
      tracks: [{
        name: 'opacity',
        property: 'opacity',
        keyframes: [
          { time: 0, opacity: fromOpacity },
          { time: duration, opacity: toOpacity }
        ],
        interpolation: 'linear'
      }],
      config: { duration, ...config }
    };

    const animation = this.createAnimation(dummyObject, clip);

    // Override update to handle material opacity
    const originalUpdate = animation.update.bind(animation);
    animation.update = (deltaTime: number) => {
      const completed = originalUpdate(deltaTime);

      // Apply opacity to material
      if (dummyObject.userData.currentOpacity !== undefined) {
        material.transparent = true;
        if ('opacity' in material) {
          (material as any).opacity = dummyObject.userData.currentOpacity;
        }
      }

      return completed;
    };

    return animation;
  }

  /**
   * Create pulsing animation
   */
  static createPulseAnimation(
    target: THREE.Object3D,
    baseScale: THREE.Vector3,
    pulseAmount: number = 0.2,
    duration: number = 2.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'pulse',
      duration,
      tracks: [{
        name: 'pulse',
        property: 'scale',
        keyframes: [
          { time: 0, scale: baseScale.clone() },
          { time: duration / 2, scale: baseScale.clone().multiplyScalar(1 + pulseAmount) },
          { time: duration, scale: baseScale.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, loop: true, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create floating animation
   */
  static createFloatAnimation(
    target: THREE.Object3D,
    basePosition: THREE.Vector3,
    floatAmount: number = 0.5,
    duration: number = 3.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'float',
      duration,
      tracks: [{
        name: 'float',
        property: 'position',
        keyframes: [
          { time: 0, position: basePosition.clone() },
          { time: duration / 2, position: basePosition.clone().add(new THREE.Vector3(0, floatAmount, 0)) },
          { time: duration, position: basePosition.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, loop: true, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create mystical energy animation
   */
  static createEnergyAnimation(
    target: THREE.Object3D,
    intensity: number = 1.0,
    duration: number = 4.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const baseRotation = target.rotation.clone();
    const baseScale = target.scale.clone();

    const clip: AnimationClip = {
      name: 'energy',
      duration,
      tracks: [
        {
          name: 'rotation',
          property: 'rotation',
          keyframes: [
            { time: 0, rotation: baseRotation.clone() },
            { time: duration, rotation: new THREE.Euler(baseRotation.x + Math.PI * 2, baseRotation.y + Math.PI, baseRotation.z) }
          ],
          interpolation: 'linear'
        },
        {
          name: 'scale',
          property: 'scale',
          keyframes: [
            { time: 0, scale: baseScale.clone() },
            { time: duration / 4, scale: baseScale.clone().multiplyScalar(1.2) },
            { time: duration / 2, scale: baseScale.clone().multiplyScalar(0.8) },
            { time: duration * 3 / 4, scale: baseScale.clone().multiplyScalar(1.1) },
            { time: duration, scale: baseScale.clone() }
          ],
          interpolation: 'smooth'
        }
      ],
      config: { duration, loop: true, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create spiral animation
   */
  static createSpiralAnimation(
    target: THREE.Object3D,
    center: THREE.Vector3,
    radius: number,
    height: number,
    turns: number = 2,
    duration: number = 5.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const keyframes: Keyframe[] = [];
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * turns * Math.PI * 2;
      const currentRadius = radius * (1 - t * 0.5); // Spiral inward

      const position = new THREE.Vector3(
        center.x + Math.cos(angle) * currentRadius,
        center.y + t * height,
        center.z + Math.sin(angle) * currentRadius
      );

      keyframes.push({
        time: t * duration,
        position,
        rotation: new THREE.Euler(0, angle, 0)
      });
    }

    const clip: AnimationClip = {
      name: 'spiral',
      duration,
      tracks: [{
        name: 'spiral',
        property: 'position',
        keyframes,
        interpolation: 'smooth'
      }],
      config: { duration, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create breathing animation
   */
  static createBreathingAnimation(
    target: THREE.Object3D,
    baseScale: THREE.Vector3,
    breatheAmount: number = 0.1,
    duration: number = 4.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const clip: AnimationClip = {
      name: 'breathing',
      duration,
      tracks: [{
        name: 'breathing',
        property: 'scale',
        keyframes: [
          { time: 0, scale: baseScale.clone() },
          { time: duration / 2, scale: baseScale.clone().multiplyScalar(1 + breatheAmount) },
          { time: duration, scale: baseScale.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, loop: true, ...config }
    };

    return this.createAnimation(target, clip);
  }

  /**
   * Create mystical glow animation for materials
   */
  static createGlowAnimation(
    material: THREE.Material,
    baseColor: THREE.Color,
    glowColor: THREE.Color,
    intensity: number = 1.0,
    duration: number = 2.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const dummyObject = new THREE.Object3D();
    dummyObject.userData.material = material;
    dummyObject.userData.baseColor = baseColor;
    dummyObject.userData.glowColor = glowColor;

    const clip: AnimationClip = {
      name: 'glow',
      duration,
      tracks: [{
        name: 'glow',
        property: 'glow',
        keyframes: [
          { time: 0, color: baseColor.clone() },
          { time: duration / 2, color: glowColor.clone() },
          { time: duration, color: baseColor.clone() }
        ],
        interpolation: 'smooth'
      }],
      config: { duration, loop: true, ...config }
    };

    const animation = this.createAnimation(dummyObject, clip);

    // Override update to handle material glow
    const originalUpdate = animation.update.bind(animation);
    animation.update = (deltaTime: number) => {
      const completed = originalUpdate(deltaTime);

      // Apply glow effect to material
      if (dummyObject.userData.currentColor && material instanceof THREE.MeshStandardMaterial) {
        const intensity = dummyObject.userData.glowIntensity || 0;
        material.emissive.copy(dummyObject.userData.currentColor).multiplyScalar(intensity);
      }

      return completed;
    };

    return animation;
  }

  /**
   * Easing functions
   */
  static easing = {
    /**
     * Linear interpolation
     */
    linear: (t: number): number => t,

    /**
     * Quadratic ease in
     */
    easeInQuad: (t: number): number => t * t,

    /**
     * Quadratic ease out
     */
    easeOutQuad: (t: number): number => t * (2 - t),

    /**
     * Quadratic ease in-out
     */
    easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

    /**
     * Cubic ease in
     */
    easeInCubic: (t: number): number => t * t * t,

    /**
     * Cubic ease out
     */
    easeOutCubic: (t: number): number => (--t) * t * t + 1,

    /**
     * Cubic ease in-out
     */
    easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

    /**
     * Sine ease in
     */
    easeInSine: (t: number): number => 1 - Math.cos(t * Math.PI / 2),

    /**
     * Sine ease out
     */
    easeOutSine: (t: number): number => Math.sin(t * Math.PI / 2),

    /**
     * Sine ease in-out
     */
    easeInOutSine: (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2,

    /**
     * Exponential ease in
     */
    easeInExpo: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),

    /**
     * Exponential ease out
     */
    easeOutExpo: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),

    /**
     * Exponential ease in-out
     */
    easeInOutExpo: (t: number): number => {
      if (t === 0) return 0;
      if (t === 1) return 1;
      if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
      return (2 - Math.pow(2, -20 * t + 10)) / 2;
    },

    /**
     * Elastic ease out
     */
    easeOutElastic: (t: number): number => {
      const c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },

    /**
     * Bounce ease out
     */
    easeOutBounce: (t: number): number => {
      const n1 = 7.5625;
      const d1 = 2.75;

      if (t < 1 / d1) {
        return n1 * t * t;
      } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    }
  };

  /**
   * Animation mixer for complex animations
   */
  static createAnimationMixer(): AnimationMixer {
    return new AnimationMixer();
  }

  /**
   * Create keyframe animation from positions
   */
  static createKeyframeAnimation(
    target: THREE.Object3D,
    positions: THREE.Vector3[],
    rotations: THREE.Euler[] = [],
    duration: number = 1.0,
    config: Partial<AnimationConfig> = {}
  ): AnimationInstance {
    const keyframes: Keyframe[] = [];

    positions.forEach((position, index) => {
      const time = (index / (positions.length - 1)) * duration;
      const keyframe: Keyframe = { time, position };

      if (rotations[index]) {
        keyframe.rotation = rotations[index];
      }

      keyframes.push(keyframe);
    });

    const clip: AnimationClip = {
      name: 'keyframe',
      duration,
      tracks: [{
        name: 'keyframe',
        property: 'transform',
        keyframes,
        interpolation: 'smooth'
      }],
      config: { duration, ...config }
    };

    return this.createAnimation(target, clip);
  }
}

/**
 * Animation instance for managing individual animations
 */
export class AnimationInstance {
  private target: THREE.Object3D;
  private clip: AnimationClip;
  private currentTime: number = 0;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private loopCount: number = 0;
  private direction: number = 1; // 1 for forward, -1 for backward (yoyo)

  constructor(target: THREE.Object3D, clip: AnimationClip) {
    this.target = target;
    this.clip = clip;
  }

  /**
   * Play animation
   */
  play(): void {
    this.isPlaying = true;
    this.isPaused = false;
  }

  /**
   * Pause animation
   */
  pause(): void {
    this.isPaused = true;
  }

  /**
   * Stop animation
   */
  stop(): void {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentTime = 0;
    this.loopCount = 0;
    this.direction = 1;
  }

  /**
   * Update animation
   */
  update(deltaTime: number): boolean {
    if (!this.isPlaying || this.isPaused) {
      return true; // Keep animation alive
    }

    this.currentTime += deltaTime * this.direction;

    // Handle looping and yoyo
    if (this.direction > 0 && this.currentTime >= this.clip.duration) {
      if (this.clip.config.loop) {
        this.currentTime = this.currentTime % this.clip.duration;
        this.loopCount++;
      } else if (this.clip.config.yoyo) {
        this.direction = -1;
        this.currentTime = this.clip.duration - (this.currentTime - this.clip.duration);
      } else {
        this.currentTime = this.clip.duration;
        this.isPlaying = false;
        return false; // Animation completed
      }
    } else if (this.direction < 0 && this.currentTime <= 0) {
      if (this.clip.config.yoyo) {
        this.direction = 1;
        this.currentTime = -this.currentTime;
      } else {
        this.currentTime = 0;
        this.isPlaying = false;
        return false; // Animation completed
      }
    }

    // Apply animation to target
    this.applyAnimation();

    return true; // Animation still active
  }

  /**
   * Apply current animation state to target
   */
  private applyAnimation(): void {
    const t = this.currentTime / this.clip.duration;

    this.clip.tracks.forEach(track => {
      const keyframe = this.getKeyframeAtTime(track, this.currentTime);
      if (keyframe) {
        this.applyKeyframe(track, keyframe);
      }
    });
  }

  /**
   * Get keyframe at specific time
   */
  private getKeyframeAtTime(track: AnimationTrack, time: number): Keyframe | null {
    if (track.keyframes.length === 0) return null;

    // Find the two keyframes to interpolate between
    let keyframe1 = track.keyframes[0];
    let keyframe2 = track.keyframes[track.keyframes.length - 1];

    for (let i = 0; i < track.keyframes.length - 1; i++) {
      if (time >= track.keyframes[i].time && time <= track.keyframes[i + 1].time) {
        keyframe1 = track.keyframes[i];
        keyframe2 = track.keyframes[i + 1];
        break;
      }
    }

    // Interpolate between keyframes
    const t = (time - keyframe1.time) / (keyframe2.time - keyframe1.time);
    const easedT = this.clip.config.easing ? this.clip.config.easing(t) : t;

    return this.interpolateKeyframe(keyframe1, keyframe2, easedT, track.interpolation || 'linear');
  }

  /**
   * Interpolate between two keyframes
   */
  private interpolateKeyframe(keyframe1: Keyframe, keyframe2: Keyframe, t: number, interpolation: string): Keyframe {
    const result: Keyframe = { time: keyframe1.time + t * (keyframe2.time - keyframe1.time) };

    if (keyframe1.position && keyframe2.position) {
      result.position = new THREE.Vector3().lerpVectors(keyframe1.position, keyframe2.position, t);
    }

    if (keyframe1.rotation && keyframe2.rotation) {
      result.rotation = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().slerpQuaternions(
          new THREE.Quaternion().setFromEuler(keyframe1.rotation),
          new THREE.Quaternion().setFromEuler(keyframe2.rotation),
          t
        )
      );
    }

    if (keyframe1.scale && keyframe2.scale) {
      result.scale = new THREE.Vector3().lerpVectors(keyframe1.scale, keyframe2.scale, t);
    }

    if (keyframe1.color && keyframe2.color) {
      result.color = new THREE.Color().lerpColors(keyframe1.color, keyframe2.color, t);
    }

    if (keyframe1.opacity !== undefined && keyframe2.opacity !== undefined) {
      result.opacity = keyframe1.opacity + t * (keyframe2.opacity - keyframe1.opacity);
    }

    return result;
  }

  /**
   * Apply keyframe to target object
   */
  private applyKeyframe(track: AnimationTrack, keyframe: Keyframe): void {
    switch (track.property) {
      case 'position':
        if (keyframe.position) {
          this.target.position.copy(keyframe.position);
        }
        break;

      case 'rotation':
        if (keyframe.rotation) {
          this.target.rotation.copy(keyframe.rotation);
        }
        break;

      case 'scale':
        if (keyframe.scale) {
          this.target.scale.copy(keyframe.scale);
        }
        break;

      case 'color':
        if (keyframe.color) {
          this.target.userData.currentColor = keyframe.color;
        }
        break;

      case 'opacity':
        if (keyframe.opacity !== undefined) {
          this.target.userData.currentOpacity = keyframe.opacity;
        }
        break;

      case 'transform':
        if (keyframe.position) {
          this.target.position.copy(keyframe.position);
        }
        if (keyframe.rotation) {
          this.target.rotation.copy(keyframe.rotation);
        }
        break;
    }
  }

  /**
   * Get current animation state
   */
  getState(): { isPlaying: boolean; isPaused: boolean; currentTime: number; progress: number } {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentTime: this.currentTime,
      progress: this.currentTime / this.clip.duration
    };
  }
}

/**
 * Animation mixer for managing multiple animations
 */
export class AnimationMixer {
  private animations: Map<string, AnimationInstance> = new Map();
  private globalTimeScale: number = 1.0;

  /**
   * Add animation to mixer
   */
  addAnimation(name: string, animation: AnimationInstance): void {
    this.animations.set(name, animation);
  }

  /**
   * Remove animation from mixer
   */
  removeAnimation(name: string): boolean {
    return this.animations.delete(name);
  }

  /**
   * Play animation by name
   */
  playAnimation(name: string): boolean {
    const animation = this.animations.get(name);
    if (animation) {
      animation.play();
      return true;
    }
    return false;
  }

  /**
   * Stop all animations
   */
  stopAll(): void {
    this.animations.forEach(animation => animation.stop());
  }

  /**
   * Update all animations in mixer
   */
  update(deltaTime: number): void {
    const scaledDelta = deltaTime * this.globalTimeScale;
    const toRemove: string[] = [];

    this.animations.forEach((animation, name) => {
      if (!animation.update(scaledDelta)) {
        toRemove.push(name);
      }
    });

    // Remove completed animations
    toRemove.forEach(name => {
      this.animations.delete(name);
    });
  }

  /**
   * Set global time scale
   */
  setTimeScale(scale: number): void {
    this.globalTimeScale = scale;
  }

  /**
   * Get animation by name
   */
  getAnimation(name: string): AnimationInstance | undefined {
    return this.animations.get(name);
  }

  /**
   * Get all animation names
   */
  getAnimationNames(): string[] {
    return Array.from(this.animations.keys());
  }

  /**
   * Clear all animations
   */
  clear(): void {
    this.animations.clear();
  }

  /**
   * Get active animation count
   */
  getActiveCount(): number {
    return this.animations.size;
  }
}

export default AnimationUtils;
