// Circuitum99 CYOA Engine - Interactive Storytelling System
class CYOAEngine {
    constructor() {
        this.currentChapter = 1;
        this.choicesMade = 0;
        this.arcanaDrawn = [];
        this.gameState = {
            wisdom: 0,
            courage: 0,
            compassion: 0,
            creativity: 0,
            mystery: 0
        };
        
        this.storyData = {
            1: {
                text: "You stand at the threshold of the Cathedral Real, where ancient wisdom meets modern creativity. The doors are sealed with symbols that seem to pulse with inner light. Each symbol represents a different path through this sacred space.",
                choices: [
                    { text: "Approach the door marked with the Moon", arcana: "Moon", effect: { wisdom: 2, mystery: 1 }, next: 2 },
                    { text: "Study the spiral patterns carved around the entrance", arcana: "Star", effect: { creativity: 2, wisdom: 1 }, next: 3 },
                    { text: "Listen for guidance from within", arcana: "Hermit", effect: { wisdom: 1, courage: 1 }, next: 4 },
                    { text: "Step forward with confident determination", arcana: "Chariot", effect: { courage: 2, compassion: 1 }, next: 5 }
                ]
            },
            2: {
                text: "The Moon's light reveals hidden pathways, each reflecting your inner landscape. Shadows dance with meaning, showing you possibilities you hadn't considered.",
                choices: [
                    { text: "Follow the path of intuition", arcana: "Moon", effect: { mystery: 2, wisdom: 1 }, next: 6 },
                    { text: "Examine the shadows for patterns", arcana: "Moon", effect: { wisdom: 2, creativity: 1 }, next: 7 },
                    { text: "Embrace the uncertainty", arcana: "Moon", effect: { mystery: 1, courage: 2 }, next: 8 }
                ]
            },
            3: {
                text: "The Star's constellation patterns speak of guidance and hope. Each point of light connects to form a greater picture of possibility and potential.",
                choices: [
                    { text: "Follow the brightest star", arcana: "Star", effect: { creativity: 2, hope: 1 }, next: 9 },
                    { text: "Connect the stars into new patterns", arcana: "Star", effect: { creativity: 3, wisdom: 1 }, next: 10 },
                    { text: "Meditate on the star's message", arcana: "Star", effect: { wisdom: 1, compassion: 2 }, next: 11 }
                ]
            },
            4: {
                text: "The Hermit's inner light illuminates the path ahead. Through silence and reflection, you begin to understand the deeper patterns of this sacred space.",
                choices: [
                    { text: "Seek deeper understanding", arcana: "Hermit", effect: { wisdom: 3, mystery: 1 }, next: 12 },
                    { text: "Share your insights with others", arcana: "Hermit", effect: { compassion: 2, wisdom: 1 }, next: 13 },
                    { text: "Use your knowledge to help", arcana: "Hermit", effect: { compassion: 2, courage: 1 }, next: 14 }
                ]
            },
            5: {
                text: "The Chariot's energy propels you forward with purpose and determination. Victory awaits those who can harness their will and channel it constructively.",
                choices: [
                    { text: "Charge ahead with strength", arcana: "Chariot", effect: { courage: 3, compassion: 1 }, next: 15 },
                    { text: "Use your power to protect others", arcana: "Chariot", effect: { courage: 2, compassion: 2 }, next: 16 },
                    { text: "Channel your will into creation", arcana: "Chariot", effect: { courage: 1, creativity: 2 }, next: 17 }
                ]
            },
            6: {
                text: "Your journey through the Cathedral Real has taught you to trust your inner wisdom. The path ahead is illuminated by your growing understanding.",
                choices: [
                    { text: "Continue deeper into the mystery", arcana: "Intuition", effect: { mystery: 2, wisdom: 1 }, next: 18 },
                    { text: "Return to share your insight", arcana: "Intuition", effect: { compassion: 2, wisdom: 1 }, next: 19 }
                ]
            },
            7: {
                text: "The patterns you've discovered reveal the underlying structure of the Cathedral. Every element connects to create a beautiful whole.",
                choices: [
                    { text: "Map the connections you've found", arcana: "Pattern", effect: { wisdom: 2, creativity: 1 }, next: 20 },
                    { text: "Use this knowledge to help others", arcana: "Pattern", effect: { compassion: 2, wisdom: 1 }, next: 21 }
                ]
            },
            8: {
                text: "Embracing uncertainty has opened new possibilities. Sometimes the greatest wisdom comes from accepting what we cannot know.",
                choices: [
                    { text: "Accept the unknown gracefully", arcana: "Acceptance", effect: { mystery: 2, courage: 1 }, next: 22 },
                    { text: "Find peace in uncertainty", arcana: "Acceptance", effect: { compassion: 2, wisdom: 1 }, next: 23 }
                ]
            },
            9: {
                text: "Following the brightest star has led you to a place of inspiration and hope. Your path is illuminated by possibility.",
                choices: [
                    { text: "Embrace this moment of clarity", arcana: "Inspiration", effect: { creativity: 2, wisdom: 1 }, next: 24 },
                    { text: "Share this light with others", arcana: "Inspiration", effect: { compassion: 2, creativity: 1 }, next: 25 }
                ]
            },
            10: {
                text: "Your creative connection to the stars has revealed new patterns. You're beginning to understand how to weave reality through imagination.",
                choices: [
                    { text: "Create something beautiful", arcana: "Creation", effect: { creativity: 3, wisdom: 1 }, next: 26 },
                    { text: "Use your gift to inspire others", arcana: "Creation", effect: { compassion: 2, creativity: 2 }, next: 27 }
                ]
            },
            11: {
                text: "Meditation on the star's message has deepened your understanding. The light within you grows brighter with each insight.",
                choices: [
                    { text: "Continue your inner journey", arcana: "Insight", effect: { wisdom: 2, compassion: 1 }, next: 28 },
                    { text: "Share your understanding", arcana: "Insight", effect: { compassion: 2, wisdom: 1 }, next: 29 }
                ]
            },
            18: {
                text: "Your intuitive journey has revealed the deepest mysteries of the Cathedral. The path ahead is clear, illuminated by your inner wisdom.",
                choices: [
                    { text: "Complete your journey", arcana: "Enlightenment", effect: { wisdom: 3, mystery: 1 }, next: 99 }
                ]
            },
            19: {
                text: "Your insights have helped others find their own paths. The Cathedral Real is strengthened by the wisdom you share.",
                choices: [
                    { text: "Complete your journey", arcana: "Service", effect: { compassion: 3, wisdom: 1 }, next: 99 }
                ]
            },
            20: {
                text: "Your mapping of the Cathedral's patterns has revealed its beautiful structure. Understanding brings peace and purpose.",
                choices: [
                    { text: "Complete your journey", arcana: "Understanding", effect: { wisdom: 3, creativity: 1 }, next: 99 }
                ]
            },
            21: {
                text: "Using your knowledge to help others has created ripples of positive change throughout the Cathedral Real.",
                choices: [
                    { text: "Complete your journey", arcana: "Service", effect: { compassion: 3, wisdom: 1 }, next: 99 }
                ]
            },
            22: {
                text: "Your graceful acceptance of the unknown has opened you to infinite possibilities. Peace comes from embracing mystery.",
                choices: [
                    { text: "Complete your journey", arcana: "Peace", effect: { mystery: 2, courage: 2 }, next: 99 }
                ]
            },
            23: {
                text: "Finding peace in uncertainty has given you profound inner strength. Your calm presence brings comfort to others.",
                choices: [
                    { text: "Complete your journey", arcana: "Serenity", effect: { compassion: 2, wisdom: 2 }, next: 99 }
                ]
            },
            24: {
                text: "This moment of clarity has illuminated your true path. Your inspiration becomes a beacon for others.",
                choices: [
                    { text: "Complete your journey", arcana: "Clarity", effect: { creativity: 2, wisdom: 2 }, next: 99 }
                ]
            },
            25: {
                text: "Sharing your light has multiplied its power. The Cathedral Real shines brighter because of your generosity.",
                choices: [
                    { text: "Complete your journey", arcana: "Generosity", effect: { compassion: 3, creativity: 1 }, next: 99 }
                ]
            },
            26: {
                text: "Your creative expression has brought something beautiful into being. Art heals and transforms.",
                choices: [
                    { text: "Complete your journey", arcana: "Artistry", effect: { creativity: 3, wisdom: 1 }, next: 99 }
                ]
            },
            27: {
                text: "Using your creative gifts to inspire others has created a cascade of positive energy throughout the Cathedral Real.",
                choices: [
                    { text: "Complete your journey", arcana: "Inspiration", effect: { compassion: 3, creativity: 2 }, next: 99 }
                ]
            },
            28: {
                text: "Your inner journey has led to profound insights. The light within you cannot be dimmed.",
                choices: [
                    { text: "Complete your journey", arcana: "Wisdom", effect: { wisdom: 3, compassion: 1 }, next: 99 }
                ]
            },
            29: {
                text: "Sharing your understanding has created connection and growth. Your knowledge becomes wisdom through service.",
                choices: [
                    { text: "Complete your journey", arcana: "Teaching", effect: { compassion: 2, wisdom: 2 }, next: 99 }
                ]
            },
            99: {
                text: "You have completed your journey through the Cathedral Real. Each path you took was uniquely yours, and each choice reflected your inner growth. The Cathedral Real is not just a place, but a state of being—a space where wisdom, creativity, compassion, courage, and mystery all unite in perfect harmony.",
                choices: []
            }
        };
        
        this.arcanaSymbols = {
            "Moon": "🌙",
            "Star": "⭐",
            "Hermit": "🧙‍♂️",
            "Chariot": "🏹",
            "Intuition": "👁️",
            "Pattern": "🔄",
            "Acceptance": "🕊️",
            "Inspiration": "💡",
            "Creation": "🎨",
            "Insight": "🔍",
            "Enlightenment": "☀️",
            "Service": "🤝",
            "Understanding": "📚",
            "Peace": "🕯️",
            "Serenity": "🧘",
            "Clarity": "💎",
            "Generosity": "🎁",
            "Artistry": "🎭",
            "Wisdom": "🦉",
            "Teaching": "📖"
        };
        
        this.init();
    }
    
