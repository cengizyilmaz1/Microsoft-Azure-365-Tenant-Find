import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Global analytics interface
declare global {
  interface Window {
    gtag?: (command: string, targetId: string | Date, config?: any) => void;
    dataLayer?: any[];
  }
}

// Initialize Google Analytics
export const initializeGA = () => {
  // Google Analytics is loaded via script tag in index.html
  // This function can be used for additional initialization if needed
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('Google Analytics initialized');
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-E6HR73GY9H', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category?: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category || 'engagement',
      event_label: label,
      value: value,
    });
  }
};

// Hook to track page views automatically
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
};

// Track search events
export const trackSearch = (query: string, results: number) => {
  trackEvent('search', 'tenant_lookup', query, results);
};

// Track export events
export const trackExport = (format: string, count: number) => {
  trackEvent('export', 'data_export', format, count);
};

// Track copy events
export const trackCopy = (content: string) => {
  trackEvent('copy', 'user_interaction', content);
};

// Track language change
export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', 'localization', language);
};