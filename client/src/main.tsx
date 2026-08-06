import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import Gradient from './components/common/Gradient';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Gradient />
    <Toaster richColors position="top-right" />
  </StrictMode>,
);
