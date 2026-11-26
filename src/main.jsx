import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import './styles.css'
import './animations.css'

function Site() {
  const [showDashboard, setShowDashboard] = useState(false)

  return showDashboard
    ? <App />
    : <LandingPage onExplore={() => setShowDashboard(true)} />
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Site /></React.StrictMode>)