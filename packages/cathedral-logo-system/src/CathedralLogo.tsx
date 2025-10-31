/**
 * 🏛️ CATHEDRAL LOGO & BRANDING SYSTEM
 * Museum-quality animated logos and mystical symbols
 */

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface CathedralLogoProps {
  position?: [number, number, number]
  scale?: number
  animation?: 'rotate' | 'pulse' | 'orbit' | 'breathe'
  variant?: 'main' | 'minimal' | 'arcane' | 'modern'
}

export function CathedralLogo({
  position = [0, 0, 0],
  scale = 1,
  animation = 'rotate',
  variant = 'main'
}: CathedralLogoProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const crystalRef = useRef<THREE.Mesh>(null)

  // Generate logo geometry based on variant
  const logoGeometry = useMemo(() => {
    switch (variant) {
      case 'main':
        return generateMainCathedralLogo()
      case 'minimal':
        return generateMinimalLogo()
      case 'arcane':
        return generateArcaneLogo()
      case 'modern':
        return generateModernLogo()
      default:
        return generateMainCathedralLogo()
    }
  }, [variant])

  useFrame((state) => {
    if (groupRef.current) {
      switch (animation) {
        case 'rotate':
          groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
          break
        case 'pulse':
          const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
          groupRef.current.scale.setScalar(scale * pulse)
          break
        case 'orbit':
          groupRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.3) * 2
          groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 2
          break
        case 'breathe':
          const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
          groupRef.current.scale.setScalar(scale * breathe)
          break
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2
    }

    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.7
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main Crystal Formation */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[2 * scale, 1]} />
        <meshPhysicalMaterial
          color="#8B5CF6"
          metalness={0.2}
          roughness={0.1}
          transmission={0.4}
          thickness={0.8}
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Sacred Geometry Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5 * scale, 3 * scale, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Mystical Ring */}
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <ringGeometry args={[3.5 * scale, 4 * scale, 32]} />
        <meshBasicMaterial
          color="#FF69B4"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cathedral Text Label */}
      <Text
        position={[0, -3 * scale, 0]}
        fontSize={0.8 * scale}
        color="#8B5CF6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/cathedral.woff"
      >
        CATHEDRAL
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -4 * scale, 0]}
        fontSize={0.4 * scale}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        OF CIRCUITS
      </Text>

      {/* Mystical Particles */}
      <LogoParticles scale={scale} />

      {/* Sacred Light Beams */}
      <LogoLightBeams scale={scale} />
    </group>
  )
}

/**
 * Generate main cathedral logo geometry
 */
function generateMainCathedralLogo() {
  return {
    vertices: [
      // Gothic archway structure
      [-1, 2, 0], [1, 2, 0], [0, 3, 0], // Top arch
      [-2, 0, 0], [2, 0, 0], [0, 1, 0], // Middle section
      [-1.5, -2, 0], [1.5, -2, 0], [0, -3, 0] // Base
    ],
    faces: [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ]
  }
}

/**
 * Generate minimal logo variant
 */
function generateMinimalLogo() {
  return {
    vertices: [
      [0, 1, 0], [-0.7, 0.5, 0], [0.7, 0.5, 0],
      [-1, -0.5, 0], [1, -0.5, 0], [0, -1, 0]
    ],
    faces: [
      [0, 1, 2], [3, 4, 5], [1, 3, 0], [2, 4, 0]
    ]
  }
}

/**
 * Generate arcane mystical logo
 */
function generateArcaneLogo() {
  return {
    vertices: [
      // Pentagram formation
      [0, 2, 0], [-1.9, 0.6, 0], [1.9, 0.6, 0],
      [-1.2, -1.6, 0], [1.2, -1.6, 0], [0, -1, 0]
    ],
    faces: [
      [0, 1, 3], [0, 3, 5], [0, 5, 4], [0, 4, 2],
      [1, 2, 3], [2, 3, 4], [3, 4, 5]
    ]
  }
}

/**
 * Generate modern tech logo
 */
function generateModernLogo() {
  return {
    vertices: [
      // Circuit board pattern
      [-1, 1, 0], [1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [0, 0, 0], [-0.5, 0.5, 0], [0.5, 0.5, 0], [0.5, -0.5, 0], [-0.5, -0.5, 0]
    ],
    faces: [
      [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4],
      [5, 6, 7], [7, 8, 5]
    ]
  }
}

/**
 * Mystical particles for logo atmosphere
 */
function LogoParticles({ scale }: { scale: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 3 + Math.random() * 4
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
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2
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
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05 * scale}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Sacred light beams for divine illumination
 */
function LogoLightBeams({ scale }: { scale: number }) {
  const beamsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={beamsRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`beam-${i}`}
          position={[0, 0, 0]}
          rotation={[0, (i / 12) * Math.PI * 2, Math.PI / 6]}
        >
          <cylinderGeometry args={[0.02 * scale, 0.02 * scale, 8 * scale, 8]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Arcanae Card Logo Component
 */
export function ArcanaeLogo({
  cardNumber,
  cardName,
  position = [0, 0, 0],
  scale = 1
}: {
  cardNumber: number
  cardName: string
  position?: [number, number, number]
  scale?: number
}) {
  const logoRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y = state.clock.elapsedTime * 0.5
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={logoRef} position={position}>
      {/* Card Symbol Crystal */}
      <mesh>
        <dodecahedronGeometry args={[1.5 * scale, 0]} />
        <meshPhysicalMaterial
          color={getCardColor(cardNumber)}
          metalness={0.3}
          roughness={0.2}
          emissive={getCardColor(cardNumber)}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Card Number Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2 * scale, 2.5 * scale, 32]} />
        <meshBasicMaterial
          color={getCardColor(cardNumber)}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Card Name */}
      <Text
        position={[0, -2.5 * scale, 0]}
        fontSize={0.6 * scale}
        color={getCardColor(cardNumber)}
        anchorX="center"
        anchorY="middle"
      >
        {cardNumber}
      </Text>

      <Text
        position={[0, -3.5 * scale, 0]}
        fontSize={0.3 * scale}
        color={getCardColor(cardNumber)}
        anchorX="center"
        anchorY="middle"
      >
        {cardName.toUpperCase()}
      </Text>

      {/* Mystical Aura Particles */}
      <ArcanaeParticles cardNumber={cardNumber} scale={scale} />
    </group>
  )
}

