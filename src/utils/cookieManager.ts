import Cookies from 'js-cookie';

const COOKIE_PREFIX = 'tenant_finder_';
const DEFAULT_EXPIRES = 365; // days

export interface CookieOptions {
  expires?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const cookieManager = {
  set(key: string, value: any, options: CookieOptions = {}) {
    const finalOptions = {
      expires: DEFAULT_EXPIRES,
      secure: true,
      sameSite: 'strict' as const,
      ...options,
    };

    Cookies.set(`${COOKIE_PREFIX}${key}`, JSON.stringify(value), finalOptions);
  },

  get(key: string) {
    try {
      const value = Cookies.get(`${COOKIE_PREFIX}${key}`);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    Cookies.remove(`${COOKIE_PREFIX}${key}`);
  },

  // Özel cookie yönetimi metodları
  setUserPreferences(preferences: UserPreferences) {
    this.set('preferences', preferences);
  },

  getUserPreferences(): UserPreferences | null {
    return this.get('preferences');
  },

  setSearchHistory(history: SearchHistoryItem[]) {
    this.set('search_history', history);
  },

  getSearchHistory(): SearchHistoryItem[] {
    return this.get('search_history') || [];
  },

  clearSearchHistory() {
    this.remove('search_history');
  },

  // GDPR uyumlu cookie onay yönetimi
  setCookieConsent(consent: CookieConsent) {
    this.set('cookie_consent', consent);
  },

  getCookieConsent(): CookieConsent | null {
    return this.get('cookie_consent');
  },
};

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  searchHistoryEnabled: boolean;
  maxHistoryItems: number;
}

export interface SearchHistoryItem {
  domain: string;
  timestamp: number;
  tenantId?: string;
  success: boolean;
}

export interface CookieConsent {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  timestamp: number;
}