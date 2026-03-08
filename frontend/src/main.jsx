import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'   // ← Correct package
import './index.css'
import { Toaster } from 'react-hot-toast'
import App from './App'   // We will use App.jsx now (easier)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-center" />
    </BrowserRouter>
  </React.StrictMode>
)