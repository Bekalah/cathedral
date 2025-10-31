// 🎵 ARCHETYPAL VOICES - Simple Living System
// Each archetype speaks from their POV when activated

class ArchetypalVoices {
    constructor() {
        this.currentSpeaker = null;
        this.voiceLog = [];
        this.maxVoices = 3; // Keep it simple - no overwhelming
        
        // Simple voice templates for each archetype
        this.voices = {
            "The Fool": {
                perspective: "brave_beginner",
                speaks: () => this.generateVoice("The Fool", "I step forward with trust and wonder"),
                color: "#FFE135"
            },
            "The Magician": {
                perspective: "skilled_creator", 
                speaks: () => this.generateVoice("The Magician", "I focus my will and manifest reality"),
                color: "#FF6B35"
            },
            "The High Priestess": {
                perspective: "intuitive_wisdom",
                speaks: () => this.generateVoice("The High Priestess", "I listen to the whispers between worlds"),
                color: "#4ECDC4"
            },
            "Death": {
                perspective: "gentle_transformer",
                speaks: () => this.generateVoice("Death", "I release what no longer serves with love"),
                color: "#45B7D1"
            },
            "The Sun": {
                perspective: "joyful_illuminator",
                speaks: () => this.generateVoice("The Sun", "I shine light on all possibilities"),
                color: "#FFA07A"
            }
        };
        
        // Cathedral's voice - the gentle container
        this.cathedralVoice = {
            speaks: (situation) => `🏛️ CATHEDRAL: "I hold space for ${situation} with infinite compassion"`
        };
    }
    
    // Simple voice generation - not overwhelming
    generateVoice(archetype, coreMessage) {
        const emoji = this.getArchetypeEmoji(archetype);
        return `${emoji} ${archetype.toUpperCase()}: "${coreMessage}"`;
    }
    
    // When user interacts with piano key
    activateVoice(archetypeName, situation = "this moment") {
        if (!this.voices[archetypeName]) return;
        
        // Clear old voices if too many
        if (this.voiceLog.length >= this.maxVoices) {
            this.voiceLog = this.voiceLog.slice(-2); // Keep last 2
        }
        
        // Primary speaker
        const primaryVoice = this.voices[archetypeName].speaks();
        
        // One supporting voice (not overwhelming)
        const supportingArchetype = this.getRandomSupporter(archetypeName);
        const supportingVoice = supportingArchetype ? 
            this.generateSupportingResponse(supportingArchetype, situation) : null;
            
        // Cathedral's gentle container voice
        const cathedralResponse = this.cathedralVoice.speaks(situation);
        
        // Add to voice log
        this.voiceLog.push({
            primary: primaryVoice,
            supporting: supportingVoice,
            cathedral: cathedralResponse,
            timestamp: new Date().toLocaleTimeString()
        });
        
        return this.voiceLog[this.voiceLog.length - 1];
    }
    
    // Generate simple supporting response
    generateSupportingResponse(supportingArchetype, situation) {
        const responses = {
            "The Fool": "I'm curious about this new experience",
            "The Magician": "I prepare my tools to support this",
            "The High Priestess": "I sense the deeper currents here", 
            "Death": "I honor what's transforming",
            "The Sun": "I celebrate this moment's beauty"
        };
        
        const emoji = this.getArchetypeEmoji(supportingArchetype);
        return `${emoji} ${supportingArchetype.toUpperCase()}: "${responses[supportingArchetype]}"`;
    }
    
    // Get random supporting archetype (not the current speaker)
    getRandomSupporter(currentSpeaker) {
        const others = Object.keys(this.voices).filter(name => name !== currentSpeaker);
        return others[Math.floor(Math.random() * others.length)];
    }
    
    // Simple emoji mapping
    getArchetypeEmoji(archetype) {
        const emojis = {
            "The Fool": "🃏",
            "The Magician": "🎭", 
            "The High Priestess": "🔮",
            "Death": "🦋", // Transformation, not scary
            "The Sun": "☀️"
        };
        return emojis[archetype] || "✨";
    }
    
    // Display recent voices in simple format
    displayRecentVoices() {
        const recent = this.voiceLog.slice(-3);
        return recent.map(voice => `
            <div class="voice-interaction">
                <div class="primary-voice">${voice.primary}</div>
                ${voice.supporting ? `<div class="supporting-voice">${voice.supporting}</div>` : ''}
                <div class="cathedral-voice">${voice.cathedral}</div>
                <div class="timestamp">${voice.timestamp}</div>
            </div>
        `).join('');
    }
    
    // Get current conversation as simple text
    getCurrentConversation() {
        return this.voiceLog.map(voice => 
            [voice.primary, voice.supporting, voice.cathedral].filter(v => v).join('\n')
        ).join('\n\n');
    }
}

// Simple CSS for voice display
const voiceStyles = `
.voice-interaction {
    margin: 10px 0;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: white;
    font-family: 'Courier New', monospace;
}

.primary-voice {
    font-weight: bold;
    margin-bottom: 5px;
}

.supporting-voice {
    font-style: italic;
    margin-bottom: 5px;
    opacity: 0.8;
}

.cathedral-voice {
    color: #FFE135;
    margin-top: 10px;
    font-weight: bold;
}

.timestamp {
    font-size: 0.8em;
    text-align: right;
    margin-top: 5px;
    opacity: 0.6;
}
`;

// Export for use in connection-map.html
if (typeof module !== 'undefined') {
    module.exports = ArchetypalVoices;
}