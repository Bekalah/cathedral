/**
 * @cathedral/learning-engine
 * Assessment engine for measuring learning outcomes and providing feedback
 * Integrates with adaptive learning systems to evaluate user progress
 */

import * as THREE from 'three';
import {
  AssessmentData,
  AssessmentQuestion,
  AssessmentConfiguration,
  AssessmentScoring,
  AssessmentFeedback,
  LearningProgress,
  LearningNode,
  LearningContent,
  LearningDifficulty,
  QuestionType,
  AssessmentType,
  AssessmentCriteria,
  LearningEvent,
  LearningEventType,
  Achievement,
  AchievementRarity,
  Reward,
  RewardType,
  UserProgress,
  AssessmentResults
} from '../types/LearningTypes';

// Interface for the Learning Assessment Engine
export interface ILearningAssessmentEngine {
  startAssessment(
    assessmentId: string,
    userId: string,
    scene?: THREE.Scene,
    camera?: THREE.Camera
  ): Promise<void>;

  addEventListener(type: LearningEventType, listener: Function): void;
  removeEventListener(type: LearningEventType, listener: Function): void;

  dispose(): void;
}

// Supporting interfaces
interface QuestionAnalytics {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  averageScore: number;
  averageTime: number;
}

export class LearningAssessmentEngine implements ILearningAssessmentEngine {
  private activeAssessments: Map<string, AssessmentData> = new Map();
  private userProgress: UserProgress = new Map();
  private assessmentResults: AssessmentResults = new Map();
  private eventListeners: Map<LearningEventType, Function[]> = new Map();

  // Assessment state tracking
  private currentAssessment: AssessmentData | null = null;
  private currentQuestionIndex: number = 0;
  private userResponses: Map<string, any> = new Map();
  private assessmentTimer: number | null = null;
  private timeRemaining: number = 0;

  // Analytics and feedback
  private questionAnalytics: Map<string, QuestionAnalytics> = new Map();
  private assessmentFeedback: Map<string, AssessmentFeedback> = new Map();

  constructor() {
    this.initializeEventSystem();
    this.loadDefaultAssessments();
  }

  private initializeEventSystem(): void {
    Object.values(LearningEventType).forEach(eventType => {
      this.eventListeners.set(eventType, []);
    });
  }

  private loadDefaultAssessments(): void {
    // Load default assessment templates for different topics
    this.createSacredGeometryAssessment();
    this.createFusionMechanicsAssessment();
    this.createConsciousnessFieldsAssessment();
  }

  private createSacredGeometryAssessment(): void {
    const assessment: AssessmentData = {
      questions: [
        {
          id: 'q1',
          type: QuestionType.MULTIPLE_CHOICE,
          prompt: 'Which of the following is NOT one of the five Platonic solids?',
          options: [
            { id: 'a', text: 'Tetrahedron', value: 'tetrahedron', isCorrect: false, explanation: 'Tetrahedron is a Platonic solid' },
            { id: 'b', text: 'Cube', value: 'cube', isCorrect: false, explanation: 'Cube is a Platonic solid' },
            { id: 'c', text: 'Pyramid', value: 'pyramid', isCorrect: true, explanation: 'Pyramid is not a Platonic solid - it has different face shapes' },
            { id: 'd', text: 'Icosahedron', value: 'icosahedron', isCorrect: false, explanation: 'Icosahedron is a Platonic solid' }
          ],
          correctAnswer: 'pyramid',
          explanation: 'Platonic solids have identical regular polygon faces and identical vertices',
          difficulty: LearningDifficulty.BEGINNER,
          tags: ['platonic-solids', 'geometry'],
          timeLimit: 60,
          hints: [
            'Platonic solids have all identical faces',
            'Consider the regularity of each shape'
          ]
        },
        {
          id: 'q2',
          type: QuestionType.DRAG_DROP,
          prompt: 'Match each Platonic solid with its number of faces',
          options: [
            { id: 't1', text: 'Tetrahedron', value: 'tetrahedron', isCorrect: false },
            { id: 'c1', text: 'Cube', value: 'cube', isCorrect: false },
            { id: 'o1', text: 'Octahedron', value: 'octahedron', isCorrect: false },
            { id: 'd1', text: 'Dodecahedron', value: 'dodecahedron', isCorrect: false },
            { id: 'i1', text: 'Icosahedron', value: 'icosahedron', isCorrect: false }
          ],
          correctAnswer: {
            tetrahedron: 4,
            cube: 6,
            octahedron: 8,
            dodecahedron: 12,
            icosahedron: 20
          },
          explanation: 'Each Platonic solid has a specific number of identical faces',
          difficulty: LearningDifficulty.INTERMEDIATE,
          tags: ['platonic-solids', 'faces', 'matching'],
          timeLimit: 120,
          hints: [
            'Tetrahedron has the fewest faces',
            'Icosahedron has the most faces'
          ]
        },
        {
          id: 'q3',
          type: QuestionType.SEQUENCE,
          prompt: 'Arrange the Platonic solids in order from fewest to most faces',
          options: [
            { id: 'tet', text: 'Tetrahedron (4)', value: 4, isCorrect: false },
            { id: 'hex', text: 'Hexahedron/Cube (6)', value: 6, isCorrect: false },
            { id: 'oct', text: 'Octahedron (8)', value: 8, isCorrect: false },
            { id: 'dod', text: 'Dodecahedron (12)', value: 12, isCorrect: false },
            { id: 'ico', text: 'Icosahedron (20)', value: 20, isCorrect: false }
          ],
          correctAnswer: [4, 6, 8, 12, 20],
          explanation: 'The correct order is: Tetrahedron (4), Cube (6), Octahedron (8), Dodecahedron (12), Icosahedron (20)',
          difficulty: LearningDifficulty.INTERMEDIATE,
          tags: ['platonic-solids', 'sequence', 'faces'],
          timeLimit: 90,
          hints: [
            'Start with the simplest shape',
            'End with the most complex shape'
          ]
        }
      ],
      configuration: {
        randomizeOrder: false,
        allowReview: true,
        showResults: true,
        timeLimit: 600, // 10 minutes total
        attemptsAllowed: 2,
        passingScore: 70
      },
      scoring: {
        pointsPerQuestion: 10,
        penaltyPerAttempt: 2,
        bonusForSpeed: true,
        curveGrading: false
      },
      feedback: {
        showCorrectAnswers: true,
        detailedExplanations: true,
        personalizedHints: true,
        progressTracking: true
      }
    };

    this.activeAssessments.set('sacred-geometry-quiz', assessment);
  }

