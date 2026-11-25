import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

async function start() {
  if (import.meta.env.DEV) {
    const { applyWorstCase } = await import('./dev/worstCase.js');
    await applyWorstCase();
  }
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
start();
