import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import App from './App.tsx';
import './index.css';

// Registro único del plugin para toda la app.
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
