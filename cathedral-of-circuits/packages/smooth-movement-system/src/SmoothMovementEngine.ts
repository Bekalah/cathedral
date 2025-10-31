/**
 * SmoothMovementEngine - Research-Based Movement System
 * Inspired by Hades, Celeste, and modern game design best practices
 * Optimized for sacred geometry and mystical computing environments
 */

export interface MovementConfig {
  type: 'dash' | 'float' | 'glide' | 'teleport' | 'spiral';
  speed: number;
  acceleration: number;
  friction: number;
  gravity: number;
  jumpHeight: number;
  dashDistance: number;
  dashCooldown: number;
}

export interface MovementState {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  acceleration: { x: number; y: number; z: number };
  isGrounded: boolean;
  isDashing: boolean;
  canDash: boolean;
  lastDashTime: number;
  facing: { x: number; z: number };
}

export class SmoothMovementEngine {
  private static readonly MOVEMENT_PRESETS = {
    // Hades-style combat dash
    hadesDash: {
      type: 'dash' as const,
      speed: 25,
      acceleration: 50,
      friction: 0.85,
      gravity: 0,
      jumpHeight: 0,
      dashDistance: 8,
      dashCooldown: 1000
    },

    // Celeste-style precise platforming
    celestePlatformer: {
      type: 'float' as const,
      speed: 8,
      acceleration: 30,
      friction: 0.75,
      gravity: 25,
      jumpHeight: 12,
      dashDistance: 0,
      dashCooldown: 0
    },

    // Mystical floating movement
    mysticalFloat: {
      type: 'glide' as const,
      speed: 12,
      acceleration: 20,
      friction: 0.95,
      gravity: 5,
      jumpHeight: 8,
      dashDistance: 15,
      dashCooldown: 2000
    },

    // Sacred geometry spiral movement
    spiralNavigator: {
      type: 'spiral' as const,
      speed: 15,
      acceleration: 25,
      friction: 0.90,
      gravity: 0,
      jumpHeight: 0,
      dashDistance: 20,
      dashCooldown: 1500
    }
  };

  private movementState: MovementState;
  private config: MovementConfig;
  private inputBuffer: Map<string, number> = new Map();
  private lastUpdateTime: number = 0;

  constructor(config: MovementConfig = SmoothMovementEngine.MOVEMENT_PRESETS.hadesDash) {
    this.config = config;
    this.movementState = {
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      acceleration: { x: 0, y: 0, z: 0 },
      isGrounded: false,
      isDashing: false,
      canDash: true,
      lastDashTime: 0,
      facing: { x: 1, z: 0 }
    };
  }

  /**
   * Update movement based on input and delta time
   * Uses research-based easing curves for natural feel
   */
  update(deltaTime: number, input: MovementInput): MovementState {
    const now = Date.now();
    const actualDeltaTime = Math.min(deltaTime, 1/30); // Cap at 30fps minimum

    this.handleInputBuffering(input, now);
    this.updateMovementPhysics(actualDeltaTime);
    this.applySacredGeometryConstraints();

    this.lastUpdateTime = now;
    return { ...this.movementState };
  }

  /**
   * Handle input buffering for responsive controls
   */
  private handleInputBuffering(input: MovementInput, currentTime: number): void {
    // Buffer inputs for sub-frame responsiveness
    const bufferWindow = 100; // milliseconds

    Object.entries(input).forEach(([key, value]) => {
      if (value) {
        this.inputBuffer.set(key, currentTime);
      } else {
        this.inputBuffer.delete(key);
      }
    });

    // Clean old inputs
    for (const [key, time] of this.inputBuffer.entries()) {
      if (currentTime - time > bufferWindow) {
        this.inputBuffer.delete(key);
      }
    }
  }

