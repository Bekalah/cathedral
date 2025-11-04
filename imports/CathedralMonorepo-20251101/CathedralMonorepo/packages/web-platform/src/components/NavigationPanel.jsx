import './NavigationPanel.css';

function NavigationPanel({ activePanel, setActivePanel }) {
  const modules = [
    { id: 'cathedral', name: 'Cathedral', icon: '🏰', desc: 'Sacred Geometry' },
    { id: 'synthesizers', name: 'Synthesizers', icon: '🎹', desc: '10 Legendary' },
    { id: 'characters', name: 'Characters', icon: '🎴', desc: '22 Tarot' },
    { id: 'codex', name: 'Codex 144:99', icon: '📖', desc: '7 Ribbons' }
  ];

  return (
    <div className="navigation-panel">
      <h3>Modules</h3>
      <div className="module-grid">
        {modules.map(module => (
          <button
            key={module.id}
            className={`module-btn ${activePanel === module.id ? 'active' : ''}`}
            onClick={() => setActivePanel(module.id)}
          >
            <span className="module-icon">{module.icon}</span>
            <span className="module-name">{module.name}</span>
            <span className="module-desc">{module.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavigationPanel;
