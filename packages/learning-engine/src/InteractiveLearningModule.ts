/**
 * @cathedral/learning-engine
 * Interactive learning module for guided educational experiences
 * Provides drag-and-drop interactions, step-by-step tutorials, and visual feedback
 */

import * as THREE from 'three';
import {
  InteractiveTutorialData,
  TutorialStep,
  LearningContent,
  LearningProgress,
  InteractiveElement,
  LearningAnimation,
  TutorialHint,
  TutorialCheckpoint,
  CompletionCriteria,
  StepInteraction,
  StepValidation,
  StepFeedback,
  ValidationCriteria,
  ComparisonOperator,
  InteractionType,
  ActionType,
  LearningEvent,
  LearningEventType,
  LearningDifficulty,
  AccessibilityInfo,
  VisualFeedback,
  AudioFeedback,
  HapticFeedback,
  ProgressFeedback,
  LearningImpact,
  Reward,
  Achievement,
  AchievementRarity
} from './types/LearningTypes';

// Interface for the Interactive Learning Module
export interface IInteractiveLearningModule {
  startTutorial(
    tutorialId: string,
    userId: string,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): Promise<void>;

  addEventListener(type: LearningEventType, listener: Function): void;
  removeEventListener(type: LearningEventType, listener: Function): void;

  dispose(): void;
}

export class InteractiveLearningModule implements IInteractiveLearningModule {
  private activeTutorials: Map<string, InteractiveTutorialData> = new Map();
  private currentTutorial: InteractiveTutorialData | null = null;
  private currentStepIndex: number = 0;
  private userProgress: Map<string, LearningProgress> = new Map();
  private eventListeners: Map<LearningEventType, Function[]> = new Map();

  // Interaction state
  private draggedObject: THREE.Object3D | null = null;
  private dragOffset: THREE.Vector3 = new THREE.Vector3();
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();

  // Animation and feedback systems
  private stepAnimations: Map<string, THREE.AnimationMixer> = new Map();
  private feedbackQueue: Array<{
    type: 'success' | 'error' | 'hint' | 'encouragement';
    message: string;
    duration: number;
    visual?: VisualFeedback;
    audio?: AudioFeedback;
    haptic?: HapticFeedback;
  }> = [];

  // Assessment tracking
  private stepAttempts: Map<string, number> = new Map();
  private stepScores: Map<string, number> = new Map();
  private hintRequests: Map<string, number> = new Map();

  constructor() {
    this.initializeEventSystem();
    this.setupInteractionHandlers();
  }

  private initializeEventSystem(): void {
    Object.values(LearningEventType).forEach(eventType => {
      this.eventListeners.set(eventType, []);
    });
  }

