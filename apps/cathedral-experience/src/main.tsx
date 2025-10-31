/**
 * Cathedral Experience - Main Entry Point
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'

// Performance monitoring
if (import.meta.env.DEV) {
  // Enable React DevTools profiling in development
  import('react-dom').then(ReactDOM => {
    // @ts-ignore
    if (ReactDOM.unstable_createRoot) {
      console.log('🚀 Cathedral Experience starting in development mode');
    }
  });
}

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  // Could send to error reporting service in production
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Could send to error reporting service in production
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)