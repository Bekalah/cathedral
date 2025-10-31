/**
 * 🎮 MYSTICAL TREASURE HUNT - Complete Real-World & Visionary Game Experience
 * Real exploration, visionary art realms, grimoire-making, and permanent registry
 */

import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

import { TreasureHuntSystem } from './systems/TreasureHuntSystem'
import { VisionaryRealmEngine } from './systems/VisionaryRealmEngine'
import { PermanentRegistry } from './systems/PermanentRegistry'
import { ModularLayerManager } from './systems/ModularLayerManager'
import { ArcanaTreasureMissions } from './systems/ArcanaTreasureMissions'
import { RealWorldExplorer } from './systems/RealWorldExplorer'

import { GameUI } from './ui/GameUI'
import { VisionaryRealm } from './ui/VisionaryRealm'
import { TreasureMap } from './ui/TreasureMap'
import { GrimoireWorkshop } from './ui/GrimoireWorkshop'

import './styles.css'

export interface PlayerProfile {
  id: string
  name: string
  fusionistType: 'bjork-organic' | 'tori-archetypal' | 'iris-couture' | 'emma-mystical' | 'custom'
  startingArcanae: string[]
  realLocation: { lat: number; lng: number }
  goals: string[]
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'master'
  unlockedRealms: string[]
  completedMissions: string[]
  discoveredTreasures: TreasureDiscovery[]
  createdGrimoires: Grimoire[]
}

export interface TreasureDiscovery {
  id: string
  type: 'book' | 'lesson' | 'event' | 'artifact' | 'technique'
  title: string
  description: string
  realLocation?: { lat: number; lng: number; address?: string }
  virtualLocation?: string
  arcanae: string
  difficulty: number
  value: number
  verified: boolean
  contributor: string
  contributors: string[]
  verificationCount: number
  resources: RevelationResource[]
}

export interface RevelationResource {
  type: 'book-page' | 'audio-lesson' | 'video-tutorial' | 'practice-exercise' | 'meditation-guide'
  title: string
  url: string
  description: string
  duration?: number // for audio/video
}

export interface Grimoire {
  id: string
  title: string
  arcanae: string
  pages: GrimoirePage[]
  techniques: string[]
  artStyle: string
  bindingStyle: string
  created: Date
  author: string
}

export interface GrimoirePage {
  number: number
  content: string
  illustration?: string
  magicalProperties: string[]
  invocations: string[]
}

export interface GameState {
  player: PlayerProfile
  currentView: 'map' | 'visionary' | 'workshop' | 'registry' | 'profile'
  activeRealm?: string
  currentMission?: string
  realWorldMode: boolean
  visionaryMode: boolean
  workshopMode: boolean
  registryMode: boolean
  notifications:Notification[]
  leaderboard: LeaderboardEntry[]
  globalTreasures: TreasureDiscovery[]
}

export interface Notification {
  id: string
  type: 'discovery' | 'achievement' | 'mission' | 'realm' | 'community'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export interface LeaderboardEntry {
  playerId: string
  playerName: string
  score: number
  discoveries: number
  verifiedTreasures: number
  createdGrimoires: number
  unlockedRealms: number
  rank: number
}

export const MysticalTreasureGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const treasureSystemRef = useRef<TreasureHuntSystem>()
  const realmEngineRef = useRef<VisionaryRealmEngine>()
  const registryRef = useRef<PermanentRegistry>()
  const layerManagerRef = useRef<ModularLayerManager>()
  const missionSystemRef = useRef<ArcanaTreasureMissions>()
  const worldExplorerRef = useRef<RealWorldExplorer>()

  // Initialize the complete game system
  useEffect(() => {
    const initializeGame = async () => {
      try {
        // Initialize all game systems (simplified for now)
        treasureSystemRef.current = new TreasureHuntSystem()
        realmEngineRef.current = new VisionaryRealmEngine()
        registryRef.current = new PermanentRegistry()
        layerManagerRef.current = new ModularLayerManager()
        missionSystemRef.current = new ArcanaTreasureMissions()
        worldExplorerRef.current = new RealWorldExplorer()

        // Load player profile or create new one
        const player = await loadOrCreatePlayer()

        // Initialize game state
        const initialState: GameState = {
          player,
          currentView: 'map',
          realWorldMode: false,
          visionaryMode: true,
          workshopMode: false,
          registryMode: false,
          notifications: [],
          leaderboard: [],
          globalTreasures: []
        }

        setGameState(initialState)

        console.log('🎮 Basic systems initialized - ready for exploration!')

        console.log('🎮 Mystical Treasure Hunt fully loaded and operational!')
        setLoading(false)

      } catch (err) {
        console.error('❌ Failed to initialize game:', err)
        setError(err instanceof Error ? err.message : 'Unknown initialization error')
        setLoading(false)
      }
    }

    initializeGame()
  }, [])

