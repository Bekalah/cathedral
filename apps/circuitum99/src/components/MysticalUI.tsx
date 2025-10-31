import React from 'react'
import { useMysticalStore } from '../store/mysticalStore'

export function MysticalUI() {
  const {
    selectedNode,
    energyLevel,
    currentRealm,
    fusionMode,
    researchMode,
    soundEnabled,
    gamingMode,
    nodes,
    toggleFusionMode,
    toggleResearchMode,
    toggleSound,
    toggleGamingMode,
    attemptFusion
  } = useMysticalStore()

  const [selectedNodes, setSelectedNodes] = React.useState<any[]>([])
  const [researchNotes, setResearchNotes] = React.useState('')

  const handleNodeSelect = (node: any) => {
    if (fusionMode) {
      if (selectedNodes.length < 2) {
        setSelectedNodes([...selectedNodes, node])
      } else {
        setSelectedNodes([selectedNodes[0], node])
      }
    }
  }

  const handleFusion = () => {
    if (selectedNodes.length === 2) {
      attemptFusion(selectedNodes[0], selectedNodes[1])
      setSelectedNodes([])
    }
  }

  return (
    <>
      {/* Main Control Panel */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '350px',
        background: 'rgba(0, 0, 0, 0.9)',
        border: '2px solid #8B5CF6',
        borderRadius: '15px',
        padding: '20px',
        color: '#E6E6FA',
        fontFamily: 'Georgia, serif',
        backdropFilter: 'blur(10px)',
        zIndex: 1000
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid #8B5CF6',
          paddingBottom: '10px'
        }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#8B5CF6' }}>
            🔮 Mystical Control Center
          </h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>
            Circuitum99 - {currentRealm}
          </p>
        </div>

        {/* Energy Display */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span>🌟 Global Energy</span>
            <span style={{ color: '#8B5CF6' }}>{(energyLevel * 100).toFixed(1)}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(139, 92, 246, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${energyLevel * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Mode Toggles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <button
            onClick={toggleFusionMode}
            style={{
              padding: '8px 12px',
              background: fusionMode ? '#8B5CF6' : 'rgba(139, 92, 246, 0.2)',
              border: '1px solid #8B5CF6',
              borderRadius: '6px',
              color: fusionMode ? '#000' : '#8B5CF6',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            ⚗️ Fusion {fusionMode ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleResearchMode}
            style={{
              padding: '8px 12px',
              background: researchMode ? '#8B5CF6' : 'rgba(139, 92, 246, 0.2)',
              border: '1px solid #8B5CF6',
              borderRadius: '6px',
              color: researchMode ? '#000' : '#8B5CF6',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            🔬 Research {researchMode ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleSound}
            style={{
              padding: '8px 12px',
              background: soundEnabled ? '#8B5CF6' : 'rgba(139, 92, 246, 0.2)',
              border: '1px solid #8B5CF6',
              borderRadius: '6px',
              color: soundEnabled ? '#000' : '#8B5CF6',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            🎵 Sound {soundEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={toggleGamingMode}
            style={{
              padding: '8px 12px',
              background: gamingMode ? '#8B5CF6' : 'rgba(139, 92, 246, 0.2)',
              border: '1px solid #8B5CF6',
              borderRadius: '6px',
              color: gamingMode ? '#000' : '#8B5CF6',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s'
            }}
          >
            🎮 Gaming {gamingMode ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Selected Node Info */}
        {selectedNode && (
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid #8B5CF6',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#8B5CF6' }}>
              🎴 {selectedNode.name}
            </h4>
            <div style={{ fontSize: '11px', opacity: 0.8 }}>
              <p><strong>Element:</strong> {selectedNode.element}</p>
              <p><strong>Energy:</strong> {(selectedNode.energy * 100).toFixed(1)}%</p>
              <p><strong>Frequency:</strong> {selectedNode.frequency}Hz</p>
              {selectedNode.cardData?.powers && (
                <p><strong>Powers:</strong> {selectedNode.cardData.powers.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        {/* Fusion Interface */}
        {fusionMode && (
          <div style={{
            background: 'rgba(255, 107, 53, 0.1)',
            border: '1px solid #FF6B35',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#FF6B35' }}>
              ⚗️ Fusion Lab
            </h4>
            <div style={{ fontSize: '11px' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                Selected: {selectedNodes.map(n => n.name).join(' + ') || 'None'}
              </p>
              {selectedNodes.length === 2 && (
                <button
                  onClick={handleFusion}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#FF6B35',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#000',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  🚀 ATTEMPT FUSION
                </button>
              )}
            </div>
          </div>
        )}

        {/* Research Interface */}
        {researchMode && (
          <div style={{
            background: 'rgba(74, 144, 226, 0.1)',
            border: '1px solid #4A90E2',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#4A90E2' }}>
              🔬 Research Station
            </h4>
            <textarea
              value={researchNotes}
              onChange={(e) => setResearchNotes(e.target.value)}
              placeholder="Record your mystical observations..."
              style={{
                width: '100%',
                height: '60px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid #4A90E2',
                borderRadius: '4px',
                color: '#E6E6FA',
                fontSize: '11px',
                padding: '8px',
                resize: 'vertical',
                fontFamily: 'monospace'
              }}
            />
          </div>
        )}

        {/* Gaming Stats */}
        {gamingMode && selectedNode && (
          <div style={{
            background: 'rgba(152, 206, 180, 0.1)',
            border: '1px solid #98CEB4',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#98CEB4' }}>
              🎮 Gaming Stats
            </h4>
            <div style={{ fontSize: '11px' }}>
              <p><strong>Level:</strong> {selectedNode.gaming?.level || 1}</p>
              <p><strong>XP:</strong> {selectedNode.gaming?.experience || 0}</p>
              <p><strong>Achievements:</strong> {selectedNode.gaming?.achievements?.length || 0}</p>
            </div>
          </div>
        )}

        {/* Active Nodes Count */}
        <div style={{
          fontSize: '11px',
          opacity: 0.7,
          textAlign: 'center',
          borderTop: '1px solid rgba(139, 92, 246, 0.3)',
          paddingTop: '10px'
        }}>
          Active Nodes: {nodes.filter(n => n.isActive).length} / {nodes.length}
        </div>
      </div>

      {/* Node Selection Helper */}
      {fusionMode && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid #FF6B35',
          borderRadius: '10px',
          padding: '15px',
          color: '#E6E6FA',
          fontSize: '12px',
          backdropFilter: 'blur(10px)',
          zIndex: 1000
        }}>
          <p style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
            ⚗️ FUSION MODE ACTIVE
          </p>
          <p style={{ margin: 0, opacity: 0.7 }}>
            Click two compatible cards to attempt fusion
          </p>
        </div>
      )}

      {/* Research Mode Helper */}
      {researchMode && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid #4A90E2',
          borderRadius: '10px',
          padding: '15px',
          color: '#E6E6FA',
          fontSize: '12px',
          backdropFilter: 'blur(10px)',
          zIndex: 1000
        }}>
          <p style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
            🔬 RESEARCH MODE ACTIVE
          </p>
          <p style={{ margin: 0, opacity: 0.7 }}>
            All interactions are being logged for analysis
          </p>
        </div>
      )}

      {/* Sound Indicator */}
      {soundEnabled && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(139, 92, 246, 0.2)',
          border: '1px solid #8B5CF6',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          zIndex: 1000
        }}>
          🎵
        </div>
      )}

      {/* Gaming Mode Indicator */}
      {gamingMode && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '20px',
          background: 'rgba(152, 206, 180, 0.2)',
          border: '1px solid #98CEB4',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '10px',
          zIndex: 1000
        }}>
          🎮 GAMING
        </div>
      )}
    </>
  )
}
