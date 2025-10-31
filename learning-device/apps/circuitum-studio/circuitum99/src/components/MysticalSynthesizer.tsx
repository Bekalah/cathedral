import { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';

interface MysticalSynthesizerProps {
  codexData: any;
  shemAngels: any;
  gateIndex: number;
}

export default function MysticalSynthesizer({ codexData, shemAngels, gateIndex }: MysticalSynthesizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentAngel, setCurrentAngel] = useState(shemAngels[0]);

  // Create audio references
  const synthRef = useRef<Tone.FMSynth>();
  const sequencerRef = useRef<Tone.Sequence>();

  // Initialize audio engine
  useEffect(() => {
    const synth = new Tone.FMSynth({
      harmonicity: 1,
      modulationIndex: 2,
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.8,
        release: 1.0,
      }
    }).toDestination();

    synthRef.current = synth;

    return () => {
      synth.dispose();
      if (sequencerRef.current) sequencerRef.current.dispose();
    };
  }, []);

  // Calculate angel master pattern for music
  const getAngelPattern = (angel: any) => {
    const baseFrequency = angel.frequency;
    const numerologyCore = angel.numerology	core;
    const planetaryPositions = angel.planetary_ruler;

    // Create pattern based on angel properties
    return [
      { note: baseFrequency / 2, duration: '8n' },
      { note: baseFrequency, duration: '4n' },
      { note: baseFrequency * (numerologyCore / 13), duration: '8n' },
      { note: baseFrequency * (7 / 11), duration: '2n' } // Golden ratio approximation
    ];
  };

  const startSequencer = async () => {
    if (!synthRef.current) return;

    await Tone.start();

    const pattern = getAngelPattern(currentAngel);

    const sequence = new Tone.Sequence(
      (time, note) => {
        synthRef.current?.triggerAttackRelease(note, time);
        setCurrentNote(note.note || note);
      },
      pattern.map(p => p.note),
      '4n'
    );

    sequencerRef.current = sequence;
    sequence.loop = true;
    sequence.start();

    Tone.Transport.start();
    setIsPlaying(true);
  };

  const stopSequencer = () => {
    if (sequencerRef.current) {
      sequencerRef.current.stop();
      sequencerRef.current.dispose();
      sequencerRef.current = undefined;
    }
    Tone.Transport.stop();
    setIsPlaying(false);
    setCurrentNote('');
  };

  const changeAngel = (newAngelIndex: number) => {
    setCurrentAngel(shemAngels[newAngelIndex]);
  };

  const getChordProgression = () => {
    // Create chord progression based on current angel and codex gate
    const angelFreq = currentAngel.frequency;
    const gateData = codexData.find((g: any) => g.gate_index === gateIndex);

    return [
      [angelFreq, angelFreq * 1.2, angelFreq * 1.5], // Maj
      [angelFreq, angelFreq * 0.9, angelFreq * 1.3], // Min
      [gateData?.energy * angelFreq, angelFreq * 1.4, angelFreq * 1.7] // Mystic
    ];
  };

  return (
    <div className="mystical-synthesizer">
      <h3>Mystical Synthesizer - {currentAngel.name}</h3>

      <div className="audio-controls">
        <button onClick={isPlaying ? stopSequencer : startSequencer}>
          {isPlaying ? 'Stop' : 'Start'} Sequence
        </button>

        <div>Current Angel: {currentAngel.name}</div>
        <div>Frequency: {currentAngel.frequency}Hz</div>
        <div>Current Note: {currentNote}</div>
      </div>

      <div className="angel-selector">
        <h4>Select Angel Master Pattern:</h4>
        {shemAngels.slice(0, 12).map((angel: any, index: number) => (
          <button
            key={angel.id}
            onClick={() => changeAngel(index)}
            style={{
              background: angel.color,
              margin: '4px',
              padding: '8px',
              border: currentAngel.id === angel.id ? '2px solid black' : '1px solid #ccc'
            }}
          >
            {angel.name}
          </button>
        ))}
      </div>

      <div className="chord-progression">
        <h4>Angel Chord Progression:</h4>
        {getChordProgression().map((chord, index) => (
          <div key={index}>
            Chord {index + 1}: {chord.map((freq: number) => freq.toFixed(1)).join(' - ')}Hz
          </div>
        ))}
      </div>
    </div>
  );
}