  // Load or create player profile
  const loadOrCreatePlayer = async (): Promise<PlayerProfile> => {
    try {
      // Check local storage for existing profile
      const stored = localStorage.getItem('mystical-treasure-player')
      if (stored) {
        const player: PlayerProfile = JSON.parse(stored)
        // Get real location
        const location = await getRealLocation()
        return { ...player, realLocation: location }
      }

      // Create new player
      const location = await getRealLocation()
      const newPlayer: PlayerProfile = {
        id: generateId(),
        name: `Seeker-${Math.floor(Math.random() * 1000)}`,
        fusionistType: 'bjork-organic', // Default to Björk's organic vision
        startingArcanae: ['the-fool', 'the-magician'],
        realLocation: location,
        goals: ['discover-grimoires', 'master-visionary-art', 'complete-all-missions'],
        skillLevel: 'beginner',
        unlockedRealms: ['bjork-organic'],
        completedMissions: [],
        discoveredTreasures: [],
        createdGrimoires: []
      }

      localStorage.setItem('mystical-treasure-player', JSON.stringify(newPlayer))
      return newPlayer

    } catch (error) {
      // Fallback to basic profile
      return {
        id: 'fallback',
        name: 'AnonymousSeeker',
        fusionistType: 'bjork-organic',
        startingArcanae: ['the-fool'],
        realLocation: { lat: 0, lng: 0 },
        goals: [],
        skillLevel: 'beginner',
        unlockedRealms: [],
        completedMissions: [],
        discoveredTreasures: [],
        createdGrimoires: []
      }
    }
  }

  // Get real-world GPS location
  const getRealLocation = async (): Promise<{ lat: number; lng: number }> => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        })
      })
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    } catch (error) {
      console.warn('📍 GPS not available, using default location:', error)
      // Default to somewhere mystical like Stonehenge
      return { lat: 51.1789, lng: -1.8262 }
    }
  }

  // Generate unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Update game state
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => prev ? { ...prev, ...updates } : null)
  }

  // Handle notifications
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date(),
      read: false
    }
    setGameState(prev => prev ? {
      ...prev,
      notifications: [newNotification, ...prev.notifications]
    } : null)
  }

  // Render loading screen
  if (loading) {
    return (
      <div className="loading-screen">
        <Canvas>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} />
        </Canvas>

        <div className="loading-content">
          <h1>🎭 Mystical Treasure Hunt</h1>
          <div className="loading-spinners">
            <div className="spinner vision"></div>
            <div className="spinner treasure"></div>
            <div className="spinner realm"></div>
          </div>
          <p>Initializing visionary realms, treasure systems, and permanent registry...</p>
        </div>
      </div>
    )
  }

  // Render error screen
  if (error || !gameState) {
    return (
      <div className="error-screen">
        <h1>🔮 Mystical Mishap</h1>
        <p>Error: {error || 'Failed to load game state'}</p>
        <button onClick={() => window.location.reload()}>
          Retry Initializing Reality
        </button>
      </div>
    )
  }

  // Render main game
  return (
    <div className="mystical-game">
      <GameUI gameState={gameState} onUpdateGameState={updateGameState} />

      {gameState.currentView === 'map' && (
        <TreasureMap
          gameState={gameState}
          treasureSystem={treasureSystemRef.current!}
          worldExplorer={worldExplorerRef.current!}
          missionSystem={missionSystemRef.current!}
          onAddNotification={addNotification}
        />
      )}

      {gameState.currentView === 'visionary' && (
        <VisionaryRealm
          gameState={gameState}
          realmEngine={realmEngineRef.current!}
          onUpdateGameState={updateGameState}
          onAddNotification={addNotification}
        />
      )}

      {gameState.currentView === 'workshop' && (
        <GrimoireWorkshop
          gameState={gameState}
          registry={registryRef.current!}
          onUpdateGameState={updateGameState}
          onAddNotification={addNotification}
        />
      )}

      {/* Debug overlay for development */}
      {true && (
        <div className="debug-overlay">
          <details>
            <summary>🛠️ Debug Info</summary>
            <pre style={{ fontSize: '10px', maxHeight: '200px', overflow: 'auto' }}>
              {JSON.stringify(gameState, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}

export default MysticalTreasureGame
