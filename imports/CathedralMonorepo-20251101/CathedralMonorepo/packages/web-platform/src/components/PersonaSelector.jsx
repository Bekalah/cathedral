import { useEffect } from 'react'
import useAppState from '../stores/AppState'
import '../styles/PersonaSelector.css'

export default function PersonaSelector() {
  const { tarotData, activePersona, setActivePersona, loadData } = useAppState()
  
  useEffect(() => {
    if (!tarotData) {
      loadData()
    }
  }, [tarotData, loadData])
  
  if (!tarotData) {
    return <div className="persona-loading">Loading Arcana...</div>
  }
  
  const majorArcana = tarotData.major_arcana || []
  
  return (
    <div className="persona-selector">
      <h3 className="persona-title">SELECT ARCANA</h3>
      <div className="persona-grid">
        {majorArcana.slice(0, 22).map(card => (
          <button
            key={card.number}
            className={`persona-card ${activePersona?.number === card.number ? 'active' : ''}`}
            onClick={() => setActivePersona(card)}
            style={{
              borderColor: activePersona?.number === card.number ? card.color : 'transparent'
            }}
          >
            <div className="persona-number">{card.number}</div>
            <div className="persona-name">{card.name}</div>
            <div className="persona-dept">{card.department?.split(' ').slice(0, 3).join(' ')}</div>
            <div className="persona-freq">{card.frequency_hz} Hz</div>
          </button>
        ))}
      </div>
      
      {activePersona && (
        <div className="persona-details">
          <h4>{activePersona.name}</h4>
          <p className="persona-role">{activePersona.faculty_role}</p>
          <p className="persona-merkaba">{activePersona.merkaba_chariot}</p>
          <div className="persona-powers">
            {activePersona.powers?.map((power, i) => (
              <span key={i} className="power-tag">{power}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
