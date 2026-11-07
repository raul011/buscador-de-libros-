import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Envolvemos toda la app con el provider para que el estado compartido
// esté disponible en cualquier componente (práctica: estado compartido).
import LibrosProvider from './context/LibrosProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LibrosProvider>
      <App />
    </LibrosProvider>
  </StrictMode>,
)
