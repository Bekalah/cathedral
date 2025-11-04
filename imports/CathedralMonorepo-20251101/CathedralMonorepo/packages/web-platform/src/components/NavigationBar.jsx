import useAppState from '../stores/AppState'
import '../styles/NavigationBar.css'

export default function NavigationBar() {
  const { view, setView } = useAppState()
  
  const views = [
    { id: 'workstation', name: 'Creative Tools', icon: '⚡' },
    { id: 'codex', name: 'Codex 144:99', icon: '📖' },
    { id: 'characters', name: '22 Arcana', icon: '🃏' },
    { id: 'synths', name: 'Synthesizers', icon: '🎹' }
  ]
  
  return (
    <nav className="navigation-bar">
      {views.map(v => (
        <button
          key={v.id}
          className={`nav-btn ${view === v.id ? 'active' : ''}`}
          onClick={() => setView(v.id)}
        >
          <span className="nav-icon">{v.icon}</span>
          <span className="nav-label">{v.name}</span>
        </button>
      ))}
      
      <div className="nav-provenance">
        <small>OpenSpec Master Opus • Cathedral 144:99 • ND-Safe Covenant</small>
      </div>
    </nav>
  )
}
