/**
 * 🏛️✨ CATHEDRAL OF CIRCUITS - MAIN APP COMPONENT
 * 
 * Unified interface with Codex 144:99 central ledger integration
 * 22 Living Tradition Engines + Fusion Kink Heaven + Trauma Safety
 */

import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Import route components (these will be created)
import HomePage from './routes/Home'
import CodexPage from './routes/Codex' 
import ArcanePage from './routes/Arcana'
import FusionPage from './routes/Fusion'
import LabsPage from './routes/Labs'
import LibraryPage from './routes/Library'

function App() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load system status from API
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        setSystemStatus(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.warn('System status unavailable, using fallback')
        setSystemStatus({ 
          cathedral: { status: 'fallback mode', version: '2.0.0', quality: 'phenomenal', accessibility: '100%' },
          codex_144_99: { status: 'fallback', sacred_ratio: '144:99', nodes_loaded: 4 },
          living_arcanae: { status: 'fallback', tradition_engines: 22 },
          fusion_kink_heaven: { status: 'loading', ribbons: 7 }
        } as SystemStatus)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="cathedral-loading">
        <div className="sacred-spinner">🏛️</div>
        <p>Awakening the Cathedral...</p>
      </div>
    )
  }

  return (
    <div className="cathedral-app">
      {/* Sacred Navigation */}
      <nav className="cathedral-nav">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            🏛️✨ <span>Cathedral of Circuits</span>
          </Link>
          <div className="system-status">
            <span className="codex-status">
              📊 Codex {systemStatus?.codex_144_99?.sacred_ratio || '144:99'}
            </span>
            <span className="arcanae-status">  
              🃏 {systemStatus?.living_arcanae?.tradition_engines || 22} Engines
            </span>
          </div>
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">🏛️ Portal</Link>
          <Link to="/codex" className="nav-link">📊 Codex 144:99</Link>
          <Link to="/arcana" className="nav-link">🃏 Living Arcanae</Link>
          <Link to="/fusion" className="nav-link">⚗️ Fusion Kink</Link>
          <Link to="/labs" className="nav-link">🧪 Labs</Link>
          <Link to="/library" className="nav-link">📚 Library</Link>
        </div>
      </nav>

      {/* Trauma Safety Banner */}
      <div className="trauma-safety-banner">
        🛡️ <strong>Maximum Trauma Safety Active</strong> - 
        CPTSD-safe design with ND accommodations - 
        Professional therapeutic integration available
      </div>

      {/* Main Content Routes */}
      <main className="cathedral-main">
        <Routes>
          <Route path="/" element={<HomePage systemStatus={systemStatus} />} />
          <Route path="/codex" element={<CodexPage />} />
          <Route path="/arcana" element={<ArcanePage />} />
          <Route path="/fusion" element={<FusionPage />} />
          <Route path="/labs" element={<LabsPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </main>

      {/* Sacred Footer */}
      <footer className="cathedral-footer">
        <div className="footer-content">
          <div className="artistic-integration">
            <h4>🎨 Artistic Integration</h4>
            <p>Björk + Tori Amos + Iris van Herpen + Emma Kunz + 21 Taras</p>
          </div>
          <div className="sacred-mathematics">
            <h4>🔢 Sacred Mathematics</h4>
            <p>144 Nodes • 99 Depths • 231 Fusion Combinations</p>
          </div>
          <div className="safety-reminder">
            <h4>🛡️ Always Safe</h4>
            <p>Museum-quality trauma-informed consciousness technology</p>
          </div>
        </div>
        <div className="copyright">
          ✨ Cathedral of Circuits - Free Forever for All Consciousness
        </div>
      </footer>
    </div>
  )
}

export default App