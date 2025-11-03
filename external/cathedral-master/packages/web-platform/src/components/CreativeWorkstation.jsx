import { useEffect } from 'react'
import useAppState from '../stores/AppState'
import GeometryEditor from './tools/GeometryEditor'
import SynthWorkstation from './tools/SynthWorkstation'
import GrimoireAuthor from './tools/GrimoireAuthor'
import StudyViewer from './tools/StudyViewer'
import '../styles/CreativeWorkstation.css'

export default function CreativeWorkstation() {
  const { mode, activePersona } = useAppState()
  
  if (!activePersona) {
    return (
      <div className="workstation-placeholder">
        <div className="placeholder-content">
          <h2>SELECT AN ARCANA</h2>
          <p>Choose a Major Arcana below to unlock their creative tools</p>
        </div>
      </div>
    )
  }
  
  const renderTool = () => {
    switch (mode) {
      case 'art':
        return <GeometryEditor persona={activePersona} />
      case 'learn':
        return <GrimoireAuthor persona={activePersona} />
      case 'play':
        return <SynthWorkstation persona={activePersona} />
      case 'study':
        return <StudyViewer persona={activePersona} />
      default:
        return null
    }
  }
  
  return (
    <div className="creative-workstation">
      <div className="workstation-header">
        <div className="active-persona-badge">
          <span className="persona-icon">{activePersona.number}</span>
          <div className="persona-info">
            <h3>{activePersona.name}</h3>
            <p>{activePersona.merkaba_chariot}</p>
          </div>
        </div>
        <div className="mode-badge">
          <span className="mode-label">{mode.toUpperCase()} MODE</span>
        </div>
      </div>
      
      <div className="workstation-content">
        {renderTool()}
      </div>
      
      <div className="provenance-footer">
        <p>Codex 144:99 • Circuitum 99 • Liber Arcanae • ND-Safe Covenant</p>
      </div>
    </div>
  )
}
