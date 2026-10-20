import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/fonts.css';
import './styles/index.css';

document.documentElement.classList.remove('dark');
document.documentElement.removeAttribute('data-theme');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
