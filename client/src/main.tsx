import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
    <Toaster richColors position="top-right" />
  </HelmetProvider>,
);
