import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/index.css'
import App from "./App.tsx";
import AppThemeProvider from "./providers/AppThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppThemeProvider>
          <App />
      </AppThemeProvider>
  </React.StrictMode>,
)