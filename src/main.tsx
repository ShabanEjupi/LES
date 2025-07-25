import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/classic-theme.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
