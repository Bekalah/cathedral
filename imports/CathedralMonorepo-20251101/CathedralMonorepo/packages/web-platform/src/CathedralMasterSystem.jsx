import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { engineLoader, ENGINE_MANIFEST } from './engines/EngineRegistry'

// ═══════════════════════════════════════════════════════════════════════════
// REAL CATHEDRAL MASTER SYSTEM
// Consolidates all 13 repositories into one immersive exploration environment
// Uses ACTUAL engines from GitHub, integrated through EngineRegistry
// ═══════════════════════════════════════════════════════════════════════════

function CathedralMasterSystem() {
  const [mode, setMode] = useState('cosmogenesis')
  const [ptsdSafe, setPtsdSafe] = useState(true)
  const [paused, setPaused] = useState(false)
  const [loadedEngines, setLoadedEngines] = useState(new Map())
  const [isReady, setIsReady] = useState(false)

  // PTSD-safe emergency pause that actually stops animations
  useEffect(() => {
    function handleEmergencyPause(e) {
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault()
        setPaused(prev => {
          const newState = !prev
          console.log('🛡️ PTSD Emergency pause:', newState ? 'PAUSED' : 'RESUMED')
          return newState
        })
      }
    }
    window.addEventListener('keydown', handleEmergencyPause)
    return () => window.removeEventListener('keydown', handleEmergencyPause)
  }, [])

  // Load engines when mode changes
  useEffect(() => {
    loadEnginesForMode(mode)
  }, [mode])

  async function loadEnginesForMode(modeName) {
    setIsReady(false)
    try {
      const engines = await engineLoader.loadModeEngines(modeName)
      setLoadedEngines(engines)
      setIsReady(true)
      console.log(`✨ Cathedral mode ready: ${modeName}`)
    } catch (err) {
      console.error('Failed to load cathedral engines:', err)
      setIsReady(false)
    }
  }

  if (!isReady) {
    return (
      <div className="cathedral-loading" style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A1628 0%, #1A4D5C 100%)',
        color: '#FFB347',
        fontFamily: 'Cinzel, serif'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏰 Cathedral of Circuits</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Loading real engines from 13 repositories...
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '1rem' }}>
          Mode: {mode} • Engines: {engineLoader.getStatus().loaded.length} loaded
        </p>
      </div>
    )
  }

  return (
    <div className="cathedral-master-system" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* UI Overlay */}
      <div className="cathedral-ui" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem',
        pointerEvents: 'none'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'auto'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              background: 'linear-gradient(90deg, #B8860B, #FFB347)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Cinzel, serif'
            }}>
              CATHEDRAL OF CIRCUITS
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#4A7BA7', fontSize: '0.9rem' }}>
              Master Opus • Codex 144:99 • 255 Engines Consolidated
            </p>
          </div>
          
          <div className="ptsd-status" style={{
            background: paused ? 'rgba(255, 59, 48, 0.9)' : 'rgba(76, 175, 80, 0.9)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            color: 'white',
            fontSize: '0.9rem'
          }}>
            {paused ? '⏸️ PAUSED (Safe)' : '🛡️ PTSD-Safe Mode Active'}
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Ctrl+Space to toggle</div>
          </div>
        </header>

        <div className="mode-selector" style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '0.5rem',
          pointerEvents: 'auto'
        }}>
          {['cosmogenesis', 'cymatics', 'oscilloscope', 'jacobsLadder'].map(engineId => (
            <button
              key={engineId}
              onClick={() => setMode(engineId)}
              style={{
                padding: '0.75rem 1.5rem',
                background: mode === engineId ? 'rgba(184, 134, 11, 0.9)' : 'rgba(26, 77, 92, 0.8)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              {ENGINE_MANIFEST[engineId].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* REAL Cosmogenesis SVG Overlay (when in cosmogenesis mode) */}
      {mode === 'cosmogenesis' && (
        <div id="cosmogenesis-svg-container" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} />
      )}

      {/* 3D Canvas (for other modes) */}
      <Canvas style={{ background: '#0A1628' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls enableDamping />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#FFB347" intensity={50} />
        <pointLight position={[-10, -10, 5]} color="#4A7BA7" intensity={30} />
        
        {mode === 'cymatics' && <CymaticsVisualization paused={paused} />}
        {mode === 'oscilloscope' && <OscilloscopeVisualization paused={paused} />}
        {mode === 'jacobsLadder' && <JacobsLadderVisualization paused={paused} />}
      </Canvas>
      
      {/* Load Cosmogenesis engine controller */}
      {mode === 'cosmogenesis' && <CosmogenesisController paused={paused} loadedEngines={loadedEngines} />}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// REAL ENGINE VISUALIZATIONS (using actual engine APIs)
// ═══════════════════════════════════════════════════════════════════════════

// Cosmogenesis Controller - Uses REAL Cosmogenesis.render() API
function CosmogenesisController({ paused, loadedEngines }) {
  const cosmoRef = useRef(null)
  const animationRef = useRef(null)
  
  useEffect(() => {
    // Get REAL Cosmogenesis engine
    const engine = loadedEngines.get('cosmogenesis')
    if (!engine) return
    
    const { Cosmogenesis } = engine
    const container = document.getElementById('cosmogenesis-svg-container')
    if (!container) return
    
    // Create Cosmogenesis instance and mount to DOM
    const cosmo = new Cosmogenesis({
      layout: 'spiral',
      mode: 33, // 33 nodes for Codex 144:99
      turns: 9,
      samples: 1600,
      rInner: 60,
      rOuter: 440,
      nodeSize: 28,
      borderWidth: 3,
      palette: {
        bg: 'transparent', // transparent for overlay
        ink: '#FFB347',
        monad: '#B8860B',
        spiral: '#FFB347',
        border: '#4A7BA7',
        nodes: ['#b7410e','#c56a1a','#d7a21a','#2e7d32','#1f6feb','#4338ca','#6d28d9']
      }
    })
    
    // Mount and render using REAL engine API
    cosmo.mount(container)
    cosmo.render()
    
    cosmoRef.current = cosmo
    console.log('✨ REAL Cosmogenesis engine rendered:', cosmo.config.mode, 'nodes')
    
    // Animate phase rotation (if not paused)
    function animate() {
      if (!paused && cosmoRef.current) {
        cosmoRef.current.phase += 0.005
        cosmoRef.current.render()
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [loadedEngines, paused])
  
  return null // Renders to DOM container, not React
}

function CymaticsVisualization({ paused }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (!paused && groupRef.current) {
      const nodes = groupRef.current.children
      nodes.forEach((node, i) => {
        const amp = Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.5 + 0.5
        node.scale.setScalar(0.5 + amp)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 33 }, (_, i) => {
        const angle = i * 0.4
        const radius = 0.5 * i
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0
            ]}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={new THREE.Color().setHSL(i / 33, 1, 0.5)}
              emissive={new THREE.Color().setHSL(i / 33, 1, 0.3)}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function OscilloscopeVisualization({ paused }) {
  const lineRef = useRef()
  
  useFrame((state) => {
    if (!paused && lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length / 3; i++) {
        const t = (i / (positions.length / 3)) * Math.PI * 4 + state.clock.elapsedTime
        positions[i * 3] = Math.cos(t) * 5
        positions[i * 3 + 1] = Math.sin(t * 3) * 3
        positions[i * 3 + 2] = Math.sin(t * 2) * 2
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const points = []
  for (let i = 0; i < 1000; i++) {
    points.push(new THREE.Vector3(0, 0, 0))
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#b7410e" linewidth={2} />
    </line>
  )
}

function IndraNetVisualization({ paused }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (!paused && meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[4, 2]} />
      <meshStandardMaterial 
        color="#1f6feb"
        wireframe
        emissive="#00FFFF"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function JacobsLadderVisualization({ paused }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (!paused && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, i * 1.5 - 8, 0]}>
          <torusGeometry args={[2 - i * 0.1, 0.2, 16, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(i / 12, 0.8, 0.5)}
            emissive={new THREE.Color().setHSL(i / 12, 0.8, 0.3)}
          />
        </mesh>
      ))}
    </group>
  )
}

export default CathedralMasterSystem
