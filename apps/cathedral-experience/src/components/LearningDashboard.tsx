/**
 * Learning Dashboard Component
 * Interactive learning experience with 3D graphics and progression tracking
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { type UnifiedCathedralEngine, type EngineState } from '@cathedral/cathedral-engine';

interface LearningDashboardProps {
  engine: UnifiedCathedralEngine;
  engineState: EngineState;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'sacred_geometry' | 'archetypes' | 'mystical_patterns' | 'consciousness' | 'meditation';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  duration: number; // minutes
  prerequisites: string[];
  isCompleted: boolean;
  progress: number;
  unlockProgress: number;
}

interface LearningProgress {
  totalModules: number;
  completedModules: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number; // minutes
  achievements: string[];
  currentModule?: string;
}

const LearningDashboard: React.FC<LearningDashboardProps> = ({ engine, engineState }) => {
  const [modules, setModules] = useState<LearningModule[]>([
    {
      id: 'sacred-geometry-1',
      title: 'Introduction to Sacred Geometry',
      description: 'Learn the fundamental principles of sacred geometry and its role in mystical traditions',
      category: 'sacred_geometry',
      difficulty: 'beginner',
      duration: 30,
      prerequisites: [],
      isCompleted: false,
      progress: 0,
      unlockProgress: 0,
    },
    {
      id: 'archetypes-1',
      title: 'The Major Arcana Archetypes',
      description: 'Explore the 22 major arcana cards and their psychological and spiritual significance',
      category: 'archetypes',
      difficulty: 'beginner',
      duration: 45,
      prerequisites: ['sacred-geometry-1'],
      isCompleted: false,
      progress: 0,
      unlockProgress: 0,
    },
    {
      id: 'mystical-patterns-1',
      title: 'Pattern Recognition in Mystical Systems',
      description: 'Discover how to identify and work with mystical patterns in various traditions',
      category: 'mystical_patterns',
      difficulty: 'intermediate',
      duration: 60,
      prerequisites: ['archetypes-1'],
      isCompleted: false,
      progress: 0,
      unlockProgress: 0,
    },
    {
      id: 'consciousness-1',
      title: 'States of Consciousness',
      description: 'Understanding different levels of awareness and how to navigate them safely',
      category: 'consciousness',
      difficulty: 'intermediate',
      duration: 40,
      prerequisites: ['mystical-patterns-1'],
      isCompleted: false,
      progress: 0,
      unlockProgress: 0,
    },
    {
      id: 'meditation-1',
      title: 'Mystical Meditation Practices',
      description: 'Learn meditation techniques rooted in various mystical traditions',
      category: 'meditation',
      difficulty: 'advanced',
      duration: 75,
      prerequisites: ['consciousness-1'],
      isCompleted: false,
      progress: 0,
      unlockProgress: 0,
    },
  ]);

  const [progress, setProgress] = useState<LearningProgress>({
    totalModules: 5,
    completedModules: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalStudyTime: 0,
    achievements: [],
  });

  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isModuleActive, setIsModuleActive] = useState(false);
  const [studyTimer, setStudyTimer] = useState(0);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);

  // Calculate module availability
  useEffect(() => {
    setModules(prevModules => prevModules.map(module => {
      const completedPrereqs = module.prerequisites.every(prereqId =>
        modules.find(m => m.id === prereqId)?.isCompleted
      );
      const progressToUnlock = module.prerequisites.reduce((total, prereqId) => {
        const prereq = modules.find(m => m.id === prereqId);
        return total + (prereq?.progress || 0);
      }, 0) / module.prerequisites.length;

      return {
        ...module,
        unlockProgress: Math.min(progressToUnlock * 100, 100),
      };
    }));
  }, [modules]);

  // Study timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isModuleActive && selectedModule) {
      interval = setInterval(() => {
        setStudyTimer(prev => prev + 1);

        // Update module progress
        const timeSpent = studyTimer + 1;
        const progressPercent = Math.min((timeSpent / (selectedModule.duration * 60)) * 100, 100);

        setModules(prev => prev.map(m =>
          m.id === selectedModule.id
            ? { ...m, progress: Math.min(progressPercent, 100) }
            : m
        ));

        // Auto-complete when time is up
        if (timeSpent >= selectedModule.duration * 60) {
          handleCompleteModule();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isModuleActive, selectedModule, studyTimer]);

  // Handle starting a module
  const handleStartModule = useCallback((module: LearningModule) => {
    if (module.unlockProgress < 100) return;

    setSelectedModule(module);
    setIsModuleActive(true);
    setStudyTimer(0);

    // Emit learning event
    engine.emitEvent('learning:module_started', {
      moduleId: module.id,
      moduleTitle: module.title,
      difficulty: module.difficulty,
      timestamp: Date.now(),
    });
  }, [engine]);

  // Handle completing a module
  const handleCompleteModule = useCallback(() => {
    if (!selectedModule) return;

    setModules(prev => prev.map(m =>
      m.id === selectedModule.id
        ? { ...m, isCompleted: true, progress: 100 }
        : m
    ));

    setProgress(prev => ({
      ...prev,
      completedModules: prev.completedModules + 1,
      currentStreak: prev.currentStreak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
      totalStudyTime: prev.totalStudyTime + selectedModule.duration,
    }));

    setIsModuleActive(false);
    setSelectedModule(null);
    setStudyTimer(0);

    // Emit completion event
    engine.emitEvent('learning:module_completed', {
      moduleId: selectedModule.id,
      moduleTitle: selectedModule.title,
      timeSpent: selectedModule.duration,
      timestamp: Date.now(),
    });
  }, [selectedModule, engine]);

  // Handle pausing/stopping a module
  const handlePauseModule = useCallback(() => {
    setIsModuleActive(false);

    if (selectedModule) {
      engine.emitEvent('learning:module_paused', {
        moduleId: selectedModule.id,
        progress: selectedModule.progress,
        timeSpent: studyTimer,
        timestamp: Date.now(),
      });
    }
  }, [selectedModule, studyTimer, engine]);

  // Initialize 3D visualization
  useEffect(() => {
    if (!threeJsContainerRef.current || !engine.getThreeJsScene()) return;

    const initializeThreeJs = async () => {
      try {
        await engine.renderMysticalScene(threeJsContainerRef.current!);

        // Add learning-specific 3D elements
        engine.emitEvent('learning:visualization_ready', {
          container: threeJsContainerRef.current!.id,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Failed to initialize 3D learning visualization:', error);
      }
    };

    initializeThreeJs();
  }, [engine]);

  // Get category icon
  const getCategoryIcon = (category: LearningModule['category']) => {
    const icons = {
      sacred_geometry: '🔷',
      archetypes: '🎭',
      mystical_patterns: '🌟',
      consciousness: '🧠',
      meditation: '🧘',
    };
    return icons[category];
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: LearningModule['difficulty']) => {
    const colors = {
      beginner: '#10b981',
      intermediate: '#f59e0b',
      advanced: '#ef4444',
      master: '#8b5cf6',
    };
    return colors[difficulty];
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="learning-dashboard">
      <div className="learning-header">
        <h2>Sacred Learning Journey</h2>
        <p>Embark on a mystical learning adventure through sacred knowledge and wisdom</p>
      </div>

      <div className="learning-content">
        {/* Progress Overview */}
        <div className="learning-progress">
          <div className="progress-stats">
            <div className="stat-card">
              <div className="stat-value">{progress.completedModules}/{progress.totalModules}</div>
              <div className="stat-label">Modules Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{progress.currentStreak}</div>
              <div className="stat-label">Current Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{Math.floor(progress.totalStudyTime / 60)}h</div>
              <div className="stat-label">Study Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{progress.achievements.length}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="overall-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round((progress.completedModules / progress.totalModules) * 100)}% Complete
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="learning-modules">
          <h3>Available Modules</h3>
          <div className="modules-grid">
            {modules.map(module => (
              <div
                key={module.id}
                className={`module-card ${module.difficulty} ${
                  module.unlockProgress >= 100 ? 'unlocked' : 'locked'
                } ${module.isCompleted ? 'completed' : ''}`}
                onClick={() => module.unlockProgress >= 100 && handleStartModule(module)}
              >
                <div className="module-header">
                  <span className="module-icon">{getCategoryIcon(module.category)}</span>
                  <span className={`difficulty-badge ${module.difficulty}`}>
                    {module.difficulty}
                  </span>
                </div>

                <div className="module-content">
                  <h4 className="module-title">{module.title}</h4>
                  <p className="module-description">{module.description}</p>

                  <div className="module-meta">
                    <span className="duration">⏱️ {module.duration}min</span>
                    {module.prerequisites.length > 0 && (
                      <span className="prerequisites">
                        🔓 {module.prerequisites.length} prerequisites
                      </span>
                    )}
                  </div>

                  {module.unlockProgress < 100 && (
                    <div className="unlock-progress">
                      <div className="progress-bar small">
                        <div
                          className="progress-fill"
                          style={{ width: `${module.unlockProgress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {Math.round(module.unlockProgress)}% unlocked
                      </span>
                    </div>
                  )}
                </div>

                {module.isCompleted && (
                  <div className="completion-badge">✅</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Module Study Area */}
        {selectedModule && (
          <div className="active-study">
            <div className="study-header">
              <h3>Studying: {selectedModule.title}</h3>
              <div className="study-controls">
                <span className="timer">⏱️ {formatTime(studyTimer)}</span>
                <button onClick={handlePauseModule} className="btn btn-secondary">
                  Pause
                </button>
                <button onClick={handleCompleteModule} className="btn btn-primary">
                  Complete
                </button>
              </div>
            </div>

            <div className="study-content">
              <div className="study-materials">
                <div className="module-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${selectedModule.progress}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(selectedModule.progress)}% Complete</span>
                </div>

                <div className="study-text">
                  <p>{selectedModule.description}</p>
                  <p>
                    This module covers {selectedModule.category.replace('_', ' ')} at{' '}
                    {selectedModule.difficulty} level. Take your time to absorb the material
                    and contemplate its deeper meanings.
                  </p>
                </div>
              </div>

              <div className="study-visualization">
                <div className="three-js-container" ref={threeJsContainerRef}>
                  <div className="three-js-content">
                    {/* 3D learning visualization will be rendered here */}
                    <div className="learning-scene">
                      <div className="sacred-geometry-demo">
                        Interactive 3D Sacred Geometry
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {progress.achievements.length > 0 && (
          <div className="achievements-section">
            <h3>Achievements Unlocked</h3>
            <div className="achievements-list">
              {progress.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  🏆 {achievement}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningDashboard;