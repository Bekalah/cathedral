import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SacredGeometry from './SacredGeometry';
import './CathedralScene.css';

function CathedralScene({ activeModule }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9b59b6" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <SacredGeometry activeModule={activeModule} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </Canvas>
  );
}

export default CathedralScene;
