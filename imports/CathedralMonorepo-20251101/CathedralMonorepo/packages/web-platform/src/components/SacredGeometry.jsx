import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SacredGeometry({ activeModule }) {
  const vesicaRef = useRef();
  const torusRef = useRef();
  const spiralRef = useRef();
  const helixRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (vesicaRef.current) {
      vesicaRef.current.rotation.y = t * 0.3;
      vesicaRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.3;
    }
    
    if (spiralRef.current) {
      spiralRef.current.rotation.z = t * 0.4;
    }
    
    if (helixRef.current) {
      helixRef.current.rotation.y = t * 0.5;
    }
  });

  const vesicaMaterial = new THREE.MeshPhongMaterial({
    color: '#f4d03f',
    emissive: '#ffeaa7',
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.7,
    wireframe: true
  });

  const torusMaterial = new THREE.MeshPhongMaterial({
    color: '#8a7fff',
    emissive: '#8a7fff',
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.6
  });

  const spiralMaterial = new THREE.MeshPhongMaterial({
    color: '#6de0e0',
    emissive: '#a7ffff',
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.8
  });

  return (
    <group>
      <mesh ref={vesicaRef} position={[-1.5, 0, 0]} material={vesicaMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      
      <mesh ref={vesicaRef} position={[1.5, 0, 0]} material={vesicaMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
      
      <mesh ref={torusRef} material={torusMaterial}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
      </mesh>
      
      <mesh ref={spiralRef} position={[0, 0, -1]} material={spiralMaterial}>
        <torusKnotGeometry args={[1, 0.2, 100, 16, 3, 5]} />
      </mesh>
      
      <mesh ref={helixRef} position={[0, 0, 1]} material={vesicaMaterial}>
        <torusKnotGeometry args={[0.8, 0.15, 100, 16, 2, 3]} />
      </mesh>
    </group>
  );
}

export default SacredGeometry;