  private setupInteractionHandlers(): void {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  // Public API methods

  async startTutorial(
    tutorialId: string,
    userId: string,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): Promise<void> {
    try {
      // Load tutorial data
      const tutorialData = await this.loadTutorialData(tutorialId);
      if (!tutorialData) {
        throw new Error(`Tutorial ${tutorialId} not found`);
      }

      // Initialize tutorial state
      this.currentTutorial = tutorialData;
      this.currentStepIndex = 0;
      this.activeTutorials.set(tutorialId, tutorialData);

      // Setup scene interactions
      this.setupStepInteractions(this.currentTutorial.steps[0], scene, camera);

      // Initialize progress tracking
      this.initializeTutorialProgress(userId, tutorialId);

      // Start first step
      await this.startCurrentStep(scene, camera);

      // Emit tutorial start event
      this.emitEvent(LearningEventType.SESSION_START, {
        tutorialId,
        userId,
        totalSteps: tutorialData.steps.length
      });

    } catch (error) {
      this.handleError('TUTORIAL_START_FAILED', error, { tutorialId, userId });
      throw error;
    }
  }

  private async loadTutorialData(tutorialId: string): Promise<InteractiveTutorialData | null> {
    // This would typically load from a database or file system
    // For now, we'll create sample tutorial data based on the ID

    const tutorials: Record<string, InteractiveTutorialData> = {
      'sacred-geometry-basics': {
        steps: [
          {
            id: 'step-1',
            title: 'Understanding Platonic Solids',
            instruction: 'Drag the tetrahedron to explore its structure',
            visualGuide: {
              highlightElements: ['tetrahedron'],
              overlayText: 'Click and drag to rotate the tetrahedron',
              arrows: [],
              animations: ['highlight-tetrahedron']
            },
            interaction: {
              type: InteractionType.DRAG_DROP,
              required: true,
              timeout: 30000,
              retryLimit: 3
            },
            validation: {
              criteria: [{
                type: 'position' as any,
                target: 'tetrahedron',
                operator: ComparisonOperator.WITHIN_RANGE,
                value: { x: [-2, 2], y: [-2, 2], z: [-2, 2] },
                tolerance: 0.5
              }],
              successThreshold: 0.8,
              strictMode: false
            },
            feedback: {
              success: {
                text: 'Excellent! You\'ve successfully explored the tetrahedron.',
                audio: 'success-chime',
                visual: 'green-glow',
                duration: 2000
              },
              failure: {
                text: 'Try rotating the tetrahedron to see all faces.',
                audio: 'gentle-hint',
                visual: 'yellow-highlight',
                duration: 3000
              },
              hint: {
                text: 'Click and drag the tetrahedron to rotate it.',
                audio: 'hint-voice',
                visual: 'arrow-guide',
                duration: 4000
              },
              encouragement: [
                'You\'re doing great!',
                'Keep exploring!',
                'Discovery is the key to understanding!'
              ]
            },
            duration: 60000
          },
          {
            id: 'step-2',
            title: 'Sacred Geometry Patterns',
            instruction: 'Connect the dots to form the Flower of Life pattern',
            visualGuide: {
              highlightElements: ['flower-points'],
              overlayText: 'Click on the points to connect them',
              arrows: [{
                start: new THREE.Vector3(0, 0, 0),
                end: new THREE.Vector3(1, 0, 0),
                color: new THREE.Color(0x00FF00),
                animation: 'pulse-arrow'
              }],
              animations: ['show-flower-pattern']
            },
            interaction: {
              type: InteractionType.CLICK_SELECT,
              required: true,
              timeout: 45000,
              retryLimit: 3
            },
            validation: {
              criteria: [{
                type: 'sequence' as any,
                target: 'flower-points',
                operator: ComparisonOperator.CONTAINS,
                value: ['point-1', 'point-2', 'point-3', 'point-4', 'point-5', 'point-6'],
                tolerance: 0
              }],
              successThreshold: 1.0,
              strictMode: true
            },
            feedback: {
              success: {
                text: 'Beautiful! You\'ve revealed the Flower of Life pattern.',
                audio: 'sacred-chime',
                visual: 'rainbow-glow',
                duration: 3000
              },
              failure: {
                text: 'Make sure to connect all the points in the correct order.',
                audio: 'gentle-correction',
                visual: 'red-highlight',
                duration: 3000
              },
              hint: {
                text: 'Start with the center point and work outward.',
                audio: 'hint-voice',
                visual: 'numbered-guide',
                duration: 4000
              },
              encouragement: [
                'Almost there!',
                'Sacred geometry reveals itself through patience!',
                'Each connection brings deeper understanding!'
              ]
            },
            duration: 90000
          }
        ],
        navigation: {
          allowSkip: false,
          allowBacktrack: true,
          autoAdvance: true,
          pauseOnError: true
        },
        hints: [
          {
            id: 'rotation-hint',
            trigger: {
              event: 'step_start',
              condition: 'time > 10000',
              probability: 0.7
            },
            content: 'Try rotating the object to see it from different angles',
            visualAid: 'rotation-icon',
            delay: 10000,
            persistence: 5000
          }
        ],
        checkpoints: [
          {
            id: 'mid-tutorial-checkpoint',
            stepId: 'step-2',
            saveState: true,
            validationRequired: true,
            reward: {
              type: 'experience_points' as any,
              value: 50,
              description: 'Mid-tutorial progress reward'
            }
          }
        ],
        completionCriteria: {
          minScore: 70,
          maxTime: 300000, // 5 minutes
          requiredSteps: ['step-1', 'step-2'],
          optionalSteps: []
        }
      }
    };

    return tutorials[tutorialId] || null;
  }

  private async startCurrentStep(scene: THREE.Scene, camera: THREE.Camera): Promise<void> {
    if (!this.currentTutorial || !this.currentTutorial.steps[this.currentStepIndex]) {
      return;
    }

    const step = this.currentTutorial.steps[this.currentStepIndex];

    // Setup step interactions
    await this.setupStepInteractions(step, scene, camera);

    // Start step animations
    this.startStepAnimations(step, scene);

    // Setup validation monitoring
    this.setupStepValidation(step);

    // Emit step start event
    this.emitEvent(LearningEventType.STEP_COMPLETE, {
      stepId: step.id,
      tutorialId: this.currentTutorial.steps.map(s => s.id),
      stepIndex: this.currentStepIndex
    });
  }

  private async setupStepInteractions(
    step: TutorialStep,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): Promise<void> {
    // Clear previous interactions
    this.clearStepInteractions();

    // Setup new interactions based on step type
    switch (step.interaction.type) {
      case InteractionType.DRAG_DROP:
        this.setupDragDropInteraction(step, scene);
        break;
      case InteractionType.CLICK_SELECT:
        this.setupClickSelectInteraction(step, scene, camera);
        break;
      case InteractionType.DRAW_TRACE:
        this.setupDrawTraceInteraction(step, scene);
        break;
      default:
        console.warn(`Unsupported interaction type: ${step.interaction.type}`);
    }

    // Setup visual guides
    this.setupVisualGuides(step, scene);

    // Setup hint system
    this.setupHintSystem(step);
  }

  private setupDragDropInteraction(step: TutorialStep, scene: THREE.Scene): void {
    // Find draggable objects in the scene
    scene.traverse((object) => {
      if (object.userData && object.userData.draggable) {
        object.userData.originalPosition = object.position.clone();
        object.userData.isDragging = false;

        // Add visual feedback for draggable objects
        this.addDragVisualFeedback(object);
      }
    });
  }

  private setupClickSelectInteraction(
    step: TutorialStep,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): void {
    // Setup click targets based on step validation criteria
    step.validation.criteria.forEach(criteria => {
      if (criteria.type === 'sequence') {
        this.setupSequenceInteraction(criteria, scene, camera);
      }
    });
  }

  private setupDrawTraceInteraction(step: TutorialStep, scene: THREE.Scene): void {
    // Setup drawing canvas and trace validation
    this.createTraceCanvas(step, scene);
  }

  private setupVisualGuides(step: TutorialStep, scene: THREE.Scene): void {
    // Create highlight effects for important elements
    step.visualGuide.highlightElements.forEach(elementId => {
      const element = this.findSceneObjectById(scene, elementId);
      if (element) {
        this.addHighlightEffect(element);
      }
    });

    // Create arrow guides
    step.visualGuide.arrows.forEach(arrow => {
      this.createArrowGuide(arrow, scene);
    });

    // Setup overlay text
    if (step.visualGuide.overlayText) {
      this.showOverlayText(step.visualGuide.overlayText);
    }
  }

  private setupHintSystem(step: TutorialStep): void {
    // Setup automatic hints based on time and user behavior
    setTimeout(() => {
      if (this.currentTutorial && this.currentStepIndex < this.currentTutorial.steps.length) {
        this.showHint(step.id, 'timeout-hint');
      }
    }, 15000); // Show hint after 15 seconds
  }

  private setupStepValidation(step: TutorialStep): void {
    // Setup validation monitoring based on criteria
    step.validation.criteria.forEach(criteria => {
      this.setupValidationMonitoring(criteria, step);
    });
  }

  private setupValidationMonitoring(criteria: ValidationCriteria, step: TutorialStep): void {
    // This would setup real-time monitoring of user interactions
    // For now, we'll use a simple timeout-based approach

    const checkValidation = () => {
      const isValid = this.checkValidationCriteria(criteria);
      if (isValid) {
        this.handleStepSuccess(step);
      } else {
        setTimeout(checkValidation, 1000); // Check again in 1 second
      }
    };

    setTimeout(checkValidation, 1000);
  }

  private checkValidationCriteria(criteria: ValidationCriteria): boolean {
    // This would check the actual criteria against current state
    // For now, return a random success for demonstration
    return Math.random() > 0.7;
  }

  private handleStepSuccess(step: TutorialStep): void {
    // Calculate step score
    const attempts = this.stepAttempts.get(step.id) || 1;
    const baseScore = 100;
    const attemptPenalty = Math.max(0, (attempts - 1) * 10);
    const score = Math.max(0, baseScore - attemptPenalty);

    this.stepScores.set(step.id, score);

    // Show success feedback
    this.showStepFeedback(step.feedback.success);

    // Award experience and progress
    this.awardStepProgress(step, score);

    // Auto-advance to next step if enabled
    if (this.currentTutorial?.navigation.autoAdvance) {
      setTimeout(() => {
        this.nextStep();
      }, 2000);
    }
  }

  private showStepFeedback(feedback: any): void {
    // Add feedback to queue for processing
    this.feedbackQueue.push({
      type: 'success',
      message: feedback.text,
      duration: feedback.duration,
      visual: feedback.visual,
      audio: feedback.audio
    });

    // Process feedback queue
    this.processFeedbackQueue();
  }

  private processFeedbackQueue(): void {
    if (this.feedbackQueue.length === 0) return;

    const feedback = this.feedbackQueue.shift()!;
    this.displayFeedback(feedback);
  }

  private displayFeedback(feedback: any): void {
    // Display visual feedback
    if (feedback.visual) {
      this.showVisualFeedback(feedback.visual);
    }

    // Play audio feedback
    if (feedback.audio) {
      this.playAudioFeedback(feedback.audio);
    }

    // Show text feedback
    this.showTextFeedback(feedback.message, feedback.duration);

    // Schedule next feedback
    if (feedback.duration > 0) {
      setTimeout(() => {
        this.processFeedbackQueue();
      }, feedback.duration);
    }
  }

  private showVisualFeedback(visualFeedback: VisualFeedback): void {
    // Create visual effects based on feedback type
    if (typeof visualFeedback === 'string') {
      switch (visualFeedback) {
        case 'green-glow':
          this.createGlowEffect(0x00FF00, 0.8);
          break;
        case 'rainbow-glow':
          this.createRainbowGlowEffect();
          break;
        case 'yellow-highlight':
          this.createHighlightEffect(0xFFFF00);
          break;
        case 'red-highlight':
          this.createHighlightEffect(0xFF0000);
          break;
      }
    } else {
      // Handle object-based visual feedback
      if (visualFeedback.highlightColor) {
        this.createGlowEffect(visualFeedback.highlightColor.getHex(), visualFeedback.glowIntensity || 0.5);
      }
    }
  }

  private playAudioFeedback(audioFeedback: AudioFeedback): void {
    // This would integrate with the audio system
    // For now, we'll use Web Audio API for simple feedback sounds

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(audioFeedback.frequency || 440, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(audioFeedback.volume || 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (audioFeedback.duration || 500) / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + (audioFeedback.duration || 500) / 1000);
  }

  private showTextFeedback(message: string, duration: number): void {
    // Create floating text feedback
    const textElement = document.createElement('div');
    textElement.textContent = message;
    textElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      font-size: 18px;
      text-align: center;
      z-index: 1000;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
      animation: fadeInOut ${duration}ms ease-in-out;
    `;

    document.body.appendChild(textElement);

    // Remove after duration
    setTimeout(() => {
      if (textElement.parentNode) {
        textElement.parentNode.removeChild(textElement);
      }
    }, duration);
  }

  private createGlowEffect(color: number, intensity: number): void {
    // Create a full-screen glow effect
    const glowElement = document.createElement('div');
    glowElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(${color >> 16}, ${(color >> 8) & 255}, ${color & 255}, ${intensity}) 0%, transparent 70%);
      pointer-events: none;
      z-index: 999;
      animation: glowFade 1000ms ease-out;
    `;

    document.body.appendChild(glowElement);

    setTimeout(() => {
      if (glowElement.parentNode) {
        glowElement.parentNode.removeChild(glowElement);
      }
    }, 1000);
  }

  private createRainbowGlowEffect(): void {
    // Create a rainbow gradient glow
    const rainbowElement = document.createElement('div');
    rainbowElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
      opacity: 0.3;
      pointer-events: none;
      z-index: 999;
      animation: rainbowPulse 2000ms ease-in-out;
    `;

    document.body.appendChild(rainbowElement);

    setTimeout(() => {
      if (rainbowElement.parentNode) {
        rainbowElement.parentNode.removeChild(rainbowElement);
      }
    }, 2000);
  }

  private createHighlightEffect(color: number): void {
    // This would highlight specific 3D objects in the scene
    // For now, we'll create a screen flash effect
    const flashElement = document.createElement('div');
    flashElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(${color >> 16}, ${(color >> 8) & 255}, ${color & 255}, 0.2);
      pointer-events: none;
      z-index: 998;
      animation: flashFade 800ms ease-out;
    `;

    document.body.appendChild(flashElement);

    setTimeout(() => {
      if (flashElement.parentNode) {
        flashElement.parentNode.removeChild(flashElement);
      }
    }, 800);
  }

  private awardStepProgress(step: TutorialStep, score: number): void {
    // Award experience points
    const experienceGain = Math.floor(score * 0.5); // 50% of score as XP

    // Update user progress
    // This would integrate with the user progression system

    // Check for achievements
    this.checkForAchievements(step, score);

    // Emit progress update
    this.emitEvent(LearningEventType.PROGRESS_UPDATE, {
      stepId: step.id,
      score,
      experienceGain,
      attempts: this.stepAttempts.get(step.id) || 1
    });
  }

  private checkForAchievements(step: TutorialStep, score: number): void {
    // Check for various achievement conditions
    if (score >= 95) {
      this.unlockAchievement({
        id: `perfect_${step.id}`,
        name: 'Perfectionist',
        description: `Achieved perfect score on ${step.title}`,
        icon: 'perfect-star',
        rarity: AchievementRarity.RARE,
        unlockedAt: new Date()
      });
    }

    if ((this.stepAttempts.get(step.id) || 1) === 1) {
      this.unlockAchievement({
        id: `first_try_${step.id}`,
        name: 'First Try Success',
        description: `Completed ${step.title} on the first attempt`,
        icon: 'first-try-badge',
        rarity: AchievementRarity.UNCOMMON,
        unlockedAt: new Date()
      });
    }
  }

  private unlockAchievement(achievement: Achievement): void {
    this.emitEvent(LearningEventType.ACHIEVEMENT_UNLOCK, {
      achievement
    });
  }

  private nextStep(): void {
    if (!this.currentTutorial) return;

    this.currentStepIndex++;

    if (this.currentStepIndex >= this.currentTutorial.steps.length) {
      this.completeTutorial();
    } else {
      // Start next step
      const nextStep = this.currentTutorial.steps[this.currentStepIndex];
      this.emitEvent(LearningEventType.STEP_COMPLETE, {
        stepId: nextStep.id,
        stepIndex: this.currentStepIndex
      });
    }
  }

  private completeTutorial(): void {
    if (!this.currentTutorial) return;

    // Calculate final score
    const totalScore = Array.from(this.stepScores.values()).reduce((sum, score) => sum + score, 0) / this.stepScores.size;

    // Check completion criteria
    const meetsCriteria = this.checkCompletionCriteria(totalScore);

    if (meetsCriteria) {
      // Award completion rewards
      this.awardCompletionRewards(totalScore);

      // Emit completion event
      this.emitEvent(LearningEventType.ASSESSMENT_COMPLETE, {
        tutorialId: this.currentTutorial.steps.map(s => s.id),
        finalScore: totalScore,
        completed: true
      });

      // Show completion celebration
      this.showCompletionCelebration(totalScore);
    } else {
      // Show retry options
      this.showRetryOptions();
    }
  }

  private checkCompletionCriteria(score: number): boolean {
    if (!this.currentTutorial) return false;

    const criteria = this.currentTutorial.completionCriteria;
    return score >= criteria.minScore;
  }

  private awardCompletionRewards(score: number): void {
    // Award completion experience
    const completionXP = Math.floor(score * 2); // 200% of average score

    // Award completion achievement
    this.unlockAchievement({
      id: 'tutorial_complete',
      name: 'Sacred Geometry Scholar',
      description: 'Completed the Sacred Geometry tutorial',
      icon: 'sacred-geometry-badge',
      rarity: AchievementRarity.EPIC,
      unlockedAt: new Date()
    });
  }

  private showCompletionCelebration(score: number): void {
    // Create celebration effects
    this.createConfettiEffect();
    this.showCompletionModal(score);
  }

  private createConfettiEffect(): void {
    // Create animated confetti particles
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1001;
      overflow: hidden;
    `;

    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]};
        left: ${Math.random() * 100}%;
        top: -10px;
        animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
      `;

      confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }, 5000);
  }

