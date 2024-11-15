import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, X, ExternalLink } from 'lucide-react';
import { cookieManager } from '../utils/cookieManager';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = cookieManager.getCookieConsent();
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    cookieManager.setCookieConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      timestamp: Date.now(),
    });
    setShow(false);
  };

  const handleAcceptNecessary = () => {
    cookieManager.setCookieConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      timestamp: Date.now(),
    });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
          <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {t('cookies.title')}
            </p>
            <p className="text-sm">
              {t('cookies.description')}
            </p>
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 group"
            >
              {t('cookies.learnMore')}
              <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAcceptNecessary}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors border border-gray-200 dark:border-gray-600"
          >
            {t('cookies.acceptNecessary')}
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            {t('cookies.acceptAll')}
          </button>
          <button
            onClick={() => setShow(false)}
            className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}