import React, { useState, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, AlertCircle, Globe, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { searchTenant } from '../services/tenantService';
import ResultCard from './ResultCard';
import { GraphApiError } from '../types/errors';
import InfoSection from './InfoSection';

export default function SearchForm() {
  const { t, i18n } = useTranslation();
  const [domains, setDomains] = useState('');
  const [results, setResults] = useState<Array<{
    domain: string;
    tenantId: string;
    displayName: string;
    error?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (error: GraphApiError): string => {
    if (error.code === 'NOT_FOUND') {
      return t('common.errors.notFound', { domain: error.message }, { lng: i18n.language });
    }
    
    const errorKey = error.code === 'NETWORK_ERROR' ? 'network_error' :
                    error.code === 'INVALID_DOMAIN' ? 'invalid_domain' :
                    error.code === 'API_ERROR' ? 'api_error' : 'general';
    
    return t(`common.errors.${errorKey}`, { domain: error.message }, { lng: i18n.language });
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const domainList = domains
      .split(',')
      .map(d => d.trim().toLowerCase())
      .filter(d => d);
    
    if (domainList.length === 0) {
      toast.error(t('common.errors.emptyDomain'));
      return;
    }

    setIsLoading(true);
    setResults([]);

    const searchPromises = domainList.map(async (domain) => {
      try {
        const data = await searchTenant(domain);
        return { ...data, domain };
      } catch (error) {
        const errorMessage = error instanceof GraphApiError ? 
          getErrorMessage(error) : 
          t('common.errors.general', { domain }, { lng: i18n.language });

        return {
          domain,
          error: errorMessage,
          tenantId: '',
          displayName: ''
        };
      }
    });

    const results = await Promise.all(searchPromises);
    setResults(results);
    
    const successCount = results.filter(r => !r.error).length;
    if (successCount > 0) {
      toast.success(t('common.success.foundMultiple', { count: successCount }));
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  // Force re-render of error messages when language changes
  React.useEffect(() => {
    setResults(prevResults => 
      prevResults.map(result => {
        if (result.error && result.domain) {
          return {
            ...result,
            error: t('common.errors.notFound', { domain: result.domain }, { lng: i18n.language })
          };
        }
        return result;
      })
    );
  }, [i18n.language, t]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
          {t('common.title')}
        </h1>
        <div className="relative inline-block">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            {t('common.description')}
          </p>
          <div className="absolute -top-6 -right-6 transform rotate-12">
            <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
              <span>I</span>
              <span className="text-red-200 animate-bounce">♥</span>
              <span>Graph API</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('common.multiDomainHint')}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 min-h-[80px]"
              disabled={isLoading}
            />
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Info className="h-4 w-4" />
              {t('common.multiDomainHint')}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
          >
            <Search className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {t('common.search')}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={`${result.domain}-${index}`}>
            {result.error ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-medium text-red-800 dark:text-red-200">
                      {result.domain}
                    </h3>
                    <div className="text-red-700 dark:text-red-300 whitespace-pre-line">
                      {result.error}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ResultCard {...result} />
            )}
          </div>
        ))}
      </div>

      <InfoSection />

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        {t('common.disclaimer')}
      </div>
    </div>
  );
}