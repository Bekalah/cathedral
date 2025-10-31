import React, { useState, useCallback, useEffect } from 'react';
import {
  FusionControlsProps,
  DomainElement,
  FusionInput,
  FusionResult,
  Domain,
  Rarity
} from '../types/FusionTypes';

/**
 * FusionControls - React component for interactive fusion interface
 *
 * Provides drag-and-drop functionality for combining domain elements,
 * real-time fusion preview, and visual feedback for the fusion process.
 */
export const FusionControls: React.FC<FusionControlsProps> = ({
  availableElements,
  userProgression,
  onFusion,
  onElementSelect,
  selectedElements,
  config
}) => {
  const [draggedElement, setDraggedElement] = useState<DomainElement | null>(null);
  const [isFusionInProgress, setIsFusionInProgress] = useState(false);
  const [fusionPreview, setFusionPreview] = useState<FusionResult | null>(null);
  const [harmony, setHarmony] = useState(0);
  const [intention, setIntention] = useState('');

  // Calculate harmony in real-time as elements are selected
  useEffect(() => {
    if (selectedElements.length >= 2) {
      const totalEnergy = selectedElements.reduce((sum, el) => sum + el.energy, 0);
      const avgEnergy = totalEnergy / selectedElements.length;
      const energyVariance = selectedElements.reduce((acc, el) =>
        acc + Math.pow(el.energy - avgEnergy, 2), 0) / selectedElements.length;
      const calculatedHarmony = Math.max(0, 100 - energyVariance);
      setHarmony(calculatedHarmony);
    } else {
      setHarmony(0);
    }
  }, [selectedElements]);

  // Handle drag start
  const handleDragStart = useCallback((element: DomainElement) => {
    setDraggedElement(element);
  }, []);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedElement(null);
  }, []);

  // Handle element drop into fusion area
  const handleElementDrop = useCallback((element: DomainElement) => {
    if (selectedElements.length < 5 && !selectedElements.find(el => el.id === element.id)) {
      onElementSelect(element);
    }
  }, [selectedElements, onElementSelect]);

  // Handle element removal from fusion area
  const handleElementRemove = useCallback((elementId: string) => {
    const newSelection = selectedElements.filter(el => el.id !== elementId);
    selectedElements.forEach(el => {
      if (el.id !== elementId) {
        // Re-select to update the selection
      }
    });
    // This would need to be handled by the parent component
  }, [selectedElements]);

  // Handle fusion execution
  const handleFusion = useCallback(async () => {
    if (selectedElements.length < 2 || !intention.trim()) {
      return;
    }

    setIsFusionInProgress(true);

    try {
      const fusionInput: FusionInput = {
        elements: selectedElements,
        harmony,
        intention: intention.trim(),
        userId: userProgression.userId,
        timestamp: new Date()
      };

      const result = await onFusion(fusionInput);
      setFusionPreview(result);

    } catch (error) {
      console.error('Fusion failed:', error);
    } finally {
      setIsFusionInProgress(false);
    }
  }, [selectedElements, harmony, intention, userProgression.userId, onFusion]);

  // Get elements by domain for organized display
  const elementsByDomain = availableElements.reduce((acc, element) => {
    if (!acc[element.domain]) {
      acc[element.domain] = [];
    }
    acc[element.domain].push(element);
    return acc;
  }, {} as Record<Domain, DomainElement[]>);

  return (
    <div className="fusion-controls">
      {/* Element Selection Area */}
      <div className="element-selection">
        <h3>Available Elements</h3>

        {Object.entries(elementsByDomain).map(([domain, elements]) => (
          <div key={domain} className={`domain-section ${domain.toLowerCase()}`}>
            <h4 className="domain-title">
              {domain} Elements ({elements.length})
            </h4>

            <div className="elements-grid">
              {elements.map(element => (
                <div
                  key={element.id}
                  className={`element-card ${getRarityClass(element.rarity)}`}
                  draggable
                  onDragStart={() => handleDragStart(element)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="element-icon">
                    {getDomainIcon(element.domain)}
                  </div>

                  <div className="element-info">
                    <h5 className="element-name">{element.name}</h5>
                    <p className="element-description">{element.description}</p>

                    <div className="element-stats">
                      <div className="stat">
                        <span className="stat-label">Energy:</span>
                        <div className="energy-bar">
                          <div
                            className="energy-fill"
                            style={{ width: `${element.energy}%` }}
                          />
                        </div>
                        <span className="stat-value">{element.energy}</span>
                      </div>

                      <div className="stat">
                        <span className="stat-label">Frequency:</span>
                        <span className="stat-value">{element.frequency}Hz</span>
                      </div>
                    </div>

                    <div className="element-attributes">
                      {Object.entries(element.attributes).map(([attr, value]) => (
                        <div key={attr} className="attribute">
                          <span className="attr-name">{attr}:</span>
                          <span className="attr-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="element-actions">
                    <button
                      className="select-btn"
                      onClick={() => handleElementDrop(element)}
                      disabled={selectedElements.find(el => el.id === element.id) !== undefined}
                    >
                      {selectedElements.find(el => el.id === element.id) ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fusion Area */}
      <div className="fusion-area">
        <h3>Fusion Chamber</h3>

        {/* Selected Elements Display */}
        <div className="selected-elements">
          {selectedElements.length === 0 ? (
            <div className="empty-state">
              <p>Drag elements here to begin fusion</p>
              <div className="drop-zone">
                Drop Zone
              </div>
            </div>
          ) : (
            <div className="selected-grid">
              {selectedElements.map(element => (
                <div key={element.id} className="selected-element">
                  <div className="element-header">
                    <span className="element-name">{element.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => handleElementRemove(element.id)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="element-preview">
                    {getDomainIcon(element.domain)}
                    <span className="domain-badge">{element.domain}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Harmony Indicator */}
        {selectedElements.length >= 2 && (
          <div className="harmony-indicator">
            <div className="harmony-label">
              Harmonic Resonance: {harmony.toFixed(1)}%
            </div>
            <div className="harmony-bar">
              <div
                className={`harmony-fill ${getHarmonyClass(harmony)}`}
                style={{ width: `${harmony}%` }}
              />
            </div>
          </div>
        )}

        {/* Intention Input */}
        <div className="intention-input">
          <label htmlFor="fusion-intention">Fusion Intention:</label>
          <textarea
            id="fusion-intention"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Describe your intention for this fusion..."
            maxLength={200}
            disabled={isFusionInProgress}
          />
          <div className="char-count">
            {intention.length}/200
          </div>
        </div>

        {/* Fusion Button */}
        <div className="fusion-button-area">
          <button
            className={`fusion-btn ${getFusionButtonState()}`}
            onClick={handleFusion}
            disabled={!canPerformFusion()}
          >
            {isFusionInProgress ? (
              <>
                <div className="spinner" />
                Performing Fusion...
              </>
            ) : (
              <>
                ⚗️ Perform Fusion ({selectedElements.length} elements)
              </>
            )}
          </button>
        </div>

        {/* Fusion Preview */}
        {fusionPreview && (
          <div className="fusion-preview">
            <h4>Fusion Result</h4>
            {fusionPreview.success ? (
              <div className="success-result">
                <div className="result-header">
                  <h5>{fusionPreview.output.name}</h5>
                  <span className={`rarity-badge ${getRarityClass(fusionPreview.output.rarity)}`}>
                    {fusionPreview.output.rarity}
                  </span>
                </div>

                <p className="result-description">
                  {fusionPreview.output.description}
                </p>

                <div className="result-stats">
                  <div className="stat">
                    <span>Quality:</span>
                    <span>{fusionPreview.quality.toFixed(1)}%</span>
                  </div>
                  <div className="stat">
                    <span>Experience:</span>
                    <span>+{fusionPreview.experience} XP</span>
                  </div>
                </div>

                <div className="result-abilities">
                  <h6>Abilities:</h6>
                  {fusionPreview.output.abilities.map(ability => (
                    <div key={ability.id} className="ability">
                      <span className="ability-name">{ability.name}</span>
                      <span className="ability-power">Power: {ability.power}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="failed-result">
                <p>Fusion failed. Try adjusting your element combination or intention.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Helper function to determine fusion button state
  function getFusionButtonState(): string {
    if (isFusionInProgress) return 'processing';
    if (selectedElements.length < 2) return 'disabled';
    if (harmony < 30) return 'warning';
    return 'enabled';
  }

  // Helper function to determine if fusion can be performed
  function canPerformFusion(): boolean {
    return selectedElements.length >= 2 &&
           selectedElements.length <= 5 &&
           intention.trim().length > 0 &&
           !isFusionInProgress;
  }
};

// Helper component for element cards
const ElementCard: React.FC<{
  element: DomainElement;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}> = ({ element, isSelected, onSelect, onDragStart, onDragEnd }) => {
  return (
    <div
      className={`element-card ${getRarityClass(element.rarity)} ${isSelected ? 'selected' : ''}`}
      draggable={!isSelected}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="element-icon">
        {getDomainIcon(element.domain)}
      </div>

      <div className="element-info">
        <h5 className="element-name">{element.name}</h5>
        <p className="element-description">{element.description}</p>

        <div className="element-stats">
          <div className="stat">
            <span className="stat-label">Energy:</span>
            <div className="energy-bar">
              <div
                className="energy-fill"
                style={{ width: `${element.energy}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="element-actions">
        <button
          className="select-btn"
          onClick={onSelect}
          disabled={isSelected}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  );
};

// Helper functions
function getDomainIcon(domain: Domain): string {
  switch (domain) {
    case Domain.ART: return '🎨';
    case Domain.SCIENCE: return '🔬';
    case Domain.SPIRITUALITY: return '🧘';
    default: return '✨';
  }
}

function getRarityClass(rarity: Rarity): string {
  switch (rarity) {
    case Rarity.COMMON: return 'rarity-common';
    case Rarity.UNCOMMON: return 'rarity-uncommon';
    case Rarity.RARE: return 'rarity-rare';
    case Rarity.EPIC: return 'rarity-epic';
    case Rarity.LEGENDARY: return 'rarity-legendary';
    case Rarity.MYTHICAL: return 'rarity-mythical';
    default: return 'rarity-common';
  }
}

function getHarmonyClass(harmony: number): string {
  if (harmony >= 80) return 'harmony-excellent';
  if (harmony >= 60) return 'harmony-good';
  if (harmony >= 40) return 'harmony-fair';
  return 'harmony-poor';
}