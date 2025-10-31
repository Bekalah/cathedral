import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <div style={{ width: '100vw', height: '100vh', background: '#0F172A' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <App />

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Environment preset="night" />
      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: '#E2E8F0',
          fontFamily: 'Georgia, serif',
          pointerEvents: 'auto'
        }}>
          <h1 style={{
            fontSize: '2em',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #60A5FA, #A855F7, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🧠 Cosmogenesis Learning Engine
          </h1>
          <p style={{ opacity: 0.8, fontSize: '1.1em' }}>
            Sacred Geometry & Consciousness Technology
          </p>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          color: '#94A3B8',
          fontSize: '0.9em',
          pointerEvents: 'auto'
        }}>
          <div>🎼 Sacred Frequencies Active</div>
          <div>🔮 144:99 Mathematics Valid</div>
          <div>🌟 Fusion Kink Heaven Connected</div>
        </div>
      </div>
    </div>
  </React.StrictMode>
);