  private createFusionMechanicsAssessment(): void {
    const assessment: AssessmentData = {
      questions: [
        {
          id: 'f1',
          type: QuestionType.MULTIPLE_CHOICE,
          prompt: 'What is the primary principle behind fusion mechanics?',
          options: [
            { id: 'a', text: 'Harmonic resonance', value: 'resonance', isCorrect: true, explanation: 'Harmonic resonance is the foundation of fusion mechanics' },
            { id: 'b', text: 'Physical collision', value: 'collision', isCorrect: false, explanation: 'Fusion mechanics is about energy alignment, not physical collision' },
            { id: 'c', text: 'Chemical reaction', value: 'chemical', isCorrect: false, explanation: 'Fusion mechanics operates on energetic and consciousness levels' },
            { id: 'd', text: 'Random chance', value: 'random', isCorrect: false, explanation: 'Fusion mechanics follows precise harmonic principles' }
          ],
          correctAnswer: 'resonance',
          explanation: 'Fusion mechanics is fundamentally about achieving harmonic resonance between different energy patterns',
          difficulty: LearningDifficulty.BEGINNER,
          tags: ['fusion', 'resonance', 'principles'],
          timeLimit: 45,
          hints: [
            'Think about musical harmony',
            'Consider how vibrations interact'
          ]
        }
      ],
      configuration: {
        randomizeOrder: false,
        allowReview: true,
        showResults: true,
        timeLimit: 300,
        attemptsAllowed: 2,
        passingScore: 75
      },
      scoring: {
        pointsPerQuestion: 15,
        penaltyPerAttempt: 3,
        bonusForSpeed: false,
        curveGrading: true
      },
      feedback: {
        showCorrectAnswers: true,
        detailedExplanations: true,
        personalizedHints: true,
        progressTracking: true
      }
    };

    this.activeAssessments.set('fusion-mechanics-quiz', assessment);
  }

  private createConsciousnessFieldsAssessment(): void {
    const assessment: AssessmentData = {
      questions: [
        {
          id: 'c1',
          type: QuestionType.TRUE_FALSE,
          prompt: 'Consciousness fields can interact across any distance instantaneously',
          options: [
            { id: 't', text: 'True', value: true, isCorrect: true, explanation: 'Consciousness fields transcend physical distance limitations' },
            { id: 'f', text: 'False', value: false, isCorrect: false, explanation: 'Consciousness operates beyond spacetime constraints' }
          ],
          correctAnswer: true,
          explanation: 'Consciousness fields are not bound by physical distance or conventional time constraints',
          difficulty: LearningDifficulty.ADVANCED,
          tags: ['consciousness', 'fields', 'quantum'],
          timeLimit: 60,
          hints: [
            'Consider quantum entanglement',
            'Think beyond physical limitations'
          ]
        }
      ],
      configuration: {
        randomizeOrder: false,
        allowReview: true,
        showResults: true,
        timeLimit: 180,
        attemptsAllowed: 3,
        passingScore: 80
      },
      scoring: {
        pointsPerQuestion: 20,
        penaltyPerAttempt: 5,
        bonusForSpeed: false,
        curveGrading: true
      },
      feedback: {
        showCorrectAnswers: true,
        detailedExplanations: true,
        personalizedHints: true,
        progressTracking: true
      }
    };

    this.activeAssessments.set('consciousness-fields-quiz', assessment);
  }

