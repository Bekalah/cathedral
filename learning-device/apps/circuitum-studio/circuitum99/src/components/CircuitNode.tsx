import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { MysticalNode } from '../store/mysticalStore'

interface CircuitNodeProps {
  node: MysticalNode
  position: [number, number, number]
  isSelected: boolean
  onClick: () => void
}

/**
 * 🌟 CATHEDRAL MYSTICAL NODE - Museum-Quality Interactive Art
 * Transforms basic spheres into stunning magical energy orbs
 */
export function CircuitNode({ node, position, isSelected, onClick }: CircuitNodeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const crystalRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)
  const particleRef = useRef<THREE.Points>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  // Generate particle positions for magical aura
  const particlePositions = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 2 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }

    return positions
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Mystical rotation based on element
      const rotationSpeed = node.element === 'fire' ? 1.0 :
                           node.element === 'water' ? 0.3 :
                           node.element === 'air' ? 0.7 : 0.5

      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }

    if (crystalRef.current) {
      // Pulsing crystal based on energy and element
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + node.energy * 5) * node.energy * 0.3
      crystalRef.current.scale.setScalar(pulse)

      // Color shifting based on energy level
      const material = crystalRef.current.material as THREE.MeshPhysicalMaterial
      if (material) {
        const hue = (node.energy + state.clock.elapsedTime * 0.1) % 1
        material.emissive.setHSL(hue, 0.8, node.energy * 0.5)
      }
    }

    if (auraRef.current) {
      // Rotating aura rings
      auraRef.current.rotation.z = state.clock.elapsedTime * 2
      auraRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.2
    }

    if (particleRef.current) {
      // Animate magical particles
      particleRef.current.rotation.y = state.clock.elapsedTime * 0.5
      particleRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }

    if (lightRef.current) {
      // Dynamic mystical lighting
      lightRef.current.intensity = node.energy * 3
      lightRef.current.distance = 15 + node.energy * 10
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* 🌈 MYSTICAL CRYSTAL CORE - Multi-faceted gemstone */}
      <mesh ref={crystalRef} onClick={onClick}>
        <octahedronGeometry args={[1.2, 2]} />
        <meshPhysicalMaterial
          color={node.color}
          metalness={0.1}
          roughness={0.1}
          transmission={0.3}
          thickness={0.5}
          emissive={node.color}
          emissiveIntensity={node.energy * 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ✨ MULTI-LAYERED AURA RINGS */}
      <group ref={auraRef}>
        {/* Inner Energy Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.8, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={node.energy * 0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Middle Mystical Ring */}
        <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <ringGeometry args={[2.2, 2.5, 32]} />
          <meshBasicMaterial
            color={this.lightenColor(node.color, 0.3)}
            transparent
            opacity={node.energy * 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Divine Ring */}
        <mesh rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
          <ringGeometry args={[2.8, 3.2, 32]} />
          <meshBasicMaterial
            color={this.lightenColor(node.color, 0.6)}
            transparent
            opacity={node.energy * 0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 🌟 MAGICAL PARTICLE AURA */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={node.color}
          transparent
          opacity={node.energy * 0.8}
          sizeAttenuation
        />
      </points>

      {/* 💫 MYSTICAL ENERGY STREAMERS */}
      <MysticalEnergyStreamers node={node} />

      {/* 🌟 DYNAMIC LIGHTING SYSTEM */}
      <pointLight
        ref={lightRef}
        color={node.color}
        intensity={node.energy * 3}
        distance={15}
      />

      {/* 🎴 SACRED NAME LABEL */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.4}
        color={node.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/mystical.woff"
      >
        {node.name}
      </Text>

      {/* ⚡ ENERGY LEVEL INDICATOR */}
      <Text
        position={[0, 2.0, 0]}
        fontSize={0.25}
        color={this.getEnergyColor(node.energy)}
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(node.energy * 100)}% ⚡
      </Text>

      {/* 🔮 ELEMENTAL SYMBOL */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color={node.color}
        anchorX="center"
        anchorY="middle"
      >
        {this.getElementSymbol(node.element)}
      </Text>

      {/* 🌐 SPHERE CONNECTIONS - Mystical Energy Links */}
      {node.fusion?.canFuseWith?.slice(0, 6).map((connectedId, index) => (
        <group key={connectedId}>
          {/* Connection Energy Stream */}
          <mesh
            position={[
              Math.cos((index / 6) * Math.PI * 2) * 2.5,
              Math.sin((index / 6) * Math.PI * 2) * 2.5,
              0
            ]}
          >
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={node.energy * 0.5}
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Energy Connection Line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  Math.cos((index / 6) * Math.PI * 2) * 2.5,
                  Math.sin((index / 6) * Math.PI * 2) * 2.5,
                  0,
                  0, 0, 0
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={node.color}
              transparent
              opacity={node.energy * 0.5}
            />
          </line>
        </group>
      ))}

      {/* ✨ SELECTION AURA - Divine Energy Field */}
      {isSelected && (
        <group>
          {/* Main Selection Sphere */}
          <mesh>
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>

          {/* Selection Particle Ring */}
          <SelectionParticleRing node={node} />

          {/* Divine Light Rays */}
          <DivineLightRays node={node} />
        </group>
      )}

      {/* 🎵 SOUND VISUALIZATION */}
      {node.sound && (
        <SoundVisualizationRing node={node} />
      )}
    </group>
  )
}

