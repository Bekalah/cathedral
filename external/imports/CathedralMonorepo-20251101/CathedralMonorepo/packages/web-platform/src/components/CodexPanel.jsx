import './CodexPanel.css';

function CodexPanel() {
  const ribbons = [
    { id: 'science', name: 'SCIENCE', color: '#6de0e0', desc: 'Empirical knowledge, Sacred geometry mathematics' },
    { id: 'cannon', name: 'CANNON', color: '#f4d03f', desc: 'Established wisdom, Traditional grimoire systems' },
    { id: 'psych', name: 'PSYCH', color: '#8a7fff', desc: 'Mind sciences, Consciousness exploration' },
    { id: 'craft', name: 'CRAFT', color: '#ff9fbe', desc: 'Practical arts, Ritual implementation' },
    { id: 'esoteric', name: 'ESOTERIC', color: '#ffeaa7', desc: 'Hidden teachings, Mystery traditions' },
    { id: 'research', name: 'RESEARCH', color: '#a7ffff', desc: 'Active inquiry, Experimental pathworking' },
    { id: 'fusion', name: 'FUSION', color: '#8a7fff', desc: 'Integration, Where all streams converge' }
  ];

  return (
    <div className="codex-panel">
      <h2>Codex 144:99</h2>
      <p>Seven-Ribbon Architecture - Cathedral of Circuits Board</p>
      
      <div className="ribbon-container">
        {ribbons.map(ribbon => (
          <div
            key={ribbon.id}
            className="ribbon"
            style={{ borderLeftColor: ribbon.color }}
          >
            <div className="ribbon-header">
              <h3 style={{ color: ribbon.color }}>{ribbon.name}</h3>
              <span className="ribbon-sigil" style={{ color: ribbon.color }}>∞</span>
            </div>
            <p>{ribbon.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="codex-info">
        <h3>144:99 Frequency</h3>
        <p>The ratio of divine completion (12×12) to earthly manifestation (9×11). This codex bridges celestial mathematics with practical application through the seven streams of knowledge.</p>
      </div>
    </div>
  );
}

export default CodexPanel;