  // Public API methods

  async startAssessment(
    assessmentId: string,
    userId: string,
    scene?: THREE.Scene,
    camera?: THREE.Camera
  ): Promise<void> {
    const assessment = this.activeAssessments.get(assessmentId);
    if (!assessment) {
      throw new Error(`Assessment ${assessmentId} not found`);
    }

    // Initialize assessment state
    this.currentAssessment = assessment;
    this.currentQuestionIndex = 0;
    this.userResponses.clear();

    // Setup timer if time limit is specified
    if (assessment.configuration.timeLimit) {
      this.timeRemaining = assessment.configuration.timeLimit;
      this.assessmentTimer = window.setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining <= 0) {
          this.handleTimeUp();
        }
      }, 1000);
    }

    // Initialize user progress tracking
    const existingProgress = this.userProgress.get(userId);
    if (existingProgress) {
      existingProgress.lastAccessed = new Date();
    }

    // Setup 3D scene if provided
    if (scene && camera) {
      await this.setupAssessmentScene(assessment, scene, camera);
    }

    // Start first question
    await this.presentQuestion(assessment.questions[0], scene, camera);

    // Emit assessment start event
    this.emitEvent(LearningEventType.ASSESSMENT_START, {
      assessmentId,
      userId,
      totalQuestions: assessment.questions.length,
      timeLimit: assessment.configuration.timeLimit
    });
  }

  private startAssessmentTimer(totalTime: number): void {
    this.timeRemaining = totalTime;

    this.assessmentTimer = window.setInterval(() => {
      this.timeRemaining--;

      // Emit time update event
      this.emitEvent(LearningEventType.PROGRESS_UPDATE, {
        timeRemaining: this.timeRemaining,
        assessmentId: this.currentAssessment?.questions.map(q => q.id)
      });

      if (this.timeRemaining <= 0) {
        this.handleTimeUp();
      }
    }, 1000);
  }

  private handleTimeUp(): void {
    if (this.assessmentTimer) {
      clearInterval(this.assessmentTimer);
      this.assessmentTimer = null;
    }

    // Auto-submit current assessment
    this.submitCurrentAssessment();

    // Show time-up feedback
    this.showTimeUpFeedback();
  }

  private showTimeUpFeedback(): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      z-index: 1002;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    modal.innerHTML = `
      <h2 style="margin: 0 0 20px 0;">⏰ Time's Up!</h2>
      <p style="margin: 10px 0;">The assessment has been automatically submitted.</p>
      <p style="margin: 10px 0; font-size: 14px; opacity: 0.9;">Don't worry - we'll calculate your score based on completed questions.</p>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 5000);
  }

  private async presentQuestion(
    question: AssessmentQuestion,
    scene?: THREE.Scene,
    camera?: THREE.Camera
  ): Promise<void> {
    // Clear previous question
    this.clearQuestionDisplay();

    // Display question based on type
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        this.displayMultipleChoiceQuestion(question);
        break;
      case QuestionType.TRUE_FALSE:
        this.displayTrueFalseQuestion(question);
        break;
      case QuestionType.DRAG_DROP:
        this.displayDragDropQuestion(question, scene);
        break;
      case QuestionType.SEQUENCE:
        this.displaySequenceQuestion(question, scene);
        break;
      case QuestionType.MATCHING:
        this.displayMatchingQuestion(question, scene);
        break;
      default:
        this.displayTextQuestion(question);
    }

    // Setup question timer if specified
    if (question.timeLimit) {
      this.startQuestionTimer(question.timeLimit, question.id);
    }

    // Setup hints
    this.setupQuestionHints(question);
  }

  private displayMultipleChoiceQuestion(question: AssessmentQuestion): void {
    const container = this.createQuestionContainer();

    // Question prompt
    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    prompt.style.cssText = `
      margin: 0 0 20px 0;
      color: #333;
      font-size: 18px;
      line-height: 1.4;
    `;
    container.appendChild(prompt);

    // Answer options
    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = `
      display: grid;
      gap: 15px;
      margin: 20px 0;
    `;

    question.options!.forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.style.cssText = `
        padding: 15px;
        border: 2px solid #ddd;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
      `;

      optionElement.innerHTML = `
        <div style="font-weight: bold; color: #4a90e2;">${String.fromCharCode(65 + index)}.</div>
        <div style="margin-top: 5px;">${option.text}</div>
      `;

      optionElement.addEventListener('click', () => {
        this.selectMultipleChoiceOption(optionElement, option, question.id);
      });

      optionElement.addEventListener('mouseenter', () => {
        optionElement.style.borderColor = '#4a90e2';
        optionElement.style.backgroundColor = '#f8f9ff';
      });

      optionElement.addEventListener('mouseleave', () => {
        if (!optionElement.classList.contains('selected')) {
          optionElement.style.borderColor = '#ddd';
          optionElement.style.backgroundColor = 'white';
        }
      });

      optionsContainer.appendChild(optionElement);
    });

    container.appendChild(optionsContainer);

    // Hints section
    if (question.hints.length > 0) {
      const hintsSection = this.createHintsSection(question.hints);
      container.appendChild(hintsSection);
    }

    document.body.appendChild(container);
  }

  private selectMultipleChoiceOption(
    element: HTMLElement,
    option: any,
    questionId: string
  ): void {
    // Remove previous selection
    document.querySelectorAll('.selected').forEach(el => {
      el.classList.remove('selected');
      el.style.borderColor = '#ddd';
      el.style.backgroundColor = 'white';
    });

    // Mark as selected
    element.classList.add('selected');
    element.style.borderColor = '#4a90e2';
    element.style.backgroundColor = '#e8f2ff';

    // Store response
    this.userResponses.set(questionId, option.value);

    // Show submit button
    this.showSubmitButton(questionId);
  }

  private showSubmitButton(questionId: string): void {
    let submitButton = document.getElementById('submit-answer-btn') as HTMLButtonElement;

    if (!submitButton) {
      submitButton = document.createElement('button');
      submitButton.id = 'submit-answer-btn';
      submitButton.textContent = 'Submit Answer';
      submitButton.style.cssText = `
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin: 20px auto;
        display: block;
        transition: transform 0.2s ease;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
      `;

      submitButton.addEventListener('click', () => {
        this.submitCurrentAnswer(questionId);
      });

      submitButton.addEventListener('mouseenter', () => {
        submitButton.style.transform = 'translateY(-2px)';
        submitButton.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
      });

      submitButton.addEventListener('mouseleave', () => {
        submitButton.style.transform = 'translateY(0)';
        submitButton.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
      });

      document.body.appendChild(submitButton);
    }
  }

  private submitCurrentAnswer(questionId: string): void {
    const response = this.userResponses.get(questionId);
    if (!response) return;

    const question = this.currentAssessment?.questions.find(q => q.id === questionId);
    if (!question) return;

    // Validate answer
    const isCorrect = this.validateAnswer(question, response);

    // Calculate score
    const score = this.calculateQuestionScore(question, isCorrect);

    // Store result
    this.storeQuestionResult(questionId, response, isCorrect, score);

    // Show feedback
    this.showAnswerFeedback(question, isCorrect, response);

    // Move to next question or complete assessment
    setTimeout(() => {
      this.nextQuestion();
    }, 3000);
  }

  private validateAnswer(question: AssessmentQuestion, response: any): boolean {
    if (typeof question.correctAnswer === 'object') {
      // Handle complex answer types (drag-drop, matching, etc.)
      return this.validateComplexAnswer(question, response);
    }

    return question.correctAnswer === response;
  }

  private validateComplexAnswer(question: AssessmentQuestion, response: any): boolean {
    // Handle complex answer validation
    switch (question.type) {
      case QuestionType.DRAG_DROP:
        return this.validateDragDropAnswer(question, response);
      case QuestionType.SEQUENCE:
        return this.validateSequenceAnswer(question, response);
      case QuestionType.MATCHING:
        return this.validateMatchingAnswer(question, response);
      default:
        return false;
    }
  }

  private validateDragDropAnswer(question: AssessmentQuestion, response: any): boolean {
    // Validate drag and drop matching
    const correctAnswer = question.correctAnswer as Record<string, any>;
    let correctCount = 0;

    for (const [key, value] of Object.entries(response)) {
      if (correctAnswer[key] === value) {
        correctCount++;
      }
    }

    return correctCount / Object.keys(correctAnswer).length >= 0.8; // 80% correct
  }

  private validateSequenceAnswer(question: AssessmentQuestion, response: any): boolean {
    const correctSequence = question.correctAnswer as any[];
    return JSON.stringify(response) === JSON.stringify(correctSequence);
  }

  private validateMatchingAnswer(question: AssessmentQuestion, response: any): boolean {
    const correctAnswer = question.correctAnswer as Record<string, string>;
    let correctCount = 0;

    for (const [item, match] of Object.entries(response)) {
      if (correctAnswer[item] === match) {
        correctCount++;
      }
    }

    return correctCount / Object.keys(correctAnswer).length >= 0.8;
  }

  private calculateQuestionScore(question: AssessmentQuestion, isCorrect: boolean): number {
    if (!this.currentAssessment) return 0;

    const basePoints = this.currentAssessment.scoring.pointsPerQuestion;
    let score = isCorrect ? basePoints : 0;

    // Apply speed bonus if enabled
    if (isCorrect && this.currentAssessment.scoring.bonusForSpeed) {
      const timeBonus = this.calculateTimeBonus(question);
      score += timeBonus;
    }

    return score;
  }

  private calculateTimeBonus(question: AssessmentQuestion): number {
    // Calculate bonus based on how quickly the question was answered
    const timeSpent = this.getTimeSpentOnQuestion(question.id);
    const timeLimit = question.timeLimit || 60;

    if (timeSpent < timeLimit * 0.3) {
      return 5; // Fast completion bonus
    } else if (timeSpent < timeLimit * 0.6) {
      return 3; // Moderate speed bonus
    }

    return 0;
  }

  private getTimeSpentOnQuestion(questionId: string): number {
    // This would track actual time spent on each question
    // For now, return a mock value
    return 30;
  }

  private storeQuestionResult(
    questionId: string,
    response: any,
    isCorrect: boolean,
    score: number
  ): void {
    const result = {
      questionId,
      response,
      isCorrect,
      score,
      timestamp: new Date(),
      timeSpent: this.getTimeSpentOnQuestion(questionId)
    };

    // Store in assessment results
    const assessmentId = this.currentAssessment?.questions.map(q => q.id).join('_');
    if (assessmentId) {
      let results = this.assessmentResults.get(assessmentId) || [];
      results.push(result);
      this.assessmentResults.set(assessmentId, results);
    }

    // Update analytics
    this.updateQuestionAnalytics(questionId, isCorrect, score);
  }

  private updateQuestionAnalytics(questionId: string, isCorrect: boolean, score: number): void {
    const existing = this.questionAnalytics.get(questionId) || {
      questionId,
      timesAnswered: 0,
      timesCorrect: 0,
      averageScore: 0,
      averageTime: 0
    };

    existing.timesAnswered++;
    if (isCorrect) existing.timesCorrect++;
    existing.averageScore = (existing.averageScore * (existing.timesAnswered - 1) + score) / existing.timesAnswered;

    this.questionAnalytics.set(questionId, existing);
  }

  private showAnswerFeedback(question: AssessmentQuestion, isCorrect: boolean, response: any): void {
    const feedback = isCorrect ?
      this.createSuccessFeedback(question, response) :
      this.createErrorFeedback(question, response);

    this.displayFeedbackModal(feedback);
  }

  private createSuccessFeedback(question: AssessmentQuestion, response: any): any {
    return {
      type: 'success',
      title: '✅ Correct!',
      message: 'Well done! Your answer is correct.',
      explanation: question.explanation,
      score: this.calculateQuestionScore(question, true),
      color: '#4CAF50'
    };
  }

  private createErrorFeedback(question: AssessmentQuestion, response: any): any {
    return {
      type: 'error',
      title: '❌ Incorrect',
      message: 'Not quite right. Let\'s learn from this.',
      explanation: question.explanation,
      correctAnswer: question.correctAnswer,
      score: 0,
      color: '#f44336'
    };
  }

  private displayFeedbackModal(feedback: any): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${feedback.color};
      color: white;
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      z-index: 1002;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      animation: slideInUp 0.5s ease-out;
    `;

    modal.innerHTML = `
      <h2 style="margin: 0 0 20px 0;">${feedback.title}</h2>
      <p style="margin: 10px 0; font-size: 18px;">${feedback.message}</p>
      <p style="margin: 15px 0; font-size: 16px; opacity: 0.9;">${feedback.explanation}</p>
      ${feedback.score !== undefined ? `<p style="margin: 10px 0; font-size: 24px; font-weight: bold;">Score: ${feedback.score} points</p>` : ''}
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
      if (modal.parentNode) {
        modal.style.animation = 'slideOutDown 0.5s ease-in';
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 500);
      }
    }, 2500);
  }

  private nextQuestion(): void {
    if (!this.currentAssessment) return;

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.currentAssessment.questions.length) {
      this.completeAssessment();
    } else {
      const nextQuestion = this.currentAssessment.questions[this.currentQuestionIndex];
      this.presentQuestion(nextQuestion);
    }
  }

  private completeAssessment(): void {
    if (!this.currentAssessment) return;

    // Calculate final score
    const totalScore = this.calculateAssessmentScore();

    // Determine pass/fail status
    const passed = totalScore >= this.currentAssessment.configuration.passingScore;

    // Generate detailed results
    const results = this.generateAssessmentResults(totalScore, passed);

    // Award achievements and rewards
    this.awardAssessmentRewards(results);

    // Show completion screen
    this.showAssessmentCompletion(results);

    // Emit completion event
    this.emitEvent(LearningEventType.ASSESSMENT_COMPLETE, {
      assessmentId: this.currentAssessment.questions.map(q => q.id),
      finalScore: totalScore,
      passed,
      results
    });

    // Clean up
    this.cleanupAssessment();
  }

  private calculateAssessmentScore(): number {
    if (!this.currentAssessment) return 0;

    const totalPossible = this.currentAssessment.questions.length * this.currentAssessment.scoring.pointsPerQuestion;
    const earnedScore = Array.from(this.assessmentResults.values())
      .flat()
      .reduce((sum, result) => sum + result.score, 0);

    return Math.round((earnedScore / totalPossible) * 100);
  }

  private generateAssessmentResults(totalScore: number, passed: boolean): any {
    return {
      totalScore,
      passed,
      questionsAttempted: this.currentAssessment?.questions.length || 0,
      questionsCorrect: Array.from(this.assessmentResults.values()).flat()
        .filter(result => result.isCorrect).length,
      timeSpent: this.getTotalAssessmentTime(),
      detailedResults: Array.from(this.assessmentResults.values()).flat(),
      recommendations: this.generateImprovementRecommendations(totalScore),
      strengths: this.identifyAssessmentStrengths(),
      areasForImprovement: this.identifyAssessmentWeaknesses()
    };
  }

  private generateImprovementRecommendations(score: number): string[] {
    const recommendations: string[] = [];

    if (score < 60) {
      recommendations.push('Consider reviewing the fundamental concepts before retaking');
      recommendations.push('Focus on understanding the core principles');
    } else if (score < 80) {
      recommendations.push('Review the topics you found most challenging');
      recommendations.push('Practice similar questions to reinforce learning');
    } else {
      recommendations.push('Excellent work! Consider exploring advanced topics');
      recommendations.push('Share your knowledge by helping others learn');
    }

    return recommendations;
  }

  private identifyAssessmentStrengths(): string[] {
    const strengths: string[] = [];
    const results = Array.from(this.assessmentResults.values()).flat();

    // Analyze which types of questions were answered correctly most often
    const correctByType = new Map<QuestionType, number>();
    const totalByType = new Map<QuestionType, number>();

    results.forEach(result => {
      const question = this.currentAssessment?.questions.find(q => q.id === result.questionId);
      if (question) {
        totalByType.set(question.type, (totalByType.get(question.type) || 0) + 1);
        if (result.isCorrect) {
          correctByType.set(question.type, (correctByType.get(question.type) || 0) + 1);
        }
      }
    });

    // Identify strengths
    for (const [type, correct] of correctByType.entries()) {
      const total = totalByType.get(type) || 1;
      const accuracy = correct / total;

      if (accuracy > 0.8) {
        strengths.push(`Strong performance on ${type} questions`);
      }
    }

    return strengths;
  }

  private identifyAssessmentWeaknesses(): string[] {
    const weaknesses: string[] = [];
    const results = Array.from(this.assessmentResults.values()).flat();

    // Analyze which types of questions were answered incorrectly most often
    const incorrectByType = new Map<QuestionType, number>();

    results.forEach(result => {
      if (!result.isCorrect) {
        const question = this.currentAssessment?.questions.find(q => q.id === result.questionId);
        if (question) {
          incorrectByType.set(question.type, (incorrectByType.get(question.type) || 0) + 1);
        }
      }
    });

    // Identify weaknesses
    for (const [type, incorrect] of incorrectByType.entries()) {
      if (incorrect > 0) {
        weaknesses.push(`May need additional practice with ${type} questions`);
      }
    }

    return weaknesses;
  }

  private awardAssessmentRewards(results: any): void {
    if (!results.passed) return;

    // Award experience points
    const experienceReward = Math.floor(results.totalScore * 2); // 2x score as XP

    // Award achievement based on score
    let achievement: Achievement;

    if (results.totalScore >= 95) {
      achievement = {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Achieved a perfect score on the assessment',
        icon: 'perfect-star',
        rarity: AchievementRarity.LEGENDARY,
        unlockedAt: new Date()
      };
    } else if (results.totalScore >= 85) {
      achievement = {
        id: 'excellent_score',
        name: 'Excellence Achieved',
        description: 'Scored 85% or higher on the assessment',
        icon: 'excellence-badge',
        rarity: AchievementRarity.EPIC,
        unlockedAt: new Date()
      };
    } else {
      achievement = {
        id: 'passing_score',
        name: 'Knowledge Seeker',
        description: 'Successfully passed the assessment',
        icon: 'knowledge-badge',
        rarity: AchievementRarity.COMMON,
        unlockedAt: new Date()
      };
    }

    // Emit achievement unlock event
    this.emitEvent(LearningEventType.ACHIEVEMENT_UNLOCK, {
      achievement,
      experienceReward
    });
  }

  private showAssessmentCompletion(results: any): void {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${results.passed ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #ff9a9e, #fecfef)'};
      color: white;
      padding: 40px;
      border-radius: 25px;
      text-align: center;
      z-index: 1002;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      animation: celebrationEntrance 0.8s ease-out;
    `;

    modal.innerHTML = `
      <h1 style="margin: 0 0 20px 0; font-size: 36px;">
        ${results.passed ? '🎉 Assessment Complete!' : '📚 Assessment Complete'}
      </h1>
      <div style="font-size: 48px; margin: 20px 0; font-weight: bold;">
        ${results.totalScore}%
      </div>
      <p style="margin: 10px 0; font-size: 18px;">
        ${results.passed ? 'Congratulations! You passed!' : 'Keep learning - you\'ll get there!'}
      </p>
      <div style="margin: 20px 0;">
        <p style="margin: 5px 0;">Questions Correct: ${results.questionsCorrect}/${results.questionsAttempted}</p>
        <p style="margin: 5px 0;">Time Spent: ${Math.round(results.timeSpent / 60)} minutes</p>
      </div>
      ${results.passed ?
        '<p style="margin: 15px 0; color: #ffd700;">🏆 Achievement Unlocked!</p>' :
        '<p style="margin: 15px 0;">💪 Great effort! Try again to improve your score.</p>'
      }
    `;

    document.body.appendChild(modal);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (modal.parentNode) {
        modal.style.animation = 'fadeOut 0.5s ease-in';
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 500);
      }
    }, 10000);
  }

  private getTotalAssessmentTime(): number {
    // Calculate total time spent on assessment
    // This would track actual time spent
    return 300; // 5 minutes for now
  }

  private cleanupAssessment(): void {
    // Clean up assessment state
    this.currentAssessment = null;
    this.currentQuestionIndex = 0;
    this.userResponses.clear();

    if (this.assessmentTimer) {
      clearInterval(this.assessmentTimer);
      this.assessmentTimer = null;
    }

    this.clearQuestionDisplay();
  }

  private clearQuestionDisplay(): void {
    // Remove current question UI elements
    const container = document.getElementById('question-container');
    if (container) {
      container.remove();
    }

    const submitButton = document.getElementById('submit-answer-btn');
    if (submitButton) {
      submitButton.remove();
    }
  }

  private createQuestionContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'question-container';
    container.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 1001;
      animation: slideInUp 0.5s ease-out;
    `;

    return container;
  }

  private createHintsSection(hints: string[]): HTMLElement {
    const hintsSection = document.createElement('div');
    hintsSection.style.cssText = `
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      border-left: 4px solid #4a90e2;
    `;

    const hintsTitle = document.createElement('h4');
    hintsTitle.textContent = '💡 Need a hint?';
    hintsTitle.style.cssText = `
      margin: 0 0 15px 0;
      color: #4a90e2;
      font-size: 16px;
    `;

    hintsSection.appendChild(hintsTitle);

    const hintsList = document.createElement('ul');
    hintsList.style.cssText = `
      margin: 0;
      padding-left: 20px;
      color: #666;
    `;

    hints.forEach((hint, index) => {
      const hintItem = document.createElement('li');
      hintItem.textContent = hint;
      hintItem.style.cssText = `
        margin: 8px 0;
        line-height: 1.4;
      `;

      // Initially hide hints
      hintItem.style.opacity = '0.5';
      hintItem.style.transition = 'opacity 0.3s ease';

      // Show hint on hover
      hintItem.addEventListener('mouseenter', () => {
        hintItem.style.opacity = '1';
      });

      hintsList.appendChild(hintItem);
    });

    hintsSection.appendChild(hintsList);
    return hintsSection;
  }

  private startQuestionTimer(timeLimit: number, questionId: string): void {
    // Start timer for individual question
    let timeLeft = timeLimit;

    const timer = setInterval(() => {
      timeLeft--;

      // Update timer display (would need UI element)
      if (timeLeft <= 0) {
        clearInterval(timer);
        this.handleQuestionTimeout(questionId);
      }
    }, 1000);
  }

  private handleQuestionTimeout(questionId: string): void {
    // Handle when question times out
    this.submitCurrentAnswer(questionId);
  }

  private setupQuestionHints(question: AssessmentQuestion): void {
    // Setup hint system for the question
    // This would create interactive hint buttons or automatic hints
  }

  private initializeAssessmentProgress(userId: string, assessmentId: string): void {
    // Initialize or update assessment progress tracking
    const existingProgress = this.userProgress.get(userId);

    if (existingProgress) {
      existingProgress.lastAccessed = new Date();
    }
  }

  private async setupAssessmentScene(
    assessment: AssessmentData,
    scene: THREE.Scene,
    camera: THREE.Camera
  ): Promise<void> {
    // Setup 3D scene elements for interactive questions
    // This would create 3D objects for drag-drop, matching, etc.

    assessment.questions.forEach(question => {
      if (question.type === QuestionType.DRAG_DROP || question.type === QuestionType.SEQUENCE) {
        this.createInteractiveObjects(question, scene);
      }
    });
  }

  private createInteractiveObjects(question: AssessmentQuestion, scene: THREE.Scene): void {
    // Create 3D objects for interactive questions
    // This would create draggable objects, targets, etc.

    switch (question.type) {
      case QuestionType.DRAG_DROP:
        this.createDragDropObjects(question, scene);
        break;
      case QuestionType.SEQUENCE:
        this.createSequenceObjects(question, scene);
        break;
    }
  }

  private createDragDropObjects(question: AssessmentQuestion, scene: THREE.Scene): void {
    // Create draggable objects and drop targets
    question.options!.forEach((option, index) => {
      // Create draggable object
      const geometry = new THREE.BoxGeometry(1, 1, 0.2);
      const material = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
      const draggableObject = new THREE.Mesh(geometry, material);

      draggableObject.position.set(
        (index - 2) * 2, // Spread objects horizontally
        2, // Above the scene
        0
      );

      draggableObject.userData = {
        draggable: true,
        optionId: option.id,
        originalPosition: draggableObject.position.clone()
      };

      scene.add(draggableObject);
    });
  }

  private createSequenceObjects(question: AssessmentQuestion, scene: THREE.Scene): void {
    // Create objects for sequence arrangement
    question.options!.forEach((option, index) => {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2);
      const material = new THREE.MeshLambertMaterial({ color: 0xe2a04a });
      const sequenceObject = new THREE.Mesh(geometry, material);

      sequenceObject.position.set(
        (index - 2) * 1.5,
        -2, // Below the scene
        0
      );

      sequenceObject.userData = {
        sequenceItem: true,
        optionId: option.id,
        value: option.value
      };

      scene.add(sequenceObject);
    });
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

  // Utility methods for display variations
  private displayTrueFalseQuestion(question: AssessmentQuestion): void {
    // Similar to multiple choice but with True/False options
    const container = this.createQuestionContainer();

    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    container.appendChild(prompt);

    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = `
      display: flex;
      gap: 20px;
      justify-content: center;
      margin: 30px 0;
    `;

    ['True', 'False'].forEach((option, index) => {
      const optionElement = document.createElement('div');
      optionElement.style.cssText = `
        padding: 20px 40px;
        border: 2px solid #ddd;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
        font-size: 18px;
        font-weight: bold;
      `;

      optionElement.textContent = option;
      optionElement.addEventListener('click', () => {
        this.selectTrueFalseOption(optionElement, option.toLowerCase(), question.id);
      });

      optionsContainer.appendChild(optionElement);
    });

    container.appendChild(optionsContainer);
    document.body.appendChild(container);
  }

  private selectTrueFalseOption(element: HTMLElement, value: string, questionId: string): void {
    // Remove previous selection
    document.querySelectorAll('.tf-selected').forEach(el => {
      el.classList.remove('tf-selected');
      el.style.borderColor = '#ddd';
      el.style.backgroundColor = 'white';
    });

    // Mark as selected
    element.classList.add('tf-selected');
    element.style.borderColor = '#4a90e2';
    element.style.backgroundColor = '#e8f2ff';

    this.userResponses.set(questionId, value);
    this.showSubmitButton(questionId);
  }

  private displayDragDropQuestion(question: AssessmentQuestion, scene?: THREE.Scene): void {
    // Display drag-drop question interface
    const container = this.createQuestionContainer();

    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    container.appendChild(prompt);

    const instruction = document.createElement('p');
    instruction.textContent = 'Drag the objects to their correct positions in the 3D scene';
    instruction.style.cssText = `
      color: #666;
      font-style: italic;
      margin: 20px 0;
    `;
    container.appendChild(instruction);

    document.body.appendChild(container);
  }

  private displaySequenceQuestion(question: AssessmentQuestion, scene?: THREE.Scene): void {
    // Display sequence arrangement question
    const container = this.createQuestionContainer();

    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    container.appendChild(prompt);

    const instruction = document.createElement('p');
    instruction.textContent = 'Arrange the objects in the correct order in the 3D scene';
    instruction.style.cssText = `
      color: #666;
      font-style: italic;
      margin: 20px 0;
    `;
    container.appendChild(instruction);

    document.body.appendChild(container);
  }

  private displayMatchingQuestion(question: AssessmentQuestion, scene?: THREE.Scene): void {
    // Display matching question interface
    const container = this.createQuestionContainer();

    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    container.appendChild(prompt);

    document.body.appendChild(container);
  }

  private displayTextQuestion(question: AssessmentQuestion): void {
    // Display short answer or text-based question
    const container = this.createQuestionContainer();

    const prompt = document.createElement('h3');
    prompt.textContent = question.prompt;
    container.appendChild(prompt);

    const input = document.createElement('input');
    input.type = 'text';
    input.style.cssText = `
      width: 100%;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 16px;
      margin: 20px 0;
    `;
    input.placeholder = 'Type your answer here...';

    input.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;
      this.userResponses.set(question.id, value);
      this.showSubmitButton(question.id);
    });

    container.appendChild(input);
    document.body.appendChild(container);
  }

  // Cleanup
  dispose(): void {
    this.activeAssessments.clear();
    this.userProgress.clear();
    this.assessmentResults.clear();
    this.eventListeners.clear();
    this.questionAnalytics.clear();
    this.assessmentFeedback.clear();

    if (this.assessmentTimer) {
      clearInterval(this.assessmentTimer);
    }

    this.clearQuestionDisplay();
  }
}

// Supporting interfaces
interface QuestionAnalytics {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  averageScore: number;
  averageTime: number;
}