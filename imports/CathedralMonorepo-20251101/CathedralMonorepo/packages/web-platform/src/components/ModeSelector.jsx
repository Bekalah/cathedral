import { useState } from 'react'
import useAppState from '../stores/AppState'
import '../styles/ModeSelector.css'

const modes = [
  { id: 'art', name: 'ART', icon: '🎨', desc: 'Create sacred geometry, visual grimoires' },
  { id: 'learn', name: 'LEARN', icon: '📚', desc: 'Study Ars Notoria, old books, mysteries' },
  { id: 'play', name: 'PLAY', icon: '🎮', desc: 'Fable-like pathworking, explore cathedral' },
  { id: 'study', name: 'STUDY', icon: '🔬', desc: 'Crystal science, mineralogy, frequencies' }
]

export default function ModeSelector() {
  const { mode, setMode } = useAppState()
  
  return (
    <div className="mode-selector">
      {modes.map(m => (
        <button
          key={m.id}
          className={`mode-btn ${mode === m.id ? 'active' : ''}`}
          onClick={() => setMode(m.id)}
          title={m.desc}
        >
          <span className="mode-icon">{m.icon}</span>
          <span className="mode-name">{m.name}</span>
        </button>
      ))}
    </div>
  )
}
