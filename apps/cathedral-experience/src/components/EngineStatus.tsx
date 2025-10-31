/**
 * Engine Status Component
 * Displays current status of all cathedral engines
 */

import React from 'react';
import { type EngineState } from '@cathedral/cathedral-engine';

interface EngineStatusProps {
  engineState: EngineState | null;
  isConnected: boolean;
}

const EngineStatus: React.FC<EngineStatusProps> = ({ engineState, isConnected }) => {
  if (!engineState) {
    return (
      <div className="engine-status">
        <span className="status-indicator disconnected">🔴</span>
        <span className="status-text">Disconnected</span>
      </div>
    );
  }

  const getStatusColor = (isActive: boolean) => isActive ? 'active' : 'inactive';
  const getStatusIcon = (isActive: boolean) => isActive ? '🟢' : '⚫';

  return (
    <div className="engine-status">
      <div className="status-item">
        <span className={`status-indicator ${getStatusColor(engineState.synthesis.isActive)}`}>
          {getStatusIcon(engineState.synthesis.isActive)}
        </span>
        <span className="status-text">
          Synthesis ({engineState.synthesis.currentFusions} active)
        </span>
      </div>

      <div className="status-item">
        <span className={`status-indicator ${getStatusColor(engineState.learning.isActive)}`}>
          {getStatusIcon(engineState.learning.isActive)}
        </span>
        <span className="status-text">
          Learning ({engineState.learning.completedLessons} completed)
        </span>
      </div>

      <div className="status-item">
        <span className={`status-indicator ${getStatusColor(engineState.threeJs.isActive)}`}>
          {getStatusIcon(engineState.threeJs.isActive)}
        </span>
        <span className="status-text">
          3D Engine ({engineState.threeJs.frameRate} FPS)
        </span>
      </div>

      <div className="status-item">
        <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🔗' : '🔴'}
        </span>
        <span className="status-text">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {engineState.safety.sessionId && (
        <div className="status-item">
          <span className={`status-indicator ${engineState.safety.status === 'active' ? 'safe' : 'warning'}`}>
            {engineState.safety.status === 'active' ? '🛡️' : '⚠️'}
          </span>
          <span className="status-text">
            Safety ({engineState.safety.riskLevel})
          </span>
        </div>
      )}
    </div>
  );
};

export default EngineStatus;