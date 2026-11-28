import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import { AuthExperience, UserExperience } from './RoleExperience.jsx'
import './styles.css'
import './animations.css'

function getStoredSession() {
  try {
    const stored = JSON.parse(localStorage.getItem('sellsmart-session') || 'null')
    return stored && ['business', 'user', 'admin'].includes(stored.role) ? stored : null
  } catch (error) {
    console.error('SellSmart session could not be read.', error)
    return null
  }
}

function getStoredAccounts() {
  try {
    const stored = JSON.parse(localStorage.getItem('sellsmart-accounts') || '[]')
    return Array.isArray(stored) ? stored : []
  } catch (error) {
    console.error('SellSmart accounts could not be read.', error)
    return []
  }
}

function Site() {
  const [session, setSession] = useState(getStoredSession)
  const [showAuth, setShowAuth] = useState(false)

  const authenticate = account => {
    const { password, ...safeAccount } = account
    try {
      localStorage.setItem('sellsmart-session', JSON.stringify(safeAccount))
    } catch (error) {
      console.error('SellSmart session could not be saved.', error)
      throw new Error('Your session could not be saved in this browser. Check available storage and try again.')
    }
    setSession(safeAccount)
    setShowAuth(false)
  }

  const logout = () => {
    try {
      localStorage.removeItem('sellsmart-session')
    } catch (error) {
      console.error('SellSmart session could not be cleared.', error)
    }
    setSession(null)
    setShowAuth(false)
  }

  if (session?.role === 'business') return <App role="business" account={session} accounts={getStoredAccounts()} onLogout={logout} />
  if (session?.role === 'admin') return <App role="admin" account={session} accounts={getStoredAccounts()} onLogout={logout} />
  if (session?.role === 'user') return <UserExperience account={session} onLogout={logout} />
  if (showAuth) return <AuthExperience onAuthenticated={authenticate} onBack={() => setShowAuth(false)} />
  return <LandingPage onExplore={() => setShowAuth(true)} />
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Site /></React.StrictMode>)