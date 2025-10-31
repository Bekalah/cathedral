import React from 'react'

interface GameUIProps {
  gameState: any
  onUpdateGameState: (updates: any) => void
}

export const GameUI: React.FC<GameUIProps> = ({ gameState, onUpdateGameState }) => {
  return (
    <div className="game-ui">
      <div className="game-header">
        <h1 className="game-title">🎭 Mystical Treasure Hunt</h1>
        <div className="player-info">
          <div className="player-stat">Level: {gameState.player?.skillLevel || 'beginner'}</div>
          <div className="player-stat">Treasures: {gameState.player?.discoveredTreasures?.length || 0}</div>
        </div>
      </div>
      
      <div className="navigation-tabs">
        <button 
          className={`nav-tab ${gameState.currentView === 'map' ? 'active' : ''}`}
          onClick={() => onUpdateGameState({ currentView: 'map' })}
        >
          🗺️ Map
        </button>
        <button 
          className={`nav-tab ${gameState.currentView === 'visionary' ? 'active' : ''}`}
          onClick={() => onUpdateGameState({ currentView: 'visionary' })}
        >
          🦋 Visionary
        </button>
        <button 
          className={`nav-tab ${gameState.currentView === 'workshop' ? 'active' : ''}`}
          onClick={() => onUpdateGameState({ currentView: 'workshop' })}
        >
          📖 Workshop
        </button>
      </div>
    </div>
  )
}
EOF && cat > VisionaryRealm.tsx << 'EOF'
import React from 'react'

interface VisionaryRealmProps {
  gameState: any
  realmEngine: any
  onUpdateGameState: (updates: any) => void
  onAddNotification: (notification: any) => void
}

export const VisionaryRealm: React.FC<VisionaryRealmProps> = ({ 
  gameState, 
  realmEngine, 
  onUpdateGameState, 
  onAddNotification 
}) => {
  return (
    <div className="visionary-realm">
      <div className="realm-overlays">
        <div className="flowing-energy visionary-overlay"></div>
      </div>
      
      <div className="fusionist-selector">
        <button className="fusionist-button active">Björk Organic</button>
        <button className="fusionist-button">Tori Archetypal</button>
        <button className="fusionist-button">Iris Couture</button>
      </div>
      
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2>🦋 Visionary Realm Active</h2>
        <p>Exploring through {gameState.player?.fusionistType} eyes</p>
      </div>
    </div>
  )
}
EOF && cat > TreasureMap.tsx << 'EOF'
import React from 'react'

interface TreasureMapProps {
  gameState: any
  treasureSystem: any
  worldExplorer: any
  missionSystem: any
  onAddNotification: (notification: any) => void
}

export const TreasureMap: React.FC<TreasureMapProps> = ({ 
  gameState, 
  treasureSystem, 
  worldExplorer, 
  missionSystem,
  onAddNotification 
}) => {
  return (
    <div className="treasure-map">
      <div className="map-controls">
        <button className="map-button">📡 Find Nearby Treasures</button>
        <button className="map-button">🎯 Active Missions</button>
        <button className="map-button">🔍 Explore Realms</button>
      </div>
      
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2>🗺️ Mystical Treasure Map</h2>
        <p>Real-world exploration active at: {gameState.player?.realLocation?.lat?.toFixed(3)}, {gameState.player?.realLocation?.lng?.toFixed(3)}</p>
      </div>
    </div>
  )
}
EOF && cat > GrimoireWorkshop.tsx << 'EOF'
import React from 'react'

interface GrimoireWorkshopProps {
  gameState: any
  registry: any
  onUpdateGameState: (updates: any) => void
  onAddNotification: (notification: any) => void
}

export const GrimoireWorkshop: React.FC<GrimoireWorkshopProps> = ({ 
  gameState, 
  registry, 
  onUpdateGameState, 
  onAddNotification 
}) => {
  return (
    <div className="grimoire-workshop">
      <div className="workshop-grid">
        <div className="grimoire-card">
          <h3>📚 My First Grimoire</h3>
          <p>Created with {gameState.player?.startingArcanae?.[0]} energy</p>
          <button onClick={() => alert('Opening grimoire editor...')}>✏️ Edit</button>
        </div>
        
        <div className="grimoire-card">
          <h3>📖 Fusion Research Notes</h3>
          <p>{gameState.player?.discoveredTreasures?.length || 0} treasures discovered</p>
          <button onClick={() => alert('Viewing fusion records...')}>📝 View</button>
        </div>
        
        <div className="grimoire-card">
          <h3>🎨 Visionary Art Journal</h3>
          <p>Realms explored: {gameState.player?.unlockedRealms?.length || 0}</p>
          <button onClick={() => alert('Opening art gallery...')}>🎭 Gallery</button>
        </div>
      </div>
      
      <button className="create-button" onClick={() => alert('Creating new grimoire...')}>
        ➕ Create New Grimoire
      </button>
    </div>
  )
}
