import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { archetypes } from '@cathedral/soul';
import { CoutureOverlay } from './CoutureOverlay';

// Example Arcana avatars (expand with full lore, stats, resonance, etc.)
const arcanaList = [
  {
    key: 'creator',
    name: 'The Magician',
    lore: 'Master of elements, creative technomancer. Wields the four elements and sacred geometry. Associated with Mercury and the caduceus. Can transmute energy and reality.',
    resonance: 417,
    art: '/assets/avatars/magician.png',
    sigil: '☿',
    team: 'Light',
    color: '#8ecae6',
    sound: 'A4',
    citation: 'Codex 144:99, Liber Arcanae',
  },
  {
    key: 'transformer',
    name: 'The High Priestess',
    lore: 'Oracle of the moon, keeper of mysteries. Guardian of the veil, intuition, and the subconscious. Associated with the moon and water. Can reveal hidden truths.',
    resonance: 528,
    art: '/assets/avatars/priestess.png',
    sigil: '☾',
    team: 'Shadow',
    color: '#b983ff',
    sound: 'C#5',
    citation: 'Codex 144:99, Liber Arcanae',
  },
  {
    key: 'preserver',
    name: 'The Empress',
    lore: 'Nurturer, creator of abundance. Embodies fertility, nature, and the creative matrix. Associated with Venus and the rose. Can heal and empower.',
    resonance: 639,
    art: '/assets/avatars/empress.png',
    sigil: '♀',
    team: 'Light',
    color: '#ffd6a5',
    sound: 'F4',
    citation: 'Codex 144:99, Liber Arcanae',
  },
];


function AvatarCard({ avatar, onSelect, selected }: any) {
  const [showLore, setShowLore] = React.useState(false);
  return (
    <div
      className="avatar-card"
      style={{
        border: selected ? '2px solid gold' : 'none',
        borderRadius: 24,
        padding: 0,
        margin: 16,
        background: 'rgba(24,24,28,0.7)',
        color: '#fff',
        cursor: 'pointer',
        minWidth: 200,
        boxShadow: selected ? '0 0 32px gold' : '0 0 12px #222',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, border 0.3s',
        backdropFilter: 'blur(6px)',
      }}
      onClick={() => onSelect(avatar)}
      onMouseEnter={() => setShowLore(true)}
      onMouseLeave={() => setShowLore(false)}
    >
      <div style={{
        height: 180,
        background: `radial-gradient(ellipse at 50% 0%, ${avatar.color} 0%, #18181c 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <img src={avatar.art} alt={avatar.name} style={{ height: 120, filter: selected ? 'drop-shadow(0 0 16px gold)' : 'drop-shadow(0 0 8px #222)' }} />
        <div style={{
          position: 'absolute',
          top: 8,
          right: 12,
          fontSize: 32,
          opacity: 0.7,
        }}>{avatar.sigil}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 'bold', fontSize: 22, letterSpacing: 1 }}>{avatar.name}</div>
        <div style={{ fontSize: 15, color: avatar.color }}>{avatar.sound} • {avatar.resonance} Hz</div>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 4 }}>Team: {avatar.team}</div>
      </div>
      {showLore && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(20,16,32,0.98)',
          color: '#fff',
          zIndex: 10,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          borderRadius: 24,
          boxShadow: '0 0 32px #000',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{avatar.name}</div>
          <div style={{ fontStyle: 'italic', marginBottom: 12 }}>{avatar.lore}</div>
          <div style={{ fontSize: 13, color: '#ffd700', marginBottom: 8 }}>Source: {avatar.citation}</div>
          <div style={{ fontSize: 13, color: '#aaa' }}>Sigil: {avatar.sigil}</div>
        </div>
      )}
    </div>
  );
}


function TarotArena() {
  const [selected, setSelected] = useState<any[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [grimoire, setGrimoire] = useState('');

  function handleSelect(avatar: any) {
    setSelected((prev) => {
      if (prev.find((a) => a.key === avatar.key)) return prev;
      return [...prev, avatar];
    });
  }

  function handleDuel() {
    if (selected.length < 2) return;
    const [a, b] = selected;
    const winner = a.resonance > b.resonance ? a : b;
    setLog((l) => [
      `${a.name} (${a.resonance} Hz) vs ${b.name} (${b.resonance} Hz): ${winner.name} wins!`,
      ...l,
    ]);
  }

  function handleTeamUp() {
    if (selected.length < 2) return;
    const [a, b] = selected;
    setLog((l) => [
      `${a.name} and ${b.name} create a resonance pattern: ${a.resonance + b.resonance} Hz!`,
      ...l,
    ]);
  }

  function handleClear() {
    setSelected([]);
  }

  return (
    <>
      <CoutureOverlay />
      <div style={{ padding: 48, background: 'transparent', minHeight: '100vh', color: '#fff', zIndex: 1, position: 'relative' }}>
        <h1 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 48, letterSpacing: 2, textShadow: '0 2px 24px #000' }}>Tarot Arena</h1>
        <p style={{ fontSize: 20, color: '#ffd700', marginBottom: 32, textShadow: '0 1px 8px #000' }}>
          Select Arcana avatars to team up, duel, or create living art. Hover for lore. All actions are ND/trauma-safe and research-based.
        </p>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {arcanaList.map((avatar) => (
            <AvatarCard
              key={avatar.key}
              avatar={avatar}
              onSelect={handleSelect}
              selected={!!selected.find((a) => a.key === avatar.key)}
            />
          ))}
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button onClick={handleDuel} disabled={selected.length < 2} style={{
            marginRight: 8, padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#ffd700', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length < 2 ? 0.5 : 1
          }}>
            Duel
          </button>
          <button onClick={handleTeamUp} disabled={selected.length < 2} style={{
            marginRight: 8, padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#8ecae6', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length < 2 ? 0.5 : 1
          }}>
            Team Up
          </button>
          <button onClick={handleClear} disabled={selected.length === 0} style={{
            padding: '12px 32px', fontSize: 18, borderRadius: 12, background: '#222', color: '#fff', border: 'none', boxShadow: '0 0 8px #000', cursor: 'pointer', opacity: selected.length === 0 ? 0.5 : 1
          }}>
            Clear
          </button>
        </div>
        <div style={{ marginTop: 48, background: 'rgba(24,24,28,0.7)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #000', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 16 }}>Battle/Art Log</h2>
          <ul style={{ fontSize: 18, lineHeight: 1.5 }}>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 48, background: 'rgba(24,24,28,0.7)', borderRadius: 24, padding: 32, boxShadow: '0 0 32px #000', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontSize: 28, color: '#ffd700', marginBottom: 16 }}>Grimoire & Lore</h2>
          <p style={{ fontSize: 16, color: '#aaa', marginBottom: 12 }}>Each avatar has unique lore. You can add your own below:</p>
          <textarea
            style={{ width: '100%', height: 100, background: '#222', color: '#fff', borderRadius: 12, fontSize: 16, padding: 12, border: '1px solid #444', marginBottom: 8 }}
            placeholder="Write your own lore or grimoire entry..."
            value={grimoire}
            onChange={e => setGrimoire(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<TarotArena />);
