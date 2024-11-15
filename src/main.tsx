import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import i18next from 'i18next';
import App from './App.tsx';
import './index.css';
import { translations } from './i18n/translations';

i18next.init({
  resources: translations,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider attribute="class">
        <App />
        <Toaster position="top-right" />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>
);