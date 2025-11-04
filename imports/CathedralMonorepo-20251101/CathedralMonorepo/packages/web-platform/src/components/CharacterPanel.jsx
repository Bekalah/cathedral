import { useState } from 'react';
import './CharacterPanel.css';

function CharacterPanel() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  
  const majorArcana = [
    { id: 0, name: 'The Fool', hebrew: 'Aleph', path: 'Air', desc: 'Divine folly, pure potential' },
    { id: 1, name: 'The Magician', hebrew: 'Beth', path: 'Mercury', desc: 'Will manifest, As Above So Below' },
    { id: 2, name: 'The High Priestess', hebrew: 'Gimel', path: 'Moon', desc: 'Hidden knowledge, intuition' },
    { id: 3, name: 'The Empress', hebrew: 'Daleth', path: 'Venus', desc: 'Creation, nurturing force' },
    { id: 4, name: 'The Emperor', hebrew: 'Heh', path: 'Aries', desc: 'Structure, authority, will' },
    { id: 5, name: 'The Hierophant', hebrew: 'Vav', path: 'Taurus', desc: 'Sacred teaching, tradition' },
    { id: 6, name: 'The Lovers', hebrew: 'Zayin', path: 'Gemini', desc: 'Union, choice, duality' },
    { id: 7, name: 'The Chariot', hebrew: 'Cheth', path: 'Cancer', desc: 'Merkaba builder, directed will' },
    { id: 8, name: 'Strength', hebrew: 'Teth', path: 'Leo', desc: 'Inner power, courage' },
    { id: 9, name: 'The Hermit', hebrew: 'Yod', path: 'Virgo', desc: 'Solitary path, inner light' },
    { id: 10, name: 'Wheel of Fortune', hebrew: 'Kaph', path: 'Jupiter', desc: 'Cycles, fate, karma' },
    { id: 11, name: 'Justice', hebrew: 'Lamed', path: 'Libra', desc: 'Balance, truth, law' },
    { id: 12, name: 'The Hanged Man', hebrew: 'Mem', path: 'Water', desc: 'Sacrifice, new perspective' },
    { id: 13, name: 'Death', hebrew: 'Nun', path: 'Scorpio', desc: 'Transformation, rebirth' },
    { id: 14, name: 'Temperance', hebrew: 'Samekh', path: 'Sagittarius', desc: 'Alchemy, balance' },
    { id: 15, name: 'The Devil', hebrew: 'Ayin', path: 'Capricorn', desc: 'Material bondage, shadow' },
    { id: 16, name: 'The Tower', hebrew: 'Peh', path: 'Mars', desc: 'Sudden change, revelation' },
    { id: 17, name: 'The Star', hebrew: 'Tzaddi', path: 'Aquarius', desc: 'Hope, inspiration' },
    { id: 18, name: 'The Moon', hebrew: 'Qoph', path: 'Pisces', desc: 'Illusion, subconscious' },
    { id: 19, name: 'The Sun', hebrew: 'Resh', path: 'Sun', desc: 'Illumination, clarity' },
    { id: 20, name: 'Judgement', hebrew: 'Shin', path: 'Fire', desc: 'Awakening, calling' },
    { id: 21, name: 'The World', hebrew: 'Tau', path: 'Saturn', desc: 'Completion, cosmic dance' }
  ];

  return (
    <div className="character-panel">
      <h2>22 Playable Characters</h2>
      <p>Major Arcana from Liber Arcanae - Thelemic pathworking through Double Tree of Life</p>
      
      <div className="character-grid">
        {majorArcana.map(card => (
          <button
            key={card.id}
            className={`character-card ${selectedCharacter === card.id ? 'active' : ''}`}
            onClick={() => setSelectedCharacter(card.id)}
          >
            <div className="character-number">{card.id}</div>
            <h3>{card.name}</h3>
            <div className="character-meta">
              <span className="hebrew">{card.hebrew}</span>
              <span className="path">{card.path}</span>
            </div>
            <p className="character-desc">{card.desc}</p>
          </button>
        ))}
      </div>
      
      {selectedCharacter !== null && (
        <div className="character-detail">
          <h3>{majorArcana[selectedCharacter].name}</h3>
          <p>Full character implementation with real pathworking, grimoire spells, and Merkaba mechanics coming in next phase</p>
        </div>
      )}
    </div>
  );
}

export default CharacterPanel;
