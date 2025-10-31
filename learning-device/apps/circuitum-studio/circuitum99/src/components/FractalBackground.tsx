import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMysticalStore } from '../store/mysticalStore'

/**
 * 🌟 CATHEDRAL SACRED GEOMETRY BACKGROUND
 * Museum-quality mathematical beauty instead of simple points
 */

export function FractalBackground() {
  const groupRef = useRef<THREE.Group>(null)
  const treeOfLifeRef = useRef<THREE.Group>(null)
  const flowerOfLifeRef = useRef<THREE.Group>(null)
  const metatronRef = useRef<THREE.Group>(null)
  const { energyLevel, currentRealm, fusionMode, researchMode } = useMysticalStore()

  // Generate Tree of Life positions (10 Sephiroth + 22 Paths)
  const treeOfLifeData = useMemo(() => {
    const sephiroth = [
      { name: 'Keter', position: [0, 8, 0], color: '#FFD700', size: 0.8 },
      { name: 'Chokmah', position: [-3, 6, 0], color: '#C0C0C0', size: 0.7 },
      { name: 'Binah', position: [3, 6, 0], color: '#000000', size: 0.7 },
      { name: 'Chesed', position: [-4, 4, 0], color: '#0000FF', size: 0.6 },
      { name: 'Geburah', position: [4, 4, 0], color: '#FF0000', size: 0.6 },
      { name: 'Tiphereth', position: [0, 3, 0], color: '#FFFF00', size: 0.8 },
      { name: 'Netzach', position: [-3, 1, 0], color: '#00FF00', size: 0.6 },
      { name: 'Hod', position: [3, 1, 0], color: '#FFA500', size: 0.6 },
      { name: 'Yesod', position: [0, -1, 0], color: '#800080', size: 0.7 },
      { name: 'Malkuth', position: [0, -3, 0], color: '#8B4513', size: 0.9 }
    ]

    const paths = [
      // Connect sephiroth with sacred geometry paths
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 },
      { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 5, to: 7 },
      { from: 6, to: 8 }, { from: 7, to: 8 }, { from: 8, to: 9 }
    ]

    return { sephiroth, paths }
  }, [])

  // Generate Flower of Life pattern
  const flowerOfLifeData = useMemo(() => {
    const circles = []
    const radius = 1.5
    const centers = []

    // Generate 7 overlapping circles in Flower of Life pattern
    for (let i = 0; i < 7; i++) {
      const angle = (i * 2 * Math.PI) / 6
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      centers.push([x, 0, z])
    }

    return { centers, radius }
  }, [])

  // Generate Metatron's Cube vertices
  const metatronData = useMemo(() => {
    const vertices = []
    const radius = 2.5

    // 13 vertices of Metatron's Cube
    for (let i = 0; i < 13; i++) {
      if (i === 0) {
        vertices.push([0, 0, 0]) // Center
      } else {
        const angle = (i - 1) * (2 * Math.PI) / 12
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        vertices.push([x, 0, z])
      }
    }

    return vertices
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of entire background
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }

    if (treeOfLifeRef.current) {
      // Pulsing Tree of Life based on energy
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * energyLevel * 0.3
      treeOfLifeRef.current.scale.setScalar(pulse)
    }

    if (flowerOfLifeRef.current) {
      // Rotating Flower of Life
      flowerOfLifeRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }

    if (metatronRef.current) {
      // Gentle floating motion for Metatron's Cube
      metatronRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* 🌳 TREE OF LIFE - Sacred Kabbalistic Structure */}
      <group ref={treeOfLifeRef}>
        {treeOfLifeData.sephiroth.map((sephirah, index) => (
          <group key={sephirah.name} position={sephirah.position}>
            {/* Main Sephirah Sphere */}
            <mesh>
              <sphereGeometry args={[sephirah.size, 32, 32]} />
              <meshStandardMaterial
                color={sephirah.color}
                emissive={sephirah.color}
                emissiveIntensity={energyLevel * 0.5}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Sephirah Aura Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[sephirah.size * 1.2, sephirah.size * 1.5, 32]} />
              <meshBasicMaterial
                color={sephirah.color}
                transparent
                opacity={energyLevel * 0.3}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Sacred Name Label */}
            <Text
              position={[0, sephirah.size + 0.5, 0]}
              fontSize={0.3}
              color={sephirah.color}
              anchorX="center"
              anchorY="middle"
            >
              {sephirah.name}
            </Text>
          </group>
        ))}

        {/* Tree of Life Connection Paths */}
        {treeOfLifeData.paths.map((path, index) => {
          const from = treeOfLifeData.sephiroth[path.from]
          const to = treeOfLifeData.sephiroth[path.to]

          return (
            <line key={`path-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...from.position,
                    ...to.position
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#8B5CF6"
                transparent
                opacity={energyLevel * 0.5}
              />
            </line>
          )
        })}
      </group>

      {/* 🌸 FLOWER OF LIFE - Sacred Geometry Pattern */}
      <group ref={flowerOfLifeRef} position={[0, 0, -10]}>
        {flowerOfLifeData.centers.map((center, index) => (
          <group key={`flower-${index}`} position={center}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[flowerOfLifeData.radius * 0.9, flowerOfLifeData.radius, 64]} />
              <meshBasicMaterial
                color="#E6E6FA"
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Overlapping circles effect */}
            <mesh>
              <circleGeometry args={[flowerOfLifeData.radius, 32]} />
              <meshBasicMaterial
                color="#4169E1"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 🔮 METATRON'S CUBE - Advanced Sacred Geometry */}
      <group ref={metatronRef} position={[0, 0, 10]}>
        {metatronData.map((vertex, index) => (
          <group key={`metatron-${index}`} position={vertex}>
            <mesh>
              <octahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Connecting lines to center */}
            {index > 0 && (
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([...vertex, 0, 0, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#FF69B4" transparent opacity={0.6} />
              </line>
            )}
          </group>
        ))}

        {/* Metatron's Cube outer structure */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[3, 3, 0.1, 32]} />
          <meshBasicMaterial
            color="#8A2BE2"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ✨ MYSTICAL PARTICLE FIELD */}
      <MysticalParticleField energyLevel={energyLevel} />

      {/* 🌌 SACRED LIGHT BEAMS */}
      <SacredLightBeams energyLevel={energyLevel} />

      {/* 🎨 BACKGROUND AMBIENT ELEMENTS */}
      <ambientLight intensity={0.4} color="#8B5CF6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFD700" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF69B4" />
    </group>
  )
}

/**
 * Mystical particle field for magical atmosphere
 */
function MysticalParticleField({ energyLevel }: { energyLevel: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 500
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Create mystical particle distribution
      const radius = Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)
    }

    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Animate particles based on energy
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8B5CF6"
        transparent
        opacity={energyLevel * 0.8}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Sacred light beams for divine illumination
 */
function SacredLightBeams({ energyLevel }: { energyLevel: number }) {
  const beamsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={beamsRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <group key={`beam-${i}`} rotation={[0, (i * Math.PI) / 4, 0]}>
          <mesh position={[0, 0, -20]}>
            <cylinderGeometry args={[0.1, 0.1, 40, 8]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={energyLevel * 0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