    init() {
        this.displayCurrentChapter();
        this.updateStats();
    }
    
    displayCurrentChapter() {
        const chapter = this.storyData[this.currentChapter];
        if (!chapter) return;
        
        document.getElementById('storyText').innerHTML = chapter.text;
        
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = '';
        
        if (this.currentChapter === 99) {
            // End of story
            const totalScore = Object.values(this.gameState).reduce((sum, val) => sum + val, 0);
            const dominantTrait = Object.entries(this.gameState).reduce((a, b) => a[1] > b[1] ? a : b)[0];
            
            const endingText = `
                <div style="text-align: center; margin-top: 2rem; padding: 2rem; background: rgba(100,255,218,0.1); border-radius: 10px;">
                    <h3 style="color: #64ffda; margin-bottom: 1rem;">Journey Complete</h3>
                    <p><strong>Total Growth:</strong> ${totalScore}</p>
                    <p><strong>Dominant Trait:</strong> ${dominantTrait}</p>
                    <p style="margin-top: 1rem;">Thank you for exploring the Cathedral Real through your unique lens of wisdom, creativity, compassion, courage, and mystery.</p>
                </div>
            `;
            
            document.getElementById('storyText').innerHTML += endingText;
            document.getElementById('restartBtn').style.display = 'block';
            return;
        }
        
        chapter.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.5rem;">${this.arcanaSymbols[choice.arcana] || '✨'}</span>
                    <span>${choice.text}</span>
                </div>
            `;
            
            button.addEventListener('click', () => {
                this.makeChoice(choice);
            });
            
            choicesContainer.appendChild(button);
        });
    }
    
    makeChoice(choice) {
        this.choicesMade++;
        
        // Draw arcana card
        this.arcanaDrawn.push(choice.arcana);
        this.updateArcanaDisplay();
        
        // Apply effects
        Object.keys(choice.effect).forEach(trait => {
            this.gameState[trait] = (this.gameState[trait] || 0) + choice.effect[trait];
        });
        
        // Update progress
        const progress = Math.min((this.currentChapter / 30) * 100, 100);
        document.getElementById('progressFill').style.width = progress + '%';
        
        // Move to next chapter
        this.currentChapter = choice.next;
        
        // Update stats
        this.updateStats();
        
        // Display new chapter
        setTimeout(() => {
            this.displayCurrentChapter();
        }, 500);
    }
    
    updateArcanaDisplay() {
        const display = document.getElementById('arcanaDisplay');
        display.innerHTML = '';
        
        this.arcanaDrawn.slice(-6).forEach(arcana => {
            const card = document.createElement('div');
            card.className = 'arcana-card';
            card.innerHTML = this.arcanaSymbols[arcana] || '✨';
            card.title = arcana;
            display.appendChild(card);
        });
    }
    
    updateStats() {
        document.getElementById('chapters').textContent = this.currentChapter;
        document.getElementById('choices').textContent = this.choicesMade;
        document.getElementById('arcanaUsed').textContent = this.arcanaDrawn.length;
    }
    
    restart() {
        this.currentChapter = 1;
        this.choicesMade = 0;
        this.arcanaDrawn = [];
        this.gameState = {
            wisdom: 0,
            courage: 0,
            compassion: 0,
            creativity: 0,
            mystery: 0
        };
        
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('restartBtn').style.display = 'none';
        
        this.updateStats();
        this.updateArcanaDisplay();
        this.displayCurrentChapter();
    }
}

// Initialize the CYOA engine when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const engine = new CYOAEngine();
    
    // Add restart button functionality
    document.getElementById('restartBtn').addEventListener('click', () => {
        engine.restart();
    });
});