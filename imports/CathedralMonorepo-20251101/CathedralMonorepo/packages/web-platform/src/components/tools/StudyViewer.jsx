export default function StudyViewer({ persona }) {
  return (
    <div className="tool-panel study-viewer">
      <h2 className="tool-title">Study & Analysis</h2>
      <p className="tool-subtitle">{persona.name} • Crystal & Scientific Study</p>
      
      <div className="tool-controls">
        <div className="study-grid">
          <div className="study-card">
            <h4>Element</h4>
            <p className="study-value">{persona.element}</p>
          </div>
          <div className="study-card">
            <h4>Planet</h4>
            <p className="study-value">{persona.planet}</p>
          </div>
          <div className="study-card">
            <h4>Hebrew Letter</h4>
            <p className="study-value">{persona.hebrew_letter}</p>
          </div>
          <div className="study-card">
            <h4>Frequency</h4>
            <p className="study-value">{persona.frequency_hz} Hz</p>
          </div>
          <div className="study-card">
            <h4>Color</h4>
            <div className="color-swatch" style={{ backgroundColor: persona.color }}></div>
            <p className="study-value">{persona.color}</p>
          </div>
          <div className="study-card">
            <h4>Archetype</h4>
            <p className="study-value">{persona.archetype}</p>
          </div>
        </div>
        
        <div className="study-section">
          <h4>Keywords</h4>
          <div className="keywords-list">
            {persona.keywords?.map((kw, i) => (
              <span key={i} className="keyword-tag">{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
