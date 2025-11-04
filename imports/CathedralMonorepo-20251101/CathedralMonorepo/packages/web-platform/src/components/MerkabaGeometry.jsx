import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function MerkabaGeometry() {
  const [tarotData, setTarotData] = useState(null)
  const merkabaRef = useRef()
  const helixRef = useRef()
  
  useEffect(() => {
    fetch('/TAROT_MASTER_DATASET.json')
      .then(res => res.json())
      .then(data => setTarotData(data.tarot_master_dataset.major_arcana))
      .catch(err => console.error('Failed to load tarot data:', err))
  }, [])
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (merkabaRef.current) {
      merkabaRef.current.rotation.y = t * 0.3
      merkabaRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
    
    if (helixRef.current) {
      helixRef.current.rotation.y = t * 0.2
    }
  })
  
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#f4d03f',
    emissive: '#ffeaa7',
    emissiveIntensity: 1.8,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9
  })
  
  const cyanMaterial = new THREE.MeshStandardMaterial({
    color: '#6de0e0',
    emissive: '#a7ffff',
    emissiveIntensity: 2.2,
    metalness: 0.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85
  })
  
  const createMerkaba = () => {
    const geometry = new THREE.OctahedronGeometry(1.5, 0)
    return geometry
  }
  
  const createHelix = () => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 50 }, (_, i) => {
        const t = i / 50
        const angle = t * Math.PI * 6
        const radius = 0.5
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * 8,
          Math.sin(angle) * radius
        )
      })
    )
    return new THREE.TubeGeometry(curve, 100, 0.08, 8, false)
  }
  
  return (
    <group>
      <group ref={merkabaRef} position={[0, 6, -3]}>
        <mesh geometry={createMerkaba()}>
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        <mesh geometry={createMerkaba()} rotation={[0, 0, Math.PI]}>
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        
        <mesh>
          <torusGeometry args={[2, 0.03, 16, 100]} />
          <primitive object={goldMaterial} attach="material" />
        </mesh>
        
      </group>
      
      <group ref={helixRef} position={[5, 5, 0]}>
        <mesh geometry={createHelix()}>
          <primitive object={cyanMaterial} attach="material" />
        </mesh>
        <mesh geometry={createHelix()} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial
            color="#ff9fbe"
            emissive="#ffc4d6"
            emissiveIntensity={1.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      
      {tarotData && (
        <mesh position={[-5, 3, 0]}>
          <boxGeometry args={[0.05, 3, 2]} />
          <meshStandardMaterial
            color="#1a1621"
            emissive="#6de0e0"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  )
}