/**
 * Mystical energy streamers for magical effects
 */
function MysticalEnergyStreamers({ node }: { node: MysticalNode }) {
  const streamersRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (streamersRef.current) {
      streamersRef.current.rotation.z = state.clock.elapsedTime * 2
    }
  })

  return (
    <group ref={streamersRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`streamer-${i}`}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.8,
            Math.sin((i / 8) * Math.PI * 2) * 1.8,
            0
          ]}
          rotation={[0, 0, (i / 8) * Math.PI * 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={node.energy * 0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Selection particle ring for divine highlighting
 */
function SelectionParticleRing({ node }: { node: MysticalNode }) {
  const ringRef = useRef<THREE.Points>(null)

  const particleCount = 32
  const radius = 3.5

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const angle = (i / particleCount) * Math.PI * 2

      pos[i3] = Math.cos(angle) * radius
      pos[i3 + 1] = Math.sin(angle) * radius
      pos[i3 + 2] = 0
    }

    return pos
  }, [])

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 3
    }
  })

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={node.color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Divine light rays for mystical illumination
 */
function DivineLightRays({ node }: { node: MysticalNode }) {
  const raysRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (raysRef.current) {
      raysRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={raysRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`ray-${i}`}
          position={[0, 0, 0]}
          rotation={[0, (i / 12) * Math.PI * 2, Math.PI / 6]}
        >
          <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Sound visualization ring for audio feedback
 */
function SoundVisualizationRing({ node }: { node: MysticalNode }) {
  const soundRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (soundRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * (node.frequency / 100)) * 0.2
      soundRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <mesh ref={soundRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3.5, 4.0, 32]} />
      <meshBasicMaterial
        color={node.color}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * Utility function to lighten colors
 */
function lightenColor(color: string, amount: number): string {
  // Simple color lightening - in production use a proper color library
  const colorMap: { [key: string]: string } = {
    '#FF6B35': '#FF8C66',
    '#4ECDC4': '#7DD9D0',
    '#45B7D1': '#76C8E0',
    '#96CEB4': '#B4DCC8'
  }
  return colorMap[color] || color
}

/**
 * Get energy-based color for indicators
 */
function getEnergyColor(energy: number): string {
  if (energy > 0.8) return '#00FF00'
  if (energy > 0.6) return '#FFFF00'
  if (energy > 0.4) return '#FFA500'
  if (energy > 0.2) return '#FF6B35'
  return '#FF0000'
}

/**
 * Get elemental symbol for display
 */
function getElementSymbol(element: string): string {
  const symbols = {
    fire: '🔥',
    water: '💧',
    air: '💨',
    earth: '🌍'
  }
  return symbols[element as keyof typeof symbols] || '✨'
}
