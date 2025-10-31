/**
 * Fusion Interface Component
 * Provides drag-and-drop fusion mechanics with 3D visualization
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { type UnifiedCathedralEngine, type EngineState } from '@cathedral/cathedral-engine';

interface FusionInterfaceProps {
  engine: UnifiedCathedralEngine;
  engineState: EngineState;
}

interface FusionElement {
  id: string;
  type: 'archetype' | 'essence' | 'pattern' | 'energy';
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythical';
  position: { x: number; y: number };
  isDragging: boolean;
  isSelected: boolean;
}

const FusionInterface: React.FC<FusionInterfaceProps> = ({ engine, engineState }) => {
  const [elements, setElements] = useState<FusionElement[]>([
    {
      id: '1',
      type: 'archetype',
      name: 'The Magician',
      description: 'Manifestation and willpower',
      rarity: 'rare',
      position: { x: 100, y: 100 },
      isDragging: false,
      isSelected: false,
    },
    {
      id: '2',
      type: 'essence',
      name: 'Divine Light',
      description: 'Pure spiritual energy',
      rarity: 'epic',
      position: { x: 200, y: 150 },
      isDragging: false,
      isSelected: false,
    },
    {
      id: '3',
      type: 'pattern',
      name: 'Golden Ratio',
      description: 'Sacred mathematical harmony',
      rarity: 'legendary',
      position: { x: 150, y: 250 },
      isDragging: false,
      isSelected: false,
    },
  ]);

  const [fusionZone, setFusionZone] = useState<FusionElement[]>([]);
  const [isFusionActive, setIsFusionActive] = useState(false);
  const [fusionResult, setFusionResult] = useState<any>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle drag start
  const handleDragStart = useCallback((e: React.MouseEvent, element: FusionElement) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setElements(prev => prev.map(el =>
      el.id === element.id ? { ...el, isDragging: true } : el
    ));
  }, []);

  // Handle drag move
  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!dragOffset.x && !dragOffset.y) return;

    setElements(prev => prev.map(el =>
      el.isDragging
        ? { ...el, position: { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y } }
        : el
    ));
  }, [dragOffset]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setElements(prev => prev.map(el => ({ ...el, isDragging: false })));
    setDragOffset({ x: 0, y: 0 });

    // Check if element was dropped in fusion zone
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    setElements(prev => prev.map(el => {
      if (el.isDragging) {
        const elementRect = {
          left: el.position.x,
          top: el.position.y,
          right: el.position.x + 80,
          bottom: el.position.y + 80,
        };

        // Check if element is in fusion zone (center area)
        const fusionZoneX = canvasRect.width / 2 - 100;
        const fusionZoneY = canvasRect.height / 2 - 100;

        if (
          elementRect.right > fusionZoneX &&
          elementRect.left < fusionZoneX + 200 &&
          elementRect.bottom > fusionZoneY &&
          elementRect.top < fusionZoneY + 200
        ) {
          // Add to fusion zone
          setFusionZone(prevZone => [...prevZone, el]);
          return { ...el, position: { x: fusionZoneX + 20, y: fusionZoneY + 20 } };
        }
      }
      return el;
    }));
  }, []);

  // Set up drag event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  // Handle fusion creation
  const handleCreateFusion = useCallback(async () => {
    if (fusionZone.length < 2) {
      alert('Please drag at least 2 elements to the fusion zone');
      return;
    }

    setIsFusionActive(true);

    try {
      const baseElements = fusionZone.map(el => ({
        id: el.id,
        type: el.type,
        name: el.name,
        rarity: el.rarity,
      }));

      const fusion = await engine.createFusion(
        baseElements,
        'mystical_synthesis',
        {
          quality: 'high',
          enableMysticalEffects: true,
        }
      );

      setFusionResult(fusion);

      // Emit fusion event for 3D visualization
      engine.emitEvent('fusion:created', {
        elements: baseElements,
        result: fusion,
        timestamp: Date.now(),
      });

    } catch (error) {
      console.error('Fusion creation failed:', error);
      alert(`Fusion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsFusionActive(false);
    }
  }, [fusionZone, engine]);

  // Clear fusion zone
  const handleClearFusion = useCallback(() => {
    setFusionZone([]);
    setFusionResult(null);

    // Reset element positions
    setElements(prev => prev.map(el => ({
      ...el,
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      },
    })));
  }, []);

  // Get rarity color
  const getRarityColor = (rarity: FusionElement['rarity']) => {
    const colors = {
      common: '#9ca3af',
      uncommon: '#10b981',
      rare: '#3b82f6',
      epic: '#8b5cf6',
      legendary: '#f59e0b',
      mythical: '#ef4444',
    };
    return colors[rarity];
  };

  return (
    <div className="fusion-interface">
      <div className="fusion-header">
        <h2>Mystical Fusion Laboratory</h2>
        <p>Drag elements into the fusion zone to create powerful mystical combinations</p>
      </div>

      <div className="fusion-workspace" ref={canvasRef}>
        {/* Element Palette */}
        <div className="element-palette">
          <h3>Available Elements</h3>
          <div className="palette-grid">
            {elements
              .filter(el => !fusionZone.some(fz => fz.id === el.id))
              .map(element => (
                <div
                  key={element.id}
                  className={`fusion-element ${element.isDragging ? 'dragging' : ''} ${element.rarity}`}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    borderColor: getRarityColor(element.rarity),
                  }}
                  onMouseDown={(e) => handleDragStart(e, element)}
                >
                  <div className="element-header">
                    <span className="element-name">{element.name}</span>
                    <span className={`rarity-badge ${element.rarity}`}>
                      {element.rarity}
                    </span>
                  </div>
                  <div className="element-type">{element.type}</div>
                  <div className="element-description">{element.description}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Fusion Zone */}
        <div className="fusion-zone">
          <div className="fusion-zone-center">
            <h3>Fusion Zone</h3>
            <div className="fusion-zone-area">
              {fusionZone.map((element, index) => (
                <div
                  key={element.id}
                  className={`fusion-element in-zone ${element.rarity}`}
                  style={{
                    transform: `rotate(${index * 45}deg) translateY(-50px)`,
                    borderColor: getRarityColor(element.rarity),
                  }}
                >
                  <span className="element-name">{element.name}</span>
                </div>
              ))}

              {fusionZone.length === 0 && (
                <div className="fusion-zone-placeholder">
                  Drag elements here to fuse them
                </div>
              )}
            </div>

            <div className="fusion-controls">
              <button
                onClick={handleCreateFusion}
                disabled={fusionZone.length < 2 || isFusionActive}
                className="btn btn-primary fusion-btn"
              >
                {isFusionActive ? 'Creating Fusion...' : 'Create Fusion'}
              </button>

              <button
                onClick={handleClearFusion}
                disabled={fusionZone.length === 0}
                className="btn btn-secondary"
              >
                Clear Zone
              </button>
            </div>
          </div>
        </div>

        {/* 3D Visualization Area */}
        <div className="fusion-visualization">
          <h3>Mystical Visualization</h3>
          <div className="three-js-container" id="fusion-three-js">
            {/* Three.js canvas will be rendered here */}
            <div className="three-js-placeholder">
              3D Sacred Geometry Visualization
              {fusionResult && (
                <div className="fusion-result">
                  <h4>Fusion Result:</h4>
                  <pre>{JSON.stringify(fusionResult, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="fusion-status">
        <div className="status-item">
          <span>Elements in Zone:</span>
          <strong>{fusionZone.length}</strong>
        </div>
        <div className="status-item">
          <span>Engine Status:</span>
          <strong className={engineState.synthesis.isActive ? 'active' : 'inactive'}>
            {engineState.synthesis.isActive ? 'Active' : 'Inactive'}
          </strong>
        </div>
        <div className="status-item">
          <span>Current Fusions:</span>
          <strong>{engineState.synthesis.currentFusions}</strong>
        </div>
      </div>
    </div>
  );
};

export default FusionInterface;