/**
 * Mystical particles for arcanae logos
 */
function ArcanaeParticles({ cardNumber, scale }: { cardNumber: number; scale: number }) {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 30
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2

      pos[i3] = Math.cos(theta) * radius
      pos[i3 + 1] = (Math.random() - 0.5) * 4
      pos[i3 + 2] = Math.sin(theta) * radius
    }

    return pos
  }, [cardNumber])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.3
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
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08 * scale}
        color={getCardColor(cardNumber)}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Get color for card number
 */
function getCardColor(cardNumber: number): string {
  const colors = [
    '#FFD700', // 0: The Fool - Gold
    '#C0C0C0', // 1: The Magician - Silver
    '#E6E6FA', // 2: High Priestess - Lavender
    '#00FF00', // 3: The Empress - Green
    '#FF0000', // 4: The Emperor - Red
    '#FFA500', // 5: The Hierophant - Orange
    '#FF69B4', // 6: The Lovers - Pink
    '#4169E1', // 7: The Chariot - Royal Blue
    '#FFFF00', // 8: Strength - Yellow
    '#800080', // 9: The Hermit - Purple
    '#8B4513', // 10: Wheel of Fortune - Brown
    '#008080', // 11: Justice - Teal
    '#FF6347', // 12: The Hanged Man - Tomato
    '#000000', // 13: Death - Black
    '#DDA0DD', // 14: Temperance - Plum
    '#8B0000', // 15: The Devil - Dark Red
    '#000080', // 16: The Tower - Navy
    '#FFB6C1', // 17: The Star - Light Pink
    '#708090', // 18: The Moon - Slate Gray
    '#FFD700', // 19: The Sun - Gold
    '#F5DEB3', // 20: Judgement - Wheat
    '#4B0082'  // 21: The World - Indigo
  ]

  return colors[cardNumber] || '#8B5CF6'
}

/**
 * Cathedral Logo Gallery Component
 */
export function CathedralLogoGallery() {
  const logos = [
    { variant: 'main' as const, position: [-10, 0, 0], animation: 'rotate' as const },
    { variant: 'arcane' as const, position: [0, 0, 0], animation: 'pulse' as const },
    { variant: 'modern' as const, position: [10, 0, 0], animation: 'orbit' as const },
    { variant: 'minimal' as const, position: [0, 5, 0], animation: 'breathe' as const }
  ]

  return (
    <group>
      {logos.map((logo, index) => (
        <CathedralLogo
          key={index}
          variant={logo.variant}
          position={logo.position}
          animation={logo.animation}
          scale={0.8}
        />
      ))}

      {/* Gallery Lighting */}
      <ambientLight intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[0, -10, -10]} intensity={0.5} color="#FF69B4" />
    </group>
  )
}

/**
 * Individual Arcanae Card Logos
 */
export function ArcanaeCardLogos() {
  const majorArcana = [
    { number: 0, name: 'The Fool' },
    { number: 1, name: 'The Magician' },
    { number: 2, name: 'The High Priestess' },
    { number: 3, name: 'The Empress' },
    { number: 4, name: 'The Emperor' }
  ]

  return (
    <group>
      {majorArcana.map((card, index) => (
        <ArcanaeLogo
          key={card.number}
          cardNumber={card.number}
          cardName={card.name}
          position={[
            (index % 5) * 4 - 8,
            Math.floor(index / 5) * 6 - 3,
            0
          ] as [number, number, number]}
          scale={0.6}
        />
      ))}
    </group>
  )
}

/**
 * Mystical Branding Overlay
 */
export function MysticalBrandingOverlay() {
  return (
    <group>
      {/* Main Cathedral Logo */}
      <CathedralLogo
        position={[0, 0, -5]}
        scale={0.5}
        animation="rotate"
        variant="main"
      />

      {/* Sacred Geometry Frame */}
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[20, 12]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Corner Sacred Symbols */}
      {[
        [-9, 5, -4], [9, 5, -4],
        [-9, -5, -4], [9, -5, -4]
      ].map((pos, index) => (
        <mesh key={index} position={pos}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Mystical Border Pattern */}
      <MysticalBorderPattern />
    </group>
  )
}

/**
 * Sacred geometry border pattern
 */
function MysticalBorderPattern() {
  const patternRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (patternRef.current) {
      patternRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={patternRef}>
      {Array.from({ length: 16 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 16) * Math.PI * 2) * 9,
            Math.sin((i / 16) * Math.PI * 2) * 9,
            -4
          ]}
        >
          <tetrahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
