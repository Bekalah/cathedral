import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraController() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const keys = useRef({ w: false, a: false, s: false, d: false })
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = true
      }
    }
    
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = false
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  useFrame(() => {
    const speed = 0.1
    const direction = new THREE.Vector3()
    
    if (keys.current.w) camera.position.z -= speed
    if (keys.current.s) camera.position.z += speed
    if (keys.current.a) camera.position.x -= speed
    if (keys.current.d) camera.position.x += speed
  })
  
  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2}
      target={[0, 3, 0]}
    />
  )
}