  private showCompletionModal(score: number): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      z-index: 1002;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      max-width: 400px;
    `;

    modal.innerHTML = `
      <h2 style="margin: 0 0 20px 0; color: #fff;">🎉 Tutorial Complete! 🎉</h2>
      <p style="margin: 10px 0; font-size: 48px; font-weight: bold;">${Math.round(score)}%</p>
      <p style="margin: 10px 0;">Excellent work! You've mastered the fundamentals of Sacred Geometry.</p>
      <button onclick="this.parentNode.parentNode.removeChild(this.parentNode)" style="
        background: #4CAF50;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
      ">Continue Learning</button>
    `;

    document.body.appendChild(modal);
  }

  private showRetryOptions(): void {
    // Show options to retry failed steps or restart tutorial
    const retryModal = document.createElement('div');
    retryModal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      z-index: 1002;
      max-width: 300px;
    `;

    retryModal.innerHTML = `
      <h3 style="margin: 0 0 20px 0;">Need More Practice?</h3>
      <p style="margin: 10px 0;">Don't worry! Learning takes time.</p>
      <button onclick="this.parentNode.parentNode.removeChild(this.parentNode)" style="
        background: #2196F3;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        margin: 5px;
        cursor: pointer;
      ">Try Again</button>
      <button onclick="this.parentNode.parentNode.removeChild(this.parentNode)" style="
        background: #666;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        margin: 5px;
        cursor: pointer;
      ">Review Hints</button>
    `;

