/**
 * Safety Preferences Component
 * Interface for managing user safety settings and preferences
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  type UnifiedCathedralEngine,
  type EngineState,
  type UserSafetyProfile,
  type ContentIntensity,
  type TriggerCategory,
  type SafetyLevel
} from '@cathedral/cathedral-engine';

interface SafetyPreferencesProps {
  engine: UnifiedCathedralEngine;
  engineState: EngineState;
}

interface SafetySettings {
  contentIntensity: ContentIntensity;
  triggerCategories: TriggerCategory[];
  enableTraumaInformed: boolean;
  enableGroundingTechniques: boolean;
  enableAftercare: boolean;
  emergencyContact: string;
  safeWord: string;
  sessionTimeout: number; // minutes
  enableAccessibility: boolean;
  culturalSensitivity: boolean;
  ageVerification: boolean;
}

const SafetyPreferences: React.FC<SafetyPreferencesProps> = ({ engine, engineState }) => {
  const [settings, setSettings] = useState<SafetySettings>({
    contentIntensity: 'moderate' as ContentIntensity,
    triggerCategories: [],
    enableTraumaInformed: true,
    enableGroundingTechniques: true,
    enableAftercare: true,
    emergencyContact: '',
    safeWord: 'RED',
    sessionTimeout: 60,
    enableAccessibility: true,
    culturalSensitivity: true,
    ageVerification: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [sessionStatus, setSessionStatus] = useState<any>(null);

  // Load current safety session status
  useEffect(() => {
    if (engineState.safety.sessionId) {
      const status = engine.getSessionSafetyStatus?.(engineState.safety.sessionId);
      setSessionStatus(status);
    }
  }, [engineState.safety.sessionId, engine]);

  // Handle setting changes
  const handleSettingChange = useCallback((key: keyof SafetySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle trigger category toggle
  const handleTriggerToggle = useCallback((trigger: TriggerCategory) => {
    setSettings(prev => ({
      ...prev,
      triggerCategories: prev.triggerCategories.includes(trigger)
        ? prev.triggerCategories.filter(t => t !== trigger)
        : [...prev.triggerCategories, trigger]
    }));
  }, []);

  // Save safety preferences
  const handleSavePreferences = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Create safety profile
      const safetyProfile: UserSafetyProfile = {
        userId: 'current-user',
        contentPreferences: {
          maxIntensity: settings.contentIntensity,
          blockedCategories: settings.triggerCategories,
          enableTraumaInformed: settings.enableTraumaInformed,
          enableGrounding: settings.enableGroundingTechniques,
          enableAftercare: settings.enableAftercare,
        },
        boundaries: {
          safeWord: settings.safeWord,
          sessionTimeout: settings.sessionTimeout * 60 * 1000, // convert to milliseconds
          emergencyContact: settings.emergencyContact,
        },
        accessibility: {
          enableAccessibility: settings.enableAccessibility,
          culturalSensitivity: settings.culturalSensitivity,
          ageVerification: settings.ageVerification,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Process through safety framework
      const action = await engine.processUserInteraction(
        JSON.stringify(safetyProfile),
        'boundary_check'
      );

      setSaveMessage('Safety preferences saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);

      // Emit safety preferences updated event
      engine.emitEvent('safety:preferences_updated', {
        profile: safetyProfile,
        timestamp: Date.now(),
      });

    } catch (error) {
      console.error('Failed to save safety preferences:', error);
      setSaveMessage('Failed to save preferences');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [settings, engine]);

  // Emergency stop
  const handleEmergencyStop = useCallback(async () => {
    try {
      await engine.processUserInteraction('EMERGENCY_STOP', 'emergency');

      // Emit emergency stop event
      engine.emitEvent('safety:emergency_stop', {
        reason: 'User initiated emergency stop',
        timestamp: Date.now(),
      });

      alert('Emergency stop activated. All systems have been safely halted.');
    } catch (error) {
      console.error('Emergency stop failed:', error);
      alert('Emergency stop failed. Please contact support.');
    }
  }, [engine]);

  // Get intensity description
  const getIntensityDescription = (intensity: ContentIntensity) => {
    const descriptions = {
      'very_mild': 'Gentle content suitable for sensitive users',
      'mild': 'Light mystical content with minimal intensity',
      'moderate': 'Balanced mystical content with some depth',
      'intense': 'Deep mystical content with strong themes',
      'very_intense': 'Powerful mystical content for experienced users',
      'extreme': 'Maximum intensity content for experts only',
    };
    return descriptions[intensity];
  };

  // Get trigger category description
  const getTriggerDescription = (trigger: TriggerCategory) => {
    const descriptions = {
      [TriggerCategory.VIOLENCE]: 'Physical harm, aggression, or violent themes',
      [TriggerCategory.SEXUAL_CONTENT]: 'Sexual themes, intimacy, or related content',
      [TriggerCategory.TRAUMA]: 'Trauma-related themes or PTSD triggers',
      [TriggerCategory.SUBSTANCE_USE]: 'Drug or alcohol use and related themes',
      [TriggerCategory.MENTAL_HEALTH]: 'Mental health themes including depression, anxiety',
      [TriggerCategory.DEATH_LOSS]: 'Death, dying, or themes of loss and grief',
      [TriggerCategory.PHYSICAL_HARM]: 'Physical injury, medical procedures, or body harm',
      [TriggerCategory.EMOTIONAL_DISTRESS]: 'Emotional pain, heartbreak, or distressing themes',
      [TriggerCategory.CULTURAL_SENSITIVITY]: 'Cultural, traditional, or heritage-related content',
      [TriggerCategory.SPIRITUAL_CONTENT]: 'Spiritual or religious themes and practices',
    };
    return descriptions[trigger];
  };

  return (
    <div className="safety-preferences">
      <div className="safety-header">
        <h2>Safety & Preferences</h2>
        <p>Configure your safety settings and content preferences for a personalized, safe experience</p>
      </div>

      <div className="safety-content">
        {/* Current Session Status */}
        {sessionStatus && (
          <div className="session-status">
            <h3>Current Session Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span>Status:</span>
                <strong className={`status-${sessionStatus.status}`}>
                  {sessionStatus.status}
                </strong>
              </div>
              <div className="status-item">
                <span>Risk Level:</span>
                <strong className={`risk-${sessionStatus.riskLevel}`}>
                  {sessionStatus.riskLevel}
                </strong>
              </div>
              <div className="status-item">
                <span>Active Violations:</span>
                <strong>{sessionStatus.activeViolations}</strong>
              </div>
              <div className="status-item">
                <span>Last Check:</span>
                <strong>{new Date(sessionStatus.lastCheck).toLocaleTimeString()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Content Intensity */}
        <div className="preference-section">
          <h3>Content Intensity</h3>
          <p>Choose the maximum intensity level for mystical content</p>

          <div className="intensity-selector">
            {(['very_mild', 'mild', 'moderate', 'intense', 'very_intense', 'extreme'] as ContentIntensity[]).map(intensity => (
              <label key={intensity} className="intensity-option">
                <input
                  type="radio"
                  name="contentIntensity"
                  value={intensity}
                  checked={settings.contentIntensity === intensity}
                  onChange={(e) => handleSettingChange('contentIntensity', e.target.value as ContentIntensity)}
                />
                <div className="intensity-info">
                  <div className="intensity-name">
                    {intensity.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="intensity-description">
                    {getIntensityDescription(intensity)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Trigger Categories */}
        <div className="preference-section">
          <h3>Trigger Categories</h3>
          <p>Select categories of content that may be triggering for you</p>

          <div className="trigger-categories">
            {Object.values(TriggerCategory).map(trigger => (
              <label key={trigger} className="trigger-option">
                <input
                  type="checkbox"
                  checked={settings.triggerCategories.includes(trigger)}
                  onChange={() => handleTriggerToggle(trigger)}
                />
                <div className="trigger-info">
                  <div className="trigger-name">{trigger.replace('_', ' ')}</div>
                  <div className="trigger-description">
                    {getTriggerDescription(trigger)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="preference-section">
          <h3>Safety Features</h3>

          <div className="safety-toggles">
            <label className="toggle-option">
              <input
                type="checkbox"
                checked={settings.enableTraumaInformed}
                onChange={(e) => handleSettingChange('enableTraumaInformed', e.target.checked)}
              />
              <div className="toggle-info">
                <div className="toggle-name">Trauma-Informed Processing</div>
                <div className="toggle-description">
                  Enable trauma-informed content processing and safety measures
                </div>
              </div>
            </label>

            <label className="toggle-option">
              <input
                type="checkbox"
                checked={settings.enableGroundingTechniques}
                onChange={(e) => handleSettingChange('enableGroundingTechniques', e.target.checked)}
              />
              <div className="toggle-info">
                <div className="toggle-name">Grounding Techniques</div>
                <div className="toggle-description">
                  Provide grounding techniques during intense mystical experiences
                </div>
              </div>
            </label>

            <label className="toggle-option">
              <input
                type="checkbox"
                checked={settings.enableAftercare}
                onChange={(e) => handleSettingChange('enableAftercare', e.target.checked)}
              />
              <div className="toggle-info">
                <div className="toggle-name">Aftercare Support</div>
                <div className="toggle-description">
                  Enable aftercare protocols after intense sessions
                </div>
              </div>
            </label>

            <label className="toggle-option">
              <input
                type="checkbox"
                checked={settings.enableAccessibility}
                onChange={(e) => handleSettingChange('enableAccessibility', e.target.checked)}
              />
              <div className="toggle-info">
                <div className="toggle-name">Accessibility Support</div>
                <div className="toggle-description">
                  Enable accessibility features and accommodations
                </div>
              </div>
            </label>

            <label className="toggle-option">
              <input
                type="checkbox"
                checked={settings.culturalSensitivity}
                onChange={(e) => handleSettingChange('culturalSensitivity', e.target.checked)}
              />
              <div className="toggle-info">
                <div className="toggle-name">Cultural Sensitivity</div>
                <div className="toggle-description">
                  Enable cultural sensitivity and heritage protection features
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Emergency Settings */}
        <div className="preference-section">
          <h3>Emergency Settings</h3>

          <div className="emergency-settings">
            <div className="setting-group">
              <label>Safe Word:</label>
              <input
                type="text"
                value={settings.safeWord}
                onChange={(e) => handleSettingChange('safeWord', e.target.value)}
                placeholder="Enter your safe word"
                className="text-input"
              />
              <small>Your personal safe word to immediately stop all activities</small>
            </div>

            <div className="setting-group">
              <label>Emergency Contact:</label>
              <input
                type="email"
                value={settings.emergencyContact}
                onChange={(e) => handleSettingChange('emergencyContact', e.target.value)}
                placeholder="emergency@example.com"
                className="text-input"
              />
              <small>Emergency contact for critical situations</small>
            </div>

            <div className="setting-group">
              <label>Session Timeout (minutes):</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="480"
                className="number-input"
              />
              <small>Maximum session duration before automatic timeout</small>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="safety-actions">
          <button
            onClick={handleSavePreferences}
            disabled={isSaving}
            className="btn btn-primary"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>

          <button
            onClick={handleEmergencyStop}
            className="btn btn-danger emergency-btn"
          >
            🚨 Emergency Stop
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`save-message ${saveMessage.includes('Failed') ? 'error' : 'success'}`}>
            {saveMessage}
          </div>
        )}

        {/* Safety Information */}
        <div className="safety-info">
          <h3>Safety Information</h3>
          <div className="info-cards">
            <div className="info-card">
              <h4>🛡️ Trauma-Informed Design</h4>
              <p>
                All content is processed through trauma-informed filters to ensure
                safe and respectful experiences for all users.
              </p>
            </div>

            <div className="info-card">
              <h4>⚡ Emergency Features</h4>
              <p>
                Use your safe word or the emergency stop button to immediately
                halt all activities and return to a safe state.
              </p>
            </div>

            <div className="info-card">
              <h4>🎯 Personalized Safety</h4>
              <p>
                Your safety preferences are used to customize all mystical
                content and ensure it aligns with your boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyPreferences;