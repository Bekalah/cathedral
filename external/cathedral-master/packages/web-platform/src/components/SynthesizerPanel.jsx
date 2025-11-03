import { useState } from 'react';
import './SynthesizerPanel.css';

function SynthesizerPanel() {
  const [activeSynth, setActiveSynth] = useState(null);
  
  const synthesizers = [
    { id: 'moog55', name: 'Moog System 55', type: 'Modular Legend', price: '$150,000' },
    { id: 'buchla200e', name: 'Buchla 200e', type: 'West Coast', price: '$15,000' },
    { id: 'fairlight', name: 'Fairlight CMI III', type: 'Digital Pioneer', price: '$100,000' },
    { id: 'gx1', name: 'Yamaha GX-1', type: 'Polyphonic Monster', price: '$50,000' },
    { id: 'synthi100', name: 'EMS Synthi-100', type: 'Matrix Modular', price: '$25,000' },
    { id: 'synclavier', name: 'Synclavier', type: 'Digital Powerhouse', price: '$200,000' },
    { id: 'oberheim', name: 'Oberheim 8-Voice', type: 'Analog Poly', price: '$15,000' },
    { id: 'cs80', name: 'Yamaha CS-80', type: 'Expressive Classic', price: '$20,000' },
    { id: 'jupiter8', name: 'Roland Jupiter-8', type: 'Analog Legend', price: '$12,000' },
    { id: 'moogone', name: 'Moog One', type: 'Modern Flagship', price: '$8,000' }
  ];

  return (
    <div className="synth-panel">
      <h2>10 Legendary Synthesizers</h2>
      <p>Free Web Audio replicas of the most expensive synths in history</p>
      
      <div className="synth-grid">
        {synthesizers.map(synth => (
          <button
            key={synth.id}
            className={`synth-card ${activeSynth === synth.id ? 'active' : ''}`}
            onClick={() => setActiveSynth(synth.id)}
          >
            <div className="synth-header">
              <h3>{synth.name}</h3>
              <span className="synth-price">{synth.price}</span>
            </div>
            <p className="synth-type">{synth.type}</p>
            <div className="synth-controls">
              <div className="knob"></div>
              <div className="knob"></div>
              <div className="knob"></div>
            </div>
          </button>
        ))}
      </div>
      
      {activeSynth && (
        <div className="synth-detail">
          <p>🎹 Synthesizer module loaded. Full Web Audio implementation coming in next phase.</p>
        </div>
      )}
    </div>
  );
}

export default SynthesizerPanel;