    document.body.appendChild(retryModal);
  }

  // Event handling
  private emitEvent(type: LearningEventType, data: Record<string, any>): void {
    const listeners = this.eventListeners.get(type) || [];
    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in event listener for ${type}:`, error);
      }
    });
  }

  addEventListener(type: LearningEventType, listener: Function): void {
    const listeners = this.eventListeners.get(type) || [];
    listeners.push(listener);
    this.eventListeners.set(type, listeners);
  }

  removeEventListener(type: LearningEventType, listener: Function): void {
    const listeners = this.eventListeners.get(type) || [];
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
      this.eventListeners.set(type, listeners);
    }
  }

  // Interaction handlers
  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (this.draggedObject) {
      this.updateDraggedObjectPosition(event);
    }
  }

  private onMouseDown(event: MouseEvent): void {
    // Check for draggable objects
    const intersections = this.getMouseIntersections();
    for (const intersection of intersections) {
      if (intersection.object.userData.draggable) {
        this.startDragging(intersection.object, event);
        break;
      }
    }
  }

  private onMouseUp(event: MouseEvent): void {
    if (this.draggedObject) {
      this.stopDragging();
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    // Handle keyboard interactions for accessibility
    if (event.key === 'Escape' && this.draggedObject) {
      this.cancelDragging();
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    // Handle key releases
  }

  private getMouseIntersections(): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mouse, new THREE.PerspectiveCamera());
    // This would need access to the actual scene
    // For now, return empty array
    return [];
  }

  private startDragging(object: THREE.Object3D, event: MouseEvent): void {
    this.draggedObject = object;
    object.userData.isDragging = true;

    // Calculate drag offset
    // This would need proper 3D to 2D projection calculations

    // Add visual feedback
    this.addDragVisualFeedback(object);
  }

  private updateDraggedObjectPosition(event: MouseEvent): void {
    if (!this.draggedObject) return;

    // Update object position based on mouse movement
    // This would need proper 3D positioning logic
  }

  private stopDragging(): void {
    if (!this.draggedObject) return;

    this.draggedObject.userData.isDragging = false;
    this.draggedObject = null;

    // Remove visual feedback
    this.removeDragVisualFeedback();
  }

  private cancelDragging(): void {
    if (!this.draggedObject) return;

    // Return object to original position
    if (this.draggedObject.userData.originalPosition) {
      this.draggedObject.position.copy(this.draggedObject.userData.originalPosition);
    }

    this.stopDragging();
  }

  private addDragVisualFeedback(object: THREE.Object3D): void {
    // Add visual feedback for dragging state
    object.scale.multiplyScalar(1.1);
  }

  private removeDragVisualFeedback(): void {
    // Remove drag visual feedback
    if (this.draggedObject) {
      this.draggedObject.scale.divideScalar(1.1);
    }
  }

  // Utility methods
  private findSceneObjectById(scene: THREE.Scene, id: string): THREE.Object3D | null {
    let found: THREE.Object3D | null = null;

    scene.traverse((object) => {
      if (object.userData && object.userData.id === id) {
        found = object;
      }
    });

    return found;
  }

  private addHighlightEffect(object: THREE.Object3D): void {
    // Add highlight material or outline effect to object
    object.userData.originalEmissive = object.userData.originalEmissive || new THREE.Color();
    if (object instanceof THREE.Mesh && object.material) {
      object.userData.originalEmissive.copy((object.material as THREE.MeshLambertMaterial).emissive);
      (object.material as THREE.MeshLambertMaterial).emissive.setHex(0x444444);
    }
  }

  private createArrowGuide(arrow: any, scene: THREE.Scene): void {
    // Create 3D arrow geometry for visual guidance
    const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
    const arrowMaterial = new THREE.MeshBasicMaterial({ color: arrow.color });
    const arrowMesh = new THREE.Mesh(arrowGeometry, arrowMaterial);

    arrowMesh.position.copy(arrow.start);
    arrowMesh.lookAt(arrow.end);

    scene.add(arrowMesh);
  }

  private showOverlayText(text: string): void {
    // Show overlay text in the 3D scene or as HUD element
    console.log('Overlay text:', text);
  }

  private showHint(stepId: string, hintType: string): void {
    // Show contextual hints based on step and user behavior
    const hint = this.currentTutorial?.hints.find(h => h.id === hintType);
    if (hint) {
      this.showTextFeedback(hint.content, hint.persistence);
    }
  }

  private clearStepInteractions(): void {
    // Clear any existing interaction handlers
    this.draggedObject = null;
  }

  private startStepAnimations(step: TutorialStep, scene: THREE.Scene): void {
    // Start animations for the current step
    step.visualGuide.animations.forEach(animationId => {
      this.startAnimation(animationId, scene);
    });
  }

  private startAnimation(animationId: string, scene: THREE.Scene): void {
    // Start specific animations based on ID
    switch (animationId) {
      case 'highlight-tetrahedron':
        this.animateTetrahedronHighlight(scene);
        break;
      case 'show-flower-pattern':
        this.animateFlowerPattern(scene);
        break;
    }
  }

  private animateTetrahedronHighlight(scene: THREE.Scene): void {
    // Animate tetrahedron highlighting
    const tetrahedron = this.findSceneObjectById(scene, 'tetrahedron');
    if (tetrahedron) {
      // Add pulsing animation
      const animate = () => {
        const time = Date.now() * 0.001;
        const scale = 1 + Math.sin(time * 2) * 0.1;
        tetrahedron.scale.setScalar(scale);
        requestAnimationFrame(animate);
      };
      animate();
    }
  }

  private animateFlowerPattern(scene: THREE.Scene): void {
    // Animate flower of life pattern reveal
    const flowerPoints = this.findSceneObjectById(scene, 'flower-points');
    if (flowerPoints) {
      // Add sequential reveal animation
      console.log('Animating flower pattern reveal');
    }
  }

  private initializeTutorialProgress(userId: string, tutorialId: string): void {
    // Initialize or update user progress for this tutorial
    const existingProgress = this.userProgress.get(userId);

    if (existingProgress) {
      // Update existing progress
      existingProgress.lastAccessed = new Date();
    } else {
      // Create new progress entry
      const newProgress: LearningProgress = {
        userId,
        topicId: tutorialId,
        currentLevel: 1,
        experiencePoints: 0,
        masteryScore: 0,
        timeSpent: 0,
        lastAccessed: new Date(),
        learningPath: [],
        achievements: []
      };

      this.userProgress.set(userId, newProgress);
    }
  }

  private setupSequenceInteraction(criteria: ValidationCriteria, scene: THREE.Scene, camera: THREE.Camera): void {
    // Setup click sequence validation
    criteria.value.forEach((pointId: string, index: number) => {
      const point = this.findSceneObjectById(scene, pointId);
      if (point) {
        point.userData.clickOrder = index;
        point.userData.onClick = () => this.handleSequenceClick(pointId, index);
      }
    });
  }

  private handleSequenceClick(pointId: string, expectedIndex: number): void {
    // Handle sequence click validation
    console.log(`Clicked ${pointId}, expected index: ${expectedIndex}`);
  }

  private createTraceCanvas(step: TutorialStep, scene: THREE.Scene): void {
    // Create canvas for drawing/tracing interactions
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    canvas.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid #fff;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1000;
    `;

    document.body.appendChild(canvas);

    // Setup canvas drawing
    this.setupCanvasDrawing(canvas, step);
  }

  private setupCanvasDrawing(canvas: HTMLCanvasElement, step: TutorialStep): void {
    // Setup canvas for trace/drawing interactions
    const ctx = canvas.getContext('2d')!;
    let isDrawing = false;

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isDrawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      this.validateTraceDrawing(ctx, step);
    });
  }

  private validateTraceDrawing(ctx: CanvasRenderingContext2D, step: TutorialStep): void {
    // Validate the user's drawing against expected pattern
    // This would use image comparison or path analysis
    console.log('Validating trace drawing');
  }

  private handleError(code: string, error: any, context: Record<string, any>): void {
    const learningError = {
      code,
      message: error.message || 'Unknown error',
      severity: 'medium' as any,
      context,
      timestamp: new Date(),
      sessionId: `tutorial_${Date.now()}`
    };

    this.emitEvent(LearningEventType.ERROR_OCCURRED, learningError);
    console.error('InteractiveLearningModule Error:', learningError);
  }

  // Cleanup
  dispose(): void {
    this.activeTutorials.clear();
    this.currentTutorial = null;
    this.userProgress.clear();
    this.eventListeners.clear();
    this.stepAttempts.clear();
    this.stepScores.clear();
    this.hintRequests.clear();
  }
}