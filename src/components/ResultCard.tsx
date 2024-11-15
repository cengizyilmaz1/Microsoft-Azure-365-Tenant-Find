import React from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Copy, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResultCardProps {
  domain: string;
  tenantId: string;
  displayName: string;
}

export default function ResultCard({ domain, tenantId, displayName }: ResultCardProps) {
  const { t } = useTranslation();

  const downloadJson = () => {
    const data = { domain, tenantId, displayName };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tenant-${domain}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(t('common.success.downloaded'));
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(tenantId);
    toast.success(t('common.success.copied'));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl transition-all hover:shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {displayName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {domain}
            </p>
            <p className="mt-2 font-mono bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                {tenantId}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md"
              title={t('common.copy')}
            >
              <Copy className="h-5 w-5" />
            </button>
            <button
              onClick={downloadJson}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all hover:scale-105 shadow-md"
            >
              <Download className="h-4 w-4" />
              {t('common.download')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}