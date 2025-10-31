/**
 * Cathedral Experience - Main React Application
 * Unified interface for all cathedral engines and systems
 */

import React, { useState, useEffect, useCallback } from 'react';
import { getUnifiedCathedralEngine, type UnifiedCathedralEngine, type EngineState } from '@cathedral/cathedral-engine';
import FusionInterface from './components/FusionInterface';
import LearningDashboard from './components/LearningDashboard';
import SafetyPreferences from './components/SafetyPreferences';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import EngineStatus from './components/EngineStatus';
import './App.css';

export type AppView = 'fusion' | 'learning' | 'safety' | 'status';

interface AppState {
  engine: UnifiedCathedralEngine | null;
  engineState: EngineState | null;
  currentView: AppView;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    engine: null,
    engineState: null,
    currentView: 'fusion',
    isLoading: true,
    error: null,
    isInitialized: false,
  });

  // Initialize the cathedral engine
  useEffect(() => {
    const initializeEngine = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const engine = getUnifiedCathedralEngine({
          enableThreeJs: true,
          enableLearning: true,
          enableSafety: true,
          defaultRenderQuality: 'high',
          enableEventLogging: true,
          autoSaveInterval: 30000,
        });

        // Set up event listeners
        engine.on('engine:ready', () => {
          setState(prev => ({
            ...prev,
            engine,
            isLoading: false,
            isInitialized: true,
            error: null
          }));
        });

        engine.on('engine:error', (event) => {
          setState(prev => ({
            ...prev,
            error: event.payload.error || 'Unknown engine error',
            isLoading: false
          }));
        });

        engine.on('state:saved', () => {
          console.log('Engine state saved');
        });

        engine.on('state:loaded', () => {
          console.log('Engine state loaded');
        });

        // Try to load saved state first
        const loaded = engine.loadEngineState();
        if (loaded) {
          console.log('Loaded previous engine state');
        }

        // Initialize the engine
        const initialized = await engine.initialize();
        if (!initialized) {
          throw new Error('Failed to initialize cathedral engine');
        }

        // Update state with current engine state
        const currentState = engine.getEngineState();
        setState(prev => ({
          ...prev,
          engine,
          engineState: currentState,
          isLoading: false,
          isInitialized: true
        }));

      } catch (error) {
        console.error('Failed to initialize cathedral engine:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Unknown initialization error',
          isLoading: false
        }));
      }
    };

    initializeEngine();

    // Cleanup function
    return () => {
      if (state.engine) {
        // Engine cleanup is handled by the engine itself
      }
    };
  }, []);

  // Update engine state periodically
  useEffect(() => {
    if (!state.engine || !state.isInitialized) return;

    const updateState = () => {
      const currentState = state.engine!.getEngineState();
      setState(prev => ({ ...prev, engineState: currentState }));
    };

    // Update immediately
    updateState();

    // Update every second
    const interval = setInterval(updateState, 1000);

    return () => clearInterval(interval);
  }, [state.engine, state.isInitialized]);

  // Handle view changes
  const handleViewChange = useCallback((view: AppView) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  // Handle engine shutdown
  const handleShutdown = useCallback(async () => {
    if (state.engine) {
      try {
        await state.engine.shutdown('User requested shutdown');
        setState(prev => ({
          ...prev,
          engine: null,
          engineState: null,
          isInitialized: false
        }));
      } catch (error) {
        console.error('Error during shutdown:', error);
      }
    }
  }, [state.engine]);

  // Handle retry initialization
  const handleRetry = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      isLoading: true
    }));

    // Re-trigger initialization
    window.location.reload();
  }, []);

  // Error state
  if (state.error) {
    return (
      <ErrorBoundary>
        <div className="app-error">
          <div className="error-content">
            <h1>Cathedral Engine Error</h1>
            <p className="error-message">{state.error}</p>
            <div className="error-actions">
              <button onClick={handleRetry} className="btn btn-primary">
                Retry Initialization
              </button>
              <button onClick={handleShutdown} className="btn btn-secondary">
                Shutdown
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Loading state
  if (state.isLoading) {
    return (
      <ErrorBoundary>
        <div className="app-loading">
          <LoadingSpinner size="large" />
          <p>Initializing Cathedral Engine...</p>
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Main application
  return (
    <ErrorBoundary>
      <div className="cathedral-app">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1>Cathedral Experience</h1>
            <p className="header-subtitle">
              Unified Synthesis • Sacred Learning • Mystical Safety
            </p>
          </div>

          <div className="header-controls">
            <EngineStatus
              engineState={state.engineState}
              isConnected={state.isInitialized}
            />

            <div className="view-selector">
              {(['fusion', 'learning', 'safety', 'status'] as AppView[]).map(view => (
                <button
                  key={view}
                  className={`view-btn ${state.currentView === view ? 'active' : ''}`}
                  onClick={() => handleViewChange(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>

            <button onClick={handleShutdown} className="btn btn-danger shutdown-btn">
              Shutdown
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          {state.currentView === 'fusion' && (
            <FusionInterface
              engine={state.engine!}
              engineState={state.engineState!}
            />
          )}

          {state.currentView === 'learning' && (
            <LearningDashboard
              engine={state.engine!}
              engineState={state.engineState!}
            />
          )}

          {state.currentView === 'safety' && (
            <SafetyPreferences
              engine={state.engine!}
              engineState={state.engineState!}
            />
          )}

          {state.currentView === 'status' && (
            <div className="status-view">
              <h2>Engine Status</h2>
              <pre className="status-json">
                {JSON.stringify(state.engineState, null, 2)}
              </pre>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <p>
              Cathedral Experience v1.0.0 •
              Built with ❤️ by Cathedral Research •
              Powered by Unified Cathedral Engine
            </p>
            <div className="footer-links">
              <a href="#docs">Documentation</a>
              <a href="#support">Support</a>
              <a href="#privacy">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;