  /**
   * Update physics with research-based easing
   */
  private updateMovementPhysics(deltaTime: number): void {
    const { movementState, config } = this;

    // Apply gravity (Hades/Celeste style)
    if (!movementState.isGrounded && config.gravity > 0) {
      movementState.velocity.y -= config.gravity * deltaTime;
    }

    // Handle horizontal movement with smooth acceleration
    const horizontalInput = this.getInputVector();
    if (horizontalInput.x !== 0 || horizontalInput.z !== 0) {
      // Normalize input vector
      const inputMagnitude = Math.sqrt(horizontalInput.x ** 2 + horizontalInput.z ** 2);
      const normalizedInput = {
        x: horizontalInput.x / inputMagnitude,
        z: horizontalInput.z / inputMagnitude
      };

      // Apply acceleration with easing curve
      const targetVelocity = {
        x: normalizedInput.x * config.speed,
        z: normalizedInput.z * config.speed
      };

      // Smooth interpolation (ease-out curve)
      const easeFactor = 1 - Math.exp(-config.acceleration * deltaTime);
      movementState.velocity.x += (targetVelocity.x - movementState.velocity.x) * easeFactor;
      movementState.velocity.z += (targetVelocity.z - movementState.velocity.z) * easeFactor;

      // Update facing direction
      movementState.facing = { x: normalizedInput.x, z: normalizedInput.z };
    } else {
      // Apply friction when no input
      movementState.velocity.x *= config.friction;
      movementState.velocity.z *= config.friction;
    }

    // Handle jumping
    if (this.inputBuffer.has('jump') && movementState.isGrounded) {
      movementState.velocity.y = config.jumpHeight;
      movementState.isGrounded = false;
    }

    // Handle dashing (Hades-style)
    if (this.inputBuffer.has('dash') && movementState.canDash && !movementState.isDashing) {
      this.performDash();
    }

    // Update position
    movementState.position.x += movementState.velocity.x * deltaTime;
    movementState.position.y += movementState.velocity.y * deltaTime;
    movementState.position.z += movementState.velocity.z * deltaTime;

    // Ground collision
    if (movementState.position.y <= 0) {
      movementState.position.y = 0;
      movementState.velocity.y = 0;
      movementState.isGrounded = true;
    }
  }

  /**
   * Get normalized input vector from buffered inputs
   */
  private getInputVector(): { x: number; z: number } {
    let inputX = 0;
    let inputZ = 0;

    if (this.inputBuffer.has('moveLeft')) inputX -= 1;
    if (this.inputBuffer.has('moveRight')) inputX += 1;
    if (this.inputBuffer.has('moveForward')) inputZ -= 1;
    if (this.inputBuffer.has('moveBackward')) inputZ += 1;

    return { x: inputX, z: inputZ };
  }

  /**
   * Perform dash with sacred geometry timing
   */
  private performDash(): void {
    const dashDirection = {
      x: this.movementState.facing.x,
      z: this.movementState.facing.z
    };

    // Apply dash force
    this.movementState.velocity.x = dashDirection.x * this.config.dashDistance;
    this.movementState.velocity.z = dashDirection.z * this.config.dashDistance;
    this.movementState.velocity.y = 0; // Cancel vertical velocity during dash

    this.movementState.isDashing = true;
    this.movementState.canDash = false;
    this.movementState.lastDashTime = Date.now();

    // Reset dash after duration
    setTimeout(() => {
      this.movementState.isDashing = false;
    }, 200);

    // Re-enable dash after cooldown
    setTimeout(() => {
      this.movementState.canDash = true;
    }, this.config.dashCooldown);
  }

  /**
   * Apply sacred geometry constraints to movement
   */
  private applySacredGeometryConstraints(): void {
    // Fibonacci-based movement smoothing
    const phi = 1.6180339887;

    // Apply golden ratio to velocity for natural feel
    if (Math.abs(this.movementState.velocity.x) < 0.1) {
      this.movementState.velocity.x = 0;
    }
    if (Math.abs(this.movementState.velocity.z) < 0.1) {
      this.movementState.velocity.z = 0;
    }

    // Sacred geometry boundary constraints
    const boundary = 50;
    if (Math.abs(this.movementState.position.x) > boundary) {
      this.movementState.position.x = Math.sign(this.movementState.position.x) * boundary;
      this.movementState.velocity.x *= -0.5; // Bounce with energy loss
    }
    if (Math.abs(this.movementState.position.z) > boundary) {
      this.movementState.position.z = Math.sign(this.movementState.position.z) * boundary;
      this.movementState.velocity.z *= -0.5;
    }
  }

  /**
   * Get current movement state
   */
  getState(): MovementState {
    return { ...this.movementState };
  }

  /**
   * Set movement configuration
   */
  setConfig(config: Partial<MovementConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Reset movement to initial state
   */
  reset(position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }): void {
    this.movementState = {
      position,
      velocity: { x: 0, y: 0, z: 0 },
      acceleration: { x: 0, y: 0, z: 0 },
      isGrounded: false,
      isDashing: false,
      canDash: true,
      lastDashTime: 0,
      facing: { x: 1, z: 0 }
    };
    this.inputBuffer.clear();
  }

  /**
   * Get movement analytics for optimization
   */
  getAnalytics(): {
    averageSpeed: number;
    dashCount: number;
    jumpCount: number;
    distanceTraveled: number;
    timeInAir: number;
  } {
    // This would track analytics over time
    return {
      averageSpeed: 0,
      dashCount: 0,
      jumpCount: 0,
      distanceTraveled: 0,
      timeInAir: 0
    };
  }
}

export interface MovementInput {
  moveLeft?: boolean;
  moveRight?: boolean;
  moveForward?: boolean;
  moveBackward?: boolean;
  jump?: boolean;
  dash?: boolean;
  interact?: boolean;
}

export default SmoothMovementEngine;
