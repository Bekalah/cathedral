import { useState } from 'react'

export default function SynthWorkstation({ persona }) {
  const [activeNote, setActiveNote] = useState(null)
  
  const solfeggio = [
    { freq: 174, name: 'UT - Foundation' },
    { freq: 285, name: 'RE - Quantum Cognition' },
    { freq: 396, name: 'MI - Liberation' },
    { freq: 417, name: 'FA - Transmutation' },
    { freq: 528, name: 'SOL - Miracles & DNA' },
    { freq: 639, name: 'LA - Connection' },
    { freq: 741, name: 'SI - Awakening' },
    { freq: 852, name: 'TI - Intuition' },
    { freq: 963, name: 'DO - Oneness' }
  ]
  
  return (
    <div className="tool-panel synth-workstation">
      <h2 className="tool-title">Synthesizer Workstation</h2>
      <p className="tool-subtitle">{persona.name} • {persona.frequency_hz} Hz Base Frequency</p>
      
      <div className="tool-controls">
        <div className="control-group">
          <label>Solfeggio Frequencies</label>
          <div className="frequency-keyboard">
            {solfeggio.map(note => (
              <button
                key={note.freq}
                className={`freq-key ${activeNote === note.freq ? 'active' : ''} ${note.freq === persona.frequency_hz ? 'persona-freq' : ''}`}
                onMouseDown={() => setActiveNote(note.freq)}
                onMouseUp={() => setActiveNote(null)}
                onMouseLeave={() => setActiveNote(null)}
              >
                <span className="freq-value">{note.freq} Hz</span>
                <span className="freq-name">{note.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="control-group">
          <label>Persona Powers</label>
          <div className="powers-list">
            {persona.powers?.map((power, i) => (
              <div key={i} className="power-item">
                {power}
              </div>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-primary">Play Sequence</button>
          <button className="btn-secondary">Record</button>
          <button className="btn-secondary">Export Audio</button>
        </div>
      </div>
    </div>
  )
}
