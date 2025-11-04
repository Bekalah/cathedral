import { useState } from 'react'

export default function GeometryEditor({ persona }) {
  const [shape, setShape] = useState('merkaba')
  const [scale, setScale] = useState(1.0)
  const [rotation, setRotation] = useState(0)
  
  const geometryTypes = [
    { id: 'merkaba', name: 'Merkaba Star', desc: 'Double tetrahedron' },
    { id: 'vesica', name: 'Vesica Piscis', desc: 'Two circles union' },
    { id: 'tree', name: 'Tree of Life', desc: '10 Sephiroth + 22 paths' },
    { id: 'fibonacci', name: 'Fibonacci Spiral', desc: 'Golden ratio curve' },
    { id: 'helix', name: 'DNA Helix', desc: 'Double spiral' },
    { id: 'monad', name: "Dee's Monad", desc: 'Hieroglyphica' }
  ]
  
  return (
    <div className="tool-panel geometry-editor">
      <h2 className="tool-title">Sacred Geometry Editor</h2>
      <p className="tool-subtitle">Create with {persona.name}'s {persona.merkaba_chariot}</p>
      
      <div className="tool-controls">
        <div className="control-group">
          <label>Geometry Type</label>
          <div className="geometry-grid">
            {geometryTypes.map(geo => (
              <button
                key={geo.id}
                className={`geometry-btn ${shape === geo.id ? 'active' : ''}`}
                onClick={() => setShape(geo.id)}
              >
                <span>{geo.name}</span>
                <small>{geo.desc}</small>
              </button>
            ))}
          </div>
        </div>
        
        <div className="control-group">
          <label>Scale: {scale.toFixed(2)}</label>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
          />
        </div>
        
        <div className="control-group">
          <label>Rotation: {rotation}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
          />
        </div>
        
        <div className="control-group">
          <label>Frequency: {persona.frequency_hz} Hz</label>
          <div className="frequency-display">{persona.color}</div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-primary">Generate</button>
          <button className="btn-secondary">Export SVG</button>
          <button className="btn-secondary">Save to Grimoire</button>
        </div>
      </div>
    </div>
  )
}
