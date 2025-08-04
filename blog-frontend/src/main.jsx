// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';


const container = document.getElementById('root');
if (!window.__APP_ROOT) {
  window.__APP_ROOT = createRoot(container);
}

window.__APP_ROOT.render(
  <StrictMode>
    <App />
  </StrictMode>
);









