import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, ExternalLink, Heart, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* MVP Badge */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full">
            <Award className="h-6 w-6 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {t('common.footer.creator')}
            </span>
            <span className="px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
              {t('common.footer.mvp')}
            </span>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/cengizyilmaz_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/cengizyilmazz/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/cengizyilmaz1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Website Link */}
          <a
            href="https://yilmazcengiz.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
          >
            <Heart className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {t('common.footer.backlink')}
            </span>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
          </a>

          {/* Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('common.footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}