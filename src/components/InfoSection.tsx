import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Key, Shield } from 'lucide-react';

export default function InfoSection() {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-blue-500" />
          {t('info.whatIs.title')}
        </h2>
        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            {t('info.whatIs.description')}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('info.whatIs.point1')}</li>
            <li>{t('info.whatIs.point2')}</li>
            <li>{t('info.whatIs.point3')}</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          {t('info.howTo.title')}
        </h2>
        <div className="prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300">
            {t('info.howTo.description')}
          </p>
          <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>{t('info.howTo.step1')}</li>
            <li>{t('info.howTo.step2')}</li>
            <li>{t('info.howTo.step3')}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}