import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { Heart, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              I <Heart className="text-red-500 animate-pulse hover:scale-110 transition-transform" /> Graph API
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en')}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {i18n.language === 'en' ? 'TR' : 'EN'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-105"
              aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-200" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}