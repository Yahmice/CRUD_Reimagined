import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CRUDApp from './CRUDApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRUDApp />
  </StrictMode>,
)
