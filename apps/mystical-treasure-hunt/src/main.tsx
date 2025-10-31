/**
 * 🏛️ MYSTICAL TREASURE HUNT - Main Entry Point
 * Where visionary art meets real exploration and grimoire-making
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import MysticalTreasureGame from './game/MysticalTreasureGame'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <MysticalTreasureGame />
  </React.StrictMode>
)
