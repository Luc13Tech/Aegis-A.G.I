import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

// Filet de secours : si une erreur casse le chargement AVANT même que React
// ne puisse s'initialiser (ex: erreur de script), on l'affiche quand même
// plutôt que de laisser une page blanche silencieuse.
function showFatalError(message) {
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `<pre style="padding:20px;color:#DC2626;font-family:monospace;white-space:pre-wrap;font-size:13px;">Erreur au chargement :\n\n${message}</pre>`;
  }
}
window.addEventListener('error', (e) => showFatalError(e.message || String(e)));
window.addEventListener('unhandledrejection', (e) => showFatalError(String(e.reason)));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
