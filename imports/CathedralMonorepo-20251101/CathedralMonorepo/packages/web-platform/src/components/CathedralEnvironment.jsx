import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CathedralEnvironment() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.children.forEach((child, i) => {
        if (child.userData.isParticle) {
          child.position.y += Math.sin(t + i) * 0.001
        }
      })
    }
  })
  
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: '#2A3A4A',
    roughness: 0.9,
    metalness: 0.1
  })
  
  const pillarMaterial = new THREE.MeshStandardMaterial({
    color: '#354555',
    roughness: 0.85,
    metalness: 0.15
  })
  
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#1E2A3A',
    roughness: 0.7,
    metalness: 0.2
  })
  
  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>
      
      {[-8, -4, 4, 8].map((x, i) => (
        <group key={`pillar-group-${i}`} position={[x, 0, -5]}>
          <mesh position={[0, 5, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.5, 10, 16]} />
            <primitive object={pillarMaterial} attach="material" />
          </mesh>
          
          <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[1, 0.8, 1]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
        </group>
      ))}
      
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 12
        return (
          <mesh
            key={`arch-${i}`}
            position={[Math.cos(angle) * radius, 8, Math.sin(angle) * radius]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.3, 4, 0.3]} />
            <primitive object={stoneMaterial} attach="material" />
          </mesh>
        )
      })}
      
      {[...Array(50)].map((_, i) => {
        const particle = (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 15 + 2,
              (Math.random() - 0.5) * 20
            ]}
            userData={{ isParticle: true }}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#FFB347" transparent opacity={0.6} />
          </mesh>
        )
        return particle
      })}
    </group>
  )
}
