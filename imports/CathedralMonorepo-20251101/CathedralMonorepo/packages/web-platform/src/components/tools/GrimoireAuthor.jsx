import { useState } from 'react'

export default function GrimoireAuthor({ persona }) {
  const [content, setContent] = useState('')
  
  return (
    <div className="tool-panel grimoire-author">
      <h2 className="tool-title">Grimoire Authoring</h2>
      <p className="tool-subtitle">Scribe with {persona.name} • {persona.faculty_role}</p>
      
      <div className="tool-controls">
        <div className="control-group">
          <label>Grimoire Content</label>
          <textarea
            className="grimoire-editor"
            placeholder={`Write your grimoire entry... Channel ${persona.name}'s wisdom from the ${persona.department}...`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
          />
        </div>
        
        <div className="control-group">
          <label>Specialties</label>
          <div className="specialties-list">
            {persona.specialties?.map((spec, i) => (
              <span key={i} className="specialty-tag">{spec}</span>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn-primary">Illuminate</button>
          <button className="btn-secondary">Add Sacred Geometry</button>
          <button className="btn-secondary">Bind & Export</button>
        </div>
      </div>
    </div>
  )
}
