import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext.jsx'
import {ChatProvider} from './context/chatContext.jsx'
import { AdminProvider } from './context/adminContext.jsx'

export const server = "http://localhost:8000"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ChatProvider>
    <AdminProvider>
      <App/>
    </AdminProvider>
    </ChatProvider>
    </UserProvider> 
  </StrictMode>,
)
